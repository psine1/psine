<?php

declare(strict_types=1);

const CONTACT_RECIPIENT = 'patricio.sine@gmail.com';
const MAX_REQUEST_BYTES = 20000;
const RATE_LIMIT_SECONDS = 12;

$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false
    || strtolower($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'xmlhttprequest';

function respond(int $status, bool $success, string $message): void
{
    global $wantsJson;

    http_response_code($status);
    header('Cache-Control: no-store');

    if ($wantsJson) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(
            ['success' => $success, 'message' => $message],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
        exit;
    }

    header('Content-Type: text/html; charset=UTF-8');
    $safeMessage = htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $title = $success ? 'Message sent' : 'Message not sent';
    $safeTitle = htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    echo <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$safeTitle} | PSINE</title>
  <style>
    body { display:grid; min-height:100vh; margin:0; place-items:center; background:#202020; color:#f8f8f6; font-family:Arial,sans-serif; }
    main { width:min(560px,calc(100% - 40px)); }
    h1 { margin:0 0 18px; font-size:clamp(44px,9vw,78px); line-height:.9; }
    p { color:#d6d6d2; font-size:18px; line-height:1.45; }
    a { display:inline-block; margin-top:20px; padding:13px 18px; border-radius:999px; background:#ffcf25; color:#111; font-weight:700; text-decoration:none; }
  </style>
</head>
<body><main><h1>{$safeTitle}</h1><p>{$safeMessage}</p><a href="/">Return to PSINE</a></main></body>
</html>
HTML;
    exit;
}

function cleanLine(string $value): string
{
    return trim((string) preg_replace('/[\r\n\t]+/', ' ', $value));
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'This endpoint only accepts contact form submissions.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_REQUEST_BYTES) {
    respond(413, false, 'The message is too large. Please shorten it and try again.');
}

// Honeypot: real visitors never see or fill this field.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, true, 'Your message was sent successfully.');
}

$name = cleanLine((string) ($_POST['name'] ?? ''));
$email = cleanLine((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$source = cleanLine((string) ($_POST['source'] ?? 'PSINE website'));

if (textLength($name) < 2 || textLength($name) > 100) {
    respond(422, false, 'Please enter a valid name.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || textLength($email) > 254) {
    respond(422, false, 'Please enter a valid email address.');
}

if (textLength($message) < 10 || textLength($message) > 5000) {
    respond(422, false, 'Please enter a message between 10 and 5000 characters.');
}

if (textLength($source) > 500) {
    $source = substr($source, 0, 500);
}

$remoteAddress = cleanLine((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
if ($remoteAddress !== '') {
    $rateFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'psine-contact-' . hash('sha256', $remoteAddress);
    $lastSubmission = (int) @file_get_contents($rateFile);
    $now = time();

    if ($lastSubmission > 0 && ($now - $lastSubmission) < RATE_LIMIT_SECONDS) {
        respond(429, false, 'Please wait a few seconds before sending another message.');
    }

    @file_put_contents($rateFile, (string) $now, LOCK_EX);
}

$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$host = explode(':', $host, 2)[0];
$host = preg_replace('/[^a-z0-9.-]/', '', $host) ?: '';
$fallbackDomain = preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/i', $host) ? $host : 'localhost.localdomain';
$configuredFrom = cleanLine((string) (getenv('CONTACT_FROM_EMAIL') ?: ''));
$fromEmail = filter_var($configuredFrom, FILTER_VALIDATE_EMAIL)
    ? $configuredFrom
    : 'no-reply@' . $fallbackDomain;

$subjectText = 'PSINE project inquiry — ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$body = implode("\r\n", [
    'New inquiry from the PSINE website',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Source: ' . $source,
    'IP: ' . ($remoteAddress ?: 'Unavailable'),
    '',
    'Message:',
    $message,
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: PSINE Website <' . $fromEmail . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$sent = @mail(CONTACT_RECIPIENT, $encodedSubject, $body, $headers);

if (!$sent) {
    respond(500, false, 'The server could not send the message. Please try again or email us directly.');
}

respond(200, true, 'Your message was sent successfully.');
