<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);

$CancelarReserva = $conexion->prepare("DELETE FROM bookings WHERE (user_ID=:user AND class_ID=:class)");
$CancelarReserva -> bindParam(':user',$datos[0]);
$CancelarReserva -> bindParam(':class',$datos[2]);
if($CancelarReserva -> execute()){
    //SUMAR CUPOS
    $SumarCupos = $conexion->prepare("UPDATE class SET remain=remain-1 WHERE ID=:id");
    $SumarCupos->bindParam(':id',$datos[2]);
    $SumarCupos->execute();
    $rta= "OK";
}else{
    $rta= "NO";
}

echo $rta;


?>
