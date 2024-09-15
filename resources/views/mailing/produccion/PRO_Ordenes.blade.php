<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>{{$Asunto}}</title>
    <style>
        .ContentPanelCorreo{
            padding-left:10%;
            padding-right:10%;
        }
        body{
            background-color:#f8f8f8;
        }
        .CenterText{
            text-align:center;
        }
        .BodyInf{
            background-color:white;
            width:100%;
        }
        .Concepto{
            background-color:#f8f8f8;
            font-weight: bold;
            padding:5px;
            border: 1px solid #d0d0d0;
            width:15%;
        }
        .DetalleConcepto{
            padding:5px;
            width:15%;
        }
        .BodyInf{
            padding:5px;
        }
        .Separador{
            width:5px;
        }
        .Cabecera{
            width:100%;
        }
        .h3{
            font-family: Arial;
        }
    </style>
</head>
<body>
    <div class = 'ContentPanelCorreo' style="font-family:'Arial'">
        <table style="width:100%!important;height:100%;background-color:#005661;">
            <tr>
                <td class = 'CenterText'>
                    <img src ='http://process.grupotesta.com.co:8989/PProcess3/public/images/process_black.png' height = '50px'/>
                </td>
            </tr>
        </table>
        <br>
        <div class = 'BodyInf'>
            <h3>{{$Asunto}}</h3>
            
            <hr>
            <table class = 'Cabecera'>
                <tr>
                    <td class = 'Concepto' style = 'width:100%;'>{{$TipoEnvio}}</td>
                </tr>
            </table>
            <table class = 'Cabecera'>
                <tr>
                    <td >
                        @php
                            echo ($Descripcion);
                        @endphp
                    </td>
                </tr>
                <tr>
                    <td class = 'CenterText'>
                        <a href='{{$Link}}' target="_blank">
                            <img src ='http://process.grupotesta.com.co:8989/PProcess3/public/images/descarga.png' height = '50px'/>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
