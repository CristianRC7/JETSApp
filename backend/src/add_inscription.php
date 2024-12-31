<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['userId']) || !isset($data['eventId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
    exit;
}

try {
    // Verificar si ya existe la inscripción
    $checkQuery = "SELECT id_inscripcion FROM inscripciones WHERE id_usuario = ? AND id_evento = ?";
    $checkStmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, "ii", $data['userId'], $data['eventId']);
    mysqli_stmt_execute($checkStmt);
    $checkResult = mysqli_stmt_get_result($checkStmt);

    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['status' => 'error', 'message' => 'El usuario ya está inscrito en este evento']);
        exit;
    }

    // Insertar nueva inscripción
    $insertQuery = "INSERT INTO inscripciones (id_usuario, id_evento) VALUES (?, ?)";
    $insertStmt = mysqli_prepare($connection, $insertQuery);
    mysqli_stmt_bind_param($insertStmt, "ii", $data['userId'], $data['eventId']);
    
    if (mysqli_stmt_execute($insertStmt)) {
        echo json_encode(['status' => 'success', 'message' => 'Inscripción realizada con éxito']);
    } else {
        throw new Exception(mysqli_error($connection));
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

mysqli_close($connection);
?>