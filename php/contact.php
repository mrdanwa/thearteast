<?php
// Aseguramos que se reciban los datos vía POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Configura aquí tu dirección de correo:
    $destinatario = "in@thearteast.es";

    // Recibimos y sanitizamos datos del formulario
    $nombre   = isset($_POST['name'])    ? strip_tags(trim($_POST['name'])) : "";
    $correo   = isset($_POST['email'])   ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : "";
    $telefono = isset($_POST['phone'])   ? strip_tags(trim($_POST['phone'])) : "No proporcionado"; 
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
    $cabeceras .= "Reply-To: $correo\r\n";
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
