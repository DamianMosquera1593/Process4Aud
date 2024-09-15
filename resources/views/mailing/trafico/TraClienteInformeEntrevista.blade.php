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
        .ConceptoTitulos{
            background-color:#f8f8f8;
            font-weight: bold;
            padding:5px;
            text-align:center;
            border: 1px solid #d0d0d0;
            width:100%;
        }
        .ConceptoTitulos{
            background-color:#f8f8f8;
            font-weight: bold;
            padding:5px;
            text-align:center;
            border: 1px solid #d0d0d0;
            width:100%;
            font-size: 14px;
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
                    <img src ='http://process.grupotesta.com.co/Content/template/images/process_black.png' height = '50px'/>
                </td>
            </tr>
        </table>
        <br>
        <div class = 'BodyInf'>
            <h3>{{$Asunto}}</h3>
            <hr>
            <table class = 'Cabecera'>
                <tr>
                    <td class = 'Concepto'>Empresa</td>
                    <td class = 'DetalleConcepto'>{{$Empresa}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>Cliente</td>
                    <td class = 'DetalleConcepto'>{{$Cliente}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>Proyecto (OT)</td>
                    <td class = 'DetalleConcepto'>{{$Referencia}}</td>
                </tr>
                <tr>
                    <td class = 'Concepto'>Fecha</td>
                    <td class = 'DetalleConcepto'>{{$Fecha}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>Hora Inicio</td>
                    <td class = 'DetalleConcepto'>{{$Hora_Inicio}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>Hora Fin</td>
                    <td class = 'DetalleConcepto'>{{$Hora_Fin}}</td>
                </tr>
                <tr>
                    <td class = 'Concepto'>Tipo de Reunión</td>
                    <td class = 'DetalleConcepto'>{{$TipoReunion}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>Tipo Informe</td>
                    <td class = 'DetalleConcepto'>{{$TipoInforme}}</td>
                </tr>
            </table>
            <hr>
            <table class = 'Cabecera'>
                <tr>
                    <td class = 'Concepto' style = 'width:45%;'>Asistentes Agencia</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto' style = 'width:45%;'>Copiados Agencia</td>
                </tr>
                <tr>
                    <td class = 'DetalleConcepto'>
                        <ul>
                            @if( count($AsistentesAgencia) == 0 )
                                <li>No se han Registrado Asistentes.</li>
                            @else
                                @foreach( $AsistentesAgencia as $t )
                                <li>
                                    @php
                                        echo $t->NombreUsuario;
                                    @endphp
                                </li>
                                @endforeach
                            @endif
                        </ul>
                    </td>
                    <td class = 'Separador'></td>
                    <td class = 'DetalleConcepto'>
                        <ul>
                            @if( count($CopiadosAgencia) == 0 )
                                <li>No se han Registrado Copiados.</li>
                            @else
                                @foreach( $CopiadosAgencia as $t )
                                <li>
                                    @php
                                        echo $t->NombreUsuario;
                                    @endphp
                                </li>
                                @endforeach
                            @endif
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td class = 'Concepto' style = 'width:45%;'>Asistentes Cliente</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto' style = 'width:45%;'>Copiados Agencia</td>
                </tr>
                <tr>
                    <td class = 'DetalleConcepto'>
                        <ul>
                            @if( count($AsistentesCliente) == 0 )
                                <li>No se han Registrado Asistentes.</li>
                            @else
                                @foreach( $AsistentesCliente as $t )
                                <li>
                                    @php
                                        echo $t->Nombre;
                                    @endphp
                                </li>
                                @endforeach
                            @endif
                        </ul>
                    </td>
                    <td class = 'Separador'></td>
                    <td class = 'DetalleConcepto'>
                        <ul>
                            @if( count($CopiadosGeneral) == 0 )
                                <li>No se han Registrado Copiados.</li>
                            @else
                                @foreach( $CopiadosGeneral as $t )
                                <li>
                                    @php
                                        echo $t->Nombre;
                                    @endphp
                                </li>
                                @endforeach
                            @endif
                        </ul>
                    </td>
                </tr>
            </table>
            <hr>
            <h4 class = 'ConceptoTitulos'>INFORMACIÓN GENERAL</h4>
            <table class = 'Cabecera'>
                <tr>
                    <td >
                        @php
                            echo ($InformacionGeneral);
                        @endphp
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
