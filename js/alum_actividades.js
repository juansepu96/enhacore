$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});

function CargarActividades(){  
    $.post("./php/ObtenerActividadesIniciales.php")
    .then((rta)=>{
        rta=JSON.parse(rta);
        if(rta.length>0){
            var html="";
            rta.forEach((e)=>{
                    imagen=e.img.substring(1);
                    html = html + ' <div class="col s12 m6 l3"> '+
                                    ' <div class="card profile-card-3" style="height:100%;width:90%">' +
                        ' <div class="background-block">' +
                            '<img src="'+imagen+'" alt="profile-sample1" class="background2"/>' +
                        '</div>' +
                        '<div class="profile-thumb-block"> '+
                        '</div>'+
                        '<div class="card-content">'+
                        '<h2>'+e.name.toUpperCase()+'</h2>'+
                        '</div>'+
                    '</div>'+
                '</div> '; 
            })
            $("#actividades").html(html);
        }else{
            $("#actividades").html("<h3>No se encontraron actividades</h3>");
        }
    })
}