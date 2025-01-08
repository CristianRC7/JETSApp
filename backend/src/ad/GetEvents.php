<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    $query = "SELECT id, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, 
              TIME_FORMAT(hora, '%H:%i') as hora, 
              descripcion, lugar, expositor 
              FROM eventos 
              ORDER BY fecha ASC, hora ASC";
              
    $result = mysqli_query($connection, $query);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $events = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $events[] = $row;
    }

    echo json_encode([
        'success' => true,
        'events' => $events
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los eventos: ' . $e->getMessage()
    ]);
}
?>