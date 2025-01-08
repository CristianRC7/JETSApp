<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id'])) {
        throw new Exception('Datos incompletos');
    }

    // Revisar si el usuario ya existe
    $checkQuery = "SELECT id FROM usuarios WHERE usuario = ? AND id != ?";
    $checkStmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, "si", $data['usuario'], $data['id']);
    mysqli_stmt_execute($checkStmt);
    $checkResult = mysqli_stmt_get_result($checkStmt);
    
    if (mysqli_num_rows($checkResult) > 0) {
        throw new Exception('El nombre de usuario ya está en uso');
    }

    // Actualizar el usuario
    if (!empty($data['contrasena'])) {
        $query = "UPDATE usuarios SET usuario = ?, contrasena = ?, nombre_completo = ? WHERE id = ?";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "sssi", $data['usuario'], $data['contrasena'], $data['nombre_completo'], $data['id']);
    } else {
        $query = "UPDATE usuarios SET usuario = ?, nombre_completo = ? WHERE id = ?";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "ssi", $data['usuario'], $data['nombre_completo'], $data['id']);
    }
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Usuario actualizado exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al actualizar el usuario: ' . $e->getMessage()
    ]);
}
?>