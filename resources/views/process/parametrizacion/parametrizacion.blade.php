@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>

    
    <div class="row">
        @if( session("PAR_GENERALES") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('7a55d71f10b208cb395561ea28779875')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Generales</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_EMPRESA") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('8736e6f497a5e7b0e123ab42fc0258dc')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Empresa</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_PERSONAL") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('66b7ab64d20f5e0f2635036e99352173')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Personal</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_PPTO_GENERAL") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('3b62057ed4a6053f36077f3a0ee3d1ae')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Presupuesto General</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_INVENTARIO") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('6749704d28d45a5dfe071898f72a32d4')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Inventario</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_CLIENTES") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('705e21f70252bdd71cc4bd7477556173')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Clientes</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_PROVEEDORES") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('af65b15ddf7d8c9a42016f3917171b7d')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Proveedores</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_BANCOS") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('e038b329d2bfdefdcabb151e839b2b1d')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Bancos</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_ROLES") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('35e80067234c997c538f25902a9ddef4')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Roles</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_USUARIOS") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('99f46807f0cf3f07a5ad65d5333bb2bf')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Usuarios</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_SEGURIDAD_SISTEMAS") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('856c55ae087e200b65b9a1bdaf897f01')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Seguridad y Sistemas</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_TRAFICO") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('0c6dbf3f81b907922d3a1f693f24ad0a')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Tráfico</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_PRODUCCION") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('aebce02d1d97f53d149ce1951211196c')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Producción</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_HORAS_HOMBRE") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('c92932129875b71e745711629c7165f4')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Horas Hombre</h5>
                </a>
            </div>
        @endif
        @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
            <div class="col text-center" >
                <a href="{{route('e2a13dbb9efa27ff4d29436bbf963284')}}">
                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" height = "150px"/>' ?>
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Requerimientos Clientes</h5>
                </a>
            </div>
        @endif
        
    </div>
</div>



<script>
    $(document).ready(function () {
        $(".TModuloReversa").text("DATOS")
       $(".TSubmodulo").text("PARAMETRIZACIÓN")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"f712f056a60e6ea60b9195f04d3c4d74")
    });
</script> 
@endsection
