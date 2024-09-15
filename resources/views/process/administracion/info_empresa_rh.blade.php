@extends('layouts.inicio_process')

@section('content')

{{@csrf_field}}
<div class = 'ContentPanel'>
    <br>
    <div class="ContenedorMenu">
    <div class="panel-heading alert-primary BorderTop">
        <table class = 'table'>
            <tr>
                <td width = '90%' class = 'BlackFont text-uppercase'>
                    EMPRESA <span class = 'NameJob'>{{$empresa->NombreComercial}}</span>
                </td>
                <td class = 'text-left' >
                    <a href='#' class = 'PAR_ContentInfoEmpresas' onclick = 'ContentList("InfoEmpresas")'>
                        <i  class="Cursor fas fa-angle-double-down"></i>
                    </a>
                </td>
            </tr>
        </table>
    </div>
    <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' style ='display:none;' >
        {{ csrf_field() }}
        <div class="row">
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "administracionCostoEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Costo Compañía</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "administracionCostoVacacionesEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Vacaciones</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_PERMISOS) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "renderModalPermisosEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Permisos Personal</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_HHEMP) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "renderModalHorasHombreEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Horas Hombre Empleados</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_SIMULADOR) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "administracionSimuladorCostos('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Simulador de Costos Nómina</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_ORGANIGRAMA) === 1 )
            @endif
            @if ( ($empresa->ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO) === 1 )
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "administracionFichaTecnicaEmpleado('{{ $empresa->Hash }}', '{{session('keyUser')}}')">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Ficha Técnica Empleado</h5>
                    <img src = "../images/administracion_contactos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            @endif
        </div>
    </div>
    </div>
    <div class="ContenedorMenu SubMenu invisible mx-3">
        <div class="panel-heading alert-primary BorderTop invisible SubMenu" data-submenu="undefined" id="panelHeadSubMenu">
            <table class = 'table'>
                <tr>
                    <td width = '90%' class = 'BlackFont text-uppercase' id="nameSubMenu">
                        {{-- SubMenu {{$empresa->NombreComercial}} --}}
                    </td>
                </tr>
            </table>
        </div>
        <div class = 'ContenedorOptionDiv PARDIV_ContentSubMenu invisible SubMenu' id="panelBodySubMenu" >
            {{ csrf_field() }}

        </div>
        </div>
</div>


<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/recursos_humanos.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("<p>Administración - RH</p>"+ $(".NameJob").text()+"");
        $(".card").css({
            'background-color':'#1B4075',
            'color':'white'
        })
        $(".card-deck a:hover, .card-deck a:active,.card-deck a:visited").css({
            'text-decoration':'underline WHITE'
        })
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
