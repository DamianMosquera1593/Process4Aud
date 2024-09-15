@extends('process.pdf.header')
<body>
    <head>
        <meta charset="UTF-8">
        <title>Anticipo No. {{session("DataAnticipo")[0]->Id}}</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    {{session("DataAnticipo")[0]->Empresa}}<p></p>{{session("DataAnticipo")[0]->NitEmpresa}}
                </td>
                <td class = 'CenterText'>
                    <span style = 'font-weight: bold; font-size:20px;'>ANTICIPO # {{session("DataAnticipo")[0]->Id}}</span><p></p>
                    Presupuesto No. {{session("DataAnticipo")[0]->IdPpto}}<p></p>Version Interna: {{session("DataAnticipo")[0]->VersionInterna}} - Version Cliente: {{session("DataAnticipo")[0]->VersionExterna}}
                </td>
            </tr>
        </table>
        <BR>
        <table class = 'Cabecera'>
            <tr>
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
                
            </tr>
            <tr>
                <td class = 'Concepto'>EJECUTIVO</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->Ejecutivo}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>PROYECTO/OT</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->CodigoOT}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>REFERENCIA</td>
                <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->ReferenciaOT}}</td>
            </tr>
            <tr>
                @if( session("DataAnticipo")[0]->IdUsuarioCancelacion != '' )
                    <td class = 'Concepto'>ESTADO</td>
                    <td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>CANCELADA</td>
                @endif
            </tr>
        </table>
    </header>

        <div class = 'ContentPanelCorreo' >
            
            <div class = 'BodyInf'>
                <table class = 'Cabecera'>
                    <tr>
                        <td class = 'Concepto'>FORMA DE PAGO</td>
                        <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->FormaPago}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>FECHA DE NECESIDAD</td>
                        <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->FechaNecesidad}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>FECHA LEGALIZACIÓN</td>
                        <td class = 'DetalleConcepto'>{{session("DataAnticipo")[0]->FechaLegalizacion}}</td>
                    </tr>
                </table>
                <br>
                <table class ='DetallePpto'>
                    <tr>
                        <th class = 'ThSub'>GRUPO</th>
                        <th class = 'ThSub'>ITEM</th>
                        <th class = 'ThSub'>DÍAS</th>
                        <th class = 'ThSub'>CANTIDAD</th>
                        <th class = 'ThSub'>VALOR UNITARIO</th>
                        <th class = 'ThSub'>SUBTOTAL</th>
                        <th class = 'ThSub'>VOLUMEN</th>
                        <th class = 'ThSub'>TOTAL</th>
                        <th class = 'ThSub'>VALOR SOLICITADO</th>
                    </tr>
                    @foreach( session("DataAnticipo")[0]->Grupos as $item )
                        <tr>
                            <td class = 'TdItems' >{{$item->GrupoItem}}</td>
                            <td class = 'TdItems' >{{$item->NombreItem}}</td>
                            <td class = 'TdItems CenterText' style = 'width:7%;'>{{$item->Dias}}</td>
                            <td class = 'TdItems CenterText' style = 'width:7%;'>{{$item->Cantidad}}</td>
                                                        
                            <td class = 'TdItems' style = 'width:10%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->ValorUnitario)
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
                                                echo number_format($item->Subtotal)
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
                                                echo number_format($item->DescVolumen)
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
                                                echo number_format($item->Subtotal - $item->DescVolumen)
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
                                                echo number_format($item->ValorSolicitado)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    @endforeach
                        <tr>
                            <td colspan = '7'></td>
                            <th class = 'ThSub' >TOTAL</th>
                            <th class = 'ThSub' >
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format(session("DataAnticipo")[0]->ValorSolicitado)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </th>
                        </tr>
                </table>
                <br>
                <br>
                <br>
                <table class = 'Cabecera'>
                    <tr>
                        <td class = 'TdItems'>
                            <span style = 'font-weight: bold;color:red;'>Notas Adicionales:</span><p></p>
                            @php
                                echo nl2br(session("DataAnticipo")[0]->Justificacion);
                            @endphp
                        </td>
                    </tr>
                </table>
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
                <br>
                <table class = 'Cabecera'>
                    <tr>
                        <td style = 'font-size: 10px; font-weight: bold;text-align:justify;'>NOTA LEGAL: Yo, {{session("DataAnticipo")[0]->SolicitadoPor}} autorizo a la {{session("DataAnticipo")[0]->Empresa}} {{session("DataAnticipo")[0]->NotaLegal}}</td>
                    </tr>
                </table>
            </div>
        </div>

@extends('process.pdf.footer')