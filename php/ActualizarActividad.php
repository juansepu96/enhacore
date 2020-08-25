<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);


$ActializarActividad = $conexion->prepare("UPDATE acts SET name=:name,detail=:detail WHERE ID=:id");
$ActializarActividad -> bindParam(':id',$datos[0]);
$ActializarActividad -> bindParam(':name',$datos[1]);
$ActializarActividad -> bindParam(':detail',$datos[2]);
if($ActializarActividad -> execute()){
    echo "OK";
}else{
    echo "NO";
}
