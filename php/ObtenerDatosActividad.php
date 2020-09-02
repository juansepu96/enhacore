<?php

require_once "PDO.php";

$datos=$_POST['valorBusqueda'];

$ObtenerActividades = $conexion->prepare("SELECT * FROM acts WHERE ID=:id");
$ObtenerActividades -> bindParam(':id',$datos);
$ObtenerActividades -> execute();

$result = $ObtenerActividades->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>