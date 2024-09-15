/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    //$DataTable_Pais.draw();
    TablaPais();
    TablaDepartamentosPais()
    TablaCiudadDepartamentosPais();
    TablaSalarioMinimo();
    TablaSalarioIntegral();
    TablaMonetizacionSena();
    TablaAuxilioTransporte();
});


function BuscarDataPais(){
    $DataTable_Pais.destroy();
    $DataTable_Pais.draw();
    TablaPais()
}
function BuscarDataDepartamentoPais(){
    $DataTable_DepartamentosPais.destroy();
    $DataTable_DepartamentosPais.draw();
    TablaDepartamentosPais();
}
function BuscarDataCiudadDepartamentoPais(){
    $DataTable_Ciudad.destroy();
    $DataTable_Ciudad.draw();
    TablaCiudadDepartamentosPais();
}
function BuscarDataSalarioMinimo(){
    $DataTable_SalarioMinimo.destroy();
    $DataTable_SalarioMinimo.draw();
    TablaSalarioMinimo();
}
function BuscarDataSalarioIntegral(){
    $DataTable_SalarioIntegral.destroy();
    $DataTable_SalarioIntegral.draw();
    TablaSalarioIntegral();
}
function BuscarDataMonetizacionSena(){
    $DataTable_MonetizacionSena.destroy();
    $DataTable_MonetizacionSena.draw();
    TablaMonetizacionSena();
}
function BuscarDataAuxilioTransporte(){
    $DataTable_AuxilioTransporte.destroy();
    $DataTable_AuxilioTransporte.draw();
    TablaAuxilioTransporte();
}

function TablaPais(){
    
    $DataTable_Pais = $('#TablePaises').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '1a07091c8bd4788c05a5669c9620656a',
            'data':function (d) {
                    d.search['value'] = $("#Pais_TextBusqueda").val();
                    d.search['Estadox'] = $("#Pais_Estado").val();
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
                    return '<span class = "_ContentP_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'SiglasPais',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentSP_'+full.Hash+'">' + data + '</span></center>';
                }
            },
           {
                data: 'Moneda',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentM_'+full.Hash+'">' + data + '</span></center>';
                }
            },
           {
                data: 'SiglasMoneda',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentSM_'+full.Hash+'">' + data + '</span></center>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENERALES_PAIS_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoPais(\''+full.Hash+'\',\''+UrlUniversal + 'ec502564b750c3cc7e093813d9b95c91'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoPais(\''+full.Hash+'\',\''+UrlUniversal + 'ec502564b750c3cc7e093813d9b95c91'+'\',0)">'
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

                    if( full.PAR_GENERALES_PAIS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataPais(\''+full.Hash+'\',\''+UrlUniversal + '915589cb0175c8abc0b8bb95e28bf372'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#TablePaises').css({'width':'100%'})
}

function TablaDepartamentosPais(){
    $DataTable_DepartamentosPais = $('#TableDapartamentosPaises').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8542a01c936e4f6eb3d4632863eadf29',
            'data':function (d) {
                    d.search['value'] = $("#Depto_TextBusqueda").val();
                    d.search['Estadox'] = $("#Depto_Estado").val();
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
               data: 'Pais',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Depto',
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
                    if( full.PAR_GENERALES_DEPARTAMENTOS_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDeptos(\''+full.Hash+'\',\''+UrlUniversal + '835c1dd219cebc70d4be8bed4b8d3cfc'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDeptos(\''+full.Hash+'\',\''+UrlUniversal + '835c1dd219cebc70d4be8bed4b8d3cfc'+'\',0)">'
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

                    if( full.PAR_GENERALES_DEPARTAMENTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDepto(\''+full.Hash+'\',\''+UrlUniversal + '0666a2a5d5e27300da3a057c9b154bf7'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#TableDapartamentosPaises').css({'width':'100%'})
}

function TablaCiudadDepartamentosPais(){
    $DataTable_Ciudad = $('#TableCiudades').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'edc5c8c69d37f53edb02b34a9879f8cc',
            'data':function (d) {
                    d.search['value'] = $("#Ciudad_TextBusqueda").val();
                    d.search['Estadox'] = $("#Ciudad_Estado").val();
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
               data: 'Pais',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Departamento',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentDN_'+full.Hash+'">' + data + '</span>';
                }
            },

           {
                data: 'Ciudad',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentCN_'+full.Hash+'">' + data + '</span>';
                }
            },

           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENEARLES_CIUDADES_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoCiudad(\''+full.Hash+'\',\''+UrlUniversal + '9232139a32dd6871470905c4bf2c060a'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoCiudad(\''+full.Hash+'\',\''+UrlUniversal + '9232139a32dd6871470905c4bf2c060a'+'\',0)">'
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

                    if( full.PAR_GENERALES_CIUDADES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataCiudad(\''+full.Hash+'\',\''+UrlUniversal + 'a09d07bd250700960d35ab80aafff7c3'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#TableCiudades').css({'width':'100%'})
}

function TablaSalarioMinimo() {
    $DataTable_SalarioMinimo = $('#TableSalarioMinimo').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '24bbd7ab604456ba2fd41896cd08544d',
            'data':function (d) {
                    d.search['value'] = $("#Salario_Minimo_TextBusqueda").val();
                    d.search['Estadox'] = $("#Salario_Minimo_Estado").val();
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
               data: 'Year',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentY_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Salario',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentS_'+full.Hash+'">' + data + '</span>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENERALES_SALARIO_MINIMO_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "SalarioMinimo.estado(\''+full.Hash+'\',\''+UrlUniversal + 'cc48ef2bf47a8f91c6b6c0dac1c59f79'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "SalarioMinimo.estado(\''+full.Hash+'\',\''+UrlUniversal + 'cc48ef2bf47a8f91c6b6c0dac1c59f79'+'\',0)">'
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

                    if( full.PAR_GENERALES_SALARIO_MINIMO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSalarioMinimo(\''+full.Hash+'\',\''+UrlUniversal + '7219544f290202465b7b46ba7859c395'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#TableCiudades').css({'width':'100%'})
}

function TablaSalarioIntegral() {
    $DataTable_SalarioIntegral = $('#TableSalarioIntegral').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '969d78052d4d99fc2f006b7cc839cb7c',
            'data':function (d) {
                    d.search['value'] = $("#Salario_Integral_TextBusqueda").val();
                    d.search['Estadox'] = $("#Salario_Integral_Estado").val();
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
               data: 'Year',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentSIY_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Salario',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentSIS_'+full.Hash+'">' + data + '</span>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENERALES_SALARIO_INTEGRAL_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "SalarioIntegral.estado(\''+full.Hash+'\',\''+UrlUniversal + 'a1c0fd0f034c1da754d0df260f6ec314'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "SalarioIntegral.estado(\''+full.Hash+'\',\''+UrlUniversal + 'a1c0fd0f034c1da754d0df260f6ec314'+'\',0)">'
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

                    if( full.PAR_GENERALES_SALARIO_INTEGRAL_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataSalarioIntegral(\''+full.Hash+'\',\''+UrlUniversal + 'a2451a043a60906ecc5585d12e9e9417'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url":UrlGeneral +  "js/dataTable/Spanish.lang"
        },
    });
    $('#TableCiudades').css({'width':'100%'})
}

function TablaMonetizacionSena() {
    $DataTable_MonetizacionSena = $('#TableMonetizacionSena').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + 'e98252ea82fdf222ccbdc0b2c437a7f6',
            'data':function (d) {
                    d.search['value'] = $("#Monetizacion_Sena_TextBusqueda").val();
                    d.search['Estadox'] = $("#Monetizacion_Sena_Estado").val();
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
               data: 'Year',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentMSY_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Monetizacion',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentMSM_'+full.Hash+'">' + data + '</span>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENERALES_MONETIZACION_SENA_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "MonetizacionSena.estado(\''+full.Hash+'\',\''+UrlUniversal + '096e23fbd6989da0bcb89b90c0ea4523'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "MonetizacionSena.estado(\''+full.Hash+'\',\''+UrlUniversal + '096e23fbd6989da0bcb89b90c0ea4523'+'\',0)">'
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

                    if( full.PAR_GENERALES_MONETIZACION_SENA_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataMonetizacionSena(\''+full.Hash+'\',\''+UrlUniversal + '61da78447074452908c95a840cea17a0'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral +  "js/dataTable/Spanish.lang"
        },
    });
    $('#TableCiudades').css({'width':'100%'})
}

function TablaAuxilioTransporte() {
    $DataTable_AuxilioTransporte = $('#TableAuxilioTransporte').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + 'e9fc13910b60f7b0c225e8f1c0e8a4b3',
            'data':function (d) {
                    d.search['value'] = $("#Auxilio_Transporte_TextBusqueda").val();
                    d.search['Estadox'] = $("#Auxilio_Transporte_Estado").val();
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
               data: 'Year',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentATY_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Auxilio',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentATA_'+full.Hash+'">' + data + '</span>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "AuxilioTransporte.estado(\''+full.Hash+'\',\''+UrlUniversal + '0fcded35fd585d648c34cb2dfebd1816'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "AuxilioTransporte.estado(\''+full.Hash+'\',\''+UrlUniversal + '0fcded35fd585d648c34cb2dfebd1816'+'\',0)">'
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

                    if( full.PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataAuxilioTransporte(\''+full.Hash+'\',\''+UrlUniversal + 'f79fec29b03ac6dd82b3b127d0fefe7b'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": UrlGeneral +  "js/dataTable/Spanish.lang"
        },
    });
    $('#TableCiudades').css({'width':'100%'})
}

function CrearPais(Ruta){
    EventosAparturaModal()
    var html = "";
    
    TituloVentana = "Crear País"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input  autocomplete='off' type='text' class='form-control' id='ParPaisNombre' name='ParPaisNombre' placeholder='Nombre País' required />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisSiglasPais' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input  autocomplete='off' type='text' class='form-control' id='ParPaisSiglasPais' name='ParPaisSiglasPais' placeholder='Siglas País' required/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisMoneda' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Moneda País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input  autocomplete='off' type='text' class='form-control' id='ParPaisMoneda' name='ParPaisMoneda' placeholder='Nombre Moneda' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisSiglasMoneda' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas Moneda:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input  autocomplete='off' type='text' class='form-control' id='ParPaisSiglasMoneda' name='ParPaisSiglasMoneda' placeholder='Siglas Moneda' required/>";
                html += "</div>";
            html += "</div>";

        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);

}

function DataPais(Hash,Ruta){
    EventosAparturaModal()
    var html = "";
    

    TituloVentana = "Editar País"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<form class='form-signin FormEditarPais' id = 'FormEditarPais' action='javascript:void(0)' action='"+Ruta+"' method='post'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete = 'off' type='text' class='form-control' id='ParPaisNombre' value='"+$("._ContentP_"+Hash).text()+"' name='ParPaisNombre' placeholder='Nombre País' required />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisSiglasPais' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete = 'off' type='text' class='form-control' id='ParPaisSiglasPais' value='"+$("._ContentSP_"+Hash).text()+"' name='ParPaisSiglasPais' placeholder='Siglas País' required/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisMoneda' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Moneda País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete = 'off' type='text' class='form-control' id='ParPaisMoneda' value='"+$("._ContentM_"+Hash).text()+"' name='ParPaisMoneda' placeholder='Nombre Moneda' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPaisSiglasMoneda' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas Moneda:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete = 'off' type='text' class='form-control' id='ParPaisSiglasMoneda' value='"+$("._ContentSM_"+Hash).text()+"' name='ParPaisSiglasMoneda' placeholder='Siglas Moneda' required/>";
                html += "</div>";
            html += "</div>";

        html += "</form>";
    html += "</div>";
    html += "<div class='modal-footer'>";
            
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEdicionDataPais("+Hash+",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPais").validate({
        rules: {
            ParPaisSiglasMoneda : {
                required: true,
                minlength:3
            },
            ParPaisMoneda:{
                required: true,
                minlength:3
            },
            ParPaisSiglasPais:{
                required: true,
                minlength:3
            },
            ParPaisNombre:{
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

function GuardarEdicionDataPais(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPaisSiglasMoneda: $("#ParPaisSiglasMoneda").val(),
                ParPaisMoneda: $("#ParPaisMoneda").val(),
                ParPaisSiglasPais: $("#ParPaisSiglasPais").val(),
                ParPaisNombre: $("#ParPaisNombre").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarDataPais()
            }
        });
    }
}

function EstadoPais(Hash,Route,estado){
    $.ajax({
        type:'POST',
        url:Route,
        data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
        success:function(data){

           BuscarDataPais()
        }
    });
}

function CrearDepartamento(Ruta,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:'1',_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.Error != 1 ){
                alert = "alert-success";
                msj = "Tenemos Datos";
            }
            //Notificacion(msj,alert);
            EventosAparturaModal()
            var html = "";

            TituloVentana = "Crear Departamento"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<div class='modal-body'>";

                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParPaisDepto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Seleccione País:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'ParPaisDepto' id='ParPaisDepto' class='form-control form-control-lg' required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i]['Hash']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='ParNombreDepto'  name='ParNombreDepto' placeholder='Nombre Departamento' required />";
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

function DataDepto(Hash,Ruta){
    EventosAparturaModal()
    var html = "";

    TituloVentana = "Editar Departamento"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin FormEditarDepartamentoPais'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
            html += "<div class='form-group row'>";
                html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'>País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPais' readonly name='ParPais' value = '"+$("._ContentPN_"+Hash).text()+"' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' value = '"+$("._ContentDN_"+Hash).text()+"' id='ParNombreDepto'  name='ParNombreDepto' placeholder='Nombre Departamento' required />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEdicionDataDepartamentoPais(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarDepartamentoPais").validate({
        rules: {
            ParPais : {
                required: true,
                minlength:3
            },
            ParNombreDepto:{
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEdicionDataDepartamentoPais(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPais: $("#ParPais").val(),
                ParNombreDepto: $("#ParNombreDepto").val(),
            },
            success:function(data){
                EventosCierreModal()
                BuscarDataDepartamentoPais()
            }
        });
    }
}

function EstadoDeptos(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
        success:function(data){
            BuscarDataPais()
        }
    });
}

function EstadoCiudad(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
        success:function(data){
            BuscarDataCiudadDepartamentoPais()
        }
    });
}

function CrearCiudad(Ruta,Route,Route2){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:'1',_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.Error != 1 ){
                alert = "alert-success";
                msj = "Tenemos Datos";
            }else{
                Notificacion(msj,alert);
            }

            var html = "";
            EventosAparturaModal()

            TituloVentana = "Crear Ciudad"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<div class='modal-body'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParPaisList' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Seleccione País:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'ParPaisList' id='ParPaisList' onchange = 'ParListarDepartamentos(\""+Route2+"\")' class='form-control form-control-lg' required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i]['Hash']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParDeptoList' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Seleccione Departamento:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'ParDeptoList' id='ParDeptoList' class='form-control form-control-lg' required>";
                                html += "<option value = ''>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParNombreCiudad' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='ParNombreCiudad'  name='ParNombreCiudad' placeholder='Nombre Ciudad' required />";
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

function DataCiudad(Hash,Ruta){
    EventosAparturaModal()
    var html = "";

    TituloVentana = "Editar Ciudad"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin FormEditarCiudadDepartamentoPais'  action='"+Ruta+"' method='post'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
            html += "<div class='form-group row'>";
                html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'>País:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPais' readonly name='ParPais' value = '"+$("._ContentPN_"+Hash).text()+"' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'>Departamento:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDepartamento' readonly name='ParDepartamento' value = '"+$("._ContentDN_"+Hash).text()+"' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParNombreDepto' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' autocomplete = 'off' class='form-control' value = '"+$("._ContentCN_"+Hash).text()+"' id='ParNombreCiudad'  name='ParNombreCiudad' placeholder='Nombre Ciudad' required />";
                html += "</div>";
            html += "</div>";

        html += "</form>";
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEdicionDataDepartamentoPais(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
    html += "</div>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarCiudadDepartamentoPais").validate({
        rules: {
            ParPais : {
                required: true,
                minlength:3
            },
            ParDepartamento:{
                required: true,
                minlength:3
            },
            ParNombreCiudad:{
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEdicionDataDepartamentoPais(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPais: $("#ParPais").val(),
                ParDepartamento: $("#ParDepartamento").val(),
                ParNombreCiudad: $("#ParNombreCiudad").val(),
            },
            success:function(data){
                EventosCierreModal()
                BuscarDataCiudadDepartamentoPais()
            }
        });
    }
}

function ParListarDepartamentos(Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:$("#ParPaisList").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.Error != 1 ){
                alert = "alert-success";
                msj = "Tenemos Datos";
                var html = "";
                html += "<option value = ''>Seleccione</option>";
                for(var i = 0; i < data.Deptos.length;i++){
                  html += "<option value = '"+data.Deptos[i]['Hash']+"'>"+data.Deptos[i]['Nombre']+"</option>";
                }
                $("#ParDeptoList").html(html);
            }else{
                Notificacion(msj,alert);
            }
        }
    });
}

const SalarioMinimo = {
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)
        console.log(e.target);
        formdata.forEach(data => {
            console.log(data);
        })
        console.log(formdata);
        $.ajax({
            type:'POST',
            url:e.target.action,
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: formdata,
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarDataSalarioMinimo()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash, Route) {
        $.ajax({
            type:'POST',
            url:Route,
            data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
            success:function(data){
                BuscarDataSalarioMinimo()
            }
        });
    }
}

const SalarioIntegral = {
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)
        console.log(e.target);
        formdata.forEach(data => {
            console.log(data);
        })
        console.log(formdata);
        $.ajax({
            type:'POST',
            url:e.target.action,
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: formdata,
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarDataSalarioIntegral()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash, Route) {
        $.ajax({
            type:'POST',
            url:Route,
            data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
            success:function(data){
                BuscarDataSalarioIntegral()
            }
        });
    }
}

const MonetizacionSena = {
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)
        console.log(e.target);
        formdata.forEach(data => {
            console.log(data);
        })
        console.log(formdata);
        $.ajax({
            type:'POST',
            url:e.target.action,
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: formdata,
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarDataMonetizacionSena()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash, Route) {
        $.ajax({
            type:'POST',
            url:Route,
            data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
            success:function(data){
                BuscarDataMonetizacionSena()
            }
        });
    }
}

const AuxilioTransporte = {
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)
        console.log(e.target);
        formdata.forEach(data => {
            console.log(data);
        })
        console.log(formdata);
        $.ajax({
            type:'POST',
            url:e.target.action,
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: formdata,
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarDataAuxilioTransporte()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash, Route) {
        $.ajax({
            type:'POST',
            url:Route,
            data:{_token:document.getElementsByName('_token')[0].value,Hash:Hash},
            success:function(data){
                BuscarDataAuxilioTransporte()
            }
        });
    }
}

function CrearSalarioMinimo(Route) {
    EventosAparturaModal()
    var html = "";
    

    TituloVentana = "Crear Salario Mínimo"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin' onsubmit='SalarioMinimo.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear()
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSalario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Salario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='ParSalario' name='parSalario' placeholder='$000' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataSalarioMinimo(Hash, Route) {
    EventosAparturaModal()
    var html = "";
    

    TituloVentana = "Editar Salario Mínimo"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin' onsubmit='SalarioMinimo.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear(parseInt($("._ContentY_"+Hash).text()))
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSalario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Salario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='ParSalario' name='parSalario' value='"+$("._ContentS_"+Hash).text()+"' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function CrearSalarioIntegral(Route) {
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Nuevo Salario Integral"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='SalarioIntegral.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear()
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSalario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Salario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='ParSalario' name='parSalario' placeholder='$000' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataSalarioIntegral(Hash, Route) {
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Editar Salario Integral"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='SalarioIntegral.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear(parseInt($("._ContentSIY_"+Hash).text()))
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSalario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Salario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='ParSalario' name='parSalario' value='"+$("._ContentSIS_"+Hash).text()+"' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function CrearMonetizacionSena(Route) {
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Nueva Monetización Sena"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='MonetizacionSena.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear()
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parMonetizacion' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Monetizacion:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='ParMonetizacion' name='parMonetizacion' placeholder='$000' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataMonetizacionSena(Hash, Route) {
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Editar Monetización Sena"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='MonetizacionSena.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear(parseInt($("._ContentMSY_"+Hash).text()))
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parMonetizacion' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Monetizacion:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='parMonetizacion' name='parMonetizacion' value='"+$("._ContentMSM_"+Hash).text()+"' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function CrearAuxilioTransporte(Route) {
    EventosAparturaModal()
    var html = "";
    
    TituloVentana = "Crear Auxilio de Transporte"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='AuxilioTransporte.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";

            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear()
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parAuxilio' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Auxilio:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='parAuxilio' name='parAuxilio' placeholder='$000' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function DataAuxilioTransporte(Hash, Route) {
    EventosAparturaModal()
    var html = "";
    TituloVentana = "Editar Axulio de Transporte"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin' onsubmit='AuxilioTransporte.enviar(event)' action='"+Route+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parYear' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select name = 'parYear' id='parYear' class='form-control list-year' required>";
                        html += "<option selected>Seleccione</option>";
                        ListYear(parseInt($("._ContentATY_"+Hash).text()))
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parAuxilio' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Auxilio:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input autocomplete='off' type='text' class='form-control' id='parAuxilio' name='parAuxilio' value='"+$("._ContentATA_"+Hash).text()+"' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer '>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
}

function ListYear(selected = null) {
    $.ajax({
        type:'POST',
        url:UrlUniversal+'e0bdc3b8a5d5b551919c2667263d6989',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if (data.success) {
                let html = ''
                if (selected !== null) {
                    html += '<option value="" > Seleccione </option>'
                } else {
                    html += '<option value="" selected> Seleccione </option>'
                }
                data.years.forEach(year => {
                    if (selected !== null) {
                        console.log('not null');
                        if (selected === year) {
                            html += '<option value="'+year+'" selected> '+year+' </option>'
                        } else {
                            html += '<option value="'+year+'"> '+year+' </option>'

                        }
                    } else {
                        html += '<option value="'+year+'"> '+year+' </option>'
                    }
                });
                $('.list-year').html(html)
            }
        }
    });
}
