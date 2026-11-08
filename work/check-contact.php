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
    if ($GLOBALS['scenario'] === 'smart_context') $valid = $valid && strpos(base64_decode($body), 'service: b2b_supply') !== false && strpos(base64_decode($body), 'utm_source: yandex') !== false;
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
    'smart_context' => [200, true, 1],
    'invalid_service' => [400, false, 0],
    'context_array' => [400, false, 0],
    'context_injection' => [400, false, 0],
    'context_length' => [400, false, 0],
];

if (!isset($argv[1])) {
    // Never read a real config or write receipts into the working copy.
    $temp = sys_get_temp_dir() . '/plancod-mail-test-' . bin2hex(random_bytes(8));
    mkdir($temp . '/www', 0700, true);
    copy(__FILE__, $temp . '/www/check-contact.php');
    copy(__DIR__ . '/contact.php', $temp . '/www/contact.php');
    register_shutdown_function(function() use ($temp) {
        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($temp, \FilesystemIterator::SKIP_DOTS), \RecursiveIteratorIterator::CHILD_FIRST) as $file) {
            if ($file->isDir()) rmdir($file->getPathname()); else unlink($file->getPathname());
        }
        rmdir($temp);
    });
    foreach ($cases as $case => $expected) {
        passthru(escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg($temp . '/www/check-contact.php') . ' ' . escapeshellarg($case), $code);
        if ($code !== 0) exit($code);
    }
    echo "Mail handler: 16 tests passed, no real email sent.\n";
    exit;
}

$scenario = $argv[1];
if (!isset($cases[$scenario])) exit(1);
$mail_calls = 0;
$_SERVER['REQUEST_METHOD'] = 'POST';
$_POST = ['submission_key'=>bin2hex(random_bytes(16)), 'name' => 'Проверка', 'contact' => 'qa@example.invalid', 'message' => 'Тестовая заявка', 'consent' => '1', 'website' => ''];
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

if ($scenario === 'smart_context') $_POST += ['service' => 'b2b_supply', 'page_path' => '/smart-systems/hotels/', 'utm_source' => 'yandex'];
if ($scenario === 'invalid_service') $_POST['service'] = 'unknown';
if ($scenario === 'context_array') $_POST['utm_source'] = ['bad'];
if ($scenario === 'context_injection') $_POST['utm_source'] = "yandex\r\nInjected: bad";
if ($scenario === 'context_length') $_POST['utm_source'] = str_repeat('x', 1001);

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
