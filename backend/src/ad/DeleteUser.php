<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id'])) {
        throw new Exception('Datos incompletos');
    }

    
    mysqli_begin_transaction($connection);

    try {
        // Eliminar el usuario de la tabla admin
        $queryAdmin = "DELETE FROM admin WHERE id_usuario = ?";
        $stmtAdmin = mysqli_prepare($connection, $queryAdmin);
        mysqli_stmt_bind_param($stmtAdmin, "i", $data['id']);
        mysqli_stmt_execute($stmtAdmin);

        // Eliminar el usuario
        $queryUser = "DELETE FROM usuarios WHERE id = ?";
        $stmtUser = mysqli_prepare($connection, $queryUser);
        mysqli_stmt_bind_param($stmtUser, "i", $data['id']);
        
        if (!mysqli_stmt_execute($stmtUser)) {
            throw new Exception(mysqli_error($connection));
        }

        mysqli_commit($connection);

        echo json_encode([
            'success' => true,
            'message' => 'Usuario eliminado exitosamente'
        ]);
    } catch (Exception $e) {
        mysqli_rollback($connection);
        throw $e;
    }

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al eliminar el usuario: ' . $e->getMessage()
    ]);
}
?>