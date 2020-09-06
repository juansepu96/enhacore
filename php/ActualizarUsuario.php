<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);


$UpdateClases=$conexion->prepare("UPDATE class SET teacher_name=:teacher_name WHERE teacher_ID=:id");
$UpdateClases->bindParam(':id',$datos[0]);
$UpdateClases->bindParam(':teacher_name',$datos[1]);
$UpdateClases->execute();

$ActualizarCliente = $conexion->prepare("UPDATE users SET name=:name,dire=:dire,phone=:phone,DNI=:DNI,status=:status,birthdate=:birthdate WHERE ID=:id");
$ActualizarCliente -> bindParam(':id',$datos[0]);
$ActualizarCliente -> bindParam(':name',$datos[1]);
$ActualizarCliente -> bindParam(':dire',$datos[5]);
$ActualizarCliente -> bindParam(':phone',$datos[3]);
$ActualizarCliente -> bindParam(':DNI',$datos[2]);
$ActualizarCliente -> bindParam(':status',$datos[4]);
$ActualizarCliente -> bindParam(':birthdate',$datos[6]);
if($ActualizarCliente -> execute()){
    echo "OK";
}else{
    echo "NO";
}


?>