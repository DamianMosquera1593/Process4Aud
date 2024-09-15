@extends('process.pdf.header')
<body>
    <head>
        <meta charset="UTF-8">
        <title>Orden de Compra No. {{session("DataOrden")[0]->Id}}</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    {{session("DataOrden")[0]->Empresa}}<p></p>{{session("DataOrden")[0]->NitEmpresa}}
                </td>
                <td class = 'CenterText'>
                    <span style = 'font-weight: bold; font-size:20px;'>ORDEN DE COMPRA # {{session("DataOrden")[0]->Id}}</span><p></p>
                    Presupuesto No. {{session("DataOrden")[0]->IdPpto}}<p></p>Version Interna: {{session("DataOrden")[0]->VersionInterna}} - Version Cliente: {{session("DataOrden")[0]->VersionCliente}}
                </td>
            </tr>
        </table>
        <BR>
        <table class = 'Cabecera'>
            <tr>
                <td class = 'Concepto'>PROVEEDOR</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->Proveedor}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>NIT</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->NitProveedor}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>OT/PROYECTO</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->CodigoOT}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>EJECUTIVO</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->Ejecutivo}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>REFERENCIA</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->Referencia}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>ELABORADO POR</td>
                <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->ElaboradoPor}}</td>
            </tr>
            <tr>
                @if( session("DataOrden")[0]->UsuarioCancelacion != NULL )
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
                        <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->FormaPago}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>FECHA DE ENTREGA</td>
                        <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->FechaEntrega}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>LUGAR</td>
                        <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->Lugar}}</td>
                    </tr>
                    <tr>

                        <td class = 'Concepto'>VIGENCIA INICIAL</td>
                        <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->VigenciaInicial}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>VIGENCIA FINAL</td>
                        <td class = 'DetalleConcepto'>{{session("DataOrden")[0]->VigenciaFinal}}</td>
                        <td class = 'Separador'></td>
                        <td class = 'Concepto'>FECHA RADICACIÓN</td>
                        <td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>{{session("DataOrden")[0]->FechaRadicacion}}</td>
                    </tr>
                </table>
                <br>
                <table class ='DetallePpto'>
                    <tr>
                        <th class = 'ThSub'>ITEM</th>
                        <th class = 'ThSub'>DÍAS</th>
                        <th class = 'ThSub'>CANTIDAD</td>
                        <th class = 'ThSub' style = 'width:40%;'>DESCRIPCIÓN</th>
                        <th class = 'ThSub'>VALOR UNITARIO</th>
                        <th class = 'ThSub'>SUBTOTAL</th>
                        <th class = 'ThSub' style = 'width:10%;'>VOLUMEN</th>
                        <th class = 'ThSub'>TOTAL</th>
                    </tr>
                    @foreach( session("DataOrden")[0]->ItemsOP as $item )
                        <tr>
                            <td class = 'TdItems' style = 'width:20%;'>{{$item->Item}}</td>
                            <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Dias}}</td>
                            <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Cantidad}}</td>
                            <td class = 'TdItems' style = 'width:40%;text-align:justify;'>
                                @php
                                    echo ($item->Descripcion);
                                @endphp
                            </td>
                            
                            <td class = 'TdItems' style = 'width:15%;'>
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
                            <td class = 'TdItems' style = 'width:15%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->TotalVolumen)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems' style = 'width:15%;'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->TotalItem)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    @endforeach
                    <tr>
                        <td colspan = '5'></td>
                        <th style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->Subtotal)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </th>
                        <th  style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->Vol)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </th>
                        <th  style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->Total)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </th>
                    </tr>
                    <tr><td><br></td></tr>
                    @if( session("DataOrden")[0]->UsuarioCancelacion != NULL )
                        <tr>
                            <td colspan = '8' class = 'TdItems' style = 'padding:5px;'>
                                <span style = 'color:red;font-weight: bold;'>ESTA ORDEN DE PRODUCCIÓN SE CANCELÓ POR:</span>
                                @php
                                    echo nl2br(session("DataOrden")[0]->MotivoCancelacion);
                                @endphp
                                <p></p>
                                <span style="font-weight: bold;">Fecha Cancelacion: </span>{{session("DataOrden")[0]->FechaCan}}<p></p>
                                <span style="font-weight: bold;">Cancelada Por: </span>{{session("DataOrden")[0]->Cancelador}}<p></p>
                            </td>
                        </tr>
                    @endif
                    <tr>
                        <td colspan = '6'></td>
                        <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>SUBTOTAL</td>
                        <td class = 'TdItems'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->Subtotal)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @foreach(  session("DataOrden")[0]->ImpuestosItems as $Items)
                        <tr>
                            <td colspan = '6'></td>
                            <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>{{$Items->Impuesto}}</td>
                            <td class = 'TdItems'>
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format(session("DataOrden")[0]->TotalImpuestos)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    @endforeach
                    <tr>
                        <td colspan = '6'></td>
                        <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>TOTAL IMPUESTOS</td>
                        <td class = 'TdItems'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->TotalImpuestos)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan = '6'></td>
                        <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>TOTAL</td>
                        <td class = 'TdItems'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format(session("DataOrden")[0]->TotalImpuestos + session("DataOrden")[0]->Total)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                @if( count(session("DataOrden")[0]->OpsRe) > 0 )
                    
                                
                    @if( count(session("DataOrden")[0]->OpsRe) > 1 )
                    <br>
                        <table class = 'Cabecera'>
                            <tr>
                                <td class = 'TdItems'>
                        <span style = 'font-weight: bold;color:red;'>Esta Órden de Compra reemplaza las Órdenes de Producción:</span> 
                        @foreach( session("DataOrden")[0]->OpsRe as $r )
                            {{$r->IdOp}} 
                        @endforeach
                        <p></p>
                                </td>
                            </tr>
                        </table>
                    @endif 
                    @if( count(session("DataOrden")[0]->OpsRe) == 1 && session("DataOrden")[0]->OpsRe[0]->IdOp != NULL)
                    <br>
                        <table class = 'Cabecera'>
                            <tr>
                                <td class = 'TdItems'>
                        <span style = 'font-weight: bold;color:red;'>Esta Órden de Compra reemplaza la Órden de Producción:</span> {{session("DataOrden")[0]->OpsRe[0]->IdOp}}<p></p>
                        </td>
                            </tr>
                        </table>
                    @endif
                                
                            
                @endif
                @if( session("DataOrden")[0]->Observaciones != NULL )
                    <br>
                    <table class = 'Cabecera'>
                        <tr>
                            <td class = 'TdItems'>
                                <span style = 'font-weight: bold;color:red;'>Notas Adicionales:</span><p></p>
                                @php
                                    echo nl2br(session("DataOrden")[0]->Observaciones);
                                @endphp
                            </td>
                        </tr>
                    </table>
                @endif
                <br>
                <br>
                <table>
                    <tr>
                        <td class = 'Concepto' nowrap>FIRMA PROVEEDOR</td>
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
                        <td style = 'font-size: 10px; font-weight: bold;'>NOTA LEGAL: {{session("DataOrden")[0]->NotaLegal}}</td>
                    </tr>
                </table>
            </div>
        </div>

@extends('process.pdf.footer')