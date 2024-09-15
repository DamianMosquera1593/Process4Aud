/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(".TituloPantalla").html("Informes - Horas Hombre");
    $(".alert-primary").css({
        'background-color':'#1B4075',
    })
    $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
        'color':'white'
    })
    
    renderModalHorasHombreEmpleados()
});

function renderModalHorasHombreEmpleados(){
    var html = "";
    var urlLogoEmpresa = "";
    urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador'>Reporte Horas Hombre</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                    html += "<p></p><img src = 'images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-2 my-3'>"
                html += "<label for='IdTipoDoc' col-form-label'>Filtrar Por:</label>"
                html += "<select class = 'form-control' name = 'TipoInforme' id = 'TipoInforme' >";
                    html += "<option value = '0' selected>Seleccione</option>"
                    html += "<option value = '1' >General</option>"
                    html += "<option value = '2' >Usuario</option>"
                    html += "<option value = '3' >Empresa</option>"
                    html += "<option value = '4' >Cliente</option>"
                    html += "<option value = '5' >Personal</option>"
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-2 my-3 HidenInformation Concepto'>"
                html += "<label for='IdTipoDoc' col-form-label'></label>"
                html += "<select class = 'form-control' name = 'ConceptoFiltro' id = 'ConceptoFiltro' >";
                    html += "<option value = '0' selected>Seleccione</option>"
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
            html += "<div class='col col-sm-2 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/administracion_buscar.png' class = 'OptionIcon' onclick = 'Informes_HorasHombre()'/>"
            html += "</div>"
        html += "</div><br>";
        html += "<div class = 'ContenedorDataTable'></div>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit(1)
}


function Informes_HorasHombre(){
    if( $("#TipoInforme").val() != 0 && $("#FechaDesde").val() != '' && $("#FechaHasta").val() != '' ){
        $.ajax({
            type:'POST',
            url: '7c98588fb0b50446b5cfd4fb06d5a918',
            data:{
                TipoInforme:$("#TipoInforme").val(),
                FechaDesde:$("#FechaDesde").val(),
                FechaHasta:$("#FechaHasta").val(),
                ConceptoFiltro:$("#ConceptoFiltro").val(),
                FechaHasta:$("#FechaHasta").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = ""
                    html += "<div class = 'form-row'>";
                    //Total Activas y Cerradas
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<div class = 'MainGraf' style = 'width:100%;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<th class = 'TituloTablasResumen'>HORAS HOMBRE GENERAL</th>"
                                html += "</tr>"
                            html += "</table>"
                            html += "<canvas class = 'ContentReportGraph' id = 'Graph_DatosGeneral'></canvas>"
                        html += "</div>"

                        html += "<hr>"
                        html += "<div style = 'width:100%;height:300px;overflow:scroll;'>"
                            html += "<table class = 'tableNew'>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Foto</th>"
                                    html += "<th>Usuario</th>"
                                    for(var i = 0; i < data.DataReport.length; i++){
                                        html += "<th>"+data.DataReport[i]['FechaLarga']+"</th>"
                                    }
                                html += "</tr>"
                                var Cont = 1;
                                for(var i = 0; i < data.Usuarios.length; i++){
                                    var Validador = 0;
                                    html += "<tr>"
                                        html += "<td class = 'CenterText'>"+Cont+"</td>"
                                        html += "<td class = 'CenterText'>"
                                            html += "<img onerror = this.src='images/foto.png' src = '"+UrlUniversal+"../storage/app/Usuarios/"+data.Usuarios[i]['ImgUsuario']+"' class = 'rounded-circle' style = 'height:35px;'/>"
                                        html += "</td>"
                                        html += "<td>"+data.Usuarios[i]['NombreUsuario']+"</td>"
                                        for(var x = 0; x < data.DataReport.length; x++){
                                            var TotalHoras = 0;
                                            var Personal = 0;
                                            var Empresa = 0;
                                            var Cliente = 0;
                                            var tx = "";
                                            
                                            for(var t = 0; t < data.DataReport[x]['DetalleUsuarios'].length; t++){
                                                
                                                if( data.Usuarios[i]['IdUsuario'] == data.DataReport[x]['DetalleUsuarios'][t]['IdUsuario'] && data.DataReport[x]['Fecha'] == data.DataReport[x]['DetalleUsuarios'][t][data.DataReport[x]['Fecha']]){
                                                    

                                                    if( data.DataReport[x]['DetalleUsuarios'][t]['TipoRegistro'] == 'Personal'){
                                                        Personal += parseFloat(data.DataReport[x]['DetalleUsuarios'][t]['Tiempo']);
                                                    }
                                                    if( data.DataReport[x]['DetalleUsuarios'][t]['TipoRegistro'] == 'Empresa'){
                                                        Empresa += parseFloat(data.DataReport[x]['DetalleUsuarios'][t]['Tiempo']);
                                                    }
                                                    if( data.DataReport[x]['DetalleUsuarios'][t]['TipoRegistro'] == 'Cliente'){
                                                        Cliente += parseFloat(data.DataReport[x]['DetalleUsuarios'][t]['Tiempo']);
                                                    }
                                                    TotalHoras = Cliente + Personal + Empresa
                                                }
                                                
                                                
                                                
                                                if( data.Usuarios[i]['IdUsuario'] == data.DataReport[x]['DetalleUsuarios'][t]['IdUsuario'] && data.DataReport[x]['Fecha'] == data.DataReport[x]['DetalleUsuarios'][t][data.DataReport[x]['Fecha']]){
                                                    
                                                    tx = "<table width = '100%'>"
                                                        tx += "<tr>"
                                                            tx += "<th colspan = '3'>TOTAL "+formatNumber.new(TotalHoras)+"</th>"
                                                        tx += "</tr>"
                                                        tx += "<tr>"
                                                            tx += "<td class = 'CenterText' nowrap>Personal: "+formatNumber.new(Personal)+"</td>"
                                                            tx += "<td class = 'CenterText' nowrap>Empresa: "+formatNumber.new(Empresa)+"</td>"
                                                            tx += "<td class = 'CenterText' nowrap>Cliente: "+formatNumber.new(Cliente)+"</td>"
                                                        tx += "</tr>"
                                                    tx += "</table>"
                                                    
                                                }
                                            }
                                            html += "<td>"+tx+"</td>"
                                        }
                                    html += "</tr>"
                                    Cont++;
                                }

                            html += "</table>"
                        html += "</div>"
                    html += "</div>"

                    
                html += "</div>"
                
                $(".ContenedorDataTable").html(html)
                $(".ContentReportGraph").css({'height':'250px'})
                $(".ResumenGraficas").css({'font-size':'14px'})
                
                var Labels = [];
                
                var temp_Personas = []
                var temp_Empresa = []
                var temp_Cliente = []
                for(var i = 0; i < data.DataReport.length; i++){
                    
                    Labels.push( data.DataReport[i]['FechaLarga'] );
                    var Emp = 0;
                    var Clie = 0;
                    var Per = 0;
                    for(var x = 0; x < data.DataReport[i]['DetalleUsuarios'].length; x++){
                        
                        if( data.DataReport[i]['DetalleUsuarios'][x]['TipoRegistro']  == 'Personal'  ){
                            temp_Personas.push(data.DataReport[i]['DetalleUsuarios'][x]['Tiempo'])
                        }
                        
                        if( data.DataReport[i]['DetalleUsuarios'][x]['TipoRegistro']  == 'Empresa' /*&& data.DataReport[i]['Fecha'] == data.DataReport[i]['DetalleUsuarios'][x][data.DataReport[i]['Fecha']] */){
                            temp_Empresa.push(data.DataReport[i]['DetalleUsuarios'][x]['Tiempo'])
                        }
                        
                        if( data.DataReport[i]['DetalleUsuarios'][x]['TipoRegistro']  == 'Cliente' ){
                            temp_Cliente.push(data.DataReport[i]['DetalleUsuarios'][x]['Tiempo'])
                        }
                        
                    }
                }
                
                
                var T_Personal = {
                    label:'Personal',
                    data:temp_Personas,
                    backgroundColor: '#8DC63F',
                    borderColor: '#000000',
                    yAxisID: "y-axis-density"
                };
                var T_Empresa = {
                    label:'Empresa',
                    data:temp_Empresa,
                    backgroundColor: '#F4B919',
                    borderColor: '#000000',
                    yAxisID: "y-axis-density"
                };
                var T_Cliente = {
                    label:'Cliente',
                    data:temp_Cliente,
                    backgroundColor: '#F47629',
                    borderColor: '#000000',
                    yAxisID: "y-axis-density"
                };
                
                var Tctx = $("#Graph_DatosGeneral");
                Tctx.height = 200;
                
                var densityCanvas = document.getElementById("Graph_DatosGeneral");
               

                var planetData = {
                  labels: Labels,
                  datasets: [T_Personal, T_Empresa, T_Cliente]
                };

                var chartOptions = {
                  
                };
                var myChart = new Chart(Tctx, {
                    type: 'bar',
                    data: planetData,
                    options: chartOptions
                });

            }
        })
    }else{
        alert("Debe completar los dataos Obligatorios");
    }
}