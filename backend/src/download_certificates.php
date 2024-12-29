<?php
require_once '../db/conexion.php';
require_once '../library/vendor/tecnickcom/tcpdf/tcpdf.php';
require_once '../db/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

if (!isset($_GET['userId']) || !isset($_GET['certificateId'])) {
    echo 'Datos incompletos para generar el certificado';
    exit;
}

try {
    $userId = $_GET['userId'];
    $nroCertificado = $_GET['certificateId'];

    $query = "SELECT u.nombre_completo, p.nro_certificado, g.gestion
              FROM usuarios u
              INNER JOIN participacion p ON u.id = p.id_usuario
              INNER JOIN gestion g ON p.id_gestion = g.id_gestion
              WHERE u.id = ? AND p.nro_certificado = ?";

    $stmt = $connection->prepare($query);
    $stmt->bind_param("is", $userId, $nroCertificado);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $row = $result->fetch_assoc()) {
        // Convert nombre_completo to uppercase
        $nombreCompleto = mb_strtoupper($row['nombre_completo'], 'UTF-8');
        $gestion = $row['gestion'];

        // Configurar PDF
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->SetMargins(0, 0, 0);
        $pdf->SetAutoPageBreak(false, 0);
        $pdf->AddPage();

        // Cargar imagen de fondo según la gestión
        $imageFile = "../certificates/gestion_$gestion.jpg";
        $pdf->Image($imageFile, 0, 0, $pdf->getPageWidth(), $pdf->getPageHeight(), '', '', '', false, 300, '', false, false, 0, false, false, false);

        // Configurar fuente y posición del nombre
        $pdf->SetFont('helvetica', 'B', 26);
        $yNombre = 125; // Posición Y por defecto
        
        // Ajustar posición Y según la gestión si es necesario
        if ($gestion == '2022') {
            $yNombre = 143;
        } elseif ($gestion == '2024') {
            $yNombre = 128;
        }

        // Centrar y escribir el nombre en mayúsculas
        $xNombre = ($pdf->getPageWidth() - $pdf->getStringWidth($nombreCompleto)) / 2;
        $pdf->Text($xNombre, $yNombre, $nombreCompleto);

        // Agregar número de certificado
        $pdf->SetFont('helvetica', 'B', 14);
        $xNroCertificado = $pdf->getPageWidth() - 25;
        $yNroCertificado = $pdf->getPageHeight() - 10;
        $pdf->Text($xNroCertificado, $yNroCertificado, 'Nro* ' . $nroCertificado);

        // Generar PDF
        $pdf->Output('certificado.pdf', 'D');
    } else {
        echo "No se encontró la información del certificado";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$connection->close();
?>