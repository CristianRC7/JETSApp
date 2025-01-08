<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    $query = "SELECT id_gestion, gestion FROM gestion ORDER BY gestion DESC";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $gestiones = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $gestiones[] = $row;
    }

    echo json_encode([
        'success' => true,
        'gestiones' => $gestiones
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener las gestiones: ' . $e->getMessage()
    ]);
}
?>