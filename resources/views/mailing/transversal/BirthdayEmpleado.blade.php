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
                    <img src ='http://process.grupotesta.com.co/Content/template/images/copy.png' height = '50px'/>
                </td>
            </tr>
        </table>
        <br>
        <div class = 'BodyInf'>
            <h3>{{$Asunto}}</h3>
            
            <hr>
            
            <table class = 'Cabecera'>
                <tr>
                    <td style = 'width:100%;text-align: center;'>
                        <div style = 'margin: 0 auto;height:600px;width:80%;background-image: url("http://process.grupotesta.com.co:8989/PProcess3/public/images/_TarjetaBirthday.png"); background-repeat: none; text-align: center; '>
                            <img src ="http://process.grupotesta.com.co:8989/PProcess3/public/../storage/app/datos/Empleados/{{$Hash}}/{{$Foto}}" style ='height: 180px;position:fixed;top:25%;left:40%;' />
                            
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <p style = 'color:red;font-size:30px;'>{{$NombreCumple}}</p>
                            <p>{{$Cargo}}</p>
                        </div>
                    </td>
                </tr>
            </table>
            
        </div>
    </div>
</body>
</html>
