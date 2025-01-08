<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data['usuario'];
    $contrasena = $data['contrasena'];

    $query = "SELECT u.* FROM usuarios u 
              INNER JOIN admin a ON u.id = a.id_usuario 
              WHERE u.usuario = ? AND u.contrasena = ?";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "ss", $usuario, $contrasena);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'user' => $user
        ]);
    } else {
        $query = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
        $stmt = mysqli_prepare($connection, $query);
        mysqli_stmt_bind_param($stmt, "ss", $usuario, $contrasena);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'No tienes el rol correspondiente'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuario o contraseña incorrectos'
            ]);
        }
    }
    mysqli_stmt_close($stmt);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
}
?>