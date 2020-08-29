<?php

require_once "PDO.php";

$ObtenerClientes = $conexion->query("SELECT * from users WHERE (profile='profesor') ORDER BY name ASC");


$result = $ObtenerClientes->fetchAll(\PDO::FETCH_ASSOC);


print_r (json_encode($result));


?>