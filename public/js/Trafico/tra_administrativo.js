$(document).ready(function () {
    ContentList('TRAADMINCANALES')
    ContentList('TRAADMACTIVDAD')
    //tableCanalesAdministrativo()
    //tableTraActividades()
    //notificaciones()
    //ListarCanales();
    
})

var _Canales = [];
var _TareasProyecto = [];
var AdjuntosInf = [];
var filesT = [];
var $tableFilesInf  = null;
var $tableFiles = null;
var UserConsulta = 0;

function __ConsultarDetalleProyecto(Hash,EstadoOT){
    var formData = new FormData();
    formData.append( "Hash", Hash )
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__DetalleOtsTrafico',
        success:function(data){
            _TareasProyecto = data.Tareas
            __VerDetalleOt(Hash,EstadoOT)
        }
    })
}

function _AddTareaOTNew(Ot,EstadoOt){
    __SaveTareaProyecto(Ot,0)
    var formData = new FormData();
    formData.append( "Ot", Ot )
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__AddNuevaTreaOt_',
        success:function(data){
            var html = "";
            
            __ConsultarDetalleProyecto(Ot,1)
            location.href = "#__TareaId"+data.IdTarea
        }
    })
}

function __SaveTareaProyecto(Ot,Msj){
    var formData = new FormData();
    formData.append( "Ot", Ot )
    formData.append( "NumTareas", $(".ProyectoTareas_").length )
    var x = 1;
    $(".ProyectoTareas_").each(function(i){
        formData.append( "IdTarea"+x, $(this).text() )
        formData.append( "Asunto"+x, $("._Asunto_T"+$(this).text()).val() )
        formData.append( "Descrip"+x, $(".__DescAct"+$(this).text()).val() )
        formData.append( "FEntrega"+x, $(".__FechaEntrega"+$(this).text()).val() )
        formData.append( "NumEntregables"+x, $("._NumEntregablesTareas"+$(this).text()).val() )
        formData.append( "Status"+x, $("._Status_T"+$(this).text()).val() )

        x++;
    })

    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__SaveTareaOtProyecto_',
        success:function(data){
            var html = "";
            if( data.info == 1 ){
                if( Msj == 1 ){
                    alert("Datos Guardados Correctamente")
                }
                
            } else{
                alert("Datos Sin Guardar.\Contacte al Administrador.")
            }
        }
    })
}


function GuardarAsignadosTreas_(Hash){
    if( NotificadosMensajesTA.length > 0 ){
        var formData = new FormData();
        var Hash= document.getElementsByName('_tokenHash')[0].value;
        formData.append("Cdata",JSON.stringify(NotificadosMensajesTA));
        formData.append("Hash",Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'__AsignadosTareasTraficos',
            success:function(data){
                alert("Responsable Guardado");
                NotificadosMensajesTA = [];
                var html = "";
                ModalEdit2(0)
                __ListarNivel1()
                location.href = "#__TareaId"+Hash
            }
        })
        
    }
}

function __TareasAsignados(Hash){
    var html = "";
    TituloVentana = "Nuevo Asignado"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Responsables.enviar(event)' action='"+Responsables.rutaCrear+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' onkeyup = 'ListarUsuariosTA()'name='traNombre' placeholder='Nombre Responsable' autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<div class='col-sm-12 TempCopiados'>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<div class='col-sm-12 Copiados'>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' onclick = 'GuardarAsignadosTreas_("+Hash+")' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
}

const Tarea ={
    id: null,
    codigo: null,
    notificacion: false,
    files : [],
    downloadFile: function (id) {
        window.open((UrlUniversal+'70387f8087a0fc297af72111d10f50d3/'+id), '_blank')
    },
    loadFilesInf: function(e) {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            AdjuntosInf.push(files[i]);
        }
        e.target.value = ''
        $tableFilesInf.destroy()
        $tableFilesInf.draw();
        this.listarFilesInf();
    },
    loadFiles: function(e) {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            filesT.push(files[i]);
        }
        e.target.value = ''
        $tableFiles.destroy()
        $tableFiles.draw();
        this.listarFiles();
    },
    listarFiles: function () {
        let dataRows = []
        for (let i = 0; i < filesT.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: filesT[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFiles = $('#listaAdjuntosTareaOT').DataTable({
            data:dataRows,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "Tarea.deleteFiles(\''+data+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
        })
        $('#listaAdjuntosTareaOT').css({'width':'100%'})
    },
    listarFilesInf: function () {
        let dataRows = []
        for (let i = 0; i < AdjuntosInf.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: AdjuntosInf[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFilesInf = $('#listaAdjuntosInfOT').DataTable({
            data:dataRows,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "OTCliente.deleteFilesInf(\''+data+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
        })
        $('#listaAdjuntosInfOT').css({'width':'100%'})
    },
    deleteFiles: function (id) {
        this.files.splice(parseInt(id)-1, 1)
        $tableFiles.destroy()
        $tableFiles.draw();
        this.listarFiles()
    },
}

function __NTareasAdjuntos(IdOt,Hash){
    __SaveTareaProyecto(Hash,0)
    var html = "";
    TituloVentana = "Nuevo Adjunto Tarea"
    ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class='form-group'>";
            html += "<label>Adjuntos:</label>";
            html += "<input type='file' class='form-control' onchange='Tarea.loadFiles(event)' multiple>"
        html += "</div>";

        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Descartar</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"
    html += "</div>";
    html += "<div class='modal-footer'>";
            html += "<button type='button' onclick = '__GuardarAdjuntosTareas("+IdOt+","+Hash+")' class='btn btn-primary'>Guardar</button>";
        html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
    Tarea.listarFiles()
}

function __GuardarAdjuntosTareas(IdOt,Hash){
    if ( filesT.length > 0 ){
        var formData = new FormData();
        formData.append("Cdata",JSON.stringify(filesT));
        formData.append("Hash",Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'__GuardarAdjuntosTareas',
            success:function(data){
                var x = parseInt( $(".__NumAdjuntosTarea_"+Hash).text() )
                $(".__NumAdjuntosTarea_"+Hash).text( x + filesT.length )
                filesT = [];
                ModalEdit2(0)
            }
        })
    }
}

function __TareasAdjuntos(Hash){
    var formData = new FormData();
    formData.append("Hash",Hash);
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__VerAdjuntosTareas',
        success:function(data){
            var html = "";
            TituloVentana = "Adjuntos Tarea"
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Archivo</th>"
                        html += "<th>Descargar</th>"
                    html += "</tr>"
                    if( data.Adj.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '4'>No se han adjuntado archivos.</td>"
                        html += "</tr>"
                    }else{
                        for( var i = 0; i < data.Adj.length; i++ ){
                            html += "<tr class = ''>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td >"+ data.Adj[i]['Archivo'] +"</td>"
                                html += "<td class = 'CenterText'>"
                                    html += "<span onclick = 'Tarea.downloadFile("+data.Adj[i]['Id']+")'>"
                                        html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                    html += "</span>"
                                html += "</td>"
                            html += "</tr>"
                        }
                    }
                html += "</table>"
                html += "<br>"
                html += "<a href = '"+UrlUniversal+"Zipper/Zip.php?Tipo=T&&Hash="+Hash+"'>Descargar Adjuntos en Zip</a>"
            html += "</div>";

            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ModalEdit2(1)
        }
    })
    
}

function __NuestoStatusTarea(Hash){
    var formData = new FormData();
    formData.append("Hash",Hash);
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__StatusTareaLast',
        success:function(data){
            var html = "";
            TituloVentana = "Nuevo Status Tarea "
            ImgVentana = "images/menu/EMPRESAS_ADMINISTRACIOON_ICONO.png"
            FuncionesHeader = ""
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>"
                    html +="<div class='col col-sm-12 my-2'>"
                        html +="<label for='OTT_Estado'>Status Anterior:</label>"
                        var Stst = "";
                        if ( data.Status.length > 0 ){
                            Stst = data.Status[0]['StatusTarea']
                        }
                        html +="<textarea class = 'form-control' rows = '4' disabled>"+Stst+"</textarea>"
                    html +="</div>"
                html +="</div>"
                
                html += "<br>"

                html += "<div class = 'form-row'>"
                    html +="<div class='col col-sm-12 my-2'>"
                        html +="<label for='OTT_Estado'><span class = 'Obligatorio'>(*)</span>Status Nuevo:</label>"
                        
                        html +="<textarea class = 'form-control __NuevoStatus' rows = '4' ></textarea>"
                    html +="</div>"
                html +="</div>"

                html += "<div class = 'form-row'>"
                    html +="<div class='col col-sm-2 my-2'>"
                        html +="<label for='OTT_Estado'><span class = 'Obligatorio'>(*)</span>Número Entregables:</label>"
                        
                        html +="<input type = 'number' class = 'form-control NumEntregables_' value = '1' min = '1'/>"
                    html +="</div>"
                html +="</div>"
                
                html += "<div class='form-group'>";
                    html += "<label>Adjuntos:</label>";
                    html += "<input type='file' class='form-control' onchange='Tarea.loadFiles(event)' multiple>"
                html += "</div>";

                html += "<div class='lista' id=''>"
                    html += "<table class='dataTable tableNew' id = 'listaAdjuntosTareaOT'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Descartar</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "<table/>"
                html += "</div>"
            html += "</div>";

            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-primary' onclick = '__GuardarStatusTarea("+Hash+")'>Guardar</button>";
            html += "</div>";

            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            ModalEdit2(1)
            Tarea.listarFiles()
        }
    })
}

function __GuardarStatusTarea(Hash){
    if( $(".__NuevoStatus").val().length > 1 ){
        var formData = new FormData();
        formData.append("Hash",Hash);
        formData.append("Status",$(".__NuevoStatus").val());
        formData.append("NroEntregables",$(".NumEntregables_").val());
        formData.append("Cdata",JSON.stringify(AdjuntosInf));
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'__GuardarStatusTareaLast',
            success:function(data){
                $("._Status_T"+Hash).val( $(".__NuevoStatus").val() )
                $(".NumAdjuntosRecibidos"+Hash).text( AdjuntosInf.length )
                alert("Status Actualizado y Datos Guardados Correctamente.")
                ModalEdit2(0)
            }
        })
    }
}

function __InformesReunion(Id){
    var html = "";
    html += "<div class = 'form-row'>"
        html +="<div class='col col-sm-3 my-2'>"
            html +="<label for='OTT_Estado'>Estado:</label>"
            html +="<select class ='form-control' name = 'OTINF_Estado' id = 'OTINF_Estado'>"
                html +="<option value = '-1' selected >Todos</option>"
                html +="<option value = '1'  >Creado Sin Enviar</option>"
                html +="<option value = '2'>Creado y Enviado</option>"
            html +="</select>"
        html +="</div>"
        html +="<div class='col col-sm-3 my-2'>"
            html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
            html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTINF_TextBusqueda' name = 'OTINF_TextBusqueda' />"
        html +="</div>"
        html +="<div class='col col-sm-3 my-2'>"
            html +="<p></p>"
            html +="<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaInformesEntrevista()'/>"
        html +="</div>"
    html +="</div>"
    html +="<div style='overflow: auto; white-space: nowrap;'>"
        html +="<table class='dataTable tableNew' id = 'TablaInformesEntrevistaOT'>"
            html +="<thead>"
                html +="<tr>"
                    html +="<th>#</th>"
                    html +="<th>Asunto</th>"
                    html +="<th>Fecha Informe</th>"
                    html +="<th>Fecha Creacion</th>"
                    html +="<th>Hora Creacion</th>"
                    html +="<th>Creador</th>"
                    html +="<th>Tipo Informe</th>"
                    html +="<th>Estado</th>"
                    html +="<th>Descargar</th>"
                    html +="<th>Acciones</th>"
                html +="</tr>"
            html +="</thead>"
        html +="</table>"
    html +="</div>"
    $(".__DetalleTareasProyecto"+Id).html( html )
    BuscarTablaInformesEntrevista()
}

function BuscarTablaInformesEntrevista(){
    $DataTable_InformesProyectos.destroy();
    tablaInformesEntrevista();
}

function tablaInformesEntrevista(){
    $DataTable_InformesProyectos = $('#TablaInformesEntrevistaOT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'5e3750b3f123e3b8bdccd914b725ef75',
            'data':function (d) {
                d.search['value'] = $("#OTINF_TextBusqueda").val();
                d.search['Hash'] = Tarea.id;
                d.search['EstadoInforme'] = $("#OTINF_Estado").val();;
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "render": function (data, type, full, meta) {
                    return '<center> <a href = "">' + data + '</a></center>';
                }
           },
           {
                data: 'Referencia',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'FechaInforme',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'FechaCreacion',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

                },
            {
                data: 'TipoInforme',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    var htmlx = '';
                    htmlx += '<center><a target="_blank" href="'+UrlGeneral+'b4ac42fb5d888c8a2fbcf7e5d8415bec/'+full.Hash+'">';
                        htmlx += '<img src ="images/descarga.png" class = "OptionIcon"/>'
                    htmlx += '</a></center>';
                    return htmlx;
                }

            },
            {
                data: 'EstadoInforme',
                "render": function (data, type, full, meta) {
                    var ht = ''
                    if( data == 'Creado Sin Enviar' ){
                        ht += '<img src ="images/trafico_enviar.png" onclick = "EnviarInformeEntrevista('+full.Hash+')"class = "OptionIcon"/>'
                    }
                    return '<center>'+ht+'</center>';
                }

            }
        ],
        "order": [[2, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaInformesEntrevistaOT').css({'width':'100%'})
}

function __VerDetalleOt(Id,EstadoOT){
    var html = ""
    html += "<table width = '100%' class ='dataTable DetalleTareasProyecto"+Id+"'>"
        html += "<tr>"
            html += "<th >No."
                if( EstadoOT == 1 ){
                    html += "<br><img src ='images/datos_additem.png' class = 'OptionIcon' onclick = '_AddTareaOTNew("+Id+",1)'/>"
                }
            html += "</th>"
            html += "<th>Asunto</th>"
            html += "<th>Generado Por</th>"
            html += "<th>Descripción</th>"
            html += "<th>Fecha Generación</th>"
            html += "<th>Fecha Entrega</th>"
            html += "<th>Adjuntos Enviados</th>"
            html += "<th>Nro. Entregables</th>"
            html += "<th>Tipo Tarea</th>"
            html += "<th>Responsables</th>"
            html += "<th>Status</th>"
            html += "<th>Fecha Actualización</th>"
            html += "<th>Adjuntos Recibidos</th>"
            
            html += "<th>Estado</th>"
            html += "<th>Acciones</th>"
        html += "</tr>"

        if( _TareasProyecto.length == 0 ){
            html += "<tr>"
                //html += "<td colspan = '3' style = 'border:0px;width:5px;'></td>"
                html += "<td colspan = '14'>No se han generado tareas.</td>"
            html += "</tr>"
            html += "<tr><td style = 'border:0px;'><br></td></tr>"
        }else{
            for( var tt = 0; tt < _TareasProyecto.length; tt++){
                var _Generador =_TareasProyecto[tt]['IdUsuario'];
                var _Consultor = UserConsulta ;
                var IdTareaX = _TareasProyecto[tt]['Id'] 
                var Status_ = _TareasProyecto[tt]['EstadoTarea'];

                var Disabled = "";
                if (  (_Consultor != _Generador) || ( _TareasProyecto[tt]['EstadoTarea'] == 'TERMINADA' || _TareasProyecto[tt]['EstadoTarea'] == 'CANCELADA')){
                    Disabled = " disabled "
                }
                html += "<tr id = '__TareaId"+IdTareaX+"'>"
                    //html += "<td colspan = '3' style = 'border:0px;width:5px;'></td>"
                    if( _Consultor == _Generador ){
                        html += "<span class = 'ProyectoTareas_ HiddenInformation __HashTarea"+Id+"'>"+IdTareaX+"</span>"
                    }
                    
                    html += "<td class = 'CenterText'>"+ _TareasProyecto[tt]['Numeracion']+"</td>"
                    
                    html += "<td >"
                        if( EstadoOT == 1 ){
                            html += "<textarea "+Disabled+" class = 'form-control _Asunto_T"+IdTareaX+"' style = 'text-align:justify;width:350px;height:60px;'>"+_TareasProyecto[tt]['Asunto']+"</textarea>"
                        }else{
                            html += _TareasProyecto[tt]['Asunto']
                        }
                        html += "<div style = 'width:200px;'></div>"
                    html += "</td>"
                    html += "<td class = 'CenterText'>"
                        html += "<img onerror='imgError(this);'  class = 'IconUsuarioTA'  src = ' "+UrlGeneral+"../storage/app/Usuarios/"+_TareasProyecto[tt]['ImgUsuario']+"'  style = 'border-radius:15px;'/>"
                    html += "</td>"
                    html += "<td >"

                        if( EstadoOT == 1 ){
                            html += "<textarea  "+Disabled+"  class = 'form-control __DescAct"+IdTareaX+"' style = 'text-align:justify;width:350px;height:60px;'>"+_TareasProyecto[tt]['Descripcion']+"</textarea>"
                        }else{
                            html += "<p>"+_TareasProyecto[tt]['Descripcion']+"</p>"
                        }
                        
                        html += "<div style = 'width:250px;'></div>"
                    html += "</td>"
                    html += "<td class = 'CenterText' nowrap>"+ _TareasProyecto[tt]['FechaCreacion'] +"</td>"
                    html += "<td class = 'CenterText' nowrap>"
                        if( EstadoOT == 1 ){
                            if( _Generador == _Consultor){
                                if( Status_ == 'CONTESTADA' || Status_ == 'EN PROCESO' || Status_ == 'PENDIENTE' || Status_ == 'STANDY BY'  ){
                                    html += "<input "+Disabled+" class = 'form-control __FechaEntrega"+IdTareaX+"' type = 'date' value = '"+_TareasProyecto[tt]['_FechaEntrega']+"'/>"
                                    html += "<hr>"
                                }
                            }
                        }
                        html += "<span class = '__NombreFechaEntrega"+IdTareaX+"'>"+_TareasProyecto[tt]['FechaEntrega'] +"</span>"
                        
                    html +="</td>"
                    html += "<td class = 'CenterText '>"
                        html += "<span class = 'Cursor __NumAdjuntosTarea_"+IdTareaX+"' onclick = '__TareasAdjuntos("+IdTareaX+")'>"+_TareasProyecto[tt]['NumAdjuntos'] + "</span>"
                        if( EstadoOT == 1 ){
                            if( Status_ == 'CONTESTADA' || Status_ == 'EN PROCESO' || Status_ == 'PENDIENTE' || Status_ == 'STANDY BY'  ){
                                html += "<hr>"
                                html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = '__NTareasAdjuntos("+Id+","+IdTareaX+")' />";
                            }
                        }                      
                        
                    html += "</td>"
                    html += "<td class = 'CenterText'>"
                        if( EstadoOT == 1 ){
                            if( _Generador == _Consultor){
                                html += "<input "+Disabled+" type = 'number' min = '1'class = 'form-control _NumEntregablesTareas"+IdTareaX+"' value = '"+_TareasProyecto[tt]['NroEntregables']+"'/>"
                            }
                            
                        }else{
                            html += _TareasProyecto[tt]['NroEntregables']
                        }                        
                        
                        
                    html +="</td>"
                    html += "<td class = 'CenterText' nowrap></td>"
                    html += "<td class = 'CenterText' nowrap>"
                        html += "<table width = '100%'>"

                            for(var g = 0; g < _TareasProyecto[tt]['Asignados'].length;g++){
                                html += "<tr class = '__ResAsig"+_TareasProyecto[tt]['Asignados'][g]['Id']+"'>"
                                    html += "<td style = 'border:0px;' class = 'CenterText'>"
                                        html += "<img onerror='imgError(this);'  class = 'IconUsuarioTA'  src = ' "+UrlGeneral+"../storage/app/Usuarios/"+_TareasProyecto[tt]['Asignados'][g]['ImgUsuario']+"' style = 'border-radius:15px;'/>"
                                    html += "</td>"
                                    html += "<td style = 'border:0px;text-align:left;' >"+_TareasProyecto[tt]['Asignados'][g]['NombreUsuario']+"</td>"
                                    if( _Generador == _Consultor ){
                                        if( Status_ == 'CONTESTADA' || Status_ == 'EN PROCESO' || Status_ == 'PENDIENTE' || Status_ == 'STANDY BY'  ){
                                            html += "<td style = 'border:0px;'  class = 'CenterText'>"
                                                html += "<img height = '15px' onclick = '_AsignadosRetirar("+IdTareaX+","+_TareasProyecto[tt]['Asignados'][g]['Id']+")' class = 'Cursor' src = ' "+UrlGeneral+"images/eliminar.png' tittle = '¿Eliminar?' />"
                                            html += "</td>"
                                    }
                                    
                                }
                            }
                        html += "</table>"
                            if( EstadoOT == 1 ){
                                if( _Generador == _Consultor ) {
                                    if( Status_ == 'CONTESTADA' || Status_ == 'EN PROCESO' || Status_ == 'PENDIENTE' || Status_ == 'STANDY BY'  ){
                                        html += "<hr>"
                                        html += "<div class = 'BarraIconos CenterText'>";
                                            html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = '__TareasAsignados("+IdTareaX+")' />";
                                        html += "</div>";
                                    }
                                    
                                }
                            }
                            
                        
                    html += "</td>"
                    html += "<td >"
                        if( EstadoOT == 1 ){
                            html += "<textarea "+Disabled+" class = 'form-control _Status_T"+IdTareaX+"' style = 'text-align:justify;width:350px;height:60px;'>"+_TareasProyecto[tt]['Status']+"</textarea>"                                            
                            if( _Generador != _Consultor ){
                                html += "<hr>"
                                html += "<div class = 'BarraIconos CenterText'>";
                                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = '__NuestoStatusTarea("+IdTareaX+")' />";
                                html += "</div>";
                            }
                            
                        }else{
                            html += _TareasProyecto[tt]['Status']
                        }
                        html += "<div style = 'width:250px;'></div>"
                    html += "</td>"
                    html += "<td nowrap>"+ _TareasProyecto[tt]['FechaR'] +"</td>"
                    html += "<td class = 'CenterText NumAdjuntosRecibidos"+ IdTareaX +"'>"+ _TareasProyecto[tt]['NumRecibidos'] +"</td>"
                    html += "<td class = 'CenterText'>"+ _TareasProyecto[tt]['EstadoTarea'] +"</td>"
                    html += "<td class = 'CenterText'>" 
                            if( _Generador == _Consultor){
                                
                                if( Status_ == 'CONTESTADA' || Status_ == 'EN PROCESO' || Status_ == 'PENDIENTE' || Status_ == 'STANDY BY'  ){
                                    html += "<select class = 'form-control AccionTarea_"+ IdTareaX +"' onchange = '__AccionTarea("+ IdTareaX +","+Id+")' >"
                                        html += "<option value = ''></option>"
                                        html += "<option value = 'CER'>¿Finalizar?</option>"
                                        html += "<option value = 'CAN'>¿Cancelar?</option>"
                                    html += "</select>"
                                }
                            }else{

                            }
                            
                    html += "</td>"
                html += "</tr>"
            }
            html += "<tr><td style = 'border:0px;'><br></td></tr>"
        }       
    html += "</table>"
    $(".__DetalleTareasProyecto"+Id).html( html )
}

function _AsignadosRetirar(Hash,R){
    if( confirm("¿Está seguro(a) de retirar este asignado(a)?") ){
        var formData = new FormData();
        formData.append( "Hash", Hash )
        formData.append( "R", R )

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'__RetirarAsignadoTarea_',
            success:function(data){
                var html = "";
                $(".__ResAsig"+R).remove()
                if( data.info == 1 ){
                    alert("Datos Guardados Correctamente")
                } else{
                    alert("Datos Sin Guardar.\Contacte al Administrador.")
                }
            }
        })
    }
}

function __EstructuraTrafico(){
    var html = "";

    var colspan = 4;
    html += "<table class = 'tableNew ' width = '100%'>"
        for( var i = 0; i < _Canales.length; i++ ){
            html += "<tr>"
                html += "<th colspan = '"+colspan+"' nowrap>Cliente "+_Canales[i]['NombreComercial']+"</th>"
            html += "</tr>"
            html += "<tr><td style = 'border:0px;width:5px;'><br></td></tr>"
            for( var p = 0; p < _Canales[i]['Productos'].length; p++ ){
                html += "<tr>"
                    html += "<td style = 'border:0px;width:5px;'></td>"
                    html += "<td >"+_Canales[i]['Productos'][p]['Producto']+" </td>"
                html += "</tr>"
                html += "<tr><td style = 'border:0px;'><br></td></tr>"
                
                for( var ot = 0; ot < _Canales[i]['Productos'][p]['Proyectos'].length; ot++){
                    html += "<tr>"
                        html += "<td colspan = '3' style = 'border:0px;width:5px;'></td>"

                        var StyleOt = "";
                        var AccionesOt = 0;
                        if( _Canales[i]['Productos'][p]['Proyectos'][ot]['Estado'] ==  'Activo' ){
                            StyleOt = "background-color:#8DC63F";
                            AccionesOt = 1;
                        }else if( _Canales[i]['Productos'][p]['Proyectos'][ot]['Estado'] ==  'Cerrado' ){
                            StyleOt = "background-color:#9F3C3F";
                        }else if( _Canales[i]['Productos'][p]['Proyectos'][ot]['Estado'] ==  'Stand By / Detenido' ){
                            StyleOt = "background-color:#F47629";
                        }else if( _Canales[i]['Productos'][p]['Proyectos'][ot]['Estado'] ==  'Pendiente Revisión Cliente' ){
                            StyleOt = "background-color:#F4B919";
                        }
                        html += "<th colspan = '14' >"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'border:0px;'>"
                                        html += "<div style = 'margin:0 auto;height: 25px;width:25px;"+StyleOt+";border-radius:0.5em;'></div>"
                                    html += "</td>"
                                    html += "<td width = '95%' style = 'border:0px;font-weight:bold;'>"
                                        html += "( "+_Canales[i]['Productos'][p]['Proyectos'][ot]['Codigo']+" ) "+_Canales[i]['Productos'][p]['Proyectos'][ot]['Referencia']
                                    html += "</td>"
                                    html += "<td class = 'CentertText' nowrap style = 'border:0px;border-right: 1px solid black;'>";
                                        UserConsulta = _Canales[i]['Productos'][p]['Proyectos'][ot]['UsuarioConsulta']
                                        html += "<img src ='images/Documentos.png' class = 'OptionIcon' onclick = '__ConsultarDetalleProyecto("+_Canales[i]['Productos'][p]['Proyectos'][ot]['Id']+","+AccionesOt+")'/>";
                                        html += "<br><span>Tareas</span>"
                                    html += "</td>"
                                    Tarea.id = _Canales[i]['Productos'][p]['Proyectos'][ot]['CodigoHash']
                                    html += "<td class = 'CentertText' nowrap style = 'border:0px;border-right: 1px solid black;'>";
                                        html += "<img src ='images/Documentos.png' class = 'OptionIcon' onclick = '__InformesReunion("+_Canales[i]['Productos'][p]['Proyectos'][ot]['Id']+","+AccionesOt+")'/>";
                                        html += "<br><span>Informes de Reunión</span>"
                                    html += "</td>"
                                    html += "<td class = 'CentertText' nowrap style = 'border:0px;border-right: 1px solid black;'>";
                                        html += "<img src ='images/Documentos.png' class = 'OptionIcon' onclick = '__ConsultarDetalleProyecto("+_Canales[i]['Productos'][p]['Proyectos'][ot]['Id']+","+AccionesOt+")'/>";
                                        html += "<br><span>Brief</span>"
                                    html += "</td>"
                                    html += "<td class = 'CentertText' nowrap style = 'border:0px;'>";
                                        if( AccionesOt == 1 ){
                                            html += "<img src ='images/guardar.png' class = 'OptionIcon' onclick = '__SaveTareaProyecto("+_Canales[i]['Productos'][p]['Proyectos'][ot]['Id']+",1)'/>";
                                            html += "<br><span>Guardar Tareas</span>"
                                        }
                                        
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</th>"
                    html += "</tr>"
                    html += "<tr><td style = 'border:0px;'><br></td></tr>"

                    html += "<tr>"
                        html += "<td colspan = '3' style = 'border:0px;width:5px;'></td>"
                        html += "<td class = '__DetalleTareasProyecto"+_Canales[i]['Productos'][p]['Proyectos'][ot]['Id']+"' style = 'border:0px;'>"
                            
                            
                        html += "</td>"
                    html += "</tr>"
                }
            }
        }
    html += "</table>"
    $(".ContDetallesTabla").html ( html )
    $(".tableNew td, .tableNew th, .form-control").css({ 'font-size':'11px' })
}

function __AccionTarea(Hash,HashOt){
    var msj = "";
    if( $(".AccionTarea_"+Hash).val() == 'CER'){
        msj = "Finalizar"
    }else if ( $(".AccionTarea_"+Hash).val() == 'CAN' ){
        msj = "Cancelar"
    }
    if( msj != '' ){
        if( confirm("¿Está seguro(a) de "+msj+" la Tarea?")){
            var formData = new FormData();
            formData.append( "Hash", Hash )
            formData.append( "Acts", $(".AccionTarea_"+Hash).val() )

            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'__AccionTareaOt_',
                success:function(data){
                    var html = "";
                    __ConsultarDetalleProyecto(HashOt)
                    location.href = "#__TareaId"+Hash
                }
            })
        }
    }
}

function __EnrutadorTrafico(){
    if( $("#Param_T").val() == 'ADMIN'){
        $("._ParamTraficosOptions").show();
        $("._ParamProyectos").hide()
        ListarCanales();
    }else if( $("#Param_T").val() == 'PROY' ){
        $("._ParamTraficosOptions").hide();
        $("._ParamProyectos").show()
        __ListarNivel1()
    }
}  

function __ParamListClinetes(){
    var formData = new FormData();
    
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__DataClientesList',
        success:function(data){
            var html = "";
            html += "<div class='col col-sm-2 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Tipo:</label>"
                html += "<select type = 'text' class = 'form-control' id = 'Param_T' name = 'Param_T'required>"
                //  
                    html += "<option value = ''>Seleccione</option>"
                    html += "<option value = 'ADMIN' selected>Administrativo</option>"
                    //html += "<option value = 'PROY'>Proyectos</option>"
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-2 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Cliente:</label>"
                html += "<select type = 'text' class = 'form-control' id = 'Param_Cliente' name = 'Param_Cliente' required>"
                html += "<option value = ''>Todos</option>"
                for( var i  = 0; i < data.Clientes.length; i++ ){
                    html += "<option value = '"+data.Clientes[i]['IdCliente']+"'>"+data.Clientes[i]['NombreComercial']+"</option>"
                } 
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-2 my-2'>"
                html += "<label for='OTC_TextBusqueda'>Texto:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTC_TextBusqueda' name = 'OTC_TextBusqueda' />"
            html += "</div>"
            html += "<div class='col col-sm-1 my-4' style = 'vertical-align:middle;'>"
                html += "<p></p>"
                html += "<img src ='images/lupa.png' id class = 'Cursor' style='height:30px'  onclick = '__EnrutadorTrafico()'/>"
            html += "</div>"
            
            console.log(html)
            $(".ParamTrafico").html( html )
        }
    })
}

function __ListarNivel1(){
    var formData = new FormData();
    formData.append( "IdCliente", $("#Param_Cliente").val() )
    
    formData.append( "OTC_TextBusqueda", $("#OTC_TextBusqueda").val() )
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'__DataClientes',
        success:function(data){
            var html = "";
            var Colspan = 1;

            _Canales = data.Clientes;
            __EstructuraTrafico()
        }
    })
}



function CrearOTTraCliente(Ruta) {

    var html = "";
    TituloVentana = "Nuevo Proyecto / OT"
    ImgVentana = "images/20_Crear_Nueva_OT.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='OTCliente.enviar(event)' action='"+Ruta+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parEmpresa' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Empresa:</label>";
                html += "<select name = 'parEmpresa' id='parEmpresa' onchange='OTCliente.listaUnidadesNegocio(); OTCliente.listaClientes()' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parUnidadNegocio' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Unidad de Nogocio:</label>";
                html += "<select name='parUnidadNegocio' id='parUnidadNegocio' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";
        html += "</div>"

        html += "<hr>"

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parCliente' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Cliente:</label>";
                html += "<select name = 'parCliente' id='parCliente' onchange='OTCliente.listaProductos(); OTCliente.listaProfesionales()' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parProducto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Producto:</label>";
                html += "<select name = 'parProducto' onchange='OTCliente.listaSubProductos()' id='parProducto' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parSubProducto' class='col-form-label'> SubProducto: </label>";
                html += "<select name = 'parSubProducto' id='parSubProducto' class='form-control'>";
                    html += "<option selected>Seleccione</option>";

                html += "</select>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parProfesional' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Profesional:</label>";
                html += "<div>";
                    html += "<select name = 'parProfesional' id='parProfesional' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
        html += "</div>";

        html += "<hr>"

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parDirector' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Director:</label>";
                html += "<div>";
                    html += "<select name = 'parDirector' id='parDirector' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parEjecutivo' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Ejecutivo:</label>";
                html += "<div>";
                    html += "<select name = 'parEjecutivo' id='parEjecutivo' class='form-control' required>";
                        html += "<option selected>Seleccione</option>";

                    html += "</select>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<hr>"

        html += "<div class='form-group'>";
            html += "<label for='parReferencia' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Referencia:</label>";
            html += "<input type='text' name='parReferencia' id='parReferencia' autocomplete = 'off' class='form-control' placeholder='Proyecto XYZ'>"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='parDescripcion' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaEmpresas();
    OTCliente.listaDirectores();
    OTCliente.listaEjecutivo();

}

const OTCliente = {
    enviar: function (e) {
        sendForm(e, () => {
            $('#ModalEdit').modal('hide')
            $("#OTC_TextBusqueda").val(__GOLSAjax)
            __ListarNivel1()
        })
    },
    listaEmpresas: function() {
        printDataAjax('dc47e12ac4a1068c236507bd36359ebb', {}, data => {
            
            html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parEmpresa').html(html)
        })
    },
    listaUnidadesNegocio: function() {
        const datax = $('#parEmpresa').val()
        if (!datax) {
            return
        }
        printDataAjax('bde5b488693c2d2c22757174de731d4f', {HashEmpresa: datax}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.unidades.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parUnidadNegocio').html(html)
        })
    },
    listaClientes: function() {
        const data = $('#parEmpresa').val()
        if (!data) {
            return
        }
        printDataAjax('5ad0b953c7738fc7c077747ee8da3cb5', {HashEmpresa: data}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.clientes.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parCliente').html(html)
        })
    },
    listaProductos: function() {
        const data = $('#parCliente').val()
        if (!data) {
            return
        }
        printDataAjax('8a03824e9ff6949d861b44a40aed14e9', {HashCliente: data}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.productos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parProducto').html(html)
        })
    },
    listaSubProductos: function() {
        const data = $('#parProducto').val()
        if (!data) {
            return
        }
        printDataAjax('49d382bc75c15245ebb9c4a2d4cd896e',  {HashProducto:data}, data => {
            html = '<option selected>Seleccione</option>'
            data.subproductos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parSubProducto').html(html)
        })
    },
    listaEjecutivo: function() {
        printDataAjax('a752ef4487f59afe53e6cd67be658a5d', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.ejecutivos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#parEjecutivo').html(html)
        })
    },
    listaDirectores: function() {
        printDataAjax('2032e89f5721d0663d5649d85504934a', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.directores.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#parDirector').html(html)
        })
    },
    listaProfesionales: function() {
        const data = $('#parCliente').val()
        if (!data) {
            return
        }
        printDataAjax('9b909eb70578db07c1f5aee7553a59d6', {HashCliente: data}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.profesionales.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parProfesional').html(html)
        })
    },
    listSearchEmpresas: function () {
        printDataAjax('dc47e12ac4a1068c236507bd36359ebb', {}, data => {
            html = '<option value="-1" selected>Todos</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Proyecto').html(html)
        })
    },
    listSearchEstado: function () {
        printDataAjax('f07ce113ce58c015a410434637b977b0', {}, data => {
            html = '<option value="-1" selected>Todos</option>'
            data.estados.forEach(obj => {
                if( obj['Estado'] == 'Activo' ){
                    html += "<option value = '"+obj['Hash']+"' selected>"+obj['Estado']+"</option>"
                }else{
                    html += "<option value = '"+obj['Hash']+"'>"+obj['Estado']+"</option>"
                }
                
            });
            $('#OTC_Estado').html(html)
        })
    },
    loadFilesInf: function(e) {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            AdjuntosInf.push(files[i]);
        }
        e.target.value = ''
        $tableFilesInf.destroy()
        $tableFilesInf.draw();
        this.listarFilesInf();
    },
    listarFilesInf: function () {
        let dataRows = []
        for (let i = 0; i < AdjuntosInf.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: AdjuntosInf[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFilesInf = $('#listaAdjuntosInfOT').DataTable({
            data:dataRows,
            columns: [
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        return '<center> <span>'+data+'</span> </center>'
                    }
                },
                {
                    data: 'Nombre'
                },
                {
                    data: 'Num',
                    render: function (data, type, full, meta) {
                        hx = '<center><span onclick = "OTCliente.deleteFilesInf(\''+data+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span></center>'
                        return hx;
                    }
                }
            ],
            "language": {
                    "url": "js/dataTable/Spanish.lang"
                },
        })
        $('#listaAdjuntosInfOT').css({'width':'100%'})
    },
    deleteFilesInf: function (id) {
        AdjuntosInf.splice(parseInt(id)-1, 1)
        $tableFilesInf.destroy();
        $tableFilesInf.draw();
        this.listarFilesInf();
    },
}

//--------------------------------------------------
var ItemsTra = [];
function ListarSubgruposUsuario(Hash){
    Subgrupos.IdGrupo = Hash;
    printDataAjax('da9792cd3fe48035429d94b5c948d2f9', {HashG:Hash,Estado:1}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' style = 'width:100%;'>";
            html += "<div class='panel-heading'>";
                html += "<table width = '100%'>";
                    html += "<tr>";
                        html += "<td width = '90%' class = 'BlackFont CenterText' style = 'vertical-align:middle;font-size:15px;'>";
                            //html += "Grupos "+ $(".ChanelTA_"+Hash).text()
                            html += $(".GroupTA_"+Hash).text()
                        html += "</td>";
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_additem.png' class = 'OptionIcon'onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Crear Grupo</span>";
                        html += "</td>"
                        /*html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Ordenar</span>";
                        html += "</td>";*/
                    html += "</tr>";
                html += "</table>";
            html += "</div>";
            html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' >"
                
                html += "<div class = 'form-row FormsGeneral'>";
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport Cursor' style = 'background-color:#696969;' onclick = 'ListarActividadesGruposCanal(0)'>"
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' nowrap>"
                                        html += "<h5 class = 'SubGroupTA SubGroupTA_0' >Sin Asignar</h5>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"  
                        html += "</div>"
                    html += "</div>"
                for(var i = 0; i < data.Subgrupos.length; i++){
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport Cursor' style = 'background-color:#696969;' onclick = 'ListarActividadesGruposCanal("+data.Subgrupos[i]['Hash']+")'>"
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' nowrap>"
                                        html += "<h5 class = 'SubGroupTA SubGroupTA_"+data.Subgrupos[i]['Hash']+"' >"+data.Subgrupos[i]['Nombre']+"</h5>"
                                    html += "</td>"
                                    html += "<td class = 'CenterText'>"
                                        html += "<img src = 'images/editar.png' style = 'height:25px;' onclick = 'GroupEditTA("+data.Subgrupos[i]['Hash']+","+Hash+")' />"
                                    html += "</td>"
                                    html += "<td class = 'CenterText'>"
                                        html += "<img src = 'images/eliminar.png' style = 'height:25px;' onclick = 'GroupDelTA("+data.Subgrupos[i]['Hash']+","+Hash+")'  />"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"  
                        html += "</div>"
                    html += "</div>"
                } 
                html += "</div>"
                html += "<br>"
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".ContentPanelActiv").html(html)//.css({'padding-left':'10px'})
        $(".SubGroupTA").css({
            'font-weight':'normal'
        })
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
        var html = "";
        
    })
}

function ListarGruposCanal(Hash){
    printDataAjax('16a8299025b2c27a2ab19a96f320b9b3', {HashCP:Hash}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' style = 'width:100%;'>";
            html += "<div class='panel-heading alert-primary BorderTop'>";
                html += "<table class = 'table'>";
                    html += "<tr>";
                        html += "<td width = '90%' class = 'BlackFont CenterText' style = 'vertical-align:middle;font-size:15px;'>";
                            //html += "Grupos "+ $(".ChanelTA_"+Hash).text()
                            html += $(".ChanelTA_"+Hash).text()
                        html += "</td>";
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_additem.png' class = 'OptionIcon'onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Crear Grupo</span>";
                        html += "</td>"
                        /*html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Ordenar</span>";
                        html += "</td>";*/
                    html += "</tr>";
                html += "</table>";
            html += "</div>";
            html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' >"
                
                html += "<div class = 'form-row FormsGeneral'>";
                for(var i = 0; i < data.grupos.length; i++){
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport Cursor' style = 'background-color:#696969;' onclick = 'ListarSubgruposUsuario("+data.grupos[i]['Hash']+")'>"
                        //html += "<div class = 'CardReport Cursor' style = 'background-color:#696969;' onclick = 'ListarActividadesGruposCanal("+data.grupos[i]['Hash']+")'>"
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<td style = 'width:90%;' nowrap>"
                                        html += "<h5 class = 'GroupTA GroupTA_"+data.grupos[i]['Hash']+"' >"+data.grupos[i]['Nombre']+"</h5>"
                                    html += "</td>"
                                    html += "<td class = 'CenterText'>"
                                        html += "<img src = 'images/editar.png' style = 'height:25px;' onclick = 'GroupEditTA("+data.grupos[i]['Hash']+","+Hash+")' />"
                                    html += "</td>"
                                    html += "<td class = 'CenterText'>"
                                        html += "<img src = 'images/eliminar.png' style = 'height:25px;' onclick = 'GroupDelTA("+data.grupos[i]['Hash']+","+Hash+")'  />"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"  
                        html += "</div>"
                    html += "</div>"
                } 
                html += "</div>"
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".DetalleCanal").html(html)//.css({'padding-left':'10px'})
        $(".GroupTA").css({
            'font-weight':'normal'
        })
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
    })
}
var DatosGrupo = [];

function MovLeftDiv(){
    $(".ContenidoScroller").scrollLeft( $(".ContenidoScroller").scrollLeft() - 10)
}
function MovRightDiv(){
    $(".ContenidoScroller").scrollLeft( $(".ContenidoScroller").scrollLeft() + 10)
}


function ConsultarDetalleGrupo(i){
    console.log("DetalleGrupo")
    console.log(DatosGrupo[i])
    $(".GrupoVisible").html(i)
    var Hash = DatosGrupo[i]['Hash'];
    var html = "";
    ItemsTra = [];
    html += "<br><hr>"
    html += "<table class = 'tableNew' width = '100%'>"
        for(var x = 0; x < DatosGrupo[i]['Detalle'].length; x++){
            html += "<tr>"
                html += "<th colspan = '9' class = 'TablaReportes_TituloPrincipal '>"
                    html += "<table width = '100%' >"
                        html += "<tr>"
                            html += "<td class = 'CenterText' style = 'border:0px;background-color:transparent;' nowrap>"
                                html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'CrearActividadGrup("+DatosGrupo[i]['HashG']+","+DatosGrupo[i]['Detalle'][x]['Hash']+","+DatosGrupo[i]['Hash']+","+i+")' />";
                                //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearActividadGrup("+data.grupos[i]['Hash']+","+data.grupos[i]['Subgrupos'][subg]['Hash']+","+Hash+")' >Agregar Actividad</span>";
                            html += "</td>"
                            html += "<td class = 'CenterText'  style = 'border:0px;background-color:transparent;'>"
                                html += "<img src = 'images/editar.png' class = 'OptionIcon' style = 'height:25px;' onclick = 'SubGroupEditTA("+DatosGrupo[i]['Detalle'][x]['Hash']+","+Hash+")' />"
                            html += "</td>"
                            html += "<td class = 'CenterText'  style = 'border:0px;background-color:transparent;'>"
                                html += "<img src = 'images/eliminar.png' class = 'OptionIcon' style = 'height:25px;' onclick = 'SubGroupDelTA("+DatosGrupo[i]['Detalle'][x]['Hash']+","+Hash+")'  />"
                            html += "</td>"
                            html += "<td class = 'CenterText HidenInformation CanalOrdenId'  style = 'border:0px;background-color:transparent;'>"
                                html += DatosGrupo[i]['Detalle'][x]['Hash']
                            html += "</td>"
                            html += "<th style = 'width:95%;border:0px;background-color:transparent;' class = 'Cursor_AS '><span class = 'SubGroupTA_"+DatosGrupo[i]['Detalle'][x]['Hash']+"'>"+DatosGrupo[i]['Detalle'][x]['Nombre']+"</span><span class = 'HidenInformation DescSub"+DatosGrupo[i]['Detalle'][x]['Hash']+"'>"+DatosGrupo[i]['Detalle'][x]['Descripcion']+"</span></th>"

                        html += "</tr>"
                    html += "</table>"
                html += "</th>"
            html += "</tr>"
            html += "<tr>"
                html += "<th class = 'TitulosTA' style = 'width:50px;'>No.</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;'>Nombre</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;'>Status</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;'>Actividad</th>"
                html += "<th class = 'TitulosTA' >Responsable</th>"
                html += "<th class = 'TitulosTA' >Contactos</th>"
                html += "<th class = 'TitulosTA' style = 'width:150px;'>Fecha Creación</th>"
                html += "<th class = 'TitulosTA' >Fecha Entrega</th>"
                html += "<th class = 'TitulosTA' >Acción</th>"
            html += "</tr>"
            var OrdenItems = 1;
            for(var act = 0; act < DatosGrupo[i]['Detalle'][x]['Data'].length; act++){
                ItemsTra.push({'Id':DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']});
                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Id_Estado'] == 2 ){
                    html += "<tr class = 'Cursor_AS'>";
                        html += "<td class = 'ItemsOrdenList TablaReportes_Cuerpo_Center ItemsOrdenList"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"+OrdenItems+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control NActTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['NombreTarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control StatusTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Status']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control ActTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Tarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center TR"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' nowrap>"
                            html += "<table width = '100%' >"
                                html += "<tr>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'></th>"
                                html += "<tr>"
                                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length == 0 ){
                                    html += "<tr class = 'LResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '4'>No se han registrado Responsables.</td>"
                                    html += "</tr>"
                                }
                                for(var rs = 0; rs < DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length; rs++){
                                    html += "<tr class = 'ResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+" ResponsableTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Id']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(rs+1)+"</td>"
                                        html += "<td class = 'TablaReportes_Cuerpo'>"+(DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Nombre'])+"</td>"
                                        html += "<td class = 'TablaReportes_Cuerpo'>"+(DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Email'])+"</td>"

                                    html += "</tr>"
                                }
                            html += "</table>"
                            html += "<hr>"

                        html += "</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaHora']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><input readonly class = 'form-control FechaEntregaTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'type = 'date' value = '"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaEntrega']+"'/></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<span class = 'HidenInformation HashItemsTRA'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"</span>"
                            html += "<span class = 'HidenInformation Subgrupo"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"+DatosGrupo[i]['Detalle'][x]['Hash']+"</span>"
                        html += "</td>";
                    html += "</tr>";
                }else{
                    html += "<tr >";
                        html += "<td class = 'ItemsOrdenList TablaReportes_Cuerpo_Center ItemsOrdenList"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"+OrdenItems+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea  class = 'form-control NActTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['NombreTarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea  class = 'form-control StatusTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Status']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea  class = 'form-control ActTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Tarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center TR"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' nowrap>"
                            html += "<table width = '100%' >"
                                html += "<tr>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'></th>"
                                html += "<tr>"
                                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length == 0 ){
                                    html += "<tr class = 'LResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '4'>No se han registrado Responsables.</td>"
                                    html += "</tr>"
                                }
                                for(var rs = 0; rs < DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length; rs++){
                                    html += "<tr class = 'ResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+" ResponsableTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Id']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(rs+1)+"</td>"
                                        html += "<td class = 'TablaReportes_Cuerpo'>"+(DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Nombre'])+"</td>"
                                        html += "<td class = 'TablaReportes_Cuerpo'>"+(DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Email'])+"</td>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                            html += "<img src = 'images/eliminar.png' class = 'OptionIcon' style = 'height:25px' onclick = 'BorrarResponsableTA("+DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'][rs]['Id']+","+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+")'/>"
                                        html += "</td>"
                                    html += "</tr>"
                                }
                            html += "</table>"
                            html += "<hr>"
                            html += "<div class = 'BarraIconos'>";
                                html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'crearResponsable("+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+")' />";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearResponsable("+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+")' >Nuevo Responsable</span>";
                            html += "</div>";
                        html += "</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaHora']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><input class = 'form-control FechaEntregaTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'type = 'date' value = '"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaEntrega']+"'/></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<select onchange = 'OptionItesmTA("+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+","+Hash+","+i+")' class = 'form-control OptionItemsTA' style = 'width:auto;'name = 'OptionItemsTA_"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' id = 'OptionItemsTA_"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"
                                html += "<option value = '0' selected>Seleccione</option>"
                                html += "<option value = 'TRAADMIN_ITEM_DEL' >¿Eliminar?</option>"
                                html += "<option value = 'TRAADMIN_ITEM_CERRAR'>¿Finalizar?</option>"
                            html += "</select>"
                            html += "<span class = 'HidenInformation HashItemsTRA'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"</span>"
                            html += "<span class = 'HidenInformation Subgrupo"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"+DatosGrupo[i]['Detalle'][x]['Hash']+"</span>"
                        html += "</td>";

                    html += "</tr>";
                }
                OrdenItems++
            }
        }
    html += "</table>"
    $(".InfoGrupos").html(html)
}

function ListarGruposCanal_View(Hash){
    ItemsTra = [];
    DatosGrupo = [];
    var OrdenItems = 1;
    printDataAjax('16a8299025b2c27a2ab19a96f320b9b3', {HashCP:Hash}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' >";
            html += "<div class='ContenedorCanalesTA' style = 'padding:0px;border:0px;'>";
                html += "<table width = '100%'>";
                    html += "<tr>";
                        html += "<td width = '95%' class = 'CenterText WhiteFont' style = 'vertical-align:middle;font-size:15px;'>";
                            //html += "Grupos "+ $(".ChanelTA_"+Hash).text()
                            html += $(".ChanelTA_"+Hash).text()
                        html += "</td>";
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/guardar.png' class = 'OptionIcon' onclick = 'SaveDataItemsTA("+Hash+","+$(".GrupoVisible").text()+")'/>";
                            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Crear Grupo</span>";
                        html += "</td>"
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Crear Grupo</span>";
                        html += "</td>"
                        
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<a href = '"+UrlUniversal+"50dd18656800255e4cf3d6e1c70e7704/"+Hash+"' target = '_blank' >"
                            html += "<img src ='images/BPdf.png' class = 'OptionIcon'  />";
                            html += "</a>"
                        html += "</td>"
                        /*html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Ordenar</span>";
                        html += "</td>";*/
                    html += "</tr>";
                html += "</table>";
            html += "</div>";
            html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' style = 'width:100%;height:500px;overflow:scroll;'>"
                
            html += "<span class = 'HidenInformation GrupoVisible'>0</span>"
        html += "<div class = 'form-row' >";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td class = 'CenterText IndicadorLado' width = '5%' ><span onclick = 'MovLeftDiv()' onmouseover = 'MovLeftDiv()' onmouseout = 'MovLeftDiv()'><</span></td>"
                            html += "<td class = 'CenterText'>"
                                html += "<div class = 'ContenidoScroller' >"
                                    html += "<table width = '100%'>";
                                        html += "<tr>"
                                        for(var i = 0; i < data.grupos.length; i++){
                                            html += "<td nowrap >"
                                                html += "<div class = 'CardReport Cursor ContenedorCanalesTAGrupos' onclick = 'SaveDataItemsTA("+Hash+","+i+")'>"
                                                    html += "<table width = '100%'>"
                                                        html += "<tr>"
                                                            html += "<td class = 'CenterText'>"
                                                                html += "<img src = 'images/datos_additem.png' class = 'OptionIcon' style = 'height:25px;' onclick = 'crearSubgrupo("+data.grupos[i]['Hash']+","+Hash+","+i+")' />"
                                                            html += "</td>"
                                                            html += "<td class = 'CenterText'>"
                                                                html += "<img src = 'images/editar.png' class = 'OptionIcon' style = 'height:25px;' onclick = 'GroupEditTA("+data.grupos[i]['Hash']+","+Hash+")' />"
                                                            html += "</td>"
                                                            html += "<td class = 'CenterText'>"
                                                                html += "<img src = 'images/eliminar.png' class = 'OptionIcon' style = 'height:25px;' onclick = 'GroupDelTA("+data.grupos[i]['Hash']+","+Hash+")'  />"
                                                            html += "</td>"
                                                            html += "<td class = 'CenterText HidenInformation GroupTA_Orden' >"
                                                                html += data.grupos[i]['Hash']
                                                            html += "</td>"
                                                            html += "<td style = 'width:200%;padding-top: 1px;' class = 'Cursor_AS GroupTA_"+data.grupos[i]['Hash']+"'><h5 class = 'Cursor ChanelTAG_"+data.grupos[i]['Hash']+"'>"+data.grupos[i]['Nombre']+"</h5></td>"

                                                        html += "</tr>"
                                                    html += "</table>"
                                                                              
                                                html += "</div>"
                                            html += "</td>"
                                            DatosGrupo.push({
                                                'Detalle':data.grupos[i]['Subgrupos'],
                                                'Hash':data.grupos[i]['HashCP'],
                                                'HashG':data.grupos[i]['Hash']
                                            })
                                            
                                        } 
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</td>"
                            html += "<td class = 'CenterText IndicadorLado' width = '5%'><span onclick = 'MovRightDiv()' onmouseover = 'MovRightDiv()' onmouseout = 'MovRightDiv()'>></span></td>"
                        html += "</tr>"
                    html += "</table>"
                    html += "<br>"
                    html += "<div class = 'form-row InfoGrupos' >";
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".DetalleCanal").html(html)//.css({'padding-left':'10px'})
        
        $(".GroupTA").sortable({
            stop: function( event, ui ) {
                var temp = "";
                $(".GroupTA_Orden").each(function(index){
                    temp += $(this).text()+"|";
                });
                $.ajax({
                    type:'POST',
                    url:'f3377de55d049a5c8ff40bd099e304d4',
                    data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
                    success:function(data){
                        
                    }
                });
            }
        });
        $(".SubgruposTA").sortable({
            stop: function( event, ui ) {
                var temp = "";
                /*$(".CanalOrdenId").each(function(index){
                    temp += $(this).text()+"|";
                });*/
                /*$.ajax({
                    type:'POST',
                    url:'fea7340349ee95e27531ac0dbd13c2be',
                    data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
                    success:function(data){
                        
                    }
                });*/
            }
        });
        $(".TRA_Items").sortable({
            stop: function( event, ui ) {
                var temp = "";
                $(".TRA_Items .ItemsOrdenList").each(function(index){
                    $(this).html(index+1);
                });
                $.ajax({
                    type:'POST',
                    url:'fea7340349ee95e27531ac0dbd13c2be',
                    data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
                    success:function(data){
                        
                    }
                });
            }
        });
        
        
        $(".GroupTA").css({
            'font-weight':'normal'
        })
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
        $(".ContenedorOptionDiv").css({'scroll-behavior': 'smooth'})
        console.log("Inicia Así")
        console.log(DatosGrupo)
    })
}

function ListarGruposCanal_View_operativo_otros(Hash){
    ItemsTra = [];
    DatosGrupo = [];
    var OrdenItems = 1;
    printDataAjax('16a8299025b2c27a2ab19a96f320b9bxx', {HashCP:Hash}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' >";
            html += "<div class='ContenedorCanalesTA' style = 'padding:0px;border:0px;'>";
                html += "<table width = '100%'>";
                    html += "<tr>";
                        html += "<td width = '95%' class = 'CenterText WhiteFont' style = 'vertical-align:middle;font-size:15px;'>";
                            //html += "Grupos "+ $(".ChanelTA_"+Hash).text()
                            html += $(".ChanelTA_"+Hash).text()
                        html += "</td>";
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/guardar.png' class = 'OptionIcon' onclick = 'SaveDataItemsTA("+Hash+","+$(".GrupoVisible").text()+")'/>";
                        html += "</td>"
                    html += "</tr>";
                html += "</table>";
            html += "</div>";
            html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' style = 'width:100%;height:500px;overflow:scroll;'>"
                html += "<table class = 'TableTA tableNew'>"
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th nowrap >No.</th>"
                            html += "<th style = 'width:150px;'>Grupo</th>"
                            html += "<th style = 'width:150px;'>Subgrupo</th>"
                            html += "<th style = 'width:350px;'>Nombre Actividad</th>"
                            html += "<th style = 'width:350px;'>Tarea</th>"
                            html += "<th style = 'width:350px;'>Status</th>"
                            html += "<th style = 'width:150px;'>Fecha Creación</th>"
                            html += "<th>Responsables Internos</th>"
                            html += "<th>Responsables Externos</th>"
                            html += "<th>Fecha Entrega</th>"
                            html += "<th>Acciones</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    ItemsTra = [];
                    for(var i = 0; i < data.Actividades.length; i++){
                        ItemsTra.push(data.Actividades[i]['Hash'])
                        html += "<tr class = 'TRA_Items'>"
                            html += "<td class = 'ItemsOrdenList ItemsOrdenList"+data.Actividades[i]['Hash']+" CenterText'>"+(data.Actividades[i]['Consecutivo'])+"</td>"
                            html += "<td style = 'vertical-align:middle;' nowrap>"
                                var option = "<select class = 'form-control GrupoTA"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;' readonly disabled>"
                                option += "<option value = '0'>Seleccione</option>"
                                for(var t = 0; t < data.Grupos.length; t++){
                                    if( data.Actividades[i]['IdGrupo'] == data.Grupos[t]['Id'] ){
                                        option += "<option value = '"+data.Grupos[t]['Hash']+"' selected >"+data.Grupos[t]['Nombre']+"</option>"
                                    }else{
                                        option += "<option value = '"+data.Grupos[t]['Hash']+"'>"+data.Grupos[t]['Nombre']+"</option>"
                                    }
                                }
                                html += option+"</select>"
                            html += "</td>"
                            html += "<td class = '' style = 'vertical-align:middle;' nowrap>"
                                var option = "<select class = 'form-control Subgrupo"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;' readonly disabled>"
                                option += "<option value = '0'>Seleccione</option>"
                                for(var t = 0; t < data.SubGrupos.length; t++){
                                    if( data.Actividades[i]['IdSubgrupo'] == data.SubGrupos[t]['Id'] ){
                                        option += "<option value = '"+data.SubGrupos[t]['Hash']+"' selected >"+data.SubGrupos[t]['Nombre']+"</option>"
                                    }else{
                                        option += "<option value = '"+data.SubGrupos[t]['Hash']+"'>"+data.SubGrupos[t]['Nombre']+"</option>"
                                    }
                                }
                                html += option+"</select>"
                            html += "</td>"
                            html += "<td>"
                                html += "<textarea readonly disabled class = 'form-control NActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['NombreTarea']+"</textarea>"
                            html+= "</td>"
                            html+= "<td>"
                                html += "<textarea readonly disabled class = 'form-control ActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Tarea']+"</textarea>"
                            html+= "</td>"
                            html += "<td>"
                                html += "<textarea  class = 'form-control StatusTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Status']+"</textarea>"
                            html += "</td>"
                            html += "<td nowrap>"+data.Actividades[i]['FechaHora']+"</td>"
                            html += "<td class = 'CenterText ListaResponsables"+data.Actividades[i]['Hash']+"'>"
                                html += "<ul class = 'ListaUsuariosTA'>"
                                    for(var g = 0; g < data.Actividades[i]['Responsables'].length;g++){
                                        html += "<li style = 'text-align:center;'>"
                                            html += "<img class = 'IconUsuarioTA'  src = ' "+UrlGeneral+"../storage/app/Usuarios/"+data.Actividades[i]['Responsables'][g]['ImgUsuario']+"' tittle = '"+data.Actividades[i]['Responsables'][g]['Nombre']+"' style = 'border-radius:15px;'/>"
                                        html += "</li>"
                                    }
                                html += "</ul>"
                            html += "</td>"
                            html += "<td></td>"
                            html += "<td nowrap>"+data.Actividades[i]['FechaEntrega']+"</td>"
                            html += "<td >"
                                html += "<span class = 'HidenInformation HashItemsTRA'>"+data.Actividades[i]['Hash']+"</span>"
                                html += "<span class = 'HidenInformation Subgrupo"+data.Actividades[i]['Hash']+"'>"+data.Actividades[i]['Hash']+"</span>"
                            html += "</td>";
                        html += "</tr>"
                    }
                    html += "</tbody>"
                html += "</table>"
            html += "<span class = 'HidenInformation GrupoVisible'>0</span>"
                
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".DetalleCanal").html(html)//.css({'padding-left':'10px'})
        
        $(".TableTA input").css({'border':'0px'});
        $(".TableTA td").css({'background-color':'white'})
        
        
        $(".IconUsuarioTA").css({'height':'30px', 'width':'30px','padding':'3px'})
        $(".ListaUsuariosTA").css({'list-style-type':'none','position':'relative','left':'-20px'})
        $(".ListaUsuariosTA li").css({'text-align':'center'})
        
        $(".GroupTA").css({
            'font-weight':'normal'
        })
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
        $(".ContenedorOptionDiv").css({'scroll-behavior': 'smooth'})
        
    })
}

function ListarGruposCanal_View_operativo(Hash){
    ItemsTra = [];
    DatosGrupo = [];
    var OrdenItems = 1;
    printDataAjax('16a8299025b2c27a2ab19a96f320b9bx', {HashCP:Hash}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' >";
            html += "<div class='ContenedorCanalesTA' style = 'padding:0px;border:0px;'>";
                html += "<table width = '100%'>";
                    html += "<tr>";
                        html += "<td width = '95%' class = 'CenterText WhiteFont' style = 'vertical-align:middle;font-size:15px;'>";
                            //html += "Grupos "+ $(".ChanelTA_"+Hash).text()
                            html += $(".ChanelTA_"+Hash).text()
                        html += "</td>";
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/guardar.png' class = 'OptionIcon' onclick = 'SaveDataItemsTA("+Hash+","+$(".GrupoVisible").text()+")'/>";
                            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Crear Grupo</span>";
                        html += "</td>"
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/trafico_reportes_ListOt.png' class = 'OptionIcon' onclick = 'ListarActividadesCerradas("+Hash+")' />";
                        html += "</td>"
                        html += "<td class = 'CentertText' nowrap>";
                            html += "<a href = '"+UrlUniversal+"50dd18656800255e4cf3d6e1c70e7704/"+Hash+"' target = '_blank' >"
                            html += "<img src ='images/BPdf.png' class = 'OptionIcon'  />";
                            html += "</a>"
                        html += "</td>"
                        /*html += "<td class = 'CentertText' nowrap>";
                            html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
                            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Ordenar</span>";
                        html += "</td>";*/
                    html += "</tr>";
                html += "</table>";
            html += "</div>";
            html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' style = 'width:100%;height:500px;overflow:scroll;'>"
                html += "<table class = 'TableTA tableNew'>"
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th nowrap >No. <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'CrearActividadGrup("+Hash+")'/></th>"
                            html += "<th style = 'width:150px;'>"
                                html += "Grupos"
                                html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                            html += "</th>"
                            html += "<th style = 'width:150px;'>"
                                html += "Subgrupos"
                                html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'SubGroupEditTA(0,"+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'modalSubgrupos("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                            html += "</th>"
                            
                            html += "<th style = 'width:350px;'>Nombre Actividad</th>"
                            html += "<th style = 'width:350px;'>Tarea</th>"
                            html += "<th style = 'width:350px;'>Status</th>"
                            html += "<th style = 'width:150px;'>Fecha Creación</th>"
                            html += "<th>Responsables Internos</th>"
                            html += "<th>Responsables Externos</th>"
                            html += "<th>Fecha Entrega</th>"
                            html += "<th>Acciones</th>"
                        html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    ItemsTra = [];
                    for(var i = 0; i < data.Actividades.length; i++){
                        ItemsTra.push(data.Actividades[i]['Hash'])
                        html += "<tr class = 'TRA_Items'>"
                            html += "<td class = 'ItemsOrdenList ItemsOrdenList"+data.Actividades[i]['Hash']+" CenterText'>"+(i+1)+"</td>"
                            html += "<td style = 'vertical-align:middle;' nowrap>"
                                var option = "<select class = 'form-control GrupoTA"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;'>"
                                option += "<option value = '0'>Seleccione</option>"
                                for(var t = 0; t < data.Grupos.length; t++){
                                    if( data.Actividades[i]['IdGrupo'] == data.Grupos[t]['Id'] ){
                                        option += "<option value = '"+data.Grupos[t]['Hash']+"' selected >"+data.Grupos[t]['Nombre']+"</option>"
                                    }else{
                                        option += "<option value = '"+data.Grupos[t]['Hash']+"'>"+data.Grupos[t]['Nombre']+"</option>"
                                    }
                                }
                                html += option+"</select>"
                            html += "</td>"
                            html += "<td class = '' style = 'vertical-align:middle;' nowrap>"
                                var option = "<select class = 'form-control Subgrupo"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;'>"
                                option += "<option value = '0'>Seleccione</option>"
                                for(var t = 0; t < data.SubGrupos.length; t++){
                                    if( data.Actividades[i]['IdSubgrupo'] == data.SubGrupos[t]['Id'] ){
                                        option += "<option value = '"+data.SubGrupos[t]['Hash']+"' selected >"+data.SubGrupos[t]['Nombre']+"</option>"
                                    }else{
                                        option += "<option value = '"+data.SubGrupos[t]['Hash']+"'>"+data.SubGrupos[t]['Nombre']+"</option>"
                                    }
                                }
                                html += option+"</select>"
                            html += "</td>"
                            html += "<td>"
                                html += "<textarea  class = 'form-control NActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['NombreTarea']+"</textarea>"
                            html+= "</td>"
                            html+= "<td>"
                                html += "<textarea  class = 'form-control ActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Tarea']+"</textarea>"
                            html+= "</td>"
                            html += "<td>"
                                html += "<textarea  class = 'form-control StatusTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Status']+"</textarea>"
                            html += "</td>"
                            html += "<td nowrap>"+data.Actividades[i]['FechaHora']+"</td>"
                            html += "<td class = 'CenterText ListaResponsables"+data.Actividades[i]['Hash']+"'>"
                                html += "<ul class = 'ListaUsuariosTA'>"
                                    for(var g = 0; g < data.Actividades[i]['Responsables'].length;g++){
                                        html += "<li style = 'text-align:center;'>"
                                            html += "<img class = 'IconUsuarioTA'  src = ' "+UrlGeneral+"../storage/app/Usuarios/"+data.Actividades[i]['Responsables'][g]['ImgUsuario']+"' tittle = '"+data.Actividades[i]['Responsables'][g]['Nombre']+"' style = 'border-radius:15px;'/>"
                                            html += "<img height = '15px' onclick = 'BorrarResponsableTA("+data.Actividades[i]['Responsables'][g]['Id']+","+data.Actividades[i]['Hash']+")' class = 'Cursor' src = ' "+UrlGeneral+"images/eliminar.png' tittle = '¿Eliminar?' />"
                                        html += "</li>"
                                    }
                                html += "</ul>"
                                html += "<hr>"
                                html += "<div class = 'BarraIconos'>";
                                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'crearResponsable("+data.Actividades[i]['Hash']+")' />";
                                html += "</div>";
                            html += "</td>"
                            html += "<td class = 'CenterText ListaExternos"+data.Actividades[i]['Hash']+"'>"
                                if( data.Actividades[i]['Externos'].length ){
                                    html += "<table width = '100%' >"
                                        html += "<tr>"
                                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Teléfono</th>"
                                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Acciones</th>"
                                        html += "</tr>"
                                        for(var h = 0; h < data.Actividades[i]['Externos'].length; h++ ){
                                            html += "<tr>"
                                                html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(h+1)+"</td>"
                                                html += "<td class = 'TablaReportes_Cuerpo E_Nombre"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Nombre'])+"</td>"
                                                html += "<td class = 'TablaReportes_Cuerpo E_Correo"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Correo'])+"</td>"
                                                html += "<td class = 'TablaReportes_Cuerpo E_Telefono"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Telefono'])+"</td>"
                                                html += "<td class = 'TablaReportes_Cuerpo' >"
                                                    html += "<table width = '100%'><tr>"
                                                        html += "<td class = 'CenterText'><img src ='images/editar1.png' style = 'height:15px;'onclick = 'EditarExternos("+data.Actividades[i]['Externos'][h]['Id']+","+data.Actividades[i]['Hash']+")'/></td>"
                                                        html += "<td class = 'CenterText'><img src ='images/eliminar.png' style = 'height:15px;' onclick = 'EliminarExternos("+data.Actividades[i]['Externos'][h]['Id']+","+data.Actividades[i]['Hash']+")'/></td>"
                                                    html += "</tr></table>"
                                                html += "</td>"
                                            html += "</tr>"
                                        }
                                    html += "</table>"
                                }
                                html += "<hr>"
                                html += "<div class = 'BarraIconos'>";
                                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'CrearExternos("+data.Actividades[i]['Hash']+")' />";
                                html += "</div>";
                            html += "</td>"
                            html += "<td>"
                                html += "<input class = 'form-control FechaEntregaTA"+data.Actividades[i]['Hash']+"' type = 'date' value = '"+data.Actividades[i]['FechaEntrega']+"'/>"
                            html += "</td>"
                            html += "<td >"
                                html += "<select onchange = 'OptionItesmTA("+data.Actividades[i]['Hash']+","+Hash+")' id = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"' class = 'form-control OptionItemsTA"+data.Actividades[i]['Hash']+"' style = 'width:auto;'name = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"' id = 'OptionItemsTA_"+data.Actividades['Hash']+"'>"
                                    html += "<option value = '0' selected>Seleccione</option>"
                                    html += "<option value = 'TRAADMIN_ITEM_DEL' >¿Eliminar?</option>"
                                    html += "<option value = 'TRAADMIN_ITEM_CERRAR'>¿Finalizar?</option>"
                                html += "</select>"
                                html += "<span class = 'HidenInformation HashItemsTRA'>"+data.Actividades[i]['Hash']+"</span>"
                                html += "<span class = 'HidenInformation Subgrupo"+data.Actividades[i]['Hash']+"'>"+data.Actividades[i]['Hash']+"</span>"
                            html += "</td>";
                        html += "</tr>"
                    }
                    html += "</tbody>"
                html += "</table>"
            html += "<span class = 'HidenInformation GrupoVisible'>0</span>"
                
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".DetalleCanal").html(html)//.css({'padding-left':'10px'})
        
        $(".TableTA input").css({'border':'0px'});
        $(".TableTA td").css({'background-color':'white'})
        
        $(".TableTA tbody").sortable({
            cursor: 'row-resize',
            placeholder: 'ui-state-highlight',
            opacity: '0.55',
            items: '.TRA_Items',
            stop: function( event, ui ) {
                var temp = "";
                $(".TRA_Items .ItemsOrdenList").each(function(index){
                    $(this).html(index+1);
                });
                
            }
          }).disableSelection();
        
        $(".IconUsuarioTA").css({'height':'30px', 'width':'30px','padding':'3px'})
        $(".ListaUsuariosTA").css({'list-style-type':'none','position':'relative','left':'-20px'})
        $(".ListaUsuariosTA li").css({'text-align':'center'})
        
        $(".GroupTA").css({
            'font-weight':'normal'
        })
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
        $(".ContenedorOptionDiv").css({'scroll-behavior': 'smooth'})
        
    })
}

function ListarActividadesCerradas(Hash){
    $.ajax({
        type:'POST',
        url:'16a8299025b2c27a2ab19a96f320b9bxyy',
        data:{HashCP:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Actividades Cerradas</span>";
                            html += "</td>"
                            html += "<td onclick='ModalEdit2(0);'>"
                                html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0);' aria-label='Close'>";
                                html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";
                    html += "<p>A continuación, se listan las actividades que anteriormente se han Finalizado.</p>"
                    
                    html += "<div class = 'ContenedorOptionDiv PARDIV_ContentACTIVOS' style = 'width:100%;height:500px;overflow:scroll;'>"
                        html += "<table class = 'TableTA tableNew'>"
                            html += "<thead>"
                                html += "<tr>"
                                    html += "<th nowrap >No. <img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'CrearActividadGrup("+Hash+")'/></th>"
                                    html += "<th style = 'width:150px;'>"
                                        html += "Grupos"
                                        html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'crearTraGrupo("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                        html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'OrdenarGruposTA("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                    html += "</th>"
                                    html += "<th style = 'width:150px;'>"
                                        html += "Subgrupos"
                                        html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'SubGroupEditTA(0,"+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                        html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'modalSubgrupos("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>"
                                    html += "</th>"

                                    html += "<th style = 'width:350px;'>Nombre Actividad</th>"
                                    html += "<th style = 'width:350px;'>Tarea</th>"
                                    html += "<th style = 'width:350px;'>Status</th>"
                                    html += "<th style = 'width:150px;'>Fecha Creación</th>"
                                    html += "<th>Responsables Internos</th>"
                                    html += "<th>Responsables Externos</th>"
                                    html += "<th>Acciones</th>"
                                html += "</tr>"
                            html += "</thead>"
                            html += "<tbody>"
                            ItemsTra = [];
                            for(var i = 0; i < data.Actividades.length; i++){
                                ItemsTra.push(data.Actividades[i]['Hash'])
                                html += "<tr class = 'TRA_Items'>"
                                    html += "<td class = 'ItemsOrdenList ItemsOrdenList"+data.Actividades[i]['Hash']+" CenterText'>"+(i+1)+"</td>"
                                    html += "<td style = 'vertical-align:middle;' nowrap>"
                                        var option = "<select readonly disabled class = 'form-control GrupoTA"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;'>"
                                        option += "<option value = '0'>Seleccione</option>"
                                        for(var t = 0; t < data.Grupos.length; t++){
                                            if( data.Actividades[i]['IdGrupo'] == data.Grupos[t]['Id'] ){
                                                option += "<option value = '"+data.Grupos[t]['Hash']+"' selected >"+data.Grupos[t]['Nombre']+"</option>"
                                            }else{
                                                option += "<option value = '"+data.Grupos[t]['Hash']+"'>"+data.Grupos[t]['Nombre']+"</option>"
                                            }
                                        }
                                        html += option+"</select>"
                                    html += "</td>"
                                    html += "<td class = '' style = 'vertical-align:middle;' nowrap>"
                                        var option = "<select readonly disabled class = 'form-control Subgrupo"+data.Actividades[i]['Hash']+"' style = 'width:150px;height:60px;'>"
                                        option += "<option value = '0'>Seleccione</option>"
                                        for(var t = 0; t < data.SubGrupos.length; t++){
                                            if( data.Actividades[i]['IdSubgrupo'] == data.SubGrupos[t]['Id'] ){
                                                option += "<option value = '"+data.SubGrupos[t]['Hash']+"' selected >"+data.SubGrupos[t]['Nombre']+"</option>"
                                            }else{
                                                option += "<option value = '"+data.SubGrupos[t]['Hash']+"'>"+data.SubGrupos[t]['Nombre']+"</option>"
                                            }
                                        }
                                        html += option+"</select>"
                                    html += "</td>"
                                    html += "<td>"
                                        html += "<textarea readonly disabled class = 'form-control NActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['NombreTarea']+"</textarea>"
                                    html+= "</td>"
                                    html+= "<td>"
                                        html += "<textarea readonly disabled class = 'form-control ActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Tarea']+"</textarea>"
                                    html+= "</td>"
                                    html += "<td>"
                                        html += "<textarea readonly disabled class = 'form-control StatusTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.Actividades[i]['Status']+"</textarea>"
                                    html += "</td>"
                                    html += "<td nowrap>"+data.Actividades[i]['FechaHora']+"</td>"
                                    html += "<td class = 'CenterText ListaResponsables"+data.Actividades[i]['Hash']+"'>"
                                        html += "<ul class = 'ListaUsuariosTA'>"
                                            for(var g = 0; g < data.Actividades[i]['Responsables'].length;g++){
                                                html += "<li style = 'text-align:center;'>"
                                                    html += "<img class = 'IconUsuarioTA'  src = ' "+UrlGeneral+"../storage/app/Usuarios/"+data.Actividades[i]['Responsables'][g]['ImgUsuario']+"' tittle = '"+data.Actividades[i]['Responsables'][g]['Nombre']+"' style = 'border-radius:15px;'/>"
                                                html += "</li>"
                                            }
                                        html += "</ul>"
                                    html += "</td>"
                                    html += "<td class = 'CenterText ListaExternos"+data.Actividades[i]['Hash']+"'>"
                                        if( data.Actividades[i]['Externos'].length ){
                                            html += "<table width = '100%' >"
                                                html += "<tr>"
                                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Teléfono</th>"
                                                html += "</tr>"
                                                for(var h = 0; h < data.Actividades[i]['Externos'].length; h++ ){
                                                    html += "<tr>"
                                                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(h+1)+"</td>"
                                                        html += "<td class = 'TablaReportes_Cuerpo E_Nombre"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Nombre'])+"</td>"
                                                        html += "<td class = 'TablaReportes_Cuerpo E_Correo"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Correo'])+"</td>"
                                                        html += "<td class = 'TablaReportes_Cuerpo E_Telefono"+data.Actividades[i]['Externos'][h]['Id']+"' nowrap>"+(data.Actividades[i]['Externos'][h]['Telefono'])+"</td>"
                                                        
                                                    html += "</tr>"
                                                }
                                            html += "</table>"
                                        }
                                    html += "</td>"
                                    html += "<td >"
                                        html += "<select onchange = 'OptionItesmTA("+data.Actividades[i]['Hash']+","+Hash+")' id = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"' class = 'form-control OptionItemsTA"+data.Actividades[i]['Hash']+"' style = 'width:auto;'name = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"' id = 'OptionItemsTA_"+data.Actividades['Hash']+"'>"
                                            html += "<option value = '0' selected>Seleccione</option>"
                                            html += "<option value = 'TRAADMIN_ITEM_ACT' >¿Reactivar?</option>"
                                        html += "</select>"
                                        html += "<span class = 'HidenInformation HashItemsTRA'>"+data.Actividades[i]['Hash']+"</span>"
                                        html += "<span class = 'HidenInformation Subgrupo"+data.Actividades[i]['Hash']+"'>"+data.Actividades[i]['Hash']+"</span>"
                                    html += "</td>";
                                html += "</tr>"
                            }
                            html += "</tbody>"
                        html += "</table>"
                    html += "</div>";

                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
                ModalEdit2(1)
                
                $(".TableTA input").css({'border':'0px'});
                $(".TableTA td").css({'background-color':'white'})

                $(".IconUsuarioTA").css({'height':'30px', 'width':'30px','padding':'3px'})
                $(".ListaUsuariosTA").css({'list-style-type':'none','position':'relative','left':'-20px'})
                $(".ListaUsuariosTA li").css({'text-align':'center'})

                $(".GroupTA").css({
                    'font-weight':'normal'
                })
                ResizeCardTA();
                $(".OptionIcon").css({'height':'25px'})
                $(".ContenedorOptionDiv").css({'scroll-behavior': 'smooth'})
        }
    })
}

function BorrarResponsableTA(Hash,Hash2){
    if(confirm("¿Está seguro(a) de Eliminar este responsable de la Actividad?")){
        var formData = new FormData();
        formData.append("Hash",Hash);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f2e6d334358565f4232da5462b9f9c2bDE',
            success:function(data){
                ResponsablesTareaTA(Hash2)
            }
        })
    }
}

function ResponsablesTareaTA(Hash){
    //TR
    var formData = new FormData();
    formData.append("Hash",Hash);
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'5a327927a985a2307f931ba8f685e88a',
        success:function(data){
            var html = "";
            html += "<ul class = 'ListaUsuariosTA'>"
                for(var rs = 0; rs < +data.Responsables.length;rs++){
                    html += "<li style = 'text-align:center;'>"
                        html += "<img class = 'IconUsuarioTA' src = ' "+UrlGeneral+"../storage/app/Usuarios/"+data.Responsables[rs]['ImgUsuario']+"' tittle = '"+data.Responsables[rs]['Nombre']+"' style = 'border-radius:15px;'/>"
                        html += "<img height = '15px' onclick = 'BorrarResponsableTA("+data.Responsables[rs]['Id_Responsable']+","+Hash+")' class = 'Cursor' src = ' "+UrlGeneral+"images/eliminar.png' tittle = '¿Eliminar?' />"
                    html += "</li>"
                }
            html += "</ul>"
            html += "<hr>"
            html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'crearResponsable("+Hash+")' />";
            $(".ListaResponsables"+Hash).html(html)
            $(".IconUsuarioTA").css({'height':'30px', 'width':'30px','padding':'3px'})
            $(".ListaUsuariosTA").css({'list-style-type':'none','position':'relative','left':'-20px'})
            $(".ListaUsuariosTA li").css({'text-align':'center'})
            
        }
    })
}

function SaveDataItemsTA(Hash){
    var DataItems = [];
    var Fechas = 0;
    $()
    for(var i = 0; i < ItemsTra.length; i++){
        var dHash = ItemsTra[i];
                
        if( $(".FechaEntregaTA"+dHash).val() == '' ){
            Fechas++;
        }
        DataItems.push({
            'Hash': dHash,
            'Orden': parseInt($(".ItemsOrdenList"+dHash).text()),
            'Subgrupo': $(".Subgrupo"+dHash).val(),
            'Grupo': $(".GrupoTA"+dHash).val(),
            'FechaEntrega': $(".FechaEntregaTA"+dHash).val(),
            'Actividad': $(".ActTA"+dHash).val(),
            'NombreActividad': $(".NActTA"+dHash).val(),
            'Status': $(".StatusTA"+dHash).val(),
        }) 
    }
    
    if( ItemsTra.length > 0 ){
        var formData = new FormData();
        formData.append("Cdata",JSON.stringify(DataItems));
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'ca3a575bf7f8530345c7ada09511f69d',
            success:function(data){
                setTimeout(function(){
                    //ListarGruposCanal_View_operativo(Hash)
                    setTimeout(function(){
                        //ConsultarDetalleGrupo( p )
                    }, 1000);
                }, 1000);
                    //DatosGrupo[i]['Hash']
            }
        })
    }else{
        
    }
    
}

function ListarActividadesGruposCanal(Hash){
    var html = "";
    
    printDataAjax('968178d58ab4cf07013fb70c7737f0e1', {HashG:Hash}, (data)=>{
        html += "<hr>"  
        html += "<div class = 'BarraIconos'>";
            html += "<img src ='images/datos_reordenar.png' class = 'OptionIcon'onclick = 'modalSubgrupos("+Hash+")' data-toggle='modal' data-target='#ModalEdit'/>";
            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'modalSubgrupos("+Hash+")' data-toggle='modal' data-target='#ModalEdit'>Administrar Subgrupos</span>";

            html += "<img src ='images/datos_reordenar.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'SaveDataItemsTA("+Hash+",0)' />";
            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'SaveDataItemsTA("+Hash+",0)' >Guardar</span>";
            
            html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;' class = 'OptionIcon'onclick = 'CrearActividadGrup("+Hash+")' />";
            //html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearActividadGrup("+Hash+")' >Agregar Actividad</span>";
        html += "</div>";
        html += "<br>";
        html += "<div class = 'ListActividades' style = 'width:100%;overflow-x:scroll;'>";
            html += "<table class = 'tableNew' style = 'width:100%;'>"
                html += "<thead>";
                    html += "<tr>"
                        html += "<th style = 'width:50px;'>No.</th>"
                        html += "<th style = 'width:150px;'>Subgrupo</th>"
                        html += "<th style = 'width:350px;'>Actividad</th>"
                        html += "<th style = 'width:350px;'>Statusx</th>"
                        html += "<th>Responsable</th>"
                        html += "<th>Contactos</th>"
                        html += "<th style = 'width:150px;'>Fecha Creación</th>"
                        html += "<th>Fecha Entrega</th>"
                        html += "<th>Opciones</th>"
                    html += "</tr>"
                html += "</thead>";
                html += "<tbody class = 'TBody'>";
                if( data.Actividades.length > 0 ){
                    for(var i = 0; i < data.Actividades.length;i++){
                        html += "<tr class = 'Cursor_AS TRA_Items'>";
                            html += "<td class = 'ItemsOrdenList ItemsOrdenList"+data.Actividades[i]['Hash']+" CenterText'>"+(i+1)+"</td>";
                            html += "<td class = 'CenterText HashSubGen"+data.Actividades[i]['Hash']+"' style = 'width:150px;'>"
                                html += "<span class = 'HidenInformation HashSub'>"+data.Actividades[i]['HashSubGrupo']+"_"+data.Actividades[i]['Hash']+"</span>"
                            html += "</td>";
                            html += "<td ><textarea class = 'form-control ActTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:75px;'>"+data.Actividades[i]['Tarea']+"</textarea></td>";
                            html += "<td ><textarea class = 'form-control StatusTA"+data.Actividades[i]['Hash']+"' style = 'text-align:justify;width:350px;height:75px;'>"+data.Actividades[i]['Status']+"</textarea></td>";
                            html += "<td ></td>";
                            html += "<td ></td>";
                            html += "<td class = 'CenterText' nowrap>"+data.Actividades[i]['FechaHora']+"</td>";
                            html += "<td class = 'CenterText'><input class = 'form-control FechaEntregaTA"+data.Actividades[i]['Hash']+"'type = 'date' value = '"+data.Actividades[i]['FechaEntrega']+"'/></td>";
                            html += "<td class = 'CenterText'>"
                                html += "<select onchange = 'OptionItesmTA("+data.Actividades[i]['Hash']+","+Hash+")' class = 'form-control OptionItemsTA' style = 'width:auto;'name = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"' id = 'OptionItemsTA_"+data.Actividades[i]['Hash']+"'>"
                                    html += "<option value = '0' selected>Seleccione</option>"
                                    html += "<option value = 'TRAADMIN_ITEM_DEL' >¿Eliminar?</option>"
                                    html += "<option value = 'TRAADMIN_ITEM_CERRAR'>¿Finalizar?</option>"
                                html += "</select>"
                                html += "<span class = 'HidenInformation HashItemsTRA'>"+data.Actividades[i]['Hash']+"</span>"
                            html += "</td>";
                        html += "</tr>";
                    }
                }
                html += "</tbody>";
            html += "</table>"
            html += "<br>"
        html += "</div>"
        $(".ContentPanelActiv").html(html)
        
        $(".TBody").sortable({
            stop: function( event, ui ) {
                $(".TBody .ItemsOrdenList").each(function(index){
                    $(this).html(index+1);
                });
            }
        });
        $(".HashSub").each(function(){
            var Val = $(this).text()
            Val = Val.split("_");
            var HashSG = Val[0];
            var Hash = Val[1];
            var ht = "<select class = 'form-control Subgrupo"+Hash+"' style = 'width:150px;'>";
                ht += "<option value = '0' selected>Sin Asignar</option>"
            for(var i = 0; i < data.Subgrupos.length;i++){
                if( data.Subgrupos[i]['Hash'] == HashSG ){
                    ht += "<option value = '"+data.Subgrupos[i]['Hash']+"' selected>"+data.Subgrupos[i]['Nombre']+"</option>"
                }else{
                    ht += "<option value = '"+data.Subgrupos[i]['Hash']+"' >"+data.Subgrupos[i]['Nombre']+"</option>"
                }
            }
            ht += "</select>"
            $(".HashSubGen"+Hash).html(ht)
        })
    })
}

function OptionItesmTA(Hash,Hash2){
    SaveDataItemsTA(Hash2)
    setTimeout(function(){
        if( $("#OptionItemsTA_"+Hash).val() ==  'TRAADMIN_ITEM_DEL' ){
            if( confirm("¿Está seguro(a) de Eliminar esta Actividad?\nTenga en cuenta que al hacerlo la información relacionada se perderá.") ){
                printDataAjax('e7c5b877bc4968b9ef234f1fdf6d2c75', {Hash:Hash}, (data)=>{
                    
                    ListarGruposCanal_View_operativo(Hash2);

                })
            }
        }else if( $("#OptionItemsTA_"+Hash).val() ==  'TRAADMIN_ITEM_CERRAR' ){
            if( confirm("¿Está seguro(a) de Finalizar esta Actividad?\nTenga en cuenta que al hacerlo la información relacionada no se podrá modificar y quedará solo de consulta.") ){
                printDataAjax('b168ba6541e9731b395a1448ea4b68c7', {Hash:Hash}, (data)=>{
                    
                    ListarGruposCanal_View_operativo(Hash2);
                })
            }
        }else if( $("#OptionItemsTA_"+Hash).val() ==  'TRAADMIN_ITEM_ACT' ){
            if( confirm("¿Está seguro(a) de REACTIVAR esta Actividad?") ){
                printDataAjax('b168ba6541e9731b395a1448ea4b68c7X', {Hash:Hash}, (data)=>{
                    
                    ListarGruposCanal_View_operativo(Hash2);
                })
            }
        }
    }, 1000);
    
}

function CrearActividadGrup(HashCanal){
    SaveDataItemsTA(HashCanal)
    setTimeout(function(){
        printDataAjax('24ef250f391728bc75ed9f7bf52070e5', {HashCanal:HashCanal}, (data)=>{  
            //setTimeout(() => {   }, 1000);
            ListarGruposCanal_View_operativo(HashCanal);
        });
    }, 1000);
    
}

function modalSubgrupos(Hash) {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Administrar Subgrupos </span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0)' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' onclick='ModalEdit(0);ListarActividadesGruposCanal("+Hash+")'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";

    TituloVentana = "Administrar Subgrupos"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='TAR_Estado'>Estado:</label>"
                html += "<select class ='form-control' name = 'TARSG_Estado' id = 'TARSG_Estado'>"
                    html += "<option value = 'Estado' >Todos</option>"
                    html += "<option value = '1' selected>Activos</option>"
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'ListarSubgruposId("+Hash+")'/>"
            html += "</div>"
        html += "</div>"
        html += "<div id='ListaSubgrupos' style = 'width:100%;'>"
            html += "<table class='dataTable tableNew' id = ''>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                html += "</tr>"
            html += "<table/>"
        html += "</div>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1);'>Cerrar</button>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ModalEdit(1);
    ListarSubgruposId(Hash);
}

function ListarSubgruposId(Hash){
    Subgrupos.IdGrupo = Hash;
    printDataAjax('da9792cd3fe48035429d94b5c948d2f9', {HashG:Hash,Estado:1}, (data)=>{
        var html = "";
        var OrdenSubgrupos = [];
        html += "<table class='dataTable tableNew'>"
            html += "<thead>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Nombre</th>"
                html += "</tr>"
            html += "</thead>"
            html += "<tbody class = 'TBody'>";
                for(var i = 0; i < data.Subgrupos.length; i++){
                    OrdenSubgrupos.push({
                        'Hash':data.Subgrupos[i]['Hash'],
                        'Orden':(i+1)
                    })
                    html += "<tr class = 'Cursor_AS'>";
                        html += "<td class = 'ItemsOrdenSubg CenterText'>"+(i+1)+"</td>";
                        html += "<td nowrap>"+data.Subgrupos[i]['Nombre']+"</td>";
                    html += "</tr>";
                }
            html += "</tbody>"
        html += "</table>"
        $("#ListaSubgrupos").html(html)
        
        var t = 0;
        $(".TBody .ItemsOrdenSubg").each(function(index){
            $(this).html(index+1);
            OrdenSubgrupos[index]['Orden'] = t+1;
            t++;
        });
        var temp = "";
        $(".TBody .ItemsOrdenSubg").each(function(index){
            temp += $(this).text()+"-"+(index+1)+"|";
        });
        var formData = new FormData();
        formData.append("Cdata",JSON.stringify(OrdenSubgrupos));
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'17dc42c0c118288d7d2bd21617efa530',
            success:function(data){

            }
        })
        
        $(".HashSub").each(function(){
            var Val = $(this).text()
            Val = Val.split("-");
            var HashSG = Val[0];
            var Hash = Val[1];
            var ht = "<select class = 'form-control Subgrupo"+Hash+"' style = 'width:150px;'>";
                ht += "<option value = '0' selected>Sin Asignar</option>"
            for(var i = 0; i < data.Subgrupos.length;i++){
                if( data.Subgrupos[i]['Hash'] == HashSG ){
                    ht += "<option value = '"+data.Subgrupos[i]['Hash']+"' selected>"+data.Subgrupos[i]['Nombre']+"</option>"
                }else{
                    ht += "<option value = '"+data.Subgrupos[i]['Hash']+"' >"+data.Subgrupos[i]['Nombre']+"</option>"
                }
            }
            ht += "</select>"
            $(".HashSubGen"+Hash).html(ht)
        })
        
        
        $(".TBody").sortable({
            stop: function( event, ui ) {
                var t = 0;
                $(".TBody .ItemsOrdenSubg").each(function(index){
                    $(this).html(index+1);
                    OrdenSubgrupos[index]['Orden'] = t+1;
                    t++;
                });
                var temp = "";
                $(".TBody .ItemsOrdenSubg").each(function(index){
                    temp += $(this).text()+"-"+(index+1)+"|";
                });
                var formData = new FormData();
                formData.append("Cdata",JSON.stringify(OrdenSubgrupos));
                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url: UrlGeneral+'17dc42c0c118288d7d2bd21617efa530',
                    success:function(data){

                    }
                })
            }
        });
        
    })
}

function crearSubgrupo(Hash,Hash2,i) {
    $(".GrupoVisible").html(i)
    SaveDataItemsTA(Hash2, $(".GrupoVisible").text())
    Subgrupos.IdGrupo = Hash;
    Grupos.idCanal = Hash2;
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Crear Nuevo Subgrupo</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1)' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0); ModalEdit(1)' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Subgrupos.enviar(event)' action='"+Subgrupos.rutaCrear+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='HashG' value='" + Hash + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Subgrupo' autocomplete = 'off' required/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<div class='col-sm-8'>";
                html += "<textarea class='form-control' id='traDescNombre' name='traDescNombre' autocomplete = 'off' required></textarea>";
            html += "</div>";
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0); ModalEdit(1)' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
}

function OrdenarGruposTA(Hash){
    $.ajax({
        type:'POST',
        url:'16a8299025b2c27a2ab19a96f320b9b3',
        data:{HashCP:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            

            TituloVentana = "Ordenar Canales"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";

            html += "<form class='form-signin'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                            html += "<table id = 'OrdenAreasUnidad' class = 'tableNew' width = '100%'>";
                                html += "<thead>";
                                    html += "<tr>";
                                        html += "<th>Orden</th>";
                                        html += "<th>Nombre</th>";
                                    html += "</tr>";
                                html += "</thead>";
                                html += "<tbody class = 'TBody'>";

                                if( data.grupos.length == 0 ){
                                    html += "<tr>";
                                        html += "<td class = 'ItemsOrden CenterText' colspan = '2'>No hay Canales creados.</td>";
                                    html += "</tr>";
                                    $(".TBody").html(html);
                                }else{
                                    for(var i = 0; i < data.grupos.length;i++){
                                        html += "<tr class = 'Cursor_AS'>";
                                            html += "<td class = 'ItemsOrden CenterText'>"+data.grupos[i]['Orden']+"</td>";
                                            html += "<td>"+data.grupos[i]['Nombre']+"</td>";
                                            html += "<td class = 'ItemsOrdenId' style = 'display:none;'>"+data.grupos[i]['Hash']+"</td>";
                                        html += "</tr>";
                                    }
                                }
                                html += "</tbody>";
                            html += "</table>";
                        html += "</div>";
                    html += "</div>"
                html += "</div>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' onclick = 'ModalEdit(0)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarOrdenGrupos("+Hash+")'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .ItemsOrden").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });
        }
    })
}

function OrdenarCanalesTA(Hash){
    $.ajax({
        type:'POST',
        url:'d4f014e4d8352329412acef13ccebe1cg',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";

            TituloVentana = "Ordenar Canales"
ImgVentana = "images/AGREGAR_ICONO.png"
FuncionesHeader = ""
FuncionesRegresar = "myModal(0)"
html += "<div class='modal-header'>";
	html += GeneradorHeadersVentanas()
html += "</div>";
            html += "<form class='form-signin'  action='javascript:void(0)' method='post' >"
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'ContenedorCamposReOrg' style = 'width:100%;'>";
                            html += "<table id = 'OrdenAreasUnidad' class = 'tableNew' width = '100%'>";
                                html += "<thead>";
                                    html += "<tr>";
                                        html += "<th>Orden</th>";
                                        html += "<th>Nombre</th>";
                                    html += "</tr>";
                                html += "</thead>";
                                html += "<tbody class = 'TBody'>";

                                if( data.Activos.length == 0 ){
                                    html += "<tr>";
                                        html += "<td class = 'ItemsOrden CenterText' colspan = '2'>No hay Canales creados.</td>";
                                    html += "</tr>";
                                    $(".TBody").html(html);
                                }else{
                                    for(var i = 0; i < data.Activos.length;i++){
                                        if( data.Activos[i]['Tipo'] != 'OTROS' ){
                                            html += "<tr class = 'Cursor_AS'>";
                                            html += "<td class = 'ItemsOrden CenterText'>"+data.Activos[i]['Orden']+"</td>";
                                            html += "<td>"+data.Activos[i]['Nombre']+"</td>";
                                            html += "<td class = 'ItemsOrdenId' style = 'display:none;'>"+data.Activos[i]['Hash']+"</td>";
                                            html += "</tr>";
                                        }
                                    }
                                }
                                html += "</tbody>";
                            html += "</table>";
                        html += "</div>";
                    html += "</div>"
                html += "</div>"
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' onclick = 'ModalEdit(0)'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'GuardarOrdenCanales()'>Guardar</button>";
                    html += "</div>";
            html += "</form>"

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .ItemsOrden").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });

        }
    })
}

function GuardarOrdenCanales(){
    var temp = "";
    $(".ItemsOrdenId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url:'fea7340349ee95e27531ac0dbd13c2be',
        data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0)
            ListarCanales();
        }
    });
}

function GuardarOrdenGrupos(Hash){
    var temp = "";
    $(".ItemsOrdenId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    $.ajax({
        type:'POST',
        url:'f3377de55d049a5c8ff40bd099e304d4',
        data:{orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            ModalEdit(0)
            alert("El orden de los grupos se ha modificado de manera correcta para impresión.")
        }
    });
}

function ListarCanales(){
    printDataAjax('d4f014e4d8352329412acef13ccebe1cg', {Tipo:1}, (data)=>{
        var html = "";
        html += "<div class='ContenedorMenu' style = 'width:100%;'>";

                html += "<div class = 'ContenedorOptionDiv PARDIV_Content1' >"
                    html += "<div class = 'form-row FormsGeneral '>";
                    for(var i = 0; i < data.Activos.length; i++){
                        html += "<div class='col col-sm-3 my-1'>"
                            if( data.Activos[i]['Tipo'] == 'PROPIO' ){
                                html += "<div class = 'CardReport Cursor ContenedorCanalesTA' onclick = 'ListarGruposCanal_View_operativo("+data.Activos[i]['Hash']+")'>"
                                    html += "<table style = 'width:100%;'>"
                                        html += "<tr>"
                                            html += "<td style = 'width:90%;' nowrap>"
                                                html += "<h4 class = 'ChanelTA_"+data.Activos[i]['Hash']+"'>"+data.Activos[i]['Nombre']+"</h4>"
                                            html += "</td>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<img src = 'images/editar.png' style = 'height:25px;' onclick = 'ChanelEditTA("+data.Activos[i]['Hash']+")' />"
                                            html += "</td>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<img src = 'images/eliminar.png' style = 'height:25px;' onclick = 'ChanelDelTA("+data.Activos[i]['Hash']+")'  />"
                                            html += "</td>"
                                        html += "</tr>"
                                    html += "</table>"                                
                                html += "</div>"
                            }
                        html += "</div>"
                    }
                    for(var i = 0; i < data.Otros.length; i++){
                        html += "<div class='col col-sm-3 my-1'>"
                            html += "<div class = 'CardReport Cursor ContenedorCanalesTA' onclick = 'ListarGruposCanal_View_operativo_otros("+data.Otros[i]['Hash']+")' style = 'background-color:#e38f47;'>"
                                html += "<table style = 'width:100%;'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:90%;' nowrap>"
                                            html += "<h4 class = 'ChanelTA_"+data.Otros[i]['Hash']+"'>"+data.Otros[i]['Nombre']+"</h4>"
                                        html += "</td>"
                                    html += "</tr>"
                                html += "</table>"                                
                            html += "</div>"
                        html += "</div>"
                    }
                    html += "</div>"
                html += "</div>";
                html += "<div class = 'DetalleCanal'></div>"
                html += "<br>"
        html += "</div>";
        
        $(".ContentDataTA").html(html)
        ResizeCardTA();
        $(".OptionIcon").css({'height':'25px'})
    })
}

function ChanelEditTA(Hash){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Editar Canal</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0);' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        
    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

    html += "<div class='form-group row'>";
        html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre del Canal:</label>";
        html += "<div class='col-sm-8'>";
            html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Canal' value = '"+$(".ChanelTA_"+Hash).text()+"'autocomplete = 'off' required/>";
        html += "</div>";
    html += "</div>";

    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit(0);' data-dismiss='modal'>Cerrar</button>";
        html += "<button type='button' class='btn btn-primary' onclick = 'SaveChanelEdit("+Hash+")'>Guardar</button>";
    html += "</div>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit(1)
}

function GroupEditTA(Hash,Hash2){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Editar Grupo</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0);' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        
    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

    html += "<div class='form-group row'>";
        html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre del Grupo:</label>";
        html += "<div class='col-sm-8'>";
            html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Grupo' value = '"+$(".GroupTA_"+Hash).text()+"'autocomplete = 'off' required/>";
        html += "</div>";
    html += "</div>";

    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit(0);' data-dismiss='modal'>Cerrar</button>";
        html += "<button type='button' class='btn btn-primary' onclick = 'SaveGroupEdit("+Hash+","+Hash2+")'>Guardar</button>";
    html += "</div>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit(1)
}
function SubGroupEditTA(Hash,Hash2){
    SaveDataItemsTA(Hash2)
    setTimeout(function(){
        var html = "";
    

    TituloVentana = "Nuevo Subgrupo"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "myModal(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";

    html += "<div class='modal-body'>";
        
    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

    html += "<div class='form-group row'>";
        html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre del SubGrupo:</label>";
        html += "<div class='col-sm-8'>";
            html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Grupo' value = '' autocomplete = 'off' required/>";
        html += "</div>";
    html += "</div>";

    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit(0);' data-dismiss='modal'>Cerrar</button>";
        html += "<button type='button' class='btn btn-primary' onclick = 'SaveSubGroupEdit(0,"+Hash2+")'>Guardar</button>";
    html += "</div>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit(1)
    }, 1000);
    
}

function ChanelDelTA(Hash){
    if( confirm("¿Está seguro(a) de Retirar esta pestaña?\nTenga en cuenta que al hacerlo no podrá recuperar la información correspondiente.") ){
        printDataAjax('4857d2d55d0323c2dfc5c0f57a6ac236D', { traNombre:$("#traNombre").val(), Hash:Hash}, (data)=>{
            ListarCanales()
        })
    }
}

function GroupDelTA(Hash,Hash2){
    if( confirm("¿Está seguro(a) de Retirar este Grupo?\nTenga en cuenta que al hacerlo no podrá recuperar la información correspondiente.") ){
        printDataAjax('83ae822d145224e43c0f63e502adfb52DS', { Hash:Hash}, (data)=>{
            ListarGruposCanal_View(Hash2)
        })
    }
}
function SubGroupDelTA(Hash,Hash2){
    if( confirm("¿Está seguro(a) de Retirar este SubGrupo?\nTenga en cuenta que al hacerlo no podrá recuperar la información correspondiente.") ){
        printDataAjax('83ae822d145224e43c0f63e502adfb52DSG', { Hash:Hash}, (data)=>{
            ListarGruposCanal_View(Hash2)
        })
    }
}

function SaveChanelEdit(Hash){
    if( $("#traNombre").val().length > 0 ){
        printDataAjax('4857d2d55d0323c2dfc5c0f57a6ac236E', { traNombre:$("#traNombre").val(), Hash:Hash}, (data)=>{
            ModalEdit(0)
            ListarCanales()
            ListarGruposCanal_View(Hash)
        })
    }    
}

function SaveGroupEdit(Hash,Hash2){
    if( $("#traNombre").val().length > 0 ){
        printDataAjax('83ae822d145224e43c0f63e502adfb52E', { traNombre:$("#traNombre").val(), Hash:Hash}, (data)=>{
            ModalEdit(0)
            ListarGruposCanal_View(Hash2)
        })
    }    
}
function SaveSubGroupEdit(Hash,Hash2){
    if( $("#traNombre").val().length > 0 ){
        printDataAjax('86ea815a9b9280fa024da2108f53380a', { traNombre:$("#traNombre").val(), Hash:Hash2}, (data)=>{
            ModalEdit(0)
            ListarGruposCanal_View_operativo(Hash2)
        })
    }    
}

function ResizeCardTA(){
    $(".CardReport h5").css({
        'font-size':'14px'
    })
}

function notificaciones() {
    printDataAjax('56779eaa2b25de80204534dc936146f0', {}, (data)=>{
        $('#traResponsables').text(data.recordsResponsables)
    })
}

function GuardarResponsableTA(){
    if( NotificadosMensajesTA.length > 0 || ( $("#traNombre").val().length > 3 && $("#traEmail").val().length > 5 ) ){
        var formData = new FormData();
        var Hash= document.getElementsByName('_tokenHash')[0].value;
        formData.append("Cdata",JSON.stringify(NotificadosMensajesTA));
        formData.append("traNombre",$("#traNombre").val());
        formData.append("traEmail",$("#traEmail").val());
        formData.append("Hash",document.getElementsByName('_tokenHash')[0].value);
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f2e6d334358565f4232da5462b9f9c2b',
            success:function(data){
                alert("Responsable Guardado");
                NotificadosMensajesTA = [];
                ResponsablesTareaTA(Hash)
                ModalEdit2(0)
            }
        })
        
    }
}
//---------------------------------------------------------------------------//
//------------------------------ Responsables ------------------------------//
//-------------------------------------------------------------------------//
const Responsables = {
    rutaCrear: 'f2e6d334358565f4232da5462b9f9c2b',
    enviar: function (e) {
        sendForm(e, () => {
            ModalEdit2(0)
            ModalEdit(1)
            buscarTableResponsables()
            notificaciones()
        })
    },
    estado: function (idResponsable) {
        printDataAjax('97a7626758832c60fd7897801ebb9743', {Hash: idResponsable}, data => {
            buscarTableResponsables()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    }
}


const Subgrupos = {
    rutaCrear: '86ea815a9b9280fa024da2108f53380a',
    IdGrupo:null,
    enviar: function (e) {
        sendForm(e, () => {
            ModalEdit2(0)
            ListarGruposCanal_View(Grupos.idCanal)
        })
    },
    estado: function (idResponsable) {
        printDataAjax('cb3c45c8f6e50a168409008ce54b486c', {Hash: idResponsable}, data => {
            ListarSubgruposId(Subgrupos.IdGrupo)
        })
    }
}

function modalResponsables() {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'> Responsables </span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0)' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' onclick='ModalEdit(0)'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'BarraIconos'>"
            html += "<img src ='images/datos_additem.png' class = 'OptionIcon'onclick = 'ModalEdit(0); ModalEdit2(1); crearResponsable()' data-toggle='modal' data-target='#ModalEdit2'/>"
            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'ModalEdit(0); ModalEdit2(1); crearResponsable()' data-toggle='modal' data-target='#ModalEdit2'>Crear Responsable</span>"
        html += "</div>"
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='TAR_Estado'>Estado:</label>"
                html += "<select class ='form-control' name = 'TAR_Estado' id = 'TAR_Estado'>"
                    html += "<option value = '-1' >Todos</option>"
                    html += "<option value = '1' selected>Activos</option>"
                    html += "<option value = '0' >Inactivos</option>"
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='TAR_TextBusqueda'>Buscar:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TAR_TextBusqueda' name = 'TAR_TextBusqueda' />"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'buscarTableResponsables()'/>"
            html += "</div>"
        html += "</div>"
        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaResponsables'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Email</th>"
                        html += "<th>Estado</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1)'>Cerrar</button>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ModalEdit(1);
    tableResopnsables();
}

function buscarTableResponsables() {
    $DataTable_Responsables.destroy();
    $DataTable_Responsables.draw();
    tableResopnsables();
}

function tableResopnsables() {
    $DataTable_Responsables = $('#listaResponsables').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax' : {
            'url':'d5d93e4b128d6a167cdf5f4109233d3f',
            'data':function (d) {
                d.search['Estado'] = $('#TAR_Estado').val();
                d.search['value'] = $('#TAR_TextBusqueda').val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns' : [
            {
                data: 'Num',
                orderable: false,
                searchable: false,
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Nombre',
                render: function (data, type, full, meta) {
                    return '<span>'+data+'</span>';
                }
            },
            {
                data: 'Email',
                render: function (data, type, full, meta) {
                    return '<span>'+data+'</span>';
                }
            },
            {
                data: 'Estado',
                render: function (data, type, full, meta) {
                    hx = '<span onclick = "Responsables.estado(\''+full.Hash+'\')">'
                    if (data === 1) {
                        hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                    } else {
                        hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                    }
                    return '<center><span>'+hx+'</span></center>';
                }
            }
        ],
        order: [[1, "asc"]],
        language: {
            url: "js/dataTable/Spanish.lang"
        },
    })
    $('#listaResponsables').css({'width':'100%'})
}

function crearResponsable(Hash) {
    var html = "";

    TituloVentana = "Crear Nuevo Responsable"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0);"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Responsables.enviar(event)' action='"+Responsables.rutaCrear+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' onkeyup = 'ListarUsuariosTA()'name='traNombre' placeholder='Nombre Responsable' autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Email:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='email' class='form-control' id='traEmail' name='traEmail' placeholder='example@domine.com' autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<div class='col-sm-12 TempCopiados'>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<div class='col-sm-12 Copiados'>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0);' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' onclick = 'GuardarResponsableTA()' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
}
function CrearExternos(Hash) {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Nuevo Responsable Externos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0);' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Responsable' autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Email:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='email' class='form-control' id='traEmail' name='traEmail' placeholder='example@domine.com' autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Teléfono:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traTelefono' name='traTelefono'  autocomplete = 'off' />";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0);' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' onclick = 'GuardarExternoTA(" + Hash + ")' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
}



function EditarExternos(Id,Hash){
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Nuevo Responsable Externos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0);' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0);' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='_tokenHash' value='" + Hash + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Responsable' value = '"+$(".E_Nombre"+Id).text()+"' />";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Email:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='email' class='form-control' id='traEmail' name='traEmail' placeholder='example@domine.com' value = '"+$(".E_Correo"+Id).text()+"' />";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Teléfono:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traTelefono' name='traTelefono'  autocomplete = 'off' value = '"+$(".E_Telefono"+Id).text()+"'/>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0);' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' onclick = 'GuardarEditarExterno("+Id+", " + Hash + ")' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1)
}

function GuardarEditarExterno(Id,Hash){
    if( $("#traNombre").val() != ''  ){
        $.ajax({
            type:'POST',
            url:'16a8299025b2c27a2ab19a96f320b955x',
            data:{Hash2:Id,Hash:Hash,_token:document.getElementsByName('_token')[0].value, Nombre:$("#traNombre").val(), Correo:$("#traEmail").val(),Tel:$("#traTelefono").val()},
            success:function(data){
                if( data.Datos.length ){
                    var html = "<table width = '100%' >"
                        html += "<tr>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Teléfono</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Acciones</th>"
                        html += "</tr>"
                        for(var h = 0; h < data.Datos.length; h++ ){
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(h+1)+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Nombre"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Nombre'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Correo"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Correo'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Telefono"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Telefono'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo'>"
                                    html += "<table width = '100%'><tr>"
                                        html += "<td class = 'CenterText'><img src ='images/editar1.png' style = 'height:15px;' onclick = 'EditarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                        html += "<td class = 'CenterText'><img src ='images/eliminar.png' style = 'height:15px;' onclick = 'EliminarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                    html += "</tr></table>"
                                html += "</td>"
                            html += "</tr>"
                        }
                        html += "</table>"
                }
                html += "<hr>"
                html += "<div class = 'BarraIconos'>";
                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'CrearExternos("+Hash+")' />";
                html += "</div>";
                $(".ListaExternos"+Hash).html(html);
                ModalEdit2(0)
            }
        })
    }
}

function EliminarExternos(Id,Hash){
    if( confirm("¿Está seguro(a) de eliminar este responsable?")){
        $.ajax({
            type:'POST',
            url:'16a8299025b2c27a2ab19a96f320b955xx',
            data:{Hash2:Id,Hash:Hash,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if( data.Datos.length > 0){
                    var html = "<table width = '100%' >"
                        html += "<tr>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Teléfono</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Acciones</th>"
                        html += "</tr>"
                        for(var h = 0; h < data.Datos.length; h++ ){
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(h+1)+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Nombre"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Nombre'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Correo"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Correo'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Telefono"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Telefono'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo'>"
                                    html += "<table width = '100%'><tr>"
                                        html += "<td class = 'CenterText'><img src ='images/editar1.png' style = 'height:15px;' onclick = 'EditarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                        html += "<td class = 'CenterText'><img src ='images/eliminar.png' style = 'height:15px;' onclick = 'EliminarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                    html += "</tr></table>"
                                html += "</td>"
                            html += "</tr>"
                        }
                        html += "</table>"
                }
                html += "<hr>"
                html += "<div class = 'BarraIconos'>";
                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'CrearExternos("+Hash+")' />";
                html += "</div>";
                $(".ListaExternos"+Hash).html(html);
            }
        })
    }
}

function GuardarExternoTA(Hash){
    if( $("#traNombre").val() != ''  ){
        $.ajax({
            type:'POST',
            url:'16a8299025b2c27a2ab19a96f320b9555',
            data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value, Nombre:$("#traNombre").val(), Correo:$("#traEmail").val(),Tel:$("#traTelefono").val()},
            success:function(data){
                if( data.Datos.length > 0 ){
                    var html = "<table width = '100%' >"
                        html += "<tr>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Teléfono</th>"
                            html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Acciones</th>"
                        html += "</tr>"
                        for(var h = 0; h < data.Datos.length; h++ ){
                            html += "<tr>"
                                html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(h+1)+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Nombre"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Nombre'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Correo"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Correo'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo E_Telefono"+data.Datos[h]['Id']+"' nowrap>"+(data.Datos[h]['Telefono'])+"</td>"
                                html += "<td class = 'TablaReportes_Cuerpo'>"
                                    html += "<table width = '100%'><tr>"
                                        html += "<td class = 'CenterText'><img src ='images/editar1.png' style = 'height:15px;' onclick = 'EditarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                        html += "<td class = 'CenterText'><img src ='images/eliminar.png' style = 'height:15px;' onclick = 'EliminarExternos("+data.Datos[h]['Id']+","+Hash+")'/></td>"
                                    html += "</tr></table>"
                                html += "</td>"
                            html += "</tr>"
                        }
                        html += "</table>"
                }
                html += "<hr>"
                html += "<div class = 'BarraIconos'>";
                    html += "<img src ='images/datos_additem.png' style = 'padding-left:10px;height:25px;' class = 'OptionIcon'onclick = 'CrearExternos("+Hash+")' />";
                html += "</div>";
                $(".ListaExternos"+Hash).html(html)
                ModalEdit2(0)
            }
        })
    }
}

var TA_Temp_Msj_Copiados = [];
var NotificadosMensajesTA = [];

function ListarUsuariosTA(){
    if( $("#traNombre").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'3115db3fb13ad9db964287eed6b9cd37',
            data:{Hash:$("#traNombre").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                TA_Temp_Msj_Copiados = [];
                TA_Temp_Msj_Copiados = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < TA_Temp_Msj_Copiados.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PAsigAgen' value='"+TA_Temp_Msj_Copiados[i]['IdUsuario']+"' id='PAsigAgen"+TA_Temp_Msj_Copiados[i]['IdUsuario']+"' onclick = 'AddMsjTA("+TA_Temp_Msj_Copiados[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+TA_Temp_Msj_Copiados[i]['NombreUsuario']+"</td>"
                            html += "<td>"+TA_Temp_Msj_Copiados[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( TA_Temp_Msj_Copiados.length == 0 ){
                        html += "<tr>"
                            html += "<td colspan = '3' style = 'font-weight: bold;color: red;'>No se han encontrado datos para la información ingresada.</td>"
                        html += "</tr>"
                    }
                html += "</table>"
                $(".TempCopiados").html(html+"<br>")
            }
        })
    }
}

function AddMsjTA(Hash,T){
    $("#traNombre").val("")
    NotificadosMensajesTA.push({
        'Tipo': TA_Temp_Msj_Copiados[T]['Tipo'],
        'Nombre': TA_Temp_Msj_Copiados[T]['NombreUsuario'],
        'IdU':TA_Temp_Msj_Copiados[T]['IdUsuario'],
    })
    $(".TempCopiados").html("")
    ListarNotificadosMsjTA()
}


function ListarNotificadosMsjTA(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < NotificadosMensajesTA.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+NotificadosMensajesTA[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelNotificadosMsjTA("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".Copiados").html(html)
}

function DelNotificadosMsjTA(i){
    NotificadosMensajesTA.splice(i,1);
    ListarNotificadosMsjTA()
}

//---------------------------------------------------------------------------//
//-------------------------------- Canales ---------------------------------//
//-------------------------------------------------------------------------//
const Canales = {
    rutaCrear: '707808edf4091a3834dad468cb0ad699',
    rutaReporte: '50dd18656800255e4cf3d6e1c70e7704',
    enviar: function (e) {
        sendForm(e, () => {
            ModalEdit(0)
            ListarCanales()
        })
    },
    estado: function (idCanal) {
        printDataAjax('4857d2d55d0323c2dfc5c0f57a6ac236', {Hash:idCanal}, data => {
            buscarTableCanales()
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    generateReport: function (idCP) {
        window.open(this.rutaReporte+'/'+idCP, '_blank');
    }
}

function buscarTableCanales() {
    $DataTable_CanalesPrincipales.destroy();
    $DataTable_CanalesPrincipales.draw();
    tableCanalesAdministrativo();
}

function tableCanalesAdministrativo() {
    $DataTable_CanalesPrincipales = $('#TablaTraCanalAdministrativo').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax' : {
            'url':'d4f014e4d8352329412acef13ccebe1c',
            'data':function (d) {
                d.search['Estado'] = $('#TAC_Estado').val();
                d.search['value'] = $('#TAC_TextBusqueda').val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns' : [
            {
                data: 'Num',
                orderable: false,
                searchable: false,
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Hash',
                render: function (data, type, full, meta) {
                    return '<center> <input type="radio" id="_ContentTAC_'+data+'" name="Actividad" onchange="initActividades(\''+data+'\')" '+(full.Estado === 0 ? 'disabled':'')+'></center>'
                }
            },
            {
                data: 'Nombre',
                render: function (data, type, full, meta) {
                    return '<span id="_Content_TACNombre_'+full.Hash+'">'+data+'</span>';
                }
            },
            {
                data: 'Grupos',
                render: function (data, type, full, meta) {
                    html = '<select class="form-control" id="_ContentGruposC_'+full.Hash+'" onchange="initActividades(\''+full.Hash+'\')" '+(full.Estado === 0 ? 'disabled':'')+'>'
                        html += '<option value="" selected> Seleccione </option>'
                        data.forEach(e => {
                            html += '<option value="'+e.Hash+'-'+e.Nombre+'"> '+e.Nombre+' </option>'
                        });
                    html += '</select>'
                    return html;
                }
            },
            {
                data: 'Hash',
                render: function (data, type, full, meta) {
                    if (!full.TRA_CANAL_DEFAULT) {
                        return '<center><i class="fas fa-folder-open Cursor" onclick="modalGrupos(\''+data+'\', \''+full.Nombre+'\')"></i></center>';
                    } else {
                        return '<center><span>Default</span></center>';
                    }
                }
            },
            {
                data: 'Estado',
                render: function (data, type, full, meta) {
                    hx = 'Default'
                    if (!full.TRA_CANAL_DEFAULT) {
                        hx = '<span onclick = "Canales.estado(\''+full.Hash+'\')">'
                        if (data === 1) {
                            hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                        } else {
                            hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                        }
                    }
                    return '<center><span>'+hx+'</span></center>';
                }
            },
            {
                data: 'Hash',
                render: function (data, type, full, meta) {
                    return '<center><i class="fas fa-file-export Cursor" onclick="Canales.generateReport(\''+data+'\')"></i></center>';
                }
            }
        ],
        order: [[1, "asc"]],
        language: {
            url: "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraCanalAdministrativo').css({'width':'100%'})

}

function CrearCanalTraAdministrativo() {
    printDataAjax('1a4bf05385443ac88d525d98b0bd59a6', {}, data => {
        Canales.rutaCrear = '707808edf4091a3834dad468cb0ad699';
        var html = "";
        
        TituloVentana = "Crear Nuevo Canal"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<form class='form-signin' onsubmit='Canales.enviar(event)' action='"+Canales.rutaCrear+"' method='post'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";

            html += "<div class='form-group row'>";
                html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre del Canal:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Canal' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-group row'>";
                html += "<label for='traNombre' class='col-sm-4 col-form-label'>Seleccione un Modelo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<select class = 'form-control' name = 'Tipo' id = 'Tipo'>"
                        html += "<option value = '0'>Seleccione</option>"
                        for(var i = 0; i < data.Tipo.length; i++){
                            html += "<option value = '"+data.Tipo[i]['Hash']+"'>"+data.Tipo[i]['Nombre']+"</option>"
                        }
                    html += "</select>"
                html += "</div>";
            html += "</div>";

            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit(0);' data-dismiss='modal'>Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
            html += "</div>";
        html += "</form>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    })
    
}


//---------------------------------------------------------------------------//
//--------------------------------- Grupos ---------------------------------//
//-------------------------------------------------------------------------//
const Grupos = {
    idCanal: null,
    nombreCanal: null,
    rutaCrear: 'f209192077b7a958de0e8dd5641956e5',
    enviar: function(e) {
        sendForm(e, () => {
            ModalEdit(0);
            ListarGruposCanal_View_operativo(Grupos.idCanal)
        })
    },
    estado: function (idGrupo) {
        printDataAjax('83ae822d145224e43c0f63e502adfb52', {Hash:idGrupo}, data => {
            alertify.notify(data.mensaje, 'success', 5, function () {
                
            });
        })
    }
}

function modalGrupos(idCanal, nombreCanal) {
    Grupos.idCanal = idCanal;
    Grupos.nombreCanal = nombreCanal
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>"+nombreCanal+" - Grupos</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0)' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' onclick='ModalEdit(0)'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'BarraIconos'>"
            html += "<img src ='images/datos_additem.png' class = 'OptionIcon'onclick = 'ModalEdit(0); ModalEdit2(1); crearTraGrupo()' data-toggle='modal' data-target='#ModalEdit2'/>"
            html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'ModalEdit(0); ModalEdit2(1); crearTraGrupo()' data-toggle='modal' data-target='#ModalEdit2'>Crear Grupo</span>"
        html += "</div>"
        html += "<div class = 'form-row'>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='TAG_Estado'>Estado:</label>"
                html += "<select class ='form-control' name = 'TAG_Estado' id = 'TAG_Estado'>"
                html += "<option value = '-1' >Todos</option>"
                html += "<option value = '1' selected>Activos</option>"
                html += "<option value = '0' >Inactivos</option>"
                html += "</select>"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<label for='TAG_TextBusqueda'>Buscar:</label>"
                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'TAG_TextBusqueda' name = 'TAG_TextBusqueda' />"
            html += "</div>"
            html += "<div class='col col-sm-3 my-2'>"
                html += "<p></p>"
                html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'buscarTableGrupos()'/>"
            html += "</div>"
        html += "</div>"
        html += "<div class='lista' id=''>"
            html += "<table class='dataTable tableNew' id = 'listaGrupos'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Estado</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "<table/>"
        html += "</div>"
    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1)'>Cerrar</button>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ModalEdit(1);
    tableTraGrupos();
}

function buscarTableGrupos() {
    $DataTable_Grupos.destroy();
    $DataTable_Grupos.draw();
    tableTraGrupos();
}

function tableTraGrupos() {
    $DataTable_Grupos = $('#listaGrupos').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax' : {
            'url':'5db15db172ea2573c2f1b4aa82eec547',
            'data':function (d) {
                d.search['HashCP'] = Grupos.idCanal;
                d.search['Estado'] = $('#TAG_Estado').val();
                d.search['value'] = $('#TAG_TextBusqueda').val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns' : [
            {
                data: 'Num',
                orderable: false,
                searchable: false,
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Nombre',
                render: function (data, type, full, meta) {
                    return '<span>'+data+'</span>';
                }
            },
            {
                data: 'Estado',
                render: function (data, type, full, meta) {
                    let hx = '';
                    if (!full.TRA_GRUPO_DEFAULT) {
                        hx += '<span onclick = "Grupos.estado(\''+full.Hash+'\')">'
                        if (data === 1) {
                            hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                        } else {
                            hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                        }
                    }
                    return '<center><span>'+hx+'</span></center>';
                }
            }
        ],
        order: [[1, "asc"]],
        language: {
            url: "js/dataTable/Spanish.lang"
        },
    })
    $('#listaGrupos').css({'width':'100%'})
}

function crearTraGrupo(Hash) {
    SaveDataItemsTA(Hash)
    setTimeout(function(){
        Grupos.idCanal = Hash;
        var html = "";
    

        TituloVentana = "Crear Nuevo Grupo"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<form class='form-signin' onsubmit='Grupos.enviar(event)' action='"+Grupos.rutaCrear+"' method='post'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='HashCP' value='" + Grupos.idCanal + "'>";

            html += "<div class='form-group row'>";
                html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre del Grupo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";

            html += "<div class='modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0); ModalEdit(1)' data-dismiss='modal'>Cerrar</button>";
                html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
            html += "</div>";
        html += "</form>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm1").removeClass('modal-lg').addClass('modal-xl');
    }, 1000);
    
}
//---------------------------------------------------------------------------//
//------------------------------ Actividades -------------------------------//
//-------------------------------------------------------------------------//
const Actividades = {
    idCanal: null,
    nombreCanal: null,
    idGrupo: null,
    nombreGrupo: null,
    rutaCrear: 'f1d396554e80d9189c1fc3f764dab7d6',
    enviar: function (e) {
        for (let i = 0; i < this.contactosForm.total; i++) {
            const contacto = {
                nombre: $('#traActContactoNombre'+i).val(),
                email: $('#traActContactoEmail'+i).val(),
                cargo: $('#traActContactoCargo'+i).val(),
                telefono: $('#traActContactoTelefono'+i).val(),
                celular: $('#traActContactoCelular'+i).val(),
            }
            this.contactosForm.contactos.push(contacto)
        }
        sendForm(e, () => {
            ModalEdit(0);
            buscarTableActividades();
            this.contactosForm.contactos = []
            this.contactosForm.contactos = []
        }, {traContactos: JSON.stringify(this.contactosForm.contactos)})
    },
    finalizar: function (idActividad) {
        printDataAjax('b168ba6541e9731b395a1448ea4b68c7', {Hash: idActividad}, data => {
            buscarTableActividades();
            ModalEdit(0)
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    },
    listaResponsables: function () {
        printDataAjax('87e0029edddca207e3700c06d270f701', {}, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosR" onchange="Actividades.checkTodos(event, \'tarea-responsables\')">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.responsables.forEach(element => {
                html += '<div class="form-check">'
                    html += '<input class="form-check-input tarea-responsables" name="traHashResp[]" type="checkbox" value="'+element.Hash+'">'
                    html += '<label class="form-check-label" for="traHashResp[]">'+element.Nombre+'</label>'
                html += '</div>'
            });
            $('#traHashResp').html(html)
        })
    },
    listaPara: function () {
        printDataAjax('87e0029edddca207e3700c06d270f701', {}, data => {
            console.log(data);
            html = '<div class="form-check">'
                html += '<input class="form-check-input" type="checkbox" id="checkTodosP" onchange="Actividades.checkTodos(event, \'tarea-para\')">'
                html += '<label class="form-check-label" >'
                    html += 'Sel. Todo'
                html += '</label>'
            html += '</div>'
            html += '<hr>'
            data.responsables.forEach(element => {
                html += '<div class="form-check">'
                    html += '<input class="form-check-input tarea-para" name="traHashPara[]" type="checkbox" value="'+element.Hash+'">'
                    html += '<label class="form-check-label" for="traHashPara[]">'+element.Nombre+'</label>'
                html += '</div>'
            });
            $('#traHashPara').html(html)
        })
    },
    contactosForm: {
        total: 0,
        contactos: []
    },
    crearContacto: function () {
        html = "<div class='form-row'>"
            html += "<div class='form-group col-md-4'>";
                html += "<label for='traActContactoNombre"+this.contactosForm.total+"' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<input type='text' id='traActContactoNombre"+this.contactosForm.total+"' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' required>"
            html += "</div>";
            html += "<div class='form-group col-md-5'>";
                html += "<label for='traActContactoEmail"+this.contactosForm.total+"' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Email:</label>";
                html += "<input type='email' id='traActContactoEmail"+this.contactosForm.total+"' class='form-control' placeholder='Proyecto XYZ' required>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='traActContactoCargo"+this.contactosForm.total+"' class='col-form-label'>Cargo:</label>";
                html += "<input type='text' id='traActContactoCargo"+this.contactosForm.total+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='traActContactoTelefono"+this.contactosForm.total+"' class='col-form-label'>Telefono:</label>";
                html += "<input type='text' id='traActContactoTelefono"+this.contactosForm.total+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='traActContactoCelular"+this.contactosForm.total+"' class='col-form-label'>Celular:</label>";
                html += "<input type='text' id='traActContactoCelular"+this.contactosForm.total+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
        html += "</div>";
        html += "<hr>"
        $('#traContactos').append(html);
        this.contactosForm.total++
    },
    checkTodos: function (e, indicador) {
        const selected = e.target.checked
        let selcs = document.querySelectorAll('.'+indicador)
        selcs.forEach(sel => {
            sel.checked = selected
        });
    }
}

function initActividades(idCanal) {
    let canalSelected = $('#_ContentTAC_'+idCanal)[0].checked;
    let grupoSelected = $('#_ContentGruposC_'+idCanal).val();
    if (canalSelected && grupoSelected !== '') {
        Actividades.idCanal = idCanal
        Actividades.nombreCanal = $('#_Content_TACNombre_'+idCanal).text()
        Actividades.idGrupo = grupoSelected.split('-')[0]
        Actividades.nombreGrupo = grupoSelected.split('-')[1]
        $('#ActividadCPGrupo').addClass('animate__backInDown')
        $('#TitleActividadCPGrupo').text('Canal '+Actividades.nombreCanal+' - Grupo '+Actividades.nombreGrupo)
        $('#ActividadCPGrupo').removeClass('d-none')
        buscarTableActividades()
        // Tarea.listSearchEstado()
    }
}

let actividad = document.getElementById('ActividadCPGrupo')
actividad.addEventListener('animationend', function (params) {
    $('#ActividadCPGrupo').removeClass('animate__backInDown')
})

function buscarTableActividades() {
    $DataTable_Actividades.destroy();
    $DataTable_Actividades.draw();
    tableTraActividades()
}

function tableTraActividades() {
    $DataTable_Actividades = $('#TablaActividadesCPG').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax' : {
            'url':'d87987d135b74fd157c51d6b7c35cb10',
            'data':function (d) {
                d.search['HashG'] = Actividades.idGrupo;
                d.search['Estado'] = $('#TAA_Estado').val();
                d.search['value'] = $('#TAA_TextBusqueda').val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns' : [
            {
                data: 'Num',
                render: function (data, type, full, meta) {
                    return '<center> <span class="_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalActividadCPGrupo(\''+full.Hash+'\', \''+full.Tarea+'\')">'+data+'</span> </center>';
                }
            },
            {
                data: 'Tarea',
                render: function (data, type, full, meta) {
                    return '<span>'+data+'</span>';
                }
            },
            {
                data: 'NoResponsables',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'NoPara',
                render: function (data, type, full, meta) {
                    return '<center> <span>'+data+'</span> </center>';
                }
            },
            {
                data: 'NoContactos',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span><center>';
                }
            },
            {
                data: 'Creador',
                render: function (data, type, full, meta) {
                    return '<span>'+data+'</span>';
                }
            },
            {
                data: 'FechaCreacion',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'HoraCreacion',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'FechaEntrega',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'HoraEntrega',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Estado',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            }
        ],
        order: [[0, "asc"]],
        language: {
            url: "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaActividadesCPG').css({'width':'100%'})
}

function crearActividadCPGrupo() {
    var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Crear Actividad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit(0); Actividades.contactosForm.total=0; Actividades.contactosForm.contactos=[];' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0); Actividades.contactosForm.total=0; Actividades.contactosForm.contactos=[];' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Actividades.enviar(event)' action='"+Actividades.rutaCrear+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='traHashGrupo' value='" + Actividades.idGrupo + "'>";

        html += "<div class='form-group'>";
            html += "<label for='traTarea' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
            html += "<input type='text' name='traTarea' id='traTarea' class='form-control' autocomplete = 'off' placeholder='Actividad XYZ'>"
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='traStatus'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='traStatus' rows='3'></textarea>"
        html += "</div>";

        html += "<div class='form-row flex'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='traHashResp' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsables:</label>";
                html += "<div id='traHashResp' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em'>";
                    // html += '<div class="form-check">'
                    //     html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
                    //     html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
                    // html += '</div>'
                html += "</div>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='traHashPara' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
                html += "<div id='traHashPara' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em'>";
                    // html += '<div class="form-check">'
                    //     html += '<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">'
                    //     html += '<label class="form-check-label" for="inlineCheckbox1">texto</label>'
                    // html += '</div>'
                html += "</div>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='traFechaEntrega' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha de Entrega:</label>";
                html += "<input type='date' name='traFechaEntrega' id='traFechaEntrega' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' >"
            html += "</div>";
            html += "<div class='form-group col-md-6'>";
                html += "<label for='traHoraEntrega' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora de Entrega:</label>";
                html += "<input type='time' name='traHoraEntrega' id='traHoraEntrega' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
        html += "</div>";
        /*
        html += "<div class='separator my-1 py-1'>Contactos</div>"

        html += "<div class='form-row flex'>"
            html += "<div class='form-group col-md-12'>";
                html += "<label for='traContactos' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Contactos:</label>";
                html += "<div id='traContactos' class='shadow p-3 mb-5 bg-white rounded border-right'>";
                    //html += "<button type='button' class='btn btn-info' onclick='Actividades.crearContacto()'>Agregar Contacto</button>";
                    html += "<hr>"

                html += "</div>";
            html += "</div>";
        html += "</div>"
        */
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit(0);' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    Actividades.listaResponsables()
    Actividades.listaPara()
}

function modalActividadCPGrupo(idActividad, NombreActividad) {
    printDataAjax('eb366d8773473552996a90494502c216', {Hash: idActividad}, data => {

        let idActividad = data.actividad.Hash;
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Actividad "+NombreActividad+"</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'EventosCierreModal();'>";
                            html += "<img src = 'images/cerrar_blank.png' class = 'IconClose' onclick = 'EventosCierreModal();'/>";
                        html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class='pestanas'>";
                html += "<ul class = 'TabsMenu'>";

                    html += "<li onclick = 'MostrarTabsMenu(1);' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                        html += "<img src = '"+UrlUniversal+"images/departamentos.png' class = 'IconVentana'>"
                        html += "<span>Actividad</span>"
                    html +="</li>";

                    html += "<li onclick = 'MostrarTabsMenu(2); buscarTableContactos()' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                        html += "<img src = '"+UrlUniversal+"images/departamentos.png' class = 'IconVentana'>"
                        html += "<span>Contactos</span>"
                    html +="</li>";

                    html += "<li onclick = 'MostrarTabsMenu(3); modalStatus(\""+idActividad+"\")' class = 'TabsMenu_Tabs TabsMenu_Tabs3'>"
                        html += "<img src = '"+UrlUniversal+"images/departamentos.png' class = 'IconVentana'>"
                        html += "<span>Descripciones</span>"
                    html +="</li>";
                html += "</ul>";

                html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<input type='hidden' name='traHashGrupo' value='" + Actividades.idGrupo + "'>";
                    html += "<input type='hidden' name='traHash' value='" + idActividad + "'>";

                    html += "<div class='form-group'>";
                        html += "<label for='traTarea' class='col-form-label'> Asunto:</label>";
                        html += "<input type='text' name='traTarea' value='"+data.actividad.Tarea+"' id='traTarea' class='form-control' placeholder='Actividad XYZ' readonly>"
                    html += "</div>";

                    html += "<div class='form-group'>";
                        html += "<label for='traStatus'> Descripción:</label>";
                        html += "<textarea class='form-control' name='traStatus' rows='3' disabled>"+data.actividad.Status+"</textarea>"
                    html += "</div>";

                    html += "<div class='form-row flex'>"
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traHashResp' class='col-form-label'> Responsables:</label>";
                            html += "<div id='traHashResp' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em'>";
                                html += "<ul class='list-group list-group-flush'></ul>"
                                data.actividad.Responsables.forEach(e => {
                                html += "<li class='list-group-item'>"+e.Responsable+"</li>"
                                });
                                html += "<ul class='list-group list-group-flush'></ul>"
                            html += "</div>";
                        html += "</div>";

                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traHashPara' class='col-form-label'> Entrega Para:</label>";
                            html += "<div id='traHashPara' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em'>";
                                html += "<ul class='list-group list-group-flush'></ul>"
                                data.actividad.EntregaPara.forEach(e => {
                                html += "<li class='list-group-item'>"+e.Para+"</li>"
                                });
                                html += "<ul class='list-group list-group-flush'></ul>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-row'>"
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traFechaCreacion' class='col-form-label'> Fecha de Creación:</label>";
                            html += "<input type='date' name='traFechaEntrega' id='traFechaEntrega' value='"+data.actividad.FechaCreacion+"' class='form-control' readonly>"
                        html += "</div>";
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traHoraEntrega' class='col-form-label'> Hora de Entrega:</label>";
                            html += "<input type='time' name='traHoraEntrega' id='traHoraEntrega' value='"+data.actividad.HoraCreacion+"' class='form-control' readonly>"
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-row'>"
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traFechaEntrega' class='col-form-label'> Fecha de Entrega:</label>";
                            html += "<input type='date' name='traFechaEntrega' id='traFechaEntrega' value='"+data.actividad.FechaEntrega+"' class='form-control' readonly>"
                        html += "</div>";
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='traHoraEntrega' class='col-form-label'> Hora de Entrega:</label>";
                            html += "<input type='time' name='traHoraEntrega' id='traHoraEntrega' value='"+data.actividad.HoraEntrega+"' class='form-control' readonly>"
                        html += "</div>";
                    html += "</div>";
                    if( data.TRA_ACTIVIDAD_PENDIENTE){
                        html += "<div class='modal-footer my-3'>";
                            html += "<button class='btn btn-info' onclick='Actividades.finalizar(\""+idActividad+"\")'>Finalizar</button>";
                        html += "</div>";
                    }
                html += "</div>";

                html += "<div class = 'ChildTabsMenu TabsMenu2'>";
                    html += "<div class = 'table'>";
                        html += "<table>";
                            html += "<tr>"
                            html += "<td class = 'BotonesSuperiores'>"
                            if( data.TRA_ACTIVIDAD_PENDIENTE){
                                html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'crearTraContacto(\""+idActividad+"\"); ModalEdit(0)' data-toggle='modal' data-target='#ModalEdit2'/>";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraContacto(\""+idActividad+"\"); ModalEdit(0)' data-toggle='modal' data-target='#ModalEdit2'>Agregar Contacto</span>";
                            }
                            html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'crearTraContacto(\""+idActividad+"\"); ModalEdit(0)' data-toggle='modal' data-target='#ModalEdit2'/>";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'crearTraContacto(\""+idActividad+"\"); ModalEdit(0)' data-toggle='modal' data-target='#ModalEdit2'>Agregar Contacto</span>";
                            html += "</td>"
                            html += "</tr>"
                        html += "</table>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<label for='contactoText'>Texto:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'contactoText' name = 'contactoText' />"
                        html += "</div>"
                        html += "<div class='col col-sm-3 my-2'>"
                            html += "<p></p>"
                            html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'buscarTableContactos()'/>"
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'ContenedorDataTable'><table class='tableNew dataTable ContactosActividad' id = 'ContactosActividad'>";
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Nombre</th>"
                                html += "<th>Email</th>"
                                html += "<th>Cargo</th>"
                                html += "<th>Telefono</th>"
                                html += "<th>Celular</th>"
                                html += "<th>Remover</th>"
                            html += "</tr>"
                        html += "</thead>"
                    html += "</table></div>";
                html += "</div>";

                html += "<div class = 'ChildTabsMenu TabsMenu3'>";
                if( data.TRA_ACTIVIDAD_PENDIENTE){
                    html += "<i class='fas fa-plus-circle fa-2x cursor my-3' onclick='editarStatusActividad(\""+idActividad+"\")'></i>"
                    html += "<div class='d-none' id='FormStatusActividad'>"
                    html += "</div>"
                }
                html += "<i class='fas fa-plus-circle fa-2x cursor my-3' onclick='editarStatusActividad(\""+idActividad+"\")'></i>"
                    html += "<div class='d-none' id='FormStatusActividad'>"
                    html += "</div>"
                    html += "<table class='table table-striped'>"
                        html += "<thead>"
                            html += "<tr>"
                            html += "<th scope='col'>Ultima Modificacion</th>"
                            html += "<th scope='col'>Status Descripcion</th>"
                            html += "</tr>"
                        html += "</thead>"
                        html += "<tbody id='recordsStatusActividad'>"
                        html += "</tbody>"
                    html += "</table>"
                html += "</div>";

            html += "</div>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        ModalEdit(1);
        MostrarTabsMenu(1);
        tableTraContactos();
        Contactos.idActividad = idActividad;
    })

}
//---------------------------------------------------------------------------//
//------------------------- Contactos Actividad ----------------------------//
//-------------------------------------------------------------------------//

const Contactos = {
    idActividad: null,
    rutaCrear: '26a84e78af9544ead650cf8a8391a8f9',
    enviar: function(e) {
        sendForm(e, () => {
            buscarTableContactos();
            buscarTableActividades();
            ModalEdit2(0)
            ModalEdit(1)
        })
    },
    eliminar: function (id) {
        buscarTableContactos();
        buscarTableActividades();
        printDataAjax('2ab8fbdd4580dd2a1370c8b3e5f06875', {Hash:id}, data => {
            alertify.notify(data.mensaje, 'success', 5, function () {
                console.log('dismissed');
            });
        })
    }
}

function buscarTableContactos() {
    $DataTable_Contactos.destroy()
    $DataTable_Contactos.draw()
    tableTraContactos()
}

function tableTraContactos() {
    $DataTable_Contactos = $('#ContactosActividad').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax' : {
            'url':'0f721ff9ffe55717d945ead5fc6490b7',
            'data':function (d) {
                d.search['HashA'] = Actividades.idGrupo;
                d.search['value'] = $('#contactoText').val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns' : [
            {
                data: 'Num',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Nombre',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Email',
                render: function (data, type, full, meta) {
                    return '<center><span>'+data+'</span></center>';
                }
            },
            {
                data: 'Cargo',
                render: function (data, type, full, meta) {
                    return '<center><span>'+(data === '' || data === null ? '---':data)+'</span></center>';
                }
            },
            {
                data: 'Telefono',
                render: function (data, type, full, meta) {
                    return '<center><span>'+(data === '' || data === null ? '---':data)+'</span></center>';
                }
            },
            {
                data: 'Celular',
                render: function (data, type, full, meta) {
                    return '<center><span>'+(data === '' || data === null ? '---':data)+'</span></center>';
                }
            },
            {
                data: 'Hash',
                render: function (data, type, full, meta) {
                        let hx = '<span onclick = "Contactos.eliminar(\''+full.Hash+'\')">'
                            hx += '<img src ="images/datos_eliminar.png" class = "OptionIcon" />';
                        hx += '</span>'
                    return '<center>'+hx+'</center>';
                }
            }
        ],
        order: [[2, "asc"]],
        language: {
            url: "js/dataTable/Spanish.lang"
        },
    })
    $('#ContactosActividad').css({'width':'100%'})

}

function crearTraContacto(idActividad) {
var html = "";
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Crear Nuevo Responsable</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' onclick='ModalEdit2(0); ModalEdit(1)' aria-label='Close'>";
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' onclick='ModalEdit2(0); ModalEdit(1)' class = 'IconClose' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' onsubmit='Contactos.enviar(event)' action='"+Contactos.rutaCrear+"' method='post'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
        html += "<input type='hidden' name='traHashActividad' value='" + idActividad + "'>";

        html += "<div class='form-group row'>";
            html += "<label for='traNombre' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traNombre' name='traNombre' placeholder='Nombre Responsable' autocomplete = 'off' required/>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traEmail' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Email:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='email' class='form-control' id='traEmail' name='traEmail' placeholder='example@domine.com' autocomplete = 'off' required/>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traCargo' class='col-sm-4 col-form-label'> Cargo:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traCargo' name='traCargo' autocomplete = 'off'/>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traTelefono' class='col-sm-4 col-form-label'> Telefono:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traTelefono' name='traTelefono' autocomplete = 'off'/>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group row'>";
            html += "<label for='traCelular' class='col-sm-4 col-form-label'> Celular:</label>";
            html += "<div class='col-sm-8'>";
                html += "<input type='text' class='form-control' id='traCelular' name='traCelular' autocomplete = 'off'/>";
            html += "</div>";
        html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' onclick='ModalEdit2(0); ModalEdit(1)' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    ModalEdit2(1);
}

//---------------------------------------------------------------------------//
//--------------------------- Status Actividad -----------------------------//
//-------------------------------------------------------------------------//

const Status = {
    rutaCrear: '4f6625579552fdae8d4a085f4bcf42b0',
    enviar: function(e) {
        e.preventDefault()
        sendForm(e, () => {
            modalStatus();
            ModalEdit(1);
            $('#FormStatusActividad').addClass('d-none')
        })
    }
}

function modalStatus(idActividad) {
    printDataAjax('a9c3a24dfcf3ed2e234ef63de5aadd76', {Hash: idActividad}, data => {
        let html = '';
        data.Status.forEach(e => {
            html += "<tr>"
            html += "<th scope='row'>"+e.FechaHora+"</th>"
            html += "<td>"+e.Status+"</td>"
            html += "</tr>"
        })
        $('#recordsStatusActividad').html(html);
    })
}

function editarStatusActividad(idActividad) {
    html = "<form action='"+Status.rutaCrear+"' onsubmit='Status.enviar(event)'>"
        html += "<input type='hidden' name='Hash' value='" + idActividad + "'>";
        html += "<div class='form-group'>";
            html += "<label for='traStatus'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' name='traStatus' rows='3'></textarea>"
        html += "</div>";
        html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
    html += "</form>";
    $('#FormStatusActividad').html(html);
    $('#FormStatusActividad').removeClass('d-none')
}
