/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    TablaPpto_Periodicidad();
});

function BuscarTablaPpto_Periodicidad(){
    $DataTable_Ppto_Periodicidad.destroy();
    $DataTable_Ppto_Periodicidad.draw();
    TablaPpto_Periodicidad();
}

function TablaPpto_Periodicidad(){
    $DataTable_Ppto_Periodicidad = $('#TablaPpto_Periodicidad').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4c07f4a7ef8e14a05118de07ec29d067',
            'data':function (d) {
                    d.search['value'] = $("#PER_TextBusqueda").val();
                    d.search['Estadox'] = $("#PER_Estado").val();
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
                    return '<span class = "_ContentTDN_'+full.Hash+'">' + data + '</span>';
                }

            },
           { 
                data: 'Hash',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    var hx = '';
                    if( full.PAR_PPTO_GENERAL_PERIODICIDAD_ESTADO == 1 ){
                        
                            if( full.Estado == 1 ){
                                hx += '<span onclick = "EstadoPeriodicidad(\''+full.Hash+'\',\''+UrlUniversal + 'a01e79a2e8871131b5539a3da2843e78'+'\',1)">'
                                    hx += '<img src ="images/activo.png" class = "OptionIcon" />';
                            }else{
                                hx += '<span onclick = "EstadoPeriodicidad(\''+full.Hash+'\',\''+UrlUniversal + 'a01e79a2e8871131b5539a3da2843e78'+'\',0)">'
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
                    
                    if( full.PAR_PPTO_GENERAL_PERIODICIDAD_EDITAR == 1 ){
                        hx += '<img src ="images/editar.png" class = "OptionIcon" onclick = "DataPeriodicidad(\''+full.Hash+'\',\''+UrlUniversal + '482b0a84fc37dacba64681f311a2ef4d'+'\')" data-toggle="modal" data-target="#ModalEdit"/>'
                        
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
    $('#TablaPpto_Periodicidad').css({'width':'100%'})
}

function CrearPeriodicidad(Ruta){
    var html = "";
    TituloVentana = "Nueva Periodicidad"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPeriodicidad' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Periodicidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPeriodicidad' name='ParPeriodicidad' placeholder='Periodicidad' autocomplete = 'off' required/>";
                html += "</div>";
            html += "</div>";
    html += "</div>";
    html += "<div class='modal-footer'>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);

}

function DataPeriodicidad(Hash,Ruta){
    var html = "";
    TituloVentana = "Editar Periodicidad"
    ImgVentana = "images/editar.png"
    FuncionesHeader = ""
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<form class='form-signin FormEditarPpto_Periodicidad'  action='"+Ruta+"' method='post'>";
        html += "<div class='modal-body'>";
            html += "<input name='Hash' id = 'Hash' type='hidden' value='"+Hash+"' />";
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>";
                html += "<label for='ParPeriodicidad' class='col-sm-4 col-form-label'><span class = 'Obligatorio'>(*)</span> Periodicidad:</label>";
                html += "<div class='col-sm-8'>";
                    html += "<input type='text' class='form-control' id='ParPeriodicidad' value='"+$("._ContentTDN_"+Hash).text()+"' name='ParPeriodicidad' placeholder='Periodicidad' required autocomplete ='off' />";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'GuardarEditarPpto_Periodicidad(\""+Hash+"\",\""+Ruta+"\")'>Guardar</button>";
        html += "</div>";
    html += "</form>";
    $(".content_modal").html(html);
    
    $FormValidate = $(".FormEditarPpto_Periodicidad").validate({
        rules: {
            ParPeriodicidad : {
                required: true,
                minlength:3
            }
        }
    });
}

function GuardarEditarPpto_Periodicidad(Hash,Ruta){
    if( $FormValidate.form() == true ){
        $.ajax({
            type:'POST',
            url:Ruta,
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash: Hash,
                ParPeriodicidad: $("#ParPeriodicidad").val()
            },
            success:function(data){
                EventosCierreModal()
                BuscarTablaPpto_Periodicidad()
            }
        });
    }
}

function EstadoPeriodicidad(Hash,Route){
    $.ajax({
        type:'POST',
        url:Route,
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            BuscarTablaPpto_Periodicidad()
        }
    });
}

