<?php
    $sername = "localhost";
    $username = "root";
    $password = "";
    $database = "jetsappdb";

    $connection = mysqli_connect($sername, $username, $password, $database);
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    } 
?>