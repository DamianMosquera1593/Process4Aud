<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>{{session("DataPDF")['Titulo']}}</title>
        <style>
            .page-break {
                page-break-after: always;
            }
            
            body{
                font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
                font-size:12px;
            }
            .CenterText{
                text-align:center;
            }
            .Negrilla{
                font-weight: bold;
            }
            footer table{
                position: fixed;
                bottom: 0cm;
                left: 0cm;
                right: 0cm;
                height: 25px;
                color: #848788;
                font-size:10px;
                text-align: center;
            }
            header table td{
                font-size:10xp;
                margin:0px;
            }
            header { position: fixed; left: 0px; top: -20px; right: 0px; bottom: 20px;}
            
            footer { position: fixed; left: 0px; top: -40px; right: 0px; height: 25px; font-weight: lighter; }
            
            .Page{
                position:absolute;top:100px;
            }
            .pagenum:after {
                content: counter(page);
                color:black;
                font-weight: bold;
            }
            .TotalPage:after{ 
                content:counter(footer); 
                color:black;
            }
            Border{
                border:1px solid black;
            }
            hr{
                border:0.01mm solid #C1C1C1;
            }
            body {
                margin-top: 5cm;
                margin-bottom: 1cm;
            }
            
            .CenterText{
                text-align:center;
            }
            .BodyInf{
                background-color:white;
                width:100%;
            }
            .Concepto{
                background-color:#E6E7E9;
                font-weight: bold;
                padding:5px;
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
            .ContentFooter{
                width:100%;
            }
            .ContentFooter td{
                padding-top:20px;
                width:33%;
                font-weight: 10px;
                color:black;
            }
            .tableNew{
                width:100%;
                border-collapse: collapse;
            }
            .tableNew th{
                color: #417EC1;
                font-weight: bold;
                text-align:center;
                padding:5px;
                font-size:13px;
                padding-bottom: 5px;
            }
            .tableNew td{
                background-color:#F1F2F2;
                color:black;
                border:1px solid #e6e4e4;
                border-spacing: 1px;
                padding:5px;
                font-size:12px;
                font-weight: 450;
            }
            .DetallePpto th{
                background-color:#ACB9C9;
                color:white;
            }
            .DetallePpto{
                width:100%;
                border-collapse: collapse;
            }
            .ThSub{
                border:1px solid white;
                background-color:#F8F0B1;
                color:#71675D;
                text-align:center;
                font-size:11px;
            }
            .TdItems{
                background-color:#E5E5E5;
                border:1px solid white;
                padding-left: 3px;
            }
        </style>
    </head>
<body>
    <head>
        <meta charset="UTF-8">
        <title>Legalización No. {{session("DataAnticipo")[0]->NumLegalizacion}}</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    {{session("DataAnticipo")[0]->Empresa}}<p></p>{{session("DataAnticipo")[0]->NitEmpresa}}
                </td>
                <td class = 'CenterText'>
                    <span style = 'font-weight: bold; font-size:20px;'>LEGALIZACIÓN # {{session("DataAnticipo")[0]->NumLegalizacion}}</span><p></p>
                    Presupuesto No. {{session("DataAnticipo")[0]->IdPpto}}<p></p>Version Interna: {{session("DataAnticipo")[0]->VersionInterna}} - Version Cliente: {{session("DataAnticipo")[0]->VersionExterna}}
                </td>
            </tr>
        </table>
        <BR>
        <table class = 'Cabecera'>
            <tr>
                <td class = 'Concepto'>ANTICIPO</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->Id}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>TIPO ANTICIPO</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->TipoAnticipo}}</td>
                <td class = 'Separador'></td>
                @if( session("DataAnticipo")[0]->TipoAnticipo == 'Viáticos' )
                    <td class = 'Concepto'>PARA</td>
                    <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->SolicitadoPor}}</td>
                    <td class = 'Separador'></td>
                @else
                    <td class = 'Concepto'>NIT</td>
                    <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->NitProveedor}}</td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>PROVEEDOR</td>
                    <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->Proveedor}}</td>
                @endif
                <td class = 'Separador'></td>
                <td class = 'Concepto'>PROYECTO/OT</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->CodigoOT}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>EJECUTIVO</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->Ejecutivo}}</td>
                
                <td class = 'Separador'></td>
                <td class = 'Concepto'>REFERENCIA</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->ReferenciaOT}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>LEGALIZADO POR</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->NombreUsuario}}</td>
            </tr>
        </table>
    </header>
    
        <div class = 'ContentPanelCorreo' >
            <table class = 'Cabecera'>
                <tr>
                    <td class = 'Concepto'>VALOR SOLICITADO</td>
                    <td class = 'DetalleConcepto'>
                        <table width ='100%'>
                            <tr>
                                <td style = 'width:20%;'>$</td>
                                <td style = 'text-align:right;'>{{session("DataAnticipo")[0]->TotalAnticipoF}}</td>
                            </tr>
                        </table>
                    </td>
                    <td class = 'Separador'></td>
                    <td class = 'Concepto'>VALOR LEGALIZADO</td>
                    <td class = 'DetalleConcepto'>
                        <table width ='100%'>
                            <tr>
                                <td style = 'width:20%;'>$</td>
                                <td style = 'text-align:right;'>{{session("DataAnticipo")[0]->ValorLegalizadoF}}</td>
                            </tr>
                        </table>
                    </td>
                    <td class = 'Separador'></td>
                    @if( session("DataAnticipo")[0]->ValorLegalizado <  session("DataAnticipo")[0]->TotalAnticipo )
                        <td class = 'Concepto'>VALOR A REINTEGRAR</td>
                        @else
                        <td class = 'Concepto'>SALDO A FAVOR DEL EMPLEADO</td>
                    @endif
                    <td class = 'DetalleConcepto'>
                        <table width ='100%'>
                            <tr>
                                <td style = 'width:20%;'>$</td>
                                <td style = 'text-align:right;'>
                                    
                                    @if( session("DataAnticipo")[0]->ValorLegalizado <  session("DataAnticipo")[0]->TotalAnticipo )
                                        {{session("DataAnticipo")[0]->Dif}}
                                        @else
                                        {{session("DataAnticipo")[0]->Dif}}
                                    @endif
                                    
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div class = 'BodyInf'>
                
                <br>
                <table class ='DetallePpto'>
                    <tr>
                        <th class = 'ThSub'>#</th>
                        <th class = 'ThSub'>FACTURA</th>
                        <th class = 'ThSub'>CONCEPTO</th>
                        <th class = 'ThSub'>VALOR</th>
                        <th class = 'ThSub'>IVA</th>
                        <th class = 'ThSub'>RETENCIÓN</th>
                        <th class = 'ThSub'>TOTAL</th>
                        <th class = 'ThSub'>FECHA FACTURA</th>
                        <th class = 'ThSub'>NIT</th>
                        <th class = 'ThSub'>BENEFICIARIO</th>
                        <th class = 'ThSub'>DIRECCIÓN</th>
                        <th class = 'ThSub'>TELÉFONO</th>
                        <th class = 'ThSub'>CIUDAD</th>
                    </tr>
                    @foreach( session("DataAnticipo")[0]->Grupos as $item )
                        <tr>
                            <td class = 'TdItems CenterText' >{{$item->Num}}</td>
                            <td class = 'TdItems' >{{$item->NumeroFactura}}</td>
                            <td class = 'TdItems '>{{$item->Concepto}}</td>
                            <td class = 'TdItems' style = 'width:10%;vertical-align:middle;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->Valor)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems' style = 'width:10%;' nowrap>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->Impuestos)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems' style = 'width:10%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->retencion)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems' style = 'width:10%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->retencion + $item->Impuestos + $item->Valor)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems ' >{{$item->FechaFactura}}</td>
                            <td class = 'TdItems ' nowrap>{{$item->Nit}}</td>
                            <td class = 'TdItems '>{{$item->beneficiario}}</td>
                            <td class = 'TdItems '>{{$item->direccion}}</td>
                            <td class = 'TdItems '>{{$item->telefono}}</td>
                            <td class = 'TdItems '>{{$item->ciudad}}</td>
                        </tr>
                    @endforeach
                        <tr>
                            <th class = 'ThSub CenterText' colspan = '3'>TOTAL</th>
                            <th class = 'ThSub' style = 'width:10%;vertical-align:middle;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            {{session("DataAnticipo")[0]->TotalF}}
                                        </td>
                                    </tr>
                                </table>
                            </th>
                            <th class = 'ThSub' style = 'width:10%;' nowrap>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            {{session("DataAnticipo")[0]->Impuestos}}
                                        </td>
                                    </tr>
                                </table>
                            </th>
                            <th class = 'ThSub' style = 'width:10%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            {{session("DataAnticipo")[0]->Retencion}}
                                        </td>
                                    </tr>
                                </table>
                            </th>
                            <th class = 'ThSub' style = 'width:10%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            {{session("DataAnticipo")[0]->Total}}
                                        </td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                </table>
                <br>
                <br>
                <br>
                
                <br>
                <br>
                <table>
                    <tr>
                        <td class = 'Concepto' nowrap>FIRMA</td>
                        <td class = 'Separador'></td>
                        <td>___________________________</td>
                        <td class = 'Separador'></td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto' nowrap>FECHA FIRMA</td>
                        <td class = 'Separador'></td>
                        <td>__________________</td>
                    </tr>
                </table>
                <br>
            </div>
        </div>

@extends('process.pdf.footer')