@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')


</div>

@extends('layouts.inicio_process')

@section('content')


<div class="ContentPanel">
    <div class="panel-heading">
        <table >
            <tr>
                <td class = 'WhiteFont'>
                    TRÁFICO ADMINISTRATIVO
                </td>
            </tr>
        </table>
    </div>
    <div class="ContenedorMenu" style = 'border:0px;'>

        {{ csrf_field() }}
        <div class = 'ContentDataTA'></div>
    </div>
    <br>
    <br>
</div>

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
