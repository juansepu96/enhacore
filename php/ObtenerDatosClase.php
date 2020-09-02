<?php

require_once "PDO.php";

$dato = $_POST['valorBusqueda'];

$ObtenerClase = $conexion->prepare("SELECT * from class WHERE ID=:dato");
$ObtenerClase -> bindParam(':dato',$dato);
$ObtenerClase -> execute();

$result = $ObtenerClase->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));

?>