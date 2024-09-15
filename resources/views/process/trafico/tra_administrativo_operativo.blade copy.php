@extends('layouts.inicio_process')

@section('content')
<br>
<br>
<br>
<br>
<br>
<!--<div class="clearfix my-3">
    <div class="float-right">
        <button type="button" class="btn btn-primary" onclick="modalResponsables()">
            Responsables <span class="badge badge-light" onclick="modalResponsables()" id="traResponsables">-</span>
        </button>
    </div>
</div>-->

<div class="ContentPanel">
    
    <div class="ContenedorMenu" style = 'border:0px;'>
        {{ csrf_field() }}   
        <div >
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
        <br>
        <div class = 'ContentDataTA'></div>
    </div>
    <br>
    <br>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js" integrity="sha256-d3rtug+Hg1GZPB7Y/yTcRixO/wlI78+2m08tosoRn7A=" crossorigin="anonymous"></script>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Trafico/tra_administrativo.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Tráfico Administrativo");
        
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
        
    });
</script> 
@endsection
