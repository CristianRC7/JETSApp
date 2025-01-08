<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception('Datos incompletos');
    }

    // Revisar si el usuario ya existe
    $checkQuery = "SELECT id FROM usuarios WHERE usuario = ?";
    $checkStmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, "s", $data['usuario']);
    mysqli_stmt_execute($checkStmt);
    $checkResult = mysqli_stmt_get_result($checkStmt);
    
    if (mysqli_num_rows($checkResult) > 0) {
        throw new Exception('El usuario ya existe');
    }

    // Crear el usuario
    $query = "INSERT INTO usuarios (usuario, contrasena, nombre_completo) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "sss", $data['usuario'], $data['contrasena'], $data['nombre_completo']);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($connection));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Usuario creado exitosamente'
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al crear el usuario: ' . $e->getMessage()
    ]);
}
?>