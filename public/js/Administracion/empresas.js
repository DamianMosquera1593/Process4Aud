/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("InfoEmpresas")
});

/*
---------------------- Eventos iniciar submenu ------------------------ //

*/
var EmpresaName = "";

function administracionLegalEmpresa(Hash, Hash2){

    var html  = "";
    TituloVentana = "Datos Generales"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    var formData = new FormData();
    formData.append("Hash", Hash);
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url:UrlGeneral+'befd9feb01c8dd7733bbb50450e4a144',
        success:function(data){
            mostrarSubmenu(1, data, Hash, Hash2)
        }
    })
}

function administracionUnidadesNegocioEmpresa(Hash, Hash2){

    var html  = "";
    TituloVentana = "Unidades de Negocio"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )

    var formData = new FormData();
    formData.append("Hash", Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'bd538bd8f381d024c4c9ad76acd24002',
            success:function(data){
                mostrarSubmenu(2, data, Hash, Hash2)
            }
        })
}

function administracionClientesEmpresa(Hash, Hash2){

    var html  = "";
    TituloVentana = "Clientes"
    ImgVentana = "images/menu/CLIENTES_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )

    var formData = new FormData();
    formData.append("Hash", Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'9d2691da3b2061acff08a851d30d32a4',
            success:function(data){
                mostrarSubmenu(3, data, Hash, Hash2)
            }
        })
}

function administracionProveedoresEmpresa(Hash, Hash2){

    var html  = "";
    TituloVentana = "Proveedores"
    ImgVentana = "images/menu/PROVEEDORES_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
        var formData = new FormData();
        formData.append("Hash", Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'53312c8a2ba4174f697f050078e1fac0',
            success:function(data){
                mostrarSubmenu(4, data, Hash, Hash2)
            }
        })
}



function mostrarSubmenu(submenu, data, Hash, Hash2) {
    EmpresaName = data.Empresa.NombreComercial;
    switch (submenu) {
        case 1: //Legal
            data = {
                submenu : 'Legal '+data.Empresa.NombreComercial,
                subitems: [
                    {
                        nombre: 'Legal',
                        permiso: data.ADMINISTRACION_EMPRESAS_LEGAL_INFORMACION,
                        imagen: UrlGeneral+'images/administracion_informaciongeneral.png',
                        render: 'renderModalInfoLegal'
                    },
                    {
                        nombre: 'Documentos Legales',
                        permiso: data.ADMINISTRACION_EMPRESAS_LEGAL_DOCUMENTOS,
                        imagen: UrlGeneral+'images/administracion_documentos.png',
                        render: 'renderModalDocLegal'
                    },
                    {
                        nombre: 'Tarifas e Impuestos',
                        permiso: data.ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS,
                        imagen: UrlGeneral+'images/administracion_documentos.png',
                        render: 'renderModalTarifasLegal'
                    }
                ],
                Hash: data.Empresa.Hash,
                Hash2
            }
            renderSubmenu(data)
            break;
        case 2: //unidades de negocio
            data = {
                submenu : 'Unidades De Negocio '+data.Empresa.NombreComercial,
                subitems: [
                    {
                        nombre: 'Unidades de Negocio',
                        permiso: data.ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO,
                        imagen: UrlGeneral+'images/administracion_estructuranegocio.png',
                        render: 'renderModalUnidadesNegocio'
                    },
                    {
                        nombre: 'Plan de Negocios Clientes',
                        permiso: data.ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO,
                        imagen: UrlGeneral+'images/administracion_plannegocio.png',
                        render: 'renderModalPlanNegocioCliente'
                    },
                    
                ],
                Hash: data.Empresa.Hash,
                Hash2
            }
            renderSubmenu(data)
            break;
        case 3: //clientes
            data = {
                submenu : 'Clientes '+data.Empresa.NombreComercial,
                subitems: [
                    {
                        nombre: 'Información General',
                        permiso: data.ADMINISTRACION_EMPRESAS_CLIENTES_LEGAL,
                        imagen: UrlGeneral+'images/administracion_legal.png',
                        render: 'renderModalInformacionGeneralClientes'
                    },
                    {
                        nombre: 'Documentos y Contratos',
                        permiso: data.ADMINISTRACION_EMPRESAS_CLIENTES_DOCUMENTOS,
                        imagen: UrlGeneral+'images/administracion_documentos.png',
                        render: 'renderModalDocumentosClientes'
                    },
                    {
                        nombre: 'Contactos',
                        permiso: data.ADMINISTRACION_EMPRESAS_CLIENTES_CONTACTOS,
                        imagen: UrlGeneral+'images/administracion_contactos.png',
                        render: 'renderModalContactosClientes'
                    },
                    {
                        nombre: 'Negociaciones',
                        permiso: data.ADMINISTRACION_EMPRESAS_CLIENTES_NEGOCIACIONES,
                        imagen: UrlGeneral+'images/admnistracion_negociaciones.png',
                        render: 'renderModalNegociacionesCliente'
                    },
                    
                ],
                Hash: data.Empresa.Hash,
                Hash2
            }
            renderSubmenu(data)
            break;
        case 4: //proveedores
            data = {
                submenu : 'Proveedores '+data.Empresa.NombreComercial,
                subitems: [
                    {
                        nombre: 'Información General',
                        permiso: data.ADMINISTRACION_EMPRESAS_PROVEEDORES_LEGAL,
                        imagen: UrlGeneral+'images/administracion_legal.png',
                        render: 'renderModalInformacionGeneralProveedores'
                    },
                    {
                        nombre: 'Documentos y Contratos',
                        permiso: data.ADMINISTRACION_EMPRESAS_PROVEEDORES_DOCUMENTOS,
                        imagen: UrlGeneral+'images/administracion_documentos.png',
                        render: 'renderModalDocumentosProveedores'
                    },
                    {
                        nombre: 'Contactos',
                        permiso: data.ADMINISTRACION_EMPRESAS_PROVEEDORES_CONTACTOS,
                        imagen: UrlGeneral+'images/administracion_contactos.png',
                        render: 'renderModalContactosProveedor'
                    },
                    
                ],
                Hash: data.Empresa.Hash,
                Hash2
            }
            renderSubmenu(data)
            break;
        default:
            console.log('');
            break;
    }
}

function renderSubmenu(items) {
    console.log(items)
    panelSubMenu = $('#panelHeadSubMenu').attr('data-submenu');
    if (panelSubMenu!=='undefined') {
        if (panelSubMenu === items.submenu) {
            if (!$('#panelHeadSubMenu').hasClass('invisible')) {
                //$('.SubMenu').addClass('invisible')
                //$('#panelHeadSubMenu').attr('data-submenu', items.submenu);
                return;
            }
        }
    }

    //$('.SubMenu').removeClass('invisible')
    //$('#nameSubMenu').text(items.submenu);
    html = '<div class="row">'
    items.subitems.forEach(item => {
        if (item.permiso) {
            html += '<div class="col text-center" onclick="'+item.render+'(\''+items.Hash+'\',\''+items.Hash2+'\')" >'
                html += '<h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">'+item.nombre+'</h5>'
                html += '<img src="'+item.imagen+'" alt="imagen" height = "80px"/>'
            html += '</div>'
        }
    });
    html += '</div><hr>'
    $('#panelHeadSubMenu').attr('data-submenu', items.submenu);
    
    $('.SubMenu').html(html)
    return;

}

/*
--------------------------------  render modals legal --------------------- //
*/
function renderModalInfoLegal(Hash, Hash2) {
    html = ''
    $.ajax({
        type:'POST',
        url:UrlGeneral+'3441d5e80a28e31e28e05d5dbbaf9fea',
        data:{Hash:Hash, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            if( data.Empresa.Logo == null ){
                urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa2+data.Empresa.Hash+"/"+data.Empresa.Logo
            }
            
            html += "<div class='ContenedorSeccionesForm'>";

                html += "<div class = 'ContenedorSeccionesForm'>";
                    html += "<p class = 'TitulosSecciones'>General</p>"
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParNit'><span class = 'Obligatorio'>(*)</span> Nit:</label>"
                            html += "<input type='text' id = 'ParNit' name = 'ParNit' class='form-control' value = '"+data.Empresa['Nit']+"' autocomplete = 'off' required readonly>";
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParNombreComercial' col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial'  value = '"+data.Empresa['NombreComercial']+"' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNombreLegal'><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>"
                            html += "<input type='text' class='form-control ' id='ParNombreLegal' name='ParNombreLegal'  value = '"+data.Empresa['NombreLegal']+"' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParPais' col-form-label'><span class = 'Obligatorio'>(*)</span> País:</label>"
                            html += "<input type='text' class='form-control ' id='ParPais' name='ParPais' placeholder='Pais' value = '"+data.Empresa['Pais']+"' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParDepartamento' col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>"
                            html += "<input type='text' class='form-control ' id='ParDepartamento' name='ParDepartamento' placeholder='Departamento' value = '"+data.Empresa['Departamento']+"' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParCiudad' col-form-label'><span class = 'Obligatorio'>(*)</span> Ciudad:</label>"
                            html += "<input type='text' class='form-control ' id='ParCiudad' name='ParCiudad' placeholder='Ciudad' value = '"+data.Empresa['Ciudad']+"' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-4'>";
                            html += "<label for='ParDireccion' col-form-label'>Dirección:</label>"
                            html += "<input type='text' class='form-control ' id='ParDireccion' name='ParDireccion' value = '"+data.Empresa['Direccion']+"' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParFechaConstitucion' col-form-label'>Fecha Constitución:</label>"
                            html += "<input type='date' class='DatePicker form-control ' id='ParFechaConstitucion' name='ParFechaConstitucion' value = '"+data.Empresa['FechaConstitucion']+"' readonly/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParCorreoContacto'>Correo Contacto:</label>"
                            html += "<input type='text' id = 'ParCorreoContacto' name = 'ParCorreoContacto' class='form-control '  value = '"+data.Empresa['CorreoContacto']+"'autocomplete = 'off' readonly>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";

                html += "<br>";
                html += "<div class = 'ContenedorSeccionesForm'>";
                    html += "<p class = 'TitulosSecciones'>Información Representante Legal</p>"
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-6 representante-l'>";
                            html += "<label >Representante Legal:</label>"
                            if( data.RL.length == 0 ){
                                html += "<input type='text' class='form-control my-3 ' placeholder='Correo Contacto' value = 'No se ha ingresado Información' readonly>";
                            }else{
                                html += "<div class='form-row my-3 col-sm-12' id='RContent'>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
                                        html += "<input type='text' class='form-control ' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' value = '"+data.RL[0]['Nombre']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParTipoDocumentoRL' col-form-label'>Tipo Documento:</label>"
                                        html += "<select name = 'ParTipoDocumentoRL' id='ParTipoDocumentoRL' class='form-control ' disabled >";
                                            html += "<option value = ''>Seleccione</option>";
                                            for(var i = 0; i < data.TipoDocumento.length;i++){
                                                if(data.RL[0]['IdTipoDocumento'] == data.TipoDocumento[i]['Id']){
                                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"' selected>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                                }
                                            }
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNroDocumentoRL' col-form-label'>Nro Documento:</label>"
                                        html += "<input type='text' class='form-control ' id='ParNroDocumentoRL' name='ParNroDocumentoRL' placeholder='Número Documento' value = '"+data.RL[0]['NroDocumento']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParCelularRL' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control ' id='ParCelularRL' name='ParCelularRL' placeholder='Celular' value = '"+data.RL[0]['Celular']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-12 my-2'>";
                                        html += "<label for='ParCorreoRL' col-form-label'>Correo:</label>"
                                        html += "<input type='text' class='form-control ' id='ParCorreoRL' name='ParCorreoRL' placeholder='Correo' value = '"+data.RL[0]['Correo']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                html += "</div>";
                            }
                        html += "</div>";
                        html += "<br>"
                        html += "<p class = 'TitulosSecciones'>Información Suplente Representante Legal</p>"
                        html += "<div class='col col-sm-6 representante-s'>";
                            html += "<label >Suplente Representante Legal:</label>"
                            if( data.RS.length == 0 ){
                                html += "<input type='text' class='form-control my-3' placeholder='Correo Contacto' value = 'No se ha ingresado Información' readonly>";
                            }else{
                                html += "<div class='form-row my-3 col-sm-12' id='RSContent'>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNombreRS' col-form-label'>Nombre:</label>"
                                        html += "<input type='text' class='form-control ' id='ParNombreRS' name='ParNombreRS' placeholder='Nombre' value = '"+data.RS[0]['Nombre']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParTipoDocumentoRS' col-form-label'>Tipo Documento:</label>"
                                        html += "<select name = 'ParTipoDocumentoRS' id='ParTipoDocumentoRS' class='form-control ' disabled>";
                                            html += "<option value = ''>Seleccione</option>";
                                            for(var i = 0; i < data.TipoDocumento.length;i++){
                                                if(data.RS[0]['IdTipoDocumento'] == data.TipoDocumento[i]['Id']){
                                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"' selected>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                                }
                                            }
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNroDocumentoRS' col-form-label'>Nro Documento:</label>"
                                        html += "<input type='text' class='form-control ' id='ParNroDocumentoRS' name='ParNroDocumentoRS' placeholder='Número Documento' value = '"+data.RS[0]['NroDocumento']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParCelularRS' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control ' id='ParCelularRS' name='ParCelularRS' placeholder='Celular' value = '"+data.RS[0]['Celular']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-12 my-2'>";
                                        html += "<label for='ParCorreoRS' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control ' id='ParCorreoRS' name='ParCorreoRS' placeholder='Correo' value = '"+data.RS[0]['Correo']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                html += "</div>";
                            }
                        html += "</div>";
                        html += "</div>";

                    html += "</div>";

                    html += "<br>"
                    html += "<div class = 'ContenedorSeccionesForm'>";
                        html += "<p class = 'TitulosSecciones'>Redes Sociales</p>"
                        html += "<div class='form-row my-2'>";
                            if( data.Social.length == 0 ){
                                html += "<div class='CenterText my-2' style='text-align:center;'>";
                                    html += "<label ><b>No se han registrado redes sociales.</b></label>"
                                html+="</div>"
                            }else{
                                html += "<table width = '100%'>";
                                    html += "<tr>";
                                    for(var i = 0; i < data.Social.length; i++){
                                        if (data.Social[i]['Link'] !== '') {
                                            html += "<td class='CenterText'>";
                                                html += "<a target='_blank' href='"+data.Social[i]['Link']+"'>";
                                                    html += "<i  class = 'IconSize-xl Cursor "+data.Social[i]['Icono']+"'></i>";
                                                html += "</a>";
                                            html += "</td>";
                                        }
                                    }
                                    html += "</tr>";
                                html += "</table>";
                            }
                        html += "</div>";
                    html += "</div>";

                    /*
                    html += "<div class='form-row my-2'>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParPaginaWeb' > Pagina Web </label>";
                            html += `<input type='text' class='form-control ' id='ParPaginaWeb' value='${data.Social.length ? data.Social[0]['Link'] : ''}' name='ParPaginaWeb' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParFacebook'> Facebook:</label>";
                            html += `<input type='text' class='form-control' id='ParFacebook' value='${data.Social.length ? data.Social[1]['Link'] : ''}' name='ParFacebook' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParTwitter' > Twitter:</label>";
                            html += `<input type='text' class='form-control ' id='ParTwitter' value='${data.Social.length ? data.Social[2]['Link'] : ''}' name='ParTwitter' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParInstagram'> Instagram:</label>";
                            html += `<input type='text' class='form-control ' id='ParInstagram' value='${data.Social.length ? data.Social[3]['Link'] : ''}' name='ParInstagram' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                    html += "</div>";
                    */

                    html += "<br>";
                    html += "<div class = 'ContenedorSeccionesForm'>";
                        html += "<p class = 'TitulosSecciones'>Notas Legales</p>"
                    
                        html += "<div class = 'form-row my-3'>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaIR' col-form-label'>Nota Informes de Reuniónx:</label>"
                                html += "<textarea class = 'form-control ' rows = '5' id = 'ParNotaIR' name = 'ParNotaIR' readonly>"+data.NotaIR[0]['Nota']+"</textarea>";
                                
                            html += "</div>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaPpto' col-form-label'>Nota Presupuesto:</label>"
                                html += "<textarea class = 'form-control ' rows = '5'id = 'ParNotaPpto' name = 'ParNotaPpto'  readonly>"+data.NotaPpto[0]['Nota']+"</textarea>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-row my-3'>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaAnticipo' col-form-label'>Nota Anticipo:</label>"
                                html += "<textarea class = 'form-control ' rows = '5'id = 'ParNotaAnticipo' name = 'ParNotaAnticipo'readonly>"+data.NotaAnticipo[0]['Nota']+"</textarea>";
                            html += "</div>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaLegalizacion' col-form-label'>Nota Legalización:</label>"
                                html += "<textarea class = 'form-control ' rows = '5'id = 'ParNotaLegalizacion' name = 'ParNotaLegalizacion' readonly>"+data.NotaLegalizacion[0]['Nota']+"</textarea>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-row my-3'>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaOP' col-form-label'>Nota Orden de Producción:</label>"
                                html += "<textarea class = 'form-control ' rows = '5'id = 'ParNotaOP' name = 'ParNotaOP'  readonly>"+data.NotaOP[0]['Nota']+"</textarea>";
                            html += "</div>";
                            html += "<div class='col col-sm-6'>";
                                html += "<label for='ParNotaOC' col-form-label'>Nota Orden de Compra:</label>"
                                html += "<textarea class = 'form-control ' rows = '5'id = 'ParNotaOC' name = 'ParNotaOC' readonly>"+data.NotaOC[0]['Nota']+"</textarea>";
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<br>"
                    html += "<div class = 'ContenedorSeccionesForm'>";
                        html += "<p class = 'TitulosSecciones'>Institucional</p>"
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParMision' col-form-label'>Misión:</label>"
                        html += "<textarea class = 'form-control ' id = 'ParMision' name = 'ParMision' readonly>"+data.Empresa['Mision']+"</textarea>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParVision' col-form-label'>Visión:</label>"
                        html += "<textarea class = 'form-control ' id = 'ParVision' name = 'ParVision' readonly>"+data.Empresa['Vision']+"</textarea>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParObjetivos' col-form-label'>Objetivos:</label>"
                        html += "<textarea class = 'form-control ' id = 'ParObjetivos' name = 'ParObjetivos' readonly>"+data.Empresa['Objetivos']+"</textarea>";
                html += "</<div>";
            html += '</div>'
            $(".ContentSubMenuAdmin").html(html);
        }
    });
}

function renderModalDocLegal(Hash, Hash2) {
    $.ajax({
        type:'POST',
        url: UrlGeneral+'2cea7c9610a2d44beed0d03e71247db9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa2+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            
            html += "<div class='FormsGeneral'>";
            if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA.length > 0 ){
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Tipo de Documento:</label>"
                        html += "<select class = 'form-control border rounded' name = 'IdTipoDocumento' id = 'IdTipoDocumento' >";
                            html += "<option value = '0' selected>Documentos Vigentes</option>"
                            for(var i = 0; i < data.Lista.length; i++){
                                html += "<option value = '"+data.Lista[i]['Hash']+"'>"+data.Lista[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input type = 'text' class = 'form-control border rounded' id = 'TextBusqueda' name = 'TextBusqueda' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='"+UrlGeneral+"images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosEmpresa()'/>"
                    html += "</div>"
                html += "</div><br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosLegales"+Hash+"' id = 'DocumentosLegales"+Hash+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nombre Documento</th>"
                            html += "<th>Fecha Vencimiento</th>"
                            html += "<th>Notificar A</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Estado</th>"
                            html += "<th>Descargar</th>"
                        html += "</tr>"
                        //html += "<tr><th><p></p></th></tr>"
                    html += "</thead>"
                    html += "</table></div>";
            }
            html += "</div>";

            $(".ContentSubMenuAdmin").html(html);
            ResizeModal(0.9)
            $DataTable = $('#DocumentosLegales'+Hash).DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                scrollY: ResizePagTable(0.60),
                'ajax': {
                    'url':UrlGeneral+'1f5df208a260e3a371f121915a958498',
                    'data':function (d) {
                            d.search['value'] = SearchTable;
                            d.search['TipoDocumento'] = $("#IdTipoDocumento").val();
                            return $.extend({}, d, {
                                'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
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
                        data: 'TipoDocumento',
                        "render": function (data, type, full, meta) {
                            return '<span class = "TipoDoc'+full.id+' TipoDoc'+full.Hash+'">' + data + '</span>';
                        }

                    },
                    {
                        data: 'fechavencimiento',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'fechavencimiento',
                        "render": function (data, type, full, meta) {

                            return '<center><img src = "'+UrlGeneral+'images/VER1_ICONO.png" class = "OptionIcon" onclick = "MostrarNotificadosDocumentos(\''+Hash+'\',\''+Hash2+'\',\''+full.id+'\')"/></center>';
                        }
                    },
                    { data: 'nombreusuario' },
                    {
                        data: 'fechahora',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data + '</center>';
                        }
                    },
                    {
                        data: 'NombreEstado',
                        "render": function (data, type, full, meta) {
                            return '<center>' + data +'</center>';
                        }
                    },
                    {
                        data: 'nombrearchivo',
                        "render": function (data, type, full, meta) {
                            var htmlx = '';
                            htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../../storage/app/datos/empresas/'+full.Hash+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                                htmlx += '<img src ="'+UrlGeneral+'images/descarga.png" class = "OptionIcon"/>'
                            htmlx += '</a></center>';
                            return htmlx;
                        }
                    },
                ],
                "order": [[7, "asc"],[6, "desc"]],
               
                "language": {
                    "url": UrlGeneral+"js/dataTable/Spanish.lang"
                },
            });
        }
    })

}

function renderModalTarifasLegal(Hash, Hash2) {
    html = ''
    $.ajax({
        type:'POST',
        url: UrlGeneral+'2cea7c9610a2d44beed0d03e71247db9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa2+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            
            html += "<div class='FormsGeneral'>";
            if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='TI_IdTipoDocumento' col-form-label'>Tipo de Tarifa / Impuesto:</label>"
                        html += "<select class = 'form-control border rounded TI_IdTipoDocumento' name = 'TI_IdTipoDocumento' id = 'TI_IdTipoDocumento' >";
                            html += "<option value = '0' selected>Tarifas Vigentes</option>"
                            for(var i = 0; i < data.Lista2.length; i++){
                                html += "<option value = '"+data.Lista2[i]['Hash']+"'>"+data.Lista2[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='TI_TextBusqueda'>Texto:</label>"
                        html += "<input type = 'text' class = 'form-control border rounded TI_TextBusqueda ' id = 'TI_TextBusqueda' name = 'TI_TextBusqueda' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='"+UrlGeneral+"images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTIEmpresa("+Hash+",\""+Hash2+"\")'/>"
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
                $(".ContentSubMenuAdmin").html(html);
                //ResizeModal(0.9)
                TablaTIEmpresa(Hash,Hash2)
            }
        }
    })
}

function renderModalUnidadesNegocio(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'56d1bf7e94fe8a2f989557644aa30ab9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = UrlGeneral+"images/administracion_documentos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa2+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            
            html += "<div class=' FormsGeneral'>";

                if( data.INFORMACION_EMPRESA_UND_CONSULTAR.length > 0 ){
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                            html += "<select class = 'form-control' name = 'UND_Estado' id = 'UND_Estado' >";
                                html += "<option value = '-1' >Todos</option>"
                                html += "<option value = '1' selected>Activas</option>"
                                html += "<option value = '0' >Inactivas</option>"
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='IdTipoDoc'>Texto:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Und_TextBusqueda' name = 'Und_TextBusqueda' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaEmpresaUnidadesNegocio("+Hash+",\""+Hash2+"\")'/>"
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable UnidadesNegocio"+Hash+"' id = 'UnidadesNegocio"+Hash+"'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Mínimo Rentabilidad</th>"
                                html += "<th>Descripción</th>"
                                html += "<th>Cargado Por</th>"
                                html += "<th>Cargado El</th>"
                                html += "<th>Estado</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table></div>";
                }
            html += "</div>";

            $(".ContentSubMenuAdmin").html(html);
            Datos_TablaEmpresa_UnidadesNegocio(Hash,Hash2)
        }
    });
}

function BuscarTablaEmpresaUnidadesNegocio(Hash,Hash2){
    $DataTable_Empresa_UND.destroy();
    Datos_TablaEmpresa_UnidadesNegocio(Hash,Hash2)
}

function Datos_TablaEmpresa_UnidadesNegocio(Hash,Hash2){
    $DataTable_Empresa_UND = $("#UnidadesNegocio"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'b42147e1fa637c7e83a5dc9e152d7795',
            'data':function (d) {
                    d.search['value'] = $("#Und_TextBusqueda").val();
                    d.search['Estado'] = $("#UND_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
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
               data: 'nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "Und_name'+full.id+' Und_name'+full.Hash+'">' + data + '</span>';
                }

            },
            {
               data: 'Porcentaje',
               "render": function (data, type, full, meta) {
                    return '<center>' + data +' %</center>';
                }

            },
            {
                data: 'descripcion',
                "render": function (data, type, full, meta) {
                    return '' + data + '';
                }
            },
           
           { data: 'nombreusuario' },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data +'</center>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.estado == 1 ){
                        hx += '<center >'
                            hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }else{
                        hx += '<center >'
                            hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#UnidadesNegocio'+Hash).css({'width':'100%'})
}

function MostrarNotificadosDocumentos(Hash,Hash2,H){
    myModal(1)
    $.ajax({
        type:'POST',
        url: UrlGeneral+'69eb1f4a446576ab13051b377ba246ca',
        data:{Hash:H,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Notificados "+ $(".NameComercial"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body NotificadosDoc"+H+"'>";
                html += "<p>A continuación, se listan las personas correspondientes.</p><table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Tipo</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Lista.length; i++){
                        html += "<tr class = 'NotificadoDoc"+data.Lista[i]['Id']+"'>"
                            html += "<td class = 'CenterText'>"+data.Lista[i]['Num']+"</td>"
                            if( data.Lista[i]['Tipo'] == 'INTERNO' ){
                                html += "<td>Interno</td>"
                                html += "<td>"+data.Lista[i]['NombreUsuario']+"</td>"
                                html += "<td>"+data.Lista[i]['Correo']+"</td>"
                            }else{
                                html += "<td>Externo</td>"
                                html += "<td>"+data.Lista[i]['NombreExterno']+"</td>"
                                html += "<td>"+data.Lista[i]['CorreoExterno']+"</td>"
                            }
                        html += "</tr>"
                    }
                html += "</table >"
            html += "</div>";

            $(".content_modal3").html(html)
            ResizeModal(0.4)
            //$("#myModal").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function BuscarTIEmpresa(Hash,Hash2){

    SearchTable_TI = $("#TI_TextBusqueda").val()
    $DataTable_TI_Empresa.destroy();
    //$DataTable_TI_Empresa.draw();
    TablaTIEmpresa(Hash,Hash2);
}

function TablaTIEmpresa(Hash,Hash2){
    $DataTable_TI_Empresa = $('#TI'+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'0593d1d809053eac602093d18fe0abe6',
            'data':function (d) {
                    d.search['value'] = $("#TI_TextBusqueda").val();
                    d.search['TipoDocumento'] = $("#TI_IdTipoDocumento").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
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
               data: 'TipoDocumento',
               "render": function (data, type, full, meta) {
                    return '<span class = "TipoDocTI'+full.id+' TipoDocTI'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'fechavencimiento',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'Tipo',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
               data: 'valor',
               "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.Tipo == 'VALOR' ){
                        ht += "<table width = '100%'>"
                            ht += "<tr>"
                                ht += "<td style = 'width:10%;text-align:center;border:0px;'>$</td>"
                                ht += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data)+"</td>"
                            ht += "</tr>"
                        ht+= "</table>"
                    }else{
                        ht += "<table width = '100%'>"
                            ht += "<tr>"
                                ht += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data)+"</td>"
                                ht += "<td style = 'width:10%;text-align:center;border:0px;'>%</td>"
                            ht += "</tr>"
                        ht+= "</table>"
                    }

                    return ht;
                }
           },

           {
                data: 'fechavencimiento',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {

                    return '<center><img src = "'+UrlGeneral+'images/VER1_ICONO.png" class = "OptionIcon" onclick = "MostrarNotificadosTI(\''+Hash+'\',\''+Hash2+'\',\''+full.id+'\')"/></center>';
                }
            },
           { data: 'nombreusuario' },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data +'</center>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.estado == 1 ){
                        hx = '<center> Activo </center>';
                    }else{
                        hx = '<center> Inactivo </center>'
                    }
                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        
        "language": {
            "url": UrlGeneral+"js/dataTable/Spanish.lang"
        },
    });
    $('#TI'+Hash).css({'width':'100%'})
}

function MostrarNotificadosTI(Hash,Hash2,H){
    myModal(1)
    $.ajax({
        type:'POST',
        url: UrlGeneral+'fd625194724a0f13f6605de2581df425',
        data:{Hash:H,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Notificados "+ $(".NameComercial"+Hash).text() +"<BR>" +$(".TipoDocTI"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body NotificadosDoc"+H+"'>";
                html += "<p>A continuación, se listas los usuarios correspondientes.</p><table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Tipo</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Lista.length; i++){
                        html += "<tr class = 'NotificadoDoc"+data.Lista[i]['Id']+"'>"
                            html += "<td class = 'CenterText'>"+data.Lista[i]['Num']+"</td>"
                            if( data.Lista[i]['Tipo'] == 'INTERNO' ){
                                html += "<td>Interno</td>"
                                html += "<td>"+data.Lista[i]['NombreUsuario']+"</td>"
                                html += "<td>"+data.Lista[i]['Correo']+"</td>"
                            }else{
                                html += "<td>Externo</td>"
                                html += "<td>"+data.Lista[i]['NombreExterno']+"</td>"
                                html += "<td>"+data.Lista[i]['CorreoExterno']+"</td>"
                            }
                        html += "</tr>"
                    }
                html += "</table >"
            html += "</div>";

            $(".content_modal3").html(html)
            ResizeModal(0.4)
        }
    });
}

function BuscarDocumentosEmpresa(){
    SearchTable = $("#TextBusqueda").val();
    $DataTable.draw();
    DataTableModel()
}

function Datos_TablaUnidadPlanNegocio(Hash,Hash2){
    $DataTable_UnidadPlanNegocio = $("#PlanNegocio"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'189b9126f1be9a4d44de477d06dd3adf',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_PN").val();
                    d.search['Estado'] = $("#Estado_PN").val();
                    d.search['Cliente'] = $("#Cliente_PN").val();
                    return $.extend({}, d, {
                        'Hash':$("#Unidad_PN").val(),'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },
        "initComplete":function( settings, json){
            var t = json.Total;
            if( t == null ){
                t = 0;
            }
            $("#ValorTotalPlan").text(formatNumber.new(t))
            
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
               data: 'Anio',
               "render": function (data, type, full, meta) {
                    return '<center class = AnioPn'+full.Hash+'">' + data + '</center>';
                }

            },
            {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span class = "ClientePn'+full.Hash+'">' + data +'</span>';
                }

            },
            {
               data: 'Valor',
               "render": function (data, type, full, meta) {
                    return HtmlValores_Simple(data);
                }

            },
            { data: 'nombreusuario' },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data +'</center>';
                }
           },
            {
                data: 'Hash',
                "render": function (data, type, full, meta) {
                    return '<Center ><img src = "../images/VER1_ICONO.png" class = "OptionIcon" data-toggle="modal" onclick = "ConsultarPlanNegociosUnidad(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')" data-target="#ModalEdit2"></Center>';
                }
            },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.estado == 1 ){
                        hx += '<center >'
                            hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }else{
                        hx += '<center >'
                            hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#PlanNegocio'+Hash).css({'width':'100%'})
}

function ConsultarPlanNegociosUnidad(Id,Hash,HashEmpresa,Hash2){
    ModalEdit(0)
    $.ajax({
        type:'POST',
        url:UrlGeneral+'cb33fe7061135946bcd302775fd26d17',
        data:{Hash:Id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Consultar Plan de Negocios"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormPlanNegocio"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Año:</label>"
                        html += "<select disabled name = 'YearId' id = 'YearId' class = 'form-control' required>"
                            html += "<option value = '"+data.Datos[0]['Anio']+"' selected >"+data.Datos[0]['Anio']+"</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Cliente:</label>"
                        html += "<select disabled name = 'ClienteId' id = 'ClienteId' class = 'form-control' required>"
                            html += "<option value = '"+data.Datos[0]['NombreComercial']+"' selected >"+data.Datos[0]['NombreComercial']+"</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Estado:</label>"
                        html += "<select disabled name = 'EstadoPN' id = 'EstadoPN' class = 'form-control ValorMesesPptado' required>"
                            if( data.Datos[0]['Estado'] == 1 ){
                                html += "<option value = '1' selected >Activo</option>"
                                html += "<option value = '0'  >Inactivo</option>"
                            }else{
                                html += "<option value = '1'  >Activo</option>"
                                html += "<option value = '0'  selected>Inactivo</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                var x = 0;
                for( var i = 0; i < data.Datos[0]['Mes'].length; i++ ){
                    if( x == 0 || x < 0){
                        html += "<div class = 'form-row'>";
                        console.log("<div class = 'form-row'>")
                    }
                    
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  "+Meses(data.Datos[0]['Mes'][i]['Mes'])+":</label>"
                        
                        html += "<table class = 'ValTableInput form-control' width = '100%'>"
                            html += "<tr>"
                                html += "<td style = 'border:0px;'>$</td>"
                                html += "<td style = 'width:100%;border:0px;'>"+formatNumber.new((data.Datos[0]['Mes'][i]['Pptado']))+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                    if( x == 2 ){
                        html += "</div>"
                        x = 0;
                    }else{
                        x++
                    }
                    
                }
                
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                //html += "<button type='button' class='btn btn-primary btn_PlanNegocio HidenInformation' onclick = 'GuardarEdPlanNegocioUnidad(\""+Id+"\",\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            ResizeModal(0.65)
            
        }
    });
}

function Administracion_ListarClientePlanNegocio(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'9a105ef457238a72377bebe110004082',
        data:{Hash:$("#Unidad_PN").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '0' selected>Todos</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['NombreComercial']+"</option>"
            } 
            $("#Cliente_PN").html(html)
        }
    })
}

function renderModalPlanNegocioCliente(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'eb1fe1549c1280a128be51d45b20f7bc',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            html += "<div class=' FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                        html += "<select class = 'form-control' name = 'Unidad_PN' id = 'Unidad_PN' onchange = 'Administracion_ListarClientePlanNegocio()'>";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Unidad.length; i++){
                                html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                        html += "<select class = 'form-control' name = 'Cliente_PN' id = 'Cliente_PN'>";
                            html += "<option value = '0' >Todos</option>"
                            
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                        html += "<select class = 'form-control' name = 'Estado_PN' id = 'Estado_PN'>";
                            html += "<option value = '1' selected >Activo</option>"
                            html += "<option value = '0' >Inactivo</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_PN' name = 'TextBusqueda_PN' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTablaPN(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>"
                        html += "<label for='IdTipoDoc'></label>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class='FirstText Cursor' style='border:0px;font-size:16px;color:#1B4075;font-weight: bold;'>Valor Total Plan de Negocio</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'>$</td>"
                                html += "<td class='FirstText Cursor' style='border:0px;text-align:right;widht:10%;font-size:16px;color:#1B4075;font-weight: bold;'id = 'ValorTotalPlan'>0</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable PlanNegocio"+Hash+"' id = 'PlanNegocio"+Hash+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Año</th>"
                            html += "<th>Cliente</th>"
                            html += "<th>Presupuestado Año</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Consultar</th>"
                            html += "<th>Estado</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table></div>";
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            Datos_TablaUnidadPlanNegocio(Hash,Hash2)
        }
    });
}

function BuscarDatosTablaPN(Hash,Hash2){
    $DataTable_UnidadPlanNegocio.destroy();
    Datos_TablaUnidadPlanNegocio(Hash,Hash2)
}

function renderModalInformacionGeneralClientes(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'eb1fe1549c1280a128be51d45b20f7bc',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class=' FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                        html += "<select class = 'form-control' name = 'Unidad_CLI' id = 'Unidad_CLI' >";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Unidad.length; i++){
                                html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                        html += "<select class = 'form-control' name = 'Estado_CLI' id = 'Estado_CLI'>";
                            html += "<option value = '1' selected >Activo</option>"
                            html += "<option value = '0' >Inactivo</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_CLI' name = 'TextBusqueda_CLI' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionGeneralCliente(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ClientesInformacion"+Hash+"' id = 'ClientesInformacion"+Hash+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th nowrap>Nit</th>"
                            html += "<th>Nombre Comercial</th>"
                            html += "<th>Nombre Legal</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Información Legal</th>"
                            html += "<th>Estado</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table></div>";
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            Datos_TablaInformacionClientes(Hash,Hash2)
        }
    });
}

function BuscarInformacionGeneralCliente(Hash,Hash2){
    $DataTable_Cliente_DocumentosLegales.draw();
}

function Datos_TablaInformacionClientes(Hash,Hash2){
    $DataTable_Cliente_DocumentosLegales = $("#ClientesInformacion"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'0dede4f86fda346ea24df290c5c2231d',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_CLI").val();
                    d.search['Estado'] = $("#Estado_CLI").val();
                    d.search['Unidad'] = $("#Unidad_CLI").val();
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
                    return '<center>' + data + '</center>';
                }
           },
           {
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span >' + data +'</span>';
                }

            },
            {
               data: 'NombreLegal',
               "render": function (data, type, full, meta) {
                    return '<span >' + data +'</span>';
                }

            },
            { data: 'nombreusuario' },

           {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data +'</center>';
                }
           },
            {
                data: 'Hash',
                "render": function (data, type, full, meta) {
                    return '<Center ><img src = "../images/VER1_ICONO.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2" onclick = "Administracion_InformacionLegalCliente(\''+full.Hash+'\', \''+full.Hash2+'\', \''+UrlUniversal + 'eb6c344f43227116eb925eb701ea5ebe'+'\')"></Center>';
                }
            },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.Estado == 1 ){
                        hx += '<center >'
                            hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }else{
                        hx += '<center >'
                            hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#ClientesInformacion'+Hash).css({'width':'100%'})
}

function Administracion_InformacionLegalCliente(Hash, Hash2, RutaEdit) {
    let Ruta = 'ee74fed5f15671ca6a4e0e8483829abd'
    //ModalEdit(1)
    $.ajax({
        type: 'POST',
        url: UrlGeneral+ Ruta,
        data: {Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            let editar = "";
            
            var html = "";
            
            TituloVentana = "Información Legal Cliente"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin FormDatosInformacionLegalCliente' onsubmit='sendForm(event, buscarTablaClientes)' action='"+RutaEdit+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.Cliente[0].Hash + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' >Nit:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Nit+"' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreComercial'>Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].NombreComercial+"' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreLegal' >Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].NombreLegal+"' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' >País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i].IdPais+"' "+(data.Cliente[0].IdPais===data.Paises[i].IdPais ? 'selected' : '')+">"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' >Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    html += "<option value = '"+data.Departamento[i].IdDepartamento+"' "+(data.Cliente[0].IdDepto===data.Departamento[i].IdDepartamento ? 'selected' : '')+">"+data.Departamento[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' >Ciudad:</label>";
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Ciudad.length;i++){
                                    html += "<option value = '"+data.Ciudad[i].IdCiudad+"' "+(data.Cliente[0].IdCiudad===data.Ciudad[i].IdCiudad ? 'selected' : '')+">"+data.Ciudad[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParTelefono' >Telefono:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Telefono+"' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' >Dirección:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Direccion+"' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";

                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParFechaCierreFacturacion' >Fecha Cierre de Facturacion:</label>";
                            html += "<input type='number' class='form-control' value='"+data.Cliente[0].FechaCierreFacturacion+"' id='ParFechaCierreFacturacion' name='ParFechaCierreFacturacion' placeholder='0' min='0' max='31' autocomplete = 'off' readonly/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<label for='empresas' aria-describedby='empresas'>Empresas relacionadas:</label>";
                    html += "<small id='empresas' class='form-text text-muted'>"
                        html+= "Se debe seleccionar almenos una empresa, y se debe indicar sus iniciales de minimo 3 caracteres y maximo 5, solo se permiten letras."
                    html += "</small>"
                    html += "<div class='form-row my-3'>";
                        data.Empresas.forEach((empresa) => {
                            let printHtml = false
                            data.EmpresasAsoc.forEach((asoc) => {
                                if (asoc.HashEmpresa===empresa.HashEmpresa) {
                                    html += "<div class='col-sm-4 my-2'>";
                                        html += "<div class='form-check'>"
                                            html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' checked disabled>"
                                            html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                                html += empresa.NombreLegal
                                            html += "</label>"
                                        html += "</div>"
                                    html += "</div>"
                                    html += "<div class='col-sm-6 my-2'>";
                                        html += "<input type='text' onkeyup='validacionIndice(this)' value='"+asoc.Indice+"' class='form-control text-uppercase' id='ParEmpresaIniciales"+empresa.HashEmpresa+"' name='ParEmpresasIniciales["+empresa.HashEmpresa+"]' placeholder='Iniciales' pattern='[a-zA-Z]{3,5}' autocomplete = 'off' readonly/>";
                                    html += "</div>"
                                    printHtml = true
                                    return;
                                }
                            })
                            if (!printHtml) {
                                html += "<div class='col-sm-4 my-2 check-empresas d-none'>";
                                    html += "<div class='form-check'>"
                                        html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' disabled>"
                                        html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                            html += empresa.NombreLegal
                                        html += "</label>"
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='col-sm-6 my-2 check-empresas d-none'>";
                                    html += "<input type='text' onkeyup='validacionIndice(this)' class='form-control text-uppercase' id='ParEmpresaIniciales"+empresa.HashEmpresa+"' name='ParEmpresasIniciales["+empresa.HashEmpresa+"]' placeholder='Iniciales' pattern='[a-zA-Z]{3,5}' autocomplete = 'off' readonly/>";
                                html += "</div>"
                            }
                        });
                    html += "</div>";
                html += "<div class='modal-footer FooterInfoLegalCliente' style = 'display:none;'>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";
            $(".content_modal2").html(html);
            
        }
    })
}

function Administracion_ListarClientesUnidadNegocioPermiso(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'786e0b8dbfd6d4384502a3f03b017a77',
        data:{Hash2:$("#Unidad_DLC").val(),Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '0' selected>Todos</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['Nombre']+"</option>"
            } 
            $("#Cliente_DLC").html(html)
        }
    })
}

function Administracion_ListarClientesUnidadNegocioPermiso2(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'786e0b8dbfd6d4384502a3f03b017a77',
        data:{Hash2:$("#Unidad_CLC").val(),Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '0' selected>Todos</option>"
            for(var i = 0; i < data.Cliente.length; i++){
                html += "<option value = '"+data.Cliente[i]['Hash']+"'>"+data.Cliente[i]['Nombre']+"</option>"
            } 
            $("#Cliente_CLC").html(html)
        }
    })
}

function renderModalDocumentosClientes(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'4172138ad41ab08d69ed4e7a4308d670',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //76a9105e3c897358d4792237514bed12
            var html = "";
            html += "<div class=' FormsGeneral'>";
                
                html += "<div id = 'pest'>";
                    html += "<ul >";
                        html += "<li onclick = 'MostrarTabsMenu(1);BuscarDocumentosLegalesCliente("+Hash+")' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            html += "<a href = '#pest-1'><span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(2);' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            
                            html += "<a href = '#pest-2'><span>Contratos</span></a>"
                        html +="</li>";
                    html += "</ul>"
                    html += "<div id = 'pest-1'class = 'ChildTabsMenu TabsMenu1'>";
                    
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                                html += "<select class = 'form-control' name = 'Unidad_DLC' id = 'Unidad_DLC' onchange = 'Administracion_ListarClientesUnidadNegocioPermiso(\""+Hash+"\")'>";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.Unidad.length; i++){
                                        html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                                html += "<select class = 'form-control' name = 'Cliente_DLC' id = 'Cliente_DLC' >";
                                    html += "<option value = '0' >Todos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Tipos de Documento:</label>"
                                html += "<select class = 'form-control' name = 'TipoDocumento_DLC' id = 'TipoDocumento_DLC' >";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.TipoDocumento.length; i++){
                                        html += "<option value = '"+data.TipoDocumento[i]['Hash']+"'>"+data.TipoDocumento[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos' name = 'TextBusquedaDocumentos' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosLegalesCliente("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocumentosLegalesCliente"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Nit</th>"
                                    html += "<th>Nombre Comercial Cliente</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                    
                    html += "<div id = 'pest-2'class = 'ChildTabsMenu TabsMenu2'>";
                        
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                                html += "<select class = 'form-control' name = 'Unidad_CLC' id = 'Unidad_CLC' onchange = 'Administracion_ListarClientesUnidadNegocioPermiso2(\""+Hash+"\")'>";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.Unidad.length; i++){
                                        html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                                html += "<select class = 'form-control' name = 'Cliente_CLC' id = 'Cliente_CLC' >";
                                    html += "<option value = '0' >Todos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Tipos de Contrato:</label>"
                                html += "<select class = 'form-control' name = 'TipoContrato_DLC' id = 'TipoContrato_DLC' >";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.TiposContrato.length; i++){
                                        html += "<option value = '"+data.TiposContrato[i]['Hash']+"'>"+data.TiposContrato[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos_Contrato' name = 'TextBusquedaDocumentos_Contrato' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarContratosCliente("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'ContratosClientes"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Nit</th>"
                                    html += "<th>Nombre Comercial</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Nombre Contrato</th>"
                                    html += "<th>Fecha Firma</th>"
                                    html += "<th>Fecha Vencimiento</th>"
                                    html += "<th>Valor</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                html += "</div>"
            
            html += "</div>";

            $(".ContentSubMenuAdmin").html(html);
            $("#pest").tabs()
            Administracion_TablaDocumentosLegalesClientes(Hash)
            Administracion_TablaContratosClientes(Hash)
        }
    });
}

function BuscarDocumentosLegalesCliente(Hash){
    $DataTable_Cliente_DocumentosLegales.draw();
}

function BuscarContratosCliente(Hash){
    $DataTable_Cliente_Contratos.draw();
}

function Administracion_TablaDocumentosLegalesClientes(Hash){
    $DataTable_Cliente_DocumentosLegales =  $("#DocumentosLegalesCliente"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'6248598e4416d3cf26af83c9e57226a1',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentos").val();
                    d.search['Unidad'] = $("#Unidad_DLC").val();
                    d.search['Cliente'] = $("#Cliente_DLC").val();
                    d.search['TipoDocumento'] = $("#TipoDocumento_DLC").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'TipoDocumento',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'fechahora',
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../../storage/app/datos/Clientes/'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocumentosLegalesCliente'+Hash).css({'width':'100%'})
}

function Administracion_TablaContratosClientes(Hash){
    $DataTable_Cliente_Contratos =  $("#ContratosClientes"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'19c1201e33144097f0c49ac02e809358',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentos_Contrato").val();
                    d.search['Unidad'] = $("#Unidad_CLC").val();
                    d.search['Cliente'] = $("#Cliente_CLC").val();
                    d.search['TipoDocumento'] = $("#TipoContrato_DLC").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'TipoContrato',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           
           {
               data: 'FechaFirma',
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
           {
               data: 'FechaVencimiento',
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'Valor',
               "render": function (data, type, full, meta) {
                    return '<span>' + HtmlValores_Simple(data)+ '</span>';
                }

            },
           {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'fechahora',
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../../storage/app/datos/Clientes/CONTRATO_'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocumentosLegalesCliente'+Hash).css({'width':'100%'})
}

function renderModalContactosClientes(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'4172138ad41ab08d69ed4e7a4308d670',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class=' FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                        html += "<select class = 'form-control' name = 'Unidad_CLC' id = 'Unidad_CLC' onchange = 'Administracion_ListarClientesUnidadNegocioPermiso2(\""+Hash+"\")'>";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Unidad.length; i++){
                                html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                        html += "<select class = 'form-control' name = 'Cliente_CLC' id = 'Cliente_CLC' >";
                            html += "<option value = '0' >Todos</option>"
                        html += "</select>"
                    html += "</div>"
                    
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_PN' name = 'TextBusqueda_PN' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'lupaDatosContactosCliente(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'>"
                    html += "<table class='dataTable tableNew ContactosCliente' id='ContactosCliente'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nit</th>"
                                html += "<th>Nombre Comercial</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Cargo</th>"
                                html += "<th>Celular</th>"
                                html += "<th>Telefono</th>"
                                html += "<th>Correo</th>"
                                html += "<th>Horario</th>"
                                html += "<th>Dia</th>"
                                html += "<th>Mes</th>"
                                html += "<th>Estado</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>"
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            
            Administracion_TablaContactosClientes(Hash,Hash2)
        }
    });
}

function lupaDatosContactosCliente(Hash,Hash2){
    $DataTable.draw();
}

function Administracion_TablaContactosClientes(Hash){
    $DataTable = $('#ContactosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'d17d33cb38dbdddf8d1672bcfc6c816a',
            'data':function (d) {
                d.search['value'] = $("#TextBusqueda_PN").val();
                d.search['Unidad'] = $("#Unidad_CLC").val();
                d.search['Cliente'] = $("#Cliente_CLC").val();
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
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: 'Nit',
                "render": function (data, type, full, meta) {
                    return '<span >' + (data===null ? '' : data) + '</span>';
                }

            },
            {
                data: 'NombreComercial',
                "render": function (data, type, full, meta) {
                    return '<span class = "TipoDoc'+full.id+'">' + (data===null ? '---' : data) + '</span>';
                }

            },
            {
                data: 'Nombre',
                "render": function (data, type, full, meta) {
                    return '<span class = "TipoDoc'+full.id+'">' + (data===null ? '---' : data) + '</span>';
                }

            },
            {
                data: 'Cargo',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) + '</span>';
                }
            },
            {
                data: 'Celular',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) + '</span>';
                }
            },
            {
                data: 'Telefono',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'Correo',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'Horario',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'Dia',
                "render": function (data, type, full, meta) {
                    return '<center>' + (data===null ? '' : data) +'</center>';
                }
            },
            {
                data: 'Mes',
                "render": function (data, type, full, meta) {
                    return '<center>' + (data===null ? '' : data) +'</center>';
                }
            },
            {
                data: 'NombreEstado',
                "render": function (data, type, full, meta) {
                    var ht = ''
                    if( data == 'Activo' ){
                        ht += '<img src ="../images/activo.png"  class = "OptionIcon" />'

                    }else{
                        ht += '<img src ="../images/inactivo.png"  class = "OptionIcon" />'
                    }
                     return '<center>' + ht +'</center>';
                 }
            },
            
        ],
        "order": [[7, "asc"],[6, "desc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    })
}

function renderModalNegociacionesCliente(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'4172138ad41ab08d69ed4e7a4308d670',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class=' FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Unidad:</label>"
                        html += "<select class = 'form-control' name = 'Unidad_CLC' id = 'Unidad_CLC' onchange = 'Administracion_ListarClientesUnidadNegocioPermiso2(\""+Hash+"\")'>";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Unidad.length; i++){
                                html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                        html += "<select class = 'form-control' name = 'Cliente_CLC' id = 'Cliente_CLC' >";
                            html += "<option value = '0' >Todos</option>"
                        html += "</select>"
                    html += "</div>"
                    
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda_PN' name = 'TextBusqueda_PN' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'lupaDatosNegociacionesCliente(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable NegociacionesClientes' id = 'NegociacionesClientes'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Empresa</th>"
                            html += "<th>Unidad</th>"
                            html += "<th>Cliente</th>"
                            html += "<th>Régimen</th>"
                            html += "<th>¿Autoretenedor?</th>"
                            html += "<th>Tipo de Comisión</th>"
                            html += "<th>Valor</th>"
                            html += "<th>Pago A</th>"
                            html += "<th>Registrada Por</th>"
                            html += "<th>Registrada El</th>"
                            html += "<th>Estado</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "</table>"
                html += "</div>"
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            Administracion_TablNegociacionesCliente(Hash)
        }
    });
}

function lupaDatosNegociacionesCliente(Hash,Hash2){
    $DataTable_Cliente_Negociaciones.draw();
}

function Administracion_TablNegociacionesCliente(Hash){
    $DataTable_Cliente_Negociaciones = $("#NegociacionesClientes").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'feeccf469cb92abd3ab470e35365d75c',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_PN").val();
                    d.search['Unidad'] = $("#Unidad_CLC").val();
                    d.search['Cliente'] = $("#Cliente_CLC").val();
                    d.search['Emp'] = Hash;
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
               data: 'Regimen',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'Autoretenedor',
               "render": function (data, type, full, meta) {
                    if ( data == 1 ){
                        return '<center>Si</center>';
                    }else{
                       return '<center>No</center>'; 
                    }
                    
                }
            },
            {
               data: 'Comision',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Porcentaje',
               "render": function (data, type, full, meta) {
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'Dias',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'fechahora',
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
                    if( full.Estado == 1 ){
                            htmlx += '<span >'
                            htmlx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                        }else{
                            htmlx += '<span >'
                            htmlx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                        }
                    
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
        
    });
    $('#NegociacionesClientes'+Hash).css({'width':'100%'})
}

function renderModalInformacionGeneralProveedores(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'eb1fe1549c1280a128be51d45b20f7bc',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class='FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                        html += "<select class = 'form-control' name = 'C_Estado' id = 'C_Estado'>";
                            html += "<option value = '1' selected >Activo</option>"
                            html += "<option value = '0' >Inactivo</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'C_TextBusqueda' name = 'C_TextBusqueda' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionGeneralCliente(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable Proveedores' id = 'Proveedores'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nit</th>"
                            html += "<th>Nombre Comercial</th>"
                            html += "<th>Nombre Legal</th>"
                            html += "<th>Actividades</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Información Legal</th>"
                            html += "<th>Estado</th>"
                        html += "</tr>"
                    html += "</thead>"
                html += "</table></div>";
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            Administracion_TablaProveedor(Hash)
        }
    });
}

function Administracion_TablaProveedor(Hash){
    var Hash2 = document.getElementsByName('_token')[0].value;
    $DataTable_Proveedores = $('#Proveedores').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'8e351738adac64135f2102e43cb467d4',
            'data':function (d) {
                    d.search['value'] = $("#C_TextBusqueda").val();
                    d.search['Estadox'] = $("#C_Estado").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
                data: 'Nit',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentDN_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'NombreLegal',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Actividad',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'fechahora',
               "render": function (data, type, full, meta) {
                    
                    return '<center>' + data+ '</center>';
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var ht = '';
                        ht += '<img src = "../images/VER1_ICONO.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2" onclick = "Administracion_InformacionLegalProveedor(\''+full.Hash+'\', \''+Hash2+'\', \''+UrlUniversal + 'eb6c344f43227116eb925eb701ea5ebe'+'\')"/>'
                        return '<center>'+ht+'</center>'
                }

            },
            
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.Estado == 1 ){
                            hx += '<span >'
                                hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                        }else{
                            hx += '<span >'
                                hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                        }

                    hx += '</span>'

                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            }
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    });
    $('#Proveedores').css({'width':'100%'})
}

function Administracion_InformacionLegalProveedor(Hash, Hash2, RutaEdit) {
    let Ruta = 'a0422a096a5a6ae243bee945ea959be6'
    ModalEdit(0);
    $.ajax({
        type: 'POST',
        url: UrlGeneral+ Ruta,
        data: {Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            let editar = "";
            
            var html = "";
            TituloVentana = "Ínformación Legal Proveedor"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin FormDatosInformacionLegalProveedor' action='"+RutaEdit+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.Proveedor[0].Hash + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' >Nit:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Nit+"' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreComercial'>Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].NombreComercial+"' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreLegal' >Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].NombreLegal+"' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' >País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i].IdPais+"' "+(data.Proveedor[0].IdPais===data.Paises[i].IdPais ? 'selected' : '')+">"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' >Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    html += "<option value = '"+data.Departamento[i].IdDepartamento+"' "+(data.Proveedor[0].IdDepto===data.Departamento[i].IdDepartamento ? 'selected' : '')+">"+data.Departamento[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' >Ciudad:</label>";
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Ciudad.length;i++){
                                    html += "<option value = '"+data.Ciudad[i].IdCiudad+"' "+(data.Proveedor[0].IdCiudad===data.Ciudad[i].IdCiudad ? 'selected' : '')+">"+data.Ciudad[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParTelefono' >Telefono:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Telefono+"' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' >Dirección:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Direccion+"' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";

                    html += "<label for='empresas' aria-describedby='empresas'>Empresas relacionadas:</label>";
                    html += "<small id='empresas' class='form-text text-muted'>"
                        html+= "Se debe seleccionar almenos una empresa."
                    html += "</small>"
                    html += "<div class='form-row my-3'>";
                        data.Empresas.forEach((empresa) => {
                            let printHtml = false
                            data.EmpresasAsoc.forEach((asoc) => {
                                if (asoc.HashEmpresa===empresa.HashEmpresa) {
                                    html += "<div class='col-sm-4 my-2'>";
                                        html += "<div class='form-check'>"
                                            html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' checked disabled>"
                                        printHtml = true
                                        return;
                                    }
                                })
                                if (!printHtml) {
                                    html += "<div class='col-sm-4 my-2 check-empresas d-none'>";
                                        html += "<div class='form-check'>"
                                            html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' disabled>"
                                }

                                    html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                        html += empresa.NombreLegal
                                    html += "</label>"
                                html += "</div>"
                            html += "</div>"
                        });
                    html += "</div>";

                html += "<div class='modal-footer FooterInfoLegalProveedor' style = 'display:none;'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
            ModalEdit2(1)
        }
    })
}

function renderModalDocumentosProveedores(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'e66f1ba59bb6a7d482dfa01a8faa2099',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //76a9105e3c897358d4792237514bed12
            var html = "";
            
            html += "<div class='FormsGeneral'>";
                
                html += "<div id = 'pest'>";
                    html += "<ul >";
                        html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            html += "<a href = '#pest-1'><span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'MostrarTabsMenu(2);Administracion_TablaDocumentosLegalesProveedorA(\""+Hash+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            
                            html += "<a href = '#pest-2'><span>Documentos Adicionales</span></a>"
                        html +="</li>";
                    html += "</ul>"
                    html += "<div id = 'pest-1'class = 'ChildTabsMenu TabsMenu1'>";
                    
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Proveedor:</label>"
                                html += "<select class = 'form-control' name = 'Proveedor' id = 'Proveedor' >";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.Proveedor.length; i++){
                                        html += "<option value = '"+data.Proveedor[i]['Hash']+"'>"+data.Proveedor[i]['NombreComercial']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Tipos de Documento:</label>"
                                html += "<select class = 'form-control' name = 'TipoDocumento_DLC' id = 'TipoDocumento_DLC' >";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.TipoDocumento.length; i++){
                                        html += "<option value = '"+data.TipoDocumento[i]['Hash']+"'>"+data.TipoDocumento[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos' name = 'TextBusquedaDocumentos' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'lupaDocumentoLegalProveedor("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocumentosLegalesProveedor'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Nit</th>"
                                    html += "<th>Nombre Comercial Proveedor</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                    
                    html += "<div id = 'pest-2'class = 'ChildTabsMenu TabsMenu2'>";
                        
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc' col-form-label'>Proveedor:</label>"
                                html += "<select class = 'form-control' name = 'ProveedorA' id = 'ProveedorA' >";
                                    html += "<option value = '0' >Todos</option>"
                                    for(var i = 0; i < data.Proveedor.length; i++){
                                        html += "<option value = '"+data.Proveedor[i]['Hash']+"'>"+data.Proveedor[i]['NombreComercial']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentosA' name = 'TextBusquedaDocumentosA' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'lupaDocumentoLegalProveedorA("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocAdicionalProveedor"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Nit</th>"
                                    html += "<th>Nombre Comercial</th>"
                                    html += "<th>Nombre</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
            
            html += "</div>";

            $(".ContentSubMenuAdmin").html(html);
            $("#pest").tabs()
            Administracion_TablaDocumentosLegalesProveedor(Hash)
        }
    });
}

function lupaDocumentoLegalProveedor(Hash){
    $DataTable_Proveedores_DL.draw();
}

function lupaDocumentoLegalProveedorA(Hash){
    $DataTable_Proveedores_DLA.draw();
}

function Administracion_TablaDocumentosLegalesProveedor(Hash){
    $DataTable_Proveedores_DL =  $("#DocumentosLegalesProveedor").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'7c3e92ff602fdd62a039c250cec2ec56',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentos").val();
                    d.search['Proveedor'] = $("#Proveedor").val();
                    d.search['TipoDocumento'] = $("#TipoDocumento_DLC").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'TipoDocumento',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'fechahora',
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../../storage/app/datos/Proveedores/'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocumentosLegalesProveedor').css({'width':'100%'})
}

function Administracion_TablaDocumentosLegalesProveedorA(Hash){
    $DataTable_Proveedores_DLA =  $("#DocAdicionalProveedor"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'ea538ac0ca12ce557019e0d38aa3b92e',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentosA").val();
                    d.search['Proveedor'] = $("#ProveedorA").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value,
                        'Hash':Hash
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
               data: 'Nit',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'NombreComercial',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'nombreusuario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'fechahora',
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../../storage/app/datos/Proveedores/ARC_/'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocAdicionalProveedor'+Hash).css({'width':'100%'})
}

function renderModalContactosProveedor(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'e66f1ba59bb6a7d482dfa01a8faa2099',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            
            html += "<div class=' FormsGeneral'>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Proveedor:</label>"
                        html += "<select class = 'form-control' name = 'Proveedor' id = 'Proveedor' >";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Proveedor.length; i++){
                                html += "<option value = '"+data.Proveedor[i]['Hash']+"'>"+data.Proveedor[i]['NombreComercial']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'TextBusqueda' name = 'TextBusqueda' />"
                    html += "</div>"
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'lupaDatosContactosProveedor(\""+Hash+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div>"
                
                html += "<br>";
                html += "<div class = 'ContenedorDataTable'>"
                    html += "<table class='dataTable tableNew ContactosCliente' id='ContactosProveedor'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nit</th>"
                                html += "<th>Nombre Comercial</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Cargo</th>"
                                html += "<th>Celular</th>"
                                html += "<th>Telefono</th>"
                                html += "<th>Correo</th>"
                                html += "<th>Horario</th>"
                                html += "<th>Estado</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>"
            html += "</div>";
            
            $(".ContentSubMenuAdmin").html(html);
            Administracion_TablaContactosProveedor(Hash,Hash2)
        }
    });
}

function lupaDatosContactosProveedor(Hash){
    $DataTable.draw();
}

function Administracion_TablaContactosProveedor(Hash){
    $DataTable = $('#ContactosProveedor').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'021341d214adda31ad246d6af0ecd3b1',
            'data':function (d) {
                d.search['value'] = $("#TextBusqueda").val();
                d.search['Proveedor'] = $("#Proveedor").val();
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
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: 'Nit',
                "render": function (data, type, full, meta) {
                    return '<span >' + (data===null ? '' : data) + '</span>';
                }

            },
            {
                data: 'NombreComercial',
                "render": function (data, type, full, meta) {
                    return '<span class = "TipoDoc'+full.id+'">' + (data===null ? '---' : data) + '</span>';
                }

            },
            {
                data: 'Nombre',
                "render": function (data, type, full, meta) {
                    return '<span class = "TipoDoc'+full.id+'">' + (data===null ? '---' : data) + '</span>';
                }

            },
            {
                data: 'Cargo',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) + '</span>';
                }
            },
            {
                data: 'Celular',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) + '</span>';
                }
            },
            {
                data: 'Telefono',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'Correo',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'Horario',
                "render": function (data, type, full, meta) {
                    return '<span>' + (data===null ? '' : data) +'</span>';
                }
            },
            {
                data: 'NombreEstado',
                "render": function (data, type, full, meta) {
                    var ht = ''
                    if( data == 'Activo' ){
                        ht += '<img src ="../images/activo.png"  class = "OptionIcon" />'

                    }else{
                        ht += '<img src ="../images/inactivo.png"  class = "OptionIcon" />'
                    }
                     return '<center>' + ht +'</center>';
                 }
            },
            
        ],
        "order": [[7, "asc"],[6, "desc"]],
        "language": {
            "url": "../js/dataTable/Spanish.lang"
        },
    })
}

function __AdminDatosVisual(valx){  
    $(".AdminDatosVisual").hide("slow")
    $(".AdminDatosVisual"+valx).show("slow")
}