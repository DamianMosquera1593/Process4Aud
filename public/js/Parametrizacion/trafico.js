/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("TipoBrief")
    ContentList("TipoTarea")
    ContentList("FormatoBrief")
    
    TablaTrafico_TB();
    TablaTrafico_TT();
});

function BuscarTablaTrafico_TB(){
    $DataTable_Trafico_TB.destroy();
    $DataTable_Trafico_TB.draw();
    TablaTrafico_TB();
}

function BuscarTablaTrafico_TT(){
    $DataTable_Trafico_TT.destroy();
    $DataTable_Trafico_TT.draw();
    TablaTrafico_TT();
}



function TablaTrafico_TB(){
    $DataTable_Trafico_TB = $('#TablaTrafico_TB').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'3e544397b71650bda6c0a0e08536bb98',
            'data':function (d) {
                    d.search['value'] = $("#TB_TextBusqueda").val();
                    d.search['Estadox'] = $("#TB_Estado").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value  
                    });
                }
        },

        'columns': [

           { 
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {    
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTTBN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_TRAFICO_TIPOS_BRIEF_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoBrief(\''+full.Hash+'\',\''+UrlUniversal + '72b9c3f36fb72ecc941ab8cc89b54141'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoBrief(\''+full.Hash+'\',\''+UrlUniversal + '72b9c3f36fb72ecc941ab8cc89b54141'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_TRAFICO_TIPOS_BRIEF_ESTADO == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoBrief(\''+full.Hash+'\',\''+UrlUniversal + 'b1ec1a55533ae1046c731375c0c683dc'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTrafico_TB').css({'width':'100%'})
}

function TablaTrafico_TT(){
    $DataTable_Trafico_TT = $('#TablaTrafico_TT').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'dd0dc8bb54f8aacad59082dbe7d31936',
            'data':function (d) {
                    d.search['value'] = $("#TT_TextBusqueda").val();
                    d.search['Estadox'] = $("#TT_Estado").val();
                    return $.extend({}, d, {
                        '_token':document.getElementsByName('_token')[0].value  
                    });
                }
        },

        'columns': [

           { 
                data: 'Num',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
           {    
               data: 'Nombre',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentTTTN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_TRAFICO_TIPOS_TAREA_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoTipoTarea(\''+full.Hash+'\',\''+UrlUniversal + '608bf201fb4402cf75ea0f699aef12f2'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoTipoTarea(\''+full.Hash+'\',\''+UrlUniversal + '608bf201fb4402cf75ea0f699aef12f2'+'\',0)">'
                                    hx += '<img src ="images/inactivo.png" class = "OptionIcon" />';
                            }
                            
                        hx += '</span>'
                    }
                    return '<center><span class = "_ContentES_'+full.Hash+'">'+hx+'</span></center>';
                }
            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    
                    if( full.PAR_TRAFICO_TIPOS_TAREA_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataTipoTarea(\''+full.Hash+'\',\''+UrlUniversal + 'cf068407da50ee1b683ff9e4ac8b3fdf'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
                    }
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTrafico_TT').css({'width':'100%'})
}

function CrearTipoBrief(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nueva Periodicidad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPeriodicidad' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Brief:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoBrief' name='ParTipoBrief' placeholder='Tipo de Brief' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
}

function DataTipoBrief(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipo Brief</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTrafico_TB'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoBrief' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoBrief' value='"+$("._ContentTTBN_"+Hash).text()+"' name='ParTipoBrief' placeholder='Tipo Brief' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarTrafico_TB(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarTrafico_TB").validate({
        rules: {
            ParTipoBrief : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarTrafico_TB(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoBrief: $("#ParTipoBrief").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaTrafico_TB()
            }
        });
    }
}

function EstadoTipoBrief(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaTrafico_TB();
        }
    });
}

function CrearCampoFormatoBrief(Route,Ruta){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Campo Formato Brief</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<div class='modal-body'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParTipoBrief' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Brief:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select class='form-control' id='ParTipoBrief' name = 'ParTipoBrief' autocomplete = 'off' required>";
                                html += "<option value = ''>Seleccione</option>";
                                    
                                    for(var i = 0; i < data.TipoBrief.length;i++){
                                    html += "<option value = '"+data.TipoBrief[i]['Id']+"'>"+data.TipoBrief[i]['Nombre']+"</option>";
                                    }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParPosicionBrief' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Posición:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select class='form-control' id='ParPosicionBrief' name='ParPosicionBrief' autocomplete = 'off' onchange='ListarTipoCampos()' required>";
                                html += "<option value = '' selected>Seleccione</option>";
                                html += "<option value = 'CABECERA'>Cabecera</option>";
                                html += "<option value = 'CUERPO'>Cuerpo</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParTipoCampo' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Campo:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select class='form-control' id='ParTipoCampo' name='ParTipoCampo' autocomplete = 'off' required>";
                                html += "<option value = '' selected>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParNombreTecnico' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Tecnico:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='ParNombreTecnico' name='ParNombreTecnico' placeholder='Nombre Técnico' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParLabel' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Etiqueta:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<input type='text' class='form-control' id='ParLabel' name='ParLabel' placeholder='Etiqueta' autocomplete = 'off' required/>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParDescripcion' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<textarea class='form-control' id='ParDescripcion' name='ParDescripcion' rows='3' placeholder='Descripción' autocomplete = 'off' required></textarea>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group row'>";
                        html += "<label for='ParObligatorio' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Obligatorio:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select class='form-control' id='ParObligatorio' name='ParObligatorio' autocomplete = 'off' required>";
                                html += "<option value = '' selected>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            $(".content_modal").html(html);
        }
    });

}

function ListarTipoCampos(){
    $.ajax({
        type:'POST',
        url:'2f643f836b707206753d7e3244508a04',
        data:{Hash:1,Etiqueta:$("#ParPosicionBrief").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            html += "<option value = ''>Seleccione</option>";
            for(var i = 0; i < data.Campos.length;i++){
              html += "<option value = '"+data.Campos[i]['Id']+"'>"+data.Campos[i]['Descripcion']+"</option>";
            }
            if( data.Campos.length > 0){
                $("#ParDescripcion").prop('readonly', false);
                $("#ParLabel").prop('readonly', false);
                $("#ParNombreTecnico").prop('readonly', false);
                var htmlt = "<option value = '' selected>Seleccione</option>";
                htmlt += "<option value = '1'>Si</option>";
                htmlt += "<option value = '0'>No</option>";
                $("#ParObligatorio").html(htmlt);
            }else{
                var htmlt = "";
                $("#ParObligatorio").html(htmlt);
                $("#ParDescripcion").prop('readonly', true);
                $("#ParLabel").prop('readonly', true);
                $("#ParNombreTecnico").prop('readonly', true);
            }
            $("#ParTipoCampo").html(html);

        }
    });
}

function EstadoTipoMovimientos(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var alert = "alert-danger";
            var msj = "Se ha presentado un Error, intente nuevamente.";
            if( data.success == 1 ){
                alert = "alert-success";
                msj = "Se ha cambiado el estado de manera correcta";
            }
            Notificacion(msj,alert);
        }
    });
}

function ReOrganizarCamposBrief(Ruta){
    $.ajax({
        type:'POST',
        url:'a9e48180ffc0c36062e6f88c8c7aa255',
        data:{Hash:1,Etiqueta:$("#ParPosicionBrief").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Ordenar Campos Brief</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";

            html += "<div class='modal-body'>";
                //html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class='form-group row'>";
                        html += "<label for='ParTipoBrief' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Periodicidad:</label>";
                        html += "<div class='col-sm-8'>";
                            html += "<select class='form-control' onchange = 'ListarCamposBrief()' id='ParTipoBrief' name='ParTipoBrief' autocomplete = 'off' required>";
                                html += "<option value = ''>Seleccione</option>";
                                for(var i = 0; i < data.TipoBrief.length;i++){
                                html += "<option value = '"+data.TipoBrief[i]['Id']+"'>"+data.TipoBrief[i]['Nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'ContenedorCamposReOrg'>";
                        html += "<table id = 'OrdenBrief' class = 'dataTable tableNew'>";
                            html += "<thead>";
                                html += "<tr>";
                                    html += "<th>Orden</th>";
                                    html += "<th>Nombre Técnico</th>";
                                    html += "<th>Etiqueta</th>";
                                html += "</tr>";
                            html += "</thead>";
                            html += "<tbody class = 'TBody'>";
                            html += "</tbody>";
                        html += "</table>";
                    html += "</div>";
            //html += "</form>";
            html += "</div>";
            html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                    html += "<button onclick = 'ActualizarOrdenFormatoBrief()' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            $(".content_modal").html(html);
        }
    });
}

function ActualizarOrdenFormatoBrief(){
    var temp = "";
    $(".OrdenBriefId").each(function(index){
        temp += $(this).text()+"-"+(index+1)+"|";
    });
    console.log(temp)
    $.ajax({
        type:'POST',
        url:'6a0a0b12eb2cbfda1d08716b383f7fac',
        data:{Hash:1,ParTipoBrief:$("#ParTipoBrief").val(),orden:temp,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            location.reload();
        }
    });
}

function ListarCamposBrief(){
    $.ajax({
        type:'POST',
        url:'6012b46480b4ba8b7188ed301606df71',
        data:{Hash:1,ParBrief:$("#ParTipoBrief").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //data.success
            var html = "";
            for(var i = 0; i < data.Campos.length;i++){
                html += "<tr>";
                    html += "<td class = 'OrdenBrief'>"+data.Campos[i]['Orden']+"</td>";
                    html += "<td>"+data.Campos[i]['Nombre_Tecnico']+"</td>";
                    html += "<td>"+data.Campos[i]['Label']+"</td>";
                    html += "<td >"+data.Campos[i]['Label']+"</td>";
                    html += "<td class = 'OrdenBriefId' style = 'display:none;'>"+data.Campos[i]['Id']+"</td>";
                html += "</tr>";
            }
            $(".TBody").html(html);
            $(".TBody").sortable({
                stop: function( event, ui ) {
                    $(".TBody .OrdenBrief").each(function(index){
                        $(this).html(index+1);
                    });
                }
            });
        }
    });

}

function EliminarRegistroFormatoBrief(Id,Ruta){
    $.ajax({
        type:'POST',
        url:Ruta,
        data:{Hash:1,ParIdFormatoBrief:Id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $(".FormatBrief_Row"+Id).remove();
        }
    });
}

function CrearTipoTarea(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipo de Tarea</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin '  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoTarea' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoTarea' name='ParTipoTarea' placeholder='Tipo Tarea' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    
    
}

function GuardarEditarTrafico_TT(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParTipoTarea: $("#ParTipoTarea").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaTrafico_TT()
            }
        });
    }
}

function DataTipoTarea(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Tipo Tarea</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarTrafico_TT'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoTarea' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoTarea' value='"+$("._ContentTTTN_"+Hash).text()+"' name='ParTipoTarea' placeholder='Tipo Tarea' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary'  onclick = 'GuardarEditarTrafico_TT(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    $FormValidate = $(".FormEditarTrafico_TT").validate({
        rules: {
            ParTipoTarea : {
                required: true,
                minlength:3
            }
        }
    });
}

function EstadoTipoTarea(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaTrafico_TT()
        }
    });
}

function AddGrupoTA(){
    var html = "";
    html += "<div class='col col-sm-12 my-2'>"
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td >"
                    html += "<label for='TAR_Estado'>Nombre:</label>"
                    html += "<input type = 'text' class = 'form-control Grupos_TA' />"
                html += "</td>"
                html += "<td class = 'CenterText'>"
                    html += "<img src ='images/eliminar.png' class = 'OptionIcon' onclick = 'DelNgrupo(this)'/>"
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>"
    $(".GruposTA").append(html)
}
function DelNgrupo(a){
    $(a).closest('div').remove()
}

function CrearTipoTA(){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Tipo Tráfico Administrativo</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin '  action='' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParTipoTarea' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre Tipo:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParTipoTarea' name='ParTipoTarea' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            html += "<div class='form-group row'>";
                html += "<div class='col col-sm-12 my-2'>"
                    html += "<label for='TAR_Estado'>A continuación relaciono el nombre de los grupos:</label><p></p>"
                    html += "<img src ='images/datos_additem.png' class = 'OptionIcon' onclick = 'AddGrupoTA()'/>"
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'AddGrupoTA()' > Agregar Item</span>";
                html += "</div>"
                html += "<div style = 'width:100%;height:250px;overflow-y:scroll;' class = 'GruposTA'>"
                html += "</div>"
            html += "</div>"
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarNuevoTipoTA()'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
}

function GuardarNuevoTipoTA(){
    var Grupos = [];
    var P = 0;
    $(".Grupos_TA").each(function(){
        if( $(this).val().length > 0 ){
           Grupos.push({'Grupo':$(this).val()})
        }else{
            P++;
        } 
    });
    if( P == 0 ){
        if( $("#ParTipoTarea").val().length > 0 ){
            var formData = new FormData();
            formData.append("Tipo",$("#ParTipoTarea").val());
            formData.append("Grupos", JSON.stringify(Grupos));
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'62148b2640276b99ee31dae2c89a85f9',
                success:function(data){
                    ModalEdit(0);
                }
            })
        }else{
            alert("No se ha diligenciado el Nombre del TIpo de Tráfico Administrativo");
        }
    }else{
        alert("No se han diligenciado los nombre de todos los Grupos");
    }
    
}
