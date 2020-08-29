<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];
$datos=json_decode($datos);

//Obtener Nombre Profesor
$ObtenerNombreProf=$conexion->prepare("SELECT * from users WHERE ID=:id");
$ObtenerNombreProf->bindParam(':id',$datos[0]);
$ObtenerNombreProf->execute();
foreach($ObtenerNombreProf as $NombreProf){
    $profesor=$NombreProf['name'];
}

//Obtener Nombre Actividad
$ObtenerNombreAct=$conexion->prepare("SELECT * from acts WHERE ID=:id");
$ObtenerNombreAct->bindParam(':id',$datos[1]);
$ObtenerNombreAct->execute();
foreach($ObtenerNombreAct as $NombreAct){
    $actividad=$NombreAct['name'];
}


$InsertarClase = $conexion->prepare("INSERT INTO class (teacher_name,date,time,max,remain,act_name,teacher_ID,act_ID) VALUES (:teacher_name,:date,:time,:max,:remain,:act_name,:teacher_ID,:act_ID)");
$InsertarClase -> bindParam(':teacher_name',$profesor);
$InsertarClase -> bindParam(':date',$datos[2]);
$InsertarClase -> bindParam(':time',$datos[3]);
$InsertarClase -> bindParam(':max',$datos[4]);
$InsertarClase -> bindParam(':remain',$datos[5]);
$InsertarClase -> bindParam(':act_name',$actividad);
$InsertarClase -> bindParam(':teacher_ID',$datos[0]);
$InsertarClase -> bindParam(':act_ID',$datos[1]);
if($InsertarClase -> execute()){
    echo "OK";
}else{
    echo "NO";
}


?>