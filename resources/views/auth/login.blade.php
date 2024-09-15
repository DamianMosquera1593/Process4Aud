

@extends('layouts.general')

@section('content')
<!--
-->

<table cellpadding="0" cellspacing="0" style="height:100%;width:100%;" >
    <tr>
        <td width = '50%' class = 'LeftLogin'>
            <?php //echo '<center><img class = "ImgPro" style = ""height = "400px" src="'.url("/").'/image/BIENVENIDO_LOGO.png" /></center>' ?>
        </td>
        <td width = '50%' class = 'RigthLogin'>
            <table id = 'Titulo' style = 'position:fixed;top:15%;left:-10%;'width = "100%">
                <tr>
                    <td style = 'width:70%;'></td>
                    <td class = 'CenterText'>
                        
                        
                        
                        <?php echo '<center><img class = "ImgPro" height = "150px" src="'.url("/").'/images/LogoUProcess.png" /></center>' ?>
                        <br>
                        <br><br>
                        <p class = 'InicioSesion'>Iniciar sesión</p>
                        <br>
                        <br><br>
                        <form class="form-signin " method="POST" action="{{ route('login')}}">
                            {{ csrf_field() }}
                            <label for="User" class="sr-only">Usuario:</label>
                            <input class = 'LoginInputs' autocomplete="off" type="text" id="User" name = "User" class="form-control CenterText {{ $errors->has('User') ? 'error':''}}" style = 'width:100%;' placeholder="Usuario" autofocus="">
                            {!! $errors->first('User','<span class ="help-block">:message</span>')!!}
                            <p></p>
                            <label for="inputPassword" class="sr-only">Contraseña:</label>
                            <input class = 'LoginInputs' type="password" id="inputPassword" name = "inputPassword" class="form-control CenterText {{ $errors->has('inputPassword') ? 'error':''}}" style = 'width:100%;' placeholder="Contraseña" >
                            {!! $errors->first('inputPassword','<span class ="help-block">:message</span>')!!}
                            <p></p>
                            <br>
                            <div class = 'flex-center'><button class="Ingreso" type="submit">Ingresar</button></div>
                          </form>
                        <p style = 'color:red;'></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
@endsection
