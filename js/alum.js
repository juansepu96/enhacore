$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
    $.post("./php/ObtenerNombre.php")
        .then((nombre)=>{
            var html='<h4 style="text-align: center;margin-top: 30px;"> Hola de nuevo, '+nombre+'! <br> Estas son las clases que tenemos para vos ♥</h4>';
            $("#welcome").html(html);
    })
    fecha=moment();
    fecha=fecha.format("YYYY-MM-DD");
    $("#filtro_fecha").val(fecha);
});

function CargarClases(){
    fecha=$("#filtro_fecha").val();
    var datos=[];
    datos.push(fecha,fecha);
    datos=JSON.stringify(datos);
    $(".cardClases").remove();
    $.post("./php/ObtenerClases.php",{valorBusqueda:datos})
    .then((rta)=>{
            rta = JSON.parse(rta);
            var html="";
            if(rta.length>0){
                rta.forEach(e => {
                    fecha = moment(e.date);
                    fecha=fecha.format("DD/MM/YYYY");
                    hora = e.time;
                    hora=hora.substring(0,5);
                    act_img=e.act_img.substring(1)
                    prof_img=e.prof_img.substring(1);
                    html = html + ' <div class="col s12 m6 l3" onclick="ReservarClase('+e.ID+')";> '+
                                ' <div class="card profile-card-3" style="height:100%;width:90%">' +
                                    ' <div class="background-block">' ;
                                    if(act_img){
                                        html=html+'<img src="'+act_img+'" alt="profile-sample1" class="background2"/>' ;
                                    }
                                    html=html+'</div>' +
                                    '<div class="profile-thumb-block"> ';
                                    if(act_img){
                                        html=html+' <img src="'+prof_img+'" alt="profile-image" class="profile"/> ' ;
                                    }                                        
                                    html=html+'</div>'+
                                    '<div class="card-content">'+
                                    '<h2>'+e.act_name.toUpperCase()+'<small> HORA: '+hora+'hs</small></h2><br>'+
                                    '<h2> Prof. '+e.teacher_name+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div> ';
                });
                $("#clases").html(html);
            }else{
                var html="<h2  style='padding:15px;text-align:center';>NO HAY CLASES DISPONIBLES :( </h3>";
                $('#clases').html(html);
            }
    });
}

function ReservarClase(id){
    
}