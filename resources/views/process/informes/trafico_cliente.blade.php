@extends('layouts.inicio_process')

@section('content')
<br>
<br>

<div class="ContentPanel" >
    
</div>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/chart.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"></script>';?>
<?php //echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_clientes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Clientes/gestion.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Informes/InformesTraficoCliente.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script>
    $(document).ready(function () {
        
    });
</script>
@endsection

