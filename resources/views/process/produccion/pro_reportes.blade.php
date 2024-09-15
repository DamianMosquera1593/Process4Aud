
@extends('layouts.inicio_process')

@section('content')
<br>
<br>
<br>
<br>
<br>
<div class="ContentPanel">
    <div class="panel-heading ">
        <table width = '100%'>
            <tr>
                <td class = 'WhiteFont'>
                    Aprobaciones
                </td>

            </tr>
        </table>
    </div>
    <div class="ContenedorMenu">
        
        <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' >
            {{ csrf_field() }}
            <div class="row">
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "PRO_ViewReporteAnticipos()">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Anticipos</h5>
                    <img src = "images/menu/_Produccion.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            </div>
        </div>
    </div>
</div>

<?php echo '<script type="text/javascript" src="'.url("/").'/js/Produccion/reportes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Reportes Producción");
        
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
