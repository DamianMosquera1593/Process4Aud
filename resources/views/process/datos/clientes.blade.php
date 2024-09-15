@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    <table >
        <tr>
                
        {{ csrf_field() }}
        @if( session("INFORMACION_CLIENTES_CREAR") === session("keyUser") )
                <td>
                    <div class ='ContentSubMolButton'>
                        <table width ='100%' class = 'ContenedorLink'>
                            <tr>
                                <td class = 'CenterText'>
                                    <img src ='images/AGREGAR_ICONO.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="CrearCliente('{{route('ec02ee86950011f017a0633fa4226fb8')}}')" />
                                </td>
                                <td >
                                    <span class="Cursor" onclick = "CrearCliente('{{route('ec02ee86950011f017a0633fa4226fb8')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Cliente </span>
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
                <option value = '-1' >Todos</option>
                <option value = '1' selected >Activo</option>
                <option value = '0'>Inactivo</option>
            </select>
        </div>
        <div class='col col-sm-3 my-2'>
            <label for='C_TextBusqueda'>Buscar:</label>
            <input type = 'text' class = 'form-control' id = 'C_TextBusqueda' name = 'C_TextBusqueda' onkeypress = 'buscarTablaClientes()' />
        </div>
        <div class='col col-sm-3 my-2'>
            <p></p>
            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'buscarTablaClientes()'/>
        </div>
    </div>
    <table id = "TableClientes" class="dataTable tableNew">
        <thead>
            <tr>
                <th width = '20px'>No</th>
                <th width = '50px' nowrap>Nit</th>
                <th nowrap>Nombre Comercial</th>
                <th nowrap>Nombre Legal </th>
                <th>Legal</th>
                <th>Documentos</th>
                <th>Contactos</th>
                <th>Negociaciones</th>
                <th>Profesionales</th>
                <th>Productos</th>
                <th>Estado</th>
            </tr>
        </thead>
    </table>
</div>


<?php echo '<script type="text/javascript" src="js/Datos/clientes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script>
    $(document).ready(function () {
        $(".TModuloReversa").text("DATOS")
       $(".TSubmodulo").text("CLIENTES")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"f712f056a60e6ea60b9195f04d3c4d74")
    });
</script> 
@endsection
