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
        
        .tableNew th{
            color: #417EC1;
            font-weight: bold;
            text-align:center;
            padding:5px;
            font-size:14px;
            padding-bottom: 5px;
        }
        .tableNew td{
            background-color:#F1F2F2;
            color:black;
            border:1px solid #B7C5CE;
            border-spacing: 1px;
            padding:5px;
            font-size:12px;
            border-radius:0.3em;
            font-weight: bold;
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
            <p>Tiene un nuevo Presupuesto para su aprobación, ingrese a la plataforma y siga los siguientes pasos.</p>
            <p>1. Ingrese a Process.</p>
            <p>2. Haga clic en el módulo de Presupuesto.</p>
            <p>3. Haga clic en el módulo de Aprobaciones.</p>
            <p>4. Seleccione la opción de Presupuesto.</p>
            <p>5. Haga clic en el Botón del Consultar del Presupuesto # {{$NumPpto}}.</p>
        </div>
    </div>
</body>
</html>
