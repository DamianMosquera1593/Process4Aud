@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    @if( session("PAR_CLIENTES_DOCUMENTOS_LEGALES") === session("keyUser") )
        <div class="ContenedorMenu">
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Documentos Legales</p>
        @if( session("PAR_CLIENTES_DOCUMENTOS_LEGALES_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearDocLegal('{{route('61545d2b19509500ecbf29396f9246c2')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDocLegal('{{route('61545d2b19509500ecbf29396f9246c2')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Documento Legal</span>
            </div>
        @endif
        @if( session("PAR_CLIENTES_DOCUMENTOS_LEGALES_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'DC_Estado' id = 'DC_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'DC_TextBusqueda' name = 'DC_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaCliente_DL()'/>
                </div>
            </div>
            <table class="dataTable tableNew" id = 'TablaCliente_DC'>
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
    @if( session("PAR_CLIENTES_DOCUMENTOS_LEGALES") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_CLIENTES_INFORMACION_TRIBUTARIA") === session("keyUser") )
        <div class="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Información Tributaria</p>
        @if( session("PAR_CLIENTES_INFORMACION_TRIBUTARIA_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearInfoTributaria('{{route('9d35372dbcc1116b5442bf20053f3f81')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearInfoTributaria('{{route('9d35372dbcc1116b5442bf20053f3f81')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Información Tributaria</span>
            </div>
        @endif
        @if( session("PAR_CLIENTES_INFORMACION_TRIBUTARIA_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'IT_Estado' id = 'IT_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'IT_TextBusqueda' name = 'IT_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaCliente_IT()'/>
                </div>
            </div>
            <table id = "TablaCliente_IT" class="dataTable tableNew">
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
    @if( session("PAR_CLIENTES_INFORMACION_TRIBUTARIA") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_CLIENTES_MODALIDADES_DE_PAGO") === session("keyUser") )
        <div class="ContenedorMenu">
        
    @endif

    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Modalidades de Pago</p>
        @if( session("PAR_CLIENTES_MODALIDADES_DE_PAGO_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearPagos('{{route('19e6298d7e9ad21056072a6906b20cfe')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearPagos('{{route('19e6298d7e9ad21056072a6906b20cfe')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Modalidad de Pago</span>
            </div>
        @endif
        @if( session("PAR_CLIENTES_MODALIDADES_DE_PAGO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'MP_Estado' id = 'MP_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'MP_TextBusqueda' name = 'MP_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaCliente_MP()'/>
                </div>
            </div>
            <table id = "TablaCliente_MP" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th width = '20px'>No.</th>
                        <th>Nombre</th>
                        <th>Días</th>
                        <th >Estado</th>
                        <th></th>
                    </tr>
                </thead>

            </table>
        @endif
    </div>
    @if( session("PAR_CLIENTES_MODALIDADES_DE_PAGO") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_CLIENTES_TIPOS_DE_CONTRATO") === session("keyUser") )
        <div class="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Tipos de Contrato</p>
        @if( session("PAR_CLIENTES_TIPOS_DE_CONTRATO_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearTipoContrato('{{route('37ad4c21f3ebb7a11a82e8bbc988d26c')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoContrato('{{route('37ad4c21f3ebb7a11a82e8bbc988d26c')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Contrato</span>
            </div>
        @endif

        @if( session("PAR_CLIENTES_TIPOS_DE_CONTRATO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TC_Estado' id = 'TC_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TC_TextBusqueda' name = 'TC_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaCliente_TC()'/>
                </div>
            </div>
            <table id = "TablaCliente_TC" class="dataTable tableNew">
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
    @if( session("PAR_CLIENTES_TIPOS_DE_CONTRATO") === session("keyUser") )
        </div>
    <br>
    @endif
</div>




<?php echo '<script type="text/javascript" src="js/Parametrizacion/cliente.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Cliente");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("CLIENTES")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")
    });
</script>
@endsection
