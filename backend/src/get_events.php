<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

header('Content-Type: application/json');

try {
    // Establecer la zona horaria a Bolivia
    date_default_timezone_set('America/La_Paz');
    
    // Usar DATE_FORMAT para asegurar un formato de fecha consistente
    $query = "SELECT id, hora, descripcion, lugar, expositor, 
              DATE_FORMAT(fecha, '%Y-%m-%d') as fecha 
              FROM eventos 
              ORDER BY fecha ASC, hora ASC";
    
    $result = mysqli_query($connection, $query);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $events = array();
    while ($row = mysqli_fetch_assoc($result)) {
        // Asegurar que la fecha esté en el formato correcto
        $row['fecha'] = date('Y-m-d', strtotime($row['fecha']));
        $events[] = $row;
    }

    echo json_encode(array(
        'status' => 'success',
        'events' => $events
    ));
} catch (Exception $e) {
    echo json_encode(array(
        'status' => 'error',
        'message' => $e->getMessage()
    ));
}

mysqli_close($connection);
?>