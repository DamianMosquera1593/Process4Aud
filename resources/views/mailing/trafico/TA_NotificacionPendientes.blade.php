<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>{{$Asunto}}</title>
    <style>
        .ContentPanelCorreo{
            padding-left:5%;
            padding-right:5%;
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
                    <td class = 'Concepto' style = 'width:100%;text-align:center;'>PENDIENTES ADMINISTRATIVOS CON FECHA DE ENTREGA DE HOY</td>
                </tr>
            </table>
            <table class = 'tableNew' style = 'width:100%;'>
                <tr>
                    <th>No.</th>
                    <th>Canal</th>
                    <th>Grupo</th>
                    <th>Subgrupo</th>
                    <th>Nombre Tarea</th>
                    <th>Tarea</th>
                    <th>Fecha Entrega</th>
                </tr>
                @foreach( $Datos as $t )
                <tr>
                    <td class = 'Concepto'style = 'text-align:center;'>{{$t->No}}</td>
                    <td class = 'Concepto'>{{$t->Canal}}</td>
                    <td class = 'Concepto'>{{$t->Grupo}}</td>
                    <td class = 'Concepto'>{{$t->SubGrupo}}</td>
                    <td class = 'Concepto'>{{$t->NombreTarea}}</td>
                    <td class = 'Concepto'>{{$t->Tarea}}</td>
                    <td class = 'Concepto' style = 'text-align:center;'>{{$t->FechaEntrega}}</td>
                </tr>
                @endforeach
            </table>
        </div>
    </div>
</body>
</html>
