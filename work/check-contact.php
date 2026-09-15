<?php
// Isolated regression tests. The namespaced mail stub NEVER sends real email.
namespace Plankod\Contact;

function is_readable($path) {
    if (basename($path) === 'plankod-mail-config.php') return false;
    return \is_readable($path);
}

function mail($to, $subject, $body, $headers, $params) {
    $GLOBALS['mail_calls']++;
    $valid = $to === 'info@plancod.ru'
        && $params === '-finfo@plancod.ru'
        && strpos($headers, 'From: =?UTF-8?B?') !== false
        && strpos($headers, 'Reply-To: qa@example.invalid') !== false
        && strpos($headers, "\r\nBcc:") === false
        && strpos(base64_decode($body), 'Тестовая заявка') !== false
        && strpos($subject, '=?UTF-8?B?') === 0;
    if (!$valid) throw new \RuntimeException('Malformed test message');
    if ($GLOBALS['scenario'] === 'exception') throw new \RuntimeException('PRIVATE INTERNAL ERROR');
    return $GLOBALS['scenario'] !== 'rejected';
}

$cases = [
    'success' => [200, true, 1],
    'rejected' => [503, false, 1],
    'exception' => [503, false, 1],
    'method' => [405, false, 0],
    'empty' => [400, false, 0],
    'array' => [400, false, 0],
    'consent' => [400, false, 0],
    'injection' => [400, false, 0],
    'honeypot' => [400, false, 0],
    'long' => [400, false, 0],
    'fixed_recipient' => [200, true, 1],
];

if (!isset($argv[1])) {
    foreach ($cases as $case => $expected) {
        passthru(escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg(__FILE__) . ' ' . escapeshellarg($case), $code);
        if ($code !== 0) exit($code);
    }
    echo "Mail handler: 11 tests passed, no real email sent.\n";
    exit;
}

$scenario = $argv[1];
if (!isset($cases[$scenario])) exit(1);
$mail_calls = 0;
$_SERVER['REQUEST_METHOD'] = 'POST';
$_POST = ['name' => 'Проверка', 'contact' => 'qa@example.invalid', 'message' => 'Тестовая заявка', 'consent' => '1', 'website' => ''];
if ($scenario === 'method') $_SERVER['REQUEST_METHOD'] = 'GET';
if ($scenario === 'empty') $_POST = [];
if ($scenario === 'array') $_POST['name'] = ['bad'];
if ($scenario === 'consent') unset($_POST['consent']);
if ($scenario === 'injection') $_POST['contact'] = "qa@example.invalid\r\nBcc: bad@example.invalid";
if ($scenario === 'honeypot') $_POST['website'] = 'robot';
if ($scenario === 'long') $_POST['message'] = str_repeat('x', 20001);
if ($scenario === 'fixed_recipient') {
    $_POST['recipient'] = 'bad@example.invalid';
    $_POST['from'] = 'bad@example.invalid';
}

ob_start();
register_shutdown_function(function () use ($scenario, $cases) {
    $output = ob_get_clean();
    $data = json_decode($output, true);
    [$status, $ok, $calls] = $cases[$scenario];
    $valid = http_response_code() === $status && is_array($data)
        && $data['ok'] === $ok && $GLOBALS['mail_calls'] === $calls
        && strpos($output, 'PRIVATE INTERNAL ERROR') === false;
    if ($ok) $valid = $valid && $data['status'] === 'queued' && preg_match('/^[A-F0-9]{12}$/', $data['request_id']);
    if (!$valid) {
        fwrite(STDERR, 'FAILED ' . $scenario . ': ' . $output . "\n");
        exit(1);
    }
    echo 'PASS ' . $scenario . "\n";
});
require __DIR__ . '/contact.php';
