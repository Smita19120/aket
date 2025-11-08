<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';
require '../PHPMailer-master/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Your DirectAdmin SMTP host
        $mail->SMTPAuth = true;
        $mail->Username = 'contactus.form.js@gmail.com';  // Your DirectAdmin email
        $mail->Password = 'yovekrjtfeioxaoj';        // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465 ; // Use 465 for SSL or 587 for TLS
        $mail->isHTML(true);
        // Email Settings
        $mail->setFrom($email, $name);
        $mail->addAddress('aketintegratedsolutions@gmail.com'); // Your personal email
         $mail->Subject = "Contact Us - {$subject}";
        $mail->Body = "
            <h2>Contact Form</h2>
            <table cellpadding='8' cellspacing='0' border='1' style='border-collapse: collapse; font-family: Arial, sans-serif;'>
                <tr>
                    <th align='left'>Name</th>
                    <td>{$name}</td>
                </tr>
                <tr>
                    <th align='left'>Email</th>
                    <td>{$email}</td>
                </tr>
                 <tr>
                    <th align='left'>Phone</th>
                    <td>{$phone}</td>
                </tr>
                <tr>
                    <th align='left'>Message</th>
                    <td>{$message}</td>
                </tr>
            </table>
        ";        // Send Email
        // Send Email
        if($mail->send()) {
            echo 'OK';
        } else {
            echo 'Message could not be sent.';
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    exit();
}
?>
