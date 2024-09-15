/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("InfoEmpresas")
});

var NotificadosDocumentosLegales = [];
var Ids = [];

function __ListarEstructuraEmpresa(){
    
    var formData = new FormData();
    formData.append("Estado", $("#Param_Estado").val());
    formData.append("OTC_TextBusqueda", $("#OTC_TextBusqueda").val());
    
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        contentType: false,
        processData: false,
        type: "post",
        url:UrlUniversal+'__DatosEmpresas',
        success:function(data){
            var html = "";
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th >No.</th>"
                    html += "<th >Nit</th>"
                    html += "<th >Tipo</th>"
                    html += "<th >Nombre Comercial</th>"
                    html += "<th >Nombre Legal</th>"
                    html += "<th >Estado</th>"
                    html += "<th >Opciones</th>"
                html += "</tr>"
                for(var  i = 0; i < data.Empresas.length; i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        html += "<td class = ''>"+data.Empresas[i]['Nit']+"</td>"
                        html += "<td class = ''>"+data.Empresas[i]['TipoEmpresa']+"</td>"
                        html += "<td class = 'NameComercial"+data.Empresas[i]['Hash']+"'>"+data.Empresas[i]['NombreComercial']+"</td>"
                        html += "<td class = ''>"+data.Empresas[i]['NombreLegal']+"</td>"
                        html += "<td class = 'CenterText'>"
                        
                            html += "<div onclick='EstadoEmpresa("+data.Empresas[i]['Hash']+")'>" 
                            if( $("._PEstado").val()  != ''){
                                if( data.Empresas[i]['Estado'] == 1 ){
                                    html += "<img src ='images/_activos.png' class = 'OptionIcon' />"
                                }else{
                                    html += "<img src ='images/_inactivos.png' class = 'OptionIcon' />"
                                }
                            }else{
                                if( data.Empresas[i]['Estado'] == 1 ){
                                    html += "Activo"
                                }else{
                                    html += "Inactivo"
                                }
                            }
                            html += "</div>"
                        html += "</td>"
                        html += "<td class = 'CenterText'>"
                            /*html += "<select class = 'form-control' id = 'OptionMenuEmpresas"+data.Empresas[i]['Hash']+"'onchange='Datos_MostrarOpcionMenuEmpresas("+data.Empresas[i]['Hash']+")'>"
                                html += "<option selected value = ''>Seleccione</option>"
                                html += "<option value = '1'>Información Legal</option>"
                                html += "<option value = '2'>Información General</option>"
                                html += "<option value = '7'>Estructura Empresa</option>"
                                html += "<option value = '4'>Junta Directiva</option>"
                                html += "<option value = '5'>SG - SST</option>"
                                html += "<option value = '3'>Personal</option>"
                            html += "</select>"*/
                            html += "<a target = '_blank' href = '"+UrlGeneral+"__DetalleEmpresa/"+data.Empresas[i]['Hash']+"'>"
                                html += "<img src ='images/INFORMACION_ICONO.png' class = 'OptionIcon' />"
                            html += "</a>"
                        html += "</td>"
                    html += "</tr>"
                }
            html += "</table>"
            $(".ContDetallesTabla").html(html)
        }
    });
}

function Datos_MostrarOpcionMenuEmpresas(Hash){
    var Hash2 = $("._KeyUser").text();
    var Valor = $("#OptionMenuEmpresas"+Hash).val();
    if( Valor == 1 ){
        InformacionLegalEmpresa(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }else if( Valor == 2 ){
        InformacionTributariaEmpresa(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }else if( Valor == 3 ){
        InformacionPersonal(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }else if( Valor == 4 ){
        //InformacionPptoGeneral(Hash,Hash2)
        InformacionJuntaDirectiva(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }else if( Valor == 5 ){
        InformacionSGSST(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }else if( Valor == 6 ){
        //InformacionTributariaEmpresa(Hash,Hash2)
        //$("#ModalEdit").modal("show")
    }else if( Valor == 7 ){
        UnidadesNegocioEmpresa(Hash,Hash2)
        $("#ModalEdit").modal("show")
    }
    $("#OptionMenuEmpresas"+Hash).val('')
}

function CrearEmpresa(Ruta){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '82985c51efa493c23f929d6366c08cf8',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Crear Empresas"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            
            html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<div class='modal-body'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-row'>";

                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Nit:</label>";
                            html += "<input type='text' class='form-control' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required/>";
                        html += "</div>";
                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required/>";
                        html += "</div>";

                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required/>";
                        html += "</div>";

                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required>";
                                html += "<option value = '0'>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i]['IdPais']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required>";
                                html += "<option value = ''>Seleccione</option>";

                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required>";
                                html += "<option value = ''>Seleccione</option>";

                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-6 my-2'>";
                            html += "<label for='ParTipoEmpresa' ><span class = 'Obligatorio'>(*)</span> Tipo Empresa:</label>";
                            html += "<select name = 'ParTipoEmpresa' id='ParTipoEmpresa' class='form-control' required>";
                                html += "<option value = '0'>Seleccione</option>";
                                for(var i = 0; i < data.TipoEmpresa.length;i++){
                                  html += "<option value = '"+data.TipoEmpresa[i]['Id']+"'>"+data.TipoEmpresa[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');

        }
    });

}

function InformacionLegalEmpresa(Hash,Hash2){
    var Ruta = 'd3bc4b716d024731ecb9ac27cd776ead';
    var RutaEdit = '56c9a8a7a10234fd2a81ec0de57b1aed';
    $.ajax({
        type:'POST',
        url:UrlGeneral + Ruta,
        data:{Hash:Hash, Hash2:Hash2, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var Editar = "";
            if( data.PEdicion.length > 0 ){
                //Editar = "<img src ='../images/editar.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalEmpresaEdicion()'/>"
            }
            Editar = "<img src ='../images/editar.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalEmpresaEdicion("+Hash+",0)'/>"

            var urlLogoEmpresa = "";//`${URLDatosEmpresa}${data.Empresa[0].Logo === null ? '' : Hash}/${data.Empresa[0].Logo === null ? '_Datos.png' : data.Empresa[0].Logo}`;
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = "../images/menu/_Datos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa+"../"+Hash+"/"+data.Empresa[0].Logo
            }
            
            html += "<div class='modal-body'>"+Editar;
                html += "<form class='form-signin FormDatosInformacionLegalEmprea'  action='"+RutaEdit+"' method='post' enctype='multipart/form-data'>";
                    html += "<div class='separator my-1 py-1 '>GENERAL</div>"
                    html += "<input type='hidden' name='IdEmpresa' value="+Hash+">"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParNit'><span class = 'Obligatorio'>(*)</span> Nit:</label>"
                            html += "<input type='text' id = 'ParNit' name = 'ParNit' class='form-control' placeholder='Nit' value = '"+data.Empresa[0]['Nit']+"' autocomplete = 'off' required readonly>";
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParNit' col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' value = '"+data.Empresa[0]['NombreComercial']+"' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNombreLegal'><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' value = '"+data.Empresa[0]['NombreLegal']+"' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParNit' col-form-label'><span class = 'Obligatorio'>(*)</span> País:</label>"
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                    if(data.Empresa[0]['IdPais'] == data.Paises[i]['IdPais']){
                                        html += "<option value = '"+data.Paises[i]['IdPais']+"' selected>"+data.Paises[i]['Nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Paises[i]['IdPais']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParNit' col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>"
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    if(data.Empresa[0]['IdDepartamento'] == data.Departamento[i]['IdDepartamento']){
                                        html += "<option value = '"+data.Departamento[i]['IdDepartamento']+"' selected>"+data.Departamento[i]['Nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Departamento[i]['IdDepartamento']+"'>"+data.Departamento[i]['Nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParNit' col-form-label'><span class = 'Obligatorio'>(*)</span> Ciudad:</label>"
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required disabled required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Ciudad.length;i++){
                                    if(data.Empresa[0]['IdCiudad'] == data.Ciudad[i]['IdCiudad']){
                                        html += "<option value = '"+data.Ciudad[i]['IdCiudad']+"' selected>"+data.Ciudad[i]['Nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Ciudad[i]['IdCiudad']+"'>"+data.Ciudad[i]['Nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-4'>";
                            html += "<label for='ParDireccion' col-form-label'>Dirección:</label>"
                            html += "<input type='text' class='form-control' id='ParDireccion' name='ParDireccion' placeholder='Dirección' value = '"+data.Empresa[0]['Direccion']+"' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-2'>";
                            html += "<label for='ParFechaConstitucion' col-form-label'>Fecha Constitución:</label>"
                            html += "<input type='date' class='DatePicker form-control' id='ParFechaConstitucion' name='ParFechaConstitucion' placeholder='Fecha Constitución' value = '"+data.Empresa[0]['FechaConstitucion']+"' readonly/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCorreoContacto'>Correo Contacto:</label>"
                            html += "<input type='text' id = 'ParCorreoContacto' name = 'ParCorreoContacto' class='form-control' placeholder='Correo Contacto' value = '"+data.Empresa[0]['CorreoContacto']+"'autocomplete = 'off' readonly>";
                        html += "</div>";
                        html += "<div class='col-sm-2'>";
                            html += "<label for='ParTipoEmpresa'>Tipo Empresa:</label>"
                            html += "<select name = 'ParTipoEmpresa' id='ParTipoEmpresa' class='form-control' required disabled required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.TipoEmpresa.length;i++){
                                    if(data.Empresa[0]['IdTipoEmpresa'] == data.TipoEmpresa[i]['Id']){
                                        html += "<option value = '"+data.TipoEmpresa[i]['Id']+"' selected>"+data.TipoEmpresa[i]['Nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.TipoEmpresa[i]['Id']+"'>"+data.TipoEmpresa[i]['Nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";

                        html += "<div class='col-sm-6'>";
                        html += "<label for='ParLogo'>Logo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='"+URLDatosEmpresa+Hash+"/"+data.Empresa[0].Logo+"' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' disabled>"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Choose file...</label>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";

                    html += "<br>";
                    html += "<div class='separator my-1 py-1'>REPRESENTANTE</div>"
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col-sm-6 representante-l'>";
                            html += "<label >Representante Legal:</label>"
                            if( data.RL.length == 0 ){
                                html += "<input type='text' class='form-control my-3 ' placeholder='Correo Contacto' value = 'No se ha ingresado Información' readonly>";
                            }else{
                                html += "<div class='form-row my-3 col-sm-12 CenterText' id='RContent'>";
                                    
                                    html += "<div class='col col-sm-12 my-2 CenterText'>";
                                        html += "<img src = '"+URLDatosEmpresa+Hash+"/"+data.RL[0]['Foto']+"' onerror=this.src='images/datos_contactos.png' height = '100px' />";
                                        html += "<p></p><label for='LfotoRL'>Foto:</label>"
                                        html += "<div class='custom-file'>"
                                            html += "<input type='file' class='custom-file-input' id='LfotoRL' name='FotoRepresentante' value='"+URLDatosEmpresa+Hash+"/"+data.RL[0]['Foto']+"' accept='image/jpeg, image/jpg, image/png' disabled>"
                                            html += "<label class='custom-file-label' id='LfotoRL' for='LfotoRL'>Choose file...</label>"
                                        html += "</div>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
                                        html += "<input type='text' class='form-control' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' value = '"+data.RL[0]['Nombre']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParTipoDocumentoRL' col-form-label'>Tipo Documento:</label>"
                                        html += "<select name = 'ParTipoDocumentoRL' id='ParTipoDocumentoRL' class='form-control' disabled >";
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
                                        html += "<input type='text' class='form-control' id='ParNroDocumentoRL' name='ParNroDocumentoRL' placeholder='Número Documento' value = '"+data.RL[0]['NroDocumento']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParCelularRL' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control' id='ParCelularRL' name='ParCelularRL' placeholder='Celular' value = '"+data.RL[0]['Celular']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-12 my-2'>";
                                        html += "<label for='ParCorreoRL' col-form-label'>Correo:</label>"
                                        html += "<input type='text' class='form-control' id='ParCorreoRL' name='ParCorreoRL' placeholder='Correo' value = '"+data.RL[0]['Correo']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                html += "</div>";
                            }
                        html += "</div>";
                        html += "<div class='col col-sm-6 representante-s'>";
                            html += "<label >Suplente Representante Legal:</label>"
                            if( data.RS.length == 0 ){
                                html += "<input type='text' class='form-control my-3' placeholder='Correo Contacto' value = 'No se ha ingresado Información' readonly>";
                            }else{
                                html += "<div class='form-row my-3 col-sm-12' id='RSContent'>";
                                    html += "<div class='col col-sm-12 my-2 CenterText'>";
                                        html += "<img src = '"+URLDatosEmpresa+Hash+"/"+data.RS[0]['Foto']+"' onerror=this.src='images/datos_contactos.png' height = '100px' />";
                                        html += "<p></p><label for='LfotoRS'>Foto:</label>"
                                            html += "<div class='custom-file'>"
                                            html += "<input type='file' class='custom-file-input' id='FotoSuplente' name='FotoSuplente' value='"+URLDatosEmpresa+Hash+"/"+data.RS[0]['Foto']+"'  accept='image/jpeg, image/jpg, image/png' disabled>"
                                            html += "<label class='custom-file-label' id='FotoSuplente' for='FotoSuplente'>Choose file...</label>"
                                        html += "</div>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParNombreRS' col-form-label'>Nombre:</label>"
                                        html += "<input type='text' class='form-control' id='ParNombreRS' name='ParNombreRS' placeholder='Nombre' value = '"+data.RS[0]['Nombre']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParTipoDocumentoRS' col-form-label'>Tipo Documento:</label>"
                                        html += "<select name = 'ParTipoDocumentoRS' id='ParTipoDocumentoRS' class='form-control' disabled>";
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
                                        html += "<input type='text' class='form-control' id='ParNroDocumentoRS' name='ParNroDocumentoRS' placeholder='Número Documento' value = '"+data.RS[0]['NroDocumento']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-6 my-2'>";
                                        html += "<label for='ParCelularRS' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control' id='ParCelularRS' name='ParCelularRS' placeholder='Celular' value = '"+data.RS[0]['Celular']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                    html += "<div class='col col-sm-12 my-2'>";
                                        html += "<label for='ParCorreoRS' col-form-label'>Celular:</label>"
                                        html += "<input type='text' class='form-control' id='ParCorreoRS' name='ParCorreoRS' placeholder='Correo' value = '"+data.RS[0]['Correo']+"' autocomplete = 'off' readonly/>";
                                    html += "</div>";
                                html += "</div>";
                            }
                        html += "</div>";

                    html += "</div>";

                    html += "<br>"
                    html += "<div class='separator my-1 py-1'>REDES SOCIALES</div>";
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

                    html += "<div class='form-row my-2'>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParPaginaWeb' > Pagina Web </label>";
                            html += `<input type='text' class='form-control ' id='ParPaginaWeb' value='${data.Social.length ? data.Social[0]['Link'] : ''}' name='ParPaginaWeb' placeholder='Link' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParFacebook'> Facebook:</label>";
                            html += `<input type='text' class='form-control' id='ParFacebook' value='${data.Social.length ? data.Social[1]['Link'] : ''}' name='ParFacebook' placeholder='Link' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParTwitter' > Twitter:</label>";
                            html += `<input type='text' class='form-control' id='ParTwitter' value='${data.Social.length ? data.Social[2]['Link'] : ''}' name='ParTwitter' placeholder='Link' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                        html += "<div class='col col-sm-3'>";
                            html += "<label for='ParInstagram'> Instagram:</label>";
                            html += `<input type='text' class='form-control' id='ParInstagram' value='${data.Social.length ? data.Social[3]['Link'] : ''}' name='ParInstagram' placeholder='Link' autocomplete = 'off' readonly/>`;
                        html += "</div>";
                    html += "</div>";

                    html += "<br>";
                    /*html += "<div class='separator my-1 py-1'>NOTAS LEGALES</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaIR' col-form-label'>Nota Informes de Reunión:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaIR' name = 'ParNotaIR' placeholder = 'Nota Informe Reunión' readonly>"+data.NotaIR[0]['Nota']+"</textarea>";
                        html += "</div>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaPpto' col-form-label'>Nota Presupuesto:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaPpto' name = 'ParNotaPpto' placeholder = 'Nota Ppto' readonly>"+data.NotaPpto[0]['Nota']+"</textarea>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaAnticipo' col-form-label'>Nota Anticipo:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaAnticipo' name = 'ParNotaAnticipo' placeholder = 'Nota Anticipo' readonly>"+data.NotaAnticipo[0]['Nota']+"</textarea>";
                        html += "</div>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaLegalizacion' col-form-label'>Nota Legalización:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaLegalizacion' name = 'ParNotaLegalizacion' placeholder = 'Nota Legalización' readonly>"+data.NotaLegalizacion[0]['Nota']+"</textarea>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaOP' col-form-label'>Nota Orden de Producción:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaOP' name = 'ParNotaOP' placeholder = 'Nota Orden de Producción' readonly>"+data.NotaOP[0]['Nota']+"</textarea>";
                        html += "</div>";
                        html += "<div class='col col-sm-6'>";
                            html += "<label for='ParNotaOC' col-form-label'>Nota Orden de Compra:</label>"
                            html += "<textarea class = 'form-control' id = 'ParNotaOC' name = 'ParNotaOC' placeholder = 'Nota Orden de Compra' readonly>"+data.NotaOC[0]['Nota']+"</textarea>";
                        html += "</div>";
                    html += "</div>";
                    */
                    html += "<div class='separator my-1 py-1'>INSTITUCIONAL</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParMision' col-form-label'>Misión:</label>"
                        html += "<textarea class = 'form-control' id = 'ParMision' name = 'ParMision' placeholder = 'Misión' readonly>"+data.Empresa[0]['Mision']+"</textarea>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParVision' col-form-label'>Visión:</label>"
                        html += "<textarea class = 'form-control' id = 'ParVision' name = 'ParVision' placeholder = 'Visión' readonly>"+data.Empresa[0]['Vision']+"</textarea>";
                    html += "</div>";
                    html += "<div class = 'form-row my-3'>";
                        html += "<label for='ParObjetivos' col-form-label'>Objetivos:</label>"
                        html += "<textarea class = 'form-control' id = 'ParObjetivos' name = 'ParObjetivos' placeholder = 'Objetivos' readonly>"+data.Empresa[0]['Objetivos']+"</textarea>";
                    html += "</div>";

                    html += "<div class='FooterInfoLegalEmpresa modal-footer' style = 'display:none;'>";
                    html += "</div>";
                html += "</form>";
            html += "</div>";
            $("#_tabs-1").html(html);

            //$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //ResizeModal(0.9)

            }
        });

}

function __EditarInformacionEmpresa(Hash){
    $.ajax({
        type:'POST',
        url: UrlUniversal+'56c9a8a7a10234fd2a81ec0de57b1aedx',
        data:{Hash:Hash, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Editar Empresa - "+$("#ParNombreComercial").val()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            
            html += "<form class='form-signin' method='post'>";
                html += "<div class='modal-body'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<div class = 'ContenedorSeccionesForm'>"
                    html += "<p class = 'TitulosSecciones'>GENERAL</p>"
                        html += "<div class = 'form-row my-3'>"
                            html += "<div class='col-sm-3'>"
                                html += "<label for='ParNit'>Nit:</label>"
                                html += "<input type='text' id = 'ParNit' name = 'ParNit' class='form-control'autocomplete = 'off' value = '"+data.Empresa[0]['Nit']+"'required >"
                            html += "</div>"
                            html += "<div class='col col-sm-3'>"
                                html += "<label for='ParNit'>Nombre Comercial:</label>"
                                html += "<input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial'  value = '"+data.Empresa[0]['NombreComercial']+"' autocomplete = 'off' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-6'>"
                                html += "<label for='ParNombreLegal'>Nombre Legal:</label>"
                                html += "<input type='text' class='form-control' id='ParNombreLegal' name='ParNombreLegal' value = '"+data.Empresa[0]['NombreLegal']+"' autocomplete = 'off' required />"
                            html += "</div>"
                        html += "</div>"
                    html += "<div class = 'form-row my-3'>"
                        html += "<div class='col col-sm-2'>"
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> País:</label>"
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais'  class='form-control' required  >"
                            for ( var i = 0; i < data[0]['Paises'].length; i++){
                                var c = "";
                                if( data[0]['Paises'][i]['IdPais'] == data.Empresa[0]['IdPais']){
                                    c = "selected"
                                }
                                html += "<option "+c+" value = '"+data[0]['Paises'][i]['IdPais']+"'>"+data[0]['Paises'][i]['Nombre']+"</option>"
                            }
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-2'>"
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>"
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento'  class='form-control' required  >"
                            for ( var i = 0; i < data[0]['Departamento'].length; i++){
                                var c = "";
                                if( data[0]['Departamento'][i]['IdDepartamento'] == data.Empresa[0]['IdDepartamento']){
                                    c = "selected"
                                }
                                html += "<option "+c+" value = '"+data[0]['Departamento'][i]['IdPais']+"'>"+data[0]['Departamento'][i]['Nombre']+"</option>"
                            }
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-2'>"
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>"
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required >"
                            for ( var i = 0; i < data[0]['Ciudad'].length; i++){
                                var c = "";
                                if( data[0]['Ciudad'][i]['IdCiudad'] == data.Empresa[0]['IdCiudad']){
                                    c = "selected"
                                }
                                html += "<option "+c+" value = '"+data[0]['Ciudad'][i]['IdCiudad']+"'>"+data[0]['Ciudad'][i]['Nombre']+"</option>"
                            }
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4'>"
                            html += "<label for='ParDireccion' >Dirección:</label>"
                            html += "<input type='text' class='form-control' id='ParDireccion' value = '"+data.Empresa[0]['Direccion']+"' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' />";
                        html += "</div>"
                        html += "<div class='col col-sm-2'>"
                            html += "<label for='ParFechaConstitucion' >Fecha Constitución:</label>"
                            html += "<input type='date' class='DatePicker form-control' value = '"+data.Empresa[0]['FechaConstitucion']+"' id='ParFechaConstitucion' name='ParFechaConstitucion' />"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row my-3'>"
                        html += "<div class='col-sm-4'>"
                            html += "<label for='ParCorreoContacto'>Correo Contacto:</label>"
                            html += "<input type='text' id = 'ParCorreoContacto' value = '"+data.Empresa[0]['CorreoContacto']+"' name = 'ParCorreoContacto' class='form-control' placeholder='Correo Contacto' autocomplete = 'off' >"
                    html += "</div>"
                    html += "<div class='col-sm-2'>"
                        html += "<label for='ParTipoEmpresa'>Tipo Empresa:</label>"
                            html += "<select name = 'ParTipoEmpresa' id='ParTipoEmpresa' class='form-control'  required>"
                            for ( var i = 0; i < data[0]['TipoEmpresa'].length; i++){
                                var c = "";
                                if( data[0]['TipoEmpresa'][i]['Id'] == data.Empresa[0]['IdTipoEmpresa']){
                                    c = "selected "
                                }
                                html += "<option "+c+" value = '"+data[0]['TipoEmpresa'][i]['Id']+"'>"+data[0]['TipoEmpresa'][i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<br>"
  

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-xl');
        }
    });
}

function InformacionLegalEmpresaEdicion(Hash,Hash2){
    Ruta = '56c9a8a7a10234fd2a81ec0de57b1aed';
    
    Hash2 = $('#OptionIconEdit').data('hash2')

    $.ajax({
        type:'POST',
        url:UrlGeneral+ Ruta,
        data:{Hash:Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if ($('#OptionIconEdit').data('state') == 1) {
                $("#TituloForm").html("Información Legal");
                $(".FooterInfoLegalEmpresa").hide();
                $(".FooterInfoLegalEmpresa").html('<i class=" Cursor fas fa-angle-double-down"></i>');

                show = true;
                $('#OptionIconEdit').data('state', 0)

            } else {
                var html = "";
                $("#TituloForm").html("Editar Información Legal");
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' >Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                $(".FooterInfoLegalEmpresa").show();
                $(".FooterInfoLegalEmpresa").html(html)
                if (!$('#RSContent').length) {
                    html += "<div class='form-row my-3 col-sm-12' id='RSContent'>";
                        html += "<div class='col col-sm-12 my-2 CenterText'>";
                            html += "<img src = '' onerror=this.src='images/datos_contactos.png' height = '100px' />";
                            html += "<p></p><label for='ParLogo'>Foto:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='FotoSuplente' name='FotoSuplente' value='"+URLDatosEmpresa+Hash+"/"+data.Empresa[0].Logo+"' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' disabled>"
                                html += "<label class='custom-file-label' id='LfotoRL' for='FotoSuplente'>Choose file...</label>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParNombreRS' col-form-label'>Nombre:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreRS' name='ParNombreRS' placeholder='Nombre' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParTipoDocumentoRS' col-form-label'>Tipo Documento:</label>"
                            html += "<select name = 'ParTipoDocumentoRS' id='ParTipoDocumentoRS' class='form-control' disabled>";
                                html += "<option value = '' selected>Seleccione</option>";
                                for(var i = 0; i < data.TipoDocumento.length;i++){
                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParNroDocumentoRS' col-form-label'>Nro Documento:</label>"
                            html += "<input type='text' class='form-control' id='ParNroDocumentoRS' name='ParNroDocumentoRS' placeholder='Número Documento' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParCelularRS' col-form-label'>Celular:</label>"
                            html += "<input type='text' class='form-control' id='ParCelularRS' name='ParCelularRS' placeholder='Celular' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParCorreoRS' col-form-label'>Correo:</label>"
                            html += "<input type='text' class='form-control' id='ParCorreoRS' name='ParCorreoRS' placeholder='Correo' autocomplete = 'off' readonly/>";
                        html += "</div>";
                    $('.representante-s > :input').remove()
                    $('.representante-s').append(html)
                }
                if (!$('#RContent').length) {
                    html = "<div class='form-row my-3 col-sm-12' id='RContent'>";
                        html += "<div class='col col-sm-12 my-2 CenterText'>";
                            html += "<img src = '' onerror=this.src='images/datos_contactos.png' height = '100px' />";
                            html += "<p></p><label for='ParLogo'>Foto:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='FotoRepresentante' name='FotoRepresentante' value='"+URLDatosEmpresa+Hash+"/"+data.Empresa[0].Logo+"'  accept='image/jpeg, image/jpg, image/png' disabled>"
                                html += "<label class='custom-file-label' id='FotoRepresentante' for='FotoRepresentante'>Choose file...</label>"
                            html += "</div>";
                        html += "</div>";
                    
                        html += "<div class='col my-2 col-sm-6'>";
                            html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParTipoDocumentoRL' col-form-label'>Tipo Documento:</label>"
                            html += "<select name = 'ParTipoDocumentoRL' id='ParTipoDocumentoRL' class='form-control' disabled>";
                                html += "<option value = '' selected>Seleccione</option>";
                                for(var i = 0; i < data.TipoDocumento.length;i++){
                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParNroDocumentoRL' col-form-label'>Nro Documento:</label>"
                            html += "<input type='text' class='form-control' id='ParNroDocumentoRL' name='ParNroDocumentoRL' placeholder='Número Documento' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParCelularRL' col-form-label'>Celular:</label>"
                            html += "<input type='text' class='form-control' id='ParCelularRL' name='ParCelularRL' placeholder='Celular' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParCorreoRL' col-form-label'>Correo:</label>"
                            html += "<input type='text' class='form-control' id='ParCorreoRL' name='ParCorreoRL' placeholder='Correo' autocomplete = 'off' readonly/>";
                        html += "</div>";
                    html += "</div>";
                    $('.representante-l > :input').remove()
                    $('.representante-l').append(html)
                }
                $('#OptionIconEdit').data('state', 1)
                show = false
            }

            $("#FormRedes").css('display', show ? 'none': 'block');
            $(".FormDatosInformacionLegalEmprea input").prop('readonly', show);
            $(".FormDatosInformacionLegalEmprea textarea").prop('readonly', show);
            $(".FormDatosInformacionLegalEmprea select").prop('disabled', show);
            $(".FormDatosInformacionLegalEmprea input").prop('disabled', show);
            ResizeModal(0.9)
        }
    })
}

function RepresentnateModalBody(data) {
    $('#BodyRL').empty()

    html = "<div class='col col-sm-6'>";
        html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
        html += "<input type='text' class='form-control' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' value = '"+data.RL[0]['Nombre']+"' readonly/>";
    html += "</div>";
    html += "<div class='col col-sm-6'>";
        html += "<label for='ParTipoDocumentoRL' col-form-label'>Tipo Documento:</label>"
        html += "<select name = 'ParTipoDocumentoRL' id='ParTipoDocumentoRL' class='form-control' disabled required>";
            html += "<option value = ''>Seleccione</option>";
            for(var i = 0; i < data.TipoDocumento.length;i++){
                if(data.RL[0]['IdTipoDocumento'] == data.TipoDocumento[i]['Id']){
                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"' selected>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                }else{
                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                }
                if (!$('#RContent').length) {
                    html = "<div class='form-row my-3 col-sm-12' id='RContent'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<img src = '' onerror=this.src='images/datos_contactos.png' height = '100px' />";
                            html += "<p></p><label for='ParLogo'>Foto:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='FotoRepresentante' name='FotoRepresentante' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' disabled>"
                                html += "<label class='custom-file-label' id='FotoRepresentante' for='FotoRepresentante'>Choose file...</label>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class='col my-2 col-sm-6'>";
                            html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col my-2 col-sm-6'>";
                            html += "<label for='ParNombreRL' col-form-label'>Nombre:</label>"
                            html += "<input type='text' class='form-control' id='ParNombreRL' name='ParNombreRL' placeholder='Nombre' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParTipoDocumentoRL' col-form-label'>Tipo Documento:</label>"
                            html += "<select name = 'ParTipoDocumentoRL' id='ParTipoDocumentoRL' class='form-control' disabled>";
                                html += "<option value = '' selected>Seleccione</option>";
                                for(var i = 0; i < data.TipoDocumento.length;i++){
                                    html += "<option value = '"+data.TipoDocumento[i]['Id']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParNroDocumentoRL' col-form-label'>Nro Documento:</label>"
                            html += "<input type='text' class='form-control' id='ParNroDocumentoRL' name='ParNroDocumentoRL' placeholder='Número Documento' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParCelularRL' col-form-label'>Celular:</label>"
                            html += "<input type='text' class='form-control' id='ParCelularRL' name='ParCelularRL' placeholder='Celular' autocomplete = 'off' readonly/>";
                        html += "</div>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParCorreoRL' col-form-label'>Correo:</label>"
                            html += "<input type='text' class='form-control' id='ParCorreoRL' name='ParCorreoRL' placeholder='Correo' autocomplete = 'off' readonly/>";
                        html += "</div>";
                    html += "</div>";
                    $('.representante-l > :input').remove()
                    $('.representante-l').append(html)
                }
                $('#OptionIconEdit').data('state', 1)
                show = false
            }

            $(".FormDatosInformacionLegalEmprea input").prop('readonly', show);
            $(".FormDatosInformacionLegalEmprea textarea").prop('readonly', show);
            $(".FormDatosInformacionLegalEmprea select").prop('disabled', show);
            // $(".FormDatosInformacionLegalEmprea input").prop('disabled', show);
}

function EstadoEmpresa(Hash,Route){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'58541d56e8b2ee13c6c89e549431495d',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            location.reload()
        }
    });
}

function EstadoImpuestoEmpresa(Hash,Hash2,estado){
    $.ajax({
        type:'POST',
        url:UrlGeneral +'85b6302504999f93be1aa8cb3c414e12',
        data:{Hash:Hash,estado:estado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTIEmpresa(Hash,Hash2)
        }
    });
}

function InformacionTributariaEmpresa(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '2cea7c9610a2d44beed0d03e71247db9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";//`${URLDatosEmpresa}${data.Empresa[0].Logo === null ? '' : Hash}/${data.Empresa[0].Logo === null ? '_Datos.png' : data.Empresa[0].Logo}`;
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = "../images/menu/_Datos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            
                html += "<div id = 'InfLg'>";
                    html += "<ul >";

                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES.length > 0 ){
                        html += "<li onclick = 'MostrarTabsMenu(1)'>"
                            html += "<a href = '#InfLg-1'><span>Documentos Legales</span></a>"
                        html +="</li>";
                    }

                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                        html += "<li onclick = 'BuscarTIEmpresa("+Hash+",\""+Hash2+"\")' >"
                            html += "<a href = '#InfLg-2'><span>Tarifas e Impuestos</span></a>"
                        html +="</li>";
                    }

                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                        html += "<li onclick = 'MostrarTabsMenu(3);' >"
                            html += "<a href = '#InfLg-3'><span>Notas Legales</span></a>"
                        html +="</li>";
                    }

                    html += "</ul>";

                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES.length > 0 ){
                        html += "<div id = 'InfLg-1'>";
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearDocumentoLegalEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearDocumentoLegalEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Nuevo Documento Legal</span>";
                                    html += "</td>"
                                }
                                if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/ENVIAR_ICONO.png' class = 'OptionIcon' onclick = 'EnviarDocumentosLegalesEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'EnviarDocumentosLegalesEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Enviar Documentos</span>";
                                    html += "</td>"
                                }
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>";
                            if( data.INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA.length > 0 ){
                                html += "<div class = 'form-row'>";
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<label for='IdTipoDoc' col-form-label'>Tipo de Documento:</label>"
                                        html += "<select class = 'form-control' name = 'IdTipoDocumento' id = 'IdTipoDocumento' >";
                                            html += "<option value = '0' selected>Documentos Vigentes</option>"
                                            for(var i = 0; i < data.Lista.length; i++){
                                                html += "<option value = '"+data.Lista[i]['Hash']+"'>"+data.Lista[i]['Nombre']+"</option>"
                                            }
                                        html += "</select>"
                                    html += "</div>"
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<label for='IdTipoDoc'>Texto:</label>"
                                        html += "<input type = 'text' class = 'form-control' id = 'TextBusqueda' name = 'TextBusqueda' />"
                                    html += "</div>"
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<p></p>"
                                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosEmpresa()'/>"
                                    html += "</div>"
                                html += "</div><br>";
                                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosLegales"+Hash+"' id = 'DocumentosLegales"+Hash+"'>";
                                    html += "<thead>"
                                        html += "<tr>"
                                            html += "<th width = '20px'>Sel</th>"
                                            html += "<th width = '20px'>No.</th>"
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
                    }
                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                        html += "<div id = 'InfLg-2'>";
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR.length > 0 ){
                                        html += "<td class = 'BotonesSuperiores'>"
                                            html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearTILegalEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearTILegalEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Nueva Tarifa o Impuesto</span>";
                                        html += "</td>"
                                    }
                                        html += "</tr>"
                                    html += "</table>";
                                html += "</div>";
                                if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                                    html += "<div class = 'form-row'>";
                                        html += "<div class='col col-sm-3 my-2'>"
                                            html += "<label for='TI_IdTipoDocumento' col-form-label'>Tipo de Tarifa / Impuesto:</label>"
                                            html += "<select class = 'form-control TI_IdTipoDocumento' name = 'TI_IdTipoDocumento' id = 'TI_IdTipoDocumento' >";
                                                html += "<option value = '0' selected>Tarifas Vigentes</option>"
                                                for(var i = 0; i < data.Lista2.length; i++){
                                                    html += "<option value = '"+data.Lista2[i]['Hash']+"'>"+data.Lista2[i]['Nombre']+"</option>"
                                                }
                                            html += "</select>"
                                        html += "</div>"
                                        html += "<div class='col col-sm-3 my-2'>"
                                            html += "<label for='TI_TextBusqueda'>Texto:</label>"
                                            html += "<input type = 'text' class = 'form-control TI_TextBusqueda ' id = 'TI_TextBusqueda' name = 'TI_TextBusqueda' />"
                                        html += "</div>"
                                        html += "<div class='col col-sm-3 my-2'>"
                                            html += "<p></p>"
                                            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTIEmpresa("+Hash+",\""+Hash2+"\")'/>"
                                        html += "</div>"
                                    html += "</div><br>";
                                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable TI"+Hash+"' id = 'TI"+Hash+"'>";
                                        html += "<thead>"
                                            html += "<tr>"
                                                html += "<th width = '20px'>No.</th>"
                                                html += "<th>Nombre Tarifa/Impuesto</th>"
                                                html += "<th width = '100px'>Fecha Vencimiento</th>"
                                                html += "<th>Tipo</th>"
                                                html += "<th>Valor</th>"
                                                html += "<th>Notificar A</th>"
                                                html += "<th>Cargado Por</th>"
                                                html += "<th>Cargado El</th>"
                                                html += "<th>Estado</th>"
                                            html += "</tr>"
                                        html += "</thead>"
                                    html += "</table></div>";
                                }
                        html += "</div>";
                    }

                    if( data.INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA.length > 0 ){
                        var Ruta = 'd3bc4b716d024731ecb9ac27cd776ead';
                        html += "<div id = 'InfLg-3'>";
                            html += "<table>";
                                html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        //html = "<img src ='images/editar.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalEmpresaEdicion()'/>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>";
                            html += "<div class = 'table'>";
                                html += "<div class='separator my-1 py-1'>NOTAS LEGALES</div>";
                                    html += "<div class = 'form-row my-3'>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaIR' col-form-label'>Nota Informes de Reunión:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaIR' rows = '5' name = 'ParNotaIR' placeholder = 'Nota Informe Reunión' >"+data.NotaIR[0]['Nota']+"</textarea>";
                                            
                                        html += "</div>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaPpto' col-form-label'>Nota Presupuesto:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaPpto' rows = '5'name = 'ParNotaPpto' placeholder = 'Nota Ppto' >"+data.NotaPpto[0]['Nota']+"</textarea>";
                                        html += "</div>";
                                    html += "</div>";
                                    html += "<div class = 'form-row my-3'>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaAnticipo' col-form-label'>Nota Anticipo:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaAnticipo' rows = '5' name = 'ParNotaAnticipo' placeholder = 'Nota Anticipo' >"+data.NotaAnticipo[0]['Nota']+"</textarea>";
                                        html += "</div>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaLegalizacion' col-form-label'>Nota Legalización:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaLegalizacion' rows = '5' name = 'ParNotaLegalizacion' placeholder = 'Nota Legalización' >"+data.NotaLegalizacion[0]['Nota']+"</textarea>";
                                        html += "</div>";
                                    html += "</div>";
                                    html += "<div class = 'form-row my-3'>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaOP' col-form-label'>Nota Orden de Producción:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaOP' rows = '5' name = 'ParNotaOP' placeholder = 'Nota Orden de Producción' >"+data.NotaOP[0]['Nota']+"</textarea>";
                                        html += "</div>";
                                        html += "<div class='col col-sm-6'>";
                                            html += "<label for='ParNotaOC' col-form-label'>Nota Orden de Compra:</label>"
                                            html += "<textarea class = 'form-control' id = 'ParNotaOC' rows = '5' name = 'ParNotaOC' placeholder = 'Nota Orden de Compra' >"+data.NotaOC[0]['Nota']+"</textarea>";
                                        html += "</div>";
                                    html += "</div>";
                                    html += "<div class = '' >"
                                        html += "<table style = 'width:100%;'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText'>"
                                                    html += "<button class = 'btn btn-primary' onclick = 'GuardarNotasLegales("+data.NotaPpto[0]['IdEmpresa']+")' >Actualizar</button>"
                                                html += "</td>"
                                            html += "</tr>"
                                        html += "</table>"                                
                                    html += "</div>"
                            html += "</div>"
                        html += "</div>";
                    }

            $("._StLegal").html(html);

            $DataTable = $('#DocumentosLegales'+Hash).DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                scrollY: ResizePagTable(0.60),
                'ajax': {
                    'url':UrlGeneral + '1f5df208a260e3a371f121915a958498',
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
                        data: 'id',
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, full, meta) {
                           if( full.NombreEstado == 'Activo' ){
                               var htmlx = '<center>';
                                htmlx += '<div class="form-check Cursor">'
                                    htmlx += '<input class="form-check-input" type="checkbox" name = "DocumentosLegalesEmpresa[]" value="'+full.id+'" id="DocLegalEmpresa'+full.id+'">'
                                    htmlx += '<label class="form-check-label" for="DocLegalEmpresa'+data.id+'"></label>'
                                htmlx += '</div></center>'
                               return htmlx;
                            }else{
                                return '';
                            }

                        }
                   },
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

                            return '<center><img src = "../images/VER1_ICONO.png" class = "OptionIcon" onclick = "MostrarNotificadosDocumentos(\''+Hash+'\',\''+Hash2+'\',\''+full.id+'\')"/></center>';
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
                                htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                            htmlx += '</a></center>';
                            return htmlx;
                        }
                   },
                ],
                "order": [[7, "asc"],[6, "desc"]],
                "fnCreatedRow": function (row, data, index) {
                    var color = "";
                    switch (data.estado) {
                        case 0:
                            color = "tdBorders color-fondo-inactivo";
                            break;
                        case 1:
                            color = "tdBorders color-fondo-activo";
                            break;
                    }
                    if (color)
                        $(row).addClass(color);
                },
                "language": {
                    "url": UrlGeneral + "js/dataTable/Spanish.lang"
                },
            });
            TablaTIEmpresa(Hash,Hash2)
            $("#InfLg").tabs()
        }
    });

}

function GuardarNotasLegales(Id){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fb848a64d0d1ee482fae422d4cee28f5x',
        data:{Hash2:Id,_token:document.getElementsByName('_token')[0].value,
            ParNotaOC : $("#ParNotaOC").val(),
            ParNotaOP : $("#ParNotaOP").val(),
            ParNotaLegalizacion : $("#ParNotaLegalizacion").val(),
            ParNotaAnticipo : $("#ParNotaAnticipo").val(),
            ParNotaPpto : $("#ParNotaPpto").val(),
            ParNotaIR : $("#ParNotaIR").val(),
        },
        success:function(data){
            alert("Datos Guardados de manera correcta")
        }
    })
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
            'url':UrlGeneral + '0593d1d809053eac602093d18fe0abe6',
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

                    return '<center><img src = "../images/VER1_ICONO.png" class = "OptionIcon" onclick = "MostrarNotificadosTI(\''+Hash+'\',\''+Hash2+'\',\''+full.id+'\')"/></center>';
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
                        hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+Hash2+'\',0)">'
                            hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                    }else{
                        hx += '<span onclick = "EstadoImpuestoEmpresa(\''+full.Hash+'\',\''+Hash2+'\',1)">'
                            hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                    }
                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "fnCreatedRow": function (row, data, index) {
            var color = "";
            switch (data.estado) {
                case 0:
                    color = "tdBorders color-fondo-inactivo";
                    break;
                case 1:
                    color = "tdBorders color-fondo-activo";
                    break;
            }
            if (color)
                $(row).addClass(color);
        },
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TI'+Hash).css({'width':'100%'})
}

function NuevoNotificadoDocumento(H,Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fb848a64d0d1ee482fae422d4cee28f5',
        data:{Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div>"
                html += "<form id='NuevoDocumentoEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Tipo Notificación:</label>"
                            html += "<select class = 'form-control IdTipoNotificacion' id = 'IdTipoNotificacion' required onchange = 'MostrarOpcionesNotificacion()'>";
                                html += "<option value = '0'>Seleccione</option>"
                                html += "<option value = 'INTERNO'>Interno</option>"
                                html += "<option value = 'EXTERNO'>Externo</option>"
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='INTERNO HidenInformation col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Notificar a:</label>"
                            html += "<select class = 'form-control InternoNotificado' id = 'InternoNotificado' required >";
                                html += "<option value = ''>Seleccione</option>"
                                for(var i = 0; i < data.User.length; i++){
                                    html += "<option value = '"+data.User[i]['Hash']+"'>"+data.User[i]['NombreUsuario']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Notificar a:</label>"
                            html += "<input type = 'text' class = 'form-control NombreNotificado' id = 'NombreNotificado' value = '' placeholder = 'Nombre' />"
                        html += "</div>";
                        html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Correo:</label>"
                            html += "<input type = 'email' class = 'form-control CorreoNotificado' id = 'CorreoNotificado' value = '' placeholder = 'Correo' />"

                        html += "</div>";
                        html += "<div class='CenterText EXTERNO INTERNO HidenInformation col-sm-2 my-2'>";
                                html += "<label>Agregar</label><br><img src = '../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AddInformadosDocumentoLegal()'/>"
                        html += "</div>";
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Resumen de Notificados:</label>"
                            html += "<table class = 'tableNew'>"
                                html += "<thead class = 'TablaNotificados'>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Tipo</th>"
                                        html += "<th>Nombre</th>"
                                        html += "<th>Correo</th>"
                                        html += "<th>Opción</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>";
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    //html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'MostrarNotificadosDocumentos(\""+Hash+"\",\""+Hash2+"\",\""+H+"\");InformacionTributariaEmpresa("+Hash+",\""+Hash2+"\")'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoNotificadosDoc("+Hash+",\""+Hash2+"\",\""+H+"\")'>Guardar</button>";
            html += "</div>";
            $(".NotificadosDoc"+H).html(html);
        }
    })

}

function NuevoNotificadoTI(H,Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fb848a64d0d1ee482fae422d4cee28f5',
        data:{Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div>"
                html += "<form id='NuevoDocumentoEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Tipo Notificación:</label>"
                            html += "<select class = 'form-control IdTipoNotificacion' id = 'IdTipoNotificacion' required onchange = 'MostrarOpcionesNotificacion()'>";
                                html += "<option value = '0'>Seleccione</option>"
                                html += "<option value = 'INTERNO'>Interno</option>"
                                html += "<option value = 'EXTERNO'>Externo</option>"
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='INTERNO HidenInformation col-sm-4 my-2'>";
                            html += "<label for='ParLogo'>Notificar a:</label>"
                            html += "<select class = 'form-control InternoNotificado' id = 'InternoNotificado' required >";
                                html += "<option value = ''>Seleccione</option>"
                                for(var i = 0; i < data.User.length; i++){
                                    html += "<option value = '"+data.User[i]['Hash']+"'>"+data.User[i]['NombreUsuario']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>";
                        html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Notificar a:</label>"
                            html += "<input type = 'text' class = 'form-control NombreNotificado' id = 'NombreNotificado' value = '' placeholder = 'Nombre' />"
                        html += "</div>";
                        html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Correo:</label>"
                            html += "<input type = 'email' class = 'form-control CorreoNotificado' id = 'CorreoNotificado' value = '' placeholder = 'Correo' />"

                        html += "</div>";
                        html += "<div class='CenterText EXTERNO INTERNO HidenInformation col-sm-2 my-2'>";
                                html += "<label>Agregar</label><br><img src = '../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AddInformadosDocumentoLegal()'/>"
                        html += "</div>";
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Resumen de Notificados:</label>"
                            html += "<table class = 'tableNew'>"
                                html += "<thead class = 'TablaNotificados'>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Tipo</th>"
                                        html += "<th>Nombre</th>"
                                        html += "<th>Correo</th>"
                                        html += "<th>Opción</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>";
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoNotificadosTI("+Hash+",\""+Hash2+"\",\""+H+"\")'>Guardar</button>";
            html += "</div>";
            $(".NotificadosDoc"+H).html(html);
        }
    })

}

function GuardarNuevoNotificadosDoc(Hash,Hash2,H){
    if( NotificadosDocumentosLegales.length > 0 ){
        var formData = new FormData();
        formData.append("NotificadosDocumentosLegales", JSON.stringify(NotificadosDocumentosLegales));
        formData.append("IdDoc", H);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral + '9b01053b60f0fc25e8bb97759f46db6d',
            success:function(data){
                if( data.Info == 1 ){
                    NotificadosDocumentosLegales = [];
                    //CierraModal("myModal","ModalEdit");
                    ModalEdit2(0)
                    MostrarNotificadosDocumentos(Hash,Hash2,H);
                }else{
                    alert("No se han guardado los datos, por favor intente de nuevo");
                }
            }
        })
    }
}

function GuardarNuevoNotificadosTI(Hash,Hash2,H){
    if( NotificadosDocumentosLegales.length > 0 ){
        var formData = new FormData();
        formData.append("NotificadosDocumentosLegales", JSON.stringify(NotificadosDocumentosLegales));
        formData.append("IdDoc", H);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral + 'e8c9605df39f6efdc3615a9c3adaf4d7',
            success:function(data){
                if( data.Info == 1 ){
                    NotificadosDocumentosLegales = [];
                    //CierraModal("myModal","ModalEdit");
                    ModalEdit2(0)
                    MostrarNotificadosTI(Hash,Hash2,H);
                }else{
                    alert("No se han guardado los datos, por favor intente de nuevo");
                }
            }
        })
    }
}

function MostrarNotificadosDocumentos(Hash,Hash2,H){
    ModalEdit2(1)
    $.ajax({
        type:'POST',
        url: UrlGeneral + '69eb1f4a446576ab13051b377ba246ca',
        data:{Hash:H,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Notificados "+ $(".NameComercial"+Hash).text() +" " +$(".TipoDoc"+H).text() 
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body NotificadosDoc"+H+"'>";
                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'NuevoNotificadoDocumento("+H+",\""+Hash+"\",\""+Hash2+"\")' />";
                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevoNotificadoDocumento("+H+",\""+Hash+"\",\""+Hash2+"\")' > Nuevo Notificado </span>";
                html += "<br><br><table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Tipo</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                        html += "<th></th>"
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
                            html += "<td class = 'CenterText'>"
                                html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarNotificadoDoc("+data.Lista[i]['Id']+")'/>"
                            html += "</td>"
                        html += "</tr>"
                    }
                html += "</table >"
            html += "</div>";

            $(".content_modal2").html(html)
           
        }
    });
}

function MostrarNotificadosTI(Hash,Hash2,H){
    ModalEdit2(1)
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fd625194724a0f13f6605de2581df425',
        data:{Hash:H,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Notificados "+ $(".NameComercial"+Hash).text() +"<BR>" +$(".TipoDocTI"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body NotificadosDoc"+H+"'>";
                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'NuevoNotificadoTI("+H+",\""+Hash+"\",\""+Hash2+"\")' />";
                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevoNotificadoTI("+H+",\""+Hash+"\",\""+Hash2+"\")' > Nuevo Notificado </span>";
                html += "<br><br><table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Tipo</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                        html += "<th></th>"
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
                            html += "<td class = 'CenterText'>"
                                html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarNotificadoTI("+data.Lista[i]['Id']+")'/>"
                            html += "</td>"
                        html += "</tr>"
                    }
                html += "</table >"
            html += "</div>";

            $(".content_modal2").html(html)
        }
    });
}

function BuscarDocumentosEmpresa(){
    SearchTable = $("#TextBusqueda").val();
    $DataTable.draw();
    DataTableModel()
}



function CrearDocumentoLegalEmpresa(Hash,Hash2){
    NotificadosDocumentosLegales = [];

    ModalEdit2(1)
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fb848a64d0d1ee482fae422d4cee28f5',
        data:{Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Documento Legal "+ $(".NameComercial"+Hash).text() 
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                if( data.Lista.length == 0 ){
                    html += "<table class = 'TableNew'>"
                        html += "<tr>"
                            html += "<td class = 'CenterText'>No se han creado Tipos de Documentos Legales.</td>"
                        html += "</tr>"
                    html += "</table>"
                }else{
                    html += "<div>"
                    html += "<form id='NuevoDocumentoEmpresa' method='post' action='javascript:void(0)'>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='IdTipoDocumentox' col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Documento:</label>"
                                html += "<select class = 'form-control' name = 'IdTipoDocumentox' id = 'IdTipoDocumentox' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Lista.length; i++){
                                        html += "<option value = '"+data.Lista[i]['Hash']+"'>"+data.Lista[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                                html += "<div class='custom-file'>"
                                    html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                    html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                                html += "</div>";

                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='FechaVencimiento' col-form-label'><span class = 'Obligatorio'>(*)</span>  Fecha Vencimiento:</label>"
                                html += "<input type='date' class='DatePicker form-control' id='FechaVencimiento' name='FechaVencimiento' placeholder='Fecha Vencimiento' value = '' />";
                            html += "</div>";
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col-sm-4 my-2'>";
                                html += "<label for='ParLogo'>Tipo Notificación:</label>"
                                html += "<select class = 'form-control IdTipoNotificacion' id = 'IdTipoNotificacion' required onchange = 'MostrarOpcionesNotificacion()'>";
                                    html += "<option value = '0'>Seleccione</option>"
                                    html += "<option value = 'INTERNO'>Interno</option>"
                                    html += "<option value = 'EXTERNO'>Externo</option>"
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='INTERNO HidenInformation col-sm-4 my-2'>";
                                html += "<label for='ParLogo'>Notificar a:</label>"
                                html += "<select class = 'form-control InternoNotificado' id = 'InternoNotificado' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.User.length; i++){
                                        html += "<option value = '"+data.User[i]['Hash']+"'>"+data.User[i]['NombreUsuario']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Notificar a:</label>"
                                html += "<input type = 'text' class = 'form-control NombreNotificado' id = 'NombreNotificado' value = '' placeholder = 'Nombre' />"
                            html += "</div>";
                            html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Correo:</label>"
                                html += "<input type = 'email' class = 'form-control CorreoNotificado' id = 'CorreoNotificado' value = '' placeholder = 'Correo' />"

                            html += "</div>";
                            html += "<div class='CenterText EXTERNO INTERNO HidenInformation col-sm-2 my-2'>";
                                    html += "<label>Agregar</label><br><img src = '../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AddInformadosDocumentoLegal()'/>"
                            html += "</div>";
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col-sm-12 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Resumen de Notificados:</label>"
                                html += "<table class = 'tableNew'>"
                                    html += "<thead class = 'TablaNotificados'>"
                                        html += "<tr>"
                                            html += "<th>No.</th>"
                                            html += "<th>Tipo</th>"
                                            html += "<th>Nombre</th>"
                                            html += "<th>Correo</th>"
                                            html += "<th>Opción</th>"
                                        html += "</tr>"
                                    html += "</thead>"
                                html += "</table>"
                            html += "</div>";
                        html += "</div>"

                    html += "</div>";

                }
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' data-dismiss='modal' aria-label='Close' onclick = 'GuardarDocumentoLegalEmpresa("+Hash+",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            GenerarTablaNotificados();
        }
    });
}

function CrearTILegalEmpresa(Hash,Hash2){
    NotificadosDocumentosLegales = [];

    ModalEdit2(0)
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'ac7beee27293ee4f34cd88cff8f7232e',
        data:{Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nueva Tarifa o Impuesto "+ $(".NameComercial"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form id='NuevoDocumentoEmpresa' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    if( data.Lista.length == 0 ){
                        html += "<table class = 'TableNew'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>No se han creado Tarifas o Impuesto Generales.</td>"
                            html += "</tr>"
                        html += "</table>"
                    }else{
                        html += "<div>"

                        html += "<div class = 'form-row FormNuevoTI'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='IdTipoDocumentox' col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Tarifa / Impuesto:</label>"
                                html += "<select class = 'form-control' name = 'IdTipoDocumentox' id = 'IdTipoDocumentox' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Lista.length; i++){
                                        html += "<option value = '"+data.Lista[i]['Hash']+"'>"+data.Lista[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='FechaVencimiento' col-form-label'><span class = 'Obligatorio'>(*)</span>  Fecha Vencimiento:</label>"
                                html += "<input type='date' class='DatePicker form-control' id='FechaVencimiento' name='FechaVencimiento' placeholder='Fecha Vencimiento' value = '' />";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='TipoValor' col-form-label'><span class = 'Obligatorio'>(*)</span>  Tipo Valor:</label>"
                                html += "<select class = 'form-control' name = 'TipoValor' id = 'TipoValor' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    html += "<option value = 'PORCENTAJE'>Porcentaje</option>"
                                    html += "<option value = 'VALOR'>Valor</option>"
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='Valor' col-form-label'><span class = 'Obligatorio'>(*)</span>  Valor:</label>"
                                html += "<input type='text' class='DatePicker form-control ValorX ' id='ValorX' name='ValorX' min = '0' onkeyup = 'FormatCampoNum(\"ValorX\",\"valorNum\")'placeholder='0' value = '0' />";
                                html += "<span class = 'valorNum' style = 'display:none;'>0</span>"
                            html += "</div>";
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='TipoValor' col-form-label'><span class = 'Obligatorio'>(*)</span>  Uso:</label>"
                                html += "<select class = 'form-control' name = 'Appto' id = 'Appto' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    html += "<option value = 'IP'>Impuesto a Cliente sobre Presupuesto (Externo)</option>"
                                    html += "<option value = 'ICP'>Impuestos Comisión Presupuesto (Interno)</option>"
                                    html += "<option value = 'IOR'>Impuesto para Ordenación (Interno)</option>"
                                    html += "<option value = 'DCP'>Descuento a Cliente sobre Presupuesto (Externo/Interno)</option>"
                                    html += "<option value = 'IRP'>Impuesto Resumen Presupuesto (Interno)</option>"
                                    html += "<option value = 'IPFP'>Impuesto Pagos Facturas Proveedor</option>"
                                html += "</select>"
                            html += "</div>";
                            /*html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='TipoValor' col-form-label'><span class = 'Obligatorio'>(*)</span>  ¿Aplica para OP?:</label>"
                                html += "<select class = 'form-control' name = 'Aop' id = 'Aop' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    html += "<option value = '1'>Si</option>"
                                    html += "<option value = '0'>No</option>"
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='TipoValor' col-form-label'><span class = 'Obligatorio'>(*)</span>  ¿Aplica para OC?:</label>"
                                html += "<select class = 'form-control' name = 'Aoc' id = 'Aoc' required>";
                                    html += "<option value = ''>Seleccione</option>"
                                    html += "<option value = '1'>Si</option>"
                                    html += "<option value = '0'>No</option>"
                                html += "</select>"
                            html += "</div>";*/
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Tipo Notificación:</label>"
                                html += "<select class = 'form-control IdTipoNotificacion' id = 'IdTipoNotificacion' required onchange = 'MostrarOpcionesNotificacion()'>";
                                    html += "<option value = '0'>Seleccione</option>"
                                    html += "<option value = 'INTERNO'>Interno</option>"
                                    html += "<option value = 'EXTERNO'>Externo</option>"
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='INTERNO HidenInformation col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Notificar a:</label>"
                                html += "<select class = 'form-control InternoNotificado' id = 'InternoNotificado' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.User.length; i++){
                                        html += "<option value = '"+data.User[i]['Hash']+"'>"+data.User[i]['NombreUsuario']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Notificar a:</label>"
                                html += "<input type = 'text' class = 'form-control NombreNotificado' id = 'NombreNotificado' value = '' placeholder = 'Nombre' />"
                            html += "</div>";
                            html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Correo:</label>"
                                html += "<input type = 'email' class = 'form-control CorreoNotificado' id = 'CorreoNotificado' value = '' placeholder = 'Correo' />"

                            html += "</div>";
                            html += "<div class='CenterText EXTERNO INTERNO HidenInformation col-sm-2 my-2'>";
                                    html += "<label>Agregar</label><br><img src = '../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AddInformadosDocumentoLegal()'/>"
                            html += "</div>";
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col-sm-12 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Resumen de Notificados:</label>"
                                html += "<table class = 'tableNew'>"
                                    html += "<thead class = 'TablaNotificados'>"
                                        html += "<tr>"
                                            html += "<th>No.</th>"
                                            html += "<th>Tipo</th>"
                                            html += "<th>Nombre</th>"
                                            html += "<th>Correo</th>"
                                            html += "<th>Opción</th>"
                                        html += "</tr>"
                                    html += "</thead>"
                                html += "</table>"
                            html += "</div>";
                        html += "</div>"

                    html += "</div>";

                }
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' data-dismiss='modal' aria-label='Close' onclick = 'GuardarTIEmpresa("+Hash+",\""+Hash2+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            $FormValidate = $(".FormNuevoTI").validate({
                rules: {
                    IdTipoDocumentox : {
                        required: true,
                        minlength:1
                    },
                    FechaVencimiento : {
                        required: true,
                        minlength:10
                    },
                    TipoValor : {
                        required: true,
                        minlength:1
                    },
                    ValorX : {
                        required: true,
                        minlength:1
                    },
                    Appto : {
                        required: true,
                        minlength:1
                    },
                    /*
                     
                    Aoc : {
                        required: true,
                        minlength:1
                    },
                    Aop : {
                        required: true,
                        minlength:1
                    },
                     */
                }
            });
            GenerarTablaNotificados();
        }
    });
}

function GuardarTIEmpresa(Hash,Hash2){
    //MostrarTabsMenu
    if( $FormValidate.form() == true ){
        if( NotificadosDocumentosLegales.length > 0 ){
            var formData = new FormData();
            formData.append("Hash", Hash);
            formData.append("Hash2", Hash2);

            formData.append("IdTipoDocumentox", $("#IdTipoDocumentox").val());
            formData.append("FechaVencimiento", $("#FechaVencimiento").val());
            formData.append("TipoValor", $("#TipoValor").val());
            formData.append("ValorX", $(".valorNum").text());
            formData.append("Appto", $("#Appto").val());
            //formData.append("Aoc", $("#Aoc").val());
            //formData.append("Aop", $("#Aop").val());
            formData.append("NotificadosDocumentosLegales", JSON.stringify(NotificadosDocumentosLegales));

            $.ajax({

                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url:UrlGeneral+'2081d6c7c206dc988fefb95620debe4d',
                success:function(data){

                    if( data.Info == 1 ){
                        NotificadosDocumentosLegales = [];
                        ModalEdit2(0)
                        InformacionTributariaEmpresa(Hash,Hash2);
                        
                    }else{
                        alert("No se han guardado los datos, por favor intente de nuevo");
                    }
                }
            })
        }else{
            alert("No se han ingresado Personas a Notificar.")
        }
    }
}

function MostrarOpcionesNotificacion(){

    $(".INTERNO,.EXTERNO").hide();
    $(".INTERNO select").val('');
    $(".EXTERNO input").val('');
    if( $("#IdTipoNotificacion").val() == '0' ){
    }else if( $("#IdTipoNotificacion").val() == 'INTERNO' ){
        $(".INTERNO").show();

    }else if( $("#IdTipoNotificacion").val() == 'EXTERNO' ){
        $(".EXTERNO").show();
    }
}

function GenerarTablaNotificados(){
    //TablaNotificados
    var html = "";
    if( NotificadosDocumentosLegales.length == 0 ){
        html += "<tr class = 'ItemsNotificadosDocLegales'>"
            html += "<td colspan = '5' class = 'CenterText'>No se han registrado Personas a Notificar.</td>"
        html += "</tr>"
    }
    for(var i = 0; i < NotificadosDocumentosLegales.length;i++){
        html += "<tr class = 'ItemsNotificadosDocLegales'>"
            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
            html += "<td>"+NotificadosDocumentosLegales[i]['Tipo']+"</td>"
            html += "<td>"+NotificadosDocumentosLegales[i]['Nombre']+"</td>"
            html += "<td>"+NotificadosDocumentosLegales[i]['Correo']+"</td>"
            html += "<td class = 'CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarNotificadoDocLegal("+i+")' /></td>"
        html += "</tr>"
    }
    $(".ItemsNotificadosDocLegales").remove();
    $(".TablaNotificados").after(html)
}

function EliminarNotificadoDocLegal(i){
    NotificadosDocumentosLegales.splice( i, 1 );
    GenerarTablaNotificados();
}

function EliminarNotificadoDoc(id){
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'f1327f6684072f7775b0d0507f5b9b83',
        data:{Hash:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $(".NotificadoDoc"+id).remove();
        }
    });
}

function EliminarNotificadoTI(id){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '5f91146476f213d88853a6d9accadafc',
        data:{Hash:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $(".NotificadoDoc"+id).remove();
        }
    });
}

function AddInformadosDocumentoLegal(){
    if( $("#IdTipoNotificacion").val() != '0' ){
        if( $("#IdTipoNotificacion").val() == 'INTERNO' ){
            if( $("#InternoNotificado").val() != '' ){
                NotificadosDocumentosLegales.push({
                        'Id':$("#InternoNotificado").val(),
                        'Tipo':'Interno',
                        'Nombre':$( "#InternoNotificado option:selected" ).text(),
                        'Correo':''
                    })
                GenerarTablaNotificados();
                $(".INTERNO select").val('');
                $("#IdTipoNotificacion").val('0')
                $(".INTERNO,.EXTERNO").hide();
            }else{
                alert("No se ha Seleccionado el Usuario al cuál se va a notificar.");
            }

        }else if( $("#IdTipoNotificacion").val() == 'EXTERNO' ){
            if( $("#NombreNotificado").val() != ''){
                if( ValidadorEmail($("#CorreoNotificado").val()) == true ){
                    NotificadosDocumentosLegales.push({
                        'Id':0,
                        'Tipo':'Externo',
                        'Nombre':$("#NombreNotificado").val(),
                        'Correo':$("#CorreoNotificado").val()
                    })
                    GenerarTablaNotificados();
                    $(".EXTERNO input").val('');
                    $("#IdTipoNotificacion").val('0')
                    $(".INTERNO,.EXTERNO").hide();
                }else{
                    alert("No se han ingresado los datos completos del Notificado Externo.");
                }
            }else{
                alert("No se han ingresado los datos completos del Notificado Externo.");
            }
        }

    }else{
        alert("No se ha seleccionado el tipo de Notificador.");
        $(".INTERNO,.EXTERNO").hide();
        $(".INTERNO select").val('');
        $(".EXTERNO input").val('');
    }
}

function GuardarDocumentoLegalEmpresa(Hash,Hash2){
    if( $("#IdTipoDocumento").val().length > 0 ){
        if( $("#ParLogo").val().length > 0 ){
            if( $("#FechaVencimiento").val().length > 0 ){
                var formData = new FormData();
                formData.append("Hash", Hash);
                formData.append("Hash2", Hash2);
                formData.append("IdTipoDocumento", $("#IdTipoDocumentox").val());
                formData.append("FechaVencimiento", $("#FechaVencimiento").val());
                formData.append("NotificadosDocumentosLegales", JSON.stringify(NotificadosDocumentosLegales));


                var archivos = document.getElementById("ParLogo");
                for (var i = 0; i < archivos.files.length; i++) {
                    formData.append("ParLogo", archivos.files[i]);
                }

                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url:UrlGeneral + '17677da95906ad32509407e2fc215d40',
                    success:function(data){

                        if( data.Info == 1 ){
                            NotificadosDocumentosLegales = [];
                            
                            InformacionTributariaEmpresa(Hash,Hash2);
                            ModalEdit2(0)
                            ModalEdit(0)
                        }else{
                            alert("No se han guardado los datos, por favor intente de nuevo");
                        }
                    }
                })

            }else{
                alert("No se ha ingresado la Fecha de Vencimiento del Documento.");
            }
        }else{
            alert("No se ha seleccionado el Archivo a Cargar.");
        }
    }else{
        alert("No se ha seleccionado el Tipo de Documento.");
    }
}

function EnviarDocumentosLegalesEmpresa(Hash,Hash2){
    ModalEdit2(1)
    Ids = [];
    $('input[name="DocumentosLegalesEmpresa[]"]:checked').each(function(index, elem) {
        Ids.push({
            id:$(elem).val(),
            'Nombre': $(".TipoDoc"+$(elem).val()).text()
        });
    });

    

    if( Ids.length > 0 ){
        NotificadosDocumentosLegales = [];
            $.ajax({
            type:'POST',
            url: UrlGeneral +  'fb848a64d0d1ee482fae422d4cee28f5',
            data:{Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                TituloVentana = "Enviar Documentos Legales "+ $(".NameComercial"+Hash).text() 
                ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
                FuncionesHeader = ""
                FuncionesRegresar = "ModalEdit2(0)"
                html += "<div class='modal-header'>";
                    html += GeneradorHeadersVentanas()
                html += "</div>";
                html += "<div class='modal-body'>";
                    if( data.Lista.length == 0 ){
                        html += "<table class = 'TableNew'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>No se han creado Tipos de Documentos Legales.</td>"
                            html += "</tr>"
                        html += "</table>"
                    }else{
                        html += "<div>"
                        html += "<form id='NuevoDocumentoEmpresa' method='post' action='javascript:void(0)'>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='IdTipoDocumentox' col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto Correo:</label>"
                                    html += "<input type = 'text' class = 'form-control' id = 'AsuntoCorreoDLE' name = 'AsuntoCorreoDLE'/>"
                                html += "</div>";
                            html += "</div>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='IdTipoDocumentox' col-form-label'><span class = 'Obligatorio'>(*)</span> Cuerpo Correo:</label>"
                                    html += "<textarea class = 'form-control' name = 'CuerpoCorreoDLE' ID = 'CuerpoCorreoDLE'></textarea>"
                                html += "</div>";
                            html += "</div>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col-sm-4 my-2'>";
                                    html += "<label for='ParLogo'>Tipo de Notificado:</label>"
                                    html += "<select class = 'form-control IdTipoNotificacion' id = 'IdTipoNotificacion' required onchange = 'MostrarOpcionesNotificacion()'>";
                                        html += "<option value = '0'>Seleccione</option>"
                                        html += "<option value = 'INTERNO'>Interno</option>"
                                        html += "<option value = 'EXTERNO'>Externo</option>"
                                    html += "</select>"
                                html += "</div>";
                                html += "<div class='INTERNO HidenInformation col-sm-4 my-2'>";
                                    html += "<label for='ParLogo'>Notificar a:</label>"
                                    html += "<select class = 'form-control InternoNotificado' id = 'InternoNotificado' required >";
                                        html += "<option value = ''>Seleccione</option>"
                                        for(var i = 0; i < data.User.length; i++){
                                            html += "<option value = '"+data.User[i]['Hash']+"'>"+data.User[i]['NombreUsuario']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>";
                                html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                    html += "<label for='ParLogo'>Notificar a:</label>"
                                    html += "<input type = 'text' class = 'form-control NombreNotificado' id = 'NombreNotificado' value = '' placeholder = 'Nombre' />"
                                html += "</div>";
                                html += "<div class='EXTERNO HidenInformation col-sm-3 my-2'>";
                                    html += "<label for='ParLogo'>Correo:</label>"
                                    html += "<input type = 'email' class = 'form-control CorreoNotificado' id = 'CorreoNotificado' value = '' placeholder = 'Correo' />"

                                html += "</div>";
                                html += "<div class='CenterText EXTERNO INTERNO HidenInformation col-sm-2 my-2'>";
                                        html += "<label>Agregar</label><br><img src = '../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AddInformadosDocumentoLegal()'/>"
                                html += "</div>";
                            html += "</div>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col-sm-12 my-2'>";
                                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Resumen de Notificados:</label>"
                                    html += "<table class = 'tableNew'>"
                                        html += "<thead class = 'TablaNotificados'>"
                                            html += "<tr>"
                                                html += "<th>No.</th>"
                                                html += "<th>Tipo</th>"
                                                html += "<th>Nombre</th>"
                                                html += "<th>Correo</th>"
                                                html += "<th>Opción</th>"
                                            html += "</tr>"
                                        html += "</thead>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col-sm-12 my-2'>";
                                    html += "<label for='ParLogo'>Resumen de Documentos:</label>"
                                    html += "<table class = 'tableNew'>"
                                        html += "<thead >"
                                            html += "<tr>"
                                                html += "<th>No.</th>"
                                                html += "<th>Tipo Documento</th>"
                                            html += "</tr>"
                                        html += "</thead>"
                                        for(var i = 0; i < Ids.length; i++){
                                            html += "<tr>"
                                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                                html += "<td >"+Ids[i]['Nombre']+"</td>"
                                            html += "</tr>"
                                        }
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>"

                        html += "</div>";

                    }
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'EnviarDocumentosLegalesEmpresaGuardar("+Hash+",\""+Hash2+"\")'>Guardar</button>";
                html += "</div>";
                html += "</form>";
                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
                GenerarTablaNotificados();
            }
        });
    }else{
        var html = "";
        TituloVentana = "Enviar Documentos Legales "+ $(".NameComercial"+Hash).text() 
        ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit2(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<p>No se han seleccionado Documentos</p>"
        html += "</div>"
        $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
        $(".content_modal2").html(html);
    }
}

function EnviarDocumentosLegalesEmpresaGuardar(Hash,Hash2){

    if( $("#AsuntoCorreoDLE").val().length > 0 ){
        if( $("#CuerpoCorreoDLE").val().length > 0 ){
            if( NotificadosDocumentosLegales.length > 0 ){
                var formData = new FormData();
                formData.append("Hash", Hash);
                formData.append("Hash2", Hash2);
                formData.append("UrlUniversal", "http://localhost/PProcess3/public/");
                formData.append("AsuntoCorreoDLE", $("#AsuntoCorreoDLE").val());
                formData.append("CuerpoCorreoDLE", $("#CuerpoCorreoDLE").val());
                formData.append("NotificadosDocumentosLegales", JSON.stringify(NotificadosDocumentosLegales));
                formData.append("DocumentosLegales", JSON.stringify(Ids));

                $.ajax({

                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url:UrlGeneral+'ed138b092896ce0ac89db66f784eb8a5',
                    success:function(data){

                        if( data.Info == 1 ){
                            alert("Documentos Enviados Correctamente.");
                            NotificadosDocumentosLegales = [];
                            ModaEdit2(0)
                            InformacionTributariaEmpresa(Hash,Hash2);
                        }else{
                            alert("No se han guardado los datos, por favor intente de nuevo");
                            ModaEdit2(1)
                        }
                    }
                })

            }else{
                alert("No se ha ingresado a quién Enviar el Correo.");
            }
        }else{
            alert("No se ha ingresdo el Cuerpo del Correo");
        }
    }else{
        alert("No se ha ingresado el Asunto del Correo.");
    }
}

function UnidadesNegocioEmpresa(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '56d1bf7e94fe8a2f989557644aa30ab9',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var urlLogoEmpresa = "";//`${URLDatosEmpresa}${data.Empresa[0].Logo === null ? '' : Hash}/${data.Empresa[0].Logo === null ? '_Datos.png' : data.Empresa[0].Logo}`;
            if( data.Empresa[0].Logo == null ){
                urlLogoEmpresa = "images/menu/_Datos.png";
            }else{
                urlLogoEmpresa = URLDatosEmpresa+"/"+Hash+"/"+data.Empresa[0].Logo
            }
            
                html += "<div Id = 'TabsMenu'>";
                    html += "<ul >";

                    if( data.INFORMACION_EMPRESA_UND.length > 0 ){
                        html += "<li onclick = '' >"
                            html += "<a href = '#TabsMenu-1'>"
                                html += "<span>Unidades de Negocio</span>"
                            html += "</a>"
                        html +="</li>";
                    }

                    if( data.INFORMACION_EMPRESA_AREAS.length > 0 ){
                        html += "<li onclick = 'BuscarTablaEmpresaAreaUnidadesNegocio("+Hash+",\""+Hash2+"\")'>"
                            html += "<a href = '#TabsMenu-2'>"
                                html += "<span>Áreas</span>"
                            html += "</a>"
                        html +="</li>";
                    }
                    if( data.INFORMACION_EMPRESA_CARGOS.length > 0 ){
                        html += "<li onclick = 'BuscarTablaEmpresaCargoAreaUnidadesNegocio("+Hash+",\""+Hash2+"\")'>"
                            html += "<a href = '#TabsMenu-3'>"
                                html += "<span>Cargos</span>"
                            html += "</a>"
                        html +="</li>";
                    }
                    html += "</ul>";

                    if( data.INFORMACION_EMPRESA_UND.length > 0 ){
                        html += "<div id = 'TabsMenu-1'>";
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                if( data.INFORMACION_EMPRESA_UND_CREAR.length > 0 ){
                                    html += "<td style = 'border:0px;'>"
                                        html += "<div class ='ContentSubMolButton'>"
                                            html += "<table width ='100%' class = 'ContenedorLink'>"
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;' class = 'CenterText'>"
                                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'IconMenuP Cursor' onclick = 'CrearUnidadEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit' />"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;' >"
                                                        html += "<span class='Cursor' onclick = 'CrearUnidadEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit' >Nueva Unidad de Negocio</span>"
                                                    html += "</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</div>"
                                    html += "</td>"
                                }
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>";
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
                                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaEmpresaUnidadesNegocio("+Hash+",0)'/>"
                                    html += "</div>"
                                html += "</div><br>";
                                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable UnidadesNegocio"+Hash+"' id = 'UnidadesNegocio"+Hash+"'>";
                                    html += "<thead>"
                                        html += "<tr>"
                                            html += "<th width = '20px'>No.</th>"
                                            html += "<th width = '100px'>Nombre</th>"
                                            html += "<th>Mínimo<br>Rentabilidad</th>"
                                            html += "<th width = '200px'>Descripción</th>"
                                            html += "<th>Plan de Negocios</th>"
                                            html += "<th width = '200px'>Cargado Por</th>"
                                            html += "<th>Cargado El</th>"
                                            html += "<th>Estado</th>"
                                            html += "<th>Editar</th>"
                                        html += "</tr>"
                                    html += "</thead>"
                                html += "</table></div>";
                            }

                        html += "</div>";
                    }
                    if( data.INFORMACION_EMPRESA_AREAS.length > 0 ){
                        html += "<div id = 'TabsMenu-2'>";
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                if( data.INFORMACION_EMPRESA_AREAS_CREAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearUnidadAreaEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearUnidadAreaEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Nueva Área</span>";
                                    html += "</td>"
                                }
                                if( data.INFORMACION_EMPRESA_AREAS_REORGANIZAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'ReorganizarAreasUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'ReorganizarAreasUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Ordenar Áreas</span>";
                                    html += "</td>"
                                }
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>";
                            if( data.INFORMACION_EMPRESA_AREAS_CONSULTAR.length > 0 ){
                                html += "<div class = 'form-row'>";
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                                        html += "<select class = 'form-control' name = 'Area_Estado' id = 'Area_Estado' >";
                                            html += "<option value = '-1' >Todos</option>"
                                            html += "<option value = '1' selected>Activas</option>"
                                            html += "<option value = '0' >Inactivas</option>"
                                        html += "</select>"
                                    html += "</div>"
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                                        html += "<select class = 'form-control' name = 'Area_Unidad' id = 'Area_Unidad' >";
                                            html += "<option value = '0' >Todas</option>"
                                        html += "</select>"
                                    html += "</div>"
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<label for='IdTipoDoc'>Texto:</label>"
                                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Area_TextBusqueda' name = 'Area_TextBusqueda' />"
                                    html += "</div>"
                                    html += "<div class='col col-sm-3 my-2'>"
                                        html += "<p></p>"
                                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaEmpresaAreaUnidadesNegocio("+Hash+",\""+Hash2+"\")'/>"
                                    html += "</div>"
                                html += "</div><br>";
                                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AreasUnidadesNegocio"+Hash+"' id = 'AreasUnidadesNegocio"+Hash+"'>";
                                    html += "<thead>"
                                        html += "<tr>"
                                            html += "<th>No.</th>"
                                            html += "<th>Nombre</th>"
                                            
                                            html += "<th>Descripción</th>"
                                            //html += "<th>No. Empleados</th>"
                                            html += "<th>Cargado Por</th>"
                                            html += "<th>Cargado El</th>"
                                            html += "<th>Estado</th>"
                                            html += "<th>Editar</th>"
                                        html += "</tr>"
                                    html += "</thead>"
                                html += "</table></div>";
                            }
                        html += "</div>";
                    }

                    if( data.INFORMACION_EMPRESA_CARGOS.length > 0 ){
                        html += "<div id = 'TabsMenu-3'>";
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                if( data.INFORMACION_EMPRESA_CARGOS_CREAR.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearCargoEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearCargoEmpresa("+Hash+",\""+Hash2+"\")' data-toggle='modal' data-target='#ModalEdit2'>Nuevo Cargo</span>";
                                    html += "</td>"
                                }
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>";
                            if( data.INFORMACION_EMPRESA_CARGOS_CONSULTAR.length > 0 ){
                                html += "<div class = 'form-row'>";
                                    html += "<div class='col col-sm-2 my-2'>"
                                        html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                                        html += "<select class = 'form-control' name = 'Cargo_Unidad' id = 'Cargo_Unidad' onchange = 'AreasUnidadNegocioEmpresa()'>";
                                            html += "<option value = '0' >Todas</option>"
                                        html += "</select>"
                                    html += "</div>"
                                    html += "<div class='col col-sm-2 my-2'>"
                                        html += "<label for='IdTipoDoc' col-form-label'>Área:</label>"
                                        html += "<select class = 'form-control' name = 'Cargo_Area' id = 'Cargo_Area'>";
                                            html += "<option value = '0' >Todas</option>"
                                        html += "</select>"
                                    html += "</div>"
                                    html += "<div class='col col-sm-2 my-2'>"
                                        html += "<label for='IdTipoDoc'>Texto:</label>"
                                        html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Cargo_TextBusqueda' name = 'Cargo_TextBusqueda' />"
                                    html += "</div>"
                                    html += "<div class='col col-sm-2 my-2'>"
                                        html += "<p></p>"
                                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaEmpresaCargoAreaUnidadesNegocio("+Hash+",\""+Hash2+"\")'/>"
                                    html += "</div>"
                                html += "</div><br>";
                                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable CargosAreasUnidadesNegocio"+Hash+"' id = 'CargosAreasUnidadesNegocio"+Hash+"'>";
                                    html += "<thead>"
                                        html += "<tr>"
                                            html += "<th width = '20px'>No.</th>"
                                            html += "<th>Unidad</th>"
                                            html += "<th>Área</th>"
                                            html += "<th>Cargo</th>"
                                            html += "<th>Funciones</th>"
                                            //html += "<th>No. Empleados</th>"
                                            html += "<th>Cargado Por</th>"
                                            html += "<th>Cargado El</th>"
                                            html += "<th>Editar</th>"
                                        html += "</tr>"
                                    html += "</thead>"
                                html += "</table></div>";
                            }

                        html += "</div>";
                    }

            $("._STeSTRU").html(html);
            $( "#TabsMenu" ).tabs();
            
            Datos_TablaEmpresa_UnidadesNegocio(Hash,Hash2)
            Datos_TablaEmpresa_Areas(Hash,Hash2)
            Datos_TablaEmpresa_Cargos(Hash,Hash2)
        }
    });
}

function CrearUnidadEmpresa(Hash,Hash2){
    
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'c7ffbb5103c450d30b3ebb2cd7ab9135',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Crear Unidad de Negocio"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormNuevaUnidadNegocioEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Unidad:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombreunidad' id = 'nombreunidad' class = 'form-control' required/>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje mínimo de Rentabilidad:</label>"
                        html += "<input autocomplete = 'off' type = 'number' min = '0' name = 'porcentajerentabilidad' id = 'porcentajerentabilidad' class = 'form-control' required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción de la Unidad:</label>"
                        html += "<textarea name = 'descripcionunidad' id = 'descripcionunidad' class = 'form-control' required></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'CrearUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            ResizeModal(0.43)
            $FormValidate = $(".FormNuevaUnidadNegocioEmpresa"+Hash).validate({
                rules: {
                    nombreunidad : {
                        required: true,
                        minlength:2
                    },
                    porcentajerentabilidad : {
                        required: true,
                        minlength:1
                    },
                    descripcionunidad : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function CrearUnidadAreaEmpresa(Hash,Hash2){
    
    $.ajax({
        type:'POST',
        url:UrlGeneral + '0273c8d691adf8d426f672e7ccbda192',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nueva Area "
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevaUnidadAreaNegocioEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Seleccione la Unidad de Negocio:</label>"
                        html += "<select name = 'idunidad' id = 'idunidad' class = 'form-control' required>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.ListaUnd.length; i++){
                                html += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Área:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombrearea' id = 'nombrearea' class = 'form-control' required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción del Área:</label>"
                        html += "<textarea name = 'descripcionarea' id = 'descripcionarea' class = 'form-control' required></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'CrearAreaUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            ModalEdit2(1)
            ResizeModal(0.45)
            $FormValidate = $(".FormNuevaUnidadAreaNegocioEmpresa"+Hash).validate({
                rules: {
                    idunidad : {
                        required: true,
                        minlength:1
                    },
                    nombrearea : {
                        required: true,
                        minlength:2
                    },
                    descripcionarea : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function CrearCargoEmpresa(Hash,Hash2){
    $('#ModalEdit').modal('hide');
    $.ajax({
        type:'POST',
        url:UrlGeneral+'0273c8d691adf8d426f672e7ccbda192',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Nuevo Cargo"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormNuevaCargoEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Seleccione la Unidad de Negocio:</label>"
                        html += "<select name = 'idunidadx' id = 'idunidadx' class = 'form-control' onchange = 'CargarAreasUnidadNegocio_List()'required>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.ListaUnd.length; i++){
                                html += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Seleccione el Área:</label>"
                        html += "<select name = 'idarea' id = 'idarea' class = 'form-control' required>"
                            html += "<option value = ''>Seleccione</option>"
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Cargo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombrecargo' id = 'nombrecargo' class = 'form-control' required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Funciones del Cargo:</label>"
                        html += "<textarea name = 'descripcioncargo' id = 'descripcioncargo' class = 'form-control' required></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' data-dismiss='modal'  onclick = 'CrearnEWCargoEmpresa("+Hash+",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            ResizeModal(0.55)
            $FormValidate = $(".FormNuevaCargoEmpresa"+Hash).validate({
                rules: {
                    idunidadx : {
                        required: true,
                        minlength:1
                    },
                    idarea : {
                        required: true,
                        minlength:1
                    },
                    nombrecargo : {
                        required: true,
                        minlength:2
                    },
                    descripcioncargo : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function CrearnEWCargoEmpresa(Hash,Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '9735e9fbf66f3e9cc83018b42cdad60c',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                idunidadx: $("#idunidadx").val(),
                idarea: $("#idarea").val(),
                nombrecargo: $("#nombrecargo").val(),
                descripcioncargo: $("#descripcioncargo").val(),
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaEmpresaCargoAreaUnidadesNegocio(Hash,Hash2)
            }
        });
    }
}

function CrearUnidadNegocioEmpresa(Hash,Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '21d0b65606feec125c928029698dfdc9',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreunidad: $("#nombreunidad").val(),
                porcentajerentabilidad: $("#porcentajerentabilidad").val(),
                descripcionunidad: $("#descripcionunidad").val(),
            },
            success:function(data){
                EventosCierreModal()
                UnidadesNegocioEmpresa(Hash,Hash2)
                $("#ModalEdit").modal("show")
            }
        });
    }
}

function CrearAreaUnidadNegocioEmpresa(Hash,Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral+'f3e3c0ebfad643927c8abc475cbaef5d',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                idunidad: $("#idunidad").val(),
                nombrearea: $("#nombrearea").val(),
                descripcionarea: $("#descripcionarea").val(),
            },
            success:function(data){
                EventosCierreModal()
                ModalEdit2(0)
                BuscarTablaEmpresaAreaUnidadesNegocio(Hash,Hash2)
            }
        });
    }
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
            'url':UrlGeneral + 'b42147e1fa637c7e83a5dc9e152d7795',
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
           {
               data: 'nroempleados',

               "render": function (data, type, full, meta) {
                   if( full.ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEOGOCIO == 1 ){
                       return '<Center ><img src = "../images/datos_plannegocio.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "PlanNegociosUnidad(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')"></Center>';
                   }else{
                       return '<Center ></Center>';
                   }
                    
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
                    if( full.INFORMACION_EMPRESA_UND_ESTADO.length > 0 ){
                        if( full.estado == 1 ){
                            hx += '<center ><span onclick = "EstadoUnidadEmpresa(\''+full.Hash+'\',\''+Hash2+'\',0)">'
                                hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                            hx += '</span></center>'
                        }else{
                            hx += '<center ><span onclick = "EstadoUnidadEmpresa(\''+full.Hash+'\',\''+Hash2+'\',1)">'
                                hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                            hx += '</span></center>'
                        }
                    }else{
                        if( full.estado == 1 ){
                            hx += '<center >'
                                hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                            hx += '</center>'
                        }else{
                            hx += '<center >'
                                hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                            hx += '</center>'
                        }
                    }

                    return hx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_UND_EDITAR.length > 0 ){
                        hx += '<center ><span onclick = "EditarUnidadEmpresa(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')">'
                            hx += '<img src ="../images/editar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }
                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#UnidadesNegocio'+Hash).css({'width':'100%'})
}

function Datos_TablaUnidadPlanNegocio(Hash,HashEmpresa,Hash2){
    $DataTable_UnidadPlanNegocio = $("#PlanNegocio"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':'../9d0ebe9778ee8a638a126ce099c73463',
            'data':function (d) {
                    d.search['value'] = $("#TextBusqueda_PN").val();
                    d.search['Estado'] = $("#Estado_PN").val();
                    d.search['Cliente'] = $("#Cliente_PN").val();
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
                    return '<Center ><img src = "images/detalle.png" class = "OptionIconTableMenu" data-toggle="modal" onclick = "ConsultarPlanNegociosUnidad(\''+full.Hash+'\',\''+Hash+'\',\''+HashEmpresa+'\',\''+Hash2+'\')" data-target="#ModalEdit"></Center>';
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
                            hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }else{
                        hx += '<center >'
                            hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                        hx += '</center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#PlanNegocio'+Hash).css({'width':'100%'})
}

function EditarDetallePlanNegocio(Id,Hash,HashEmpresa,Hash2){
    for(var i = 1; i < 13; i++){
        $("#ValorMes"+i).prop('disabled', false);
    }
    $("#EstadoPN").prop('disabled', false);
    $(".TituloPn"+Id).text("Editar Plan de Negocio")
    $(".btn_PlanNegocio").show();
}

function ConsultarPlanNegociosUnidad(Id,Hash,HashEmpresa,Hash2){
    ModalEdit(0)
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'cb33fe7061135946bcd302775fd26d17',
        data:{Hash:Id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'width:90%;'nowrap>"
                            html += "<span class = 'TituloBuscador2 TituloPn"+Id+"'>Consultar Plan de Negocio</span>";
                        html += "</td>"
                        html += "<td style = 'width:5%;' class = 'CenterText'>"
                            if( data.INFORMACION_EMPRESA_UND_PLANNEGOCIO_EDITAR == 1 ){
                                html += "<img src = 'images/editar.png' class = 'OptionIcon' onclick = 'EditarDetallePlanNegocio(\""+Id+"\",\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")'/>"
                            }
                        html += "</td>"
                        html += "<td style = 'width:5%;' >"
                            html += "<button type='button' data-dismiss='modal'  class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
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
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'>Ingrese la facturación estimada para cada mes:</label>"
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
                        html += "<input disabled autocomplete = 'off' type = 'text' name = 'ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"' value = '"+formatNumber.new((data.Datos[0]['Mes'][i]['Pptado']))+"' id = 'ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"' onkeyup = 'FormatCampoNum(\"ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"\",\"ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"_real\")' class = 'ValorMesesPptado ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+" form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"_real' id = 'ValorMes"+(data.Datos[0]['Mes'][i]['Mes'])+"_real'>"+(data.Datos[0]['Mes'][i]['Pptado'])+"</span>"
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
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit2(0);ModalEdit(1)'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary btn_PlanNegocio HidenInformation' onclick = 'GuardarEdPlanNegocioUnidad(\""+Id+"\",\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            ResizeModal(0.65)
            $FormValidate = $(".FormPlanNegocio"+Hash).validate({
                rules: {
                    ClienteId : {
                        required: true,
                        minlength:1
                    },
                    YearId : {
                        required: true,
                        minlength:1
                    },
                    ValorMes1 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes2 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes3 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes4 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes5 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes6 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes7 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes8 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes9 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes10 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes11 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes12 : {
                        required: true,
                        minlength:1
                    },
                }
            });
        }
    });
}

function EstadoUnidadEmpresa(Hash,Hash2,estado){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6bb0db1452c00a0d3115426920682110',
        data:{Hash:Hash,estado:estado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //BuscarTablaEmpresaUnidadesNegocio(Hash,Hash2)
            $DataTable_Empresa_UND.draw()
        }
    });
}


function FiltrarClientesPlanNegocioAnio(HashEmpresa){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '927b21b9d7ee4fd8c73810cf199e0013',
        data:{Hash:HashEmpresa,YearId:$("#YearId").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<option value = ''>Seleccione</option>"
            for(var i = 0; i < data.Clientes.length; i++){
                html += "<option value = '"+data.Clientes[i]['Hash']+"'>"+data.Clientes[i]['NombreComercial']+"</option>"
            }
            $("#ClienteId").html(html)
        }
    })
}

function CrearPlanNegocio(Hash,HashEmpresa,Hash2){
    $("#ModalEdit").modal("hide");
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a73c2b2af2ae8854397ce6c6b610f3e9',
        data:{Hash:HashEmpresa,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Nuevo Plan de Negocio de "+ $(".Und_name"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0);ModalEdit(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormPlanNegocio"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Año:</label>"
                        html += "<select name = 'YearId' id = 'YearId' onchange = 'FiltrarClientesPlanNegocioAnio(\""+HashEmpresa+"\")'class = 'form-control' required>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Years.length; i++){
                                html += "<option value = '"+data.Years[i]+"'>"+data.Years[i]+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-8 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Cliente:</label>"
                        html += "<select name = 'ClienteId' id = 'ClienteId' class = 'form-control' required>"
                            
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'>Ingrese la facturación estimada para cada mes:</label>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Enero:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes1' id = 'ValorMes1' onkeyup = 'FormatCampoNum(\"ValorMes1\",\"ValorMes1_real\")' class = 'ValorMes1 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes1_real' id = 'ValorMes1_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Febrero:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes2' id = 'ValorMes2' onkeyup = 'FormatCampoNum(\"ValorMes2\",\"ValorMes2_real\")' class = 'ValorMes2 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes2_real' id = 'ValorMes2_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Marzo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes3' id = 'ValorMes3' onkeyup = 'FormatCampoNum(\"ValorMes3\",\"ValorMes3_real\")' class = 'ValorMes3 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes3_real' id = 'ValorMes3_real'>0</span>"
                    html += "</div>"
                html += "</div>"
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Abril:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes4' id = 'ValorMes4' onkeyup = 'FormatCampoNum(\"ValorMes4\",\"ValorMes4_real\")' class = 'ValorMes4 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes4_real' id = 'ValorMes4_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Mayo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes5' id = 'ValorMes5' onkeyup = 'FormatCampoNum(\"ValorMes5\",\"ValorMes5_real\")' class = 'ValorMes5 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes5_real' id = 'ValorMes5_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Junio:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes6' id = 'ValorMes6' onkeyup = 'FormatCampoNum(\"ValorMes6\",\"ValorMes6_real\")' class = 'ValorMes6 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes6_real' id = 'ValorMes6_real'>0</span>"
                    html += "</div>"
                html += "</div>"
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Julio:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes7' id = 'ValorMes7' onkeyup = 'FormatCampoNum(\"ValorMes7\",\"ValorMes7_real\")' class = 'ValorMes7 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes7_real' id = 'ValorMes7_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Agosto:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes8' id = 'ValorMes8' onkeyup = 'FormatCampoNum(\"ValorMes8\",\"ValorMes8_real\")' class = 'ValorMes8 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes8_real' id = 'ValorMes8_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Septiembre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes9' id = 'ValorMes9' onkeyup = 'FormatCampoNum(\"ValorMes9\",\"ValorMes9_real\")' class = 'ValorMes9 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes9_real' id = 'ValorMes9_real'>0</span>"
                    html += "</div>"
                html += "</div>"
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Octubre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes10' id = 'ValorMes10' onkeyup = 'FormatCampoNum(\"ValorMes10\",\"ValorMes10_real\")' class = 'ValorMes10 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes10_real' id = 'ValorMes10_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Noviembre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes11' id = 'ValorMes11' onkeyup = 'FormatCampoNum(\"ValorMes11\",\"ValorMes11_real\")' class = 'ValorMes11 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes11_real' id = 'ValorMes11_real'>0</span>"
                    html += "</div>"
                    html += "<div class='col col-sm-4 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Diciembre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'ValorMes12' id = 'ValorMes12' onkeyup = 'FormatCampoNum(\"ValorMes12\",\"ValorMes12_real\")' class = 'ValorMes12 form-control' required />"
                        html += "<span style = 'display:none;' class = 'ValorMes12_real' id = 'ValorMes12_real'>0</span>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarPlanNegocioUnidad(\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            $("#ModalEdit2").modal("show");
            ResizeModal(0.75)
            $FormValidate = $(".FormPlanNegocio"+Hash).validate({
                rules: {
                    ClienteId : {
                        required: true,
                        minlength:1
                    },
                    YearId : {
                        required: true,
                        minlength:1
                    },
                    ValorMes1 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes2 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes3 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes4 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes5 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes6 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes7 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes8 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes9 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes10 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes11 : {
                        required: true,
                        minlength:1
                    },
                    ValorMes12 : {
                        required: true,
                        minlength:1
                    },
                }
            });
        }
    });
}

function GuardarPlanNegocioUnidad(Hash,HashEmpresa,Hash2){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("HashEmpresa", HashEmpresa);
        formData.append("ClienteId", $("#ClienteId").val());
        formData.append("YearId", $("#YearId").val());
        formData.append("nombredocumento", $("#nombredocumento").val());

        for (var i = 1; i < 13; i++) {
            formData.append("ValorMes"+i, $("#ValorMes"+i+"_real").text());
        }

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + '42bc9fb450f0d97a1e29239320775a3f',
            success:function(data){
                ModalEdit2(0);
                ModalEdit(1);
                BuscarDatosTablaPN(Hash,HashEmpresa,Hash2)
                if( data.Info == 1 ){
                    AlertaMensajes("Plan Cargado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Cargar el Plan de Negocios","error",3);
                }
            }
        })
    }
}


function GuardarEdPlanNegocioUnidad(Id,Hash,HashEmpresa,Hash2){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Hash", Id);
        formData.append("EstadoPN", $("#EstadoPN").val());

        for (var i = 1; i < 13; i++) {
            formData.append("ValorMes"+i, $("#ValorMes"+i+"_real").text());
        }

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + 'c221b1d93e2f65079c9b355a43e25752',
            success:function(data){
                ModalEdit2(0);
                ModalEdit(1);
                BuscarDatosTablaPN(Hash,HashEmpresa,Hash2)
                if( data.Info == 1 ){
                    AlertaMensajes("Plan Editado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Editar el Plan de Negocios","error",3);
                }
            }
        })
    }
}

function PlanNegociosUnidad(Hash,HashEmpresa,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'1965d305dda1555551d46f6c51070e55',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Plan de Negocios "+$(".Und_name"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                    if( data.INFORMACION_EMPRESA_UND_PLANNEGOCIO_CREAR == 1 ){
                        html += "<td class = 'BotonesSuperiores'>"
                            html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearPlanNegocio(\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")' />";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearPlanNegocio(\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")' >Crear Plan de Negocio</span>";
                        html += "</td>"
                    }
                        html += "</tr>"
                    html += "</table>";
                html += "</div>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-2 my-2'>"
                        html += "<label for='IdTipoDoc' col-form-label'>Cliente:</label>"
                        html += "<select class = 'form-control' name = 'Cliente_PN' id = 'Cliente_PN'>";
                            html += "<option value = '0' >Todos</option>"
                            for(var i = 0; i < data.Clientes.length; i++){
                                html += "<option value = '"+data.Clientes[i]['Hash']+"'>"+data.Clientes[i]['NombreComercial']+"</option>"
                            }
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
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosTablaPN(\""+Hash+"\",\""+HashEmpresa+"\",\""+Hash2+"\")'/>"
                    html += "</div>"
                html += "</div><br>";
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
            
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            Datos_TablaUnidadPlanNegocio(Hash,HashEmpresa,Hash2)
        }
    });
}

function BuscarDatosTablaPN(Hash,HashEmpresa,Hash2){
    $DataTable_UnidadPlanNegocio.draw();
}


function EditarUnidadEmpresa(Hash,Hash2,Hash3){
    $('#ModalEdit').modal('hide');
    $.ajax({
        type:'POST',
        url:UrlGeneral+'5fcaf6a6bb4536fa609afed85965f19b',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Editar Unidad de Negocio"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormEditarUnidadNegocioEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Unidad:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombreunidad' id = 'nombreunidad' class = 'form-control' value = '"+data.Info[0]['nombre']+"'required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción de la Unidad:</label>"
                        html += "<textarea name = 'descripcionunidad' id = 'descripcionunidad' class = 'form-control' required>"+data.Info[0]['descripcion']+"</textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'EditarUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\",\""+Hash3+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            ModalEdit2(1)
            ResizeModal(0.45)

            $FormValidate = $(".FormEditarUnidadNegocioEmpresa"+Hash).validate({
                rules: {
                    nombreunidad : {
                        required: true,
                        minlength:2
                    },
                    descripcionunidad : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function EditarUnidadNegocioEmpresa(Hash,Hash2,Id){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '57b91d5dae28457fcbfdd435ff1e3168',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreunidad: $("#nombreunidad").val(),
                descripcionunidad: $("#descripcionunidad").val(),
            },
            success:function(data){
                EventosCierreModal()
                $("#ModalEdit").modal("hide")
                $("#ModalEdit2").modal("hide")
                BuscarTablaEmpresaUnidadesNegocio(Hash,Hash2)
            }
        });
    }
}

function Datos_TablaEmpresa_Areas(Hash,Hash2){
    $DataTable_Empresa_Area = $("#AreasUnidadesNegocio"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral+'36fa0e91aa7c1c3fb0233bb5e60c1541',
            'data':function (d) {
                    d.search['value'] = $("#Area_TextBusqueda").val();
                    d.search['Estado'] = $("#Area_Estado").val();
                    d.search['Unidad'] = $("#Area_Unidad").val();
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
           /*{
               data: 'nombre1',
               "render": function (data, type, full, meta) {
                    return '' + data +' '+ full.nombre2 + ' '+full.apellido1 + ' '+full.apellido2;
                }

            },*/
            {
                data: 'descripcion',
                "render": function (data, type, full, meta) {
                    return '' + data + '';
                }
            },
           /*{
               data: 'nroempleados',

               "render": function (data, type, full, meta) {
                    return '<Center >' + data + '</Center>';
                }

            },*/
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
                    if( full.INFORMACION_EMPRESA_AREAS_ESTADO.length > 0 ){
                        if( full.estado == 1 ){
                            hx += '<center ><span onclick = "EstadoAreaUnidadEmpresa(\''+full.Hash+'\',\''+Hash2+'\',0)">'
                                hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                            hx += '</span></center>'
                        }else{
                            hx += '<center ><span onclick = "EstadoAreaUnidadEmpresa(\''+full.Hash+'\',\''+Hash2+'\',1)">'
                                hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                            hx += '</span></center>'
                        }
                    }else{
                        if( full.estado == 1 ){
                            hx += '<center >'
                                hx += '<img src ="../images/activo.png" class = "OptionIcon" />';
                            hx += '</center>'
                        }else{
                            hx += '<center >'
                                hx += '<img src ="../images/inactivo.png" class = "OptionIcon" />';
                            hx += '</center>'
                        }
                    }

                    return hx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_AREAS_EDITAR.length > 0 ){
                        hx += '<center ><span onclick = "EditarAreaUnidadEmpresa(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')">'
                            hx += '<img src ="../images/editar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
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
    $('#AreasUnidadesNegocio'+Hash).css({'width':'100%'})
}

function BuscarTablaEmpresaAreaUnidadesNegocio(Hash,Hash2){
    $DataTable_Empresa_Area.draw()
}

function MostrarDatosPestanaArea(Hash,Hash2){
    MostrarTabsMenu(2);
    $.ajax({
        type:'POST',
        url:UrlGeneral + '0273c8d691adf8d426f672e7ccbda192',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var ht = "<option value = '0'>Seleccione</option>"
            for(var i = 0; i < data.ListaUnd.length; i++){
                ht += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>"
            }
            $("#Area_Unidad").html(ht);
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)
            $DataTable_Empresa_Area.draw()
        }
    });
}

function EstadoAreaUnidadEmpresa(Hash,Hash2,estado){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '35c9b77cbd2dab86d9f8c7a470087b65',
        data:{Hash:Hash,estado:estado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //BuscarTablaEmpresaUnidadesNegocio(Hash,Hash2)
            $DataTable_Empresa_Area.draw()
        }
    });
}

function EditarAreaUnidadEmpresa(Hash,Hash2,Hash3){
    $('#ModalEdit').modal('hide');
    $.ajax({
        type:'POST',
        url: UrlGeneral + '78e504495738bba859363168e08d853a',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Editar Área"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormEditarAreaUnidadNegocioEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Área:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombreunidad' id = 'nombreunidad' class = 'form-control' value = '"+data.Info[0]['nombre']+"'required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción Área:</label>"
                        html += "<textarea name = 'descripcionunidad' id = 'descripcionunidad' class = 'form-control' required>"+data.Info[0]['descripcion']+"</textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'EditarAreaUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\",\""+Hash3+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(0.48)

            $FormValidate = $(".FormEditarAreaUnidadNegocioEmpresa"+Hash).validate({
                rules: {
                    nombreunidad : {
                        required: true,
                        minlength:2
                    },
                    descripcionunidad : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function EditarAreaUnidadNegocioEmpresa(Hash,Hash2,Id){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral +  'c4a60a45727a2fc5564bb809e88e1b43',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreunidad: $("#nombreunidad").val(),
                descripcionunidad: $("#descripcionunidad").val(),
            },
            success:function(data){
                ModalEdit2(0)
                $DataTable_Empresa_Area.draw()
            }
        });
    }
}

function ReorganizarAreasUnidadNegocioEmpresa(Hash,Hash2){
    
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0273c8d691adf8d426f672e7ccbda192',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Reorganizar Áreas"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span> Seleccione una Unidad:</label>"
                        html += "<select name = 'idunidad' id = 'idunidad' class = 'form-control' onchange = 'ListarAreasUnidadNegocio()'>"
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.ListaUnd.length; i++){
                                html += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                        html += "<table id = 'OrdenAreasUnidad' class = 'tableNew' width = '100%'>";
                            html += "<thead>";
                                html += "<tr>";
                                    html += "<th>Orden</th>";
                                    html += "<th>Nombre</th>";
                                html += "</tr>";
                            html += "</thead>";
                            html += "<tbody class = 'TBody'>";
                            html += "</tbody>";
                        html += "</table>";
                    html += "</div>";
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'ActualizarOrdenFormatoBrief("+Hash+",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            ModalEdit2(1)
            ResizeModal(0.5)


        }
    });
}

function ListarAreasUnidadNegocio(){
    $.ajax({
        type:'POST',
        url: UrlGeneral +  'e6dec7b49bfaca5df94bc6ca05d523b4',
        data:{Hash:$("#idunidad").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            if( data.ListaUnd.length == 0 ){
                html += "<tr>";
                    html += "<td class = 'OrdenAreaUnidadEmpresa CenterText' colspan = '2'>No hay áreas dentro de esta unidad de negocio</td>";
                html += "</tr>";
                $(".TBody").html(html);
            }else{
                for(var i = 0; i < data.ListaUnd.length;i++){
                    html += "<tr class = 'Cursor_AS'>";
                        html += "<td class = 'OrdenAreaUnidadEmpresa CenterText'>"+data.ListaUnd[i]['nivel']+"</td>";
                        html += "<td>"+data.ListaUnd[i]['nombre']+"</td>";
                        html += "<td class = 'OrdenAreaUnidadEmpresaId' style = 'display:none;'>"+data.ListaUnd[i]['Hash']+"</td>";
                    html += "</tr>";
                }
                $(".TBody").html(html);
                $(".TBody").sortable({
                    stop: function( event, ui ) {
                        $(".TBody .OrdenAreaUnidadEmpresa").each(function(index){
                            $(this).html(index+1);
                        });
                    }
                });
            }
        }
    });
}

function AreasUnidadNegocioEmpresa(){
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'e6dec7b49bfaca5df94bc6ca05d523b4',
        data:{Hash:$("#Cargo_Unidad").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "<option value = '' selected>Seleccione</option>";
            for(var i = 0; i < data.ListaUnd.length;i++){
                html += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>";
            }
            $("#Cargo_Area").html(html)
        }
    });
}

function CargarAreasUnidadNegocio_List(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'e6dec7b49bfaca5df94bc6ca05d523b4',
        data:{Hash:$("#idunidadx").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "<option value = '' selected>Seleccione</option>";
            for(var i = 0; i < data.ListaUnd.length;i++){
                html += "<option value = '"+data.ListaUnd[i]['Hash']+"' >"+data.ListaUnd[i]['nombre']+"</option>";
            }
            $("#idarea").html(html);
        }
    });
}

function ActualizarOrdenFormatoBrief(Hash,Hash2){
    var temp = "";
    $(".OrdenAreaUnidadEmpresaId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    console.log(temp)
    $.ajax({
        type:'POST',
        url:UrlGeneral+'3702c3861db3bf32a4b63181ab147218',
        data:{Hash:Hash,orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            EventosCierreModal()
            ModalEdit2(0)
            $DataTable_Empresa_Area.draw()
        }
    });
}

function Datos_TablaEmpresa_Cargos(Hash,Hash2){
    $DataTable_Empresa_Cargos = $("#CargosAreasUnidadesNegocio"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url': UrlGeneral + '3feb8e00afde0455802dc1385f14723e',
            'data':function (d) {
                    d.search['value'] = $("#Cargo_TextBusqueda").val();
                    d.search['Unidad'] = $("#Cargo_Unidad").val();
                    d.search['Area'] = $("#Cargo_Area").val();
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
               data: 'Unidad',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },
           {
               data: 'Area',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },
           {
               data: 'nombre',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },
           {
               data: 'funciones',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

           /*{
               data: 'nroempleados',

               "render": function (data, type, full, meta) {
                    return '<Center >' + data + '</Center>';
                }

            },*/
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
                    if( full.INFORMACION_EMPRESA_CARGOS_EDITAR.length > 0 ){
                        hx += '<center ><span onclick = "EditarCargosAreaUnidadEmpresa(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')">'
                            hx += '<img src ="../images/editar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }
                    return hx;
                }
           },
        ],
        "order": [[1, "asc"],[2, "desc"]],
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#CargosAreasUnidadesNegocio'+Hash).css({'width':'100%'})
}

function BuscarTablaEmpresaCargoAreaUnidadesNegocio(Hash,Hash2){
    $DataTable_Empresa_Cargos.draw();
}

function MostrarDatosPestanaAreaCargo(Hash,Hash2){
    MostrarTabsMenu(3);
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0273c8d691adf8d426f672e7ccbda192',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var ht = "<option value = '0'>Seleccione</option>"
            for(var i = 0; i < data.ListaUnd.length; i++){
                ht += "<option value = '"+data.ListaUnd[i]['Hash']+"'>"+data.ListaUnd[i]['nombre']+"</option>"
            }
            $("#Cargo_Unidad").html(ht);
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)
            $DataTable_Empresa_Cargos.draw()
        }
    });
}

function EditarCargosAreaUnidadEmpresa(Hash,Hash2,Hash3){
    
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'e60a96bed74b2e45e85d82d423e7e645',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Editar Cargo"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormEditarCargoAreaUnidadNegocioEmpresa"+Hash+"'  action='javascript:void(0)' method='post' >"
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Cargo:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombreunidad' id = 'nombreunidad' class = 'form-control' value = '"+data.Info[0]['nombre']+"'required/>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Funciones:</label>"
                        html += "<textarea name = 'descripcionunidad' id = 'descripcionunidad' class = 'form-control' required>"+data.Info[0]['descripcion']+"</textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary'  data-dismiss='modal' aria-label='Close' onclick = 'EditarCargoAreaUnidadNegocioEmpresa("+Hash+",\""+Hash2+"\",\""+Hash3+"\")'>Guardar</button>";
            html += "</div>";
            html += "</form>"
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
            //$("#ModalContentForm2").modal("show")
            ResizeModal(0.45)

            $FormValidate = $(".FormEditarCargoAreaUnidadNegocioEmpresa"+Hash).validate({
                rules: {
                    nombreunidad : {
                        required: true,
                        minlength:2
                    },
                    descripcionunidad : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });
}

function EditarCargoAreaUnidadNegocioEmpresa(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + 'bca4b313fa63c36b97ace30b9c13127b',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreunidad: $("#nombreunidad").val(),
                descripcionunidad: $("#descripcionunidad").val(),
            },
            success:function(data){
                $("#ModalEdit2").modal('hide')
                $DataTable_Empresa_Cargos.draw()
            }
        });
    }
}

function InformacionSGSST(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'c898743432a05062f5c16fca15b3cc6a',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'EstablecerRiesgo(\""+Hash+"\",\""+Hash2+"\")' />";
                                html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'EstablecerRiesgo(\""+Hash+"\",\""+Hash2+"\")' >Establecer Riesgos</span>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'><table class='tableNew TableTA dataTable UnidadesNegocio"+Hash2+"' id = 'UnidadesNegocio"+Hash2+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Riesgo</th>"
                            html += "<th>Descripción</th>"
                            //html += "<th>Documentos</th>"
                            html += "<th>Eliminar</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    for(var i = 0; i < data.Info.length;i++){
                        html += "<tr class = 'RiesgoEmpresa"+data.Info[i]['Id']+"' >"
                            html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                            html += "<td class = ''>"+data.Info[i]['Nombre']+"</td>"
                            html += "<td>"+data.Info[i]['Descripcion']+"</td>"
                            /*html += "<td class = 'CenterText'>"
                                html +="<img src ='../images/detalles.png' onclick = 'EliminarGrupoJD("+data.Info[i]['Id']+")'class = 'OptionIcon' />"
                            html += "</td>"*/
                            html += "<td class = 'CenterText'>"
                                html +="<img src ='../images/eliminar.png' onclick = 'EliminarRiesgoEmpresa("+data.Info[i]['Id']+")'class = 'OptionIcon' />"
                            html += "</td>"
                        html += "</tr>"
                    }
                    html += "</tbody>"
                html += "</table></div>";
                
                html += "<hr>"
               /* 
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='images/Datos_nuevpres.png' class = 'OptionIcon' onclick = 'CrearAsignadoJD(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                                html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearAsignadoJD(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Asignado</span>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'><table class='tableNew TableTA dataTable UnidadesNegocio"+Hash2+"' id = 'UnidadesNegocio"+Hash2+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Grupo</th>"
                            html += "<th>Foto</th>"
                            html += "<th>Persona</th>"
                            html += "<th>Cargo</th>"
                            html += "<th>Correo</th>"
                            html += "<th>Teléfono</th>"
                            html += "<th>Eliminar</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    for(var i = 0; i < data.InfoAsig.length;i++){
                        html += "<tr class = 'AsignadosJD"+data.InfoAsig[i]['Hash']+"'>"
                            html += "<td class = 'CenterText ItemsOrdenList'>"+data.InfoAsig[i]['Num']+"</td>"
                            html += "<td >"+data.InfoAsig[i]['Grupo']+"</td>"
                            html += "<td class = 'CenterText'><img src = '../storage/app/datos/Empleados/"+data.InfoAsig[i]['Foto']+"' style = 'height:50px;width:50px;border-radius:25px;' /></td>"
                            
                            html += "<td>"+data.InfoAsig[i]['Nombre']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Cargo']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Correo']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Telefono']+"</td>"
                            html += "<td class = 'CenterText'>"
                                html +="<img src ='images/eliminar.png' onclick = 'EliminarAsignadoJD("+data.InfoAsig[i]['Hash']+")'class = 'OptionIcon' />"
                                html += "<span class = 'HidenInformation IdsGruposJD'>"+data.InfoAsig[i]['Hash']+"</span>"
                            html += "</td>"
                        html += "</tr>"
                    }*/
                    html += "</tbody>"
                html += "</table></div>";

            ;

            $("._StSSG").html(html);
            
            $(".TableTA tbody").sortable({
                cursor: 'row-resize',
                placeholder: 'ui-state-highlight',
                opacity: '0.55',
                items: '.TRA_Items',
                stop: function( event, ui ) {
                    var temp = "";
                    $(".TRA_Items .ItemsOrdenList").each(function(index){
                        $(this).html(index+1);
                    });
                    $(".IdsGruposJD ").each(function(index){
                        temp += $(this).text()+"|";
                    });
                    $.ajax({
                        type:'POST',
                        url:UrlGeneral +  '00f5954b08365611173d9d497df768c7',
                        data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
                        success:function(data){

                        }
                    });
                    
                }
              }).disableSelection();
            //$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            //ResizeModal(0.9)
            //ResizeChildTabsMenu(0.85)

        }
    });
}

function InformacionJuntaDirectiva(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '13abf4228e744df3ab18132f7f8b1ea0',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table  width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<img src = 'images/Datos_presgral4.png'/> <span class = 'TituloBuscador2'> Junta Directiva</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='images/Datos_nuevpres.png' class = 'OptionIcon' onclick = 'CrearGrupoJuntaDirectiva(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                                html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearGrupoJuntaDirectiva(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Grupo</span>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'><table class='tableNew TableTA dataTable UnidadesNegocio"+Hash2+"' id = 'UnidadesNegocio"+Hash2+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Grupo</th>"
                            html += "<th>Cargado Por</th>"
                            html += "<th>Cargado El</th>"
                            html += "<th>Consultar</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    for(var i = 0; i < data.Info.length;i++){
                        html += "<tr class = 'TRA_Items Grupos_"+data.Info[i]['Hash']+"'>"
                            html += "<td class = 'CenterText ItemsOrdenList'>"+data.Info[i]['Num']+"</td>"
                            html += "<td class = 'CenterText GrupoJD"+data.Info[i]['Hash']+"'>"+data.Info[i]['Grupo']+"</td>"
                            html += "<td>"+data.Info[i]['nombreusuario']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Info[i]['fechahora']+"</td>"
                            html += "<td class = 'CenterText'>"
                                html +="<img src ='images/eliminar.png' onclick = 'EliminarGrupoJD("+data.Info[i]['Hash']+")'class = 'OptionIcon' />"
                                html += "<span class = 'HidenInformation IdsGruposJD'>"+data.Info[i]['Hash']+"</span>"
                            html += "</td>"
                        html += "</tr>"
                    }
                    html += "</tbody>"
                html += "</table></div>";
                
                html += "<hr>"
                
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='images/Datos_nuevpres.png' class = 'OptionIcon' onclick = 'CrearAsignadoJD(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                                html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearAsignadoJD(\""+Hash+"\",\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Asignado</span>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'><table class='tableNew TableTA dataTable UnidadesNegocio"+Hash2+"' id = 'UnidadesNegocio"+Hash2+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Grupo</th>"
                            html += "<th>Foto</th>"
                            html += "<th>Persona</th>"
                            html += "<th>Cargo</th>"
                            html += "<th>Correo</th>"
                            html += "<th>Teléfono</th>"
                            html += "<th>Eliminar</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    for(var i = 0; i < data.InfoAsig.length;i++){
                        html += "<tr class = 'AsignadosJD"+data.InfoAsig[i]['Hash']+"'>"
                            html += "<td class = 'CenterText ItemsOrdenList'>"+data.InfoAsig[i]['Num']+"</td>"
                            html += "<td >"+data.InfoAsig[i]['Grupo']+"</td>"
                            html += "<td class = 'CenterText'><img src = '../storage/app/datos/Empleados/"+data.InfoAsig[i]['Foto']+"' style = 'height:50px;width:50px;border-radius:25px;' /></td>"
                            
                            html += "<td>"+data.InfoAsig[i]['Nombre']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Cargo']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Correo']+"</td>"
                            html += "<td>"+data.InfoAsig[i]['Telefono']+"</td>"
                            html += "<td class = 'CenterText'>"
                                html +="<img src ='images/eliminar.png' onclick = 'EliminarAsignadoJD("+data.InfoAsig[i]['Hash']+")'class = 'OptionIcon' />"
                                html += "<span class = 'HidenInformation IdsGruposJD'>"+data.InfoAsig[i]['Hash']+"</span>"
                            html += "</td>"
                        html += "</tr>"
                    }
                    html += "</tbody>"
                html += "</table></div>";

            html += "</div>";

            $(".content_modal").html(html);
            
            $(".TableTA tbody").sortable({
                cursor: 'row-resize',
                placeholder: 'ui-state-highlight',
                opacity: '0.55',
                items: '.TRA_Items',
                stop: function( event, ui ) {
                    var temp = "";
                    $(".TRA_Items .ItemsOrdenList").each(function(index){
                        $(this).html(index+1);
                    });
                    $(".IdsGruposJD ").each(function(index){
                        temp += $(this).text()+"|";
                    });
                    $.ajax({
                        type:'POST',
                        url: UrlGeneral + '00f5954b08365611173d9d497df768c7',
                        data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
                        success:function(data){

                        }
                    });
                    
                }
              }).disableSelection();
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)

        }
    });
}

function EliminarAsignadoJD(Hash){
    if( confirm("¿Realmente desea eliminar a este integrante?")){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '61d6673ab6f1cd642dfd10fc32716068',
            data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                $(".AsignadosJD"+Hash).fadeOut("slow")
            }
        })
    }
}
function EliminarRiesgoEmpresa(Hash){
    if( confirm("¿Realmente desea eliminar este Riesgo de la Empresa?")){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '33be5ce5ea5c05081bab897d1f146f9b',
            data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                $(".RiesgoEmpresa"+Hash).fadeOut("slow")
            }
        })
    }
}
function EliminarGrupoJD(Hash){
    if( confirm("¿Realmente desea eliminar a este Grupo?")){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '61d6673ab6f1cd642dfd10fc32716068x',
            data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                $(".Grupos_"+Hash).fadeOut("slow")
            }
        })
    }
}

function CrearAsignadoJD(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '13abf4228e744df3ab18132f7f8b1ea0',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Crear Nuevo Asignado Junta Directiva</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0);' aria-label='Close'>";
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='Responsables.enviar(event)' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";

                html += "<div class='form-group row'>";
                    html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Grupo:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<select class='form-control' id='IdGrupo'>";
                            html += "<option value = ''>Seleccione</option>"
                            for(var i = 0; i < data.Info.length;i++){
                                html += "<option value = '"+data.Info[i]['Hash']+"'>"+data.Info[i]['Grupo']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>";
                html += "</div>";

                html += "<div class='form-group row'>";
                    html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<input type='text' class='form-control' id='traNombre'name='traNombre' placeholder='Nombre' autocomplete = 'off' />";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='Cargo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Cargo:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<input type='text' class='form-control' id='Cargo'name='Cargo' placeholder='Cargo' autocomplete = 'off' />";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='Correo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<input type='text' class='form-control' id='Correo'name='Correo' placeholder='Correo' autocomplete = 'off' />";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='Celular' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Celular:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<input type='text' class='form-control' id='Celular'name='Celular' placeholder='Celular' autocomplete = 'off' />";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='Celular' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Foto:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<div class='custom-file'>"
                            html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' required />"
                            html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione Foto</label>"
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick='CierraModal(\"myModal\",\"ModalEdit\");ResizeModal(0.95)' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='button' onclick = 'GuardarAsignadoJD(\""+Hash+"\",\""+Hash2+"\")' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-xl');
            //ModalEdit2(1)
        }
    });
}

function GuardarAsignadoJD(Hash,Hash2){
    if( $("#IdGrupo").val() != '' && $("#traNombre").val() != '' && $("#Cargo").val() != '' && $("#Correo").val() != '' && $("#Celular").val() != '' && document.getElementById("ParLogo").length != 0 ){
        var formData = new FormData();
        formData.append("IdGrupo", $("#IdGrupo").val());
        formData.append("traNombre", $("#traNombre").val());
        formData.append("Cargo", $("#Cargo").val());
        formData.append("Correo", $("#Correo").val());
        formData.append("Celular", $("#Celular").val());
        formData.append("Hash", Hash);

        var archivos = document.getElementById("ParLogo");
        formData.append("NumFoto", archivos.files.length);
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + '063db1b7ccf54795e45622a907632c25',
            success:function(data){
                InformacionJuntaDirectiva(Hash,Hash2)
                $("#myModal").modal("hide")
                $("#ModalEdit").modal("show")
            }
        })
    }else{
        alert("Debe completar los campos Obligatorios")
    }
        
}

function InformacionPptoPersonal(Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '75945dcf9e7cc447f3c6c5bac0a4de03x',
        data:{Hash:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(1)
            var html = "";
            TituloVentana = "Presupuesto Personal"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                    if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADD.length > 0 ){
                        html += "<td class = 'BotonesSuperiores'>"
                            html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearPptoPersonal(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                            html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearPptoPersonal(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Presupuesto</span>";
                        html += "</td>"
                    }
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = ''><table class='tableNew dataTable ' >";
                    //html += "<thead>"
                        html += "<tr>"
                            html += "<th width = '20px'>No.</th>"
                            html += "<th >Año</th>"
                            html += "<th >Cargado Por</th>"
                            html += "<th >Cargado El</th>"
                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA.length > 0 ){
                                html += "<th>Consultar</th>"
                            }
                        html += "</tr>"
                    //html += "</thead>"
                    for(var i = 0; i < data.Info.length;i++){
                        html += "<tr>"
                            html += "<td width = '20px'class = 'CenterText'>"+data.Info[i]['Num']+"</td>"
                            html += "<td class = 'CenterText YearPpto"+data.Info[i]['Hash']+"'>"+data.Info[i]['Anio']+"</td>"
                            html += "<td  nowrap>"+data.Info[i]['nombreusuario']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Info[i]['fechahora']+"</td>"
                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA.length > 0 ){
                                html += "<td class = 'CenterText'>"
                                    html +="<img src ='../images/detalles.png' onclick = 'ConsultarDetallePptoPersonal("+data.Info[i]['Hash']+")'class = 'OptionIcon' data-toggle='modal' data-target='#ModalEdit2'/>"
                                html += "</td>"
                            }
                        html += "</tr>"
                    }
                html += "</table></div>";


            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)

        }
    });
}

function InformacionPptoGeneral(Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '75945dcf9e7cc447f3c6c5bac0a4de03',
        data:{Hash:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(1)
            var html = "";
            TituloVentana = "Presupuesto General Compañía"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                    if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADD.length > 0 ){
                        html += "<td class = 'BotonesSuperiores'>"
                            html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearPptoGeneral(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                            html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearPptoGeneral(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Presupuesto</span>";
                        html += "</td>"
                    }
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                html += "<div class = ''><table class='tableNew dataTable ' >";
                    //html += "<thead>"
                        html += "<tr>"
                            html += "<th width = '20px'>No.</th>"
                            html += "<th >Año</th>"
                            html += "<th >Cargado Por</th>"
                            html += "<th >Cargado El</th>"
                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA.length > 0 ){
                                html += "<th>Consultar</th>"
                            }
                        html += "</tr>"
                    //html += "</thead>"
                    for(var i = 0; i < data.Info.length;i++){
                        html += "<tr>"
                            html += "<td width = '20px'class = 'CenterText'>"+data.Info[i]['Num']+"</td>"
                            html += "<td class = 'CenterText YearPpto"+data.Info[i]['Hash']+"'>"+data.Info[i]['Year']+"</td>"
                            html += "<td  nowrap>"+data.Info[i]['nombreusuario']+"</td>"
                            html += "<td class = 'CenterText'>"+data.Info[i]['fechahora']+"</td>"
                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA.length > 0 ){
                                html += "<td class = 'CenterText'>"
                                    html +="<img src ='../images/detalles.png' onclick = 'ConsultarDetallePptoGeneral("+data.Info[i]['Hash']+")'class = 'OptionIcon' data-toggle='modal' data-target='#ModalEdit2'/>"
                                html += "</td>"
                            }
                        html += "</tr>"
                    }
                html += "</table></div>";


            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)

        }
    });
}

function CrearPptoGeneral(Hash2){
    $("#ModalEdit").modal("hide");
    $.ajax({
        type:'POST',
        url:UrlGeneral + '1a901d41fc1764f344620488904fc4d9',
        data:{Hash:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Crear Presupuesto Compañía"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoPptoGeneral'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Seleccion un Año:</label>"
                                html += "<select class = 'form-control' name = 'yearpptogeneral' id = 'yearpptogeneral' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info.length;i++){
                                        html += "<option value = '"+data.Info[i]+"'>"+data.Info[i]+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoPptoGeneral(\""+Hash2+"\")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');

            ResizeModal(0.3)

            $FormValidate = $(".FormNuevoPptoGeneral").validate({
                rules: {
                    yearpptogeneral : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    })
}

function CrearPptoPersonal(Hash2){
    $("#ModalEdit").modal("hide");
    $.ajax({
        type:'POST',
        url:UrlGeneral + '1a901d41fc1764f344620488904fc4d9',
        data:{Hash:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Crear Presupuesto Personal"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoPptoGeneral'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Seleccion un Año:</label>"
                                html += "<select class = 'form-control' name = 'yearpptogeneral' id = 'yearpptogeneral' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info.length;i++){
                                        html += "<option value = '"+data.Info[i]+"'>"+data.Info[i]+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoPptoPersonal(\""+Hash2+"\")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');

            ResizeModal(0.3)

            $FormValidate = $(".FormNuevoPptoGeneral").validate({
                rules: {
                    yearpptogeneral : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    })
}
function EstablecerRiesgo(Hash,Hash2){
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
        url:UrlGeneral + 'c565d91da767ff2669b7a0391b4c499c',
        success:function(data){
            ModalEdit(1)
            var html = "";
            TituloVentana = "Establecer Riesgos"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Selecciona los Riesgos que aplican a la compañía:</label>"
                                html += "<table class = 'tableNew'>"
                               
                                for(var i = 0; i < data.Info.length;i++){
                                    html += "<tr>"
                                        html += "<td>"
                                            html += "<input class='TiposRiesgos' name='parTipoRiesgo' type='checkbox' value='"+data.Info[i]['Id']+"'>"
                                        html += "</td>"
                                        html += "<td nowrap>"
                                            html += data.Info[i]['Nombre']
                                        html += "</td>"
                                        html += "<td>"
                                            html += data.Info[i]['Descripcion']
                                        html += "</td>"
                                    html += "</tr>"
                                }
                                html += "</table>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' data-dismiss='modal' aria-label='Close' class='btn btn-primary' onclick = 'GuardarRiesgosEmpresa(\""+Hash+"\",\""+Hash2+"\")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');

            ResizeModal(0.65)
        }
    })
    
}

function CrearGrupoJuntaDirectiva(Hash,Hash2){
    $("#ModalEdit").modal("hide");
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Crear Grupo Junta Directiva</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'CierraModal(\"myModal\",\"ModalEdit\");ResizeModal(0.95)'>";
                    html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'CierraModal(\"myModal\",\"ModalEdit\");ResizeModal(0.95)'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='javascript:void(0)' method='post' >"
        html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Ingresa el nombre del Grupo:</label>"
                        html += "<input type = 'text' class = 'form-control' name = 'GrupoJuntaDirectiva' id = 'GrupoJuntaDirectiva' "
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit\");ResizeModal(0.95)'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarJuntaDirectiva(\""+Hash+"\",\""+Hash2+"\")'>Guardar</button>";
            html += "</div>";
    html += "</form>"

    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');

    ResizeModal(0.6)
}


function GuardarRiesgosEmpresa(Hash,Hash2){
    var Riesgos = [];
    $("input[name=parTipoRiesgo]:checked").each(function(){
        Riesgos.push(this.value);
    });
    if( Riesgos.length > 0 ){
        var formData = new FormData();
        formData.append("Riesgos", JSON.stringify(Riesgos));
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
            url:UrlGeneral + '82298b4c96cbd0e5a7ceb3f73d2427a6',
            success:function(data){
                InformacionSGSST(Hash,Hash2)
                ModalEdit(0)
            }
        })
    }
    
}
function GuardarJuntaDirectiva(Hash,Hash2){
    if( $("#GrupoJuntaDirectiva").val() != "" ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '1d4b2b4c964a407040db298b66704f15',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                GrupoJuntaDirectiva: $("#GrupoJuntaDirectiva").val()
            },
            success:function(data){
                InformacionJuntaDirectiva(Hash,Hash2)
                $("#myModal").modal("hide")
                $("#ModalEdit").modal("show")
            }
        });
    }
}

function GuardarNuevoPptoGeneral(Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '23588c91b1befe32c7b2a2d0c03e9fc3',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash2,
                yearpptogeneral: $("#yearpptogeneral").val()
            },
            success:function(data){
                InformacionPptoGeneral(Hash2)
                $("#myModal").modal("hide")
                $("#ModalEdit").modal("show")
            }
        });
    }
}
function GuardarNuevoPptoPersonal(Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '23588c91b1befe32c7b2a2d0c03e9fc3x',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash2,
                yearpptogeneral: $("#yearpptogeneral").val()
            },
            success:function(data){
                InformacionPptoPersonal(Hash2)
                $("#myModal").modal("hide")
                $("#ModalEdit").modal("show")
            }
        });
    }
}

function ConsultarDetallePptoGeneral(Hash){
    $("#ModalEdit").modal("hide");
    $.ajax({
        type:'POST',
        url:UrlGeneral + '1a901d41fc1764f344620488904fc4d9',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO > 0 ){

                                html += "<th class = 'td_cuerpo_table CenterText' style = 'text-align:center;font-weight:bold;'colspan = '2'>GRUPOS</th>"

                        }
                        html += "<td></td>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM > 0 ){
                            html += "<th class = 'td_cuerpo_table CenterText' colspan = '2' style = 'text-align:center;font-weight:bold;'>ITEMS</th>"
                        }
                        html += "<td></td>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM > 0 ){
                            html += "<th class = 'td_cuerpo_table CenterText' colspan = '2' style = 'text-align:center;font-weight:bold;'>EMPLEADO</th>"
                        }
                        html += "</tr>"
                        html += "<tr>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearGruposPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearGruposPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Crear</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'OrdenarGruposPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Ordenar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                html += "<td></td>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Crear</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'OrdenarItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Ordenar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                
                                html += "<td></td>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AgregarEmpleadoPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarEmpleadoPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Agregar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }

                        html += "</tr>"

                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Mes:</label>";
                            html += "<select class ='form-control' required name = 'parBanco' id = 'parBanco' onchange='InformacionPptoGeneralMeses(1,"+Hash+")'>";
                                for(var i = 0; i < data.Meses.length;i++){
                                    var tk = "";
                                    if( data.Meses[i][0] == data.MesActual ){
                                        tk = "selected"
                                    }
                                    html += "<option value = '"+data.Meses[i][0]+"' "+tk+">"+data.Meses[i][1]+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'ContenedorInformacionPptoGeneralMeses'></div>"

                html += "</div>";
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.95)
            InformacionPptoGeneralMeses(1,$(".NEmpx").text())
            

        }
    })
}

function ConsultarDetallePptoPersonal(Hash){
    $("#ModalEdit").modal("hide");
    $.ajax({
        type:'POST',
        url:UrlGeneral + '1a901d41fc1764f344620488904fc4d9X',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Presupuesto Personal "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO > 0 ){

                                html += "<th class = 'td_cuerpo_table CenterText' style = 'text-align:center;font-weight:bold;'colspan = '2'>GRUPOS</th>"

                        }
                        html += "<td></td>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO > 0 ){

                            html += "<th class = 'td_cuerpo_table CenterText' style = 'text-align:center;font-weight:bold;'colspan = '2'>INGRESOS</th>"

                        }
                        html += "<td></td>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM > 0 ){
                            html += "<th class = 'td_cuerpo_table CenterText' colspan = '2' style = 'text-align:center;font-weight:bold;'>ITEMS</th>"
                        }
                        html += "<td></td>"
                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ||  data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM > 0 ){
                            html += "<th class = 'td_cuerpo_table CenterText' colspan = '2' style = 'text-align:center;font-weight:bold;'>EMPLEADO</th>"
                        }
                        html += "</tr>"
                        html += "<tr>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearGruposPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearGruposPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Crear</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'OrdenarGruposPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Ordenar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                html += "<td></td>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearIngresosPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearIngresosPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Crear</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'OrdenarGruposPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Ordenar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                html += "<td></td>"

                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearItemsPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearItemsPptoPersonal(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Crear</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/FLECHAS_ICONO.png' class = 'OptionIcon' onclick = 'OrdenarItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarItemsPptoGeneral(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Ordenar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }
                                
                                html += "<td></td>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM.length > 0 ){
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AgregarEmpleadoPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarEmpleadoPpto(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Agregar</span>";
                                    html += "</td>"
                                }else{
                                    html += "<td></td>"
                                }

                        html += "</tr>"

                    html += "</table>";
                html += "</div>"
                html += "<div class = 'ContenedorDataTable'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Mes:</label>";
                            html += "<select class ='form-control' required name = 'parBanco' id = 'parBanco' onchange='InformacionPptoGeneralMeses(1,"+Hash+")'>";
                                for(var i = 0; i < data.Meses.length;i++){
                                    var tk = "";
                                    if( data.Meses[i][0] == data.MesActual ){
                                        tk = "selected"
                                    }
                                    html += "<option value = '"+data.Meses[i][0]+"' "+tk+">"+data.Meses[i][1]+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'ContenedorInformacionPptoGeneralMeses'></div>"

                html += "</div>";
            html += "</div>";
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.95)
            InformacionPptoPersonalMeses(1,Hash)
            

        }
    })
}

function formatValorCompra(){
    var tval = $(".valortasa").val();
    if(tval != ""){
        var valx = tval.split("$ ");
        if( valx.length > 1 ){
            var val = valx[1];
            var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < valor.length; i++){
                    val_final += ""+valor[i];
            }
        }else{
            var val = tval.split("");
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        $(".valortasa").val("$ "+formatNumber.new(val_final));
        $(".valortasadonacion").val(val_final);
    }
}
function CrearIngresosPptoPersonal(Hash){
    $("#ModalEdit2").modal("hide");
    var html = "";
    
    TituloVentana = "Crear Ingreso Presupuesto Personal "+$(".YearPpto"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin FormNuevoGrupoPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
        html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombregrupo' id = 'nombregrupo' class = 'form-control' required />"
                    html += "</div>"
                    html += "<div class='col-sm-4 my-2'>";
                        html += "<label for='NroDoc1' >Valor Mensual <span class ='Obligatorio'>*</span>:</label>";
                        html += "<input autocomplete='off' id = 'valortasa' onkeyup = 'formatValorCompra()' type='text' class = 'form-control valortasa' value = '$ 0' required/>";
                        html += "<input type='hidden' class ='form-control valortasadonacion valorcompra' name = 'valortasa' value = '0' />";
                    html += "</div>";
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarIngresoPptoPersonal("+Hash+")'>Guardar</button>";
            html += "</div>";
    html += "</form>"

    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
    $("#myModal").modal("show")
    ResizeModal(0.4)

    $FormValidate = $(".FormNuevoGrupoPptoGeneral"+Hash).validate({
        rules: {
            nombreunidad : {
                required: true,
                minlength:2
            },
        }
    });

}

function CrearIngresoPptoGeneral(Hash){
    $("#ModalEdit2").modal("hide");
    var html = "";
    
    TituloVentana = "Crear Grupo Presupuesto General "+$(".YearPpto"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin FormNuevoGrupoPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
        html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Gasto:</label>"
                        html += "<select class = 'form-control' name = 'tipocosto' id = 'tipocosto' required>"
                            html += "<option value = '' selected>Seleccione</option>"
                            html += "<option value = 'FIJO' >Fijo</option>"
                            html += "<option value = 'VARIABLE' >Variable</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombregrupo' id = 'nombregrupo' class = 'form-control' required />"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoGrupoPptoGeneral("+Hash+")'>Guardar</button>";
            html += "</div>";
    html += "</form>"

    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
    $("#myModal").modal("show")
    ResizeModal(0.4)

    $FormValidate = $(".FormNuevoGrupoPptoGeneral"+Hash).validate({
        rules: {
            nombreunidad : {
                required: true,
                minlength:2
            },
            descripcionunidad : {
                required: true,
                minlength:5
            }
        }
    });

}
function CrearGruposPptoPersonal(Hash){
    $("#ModalEdit2").modal("hide");
    var html = "";
    
    TituloVentana = "Crear Grupo Presupuesto Personal "+$(".YearPpto"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<form class='form-signin FormNuevoGrupoPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
        html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                        html += "<input autocomplete = 'off' type = 'text' name = 'nombregrupo' id = 'nombregrupo' class = 'form-control' required />"
                    html += "</div>"
                html += "</div>"
            html += "</div>";
            html += "<div class='modal-footer'>";
                
                html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoGrupoPptoPersonal("+Hash+")'>Guardar</button>";
            html += "</div>";
    html += "</form>"

    $(".content_modal3").html(html);
    $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
    $("#myModal").modal("show")
    ResizeModal(0.3)

    $FormValidate = $(".FormNuevoGrupoPptoGeneral"+Hash).validate({
        rules: {
            nombreunidad : {
                required: true,
                minlength:2
            },
            descripcionunidad : {
                required: true,
                minlength:5
            }
        }
    });

}

function GuardarNuevoGrupoPptoPersonal(Hash){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + 'efde6af2f51148a5f72b5cdf935a5155x',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombregrupo: $("#nombregrupo").val(),
            },
            success:function(data){
                EventosCierreModal()
                ConsultarDetallePptoPersonal(Hash)
                $("#ModalEdit2").modal("show")
            }
        });
    }
}

function GuardarNuevoGrupoPptoGeneral(Hash){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'efde6af2f51148a5f72b5cdf935a5155',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                tipocosto: $("#tipocosto").val(),
                nombregrupo: $("#nombregrupo").val(),
            },
            success:function(data){
                EventosCierreModal()
                ConsultarDetallePptoGeneral(Hash)
                $("#ModalEdit2").modal("show")
            }
        });
    }
}
function GuardarIngresoPptoPersonal(Hash){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'efde6af2f51148a5f72b5cdf935a5155xx',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                valor: $(".valortasadonacion").val(),
                nombregrupo: $("#nombregrupo").val(),
            },
            success:function(data){
                EventosCierreModal()
                ConsultarDetallePptoPersonal(Hash)
                $("#ModalEdit2").modal("show")
            }
        });
    }
}
function AgregarEmpleadoPpto(Hash){
    Inf_ComAgencia = [];
    ModalEdit2(0)
    var html = "";
    

    TituloVentana = "Agregar Empleado Presupuesto General "+$(".YearPpto"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body FormsGeneral' >";
        html += "<div class='form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Empleado:</label>";
                html += "<input autocomplete = 'on' type='text' name='Inf_CompAgencia' onkeyup = 'ListarPersonalPptoGeneral()' id='Inf_CompAgencia' class='form-control'>"
                html += "<p></p>"
                html += "<div class = 'ComListAsistentesAgencia'></div>"
                html += "<p></p>"
                html += "<div class = 'ContentListUser ComAgencia'></div>"
            html += "</div>";
        html += "</div>";
    html += "</div>"
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEmpleadosPptoGeneral("+Hash+")'>Guardar</button>";
    html += "</div>";
    $(".content_modal3").html(html)
}

function GuardarEmpleadosPptoGeneral(Hash){
    if( Inf_ComAgencia.length > 0 && $('input:radio[name=MesesPptoGeneral]:checked').val() != undefined ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("Mes",$('input:radio[name=MesesPptoGeneral]:checked').val() );
        formData.append("Empleados", JSON.stringify(Inf_ComAgencia));
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f773ebc56040ee627e91e6dee2aec0b9',
            success:function(data){
                //alert(data.mensaje)
                CierraModal("myModal","ModalEdit2")
                InformacionPptoGeneralMeses($('input:radio[name=MesesPptoGeneral]:checked').val(),Hash)
            }
        })
    }else{
        alert("No se han ingresado empleado para agregar el presupuesto.");
    }
}

function ListarPersonalPptoGeneral(){
    if( $("#Inf_CompAgencia").val().length > 2 ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '3115db3fb13ad9db964287eed6b9cd37x',
            data:{Hash:$("#Inf_CompAgencia").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Inf_ComAgencia = [];
                Temp_Inf_ComAgencia = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Inf_ComAgencia.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PCOMAgen' value='"+Temp_Inf_ComAgencia[i]['IdUsuario']+"' id='PCOMAgen"+Temp_Inf_ComAgencia[i]['IdUsuario']+"' onclick = 'AddEmpleadoPpto("+Temp_Inf_ComAgencia[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td class = 'PCOMAgen"+Temp_Inf_ComAgencia[i]['IdUsuario']+"'>"+Temp_Inf_ComAgencia[i]['NombreUsuario']+"</td>"
                            
                        html += "</tr>"
                    }
                    if( Temp_Inf_ComAgencia.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'font-weight: bold;color: red;'>No se han encontrado datos para la información ingresada.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ComListAsistentesAgencia").html(html+"<br>")
            }
        })
    }
}

function AddEmpleadoPpto(Hash,T){
    $("#Inf_CompAgencia").val("")
    Inf_ComAgencia.push({
        'Nombre': $(".PCOMAgen"+Hash).text(),
        'IdU':$("#PCOMAgen"+Hash).val(),
    })
    $(".ComListAsistentesAgencia").html("")
    ListarEmpleadoPpto()
}
function ListarEmpleadoPpto(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < Inf_ComAgencia.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+Inf_ComAgencia[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelAsisAgencia("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".ComAgencia").html(html)
}

function CrearItemsPptoGeneral(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a185344624d211a147742da2f0d6f056',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            

            TituloVentana = "Crear Items Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Grupo:</label>"
                                html += "<select class = 'form-control' name = 'IdGrupo' id = 'IdGrupo' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info.length; i++){
                                        html += "<option value = '"+data.Info[i]['Hash']+"' >"+data.Info[i]['Tipo']+" - "+data.Info[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'nombreitem' id = 'nombreitem' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Entidad:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'entidad' id = 'entidad' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Contacto:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'contacto' id = 'contacto' class = 'form-control' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Teléfono:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'telefono' id = 'telefono' class = 'form-control' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número Obligación:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'obligacion' id = 'obligacion' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Presupuestado Mensual:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' class = 'pptadomensual form-control' required />"
                                html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>0</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Periodicidad:</label>"
                                html += "<select class = 'form-control' name = 'IdPeriodicidad' id = 'IdPeriodicidad' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info2.length; i++){
                                        html += "<option value = '"+data.Info2[i]['Hash']+"' >"+data.Info2[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoItemPptoGeneral("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormNuevoItemPptoGeneral"+Hash).validate({
                rules: {
                    nombreitem : {
                        required: true,
                        minlength:2
                    },
                    IdGrupo : {
                        required: true,
                        minlength:1
                    },
                    entidad : {
                        required: true,
                        minlength:1
                    },
                    obligacion : {
                        required: true,
                        minlength:1
                    },
                    pptadomensual : {
                        required: true,
                        minlength:1
                    },
                    IdPeriodicidad : {
                        required: true,
                        minlength:1
                    }
                }
            });

        }
    })
}

function CrearItemsPptoPersonal(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a185344624d211a147742da2f0d6f056x',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            

            TituloVentana = "Crear Items Presupuesto Personal "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Grupo:</label>"
                                html += "<select class = 'form-control' name = 'IdGrupo' id = 'IdGrupo' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info.length; i++){
                                        html += "<option value = '"+data.Info[i]['Hash']+"' >"+data.Info[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'nombreitem' id = 'nombreitem' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Presupuestado Mensual:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' class = 'pptadomensual form-control' required />"
                                html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>0</span>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoItemPptoPersonal("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.35)

            $FormValidate = $(".FormNuevoItemPptoGeneral"+Hash).validate({
                rules: {
                    nombreitem : {
                        required: true,
                        minlength:2
                    },
                    IdGrupo : {
                        required: true,
                        minlength:1
                    },
                    pptadomensual : {
                        required: true,
                        minlength:1
                    },
                }
            });

        }
    })
}


function GuardarNuevoItemPptoPersonal(Hash){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'7a75df48c21b103b6be60ca0d7ce8aa8x',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreitem: $("#nombreitem").val(),
                IdGrupo: $("#IdGrupo").val(),
                pptadomensual: $("#pptadomensual_real").text(),
            },
            success:function(data){
                EventosCierreModal()
                InformacionPptoPersonalMeses(1,Hash)
                $("#ModalEdit2").modal("show")
                ResizeModal(0.95)
            }
        });
    }
}

function GuardarNuevoItemPptoGeneral(Hash){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '7a75df48c21b103b6be60ca0d7ce8aa8',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreitem: $("#nombreitem").val(),
                IdGrupo: $("#IdGrupo").val(),
                entidad: $("#entidad").val(),
                contacto: $("#contacto").val(),
                telefono: $("#telefono").val(),
                obligacion: $("#obligacion").val(),
                pptadomensual: $("#pptadomensual_real").text(),
                IdPeriodicidad: $("#IdPeriodicidad").val(),
            },
            success:function(data){
                EventosCierreModal()
                ConsultarDetallePptoGeneral(Hash)
                $("#ModalEdit2").modal("show")
            }
        });
    }
}

function ValorEjecutadoMesPptoPersonal(Hash,IdIng,IdItem){
    var html = "";
    html += "<table >"
        html += "<tr>"
            html += "<td>"
            html += "<input autocomplete='off' id = 'valortasa' onkeyup = 'formatValorCompra()' type='text' class = 'form-control valortasa' value = '0' required/>";
            html += "<input type='hidden' class ='form-control valortasadonacion valorcompra' name = 'valortasa' value = '0' />";
            html += "</td>"
        html += "</tr>"
        html += "<tr>"
            html += "<td class = 'CenterText'><br>"
            html += "<button class = 'btn btn-primary' onclick = 'GuardarMesPptoPersonalItem("+Hash+","+IdIng+","+IdItem+")'>Guardar</button>"
            html += "</td>"
        html += "</tr>"
    html += "</table >"
    $(".__EdicionItem_"+IdIng+"_"+IdItem).html( html )
}

function GuardarMesPptoPersonalItem(Hash,IdIng,IdItem){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6c5bba3f8a4b1d4160613130a0320ad4xx',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            IdIng: IdIng,
            IdItem: IdItem,
            valortasadonacion: $(".valortasadonacion").val(),
            MesesPptoGeneral:$("#parBanco").val(),
        },
        success:function(data){
            InformacionPptoPersonalMeses(1,Hash)
        }
    });
}

function _EditarItemPe(Id,Hash){
    var html = "";
    html += "<table >"
        html += "<tr>"
            html += "<td>"
            html += "<input autocomplete='off' id = 'valortasa' onkeyup = 'formatValorCompra()' value = '$ "+formatNumber.new($(".__ValorItemP_"+Id).text())+"'type='text' class = 'form-control valortasa' value = '0' required/>";
            html += "<input type='hidden' class ='form-control valortasadonacion valorcompra' name = 'valortasa' value = '"+$(".__ValorItemP_"+Id).text()+"' />";
            html += "</td>"
        html += "</tr>"
        html += "<tr>"
            html += "<td class = 'CenterText'><br>"
            html += "<button class = 'btn btn-primary' onclick = 'GuardarItemPptoPersonalMensual("+Id+","+Hash+")'>Guardar</button>"
            html += "</td>"
        html += "</tr>"
    html += "</table >"
    $("._EdicionItem"+Id).html( html )
}

function GuardarItemPptoPersonalMensual(Id,Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6c5bba3f8a4b1d4160613130a0320ad4xxx',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Id: Id,
            valortasadonacion: $(".valortasadonacion").val(),
        },
        success:function(data){
            InformacionPptoPersonalMeses(1,Hash)
        }
    });
}

function _EliminarItemPptoPersonal(Id,Hash){
    if( confirm("+¿Está seguro(a) de Eliminar este item?") ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '6c5bba3f8a4b1d4160613130a0320ad4xxxx',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Id: Id,
            },
            success:function(data){
                InformacionPptoPersonalMeses(1,Hash)
            }
        });
    }
}

function InformacionPptoPersonalMeses(Mes,Hash){
    PptoGeneral_MesActivo = $("#parBanco").val();
    $(".meses"+PptoGeneral_MesActivo).prop("checked", true);
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6c5bba3f8a4b1d4160613130a0320ad4x',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash,
            Emp: $(".NEmpx").text(),
            MesesPptoGeneral:$("#parBanco").val(),
        },
        success:function(data){
            var html = "";
            
            var Temp_RegistrosFijos = [];
            
            html += "<table class = '' >"
                html += "<tr>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>Descripción</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>Año</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>Mes</th>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th class = 'subtitulos_principales' colspan = '6'>INGRESOS</th>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>Pesos</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>Pesos</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th class = 'cabecera_th_dark CenterText'>TRM Dolar</th>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'td_cuerpo_table'>"+HtmlValores_Doble( data.Dolar[0]['valor'] )+"</th>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                var TotalIngresosMensual = 0;
                var TotalIngresosAnual = 0;
                for( var i = 0; i < data.Ingresos.length; i++ ){
                    TotalIngresosMensual += parseFloat( data.Ingresos[i]['ValorMensual'] )
                    TotalIngresosAnual += parseFloat( data.Ingresos[i]['ValorMensual'] *12 )
                    html += "<tr>"
                        html += "<td class = 'td_cuerpo_table CenterText'>"+(i+1)+"</td>"
                        html += "<td class = 'td_cuerpo_table'>"+data.Ingresos[i]['Nombre']+"</td>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<td class = 'td_cuerpo_table '>"+HtmlValores_Doble(data.Ingresos[i]['ValorMensual']*12)+"</td>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<td class = 'td_cuerpo_table '>"+HtmlValores_Doble(data.Ingresos[i]['ValorMensual'])+"</td>"
                    html += "</tr>"
                }
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th class = 'subtitulos_principales' colspan = '2'>TOTAL INGRESOS</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(TotalIngresosAnual)+"</td>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(TotalIngresosMensual)+"</td>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th class = 'subtitulos_principales' colspan = '2'>TOTAL EGRESOS</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(924329376)+"</td>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(77027448)+"</td>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                html += "<tr>"
                    html += "<th class = 'subtitulos_principales' colspan = '2'>TOTAL DIFERENCIAL</th>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(-267795288)+"</td>"
                    html += "<th style = 'border:0px;'></th>"
                    html += "<td class = 'subtitulos_principales '>"+HtmlValores_Doble(-22316274)+"</td>"
                html += "</tr>"
            html += "</table>"
            html += "<hr>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<th class = 'subtitulos_principales' style = 'background-color:Red;color:white;' colspan = '6'>GASTOS GENERALES</th>"
                    html += "<th style = 'border:0px;' colspan = '5'></th>"
                    html += "<th class = 'subtitulos_principales' style = 'background-color:Red;color:white;' colspan = '6'>FUENTE DE PAGO</th>"
                html += "</tr>"

                html += "<tr><td style = 'border:0px;'><br></td></tr>"

                for( var i = 0; i < data.Grupos.length;i++ ){
                    html += "<tr>"
                        html += "<th colspan = '6' class = 'subtitulos_principales'>"+data.Grupos[i]['Nombre']+"</th>"
                        html += "<th style = 'border:0px;' colspan = '5'></th>"
                        html += "<th colspan = '"+(data.Ingresos.length*2)+"' class = 'subtitulos_principales'>"+data.Grupos[i]['Nombre']+"</th>"
                    html += "</tr>"

                    html += "<tr><td style = 'border:0px;'><br></td></tr>"

                    html += "<tr>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Descripción</th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Año</th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Mes</th>"
                    html += "</tr>"

                    html += "<tr><td style = 'border:0px;'><br></td></tr>"
                    html += "<tr>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Pesos</th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Pesos</th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Dolar</th>"
                        html += "<th style = 'border:0px;'></th>"
                        html += "<th class = 'cabecera_th_dark CenterText'>Dolar</th>"
                        html += "<th style = 'border:0px;'></th>"
                        for( var p = 0; p < data.Ingresos.length; p++ ){
                            html += "<th class = 'cabecera_th_dark CenterText'>"+data.Ingresos[p]['Nombre']+"</th>"
                            html += "<th style = 'border:0px;'></th>"
                        }
                    html += "</tr>"
                    for( var t = 0; t < data.Grupos[i]['Items'].length; t++ ){
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(t+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table '><table width = '100%'><tr><td><img src = '../images/eliminar.png' height= '30px' onclick = '_EliminarItemPptoPersonal("+data.Grupos[i]['Items'][t]['Id']+","+Hash+")'/></td><td style = 'text-align:left;'nowrap >"+data.Grupos[i]['Items'][t]['Nombre']+"</td></tr></table></td>"

                            html += "<th style = 'border:0px;'></th>"
                            html += "<td class = 'td_cuerpo_table '>"+HtmlValores_Doble(data.Grupos[i]['Items'][t]['ValorMensual']*12)+"</td>"
                            html += "<th style = 'border:0px;'></th>"
                            html += "<td class = 'td_cuerpo_table '>"+HtmlValores_Doble(data.Grupos[i]['Items'][t]['ValorMensual'])+"</td>"

                            html += "<th style = 'border:0px;'></th>"
                            html += "<td class = 'td_cuerpo_table '></td>"
                            html += "<th style = 'border:0px;'></th>"
                            html += "<td class = 'td_cuerpo_table '></td>"
                            html += "<th style = 'border:0px;'></th>"
                            for( var y = 0; y < data.Grupos[i]['Items'][t]['Ingresos'].length; y++ ){
                                
                                if( data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'].length == 0 ){
                                    html += "<td class = 'td_cuerpo_table '>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td width = '200px' class = '__EdicionItem_"+data.Grupos[i]['Items'][t]['Ingresos'][y]['Id']+"_"+data.Grupos[i]['Items'][t]['Id']+"'>"+HtmlValores_Doble(0)+"</td>"
                                                html += "<td class = 'CenterText'><img onclick = 'ValorEjecutadoMesPptoPersonal("+Hash+","+data.Grupos[i]['Items'][t]['Ingresos'][y]['Id']+","+data.Grupos[i]['Items'][t]['Id']+")'src = '../images/editar.png' height= '30px' class = 'Cursor'></td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                }else{
                                    for( var l = 0; l < data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'].length; l++ ){
                                        html += "<td class = 'td_cuerpo_table '>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td width = '200px' class = '_EdicionItem"+data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'][l]['Id']+"'>"+HtmlValores_Doble(data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'][l]['ValorPagado'])+"</td>"
                                                    html += "<td class = 'CenterText'><img src = '../images/editar.png' onclick = '_EditarItemPe("+data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'][l]['Id']+","+Hash+")' height= '30px' class = 'Cursor'><span class = 'HiddenInformation __ValorItemP_"+data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'][l]['Id']+"'>"+data.Grupos[i]['Items'][t]['Ingresos'][y]['Movimiento'][l]['ValorPagado']+"</span></td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        
                                    }
                                    
                                }
                                
                                html += "<th style = 'border:0px;'></th>"
                            }
                        html += "</tr>"
                    }
                    html += "<tr><td style = 'border:0px;'><br></td></tr>"
                    
                }
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
            html += "</table>"
            /*
            html += "<table class = 'PptoGeneral' style = 'width:100%'>"
                html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>COSTOS FIJOS</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio' style = 'width:20px;'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Fijos.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' class = 'CenterText'>"+data.Fijos[i]['nombre']+"</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionGrupoPpto("+data.Fijos[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarInformacionGrupoPpto("+data.Fijos[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio' style = 'width:20px;'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales'>Entidad</th>"
                        html += "<th class = 'subtitulos_principales'>Contacto</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Número Obligación</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio' style = 'width:20px;' ></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Fijos[i]['Items'].length;x++){
                        var Pptado = data.Fijos[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Fijos[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Nombre']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Entidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Contacto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['NumObligacion']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Pptado_Mes'])+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>"+data.Fijos[i]['Items'][x]['Periodicidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                    html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionItemPpto("+data.Fijos[i]['Items'][x]['Id']+","+Hash+")'/>"
                                }
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemPptoGeneral("+Hash+","+data.Fijos[i]['Items'][x]['Id']+" )'/></td>"

                            html += "<th class = 'Espacio' style = 'width:20px;'></th>"

                            for(var xi = 0; xi < data.Fijos[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'AgregarItemPptoUnidadMes("+Hash+","+data.Fijos[i]['Items'][x]['Hash']+","+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                        var ClassAdd = "";
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['FechaDePago']+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Dif'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorDif'])+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarItemPptoUnidadMes("+Hash+","+data.Fijos[i]['Items'][x]['Hash']+","+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = (Pagado/Pptado)*100;

                            html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado - Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (100 - ((Pagado/Pptado)*100)) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }

                    //TOTALIZACIÓN
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td colspan = '10'></td>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.TotalFijoUnidad.length; xi++){
                            if( data.TotalFijoUnidad[xi]['Id'] == data.Fijos[i]['Id'] ){
                                var PptadoGrupo = 0;
                                var EjecutadoGrupo = 0;
                                for(var y = 0; y < data.TotalFijoUnidad[xi]['Empresas'].length; y++){
                                    if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'].length > 0 ){
                                        for(var l = 0; l < data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'].length;l++){

                                            PptadoGrupo = data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'];
                                            EjecutadoGrupo += data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];


                                            var PorcentajePagado = 0;

                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PorcentajePagado = parseFloat((data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }

                                            var PendientePago = data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] - data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];
                                            var PendientePorcentajePagadoX = 0;
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PendientePorcentajePagadoX = parseFloat(100-(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }
                                            html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                            var ClassAdd = "";
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] == 0 ){
                                                ClassAdd = " Pendiente "
                                            }else
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] < data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_positiva "
                                            }
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] > data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_negativa "
                                            }

                                            html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"
                                            
                                        }
                                        html += "<th class = 'Espacio'></th>"
                                    }
                                    
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PptadoTotalGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                    var ClassAdd = "";
                                    if( EjecutadoGrupo == 0 ){
                                        ClassAdd = " Pendiente "
                                    }else
                                    if( EjecutadoGrupo < PptadoTotalGrupo ){
                                        ClassAdd = " alerta_positiva "
                                    }
                                    if( EjecutadoGrupo > PptadoTotalGrupo ){
                                        ClassAdd = " alerta_negativa "
                                    }

                                    var PorcentajePagadoGrupo = (EjecutadoGrupo/PptadoTotalGrupo)*100;
                                    var PendientePorcentajePagadoGrupo = 100-(EjecutadoGrupo/PptadoTotalGrupo)*100;

                                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td><br></td></tr>"
                    
                }
                html += "<tr><td><br></td></tr>"
                
                //GRAN TOTAL FIJOS
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark'>TOTAL COSTOS FIJOS</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalFijos.length; y++){
                        if( data.GranTotalFijos[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalFijos[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalFijos[y]['Unidades'][l]['ValorPagado']/data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado']/data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalFijos[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] < data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] > data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }

                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }

                    var PorcentajePagadoGrupo = (xEjecutadoGrupo/xPptadoGrupo)*100;
                    var PendientePorcentajePagadoGrupo = 100-(xEjecutadoGrupo/xPptadoGrupo)*100;

                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
            //-------------------------------------------------VARIABLES-------------------------------------------------------
            html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>COSTOS VARIABLES</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_principal' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Variables.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' class = 'CenterText'>"+data.Variables[i]['nombre']+"</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionGrupoPpto("+data.Variables[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarInformacionGrupoPpto("+data.Variables[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales'>Entidad</th>"
                        html += "<th class = 'subtitulos_principales'>Contacto</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Número Obligación</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Variables[i]['Items'].length;x++){
                        var Pptado = data.Variables[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Variables[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Nombre']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Entidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Contacto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['NumObligacion']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Pptado_Mes'])+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>"+data.Variables[i]['Items'][x]['Periodicidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                    html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionItemPpto("+data.Variables[i]['Items'][x]['Id']+","+Hash+")'/>"
                                }
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemPptoGeneral("+Hash+","+data.Variables[i]['Items'][x]['Id']+" )'/></td>"

                            html += "<th class = 'Espacio'></th>"

                            for(var xi = 0; xi < data.Variables[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'AgregarItemPptoUnidadMes("+Hash+","+data.Variables[i]['Items'][x]['Hash']+","+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                        var ClassAdd = "";
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['FechaDePago']+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Dif'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorDif'])+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarItemPptoUnidadMes("+Hash+","+data.Variables[i]['Items'][x]['Hash']+","+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = 0;
                            if( Pptado == 0 ){
                                PorcentajePagado = 0;
                            }else{
                                PorcentajePagado = (Pagado/Pptado)*100;
                            }

                            html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado - Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (100 - PorcentajePagado) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }

                    //TOTALIZACIÓN
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td colspan = '10'></td>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.TotalVariableUnidad.length; xi++){
                            if( data.TotalVariableUnidad[xi]['Id'] == data.Fijos[i]['Id'] ){
                                var PptadoGrupo = 0;
                                var EjecutadoGrupo = 0;
                                for(var y = 0; y < data.TotalVariableUnidad[xi]['Empresas'].length; y++){
                                    if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length > 0 ){
                                        for(var l = 0; l < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length;l++){

                                            PptadoGrupo = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'];
                                            EjecutadoGrupo += data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];


                                            var PorcentajePagado = 0;

                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PorcentajePagado = parseFloat((data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }

                                            var PendientePago = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] - data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];
                                            var PendientePorcentajePagadoX = 0;
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PendientePorcentajePagadoX = parseFloat(100-(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }
                                            html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                            var ClassAdd = "";
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] == 0 ){
                                                ClassAdd = " Pendiente "
                                            }else
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_positiva "
                                            }
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] > data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_negativa "
                                            }

                                            html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"
                                            
                                        }
                                        html += "<th class = 'Espacio'></th>"
                                    }
                                    
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PptadoTotalGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                    var ClassAdd = "";
                                    if( EjecutadoGrupo == 0 ){
                                        ClassAdd = " Pendiente "
                                    }else
                                    if( EjecutadoGrupo < PptadoTotalGrupo ){
                                        ClassAdd = " alerta_positiva "
                                    }
                                    if( EjecutadoGrupo > PptadoTotalGrupo ){
                                        ClassAdd = " alerta_negativa "
                                    }

                                    var PorcentajePagadoGrupo = 0;
                                    var PendientePorcentajePagadoGrupo = 0;
                                    if( PptadoTotalGrupo == 0 ){
                                        PorcentajePagadoGrupo = 0
                                        PendientePorcentajePagadoGrupo = 0
                                    }else{
                                        PorcentajePagadoGrupo = ((EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                        PendientePorcentajePagadoGrupo = (100-(EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                    }
                                    

                                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td><br></td></tr>"
                    
                }
                html += "<tr><td><br></td></tr>"
                
                //GRAN TOTAL VARIABLES
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark border_bottom_left border_bottom_rigth'>TOTAL COSTOS VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalVariable.length; y++){
                        if( data.GranTotalVariable[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalVariable[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalVariable[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] < data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] > data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }
                                
                                
                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }
                    
                    var PorcentajePagadoGrupo = 0;
                    var PendientePorcentajePagadoGrupo = 0;
                    if( PptadoTotalGrupo == 0 ){
                        PorcentajePagadoGrupo = 0
                        PendientePorcentajePagadoGrupo = 0
                    }else{
                        PorcentajePagadoGrupo = ((xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                        PendientePorcentajePagadoGrupo = (100-(xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                    }


                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
            
            //GRAN TOTAL
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark'>TOTAL COSTOS FIJOS + VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotal.length; y++){
                        if( data.GranTotal[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotal[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotal[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotal[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotal[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotal[y]['Unidades'][l]['ValorPagado']/data.GranTotal[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotal[y]['Unidades'][l]['ValorEstimado'] - data.GranTotal[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotal[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotal[y]['Unidades'][l]['ValorPagado']/data.GranTotal[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotal[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] < data.GranTotal[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] > data.GranTotal[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }

                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }

                    var PorcentajePagadoGrupo = (xEjecutadoGrupo/xPptadoGrupo)*100;
                    var PendientePorcentajePagadoGrupo = 100-(xEjecutadoGrupo/xPptadoGrupo)*100;

                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
                
                //-------------------------------------------------NOMINA-------------------------------------------------------
            html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>NÓMINA</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_principal' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Empleado.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'CenterText'>"+data.Empleado[i]['nombre']+"</td>"
                                    
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales' colspan = '2'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales' >Cargo</th>"
                        html += "<th class = 'subtitulos_principales' >Área</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Empleado[i]['Items'].length;x++){
                        var Pptado = data.Empleado[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Empleado[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap colspan = '2'>"+data.Empleado[i]['Items'][x]['NombreCompleto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Cargo']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Area']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>Mensual</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarEmpleadoPptoGeneral()'/></td>"

                            html += "<th class = 'Espacio'></th>"

                            for(var xi = 0; xi < data.Empleado[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>x</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = 'images/editar.png' class = 'OptionIcon' onclick = 'EditarCostoMensualEmpledao("+Hash+","+data.Empleado[i]['Items'][x]['Hash']+","+data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>100 % </td>"

                                        var ClassAdd = "";
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Porcentaje'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap></td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>0</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] - Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(100- data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Porcentaje'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarCostoMensualEmpledao("+Hash+","+data.Empleado[i]['Items'][x]['Hash']+","+data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = 0;
                            if( Pptado == 0 ){
                                PorcentajePagado = 0;
                            }else{
                                PorcentajePagado = (Pagado/Pptado)*100;
                            }

                            html += "<td class = 'ValoresNum td_cuerpo_table '>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText ' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }
                    
                }
                html += "<tr><td><br></td></tr>"
                /*
                //GRAN TOTAL nomina
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark border_bottom_left border_bottom_rigth'>TOTAL COSTOS VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalVariable.length; y++){
                        if( data.GranTotalVariable[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalVariable[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalVariable[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] < data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] > data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }
                                
                                
                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }
                    
                    var PorcentajePagadoGrupo = 0;
                    var PendientePorcentajePagadoGrupo = 0;
                    if( PptadoTotalGrupo == 0 ){
                        PorcentajePagadoGrupo = 0
                        PendientePorcentajePagadoGrupo = 0
                    }else{
                        PorcentajePagadoGrupo = ((xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                        PendientePorcentajePagadoGrupo = (100-(xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                    }


                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
                */
            html += "</table>"
            $(".ContenedorInformacionPptoGeneralMeses").html(html).css({
                'width':'100%',
                'overflow-x':'scroll',
                'max-height':'600px'
            })
            
            $(".PorcentajesTabla").css({
                'width':'150px'
            })
            $(".OptionIcon").css({
                'height':'25px'
            })
            $(".ContenedorInformacionPptoGeneralMeses").css({
                'font-size':'10px'
            })
        }
    });
}

function InformacionPptoGeneralMeses(Mes,Hash){
    PptoGeneral_MesActivo = $("#parBanco").val();
    $(".meses"+PptoGeneral_MesActivo).prop("checked", true);
    $.ajax({
        type:'POST',
        url:UrlGeneral + '6c5bba3f8a4b1d4160613130a0320ad4',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash,
            Emp: $(".NEmpx").text(),
            MesesPptoGeneral:$("#parBanco").val(),
        },
        success:function(data){
            var html = "";
            
            var Temp_RegistrosFijos = [];
            html += "<table class = 'PptoGeneral' style = 'width:100%'>"
                html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>COSTOS FIJOS</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio' style = 'width:20px;'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Fijos.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' class = 'CenterText'>"+data.Fijos[i]['nombre']+"</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionGrupoPpto("+data.Fijos[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarInformacionGrupoPpto("+data.Fijos[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio' style = 'width:20px;'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales'>Entidad</th>"
                        html += "<th class = 'subtitulos_principales'>Contacto</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Número Obligación</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio' style = 'width:20px;' ></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Fijos[i]['Items'].length;x++){
                        var Pptado = data.Fijos[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Fijos[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Nombre']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Entidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Contacto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Fijos[i]['Items'][x]['NumObligacion']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Pptado_Mes'])+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>"+data.Fijos[i]['Items'][x]['Periodicidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                    html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionItemPpto("+data.Fijos[i]['Items'][x]['Id']+","+Hash+")'/>"
                                }
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemPptoGeneral("+Hash+","+data.Fijos[i]['Items'][x]['Id']+" )'/></td>"

                            html += "<th class = 'Espacio' style = 'width:20px;'></th>"

                            for(var xi = 0; xi < data.Fijos[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'AgregarItemPptoUnidadMes("+Hash+","+data.Fijos[i]['Items'][x]['Hash']+","+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                        var ClassAdd = "";
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['FechaDePago']+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Dif'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorDif'])+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarItemPptoUnidadMes("+Hash+","+data.Fijos[i]['Items'][x]['Hash']+","+data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Fijos[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = (Pagado/Pptado)*100;

                            html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado - Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (100 - ((Pagado/Pptado)*100)) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }

                    //TOTALIZACIÓN
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td colspan = '10'></td>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.TotalFijoUnidad.length; xi++){
                            if( data.TotalFijoUnidad[xi]['Id'] == data.Fijos[i]['Id'] ){
                                var PptadoGrupo = 0;
                                var EjecutadoGrupo = 0;
                                for(var y = 0; y < data.TotalFijoUnidad[xi]['Empresas'].length; y++){
                                    if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'].length > 0 ){
                                        for(var l = 0; l < data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'].length;l++){

                                            PptadoGrupo = data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'];
                                            EjecutadoGrupo += data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];


                                            var PorcentajePagado = 0;

                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PorcentajePagado = parseFloat((data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }

                                            var PendientePago = data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] - data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];
                                            var PendientePorcentajePagadoX = 0;
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PendientePorcentajePagadoX = parseFloat(100-(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }
                                            html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                            var ClassAdd = "";
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] == 0 ){
                                                ClassAdd = " Pendiente "
                                            }else
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] < data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_positiva "
                                            }
                                            if( data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] > data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_negativa "
                                            }

                                            html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalFijoUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"
                                            
                                        }
                                        html += "<th class = 'Espacio'></th>"
                                    }
                                    
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PptadoTotalGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                    var ClassAdd = "";
                                    if( EjecutadoGrupo == 0 ){
                                        ClassAdd = " Pendiente "
                                    }else
                                    if( EjecutadoGrupo < PptadoTotalGrupo ){
                                        ClassAdd = " alerta_positiva "
                                    }
                                    if( EjecutadoGrupo > PptadoTotalGrupo ){
                                        ClassAdd = " alerta_negativa "
                                    }

                                    var PorcentajePagadoGrupo = (EjecutadoGrupo/PptadoTotalGrupo)*100;
                                    var PendientePorcentajePagadoGrupo = 100-(EjecutadoGrupo/PptadoTotalGrupo)*100;

                                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td><br></td></tr>"
                    
                }
                html += "<tr><td><br></td></tr>"
                
                //GRAN TOTAL FIJOS
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark'>TOTAL COSTOS FIJOS</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalFijos.length; y++){
                        if( data.GranTotalFijos[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalFijos[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalFijos[y]['Unidades'][l]['ValorPagado']/data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado']/data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalFijos[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] < data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'] > data.GranTotalFijos[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }

                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalFijos[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }

                    var PorcentajePagadoGrupo = (xEjecutadoGrupo/xPptadoGrupo)*100;
                    var PendientePorcentajePagadoGrupo = 100-(xEjecutadoGrupo/xPptadoGrupo)*100;

                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
            //-------------------------------------------------VARIABLES-------------------------------------------------------
            html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>COSTOS VARIABLES</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_principal' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Variables.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' class = 'CenterText'>"+data.Variables[i]['nombre']+"</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionGrupoPpto("+data.Variables[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                    html += "<td style = 'width:5%;' class = 'CenterText'>"
                                        if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO.length > 0 ){
                                            html += "<img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarInformacionGrupoPpto("+data.Variables[i]['Hash']+","+Hash+")'/>"
                                        }
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales'>Entidad</th>"
                        html += "<th class = 'subtitulos_principales'>Contacto</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Número Obligación</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Variables[i]['Items'].length;x++){
                        var Pptado = data.Variables[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Variables[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Nombre']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Entidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Contacto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Variables[i]['Items'][x]['NumObligacion']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Pptado_Mes'])+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>"+data.Variables[i]['Items'][x]['Periodicidad']+"</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                    html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionItemPpto("+data.Variables[i]['Items'][x]['Id']+","+Hash+")'/>"
                                }
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemPptoGeneral("+Hash+","+data.Variables[i]['Items'][x]['Id']+" )'/></td>"

                            html += "<th class = 'Espacio'></th>"

                            for(var xi = 0; xi < data.Variables[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'AgregarItemPptoUnidadMes("+Hash+","+data.Variables[i]['Items'][x]['Hash']+","+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                        var ClassAdd = "";
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Valor'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['FechaDePago']+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Dif'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorDif'])+"</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['PorcentajePagado'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarItemPptoUnidadMes("+Hash+","+data.Variables[i]['Items'][x]['Hash']+","+data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Variables[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = 0;
                            if( Pptado == 0 ){
                                PorcentajePagado = 0;
                            }else{
                                PorcentajePagado = (Pagado/Pptado)*100;
                            }

                            html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado - Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (100 - PorcentajePagado) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }

                    //TOTALIZACIÓN
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td colspan = '10'></td>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.TotalVariableUnidad.length; xi++){
                            if( data.TotalVariableUnidad[xi]['Id'] == data.Fijos[i]['Id'] ){
                                var PptadoGrupo = 0;
                                var EjecutadoGrupo = 0;
                                for(var y = 0; y < data.TotalVariableUnidad[xi]['Empresas'].length; y++){
                                    if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length > 0 ){
                                        for(var l = 0; l < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length;l++){

                                            PptadoGrupo = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'];
                                            EjecutadoGrupo += data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];


                                            var PorcentajePagado = 0;

                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PorcentajePagado = parseFloat((data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }

                                            var PendientePago = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] - data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];
                                            var PendientePorcentajePagadoX = 0;
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PendientePorcentajePagadoX = parseFloat(100-(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }
                                            html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                            var ClassAdd = "";
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] == 0 ){
                                                ClassAdd = " Pendiente "
                                            }else
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_positiva "
                                            }
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] > data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_negativa "
                                            }

                                            html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"
                                            
                                        }
                                        html += "<th class = 'Espacio'></th>"
                                    }
                                    
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PptadoTotalGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                    var ClassAdd = "";
                                    if( EjecutadoGrupo == 0 ){
                                        ClassAdd = " Pendiente "
                                    }else
                                    if( EjecutadoGrupo < PptadoTotalGrupo ){
                                        ClassAdd = " alerta_positiva "
                                    }
                                    if( EjecutadoGrupo > PptadoTotalGrupo ){
                                        ClassAdd = " alerta_negativa "
                                    }

                                    var PorcentajePagadoGrupo = 0;
                                    var PendientePorcentajePagadoGrupo = 0;
                                    if( PptadoTotalGrupo == 0 ){
                                        PorcentajePagadoGrupo = 0
                                        PendientePorcentajePagadoGrupo = 0
                                    }else{
                                        PorcentajePagadoGrupo = ((EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                        PendientePorcentajePagadoGrupo = (100-(EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                    }
                                    

                                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td><br></td></tr>"
                    
                }
                html += "<tr><td><br></td></tr>"
                
                //GRAN TOTAL VARIABLES
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark border_bottom_left border_bottom_rigth'>TOTAL COSTOS VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalVariable.length; y++){
                        if( data.GranTotalVariable[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalVariable[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalVariable[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] < data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] > data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }
                                
                                
                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }
                    
                    var PorcentajePagadoGrupo = 0;
                    var PendientePorcentajePagadoGrupo = 0;
                    if( PptadoTotalGrupo == 0 ){
                        PorcentajePagadoGrupo = 0
                        PendientePorcentajePagadoGrupo = 0
                    }else{
                        PorcentajePagadoGrupo = ((xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                        PendientePorcentajePagadoGrupo = (100-(xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                    }


                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
            
            //GRAN TOTAL
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark'>TOTAL COSTOS FIJOS + VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotal.length; y++){
                        if( data.GranTotal[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotal[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotal[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotal[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotal[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotal[y]['Unidades'][l]['ValorPagado']/data.GranTotal[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotal[y]['Unidades'][l]['ValorEstimado'] - data.GranTotal[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotal[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotal[y]['Unidades'][l]['ValorPagado']/data.GranTotal[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotal[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] < data.GranTotal[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotal[y]['Unidades'][l]['ValorPagado'] > data.GranTotal[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }

                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotal[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }

                    var PorcentajePagadoGrupo = (xEjecutadoGrupo/xPptadoGrupo)*100;
                    var PendientePorcentajePagadoGrupo = 100-(xEjecutadoGrupo/xPptadoGrupo)*100;

                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo.toFixed(2)))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo.toFixed(2))+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
                
                //-------------------------------------------------NOMINA-------------------------------------------------------
            html += "<tr>"
                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>NÓMINA</th>"
                    html += "<th class = 'Espacio'></th>"
                    for(var i = 0; i < data.Empresas.length; i++){
                        if( data.Empresas[i]['Unidades'].length > 0 ){
                            html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '"+((10)*data.Empresas[i]['Unidades'].length)+"'>"+data.Empresas[i]['NombreComercial']+"</th>"
                            html += "<th class = 'Espacio'></th>"
                        }
                        
                    }
                    html += "<th class = 'CenterText border_top cabecera_th_principal' colspan = '10'>TOTAL "+data.Mes+"</th>"
                html += "</tr>"

                html += "<tr><td><br></td></tr>"

                var DatosGrupos_Fijos = [];
                for(var i = 0; i < data.Empleado.length;i++){
                    var PptadoTotalGrupo = 0;
                    //DatosGrupos_Fijos.push({NombreGrupo:data.Fijos[i]['nombre']});

                    html += "<tr>"
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td class = 'CenterText'>"+data.Empleado[i]['nombre']+"</td>"
                                    
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '10'>"+data.Empresas[xi]['Unidades'][xx]['nombre']+"</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                        html += "<th class = 'CenterText border_top cabecera_th_dark' colspan = '8'>TOTAL "+data.Mes+"</th>"

                    html += "</tr>"

                    html += "<tr>"
                        html += "<th class = 'subtitulos_principales' style = 'width:100px;'>No.</th>"
                        html += "<th class = 'subtitulos_principales' colspan = '2'>Nombre</th>"
                        html += "<th class = 'subtitulos_principales' >Cargo</th>"
                        html += "<th class = 'subtitulos_principales' >Área</th>"
                        html += "<th class = 'subtitulos_principales'>Teléfono</th>"
                        html += "<th class = 'subtitulos_principales'>Presupuestado Mes</th>"
                        html += "<th class = 'subtitulos_principales'>Periodicidad</th>"
                        html += "<th class = 'subtitulos_principales'>Editar</th>"
                        html += "<th class = 'subtitulos_principales'>Eliminar</th>"

                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.Empresas.length; xi++){
                            if( data.Empresas[xi]['Unidades'].length > 0 ){
                                for(var xx = 0; xx < data.Empresas[xi]['Unidades'].length; xx++){
                                    html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                                    html += "<th class = 'subtitulos_principales PorcentajesTabla' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Pagado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Fecha de Pago</th>"
                                    html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                                    html += "<th class = 'subtitulos_principales' style = 'width:150px;'>%</th>"
                                    html += "<th class = 'subtitulos_principales'>Editar</th>"
                                }
                                html += "<th class = 'Espacio'></th>"
                            }
                        }

                        html += "<th class = 'subtitulos_principales'>Presupuestado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pagado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Pendiente por Pagar</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"
                        html += "<th class = 'subtitulos_principales'>Real Ejecutado</th>"
                        html += "<th class = 'subtitulos_principales'>%</th>"

                    html += "</tr>"
                    
                    var Temp_RegistrosFijos = [];
                    for(var x = 0; x < data.Empleado[i]['Items'].length;x++){
                        var Pptado = data.Empleado[i]['Items'][x]['Pptado_Mes'];
                        var Pagado = 0;
                        var Pagado_normal = 0;
                        PptadoTotalGrupo += data.Empleado[i]['Items'][x]['Pptado_Mes'];
                        
                        
                        html += "<tr>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"+(x+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap colspan = '2'>"+data.Empleado[i]['Items'][x]['NombreCompleto']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Cargo']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Area']+"</td>"
                            html += "<td class = 'td_cuerpo_table' nowrap>"+data.Empleado[i]['Items'][x]['Telefono']+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table'>Mensual</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'>"
                                
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText'><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarEmpleadoPptoGeneral()'/></td>"

                            html += "<th class = 'Espacio'></th>"

                            for(var xi = 0; xi < data.Empleado[i]['Items'][x]['Detalle'].length; xi++){
                                for(var xx = 0; xx < data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'].length; xx++){
                                    if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'].length == 0){
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>x</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'></td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table' nowrap>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(0)+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = 'images/editar.png' class = 'OptionIcon' onclick = 'EditarCostoMensualEmpledao("+Hash+","+data.Empleado[i]['Items'][x]['Hash']+","+data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"

                                    }else{

                                        Pagado += data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];
                                        Pagado_normal = data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'];

                                        html += "<td class = 'td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText' nowrap>100 % </td>"

                                        var ClassAdd = "";
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] == 0 ){
                                            ClassAdd = " Pendiente "
                                        }else
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] < data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'] ){
                                            ClassAdd = " alerta_positiva "
                                        }
                                        if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] > data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'] ){
                                            ClassAdd = " alerta_negativa "
                                        }

                                        html += "<td class = 'ValoresNum td_cuerpo_table "+ClassAdd+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'])+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+" Porcentaje' nowrap>"+HtmlPorcentajes_Doble(data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Porcentaje'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText "+ClassAdd+"' nowrap></td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>0</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>0</td>"
                                        html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                            html += "<table width = '100%'>"
                                                html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['valorpagado'] - Math.round(data.Empleado[i]['Items'][x]['PptadoEmpleado']['TotalGlobal'],2))+"</td>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble(100- data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Items'][0]['Porcentaje'])+"</td>"
                                        html += "<td class = 'td_cuerpo_table CenterText'>"
                                            if( data.INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM.length > 0){
                                                html += "<img src = '../images/editar.png' class = 'OptionIcon' onclick = 'EditarCostoMensualEmpledao("+Hash+","+data.Empleado[i]['Items'][x]['Hash']+","+data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'][xx]['Hash']+")'/>"
                                            }
                                        html += "</td>"
                                    }
                                    
                                }
                            if( data.Empleado[i]['Items'][x]['Detalle'][xi]['Unidades'].length > 0 ){
                                html += "<th class = 'Espacio'></th>"
                            }
                            
                        }
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pptado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                            var ClassAdd = "";
                            if( Pagado == 0 ){
                                ClassAdd = " Pendiente "
                            }else
                            if( Pagado < Pptado ){
                                ClassAdd = " alerta_positiva "
                            }
                            if( Pagado > Pptado ){
                                ClassAdd = " alerta_negativa "
                            }

                            var PorcentajePagado = 0;
                            if( Pptado == 0 ){
                                PorcentajePagado = 0;
                            }else{
                                PorcentajePagado = (Pagado/Pptado)*100;
                            }

                            html += "<td class = 'ValoresNum td_cuerpo_table '>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText ' nowrap>"+HtmlPorcentajes_Doble(Math.round(PorcentajePagado))+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado) )+"</td>"
                            html += "<td class = 'ValoresNum td_cuerpo_table'>"
                                html += "<table width = '100%'>"
                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(Pagado)+"</td>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td class = 'td_cuerpo_table CenterText Porcentaje' nowrap>"+HtmlPorcentajes_Doble( Math.round (PorcentajePagado))+"</td>"
                        html += "</tr>"
                    }
                    /*
                    //TOTALIZACIÓN
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td colspan = '10'></td>"
                        html += "<th class = 'Espacio'></th>"

                        for(var xi = 0; xi < data.TotalVariableUnidad.length; xi++){
                            if( data.TotalVariableUnidad[xi]['Id'] == data.Fijos[i]['Id'] ){
                                var PptadoGrupo = 0;
                                var EjecutadoGrupo = 0;
                                for(var y = 0; y < data.TotalVariableUnidad[xi]['Empresas'].length; y++){
                                    if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length > 0 ){
                                        for(var l = 0; l < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'].length;l++){

                                            PptadoGrupo = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'];
                                            EjecutadoGrupo += data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];


                                            var PorcentajePagado = 0;

                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PorcentajePagado = parseFloat((data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }

                                            var PendientePago = data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] - data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'];
                                            var PendientePorcentajePagadoX = 0;
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                            }else{
                                                PendientePorcentajePagadoX = parseFloat(100-(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado']/data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])*100)
                                            }
                                            html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                            var ClassAdd = "";
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] == 0 ){
                                                ClassAdd = " Pendiente "
                                            }else
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] < data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_positiva "
                                            }
                                            if( data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'] > data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorEstimado'] ){
                                                ClassAdd = " alerta_negativa "
                                            }

                                            html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                            html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                                html += "<table width = '100%'>"
                                                    html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalVariableUnidad[xi]['Empresas'][y]['Unidades'][l]['ValorPagado'])+"</td>"
                                                html += "</table>"
                                            html += "</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                            html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"
                                            
                                        }
                                        html += "<th class = 'Espacio'></th>"
                                    }
                                    
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PptadoTotalGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                                    var ClassAdd = "";
                                    if( EjecutadoGrupo == 0 ){
                                        ClassAdd = " Pendiente "
                                    }else
                                    if( EjecutadoGrupo < PptadoTotalGrupo ){
                                        ClassAdd = " alerta_positiva "
                                    }
                                    if( EjecutadoGrupo > PptadoTotalGrupo ){
                                        ClassAdd = " alerta_negativa "
                                    }

                                    var PorcentajePagadoGrupo = 0;
                                    var PendientePorcentajePagadoGrupo = 0;
                                    if( PptadoTotalGrupo == 0 ){
                                        PorcentajePagadoGrupo = 0
                                        PendientePorcentajePagadoGrupo = 0
                                    }else{
                                        PorcentajePagadoGrupo = ((EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                        PendientePorcentajePagadoGrupo = (100-(EjecutadoGrupo/PptadoTotalGrupo)*100).toFixed(2);
                                    }
                                    

                                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                        html += "<table width = '100%'>"
                                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(EjecutadoGrupo)+"</td>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td><br></td></tr>"
                    */
                }
                html += "<tr><td><br></td></tr>"
                /*
                //GRAN TOTAL nomina
                html += "<tr>"
                    html += "<td colspan = '10' class = 'cabecera_th_dark border_bottom_left border_bottom_rigth'>TOTAL COSTOS VARIABLES</td>"
                    html += "<th class = 'Espacio'></th>"
                    var xPptadoGrupo = 0;
                    var xEjecutadoGrupo = 0;
                    for(var y = 0; y < data.GranTotalVariable.length; y++){
                        if( data.GranTotalVariable[y]['Unidades'].length > 0 ){
                            for(var l = 0; l < data.GranTotalVariable[y]['Unidades'].length;l++){

                                xPptadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'];
                                xEjecutadoGrupo += data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];

                                var PorcentajePagado = 0;

                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PorcentajePagado = parseFloat((data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }

                                var PendientePago = data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] - data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'];
                                var PendientePorcentajePagadoX = 0;
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] == 0 ){

                                }else{
                                    PendientePorcentajePagadoX = parseFloat(100-(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado']/data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])*100)
                                }
                                html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(data.GranTotalVariable[y]['Unidades'][l]['PorcentajeBase'])+"</td>"

                                var ClassAdd = "";
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] == 0 ){
                                    ClassAdd = " Pendiente "
                                }else
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] < data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_positiva "
                                }
                                if( data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'] > data.GranTotalVariable[y]['Unidades'][l]['ValorEstimado'] ){
                                    ClassAdd = " alerta_negativa "
                                }
                                
                                
                                html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagado.toFixed(2)))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap></td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoX.toFixed(2)))+"</td>"
                                html += "<td class = 'ValoresNum cabecera_th_dark'>"
                                    html += "<table width = '100%'>"
                                        html += "<td style = 'width:15%;text-align:left;'>$</td>"
                                        html += "<td style = 'text-align:right;'>"+formatNumber.new(data.GranTotalVariable[y]['Unidades'][l]['ValorPagado'])+"</td>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagado.toFixed(2))+"</td>"
                                html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap></td>"

                            }
                            html += "<th class = 'Espacio'></th>"
                        }
                    }
                    html += "<td class = 'cabecera_th_dark border_bottom_left'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xPptadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble(100)+"</td>"

                    var ClassAdd = "";
                    if( EjecutadoGrupo == 0 ){
                        ClassAdd = " Pendiente "
                    }else
                    if( xEjecutadoGrupo < xPptadoGrupo ){
                        ClassAdd = " alerta_positiva "
                    }
                    if( xEjecutadoGrupo > xPptadoGrupo ){
                        ClassAdd = " alerta_negativa "
                    }
                    
                    var PorcentajePagadoGrupo = 0;
                    var PendientePorcentajePagadoGrupo = 0;
                    if( PptadoTotalGrupo == 0 ){
                        PorcentajePagadoGrupo = 0
                        PendientePorcentajePagadoGrupo = 0
                    }else{
                        PorcentajePagadoGrupo = ((xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                        PendientePorcentajePagadoGrupo = (100-(xEjecutadoGrupo/xPptadoGrupo)*100).toFixed(2);
                    }


                    html += "<td class = 'ValoresNum "+ClassAdd+" cabecera_th_dark '>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText "+ClassAdd+"' nowrap>"+HtmlPorcentajes_Doble((PorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(PendientePago)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText' nowrap>"+HtmlPorcentajes_Doble((PendientePorcentajePagadoGrupo))+"</td>"
                    html += "<td class = 'ValoresNum cabecera_th_dark'>"
                        html += "<table width = '100%'>"
                            html += "<td style = 'width:15%;text-align:left;'>$</td>"
                            html += "<td style = 'text-align:right;'>"+formatNumber.new(xEjecutadoGrupo)+"</td>"
                        html += "</table>"
                    html += "</td>"
                    html += "<td class = 'cabecera_th_dark CenterText border_bottom_right' nowrap>"+HtmlPorcentajes_Doble(PorcentajePagadoGrupo)+"</td>"
                html += "</tr>"
                html += "<tr><td><br></td></tr>"
                */
            html += "</table>"
            $(".ContenedorInformacionPptoGeneralMeses").html(html).css({
                'width':'100%',
                'overflow-x':'scroll',
                'max-height':'600px'
            })
            
            $(".PorcentajesTabla").css({
                'width':'150px'
            })
            $(".OptionIcon").css({
                'height':'25px'
            })
            $(".ContenedorInformacionPptoGeneralMeses").css({
                'font-size':'10px'
            })
        }
    });
}

function EditarCostoMensualEmpledao(Hash,HashEmpleado,HasUnd){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '4eaa751d46f85b35becdcc15f38e351exx',
        data:{Hash:Hash,HashEmpleado:HashEmpleado,HasUnd:HasUnd,mes:$('input:radio[name=MesesPptoGeneral]:checked').val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Editar Costo Empleado</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin EditarCostoEmpleado"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                        
                        html += "<div class = 'form-row'>";
                            
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje:</label>"
                                html += "<input autocomplete = 'off' type = 'number' name = 'porcentajeEmp' id = 'porcentajeEmp' value = '"+formatNumber.new(data.Info[i]['Porcentaje'])+"' class = 'form-control' required />"
                                
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Costo Empleado:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' value = '"+formatNumber.new(data.Info[i]['valorpagado'])+"' class = 'pptadomensual form-control' required />"
                                html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>"+data.Info[i]['Pptado_Mes']+"</span>"
                            html += "</div>"
                            
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDatosEmpleadoPptoGeneral("+Hash+","+HashEmpleado+","+HasUnd+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)
        }
    })
}

function GuardarDatosEmpleadoPptoGeneral(Hash,HashEmpledo,HasUnd){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '4eaa751d46f85b35becdcc15f38e351exxa',
        data:{Hash:Hash,HashEmpleado:HashEmpledo,HasUnd:HasUnd,
            pptadomensual_real:$(".pptadomensual_real").text(),
            porcentajeEmp:$("#porcentajeEmp").val(),
            mes:$('input:radio[name=MesesPptoGeneral]:checked').val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            CierraModal("myModal","ModalEdit2");ResizeModal(0.95)
            InformacionPptoGeneralMeses($('input:radio[name=MesesPptoGeneral]:checked').val(),246800)
        }
    })
}

function EditarInformacionItemPpto(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '4eaa751d46f85b35becdcc15f38e351e',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Editar Item Presupuesto General "+$(".YearPpto"+Hash).text()+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormEditarItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Grupo:</label>"
                                html += "<select class = 'form-control' name = 'IdGrupo' id = 'IdGrupo' required >"
                                    for(var i = 0; i < data.Info3.length; i++){
                                        if( data.Info[0]['IdGrupo'] == data.Info3[i]['id'] ){
                                            html += "<option value = '"+data.Info3[i]['Hash']+"' selected>"+data.Info3[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Info3[i]['Hash']+"' >"+data.Info3[i]['Tipo']+" - "+data.Info3[i]['nombre']+"</option>"
                                        }
                                    }
                                    i = 0;
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[i]['Nombre']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Entidad:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'entidad' id = 'entidad' value = '"+data.Info[i]['Entidad']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Contacto:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'contacto' id = 'contacto' value = '"+data.Info[i]['Contacto']+"'class = 'form-control' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Teléfono:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'telefono' id = 'telefono' value = '"+data.Info[i]['Telefono']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número Obligación:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'obligacion' id = 'obligacion' value = '"+data.Info[i]['NumObligacion']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Presupuestado Mensual:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' value = '"+formatNumber.new(data.Info[i]['Pptado_Mes'])+"' class = 'pptadomensual form-control' required />"
                                html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>"+data.Info[i]['Pptado_Mes']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Periodicidad:</label>"
                                html += "<select class = 'form-control' name = 'IdPeriodicidad' id = 'IdPeriodicidad' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info2.length; i++){
                                        if( data.Info[0]['IdPeriodicidad'] == data.Info2[i]['id'] ){
                                            html += "<option value = '"+data.Info2[i]['Hash']+"' selected>"+data.Info2[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Info2[i]['Hash']+"' >"+data.Info2[i]['nombre']+"</option>"
                                        }

                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneral("+Hash+","+Hash2+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormEditarItemPptoGeneral"+Hash).validate({
                rules: {
                    nombreitem : {
                        required: true,
                        minlength:2
                    },
                    entidad : {
                        required: true,
                        minlength:1
                    },
                    IdGrupo : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    contacto : {
                        required: true,
                        minlength:0
                    },
                    telefono : {
                        required: true,
                        minlength:0
                    },
                    obligacion : {
                        required: true,
                        minlength:1
                    },
                    pptadomensual : {
                        required: true,
                        minlength:1
                    },
                    IdPeriodicidad : {
                        required: true,
                        minlength:1
                    }
                }
            });

        }
    })
}

function EditarInformacionItemPptoEmpleado(Hash,Hash2){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '4eaa751d46f85b35becdcc15f38e351e',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Editar Item Presupuesto General "+$(".YearPpto"+Hash).text()+"</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormEditarItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Grupo:</label>"
                                html += "<select class = 'form-control' name = 'IdGrupo' id = 'IdGrupo' required >"
                                    for(var i = 0; i < data.Info3.length; i++){
                                        if( data.Info[0]['IdGrupo'] == data.Info3[i]['id'] ){
                                            html += "<option value = '"+data.Info3[i]['Hash']+"' selected>"+data.Info3[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Info3[i]['Hash']+"' >"+data.Info3[i]['Tipo']+" - "+data.Info3[i]['nombre']+"</option>"
                                        }
                                    }
                                    i = 0;
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[i]['Nombre']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Entidad:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'entidad' id = 'entidad' value = '"+data.Info[i]['Entidad']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Contacto:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'contacto' id = 'contacto' value = '"+data.Info[i]['Contacto']+"'class = 'form-control' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Teléfono:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'telefono' id = 'telefono' value = '"+data.Info[i]['Telefono']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número Obligación:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'obligacion' id = 'obligacion' value = '"+data.Info[i]['NumObligacion']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Presupuestado Mensual:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' value = '"+formatNumber.new(data.Info[i]['Pptado_Mes'])+"' class = 'pptadomensual form-control' required />"
                                html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>"+data.Info[i]['Pptado_Mes']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Periodicidad:</label>"
                                html += "<select class = 'form-control' name = 'IdPeriodicidad' id = 'IdPeriodicidad' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Info2.length; i++){
                                        if( data.Info[0]['IdPeriodicidad'] == data.Info2[i]['id'] ){
                                            html += "<option value = '"+data.Info2[i]['Hash']+"' selected>"+data.Info2[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Info2[i]['Hash']+"' >"+data.Info2[i]['nombre']+"</option>"
                                        }

                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneral("+Hash+","+Hash2+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormEditarItemPptoGeneral"+Hash).validate({
                rules: {
                    nombreitem : {
                        required: true,
                        minlength:2
                    },
                    entidad : {
                        required: true,
                        minlength:1
                    },
                    IdGrupo : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    contacto : {
                        required: true,
                        minlength:0
                    },
                    telefono : {
                        required: true,
                        minlength:0
                    },
                    obligacion : {
                        required: true,
                        minlength:1
                    },
                    pptadomensual : {
                        required: true,
                        minlength:1
                    },
                    IdPeriodicidad : {
                        required: true,
                        minlength:1
                    }
                }
            });

        }
    })
}

function GuardarEditarItemPptoGeneral(Hash,Hash2){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '30ad113a60b60e4d84733bcc6a1a2d5d',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                nombreitem: $("#nombreitem").val(),
                IdGrupo: $("#IdGrupo").val(),
                HashItem: $("#HashItem").val(),
                entidad: $("#entidad").val(),
                contacto: $("#contacto").val(),
                telefono: $("#telefono").val(),
                obligacion: $("#obligacion").val(),
                pptadomensual: $("#pptadomensual_real").text(),
                IdPeriodicidad: $("#IdPeriodicidad").val(),
            },
            success:function(data){
                $("#myModal").modal("hide")
                $("#ModalEdit2").modal("show")
                ResizeModal(0.95)
                if( PptoGeneral_MesActivo != "" ){
                    InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash2)
                }

                $("#meses"+PptoGeneral_MesActivo).prop("checked", true);

            }
        });
    }
}

function EditarInformacionGrupoPpto(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'bdbdc17ecfdadbb74e64db591f20ae7a',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            TituloVentana = "Editar Grupo Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.9)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormEditarGrupoPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashGrupo' id = 'HashGrupo' value = '"+data.Info[0]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-6 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Gasto:</label>"
                                html += "<select class = 'form-control' name = 'tipocosto' id = 'tipocosto' required>"
                                    if( data.Info[0]['Tipo'] == 'Fijo' ){
                                        html += "<option value = 'FIJO' selected>Fijo</option>"
                                        html += "<option value = 'VARIABLE' >Variable</option>"
                                    }else{
                                        html += "<option value = 'FIJO' >Fijo</option>"
                                        html += "<option value = 'VARIABLE' selected>Variable</option>"
                                    }

                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-6 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'nombregrupo' value = '"+data.Info[0]['nombre']+"' id = 'nombregrupo' class = 'form-control' required />"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarGrupoPptoGeneral("+Hash+","+Hash2+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.35)

            $FormValidate = $(".FormEditarGrupoPptoGeneral"+Hash).validate({
                rules: {
                    nombreunidad : {
                        required: true,
                        minlength:2
                    },
                    HashGrupo : {
                        required: true,
                        minlength:1
                    },
                    descripcionunidad : {
                        required: true,
                        minlength:5
                    }
                }
            });
        }
    });

}

function EliminarInformacionGrupoPpto(Hash,Hash2){
    if (window.confirm("¿Está complemente seguro(a) de Eliminar este Grupo del Presupuesto ?")) {
        $.ajax({
            type:'POST',
            url: UrlGeneral + '782415f10af42fdf521a28d6fc461ada',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash
            },
            success:function(data){
                if( PptoGeneral_MesActivo != "" ){
                    InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash2)
                }
                $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
            }
        });
    }else{

    }
    /*$.ajax({
        type:'POST',
        url: UrlGeneral + 'bdbdc17ecfdadbb74e64db591f20ae7a',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
        }
    });*/

}

function GuardarEditarGrupoPptoGeneral(Hash,Hash2){

    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '8a0a013f55c26a869f0647029dc92a39',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                tipocosto: $("#tipocosto").val(),
                HashGrupo: $("#HashGrupo").val(),
                nombregrupo: $("#nombregrupo").val(),
            },
            success:function(data){
                $("#myModal").modal("hide")
                $("#ModalEdit2").modal("show")
                ResizeModal(0.95)
                if( PptoGeneral_MesActivo != "" ){
                    InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash2)
                }
                $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
                $("#ModalEdit2").modal("show")
            }
        });
    }
}

function AgregarItemPptoUnidadMes(Hash,HashItem,HashUnidad){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0ae83b997ca82b0b86f4260cdc1735ae',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            HashItem: HashItem,
            MesActivo: PptoGeneral_MesActivo,
            HashUnidad: HashUnidad
        },
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Información Item</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit2(1);'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormValorItemMesUnidad'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Mes:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombremes' id = 'nombremes' value = '"+data.Info[0]['NombreMes']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Item:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[0]['NombreItem']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreunidad' id = 'nombreunidad' value = '"+data.Info[0]['NombreUnidad']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor Total:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'valortotalitem_' id = 'valortotalitem_' onkeyup = 'FormatCampoNum(\"valortotalitem_\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Pptado_Mes'])+"' class = 'valortotalitem form-control' required />"
                                html += "<span style = 'display:none;' class = 'valortotalitem' id = 'valortotalitem'>"+data.Info[0]['Pptado_Mes']+"</span>"
                            html += "</div>"

                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'porcentaje_input' id = 'porcentaje_input' onkeyup = 'FormatCampoNumPorcentaje(\"porcentaje_input\",\"porcentaje_real\",\"valor_pagar\",\"valor_pagar_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Porcentaje'])+"' class = 'porcentaje_input form-control' required />"
                                html += "<span style = 'display:none;' class = 'porcentaje_real' id = 'porcentaje_real'>"+data.Info[0]['Porcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor a Pagar:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valor_pagar' id = 'valor_pagar' onkeyup = 'FormatCampoNumPorcentaje_Valor(\"valor_pagar\",\"valor_pagar_real\",\"porcentaje_input\",\"porcentaje_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['ValorPorcentaje'])+"' class = 'valor_pagar form-control' required />"
                                html += "<span style = 'display:none;' class = 'valor_pagar_real' id = 'valor_pagar_real'>"+data.Info[0]['ValorPorcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Valor Pagado:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valorpagado' id = 'valorpagado' onkeyup = 'FormatCampoNum(\"valorpagado\",\"valorpagado_real\")' value = '"+formatNumber.new(data.Info[i]['ValorPagado'])+"' class = 'valorpagado form-control' />"
                                html += "<span style = 'display:none;' class = 'valorpagado_real' id = 'valorpagado_real'>"+data.Info[i]['ValorPagado']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Fecha Pago:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechapago' id = 'fechapago' value = '"+(data.Info[i]['FechaPago'])+"' class = 'form-control' />"

                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit2(1);'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneralUnidadMes("+Hash+","+HashItem+","+HashUnidad+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormValorItemMesUnidad").validate({
                rules: {
                    nombremes : {
                        required: true,
                        minlength:2
                    },
                    nombreitem : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    nombreunidad : {
                        required: true,
                        minlength:1
                    },
                    valortotalitem_ : {
                        required: true,
                        minlength:3
                    },
                    porcentaje_input : {
                        required: true,
                        minlength:1
                    },
                    valor_pagar : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}

function AgregarItemPptoUnidadMesEmpleado(Hash,HashItem,HashUnidad){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0ae83b997ca82b0b86f4260cdc1735aez',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            HashItem: HashItem,
            MesActivo: PptoGeneral_MesActivo,
            HashUnidad: HashUnidad
        },
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Información Item</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormValorItemMesUnidad'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Mes:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombremes' id = 'nombremes' value = '"+data.Info[0]['NombreMes']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Item:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[0]['NombreItem']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreunidad' id = 'nombreunidad' value = '"+data.Info[0]['NombreUnidad']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor Total:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'valortotalitem_' id = 'valortotalitem_' onkeyup = 'FormatCampoNum(\"valortotalitem_\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Pptado_Mes'])+"' class = 'valortotalitem form-control' required />"
                                html += "<span style = 'display:none;' class = 'valortotalitem' id = 'valortotalitem'>"+data.Info[0]['Pptado_Mes']+"</span>"
                            html += "</div>"

                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'porcentaje_input' id = 'porcentaje_input' onkeyup = 'FormatCampoNumPorcentaje(\"porcentaje_input\",\"porcentaje_real\",\"valor_pagar\",\"valor_pagar_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Porcentaje'])+"' class = 'porcentaje_input form-control' required />"
                                html += "<span style = 'display:none;' class = 'porcentaje_real' id = 'porcentaje_real'>"+data.Info[0]['Porcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor a Pagar:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valor_pagar' id = 'valor_pagar' onkeyup = 'FormatCampoNumPorcentaje_Valor(\"valor_pagar\",\"valor_pagar_real\",\"porcentaje_input\",\"porcentaje_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['ValorPorcentaje'])+"' class = 'valor_pagar form-control' required />"
                                html += "<span style = 'display:none;' class = 'valor_pagar_real' id = 'valor_pagar_real'>"+data.Info[0]['ValorPorcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Valor Pagado:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valorpagado' id = 'valorpagado' onkeyup = 'FormatCampoNum(\"valorpagado\",\"valorpagado_real\")' value = '"+formatNumber.new(data.Info[i]['ValorPagado'])+"' class = 'valorpagado form-control' />"
                                html += "<span style = 'display:none;' class = 'valorpagado_real' id = 'valorpagado_real'>"+data.Info[i]['ValorPagado']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Fecha Pago:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechapago' id = 'fechapago' value = '"+(data.Info[i]['FechaPago'])+"' class = 'form-control' />"

                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal();'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneralUnidadMes("+Hash+","+HashItem+","+HashUnidad+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormValorItemMesUnidad").validate({
                rules: {
                    nombremes : {
                        required: true,
                        minlength:2
                    },
                    nombreitem : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    nombreunidad : {
                        required: true,
                        minlength:1
                    },
                    valortotalitem_ : {
                        required: true,
                        minlength:3
                    },
                    porcentaje_input : {
                        required: true,
                        minlength:1
                    },
                    valor_pagar : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}


function AgregarItemPptoUnidadMesNom(Hash,HashItem,HashUnidad){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0ae83b997ca82b0b86f4260cdc1735aeNom',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            HashItem: HashItem,
            MesActivo: PptoGeneral_MesActivo,
            HashUnidad: HashUnidad
        },
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Información Item</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormValorItemMesUnidad'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Mes:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombremes' id = 'nombremes' value = '"+data.Info[0]['NombreMes']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Item:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[0]['NombreItem']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreunidad' id = 'nombreunidad' value = '"+data.Info[0]['NombreUnidad']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor Total:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'valortotalitem_' id = 'valortotalitem_' onkeyup = 'FormatCampoNum(\"valortotalitem_\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Pptado_Mes'])+"' class = 'valortotalitem form-control' required />"
                                html += "<span style = 'display:none;' class = 'valortotalitem' id = 'valortotalitem'>"+data.Info[0]['Pptado_Mes']+"</span>"
                            html += "</div>"

                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'porcentaje_input' id = 'porcentaje_input' onkeyup = 'FormatCampoNumPorcentaje(\"porcentaje_input\",\"porcentaje_real\",\"valor_pagar\",\"valor_pagar_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Porcentaje'])+"' class = 'porcentaje_input form-control' required />"
                                html += "<span style = 'display:none;' class = 'porcentaje_real' id = 'porcentaje_real'>"+data.Info[0]['Porcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor a Pagar:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valor_pagar' id = 'valor_pagar' onkeyup = 'FormatCampoNumPorcentaje_Valor(\"valor_pagar\",\"valor_pagar_real\",\"porcentaje_input\",\"porcentaje_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['ValorPorcentaje'])+"' class = 'valor_pagar form-control' required />"
                                html += "<span style = 'display:none;' class = 'valor_pagar_real' id = 'valor_pagar_real'>"+data.Info[0]['ValorPorcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Valor Pagado:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valorpagado' id = 'valorpagado' onkeyup = 'FormatCampoNum(\"valorpagado\",\"valorpagado_real\")' value = '"+formatNumber.new(data.Info[i]['ValorPagado'])+"' class = 'valorpagado form-control' />"
                                html += "<span style = 'display:none;' class = 'valorpagado_real' id = 'valorpagado_real'>"+data.Info[i]['ValorPagado']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Fecha Pago:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechapago' id = 'fechapago' value = '"+(data.Info[i]['FechaPago'])+"' class = 'form-control' />"

                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal();'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneralUnidadMes("+Hash+","+HashItem+","+HashUnidad+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormValorItemMesUnidad").validate({
                rules: {
                    nombremes : {
                        required: true,
                        minlength:2
                    },
                    nombreitem : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    nombreunidad : {
                        required: true,
                        minlength:1
                    },
                    valortotalitem_ : {
                        required: true,
                        minlength:3
                    },
                    porcentaje_input : {
                        required: true,
                        minlength:1
                    },
                    valor_pagar : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}


function EditarItemPptoUnidadMes(Hash,HashItem,HashUnidad){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0ae83b997ca82b0b86f4260cdc1735ae',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            HashItem: HashItem,
            MesActivo: PptoGeneral_MesActivo,
            HashUnidad: HashUnidad
        },
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Información Item</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            var i = 0;
            html += "<form class='form-signin FormValorItemMesUnidad'  action='javascript:void(0)' method='post' >"
                html += "<input type = 'hidden' name = 'HashItem' id = 'HashItem' value = '"+data.Info[i]['Hash']+"' />"
                html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Mes:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombremes' id = 'nombremes' value = '"+data.Info[0]['NombreMes']+"' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Item:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreitem' id = 'nombreitem' value = '"+data.Info[0]['NombreItem']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'nombreunidad' id = 'nombreunidad' value = '"+data.Info[0]['NombreUnidad']+"'class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor Total:</label>"
                                html += "<input autocomplete = 'off' disabled type = 'text' name = 'valortotalitem_' id = 'valortotalitem_' onkeyup = 'FormatCampoNum(\"valortotalitem_\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Pptado_Mes'])+"' class = 'valortotalitem form-control' required />"
                                html += "<span style = 'display:none;' class = 'valortotalitem' id = 'valortotalitem'>"+data.Info[0]['Pptado_Mes']+"</span>"
                            html += "</div>"

                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Porcentaje:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'porcentaje_input' id = 'porcentaje_input' onkeyup = 'FormatCampoNumPorcentaje(\"porcentaje_input\",\"porcentaje_real\",\"valor_pagar\",\"valor_pagar_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['Porcentaje'])+"' class = 'porcentaje_input form-control' required />"
                                html += "<span style = 'display:none;' class = 'porcentaje_real' id = 'porcentaje_real'>"+data.Info[0]['Porcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Valor a Pagar:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valor_pagar' id = 'valor_pagar' onkeyup = 'FormatCampoNumPorcentaje_Valor(\"valor_pagar\",\"valor_pagar_real\",\"porcentaje_input\",\"porcentaje_real\",\"valortotalitem\")' value = '"+formatNumber.new(data.Info[0]['ValorPorcentaje'])+"' class = 'valor_pagar form-control' required />"
                                html += "<span style = 'display:none;' class = 'valor_pagar_real' id = 'valor_pagar_real'>"+data.Info[0]['ValorPorcentaje']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Valor Pagado:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'valorpagado' id = 'valorpagado' onkeyup = 'FormatCampoNum(\"valorpagado\",\"valorpagado_real\")' value = '"+formatNumber.new(data.Info[i]['ValorPagado'])+"' class = 'valorpagado form-control' />"
                                html += "<span style = 'display:none;' class = 'valorpagado_real' id = 'valorpagado_real'>"+data.Info[i]['ValorPagado']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'></span>  Fecha Pago:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechapago' id = 'fechapago' value = '"+(data.Info[i]['FechaPago'])+"' class = 'form-control' />"

                            html += "</div>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarItemPptoGeneralUnidadMes("+Hash+","+HashItem+","+HashUnidad+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)

            $FormValidate = $(".FormValorItemMesUnidad").validate({
                rules: {
                    nombremes : {
                        required: true,
                        minlength:2
                    },
                    nombreitem : {
                        required: true,
                        minlength:1
                    },
                    HashItem : {
                        required: true,
                        minlength:1
                    },
                    nombreunidad : {
                        required: true,
                        minlength:1
                    },
                    valortotalitem_ : {
                        required: true,
                        minlength:3
                    },
                    porcentaje_input : {
                        required: true,
                        minlength:1
                    },
                    valor_pagar : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}

function GuardarEditarItemPptoGeneralUnidadMes(Hash2,HashItem,HashUnidad){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url: UrlGeneral + '126649b2063cc283960c69c0fd21bfc1',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                MesActivo: PptoGeneral_MesActivo,
                HashUnidad: HashUnidad,
                HashItem: HashItem,
                valortotalitem: $("#valortotalitem").val(),
                porcentaje_real: $("#porcentaje_real").text(),
                valor_pagar_real: $("#valor_pagar_real").text(),
                valorpagado_real: $("#valorpagado_real").text(),
                fechapago: $("#fechapago").val(),
            },
            success:function(data){
                $("#myModal").modal("hide")
                $("#ModalEdit2").modal("show")
                ResizeModal(0.95)
                if( PptoGeneral_MesActivo != "" ){
                    InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash2)
                }
                $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
                $("#ModalEdit2").modal("show")
            }
        });
    }
}

function EliminarItemPptoGeneral(Hash,HashItem){
    if (window.confirm("¿Está complemente seguro(a) de Eliminar este Item del Presupuesto ?")) {
        $.ajax({
            type:'POST',
            url: UrlGeneral + '63e8883db56366fddc4eaab23774439e',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: HashItem
            },
            success:function(data){
                if( PptoGeneral_MesActivo != "" ){
                    InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash)
                }
                $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
                //$("#ModalEdit2").modal("show")
            }
        });
    }else{

    }
}

function OrdenarGruposPpto(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a185344624d211a147742da2f0d6f056',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            

            TituloVentana = "Ordenar Grupos Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                            html += "<table id = 'OrdenAreasUnidad' class = 'tableNew' width = '100%'>";
                                html += "<thead>";
                                    html += "<tr>";
                                        html += "<th>Orden</th>";
                                        html += "<th>Nombre</th>";
                                    html += "</tr>";
                                html += "</thead>";
                                html += "<tbody class = 'TBody'>";

                                if( data.Info.length == 0 ){
                                    html += "<tr>";
                                        html += "<td class = 'OrdenGruposPptoGeneral CenterText' colspan = '2'>No hay Grupos creados en éste Presupuesto.</td>";
                                    html += "</tr>";
                                    $(".TBody").html(html);
                                }else{
                                    for(var i = 0; i < data.Info.length;i++){
                                        html += "<tr class = 'Cursor_AS'>";
                                            html += "<td class = 'OrdenGruposPptoGeneral CenterText'>"+data.Info[i]['orden']+"</td>";
                                            html += "<td>"+data.Info[i]['nombre']+"</td>";
                                            html += "<td class = 'OrdenGruposPptoGeneralId' style = 'display:none;'>"+data.Info[i]['Hash']+"</td>";
                                        html += "</tr>";
                                    }

                                }

                                html += "</tbody>";
                            html += "</table>";
                        html += "</div>";
                    html += "</div>"
                html += "</div>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'CierraModal(\"myModal\",\"ModalEdit2\");ResizeModal(0.95)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarOrdenGruposPptoGeneral("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.45)
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .OrdenGruposPptoGeneral").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });

        }
    })
}

function OrdenarGruposPptoPersonal(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a185344624d211a147742da2f0d6f056x',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            

            TituloVentana = "Ordenar Grupos Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin FormNuevoItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                            html += "<table id = 'OrdenAreasUnidad' class = 'tableNew' width = '100%'>";
                                html += "<thead>";
                                    html += "<tr>";
                                        html += "<th>Orden</th>";
                                        html += "<th>Nombre</th>";
                                    html += "</tr>";
                                html += "</thead>";
                                html += "<tbody class = 'TBody'>";

                                if( data.Info.length == 0 ){
                                    html += "<tr>";
                                        html += "<td class = 'OrdenGruposPptoGeneral CenterText' colspan = '2'>No hay Grupos creados en éste Presupuesto.</td>";
                                    html += "</tr>";
                                    $(".TBody").html(html);
                                }else{
                                    for(var i = 0; i < data.Info.length;i++){
                                        html += "<tr class = 'Cursor_AS'>";
                                            html += "<td class = 'OrdenGruposPptoGeneral CenterText'>"+data.Info[i]['orden']+"</td>";
                                            html += "<td>"+data.Info[i]['nombre']+"</td>";
                                            html += "<td class = 'OrdenGruposPptoGeneralId' style = 'display:none;'>"+data.Info[i]['Hash']+"</td>";
                                        html += "</tr>";
                                    }

                                }

                                html += "</tbody>";
                            html += "</table>";
                        html += "</div>";
                    html += "</div>"
                html += "</div>"
                    html += "<div class='modal-footer'>";html += "<button type='button' class='btn btn-primary' onclick = 'GuardarOrdenGruposPptoPersonal("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.45)
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .OrdenGruposPptoGeneral").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });

        }
    })
}

function OrdenarItemsPptoGeneral(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'a185344624d211a147742da2f0d6f056',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#ModalEdit2").modal("hide");
            var html = "";
            

            TituloVentana = "Ordenar Items Presupuesto General "+$(".YearPpto"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1);ResizeModal(0.95)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<form class='form-signin FormNuevoItemPptoGeneral"+Hash+"'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Grupo:</label>"
                            html += "<select class = 'form-control' name = 'IdGrupo' id = 'IdGrupo' onchange = 'ListarItemsGrupoPptoGeneral()'required>"
                                html += "<option value = '' selected>Seleccione</option>"
                                for(var i = 0; i < data.Info.length; i++){
                                    html += "<option value = '"+data.Info[i]['Hash']+"' >"+data.Info[i]['Tipo']+" - "+data.Info[i]['nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                            html += "<table id = 'OrdenarItesmGruposPptoGeneral' class = 'tableNew' width = '100%'>";
                                html += "<thead>";
                                    html += "<tr>";
                                        html += "<th>Orden</th>";
                                        html += "<th>Nombre</th>";
                                    html += "</tr>";
                                html += "</thead>";
                                html += "<tbody class = 'TBody'>";

                                html += "</tbody>";
                            html += "</table>";
                        html += "</div>";
                    html += "</div>"
                html += "</div>"
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarOrdenItemsGruposPptoGeneral("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal3").html(html);
            $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-lg');
            $("#myModal").modal("show")
            ResizeModal(0.55)
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .OrdenGruposPptoGeneral").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });

        }
    })
}

function ListarItemsGrupoPptoGeneral(){
    $.ajax({
        type:'POST',
        url: UrlGeneral + '28b01a9e6699b2512a06b166274f9ddb',
        data:{Hash:$("#IdGrupo").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            if( data.Info.length == 0 ){
                html += "<tr>";
                    html += "<td class = 'OrdenItemGrupoPptoGeneral CenterText' colspan = '2'>No hay Items dentro de este Grupo.</td>";
                html += "</tr>";
                $(".TBody").html(html);
            }else{
                for(var i = 0; i < data.Info.length;i++){
                    html += "<tr class = 'Cursor_AS'>";
                        html += "<td class = 'OrdenItemGrupoPptoGeneral CenterText'>"+data.Info[i]['orden']+"</td>";
                        html += "<td>"+data.Info[i]['nombre']+"</td>";
                        html += "<td class = 'OrdenItemGrupoPptoGeneralId' style = 'display:none;'>"+data.Info[i]['Hash']+"</td>";
                    html += "</tr>";
                }
                $(".TBody").html(html);
                $(".TBody").sortable({
                    stop: function( event, ui ) {
                        $(".TBody .OrdenItemGrupoPptoGeneral").each(function(index){
                            $(this).html(index+1);
                        });
                    }
                });
            }
        }
    });
}

function GuardarOrdenGruposPptoGeneral(Hash){
    var temp = "";
    $(".OrdenGruposPptoGeneralId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'ec16dab1fa1802e48843298b7946d7b4',
        data:{Hash:Hash,orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            EventosCierreModal()
            $("#myModal").modal("hide")
            $("#ModalEdit2").modal("show")
            if( PptoGeneral_MesActivo != "" ){
                InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash)
            }
            $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
            ResizeModal(0.95)
        }
    });
}


function GuardarOrdenGruposPptoPersonal(Hash){
    var temp = "";
    $(".OrdenGruposPptoGeneralId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url:UrlGeneral+'ec16dab1fa1802e48843298b7946d7b4x',
        data:{Hash:Hash,orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            EventosCierreModal()
            $("#myModal").modal("hide")
            $("#ModalEdit2").modal("show")
            if( PptoGeneral_MesActivo != "" ){
                InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash)
            }
            $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
            ResizeModal(0.95)
        }
    });
}

function GuardarOrdenItemsGruposPptoGeneral(Hash){
    var temp = "";
    $(".OrdenItemGrupoPptoGeneralId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url: UrlGeneral + '5d78f94710898c5881b2ce0d1653e738',
        data:{Hash:Hash,orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            EventosCierreModal()
            $("#myModal").modal("hide")
            $("#ModalEdit2").modal("show")
            if( PptoGeneral_MesActivo != "" ){
                InformacionPptoGeneralMeses(PptoGeneral_MesActivo,Hash)
            }

            $("#meses"+PptoGeneral_MesActivo).prop("checked", true);
            ResizeModal(0.95)
        }
    });
}

function InformacionPersonal(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'5e3f4c1ae5fb38e867802d4698e1dd07',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                        if( data.INFORMACION_EMPRESA_PERSONAL_AGREGAR.length > 0 ){
                            html += "<td class = 'BotonesSuperiores' style = 'padding-left:0px;'>"
                                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearNuevoPersonal(\""+Hash+"\",\""+Hash2+"\")' />";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearNuevoPersonal(\""+Hash+"\",\""+Hash2+"\")' >Nuevo Personal</span>";
                            html += "</td>"
                        }
                        html += "</tr>"
                    html += "</table>";
                html += "</div>"
                if( data.INFORMACION_EMPRESA_PERSONAL_CONSULTAR.length > 0 ){
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-2 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Estado:</label>"
                            html += "<select class = 'form-control' name = 'Personal_Estado' id = 'Personal_Estado' >";
                                html += "<option value = '-1' >Todos</option>"
                                html += "<option value = '1' selected>Activos</option>"
                                html += "<option value = '0' >Inactivos</option>"
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-2 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Unidad de Negocio:</label>"
                            html += "<select class = 'form-control' name = 'Personal_Unidad' id = 'Personal_Unidad' >";
                                html += "<option value = '0' >Todas</option>"
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-2 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Área:</label>"
                            html += "<select class = 'form-control' name = 'Personal_Area' id = 'Personal_Area' >";
                                html += "<option value = '0' >Todas</option>"
                            html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-2 my-2'>"
                            html += "<label for='IdTipoDoc'>Texto:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Personal_TextBusqueda' name = 'Personal_TextBusqueda' />"
                        html += "</div>"
                        html += "<div class='col col-sm-2 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarPersonalTabla("+Hash+",\""+Hash2+"\")'/>"
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable Personal"+Hash+"' id = 'Personal"+Hash+"'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th width = '20px'>No.</th>"
                                html += "<th width = '20px'>Foto</th>"
                                html += "<th nowrap>Nombre Completo</th>"
                                html += "<th >Cargo</th>"
                                html += "<th nowrap >Fecha de Ingreso</th>"
                                html += "<th>Cargado Por</th>"
                                html += "<th nowrap>Cargado El</th>"
                                html += "<th>Estado</th>"
                                html += "<th>Consultar</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table></div>";
                }

            $("._StPer").html(html);
            TablaPersonal(Hash,Hash2)

        }
    });
}

function BuscarPersonalTabla(Hash,Hash2){
    $DataTable_Empresa_Personal.draw();
}

function TablaPersonal(Hash,Hash2){
    $DataTable_Empresa_Personal = $("#Personal"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        scrollY: ResizePagTable(0.60),
        'ajax': {
            'url':UrlGeneral +'fe917cc67051ef277e0537cbbb2dfd42',
            'data':function (d) {
                    d.search['value'] = $("#Personal_TextBusqueda").val();
                    d.search['Unidad'] = $("#Personal_Unidad").val();
                    d.search['Area'] = $("#Personal_Area").val();
                    d.search['Estado'] = $("#Personal_Estado").val();
                    return $.extend({}, d, {
                        'Hash':Hash,'Hash2':Hash2,'_token':document.getElementsByName('_token')[0].value
                    });
                }
        },

        'columns': [

           {
                data: 'Apellido1',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'Cargo',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var ht = '<img src = "../../storage/app/datos/Empleados/'+full.IdEmpleado+'/'+full.foto+'" class = "FotoTablaEmpleado"/>'
                    return '<center>' + ht + '</center>';
                }

            },
           {
               data: 'Hash',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span class = "NombreEmpleadoSpan'+full.Hash+'">' + ht + '</span>';
                }

            },
           {
               data: 'Cargo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

           {
               data: 'FechaIngreso',

               "render": function (data, type, full, meta) {
                    return '<Center >' + data + '</Center>';
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
                    if( full.INFORMACION_EMPRESA_PERSONAL_ESTADO.length > 0 ){
                        if( full.estado == 1 ){
                            hx += '<center ><span onclick = "CambiarEstadoEmpleado('+full.Hash+','+Hash+')">'
                                hx += '<img src ="'+UrlUniversal+'images/activo.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                            hx += '</span></center>'
                        }else{
                            hx += '<center ><span >'
                                hx += '<img src ="'+UrlUniversal+'images/inactivo.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                            hx += '</span></center>'
                        }
                    }

                    return hx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_PERSONAL_CONSULTAR.length > 0 ){
                        hx += '<center ><span onclick = "ConsultarInformacionEmpleado(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\')">'
                            hx += '<img src ="../images/VER1_ICONO.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }

                    return hx;
                }
           },
        ],
        //"order": [[1, "asc"]],

        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#Personal'+Hash).css({'width':'100%'})

}

function CambiarEstadoEmpleado(Hash,HasEmpresa){
    ModalEdit2(1)
    $.ajax({
        type:'POST',
        url:UrlGeneral + '7c96975ed0f163ba43912ed1ac1a4a7dx',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0)
            var html = "";
            
            TituloVentana = "Retirar Empleado"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<div class = 'ChildTabsMenu TabsMenuPersonal1'>";
                html += "<form id='NuevoPersonalEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class='modal-body ContentFormPersonal' >";
                        
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Empleado:</label>"
                                html += "<input autocomplete = 'off' type = 'text'  class = 'form-control' disabled value = '"+$(".NombreEmpleadoSpan"+Hash).text()+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Salida:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'NFechaRetiro' id = 'NFechaRetiro' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Motivo de Retiro:</label>"
                                html += "<select class = 'form-control' name = 'MotivoRetiro' id = 'MotivoRetiro'>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.TipoRetiros.length; i++){
                                        html += "<option value = '"+data.TipoRetiros[i]['Hash']+"'>"+data.TipoRetiros[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='ParLogo'>Observaciones:</label>"
                                html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>"
                            html += "</div>"
                            
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarRetiroEmpleado("+Hash+","+HasEmpresa+")'>Guardar</button>";
                    html += "</div>";
                html += "</form>"
            html += "</div>"
            $(".content_modal2").html(html);
        }
    });
}

function GuardarRetiroEmpleado(Hash,HashEmpresa){
    if( $("#NFechaRetiro").val() != '' && $("#MotivoRetiro").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + 'c20858eb92db585c9f8b4ba1c0873dd6',
            data:{
                Hash:Hash,
                NFechaRetiro:$("#NFechaRetiro").val(),
                MotivoRetiro:$("#MotivoRetiro").val(),
                Observaciones:$("#Observaciones").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                ModalEdit2(0)
                BuscarPersonalTabla(HashEmpresa,"8ee8c351852768a3c969a0a1f1cc27bad17bd7584965386c292eaf33c5640800")
            }
        })
    }else{
        alert("Debe diligenciar los campos Obligatorios");
    }
}

function CrearNuevoPersonal(Hash,Hash2){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '7c96975ed0f163ba43912ed1ac1a4a7d',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            
            var html = "";
            TituloVentana = "Nuevo Empleado"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<div class = ''>";
                html += "<form id='NuevoPersonalEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class='modal-body ContentFormPersonal' >";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"
                                    html += "<img src = '../images/foto.png' height = '100px'/>"
                                    html += "<p></p>"
                                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                                    html += "<div class='custom-file'>"
                                        html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' required />"
                                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione Foto</label>"
                                    html += "</div>";
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'primernombre' id = 'primernombre' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'segundonombre' id = 'segundonombre' class = 'form-control' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Apellido:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'primerapellido' id = 'primerapellido' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Apellido:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'segundoapellido' id = 'segundoapellido' class = 'form-control' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                                html += "<select class = 'form-control' name = 'TipoDocumento' id = 'TipoDocumento' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.TipoDocumento.length; i++){
                                        html += "<option value = '"+data.TipoDocumento[i]['Hash']+"'>"+data.TipoDocumento[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número de Documento:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'numerodocumento' id = 'numerodocumento' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Nacimiento:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechanacimiento' id = 'fechanacimiento' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Sexo:</label>"
                                html += "<select class = 'form-control' name = 'Sexo' id = 'Sexo' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Genero.length; i++){
                                        html += "<option value = '"+data.Genero[i]['Hash']+"'>"+data.Genero[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                                html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required>";
                                    html += "<option value = '0'>Seleccione</option>";
                                    for(var i = 0; i < data.Paises.length;i++){
                                      html += "<option value = '"+data.Paises[i]['IdPais']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                    }
                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                                html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required>";
                                    html += "<option value = ''>Seleccione</option>";

                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                                html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required>";
                                    html += "<option value = ''>Seleccione</option>";

                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Dirección:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'Direccion' id = 'Direccion' class = 'form-control' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Correo Personal:</label>"
                                html += "<input autocomplete = 'off' type = 'email' name = 'correopersonal' id = 'correopersonal' class = 'form-control' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Teléfono Casa:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'telefonocasa' id = 'telefonocasa' class = 'form-control' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Celular:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'celular' id = 'celular' class = 'form-control' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Rh:</label>"
                                html += "<select class = 'form-control' name = 'rh' id = 'rh' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Rh.length; i++){
                                        html += "<option value = '"+data.Rh[i]['Hash']+"'>"+data.Rh[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"

                        html += "<br>"
                        html += "<div class='separator'>Información Empresarial</div>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                                html += "<select class = 'form-control' name = 'unidadnegocio' id = 'unidadnegocio' onchange = 'ListarAreasUnidadNegocioPersonal()' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Unidad.length; i++){
                                        html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Área:</label>"
                                html += "<select class = 'form-control' name = 'area' id = 'area' onchange = 'ListarCargosAreaUnidadPersonal()' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cargo:</label>"
                                html += "<select class = 'form-control' name = 'cargo' id = 'cargo' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Ingreso:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechaingreso' id = 'fechaingreso' class = 'form-control' required />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Contrato:</label>"
                                html += "<select class = 'form-control' name = 'TipoContrato' id = 'TipoContrato' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.TipoContrato.length; i++){
                                        html += "<option value = '"+data.TipoContrato[i]['Hash']+"'>"+data.TipoContrato[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Tiempo en Meses:</label>"
                                html += "<input autocomplete = 'off' type = 'number' min = '0' name = 'tiempocontrato' value = '0' id = 'tiempocontrato' class = 'form-control' required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modalidad de Pago:</label>"
                                html += "<select class = 'form-control' name = 'Tipo_Salario' id = 'Tipo_Salario' required>"
                                    html += "<option value = '' selected>Seleccione</option>"
                                    for(var i = 0; i < data.Tipo_Salario.length; i++){
                                        html += "<option value = '"+data.Tipo_Salario[i]['Hash']+"'>"+data.Tipo_Salario[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Valor Prestacional:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'Prestacional' id = 'Prestacional' onkeyup = 'FormatCampoNum(\"Prestacional\",\"Prestacional_real\")' value = '0' class = 'Prestacional form-control' required />"
                                html += "<span style = 'display:none;' class = 'Prestacional_real' id = 'Prestacional_real'>0</span>"
                            html += "</div>"
                            

                        html += "</div>"
                        
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor No Prestacional:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'NPrestacional' id = 'NPrestacional' onkeyup = 'FormatCampoNum(\"NPrestacional\",\"NPrestacional_real\")' value = '0' class = 'NPrestacional form-control' required />"
                                html += "<span style = 'display:none;' class = 'NPrestacional_real' id = 'NPrestacional_real'>0</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Bonos:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'Bonos' id = 'Bonos' onkeyup = 'FormatCampoNum(\"Bonos\",\"Bonos_real\")' value = '0' class = 'Bonos form-control' required />"
                                html += "<span style = 'display:none;' class = 'Bonos_real' id = 'Bonos_real'>0</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Otros:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'Otros' id = 'Otros' onkeyup = 'FormatCampoNum(\"Otros\",\"Otros_real\")' value = '0' class = 'Otros form-control' required />"
                                html += "<span style = 'display:none;' class = 'Otros_real' id = 'Otros_real'>0</span>"
                            html += "</div>"
                        html += "</div>"

                    html += "</div>"
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' data-dismiss='modal' aria-label='Close' onclick = 'GuardarDatosBasicosPersonal("+Hash+",\""+Hash2+"\")'>Guardar</button>";
                    html += "</div>";
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            ModalEdit(1)
            //var T = $('#ModalEdit').height()*0.65;
            //$('.ContentFormPersonal').css('height',T);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $FormValidate = $("#NuevoPersonalEmpresa").validate({
                rules: {
                    primernombre : {
                        required: true,
                        minlength:2
                    },
                    primerapellido : {
                        required: true,
                        minlength:1
                    },
                    TipoDocumento : {
                        required: true,
                        minlength:1
                    },
                    tiempocontrato : {
                        required: true,
                        minlength:1
                    },
                    numerodocumento : {
                        required: true,
                        minlength:1
                    },
                    fechanacimiento : {
                        required: true,
                        minlength:3
                    },
                    Sexo : {
                        required: true,
                        minlength:1
                    },
                    ParLogo : {
                        required: true,
                        minlength:1
                    },
                    Direccion : {
                        required: true,
                        minlength:3
                    },
                    celular : {
                        required: true,
                        minlength:1
                    },
                    unidadnegocio : {
                        required: true,
                        minlength:1
                    },
                    area : {
                        required: true,
                        minlength:1
                    },
                    cargo : {
                        required: true,
                        minlength:1
                    },
                    rh : {
                        required: true,
                        minlength:1
                    },
                    TipoContrato : {
                        required: true,
                        minlength:1
                    },
                    Tipo_Salario : {
                        required: true,
                        minlength:1
                    },
                    Prestacional : {
                        required: true,
                        minlength:1
                    },
                    NPrestacional : {
                        required: true,
                        minlength:1
                    },
                    Bonos : {
                        required: true,
                        minlength:1
                    },
                    Otros : {
                        required: true,
                        minlength:1
                    },
                    fechaingreso : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });

}

function ListarAreasUnidadNegocioPersonal(){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '78e504495738bba859363168e08d853a',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: $("#unidadnegocio").val()
        },
        success:function(data){
            var ht = "";
            ht += "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Info.length; i++){
                ht += "<option value = '"+data.Info[i]['Hash']+"'>"+data.Info[i]['nombre']+"</option>"
            }
            $("#area").html(ht)
        }
    });
}

function ListarCargosAreaUnidadPersonal(){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'ad61ab06409beca7e98598b52ecff7e7',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: $("#area").val()
        },
        success:function(data){
            var ht = "";
            ht += "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Info.length; i++){
                ht += "<option value = '"+data.Info[i]['Hash']+"'>"+data.Info[i]['nombre']+"</option>"
            }
            $("#cargo").html(ht)
        }
    });
}

function GuardarDatosBasicosPersonal(Hash,Hash2){
    if( $FormValidate.form() == true ){
        var formData = new FormData();

        formData.append("primernombre", $("#primernombre").val());
        formData.append("segundonombre", $("#segundonombre").val());
        formData.append("primerapellido", $("#primerapellido").val());
        formData.append("segundoapellido", $("#segundoapellido").val());
        formData.append("TipoDocumento", $("#TipoDocumento").val());
        formData.append("numerodocumento", $("#numerodocumento").val());
        formData.append("fechanacimiento", $("#fechanacimiento").val());
        formData.append("Sexo", $("#Sexo").val());
        formData.append("Direccion", $("#Direccion").val());
        formData.append("telefonocasa", $("#telefonocasa").val());
        formData.append("celular", $("#celular").val());
        formData.append("correopersonal", $("#correopersonal").val());
        formData.append("unidadnegocio", $("#unidadnegocio").val());
        formData.append("area", $("#area").val());
        formData.append("cargo", $("#cargo").val());
        formData.append("rh", $("#rh").val());
        formData.append("TipoContrato", $("#TipoContrato").val());
        formData.append("Tipo_Salario", $("#Tipo_Salario").val());
        formData.append("fechaingreso", $("#fechaingreso").val());
        formData.append("Prestacional", $("#Prestacional_real").text());
        formData.append("NPrestacional", $("#NPrestacional_real").text());
        formData.append("Bonos", $("#Bonos_real").text());
        formData.append("Otros", $("#Otros_real").text());
        formData.append("tiempocontrato", $("#tiempocontrato").val());

        formData.append("ParGeneralPais", $("#ParGeneralPais").val());
        formData.append("ParGeneralDepartamento", $("#ParGeneralDepartamento").val());
        formData.append("ParGeneralCiudad", $("#ParGeneralCiudad").val());

        var archivos = document.getElementById("ParLogo");
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + '9e97c272e3180e9b5aca0d47aaa5e8a8',
            success:function(data){
                $("#ModalEdit2").modal("hide");
                $("#ModalEdit").modal("show");
                
                $DataTable_Empresa_Personal.draw();
            }
        })
    }
}

function ConsultarInformacionEmpleado(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'add4466ad7992d3438200847948b078f',
        data:{
            _token:document.getElementsByName('_token')[0].value,
            Hash: Hash
        },
        success:function(data){
            ModalEdit2(1)
            var html = "";

            TituloVentana = "Información - "+data.InformacionBasica[0]['NombreCompleto']
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

                  
            html += "<div class='modal-body'>";
                html += "<div id = 'Emp'>";
                    html += "<ul >";
                        html += "<li  >"
                            html += "<a href = '#Emp-1'><span>Datos Básicos</span></a>"
                        html +="</li>";

                        html += "<li onclick = 'ListarInformacionContactosEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >"
                            
                            html += "<a href = '#Emp-2'><span>Contactos Emergencia</span></a>"
                        html +="</li>";
                        
                        html += "<li onclick = 'InformacionEmpresarialEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >"
                            
                            html += "<a href = '#Emp-3'><span>Empresarial</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'DocumentosLegalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >"
                            
                            html += "<a href = '#Emp-4'><span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'DocumentosAdicionalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' '>"
                            
                            html += "<a href = '#Emp-5'><span>Documentos Adicionales</span></a>"
                        html +="</li>";
                    html += "</ul>";

                    html += "<div id = 'Emp-1'>";
                        if( data.InformacionBasica[0]['estado'] == 1 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                        html += "<td class = 'BotonesSuperiores'>"
                                            html += "<img src ='../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionEmpleado_Basica("+Hash+","+Hash2+",\""+Hash3+"\")'/>";
                                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'EditarInformacionEmpleado_Basica("+Hash+","+Hash2+",\""+Hash3+"\")' >Editar</span>";
                                        html += "</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</div>"
                        }
                        
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"
                                if( data.InformacionBasica[0]['Foto'].length == 0 ){
                                    html += "<img src = '../images/foto.png' class = 'FotoTablaEmpleadoInfo'/>"
                                }else{
                                    html += "<img src = '../../storage/app/datos/Empleados/"+data.InformacionBasica[0]['IdEmpleado']+"/"+data.InformacionBasica[0]['Foto']+"' class = 'FotoTablaEmpleadoInfo'/>"
                                }
                                    html += "<p></p>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Nombre:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'primernombre' id = 'primernombre' class = 'form-control' value = '"+data.InformacionBasica[0]['Nombre1']+"'required />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Nombre:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'segundonombre' id = 'segundonombre' class = 'form-control' value = '"+data.InformacionBasica[0]['Nombre2']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Apellido:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'primerapellido' id = 'primerapellido' class = 'form-control' required value = '"+data.InformacionBasica[0]['Apellido1']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Apellido:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'segundoapellido' id = 'segundoapellido' class = 'form-control' value = '"+data.InformacionBasica[0]['Apellido2']+"'/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                                html += "<select readonly class = 'form-control' name = 'TipoDocumento' id = 'TipoDocumento' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['TipoDocumento']+"</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número de Documento:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'numerodocumento' id = 'numerodocumento' class = 'form-control' required value = '"+data.InformacionBasica[0]['Identificacion']+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Nacimiento:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'fechanacimiento' id = 'fechanacimiento' class = 'form-control' required value = '"+data.InformacionBasica[0]['FechaNacimiento']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Sexo:</label>"
                                html += "<select readonly class = 'form-control' name = 'Sexo' id = 'Sexo' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Sexo']+"</option>"
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Dirección:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'Direccion' id = 'Direccion' class = 'form-control' value = '"+data.InformacionBasica[0]['Direccion']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Correo Personal:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'email' name = 'correopersonal' id = 'correopersonal' class = 'form-control' value = '"+data.InformacionBasica[0]['CorreoPersonal']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Teléfono Casa:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'telefonocasa' id = 'telefonocasa' class = 'form-control' required value = '"+data.InformacionBasica[0]['Telefono_Casa']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Celular:</label>"
                                html += "<input readonly autocomplete = 'off' type = 'text' name = 'celular' id = 'celular' class = 'form-control' value = '"+data.InformacionBasica[0]['Celular']+"'/>"
                            html += "</div>"
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Rh:</label>"
                                html += "<select readonly class = 'form-control' name = 'rh' id = 'rh' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['RH']+"</option>"
                                    
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Eps:</label>"
                                html += "<select readonly class = 'form-control' name = 'rh' id = 'rh' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Eps']+"</option>"
                                    
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Fondo Cesantías:</label>"
                                html += "<select readonly class = 'form-control' name = 'FC' id = 'FC' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Fondo_Cesantias']+"</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Fondo Pensiones:</label>"
                                html += "<select readonly class = 'form-control' name = 'FP' id = 'FP' required>"
                                    html += "<option value = '' selected>"+data.InformacionBasica[0]['Fondo_Pensiones']+"</option>"
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div id = 'Emp-2'>";
                    html += "</div>"
                    html += "<div id = 'Emp-3'>";
                    html += "</div>"
                    html += "<div id = 'Emp-4'>";
                    html += "</div>"
                    html += "<div id = 'Emp-5'>";
                    html += "</div>"
                    
            html += "</div>";

            $(".content_modal2").html(html);
            $("#Emp").tabs()
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            MostrarTabsMenu(1)
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)
        }
    });
}


function EditarInformacionEmpleado_Basica(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'68b27749a69090c4bceba332784adbdd',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit2(0)
            ModalEdit(1)
            var html = "";
            TituloVentana = "Editar - "+data.InformacionBasica[0]['NombreCompleto']
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0);ModalEdit2(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<div class = 'ChildTabsMenu TabsMenuPersonal1'>";
                html += "<form id='EditarPersonalEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class='modal-body ContentFormPersonal' >";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"
                                    html += "<img src = '../../storage/app/datos/Empleados/"+data.InformacionBasica[0]['IdEmpleado']+"/"+data.InformacionBasica[0]['Foto']+"' class = 'FotoTablaEmpleadoInfo'/>"
                                    html += "<p></p>"
                                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                                    html += "<div class='custom-file'>"
                                        html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' />"
                                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione Foto</label>"
                                    html += "</div>";
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'primernombre' id = 'primernombre' class = 'form-control' required value = '"+data.InformacionBasica[0]['Nombre1']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Nombre:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'segundonombre' id = 'segundonombre' class = 'form-control' value = '"+data.InformacionBasica[0]['Nombre2']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Primer Apellido:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'primerapellido' id = 'primerapellido' class = 'form-control' required value = '"+data.InformacionBasica[0]['Apellido1']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Segundo Apellido:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'segundoapellido' id = 'segundoapellido' class = 'form-control' value = '"+data.InformacionBasica[0]['Apellido2']+"'/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                                html += "<select class = 'form-control' name = 'TipoDocumento' id = 'TipoDocumento' required>"
                                    for(var i = 0; i < data.TipoDocumento.length; i++){
                                        if( data.InformacionBasica[0]['IdTipoDocPersona'] == data.TipoDocumento[i]['Hash'] ){
                                            html += "<option value = '"+data.TipoDocumento[i]['Hash']+"' selected>"+data.TipoDocumento[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.TipoDocumento[i]['Hash']+"'>"+data.TipoDocumento[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Número de Documento:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'numerodocumento' id = 'numerodocumento' class = 'form-control' required value = '"+data.InformacionBasica[0]['Identificacion']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Nacimiento:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechanacimiento' id = 'fechanacimiento' class = 'form-control' required value = '"+data.InformacionBasica[0]['FechaNacimiento']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Sexo:</label>"
                                html += "<select class = 'form-control' name = 'Sexo' id = 'Sexo' required>"
                                    for(var i = 0; i < data.Genero.length; i++){
                                        if( data.InformacionBasica[0]['IdGenero'] == data.Genero[i]['Hash'] ){
                                            html += "<option value = '"+data.Genero[i]['Hash']+"' selected>"+data.Genero[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Genero[i]['Hash']+"'>"+data.Genero[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Dirección:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'Direccion' id = 'Direccion' class = 'form-control' value = '"+data.InformacionBasica[0]['Direccion']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Correo Personal:</label>"
                                html += "<input autocomplete = 'off' type = 'email' name = 'correopersonal' id = 'correopersonal' class = 'form-control' value = '"+data.InformacionBasica[0]['CorreoPersonal']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Teléfono Casa:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'telefonocasa' id = 'telefonocasa' class = 'form-control' required value = '"+data.InformacionBasica[0]['Telefono_Casa']+"'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Celular:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'celular' id = 'celular' class = 'form-control' required value = '"+data.InformacionBasica[0]['Celular']+"' />"
                            html += "</div>"
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Rh:</label>"
                                html += "<select class = 'form-control' name = 'rh' id = 'rh' required>"
                                    for(var i = 0; i < data.Rh.length; i++){
                                        if( data.InformacionBasica[0]['IdRh'] == data.Rh[i]['Hash'] ){
                                            html += "<option value = '"+data.Rh[i]['Hash']+"' selected>"+data.Rh[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Rh[i]['Hash']+"'>"+data.Rh[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Eps:</label>"
                                html += "<select class = 'form-control' name = 'eps' id = 'eps' required>"
                                    for(var i = 0; i < data.Eps.length; i++){
                                        if( data.InformacionBasica[0]['IdEps'] == data.Eps[i]['Hash'] ){
                                            html += "<option value = '"+data.Eps[i]['Hash']+"' selected>"+data.Eps[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Eps[i]['Hash']+"'>"+data.Eps[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fondo de Pensiones:</label>"
                                html += "<select class = 'form-control' name = 'fp' id = 'fp' required>"
                                    for(var i = 0; i < data.FP.length; i++){
                                        if( data.InformacionBasica[0]['IdFP'] == data.FP[i]['Hash'] ){
                                            html += "<option value = '"+data.FP[i]['Hash']+"' selected>"+data.FP[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.FP[i]['Hash']+"'>"+data.FP[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fondo Cesantias:</label>"
                                html += "<select class = 'form-control' name = 'fc' id = 'fc' required>"
                                    for(var i = 0; i < data.FC.length; i++){
                                        if( data.InformacionBasica[0]['IdFC'] == data.FC[i]['Hash'] ){
                                            html += "<option value = '"+data.FC[i]['Hash']+"' selected>"+data.FC[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.FC[i]['Hash']+"'>"+data.FC[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"

                    html += "</div>"
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDatosBasicosPersonalEditar("+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
                    html += "</div>";
                html += "</form>"
            html += "</div>"
           
            $(".content_modal").html(html);
            var T = $('#ModalEdit').height()*0.60;
            $('.ContentFormPersonal').css('height',T);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            //$("#ModalEdit2").modal("show")
            $FormValidate = $("#EditarPersonalEmpresa").validate({
                rules: {
                    primernombre : {
                        required: true,
                        minlength:2
                    },
                    primerapellido : {
                        required: true,
                        minlength:1
                    },
                    TipoDocumento : {
                        required: true,
                        minlength:1
                    },
                    numerodocumento : {
                        required: true,
                        minlength:1
                    },
                    fechanacimiento : {
                        required: true,
                        minlength:3
                    },
                    Sexo : {
                        required: true,
                        minlength:1
                    },
                    eps : {
                        required: true,
                        minlength:1
                    },
                    Direccion : {
                        required: true,
                        minlength:3
                    },
                    celular : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}

function GuardarDatosBasicosPersonalEditar(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        var formData = new FormData();

        formData.append("primernombre", $("#primernombre").val());
        formData.append("segundonombre", $("#segundonombre").val());
        formData.append("primerapellido", $("#primerapellido").val());
        formData.append("segundoapellido", $("#segundoapellido").val());
        formData.append("TipoDocumento", $("#TipoDocumento").val());
        formData.append("numerodocumento", $("#numerodocumento").val());
        formData.append("fechanacimiento", $("#fechanacimiento").val());
        formData.append("Sexo", $("#Sexo").val());
        formData.append("Direccion", $("#Direccion").val());
        formData.append("telefonocasa", $("#telefonocasa").val());
        formData.append("celular", $("#celular").val());
        formData.append("correopersonal", $("#correopersonal").val());
        formData.append("rh", $("#rh").val());
        formData.append("eps", $("#eps").val());
        formData.append("fc", $("#fc").val());
        formData.append("fp", $("#fp").val());
        formData.append("Hash", Hash);

        var archivos = document.getElementById("ParLogo");
        formData.append("NumFoto", archivos.files.length);
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral + '7e0ac254a1eb7b8287cddc56abc4c926',
            success:function(data){
                ConsultarInformacionEmpleado(Hash,Hash2,Hash3);
            }
        })
    }
}

function BuscarContactosEmergenciaEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_CE.draw();
}

function ListarInformacionContactosEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        html += "<table>";
            html += "<tr>"
                html += "<td class = 'BotonesSuperiores'>"
                    html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AgregarNuevoContactoEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarNuevoContactoEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >Crear Contacto</span>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaCEE' name = 'TextBusquedaCEE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarContactosEmergenciaEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ContactosEmpleados"+Hash+"' id = 'ContactosEmpleados"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th width = '20px'>No.</th>"
                html += "<th nowrap>Nombre</th>"
                html += "<th nowrap>Relación</th>"
                html += "<th nowrap>Teléfono Principal</th>"
                html += "<th nowrap>Dirección</th>"
                html += "<th nowrap>Registrado Por</th>"
                html += "<th nowrap>Creado El</th>"
                html += "<th >Editar</th>"
                html += "<th >Eliminar</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $("#Emp-2").html(html);
    TablContactosEmergenciaEmpleado(Hash,Hash2,Hash3)
}

function TablContactosEmergenciaEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_CE = $("#ContactosEmpleados"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'859d9b4bdf095b491b2e94021de50eee',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaCEE").val();
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
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'nombre',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'relacion',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'telefono1',
               "render": function (data, type, full, meta) {
                    var ht = full.Nombre1 + ' '+full.Nombre2 + ' '+full.Apellido1 + ' '+ full.Apellido2;
                    return '<span>' + data+ '</span>';
                }

            },
           {
               data: 'telefono2',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },

           {
               data: 'fechahora',

               "render": function (data, type, full, meta) {
                    return '<Center >' + data + '</Center>';
                }

            },
           { data: 'nombreusuario' },

           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA.length > 0 ){
                        hx += '<center ><span onclick = "EditarContactoEmergenciaEmpleado(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\',\''+Hash3+'\')">'
                            hx += '<img src ="../images/editar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }

                    return hx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA.length > 0 ){
                        hx += '<center ><span onclick = "EliminarContactoEmergenciaEmpleado(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\',\''+Hash3+'\')">'
                            hx += '<img src ="../images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[2, "asc"]],

        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        },
    });
    $('#ContactosEmpleados'+Hash).css({'width':'100%'})
}

function AgregarNuevoContactoEmpleado(Hash,Hash2,Hash3){
    ModalEdit2(0);
    ModalEdit(0);
    var html = "";
    TituloVentana = "Crear Contacto de Emergencia"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
    html += "<br>"
    html += "<form id='NuevoContactoEmergenciaEmpleado' method='post' action='javascript:void(0)'>"
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Completo:</label>"
                    html += "<input autocomplete = 'off' type = 'text' name = 'NombreCE' id = 'NombreCE' class = 'form-control' required />"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Relación:</label>"
                    html += "<input autocomplete = 'off' type = 'text' name = 'Rela' id = 'Rela' class = 'form-control' required />"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Teléfono Principal:</label>"
                    html += "<input autocomplete = 'off' type = 'text' name = 'telefonop' id = 'telefonop' class = 'form-control' required />"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>Dirección:</label>"
                    html += "<input autocomplete = 'off' type = 'text' name = 'telefonos' id = 'telefonos' class = 'form-control' />"
                html += "</div>"
            html += "</div>"
        html += "</div>";
        html += "<div class='modal-footer'>";
            
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarContactoEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal3").html(html);
    $FormValidate = $("#NuevoContactoEmergenciaEmpleado").validate({
        rules: {
            NombreCE : {
                required: true,
                minlength:2
            },
            Rela : {
                required: true,
                minlength:2
            },
            telefonop : {
                required: true,
                minlength:7
            }
        }
    });
    myModal(1);
    $('.content_modal3').css('height',300);
}

function GuardarContactoEmpleado(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        var formData = new FormData();

        formData.append("NombreCE", $("#NombreCE").val());
        formData.append("telefonop", $("#telefonop").val());
        formData.append("telefonos", $("#telefonos").val());
        formData.append("Rela", $("#Rela").val());
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
            url: UrlGeneral + '1c2ca72333b2274a96618718f9fdd25d',
            success:function(data){
                myModal(0);
                ModalEdit2(1);
                BuscarContactosEmergenciaEmpleado(Hash,Hash2,Hash3);
            }
        })
    }
}

function EditarContactoEmergenciaEmpleado(Hash,Hash2,Hash3,Hash4){
    ModalEdit2(0)
    $.ajax({
        type:'POST',
        url:UrlGeneral + '0c03981098644b245e377dade5d3f5de',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit2(0);
            ModalEdit(1);
            var html = "";
            TituloVentana = "Editar Contacto de Emergencia"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0);ModalEdit2(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoContactoEmergenciaEmpleado' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Completo:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'NombreCE' id = 'NombreCE' class = 'form-control' required value = '"+data.Info[0]['nombre']+"' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Relación:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'Rela' id = 'Rela' class = 'form-control' required value = '"+data.Info[0]['relacion']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Teléfono Principal:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'telefonop' id = 'telefonop' class = 'form-control' required value = '"+data.Info[0]['telefono1']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Dirección:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'telefonos' id = 'telefonos' class = 'form-control' value = '"+data.Info[0]['telefono2']+"'/>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarContactoEmpleado("+data.Info[0]['id']+","+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal").html(html);
            $FormValidate = $("#NuevoContactoEmergenciaEmpleado").validate({
                rules: {
                    NombreCE : {
                        required: true,
                        minlength:2
                    },
                    Rela : {
                        required: true,
                        minlength:2
                    },
                    telefonop : {
                        required: true,
                        minlength:7
                    }
                }
            });
            //myModal(1);
            $('.content_modal').css('height',300);
        }
    });
}

function GuardarEditarContactoEmpleado(Hash,Hash2,Hash3,Hash4){
    if( $FormValidate.form() == true ){
        var formData = new FormData();

        formData.append("NombreCE", $("#NombreCE").val());
        formData.append("telefonop", $("#telefonop").val());
        formData.append("telefonos", $("#telefonos").val());
        formData.append("Rela", $("#Rela").val());
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
            url:UrlGeneral + '9dda97055298f49eeee474ed68de8bde',
            success:function(data){
                ModalEdit(0);ModalEdit2(1)
                BuscarContactosEmergenciaEmpleado(Hash2,Hash3,Hash4);
            }
        })
    }
}

function EliminarContactoEmergenciaEmpleado(Hash,Hash2,Hash3,Hash4){
    if(confirm("¿Está Seguro(a) de Eliminar este Contacto del Empleado?")){
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
            url:UrlGeneral+'1e89e2039039c9c368e6b0d08b2c20f7',
            success:function(data){
                
                BuscarContactosEmergenciaEmpleado(Hash2,Hash3,Hash4);
                
            }
        })
    }
}

function InformacionEmpresarialEmpleado(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '0502c1a98931b0d2c56bb0135356199d',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            if( data.Info[0]['estado'] == 1 ){
                html += "<div class = 'table'>";
                    html += "<table>";
                        html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='../images/editar.png' class = 'OptionIcon' onclick = 'EditarInformacionEmpleado_Basica("+Hash+","+Hash2+",\""+Hash3+"\")'/>";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'EditarInformacionEmpleado_Empresarial("+Hash+","+Hash2+",\""+Hash3+"\")' >Editar</span>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>" 
            }
            
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                    html += "<select readonly class = 'form-control' name = 'unidadnegocio' id = 'unidadnegocio' onchange = 'ListarAreasUnidadNegocioPersonal()' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Unidad']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Área:</label>"
                    html += "<select readonly class = 'form-control' name = 'area' id = 'area' onchange = 'ListarCargosAreaUnidadPersonal()' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Area']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cargo:</label>"
                    html += "<select readonly class = 'form-control' name = 'cargo' id = 'cargo' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Cargo']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Ingreso:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'date' name = 'fechaingreso' id = 'fechaingreso' class = 'form-control' required value = '"+data.Info[0]['FechaIngreso']+"' />"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Contrato:</label>"
                    html += "<select readonly class = 'form-control' name = 'TipoContrato' id = 'TipoContrato' required>"
                        html += "<option value = '' selected>"+data.Info[0]['TipoContrato']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tiempo Contrato:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'number' name = 'tiempocontrato' id = 'tiempocontrato' class = 'form-control' required value = '"+data.Info[0]['TiempoContrato']+"' />"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modalidad de Pago:</label>"
                    html += "<select readonly class = 'form-control' name = 'Tipo_Salario' id = 'Tipo_Salario' required>"
                        html += "<option value = '' selected>"+data.Info[0]['TipoSalario']+"</option>"
                    html += "</select>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>  Valor Prestacional:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Prestacional' id = 'Prestacional' onkeyup = 'FormatCampoNum(\"Prestacional\",\"Prestacional_real\")' value = '"+data.Info[0]['Salario'][0]['prestacional']+"' class = 'Prestacional form-control' required />"
                    html += "<span style = 'display:none;' class = 'Prestacional_real' id = 'Prestacional_real'>"+data.Info[0]['Salario'][0]['prestacional']+"</span>"
                html += "</div>"
                

            html += "</div>"

            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor No Prestacional:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'NPrestacional' id = 'NPrestacional' onkeyup = 'FormatCampoNum(\"NPrestacional\",\"NPrestacional_real\")' value = '"+data.Info[0]['Salario'][0]['noprestacional']+"' class = 'NPrestacional form-control' required />"
                    html += "<span style = 'display:none;' class = 'NPrestacional_real' id = 'NPrestacional_real'>"+data.Info[0]['Salario'][0]['noprestacional']+"</span>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Bonos:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Bonos' id = 'Bonos' onkeyup = 'FormatCampoNum(\"Bonos\",\"Bonos_real\")' value = '"+data.Info[0]['Salario'][0]['bono']+"' class = 'Bonos form-control' required />"
                    html += "<span style = 'display:none;' class = 'Bonos_real' id = 'Bonos_real'>"+data.Info[0]['Salario'][0]['bono']+"</span>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Otros:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Otros' id = 'Otros' onkeyup = 'FormatCampoNum(\"Otros\",\"Otros_real\")' value = '"+data.Info[0]['Salario'][0]['otros']+"' class = 'Otros form-control' required />"
                    html += "<span  style = 'display:none;' class = 'Otros_real' id = 'Otros_real'>"+data.Info[0]['Salario'][0]['otros']+"</span>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Días Ptes Vacaciones:</label>"
                    html += "<input readonly autocomplete = 'off' type = 'text' name = 'Vacaciones' id = 'Vacaciones' value = '"+data.Info[0]['Vacaciones']+"' class = 'form-control' required />"
                    html += "<span  style = 'display:none;' class = 'Otros_real' id = 'Otros_real'>"+data.Info[0]['Vacaciones']+"</span>"
                html += "</div>"
            html += "</div>"
            html += "<br>"
            html += "<div class='separator'>Información Administrativa</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>Arl:</label>"
                    html += "<select readonly class = 'form-control' name = 'Arl' id = 'Arl' required>"
                        html += "<option value = '' selected>"+data.Info[0]['Arl']+"</option>"
                    html += "</select>"
                html += "</div>"
                
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='ParLogo'>Caja Compensación:</label>"
                    html += "<select readonly class = 'form-control' name = 'FP' id = 'FP' required>"
                        html += "<option value = '' selected>"+data.Info[0]['CajaCompensacion']+"</option>"
                    html += "</select>"
                html += "</div>"
            html += "</div>"
            
            if( data.Info[0]['estado'] == 0 ){
                html += "<br>"
                html += "<div class='separator'>Información de Retiro del Empleado</div>";
                html += "<br>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha de Retiro:</label>"
                        html += "<input readonly autocomplete = 'off' type = 'date' name = 'fecharetiro' id = 'fecharetiro' class = 'form-control' value = '"+data.Info[0]['Retiro'][0]['FechaRetiro']+"'/>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Motivo Retiro:</label>"
                        html += "<select readonly class = 'form-control' name = 'TipoRetivo' id = 'TipoRetivo'>"
                            html += "<option >"+data.Info[0]['Retiro'][0]['FechaRetiro']+"</option>"
                        html += "</select>"
                    html += "</div>"

                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'>Justificación:</label>"
                        if( data.Info[0]['Retiro'][0]['FechaRetiro'].length == 0 || data.Info[0]['Retiro'][0]['FechaRetiro'] == null ){
                            html += "<textarea readonly class  = 'form-control' id = 'motivoretiroempleado' name = 'motivoretiroempleado'></textarea>"
                        }else{
                            html += "<textarea readonly class  = 'form-control' id = 'motivoretiroempleado' name = 'motivoretiroempleado'>"+data.Info[0]['Retiro'][0]['MotivoRetiro']+"</textarea>"
                        }
                        
                    html += "</div>"
                html += "</div>"
                
            }

            $("#Emp-3").html(html);
            FormatCampoNum("Prestacional","Prestacional_real")
            FormatCampoNum("NPrestacional","NPrestacional_real")
            FormatCampoNum("Bonos","Bonos_real")
            FormatCampoNum("Otros","Otros_real")
        }
    });
}

function EditarInformacionEmpleado_Empresarial(Hash,Hash2,Hash3){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'b21e150bbfbd5bead19162afd4d29b7d',
        data:{Hash:Hash,Hash2:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit2(0)
            var html = "";
            TituloVentana = "Editar - "+data.Info[0]['NombreCompleto']
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit(0);ModalEdit2(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            
            html += "<br>"
            html += "<div class = 'ChildTabsMenu TabsMenuPersonal1'>";
                html += "<form id='EditarPersonalEmpresa' method='post' action='javascript:void(0)'>"
                    html += "<div class='modal-body ContentFormPersonal' style = 'overflow-y:scroll;'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                                html += "<select  class = 'form-control' name = 'unidadnegocio' id = 'unidadnegocio' onchange = 'ListarAreasUnidadNegocioPersonal()' required>"
                                    for(var i = 0; i < data.Unidad.length; i++){
                                        if( data.Info[0]['IdUnidad'] == data.Unidad[i]['Hash'] ){
                                            html += "<option value = '"+data.Unidad[i]['Hash']+"' selected>"+data.Unidad[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Unidad[i]['Hash']+"'>"+data.Unidad[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Área:</label>"
                                html += "<select  class = 'form-control' name = 'area' id = 'area' onchange = 'ListarCargosAreaUnidadPersonal()' required>"
                                    for(var i = 0; i < data.Areas.length; i++){
                                        if( data.Info[0]['IdArea'] == data.Areas[i]['Hash'] ){
                                            html += "<option value = '"+data.Areas[i]['Hash']+"' selected>"+data.Areas[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Areas[i]['Hash']+"'>"+data.Areas[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cargo:</label>"
                                html += "<select class = 'form-control' name = 'cargo' id = 'cargo' required>"
                                    for(var i = 0; i < data.Cargos.length; i++){
                                        if( data.Info[0]['IdCargo'] == data.Cargos[i]['Hash'] ){
                                            html += "<option value = '"+data.Cargos[i]['Hash']+"' selected>"+data.Cargos[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Cargos[i]['Hash']+"'>"+data.Cargos[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Ingreso:</label>"
                                html += "<input autocomplete = 'off' type = 'date' name = 'fechaingreso' id = 'fechaingreso' class = 'form-control' required value = '"+data.Info[0]['FechaIngreso']+"' />"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Contrato:</label>"
                                html += "<select class = 'form-control' name = 'TipoContrato' id = 'TipoContrato' required>"
                                    for(var i = 0; i < data.TipoContrato.length; i++){
                                        if( data.Info[0]['IdTipoContrato'] == data.TipoContrato[i]['Hash'] ){
                                            html += "<option value = '"+data.TipoContrato[i]['Hash']+"' selected>"+data.TipoContrato[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.TipoContrato[i]['Hash']+"'>"+data.TipoContrato[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tiempo Contrato:</label>"
                                html += "<input autocomplete = 'off' type = 'number' name = 'tiempocontrato' id = 'tiempocontrato' class = 'form-control' required value = '"+data.Info[0]['TiempoContrato']+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modalidad de Pago:</label>"
                                html += "<select  class = 'form-control' name = 'Tipo_Salario' id = 'Tipo_Salario' required>"
                                    for(var i = 0; i < data.Tipo_Salario.length; i++){
                                        if( data.Info[0]['IdModalidadContrato'] == data.Tipo_Salario[i]['Hash'] ){
                                            html += "<option value = '"+data.Tipo_Salario[i]['Hash']+"' selected>"+data.Tipo_Salario[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Tipo_Salario[i]['Hash']+"'>"+data.Tipo_Salario[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>  Valor Prestacional:</label>"
                                html += "<input  autocomplete = 'off' type = 'text' name = 'Prestacional' id = 'Prestacional' onkeyup = 'FormatCampoNum(\"Prestacional\",\"Prestacional_real\")' value = '"+data.Info[0]['Salario'][0]['prestacional']+"' class = 'Prestacional form-control' required />"
                                html += "<span style = 'display:none;' class = 'Prestacional_real' id = 'Prestacional_real'>"+data.Info[0]['Salario'][0]['prestacional']+"</span>"
                            html += "</div>"
                        html += "</div>"

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor No Prestacional:</label>"
                                html += "<input  autocomplete = 'off' type = 'text' name = 'NPrestacional' id = 'NPrestacional' onkeyup = 'FormatCampoNum(\"NPrestacional\",\"NPrestacional_real\")' value = '"+data.Info[0]['Salario'][0]['noprestacional']+"' class = 'NPrestacional form-control' required />"
                                html += "<span style = 'display:none;' class = 'NPrestacional_real' id = 'NPrestacional_real'>"+data.Info[0]['Salario'][0]['noprestacional']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Bonos:</label>"
                                html += "<input  autocomplete = 'off' type = 'text' name = 'Bonos' id = 'Bonos' onkeyup = 'FormatCampoNum(\"Bonos\",\"Bonos_real\")' value = '"+data.Info[0]['Salario'][0]['bono']+"' class = 'Bonos form-control' required />"
                                html += "<span style = 'display:none;' class = 'Bonos_real' id = 'Bonos_real'>"+data.Info[0]['Salario'][0]['bono']+"</span>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Otros:</label>"
                                html += "<input  autocomplete = 'off' type = 'text' name = 'Otros' id = 'Otros' onkeyup = 'FormatCampoNum(\"Otros\",\"Otros_real\")' value = '"+data.Info[0]['Salario'][0]['otros']+"' class = 'Otros form-control' required />"
                                html += "<span  style = 'display:none;' class = 'Otros_real' id = 'Otros_real'>"+data.Info[0]['Salario'][0]['otros']+"</span>"
                            html += "</div>"
                        html += "</div>"
                        html += "<br>"
                        html += "<div class='separator'>Información Administrativa</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Arl:</label>"
                                html += "<select class = 'form-control' name = 'Arl' id = 'Arl' required>"
                                    for(var i = 0; i < data.Arl.length; i++){
                                        if( data.Info[0]['IdArl'] == data.Arl[i]['Hash'] ){
                                            html += "<option value = '"+data.Arl[i]['Hash']+"' selected>"+data.Arl[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Arl[i]['Hash']+"'>"+data.Arl[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='ParLogo'>Caja Compensación:</label>"
                                html += "<select  class = 'form-control' name = 'CC' id = 'CC' required>"
                                    for(var i = 0; i < data.CC.length; i++){
                                        if( data.Info[0]['IdCC'] == data.CC[i]['Hash'] ){
                                            html += "<option value = '"+data.CC[i]['Hash']+"' selected>"+data.CC[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.CC[i]['Hash']+"'>"+data.CC[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        if( data.Info[0]['estado'] == 1 ){
                            html += "<br>"
                            html += "<div class='separator'>Información de Retiro del Empleado</div>";
                            html += "<br>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-3 my-2'>";
                                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha de Retiro:</label>"
                                    html += "<input autocomplete = 'off' type = 'date' name = 'fecharetiro' id = 'fecharetiro' class = 'form-control' />"
                                html += "</div>"
                                html += "<div class='col col-sm-3 my-2'>";
                                    html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Motivo Retiro:</label>"
                                    html += "<select  class = 'form-control' name = 'TipoRetivo' id = 'TipoRetivo'>"
                                        for(var i = 0; i < data.TiposRetiro.length; i++){
                                            html += "<option value = '"+data.TiposRetiro[i]['Hash']+"'>"+data.TiposRetiro[i]['nombre']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>"
                                
                            html += "</div>"
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='ParLogo'>Justificación:</label>"
                                    html += "<textarea class  = 'form-control' id = 'motivoretiroempleado' name = 'motivoretiroempleado'></textarea>"
                                html += "</div>"
                            html += "</div>"
                            
                        }
                        
                    html += "</div>"
                    html += "<div class='modal-footer'>";
                        
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDatosBasicosEmpresarialEditar("+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
                    html += "</div>";
                html += "</form>"
            html += "</div>"
           
            $(".content_modal").html(html);
            //var T = $('#ModalEdit').height()*0.90;
            //$('.ContentFormPersonal').css('height',T);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ModalEdit(1)
            FormatCampoNum("Prestacional","Prestacional_real")
            FormatCampoNum("NPrestacional","NPrestacional_real")
            FormatCampoNum("Bonos","Bonos_real")
            FormatCampoNum("Otros","Otros_real")
            $FormValidate = $("#EditarPersonalEmpresa").validate({
                rules: {
                    unidadnegocio : {
                        required: true,
                        minlength:1
                    },
                    area : {
                        required: true,
                        minlength:1
                    },
                    cargo : {
                        required: true,
                        minlength:1
                    },
                    fechaingreso : {
                        required: true,
                        minlength:1
                    },
                    TipoContrato : {
                        required: true,
                        minlength:1
                    },
                    tiempocontrato : {
                        required: true,
                        minlength:1
                    },
                    Tipo_Salario : {
                        required: true,
                        minlength:1
                    },
                    Prestacional : {
                        required: true,
                        minlength:1
                    },
                    NPrestacional : {
                        required: true,
                        minlength:1
                    },
                    Bonos : {
                        required: true,
                        minlength:1
                    },
                    Otros : {
                        required: true,
                        minlength:1
                    },
                    Arl : {
                        required: true,
                        minlength:1
                    
                    },
                    CC : {
                        required: true,
                        minlength:1
                    }
                }
            });
        }
    });
}

function GuardarDatosBasicosEmpresarialEditar(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        var formData = new FormData();

        formData.append("unidadnegocio", $("#unidadnegocio").val());
        formData.append("area", $("#area").val());
        formData.append("cargo", $("#cargo").val());
        formData.append("fechaingreso", $("#fechaingreso").val());
        formData.append("TipoContrato", $("#TipoContrato").val());
        formData.append("tiempocontrato", $("#tiempocontrato").val());
        formData.append("Tipo_Salario", $("#Tipo_Salario").val());
        formData.append("Prestacional", $("#Prestacional_real").text());
        formData.append("NPrestacional", $("#NPrestacional_real").text());
        formData.append("Bonos", $("#Bonos_real").text());
        formData.append("Otros", $("#Otros_real").text());
        
        formData.append("Arl", $("#Arl").val());

        formData.append("CC", $("#CC").val());
        formData.append("Hash", Hash);

        if( $("#fecharetiro").val().length > 0 ){
            formData.append("Retiro", "OK");
            formData.append("fecharetiro", $("#fecharetiro").val());
            formData.append("TipoRetivo", $("#TipoRetivo").val());
            formData.append("motivoretiroempleado", $("#motivoretiroempleado").val());
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral + '5ab3cc79d2f6f51f12fcb2a8351530d1',
                success:function(data){
                    ConsultarInformacionEmpleado(Hash,Hash2,Hash3);
                    MostrarTabsMenuPersonal(3);
                }
            })
        }else{
            formData.append("Retiro", "NOT");
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral + '5ab3cc79d2f6f51f12fcb2a8351530d1',
                success:function(data){
                    ConsultarInformacionEmpleado(Hash,Hash2,Hash3);
                    MostrarTabsMenuPersonal(3);
                }
            })
        }
        
        
    }else{
    }
}

function DocumentosLegalesEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        html += "<table>";
            html += "<tr>"
                html += "<td class = 'BotonesSuperiores'>"
                    html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AgregarDocGeneralEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarDocGeneralEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >Agregar Documento</span>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDLE' name = 'TextBusquedaDLE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosLegalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosLegalesEmpleado"+Hash+"' id = 'DocumentosLegalesEmpleado"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th width = '20px'>No.</th>"
                html += "<th nowrap>Nombre</th>"
                html += "<th nowrap>Cargado Por</th>"
                html += "<th nowrap >Cargado El</th>"
                html += "<th>Descargar</th>"
                html += "<th>Eliminar</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $("#Emp-4").html(html);
    TablaDocLegalesEmpleado(Hash,Hash2,Hash3)
}

function DocumentosAdicionalesEmpleado(Hash,Hash2,Hash3){
    var html = "";
    html += "<div class = 'table'>";
        html += "<table>";
            html += "<tr>"
                html += "<td class = 'BotonesSuperiores'>"
                    html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'AgregarDocAdicionalEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarDocAdicionalEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")' >Agregar Documento</span>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>"
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-2'>"
            html += "<label for='IdTipoDoc'>Texto:</label>"
            html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDAE' name = 'TextBusquedaDAE' />"
        html += "</div>"
        html += "<div class='col col-sm-3 my-2'>"
            html += "<p></p>"
            html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosAdicionalesEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'/>"
        html += "</div>"
    html += "</div><br>";
    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable DocumentosAdicionalesEmpleado"+Hash+"' id = 'DocumentosAdicionalesEmpleado"+Hash+"'>";
        html += "<thead>"
            html += "<tr>"
                html += "<th width = '20px'>No.</th>"
                html += "<th nowrap>Nombre</th>"
                html += "<th nowrap>Cargado Por</th>"
                html += "<th nowrap>Cargado El</th>"
                html += "<th>Descargar</th>"
                html += "<th>Eliminar</th>"
            html += "</tr>"
        html += "</thead>"
    html += "</table></div>";
    
    $("#Emp-5").html(html);
    TablaDocAdicionalesEmpleado(Hash,Hash2,Hash3)
}

function TablaDocLegalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DL = $("#DocumentosLegalesEmpleado"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + 'c96ff5dbc642930b5598db41d663ed68',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDLE").val();
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
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'TipoDocumento',
               "orderable": false,
                "searchable": false,
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
               "orderable": false,
                "searchable": false,
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
                    htmlx += '<center><a target="_blank" href="../../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL.length > 0 ){
                        hx += '<center ><span onclick = "EliminarDocumentoLegalEmpleado(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\',\''+Hash3+'\')">'
                            hx += '<img src ="../images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[2, "asc"]],

        "language": {
            "url": UrlGeneral+"js/dataTable/Spanish.lang"
        },
    });
    $('#DocumentosLegalesEmpleado'+Hash).css({'width':'100%'})
}

function TablaDocAdicionalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DA = $("#DocumentosAdicionalesEmpleado"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral + '0d9d918c942f005e110e3ce4bdae535b',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDAE").val();
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
                    return '<center>' + full.Num + '</center>';
                }
           },
           {
               data: 'TipoDocumento',
               "orderable": false,
                "searchable": false,
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
               "orderable": false,
                "searchable": false,
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
                    htmlx += '<center><a target="_blank" href="../../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img src ="../images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL.length > 0 ){
                        hx += '<center ><span onclick = "EliminarDocumentoAdicionalEmpleado(\''+full.Hash+'\',\''+Hash+'\',\''+Hash2+'\',\''+Hash3+'\')">'
                            hx += '<img src ="../images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit2"/>';
                        hx += '</span></center>'
                    }

                    return hx;
                }
           },
        ],
        "order": [[2, "asc"]],

        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#DocumentosAdicionalesEmpleado'+Hash).css({'width':'100%'})
}

function AgregarDocGeneralEmpleado(Hash,Hash2,Hash3){
    ModalEdit2(0);
    $.ajax({
        type:'POST',
        url:UrlGeneral + '9a06cc6bbf157dd0307346968b474bfa',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Documento Empleado"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoDocumentoLegalEmpleado' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                            html += "<select class = 'form-control' id = 'TipoDocumentoDE' name = 'TipoDocumentoDE' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.TipoDocumento.length; i++){
                                        html += "<option value = '"+data.TipoDocumento[i]['Hash']+"'>"+data.TipoDocumento[i]['TipoDocumento']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                        
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDocumentoLegalEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoDocumentoLegalEmpleado").validate({
                rules: {
                    TipoDocumentoDE : {
                        required: true,
                        minlength:1
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',300);
        }
    })
    
}

function AgregarDocAdicionalEmpleado(Hash,Hash2,Hash3){
    ModalEdit2(0);
    $.ajax({
        type:'POST',
        url:UrlGeneral + '9a06cc6bbf157dd0307346968b474bfa',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Documento Adicional"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoDocumentoAdicionalEmpleado' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Documento:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class ='form-control' name = 'nombredocumento' id = 'nombredocumento'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                        
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDocumentoAdicionalEmpleado("+Hash+","+Hash2+",\""+Hash3+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoDocumentoAdicionalEmpleado").validate({
                rules: {
                    TipoDocumentoDE : {
                        required: true,
                        minlength:1
                    },
                    nombredocumento : {
                        required: true,
                        minlength:3
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',300);
        }
    })
    
}

function GuardarDocumentoLegalEmpleado(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("Hash", Hash);
                formData.append("TipoDocumento", $("#TipoDocumentoDE").val());


                var archivos = document.getElementById("ParLogo");
                for (var i = 0; i < archivos.files.length; i++) {
                    formData.append("ParLogo", archivos.files[i]);
                }

                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url:UrlGeneral + '9f835a38b25d067bd057e42ec75b4cb4',
                    success:function(data){
                        myModal(0);
                        ModalEdit2(1);
                        BuscarDocumentosLegalesEmpleado(Hash,Hash2,Hash3)
                        AlertaMensajes("Documento Cargado con éxito","success",3);
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function GuardarDocumentoAdicionalEmpleado(Hash,Hash2,Hash3){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("Hash", Hash);
                formData.append("nombredocumento", $("#nombredocumento").val());


                var archivos = document.getElementById("ParLogo");
                for (var i = 0; i < archivos.files.length; i++) {
                    formData.append("ParLogo", archivos.files[i]);
                }

                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url:UrlGeneral+'2f3e999c7940bb57aa988ea9a37cfbfe',
                    success:function(data){
                        myModal(0);
                        ModalEdit2(1);
                        BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3)
                        if( data.Info == 1 ){
                            AlertaMensajes("Documento Cargado con éxito","success",3);
                        }else{
                            AlertaMensajes("No se pudo Cargar el Documento","error",3);
                        }
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function BuscarDocumentosLegalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DL.draw();
}

function BuscarDocumentosAdicionalesEmpleado(Hash,Hash2,Hash3){
    $DataTable_Empresa_Personal_DA.draw();
}

function BuscarInventarioGeneral(){
    $DataTable_Inventario_General.destroy();
    TablaInventarioGeneral();
}
function BuscarInventarioSistemas(){
    $DataTable_Inventario_Sistemas.destroy();
    TablaInventarioSistemas();
}

function EliminarDocumentoLegalEmpleado(Hash,Hash2,Hash3,Hash4){
    ModalEdit2(0);
    if(confirm("Está seguro(a) de Eliminar este documento ?") ==  true){
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
            url: UrlGeneral + '47024a85e0fe10c7fd13a333798d8bc9',
            success:function(data){
                
                if( data.Info == 1 ){
                    AlertaMensajes("Documento eliminado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo eliminar el Documento","error",3);
                }
                ModalEdit2(1);
                BuscarDocumentosLegalesEmpleado(Hash2,Hash3,Hash4)
            }
        })
    }else{
        ModalEdit2(1);
    }
}

function EliminarDocumentoAdicionalEmpleado(Hash,Hash2,Hash3,Hash4){
    ModalEdit2(0);
    if(confirm("Está seguro(a) de Eliminar este documento ?") ==  true){
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
            url: UrlGeneral + '6591741b5ebede404e22bdcd3447b3d6',
            success:function(data){
                
                if( data.Info == 1 ){
                    AlertaMensajes("Documento eliminado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo eliminar el Documento","error",3);
                }
                ModalEdit2(1);
                BuscarDocumentosAdicionalesEmpleado(Hash2,Hash3,Hash4)
            }
        })
    }else{
        ModalEdit2(1);
    }
}

function InventarioGeneral(Hash2){
    ModalEdit(1)
    $.ajax({
        type:'POST',
        url: UrlGeneral + '029d87650698f1196ace43b95a583b28',
        data:{Hash:Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Inventario General"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class='pestanas'>";
                    html += "<ul class = 'TabsMenu'>";
                        html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                            //html += "<img src = 'images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>General</span>"
                        html +="</li>";

                        html += "<li onclick = 'MostrarTabsMenu(2);DatosInventarioSistemas();BuscarInventarioSistemas();' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                           // html += "<img src = 'images/Documentos.png' class = 'IconVentana'>"
                            html += "<span>Sistemas</span>"
                        html +="</li>";
                    html += "</ul>";

                    html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                        if( data.INFORMACION_INVENTARIO_CREAR.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearItemInventarioGeneral(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearItemInventarioGeneral(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Item</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Propietario:</label>"
                                html += "<select class = 'form-control' name = 'List_PropietarioIG' id = 'List_PropietarioIG' >"
                                    html += "<option value = '0' selected>Todos</option>"
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Estado:</label>"
                                html += "<select class = 'form-control' name = 'EstadosInventarioGeneral' id = 'EstadosInventarioGeneral' >"
                                    html += "<option value = '1' selected>Activos</option>"
                                    html += "<option value = '0' >Inactivos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaIG' name = 'TextBusquedaIG' onkeypress='BuscarInventarioGeneral()' />"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInventarioGeneral()'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/BExcel.png' class = 'OptionIcon' onclick = 'generarReporteInventarioExcel()'/> Excel"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/BPdf.png' class = 'OptionIcon' onclick = 'GenerarPdfInventario()'/> Pdf"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'></label>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<td style = 'border:0px;'>Valor Total Inventario</td>"
                                        html += "<td style = 'border:0px;text-align:right;widht:10%;'>$</td>"
                                        html += "<td style = 'border:0px;text-align:right;' id = 'ValorTotalInventarioGeneral'>0</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable' style = 'height:300px;overflow-y:scroll;'><table class='tableNew dataTable InventarioGeneral' id = 'InventarioGeneral'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Item</th>"
                                    html += "<th>Descripción</th>"
                                    html += "<th>Ubicación</th>"
                                    html += "<th>Foto</th>"
                                    html += "<th>Propietario</th>"
                                    html += "<th>Cantidad</th>"
                                    html += "<th>Costo Unitario</th>"
                                    html += "<th>Costo Total</th>"
                                    html += "<th>Consultar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>";
                    
                    html += "<div class = 'ChildTabsMenu TabsMenu2'>";
                        if( data.INFORMACION_INVENTARIO_CREAR.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearItemInventarioSistemas(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#dc3545;font-weight: bold;' onclick = 'CrearItemInventarioSistemas(\""+Hash2+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Item</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }

                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Propietario:</label>"
                                html += "<select class = 'form-control' name = 'List_PropietarioIS' id = 'List_PropietarioIS' >"
                                    html += "<option value = '0' selected>Todos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Marcas:</label>"
                                html += "<select class = 'form-control' name = 'List_MarcasIS' id = 'List_MarcasIS' >"
                                    html += "<option value = '0' selected>Todos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Marcas:</label>"
                                html += "<select class = 'form-control' name = 'List_TipoIS' id = 'List_TipoIS' >"
                                    html += "<option value = '0' selected>Todos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Estado:</label>"
                                html += "<select class = 'form-control' name = 'EstadosInventarioSistemas' id = 'EstadosInventarioSistemas' >"
                                    html += "<option value = '1' selected>Activos</option>"
                                    html += "<option value = '0' >Inactivos</option>"
                                html += "</select>"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaIS' name = 'TextBusquedaIS' onkeypress = 'BuscarInventarioSistemas()' />"
                            html += "</div>"
                            html += "<div class='col col-sm-2 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInventarioSistemas()'/>"
                            html += "</div>"
                            
                        html += "</div>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'></label>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<td style = 'border:0px;'>Valor Total Inventario</td>"
                                        html += "<td style = 'border:0px;text-align:right;widht:10%;'>$</td>"
                                        html += "<td style = 'border:0px;text-align:right;' id = 'ValorTotalInventarioSistemas'>0</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</div>"
                        html += "</div>"
                        html += "<br>";
                        html += "<div class = 'ContenedorDataTable' style = 'height:300px;overflow-y:scroll;'><table class='tableNew dataTable InventariosSistemas' id = 'InventariosSistemas'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Foto</th>"
                                    html += "<th>Propietario</th>"
                                    html += "<th>Marca</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Descripción</th>"
                                    html += "<th>Modelo</th>"
                                    html += "<th>Serial</th>"
                                    html += "<th>Cantidad</th>"
                                    html += "<th>Costo Unitario</th>"
                                    html += "<th>Costo Total</th>"
                                    html += "<th>Consultar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                    
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            ResizeChildTabsMenu(0.85)
            TablaInventarioGeneral()
            MostrarTabsMenu(1)
            TablaInventarioSistemas()
        }
    });

}

function GenerarPdfInventario(){
    var url = UrlGeneral + "b8ddcead884b54def5ef4d1a635bfbe4/"+$("#List_PropietarioIG").val()+"-"+$("#EstadosInventarioGeneral").val()+"-"+$("#TextBusquedaIG").val();
    window.open(url, '_blank');
}

function TablaInventarioGeneral(){
    
    $DataTable_Inventario_General = $("#InventarioGeneral").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'a4c94342420f9866f555f621dfc9f324',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaIG").val();
                    d.search['Propietario'] = $("#List_PropietarioIG").val();
                    d.search['Estado'] = $("#EstadosInventarioGeneral").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                },
             
        },
        "initComplete":function( settings, json){
            var t = json.ValorTotal[0]['Total'];
            if( t == null ){
                t = 0;
            }
            
            $("#ValorTotalInventarioGeneral").text(formatNumber.new(t))
            // call your function here
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
               data: 'Nombre',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Descripcion',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Ubicacion',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Foto',
               "render": function (data, type, full, meta) {
                    var ht = '';
                    ht += '<img src = "../../storage/app/datos/InventarioGeneral/'+full.Hash2+'_'+data+'" class = "FotoTablaEmpleado" />'
                    return '<center>' + ht+ '</center>';
                }

            },
            {
               data: 'Propietario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Cantidad',
               "render": function (data, type, full, meta) {
                    
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'CostoUnitario',
               "render": function (data, type, full, meta) {
                    var th = '';
                    th = '<table width = "100%">'
                        th += '<tr>'
                            th += '<td style = "width:10%;text-align:right;border:0px;">$</td>'
                            th += '<td style = "text-align:right;border:0px;">'+formatNumber.new(data)+'</td>'
                        th += '</tr>'
                    th += '</table>'
                    return '<span>' + th+ '</span>';
                }

            },
            {
               data: 'Total',
               "render": function (data, type, full, meta) {
                    
                   var th = '';
                    th = '<table width = "100%">'
                        th += '<tr>'
                            th += '<td style = "width:10%;text-align:right;border:0px;">$</td>'
                            th += '<td style = "text-align:right;border:0px;">'+formatNumber.new(data)+'</td>'
                        th += '</tr>'
                    th += '</table>'
                    return '<span>' + th+ '</span>';
                }

            },
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    //htmlx += '<center><a target="_blank" href="../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img onclick = "ConsultarInformacionItemInventario('+data+')" src ="../images/detalles.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    //htmlx += '</a></center>';
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#InventarioGeneral').css({'width':'100%'})
}

function CrearItemInventarioGeneral(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + '029d87650698f1196ace43b95a583b28',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Nuevo Item Inventario General</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select class = 'form-control' id = 'Propietario' name = 'Propietario' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Item:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'NombreItem' id = 'NombreItem' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Ubicación Item:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'UbicacionItem' id = 'UbicacionItem' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cantidad:</label>"
                            html += "<input  autocomplete = 'off' type = 'number' name = 'CantidadItem' id = 'CantidadItem' min = '0' value = '0' class = 'form-control' required />"
                            
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>  Costo Unitario:</label>"
                            html += "<input  autocomplete = 'off' type = 'text' name = 'CostoUnitario' id = 'CostoUnitario' onkeyup = 'FormatCampoNum(\"CostoUnitario\",\"CostoUnitario_real\")' value = '' class = 'CostoUnitario form-control' />"
                            html += "<span style = 'display:none;' class = 'CostoUnitario_real' id = 'CostoUnitario_real'></span>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Código Referencia:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Codificacion' id = 'Codificacion' autocomplete = 'off' />"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción:</label>"
                            html += "<textarea class = 'form-control' name = 'descripcion_item' id = 'descripcion_item'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoItemInventarioGeneral(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoItemInventarioGeneral").validate({
                rules: {
                    Propietario : {
                        required: true,
                        minlength:1
                    }
                    ,
                    NombreItem : {
                        required: true,
                        minlength:3
                    }
                    ,
                    UbicacionItem : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    CantidadItem : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Codificacion : {
                        required: true,
                        minlength:2
                    }
                    ,
                    descripcion_item : {
                        required: true,
                        minlength:3
                    }
                    ,
                    ParLogo : {
                        required: true,
                        minlength:1
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',550);
        }
    })
}

function GuardarNuevoItemInventarioGeneral(Hash){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("Propietario", $("#Propietario").val());
                formData.append("NombreItem", $("#NombreItem").val());
                formData.append("UbicacionItem", $("#UbicacionItem").val());
                formData.append("CostoUnitario", $("#CostoUnitario_real").text());
                formData.append("Codificacion", $("#Codificacion").val());
                formData.append("CantidadItem", $("#CantidadItem").val());
                formData.append("descripcion_item", $("#descripcion_item").val());


                var archivos = document.getElementById("ParLogo");
                for (var i = 0; i < archivos.files.length; i++) {
                    formData.append("ParLogo", archivos.files[i]);
                }

                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url: UrlGeneral + '38196be4415c0ad5887a69f1ec0b80b3',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarInventarioGeneral()
                        if( data.Info == 1 ){
                            AlertaMensajes("Item Agregado con éxito","success",3);
                        }else{
                            AlertaMensajes("No se pudo Agregar el Item","error",3);
                        }
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function ConsultarInformacionItemInventario(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + '9c80da500c15fcd45c6362d68846f6c2',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2 Inventario_Title'>Consultar Item Inventario General</span>";
                        html += "</td>"
                        if( data.INFORMACION_INVENTARIO_EDITAR.length > 0 ){
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'HabilitarItemInventarioGeneralEditar("+Hash+")'>";
                                html += "<img src = 'images/editar.png' class = 'IconVentana'  onclick = 'HabilitarItemInventarioGeneralEditar("+Hash+")'/>";
                            html += "</button>";
                            html += "</td>"
                        }
                        
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='EditarItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<center><img src = '../storage/app/datos/InventarioGeneral/"+data.InfoItem[0]['Id']+"_"+data.InfoItem[0]['Foto']+"' class = 'FotoTablaEmpleadoInfo' /></center>";
                            html += "<br>"
                            html += "<span class = 'HidenInformation InputFotoInventarioGeneral'><label for='ParLogo'>Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div></span>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select disabled class = 'form-control' id = 'Propietario' name = 'Propietario' required >";
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        if( data.InfoItem[0]['IdPropietario'] == data.Propietarios[i]['Hash'] ){
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"' selected>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }
                                        
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre Item:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'NombreItem' id = 'NombreItem' autocomplete = 'off' value = '"+data.InfoItem[0]['Nombre']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Ubicación Item:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'UbicacionItem' id = 'UbicacionItem' autocomplete = 'off' value = '"+data.InfoItem[0]['Ubicacion']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cantidad:</label>"
                            html += "<input  disabled autocomplete = 'off' type = 'number' name = 'CantidadItem' id = 'CantidadItem' min = '0' value = '"+data.InfoItem[0]['Cantidad']+"' class = 'form-control' required />"
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>  Costo Unitario:</label>"
                            html += "<input disabled autocomplete = 'off' type = 'text' name = 'CostoUnitario' id = 'CostoUnitario' onkeyup = 'FormatCampoNum(\"CostoUnitario\",\"CostoUnitario_real\")' value = '"+formatNumber.new(data.InfoItem[0]['CostoUnitario'])+"' class = 'CostoUnitario form-control' />"
                            html += "<span style = 'display:none;' class = 'CostoUnitario_real' id = 'CostoUnitario_real'>"+data.InfoItem[0]['CostoUnitario']+"</span>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Código Referencia:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'Codificacion' id = 'Codificacion' autocomplete = 'off' value = '"+data.InfoItem[0]['CodigoReferencia']+"' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Estado:</label>"
                            html += "<select disabled class = 'form-control' id = 'EstadoItem' name = 'EstadoItem' required >";
                                    if( data.InfoItem[0]['Estado'] == 1){
                                        html += "<option value = '1' selected>Activo</option>"
                                        html += "<option value = '0' >Inactivo</option>"
                                    }
                                    if( data.InfoItem[0]['Estado'] == 0){
                                        html += "<option value = '1' >Activo</option>"
                                        html += "<option value = '0' selected>Inactivo</option>"
                                    }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción:</label>"
                            html += "<textarea disabled class = 'form-control' name = 'descripcion_item' id = 'descripcion_item'>"+data.InfoItem[0]['Descripcion']+"</textarea>";
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary EditarItemInventarioGeneral HidenInformation' onclick = 'GuardarEditarItemInventarioGeneral(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#EditarItemInventarioGeneral").validate({
                rules: {
                    Propietario : {
                        required: true,
                        minlength:1
                    }
                    ,
                    NombreItem : {
                        required: true,
                        minlength:3
                    }
                    ,
                    UbicacionItem : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    CantidadItem : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Codificacion : {
                        required: true,
                        minlength:2
                    }
                    ,
                    descripcion_item : {
                        required: true,
                        minlength:3
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',580);
        }
    })
}

function HabilitarItemInventarioGeneralEditar(Hash){
    $("#Propietario").prop('disabled', false);
    $("#NombreItem").prop('disabled', false);
    $("#UbicacionItem").prop('disabled', false);
    $("#CantidadItem").prop('disabled', false);
    $("#Codificacion").prop('disabled', false);
    $("#CostoUnitario").prop('disabled', false);
    $("#EstadoItem").prop('disabled', false);
    $("#descripcion_item").prop('disabled', false);
    $("#EditarItemInventarioGeneral .modal-body").css({'height':'400px', 'overflow-y':'scroll'})
    $(".EditarItemInventarioGeneral,.InputFotoInventarioGeneral").show();
}

function HabilitarItemInventarioSistemasEditar(Hash){
    $("#Propietario").prop('disabled', false);
    $("#Marcas").prop('disabled', false);
    $("#Tipo").prop('disabled', false);
    $("#Modelo").prop('disabled', false);
    $("#descripcion_itemSistemas").prop('disabled', false);
    $("#Serial").prop('disabled', false);
    $("#CantidadItemSistemas").prop('disabled', false);
    $("#CostoUnitario").prop('disabled', false);
    $("#EstadoItem").prop('disabled', false);
    $("#Codificacion").prop('disabled', false);
    $("#CostoUnitarioSis").prop('disabled', false);
    $("#EditarItemInventarioGeneral .modal-body").css({'height':'400px', 'overflow-y':'scroll'})
    $(".EditarItemInventarioGeneral,.InputFotoInventarioGeneral").show();
}

function GuardarEditarItemInventarioGeneral(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Propietario", $("#Propietario").val());
        formData.append("NombreItem", $("#NombreItem").val());
        formData.append("UbicacionItem", $("#UbicacionItem").val());
        formData.append("CostoUnitario", $("#CostoUnitario_real").text());
        formData.append("Codificacion", $("#Codificacion").val());
        formData.append("CantidadItem", $("#CantidadItem").val());
        formData.append("EstadoItem", $("#EstadoItem").val());
        formData.append("descripcion_item", $("#descripcion_item").val());
        formData.append("Hash", Hash);


        var archivos = document.getElementById("ParLogo");
        if( archivos.files.length > 0 ){
            formData.append("Archivo", "1");
        }else{
            formData.append("Archivo", "0");
        }
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + 'e745798faca6ce561697ef372bda66a4',
            success:function(data){
                myModal(0);
                ModalEdit(1);
                BuscarInventarioGeneral()
                if( data.Info == 1 ){
                    AlertaMensajes("Item Modificado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Modicar el Item","error",3);
                }
            }
        })
    }
}

function DatosInventarioSistemas(){
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'fd06e12130f8239160bb06f590fb7ea7',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var ht = "";
            ht += "<option value = '0'>Todos</option>"
            for(var i = 0; i < data.Propietarios.length;i++){
                ht += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
            }
            $("#List_PropietarioIS").html(ht);
            
            ht = "";
            ht += "<option value = '0'>Todas</option>"
            for(var i = 0; i < data.Marcas.length;i++){
                ht += "<option value = '"+data.Marcas[i]['Hash']+"'>"+data.Marcas[i]['Nombre']+"</option>"
            }
            $("#List_MarcasIS").html(ht);
            
            ht = "";
            ht += "<option value = '0'>Todos</option>"
            for(var i = 0; i < data.Tipo.length;i++){
                ht += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
            }
            $("#List_TipoIS").html(ht);
        }
    })
}

function CrearItemInventarioSistemas(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'fd06e12130f8239160bb06f590fb7ea7',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Nuevo Item Inventario Sistemas</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select class = 'form-control' id = 'Propietario' name = 'Propietario' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Marca:</label>"
                            html += "<select class = 'form-control' id = 'Marcas' name = 'Marcas' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Marcas.length;i++){
                                        html += "<option value = '"+data.Marcas[i]['Hash']+"'>"+data.Marcas[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo:</label>"
                            html += "<select class = 'form-control' id = 'Tipo' name = 'Tipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Tipo.length;i++){
                                        html += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modelo:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Modelo' id = 'Modelo' autocomplete = 'off' />"
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción:</label>"
                            html += "<textarea class = 'form-control' name = 'descripcion_itemSistemas' id = 'descripcion_itemSistemas'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Serial:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Serial' id = 'Serial' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cantidad:</label>"
                            html += "<input  autocomplete = 'off' type = 'number' name = 'CantidadItemSistemas' id = 'CantidadItemSistemas' min = '0' value = '0' class = 'form-control' required />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>  Costo Unitario:</label>"
                            html += "<input  autocomplete = 'off' type = 'text' name = 'CostoUnitarioSis' id = 'CostoUnitarioSis' onkeyup = 'FormatCampoNum(\"CostoUnitarioSis\",\"CostoUnitarioSis_real\")' value = '' class = 'CostoUnitarioSis form-control' />"
                            html += "<span style = 'display:none;' class = 'CostoUnitarioSis_real' id = 'CostoUnitarioSis_real'></span>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Código Referencia:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Codificacion' id = 'Codificacion' autocomplete = 'off' />"
                        html += "</div>"
                    html += "</div>"
                    
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                    html += "</div>"
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoItemInventarioSistemas(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoItemInventarioGeneral").validate({
                rules: {
                    Propietario : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Marcas : {
                        required: true,
                        minlength:1
                    },
                    Tipo : {
                        required: true,
                        minlength:1
                    },
                    Modelo : {
                        required: true,
                        minlength:3
                    }
                    ,
                    descripcion_itemSistemas : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    CantidadItemSistemas : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Codificacion : {
                        required: true,
                        minlength:2
                    }
                    ,
                    ParLogo : {
                        required: true,
                        minlength:1
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',550);
        }
    })
}

function GuardarNuevoItemInventarioSistemas(Hash){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("Propietario", $("#Propietario").val());
                formData.append("Marcas", $("#Marcas").val());
                formData.append("Tipo", $("#Tipo").val());
                formData.append("Modelo", $("#Modelo").val());
                formData.append("descripcion_itemSistemas", $("#descripcion_itemSistemas").val());
                formData.append("CostoUnitarioSis", $("#CostoUnitarioSis_real").text());
                formData.append("Codificacion", $("#Codificacion").val());
                formData.append("CantidadItemSistemas", $("#CantidadItemSistemas").val());
                formData.append("Serial", $("#Serial").val());


                var archivos = document.getElementById("ParLogo");
                for (var i = 0; i < archivos.files.length; i++) {
                    formData.append("ParLogo", archivos.files[i]);
                }

                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url: UrlGeneral + 'b4f099666efd7f25099c59ac581d7b6b',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarInventarioSistemas()
                        if( data.Info == 1 ){
                            AlertaMensajes("Item Agregado con éxito","success",3);
                        }else{
                            AlertaMensajes("No se pudo Agregar el Item","error",3);
                        }
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function TablaInventarioSistemas(){
    $DataTable_Inventario_Sistemas = $("#InventariosSistemas").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'3906c5426d8ccc71220cf93921c73cd4',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaIS").val();
                    d.search['Propietario'] = $("#List_PropietarioIS").val();
                    d.search['Marca'] = $("#List_MarcasIS").val();
                    d.search['Tipo'] = $("#List_TipoIS").val();
                    d.search['Estado'] = $("#EstadosInventarioSistemas").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value
                    });
                },
             
        },
        "initComplete":function( settings, json){
            var t = json.ValorTotal[0]['Total'];
            if( t == null ){
                t = 0;
            }
            $("#ValorTotalInventarioSistemas").text(formatNumber.new(t))
            
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
               data: 'Foto',
               "render": function (data, type, full, meta) {
                    var ht = '';
                    ht += '<img src = "../../storage/app/datos/InventarioSistemas/'+full.Hash2+'_'+data+'" class = "FotoTablaEmpleado" />'
                    return '<center>' + ht+ '</center>';
                }

            },
            {
               data: 'Propietario',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Marca',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Tipo',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Descripcion',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }
            
            },
           {
               data: 'Modelo',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            
            {
               data: 'Serial',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            
            
            {
               data: 'Cantidad',
               "render": function (data, type, full, meta) {
                    
                    return '<center>' + data+ '</center>';
                }

            },
            {
               data: 'CostoUnitario',
               "render": function (data, type, full, meta) {
                    var th = '';
                    th = '<table width = "100%">'
                        th += '<tr>'
                            th += '<td style = "width:10%;text-align:right;border:0px;">$</td>'
                            th += '<td style = "text-align:right;border:0px;">'+formatNumber.new(data)+'</td>'
                        th += '</tr>'
                    th += '</table>'
                    return '<span>' + th+ '</span>';
                }

            },
            {
               data: 'Total',
               "render": function (data, type, full, meta) {
                    
                   var th = '';
                    th = '<table width = "100%">'
                        th += '<tr>'
                            th += '<td style = "width:10%;text-align:right;border:0px;">$</td>'
                            th += '<td style = "text-align:right;border:0px;">'+formatNumber.new(data)+'</td>'
                        th += '</tr>'
                    th += '</table>'
                    return '<span>' + th+ '</span>';
                }

            },
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    //htmlx += '<center><a target="_blank" href="../storage/app/datos/Empleados/'+full.IdEmpleado+'/DocumentosLegales/'+encodeURIComponent(full.nombrearchivo)+'">';
                        htmlx += '<img onclick = "ConsultarInformacionItemInventarioSistemas('+data+')" src ="../images/detalles.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    //htmlx += '</a></center>';
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#InventariosSistemas').css({'width':'100%'})
}

function ConsultarInformacionItemInventarioSistemas(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + '73fb18fc88dbc317a0273cb63e04d2d3',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Consultar Item Inventario Sistemas</span>";
                        html += "</td>"
                        if( data.INFORMACION_INVENTARIO_EDITAR.length > 0 ){
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'HabilitarItemInventarioSistemasEditar("+Hash+")'>";
                                html += "<img src = 'images/editar.png' class = 'IconVentana'  onclick = 'HabilitarItemInventarioSistemasEditar("+Hash+")'/>";
                            html += "</button>";
                            html += "</td>"
                        }
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='EditarItemInventarioSistemas' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<center><img src = '../storage/app/datos/InventarioSistemas/"+data.InfoItem[0]['Id']+"_"+data.InfoItem[0]['Foto']+"' class = 'FotoTablaEmpleadoInfo' /></center>";
                            html += "<br>"
                            html += "<span class = 'HidenInformation InputFotoInventarioGeneral'><label for='ParLogo'>Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div></span>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select disabled class = 'form-control' id = 'Propietario' name = 'Propietario' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        if( data.InfoItem[0]['IdPropietario'] == data.Propietarios[i]['Hash'] ){
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"' selected>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Marca:</label>"
                            html += "<select disabled class = 'form-control' id = 'Marcas' name = 'Marcas' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Marcas.length;i++){
                                        if( data.InfoItem[0]['IdMarca'] == data.Marcas[i]['Hash'] ){
                                            html += "<option value = '"+data.Marcas[i]['Hash']+"' selected>"+data.Marcas[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Marcas[i]['Hash']+"'>"+data.Marcas[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo:</label>"
                            html += "<select disabled class = 'form-control' id = 'Tipo' name = 'Tipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Tipo.length;i++){
                                        if( data.InfoItem[0]['IdTipo'] == data.Tipo[i]['Hash'] ){
                                            html += "<option value = '"+data.Tipo[i]['Hash']+"' selected>"+data.Tipo[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Modelo:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'Modelo' id = 'Modelo' autocomplete = 'off' value = '"+data.InfoItem[0]['Modelo']+"'/>"
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Descripción:</label>"
                            html += "<textarea disabled class = 'form-control' name = 'descripcion_itemSistemas' id = 'descripcion_itemSistemas'>"+data.InfoItem[0]['Descripcion']+"</textarea>";
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Serial:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'Serial' id = 'Serial' autocomplete = 'off' value = '"+data.InfoItem[0]['Serial']+"' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Cantidad:</label>"
                            html += "<input  disabled autocomplete = 'off' type = 'number' name = 'CantidadItemSistemas' id = 'CantidadItemSistemas' min = '0' value = '"+data.InfoItem[0]['Cantidad']+"' class = 'form-control' required />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>  Costo Unitario:</label>"
                            html += "<input disabled autocomplete = 'off' type = 'text' name = 'CostoUnitarioSis' id = 'CostoUnitarioSis' onkeyup = 'FormatCampoNum(\"CostoUnitarioSis\",\"CostoUnitarioSis_real\")' value = '"+formatNumber.new(data.InfoItem[0]['CostoUnitario'])+"' class = 'CostoUnitarioSis form-control' />"
                            html += "<span style = 'display:none;' class = 'CostoUnitarioSis_real' id = 'CostoUnitarioSis_real'>"+data.InfoItem[0]['CostoUnitario']+"</span>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Código Referencia:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'Codificacion' id = 'Codificacion' autocomplete = 'off'  value = '"+data.InfoItem[0]['Codigo']+"'/>"
                        html += "</div>"
                    html += "</div>"
                
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Estado:</label>"
                            html += "<select disabled class = 'form-control' id = 'EstadoItem' name = 'EstadoItem' required >";
                                    if( data.InfoItem[0]['Estado'] == 1){
                                        html += "<option value = '1' selected>Activo</option>"
                                        html += "<option value = '0' >Inactivo</option>"
                                    }
                                    if( data.InfoItem[0]['Estado'] == 0){
                                        html += "<option value = '1' >Activo</option>"
                                        html += "<option value = '0' selected>Inactivo</option>"
                                    }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary EditarItemInventarioGeneral HidenInformation' onclick = 'GuardarEditarItemInventarioSistemas(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#EditarItemInventarioSistemas").validate({
                rules: {
                    Propietario : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Marcas : {
                        required: true,
                        minlength:1
                    },
                    Tipo : {
                        required: true,
                        minlength:1
                    },
                    Modelo : {
                        required: true,
                        minlength:3
                    }
                    ,
                    descripcion_itemSistemas : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    CantidadItemSistemas : {
                        required: true,
                        minlength:1
                    }
                    ,
                    Codificacion : {
                        required: true,
                        minlength:2
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',580);
            $("#EditarItemInventarioSistemas .modal-body").css({'height':'400px', 'overflow-y':'scroll'})
        }
    })
}

function GuardarEditarItemInventarioSistemas(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("Propietario", $("#Propietario").val());
        formData.append("Marcas", $("#Marcas").val());
        formData.append("Tipo", $("#Tipo").val());
        formData.append("Modelo", $("#Modelo").val());
        formData.append("descripcion_itemSistemas", $("#descripcion_itemSistemas").val());
        formData.append("CostoUnitarioSis", $("#CostoUnitarioSis_real").text());
        formData.append("Codificacion", $("#Codificacion").val());
        formData.append("EstadoItem", $("#EstadoItem").val());
        formData.append("CantidadItemSistemas", $("#CantidadItemSistemas").val());
        formData.append("Serial", $("#Serial").val());
        formData.append("Hash", Hash);


        var archivos = document.getElementById("ParLogo");
        if( archivos.files.length > 0 ){
            formData.append("Archivo", "1");
        }else{
            formData.append("Archivo", "0");
        }
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + 'b427e88da313d45d175b759d3030f2b7',
            success:function(data){
                myModal(0);
                ModalEdit(1);
                BuscarInventarioSistemas()
                if( data.Info == 1 ){
                    AlertaMensajes("Item Modificado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Modicar el Item","error",3);
                }
            }
        })
    }
}

function AcesosSis(Hash){
    ModalEdit(1)
    $.ajax({
        type:'POST',
        url:UrlGeneral +  'dde290d5c19f91265f46e3f3eff5c537',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Biblioteca Accesos"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                if( data.INFORMACION_SISTEMAS_CREAR.length > 0 ){
                    html += "<div class = 'table'>";
                        html += "<table>";
                            html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearRegistroAcceso(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                html += "<span class='FirstText Cursor' style='color:#dc3545 ;font-weight: bolder;' onclick = 'CrearRegistroAcceso(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Acceso</span>";
                            html += "</td>"
                            html += "</tr>"
                        html += "</table>";
                    html += "</div>"
                }
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc'>Tipos:</label>"
                        html += "<select class = 'form-control' name = 'ListAccesos_Tipos' id = 'ListAccesos_Tipos' >"
                            html += "<option value = '0' selected>Todos</option>"
                            for(var i = 0; i < data.Propietarios.length;i++){
                                html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                            }
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc'>Estado:</label>"
                        html += "<select class = 'form-control' name = 'Estados_Accesos' id = 'Estados_Accesos' >"
                            html += "<option value = '1' selected>Activos</option>"
                            html += "<option value = '0' >Inactivos</option>"
                        html += "</select>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input type = 'search' class = 'form-control' id = 'TextBusquedaAccesos' name = 'TextBusquedaAccesos' onkeypress = 'BuscarDatosAccesos()' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDatosAccesos()'/>"
                    html += "</div>"
                html += "</div><br>";
                html += "<div class = 'ContenedorDataTable' style = 'height:450px;overflow-y:scroll;'><table class='tableNew dataTable AccesosSis' id = 'AccesosSis'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Tipo</th>"
                            html += "<th>Plataforma/Aplicación</th>"
                            html += "<th>Url</th>"
                            html += "<th>Referencia</th>"
                            html += "<th>Consultar Datos de Acceso</th>"
                            html += "<th>Registrado Por</th>"
                            html += "<th>Registrado El</th>"
                            html += "<th>Editar</th>"
                            html += "<th>Eliminar</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "</table></div>"
                    
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            TablaBibliotecaAccesos()
        }
    });
}

function CrearRegistroAcceso(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + 'dde290d5c19f91265f46e3f3eff5c537',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Nuevo Registro de Acceso</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select class = 'form-control' id = 'NewTipo' name = 'NewTipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Plataforma / Aplicación</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Newapp' id = 'Newapp' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Url:</label>"
                            html += "<input type = 'url' class = 'form-control' name = 'NewUrl' id = 'NewUrl' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Referencia:</label>"
                            html += "<input  autocomplete = 'off' type = 'text' name = 'NewReferencia' id = 'NewReferencia' class = 'form-control' />"
                            
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Usuario:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'NewUsuario' id = 'NewUsuario' autocomplete = 'off' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Contraseña:</label>"
                            html += "<input type = 'password' class = 'form-control' name = 'NewPass' id = 'NewPass' autocomplete = 'off' />"
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarAccesoBiblioteca(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoItemInventarioGeneral").validate({
                rules: {
                    NewTipo : {
                        required: true,
                        minlength:1
                    },
                    Newapp : {
                        required: true,
                        minlength:2
                    }
                    ,
                    NewReferencia : {
                        required: true,
                        minlength:2
                    }
                    ,
                    NewUsuario : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    NewPass : {
                        required: true,
                        minlength:3
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',380);
        }
    })
}
function BuscarDatos(){
    $('#search').bind('keyup', function (e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
    alert("Enter");
    };
    });
    
}
function BuscarDatosAccesos(){
    
    
    $DataTable_BibliotecaAccesos.destroy()
    TablaBibliotecaAccesos();
    
   
}

function GuardarAccesoBiblioteca(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("NewTipo", $("#NewTipo").val());
        formData.append("NewReferencia", $("#NewReferencia").val());
        formData.append("NewUrl", $("#NewUrl").val());
        formData.append("Newapp", $("#Newapp").val());
        formData.append("NewUsuario", $("#NewUsuario").val());
        formData.append("NewPass", $("#NewPass").val());


        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral + 'a585105918f6ada2e7879276a1d9b224',
            success:function(data){
                myModal(0);
                ModalEdit(1);
                BuscarDatosAccesos()
                if( data.Info == 1 ){
                    AlertaMensajes("Acceso Agregado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Agregar el Acceso","error",3);
                }
            }
        })
    }
}

function TablaBibliotecaAccesos(){
    $DataTable_BibliotecaAccesos = $("#AccesosSis").DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'2623fbd0eb664d8e3834b1f60b9ea2f3',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaAccesos").val();
                    d.search['Propietario'] = $("#ListAccesos_Tipos").val();
                    d.search['Estado'] = $("#Estados_Accesos").val();
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
               data: 'Tipo',
               "render": function (data, type, full, meta) {
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'App',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Url',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
            {
               data: 'Referencia',
               "render": function (data, type, full, meta) {
                    
                    return '<span>' + data+ '</span>';
                }

            },
           
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    if( full.INFORMACION_SISTEMAS_PWD.length > 0 ){
                       htmlx += '<img onclick = "b01174c89fa348ffb1c3956fa2efb32c('+data+')" src ="../images/detalles.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    }
                    
                    return '<center>' + htmlx+ '</center>';
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
                    if( full.INFORMACION_SISTEMAS_EDITAR.length > 0 ){
                       htmlx += '<img onclick = "EditarInformacionAccesoBiblioteca('+data+')" src ="../images/editar1.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    }
                    
                    return '<center>' + htmlx+ '</center>';
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    if( full.INFORMACION_SISTEMAS_ELIMINAR.length > 0 ){
                       htmlx += '<img onclick = "EliminarRegistroBiblioteca('+data+')" src ="../images/eliminar1.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    }
                    
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#AccesosSis').css({'width':'100%'})
}

function EliminarRegistroBiblioteca(Hash){
    ModalEdit(0);
    if(confirm("Está seguro(a) de Eliminar este Acceso ?") ==  true){
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
            url: UrlGeneral + '195a6f0a30d91f0a8ef30d8d96db766e',
            success:function(data){
                
                if( data.Info == 1 ){
                    AlertaMensajes("Acceso eliminado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo eliminar el Acceso","error",3);
                }
                ModalEdit(1);
                BuscarDatosAccesos()
            }
        })
    }else{
        ModalEdit(1);
    }
}

function EditarInformacionAccesoBiblioteca(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url: UrlGeneral + '0d2716b2bf957ed02b129d27da9c93a7',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Editar Registro de Acceso</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' onclick = 'myModal(0);ModalEdit(1)'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose'  onclick = 'myModal(0);ModalEdit(1)'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Propietario:</label>"
                            html += "<select class = 'form-control' id = 'NewTipo' name = 'NewTipo' required >";
                                    for(var i = 0; i < data.Propietarios.length;i++){
                                        if( data.InfoItem[0]['IdTipoSistemas'] == data.Propietarios[i]['Hash'] ){
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"' selected>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Propietarios[i]['Hash']+"'>"+data.Propietarios[i]['Nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Plataforma / Aplicación</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'Newapp' id = 'Newapp' autocomplete = 'off' value = '"+data.InfoItem[0]['app']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Url:</label>"
                            html += "<input type = 'url' class = 'form-control' name = 'NewUrl' id = 'NewUrl' autocomplete = 'off' value = '"+data.InfoItem[0]['Direccion']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Referencia:</label>"
                            html += "<input  autocomplete = 'off' type = 'text' name = 'NewReferencia' id = 'NewReferencia' class = 'form-control' value = '"+data.InfoItem[0]['Marca']+"' />"
                            
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Usuario:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'NewUsuario' id = 'NewUsuario' autocomplete = 'off' value = '"+data.InfoItem[0]['Usuario']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Contraseña:</label>"
                            html += "<input type = 'password' class = 'form-control' name = 'NewPass' id = 'NewPass' autocomplete = 'off' value = '"+data.InfoItem[0]['Clave']+"'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'>Estado:</label>"
                            html += "<select class = 'form-control' id = 'EstadoAcceso' name = 'EstadoAcceso' required >";
                                    if( data.InfoItem[0]['Estado'] == 1){
                                        html += "<option value = '1' selected>Activo</option>"
                                        html += "<option value = '0' >Inactivo</option>"
                                    }
                                    if( data.InfoItem[0]['Estado'] == 0){
                                        html += "<option value = '1' >Activo</option>"
                                        html += "<option value = '0' selected>Inactivo</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarAccesoBiblioteca(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#NuevoItemInventarioGeneral").validate({
                rules: {
                    NewTipo : {
                        required: true,
                        minlength:1
                    },
                    Newapp : {
                        required: true,
                        minlength:2
                    }
                    ,
                    NewReferencia : {
                        required: true,
                        minlength:2
                    }
                    ,
                    NewUsuario : {
                        required: true,
                        minlength:3
                    }
                    ,
                    
                    NewPass : {
                        required: true,
                        minlength:3
                    }
                }
            });
            myModal(1);
            $('.content_modal3').css('height',380);
        }
    })
}

function GuardarEditarAccesoBiblioteca(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("NewTipo", $("#NewTipo").val());
        formData.append("NewReferencia", $("#NewReferencia").val());
        formData.append("NewUrl", $("#NewUrl").val());
        formData.append("Newapp", $("#Newapp").val());
        formData.append("NewUsuario", $("#NewUsuario").val());
        formData.append("NewPass", $("#NewPass").val());
        formData.append("EstadoAcceso", $("#EstadoAcceso").val());
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
            url: UrlGeneral + 'd2a4bc1d3ca66c2db5b6c6d0229485be',
            success:function(data){
                myModal(0);
                ModalEdit(1);
                BuscarDatosAccesos()
                if( data.Info == 1 ){
                    AlertaMensajes("Acceso Modificado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Modificar el Acceso","error",3);
                }
            }
        })
    }
}

function b01174c89fa348ffb1c3956fa2efb32c(Hash){
    ModalEdit(0);
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
        url:UrlGeneral + 'b01174c89fa348ffb1c3956fa2efb32c',
        success:function(data){
            var html = "";
            
            TituloVentana = "Datos de Acceso: "+data.InfoItem[0]['App']
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='NuevoItemInventarioGeneral' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'>Usuario:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'NewUsuario' id = 'NewUsuario' autocomplete = 'off' value = '"+data.InfoItem[0]['Usuario']+"' />"
                        html += "</div>"
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='ParLogo'>Contraseña:</label>"
                            html += "<input disabled type = 'text' class = 'form-control' name = 'NewPass' id = 'NewPass' autocomplete = 'off' value = '"+data.InfoItem[0]['Clave']+"'/>"
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'myModal(0);ModalEdit(1)'>Cerrar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            
            myModal(1);
            $('.content_modal3').css('height',280);
        }
    })
}


function generarReporteInventarioExcel() {
    var route = UrlGeneral + 'fd4d81172fccc2d8afba81789cb98b8c'
    generarReporteInventario(route, 'excel')
}


function generarReporteInventario(route, type) {
    const Propietario = $("#List_PropietarioIG").val();
    const Estado = $("#EstadosInventarioGeneral").val();
    const TextB = $("#TextBusquedaIG").val();

    fetch(route,{
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Propietario: Propietario,
            Estado: Estado,
            Valor: TextB,
            type
        })
    })
    .then(resp => resp.blob())
    .then(blob => {
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Inventario General';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alertify.notify('Archivo Descargado satisfactoriamente', 'success', 5, function () {
            console.log('dismissed');
        });
    })
    .catch(() => alert('Error Al Descargar el Documento'));

}

