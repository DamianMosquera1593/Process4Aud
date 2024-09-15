@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>

    @if (session("PAR_PPTO_GENERAL_PERIODICIDAD") === session("keyUser"))
        <div class="ContenedorMenu">
        
        @endif
        <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Periodicidades</p>
        @if (session("PAR_PPTO_GENERAL_PERIODICIDAD_CREAR") === session("keyUser"))
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearPeriodicidad('{{route('52bce3f27f57ac94d528ecb89efb6d01')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearPeriodicidad('{{route('52bce3f27f57ac94d528ecb89efb6d01')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Periodicidad</span>
                {{-- <i class = "fa fa-plus-square" onclick = "CrearPeriodicidad('{{route('52bce3f27f57ac94d528ecb89efb6d01')}}')" data-toggle="modal" data-target="#ModalEdit">Crear</i> --}}
            </div>
        @endif

        @if (session("PAR_PPTO_GENERAL_PERIODICIDAD_CONSULTAR") === session("keyUser"))
            <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'PER_Estado' id = 'PER_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'PER_TextBusqueda' name = 'PER_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPpto_Periodicidad()'/>
                    </div>
                </div><table class="dataTable tableNew" id='TablaPpto_Periodicidad'>
                <thead>
                    <tr>
                        <th width = '20px'>No.</th>
                        <th>Nombre</th>
                        <th >Estado</th>
                        <th></th>
                    </tr>
                </thead>
                
            </table>
        @endif
    </div>
</div>


<?php echo '<script type="text/javascript" src="js/Parametrizacion/pptogeneral.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Presupuesto General");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("PRESUPUESTO GENERAL")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")
    });
</script>
@endsection
