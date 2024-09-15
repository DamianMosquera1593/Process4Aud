
@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    

    <div class = 'table'>
            {{ csrf_field() }}
            @if( session("PRODUCCION_PPTOS_CREAR") === session("keyUser") )
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearPresupuesto()" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearPresupuesto()" data-toggle="modal" data-target="#ModalEdit"> Nuevo Presupuesto </span>
            @endif
        </div>
        <div class = 'form-row'>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Estado:</label>
                <select class ='form-control' name = 'Estado' id = 'Estado'>
                    <option value = '' >Todos</option>
                    @foreach( $datos['Estados'] as $d )
                        <option value = '{{$d->Hash}}' >{{$d->Nombre}}</option>
                    @endforeach
                </select>
            </div>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Empresa:</label>
                <select class ='form-control' name = 'Empresa' id = 'Empresa' onchange = 'Ppto_Blade_ListarUnidadesEmpresaUsuario()'>
                    <option value = '' >Todos</option>
                    @foreach( $datos['Empresas'] as $d )
                        <option value = '{{$d->Hash}}' >{{$d->NombreComercial}}</option>
                    @endforeach
                </select>
            </div>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Unidad:</label>
                <select class ='form-control' name = 'Unidad' id = 'Unidad' onchange = 'Ppto_Blade_ListarClientesUsuarioEmpresaUnidad()'>
                    <option value = '' >Todos</option>
                </select>
            </div>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Cliente:</label>
                <select class ='form-control' name = 'Cliente' id = 'Cliente' onchange = 'Presupuesto_Blade_ListarTiposComision()'>
                    <option value = '' >Todos</option>
                </select>
            </div>
        </div>
        <div class = 'form-row'>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Proyecto:</label>
                <select class ='form-control' name = 'Proyecto' id = 'Proyecto'>
                    <option value = '' >Todos</option>
                </select>
            </div>
            <div class='col col-sm-3 my-2'>
                <label for='IdTipoDoc'>Buscar:</label>
                <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TextBusqueda' name = 'TextBusqueda' />
            </div>
            <div class='col col-sm-3 my-2'>
                <p></p>
                <img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarPptos()'/>
            </div>
        </div>
        <table class="dataTable tableNew Presupuestos" id = 'Presupuestos'>
            <thead>
                <tr>
                    <th >No.</th>
                    <th >No. Ppto</th>
                    <th >Referencia</th>
                    <th >Estado</th>
                    <th >Empresa</th>
                    <th >Unidad</th>
                    <th >Cliente</th>
                    <th >Producto</th>
                    <th >Proyecto / OT</th>
                    <th >Consultar</th>
                </tr>
            </thead>
            
        </table>
    </div>
</div>

<?php echo '<script type="text/javascript" src="'.url("/").'/js/Produccion/presupuestos.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
       $(".FormatNumbers").each(function(){
           $(this).text( formatNumber.new( $(this).text() ));
       })

       $(".TModuloReversa").text("BIENVENIDA")
       $(".TSubmodulo").text(" PRESUSUPUESTOS")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"Inicio")
    });
</script> 
@endsection
