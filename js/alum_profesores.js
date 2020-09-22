function CargarProfesores(){
    $.post("./php/ObtenerProfesoresActivos.php")
    .then((rta)=>{
        rta=JSON.parse(rta);
        if(rta.length>0){
            var html="";
            rta.forEach((e)=>{
                if(e.status="ACTIVO"){
                    if(e.img){
                        imagen=e.img.substring(1);
                    }else{
                        imagen=e.img;
                    }
                    html = html + ' <div class="col s12 m6 l3" style="width:90%;" onclick="ElegirActividad('+e.ID+');"> '+
                                ' <div class="card profile-card-3"> ' +
                                    ' <div class="background-block">' +
                                        '<img src="./img/logo_letras.png" alt="profile-sample1" class="background"/>' +
                                    '</div>' ;
                                    if(imagen){
                                        html= html + '<div class="profile-thumb-block"> '+
                                            ' <img src="'+imagen+'" alt="profile-image" class="profile"/> ' +
                                            '</div>';
                                    }
                                    html=html+'<div class="card-content">'+
                                    '<h2>'+e.name.toUpperCase()+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div> ';
                    
                }                
            })
            $("#profesores").html(html);
        }else{
            $("#profesores").html("<h3>No se encontraron profesores</h3>");
        }
    });
}