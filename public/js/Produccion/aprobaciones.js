/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    VisualPpto = 1;
});
VisualPpto = 1;
const OTCliente = {
    listaInit: function() {
        printDataAjax('bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa:null}, data => {
            // console.log(data);
            let html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Empresa').html(html)

            html = '<option value="" selected>Seleccione</option>'
            data.estados.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Estado']+"</option>"
            });
            $('#OTC_Estado').html(html)

            html = '<option value="" selected>Seleccione</option>'
            data.years.forEach(obj => {
                html += "<option value = '"+obj['Fecha']+"'>"+obj['Fecha']+"</option>"
            });
            $('#OTC_Year').html(html)
        })
    },
    listasWithEmpresa: function(e) {
        const datax = e.target.value
        if (!datax) {
            return
        }
        printDataAjax('bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa: datax}, data => {
            // console.log(data);
            let html = '<option value="" selected>Seleccione</option>'
            data.Unidades.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Unidad').html(html)

            html = '<option value="" selected>Seleccione</option>'
            data.Clientes.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#OTC_Cliente').html(html)
        })
    }
}

function PRO_ViewPresupuestos(){
    var html = ""
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Aprobaciones Presupuestos</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class='pestanas'>"
                html += "<ul class = 'TabsMenu'>";
                    html += "<li onclick = 'MostrarTabsMenu(1)' class = 'TabsMenu_Tabs TabsMenu_Tabs1'>"
                        html += "<img src = '"+UrlUniversal+"images/Documentos.png' class = 'IconVentana'>"
                        html += "<span>Pendientes</span>"
                    html +="</li>";
                    html += "<li onclick = 'MostrarTabsMenu(2)' class = 'TabsMenu_Tabs TabsMenu_Tabs2'>"
                        html += "<img src = '"+UrlUniversal+"images/Documentos.png' class = 'IconVentana'>"
                        html += "<span>Histórico</span>"
                    html +="</li>";
                html += "</ul>"
            html += "</div>"
            html += "<div class = 'ChildTabsMenu TabsMenu1'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'>Empresa:</label>";
                        html += "<select class ='form-control' name = 'OTC_Empresa' id = 'OTC_Empresa' onchange='OTCliente.listasWithEmpresa(event)'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'>Unidad de Negocio:</label>";
                        html += "<select class ='form-control' name = 'OTC_Unidad' id = 'OTC_Unidad'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Cliente'>Cliente:</label>";
                        html += "<select class ='form-control' name = 'OTC_Cliente' id = 'OTC_Cliente'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaPresupuestosPendientes()'/>";
                    html += "</div>";
                html += "</div>";
                
                html += "<br>"
                
                html += "<table class = 'tableNew' id = 'ListPptoPendientes'>"
                    html += "<thead>"
                        html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>OT</th>"
                        html += "<th>Presupuesto</th>"
                        html += "<th>Referencia Presupuesto</th>"
                        html += "<th>Version Interna</th>"
                        html += "<th>Version Cliente</th>"
                        html += "<th>Solicitado Por</th>"
                        html += "<th>Fecha Solicitud</th>"
                        html += "<th>Hora Solicitud</th>"
                        html += "<th>Consultar</th>"
                    html += "</tr>"
                    html += "</thead>"
                html += "</table>"
            html += "</div>";
            
            html += "<div class = 'ChildTabsMenu TabsMenu2'>";
            html += "</div>";
            
        html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaInit()
    TablaPresupuestosPendientes();
    MostrarTabsMenu(1)
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}

function TablaPresupuestosPendientes() {
    $DataTable_OTProyectos = $('#ListPptoPendientes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'6ee3a3dac295a641d457974b6035b290',
            'data':function (d) {
                d.search['HashEmpresa'] = $("#OTC_Empresa").val();
                d.search['HashCliente'] = $("#OTC_Cliente").val();
                d.search['HashUnidad'] = $("#OTC_Unidad").val();
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
               data: 'CodigoOt',
               "orderable": false,
               "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'IdPpto',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentOTR_'+full.HashSolAprobacion+'">' + data + '</span></center>';
                }

            },
            {
                data: 'RefPpto',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTD_'+full.HashSolAprobacion+'">' + data + '</span>';
                    }

                },
            {
                data: 'VersionInterna',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentOTE_'+full.HashSolAprobacion+'">' + data + '</span></center>';
                }

            },
            {
                data: 'VersionCliente',
                "render": function (data, type, full, meta) {
                        return '<center><span class = "_ContentOTEM_'+full.HashSolAprobacion+'">' + data + '</span><center>';
                    }

            },
            {
            data: 'Solicitador',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.HashSolAprobacion+'">' + data + '</span>';
                }

            },
            {
            data: 'FechaSol',
            "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentOTU_'+full.HashSolAprobacion+'">' + data + '</span></center>';
                }

            },
            {
                data: 'HoraSol',
                "render": function (data, type, full, meta) {
                    return '<center><span class = "_ContentOTES_'+full.HashSolAprobacion+'">' + data + '</span></center>';
                }

            },
            {
                data: 'HoraSol',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center ><img src = "images/detalles.png" class = "OptionIcon" onclick = "SelectViewPpto('+full.HashSolAprobacion+','+full.Hashp+')"/></center>';
                }

            },
        ],
        "order": [[7, "DESC"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#ListPptoPendientes').css({'width':'100%'})
}

function BuscarTablaPresupuestosPendientes(){
    $DataTable_OTProyectos.destroy()
    TablaPresupuestosPendientes();
}

function SelectViewPpto(HashSol,HashP){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'d891f4f1b8e788bcc7b1eba3dae2e904',
        data:{
            HashP:HashP,
            HashSol: HashP,
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = ""
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Aprobación Presupuesto</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                
                html += "<iframe  id = 'FramePpto' width = '100%;' height = '600px' src=" + UrlGeneral + "01f34a2740cbabf722b2255aa878959f/"+HashP+">"
                    
                html += "</iframe>"
                html += "<div style = 'padding-left:30%;padding-right:30%;'>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2 CenterText'>";
                            html += "<span>"
                                html += "<img src ='images/aprobar.png' class = 'OptionIcon' onclick = '' />";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'SendSolPpto(1,"+HashSol+","+HashP+")' > Aprobar</span>";
                            html += "</span>"
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2 CenterText'>";
                            html += "<span>"
                                html += "<img src ='images/rechazar.png' class = 'OptionIcon' onclick = '' />";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'SendSolPpto(0,"+HashSol+","+HashP+")' > Rechazar</span>";
                            html += "</span>"
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Unidad'>Observaciones:</label>";
                            html += "<textarea class = 'form-control' name = 'ObservacionesAprobacion' id = 'ObservacionesAprobacion'></textarea>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>"
            html += "</div>";

            $(".content_modal2").html(html);
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm2").addClass('modal-dialog-scrollable');
            ModalEdit2(1)
            //document.getElementById('FramePpto').contentWindow.alert('Esta alerta del iframe se llamó desde afuera del iframe');
            //let scriptNuevo = document.createElement('script');
            //scriptNuevo.setAttribute('src','js/Produccion/OptionsPptos.js');
            //document.getElementById('FramePpto').contentWindow.document.body.appendChild(scriptNuevo);
        }
    })
    
}

function SendSolPpto(Tip,HashSol, HashP){
    if( $("#ObservacionesAprobacion").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'e0cb0f04c7aa10c9a6558e51de57299e',
            data:{
                HashP:HashP,
                HashSol: HashSol,
                Tip:Tip,
                Obser:$("#ObservacionesAprobacion").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                ModalEdit2(0);
                BuscarTablaPresupuestosPendientes();
            }
        })
    }else{
        alert("Debe ingresar algun comentario u observación");
    }
}