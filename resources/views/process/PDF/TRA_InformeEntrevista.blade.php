@extends('process.pdf.header')
<body>
    <head>
        <meta charset="UTF-8">
        <title>Informe de Entrevista OT {{session("DataInformeEntrevista")['NumOt']}} - {{session("DataInformeEntrevista")['Asunto']}}</title>
    </head>
    <header>
        <h3 style = 'font-size:12px;'>{{ session("DataInformeEntrevista")['Asunto']}}</h3>
        <table class = 'Cabecera'>
            <tr>
                <td class = 'Concepto'>Empresa</td>
                <td class = 'DetalleConcepto'>{{ session("DataInformeEntrevista")['Empresa']}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Cliente</td>
                <td class = 'DetalleConcepto'>{{ session("DataInformeEntrevista")['Cliente']}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Proyecto (OT)</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['NumOt']}} - {{session("DataInformeEntrevista")['Referencia']}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>Fecha</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['Fecha']}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Hora Inicio</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['Hora_Inicio']}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Hora Fin</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['Hora_Fin']}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>Tipo de Reunión</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['TipoReunion']}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Tipo Informe</td>
                <td class = 'DetalleConcepto'>{{session("DataInformeEntrevista")['TipoInforme']}}</td>
            </tr>
        </table>
        <hr>
    </header>

        <div class = 'ContentPanelCorreo' >
            
            <div class = 'BodyInf'>
                <table class = 'Cabecera'>
                    <tr>
                        <td class = 'Concepto' style = 'width:45%;'>Asistentes Agencia</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto' style = 'width:45%;'>Copiados Agencia</td>
                    </tr>
                    <tr>
                        <td class = 'DetalleConcepto'>
                            <ul>
                                @if( count(session("DataInformeEntrevista")['AsistentesAgencia']) == 0 )
                                    <li>No se han Registrado Asistentes.</li>
                                @else
                                    @foreach( session("DataInformeEntrevista")['AsistentesAgencia'] as $t )
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
                                @if( count(session("DataInformeEntrevista")['CopiadosAgencia']) == 0 )
                                    <li>No se han Registrado Copiados.</li>
                                @else
                                    @foreach( session("DataInformeEntrevista")['CopiadosAgencia'] as $t )
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
                                @if( count(session("DataInformeEntrevista")['AsistentesCliente']) == 0 )
                                    <li>No se han Registrado Asistentes.</li>
                                @else
                                    @foreach( session("DataInformeEntrevista")['AsistentesCliente'] as $t )
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
                                @if( count(session("DataInformeEntrevista")['CopiadosGeneral']) == 0 )
                                    <li>No se han Registrado Copiados.</li>
                                @else
                                    @foreach( session("DataInformeEntrevista")['CopiadosGeneral'] as $t )
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
                <h4>Información General</h4>
                <div class = 'Cabecera'>
                    @php
                        echo (session("DataInformeEntrevista")['InformacionGeneral']);
                    @endphp
                </div>
            </div>
        </div>

@extends('process.pdf.footer')