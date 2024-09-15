@extends('process.pdf.header_min')
<body >
    <head>
        <meta charset="UTF-8">
        <title>INVENTARIO GENERAL</title>
    </head>
    
    <header>
        <table width ='100%'>
            <tr>
                <td class = 'CenterText' style = 'width:15%'>
                    <h2>INVENTARIO GENERAL</h2>
                </td>
            </tr>
        </table>
        <BR>
    </header>

        <div class = 'ContentPanelCorreo' >
            
            <div class = 'BodyInf'>
                <table class ='DetallePpto'>
                    <tr>
                        <th class = 'ThSub'>No.</th>
                        <th class = 'ThSub'>Foto</th>
                        <th class = 'ThSub'>Item</th>
                        <th class = 'ThSub'>Descripción</th>
                        <th class = 'ThSub'>Ubicación</th>
                        <th class = 'ThSub'>Propietario</th>
                        <th class = 'ThSub'>Cantidad</th>
                        <th class = 'ThSub'>Costo Unitario</th>
                        <th class = 'ThSub'>Costo Total</th>
                    </tr>
                    @php
                        $i = 1;
                        $Total = 0;
                    @endphp
                    @foreach( session("DataInventario") as $item )
                        <tr>
                            <td class = 'TdItems CenterText' >{{$i}}</td>
                            <td class = 'TdItems CenterText' >
                                <img style = 'padding:5px;'src='{{asset('../storage/app/datos/InventarioGeneral/'.urldecode($item->id.'_'.$item->Foto))}}' height="70px" />
                            </td>
                            <td class = 'TdItems ' >{{$item->Nombre}}</td>
                            <td class = 'TdItems ' >{{$item->Descripcion}}</td>
                            <td class = 'TdItems ' >{{$item->Ubicacion}}</td>
                            <td class = 'TdItems ' >{{$item->Propietario}}</td>
                            <td class = 'TdItems CenterText' >{{$item->Cantidad}}</td>
                            <td class = 'TdItems ' >
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                echo number_format($item->CostoUnitario)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class = 'TdItems ' >
                                <table width ='100%'>
                                    <tr>
                                        <td style = 'width:20%;text-align:right;'>$</td>
                                        <td style = 'text-align:right;'>
                                            @php
                                                $Total += ($item->CostoUnitario * $item->Cantidad);
                                                echo number_format($item->CostoUnitario * $item->Cantidad)
                                            @endphp
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        @php
                            $i++;
                        @endphp
                    @endforeach
                    <tr>
                        <th ></th>
                        <th class = 'TdItems CenterText' colspan = '7'>TOTAL</th>
                        
                        <th class = 'TdItems ' >
                            <table width ='100%'>
                                <tr>
                                    <td style = 'width:20%;text-align:right;'>$</td>
                                    <td style = 'text-align:right;'>
                                        @php
                                            echo number_format($Total)
                                        @endphp
                                    </td>
                                </tr>
                            </table>
                        </th>
                    </tr>    
                </table>
            </div>
        </div>

@extends('process.pdf.footer')