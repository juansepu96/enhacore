<?php

require_once "PDO.php";

$datos=$_POST['valorBusqueda'];

$ObtenerClases = $conexion->prepare("SELECT * FROM bookings WHERE user_ID=:dato");
$ObtenerClases -> bindParam(':dato',$datos);
$ObtenerClases -> execute();

echo $ObtenerClases->RowCount();


?>