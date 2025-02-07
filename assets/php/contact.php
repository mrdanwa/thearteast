<?php
// At the very top of the file
header('Access-Control-Allow-Origin: *'); // Or specific domain
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Cookie');
header('Access-Control-Allow-Credentials: true');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Credentials: true');
}

// Aseguramos que se reciban los datos vía POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    http_response_code(403);
    exit('Acceso directo no permitido');
}

    // Configura aquí tu dirección de correo:
    $destinatario = "in@thearteast.es";

    // Recibimos y sanitizamos datos del formulario
    $nombre   = isset($_POST['name'])    ? strip_tags(trim($_POST['name'])) : "";
    $correo   = isset($_POST['email'])   ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : "";
    $telefono = isset($_POST['phone'])   ? strip_tags(trim($_POST['phone'])) : ""; 
    $mensaje  = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : "";

    // Validación básica
    if ($nombre === "" || $correo === "" || $mensaje === "") {
        echo "<div class='alert alert-danger'>Por favor, completa todos los campos obligatorios antes de enviar.</div>";
        exit;
    }

    // Opcional: validar formato de email
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "<div class='alert alert-danger'>El formato de correo no es válido.</div>";
        exit;
    }

    // Construimos el asunto y el cuerpo del mensaje
    $asunto = "Nuevo mensaje desde The Arteast Agency";
    $cuerpo = "Has recibido un nuevo mensaje de contacto.\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Email: $correo\n";
    $cuerpo .= "Teléfono: $telefono\n"; // Add phone to the email body
    $cuerpo .= "Mensaje:\n$mensaje\n";

    // Cabeceras para el correo (From y Reply-To)
    $cabeceras  = "From: The Arteast Agency <no-reply@thearteast.es>\r\n";
    $correo = filter_var($correo, FILTER_VALIDATE_EMAIL); // Ensure valid email
    if (!$correo) {
        exit("<div class='alert alert-danger'>Correo inválido.</div>");
    }
    
    $cabeceras .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Enviamos el email
    $mailEnviado = mail($destinatario, $asunto, $cuerpo, $cabeceras);

    // Comprobamos si se envió correctamente
    if ($mailEnviado) {
        echo "<div class='alert alert-success'>¡Tu mensaje se ha enviado correctamente!</div>";
    } else {
        echo "<div class='alert alert-danger'>Hubo un error al enviar tu mensaje.</div>";
    }
} else {
    echo "<div class='alert alert-danger'>Acceso no válido.</div>";
}
?>
