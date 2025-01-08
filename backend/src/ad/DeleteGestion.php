<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        throw new Exception('ID no proporcionado');
    }

    $id = (int)$data['id'];

    // Obtener la gestión antes de eliminarla
    $query = "SELECT gestion FROM gestion WHERE id_gestion = ?";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    
    if (!$row) {
        throw new Exception('Gestión no encontrada');
    }

    $gestion = $row['gestion'];

    // Eliminar la gestión de la base de datos
    $deleteQuery = "DELETE FROM gestion WHERE id_gestion = ?";
    $stmt = mysqli_prepare($connection, $deleteQuery);
    mysqli_stmt_bind_param($stmt, "i", $id);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    // Eliminar la imagen asociada
    $rutaImagen = "../../certificates/gestion_" . $gestion . ".jpg";
    if (file_exists($rutaImagen)) {
        unlink($rutaImagen);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Gestión eliminada exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>