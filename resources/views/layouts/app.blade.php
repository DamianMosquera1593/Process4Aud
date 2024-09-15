<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROC3SS+</title>
        <link rel="icon" href="images/favicon.ico">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        
        <!-- Styles -->
        <style>
            html, body {
                /*background-color: #32383e;*/
                background-image: url("images/FondoLogin.jpg");
                background-image: no-repeat;
                background-image: fixed;
                background-image: center;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
                color: #ffffff;
                font-family:  Century Gothic,CenturyGothic,AppleGothic,sans-serif; 
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
            .LoginContenedor{
                position: absolute;
                top:65%;
                left:65%;
                width:250px;
            }
            .LoginContenedor input{
                background-color: transparent;
                border: 1px solid #3488B7;
                color:white;
                font-size:14px;
            }
            .LoginContenedor input::placeholder {
                color: white;
                background-color: transparent;
                text-align: center;
              }
            .textosLogin{
                color: #144377;
                
                text-align:center;
                font-weight: bold;
            }
            .BotonLogin{
                background-color:  #154177;
                color:white;
                border: 1px solid #5B6670;
                font-size:14px;
            }
            .vl {
                height: 100%;
                width:auto;
                position: absolute;
                left: 0%;
                min-width:70px;
                top: 0;
                color:white;
                background-color:#1B4075;
                padding-left:8px;
                padding-right: 8px;
            }
            .MenuTop{
                position:relative;
                top:15%;
            }
            .SeparadorMenuLogo{
                color:black;
                border:1px solid black;
            }
            </style>
            
    </head>
    <body >
        <div class = "container">
            @yield('content')
        </div>
        
        <script>


    </script>
    </body>
</html>