<?php

require_once "PDO.php";

$dato=$_POST['valorBusqueda'];

//Eliminar perfil
$EliminarPerfil = $conexion->prepare("DELETE users WHERE ID=:dato" );
$EliminarPerfil -> bindParam(':dato',$dato);
$EliminarPerfil->execute();


//Eliminar reserva a clase
$ObtenerClases = $conexion->prepare("SELECT * FROM bookings WHERE user_ID=:id ");
$ObtenerClases -> bindParam(':id',$dato);
$ObtenerClases->execute();
foreach($ObtenerClases as $Clase){
    //Actualizar cupos
    $ActualizarCupo = $conexion->prepare("UPDATE class SET remain=remain-1 WHERE ID=:id2");
    $ActualizarCupo -> bindParam(':id2',$Clase['class_ID']);
    $ActualizarCupo -> execute();
}

//eliminar todas las reservas
$ObtenerClases = $conexion->prepare("SELECT * FROM bookings WHERE user_ID=:id ");
$ObtenerClases -> bindParam(':id',$dato);
$ObtenerClases -> execute();

?>