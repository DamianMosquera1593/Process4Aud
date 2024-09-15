<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TRAFICO {{strtoupper($nameChannel)}}</title>
    <style>

        body{
            margin : 4px;
            padding: 3px;
            padding-top: 75px;
            font-family:Arial, Helvetica, sans-serif;
        }
        .CenterText{
            text-align: center;
        }
        .intro {
            text-align: center;
        }
        .intro h1 {
            margin: 3px;
            font-size: 14pt;
        }
        .intro p {
            margin: 1px;
            padding: 1px;
            font-size: 10pt;
        }
        .section {
            margin-top: 5px;
            margin-bottom: 5px;
            padding-top: 5px;
            padding-bottom: 5px;
        }
        table {
            width: max-content;
        }
        .grupo {
            text-align: center;
            background-color: #ACB9C9;
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            color: white;
        }
        header {
            position: fixed;
            top:0px;
            width: 100%;
        }
        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 1cm;
            font-size: 8pt;
        }
        footer div {
            display: inline-block;
            margin: 0;
            padding: 0;
        }
        .page-break {
            page-break-before: auto;
            margin-bottom: 10px;
            padding-bottom: 10px;
            margin-top: 10px;
            padding-top: 10px;
        }
        
        .TituloTablasResumen {
            padding: 5px;
            text-align: CENTER;
            font-size: 12px;
            background-color: #769ED2;
            border-top-left-radius:0.3em;
            border-top-right-radius:0.3em;
            font-weight: bold;
            color: WHITE;
        }
        .TablaReportes_TituloPrincipal {
            background-color:#D1D2D4;
            color:#2C3581;
            text-align: center;
            border-radius:0.3em;
            border:1px solid #889EAF;
            font-size:12px;
        }
        .TablaReportes_Cuerpo {
            padding: 5px;
            font-size: 12px;
            background-color: #F1F2F2;
            padding: 5px 5px 5px 10px;
            border: 1px solid #B7C5CE;
            border-style: solid;
            border-image: initial;
            text-align: left;
            border-radius:0.3em;
        }
        .TablaReportes_Cuerpo_Center {
            padding: 5px;
            font-size: 12px;
            background-color: #F1F2F2;
            padding: 5px 5px 5px 10px;
            border: 1px solid #B7C5CE;
            border-style: solid;
            border-image: initial;
            text-align: center;
            border-radius:0.3em;
        }
        .TablaReportes_Total_Center {
            padding: 5px;
            font-size: 12px;
            background-color: #F1F2F2;
            padding: 5px 5px 5px 10px;
            border: 1px solid #B7C5CE;
            border-style: solid;
            border-image: initial;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <header>
        <table width ='100%'>
            <tr>
                <td style ='background-color:white;text-align:center;'>
                    <div class="intro">
                        <h1>TRAFICO {{strtoupper($nameChannel)}}</h1>
                        <p>{{strtoupper($Usuario->NombreUsuario)}}</p>
                        <p>{{$date}}</p>
                        <p></p>
                    </div>
                </td>
            </tr>
        </table>
    </header>
    <footer>
        <hr>
        <table width ="100%">
            <tr>
                <td style = 'text-align:left;' >
                    <img src ='{{public_path()}}/images/process.png' height="40px"/>
                </td>
                <td class = 'CenterText'>
                    <script type="text/php">
                        if (isset($pdf)) {
                            $text = "{PAGE_NUM} / {PAGE_COUNT}";
                            $size = 8;
                            $font = $fontMetrics->getFont("Verdana");
                            $width = $fontMetrics->get_text_width($text, $font, $size) / 2;
                            $x = ($pdf->get_width() - $width) / 2;
                            $y = $pdf->get_height() - 28;
                            $pdf->page_text($x, $y, $text, $font, $size);
                        }
                    </script>
                </td>
                <td style = 'text-align:right;' >
                    Fecha de Impresión
                    <p></p>
                    {{$FechaImp}}
                </td>
            </tr>
        </table>
    </footer>
    
    @if (count($groups) != 0)
    @php
        $j = 1;
    @endphp
    @for ($i = 0; $i < count($groups); $i++)
        <div class="page-break">
                <table width = '100%'>
                        <tr >
                            <th colspan ='9' ><div class="TituloTablasResumen" >{{$groups[$i]->Nombre}}</div></th>
                        </tr>
                    <tbody>
                        @if (count($groups[$i]->Subgrupos) != 0)
                            @foreach ($groups[$i]->Subgrupos as $sg)
                                    <tr>
                                        <th class = 'TablaReportes_Total_Center' colspan ='9' >
                                            {{$sg->Nombre}}
                                        </th>
                                    </tr>
                                    <tr >
                                        <th class="TablaReportes_TituloPrincipal" >No</th>
                                        <th class="TablaReportes_TituloPrincipal" >Nombre</th>
                                        <th class="TablaReportes_TituloPrincipal" >Status</th>
                                        <th class="TablaReportes_TituloPrincipal" >Tarea</th>
                                        <th class="TablaReportes_TituloPrincipal" >Responsables</th>
                                        <th class="TablaReportes_TituloPrincipal"  colspan="2">Fecha solicitud</th>
                                        <th class="TablaReportes_TituloPrincipal" >Fecha entrega</th>
                                        <th class="TablaReportes_TituloPrincipal" >¿Vencido?</th>
                                    </tr>
                                    @if( ($sg->NumA) != 0 )
                                        @foreach( $sg->Actividades as $act )
                                            <tr >
                                                <th class="TablaReportes_Cuerpo_Center" >{{$j}}</th>
                                                <td class ="TablaReportes_Cuerpo" >{{$act->NombreTarea}}</td>
                                                <td class ="TablaReportes_Cuerpo" >{{$act->Status}}</td>
                                                <td class ="TablaReportes_Cuerpo" >{{$act->Tarea}}</td>
                                                <td class ="TablaReportes_Cuerpo" >
                                                    <table style = 'width:100%'>
                                                        @foreach($act->responsables as $rr)
                                                        <tr><td nowrap >- {{$rr->Nombre}}</td></tr>
                                                        @endforeach
                                                    </table>
                                                </td>
                                                <td class ="TablaReportes_Cuerpo" nowrap>{{$act->fecha_solicitud}} {{$act->fecha_solicitud2}}</td>
                                                <td class ="TablaReportes_Cuerpo_Center"  >{{$act->hora_solicitud}}</td>
                                                <td class ="TablaReportes_Cuerpo" nowrap>{{$act->fecha_entrega}} {{$act->fecha_entrega2}}</td>
                                                <td class ="TablaReportes_Cuerpo" nowrap>
                                                    @if( $act->Dif > 0 )
                                                        Si, por {{$act->Dif}} días
                                                    @else
                                                        No
                                                    @endif
                                                </td>
                                            </tr>
                                            @php
                                                $j++;
                                            @endphp
                                        @endforeach
                                        <tr>
                                            <th  ></th>
                                        </tr>
                                        
                                    @endif
                             @endforeach   
                        @else
                            <tr class="table-success">
                                <td colspan="9" class="TablaReportes_Cuerpo_Center">Grupo sin registro de actividades</td>
                            </tr>
                        @endif
                    </tbody>
                </table>
            </div>
        </div>
        @endfor
    @else
        <div class="section">
            <div class="grupo">No hay registros de grupos para este canal</div>
        <div class="section">
    @endif

    <script type="text/php">
        if ( isset($pdf) ) {
            $x = 550;
            $y = 800;
            $text = "{PAGE_NUM} / {PAGE_COUNT}";
            $font = $fontMetrics->get_font("Arial", "bold");
            $size = 10;
            $color = array(0,0,0);
            $word_space = 0.0;  //  default
            $char_space = 0.0;  //  default
            $angle = 0.0;   //  default
            $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
        }
    </script>
</body>
</html>
