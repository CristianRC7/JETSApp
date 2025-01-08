<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id'])) {
        throw new Exception('Datos incompletos');
    }

    // Revisar si el usuario ya es administrador
    $checkQuery = "SELECT id_admin FROM admin WHERE id_usuario = ?";
    $checkStmt = mysqli_prepare($connection, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, "i", $data['id']);
    mysqli_stmt_execute($checkStmt);
    $checkResult = mysqli_stmt_get_result($checkStmt);
    
    if (mysqli_num_rows($checkResult) > 0) {
        // Remover los privilegios de administrador
        $query = "DELETE FROM admin WHERE id_usuario = ?";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "i", $data['id']);
        
        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception(mysqli_error($connection));
        }

        $message = 'Privilegios de administrador removidos exitosamente';
    } else {
        // Agregar los privilegios de administrador
        $query = "INSERT INTO admin (id_usuario) VALUES (?)";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "i", $data['id']);
        
        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception(mysqli_error($connection));
        }

        $message = 'Privilegios de administrador otorgados exitosamente';
    }

    echo json_encode([
        'success' => true,
        'message' => $message
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al modificar privilegios de administrador: ' . $e->getMessage()
    ]);
}
?>