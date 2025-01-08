<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    if (!isset($_POST['gestion'])) {
        throw new Exception('Gestión no proporcionada');
    }

    $gestion = mysqli_real_escape_string($connection, $_POST['gestion']);

    // Verificar si ya existe la gestión
    $checkQuery = "SELECT id_gestion FROM gestion WHERE gestion = ?";
    $stmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($stmt, "s", $gestion);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        throw new Exception('Esta gestión ya existe');
    }

    // Procesar la imagen
    if (!isset($_FILES['imagen'])) {
        throw new Exception('No se proporcionó ninguna imagen');
    }

    $imagen = $_FILES['imagen'];
    $rutaDestino = "../../certificates/gestion_" . $gestion . ".jpg";

    // Convertir la imagen a JPG
    $imagenOriginal = null;
    $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));
    
    switch($extension) {
        case 'jpg':
        case 'jpeg':
            $imagenOriginal = imagecreatefromjpeg($imagen['tmp_name']);
            break;
        case 'png':
            $imagenOriginal = imagecreatefrompng($imagen['tmp_name']);
            break;
        case 'gif':
            $imagenOriginal = imagecreatefromgif($imagen['tmp_name']);
            break;
        default:
            throw new Exception('Formato de imagen no soportado');
    }

    if (!$imagenOriginal) {
        throw new Exception('Error al procesar la imagen');
    }

    // Insertar la gestión
    $insertQuery = "INSERT INTO gestion (gestion) VALUES (?)";
    $stmt = mysqli_prepare($connection, $insertQuery);
    mysqli_stmt_bind_param($stmt, "s", $gestion);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    // Guardar la imagen como JPG
    if (!imagejpeg($imagenOriginal, $rutaDestino, 90)) {
        // Si falla la subida de la imagen, eliminar la gestión
        mysqli_query($connection, "DELETE FROM gestion WHERE gestion = '$gestion'");
        throw new Exception('Error al guardar la imagen');
    }

    // Liberar memoria
    imagedestroy($imagenOriginal);

    echo json_encode([
        'success' => true,
        'message' => 'Gestión creada exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>