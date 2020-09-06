<?php

require_once "PDO.php";

$datos=$_POST['valorBusqueda'];

$ObtenerClases = $conexion->prepare("SELECT * FROM bookings INNER JOIN users ON bookings.user_ID=users.ID WHERE class_ID=:id ORDER BY date ASC");
$ObtenerClases -> bindParam(':id',$datos);
$ObtenerClases -> execute();

$result = $ObtenerClases->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>