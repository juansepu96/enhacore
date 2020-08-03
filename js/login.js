function Acceder(){
    user = $("#user").val();
    pass = $("#password").val();
    datos = user+"@#"+pass;
    $.post("../php/Acceder.php",{valorBusqueda:datos})
        .then((rta)=>{
            if(rta !="NO"){ 
                console.log(rta);
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
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning' 
                    message: "ERROR AL INICIAR SESION",
                    timer: 3000
                  })
            }
        })
}