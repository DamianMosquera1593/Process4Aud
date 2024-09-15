@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>

    <div class="card-deck flex-center" style = 'background-color:white;'>
        @foreach ($empresas as $empresa)
            <a href="{{ url("/") }}/39474d007f559fae2618c8b421ce2f54/{{$empresa->url}}">
                <div class="card m-3 border flex-center" style="border-radius: 0.5em;">
                    @if (is_null($empresa->Logo))
                        <img src="images/menu/_Datos.png" class="card-img-top" alt="...">
                    @else
                        <img src="../storage/app/datos/empresas/{{$empresa->IdEmpresa}}/{{$empresa->Logo}}" class="card-img-top" alt="...">
                    @endif
                    <h3 class="card-title">{{$empresa->NombreComercial}}</h3>
                    <br>
                    <button>Consultar</button>
                </div>
            </a>
        @endforeach
    </div>

</div>

<div class = 'ContentPanel'>
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>

    
</div>


<?php echo '<script type="text/javascript" src="js/Administracion/empresas.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Administración - Empresas");
        $(".card").css({
            //'height':'350px'
            //'background-color':'#1B4075',
            //'color':'white'
        })
        $(".card-deck a:hover, .card-deck a:active,.card-deck a:visited").css({
            'text-decoration':'underline WHITE'
        })
        $(".TModuloReversa").text("BIENVENIDA")
        $(".TSubmodulo").text("ADMINSTRACIÓN")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"bienvenida")
    });
</script> 
@endsection
