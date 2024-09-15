<!DOCTYPE html>
<html>
<head>

<?php echo '<link href="'.url("/").'/css/fullcalendar.css" rel="stylesheet">' ;?>

<?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script type='text/javascript' src='js/moment.min.js'></script>
<script type='text/javascript' src='js/fullcalendar.min.js'></script>
<script type='text/javascript' src='js/locale/es.js'></script>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/GlobalVarials.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/FunctionsGlobal.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap4-toggle.min.css" rel="stylesheet">
<?php echo '<link href="css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>

<link rel='stylesheet' type='text/css' href='css/general.css' />
<style>
    #calendar{
        width:100%;
    }
    #calendar td , #calendar th,.fc-day{
        
    }
    .fc-day, #calendar td{
        border-left: 1px solid white;
    }
    .ContenedorEvento td{
        background-color:#F2F3F4;
        
    }
    .ContenedorEvento td{
        border:1px solid white;
    }
    
    .fc-button-group .fc-button{
        background-color:white;
        border:1px solid white;
    }
    .fc-state-default {
        background-color: #ffffff;
        background-image: -moz-linear-gradient(top, #ffffff, #ffffff);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#ffffff)); 
        background-image: -webkit-linear-gradient(top, #ffffff, #ffffff);
    }
    .fc-time-grid-event{
        border:1px solid white;
        border-radius:0.5em;
    }
    
    
    .fc-event, .fc-event-dot{
        background-color:#F2F3F4;
    }
</style>
<script>
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

var $DataProyectosHH = null;
var SelProyectosHH = [];

var hoy = new Date();
var dd = hoy.getDate();
if(dd<10) {
    dd='0'+dd;
} 
 
if(mm<10) {
    mm='0'+mm;
}

var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();

dd=addZero(dd);
mm=addZero(mm);


function HHListarActividadesDepartamento(){
    if( $("#DepartamentosHH").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:'feb23628f90bdd23513b1eb6e7324f24',
            data:{Hash:$("#DepartamentosHH").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var ht = "<option value = ''>Seleccione</option>"
                for(var i = 0; i < data.ListActividades.length;i++){
                    ht += "<option value ='"+data.ListActividades[i]['Id']+"'>"+data.ListActividades[i]['Nombre']+"</option>"
                }
                $("#ActividadHH").html(ht)
            }
        })
    }
}

function HHEmpresaListarUnidades(){
    if( $("#EmpresaHH").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:'da8152fcb80e8a23b27b161b520ebca1',
            data:{Hash:$("#EmpresaHH").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var ht = "<option value = ''>Seleccione</option>"
                for(var i = 0; i < data.Unidades.length;i++){
                    ht += "<option value ='"+data.Unidades[i]['IdUnidad']+"'>"+data.Unidades[i]['Nombre']+"</option>"
                }
                $("#UnidadHH").html(ht)
            }
        })
    }
}

function HHEmpresaUnidadListarCliente(){
    if( $("#EmpresaHH").val().length > 0 && $("#UnidadHH").val().length > 0){
        $.ajax({
            type:'POST',
            url:'3dd6bfd429a265b50c2ef1672e4977c7',
            data:{Hash:$("#EmpresaHH").val(),Hash2:$("#UnidadHH").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var ht = "<option value = ''>Seleccione</option>"
                for(var i = 0; i < data.Clientes.length;i++){
                    ht += "<option value ='"+data.Clientes[i]['IdCliente']+"'>"+data.Clientes[i]['NombreComercial']+"</option>"
                }
                $("#ClienteHH").html(ht)
            }
        })
    }
}

function HHListarProyectos(){
    if( $("#EmpresaHH").val().length > 0 && $("#UnidadHH").val().length > 0 && $("#ClienteHH").val().length > 0  ){
            var html = ""
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='IdTipoDoc'>Año:</label>";
                    html += "<select class ='form-control' name = 'YearOT' id = 'YearOT'>";
                        for(var i = 2015; i <= yyyy; i++ ){
                            if( i == yyyy ){
                                html += "<option value = '"+i+"' selected>"+i+"</option>"
                            }else{
                                html += "<option value = '"+i+"'>"+i+"</option>"
                            }
                        }
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='IdTipoDoc'>Buscar:</label>";
                    html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DC_TextBusqueda' name = 'DC_TextBusqueda' />";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<p></p>";
                    html += "<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarProyectos()'/>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'ListProyect'><table class='dataTableX tableNew' id = 'HHProyectos'>"
                html += "<tr>"
                    html += "<th>Sel</th>"
                    html += "<th>Código</th>"
                    html += "<th>Referencia</th>"
                html += "</tr>"
            html += "</table></div><div class = 'ListProyectSel'></div>"
            $(".ContenedorListProyectos").html(html).show()
            $(".ListProyect").css({'height':'150px','overflow-y':'scroll'});
            $(".DivContenedorListProyectos").show()
    }
}

function BuscarProyectos(){
    if( $("#EmpresaHH").val().length > 0 && $("#UnidadHH").val().length > 0 && $("#ClienteHH").val().length > 0  ){
        $.ajax({
                type:'POST',
                url:'1aeacb24e888f1d03f93c026b1440ff9',
                data:{
                    Hash:$("#EmpresaHH").val(),
                    Hash2:$("#UnidadHH").val(),
                    Hash3:$("#ClienteHH").val(),
                    TextBusqueda:$("#DC_TextBusqueda").val(),
                    YearOT:$("#YearOT").val(),
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    var html = ""
                        html += "<table class='dataTableX tableNew' id = 'HHProyectos'>"
                            html += "<tr>"
                                html += "<th>Sel</th>"
                                html += "<th>Código</th>"
                                html += "<th>Referencia</th>"
                            html += "</tr>"
                        
                        for(var i = 0; i < data.Proyectos.length; i++){
                            html += "<tr class = 'Project"+data.Proyectos[i]['Id']+"'>"
                                html += "<td class = 'CenterText'>"
                                    html += "<input type = 'radio' onclick = 'AddProyecto("+data.Proyectos[i]['Id']+")' />"
                                html += "</td>"
                                html +=  "<td class = 'Codigo"+data.Proyectos[i]['Id']+"'>"+data.Proyectos[i]['Codigo']+"</td>"
                                html +=  "<td class = 'NameProyect"+data.Proyectos[i]['Id']+"'>"+data.Proyectos[i]['Referencia']+"</td>"
                            html += "</tr>"
                        }
                        html += "</table>"
                        $(".ListProyect").html(html)
                }
            })
    }
}

function GenerarListaProyectos(){
    var html = "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Código</th>"
            html += "<th>Referencia</th>"
            html += "<th></th>"
        html += "</tr>"
        for(var i = 0; i < SelProyectosHH.length; i++){
            html += "<tr >"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                html += "<td>"+SelProyectosHH[i]['Codigo']+"</td>"
                html += "<td>"+SelProyectosHH[i]['Referencia']+"</td>"
                html += "<td class = 'CenterText ConsultaPro'><img src = 'images/eliminar.png' onclick = 'EliminarRegistroHHProyectos("+i+")'class = 'IconMenuP' onerror='this.src=\"../images/Calendario.png\' /></td>"
            html += "</tr>"
        }
    html += "</table>"
    if( SelProyectosHH.length > 0 ){
        $(".ListProyectSel").html(html).css({'height':'150px','overflow-y':'scroll'})
    }else{
        $(".ListProyectSel").html("").css({'height':'0px'})
    }
}

function EliminarRegistroHHProyectos(i){
    SelProyectosHH.splice(i,1);
    GenerarListaProyectos()
}

function AddProyecto(Hash){
    $(".Project"+Hash).hide()
    SelProyectosHH.push({
        'Id':Hash,
        'Codigo':$(".Codigo"+Hash).text(),
        'Referencia':$(".NameProyect"+Hash).text(),
    })
    GenerarListaProyectos()
}

function HHTiposRegistros(){
    if( $("#TipoRegistroHH").val() == '' ){
        $(".RClienteHH,.ContenedorListProyectos,.REmpresaHH").hide()
        
    }else if( $("#TipoRegistroHH").val() == 'EMPRESA' || $("#TipoRegistroHH").val() == 'Empresa' ){
        $(".RClienteHH,.ContenedorListProyectos").hide()
        $(".REmpresaHH").show()
    }else if( $("#TipoRegistroHH").val() == 'PERSONAL' || $("#TipoRegistroHH").val() == 'Personal'){
        $(".RClienteHH,.ContenedorListProyectos,.REmpresaHH").hide()

    }else if( $("#TipoRegistroHH").val() == 'CLIENTE' || $("#TipoRegistroHH").val() == 'Cliente'){
        $(".RClienteHH,.ContenedorListProyectos,.REmpresaHH").show()
    }
}

function RegistrarHorasHombre(start, end, jsEvent, view){
    SelProyectosHH = [];
    $.ajax({
        type:'POST',
        url:UrlGeneral+'80d0ea32d6299b1eb289757e5ff4bf05',
        data:{
            _token:document.getElementsByName('_token')[0].value,
        },
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlGeneral+"images/HoH.png' height='50px'  onerror='this.src=\"../images/HoH.png\' /> <span class = 'TituloBuscador'>Registrar Actividades</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '"+UrlGeneral+"images/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            //html += "<form class='form-signin FormsGeneral' action='"+UrlGeneral+"5368c3e4f671ab58136634a696c80597' method='post' enctype='multipart/form-data'>";
                html += "<div class='modal-body FormsGeneral'>";
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-row my-4'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Tipo de Registro:</label>";
                            html += "<select class = 'form-control' name = 'TipoRegistroHH' id = 'TipoRegistroHH' required onchange = 'HHTiposRegistros()'>"
                                html += "<option value = 'EMPRESA' selected>Empresa</option>"
                                html += "<option value = 'CLIENTE'>Cliente</option>"
                                html += "<option value = 'PERSONAL'>Personal</option>"
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select class = 'form-control' name = 'DepartamentosHH' id = 'DepartamentosHH' required onchange = 'HHListarActividadesDepartamento()'>"
                                html += "<option value = ''>Seleccione</option>"
                                for(var i = 0; i < data.ListDeptos.length; i++){
                                    html += "<option value = '"+data.ListDeptos[i]['Id']+"'>"+data.ListDeptos[i]['Departamento']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Actividad:</label>";
                            html += "<select class = 'form-control' name = 'ActividadHH' id = 'ActividadHH' required >"
                                html += "<option value = ''>Seleccione</option>"
                            html += "</select>"
                        html += "</div>";
                    html += "</div>"
                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-3'>";
                            var FechaInicial = "";
                            var HoraInicial = "";
                            
                            var FechaFinal = "";
                            var HoraFinal = "";
                            if( start != 0 ){
                                var t = start.format().split("T");
                                FechaInicial = t[0];
                                var t2 = t[1].split(":")
                                HoraInicial = t2[0]+":"+t2[1];
                                
                                t = end.format().split("T");
                                FechaFinal = t[0];
                                var t2 = t[1].split(":")
                                HoraFinal = t2[0]+":"+t2[1];
                            }
                        
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Desde:</label>";
                            html += "<input type='date' class='form-control' id='ParDesde' name='ParDesde' value = '"+FechaInicial+"' autocomplete = 'off' required />";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Hora Inicio:</label>";
                            html += "<input type='time' class='form-control' id='HoraDesde' name='HoraDesde' value ='"+HoraInicial+"' autocomplete = 'off' required />";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Hasta:</label>";
                            html += "<input type='date' class='form-control' id='ParFin' name='ParFin' value = '"+FechaFinal+"' autocomplete = 'off' required />";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Hora Final:</label>";
                            html += "<input type='time' class='form-control' id='HoraHasta' name='HoraHasta' value ='"+HoraFinal+"'  autocomplete = 'off' required />";
                        html += "</div>";
                    html += "</div>";
                    
                    html += "<hr>"
                    
                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-4 REmpresaHH'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                            html += "<select class = 'form-control' name = 'EmpresaHH' id = 'EmpresaHH' onchange = 'HHEmpresaListarUnidades()'>"
                                html += "<option value = ''>Seleccione</option>"
                                for(var i = 0; i < data.PermisosEmpresa.length; i++){
                                    html += "<option value = '"+data.PermisosEmpresa[i]['Id']+"'>"+data.PermisosEmpresa[i]['NombreComercial']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='col-sm-4 RClienteHH'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Unidad:</label>";
                            html += "<select class = 'form-control' name = 'UnidadHH' id = 'UnidadHH' onchange = 'HHEmpresaUnidadListarCliente()'>"
                                html += "<option value = ''>Seleccione</option>"
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='col-sm-4 RClienteHH'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
                            html += "<select class = 'form-control' name = 'ClienteHH' id = 'ClienteHH' onchange = 'HHListarProyectos()'>"
                                html += "<option value = ''>Seleccione</option>"
                            html += "</select>"
                        html += "</div>";
                    html += "</div>"
                    
                    html += "<div class='form-row my-4 DivContenedorListProyectos' style = 'display:none;'>";
                        html += "<div class='col-sm-12'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Seleccione una OT:</label>";
                            html += "<div class = 'ContenedorListProyectos'></div>"
                        html += "</div>"
                    html += "</div>"
                    
                    
                    html += "<div class='form-row my-2'>";
                        html += "<div class='col-sm-12'>";
                            html += "<label for='ParNombreLegal' >Observación:</label>";
                            html += "<textarea class = 'form-control'  id = 'ObservacionHH' name = 'ObservacionHH'></textarea>";
                        html += "</div>";
                    html += "</div>";
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarActividadesHH()'>Guardar</button>";
                html += "</div>";
            //html += "</form>"

            $(".content_modal4").html(html);
            $("#myModalX").removeClass('modal-lg').addClass('modal-xl');
            $(".RClienteHH,.ContenedorListProyectos").hide()
        }
    });
}

function ConsultarInformacionHH(calEvent){
    SelProyectosHH = calEvent.Proyectos;
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '"+UrlGeneral+"images/HoH.png' height='50px'  onerror='this.src=\"../images/HoH.png\' /> <span class = 'TituloBuscador'>Consultar Actividad</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '"+UrlGeneral+"images/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    //html += "<form class='form-signin FormsGeneral' action='"+UrlGeneral+"5368c3e4f671ab58136634a696c80597' method='post' enctype='multipart/form-data'>";
        html += "<div class='modal-body FormsGeneral'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-row my-4'>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Tipo de Registro:</label>";
                    html += "<select class = 'form-control' name = 'TipoRegistroHH' id = 'TipoRegistroHH' required onchange = 'HHTiposRegistros()' disabled>"
                        html += "<option value = '"+calEvent.TipoRegistro+"' selected>"+calEvent.TipoRegistro+"</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                    html += "<select class = 'form-control' name = 'DepartamentosHH' id = 'DepartamentosHH' required disabled>"
                        html += "<option >"+calEvent.Departamento+"</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Actividad:</label>";
                    html += "<select class = 'form-control' name = 'ActividadHH' id = 'ActividadHH' required disabled>"
                        html += "<option >"+calEvent.TipoActividad+"</option>"
                    html += "</select>"
                html += "</div>";
            html += "</div>"
            html += "<div class='form-row my-3'>";
                var FechaInicial = "";
                var HoraInicial = "";

                var FechaFinal = "";
                var HoraFinal = "";
                var t = calEvent.start.format().split("T");
                FechaInicial = t[0];
                var t2 = t[1].split(":")
                HoraInicial = t2[0]+":"+t2[1];

                t = calEvent.end.format().split("T");
                FechaFinal = t[0];
                var t2 = t[1].split(":")
                HoraFinal = t2[0]+":"+t2[1];
                    html += "<div class='col-sm-3'>";
                        html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Fecha Inicio:</label>";
                        html += "<input type='date' class='form-control' id='ParDesde' name='ParDesde' value = '"+FechaInicial+"' autocomplete = 'off' required />";
                    html += "</div>";
                    html += "<div class='col-sm-3'>";
                        html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Hora Inicio:</label>";
                        html += "<input type='time' class='form-control' id='HoraDesde' name='HoraDesde' value ='"+HoraInicial+"' autocomplete = 'off' required />";
                    html += "</div>";
                    html += "<div class='col-sm-3'>";
                        html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Hasta:</label>";
                        html += "<input type='date' class='form-control' id='ParFin' name='ParFin' value = '"+FechaFinal+"' autocomplete = 'off' required />";
                    html += "</div>";
                    html += "<div class='col-sm-3'>";
                        html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Hora Final:</label>";
                        html += "<input type='time' class='form-control' id='HoraHasta' name='HoraHasta' value ='"+HoraFinal+"'  autocomplete = 'off' required />";
                    html += "</div>";
            html += "</div>";

            html += "<hr>"

            html += "<div class='form-row my-3'>";
                html += "<div class='col-sm-4 REmpresaHH'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                    html += "<select class = 'form-control' name = 'EmpresaHH' id = 'EmpresaHH' disabled>"
                        html += "<option selected>"+calEvent.Empresa+"</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col-sm-4 RClienteHH'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Unidad:</label>";
                    html += "<select class = 'form-control' name = 'UnidadHH' id = 'UnidadHH' disabled >"
                        html += "<option >"+calEvent.Unidad+"</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col-sm-4 RClienteHH'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
                    html += "<select class = 'form-control' name = 'ClienteHH' id = 'ClienteHH' disabled >"
                        html += "<option >"+calEvent.Cliente+"</option>"
                    html += "</select>"
                html += "</div>";
            html += "</div>"

            html += "<div class='form-row my-4 DivContenedorListProyectos'>";
                html += "<div class='col-sm-12'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> OTs Asociadas:</label>";
                    html += "<div class = 'ListProyectSel'></div>"
                html += "</div>"
            html += "</div>"


            html += "<div class='form-row my-2'>";
                html += "<div class='col-sm-12'>";
                    html += "<label for='ParNombreLegal' >Observación:</label>";
                    html += "<textarea class = 'form-control'  id = 'ObservacionHH' name = 'ObservacionHH' disabled>"+calEvent.description+"</textarea>";
                html += "</div>";
            html += "</div>";

        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-danger' onclick = 'EliminarRegistroHH("+calEvent.Id+")'>¿Eliminar Actividad?</button>";
        html += "</div>";
    //html += "</form>"

    $(".content_modal4").html(html);
    $("#myModalX").removeClass('modal-lg').addClass('modal-xl');
    $(".RClienteHH,.ContenedorListProyectos").hide()
    HHTiposRegistros()
    GenerarListaProyectos()
    $(".ConsultaPro").hide()
}

function EliminarRegistroHH(Hash){
    if( confirm("¿Está seguro(a) de Eliminar esta Actividad?") ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'5526cd993f75a5fd6a775ba08f867241',
            data:{
                Hash:Hash,
                _token:document.getElementsByName('_token')[0].value,
            },
            success:function(data){
                location.reload()
            }
        })
    }   
}

function GuardarActividadesHH(){
    if( $("#TipoRegistroHH").val() == '' ){
        alert("No ha diligenciado los datos Obligatorios.");
    }else if( $("#TipoRegistroHH").val() == 'EMPRESA' ){
        if( $("#ParDesde").val() != '' && $("#HoraDesde").val() != '' && $("#ParFin").val() != '' 
                && $("#HoraHasta").val() != '' && $("#TipoRegistroHH").val() != '' && $("#DepartamentosHH").val() != ''
                && $("#ActividadHH").val() != '' ){
            
                    $("#ObservacionHH").css({'border':'0px'});
                    
                    $.ajax({
                        type:'POST',
                        url:UrlGeneral+'0276ae4bc2484a62f2b3115ac09f2ca7',
                        data:{
                            _token:document.getElementsByName('_token')[0].value,
                            ParDesde: $("#ParDesde").val(), HoraDesde: $("#HoraDesde").val(), ParFin: $("#ParFin").val(), 
                            HoraHasta: $("#HoraHasta").val(), TipoRegistroHH: $("#TipoRegistroHH").val(), DepartamentosHH: $("#DepartamentosHH").val(),
                            ActividadHH: $("#ActividadHH").val(), EmpresaHH: $("#EmpresaHH").val()
                        },
                        success:function(data){
                            location.reload()
                        }
                    })
                            
        }
    }else if( $("#TipoRegistroHH").val() == 'PERSONAL' ){
        if( $("#ParDesde").val() != '' && $("#HoraDesde").val() != '' && $("#ParFin").val() != '' 
                && $("#HoraHasta").val() != '' && $("#TipoRegistroHH").val() != '' && $("#DepartamentosHH").val() != ''
                && $("#ActividadHH").val() != '' && $("#ObservacionHH").val() != '' ){
            
                    $("#ObservacionHH").css({'border':'0px'});
                    
                    $.ajax({
                        type:'POST',
                        url:UrlGeneral+'0276ae4bc2484a62f2b3115ac09f2ca7',
                        data:{
                            _token:document.getElementsByName('_token')[0].value,
                            ParDesde: $("#ParDesde").val(), HoraDesde: $("#HoraDesde").val(), ParFin: $("#ParFin").val(), 
                            HoraHasta: $("#HoraHasta").val(), TipoRegistroHH: $("#TipoRegistroHH").val(), DepartamentosHH: $("#DepartamentosHH").val(),
                            ActividadHH: $("#ActividadHH").val(), ObservacionHH: $("#ObservacionHH").val()
                        },
                        success:function(data){
                            location.reload()
                        }
                    })
                            
        }else{
            alert("No ha diligenciado los datos Obligatorios.");
            $("#ObservacionHH").css({'border':'1px solid red'});
        }
    }else if( $("#TipoRegistroHH").val() == 'CLIENTE' ){
        if( $("#ParDesde").val() != '' && $("#HoraDesde").val() != '' && $("#ParFin").val() != '' 
                && $("#HoraHasta").val() != '' && $("#TipoRegistroHH").val() != '' && $("#DepartamentosHH").val() != ''
                && $("#ActividadHH").val() != '' && $("#EmpresaHH").val() != '' && $("#UnidadHH").val() != '' 
                && $("#ClienteHH").val() != '' && SelProyectosHH.length > 0){
            
                    $("#ObservacionHH").css({'border':'0px'});
                    var formData = new FormData();
                    formData.append("ParDesde", $("#ParDesde").val());
                    formData.append("HoraDesde", $("#HoraDesde").val());
                    formData.append("ParFin", $("#ParFin").val());
                    formData.append("HoraHasta", $("#HoraHasta").val());
                    formData.append("TipoRegistroHH", $("#TipoRegistroHH").val());
                    formData.append("DepartamentosHH", $("#DepartamentosHH").val());
                    formData.append("ActividadHH", $("#ActividadHH").val());
                    formData.append("EmpresaHH", $("#EmpresaHH").val());
                    formData.append("UnidadHH", $("#UnidadHH").val());
                    formData.append("ClienteHH", $("#ClienteHH").val());
                    formData.append("Proyectos", JSON.stringify(SelProyectosHH));
                    
                    $.ajax({
                        headers:{
                            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                        },
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: "post",
                        url: UrlGeneral+'0276ae4bc2484a62f2b3115ac09f2ca7',
                        success:function(data){
                            location.reload()
                        }
                    })
                            
        }else if( SelProyectosHH.length == 0 ){
            alert("No se han seleccionado Proyectos.");
        }
    }
}

$(document).ready(function() {
    $(".container").css({
        'width':'100%'
    })
    
    
    function Semanas(){
        $(".fc-day-header").each(function(){
            var t = $(this).text();
            var tt = t.split(" ");
            var dia = tt[1].split("/")
            var TextDia = "";
            if( tt[0] == 'lun.' ){
                TextDia = "Lunes";
            }
            if( tt[0] == 'mar.' ){
                TextDia = "Martes";
            }
            if( tt[0] == 'mié.' ){
                TextDia = "Miércoles";
            }
            if( tt[0] == 'jue.' ){
                TextDia = "Jueves";
            }
            if( tt[0] == 'vie.' ){
                TextDia = "Viernes";
            }
            if( tt[0] == 'sáb.' ){
                TextDia = "Sábado";
            }
            if( tt[0] == 'dom.' ){
                TextDia = "Domingo";
            }
            var html = "<table width = '100%'>"
                html += "<tr>"
                    html += "<td class = 'CenterText' style = 'color:#939598;font-weight:bold;'>"+TextDia+"</td>"
                html += "</tr>"
                html += "<tr>"
                    html += "<td class = 'CenterText' style = 'color:#939598;font-weight:bold;'>"+dia[0]+"</td>"
                html += "</tr>"
            html += "</table>"
            $(this).html(html);  

        })
        $(".fc-center").css({
           'color':'#939598',
           'font-weight':'bold',
           'font-size':'25px' 
        })
    }
    var Actividades = [];
    $.ajax({
        type:'POST',
        url: '92dca4ce7ddc273b062bc25d1c3c137a',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data.Actividades)
            for(var i = 0; i < data.Actividades.length;i++){
                
                var Dias = [];
                Actividades.push({
                    start: data.Actividades[i]['FechaInicio'],
                    end: data.Actividades[i]['FechaFin'],
                    title: ""+data.Actividades[i]['TipoActividad']+"",
                    Departamento: ""+data.Actividades[i]['Departamento']+"",
                    TipoActividad: ""+data.Actividades[i]['TipoActividad']+"",
                    description: data.Actividades[i]['Descripcion'],
                    TipoRegistro: data.Actividades[i]['TipoRegistro'],
                    Empresa: data.Actividades[i]['Empresa'],
                    Unidad: data.Actividades[i]['Unidad'],
                    Cliente: data.Actividades[i]['Cliente'],
                    Proyectos: data.Actividades[i]['Proyectos'],
                    colorx: '#32C0C2',
                    textColor: '#ffffff',
                    Id: data.Actividades[i]['Id'],
                })
            }
            console.log(Actividades)
            $('#calendar').fullCalendar({
                defaultView: 'agendaWeek',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable:true,
                defaultDate: yyyy+'-'+mm+'-'+dd,
                buttonIcons: true, // show the prev/next text
                weekNumbers: false,
                editable: false,
                eventLimit: true, // allow "more" link when too many events 
                events: Actividades,
                select: function (start, end, jsEvent, view) {
                    RegistrarHorasHombre(start, end, jsEvent, view)
                    $("#myModalX").modal("show");
                }, 
                eventRender: function (event, element)
                {
                    var temp_var = element[0].outerHTML;
                    var html = '';
                        html += '<div class = "ContenedorEvento"><table width = "100%" >'
                            html += '<tr>'
                            if( event.TipoRegistro == 'Personal' ){
                                html += '<td style = "background-color:#E2791C;width:10%;border:1px solid #E2791C;"></td>'
                            }
                            
                            if( event.TipoRegistro == 'Cliente' ){
                                html += '<td style = "background-color:#F0C62E;width:10%;border:1px solid #F0C62E;"></td>'
                            }
                            
                            if( event.TipoRegistro == 'Empresa' ){
                                html += '<td style = "background-color:#C21C22;width:10%;border:1px solid #C21C22;"></td>'
                            }
                                html += '<td style = "color:black;padding-left:5px;border:1px solid #EDEEEF;background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;">'+event.title+'</td>'
                            html += '</tr>'
                        html += '</table></div>'
                    element[0].innerHTML = html;
                    
                },
                eventClick: function (calEvent, jsEvent, view) {
                    ConsultarInformacionHH(calEvent)
                    $("#myModalX").modal("show");
                },
            });
            $(".fc-button-group button ").on('click',function(){
                Semanas();
            })
            $(".fc-time").css({
                'text-align':'center'
            })
            $('#calendar').css({ 'width': '100%' })
            
            $(".fc-month-button,.fc-agendaWeek-button,.fc-agendaDay").on('click',function(){
                //$(".fc-time").remove()
            })
            Semanas();
            
            $(".fc-agendaWeek-button ,.fc-button ,.fc-state-default").on('click',function(){
                Semanas();
            })
        }
    });
});

</script>
</head>

<body>

<div class="container">
    {{ csrf_field() }}
    <br>
    <table >
        <tr>
            <td style = 'padding-right:10px;'>
                <div>
                    <img src ='../images/Calendario.png' onerror="this.src='images/Calendario.png'" class ='IconMenuP Cursor' data-toggle="modal" data-target="#myModalX"  onclick = 'RegistrarHorasHombre(0,0,0,0)'/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" data-toggle="modal" data-target="#myModalX"  onclick = 'RegistrarHorasHombre(0,0,0,0)'>Registrar Actividades</span>
                </div>
            </td>
        </tr>
    </table>
    <br>
    <table width = '100%' style = 'font-size:12px;'>
        <tr>
            <td >
                <table width='100%' style = 'background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;'>
                    <tr>
                        <td style = 'border-left:10px solid #E2791C;font-weight: bolder; width: 20px;'></td>
                        <td style = 'padding:10px;'>Personal</td>
                    </tr>
                </table>
            </td>
            <td style = 'width:5px;background-color:white;border:0px;'></td>
            <td >
                <table width='100%' style = 'background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;'>
                    <tr>
                        <td style = 'border-left:10px solid #C21C22;font-weight: bolder; width: 20px;'></td>
                        <td style = 'padding:10px;'>Empresa</td>
                    </tr>
                </table>
            </td>
            <td style = 'width:5px;background-color:white;border:0px;'></td>
            <td >
                <table width='100%' style = 'background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;'>
                    <tr>
                        <td style = 'border-left:10px solid #F0C62E;font-weight: bolder; width: 20px;'></td>
                        <td style = 'padding:10px;'>Cliente</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <br>
    <div class="row">
        <div id="content" class="col-lg-12">
            <div id="calendar"></div>
            <div class = 'Visual'></div>
        </div>
    </div>
    <div class="modal fade" id="myModalX" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalX" aria-hidden="true" style="overflow-y: scroll;">
        <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm4" >
            <div class="content_modal4 modal-content">

            </div>
        </div>
    </div>
</div>
</body>
</html>
