<?php
namespace Plankod\Contact;

// Hostland's local mail service owns queueing/retries. A successful handoff
// means accepted for delivery, not confirmation of arrival in the inbox.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond($status, array $data) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

foreach (['name', 'contact', 'message', 'website', 'consent'] as $field) {
    if (isset($_POST[$field]) && !is_string($_POST[$field])) {
        respond(400, ['ok' => false, 'error' => 'invalid_fields']);
    }
}
if (!empty($_POST['website'])) {
    respond(400, ['ok' => false, 'error' => 'invalid_fields']);
}
$name = trim($_POST['name'] ?? '');
$contact = trim($_POST['contact'] ?? '');
$message = trim($_POST['message'] ?? '');
if ($name === '' || $contact === '' || $message === '') {
    respond(400, ['ok' => false, 'error' => 'missing_fields']);
}
if (($_POST['consent'] ?? '') !== '1') {
    respond(400, ['ok' => false, 'error' => 'consent_required']);
}
if (strlen($name) > 240 || strlen($contact) > 360 || strlen($message) > 20000) {
    respond(400, ['ok' => false, 'error' => 'fields_too_long']);
}
if (preg_match('/[\r\n\x00]/', $name . $contact) || strpos($message, "\0") !== false) {
    respond(400, ['ok' => false, 'error' => 'invalid_fields']);
}

try {
    $requestId = strtoupper(bin2hex(random_bytes(6)));
    $config = [];
    $configPath = dirname(__DIR__) . '/plankod-mail-config.php';
    if (is_readable($configPath)) {
        $config = require $configPath;
        if (!is_array($config)) {
            throw new \RuntimeException('mail_config_file_invalid');
        }
    }
    // Preserve the privately configured recipient. Never accept To/From from POST.
    // Legacy username/password entries are no longer needed or used.
    $recipient = $config['recipient'] ?? 'info@plancod.ru';
    if (!is_string($recipient) || preg_match('/[\r\n\x00]/', $recipient)
        || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        throw new \RuntimeException('mail_configuration_invalid');
    }
    $subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта ПЛАНКОД') . '?=';
    $body = "Заявка с сайта plancod.ru\nНомер: {$requestId}\n\n"
        . "Имя: {$name}\nКонтакт: {$contact}\n\nЗадача:\n{$message}\n";
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'Message-ID: <' . strtolower($requestId) . '.' . time() . '@plancod.ru>',
        'From: =?UTF-8?B?' . base64_encode('ПЛАНКОД') . '?= <info@plancod.ru>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        'X-Plankod-Request-ID: ' . $requestId,
    ];
    if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $contact;
    }
    // MIME encoding preserves Cyrillic and long lines without header injection.
    $encodedBody = chunk_split(base64_encode($body), 76, "\r\n");
    // Fixed envelope sender: no user-controlled shell arguments or password in Git.
    $accepted = mail($recipient, $subject, $encodedBody, implode("\r\n", $headers), '-finfo@plancod.ru');
    if (!$accepted) {
        throw new \RuntimeException('mail_queue_rejected');
    }
    error_log('PLANKOD mail accepted request=' . $requestId . ' transport=local');
    respond(200, ['ok' => true, 'status' => 'queued', 'request_id' => $requestId]);
} catch (\Throwable $error) {
    $id = $requestId ?? 'unavailable';
    // No message contents, credentials or raw server errors in the public response.
    error_log('PLANKOD mail failed request=' . $id . ': ' . $error->getMessage());
    respond(503, ['ok' => false, 'error' => 'mail_unavailable', 'request_id' => $id]);
}
