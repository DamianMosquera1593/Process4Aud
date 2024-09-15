/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(".TituloPantalla").html("Informes - Tráfico Clientes");
    $(".alert-primary").css({
        'background-color':'#1B4075',
    })
    $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
        'color':'white'
    })
    //ModalEdit(1)
    //InformesTraClientes_OtsGeneral();
    //informeTotal()
    //InformesTraClientes_OtsGeneral3();
    //InformesTraClientes_OtsGeneral4();
});

var TotalOts = 0;

function VencimientosAdministrativos(){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'c50cb56aed832b28522210592567bdd3xs',
        
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table class = 'CabeceraVentanas' width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Vencimientos Administrativos</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar_white.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";

                
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principalesBorder '>Presupuesto Personal</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principalesBorder '>Prespuesto General</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Item</th>"
                        html += "<th>Entidad</th>"
                        html += "<th>Periodicidad</th>"
                        html += "<th>Fecha</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.PendientesAdministrativos.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Empresa']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['NombreItem']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Entidad']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Periodicidad']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['FechaLarga']+"</td>"

                        html += "</tr>"
                    }
                html += "</table>"

                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principalesBorder'>Documentos Legales</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Documento</th>"
                        html += "<th>Fecha</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.DocLegales.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['Empresa']+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['TipoDocumento']+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['FechaLarga']+"</td>"

                        html += "</tr>"
                    }
                html += "</table>"
            html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            ModalEdit(1) 
        }
    })
}

function informeTotal(){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'c50cb56aed832b28522210592567bdd3xs',
        
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table class = 'CabeceraVentanas' width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Informe Global</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar_white.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";

                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principales'>ALERTAS ADMINISTRATIVAS</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Presupuesto Personal</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Prespuesto General</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Item</th>"
                        html += "<th>Entidad</th>"
                        html += "<th>Periodicidad</th>"
                        html += "<th>Fecha</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.PendientesAdministrativos.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Empresa']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['NombreItem']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Entidad']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['Periodicidad']+"</td>"
                            html += "<td class = ''>"+data.PendientesAdministrativos[i]['FechaLarga']+"</td>"

                        html += "</tr>"
                    }
                html += "</table>"

                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Documentos Legales</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Documento</th>"
                        html += "<th>Fecha</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.DocLegales.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['Empresa']+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['TipoDocumento']+"</td>"
                            html += "<td class = ''>"+data.DocLegales[i]['FechaLarga']+"</td>"

                        html += "</tr>"
                    }
                html += "</table>"

                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principales'>BANCOS</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Saldo Banco 1: "+formatNumber.new( 0 )+"</td>"
                        html += "<td style = 'width:120px;'></td>"
                        html += "<td class = 'subtitulos_mes '>Saldo Banco 2: "+formatNumber.new( 0 )+"</td>"
                    html += "</tr>"
                html += "</table>"

                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principales'>CUENTAS GENERALES</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Cuentas Por Pagar: "+formatNumber.new( 0 )+"</td>"
                        html += "<td style = 'width:120px;'></td>"
                        html += "<td class = 'subtitulos_mes '>Cuentas Por Cobrar: "+formatNumber.new( 0 )+"</td>"
                    html += "</tr>"
                html += "</table>"

                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_principales'>PRODUCCIÓN</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td class = 'subtitulos_mes '>Facturas Pendientes Por Llegar: "+formatNumber.new( data.FacturasPtesXLlegar[0]['Num'] )+", Por valor de $ 0;</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            ModalEdit(1) 
        }
    })
       
}

function InformesTraClientes_OtsGeneral4(){
    var html = ""
        html += "<div class='modal-header' style = 'background: #86C8C2;padding:5px;'>";
            html += "<table class = 'CabeceraVentana'width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap style = 'vertical-align:middle;width:40%;padding-left:2px;'>"
                        html += "<img src = '"+UrlUniversal+"images/process_white.png' class = 'IconVentana' style = 'height:50px;'/>";
                    html += "</td>"
                    html += "<td nowrap style = 'vertical-align:middle;width:40%;padding-left:2px;'>"
                        html += "<img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' style = 'height:50px;' /> <span class = 'TituloBuscador2'>Informe Cuenta Yara</span>";
                    html += "</td>"
                    html += "<td style = 'padding-right:5px;text-align:right;'>"
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blanco.png' class = 'IconClose Cursor'  data-dismiss='modal' aria-label='Close' />";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Total Proyectos/OTs</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOtsGeneral'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = 'ResumenGraficas Global_OTs_Total'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                html += "<td style = 'text-align:center;width:15%;' >Tareas</td>"
                                html += "<td style = 'text-align:center;width:15%;' >Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Tareas'>0</div></td>"                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Piezas'>0</div></td>"                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Proyectos/OTs Por Estado</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = 'ResumenGraficas Global_OTs_Total'>"
                        html += "<table class = ''width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                html += "<td style = 'text-align:center;width:15%;' >Tareas</td>"
                                html += "<td style = 'text-align:center;width:15%;' >Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Tareas'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Piezas'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Activas'>"
                                html += "<td class = 'Report_N2_Tittle'>OTs Abiertas</td>"
                                html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Tareas'>0</div></td>"
                                html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Piezas'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Cerradas '>"
                                html += "<td class = 'Report_N3_Tittle'>OTs Cerradas</td>"
                                html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Tareas'>0</div></td>"
                                html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots_Piezas'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>";    
                //Totl por Producto.
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Por País Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Pais'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div /*style = 'height:200px;overflow-y:scroll;width:100%;'*/class = 'ResumenGraficas ReportData_Productos'>"
                        
                    html += "</div>"
                html += "</div>"
                
                //Total por Profesional.
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Por Profesional Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Profesional'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ResumenGraficas ReportData_Profesional'>"
                        
                    html += "</div>"
                html += "</div>"
                //Total por Departamento
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Por Departamento Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Departamento'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ResumenGraficas ReportData_Departamento'>"
                        
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<hr>"
            html += "<div class = 'DetalleGraficas' id = 'DetalleGraficas' style = 'width:100%;'>"
            html += "</div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'e2b67f3d0b438458c0c729db6f878e39',
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $(".ContentReportGraph").css({'height':'250px'})
            $(".ResumenGraficas").css({'font-size':'14px'})
            
            $(".Global_OTs_Total .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas)) )
            $(".Global_OTs_Total .Tittle_ReportTotal_Ots_Tareas").html(formatNumber.new(parseInt(data.TotalTareasProyectosProductos)+parseInt(data.TotalTareasCerradas)) )
            $(".Global_OTs_Total .Tittle_ReportTotal_Ots_Piezas").html(formatNumber.new(parseInt(data.TotalPiezasProductos)+parseInt(data.TotalPiezasTareasCerradas)) )
            
            $(".Global_OTs_Cerradas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)) )
            $(".Global_OTs_Cerradas .Tittle_ReportTotal_Ots_Tareas").html(formatNumber.new(parseInt(data.TotalTareasCerradas)) )
            $(".Global_OTs_Cerradas .Tittle_ReportTotal_Ots_Piezas").html(formatNumber.new(parseInt(data.TotalPiezasTareasCerradas)) )
            
            $(".Global_OTs_Activas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Activas)) )
            $(".Global_OTs_Activas .Tittle_ReportTotal_Ots_Tareas").html(formatNumber.new(parseInt(data.TotalTareasProyectosProductos)) )
            $(".Global_OTs_Activas .Tittle_ReportTotal_Ots_Piezas").html(formatNumber.new(parseInt(data.TotalPiezasProductos)) )
            
            Morris.Donut({
                element: 'Graph_TotalOtsGeneral',
                data: [

                  {label: "Total Ots", value: parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas),color:'#B9DED0'}
                ]
            });
            Morris.Donut({
                element: 'Graph_TotalOts',
                data: [

                  {label: "Cerradas", value: parseInt(data.OTs_Cerradas),color:'#FEDAA6'},
                  {label: "Activas", value: parseInt(data.OTs_Activas),color:'#B9DED0'}
                ]
            });
            
            var Productos = [];
            var htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Producto'>"
                htmlProductos += "<table class = 'dataTableFij' width = '100%'>"
                    htmlProductos += "<thead><tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >Tareas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% Tareas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>% Piezas</td>"
                    htmlProductos += "</tr></thead>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por País</td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalProductos)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalTareasProyectosProductos)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalPiezasProductos)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                    htmlProductos += "</tr><tbody>"
                //htmlProductos += "</table>"
            //htmlProductos += "</div>"

            var i = data.Colors.length-1;
            data.OtsProductos.forEach(obj => {
                //htmlProductos += "<div class = 'Report_N2_Tittle Global_OTs_Producto' style = 'background-color:"+data.Colors[i]['NumColor']+"'>"
                    //htmlProductos += "<table>"
                    var PorcentajeOts = (100*parseInt(obj['Cantidad']))/(data.TotalProductos);
                    var PorcentajeTareas = (100*parseInt(obj['Tareas']))/(data.TotalTareasProyectosProductos);
                    var PorcentajePiezas = (100*parseInt(obj['Piezas']))/(data.TotalPiezasProductos);
                        htmlProductos += "<tr>"
                            htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle Cursor NameDimensionProducto"+obj['Hash']+"' onclick = '_VisualDataOtsGeneral(2,"+obj['Hash']+")'>"+obj['Producto']+"</td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal' >"+formatNumber.new(parseInt(obj['Cantidad']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeOts.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal' >"+formatNumber.new(parseInt(obj['Tareas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeTareas.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Piezas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajePiezas.toFixed(1) )+" %</div></td>"
                        htmlProductos += "</tr>"
                    //htmlProductos += "</table>"
                //htmlProductos += "</div>"
                Productos.push({label:obj['Producto'],value:parseInt(obj['Cantidad']),color:data.Colors[i]['NumColor'], Piezas:parseInt(obj['Piezas']), Porcentaje_Ots: PorcentajeOts, Porcentaje_Piezas: PorcentajePiezas })
                i--;
            })
            htmlProductos += "</tbody></table>"
            htmlProductos += "</div>"
            $(".ReportData_Productos").html(htmlProductos);

            var Productos = Morris.Donut({
                element: 'Graph_TotalOts_Pais',
                data: Productos
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                displayData(i, row);
            });


            var Profesional = [];
            var i = data.Colors.length-1;
            htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Profesional'>"
                htmlProductos += "<table width = '100%'>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >Tareas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% Tareas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>% Piezas</td>"
                    htmlProductos += "</tr>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por Profesional</td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalProfesional)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalTareasProyectosProfesional)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalPiezasProfesional)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                    htmlProductos += "</tr>"
                //htmlProductos += "</table>"
            //htmlProductos += "</div>"
            data.OtsProfesional.forEach(obj => {
                //htmlProductos += "<div class = 'Report_N2_Tittle Global_OTs_Profesional' style = 'background-color:"+data.Colors[i]['NumColor']+"'>"
                    //htmlProductos += "<table>"
                    var PorcentajeOts = (100*parseInt(obj['Cantidad']))/(data.OTs_Activas);
                    var PorcentajeTareas = (100*parseInt(obj['Tareas']))/(data.TotalTareasProyectosProfesional);
                    var PorcentajePiezas = (100*parseInt(obj['Piezas']))/(data.TotalPiezasProfesional);
                        htmlProductos += "<tr>"
                            htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle Cursor NameDimensionProfesional"+obj['Hash']+"'onclick = '_VisualDataOtsGeneral(3,"+obj['Hash']+")'>"+obj['Profesional']+"</td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Cantidad']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeOts.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Tareas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeTareas.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Piezas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajePiezas.toFixed(1) )+" %</div></td>"
                        htmlProductos += "</tr>"
                    //htmlProductos += "</table>"
                //htmlProductos += "</div>"
                Profesional.push({label:obj['Profesional'],value:parseInt(obj['Cantidad']),color:data.Colors[i]['NumColor'], Piezas:parseInt(obj['Piezas']), Porcentaje_Ots: PorcentajeOts, Porcentaje_Piezas: PorcentajePiezas })
                i--;
            })
            htmlProductos += "</table>"
            htmlProductos += "</div>"
            $(".ReportData_Profesional").html(htmlProductos);
            Morris.Donut({
                element: 'Graph_TotalOts_Profesional',
                data: Profesional
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                console.log(row)
                displayData(i, row);
            });

            var Profesional = [];
            var i = data.Colors.length-1;
            htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Profesional'>"
                htmlProductos += "<table width = '100%'>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        //htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                    htmlProductos += "</tr>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por Departamento</td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Ots_Digital[0]['Ots']) + parseInt(data.Ots_Creativos[0]['Ots']) + parseInt(data.Ots_Ejecutivos[0]['Ots']) + data.Ots_PteCliente.length )+"</div></td>"
                        //htmlProductos += "<td><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(data.TotalPiezasProfesional)+"</span></td>"
                    htmlProductos += "</tr>"

                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle'>Creativos</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Ots_Creativos[0]['Ots']))+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
            Profesional.push({label:'Creativos',value:parseInt(data.Ots_Creativos[0]['Ots']),color:data.Colors[0]['NumColor']})

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'>Digital</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Ots_Digital[0]['Ots']))+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
            Profesional.push({label:'Digital',value:parseInt(data.Ots_Digital[0]['Ots']),color:data.Colors[1]['NumColor']})

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[2]['NumColor']+"' class = 'Report_N2_Tittle'>Ejecutivos</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[2]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Ots_Ejecutivos[0]['Ots']))+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
            Profesional.push({label:'Ejecutivos',value:parseInt(data.Ots_Ejecutivos[0]['Ots']),color:data.Colors[2]['NumColor']})

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle'>Pte Cliente</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.Ots_PteCliente.length)+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
                htmlProductos += "</table>"
            htmlProductos += "</div>"
            Profesional.push({label:'Pte Cliente',value:parseInt(data.Ots_PteCliente.length),color:data.Colors[3]['NumColor']})


            $(".ReportData_Departamento").html(htmlProductos);
            Morris.Donut({
                element: 'Graph_TotalOts_Departamento',
                data: Profesional
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                console.log(row)
                displayData(i, row);
            });
            html += "</table>"
            $('.FilterReport_YearOT_Data').html(html)
            
            /*
            $('.dataTableFij').DataTable( {
        scrollY:        "300px",
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            left: 1,
            right: 1
        }
    } );*/
        }
    })
}


function _VisualDataOtsGeneral(Tipo,Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'f309d8563d70b278a105255f8552d371',
        data:{
            Tipo:Tipo,
            Hash:Hash,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Titulo = "";
            var Namex = "";
            if( Tipo == 2 ){
                Titulo = "País "+$(".NameDimensionProducto"+Hash).text()
                Namex = $(".NameDimensionProducto"+Hash).text()
            }
            if( Tipo == 3 ){
                Titulo = "Profesional " + $(".NameDimensionProfesional"+Hash).text()
                Namex = $(".NameDimensionProfesional"+Hash).text()
                console.log($(".Profesionales"+Hash).text())
            }
            
            var Eje = data.ProyectosActivos.length - (data.PTE_Proyectos + data.Creativos_Proyectos);
            if( Eje < 0 ){
                Eje = (-1)*Eje;
            }
            var html = "";
                html += "<div class = 'MainGraf' style = 'width:100%;border:0px;'>"
                    html += "<div class = 'form-row'>";    
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<div class = 'MainGraf' style = 'width:100%;'>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<th class = 'TituloTablasResumen'>Total Departamento Activas "+Titulo+"</th>"
                                    html += "</tr>"
                                html += "</table>"
                                html += "<div class = 'ContentReportGraph' id = 'EstadosOTsClientesDistribucionTotal'></div>"
                            html += "</div>"

                            html += "<hr>"
                            html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Profesional'>"
                                html += "<div class = 'ResumenGraficas Global_OTs_Total_Profesional'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td ></td>"
                                            html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                            html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td class = 'Report_Firt_Tittle'>Total Por Departamento</td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas) + parseInt(data.Ejecutivos_Piezas) + parseInt(data.PTE_Piezas) )+"</div></td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<div class = 'MainGraf' style = 'width:100%;'>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<th class = 'TituloTablasResumen'>Departamento Activas "+Titulo+"</th>"
                                    html += "</tr>"
                                html += "</table>"
                                html += "<div class = 'ContentReportGraph' id = 'EstadosOTsClientesDistribucion'></div>"
                            html += "</div>"

                            html += "<hr>"
                            html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Profesional'>"
                                var Summary = [];
                                Summary.push({label:"Creativos",value:parseInt(data.Creativos_Proyectos),color:data.Colors[0]['NumColor']})
                                //Summary.push({label:"Digital",value:parseInt(data.Digital_Proyectos),color:data.Colors[2]['NumColor']})
                                Summary.push({label:"Pendientes de Revisión Cliente",value:parseInt(data.PTE_Proyectos),color:data.Colors[3]['NumColor']})

                                
                                Summary.push({value:Eje,label:'Ejecutivos',color:data.Colors[1]['NumColor']});
                                Summary.push({value:data.TotalR1,label:'Solicitudes/R1',color:data.Colors[5]['NumColor']});

                                html += "<div class = 'ResumenGraficas Global_OTs_Total_Profesional'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td ></td>"
                                            html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                            html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td class = 'Report_Firt_Tittle' >Total Proyectos/Ots Por Departamento</td>"
                                            html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas) + parseInt(data.Ejecutivos_Piezas) + parseInt(data.PTE_Piezas) )+"</div></td>"
                                        html += "</tr>"
                                var TotalPiezas = 0;
                                        html += "<tr>"
                                            if( Tipo == 2 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",2)'>Solicitudes/R1</td>"
                                            }
                                            if( Tipo == 3 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",3)'>Solicitudes/R1</td>"
                                            }
                                            
                                            html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.TotalR1))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.TotalR1_Piezas))+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                                    if( Tipo == 2 ){
                                                            html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+"2)'>Creativos</td>"
                                                    }
                                                    if( Tipo == 3 ) {
                                                            html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",3)'>Creativos</td>"
                                                    }
                                                    html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Proyectos))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas))+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'>Ejecutivos</td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle' nowrap ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(Eje)+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(Eje)+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            if( Tipo == 2 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_GenerarListaOtsEntregables(2,256,4,0,"+Hash+")' >Pendiente Cliente</td>"
                                            }
                                            if( Tipo == 3 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_GenerarListaOtsEntregables(2,256,4,"+Hash+",0)'>Pendiente Cliente</td>"
                                            }

                                            html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.PTE_Piezas))+"</div></td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>"

                html += "<hr>"
                
                html += "<div style = 'width:100%;overflow-x:scroll;' class = 'DetalleOtsCliente'></div>"
                    
                $(".DetalleGraficas").html(html);
                $(".ContentReportGraph").css({'height':'250px'})
                $(".ResumenGraficas").css({'font-size':'14px'})
                Morris.Donut({
                    element: 'EstadosOTsClientesDistribucionTotal',
                    data: [{label:Namex,value:parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos),color:data.Colors[0]['NumColor']}]
                }).on('click', function (i, row) {  
                    // Do your actions
                    // Example:
                    displayData(i, row);
                });
                Morris.Donut({
                    element: 'EstadosOTsClientesDistribucion',
                    data: Summary
                }).on('click', function (i, row) {  
                    // Do your actions
                    // Example:
                    displayData(i, row);
                });

                window.location.hash = '#DetalleGraficas'
        }
    })
}

function _ListarRequerimientos(Hash,Tipo){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf862req',
        data:{
            Hash:Hash,
            Tipo:Tipo,
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var TotalPiezas = 0;
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<th colspan = '12' class = 'TituloTablasResumen'>Requerimientos Pendientes de Gestión</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>No</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap># Requerimiento</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Código OT</th>"
                    
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Asunto</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Nro. Piezas</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Fecha Creación</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Hora Creación</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>País / Producto</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Profesional</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Estado Actual</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Fecha de Entrega</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' nowrap>Ultimo Estatus</th>"
                    
                html += "</tr>"
                for( var i = 0; i < data.Info.length; i++ ){
                    var Options = "";
                        var Style = '';
                        if( data.Info[i]['IdEstado'] == 1 ){
                            Style = 'background-color:#ADEDAE;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'PTN_OT'>Pendiente de Cliente</option>"
                                Options += "<option value = 'DTN_OT'>Detener</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 2 ){
                            Style = 'background-color:#a03c3c;color:white;'
                            var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 3 ){
                            Style = 'background-color:#ff9e0d;'
                            Options = "<select class = 'form-control' style = 'width:200px;'  id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 4 ){
                            Style = 'background-color:#EABF5E;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }
                    html += "<tr>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo_Center '>"+data.Info[i]['NumRequerimiento']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo >"+data.Info[i]['NumOt']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo >"+data.Info[i]['NumOt']+"</td>"
                        
                        html += "<td nowrap class = 'TablaReportes_Cuerpo'>"+data.Info[i]['Asunto']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo_Center'>"+data.Info[i]['NroPiezas']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo'>"+data.Info[i]['FechaC']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo_Center'>"+data.Info[i]['HoraC']+"</td>"
                        
                        html += "<td nowrap class = 'TablaReportes_Cuerpo'style = '"+Style+"' >"+data.Info[i]['Producto']+"</td>"
                        
                        
                        html += "<td nowrap class = 'TablaReportes_Cuerpo' >"+data.Info[i]['Creador']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo' >"+data.Info[i]['NEstado']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo' >"+data.Info[i]['FechaEntrega']+"</td>"
                        html += "<td nowrap class = 'TablaReportes_Cuerpo' >"+data.Info[i]['Estatus']+"</td>"
                        //html += "<td class = 'CenterText'>"+formatNumber.new(Piezas)+"</td>"
                        
                    html += "</tr>"
                }
            html += "</table><br>"
            $(".DetalleOtsCliente").html(html);
        }
    });
}


function InformesTraClientes_OtsGeneral(){
    printDataAjax('1a1007a957343c23e0bf7f697221ea472', {}, (data)=>{
        var html = "";
            html += "<div class='modal-header'>";
                html += "<table class = 'CabeceraVentanas' width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Informe de Proyectos / Ots</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar_white.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>"
                    html += "<div class='form-group col-md-4'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '4' class = 'TituloTablasResumen'>Solicitudes Pendientes</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Tipo</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Numero</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Piezas</td>"
                            html += "</tr>"
                            var TotalSol = 0;
                            var TotalPiezas = 0;
                            for(var i = 0; i < data.DataSemanas['Solicitudes'].length; i++){
                                TotalSol += parseInt(data.DataSemanas['Solicitudes'][i]['Cantidad']);
                                TotalPiezas = parseInt(data.DataSemanas['Solicitudes'][i]['Piezas']);
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['Solicitudes'][i]['TipoSolicitud']+"</td>"
                                    html += "<td class = 'CenterText'>"+data.DataSemanas['Solicitudes'][i]['Cantidad']+"</td>"
                                    html += "<td class = 'CenterText'>"+data.DataSemanas['Solicitudes'][i]['Piezas']+"</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center'>Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+formatNumber.new(TotalSol)+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+formatNumber.new(TotalPiezas)+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    html += "<div class='form-group col-md-4'>"
                        html += "<table  class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '4' class = 'TituloTablasResumen'>Ots Activas</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Año</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Mes</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número</td>"
                            html += "</tr>"
                            var TotalOtsActivas = 0;
                            for(var i = 0; i < data.DataSemanas['Ots_Activas'].length; i++){
                                TotalOtsActivas += parseInt(data.DataSemanas['Ots_Activas'][i]['Numero']);
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['Ots_Activas'][i]['Anio']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['Ots_Activas'][i]['NomMes']+"</td>"
                                    html += "<td class = 'CenterText'>"+data.DataSemanas['Ots_Activas'][i]['Numero']+"</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' colspan = '2'>Total</td>"
                                html += "<td class = 'CenterText'>"+formatNumber.new(TotalOtsActivas)+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-4'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '4' class = 'TituloTablasResumen'>Proyectos / Ots Nuevos Del Mes por Semana</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Semana</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Porcentaje</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['Ots'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['Ots'][i]['Fecha']+"</td>"
                                    html += "<td class = 'CenterText'>"+data.DataSemanas['Ots'][i]['Numero']+"</td>"
                                    var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center'>Total</td>"
                                html += "<td class = 'CenterText'>"+data.DataSemanas['TotalOts']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>100%</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                html += "</div>"
                html += "<div class = 'form-row'>"
                    html += "<div class='form-group col-md-3'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '4' class = 'TituloTablasResumen'>Tareas Nuevas Creativos - Pendientes</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Ots</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td >1</td>"
                                html += "<td class = 'CenterText'>"+data.DataSemanas['Ots_Creativos_Nuevas'].length+"</td>"
                                html += "<td class = 'CenterText'>"+data.DataSemanas['TotalNuevasCreativos']['Tareas']+"</td>"
                                html += "<td class = 'CenterText'>"+data.DataSemanas['TotalNuevasCreativos']['Piezas']+"</td>"
                                
                            html += "</tr>"
                            
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Tareas de Ajuste Creativos - Pendientes</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Ots</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            for(var tp = 0; tp < data.DataSemanas['TareasAjustes_Creativos'].length; tp++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Total'>"+data.DataSemanas['TareasAjustes_Creativos'][tp]['TipoProceso']+"</td>"
                                    html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TareasAjustes_Creativos'][tp]['Ots']+"</td>"
                                    html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TareasAjustes_Creativos'][tp]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TareasAjustes_Creativos'][tp]['Piezas']+"</td>"
                                html += "</tr>"
                            }
                            /*
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['Ots_Creativos_Ajuste']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalAjustesCreativos']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalAjustesCreativos']['Piezas']+"</td>"
                            html += "</tr>"*/
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Pendientes Ejecutivos</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Ots</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' >"+data.DataSemanas['Ots_PendientesACliente']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalEjecutivos']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalEjecutivos']['Piezas']+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table class = 'tableNew' width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Enviado a Cliente</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Ots</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['Ots_Cliente']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.DataSemanas['TotalCliente']['Piezas'])+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                for(var tp = 0; tp < data.DataSemanas['SemanasDias'].length;tp++){
                    html += "<div class = 'form-row'>"
                        html += "<div class='form-group col-md-12'>";
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<th colspan = '21' class = 'TituloTablasResumen'>ENTREGABLES PENDIENTES SEMANA "+data.DataSemanas['SemanasDias'][tp]['Semana']+"</th>"
                                html += "</tr>"
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas['SemanasDias'][tp]['Detalle'].length;y++){
                                        html += "<th class = 'TablaReportes_TituloPrincipal' colspan = '2' style = 'width:14.28%;'>"+data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Dia']+"</th>"
                                        html += "<th></th>"
                                    }
                                html += "</tr>"
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas['SemanasDias'][tp]['Detalle'].length;y++){
                                        if( data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Entregables'].length > 0 ){
                                            html += "<th class = 'TablaReportes_Cuerpo'>"
                                                html += "<table width = '100%'>"
                                                    for(var x = 0; x < data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Entregables'][0]['User'].length;x++){
                                                        html += "<tr>"
                                                            html += "<td  class = 'TablaReportes_Cuerpo' style = 'text-align:center;border:0px;'>"
                                                                html += "<img onerror = this.src='images/foto.png' src = '"+UrlUniversal+"../storage/app/Usuarios/"+data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Entregables'][0]['User'][x]['ImgUsuario']+"' class = 'rounded-circle' style = 'height:35px;'/>"
                                                            html += "</td>"
                                                            html += "<td  class = 'TablaReportes_Cuerpo' style = 'border:0px;'>"+data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Entregables'][0]['User'][x]['NombreUsuario']+"</td>"
                                                        html += "</tr>"
                                                    }
                                                html += "</table>"
                                            html += "</th>"
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['SemanasDias'][tp]['Detalle'][y]['Entregables'][0]['Piezas']+"</th>"
                                            html += "<th></th>"
                                        }else{
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'></th>"
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'>0</th>"
                                            html += "<th></th>"
                                        }
                                    }
                                html += "</tr>"
                                
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                    
                }
                
                
            html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        ModalEdit(1)
        /*var Summary = [];
        var Summary_Table = "";
        TotalOts = parseInt(data.TotalOts);
        for(var i = 0; i < data.TraficoEstados.length;i++){
            Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.TraficoEstados[i]['Cantidad'], label:data.TraficoEstados[i]['Estado']})
            
            var Porcen = data.TraficoEstados[i]['Cantidad']/TotalOts;
            Summary_Table += "<tr>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+(i+1)+"</td>"
                Summary_Table += "<td class = 'td_cuerpo_table'>"+data.TraficoEstados[i]['Estado']+"</td>"
                Summary_Table += "<td class = 'BorderCero'></td>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+formatNumber.new(data.TraficoEstados[i]['Cantidad'])+"</td>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+(Porcen.toFixed(2))+" % </td>"
            Summary_Table += "</tr>"
        }
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Informe de Proyectos / Ots</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div style = 'height:400px;width:100%;' class = 'Informes_DivGrafEstados' id = 'Informes_DivGrafEstados'></div>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<th class = 'CenterText cabecera_th_dark'>No.</th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Concepto</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Cantidad</th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Porcentaje</th>"
                    html += "</tr>"
                    
                html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            
            
            var chart = new CanvasJS.Chart("Informes_DivGrafEstados", {
                animationEnabled: true,
                backgroundColor:"transparent",
                title:{
                    text: "Proyectos/Ots Por Estado",
                    fontFamily: "Century Gothic",
                    fontSize: 16
                },
                legend: {
                    fontSize: 14,
                    horizontalAlign: "left", // "center" , "right"
                    verticalAlign: "center",  // "top" , "bottom"
                    fontFamily: "Century Gothic",
                },
                data: [{
                        type: "pie",
                        startAngle: 240,
                        showInLegend: true,
                        yValueFormatString: "##0",
                        legendText: "{label}: {y}",
                        indexLabel: "{label}: {y}",
                        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                        valueRepresents: "area",
                        dataPoints:  Summary
                }]
            });
            
            //Porcentaje:
            var dataPoint = chart.options.data[0].dataPoints;
            var total = TotalOts;
            for(var i = 0; i < dataPoint.length; i++) {
                chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chart.render();

            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            */
        }
    )
}

function InformesTraClientes_OtsGeneral3(){
    printDataAjax('1a1007a957343c23e0bf7f697221ea47', {}, (data)=>{
        var html = ""
        html += "<div class='modal-header' style = 'background: #86C8C2;padding:5px;'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap style = 'vertical-align:middle;width:40%;padding-left:2px;'>"
                        html += "<img src = '"+UrlUniversal+"images/process_white.png' class = 'IconVentana' style = 'height:50px;'/>";
                    html += "</td>"
                    html += "<td nowrap style = 'vertical-align:middle;width:40%;padding-left:2px;'>"
                        html += "<img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' style = 'height:50px;' /> <span class = 'TituloBuscador2'>Informe Cuenta Yara</span>";
                    html += "</td>"
                    html += "<td style = 'padding-right:5px;text-align:right;'>"
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blanco.png' class = 'IconClose Cursor'  data-dismiss='modal' aria-label='Close' />";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Total Proyectos/OTs</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOtsGeneral'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = ' Global_OTs_Total'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                //html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen'>Proyectos/OTs Por Estado</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = 'Global_OTs_Total'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                //html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Activas '>"
                                html += "<td class = 'Report_N2_Tittle'>OTs Abiertas</td>"
                                html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Cerradas'>"
                                html += "<td class = 'Report_N3_Tittle'>OTs Cerradas</td>"
                                html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>"; 
            html += "<hr>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<th class = 'TituloTablasResumen'>DETALLE OTS POR PAÍS Y PROFESIONAL</th>"
                    html += "</tr>"
                html += "</table>"
                html += "<div class='col col-sm-12 my-2' style = 'overflow-x:scroll;'>";
                    html += "<div style = 'width:100%;'><table width = '100%'>"
                        html += "<tr>"
                        for(var i = 0; i < data.Productos.length; i++){
                            html += "<td style = 'border:2px solid white;padding:10px;vertical-align:top;' nowrap>"
                                html += "<div class = 'MainGraf' style = 'width:100%;'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<th class = 'TituloTablasResumen'>Activas, País: "+data.Productos[i]['Nombre']+"</th>"
                                        html += "</tr>"
                                    html += "</table>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td style = 'width:50%;border:0px;'>"
                                                html += "<div class = 'ContentReportGraph' style = 'border:0px;' id = 'TGraph_TotalOts_Pais"+data.Productos[i]['Id']+"'></div>"
                                            html += "</td>"
                                            html += "<td style = 'width:50%;border:0px;'>"
                                                html += "<div class = 'ContentReportGraph' style = 'border:0px;' id = 'Graph_TotalOts_Pais"+data.Productos[i]['Id']+"'></div>"
                                            html += "</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            for(var x = 0; x < data.Productos[i]['Usuarios'].length; x++){
                                                html += "<td style = 'vertical-align:top;text-align:center;'>"
                                                    html += "<div class = 'MainGraf' >"
                                                        html += "<table width = '100%'>"
                                                            html += "<tr>"
                                                                html += "<th class = 'TituloTablasResumen' nowrap>Profesional: "+data.Productos[i]['Usuarios'][x]['NombreUsuario']+"</th>"
                                                            html += "</tr>"
                                                        html += "</table>"
                                                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Prof"+data.Productos[i]['Usuarios'][x]['IdUsuario']+"'></div>"
                                                        if( data.Productos[i]['Usuarios'][x]['Capacitacion'] == "No" ){
                                                            html += "<p style = 'color:red;font-size:12px;'>Sin Capacitar</p>"
                                                        }else{
                                                            html += "<p style = 'color:green;font-size:12px;'>Capacitado el "+data.Productos[i]['Usuarios'][x]['FechaCap']+"</p>"
                                                        }
                                                        html += "<hr>"
                                                        
                                                        html += "<div style = 'height:250px;width:100%;overflow-x:scroll;'>"
                                                            
                                                            var Urgentes = 0;
                                                            var Urgentes_Piezas = 0;
                                                            var Urgentes_Sol = 0;
                                                            var Normales = 0;
                                                            var Normales_Piezas = 0;
                                                            for(var t = 0; t < data.Productos[i]['Usuarios'][x]['Req'].length; t++){
                                                                if( data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Necesidad'] < 2 ){
                                                                    Urgentes += 1;
                                                                    Urgentes_Piezas += parseInt(data.Productos[i]['Usuarios'][x]['Req'][t]['Piezas'][0]['Cantidad'])
                                                                }else{
                                                                    Normales += 1;
                                                                    Normales_Piezas += parseInt(data.Productos[i]['Usuarios'][x]['Req'][t]['Piezas'][0]['Cantidad'])
                                                                }
                                                                if( data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Necesidad'] < 2  && data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Entrega'] < 2){
                                                                    Urgentes_Sol += 1;
                                                                }
                                                            }
                                                            html += "<table width = '100%'>"
                                                                html += "<tr>"
                                                                    html += "<th colspan = '5' class = 'TituloTablasResumen'>RESUMEN SOLICITUDES</th>"
                                                                html += "</tr>"
                                                                html += "<tr>"
                                                                    html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                                                    html += "<td class = 'TablaReportes_TituloPrincipal'>Concepto</td>"
                                                                    html += "<td class = 'TablaReportes_TituloPrincipal'>#</td>"
                                                                    html += "<td class = 'TablaReportes_TituloPrincipal'>No. Piezas</td>"
                                                                    html += "<td class = 'TablaReportes_TituloPrincipal'>%</td>"
                                                                html += "<tr>"
                                                                html += "<tr>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>1</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo'>Solicitudes Urgentes</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Urgentes+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(Urgentes_Piezas)+"</td>"
                                                                    if( Urgentes == 0 ){
                                                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>0 %</td>"
                                                                    }else{
                                                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+ ((Urgentes*100)/data.Productos[i]['Usuarios'][x]['Req'].length).toFixed(2) +" %</td>"
                                                                    }
                                                                    
                                                                html += "<tr>"
                                                                html += "<tr>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>2</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo'>Solicitudes Normales</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Normales+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(Normales_Piezas)+"</td>"
                                                                    if( Normales == 0 ){
                                                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>0 %</td>"
                                                                    }else{
                                                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+ ((Normales*100)/data.Productos[i]['Usuarios'][x]['Req'].length).toFixed(2) +" %</td>"
                                                                    }
                                                                html += "<tr>"
                                                                html += "<tr>"
                                                                    html += "<td class = 'TablaReportes_Total' colspan = '2'>Total</td>"
                                                                    html += "<td class = 'TablaReportes_Total_Center'>"+data.Productos[i]['Usuarios'][x]['Req'].length+"</td>"
                                                                    html += "<td class = 'TablaReportes_Total_Center'>"+formatNumber.new(Normales_Piezas+Urgentes_Piezas)+"</td>"
                                                                    html += "<td class = 'TablaReportes_Total_Center'>100 %</td>"
                                                                html += "<tr>"
                                                            html += "</table>"
                                                            
                                                            html += "<hr>"
                                                            html += "<table class = 'DetalleReqProfesionales' >"
                                                            html += "<tr>"
                                                                html += "<th colspan = '11' class = 'TituloTablasResumen'>DETALLE REQUERIMIENTOS</th>"
                                                            html += "</tr>"
                                                            html += "<tr>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>No. Requerimiento</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal' style = 'width:250px;'>Asunto</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal' >Piezas</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal' >Estado</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha Solicitud</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Hora Solicitud</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha Necesidad</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Diferencia</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha Entrega</td>"
                                                                html += "<td class = 'TablaReportes_TituloPrincipal'>Diferencia</td>"
                                                            html += "</tr>"
                                                            for(var t = 0; t < data.Productos[i]['Usuarios'][x]['Req'].length; t++){
                                                                var Color1 = "";
                                                                var Color2 = "";
                                                                
                                                                if( data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Necesidad'] < 2 ){
                                                                    Color1 = "style = 'background-color:red;color:white;font-weight:bold;'"
                                                                    Urgentes += 1;
                                                                }else{
                                                                    Normales += 1;
                                                                }
                                                                
                                                                if( data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Entrega'] < 2 ){
                                                                    Color2 = "style = 'background-color:red;color:white;font-weight:bold;'"
                                                                }
                                                                html += "<tr>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(t+1)+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center Cursor' style = 'text-decoration:underline;' onclick = 'Informes_HistoricoRequerimientos("+data.Productos[i]['Usuarios'][x]['Req'][t]['Id']+")'>"+data.Productos[i]['Usuarios'][x]['Req'][t]['Id']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo' style = 'width:250px;white-space: normal;'>"+data.Productos[i]['Usuarios'][x]['Req'][t]['Asunto']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"+data.Productos[i]['Usuarios'][x]['Req'][t]['Piezas'][0]['Cantidad']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo' >"+data.Productos[i]['Usuarios'][x]['Req'][t]['NEstado']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo' >"+data.Productos[i]['Usuarios'][x]['Req'][t]['FechaC']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['Req'][t]['HoraC']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Productos[i]['Usuarios'][x]['Req'][t]['FechaSalida']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center' "+Color1+">"+data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Necesidad']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.Productos[i]['Usuarios'][x]['Req'][t]['FechaEntrega']+"</td>"
                                                                    html += "<td class = 'TablaReportes_Cuerpo_Center' "+Color2+">"+data.Productos[i]['Usuarios'][x]['Req'][t]['Diferencia_Sol_Entrega']+"</td>"
                                                                html += "</tr>"
                                                            }
                                                        html += "</table>"
                                                        
                                                        html += "</div>"
                                                    html += "</div>"
                                                    
                                                    
                                                html += "</td>"
                                            }
                                        html += "<tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</td>"
                        }
                        html += "</tr>"
                    html += "</table></div>"
                html += "</div>"
            html += "</div>"
            html += "<hr>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<th class = 'TituloTablasResumen' nowrap>CALENDARIO DE ENTREGAS POR SEMANA EN PROCESO</th>"
                html += "</tr>"
            html += "</table>"
            for(var tp = 0; tp < data.DataSemanas.length;tp++){
                    html += "<div class = 'form-row'>"
                        html += "<div class='form-group col-md-12'>";
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<th colspan = '21' class = 'TituloTablasResumen'>ENTREGABLES PENDIENTES SEMANA "+data.DataSemanas[tp]['Semana']+"</th>"
                                html += "</tr>"
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas[tp]['Detalle'].length;y++){
                                        html += "<th class = 'TablaReportes_TituloPrincipal' colspan = '2' style = 'width:14.28%;'>"+data.DataSemanas[tp]['Detalle'][y]['Dia']+"</th>"
                                        html += "<th></th>"
                                    }
                                html += "</tr>"
                                
                                
                                    
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas[tp]['Detalle'].length;y++){
                                        
                                        if( data.DataSemanas[tp]['Detalle'][y]['Entregables'].length > 0 ){
                                            html += "<th class = 'TablaReportes_Cuerpo_Center' colspan = '2' style = 'vertical-align:top;'><table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<th class = 'TablaReportes_TituloPrincipal'>Requerimiento</th>"
                                                    html += "<th class = 'TablaReportes_TituloPrincipal'>Solicitante</th>"
                                                    html += "<th class = 'TablaReportes_TituloPrincipal'>Piezas</th>"
                                                html += "</tr>"
                                                var Totalx = 0;
                                                for(var p = 0; p < data.DataSemanas[tp]['Detalle'][y]['Entregables'].length; p++){
                                                    var ColorAux = "";
                                                    if(  data.DataSemanas[tp]['Detalle'][y]['Entregables'][p]['Diferencia_Sol_Necesidad'] < 2){
                                                        ColorAux = "style = 'background-color:red;color:white;font-weight:bold;'"
                                                    }
                                                    html += "<tr>"
                                                        html += "<th class = 'TablaReportes_Cuerpo_Center' "+ColorAux+">"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][p]['Id']+"</th>"
                                                        html += "<th class = 'TablaReportes_Cuerpo' "+ColorAux+">"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][p]['NombreUsuario']+"</th>"
                                                        html += "<th class = 'TablaReportes_Cuerpo_Center' "+ColorAux+">"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][p]['Piezas']+"</th>"
                                                    html += "</tr>"
                                                    Totalx += parseInt(data.DataSemanas[tp]['Detalle'][y]['Entregables'][p]['Piezas'])
                                                }
                                                html += "<tr>"
                                                    html += "<th class = 'TablaReportes_Total' colspan = '2'>Total</th>"
                                                    html += "<th class = 'TablaReportes_Total_Center'>"+Totalx+"</th>"
                                                html += "</tr>"
                                            html += "</table></th>"
                                            html += "<th></th>"
                                        }else{
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'></th>"
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'>0</th>"
                                            html += "<th></th>"
                                        }
                                    }
                                html += "</tr>"
                                
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                    
                }
            
        html += "</div>";

        $(".content_modal").html(html);
        ModalEdit(1)
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        $(".ContentReportGraph").css({'height':'250px'})
        $(".Report_Firt_Tittle").css({'color':'white','font-size':'12px'})
        Morris.Donut({
            element: 'Graph_TotalOtsGeneral',
            data: [

              {label: "Total Ots", value: parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas),color:'#B9DED0'}
            ]
        });
        Morris.Donut({
            element: 'Graph_TotalOts',
            data: [

              {label: "Cerradas", value: parseInt(data.OTs_Cerradas),color:'#FEDAA6'},
              {label: "Activas", value: parseInt(data.OTs_Activas),color:'#B9DED0'}
            ]
        });
        $(".Global_OTs_Total .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas)) )
        $(".Global_OTs_Cerradas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)) )
        $(".Global_OTs_Activas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Activas)) )
        
        for(var i = 0; i < data.Productos.length; i++){
            var Total = parseInt(data.Productos[i]['OtsActivas'])+parseInt(data.Productos[i]['Pte']);
            Morris.Donut({
                element: 'TGraph_TotalOts_Pais'+data.Productos[i]['Id'],
                data: [

                  {label: "Total", value:Total ,color:'#FEDAA6'}
                ]
            });
            Morris.Donut({
                element: 'Graph_TotalOts_Pais'+data.Productos[i]['Id'],
                data: [

                  {label: "Activas", value: parseInt(data.Productos[i]['OtsActivas']),color:'#FEDAA6'},
                  {label: "Pte Cliente", value: parseInt(data.Productos[i]['Pte']),color:'#B9DED0'},
                ]
            });
            for(var x = 0; x < data.Productos[i]['Usuarios'].length; x++){
                Morris.Donut({
                    element: 'Graph_TotalOts_Prof'+data.Productos[i]['Usuarios'][x]['IdUsuario'],
                    data: [

                      {label: "Activas", value: parseInt(data.Productos[i]['Usuarios'][x]['OtsActivas']),color:'#FEDAA6'},
                      {label: "Pte Cliente", value: parseInt(data.Productos[i]['Usuarios'][x]['OtsPte']),color:'#B9DED0'},
                    ]
                });
            }
        }
    })
}

function Informes_HistoricoRequerimientos(Hash){
    var formData = new FormData();
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
            url: UrlGeneral+'c50cb56aed832b28522210592567bdd3x',
            success:function(data){
                ModalEdit(0)
                var html = ""
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Histórico Estatus Requerimiento # "+Hash+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<table class = 'tableNew'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th >No.</th>"
                                html += "<th>Fecha</th>"
                                html += "<th>Hora</th>"
                                html += "<th>Generado Por</th>"
                                html += "<th>Estatus</th>"
                            html += "</tr>"
                        html += "</thead>"
                        for( var i = 0; i < data.Info.length; i++ ){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td class = 'CenterText'>"+data.Info[i]['FechaC']+"</td>"
                                html += "<td class = 'CenterText'>"+data.Info[i]['HoraC']+"</td>"
                                html += "<td style = 'text-align:justify;'>"+data.Info[i]['Creador']+"</td>"
                                html += "<td style = 'text-align:justify;'>"
                                    html += data.Info[i]['Status']
                                    if( data.Info[i]['Adjuntos'].length > 0 ){
                                        html += "<hr>"
                                        html += "<table style = 'width:100%;'>"
                                            html += "<tr>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>No.</th>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Nombre</th>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Descargar</th>"
                                            html += "</tr>"
                                            for(var x = 0; x < data.Info[i]['Adjuntos'].length; x++){
                                                html += "<tr>"
                                                    html += "<td class = 'subtitulos_principales CenterText'>"+(x+1)+"</td>"
                                                    html += "<td class = 'subtitulos_principales'>"+data.Info[i]['Adjuntos'][x]['Archivo']+"</td>"
                                                    html += "<td class = 'subtitulos_principales'>"
                                                    if(data.Info[i]['Adjuntos'][x]['Tipo'] == 'Old'){
                                                        html += '<center><span onclick = "Tarea.downloadFile(\''+data.Info[i]['Adjuntos'][x]['Hash']+'\')">'
                                                            html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                                        html += '</span></center>'
                                                    }else{
                                                        html += '<center><span onclick = "RequerimientoCliente.Cliente_downloadFile(\''+Hash+'X'+data.Info[i]['Adjuntos'][x]['Hash']+'X2\')">'
                                                            html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                                        html += '</span></center>'
                                                    }
                                                        
                                                    html += "</td>"
                                                html += "</tr>"
                                            }
                                        html += "</table>"
                                    }
                                    
                                html += "</td>"
                            html += "</tr>"
                        }
                    html += "</table>"
                html += "</div>";
                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit2(1)
                ResizeModal(1)
            }
        })
}

function InformesTraClientes_OtsGeneral2(){
    printDataAjax('1a1007a957343c23e0bf7f697221ea47', {}, (data)=>{
        var html = "";
            html += "<div class='modal-header'>";
                html += "<table class = 'CabeceraVentana' width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Informe de Proyectos / Ots</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>"
                    html += "<div class='form-group col-md-3'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '4' class = 'TituloTablasResumen'>Proyectos / Ots Nuevos</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Porcentaje</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['Ots'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['Ots'][i]['Fecha']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['Ots'][i]['Numero']+"</td>"
                                    var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center'>Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalOts']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>100%</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Tareas Nuevas Creativos</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Tipo de Actividad</td>"
                                
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['TareasNuevas_Creativos'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasNuevas_Creativos'][i]['Fecha']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasNuevas_Creativos'][i]['TipoProceso']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasNuevas_Creativos'][i]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasNuevas_Creativos'][i]['Piezas']+"</td>"
                                    /*var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"*/
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' colspan = '2'>Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalNuevasCreativos']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalNuevasCreativos']['Piezas']+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Tareas de Ajuste Creativos</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Tipo de Actividad</td>"
                                
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['TareasAjustes_Creativos'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasAjustes_Creativos'][i]['Fecha']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasAjustes_Creativos'][i]['TipoProceso']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasAjustes_Creativos'][i]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasAjustes_Creativos'][i]['Piezas']+"</td>"
                                    /*var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"*/
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' colspan = '2'>Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalAjustesCreativos']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalAjustesCreativos']['Piezas']+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    html += "<div class='form-group col-md-3'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Pendientes Ejecutivos</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Tipo de Actividad</td>"
                                
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['TareasAjustes_Ejecutivos'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasAjustes_Ejecutivos'][i]['Fecha']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['TareasAjustes_Ejecutivos'][i]['TipoProceso']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasAjustes_Ejecutivos'][i]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['TareasAjustes_Ejecutivos'][i]['Piezas']+"</td>"
                                    /*var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"*/
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' colspan = '2'>Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalEjecutivos']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalEjecutivos']['Piezas']+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>"
                    html += "<div class='form-group col-md-3'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th colspan = '5' class = 'TituloTablasResumen'>Enviado a Cliente</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>No.</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Fecha</td>"
                                
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Cantidad Tareas</td>"
                                html += "<td class = 'TablaReportes_TituloPrincipal'>Número Piezas</td>"
                            html += "</tr>"
                            for(var i = 0; i < data.DataSemanas['EnviadoCliente'].length; i++){
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo'>"+data.DataSemanas['EnviadoCliente'][i]['Fecha']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['EnviadoCliente'][i]['Cantidad']+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas['EnviadoCliente'][i]['Piezas']+"</td>"
                                    /*var Por = 0;
                                    if( data.DataSemanas['TotalOts'] != 0 ){
                                        Por = (parseInt(data.DataSemanas['Ots'][i]['Numero']) / data.DataSemanas['TotalOts'])*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+Por.toFixed(2)+" %</td>"*/
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<td></td>"
                                html += "<td class = 'TablaReportes_Total_Center' >Total</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalCliente']['Tareas']+"</td>"
                                html += "<td class = 'TablaReportes_Total_Center'>"+data.DataSemanas['TotalCliente']['Piezas']+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        /*var Summary = [];
        var Summary_Table = "";
        TotalOts = parseInt(data.TotalOts);
        for(var i = 0; i < data.TraficoEstados.length;i++){
            Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.TraficoEstados[i]['Cantidad'], label:data.TraficoEstados[i]['Estado']})
            
            var Porcen = data.TraficoEstados[i]['Cantidad']/TotalOts;
            Summary_Table += "<tr>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+(i+1)+"</td>"
                Summary_Table += "<td class = 'td_cuerpo_table'>"+data.TraficoEstados[i]['Estado']+"</td>"
                Summary_Table += "<td class = 'BorderCero'></td>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+formatNumber.new(data.TraficoEstados[i]['Cantidad'])+"</td>"
                Summary_Table += "<td class = 'td_cuerpo_table_center'>"+(Porcen.toFixed(2))+" % </td>"
            Summary_Table += "</tr>"
        }
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Informe de Proyectos / Ots</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div style = 'height:400px;width:100%;' class = 'Informes_DivGrafEstados' id = 'Informes_DivGrafEstados'></div>"
                html += "<br>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<th class = 'CenterText cabecera_th_dark'>No.</th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Concepto</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Cantidad</th>"
                        html += "<th class = 'CenterText cabecera_th_dark'>Porcentaje</th>"
                    html += "</tr>"
                    
                html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            
            
            var chart = new CanvasJS.Chart("Informes_DivGrafEstados", {
                animationEnabled: true,
                backgroundColor:"transparent",
                title:{
                    text: "Proyectos/Ots Por Estado",
                    fontFamily: "Century Gothic",
                    fontSize: 16
                },
                legend: {
                    fontSize: 14,
                    horizontalAlign: "left", // "center" , "right"
                    verticalAlign: "center",  // "top" , "bottom"
                    fontFamily: "Century Gothic",
                },
                data: [{
                        type: "pie",
                        startAngle: 240,
                        showInLegend: true,
                        yValueFormatString: "##0",
                        legendText: "{label}: {y}",
                        indexLabel: "{label}: {y}",
                        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                        valueRepresents: "area",
                        dataPoints:  Summary
                }]
            });
            
            //Porcentaje:
            var dataPoint = chart.options.data[0].dataPoints;
            var total = TotalOts;
            for(var i = 0; i < dataPoint.length; i++) {
                chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chart.render();

            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            */
        }
    )
}

