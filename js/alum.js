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
                    prof_img=e.prof_img;
                    if(prof_img){
                        prof_img=prof_img.substring(1);
                    }                    
                    html = html + ' <div class="col s12 m6 l3" onclick="ReservarClase('+e.ID+')";> '+
                                ' <div class="card profile-card-3" style="height:100%;width:90%">' +
                                    ' <div class="background-block">' ;
                                    if(act_img){
                                        html=html+'<img src="'+act_img+'" alt="profile-sample1" class="background2"/>' ;
                                    }
                                    html=html+'</div>' +
                                    '<div class="profile-thumb-block"> ';
                                    if(prof_img){
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

function ReservarClase(class_ID){
    $("#inscribir").hide();
    $("#desinscribir").hide();
    $("#agotados").hide();
    $.post("./php/ObtenerIDUsuario.php")
    .then((rta)=>{
        user_ID=rta;
        $.post("./php/ObtenerDatosClase.php",{valorBusqueda:class_ID})
        .then((rta2)=>{
            rta2=JSON.parse(rta2);
            rta2.forEach((e)=>{
                $("#id_profesor2").val(e.teacher_ID);
                $.post("./php/ObtenerDatosActividad.php",{valorBusqueda:e.act_ID})
                .then((act)=>{
                    act=JSON.parse(act);
                    $("#detalle_actividad").val(act[0].detail);
                    $("#fecha").val(e.date);
                    $("#hora").val(e.time);
                    var cupos = e.max-e.remain;
                    $("#cupos").val(cupos);
                    var datos=[];
                    datos.push(class_ID,user_ID);
                    datos=JSON.stringify(datos);
                    $.post("./php/VerificarInscipcion.php",{valorBusqueda:datos})
                    .then((respuesta)=>{
                        if(respuesta=="SI"){
                            $("#desinscribir").show();
                        }else{
                            if(cupos>0){
                                $("#inscribir").show();
                            }else{
                                $("#agotados").show();
                            }
                        }
                    })

                })
                             
            })
            $("#id_clase").val(class_ID);
            $("#id_usuario").val(user_ID);
            AbrirCompletarDatos();
        })

    })
}

function AbrirCompletarDatos(){
    const elem = document.getElementById('modalCompletarDatos');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
}

function CerrarCompletarDatos(){
    const elem = document.getElementById('modalCompletarDatos');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);
}

function Inscribir(){
    var datos =[];
    user_ID=$("#id_usuario").val();
    prof_ID=$("#id_profesor2").val();
    class_ID=$("#id_clase").val();
    datos.push(user_ID,prof_ID,class_ID);
    datos=JSON.stringify(datos);
    $.post("./php/InsertarReserva.php",{valorBusqueda:datos})
    .then((rta)=>{
        if(rta=="OK"){
            CerrarCompletarDatos();
            cuteAlert({
                type: "success",
                title: "TE ANOTASTE CON ÉXITO.",
                message: "RECORDA ESTAR 10 MINUTOS ANTES. TE ESPERAMOS EL "+$("#fecha").val()+" A LAS "+$("#hora").val(),
                buttonText: "OK"
            })
        }else{
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "ERROR AL INSCRIBIRSE. CONTACTE AL ADMINISTRADOR",
                timer: 3000
            })
        }
    })
}

function Deinscribir(){
    var datos =[];
    user_ID=$("#id_usuario").val();
    prof_ID=$("#id_profesor2").val();
    class_ID=$("#id_clase").val();
    datos.push(user_ID,prof_ID,class_ID);
    datos=JSON.stringify(datos);
    $.post("./php/CancelarReserva.php",{valorBusqueda:datos})
    .then((rta)=>{
        if(rta=="OK"){
            CerrarCompletarDatos();
            cuteAlert({
                type: "success",
                title: "TE DISTE DE BAJA CON EXITO.",
                message: "RECORDA QUE PODES ANOTARTE DE NUEVO CUANDO QUIERAS",
                buttonText: "OK"
            })
        }else{
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "ERROR AL DARTE DE BAJA. CONTACTE AL ADMINISTRADOR",
                timer: 3000
            })
        }
    })
}