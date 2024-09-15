@extends('process.pdf.header')
<body>
    <head>
        <meta charset="UTF-8">
        <title>Presupuesto Cliente No. {{session("DataPpto")[0]->Id}}</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    {{session("DataPpto")[0]->Empresa}}<p></p>{{session("DataPpto")[0]->NitEmpresa}}
                </td>
                <td class = 'CenterText'>
                    <span style = 'font-weight: bold; font-size:20px;'>PRESUPUESTO FINAL CLIENTE {{session("DataPpto")[0]->Id}}</span><p></p>
                    Version Interna: {{session("DataPpto")[0]->VersionInterna}} - Version Cliente: {{session("DataPpto")[0]->VersionCliente}}
                </td>
            </tr>
        </table>
        <BR>
        <table class = 'Cabecera'>
            <tr>
                <td class = 'Concepto'>CLIENTE</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->Cliente}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>PRODUCTO</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->Producto}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>OT/PROYECTO</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->CodigoOT}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>EJECUTIVO</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->Ejecutivo}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>REFERENCIA</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->Referencia}}</td>
                <td class = 'Separador'></td>
                <td class = 'Concepto'>DIRIDIDO A</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->Dirigido}}</td>
            </tr>
            <tr>
                <td class = 'Concepto'>MONEDA</td>
                <td class = 'DetalleConcepto'>{{session("DataPpto")[0]->TipoMoneda}}</td>
                <td class = 'Separador'></td>
                @if( session("DataPpto")[0]->SimbolMoneda != 'COP' )
                <td class = 'Concepto'>TASA</td>
                <td class = 'DetalleConcepto'>
                    <table width ='100%'>
                        <tr>
                            <td style = 'text-align:left;'>$</td>
                            <td style = 'text-align:right;'>
                                @php
                                    echo number_format(session("DataPpto")[0]->Tasa)
                                @endphp
                            </td>
                        </tr>
                    </table>
                </td>
                @endif
            </tr>
        </table>
    </header>

        <div class = 'ContentPanelCorreo' >
            
            <div class = 'BodyInf'>
                @foreach( session("DataPpto")[0]->Grupos as $g )
                <table class ='DetallePpto'>
                    <tr>
                        <th class = 'CenterText'colspan = '7'>{{$g->Grupo}}</th>
                    </tr>
                    <tr>
                        <td class = 'ThSub'>ITEM</td>
                        <td class = 'ThSub'>DÍAS</td>
                        <td class = 'ThSub'>CANTIDAD</td>
                        <td class = 'ThSub' style = 'width:40%;'>DESCRIPCIÓN</td>
                        <td class = 'ThSub'>VALOR UNITARIO</td>
                        <td class = 'ThSub'>SUBTOTAL</td>
                        <td class = 'ThSub'>TOTAL</td>
                    </tr>
                    @foreach( $g->ItemsGrupo as $item )
                    <tr>
                        <td class = 'TdItems' style = 'width:20%;'>{{$item->Item}}</td>
                        <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Dias}}</td>
                        <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Unidad}}</td>
                        <td class = 'TdItems' style = 'width:40%;text-align:justify;'>
                            @if($item->Descripcion_Externa == '')
                                @php
                                    echo ($item->Descripcion_Interna);
                                @endphp
                            @else
                                @php
                                    echo ($item->Descripcion_Externa);
                                @endphp
                            @endif
                            
                        </td>
                        <td class = 'TdItems' style = 'width:15%;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($item->ValorUnitario,2)
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
                                            echo number_format($item->SubtotalUnitario,2)
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
                                            echo number_format($item->TotalUnitario,2)
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
                                            echo number_format($g->SubTotal,2)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <th  style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($g->Total,2)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br>
                @endforeach
                <br>
                <table class ='Cabecera'>
                    <tr>
                        <td colspan = '2' style = 'vertical-align:top;' >
                            <table class ='DetallePpto'>
                                <tr>
                                    <th colspan = '2'>IMPUESTOS ITEMS</th>
                                </tr>
                                <tr>
                                    <td class = 'ThSub'>NOMBRE</td>
                                    <td class = 'ThSub'>TOTAL</td>
                                </tr>
                                @if( count(session("DataPpto")[0]->ImpuestosItems) == 0)
                                    <tr>
                                        <td class = 'CenterText TdItems' colspan = '2'>Sin Impuestos</td>
                                    </tr>
                                @endif
                                @foreach( session("DataPpto")[0]->ImpuestosItems as $t )
                                <tr>
                                    <td class = 'TdItems'>{{$t->Impuesto}}</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format($t->Total,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                        <td class = 'Separador'></td>
                        <td class = 'Separador'></td>
                        <td style = 'vertical-align:top;'>
                            <table class ='DetallePpto'>
                                <tr>
                                    <th colspan = '2'>IMPUESTOS COMISIÓN</th>
                                </tr>
                                <tr>
                                    <td class = 'ThSub'>NOMBRE</td>
                                    <td class = 'ThSub'>TOTAL</td>
                                </tr>
                                <tr>
                                    <td class = 'TdItems'>IVA 19%</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalImpuestoComManual,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class = 'Separador'></td>
                        <td class = 'Separador'></td>
                        <td colspan = '2' style = 'vertical-align:top;'>
                            <table class ='DetallePpto'>
                                <tr>
                                    <th colspan = '2'>RESUMEN</th>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>SUBTOTAL</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalPptoAntesComision,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>NO COMISIONABLE</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->NoComisionable,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>ANTES DE IMPUESTOS</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalPptoAntesComision,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>IMPUESTOS SUBTOTAL</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalImpuestos,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                @foreach( session("DataPpto")[0]->Comisiones as $gx )
                                    <tr>
                                        <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>COMISIÓN {{$gx->PorcentajeComision}}%</td>
                                        <td class = 'TdItems'>
                                            <table width ='100%'>
                                                <tr>
                                                    <td style = 'width:20%;text-align:right;'>$</td>
                                                    <td style = 'text-align:right;'>
                                                        @php
                                                            echo number_format($gx->ValorComisionManual,2)
                                                        @endphp
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                @endforeach
                                
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>IMPUESTOS COMISIÓN</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalImpuestoComManual,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>TOTAL</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalImpuestoComManual + session("DataPpto")[0]->TotalComisionesManuales + session("DataPpto")[0]->TotalImpuestos + session("DataPpto")[0]->TotalPptoAntesComision ,2)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br>
                <table >
                    <tr>
                        <td class = 'Concepto' nowrap>FIRMA CLIENTE</td>
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
                @if( !empty(session("DataPpto")[0]->NotaAdicional) )
                    <table class = 'Cabecera'>
                        <tr>
                            <td class = 'Concepto' style = 'color:red;'>
                                NOTA ADICIONAL
                                <p style = 'font-weight: normal;color:black;'>{{session("DataPpto")[0]->NotaAdicional}}</p>
                            </td>
                        </tr>
                    </table>
                @endif
                <br>
                <br>
                <table class = 'Cabecera'>
                    <tr>
                        <td style = 'font-size:10px;text-align:justify;font-weight: bold;'>
                            NOTA LEGAL: 
                            @php
                                echo nl2br(session("DataPpto")[0]->NotaLegal);
                            @endphp
                        </td>
                    </tr>
                </table>
            </div>
        </div>

@extends('process.pdf.footer')