<?php

require_once "PDO.php";

$datos=$_POST['valorBusqueda'];

$ObtenerClases = $conexion->prepare("SELECT * FROM bookings INNER JOIN class ON bookings.class_ID=class.ID WHERE user_ID=:id ORDER BY bookings.date DESC");
$ObtenerClases -> bindParam(':id',$datos);
$ObtenerClases -> execute();

$result = $ObtenerClases->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>