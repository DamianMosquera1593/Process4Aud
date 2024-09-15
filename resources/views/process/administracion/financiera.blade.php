
@extends('layouts.inicio_process')

@section('content')
<br>
<br>
<div class="ContentPanel">
    <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td class = 'BlackFont'>
                        Administración de Pagos
                    </td>
                    
                </tr>
            </table>
        </div>
        <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' >
            {{ csrf_field() }}
            <div class="row">
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FormAdminPagos()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Detalle de Pagos</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FormAdminPagosAprob()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Revisiones de Pagos</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                                
            </div>
        </div>
    </div>
    <br>
    
</div>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/contabilidad.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>


<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Administración - Financiera");
        
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
