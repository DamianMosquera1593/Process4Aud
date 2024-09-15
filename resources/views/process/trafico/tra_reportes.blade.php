@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>

    <div class="row">
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListarProyectos()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Listado de Ots</h5>
        </div>
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListarTareasProyectos()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Listado de Tareas</h5>
        </div>
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewCargaLaboral()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Entregables Pendientes</h5>
        </div>
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewInformeGeneralCuenta()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Informe General Por Cuenta</h5>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewListadoOtsIntregables()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Listado de Ots y Entregables</h5>
        </div>
        <!--<div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewInformeUsuariosYara()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Reporte Usuarios</h5>
        </div>-->
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewMiInformeGeneral()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Informe Cuenta</h5>
        </div>
        <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "TRA_ViewReprocesos()" >
            <?php echo '<img src ="'.url("/").'/images/trafico_reportes_ListOt.png" class = "Cursor" height = "150px"/>' ?>
            <br>
            <br>
            <h5 class="btn btn-primary" >Reprocesos Cliente</h5>
        </div>
    </div>
    <div class = 'ContenedorOptionDiv PARDIV_ContentTRACLIENTEOT' style ='display:none;' >
        {{ csrf_field() }}
    </div>
</div>


<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_reportes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/chart.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"></script>';?>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">

<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<style type = 'text/css'>
    div#ModalContentForm {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
}
</style>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Tráfico Reportes");
        
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".ContentPanel").css({
            'height':$("body").height()-100
        })

        $(".TModuloReversa").text("BIENVENIDA")
        $(".TSubmodulo").text("REPORTES TRÁFICO")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"bienvenida")
    });
</script> 
@endsection
