@extends('process.pdf.header')
<body>
    <head>
        <meta charset="UTF-8">
        <title>Presupuesto Interno No. {{session("DataPpto")[0]->Id}}</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    {{session("DataPpto")[0]->Empresa}}<p></p>{{session("DataPpto")[0]->NitEmpresa}}
                </td>
                <td class = 'CenterText'>
                    <span style = 'font-weight: bold; font-size:20px;'>PRESUPUESTO INTERNO {{session("DataPpto")[0]->Id}}</span><p></p>
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
                        <th class = 'CenterText'colspan = '13'>{{$g->Grupo}}</th>
                    </tr>
                    <tr>
                        <td class = 'ThSub'>ITEM</td>
                        <td class = 'ThSub'>DÍAS</td>
                        <td class = 'ThSub'>CANTIDAD</td>
                        <td class = 'ThSub' style = 'width:40%;'>DESCRIPCIÓN</td>
                        <td class = 'ThSub' style = 'width:10%;'>PROVEEDOR</td>
                        <td class = 'ThSub'>VALOR UNITARIO INTERNO</td>
                        <td class = 'ThSub'>SUBTOTAL</td>
                        <td class = 'ThSub'>VOLUMEN</td>                        
                        <td class = 'ThSub'>TOTAL INTERNO</td>
                        <td class = 'ThSub'>VALOR UNITARIO EXTERNO</td>
                        <td class = 'ThSub'>SUBTOTAL</td>
                        <td class = 'ThSub'>TOTAL EXTERNO</td>
                        <td class = 'ThSub'>($) RENT. PARCIAL</td>
                    </tr>
                    @foreach( $g->ItemsGrupo as $item )
                    <tr>
                        <td class = 'TdItems' style = 'width:20%;'>{{$item->Item}}</td>
                        <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Dias}}</td>
                        <td class = 'TdItems CenterText' style = 'width:5%;'>{{$item->Unidad}}</td>
                        <td class = 'TdItems' style = 'width:30%;text-align:justify;'>
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
                        <td class = 'TdItems' style = 'width:10%;' >{{$item->Proveedor}}</td>
                        <td class = 'TdItems' style = 'width:15%;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($item->ValorUnitarioInterno)
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
                                            echo number_format($item->SubtotalUnitarioInterno)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class = 'TdItems' style = 'width:15%;'>
                            <table width ='100%'>
                                <tr>
                                    
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($item->Volumen)
                                        @endphp
                                    </td>
                                    <td style = 'width:20%;text-align:right;'>%</td>
                                </tr>
                            </table>
                        </td>
                        <td class = 'TdItems' style = 'width:15%;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($item->TotalUnitarioInterno)
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
                                            echo number_format($item->ValorUnitario)
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
                                            echo number_format($item->SubtotalUnitario)
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
                                            echo number_format($item->TotalUnitario)
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
                                            echo number_format($item->ValParcial)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endforeach
                    <tr>
                        <td colspan = '6'></td>
                        <th style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($g->SubTotalInterno)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td ></td>
                        <th  style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($g->TotalInterno)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td ></td>
                        <th style = 'width:15%;border:1px solid white;'>
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($g->SubTotal)
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
                                            echo number_format($g->Total)
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
                                    <th colspan = '3'>RESUMEN DE ACTIVIDAD</th>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Valores Comisionables</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalPptoAntesComision)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Valores No Comisionables</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->NoComisionable)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Excedente Asociados</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(0)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Total Costos de Ejecución</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalCostoEjecucion)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>Imprevistos</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(0)
                                                    @endphp
                                                </td>
                                                <td style = 'width:20%;text-align:right;'>%</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class = 'ThSub'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(0)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>Gastos Administrativos</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(0)
                                                    @endphp
                                                </td>
                                                <td style = 'width:20%;text-align:right;'>%</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class = 'ThSub'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(0)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>Comisión Agencia</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->Porcentaje)
                                                    @endphp
                                                </td>
                                                <td style = 'width:20%;text-align:right;'>%</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class = 'ThSub'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->Comision)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Total Actividad</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalActividad)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Total Comisiones Por Descuentos</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalComisionesporDescuentos)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Utilidad Comercial</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->UtilidadComercial)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Volumen</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->VolumenGlobal)
                                                    @endphp
                                                </td>
                                                <td style = 'width:20%;text-align:right;'>%</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Utilidad Marginal</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->UtilidadMarginal)
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
                                    <th colspan = '3'>RESUMEN DE IMPUESTOS</th>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Valor Total Sin Iva</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalActividad)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Impuestos Adicionales</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>

                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                            <td style = 'width:20%;text-align:right;'>%</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>
                                                            <td style = 'width:20%;text-align:right;'>$</td>
                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Factoring</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>

                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                            <td style = 'width:20%;text-align:right;'>%</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>
                                                            <td style = 'width:20%;text-align:right;'>$</td>
                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Del Proyecto e Intereses Bancarios</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>

                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                            <td style = 'width:20%;text-align:right;'>%</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>
                                                            <td style = 'width:20%;text-align:right;'>$</td>
                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Del Proyecto Intereses a 3ros</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td class = 'TdItems'>
                                                    <table width ='100%'>
                                                        <tr>

                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                            <td style = 'width:20%;text-align:right;'>%</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class = 'TdItems' >
                                                    <table width ='100%'>
                                                        <tr>
                                                            <td style = 'width:20%;text-align:right;'>$</td>
                                                            <td style = 'text-align:right;'>
                                                                @php
                                                                    echo number_format(0)
                                                                @endphp
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Total Costos Financieros e Impuestos</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->TotalActividad)
                                                    @endphp
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class = 'ThSub' colspan = '2' style = 'text-align:left;padding-left:5px;'>Utilidad Final	</td>
                                    <td class = 'TdItems'>
                                        <table width ='100%'>
                                            <tr>
                                                <td style = 'width:20%;text-align:right;'>$</td>
                                                <td style = 'text-align:right;'>
                                                    @php
                                                        echo number_format(session("DataPpto")[0]->UtilidadFinal)
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