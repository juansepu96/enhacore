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
    $profesor_img=$NombreProf['img'];
}

//Obtener Nombre Actividad
$ObtenerNombreAct=$conexion->prepare("SELECT * from acts WHERE ID=:id");
$ObtenerNombreAct->bindParam(':id',$datos[1]);
$ObtenerNombreAct->execute();
foreach($ObtenerNombreAct as $NombreAct){
    $actividad=$NombreAct['name'];
    $act_img=$NombreAct['img'];
    $detail=$NombreAct['detail'];
}


$InsertarClase = $conexion->prepare("INSERT INTO class (teacher_name,date,time,max,remain,act_name,teacher_ID,act_ID,act_img,prof_img,detail) VALUES (:teacher_name,:date,:time,:max,:remain,:act_name,:teacher_ID,:act_ID,:act_img,:prof_img,:detail)");
$InsertarClase -> bindParam(':teacher_name',$profesor);
$InsertarClase -> bindParam(':date',$datos[2]);
$InsertarClase -> bindParam(':time',$datos[3]);
$InsertarClase -> bindParam(':max',$datos[4]);
$InsertarClase -> bindParam(':remain',$datos[5]);
$InsertarClase -> bindParam(':act_name',$actividad);
$InsertarClase -> bindParam(':teacher_ID',$datos[0]);
$InsertarClase -> bindParam(':act_ID',$datos[1]);
$InsertarClase -> bindParam(':act_img',$act_img);
$InsertarClase -> bindParam(':prof_img',$profesor_img);
$InsertarClase -> bindParam(':detail',$detail);
if($InsertarClase -> execute()){
    echo "OK";
}else{
    echo "NO";
}


?>