$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});

function CerrarElegirProfesor(){
    const elem = document.getElementById('modalElegirProfesor');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.close();
        var scroll= { "overflow": 'scroll'};
        $("body").css(scroll);
}

function CargarClases(){
    fecha1=moment();
    fecha1=fecha1.format("YYYY-MM-DD");
    $("#filter_fecha_desde").val(fecha1);
    $("#filter_fecha_hasta").val(fecha1);
    var datos=[];
    datos.push(fecha1,fecha1);
    datos=JSON.stringify(datos);
    $(".filaClases").remove();
    $("#errorBusqueda h3").remove();
    $.post("./php/ObtenerClases.php",{valorBusqueda:datos})
    .then((rta)=>{
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(e => {
                    fecha = moment(e.date);
                    fecha=fecha.format("DD/MM/YYYY");
                    hora = e.time;
                    hora=hora.substring(0,5);
                    var htmlTags = '<tr class="filaClases" onclick="AbrirClase('+e.ID+');">' +
                    '<td scope="row">' + fecha + '</td>' +
                    '<td scope="row">' + hora + '</td>' +
                    '<td>' + e.act_name + '</td>'+
                    '<td>' + e.teacher_name + '</td>'+
                    '<td>' + e.max + '</td>'+
                    '<td>' + e.remain + '</td></tr>';
                    $('#tabla-clases tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY CLASES PARA MOSTRAR<h3>');
            }
    });
}

function NuevaClase(){
    $.post("./php/ObtenerProfesoresActivos.php")
    .then((rta)=>{
        rta=JSON.parse(rta);
        if(rta.length>0){
            var html="";
            rta.forEach((e)=>{
                if(e.status="ACTIVO"){
                    imagen=e.img.substring(1);
                    html = html + ' <div class="col-md-4" onclick="ElegirActividad('+e.ID+');"> '+
                                ' <div class="card profile-card-3"> ' +
                                    ' <div class="background-block">' +
                                        '<img src="./img/logo_letras.png" alt="profile-sample1" class="background"/>' +
                                    '</div>' +
                                    '<div class="profile-thumb-block"> '+
                                        ' <img src="'+imagen+'" alt="profile-image" class="profile"/> ' +
                                    '</div>'+
                                    '<div class="card-content">'+
                                    '<h2>'+e.name.toUpperCase()+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div> ';
                    
                }                
            })
            $("#profesores").html(html);
        }else{
            $("#profesores").html("<h3>No se encontraron profesores activos</h3>");
        }
        const elem = document.getElementById('modalElegirProfesor');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    })
}

function CerrarElegirActividad(){
    const elem = document.getElementById('modalElegirActividad');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.close();
        var scroll= { "overflow": 'scroll'};
        $("body").css(scroll);
}

function ElegirActividad(id){
    $("#id_profesor").val(id);
    CerrarElegirProfesor();
    $.post("./php/ObtenerActividadesIniciales.php")
    .then((rta)=>{
        rta=JSON.parse(rta);
        if(rta.length>0){
            var html="";
            rta.forEach((e)=>{
                    imagen=e.img.substring(1);
                    html = html + ' <div class="col-md-4" onclick="CargarRestantes('+e.ID+');"> '+
                    ' <div class="card profile-card-3"> ' +
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
            $("#actividades").html("<h3>No se encontraron actividades activos</h3>");
        }
        const elem = document.getElementById('modalElegirActividad');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    })

}

function CargarRestantes(id){
    profesor=$("#id_profesor").val();
    $("#id_profesor2").val(profesor);
    $("#id_actividad").val(id);
    CerrarElegirActividad();
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

function CargarNuevaClase(){
    profesor=$("#id_profesor2").val();
    actividad=$("#id_actividad").val();
    fecha=$("#fecha").val();
    hora=$("#hora").val();
    cupos=$("#cupos").val();
    if(fecha && hora && cupos){
        var datos=[];
        inscriptos=0;
        datos.push(profesor,actividad,fecha,hora,cupos,inscriptos);
        datos=JSON.stringify(datos);
        console.log(datos);
        $.post("./php/CargarClase.php",{valorBusqueda:datos})
        .then((rta)=>{
            if(rta=="OK"){
                cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    message: "CLASE CARGADA CON ÉXITO",
                    timer: 3000
                })
                CerrarCompletarDatos();
                CargarClases();
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL CARGAR CLASE. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                })
            }
            
        })
    }else{
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL CARGAR CLASE. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }
}

function ActualizarTabla(){
    fecha1=$("#filter_fecha_desde").val();
    fecha2=$("#filter_fecha_hasta").val();
    var datos=[];
    datos.push(fecha1,fecha2);
    datos=JSON.stringify(datos);
    $(".filaClases").remove();
    $("#errorBusqueda h3").remove();
    $.post("./php/ObtenerClases.php",{valorBusqueda:datos})
    .then((rta)=>{
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(e => {
                    fecha = moment(e.date);
                    fecha=fecha.format("DD/MM/YYYY");
                    hora = e.time;
                    hora=hora.substring(0,5);
                    var htmlTags = '<tr class="filaClases" onclick="AbrirClase('+e.ID+');">' +
                    '<td scope="row">' + fecha + '</td>' +
                    '<td scope="row">' + hora + '</td>' +
                    '<td>' + e.act_name + '</td>'+
                    '<td>' + e.teacher_name + '</td>'+
                    '<td>' + e.max + '</td>'+
                    '<td>' + e.remain + '</td></tr>';
                    $('#tabla-clases tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY CLASES PARA MOSTRAR<h3>');
            }
    });
}