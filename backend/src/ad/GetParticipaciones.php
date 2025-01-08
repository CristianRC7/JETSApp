<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    if (!isset($_GET['id_usuario'])) {
        throw new Exception('ID de usuario no proporcionado');
    }
    
    $id_usuario = (int)$_GET['id_usuario'];
    
    $query = "SELECT p.*, g.gestion 
              FROM participacion p 
              JOIN gestion g ON p.id_gestion = g.id_gestion 
              WHERE p.id_usuario = ?
              ORDER BY g.gestion DESC";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "i", $id_usuario);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $participaciones = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $participaciones[] = $row;
    }

    echo json_encode([
        'success' => true,
        'participaciones' => $participaciones
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener las participaciones: ' . $e->getMessage()
    ]);
}
?>