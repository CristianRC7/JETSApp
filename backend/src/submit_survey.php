<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    $userId = $data['userId'];
    $eventId = $data['eventId'];
    $rating = $data['rating'];

    if (!$userId || !$eventId || !$rating) {
        throw new Exception('Datos incompletos');
    }

    // Verificar si ya existe una calificación
    $checkQuery = "SELECT calificacion FROM calificaciones WHERE id_usuario = ? AND id_evento = ?";
    $checkStmt = $connection->prepare($checkQuery);
    $checkStmt->bind_param("ii", $userId, $eventId);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($row['calificacion'] !== null) {
            echo json_encode(['success' => false, 'message' => 'Ya has calificado este evento']);
            exit;
        }
        
        // Si existe pero es NULL, actualizar
        $updateQuery = "UPDATE calificaciones SET calificacion = ? WHERE id_usuario = ? AND id_evento = ?";
        $updateStmt = $connection->prepare($updateQuery);
        $updateStmt->bind_param("iii", $rating, $userId, $eventId);
        $updateStmt->execute();
    } else {
        // Si no existe, insertar nuevo
        $insertQuery = "INSERT INTO calificaciones (id_usuario, id_evento, calificacion) VALUES (?, ?, ?)";
        $insertStmt = $connection->prepare($insertQuery);
        $insertStmt->bind_param("iii", $userId, $eventId, $rating);
        $insertStmt->execute();
    }

    echo json_encode(['success' => true, 'message' => 'Calificación guardada correctamente']);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$connection->close();
?>