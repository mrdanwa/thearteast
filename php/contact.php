<?php
/**
 * contact.php
 * Processes the AJAX contact form submission and returns a response.
 */

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Método de solicitud inválido.';
    exit;
}

// Retrieve form fields
$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    echo 'Por favor, completa todos los campos antes de enviar.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Por favor, ingresa un correo electrónico válido.';
    exit;
}

// Configure mail settings
$to       = 'youremail@example.com'; // <--- Replace with your email
$subject  = 'Nuevo mensaje desde la página web';
$headers  = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$body     = "Has recibido un nuevo mensaje desde tu formulario de contacto:\n\n"
          . "Nombre: $name\n"
          . "Email: $email\n"
          . "Mensaje:\n$message\n";

// Attempt to send the email
if (@mail($to, $subject, $body, $headers)) {
    // Include the word "success" so the AJAX script can detect success
    echo '¡Tu mensaje ha sido enviado con éxito! Pronto nos pondremos en contacto contigo.';
} else {
    echo 'Lo sentimos, ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
}

