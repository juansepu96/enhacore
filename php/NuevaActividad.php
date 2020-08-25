<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);


$InsertarActividad = $conexion->prepare("INSERT INTO acts (name,detail) VALUES (:name,:detail)");
$InsertarActividad -> bindParam(':name',$datos[0]);
$InsertarActividad -> bindParam(':detail',$datos[1]);
$InsertarActividad -> execute();

$ObtenerID=$conexion->query("SELECT * FROM acts ORDER BY ID DESC LIMIT 1");
foreach($ObtenerID as $Act){
    echo $Act['ID'];
break;
}
