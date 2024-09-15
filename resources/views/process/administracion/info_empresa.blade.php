@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    <span class = 'HiddenInformation NEmp'>{{$empresa->NombreComercial}}</span>
    <span class = 'HiddenInformation NEmpx'>{{$empresa->HashE}}</span>
    <br>
    <table width = '100%'>
        <tr>
            <td width = '15%'>
                <div width = '100%' style = 'overflow-y:scroll;height:650px;padding:5px;cursor:pointer;'>
                    <table width = '100%'>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%' >
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(1)' width = '85%'class = 'CenterText card-title'>Datos Compañía</td>
                                        <td onclick = '__AdminDatosVisual(1)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual1'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_EMPRESAS_LEGAL") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionLegalEmpresa('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Datos Generales</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>

                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual1'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionUnidadesNegocioEmpresa('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Unidades de Negocio</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual1'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_EMPRESAS_CLIENTES") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionClientesEmpresa('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/menu/CLIENTES_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Clientes</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual1'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_EMPRESAS_PROVEEDORES") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionProveedoresEmpresa('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/menu/PROVEEDORES_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Proveedores</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(2)' width = '85%'class = 'CenterText card-title'>Contabilidad Proveedores</td>
                                        <td onclick = '__AdminDatosVisual(2)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual2'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FormFacturaProveedor('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Histórico Factura Proveedor</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>

                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual2'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FormFacturaProveedorReg('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Registrar Factura Proveedor</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual2'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FacturasPendientesProveedor('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Facturas Pendientes Por Llegar</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual2'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FacturasPendientesPagoProveedor('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Cartera Pendiente Proveedores</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(3)' width = '85%'class = 'CenterText card-title'>Contabilidad Clientes</td>
                                        <td onclick = '__AdminDatosVisual(3)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual3'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursos" onclick = "Admin_FormFacturaCliente('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Histórico Facturas De Cliente</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual3'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FormFacturaClienteReg('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Registrar Facturas De Cliente</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual3'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "AdminFactPendientesCobro('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Facturas Pendientes por Cobrar</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual3'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "AdminFactPendientesCobroVencido('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Cartera Vencida Clientes</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>

                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(4)' width = '85%'class = 'CenterText card-title'>Financiera</td>
                                        <td onclick = '__AdminDatosVisual(4)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual4'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FormAdminPagos('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Detalle de Pagos</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual4'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "Admin_FormAdminPagosAprob('{{ $empresa->Hash }}')" >
                                    <?php echo '<img src ="'.url("/").'/images/FINANCIERA_ADMINISTRACIÓN_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Revisiones Pagos</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(5)' width = '85%'class = 'CenterText card-title'>Recursos Humanos</td>
                                        <td onclick = '__AdminDatosVisual(5)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual5'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionCostoEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Costo Compañía</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual5'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionCostoVacacionesEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Vacaciones</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual5'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS_HHEMP") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "renderModalHorasHombreEmpleados('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Horas Trabajadas</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual5'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS_SIMULADOR") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionSimuladorCostos('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Simulador Costos Empleado</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual5'>
                            <td>
                                <br>
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "administracionFichaTecnicaEmpleado('{{ $empresa->Hash }}', '{{session('keyUser')}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Ficha Técnica Empleado</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(6)' width = '85%'class = 'CenterText card-title'>Presupuesto</td>
                                        <td onclick = '__AdminDatosVisual(6)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual6'>
                            <td>
                                <br>
                                @if( session("INFORMACION_EMPRESA_PPTOGENERAL") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "InformacionPptoGeneral('{{session("keyUser")}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Presupuesto General Compañía</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual6'>
                            <td>
                                <br>
                                @if( session("INFORMACION_EMPRESA_PPTOGENERAL") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "InformacionPptoPersonal('{{session("keyUser")}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Presupuesto Personal</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(7)' width = '85%'class = 'CenterText card-title'>Inventario</td>
                                        <td onclick = '__AdminDatosVisual(7)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual7'>
                            <td>
                                <br>
                                @if( session("INFORMACION_INVENTARIO") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "InventarioGeneral('{{session("keyUser")}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Inventario General</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(8)' width = '85%'class = 'CenterText card-title'>Biblioteca Accesos</td>
                                        <td onclick = '__AdminDatosVisual(8)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual8'>
                            <td>
                                <br>
                                @if( session("INFORMACION_SISTEMAS") === session("keyUser") )
                                <div class="col text-center Cursor" onclick = "AcesosSis('{{session("keyUser")}}')" >
                                    <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                    <br>
                                    <br>
                                    <span class="card-title" >Biblioteca Accesos</span>
                                </div>
                                <hr>
                                @endif
                                
                            </td>
                        </tr>
                        <tr>
                            <td style = 'background-color:#0684A5;color:white;border-radius:2em;'>
                                <table width = '100%'>
                                    <tr>
                                        <td onclick = '__AdminDatosVisual(9)' width = '85%'class = 'CenterText card-title'>Comunicaciones</td>
                                        <td onclick = '__AdminDatosVisual(9)' class = 'CenterText'>
                                        <?php echo '<img src ="'.url("/").'/images/FLECHAS_ICONO.png" class = "Cursor" height = "50px"/>' ?>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td><br></td></tr>
                        <tr class = 'HiddenInformation AdminDatosVisual AdminDatosVisual9'>
                            <td>
                                <br>
                                <a href="{{ route('4a5a7170621126bd5f4a58badcf8e1cf') }}">
                                    <div class="col text-center Cursor"  >
                                        <?php echo '<img src ="'.url("/").'/images/PARAMETRIZACION_DATOS_ICONO.png" class = "Cursor" height = "100px"/>' ?>
                                        <br>
                                        <br>
                                        <span class="card-title" >Comunicaciones</span>
                                    </div>
                                </a>
                                <hr>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td width = '20px'></td>
            <td width = '85%' >
                <div class = 'ContenedorSeccionesForm ' >
                    <div class = '_TituloMenu' style = 'padding:25px;'></div>
                    
                    <div class = 'SubMenu' style = 'padding:25px;'></div>
                    
                    <div class = 'ContentSubMenuAdmin' style  ='padding:25px;overflow-y:scroll;height:650px'></div>
                </div>
                
            </td>
        </tr>
    </table>
</div>



<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/empresas.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/contabilidad.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/canvasjs.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Administracion/recursos_humanos.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Datos/empresa.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("<p>Administración - Empresas</p>"+ $(".NameJob").text()+"");
        $(".card").css({
            'background-color':'#1B4075',
            'color':'white'
        })
        $(".card-deck a:hover, .card-deck a:active,.card-deck a:visited").css({
            'text-decoration':'underline WHITE'
        })
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".TModuloReversa").text("ADMINISTRACIÓN")
        $(".TSubmodulo").text($(".NEmp").text())
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"d93b739c5a3b35e8f62570f0bad59cc3")
    });
</script> 
@endsection
