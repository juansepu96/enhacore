<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);

//Actualizar datos en las clases

$UpdateClases=$conexion->prepare("UPDATE class SET act_name=:act_name,detail=:detail WHERE act_ID=:id");
$UpdateClases->bindParam(':id',$datos[0]);
$UpdateClases->bindParam(':act_name',$datos[1]);
$UpdateClases->bindParam(':detail',$datos[2]);
$UpdateClases->execute();


$ActializarActividad = $conexion->prepare("UPDATE acts SET name=:name,detail=:detail WHERE ID=:id");
$ActializarActividad -> bindParam(':id',$datos[0]);
$ActializarActividad -> bindParam(':name',$datos[1]);
$ActializarActividad -> bindParam(':detail',$datos[2]);
if($ActializarActividad -> execute()){
    echo "OK";
}else{
    echo "NO";
}



?>
