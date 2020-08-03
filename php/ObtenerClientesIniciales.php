<?php

require_once "PDO.php";

$ObtenerClientes = $conexion->prepare("SELECT * from users WHERE profile='alumna' ORDER BY name ASC LIMIT 10");
$ObtenerClientes->execute();

$result = $ObtenerClientes->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>