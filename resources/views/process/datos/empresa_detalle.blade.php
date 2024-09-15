@extends('layouts.inicio_process')

@section('content')
<span class = 'HiddenInformation NE'>{{$datos["Empresa"][0]->NombreComercial}}</span>
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
  <?php echo '<script src="//cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>'; ?>
  <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
  <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
  <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
  <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.es.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <script>
        $( function() {
          $( "#tabs" ).tabs();

        } );

        </script>
    <hr>
    <div class = 'ContenedorSeccionesForm' style = 'padding:20px;'>
        <div id="_tabs" class = 'PestanasSecciones'>
            <ul>
                <li><a href="#_tabs-1">Información General</a></li>
                <li><a href="#_tabs-2" onclick = 'InformacionTributariaEmpresa({{$datos["Hash"]}},0)'>Información Legal</a></li>
                <li ><a href="#_tabs-3" onclick = 'UnidadesNegocioEmpresa({{$datos["Hash"]}},0)'>Información Estructura</a></li>
                
                <li><a href="#_tabs-4" onclick = 'InformacionPersonal({{$datos["Hash"]}},0)'>Información Personal</a></li>
                <li><a href="#_tabs-5" onclick = 'InformacionSGSST({{$datos["Hash"]}},0)'>Información SG-SST</a></li>
            </ul>
            <div id="_tabs-1">
                @include('process.datos.empresa_detalle_general')
            </div>
            <div id="_tabs-2">
                @include('process.datos.empresa_detalle_legal')
            </div>
            <div id="_tabs-3">
                @include('process.datos.empresa_detalle_estructura')
            </div>
            <div id="_tabs-4">
                <div class = 'ContenedorSeccionesForm _StPer'>
                </div>
            </div>
            <div id="_tabs-5">
                <div class = 'ContenedorSeccionesForm _StSSG'>
                </div>
            </div>
        </div>
    </div>
    
</div>
<input type = 'hidden' class = '_PEstado' value = '{{session("INFORMACION_EMPRESA_ESTADO")}}' />
<input type = 'hidden' class = '_EmpresaN' value = "{{$datos['Hash']}}" />


<?php echo '<script type="text/javascript" src="'.url("/").'/js/Datos/empresa.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        $(".FormatNumbers").each(function(){
            $(this).text( formatNumber.new( $(this).text() ));
        })

        $(".TModuloReversa").text("INFORMACIÓN EMPRESAS")
        $(".TSubmodulo").text("DATOS - "+ $(".NE").text() )
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        //CompTSubmodulo
        $(".RutaInterna").attr("href",UrlUniversal+"f9e892e9ea8f026ac7a9487452d012fd")

        $( "#_tabs,#pest,#TabsMenu" ).tabs();
        //InformacionLegalEmpresa({{$datos['Hash']}},0)
    });
</script> 
@endsection
