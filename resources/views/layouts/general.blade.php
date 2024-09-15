<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROCESS</title>
        <!--<link rel="icon" href="image/faviconF.ico">-->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="css/all.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap4-toggle.min.css" rel="stylesheet">
        <?php echo '<link href="css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>
        
        <?php echo '<script type="text/javascript" src = "js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <?php echo '<script type="text/javascript" src = "js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>
        <?php echo '<script type="text/javascript" src = "js/dataTables.bootstrap4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/dataTables.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        
        <!-- Styles -->
        <script>
        $( function() {
          $( "#tabs" ).tabs();
        } );
        </script>
        <style>
            html, body {
                font-family: 'Century Gothic', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
            

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
            .contentHeader{
                
                width:100%;
            }
            .Tittle{
                color:#213E70;
                font-weight: bold;
                font-size:30px;
                text-align: right;
                vertical-align: middle;
            }
            .contenedor{
                width: 1080px;
                margin: auto;
                background: black;
                color: bisque;
                padding: 20px 15px 50px 50px;
                border-radius: 10px;
                box-shadow: 0 10px 10px 0px rgba(0, 0, 0, 0.8);
            }

            .contenedor .titulo{
                font-size: 3.5ex;
                font-weight: bold;
                margin-left: 10px;
                margin-bottom: 10px;
            }

            #pestanas {
                float: top;
                font-size: 3ex;
                font-weight: bold;
            }

            #pestanas ul{
                margin-left: -40px;    
            }

            #pestanas li{
                list-style-type: none;
                float: left;
                text-align: center;
                margin: 0px 2px -2px -0px;
                background: darkgrey;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border: 2px solid bisque;
                border-bottom: dimgray;
                padding: 0px 20px 0px 20px;
            }

            #pestanas a:link{
                text-decoration: none;
                color: bisque;
            }

            #contenidopestanas{
                clear: both;  
                background: dimgray;
                padding: 20px 0px 20px 20px;
                border-radius: 5px;
                border-top-left-radius: 0px;
                border: 2px solid bisque;
                width: 1025px;
            }
            .InputDark{
                background-color: #8B98AF;
                color:white;
            }
            .BoldFont{
                font-weight: bold;
            }
            .ContentFooter{
                background-color: #213E70;
                position: fixed;
                left:0px;
                bottom: 0;
                width: 100%;
                height: 80px;
                color: white;
            }
            .ContentFooter #TableMenu{
                position: absolute;
                left:0px;
                bottom: 0;
                height: auto;
                z-index: 1;
            }
            #TableMenu td{
                border:0px;
                padding-bottom: 10px;
            }
            .ContentHeader td{
                padding-bottom: 0px;
            }
            .IconMenuImg{
                height: 100px;
            }
            .MenuOptionP:hover .HoverEvent{
                display:block;
            }
            .MenuOptionP .HoverEvent {
                display: none;
                position: absolute;
                background-color: #DCDFE4;
                width: auto;
                height: 100px;
                top:-120px;
                border-radius: 0.5em;
            }
            .container{
                padding:0px;
                margin: 0px;
                padding-bottom: 150px;
            }
            .table th{
                vertical-align: middle;
                text-align: center;
                background-color:#BCCCDC;
                border:1px solid white;
                white-space:nowrap;
            }
            .table td{
                vertical-align: middle;
                border:1px solid white;
            }
            .table th:first-child{
                border-top-left-radius: 0.5em;
            }
            .table th:last-child{
                border-top-right-radius: 0.5em;
            }
            .OptionsButtons{
                color:#213E70;
                font-weight: bold;
                text-align: right;
                vertical-align: middle;
                font-family: 'Nunito';  
            }
            #tabs li{
                background-color: #8B98AF;
                border-top-left-radius: 3em;
                border-top-right-radius: 3em;
            }
            .ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited,#tabs li:active,#tabs li a:active,.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover{
                background-color: #213E70;
                color:white;
                font-weight: bold;
                border:0px;
                border-top-left-radius: 3em;
                border-top-right-radius: 3em;
            }
            .ui-widget-header{
                background-color:white;
                border:0px;
            }
            .ListDocument tr{
                background-color:#f3eded;
                margin:2px;
                border-spacing: 1px;
            }
            .content_modal{
                background-color: #adb5bd;
            }
            .form-group label, .form-group select, .form-group input{
                color:black;
                font-size:16px;
                font-weight: bold;
            }
            option{
                color:black;
                font-size: 16px;
                font-weight: bold;
            }
            .dataTable th, .dataTable td{
                font-size:13px;
            }
            
            .container{
                position:relative;
                top:25px;
                width:100%;
            }
            .ContentHeader td{
                border:0px;
            }
            .Nota{
                font-weight: bold;
                font-size: 20px;
                color:#78797B;
            }
            .form-control{
                width: 300px;
                border: none;
                margin: 5px;
                height: 50px;
                background-color: #BFE6F4;
                border-radius: 5em;
            }
            .btn-primary{
                border-radius: 5em;
            }
            #Titulo{
                position:absolute;
                top:80%;
                
            }
            .TituloPrincipal{
                color:#174178;
                font-size: 30px;
                font-weight: bold;
                margin-left: 10px;
            }   
            .FormInicio{
                position:absolute;
                left:50px;
            }
            body{
                /*background-image: url("image/Inicioc.jpg") ;
                background-image: no-repeat;
                background-attachment: fixed;
                background-image: center;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
                background-color:white;
                margin: 0px 10px 100px 100px;*/
            }
            body, html{height:100%}
            .form-control,.form-group input, input::placeholder{
                background-color:white;
                border-radius:0em;
                padding:2px;
                height: auto;
            }
            .form-control{
                border: 1px solid #417EC1;
                
            }
            form{
                font-family: "Montserrat" Regular;
            }
            
        </style>
    </head>
    <body >
        <div class = 'fpondo'>
            {{ csrf_field() }}
                @yield('content')

            <?php echo '<script type="text/javascript" src = "js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
            <?php echo '<script type="text/javascript" src = "js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>

            <?php echo '<script type="text/javascript" src = "js/popper.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
            <?php echo '<script type="text/javascript" src = "js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>


            <?php echo '<script type="text/javascript" src = "js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
            <?php echo '<script type="text/javascript" src = "js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
            <?php echo '<script type="text/javascript" src = "js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        </div>
        
    </body>
</html>