$(document).ready(function () {
    ContentList("InfoClientes")
    tablaClientes()
});

function buscarTablaClientes() {
    $DataTable_Clientes.destroy();
    $DataTable_Clientes.draw();
    tablaClientes();
}

function tablaClientes() {
    $DataTable_Clientes = $('#TableClientes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'da67a555d46ab2c036f6e3748baf3b59',
            'data':function (d) {
                    d.search['value'] = $("#C_TextBusqueda").val();
                    d.search['Estadox'] = $("#C_Estado").val();
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
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (full.INFORMACION_CLIENTES_LEGAL == 1) {
                        var ht = '';
                        ht += '<img src = "images/Datos_legal1.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "InformacionLegalCliente(\''+full.Hash+'\', \''+full.Hash2+'\', \''+UrlUniversal + 'eb6c344f43227116eb925eb701ea5ebe'+'\')"/>'
                        return '<center>'+ht+'</center>'
                    }
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (full.INFORMACION_CLIENTE_DOCUMENTOS == 1) {
                        var ht = '';
                        ht += '<img src = "images/Datos_documentos.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "DocumentosLegalesCliente(\''+full.Hash+'\')"/>'
                        return '<center>'+ht+'</center>'
                    }
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_CLIENTES_CONTACTOS == 1 ){
                        var ht = '';
                        ht += '<img src = "images/Datos_contactos1.png" class = "OptionIcon" data-toggle="modal" onclick = "contactosClientes(\''+full.Hash+'\', \''+full.Hash2+'\')" data-target="#ModalEdit"/>'
                        return '<center>'+ht+'</center>'
                    }
                }
            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_CLIENTES_NEGOCIACIONES == 1 ){
                        var ht = '';
                        ht += '<img src = "images/Datos_negociaciones1.png" class = "OptionIcon" data-toggle="modal" onclick = "InformacionNegociacionesCliente(\''+full.Hash+'\')" data-target="#ModalEdit"/>'
                        return '<center>'+ht+'</center>'
                        
                    }
                }
            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_CLIENTES_PROFESIONALES == 1 ){
                        var ht = '';
                        ht += '<img src = "images/datos_profesionales1.png" class = "OptionIcon" data-toggle="modal" onclick = "profesionalesCliente(\''+full.Hash+'\')" data-target="#ModalEdit"/>'
                        return '<center>'+ht+'</center>'
                        
                    }
                }
            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_CLIENTES_PRODUCTOS == 1 ){
                        var ht = '';
                        ht += '<img src = "images/Datos_productos.png" class = "OptionIcon" data-toggle="modal" onclick = "productosCliente(\''+full.Hash+'\')" data-target="#ModalEdit"/>'
                        return '<center>'+ht+'</center>'
                    }
                }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_CLIENTES_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoCliente(\''+full.Hash+'\',\''+UrlUniversal + '9e97ceed51da97c6cf1577d3036ddb21'+'\')">'
                                    hx += '<img src ="images/_activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoCliente(\''+full.Hash+'\',\''+UrlUniversal + '9e97ceed51da97c6cf1577d3036ddb21'+'\')">'
                                    hx += '<img src ="images/_inactivo.png" class = "OptionIcon" />';
                            }

                        hx += '</span>'
                    }

                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            }
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TableClientes').css({'width':'100%'})
}

function CrearCliente(Ruta){
    $.ajax({
        type:'POST',
        url:'51f696886be0f1405d8b037a411ecc2f',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Crear Cliente"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, buscarTablaClientes)' action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Nit:</label>";
                            html += "<input type='text' class='form-control' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required/>";
                        html += "</div>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i]['IdPais']+"'>"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required>";
                                html += "<option value = ''>Seleccione</option>";

                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required>";
                                html += "<option value = ''>Seleccione</option>";

                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParTelefono' ><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                            html += "<input type='text' class='form-control' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Dirección:</label>";
                            html += "<input type='text' class='form-control' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required/>";
                        html += "</div>";

                    html += "</div>";

                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParTelefono' >Correo Facturación Electrónica:</label>";
                            html += "<input type='email' class='form-control' id='ParCorreoFact' name='ParCorreoFact' placeholder='Correo' autocomplete = 'off' />";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParFechaCierreFacturacion' >Fecha Cierre de Facturacion:</label>";
                            html += "<input type='number' class='form-control' id='ParFechaCierreFacturacion' name='ParFechaCierreFacturacion' placeholder='0' min='0' max='31' autocomplete = 'off'/>";
                        html += "</div>";
                    html += "</div>";


                    html += "<label for='empresas' aria-describedby='empresas'><span class = 'Obligatorio'>(*)</span> Empresas relacionadas:</label>";
                    html += "<small id='empresas' class='form-text text-muted'>"
                        html+= "Se debe seleccionar almenos una empresa, y se debe indicar sus iniciales de minimo 3 caracteres y maximo 5, solo se permiten letras."
                    html += "</small>"
                    html += "<div class='form-row my-3 overflow-y:scroll'>";
                        data.Empresas.forEach(empresa => {
                            html += "<div class='col-sm-8 my-2'>";
                                html += "<div class='form-check'>"
                                    html += "<input class='form-check-input' onclick='requiredEmpresaIniciales(this)' type='checkbox' name='ParEmpresas[]' value='"+empresa.hash+"' id='empresa"+empresa.hash+"'>"
                                    html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                        html += empresa.NombreLegal
                                    html += "</label>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class='col-sm-4 my-2'>";
                                html += "<input type='text' onkeyup='validacionIndice(this)' class='form-control text-uppercase' id='ParEmpresaIniciales"+empresa.hash+"' name='ParEmpresasIniciales["+empresa.hash+"]' placeholder='Iniciales' pattern='[a-zA-Z]{3,5}' autocomplete = 'off' readonly/>";
                            html += "</div>";
                        });
                    html += "</div>";

                html += "<div class='modal-footer'>";
                    
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";



            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');

        }
    });
}

function InformacionLegalCliente(Hash, Hash2, RutaEdit) {
    let Ruta = 'ee74fed5f15671ca6a4e0e8483829abd'
    $.ajax({
        type: 'POST',
        url: Ruta,
        data: {Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            let editar = "";
            if( data.PerLegalEdicion.length > 0 ){
                editar = "<img src ='images/editar1.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalClienteEdicion()'/>"
            }
            var html = "";
            
            TituloVentana = "Información Legal Cliente"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = editar+""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin FormDatosInformacionLegalCliente' onsubmit='sendForm(event, buscarTablaClientes)' action='"+RutaEdit+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.Cliente[0].Hash + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Nit:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Nit+"' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].NombreComercial+"' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].NombreLegal+"' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i].IdPais+"' "+(data.Cliente[0].IdPais===data.Paises[i].IdPais ? 'selected' : '')+">"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    html += "<option value = '"+data.Departamento[i].IdDepartamento+"' "+(data.Cliente[0].IdDepto===data.Departamento[i].IdDepartamento ? 'selected' : '')+">"+data.Departamento[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
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
                            html += "<label for='ParTelefono' ><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Telefono+"' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Dirección:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Cliente[0].Direccion+"' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";

                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParFechaCierreFacturacion' >Fecha Cierre de Facturacion:</label>";
                            html += "<input type='number' class='form-control' value='"+data.Cliente[0].FechaCierreFacturacion+"' id='ParFechaCierreFacturacion' name='ParFechaCierreFacturacion' placeholder='0' min='0' max='31' autocomplete = 'off' readonly/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<label for='empresas' aria-describedby='empresas'><span class = 'Obligatorio'>(*)</span> Empresas relacionadas:</label>";
                    html += "<small id='empresas' class='form-text text-muted'>"
                        html+= "Se debe seleccionar almenos una empresa, y se debe indicar sus iniciales de minimo 3 caracteres y maximo 5, solo se permiten letras."
                    html += "</small>"
                    html += "<div class='form-row my-3'>";
                        data.Empresas.forEach((empresa) => {
                            let printHtml = false
                            data.EmpresasAsoc.forEach((asoc) => {
                                if (asoc.HashEmpresa===empresa.HashEmpresa) {
                                    html += "<div class='col-sm-8 my-2'>";
                                        html += "<div class='form-check'>"
                                            html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' checked disabled>"
                                            html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                                html += empresa.NombreLegal
                                            html += "</label>"
                                        html += "</div>"
                                    html += "</div>"
                                    html += "<div class='col-sm-4 my-2'>";
                                        html += "<input type='text' onkeyup='validacionIndice(this)' value='"+asoc.Indice+"' class='form-control text-uppercase' id='ParEmpresaIniciales"+empresa.HashEmpresa+"' name='ParEmpresasIniciales["+empresa.HashEmpresa+"]' placeholder='Iniciales' pattern='[a-zA-Z]{3,5}' autocomplete = 'off' readonly/>";
                                    html += "</div>"
                                    printHtml = true
                                    return;
                                }
                            })
                            if (!printHtml) {
                                html += "<div class='col-sm-8 my-2 check-empresas d-none'>";
                                    html += "<div class='form-check'>"
                                        html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.HashEmpresa+"' id='empresa"+empresa.HashEmpresa+"' disabled>"
                                        html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                            html += empresa.NombreLegal
                                        html += "</label>"
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='col-sm-4 my-2 check-empresas d-none'>";
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
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
        }
    })
}

const DatosClienteContacto = {
    Hash: '',
    Hash2: '',
    sendData: function (e) {
        e.preventDefault()
        let form = e.target
        let formData = new FormData(form);
        let token = document.getElementsByName('_token')[0].value
        $.ajax({
            type: 'POST',
            url: '06cc90a8658b1b940ff15441d7ec7693',
            contentType: false,
            processData: false,
            headers: {
                'x-csrf-token': token
            },
            data: formData,
            success: function (data) {
                $('#ModalEdit2').modal('hide');
            }
        })
    }
}

function contactosClientes(Hash, Hash2) {
    DatosClienteContacto.Hash = Hash
    DatosClienteContacto.Hash2 = Hash2
    // $('#ModalEdit2').on('hidden.bs.modal', function (e) {
    //     $('#ModalEdit').modal('show');
    //     informacionContactosCliente()
    // })
    informacionContactosCliente()
}

function informacionContactosCliente() {
    // $('#ModalEdit2').on('hidden.bs.modal', null)
    $.ajax({
        type:'POST',
        url:'6cfa4f5bbba93bbca82cb11a70f4fa17',
        data:{Hash:DatosClienteContacto.Hash,Hash2:DatosClienteContacto.Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Editar = data.INFORMACION_CLIENTES_CONTACTOS_EDITAR.length;
            var html = "";
            
            TituloVentana = "Información Contactos "+ $(".NameComercial"+DatosClienteContacto.Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    if( data.INFORMACION_CLIENTES_CONTACTOS_CREAR.length > 0 ){
                        html += "<div class = 'table'>";
                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = \"$(\'#ModalEdit\').modal('hide'); crearContactoCliente()\" data-toggle='modal' data-target='#ModalEdit2'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearContactoCliente()' data-toggle='modal' data-target='#ModalEdit2'>Nuevo Contacto</span>";
                        html += "</div>";
                    }
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Texto:</label>"
                            html += "<input type = 'text' class = 'form-control' id = 'TextBusqueda' name = 'TextBusqueda' onkeypress = 'BuscarDocumentosEmpresa()'/>"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosEmpresa()'/>"
                        html += "</div>"
                        html += "<div class = 'ContenedorDataTable'>"
                            html += "<table class='dataTable tableNew ContactosCliente"+DatosClienteContacto.Hash+"' id='ContactosCliente"+DatosClienteContacto.Hash+"'>";
                                html += "<thead>"
                                    html += "<tr>"
                                        // html += "<th>Sel</th>"
                                        html += "<th>No.</th>"
                                        html += "<th>Nombre</th>"
                                        html += "<th>Cargo</th>"
                                        html += "<th>Celular</th>"
                                        html += "<th>Telefono</th>"
                                        html += "<th>Correo</th>"
                                        html += "<th>Horario</th>"
                                        html += "<th>Dia</th>"
                                        html += "<th>Mes</th>"
                                        html += "<th>Estado</th>"
                                        html += "<th>Editar</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>";
                html += "</div>";

            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');

            $DataTable = $('#ContactosCliente'+DatosClienteContacto.Hash).DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                'ajax': {
                    'url':'c7c953f8534fcaa0192f241bc39632eb',
                    /*'cache': false,
                    'contentType': false,
                    'processData': false,*/
                    'data':function (d) {
                        d.search['value'] = SearchTable;
                        return $.extend({}, d, {
                            'Hash':DatosClienteContacto.Hash,'Hash2':DatosClienteContacto.Hash2,'_token':document.getElementsByName('_token')[0].value
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
                            return '<span class = "TipoDoc'+full.id+'">' + (data===null ? '---' : data) + '</span>';
                        }

                    },
                    {
                        data: 'Cargo',
                        "render": function (data, type, full, meta) {
                            return '<span>' + (data===null ? '---' : data) + '</span>';
                        }
                    },
                    {
                        data: 'Celular',
                        "render": function (data, type, full, meta) {
                            return '<span>' + (data===null ? '---' : data) + '</span>';
                        }
                    },
                    {
                        data: 'Telefono',
                        "render": function (data, type, full, meta) {
                            return '<span>' + (data===null ? '---' : data) +'</span>';
                        }
                    },
                    {
                        data: 'Correo',
                        "render": function (data, type, full, meta) {
                            return '<span>' + (data===null ? '---' : data) +'</span>';
                        }
                    },
                    {
                        data: 'Horario',
                        "render": function (data, type, full, meta) {
                            return '<span>' + (data===null ? '---' : data) +'</span>';
                        }
                    },
                    {
                        data: 'Dia',
                        "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) +'</center>';
                        }
                    },
                    {
                        data: 'Mes',
                        "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) +'</center>';
                        }
                    },
                    {
                        data: 'NombreEstado',
                        "render": function (data, type, full, meta) {
                            var ht = ''
                            if( data == 'Activo' ){
                                if( Editar > 0 ){
                                    ht += '<img src ="images/_activo.png" onclick = "CambiarEstadoContactoCliente('+full.id+')" class = "OptionIcon" />'
                                }else{
                                    ht += '<img src ="images/_activo.png"  class = "OptionIcon" />'
                                }
                                
                            }else{
                                if( Editar > 0 ){
                                    ht += '<img src ="images/_inactivo.png" onclick = "CambiarEstadoContactoCliente('+full.id+')" class = "OptionIcon" />'
                                }else{
                                    ht += '<img src ="images/_inactivo.png"  class = "OptionIcon" />'
                                }
                            }
                             return '<center>' + ht +'</center>';
                         }
                    },
                    {
                        data: 'id',
                        "render": function (data, type, full, meta) {
                            var ht = ''
                            if( Editar > 0 ){
                                ht += '<img src ="images/editar1.png" data-toggle="modal" data-target="#mymodal" onclick = "EditarInformacionCliente('+full.id+')" class = "OptionIcon" />'
                            }else{
                                ht += '<img src ="images/_activo.png"  class = "OptionIcon" />'
                            }
                             return '<center>' + ht +'</center>';
                         }
                    },
                ],
                "order": [[7, "asc"],[6, "desc"]],
                "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
            })

        }
    });
}

function EditarInformacionCliente(Hash){
    $.ajax({
        type:'POST',
        url:'048f809eb38ef3804f84816721dc342b',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0);
            var html = "";
            
            TituloVentana = "Editar Contacto Cliente"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0);ModalEdit(1);"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<form class='form-signin' id = 'FormEditarContactoCliente' method='post' action='javascript:void(0)'>";
                    html += "<div class='form-row my-2'>";
                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNombre'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                            html += "<input type='text' class='form-control' id='ParNombre' name='ParNombre' placeholder='Nombre' autocomplete = 'off' value = '"+data.Contactos[0]['Nombre']+"' required/>";
                        html += "</div>";

                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParCargo' >Cargo:</label>";
                            html += "<input type='text' class='form-control' id='ParCargo' name='ParCargo' placeholder='Cargo' autocomplete = 'off' value = '"+data.Contactos[0]['Cargo']+"'/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCelular' > Celular:</label>";
                            html += "<input type='text' class='form-control' id='ParCelular' name='ParCelular' placeholder='Celular' autocomplete = 'off' value = '"+data.Contactos[0]['Celular']+"' />";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParTelefono' > Telefono:</label>";
                            html += "<input type='text' class='form-control' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' value = '"+data.Contactos[0]['Telefono']+"'/>";
                        html += "</div>";
                        html += "<div class='col-sm-5'>";
                            html += "<label for='ParCorreo' ><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                            html += "<input type='email' class='form-control' id='ParCorreo' name='ParCorreo' placeholder='Correo' autocomplete = 'off' value = '"+data.Contactos[0]['Correo']+"' required/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-row my-3'>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParHorario' > Horario:</label>";
                            html += "<input type='text' class='form-control' id='ParHorario' name='ParHorario' placeholder='Horario' autocomplete = 'off' value = '"+data.Contactos[0]['Horario']+"'/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDia' > Día:</label>";
                            html += "<input type='number' class='form-control' id='ParDia' name='ParDia' placeholder='Dia' autocomplete = 'off' value = '"+data.Contactos[0]['Dia']+"' />";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParMes' > Mes:</label>";
                            html += "<input type='number' class='form-control' id='ParMes' name='ParMes' placeholder='Mes' autocomplete = 'off' value = '"+data.Contactos[0]['Mes']+"'/>";
                        html += "</div>";
                    html += "</div>";

                html += "<div class='modal-footer my-4'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDatosEditarContactoCliente("+Hash+")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $("#ModalEdit2").addClass('modal-dialog-scrollable')
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
            ModalEdit2(1);
            $FormValidate = $("#FormEditarContactoCliente").validate({
                rules: {
                    ParNombre : {
                        required: true,
                        minlength:3
                    },
                    ParCorreo : {
                        required: true,
                        minlength:2
                    }
                }
            });
        }
    })
}

function GuardarDatosEditarContactoCliente(Hash){
    if( $FormValidate.form() == true ){
        var formData = new FormData();
        formData.append("ParNombre", $("#ParNombre").val());
        formData.append("ParCargo", $("#ParCargo").val());
        formData.append("ParCelular", $("#ParCelular").val());
        formData.append("ParTelefono", $("#ParTelefono").val());
        formData.append("ParCorreo", $("#ParCorreo").val());
        formData.append("ParHorario", $("#ParHorario").val());
        formData.append("ParDia", $("#ParDia").val());
        formData.append("ParMes", $("#ParMes").val());
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
            url:'e72747d786421729f6af0a13eb24254b',
            success:function(data){
                ModalEdit2(0);
                ModalEdit(1);
                BuscarDocumentosEmpresa()
                if( data.Info == 1 ){
                    AlertaMensajes("Contacto de Cliente Modificado con éxito","success",3);
                }else{
                    AlertaMensajes("No se pudo Modificar el Contacto de Cliente","error",3);
                }
            }
        })
    }
}

function CambiarEstadoContactoCliente(Hash){
    $.ajax({
        type:'POST',
        url:'f1ed543bffea7b7c4693c5bfa13352bd',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarDocumentosEmpresa()
            if( data.Info == 1 ){
                AlertaMensajes("Estado del Contacto Modificado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Modificar el Estado del Contacto","error",3);
            }
        }
    })
}

function EliminarDocumentoLegalCliente(Hash){
    $.ajax({
        type:'POST',
        url:'4a1881be96401cbddfc6cf9e45e345a7',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarDocumentosLegalesCliente()
            if( data.Info == 1 ){
                AlertaMensajes("Documento Eliminado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Eliinar el Documento","error",3);
            }
        }
    })
}

function EliminarContratoCliente(Hash,Hc){
    $.ajax({
        type:'POST',
        url:'4a1881be96401cbddfc6cf9e45e345a7x',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarContratosCliente(Hc)
            if( data.Info == 1 ){
                AlertaMensajes("Documento Eliminado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Eliinar el Documento","error",3);
            }
        }
    })
}

function BuscarDocumentosEmpresa(){
    SearchTable = $("#TextBusqueda").val();
    $DataTable.draw();
    DataTableModel()
}

function crearContactoCliente() {
    ModalEdit(0)
    ModalEdit2(1)

    let Ruta = '06cc90a8658b1b940ff15441d7ec7693'

    var html = "";

    TituloVentana = "Crear Contacto Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0);ModalEdit(1)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='DatosClienteContacto.sendData(event)'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + DatosClienteContacto.Hash + "'>";
        html += "<input type='hidden' name='Hash2' value='" + DatosClienteContacto.Hash2 + "'>";
            html += "<div class='form-row my-2'>";

                html += "<div class='col-sm-6'>";
                    html += "<label for='ParNombre'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                    html += "<input type='text' class='form-control' id='ParNombre' name='ParNombre' placeholder='Nombre' autocomplete = 'off' required/>";
                html += "</div>";

                html += "<div class='col-sm-6'>";
                    html += "<label for='ParCargo' >Cargo:</label>";
                    html += "<input type='text' class='form-control' id='ParCargo' name='ParCargo' placeholder='Cargo' autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";

            html += "<div class='form-row my-3'>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParCelular' > Celular:</label>";
                    html += "<input type='text' class='form-control' id='ParCelular' name='ParCelular' placeholder='Celular' autocomplete = 'off' />";
                html += "</div>";
                html += "<div class='col-sm-3'>";
                    html += "<label for='ParTelefono' > Telefono:</label>";
                    html += "<input type='text' class='form-control' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' />";
                html += "</div>";
                html += "<div class='col-sm-5'>";
                    html += "<label for='ParCorreo' ><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                    html += "<input type='email' class='form-control' id='ParCorreo' name='ParCorreo' placeholder='Correo' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";

            html += "<div class='form-row my-3'>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParHorario' > Horario:</label>";
                    html += "<input type='text' class='form-control' id='ParHorario' name='ParHorario' placeholder='Horario' autocomplete = 'off'/>";
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParDia' > Día:</label>";
                    html += "<input type='number' class='form-control' id='ParDia' name='ParDia' placeholder='Dia' autocomplete = 'off' />";
                html += "</div>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParMes' > Mes:</label>";
                    html += "<input type='number' class='form-control' id='ParMes' name='ParMes' placeholder='Mes' autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";

        html += "<div class='modal-footer my-4'>";
            html += "<button type='submit' class='btn btn-primary' onclick = 'ModalEdit2(0);ModalEdit(1);BuscarDocumentosEmpresa()'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit2").addClass('modal-dialog-scrollable')
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
}

/*
-----------------------------------------------------------------------//
---------------------- Productos Cliente -----------------------------//
---------------------------------------------------------------------//
*/

const ProductosCliente = {
    Hash: null,
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)

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
                    $('#ModalEdit2').modal('hide')
                    $('#ModalEdit').modal('show')
                    productosCliente(''+data.IdCliente+'')
                    
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash , route) {
        $.ajax({
            type:'POST',
            url:route,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: {Hash},
            success:function(data){
                if (data.success) {
                    BuscarTablaProductosCliente()
                } else {
                    alert('El estado no pudo ser cambiado\n'+data.mensage)
                }
            }
        })
    }
}

function productosCliente(Hash) {
    ProductosCliente.Hash = Hash
    InformacionProductosCliente()
}

function BuscarTablaProductosCliente(){
    $DataTable_Productos_Cliente.destroy();
    $DataTable_Productos_Cliente.draw();
    tablaProductosCliente();
}

function InformacionProductosCliente() {
    var html = "";
    
    TituloVentana = "Productos Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'table'>"
            html +="<img src ='images/Datos_Nuevprod.png' class = 'OptionIcon' onclick=\"$('#ModalEdit').modal('hide'); crearProdcutosCLiente()\" data-toggle='modal' data-target='#ModalEdit'/>"
            html +="<span class='FirstText Cursor' style='color:#e13735;font-weight: bold;' onclick = 'crearProdcutosCLiente()' data-toggle='modal' data-target='#ModalEdit'>Nuevo Producto</span>"
        html +="</div>"

        html +="<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='IdTipoDoc'>Estado:</label>"
                    html +="<select class ='form-control' name = 'PC_Estado' id = 'PC_Estado'>"
                        html +="<option value = '-1' >Todos</option>"
                        html +="<option value = '1' selected >Activo</option>"
                        html +="<option value = '0'>Inactivo</option>"
                    html +="</select>"
                html +="</div>"
                html += "<div class='col col-sm-3 my-2'>"
                    html +="<label for='IdTipoDoc'>Buscar:</label>"
                    html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PC_TextBusqueda' name = 'PC_TextBusqueda' onkeypress = 'BuscarTablaProductosCliente()' />"
                html +="</div>"
                html +="<div class='col col-sm-3 my-2'>"
                    html +="<p></p>"
                    html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaProductosCliente()'/>"
                html +="</div>"
            html +="</div>"
        html += "<table id = 'tablaProductosCliente' class='dataTable tableNew'>"
            html += "<thead>"
                html +=  "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>FEE</th>"
                    html += "<th>Sub-Productos</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Editar</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
    tablaProductosCliente()
}

function crearProdcutosCLiente() {
    
    Ruta = '5153d30bddab9cf4c18403f55e69523e'
    var html = "";

    TituloVentana = "Crear Producto Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0);ModalEdit(1);"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='ProductosCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + ProductosCliente.Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombre' name='parNombre' placeholder='Nombre del Producto' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parFEE' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> FEE:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parFEE' name='parFEE' placeholder='$0000' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit2").addClass('modal-dialog-scrollable')
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit2').modal('show');
}

function editarProductosCliente(Hash, ruta) {
    $.ajax({
        type: 'POST',
        url: '014ea1ebce55e2dd20322a03bdeea0ea',
        data: {Hash, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            $('#ModalEdit').modal('hide');

            var html = "";
            html += "<div class='modal-header panel-heading2'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<img src = '"+UrlUniversal+"images/editar1.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Editar Producto</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' onclick=\"$('#ModalEdit').modal('show'); InformacionProductosCliente(); LimpiarModalContent()\" class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='ProductosCliente.enviar(event)' action='"+ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' value='"+data.producto.Nombre+"' class='form-control' id='parNombre' name='parNombre' placeholder='Nombre del Producto' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parFEE' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> FEE:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' value='"+data.producto.FEE+"' class='form-control' id='parFEE' name='parFEE' placeholder='0' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' onclick=\"$('#ModalEdit').modal('show'); InformacionProductosCliente(); LimpiarModalContent()\" class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $("#ModalEdit2").addClass('modal-dialog-scrollable')
            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
            $('#ModalEdit2').modal('show');
        }
    })
}

function tablaProductosCliente() {
    $DataTable_Productos_Cliente = $('#tablaProductosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8434c3b95f8cc57d90e742ad271cc9ef',
            'data':function (d) {
                    d.search['value'] = $("#PC_TextBusqueda").val();
                    d.search['Estadox'] = $("#PC_Estado").val();
                    d.search['Hash'] = ProductosCliente.Hash;
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
                data: 'FEE',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentBDLN_'+full.Hash+'">' + formatNumber.new(parseInt(data)) + '</span>';
                 }

            },
            {
                data: 'Hash',
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_CLIENTES_SUBPRODUCTOS == 1 ){
                        var ht = '';
                        ht += '<img src = "images/detalles.png" class = "OptionIcon" data-toggle="modal" onclick = "$(\'#ModalEdit\').modal(\'hide\'); subProductosCliente(\''+full.Hash+'\')">'
                        return '<center>'+ht+'</center>'
                    }
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_CLIENTES_FEE_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "ProductosCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + '718ef33e5372c7ffc103e5d88b397440f'+'\',1)">'
                                    hx += '<img src ="images/_activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "ProductosCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + '718ef33e5372c7ffc103e5d88b397440f'+'\',0)">'
                                    hx += '<img src ="images/_inactivo.png" class = "OptionIcon" />';
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

                    if( full.INFORMACION_CLIENTES_FEE_EDITAR == 1 ){
                        hx += '<img src ="images/editar1.png" class = "OptionIcon" onclick = "$(\'#ModalEdit\').modal(\'hide\'); editarProductosCliente(\''+full.Hash+'\',\''+UrlUniversal + '7f45ee2ba9d178bb9b41195db5652feb'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#tablaProductosCliente').css({'width':'100%'})
}

function DocumentosLegalesCliente(Hash){
    $.ajax({
        type:'POST',
        url:'1f21787583cd0eb5e1b9f0d4e0ba2ab3',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //76a9105e3c897358d4792237514bed12
            var html = "";
            TituloVentana = "Documentos Legales "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                
                html += "<div id = 'Clie'>";
                    html += "<ul >";
                        html += "<li onclick = '' >"
                            html += "<a href = '#Clie-1'>"
                            html += "<span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'TablaContratosClientes(\""+Hash+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                            
                            html += "<a href = '#Clie-2'><span>Contratos</span></a>"
                        html +="</li>";
                    html += "</ul>"
                    html += "<div id = 'Clie-1' class = ''>";
                    
                        if( data.INFORMACION_CLIENTE_DOCUMENTOS_CREAR.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='images/Datos_nuevdoc.png' class = 'OptionIcon' onclick = 'NuevoDocumentoCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#753288;font-weight: bold;' onclick = 'NuevoDocumentoCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Documento</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos' name = 'TextBusquedaDocumentos' onkeypress = 'BuscarDocumentosLegalesCliente("+Hash+")'/>"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosLegalesCliente("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocumentosLegalesCliente"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th width = '20px'>No.</th>"
                                    html += "<th nowrap >Tipo</th>"
                                    html += "<th nowrap>Registrado Por</th>"
                                    html += "<th nowrap>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                    html += "<th>Eliminar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                    
                    html += "<div id = 'Clie-2' class = 'ChildTabsMenu TabsMenu2'>";
                        if( data.INFORMACION_CLIENTE_DOCUMENTOS_CREAR.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='images/datos_nuevcontr.png' class = 'OptionIcon' onclick = 'NuevoContratoCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#753288;font-weight: bold;' onclick = 'NuevoContratoCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Contrato</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos_Contrato' name = 'TextBusquedaDocumentos_Contrato'onkeypress = 'BuscarContratosCliente("+Hash+")' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarContratosCliente("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'ContratosClientes"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Nombre</th>"
                                    html += "<th>Fecha Firma</th>"
                                    html += "<th>Fecha Vencimiento</th>"
                                    html += "<th>Valor</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                    html += "<th>Eliminar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table></div>"
                    html += "</div>"
                html += "</div>"
            
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            $("#Clie").tabs()
            TablaDocumentosLegalesClientes(Hash)
            
        }
    });
}

function BuscarDocumentosLegalesCliente(Hash){
    $DataTable_Cliente_DocumentosLegales.draw();
}
function BuscarContratosCliente(Hash){
    $DataTable_Cliente_Contratos.draw();
}

function TablaDocumentosLegalesClientes(Hash){
    $DataTable_Cliente_DocumentosLegales =  $("#DocumentosLegalesCliente"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'76a9105e3c897358d4792237514bed12',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentos").val();
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../storage/app/datos/Clientes/'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="images/descargar.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    if( full.INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR.length > 0 ){
                       htmlx += '<img onclick = "EliminarDocumentoLegalCliente('+data+')" src ="images/eliminar1.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
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
    $('#DocumentosLegalesCliente'+Hash).css({'width':'100%'})
}

function TablaContratosClientes(Hash){
    $DataTable_Cliente_Contratos =  $("#ContratosClientes"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'61aeda188f3b7fd07989e6a2929cc707',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentos_Contrato").val();
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../storage/app/datos/Clientes/CONTRATO_'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
                        htmlx += '<img src ="images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }
           },
           {
               data: 'Hash',
               "orderable": false,
                "searchable": false,
               "render": function (data, type, full, meta) {
                    var htmlx = '';
                    if( full.INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR == 1 ){
                       htmlx += '<img onclick = "EliminarContratoCliente('+data+','+Hash+')" src ="images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
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
    $('#DocumentosLegalesCliente'+Hash).css({'width':'100%'})
}

function InformacionNegociacionesCliente(Hash) {
    $.ajax({
        type:'POST',
        url:'1f21787583cd0eb5e1b9f0d4e0ba2ab3',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //76a9105e3c897358d4792237514bed12
            var html = "";
            
            TituloVentana = "Negociaciones "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                if( data.INFORMACION_CLIENTE_DOCUMENTOS_CREAR.length > 0 ){
                    html += "<div class = 'table'>";
                        html += "<table>";
                            html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                                html += "<img src ='images/Datos_nuevnegoc.png' class = 'OptionIcon' onclick = 'NuevaNegociacionCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevaNegociacionCliente(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nueva Negociacion</span>";
                            html += "</td>"
                            html += "</tr>"
                        html += "</table>";
                    html += "</div>"
                }
                html += "<div class = 'form-row'>";
                    
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<label for='IdTipoDoc'>Texto:</label>"
                        html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaNC' name = 'TextBusquedaNC' onkeypress = 'BuscarNegociacionesCliente("+Hash+")' />"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-2'>"
                        html += "<p></p>"
                        html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarNegociacionesCliente("+Hash+")'/>"
                    html += "</div>"
                html += "</div><br>";
                html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'NegociacionesClientes"+Hash+"'>";
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th width = '20px'>No.</th>"
                            html += "<th>Empresa</th>"
                            html += "<th>Unidad</th>"
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
                    html += "</table></div>"
                    
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            TablNegociacionesCliente(Hash)
        }
    });
}

function EstadoCliente(Hash,Route){
    printDataAjax(Route, {Hash}, data => {
        buscarTablaClientes()
        AlertaMensajes("Estado de Cliente Modificado","success",3);
        
    })
}

function NuevoDocumentoCliente(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url:'55fdabfe49c62e712a3940b37bfc7c5a',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Nuevo Documento Legal "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='FormDocumentoLegalCliente' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Documento:</label>"
                            html += "<select class = 'form-control' id = 'NewTipo' name = 'NewTipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Info.length;i++){
                                        html += "<option value = '"+data.Info[i]['Hash']+"'>"+data.Info[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png, application/pdf' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDocumentoLegalCliente(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#FormDocumentoLegalCliente").validate({
                rules: {
                    NewTipo : {
                        required: true,
                        minlength:1
                    },
                }
            });
            myModal(1);
            $('.content_modal3').css('height',380);
        }
    })
}

function NuevoContratoCliente(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url:'dd29e0bc46d368699976f1c71e14da27',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";

            TituloVentana = "Nuevo Contrato "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesRegresar = "myModal(0);ModalEdit(1)"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<br>"
            html += "<form id='FormContratoCliente' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre:</label>"
                            html += "<input type = 'text' class = 'form-control' name = 'NombreContrato' id = 'NombreContrato' />"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Contrato:</label>"
                            html += "<select class = 'form-control' id = 'NewTipo' name = 'NewTipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.TiposContrato.length;i++){
                                        html += "<option value = '"+data.TiposContrato[i]['Hash']+"'>"+data.TiposContrato[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'ValorContrato' id = 'ValorContrato' onkeyup = 'FormatCampoNum(\"ValorContrato\",\"ValorContrato_real\")' class = 'ValorContrato form-control' required />"
                            html += "<span style = 'display:none;' class = 'ValorContrato_real' id = 'ValorContrato_real'>0</span>"
                        html += "</div>"
                        
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Firma:</label>"
                            html += "<input type = 'date' class = 'form-control' name = 'FechaFirmaContrato' id = 'FechaFirmaContrato' />"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Fecha Vencimiento:</label>"
                            html += "<input type = 'date' class = 'form-control' name = 'FechaVencimientoContrato' id = 'FechaVencimientoContrato' />"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Archivo:</label>"
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png, application/pdf' >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarContratoCliente(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#FormContratoCliente").validate({
                rules: {
                    NombreContrato : {
                        required: true,
                        minlength:3
                    },
                    NewTipo : {
                        required: true,
                        minlength:1
                    },
                    ValorContrato : {
                        required: true,
                        minlength:1
                    },
                    FechaFirmaContrato : {
                        required: true,
                        minlength:1
                    },
                    FechaVencimientoContrato : {
                        required: true,
                        minlength:1
                    },
                }
            });
            myModal(1);
            $('.content_modal3').css('height',480);
        }
    })
}

function ListarUnidadesNegocioEmpresa(){
    $.ajax({
        type:'POST',
        url:'3bd98678754093f3968e2893922db5d6',
        data:{Hash:$("#Empresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<option value = '' selected>Seleccione</option>"
            for(var i = 0; i < data.Info.length;i++){
                html += "<option value = '"+data.Info[i]['Hash']+"' >"+data.Info[i]['Nombre']+"</option>"
            }
            $("#Unidad").html(html)
        }
    })
}

function ListarImpuestosEmpresa(){
    $.ajax({
        type:'POST',
        url:'0be4b15c2e512dc6a54f4d229c2ea802',
        data:{Hash:$("#Empresa").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = ''
            html += '<table class = "tableNew" >'
                html += '<tr>'
                    html += '<th>Sel</th>'
                    html += '<th>Tipo</th>'
                    html += '<th>Impuesto / Tarifa</th>'
                html += '</tr>'
            data.Impuestos.forEach(usuario => {
                html += '<tr>'
                    html += '<td class = "CenterText">'
                        html += '<div class="form-check form-check-inline">'
                            html += '<input class="form-check-input ImpuestosCliente" name="ImpuestosEmpresa[]" type="checkbox" value="'+usuario.Hash+'">'
                            html += '<label class="form-check-label" for="ImpuestosEmpresa[]"></label>'
                        html += '</div>'
                    html += '</td>'
                    html += '<td>'+usuario.Tipo+'</td>'
                    html += '<td>'+usuario.Nombre+'</td>'
                html += '</tr>'
            });
            html += '</table>'
            $(".ListaImpuestos").html(html).css({'height':'150', 'overflow-y':'scroll'})
        }
    })
}

function NuevaNegociacionCliente(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url:'f99f7095d5594e740dd7f30ff54bd889',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nueva Negociación "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='FormImpuestoCliente' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>"
                            html += "<select class = 'form-control' id = 'Empresa' name = 'Empresa' required  onchange = 'ListarUnidadesNegocioEmpresa();ListarImpuestosEmpresa()'>";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Empresas.length;i++){
                                        html += "<option value = '"+data.Empresas[i]['Hash']+"'>"+data.Empresas[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Unidad de Negocio:</label>"
                            html += "<select class = 'form-control' id = 'Unidad' name = 'Unidad' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Régimen:</label>"
                            html += "<select class = 'form-control' id = 'NewTipo' name = 'NewTipo' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Tributaria.length;i++){
                                        html += "<option value = '"+data.Tributaria[i]['Hash']+"'>"+data.Tributaria[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        
                        
                    html += "</div>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  ¿Autoretenedor?:</label>"
                            html += "<select class = 'form-control' id = 'Autoretenedor' name = 'Autoretenedor' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    html += "<option value = '1'>Si</option>"
                                    html += "<option value = '0'>No</option>"
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Tipo de Comisión:</label>"
                            html += "<select class = 'form-control' id = 'Comision' name = 'Comision' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Comision.length;i++){
                                        html += "<option value = '"+data.Comision[i]['Hash']+"'>"+data.Comision[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Comisión:</label>"
                            html += "<input type = 'number' class = 'form-control' name = 'ValorComision' id = 'ValorComision'>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Pago a:</label>"
                            html += "<select class = 'form-control' id = 'Pago' name = 'Pago' required >";
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.Dias.length;i++){
                                        html += "<option value = '"+data.Dias[i]['Hash']+"'>"+data.Dias[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                        html += "</div>"
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Impuesto Adicional:</label>"
                            html += "<input type = 'number' class = 'form-control' name = 'ImpuestoAdicional' id = 'ImpuestoAdicional'>"
                        html += "</div>"
                    html += "</div>"
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='parUsuarioDirector'><span class = 'Obligatorio'>(*)</span> Impuestos Presupuesto:</label>";
                            html += "<div class='col-sm-12'>";
                                html += '<div class="form-check">'
                                    html += "<input class='form-check-input' type='checkbox' id='checkTodosProductos' onchange='UsuarioClienteProducto.checkTodosProductos(event)'>"
                                    html += "<label class='form-check-label' >"
                                        html += "Sel. Todo"
                                    html += "</label>"
                                html += "</div>"
                                html += "<hr>"
                                html += "<div class = 'ListaImpuestos' style = 'width:100%;overflow-y:scroll'></div>"
                            html += "</div>";
                            
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNegociacionCliente(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#FormImpuestoCliente").validate({
                rules: {
                    Empresa : {
                        required: true,
                        minlength:1
                    },
                    Unidad : {
                        required: true,
                        minlength:1
                    },
                    NewTipo : {
                        required: true,
                        minlength:1
                    },
                    Autoretenedor : {
                        required: true,
                        minlength:1
                    },
                    Comision : {
                        required: true,
                        minlength:1
                    },
                    Pago : {
                        required: true,
                        minlength:1
                    },
                    ValorComision : {
                        required: true,
                        minlength:1
                    },
                }
            });
            myModal(1);
            //$('.content_modal3').css('height',680);
        }
    })
}

function BuscarNegociacionesCliente(Hash){
    $DataTable_Cliente_Negociaciones.draw();
}

function TablNegociacionesCliente(Hash){
    $DataTable_Cliente_Negociaciones = $("#NegociacionesClientes"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'255513e4741b758f6f3865b351b701e6',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaNC").val();
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
                    if( full.INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR.length > 0 ){
                        var hx = ''
                       if( full.Estado == 1 ){
                            hx += '<span onclick = "EstadoNegociacion(\''+full.Hash+'\')">'
                                hx += '<img src ="images/_activo.png" class = "OptionIcon" />';
                        }else{
                            hx += '<span onclick = "EstadoNegociacion(\''+full.Hash+'\')">'
                                hx += '<img src ="images/_inactivo.png" class = "OptionIcon" />';
                        }
                    }
                    
                    return '<center>' + hx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#NegociacionesClientes'+Hash).css({'width':'100%'})
}
function EstadoNegociacion(Hash){
    $.ajax({
        type:'POST',
        url:'a4d1e79bb9478ac3218579478499dba6',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarNegociacionesCliente()
            if( data.Info == 1 ){
                AlertaMensajes("Estado de la Negociación Modificado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Modificar el Estado de la Negociación","error",3);
            }
        }
    })
}
function GuardarNegociacionCliente(Hash){
    if( $FormValidate.form() == true ){
        var Impuestos = [];
        $(".ImpuestosCliente").each(function(){
            if( $(this).prop('checked') == true ){
                Impuestos.push($(this).val());
            }
        })
        if( Impuestos.length > 0 ){
            var formData = new FormData();
            formData.append("Impuestos", JSON.stringify(Impuestos));
            formData.append("Empresa", $("#Empresa").val());
            formData.append("Unidad", $("#Unidad").val());
            formData.append("NewTipo", $("#NewTipo").val());
            formData.append("Autoretenedor", $("#Autoretenedor").val());
            formData.append("Comision", $("#Comision").val());
            formData.append("Pago", $("#Pago").val());
            formData.append("ValorComision", $("#ValorComision").val());
            formData.append("ImpuestoAdicional", $("#ImpuestoAdicional").val());
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
                url:'22d1051eb149a7fac2fd13e5ce33086e',
                success:function(data){
                    myModal(0);
                    ModalEdit(1);
                    BuscarNegociacionesCliente(Hash)
                    if( data.Info == 1 ){
                        AlertaMensajes("Negociación agregada con éxito","success",3);
                    }else{
                        AlertaMensajes("No se pudo Agregar la Negociación","error",3);
                    }
                }
            })
        }else{
            alert("No se han Seleccionado Impuestos");
        }
    }
}

const UsuarioClienteProducto = {
    checkTodosProductos: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.ImpuestosCliente')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function GuardarDocumentoLegalCliente(Hash){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("NewTipo", $("#NewTipo").val());
                formData.append("Hash", Hash);


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
                    url:'3fc9fee8139688ef57656399bb56bfeb',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarDocumentosLegalesCliente()
                        if( data.Info == 1 ){
                            AlertaMensajes("Documento Agregado con éxito","success",3);
                        }else{
                            AlertaMensajes("No se pudo Agregar el Documento","error",3);
                        }
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function GuardarContratoCliente(Hash){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("NewTipo", $("#NewTipo").val());
                formData.append("NombreContrato", $("#NombreContrato").val());
                formData.append("ValorContrato", $("#ValorContrato_real").text());
                formData.append("FechaFirmaContrato", $("#FechaFirmaContrato").val());
                formData.append("FechaVencimientoContrato", $("#FechaVencimientoContrato").val());
                formData.append("Hash", Hash);


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
                    url:'130ae586d0a98e2acf85df26a8989a1f',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarContratosCliente(Hash)
                        if( data.Info == 1 ){
                            AlertaMensajes("Contrato Agregado con éxito","success",3);
                        }else{
                            AlertaMensajes("No se pudo Agregar el Contrato","error",3);
                        }
                    }
                })
        }else{
            alert("No se han seleccionado Archivos");
        }
    }
}

function InformacionLegalClienteEdicion() {
    let show = $('#OptionIconEdit').data('state') == 1 ? true : false;
    if (show) {
        $('#OptionIconEdit').data('state', 0)
        $("#TituloForm").html("Informacion Legal Cliente");
        $(".FooterInfoLegalCliente").hide();
        $(".FormDatosInformacionLegalCliente .check-empresas").removeClass('d-block');
        $(".FormDatosInformacionLegalCliente .check-empresas").addClass('d-none');
    } else {
        $('#OptionIconEdit').data('state', 1)
        $("#TituloForm").html("Editar Informacion Legal Cliente");
        $(".FooterInfoLegalCliente").show();
        $(".FormDatosInformacionLegalCliente .check-empresas").removeClass('d-none');
        $(".FormDatosInformacionLegalCliente .check-empresas").addClass('d-block');
    }
    $(".FormDatosInformacionLegalCliente input").prop('readonly', show);
    $(".FormDatosInformacionLegalCliente textarea").prop('readonly', show);
    $(".FormDatosInformacionLegalCliente select").prop('disabled', show);
    $(".FormDatosInformacionLegalCliente input").prop('disabled', show);
}

function requiredEmpresaIniciales(e) {
    $('#ParEmpresaIniciales'+e.value).prop('required', e.checked)
    $('#ParEmpresaIniciales'+e.value).prop('readonly', !e.checked)
}

function validacionIndice(e) {
    let indice = e.value
    indice = indice.replaceAll(/[^a-zA-Z]/g,'')
    indice = indice.length > 5 ? indice.slice(0,5) : indice
    e.value = indice
}


/*
-----------------------------------------------------------------------//
---------------- Sub Productos Productos - Cliente -------------------//
---------------------------------------------------------------------//
*/

const SubProductosCliente = {
    Hash: null,
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)

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
                    $('#ModalEdit3').modal('hide')
                    $('#ModalEdit2').modal('show')
                    BuscarTablaSubProductosCliente()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash , route) {
        $.ajax({
            type:'POST',
            url:route,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: {Hash},
            success:function(data){
                if (data.success) {
                    BuscarTablaSubProductosCliente()
                } else {
                    alert('El estado no pudo ser cambiado\n'+data.mensage)
                }
            }
        })
    }
}

function subProductosCliente(Hash) {
    SubProductosCliente.Hash = Hash
    InformacionSubProductosCliente()
}

function BuscarTablaSubProductosCliente(){
    $DataTable_SubProductos_Cliente.destroy();
    $DataTable_SubProductos_Cliente.draw();
    tablaSubProductosCliente();
}

function InformacionSubProductosCliente() {
    var html = "";
    html += "<div class='modal-header panel-heading2'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<img src = '"+UrlUniversal+"images/Datos_subprod.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>SubProductos Cliente</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' onclick=\"$('#ModalEdit2').modal('hide'); $('#ModalEdit').modal('show'); InformacionProductosCliente(); LimpiarModalContent();\" data-dismiss='modal' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'table'>"
            html +="<img src ='images/Datos_nuevsubprod.png' class = 'OptionIcon' onclick=\"$('#ModalEdit2').modal('hide'); crearSubProdcutosCLiente()\" data-toggle='modal' data-target='#ModalEdit3'/>"
            html +="<span class='FirstText Cursor' style='color:#e13735;font-weight: bold;' onclick = 'crearSubProdcutosCLiente()' data-toggle='modal' data-target='#ModalEdit3'>Nuevo SubProducto</span>"
        html +="</div>"

        html +="<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='SPC_Estado'>Estado:</label>"
                    html +="<select class ='form-control' name = 'SPC_Estado' id = 'SPC_Estado'>"
                        html +="<option value = '-1' >Todos</option>"
                        html +="<option value = '1' selected >Activo</option>"
                        html +="<option value = '0'>Inactivo</option>"
                    html +="</select>"
                html +="</div>"
                html += "<div class='col col-sm-3 my-2'>"
                    html +="<label for='SPC_TextBusqueda'>Buscar:</label>"
                    html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'SPC_TextBusqueda' name = 'SPC_TextBusqueda' onkeypress = 'BuscarTablaSubProductosCliente()'/>"
                html +="</div>"
                html +="<div class='col col-sm-3 my-2'>"
                    html +="<p></p>"
                    html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaSubProductosCliente()'/>"
                html +="</div>"
            html +="</div>"
        html += "<table id = 'tablaSubProductosCliente' class='dataTable tableNew'>"
            html += "<thead>"
                html +=  "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Editar</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick=\"$('#ModalEdit2').modal('hide'); $('#ModalEdit').modal('show'); InformacionProductosCliente(); LimpiarModalContent();\" data-dismiss='modal'>Cerrar</button>";
    html += "</div>";
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit2').modal('show');
    tablaSubProductosCliente()
}

function crearSubProdcutosCLiente() {
    $('#ModalEdit2').modal('hide');
    Ruta = 'efd516cc2e14b4887768abfd16fa0009'
    var html = "";
    html += "<div class='modal-header panel-heading2'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<img src = '"+UrlUniversal+"images/Datos_subprod.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Nuevo SubProducto Cliente</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' onclick=\"$('ModalEdit3').modal('hide'); $('ModalEdit2').modal('show'); InformacionSubProductosCliente(); LimpiarModalContent();\" class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='SubProductosCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + SubProductosCliente.Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombre' name='parNombre' placeholder='Nombre del Producto' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' onclick=\"$('ModalEdit3').modal('hide'); $('ModalEdit2').modal('show'); InformacionSubProductosCliente(); LimpiarModalContent();\" class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit3").addClass('modal-dialog-scrollable')
    $(".content_modal33").html(html);
    $("#ModalContentForm33").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit3').modal('show');
    $('#ModalEdit').removeClass('show');

}

function editarSubProductosCliente(Hash, Ruta) {
    $('#ModalEdit2').modal('hide');
    var html = "";
    html += "<div class='modal-header panel-heading2'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<img src = '"+UrlUniversal+"images/editar1.png' class = 'IconVentana' /> <span class = 'TituloBuscador2'>Editar SubProducto Cliente</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' onclick=\"$('ModalEdit3').modal('hide'); $('ModalEdit2').modal('show'); InformacionSubProductosCliente(); LimpiarModalContent();\" class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='SubProductosCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombre' value='"+$("._ContentCSPN_"+Hash).text()+"' name='parNombre' placeholder='Nombre del Producto' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit3").addClass('modal-dialog-scrollable')
    $(".content_modal33").html(html);
    $("#ModalContentForm33").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit3').modal('show');
    $('#ModalEdit').modal('hide');
}

function tablaSubProductosCliente() {
    $DataTable_SubProductos_Cliente = $('#tablaSubProductosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'c13a5535e89649c821fa13bef6a02276',
            'data':function (d) {
                    d.search['value'] = $("#SPC_TextBusqueda").val();
                    d.search['Estadox'] = $("#SPC_Estado").val();
                    d.search['Hash'] = SubProductosCliente.Hash;
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
                    return '<span class = "_ContentCSPN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_CLIENTES_SUBPRODUCTOS_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "SubProductosCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + 'efba9be4d1cf70c2fed732333df940a7'+'\',1)">'
                                    hx += '<img src ="images/_activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "SubProductosCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + 'efba9be4d1cf70c2fed732333df940a7'+'\',0)">'
                                    hx += '<img src ="images/_inactivo.png" class = "OptionIcon" />';
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

                    if( full.INFORMACION_CLIENTES_SUBPRODUCTOS_EDITAR == 1 ){
                        hx += '<img src ="images/editar1.png" class = "OptionIcon" onclick = "$(\'#ModalEdit2\').modal(\'hide\'); $(\'#ModalEdit\').modal(\'hide\'); editarSubProductosCliente(\''+full.Hash+'\',\''+UrlUniversal + '060066e8fdcb112a4cda83b5d1a54464'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#tablaSubProductosCliente').css({'width':'100%'})
}




/*
-----------------------------------------------------------------------//
---------------------- Profesionales Cliente -------------------------//
---------------------------------------------------------------------//
*/

const ProfesionalesCliente = {
    Hash: null,
    enviar: function (e) {
        e.preventDefault()

        let formdata = new FormData(e.target)

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
                    $('#ModalEdit2').modal('hide')
                    BuscarTablaProfesionalesCliente()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    estado: function (Hash , route) {
        $.ajax({
            type:'POST',
            url:route,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: {Hash},
            success:function(data){
                if (data.success) {
                    BuscarTablaProfesionalesCliente()
                } else {
                    alert('El estado no pudo ser cambiado\n'+data.mensage)
                }
            }
        })
    }
}

function profesionalesCliente(Hash) {
    ProfesionalesCliente.Hash = Hash
    $('#ModalEdit2').on('hidden.bs.modal', function (e) {
        InformacionProfesionalesCliente()
        $('#ModalEdit').modal('show');
    })
    InformacionProfesionalesCliente()
}

function BuscarTablaProfesionalesCliente(){
    $DataTable_Profesionales_Cliente.destroy();
    $DataTable_Profesionales_Cliente.draw();
    tablaProfesionalesCliente();
}

function InformacionProfesionalesCliente() {
    var html = "";

    TituloVentana = "Profesionales Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'table'>"
            html +="<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick='crearProfesionalesCLiente()' data-toggle='modal' data-target='#ModalEdit'/>"
            html +="<span class='FirstText Cursor' style='color:#e13735;font-weight: bold;' onclick = 'crearProfesionalesCLiente()' data-toggle='modal' data-target='#ModalEdit'>Nuevo Profesional</span>"
        html +="</div>"

        html +="<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='IdTipoDoc'>Estado:</label>"
                    html +="<select class ='form-control' name = 'PC_Estado' id = 'PC_Estado'>"
                        html +="<option value = '-1' >Todos</option>"
                        html +="<option value = '1' selected >Activo</option>"
                        html +="<option value = '0'>Inactivo</option>"
                    html +="</select>"
                html +="</div>"
                html += "<div class='col col-sm-3 my-2'>"
                    html +="<label for='IdTipoDoc'>Buscar:</label>"
                    html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PC_TextBusqueda' name = 'PC_TextBusqueda' onkeypress = 'BuscarTablaProfesionalesCliente()' />"
                html +="</div>"
                html +="<div class='col col-sm-3 my-2'>"
                    html +="<p></p>"
                    html +="<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaProfesionalesCliente()'/>"
                html +="</div>"
            html +="</div>"
        html += "<table id = 'tablaProfesionalesCliente' class='dataTable tableNew'>"
            html += "<thead>"
                html +=  "<tr>"
                    html += "<th width = '20px'>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Correo</th>"
                    html += "<th>Telefono</th>"
                    html += "<th>Descripcion</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Editar</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
    tablaProfesionalesCliente()
}

function crearProfesionalesCLiente() {
    $('#ModalEdit').modal('hide');
    Ruta = '103c2d9b95b5e96548b8799a739c0ab3'
    var html = "";

    TituloVentana = "Nuevo Profesional Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(1);ModalEdit2(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='ProfesionalesCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + ProfesionalesCliente.Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombre' name='parNombre' placeholder='Nombre del Profesional' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parCorreo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parCorreo' name='parCorreo' placeholder='example@domain.com' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parTelefono' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parTelefono' name='parTelefono' placeholder='000000' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parDescripcion' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripcion:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parDescripcion' name='parDescripcion' placeholder='Lorem Impsum' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit2").addClass('modal-dialog-scrollable')
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit2').modal('show');
    ResizeModal2(0.55)
}

function editarProfesionalesCliente(Hash, ruta) {
    ModalEdit(0)
    ModalEdit2(1)
    Ruta = '43be2eee0cc0a43dfe151d924e8c2eb8'
    var html = "";

    TituloVentana = "Editar Profesional Cliente"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0);ModalEdit2(1)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";


    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='ProfesionalesCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parNombre' value='"+$("._ContentCPFN_"+Hash).text()+"' name='parNombre' placeholder='Nombre del Profesional' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parCorreo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parCorreo' value='"+$("._ContentCPFC_"+Hash).text()+"' name='parCorreo' placeholder='example@domain.com' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parTelefono' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parTelefono' value='"+$("._ContentCPFT_"+Hash).text()+"' name='parTelefono' placeholder='000000' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='parDescripcion' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripcion:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='parDescripcion' value='"+$("._ContentCPFD_"+Hash).text()+"' name='parDescripcion' placeholder='Lorem Impsum' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit2").addClass('modal-dialog-scrollable')
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit2').modal('show');
}

function tablaProfesionalesCliente() {
    $DataTable_Profesionales_Cliente = $('#tablaProfesionalesCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'16b026bebaf650b170971f6a70a344df',
            'data':function (d) {
                    d.search['value'] = $("#PC_TextBusqueda").val();
                    d.search['Estadox'] = $("#PC_Estado").val();
                    d.search['Hash'] = ProfesionalesCliente.Hash;
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
                    return '<span class = "_ContentCPFN_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Correo',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentCPFC_'+full.Hash+'">' + data + '</span>';
                 }

            },
            {
                data: 'Telefono',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentCPFT_'+full.Hash+'">' + data + '</span>';
                 }

            },
            {
                data: 'Descripcion',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentCPFD_'+full.Hash+'">' + data + '</span>';
                 }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.INFORMACION_CLIENTES_PROFESIONALES_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "ProfesionalesCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + 'eee6c4c4d13da7b944aa2368a8ca8568'+'\',1)">'
                                    hx += '<img src ="images/_activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "ProfesionalesCliente.estado(\''+full.Hash+'\',\''+UrlUniversal + 'eee6c4c4d13da7b944aa2368a8ca8568'+'\',0)">'
                                    hx += '<img src ="images/_inactivo.png" class = "OptionIcon" />';
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

                    if( full.INFORMACION_CLIENTES_PROFESIONALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar1.png" class = "OptionIcon" onclick = "editarProfesionalesCliente(\''+full.Hash+'\',\''+UrlUniversal + '7f45ee2ba9d178bb9b41195db5652feb'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#tablaProductosCliente').css({'width':'100%'})
}
