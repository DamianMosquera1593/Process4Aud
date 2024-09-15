@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>

    @if( session("PAR_INVENTARIO_OFICINA_PROPIETARIO") === session("keyUser") )
        <div class="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Propietario Oficina</p>
        @if( session("PAR_INVENTARIO_OFICINA_PROPIETARIO_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearOficinaPropietario('{{route('711127833da5006e59022d2f15108564')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearOficinaPropietario('{{route('711127833da5006e59022d2f15108564')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Propietario Oficina </span>
            </div>
        @endif

        @if( session("PAR_INVENTARIO_OFICINA_PROPIETARIO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'PR_Estado' id = 'PR_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PR_TextBusqueda' name = 'PR_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaInventario_Propietario()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaInventario_Propietario'>
                <thead>
                    <tr>
                        <th width = '20px'>No.</th>
                        <th>Unidad de Negocio</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                
            </table>
        @endif
    </div>
    @if( session("PAR_INVENTARIO_OFICINA_PROPIETARIO") === session("keyUser") )
        </div>
    <br>
    @endif


    @if( session("PAR_INVENTARIO_PROPIETARIO") === session("keyUser") )
        <div class="ContenedorMenu">
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Propietario Sistemas</p>
        @if( session("PAR_INVENTARIO_PROPIETARIO_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearSistemasPropietario('{{route('b5b6037f6bf35a935246d78534677a91')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSistemasPropietario('{{route('b5b6037f6bf35a935246d78534677a91')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Propietario Sistemas</span>
            </div>
        @endif

        @if( session("PAR_INVENTARIO_PROPIETARIO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'PRS_Estado' id = 'PRS_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'PRS_TextBusqueda' name = 'PRS_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaInventario_PropietarioS()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaInventario_PropietarioS'>
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
    @if( session("PAR_INVENTARIO_PROPIETARIO") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_INVENTARIO_TIPO") === session("keyUser") )
        <div class="ContenedorMenu">
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Tipo Inventario</p>
        @if( session("PAR_INVENTARIO_TIPO_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearSistemasTipo('{{route('48309bd6ea8751e94589096a264dd219')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSistemasTipo('{{route('48309bd6ea8751e94589096a264dd219')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo - Sistemas</span>
            </div>
        @endif

        @if( session("PAR_INVENTARIO_TIPO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TS_Estado' id = 'TS_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TS_TextBusqueda' name = 'TS_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaInventario_TipoSistemas()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaInventario_TipoSistemas'>
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
    @if( session("PAR_INVENTARIO_TIPO") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_INVENTARIO_SISTEMAS_MARCA") === session("keyUser") )
        <div class="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Sistemas -  Marca</p>
        @if( session("PAR_INVENTARIO_SISTEMAS_MARCA_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearSistemasMarca('{{route('c35923a0ba8ff88f55d4926bb7cdd90c')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSistemasMarca('{{route('c35923a0ba8ff88f55d4926bb7cdd90c')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Marca - Sistemas</span>
            </div>
        @endif

        @if( session("PAR_INVENTARIO_SISTEMAS_MARCA_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'M_Estado' id = 'M_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'M_TextBusqueda' name = 'M_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaInventario_Marca()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaInventario_Marca'>
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
        @if( session("PAR_INVENTARIO_SISTEMAS_MARCA") === session("keyUser") )
            </div>
        <br>
        @endif
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/inventario.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Inventario");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("INVENTARIO")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")
    });
</script>
@endsection
