/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TipoComision = "";
var PorcentajeComision = 0;
var MinRentabilidad = 0;
var Recorridos = 0;
var Total_RentabilidadBruta = 0;
var Total_Porcentaje_RentabilidadBruta = 0;
var Total_Rentabilidad_Bruta_Comision = 0;
var Total_Porcentaje_Bruta_Comision = 0;
var Total_RentabilidadNeta = 0;
var Total_Porcentaje_Rentabilidad_Neta = 0;
var Total_CostoInternoPpto = 0;
var Total_CostoExternoPpto = 0;
var Total_ValorComisional = 0;
var Total_ValorNoComisional = 0;
var Total_ExcedenteAsociados = 0;
var Total_CostosEjecucion = 0;
var Html_ComisionManual = "";
var AComisionesManuales = [];
var TotalImprevistos = 0;
var PorcentajeImprevistos = 0;

var TotalGastosAdministrativos = 0;
var PorcentajeGastosAdministrativos = 0;

var PorcentajeGeneralComision = 0;
var Total_ComisionAgencia = 0;

var Total_Actividad = 0;

var Total_ComsionPorDescuentos = 0;
var GranTotal_ComisionPorDescuentos = 0;


var Total_UtilidadComercial = 0;
var PorcentajeVolumenTotal = 0;

var TotalUtilidadMarginal = 0;

var TotalImpuestosAdicionales = 0;
var PorcentajeImpuestosAd = 0;

var TotalFactoring = 0;
var PorcentajeFactoring = 0;
var TotalInteresesBancarios = 0;
var PorcentajeInteresesBancarios = 0;
var TotalInterecesTerceros = 0;
var PorcentajeInteresesTerceros = 0;
var NumeroProveedores = 0;

var TotalPptoAntesImpuestos = 0;
//var ImpuestosComisionPpto = array();
var TotalResumenImpuestos = 0;
var TotalImpuestosParam = 0;
var PorcentajeFactoring = 0;
var ComisionManual = 0;

var UtilidadFinal = 0;
var PorcentajeUtilidadFinal = 0;
var DataPptos = [];
var DataPptosResumen = [];
var TotalC = 0;

var HashPpto = 0;
var Hashing = 0;
var VersionInterna = 0;
var VersionCliente = 0;

$(document).ready(function () {
    var Alto = $( window ).height();
    FormatValoresPpto()

    AlimentarImpuestosComisionPpto()    
    AlimentarComision();
    AlimentarConceptosAdicionales();
    HashPpto = $(".HashP").text();
    ComisionManual = 0;
    
    $(".GruposIds").each(function(){
        var Hash2 = $(this).text()
        
        CalcularCostoGrupoPpto(HashPpto,Hash2)
    })
    CalcularAllPpto($(".HashP").text())
    
    
    $(".OptionIcon ").height("30")
    $(".ContentBody").css({'overflow-y':'hidden'})
    
    var Alto = $( window ).height();
    var t = Alto*0.80;
    if( Alto > 630 ){
        $(".ContenedorOptionDiv").css({'height':t,'min-height':'300px','overflow':'scroll'})
    }else{
        $(".ContenedorOptionDiv").css({'height':'280px','min-height':'280px'})
    }
    
    
    $(".ContenedorItemsGrupos").css({'width': $( ".TituloTablasResumen" ).width()}).show()
    $("body").on('mouseover',function(){
        $(".ContenedorItemsGrupos").css({'width': $( ".TituloTablasResumen" ).width()+5}).show()
    })
    
    $(".FirstText ").css({'font-size':'13px'})
    
    $(".TituloPantalla").html("Presupuesto # "+ $(".HashP").text()+"<br>" +
            "<span style = 'font-size:12px;'>"+$(".HashRP").text()+"</span><br>" + 
            "<span style = 'font-size:12px;'>Versión Interna: "+VersionInterna+" - Versión Cliente: "+VersionCliente+"</span>")
    $(".MenuTop").css({
        'left':'45%'
    });
    OcultarMenuUsuario();
    $(".ContadorItems").each(function(i){
        $(this).text(i+1)
    })
    $(".Presupuesto_Cuerpo").css({'background-color':'white'})
});
function AlimentarComision(){
    TipoComsion = $(".TComSon").text();
    PorcentajeComision = parseFloat( $(".ComSon").text() ) / 100;
    PorcentajeGeneralComision = parseFloat( $(".ComSon").text() );
    
    $(".TComSon").remove()
    $(".ComSon").remove()
}

function AlimentarConceptosAdicionales(){
    PorcentajeImprevistos = parseFloat($(".Imprevistos").text());
    $(".Imprevistos").remove()
    
    PorcentajeGastosAdministrativos = parseFloat($(".GastosAdministrativos").text());
    $(".GastosAdministrativos").remove()
    
    $(".DivImpuestosResumen .ImpuestosResumen").each(function(e){
        var Nombre = $(this).children("span:nth(0)").text();
        var Valor = $(this).children("span:nth(1)").text();
        var Tipo = $(this).children("span:nth(2)").text();
        DataPptosResumen.push({
            'Concepto' : Nombre,
            'Valor' : Valor,
            'Tipo' : Tipo,
            'ValorOperado' : 0
        })
    });
    $(".DivImpuestosResumen").remove()
    
    PorcentajeImpuestosAd = parseFloat( $(".ImpuestosAdicionales").text() );
    $(".ImpuestosAdicionales").remove()
    
    PorcentajeFactoring = parseFloat( $(".Factoring").text() );
    $(".Factoring").remove()
    
    PorcentajeInteresesBancarios = parseFloat( $(".IntBancarios").text() );
    $(".IntBancarios").remove()
    
    PorcentajeInteresesTerceros = parseFloat( $(".IntTerceros").text() );
    
    $(".IntTerceros").remove()
    
    NumeroProveedores = parseFloat( $(".Cprov").text() );
    
    VersionInterna = $(".VersionInterna").text();
    VersionCliente = $(".VersionCliente").text();
    Hasing = $(".HasingPpto").text();
    
    $(".VersionInterna").remove()
    $(".VersionCliente").remove()
    $(".HasingPpto").remove()
}

function AlimentarImpuestosComisionPpto(){
    $(".ImpuestosComision").each(function(e){
        var Nombre = $(this).children("span:nth(0)").text();
        var Valor = $(this).children("span:nth(1)").text();
        var Tipo = $(this).children("span:nth(2)").text();
        DataPptos.push({
            'Concepto' : Nombre,
            'Valor' : Valor,
            'Tipo' : Tipo,
            'ValorOperado' : 0
        })
    });
    $(".DivImpuestosComision").remove()
    
}

function ViewResumenPresupuesto(){
    var html = "";
   

    TituloVentana = "Resumen Presupuesto"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>";
            var RA = "<div width = '100%'>"
                RA += "<table width = '100%'>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_mes CenterText border_top' colspan = '3'>RESUMEN DE ACTIVIDAD</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Valores Comisionables</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_ValorComisional)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Valores No Comisionables</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_ValorNoComisional)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Excedente Asociados</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(0)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Total Costos de Ejecución</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_CostosEjecucion)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Imprevistos</td>"
                        RA += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RA += "<input type = 'number' onkeyup = 'CalcularAllPpto("+$(".HashP").text()+")' oninput = 'CalcularAllPpto("+$(".HashP").text()+")' class = 'form-control PptoCamposSmall' step='0.1' id = 'ImprevistosPpto' value = '"+PorcentajeImprevistos+"' name = 'ImprevistosPpto'  />"
                        RA += "</td>"
                        RA += "<td class = 'td_cuerpo_table TotalImprevistos' style = 'padding:5px;'>0</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Gastos Administrativos</td>"
                        RA += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RA += "<input type = 'number' onkeyup = 'CalcularAllPpto("+$(".HashP").text()+")' oninput = 'CalcularAllPpto("+$(".HashP").text()+")' class = 'form-control PptoCamposSmall' step='0.1' id = 'GastosAdministrativosPpto' value = '"+PorcentajeGastosAdministrativos+"' name = 'GastosAdministrativosPpto' />"
                        RA += "</td>"
                        RA += "<td class = 'td_cuerpo_table TotalGastosAdministrativos' style = 'padding:5px;'>0</td>"
                    RA += "</tr>"
                    RA += Html_ComisionManual
                    /*RA += "<tr>"
                        RA += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Comisión Agencia</td>"
                        RA += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlPorcentajes_Doble(PorcentajeGeneralComision)+"</td>"
                        RA += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlValores_Doble(Total_ComisionAgencia)+"</td>"
                    RA += "</tr>"*/
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Total Actividad</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_Actividad)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Total Comisiones Por Descuentos</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(GranTotal_ComisionPorDescuentos)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Utilidad Comercial</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_UtilidadComercial)+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Volumen</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlPorcentajes_Doble(PorcentajeVolumenTotal.toFixed(2))+"</td>"
                    RA += "</tr>"
                    RA += "<tr>"
                        RA += "<td class = 'subtitulos_principales' colspan = '2' style = 'text-align:left;'>Utilidad Marginal</td>"
                        RA += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(TotalUtilidadMarginal)+"</td>"
                    RA += "</tr>"
                RA += "</table>"
            RA += "</div>";
            var RI  = "<div width = '100%'>"
                RI += "<table width = '100%'>"
                    RI += "<tr>"
                        RI += "<td class = 'subtitulos_mes CenterText border_top' colspan = '3'>RESUMEN DE IMPUESTOS</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'subtitulos_principales' colspan = '2'  style = 'text-align:left;'>Valor Total Sin Iva</td>"
                        RI += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(Total_Actividad + ComisionManual)+"</td>"
                    RI += "</tr>"
                    for(var y = 0; y < DataPptos.length; y++){
                        RI += "<tr>"
                            RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>"+DataPptos[y]['Concepto']+"</td>"
                            RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                                if( DataPptos[y]['Tipo'] == "PORCENTAJE" ){
                                    RI += HtmlPorcentajes_Doble(DataPptos[y]['Valor'])
                                    //TotalResumenImpuestos += HtmlPorcentajes_Doble(DataPptos[y]['Valor'])
                                }else{
                                   RI += HtmlValores_Doble(DataPptos[y]['Valor']) 
                                   //TotalResumenImpuestos += HtmlValores_Doble(DataPptos[y]['Valor']) 
                                }
                            RI += "</td>"
                            RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                                RI += HtmlValores_Doble(DataPptos[y]['ValorOperado']) 
                            RI += "</td>"
                        RI += "</tr>"
                    }
                    for(var y = 0; y < DataPptosResumen.length; y++){
                        RI += "<tr>"
                            RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>"+DataPptosResumen[y]['Concepto']+"</td>"
                            RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                                if( DataPptosResumen[y]['Tipo'] == "PORCENTAJE" ){
                                    RI += HtmlPorcentajes_Doble(DataPptosResumen[y]['Valor'])
                                    
                                }else{
                                   RI += HtmlValores_Doble(DataPptosResumen[y]['Valor']) 
                                   
                                }
                            RI += "</td>"
                            
                            RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            TotalC = Total_Actividad + ComisionManual
                                if( DataPptosResumen[y]['Tipo'] == "PORCENTAJE" ){
                                    RI += HtmlValores_Doble(TotalC*(parseFloat(DataPptosResumen[y]['Valor'])/100)) 
                                    TotalResumenImpuestos += (TotalC*(parseFloat(DataPptosResumen[y]['Valor'])/100))
                                }else{
                                    RI += HtmlValores_Doble(Math.round(TotalC*(parseFloat(DataPptosResumen[y]['Valor'])))) 
                                    TotalResumenImpuestos += Math.round(TotalC*(parseFloat(DataPptosResumen[y]['Valor'])))
                                }
                                
                            RI += "</td>"
                        RI += "</tr>"
                    }
                    RI += "<tr>"
                        RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Impuestos Adicionales</td>"
                        RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RI += HtmlPorcentajes_Doble(PorcentajeImpuestosAd)
                        RI += "</td>"
                        RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RI += HtmlValores_Doble(TotalImpuestosAdicionales) 
                        RI += "</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Factoring</td>"
                        RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RI += "<input type = 'number' onkeyup = 'CalcularAllPpto("+$(".HashP").text()+")' oninput = 'CalcularAllPpto("+$(".HashP").text()+")' class = 'form-control PptoCamposSmall' step='0.1' id = 'Factoring' value = '"+PorcentajeFactoring+"' name = 'Factoring'  />"
                        RI += "</td>"
                        RI += "<td class = 'td_cuerpo_table TotalFactoring' style = 'padding:5px;'>"+HtmlValores_Doble(TotalFactoring)+"</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Del Proyecto e Intereses Bancarios</td>"
                        RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RI += "<input type = 'number' onkeyup = 'CalcularAllPpto("+$(".HashP").text()+")' oninput = 'CalcularAllPpto("+$(".HashP").text()+")' class = 'form-control PptoCamposSmall' step='0.1' id = 'IntBancarios' value = '"+PorcentajeInteresesBancarios+"' name = 'IntBancarios'  />"
                        RI += "</td>"
                        RI += "<td class = 'td_cuerpo_table TotalIntereses' style = 'padding:5px;'>"+HtmlValores_Doble(TotalInteresesBancarios)+"</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Del Proyecto Intereses a 3ros</td>"
                        RI += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"
                            RI += "<input type = 'number' onkeyup = 'CalcularAllPpto("+$(".HashP").text()+")' oninput = 'CalcularAllPpto("+$(".HashP").text()+")' class = 'form-control PptoCamposSmall' step='0.1' id = 'IntTerceros' value = '"+PorcentajeInteresesTerceros+"' name = 'IntTerceros'  />"
                        RI += "</td>"
                        RI += "<td class = 'td_cuerpo_table TotalTerceros' style = 'padding:5px;'>"+HtmlValores_Doble(TotalInterecesTerceros)+"</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'subtitulos_principales' colspan = '2'  style = 'text-align:left;'>Total Costos Financieros e Impuestos</td>"
                        RI += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(TotalResumenImpuestos)+"</td>"
                    RI += "</tr>"
                    RI += "<tr>"
                        RI += "<td class = 'subtitulos_principales' colspan = '2'  style = 'text-align:left;'>Utilidad Final</td>"
                        RI += "<td class = 'subtitulos_principales'>"+HtmlValores_Doble(UtilidadFinal)+"</td>"
                    RI += "</tr>"
                RI += "</table>"
            RI += "</div>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td style='vertical-align:top;width:49%;'>"+RA+"</td>"
                    html += "<td class = 'BorderCero'></td>"
                    html += "<td style='vertical-align:top;width:49%;'>"+RI+"</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>"

    html += "</div>";
    html += "<div class='modal-footer'>";
        
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    //$("#ModalContentForm2").modal("show")
    ResizeModal(0.7)
}

function Ppto_ListarUnidadesEmpresaUsuario(Hash){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'ac415e10c7fa3362840003282e795f6c',
        data:{ Hash:$("#IdEmpresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = ""
            for(var i = 0; i < data.Unidades.length; i++){
                if( data.Unidades[i]['Hash'] == Hash ){
                    html += "<option selected value = '"+data.Unidades[i]['Hash']+"'>"+data.Unidades[i]['Nombre']+"</option>"
                }
            } 
            $("#IdUnidad").html(html)
            $("#NotaLegalEmpresaPpto").html(data.Nota[0]['Nota'])
        } 
    })
}

function Ppto_Blade_ListarUnidadesEmpresaUsuario(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'ac415e10c7fa3362840003282e795f6c',
        data:{ Hash:$("#Empresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' >Seleccione</option>"
            for(var i = 0; i < data.Unidades.length; i++){
                html += "<option selected value = '"+data.Unidades[i]['Hash']+"'>"+data.Unidades[i]['Nombre']+"</option>"
            } 
            $("#Unidad").html(html)
        } 
    })
}

function Ppto_ListarClientesUsuarioEmpresaUnidad(HashC,HashU){
    console.log($("#IdUnidad").val())
   $.ajax({
        type:'POST',
        url:UrlGeneral+'1808d87b2dce352e689b9fec41ae53c9',
        data:{ Hash:$("#IdEmpresa").val(),Hash2:HashU,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                if( HashC == data.Cliente[i]['Hash'] ){
                    html += "<option value = '"+data.Cliente[i]['Hash']+"' selected>"+data.Cliente[i]['NombreComercial']+"</option>"
                }
                
            } 
            $("#IdCliente").html(html)
        } 
    })
}

function Ppto_Blade_ListarClientesUsuarioEmpresaUnidad(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'1808d87b2dce352e689b9fec41ae53c9',
        data:{ Hash:$("#Empresa").val(),Hash2:$("#Unidad").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' >Seleccione</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['NombreComercial']+"</option>"
            } 
            $("#Cliente").html(html)
        } 
    })
}

function Presupuesto_ListarTiposComision(Hash1,Hash2,Hash3,TP,p){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d1278c64e4e3181e82c88a0357893d7c',
        data:{ 
            Hash1:Hash1,
            Hash2:Hash2,
            Hash3:Hash3,
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' >Seleccione</option>"
            for(var i = 0; i < data.Comisiones.length; i++){
                if( TP == data.Comisiones[i]['Hash'] ){
                    html += "<option selected value = '"+data.Comisiones[i]['Hash']+"'>"+data.Comisiones[i]['Porcentaje']+"% - "+data.Comisiones[i]['TipoComision']+" - Pago a "+data.Comisiones[i]['Dias']+"</option>"
                }else{
                    html += "<option value = '"+data.Comisiones[i]['Hash']+"'>"+data.Comisiones[i]['Porcentaje']+"% - "+data.Comisiones[i]['TipoComision']+" - Pago a "+data.Comisiones[i]['Dias']+"</option>"
                }
            } 
            $("#IdComision").html(html)
            
            html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Proyectos.length; i++){
                if( p == data.Proyectos[i]['Hash'] ){
                   html += "<option value = '"+data.Proyectos[i]['Hash']+"' selected >"+data.Proyectos[i]['Codigo']+" - "+data.Proyectos[i]['Referencia']+"</option>"
                }else{
                    html += "<option value = '"+data.Proyectos[i]['Hash']+"'>"+data.Proyectos[i]['Codigo']+" - "+data.Proyectos[i]['Referencia']+"</option>"
                }
            } 
            $("#IdProyecto").html(html)
        } 
    })
}

function Presupuesto_Blade_ListarTiposComision(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d1278c64e4e3181e82c88a0357893d7c',
        data:{ 
            Hash1:$("#Empresa").val(),
            Hash2:$("#Unidad").val(),
            Hash3:$("#Cliente").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' >Seleccione</option>"
            for(var i = 0; i < data.Proyectos.length; i++){
                html += "<option value = '"+data.Proyectos[i]['Hash']+"'>"+data.Proyectos[i]['Codigo']+" - "+data.Proyectos[i]['Referencia']+"</option>"
            } 
            $("#Proyecto").html(html)
        } 
    })
}

function AgregarAsociado(Hash){
    $(".AsociadosItem"+Hash).hide()
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88p0ox',
        data:{ Hash:Hash,IdPpto:$(".HashP").text(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            AsociadosItem(Hash)
        }
    })
}

function CalcularAsociado(Hash){
    var Total = 0;
    $(".AOrdenItemGrupoPptoId").each(function(){
        var Id = $(this).text()
        var temp = parseFloat( $("#ADiasItem"+Id).val() ) * parseFloat( $("#ACantidadItem"+Id).val() ) * parseFloat( $(".AValorUnitarioInterno"+Id+"_real").text() )
        var Vol = temp - (temp * (parseFloat( $("#AVolumenItem"+Id).val() ) / 100));
        $(".Subtotal"+Hash).html( HtmlValores_Doble(temp) )
        $(".TSubtotal"+Hash).html( HtmlValores_Doble(Vol) )
    })
}


function CalcularAsociadoItem(){
    var Total = 0;
    $(".AOrdenItemGrupoPptoId").each(function(){
        var Id = $(this).text()
        var temp = parseFloat( $("#ADiasItem"+Id).val() ) * parseFloat( $("#ACantidadItem"+Id).val() ) * parseFloat( $(".AValorUnitarioInterno"+Id+"_real").text() )
        var Vol = temp - (temp * (parseFloat( $("#AVolumenItem"+Id).val() ) / 100));
        $(".Subtotal"+Id).html( HtmlValores_Doble(temp) )
        $(".TSubtotal"+Id).html( HtmlValores_Doble(Vol) )
    })
}

function CalcularAsociadoItemG(Hash){
    var SubTotal = 0;
    var Total = 0;
    $(".AOrdenItemGrupoPptoId"+Hash).each(function(){
        var Id = $(this).text()
        var temp = parseFloat( $("#ADiasItem"+Id).val() ) * parseFloat( $("#ACantidadItem"+Id).val() ) * parseFloat( $(".AValorUnitarioInterno"+Id+"_real").text() )
        SubTotal += temp
        var Vol = temp - (temp * (parseFloat( $("#AVolumenItem"+Id).val() ) / 100));
        Total += Vol
        $(".Subtotal"+Id).html( HtmlValores_Doble(temp) )
        $(".TSubtotal"+Id).html( HtmlValores_Doble(Vol) )
    })
    $(".SubTotalAsociados"+Hash).html( HtmlValores_Doble(SubTotal) )
    $(".TotalAsociados"+Hash).html( HtmlValores_Doble(Total) )
}

function EliminarAsociado(HashItem,HashPadre){
    if(confirm("¿Está seguro(a) de retirar éste asociado?\nTenga en cuenta que al hacerlo no podrá recuperar la información.")){
        $.ajax({
            type:'POST',
            url:'../6d23f08934bde355af6b8995b4c92e88p0oa',
            data:{ Hash:HashItem,IdPpto:$(".HashP").text(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                AsociadosItem(HashPadre)
            }
        });
    }
}
function AsociadosItem(Hash){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88p0o',
        data:{ Hash:Hash,IdPpto:$(".HashP").text(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "";
            var TotalAsociados = 0;
            html += "<tr class = 'DetalleAsociados DetalleAsociados"+Hash+"'>"
                html += "<td class = 'CenterText'><img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = 'AgregarAsociado("+Hash+")' /> Agregar Asociado</td>"
            html += "</tr>"
            $(".NumAsociados"+Hash).html( data.Asociados.length )
            for(var i = 0; i < data.Asociados.length; i++){
                html += "<tr class = 'DetalleAsociados DetalleAsociados"+Hash+"'>"
                    html += "<td class = 'AOrdenItemGrupoPptoId AOrdenItemGrupoPptoId"+Hash+"' style = 'display:none;'>"+data.Asociados[i]['Hash']+"</td>"
                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                        if( data.Asociados[i]['IdOc'] != 0 || data.Asociados[i]['IdOp'] != 0 ){
                            
                        }else{
                            html += "<img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarAsociado("+data.Asociados[i]['Hash']+","+Hash+")' />"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                        if(data.Asociados[i]['IdOp'] != '0'){
                            html += "<a target='_blank' href='../13889e416790c50f0410449d8b5eaf3c43/"+data.Asociados[i]['HashIdOp']+"'>OP # "+data.Asociados[i]['IdOp']+"</a>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                        if(data.Asociados[i]['IdOc'] != '0'){
                            html += "<a target='_blank' href='../13889e416790c50f0410449d8b5eaf3c43/"+data.Asociados[i]['HashIdOc']+"'>OC # "+data.Asociados[i]['IdOc']+"</a>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<input autocomplete = 'off' type = 'text' disabled class = 'form-control PptoCamposA' id = 'ANombreItem"+data.Asociados[i]['Hash']+"' name = 'ANombreItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Item']+"' disabled/>"
                        }else{
                            html += "<input autocomplete = 'off' type = 'text'  class = 'form-control PptoCamposA' id = 'ANombreItem"+data.Asociados[i]['Hash']+"' name = 'ANombreItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Item']+"'/>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<textarea autocomplete = 'off' type = 'text' disabled class = 'form-control PptoCamposA' id = 'ADescripcionItem"+data.Asociados[i]['Hash']+"' name = 'ADescripcionItem"+data.Asociados[i]['Hash']+"[]' disabled>"+data.Asociados[i]['Descripcion']+"</textarea>"
                        }else{
                            html += "<textarea  class = 'form-control PptoCamposA' id = 'ADescripcionItem"+data.Asociados[i]['Hash']+"' name = 'ADescripcionItem"+data.Asociados[i]['Hash']+"[]' >"+data.Asociados[i]['Descripcion']+"</textarea>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        var N = "";
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            N = "disabled"
                        }else{
                            
                        }
                        html += "<select "+N+" class = 'form-control PptoCamposA'  id = 'AProveedorItem"+data.Asociados[i]['Hash']+"' name = 'AProveedorItem"+data.Asociados[i]['Hash']+"[]' >"
                            html += "<option VALUE = '0' selected>Seleccione</option>"
                            for(var x = 0; x < data.Proveedores.length;x++){
                                if( data.Proveedores[x]['Hash'] == data.Asociados[i]['IdProveedor'] ){
                                    html += "<option value = '"+data.Proveedores[x]['Hash']+"' selected>"+data.Proveedores[x]['NombreComercial']+"</option>"
                                }else{
                                    html += "<option value = '"+data.Proveedores[x]['Hash']+"'>"+data.Proveedores[x]['NombreComercial']+"</option>"
                                }
                            }
                        html += "</select>"
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<input autocomplete = 'off' type = 'number' disabled class = 'form-control PptoCamposSmall PptoCamposA' id = 'ADiasItem"+data.Asociados[i]['Hash']+"' name = 'ADiasItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Dias']+"' disabled />"
                        }else{
                            html += "<input autocomplete = 'off' type = 'number'  class = 'form-control PptoCamposSmall PptoCamposA' id = 'ADiasItem"+data.Asociados[i]['Hash']+"' name = 'ADiasItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Dias']+"' onkeyup = 'CalcularAsociado("+data.Asociados[i]['Hash']+");CalcularAsociadoItem();CalcularAsociadoItemG("+Hash+")'/>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<input autocomplete = 'off' type = 'number' disabled class = 'form-control PptoCamposSmall PptoCamposA' id = 'ACantidadItem"+data.Asociados[i]['Hash']+"' name = 'ACantidadItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Cantidad']+"' disabled />"
                        }else{
                            html += "<input autocomplete = 'off' type = 'number'  class = 'form-control PptoCamposSmall PptoCamposA' id = 'ACantidadItem"+data.Asociados[i]['Hash']+"' name = 'ACantidadItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Cantidad']+"' onkeyup= 'CalcularAsociado("+data.Asociados[i]['Hash']+");CalcularAsociadoItem();CalcularAsociadoItemG("+Hash+")'/>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<input autocomplete = 'off' type = 'text' disabled class = 'form-control  PptoCamposA AValorUnitarioInterno"+data.Asociados[i]['Hash']+"' id = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"' name = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['ValorUnitario']+"' disabled />"
                        }else{
                            html += "<input autocomplete = 'off' type = 'text'  class = 'form-control  PptoCamposA AValorUnitarioInterno"+data.Asociados[i]['Hash']+"' id = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"' name = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['ValorUnitario']+"' onkeyup = 'FormatCampoNum(\"AValorUnitarioInterno"+data.Asociados[i]['Hash']+"\",\"AValorUnitarioInterno"+data.Asociados[i]['Hash']+"_real\");CalcularAsociado("+data.Asociados[i]['Hash']+");CalcularAsociadoItem();CalcularAsociadoItemG("+Hash+")'/>"
                        }
                        html += "<span style = 'display:none;' class = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"_real' id = 'AValorUnitarioInterno"+data.Asociados[i]['Hash']+"_real'>"+data.Asociados[i]['ValorUnitario']+"</span>"
                    html += "</td>"
                    
                    html += "<td class = 'TablaReportes_Cuerpo Subtotal"+data.Asociados[i]['Hash']+"' style = 'width:200px'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo' style = 'width:200px'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo' style = 'width:200px'></td>"
                    html += "<td class = 'TablaReportes_Cuerpo' >"
                        var N = "";
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            N = "disabled"
                        }else{
                            
                        }
                        html += "<select "+N+" class = 'form-control PptoCamposA'  id = 'AImpuestoItem"+data.Asociados[i]['Hash']+"' name = 'AImpuestoItem"+data.Asociados[i]['Hash']+"[]' >"
                            html += "<option VALUE = '0' selected>Seleccione</option>"
                            for(var x = 0; x < data.ImpuestosInternos.length;x++){
                                if( data.ImpuestosInternos[x]['Hash'] == data.Asociados[i]['IdImpuesto'] ){
                                    html += "<option value = '"+data.ImpuestosInternos[x]['Hash']+"' selected>"+data.ImpuestosInternos[x]['Tarifa']+"</option>"
                                }else{
                                    html += "<option value = '"+data.ImpuestosInternos[x]['Hash']+"'>"+data.ImpuestosInternos[x]['Tarifa']+"</option>"
                                }
                            }
                        html += "</select>"
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo'>"
                        if( data.Asociados[i]['IdOc'] != '0' || data.Asociados[i]['IdOp'] != '0' ){
                            html += "<input autocomplete = 'off' type = 'number' disabled class = 'form-control PptoCamposSmall PptoCamposA' id = 'AVolumenItem"+data.Asociados[i]['Hash']+"' name = 'AVolumenItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Volumen']+"' disabled />"
                        }else{
                            html += "<input autocomplete = 'off' type = 'number'  class = 'form-control PptoCamposSmall PptoCamposA' id = 'AVolumenItem"+data.Asociados[i]['Hash']+"' name = 'AVolumenItem"+data.Asociados[i]['Hash']+"[]' value = '"+data.Asociados[i]['Volumen']+"' onkeyup = 'CalcularAsociado("+data.Asociados[i]['Hash']+");CalcularAsociadoItem();CalcularAsociadoItemG("+Hash+")'/>"
                        }
                    html += "</td>"
                    html += "<td class = 'TablaReportes_Cuerpo TSubtotal"+data.Asociados[i]['Hash']+"' style = 'width:200px'></td>"
                html += "</tr>"
                //TotalAsociados += parseFloat(data.Anticipos[i]['TotalAnticipo']);
            }
            html += "<tr class = 'DetalleAsociados"+Hash+"'>"
                html += "<td class = 'TablaReportes_Total' colspan = '16'>Total</td>"
                html += "<td class = 'TablaReportes_Total SubTotalAsociados"+Hash+"'>"+HtmlValores_Doble(0)+"</td>"
                html += "<td class = 'TablaReportes_Total '></td>"
                html += "<td class = 'TablaReportes_Total '></td>"
                html += "<td class = 'TablaReportes_Total '></td>"
                html += "<td class = 'TablaReportes_Total TotalAsociados"+Hash+"'></td>"

            html += "</tr>"
            $(".DetalleAsociados"+Hash).remove()
            $(".AsociadosItem"+Hash).after(html)
            CalcularAsociadoItem();
            CalcularAsociadoItemG(Hash)
            if($(".AsociadosItem"+Hash).is(":visible")){
                $(".AsociadosItem"+Hash).hide()
            } else{
                $(".AsociadosItem"+Hash).show()
            }

        }
    });
}

function FormNuevoAnticipoN(Hash){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88x',
        data:{ Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0)
            ModalEdit2(1)
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Nuevo Anticipo Presupuesto # "+$(".HashP").text()+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Justificación:</label>"
                        html += "<textarea class = 'form-control' autocomplete = 'off' name = 'Justificacion' id = 'Justificacion' ></textarea>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Necesidad:</label>"
                        html += "<input class = 'form-control' type = 'date' autocomplete = 'off' name = 'FechaNecesidad' id = 'FechaNecesidad' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Legalización:</label>"
                        html += "<input class = 'form-control' type = 'date' autocomplete = 'off' name = 'FechaNecesidad' id = 'FechaNecesidad' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Anticipo:</label>"
                        html += "<select class = 'form-control' name = 'TipoAnticipo' id = 'TipoAnticipo' >"
                            html += "<option value = ''>Seleccione</option>"
                            for( var i = 0; i < data.ParTipoAnticipo.length; i++ ){
                                html += "<option value = '"+data.ParTipoAnticipo[i]['Id']+"'>"+data.ParTipoAnticipo[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Forma de Pago:</label>"
                        html += "<select class = 'form-control' name = 'FormaPago' id = 'FormPago' >"
                            html += "<option value = ''>Seleccione</option>"
                            for( var i = 0; i < data.ParFormaPagoAnticipo.length; i++ ){
                                html += "<option value = '"+data.ParFormaPagoAnticipo[i]['Id']+"'>"+data.ParFormaPagoAnticipo[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<hr>"
                html += "<div class = 'form-row'>";
                    html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '13' class = 'TituloTablasResumen'>Items</th>"
                            html += "<tr>"
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Sel.</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Grupo</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Item</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Descripción</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Días</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Cantidad</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Valor Unitario</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Subtotal</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Volumen</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Total<br>((Subtotal-Volumen)+Impuesto)</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Valor Solicitado</th>"
                            html += "<tr>"
                            for( var i = 0; i < data.Items.length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'></td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Items[i]['Grupo']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Items[i]['Item']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'><textarea disabled class = 'form-control'  style = 'width:300px;'>"+data.Items[i]['Descripcion_Interna']+"</textarea></td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Items[i]['Dias']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Items[i]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'><span class = 'ValUnitAnt ValUnitAnt"+data.Items[i]['Id']+"'></span>"+formatNumber.new(data.Items[i]['ValorUnitario'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'><span class = 'SubAnt SubAnt"+data.Items[i]['Id']+"'></span>"+formatNumber.new(data.Items[i]['ValorAntesImpuestos'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'><span class = 'SubVolAnt SubVolAnt"+data.Items[i]['Id']+"'></span>"+formatNumber.new(data.Items[i]['TotalVolumen'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'><span class = 'TAnt TAnt"+data.Items[i]['Id']+"'></span>"+formatNumber.new(data.Items[i]['TotalUnitario'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"
                                        html += "<input type = 'text' class = 'form-control Valor ValorFactura"+data.Items[i]['Id']+"' style = 'width:150px' id = 'ValorFactura"+data.Items[i]['Id']+"' value = '' onkeyup = 'FormatCampoNum( \"ValorFactura"+data.Items[i]['Id']+"\", \"ValorFactura"+data.Items[i]['Id']+"_real\");CalcularDatosLegalizacion()'/>"
                                        html += "<span style = 'display:none;' class = 'ValorFactura"+data.Items[i]['Id']+"_real' id = 'ValorFactura"+data.Items[i]['Id']+"_real'>0</span>"
                        
                //html += "<input autocomplete = 'off' type = 'text' name = 'ValorUnitarioInterno{{$Item->Hash}}[]' id = 'ValorUnitarioInterno{{$Item->Hash}}' value = '{{$Item->ValorUnitario}}'onkeyup = "FormatCampoNum('ValorUnitarioInterno{{$Item->Hash}}','ValorUnitarioInterno{{$Item->Hash}}_real');" class = 'PptoCamposSmall ValorUnitarioInterno{{$Item->Hash}} form-control' required />"
                                    html += "</td>"
                                html += "</tr>"
                            }
                    html += "</table>"
                html += "</div>";
                
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(1)

        }
    });
}

function FormNuevoAnticipo(Hash){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88',
        data:{ Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Anticipos Presupuesto # "+$(".HashP").text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<table>";
                            html += "<tr>"
                        if( data.PRODUCCION_PPTOS_ANTICIPOS_CREAR == 1 ){
                                html += "<td class = 'BotonesSuperiores'>"
                                    html += "<div class = 'BarraIconos'>";
                                        html += "<img src ='../images/datos_additem.png' class = 'OptionIcon'onclick = 'FormNuevoAnticipoN("+Hash+")' />";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'FormNuevoAnticipoN("+Hash+")' >Crear Nuevo Anticipo</span>";
                                    html += "</div>";
                                html += "</td>"
                        }
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '10' class = 'TituloTablasResumen'>Anticipos</th>"
                            html += "<tr>"
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>No. Anticipo</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Solicitud</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Hora Solicitud</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Solicitado Por</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Necesidad</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Legalización</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Estado</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Total</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Acciones</th>"
                            html += "<tr>"
                            var TotalAnticipos = 0;
                            for(var i = 0; i < data.Anticipos.length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                        html += "<a target = '_blank' href = '../288ffad72e6d2756a80a65fa98f3b4b5/"+data.Anticipos[i]['Hash']+"' >"
                                            html += ""+data.Anticipos[i]['Id']+""
                                        html += "</a>"
                                    html += "</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaCreacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Anticipos[i]['HoraCreacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['SolicitadoPor']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaNecesidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaLegalizacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['NEstado']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+HtmlValores_Doble(data.Anticipos[i]['TotalAnticipo'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"
                                        html += "<select class = 'form-control' onchange = 'OpcionesAnticiposPpto("+data.Anticipos[i]['Id']+")'>"
                                            html += "<option value = '0'>Seleccione</option>"
                                            html += "<option value = '1'>Legalizar</option>"
                                        html += "</select>"
                                    html += "</td>"
                                html += "</tr>"
                                TotalAnticipos += parseFloat(data.Anticipos[i]['TotalAnticipo']);
                            }
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_Total' colspan = '8'>Total</td>"
                                html += "<td class = 'TablaReportes_Total'>"+HtmlValores_Doble(TotalAnticipos)+"</td>"
                                
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(1)

        }
    });
}

function FormNuevoLegalizacionItem(HashAnticipo,leg,ver){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88ex',
        data:{ Hash:HashAnticipo,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            GuardarLegalizaciones(leg,ver)
            GenerarTablaLegalizacion(HashAnticipo)
            
        }
    });
}

function GuardarLegalizaciones(leg,ver){
    var DatosLegalizacion = [];
    $(".HashLG").each(function(){
        var Id = $(this).text();
        DatosLegalizacion.push({
            'Id': Id,
            'NumFactura':$(".L"+Id+" > .NumFactura").val(),
            'Concepto':$(".L"+Id+" > .Concepto").val(),
            'Valor':$(".L"+Id+" > .ValorFactura"+Id+"_real").text(),
            'Impuestos':$(".L"+Id+" > .ValorImpuesto"+Id+"_real").text(),
            'Retencion':$(".L"+Id+" > .ValorRetencion"+Id+"_real").text(),
            'FechaFactura':$(".L"+Id+" > .FechaFactura").val(),
            'Nit':$(".L"+Id+" > .Nit").val(),
            'beneficiario':$(".L"+Id+" > .beneficiario").val(),
            'direccion':$(".L"+Id+" > .direccion").val(),
            'telefono':$(".L"+Id+" > .telefono").val(),
            'ciudad':$(".L"+Id+" > .ciudad").val(),
        })
    })
    var formData = new FormData();
    formData.append("Legalizaciones",  JSON.stringify(DatosLegalizacion) );
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: '../6d23f08934bde355af6b8995b4c92e88eg',
        success:function(data){
            //alert(data.mensaje)
            
        }
    })
}

function EliminarItemLegalizacion(HasLeg,Anticipo,leg,ver){
    if( confirm("¿Está seguro(a) de Eliminar este Item de la Legalización?") ){
        $.ajax({
            type:'POST',
            url:'../6d23f08934bde355af6b8995b4c92e88el',
            data:{ Hash:HasLeg,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                GuardarLegalizaciones(leg,ver)
                GenerarTablaLegalizacion(Anticipo)
            }
        })
    }
}

function CalcularDatosLegalizacion(){
    var Valor = 0;
    var Impuesto = 0;
    var Retencion = 0;
    var Global = 0;
    $(".HashLG").each(function(){
        var Id = $(this).text();
        
        
        Valor += parseFloat($(".L"+Id+" > .ValorFactura"+Id+"_real").text())
        Impuesto += parseFloat($(".L"+Id+" > .ValorImpuesto"+Id+"_real").text())
        Retencion += parseFloat($(".L"+Id+" > .ValorRetencion"+Id+"_real").text())
        Global += parseFloat($(".L"+Id+" > .ValorFactura"+Id+"_real").text()) + parseFloat($(".L"+Id+" > .ValorImpuesto"+Id+"_real").text()) + parseFloat($(".L"+Id+" > .ValorRetencion"+Id+"_real").text())
        
        var _Valor = parseFloat($(".L"+Id+" > .ValorFactura"+Id+"_real").text()) + parseFloat($(".L"+Id+" > .ValorImpuesto"+Id+"_real").text()) + parseFloat($(".L"+Id+" > .ValorRetencion"+Id+"_real").text());
        $(".TotalLeg"+Id).html( HtmlValores_Doble(_Valor) )
    })
    $(".SumTotalLeg").html( HtmlValores_Doble(Valor) )
    $(".SumTotalLegImpuesto").html( HtmlValores_Doble(Impuesto) )
    $(".SumTotalLegRetencion").html( HtmlValores_Doble(Retencion) )
    $(".SumTotalLegGlobal").html( HtmlValores_Doble(Global) )
}

function GenPdfLegalizacion(Leg,Ver){
    alert("Tenga en cuenta que las fechas de las facturas deben estar diligenciadas, de lo contrario el PDF del documento no se generará !")
    window.open('../2998ffad72e6d2756a80a65fa98f3b4b5/'+Leg, '_blank');
}

function GenerarTablaLegalizacion(HashAnticipo){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88e',
        data:{ Hash:HashAnticipo,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<div class = 'BarraIconos'>";
                                    html += "<img src ='../images/datos_additem.png' class = 'OptionIcon'onclick = 'FormNuevoLegalizacionItem("+HashAnticipo+","+data.Leg+","+data.Ver+")' />";
                                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'FormNuevoLegalizacionItem("+HashAnticipo+","+data.Leg+","+data.Ver+")' >Crear Nuevo Item</span>";
                                html += "</div>";
                            html += "</td>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<div class = 'BarraIconos'>";
                                    html += "<img src ='../images/guardar.png' class = 'OptionIcon'onclick = 'GuardarLegalizaciones("+data.Leg+","+data.Ver+")' />";
                                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'GuardarLegalizaciones("+data.Leg+","+data.Ver+")' >Guardar</span>";
                                html += "</div>";
                            html += "</td>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<div class = 'BarraIconos'>";
                                    html += "<img src ='../images/Bpdf.png' class = 'OptionIcon'onclick = 'GenPdfLegalizacion("+data.Leg+","+data.Ver+")' />";
                                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'GenPdfLegalizacion("+data.Leg+","+data.Ver+")' >Generar PDF</span>";
                                html += "</div>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"
            html += "</div>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<th colspan = '15' class = 'TituloTablasResumen'>Legalización # "+data.Legalizaciones[0]['IdLegalizacion']+"</th>"
                html += "<tr>"
                html += "<tr>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'></th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Factura</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Concepto</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Valor</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Iva</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Retención</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Total</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Factura</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Nit</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Beneficiario</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Dirección</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Teléfono</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Ciudad</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Adjunto</th>"
                html += "<tr>"
                var Valor = 0;
                var Iva = 0;
                var Retencion = 0;
                for(var i = 0; i < data.Legalizaciones.length; i++){
                    html += "<tr class = 'ItemsLegalizaciones'>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"
                            html += "<img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemLegalizacion("+data.Legalizaciones[i]['Hash']+","+HashAnticipo+","+data.Leg+","+data.Ver+")' />";
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+(i+1)+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"'>"
                            html += "<input type = 'text' class = 'form-control NumFactura' style = 'width:150px' value = '"+data.Legalizaciones[i]['NumeroFactura']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control Concepto' style = 'width:300px' value = '"+data.Legalizaciones[i]['Concepto']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control Valor ValorFactura"+data.Legalizaciones[i]['Hash']+"' style = 'width:150px' id = 'ValorFactura"+data.Legalizaciones[i]['Hash']+"' value = '"+formatNumber.new(data.Legalizaciones[i]['Valor'])+"' onkeyup = 'FormatCampoNum( \"ValorFactura"+data.Legalizaciones[i]['Hash']+"\", \"ValorFactura"+data.Legalizaciones[i]['Hash']+"_real\");CalcularDatosLegalizacion()'/>"
                            html += "<span style = 'display:none;' class = 'ValorFactura"+data.Legalizaciones[i]['Hash']+"_real' id = 'ValorFactura"+data.Legalizaciones[i]['Hash']+"_real'>"+data.Legalizaciones[i]['Valor']+"</span>"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control Impuestos ValorImpuesto"+data.Legalizaciones[i]['Hash']+"' style = 'width:150px' value = '"+formatNumber.new(data.Legalizaciones[i]['Impuestos'])+"' id = 'ValorImpuesto"+data.Legalizaciones[i]['Hash']+"' onkeyup = 'FormatCampoNum( \"ValorImpuesto"+data.Legalizaciones[i]['Hash']+"\", \"ValorImpuesto"+data.Legalizaciones[i]['Hash']+"_real\");CalcularDatosLegalizacion()'/>"
                            html += "<span style = 'display:none;' class = 'ValorImpuesto"+data.Legalizaciones[i]['Hash']+"_real' id = 'ValorImpuesto"+data.Legalizaciones[i]['Hash']+"_real'>"+data.Legalizaciones[i]['Impuestos']+"</span>"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control retencion ValorRetencion"+data.Legalizaciones[i]['Hash']+"' style = 'width:150px' value = '"+formatNumber.new(data.Legalizaciones[i]['retencion'])+"' id = 'ValorRetencion"+data.Legalizaciones[i]['Hash']+"' onkeyup = 'FormatCampoNum( \"ValorRetencion"+data.Legalizaciones[i]['Hash']+"\", \"ValorRetencion"+data.Legalizaciones[i]['Hash']+"_real\");CalcularDatosLegalizacion()'/>"
                            html += "<span style = 'display:none;' class = 'ValorRetencion"+data.Legalizaciones[i]['Hash']+"_real' id = 'ValorRetencion"+data.Legalizaciones[i]['Hash']+"_real'>"+data.Legalizaciones[i]['retencion']+"</span>"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo TotalLeg"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'date' class = 'form-control FechaFactura' style = 'width:180px' value = '"+data.Legalizaciones[i]['FechaFactura']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control Nit' style = 'width:100px' value = '"+data.Legalizaciones[i]['Nit']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control beneficiario' style = 'width:300px' value = '"+data.Legalizaciones[i]['beneficiario']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control direccion' style = 'width:300px' value = '"+data.Legalizaciones[i]['direccion']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control telefono' style = 'width:150px' value = '"+data.Legalizaciones[i]['telefono']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"' nowrap>"
                            html += "<input type = 'text' class = 'form-control ciudad' style = 'width:100px' value = '"+data.Legalizaciones[i]['ciudad']+"' />"
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo L"+data.Legalizaciones[i]['Hash']+"'  nowrap>"
                            html += "<div class='custom-file' style = 'width:300px'>"
                                html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'></label>"
                            html += "</div>";
                            //html += "<input type = 'text' class = 'form-control adjunto' style = 'width:100%' value = '"+data.Legalizaciones[i]['ciudad']+"' />"
                        html += "</td>"
                        html += "<td class = 'HidenInformation ' nowrap>"
                            html += "<span class = 'HashLG'>"+data.Legalizaciones[i]['Hash']+"</span>"
                        html += "</td>"
                    html += "</tr>"
                    //TotalAnticipos += parseFloat(data.Anticipos[i]['TotalAnticipo']);
                }
                html += "<tr>"
                    html += "<td class = 'TituloTablasResumen' colspan = '4'>Total</td>"
                    html += "<td class = 'TituloTablasResumen SumTotalLeg' >0</td>"
                    html += "<td class = 'TituloTablasResumen SumTotalLegImpuesto' >0</td>"
                    html += "<td class = 'TituloTablasResumen SumTotalLegRetencion' >0</td>"
                    html += "<td class = 'TituloTablasResumen SumTotalLegGlobal' >0</td>"
                html += "</tr>"
            html += "</table>"
            $(".ContenedorLegalizacion").html(html).css({'overflow-x':'scroll'})
            CalcularDatosLegalizacion()
        }
    });
}

function OpcionesAnticiposPpto(HashAnticipo){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88e',
        data:{ Hash:HashAnticipo,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0)
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Legalización Anticipo # "+data.Legalizaciones[0]['IdAnticipo']+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<div class = 'ContenedorLegalizacion' style = 'width:100%;'></div>"
                        
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ModalEdit2(1)
            ResizeModal(1)
            GenerarTablaLegalizacion(HashAnticipo)

        }
    });
}

function AnticiposPpto(Hash){
    $.ajax({
        type:'POST',
        url:'../6d23f08934bde355af6b8995b4c92e88',
        data:{ Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Anticipos Presupuesto # "+$(".HashP").text()+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<table>";
                            html += "<tr>"
                        if( data.PRODUCCION_PPTOS_ANTICIPOS_CREAR == 1 ){
                                html += "<td class = 'BotonesSuperiores'>"
                                    html += "<div class = 'BarraIconos'>";
                                        html += "<img src ='../images/datos_additem.png' class = 'OptionIcon'onclick = 'FormNuevoAnticipoN("+Hash+")' />";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'FormNuevoAnticipoN("+Hash+")' >Crear Nuevo Anticipo</span>";
                                    html += "</div>";
                                html += "</td>"
                        }
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '10' class = 'TituloTablasResumen'>Anticipos</th>"
                            html += "<tr>"
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>No. Anticipo</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Solicitud</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Hora Solicitud</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Solicitado Por</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Necesidad</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Legalización</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Estado</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Total</th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal'>Acciones</th>"
                            html += "<tr>"
                            var TotalAnticipos = 0;
                            for(var i = 0; i < data.Anticipos.length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                        html += "<a target = '_blank' href = '../288ffad72e6d2756a80a65fa98f3b4b5/"+data.Anticipos[i]['Hash']+"' >"
                                            html += ""+data.Anticipos[i]['Id']+""
                                        html += "</a>"
                                    html += "</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaCreacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Anticipos[i]['HoraCreacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['SolicitadoPor']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaNecesidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['FechaLegalizacion']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Anticipos[i]['NEstado']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+HtmlValores_Doble(data.Anticipos[i]['TotalAnticipo'])+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"
                                        html += "<select class = 'form-control' onchange = 'OpcionesAnticiposPpto("+data.Anticipos[i]['Hash']+")'>"
                                            html += "<option value = '0' selected>Seleccione</option>"
                                            html += "<option value = '1' >Legalización</option>"
                                        html += "</select>"
                                    html += "</td>"
                                html += "</tr>"
                                TotalAnticipos += parseFloat(data.Anticipos[i]['TotalAnticipo']);
                            }
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_Total' colspan = '8'>Total</td>"
                                html += "<td class = 'TablaReportes_Total'>"+HtmlValores_Doble(TotalAnticipos)+"</td>"
                                
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(1)

        }
    });
}

function ViewCabeceraPpto(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'dcf59e06d5eee130c21d79c6b56aefb0Ex',
        data:{ Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table class = 'CabeceraVentanas'width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2 TituloBuscador'>Editar Presupuesto # "+data.Ppto[0]['Id']+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<form class='form-signin FormNuevoPresupuesto'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>"
                        html += "<select disabled class = 'form-control' name = 'IdEmpresa' id = 'IdEmpresa' onchange = 'Ppto_ListarUnidadesEmpresaUsuario()'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Empresa.length; i++){
                                if( data.Ppto[0]['IdEmpresa'] == data.Empresa[i]['Hash'] ){
                                    html += "<option selected value = '"+data.Empresa[i]['Hash']+"'>"+data.Empresa[i]['NombreComercial']+"</option>"
                                }
                                
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad:</label>"
                        html += "<select class = 'form-control' name = 'IdUnidad' id = 'IdUnidad' onchange = 'Ppto_ListarClientesUsuarioEmpresaUnidad()'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cliente:</label>"
                        html += "<select class = 'form-control' name = 'IdCliente' id = 'IdCliente' >"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Proyecto / OT:</label>"
                        html += "<select class = 'form-control' name = 'IdProyecto' id = 'IdProyecto'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo Presupuesto:</label>"
                        html += "<select class = 'form-control' name = 'IdTipoPpto' id = 'IdTipoPpto'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Tipo.length; i++){
                                if( data.Tipo[i]['Hash'] == data.Ppto[0]['IdTipoPpto'] ){
                                    html += "<option selected value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                                }else{
                                    html += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                                }
                                
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Clasificación:</label>"
                        html += "<select class = 'form-control' name = 'IdClasificacion' id = 'IdClasificacion'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Clasificacion.length; i++){
                                if( data.Clasificacion[i]['Hash'] == data.Ppto[0]['IdClasificacion'] ){
                                    html += "<option selected value = '"+data.Clasificacion[i]['Hash']+"'>"+data.Clasificacion[i]['Nombre']+"</option>"
                                }else{
                                    html += "<option value = '"+data.Clasificacion[i]['Hash']+"'>"+data.Clasificacion[i]['Nombre']+"</option>"
                                }
                                
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Comisión:</label>"
                        html += "<select class = 'form-control' name = 'IdComision' id = 'IdComision'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Referencia:</label>"
                        html += "<input class = 'form-control' value = '"+data.Ppto[0]['Referencia']+"' autocomplete = 'off' type = 'text' name = 'ReferenciaPpto' id = 'ReferenciaPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Vigente Desde:</label>"
                        html += "<input class = 'form-control' type = 'date' name = 'VigenciaInicial' value = '"+data.Ppto[0]['VigenciaInicial']+"' id = 'VigenciaInicial' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Vigente Hasta:</label>"
                        html += "<input class = 'form-control' type = 'date' name = 'VigenciaFinal' value = '"+data.Ppto[0]['VigenciaFinal']+"' id = 'VigenciaFinal' />"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Lugar de Ejecución:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' value = '"+data.Ppto[0]['Lugar']+"' name = 'LugarPpto' id = 'LugarPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'>Dirigido a:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' value = '"+data.Ppto[0]['Dirigido']+"' name = 'DirigidoAPpto' id = 'DirigidoAPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'>Aprobación Cliente:</label>"
                        html += "<input class = 'form-control' type = 'text' name = 'AprobacionCliente' id = 'AprobacionCliente' value = '"+data.Ppto[0]['Aprobacion_Cliente']+"'/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nota Legal:</label>"
                        html += "<textarea name = 'NotaLegalEmpresaPpto' id = 'NotaLegalEmpresaPpto' class = 'form-control'>"+data.Ppto[0]['NotaLegal']+"</textarea>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'>Nota Adicional:</label>"
                        html += "<textarea name = 'NotaAdicionalPpto' id = 'NotaAdicionalPpto' class = 'form-control'>"+data.Ppto[0]['NotaAdicional']+"</textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPresupuesto("+Hash+")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            
            ResizeModal(1)
            ModalEdit(1)
            
            Ppto_ListarUnidadesEmpresaUsuario(data.Ppto[0]['IdUnidad'])
            
            
            Ppto_ListarClientesUsuarioEmpresaUnidad(data.Ppto[0]['IdCliente'],data.Ppto[0]['IdUnidad'])
            $("#IdCliente").attr('disabled','disabled');
            $("#IdUnidad").attr('disabled','disabled');
            
            
            Presupuesto_ListarTiposComision(data.Ppto[0]['IdEmpresa'],data.Ppto[0]['IdUnidad'],data.Ppto[0]['IdCliente'],data.Ppto[0]['TipoComision'],data.Ppto[0]['IdProyecto'])
            $FormValidate = $(".FormNuevoPresupuesto").validate({
                rules: {
                    IdEmpresa : {
                        required: true,
                        minlength:1
                    },
                    IdUnidad : {
                        required: true,
                        minlength:1
                    },
                    IdCliente : {
                        required: true,
                        minlength:1
                    },
                    IdProyecto : {
                        required: true,
                        minlength:1
                    },
                    IdTipoPpto : {
                        required: true,
                        minlength:1
                    },
                    IdClasificacion : {
                        required: true,
                        minlength:1
                    },
                    IdComision : {
                        required: true,
                        minlength:1
                    },
                    ReferenciaPpto : {
                        required: true,
                        minlength:3
                    },
                    VigenciaInicial : {
                        required: true,
                        minlength:1
                    },
                    VigenciaFinal : {
                        required: true,
                        minlength:1
                    },
                    LugarPpto : {
                        required: true,
                        minlength:1
                    },
                    NotaLegalEmpresaPpto : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}
function GuardarEditarPresupuesto(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("IdEmpresa", $("#IdEmpresa").val());
        formData.append("IdUnidad", $("#IdUnidad").val());
        formData.append("IdCliente", $("#IdCliente").val());
        formData.append("IdProyecto", $("#IdProyecto").val());
        formData.append("IdTipoPpto", $("#IdTipoPpto").val());
        formData.append("IdClasificacion", $("#IdClasificacion").val());
        formData.append("IdComision", $("#IdComision").val());
        formData.append("ReferenciaPpto", $("#ReferenciaPpto").val());
        formData.append("VigenciaInicial", $("#VigenciaInicial").val());
        formData.append("VigenciaFinal", $("#VigenciaFinal").val());
        formData.append("LugarPpto", $("#LugarPpto").val());
        formData.append("NotaLegalEmpresaPpto", $("#NotaLegalEmpresaPpto").val());
        formData.append("NotaAdicionalPpto", $("#NotaAdicionalPpto").val());
        formData.append("AprobacionCliente", $("#AprobacionCliente").val());
        formData.append("DirigidoAPpto", $("#DirigidoAPpto").val());
        formData.append("Hash", Hash);

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:'../4e9cd5ee73665675d448c7c9507b535ed',
            success:function(data){
                
                //BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3)
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha Modificado el Presupuesto # "+data.Ppto,"success",3);
                    ModalEdit(0);
                    location.reload()
                }else{
                    AlertaMensajes("No se creó el Presupuesto","error",3);
                }
            }
        })
    }else{
        AlertaMensajes("No se ha diligenciado todos los campos","error",3);
    }
}


function CrearGrupoPpto(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'dcf59e06d5eee130c21d79c6b56aefb0',
        data:{ _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Crear Grupo Presupuesto"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormNuevoGrupoPpto'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Grupo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'GrupoName' id = 'GrupoName'>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarGrupoPpto("+Hash+")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(0.4)

            $FormValidate = $(".FormNuevoGrupoPpto").validate({
                rules: {
                    GrupoName : {
                        required: true,
                        minlength:1
                    },
                    
                }
            });
        }
    });
}

function InhabilitarComisionClienteItem(Hash){
    $.ajax({
            type:'POST',
            url:UrlGeneral+'6b8e7415ee2aa47f1141522279248806',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Hash2:$(".HashP").text()
            },
            success:function(data){
                if( data.Info == 1 ){
                    AlertaMensajes("Item Modificado con éxito","success",3);
                    var html = ""
                    html += "<span class = 'HidenInformation ComisionableClienteItem"+Hash+"'>"+data.Estado+"</span>"
                    if( data.Estado == 1 ){
                        html += "<input type='radio' class = 'RadioSize' onclick = 'InhabilitarComisionClienteItem("+Hash+")' checked />"
                    }else{
                        html += "<input type='radio' class = 'RadioSize' onclick = 'InhabilitarComisionClienteItem("+Hash+")'  />"
                    }
                    html += "<span class = 'HidenInformation VC VC"+Hash+"'>"+data.Estado+"</span>"
                    
                    $(".ComisionCliente"+Hash).html(html)
                    CalcularAllPpto($(".HashP").text())
                }else{
                    AlertaMensajes("No se Modificar el Item","error",3);
                    
                }
            }
        });
}

function EliminarGrupoPpto(Hash,Hash2){
    if (window.confirm("¿Está complemente seguro(a) de Eliminar este Grupo del Presupuesto ?")) {
        $.ajax({
            type:'POST',
            url:UrlGeneral+'dec2e62f2038716413a6ed243ca2bd19',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Hash2:Hash2
            },
            success:function(data){
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha Eliminado el Grupo "+$(".NameGrup"+Hash2).text()+" del Presupuesto","success",3);
                    $(".Grupo"+Hash2).remove()
                    CalcularAllPpto($(".HashP").text())
                }else{
                    AlertaMensajes("No se Eliminado el Grupo "+$(".NameGrup"+Hash2).text()+ " del Presupuesto","error",3);
                    
                }
            }
        });
    }
}

function EliminarItemGrupoPpto(Hash,Hash2){
    if (window.confirm("¿Está complemente seguro(a) de Eliminar este Item del Grupo ?")) {
        $.ajax({
            type:'POST',
            url:UrlGeneral+'6c1ac7baaeb177097d996643f0740817',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Hash2:Hash2
            },
            success:function(data){
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha Eliminado el Item del Grupo","success",3);
                    $(".ItemI"+Hash2).remove()
                    CalcularAllPpto($(".HashP").text())
                }else{
                    AlertaMensajes("No se Eliminado el Item del Grupo","error",3);
                    
                }
            }
        });
    }
}

function CalcularAllPpto(Hash){
    /*
    Total_RentabilidadBruta = 0;
    Total_Porcentaje_RentabilidadBruta = 0;
    Total_Rentabilidad_Bruta_Comision = 0;
    Total_Porcentaje_Bruta_Comision = 0;
    Total_RentabilidadNeta = 0;
    Total_Porcentaje_Rentabilidad_Neta = 0;
    Total_CostoInternoPpto = 0;
    Total_CostoExternoPpto = 0;
    TotalResumenImpuestos = 0;
    Total_Actividad = 0;
    
    Total_ComsionPorDescuentos = 0;
    Total_ValorComisional = 0;
    Total_ValorNoComisional = 0;*/
    /*
    $(".GruposIds").each(function(){
        var Hash2 = $(this).text()
        CalcularCostoGrupoPpto(Hash,Hash2)
    })*/
    
    CalcularComisionGeneral()
    
    var ValorComision = 0;
    AComisionesManuales = [];
    $(".HashIdComision").each(function(){
        var IdX = $(this).text()
        var xtemp = $("#ComisionItem"+IdX).val()
        var contadortemp = 0;
        if( xtemp != 0 ){
            for(var xp = 0; xp < AComisionesManuales.length; xp++){
                if( parseFloat(xtemp) == AComisionesManuales[xp]['Comision'] ){
                    contadortemp++;
                }
            }
            if(contadortemp == 0 ){
                //AComisionesManuales.push({'Comision':xtemp,'ValorComision':ValorComision})
                AComisionesManuales.push({'Comision':xtemp,'ValorComision':ValorComision})
            }
        }
        
    })
    for(var xp = 0; xp < AComisionesManuales.length; xp++){
        ValorComision = 0
        $(".HashIdComision").each(function(){
            var IdX = $(this).text()
            var xtemp = $("#ComisionItem"+IdX).val()
            if( parseFloat(xtemp) == AComisionesManuales[xp]['Comision'] ){
                ValorComision += (parseFloat($("#DiasItem"+IdX).val()) * parseFloat($("#CantidadItem"+IdX).val()) * parseFloat($("#ValorUnitarioExterno"+IdX+"_real").text()))*( parseFloat(AComisionesManuales[xp]['Comision']) /100)
            }
        })
        AComisionesManuales[xp]['ValorComision'] = ValorComision
    }
    
    Html_ComisionManual = "";
    var xtempComisionAgencia = 0;
    
    
    
    //Total Costos de Ejecución.
    Total_CostosEjecucion = Total_ValorComisional + Total_ValorNoComisional;

    //Total Imprevistos
    TotalImprevistos = (PorcentajeImprevistos/100) * Total_CostosEjecucion;

    //Gastos Administrativos
    TotalGastosAdministrativos = (PorcentajeGastosAdministrativos/100) * Total_CostosEjecucion;

    //Comision Agencia:
    if( AComisionesManuales.length > 0 ){
        Total_ComisionAgencia = xtempComisionAgencia;
    }else{
        Total_ComisionAgencia = (PorcentajeGeneralComision/100) * Total_ValorComisional;
    }
    if( AComisionesManuales.length > 0 ){
        for(var xp = 0; xp < AComisionesManuales.length; xp++){
            Html_ComisionManual += "<tr>"
                Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Comisión Agencia (Manual)</td>"
                Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlPorcentajes_Doble(AComisionesManuales[xp]['Comision'])+"</td>"
                Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlValores_Doble(AComisionesManuales[xp]['ValorComision'])+"</td>"
            Html_ComisionManual += "</tr>"
            xtempComisionAgencia += AComisionesManuales[xp]['ValorComision']
        }
        Html_ComisionManual += "<tr>"
                Html_ComisionManual += "<td class = 'subtitulos_principales' style = 'text-align:left;padding:5px;' colspan = '2'>Total Comisión Agencia (Manual)</td>"
                //Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlPorcentajes_Doble(AComisionesManuales[xp]['Comision'])+"</td>"
                Html_ComisionManual += "<td class = 'subtitulos_principales' style = 'padding:5px;'>"+HtmlValores_Doble(xtempComisionAgencia)+"</td>"
            Html_ComisionManual += "</tr>"
    }else{
        Html_ComisionManual += "<tr>"
            Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'text-align:left;padding:5px;'>Comisión Agencia</td>"
            Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlPorcentajes_Doble(PorcentajeGeneralComision)+"</td>"
            Html_ComisionManual += "<td class = 'td_cuerpo_table' style = 'padding:5px;'>"+HtmlValores_Doble(Total_ComisionAgencia)+"</td>"
        Html_ComisionManual += "</tr>"
    }
    //Total_ComisionAgencia += ComisionManual;

    //Total Actividad 
    Total_Actividad = Total_CostosEjecucion + Total_ComisionAgencia + TotalGastosAdministrativos + TotalImprevistos;

    //Total Comisión por Descuentos 
    GranTotal_ComisionPorDescuentos = Total_CostosEjecucion - Total_ComsionPorDescuentos;

    //Total Utilidad Comercial
    Total_UtilidadComercial = Total_Actividad - Total_ComsionPorDescuentos;

    
    //Volumen
    PorcentajeVolumenTotal = (GranTotal_ComisionPorDescuentos / Total_CostosEjecucion)*100;


    for(var t = 0; t < DataPptos.length; t++){
        console.log(t+ "+")
        if( DataPptos[t]['Tipo'] == "PORCENTAJE" ){
            DataPptos[t]['ValorOperado'] = (parseFloat(DataPptos[t]['Valor'])/100) * Total_Actividad;
            TotalResumenImpuestos += (parseFloat(DataPptos[t]['Valor'])/100) * Total_Actividad;
        }else if( DataPptos[t]['Tipo'] == "VALOR" ){
            TotalResumenImpuestos += (parseFloat(DataPptos[t]['Valor'])) * Total_Actividad;
        }
        
    }
    NumeroProveedores = parseFloat( NumeroProveedores );
    for(var t = 0; t < DataPptosResumen.length; t++){
        //NumeroProveedores
        if( DataPptosResumen[t]['Tipo'] == "PORCENTAJE" ){
            if( DataPptosResumen[t]['Concepto'] == 'Anticipos Intereses Bancarios' ){
                
                //DataPptosResumen[t]['ValorOperado'] = (parseFloat(DataPptosResumen[t]['Valor'])/100) * NumeroProveedores;
                //TotalResumenImpuestos += (parseFloat(DataPptosResumen[t]['Valor'])/100) * NumeroProveedores;
            }else{
                TotalResumenImpuestos += (Total_Actividad*(parseFloat(DataPptosResumen[t]['Valor'])/100))
            }
        }else if( DataPptosResumen[t]['Tipo'] == "VALOR" ){
            if( DataPptosResumen[t]['Concepto'] == 'Cheques y Transferencias' ){
                DataPptosResumen[t]['ValorOperado'] = (parseFloat(DataPptosResumen[t]['Valor'])) * NumeroProveedores;
                TotalResumenImpuestos += (parseFloat(DataPptosResumen[t]['Valor'])) * NumeroProveedores;
            }else{
                TotalResumenImpuestos += Math.round(Total_Actividad*(parseFloat(DataPptosResumen[t]['Valor'])))
            }
        }
        
    }
    
    TotalImpuestosParam = TotalResumenImpuestos;
    
    TotalImpuestosAdicionales = TotalPptoAntesImpuestos * ( PorcentajeImprevistos / 100 );
    TotalResumenImpuestos += TotalImpuestosAdicionales;
    
    TotalFactoring = Total_Actividad * ( PorcentajeFactoring / 100 );
    TotalResumenImpuestos += TotalFactoring;
    
    TotalInteresesBancarios = Total_Actividad * ( PorcentajeInteresesBancarios / 100 );
    TotalResumenImpuestos += TotalInteresesBancarios;
    
    TotalInterecesTerceros = Total_Actividad * ( PorcentajeInteresesTerceros / 100 );
    TotalResumenImpuestos += TotalInterecesTerceros;
    
    UtilidadFinal = Total_Actividad - TotalResumenImpuestos - Total_ComsionPorDescuentos;
    if( Total_Actividad < 1 || UtilidadFinal  < 1 )
    {
        PorcentajeUtilidadFinal = 0;
    }else{
        PorcentajeUtilidadFinal = ( UtilidadFinal / Total_Actividad ) * 100;
    }
    
    
    if( PorcentajeUtilidadFinal > MinRentabilidad ){
        $(".Por_RentabilidadTotal").html( HtmlPorcentajes_Doble(PorcentajeUtilidadFinal.toFixed(2)) ).css({
            'background-color':'rgb(96 195 96)',
            'color':'white',
            'font-weight':'bold'
        })
    }else{
        $(".Por_RentabilidadTotal").html( HtmlPorcentajes_Doble(PorcentajeUtilidadFinal.toFixed(2)) ).css({
            'background-color':'#f9a2a2',
            'color':'white',
            'font-weight':'bold'
        })
    }
}

function CalcularComisionGeneral(){
    
    var ValorComision = 0;
    if( TipoComsion == 'Multiplicada' ){
        ValorComision = Total_CostoExternoPpto + Total_CostoExternoPpto * PorcentajeComision;
    }else if( TipoComsion == 'Dividida' ){
        ValorComision = Total_CostoExternoPpto + ( Total_CostoExternoPpto * PorcentajeComision ) + (( Total_CostoExternoPpto * PorcentajeComision ) *  PorcentajeComision );
    }else{
        ValorComision = Total_CostoExternoPpto;
    }
    
    //$(".Por_RentabilidadBrutaGeneralCom").html(HtmlValores_Doble(ValorComision))
}

function FormatValoresPpto(){
    $(".GruposIds").each(function(){
        var Hash2 = $(this).text()
            $(".IdsItesm"+Hash2).each(function(){
            var Id = $(this).text();
            var ValorUnitarioItem = $(".ValorUnitarioInterno"+Id+"").val()
            var ValorUnitarioItemCliente = $(".ValorUnitarioExterno"+Id+"").val()
            $(".ValorUnitarioInterno"+Id+"").val( formatNumber.new(ValorUnitarioItem) )
            $(".ValorUnitarioExterno"+Id+"").val( formatNumber.new(ValorUnitarioItemCliente) )
        })
    })
    
}

function CalcularCostoGrupoPpto(Hash,Hash2){
    var SubTotal = 0;
    var Grupo_Volumen = 0;
    var Grupo_TotalCliente = 0;
    var Grupo_SubtotalCliente = 0;
    var Grupo_TotalCliente = 0;
    var Grupo_ValorComision = 0;
    var Grupo_RentabilidadParcial = 0;
    
    var TempComisionManual = 0;
    //ComisionManual
    Recorridos = 0;
    
    if( $(".IdsItesm"+Hash2).length > 0 ){
        $(".IdsItesm"+Hash2).each(function(){
            var Id = $(this).text();
            var Porcentaje_RentabilidadItem = 0;
            var Valor_RentabilidadItem = 0;

            var Dias = $("#DiasItem"+Id).val();
            
            if( Dias.length == '' ){
                Dias = 0;
            }
            
            var Cantidad = $("#CantidadItem"+Id).val();
            if( Cantidad.length == '' ){
                Cantidad = 0;
            }
            
            var ValorUnitarioItem = $(".ValorUnitarioInterno"+Id+"_real").text()
            if( ValorUnitarioItem.length == '' ){
                ValorUnitarioItem = 0;
            }

            var Volumen = $("#VolumenItem"+Id).val();
            if( Volumen.length == '' ){
                Volumen = 0;
            }

            var ValorUnitarioExterno = $(".ValorUnitarioExterno"+Id+"_real").text();
            if( ValorUnitarioExterno.length == '' ){
                ValorUnitarioExterno = 0;
            }

            var ImpuestoExternoItem = $("#ImpuestoExternoItem"+Id).val().split('-');

            var PorcentajeComision = $("#ComisionItem"+Id).val();
            if( PorcentajeComision.length == '' ){
                PorcentajeComision = 0;
            }
            


            var SubTotalItem = Math.round( parseFloat(Dias) * parseFloat(Cantidad) *parseFloat(ValorUnitarioItem) );
            
            SubTotal += SubTotalItem;

            var VolumenItem = 0;
            if( Volumen == 0 ){
                Total_ComsionPorDescuentos += SubTotalItem;
            }else{
                VolumenItem = SubTotalItem - (SubTotalItem*(Volumen/100));
                Total_ComsionPorDescuentos += SubTotalItem - (SubTotalItem*(Volumen/100));
            }
            

            Grupo_Volumen += SubTotalItem - VolumenItem;

            var TotalItemExterno = Math.round( parseFloat(Dias) * parseFloat(Cantidad) *parseFloat(ValorUnitarioExterno) );
            
            
            if( $(".VC"+Id).text() == 1 ){
                Total_ValorComisional += TotalItemExterno;
            }else if( $(".VC"+Id).text() == 0 ){
                Total_ValorNoComisional += TotalItemExterno;
            }

            var ValorComision = 0;
            if( PorcentajeComision > 0 ){
                ValorComision = Math.round( (TotalItemExterno*(PorcentajeComision/100)) );
                TempComisionManual += ValorComision
            }

            var TotalExternoClienteImpuesto = 0;
            //console.log(ImpuestoExternoItem[1])
            if( ImpuestoExternoItem[2] == 'IP' ){
                TotalExternoClienteImpuesto = Math.round( TotalItemExterno + (TotalItemExterno*(ImpuestoExternoItem[1]/100)) );
            }else {
                TotalExternoClienteImpuesto = Math.round( TotalItemExterno - (TotalItemExterno*(ImpuestoExternoItem[1]/100)) );
            }
            var TotalItemInterno = SubTotalItem - VolumenItem;
            
            Total_CostoInternoPpto += VolumenItem;

            if( TotalItemInterno <  TotalItemExterno ){
                Porcentaje_RentabilidadItem =  Math.round( 100-((TotalItemInterno / TotalItemExterno)*100) );
            }else if( TotalItemExterno == 0  ){
                Porcentaje_RentabilidadItem = 0;
            }else{
                Porcentaje_RentabilidadItem =  (100-Math.round( (TotalItemInterno / TotalItemExterno)*100 ));
            }

            Valor_RentabilidadItem = Math.round(TotalItemExterno - TotalItemInterno);

            $(".ValorUnitarioItemInterno"+Id).html( HtmlValores_Doble(SubTotalItem) )

            $(".TotalInternoItem"+Id).html( HtmlValores_Doble(VolumenItem) )

            $(".SubTotalExternoItem"+Id).html( HtmlValores_Doble(TotalItemExterno) )
            
            if( isNaN(TotalItemExterno) ){
                console.log( "TotalItemExterno" )
            }
            
            Total_CostoExternoPpto += TotalItemExterno;

            $(".TotalExternoItem"+Id).html( HtmlValores_Doble(TotalExternoClienteImpuesto) )

            $(".ValorComisionItem"+Id).html( HtmlValores_Doble(ValorComision) )

            Grupo_SubtotalCliente += TotalItemExterno;
            Grupo_TotalCliente += TotalExternoClienteImpuesto;
            Grupo_ValorComision += ValorComision;

            if( isNaN(Porcentaje_RentabilidadItem) ){
                Porcentaje_RentabilidadItem = 0;
            }

            if( Porcentaje_RentabilidadItem > 0 ){
                $(".PorcentajeRentabilidadItem"+Id).html( HtmlPorcentajes_Doble(Porcentaje_RentabilidadItem) ).css({
                    'background-color':'rgb(96 195 96)',
                    'color':'white',
                    'font-weight':'bold'
                })
            }else{
                $(".PorcentajeRentabilidadItem"+Id).html( HtmlPorcentajes_Doble(Porcentaje_RentabilidadItem) ).css({
                    'background-color':'#f9a2a2',
                    'color':'white',
                    'font-weight':'bold'
                })
            }
            $(".RentabilidadItem"+Id).html( HtmlValores_Doble(Valor_RentabilidadItem) )
            Grupo_RentabilidadParcial += Valor_RentabilidadItem;
            
            
            Total_RentabilidadBruta += Valor_RentabilidadItem;
            Recorridos++;
            console.log(Recorridos)

        })
    }
    
    ComisionManual += TempComisionManual
    $(".SubtotalGrupo"+Hash2).html( HtmlValores_Doble(SubTotal) )
    $(".TotalInterno"+Hash2).html( HtmlValores_Doble(Grupo_Volumen) )
    
    $(".SubTotalExterno"+Hash2).html( HtmlValores_Doble(Grupo_SubtotalCliente) )
    $(".TotalExterno"+Hash2).html( HtmlValores_Doble(Grupo_TotalCliente) )
    
    $(".ValorComisionesTotal"+Hash2).html( HtmlValores_Doble(Grupo_ValorComision) )
    
    $(".RentabilidadParcialTotal"+Hash2).html( HtmlValores_Doble(Grupo_RentabilidadParcial) )
    
    
    $(".Val_RentabilidadBrutaGeneral").html( HtmlValores_Doble(Total_RentabilidadBruta) )
    
    if( Total_CostoInternoPpto <  Total_CostoExternoPpto ){
        Total_Porcentaje_RentabilidadBruta =  Math.round( (Total_CostoInternoPpto / Total_CostoExternoPpto)*100 );
    }else{
        Total_Porcentaje_RentabilidadBruta =  (100-Math.round( (Total_CostoInternoPpto / Total_CostoExternoPpto)*100 ));
    }
    if( Total_Porcentaje_RentabilidadBruta > MinRentabilidad ){
        $(".Por_RentabilidadBrutaGeneral").html( HtmlPorcentajes_Doble(Total_Porcentaje_RentabilidadBruta) ).css({
            'background-color':'rgb(96 195 96)',
            'color':'white',
            'font-weight':'bold'
        })
    }else{
        $(".Por_RentabilidadBrutaGeneral").html( HtmlPorcentajes_Doble(Total_Porcentaje_RentabilidadBruta) ).css({
            'background-color':'#f9a2a2',
            'color':'white',
            'font-weight':'bold'
        })
    }
    
}

function GuardarDatos(Hash){
    var formData = new FormData();
        formData.append("Hash", Hash);
        var Items = [];
        $(".OrdenItemGrupoPptoId").each(function(){
            var Temp = [];
            var Id = $(this).text()
            Temp.push({
                'Id':$(this).text(),
                'Item': $("#NombreItem"+Id).val(),
                'DescripcionInterna': $("#DescripcionItem"+Id).val(),
                'Proveedor': $("#ProveedorItem"+Id).val(),
                'Dias': $("#DiasItem"+Id).val(),
                'Cantidad': $("#CantidadItem"+Id).val(),
                'ValorUnitarioInterno': $("#ValorUnitarioInterno"+Id+"_real").text(),
                'ImpuestoInterno': $("#ImpuestoItem"+Id).val(),
                'Volumen': $("#VolumenItem"+Id).val(),
                'DescripcionExterna': $("#DescripcionItemExterno"+Id).val(),
                'ValorUnitarioExterno': $("#ValorUnitarioExterno"+Id+"_real").text(),
                'ItemOrden': $("#ItemOrden"+Id).text(),
                'ImpuestoExterno': $("#ImpuestoExternoItem"+Id).val(),
                'ComisionItem': $("#ComisionItem"+Id).val()
            })
            Items.push(Temp);
        })
        
        var Asociados = [];
        $(".AOrdenItemGrupoPptoId").each(function(){
            var Temp = [];
            var Id = $(this).text()
            Temp.push({
                'Id':$(this).text(),
                'Item': $("#ANombreItem"+Id).val(),
                'DescripcionInterna': $("#ADescripcionItem"+Id).val(),
                'Proveedor': $("#AProveedorItem"+Id).val(),
                'Dias': $("#ADiasItem"+Id).val(),
                'Cantidad': $("#ACantidadItem"+Id).val(),
                'ValorUnitarioInterno': $("#AValorUnitarioInterno"+Id+"_real").text(),
                'ImpuestoInterno': $("#AImpuestoItem"+Id).val(),
                'Volumen': $("#AVolumenItem"+Id).val()
            })
            Asociados.push(Temp);
        })
        
        if( isNaN(PorcentajeVolumenTotal) ){
            PorcentajeVolumenTotal = 0
        }
        
        if( isNaN(PorcentajeUtilidadFinal) ){
            PorcentajeUtilidadFinal = 0
        }
        
        formData.append("Items", JSON.stringify(Items));
        formData.append("Asociados", JSON.stringify(Asociados));
        formData.append("Total_ValorComisional", Total_ValorComisional);
        formData.append("Total_ValorNoComisional", Total_ValorNoComisional);
        formData.append("Total_ExcedenteAsociados", Total_ExcedenteAsociados);
        formData.append("Total_CostosEjecucion", Total_CostosEjecucion);
        formData.append("TotalImprevistos", TotalImprevistos);
        formData.append("TotalGastosAdministrativos", TotalGastosAdministrativos);
        formData.append("Total_ComisionAgencia", Total_ComisionAgencia);
        formData.append("Total_Actividad", Total_Actividad);
        formData.append("Total_ComsionPorDescuentos", Total_ComsionPorDescuentos);
        formData.append("Total_UtilidadComercial", Total_UtilidadComercial);
        formData.append("PorcentajeVolumenTotal", PorcentajeVolumenTotal);
        formData.append("TotalUtilidadMarginal", TotalUtilidadMarginal);
        formData.append("TotalFactoring", TotalFactoring);
        formData.append("TotalInteresesBancarios", TotalInteresesBancarios);
        formData.append("TotalInterecesTerceros", TotalInterecesTerceros);
        formData.append("TotalImpuestosParam", TotalImpuestosParam);
        formData.append("UtilidadFinal", UtilidadFinal);
        formData.append("PorcentajeUtilidadFinal", PorcentajeUtilidadFinal);
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'c6b9c1c7596272805ce1e37fbac04fc4',
            success:function(data){
                //TOTAL COMISIÒN MANUAL
                /*
                FormatValoresPpto()

                //AlimentarImpuestosComisionPpto()    
                //AlimentarComision();
                //AlimentarConceptosAdicionales();
                HashPpto = $(".HashP").text();
                ComisionManual = 0;

                $(".GruposIds").each(function(){
                    var Hash2 = $(this).text()

                    CalcularCostoGrupoPpto(HashPpto,Hash2)
                })
                CalcularAllPpto($(".HashP").text())
                //CalcularAllPpto($(".HashP").text())*/
                location.reload()
                
            }
        })
}

function CrearItemGrupo(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d14e27d36b63a679d1a770ebe4f92953',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash,
            Hash2:Hash2
        },
        success:function(data){
            if( data.Info == 1 ){
                AlertaMensajes("Se ha Creado un Nuevo Item en el Grupo "+$(".NameGrup"+Hash2).text()+"","success",3);
                //ContenidoGrupo
                var html = "";
                html += "<tr class = 'Items ItemGrupo"+Hash2+" ItemI"+data.Item+" Cursor_AS '>"
                    html += "<td class = 'Presupuesto_Cuerpo CenterText OrdenItemGrupoPpto"+Hash2+" ItemOrden"+data.Item+"'>1</td>"
                    html += "<td class = 'Presupuesto_Cuerpo CenterText'>"
                        html += "<img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemGrupoPpto("+Hash+","+data.Grupo+")' />";
                    html += "</td>"
                    html += "<td class = 'OrdenItemGrupoPptoId IdsItesm"+Hash2+"' style = 'display:none;'>"+data.Item+"</td>";
                    html += "<td class = 'Presupuesto_Cuerpo'></td>"
                    html += "<td class = 'Presupuesto_Cuerpo'></td>"
                    html += "<td class = 'Presupuesto_Cuerpo CenterText'>"
                        html += "<img src = '../images/activo.png' class = 'OptionIcon' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo CenterText'>"
                        html += "<img src = '../images/inactivo.png' class = 'OptionIcon' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'></td>"
                    html += "<td class = 'Presupuesto_Cuerpo'></td>"
                    html += "<td class = 'Presupuesto_Cuerpo CenterText'><span class = 'Cursor NumAsociados"+data.Item+"' onclick = 'AsociadosItem("+data.Item+")'>0</span></td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control PptoCampos' id = 'NombreItem"+data.Item+"' name = 'NombreItem"+data.Item+"[]' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<textarea class = 'form-control PptoCampos' id = 'DescripcionItem"+data.Item+"' name = 'DescripcionItem"+data.Item+"[]' style = 'width:300px;'></textarea>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<select class = 'form-control PptoCampos' id = 'ProveedorItem"+data.Item+"' name = 'ProveedorItem"+data.Item+"[]' >"
                            html += "<option value = '0' selected>Seleccione</option>"
                            for(var x = 0; x < data.Proveedores.length;x++){
                                html += "<option value = '"+data.Proveedores[x]['Hash']+"'>"+data.Proveedores[x]['NombreComercial']+"</option>"
                            }
                        html += "</select>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<input autocomplete = 'off' type = 'number' value = '0' onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")'  class = 'form-control PptoCamposSmall' step='0.1' id = 'DiasItem"+data.Item+"' name = 'DiasItem"+data.Item+"[]' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<input autocomplete = 'off' type = 'number' value = '0' onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")'  class = 'form-control PptoCamposSmall' step='0.1' id = 'CantidadItem"+data.Item+"' name = 'CantidadItem"+data.Item+"[]' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo '>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorUnitarioInterno"+data.Item+"[]' id = 'ValorUnitarioInterno"+data.Item+"' onkeyup = 'FormatCampoNum(\"ValorUnitarioInterno"+data.Item+"\",\"ValorUnitarioInterno"+data.Item+"_real\");CalcularCostoGrupoPpto("+Hash+","+Hash2+");' class = 'ValorUnitarioInterno"+data.Item+" form-control PptoCamposSmall' required />"
                        html += "<span style = 'display:none;' class = 'ValorUnitarioInterno"+data.Item+"_real' id = 'ValorUnitarioInterno"+data.Item+"_real'>0</span>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo ValorUnitarioItemInterno"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo ValorAsociados"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo ValorAnticipos"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<select class = 'form-control PptoCampos' id = 'ImpuestoItem"+data.Item+"' name = 'ImpuestoItem"+data.Item+"[]' onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' >"
                            html += "<option value = '0-0'>Sin Impuesto</option>"
                            for(var p = 0; p < data.IInternos.length; p++){
                                html += "<option value = '"+data.IInternos[p]['Hash']+"-"+data.IInternos[p]['Valor']+"'>"+data.IInternos[p]['Tarifa']+"</option>"
                            }
                        html += "</select>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<input autocomplete = 'off' type = 'number' value = '0'  onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")'   class = 'form-control PptoCamposSmall' step='0.1' id = 'VolumenItem"+data.Item+"' name = 'VolumenItem"+data.Item+"[]' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo TotalInternoItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td></td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<textarea class = 'form-control PptoCampos' id = 'DescripcionItemExterno"+data.Item+"' name = 'DescripcionItemExterno"+data.Item+"[]' ></textarea>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo '>"
                        html += "<input autocomplete = 'off' type = 'text' value = '0' name = 'ValorUnitarioExterno"+data.Item+"[]' id = 'ValorUnitarioExterno"+data.Item+"' onkeyup = 'FormatCampoNum(\"ValorUnitarioExterno"+data.Item+"\",\"ValorUnitarioExterno"+data.Item+"_real\");CalcularCostoGrupoPpto("+Hash+","+Hash2+")'oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' class = 'ValorUnitarioExterno"+data.Item+" form-control PptoCamposSmall' required />"
                        html += "<span style = 'display:none;' class = 'ValorUnitarioExterno"+data.Item+"_real' id = 'ValorUnitarioExterno"+data.Item+"_real'>0</span>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo SubTotalExternoItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<select class = 'form-control PptoCampos' id = 'ImpuestoExternoItem"+data.Item+"' value = '0' onchange = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")'  name = 'ImpuestoExternoItem"+data.Item+"[]' onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' >"
                        html += "<option value = '0-0'>Sin Impuesto</option>"
                            for(var p = 0; p < data.IExterno.length; p++){
                                html += "<option value = '"+data.IExterno[p]['Hash']+"-"+data.IExterno[p]['Valor']+"-"+data.IExterno[p]['Ppto']+"'>"+data.IExterno[p]['Tarifa']+"</option>"
                            }
                        html += "</select>"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo TotalExternoItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td></td>"
                    html += "<td class = 'Presupuesto_Cuerpo'>"
                        html += "<input autocomplete = 'off' type = 'number' class = 'form-control PptoCamposSmall' step='0.1' value = '0' onkeyup = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' oninput = 'CalcularCostoGrupoPpto("+Hash+","+Hash2+")' id = 'ComisionItem"+data.Item+"' name = 'ComisionItem"+data.Item+"[]' />"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo ValorComisionItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td></td>"
                    html += "<td class = 'Presupuesto_Cuerpo PorcentajeRentabilidadItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                    html += "<td class = 'Presupuesto_Cuerpo RentabilidadItem"+data.Item+"'>"
                        html += "$ 0"
                    html += "</td>"
                html += "</tr>"
                $(".ContenidoGrupo"+Hash2).append(html)
                CalcularAllPpto($(".HashP").text())
                $(".Presupuesto_Cuerpo").css({'background-color':'white'})
            }else{
                AlertaMensajes("No se ha Creado el Item en el Grupo "+$(".NameGrup"+Hash2).text()+ "","error",3);
            }
        }
    });
}

function Presupuesto_GuardarReorganizarGrupos(Hash){
    var temp = "";
    $(".OrdenGruposPptoId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url:UrlGeneral+'8873f9251a499c2f93501e765b17955d',
        data:{Hash:Hash,orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.Info == 1 ){
                AlertaMensajes("Grupos del Presupuesto Reorganizados con éxito","success",3);
                ModalEdit(0);
                location.reload()
            }else{
                AlertaMensajes("No se logró Reorganizar los Grupos del Presupuesto","error",3);

            }
            
        }
    });
}

function ReorganizarGruposPpto(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'199dfc061cb6ca90a98f4eb7afc25fd5',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash,
        },
        success:function(data){
            var html = "";
            
            TituloVentana = "Reorganizar Grupos Presupuesto"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoGrupoPpto'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body' style = 'height:200px;overflow-y:scroll;'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'>Arrastre y suelte cada Grupo en la posición que considere para reorganizarlos:</label>"
                    html += "</div>"
                    html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                        html += "<table id = 'OrdenGruposPpto' class = 'tableNew' width = '100%'>";
                            html += "<thead>";
                                html += "<tr>";
                                    html += "<th>Orden</th>";
                                    html += "<th>Nombre</th>";
                                html += "</tr>";
                            html += "</thead>";
                            html += "<tbody class = 'TBody'>";
                            if( data.Grupos.length == 0 ){
                                html += "<tr>";
                                    html += "<td class = 'OrdenGruposPpto CenterText' colspan = '2'>No hay Grupos en este Presupuesto</td>";
                                html += "</tr>";
                            }else{
                                for(var i = 0; i < data.Grupos.length;i++){
                                    html += "<tr class = 'Cursor_AS'>";
                                        html += "<td class = 'OrdenGruposPpto CenterText'>"+data.Grupos[i]['Orden']+"</td>";
                                        html += "<td>"+data.Grupos[i]['Grupo']+"</td>";
                                        html += "<td class = 'OrdenGruposPptoId' style = 'display:none;'>"+data.Grupos[i]['Hash']+"</td>";
                                    html += "</tr>";
                                }
                                
                                
                            }
                            html += "</tbody>";
                        html += "</table>";
                    html += "</div>";
                html += "</div>"
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'Presupuesto_GuardarReorganizarGrupos("+Hash+")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .OrdenGruposPpto").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });
            ResizeModal(0.6)
        }
    });
}

function EditarGrupoPpto(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'dcf59e06d5eee130c21d79c6b56aefb0',
        data:{Hash:Hash,Hash2:Hash2, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Editar Grupo Presupuesto</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<form class='form-signin FormNuevoGrupoPpto'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Grupo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'GrupoName' id = 'GrupoName' value = '"+$(".NameGrup"+Hash2).text()+"'>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarGrupoPpto("+Hash+","+Hash2+")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(0.4)

            $FormValidate = $(".FormNuevoGrupoPpto").validate({
                rules: {
                    GrupoName : {
                        required: true,
                        minlength:1
                    },
                    
                }
            });
        }
    });
}

function GuardarEditarGrupoPpto(Hash,Hash2){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Hash2", Hash2);
        formData.append("GrupoName", $("#GrupoName").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'b503952430db439e20115b1d7cfafb3d',
            success:function(data){
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha Modificado el Grupo "+$(".NameGrup"+Hash2).text()+" por "+$("#GrupoName").val(),"success",3);
                    
                    $(".NameGrup"+Hash2).text($("#GrupoName").val())
                    ModalEdit(0);
                }else{
                    AlertaMensajes("No se Modificó el Grupo","error",3);
                    
                }
            }
        })
    }else{
        AlertaMensajes("No se ha diligenciado todos los campos","error",3);
    }
}


function GuardarGrupoPpto(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("GrupoName", $("#GrupoName").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'54bd9000448553de750c34d7cdbce9c9',
            success:function(data){
                
                //BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3)
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha creado el Grupo "+$("#GrupoName").val(),"success",3);
                    ModalEdit(0);
                    GuardarDatos(Hash);
                    location.reload()
                    /*var html = "";
                    html += "<table class = 'Ppto_TablaContenidoGrupo Grupo"+data.Grupo+"' >"
                        html += "<tr>"
                            html += "<td colspan = '33'>"
                                html += "<div class = 'panel-heading alert-primary BorderTop'>"
                                    html += "<span class = 'HidenInformation GruposIds'>"+data.Grupo+"</span>"
                                    html += "<table class='table' width = '100%'>";
                                        html += "<tr>";
                                            html += "<td width='2%' class='CenterText'>"
                                                html += "<img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarGrupoPpto("+Hash+","+data.Grupo+")'/> Eliminar";
                                            html += "</td>"
                                            html += "<td width='2%' class='CenterText'>"
                                                html += "<img src ='../images/editar.png' class = 'OptionIcon' onclick = 'EditarGrupoPpto("+Hash+","+data.Grupo+")' data-toggle='modal' data-target='#ModalEdit'/> Editar";
                                            html += "</td>"
                                            html += "<td width='2%' class='CenterText'>"
                                                html += "<img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = 'CrearItemGrupo("+Hash+","+data.Grupo+") /> Agregar Item";
                                            html += "</td>"
                                            html += "<td width='90%' class='BlackFont CenterText NameGrup"+data.Grupo+"' style ='vertical-align:middle;font-size:15px;' >"+$("#GrupoName").val()+"</td>"
                                            html += "<td class='text-left'>";
                                                html += "<a href='#' class='PAR_ContentTRACLIENTEOT' onclick='ContentList(\"Grupo"+data.Grupo+"\")'><i class=' Cursor fas fa-angle-double-up'></i></a>";
                                            html += "</td>";
                                        html += "</tr>";
                                    html += "</table>";
                                html += "</div>"   
                            html += "</td>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th colspan = '21' class = 'PptoTituloInterno'>INTERNO</th>"
                            html += "<td></td>"
                            html += "<th colspan = '5' class = 'PptoTituloExterno'>EXTERNO</th>"
                            html += "<td></td>"
                            html += "<th colspan = '2' class = 'PptoTituloInterno'>Comisión</th>"
                            html += "<td></td>"
                            html += "<th colspan = '2' class = 'PptoTituloInterno'>Rentabilidad Parcial</th>"
                        html += "</tr>"
                        html += "<tr >"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>No.</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>Eliminar</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>Sel.</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>Anticipo</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>Comisión Cliente</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap>No Comisional</td>"
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OP</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OC</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Asociados</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:200px;'>Item</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Descripción</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Proveedor</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Días</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Cantidad</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Unitario</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>SubTotal</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Asociados</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Anticipo</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Impuesto</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Volumen</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total Interno</td>";
                            html += "<td></td>";
                            html += "<td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Descripción</td>";
                            html += "<td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Valor Unitario</td>";
                            html += "<td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>SubTotal</td>";
                            html += "<td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Impuesto</td>";
                            html += "<td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Total Externo</td>";
                            html += "<td></td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Comisión Item</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Comisión</td>";
                            html += "<td></td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Porcentaje</td>";
                            html += "<td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total</td>";
                        html += "</tr>"
                        html += "<div class = 'ContenedorCamposReOrg ' style = 'width:100%;'>";
                            html += "<tbody class = 'TBody ContenidoGrupo"+data.Grupo+"'>";
                            html += "</tbody>"
                        html += "</div>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'PptoTituloInterno_Bottom'>Total</th>";
                            html += "<th class = 'PptoSubTituloInterno SubtotalGrupo"+data.Grupo+"' nowrap></th>";
                            html += "<th class = 'PptoSubTituloInterno TotalAsociadosGrupo"+data.Grupo+"' nowrap></th>";
                            html += "<td></td>";
                            html += "<td></td>";
                            html += "<th nowrap></th>";
                            html += "<th class = 'PptoSubTituloInterno TotalInterno"+data.Grupo+"' nowrap></th>";
                            html += "<td></td>";
                            html += "<td></td>";
                            html += "<th  nowrap></th>";
                            html += "<th class = 'PptoSubTituloExterno SubTotalExterno"+data.Grupo+"' nowrap></th>";
                            html += "<td></td>";
                            html += "<th class = 'PptoSubTituloExterno TotalExterno"+data.Grupo+"' nowrap></th>";
                            html += "<td></td>";
                            html += "<td></td>";
                            html += "<th class = 'PptoSubTituloInterno ValorComisionesTotal"+data.Grupo+"' nowrap></th>";
                            html += "<td></td>";
                            html += "<td></td>";
                            html += "<th class = 'PptoSubTituloInterno RentabilidadParcialTotal"+data.Grupo+"' nowrap></th>";
                        html += "</tr>"
                        
                        html += "</table>"
                   
                    html += "<br>"
                    $(".ContenedorDataPpto").append(html)
                    CalcularAllPpto($(".HashP").text())*/
                }else{
                    AlertaMensajes("No se creó el Grupo","error",3);
                    
                }
            }
        })
    }else{
        AlertaMensajes("No se ha diligenciado todos los campos","error",3);
    }
}

function VersionesPresupuesto(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'73d03829a0a8af2a6357b596fb8a6d84',
        data:{Hash:HashPpto,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Versiones Presupuesto # "+HashPpto
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                if( data.VersionPpto[0]['VersionCerrada'] == 0 ){
                    html += "<div class = 'table'>"
                        html += "<img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = 'NuevaVersionPpto()'/>"
                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevaVersionPpto()' > Nueva Versión Interna</span>"
                    html += "</div>"
                }
                html += "<br>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>¿Vigente?</th>"
                        html += "<th>Versión Interna</th>"
                        html += "<th>Versión Cliente</th>"
                        html += "<th>Fecha Creación</th>"
                        html += "<th>Hora Creación</th>"
                        html += "<th>Creado Por</th>"
                        html += "<th>Fecha Ult. Modificación</th>"
                        html += "<th>Hora Utl. Modificación</th>"
                        html += "<th>Modificado Por</th>"
                        html += "<th>Consultar</th>"
                        html += "<th>¿Utilizar?</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.Versiones.length; i++){
                        var Log = 0;
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+( i+1 )+"</td>"
                            if( data.VersionPpto[0]['VersionInterna'] == data.Versiones[i]['VersionInterna'] && data.VersionPpto[0]['VersionCliente'] == data.Versiones[i]['VersionCliente'] ){
                                Log = 1;
                                html += "<td class = 'CenterText'>Si</td>"
                            }else{
                                html += "<td class = 'CenterText'>No</td>"
                            }
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['VersionInterna']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['VersionCliente']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['FechaCreacion']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['HoraCreacion']+"</td>"
                            html += "<td >"+data.Versiones[i]['Creador']+"</td>"
                            
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['FechaUltimaModificacion']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Versiones[i]['HoraMod']+"</td>"
                            html += "<td >"+data.Versiones[i]['Modificador']+"</td>"
                            
                            html += "<td class = 'CenterText'></td>"
                            html += "<td class = 'CenterText'>"
                                if( data.VersionPpto[0]['VersionCerrada'] == 0 && Log == 0){
                                    html += "<button class = 'btn btn-primary' style = 'font-size:12px;' onclick = 'CambiarVersionPpto("+data.Versiones[i]['Hash']+")'>Si</button>"
                                }
                            html += "</td>"
                        html += "</tr>"
                    }
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //ResizeModal(0.4)
        }
    });
}

function NuevaVersionPpto(){
    if( confirm("¿Está seguro(a) de generar una nueva versión de este presupuesto sobre la versión Actual ?") ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'30a71ff4adc89a8d5cad05dcf90c0ec0',
            data:{Hash:HashPpto,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if( data.Info == 1 ){
                    location.reload();
                }
            }
        })
    }
}

function CambiarVersionPpto(Hashx){
    if( confirm("¿Está seguro(a) de generar utilizar esta Versión?") ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'30a71ff4adc89a8d5cad05dcf90c0ec0x',
            data:{Hash:Hashx,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if( data.Info == 1 ){
                    location.reload();
                }
            }
        })
    }
}

function EnviarPptoAprobacion(){
    var Required = "";
    var AddMsj = "";
    
    if( PorcentajeUtilidadFinal < MinRentabilidad ){
        Required = "required";
        AddMsj = "\nDebe tener en cuenta que este presupuessto se encuentra por debajo de la Rentabildiad Mínima, por lo cual, debe ingresar las observaciones correspondientes.";
    }
    
    if( confirm("¿Está seguro(a) de enviar este presupuesto a Aprobación Interna?"+AddMsj) ){
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Solicitar Aprobación Presupuesto # "+HashPpto+"</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                        html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<form class='form-signin FormSolAprobacionPpto'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Observaciones:</label>"
                        html += "<textarea class = 'form-control' name = 'ObservacionesPpto' id = 'ObservacionesPpto' "+Required+"></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
        html += "</form>"
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendPptoAprob()'>Solicitar Aprobación</button>";
        html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
        
        
    } else{
        ModalEdit(0)
    }
}

function SendPptoAprob(){
    if( PorcentajeUtilidadFinal < MinRentabilidad && $("#ObservacionesPpto").val().length < 5 ){
        alert("Debe ingresar la justificación correspondiente.");
    }else{
        if( confirm("¿Está completamente seguro(a) de enviar este presupuesto a Aprobación Interna?\nTenga en cuenta que al hacerlo, no podrá modificarlo a no ser que sea rechazado por alguna de las personas de la jerarquía correspondiente.")  ){
            $.ajax({
                type:'POST',
                url:UrlGeneral+'30a71ff4adc89a8d5cad05dcf90346566',
                data:{
                    Hash:Hasing,
                    Observ: $("#ObservacionesPpto").val(),
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    if( data.OK == 0 ){
                        alert("Actualmente no existe una parametrización para la aprobación de este presupuesto.\nPor favor contacto al Administrador para que realice este proceso.");
                    }else{
                        alert("Se ha enviado a aprobación el presupuesto.\nA partir de de este momento, este no puede ser modificado.");
                        location.reload();
                    }
                }
            })
        }
    }
    
}

function ViewStatusAprobacion(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'559d02a2cf849b5d35301ea6ee380049',
        data:{
            Hash:Hasing,
            Observ: $("#ObservacionesPpto").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Estatus Aprobación Presupuesto # "+HashPpto+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                if( data.InfoAprobacion.length > 0 ){
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'>A continución se relacionan los datos de la Solicitud de Aprobación del Presupuesto "+HashPpto+", Versión Interna: "+VersionInterna+" - Versión Cliente: "+VersionCliente+"</label>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Fecha:</label>"
                            html += "<input type = 'text' disabled class = 'form-control' value = '"+data.InfoAprobacion[0]['Fecha']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Hora:</label>"
                            html += "<input type = 'text' disabled class = 'form-control' value = '"+data.InfoAprobacion[0]['Hora']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Solicitado Por:</label>"
                            html += "<input type = 'text' disabled class = 'form-control' value = '"+data.InfoAprobacion[0]['NombreUsuario']+"'/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'>Observaciones:</label>"
                            html += "<textarea class = 'form-control' readonly>"+data.InfoAprobacion[0]['Observaciones']+"</textarea>"
                        html += "</div>"
                    html += "</div>"
                    html += "<hr>"
                    html += "<table class = 'tableNew'>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Grupo</th>"
                            html += "<th>Revisor(a)</th>"
                            html += "<th>Estatus de Aprobación</th>"
                            html += "<th>Fecha</th>"
                            html += "<th>Hora</th>"
                            html += "<th>Observaciones</th>"
                        html += "</tr>"
                        for( var i = 0; i < data.InfoAprobacion[0]['Estructura'].length; i++){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Estructura']+"</td>"
                                html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['NombreUsuario']+"</td>"
                                if( data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['Info'].length > 0){
                                    html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['Info'][0]['EstadoAprobacion']+"</td>"
                                    html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['Info'][0]['Fecha']+"</td>"
                                    html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['Info'][0]['Hora']+"</td>"
                                    html += "<td>"+data.InfoAprobacion[0]['Estructura'][i]['Usuarios'][0]['Info'][0]['observaciones']+"</td>"
                                }else{
                                    html += "<td></td>"
                                    html += "<td></td>"
                                    html += "<td></td>"
                                    html += "<td></td>"
                                }
                                
                            html += "</tr>"
                        }
                    html += "</table>"
                }else{
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'>No se ha encontrado Información sobre la Solicitud de Aprobación del Presupuesto "+HashPpto+", Versión Interna: "+VersionInterna+" - Versión Cliente: "+VersionCliente+"</label>"
                        html += "</div>"
                    html += "</div>"
                }
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
            ModalEdit(1)
        }
    })
}

function SendProbCliente(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Cargar Aprobación Presupuesto # "+HashPpto+"</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                    html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormSolAprobacionPpto'  action='"+UrlGeneral+"4ecce3ff63d6349161d2360628fab155'  enctype='multipart/form-data' method='post' >"
        html += "<input type = 'hidden' name = '_token' id = '_token' value = '"+document.getElementsByName('_token')[0].value+"' />"
        html += "<input type = 'hidden' name = 'Hash' id = 'Hash' value = '"+HashPpto+"' />"
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='ParLogo'>Observaciones:</label>"
                    html += "<textarea class = 'form-control' name = 'ObservacionesPpto' id = 'ObservacionesPpto' ></textarea>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<div class='custom-file'>"
                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                    html += "</div>";
                html += "</div>"
            html += "</div>"
        html += "</div>";
    
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
        html += "<button type='submit' class='btn btn-primary' >Cargar Aprobación</button>";
    html += "</div>";
    html += "</form>"
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg'); 
}

function FormOP(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'8e9f895ab4197fbe9e05b8854b7b8a1a',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash:HashPpto
        },
        success:function(data){
            var html = ""
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Órdenes de Producción</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class='pestanas'>"
                    html += "<ul class = 'TabsMenu'>";
                        html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            html += "<img src = '../images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>Generación</span>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(2)' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            html += "<img src = '../images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>Histórico</span>"
                        html +="</li>";
                    html += "</ul>"
                html += "</div>"
                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Proveedor:</label>";
                            html += "<select class ='form-control' name = 'Proveedor' id = 'Proveedor' onchange = 'ListarItesmProveedores("+HashPpto+")'>";
                                html += "<option value='' selected>Seleccione</option>";
                                for( var i = 0; i < data.Proveedores.length; i++ ){
                                    html += "<option value='"+data.Proveedores[i]['Hash']+"' >"+data.Proveedores[i]['Proveedor']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Items:</label>";
                            html += "<div class = 'InformacionItems' style = 'width:100%;'></div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Asociados:</label>";
                            html += "<div class = 'InformacionItemsAsoc' style = 'width:100%;'></div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<hr>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Fecha de Entrega:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'FechaEntrega' id = 'FechaEntrega' required />";
                        html += "</div>";
                        /*html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Fecha de Radicación:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'FechaRadicacion' id = 'FechaRadicacion' required />";
                        html += "</div>";*/
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Vigencia Inicial:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'VigenciaInicial' id = 'VigenciaInicial' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Vigencia Final:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'VigenciaFinal' id = 'VigenciaFinal' required />";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Forma de Pago:</label>";
                            html += "<select class ='form-control' name = 'FormaPago' id = 'FormaPago' >";
                                html += "<option value='' selected>Seleccione</option>";
                                for( var i = 0; i < data.FormaPago.length; i++ ){
                                    html += "<option value='"+data.FormaPago[i]['Hash']+"' >"+data.FormaPago[i]['FormaPago']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'>Lugar:</label>";
                            html += "<input type = 'text' class ='form-control' autocomplete = 'off' name = 'Lugar' id = 'Lugar' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'>Notificar a:</label>";
                            html += "<input type = 'email' class ='form-control' autocomplete = 'off' name = 'Correo' id = 'Correo' required />";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Observaciones:</label>";
                            html += "<textarea class = 'form-control' name = 'Observaciones' id = 'Observaciones'></textarea>";
                        html += "</div>";
                    html += "</div>";
                    html += "<hr>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
                        html += "<button type='buttom' class='btn btn-primary' onclick = 'SendOP()'>Crear Orden de Producción</button>";
                    html += "</div>";
                html += "</div>";

                html += "<div class = 'ChildTabsMenu TabsMenu2'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'>Buscar:</label>";
                            html += "<input type = 'text' name = 'TextBusqueda' id = 'TextBusqueda' class = 'form-control'>";
                        html += "</div>";
                        
                        html += "<div class='col col-sm-3 my-2 CenterText'>";
                            html += "<p></p>";
                            html += "<img src ='../images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaListarOrdenesProduccion()'/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<br>"
                    html += "<table class = 'tableNew' id = 'TablaOrdenes'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Número de Orden</th>"
                                html += "<th>Forma de Pago</th>"
                                html += "<th>Fecha Generación</th>"
                                html += "<th>Hora Generación</th>"
                                html += "<th>Generado Por</th>"
                                html += "<th>Descargar</th>"
                                html += "<th>Estado</th>"
                                html += "<th>Fecha Cancelación</th>"
                                html += "<th>Hora Cancelación</th>"
                                html += "<th>Cancelado Por</th>"
                                html += "<th>Motivo</th>"
                                html += "<th>¿Cancelar?</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>";

            html += "</div>";

        $(".content_modal").html(html);
        //OTCliente.listaInit()
        TablaListarOrdenesProduccion();
        MostrarTabsMenu(1)
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        }
    })
}

function BuscarTablaListarOrdenesProduccion(){
    $DataTable_OTProyectos.destroy()
    TablaListarOrdenesProduccion();
}

function TablaListarOrdenesProduccion() {
    $DataTable_OTProyectos = $('#TablaOrdenes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'d85127fca3656efa5a78ba07a4ecb4cf',
            'data':function (d) {
                d.search['TextBusqueda'] = $("#TextBusqueda").val();
                d.search['Ppto'] = HashPpto;
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
               data: 'Id',
               "orderable": false,
               "render": function (data, type, full, meta) {
                    return '<center>'+data+'</center>';
                }

            },
            {
               data: 'FormaPago',
               "orderable": false,
               "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'FechaCrea',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCrea',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c/'+full.Hash+' target = "_blank"><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                        return data;
                    }

            },
            {
            data: 'FechaCan',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
            data: 'HoraCan',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
                data: 'UsuarioCan',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'MotivoCancelacion',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'MotivoCancelacion',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.FechaCan == '' ){
                        ht = "<center><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'FormCancelarOP("+full.Hash+","+full.Id+")' /></center>"
                    }
                    return ht;
                }

            },
        ],
        "order": [[7, "DESC"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#TablaOrdenes').css({'width':'100%'})
}

function ListarItesmProveedores(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'613b5a1ac42a21867cc555a4fc469039',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash:HashPpto,
            HashP: $("#Proveedor").val()
        },
        success:function(data){
            if( data.Items.length > 0 ){
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Grupo</th>"
                        html += "<th>Item</th>"
                        html += "<th>Dias</th>"
                        html += "<th>Cantidad</th>"
                        html += "<th>Valor Unitario</th>"
                        html += "<th>Subtotal</th>"
                        html += "<th>Volumen</th>"
                        html += "<th>Total</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.Items.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type = 'checkbox' class = 'ItemsOrdenes' name = 'ItemsOrdenes[]' value = '"+data.Items[i]['Hash']+"'/>"
                            html += "</td>"
                            html += "<td>"+data.Items[i]['Grupo']+"</td>"
                            html += "<td>"+data.Items[i]['Item']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Items[i]['Dias']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Items[i]['Unidad']+"</td>"
                            html += "<td>"+HtmlValores_Doble(data.Items[i]['ValorUnitario'])+"</td>"
                            html += "<td>"+HtmlValores_Doble(data.Items[i]['Subtotal'])+"</td>"
                            html += "<td class = 'CenterText'>"+data.Items[i]['Volumen']+"%</td>"
                            html += "<td>"+HtmlValores_Doble(data.Items[i]['Total'])+"</td>"
                            html += "</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".InformacionItems").html(html).css({'height':'200px','overflow-y':'scroll'});
                
            }else{
                $(".InformacionItems").html("<p style = 'color:red'>No existen Items sobre este presupuesto asociados a éste Proveedor.</p>").css({'height':'20px','overflow-y':'none'});
            }
            
            
            if( data.Asoc.length > 0 ){
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Item Principal</th>"
                        html += "<th>Item</th>"
                        html += "<th>Dias</th>"
                        html += "<th>Cantidad</th>"
                        html += "<th>Valor Unitario</th>"
                        html += "<th>Subtotal</th>"
                        html += "<th>Volumen</th>"
                        html += "<th>Total</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.Asoc.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type = 'checkbox' class = 'ItemsOrdenesAsoc' name = 'ItemsOrdenesAsoc[]' value = '"+data.Asoc[i]['Hash']+"'/>"
                            html += "</td>"
                            html += "<td>"+data.Asoc[i]['Item']+"</td>"
                            html += "<td>"+data.Asoc[i]['Item']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Asoc[i]['Dias']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Asoc[i]['Cantidad']+"</td>"
                            html += "<td>"+HtmlValores_Doble(data.Asoc[i]['ValorUnitario'])+"</td>"
                            html += "<td>"+HtmlValores_Doble(data.Asoc[i]['Subtotal'])+"</td>"
                            html += "<td class = 'CenterText'>"+data.Asoc[i]['Volumen']+"%</td>"
                            html += "<td>"+HtmlValores_Doble(data.Asoc[i]['Total'])+"</td>"
                            html += "</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".InformacionItemsAsoc").html(html).css({'height':'200px','overflow-y':'scroll'});
                
            }else{
                $(".InformacionItemsAsoc").html("<p style = 'color:red'>No existen Asociados sobre este presupuesto con éste Proveedor.</p>").css({'height':'20px','overflow-y':'none'});
            }
        }
    });
}

function SendOP(){
    var Items = [];
    var Asoc = [];
    
    $('.ItemsOrdenes:checked').each(
        function() {
            Items.push({Id:$(this).val()});
        }
    );
    
    $('.ItemsOrdenesAsoc:checked').each(
        function() {
            Asoc.push({Id:$(this).val()});
        }
    );
    var NumSel = Items.length + Asoc.length;
    if( NumSel > 0 && $("#Proveedor").val().length > 0 && $("#FechaEntrega").val().length > 0 
            && $("#VigenciaInicial").val().length > 0 
            && $("#VigenciaFinal").val().length > 0 && $("#FormaPago").val().length > 0 
            ){
        var formData = new FormData();
        formData.append("Hash", HashPpto);
        formData.append("Items", JSON.stringify(Items));
        formData.append("Asoc", JSON.stringify(Asoc));
        formData.append("Proveedor", $("#Proveedor").val());
        formData.append("FechaEntrega", $("#FechaEntrega").val());
        //formData.append("FechaRadicacion", $("#FechaRadicacion").val());
        formData.append("VigenciaInicial", $("#VigenciaInicial").val());
        formData.append("VigenciaFinal", $("#VigenciaFinal").val());
        formData.append("Lugar", $("#Lugar").val());
        formData.append("Correo", $("#Correo").val());
        formData.append("Observaciones", $("#Observaciones").val());
        formData.append("FormaPago", $("#FormaPago").val());
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'04f8a0f2ac55c072ab3f4834dcb6a404',
            success:function(data){
                window.open(UrlGeneral+'13889e416790c50f0410449d8b5eaf3c/'+data.Info);
                location.reload();
            }
        })
    }else{
        alert("Debe diligenciar los campos Obligatorios (*)");
    }
}

function FormCancelarOP(Hash,Id){
    if( confirm("¿Está seguro(a) de Cancelar esta Orden de Producción?") ){
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Cancelar Órden de Producción # "+Id+"</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                        html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
            html += "<input type = 'hidden' name = '_token' id = '_token' value = '"+document.getElementsByName('_token')[0].value+"' />"
            html += "<input type = 'hidden' name = 'Hash' id = 'Hash' value = '"+HashPpto+"' />"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Observaciones:</label>"
                        html += "<textarea class = 'form-control' name = 'ObservacionesPpto' id = 'ObservacionesPpto' required ></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary'  onclick = 'FormOP()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary' onclick = 'SendFormCancelarOP("+Hash+")'>Cancelar Órden</button>";
        html += "</div>";
        html += "</form>"
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg'); 
    }
}

function SendFormCancelarOP(Hash){
    if( $("#ObservacionesPpto").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'251952c58289ecc4faab514593992ffd',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash:Hash,
                ObservacionesPpto:$("#ObservacionesPpto").val(),
            },
            success:function(data){
                alert("Se ha realizado la cancelación de manera Correcta.");
                location.reload();
            }
        });
    }else{
        alert("Debe ingresar la justificación de la cancelación.");
    }
    
}


//ORDEN DE COMPRA
function FormOC(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'8e9f895ab4197fbe9e05b8854b7b8a1a',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash:HashPpto
        },
        success:function(data){
            var html = ""
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Órdenes de Compra</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class='pestanas'>"
                    html += "<ul class = 'TabsMenu'>";
                        html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            html += "<img src = '../images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>Generación</span>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(2)' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            html += "<img src = '../images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>Histórico</span>"
                        html +="</li>";
                    html += "</ul>"
                html += "</div>"
                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Proveedor:</label>";
                            html += "<select class ='form-control' name = 'Proveedor' id = 'Proveedor' onchange = 'ListarItesmProveedores("+HashPpto+")'>";
                                html += "<option value='' selected>Seleccione</option>";
                                for( var i = 0; i < data.Proveedores.length; i++ ){
                                    html += "<option value='"+data.Proveedores[i]['Hash']+"' >"+data.Proveedores[i]['Proveedor']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Items:</label>";
                            html += "<div class = 'InformacionItems' style = 'width:100%;'></div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Asociados:</label>";
                            html += "<div class = 'InformacionItemsAsoc' style = 'width:100%;'></div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<hr>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Fecha de Entrega:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'FechaEntrega' id = 'FechaEntrega' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Fecha de Radicación:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'FechaRadicacion' id = 'FechaRadicacion' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Vigencia Inicial:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'VigenciaInicial' id = 'VigenciaInicial' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Vigencia Final:</label>";
                            html += "<input type = 'date' class ='form-control' name = 'VigenciaFinal' id = 'VigenciaFinal' required />";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Forma de Pago:</label>";
                            html += "<select class ='form-control' name = 'FormaPago' id = 'FormaPago' >";
                                html += "<option value='' selected>Seleccione</option>";
                                for( var i = 0; i < data.FormaPago.length; i++ ){
                                    html += "<option value='"+data.FormaPago[i]['Hash']+"' >"+data.FormaPago[i]['FormaPago']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'>Lugar:</label>";
                            html += "<input type = 'text' class ='form-control' autocomplete = 'off' name = 'Lugar' id = 'Lugar' required />";
                        html += "</div>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'>Notificar a:</label>";
                            html += "<input type = 'email' class ='form-control' autocomplete = 'off' name = 'Correo' id = 'Correo' required />";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Observaciones:</label>";
                            html += "<textarea class = 'form-control' name = 'Observaciones' id = 'Observaciones'></textarea>";
                        html += "</div>";
                    html += "</div>";
                    html += "<hr>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0)'>Cerrar</button>";
                        html += "<button type='buttom' class='btn btn-primary' onclick = 'SendOC()'>Crear Orden de Compra</button>";
                    html += "</div>";
                html += "</div>";

                html += "<div class = 'ChildTabsMenu TabsMenu2'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'>Buscar:</label>";
                            html += "<input type = 'text' name = 'TextBusqueda' id = 'TextBusqueda' class = 'form-control'>";
                        html += "</div>";
                        
                        html += "<div class='col col-sm-3 my-2 CenterText'>";
                            html += "<p></p>";
                            html += "<img src ='../images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaListarOrdenesCompra()'/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<br>"
                    html += "<table class = 'tableNew' id = 'TablaOrdenes'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Número de Orden</th>"
                                html += "<th>Forma de Pago</th>"
                                html += "<th>Fecha Generación</th>"
                                html += "<th>Hora Generación</th>"
                                html += "<th>Generado Por</th>"
                                html += "<th>Descargar</th>"
                                html += "<th>Estado</th>"
                                html += "<th>Fecha Cancelación</th>"
                                html += "<th>Hora Cancelación</th>"
                                html += "<th>Cancelado Por</th>"
                                html += "<th>Motivo</th>"
                                html += "<th>¿Cancelar?</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>";

            html += "</div>";

        $(".content_modal").html(html);
        //OTCliente.listaInit()
        TablaListarOrdenesCompra();
        MostrarTabsMenu(1)
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        }
    })
}

function BuscarTablaListarOrdenesCompra(){
    $DataTable_OTProyectos.destroy()
    TablaListarOrdenesCompra();
}

function TablaListarOrdenesCompra() {
    $DataTable_OTProyectos = $('#TablaOrdenes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'3a8c1b2f41cf2e02672a0aefab299054',
            'data':function (d) {
                d.search['TextBusqueda'] = $("#TextBusqueda").val();
                d.search['Ppto'] = HashPpto;
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
               data: 'Id',
               "orderable": false,
               "render": function (data, type, full, meta) {
                    return '<center>'+data+'</center>';
                }

            },
            {
               data: 'FormaPago',
               "orderable": false,
               "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'FechaCrea',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCrea',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+full.Hash+' target = "_blank"><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                        return data;
                    }

            },
            {
            data: 'FechaCan',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
            data: 'HoraCan',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
                data: 'UsuarioCan',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'MotivoCancelacion',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'MotivoCancelacion',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.FechaCan == '' ){
                        ht = "<center><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'FormCancelarOC("+full.Hash+","+full.Id+")' /></center>"
                    }
                    return ht;
                }

            },
        ],
        "order": [[7, "DESC"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#TablaOrdenes').css({'width':'100%'})
}

function SendOC(){
    var Items = [];
    var Asoc = [];
    
    $('.ItemsOrdenes:checked').each(
        function() {
            Items.push({Id:$(this).val()});
        }
    );
    
    $('.ItemsOrdenesAsoc:checked').each(
        function() {
            Asoc.push({Id:$(this).val()});
        }
    );
    var NumSel = Items.length + Asoc.length;
    if( NumSel > 0 && $("#Proveedor").val().length > 0 && $("#FechaEntrega").val().length > 0 
            && $("#VigenciaInicial").val().length > 0 
            && $("#VigenciaFinal").val().length > 0 && $("#FormaPago").val().length > 0 
            && $("#FechaRadicacion").val().length > 0 
            ){
        var formData = new FormData();
        formData.append("Hash", HashPpto);
        formData.append("Items", JSON.stringify(Items));
        formData.append("Asoc", JSON.stringify(Asoc));
        formData.append("Proveedor", $("#Proveedor").val());
        formData.append("FechaEntrega", $("#FechaEntrega").val());
        formData.append("FechaRadicacion", $("#FechaRadicacion").val());
        formData.append("VigenciaInicial", $("#VigenciaInicial").val());
        formData.append("VigenciaFinal", $("#VigenciaFinal").val());
        formData.append("Lugar", $("#Lugar").val());
        formData.append("Correo", $("#Correo").val());
        formData.append("Observaciones", $("#Observaciones").val());
        formData.append("FormaPago", $("#FormaPago").val());
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'7774d6be72b3d7ff8985739097d8ae8c',
            success:function(data){
                window.open(UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+data.Info);
                location.reload();
            }
        })
    }else{
        alert("Debe diligenciar los campos Obligatorios (*)");
    }
}

function FormCancelarOC(Hash,Id){
    if( confirm("¿Está seguro(a) de Cancelar esta Orden de Compra?") ){
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Cancelar Órden de Compra # "+Id+"</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                        html += "<img src = '../images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
            html += "<input type = 'hidden' name = '_token' id = '_token' value = '"+document.getElementsByName('_token')[0].value+"' />"
            html += "<input type = 'hidden' name = 'Hash' id = 'Hash' value = '"+HashPpto+"' />"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Observaciones:</label>"
                        html += "<textarea class = 'form-control' name = 'ObservacionesPpto' id = 'ObservacionesPpto' required ></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary'  onclick = 'FormOP()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary' onclick = 'SendFormCancelarOC("+Hash+")'>Cancelar Órden</button>";
        html += "</div>";
        html += "</form>"
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg'); 
    }
}

function SendFormCancelarOC(Hash){
    if( $("#ObservacionesPpto").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'792a92e2eaf8f57f990ed34ef9087e57',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash:Hash,
                ObservacionesPpto:$("#ObservacionesPpto").val(),
            },
            success:function(data){
                alert("Se ha realizado la cancelación de manera Correcta.");
                location.reload();
            }
        });
    }else{
        alert("Debe ingresar la justificación de la cancelación.");
    }
    
}