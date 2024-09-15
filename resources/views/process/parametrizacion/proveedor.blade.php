@extends('layouts.inicio_process')

@section('content')


<div class = 'ContentPanel'>
    <br>
    @if( session("PAR_PROVEEDORES_DOCUMENTOS_LEGALES") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        DOCUMENTOS LEGALES
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
        @if( session("PAR_PROVEEDORES_DOCUMENTOS_LEGALES_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearDocLegal('{{route('d9a3fce60e951e4044c90cffcc84bff8')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDocLegal('{{route('d9a3fce60e951e4044c90cffcc84bff8')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Documento Legal</span>
            </div>
        @endif
        @if( session("PAR_PROVEEDORES_DOCUMENTOS_LEGALES_CONSULTAR") === session("keyUser") )
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
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaProveedor_DL()'/>
                </div>
            </div>
            <table id = "TablaProveedor_DL" class="dataTable tableNew">
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
    @if( session("PAR_PROVEEDORES_DOCUMENTOS_LEGALES") === session("keyUser") )
        </div>
    <br>
    @endif
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/proveedor.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Proveedor");
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
