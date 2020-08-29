<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);


$InsertarCliente = $conexion->prepare("INSERT INTO users (user,password,name,profile,DNI,phone,status,dire,birthdate) VALUES (:user,:password,:name,:profile,:DNI,:phone,:status,:dire,:birthdate)");
$InsertarCliente -> bindParam(':user',$datos[0]);
$InsertarCliente -> bindParam(':password',$datos[1]);
$InsertarCliente -> bindParam(':name',$datos[2]);
$InsertarCliente -> bindParam(':profile',$datos[3]);
$InsertarCliente -> bindParam(':DNI',$datos[4]);
$InsertarCliente -> bindParam(':phone',$datos[5]);
$InsertarCliente -> bindParam(':status',$datos[6]);
$InsertarCliente -> bindParam(':dire',$datos[7]);
$InsertarCliente -> bindParam(':birthdate',$datos[8]);
$InsertarCliente->execute();

$ObtenerID=$conexion->query("SELECT * FROM users ORDER BY ID DESC LIMIT 1");

foreach($ObtenerID as $Act){
    echo $Act['ID'];
break;
}

?>