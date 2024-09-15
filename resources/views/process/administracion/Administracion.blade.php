@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    <br>
    <br>
    <br>
        {{ csrf_field() }}
        <div class="row">
            <div class="col text-center" >
                @if( session("ADMINISTRACION_EMPRESAS") === session("keyUser") )
                    
                    <a href="{{ route('d93b739c5a3b35e8f62570f0bad59cc3') }}">
                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "OptionIconTableMenuMaxSize"/>' ?>
                    </a>
                    <br>
                    <br>
                    <a href="{{ route('d93b739c5a3b35e8f62570f0bad59cc3') }}">
                        <h5 class="btn btn-primary" >Empresas</h5>
                    </a>
                @endif
            </div>
            <div class="col text-center" >
                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                    <a href="{{ route('0e0973bff4eb188c176093009025eb79') }}">
                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "OptionIconTableMenuMaxSize"/>' ?>
                    </a>
                    <br>
                    <br>
                    <a href="{{ route('0e0973bff4eb188c176093009025eb79') }}">
                        <h5 class="btn btn-primary" >Contabilidad</h5>
                    </a>
                @endif
            </div>
            <div class="col text-center" >
                @if( session("ADMINISTRACION_FINANCIERA") === session("keyUser") )
                    <a href="{{ route('f6ff70ca67c797a58f3acaf06e552835') }}">
                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "OptionIconTableMenuMaxSize"/>' ?>
                    </a>
                    <br>
                    <br>
                    <a href="{{ route('f6ff70ca67c797a58f3acaf06e552835') }}">
                        <h5 class="btn btn-primary" >Financiera</h5>
                    </a>
                @endif
            </div>
            <div class="col text-center" >
                @if( session("ADMINISTRACION_RECURSOS_HUMANOS") === session("keyUser") )
                    <a href="{{ route('2b0f099be8b183340e16eb5370c91799') }}">
                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "OptionIconTableMenuMaxSize"/>' ?>
                    </a>
                    <br>
                    <br>
                    <a href="{{ route('2b0f099be8b183340e16eb5370c91799') }}">
                        <h5 class="btn btn-primary" >Recursos Humanos</h5>
                    </a>
                @endif
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col text-center" >
                @if( session("INFORMACION_EMPRESA_PPTOGENERAL") === (session("keyUser")) )
                    <img src ='images/Datos_Opciones.png' class = 'OptionIconTableMenuMaxSize' onclick = "InformacionPptoGeneral('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <br>
                    <br>
                    <h5 class="btn btn-primary"  onclick = "InformacionPptoGeneral('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"> Presupuesto General &nbsp;&nbsp;&nbsp;&nbsp;</h5> 
                    
                @endif
            </div>

            <div class="col text-center" >
                @if( session("INFORMACION_INVENTARIO") === (session("keyUser")) )
                    <img src ='images/Datos_Opciones.png' class = 'OptionIconTableMenuMaxSize' onclick = "InventarioGeneral('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <br>
                    <br>
                    <h5 class="btn btn-primary"  onclick = "InventarioGeneral('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"> Inventario General &nbsp;&nbsp;&nbsp;&nbsp;</h5> 
                @endif
            </div>
            <div class="col text-center">
                @if( session("INFORMACION_SISTEMAS") === (session("keyUser")) )
                    <img src ='images/Datos_Opciones.png' class = 'OptionIconTableMenuMaxSize' onclick = "AcesosSis('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <br>
                    <br>
                    <h5 class="btn btn-primary"  onclick = "AcesosSis('{{session("keyUser")}}')" data-toggle="modal" data-target="#ModalEdit"> Biblioteca de Accesos</h5> 
                @endif
            </div>

            <div class="col text-center" >
                <a href="{{ route('4a5a7170621126bd5f4a58badcf8e1cf') }}">
                    <?php echo '<img src ="'.url("/").'/images/Datos_comunicaiones.png" class = "OptionIconTableMenuMaxSize"/>' ?>
                </a>
                <br>
                <br>
                <a href="{{ route('4a5a7170621126bd5f4a58badcf8e1cf') }}">
                    <h5 class="btn btn-primary" >Comunicaciones</h5>
                </a>
            </div>
        </div>
</div>


<?php echo '<script type="text/javascript" src="js/Datos/empresa.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        $(".FormatNumbers").each(function(){
            $(this).text( formatNumber.new( $(this).text() ));
        })

        $(".TModuloReversa").text("BIENVENIDA")
        $(".TSubmodulo").text("ADMINISTRACIÓN" )
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        //CompTSubmodulo
        $(".RutaInterna").attr("href",UrlUniversal+"bienvenida")

        $( "#_tabs,#pest,#TabsMenu" ).tabs();
    });
</script> 
@endsection
