/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("DocLegales");
    ContentList("TarifasImpuestos");
    TablaTipoSolicitudes();
    TablaTarifasImpuestos();
    TablaTipoMaterial();
    TablaMediosTipoMaterial();
    TablaSectorUnidad();
    TablaSectorDetalle();
});

function TablaTipoSolicitudes(){
    $DataTable_TipoDocumentos = $('#TableDocLegales').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'0853f95f5a6301051018a0cbbe7984b3',
            'data':function (d) {
                    d.search['value'] = $("#TipoDoc_TextBusqueda").val();
                    d.search['Estadox'] = $("#TipoDoc_Estado").val();
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
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentDN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Descripcion',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentDD_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoSolicitud(\''+full.Hash+'\',\''+UrlUniversal + 'exd0853f95f5a6301051018a0cbbe7984b3'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoSolicitud(\''+full.Hash+'\',\''+UrlUniversal + 'exd0853f95f5a6301051018a0cbbe7984b3'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoSolicitud(\''+full.Hash+'\',\''+UrlUniversal + 'ex0853f95f5a6301051018a0cbbe7984b3'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TableDocLegales').css({'width':'100%'})
}

function TablaTarifasImpuestos(){
    $DataTable_TarifasImpuestos = $('#TablaTarifasImpuestos').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8c4441bfb7d623e09efda5e0610d323f',
            'data':function (d) {
                    d.search['value'] = $("#TI_TextBusqueda").val();
                    d.search['Estadox'] = $("#TI_Estado").val();
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
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTIN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Descripcion',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTIND_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'est8c4441bfb7d623e09efda5e0610d323f'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'est8c4441bfb7d623e09efda5e0610d323f'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataImpuesto(\''+full.Hash+'\',\''+UrlUniversal + 'ed8c4441bfb7d623e09efda5e0610d323f'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTarifasImpuestos').css({'width':'100%'})
}

function BuscarTipoDocumentoEmpresa(){
    $DataTable_TipoDocumentos.destroy();
    $DataTable_TipoDocumentos.draw();
    TablaTipoSolicitudes();
}

function BuscarDSectores(){
    $DataTable_DL.destroy();
    $DataTable_DL.draw();
    TablaSectorDetalle();
}

function BuscarSectores(){
    $DataTable_TR.destroy();
    $DataTable_TR.draw();
    TablaSectorUnidad();
}
function BuscarTipoMaterial(){
    $DataTable_TipoMaterial.destroy();
    $DataTable_TipoMaterial.draw();
    TablaTipoMaterial();
}
function BuscarMTipoMaterial(){
    $DataTable_TipoMaterialDetalle.destroy();
    $DataTable_TipoMaterialDetalle.draw();
    TablaMediosTipoMaterial();
}
function BuscarTarifasImpuestosEmpresa(){
    $DataTable_TarifasImpuestos.destroy();
    $DataTable_TarifasImpuestos.draw();
    TablaTarifasImpuestos();
}
function CrearTipoSolicitud(){
    EventosAparturaModal()
    var Ruta = UrlGeneral + '6295e14e366b0503b236e70afd09490a';
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipo Solicitud</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParNomDocLegal' name='ParNomDocLegal' placeholder='Nombre Documento' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<textarea class = 'form-control' name = 'Descripcion' id = 'Descripcion' rows = '4'></textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    
}

function DataTipoSolicitud(Hash,Ruta){
    EventosAparturaModal()
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipo Solicitud</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin FormEditarTipoDocumento'  action='javascript:void(0)' method='post'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParNomDocLegal' value='"+$("._ContentDN_"+Hash).text()+"' name='ParNomDocLegal' placeholder='Nombre Documento' required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<textarea class = 'form-control' name = 'Descripcion' id = 'Descripcion' rows = '4'>"+$("._ContentDD_"+Hash).text()+"</textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTipoDocumento("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTipoDocumento").validate({
        rules: {
            ParNomDocLegal : {
                required: true,
                minlength:3
            }
            ,
            Descripcion: {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarTipoDocumento(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParNomDocLegal: $("#ParNomDocLegal").val(),
                Descripcion: $("#Descripcion").val(),
            },
            success:function(data){
                location.reload()
            }
        });
    }
}

function EstadoTipoSolicitud(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTipoDocumentoEmpresa()
        }
    });
}

function CrearTipoDesarrollo(){
    var html = "";
    var Ruta = UrlGeneral + 'c0cd287362f97d507825cc67751f5b9f';
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nueva Tipo de Desarrollo</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Desarrollo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParImpuestoEmpresa' name='ParImpuestoEmpresa' placeholder='' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<textarea class = 'form-control' name = 'Descripcion' id = 'Descripcion' rows = '4'></textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
}

function EstadoImpuestoEmpresa(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTarifasImpuestosEmpresa();
        }
    });
}

function DataImpuesto(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tarifa / Impuesto</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTI'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Impuesto:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParImpuestoEmpresa' value='"+$("._ContentTIN_"+Hash).text()+"' name='ParImpuestoEmpresa' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<textarea class = 'form-control' name = 'Descripcion' id = 'Descripcion' rows = '4'>"+$("._ContentTIND_"+Hash).text()+"</textarea>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTI("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTI").validate({
        rules: {
            ParImpuestoEmpresa : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarTI(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParImpuestoEmpresa: $("#ParImpuestoEmpresa").val(),
                Descripcion: $("#Descripcion").val(),
            },
            success:function(data){
                EventosCierreModal()
                BuscarTarifasImpuestosEmpresa()
            }
        });
    }
}

function CrearTipoMaterial(){
    EventosAparturaModal()
    var Ruta = UrlGeneral + 'e228c9f5c2647b90785f6e65017d9f53';
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipo de Material</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Material:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='TipoMaterial' name='TipoMaterial' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    
}

function TablaTipoMaterial(){
    $DataTable_TipoMaterial = $('#TablaTipoMaterial').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'c8ebeaf169b2579d57bc6107f0ce6193',
            'data':function (d) {
                    d.search['value'] = $("#TM_TextBusqueda").val();
                    d.search['Estadox'] = $("#TM_Estado").val();
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
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTMx_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'estc8ebeaf169b2579d57bc6107f0ce6193'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'estc8ebeaf169b2579d57bc6107f0ce6193'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'edc8ebeaf169b2579d57bc6107f0ce6193'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTipoMaterial').css({'width':'100%'})
}

function EstadoTipoMaterial(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTipoMaterial();
        }
    });
}

function DataTipoMaterial(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipo Material</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTI'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Material:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='TipoMaterial' value='"+$("._ContentTMx_"+Hash).text()+"' name='TipoMaterial' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTM("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTI").validate({
        rules: {
            TipoMaterial : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarTM(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                TipoMaterial: $("#TipoMaterial").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTipoMaterial()
            }
        });
    }
}

function CrearMTipoMaterial(){
    EventosAparturaModal()
    var Ruta = UrlGeneral + 'c5b07387f9fb7f044cfe15c41df8bece';
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Medio Tipo de Material</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Material:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select class = 'form-control' id = 'TipoMaterial' name = 'TipoMaterial'></select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Medio:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='Medio' name='Medio' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    PARRequerimientoCliente.Cliente_listarTipoMaterial();
    
}

function TablaMediosTipoMaterial(){
    $DataTable_TipoMaterialDetalle = $('#TablaMedioTipoMaterial').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'2e7986fed275ace00443a9e61969d6c9',
            'data':function (d) {
                    d.search['value'] = $("#TMM_TextBusqueda").val();
                    d.search['Estadox'] = $("#TMM_Estado").val();
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
               data: 'Medio',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTMxx_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Material',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoMTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'est2e7986fed275ace00443a9e61969d6c9'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoMTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'est2e7986fed275ace00443a9e61969d6c9'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataMTipoMaterial(\''+full.Hash+'\',\''+UrlUniversal + 'ed2e7986fed275ace00443a9e61969d6c9'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaMedioTipoMaterial').css({'width':'100%'})
}

const PARRequerimientoCliente = {
    Cliente_listarTipoMaterial: function() {
        printDataAjax('2dcfa09040494aa2287ff6753add61d8', {}, data => {
            
            html = "<option value = '' selected>Seleccione</option>"
            data.Info.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Material']+"</option>"
            });
            
            $('#TipoMaterial').html(html)
        })
    },
    Cliente_listarSector: function() {
        printDataAjax('d76aded1131930b5504d6421565183b0', {}, data => {
            
            html = "<option value = '' selected>Seleccione</option>"
            data.Info.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Sector']+"</option>"
            });
            
            $('#Sector').html(html)
        })
    }
}

function DataMTipoMaterial(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Medio Tipo Material</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTI'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Medio:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='Medio' value='"+$("._ContentTMxx_"+Hash).text()+"' name='Medio' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTMM("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTI").validate({
        rules: {
            Medio : {
                required: true,
                minlength:3
            }
        }
    });
}

function EstadoMTipoMaterial(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarMTipoMaterial();
        }
    });
}

function GuardarEditarTMM(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Medio: $("#Medio").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarMTipoMaterial()
            }
        });
    }
}

function CrearSectorUnidad(){
    EventosAparturaModal()
    var Ruta = UrlGeneral + '83a4b54c52444273df77d93bd74b8e32';
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Sector / Unidad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Sector / Unidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='SectorUnidad' name='SectorUnidad' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    PARRequerimientoCliente.Cliente_listarTipoMaterial();
}

function TablaSectorUnidad(){
    $DataTable_TR = $('#TablaSectores').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'c5937d84ef10c47b8339d56695396f91',
            'data':function (d) {
                    d.search['value'] = $("#TSU_TextBusqueda").val();
                    d.search['Estadox'] = $("#TSU_Estado").val();
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
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTSU_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoSU(\''+full.Hash+'\',\''+UrlUniversal + 'estc5937d84ef10c47b8339d56695396f91'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoSU(\''+full.Hash+'\',\''+UrlUniversal + 'estc5937d84ef10c47b8339d56695396f91'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSU(\''+full.Hash+'\',\''+UrlUniversal + 'edc5937d84ef10c47b8339d56695396f91'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaSectores').css({'width':'100%'})
}

function EstadoSU(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarSectores();
        }
    });
}

function DataSU(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Sector / Unidad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTI'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Sector / Unidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='Sector' value='"+$("._ContentTSU_"+Hash).text()+"' name='Sector' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarSU("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTI").validate({
        rules: {
            Medio : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarSU(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Sector: $("#Sector").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarSectores()
            }
        });
    }
}

function CrearDSectorUnidad(){
    EventosAparturaModal()
    var Ruta = UrlGeneral + '4a112f2e99d415aba2c326869187b531';
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Detalle Sector / Unidad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Sector / Unidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select class = 'form-control' id = 'Sector' name = 'Sector'></select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Detalle:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='Detalle' name='Detalle' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    PARRequerimientoCliente.Cliente_listarSector();
}

function TablaSectorDetalle(){
    $DataTable_DL = $('#TablaSectoresDetalle').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8218de5f69aac313a7761cd88cf4e839',
            'data':function (d) {
                    d.search['value'] = $("#TSUD_TextBusqueda").val();
                    d.search['Estadox'] = $("#TSUD_Estado").val();
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
               data: 'Detalle',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTDSU_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Sector',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoSUD(\''+full.Hash+'\',\''+UrlUniversal + 'est8218de5f69aac313a7761cd88cf4e839'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoSUD(\''+full.Hash+'\',\''+UrlUniversal + 'est8218de5f69aac313a7761cd88cf4e839'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDsector(\''+full.Hash+'\',\''+UrlUniversal + 'ed8218de5f69aac313a7761cd88cf4e839'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaSectoresDetalle').css({'width':'100%'})
}

function EstadoSUD(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarDSectores();
        }
    });
}

function DataDsector(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Detalle Sector / Unidad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTI'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Sector / Unidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='Sector' value='"+$("._ContentTDSU_"+Hash).text()+"' name='Sector' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarSUD("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTI").validate({
        rules: {
            Sector : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarSUD(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                Sector: $("#Sector").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarDSectores();
            }
        });
    }
}