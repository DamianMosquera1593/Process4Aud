@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>

    <br>
    <div style = "padding-left:50px;">
        <img src ='images/AGREGAR_ICONO.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="NuevoPublico()" />
        <span class="FirstText Cursor" data-toggle="modal" data-target="#ModalEdit" style="color:#1B4075;font-weight: bold;" onclick="NuevoPublico()">Nueva Carpeta Principal</span>
    </div>
    <hr>

    <div class = ' AreaCasas' style = 'height:450px;overflow-y:scroll;padding-left:50px;padding-right: 50px;'>

    </div>
    <br>
    <br>
    <br>

</div>

<div class = 'ContentPanel'>
    
</div>


<script>
    $(document).ready(function () {
        $(".TModuloReversa").text("COMUNICACIONES")
        $(".TSubmodulo").text("ADMINISTRACIÓN EMPRESAS")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"d93b739c5a3b35e8f62570f0bad59cc3")
        ConsultarCarpetas()
    });
</script> 
@endsection
