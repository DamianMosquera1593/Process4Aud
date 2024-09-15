@extends('layouts.inicio_process')

@section('content')

<div class = 'ContentPanel'>
    <br>
    {{-- Gestion USUARIO --}}
    @if( session("PAR_ROLES_PERFIL") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        PERFIL
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentPERFIL' onclick = 'ContentList("PERFIL")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentPERFIL' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_ROLES_PERFIL_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = "CrearPerfil('{{route('654c74fda3156c389869f782d354f085')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearPerfil('{{route('654c74fda3156c389869f782d354f085')}}')" data-toggle="modal" data-target="#ModalEdit">Crear Perfil</span>
            </div>
        @endif

        @if( session("PAR_ROLES_PERFIL_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='PefilEstado'>Estado:</label>
                    <select class ='form-control' name = 'PefilEstado' id = 'PefilEstado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='PefilBuscar'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PefilBuscar' name = 'PefilBuscar' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaPerfil()'/>
                </div>
            </div>
            <table id = "TablaPerfil" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th width = '25%'>Estado</th>
                        <th>Permisos Asignados</th>
                        <th>Editar</th>
                    </tr>
                </thead>
            </table>
        @endif
    </div>
    @if( session("PAR_ROLES_PERFIL") === session("keyUser") )
        </div>
    <br>
    @endif

    
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/roles.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Roles");
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
