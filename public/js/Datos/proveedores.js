$(document).ready(function () {
    TablaProveedor()
});

function BuscarTablaProveedores(){
    $DataTable_Proveedores.draw();
}

function TablaProveedor(){
    var Hash2 = document.getElementsByName('_token')[0].value;
    $DataTable_Proveedores = $DataTable_Clientes = $('#Proveedores').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4cc8be199fdafa450a01bfdaca4dc2cc',
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
                    if (full.INFORMACION_PROVEEDORES_LEGAL.length == 1) {
                        var ht = '';
                        ht += '<img src = "images/Datos_legal1.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "InformacionLegalProveedor(\''+full.Hash+'\', \''+Hash2+'\', \''+UrlUniversal + 'eb6c344f43227116eb925eb701ea5ebe'+'\')"/>'
                        return '<center>'+ht+'</center>'
                    }
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (full.INFORMACION_PROVEEDORES_DOCUMENTOS.length == 1) {
                        var ht = '';
                        ht += '<img src = "images/Documentos.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "DocumentosLegalesProveedor(\''+full.Hash+'\')"/>'
                        return '<center>'+ht+'</center>'
                    }
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if( full.INFORMACION_PROVEEDORES_CONTACTOS.length >0 ){
                        var ht = '';
                        ht += '<img src = "images/datos_contactos.png" class = "OptionIcon" data-toggle="modal" onclick = "contactosProveedores(\''+full.Hash+'\', \''+Hash2+'\')" data-target="#ModalEdit"/>'
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
                    if( full.INFORMACION_PROVEEDORES_ESTADO.length == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoProveedor(\''+full.Hash+'\',\''+UrlUniversal + '3a0f33489251c72624ff00c1f711019d'+'\')">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoProveedor(\''+full.Hash+'\',\''+UrlUniversal + '3a0f33489251c72624ff00c1f711019d'+'\')">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
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
    $('#Proveedores').css({'width':'100%'})
}

function CrearProveedor(Ruta){
    $.ajax({
        type:'POST',
        url:'343c3316762934b7e54605cb120e3e80',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Crear Proveedores"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<form class='form-signin' action='"+Ruta+"' method='post'>";
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


                        html += "<div class='col-sm-12'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Actividad(es):</label>";
                            html += "<textarea class='form-control' id='parActividad' name='parActividad' required></textarea>";
                        html += "</div>";

                    html += "</div>";

                    html += "<label for='empresas' aria-describedby='empresas'><span class = 'Obligatorio'>(*)</span> Empresas relacionadas:</label>";
                    html += "<small id='empresas' class='form-text text-muted'>"
                        html+= "Se debe seleccionar almenos una empresa, y se debe indicar sus iniciales de minimo 3 caracteres y maximo 5, solo se permiten letras."
                    html += "</small>"
                    html += "<div class='form-row my-3'>";
                        data.Empresas.forEach(empresa => {
                            html += "<div class='col-sm-4 my-2'>";
                                html += "<div class='form-check'>"
                                    html += "<input class='form-check-input' type='checkbox' name='ParEmpresas[]' value='"+empresa.hash+"' id='empresa"+empresa.hash+"'>"
                                    html += "<label class='form-check-label' for='ParEmpresas[]'>"
                                        html += empresa.NombreLegal
                                    html += "</label>"
                                html += "</div>"
                            html += "</div>"
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

function InformacionLegalProveedor(Hash, Hash2, RutaEdit) {
    let Ruta = 'a0422a096a5a6ae243bee945ea959be6'
    $.ajax({
        type: 'POST',
        url: Ruta,
        data: {Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            let editar = "";
            if( data.PerLegalEdicion.length > 0 ){
                editar = "<img src ='images/editar.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalProveedorEdicion()'/>"
            }
            var html = "";

            TituloVentana = "Informacion Legal Proveedor"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = editar+""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<form class='form-signin FormDatosInformacionLegalProveedor' action='"+RutaEdit+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.Proveedor[0].Hash + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Nit:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Nit+"' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].NombreComercial+"' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-6'>";
                            html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].NombreLegal+"' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i].IdPais+"' "+(data.Proveedor[0].IdPais===data.Paises[i].IdPais ? 'selected' : '')+">"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    html += "<option value = '"+data.Departamento[i].IdDepartamento+"' "+(data.Proveedor[0].IdDepto===data.Departamento[i].IdDepartamento ? 'selected' : '')+">"+data.Departamento[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
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
                            html += "<label for='ParTelefono' ><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Telefono+"' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Dirección:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Proveedor[0].Direccion+"' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-12'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Actividad(es):</label>";
                            if( data.Proveedor[0].Actividad == null ){
                                html += "<textarea class='form-control' id='parActividad' name='parActividad'   required readonly></textarea>";
                            }else{
                                html += "<textarea class='form-control' id='parActividad' name='parActividad'   required readonly>"+data.Proveedor[0].Actividad+"</textarea>";
                            }
                            
                        html += "</div>";

                    html += "</div>";

                    html += "<label for='empresas' aria-describedby='empresas'><span class = 'Obligatorio'>(*)</span> Empresas relacionadas:</label>";
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
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
        }
    })
}

const DatosProveedorContacto = {
    Hash: '',
    Hash2: '',
    sendData: function (e) {
        e.preventDefault()
        let form = e.target
        let formData = new FormData(form);
        let token = document.getElementsByName('_token')[0].value
        $.ajax({
            type: 'POST',
            url: '5d82139bfcf53f9b4ef15c2f48e0557e',
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

function contactosProveedores(Hash, Hash2) {
    DatosProveedorContacto.Hash = Hash
    DatosProveedorContacto.Hash2 = Hash2
    $('#ModalEdit2').on('hidden.bs.modal', function (e) {
        informacionContactosProveedor()
        $('#ModalEdit').modal('show');
    })
    informacionContactosProveedor()
}

function informacionContactosProveedor() {
    $('#ModalEdit2').on('hidden.bs.modal', null)
    $.ajax({
        type:'POST',
        url:'da680e9164960293d98c57b21961dcd9',
        data:{Hash:DatosProveedorContacto.Hash,Hash2:DatosProveedorContacto.Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Información Contactos "+ $(".NameComercial"+DatosProveedorContacto.Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    if( data.INFORMACION_PROVEEDORES_CONTACTOS_CREAR.length > 0 ){
                        html += "<div class = 'table'>";
                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'crearContactoProveedor()' data-toggle='modal' data-target='#ModalEdit2'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearContactoProveedor()' data-toggle='modal' data-target='#ModalEdit2'>Nuevo Contacto</span>";
                        html += "</div>";
                    }
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='IdTipoDoc' col-form-label'>Texto:</label>"
                            html += "<input type = 'text' class = 'form-control' id = 'TextBusqueda' name = 'TextBusqueda' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentosEmpresa()'/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ContactosProveedor"+DatosProveedorContacto.Hash+"' id = 'ContactosProveedor"+DatosProveedorContacto.Hash+"'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th width = '20px'>No.</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Cargo</th>"
                                html += "<th>Celular</th>"
                                html += "<th>Telefono</th>"
                                html += "<th>Correo</th>"
                                html += "<th>Horarios</th>"
                                // html += "<th>Estado</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table></div>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');

            $DataTable = $('#ContactosProveedor'+DatosProveedorContacto.Hash).DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                'ajax': {
                    'url':'c368fa1c46b272b71940f37a56afe6ea',
                    /*'cache': false,
                    'contentType': false,
                    'processData': false,*/
                    'data':function (d) {
                        d.search['value'] = SearchTable;
                        return $.extend({}, d, {
                            'Hash':DatosProveedorContacto.Hash,'Hash2':DatosProveedorContacto.Hash2,'_token':document.getElementsByName('_token')[0].value
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
                            return '<span>' + (data===null ? '---' : data) + '</span>';
                        }

                    },
                   {
                        data: 'Cargo',
                        "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) + '</center>';
                        }
                    },
                   {
                        data: 'Celular',
                        "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) + '</center>';
                        }
                    },
                   {
                       data: 'Telefono',
                       "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) + '</center>';
                        }
                    },
                   {
                       data: 'Correo',
                       "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) + '</center>';
                        }
                   },
                   {
                       data: 'Horario',
                       "render": function (data, type, full, meta) {
                            return '<center>' + (data===null ? '---' : data) +'</center>';
                        }
                   }
                ],
                "order": [[5, "asc"],[4, "desc"]],
                "fnCreatedRow": function (row, data, index) {
                    var color = "";
                    switch (data.Estado) {
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
        }
    });
}

function crearContactoProveedor() {
    $('#ModalEdit').modal('hide');
    var html = "";
    

    TituloVentana = "Crear Contacto Proveedor"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0);ModalEdit(1)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='DatosProveedorContacto.sendData(event)'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + DatosProveedorContacto.Hash + "'>";
        html += "<input type='hidden' name='Hash2' value='" + DatosProveedorContacto.Hash2 + "'>";
            html += "<div class='form-row my-2'>";

                html += "<div class='col-sm-6'>";
                    html += "<label for='ParNombre'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                    html += "<input type='text' class='form-control' id='ParNombre' name='ParNombre' placeholder='Nombre' autocomplete = 'off' required/>";
                html += "</div>";

                html += "<div class='col-sm-6'>";
                    html += "<label for='ParCargo' > Cargo:</label>";
                    html += "<input type='text' class='form-control' id='ParCargo' name='ParCargo' placeholder='Cargo' autocomplete = 'off'/>";
                html += "</div>";
            html += "</div>";

            html += "<div class='form-row my-3'>";
                html += "<div class='col-sm-4'>";
                    html += "<label for='ParCelular' > Celular:</label>";
                    html += "<input type='text' class='form-control' id='ParCelular' name='ParCelular' placeholder='Celular' autocomplete = 'off'/>";
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
            html += "</div>";

        html += "<div class='modal-footer my-4'>";
            
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $("#ModalEdit2").addClass('modal-dialog-scrollable')
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg');
}

function InformacionTarifarioProveedor() {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<h5 class='modal-title' id='exampleModalLabel'>Crear Proveedor</h5>";
        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<button onclick = 'LimpiarModalContent()' type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
        html += "</button>";
    html += "</div>";
    html += "<div class='modal-body'>";
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
}



function EstadoProveedor(Hash,Route){
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
            BuscarTablaProveedores()
            Notificacion(msj,alert);
        }
    });
}

function InformacionLegalProveedorEdicion() {
    let show = $('#OptionIconEdit').data('state') == 1 ? true : false;
    if (show) {
        $('#OptionIconEdit').data('state', 0)
        $("#TituloForm").html("Informacion Legal Proveedor");
        $(".FooterInfoLegalProveedor").hide();
        $(".FormDatosInformacionLegalProveedor .check-empresas").removeClass('d-block');
        $(".FormDatosInformacionLegalProveedor .check-empresas").addClass('d-none');
    } else {
        $('#OptionIconEdit').data('state', 1)
        $("#TituloForm").html("Editar Informacion Legal Proveedor");
        $(".FooterInfoLegalProveedor").show();
        $(".FormDatosInformacionLegalProveedor .check-empresas").removeClass('d-none');
        $(".FormDatosInformacionLegalProveedor .check-empresas").addClass('d-block');
    }
    $(".FormDatosInformacionLegalProveedor input").prop('readonly', show);
    $(".FormDatosInformacionLegalProveedor textarea").prop('readonly', show);
    $(".FormDatosInformacionLegalProveedor select").prop('disabled', show);
    $(".FormDatosInformacionLegalProveedor input").prop('disabled', show);
}

function BuscarDocumentosEmpresa(){
    SearchTable = $("#TextBusqueda").val();
    $DataTable.draw();
    DataTableModel()
}


function DocumentosLegalesProveedor(Hash){
    $.ajax({
        type:'POST',
        url:'15494df889c0708fac74b4f44a14539a',
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
            
                 html += "<div id = 'prov'>";
                    html += "<ul >";
                        html += "<li >"
                            
                            html += "<a href = '#prov-1'><span>Documentos Legales</span></a>"
                        html +="</li>";
                        html += "<li onclick = 'TablaDocumentosLegalesProveedorA(\""+Hash+"\")' >"
                            html += "<a href = '#prov-2'><span>Documentos Adicionales</span></a>"
                        html +="</li>";
                    html += "</ul>"
                    
                    html += "<div id = 'prov-1'>";
                        if( data.INFORMACION_PROVEEDORES_DOCUMENTOS.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'NuevoDocumentoProveedor(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevoDocumentoProveedor(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Documento</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }
                        html += "<div class = 'form-row'>";

                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentos' name = 'TextBusquedaDocumentos' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentoLegalProveedor("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocLegalProveedor"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th width = '20px'>No.</th>"
                                    html += "<th>Tipo</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                    html += "<th>Eliminar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div id = 'prov-2'>";
                        if( data.INFORMACION_PROVEEDORES_DOCUMENTOS.length > 0 ){
                            html += "<div class = 'table'>";
                                html += "<table>";
                                    html += "<tr>"
                                    html += "<td class = 'BotonesSuperiores'>"
                                        html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'NuevoDocumentoProveedorA(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'/>";
                                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'NuevoDocumentoProveedorA(\""+Hash+"\")' data-toggle='modal' data-target='#myModal'>Nuevo Documento</span>";
                                    html += "</td>"
                                    html += "</tr>"
                                html += "</table>";
                            html += "</div>"
                        }
                        html += "<div class = 'form-row'>";

                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='IdTipoDoc'>Texto:</label>"
                                html += "<input type = 'text' class = 'form-control' id = 'TextBusquedaDocumentosA' name = 'TextBusquedaDocumentosA' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDocumentoLegalProveedorA("+Hash+")'/>"
                            html += "</div>"
                        html += "</div><br>";
                        html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable AccesosSis' id = 'DocAdicionalProveedor"+Hash+"'>";
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th width = '20px'>No.</th>"
                                    html += "<th>Nombre</th>"
                                    html += "<th>Registrado Por</th>"
                                    html += "<th>Registrado El</th>"
                                    html += "<th>Descargar</th>"
                                    html += "<th>Eliminar</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                
            
                
                    
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            ResizeModal(0.9)
            MostrarTabsMenu(1)
            $("#prov").tabs()
            TablaDocumentosLegalesProveedor(Hash)
        }
    });
}

function BuscarDocumentoLegalProveedor(Hash){
    $DataTable_Proveedores_DL.draw();
}
function BuscarDocumentoLegalProveedorA(Hash){
    $DataTable_Proveedores_DLA.draw();
}

function TablaDocumentosLegalesProveedor(Hash){
    $DataTable_Proveedores_DL =  $("#DocLegalProveedor"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'b31b3f4221ba18269ce95c7cdfe3e9da',
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../storage/app/datos/Proveedores/'+encodeURIComponent(full.Archivo)+'">';
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
                    if( full.INFORMACION_PROVEEDOR_DOCUMENTOS.length > 0 ){
                       
                    }
                    htmlx += '<img onclick = "EliminarDocumentoLegalProveedor('+data+')" src ="images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocLegalProveedor'+Hash).css({'width':'100%'})
}

function TablaDocumentosLegalesProveedorA(Hash){
    $DataTable_Proveedores_DLA =  $("#DocAdicionalProveedor"+Hash).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'816b3b01f77ecc3b84ed1d6a53c0e562',
            'data':function (d) {
                    d.search['value'] = $("#TextBusquedaDocumentosA").val();
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
                    htmlx += '<center><a target="_blank" data-title="'+full.TipoDocumento+'" href="../storage/app/datos/Proveedores/ARC_/'+full.Hash2+'_'+encodeURIComponent(full.Archivo)+'">';
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
                    if( full.INFORMACION_PROVEEDOR_DOCUMENTOS.length > 0 ){
                       
                    }
                    htmlx += '<img onclick = "EliminarDocumentoLegalProveedorA('+data+')" src ="images/datos_eliminar.png" class = "OptionIcon" data-toggle="modal" data-target="#mymodal"/>'
                    
                    return '<center>' + htmlx+ '</center>';
                }
           },
           
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
        
    });
    $('#DocAdicionalProveedor'+Hash).css({'width':'100%'})
}

function NuevoDocumentoProveedor(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url:'1d80a13f629a30163186913d4c3367f2',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Documento Legal "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit(1)"
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
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDocumentoLegalProveedor(\""+Hash+"\")'>Guardar</button>";
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

function NuevoDocumentoProveedorA(Hash){
    ModalEdit(0);
    $.ajax({
        type:'POST',
        url:'1d80a13f629a30163186913d4c3367f2',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Documento Adicional "+$("._ContentDN_"+Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0);ModalEdit(1)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<br>"
            html += "<form id='FormDocumentoLegalClienteA' method='post' action='javascript:void(0)'>"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Nombre de Documento:</label>"
                            html += "<input type = 'text' name = 'NombreArchivo' id = 'NombreArchivo' class = 'form-control'>"
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
                    
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarDocumentoLegalProveedorA(\""+Hash+"\")'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal3").html(html);
            $FormValidate = $("#FormDocumentoLegalClienteA").validate({
                rules: {
                    NombreArchivo : {
                        required: true,
                        minlength:3
                    },
                }
            });
            myModal(1);
            $('.content_modal3').css('height',380);
        }
    })
}


function EliminarDocumentoLegalProveedor(Hash){
    $.ajax({
        type:'POST',
        url:'5837516f78bf56108199fbd2587ca566',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarDocumentoLegalProveedor()()
            if( data.Info == 1 ){
                AlertaMensajes("Documento Eliminado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Eliinar el Documento","error",3);
            }
        }
    })
}

function EliminarDocumentoLegalProveedorA(Hash){
    $.ajax({
        type:'POST',
        url:'b43e5b2ae12f8b4ad0a490bd8b75ad9e',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarDocumentoLegalProveedorA(Hash)
            if( data.Info == 1 ){
                AlertaMensajes("Documento Eliminado con éxito","success",3);
            }else{
                AlertaMensajes("No se pudo Eliinar el Documento","error",3);
            }
        }
    })
}

function GuardarDocumentoLegalProveedor(Hash){
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
                    url:'a0c619f1a5f0f0ff82a2fc84b8015667',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarDocumentoLegalProveedor()
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

function GuardarDocumentoLegalProveedorA(Hash){
    if( $FormValidate.form() == true ){
        if( $("#ParLogo").val().length > 0 ){
            var formData = new FormData();
                formData.append("NombreArchivo", $("#NombreArchivo").val());
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
                    url:'57ae55442e0ee1d28719c7a183e99faa',
                    success:function(data){
                        myModal(0);
                        ModalEdit(1);
                        BuscarDocumentoLegalProveedorA(Hash)
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