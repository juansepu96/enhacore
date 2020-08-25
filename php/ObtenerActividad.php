<?php

require_once "PDO.php";

$dato=$_POST['valorBusqueda'];

$ObtenerActividades = $conexion->prepare("SELECT * from acts WHERE ID=:dato" );
$ObtenerActividades -> bindParam(':dato',$dato);
$ObtenerActividades->execute();

$result = $ObtenerActividades->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>