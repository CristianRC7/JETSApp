<?php
require_once '../db/conexion.php';
require_once '../db/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['usuario']) && isset($data['contrasena'])) {
        $usuario = $data['usuario'];
        $contrasena = $data['contrasena'];

        $query = "SELECT id, usuario, nombre_completo FROM usuarios WHERE usuario = ? AND contrasena = ?";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "ss", $usuario, $contrasena);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($result)) {
            $response = array(
                'status' => 'success',
                'message' => 'Login exitoso',
                'id' => $row['id'],
                'usuario' => $row['usuario'],
                'nombre_completo' => $row['nombre_completo']
            );
            http_response_code(200);
        } else {
            $response = array(
                'status' => 'error',
                'message' => 'Usuario o contraseña incorrectos'
            );
            http_response_code(401);
        }

        mysqli_stmt_close($stmt);
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Datos incompletos'
        );
        http_response_code(400);
    }
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Método no permitido'
    );
    http_response_code(405);
}

mysqli_close($connection);

header('Content-Type: application/json');
echo json_encode($response);
?>