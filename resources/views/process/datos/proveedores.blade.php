@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>

    <table >
        <tr>
                
        {{ csrf_field() }}
        @if( session("INFORMACION_PROVEEDORES_CREAR") === session("keyUser") )
                <td>
                    <div class ='ContentSubMolButton'>
                        <table width ='100%' class = 'ContenedorLink'>
                            <tr>
                                <td class = 'CenterText'>
                                    <img src ='images/AGREGAR_ICONO.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="CrearProveedor('{{route('725547f90cf73ae242d8a6e824a8cdf2')}}')" />
                                </td>
                                <td >
                                    <span class="Cursor" onclick = "CrearProveedor('{{route('725547f90cf73ae242d8a6e824a8cdf2')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Proveedor </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
        @endif
        </tr>
    </table>
    <div class = 'form-row'>
        <div class='col col-sm-3 my-2'>
            <label for='C_Estado'>Estado:</label>
            <select class ='form-control' name = 'C_Estado' id = 'C_Estado'>
                <option value = '1' selected >Activo</option>
                <option value = '0'>Inactivo</option>
            </select>
        </div>
        <div class='col col-sm-3 my-2'>
            <label for='C_TextBusqueda'>Buscar:</label>
            <input type = 'text' class = 'form-control' id = 'C_TextBusqueda' name = 'C_TextBusqueda' />
        </div>
        <div class='col col-sm-3 my-2'>
            <p></p>
            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaProveedores()'/>
        </div>
    </div>
    <table id = "Proveedores" class="dataTable tableNew">
        <thead>
            <tr>
                <th width = '20px'>No.</th>
                <th width = '120px' nowrap>Nit</th>
                <th nowrap>Nombre Comercial</th>
                <th nowrap>Nombre Legal </th>
                <th nowrap>Legal</th>
                <th nowrap>Documentos</th>
                <th nowrap>Contactos</th>
                <th nowrap>Estado</th>
            </tr>
        </thead>
    </table>
</div>



<?php echo '<script type="text/javascript" src="js/Datos/proveedores.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TModuloReversa").text("DATOS")
       $(".TSubmodulo").text("PROVEEDORES")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"f712f056a60e6ea60b9195f04d3c4d74")
    });
</script> 
@endsection
