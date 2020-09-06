function Acceder(){
    user = $("#user").val();
    pass = $("#password").val();
    datos = user+"@#"+pass;
    $.post("./php/Acceder.php",{valorBusqueda:datos})
        .then((rta)=>{
            console.log(rta);
            if(rta !="NO" && rta!="INACTIVO"){ 
                if(rta==="admin"){
                    window.location.replace("admin.html");
                }
                if(rta==="profesor"){
                    window.location.replace("prof.html");
                }
                if(rta==="alumna"){
                    window.location.replace("alum.html");                    
                }
                //window.location.replace("help.html");
            }else{
                if(rta=="NO"){
                    cuteToast({
                        type: "error", // or 'info', 'error', 'warning' 
                        message: "ERROR AL INICIAR SESION",
                        timer: 3000
                    })
                }else{
                    console.log("entre");
                    cuteAlert({
                        type: "error",
                        title: "SU CUENTA SE ENCUENTRA SUSPENDIDA",
                        message: "POR FAVOR, CONTACTESE CON LA ADMINISTRACION.",
                        buttonText: "OK"
                    });
                }
                
            }
        })
}