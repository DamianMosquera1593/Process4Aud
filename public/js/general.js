/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var URLDatosEmpresa = '../storage/app/datos/empresas/'
var URLDatosEmpresa2 = '../../storage/app/datos/empresas/'

var TituloVentana = ""
var ImgVentana = ""
var FuncionesHeader = ""
var FuncionesRegresar = ""

function GeneradorHeadersVentanas(){
    var EstHeaderWindows = "<table class = 'CabeceraVentanas' width = '100%'>"
        EstHeaderWindows += "<tr>"
            EstHeaderWindows += "<td nowrap width = '90%'>"
                EstHeaderWindows += "<img src = '"+UrlUniversal+""+ImgVentana+"' class = 'LogoForm'  /> <span class = 'TituloBuscador'>"+TituloVentana+"</span>";
            EstHeaderWindows += "</td>"
            EstHeaderWindows += "<td class = 'RightContent'>"
                EstHeaderWindows += FuncionesHeader
            EstHeaderWindows += "</td>"
            EstHeaderWindows += "<td class = 'RightContent'>"
                EstHeaderWindows += "<img src = '"+UrlUniversal+"images/cerrar_white.png'  onclick = '"+FuncionesRegresar+"'class = 'IconoCerrar'data-dismiss='modal' aria-label='Close' />";
            EstHeaderWindows += "</td>"
        EstHeaderWindows += "</tr>"
    EstHeaderWindows += "</table>"
    return EstHeaderWindows;
}

function GeneradorHeadersVentanasMenu(){
    var EstHeaderWindows = "<table class = 'CabeceraVentanas' width = '100%'>"
        EstHeaderWindows += "<tr>"
            EstHeaderWindows += "<td nowrap width = '90%'>"
                EstHeaderWindows += "<img src = '"+UrlUniversal+""+ImgVentana+"' class = 'LogoForm'  /> <span class = 'TituloBuscador'>"+TituloVentana+"</span>";
            EstHeaderWindows += "</td>"
            EstHeaderWindows += "<td class = 'RightContent'>"
                EstHeaderWindows += FuncionesHeader
            EstHeaderWindows += "</td>"
        EstHeaderWindows += "</tr>"
    EstHeaderWindows += "</table>"
    return EstHeaderWindows;
}

function HtmlValores_Doble(Valor){
    var html = "<table width = '100%'>"
    html += "<tr>"
        html += "<td style = 'width:20%;text-align:right;border:0px;'>$</td>"
        html += "<td style = 'border:0px;text-align:right;'>"+formatNumber.new(Valor)+"</td>"
    html += "</tr>"
    html +=  "</table>"
    return html;
}

function HtmlPorcentajes_Doble(Valor){
    var html = "<table width = '100%'>"
    html += "<tr>"
        html += "<td class = 'CenterText' style = 'border:0px;'>"+formatNumber.new( Valor )+" %</td>"
    html += "</tr>"
    html +=  "</table>"
    return html;
}
function HtmlValores_DobleTH(Valor){
    var html = "<table width = '100%'>"
    html += "<tr>"
        html += "<th style = 'width:20%;text-align:right;border:0px;'>$</th>"
        html += "<th style = 'border:0px;text-align:right;'>"+formatNumber.new(Valor)+"</th>"
    html += "</tr>"
    html +=  "</table>"
    return html;
}

function HtmlValores_Simple(Valor){
    var html = '<table width = "100%">'
    html += '<tr>'
        html += '<td style = "width:20%;text-align:right;border:0px;">$</td>'
        html += '<td style = "border:0px;text-align:right;">'+formatNumber.new(Valor)+'</td>'
    html += '</tr>'
    html +=  '</table>'
    return html;
}

function ModalEdit(val){
    if( val == 1 ){
        $("#ModalEdit").modal("show");
    }else{
        $("#ModalEdit").modal("hide");
    }
}

function Meses(val){
    var Mes = "";
    if( val == 1){
        Mes = "Enero"
    }
    if( val == 2){
        Mes = "Febrero"
    }
    if( val == 3){
        Mes = "Marzo"
    }
    if( val == 4){
        Mes = "Abril"
    }
    if( val == 5){
        Mes = "Mayo"
    }
    if( val == 6){
        Mes = "Junio"
    }
    if( val == 7){
        Mes = "Julio"
    }
    if( val == 8){
        Mes = "Agosto"
    }
    if( val == 9){
        Mes = "Septiembre"
    }
    if( val == 10){
        Mes = "Octubre"
    }
    if( val == 11){
        Mes = "Noviembre"
    }
    if( val == 12){
        Mes = "Diciembre"
    }
    return Mes;
}

function ModalEdit2(val){
    if( val == 1 ){
        $("#ModalEdit2").modal("show");
    }else{
        $("#ModalEdit2").modal("hide");
    }
}

function myModal(val){
    if( val == 1 ){
        $("#myModal").modal("show");
    }else{
        $("#myModal").modal("hide");
    }
}

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split(',');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },

    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}


$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });


    $.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy",
		monthsTitle: "Meses",
		clear: "Borrar",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};

    $(".DatePicker").datepicker();

    LimpiarModalContent();

    

    $(".toggle-group > label.toggle-on").text("Activo");
    $(".toggle-group > label.toggle-off").text("Inactivo");

    $('[data-toggle="tooltip"]').tooltip();
    //$(".ListOpcionSubMenu").hide();

    CKEDITOR.editorConfig = function( config ) {
            // Define changes to default configuration here. For example:
            // config.language = 'fr';
            // config.uiColor = '#AADC6E';
    };
    
    if( $(".FormEncuestaCliente").text() != '' ) {
        FormEncuestaCliente()
    }
    if( $(".FormEncuestaEjecutivo").text() != '' ) {
        FormEncuestaEjecutivo()
    }
    if( $(".PendientesOk").text() != '' ) {
        ModalPendientes()
    }
});



$.ajaxSetup({
    beforeSend: function() {
       $('#spinner').show();
    },
    complete: function(){
       $('#spinner').hide();
    },
    success: function() {

    }
});

function CierraModal(ModalClose,ModalOpen) {
    $("#"+ModalClose).modal("hide");
    $("#"+ModalOpen).modal("show");
}

function ResizeModal(val){
    var T = $( window ).height()*val;
    $('.modal-content').css('height',T);
}
function ResizeModal2(id,val){
    var T = $( window ).height()*val;
    $('.content_modal'+id).css('height',T);
}

function ResizeChildTabsMenu(val){
    var T = $('.modal-body').height()*val;
    console.log("Tamaño ChildTabsMenu "+T)
    $('.ChildTabsMenu').css('height',T);
}

function ResizePagTable(val){
    var T = $('.ChildTabsMenu').height()*val;
    console.log("Tamaño PagTable "+T)
    return T;
}

function EventosAparturaModal(){
    /*$("body").css({
        'overflow-y':'hidden'
    })*/
}

function EventosCierreModal(){
    $("#ModalEdit").modal("hide")
    $("#ModalEdit2").modal("hide")
    $("#myModal").modal("hide")
}

function FormatCampoNum(format,real){
    var val = $("."+format).val();
    if(val != ""){
        var valor = val.split(",");
        var val_final = "";
        for(var i = 0;i < valor.length; i++){
            val_final += ""+valor[i];
        }
        $("."+format).val(formatNumber.new(val_final));
        $("."+real).text(val_final);
    }
}

function FormatCampoNumPpto(format,real){
    var val = $("."+format).val();
    if(val != ""){
        var valor = val.split(",");
        var val_final = "";
        for(var i = 0;i < valor.length; i++){
            val_final += ""+valor[i];
        }
        if( parseFloat(val_final) < 0 ){
            $("."+format).val("");
            $("."+real).text(""); 
        }else{
            $("."+format).val(formatNumber.new(val_final));
            $("."+real).text(val_final); 
        }
        
    }
}

function FormatCampoNumPorcentaje(format,real,format_valor,real_valor,base){
    var val = $("."+format).val();
    if(val != ""){
        var valor = val.split(",");
        var val_final = "";
        for(var i = 0;i < valor.length; i++){
            val_final += ""+valor[i];
        }
        if( val_final.length > 3 || val_final > 100 ){
            alert("No puede superar el 100%")
            $("."+format).val(formatNumber.new("0"));
            $("."+real).text("0");
            $("."+format_valor).val(formatNumber.new("0"));
            $("."+real_valor).text("0");
        }else{
            var valorbase = $("."+base).text();
            var temp_valor = valorbase*(val_final/100);

            $("."+format).val(formatNumber.new(val_final));
            $("."+real).text(val_final);

            $("."+format_valor).val(formatNumber.new(temp_valor));
            $("."+real_valor).text(temp_valor);
        }

    }
}

function FormatCampoNumPorcentaje_Valor(format,real,format_valor,real_valor,base){
    var val = $("."+format).val();
    if(val != ""){
        var valor = val.split(",");
        var val_final = "";
        for(var i = 0;i < valor.length; i++){
            val_final += ""+valor[i];
        }
        var valorbase = $("."+base).text();
        /*if( val_final > valorbase ){
            console.log("No puede superar valor total del Item "+valorbase);

            $("."+format).val(formatNumber.new("0"));
            $("."+real).text("0");
            $("."+format_valor).val(formatNumber.new("0"));
            $("."+real_valor).text("0");
        }else{

            var temp_valor = (val_final/valorbase)*100;

            $("."+format).val(formatNumber.new(val_final));
            $("."+real).text(val_final);

            $("."+format_valor).val(formatNumber.new(temp_valor));
            $("."+real_valor).text(temp_valor);
        }*/
        var temp_valor = 0;
        if(valorbase == 0 ){
            temp_valor = 0
        }else{
            temp_valor = (val_final/valorbase)*100;
        }

            $("."+format).val(formatNumber.new(val_final));
            $("."+real).text(val_final);

            $("."+format_valor).val(formatNumber.new(temp_valor));
            $("."+real_valor).text(temp_valor);

    }
}

function LimpiarModalContent(){
    $(".content_modal").html()
}

function MostrarSubMenu(i){
    $(".ListMinMenuX").hide()
    $(".ListMinMenu"+i).slideDown();
}

function DataTableModel(varial){
    $(".dataTables_filter").remove()
    $(".dataTables_length").remove()
}

function PestanasMenu(val){
    $(".ChildTabsMenu").hide();
    $(".TabsMenu"+val).show();
}

function MostrarTabsMenu(val){
    $(".ChildTabsMenu").hide();
    $(".TabsMenu"+val).show();

    $(".TabsMenu_Tabs").css({
        'background-color':'#dedede',
        'color':'black'
    })
    $(".TabsMenu_Tabs"+val).css({
        'background-color':'#1B4075',
        'color':'white'
    })
}

function MostrarTabsMenuPersonal(val){
    $(".ChildTabsMenuPersonal").hide();
    $(".TabsMenuPersonal"+val).show();
    
    $(".TabsMenu_TabsPersonal").css({
        'background-color':'#dedede',
        'color':'black'
    })
    $(".TabsMenuPersonal_Tabs"+val).css({
        'background-color':'#1B4075',
        'color':'white'
    })
}

function ContentList(Content, Content2 = ''){
    if($(".PARDIV_Content"+Content).is(':visible')){
        $(".PARDIV_Content"+Content).hide();
        $(".PAR_Content"+Content).html('<i class=" Cursor fas fa-angle-double-down"></i>');
    }else{
        $(".PARDIV_Content"+Content).show();
        $(".PAR_Content"+Content).html('<i class=" Cursor fas fa-angle-double-up"></i>');
    }
}

// **** Cambiar a contenido tipo DOMElement para usar dentro de notifyjs (success y error)
function Notificacion(text,alert){
    var html = "";
    html += "<div class='modal-header panel-heading '>";
        html += "<h5 class='modal-title' id='exampleModalLabel'>Crear Documento Legal</h5>";
        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<span aria-hidden='true'>&times;</span>";
        html += "</button>";
    html += "</div>";
    html += "<div class='modal-body "+alert+"'>";
        html += "<label>"+text+"</label>";
    html += "</div>";

    $(".content_modal").html(html);
}

function MostrarTabsMenu(val){
    $(".ChildTabsMenu").hide();
    $(".TabsMenu"+val).show();

    $(".TabsMenu_Tabs").css({
        'background-color':'#dedede',
        'color':'black'
    })
    $(".TabsMenu_Tabs"+val).css({
        'background-color':'#1B4075',
        'color':'white'
    })
}

function ListarDepartamentosPais(IdDepartamento){
    const pais = $("#ParGeneralPais").val()
    if (!pais || pais==='0') {
        return
    }
    $.ajax({
        type:'POST',
        url:UrlGeneral+'659de63cb45c46ba1886852e7675145e',
        data:{Hash:pais,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<option value = ''>Seleccione</option>";
            for(var i = 0; i < data.Deptos.length;i++){
              html += "<option value = '"+data.Deptos[i]['IdDepartamento']+"'>"+data.Deptos[i]['Nombre']+"</option>";
            }
            $("#"+IdDepartamento).html(html);
        }
    });
}

function ListarCiudadesDepartamento(IdCiudad){
    const departamento = $("#ParGeneralDepartamento").val()
    if (!departamento || departamento==='0') {
        return
    }
    $.ajax({
        type:'POST',
        url:UrlGeneral+'8ee56fa44e8b3aebbbcf72fa7b916694',
        data:{Hash:departamento,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<option value = ''>Seleccione</option>";
            for(var i = 0; i < data.Deptos.length;i++){
              html += "<option value = '"+data.Deptos[i]['IdCiudad']+"'>"+data.Deptos[i]['Nombre']+"</option>";
            }
            $("#"+IdCiudad).html(html);
        }
    });
}

function CambiarPresentacion(){
    $(".PUser").css({'height':'70px'}).show("slow");
    $(".ContenedorUser").css({'background-color':'white',
        'background': 'white'
    }).fadeIn("slow");

    $("#MB_Directorio").attr({'src':'images/options/directoriov.png'});
    $("#MB_Notificacion").attr({'src':'images/options/notificacionv.png'});
    $("#MB_HorasHombre").attr({'src':'images/options/hhv.png'});
    $("#MB_CerrarSesion").attr({'src':'images/options/cerrarsesionv.png'});
    $(".nameUser").css({'color':'#386417'});
    $(".jobUser").css({'color':'#386417'});

    $("#LogoEmpleadoEmpresa").attr({'src': $("#LogoEmpleado").attr("src")});
    $(".ContenedorLogoEmpresaEmpleado").hide("slow").remove();
    $(".ConteinerSalt").remove();
    $("#ListMenuBar").addClass("flex-column");

    $(".IndicadorOption li").each(function(){
        //$(this).addClass("nav-item dropdown");
    });
    $(".IndicadorOption a").each(function(){
        $(this).addClass("nav-link ");
    });

    $(".image").css({'height':'70px'});
    $(".text").css({'height':'70px'});
}

function LineasResumen(Text,Num){
    var html = "";
    html += "<table width = '100%'>"
        html += "<tr>"
            html += "<td style = 'with:85%;text-align:left;'>"+Text+"</td>"
            html += "<td class = 'ContenidoLineasNumero'>"+formatNumber.new(Num)+"</td>"
        html += "</tr>"
    html += "</table>"
    return html;
}

function ModalPendientes(){
    $.ajax({
        type:'POST',
        url:'4b3f9951234aa8beea58166ffc7d226d',
        data:{_token:document.getElementsByName('_token')[0].value,nombre:$("#NombreSubCarpetax").val()},
        success:function(data){
            var html = "";
            TituloVentana = "Tus Pendientes"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body' >";
                html += "<div class = 'form-group row HidenInformation ResumenPendientes'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div >"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont' style = 'width:50%'>"
                                        //html += "<div class='CardReport'><h5>Tareas del cliente vencidas</h5><div class='container'>"+data.PendientesTareasOT_Anterior.length+"</div></div>"
                                    html += "</td>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'color:white;font-weight:bold;background-color:#231F20;font-size:12px;'>"
                                                    html += LineasResumen("Tareas vencidas del cliente",data.PendientesTareasOT_Anterior.length) 
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td></td></tr>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'color:white;font-weight:bold;background-color:#EE1D23;font-size:12px;'>"
                                                    html += LineasResumen("Tareas para hoy del cliente",data.PendientesTareasOT_Hoy.length) 
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td></td></tr>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'color:white;font-weight:bold;background-color:#338F42;font-size:12px;'>"
                                                    html += LineasResumen("Tareas a futuro del cliente",data.PendientesTareasOT_Futuro.length)
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td></td></tr>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'background-color:#27A69A;font-size:12px;'>"
                                                    html += LineasResumen("Tareas administrativas vencidas",data.Administrativo_Vencido.length)
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td></td></tr>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'color:white;font-weight:bold;background-color:#417DC1;font-size:12px;'>"
                                                    html += LineasResumen("Tareas administrativas para hoy",data.Administrativo_Hoy.length)
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td></td></tr>"
                                            html += "<tr>"
                                                html += "<td nowrap class = 'CardReportContent' style = 'color:white;font-weight:bold;background-color:#9D9E36;font-size:12px;'>"
                                                    html += LineasResumen("Tareas administrativas a futuro",data.Administrativo_Futuro.length)
                                                html += "</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading' style = 'color:white;font-weight:bold;background-color:#231F20;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS DE CLIENTE VENCIDAS"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Cliente</th>"
                                html += "<th>Fecha Entrega</th>"
                                html += "<th>Hora Entrega</th>"
                                html += "<th>Asunto</th>"
                                html += "<th>No. Entregables</th>"
                            html += "</tr>"
                            if( data.PendientesTareasOT_Anterior.length > 0 ){
                                for( var i = 0; i < data.PendientesTareasOT_Anterior.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesAnteriores'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Anterior[i]['Cliente']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Anterior[i]['FechaEntrega']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Anterior[i]['HoraEntrega']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Anterior[i]['Asunto']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Anterior[i]['NroEntregables']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES VENCIDOS.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
                
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading' style = 'color:white;font-weight:bold;background-color:#EE1D23;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS DE CLIENTE PARA HOY"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Cliente</th>"
                                html += "<th>Fecha Entrega</th>"
                                html += "<th>Hora Entrega</th>"
                                html += "<th>Asunto</th>"
                                html += "<th>No. Entregables</th>"
                            html += "</tr>"
                            if( data.PendientesTareasOT_Hoy.length > 0 ){
                                for( var i = 0; i < data.PendientesTareasOT_Hoy.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesHoy'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Hoy[i]['Cliente']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Hoy[i]['FechaEntrega']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Hoy[i]['HoraEntrega']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Hoy[i]['Asunto']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Hoy[i]['NroEntregables']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES PARA EL DÍA DE HOY.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
                
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading'  style = 'color:white;font-weight:bold;background-color:#338F42;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS DE CLIENTE PENDIENTES A FUTURO"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Cliente</th>"
                                html += "<th>Fecha Entrega</th>"
                                html += "<th>Hora Entrega</th>"
                                html += "<th>Asunto</th>"
                                html += "<th>No. Entregables</th>"
                            html += "</tr>"
                            if( data.PendientesTareasOT_Futuro.length > 0 ){
                                for( var i = 0; i < data.PendientesTareasOT_Futuro.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesFuturo'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Futuro[i]['Cliente']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Futuro[i]['FechaEntrega']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Futuro[i]['HoraEntrega']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.PendientesTareasOT_Futuro[i]['Asunto']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.PendientesTareasOT_Futuro[i]['NroEntregables']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES A FUTURO.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
                
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading' style = 'color:white;font-weight:bold;background-color:#27A69A;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS ADMINISTRATIVAS VENCIDAS"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Canal</th>"
                                html += "<th>Grupo</th>"
                                html += "<th>Subgrupo</th>"
                                html += "<th>Tarea</th>"
                                html += "<th>Fecha Entrega</th>"
                            html += "</tr>"
                            if( data.Administrativo_Vencido.length > 0 ){
                                for( var i = 0; i < data.Administrativo_Vencido.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesAnterioresA'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Vencido[i]['Canal']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Vencido[i]['Grupo']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Vencido[i]['SubGrupo']+"</td>"
                                        html += "<td style = 'text-align:Justify;'>"+data.Administrativo_Vencido[i]['Tarea']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.Administrativo_Vencido[i]['FechaEntrega']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES ADMINISTRATIVOS VENCIDOS.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
                
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading' style = 'color:white;font-weight:bold;background-color:#417DC1;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS ADMINISTRATIVAS PARA HOY"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Canal</th>"
                                html += "<th>Grupo</th>"
                                html += "<th>Subgrupo</th>"
                                html += "<th>Tarea</th>"
                                html += "<th>Fecha Entrega</th>"
                            html += "</tr>"
                            if( data.Administrativo_Hoy.length > 0 ){
                                for( var i = 0; i < data.Administrativo_Hoy.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesHoyA'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Hoy[i]['Canal']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Hoy[i]['Grupo']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Hoy[i]['SubGrupo']+"</td>"
                                        html += "<td style = 'text-align:Justify;'>"+data.Administrativo_Hoy[i]['Tarea']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.Administrativo_Hoy[i]['FechaEntrega']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES ADMINISTRATIVOS PARA HOY.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
                
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<div class='panel-heading' style = 'color:white;font-weight:bold;background-color:#9D9E36;font-size:12px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'WhiteFont'>"
                                        html += "TAREAS ADMINISTRATIVAS A FUTURO"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText' style = 'max-height:300px;overflow-y:scroll;'>"
                        html += "<p></p>"
                        html += "<table class = 'tableNew '>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Canal</th>"
                                html += "<th>Grupo</th>"
                                html += "<th>Subgrupo</th>"
                                html += "<th>Tarea</th>"
                                html += "<th>Fecha Entrega</th>"
                            html += "</tr>"
                            if( data.Administrativo_Futuro.length > 0 ){
                                for( var i = 0; i < data.Administrativo_Futuro.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText PendientesFuturoA'>"+(i+1)+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Futuro[i]['Canal']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Futuro[i]['Grupo']+"</td>"
                                        html += "<td style = 'text-align:left;'>"+data.Administrativo_Futuro[i]['SubGrupo']+"</td>"
                                        html += "<td style = 'text-align:Justify;'>"+data.Administrativo_Futuro[i]['Tarea']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.Administrativo_Futuro[i]['FechaEntrega']+"</td>"
                                    html += "</tr>"
                                }
                            }else{
                                html += "<tr>"
                                    html += "<td class = 'CenterText' colspan = '6'>NO SE ENCONTRARON PENDIENTES ADMINISTRATIVOS A FUTUROS.</td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<br>"
            html += "</div>"
            $(".ModalEditX").html(html);

            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            
            $(".content_modal").html(html);
            if( data.PendientesTareasOT_Anterior.length > 0 ){
                $(".PendientesAnteriores").css({'border-left':'7px solid #231F20', 'color':'black'})
            }
            if( data.Administrativo_Vencido.length > 0){
                $(".PendientesAnterioresA").css({'border-left':'7px solid #27A69A', 'color':'#27A69A'})
            }
            if( data.PendientesTareasOT_Hoy.length > 0 ){
                $(".PendientesHoy ").css({'border-left':'7px solid #EE1D23', 'color':'#EE1D23'})
            }
            if( data.Administrativo_Hoy.length > 0){
                $(".PendientesHoyA ").css({'border-left':'7px solid #417DC1', 'color':'#417DC1'})
            }
            if( data.PendientesTareasOT_Futuro.length > 0 ){
                $(".PendientesFuturo ").css({'border-left':'7px solid #338F42', 'color':'#338F42'})
            }
            if( data.Administrativo_Futuro.length > 0){
                $(".PendientesFuturoA ").css({'border-left':'7px solid #9D9E36', 'color':'#9D9E36'})
            }
            $(".tableNew td").css({'border-radius':'0.3em'})
            $("h7").css({'font-weight':'bold'})
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $(".form-group label").css({'font-size':'12px'})
            $(".form-group input,.form-group select").css({'font-size':'13px'})
            ModalEdit(1)
        }
    });
    
}

function NuevoPublico(){
    var html = "";
    TituloVentana = "Nueva Carpeta"
ImgVentana = "images/AGREGAR_ICONO.png"
FuncionesHeader = ""
FuncionesRegresar = "myModal(0)"
html += "<div class='modal-header'>";
	html += GeneradorHeadersVentanas()
html += "</div>";
    html += "<div class='modal-body'>";
        //html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoPublicosCom' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12'>"
                html += "<label>Nombre Carpeta:</label>"
                html += "<input autocomplete = 'off' type = 'text' class = 'form-control NombreSubCarpetax' name = 'nombre' id = 'NombreSubCarpetax' required/>"
            html += "</div>"
        html += "</div>"

        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12 CenterText'>"
                html += "<button type  = 'button' onclick = 'GuardarCarpeta()'class = 'btn btn-primary'>Guardar</button>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    $(".ModalEditX").html(html);

    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
    ModalEdit(1)
}

function GuardarCarpeta(){
    if( $("#NombreSubCarpetax").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:'be06ee888cd88d09611201ac7ec57fdd',
            data:{_token:document.getElementsByName('_token')[0].value,nombre:$("#NombreSubCarpetax").val()},
            success:function(data){
                ModalEdit(0)
                ConsultarCarpetas()
            }
        });
    }
}

function NuevoPublico_Sub(id,clase){
    var html = "";
        

        TituloVentana = "Nueva Subcarpeta de: "+$(".NombreCarpeta"+clase+"_"+id).text()
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
            //html += "<form class='form-signin'  enctype='multipart/form-data' action='' method='post'>"
                html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12'>"
                        html += "<label>Nombre Carpeta:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control NombreSubCarpeta' name = 'nombre' id = 'NombreSubCarpeta' required/>"
                    html += "</div>"
                html += "</div>"
            //html += "</form>"
                                    html += "<div class = 'form-group row'>"
                    html += "<div class = 'col-sm-12 CenterText'>"
                        html += "<button type = 'button' onclick = 'CrearSubCarpeta("+id+","+clase+")' class = 'btn btn-primary'>Guardar</button>"
                    html += "</div>"
                html += "</div>"
    html += "</div>"
    $(".content_modal").html(html);

    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
}

function CrearSubCarpeta(id,clase){
    if( $("#NombreSubCarpeta").val().length > 0 ){
        $.ajax({
                type:'POST',
                url:'61cc506f543faabec1a64ac3377feca3',
                data:{_token:document.getElementsByName('_token')[0].value,id:id,nombre:$("#NombreSubCarpeta").val()},
                success:function(data){
                    $("#ModalEdit").modal("hide")
                    $(".VisualizadorCarpetasx"+id).hide()
                    ConsultarContenidoCarpeta(id,clase)
                }
        });
    }
}

function NuevoDocumentoC(id,clase){
    var html = "";
    

    TituloVentana = $(".NombreCarpeta"+clase+"_"+id).text()+" - Nuevo Documento"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";

        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12'>"
                html += "<div class='custom-file mb-12' style = 'display: block;'>";
                    
                    html += "<input required type='file' class='custom-file-input foto1' id='foto1' name='foto[]' value='' multiple = 'multiple' onchange='uploadImage(this)' >"
                    html += "<label class='custom-file-label' id='foto1' for='foto1'>Seleccione el Archivo...</label>"
                html += "</div>";
            html += "</div>"
        html += "</div>"

        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12 CenterText'>"
                html += "<button type = 'button' onclick = 'GuardarArchivosDocCarp("+id+","+clase+")'class = 'btn btn-primary'>Guardar</button>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    $(".content_modal").html(html);

    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
}

function consultarCategoria(id){
	$(".Detalle"+id).toggle();
}

function GuardarArchivosDocCarp(id,clase){
	var formData = new FormData();
	
	
	var archivos = document.getElementById("foto1");
	for (var i = 0; i < archivos.files.length; i++) {
		formData.append("foto"+i, archivos.files[i]);
	}
	
	formData.append("archivos", archivos.files.length);
	formData.append("id", id);
	console.log(archivos.files.length)
	
	$.ajax({
		
		headers:{
			'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
		},
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		type: "post",
		url:'7a9a4608c53fa92da75e20f53aa44428',
		success:function(data){
                    $("#ModalEdit").modal("hide")
                    $(".VisualizadorCarpetasx"+id).hide()
                    ConsultarContenidoCarpeta(id,clase)
		}
	})
}

function BorrarFormatoRH(id){
	$.ajax({
        type:'POST',
        url:UrlUniversal+'EliminarFormatoRH',
        data:{_token:document.getElementsByName('_token')[0].value,id:id},
        success:function(data){
			location.reload();
		}
	})
}

function BorrarArchivoCom(id){
    if( confirm("¿Está seguro(a) de Eliminar este Archivo?\nAl hacerlo borrará éste contenido.") ){
        $.ajax({
            type:'POST',
            url:'a2e73445db104112742cfb1973362cd0',
            data:{id:id,_token:document.getElementsByName('_token')[0].value,id:id},
            success:function(data){
                    //ConsultarCarpetas();
                    $(".Archivo"+id).remove()
                }
	})
    }
}

function BorrarCategoria(id){
    if( confirm("¿Está seguro(a) de Eliminar esta carpeta?\nAl hacerlo borrará el contenido que se encuentra dentro de ella.") ){
        $.ajax({
            type:'POST',
            url:'bd552a112ae9e1017bc48ec39602e0ef',
            data:{_token:document.getElementsByName('_token')[0].value,id:id},
            success:function(data){
                    //ConsultarCarpetas();
                    $(".Carpeta"+id).remove()
                }
        })
    }
}

var ArrayNombres = [];

function ConsultarCarpetas(){
    $.ajax({
        type:'POST',
        url:'e933a0638c2e9ebff1f0824eedc49a74',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var ht = "";
            ht += "<table class = 'tableNew'width = '100%'>";
            var t = 0;
            ht += "<tr>";
                    ht += "<th>Carpeta</th>";
                    ht += "<th>Eliminar</th>";
            ht += "</tr>";
            for(var i = 0; i < data.sql.length;i++,t++){
                ht += "<tr class = 'Carpeta"+data.sql[i]['Id']+"'>";
                    ht += "<td style = 'text-align:left;' class = 'ContenedorImagenB'>";
                        ht += "<img class = '' tittle = 'Compartir Con'src = 'images/Carpetas.png' height = '40px' onclick = 'ConsultarContenidoCarpeta("+data.sql[i]['Id']+","+data.sql[i]['nux']+","+data.sql[i]['Tipo2']+")'/>";
                        ht += "<span style = 'font-size:12px;color:black;font-weight:500;' class = 'Cursor NombreCarpeta"+data.sql[i]['nux']+"_"+data.sql[i]['Id']+"' onclick = 'ConsultarContenidoCarpeta("+data.sql[i]['Id']+","+data.sql[i]['nux']+","+data.sql[i]['Tipo2']+")'>"+data.sql[i]['publico']+"</span>";

                    ht += "</td>";
                    ht += "<td style = 'text-align:center;' class = 'ContenedorImagenB'>";
                        if(data.sql[i]['Tipo'] == 'PROPIA'){
                            ht += "<img title = 'Compartir Con' src ='images/detalles.png' height='30px' onclick = 'CompartirCon("+data.sql[i]['Id']+","+data.sql[i]['nux']+")' class = 'IconDescg Cursor'/> &nbsp;&nbsp;";
                            ht += "<img title = '¿Eliminar?' src ='images/eliminar1.png' height='30px' onclick = 'BorrarCategoria("+data.sql[i]['Id']+")' class = 'IconDescg Cursor'/>";
                        }
                    ht += "</td>";

                ht += "</tr>";

                ht += "<tr class = 'VisualizadorCarpetasx"+data.sql[i]['Id']+"' style = 'display:none;'>";
                        ht += "<td style = 'border:0px;background-color:transparent;text-align:left;vertical-align:top;padding-left:20px;' colspan = '2'  ><div class = 'VisualizadorCarpetas VisualizadorCarpetas"+data.sql[i]['Id']+"'></div></td>";
                ht += "</tr>";
            }
            ht += "</table>";
            
            $(".AreaCasas").html(ht)
        }
    })
}

function CListarPersonalAgencia(){
    if( $("#Inf_AsistenteAgencia").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'3115db3fb13ad9db964287eed6b9cd37',
            data:{Hash:$("#Inf_AsistenteAgencia").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_AsisAgencia = [];
                Temp_Inf_AsisAgencia = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_AsisAgencia.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PAsigAgen' value='"+Temp_Inf_AsisAgencia[i]['IdUsuario']+"' id='PAsigAgen"+Temp_Inf_AsisAgencia[i]['IdUsuario']+"' onclick = 'CAddAgencia("+Temp_Inf_AsisAgencia[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+Temp_Inf_AsisAgencia[i]['NombreUsuario']+"</td>"
                            html += "<td>"+Temp_Inf_AsisAgencia[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Inf_AsisAgencia.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'font-weight: bold;color: red;'>No se han encontrado datos para la información ingresada.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ListAsistentesAgencia").html(html+"<br>")
            }
        })
    }
}

function CAddAgencia(Hash,T){
    $("#Inf_AsistenteAgencia").val("")
    Inf_AsisAgencia.push({
        'Tipo': Temp_Inf_AsisAgencia[T]['Tipo'],
        'Nombre': Temp_Inf_AsisAgencia[T]['NombreUsuario'],
        'IdU':Temp_Inf_AsisAgencia[T]['IdUsuario'],
    })
    $(".ListAsistentesAgencia").html("")
    CListarAsistentesAgenciaIE()
}

function CDelAsisAgencia(T){
    Inf_AsisAgencia.splice(T,1);
    CListarAsistentesAgenciaIE()
}

function CListarAsistentesAgenciaIE(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_AsisAgencia.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_AsisAgencia[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'CDelAsisAgencia("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".AsistentesAgencia").html(html)
}

function CompartirCon(Hash,Num){
    var html = "";
    TituloVentana = "Compartir Carpeta: "+$(".NombreCarpeta"+Num+"_"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    
    html += "<div class='modal-body'>";
        //html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoPublicosCom' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12'>"
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asistente:</label>";
                html += "<input autocomplete = 'off' type='text' name='Inf_AsistenteAgencia' onkeyup = 'CListarPersonalAgencia()' id='Inf_AsistenteAgencia' class='form-control'>"
                html += "<p></p>"
                html += "<div class = 'ListAsistentesAgencia'></div>"
                html += "<p></p>"
                html += "<div class = 'ContentListUser AsistentesAgencia'></div>"
                html += "<p>Actualmente ésta carpeta la pueden visualizar las siguientes Personas:</p>"
                html += "<div class = 'ContentListUser CompartidosActual'></div>"

                html += "<hr>"
            html += "</div>"
        html += "</div>"
        
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12 CenterText'>"
                html += "<button type  = 'button' onclick = 'GuardarCompartidosCarpeta("+Hash+")'class = 'btn btn-primary'>Guardar</button>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    $(".ModalEditX").html(html);

    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
    var formData = new FormData();
    formData.append("Hash",Hash);
    formData.append("Tipo",1);

    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'ee36d61b5b6a29aac64800b1aea3c356',
        success:function(data){
            var ht = "";
            ht += "<table class = 'tableNew'>"
                ht += "<tr>"
                    ht += "<th>No.</th>"
                    ht += "<th>Nombre</th>"
                    ht += "<th>Fecha</th>"
                ht += "</tr>"
                for(var i = 0; i < data.Compartidos.length;i++){
                    ht += "<tr>"
                        ht += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        ht += "<td >"+data.Compartidos[i]['NombreUsuario']+"</td>"
                        ht += "<td >"+data.Compartidos[i]['FechaLarga']+"</td>"
                    ht += "</tr>"
                }
            ht + "</table>"
            $(".CompartidosActual").html(ht)
        }
    })
    ModalEdit(1)
}

function CompartirArcCon(Hash,Num){
    var html = "";
    html += "<div class='modal-header panel-heading '>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Compartir Archivo</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' height='20px'  />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"

    html += "</div>";
    html += "<div class='modal-body'>";
        //html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoPublicosCom' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12'>"
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asistente:</label>";
                html += "<input autocomplete = 'off' type='text' name='Inf_AsistenteAgencia' onkeyup = 'CListarPersonalAgencia()' id='Inf_AsistenteAgencia' class='form-control'>"
                html += "<p></p>"
                html += "<div class = 'ListAsistentesAgencia'></div>"
                html += "<p></p>"
                html += "<div class = 'ContentListUser AsistentesAgencia'></div>"
                html += "<p>Actualmente ésta carpeta la pueden visualizar las siguientes Personas:</p>"
                html += "<div class = 'ContentListUser CompartidosActual'></div>"
                html += "<hr>"
            html += "</div>"
        html += "</div>"
        
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12 CenterText'>"
                html += "<button type  = 'button' onclick = 'GuardarCompartidosArchivos("+Hash+")'class = 'btn btn-primary'>Guardar</button>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    $(".ModalEditX").html(html);

    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
    var formData = new FormData();
    formData.append("Hash",Hash);
    formData.append("Tipo",2);

    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'ee36d61b5b6a29aac64800b1aea3c356',
        success:function(data){
            var ht = "";
            ht += "<table class = 'tableNew'>"
                ht += "<tr>"
                    ht += "<th>No.</th>"
                    ht += "<th>Nombre</th>"
                    ht += "<th>Fecha</th>"
                ht += "</tr>"
                for(var i = 0; i < data.Compartidos.length;i++){
                    ht += "<tr>"
                        ht += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        ht += "<td >"+data.Compartidos[i]['NombreUsuario']+"</td>"
                        ht += "<td >"+data.Compartidos[i]['FechaLarga']+"</td>"
                    ht += "</tr>"
                }
            ht + "</table>"
            $(".CompartidosActual").html(ht)
        }
    })
    ModalEdit(1)
}

function GuardarCompartidosCarpeta(Hash){
    if( Inf_AsisAgencia.length > 0 ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("Items", JSON.stringify(Inf_AsisAgencia));
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f8a13f67666707ad3422e06256ee864d',
            success:function(data){
                alert(data.mensaje)
                Inf_AsisAgencia = [];
                ModalEdit(0)
            }
        })
    }else{
        alert("No es posible guardar ya que no se han ingresado Usuarios a los cuales compartir esta carpeta.\nPor favor intente de nuevo.;")
    }
}

function GuardarCompartidosArchivos(Hash){
    if( Inf_AsisAgencia.length > 0 ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("Items", JSON.stringify(Inf_AsisAgencia));
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f8a13f67666707ad3422e06256ee8642',
            success:function(data){
                alert(data.mensaje)
                Inf_AsisAgencia = [];
                ModalEdit(0)
            }
        })
    }else{
        alert("No es posible guardar ya que no se han ingresado Usuarios a los cuales compartir esta carpeta.\nPor favor intente de nuevo.;")
    }
}

function ConsultarContenidoCarpeta(id,clase,Tipo){
    if($(".VisualizadorCarpetasx"+id).is(":visible")){
        $(".VisualizadorCarpetasx"+id).hide("fast")
    } else{
        $(".VisualizadorCarpetasx"+id).show("fast")
    }
    $.ajax({
        type:'POST',
        url:'3a84b34e24319bbe0f9061acd52b925f',
        data:{_token:document.getElementsByName('_token')[0].value,id:id},
        success:function(data){
            var ht = "";
            ht += "<div class = 'CabeceraCarpeta'>";
                ht += "<table width = '100%'>";
                        ht += "<tr>";
                            ht += "<th colspan = '2'  style= 'border:1px solid white;'>"+$(".NombreCarpeta"+clase+"_"+id).text()+" /</th>"
                        ht += "</tr>";
                        ht += "<tr>";
                            ht += "<td style= 'border:1px solid white;'>"
                                    ht += "<img src ='images/additem.png' class = 'IconMenuP Cursor' style = 'height: 30px;' data-toggle='modal' data-target='#ModalEdit' onclick ='NuevoPublico_Sub("+id+","+clase+")' />";
                                    ht += "<span class='FirstText Cursor' data-toggle='modal' data-target='#ModalEdit' style='color:#1B4075;font-weight: bold;' onclick='NuevoPublico_Sub("+id+","+clase+")'>Nueva Subcarpeta</span>";
                            ht += "</td>"
                            ht += "<td style= 'border:1px solid white;'>"
                                ht += "<img src ='images/additem.png' class = 'IconMenuP Cursor' style = 'height: 30px;' data-toggle='modal' data-target='#ModalEdit' onclick ='NuevoDocumentoC("+id+","+clase+")' />";
                                ht += "<span class='FirstText Cursor' data-toggle='modal' data-target='#ModalEdit' style='color:#1B4075;font-weight: bold;' onclick='NuevoDocumentoC("+id+","+clase+")'>Nuevo Documento</span>";
                            ht += "</td>"
                        ht += "</tr>";
                ht+="</table>";
            ht += "</div>";
            ht += "<br>";
            ht += "<table width = '100%' >";
                ht += "<tr>";
                    ht += "<th>Nombre</th>";
                    ht += "<th>Eliminar</th>";
                ht += "</tr>";
                var t = 0;

                for(var i = 0; i < data.sql.length;i++,t++){
                    ht += "<tr class  = 'Carpeta"+data.sql[i]['Id']+"'>";
                        ht += "<td style = 'text-align:left;' class = 'ContenedorImagenB'>";
                            ht += "<img class = '' src = 'images/Carpetas.png' height = '40px' onclick = 'ConsultarContenidoCarpeta("+data.sql[i]['Id']+","+data.sql[i]['nux']+","+data.sql[i]['Tipo2']+")'/>";
                            ht += "<span style = 'font-size:12px;color:black;font-weight:500;' class = 'Cursor NombreCarpeta"+data.sql[i]['nux']+"_"+data.sql[i]['Id']+"'  onclick = 'ConsultarContenidoCarpeta("+data.sql[i]['Id']+","+data.sql[i]['nux']+","+data.sql[i]['Tipo2']+")'>"+data.sql[i]['publico']+"</span>";
                        ht += "</td>";
                        ht += "<td style = 'text-align:center;' class = 'ContenedorImagenB'>";
                            if(data.sql[i]['Tipo'] == 'PROPIA'){
                                ht += "<img title = 'Compartir Con' src ='"+UrlGeneral+"images/detalles.png' height='30px' onclick = 'CompartirCon("+data.sql[i]['Id']+","+data.sql[i]['nux']+")' class = 'IconDescg Cursor'/>";
                                ht += "<img title = '¿Eliminar?' src ='images/eliminar.png' height='30px' onclick = 'BorrarCategoria("+data.sql[i]['Id']+")' class = 'IconDescg Cursor'/>";
                            }
                        ht += "</td>";
                    ht += "</tr>";

                    ht += "<tr class = 'VisualizadorCarpetasx"+data.sql[i]['Id']+" Carpeta"+data.sql[i]['Id']+"' style = 'display:none;'>";
                        ht += "<td style = 'border:0px;background-color:transparent;text-align:left;vertical-align:top;padding-left:20px;' colspan = '2'  ><div class = 'VisualizadorCarpetas VisualizadorCarpetas"+data.sql[i]['Id']+"'></div></td>";
                    ht += "</tr>";
                }
                for(var i = 0; i < data.sqld.length;i++){
                    ht += "<tr class = 'Archivo"+data.sqld[i]['id']+"'>";
                        ht += "<td style = 'text-align:left;' class = 'ContenedorImagenB'>";
                            ht += "<a target='_blank'  href='../storage/app/Comunicaciones/"+data.sqld[i]['archivo']+"'>";
                                    ht += "<img class = '' src = 'images/Docs.png' height = '40px' />";
                                    ht += "<span style = 'font-size:12px;color:black;font-weight:500;' >"+data.sqld[i]['categoria']+"</span>";
                            ht += "</a>";
                        ht += "</td>";
                        ht += "<td style = 'text-align:center;' class = 'ContenedorImagenB'>";
                            if(data.sqld[i]['Tipo'] == 'PROPIA'){
                                ht += "<img title = 'Compartir Con' src ='images/detalles.png' height='30px' onclick = 'CompartirArcCon("+data.sqld[i]['id']+",0)' class = 'IconDescg Cursor'/>";
                                ht += "<img title = '¿Eliminar?' src ='images/eliminar.png' height='30px' onclick = 'BorrarArchivoCom("+data.sqld[i]['id']+")' class = 'IconDescg Cursor'/>";
                            }
                        ht += "</td>";
                    ht += "</tr>";
                }
            ht += "</table>";

            $(".VisualizadorCarpetas"+id).html(ht).show();
        }

    })
}

function FormDirectorios(){
    $.ajax({
        type:'POST',
        url:'df7b928b6f6c8b551947f6883e895f7b',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Directorio General"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div id = 'TabsMenu'>";
                    html += "<ul>";

                    if( data.DIRECTOR_AGENCIA == 1 ){
                        html += "<li onclick = 'MostrarTabsMenu(1)' >"
                            html += "<a href = '#TabsMenu-1'>"
                                html += "<span>Agencia</span>"
                            html += "</a>"
                        html +="</li>";
                    }

                    if( data.DIRECTORIO_CLIENTES == 1 ){
                        html += "<li onclick = 'MostrarTabsMenu(2);' >"
                            html += "<a href = '#TabsMenu-2'>"
                                html += "<span>Clientes</span>"
                            html += "</a>"
                        html +="</li>";
                    }

                    if( data.DIRECTORIO_PROVEEDORES == 1 ){
                        html += "<li onclick = 'MostrarTabsMenu(3);' >"
                            html += "<a href = '#TabsMenu-3'>"
                                html += "<span>Proveedores</span>"
                            html += "</a>"
                        html +="</li>";
                    }
                    if( data.DIRECTORIO_BANCOS == 1 ){
                        html += "<li onclick = 'MostrarTabsMenu(4);' >"
                            html += "<a href = '#TabsMenu-4'>"
                                html += "<span>Bancos</span>"
                            html += "</a>"
                        html +="</li>";
                    }
                    html += "</ul>";
                    
                    //--------
                    if( data.DIRECTOR_AGENCIA == 1 ){
                        html += "<div id = 'TabsMenu-1'>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Texto:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_DA' name = 'TextBusqueda_DA' />"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<p></p>"
                                    html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTabla_DA()'/>"
                                html += "</div>"
                            html += "</div><br>";
                            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DirectorioAgencia' id = 'DirectorioAgencia'>";
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Foto</th>"
                                        html += "<th>Nombres</th>"
                                        html += "<th>Apellidos</th>"
                                        html += "<th>Cargo</th>"
                                        html += "<th>Correo Corporativo</th>"
                                        html += "<th>Celular</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table></div>";
                        html += "</div>"
                    }
                    if( data.DIRECTORIO_CLIENTES == 1 ){
                        html += "<div id = 'TabsMenu-2'>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Cliente:</label>"
                                    html += "<select class = 'form-control' name = 'IdCliente_Dir' id = 'IdCliente_Dir' >"
                                        html += "<option value = '0' selected>Todos</option>"
                                        for(var i = 0 ;i < data.SqlClientes.length;i++){
                                            html += "<option value = '"+data.SqlClientes[i]['IdCliente']+"'>"+data.SqlClientes[i]['Cliente']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Texto:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_DC' name = 'TextBusqueda_DC' />"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<p></p>"
                                    html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTabla_DC()'/>"
                                html += "</div>"
                            html += "</div><br>";
                            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DirectorioClientes' id = 'DirectorioClientes'>";
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Cliente</th>"
                                        html += "<th>Nombres</th>"
                                        html += "<th>Cargo</th>"
                                        html += "<th>Celular</th>"
                                        html += "<th>Teléfono</th>"
                                        html += "<th>Correo</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table></div>";
                        html += "</div>"
                    }
                    if( data.DIRECTORIO_PROVEEDORES == 1 ){
                        html += "<div id = 'TabsMenu-3'>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Proveedor:</label>"
                                    html += "<select class = 'form-control' name = 'IdProveedor_Dir' id = 'IdProveedor_Dir' >"
                                        html += "<option value = '0' selected>Todos</option>"
                                        for(var i = 0 ;i < data.SqlProveedores.length;i++){
                                            html += "<option value = '"+data.SqlProveedores[i]['IdProveedor']+"'>"+data.SqlProveedores[i]['Proveedor']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Texto:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_DP' name = 'TextBusqueda_DP' />"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<p></p>"
                                    html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTabla_DP()'/>"
                                html += "</div>"
                            html += "</div><br>";
                            html += "<table class='tableNew dataTable DirectorioProveedores' id = 'DirectorioProveedores'>";
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Cliente</th>"
                                        html += "<th>Nombres</th>"
                                        html += "<th>Cargo</th>"
                                        html += "<th>Teléfono</th>"
                                        html += "<th>Celular</th>"
                                        html += "<th>Correo</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>";
                        html += "</div>"
                    }
                    if( data.DIRECTORIO_BANCOS == 1 ){
                        html += "<div id = 'TabsMenu-4'>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Banco:</label>"
                                    html += "<select class = 'form-control' name = 'IdBanco_Dir' id = 'IdBanco_Dir' >"
                                        html += "<option value = '0' selected>Todos</option>"
                                        for(var i = 0 ;i < data.SqlBancos.length;i++){
                                            html += "<option value = '"+data.SqlBancos[i]['Id']+"'>"+data.SqlBancos[i]['Banco']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<label for='IdTipoDoc'>Texto:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_DB' name = 'TextBusqueda_DB' />"
                                html += "</div>"
                                html += "<div class='col col-sm-2 my-2'>"
                                    html += "<p></p>"
                                    html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTabla_DB()'/>"
                                html += "</div>"
                            html += "</div><br>";
                            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DirectorioBancos' id = 'DirectorioBancos'>";
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Cliente</th>"
                                        html += "<th>Nombres</th>"
                                        html += "<th>Cargo</th>"
                                        html += "<th>Celular</th>"
                                        html += "<th>Teléfono</th>"
                                        html += "<th>Correo</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table></div>";
                        html += "</div>"
                    }
                html += "</div>"
            html += "</div>"
            $(".ModalEditX").html(html);

            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $(".form-group label").css({'font-size':'12px'})
            $(".form-group input,.form-group select").css({'font-size':'13px'})
            $("#TabsMenu").tabs()
            ModalEdit(1)
            TablaDirectorioEmpleados()
            
            if( data.DIRECTORIO_CLIENTES == 1 ){
                TablaDirectorioClientes();
            }
            if( data.DIRECTORIO_PROVEEDORES == 1 ){
                TablaDirectorioProveedores();
            }
            if( data.DIRECTORIO_BANCOS == 1 ){
                TablaDirectorioBancos();
            }
        }
    })
}

function BuscarDatosTabla_DA(){
    $DataTable_DirectorioEmpleado.destroy();
    TablaDirectorioEmpleados()
}
function BuscarDatosTabla_DC(){
    $DataTable_DirectorioClientes.destroy();
    TablaDirectorioClientes()
}
function BuscarDatosTabla_DP(){
    $DataTable_DirectorioProveedor.destroy();
    TablaDirectorioProveedores()
}
function BuscarDatosTabla_DB(){
    $DataTable_DirectorioBancos.destroy();
    TablaDirectorioBancos()
}
function TablaDirectorioEmpleados(){
    $DataTable_DirectorioEmpleado = $("#DirectorioAgencia").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '16f090739fd3c2dc8c110eac1dd7234b',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_DA").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                }
        },
        'columns': [

           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {
               data: 'IdEmpleado',
                "render": function (data, type, full, meta) {
                    var ht = '<img src = "../storage/app/datos/Empleados/'+full.IdEmpleado+'/'+full.Foto+'" class = "FotoTablaEmpleado"/>'
                    return '<center>' + ht + '</center>';
                }

            },
            {
               data: 'IdEmpleado',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Nombre1 + ' '+ full.Nombre2 +'</span>';
                }

            },
            {
               data: 'IdEmpleado',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Apellido1 + ' '+ full.Apellido2 +'</span>';
                }

            },
            {
               data: 'IdEmpleado',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Cargo +'</span>';
                }

            },

            {
               data: 'IdEmpleado',
               "render": function (data, type, full, meta) {
                    if( full.Correo == null ){
                        return '<span>' + full.CorreoPersonal +'</span>';
                    }else{
                        return '<span>' + full.Correo +'</span>';
                    }
                    
                }

            },
            {
               data: 'IdEmpleado',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Celular +'</span>';
                }

            },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#DirectorioAgencia').css({'width':'100%'})
}

function TablaDirectorioClientes(){
    $DataTable_DirectorioClientes = $("#DirectorioClientes").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '8cc63bb4f1889e574705e6ff66d01e8f',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_DC").val();
                    d.search['IdCliente'] = $("#IdCliente_Dir").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                }
        },
        'columns': [

            {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
               data: 'Cliente',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Cargo +'</span>';
                }

            },

            {
               data: 'Celular',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Celular +'</span>';
                    
                }

            },
            {
               data: 'Telefono',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Correo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
           
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#DirectorioClientes').css({'width':'100%'})
}

function TablaDirectorioProveedores(){
    $DataTable_DirectorioProveedor = $("#DirectorioProveedores").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '96c83cb30020818880ffa5f0bef2c2da',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_DP").val();
                    d.search['IdProveedor'] = $("#IdProveedor_Dir").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                }
        },
        'columns': [

            {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
               data: 'Proveedor',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Cargo +'</span>';
                }

            },

            {
               data: 'Celular',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Celular +'</span>';
                    
                }

            },
            {
               data: 'Telefono',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Correo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
           
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#DirectorioProveedores').css({'width':'100%'})
}

function TablaDirectorioBancos(){
    $DataTable_DirectorioBancos = $("#DirectorioBancos").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '51b6c3e7773f275492265598598c09a6',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_DB").val();
                    d.search['IdBanco'] = $("#IdBanco_Dir").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                }
        },
        'columns': [

            {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
               data: 'Banco',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Cargo +'</span>';
                }

            },

            {
               data: 'Celular',
               "render": function (data, type, full, meta) {
                    return '<span>' + full.Celular +'</span>';
                    
                }

            },
            {
               data: 'Telefono',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
            {
               data: 'Correo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }

            },
           
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#DirectorioBancos').css({'width':'100%'})
}


function FormEncuestaCliente(){
    $.ajax({
        type:'POST',
        url:'5610f6801cd58b6e6fd07175bec520e3',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Vl = 1;
            var html = "";
            html += "<div class='modal-header panel-heading '>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Encuesta de Satisfacción</span>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body' style = 'max-height:450px;overflow-y:scroll;'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>"
                        html += "<label for='IdTipoDoc'>Por favor califíque el servicio de la Empresa a través de la siguientes preguntas:</label>"
                    html += "</div>"
                html += "</div>"
                
                for(var e = 0; e < data.Encuesta.length;e++){
                    if( data.Encuesta[e]['R'].length > 0 ){
                        Vl = 0
                    }
                    for(var s = 0; s < data.Encuesta[e]['Secciones'].length;s++){
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-3' style = 'BACKGROUND-COLOR: #79a8d1;padding:5px;'>"
                                html += "<strong for='IdTipoDoc'>"+data.Encuesta[e]['Secciones'][s]['Seccion']+"</strong>"
                            html += "</div>"
                        html += "</div>"
                        for(var p = 0; p < data.Encuesta[e]['Secciones'][s]['Preguntas'].length;p++){
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>"
                                    html += "<label for='IdTipoDoc'><span class = 'Obligatorio'>(*)</span>  "+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Pregunta']+":</label>"
                                    html += "<span class = 'HidenInformation HashTask_"+data.Encuesta[e]['Id']+"'>"+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Id']+"</span>"
                                    html += "<ul class = 'OpcionesRespuestas'>"
                                        for(var op = 0; op < data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Opciones'].length; op++){
                                            html += "<li>"
                                                html += "<table >"
                                                    html += "<tr>"
                                                        html += "<td><input type ='radio'  name ='OptionsTask"+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Id']+"' value ='"+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Opciones'][op]['Id']+"' /></td>"
                                                        html += "<td style = 'padding-left:10px;'><label for='IdTipoDoc'>"+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Opciones'][op]['Nombre']+"</label></td>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</li>"
                                        }
                                    html += "</ul>"
                                    html += "<label for='IdTipoDoc'><span class = 'Obligatorio'>(*)</span>  Comentarios adicionales:</label>"
                                    html += "<textarea rows = '3' class = 'form-control' id = 'ComentariosAdicionales"+data.Encuesta[e]['Secciones'][s]['Preguntas'][p]['Id']+"'></textarea>"
                                    html += "<br>"
                                html += "</div>"
                            html += "</div>"
                        }
                    }
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-3 CenterText'>"
                            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEncuestaCliente("+data.Encuesta[e]['Id']+")'>Guardar Calificación</button>"
                        html += "</div>"
                    html += "</div>"
                }
                    
            html += "</div>"
            $(".ModalEditX").html(html);

            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            $(".form-group label").css({'font-size':'12px'})
            $(".OpcionesRespuestas").css({'list-style':'none'})
            $(".form-group input,.form-group select").css({'font-size':'13px'})
            if( Vl == 1 ){
                ModalEdit(1)
            }
            
        }
    })
}

function GuardarEncuestaCliente(Hash){
    var Informacion = [];
    var NumPreguntas = $(".HashTask_"+Hash).length;
    var Respuestas = 0
    var Comentariosx = 0
    $(".HashTask_"+Hash).each(function(){
        var Id = $(this).text()
        var Valor = $('input[name="OptionsTask'+Id+'"]:checked').val();
        if( Valor !== undefined ){
            Respuestas++
        }
        var Comentario = $("#ComentariosAdicionales"+Id).val()
        if( Comentario != '' ){
            Comentariosx++
        }
        Informacion.push({'Id':Id,'Valor':$('input[name="OptionsTask'+Id+'"]:checked').val(),'Comentario':Comentario})
    })
    if( NumPreguntas == Respuestas && NumPreguntas == Comentariosx ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("Items", JSON.stringify(Informacion));

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'33a11cc7a8c91d6935dd9119ff9129e5',
            success:function(data){
                alert(data.mensaje)
                ModalEdit(0)
            }
        })
    }else{
        alert("Debe responder todas las preguntas Obligatorias");
    }
    
}

function FormEncuestaEjecutivo(){
    $.ajax({
        type:'POST',
        url:'5610f6801cd58b6e6fd07175bec520e2',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading '>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Encuesta de Evaluación a Cliente</span>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body' style = 'max-height:450px;overflow-y:scroll;'>";
                var html2 = "";
                var Vl = 1;
                for(var pro = 0; pro < data.Encuesta[0]['Producto'].length; pro++){
                    if( data.Encuesta[0]['Producto'][pro]['R'].length > 0 ){
                        
                    }
                    if( data.Encuesta[0]['Producto'][pro]['R'].length == data.Encuesta[0]['Producto'][pro]['R'].length ){
                        html2 += "<div class = 'form-row'>";
                            html2 += "<div class='col col-sm-12 my-2'>"
                                html2 += "<label for='IdTipoDoc'>Por favor califíque al Cliente "+data.Encuesta[0]['Producto'][pro]['Cliente']+" - "+data.Encuesta[0]['Producto'][pro]['Producto']+" a través de las siguientes preguntas:</label>"
                            html2 += "</div>"
                        html2 += "</div>"
                        for(var s = 0; s < data.Encuesta[0]['Producto'][pro]['Secciones'].length;s++){
                            html2 += "<div class = 'form-row'>";
                                html2 += "<div class='col col-sm-12 my-3' style = 'BACKGROUND-COLOR: #79a8d1;padding:5px;'>"
                                    html2 += "<strong for='IdTipoDoc'>"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Seccion']+"</strong>"
                                html2 += "</div>"
                            html2 += "</div>"
                            for(var p = 0; p < data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'].length;p++){
                                html2 += "<div class = 'form-row'>";
                                    html2 += "<div class='col col-sm-12 my-2'>"
                                        html2 += "<label for='IdTipoDoc'><span class = 'Obligatorio'>(*)</span>  "+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Pregunta']+":</label>"
                                        html2 += "<span class = 'HidenInformation HashTask_"+data.Encuesta[0]['Id']+"_"+data.Encuesta[0]['Producto'][pro]['Id']+"'>"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Id']+"</span>"
                                        html2 += "<ul class = 'OpcionesRespuestas'>"
                                            for(var op = 0; op < data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Opciones'].length; op++){
                                                html2 += "<li>"
                                                    html2 += "<table >"
                                                        html2 += "<tr>"
                                                            html2 += "<td><input type ='radio'  name ='OptionsTask"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Id']+"' value ='"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Opciones'][op]['Id']+"' /></td>"
                                                            html2 += "<td style = 'padding-left:10px;'><label for='IdTipoDoc'>"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Opciones'][op]['Nombre']+"</label></td>"
                                                        html2 += "</tr>"
                                                    html2 += "</table>"
                                                html2 += "</li>"
                                            }
                                        html2 += "</ul>"
                                        html2 += "<label for='IdTipoDoc'><span class = 'Obligatorio'>(*)</span>  Comentarios adicionales:</label>"
                                        html2 += "<textarea rows = '3' class = 'form-control' id = 'ComentariosAdicionales"+data.Encuesta[0]['Producto'][pro]['Secciones'][s]['Preguntas'][p]['Id']+"'></textarea>"
                                        html2 += "<br>"
                                    html2 += "</div>"
                                html2 += "</div>"
                            }
                        }
                        html2 += "<div class = 'form-row'>";
                            html2 += "<div class='col col-sm-12 my-3 CenterText'>"
                                html2 += "<button type='button' class='btn btn-primary' onclick = 'GuardarEncuestaAgencia("+data.Encuesta[0]['Producto'][pro]['Id']+","+data.Encuesta[0]['Id']+")'>Guardar Calificación</button>"
                                html2 += "<hr>"
                            html2 += "</div>"
                        html2 += "</div>"
                    }
                }
                html += html2
            html += "</div>"
            $(".ModalEditX").html(html);

            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            $(".form-group label").css({'font-size':'12px'})
            $(".OpcionesRespuestas").css({'list-style':'none'})
            $(".form-group input,.form-group select").css({'font-size':'13px'})
            if( Vl == 1 ){
                ModalEdit(1)
            }
            ModalEdit(1)
        }
    })
}

function GuardarEncuestaAgencia(IdProducto,Hash){
    var Informacion = [];
    var NumPreguntas = $(".HashTask_"+Hash+"_"+IdProducto).length;
    var Respuestas = 0
    var Comentariosx = 0
    $(".HashTask_"+Hash+"_"+IdProducto).each(function(){
        var Id = $(this).text()
        var Valor = $('input[name="OptionsTask'+Id+'"]:checked').val();
        if( Valor !== undefined ){
            Respuestas++
        }
        var Comentario = $("#ComentariosAdicionales"+Id).val()
        if( Comentario != '' ){
            Comentariosx++
        }
        Informacion.push({'Id':Id,'Valor':$('input[name="OptionsTask'+Id+'"]:checked').val(),'Comentario':Comentario})
    })
    console.log(Informacion)
    if( NumPreguntas == Respuestas && NumPreguntas == Comentariosx ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("IdProducto",IdProducto);
        formData.append("Items", JSON.stringify(Informacion));

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'33a11cc7a8c91d6935dd9119ff9129e1',
            success:function(data){
                alert(data.mensaje)
                location.reload()
            }
        })
    }else{
        alert("Debe responder todas las preguntas Obligatorias");
    }
}