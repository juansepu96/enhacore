$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
    $.post("./php/ObtenerNombre.php")
    .then((nombre)=>{
        var html='<h4 style="text-align: center;margin-top: 80px;"> Hola Prof. '+nombre+'!</h4>';
        $("#welcome").html(html);
})
});


function CargarClases(){
    $.post("./php/ObtenerIDUsuario.php")
    .then((id)=>{
        fecha1=moment();
        fecha1=fecha1.format("YYYY-MM-DD");
        $("#filter_fecha_desde").val(fecha1);
        $("#filter_fecha_hasta").val(fecha1);
        var datos=[];
        datos.push(id,fecha1,fecha1);
        datos=JSON.stringify(datos);
        $(".filaClases").remove();
        $("#errorBusqueda h3").remove();
        $.post("./php/ObtenerClasesDeProfesor.php",{valorBusqueda:datos})
        .then((rta)=>{
                rta = JSON.parse(rta);
                if(rta.length>0){
                    rta.forEach(e => {
                        fecha = moment(e.date);
                        fecha=fecha.format("DD/MM/YYYY");
                        hora = e.time;
                        hora=hora.substring(0,5);
                        restantes=e.max-e.remain;
                        var htmlTags = '<tr class="filaClases" onclick="AbrirClase('+e.ID+');">' +
                        '<td scope="row">' + e.ID + '</td>' +
                        '<td scope="row">' + fecha + '</td>' +
                        '<td scope="row">' + hora + ' hs. </td>' +
                        '<td>' + e.act_name + '</td>'+
                        '<td>' + e.max + '</td>'+
                        '<td>' + e.remain + '</td>'+
                        '<td>' + restantes + '</td></tr>';
                        $('#tabla-clases tbody').append(htmlTags);
                    });
                }else{
                    $('#errorBusqueda').append('<h3>NO HAY CLASES PARA MOSTRAR<h3>');
                }
         })
    });
}


function ActualizarTabla(){
    $.post("./php/ObtenerIDUsuario.php")
    .then((id)=>{
        fecha1=$("#filter_fecha_desde").val();
        fecha2=$("#filter_fecha_hasta").val();
        var datos=[];
        datos.push(id,fecha1,fecha2);
        datos=JSON.stringify(datos);
        $(".filaClases").remove();
        $("#errorBusqueda h3").remove();
        $.post("./php/ObtenerClasesDeProfesor.php",{valorBusqueda:datos})
        .then((rta)=>{
                rta = JSON.parse(rta);
                if(rta.length>0){
                    rta.forEach(e => {
                        fecha = moment(e.date);
                        fecha=fecha.format("DD/MM/YYYY");
                        hora = e.time;
                        hora=hora.substring(0,5);
                        restantes=e.max-e.remain;
                        var htmlTags = '<tr class="filaClases" onclick="AbrirClase('+e.ID+');">' +
                        '<td scope="row">' + e.ID + '</td>' +
                        '<td scope="row">' + fecha + '</td>' +
                        '<td scope="row">' + hora + ' hs. </td>' +
                        '<td>' + e.act_name + '</td>'+
                        '<td>' + e.max + '</td>'+
                        '<td>' + e.remain + '</td>'+
                        '<td>' + restantes + '</td></tr>';
                        $('#tabla-clases tbody').append(htmlTags);
                    });
                }else{
                    $('#errorBusqueda').append('<h3>NO HAY CLASES PARA MOSTRAR<h3>');
                }
         })
    });
}

function AbrirClase(id){
    $(".filaInscriptos").remove();
    $.post("./php/ObtenerInscriptos.php",{valorBusqueda:id})
    .then((rta)=>{
        rta=JSON.parse(rta);
        if(rta.length>0){
            rta.forEach((e)=>{
                fecha=moment(e.date);
                fecha=fecha.format("DD/MM/YYYY");
                var htmlTags = '<tr class="filaInscriptos" >' +
                '<td scope="row">' + fecha + '</td>' +
                '<td>' + e.name+ '</td></tr>';
                $('#inscriptos tbody').append(htmlTags);
            });

            const elem = document.getElementById('modalVerInscriptos');
            const instance = M.Modal.init(elem, {dismissible: false});
            instance.open();
        }
    })
}

function CerrarVerInscriptos(){
    const elem = document.getElementById('modalVerInscriptos');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    var scroll= { "overflow": 'scroll'};
    $("body").css(scroll);

}