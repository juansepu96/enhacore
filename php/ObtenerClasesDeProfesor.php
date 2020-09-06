<?php

require_once "PDO.php";

$datos=$_POST['valorBusqueda'];
$datos=json_decode($datos,true);
$id=$datos[0];
$fecha1=$datos[1];
$fecha2=$datos[2];

$ObtenerClases = $conexion->prepare("SELECT * FROM class WHERE (date BETWEEN :fecha1 and :fecha2) AND (teacher_ID=:id)  ORDER BY time ASC");
$ObtenerClases -> bindParam(':fecha1',$fecha1);
$ObtenerClases -> bindParam(':fecha2',$fecha2);
$ObtenerClases -> bindParam(':id',$id);
$ObtenerClases -> execute();

$result = $ObtenerClases->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>