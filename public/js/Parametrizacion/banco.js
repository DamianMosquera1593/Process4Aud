/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("DOCLEGAL")
    ContentList("TIPOMOVIMIENTOS")
    ContentList("TIPOPRODUCTOS")
    
    TablaBanco_DL()
    TablaBanco_TP()
    TablaBanco_TM()
});

function BuscarTablaBanco_DL(){
    $DataTable_Banco_DL.destroy();
    $DataTable_Banco_DL.draw();
    TablaBanco_DL();
}

function BuscarTablaBanco_TP(){
    $DataTable_Banco_TP.destroy();
    $DataTable_Banco_TP.draw();
    TablaBanco_TP();
}

function BuscarTablaBanco_TM(){
    $DataTable_Banco_TM.destroy();
    $DataTable_Banco_TM.draw();
    TablaBanco_TM();
}

function TablaBanco_DL(){
    $DataTable_Banco_DL = $('#TablaBancos_DL').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'1b1dc1615c3e5d558ada4bd141ba4d14',
            'data':function (d) {
                    d.search['value'] = $("#DL_TextBusqueda").val();
                    d.search['Estadox'] = $("#DL_Estado").val();
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
                    return '<span class = "_ContentBDLN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_BANCOS_DOCUMENTOS_LEGALES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '65992a272dc76638b416caa0590d4695'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '65992a272dc76638b416caa0590d4695'+'\',0)">'
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
                    
                    if( full.PAR_BANCOS_DOCUMENTOS_LEGALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDocLegal(\''+full.Hash+'\',\''+UrlUniversal + 'd380580a6a3d61235fb5caf50cbb6747'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaBancos_DL').css({'width':'100%'})
}

function TablaBanco_TP(){
    $DataTable_Banco_TP = $('#TablaBancos_TP').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'b35cb79f28bbf77c50770e10c72b5bb1',
            'data':function (d) {
                    d.search['value'] = $("#TP_TextBusqueda").val();
                    d.search['Estadox'] = $("#TP_Estado").val();
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
                    return '<span class = "_ContentBTPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_BANCOS_TIPO_PRODUCTOS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoProductos(\''+full.Hash+'\',\''+UrlUniversal + 'cfdb4a9a1139cfaf64269f013bb111d7'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoProductos(\''+full.Hash+'\',\''+UrlUniversal + 'cfdb4a9a1139cfaf64269f013bb111d7'+'\',0)">'
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
                    
                    if( full.PAR_BANCOS_TIPO_PRODUCTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoProductos(\''+full.Hash+'\',\''+UrlUniversal + '679d01a06d704b2a5af354fb537f8cb9'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaBancos_TP').css({'width':'100%'})
}

function TablaBanco_TM(){
    $DataTable_Banco_TM = $('#TablaBancos_TM').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'b5a618ec999c760f01da31e4c14e5cd6',
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
                    return '<span class = "_ContentBTMN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_BANCOS_TIPO_MOVIMIENTOS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoMovimientos(\''+full.Hash+'\',\''+UrlUniversal + 'b529d9c38d60d645a5a7b28d459d9994'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoMovimientos(\''+full.Hash+'\',\''+UrlUniversal + 'b529d9c38d60d645a5a7b28d459d9994'+'\',0)">'
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
                    
                    if( full.PAR_BANCOS_TIPO_MOVIMIENTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoMovimientos(\''+full.Hash+'\',\''+UrlUniversal + '225fa3101b4369e6966980b141becdcf'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaBancos_TM').css({'width':'100%'})
}

function CrearDocLegal(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Documento Legal</span>";
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
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' name='ParDocLegal' placeholder='Documento Legal' autocomplete = 'off' required/>";
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

function DataDocLegal(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Documento Legal</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarBanco_DL'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' value='"+$("._ContentBDLN_"+Hash).text()+"' name='ParDocLegal' placeholder='Documento Legal' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarBanco_DL(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarBanco_DL").validate({
        rules: {
            ParDocLegal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarBanco_DL(Hash,Ruta){
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
                BuscarTablaBanco_DL()
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
            BuscarTablaBanco_DL()
        }
    });
}

function CrearTipoProductos(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipos de Productos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipdoProducto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoProducto' name='ParTipoProducto' placeholder='Tipo de Producto' autocomplete = 'off' required/>";
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

function DataTipoProductos(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipos de Productos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarBanco_TP'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoProducto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoProducto' value='"+$("._ContentBTPN_"+Hash).text()+"' name='ParTipoProducto' placeholder='Tipo de Producto' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarBanco_TP(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarBanco_TP").validate({
        rules: {
            ParTipoProducto : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarBanco_TP(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoProducto: $("#ParTipoProducto").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaBanco_TP()
            }
        });
    }
}

function EstadoTipoProductos(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaBanco_TP()
        }
    });
}

function CrearTipoMovimientos(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipo de Movimiento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoMovimiento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoMovimiento' name='ParTipoMovimiento' placeholder='Tipo de Movimiento' autocomplete = 'off' required/>";
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

function DataTipoMovimientos(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipos de Movimiento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarBanco_TM'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoMovimiento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoMovimiento' value='"+$("._ContentBTMN_"+Hash).text()+"' name='ParTipoMovimiento' placeholder='Periodicidad' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarBanco_TM(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarBanco_TM").validate({
        rules: {
            ParTipoMovimiento : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarBanco_TM(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoMovimiento: $("#ParTipoMovimiento").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaBanco_TM()
            }
        });
    }
}

function EstadoTipoMovimientos(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaBanco_TM()
        }
    });
}

