<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id_usuario']) || !isset($data['id_gestion']) || !isset($data['nro_certificado'])) {
        throw new Exception('Datos incompletos');
    }

    // Verificar si ya existe la participación
    $checkQuery = "SELECT id_participacion FROM participacion 
                  WHERE id_usuario = ? AND id_gestion = ?";
    $checkStmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, "ii", $data['id_usuario'], $data['id_gestion']);
    mysqli_stmt_execute($checkStmt);
    $checkResult = mysqli_stmt_get_result($checkStmt);
    
    if (mysqli_num_rows($checkResult) > 0) {
        throw new Exception('El usuario ya está registrado en esta gestión');
    }

    // Insertar la participación
    $query = "INSERT INTO participacion (id_usuario, id_gestion, nro_certificado) 
              VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "iis", $data['id_usuario'], $data['id_gestion'], $data['nro_certificado']);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Participación creada exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>