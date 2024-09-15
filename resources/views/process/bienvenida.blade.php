@extends('layouts.inicio_process')
@section('content')
@include('layouts.usuario')

<table class = 'UserIndicator' style = 'width:auto;'>
    <tr>
        <td style = 'padding-left:80px;'>
            <p></p>
            <span class = 'MensajeFoto'>Bienvenido,</span>
        </td>
    </tr>
    <tr>
        <td style = 'padding-left:80px;'>
            <span class = 'NombreUser'>{{ session("NameUser") }} </span>
        </td>
    </tr>
    <tr>
        <td style = 'padding-left:80px;'>
            <span class = 'MensajeFoto' style = 'font-size:40px;'>{{ session("JobUser") }} </span>
        </td>
    </tr>
</table>
<span class = 'ContadorNNA'></span>
<span class = 'ContadorPersonal'></span>


<script>
    
    $(document).ready(function () {
        $(".TituloPantalla").text("BIENVENIDA")
        $(".TiHeader").hide()
        ModalPendientes()
    });
    
</script>
@endsection