<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);


$VerificarInscripcion = $conexion->prepare("SELECT * FROM bookings WHERE user_ID=:user AND class_ID=:class");
$VerificarInscripcion -> bindParam(':user',$datos[1]);
$VerificarInscripcion -> bindParam(':class',$datos[0]);
$VerificarInscripcion->execute();
if($VerificarInscripcion -> RowCount()>0){
    $rta="SI";
}else{
    $rta="NO";
}

echo $rta;


?>
