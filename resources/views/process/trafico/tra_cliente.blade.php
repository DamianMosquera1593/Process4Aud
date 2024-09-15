
@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    

    <div class="clearfix my-3">
    <div class="float-right">
        <button type="button" class="btn" style = 'background-color:#8BC63E;color:white;'>
            Mis Pendientes <span class="badge badge-light" id="traTareasPendientes">-</span>
        </button>

        <button type="button" class="btn" style = 'background-color:#F5B918;color:white;'>
            Seguimiento <span class="badge badge-light" id="traTareasSeguimiento">-</span>
        </button>

        <button type="button" class="btn" style = 'background-color:#F3752A;color:white;'>
            Contestados <span class="badge badge-light" id="traTareasContestadas">-</span>
        </button>
        <button type="button" class="btn" style = 'background-color:#9F3B3E;color:white;'>
            Mi Gestión del Día <span class="badge badge-light" id="traTareasDia">-</span>
        </button>
    </div>

    <div class="ContenedorMenu">
        <div class = 'ContenedorOptionDiv PARDIV_ContentTRACLIENTEOT' style ='display:none;' >
        {{ csrf_field() }}
        @if( session("TRA_CLIENTES_OT_CREAR") === session("keyUser") )
            <div class = 'BarraIconos'>
                <table width ="100%">
                    <tr>
                        <td style = 'width:60%'>
                            <img src ='images/20_Crear_Nueva_OT.png' class = 'OptionIcon'onclick = "CrearOTTraCliente('{{route('f2fea7c587a30651fa3e1f5df8a6ac10')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                            <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearOTTraCliente('{{route('f2fea7c587a30651fa3e1f5df8a6ac10')}}')" data-toggle="modal" data-target="#ModalEdit">Crear Nueva OT</span>
                        </td>
                        <td style = 'width:40%'>
                            
                        </td>
                    </tr>
                </table>
            </div>
        @endif
        
        @if( session("TRA_CLIENTES_OT_CONSULTAR") === session("keyUser") )
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='OTC_Proyecto'>Proyecto OT:</label>
                    <select class ='form-control' name = 'OTC_Proyecto' id = 'OTC_Proyecto'>
                        <option value = '-1' >Todos</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='OTC_Estado'>Estado:</label>
                    <select class ='form-control' name = 'OTC_Estado' id = 'OTC_Estado'>
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected >Activo</option>
                        <option value = '0'>Inactivo</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='OTC_TextBusqueda'>Buscar:</label>
                    <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTC_TextBusqueda' name = 'OTC_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2' style = 'vertical-align:middle;'>
                    <p></p>
                    <img src ='images/35_Buscar.png' class = 'Cursor' style='height:30px'  onclick = 'BuscarTablaOTProyecto()'/>
                </div>
            </div>
            <br>
            <table width ='100%'>
                <tr>
                    <td class = 'CenterText'>
                        <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#8DC63F;border-radius:0.5em;'></div>
                        <span style = 'font-weight: bold;'>Activo</span>
                    </td>
                    <td class = 'CenterText'>
                        <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#F4B919;border-radius:0.5em;'></div>
                        <span style = 'font-weight: bold;'>Pendiente Revisión Cliente</span>
                    </td>
                    <td class = 'CenterText'>
                        <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#F47629;border-radius:0.5em;'></div>
                        <span style = 'font-weight: bold;'>Stand By / Detenido</span>
                    </td>
                    <td class = 'CenterText'>
                        <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#9F3C3F;border-radius:0.5em;'></div>
                        <span style = 'font-weight: bold;'>Cerrado</span>
                    </td>
                </tr>
            </table>
            <br>
            <div style = 'width:100%;overflow-x:scroll;'>
                <table class="dataTable tableNew responsive nowrap" id = 'TablaTraClienteOT'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Sel.</th>
                            <th>Codigo OT</th>
                            <th>Referencia</th>
                            <th>Director</th>
                            <th>Ejecutivo</th>
                            <th>Empresa</th>
                            <th>Cliente</th>
                            <th>Unidad De Negocio</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                </table>
            </div>
        @endif
    </div>
    @if( session("TRA_CLIENTES_OT") === session("keyUser") )
        </div>
    <br>
    @endif
</div>
</DIV>





<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_clientes.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Tráfico Cliente");
        
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".ContentPanel").css({
            'overflow-y':'unset'
        })
        $(".clearfix").css({
            'top':80
        })
        $(".ContentPanel").css({
            'top':100
        })

        $(".TModuloReversa").text("BIENVENIDA")
       $(".TSubmodulo").text("TRÁFICO")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"Inicio")

    });
</script> 
@endsection
