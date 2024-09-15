<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>{{session("DataPDF")['Titulo']}}</title>
        <style>
            .page-break {
                page-break-after: always;
            }
            
            html, body{
                font-family: "Century Gothic", "CenturyGothic", AppleGothic, sans-serif;
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
                margin-top: 1cm;
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
            
            .tableNew,.DetallePpto{
                width:100%;
                border-collapse: separate !important;
                border-spacing: 0;
            }
            .tableNew th{
                color: #417EC1;
                font-weight: bold;
                text-align:center;
                padding:5px;
                font-size:14px;
                padding-bottom: 5px;
            }
            .tableNew td{
                background-color:#F1F2F2;
                color:black;
                border:1px solid #B7C5CE;
                border-spacing: 1px;
                padding:5px;
                font-size:12px;
                border-radius:0.3em;
            }
            
            .ThSub{
                color: #417EC1;
                font-weight: bold;
                text-align:center;
                padding:5px;
                font-size:14px;
                padding-bottom: 5px;
            }
            .TdItems{
                background-color:#F1F2F2;
                color:black;
                border:1px solid #B7C5CE;
                border-spacing: 1px;
                padding:5px;
                font-size:12px;
                border-radius:0.3em;
            }
        </style>
    </head>
    
    @yield('content')
    
    