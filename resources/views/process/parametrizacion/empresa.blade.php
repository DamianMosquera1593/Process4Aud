@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    @if( session("PAR_EMPRESA_DOCUMENTOS_LEGALES") === session("keyUser") )
        <div class ="ContenedorMenu">
            
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Documentos Legales</p>
                @if( session("PAR_EMPRESA_DOCUMENTOS_LEGALES_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearDocLegal('{{route('372a9fb35805ac143ddaa06fb3a8e54a')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDocLegal('{{route('372a9fb35805ac143ddaa06fb3a8e54a')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Documento Legal</span>
                </div>
                @endif

                @if( session("PAR_EMPRESA_DOCUMENTOS_LEGALES_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Estado:</label>
                            <select class ='form-control' name = 'TipoDoc_Estado' id = 'TipoDoc_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'TipoDoc_TextBusqueda' name = 'TipoDoc_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTipoDocumentoEmpresa()'/>
                        </div>
                    </div>
                    <table id = "TableDocLegales" class="tableNew dataTable">
                        <thead>
                            <tr>
                                <th width = '20px'>No.</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                @endif
            </div>
        </div>
        <br>
    @endif
    
    @if( session("PAR_EMPRESA_TARIFAS_IMPUESTOS") === session("keyUser") )
        <div class ="ContenedorMenu">
            
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Tarifas e Impuestos</p>
                @if( session("PAR_EMPRESA_TARIFAS_IMPUESTOS_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearImpuesto('{{route('8d64539e242c9f227474c8b1623dcc27')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearImpuesto('{{route('8d64539e242c9f227474c8b1623dcc27')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Tarifa / Impuesto</span>
                </div>
                @endif

                @if( session("PAR_EMPRESA_TARIFAS_IMPUESTOS_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Estado:</label>
                            <select class ='form-control' name = 'TI_Estado' id = 'TI_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'TI_TextBusqueda' name = 'TI_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTarifasImpuestosEmpresa()'/>
                        </div>
                    </div>
                    <table id = "TablaTarifasImpuestos" class="tableNew dataTable">
                        <thead>
                            <tr>
                                <th width = '20px'>No.</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                @endif
            </div>
        </div>
        <br>   
    @endif
</div>


<?php echo '<script type="text/javascript" src = "js/Parametrizacion/empresa.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Empresa");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("EMPRESAS")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")
    });
</script>
@endsection