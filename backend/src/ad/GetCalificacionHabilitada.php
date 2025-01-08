<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $id_evento = isset($_GET['id_evento']) ? (int)$_GET['id_evento'] : null;
    
    if (!$id_evento) {
        throw new Exception('ID de evento no proporcionado');
    }

    $query = "SELECT DATE_FORMAT(fecha_habilitada, '%Y-%m-%d') as fecha_habilitada 
              FROM habilitacion_calificacion 
              WHERE id_evento = ?";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "i", $id_evento);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode([
            'success' => true,
            'habilitada' => true,
            'fecha' => $row['fecha_habilitada']
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'habilitada' => false
        ]);
    }

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>