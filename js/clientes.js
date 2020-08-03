$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
  });

function CargarClientes(){  
    $(".filaClientes").remove();
    $("#errorBusqueda h3").remove();
    $.post("../php/ObtenerClientesIniciales.php",{}, function(rta) {
        if(rta){ 
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    var htmlTags = '<tr id="'+id+'" class="filaClientes" onclick="AbrirCliente('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td></tr>';
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
    $.post("../php/BuscarClientes.php",{valorBusqueda:id}, function(rta) {
        if(rta){ 
            rta = JSON.parse(rta);
            if(rta){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    var htmlTags = '<tr id="'+id+'" class="filaClientes" onclick="AbrirCliente('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td></tr>';
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
        $.post("../php/NuevoUsuario.php",{valorBusqueda:datos}, function(rta) {
            if(rta==="OK"){
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