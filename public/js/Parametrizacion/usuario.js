$(document).ready(function () {
    ContentList("USUARIO");
    ContentList("USUARIO_EMPRESA");
    ContentList("USUARIO_UNIDAD_NEGOCIO");
    ContentList("USUARIO_CLIENTE_PRODUCTO");
    ContentList("USUARIO_PROFESIONAL_CLIENTE");
    ContentList("USUARIO_DIRECTORES");
    ContentList("USUARIO_DEPARTAMENTO");
    ContentList("USUARIO_RESPONSABLE_DEPARTAMENTO");
    ContentList("DEPARTAMENTO");
    ContentList("USUARIO_ASIGNADO");
    TablaUsuarios();
    TablaUsuariosEmpresa();
    TablaUsuariosUnidadNegocio();
    TablaUsuariosClienteProducto();
    TablaUsuariosProfesionalCliente();
    TablaUsuariosDirectores();
    TablaDepartamentos();
    TablaUsuariosDepartamentos();
    TablaUsuariosResponsablesDepartamentos();
    TablaUsuariosAsignados();
    AsignadosUsuario.listaUsuariosBuscar();
});

function BuscarTablaUsuarios(){
    $DataTable_Usuarios.destroy();
    $DataTable_Usuarios.draw();
    TablaUsuarios();
}

function TablaUsuarios(){
    $DataTable_Usuarios = $('#TablaUsuarios').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'5b8644fe47a908cc9e1a51208435b712',
            'data':function (d) {
                    d.search['value'] = $("#UsuarioBuscar").val();
                    d.search['Estadox'] = $("#UsuarioEstado").val();
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
               data: 'Usuario',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                 }

            },
            {
                data: 'Correo',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data) + '</span>';
                 }

            },
            {
                data: 'perfil',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                 }

            },
            {
                data: 'tipoUsuario',
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
                    if( full.PAR_USUARIO_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoUsuario(\''+full.Hash+'\',\''+UrlUniversal + 'c3e3296d0160a193322bc1c8f36826f3'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoUsuario(\''+full.Hash+'\',\''+UrlUniversal + 'c3e3296d0160a193322bc1c8f36826f3'+'\',0)">'
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

                    if( full.PAR_USUARIO_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataUsuario(\''+full.Hash+'\',\''+UrlUniversal + 'fdd2189c990da29d1d8a6094632b3061'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

                    }
                    return '<center>'+hx+'</center>';
                }
            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';

                    if( full.PAR_USUARIO_EDITAR_PASSWORD == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataUsuarioPassword(\''+full.Hash+'\',\''+UrlUniversal + 'd93c8a1882c2ccf56811ea1b1c213cbd'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'

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
    $('#TablaUsuarios').css({'width':'100%'})
}

function CrearUsuario(Ruta){
    $.ajax({
        type:'POST',
        url:'22e05679cdd86fb8a40ad7bd39a5aafc',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Usuario</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuarios)' action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='parUsuario' name='parUsuario' placeholder='Nombre de Usuario' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombres:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='parNombre' name='parNombre' placeholder='Nombres y Apellidos' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parCorreo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='email' class='form-control' id='parCorreo' name='parCorreo' placeholder='example@email.com' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parClave' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Contraseña:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='password' class='form-control' id='parClave' name='parClave' placeholder='' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parPerfil' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Perfil:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'parPerfil' id='parPerfil' class='form-control' required>";
                                html += "<option selected>Seleccione</option>";
                                data.perfiles.forEach(perfil => {
                                    html += "<option value = '"+perfil['IdPerfil']+"'>"+perfil['Nombre']+"</option>";
                                });
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parTipoUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Usuario:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'parTipoUsuario' id='parTipoUsuario' class='form-control' onchange = 'ListarEmpleados()' required>";
                                html += "<option selected>Seleccione</option>";
                                data.tipoUsuario.forEach(tipo => {
                                    html += "<option value = '"+tipo['Id']+"'>"+tipo['Nombre']+"</option>";
                                });
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parTipoUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'></span> Empleado:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'ParEmpleado' id='ParEmpleado' class='form-control' >";
                                html += "<option value = '0' selected>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
        }
    })
}

function ListarEmpleados(){
    if( $("#parTipoUsuario").val() == '123400' ){
        $.ajax({
            type:'POST',
            url:'e22307191e73517599afb28028eccae3',
            data:{ _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "<option value = ''>Seleccione</option>"
                for(var i = 0; i < data.Empleados.length; i++){
                    html += "<option value = '"+data.Empleados[i]['Id']+"'>"+data.Empleados[i]['NombreCompleto']+"</option>";
                }
                $("#ParEmpleado").html(html)
            }
        })
    }
}

function DataUsuario(Hash,Ruta){
    $.ajax({
        type:'POST',
        url:'f9ec83ca71cfa45f0fc580e6cb0b49bd',
        data:{Hash, _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Usuario</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuarios)' action='"+Ruta+"' method='post' enctype='multipart/form-data'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' value='"+data.usuario.Usuario+"' class='form-control' id='parUsuario' name='parUsuario' placeholder='Nombre de Usuario' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombres:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' value='"+data.usuario.NombreUsuario+"' class='form-control' id='parNombre' name='parNombre' placeholder='Nombres y Apellidos' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parCorreo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Correo:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='email' value='"+data.usuario.Correo+"' class='form-control' id='parCorreo' name='parCorreo' placeholder='example@email.com' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Clave:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' value='' class='form-control' id='parClave' name='parClave' placeholder='Clave' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";
                     html += "<div class='form-group row'>";
                        html += "<label for='parPerfil' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Perfil:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'parPerfil' id='parPerfil' class='form-control' required>";
                                html += "<option selected>Seleccione</option>";
                                data.perfiles.forEach(perfil => {
                                    let seleccion = ''
                                    if (perfil['IdPerfil']===data.usuario['IdPerfil']) {
                                        seleccion = 'selected'
                                    }
                                    html += "<option value = '"+perfil['IdPerfil']+"' "+seleccion+">"+perfil['Nombre']+"</option>";
                                });
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<label for='parTipoUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Usuario:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select name = 'parTipoUsuario' id='parTipoUsuario' class='form-control' required>";
                                html += "<option selected>Seleccione</option>";
                                data.tiposUsuario.forEach(tipo => {
                                    let seleccion = ''
                                    if (tipo['Id']===data.usuario['IdTipoUsuario']) {
                                        seleccion = 'selected'
                                    }
                                    html += "<option value = '"+tipo['Id']+"' "+seleccion+">"+tipo['Nombre']+"</option>";
                                });
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Foto Usuario:</label>";
                            html += "<div class='custom-file'>"
                                html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png'  />"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione Foto</label>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
        }
    })
}


function DataUsuarioPassword(Hash, Ruta) {
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Renovar Contraseña Usuario</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuarios)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='Hash' value='" + Hash + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='parClave' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Contraseña:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='password' class='form-control' id='parClave' name='parClave' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}

function EstadoUsuario(Hash,Route){
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
            BuscarTablaUsuarios()
        }
    });
}

/*
------------------------------------------------------------------------------//
---------------------- Usario Directores ---------------------------------------//
----------------------------------------------------------------------------//
*/

function BuscarTablaUsuariosDirectores(){
    $DataTable_UsuariosDirectores.destroy();
    $DataTable_UsuariosDirectores.draw();
    TablaUsuariosDirectores();
}

function BuscarTablaDirectoresUsuario() {
    $DataTable_DirectoresUsuario.destroy();
    $DataTable_DirectoresUsuario.draw();
    TablaUsuariosDirectores();
}

const UsuarioDirectores = {
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
                    BuscarTablaDirectoresUsuario()
                } else {
                    alert('El Perfil no fue agregado\n'+data.mensage)
                }
            }
        })
    },
    remover: function (Hash, route) {
        console.log(Hash);
        $.ajax({
            type:'POST',
            url:route,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            },
            data: {Hash},
            success:function(data){
                if (data.success) {
                    $('#ModalEdit').modal('hide')
                    BuscarTablaDirectoresUsuario()
                } else {
                    console.log(data);
                    alert('La relacion no fue removido exitosamente\n'+data.mensage)
                }
            }
        })
    }
}

function TablaUsuariosDirectores(){
    $DataTable_UsuariosDirectores = $('#TablaUsuariosDirectores').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'78c261fecfd1cd1204708f77d555920d',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarDirectores").val();
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
               data: 'Usuario',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.HashUsuario+'">' + data + '</span>';
                }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_USUARIO_DIRECTORES_EDITAR == 1 ){
                        hx += '<span onclick = "ListaDirectoresUsuario(\''+full.HashUsuario+'\',\''+UrlUniversal + 'cfca4f55bf0c2d5b2a5bf441517b699b'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.HashUsuario+'">'+hx+'</span></center>';
                }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_USUARIO_DIRECTORES_REMOVER == 1 ){
                        hx += '<span onclick = "UsuarioEmpresa.remover(\''+full.HashUsuario+'\',\''+UrlUniversal + 'cfca4f55bf0c2d5b2a5bf441517b699b'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.HashUsuario+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosDirectores').css({'width':'100%'})
}

function TablaUsuariosDirectoresUsuario(Hash){
    $DataTable_DirectoresUsuario = $('#tablaDirectoresUsuario').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'5a16d51a93e9675d61821e71562e973d',
            'data':function (d) {
                d.search['Hash'] = Hash;
                d.search['value'] = $("#UsuarioBuscarDirectores").val();
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
               data: 'NombreUsuario',
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
                    if( full.PAR_USUARIO_DIRECTORES_REMOVER_DIRECTOR == 1 ){
                        hx += '<span onclick = "UsuarioEmpresa.remover(\''+full.Hash+'\',\''+UrlUniversal + '5f600fc1a96767fef66e47102f899277'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#tablaDirectoresUsuario').css({'width':'100%'})
}

function CrearUsuarioDirectores(Ruta){
    $.ajax({
        type:'POST',
        url:'419a6811a79ff03f81d37fda779d5910',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Directores</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosDirectores)' action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<div class='form-group row'>";
                    html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<select name = 'parUsuario' id='parUsuario' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            data.usuarios.forEach(usuario => {
                                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                            });
                        html += "</select>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='parUsuarioDirector' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario Director:</label>";
                    html += "<div class='col-sm-8'>";
                        html += '<div class="form-check">'
                            html += '<input class="form-check-input" type="checkbox" id="checkTodosProductos" onchange="UsuarioClienteProducto.checkTodosProductos(event)">'
                            html += '<label class="form-check-label" >'
                                html += 'Sel. Todo'
                            html += '</label>'
                        html += '</div>'
                        html += '<hr>'
                        data.usuarios.forEach(usuario => {
                            html += '<div class="form-check form-check-inline">'
                                html += '<input class="form-check-input productos-cliente" name="parUsuarioDirector[]" type="checkbox" value="'+usuario.IdUsuario+'">'
                                html += '<label class="form-check-label" for="parUsuarioDirector[]">'+usuario.Usuario+'</label>'
                            html += '</div>'
                        });
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
        }
    })
}

function AgregarUsuarioDirector(Hash, Ruta){
    $.ajax({
        type:'POST',
        url:'419a6811a79ff03f81d37fda779d5910',
        data:{Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Empresa</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' onclick=\"$('#ModalEdit2').modal('hide'); $('#ModalEdit').modal('show');\" class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaDirectoresUsuario)' action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<div class='form-group row'>";
                    html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<select name = 'parUsuario' id='parUsuario' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            data.usuarios.forEach(usuario => {
                                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                            });
                        html += "</select>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' onclick=\"$('#ModalEdit2').modal('hide'); $('#ModalEdit').modal('show');\" class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal2").html(html);
            $('#ModalEdit2').modal('show')

        }
    })
}

function ListaDirectoresUsuario(Hash) {
    var html = "";
    html += "<div class='modal-header'>";
        html += "<h5 class='modal-title' id='exampleModalLabel'>Productos</h5>";
        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<button onclick = 'LimpiarModalContent()' type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
        html += "</button>";
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'table'>"
            html +="<img src ='images/datos_additem.png' class = 'OptionIcon' onclick=\"$('#ModalEdit').modal('hide'); AgregarUsuarioDirector('"+Hash+"');\" data-toggle='modal' data-target='#ModalEdit'/>"
            html +="<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AgregarUsuarioDirector(\'"+Hash+"\'); $(\'#ModalEdit\').modal( \'hide\');' data-toggle='modal' data-target='#ModalEdit'>Agregar Director</span>"
        html +="</div>"

        html +="<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html +="<label for='IdTipoDoc'>Buscar:</label>"
                html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PC_TextBusqueda' name = 'PC_TextBusqueda' />"
            html +="</div>"
            html +="<div class='col col-sm-3 my-2'>"
                html +="<p></p>"
                html +="<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaDirectoresUsuario()'/>"
            html +="</div>"
        html += "<table id = 'tablaDirectoresUsuario' class='dataTable tableNew'>"
            html += "<thead>"
                html +=  "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                    html += "<th>Remover</th>"
                html += "</tr>"
            html += "</thead>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-xl').addClass('modal-lg');
    $('#ModalEdit').modal('show')
    TablaUsuariosDirectoresUsuario(Hash)
}


/*
------------------------------------------------------------------------------//
---------------------- Usario Empresa ---------------------------------------//
----------------------------------------------------------------------------//
*/

function BuscarTablaUsuariosEmpresa(){
    $DataTable_UsuariosEmpresa.destroy();
    $DataTable_UsuariosEmpresa.draw();
    TablaUsuariosEmpresa();
}

const UsuarioEmpresa = {
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosEmpresa()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    }
}

function TablaUsuariosEmpresa(){
    $DataTable_UsuariosEmpresa = $('#TablaUsuariosEmpresa').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'dbbe809db10de4c7a4739b09f1a8be02',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarEmpresa").val();
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
            data: 'NombreComercial',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
           {
               data: 'Usuario',
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
                    if( full.PAR_USUARIO_EMPRESA_REMOVER == 1 ){
                        hx += '<span onclick = "UsuarioEmpresa.remover(\''+full.Hash+'\',\''+UrlUniversal + 'cfca4f55bf0c2d5b2a5bf441517b699b'+'\')">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosEmpresa').css({'width':'100%'})
}

function CrearUsuarioEmpresa(Ruta){
    $.ajax({
        type:'POST',
        url:'419a6811a79ff03f81d37fda779d5910',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            console.log(data);
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Empresa</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosEmpresa)' action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<div class='form-group row'>";
                    html += "<label for='parEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<select name = 'parEmpresa' id='parEmpresa' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            data.empresas.forEach(empresa => {
                                html += "<option value = '"+empresa['IdEmpresa']+"'>"+empresa['NombreComercial']+"</option>";
                            });
                        html += "</select>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='form-group row'>";
                    html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
                    html += "<div class='col-sm-8'>";
                        html += "<select name = 'parUsuario' id='parUsuario' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                            data.usuarios.forEach(usuario => {
                                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                            });
                        html += "</select>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
        }
    })
}

/*
------------------------------------------------------------------------------//
---------------------- Usario Unidad Negocio --------------------------------//
----------------------------------------------------------------------------//
*/

function BuscarTablaUsuariosUnidadNegocio(){
    $DataTable_UsuariosUnidadNegocio.destroy();
    $DataTable_UsuariosUnidadNegocio.draw();
    TablaUsuariosUnidadNegocio();
}

const UsuarioUnidadNegocio = {
    listaUsuarios: function (data) {
        console.log(data);
        html = '<option value="" selected>Seleccione</option>'
        data.usuarios.forEach(usuario => {
            html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
        });
        $('#parUsuario').html(html)
    },
    listaEmpresas: function (e) {
        const HashUsuario = e.target.value
        const data = {HashUsuario}
        printDataAjax('1b0d400350384cc620ad56ba285c1fe6', data, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(empresa => {
                html += "<option value = '"+empresa['IdEmpresa']+"'>"+empresa['Nombre']+"</option>"
            });
            $('#parEmpresa').html(html)
        })
    },
    listaUnidadNegocio: function (e) {
        const HashEmpresa = e.target.value
        const HashUsuario = $('#parUsuario').val()
        const data = {HashEmpresa, HashUsuario}
        printDataAjax('d253fac6d4551a09c7c8e032ef8f10e3', data, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.unidades.forEach(unidad => {
                html += "<option value = '"+unidad['IdUnidad']+"'>"+unidad['Nombre']+"</option>"
            });
            $('#parUnidadNegocio').html(html)
        })
    },
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosUnidadNegocio()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    }
}

function TablaUsuariosUnidadNegocio(){
    $DataTable_UsuariosUnidadNegocio = $('#TablaUsuariosUnidadNegocio').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'f79b89f1915396f6512fa79e03461041',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarUnidadNegocio").val();
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
            data: 'NombreComercial',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'NombreUnidadNegocio',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NickUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
           {
               data: 'FechaAsignacion',
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
                    if( full.PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER == 1 ){
                        hx += '<span onclick = "UsuarioUnidadNegocio.remover(\''+full.Hash+'\',\''+UrlUniversal + '61e758abff4661243040c45d90715136'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosUnidadNegocio').css({'width':'100%'})
}

function CrearUsuarioUnidadNegocio(Ruta){

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Unidad De Negocio</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosUnidadNegocio)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' onchange=UsuarioUnidadNegocio.listaEmpresas(event) class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parEmpresa' id='parEmpresa' onchange=UsuarioUnidadNegocio.listaUnidadNegocio(event) class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.empresas.forEach(empresa => {
                    //     html += "<option value = '"+empresa['IdEmpresa']+"'>"+empresa['NombreComercial']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Unidad De Negocio:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUnidadNegocio' id='parUnidadNegocio' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);

    printDataAjax('4116ccdccad0e1daf09b692acdaa4e5b', {}, UsuarioUnidadNegocio.listaUsuarios)
}

/*
------------------------------------------------------------------------------//
---------------------- Usario Cliente Producto ------------------------------//
----------------------------------------------------------------------------//
*/

function BuscarTablaUsuariosClienteProducto(){
    $DataTable_UsuariosClienteProducto.destroy();
    $DataTable_UsuariosClienteProducto.draw();
    TablaUsuariosClienteProducto();
}

const UsuarioClienteProducto = {
    listaUsuarios: function (e) {
        printDataAjax('eed6ecfa687e785a71a3b1c415731854', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
            });
            $('#parUsuario').html(html)
        })
    },
    listaEmpresas: function (e) {
        const data = {HashUsuario: e.target.value}
        printDataAjax('2f69625ad17040ab364db7083f95cf90', data, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(empresa => {
                html += "<option value = '"+empresa['IdEmpresa']+"'>"+empresa['Nombre']+"</option>"
            });
            $('#parEmpresa').html(html)
        })
    },
    listaUnidadNegocio: function (e) {
        const HashEmpresa = e.target.value
        const HashUsuario = $('#parUsuario').val()
        const data = {HashEmpresa, HashUsuario}
        printDataAjax('108c16a6c63ca721181a6919e62b360d', data, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.unidades.forEach(unidad => {
                html += "<option value = '"+unidad['IdUnidad']+"'>"+unidad['Nombre']+"</option>"
            });
            $('#parUnidadNegocio').html(html)
        })
    },
    listaClientes: function (e) {
        const data = {HashEmpresa: e.target.value}
        printDataAjax('90a2a6e4e383bb99f296617e293068cf', data, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.clientes.forEach(cliente => {
                html += "<option value = '"+cliente['IdCliente']+"'>"+cliente['NombreComercial']+"</option>"
            });
            $('#parCliente').html(html)
        })
    },
    listaProductos: function (e) {
        const HashCliente = e.target.value
        const HashUsuario = $('#parUsuario').val()
        const data = {HashCliente, HashUsuario, HashEmpresa:$("#parEmpresa").val(),HashUnidad:$("#parUnidadNegocio").val()}
        printDataAjax('06b02d2daa85b17173b582087f46d61d', data, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosProductos" onchange="UsuarioClienteProducto.checkTodosProductos(event)">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.productos.forEach(producto => {
                html += '<div class="form-check form-check-inline">'
                    html += '<input class="form-check-input productos-cliente" name="parProductos[]" type="checkbox" value="'+producto.Id+'">'
                    html += '<label class="form-check-label" for="parProductos[]">'+producto.Nombre+'</label>'
                html += '</div>'
            });
            $('#ParProductos').html(html)
        })
    },
    remover: function (Hash, route) {
        const data = {Hash}
        printDataAjax(route, data, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosClienteProducto()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    checkTodosProductos: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.productos-cliente')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function TablaUsuariosClienteProducto(){
    $DataTable_UsuariosClienteProducto = $('#TablaUsuariosClienteProducto').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'8705a86e2948a84ca649525e9bade3ec',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarClienteProducto").val();
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
            data: 'NombreEmpresa',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentNARL_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'NombreUnidadNegocio',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NombreCliente',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NombreProducto',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NickUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },

           {
               data: 'FechaAsignacion',
               "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentNARL_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER == 1 ){
                        hx += '<span onclick = "UsuarioClienteProducto.remover(\''+full.Hash+'\',\''+UrlUniversal + '9b917e093ababee9f2d598dd4735da62'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosClienteProducto').css({'width':'100%'})
}

function CrearUsuarioClienteProducto(Ruta){
    UsuarioClienteProducto.listaUsuarios()

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Cliente Producto</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosClienteProducto)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' onchange=UsuarioClienteProducto.listaEmpresas(event) class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parEmpresa' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parEmpresa' id='parEmpresa' onchange='UsuarioClienteProducto.listaUnidadNegocio(event); UsuarioClienteProducto.listaClientes(event)' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.empresas.forEach(empresa => {
                    //     html += "<option value = '"+empresa['IdEmpresa']+"'>"+empresa['NombreComercial']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parUnidadNegocio' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Unidad De Negocio:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUnidadNegocio' id='parUnidadNegocio' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='parCliente' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parCliente' id='parCliente' onchange=UsuarioClienteProducto.listaProductos(event) class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parProductos' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Productos de cliente:</label>";
            html += "<div id='ParProductos' class='col-sm-8'>";
            //     html += '<div class="form-check form-check-inline">'
            //         html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
            //         html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
            //     html += '</div>'
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}

/*
------------------------------------------------------------------------------//
---------------------- Usario Cliente Profesional ------------------------------//
----------------------------------------------------------------------------//
*/

function BuscarTablaUsuariosProfesionalCliente(){
    $DataTable_UsuariosProfesionalCliente.destroy();
    $DataTable_UsuariosProfesionalCliente.draw();
    TablaUsuariosProfesionalCliente();
}

const UsuarioProfesionalCliente = {
    listaUsuarios: function (e) {
        printDataAjax('459247889a7f2365b3348ff85895edba', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
            });
            $('#parUsuario').html(html)
        })
    },
    listaClientes: function (e) {
        printDataAjax('3deef6085db1a0b1abd40c6e92b19c7e', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.clientes.forEach(cliente => {
                html += "<option value = '"+cliente['IdCliente']+"'>"+cliente['NombreComercial']+"</option>"
            });
            $('#parCliente').html(html)
        })
    },
    listaProfesionales: function (e) {
        const HashCliente = e.target.value
        const HashUsuario = $('#parUsuario').val()
        const data = {HashCliente, HashUsuario}
        printDataAjax('acc6168636942bb045e10ab7f335e1cf', data, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosProfesionales" onchange="UsuarioProfesionalCliente.checkTodosProfesionales(event)">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.profesionales.forEach(profesional => {
                html += '<div class="form-check form-check-inline">'
                    html += '<input class="form-check-input profesionales-cliente" name="parProfesionales[]" type="checkbox" value="'+profesional.IdProfesionalesCliente+'">'
                    html += '<label class="form-check-label" for="parProfesionales[]">'+profesional.Nombre+'</label>'
                html += '</div>'
            });
            $('#ParProfesional').html(html)
        })
    },
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosProfesionalCliente()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    checkTodosProfesionales: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.profesionales-cliente')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function TablaUsuariosProfesionalCliente(){
    $DataTable_UsuariosProfesionalCliente = $('#TablaUsuariosProfesionalCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'33dece9eeabe8e98872355516ac8d891',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarProfesionalCliente").val();
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
                data: 'Cliente',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'Profesional',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'NickUsuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },

           {
               data: 'FechaAsignacion',
               "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentNARL_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER == 1 ){
                        hx += '<span onclick = "UsuarioProfesionalCliente.remover(\''+full.Hash+'\',\''+UrlUniversal + '7e41145aa48edb3bb1438119f6a04e39'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosProfesionalCliente').css({'width':'100%'})
}

function CrearUsuarioProfesionalCliente(Ruta){

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario - Cliente Producto</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosProfesionalCliente)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='parCliente' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parCliente' id='parCliente' onchange=UsuarioProfesionalCliente.listaProfesionales(event) class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='parProfesional' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Profesionales:</label>";
            html += "<div id='ParProfesional' class='col-sm-8'>";
            //     html += '<div class="form-check form-check-inline">'
            //         html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
            //         html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
            //     html += '</div>'
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    UsuarioProfesionalCliente.listaUsuarios()
    UsuarioProfesionalCliente.listaClientes()
}

/*
------------------------------------------------------------------------------//
----------------------------- Departamentos ---------------------------------//
----------------------------------------------------------------------------//
*/
const Departamento = {
    estado: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaDepartamentos()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    }
}

function BuscarTablaDepartamentos(){
    $DataTable_Departamentos.destroy();
    $DataTable_Departamentos.draw();
    TablaDepartamentos();
}

function TablaDepartamentos() {
    $DataTable_Departamentos = $('#TablaDepartamentos').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'7493e1510790698a5bd63db664a457bb',
            'data':function (d) {
                d.search['value'] = $("#BuscarDepartamentos").val();
                d.search['Estadox'] = $("#DepartamentoEstado").val();
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
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_DEPARTAMENTOS_ESTADO == 1 ){

                            if( full.Estado == 1 ){
                                hx += '<span onclick = "Departamento.estado(\''+full.Hash+'\',\''+UrlUniversal + 'ba35413d13397aba30871a0dc89ffe28'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "Departamento.estado(\''+full.Hash+'\',\''+UrlUniversal + 'ba35413d13397aba30871a0dc89ffe28'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }

                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaDepartamentos').css({'width':'100%'})
}

function CrearDepartamento(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Departamento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaDepartamentos)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parDepartamento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Departamento:</label>";
            html += "<input type='text' id='parDepartamento' name='parDepartamento' class='form-control col-sm-8' placeholder='Departamento' >"
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}
/*
------------------------------------------------------------------------------//
------------------------ Usarios Departamentos ------------------------------//
----------------------------------------------------------------------------//
*/
const UsuariosDepartamento = {

    listaUsuarios: function (e) {
        printDataAjax('8ad9e7d699f4369c0e743cb6ca35cc10', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
            });
            $('#parUsuario').html(html)
        })
    },
    listaDepartamentos: function (e) {
        const Hash = e.target.value
        printDataAjax('7c065bd4443f2b9a655456db15e5936a', {Hash}, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosProductos" onchange="UsuariosDepartamento.checkTodos(event)">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.departamentos.forEach(departamento => {
                html += '<div class="form-check form-check-inline">'
                    html += '<input class="form-check-input departamentos-usuario" name="parDepartamentos[]" type="checkbox" value="'+departamento.Id+'">'
                    html += '<label class="form-check-label" for="parDepartamentos[]">'+departamento.Nombre+'</label>'
                html += '</div>'
            });
            $('#parDepartamentosU').html(html)
        })
    },
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, () => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosDepartamento()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    checkTodos: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.departamentos-usuario')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function BuscarTablaUsuariosDepartamento(){
    $DataTable_UsuariosDepartamentos.destroy();
    $DataTable_UsuariosDepartamentos.draw();
    TablaUsuariosDepartamentos();
}

function TablaUsuariosDepartamentos() {
    $DataTable_UsuariosDepartamentos = $('#TablaUsuariosDepartamento').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'7405ff14fbe27bf97752c2af45cfc1ba',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarDepartamento").val();
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
                data: 'Departamento',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'Usuario',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_USUARIO_DEPARTAMENTO_REMOVER == 1 ){
                        hx += '<span onclick = "UsuariosDepartamento.remover(\''+full.Hash+'\',\''+UrlUniversal + '679f578d6540402c72d6e52c7209790b'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosDepartamento').css({'width':'100%'})
}

function CrearUsuarioDepartamento(Ruta){
    UsuariosDepartamento.listaUsuarios()

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario Departamento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosDepartamento)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' onchange='UsuariosDepartamento.listaDepartamentos(event)' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='parDepartamentos' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
            html += "<div id='parDepartamentosU' class='col-sm-8'>";
            //     html += '<div class="form-check form-check-inline">'
            //         html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
            //         html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
            //     html += '</div>'
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}
/*
------------------------------------------------------------------------------//
---------------------- Responsables Departamento ----------------------------//
----------------------------------------------------------------------------//
*/
const ResponsablesDepartamento = {
    listaUsuarios: function (e) {
        printDataAjax('f287b15940c57cc2e92756185a857780', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
            });
            $('#parUsuario').html(html)
        })
    },
    listaDepartamentos: function (e) {
        const Hash = e.target.value
        printDataAjax('24c37faf929cd7cdb65a654597f1239a', {Hash}, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosProductos" onchange="ResponsablesDepartamento.checkTodos(event)">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.departamentos.forEach(departamento => {
                html += '<div class="form-check form-check-inline">'
                    html += '<input class="form-check-input departamentos-responsable" name="parDepartamentos[]" type="checkbox" value="'+departamento.Id+'">'
                    html += '<label class="form-check-label" for="parDepartamentos[]">'+departamento.Nombre+'</label>'
                html += '</div>'
            });
            $('#ParDepartamentosR').html(html)
        })
    },
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosResponsableDepartamento()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    checkTodos: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.departamentos-responsable')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function BuscarTablaUsuariosResponsableDepartamento(){
    $DataTable_ResponsablesDepartamentos.destroy();
    $DataTable_ResponsablesDepartamentos.draw();
    TablaUsuariosResponsablesDepartamentos();
}

function TablaUsuariosResponsablesDepartamentos() {
    $DataTable_ResponsablesDepartamentos = $('#TablaUsuariosResponsablesDepartamento').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'be932aeddc38361177e8ffb8158bf429',
            'data':function (d) {
                d.search['value'] = $("#UsuarioBuscarProfesionalCliente").val();
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
                data: 'Departamento',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
            {
                data: 'Responsable',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }

            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    console.log(full);
                    var hx = '';
                    if( full.PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER == 1 ){
                        hx += '<span onclick = "ResponsablesDepartamento.remover(\''+full.Hash+'\',\''+UrlUniversal + 'cc01d0a70f71f7c03516569e87b2313b'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosResponsablesDepartamento').css({'width':'100%'})
}

function CrearUsuarioResponsableDepartamento(Ruta){
    ResponsablesDepartamento.listaUsuarios()

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Usuario Responsable Departamentos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosResponsableDepartamento)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' onchange='ResponsablesDepartamento.listaDepartamentos(event)' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='ParDepartamentos' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
            html += "<div id='ParDepartamentosR' class='col-sm-8'>";
            //     html += '<div class="form-check form-check-inline">'
            //         html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
            //         html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
            //     html += '</div>'
            html += "</div>";
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}

/*
------------------------------------------------------------------------------//
-------------------------- Asignados Usuario --------------------------------//
----------------------------------------------------------------------------//
*/
const AsignadosUsuario = {
    listaUsuarios: function (e) {
        printDataAjax('b826ea5a05c8f6324c8b89604f3b6781', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>"
            });
            $('#parUsuario').html(html)
        })
    },
    listaDepartamentos: function (e) {
        printDataAjax('477ed388160b9a6d8a018362e2103ca0', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.departamentos.forEach(departamento => {
                html += "<option value = '"+departamento['Id']+"'>"+departamento['Nombre']+"</option>"
            });
            $('#parDepartamento').html(html)
        })
    },
    listaUsuariosBuscar: function (e) {
        printDataAjax('5637d9d72a015ed42079e7b74e736ade', {}, data => {
            console.log(data);
            html = '<option value="-1" selected>Todos</option>'
            data.usuarios.forEach(usuario => {
                html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['NombreUsuario']+"</option>"
            });
            $('#AsignadosUsuario').html(html)
        })
    },
    listaAsignados: function () {
        const idUsuario = $('#parUsuario').val()
        const idDepartamento = $('#parDepartamento').val()
        if (idUsuario === '' || idDepartamento === '') {
            return
        }
        const data = {HashUsuario:idUsuario, HashDepartamento:idDepartamento}
        printDataAjax('78b74c2a9598df315ab342b16df29c29', data, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosProductos" onchange="AsignadosUsuario.checkTodos(event)">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.Asignados.forEach(asignado => {
                html += '<div class="form-check form-check-inline">'
                    html += '<input class="form-check-input asignados" name="parAsignados[]" type="checkbox" value="'+asignado.IdUsuario+'">'
                    html += '<label class="form-check-label" for="parAsignados[]">'+asignado.Usuario+'</label>'
                html += '</div>'
            });
            $('#parAsignados').html(html)
        })
    },
    remover: function (Hash, route) {
        printDataAjax(route, {Hash}, data => {
            $('#ModalEdit').modal('hide')
            BuscarTablaUsuariosAsignados()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    checkTodos: function (e) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.asignados')
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function BuscarTablaUsuariosAsignados(){
    $DataTable_Asignados.destroy();
    $DataTable_Asignados.draw();
    TablaUsuariosAsignados();
    AsignadosUsuario.listaUsuariosBuscar();
}

function TablaUsuariosAsignados() {
    $DataTable_Asignados = $('#TablaUsuariosAsignados').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'14c8fccec3f602542538211b8f3d2af9',
            'data':function (d) {
                d.search['usuario'] = $('#AsignadosUsuario').val()
                d.search['value'] = $("#UsuarioBuscarAsignado").val();
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
                data: 'Departamento',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }
            },
            {
                data: 'UsuarioP',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }
            },
            {
                data: 'Asignado',
                "render": function (data, type, full, meta) {
                     return '<span class = "_ContentNARL_'+full.Hash+'">' + (data === null ? '---' : data)  + '</span>';
                 }
            },
           {
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    console.log(full);
                    var hx = '';
                    if( full.PAR_USUARIO_ASIGNADO_REMOVER == 1 ){
                        hx += '<span onclick = "AsignadosUsuario.remover(\''+full.Hash+'\',\''+UrlUniversal + '1618155af321a3be34f87347457fc773'+'\',1)">'
                        hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaUsuariosAsignados').css({'width':'100%'})
}

function CrearUsuarioAsignado(Ruta){
    AsignadosUsuario.listaUsuarios()
    AsignadosUsuario.listaDepartamentos()

    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Permiso Asignados Usuario</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='sendForm(event, BuscarTablaUsuariosAsignados)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<div class='form-group row'>";
            html += "<label for='parUsuario' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Usuario:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parUsuario' id='parUsuario' onchange='AsignadosUsuario.listaAsignados()' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='parDepartamento' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento:</label>";
            html += "<div class='col-sm-8'>";
                html += "<select name = 'parDepartamento' id='parDepartamento' onchange='AsignadosUsuario.listaAsignados()' class='form-control' required>";
                    html += "<option value='' selected>Seleccione</option>";
                    // data.usuarios.forEach(usuario => {
                    //     html += "<option value = '"+usuario['IdUsuario']+"'>"+usuario['Usuario']+"</option>";
                    // });
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='ParAsignados' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
            html += "<div id='parAsignados' class='col-sm-8'>";
            //     html += '<div class="form-check form-check-inline">'
            //         html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
            //         html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
            //     html += '</div>'
            html += "</div>";
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
}
