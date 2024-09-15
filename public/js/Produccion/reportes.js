/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Ppto_ListarUnidadesEmpresaUsuario(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'ac415e10c7fa3362840003282e795f6c',
        data:{ Hash:$("#IdEmpresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Unidades.length; i++){
                html += "<option value = '"+data.Unidades[i]['Hash']+"'>"+data.Unidades[i]['Nombre']+"</option>"
            } 
            $("#IdUnidad").html(html)
            $("#NotaLegalEmpresaPpto").html(data.Nota[0]['Nota'])
        } 
    })
}


function Ppto_ListarClientesUsuarioEmpresaUnidad(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'1808d87b2dce352e689b9fec41ae53c9',
        data:{ Hash:$("#IdEmpresa").val(),Hash2:$("#IdUnidad").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['NombreComercial']+"</option>"
            } 
            $("#IdCliente").html(html)
        } 
    })
}


function Presupuesto_ListarTiposComision(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d1278c64e4e3181e82c88a0357893d7c',
        data:{ 
            Hash1:$("#IdEmpresa").val(),
            Hash2:$("#IdUnidad").val(),
            Hash3:$("#IdCliente").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Comisiones.length; i++){
                html += "<option value = '"+data.Comisiones[i]['Hash']+"'>"+data.Comisiones[i]['Porcentaje']+"% - "+data.Comisiones[i]['TipoComision']+" - Pago a "+data.Comisiones[i]['Dias']+"</option>"
            } 
            $("#IdComision").html(html)
            
            html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Proyectos.length; i++){
                html += "<option value = '"+data.Proyectos[i]['Hash']+"'>"+data.Proyectos[i]['Codigo']+" - "+data.Proyectos[i]['Referencia']+"</option>"
            } 
            $("#IdProyecto").html(html)
        } 
    })
}


function PRO_ViewReporteAnticipos(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'dcf59e06d5eee130c21d79c6b56aefb0',
        data:{ _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Reporte Anticipos</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>"
                        html += "<select class = 'form-control' name = 'IdEmpresa' id = 'IdEmpresa' onchange = 'Ppto_ListarUnidadesEmpresaUsuario()'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Empresa.length; i++){
                                html += "<option value = '"+data.Empresa[i]['Hash']+"'>"+data.Empresa[i]['NombreComercial']+"</option>"
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
                        html += "<label for='ParLogo'>Cliente:</label>"
                        html += "<select class = 'form-control' name = 'IdCliente' id = 'IdCliente' onchange = 'Presupuesto_ListarTiposComision()'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'>Proyecto / OT:</label>"
                        html += "<select class = 'form-control' name = 'IdProyecto' id = 'IdProyecto'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'>Referencia:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' name = 'ReferenciaPpto' id = 'ReferenciaPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<p></p>";
                        html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarInformacionAnticipos()'/>";
                    html += "</div>"
                    
                html += "</div>"
                html += "<hr>"
                html += "<div style = 'width100%;min-height280px;overflow-y:scroll;' class = 'InfoReporte'></div>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(1)

        }
    });
}

function BuscarInformacionAnticipos(){
    if( $("#IdEmpresa").val() != '' && $("#IdEmpresa").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'39686313c015a9d69133ce8d405d8e31',
            data:{ 
                _token:document.getElementsByName('_token')[0].value,
                HashEmpresa:$("#IdEmpresa").val(),
                HashUnidad:$("#IdUnidad").val(),
                HashCliente:$("#IdCliente").val(),
                HashProyecto:$("#IdProyecto").val(),
                Referencia:$("#ReferenciaPpto").val(),
            
            },
            success:function(data){
                var html = "";
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Unidad</th>"
                        html += "<th>Cliente</th>"
                        html += "<th>Código Proyecto</th>"
                        html += "<th>Proyecto</th>"
                        html += "<th>Número<br>Presupuesto</th>"
                        html += "<th>Referencia<br>Presupuesto</th>"
                        html += "<th>Número<br>Anticipo</th>"
                        html += "<th>Solicitado<br>Por</th>"
                        html += "<th>Valor<br>Solicitado</th>"
                        html += "<th>Estado<br>Anticipo</th>"
                        html += "<th>Número<br>Legalización</th>"
                        html += "<th>Valor<br>Legalizado</th>"
                    html += "</tr>"
                    var TotalSolicitado = 0;
                    var TotalLegalizado = 0;
                    for(var i = 0; i < data.Info.length; i++){
                        TotalSolicitado += parseFloat(data.Info[i]['TotalAnticipo']);
                        
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td>"+data.Info[i]['Empresa']+"</td>"
                            html += "<td>"+data.Info[i]['Unidad']+"</td>"
                            html += "<td>"+data.Info[i]['Cliente']+"</td>"
                            html += "<td>"+data.Info[i]['Codigo_Ot']+"</td>"
                            html += "<td>"+data.Info[i]['ReferenciaProyecto']+"</td>"
                            html += "<td class = 'CenterText'>"
                                html += "<a target='_blank' href='http://process.grupotesta.com.co:8989/PProcess3/public/01f34a2740cbabf722b2255aa878959f/"+data.Info[i]['Hash']+"'>"+data.Info[i]['NumPpto']+"</a>"
                            html += "</td>"
                            html += "<td>"+data.Info[i]['SolicitadoPor']+"</td>"
                            html += "<td>"+data.Info[i]['ReferenciaPpto']+"</td>"
                            html += "<td class = 'CenterText'><a target='_blank' href='288ffad72e6d2756a80a65fa98f3b4b5/"+data.Info[i]['HashAnticipo']+"'>"+data.Info[i]['Id']+"</a></td>"
                            html += "<td>"+HtmlValores_Doble(data.Info[i]['TotalAnticipo'])+"</td>"
                            html += "<td>"+data.Info[i]['EstadoAnticipo']+"</td>"
                            if( (data.Info[i]['Legalizacion'].length) > 0 ){
                                html += "<td class = 'CenterText'>"+data.Info[i]['Legalizacion'][0]['Id']+"</td>"
                                html += "<td>"+HtmlValores_Doble(data.Info[i]['Legalizacion'][0]['Total'])+"</td>"
                                TotalLegalizado += parseFloat(data.Info[i]['Legalizacion'][0]['Total'])
                            }else{
                                html += "<td></td>"
                                html += "<td></td>"
                            }
                            
                        html += "</tr>"
                    }
                    html += "<tr>"
                        html += "<th colspan = '10'>TOTAL</th>"
                        html += "<th>"+HtmlValores_Doble(TotalSolicitado)+"</th>"
                        html += "<th colspan = '2'></th>"
                        html += "<th>"+HtmlValores_Doble(TotalLegalizado)+"</th>"
                    html += "</tr>"
                html += "</table>"
                $(".InfoReporte").html( html )
            }
        });
    }else{
        alert("!Debe diligenciar los campos Oblogatorios");
    }
}