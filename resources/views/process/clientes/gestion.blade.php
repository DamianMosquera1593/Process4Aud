@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    <span class = 'HidenInformation JobKeyUser'>{{session("JobUserKey")}}</span>
            <div class='pestanas'>
                <ul class = 'TabsMenu'>
                    @if( session("CLIENTES_HISTORICO_SOLICITUD") === session("keyUser") )
                        <li onclick = 'MostrarTabsMenu(3);' class = 'TabsMenu_Tabs TabsMenu_Tabs3'>
                            <img src = 'images/Tributario.png' class = 'IconVentana'>
                            <span>Resumen</span>
                        </li>
                        <li onclick = 'MostrarTabsMenu(2);' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>
                            <img src = 'images/Tributario.png' class = 'IconVentana'>
                            <span>Histórico</span>
                        </li>
                        
                    @endif
                    @if( session("CLIENTES_CONSULTAR_SOLICITUD") === session("keyUser") )
                        <li onclick = 'MostrarTabsMenu(1);' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>
                            <img src = 'images/Documentos.png' class = 'IconVentana'>
                            <span>En Curso</span>
                        </li>
                    @endif
                    @if( session("CLIENTES_EVALUACION_SOLICITUD") === session("keyUser") )
                        <li onclick = 'MostrarTabsMenu(4);' class = 'TabsMenu_Tabs TabsMenu_Tabs4'>
                            <img src = 'images/Documentos.png' class = 'IconVentana'>
                            <span>Pendientes</span>
                        </li>
                    @endif
                </ul>
            </div>
            @if( session("CLIENTES_CONSULTAR_SOLICITUD") === session("keyUser") )
            <div class = 'ChildTabsMenu TabsMenu1' >   
                <div class = 'form-row ResumenRequerimientosCliente' style = 'padding-left:30%;padding-right:30%;'>
                        
                </div>
                <hr>
                <div class = 'ContenedorOptionDiv'>
                    @if( session("CLIENTES_CREAR_SOLICITUD") === session("keyUser") )
                        <div class = 'BarraIconos'>
                            <table width ="100%">
                                <tr>
                                    <td style = 'width:60%'>
                                        <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearRequerimientoCliente()" data-toggle="modal" data-target="#ModalEdit"/>
                                        <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearRequerimientoCliente()" data-toggle="modal" data-target="#ModalEdit">Crear Requerimiento</span>
                                    </td>
                                    <td style = 'width:40%'>

                                    </td>
                                </tr>
                            </table>
                        </div>
                    @endif
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTC_Estado'>Estado:</label>
                            <select class ='form-control' name = 'OTCC_Estado' id = 'OTCC_Estado'>
                                <option value = '0' >Todos</option>
                                <option value = '1'  >En Revisión Agencia</option>
                                <option value = '10'  >Pendiente Tramite</option>
                                <option value = '2'>Asignada en Proceso</option>
                                <option value = '3'>Devuelto a Cliente</option>
                                <option value = '4' selected>Pendiente Aprobación Cliente</option>
                                <option value = '5'>En Ajuste</option>
                                <!--<option value = '6'>Aprobado Cliente</option>-->
                                <option value = '9'>Suspendida Temporalmente</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTC_TextBusqueda'>Buscar:</label>
                            <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTCC_TextBusqueda' name = 'OTCC_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarRequerimientosCliente()'/>
                        </div>
                    </div>
                    <table class="dataTable tableNew responsive nowrap" id = 'TablaRequerimientosCliente'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>No. Requerimiento</th>
                                <th>Asunto/Referencia</th>
                                <th>País</th>
                                <th>Creador</th>
                                <th>Fecha Creación</th>
                                <th>Hora Creación</th>
                                <!--<th>Creado Por</th>-->
                                <th>Estado</th>
                                <th>Fecha Entrega</th>
                                <th>Nro. Piezas</th>
                                <th>Status Actual</th>
                                <!--<th>Histórico Status</th>-->
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            @endif
            @if( session("CLIENTES_HISTORICO_SOLICITUD") === session("keyUser") )
            <div class = 'ChildTabsMenu TabsMenu2' >   
                <div class = 'ContenedorOptionDiv'>
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTCH_Estado'>Estado:</label>
                            <select class ='form-control' name = 'OTCH_Estado' id = 'OTCH_Estado'>
                                <option value = '0' selected>Todos</option>
                                <option value = '7' >Cerrada/Finalizada</option>
                                <option value = '8' >Cancelada</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTC_TextBusqueda'>Buscar:</label>
                            <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTCH_TextBusqueda' name = 'OTCH_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarHistoricoRequerimientosCliente()'/>
                        </div>
                    </div>
                    <table class="dataTable tableNew responsive nowrap" id = 'TablaHistoricoRequerimientosCliente'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>No. Requerimiento</th>
                                <th>Asunto</th>
                                
                                <!--<th>Tipo Desarrollo</th>-->
                                <th>País</th>
                                <th>Fecha Creación</th>
                                <th>Hora Creación</th>
                                <th>Estado</th>
                                <th>Fecha Entrega</th>
                                <th>Nro. Piezas</th>
                                <th>Status Actual</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            @endif
            
            @if( session("CLIENTES_HISTORICO_SOLICITUD") === session("keyUser") )
            <div class = 'ChildTabsMenu TabsMenu3' >   
                <div class = 'ContenedorOptionDiv'>
                    <div class = 'SummaryInfo'></div>
                    
                </div>
            </div>
            @endif
            
            @if( session("CLIENTES_EVALUACION_SOLICITUD") === session("keyUser") )
            <div class = 'ChildTabsMenu TabsMenu4' >   
                <div class = 'form-row ResumenRequerimientosInternos' style = 'padding-left:30%;padding-right:30%;'>
                        
                </div>
                <hr>
                <div class = 'ContenedorOptionDiv'>
                    
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTCH_Estado'>Estado:</label>
                            <select class ='form-control' name = 'OTCHE_Estado' id = 'OTCHE_Estado'>
                                <option value = '0' >Todos</option>
                                <option value = '1' selected >En Revisión Agencia</option>
                                <option value = '2'>Asignada en Proceso</option>
                                <option value = '3'>Devuelto a Cliente</option>
                                <option value = '4'>En Aprobación Cliente</option>
                                <option value = '5'>En Ajuste</option>
                                <option value = '6'>Aprobado con Piezas Adicionales</option>
                                <option value = '7'>Cerrada / Finalizada</option>
                                <option value = '8'>Cancelada</option>
                                <option value = '9'>Supendida Temporalmente</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='OTC_TextBusqueda'>Buscar:</label>
                            <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTCHE_TextBusqueda' name = 'OTCHE_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarEvalRequerimientosCliente()'/>
                        </div>
                    </div>
                    <table class="dataTable tableNew responsive nowrap" id = 'TablaEvalRequerimientosCliente'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>No. Requerimiento</th>
                                <th>Número OT</th>
                                <th>Asunto</th>
                                <th>Fecha Salida</th>
                                <!--<th>Tipo Desarrollo</th>-->
                                <th>País</th>
                                <th>Solicitado Por</th>
                                <th>Fecha Creación</th>
                                <th>Hora Creación</th>
                                <th>Estado</th>
                                <th>Fecha Entrega</th>
                                <th>Nro. Piezas</th>
                                <th>Status Actual</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            @endif
            <span class = 'HidenInformation XCs'>{{session("CLIENTES_EVALUACION_SOLICITUD")}}</span>
</div>
<div class="ContentPanel" >
    
    
</div>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/chart.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_clientes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Clientes/gestion.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">

<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
 
<script>
    $(document).ready(function () {
        
        
        $(".TModuloReversa").text("BIEVENIDA")
        $(".TSubmodulo").text("CLIENTES")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"bienvenida")
    });
</script> 
@endsection

