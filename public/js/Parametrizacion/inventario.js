/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    
    TablaInventario_Propietario();
    TablaInventario_PropietarioS();
    TablaInventario_TipoSistemas();
    TablaInventario_Marca();
});

function BuscarTablaInventario_Propietario(){
    $DataTable_Inventario_Propietario.destroy();
    $DataTable_Inventario_Propietario.draw();
    TablaInventario_Propietario();
}

function BuscarTablaInventario_PropietarioS(){
    $DataTable_Inventario_PropietarioS.destroy();
    $DataTable_Inventario_PropietarioS.draw();
    TablaInventario_PropietarioS();
}

function BuscarTablaInventario_TipoSistemas(){
    $DataTable_Inventario_TipoSistemas.destroy();
    $DataTable_Inventario_TipoSistemas.draw();
    TablaInventario_TipoSistemas();
}

function BuscarTablaInventario_Marca(){
    $DataTable_Inventario_Marca.destroy();
    $DataTable_Inventario_Marca.draw();
    TablaInventario_Marca();
}

function TablaInventario_Marca(){
    $DataTable_Inventario_Marca = $('#TablaInventario_Marca').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'25872ac4129ba6f8854799597227fa15',
            'data':function (d) {
                    d.search['value'] = $("#TS_TextBusqueda").val();
                    d.search['Estadox'] = $("#TS_Estado").val();
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
                    return '<span class = "_ContentIMN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_INVENTARIO_SISTEMAS_MARCA_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoSistemasMarca(\''+full.Hash+'\',\''+UrlUniversal + 'a57231665fab19726259eadab9247651'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoSistemasMarca(\''+full.Hash+'\',\''+UrlUniversal + 'a57231665fab19726259eadab9247651'+'\',0)">'
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
                    
                    if( full.PAR_INVENTARIO_SISTEMAS_MARCA_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSistemasTipo(\''+full.Hash+'\',\''+UrlUniversal + 'ca8da7c143d05c913b1be8290955acb7'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaInventario_Marca').css({'width':'100%'})
}

function TablaInventario_TipoSistemas(){
    $DataTable_Inventario_TipoSistemas = $('#TablaInventario_TipoSistemas').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'c6f514d14a5f00b907d9a9c4694d80b0',
            'data':function (d) {
                    d.search['value'] = $("#TS_TextBusqueda").val();
                    d.search['Estadox'] = $("#TS_Estado").val();
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
                    return '<span class = "_ContentITN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_INVENTARIO_TIPO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoSistemasTipo(\''+full.Hash+'\',\''+UrlUniversal + 'a07318fd75b88155b5c1f0e6eae6e639'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoSistemasTipo(\''+full.Hash+'\',\''+UrlUniversal + 'a07318fd75b88155b5c1f0e6eae6e639'+'\',0)">'
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
                    
                    if( full.PAR_INVENTARIO_TIPO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSistemasTipo(\''+full.Hash+'\',\''+UrlUniversal + 'ca8da7c143d05c913b1be8290955acb7'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaInventario_TipoSistemas').css({'width':'100%'})
}

function TablaInventario_PropietarioS(){
    $DataTable_Inventario_PropietarioS = $('#TablaInventario_PropietarioS').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'19793ee153c6b2600e70d0f1a8fc9908',
            'data':function (d) {
                    d.search['value'] = $("#PRS_TextBusqueda").val();
                    d.search['Estadox'] = $("#PRS_Estado").val();
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
                    return '<span class = "_ContentISP_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_INVENTARIO_PROPIETARIO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoSistemasPropietario(\''+full.Hash+'\',\''+UrlUniversal + '5e069393e734171f77cf0897df0f7d53'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoSistemasPropietario(\''+full.Hash+'\',\''+UrlUniversal + '5e069393e734171f77cf0897df0f7d53'+'\',0)">'
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
                    
                    if( full.PAR_INVENTARIO_PROPIETARIO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSistemasPropietario(\''+full.Hash+'\',\''+UrlUniversal + '74348763c2057594dd749d3d920aeb99'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaInventario_PropietarioS').css({'width':'100%'})
}

function TablaInventario_Propietario(){
    $DataTable_Inventario_Propietario = $('#TablaInventario_Propietario').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'34c3de05c3123e7ab1897674bca35682',
            'data':function (d) {
                    d.search['value'] = $("#PR_TextBusqueda").val();
                    d.search['Estadox'] = $("#PR_Estado").val();
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
               data: 'Unidad',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOUN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoPropietarioOficina(\''+full.Hash+'\',\''+UrlUniversal + '3bce8214662cb627542e03ae8b13d7a4'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoPropietarioOficina(\''+full.Hash+'\',\''+UrlUniversal + '3bce8214662cb627542e03ae8b13d7a4'+'\',0)">'
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
                    
                    if( full.PAR_INVENTARIO_OFICINA_PROPIETARIO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataOficinaPropietario(\''+full.Hash+'\',\''+UrlUniversal + '8b47cb0aaa0e8ea4cf71c5a493af914a'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaInventario_Propietario').css({'width':'100%'})
}

function CrearOficinaPropietario(Ruta){
    $.ajax({
        type:'POST',
        url:'a7b498c0b69caf18c0e8c0864ed8391c',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: 1,
        },
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Propietario Oficina"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<div class='modal-body'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                            html += "<select class = 'form-control' name = 'unidadnegocio' id = 'unidadnegocio' required>"
                                html += "<option value = '' selected>Seleccione</option>"
                                for(var i = 0; i < data.Unidad.length; i++){
                                    html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Propietario:</label>"
                            html += "<input type='text' class='form-control' id='ParOficinaPropietario' name='ParOficinaPropietario' placeholder='Propietario Oficina' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal").html(html);
        }
    });
    
}

function DataOficinaPropietario(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Propietario Oficina"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarInvetario_Propietario'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParOficinaPropietario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Oficina Propietario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParOficinaPropietario' value='"+$("._ContentOPN_"+Hash).text()+"' name='ParOficinaPropietario' placeholder='Oficina Propietario' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPropietarioOficina(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarInvetario_Propietario").validate({
        rules: {
            ParOficinaPropietario : {
                required: true,
                minlength:3
            }
        }
    });
}


function GuardarEditarPropietarioOficina(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParOficinaPropietario: $("#ParOficinaPropietario").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaInventario_Propietario()
            }
        });
    }
}

function EstadoPropietarioOficina(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaInventario_Propietario()
        }
    });
}

function CrearSistemasPropietario(Ruta){
    var html = "";
    TituloVentana = "Crear Propietario Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPropietario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Propietario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPropietario' name='ParPropietario' placeholder='Propietario' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataSistemasPropietario(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Propietario Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarInvetario_PropietarioS'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPropietario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Propietario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPropietario' value='"+$("._ContentISP_"+Hash).text()+"' name='ParPropietario' placeholder='Propietario' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPropietarioS(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarInvetario_PropietarioS").validate({
        rules: {
            ParPropietario : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPropietarioS(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPropietario: $("#ParPropietario").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaInventario_PropietarioS()
            }
        });
    }
}

function EstadoSistemasPropietario(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaInventario_PropietarioS()
        }
    });
}

function CrearSistemasTipo(Ruta){
    var html = "";
    TituloVentana = "Crear Tipo Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipo' name='ParTipo' placeholder='Tipo' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()' >Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);

}

function DataSistemasTipo(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Tipo Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarInvetario_TipoSistemas'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipo' value='"+$("._ContentITN_"+Hash).text()+"' name='ParTipo' placeholder='Tipo' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTipoSistemas(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarInvetario_TipoSistemas").validate({
        rules: {
            ParTipo : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarTipoSistemas(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipo: $("#ParTipo").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaInventario_TipoSistemas()
            }
        });
    }
}

function EstadoSistemasTipo(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaInventario_TipoSistemas();
        }
    });
}

function CrearSistemasMarca(Ruta){
    var html = "";
    TituloVentana = "Nueva Marca Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParMarca' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Marca:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParMarca' name='ParMarca' placeholder='Marca' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);

}

function DataSistemasMarca(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Marca Sistemas"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin FormEditarInvetario_Marca'  action='"+Ruta+"' method='post'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParMarca' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Marca:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParMarca' value='"+$("._ContentIMN_"+Hash).text()+"' name='ParMarca' placeholder='Marca' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarMarca(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarInvetario_Marca").validate({
        rules: {
            ParMarca : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarMarca(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParMarca: $("#ParMarca").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaInventario_Marca()
            }
        });
    }
}

function EstadoSistemasMarca(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.success == 1 ){
                alert = "alert-success";
                msj = "Se ha cambiado el estado de manera correcta";
            }
            Notificacion(msj,alert);
        }
    });
}

