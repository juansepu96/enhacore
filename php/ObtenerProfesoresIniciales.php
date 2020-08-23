<?php

require_once "PDO.php";

$ObtenerClientes = $conexion->prepare("SELECT * from users WHERE profile='profesor' ORDER BY name ASC");
$ObtenerClientes->execute();

$result = $ObtenerClientes->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>