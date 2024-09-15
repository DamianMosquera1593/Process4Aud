@extends('layouts.inicio_process')

@section('content')
    <br>
        <div class = 'container-fluid ContenedorUser flex-center position-ref '>
            <table width ='100%'>
                <tr>
                    <td class = 'align-content-lg-start' width='33%'>
                        <img src="images/process_white.png" height="50px"/>
                    </td>
                    <td width='33%'>
                        <table>
                            <tr>
                                <td rowspan="3" width='auto' >
                                    <img class ='rounded-circle' src="images/pp.jpg" height="80px"/>
                                </td>
                            </tr>
                            <tr>
                                <td class = 'align-content-lg-start align-bottom nameUser'>LINA ZAMORA</td>
                            </tr>
                            <tr>
                                <td class = 'align-content-lg-start align-top jobUser'>DIRECTORA FINANCIERA</td>
                            </tr>
                        </table>
                    </td>
                    <td width='33%'>
                        <table class = 'TableBarMenu'width = '100%;'>
                            <tr>
                                <td class = 'CenterText BarLineTd' width = '25%'>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Directorio">
                                        <img src="images/options/directorio.png" class = 'IconBarMenu'/>
                                    </a>
                                </td>
                                <td class = 'CenterText BarLineTd' width = '25%'>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Notificaciones">
                                        <img src="images/options/notificacion.png" class = 'IconBarMenu'/>
                                    </a>
                                </td>
                                <td class = 'CenterText BarLineTd' width = '25%'>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Horas Hombre">
                                        <img src="images/options/hh.png" class = 'IconBarMenu'/>
                                    </a>
                                </td>
                                <td class = 'CenterText' width = '25%'>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Cerrar Sesión">
                                        <img src="images/options/cerrarsesion.png" class = 'IconBarMenu'/>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class = 'flex-center'>
            <img src ='images/process.png' height="120px"/>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class = 'flex-center'>
            @if( session("_DATOS") === session("keyUser") )
            <div class="col-sm-2 container CenterText" >
                    <img src='images/menu/Datos2.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Datos.png' height="200px"/>
                </div>
            </div>
            @endif
            
            @if( session("_ADMINISTRATIVO") === session("keyUser") )
            <div class="col-sm-2 container CenterText">
                    <img src='images/menu/Administracion2.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Administracion.png' height="200px"/>
                </div>
            </div>
            @endif
            
            @if( session("_TRAFICO") === session("keyUser") )
            <div class="col-sm-2 container CenterText">
                    <img src='images/menu/Trafico2.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Trafico.png' height="200px"/>
                </div>
            </div>
            @endif
            
            @if( session("_PRODUCCION") === session("keyUser") )
            <div class="col-sm-2 container CenterText">
                    <img src='images/menu/Produccion2.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Produccion.png' height="200px"/>
                </div>
            </div>
            @endif
            
            @if( session("_INFORMES_GERENCIALES") === session("keyUser") )
            <div class="col-sm-2 container CenterText">
                    <img src='images/menu/Informes2.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Informes.png' height="200px"/>
                </div>
            </div>
            @endif
            @if( session("_CLIENTES") === session("keyUser") )
            <div class="col-sm-2 container CenterText">
                    <img src='images/menu/Clientes1.png' class="image" height="200px"/>
                <div class="overlay">
                    <img class="text"src='images/menu/_Clientes.png' height="200px"/>
                </div>
            </div>
            @endif
        </div>
@endsection