@extends('layouts.inicio_process')

@section('content')


<div class = 'ContentPanel'>
    <br>
    {{-- Gestion Usuarios --}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            USUARIOS
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO' onclick = 'ContentList("USUARIO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuario('{{route('1555f8ab3aad644b70b52c9fe8149a11')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuario('{{route('1555f8ab3aad644b70b52c9fe8149a11')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Usuario</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioEstado'>Estado:</label>
                        <select class ='form-control' name = 'UsuarioEstado' id = 'UsuarioEstado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscar'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscar' name = 'UsuarioBuscar' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuarios()'/>
                    </div>
                </div>
                <table id = "TablaUsuarios" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre de Usuario</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Perfil</th>
                            <th>TipoUsuario</th>
                            <th width = '25%'>Estado</th>
                            <th>Editar</th>
                            <th>Renovar Contraseña</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Directores--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_DIRECTORES") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISO USUARIOS DIRECTORES
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_DIRECTORES' onclick = 'ContentList("USUARIO_DIRECTORES")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_DIRECTORES' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_DIRECTORES_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioDirectores('{{route('aaa61db16c05337904a5d0a88e0da428')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioDirectores('{{route('aaa61db16c05337904a5d0a88e0da428')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Director</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_DIRECTORES_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarDirectores'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarDirectores' name = 'UsuarioBuscarDirectores' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosDirectores()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosDirectores" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre Usuario</th>
                            <th>Directores</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Empresa--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_EMPRESA") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISO USUARIOS EMPRESA
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_EMPRESA' onclick = 'ContentList("USUARIO_EMPRESA")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_EMPRESA' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_EMPRESA_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioEmpresa('{{route('b29bbd657072b7a07579a31401d563f3')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioEmpresa('{{route('b29bbd657072b7a07579a31401d563f3')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Empresa</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_EMPRESA_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarEmpresa'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarEmpresa' name = 'UsuarioBuscarEmpresa' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosEmpresa()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosEmpresa" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre Empresa</th>
                            <th>Nombre Usuario</th>
                            <th>Nick Usuario</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Unidad de negocio--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_UNIDAD_NEGOCIO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISO USUARIOS UNIDAD DE NEGOCIO
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_UNIDAD_NEGOCIO' onclick = 'ContentList("USUARIO_UNIDAD_NEGOCIO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_UNIDAD_NEGOCIO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_UNIDAD_NEGOCIO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioUnidadNegocio('{{route('e088eff01dc9d12cdc31a19f23860dde')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioUnidadNegocio('{{route('e088eff01dc9d12cdc31a19f23860dde')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Unidad de Negocio</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_UNIDAD_NEGOCIO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarUnidadNegocio'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarUnidadNegocio' name = 'UsuarioBuscarUnidadNegocio' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosUnidadNegocio()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosUnidadNegocio" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Empresa</th>
                            <th>Unidad de Negocio</th>
                            <th>Nombre Usuario</th>
                            <th>Nick Usuario</th>
                            <th>Fecha Asignación</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Cliente Producto--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_CLIENTE_PRODUCTO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISO USUARIOS CLIENTE PRODUCTO
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_CLIENTE_PRODUCTO' onclick = 'ContentList("USUARIO_CLIENTE_PRODUCTO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_CLIENTE_PRODUCTO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_CLIENTE_PRODUCTO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioClienteProducto('{{route('f7395d218880036529243dde732f771e')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioClienteProducto('{{route('f7395d218880036529243dde732f771e')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Cliente Producto</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_CLIENTE_PRODUCTO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarClienteProducto'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarClienteProducto' name = 'UsuarioBuscarClienteProducto' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosClienteProducto()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosClienteProducto" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Empresa</th>
                            <th>Unidad de Negocio</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Nombre Usuario</th>
                            <th>Nick Usuario</th>
                            <th>Fecha Asignación</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>
    {{-- Gestion Permisos Usuarios Cliente Profesional--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_PROFESIONAL_CLIENTE") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISOS USUARIOS PROFESIONAL CLIENTE
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_PROFESIONAL_CLIENTE' onclick = 'ContentList("USUARIO_PROFESIONAL_CLIENTE")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_PROFESIONAL_CLIENTE' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_PROFESIONAL_CLIENTE_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioProfesionalCliente('{{route('dff83a8057100dbf8936c472f2903633')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioProfesionalCliente('{{route('dff83a8057100dbf8936c472f2903633')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Profesional Cliente</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_PROFESIONAL_CLIENTE_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarProfesionalCliente'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarProfesionalCliente' name = 'UsuarioBuscarProfesionalCliente' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosProfesionalCliente()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosProfesionalCliente" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Cliente</th>
                            <th>Profesional</th>
                            <th>Nombre Usuario</th>
                            <th>Nick Usuario</th>
                            <th>Fecha Asignación</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Departamentos--}}
    <div class="ContenedorMenu">
        @if( session("PAR_DEPARTAMENTOS") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISOS DEPARTAMENTOS
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentDEPARTAMENTO' onclick = 'ContentList("DEPARTAMENTO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentDEPARTAMENTO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_DEPARTAMENTOS_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearDepartamento('{{route('651b61798ae6ff5c2fd88b38bb6c2d30')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDepartamento('{{route('651b61798ae6ff5c2fd88b38bb6c2d30')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Departamento</span>
                </div>
            @endif

            @if( session("PAR_DEPARTAMENTOS_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='DepartamentoEstado'>Estado:</label>
                        <select class ='form-control' name = 'DepartamentoEstado' id = 'DepartamentoEstado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='BuscarDepartamentos'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'BuscarDepartamentos' name = 'BuscarDepartamentos' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaDepartamentos()'/>
                    </div>
                </div>
                <table id = "TablaDepartamentos" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Departamento</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Departamentos--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_DEPARTAMENTO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISOS USUARIOS DEPARTAMENTOS
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_DEPARTAMENTO' onclick = 'ContentList("USUARIO_DEPARTAMENTO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_DEPARTAMENTO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_DEPARTAMENTO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioDepartamento('{{route('a58dc5fdab060121ae174bf4c621a4ad')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioDepartamento('{{route('a58dc5fdab060121ae174bf4c621a4ad')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario - Departamento</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_DEPARTAMENTO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarDepartamento'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarDepartamento' name = 'UsuarioBuscarDepartamento' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosDepartamento()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosDepartamento" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Departamento</th>
                            <th>Usuario</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Responsables Departamento--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_RESPONSABLE_DEPARTAMENTO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISOS USUARIOS RESPONSABLES DEPARTAMENTO
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_RESPONSABLE_DEPARTAMENTO' onclick = 'ContentList("USUARIO_RESPONSABLE_DEPARTAMENTO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_RESPONSABLE_DEPARTAMENTO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioResponsableDepartamento('{{route('43750f687cbee2131256ccf02480f265')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioResponsableDepartamento('{{route('43750f687cbee2131256ccf02480f265')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Usuario Responsable Departamento</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarResponsableDepartamento'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarResponsableDepartamento' name = 'UsuarioBuscarResponsableDepartamento' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosResponsableDepartamento()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosResponsablesDepartamento" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Departamento</th>
                            <th>Responsable</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
    <br>

    {{-- Gestion Permisos Usuarios Asignados--}}
    <div class="ContenedorMenu">
        @if( session("PAR_USUARIO_ASIGNADO") === session("keyUser") )
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            PERMISOS ASIGNADOS USUARIO
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentUSUARIO_ASIGNADO' onclick = 'ContentList("USUARIO_ASIGNADO")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        @endif

        <div class = 'ContenedorOptionDiv PARDIV_ContentUSUARIO_ASIGNADO' style ='display:none;' >
            {{ csrf_field() }}
            @if( session("PAR_USUARIO_ASIGNADO_CREAR") === session("keyUser") )
                <div class = 'table'>
                    <img src ='images/additem.png' class = 'OptionIcon'onclick = "CrearUsuarioAsignado('{{route('3d17460ae6e4b551ed208da3f9388655')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearUsuarioAsignado('{{route('3d17460ae6e4b551ed208da3f9388655')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Permiso Asignados Usuario</span>
                </div>
            @endif

            @if( session("PAR_USUARIO_ASIGNADO_CONSULTAR") === session("keyUser") )
                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='AsignadosUsuario'>Usuarios:</label>
                        <select class ='form-control' name = 'AsignadosUsuario' id = 'AsignadosUsuario'>
                            <option value = '-1' >Todos</option>

                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='UsuarioBuscarAsignado'>Buscar:</label>
                        <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'UsuarioBuscarAsignado' name = 'UsuarioBuscarAsignado' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaUsuariosAsignados()'/>
                    </div>
                </div>
                <table id = "TablaUsuariosAsignados" class="dataTable tableNew">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Departamento</th>
                            <th>Usuario Principal</th>
                            <th>Asignados</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                </table>
            @endif
        </div>
    </div>
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/usuario.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<!-- Bootstrap & Core Scripts -->
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <script>
        $(document).ready(function () {
            $(".TituloPantalla").html("Datos - Parametrización - Usuarios");
            $(".alert-primary").css({
                'background-color':'#1B4075',
            })
            $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
                'color':'white'
            })

            $(".ContentPanel").css({
                'height':$("body").height()-100
            })
        });
    </script>
@endsection
