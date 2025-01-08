<?php
require_once '../../db/conexion.php';
require_once '../../db/cors.php';

header('Content-Type: application/json');

try {
    global $connection;
    
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 20;
    $offset = ($page - 1) * $limit;
    
    // Obtenemos el total de usuarios
    $countQuery = "SELECT COUNT(*) as total FROM usuarios";
    $countResult = mysqli_query($connection, $countQuery);
    $totalUsers = mysqli_fetch_assoc($countResult)['total'];
    $totalPages = ceil($totalUsers / $limit);
    
    // Obtenemos los usuarios
    $query = "SELECT u.id, u.usuario, u.nombre_completo, 
              CASE WHEN a.id_admin IS NOT NULL THEN 1 ELSE 0 END as is_admin 
              FROM usuarios u 
              LEFT JOIN admin a ON u.id = a.id_usuario 
              ORDER BY u.nombre_completo ASC 
              LIMIT ? OFFSET ?";
              
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "ii", $limit, $offset);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        throw new Exception(mysqli_error($connection));
    }

    $users = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    echo json_encode([
        'success' => true,
        'users' => $users,
        'pagination' => [
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'totalUsers' => $totalUsers,
            'usersPerPage' => $limit
        ]
    ]);

    mysqli_close($connection);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener los usuarios: ' . $e->getMessage()
    ]);
}
?>