/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    TablaPersonalTD();
    TablaPersonalEps();
    TablaPersonalArl();
    TablaPersonalFC();
    TablaPersonalFP();
    TablaPersonalCC();
    TablaPersonalDL();
    TablaPersonalTR();
});

function BuscarTablaPersonalTD(){
    $DataTable_TiposDoc.destroy();
    $DataTable_TiposDoc.draw();
    TablaPersonalTD();
}
function BuscarTablaPersonalEps(){
    $DataTable_Eps.destroy();
    $DataTable_Eps.draw();
    TablaPersonalEps();
}
function BuscarTablaPersonalArl(){
    $DataTable_Arl.destroy();
    $DataTable_Arl.draw();
    TablaPersonalArl();
}
function BuscarTablaPersonalFC(){
    $DataTable_FC.destroy();
    $DataTable_FC.draw();
    TablaPersonalFC();
}
function BuscarTablaPersonalFP(){
    $DataTable_FP.destroy();
    $DataTable_FP.draw();
    TablaPersonalFP();
}
function BuscarTablaPersonalCC(){
    $DataTable_CC.destroy();
    $DataTable_CC.draw();
    TablaPersonalCC();
}
function BuscarTablaPersonalDL(){
    $DataTable_DL.destroy();
    $DataTable_DL.draw();
    TablaPersonalDL();
}
function BuscarTablaPersonalTR(){
    $DataTable_TR.destroy();
    $DataTable_TR.draw();
    TablaPersonalTR();
}

function TablaPersonalTR(){
    $DataTable_TR = $('#TablaPersonal_TR').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'c057421cf521e9751027594e78c2386e',
            'data':function (d) {
                    d.search['value'] = $("#TR_TextBusqueda").val();
                    d.search['Estadox'] = $("#TR_Estado").val();
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
                    return '<span class = "_ContentTRP_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_TIPOS_RETIRO_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTRPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'cf35acb23dec2f20017db10399fb54ff'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTRPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'cf35acb23dec2f20017db10399fb54ff'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_TIPOS_RETIRO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTR(\''+full.Hash+'\',\''+UrlUniversal + '1b2ae842bd512c60d7b37b358ccf322e'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_TR').css({'width':'100%'})
}

function TablaPersonalDL(){
    $DataTable_DL = $('#TablaPersonal_DL').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'b34638866bb8a3415d2aebd8c3d15096',
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
                    return '<span class = "_ContentDLP_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_DOCUMENTOS_LEGALES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDLPersonal(\''+full.Hash+'\',\''+UrlUniversal + '6b3db3f2961ddc12887a3e0280546226'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDLPersonal(\''+full.Hash+'\',\''+UrlUniversal + '6b3db3f2961ddc12887a3e0280546226'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_DOCUMENTOS_LEGALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDL(\''+full.Hash+'\',\''+UrlUniversal + '4b63a460bcf21a6aaac1df2adeb2996b'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_DL').css({'width':'100%'})
}

function TablaPersonalCC(){
    $DataTable_CC = $('#TablaPersonal_CC').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'7523ffd3246fe0ecf581bf6d3e6db8a0',
            'data':function (d) {
                    d.search['value'] = $("#CC_TextBusqueda").val();
                    d.search['Estadox'] = $("#CC_Estado").val();
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
                    return '<span class = "_ContentCCN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_CAJA_COMPENSACION_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoCCPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'fa1299c56df822894bce2f11c8be4b2f'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoCCPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'fa1299c56df822894bce2f11c8be4b2f'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_CAJA_COMPENSACION_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataCC(\''+full.Hash+'\',\''+UrlUniversal + '2f3fd7201b5630e9e6a136285325b75e'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_CC').css({'width':'100%'})
}

function TablaPersonalFP(){
    $DataTable_FP = $('#TablaPersonal_FP').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'ff638f7f3e06a9af155a71fbfe23055f',
            'data':function (d) {
                    d.search['value'] = $("#FP_TextBusqueda").val();
                    d.search['Estadox'] = $("#FP_Estado").val();
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
                    return '<span class = "_ContentFPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_FONDO_PENSIONES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoFPPersonal(\''+full.Hash+'\',\''+UrlUniversal + '01aa32e2435ae54db53ff1b66be244b6'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoFPPersonal(\''+full.Hash+'\',\''+UrlUniversal + '01aa32e2435ae54db53ff1b66be244b6'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_FONDO_PENSIONES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataFP(\''+full.Hash+'\',\''+UrlUniversal + '627415ff93045c4b1c0b5e1e038a1b12'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_FP').css({'width':'100%'})
}

function TablaPersonalFC(){
    $DataTable_FC = $('#TablaPersonal_FC').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'1a2555fa12b94ce9db2dcf1ea1d2db1f',
            'data':function (d) {
                    d.search['value'] = $("#FC_TextBusqueda").val();
                    d.search['Estadox'] = $("#FC_Estado").val();
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
                    return '<span class = "_ContentFCN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_FONDO_CESANTIAS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoFCPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'a97e143649de981448dfa56bb04d41c7'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoFCPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'a97e143649de981448dfa56bb04d41c7'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_FONDO_CESANTIAS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataFC(\''+full.Hash+'\',\''+UrlUniversal + 'ecb88e5e63baf8d10c3e4b943cbeaf07'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_FC').css({'width':'100%'})
}

function TablaPersonalArl(){
    $DataTable_Arl = $('#TablaPersonal_Arl').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'18831aff2cd46bd4ab6adb7b540f4aad',
            'data':function (d) {
                    d.search['value'] = $("#Arl_TextBusqueda").val();
                    d.search['Estadox'] = $("#Arl_Estado").val();
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
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_ARL_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoArlPersonal(\''+full.Hash+'\',\''+UrlUniversal + '5fd80a88f5ab827497337c55282713df'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoArlPersonal(\''+full.Hash+'\',\''+UrlUniversal + '5fd80a88f5ab827497337c55282713df'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_ARL_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataArl(\''+full.Hash+'\',\''+UrlUniversal + 'e00144035e3cc3e3c1c78305557c178e'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_Arl').css({'width':'100%'})
}

function TablaPersonalEps(){
    $DataTable_Eps = $('#TablaPersonal_Eps').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'b3b3ccad98d77bf5eae4db19237dd04d',
            'data':function (d) {
                    d.search['value'] = $("#Eps_TextBusqueda").val();
                    d.search['Estadox'] = $("#Eps_Estado").val();
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
                    return '<span class = "_ContentESEPS_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_EPS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoEpsPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'a0c4ff9b7a3d6412c916f9de819470f1'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoEpsPersonal(\''+full.Hash+'\',\''+UrlUniversal + 'a0c4ff9b7a3d6412c916f9de819470f1'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_EPS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataEps(\''+full.Hash+'\',\''+UrlUniversal + 'df5b7a480a6311d8e8e5655dc2c2e0fc'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_Eps').css({'width':'100%'})
}

function TablaPersonalTD(){
    $DataTable_TiposDoc = $('#TablaPersonal_TP').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'e7bf06d89ffbdb903846363dfd6d12bf',
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
                    return '<span class = "_ContentTDN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Siglas',
               "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentTDS_'+full.Hash+'">' + data + '</span></center>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PERSONAL_TIPOS_DOCUMENTOS_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoDocumentoPersona(\''+full.Hash+'\',\''+UrlUniversal + 'fbc2c89efd232118c7e578c3d8c579a6'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoDocumentoPersona(\''+full.Hash+'\',\''+UrlUniversal + 'fbc2c89efd232118c7e578c3d8c579a6'+'\',0)">'
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
                    
                    if( full.PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoDocumentoPersona(\''+full.Hash+'\',\''+UrlUniversal + '535d32192e24a684d729bc8fc8f797e4'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPersonal_TP').css({'width':'100%'})
}

function CrearTipoDocumento(Ruta){
    var html = "";
    TituloVentana = "Nuevo Tipo de Identificación"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoDocumento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo Documento:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoDocumento' name='ParTipoDocumento' placeholder='Tipo Documento' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSiglasDoc' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParSiglasDoc' name='ParSiglasDoc' placeholder='Siglas' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
}

function DataTipoDocumentoPersona(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Tipo de Identificación"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_TD'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoDocumento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo Documento:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoDocumento' value='"+$("._ContentTDN_"+Hash).text()+"' name='ParTipoDocumento' placeholder='Tipo Documento' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='ParSiglasDoc' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Siglas:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParSiglasDoc' value='"+$("._ContentTDS_"+Hash).text()+"' name='ParSiglasDoc' placeholder='Siglas' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_TD(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_TD").validate({
        rules: {
            ParTipoDocumento : {
                required: true,
                minlength:3
            },
            ParSiglasDoc : {
                required: true,
                minlength:2
            }
        }
    });
}

function GuardarEditarPersonal_TD(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoDocumento: $("#ParTipoDocumento").val(),
                ParSiglasDoc: $("#ParSiglasDoc").val(),
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalTD()
            }
        });
    }
}

function EstadoTipoDocumentoPersona(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalTD()
        }
    });
}

function CrearEps(Ruta){
    var html = "";
    TituloVentana = "Nueva Eps"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParEpsPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre EPS:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParEpsPersonal' name='ParEpsPersonal' placeholder='Nombre Eps' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
            html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
}

function EstadoEpsPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalEps()
        }
    });
}


function DataEps(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Eps"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_Eps'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParImpuestoEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre EPS:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParEpsPersonal' value='"+$("._ContentNEPS_"+Hash).text()+"' name='ParEpsPersonal' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_Eps(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_Eps").validate({
        rules: {
            ParEpsPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPersonal_Eps(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParEpsPersonal: $("#ParEpsPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalEps()
            }
        });
    }
}

function CrearArl(Ruta){
    var html = "";
    TituloVentana = "Nueva ARL"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
    html += "<div class='modal-body'>";
        
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParArlPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre ARL:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParArlPersonal' name='ParArlPersonal' placeholder='Nombre Arl' required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
            html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    
}

function DataArl(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar ARL"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body FormEditarPersonal_Arl'>";
        
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParArlPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Arl:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParArlPersonal' value='"+$("._ContentNARL_"+Hash).text()+"' name='ParArlPersonal' required autcomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_Arl(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarPersonal_Arl").validate({
        rules: {
            ParArlPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPersonal_Arl(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParArlPersonal: $("#ParArlPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalArl()
            }
        });
    }
}

function EstadoArlPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            
            BuscarTablaPersonalArl();
        }
    });
}

function CrearFC(Ruta){
    var html = "";
    TituloVentana = "Nuevo Fondo de Cesantías"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParFCPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Fondo Cesantías:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParFCPersonal' name='ParFCPersonal' placeholder='Nombre Fondo Cesantías' required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
            
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";
    
    $(".content_modal").html(html);
    
}

function DataFC(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Fondo de Cesantías"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_FC'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParFCPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Fondo Cesantías:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParFCPersonal' value='"+$("._ContentFCN_"+Hash).text()+"' name='ParFCPersonal'  required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_FC(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_FC").validate({
        rules: {
            ParFCPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPersonal_FC(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParFCPersonal: $("#ParFCPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalFC()
            }
        });
    }
}

function EstadoFCPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalFC()
        }
    });
}

function CrearFP(Ruta){
    var html = "";
    TituloVentana = "Nuevo Fondo de Pensiones"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_FP'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParFPPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Fondo de Pensiones:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParFPPersonal' name='ParFPPersonal' placeholder='Nombre Fondo Pensiones' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    
}

function DataFP(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Fondo de Pensiones"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_FP'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParFPPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Fondo Pensiones:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParFPPersonal' value='"+$("._ContentFPN_"+Hash).text()+"' name='ParFPPersonal' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_FP(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_FP").validate({
        rules: {
            ParFPPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPersonal_FP(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParFPPersonal: $("#ParFPPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalFP()
            }
        });
    }
}

function EstadoFPPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalFP()
        }
    });
}

function CrearCC(Ruta){
    var html = "";
    TituloVentana = "Nueva Caja de Compensación"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_CC'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParCCPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Caja de Compensación:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParCCPersonal' name='ParCCPersonal' placeholder='Nombre Caja Compensación' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary' >Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
}

function GuardarEditarPersonal_CC(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParCCPersonal: $("#ParCCPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalCC()
            }
        });
    }
}

function DataCC(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Caja de Compensación"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_CC'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParCCPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Caja de Compensación:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParCCPersonal' value='"+$("._ContentCCN_"+Hash).text()+"' name='ParCCPersonal' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_CC(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_CC").validate({
        rules: {
            ParCCPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function EstadoCCPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalCC()
        }
    });
}

function CrearDL(Ruta){
    var html = "";
    TituloVentana = "Nuevo Documento Empleado"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDLPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Documento Legal:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDLPersonal' name='ParDLPersonal' placeholder='Nombre Documento Legal' required autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    
}

function DataDL(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Documento Empleado"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_DL'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDLPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Documento Legal:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDLPersonal' value='"+$("._ContentDLP_"+Hash).text()+"' name='ParDLPersonal' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_DL(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarPersonal_DL").validate({
        rules: {
            ParDLPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPersonal_DL(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParDLPersonal: $("#ParDLPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalDL()
            }
        });
    }
}

function EstadoDLPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalDL()
        }
    });
}

function CrearTR(Ruta){
    var html = "";
    TituloVentana = "Nuevo Tipo de Retiro"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTRPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo Retiro:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTRPersonal' name='ParTRPersonal' placeholder='Tipo Retiro' required autocomplete = 'off' />";
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

function DataTR(Hash,Ruta){
    var html = "";
    TituloVentana = "Nuevo Tipo de Retiro"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPersonal_TR'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTRPersonal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo Retiro:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTRPersonal' value='"+$("._ContentTRP_"+Hash).text()+"' name='ParTRPersonal' required autocomplete = 'off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPersonal_TR(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarPersonal_TR").validate({
        rules: {
            ParTRPersonal : {
                required: true,
                minlength:3
            }
        }
    });
}

function EstadoTRPersonal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPersonalTR()
        }
    });
}

function GuardarEditarPersonal_TR(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTRPersonal: $("#ParTRPersonal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPersonalTR()
            }
        });
    }
}
