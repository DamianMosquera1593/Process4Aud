<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROC3SS+</title>
        <link rel="icon" href="images/favicon.ico">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="css/all.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap4-toggle.min.css" rel="stylesheet">
        <?php echo '<link href="css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>
        <?php echo '<script src="//cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>'; ?>
        <?php echo '<script type="text/javascript" src = "js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>
        <?php echo '<script type="text/javascript" src = "js/dataTables.bootstrap4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/dataTables.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        
        <!-- Styles -->
        <style>
            html, body {
                /*background-color: #32383e;*/
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
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
    <body ><!--oncontextmenu="return false" onkeydown="return false"--> 
        
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <img src="images/process.png" height="45px"/>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                            <i class ="fa fa-database"></i>
                            Datos 
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li class="dropdown-submenu">
                                <a class="dropdown-item" href="{{ route('f9e892e9ea8f026ac7a9487452d012fd') }}">Información Empresas</a>
                            </li>
                            <li class="dropdown-submenu">
                                <a class="dropdown-item dropdown-toggle" href="#">Información Clientes</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Legal</a></li>
                                    <li><a class="dropdown-item" href="#">Contactos</a></li>
                                    <li><a class="dropdown-item" href="#">Fee</a></li>
                                    <li><a class="dropdown-item" href="#">Negociaciones</a></li>
                                    <li><a class="dropdown-item" href="#">Productos</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <a class="dropdown-item dropdown-toggle" href="#">Información Proveedores</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Legal</a></li>
                                    <li><a class="dropdown-item" href="#">Contactos</a></li>
                                    <li><a class="dropdown-item" href="#">Tarifario</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <a class="dropdown-item dropdown-toggle" href="#">Información Bancos</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Legal</a></li>
                                    <li><a class="dropdown-item" href="#">Contactos</a></li>
                                    <li><a class="dropdown-item" href="#">Productos</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <a class="dropdown-item dropdown-toggle" href="#">Parametrización</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="{{ route('7a55d71f10b208cb395561ea28779875') }}">Generales</a></li>
                                    <li><a class="dropdown-item" href="{{ route('8736e6f497a5e7b0e123ab42fc0258dc') }}">Empresa</a></li>
                                    <li><a class="dropdown-item" href="{{ route('66b7ab64d20f5e0f2635036e99352173') }}">Personal</a></li>
                                    <li><a class="dropdown-item" href="{{ route('3b62057ed4a6053f36077f3a0ee3d1ae') }}">Ppto General</a></li>
                                    <li><a class="dropdown-item" href="{{ route('6749704d28d45a5dfe071898f72a32d4') }}">Inventario</a></li>
                                    <li><a class="dropdown-item" href="{{ route('705e21f70252bdd71cc4bd7477556173') }}">Clientes</a></li>
                                    <li><a class="dropdown-item" href="{{ route('af65b15ddf7d8c9a42016f3917171b7d') }}">Proveedores</a></li>
                                    <li><a class="dropdown-item" href="{{ route('e038b329d2bfdefdcabb151e839b2b1d') }}">Bancos</a></li>
                                    <li><a class="dropdown-item" href="#">Roles</a></li>
                                    <li><a class="dropdown-item" href="#">Usuarios</a></li>
                                    <li><a class="dropdown-item" href="{{ route('856c55ae087e200b65b9a1bdaf897f01') }}">Seguridad y Sistemas</a></li>
                                    <li><a class="dropdown-item" href="{{ route('0c6dbf3f81b907922d3a1f693f24ad0a') }}">Tráfico</a></li>
                                    <li><a class="dropdown-item" href="#">Producción</a></li>
                                    <li><a class="dropdown-item" href="#">Horas Hombre</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                            <i class ="fa fa-cog"></i>
                            Administración 
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li class="dropdown-submenu">
                                <a class="dropdown-item dropdown-toggle" href="#">Empresa</a>
                                <ul class="dropdown-menu">
                                    <li class="dropdown-submenu">
                                        <a class="dropdown-item dropdown-toggle" href="#">
                                            <img src="images/process.png" height="35px"/>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li ><a class="dropdown-item" href="#">Legal</a></li>
                                            <li ><a class="dropdown-item" href="#">Unidades de Negocio</a></li>
                                            <li ><a class="dropdown-item" href="#">Clientes</a></li>
                                            <li ><a class="dropdown-item" href="#">Proveedores</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        
        @yield('content')
        
        <div class="modal fade" id="ModalEdit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm" >
                <div class="content_modal modal-content bg-info">

                </div>
            </div>
        </div>
        
        <?php echo '<script type="text/javascript" src = "js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    </body>
</html>