<?php

session_start();

date_default_timezone_set('America/Argentina/Buenos_Aires');

if(htmlspecialchars($_SERVER['PHP_SELF']) != "/enhacore/html/index.html"){
	if(!isset($_SESSION['name'])){
		echo '<script>window.location.replace="../html/index.html";</script>';
	}
}


try {
	$conexion = new PDO('mysql:host=localhost;dbname=gym','root','');


}catch(PDOException $e){
		echo "Error" . $e->getMessage();

}

?>