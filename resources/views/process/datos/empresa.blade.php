@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')

    <div class ='ContentSubMolButton'>
        @if( session("INFORMACION_EMPRESA_CREAR") === session("keyUser") )
        <table width ='100%' class = 'ContenedorLink'>
            <tr>
                <td class = 'CenterText'>
                    <img src ='images/EMPRESAS_ICONO_CREAR.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="CrearEmpresa('{{route('b1e2cfd036f53feffcd197b03ef6f60e')}}')" />
                </td>
                <td >
                    <span class="Cursor" data-toggle="modal" data-target="#ModalEdit" onclick="CrearEmpresa('{{route('b1e2cfd036f53feffcd197b03ef6f60e')}}')">Nueva Empresa</span>
                </td>
            </tr>
        </table>
        @endif
    </div>
    <hr>
    <div class = 'form-row'>
        <div class='col col-sm-2 my-2'>
            <label for='OTC_TextBusqueda'>Estado:</label>
            <select type = 'text' class = 'form-control' id = 'Param_Estado' name = 'Param_Estado' required>
                <option selected value ='1'>Activo</option>
                <option  value ='0'>Inactivo</option>
            </select>
        </div>
        <div class='col col-sm-2 my-2'>
            <label for='OTC_TextBusqueda'>Texto:</label>
            <input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTC_TextBusqueda' name = 'OTC_TextBusqueda' />
        </div>
        <div class='col col-sm-1 my-4' style = 'vertical-align:middle;'>
            <p></p>
            <img src ='images/lupa.png' id class = 'Cursor' style='height:30px'  onclick = '__ListarEstructuraEmpresa()'/>
        </div>
    </div>
    <div class = ' ContDetallesTabla ' style = 'overflow-y:scroll;border:0px;'>
    </div>
    
</div>
<input type = 'hidden' class = '_PEstado' value = '{{session("INFORMACION_EMPRESA_ESTADO")}}' />

<?php echo '<script type="text/javascript" src="js/Datos/empresa.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        $(".FormatNumbers").each(function(){
            $(this).text( formatNumber.new( $(this).text() ));
        })

        $(".TModuloReversa").text("DATOS")
        $(".TSubmodulo").text("DATOS - EMPRESA")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"f712f056a60e6ea60b9195f04d3c4d74")

        __ListarEstructuraEmpresa()
    });
</script> 
@endsection
