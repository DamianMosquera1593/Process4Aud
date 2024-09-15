@extends('layouts.inicio_process')

@section('content')



<div class = 'ContentPanel'>
    <br>
    @if( session("PAR_BANCOS_DOCUMENTOS_LEGALES") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        ACTIVIDADES HORAS HOMBRE
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentDOCLEGAL' onclick = 'ContentList("DOCLEGAL")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentDOCLEGAL' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_HORAS_HOMBRE") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearDocLegal('{{route('a80cd987d797e2e17ea5fbea10dbf6c8')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDocLegal('{{route('a80cd987d797e2e17ea5fbea10dbf6c8')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Actividad</span>
            </div>
        @endif
        @if( session("PAR_HORAS_HOMBRE") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'DL_Estado' id = 'DL_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DL_TextBusqueda' name = 'DL_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaBanco_DL()'/>
                </div>
            </div>
            <table id = "TablaBancos_DL" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th >Estado</th>
                        <th></th>
                    </tr>
                </thead>
                
            </table>
        @endif
    </div>
    @if( session("PAR_BANCOS_DOCUMENTOS_LEGALES") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_BANCOS_TIPO_PRODUCTOS") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        ACTIVIDADES HORAS HOMBRE ASOCIADAS A DEPARTAMENTOS DE TRÁFICO
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentTIPOMOVIMIENTOS' onclick = 'ContentList("TIPOMOVIMIENTOS")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentTIPOMOVIMIENTOS' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_BANCOS_TIPO_PRODUCTOS_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "AddActividadDepartamentoTrafico('{{route('fe5e053c865cfe1756856993fe509e04')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "AddActividadDepartamentoTrafico('{{route('fe5e053c865cfe1756856993fe509e04')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Asociación Departamento - Producto</span>
            </div>
        @endif
        @if( session("PAR_BANCOS_TIPO_PRODUCTOS_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TM_Estado' id = 'TM_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TM_TextBusqueda' name = 'TM_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaBanco_TM()'/>
                </div>
            </div>
            <table id = "TablaBancos_TM" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Departamento</th>
                        <th>Tipo de Actividad</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                
            </table>
        @endif
    </div>
    @if( session("PAR_BANCOS_TIPO_PRODUCTOS") === session("keyUser") )
        </div>
    <br>
    @endif

    
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/horashombre.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Horas Hombre");
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
