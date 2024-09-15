/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var NotificadosMensajes = [];
var Temp_Msj_Copiados = [];
var __GOLSAjax = "";
function ValidadorEmail(email){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if( caract.test(email) == false ) {

        return false;
    }else{
        return true;
    }
}



function sendForm(e, callbackSuccess, dataExtra=null) {
    e.preventDefault()

    let formdata = new FormData(e.target)
    if (dataExtra !== null) {
        for (const key in dataExtra) {
            if (Object.hasOwnProperty.call(dataExtra, key)) {
                if (Array.isArray(dataExtra[key])) {
                    dataExtra[key].forEach(element => {
                        formdata.append(key+'[]', element)
                    });
                } else {
                    formdata.append(key, dataExtra[key])
                }
            }
        }
    }
    $.ajax({
        type:'POST',
        url:e.target.action,
        processData: false,
        contentType: false,
        cache: false,
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
        },
        data: formdata,
        success:function(data){
            if (data.success) {
                __GOLSAjax = data.OT
                $('#ModalEdit').modal('hide')
                $('#ModalEdit2').modal('hide')
                $('#ModalEdit3').modal('hide')
                $('#MyModal').modal('hide')
                callbackSuccess()
                alert(data.mensaje);
                alertify.notify(data.mensaje, 'success', 5, function () {
                    console.log('dismissed');
                });
            } else {
                console.log('Entrar aqui');
                alertify.notify(data.mensaje, 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }
    })
}

function imgError(image) {
    image.onerror = "";
    image.src = UrlUniversal+"images/foto.png";
    return true;
}


function printDataAjax(route, data, callbackSuccess, callbackError = null) {
    data = typeof data === 'string' ? JSON.parse(data) : data;
    $.ajax({
        type:'POST',
        url: route,
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
        },
        data: data,
        success:function(data){
            if (data.success) {
                callbackSuccess(data)
            } else {
                if (callbackError !== null) {
                    callbackError(data)
                }
                alertify.notify(data.mensaje, 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }
    })
}

function AlertaMensajes(Mensaje,tipo,time){
    /*
     * success:Verde
     * error: Rojo
     */
    alertify.notify(Mensaje, tipo, time, function () {
        //console.log('dismissed');
    });
}


function CalendarioActividades(){
    var url = UrlGeneral+'e4d03442bf58c59f6505d2b8f14fe406';
    var html = "";
    TituloVentana = "Calendario"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
    
    html += "<div class='modal-body'>";
    html += "<iframe width = '100%;' height = '600px'src=" + url + "></iframe>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function HorasHombreEmpleado(){
    var url = UrlGeneral+'d6e0840c386bc44bcb119cd77dd31ff4';
    var html = "";
    TituloVentana = "Horas Hombre"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
    
    html += "<div class='modal-body'>";
    html += "<iframe width = '100%;' height = '600px'src=" + url + "></iframe>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function OcultarMenuUsuario(){
    console.log("Ingresa como "+VisualPpto);
    if( VisualPpto == 1 ){
        $(".vl").remove()
        $(".ContentPanel").css({
            'left':10,
            'top':80
        })

        $(".ContentPanel").css({
            'width':$("body").width()-10
        })

        $("body").scrollTop();
    }
}

function FormNovedades(){
    var html = ""
        
        TituloVentana = "Enviar Mensaje"
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "myModal(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Asunto:</label>";
                    html += "<input type = 'text' name = 'Mgs_Asunto' autocomplete = 'off' id = 'Mgs_Asunto' class = 'form-control' />";
                html += "</div>";
            html += "</div>";
            html += "<div class='form-row'>"
                html += "<textarea class = 'form-control' id = 'observaciones' name = 'observaciones' style = 'display:none;'></textarea>"
                    html += "<div class='grid-container'>"
                        html += "<div class='grid-width-100 EditorX'>"
                            html += "<div class='editor' id = 'Editor' name = 'observaciones_g'>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>"
            html += "</div>"
            html += "<br>"
            html += "<br>"
            html += "<div class = 'form-row'>";
            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Notificar a:</label>";
                html += "<input type = 'text' class = 'form-control' name = 'Mgs_Copiado' id = 'Mgs_Copiado' onkeyup = 'ListPersonalAgencia()'/>"
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<div class = 'TempCopiados' style = 'width:100%;'></div>";
                    html += "<div class = 'Copiados' style = 'width:100%;'></div>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendMailMasivo()'>Enviar</button>";
        html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ResizeModal(1)
    initSample()
    CKEDITOR.replace('editor1', {
      height: 150
    });
    /*$('#Editor').summernote({

        placeholder: 'Description',

        tabsize: 2,

        height: 250

      });*/
}

function ListPersonalAgencia(){
    if( $("#Mgs_Copiado").val().length > 2 ){
        $.ajax({
            type:'POST',
            url:'3115db3fb13ad9db964287eed6b9cd37',
            data:{Hash:$("#Mgs_Copiado").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                Temp_Msj_Copiados = [];
                Temp_Msj_Copiados = data.Personas;
                var html = "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th>Sel</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < Temp_Msj_Copiados.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"
                                html += "<input type='radio' name='PAsigAgen' value='"+Temp_Msj_Copiados[i]['IdUsuario']+"' id='PAsigAgen"+Temp_Msj_Copiados[i]['IdUsuario']+"' onclick = 'AddMsj("+Temp_Msj_Copiados[i]['IdUsuario']+","+i+")'>"
                            html += "</td>"
                            html += "<td>"+Temp_Msj_Copiados[i]['NombreUsuario']+"</td>"
                            html += "<td>"+Temp_Msj_Copiados[i]['Correo']+"</td>"
                        html += "</tr>"
                    }
                    if( Temp_Msj_Copiados.length == 0 ){
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

function AddMsj(Hash,T){
    $("#Mgs_Copiado").val("")
    NotificadosMensajes.push({
        'Tipo': Temp_Msj_Copiados[T]['Tipo'],
        'Nombre': Temp_Msj_Copiados[T]['NombreUsuario'],
        'IdU':Temp_Msj_Copiados[T]['IdUsuario'],
    })
    $(".TempCopiados").html("")
    ListarNotificadosMsj()
}

function ListarNotificadosMsj(){
    var html = "";
    html += "<table class = 'tableNew'>"
        html += "<tr>"
            html += "<th>No</th>"
            html += "<th>Nombre</th>"
            html += "<th>Eliminar</th>"
        html += "</tr>"
        for(var i = 0; i < NotificadosMensajes.length;i++){
            html += "<tr>"
                html += "<td class = 'CenterText'>"+(i+1)+"</td>";
                html += "<td >"+NotificadosMensajes[i]['Nombre']+"</td>";
                html += "<td class = 'CenterText'>"
                    html += "<img src = 'images/eliminar.png' class = 'OptionIcon' onclick = 'DelNotificadosMsj("+i+")'/>"
                html += "</td>";
            html += "</tr>"
        }
    html += "</table>"
    $(".Copiados").html(html)
}

function DelNotificadosMsj(i){
    NotificadosMensajes.splice(i,1);
    ListarNotificadosMsj()
}

function SendMailMasivo(){
    var Text = CKEDITOR.instances["Editor"].getData();//$(".note-editable").html()//
    if( $("#Mgs_Asunto").val().length > 3 && Text != '' && NotificadosMensajes.length > 0 ){
        var formData = new FormData();
        formData.append("Asunto",$("#Mgs_Asunto").val());
        formData.append("Mensaje", Text );
        
        formData.append("NotificadosMensajes", JSON.stringify(NotificadosMensajes));
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'0b920f3657da85034c8bd5e7596bb322',
            success:function(data){
                if( data.Info == 1 ){
                    alert("Mensaje Enviado con Éxito");
                    NotificadosMensajes = [];
                    Temp_Msj_Copiados = [];
                    ModalEdit(0);
                }else{
                    alert("No se logró enviar el mensaje, intente de nuevo");
                }
            }
        })
    }else{
        alert("Debe diligenciar los campos Obligatorios");
    }
}

function FormMisNotificaciones(){
    var html = ""

        TituloVentana = "Mis Notificaciones"
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class='pestanas'>";
                html += "<ul class = 'TabsMenu'>";
                    html += "<li onclick = 'MostrarTabsMenu(1);' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                        html += "<img src = '"+UrlUniversal+"images/Documentos.png' class = 'IconVentana'>"
                        html += "<span>Propias</span>"
                    html +="</li>";
                    html += "<li onclick = 'MostrarTabsMenu(2);' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                        html += "<img src = '"+UrlUniversal+"images/Tributario.png' class = 'IconVentana'>"
                        html += "<span>De Otros</span>"
                    html +="</li>";
                html += "</ul>";
            html += "</div>"
            html += "<div class = 'ChildTabsMenu TabsMenu1' >";    
                html += "<div class = 'ContenedorOptionDiv'>"
                    html += "<div class = 'form-row'>"
                        html +="<div class='col col-sm-3 my-2'>"
                            html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
                            html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'Mis_TextBusqueda' name = 'Mis_TextBusqueda' />"
                        html +="</div>"
                        html +="<div class='col col-sm-3 my-2'>"
                            html +="<p></p>"
                            html +="<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'Mensajeria_BuscarTablaMisNotificaciones()'/>"
                        html +="</div>"
                    html +="</div>"
                    html +="<div style='overflow: auto; white-space: nowrap;'>"
                        html +="<table class='dataTable tableNew' id = 'TablaMisNotificaciones'>"
                            html +="<thead>"
                                html +="<tr>"
                                    html +="<th>No.</th>"
                                    html +="<th>Asunto</th>"
                                    html +="<th>Fecha</th>"
                                    html +="<th>Hora</th>"
                                    html +="<th>Estado</th>"
                                    html +="<th>Detalle</th>"
                                    html +="<th>Copiados</th>"
                                html +="</tr>"
                            html +="</thead>"
                        html +="</table>"
                    html +="</div>"
                html +="</div>"
            html += "</div>"
            
            html += "<div class = 'ChildTabsMenu TabsMenu2' >";    
                html += "<div class = 'ContenedorOptionDiv'>"
                    html += "<div class = 'form-row'>"
                        html +="<div class='col col-sm-3 my-2'>"
                            html +="<label for='OTC_TextBusqueda'>Buscar:</label>"
                            html +="<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'Otros_TextBusqueda' name = 'Otros_TextBusqueda' />"
                        html +="</div>"
                        html +="<div class='col col-sm-3 my-2'>"
                            html +="<p></p>"
                            html +="<img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'Mensajeria_BuscarTablaOtrasNotificaciones()'/>"
                        html +="</div>"
                    html +="</div>"
                    html +="<div style='overflow: auto; white-space: nowrap;'>"
                        html +="<table class='dataTable tableNew' id = 'TablaNotificacionesOtros'>"
                            html +="<thead>"
                                html +="<tr>"
                                    html +="<th>No.</th>"
                                    html +="<th>Asunto</th>"
                                    html +="<th>Generado Por</th>"
                                    html +="<th>Fecha</th>"
                                    html +="<th>Hora</th>"
                                    html +="<th>Estado</th>"
                                    html +="<th>Detalle</th>"
                                    html +="<th>Copiados</th>"
                                html +="</tr>"
                            html +="</thead>"
                        html +="</table>"
                    html +="</div>"
                html +="</div>"
            html += "</div>"
        html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ResizeModal(1)
    MostrarTabsMenu(1);
    Mensajeria_TablaMisNotificaciones();
    Mensajeria_TablaOtrasNotificaciones();
}

function Mensajeria_BuscarTablaMisNotificaciones(){
    $DataTable_MisNotificaciones.destroy();
    //$DataTable_TarePendientes.draw();
    Mensajeria_TablaMisNotificaciones();
}

function Mensajeria_TablaMisNotificaciones(){
    $DataTable_MisNotificaciones = $('#TablaMisNotificaciones').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'81af62f0c3c489338a4e1e7c0b990d16',
            'data':function (d) {
                d.search['value'] = $("#Mis_TextBusqueda").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Num',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {
                data: 'Asunto',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'Fecha',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'Hora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return  data ;
                }

            },
            {
                data: 'Descripcion',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

                },
            {
                data: 'Copiados',
                "render": function (data, type, full, meta) {
                    var ht = '<ul>'
                    for(var i = 0; i < data.length; i++){
                        ht += '<li>'+data[i]['NombreUsuario']+'</li>'
                    }
                    ht += '</ul>'
                    return ht;
                }

            },
            
        ],
        "order": [[2, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaMisNotificaciones').css({'width':'100%'})
}

function Mensajeria_BuscarTablaOtrasNotificaciones(){
    $DataTable_OtrosNotificaciones.destroy();
    //$DataTable_TarePendientes.draw();
    Mensajeria_TablaOtrasNotificaciones();
}

function Mensajeria_TablaOtrasNotificaciones(){
    $DataTable_OtrosNotificaciones = $('#TablaNotificacionesOtros').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'913cf59b328d6e11cc853411dc4a01f0',
            'data':function (d) {
                d.search['value'] = $("#Otros_TextBusqueda").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Num',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {
                data: 'Asunto',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'GeneradoPor',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
           {
                data: 'Fecha',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
            },
           {
               data: 'Hora',
               "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return  data ;
                }

            },
            {
                data: 'Descripcion',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

                },
            {
                data: 'Copiados',
                "render": function (data, type, full, meta) {
                    var ht = '<ul>'
                    for(var i = 0; i < data.length; i++){
                        ht += '<li>'+data[i]['NombreUsuario']+'</li>'
                    }
                    ht += '</ul>'
                    return ht;
                }

            },
            
        ],
        "order": [[2, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaNotificacionesOtros').css({'width':'100%'})
}