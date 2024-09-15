        <footer>
            <table width ='100%'>
                <tr>
                    <td class = 'CenterText Border' >
                        <hr>
                        <table class = 'ContentFooter'>
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
                                    {{session("DataPDF")['FechaImpresion']}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </footer>
    </body>
</html>