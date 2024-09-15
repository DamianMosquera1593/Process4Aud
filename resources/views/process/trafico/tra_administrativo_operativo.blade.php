@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <div class = 'form-row ParamTrafico'>
        
    </div>
    <div class = 'HiddenInformation _ParamTraficosOptions' >
        <table width = '100%'>
            <tr>
                <td class = 'CentertText' nowrap>
                    <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'CrearCanalTraAdministrativo()' data-toggle='modal' data-target='#ModalEdit'/>
                    <span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearCanalTraAdministrativo()' data-toggle='modal' data-target='#ModalEdit'>Crear Canal</span>
                </td>
                <td class = 'CentertText' nowrap>
                    <img src ='images/datos_reordenar.png' class = 'OptionIcon' onclick = 'OrdenarCanalesTA()' data-toggle='modal' data-target='#ModalEdit'/>
                    <span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarCanalesTA()' data-toggle='modal' data-target='#ModalEdit'>Organizar Canales</span>
                </td>
            </tr>
        </table>
    </div>
    <div class = 'HiddenInformation _ParamProyectos'>
    
        @if( session("TRA_CLIENTES_OT_CREAR") === session("keyUser") )
        <div class ='ContentSubMolButton'>
            <table width ='100%' class = 'ContenedorLink'>
                <tr>
                    <td class = 'CenterText'>
                        <img src ='images/20_Crear_Nueva_OT.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="CrearOTTraCliente('{{route('f2fea7c587a30651fa3e1f5df8a6ac10')}}')" />
                    </td>
                    <td >
                        <span class="Cursor" data-toggle="modal" data-target="#ModalEdit" onclick="CrearOTTraCliente('{{route('f2fea7c587a30651fa3e1f5df8a6ac10')}}')">Nuevo Proyecto / OT</span>
                    </td>
                </tr>
            </table>
        </div>
        @endif
        <hr>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText'>
                    <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#8DC63F;border-radius:0.5em;'></div>
                    <span style = ''>Activo</span>
                </td>
                <td class = 'CenterText'>
                    <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#F4B919;border-radius:0.5em;'></div>
                    <span >Pendiente Revisión Cliente</span>
                </td>
                <td class = 'CenterText'>
                    <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#F47629;border-radius:0.5em;'></div>
                    <span >Stand By / Detenido</span>
                </td>
                <td class = 'CenterText'>
                    <div style = 'margin:0 auto;height: 25px;width:25px;background-color:#9F3C3F;border-radius:0.5em;'></div>
                    <span >Cerrado</span>
                </td>
            </tr>
        </table>
        <hr>
    </div>
    <div class = ' ContDetallesTabla ContentDataTA' style = 'overflow-y:scroll;border:0px;'>
    </div>
</div>

<input type = 'hidden' class = '_PEstado' value = '{{session("INFORMACION_EMPRESA_ESTADO")}}' />

<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_administrativo.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        $(".FormatNumbers").each(function(){
            $(this).text( formatNumber.new( $(this).text() ));
        })

        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
       $(".FormatNumbers").each(function(){
           $(this).text( formatNumber.new( $(this).text() ));
       })

       $(".TModuloReversa").text("BIENVENIDA")
       $(".TSubmodulo").text("TRÁFICO ADMINISTRATIVO")
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"Inicio")

       __ParamListClinetes()
       __EnrutadorTrafico()
    });
</script> 
@endsection
