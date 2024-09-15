@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    <table >
        <tr>
                
        {{ csrf_field() }}
        @if( session("INFORMACION_BANCOS_CREAR") === session("keyUser") )
                <td>
                    <div class ='ContentSubMolButton'>
                        <table width ='100%' class = 'ContenedorLink'>
                            <tr>
                                <td class = 'CenterText'>
                                    <img src ='images/AGREGAR_ICONO.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="CrearBanco('{{route('85eb0e846da426a471ef8d459055eeb4')}}')" />
                                </td>
                                <td >
                                    <span class="Cursor" onclick = "CrearBanco('{{route('85eb0e846da426a471ef8d459055eeb4')}}')" data-toggle="modal" data-target="#ModalEdit"> Nuevo Banco </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
        @endif
        </tr>
    </table>
    <table id = "Propietarios" class="dataTable tableNew">
        <thead>
            <tr>
                <th width = '130px'>Nit</th>
                <th >Nombre Comercial</th>
                <th >Nombre Legal </th>
                @if( session("INFORMACION_BANCOS_LEGAL") === (session("keyUser")) )
                    <th>Legal</th>
                @endif
                @if( session("INFORMACION_BANCOS_CONTACTOS") === (session("keyUser")) )
                    <th>Contactos</th>
                @endif
                @if( session("INFORMACION_BANCOS_PRODUCTOS") === (session("keyUser")) )
                    <!--<th>Productos</th>-->
                @endif
                @if( session("INFORMACION_BANCOS_ESTADO") === (session("keyUser")) )
                    <th>Estado</th>
                @endif
            </tr>
        </thead>
        @foreach($datos['Bancos'] as $Doc)
            <tr>
                <td >{{ $Doc->Nit }}</td>
                <td class = 'NameComercial{{ $Doc->Hash }}'>{{ $Doc->NombreComercial }}</td>
                <td >{{ $Doc->NombreLegal }}</td>
                @if( session("INFORMACION_BANCOS_LEGAL") === (session("keyUser")) )
                    <td class = 'CenterText' >
                        <img src = "images/datos_legal1.png" class = "OptionIcon" data-toggle="modal" data-target="#ModalEdit" onclick = "InformacionLegalBanco('{{ $Doc->Hash }}','{{session('keyUser')}}', '{{route('dc8e734b81e0b7f8d61b9efcfa121c98')}}')"/>
                    </td>
                @endif
                @if( session("INFORMACION_BANCOS_CONTACTOS") === (session("keyUser")) )
                    <td class = 'CenterText'>
                        <img src = "images/datos_contactos.png" class = "OptionIcon" data-toggle="modal" onclick = "contactosBancos('{{ $Doc->Hash }}','{{session('keyUser')}}')"  data-target="#ModalEdit"/>
                    </td>
                @endif
                @if( session("INFORMACION_BANCOS_PRODUCTOS") === (session("keyUser")) )
                    <!--<td class = 'CenterText'>
                        <img src = "images/productos_clientes.png" class = "OptionIcon" data-toggle="modal" onclick = "InformacionTarifarioBanco()"  data-target="#ModalEdit"/>
                    </td>-->
                @endif
                <td class ="CenterText">
                    <div onclick="EstadoBanco('{{ $Doc->Hash }}','{{route('5496ed1991b2fec4c36adb3ef9108229')}}')">
                        @if (session("INFORMACION_BANCOS_ESTADO") === session("keyUser"))
                            @if (intval($Doc->Estado) === 1)
                                <img src ="images/_activo.png" class = "OptionIcon" />
                            @else
                                <img src ="images/_inactivo.png" class = "OptionIcon" />
                            @endif
                        @else
                            @if ($Doc->Estado === 1)
                                Activo
                            @else
                                Inactivo
                            @endif
                        @endif
                    </div>
                </td>
            </tr>
        @endforeach
    </table>
</div>



<?php echo '<script type="text/javascript" src="js/Datos/bancos.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script>
    $(document).ready(function () {
        $(".TModuloReversa").text("DATOS")
       $(".TSubmodulo").text("BANCOS")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"f712f056a60e6ea60b9195f04d3c4d74")
    });
</script> 
@endsection
