<?php

require_once "PDO.php";

$dato=$_POST['valorBusqueda'];

//Eliminar perfil
$EliminarPerfil = $conexion->prepare("DELETE FROM users WHERE ID=:dato" );
$EliminarPerfil -> bindParam(':dato',$dato);
$EliminarPerfil->execute();


//eliminar todas las clases
$ObtenerClases = $conexion->prepare("DELETE FROM class WHERE teacher_ID=:id ");
$ObtenerClases -> bindParam(':id',$dato);
$ObtenerClases -> execute();

?>