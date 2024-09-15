$(document).ready(function () {
    //TablaProveedor()
});

function CrearBanco(Ruta){
    $.ajax({
        type:'POST',
        url:'867c2ca63281b99c41e464387364a423',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            
            TituloVentana = "Crear Banco"
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

function InformacionLegalBanco(Hash, Hash2, RutaEdit) {
    let Ruta = 'b091e3abd79ae2fafae652eabd8132af'
    $.ajax({
        type: 'POST',
        url: Ruta,
        data: {Hash, Hash2, _token:document.getElementsByName('_token')[0].value},
        success: function (data) {
            let editar = "";
            if( data.PerLegalEdicion.length > 0 ){
                editar = "<img src ='images/editar.png' data-state='0' data-ruta='"+Ruta+"' data-hash='"+Hash+"' data-hash2='"+Hash2+"' id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalBancoEdicion()'/>"
            }
            var html = "";
            

            TituloVentana = "Informacion Legal Banco"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = editar+""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<div class='modal-body'>";
                html += "<form class='form-signin FormDatosInformacionLegalBanco' action='"+RutaEdit+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + data.Banco[0].Hash + "'>";
                    html += "<div class='form-row my-2'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Nit:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Banco[0].Nit+"' id='ParNit' name='ParNit' placeholder='Nit' autocomplete = 'off' required readonly/>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreComercial'><span class = 'Obligatorio'>(*)</span> Nombre Comercial:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Banco[0].NombreComercial+"' id='ParNombreComercial' name='ParNombreComercial' placeholder='Nombre Comercial' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParNombreLegal' ><span class = 'Obligatorio'>(*)</span> Nombre Legal:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Banco[0].NombreLegal+"' id='ParNombreLegal' name='ParNombreLegal' placeholder='Nombre Legal' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParGeneralPais' ><span class = 'Obligatorio'>(*)</span> País:</label>";
                            html += "<select name = 'ParGeneralPais' id='ParGeneralPais' onchange = 'ListarDepartamentosPais(\"ParGeneralDepartamento\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Paises.length;i++){
                                  html += "<option value = '"+data.Paises[i].IdPais+"' "+(data.Banco[0].IdPais===data.Paises[i].IdPais ? 'selected' : '')+">"+data.Paises[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParDepartamentoEmpresa' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
                            html += "<select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento' onchange = 'ListarCiudadesDepartamento(\"ParGeneralCiudad\")'  class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Departamento.length;i++){
                                    html += "<option value = '"+data.Departamento[i].IdDepartamento+"' "+(data.Banco[0].IdDepto===data.Departamento[i].IdDepartamento ? 'selected' : '')+">"+data.Departamento[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParCiudadEmpresa' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>";
                            html += "<select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required disabled>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.Ciudad.length;i++){
                                    html += "<option value = '"+data.Ciudad[i].IdCiudad+"' "+(data.Banco[0].IdCiudad===data.Ciudad[i].IdCiudad ? 'selected' : '')+">"+data.Ciudad[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-row my-3'>";

                        html += "<div class='col-sm-4'>";
                            html += "<label for='ParTelefono' ><span class = 'Obligatorio'>(*)</span> Telefono:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Banco[0].Telefono+"' id='ParTelefono' name='ParTelefono' placeholder='Telefono' autocomplete = 'off' required readonly/>";
                        html += "</div>";

                        html += "<div class='col-sm-8'>";
                            html += "<label for='ParDireccion' ><span class = 'Obligatorio'>(*)</span> Dirección:</label>";
                            html += "<input type='text' class='form-control' value='"+data.Banco[0].Direccion+"' id='ParDireccion' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' required readonly/>";
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

                html += "<div class='modal-footer FooterInfoLegalBanco' style = 'display:none;'>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
        }
    })
}

const DatosBancoContacto = {
    Hash: '',
    Hash2: '',
    sendData: function (e) {
        e.preventDefault()
        let form = e.target
        let formData = new FormData(form);
        let token = document.getElementsByName('_token')[0].value
        $.ajax({
            type: 'POST',
            url: '819103a492160c879b310f7b4322f546',
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

function contactosBancos(Hash, Hash2) {
    DatosBancoContacto.Hash = Hash
    DatosBancoContacto.Hash2 = Hash2
    $('#ModalEdit2').on('hidden.bs.modal', function (e) {
        informacionContactosBanco()
        $('#ModalEdit').modal('show');
    })
    informacionContactosBanco()
}

function informacionContactosBanco() {
    $('#ModalEdit2').on('hidden.bs.modal', null)
    $.ajax({
        type:'POST',
        url:'179a3aa54798ab4f8cdb08baed1b5e31',
        data:{Hash:DatosBancoContacto.Hash,Hash2:DatosBancoContacto.Hash2,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            TituloVentana = "Información Contactos "+ $(".NameComercial"+DatosBancoContacto.Hash).text()
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    if( data.INFORMACION_BANCOS_CONTACTOS_CREAR.length > 0 ){
                        html += "<div class = 'table'>";
                            html += "<img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'crearContactoBanco()' data-toggle='modal' data-target='#ModalEdit2'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearContactoBanco()' data-toggle='modal' data-target='#ModalEdit2'>Nuevo Contacto</span>";
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

                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ContactosBanco"+DatosBancoContacto.Hash+"' id = 'ContactosBanco"+DatosBancoContacto.Hash+"'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
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

            $DataTable = $('#ContactosBanco'+DatosBancoContacto.Hash).DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                'ajax': {
                    'url':'16d02d0282bf554c1953a31a7b147eaf',
                    /*'cache': false,
                    'contentType': false,
                    'processData': false,*/
                    'data':function (d) {
                        d.search['value'] = SearchTable;
                        return $.extend({}, d, {
                            'Hash':DatosBancoContacto.Hash,'Hash2':DatosBancoContacto.Hash2,'_token':document.getElementsByName('_token')[0].value
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

function crearContactoBanco() {
    var html = "";
    ModalEdit(0)
    TituloVentana = "Crear Contacto Banco"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0);ModalEdit(1)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='DatosBancoContacto.sendData(event)'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + DatosBancoContacto.Hash + "'>";
        html += "<input type='hidden' name='Hash2' value='" + DatosBancoContacto.Hash2 + "'>";
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

function InformacionTarifarioBanco() {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<h5 class='modal-title' id='exampleModalLabel'>Crear Banco</h5>";
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



function EstadoBanco(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.success == 1 ){
                alert = "alert-success";
                location.reload()
                msj = "Se ha cambiado el estado de manera correcta";
            }
            Notificacion(msj,alert);
        }
    });
}

function InformacionLegalBancoEdicion() {
    let show = $('#OptionIconEdit').data('state') == 1 ? true : false;
    if (show) {
        $('#OptionIconEdit').data('state', 0)
        $("#TituloForm").html("Informacion Legal Banco");
        $(".FooterInfoLegalBanco").hide();
        $(".FormDatosInformacionLegalBanco .check-empresas").removeClass('d-block');
        $(".FormDatosInformacionLegalBanco .check-empresas").addClass('d-none');
    } else {
        $('#OptionIconEdit').data('state', 1)
        $("#TituloForm").html("Editar Informacion Legal Banco");
        $(".FooterInfoLegalBanco").show();
        $(".FormDatosInformacionLegalBanco .check-empresas").removeClass('d-none');
        $(".FormDatosInformacionLegalBanco .check-empresas").addClass('d-block');
    }
    $(".FormDatosInformacionLegalBanco input").prop('readonly', show);
    $(".FormDatosInformacionLegalBanco textarea").prop('readonly', show);
    $(".FormDatosInformacionLegalBanco select").prop('disabled', show);
    $(".FormDatosInformacionLegalBanco input").prop('disabled', show);
}

function BuscarDocumentosEmpresa(){
    SearchTable = $("#TextBusqueda").val();
    $DataTable.draw();
    DataTableModel();
}
