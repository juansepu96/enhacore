<?php

require_once "PDO.php";

$dato=$_POST['valorBusqueda'];

//eliminar todas las clases
$EliminarClase = $conexion->prepare("DELETE FROM class WHERE ID=:id ");
$EliminarClase -> bindParam(':id',$dato);
$EliminarClase -> execute();

?>