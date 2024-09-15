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
                        DOCUMENTOS LEGALES DE PRODUCTOS
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
        @if( session("PAR_BANCOS_DOCUMENTOS_LEGALES_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearDocLegal('{{route('780e6b1c18a37dab1a188631a98c214e')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDocLegal('{{route('780e6b1c18a37dab1a188631a98c214e')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Documento Legal</span>
            </div>
        @endif
        @if( session("PAR_BANCOS_DOCUMENTOS_LEGALES_CONSULTAR") === session("keyUser") )
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
                        TIPO DE PRODUCTOS
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
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearTipoProductos('{{route('3d75102de30445944e88329404262053')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoProductos('{{route('3d75102de30445944e88329404262053')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Producto</span>
            </div>
        @endif
        @if( session("PAR_BANCOS_TIPO_PRODUCTOS_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TP_Estado' id = 'TP_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TP_TextBusqueda' name = 'TP_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaBanco_TP()'/>
                </div>
            </div>
            <table id = "TablaBancos_TP" class="dataTable tableNew">
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
    @if( session("PAR_BANCOS_TIPO_PRODUCTOS") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_BANCOS_TIPO_MOVIMIENTOS") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        TIPO DE MOVIMIENTOS
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentTIPOPRODUCTOS' onclick = 'ContentList("TIPOPRODUCTOS")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentTIPOPRODUCTOS' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_BANCOS_TIPO_MOVIMIENTOS_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearTipoMovimientos('{{route('5ee378d7683d3cf60fc91433c812fa07')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoMovimientos('{{route('5ee378d7683d3cf60fc91433c812fa07')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Movimiento</span>
            </div>
        @endif

        @if( session("PAR_BANCOS_TIPO_MOVIMIENTOS") === session("keyUser") )
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
                        <th>Nombre</th>
                        <th >Estado</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        @endif
    </div>
    @if( session("PAR_BANCOS_TIPO_MOVIMIENTOS") === session("keyUser") )
        </div>
    <br>
    @endif
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/banco.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Banco");
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
