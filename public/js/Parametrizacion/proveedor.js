/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    ContentList("DOCLEGAL")
    TablaCliente_DL();
});

function BuscarTablaProveedor_DL(){
    $DataTable_Proveedor_DL.destroy();
    $DataTable_Proveedor_DL.draw();
    TablaCliente_DL();
}

function TablaCliente_DL(){
    $DataTable_Proveedor_DL = $('#TablaProveedor_DL').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4c65909d0ac551f510cdb87f6c3be9a9',
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
                    return '<span class = "_ContentCDLN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PROVEEDORES_DOCUMENTOS_LEGALES_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '4db6279e8797a15d736d9a8dc9a76fed'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoDocLegal(\''+full.Hash+'\',\''+UrlUniversal + '4db6279e8797a15d736d9a8dc9a76fed'+'\',0)">'
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
                    
                    if( full.PAR_PROVEEDORES_DOCUMENTOS_LEGALES_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataDocLegal(\''+full.Hash+'\',\''+UrlUniversal + 'e5a5ab7858e42b873dd68ab838d82514'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaProveedor_DL').css({'width':'100%'})
}

function CrearDocLegal(Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/datos_additem.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Nuevo Documento Legal</span>";
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
                    html += "<input type='text' class='form-control' id='ParDocLegal' name='ParDocLegal' placeholder='Documento Legal' autocomplete = 'off' required/>";
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

function DataDocLegal(Hash,Ruta){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Editar Documento Legal</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' onclick = 'EventosCierreModal()'/>";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<form class='form-signin FormEditarProveedor_DL'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParDocLegal' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Nombre:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParDocLegal' value='"+$("._ContentCDLN_"+Hash).text()+"' name='ParDocLegal' placeholder='Documento Legal' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarProveedor_DL(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarProveedor_DL").validate({
        rules: {
            ParDocLegal : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarProveedor_DL(Hash,Ruta){
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
                BuscarTablaProveedor_DL()
            }
        });
    }
}

function EstadoDocLegal(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaProveedor_DL();
        }
    });
}
