<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    // Paginación
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 20;
    $offset = ($page - 1) * $limit;
    
    // obtengo el total de eventos
    $countQuery = "SELECT COUNT(*) as total FROM eventos";
    $countResult = mysqli_query($connection, $countQuery);
    $totalEvents = mysqli_fetch_assoc($countResult)['total'];
    $totalPages = ceil($totalEvents / $limit);
    
    // obtengo los eventos
    $query = "SELECT id, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha, 
              TIME_FORMAT(hora, '%H:%i') as hora, 
              descripcion, lugar, expositor 
              FROM eventos 
              ORDER BY fecha ASC, hora ASC
              LIMIT ? OFFSET ?";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "ii", $limit, $offset);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $events = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $events[] = $row;
    }

    echo json_encode([
        'success' => true,
        'events' => $events,
        'pagination' => [
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'totalEvents' => $totalEvents,
            'eventsPerPage' => $limit
        ]
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los eventos: ' . $e->getMessage()
    ]);
}
?>