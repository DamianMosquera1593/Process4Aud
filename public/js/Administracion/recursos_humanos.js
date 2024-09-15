var EmpresaName = "";

$(document).ready(function () {
    ContentList("InfoEmpresas")
});


function administracionCostoEmpleados(Hash, Hash2){
    renderModalEmpleadosActivosCosto(Hash, Hash2)
}
function administracionCostoVacacionesEmpleados(Hash, Hash2){
    renderModalEmpleadosActivosCostoVacaciones(Hash, Hash2)
}

function administracionSimuladorCostos(Hash, Hash2){
    var html = "";
    TituloVentana = "Simulador Costo"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "";
    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    
    html += "<div class=' FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Nombre Cargo:</label>"
                    html += "<input type = 'text' class = 'form-control' id = 'SIM_NameSimulador' />"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Salario Base:</label>"
                    html += "<input type = 'text' class = 'form-control SIM_SalarioBase' value = '0'  id = 'SIM_SalarioBase' onkeyup = 'FormatCampoNum(\"SIM_SalarioBase\",\"SIM_SalarioBase_real\")' />"
                    html += "<span style = 'display:none;' class = 'SIM_SalarioBase_real' id = 'SIM_SalarioBase_real'>0</span>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Beneficio No Prestacional:</label>"
                    html += "<input type = 'text' class = 'form-control SIM_SalarioNP' value = '0' id = 'SIM_SalarioNP' onkeyup = 'FormatCampoNum(\"SIM_SalarioNP\",\"SIM_SalarioNP_real\")'/>"
                    html += "<span style = 'display:none;' class = 'SIM_SalarioNP_real' id = 'SIM_SalarioNP_real'>0</span>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Bonos:</label>"
                    html += "<input type = 'text' class = 'form-control SIM_Bonos' value = '0' id = 'SIM_Bonos' onkeyup = 'FormatCampoNum(\"SIM_Bonos\",\"SIM_Bonos_real\")'/>"
                    html += "<span style = 'display:none;' class = 'SIM_Bonos_real' id = 'SIM_Bonos_real'>0</span>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Otros:</label>"
                    html += "<input type = 'text' class = 'form-control SIM_otros' value = '0'  id = 'SIM_otros' onkeyup = 'FormatCampoNum(\"SIM_otros\",\"SIM_otros_real\")'/>"
                    html += "<span style = 'display:none;' class = 'SIM_otros_real' id = 'SIM_otros_real'>0</span>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<p></p>"
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'GenerarSimuladorCargo("+Hash+",\""+Hash2+"\")'/>"
                html += "</div>"
            html += "</div><br>";
            html += "<div class = 'form-row ContenedorDataTable'>";
            html += "</div>"
    html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
}

function GenerarSimuladorCargo(Hash,Hash2){
    var Val = 0;
    if( $("#SIM_NameSimulador").val() == '' ){
        alert("Debe ingresar el Nombre del cargo.")
        Val++;
    }
    if( $("#SIM_SalarioBase").val() == '' ){
        alert("Debe ingresar el Salario Base.")
        Val++;
    }
    
    if( Val == 0 ){
       $.ajax({
            type:'POST',
            url: UrlGeneral+'604ffcff0d11d12b46e75082cf91d96f',
            data:{
                Hash:Hash,
                Hash2:Hash2,
                SalarioBase:$("#SIM_SalarioBase_real").text(),
                NoPrestacional:$("#SIM_SalarioNP_real").text(),
                Bonos:$("#SIM_Bonos_real").text(),
                Otros:$("#SIM_otros_real").text(),
                _token:document.getElementsByName('_token')[0].value
            },
            success:function(data){
                var html = ""
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<th colspan = '7'><h4>"+$("#SIM_NameSimulador").val()+"</h4></th>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Salario Base</td>"
                        html += "<td style = 'width:5%' class = ' td_cuerpo_table CenterText'>30 Días</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round(data.Costos.SalarioBase))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Salud</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Salud)+"</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round (data.Costos.D_Salud))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Beneficio No Prestacional</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>30 Días</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round (data.Costos.NoPrestacional))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Pensión</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Pension)+"</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round(data.Costos.D_Pension))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Bonos</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>30 Días</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round(data.Costos.Bonos))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Fondo de Solidaridad Pensional</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_FDS)+"</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round (data.Costos.TotalAportesFondoSolidaridad))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Otros</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>30 Días</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round(data.Costos.Otros))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Retención en la Fuente</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(0)+"</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round (0))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>Salario Base</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'>30 Días</td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalSalario))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%'></td>"
                        html += "<td style = 'width:5%' class = 'CenterText'></td>"
                        html += "<td style = 'width:10%'></td>"
                    html += "</tr>"
                    
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Auxilio de Transporte</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>30 Días</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.AuxTransporte))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>Total Aportes Empleado</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.AportesEmpleado))+"</td>"
                        
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>Total a Pagar</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'>30 Días</td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalSalario_Aux))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%'></td>"
                        html += "<td style = 'width:5%' class = 'CenterText'></td>"
                        html += "<td style = 'width:10%'></td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%'></td>"
                        html += "<td style = 'width:5%' class = 'CenterText'></td>"
                        html += "<td style = 'width:10%'></td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>Neto a recibir trabajador</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalRecibidoEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark Pendiente'>BASE PARA SEGURIDAD SOCIAL</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark Pendiente CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark Pendiente'>"+HtmlValores_Doble( Math.round(data.Costos.SalarioBase))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%'></td>"
                        html += "<td style = 'width:5%' class = 'CenterText'></td>"
                        html += "<td style = 'width:10%'></td>"
                        
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark Pendiente'>BASE VACACIONES</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark Pendiente CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark Pendiente'>"+HtmlValores_Doble( Math.round(data.Costos.SalarioBase))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>TOTAL</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalRecibidoEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark Pendiente' colspan = '3'>PRESTACIONES SOCIALES</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Cesantías</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Cesantias)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.CensatiasEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:25%'>Intereses de Cesantias</td>"
                        html += "<td style = 'width:5%' class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_IntCesantias)+"</td>"
                        html += "<td class = 'td_cuerpo_table' style = 'width:10%'>"+HtmlValores_Doble( Math.round(data.Costos.InteresesCensatiasEmpleado))+"</td>"
                        
                        html += "<td style = 'width:10%;background-color:transparent;border:0px;'></td>"
                        
                        html += "<td class = 'cabecera_th_dark' style = 'width:25%;BACKGROUND-COLOR:#3acd31;'>TOTAL RECIBIDO EMPLEADO</td>"
                        html += "<td style = 'width:5%;BACKGROUND-COLOR:#3acd31;' class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td class = 'cabecera_th_dark' style = 'width:10%;BACKGROUND-COLOR:#3acd31;'>"+HtmlValores_Doble( Math.round (data.Costos.TotalRecibidoEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Prima de Servicios</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Primas)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.PrimasEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Vacaciones</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Vacaciones)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.VacacionesEmpleado))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>SUBTOTAL PRESTACIONES SOCIALES</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_Vacaciones + data.Costos.Por_Primas + data.Costos.Por_IntCesantias + data.Costos.Por_Cesantias)+"</td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalPrestacionesSociales))+"</td>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark Pendiente' colspan = '3'>SEGURIDAD SOCIAL</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Salud</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_SaludEmpresa)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Salud))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Pensión</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_PensionEmpresa)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Pension))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Arl</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_ArlEmpresa)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Arl))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>SUBTOTAL APORTES</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_SaludEmpresa + data.Costos.Por_PensionEmpresa + data.Costos.Por_ArlEmpresa )+"</td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalSeguridadSocial))+"</td>"
                    html += "</tr>"
                    
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark Pendiente' colspan = '3'>APORTES PARAFISCALES</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Caja de Compensación</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_CC)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.CajaCompensacion))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>ICBF</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_ICBF)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Icbf))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>Sena</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_SENA)+"</td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Sena))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>SUBTOTAL APORTES PARAFISCALES </td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'>"+HtmlPorcentajes_Doble(data.Costos.Por_SENA + data.Costos.Por_ICBF + data.Costos.Por_CC )+"</td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalAportesParafiscales))+"</td>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>SUBTOTAL SALARIO</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.TotalSalario_Aux))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>SUBTOTAL DE PRESTACIONES LEGALES</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalPrestacionesSociales))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>SUBTOTAL DE SEGURIDAD SOCIAL</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalSeguridadSocial))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>SUBTOTAL DE APORTES PARAFISCALES</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.SubTotalAportesParafiscales))+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'cabecera_th_dark'>TOTAL</td>"
                        html += "<td style = 'width:5%'  class = 'cabecera_th_dark CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalGeneral))+"</td>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%' class = 'td_cuerpo_table'>INDEMNIZACIONES</td>"
                        html += "<td style = 'width:5%'  class = 'td_cuerpo_table CenterText'></td>"
                        html += "<td style = 'width:10%' class = 'td_cuerpo_table'>"+HtmlValores_Doble( Math.round(data.Costos.Indemnizaciones))+"</td>"
                    html += "</tr>"
                    html += "<tr><td ><br><br></td></tr>"
                    html += "<tr>"
                        html += "<td style = 'width:25%;BACKGROUND-COLOR:#3acd31;' class = 'cabecera_th_dark' >TOTAL COSTO EMPRESA</td>"
                        html += "<td style = 'width:5%;BACKGROUND-COLOR:#3acd31;'  class = 'cabecera_th_dark CenterText' ></td>"
                        html += "<td style = 'width:10%;BACKGROUND-COLOR:#3acd31;' class = 'cabecera_th_dark'>"+HtmlValores_Doble( Math.round(data.Costos.TotalGlobal))+"</td>"
                    html += "</tr>"
                html += "</table>"
                $(".ContenedorDataTable").html(html)
            }
        }) 
    }
    
}

function renderModalEmpleadosActivosCosto(Hash,Hash2){
    var html = "";
    TituloVentana = "Costo Compañía"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "";
    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    
    html += "<div class='FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Estado' id = 'Personal_Estado' >";
                        html += "<option value = '1' selected>Activos</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Unidad' id = 'Personal_Unidad' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Área:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Area' id = 'Personal_Area' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc'>Texto:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Personal_TextBusqueda' name = 'Personal_TextBusqueda' />"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<p></p>"
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarPersonalTabla("+Hash+",\""+Hash2+"\")'/>"
                html += "</div>"
            html += "</div><br>";
            html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>"
                        html += "<label for='IdTipoDoc'></label>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class='FirstText Cursor' style='border:0px;font-size:16px;color:#1B4075;font-weight: bold;'>Valor Total:</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'>$</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'id = 'ValorTotalEquipo'>0</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable Personal"+Hash+"' id = 'Personal"+Hash+"'>";
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Foto</th>"
                        html += "<th>Nombre Completo</th>"
                        html += "<th>Cargo</th>"
                        html += "<th>Fecha de Ingreso</th>"
                        html += "<th>Cargado El</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Tipo de Contrato</th>"
                        html += "<th>Modalidad Salario</th>"
                        html += "<th>Costo Compañía</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "</table></div>";
    html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    TablaPersonal(Hash,Hash2)
    //$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function renderModalEmpleadosActivosCostoVacaciones(Hash,Hash2){
    var html = "";
    TituloVentana = "Vacaciones"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "";
    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    
    html += "<div class='FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Estado' id = 'Personal_Estado' >";
                        html += "<option value = '1' selected>Activos</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Unidad' id = 'Personal_Unidad' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Área:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Area' id = 'Personal_Area' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc'>Texto:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Personal_TextBusqueda' name = 'Personal_TextBusqueda' />"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<p></p>"
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarPersonalTablaVacaciones("+Hash+",\""+Hash2+"\")'/>"
                html += "</div>"
            html += "</div><br>";
            html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>"
                        html += "<label for='IdTipoDoc'></label>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class='FirstText Cursor' style='border:0px;font-size:16px;color:#1B4075;font-weight: bold;'>Valor Total:</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'>$</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'id = 'ValorTotalEquipo'>0</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable Personal"+Hash+"' id = 'Personal"+Hash+"'>";
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Foto</th>"
                        html += "<th>Nombre Completo</th>"
                        html += "<th>Cargo</th>"
                        html += "<th>Fecha de Ingreso</th>"
                        html += "<th>Cargado El</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Tipo de Contrato</th>"
                        html += "<th>Días Pendientes</th>"
                        html += "<th>Costo Compañía</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "</table></div>";
    html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    TablaPersonalVacaciones(Hash,Hash2)
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function administracionFichaTecnicaEmpleado(Hash,Hash2){
    var html = "";

    TituloVentana = "Ficha Técnica Empleado"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "";

    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    
    html += "<div class='FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Estado' id = 'Personal_Estado' >";
                        html += "<option value = '1' selected>Activos</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Unidad' id = 'Personal_Unidad' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Área:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Area' id = 'Personal_Area' >";
                        html += "<option value = '0' >Todas</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc'>Texto:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Personal_TextBusqueda' name = 'Personal_TextBusqueda' />"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<p></p>"
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarPersonalTablaFT("+Hash+",\""+Hash2+"\")'/>"
                html += "</div>"
            html += "</div><br>";
            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable PersonalFT"+Hash+"' id = 'PersonalFT"+Hash+"'>";
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Foto</th>"
                        html += "<th>Nombre Completo</th>"
                        html += "<th>Cargo</th>"
                        html += "<th>Fecha de Ingreso</th>"
                        html += "<th>Cargado El</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Consultar</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "</table></div>";
    html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    TablaPersonalFichaTecnica(Hash,Hash2)
}

function InformacionEmpresarialEmpleado(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'0502c1a98931b0d2c56bb0135356199d',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                    html += "<select readonly class = 'form-control' name = 'unidadnegocio' id = 'unidadnegocio' onchange = 'ListarAreasUnidadNegocioPersonal()' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Unidad']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Área:</label>"
                    html += "<select readonly class = 'form-control' name = 'area' id = 'area' onchange = 'ListarCargosAreaUnidadPersonal()' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Area']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cargo:</label>"
                    html += "<select readonly class = 'form-control' name = 'cargo' id = 'cargo' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Cargo']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Ingreso:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'date' name = 'fechaingreso' id = 'fechaingreso' class = 'form-control' required value = '"+data.Info[0]['FechaIngreso']+"' />"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Contrato:</label>"
                    html += "<select readonly class = 'form-control' name = 'TipoContrato' id = 'TipoContrato' required>"
                        html += "<option value = '' selected>"+data.Info[0]['TipoContrato']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tiempo Contrato:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'number' name = 'tiempocontrato' id = 'tiempocontrato' class = 'form-control' required value = '"+data.Info[0]['TiempoContrato']+"' />"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modalidad de Pago:</label>"
                    html += "<select readonly class = 'form-control' name = 'Tipo_Salario' id = 'Tipo_Salario' required>"
                        html += "<option value = '' selected>"+data.Info[0]['TipoSalario']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>  Valor Prestacional:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Prestacional' id = 'Prestacional' onkeyup = 'FormatCampoNum(\"Prestacional\",\"Prestacional_real\")' value = '"+data.Info[0]['Salario'][0]['prestacional']+"' class = 'Prestacional form-control' required />"
                    html += "<span style = 'display:none;' class = 'Prestacional_real' id = 'Prestacional_real'>"+data.Info[0]['Salario'][0]['prestacional']+"</span>"
                html += "</div>"
                

            html += "</div>"

            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor No Prestacional:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'NPrestacional' id = 'NPrestacional' onkeyup = 'FormatCampoNum(\"NPrestacional\",\"NPrestacional_real\")' value = '"+data.Info[0]['Salario'][0]['noprestacional']+"' class = 'NPrestacional form-control' required />"
                    html += "<span style = 'display:none;' class = 'NPrestacional_real' id = 'NPrestacional_real'>"+data.Info[0]['Salario'][0]['noprestacional']+"</span>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Bonos:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Bonos' id = 'Bonos' onkeyup = 'FormatCampoNum(\"Bonos\",\"Bonos_real\")' value = '"+data.Info[0]['Salario'][0]['bono']+"' class = 'Bonos form-control' required />"
                    html += "<span style = 'display:none;' class = 'Bonos_real' id = 'Bonos_real'>"+data.Info[0]['Salario'][0]['bono']+"</span>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Otros:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Otros' id = 'Otros' onkeyup = 'FormatCampoNum(\"Otros\",\"Otros_real\")' value = '"+data.Info[0]['Salario'][0]['otros']+"' class = 'Otros form-control' required />"
                    html += "<span  style = 'display:none;' class = 'Otros_real' id = 'Otros_real'>"+data.Info[0]['Salario'][0]['otros']+"</span>"
                html += "</div>"
            html += "</div>"
            html += "<br>"
            html += "<div class='separator'>Información Administrativa</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>Arl:</label>"
                    html += "<select readonly class = 'form-control' name = 'Arl' id = 'Arl' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Arl']+"</option>"
                    html += "</select>"
                html += "</div>"
                
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>Caja Compensación:</label>"
                    html += "<select readonly class = 'form-control' name = 'FP' id = 'FP' required>"
                        html += "<option value = '' selected>"+data.Info[0]['CajaCompensacion']+"</option>"
                    html += "</select>"
                html += "</div>"
            html += "</div>"
            
            if( data.Info[0]['estado'] == 0 ){
                html += "<br>"
                html += "<div class='separator'>Información de Retiro del Empleado</div>";
                html += "<br>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha de Retiro:</label>"
                        html += "<input readonly autocomplete = 'off' type = 'date' name = 'fecharetiro' id = 'fecharetiro' class = 'form-control' value = '"+data.Info[0]['Retiro'][0]['FechaRetiro']+"'/>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Motivo Retiro:</label>"
                        html += "<select readonly class = 'form-control' name = 'TipoRetivo' id = 'TipoRetivo'>"
                            html += "<option >"+data.Info[0]['Retiro'][0]['FechaRetiro']+"</option>"
                        html += "</select>"
                    html += "</div>"

                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'>Justificación:</label>"
                        if( data.Info[0]['Retiro'][0]['FechaRetiro'].length == 0 || data.Info[0]['Retiro'][0]['FechaRetiro'] == null ){
                            html += "<textarea readonly class  = 'form-control' id = 'motivoretiroempleado' name = 'motivoretiroempleado'></textarea>"
                        }else{
                            html += "<textarea readonly class  = 'form-control' id = 'motivoretiroempleado' name = 'motivoretiroempleado'>"+data.Info[0]['Retiro'][0]['MotivoRetiro']+"</textarea>"
                        }
                        
                    html += "</div>"
                html += "</div>"
                
            }

            $(".TabsMenu3").html(html);
            FormatCampoNum("Prestacional","Prestacional_real")
            FormatCampoNum("NPrestacional","NPrestacional_real")
            FormatCampoNum("Bonos","Bonos_real")
            FormatCampoNum("Otros","Otros_real")
        }
    });
}

function DocumentosLegalesEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDLE' name = 'TextBusquedaDLE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosLegalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosLegalesEmpleado"+Hash+"' id = 'DocumentosLegalesEmpleado"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th>No.</th>"
                html += "<th>Nombre</th>"
                html += "<th>Cargado Por</th>"
                html += "<th>Cargado El</th>"
                html += "<th>Descargar</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $(".TabsMenu4").html(html);
    TablaDocLegalesEmpleado(Hash,Hash2,Hash3)
}

function DocumentosAdicionalesEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDAE' name = 'TextBusquedaDAE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosAdicionalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosAdicionalesEmpleado"+Hash+"' id = 'DocumentosAdicionalesEmpleado"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th>No.</th>"
                html += "<th>Nombre</th>"
                html += "<th>Cargado Por</th>"
                html += "<th>Cargado El</th>"
                html += "<th>Descargar</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $(".TabsMenu5").html(html);
    TablaDocAdicionalesEmpleado(Hash,Hash2,Hash3)
}


function BuscarDocumentosLegalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DL.draw();
}

function BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DA.draw();
}

function TablaDocLegalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DL = $("#DocumentosLegalesEmpleado"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'c96ff5dbc642930b5598db41d663ed68',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDLE").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'TipoDocumento',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'fechahora',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
           
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<center><a target="_blank" href="../../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           }
        ],
        "order": [[2, "asc"]],

    });
    $('#DocumentosLegalesEmpleado'+Hash).css({'width':'100%'})
}

function TablaDocAdicionalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DA = $("#DocumentosAdicionalesEmpleado"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'0d9d918c942f005e110e3ce4bdae535b',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDAE").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'TipoDocumento',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'fechahora',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
           
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<center><a target="_blank" href="../../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
        ],
        "order": [[2, "asc"]],

    });
    $('#DocumentosAdicionalesEmpleado'+Hash).css({'width':'100%'})
}


function ConsultarInformacionEmpleado(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'add4466ad7992d3438200847948b078f',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash
        },
        success:function(data){
            $("#ModalEdit").modal("hide")
            var html = "";
            
            TituloVentana = "Información - "+data.InformacionBasica[0]['NombreCompleto']
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            
            html += "<div class='modal-body'>";
                html += "<div id = 'empl' >";
                    html += "<ul >";
                        html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            
                            html += "<a href = '#empl-1'><span>Datos Básicos</span></a>"
                        html +="</li>";

                        html += "<li onclick = 'MostrarTabsMenu(2);ListarInformacionContactosEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            
                            html += "<a href = '#empl-2'><span>Contactos Emergencia</span></a>"
                        html +="</li>";
                        
                        html += "<li onclick = 'MostrarTabsMenu(3);InformacionEmpresarialEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs3'>"
                            
                            html += "<a href = '#empl-3'><span>Empresarial</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(4);DocumentosLegalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs4'>"
                            
                            html += "<a href = '#empl-4'><span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(5);DocumentosAdicionalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs5'>"
                            
                            html += "<a href = '#empl-5'><span>Documentos Adicionales</span></a>"
                        html +="</li>";
                    html += "</ul>";

                    html += "<div id = 'empl-1'class = 'ChildTabsMenu TabsMenu1'>";
                                                
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"
                                if( data.InformacionBasica[0]['Foto'].length == 0 ){
                                    html += "<img src = '../images/foto.png' class = 'FotoTablaEmpleadoInfo'/>"
                                }else{
                                    html += "<img src = '../../storage/app/datos/Empleados/"+data.InformacionBasica[0]['IdEmpleado']+"/"+data.InformacionBasica[0]['Foto']+"' class = 'FotoTablaEmpleadoInfo'/>"
                                }
                                    html += "<p></p>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Nombre:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'primernombre' id = 'primernombre' class = 'form-control' value = '"+data.InformacionBasica[0]['Nombre1']+"'required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Nombre:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'segundonombre' id = 'segundonombre' class = 'form-control' value = '"+data.InformacionBasica[0]['Nombre2']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Apellido:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'primerapellido' id = 'primerapellido' class = 'form-control' required value = '"+data.InformacionBasica[0]['Apellido1']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Apellido:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'segundoapellido' id = 'segundoapellido' class = 'form-control' value = '"+data.InformacionBasica[0]['Apellido2']+"'/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                                html += "<select readonly class = 'form-control' name = 'TipoDocumento' id = 'TipoDocumento' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['TipoDocumento']+"</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número de Documento:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'numerodocumento' id = 'numerodocumento' class = 'form-control' required value = '"+data.InformacionBasica[0]['Identificacion']+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Nacimiento:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'fechanacimiento' id = 'fechanacimiento' class = 'form-control' required value = '"+data.InformacionBasica[0]['FechaNacimiento']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Sexo:</label>"
                                html += "<select readonly class = 'form-control' name = 'Sexo' id = 'Sexo' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Sexo']+"</option>"
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Dirección:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'Direccion' id = 'Direccion' class = 'form-control' value = '"+data.InformacionBasica[0]['Direccion']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Correo Personal:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'email' name = 'correopersonal' id = 'correopersonal' class = 'form-control' value = '"+data.InformacionBasica[0]['CorreoPersonal']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Teléfono Casa:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'telefonocasa' id = 'telefonocasa' class = 'form-control' required value = '"+data.InformacionBasica[0]['Telefono_Casa']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Celular:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'celular' id = 'celular' class = 'form-control' value = '"+data.InformacionBasica[0]['Celular']+"'/>"
                            html += "</div>"
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Rh:</label>"
                                html += "<select readonly class = 'form-control' name = 'rh' id = 'rh' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['RH']+"</option>"
                                    
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Eps:</label>"
                                html += "<select readonly class = 'form-control' name = 'rh' id = 'rh' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Eps']+"</option>"
                                    
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Fondo Cesantías:</label>"
                                html += "<select readonly class = 'form-control' name = 'FC' id = 'FC' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Fondo_Cesantias']+"</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Fondo Pensiones:</label>"
                                html += "<select readonly class = 'form-control' name = 'FP' id = 'FP' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Fondo_Pensiones']+"</option>"
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div id = 'empl-2'class = 'ChildTabsMenu TabsMenu2'>";
                    html += "</div>"
                    html += "<div id = 'empl-3' class = 'ChildTabsMenu TabsMenu3'>";
                    html += "</div>"
                    html += "<div id = 'empl-4' class = 'ChildTabsMenu TabsMenu4'>";
                    html += "</div>"
                    html += "<div id = 'empl-5' class = 'ChildTabsMenu TabsMenu5'>";
                    html += "</div>"
                    
            html += "</div>";

            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ModalEdit2(1)
            $("#empl").tabs()
            ResizeModal(0.9)
        }
    });
}

function BuscarContactosEmergenciaEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_CE.draw();
}

function ListarInformacionContactosEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaCEE' name = 'TextBusquedaCEE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarContactosEmergenciaEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ContactosEmpleados"+Hash+"' id = 'ContactosEmpleados"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th>No.</th>"
                html += "<th>Nombre</th>"
                html += "<th>Relación</th>"
                html += "<th>Teléfono Principal</th>"
                html += "<th>Dirección</th>"
                html += "<th>Registrado Por</th>"
                html += "<th>Creado El</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $(".TabsMenu2").html(html);
    TablContactosEmergenciaEmpleado(Hash,Hash2,Hash3)
}

function TablContactosEmergenciaEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_CE = $("#ContactosEmpleados"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'859d9b4bdf095b491b2e94021de50eee',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaCEE").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'nombre',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'relacion',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'telefono1',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'telefono2',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },

           {
               data: 'fechahora',

               "render": function (data, type, full, meta) {
                    return '<Center >' + data + '</Center>';
                }

            },
           { data: 'nombreusuario' },

           
        ],
        "order": [[2, "asc"]],

        
    });
    $('#ContactosEmpleados'+Hash).css({'width':'100%'})
}


function BuscarPersonalTabla(Hash,Hash2){
    $DataTable_Empresa_Personal.destroy();
    TablaPersonal(Hash,Hash2)
}
function BuscarPersonalTablaVacaciones(Hash,Hash2){
    $DataTable_Empresa_Personal.destroy();
    TablaPersonalVacaciones(Hash,Hash2)
}
function BuscarPersonalTablaFT(Hash,Hash2){
    $DataTable_Empresa_Personal.destroy();
    TablaPersonalFichaTecnica(Hash,Hash2)
}

function TablaPersonal(Hash,Hash2){
    var Valor = 0;
    $DataTable_Empresa_Personal = $("#Personal"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'afe9f067ad208254a9863edde79d3546',
            'data':function (d) {
                    d.search['value'] = $("#Personal_TextBusqueda").val();
                    d.search['Unidad'] = $("#Personal_Unidad").val();
                    d.search['Area'] = $("#Personal_Area").val();
                    d.search['Estado'] = $("#Personal_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Apellido1',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'Cargo',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var ht = '<img src = "../../storage/app/datos/Empleados/'+full.IdEmpleado+'/'+full.foto+'" class = "FotoTablaEmpleado" onerror="this.src=\'../images/foto.png\'"/>'
                    return '<center>' + ht + '</center>';
                }

            },
           {
               data: 'Hash',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span>' + ht + '</span>';
                }

            },
           {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

           {
               data: 'FechaIngreso',

               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    hx += '<center >'
                        hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                    hx += '</center>'

                    return hx;
                }
           },
           {
               data: 'TipoContrato',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
           },
           {
               data: 'ModalidadSalario',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '<table width = "100%"';
                    if( full.ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO == 1 ){
                        Valor = (full.ValorTotalEquipo);
                        hx += '<tr>'
                            hx += '<td style = "border:0px;text-align:right;width:20%;">$</td>'
                            hx += '<td style = "border:0px;text-align:right;">'+formatNumber.new( Math.round(parseFloat(full.CostoEmpleado.TotalGlobal)) )+'</td>'
                        hx += '</tr>'
                        $("#ValorTotalEquipo").html(formatNumber.new( Math.round(Valor) ));
                    }
                    hx += '</table>'
                    
                    return hx;
                }
           },
        ],
        //"order": [[1, "asc"]],
/*
        "language": {
            "url": UrlGeneral + "../../js/dataTable/Spanish.lang"
        },*/
    });
    $('#Personal'+Hash).css({'width':'100%'})

}

function TablaPersonalVacaciones(Hash,Hash2){
    var Valor = 0;
    $DataTable_Empresa_Personal = $("#Personal"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'afe9f067ad208254a9863edde79d3546x',
            'data':function (d) {
                    d.search['value'] = $("#Personal_TextBusqueda").val();
                    d.search['Unidad'] = $("#Personal_Unidad").val();
                    d.search['Area'] = $("#Personal_Area").val();
                    d.search['Estado'] = $("#Personal_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Apellido1',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'Cargo',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var ht = '<img src = "../../storage/app/datos/Empleados/'+full.IdEmpleado+'/'+full.foto+'" class = "FotoTablaEmpleado" onerror="this.src=\'../images/foto.png\'"/>'
                    return '<center>' + ht + '</center>';
                }

            },
           {
               data: 'Hash',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span>' + ht + '</span>';
                }

            },
           {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

           {
               data: 'FechaIngreso',

               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    hx += '<center >'
                        hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                    hx += '</center>'

                    return hx;
                }
           },
           {
               data: 'TipoContrato',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
           },
           {
               data: 'Vacaciones',
               "render": function (data, type, full, meta) {
                    return '<center>' + full.Vacaciones + '</center>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '<table width = "100%"';
                    if( full.ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO == 1 ){
                        Valor = (full.ValorTotalEquipo);
                        hx += '<tr>'
                            hx += '<td style = "border:0px;text-align:right;width:20%;">$</td>'
                            hx += '<td style = "border:0px;text-align:right;">'+formatNumber.new( Math.round(parseFloat(full.CostoEmpleado)) )+'</td>'
                        hx += '</tr>'
                        $("#ValorTotalEquipo").html(formatNumber.new( Math.round(Valor) ));
                    }
                    hx += '</table>'
                    
                    return hx;
                }
           },
        ],
        //"order": [[1, "asc"]],
/*
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },*/
    });
    $('#Personal'+Hash).css({'width':'100%'})

}

function TablaPersonalFichaTecnica(Hash,Hash2){
    var Valor = 0;
    $DataTable_Empresa_Personal = $("#PersonalFT"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'afe9f067ad208254a9863edde79d3546',
            'data':function (d) {
                    d.search['value'] = $("#Personal_TextBusqueda").val();
                    d.search['Unidad'] = $("#Personal_Unidad").val();
                    d.search['Area'] = $("#Personal_Area").val();
                    d.search['Estado'] = $("#Personal_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Apellido1',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'Cargo',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var ht = '<img src = "../../storage/app/datos/Empleados/'+full.IdEmpleado+'/'+full.foto+'" class = "FotoTablaEmpleado" onerror="this.src=\'../images/foto.png\'"/>'
                    return '<center>' + ht + '</center>';
                }

            },
           {
               data: 'Hash',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span>' + ht + '</span>';
                }

            },
           {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

           {
               data: 'FechaIngreso',

               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<span>' + data +'</span>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    hx += '<center >'
                        hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                    hx += '</center>'

                    return hx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    hx += '<center >'
                        hx += '<img src ="../images/VER1_ICONO.png" class = "OptionIcon" onclick = "ConsultarInformacionEmpleado('+full.Hash+','+full.Hash2+',\'f7f503e814609dcc30aaa00b50ec73c6cb3d6a406459d27dfd1065fa0f2225a1\')"/>';
                    hx += '</center>'

                    return hx;
                }
           },
        ],
        //"order": [[1, "asc"]],

        
    });
    $('#PersonalFT'+Hash).css({'width':'100%'})

}

function renderModalPermisosEmpleados(Hash,Hash2){
    var html = "";
    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+urlLogoEmpresa+"' class = 'IconVentana' /> <span class = 'TituloBuscador'>Permisos Empleados</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                    html += "<p></p><img src = '../images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                    html += "<select class = 'form-control' name = 'Personal_Estado' id = 'Personal_Estado' >";
                        html += "<option value = '1' selected>Pendiente Aprobación</option>"
                        html += "<option value = '2' >Aprobado</option>"
                        html += "<option value = '3' >Denegado</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<label for='IdTipoDoc'>Texto:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Personal_TextBusqueda' name = 'Personal_TextBusqueda' />"
                html += "</div>"
                html += "<div class='col col-sm-2 my-2'>"
                    html += "<p></p>"
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarPersonalPermisosTabla("+Hash+")'/>"
                html += "</div>"
            html += "</div><br>";
            html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable PersonalPermiso"+Hash+"' id = 'PersonalPermiso"+Hash+"'>";
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Desde</th>"
                        html += "<th>Hasta</th>"
                        html += "<th>Solicitado El</th>"
                        html += "<th>Justificación</th>"
                        html += "<th>Soporte Adjunto</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Aprobar</th>"
                        html += "<th>Denegar</th>"
                        html += "<th>Revisado Por</th>"
                        html += "<th>Revisado El</th>"
                        html += "<th>Observaciones</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "</table></div>";
    html += "</div>";

    $(".content_modal").html(html);
    TablaPersonalPermiso(Hash,Hash2)
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function BuscarPersonalPermisosTabla(Hash){
    $DataTable_PersonalPermiso.draw();
}

function TablaPersonalPermiso(Hash){
    var Valor = 0;
    $DataTable_PersonalPermiso = $("#PersonalPermiso"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'62fa420c30efd64028c637389a30a366',
            'data':function (d) {
                    d.search['value'] = $("#Personal_TextBusqueda").val();
                    d.search['Estado'] = $("#Personal_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'NombreUsuario',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'NombreUsuario',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },
           {
               data: 'FInicio',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
           {
               data: 'FFin',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
               data: 'FechaSolicitud',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
           {
               data: 'Justificacion',

               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
           {
               data: 'adjunto',

               "render": function (data, type, full, meta) {
                    if( data != null ){
                        return '<center ><a target = "_blank" href = "../../storage/app/General/Permisos/'+data+'" ><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                    }else{
                        return ''
                    }
                   
                }

            },
            {
               data: 'Estado',
               "render": function (data, type, full, meta) {
                   
                    return '<span>' + data + '</span>';
                }

            },
            {
               data: 'Estado',
               "render": function (data, type, full, meta) {
                   if( data == 'Pendiente Aprobación' ){
                       return '<center><img src = "../images/activo.png" class = "OptionIcon" data-toggle="modal" data-target="#myModal" onclick = "AprobarSolicitudPermiso('+full.Hash+','+Hash+')"/></center>';
                   }else{
                       return ''
                   }
                    
                }

            },
           {
               data: 'Estado',
               "render": function (data, type, full, meta) {
                   if( data == 'Pendiente Aprobación' ){
                       return '<center><img src = "../images/inactivo.png" class = "OptionIcon" data-toggle="modal" data-target="#myModal" onclick = "RechazarSolicitudPermiso('+full.Hash+','+Hash+')"/></center>';
                   }else{
                       return ''
                   }
                }

            },
            {
               data: 'Aprador',
               "render": function (data, type, full, meta) {
                   
                    return '<span>' + data + '</span>';
                }

            },
            {
               data: 'FechaAprobacion',
               "render": function (data, type, full, meta) {
                   
                    return '<center>' + data + '</center>';
                }

            },
            {
               data: 'observacionesAprobacion',
               "render": function (data, type, full, meta) {
                   
                    return '<span>' + data + '</span>';
                }

            },
        ],
        //"order": [[1, "asc"]],

        
    });
    $('#PersonalPermiso'+Hash).css({'width':'100%'})

}

function AprobarSolicitudPermiso(Ha,Hash){
    CierraModal("ModalEdit","myModal");
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '"+UrlGeneral+"images/Calendario.png' height='50px'  onerror='this.src=\"../images/Calendario.png\' /> <span class = 'TituloBuscador'>Aprobación Permiso</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '"+UrlGeneral+"images/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    //html += "<form class='form-signin FormsGeneral' action='"+UrlGeneral+"ee91f33ffe93c54671f739b6c6eae9a0' method='post'>";
        html += "<div class='modal-body FormsGeneral'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            
            html += "<div class='form-row my-2'>";
                html += "<div class='col-sm-12'>";
                    html += "<label for='ParNombreLegal' >Justificación:</label>";
                    html += "<textarea class = 'form-control' id = 'JustificacionPermiso'></textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' onclick = 'GuardarAproPermisoEmpleado("+Ha+","+Hash+",2)' class='btn btn-primary' >Guardar</button>";
        html += "</div>";
    //html += "</form>"
    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').removeClass('modal-xl').addClass('modal-xs');
}

function RechazarSolicitudPermiso(Ha,Hash,Hash2){
    CierraModal("ModalEdit","myModal");
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '"+UrlGeneral+"images/Calendario.png' height='50px'  onerror='this.src=\"../images/Calendario.png\' /> <span class = 'TituloBuscador'>Denegar Permiso</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '"+UrlGeneral+"images/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    //html += "<form class='form-signin FormsGeneral' action='"+UrlGeneral+"ee91f33ffe93c54671f739b6c6eae9a0' method='post'>";
        html += "<div class='modal-body FormsGeneral'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            
            html += "<div class='form-row my-2'>";
                html += "<div class='col-sm-12'>";
                    html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Justificación:</label>";
                    html += "<textarea class = 'form-control' id = 'JustificacionPermiso' required></textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' onclick = 'GuardarAproPermisoEmpleado("+Ha+","+Hash+",3)' class='btn btn-primary' >Guardar</button>";
        html += "</div>";
    //html += "</form>"
    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').removeClass('modal-xl').addClass('modal-xs');
}

function GuardarAproPermisoEmpleado(Ha,Hash,HashOK){
    $.ajax({
        type:'POST',
        url: UrlGeneral+'ee91f33ffe93c54671f739b6c6eae9a0',
        data:{Hash:Ha,HashOK:HashOK,JustificacionPermiso:$("#JustificacionPermiso").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            CierraModal("myModal","ModalEdit");
            BuscarPersonalPermisosTabla(Hash)
        }
    })
}

function renderModalHorasHombreEmpleados(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral+'ea0b52025b37b06640ad20c9d08a986b',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Horas Hombre"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "";
            var urlLogoEmpresa = "";
            urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
            
            html += "<div class='FormsGeneral'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-3'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Usuario:</label>"
                        html += "<select class = 'form-control' name = 'AdminUnidad' id = 'AdminUnidad' >";
                            html += "<option value = '0' selected>Seleccione</option>"
                            for(var i = 0; i < data.Unidades.length; i++){
                                html += "<option value = '"+data.Unidades[i]['IdUsuario']+"' >"+data.Unidades[i]['NombreUsuario']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-3'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Desde:</label>"
                        html += "<input type = 'date' class = 'form-control' name = 'FechaDesde' id = 'FechaDesde'/>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-3'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Hasta:</label>"
                        html += "<input type = 'date' class = 'form-control' name = 'FechaHasta' id = 'FechaHasta'/>"
                    html += "</div>"
                    /*html += "<div class='col col-sm-2 my-3'>"
                        html += "<label for='IdTipoDoc'>Departamento/Área:</label>"
                        html += "<div class = 'ListAreasPersonal ContenedoresFiltros' ></div>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-3'>"
                        html += "<label for='IdTipoDoc'>Empleados:</label>"
                        html += "<div class = 'ListTempAreas ContenedoresFiltros'></div>"
                    html += "</div>"*/
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'AdminGraficarActividadesHHEmpleados("+Hash+")'/>"
                    html += "</div>"
                html += "</div><br>";
                html += "<div class = 'ContenedorDataTable'></div>";
            html += "</div>";

            $(".ContentSubMenuAdmin").html(html);
        }
    })
}

function AdminListarDepartamentosUnidad(Hash){
    //$("#ContenedoresFiltros")
    if( $("#AdminUnidad").val() != '' ){
        $.ajax({
            type:'POST',
            url: UrlGeneral+'37898c4006f219c1888f1df8d14c80e0',
            data:{Hash:Hash,Hash2:$("#AdminUnidad").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Area.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type = 'checkbox' class = 'CheckDeptosAdmin' onclick = 'AdminListarEmpleadosDeptos("+Hash+","+data.Area[i]['IdArea']+")'value = '"+data.Area[i]['IdArea']+"'name = 'ListDeptos[]' />"
                            html += "</td>"
                            html += "<td>"+data.Area[i]['Nombre']+"</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ListAreasPersonal").html(html);
                $(".ContenedoresFiltros").css({
                    'height':'150px',
                    'width':'200px',
                    'overflow-y':'scroll'
                })
            }
        })
    }
}

function AdminListarEmpleadosDeptos(Hash,Hash2){
    var Deptos = [];
    $(".CheckDeptosAdmin:checked").each(function(){
        Deptos.push( $(this).val() )
    })
    var formData = new FormData();
    formData.append("Proyectos", JSON.stringify(Deptos));
    formData.append("Hash", Hash );
    formData.append("Hash2", Hash2);
    
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'5bbfbb5727e2837eefef6b1b3f338b48',
        success:function(data){
            var html = "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>Sel</th>"
                    html += "<th>Nombre</th>"
                html += "</tr>"
                for(var i = 0; i < data.Empleados.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"
                            html += "<input type = 'checkbox' class = 'CheckEmpleadosAdmin' value = '"+data.Empleados[i]['IdEmpleado']+"'name = 'ListDeptos[]' />"
                        html += "</td>"
                        html += "<td>"+data.Empleados[i]['NombreCompleto']+"</td>"
                    html += "</tr>"
                }
            html += "</table>"
            $(".ListTempAreas").html(html);
            $(".ContenedoresFiltros").css({
                'height':'150px',
                'width':'200px',
                'overflow-y':'scroll'
            })
        }
    })
}

function AdminGraficarActividadesHHEmpleados(Hash){
    var Deptos = [];
    /*$(".CheckDeptosAdmin:checked").each(function(){
        Deptos.push( $(this).val() )
    })
    
    var Empleados = [];
    $(".CheckEmpleadosAdmin:checked").each(function(){
        Empleados.push( $(this).val() )
    })
    */
    var formData = new FormData();
    //formData.append("Deptos", JSON.stringify(Deptos));
    //formData.append("Empleados",JSON.stringify(Empleados));
    formData.append("AdminUnidad", $("#AdminUnidad").val() );
    formData.append("FechaDesde", $("#FechaDesde").val() );
    formData.append("FechaHasta", $("#FechaHasta").val() );
    formData.append("Hash", Hash );
    
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'a9f4808f18f8fb5e6573daffda30f4a4',
        success:function(data){
            var html = ""
            var TotalHorasGlobal = 0;
            var TotalHorasGlobalEmpresa = 0;
            var TotalHorasGlobalCliente = 0;
            var TotalHorasGlobalPersonal = 0;
            var Actividades = [];
            for(var i = 0; i < data.DataReport.length;i++){
                TotalHorasGlobal += data.DataReport[i]['Horas'];
                if( (data.DataReport[i]['HorasEmpresa'].length) != 0 ){
                    for(var x = 0; x < data.DataReport[i]['HorasEmpresa'].length; x++){
                        TotalHorasGlobalEmpresa += parseFloat(data.DataReport[i]['HorasEmpresa'][x]['Tiempo']);
                    }
                }
                if( (data.DataReport[i]['HorasClientes'].length) != 0 ){
                    for(var x = 0; x < data.DataReport[i]['HorasEmpresa'].length; x++){
                        TotalHorasGlobalCliente += parseFloat(data.DataReport[i]['HorasClientes'][x]['Tiempo']);
                    }
                }
                if( (data.DataReport[i]['HorasPersonal'].length) != 0 ){
                    for(var x = 0; x < data.DataReport[i]['HorasEmpresa'].length; x++){
                        TotalHorasGlobalPersonal += parseFloat(data.DataReport[i]['HorasPersonal'][x]['Tiempo']);
                    }
                }
                
                for(var x = 0; x < data.DataReport[i]['DetalleDia'].length; x++){
                    Actividades.push({
                        start: data.DataReport[i]['DetalleDia'][x]['FechaInicio'],
                        end: data.DataReport[i]['DetalleDia'][x]['FechaFin'],
                        title: ""+data.DataReport[i]['DetalleDia'][x]['TipoActividad']+"",
                        Departamento: ""+data.DataReport[i]['DetalleDia'][x]['Departamento']+"",
                        TipoActividad: ""+data.DataReport[i]['DetalleDia'][x]['TipoActividad']+"",
                        description:data.DataReport[i]['DetalleDia'][x]['Descripcion'],
                        TipoRegistro: data.DataReport[i]['DetalleDia'][x]['TipoRegistro'],
                        Empresa: data.DataReport[i]['DetalleDia'][x]['Empresa'],
                        Unidad: data.DataReport[i]['DetalleDia'][x]['Unidad'],
                        Cliente: data.DataReport[i]['DetalleDia'][x]['Cliente'],
                        Proyectos: data.DataReport[i]['DetalleDia'][x]['Proyectos'],
                        colorx: '#32C0C2',
                        Empleado: data.DataReport[i]['NombreUsuario'],
                        textColor: '#ffffff',
                    })
                }
            }
            html += "<div class = 'form-row FormsGeneral'>";
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Total Horas</h5>"
                        html += "<div class = 'container'>"+TotalHorasGlobal+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Horas Empresa</h5>"
                        html += "<div class = 'container'>"+TotalHorasGlobalEmpresa+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Horas Cliente</h5>"
                        html += "<div class = 'container'>"+TotalHorasGlobalCliente+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Horas Personales</h5>"
                        html += "<div class = 'container'>"+TotalHorasGlobalPersonal+"</div>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            
            html += "<div class='row'>";
                html += "<div id='content' class='col-lg-12'>";
                    html += "<div id='calendar'></div>";
                    html += "<div class = 'Visual'></div>";
                html += "</div>";
            html += "</div>";
            
            $(".ContenedorDataTable").html(html)
            
            
            $('#calendar').fullCalendar({
                defaultView: 'listWeek',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable:true,
                //defaultDate: yyyy+'-'+mm+'-'+dd,
                buttonIcons: true, // show the prev/next text
                weekNumbers: false,
                editable: false,
                eventLimit: true, // allow "more" link when too many events 
                events: Actividades,
                select: function (start, end, jsEvent, view) {
                    //RegistrarHorasHombre(start, end, jsEvent, view)
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
                                html += '<td style = "color:black;padding-left:5px;border:1px solid #EDEEEF;background-color:#F2F3F4;color:#626163;padding:5px;font-weight:bold;">'+event.Empleado+' - '+event.title+'</td>'
                            html += '</tr>'
                        html += '</table></div>'
                    element[0].innerHTML = html;
                    
                },
                eventClick: function (calEvent, jsEvent, view) {
                    ConsultarInformacionHH(calEvent)
                    $("#myModalX").modal("show");
                },
            });
        }
    })
}