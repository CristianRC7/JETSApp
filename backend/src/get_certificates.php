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
    if (!$userId) {
        throw new Exception('ID de usuario no proporcionado');
    }

    $query = "
        SELECT p.nro_certificado, g.gestion
        FROM participacion p
        INNER JOIN gestion g ON p.id_gestion = g.id_gestion
        WHERE p.id_usuario = ?
        ORDER BY g.gestion ASC
    ";

    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $certificates = [];
    while ($row = $result->fetch_assoc()) {
        $certificates[] = $row;
    }

    echo json_encode([
        'success' => true,
        'certificates' => $certificates
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$connection->close();
?>