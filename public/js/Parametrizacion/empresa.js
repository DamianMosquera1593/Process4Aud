/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    TablaTipoDocumentos();
    TablaTarifasImpuestos();
});

function TablaTipoDocumentos(){
    $DataTable_TipoDocumentos = $('#TableDocLegales').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'e4dfbcc3745e6366d0b8c7be35ad740f',
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
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_EMPRESA_TARIFAS_IMPUESTOS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDocLegalEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'd2baccb130a2cd2577184780b83b4187'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDocLegalEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'd2baccb130a2cd2577184780b83b4187'+'\',0)">'
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
                    
                    if( full.PAR_EMPRESA_TARIFAS_IMPUESTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDocumentoLegal(\''+full.Hash+'\',\''+UrlUniversal + 'a75b11eba7e34ef0d6d78c99ac4402ba'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
            'url':'61a59bd1e7d3b713bbbce51ecd0305eb',
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
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_EMPRESA_TARIFAS_IMPUESTOS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'd57cb0c05170dc402817dbb6917d3bd1'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+UrlUniversal + 'd57cb0c05170dc402817dbb6917d3bd1'+'\',0)">'
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
                    
                    if( full.PAR_EMPRESA_TARIFAS_IMPUESTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataImpuesto(\''+full.Hash+'\',\''+UrlUniversal + '7d78abe7c625bc7754f9801c85e0619b'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    TablaTipoDocumentos();
}
function BuscarTarifasImpuestosEmpresa(){
    $DataTable_TarifasImpuestos.destroy();
    $DataTable_TarifasImpuestos.draw();
    TablaTarifasImpuestos();
}
function CrearDocLegal(Ruta){
    EventosAparturaModal()
    var html = "";
    

    TituloVentana = "Nuevo Documento Legal"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNomDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Documento:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParNomDocLegal' name='ParNomDocLegal' placeholder='Nombre Documento' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
     html += "</form>";
    $(".content_modal").html(html);
    
}

function DataDocumentoLegal(Hash,Ruta){
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Editar Documento Legal"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
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
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTipoDocumento(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTipoDocumento").validate({
        rules: {
            ParNomDocLegal : {
                required: true,
                minlength:3
            }
            /*,
            age: {
              required: true,
              number: true,
              min: 18
            },
            email: {
              required: true,
              email: true
            },
            weight: {
              required: {
                depends: function(elem) {
                  return $("#age").val() > 50
                }
              },
              number: true,
              min: 0
            }*/
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
            },
            success:function(data){
                EventosCierreModal()
                BuscarTipoDocumentoEmpresa()
            }
        });
    }
}
function EstadoDocLegalEmpresa(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTipoDocumentoEmpresa()
        }
    });
}



function CrearImpuesto(Ruta){
    var html = "";
    
    TituloVentana = "Nueva Tarifa / Impuesto"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Tarifa:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParImpuestoEmpresa' name='ParImpuestoEmpresa' placeholder='Nombre Tarifa' required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
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
    TituloVentana = "Editar Tarifa / Impuesto"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
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
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTI(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
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
            },
            success:function(data){
                EventosCierreModal()
                BuscarTarifasImpuestosEmpresa()
            }
        });
    }
}