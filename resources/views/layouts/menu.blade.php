<table width ='100%' class ='ContenedorPlataforma'>
    <tr>
        <td class = 'vl'>
            <br>
            <div class = 'CenterText'>
                <a href="{{route('bienvenida')}}" >
                    <?php echo '<img src ="'.url("/").'/images/LogoUProcess.png" class = "IconMenuP"/>' ?>
                </a>
            </div>
            <p></p>
            <div id="accordian" class = 'ContenedorMenuF'>
                <ul>                    
                    @if( session("_DATOS") === session("keyUser") || session("_ADMINISTRATIVO") === session("keyUser") )
                            <li >
                                <table class ='OpcionesMenuUsuario' width = '100%'>
                                    <tr>
                                        <td class = 'logIcon' >
                                            <?php echo '<img src ="'.url("/").'/images/menu/CARGADATOS_ICONO.png" class = "IconMenuP"/>' ?>
                                        </td>
                                        <td class = 'TextLogIcon' >
                                            <span class = 'Menu FirstText'>ADMINISTRATIVO</span>
                                        </td>
                                    </tr>
                                </table>
                                <ul class = 'HiddenInformation SubMenuMod'>
                                    @if( session("_DATOS") === session("keyUser") )
                                        <li >
                                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                                <tr>
                                                    <td class = 'logIcon' >
                                                        <a href="{{ route('f712f056a60e6ea60b9195f04d3c4d74') }}">
                                                            <?php echo '<img src ="'.url("/").'/images/menu/CARGADATOS_ICONO.png" class = "IconMenuP"/>' ?>
                                                        </a>
                                                    </td>
                                                    <td class = 'TextLogIcon' >
                                                        <a href="{{ route('f712f056a60e6ea60b9195f04d3c4d74') }}">
                                                            <span class = 'FirstText Cursor'>DATOS</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </li>
                                    @endif
                                    @if( session("_ADMINISTRATIVO") === session("keyUser") )
                                        <li >
                                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                                <tr>
                                                    <td class = 'logIcon' >
                                                        <a href="{{ route('d93b739c5a3b35e8f62570f0bad59cc3') }}">
                                                            <?php echo '<img src ="'.url("/").'/images/menu/ADMINISTRACIOON_ICONO.png" class = "IconMenuP"/>' ?>
                                                        </a>
                                                    </td>
                                                    <td class = 'TextLogIcon' >
                                                        <a href="{{ route('d93b739c5a3b35e8f62570f0bad59cc3') }}">
                                                            <span class = 'FirstText Cursor'>ADMINISTRACION &nbsp;&nbsp;</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/TRAFICO_ICONO.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon'>
                                        <span class = 'Menu FirstText'>TRAFICO</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'HiddenInformation SubMenuMod'>
                                @if( session("TRAFICO_CLIENTE") === session("keyUser") )
                                    
                                    <li >
                                        <table class ='OpcionesMenuUsuario' width = '100%'>
                                            <tr>
                                                <td class = 'logIcon' >
                                                    <a href="{{ route('08e205ac22a40354eabb20f5b2818fea') }}">
                                                        <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP"/>' ?>
                                                    </a>
                                                </td>
                                                <td class = 'TextLogIcon' >
                                                    <a href="{{ route('08e205ac22a40354eabb20f5b2818fea') }}">
                                                        <span class = 'FirstText Cursor'>Clientes</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </li>
                                @endif
                                
                                @if( session("TRAFICO_ADMINISTRATIVO") === session("keyUser") )
                                    <li >
                                        <table class ='OpcionesMenuUsuario' width = '100%'>
                                            <tr>
                                                <td class = 'logIcon' >
                                                    <a href="{{ route('0e304c495ec61f6403b7a4a6bb310dc2') }}">
                                                        <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP"/>' ?>
                                                    </a>
                                                </td>
                                                <td class = 'TextLogIcon' >
                                                    <a href="{{ route('0e304c495ec61f6403b7a4a6bb310dc2') }}">
                                                        <span class = 'FirstText Cursor'>Administrativo</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
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
                                        <table class ='OpcionesMenuUsuario' width = '100%'>
                                            <tr>
                                                <td class = 'logIcon' >
                                                    <a href="{{ route('4828a527766d17057834147156e99fd7') }}">
                                                        <?php echo '<img src ="'.url("/").'/images/menu/17_Aprobaciones.png" class = "IconMenuP"/>' ?>
                                                    </a>
                                                </td>
                                                <td class = 'TextLogIcon' >
                                                    <a href="{{ route('4828a527766d17057834147156e99fd7') }}">
                                                        <span class = 'FirstText Cursor'>Reportes</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/PRODUCCIOON_ICONO.png" class = "IconMenuP"/>' ?>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>PRODUCCION</span>
                                    </td>
                                </tr>
                            </table>
                            <ul class = 'HiddenInformation SubMenuMod'>
                                @if( session("PRODUCCION_APROBACIONES") === session("keyUser") )
                                    <!--<li >
                                        <a href="{{ route('698fccc49d554db04ba50cd5aab3da06') }}">
                                            <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                        </a>
                                        <a href="{{route('698fccc49d554db04ba50cd5aab3da06')}}">
                                            <span class = 'FirstText Cursor'>Aprobaciones</span>
                                        </a>
                                    </li>-->
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
                                        
                                        <a href="{{ route('794f24c22fbc45ef5645f7af8aa5bbee') }}">
                                            <?php echo '<img src ="'.url("/").'/images/menu/INFORMES_ICONO.png" class = "IconMenuP"/>' ?>
                                        </a>
                                    </a>
                                    </td>
                                    <td class = 'TextLogIcon' >
                                        <span class = 'Menu FirstText'>REPORTES</span>
                                    </td>
                                </tr>
                            </table>
                            <!--<ul class = 'SubMenuMod'>
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
                                        <span class = 'FirstText Cursor'>Trafico Administrativo</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_TRAFICO") === session("keyUser") )
                                <li >
                                    <a href="{{ route('68d494a0120d4445b3ece16814a0aed1') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('68d494a0120d4445b3ece16814a0aed1')}}">
                                        <span class = 'FirstText Cursor'>Trafico Agencia</span>
                                    </a>
                                </li>
                                @endif
                                @if( session("INFORMES_TRAFICO") === session("keyUser") )
                                <li >
                                    <a href="{{ route('68d494a0120d4445b3ece16814a0aed1') }}">
                                        <?php echo '<img src ="'.url("/").'/images/Datos_Opciones.png" class = "IconMenuP2"/>' ?>
                                    </a>
                                    <a href="{{route('68d494a0120d4445b3ece16814a0aed1')}}">
                                        <span class = 'FirstText Cursor'>Informe Global</span>
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
                                        <span class = 'FirstText Cursor'>Produccion</span>
                                    </a>
                                </li>
                                @endif
                            </ul>-->
                        </li>
                        @endif
                        
                        @if( session("_CLIENTES") === session("keyUser") )
                        <li>
                            <table class ='OpcionesMenuUsuario' width = '100%'>
                                <tr>
                                    <td class = ' logIcon' >
                                        <?php echo '<img src ="'.url("/").'/images/menu/CLIENTES_ICONO.png" class = "IconMenuP"/>' ?>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/DIRECTORIO_ICONO.png" class = "IconMenuP" onclick = "FormDirectorios()"/>' ?>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/NOTIFICACIONES_ICONO.png" class = "IconMenuP"/>' ?>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/HORAS HOMBRE_ICONO.png" data-toggle="modal" data-target="#ModalEdit" class = "IconMenuP" onclick = "HorasHombreEmpleado()"/>' ?>
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
                                        <?php echo '<img src ="'.url("/").'/images/menu/CALENDARIO_ICONO.png"  data-toggle="modal" data-target="#ModalEdit" onclick = "CalendarioActividades()" class = "IconMenuP"/>' ?>
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
        </td>
        <td class = 'vl2'>
            <div class = 'Body_Body'>
                @yield('content')
            </div>
        </td>
    </tr>
</table>