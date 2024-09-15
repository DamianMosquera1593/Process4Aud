@extends('process.pdf.header')
<body style = 'margin-top: 3cm;padding-left:0cm;padding-right: 0cm; '>
    <head>
        <meta charset="UTF-8">
    </head>
    <header>
        <h3 class = 'CenterText'>REPORTE LISTADO DE OTS</h3>
        <table class = 'Cabecera'>
            <tr>
                <td class = 'Concepto'>Empresa</td>
                <td class = 'DetalleConcepto'>
                    @if( session("TRA_ReportParam_ListOT")['nameEmpresa'] != 'Seleccione' )
                        {{ session("TRA_ReportParam_ListOT")['nameEmpresa'] }}
                    @else
                        Todas
                    @endif
                </td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Unidad</td>
                <td class = 'DetalleConcepto'>
                    @if( session("TRA_ReportParam_ListOT")['nameUnidad'] != 'Seleccione' )
                        {{ session("TRA_ReportParam_ListOT")['nameUnidad'] }}
                    @else
                        Todas
                    @endif
                </td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Cliente</td>
                <td class = 'DetalleConcepto'>
                    @if( session("TRA_ReportParam_ListOT")['nameCliente'] != 'Seleccione' )
                        {{ session("TRA_ReportParam_ListOT")['nameCliente'] }}
                    @else
                        Todos
                    @endif
                </td>
            </tr>
            <tr>
                <td class = 'Concepto'>Desde</td>
                <td class = 'DetalleConcepto'>
                    @if( session("TRA_ReportParam_ListOT")['FInicio'] != '' )
                        {{ session("TRA_ReportParam_ListOT")['FInicio'] }}
                    @else
                        Sin Especificar
                    @endif
                </td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>Hasta</td>
                <td class = 'DetalleConcepto'>
                    @if( session("TRA_ReportParam_ListOT")['FFin'] != '' )
                        {{ session("TRA_ReportParam_ListOT")['FFin'] }}
                    @else
                        Sin Especificar
                    @endif
                </td>
            </tr>
        </table>
        <hr>
    </header>
        <div class = 'ContentPanelCorreo' style = 'padding-left:0cm;padding-right: 0cm;'>
            <div class = 'BodyInf' style = 'padding-left:0cm;padding-right: 0cm;'>
                <table class = 'tableNew'>
                    <tr>
                        <th>No.</th>
                        <th>Código OT</th>
                        <th>Referencia</th>
                        <th>Descripción</th>
                        <th>Director</th>
                        <th>Ejecutivo</th>
                        <th>Empresa</th>
                        <th>Unidad de Negocio</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Hora Creación</th>
                    </tr>
                    @php
                        $i = 1;
                    @endphp
                    @foreach( session('Data_TRA_Report_ListOT') as $d )
                        <tr>
                            <td class = 'CenterText'>{{$i}}</td>
                            <td nowrap style = 'font-size:12px;'>{{ $d->Codigo }}</td>
                            <td >{{ $d->Referencia }}</td>
                            <td >{{ $d->Descripcion }}</td>
                            <td >{{ $d->Director }}</td>
                            <td >{{ $d->Ejecutivo }}</td>
                            <td >{{ $d->Empresa }}</td>
                            <td >{{ $d->Unidad }}</td>
                            <td >{{ $d->Cliente }}</td>
                            <td >{{ $d->Estado }}</td>
                            <td class = 'CenterText'>{{ $d->FechaCreacion }}</td>
                            <td class = 'CenterText'>{{ $d->HoraCreacion }}</td>
                        </tr>
                        @php
                            $i++;
                        @endphp
                    @endforeach
                </table>
            </div>
        </div>
@extends('process.pdf.footer')