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

$key = $_POST['submission_key'] ?? '';
if (!is_string($key) || !preg_match('/^[a-f0-9]{32}$/D', $key)) respond(400, ['ok'=>false,'error'=>'invalid_key']);
$claim = ($_POST['action'] ?? '') === 'claim_goal';
foreach (['client_id','action','name', 'contact', 'message', 'website', 'consent', 'service', 'page_path', 'referrer_host', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as $field) {
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

// Optional lead context: included in the enquiry, never used for headers or routing.
$context = [];
$cid = $_POST['client_id'] ?? '';
if ($cid !== '' && !preg_match('/^[0-9]{1,32}$/D', $cid)) respond(400, ['ok'=>false,'error'=>'invalid_client_id']);
if ($cid !== '') $context[] = 'ClientID: ' . $cid;
$service = trim($_POST['service'] ?? '');
if ($service !== '' && !in_array($service, ['b2b_supply', 'equipment', 'private_home', 'smart_design'], true)) {
    respond(400, ['ok' => false, 'error' => 'invalid_service']);
}
foreach (['service', 'page_path', 'referrer_host', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as $contextName) {
    $value = trim($_POST[$contextName] ?? '');
    if (strlen($value) > 1000 || preg_match('/[\r\n\x00]/', $value)) {
        respond(400, ['ok' => false, 'error' => 'invalid_context']);
    }
    if ($value !== '') $context[] = $contextName . ': ' . $value;
}

// A stable shard lock protects atomic replacement of each private receipt.
// Never remove or recreate this directory during a release.
function durableSync($stream, $path) {
    if (function_exists('fsync')) return fsync($stream);
    // Hostland PHP 7.4: GNU sync FILE invokes fsync on exactly this file/dir.
    if (PHP_OS_FAMILY !== 'Linux' || !function_exists('exec')) return false;
    foreach (['/usr/bin/sync', '/bin/sync'] as $sync) {
        if (!is_executable($sync)) continue;
        exec($sync . ' -- ' . escapeshellarg($path) . ' 2>/dev/null', $unused, $status);
        return $status === 0;
    }
    return false;
}
function persist($path, array $row) {
    $tmp = tempnam(dirname($path), '.receipt-');
    try {
        if (!$tmp || dirname($tmp) !== dirname($path)) throw new \RuntimeException('receipt_temp');
        $f = fopen($tmp, 'wb');
        if (!$f) throw new \RuntimeException('receipt_open');
        $bytes = json_encode($row, JSON_THROW_ON_ERROR);
        try {
            if (fwrite($f, $bytes) !== strlen($bytes) || !fflush($f) || !durableSync($f, $tmp)) throw new \RuntimeException('receipt_write');
        } finally { fclose($f); }
        if (!rename($tmp, $path)) throw new \RuntimeException('receipt_replace');
        $dir = fopen(dirname($path), 'r');
        if (!$dir || !durableSync($dir, dirname($path))) throw new \RuntimeException('receipt_sync');
        fclose($dir);
    } finally { if ($tmp && is_file($tmp)) unlink($tmp); }
}
try {
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
    // Hostland maps htdocs/<folder> to a subdomain. Keep state in the
    // hosting account home, outside every domain's tree.
    $hostland = basename(dirname(__DIR__)) === 'htdocs';
    $base = $hostland ? dirname(__DIR__, 3) : dirname(__DIR__);
    $dir = $config['receipt_dir'] ?? $base . '/plancod-enquiry-receipts';
    $publicTree = realpath($hostland ? dirname(__DIR__) : (($_SERVER['DOCUMENT_ROOT'] ?? '') ?: __DIR__));
    $parent = realpath(dirname($dir));
    if (!$publicTree || !$parent || strpos($parent . '/', $publicTree . '/') === 0) throw new \RuntimeException('receipt_directory_unsafe');
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new \RuntimeException('receipt_directory');
    $dir = realpath($dir);
    $root = $publicTree;
    if (!$dir || (fileperms($dir) & 0077) !== 0 || !$root || strpos($dir . '/', $root . '/') === 0) throw new \RuntimeException('receipt_directory_unsafe');
    $lock = fopen($dir . '/' . substr($key,0,2) . '.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) throw new \RuntimeException('receipt_lock');
    $path = $dir . '/' . $key . '.json';
    $digest = hash('sha256', serialize([$name,$contact,$message,$service]));
    $row = is_file($path) ? json_decode(file_get_contents($path), true, 8, JSON_THROW_ON_ERROR) : null;
    if (is_file($path) && !is_array($row)) throw new \RuntimeException('bad_receipt');
    if ($row !== null) {
        $requestId = $row['id'];
        if ($row['hash'] !== $digest) respond(409, ['ok'=>false,'error'=>'key_conflict']);
        if ($row['status'] === 'queued') {
            $emit = $claim && !$row['claimed'];
            if ($emit) { $row['claimed'] = true; persist($path,$row); }
            respond(200, ['ok'=>true,'status'=>'queued','request_id'=>$requestId,'emit_goal'=>$emit]);
        }
        if ($row['status'] !== 'rejected') respond(503, ['ok'=>false,'error'=>'delivery_unknown','request_id'=>$requestId]);
    }
    if ($claim) respond(409, ['ok'=>false,'error'=>'not_queued']);
    if (!$row) {
        $requestId = strtoupper(bin2hex(random_bytes(6)));
        $row = ['id'=>$requestId,'hash'=>$digest,'client_id'=>$cid,'claimed'=>false];
    } else {
        $context = array_values(array_filter($context, function($line){return strpos($line,'ClientID: ') !== 0;}));
        if ($row['client_id'] !== '') $context[] = 'ClientID: ' . $row['client_id'];
    }
    // A worker that dies after this reservation may already have queued mail.
    $row['status'] = 'sending'; persist($path,$row);
    $subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта ПЛАНКОД') . '?=';
    $body = "Заявка с сайта plancod.ru\nНомер: {$requestId}\n\n"
        . "Имя: {$name}\nКонтакт: {$contact}\n\nЗадача:\n{$message}\n"
        . ($context ? "\nИсточник и направление:\n" . implode("\n", $context) . "\n" : "");
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'Message-ID: <' . strtolower($requestId) . '@plancod.ru>',
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
        $row['status'] = 'rejected'; persist($path,$row);
        respond(503, ['ok'=>false,'error'=>'mail_rejected','request_id'=>$requestId]);
    }
    $row['status'] = 'queued'; persist($path,$row);
    error_log('PLANKOD mail accepted request=' . $requestId . ' transport=local');
    respond(200, ['ok' => true, 'status' => 'queued', 'request_id' => $requestId]);
} catch (\Throwable $error) {
    $id = $requestId ?? 'unavailable';
    // No message contents, credentials or raw server errors in the public response.
    error_log('PLANKOD mail failed request=' . $id . ': ' . $error->getMessage());
    respond(503, ['ok' => false, 'error' => (($row['status'] ?? '') === 'sending' ? 'delivery_unknown' : 'mail_unavailable'), 'request_id' => $id]);
}
