/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    TablaListadoPptos()
    
});

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

function Ppto_Blade_ListarUnidadesEmpresaUsuario(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'ac415e10c7fa3362840003282e795f6c',
        data:{ Hash:$("#Empresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Unidades.length; i++){
                html += "<option value = '"+data.Unidades[i]['Hash']+"'>"+data.Unidades[i]['Nombre']+"</option>"
            } 
            $("#Unidad").html(html)
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

function Ppto_Blade_ListarClientesUsuarioEmpresaUnidad(){
   $.ajax({
        type:'POST',
        url:UrlGeneral+'1808d87b2dce352e689b9fec41ae53c9',
        data:{ Hash:$("#Empresa").val(),Hash2:$("#Unidad").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['NombreComercial']+"</option>"
            } 
            $("#Cliente").html(html)
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

function Presupuesto_Blade_ListarTiposComision(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d1278c64e4e3181e82c88a0357893d7c',
        data:{ 
            Hash1:$("#Empresa").val(),
            Hash2:$("#Unidad").val(),
            Hash3:$("#Cliente").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Proyectos.length; i++){
                html += "<option value = '"+data.Proyectos[i]['Hash']+"'>"+data.Proyectos[i]['Codigo']+" - "+data.Proyectos[i]['Referencia']+"</option>"
            } 
            $("#Proyecto").html(html)
        } 
    })
}



function CrearPresupuesto(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'dcf59e06d5eee130c21d79c6b56aefb0',
        data:{ _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Nuevo Presupuesto"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoPresupuesto'  action='javascript:void(0)' method='post' >"
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
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cliente:</label>"
                        html += "<select class = 'form-control' name = 'IdCliente' id = 'IdCliente' onchange = 'Presupuesto_ListarTiposComision()'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Proyecto / OT:</label>"
                        html += "<select class = 'form-control' name = 'IdProyecto' id = 'IdProyecto'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Centro de Costo:</label>"
                        html += "<select class = 'form-control' name = 'IdCentroCosto' id = 'IdCentroCosto' >"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.centro_costo.length; i++){
                                html += "<option value = '"+data.centro_costo[i]['Hash']+"'>"+data.centro_costo[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo Presupuesto:</label>"
                        html += "<select class = 'form-control' name = 'IdTipoPpto' id = 'IdTipoPpto'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Tipo.length; i++){
                                html += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Clasificación:</label>"
                        html += "<select class = 'form-control' name = 'IdClasificacion' id = 'IdClasificacion'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Clasificacion.length; i++){
                                html += "<option value = '"+data.Clasificacion[i]['Hash']+"'>"+data.Clasificacion[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Comisión:</label>"
                        html += "<select class = 'form-control' name = 'IdComision' id = 'IdComision'>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Referencia:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' name = 'ReferenciaPpto' id = 'ReferenciaPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Vigente Desde:</label>"
                        html += "<input class = 'form-control' type = 'date' name = 'VigenciaInicial' id = 'VigenciaInicial' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Vigente Hasta:</label>"
                        html += "<input class = 'form-control' type = 'date' name = 'VigenciaFinal' id = 'VigenciaFinal' />"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Lugar de Ejecución:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' name = 'LugarPpto' id = 'LugarPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'>Dirigido a:</label>"
                        html += "<input class = 'form-control' autocomplete = 'off' type = 'text' name = 'DirigidoAPpto' id = 'DirigidoAPpto' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'>Aprobación Cliente:</label>"
                        html += "<input class = 'form-control' type = 'text' name = 'AprobacionCliente' id = 'AprobacionCliente' />"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nota Legal:</label>"
                        html += "<textarea disabled name = 'NotaLegalEmpresaPpto' id = 'NotaLegalEmpresaPpto' class = 'form-control'></textarea>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'>Nota Adicional:</label>"
                        html += "<textarea name = 'NotaAdicionalPpto' id = 'NotaAdicionalPpto' class = 'form-control'></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarPresupuesto()'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(0.80)

            $FormValidate = $(".FormNuevoPresupuesto").validate({
                rules: {
                    IdEmpresa : {
                        required: true,
                        minlength:1
                    },
                    IdUnidad : {
                        required: true,
                        minlength:1
                    },
                    IdCliente : {
                        required: true,
                        minlength:1
                    },
                    IdProyecto : {
                        required: true,
                        minlength:1
                    },
                    IdCentroCosto : {
                        required: true,
                        minlength:1
                    },
                    IdTipoPpto : {
                        required: true,
                        minlength:1
                    },
                    IdClasificacion : {
                        required: true,
                        minlength:1
                    },
                    IdComision : {
                        required: true,
                        minlength:1
                    },
                    ReferenciaPpto : {
                        required: true,
                        minlength:3
                    },
                    VigenciaInicial : {
                        required: true,
                        minlength:1
                    },
                    VigenciaFinal : {
                        required: true,
                        minlength:1
                    },
                    LugarPpto : {
                        required: true,
                        minlength:1
                    },
                    NotaLegalEmpresaPpto : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}

function GuardarPresupuesto(){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("IdEmpresa", $("#IdEmpresa").val());
        formData.append("IdUnidad", $("#IdUnidad").val());
        formData.append("IdCliente", $("#IdCliente").val());
        formData.append("IdProyecto", $("#IdProyecto").val());
        formData.append("IdCentroCosto", $("#IdCentroCosto").val());
        formData.append("IdTipoPpto", $("#IdTipoPpto").val());
        formData.append("IdClasificacion", $("#IdClasificacion").val());
        formData.append("IdComision", $("#IdComision").val());
        formData.append("ReferenciaPpto", $("#ReferenciaPpto").val());
        formData.append("VigenciaInicial", $("#VigenciaInicial").val());
        formData.append("VigenciaFinal", $("#VigenciaFinal").val());
        formData.append("LugarPpto", $("#LugarPpto").val());
        formData.append("NotaLegalEmpresaPpto", $("#NotaLegalEmpresaPpto").val());
        formData.append("NotaAdicionalPpto", $("#NotaAdicionalPpto").val());
        formData.append("AprobacionCliente", $("#AprobacionCliente").val());
        formData.append("DirigidoAPpto", $("#DirigidoAPpto").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:'4e9cd5ee73665675d448c7c9507b535e',
            success:function(data){
                
                //BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3)
                if( data.Info == 1 ){
                    AlertaMensajes("Se ha creado el Presupuesto # "+data.Ppto,"success",3);
                    ModalEdit(0);
                    $("#TextBusqueda").val(data.Ppto)
                    BuscarPptos()
                }else{
                    AlertaMensajes("No se creó el Presupuesto","error",3);
                }
            }
        })
    }else{
        AlertaMensajes("No se ha diligenciado todos los campos","error",3);
    }
}

//af602a9cee189bd6f128b1c78448423c
function TablaListadoPptos(){
    $DataTable_Pptos = $("#Presupuestos").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'af602a9cee189bd6f128b1c78448423c',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda").val();
                    d.search['Empresa'] = $("#Empresa").val();
                    d.search['Unidad'] = $("#Unidad").val();
                    d.search['Cliente'] = $("#Cliente").val();
                    d.search['Proyecto'] = $("#Proyecto").val();
                    d.search['Estado'] = $("#Estado").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                },
             
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
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'Referencia_Ppto',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'EstadoPpto',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Empresa',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Unidad',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Cliente',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Producto',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Codigo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ ' </span>';
                }

            },
           
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<a target="_blank" href="'+UrlGeneral+'01f34a2740cbabf722b2255aa878959f/'+full.Hash2+'">';
                        htmlx += '<img src ="images/detalles.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    htmlx += '</a>';
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#Presupuestos').css({'width':'100%'})
}


function BuscarPptos(){
    $DataTable_Pptos.destroy();
    TablaListadoPptos();
}