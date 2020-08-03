<?php

require_once "PDO.php";

$dato = $_POST['valorBusqueda'];
$dato='%'.$dato.'%';

$Buscarclientes = $conexion->prepare("SELECT * from users WHERE ((name LIKE :dato) OR (DNI LIKE :dato)) AND (profile='alumna') ");
$Buscarclientes -> bindParam(':dato',$dato);
$Buscarclientes -> execute();

$result = $Buscarclientes->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>