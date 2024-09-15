@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    @if( session("PAR_PERSONAL_TIPOS_DOCUMENTOS") === session("keyUser") )
    <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Tipo Documentos Legales</p>
        {{ csrf_field() }}
        @if( session("PAR_PERSONAL_TIPOS_DOCUMENTOS_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearTipoDocumento('{{route('ac44f9496a1c29129fd7c59279c61dee')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoDocumento('{{route('ac44f9496a1c29129fd7c59279c61dee')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Documento</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_TIPOS_DOCUMENTOS_CONSULTAR") === session("keyUser") )
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
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalTD()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaPersonal_TP'>
                <thead>
                    <tr>
                        <th width = '20px'>No.</th>
                        <th>Nombre</th>
                        <th>Siglas</th>
                        <th >Estado</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        @endif
    </div>
    @if( session("PAR_PERSONAL_TIPOS_DOCUMENTOS") === session("keyUser") )
        </div>
    <br>
    @endif
  
    
    @if( session("PAR_PERSONAL_EPS") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Eps</p>
        {{ csrf_field() }}
        @if( session("PAR_PERSONAL_EPS_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearEps('{{route('0b189c754f77a0cb7d2b5b69f7ddce5a')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearEps('{{route('0b189c754f77a0cb7d2b5b69f7ddce5a')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Eps</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_EPS_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'Eps_Estado' id = 'Eps_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'Eps_TextBusqueda' name = 'Eps_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalEps()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaPersonal_Eps'>
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
    @if( session("PAR_PERSONAL_EPS") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_ARL") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">ARL</p>
        @if( session("PAR_PERSONAL_ARL_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearArl('{{route('7e6f2c6bf4f1cf7a7c177962e126c398')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearArl('{{route('7e6f2c6bf4f1cf7a7c177962e126c398')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Arl</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_ARL_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'Arl_Estado' id = 'Arl_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'Arl_TextBusqueda' name = 'Arl_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalArl()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaPersonal_Arl'>
                <thead>
                    <tr>
                        <th  width = '20px'>No.</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>

            </table>
        @endif
    </div>
    @if( session("PAR_PERSONAL_ARL") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_FONDO_CESANTIAS") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Fondo Cesantías</p>
        @if( session("PAR_PERSONAL_FONDO_CESANTIAS_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearFC('{{route('ae54a5bbbda596afc7fd49f705b21c70')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearFC('{{route('ae54a5bbbda596afc7fd49f705b21c70')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Fondo de Cesantías</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_FONDO_CESANTIAS_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'FC_Estado' id = 'FC_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'FC_TextBusqueda' name = 'FC_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalFC()'/>
                </div>
            </div>
            <table class="tableNew dataTable" id = 'TablaPersonal_FC'>
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
    @if( session("PAR_PERSONAL_FONDO_CESANTIAS") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_FONDO_PENSIONES") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Fondo de Pensiones</p>
        @if( session("PAR_PERSONAL_FONDO_PENSIONES_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearFP('{{route('d060be146d1b798ff6f50c50cc60c8c8')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearFP('{{route('d060be146d1b798ff6f50c50cc60c8c8')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Fondo de Pensiones</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_FONDO_PENSIONES_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'FP_Estado' id = 'FP_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'FP_TextBusqueda' name = 'FP_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalFP()'/>
                </div>
            </div>
            <table  class="tableNew dataTable" id = 'TablaPersonal_FP'>
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
    @if( session("PAR_PERSONAL_FONDO_PENSIONES") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_CAJA_COMPENSACION") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Caja de Compensación</p>
        @if( session("PAR_PERSONAL_CAJA_COMPENSACION_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearCC('{{route('606cd90de76323762036c970e10e98a6')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearCC('{{route('606cd90de76323762036c970e10e98a6')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Caja de Compensación</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_CAJA_COMPENSACION_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'CC_Estado' id = 'CC_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'CC_TextBusqueda' name = 'CC_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalCC()'/>
                </div>
            </div>
            <table  class="tableNew dataTable" id = 'TablaPersonal_CC'>
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
    @if( session("PAR_PERSONAL_CAJA_COMPENSACION") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_DOCUMENTOS_LEGALES") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Documentos</p>
        @if( session("PAR_PERSONAL_DOCUMENTOS_LEGALES_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearDL('{{route('19150bbc9931e7954c8f28ca9ab45dfc')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDL('{{route('19150bbc9931e7954c8f28ca9ab45dfc')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Documento Legal</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_DOCUMENTOS_LEGALES_CONSULTAR") === session("keyUser") )
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
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalDL()'/>
                </div>
            </div>
            <table  class="tableNew dataTable" id = 'TablaPersonal_DL'>
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
    @if( session("PAR_PERSONAL_DOCUMENTOS_LEGALES") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_PERSONAL_TIPOS_RETIRO") === session("keyUser") )
        <div class ="ContenedorMenu">
        
    @endif
    <div class = 'ContenedorSeccionesForm ' >
        <p class="TitulosSecciones">Motivos de Retiro</p>
        @if( session("PAR_PERSONAL_TIPOS_RETIRO_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearTR('{{route('17bc272ee4c101a3144ee91211db00f3')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTR('{{route('17bc272ee4c101a3144ee91211db00f3')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Retiro</span>
            </div>
        @endif

        @if( session("PAR_PERSONAL_TIPOS_RETIRO_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TR_Estado' id = 'TR_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TR_TextBusqueda' name = 'TR_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarTablaPersonalTR()'/>
                </div>
            </div>
            <table  class="tableNew dataTable" id = 'TablaPersonal_TR'>
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
    @if( session("PAR_PERSONAL_TIPOS_RETIRO") === session("keyUser") )
        </div>
    <br>
    @endif
</div>





<?php echo '<script type="text/javascript" src="js/Parametrizacion/personal.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Personal");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("PERSONAL")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")
    });
</script>
@endsection
