<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Заголовок для JSON-відповіді
header('Content-Type: application/json; charset=utf-8'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $company = $_POST['company'] ?? '';
    $message = $_POST['message'] ?? '';

    // Перевірка обов'язкових полів
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Будь ласка, заповніть усі обов\'язкові поля.']);
        exit;
    }

    // Створюємо новий об'єкт PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Налаштування SMTP для Mailtrap
      
        $mail->isSMTP();
        $mail->Host = 'live.smtp.mailtrap.io';
        $mail->Port = 587;
        $mail->SMTPAuth = true;
        $mail->Username = 'api'; // Ваш логін Mailtrap
        $mail->Password = 'aa4cce8d0c58a5fe3f0ca497a07e4739'; // Ваш пароль Mailtrap
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
      

        // Встановлюємо відправника і отримувача
        $mail->setFrom('mailtrap@demomailtrap.com', 'Your Name'); // Адреса електронної пошти з домену Mailtrap
    $mail->addAddress('igorval74@gmail.com'); // Адреса отримувача
        $mail->Subject = 'Test Email via Mailtrap SMTP';
        // Встановлюємо формат листа
        $mail->isHTML(true);
        $mail->Subject = 'Повідомлення з форми контакту';
        $mail->CharSet = 'UTF-8'; 

        // Встановлюємо вміст листа
        $mail->Body = "
        <html>
        <head>
            <meta charset='UTF-8'>
        </head>
        <body>
            <h2>Новий контакт:</h2>
            <p><strong>Ім'я:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Телефон:</strong> $phone</p>
            <p><strong>Компанія:</strong> $company</p>
            <p><strong>Повідомлення:</strong><br>$message</p>
        </body>
        </html>
        ";

        // Відправляємо лист
        if ($mail->send()) {
            echo json_encode(['status' => 'success', 'message' => 'success!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'error']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'error ' . $mail->ErrorInfo]);
    }
}
?>