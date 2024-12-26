<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

header('Content-Type: application/json');

try {
    $query = "SELECT id, hora, descripcion, lugar, expositor, fecha FROM eventos ORDER BY fecha ASC, hora ASC";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $events = array();
    while ($row = mysqli_fetch_assoc($result)) {
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