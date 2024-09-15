<!DOCTYPE html>
<html>
<head>

    <?php echo '<link href="'.url("/").'/css/fullcalendar.css" rel="stylesheet">' ;?>

    <?php echo '<script type="text/javascript" src = "'.url("/").'/js/jquery-3.4.1.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <?php echo '<script type="text/javascript" src = "'.url("/").'/js/datatables.min.js?v='.date("Y-m-d H:i:s").'"></script>';?>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    <script type='text/javascript' src='js/moment.min.js'></script>
    <script type='text/javascript' src='js/fullcalendar.min.js'></script>
    <script type='text/javascript' src='js/locale/es.js'></script>
    <?php echo '<script type="text/javascript" src = "'.url("/").'/js/general.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <?php echo '<script type="text/javascript" src = "'.url("/").'/js/GlobalVarials.js?v='.date("Y-m-d H:i:s").'"></script>';?>
    <?php echo '<script type="text/javascript" src = "'.url("/").'/js/FunctionsGlobal.js?v='.date("Y-m-d H:i:s").'"></script>';?>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap4-toggle.min.css" rel="stylesheet">
    <?php echo '<link href="css/general.css?v='.date("Y-m-d H:i:s").'" rel="stylesheet">';?>

    <link rel='stylesheet' type='text/css' href='css/general.css' />
    <style>

    </style>

    <script>

    </script>
</head>

<body>

<div class="container">
    
    {{ csrf_field() }}
    <table >
        <tr>
            <td style = 'padding-right:10px;'>
                <div>
                    <img src ='../images/Calendario.png' onerror="this.src='images/Calendario.png'" class ='IconMenuP Cursor' data-toggle="modal" data-target="#myModalX"  onclick = 'SolicitarNuevoPermiso()'/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" data-toggle="modal" data-target="#myModalX"  onclick = 'SolicitarNuevoPermiso()'>Solicitar Nuevo Permiso</span>
                </div>
            </td>
        </tr>
    </table>
    <div class="row">
        <div id="content" class="col-lg-12">
            <div id="calendar"></div>
            <div class = 'Visual'></div>
        </div>
    </div>
    <div class="modal fade" id="myModalX" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalX" aria-hidden="true" style="overflow-y: scroll;">
        <div class="modal-dialog modal-lg" role="document" id = "ModalContentForm4" >
            <div class="content_modal4 modal-content">

            </div>
        </div>
    </div>
</div>
</body>
</html>
