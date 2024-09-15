
@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    <br>
    <br>
    <br>
    <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' >
            {{ csrf_field() }}
            <div class="row">
                @if( $datos['PRODUCCION_APROBACIONES_PPTO'] == 1 )
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "PRO_ViewPresupuestos()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Presupuestos</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                @endif
                
                @if( $datos['PRODUCCION_APROBACIONES_ANTICIPOS'] == 1 )
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListarProyectos()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Anticipos</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                @endif
                
                @if( $datos['PRODUCCION_APROBACIONES_LEGALIZACIONES'] == 1 )
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListarProyectos()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Legalizaciones</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                @endif
                
                @if( $datos['PRODUCCION_APROBACIONES_CIERREPPTO'] == 1 )
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListarProyectos()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Cierre Presupuestos</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
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
       $(".TSubmodulo").text("APROBACIÓN PRESUSUPUESTOS")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"Inicio")
    });
</script> 
@endsection
