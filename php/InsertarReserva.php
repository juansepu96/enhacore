<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);

$fecha=date("Y-m-d");
$hora = date("H:i:s");     

$InsertarActividad = $conexion->prepare("INSERT INTO bookings (user_ID,prof_ID,date,time,class_ID) VALUES (:user_ID,:prof_ID,:date,:time,:class_ID)");
$InsertarActividad -> bindParam(':user_ID',$datos[0]);
$InsertarActividad -> bindParam(':prof_ID',$datos[1]);
$InsertarActividad -> bindParam(':class_ID',$datos[2]);
$InsertarActividad -> bindParam(':date',$fecha);
$InsertarActividad -> bindParam(':time',$hora);
if($InsertarActividad -> execute()){
    //restar cupos
    $RestarCupos = $conexion->prepare("UPDATE class SET remain=remain+1 WHERE ID=:id");
    $RestarCupos->bindParam(':id',$datos[2]);
    $RestarCupos->execute();
    $rta= "OK";
}else{
    $rta= "NO";
}

echo $rta;


?>
