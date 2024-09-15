
@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    <table  width = '100%'>
        <tr>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="VencimientosAdministrativos()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="VencimientosAdministrativos()">Vencimientos Administrativos</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Resumen Bancario</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Simulador Créditos</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Balcance Financiero</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
        <tr>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Consolidado Uno a Uno</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Flujo de Caja</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Cumplimiento de Metas</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Resumen de Actividad</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
        <tr>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Tráfico Administrativo</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Comportamiento Ots</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Vacaciones</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Costo Empleado</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
        <tr>
            <td class = 'CenterText' >
                <div class ='ContentSubMolButton2'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='images/menu/ADMINISTRACIOON_ICONO.png' class = 'IconMenuP Cursor'  onclick ="__InformeGerencial()" />
                            </td>
                            <td >
                                <!--_ParamResumenGeneral() -->
                                <span class="Cursor"  onclick="__InformeGerencial()">Simulador Costo Empleado</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
    <hr>
    {{ csrf_field() }}
            <!--<div class="row">
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Informes_Dashboard_Empresas()">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Empresas</h5>
                    <img src = "images/base_Informes_datos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Informes_Dashboard_Clientes()">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Clientes</h5>
                    <img src = "images/base_Informes_datos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Informes_Dashboard_Proveedores()">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Proveedores</h5>
                    <img src = "images/base_Informes_datos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
                <div class="col text-center" data-toggle="modal" data-target="#ModalEdit" onclick = "Informes_Dashboard_Bancos()">
                    <h5 class="FirstText Cursor" style="font-size:16px;color:#1B4075;font-weight: bold;">Bancos</h5>
                    <img src = "images/base_Informes_datos.png" class = "OptionIconTableMenuMaxSize" />
                </div>
            </div>-->

</div>


<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/chart.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_clientes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Clientes/gestion.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Informes/InformesDatos.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Informes/InformesTraficoCliente.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        
        
        $(".TModuloReversa").text("BIENVENIDA")
        $(".TSubmodulo").text("REPORTES")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"bienvenida")
    });
</script> 
@endsection

