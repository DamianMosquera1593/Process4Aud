@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    <br>
    <br>
    <br>
    <div class="row">
        <div class="col text-center" >
            @if( session("INFORMACION_EMPRESA") === session("keyUser") )
                <a href="{{ route('f9e892e9ea8f026ac7a9487452d012fd') }}">
                    <?php echo '<img src ="'.url("/").'/images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png" class = "Cursor" height = "150px"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('f9e892e9ea8f026ac7a9487452d012fd') }}">
                    <h5 class="btn btn-primary" >Información Empresas</h5>
                </a>
            @endif
        </div>
        <div class="col text-center" >
            @if( session("INFORMACION_CLIENTES") === session("keyUser") )
                <a href="{{ route('2723bb03bb81e89502512a756b9207c2') }}">
                    <?php echo '<img src ="'.url("/").'/images/menu/CLIENTES_ICONO.png" class = "Cursor" height = "150px"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('2723bb03bb81e89502512a756b9207c2') }}">
                    <h5 class="btn btn-primary" >Información Clientes</h5>
                </a>
            @endif
        </div>
        <div class="col text-center" >
            @if( session("INFORMACION_PROVEEDORES") === session("keyUser") )
                <a href="{{ route('7ded3b7e08c99b3c9634ef4b194d4c3c') }}">
                    <?php echo '<img src ="'.url("/").'/images/menu/PROVEEDORES_ICONO.png" class = "Cursor" height = "150px"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('7ded3b7e08c99b3c9634ef4b194d4c3c') }}">
                    <h5 class="btn btn-primary" >Información Proveedores</h5>
                </a>
            @endif
        </div>
        <div class="col text-center" >
            @if( session("INFORMACION_BANCOS") === session("keyUser") )
                <a href="{{ route('724af7e43d52c6048fe2c27011a6bd60') }}">
                    <?php echo '<img src ="'.url("/").'/images/menu/BANCOS_ICONO.png" class = "Cursor" height = "150px"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('724af7e43d52c6048fe2c27011a6bd60') }}">
                    <h5 class="btn btn-primary" >Información Bancos</h5>
                </a>
            @endif
        </div>
        
        <div class="col text-center" >
            @if( session("PARAMETRIZACION") === session("keyUser") )
                <a href="{{ route('a1d6bbbd044643ffd9578365cf563a10') }}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "150px"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('a1d6bbbd044643ffd9578365cf563a10') }}">
                    <span class="btn btn-primary" >Parametrización</span>
                </a>
            @endif
        </div>
    </div>

</div>



<script>
    $(document).ready(function () {
       
        
       $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
       $(".FormatNumbers").each(function(){
           $(this).text( formatNumber.new( $(this).text() ));
       })

       $(".TModuloReversa").text("BIENVENIDA")
       $(".TSubmodulo").text("DATOS")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"Inicio")
   })
</script> 
@endsection
