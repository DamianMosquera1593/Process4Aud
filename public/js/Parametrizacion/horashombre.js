/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("DOCLEGAL")
    ContentList("TIPOMOVIMIENTOS")
    ContentList("TIPOPRODUCTOS")
    
    TablaBanco_DL()
    TablaBanco_TM()
});

function BuscarTablaBanco_DL(){
    $DataTable_HH_Actividades.destroy();
    $DataTable_HH_Actividades.draw();
    TablaBanco_DL();
}


function BuscarTablaBanco_TM(){
    $DataTable_HH_ActividadesDeptos.destroy();
    $DataTable_HH_ActividadesDeptos.draw();
    TablaBanco_TM();
}

function TablaBanco_DL(){
    $DataTable_Banco_DL = $('#TablaBancos_DL').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'1b1dc1615c3e5d558ada4bd141ba4d14',
            'data':function (d) {
                    d.search['value'] = $("#DL_TextBusqueda").val();
                    d.search['Estadox'] = $("#DL_Estado").val();
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
                    return '<span class = "_ContentBDLN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_BANCOS_DOCUMENTOS_LEGALES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '65992a272dc76638b416caa0590d4695'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '65992a272dc76638b416caa0590d4695'+'\',0)">'
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
                    
                    if( full.PAR_BANCOS_DOCUMENTOS_LEGALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataActividadesHH(\''+full.Hash+'\',\''+UrlUniversal + '08af4d36106549eab16908a28c194239'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaBancos_DL').css({'width':'100%'})
}


function TablaBanco_TM(){
    $DataTable_HH_ActividadesDeptos = $('#TablaBancos_TM').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'0da24ffb030873fb234f983666b27969',
            'data':function (d) {
                    d.search['value'] = $("#TM_TextBusqueda").val();
                    d.search['Estadox'] = $("#TM_Estado").val();
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
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentBTMN_'+full.Hash+'">' + data + '</span>';
                }

            },
           {    
               data: 'Actividad',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentBTMN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    hx += '<img src ="images/eliminar.png" class = "OptionIcon" onclick = "EliminarAsociacionActDeptoHH(\''+full.Hash+'\',\''+UrlUniversal + '225fa3101b4369e6966980b141becdcf'+'\')" />'
                    return '<center>'+hx+'</center>';
                }
            },
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaBancos_TM').css({'width':'100%'})
}

function CrearDocLegal(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nueva Actividad</span>";
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
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' name='ParDocLegal' placeholder='Nombre Actividad' autocomplete = 'off' required/>";
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

function DataActividadesHH(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Actividad</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarBanco_DL'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' value='"+$("._ContentBDLN_"+Hash).text()+"' name='ParDocLegal' placeholder='Nombre Actividad' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarBanco_DL(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarBanco_DL").validate({
        rules: {
            ParDocLegal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarBanco_DL(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParDocLegal: $("#ParDocLegal").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaBanco_DL()
            }
        });
    }
}

function EstadoActividadHH(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaBanco_DL()
        }
    });
}

function TablaBanco_DL(){
    $DataTable_HH_Actividades = $('#TablaBancos_DL').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'946c04a7e848f1ab3da0b79625ee4fe4',
            'data':function (d) {
                    d.search['value'] = $("#DL_TextBusqueda").val();
                    d.search['Estadox'] = $("#DL_Estado").val();
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
                    return '<span class = "_ContentBDLN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_HORAS_HOMBRE_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoActividadHH(\''+full.Hash+'\',\''+UrlUniversal + '19cb4180f1590bbe72232c7a6b841fb3'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoActividadHH(\''+full.Hash+'\',\''+UrlUniversal + '19cb4180f1590bbe72232c7a6b841fb3'+'\',0)">'
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
                    
                    if( full.PAR_HORAS_HOMBRE_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataActividadesHH(\''+full.Hash+'\',\''+UrlUniversal + '08af4d36106549eab16908a28c194239'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaBancos_DL').css({'width':'100%'})
}


function AddActividadDepartamentoTrafico(Ruta){
    $.ajax({
        type:'POST',
        url:'d9eedd6ead8e6896532d8097738bb170',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //error
            //success
            if( data.TiposActividad.length == 0 ){
                AlertaMensajes("No se han registrado Actividades de Horas Hombre","error",3);
            }else if ( data.TiposActividad.length > 0 ){
                var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nueva Asociación Actividad - Departamento</span>";
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
                            html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Departamento de Tráfico:</label>";
                            html += "<div class='col-sm-8'>";
                                html += "<select class = 'form-control' name = 'TipoActividad' id = 'TipoActividad' required onchange = 'HHListarDepartamentosTrafico()'>"
                                    html += "<option value = ''>Seleccione</option>"
                                    for(var i = 0; i < data.TiposActividad.length; i++){
                                        html += "<option value = '"+data.TiposActividad[i]['Id']+"'>"+data.TiposActividad[i]['Nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class='form-group row'>";
                            
                            html += "<div class='col-sm-12'>";
                                html += "<label for='ParDocLegal' class=''><span class = 'Obligatorio'>(*)</span> Tipo Actividad:</label>";
                                html += "<div class = 'DataAct' style = 'height:150px;overflow-y:scroll;'></div>";
                                
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
        }
    })
}


function HHListarDepartamentosTrafico(){
    if( $("#TipoActividad").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:'4ad89138ada39730a8674575021fe8c6',
            data:{Hash:$("#TipoActividad").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                //DataAct
                var ht = "<table class = 'tableNew'>"
                    ht += "<tr>"
                        ht += "<th>Sel</th>"
                        ht += "<th>Nombre</th>"
                    ht += "</tr>"
                    for(var i = 0; i < data.Deptos.length;i++){
                        ht += "<tr>"
                            ht += "<td class = 'CenterText'>"
                                ht += "<input type = 'checkbox' value = '"+data.Deptos[i]['Id']+"' name = 'ActividadesHH[]' />"
                            ht += "</td>"
                            ht += "<td>"+data.Deptos[i]['Nombre']+"</td>"
                        ht += "</tr>"
                    }
                    if( data.Deptos.length == 0 ){
                        ht += "<tr>"
                            ht += "<td colspan = '2' class = 'CenterText'>No hay actividades disponibles para asociar.</td>"
                        ht += "</tr>"
                    }
                ht += "</table>"
                $(".DataAct").html(ht)
            }
        })
    }
}

function EliminarAsociacionActDeptoHH(Hash,Route){
    if( confirm("Está seguro(a) de retirar esta unión?\nTenga en cuenta que al hacerlo esta ya no estará disponible en el diligenciamiento de Horas Hombre.") ){
        $.ajax({
            type:'POST',
            url:'890644cb5ca32311046e500caa1075da',
            data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                BuscarTablaBanco_TM()
            }
        });
    }
}