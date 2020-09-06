<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);

$ActualizarCliente = $conexion->prepare("UPDATE users SET name=:name,dire=:dire,phone=:phone,DNI=:DNI,birthdate=:birthdate,password=:DNI WHERE ID=:id");
$ActualizarCliente -> bindParam(':id',$datos[0]);
$ActualizarCliente -> bindParam(':name',$datos[1]);
$ActualizarCliente -> bindParam(':dire',$datos[4]);
$ActualizarCliente -> bindParam(':phone',$datos[3]);
$ActualizarCliente -> bindParam(':DNI',$datos[2]);
$ActualizarCliente -> bindParam(':birthdate',$datos[5]);
if($ActualizarCliente -> execute()){
    echo "OK";
}else{
    echo "NO";
}


?>