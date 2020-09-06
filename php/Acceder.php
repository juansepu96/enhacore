<?php

require_once "PDO.php";

$datos = $_POST['valorBusqueda'];

$datos = explode("@#",$datos);

$IniciarSesion = $conexion->prepare("SELECT * from users WHERE user=:user AND password=:password");
$IniciarSesion -> bindParam(':user',$datos[0]);
$IniciarSesion -> bindParam(':password',$datos[1]);
$IniciarSesion -> execute();
$hay=$IniciarSesion->RowCount();

if($hay>0){
    foreach ($IniciarSesion as $Account){
        if($Account['status']=="ACTIVO"){
            $_SESSION['name']=$Account['name'];
            $_SESSION['userID']=$Account['ID'];
            $profile=$Account['profile'];
            echo $profile;
        }else{
            echo "INACTIVO";
        }        
    }
    
}else{
    echo "NO";
}


?>