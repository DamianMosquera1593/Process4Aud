/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    
    TablaCliente_DC();
    TablaCliente_IT();
    TablaCliente_MP();
    TablaCliente_TC();
});

function BuscarTablaCliente_DL(){
    $DataTable_Cliente_DC.destroy();
    $DataTable_Cliente_DC.draw();
    TablaCliente_DC();
}

function BuscarTablaCliente_IT(){
    $DataTable_Cliente_IT.destroy();
    $DataTable_Cliente_IT.draw();
    TablaCliente_IT();
}
function BuscarTablaCliente_MP(){
    $DataTable_Cliente_MP.destroy();
    $DataTable_Cliente_MP.draw();
    TablaCliente_MP();
}
function BuscarTablaCliente_TC(){
    $DataTable_Cliente_TC.destroy();
    $DataTable_Cliente_TC.draw();
    TablaCliente_TC();
}

function TablaCliente_DC(){
    $DataTable_Cliente_DC = $('#TablaCliente_DC').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'67e3673ee6ba150294aa70331af758e5',
            'data':function (d) {
                    d.search['value'] = $("#DC_TextBusqueda").val();
                    d.search['Estadox'] = $("#DC_Estado").val();
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
                    return '<span class = "_ContentCDLN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_CLIENTES_DOCUMENTOS_LEGALES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '3ce2a91a30d0d4c909bcacab39928936'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '3ce2a91a30d0d4c909bcacab39928936'+'\',0)">'
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
                    
                    if( full.PAR_CLIENTES_DOCUMENTOS_LEGALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDocLegal(\''+full.Hash+'\',\''+UrlUniversal + 'c775752219f9b2128f70b3376e209e5c'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaCliente_DC').css({'width':'100%'})
}

function TablaCliente_IT(){
    $DataTable_Cliente_IT = $('#TablaCliente_IT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'7b5bfb014d7a6d3b45363ed7103c6f93',
            'data':function (d) {
                    d.search['value'] = $("#IT_TextBusqueda").val();
                    d.search['Estadox'] = $("#IT_Estado").val();
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
                    return '<span class = "_ContentCITN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_CLIENTES_INFORMACION_TRIBUTARIA_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoInfoTributaria(\''+full.Hash+'\',\''+UrlUniversal + 'f0b29a92eeed4cb55239806b6f8e9f88'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoInfoTributaria(\''+full.Hash+'\',\''+UrlUniversal + 'f0b29a92eeed4cb55239806b6f8e9f88'+'\',0)">'
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
                    
                    if( full.PAR_CLIENTES_INFORMACION_TRIBUTARIA_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataInfoTributaria(\''+full.Hash+'\',\''+UrlUniversal + '76108987cc272847418116eec71b4079'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaCliente_IT').css({'width':'100%'})
}

function TablaCliente_MP(){
    $DataTable_Cliente_MP = $('#TablaCliente_MP').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'2e2a27a21a9af78e28f0fec88e363e68',
            'data':function (d) {
                    d.search['value'] = $("#MP_TextBusqueda").val();
                    d.search['Estadox'] = $("#MP_Estado").val();
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
                    return '<span class = "_ContentCPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Dias',
               "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentCPDD_'+full.Hash+'">' + data + '</span></center>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_CLIENTES_MODALIDADES_DE_PAGO_CONSULTAR == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoPagos(\''+full.Hash+'\',\''+UrlUniversal + '663e18a6180d112c61f1832a1207558e'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoPagos(\''+full.Hash+'\',\''+UrlUniversal + '663e18a6180d112c61f1832a1207558e'+'\',0)">'
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
                    
                    if( full.PAR_CLIENTES_MODALIDADES_DE_PAGO_CONSULTAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataPagos(\''+full.Hash+'\',\''+UrlUniversal + 'f3ec4736675e011c964587cbbe76b3f9'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaCliente_MP').css({'width':'100%'})
}

function TablaCliente_TC(){
    $DataTable_Cliente_TC = $('#TablaCliente_TC').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8233f3ec8452440a7812ee364a50a265',
            'data':function (d) {
                    d.search['value'] = $("#TC_TextBusqueda").val();
                    d.search['Estadox'] = $("#TC_Estado").val();
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
                    return '<span class = "_ContentCTCN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_CLIENTES_TIPOS_DE_CONTRATO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoContrato(\''+full.Hash+'\',\''+UrlUniversal + 'b2835f9c5e5d7f43ed9f022cc2276748'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoContrato(\''+full.Hash+'\',\''+UrlUniversal + 'b2835f9c5e5d7f43ed9f022cc2276748'+'\',0)">'
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
                    
                    if( full.PAR_CLIENTES_TIPOS_DE_CONTRATO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoContrato(\''+full.Hash+'\',\''+UrlUniversal + 'c6f70778fcd8d26a0118953a4daf853b'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaCliente_TC').css({'width':'100%'})
}

function CrearDocLegal(Ruta){
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
            html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='ParDocLegal' name='ParDocLegal' placeholder='Documento Legal' autocomplete = 'off' required/>";
            html += "</div>";
        html += "</div>";
    html += "</div>";
    html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataDocLegal(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Documento Legal"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarCliente_DC'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' value='"+$("._ContentCDLN_"+Hash).text()+"' name='ParDocLegal' placeholder='Documento Legal' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarCliente_DC(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarCliente_DC").validate({
        rules: {
            ParDocLegal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarCliente_DC(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParDocLegal: $("#ParDocLegal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaCliente_DL()
            }
        });
    }
}

function EstadoDocLegal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaCliente_DL()
        }
    });
}

function CrearInfoTributaria(Ruta){
    var html = "";
    TituloVentana = "Nueva Información Tributaria"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParInfoTributaria' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParInfoTributaria' name='ParInfoTributaria' placeholder='Nombre' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
}

function DataInfoTributaria(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Información Tributaria"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarCliente_IT'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParInfoTributaria' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParInfoTributaria' value='"+$("._ContentCITN_"+Hash).text()+"' name='ParInfoTributaria' placeholder='Nombre' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarCliente_IT(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarCliente_IT").validate({
        rules: {
            ParInfoTributaria : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarCliente_IT(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParInfoTributaria: $("#ParInfoTributaria").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaCliente_IT()
            }
        });
    }
}

function EstadoInfoTributaria(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaCliente_IT()
        }
    });
}

function CrearPagos(Ruta){
    var html = "";
    TituloVentana = "Nueva Modalidad Pago"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPago' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPago' name='ParPago' placeholder='Modalidad de Pago' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPagoDias' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Días:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPagoDias' name='ParPagoDias' placeholder='Días' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);

}

function DataPagos(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Modalidad de Pago"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarCliente_MP'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPagos' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPagos' value='"+$("._ContentCPN_"+Hash).text()+"' name='ParPagos' placeholder='Modalidad de Pago' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPagoDiasT' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Días:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='number' class='form-control' min = '0' id='ParPagoDiasT' value='"+$("._ContentCPDD_"+Hash).text()+"' name='ParPagoDiasT' placeholder='Días' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarCliente_MP(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarCliente_MP").validate({
        rules: {
            ParPagos : {
                required: true,
                minlength:3
            },
            ParPagoDiasT : {
                required: true,
                number: true,
                minlength:2
            }
        }
    });
}

function GuardarEditarCliente_MP(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPagos: $("#ParPagos").val(),
                ParPagoDiasT: $("#ParPagoDiasT").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaCliente_MP()
            }
        });
    }
}

function EstadoPagos(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaCliente_MP()
        }
    });
}

function CrearTipoContrato(Ruta){
    var html = "";
    TituloVentana = "Nuevo Tipo de Contrato"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoContrato' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoContrato' name='ParTipoContrato' placeholder='Tipo de Contrato' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
}

function DataTipoContrato(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Tipo de Contrato"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarCliente_TC'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoContrato' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Periodicidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoContrato' value='"+$("._ContentCTCN_"+Hash).text()+"' name='ParTipoContrato' placeholder='Tipo de Contrato' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarCliente_TC(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarCliente_TC").validate({
        rules: {
            ParTipoContrato : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarCliente_TC(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoContrato: $("#ParTipoContrato").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaCliente_TC()
            }
        });
    }
}

function EstadoTipoContrato(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaCliente_TC()
        }
    });
}
