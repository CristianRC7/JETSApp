<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('No se recibieron datos');
    }

    // Convertir la fecha al formato de MySQL
    $fechaParts = explode('/', $data['fecha']);
    if (count($fechaParts) === 3) {
        $fecha = $fechaParts[2] . '-' . $fechaParts[1] . '-' . $fechaParts[0];
    } else {
        throw new Exception('Formato de fecha inválido');
    }

    $hora = $data['hora'];
    $descripcion = $data['descripcion'];
    $lugar = $data['lugar'];
    $expositor = $data['expositor'];

    $query = "INSERT INTO eventos (fecha, hora, descripcion, lugar, expositor) 
              VALUES (STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?, ?)";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "sssss", $fecha, $hora, $descripcion, $lugar, $expositor);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Evento creado exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al crear el evento: ' . $e->getMessage()
    ]);
}
?>