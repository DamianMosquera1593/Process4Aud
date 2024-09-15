
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
                        Cuentas Por Pagar
                    </td>
                    
                </tr>
            </table>
        </div>
        <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' >
            {{ csrf_field() }}
            <div class="row">
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FormFacturaProveedor()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Registrar Facturas</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FacturasPendientesProveedor()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Facturas Pendientes por Llegar</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FacturasPendientesProveedor()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Registrar Pagos a Proveedor</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FacturasPendientesPagoProveedor()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Cartera Pendiente Proveedores</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
            </div>
        </div>
    </div>
    <br>
    <div class="ContenedorMenu">
        <div class="panel-heading alert-primary BorderTop">
            <table class = 'table'>
                <tr>
                    <td class = 'BlackFont'>
                        Cuentas Por Cobrar
                    </td>
                    
                </tr>
            </table>
        </div>
        <div class = 'ContenedorOptionDiv PARDIV_ContentInfoEmpresas' >
            {{ csrf_field() }}
            <div class="row">
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FormFacturaCliente()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Registrar Facturas De Cliente</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Admin_FormPagosFacturaCliente()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Registrar Pagos Cliente</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "AdminFactPendientesCobro()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Facturas Pendientes por Cobrar</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
                
                
                    <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "AdminFactPendientesCobroVencido()">
                        <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Cartera Vencida</h5>
                        <img src = "images/trafico_reportes_ListOt.png" class = "OptionIconTableMenuMaxSize" />
                    </div>
                
            </div>
        </div>
    </div>
</div>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/contabilidad.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>


<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Administración - Contabilidad");
        
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
