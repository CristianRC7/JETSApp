<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id']) || !isset($data['nro_certificado'])) {
        throw new Exception('Datos incompletos');
    }

    $query = "UPDATE participacion SET nro_certificado = ? WHERE id_participacion = ?";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "si", $data['nro_certificado'], $data['id']);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Participación actualizada exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>