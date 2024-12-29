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

    // Establecemos la zona horaria de Bolivia
    date_default_timezone_set('America/La_Paz');
    $currentDate = date('Y-m-d');

    $query = "
        SELECT DISTINCT 
            e.id,
            e.descripcion,
            e.lugar,
            e.expositor,
            DATE_FORMAT(e.fecha, '%Y-%m-%d') as fecha,
            e.hora,
            CASE 
                WHEN c.calificacion IS NOT NULL AND c.calificacion > 0 THEN 'Encuesta Enviada'
                WHEN hc.fecha_habilitada <= ? THEN 'Responder Encuesta'
                ELSE 'Encuesta No Disponible'
            END AS status
        FROM eventos e
        INNER JOIN inscripciones i ON e.id = i.id_evento AND i.id_usuario = ?
        LEFT JOIN calificaciones c ON e.id = c.id_evento AND c.id_usuario = ?
        LEFT JOIN habilitacion_calificacion hc ON e.id = hc.id_evento
        WHERE hc.fecha_habilitada IS NOT NULL
        ORDER BY e.fecha ASC, e.hora ASC
    ";

    $stmt = $connection->prepare($query);
    $stmt->bind_param("sii", $currentDate, $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $eventos = [];
    while ($row = $result->fetch_assoc()) {
        // Aseguramos que la fecha esté en el formato correcto
        $row['fecha'] = date('Y-m-d', strtotime($row['fecha']));
        $eventos[] = $row;
    }

    echo json_encode([
        'success' => true,
        'eventos' => $eventos
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$connection->close();
?>