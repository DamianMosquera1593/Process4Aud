<!DOCTYPE html>
<html>
<head>

<?php echo '<link href="'.url("/").'/css/fullcalendar.css" rel="stylesheet">' ;?>

<?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src = "'.url("/").'/js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

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
    body{
        font-family: 'Montserrat', sans-serif;
    }
    #calendar{
        width:100%;
    }
    #calendar td , #calendar th,.fc-day{
        border:0px;
    }
    .fc-day, #calendar td{
        border-left: 1px solid #DBDBDD;
    }
    .fc-event, .fc-event-dot{
        background-color:white;
    }
    .fc-event{
        border:0px;
        padding:5px;
    }
    .ContenedorEvento td{
        background-color:#F2F3F4;
        
    }
    .ContenedorEvento td{
        border:1px solid black;
    }
    
    .fc-button-group .fc-button{
        background-color:white;
        border:0px;
    }
    .fc-state-default {
        background-color: #ffffff;
        background-image: -moz-linear-gradient(top, #ffffff, #ffffff);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#ffffff)); 
        background-image: -webkit-linear-gradient(top, #ffffff, #ffffff);
    }
</style>
<script>
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

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

function SolicitarNuevoPermiso(){
    var url = UrlGeneral+'e4d03442bf58c59f6505d2b8f14fe406';
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '"+UrlGeneral+"images/Calendario.png' height='50px'  onerror='this.src=\"../images/Calendario.png\' /> <span class = 'TituloBuscador'>Solicitar Permiso</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '"+UrlGeneral+"images/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormsGeneral' action='"+UrlGeneral+"5368c3e4f671ab58136634a696c80597' method='post' enctype='multipart/form-data'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-row my-2'>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Desde:</label>";
                    html += "<input type='date' class='form-control' id='ParDesde' name='ParDesde' autocomplete = 'off' required />";
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Hasta:</label>";
                    html += "<input type='date' class='form-control' id='ParFin' name='ParFin' autocomplete = 'off' required />";
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParLogo'>Soporte:</label>"
                    html += "<div class='custom-file'>"
                        html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-row my-2'>";
                html += "<div class='col-sm-12'>";
                    html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Justificación:</label>";
                    html += "<textarea class = 'form-control' required name = 'JustificacionPermiso'></textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary' >Guardar</button>";
        html += "</div>";
    html += "</form>"
    
    $(".content_modal4").html(html);
    $("#myModalX").removeClass('modal-lg').addClass('modal-xl');
}

$(document).ready(function() {
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
        url: 'e4d03442bf58c59f6505d2b8f14fe406D',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            
            for(var i = 0; i < data.BirthDayPersonal.length;i++){
                
                var Dias = [];
                Actividades.push({
                    start: data.BirthDayPersonal[i]['Cumple']+" 06:00:00",
                    end: data.BirthDayPersonal[i]['Cumple']+" 22:00:00",
                    title: ""+data.BirthDayPersonal[i]['NombreCompleto']+"",
                    description:'Cumpleaños',
                    colorx: '#32C0C2',
                    textColor: '#ffffff',
                    foto: data.BirthDayPersonal[i]['foto'],
                    nombre: data.BirthDayPersonal[i]['NombreCompleto'],
                    //fechaingreso: data.Children[i]['fechaingreso'],
                    id: data.BirthDayPersonal[i]['Id'],
                })
            }
            
            $('#calendar').fullCalendar({
                defaultView: 'basicWeek',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: yyyy+'-'+mm+'-'+dd,
                buttonIcons: true, // show the prev/next text
                weekNumbers: false,
                editable: false,
                eventLimit: true, // allow "more" link when too many events 
                events: Actividades,
                dayClick: function (date, jsEvent, view) {
                    //alert('Has hecho click en: '+ date.format());
                }, 
                eventRender: function (event, element)
                {
                    var temp_var = element[0].outerHTML;
                    var html = '';
                        html += '<div class = "ContenedorEvento" onclick = "DetalleChildren(\''+event.foto+'\',\''+event.nombre+'\',\''+event.fechaingreso+'\',\''+event.id+'\',\''+event.Edad+'\')"><table width = "100%" >'
                            html += '<tr>'
                                html += '<td style = "background-color:'+event.colorx+';width:10%;border:1px solid #EDEEEF;"></td>'
                                html += '<td style = "color:black;padding-left:5px;border:1px solid #EDEEEF;background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;">'+event.title+'</td>'
                            html += '</tr>'
                        html += '</table></div>'
                    element[0].innerHTML = html;
                    
                },
                eventClick: function (calEvent, jsEvent, view) {
                    if( calEvent.cumple == 'Cumple' ){
                        
                    }
                },  
            });
            $(".fc-button-group button ").on('click',function(){
                Semanas();
            })
            $(".fc-time").remove()
            $('#calendar').css({ 'width': '100%' })
            
            $(".fc-month-button,.fc-agendaWeek-button,.fc-agendaDay").on('click',function(){
                $(".fc-time").remove()
            })
            Semanas();
            $(".fc-center").css({
                'color':'#939598',
                'font-weight':'bold',
                'font-size':'25px' 
             })
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
    <table >
        <tr>
            <td style = 'padding-right:10px;'>
                <div>
                    <img src ='../images/Calendario.png' onerror="this.src='images/Calendario.png'" class ='IconMenuP Cursor' data-toggle="modal" data-target="#myModalX"  onclick = 'SolicitarNuevoPermiso()'/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" data-toggle="modal" data-target="#myModalX"  onclick = 'SolicitarNuevoPermiso()'>Solicitar Nuevo Permiso</span>
                </div>
            </td>
        </tr>
    </table>
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
