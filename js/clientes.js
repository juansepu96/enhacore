$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});

function CargarClientes(){  
    $(".filaClientes").remove();
    $("#errorBusqueda h3").remove();
    $.post("./php/ObtenerClientesIniciales.php",{}, function(rta) {
        if(rta){ 
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    imagen=element.img;
                    var htmlTags = '<tr id="'+id+'" class="filaClientes" onclick="AbrirCliente('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td>';
                        } 
                        if(imagen){
                            imagen=imagen.substring(1);
                            htmlTags=htmlTags+ '<td><img src="'+imagen+'" class="imagen"/></td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td></td></tr>';
                        }  
                    $('#tabla-clientes tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY CLIENTES PARA MOSTRAR<h3>');
            }
            
        }else{
            $('#errorBusqueda').append('<h3>ERROR DE CONEXIÓN CON LA BASE DE DATOS<h3>');
        }
    });
}

function BuscarClientes(){
    id = $("#buscadorCliente").val();
    $(".filaClientes").remove();
    $("#errorBusqueda h3").remove();
    $("#buscadorCliente").val("");
    $.post("./php/BuscarClientes.php",{valorBusqueda:id}, function(rta) {
        if(rta){ 
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    imagen=element.img;
                    var htmlTags = '<tr id="'+id+'" class="filaClientes" onclick="AbrirCliente('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td>';
                        }   
                        if(imagen){
                            imagen=imagen.substring(1);
                            htmlTags=htmlTags+ '<td><img src="'+imagen+'" class="imagen"/></td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td></td></tr>';
                        }  
                    $('#tabla-clientes tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY CLIENTES PARA MOSTRAR<h3>');
            }            
        }else{
            $('#errorBusqueda').append('<h3>ERROR DE CONEXIÓN CON LA BASE DE DATOS<h3>');
        }
    });

}

function NuevoCliente(){
    const elem = document.getElementById('modalNuevoCliente');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
}

function CerrarNuevoCliente(){
    const elem = document.getElementById('modalNuevoCliente');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    $('#verCliente')[0].reset();
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);
}

function cargarNuevoCliente(){
    var usuario="";
    datos = [];
    nombre = $("#nombre").val();
    dni = $("#dni").val();
    direccion = $("#direccion").val(); 
    telefono = $("#telefono").val();
    fnacimiento = $("#nacimiento").val();
    arrayName = nombre.split(' ');
    console.log(arrayName);
    console.log(fnacimiento);
    for(var i=0;i<arrayName.length;i++){
        if(i!=arrayName.length-1){
            usuario=usuario+arrayName[i][0];
        }else{
            usuario=usuario+arrayName[i];
        }
    }
    password = dni;
    profile="alumna";
    estado=$("#estado").val();
    datos.push(usuario,password,nombre,profile,dni,telefono,estado,direccion,fnacimiento);
    datos = JSON.stringify(datos);
    if(nombre && dni && direccion && telefono && fnacimiento){ //Validate OK
        $.post("./php/NuevoUsuario.php",{valorBusqueda:datos})
        .then((rta)=>{
            if(rta!=null){
                $('#verCliente')[0].reset();
                CerrarNuevoCliente();
                CargarClientes();
                cuteAlert({
                    type: "success",
                    title: "CARGA EXITOSA",
                    message: "<b>USUARIO: "+usuario+" <br> CONTRASEÑA: "+password+"</b>",
                    buttonText: "OK"
                })
                
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL CARGAR CLIENTE. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL CARGAR CLIENTE. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }
}

function AbrirCliente(id){
    const elem = document.getElementById('modalVerCliente');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
    $('#verCliente')[0].reset();

    $.post("./php/ObtenerDatosCliente.php",{valorBusqueda:id}, function(rta) {
        rta = JSON.parse(rta);
        if(rta){ 
            if(rta){
                $("#id_cliente").val(rta[0].ID);
                $("#nombre_cliente").val(rta[0].name);
                $("#dni_cliente").val(rta[0].DNI);
                $("#direccion_cliente").val(rta[0].dire);
                $("#user_cliente").val(rta[0].user);
                $("#telefono_cliente").val(rta[0].phone);
                $("#nacimiento_cliente").val(rta[0].birthdate);
                $("#estado_cliente").val(rta[0].state);
                CargarClases(id);
            }            
        };
    });
}

function ActualizarCliente(){
    datos = [];
    id=$("#id_cliente").val();
    nombre = $("#nombre_cliente").val();
    dni = $("#dni_cliente").val();
    direccion = $("#direccion_cliente").val(); 
    telefono = $("#telefono_cliente").val();
    fnacimiento = $("#nacimiento_cliente").val();
    estado=$("#estado_cliente").val();
    datos.push(id,nombre,dni,telefono,estado,direccion,fnacimiento);
    datos = JSON.stringify(datos);
    if(nombre && dni && direccion && telefono && fnacimiento){ //Validate OK
        $.post("./php/ActualizarUsuario.php",{valorBusqueda:datos}, function(rta) {
            if(rta==="OK"){
                cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    message: "SE ACTUALIZO LOS DATOS CON ÉXITO",
                    timer: 3000
                  })
                $('#verCliente')[0].reset();
                CerrarNuevoCliente();
                AbrirCliente(id);
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL ACTUALIZAR CLIENTE. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL ACTUALIZAR CLIENTE. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }

}

function CerrarVerCliente(){
    const elem = document.getElementById('modalVerCliente');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    $('#verCliente')[0].reset();
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);
}