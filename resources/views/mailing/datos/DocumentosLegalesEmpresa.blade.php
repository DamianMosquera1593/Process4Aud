<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>{{$Asunto}}</title>
</head>
<body>
    <div style="font-family:'Avenir Next','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;line-height:1.65">
        <table style="width:100%!important;height:100%;background:#f8f8f8;">
            <tr>
                <td colspan = '2' style = 'text-align: center;'>
                    <img src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/process.png' height= '70px'  />
                </td>
            </tr>
            <tr>
                <td colspan = '2' style="background:white;padding:30px 35px">
                    <table>
                        <tr>
                            <td style = 'text-align:justify;'><?php echo nl2br("$Cuerpo");?></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br>
        <table style = 'border-collapse: collapse;'>
            <tr>
                <th style = 'border:1px solid black;'>No.</th>
                <th style = 'border:1px solid black;'>Nombre Documento</th>
                <th style = 'border:1px solid black;'>Descarga Documento</th>
            </tr>
        <?php
            for( $i = 0; $i < count($Docs); $i++ ){
                $t = "<tr>";
                    $t .= "<td style = 'text-align:center;border:1px solid black;'>".($i+1)."</td>";
                    $t .= "<td style = 'border:1px solid black;'>".$Docs[$i]['Nombre']."</td>";
                    $t .= "<td style = 'text-align:center;border:1px solid black;'>";
                        $t .= "<a href = 'http://process.grupotesta.com.co:8989/PProcess3/storage/app/datos/empresas/$Hash/DocumentosLegales/".$Docs[$i]['Name']."'>";
                            $t .= "<img src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/BPdf.png' height= '50px'  />";
                        $t .= "</a>";
                    $t .= "</td>";
                $t .= "</tr>";
                
                echo $t;
            }
        ?>
        </table>
    </div>
</body>
</html>
