<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

header('Content-Type: application/json');

try {
    $query = "SELECT e.id, e.descripcion, e.fecha, e.hora, e.lugar, e.expositor 
              FROM eventos e 
              INNER JOIN habilitacion_calificacion h ON e.id = h.id_evento 
              ORDER BY e.fecha ASC, e.hora ASC";
    
    $result = mysqli_query($connection, $query);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $events = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $events[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'events' => $events
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

mysqli_close($connection);
?>