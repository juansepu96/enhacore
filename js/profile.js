$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
});


function CargarDatosAlum(){
    $.post("./php/ObtenerIDUsuario.php")
    .then((id)=>{
        $.post("./php/ObtenerDatosCliente.php",{valorBusqueda:id})
        .then((info)=>{
            info=JSON.parse(info);
            info.forEach((e)=>{
                $("#id_persona").val(e.ID);
                html='<h1>'+e.name+'</h1>';
                $("#name").html(html);
                $("#nombre").val(e.name);
                $("#telefono").val(e.phone);
                $("#username").val(e.user);
                $("#profile_photo").attr("src",e.img.substring(1));
                $("#DNI").val(e.DNI);
                $("#direccion").val(e.dire);
                $("#fnacimiento").val(e.birthdate);
            })
            $.post("./php/ObtenerCantidadClases.php",{valorBusqueda:id})
            .then((cant)=>{
                html='<span class="pull-left"><strong>Total: </strong></span>'+cant;
                $("#cantidad").html(html);
            })
            $.post("./php/ObtenerClasesPersona.php",{valorBusqueda:id})
            .then((clases)=>{
                clases=JSON.parse(clases);
                if(clases.length>0){
                    html="";
                    clases.forEach((c)=>{
                        fecha=moment(c.date);
                        fecha=fecha.format("DD/MM/YYYY");
                        html=html+'<li class="list-group-item text-center"><span class="pull-left"><strong>'+fecha+' - '+c.act_name+'</strong></span></li>';
                    })
                    $("#list-clases").append(html);
                }
            })
            
        })
    })
}

function CambiarImagen(){
    id=$("#id_persona").val();
    var formData = new FormData(document.getElementById("foto"));
       formData.append("id", id);
       $.ajax({
           url: "./php/recibeProf.php",
           type: "post",
           dataType: "html",
           data: formData,
           cache: false,
           contentType: false,
           processData: false
        })
       .done(()=>{
            cuteAlert({
                type: "success",
                title: "SE ACTUALIZARON TUS DATOS",
                message: "PRESIONA OK PARA RECARGAR LA PAGINA",
                buttonText: "OK"
            }).then(()=>{
                location.reload();
            })
   })
}

function ActualizarDatos(){
    id=$("#id_persona").val();
    nombre = $("#nombre").val();
    DNI = $("#DNI").val();
    telefono = $("#telefono").val();
    direccion = $("#direccion").val();
    fnacimiento = $("#fnacimiento").val();
    var datos = [];
    datos.push(id,nombre,DNI,telefono,direccion,fnacimiento);
    datos=JSON.stringify(datos);
    $.post("./php/ActualizarAlumno.php",{valorBusqueda:datos})
    .then(()=>{
        cuteAlert({
            type: "success",
            title: "SE ACTUALIZARON TUS DATOS",
            message: "PRESIONA OK PARA RECARGAR LA PAGINA",
            buttonText: "OK"
        }).then(()=>{
            location.reload();
        })
    })
}