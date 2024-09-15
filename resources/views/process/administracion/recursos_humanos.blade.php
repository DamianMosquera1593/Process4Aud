@extends('layouts.inicio_process')

@section('content')


<div class = 'ContentPanel'>
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>

    <div class="card-deck flex-center">
        @foreach ($empresas as $empresa)
            <a href="{{ url("/") }}/c23e633345eb31645d0d182842db79bd/{{$empresa->url}}">
                <div class="card m-3 border flex-center" style="width: 15rem; border-radius: 0.5em;">
                    @if (is_null($empresa->Logo))
                        <img src="images/menu/_Datos.png" class="card-img-top" alt="...">
                    @else
                        <img src="../storage/app/datos/empresas/{{$empresa->IdEmpresa}}/{{$empresa->Logo}}" class="card-img-top" alt="...">
                    @endif
                    <div class="card-body flex-center text-center">
                        <h3 class="card-title">{{$empresa->NombreComercial}}</h3>
                    </div>
                </div>
            </a>
        @endforeach
    </div>
</div>


<?php echo '<script type="text/javascript" src="js/Administracion/empresas.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Administración - Recursos Humanos");
        $(".card").css({
            'background-color':'#1B4075',
            'color':'white'
        })
        $(".card-deck a:hover, .card-deck a:active,.card-deck a:visited").css({
            'text-decoration':'underline WHITE'
        })
    });
</script> 
@endsection
