@extends('layouts.inicio_process')

@section('content')

<div class = 'ContentPanel'>
    <br>
    @if( session("PAR_TRAFICO_TIPOS_BRIEF") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        TIPOS DE BRIEF
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentTipoBrief' onclick = 'ContentList("TipoBrief")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentTipoBrief' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_TRAFICO_TIPOS_BRIEF_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = "CrearTipoBrief('{{route('7923210f87763748a338bfde09d274c7')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoBrief('{{route('7923210f87763748a338bfde09d274c7')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Tipo Brief </span>
            </div>
        @endif
        @if( session("PAR_TRAFICO_TIPOS_BRIEF_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TB_Estado' id = 'TB_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TB_TextBusqueda' name = 'TB_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaTrafico_TB()'/>
                </div>
            </div>
            <table id = "TablaTrafico_TB" class="dataTable tableNew">
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
    @if( session("PAR_TRAFICO_TIPOS_BRIEF") === session("keyUser") )
        </div>
    <br>
    @endif

    @if( session("PAR_TRAFICO_TIPOS_TAREA") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        TIPOS DE TAREA
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentTipoTarea' onclick = 'ContentList("TipoTarea")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif


    <div class = 'ContenedorOptionDiv PARDIV_ContentTipoTarea' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_TRAFICO_TIPOS_TAREA_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = "CrearTipoTarea('{{route('5d7442a9091056cde4eb3948de693268')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoTarea('{{route('5d7442a9091056cde4eb3948de693268')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Tipo de Tarea </span>
            </div>
        @endif

        @if( session("PAR_TRAFICO_TIPOS_TAREA_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Estado:</label>
                    <select class ='form-control' name = 'TT_Estado' id = 'TT_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TT_TextBusqueda' name = 'TT_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaTrafico_TT()'/>
                </div>
            </div>
            <table id = "TablaTrafico_TT" class="dataTable tableNew">
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
    @if( session("PAR_TRAFICO_TIPOS_TAREA") === session("keyUser") )
        </div>
    <br>
    @endif


    @if( session("PAR_TRAFICO_FORMATO_BRIEF") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        FORMATO BRIEF
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentFormatoBrief' onclick = 'ContentList("FormatoBrief")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentFormatoBrief' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_TRAFICO_FORMATO_BRIEF_CREAR") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = "CrearCampoFormatoBrief('{{ route('a9e48180ffc0c36062e6f88c8c7aa255')}}','{{route('b0280405c81f4e4992113f92d89814ad')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearCampoFormatoBrief('{{ route('a9e48180ffc0c36062e6f88c8c7aa255')}}','{{route('b0280405c81f4e4992113f92d89814ad')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Formato Brief</span>
                @if( session("PAR_TRAFICO_FORMATO_BRIEF_EDITAR") === session("keyUser") )
                    <img src ='images/datos_reordenar.png' class = 'OptionIcon' onclick = "ReOrganizarCamposBrief('{{ route('7923210f87763748a338bfde09d274c7')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "ReOrganizarCamposBrief('{{ route('7923210f87763748a338bfde09d274c7')}}')" data-toggle="modal" data-target="#ModalEdit"> Reorganizar Campos</span>
                @endif
            </div>
        @endif

        @if( session("PAR_TRAFICO_FORMATO_BRIEF_CONSULTAR") === session("keyUser") )

            <table id = "FormatoBrief" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th>Brief</th>
                        <th>Nombre Técnico</th>
                        <th>Nombre Campo</th>
                        <th>Descripción Campo</th>
                        <th>Obligatorio</th>
                        <th>Tipo Campo</th>
                        <th>Clasificación</th>
                        <th>Orden</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                @foreach($datos['CamposBrief'] as $Doc)
                    <tr class = 'FormatBrief_Row{{ $Doc->Id }}'>
                        <td >{{ $Doc->TipoBrief }}</td>
                        <td >{{ $Doc->Nombre_Tecnico }}</td>
                        <td >{{ $Doc->Label }}</td>
                        <td >{{ $Doc->Descripcion }}</td>
                        <td > @if($Doc->Obligatorio === 1) <p>SI</p> @else <p>NO</p> @endif</td>
                        <td >{{ $Doc->TipoCampo }}</td>
                        <td >{{ $Doc->Lugar }}</td>
                        <td >{{ $Doc->Orden }}</td>
                        <td class ="CenterText _ContentTTBES_{{ $Doc->Id }}">
                            @if( session("PAR_TRAFICO_FORMATO_BRIEF_ELIMINAR") === session("keyUser") )
                                <i class = 'Cursor fas fa-times' onclick="EliminarRegistroFormatoBrief('{{ $Doc->Id }}','{{route('2955fe92607b78615c3b43c1154b9e1a')}}')"></i>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </table>
        @endif
    </div>
    @if( session("PAR_TRAFICO_FORMATO_BRIEF") === session("keyUser") )
        </div>
    <br>
    @endif
    @if( session("PAR_TRAFICO_ADMINISTRATIVO") === session("keyUser") )
        <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont'>
                        TIPOS DE TRÁFICO ADMINISTRATIVO
                    </td>
                    <td class = 'text-left' >
                        <a href='#' class = 'PAR_ContentFormatoBrief' onclick = 'ContentList("FormatoBrief")'>
                            <i  class="Cursor fas fa-angle-double-down"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    @endif

    <div class = 'ContenedorOptionDiv PARDIV_ContentFormatoBrief' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("PAR_TRAFICO_ADMINISTRATIVO") === session("keyUser") )
            <div class = 'table'>
                <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = "CrearTipoTA()" data-toggle="modal" data-target="#ModalEdit"/>
                <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoTA()" data-toggle="modal" data-target="#ModalEdit"> Nuevo Tipo</span>
                
            </div>
        @endif

        @if( session("PAR_TRAFICO_ADMINISTRATIVO") === session("keyUser") )

            <table id = "TiposTA" class="dataTable tableNew">
                <thead>
                    <tr>
                        <th>Brief</th>
                        <th>Nombre</th>
                        <th>Nombre Grupos</th>
                        <th ></th>
                    </tr>
                </thead>
            </table>
        @endif
    </div>
    @if( session("PAR_TRAFICO_ADMINISTRATIVO") === session("keyUser") )
        </div>
    <br>
    @endif
</div>

<?php echo '<script type="text/javascript" src="js/Parametrizacion/trafico.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<!-- Bootstrap & Core Scripts -->
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>

    
    <script>
        $(document).ready(function () {
            $('.tbody').sortable();
            $(".TituloPantalla").html("Datos - Parametrización - Tráfico");
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
