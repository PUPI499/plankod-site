<?php
// Надёжная отправка заявок через авторизованный SMTP Hostland.
// Секреты не хранятся в Git: конфигурация лежит на сервере уровнем выше www.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Honeypot: скрытое поле, которое настоящие посетители не заполняют.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$contact = trim($_POST['contact'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $contact === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

if (strlen($name) > 240 || strlen($contact) > 360 || strlen($message) > 20000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'fields_too_long']);
    exit;
}

$name = str_replace(["\r", "\n"], ' ', $name);
$contact = str_replace(["\r", "\n"], ' ', $contact);

function smtpReadResponse($socket, array $expectedCodes, $stage = 'response') {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('SMTP ' . $stage . ' response code ' . $code);
    }

    return $response;
}

function smtpCommand($socket, $command, array $expectedCodes, $stage) {
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('SMTP write failed');
    }
    return smtpReadResponse($socket, $expectedCodes, $stage);
}

function sendViaHostlandSmtp($username, $password, $recipient, $subjectText, $body, $replyTo = null) {
    $host = 'mail.hostland.ru';
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $host,
        ],
    ]);

    $socket = stream_socket_client(
        'ssl://' . $host . ':465',
        $errorNumber,
        $errorMessage,
        15,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errorNumber);
    }

    stream_set_timeout($socket, 15);

    try {
        smtpReadResponse($socket, [220], 'greeting');
        smtpCommand($socket, 'EHLO plancod.ru', [250], 'ehlo');
        smtpCommand($socket, 'AUTH LOGIN', [334], 'auth_start');
        smtpCommand($socket, base64_encode($username), [334], 'auth_username');
        smtpCommand($socket, base64_encode($password), [235], 'auth_password');
        smtpCommand($socket, 'MAIL FROM:<' . $username . '>', [250], 'mail_from');
        smtpCommand($socket, 'RCPT TO:<' . $recipient . '>', [250, 251], 'recipient');
        smtpCommand($socket, 'DATA', [354], 'data_start');

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@plancod.ru>',
            'From: ПЛАНКОД <' . $username . '>',
            'To: ' . $recipient,
            'Subject: ' . $encodedSubject,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];

        if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
            $headers[] = 'Reply-To: ' . $replyTo;
        }

        $normalizedBody = str_replace(["\r\n", "\r"], "\n", $body);
        $normalizedBody = str_replace("\n.", "\n..", $normalizedBody);
        fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $normalizedBody) . "\r\n.\r\n");
        smtpReadResponse($socket, [250], 'message');
        // После ответа 250 письмо уже принято сервером. QUIT отправляем
        // вежливо, но не считаем отсутствие ответа ошибкой доставки.
        fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

$config = [];
$configPath = dirname(__DIR__) . '/plankod-mail-config.php';
if (is_readable($configPath)) {
    try {
        $loadedConfig = require $configPath;
        if (is_array($loadedConfig)) {
            $config = $loadedConfig;
        }
    } catch (Throwable $error) {
        error_log('PLANKOD contact form config error: ' . $error->getMessage());
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'mail_config_file_invalid']);
        exit;
    }
}

$smtpUser = $config['username'] ?? (getenv('PLANKOD_SMTP_USER') ?: '');
$smtpPassword = $config['password'] ?? (getenv('PLANKOD_SMTP_PASSWORD') ?: '');
$recipient = $config['recipient'] ?? 'info@plancod.ru';

if ($smtpUser === '' || $smtpPassword === '') {
    error_log('PLANKOD contact form: SMTP is not configured');
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'mail_not_configured']);
    exit;
}

if (!filter_var($smtpUser, FILTER_VALIDATE_EMAIL) || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    error_log('PLANKOD contact form: invalid SMTP email configuration');
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'mail_configuration_invalid']);
    exit;
}

$subject = 'Заявка с сайта ПЛАНКОД';
$body = "Имя: {$name}\n"
      . "Контакт: {$contact}\n\n"
      . "Задача:\n{$message}\n";

try {
    sendViaHostlandSmtp($smtpUser, $smtpPassword, $recipient, $subject, $body, $contact);
    echo json_encode(['ok' => true]);
} catch (Throwable $error) {
    error_log('PLANKOD contact form SMTP error: ' . $error->getMessage());
    $publicError = 'mail_delivery_failed';
    if (strpos($error->getMessage(), '535') !== false) {
        $publicError = 'smtp_authentication_failed';
    } elseif (strpos($error->getMessage(), 'connection failed') !== false) {
        $publicError = 'smtp_connection_failed';
    } elseif (preg_match('/SMTP ([a-z_]+) response code/', $error->getMessage(), $matches)) {
        $publicError = 'smtp_' . $matches[1] . '_failed';
    }
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $publicError]);
}
