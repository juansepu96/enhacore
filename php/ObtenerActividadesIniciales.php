<?php

require_once "PDO.php";

$ObtenerActividades = $conexion->prepare("SELECT * from acts");
$ObtenerActividades->execute();

$result = $ObtenerActividades->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>