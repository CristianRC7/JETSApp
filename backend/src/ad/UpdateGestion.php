<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    if (!isset($_POST['id']) || !isset($_POST['gestion'])) {
        throw new Exception('Datos incompletos');
    }

    $id = (int)$_POST['id'];
    $gestion = mysqli_real_escape_string($connection, $_POST['gestion']);

    // Obtener la gestión actual
    $query = "SELECT gestion FROM gestion WHERE id_gestion = ?";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    $gestionAntigua = $row['gestion'];

    // Verificar si existe otra gestión con el mismo nombre
    $checkQuery = "SELECT id_gestion FROM gestion WHERE gestion = ? AND id_gestion != ?";
    $stmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($stmt, "si", $gestion, $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        throw new Exception('Ya existe una gestión con ese nombre');
    }

    // Actualizar la gestión
    $updateQuery = "UPDATE gestion SET gestion = ? WHERE id_gestion = ?";
    $stmt = mysqli_prepare($connection, $updateQuery);
    mysqli_stmt_bind_param($stmt, "si", $gestion, $id);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    // Si hay una nueva imagen, procesarla
    if (isset($_FILES['imagen'])) {
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

        // Eliminar la imagen antigua si existe y es diferente
        if ($gestionAntigua !== $gestion) {
            $rutaAntigua = "../../certificates/gestion_" . $gestionAntigua . ".jpg";
            if (file_exists($rutaAntigua)) {
                unlink($rutaAntigua);
            }
        }

        // Guardar la nueva imagen como JPG
        if (!imagejpeg($imagenOriginal, $rutaDestino, 90)) {
            throw new Exception('Error al guardar la imagen');
        }

        // Liberar memoria
        imagedestroy($imagenOriginal);
    } else if ($gestionAntigua !== $gestion) {
        // Si no hay nueva imagen pero cambió el nombre de la gestión, renombrar la imagen
        $rutaAntigua = "../../certificates/gestion_" . $gestionAntigua . ".jpg";
        $rutaNueva = "../../certificates/gestion_" . $gestion . ".jpg";
        if (file_exists($rutaAntigua)) {
            rename($rutaAntigua, $rutaNueva);
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Gestión actualizada exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>