<!DOCTYPE html>
<html lang="es" >
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROC3SS+</title>
        <link rel="icon" href="images/favicon.ico">
        <!-- Fonts -->
        
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        {{-- Animate --}}
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <?php echo '<link href="'.url("/").'/css/all.css" rel="stylesheet">' ;?>
        <?php echo '<link href="'.url("/").'/css/bootstrap.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/css/bootstrap4-toggle.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/alertifyjs/css/alertify.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/alertifyjs/css/themes/default.min.css" rel="stylesheet">';?>
        

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/datatables.min.css"/>' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/dataTables.bootstrap4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/dataTables.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/ckeditor.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/sample.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/config.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/summernote-bs4.min.css"/>' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/summernote-bs4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/GlobalVarials.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/FunctionsGlobal.js?v='.date("Y-m-d H:i:s").'"></script>';?>


        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Parametrizacion/generales.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.modal.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/alertifyjs/alertify.min.js"></script>';?>

        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/jquery.modal.min.css"/>' ;?>
        
        <?php echo '<link href="'.url("/").'/css/fullcalendar.css" rel="stylesheet">' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/moment.min.js"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/fullcalendar.min.js"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/locale/es.js"></script>';?>
        
        
        <!-- Styles -->
        <style>

            .full-height {
                height: 100vh;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            .table{
                padding-left:1px;
                padding-right:5px;
            }
            .dataTables_length,.dataTables_info{
                padding-left:5px;
            }
            .dataTables_filter,.pagination{
                padding-right: 5px;
            }


        </style>
    </head>
    <body >
        <table class ='BarraBuscarSubMenu' width = '85%'>
            <tr>
                <td width = '95%'>
                    <table>
                        <tr>
                            <td width = '1%'>
                                <?php echo '<img class ="LogoSubModulo rounded-circle" onerror = this.src="../images/foto.png" src="'.url("/").''.session('ImgUsuario').'" />'; ?>
                            </td>
                            <td nowrap>
                                <div class = 'contenedorReportesTitulo flex-center' >
                                    <table width = '100%'>
                                        <tr>
                                            <td style = 'padding-left:20px;'>
                                                <table width='100%'>
                                                    <tr>
                                                        <td class = 'TituloBuscador'>
                                                            <span style = 'padding-left:20px'>{{session("NameUser")}}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class = 'TituloBuscador' >
                                                            <span style = 'padding-left:20px;font-size:15px;font-weight: normal;'>{{session("JobUser")}}</span>
                                                        </td>
                                                    </tr>
                                                </table>  
                                            </td>
                                            <td class="text-right">
                                                <a href = '{{route('bienvenida')}}'>
                                                    <img src ='images/cerrar.png' onerror = this.src="../images/cerrar.png" height="25px"/>
                                                </a>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class = 'CenterText' nowrap >
                    <table >
                        <tr>
                            <td colspan = '2' class ='TituloPantalla' style = 'color:#1B4177;'></td>
                        </tr>
                        <tr>
                            <td>
                                <a href = '{{ route('CerrarSesion') }}' style = 'color:#7F8080;font-size:14px;'>CERRAR SESIÓN</a>
                            </td>
                            <td>
                                <a href = '{{ route('CerrarSesion') }}'>
                                    <img src ='../images/cerrar_sesion.png' onerror = this.src='images/cerrar_sesion.png' style = 'height: 25px;'/>
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <span class = 'HidenInformation FormEncuestaCliente'>{{session("ENCUESTA_CLIENTE")}}</span>
        <span class = 'HidenInformation FormEncuestaEjecutivo'>{{session("ENCUESTA_EJECUTIVO")}}</span>
        
        <div class = 'ContentBody'>
            <div class="vl" >
                <br>
                <br>
                <table width = '100%'>
                    <tr>
                        <td style = 'text-align:center;'>
                            <img src ='../images/LogoUProcess.png' onerror = this.src='images/LogoUProcess.png' style = 'height: 40px;'/>
                            <hr class = 'SeparadorMenuLogo'>
                        </td>
                    </tr>
                </table>
                <hr>
                <div id="accordian" class = 'ContenedorMenuF'>
                    <ul>
                        @if( session("_DATOS") === session("keyUser") )
                        <li >
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = 'logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/07_Datos.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>DATOS</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("INFORMACION_EMPRESA") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('f9e892e9ea8f026ac7a9487452d012fd') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{ route('f9e892e9ea8f026ac7a9487452d012fd') }}">
                                            <span class = 'FirstText Cursor'>Información Empresas</span>
                                        </a>
                                    </li>
                                @endif
                                @if( session("INFORMACION_CLIENTES") === session("keyUser") )
                                    <li >
                                        <a href="{{route('2723bb03bb81e89502512a756b9207c2')}}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('2723bb03bb81e89502512a756b9207c2')}}">
                                            <span class = 'FirstText Cursor'>Información Clientes</span>
                                        </a>
                                    </li>
                                @endif

                                @if( session("INFORMACION_PROVEEDORES") === session("keyUser") )
                                <li >
                                    <a href="{{ route('7ded3b7e08c99b3c9634ef4b194d4c3c') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('7ded3b7e08c99b3c9634ef4b194d4c3c')}}">
                                        <span class = 'FirstText Cursor'>Información Proveedores</span>
                                    </a>
                                </li>
                                @endif

                                @if( session("INFORMACION_BANCOS") === session("keyUser") )
                                <li >
                                    <a href="{{ route('724af7e43d52c6048fe2c27011a6bd60') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('724af7e43d52c6048fe2c27011a6bd60')}}">
                                        <span class = 'FirstText Cursor'>Información Bancos</span>
                                    </a>
                                </li>
                                <li>
                                    <a href = '#'>
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href = '{{ route('4a5a7170621126bd5f4a58badcf8e1cf') }}'>
                                        <span class = 'FirstText Cursor' >Comunicaciones</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("PARAMETRIZACION") === session("keyUser") )
                                <li >
                                    <a href="{{ route('a1d6bbbd044643ffd9578365cf563a10') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('a1d6bbbd044643ffd9578365cf563a10')}}">
                                        <span class = 'FirstText Cursor'>Parametrización</span>
                                    </a>
                                </li>
                                @endif
                            </ul>
                        </li>
                        @endif
                        
                        @if( session("_ADMINISTRATIVO") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/08_Administracion.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>ADMINISTRACIÓN</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("ADMINISTRACION_EMPRESAS") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('d93b739c5a3b35e8f62570f0bad59cc3') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones1.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('d93b739c5a3b35e8f62570f0bad59cc3')}}">
                                            <span class = 'FirstText Cursor'>Empresas</span>
                                        </a>
                                    </li>
                                @endif
                                @if( session("ADMINISTRACION_CONTABILIDAD") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('0e0973bff4eb188c176093009025eb79') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('0e0973bff4eb188c176093009025eb79')}}">
                                            <span class = 'FirstText Cursor'>Contabilidad</span>
                                        </a>
                                    </li>
                                @endif
                                @if( session("ADMINISTRACION_FINANCIERA") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('f6ff70ca67c797a58f3acaf06e552835') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('f6ff70ca67c797a58f3acaf06e552835')}}">
                                            <span class = 'FirstText Cursor'>Financiera</span>
                                        </a>
                                    </li>
                                @endif
                                @if( session("ADMINISTRACION_RECURSOS_HUMANOS") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('2b0f099be8b183340e16eb5370c91799') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('2b0f099be8b183340e16eb5370c91799')}}">
                                            <span class = 'FirstText Cursor'>Recursos Humanos</span>
                                        </a>
                                    </li>
                                @endif
                            </ul>
                        </li>
                        @endif
                        
                        @if( session("_TRAFICO") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/09_Trafico.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon'>
                                        <span class = 'Menu FirstText'>TRÁFICO</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("TRAFICO_CLIENTE") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('08e205ac22a40354eabb20f5b2818fea') }}">
                                            <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('08e205ac22a40354eabb20f5b2818fea')}}">
                                            <span class = 'FirstText Cursor'>Clientes</span>
                                        </a>
                                    </li>
                                @endif
                                
                                @if( session("TRAFICO_ADMINISTRATIVO") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('0e304c495ec61f6403b7a4a6bb310dc1') }}">
                                            <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('0e304c495ec61f6403b7a4a6bb310dc1')}}">
                                            <span class = 'FirstText Cursor'>Administrativo</span>
                                        </a>
                                    </li>
                                @endif
                                
                                @if( session("CALENDARIO") === session("keyUser") )
                                    <!--<li >
                                        <a href="{{ route('33ae9aefcee34af505947a77a8914010') }}">
                                            <?php //echo '<img src ="'.url("/").'/images/menu/_Trafico.png" class = "IconMenuP"/>' ?>
                                        </a>
                                        <a href="{{route('33ae9aefcee34af505947a77a8914010')}}">
                                            <span class = 'FirstText Cursor'>Calendario</span>
                                        </a>
                                    </li>-->
                                @endif
                                
                                @if( session("REPORTES") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('4828a527766d17057834147156e99fd7') }}">
                                            <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('4828a527766d17057834147156e99fd7')}}">
                                            <span class = 'FirstText Cursor'>Reportes</span>
                                        </a>
                                    </li>
                                @endif
                            </ul>

                        </li>
                        @endif
                        
                        @if( session("_PRODUCCION") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/10_Produccion.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>PRODUCCIÓN</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("PRODUCCION_APROBACIONES") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('698fccc49d554db04ba50cd5aab3da06') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('698fccc49d554db04ba50cd5aab3da06')}}">
                                            <span class = 'FirstText Cursor'>Aprobaciones</span>
                                        </a>
                                    </li>
                                @endif
                                
                                @if( session("PRODUCCION_PPTOS") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('1c605c008b2322ae851b4a02dfcf38b6') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('1c605c008b2322ae851b4a02dfcf38b6')}}">
                                            <span class = 'FirstText Cursor'>Presupuestos</span>
                                        </a>
                                    </li>
                                @endif
                                
                                @if( session("PRODUCCION_REPORTES") === session("keyUser") )
                                    <li >
                                        <a href="{{ route('e4d786cf849dddcbc98a326f38d80aeb') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('e4d786cf849dddcbc98a326f38d80aeb')}}">
                                            <span class = 'FirstText Cursor'>Reportes</span>
                                        </a>
                                    </li>
                                @endif
                            </ul>

                        </li>
                        @endif
                        
                        
                        @if( session("_INFORMES_GERENCIALES") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/11_Informes.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>INFORMES</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("INFORMES_DATOS") === session("keyUser") )
                                <li >
                                    <a href="{{ route('794f24c22fbc45ef5645f7af8aa5bbee') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('794f24c22fbc45ef5645f7af8aa5bbee')}}">
                                        <span class = 'FirstText Cursor'>Datos</span>
                                    </a>
                                </li>
                                @endif
                                
                                @if( session("INFORMES_TRAFICO_ADMINISTRATIVO") === session("keyUser") )
                                <li >
                                    <a href="{{ route('9108fac393d670d65ea728bffec75e0d') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('9108fac393d670d65ea728bffec75e0d')}}">
                                        <span class = 'FirstText Cursor'>Tráfico Administrativo</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_TRAFICO") === session("keyUser") )
                                <li >
                                    <a href="{{ route('68d494a0120d4445b3ece16814a0aed1') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('68d494a0120d4445b3ece16814a0aed1')}}">
                                        <span class = 'FirstText Cursor'>Tráfico Agencia</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_CLIENTES") === session("keyUser") )
                                <li >
                                    <a href="{{ route('e200749db9d6cb79b9b9ee109f56c4d0') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('e200749db9d6cb79b9b9ee109f56c4d0')}}">
                                        <span class = 'FirstText Cursor'>Tráfico Clientes</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_HORAS_HOMBRE") === session("keyUser") )
                                <li >
                                    <a href="{{ route('4b9d7de34432762c2027f4a9095a5e7d') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('4b9d7de34432762c2027f4a9095a5e7d')}}">
                                        <span class = 'FirstText Cursor'>Horas Hombre</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_BANCOS") === session("keyUser") )
                                <li >
                                    <a href="{{ route('e200749db9d6cb79b9b9ee109f56c4d0') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('e200749db9d6cb79b9b9ee109f56c4d0')}}">
                                        <span class = 'FirstText Cursor'>Bancos</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_PRODUCCION") === session("keyUser") )
                                <li >
                                    <a href="{{ route('e200749db9d6cb79b9b9ee109f56c4d0') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('e200749db9d6cb79b9b9ee109f56c4d0')}}">
                                        <span class = 'FirstText Cursor'>Producción</span>
                                    </a>
                                </li>
                                @endif
                            </ul>
                        </li>
                        @endif
                        
                        @if( session("_CLIENTES") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/12_Clientes.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>CLIENTES</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("CLIENTES_CONSULTAR_SOLICITUD") === session("keyUser") )
                                <li >
                                    <a href="{{ route('e200749db9d6cb79b9b9ee109f56c4d0') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('e200749db9d6cb79b9b9ee109f56c4d0')}}">
                                        <span class = 'FirstText Cursor'>Clientes</span>
                                    </a>
                                </li>
                                @endif
                                
                                @if( session("CLIENTES_EVALUACION_SOLICITUD") === session("keyUser") )
                                <li >
                                    <a href="{{ route('e200749db9d6cb79b9b9ee109f56c4d0') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('e200749db9d6cb79b9b9ee109f56c4d0')}}">
                                        <span class = 'FirstText Cursor'>Agencia</span>
                                    </a>
                                </li>
                                @endif
                            </ul>
                            
                        </li>
                        @endif
                        
                        @if( session("_DIRECTORIO") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = 'logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/13_Directorio.png" class = "IconMenuP" onclick = "FormDirectorios()"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText' onclick = "FormDirectorios()">DIRECTORIO</span>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        @endif
                        
                        @if( session("_NOTIFICACIONES") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = 'logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/14_Notificaciones.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>NOTIFICACIONES</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'SubMenuMod'>
                                @if( session("_NOTIFICACIONES") === session("keyUser") )
                                    <li >
                                        <a href="#" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "FormNovedades()">
                                            <?php echo '<img src ="'.url("/").'/images/options/notificacion.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="#" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "FormNovedades()">
                                            <span class = 'FirstText Cursor'>Enviar Mensajes</span>
                                        </a>
                                    </li>
                                @endif
                                @if( session("_NOTIFICACIONES") === session("keyUser") )
                                    <li >
                                        <a href="#" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "FormMisNotificaciones()">
                                            <?php echo '<img src ="'.url("/").'/images/options/notificacion.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="#" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "FormMisNotificaciones()">
                                            <span class = 'FirstText Cursor'>Mis Notificaciones</span>
                                        </a>
                                    </li>
                                @endif
                            </ul>
                        </li>
                        
                        @endif
                        
                        @if( session("_HORAS_HOMBRE") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = 'logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/15_Horashombre.png" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "HorasHombreEmpleado()"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText' data-toggle="modal" data-target="#ModalEdit" onclick = 'HorasHombreEmpleado()'>HORAS HOMBRE</span>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        @endif
                        
                        @if( session("_CALENDARIO") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = 'logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/16_Calendario.png"  data-toggle="modal" data-target="#ModalEdit" onclick = "CalendarioActividades()" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText' onclick = "CalendarioActividades()"  data-toggle="modal" data-target="#ModalEdit" >CALENDARIO</span>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        @endif
                    </ul>
                </div>
            </div>
            @yield('content')
        </div>


        <div class="modal fade" id="ModalEdit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm" >
                <div class="content_modal modal-content">

                </div>
            </div>
        </div>
        <div class="modal fade" id="ModalEdit2" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit2" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm2" >
                <div class="content_modal2 modal-content">

                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalEdit3" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit3" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm33" >
                <div class="content_modal33 modal-content">

                </div>
            </div>
        </div>

        <div class="modal fade" id="myModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm3" >
                <div class="content_modal3 modal-content">

                </div>
            </div>
        </div>

        <div id="spinner" class="spinner" style="display:none;">
            <?php echo '<img id="img-spinner" onerror=this.src="'.url("/").'/images/Cargando.gif" src="'.url("/").'/images/Cargando.gif" alt="Cargando..."/>' ?>
        </div>
        {{ csrf_field() }}

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.es.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/popper.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>



        <script>

        $(document).ready(function () {
            $(".TextLogIcon").hide()
            
            $(".ContenedorMenuF").on('mouseover',function(){
                $(".TextLogIcon").show()
            })
            $(".BarraBuscarSubMenu").css({
                'left': $(".vl").width()+5,
                'top':5,
                'width': $(".body").width() - $(".vl").width() - $(".MenuTop").width() - 10
            })
            $("body,.ContentPanel,.vl,.ContentBody").on('mouseover',function(){
                $(".ContentPanel").css({
                    'left': $(".vl").width()+25,
                    'top':150,
                    'height': $(".vl").height()-130,
                    'width':$("body").width()-10-$(".vl").width(),
                    'overflow-y':'scroll'
                })
                $(".BarraBuscarSubMenu").css({
                    'left': $(".vl").width()+5,
                    'top':5,
                    'width': $(".body").width() - $(".vl").width() - $(".MenuTop").width() - 10
                })
            })
            /*var TamFoto = ($("body").height() * 280)/625;
                
            $(".PUserBienvenida").css({
                'height': TamFoto+'px',
            })*/
        
            $(".ContenedorMenuF .OpcionesMenuUsuario").click(function(){
                $(".OpcionesMenuUsuario,.SubMenuMod").css({
                    'background': 'transparent',
                    'border-left': '0px',
                    'border-top-left-radius': '3em',
                    'border-bottom-left-radius': '3em',
                    'padding-left': '5px'
                })
                $(".SubMenuMod").hide()
                $(".FirstText").show()
                
                
                $(".ContentPanel").css({
                    'left': $(".vl").width()+50,
                    'top':120,
                    'height': $(".vl").height()-130,
                    'width':$("body").width()-10-$(".vl").width(),
                    'overflow-y':'scroll'
                })
                if(!$(this).next().is(":visible"))
                {
                    $(this).next().slideDown();
                    $(this).find('.Menu').show();
                    $(this).css({
                        'background': '#003545',
                        'border-left': '5px solid lightgreen',
                        'padding-left': '15px'
                    })
                }
                
            })
            
            $("#accordian ul ul").hide();
            $(".vl").css({'overflow-y':'scroll'})
            $(".IndicadorMenu").css({'left':$(".vl").width()+35})
            
            $("body").scrollTop();
            $("body").resize(function(){
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            })
            
            $( window ).resize(function() {
                $(".IndicadorMenu").css({'left':$(".vl").width()+35})
                $(".ContentPanel").css({
                    'width':$("body").width()-10-$(".vl").width()
                })
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
                
            })
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            $(".TabsMenu_Tabs li").css({
                'background-color':'#1B4075'
            })
        });

    </script>
    </body>
</html>
