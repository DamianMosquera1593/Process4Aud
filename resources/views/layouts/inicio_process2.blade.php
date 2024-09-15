<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROC3SS+</title>
        <!-- Fonts -->
        
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        {{-- Animate --}}
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <?php echo '<link href="'.url("/").'/css/all.css" rel="stylesheet">' ;?>
        <?php echo '<link href="'.url("/").'/css/bootstrap.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/css/bootstrap4-toggle.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/alertifyjs/css/alertify.min.css" rel="stylesheet">';?>
        <?php echo '<link href="'.url("/").'/alertifyjs/css/themes/default.min.css" rel="stylesheet">';?>
        

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap4-toggle.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/datatables.min.css"/>' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/dataTables.bootstrap4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/dataTables.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/ckeditor.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/sample.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Ckeditor/config.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/summernote-bs4.min.css"/>' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/summernote-bs4.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/GlobalVarials.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/FunctionsGlobal.js?v='.date("Y-m-d H:i:s").'"></script>';?>


        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/Parametrizacion/generales.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.modal.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/alertifyjs/alertify.min.js"></script>';?>

        <?php echo '<link rel="stylesheet" type="text/css" href="'.url("/").'/css/jquery.modal.min.css"/>' ;?>
        
        <?php echo '<link href="'.url("/").'/css/fullcalendar.css" rel="stylesheet">' ;?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/moment.min.js"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/fullcalendar.min.js"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/locale/es.js"></script>';?>
        <?php echo '<script type="text/javascript" src = "js/jquery.tablednd.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        <!-- Styles -->
        <style>

            .full-height {
                height: 100vh;
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

            .table{
                padding-left:1px;
                padding-right:5px;
            }
            .dataTables_length,.dataTables_info{
                padding-left:5px;
            }
            .dataTables_filter,.pagination{
                padding-right: 5px;
            }


        </style>
    </head>
    <body >
        <div class = 'MenuTop' >
            <table width='100%'>
                <tr>
                    <td colspan = '2' class ='TituloPantalla' style = 'color:#1B4177;'></td>
                </tr>
                <tr>
                    <td>
                        <a href = '{{ route('CerrarSesion') }}' style = 'color:#7F8080;'>CERRAR SESIÓN</a>
                    </td>
                    <td>
                        <a href = '{{ route('CerrarSesion') }}'>
                            <img src ='../images/cerrar_sesion.png' onerror = this.src='images/cerrar_sesion.png' style = 'height: 25px;'/>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
        <div class = 'ContentBody'>
            @yield('content')
        </div>


        <div class="modal fade" id="ModalEdit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm" >
                <div class="content_modal modal-content">

                </div>
            </div>
        </div>
        <div class="modal fade" id="ModalEdit2" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit2" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm2" >
                <div class="content_modal2 modal-content">

                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalEdit3" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ModalEdit3" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm33" >
                <div class="content_modal33 modal-content">

                </div>
            </div>
        </div>

        <div class="modal fade" id="myModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" style="overflow-y: scroll;">
            <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm3" >
                <div class="content_modal3 modal-content">

                </div>
            </div>
        </div>

        <div id="spinner" class="spinner" style="display:none;">
            <?php echo '<img id="img-spinner" onerror=this.src="'.url("/").'/images/Cargando.gif" src="'.url("/").'/images/Cargando.gif" alt="Cargando..."/>' ?>
        </div>
        {{ csrf_field() }}

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.es.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/popper.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>



        <script>

        $(document).ready(function () {
                       
            $(".ContenedorMenuF .OpcionesMenuUsuario").click(function(){
                $(".OpcionesMenuUsuario,.SubMenuMod").css({
                    'background': '#1B4075',
                    'border-left': '0px',
                    'padding-left': '5px'
                })
                $(".SubMenuMod").hide()
                $(".FirstText").show()
                
                
                $(".ContentPanel").css({
                    'top':120,
                    'left':'0%'
                    'height': $(".vl").height()-130,
                    'width':$("body").width()-10-$(".vl").width(),
                    
                })
                if(!$(this).next().is(":visible"))
                {
                    $(this).next().slideDown();
                    $(this).find('.Menu').show();
                    $(this).css({
                        'background': '#003545',
                        'border-left': '5px solid lightgreen',
                        'padding-left': '15px'
                    })
                }
                
            })
            $("#accordian ul ul").hide();
            $(".vl").css({'overflow-y':'scroll'})
            $(".IndicadorMenu").css({'left':$(".vl").width()+35})
            
            $("body").scrollTop();
            $("body").resize(function(){
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            })
            $( window ).resize(function() {
                $(".IndicadorMenu").css({'left':$(".vl").width()+35})
                $(".ContentPanel").css({
                    'width':$("body").width()-10-$(".vl").width()
                })
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            })
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            $(".TabsMenu_Tabs li").css({
                'background-color':'#1B4075'
            })
        });

    </script>
    <style>

        .ContentPanelxx {
            position: absolute;
            top: 100px;
            left:0px;
            padding-left: 5px;
            padding-right:5px;
        }
        body,.ContentBody {
            padding-left: 0px;
            padding-right: 0px;
        }
        .ContenedorItemsGrupos{
            overflow:scroll;
            height:250px;
        }


    </style>
    </body>
</html>
