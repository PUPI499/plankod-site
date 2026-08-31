<?php
// Обработчик формы заявки для plancod.ru.
// Принимает POST от app/contact-form.tsx (fetch на /contact.php) и
// отправляет письмо через почту хостинга — без сторонних сервисов.

header('Content-Type: application/json; charset=utf-8');

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

// Защита от header injection через перенос строк в однострочных полях.
$name = str_replace(["\r", "\n"], ' ', $name);
$contact = str_replace(["\r", "\n"], ' ', $contact);

$to = 'info@plankod.ru';
$subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта ПЛАНКОД') . '?=';

$body = "Имя: {$name}\n"
      . "Контакт: {$contact}\n\n"
      . "Задача:\n{$message}\n";

$fromDomain = $_SERVER['SERVER_NAME'] ?? 'plancod.ru';
$headers = "From: Site Form <noreply@{$fromDomain}>\r\n"
         . "Reply-To: {$contact}\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_failed']);
}
