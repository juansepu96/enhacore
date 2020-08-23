$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});

function CargarProfesores(){  
    $(".filaProfesores").remove();
    $("#errorBusqueda h3").remove();
    $.post("./php/ObtenerProfesoresIniciales.php")
    .then((rta)=>{
            rta = JSON.parse(rta);
            if(rta.length>0){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    var htmlTags = '<tr id="'+id+'" class="filaProfesores" onclick="AbrirProfesor('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td></tr>';
                        }   
                    $('#tabla-profesores tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY PROFESORES PARA MOSTRAR<h3>');
            }
    });
}

function BuscarProfesores(){
    id = $("#buscadorCliente").val();
    $(".filaProfesores").remove();
    $("#errorBusqueda h3").remove();
    $("#buscadorCliente").val("");
    $.post("./php/BuscarProfesores.php",{valorBusqueda:id})
    .then((rta)=> {
            rta = JSON.parse(rta);
            if(rta.length>0){
                rta.forEach(element => {
                    id=element['ID'];
                    estado=element.status;
                    var htmlTags = '<tr id="'+id+'" class="filaProfesores" onclick="AbrirProfesor('+id+');">' +
                    '<td scope="row">' + element.name + '</td>' +
                    '<td>' + element.DNI + '</td>'+
                    '<td>' + element.phone+ '</td>';
                        if(estado==='INACTIVO'){
                            htmlTags=htmlTags+'<td style="color:red;font-weight:bold;">NO ACTIVO</td></tr>';
                        }else{
                            htmlTags=htmlTags+'<td style="color:green;font-weight:bold;">ACTIVO</td></tr>';
                        }   
                    $('#tabla-profesores tbody').append(htmlTags);
                });
            }else{
                $('#errorBusqueda').append('<h3>NO HAY PROFESORES PARA MOSTRAR<h3>');
            }    
    });

}

function NuevoProfesor(){
    const elem = document.getElementById('modalNuevoProfesor');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
}

function CerrarNuevoProfesor(){
    const elem = document.getElementById('modalNuevoProfesor');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    $('#nuevoProfesor')[0].reset();
}

function cargarNuevoProfesor(){
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
    usuario="prof_"+usuario;
    password = dni;
    profile="profesor";
    estado=$("#estado").val();
    datos.push(usuario,password,nombre,profile,dni,telefono,estado,direccion,fnacimiento);
    datos = JSON.stringify(datos);
    if(nombre && dni && direccion && telefono && fnacimiento){ //Validate OK
        $.post("./php/NuevoUsuario.php",{valorBusqueda:datos}, function(rta) {
            if(rta==="OK"){
                $('#nuevoProfesor')[0].reset();
                CerrarNuevoProfesor();
                CargarProfesores();
                cuteAlert({
                    type: "success",
                    title: "CARGA EXITOSA",
                    message: "<b>USUARIO: "+usuario+" <br> CONTRASEÑA: "+password+"</b>",
                    buttonText: "OK"
                })
                
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL CARGAR PROFESOR. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL CARGAR PROFESOR. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }
}

function AbrirProfesor(id){
    const elem = document.getElementById('modalVerProfesor');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
    $('#verProfesor')[0].reset();

    $.post("./php/ObtenerDatosCliente.php",{valorBusqueda:id})
    .then((rta)=>{
        rta = JSON.parse(rta);
        $("#id_prof").val(rta[0].ID);
        $("#nombre_prof").val(rta[0].name);
        $("#dni_prof").val(rta[0].DNI);
        $("#direccion_prof").val(rta[0].dire);
        $("#user_prof").val(rta[0].user);
        $("#telefono_prof").val(rta[0].phone);
        $("#nacimiento_prof").val(rta[0].birthdate);
        $("#estado_prof").val(rta[0].state);
        CargarClases(id);      
    });
}

function ActualizarProfesor(){
    datos = [];
    id=$("#id_prof").val();
    nombre = $("#nombre_prof").val();
    dni = $("#dni_prof").val();
    direccion = $("#direccion_prof").val(); 
    telefono = $("#telefono_prof").val();
    fnacimiento = $("#nacimiento_prof").val();
    estado=$("#estado_prof").val();
    datos.push(id,nombre,dni,telefono,estado,direccion,fnacimiento);
    datos = JSON.stringify(datos);
    if(nombre && dni && direccion && telefono && fnacimiento){ //Validate OK
        $.post("./php/ActualizarUsuario.php",{valorBusqueda:datos})
        .then((rta)=>{
            if(rta==="OK"){
                cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    message: "SE ACTUALIZO LOS DATOS CON ÉXITO",
                    timer: 3000
                  })
                $('#verProfesor')[0].reset();
                CerrarNuevoProfesor();
                AbrirProfesor(id);
            }else{
                cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    message: "ERROR AL ACTUALIZAR PROFESOR. CONTACTE AL ADMINISTRADOR",
                    timer: 3000
                  })
            }
        });
    }else{ //Validate NO
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "ERROR AL ACTUALIZAR PROFESOR. COMPLETA TODOS LOS CAMPOS",
            timer: 3000
          })
    }

}

function CerrarVerProfesor(){
    const elem = document.getElementById('modalVerProfesor');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    $('#verProfesor')[0].reset();
}