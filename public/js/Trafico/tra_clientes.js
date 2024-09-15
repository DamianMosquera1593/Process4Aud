$(document).ready(function () {
    ContentList('TRACLIENTEOT')
    ContentList('TRACLIENTETAREAOT')
    OTCliente.listSearchEstado()
    OTCliente.listSearchEmpresas()
    TablaOTTraCliente()
    //tablaTarea();
    //BuscarTablaOTProyecto();
    notificacionesGenerales()
})

var AdjuntosInf = [];
var $tableFilesInf  = null;

const RequerimientoClientex = {
    Cliente_downloadFile: function (id) {
        window.open((UrlUniversal+'70387f8087a0fc297af72111d10f50d3x/'+id), '_blank')
    },
}
function ConsultarRequerimientoCliente_tra(Hash){
    $.ajax({
        type:'POST',
        url:'a693dac80ae4ca3a932b4ce06cd688a2',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.Bloq == 1 ){
                alert("Actualmente el Requerimiento está siendo validado, por lo cual, no podrá ser modificado hasta que sea liberado.");
            }else{
                var Seg = 0;
                var html = ""
                    html += "<div class='modal-header panel-heading'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<span class = 'TituloBuscador2'>Requerimiento # "+data.Info[0]['Id']+"</span>";
                                html += "</td>"
                                html += "<td style = 'text-align:right;'>"
                                    if( data.Info[0]['IdSolicitante'] == data.Info[0]['UserConsult'] ){
                                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'OptionIcon IconClose' onclick = 'myModal(0);'/>";
                                    }else{
                                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'OptionIcon IconClose' onclick = 'myModal(0);'/>";
                                    }    
                                    
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>";
                    html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Asunto / Referencia:</label>";
                                html += "<input type = 'text' class = 'form-control' autocomplete = 'off' name = 'AsuntoRefRequerimiento' id = 'AsuntoRefRequerimiento' value = '"+data.Info[0]['Asunto']+"' />";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                                html += "<div class = 'TipoSolicitud ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tiposolicitud.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tiposolicitud.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input type = 'radio' class = 'TipoSolicitud TipoSolicitud"+obj['Hash']+"' name = 'TipoSolicitud' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Nombre']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tiposolicitud.forEach(obj => {
                                            html += "<td>"+obj['Descripcion']+"</td>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Desarrollo:</label>";
                                html += "<div class = 'TipoDesarrollo ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tipodesarrollo.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tipodesarrollo.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input type = 'radio' class = 'TipoDesarrollo TipoDesarrollo"+obj['Hash']+"' name = 'TipoDesarrollo' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Nombre']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tipodesarrollo.forEach(obj => {
                                            html += "<td>"+obj['Descripcion']+"</td>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Sector o Unidad de Negocio:</label>";
                                html += "<div class = 'Sector ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_sectores.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_sectores.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input onclick = 'SectorAll("+obj['Hash']+")' type = 'checkbox' class = 'Sector"+obj['Hash']+"' name = 'Sector' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Sector']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_sectores.forEach(obj => {
                                            html += "<th style = 'vertical-align:top;'>"
                                                html += "<table class = 'tableNew '>"
                                                obj['DSector'].forEach(obd =>{
                                                    html += "<tr>"
                                                        html += "<td class = 'CenterText ListaOpcionesSector"+obj['Hash']+"'><input type = 'checkbox' class = 'Sectorx' name = 'SectorD[]' value = '"+obd['Hash']+"'/></td>"
                                                        html += "<td style = 'text-align:justify;'>"+obd['Detalle']+"</td>"
                                                    html += "</tr>"
                                                })
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Objetivos de Comunicación:</label>";
                                html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'ObjetivosComunicacion' rows = '3' disabled>"+data.Info[0]['ObjetivosComunicacion']+"</textarea>"
                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> ¿A quién va dirigido?:</label>";
                                html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'DirigidoA' rows = '3' disabled>"+data.Info[0]['Dirigido']+"</textarea>"
                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Descripción del requerimiento:</label>";
                                html += "<textarea class = 'form-control' name = 'DescRequerimiento' id = 'DescRequerimiento' rows = '3' disabled>"+data.Info[0]['DescRequerimiento']+"</textarea>"
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Materiales Solicitados:</label>";
                                html += "<div class = 'MaterialesSol ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tipomaterial.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tipomaterial.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;'>"+obj['Material']+"</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tipomaterial.forEach(obj => {
                                            html += "<th style = 'vertical-align:top;'>"
                                                html += "<table class = 'tableNew '>"
                                                obj['Medio'].forEach(obd =>{
                                                    html += "<tr class = 'PiezasRq'>"
                                                        html += "<td style = 'text-align:justify;width:70%;'>"+obd['Detalle']+"</td>"
                                                        html += "<td class = 'MaterialesSolicitados'><span class = 'HashMedios HidenInformation'>"+obd['Hash']+"</span><input class = 'form-control NumPiezas NumPiezas"+obd['Hash']+"' oninput = 'TotalPiezasRC()' onkeyup = 'TotalPiezasRC()' type = 'number' min = '0'  name = 'CantidadMaterial[]' value = '0' /></td>"
                                                    html += "</tr>"
                                                })
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<strong>TOTAL PIEZAS<p></p>"
                                                html += "<span class = 'TotalPiezas'>0</span></strong>"
                                            html += "</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Mandatorios:</label>";
                                html += "<textarea class = 'form-control' name = 'Mandatorios' id = 'Mandatorios' rows = '3' disabled>"+data.Info[0]['Mandatorios']+"</textarea>"
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> País:</label>";
                                html += "<select class = 'form-control' name = 'Producto' id = 'Producto' >"
                                    //html += "<option value='' selected>Seleccione</option>"
                                    data.productocliente.forEach(obj => {
                                        if( obj['Hash'] == data.Info[0]['IdProducto'] ){
                                            html += "<option value = '"+obj['Hash']+"' selected >"+obj['Producto']+"</option>"
                                        }else{
                                            html += "<option value = '"+obj['Hash']+"'>"+obj['Producto']+"</option>"
                                        }

                                    });
                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Fecha de Salida:</label>";
                                html += "<input type = 'date' class = 'form-control' name = 'FechaSalida' id = 'FechaSalida' value = '"+data.Info[0]['FechaSalida']+"' />";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        
                        if( data.Info[0]['Adjuntos'].length > 0 ){
                            html += "<div class = 'form-row'>";
                                html += "<table class = 'tableNew'>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Archivo</th>"
                                        html += "<th></th>"
                                    html += "</tr>"
                                    data.Info[0]['Adjuntos'].forEach(obj => {
                                        html += "<tr>"
                                            html += "<td class = 'CenterText NumArc'></td>"
                                            html += "<td >"+obj['Nombre']+"</td>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<span onclick = 'RequerimientoClientex.Cliente_downloadFile(\""+Hash+"X"+obj['Id']+"X2\")'><img src = 'images/descarga.png' class = 'OptionIcon' /></span>"
                                            html += "</td>"
                                        html += "</tr>"
                                    });
                                html += "</table>"
                            html += "</div>";
                        }
                        if( data.Info[0]['IdSolicitante'] == data.Info[0]['UserConsult'] ){
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                                    html += "<div class='custom-file'>"
                                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                                    html += "</div>";
                                html += "</div>";
                            html += "</div>";
                        }
                        
                        html += "<br>"
                        html += "<hr>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td nowrap>"
                                        html += "<img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Histórico Estatus Requerimiento </span>";
                                    html += "</td>"
                                    html += "<td>"
                                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                                        html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                                    html += "</button>";
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
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
                                for( var i = 0; i < data.Historico.length; i++ ){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                        html += "<td class = 'CenterText'>"+data.Historico[i]['FechaC']+"</td>"
                                        html += "<td class = 'CenterText'>"+data.Historico[i]['HoraC']+"</td>"
                                        html += "<td style = 'text-align:justify;'>"+data.Historico[i]['Creador']+"</td>"
                                        html += "<td style = 'text-align:justify;'>"
                                            html += data.Historico[i]['Status']
                                            if( data.Historico[i]['Adjuntos'].length > 0 ){
                                                html += "<hr>"
                                                html += "<table style = 'width:100%;'>"
                                                    html += "<tr>"
                                                        html += "<th class = 'PptoTituloInterno' style = 'color:white;'>No.</th>"
                                                        html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Nombre</th>"
                                                        html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Descargar</th>"
                                                    html += "</tr>" 
                                                   
                                                    for(var x = 0; x < data.Historico[i]['Adjuntos'].length; x++){
                                                        html += "<tr>"
                                                            html += "<td class = 'subtitulos_principales CenterText'>"+(x+1)+"</td>"
                                                            html += "<td class = 'subtitulos_principales'>"+data.Historico[i]['Adjuntos'][x]['Archivo']+"</td>"
                                                            html += "<td class = 'subtitulos_principales'>"
                                                            if(data.Historico[i]['Adjuntos'][x]['Tipo'] == 'Old'){
                                                                html += '<center><span onclick = "Tarea.downloadFile(\''+data.Historico[i]['Adjuntos'][x]['Hash']+'\')">'
                                                                    html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                                                html += '</span></center>'
                                                               
                                                            }else{
                                                                html += '<center><span onclick = "RequerimientoClientex.Cliente_downloadFile(\''+Hash+'X'+data.Historico[i]['Adjuntos'][x]['Hash']+'X2\')">'
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
                        html += "<br>"
                        html += "<div class = 'form-row HidenInformation SubmitReq'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Justifique su Modificación:</label>";
                                html += "<textarea class = 'form-control' name = 'JustMod' id = 'JustMod' rows = '3' disabled></textarea>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                    
                    if( data.CLIENTES_EVALUACION_SOLICITUD == 1 && data.Info[0]['Estado'] == 1 ){
                        html += "<div class = 'modal-footer CenterText SubmitReqEval'>";
                            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'myModal(0);'>Cerrar</button>";
                            //html += "<button type='button' class='btn btn-primary' onclick = 'SendGenProyecto("+Hash+")'>¿Convertir o Asociar a Proyecto?</button>";
                        html += "</div>";
                    }
                    
                    html += "<div class = 'modal-footer CenterText HidenInformation SubmitReq'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'myModal(0);DesqRequerimiento("+Hash+")'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'SendEdRequerimientoCliente("+Hash+")'>Actualizar Requerimiento</button>";
                        
                    html += "</div>";
                $(".content_modal3").html(html);
                
                $(".TipoSolicitud"+data.Info[0]['IdTipoSolicitud']).attr('checked', 'checked')
                $(".TipoDesarrollo"+data.Info[0]['IdTipoDesarrollo']).attr('checked', 'checked')

                $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm3").addClass('modal-dialog-scrollable');
                $(".ContenedorOpcionesCliente").css({
                    'width':'100%',
                    'heigth':'200px'
                })
                $(".Sectorx").each(function(){
                    data.Info[0]['Sector'].forEach( obj => {
                        if( $(this).val() == obj['IdDetalle'] ){
                            $(this).attr('checked', 'checked')
                        }
                        $(this).attr('disabled', true)
                    })
                })
                $("#myModal input[type = 'radio'],#myModal input[type = 'checkbox'],#myModal input[type = 'number'],#myModal input[type = 'text'],#myModal select ,#myModal input[type = 'date'],#myModal input[type = 'file'],#myModal textarea").each(function(){
                    $(this).attr('disabled', true)
                    $(this).attr('readonly', true)
                })

                data.Info[0]['Piezas'].forEach( obj => {
                    $(".NumPiezas"+obj['IdMedio']).val(obj['Cantidad'])
                })
                var In = 1;
                $(".NumArc").each(function(){
                    $(this).text(In);
                    In++;
                })
                TotalPiezasRC_TRA()

                myModal(1)
                ResizeModal(1)
            } 
        },
        
    })
}


function TotalPiezasRC_TRA(){
    var Total = 0;
    $(".NumPiezas").each(function(){
        console.log($(this).val())
        if( $(this).val().length > 0 ){
            Total += parseInt( $(this).val() );
        }else{
            Total += 0;
        }
        
    })
    $(".TotalPiezas").text(Total);
}

function notificacionesGenerales() {
    //pendientes, seguimiento, sin contestar
    printDataAjax('9fcadcb59200a17e0176fa5a0990f835', {}, data => {
        let bPendientes = document.getElementById('traTareasPendientes')
        let bSeguimiento = document.getElementById('traTareasSeguimiento')
        let bContestadas = document.getElementById('traTareasContestadas')
        let bGestionDia = document.getElementById('traTareasDia')
        bPendientes.innerText = data.asignados
        bSeguimiento.innerText = data.seguimiento
        bContestadas.innerText = data.contestado
        bGestionDia.innerText = data.gestionDia

        if (data.asignados > 0) {
            bPendientes.onclick = () => {
                modalNotificacionesPendintes()
            }
            bPendientes.parentElement.onclick = () => {
                modalNotificacionesPendintes()
            }
        } else {
            bPendientes.onclick = null
            bPendientes.parentElement.onclick = null
        }

        if (data.seguimiento > 0) {
            bSeguimiento.onclick = () => {
                modalNotificacionesSeguimiento()
            }
            bSeguimiento.parentElement.onclick = () => {
                modalNotificacionesSeguimiento()
            }
        } else {
            bSeguimiento.onclick = null
            bSeguimiento.parentElement.onclick = null
        }

        if (data.contestado > 0) {
            bContestadas.onclick = () => {
                modalNotificacionesContestados()
            }
            bContestadas.parentElement.onclick = () => {
                modalNotificacionesContestados()
            }
        } else {
            bContestadas.onclick = null
            bContestadas.parentElement.onclick = null
        }
        
        if (data.gestionDia > 0) {
            bGestionDia.onclick = () => {
                modalNotificacionesGestionDia()
            }
            bGestionDia.parentElement.onclick = () => {
                modalNotificacionesGestionDia()
            }
        } else {
            bGestionDia.onclick = null
            bGestionDia.parentElement.onclick = null
        }
    })

}

function modalNotificacionesGestionDia() {
    $DataTable_TarePendientes = [];
    printDataAjax('a57a0c9b002d64a7f2fda48c266858f6', {}, data => {
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Tareas Gestionadas Hoy</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            data.clientes.forEach(e => {
                $DataTable_TarePendientes[e.Hash] = null;
                html += "<div class='ContenedorMenu'>"
                    html += "<div class='panel-heading alert-primary BorderTop'>"
                        html += "<table class = 'table'>"
                            html += "<tr>"
                                html += "<td width = '90%' class = 'BlackFont'>"
                                    html += e.NombreComercial
                                html += "</td>"
                                html += "<td class = 'text-left' >"
                                    html += "<a href='#' class = 'PAR_ContentTRAPENDIENTETAREAS"+e.Hash+"' onclick = \"ContentList('TRAPENDIENTETAREAS"+e.Hash+"')\">"
                                        html += "<i  class='Cursor fas fa-angle-double-down'></i>"
                                    html += "</a>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"

                    html += "<div class = 'ContenedorOptionDiv PARDIV_ContentTRAPENDIENTETAREAS"+e.Hash+"' style ='display:none;' >"
                        html += "<div class = 'BarraIconos'>"
                        html += "</div>"
                        html += "<div class = 'form-row'>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTTPendientes_TextBusqueda"+e.Hash+"' name = 'OTTPendientes_TextBusqueda"+e.Hash+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = \"buscarTablaNotificacionesGestionDia("+e.Hash+")\"/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div style='overflow: auto; white-space: nowrap;'>"
                            html += "<table class='dataTable tableNew' id = 'TablaTraPendientes"+e.Hash+"'>"
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>Tarea</th>"
                                        html += "<th>Asunto</th>"
                                        html += "<th>OT</th>"
                                        html += "<th>Departamento</th>"
                                        html += "<th>Fecha Creacion</th>"
                                        html += "<th>Hora Creacion</th>"
                                        html += "<th>Creador</th>"
                                        html += "<th>Tipo Tarea</th>"
                                        html += "<th>No Adjuntos</th>"
                                        html += "<th>Fecha Entrega</th>"
                                        html += "<th>Hora Entrega</th>"
                                        html += "<th>Fecha Respuesta</th>"
                                        html += "<th>Hora Respuesta</th>"
                                        html += "<th>Estado</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<br>"
            });
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        data.clientes.forEach(e => {
            tablaNotificacionesGestionDia(e.Hash)
            ContentList('TRAPENDIENTETAREAS'+e.Hash)
        });
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        ModalEdit(1)
    })
}

function modalNotificacionesPendintes() {
    $DataTable_TarePendientes = [];
    printDataAjax('0e1b513d8892d021763a850783e14916', {}, data => {
        var html = "";
        TituloVentana = "Tareas Pendientes"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            data.clientes.forEach(e => {
                $DataTable_TarePendientes[e.Hash] = null;
                html += "<div class='ContenedorMenu'>"
                    html += "<div class='panel-heading'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td width = '90%' class = 'WhiteFont'>"
                                    html += e.NombreComercial
                                html += "</td>"
                                html += "<td class = 'text-left' >"
                                    html += "<a href='#' class = 'PAR_ContentTRAPENDIENTETAREAS"+e.Hash+"' onclick = \"ContentList('TRAPENDIENTETAREAS"+e.Hash+"')\">"
                                        html += "<i  class='Cursor fas fa-angle-double-down'></i>"
                                    html += "</a>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"

                    html += "<div class = 'ContenedorOptionDiv PARDIV_ContentTRAPENDIENTETAREAS"+e.Hash+"' style ='display:none;' >"
                        html += "<div class = 'BarraIconos'>"
                        html += "</div>"
                        html += "<div class = 'form-row'>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTTPendientes_TextBusqueda"+e.Hash+"' name = 'OTTPendientes_TextBusqueda"+e.Hash+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = \"buscarTablaNotificacionesPendientes("+e.Hash+")\"/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div style='overflow: auto; white-space: nowrap;'>"
                            html += "<table class='dataTable tableNew' id = 'TablaTraPendientes"+e.Hash+"'>"
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>Tarea</th>"
                                        html += "<th>Asunto</th>"
                                        html += "<th>OT</th>"
                                        html += "<th>Departamento</th>"
                                        html += "<th>Fecha Creacion</th>"
                                        html += "<th>Hora Creacion</th>"
                                        html += "<th>Creador</th>"
                                        html += "<th>Tipo Tarea</th>"
                                        html += "<th>No Adjuntos</th>"
                                        html += "<th>Fecha Entrega</th>"
                                        html += "<th>Hora Entrega</th>"
                                        html += "<th>Fecha Respuesta</th>"
                                        html += "<th>Hora Respuesta</th>"
                                        html += "<th>Estado</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<br>"
            });
        html += "</div>";
        html += "<div class='modal-footer'>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        data.clientes.forEach(e => {
            tablaNotificacionesPendientes(e.Hash)
            ContentList('TRAPENDIENTETAREAS'+e.Hash)
        });
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        ModalEdit(1)
    })
}

function buscarTablaNotificacionesPendientes(idCliente) {
    $DataTable_TarePendientes[idCliente].destroy();
    //$DataTable_TarePendientes.draw();
    tablaNotificacionesPendientes(idCliente);
}

function buscarTablaNotificacionesGestionDia(idCliente) {
    $DataTable_TarePendientes[idCliente].destroy();
    //$DataTable_TarePendientes.draw();
    tablaNotificacionesGestionDia(idCliente);
}

function tablaNotificacionesGestionDia(idCliente) {
    $DataTable_TarePendientes[idCliente] = $('#TablaTraPendientes'+idCliente).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'cb82e5cf764b95117ae459bd5eee515a',
            'data':function (d) {
                d.search['parCliente'] = idCliente;
                d.search['value'] = $("#OTTPendientes_TextBusqueda"+idCliente).val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalSubTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    }
                }

           },
           {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'CodigoProyecto',
                "render": function (data, type, full, meta) {
                     return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                 }

            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraPendientes'+idCliente).css({'width':'100%'})
}

function tablaNotificacionesPendientes(idCliente) {
    $DataTable_TarePendientes[idCliente] = $('#TablaTraPendientes'+idCliente).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'54351b7558b6f67f068ccd2205ac32f0',
            'data':function (d) {
                d.search['parCliente'] = idCliente;
                d.search['value'] = $("#OTTPendientes_TextBusqueda"+idCliente).val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalSubTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    }
                }

           },
           {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'CodigoProyecto',
                "render": function (data, type, full, meta) {
                     return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                 }

            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    
                    return  '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                    
                    
                }

            },
        ],
        rowCallback:function(row,data)
        {
          
          if(data['FechaVSubTarea'] != null || data['FechaVTarea'] != null)
          {
            $($(row).find("td")).css("background-color","#ADEDAE");
            $($(row).find("td")).css("color","black");
            data['Estado'] = "PENDIENTE"
          }else if(data['Estado'] == "NV-PENDIENTE"){
            $($(row).find("td")).css("background-color","#ADEDAE");
            $($(row).find("td")).css("color","black");
            data['Estado'] = "PENDIENTE"
          }

        },
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraPendientes'+idCliente).css({'width':'100%'})
}

function modalNotificacionesSeguimiento() {
    $DataTable_TarePendientes = [];
    printDataAjax('4b46e38f507fb23f7a649e06b54bfc14', {}, data => {
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Tareas de Seguimiento</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
        data.clientes.forEach(e => {
            $DataTable_TarePendientes[e.Hash] = null;
            html += "<div class='ContenedorMenu'>"
                html += "<div class='panel-heading'>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td width = '90%' class = 'WhiteFont'>"
                                html += e.NombreComercial
                            html += "</td>"
                            html += "<td class = 'text-left' >"
                                html += "<a href='#' class = 'PAR_ContentTRAPENDIENTETAREAS"+e.Hash+"' onclick = \"ContentList('TRAPENDIENTETAREAS"+e.Hash+"')\">"
                                    html += "<i  class='Cursor fas fa-angle-double-down'></i>"
                                html += "</a>"
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"

                html += "<div class = 'ContenedorOptionDiv PARDIV_ContentTRAPENDIENTETAREAS"+e.Hash+"' style ='display:none;' >"
                    html += "<div class = 'BarraIconos'>"
                    html += "</div>"
                    html += "<div class = 'form-row'>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                            html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTTPendientes_TextBusqueda"+e.Hash+"' name = 'OTC_TextBusqueda' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = \"buscarTablaNotificacionesSeguimiento("+e.Hash+")\"/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div style='overflow: auto; white-space: nowrap;'>"
                        html += "<table class='dataTable tableNew' id = 'TablaTraSeguimiento"+e.Hash+"'>"
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>Tarea</th>"
                                    html += "<th>Asunto</th>"
                                    html += "<th>OT</th>"
                                    html += "<th>Departamento</th>"
                                    html += "<th>Fecha Creacion</th>"
                                    html += "<th>Hora Creacion</th>"
                                    html += "<th>Creador</th>"
                                    html += "<th>Tipo Tarea</th>"
                                    html += "<th>No Adjuntos</th>"
                                    html += "<th>Fecha Entrega</th>"
                                    html += "<th>Hora Entrega</th>"
                                    html += "<th>Fecha Respuesta</th>"
                                    html += "<th>Hora Respuesta</th>"
                                    html += "<th>Estado</th>"
                                html += "</tr>"
                            html += "</thead>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<br>"
        });
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        data.clientes.forEach(e => {
            tablaNotificacionesSeguimiento(e.Hash)
        });
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        ModalEdit(1)
    })
}

function buscarTablaNotificacionesSeguimiento(idCliente) {
    $DataTable_TarePendientes[idCliente].destroy();
    //$DataTable_TarePendientes[idCliente].draw();
    tablaNotificacionesSeguimiento(idCliente);
}

function tablaNotificacionesSeguimiento(idCliente) {
    $DataTable_TarePendientes[idCliente] = $('#TablaTraSeguimiento'+idCliente).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'04366d8fc25921d42719dc943800832b',
            'data':function (d) {
                d.search['parCliente'] = idCliente;
                d.search['value'] = $("#OTTPendientes_TextBusqueda"+idCliente).val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalSubTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    }
                }
           },
           {
                data: 'Asunto',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'CodigoProyecto',
                "render": function (data, type, full, meta) {
                     return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                 }

            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraSeguimiento'+idCliente).css({'width':'100%'})
}

function modalNotificacionesContestados() {
    $DataTable_TarePendientes = [];
    printDataAjax('0e1b513d8892d021763a850783e14916', {}, data => {
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Tareas Contestadas</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
        data.clientes.forEach(e => {
            $DataTable_TarePendientes[e.Hash] = null;
            html += "<div class='ContenedorMenu'>"
                html += "<div class='panel-heading'>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td width = '90%' class = 'WhiteFont'>"
                                html += e.NombreComercial
                            html += "</td>"
                            html += "<td class = 'text-left' >"
                                html += "<a href='#' class = 'PAR_ContentTRACONTESTADAS"+e.Hash+"' onclick = \"ContentList('TRACONTESTADAS"+e.Hash+"')\">"
                                    html += "<i  class='Cursor fas fa-angle-double-down'></i>"
                                html += "</a>"
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"

                html += "<div class = 'ContenedorOptionDiv PARDIV_ContentTRACONTESTADAS"+e.Hash+"' style ='display:none;' >"
                    html += "<div class = 'BarraIconos'>"
                    html += "</div>"
                    html += "<div class = 'form-row'>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                            html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTTPendientes_TextBusqueda"+e.Hash+"' name = 'OTTPendientes_TextBusqueda"+e.Hash+"' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = \"buscarTablaNotificacionesContestadas("+e.Hash+")\"/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div style='overflow: auto; white-space: nowrap;'>"
                        html += "<table class='dataTable tableNew' id = 'TablaTraContestadas"+e.Hash+"'>"
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>Tarea</th>"
                                    html += "<th>Asunto</th>"
                                    html += "<th>OT</th>"
                                    html += "<th>Departamento</th>"
                                    html += "<th>Fecha Creacion</th>"
                                    html += "<th>Hora Creacion</th>"
                                    html += "<th>Creador</th>"
                                    html += "<th>Tipo Tarea</th>"
                                    html += "<th>No Adjuntos</th>"
                                    html += "<th>Fecha Entrega</th>"
                                    html += "<th>Hora Entrega</th>"
                                    html += "<th>Fecha Respuesta</th>"
                                    html += "<th>Hora Respuesta</th>"
                                    html += "<th>Estado</th>"
                                html += "</tr>"
                            html += "</thead>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<br>"
        });
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        data.clientes.forEach(e => {
            tablaNotificacionesContestadas(e.Hash)
        });
        ModalEdit(1)
    })
}

function buscarTablaNotificacionesContestadas(idCliente) {
    $DataTable_TarePendientes[idCliente].destroy();
    tablaNotificacionesContestadas(idCliente);
}

function tablaNotificacionesContestadas(idCliente) {
    $DataTable_TarePendientes[idCliente] = $('#TablaTraContestadas'+idCliente).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'e4b972ac758b27ee606c929f0066213a',
            'data':function (d) {
                d.search['parCliente'] = idCliente;
                d.search['value'] = $("#OTTPendientes_TextBusqueda"+idCliente).val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="myModal(0); modalTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="myModal(0); modalSubTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    }
                }
           },
           {
                data: 'Asunto',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'CodigoProyecto',
                "render": function (data, type, full, meta) {
                     return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                 }

            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraContestadas'+idCliente).css({'width':'100%'})
}
/* ---------------------- -------------------
-------------------- OTS -----------------
--------------------------------------
 */

const OTCliente = {
    enviar: function (e) {
        sendForm(e, () => {
            $('#ModalEdit').modal('hide')
            BuscarTablaOTProyecto()
            notificacionesGenerales()
        })
    },
    listaEmpresas: function() {
        printDataAjax('dc47e12ac4a1068c236507bd36359ebb', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parEmpresa').html(html)
        })
    },
    listaUnidadesNegocio: function() {
        const datax = $('#parEmpresa').val()
        if (!datax) {
            return
        }
        printDataAjax('bde5b488693c2d2c22757174de731d4f', {HashEmpresa: datax}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.unidades.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parUnidadNegocio').html(html)
        })
    },
    listaClientes: function() {
        const data = $('#parEmpresa').val()
        if (!data) {
            return
        }
        printDataAjax('5ad0b953c7738fc7c077747ee8da3cb5', {HashEmpresa: data}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.clientes.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parCliente').html(html)
        })
    },
    listaProductos: function() {
        const data = $('#parCliente').val()
        if (!data) {
            return
        }
        printDataAjax('8a03824e9ff6949d861b44a40aed14e9', {HashCliente: data}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.productos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parProducto').html(html)
        })
    },
    listaSubProductos: function() {
        const data = $('#parProducto').val()
        if (!data) {
            return
        }
        printDataAjax('49d382bc75c15245ebb9c4a2d4cd896e',  {HashProducto:data}, data => {
            html = '<option selected>Seleccione</option>'
            data.subproductos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parSubProducto').html(html)
        })
    },
    listaEjecutivo: function() {
        printDataAjax('a752ef4487f59afe53e6cd67be658a5d', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.ejecutivos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#parEjecutivo').html(html)
        })
    },
    listaDirectores: function() {
        printDataAjax('2032e89f5721d0663d5649d85504934a', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.directores.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#parDirector').html(html)
        })
    },
    listaProfesionales: function() {
        const data = $('#parCliente').val()
        if (!data) {
            return
        }
        printDataAjax('9b909eb70578db07c1f5aee7553a59d6', {HashCliente: data}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.profesionales.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parProfesional').html(html)
        })
    },
    listSearchEmpresas: function () {
        printDataAjax('dc47e12ac4a1068c236507bd36359ebb', {}, data => {
            html = '<option value="-1" selected>Todos</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Proyecto').html(html)
        })
    },
    listSearchEstado: function () {
        printDataAjax('f07ce113ce58c015a410434637b977b0', {}, data => {
            html = '<option value="-1" selected>Todos</option>'
            data.estados.forEach(obj => {
                if( obj['Estado'] == 'Activo' ){
                    html += "<option value = '"+obj['Hash']+"' selected>"+obj['Estado']+"</option>"
                }else{
                    html += "<option value = '"+obj['Hash']+"'>"+obj['Estado']+"</option>"
                }
                
            });
            $('#OTC_Estado').html(html)
        })
    },
    loadFilesInf: function(e) {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            AdjuntosInf.push(files[i]);
        }
        e.target.value = ''
        $tableFilesInf.destroy()
        $tableFilesInf.draw();
        this.listarFilesInf();
    },
    listarFilesInf: function () {
        let dataRows = []
        for (let i = 0; i < AdjuntosInf.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: AdjuntosInf[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFilesInf = $('#listaAdjuntosInfOT').DataTable({
            data:dataRows,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "OTCliente.deleteFilesInf(\''+data+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
        })
        $('#listaAdjuntosInfOT').css({'width':'100%'})
    },
    deleteFilesInf: function (id) {
        AdjuntosInf.splice(parseInt(id)-1, 1)
        $tableFilesInf.destroy();
        $tableFilesInf.draw();
        this.listarFilesInf();
    },
}

function BuscarTablaOTProyecto() {
    $DataTable_OTProyectos.destroy();
    $DataTable_OTProyectos.draw();
    TablaOTTraCliente();
}

function TablaOTTraCliente() {
    
    $DataTable_OTProyectos = $('#TablaTraClienteOT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'06c193b023831dc894e4e14c418120b4',
            'data':function (d) {
                d.search['value'] = $("#OTC_TextBusqueda").val();
                d.search['HashE'] = $("#OTC_Proyecto").val();
                d.search['HashEst'] = $("#OTC_Estado").val();
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
            data: 'Hash',
            "orderable": false,
            "searchable": false,
            "render": function (data, type, full, meta) {
                return '<center> <input type="radio" data-toggle="modal" data-target="#ModalEdit" id="_ContentOTS_'+data+'" name="tareaProyectoOT" onchange="initTarea(\''+data+'\', \''+full.Codigo+'\')"></center>';
            }
            },
           {
               data: 'Codigo',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+' Cursor Hover" onclick="modalProyectoOT(\''+full.Hash+'\')">' + data + '</span>';
                }

            },
            {
                data: 'Referencia',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Director',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTD_'+full.Hash+'">' + data + '</span>';
                    }

                },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span>';
                    }

            },
            {
            data: 'Cliente',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
            data: 'Unidad',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTU_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Fecha',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
        ],
        
        
        rowCallback:function(row,data)
        {
          if(data['Estado'] == "Cerrado")
          {
            $($(row).find("td:eq(9)")).css({
                "background-color":"#9F3C3F",
                "text-align":"center"
            });
            $($(row).find("td:eq(0)")).css({
                "border-left":"7px solid #9F3C3F",
                "text-align":"center",
                "color":"#9F3C3F"
            });
          }else if(data['Estado'] == "Stand By / Detenido"){
            $($(row).find("td:eq(9)")).css({
                "background-color":"#F47629",
                "text-align":"center"
            });
            $($(row).find("td:eq(0)")).css({
                "border-left":"7px solid #F47629",
                "text-align":"center",
                "color":"#F47629"
            });
          }else if(data['Estado'] == "Pendiente Revisión Cliente"){
            $($(row).find("td:eq(9)")).css({
                "background-color":"#F4B919",
                "text-align":"center"
            }); 
            $($(row).find("td:eq(0)")).css({
                "border-left":"7px solid #F4B919",
                "text-align":"center",
                "color":"#F4B919"
            });
          }else if(data['Estado'] == "Activo"){
            $($(row).find("td:eq(9)")).css({
                "background-color":"#8DC63F",
                "text-align":"center"
            });
            $($(row).find("td:eq(0)")).css({
                "border-left":"7px solid #8DC63F",
                "text-align":"center",
                "color":"#8DC63F"
            });
          }

        },
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTraClienteOT').css({'width':'100%'})
}

function CrearOTTraCliente(Ruta) {

    var html = "";
   

    TituloVentana = "Crear Nueva OT"
    ImgVentana = "images/20_Crear_Nueva_OT.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='OTCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parEmpresa' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                html += "<select name = 'parEmpresa' id='parEmpresa' onchange='OTCliente.listaUnidadesNegocio(); OTCliente.listaClientes()' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parUnidadNegocio' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Unidad de Nogocio:</label>";
                html += "<select name='parUnidadNegocio' id='parUnidadNegocio' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";
        html += "</div>"

        html += "<hr>"

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parCliente' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
                html += "<select name = 'parCliente' id='parCliente' onchange='OTCliente.listaProductos(); OTCliente.listaProfesionales()' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parProducto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Producto:</label>";
                html += "<select name = 'parProducto' onchange='OTCliente.listaSubProductos()' id='parProducto' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parSubProducto' class='col-form-label'> SubProducto: </label>";
                html += "<select name = 'parSubProducto' id='parSubProducto' class='form-control'>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parProfesional' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Profesional:</label>";
                html += "<div>";
                    html += "<select name = 'parProfesional' id='parProfesional' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
        html += "</div>";

        html += "<hr>"

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parDirector' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Director:</label>";
                html += "<div>";
                    html += "<select name = 'parDirector' id='parDirector' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parEjecutivo' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Ejecutivo:</label>";
                html += "<div>";
                    html += "<select name = 'parEjecutivo' id='parEjecutivo' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
        html += "</div>";



        html += "<hr>"

        html += "<div class='form-group'>";
            html += "<label for='parReferencia' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Referencia:</label>";
            html += "<input type='text' name='parReferencia' id='parReferencia' autocomplete = 'off' class='form-control' placeholder='Proyecto XYZ'>"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='parDescripcion' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaEmpresas();
    OTCliente.listaDirectores();
    OTCliente.listaEjecutivo();

}

function modalProyectoOT(Hash) {

    $.ajax({
        type:'POST',
        url: '92b730dbd58aa180c6847a57af103225',
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
        },
        data: {Hash},
        success: function (data) {
            let editar = '';
            if( data.TRA_CLIENTES_OT_EDITAR > 0 ){
                editar = "<img src ='images/editar.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionOTProyectoEdicion()'/>"
            }

            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>PROYECTO OT: "+data.proyecto.Codigo+"</span>";
                        html += "</td>"
                        html += "<td width='10%' style = 'text-align:right;'><p></p>"
                            html += editar
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' action='"+UrlUniversal+'4e22d0b98860bfea9378036286efdb10'+"' onsubmit='OTCliente.enviar(event)' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.proyecto.HashId + "'>";

                html += "<div class='form-row'>"
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parEmpresa' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                        html += "<select name = 'parEmpresa' id='parEmpresa' onchange='OTCliente.listaUnidadesNegocio(); OTCliente.listaClientes()' class='form-control' required disabled>";
                            html += "<option>Seleccione</option>";
                            html += "<option value='"+data.proyecto.HashEmpresa+"' selected>"+data.proyecto.Empresa+"</option>"
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parUnidadNegocio' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Unidad de Nogocio:</label>";
                        html += "<select name='parUnidadNegocio' id='parUnidadNegocio' class='form-control' required disabled>";
                            html += "<option selected>Seleccione</option>";
                            html += "<option value='"+data.proyecto.HashUnidad+"' selected>"+data.proyecto.Unidad+"</option>"
                        html += "</select>";
                    html += "</div>";
                html += "</div>"

                html += "<hr>"

                html += "<div class='form-row'>"
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parCliente' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
                        html += "<select name = 'parCliente' id='parCliente' onchange='OTCliente.listaProductos(); OTCliente.listaProfesionales()' class='form-control' required disabled>";
                            html += "<option selected>Seleccione</option>";
                            html += "<option value='"+data.proyecto.HashCliente+"' selected>"+data.proyecto.Cliente+"</option>"
                        html += "</select>";
                    html += "</div>";

                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parProducto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Producto:</label>";
                        html += "<select name = 'parProducto' onchange='OTCliente.listaSubProductos()' id='parProducto' class='form-control' required disabled>";
                            html += "<option>Seleccione</option>";
                            html += "<option value='"+data.proyecto.HashProducto+"' selected>"+data.proyecto.Producto+"</option>"
                        html += "</select>";
                    html += "</div>";

                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parSubProducto' class='col-form-label'> SubProducto: </label>";
                        html += "<select name = 'parSubProducto' id='parSubProducto' class='form-control' disabled>";
                            html += "<option>Seleccione</option>";
                            if (data.proyecto.HashSubProducto) {
                                html += "<option value='"+data.proyecto.HashSubProducto+"' selected>"+data.proyecto.Subproducto+"</option>"
                            }
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parProfesional' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Profesional:</label>";
                        html += "<div>";
                            html += "<select name = 'parProfesional' id='parProfesional' class='form-control' required disabled>";
                                html += "<option>Seleccione</option>";
                                html += "<option value='"+data.proyecto.HashProfesional+"' selected>"+data.proyecto.Profesional+"</option>"
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>"

                html += "<hr>"

                html += "<div class='form-row'>"
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parDirector' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Director:</label>";
                        html += "<div>";
                            html += "<select name = 'parDirector' id='parDirector' class='form-control' required disabled>";
                                html += "<option>Seleccione</option>";
                                html += "<option value='"+data.proyecto.HashDirector+"' selected>"+data.proyecto.Director+"</option>"
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parEjecutivo' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Ejecutivo:</label>";
                        html += "<div>";
                            html += "<select name = 'parEjecutivo' id='parEjecutivo' class='form-control' required disabled>";
                                html += "<option>Seleccione</option>";
                                html += "<option value='"+data.proyecto.HashEjecutivo+"' selected>"+data.proyecto.Ejecutivo+"</option>"
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>"

                html += "<hr>"

                html += "<div class='form-row'>"
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parEstado' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Estado:</label>";
                        html += "<div>";
                            html += "<select name = 'parEstado' id='parEstado' class='form-control' required disabled>";
                                html += "<option>Seleccione</option>";
                                html += "<option value='"+data.proyecto.HashEstado+"' selected>"+data.proyecto.Estado+"</option>"
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group col-md-6'>";
                        html += "<label for='parEjecutivo' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha Creacion:</label>";
                        html += "<input class='form-control' type='date' value='"+data.proyecto.Fecha+"' readonly>"
                    html += "</div>";
                html += "</div>"

                html += "<div class='form-group'>";
                    html += "<label for='parReferencia' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Referencia:</label>";
                    html += "<input type='text' name='parReferencia' value='"+data.proyecto.Referencia+"' id='parReferencia' class='form-control' placeholder='Proyecto XYZ' readonly>"
                html += "</div>";

                html += "<div class='form-group'>";
                    html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                    html += "<textarea class='form-control' id='parDescripcion' name='parDescripcion' rows='3' disabled>"+data.proyecto.Descripcion+"</textarea>"
                html += "</div>";

                html += "<div class='modal-footer d-none' id='FooterInfoOTProyecto'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
            $('#ModalEdit').modal('show')
        }
    })
}

function InformacionOTProyectoEdicion() {
    let estadoEdicion = $('#OptionIconEdit').data('state')
    if (estadoEdicion == 1) {
        $('#OptionIconEdit').data('state', 1)
        $('#FooterInfoOTProyecto').addClass('d-none')
        $('#parProfesional').attr('disabled', true)
        $('#parDirector').attr('disabled', true)
        $('#parReferencia').attr('readonly', true)
        $('#parDescripcion').attr('disabled', true)
        $('#OptionIconEdit').data('state', 0)
    } else {
        const director = $('#parDirector').val()
        const profesional = $('#parProfesional').val()
        OTCliente.listaDirectores();
        OTCliente.listaProfesionales();
        $('#FooterInfoOTProyecto').removeClass('d-none')
        $('#parProfesional').attr('disabled', false)
        $('#parDirector').attr('disabled', false)
        $('#parReferencia').attr('readonly', false)
        $('#parDescripcion').attr('disabled', false)
        setTimeout(() => {
            $('#parProfesional').val(profesional)
            $('#parDirector').val(director)
        }, 1500);
        $('#OptionIconEdit').data('state', 1)
    }
}


//----------------------------------------------------------------------------------------------//
//------------------------------------ Tarea clientes -----------------------------------------//
//--------------------------------------------------------------------------------------------//

const Tarea = {
    id: null,
    codigo: null,
    notificacion: false,
    files : [],
    enviar: function (e) {
        const ExtraData = {parAdjuntos : this.files}
        sendForm(e, () => {
            ModalEdit2(0);
            initTarea($IdProyecto, $CodigoProyecto);
            BuscarTablaTarea()
            notificacionesGenerales()
        },
        ExtraData)
    },
    listaTipoTarea: function () {
        const departamentox = $('#parDepartamento').val()
        if (!departamentox) {
            return
        }
        printDataAjax('b78d35629037f2d88d1acf26c48d60df', {HashDepartamento: departamentox}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.tipoTarea.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parTipoTarea').html(html)
        })
    },
    listaDepartamentos: function () {
        printDataAjax('7a5382310484d6637d921d2580e2ed7b', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.departamentos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parDepartamento').html(html)
        })
    },
    listTiposActividad: function (){
        printDataAjax('c5bf651acc16c564c0aea75ade0da094', {}, data => {
            html = '<option value="" >Seleccione</option>'
            data.Tipos.forEach(obj => {
                html += "<option value = '"+obj['Id']+"'>"+obj['Nombre']+"</option>"
            });
            console.log(html)
            $('#parTipoSolicitud').html(html)
        })
    },
    listTiposActividadRespuesta: function (){
        printDataAjax('c5bf651acc16c564c0aea75ade0da094x', {}, data => {
            html = '<option value="" >Seleccione</option>'
            data.Tipos.forEach(obj => {
                html += "<option value = '"+obj['Id']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parTipoSolicitud').html(html)
        })
    },
    listaResponsables: function () {
        const departamento = $('#parDepartamento').val()
        if (!departamento) {
            return
        }
        printDataAjax('1c0f6ac4c54b666640b9ec6cd7b09374', {HashDepartamento: departamento}, data => {
            
            html = '<table class = "tableNew">'
                html += '<tr>'
                    html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;" class = "CenterText">'
                        html += '<div >'
                            html += '<input type="checkbox" id="checkTodosR" onchange="Tarea.checkTodos(event, \'tarea-responsables\')">'
                            html += '<label class="form-check-label" >'
                                html += 'Sel. Todo'
                            html += '</label>'
                        html += '</div>'
                    html += '</th>'    
                    html += '<th style = "border:0px;"></th>'
                    //html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;">Hoy</th>'
                    //html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;">Otros Días</th>'
                html += '</tr>'
                html += '<tr>'
                        
                html += '</tr>'
            
            //html += '<hr>'
            data.responsables.forEach(element => {
                html += '<tr>'
                    html += '<td class = "CenterText ResponsablesDepartamentos">'
                        html += '<div >'
                            html += '<input class="tarea-responsables" name="parResponsables[]" type="checkbox" value="'+element.IdUsuario+'">'
                        html += '</div>'
                    html += '</td>'
                    html += '<td>'+element.NombreUsuario+'</td>'
                    //html += '<td class = "CenterText">'+element.PendientesAHoy+'</td>'
                    //html += '<td class = "CenterText">'+element.PendientesAGeneral+'</td>'
                html += '<tr>'
            });
            html += '</table>'
            $('#parResponsables').html(html)
            if( $('#parDepartamento').val() == '6910400'){
                $(".ResponsablesDepartamentos input").prop( "checked", true );
            }
        })
    },
    listaAsignados: function () {
        const departamento = $('#parDepartamento').val()
        if (!departamento) {
            return
        }
        printDataAjax('452f332f565173807af7bc1dac1dc9c8', {HashDepartamento:departamento}, data => {
            
            html = '<table class = "tableNew">'
                html += '<tr>'
                    html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;" class = "CenterText">'
                        html += '<div >'
                            html += '<input type="checkbox" id="checkTodosA" onchange="Tarea.checkTodos(event, \'tarea-asignados\')">'
                            html += '<label class="form-check-label" >'
                                html += 'Sel. Todo'
                            html += '</label>'
                        html += '</div>'
                    html += '</th>'    
                    html += '<th style = "border:0px;"></th>'
                    //html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;">Hoy</th>'
                    //html += '<th style = "background-color:#F1F2F2;border:1px solid #e6e4e4;">Otros Días</th>'
                html += '</tr>'
                html += '<tr>'
                        
                html += '</tr>'
            
            //html += '<hr>'
            data.asignados.forEach(element => {
                html += '<tr>'
                    html += '<td class = "CenterText AsignadosDepartamentos">'
                        html += '<div >'
                            html += '<input class="tarea-asignados" name="parAsignados[]" type="checkbox" value="'+element.IdUsuario+'">'
                        html += '</div>'
                    html += '</td>'
                    html += '<td>'+element.NombreUsuario+'</td>'
                    //html += '<td class = "CenterText">'+element.PendientesAHoy+'</td>'
                    //html += '<td class = "CenterText">'+element.PendientesAGeneral+'</td>'
                html += '<tr>'
            });
            html += '</table>'
            $('#parAsignados').html(html)
            if( $('#parDepartamento').val() == '6910400'){
                $(".AsignadosDepartamentos input").prop( "checked", true );
            }
        })
    },
    loadFiles: function(e) {
        console.log(e.target);
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            this.files.push(files[i]);
        }
        e.target.value = ''
        $tableFiles.destroy()
        $tableFiles.draw();
        this.listarFiles();
    },
    listarFiles: function () {
        let dataRows = []
        for (let i = 0; i < this.files.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: this.files[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFiles = $('#listaAdjuntosTareaOT').DataTable({
            data:dataRows,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "Tarea.deleteFiles(\''+data+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
        })
        $('#listaAdjuntosTareaOT').css({'width':'100%'})
    },
    deleteFiles: function (id) {
        this.files.splice(parseInt(id)-1, 1)
        $tableFiles.destroy()
        $tableFiles.draw();
        this.listarFiles()
    },
    checkTodos: function (e, indicador) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.'+indicador)
        selcs.forEach(sel => {
            sel.checked = selected
        });
    },
    listSearchEstado: function () {
        printDataAjax('e437a8b417bfa5ddd160338adfad4bae', {}, data => {
            html = '<option value="-1" selected>Todos</option>'
            data.estados.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTT_Estado').html(html)
        })
    },
    downloadFile: function (id) {
        window.open((UrlUniversal+'70387f8087a0fc297af72111d10f50d3/'+id), '_blank')
    }
}

function InformesEntrevistaProyecto(){
    $.ajax({
        type:'POST',
        url: UrlGeneral+'2cea7c9610a2d44beed0d03e71247db9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = UrlGeneral+"images/menu/_Datos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa2+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<img src = '"+urlLogoEmpresa+"' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Información Tributara "+ $(".NameComercial"+Hash).text() +"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '"+UrlGeneral+"images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='TI_IdTipoDocumento' col-form-label'>Tipo de Tarifa / Impuesto:</label>"
                        html += "<select class = 'form-control-plaintext border rounded TI_IdTipoDocumento' name = 'TI_IdTipoDocumento' id = 'TI_IdTipoDocumento' >";
                            html += "<option value = '0' selected>Tarifas Vigentes</option>"
                            for(var i = 0; i < data.Lista2.length; i++){
                                html += "<option value = '"+data.Lista2[i]['Hash']+"'>"+data.Lista2[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='TI_TextBusqueda'>Texto:</label>"
                        html += "<input type = 'text' class = 'form-control-plaintext border rounded TI_TextBusqueda ' id = 'TI_TextBusqueda' name = 'TI_TextBusqueda' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='"+UrlGeneral+"images/administracion_buscar.png' class = 'OptionIcon' onclick = 'BuscarTIEmpresa("+Hash+",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div><br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable TI"+Hash+"' id = 'TI"+Hash+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nombre Tarifa/Impuesto</th>"
                            html += "<th>Fecha Vencimiento</th>"
                            html += "<th>Tipo</th>"
                            html += "<th>Valor</th>"
                            html += "<th>Notificar A</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Estado</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table></div>";
                $(".content_modal").html(html);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                ResizeModal(0.9)
                TablaTIEmpresa(Hash,Hash2)
            }
        }
    })
}

function OpcionesTraficoOTS(Turno,id){
    if( Turno == 1 ){
        $(".ChildTabsMenu").hide();
        $(".TabsMenu1").show()
    }else if (Turno == 2){

    }else if(Turno == 3){

    }
}

function TablaDocProyectos(Hash){
    $DataTable_Empresa_Personal_DL = $("#TablaOtrosDocumentosOT").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'ab9bcd4753799e763414e55d167995af',
            'data':function (d) {
                    d.search['value'] = $("#OD_TextBusqueda").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'_token':document.getElementsByName('_token')[0].value
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
               data: 'Nombre',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'NombreUsuario',
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
                    htmlx += '<center><a target="_blank" href="../storage/app/Trafico/Proyectos/'+full.IdProyecto+'/'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<center>';
                        htmlx += '<img src ="images/eliminar.png" class = "OptionIcon" onclick = "EliminarDocumentProyecto('+Hash+','+full.Hash+')"/>'
                    htmlx += '</center>';
                    return htmlx;
                }
           }
        ],
        "order": [[2, "asc"]],

        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaOtrosDocumentosOT').css({'width':'100%'})
}

function EliminarDocumentProyecto(Hash,Hash2){
    if( confirm("¿Está Seguro(a) de Eliminar este documento?") ){
        var formData = new FormData();
	formData.append("Hash", Hash2);
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:'ab9bcd4753799e763414e55d167995af2',
            success:function(data){
                BuscarDocumentosProyecto(Hash)

            }
        })
    }
}

function BuscarDocumentosProyecto(Hash){
    $DataTable_Empresa_Personal_DL.destroy()
    TablaDocProyectos(Hash)
}

function MenuProyectoCliente(id,codigo){
    $.ajax({
        type:'POST',
        url:'45a6a3d2e81997dab555dd16793d7480',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html ="";
            

            TituloVentana = "Información OT: <span class = 'GOT_Name'>"+codigo+"</span>"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<div Id = 'TabsMenu'>";
                    html += "<ul >";
                        html += "<li onclick = 'MostrarTabsMenu(1);OpcionesTraficoOTS(1,"+id+")' class = ''>"
                            
                            html += "<a href = '#TabsMenu-1'>"
                                html += "<span>Tareas</span>"
                            html += "</a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(2);OpcionesTraficoOTS(2,"+id+")' class = ''>"
                            html += "<a href = '#TabsMenu-2'>"
                                html += "<span>Brief</span>"
                            html += "</a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(3);OpcionesTraficoOTS(3,"+id+");BuscarTablaInformesEntrevista();' class = ''>"
                            html += "<a href = '#TabsMenu-3'>"
                                html += "<span>Actas</span>"
                            html += "</a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(4);OpcionesTraficoOTS(4,"+id+");BuscarDocumentosProyecto("+id+")' class = ''>"
                            html += "<a href = '#TabsMenu-4'>"
                                html += "<span>Documentos Adicionales</span>"
                            html += "</a>"
                        html +="</li>";
                    html += "</ul>";
                


                    html += "<div id = 'TabsMenu-1' >";    
                        html += "<div class = 'ContenedorOptionDiv'>"
                            html += "<table>";
                                html += "<tr>"
                            if( data.TRA_CLIENTES_TAREAOT_CREAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<div class = 'BarraIconos'>";
                                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");crearTareaOT()' />";
                                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");crearTareaOT()' >Crear Nueva Tarea</span>";
                                        html += "</div>";
                                    html += "</td>"
                            }
                                html += "</tr>"
                            html += "</table>"
                            html += "<div class = 'form-row'>"
                                html +="<div class='col col-sm-3 my-2'>"
                                        html +="<label for='OTT_Estado'>Estado:</label>"
                                        html +="<select class ='form-control' name = 'OTT_Estado' id = 'OTT_Estado'>"
                                            html +="<option value = '-1' >Todos</option>"
                                            html +="<option value = '1' selected >Activo</option>"
                                            html +="<option value = '0'>Inactivo</option>"
                                        html +="</select>"
                                    html +="</div>"
                                    html +="<div class='col col-sm-3 my-2'>"
                                        html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
                                        html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTCT_TextBusqueda' name = 'OTCT_TextBusqueda' />"
                                    html +="</div>"
                                    html +="<div class='col col-sm-3 my-2'>"
                                        html +="<p></p>"
                                        html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaTarea()'/>"
                                    html +="</div>"
                                html +="</div>"
                            html +="</div>"
                            html +="<div style='overflow: auto; white-space: nowrap;'>"
                                html +="<table class='dataTable tableNew' id = 'TablaTareaProyectoOT'>"
                                    html +="<thead>"
                                        html +="<tr>"
                                            html +="<th>Tarea</th>"
                                            html +="<th>Asunto</th>"
                                            html +="<th>Tipo Actividad</th>"
                                            html +="<th>Departamento</th>"
                                            html +="<th>Fecha Creacion</th>"
                                            html +="<th>Hora Creacion</th>"
                                            html +="<th>Creador</th>"
                                            html +="<th>Tipo Tarea</th>"
                                            html +="<th>No Adjuntos</th>"
                                            html +="<th>Fecha Entrega</th>"
                                            html +="<th>Hora Entrega</th>"
                                            html +="<th>Fecha Respuesta</th>"
                                            html +="<th>Hora Respuesta</th>"
                                            html +="<th>Estado</th>"
                                        html +="</tr>"
                                    html +="</thead>"
                                html +="</table>"
                            html +="</div>"
                        html +="</div>"
                    

                    //BRIEF
                    html += "<div id = 'TabsMenu-2' ></div>"

                    //INFORME DE ENTREVISTA
                    html += "<div id = 'TabsMenu-3' >";
                        html += "<div class = 'ContenedorOptionDiv'>"
                            html += "<table>";
                                html += "<tr>"
                            if( data.TRA_CLIENTES_OT_INFENT_CREAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<div class = 'BarraIconos'>";
                                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");CrearInformeEntrevista()' />";
                                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");CrearInformeEntrevista()' >Crear Informe de Entrevista</span>";
                                        html += "</div>";
                                    html += "</td>"
                            }
                                html += "</tr>"
                            html += "</table>"
                            html += "<div class = 'form-row'>"
                                html +="<div class='col col-sm-3 my-2'>"
                                    html +="<label for='OTT_Estado'>Estado:</label>"
                                    html +="<select class ='form-control' name = 'OTINF_Estado' id = 'OTINF_Estado'>"
                                        html +="<option value = '-1' selected >Todos</option>"
                                        html +="<option value = '1'  >Creado Sin Enviar</option>"
                                        html +="<option value = '2'>Creado y Enviado</option>"
                                    html +="</select>"
                                html +="</div>"
                                html +="<div class='col col-sm-3 my-2'>"
                                    html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
                                    html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTINF_TextBusqueda' name = 'OTINF_TextBusqueda' />"
                                html +="</div>"
                                html +="<div class='col col-sm-3 my-2'>"
                                    html +="<p></p>"
                                    html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaInformesEntrevista()'/>"
                                html +="</div>"
                            html +="</div>"
                            html +="<div style='overflow: auto; white-space: nowrap;'>"
                                html +="<table class='dataTable tableNew' id = 'TablaInformesEntrevistaOT'>"
                                    html +="<thead>"
                                        html +="<tr>"
                                            html +="<th>#</th>"
                                            html +="<th>Asunto</th>"
                                            html +="<th>Fecha Informe</th>"
                                            html +="<th>Fecha Creacion</th>"
                                            html +="<th>Hora Creacion</th>"
                                            html +="<th>Creador</th>"
                                            html +="<th>Tipo Informe</th>"
                                            html +="<th>Estado</th>"
                                            html +="<th>Descargar</th>"
                                            html +="<th>Acciones</th>"
                                        html +="</tr>"
                                    html +="</thead>"
                                html +="</table>"
                            html +="</div>"
                        html +="</div>"
                    html += "</div>"
                    
                    //OTROS DOCUMENTOS
                    
                    html += "<div id = 'TabsMenu-4' >";
                        html += "<div class = 'ContenedorOptionDiv'>"
                            html += "<table>";
                                html += "<tr>"
                            if( data.TRA_CLIENTES_OTROS_DOCUMENTOS_CREAR == 1 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<div class = 'BarraIconos'>";
                                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");NuevoDocumentoProyecto("+id+")' />";
                                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CierraModal(\"ModalEdit\",\"ModalEdit2\");NuevoDocumentoProyecto("+id+")' >Agregar Documento</span>";
                                        html += "</div>";
                                    html += "</td>"
                            }
                                html += "</tr>"
                            html += "</table>"
                            html += "<div class = 'form-row'>"
                                html +="<div class='col col-sm-3 my-2'>"
                                    html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
                                    html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OD_TextBusqueda' name = 'OD_TextBusqueda' />"
                                html +="</div>"
                                html +="<div class='col col-sm-3 my-2'>"
                                    html +="<p></p>"
                                    html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosProyecto("+id+")'/>"
                                html +="</div>"
                            html +="</div>"
                            html +="<div style='overflow: auto; white-space: nowrap;'>"
                                html +="<table class='dataTable tableNew' id = 'TablaOtrosDocumentosOT'>"
                                    html +="<thead>"
                                        html +="<tr>"
                                            html +="<th>#</th>"
                                            html +="<th>Nombre</th>"
                                            html +="<th>Fecha Creacion</th>"
                                            html +="<th>Creador</th>"
                                            html +="<th>Descargar</th>"
                                            html +="<th>Eliminar</th>"
                                        html +="</tr>"
                                    html +="</thead>"
                                html +="</table>"
                            html +="</div>"
                        html +="</div>"
                    html += "</div>"
                html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            tablaTarea()
            $("#TabsMenu").tabs()
            //tablaInformesEntrevista();
            Tarea.listSearchEstado()
            TablaDocProyectos(id)
            //MostrarTabsMenu(1);
        }
    });
}

function NuevoDocumentoProyecto(id){
    var html = "";
    

    TituloVentana = "Nuevo Documento Proyecto/OT: "+$(".GOT_Name").text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<div class = 'form-row'>"
            html +="<div class='col col-sm-12 my-2'>"
                html +="<label for='OTC_TextBusqueda'><span class = 'Obligatorio'>(*)</span>    Nombre Documento:</label>"
                html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DP_Nombre' name = 'DP_Nombre' />"
            html +="</div>"
        html +="</div>"
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12'>"
                html += "<div class='custom-file mb-12' style = 'display: block;'>";
                    html += "<input required type='file' class='custom-file-input foto1' id='foto1' name='foto[]' value='' onchange='uploadImage(this)' >"
                    html += "<label class='custom-file-label' id='foto1' for='foto1'>Seleccione el Archivo...</label>"
                html += "</div>";
            html += "</div>"
        html += "</div>"

        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-12 CenterText'>"
                html += "<button type = 'button' onclick = 'GuardarDocumentoProyecto("+id+")'class = 'btn btn-primary'>Guardar</button>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
    $(".form-group label").css({'font-size':'12px'})
    $(".form-group input,.form-group select").css({'font-size':'13px'})
}

function GuardarDocumentoProyecto(Hash){
    var archivos = document.getElementById("foto1");
    if( $("#DP_Nombre").val().length > 2 && archivos.files.length > 0){
        var formData = new FormData();
	formData.append("Hash", Hash);
	formData.append("Nombre", $("#DP_Nombre").val());
        
        for (var i = 0; i < archivos.files.length; i++) {
                formData.append("foto"+i, archivos.files[i]);
        }

        formData.append("archivos", archivos.files.length);

        $.ajax({

                headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url:'a4111dd1f9753b2ed9cde93556621765',
                success:function(data){
                    ModalEdit2(0)
                    ModalEdit(1);
                    
                }
        })
    } else{
        alert("Debe ingresar los campos obligatorios")
    }
    
}

function initTarea(id, codigo) {
    var html = "";
    $IdProyecto = id;
    $CodigoProyecto = codigo;
    
    $(".HidenInformation").show()
    Tarea.id = id
    Tarea.codigo = codigo
    
    MenuProyectoCliente(id,codigo)
    tablaInformesEntrevista()
    ModalEdit(1)
}
/*
let tareaOT = document.getElementById('TareaOT')
tareaOT.addEventListener('animationend', function (params) {
    $('#TareaOT').removeClass('animate__backInDown')
})
*/
function BuscarTablaTarea() {
    $DataTable_TareaOTProyectos.destroy();
    tablaTarea();
}

function tablaTarea() {
    $DataTable_TareaOTProyectos = $('#TablaTareaProyectoOT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'3ba46c5c0d8db73c37ab9e4b1386c58d',
            'data':function (d) {
                d.search['value'] = $("#OTCT_TextBusqueda").val();
                d.search['proyecto'] = Tarea.id;
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" data-toggle="modal" data-target="#ModalEdit2" onclick="modalTareaOT(\''+full.Hash+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" data-toggle="modal" data-target="#ModalEdit2"  onclick="modalSubTareaOT(\''+full.Hash+'\')">' + data + '</span></center>';
                    }
                }
           },
           {
                data: 'Asunto',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'TipoActividad',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center> ';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTareaProyectoOT').css({'width':'100%'})
}


function BuscarTablaInformesEntrevista(){
    $DataTable_InformesProyectos.destroy();
    //$DataTable_TareaOTProyectos.draw();
    tablaInformesEntrevista();
}

function tablaInformesEntrevista(){
    $DataTable_InformesProyectos = $('#TablaInformesEntrevistaOT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'5e3750b3f123e3b8bdccd914b725ef75',
            'data':function (d) {
                d.search['value'] = $("#OTINF_TextBusqueda").val();
                d.search['Hash'] = Tarea.id;
                d.search['EstadoInforme'] = $("#OTINF_Estado").val();;
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "render": function (data, type, full, meta) {
                    return '<center> <a href = "">' + data + '</a></center>';
                }
           },
           {
                data: 'Referencia',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'FechaInforme',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'FechaCreacion',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

                },
            {
                data: 'TipoInforme',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<center><a target="_blank" href="'+UrlGeneral+'b4ac42fb5d888c8a2fbcf7e5d8415bec/'+full.Hash+'">';
                        htmlx += '<img src ="images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    var ht = ''
                    if( data == 'Creado Sin Enviar' ){
                        ht += '<img src ="images/trafico_enviar.png" onclick = "EnviarInformeEntrevista('+full.Hash+')"class = "OptionIcon"/>'
                    }
                    return '<center>'+ht+'</center>';
                }

            }
        ],
        "order": [[2, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaInformesEntrevistaOT').css({'width':'100%'})
}

function crearTareaOT() {
    var Ruta = '75d327fc20cecb6c090edca0846575ac';
    var html = "";
    

    TituloVentana = "Crear Tarea OT: "+$CodigoProyecto
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "CierraModal(\"ModalEdit2\",\"ModalEdit\");"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body' >";
        html += "<form class='form-signin' onsubmit='Tarea.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='parProyecto' value='" + Tarea.id + "'>";

        html += "<div class='form-group'>";
            html += "<label for='parDepartamento' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Deartamento:</label>";
            html += "<select name = 'parDepartamento' id='parDepartamento' onchange='Tarea.listaResponsables(); Tarea.listaAsignados();Tarea.listaTipoTarea();' class='form-control' required>";
                html += "<option selected>Seleccione</option>";

            html += "</select>";
        html += "</div>";

        html += "<hr>"

        html += "<div class='form-row flex'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsables:</label>";
                html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:auto'>";
                   
                html += "</div>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parAsignados' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
                html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:auto;'>";
                    
                html += "</div>";
            html += "</div>";
        html += "</div>";

        html += "<hr>"
        //listTiposActividad
        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parFecha' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha:</label>";
                html += "<input type='date' name='parFecha' id='parFecha' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora:</label>";
                html += "<input type='time' name='parHora' id='parHora' class='form-control'>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";
                html += "</select>";
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Tarea:</label>";
                html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parAsunto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
            html += "<input type='text' name='parAsunto' id='parAsunto' class='form-control'  autocomplete = 'off' />"
        html += "</div>";


        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='parDescripcion' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parNroEntregables'><span class = 'Obligatorio'>(*)</span> Nro. Entregables:</label>";
            html += "<input type='number' name='parNroEntregables' id='parNroEntregables' class='form-control' min='1' placeholder='1' >"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label>Adjuntos:</label>";
            html += "<input type='file' class='form-control' onchange='Tarea.loadFiles(event)' multiple>"
        html += "</div>";

        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Descartar</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"

        html += "<div class='modal-footer'>";
            
            html += "<button type='submit' class='btn btn-primary' onclick = 'CierraModal(\"ModalEdit2\",\"ModalEdit\");BuscarTablaTarea()'>Guardar</button>";
        html += "</div>";

    html += "</form>";
    html += "</div>";
    Tarea.files = []
    //Tarea.listaTipoTarea();
    Tarea.listaDepartamentos();
    Tarea.listarFiles()
    Tarea.listTiposActividad()
    $(".content_modal2").html(html);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
       dd = '0' + dd;
    }

    if (mm < 10) {
       mm = '0' + mm;
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#parFecha").attr("min", today);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    
}

function modalTareaOT(Hash, idProyecto=null, CodigoOT=null) {
    
    if (idProyecto !== null && CodigoOT !== null) {
        Tarea.id = idProyecto
        Tarea.codigo = CodigoOT
        Tarea.notificacion = true
        $("#TareaOT").addClass('d-none');
        document.querySelectorAll("input[name='tareaProyectoOT']").forEach( e => {e.checked = false})
    } else {
        Tarea.notificacion = false
    }
    printDataAjax('692b650e2551e2c4d0b8c379178d7b25', {parTarea: Hash}, data => {
        let editar = '';
        let contestar = '';
        let CambiarEstado = '';
        if( data.TRA_CLIENTE_TAREA_EDITAR){
            editar = "<img src ='images/editar.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = 'informacionTareaOTEdicion()'/>"
        }

        if( data.TRA_CLIENTE_TAREA_CONTESTADA){
            contestar = "<img src = 'images/btn_resp_tarea_blanco.png' id='OptionIconEdit' class='OptionIcon' onclick = \"crearSubtareaOT('"+data.tarea.Id+"', '"+data.tarea.Id+"', 'PADRE','"+(UrlUniversal+'cbe2e4f260ef5bbfe58c112825b3b494')+"', 'Responder')\"/>"
        }
        
        if( data.TRA_CLIENTE_ENVIAR_CLIENTE){
            //editar = "<img src ='images/editar.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = 'informacionSubTareaOTEdicion()'/>"
            CambiarEstado = "<img src ='images/btn_enviaracliente_blanco.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = \"Tra_PteOT('"+idProyecto+"', '"+CodigoOT+"')\"'/>"
        }
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table class = 'CabeceraVentanas' width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap nowrap width = '85%'>"
                        html += "<span class = 'TituloBuscador2'><span class = 'TituloTarea'></span><span class = 'TituloBuscador'>Tarea "+data.tarea.Numeracion+" OT: "+(CodigoOT === null ? Tarea.codigo : CodigoOT)+"</span></span>";
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += "<i class='fas fa-history' onclick=\"historialTarea('"+data.tarea.Id+"', "+null+"); ModalEdit(0)\"></i>"
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += editar
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += CambiarEstado
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += contestar
                    html += "</td>"
                    html += "<td>"
                    if (CodigoOT === null) {
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html +=  "<img src = '"+UrlUniversal+"images/cerrar_white.png' class = 'IconoCerrar' />";
                    } else {
                        html += "<button type='button' class='close' onclick='ModalEdit2(0); ModalEdit(1)' data-dismiss='modal' aria-label='Close'>";
                        html += "<img src = '"+UrlUniversal+"images/cerrar_white.png' onclick='ModalEdit2(0); ModalEdit(1)' class = 'IconoCerrar' />";
                    }
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<form class='form-signin' onsubmit='Tarea.enviar(event)' action='"+UrlUniversal+"2196b8ef1d725788a4f617a978bc2648' method='post'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='parProyecto' value='" + Tarea.id + "'>";
            html += "<input type='hidden' name='parTarea' value='" + data.tarea.Id + "'>";
            html += "<input type='hidden' name='parSubtarea'>";
            //departamento
            html += "<div class='form-group'>";
                html += "<label for='parDepartamento' class='col-form-label'> Departamento:</label>";
                html += "<select name = 'parDepartamento' id = 'parDepartamento' class = 'form-control' readonly>"
                html += "</select>"
            html += "</div>";

            html += "<hr>"
            //responsables
            html += "<div class='form-row flex'>"
                html += "<div class='form-group col-md-6'>";
                    html += "<label for='parResponsables' class='col-form-label'> Responsables:</label>";
                    html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em' disabled>";
                    html += "<ul class='list-group list-group-flush'></ul>"
                    data.tarea.responsables.forEach(e => {
                       if( e.FechaVisualizacion != null ){
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+", Visualizada el "+e.FechaVisualizacion+"</li>"
                        }else{
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+"</li>"
                        }
                    });
                    html += "<ul class='list-group list-group-flush'></ul>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-6'>";
                    html += "<label for='parAsignados' class='col-form-label'> Asignados:</label>";
                    html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em' disabled>";
                    html += "<ul class='list-group list-group-flush'></ul>"
                    data.tarea.asignados.forEach(e => {
                       if( e.FechaVisualizacion != null ){
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+", Visualizada el "+e.FechaVisualizacion+"</li>"
                        }else{
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+"</li>"
                        }
                    });
                    html += "<ul class='list-group list-group-flush'></ul>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            html += "<hr>"
            //Fecha Entrega
            html += "<div class='form-row'>"
                html += "<div class='form-group col-md-4'>"
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Entrega:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFechaEntrega' id='parFechaEntrega' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHoraEntrega' id='parHoraEntrega' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-4'>";
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Creación:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFechaCreada' id='parFechaCreada' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHoraCreada' id='parHoraCreada' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-4'>";
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Respuesta:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFechaRespondida' id='parFechaRespondida' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHoraRespondida' id='parHoraRespondida' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            //Tipo Tarea
            html += "<div class='form-row'>";
                html += "<div class = 'col-md-6'>"
                    html += "<label for='parTipoTarea' class='col-form-label'> Tipo de Actividad:</label>";
                    html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' disabled>";
                        html += "<option value='' selected>Seleccione</option>"
                        data.TraTipoProceso.forEach(obj => {
                            if( obj['Id'] == data.tarea.IdTipoActividad ){
                                html += "<option value = '"+obj['Id']+"' selected>"+obj['Nombre']+"</option>"
                            }else{
                                html += "<option value = '"+obj['Id']+"' >"+obj['Nombre']+"</option>"
                            }
                        });
                    html += "</select>";
                html += "</div>"
                html += "<div class = 'col-md-6'>"
                    html += "<label for='parTipoTarea' class='col-form-label'> Tipo de Tarea:</label>";
                    html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' disabled>";
                        html += "<option value='' selected>Seleccione</option>"
                        data.TipoTarea.forEach(obj => {
                            if( obj['Hash'] == data.tarea.IdTipoTarea ){
                                html += "<option value = '"+obj['Hash']+"' selected>"+obj['Nombre']+"</option>"
                            }else{
                                html += "<option value = '"+obj['Hash']+"' >"+obj['Nombre']+"</option>"
                            }
                        });
                    html += "</select>";
                html += "</div>"
            html += "</div>";
            //Asunto
            html += "<div class='form-group'>";
                html += "<label for='parAsunto' class='col-form-label'> Asunto:</label>";
                    html += "<input type='text' name='parAsunto' id='parAsunto' class='form-control' placeholder='Proyecto XYZ' required readonly>"
                
            html += "</div>";
            html += "<div class='form-group'>"
                html += "<label for='parAsunto' class='col-form-label'> Requerimiento Cliente:</label>";
                if( data.tarea.IdrequerimientoCliente == null ){
                    html += "<input type='text' class='form-control Cursor' value =  '' required readonly>"
                }else{
                    html += "<input type='text' class='form-control Cursor' onclick = 'ConsultarRequerimientoCliente_tra("+data.tarea.HashRq+")' value = "+data.tarea.IdrequerimientoCliente+" required readonly>"
                }
                
            html += "</div>";
            //Descripcion
            html += "<div class='form-group'>";
                html += "<label for='parDescripcion'> Descripción:</label>";
                html += "<textarea class='form-control' id='parDescripcion' name='parDescripcion' rows='3' disabled></textarea>"
            html += "</div>";

            //NroEntregables
            html += "<div class='form-group'>";
                html += "<label for='parNroEntregables'> Nro. Entregables:</label>";
                html += "<input type='number' name='parNroEntregables' id='parNroEntregables' class='form-control' min='0' placeholder='0' readonly>"
            html += "</div>";

            // Archivos
            html += "<div class='lista' id=''>"
                html += "<center><b> Adjuntos </b></center>"
                html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT2'>"
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nombre</th>"
                            html += "<th>Descargar</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table>"
                html += "<a href = '"+UrlUniversal+"Zipper/Zip.php?Tipo=T&&Hash="+data.tarea.Hashing+"'>Descargar Adjuntos en Zip</a>"
            html += "</div>"
            if( data.TRA_CLIENTE_TAREA_EDITAR){
                html += "<div class='form-group' id='FooterInfoTareaOTProyecto'>";
                    if( data.TRA_CLIENTE_TAREA_CONTESTADA){
                        html += "<button class='btn btn-outline-primary' onclick = \"$('.content_modal').html(''); ModalEdit(0); FinalizarTarea('"+data.tarea.Id+"', '"+Tarea.id+"', 'PADRE','"+(UrlUniversal+'b28d52b730cc411f2e1870be7380f015')+"', 'Finalizar')\">Finalizar</button>";
                    }
                html += "</div>";
            }
            //Justificacion edicion
            html += "<div class='form-group d-none' id='edicionJustificacionTarea'>";
                html += "<div class='separator my-1 py-1 '>JUSTIFICACION</div>"
                html += "<label for='parJustificacion'> ¿Por qué desea modificar esta tarea?:</label>";
                html += "<textarea class='form-control' id='parJustificacion' name='parJustificacion' rows='3' required ></textarea>"
            html += "</div>";

            html += "<div class='form-group' id='FooterInfoTareaOTProyecto' >";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
            html += "</div>";

        html += "</form>";
        html += "</div>";

        data.tarea.archivos.forEach((e, i) => {
            e.Num = i+1
        });

        $(".content_modal2").html(html);
        $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm2").addClass('modal-dialog-scrollable');
        ModalEdit2(1);
        $("#FooterInfoTareaOTProyecto").hide()
        setTimeout(() => {
            $('#parDepartamento').html("<option value = '"+data.tarea.IdDepartamento+"'>"+data.tarea.Departamento+"</option>")
            
            $('#parAsunto').val(data.tarea.Asunto)
            $('#parDescripcion').val(data.tarea.Descripcion)
            $('#parFechaEntrega').val(data.tarea.FechaEntrega)
            $('#parHoraEntrega').val(data.tarea.HoraEntrega)
            $('#parFechaCreada').val(data.tarea.FechaCreacion)
            $('#parHoraCreada').val(data.tarea.HoraCreacion)
            $('#parFechaRespondida').val(data.tarea.FechaRespuesta)
            $('#parHoraRespondida').val(data.tarea.HoraRespuesta)
            
            
            
            $('#parNroEntregables').val(data.tarea.NroEntregables)
            $('#parTipoTarea').val(data.tarea.IdTipoTarea)
        }, 500);
        
        $('#listaAdjuntosTareaOT2').DataTable({
            data:data.tarea.archivos,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Id',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "Tarea.downloadFile(\''+data+'\')">'
                            hx += '<img src ="images/descarga.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
                
            ],
            "language": {
                "url": "js/dataTable/Spanish.lang"
            },
        })
        $('#listaAdjuntosTareaOT2').css({'width':'100%'})

    });
}

function informacionTareaOTEdicion() {
    if( $('#FooterInfoTareaOTProyecto').is(":visible") == false ){
        $('#FooterInfoTareaOTProyecto').show()
    }else{
        $('#FooterInfoTareaOTProyecto').hide()
    }
    let estadoEdicion = $('#OptionIconEdit').data('state')
    $(".TituloTarea").text("Editar Tarea ")
    if (estadoEdicion == 1) {
        $('#OptionIconEdit').data('state', 1)
        //$('#FooterInfoTareaOTProyecto').addClass('d-none')
        $('#edicionJustificacionTarea').addClass('d-none')
        $('#parAsunto').attr('readonly', true)
        $('#parFechaEntrega').attr('readonly', true)
        $('#parHoraEntrega').attr('readonly', true)
        $('#parReferencia').attr('readonly', true)
        $('#parNroEntregables').attr('readonly', true)
        $('#parTipoTarea').attr('disabled', true)
        $('#parTipoSolicitud').attr('disabled', true)
        $('#parDescripcion').attr('disabled', true)
        $('#OptionIconEdit').data('state', 0)
    } else {
        OTCliente.listaDirectores();
        OTCliente.listaProfesionales();
        //$('#FooterInfoTareaOTProyecto').removeClass('d-none')
        $('#edicionJustificacionTarea').removeClass('d-none')
        $('#FooterInfoTareaOTProyecto').show()
        $('#parAsunto').attr('readonly', false)
        $('#parFechaEntrega').attr('readonly', false)
        $('#parHoraEntrega').attr('readonly', false)
        $('#parReferencia').attr('readonly', false)
        $('#parNroEntregables').attr('readonly', false)
        $('#parTipoTarea').attr('disabled', false)
        $('#parDescripcion').attr('disabled', false)
        $('#OptionIconEdit').data('state', 1)
         $('#parTipoSolicitud').attr('disabled', false)
    }
}

function historialTarea(idTarea, idSubtarea) {
    var html = "";
    

    TituloVentana = "Historia Tarea OT: "+Tarea.codigo
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaJustificacionesTarea'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Modificado Por</th>"
                        html += "<th>Fecha Modificacion</th>"
                        html += "<th>Hora Modificacion</th>"
                        html += "<th>Justificacion</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1)'>Cerrar</button>";
    html += "</div>";

    printDataAjax('900b044d402dc2259e19dd66c475f2fa', {parTarea: idTarea, parSubtarea: idSubtarea}, data => {
        $('#listaJustificacionesTarea').DataTable({
            data: data.justificaciones,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'NombreUsuario',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'FechaModificacion',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'HoraModificacion',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Justificacion',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
            ],
            "language": {
                "url": "js/dataTable/Spanish.lang"
            },
        })
        $('#listaJustificacionesTarea').css({'width':'100%'})
    })

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
    $("#ModalEdit2").modal('show');
}
//----------------------------------------------------------------------------------------------//
//-------------------------------------- Subtareas --------------------------------------------//
//--------------------------------------------------------------------------------------------//

function FinalizarTarea(idTarea, idTareaPadre, TipoTarea, Ruta, funcionalidad){
    var Asunto = $("#parAsunto").val()
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>"+funcionalidad+" Tarea OT: "+Tarea.codigo+"</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    if (TipoTarea === 'PADRE') {
                        if (Tarea.notificacion) {
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\" modalTareaOT('"+idTarea+"','"+Tarea.id+"', '"+Tarea.codigo+"');\"/>";
                        } else {
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\" modalTareaOT('"+idTarea+"');\"/>";
                        }
                    } else {
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\"modalSubTareaOT('"+idTarea+"');\"/>";
                    }
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Tarea.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='parProyecto' value='" + Tarea.id + "'>";
        html += "<input type='hidden' name='parTareaPadre' value='" + idTareaPadre + "'>";
        html += "<input type='hidden' name='parTarea' value='" + idTarea + "'>";
        html += "<input type='hidden' name='parFuenteTarea' value='" + TipoTarea + "'>";


        html += "<div class='form-group'>";
            html += "<label for='parAsunto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
            html += "<input type='text' name='parAsunto' id='parAsuntoFin' id = 'parAsuntoFin' class='form-control' autocomplete = 'off' value = 'Finalizar "+Asunto+"'>"
        html += "</div>";


        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='parDescripcionFin' id = 'parDescripcionFin' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SaveFinTarea(" + idTarea + "," + idTareaPadre + ",\""+TipoTarea+"\")'>Guardar</button>";
        html += "</div>";

    html += "</form>";
    html += "</div>";

    Tarea.files = []
    $(".content_modal2").html(html);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
       dd = '0' + dd;
    }

    if (mm < 10) {
       mm = '0' + mm;
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#parFecha").attr("min", today);
    $("#ModalEdit2").modal('show');
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm2").addClass('modal-dialog-scrollable');

    Tarea.listaTipoTarea();
    Tarea.listaDepartamentos();
    Tarea.listarFiles()
    Tarea.listTiposActividadRespuesta()
}

function SaveFinTarea(IdTarea,IdTareaPadre,Tipo){
    $.ajax({
        type:'POST',
        url:'c6fb996ec00b8e78fd3c7324300c96fe',
        data:{_token:document.getElementsByName('_token')[0].value,IdTarea:IdTarea,IdTareaPadre:IdTareaPadre,Tipo:Tipo},
        success:function(data){
            ModalEdit2(0)
            notificacionesGenerales()
        }
    })
}

function crearSubtareaOT(idTarea, idTareaPadre, TipoTarea, Ruta, funcionalidad) {
    var Asunto = $("#parAsunto").val()
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>"+funcionalidad+" Tarea OT: "+Tarea.codigo+"</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    if (TipoTarea === 'PADRE') {
                        if (Tarea.notificacion) {
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\" modalTareaOT('"+idTarea+"','"+Tarea.id+"', '"+Tarea.codigo+"');\"/>";
                        } else {
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\" modalTareaOT('"+idTarea+"');\"/>";
                        }
                    } else {
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-toggle='modal' data-target='#ModalEdit2' class = 'IconClose' onclick=\"modalSubTareaOT('"+idTarea+"');\"/>";
                    }
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Tarea.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='parProyecto' value='" + Tarea.id + "'>";
        html += "<input type='hidden' name='parTareaPadre' value='" + idTareaPadre + "'>";
        html += "<input type='hidden' name='parTarea' value='" + idTarea + "'>";
        html += "<input type='hidden' name='parFuenteTarea' value='" + TipoTarea + "'>";

        html += "<div class='form-group'>";
            html += "<label for='parDepartamento' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
            html += "<select name = 'parDepartamento' id='parDepartamento' onchange='Tarea.listaResponsables(); Tarea.listaAsignados();Tarea.listTiposActividadRespuesta();Tarea.listaTipoTarea()' class='form-control' required>";
                html += "<option selected>Seleccione</option>";

            html += "</select>";
        html += "</div>";

        html += "<hr>"

        html += "<div class='form-row flex'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsables:</label>";
                html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em'>";
                    // html += '<div class="form-check">'
                    //     html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
                    //     html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
                    // html += '</div>'
                html += "</div>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parAsignados' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
                html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em'>";
                    // html += '<div class="form-check">'
                    //     html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
                    //     html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
                    // html += '</div>'
                html += "</div>";
            html += "</div>";
        html += "</div>";

        html += "<hr>"

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parFecha' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha:</label>";
                html += "<input type='date' name='parFecha' id='parFecha' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora:</label>";
                html += "<input type='time' name='parHora' id='parHora' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parTipoTarea' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parTipoTarea' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Tarea:</label>";
                html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group'>";
            
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parAsunto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
            html += "<input type='text' name='parAsunto' id='parAsunto' class='form-control' autocomplete = 'off' value = '"+Asunto+"'>"
        html += "</div>";


        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='parDescripcion' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parNroEntregables'><span class = 'Obligatorio'>(*)</span> Nro. Entregables:</label>";
            html += "<input type='number' name='parNroEntregables' id='parNroEntregables' class='form-control' min='0' placeholder='0' >"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label><span class = 'Obligatorio'>(*)</span> Adjuntos:</label>";
            html += "<input type='file' class='form-control' onchange='Tarea.loadFiles(event)' multiple>"
        html += "</div>";

        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Descartar</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";

    html += "</form>";
    html += "</div>";

    Tarea.files = []
    $(".content_modal2").html(html);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
       dd = '0' + dd;
    }

    if (mm < 10) {
       mm = '0' + mm;
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#parFecha").attr("min", today);
    $("#ModalEdit2").modal('show');
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm2").addClass('modal-dialog-scrollable');

    Tarea.listaTipoTarea();
    Tarea.listaDepartamentos();
    Tarea.listarFiles()
    Tarea.listTiposActividadRespuesta()
}


function Tra_PteOT(Hash,Codigo){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6131fd7628f87eadf4e4b9f42b8442c2',
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = ""
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Marcar OT: "+Codigo+" como Pendiente de Cliente</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                            html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Fecha:</label>";
                        html += "<input type = 'date' value = '"+data.Fecha+"' id = 'FechaCierre' class = 'form-control'/>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = 'FormSendSaveAction_OT("+Hash+")'>Guardar</button>";
            html += "</div>";

            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            $("#ModalContentForm2").addClass('modal-dialog-scrollable');
            ModalEdit2(1)
            ModalEdit(0)
        }
    })
}
function FormSendSaveAction_OT(Hash){
    if( $("#FechaCierre").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '43c2fd452552bfb5fe8e5e310b58412c',
            data:{
                JustificacionOt: 0,
                FechaCierre: $("#FechaCierre").val(),
                Tip: 'PTN_OT',
                Hash: Hash,
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                ModalEdit2(0)
                ModalEdit(1)
                alert("Se ha cambiado la OT a Pendiente de Revisión Cliente");
            }
        })
    }
}

function modalSubTareaOT(Hash, idProyecto=null, CodigoOT=null) {
    if (idProyecto !== null && CodigoOT !== null) {
        Tarea.id = idProyecto
        Tarea.codigo = CodigoOT
        Tarea.notificacion = true
        $("#TareaOT").addClass('d-none');
        document.querySelectorAll("input[name='tareaProyectoOT']").forEach( e => {e.checked = false})
    } else {
        Tarea.notificacion = false
    }
    printDataAjax('88ebb343f380470982d18584639651bc', {parSubTarea: Hash}, data => {
        let editar = '';
        let CambiarEstado = '';
        let contestar = '';
        
        //CambiarEstado = "<img src ='btn_enviaracliente_blanco.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = \"Tra_PteOT('"+idProyecto+"', '"+CodigoOT+"')\"'/>"
        
        if( data.TRA_CLIENTE_TAREA_EDITAR){
            editar = "<img src ='images/editar.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = 'informacionSubTareaOTEdicion()'/>"
            //CambiarEstado = "<img src ='btn_enviaracliente_blanco.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = \"Tra_PteOT('"+idProyecto+"', '"+CodigoOT+"')\"'/>"
        }
        
        if( data.TRA_CLIENTE_ENVIAR_CLIENTE){
            //editar = "<img src ='images/editar.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = 'informacionSubTareaOTEdicion()'/>"
            CambiarEstado = "<img src ='images/btn_enviaracliente_blanco.png' data-state='0' id='OptionIconEdit' class='OptionIcon' onclick = \"Tra_PteOT('"+idProyecto+"', '"+CodigoOT+"')\"'/>"
        }
        
        if( data.TRA_CLIENTE_TAREA_CONTESTADA){
            contestar = "<img src = 'images/btn_resp_tarea_blanco.png' id='OptionIconEdit' class='OptionIcon' onclick = \"crearSubtareaOT('"+data.tarea.Id+"', '"+data.tarea.IdTareaPadre+"', 'HIJO','"+(UrlUniversal+'cbe2e4f260ef5bbfe58c112825b3b494')+"', 'Responder')\"/>"
        }
        var html = "";
        
        html += "<div class='modal-header panel-heading'>";
            html += "<table class = 'CabeceraVentanas' width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>xTarea "+data.tarea.Numeracion+" OT: "+(CodigoOT === null ? Tarea.codigo : CodigoOT)+"</span>";
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += "<i class='fas fa-history'  onclick=\"historialTarea("+null+", '"+data.tarea.Id+"'); ModalEdit(0)\" ></i>"
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += editar
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += CambiarEstado
                    html += "</td>"
                    html += "<td width='10%' style = 'text-align:right;'><p></p>"
                        html += contestar
                    html += "</td>"
                    html += "<td>"
                        if (CodigoOT === null) {
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                        } else {
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' data-dismiss='modal' aria-label='Close' class = 'IconClose' />";
                        }
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body FormsGeneral'>";
            html += "<form class='form-signin' onsubmit='Tarea.enviar(event)' action='"+UrlUniversal+"2196b8ef1d725788a4f617a978bc2648' method='post'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='parProyecto' value='" + Tarea.id + "'>";
            html += "<input type='hidden' name='parSubtarea' value='" + data.tarea.Id + "'>";
            html += "<input type='hidden' name='parTarea'>";
            //departamento
            html += "<div class='form-group'>";
                html += "<label for='parDepartamento' class='col-form-label'> Departamento:</label>";
                html += "<input type='text' id='parDepartamento' class='form-control' readonly>"
            html += "</div>";

            html += "<hr>"
            //responsables
            html += "<div class='form-row flex '>"
                html += "<div class='form-group col-md-6'>";
                    html += "<label for='parResponsables' class='col-form-label'> Responsables:</label>";
                    html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em' disabled>";
                    html += "<ul class='list-group list-group-flush'></ul>"
                    data.tarea.responsables.forEach(e => {
                        if( e.FechaVisualizacion != null ){
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+", Visualizada el "+e.FechaVisualizacion+"</li>"
                        }else{
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+"</li>"
                        }
                        
                    });
                    html += "<ul class='list-group list-group-flush'></ul>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-6'>";
                    html += "<label for='parAsignados' class='col-form-label'> Asignados:</label>";
                    html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em' disabled>";
                    html += "<ul class='list-group list-group-flush'></ul>"
                    data.tarea.asignados.forEach(e => {
                       if( e.FechaVisualizacion != null ){
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+", Visualizada el "+e.FechaVisualizacion+"</li>"
                        }else{
                            html += "<li class='list-group-item' style='font-size:12px;'>"+e.NombreUsuario+"</li>"
                        }
                    });
                    html += "<ul class='list-group list-group-flush'></ul>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            html += "<hr>"
            //Fecha Entrega
            html += "<div class='form-row'>"
                html += "<div class='form-group col-md-4'>"
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Entrega:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFechaEntrega' id='parFechaEntrega' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHoraEntrega' id='parHoraEntrega' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-4'>";
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Creación:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFecha' id='parFechaCreada' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHora' id='parHoraCreada' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group col-md-4'>";
                    html += "<center><label for='parFecha' class='col-form-label'>Fecha Respuesta:</label></center>";
                    html += "<div>";
                        html += "<label for='parFecha' class='col-form-label'> Fecha:</label>";
                        html += "<input type='date' name='parFecha' id='parFechaRespondida' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ' readonly>"

                        html += "<label for='parHora' class='col-form-label'> Hora:</label>";
                        html += "<input type='time' name='parHora' id='parHoraRespondida' class='form-control' placeholder='Proyecto XYZ' readonly>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            html += "<div class='form-row'>";
                html += "<div class = 'col-md-6'>"
                    html += "<label for='parTipoTarea' class='col-form-label'> Tipo de Actividad:</label>";
                    html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' disabled>";
                        html += "<option value='' selected>Seleccione</option>"
                        data.TraTipoProceso.forEach(obj => {
                            if( obj['Id'] == data.tarea.IdTipoActividad ){
                                html += "<option value = '"+obj['Id']+"' selected>"+obj['Nombre']+"</option>"
                            }else{
                                html += "<option value = '"+obj['Id']+"' >"+obj['Nombre']+"</option>"
                            }
                        });
                    html += "</select>";
                html += "</div>"
                html += "<div class = 'col-md-6'>"
                    html += "<label for='parTipoTarea' class='col-form-label'> Tipo de Tarea:</label>";
                    html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' disabled>";
                        html += "<option value='' selected>Seleccione</option>"
                        data.TipoTarea.forEach(obj => {
                            if( obj['Hash'] == data.tarea.IdTipoTarea ){
                                html += "<option value = '"+obj['Hash']+"' selected>"+obj['Nombre']+"</option>"
                            }else{
                                html += "<option value = '"+obj['Hash']+"' >"+obj['Nombre']+"</option>"
                            }
                        });
                    html += "</select>";
                html += "</div>"
            html += "</div>";
            //Asunto
            html += "<div class='form-group'>";
                html += "<label for='parAsunto' class='col-form-label'> Asunto:</label>";
                html += "<input type='text' name='parAsunto' id='parAsunto' class='form-control' placeholder='Proyecto XYZ' required readonly>"
            html += "</div>";
            html += "<div class='form-group'>"
                html += "<label for='parAsunto' class='col-form-label'> Requerimiento Cliente:</label>";
                if( data.tarea.Req == null ){
                    html += "<input type='text' class='form-control Cursor' value =  '' required readonly>"
                }else{
                    html += "<input type='text' class='form-control Cursor' onclick = 'ConsultarRequerimientoCliente_tra("+data.tarea.HashRq+")' value = "+data.tarea.Req+" required readonly>"
                }
                
            html += "</div>";
            //Descripcion
            html += "<div class='form-group'>";
                html += "<label for='parDescripcion'> Descripción:</label>";
                html += "<textarea class='form-control' id='parDescripcion' name='parDescripcion' rows='3' disabled></textarea>"
            html += "</div>";

            //NroEntregables
            html += "<div class='form-group'>";
                html += "<label for='parNroEntregables'> Nro. Entregables:</label>";
                html += "<input type='number' name='parNroEntregables' id='parNroEntregables' class='form-control' min='0' placeholder='0' readonly>"
            html += "</div>";

            // Archivos
            html += "<div class='lista' id=''>"
                html += "<center><b> Adjuntos </b></center>"
                html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT2'>"
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nombre</th>"
                            html += "<th>Descargar</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table>"
                html += "<a href = '"+UrlUniversal+"Zipper/Zip.php?Tipo=S&&Hash="+data.tarea.Hasing+"'>Descargar Adjuntos **** en Zip</a>"
            html += "</div>"

            html += "<div class='form-group d-none' id='edicionJustificacionTarea'>";
                html += "<div class='separator my-1 py-1 '>JUSTIFICACION</div>"
                html += "<label for='parJustificacion'> ¿Por qué desea modificar esta tarea?:</label>";
                html += "<textarea class='form-control' id='parJustificacion' name='parJustificacion' rows='3'></textarea>"
            html += "</div>";

            html += "<div class='form-group' id='FooterInfoTareaOTProyecto'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary btn-hide d-none'>Guardar</button>";
                if( data.TRA_CLIENTE_TAREA_CONTESTADA){
                    html += "<button class='btn btn-outline-primary' onclick = \"$('.content_modal').html(''); ModalEdit(0); FinalizarTarea('"+data.tarea.Id+"', '"+data.tarea.IdTareaPadre+"', 'HIJO','"+(UrlUniversal+'b28d52b730cc411f2e1870be7380f015')+"', 'Finalizar')\">Finalizar</button>";
                }
            html += "</div>";

        html += "</form>";
        html += "</div>";

        data.tarea.archivos.forEach((e, i) => {
            e.Num = i+1
        });

        $(".content_modal2").html(html);
        $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm2").addClass('modal-dialog-scrollable');
        $("#ModalEdit2").modal('show');
        setTimeout(() => {
            $('#parDepartamento').val(data.tarea.Departamento)
            $('#parAsunto').val(data.tarea.Asunto)
            $('#parDescripcion').val(data.tarea.Descripcion)
            $('#parFechaEntrega').val(data.tarea.FechaEntrega)
            $('#parHoraEntrega').val(data.tarea.HoraEntrega)
            $('#parFechaCreada').val(data.tarea.FechaCreacion)
            $('#parHoraCreada').val(data.tarea.HoraCreacion)
            $('#parFechaRespondida').val(data.tarea.FechaRespuesta)
            $('#parHoraRespondida').val(data.tarea.HoraRespuesta)
            $('#parTipoTarea').val(data.tarea.IdTipoTarea)
            $('#parNroEntregables').val(data.tarea.NroEntregables)
        }, 500);

        $('#listaAdjuntosTareaOT2').DataTable({
            data:data.tarea.archivos,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Id',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "Tarea.downloadFile(\''+data+'\')">'
                            hx += '<img src ="images/descarga.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                "url": "js/dataTable/Spanish.lang"
            },
        })
        $('#listaAdjuntosTareaOT2').css({'width':'100%'})

    });
}

function informacionSubTareaOTEdicion() {
    let estadoEdicion = $('#OptionIconEdit').data('state')
    if (estadoEdicion == 1) {
        $('#OptionIconEdit').data('state', 1)
        $('.btn-hide').addClass('d-none')
        $('#edicionJustificacionTarea').addClass('d-none')
        $('#parAsunto').attr('readonly', true)
        $('#parFechaEntrega').attr('readonly', true)
        $('#parHoraEntrega').attr('readonly', true)
        $('#parReferencia').attr('readonly', true)
        $('#parNroEntregables').attr('readonly', true)
        $('#parTipoTarea').attr('disabled', true)
        $('#parDescripcion').attr('disabled', true)
        $('#parTipoSolicitud').attr('disabled', true)
        $('#OptionIconEdit').data('state', 0)
    } else {
        OTCliente.listaDirectores();
        OTCliente.listaProfesionales();
        $('.btn-hide').removeClass('d-none')
        $('#edicionJustificacionTarea').removeClass('d-none')
        $('#parAsunto').attr('readonly', false)
        $('#parFechaEntrega').attr('readonly', false)
        $('#parHoraEntrega').attr('readonly', false)
        $('#parReferencia').attr('readonly', false)
        $('#parNroEntregables').attr('readonly', false)
        $('#parTipoTarea').attr('disabled', false)
        $('#parTipoSolicitud').attr('disabled', false)
        $('#parDescripcion').attr('disabled', false)
        $('#OptionIconEdit').data('state', 1)
    }
}

function ListarAsistentesAgenciaIE(){
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
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisAgencia("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".AsistentesAgencia").html(html)
}

function DelAsisAgencia(T){
    Inf_AsisAgencia.splice(T,1);
    ListarAsistentesAgenciaIE()
}

function DelAsisCliente(T){
    Inf_AsisCliente.splice(T,1);
    ListarAsisClienteIE()()
}


function DelAsisCopGeneral(T){
    Inf_CopGeneral.splice(T,1);
    ListarAsisClienteCopiaIE()
}

function ListarPersonalAgencia(){
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
                                html += "<input type='radio' name='PAsigAgen' value='"+Temp_Inf_AsisAgencia[i]['IdUsuario']+"' id='PAsigAgen"+Temp_Inf_AsisAgencia[i]['IdUsuario']+"' onclick = 'AddAgencia("+Temp_Inf_AsisAgencia[i]['IdUsuario']+","+i+")'>"
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

function AddAgencia(Hash,T){
    $("#Inf_AsistenteAgencia").val("")
    Inf_AsisAgencia.push({
        'Tipo': Temp_Inf_AsisAgencia[T]['Tipo'],
        'Nombre': Temp_Inf_AsisAgencia[T]['NombreUsuario'],
        'IdU':Temp_Inf_AsisAgencia[T]['IdUsuario'],
    })
    $(".ListAsistentesAgencia").html("")
    ListarAsistentesAgenciaIE()
}

function ListarCopiadosAgenciaIE(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_CopAgencia.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_CopAgencia[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    if( Inf_CopAgencia[i]['Tipo'] != 'DEF' ){
                        html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisCopAgencia("+i+")'/>"
                    }else{
                        html += "Copiado por Defecto"
                    }
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".CopiadosAgencia").html(html)
}

function ListarPersonalCopiaAgencia(){
    if( $("#Inf_CopiadosAgencia").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'3115db3fb13ad9db964287eed6b9cd37',
            data:{Hash:$("#Inf_CopiadosAgencia").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_CopAgencia = [];
                Temp_Inf_CopAgencia = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_CopAgencia.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PAsigAgen' value='"+Temp_Inf_CopAgencia[i]['IdUsuario']+"' id='PAsigAgen"+Temp_Inf_CopAgencia[i]['IdUsuario']+"' onclick = 'AddCopiadosAgencia("+Temp_Inf_CopAgencia[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+Temp_Inf_CopAgencia[i]['NombreUsuario']+"</td>"
                            html += "<td>"+Temp_Inf_CopAgencia[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Inf_CopAgencia.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'text-align:justify;font-weight: bold;color: red;'>No se han encontrado datos para la información ingresada.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ListCopiadosAgencia").html(html+"<br>")
            }
        })
    }
}

function AddCopiadosAgencia(Hash,T){
    $("#Inf_CopiadosAgencia").val("")
    Inf_CopAgencia.push({
        'Tipo': Temp_Inf_CopAgencia[T]['Tipo'],
        'Nombre': Temp_Inf_CopAgencia[T]['NombreUsuario'],
        'IdU':Temp_Inf_CopAgencia[T]['IdUsuario'],
    })
    $(".ListCopiadosAgencia").html("")
    ListarCopiadosAgenciaIE()
}

function DelAsisCopAgencia(T){
    Inf_CopAgencia.splice(T,1);
    ListarCopiadosAgenciaIE()
}

//Comp Agencia
function AddComAgencia(Hash,T){
    $("#Inf_CompAgencia").val("")
    Inf_ComAgencia.push({
        'Nombre': $(".PCOMAgen"+Hash).text(),
        'IdU':$("#PCOMAgen"+Hash).val(),
    })
    $(".ComListAsistentesAgencia").html("")
    ListarCompromioAgencia()
}
function ListarCompPersonalAgencia(){
    if( $("#Inf_CompAgencia").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'3115db3fb13ad9db964287eed6b9cd37',
            data:{Hash:$("#Inf_CompAgencia").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_ComAgencia = [];
                Temp_Inf_ComAgencia = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_ComAgencia.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PCOMAgen' value='"+Temp_Inf_ComAgencia[i]['IdUsuario']+"' id='PCOMAgen"+Temp_Inf_ComAgencia[i]['IdUsuario']+"' onclick = 'AddComAgencia("+Temp_Inf_ComAgencia[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td class = 'PCOMAgen"+Temp_Inf_ComAgencia[i]['IdUsuario']+"'>"+Temp_Inf_ComAgencia[i]['NombreUsuario']+"</td>"
                            html += "<td >"+Temp_Inf_ComAgencia[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Inf_ComAgencia.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'font-weight: bold;color: red;'>No se han encontrado datos para la información ingresada.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ComListAsistentesAgencia").html(html+"<br>")
            }
        })
    }
}

function ListarCompromioAgencia(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_ComAgencia.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_ComAgencia[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisAgencia("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ComAgencia").html(html)
}
function DelCompAsisAgencia(T){
    Inf_ComAgencia.splice(T,1);
    ListarCompromioAgencia()()
}
//Objetivos
function AddInformacionObjetivos(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Agregar Objetivos de Reunión</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-8 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Objetivo:</label>";
                html += "<input autocomplete = 'off' type = 'text' name = 'ObjetivoReunion' id = 'ObjetivoReunion' class = 'form-control'/>";
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewObjetivoReunion()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'ListObjetivosReunion'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ListarObjetivosReunion()'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
}
function AddNewObjetivoReunion(){
    if( $("#ObjetivoReunion").val().length > 2 ){
        Inf_Objetivos.push({
            'Objetivo': $("#ObjetivoReunion").val(),
        })
        $("#ObjetivoReunion").val("")
        ListarObjetivosReunion()
    }else{  
        AlertaMensajes("No se ha ingresado información Correcta de los Objetivos de la Reunión","error",3);
    }
}
function ListarObjetivosReunion(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Objetivo</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_Objetivos.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_Objetivos[i]['Objetivo']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelObjetivos("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ListObjetivosReunion").html(html)
}
function DelObjetivos(T){
    Inf_Objetivos.splice(T,1);
    ListarObjetivosReunion()
}

//Desarrollo Reunión
function AddInformacionDesarrolloReunion(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Desarrollo Reunión</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Objetivo:</label>";
                html += "<select class = 'form-control' name = 'IdObjetivoT' id = 'IdObjetivoT'>";
                    html += "<option value = '' >Seleccione</option>"
                    for(var i = 0; i < Inf_Objetivos.length;i++){
                        html += "<option value = '"+i+"'>"+Inf_Objetivos[i]['Objetivo']+"</option>"
                    }
                html += "</select>"
            html += "</div>";
            
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Contexto:</label>";
                html += "<textarea class = 'form-control' name = 'DesarrrolloT' id = 'DesarrolloT' rows = '4'></textarea>"
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2 CenterText'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewDesarrolo()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'ListDesarrolloObjetivos'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ListarDesarrolloReunion()'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
}

function AddNewDesarrolo(){
    if( $("#DesarrolloT").val().length > 5 && $("#IdObjetivoT").val() != '' ){
        Inf_Desarrollo.push({
            'Objetivo': $("#IdObjetivoT option:selected").text(),
            'Desarrollo': $("#DesarrolloT").val(),
        })
        $("#IdObjetivoT").val("")
        $("#DesarrolloT").val("")
        ListarDesarrolloReunion()
    }else{  
        AlertaMensajes("Debe ingresar los campos Obligatorios","error",3);
    }
}

function ListarDesarrolloReunion(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Objetivo</th>"
            html += "<th>Desarrrollo</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_Desarrollo.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_Desarrollo[i]['Objetivo']+"</td>";
                html += "<td ><textarea class = 'form-control' readonly >"+Inf_Desarrollo[i]['Desarrollo']+"</textarea></td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelDesarrolloObjetivos("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ListDesarrolloObjetivos").html(html)
}

function DelDesarrolloObjetivos(T){
    Inf_Desarrollo.splice(T,1);
    ListarDesarrolloReunion()
}

//Compromisos Agencia
function AddInformacionCompromisoAgencia(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Compromisos Agencia</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-8 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsable:</label>";
                html += "<input autocomplete = 'off' type='text' name='Inf_CompAgencia' onkeyup = 'ListarCompPersonalAgencia()' id='Inf_CompAgencia' class='form-control'>"
                html += "<p></p>"
                html += "<div class = 'ComListAsistentesAgencia'></div>"
                html += "<p></p>"
                html += "<div class = 'ContentListUser ComAgencia'></div>"
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha Compromiso:</label>";
                html += "<input type ='date' class = 'form-control' name = 'FechaEntregaCompromiso' id = 'FechaEntregaCompromiso' />"
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Compromiso:</label>";
                html += "<textarea class = 'form-control' name = 'DesarrrolloT' id = 'DesarrolloT' rows = '4'></textarea>"
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2 CenterText'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewCompromiso()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'ListCompromisosAgencia'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ListarDesarrolloReunion()'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
}

function AddInformacionCompromisoCliente(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Compromisos Cliente</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-8 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsable:</label>";
                html += "<input autocomplete = 'off' type='text' name='Inf_CompAgencia' id='Inf_CompAgencia' class='form-control'>"
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha Compromiso:</label>";
                html += "<input type ='date' class = 'form-control' name = 'FechaEntregaCompromiso' id = 'FechaEntregaCompromiso' />"
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Compromiso:</label>";
                html += "<textarea class = 'form-control' name = 'DesarrrolloT' id = 'DesarrolloT' rows = '4'></textarea>"
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2 CenterText'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewCompromisoCliente()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'ListCompromisosCliente'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
}

function CompromisosAgencia(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Responsable(s)</th>"
            html += "<th>Fecha Entrega</th>"
            html += "<th>Compromiso</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_CompromisosAgencia.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"
                    for( var x = 0; x < Inf_CompromisosAgencia[i]['Responsable'].length; x++){
                        html += "<p>"+Inf_CompromisosAgencia[i]['Responsable'][x]['Nombre']+"</p>"
                    }
                html += "</td>";
                html += "<td class = 'CenterText'>"+Inf_CompromisosAgencia[i]['Fecha']+"</td>";
                html += "<td ><textarea class = 'form-control' readonly >"+Inf_CompromisosAgencia[i]['Compromiso']+"</textarea></td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelCompromisoAgencia("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ListCompromisosAgencia").html(html)
}

function CompromisosCliente(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Responsable(s)</th>"
            html += "<th>Fecha Entrega</th>"
            html += "<th>Compromiso</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_CompromisosCliente.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_CompromisosCliente[i]['Responsable']+"</td>";
                html += "<td class = 'CenterText'>"+Inf_CompromisosCliente[i]['Fecha']+"</td>";
                html += "<td ><textarea class = 'form-control' readonly >"+Inf_CompromisosCliente[i]['Compromiso']+"</textarea></td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelCompromisoCliente("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ListCompromisosCliente").html(html)
    $(".ComListAsistentesAgencia,.ComAgencia").html("")
}

function DelCompromisoAgencia(T){
    Inf_CompromisosAgencia.splice(T,1);
    ListarDesarrolloReunion()
}
function DelCompromisoCliente(T){
    Inf_CompromisosCliente.splice(T,1);
    ListarDesarrolloReunion()
}

function AddNewCompromiso(){
    if( $("#DesarrolloT").val().length > 5 && $("#FechaEntregaCompromiso").val() != '' && Inf_ComAgencia.length > 0 ){
        Inf_CompromisosAgencia.push({
            'Fecha': $("#FechaEntregaCompromiso").val(),
            'Compromiso': $("#DesarrolloT").val(),
            'Responsable': Inf_ComAgencia,
        })
        $("#FechaEntregaCompromiso").val("")
        $("#DesarrolloT").val("")
        Inf_ComAgencia = [];
        Temp_Inf_ComAgencia = [];
        CompromisosAgencia()
    }else{  
        AlertaMensajes("Debe ingresar los campos Obligatorios","error",3);
    }
}
function AddNewCompromisoCliente(){
    if( $("#DesarrolloT").val().length > 5 && $("#FechaEntregaCompromiso").val() != '' && $("#Inf_CompAgencia").val() != '' ){
        Inf_CompromisosCliente.push({
            'Fecha': $("#FechaEntregaCompromiso").val(),
            'Compromiso': $("#DesarrolloT").val(),
            'Responsable': $("#Inf_CompAgencia").val(),
        })
        $("#FechaEntregaCompromiso").val("")
        $("#Inf_CompAgencia").val("")
        $("#DesarrolloT").val("")
        CompromisosCliente()
    }else{  
        AlertaMensajes("Debe ingresar los campos Obligatorios","error",3);
    }
}


function AddInformacionCliente(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Agregar Asistentes Cliente</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<input autocomplete = 'off' type = 'text' name = 'NombreAsisCliente' id = 'NombreAsisCliente' onkeyup = 'ListarAsisClienteDB()' class = 'form-control'/>";
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                html += "<input autocomplete = 'off' type = 'email' name = 'CorreoAsisCliente' id = 'CorreoAsisCliente' onkeyup = 'ListarAsisClienteDB()' class = 'form-control'/>";
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewAsisCliente()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'TmpListAsistentesCliente'></div>";
                html += "<div class = 'ListAsistentesCliente'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ListarAsisClienteIE()'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
    ListarAsisClienteIE()
}

function AddInformacionClienteCopia(){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Agregar Copiados</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\")'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<input autocomplete = 'off' type = 'text' name = 'NombreAsisCliente' id = 'NombreAsisCliente' onkeyup = 'ListarAsisClienteCopiaDB()' class = 'form-control'/>";
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                html += "<input autocomplete = 'off' type = 'email' name = 'CorreoAsisCliente' id = 'CorreoAsisCliente' onkeyup = 'ListarAsisClienteCopiaDB()' class = 'form-control'/>";
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='parResponsables' class='col-form-label' style = 'color:white;'>Agregar</label>";
                html += "<input type = 'button' class = 'form-control btn btn-primary' value = 'Agregar' onclick = 'AddNewAsisClienteCopia()'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<div class = 'TmpListAsistentesCliente'></div>";
                html += "<div class = 'ListAsistentesCliente'></div>";
            html += "</div>";
        html += "</div>"
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ListarAsisClienteCopiaIE()'>Cerrar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
    ListarAsisClienteCopiaIE()
}

function ListarAsisClienteDB(){
    if( $("#NombreAsisCliente").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'26f6f79e7ea824292f003d2b04defa52',
            data:{Hash:$("#NombreAsisCliente").val(),Hash2:$IdProyecto,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_AsisCliente = [];
                Temp_Inf_AsisCliente = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_AsisCliente.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PAsigAgen' onclick = 'AddAsisCliente("+Temp_Inf_AsisCliente[i]['Id']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+Temp_Inf_AsisCliente[i]['Nombre']+"</td>"
                            html += "<td>"+Temp_Inf_AsisCliente[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Inf_AsisCliente.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'text-align:justify;font-weight: bold;color: red;'>No se han encontrado datos, por favor haga clic en el botón Agregar.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".TmpListAsistentesCliente").html(html+"<br>")
            }
        })
    }
}

function ListarAsisClienteCopiaDB(){
    if( $("#NombreAsisCliente").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'26f6f79e7ea824292f003d2b04defa52',
            data:{Hash:$("#NombreAsisCliente").val(),Hash2:$IdProyecto,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_CopGeneral = [];
                Temp_Inf_CopGeneral = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_CopGeneral.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' onclick = 'AddAsisClienteCopia("+Temp_Inf_CopGeneral[i]['Id']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+Temp_Inf_CopGeneral[i]['Nombre']+"</td>"
                            html += "<td>"+Temp_Inf_CopGeneral[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Inf_CopGeneral.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'font-weight: bold;color: red;'>No se han encontrado datos, por favor haga clic en el botón Agregar.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".TmpListAsistentesCliente").html(html+"<br>")
            }
        })
    }
}

function AddNewAsisCliente(){
    if( $("#NombreAsisCliente").val().length > 2 && $("#CorreoAsisCliente").val().length > 5 ){
        Inf_AsisCliente.push({
            'Nombre': $("#NombreAsisCliente").val(),
            'Correo': $("#CorreoAsisCliente").val(),
            'IdU':0,
        })
        $("#NombreAsisCliente,#CorreoAsisCliente").val("")
        ListarAsisClienteIE()
    }else{  
        AlertaMensajes("Datos de Asistente Cliente Incompletos","error",3);
    }
}

function AddNewAsisClienteCopia(){
    if( $("#NombreAsisCliente").val().length > 2 && $("#CorreoAsisCliente").val().length > 5 ){
        Inf_CopGeneral.push({
            'Nombre': $("#NombreAsisCliente").val(),
            'Correo': $("#CorreoAsisCliente").val(),
            'IdU':0,
        })
        $("#NombreAsisCliente,#CorreoAsisCliente").val("")
        ListarAsisClienteCopiaIE()
    }else{  
        AlertaMensajes("Datos de Asistente Cliente Incompletos","error",3);
    }
}

function AddAsisCliente(Hash,T){
    $("#Inf_CopiadosAgencia").val("")
    Inf_AsisCliente.push({
        'Nombre': Temp_Inf_AsisCliente[T]['Nombre'],
        'Correo': Temp_Inf_AsisCliente[T]['Correo'],
        'IdU':Temp_Inf_AsisCliente[T]['Id'],
    })
    $(".TmpListAsistentesCliente").html("")
    $("#NombreAsisCliente,#CorreoAsisCliente").val("")
    ListarAsisClienteIE()
}


function AddAsisClienteCopia(Hash,T){
    $("#Inf_CopiadosAgencia").val("")
    Inf_CopGeneral.push({
        'Nombre': Temp_Inf_CopGeneral[T]['Nombre'],
        'Correo': Temp_Inf_CopGeneral[T]['Correo'],
        'IdU':Temp_Inf_CopGeneral[T]['Id'],
    })
    $(".TmpListAsistentesCliente").html("")
    $("#NombreAsisCliente,#CorreoAsisCliente").val("")
    ListarAsisClienteCopiaIE()
}

function ListarAsisClienteIE(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Correo</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_AsisCliente.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_AsisCliente[i]['Nombre']+"</td>";
                html += "<td >"+Inf_AsisCliente[i]['Correo']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisCliente("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".AsistentesCliente").html(html)
    $(".ListAsistentesCliente").html(html)
}

function ListarAsisClienteCopiaIE(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Correo</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_CopGeneral.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_CopGeneral[i]['Nombre']+"</td>";
                html += "<td >"+Inf_CopGeneral[i]['Correo']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisCopGeneral("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".CopiadosCliente").html(html)
    $(".ListAsistentesCliente").html(html)
}

function CrearInformeEntrevista(){
    $.ajax({
        type:'POST',
        url:'c7b83d2a2a133b066d15131f0f1956ba',
        data:{Hash:$IdProyecto,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            Inf_AsisAgencia = [];
            Inf_CopAgencia = [];
            Inf_AsisCliente = [];
            Inf_CopGeneral = [];
            Inf_Objetivos = [];
            Inf_ComAgencia = [];
            Inf_CompromisosAgencia = [];
            Inf_CompromisosCliente = [];
            
            Inf_AsisAgencia.push({
                'Tipo':'Usuario',
                'Nombre':data.HashN,
                'IdU':data.HashU,
            })
            
            for( var i = 0; i < data.Copiados.length; i++ ){
                Inf_CopAgencia.push({
                    'Tipo':'DEF',
                    'Nombre':data.Copiados[i]['NombreUsuario'],
                    'IdU':data.Copiados[i]['Hash'],
                })
            }
            
            var html = "";
            var Ruta = UrlGeneral+"00320d5c5bc62ada8b51221d5a784f52";

            TituloVentana = "Crear Informe de Entrevista OT: "+$CodigoProyecto
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "CierraModal(\"ModalEdit2\",\"ModalEdit\");"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body FormsGeneral' >";
                html += "<form class='form-signin' action='javascript:void(0)'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='parProyecto' value='" + $IdProyecto + "'>";

                html += "<div class='form-row'>";
                    html += "<div class='form-group col-md-12'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Referencia:</label>";
                        html += "<input autocomplete = 'off' type='text' name='Inf_Asunto' id='Inf_Asunto' class='form-control'>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Informe:</label>";
                        html += "<select name = 'Inf_TipoInforme' id='Inf_TipoInforme' onchange='' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            for(var i = 0; i < data.TipoInforme.length; i++){
                                html += "<option value = '"+data.TipoInforme[i]['Hash']+"'>"+data.TipoInforme[i]['Nombre']+"</option>";
                            }
                        html += "</select>";
                    html += "</div>";
                    
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Reunión:</label>";
                        html += "<select name = 'Inf_TipoReunion' id='Inf_TipoReunion' onchange='' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            for(var i = 0; i < data.TipoReunion.length; i++){
                                html += "<option value = '"+data.TipoReunion[i]['Hash']+"'>"+data.TipoReunion[i]['Nombre']+"</option>";
                            }
                        html += "</select>";
                    html += "</div>";
                    
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha:</label>";
                        html += "<input type='date' name='Inf_Fecha' id='Inf_Fecha' class='form-control'>"
                    html += "</div>";
                    
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora Inicio:</label>";
                        html += "<input autocomplete = 'off'  type='time' name='Inf_HoraInicio' id='Inf_HoraInicio' class='form-control'>"
                    html += "</div>";
                    
                html += "</div>";
                
                html += "<div class='form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora Fin:</label>";
                        html += "<input autocomplete = 'off'  type='time' name='Inf_HoraFin' id='Inf_HoraFin' class='form-control'>"
                    html += "</div>";
                html += "</div>";

                html += "<hr>"
                
                html += "<div class='form-row'>"
                    
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label>Agencia</label>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label>Cliente</label>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='form-row'>"
                
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asistente:</label>";
                        html += "<input autocomplete = 'off' type='text' name='Inf_AsistenteAgencia' onkeyup = 'ListarPersonalAgencia()' id='Inf_AsistenteAgencia' class='form-control'>"
                        html += "<p></p>"
                        html += "<div class = 'ListAsistentesAgencia'></div>"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser AsistentesAgencia'></div>"
                        
                        html += "<hr>"
                        
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Copiar a:</label>";
                        html += "<input autocomplete = 'off' type='text' name='Inf_CopiadosAgencia' onkeyup = 'ListarPersonalCopiaAgencia()' id='Inf_CopiadosAgencia' class='form-control'>"
                        html += "<p></p>"
                        html += "<div class = 'ListCopiadosAgencia'></div>"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser CopiadosAgencia'></div>"
                    html += "</div>";
                    
                    
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asistente:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionCliente()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser AsistentesCliente'></div>"
                        
                        html += "<hr>"
                        
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Copiados:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionClienteCopia()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser CopiadosCliente'></div>"
                    html += "</div>";
                    
                html += "</div>"
                
                html += "<hr>"
                html += "<div class='form-row'>"
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Objetivos de la Reunión:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionObjetivos()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser ListObjetivosReunion'></div>"
                    html += "</div>";
                html += "</div>"
                html += "<hr>"
                
                html += "<div class='form-row'>"
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Desarrollo de la Reunión:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionDesarrolloReunion()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser ListDesarrolloObjetivos'></div>"
                    html += "</div>";
                html += "</div>"
                html += "<hr>"
                html += "<div class='form-row'>"
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'>Compromisos Agencia:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionCompromisoAgencia()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser ListCompromisosAgencia'></div>"
                    html += "</div>";
                html += "</div>"
                html += "<hr>"
                
                html += "<div class='form-row'>"
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='parResponsables' class='col-form-label'>Compromisos Cliente:</label>";
                        html += "<input autocomplete = 'off' type = 'button' class = 'form-control btn btn-primary' value = 'Agregar'  onclick = 'CierraModal(\"ModalEdit2\",\"myModal\");AddInformacionCompromisoCliente()' />"
                        html += "<p></p>"
                        html += "<div class = 'ContentListUser ListCompromisosCliente'></div>"
                    html += "</div>";
                html += "</div>"
                html += "<hr>"
                /*html += "<div class='form-row'>"
                    html += "<textarea class = 'form-control' id = 'InformacionGeneralIE' name = 'observaciones' style = 'display:none;'></textarea>"
                        html += "<div class='grid-container'>"
                            html += "<div class='grid-width-100 EditorX'>"
                                html += "<div class='editor' id = 'Editor' name = 'InformacionGeneral_IE'>"
                                html += "</div>"
                            html += "</div>"
                        html += "</div>"
                html += "</div>"
                */
                html += "<div class='form-group'>";
                    html += "<label>Adjuntos:</label>";
                    html += "<input type='file' class='form-control' onchange='OTCliente.loadFilesInf(event)' multiple>"
                html += "</div>";

                html += "<div class='lista' id=''>"
                    html += "<table class='dataTable tableNew' id = 'listaAdjuntosInfOT'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Descartar</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "<table/>"
                html += "</div>"
             html += "</div>";   
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' onclick = 'CierraModal(\"ModalEdit2\",\"ModalEdit\");'>Cerrar</button>";
                html += "<button type='button' onclick = 'GuardarInformeEntrevista()'class='btn btn-primary'>Guardar</button>";
            html += "</div>";

            html += "</form>";
            
            $(".content_modal2").html(html);
            //$(".js-example-basic-single").select2();
            OTCliente.listarFilesInf();
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            $FormValidate = $(".FormNuevoTI").validate({
                rules: {
                    Inf_Asunto : {
                        required: true,
                        minlength:5
                    },
                    Inf_TipoInforme : {
                        required: true,
                        minlength:3
                    },
                    Inf_TipoReunion : {
                        required: true,
                        minlength:3
                    },
                    Inf_Fecha : {
                        required: true,
                        minlength:5
                    },
                    Inf_HoraInicio : {
                        required: true,
                        minlength:5
                    },
                    Inf_HoraFin : {
                        required: true,
                        minlength:5
                    }
                }
            });
            ListarAsistentesAgenciaIE();
            ListarCopiadosAgenciaIE();
            initSample()
        }
    })
}

function GuardarInformeEntrevista(){
    var x = 0;
    if( $("#Inf_TipoInforme").val() == 246800 ){
        if( Inf_AsisCliente.length == 0 ){
            x = 1
            alert("Debe Ingresar Asistentes del Cliente");
        }
    }
    if( Inf_Objetivos.length == 0 && Inf_Desarrollo.length == 0 ){
        x = 1
        alert("Debe diligenciar la información de los Objetivos y el correspondiente Desarrollo de la reunión.");
    }
    
    if( x == 0 ){
        var formData = new FormData();
        formData.append("Hash",$IdProyecto);
        formData.append("Asunto", $("#Inf_Asunto").val() );
        formData.append("IdTipoInforme", $("#Inf_TipoInforme").val() );
        formData.append("IdTipoReunion", $("#Inf_TipoReunion").val() );
        formData.append("Fecha", $("#Inf_Fecha").val() );
        formData.append("HInicio", $("#Inf_HoraInicio").val() );
        formData.append("HFin", $("#Inf_HoraFin").val() );
        //formData.append("InformacionGeneral",  CKEDITOR.instances["Editor"].getData()  );
        
        formData.append("AsistentesAgencia", JSON.stringify(Inf_AsisAgencia));
        formData.append("CopiadosAgencia", JSON.stringify(Inf_CopAgencia));
        formData.append("AsistentesCliente", JSON.stringify(Inf_AsisCliente));
        formData.append("CopiadosGeneral", JSON.stringify(Inf_CopGeneral));
        
        formData.append("Inf_Objetivos", JSON.stringify(Inf_Objetivos));
        formData.append("Inf_Desarrollo", JSON.stringify(Inf_Desarrollo));
        formData.append("Inf_CompromisosAgencia", JSON.stringify(Inf_CompromisosAgencia));
        formData.append("Inf_CompromisosCliente", JSON.stringify(Inf_CompromisosCliente));
        
        //var archivos = document.getElementById("ParLogo");
        formData.append("NumArchivos", AdjuntosInf.length );
        for (var i = 0; i < AdjuntosInf.length; i++) {
            formData.append("Archivos"+i, AdjuntosInf[i]);
        }
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'00320d5c5bc62ada8b51221d5a784f52',
            success:function(data){
                alert(data.mensaje)
                ModalEdit2(0)
                ModalEdit(1)
            }
        })
        
    }
    
}


function EnviarInformeEntrevista(Hash){
    var formData = new FormData();
    formData.append("Hash",Hash);
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'0dfed6315e7cd3cf6c204ea06a20f407',
        success:function(data){
            BuscarTablaInformesEntrevista()
        }
    })
}

function CrearCampanasClientes(){
    
}