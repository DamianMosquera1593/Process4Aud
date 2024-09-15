<!DOCTYPE html>
<html lang="es" >
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>PROC3SS+</title>
        <?php echo '<link rel="icon" href="'.url("/").'/images/favicon.ico" >' ;?>
        <!-- Fonts -->
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
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
        <script src="//cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>

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
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.tablednd.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        
        
        <!-- Styles -->
        <style>
            body{
                
            }
            

        </style>
    </head>
    <body >

        {{ csrf_field() }}
        
        <span class = 'HiddenInformation FormEncuestaCliente'>{{session("ENCUESTA_CLIENTE")}}</span>
        <span class = 'HiddenInformation FormEncuestaEjecutivo'>{{session("ENCUESTA_EJECUTIVO")}}</span>
        <span class = 'HiddenInformation _KeyUser'>{{session("keyUser")}}</span>
        
            
        @extends('layouts.menu')
        
        @extends('layouts.footer')

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
        

        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-ui.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap-datepicker.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery.validate.es.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/popper.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <?php echo '<script type="text/javascript" src = "'.url("/").'/js/bootstrap.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
        <script src="//cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    </body>
</html>
