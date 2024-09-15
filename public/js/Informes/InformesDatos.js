/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
        
    //TablaRequiermientosCliente();
    //TablaHistoricoRequiermientosCliente();
    //TablaEvalRequiermientosCliente();
    
    
    
    if( $(".XCs").text() != '' ){
        //MostrarTabsMenu(4)
    }else{
        //MostrarTabsMenu(1)
    }
});

var DataEmpresas = [];
var DataClientes = [];
var DataProveedores = [];
var DataBancos = [];

const InformesData = {
    listEmpresasGeneral: function(){
      printDataAjax('bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa:null}, data => {
            let html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Empresa').html(html)
        })  
    },
    listDataEmpresas: function () {
        printDataAjax('a8ca9e5da9cb7960d1a5c32ba8594a88', {}, data => {
            DataEmpresas.push(data.Empresas);
        })
    },
    listUsuarios: function () {
        printDataAjax('b39e5b91733b7aaeef24379d85cc7840', {Hash:1}, data => {
            var html = '<option value="" selected>Seleccione</option>'
            data.Users.forEach(obj => {
                html += "<option value = '"+obj['IdUsuario']+"'>"+obj['NombreUsuario']+"</option>"
            });
            $('#Report_ListUsers').html(html)
            
        })
    },
} 

function Informes_Dashboard_Empresas(){
    var formData = new FormData();
    formData.append("Hash", 1 );
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'a8ca9e5da9cb7960d1a5c32ba8594a88',
        success:function(data){
            var html = ""
            


            TituloVentana = "Dashboard Empresas"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Consultar</th>"
                        html += "<th>Nombre Comercial</th>"
                        html += "<th>Nit</th>"
                        html += "<th>Representante Legal</th>"
                        html += "<th>Unidades de Negocio</th>"
                        html += "<th>Documentos Legales</th>"
                        html += "<th>Notas Legales</th>"
                        html += "<th>Redes Sociales</th>"
                    html += "</tr>"
                    var hx = "";
                    for(var i = 0; i < data.Empresas.length; i++){
                        hx += "<tr>"
                            hx += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            hx += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            hx += "<td >"+data.Empresas[i]['NombreComercial']+"</td>"
                            hx += "<td >"+data.Empresas[i]['Nit']+"</td>"
                            
                            var Alert = "";
                            var AlertCss = "";
                            
                            if( data.Empresas[i]['RepLegal'].length == 0 ){
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }else if( data.Empresas[i]['RepLegal'].length > 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }
                            hx += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Empresas[i]['RepLegal'].length+"</td>"
                            
                            if( data.Empresas[i]['Unidad'].length == 0 ){
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }else if( data.Empresas[i]['Unidad'].length > 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }
                            hx += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Empresas[i]['Unidad'].length+"</td>"
                            
                            if( data.Empresas[i]['DocsCargados'] == 0 ){
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }else if( data.Empresas[i]['DocsCargados'] > 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }
                            hx += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Empresas[i]['DocsCargados']+"</td>"
                            
                            if( data.Empresas[i]['NotasCargadas'] == 0 ){
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }else if( data.Empresas[i]['NotasCargadas'] > 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }
                            hx += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Empresas[i]['NotasCargadas']+"</td>"
                            
                            if( data.Empresas[i]['Redes'].length == 0 ){
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }else if( data.Empresas[i]['Redes'].length > 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }
                            hx += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Empresas[i]['Redes'].length+"</td>"
                            
                        hx += "</tr>"
                    }
                    html += hx;
                html += "</table>"
            html += "</div>";

            $(".content_modal").html(html);

            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
        }
    });        
}

function Buscar_Informes_Tablet_Dashboard_Clientes(){
    $DataTable_DashboardClientes.destroy();
    Informes_Tablet_Dashboard_Clientes();
}

function Informes_Tablet_Dashboard_Clientes(){
    $DataTable_DashboardClientes = $('#DashboardClientes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'6d591ec66ecb6055fa75556670259a18',
            'data':function (d) {
                d.search['value'] = $("#DBCLI_TextBusqueda").val();
                d.search['HashEmpresa'] = $("#OTC_Empresa").val();
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
                    return '<center>'+data+'</center>'
                }

           },
           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>'+data+'</center>'
                }

            },
            {
                data: 'NombreComercial',
                "render": function (data, type, full, meta) {
                     return data;
                 }

            },
           {
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'FechaCierreFacturacion',
                "render": function (data, type, full, meta) {
                    
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Telefono',
                "render": function (data, type, full, meta) {
                        return '' + data + '';
                    }

                },
            {
                data: 'CorreoFacturacionElectronica',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'DocsCargados',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Contratos',
                "render": function (data, type, full, meta) {
                        return '<center>' + data.length + '</center>';
                    }

            },
            {
                data: 'Contactos',
                "render": function (data, type, full, meta) {
                    return '<center>' + data.length + '</center>';
                }

            },
            {
                data: 'Profesionales',
                "render": function (data, type, full, meta) {
                    return '<center>' + data.length + '</center>';
                }

            },
            {
                data: 'Productos',
                "render": function (data, type, full, meta) {
                    return '<center>' + data.length + '</center>';
                }

            },
            {
                data: 'Negociaciones',
                "render": function (data, type, full, meta) {
                    return '<center> ' + data.length + '</center>';
                }

            },
            
        ],
        columnDefs: [ 
            {targets: 3,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '0' ) {
                      $(td).css('white-space', 'nowrap');
                    }
                }
            },
            {targets: 4,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '0' ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 5,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData.length == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 6,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '' ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 7,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '0' ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 8,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 9,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 10,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 11,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 12,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#DashboardClientes').css({'width':'100%'})
}

function Informes_Dashboard_Clientes(){
    var html = ""

    TituloVentana = "Dashboard Clientes"
    ImgVentana = "images/trafico_reportes_ListOt.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Empresa:</label>"
                html += "<select class = 'form-control' name = 'OTC_Empresa' id = 'OTC_Empresa'></select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DBCLI_TextBusqueda' name = 'DBCLI_TextBusqueda' />"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'Buscar_Informes_Tablet_Dashboard_Clientes()'/>"
            html += "</div>"
        html += "</div>"
        html += "<table class = 'tableNew responsive nowrap' id = 'DashboardClientes'>"
            html += "<thead>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Nombre Comercial</th>"
                    html += "<th>Nit</th>"
                    html += "<th>Fecha Cierre Facturación</th>"
                    html += "<th>Teléfono</th>"
                    html += "<th>Correo Facturación</th>"
                    html += "<th>Documentos Legales</th>"
                    html += "<th>Contratos</th>"
                    html += "<th>Contactos</th>"
                    html += "<th>Profesionales</th>"
                    html += "<th>Productos</th>"
                    html += "<th>Negociaciones</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";

    $(".content_modal").html(html);

    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');   
    InformesData.listEmpresasGeneral()
    Informes_Tablet_Dashboard_Clientes();
}


function Informes_Dashboard_Proveedores(){
    //
    var html = ""
    

    TituloVentana = "Dashboard Proveedores"
    ImgVentana = "images/trafico_reportes_ListOt.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Empresa:</label>"
                html += "<select class = 'form-control' name = 'OTC_Empresa' id = 'OTC_Empresa'></select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DBPROV_TextBusqueda' name = 'DBPROV_TextBusqueda' />"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'Buscar_Informes_Tablet_Dashboard_Proveedor()'/>"
            html += "</div>"
        html += "</div>"
        html += "<table class = 'tableNew' id = 'DashboardProveedores'>"
            html += "<thead>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Nombre Comercial</th>"
                    html += "<th>Nit</th>"
                    html += "<th>Teléfono</th>"
                    html += "<th>Documentos Legales</th>"
                    html += "<th>Contactos</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";

    $(".content_modal").html(html);

    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');    
    InformesData.listEmpresasGeneral()
    Informes_Tablet_Dashboard_Proveedor();
}

function Buscar_Informes_Tablet_Dashboard_Proveedor(){
    $DataTable_DashboardProveedores.destroy();
    Informes_Tablet_Dashboard_Proveedor();
}

function Informes_Tablet_Dashboard_Proveedor(){
    $DataTable_DashboardProveedores = $('#DashboardProveedores').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'bdb43afd435b7a757301eced09df532d',
            'data':function (d) {
                d.search['value'] = $("#DBPROV_TextBusqueda").val();
                d.search['HashEmpresa'] = $("#OTC_Empresa").val();
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
                    return '<center>'+data+'</center>'
                }

           },
           {
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>'+data+'</center>'
                }

            },
            {
                data: 'NombreComercial',
                "render": function (data, type, full, meta) {
                     return data;
                 }

            },
           {
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return data;
                }

            },
            
            {
                data: 'Telefono',
                "render": function (data, type, full, meta) {
                        return '' + data + '';
                    }

            },
            
            {
                data: 'DocsCargados',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            
            {
                data: 'Contactos',
                "render": function (data, type, full, meta) {
                    return '<center>' + data.length + '</center>';
                }

            },
            
        ],
        columnDefs: [ 
            {targets: 3,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '0' ) {
                      $(td).css('white-space', 'nowrap');
                    }
                }
            },
            {targets: 4,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '0' ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 5,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == 0 ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
            {targets: 6,
                createdCell: function (td, cellData, rowData, row, col) {
                    if ( cellData == '' ) {
                      $(td).css('background-color', '#d43b3b');
                      $(td).css('color', 'white');
                      $(td).css('font-weight', 'bold');
                      $(td).css('text-decoration');
                    }
                }
            },
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#DashboardProveedores').css({'width':'100%'})
}

function Informes_Dashboard_Bancos(){
    //
    var html = ""
    

    TituloVentana = "Dashboard Bancos"
    ImgVentana = "images/trafico_reportes_ListOt.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Banco:</label>"
                html += "<select class = 'form-control' name = 'pr' id = 'OTC_Empresa'></select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DBPROV_TextBusqueda' name = 'DBPROV_TextBusqueda' onkeypress = 'Buscar_Informes_Tablet_Dashboard_Proveedor()' />"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'Buscar_Informes_Tablet_Dashboard_Proveedor()'/>"
            html += "</div>"
        html += "</div>"
        html += "<table class = 'tableNew' id = 'DashboardProveedores'>"
            html += "<thead>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Nombre Comercial</th>"
                    html += "<th>Nit</th>"
                    html += "<th>Teléfono</th>"
                    html += "<th>Documentos Legales</th>"
                    html += "<th>Contactos</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";

    $(".content_modal").html(html);

    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');    
    InformesData.listEmpresasGeneral()
    Informes_Tablet_Dashboard_Proveedor();
}