<?php
$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp','webp'); // valid extensions
$path = '../img/'; // upload directory
        $img = $_FILES['imagen']['name'];
        $tmp = $_FILES['imagen']['tmp_name'];
        // get uploaded file's extension
        $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
        // can upload same image using rand function
        $final_image = rand(1000,1000000).$img;
        // check's valid format
        if(in_array($ext, $valid_extensions)) { 
            $path = $path.strtolower($final_image); 
            if(move_uploaded_file($tmp,$path))  {
                $act=$_POST['id'];
                include_once './PDO.php';
                $insert = $conexion->prepare("UPDATE users SET img=:img WHERE ID=:id");
                $insert -> bindParam(':img',$path);
                $insert -> bindparam(':id',$act);
                if($insert-> execute()){
                    echo "OK";
                }else{
                    echo "NO";
                }
                
            }
        }
?>