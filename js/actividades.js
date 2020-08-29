$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});

function CargarActividades(){  
    $(".filaActividades").remove();
    $("#errorBusqueda h3").remove();
    $.post("./php/ObtenerActividadesIniciales.php")
    .then((rta)=>{
            rta = JSON.parse(rta);
            if(rta.length>0){
                rta.forEach(element => {
                    id=element['ID'];
                    imagen=element.img;
                                    
                    var htmlTags = '<tr id="'+id+'" class="filaActividades" onclick="AbrirActividad('+id+');">' +
                    '<td scope="row">' + id + '</td>' +
                    '<td>' + element.name + '</td>'+
                    '<td>' + element.detail+ '</td>';
                    if(imagen){
                        imagen=imagen.substring(1);
                        htmlTags=htmlTags+ '<td><img src="'+imagen+'" class="imagen"/></td></tr>';
                    }else{
                        htmlTags=htmlTags+'<td></td></tr>';
                    }
                   
                    $('#tabla-actividades tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY ACTIVIDADES PARA MOSTRAR<h3>');
            }
    });
}

function NuevaActividad(){
    const elem = document.getElementById('modalNuevaActividad');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
}

function CerrarNuevaActividad(){
    const elem = document.getElementById('modalNuevaActividad');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#imagen_act").val("");
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);
}

function CargarActividad(){
    datos = [];
    nombre = $("#nombre").val();
    descripcion = $("#descripcion").val();    
    datos.push(nombre,descripcion);
    datos = JSON.stringify(datos);
    if(nombre && descripcion){ //Validate OK
        $.post("./php/NuevaActividad.php",{valorBusqueda:datos})
        .then((id)=>{
            if(id){
                
                    var formData = new FormData(document.getElementById("Carga"));
                    formData.append("id", id);
                    $.ajax({
                        url: "./php/recibe.php",
                        type: "post",
                        dataType: "html",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                     })
                     .done((r)=>{
                        CerrarNuevaActividad();
                        CargarActividades();
                        cuteAlert({
                                type: "success",
                                title: "CARGA EXITOSA",
                                message: "SE CARGÓ CON ÉXITO LA ACTIVIDAD. YA PUEDE CARGAR CLASES",
                                buttonText: "OK"
                            })
                     })
                    

            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL CARGAR ACTIVIDAD. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL CARGAR ACTIVIDAD. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }
}

function AbrirActividad(id){
    const elem = document.getElementById('modalVerActividad');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
    $.post("./php/ObtenerActividad.php",{valorBusqueda:id})
    .then((rta)=>{
        rta = JSON.parse(rta);
        $("#id_act").val(rta[0].ID);
        $("#nombre_act").val(rta[0].name);
        $("#descripcion_act").val(rta[0].detail);
        $("#imagen_act").val(rta[0].img);
    });
}

function ActualizarActividad(){
    datos = [];
    id=$("#id_act").val();
    nombre = $("#nombre_act").val();
    descripcion = $("#descripcion_act").val();
    datos.push(id,nombre,descripcion);
    datos = JSON.stringify(datos);
    if(nombre && descripcion){ //Validate OK
        $.post("./php/ActualizarActividad.php",{valorBusqueda:datos})
        .then((rta)=>{
            if(rta==="OK"){
                cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    message: "SE ACTUALIZO LOS DATOS CON ÉXITO",
                    timer: 3000
                  })
                  var formData = new FormData(document.getElementById("Carga_2"));
                    formData.append("id", id);
                    $.ajax({
                        url: "./php/recibe2.php",
                        type: "post",
                        dataType: "html",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                     })
                    .done(()=>{
                        CerrarNuevaActividad();
                        CargarActividades();
                        AbrirActividad(id);
                    })
                
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL ACTUALIZAR ACTIVIDAD. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL ACTUALIZAR ACTIVIDAD. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }

}

function CerrarVerActividad(){
    const elem = document.getElementById('modalVerActividad');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);
}