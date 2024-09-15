$(document).ready(function () {
    //ContentList('TRACLIENTEOT')
    ContentList('TRACLIENTEOT')
    //TablaOTTraCliente()
    //tablaTarea()
    //OTCliente.listaInit()
    //Tarea.listFiltros()
    //CargaLaboral.listDepartamentos()
    
    $.ajaxSetup({
        beforeSend: function() {
           $('#spinner').show();
        },
        complete: function(){
           $('#spinner').hide();
        },
        success: function() {

        }
    });
})

/* ---------------------- -------------------
-------------------- OTS -----------------
--------------------------------------
 */

const CargaLaboral = {
    listDepartamentos: function () {
        printDataAjax('43c18fe6637765803dd40298d7bf50e4', {}, data => {
            var html = '<option value="" selected>Seleccione</option>'
            data.Departamentos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Departamento']+"</option>"
            });
            $('#Report_Departamento').html(html)
            
        })
    },
    listUsuarios: function () {
        printDataAjax('b39e5b91733b7aaeef24379d85cc7840', {Hash:1}, data => {
            var html = '<option value="" selected>Seleccione</option>'
            data.Users.forEach(obj => {
                html += "<option value = '"+obj['IdUsuario']+"'>"+obj['NombreUsuario']+"</option>"
            });
            $('#Report_ListUsers').html(html)
            
        })
    },
}


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

function BuscarTablaOTProyecto() {
    var html = "";
    html += "<table class='dataTable tableNew' id = 'TablaTraClienteOTx' style = 'border-collapse:collapse;'>";
        html += "<thead>";
            html += "<tr>";
                html += "<th>No.</th>";
                html += "<th>Codigo OT</th>";
                html += "<th>Referencia</th>";
                html += "<th>Director</th>";
                html += "<th>Ejecutivo</th>";
                html += "<th>Empresa</th>";
                html += "<th>Cliente</th>";
                html += "<th>Unidad De Negocio</th>";
                html += "<th>Estado</th>";
            html += "</tr>";
        html += "</thead>";
    html += "</table>";
    $(".ContenedorTablaReporte").html(html);
    
    TablaOTTraCliente();
    $("table.dataTable").css({
        'border-collapse':'collapse'
    })
    $(".BotonesExport").show()
}

function BuscarTablaOTProyectoTareas(){
    var html = "";
    html += "<table class='dataTable tableNew responsive nowrap' id = 'TablaTraClienteOTTaeras'>";
        html += "<thead>";
            html += "<tr>";
                html += "<th>No.</th>";
                html += "<th>Codigo OT</th>";
                html += "<th>Referencia</th>";
                html += "<th>Director</th>";
                html += "<th>Ejecutivo</th>";
                html += "<th>Empresa</th>";
                html += "<th>Cliente</th>";
                html += "<th>Unidad De Negocio</th>";
                html += "<th>Estado</th>";
                html += "<th>Asunto</th>";
                html += "<th>Departamento</th>";
                html += "<th>Fecha Creación</th>";
                html += "<th>Hora Creación</th>";
                html += "<th>Creador</th>";
                html += "<th>Tipo Tarea</th>";
                html += "<th>Adjuntos</th>";
                html += "<th>Nro. Entregables</th>";
                html += "<th>Fecha Entrega</th>";
                html += "<th>Hora Entrega</th>";
                html += "<th>Fecha Respuesta</th>";
                html += "<th>Hora Respuesta</th>";
                html += "<th>Estado</th>";
            html += "</tr>";
        html += "</thead>";
    html += "</table>";
    $(".ContenedorTablaReporte").html(html);
    TablaOTTraClienteTareas();
    $(".BotonesExport").show()
}

function TablaOTTraCliente() {
    $DataTable_OTProyectos = $('#TablaTraClienteOTx').DataTable({
        'processing': true,
        'serverSide': true,
        'fixedColumns':   true,
        'serverMethod': 'post',
        'ajax': {
            'url':'88459cc62d1e889962f9dd4e4e6e3b67',
            'data':function (d) {
                d.search['HashEmpresa'] = $("#OTC_Empresa").val();
                d.search['HashCliente'] = $("#OTC_Cliente").val();
                d.search['HashUnidad'] = $("#OTC_Unidad").val();
                d.search['HashEstado'] = $("#OTC_Estado").val();
                d.search['FInicio'] = $("#OTC_FInicio").val();
                d.search['FFin'] = $("#OTC_FFin").val();
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
               data: 'Codigo',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Referencia',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Director',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTD_'+full.Hash+'">' + data + '</span>';
                    }

                },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span>';
                    }

            },
            {
            data: 'Cliente',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
            data: 'Unidad',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTU_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[2, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#TablaTraClienteOTx').css({'width':'100%'})
}

function TablaOTTraClienteTareas() {
    $DataTable_TareaOTProyectos = $('#TablaTraClienteOTTaeras').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4c66056c168a71bd8abdd171c7c10e17',
            'data':function (d) {
                d.search['HashEmpresa'] = $("#OTC_Empresa").val();
                d.search['HashCliente'] = $("#OTC_Cliente").val();
                d.search['HashUnidad'] = $("#OTC_Unidad").val();
                d.search['HashEstado'] = $("#OTC_Estado").val();
                d.search['FInicio'] = $("#OTC_FInicio").val();
                d.search['FFin'] = $("#OTC_FFin").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'" >' + data + '</span></center>';
                }
           },
           {
               data: 'Codigo',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Referencia',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Director',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTD_'+full.Hash+'">' + data + '</span>';
                    }

                },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span>';
                    }

            },
            {
            data: 'Cliente',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
            data: 'Unidad',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTU_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Estadoproyecto',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
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
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'NroEntregables',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center> ';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraClienteOTTaeras').css({'width':'100%'})
}

function generarReporteOT(route, type) {
    const idEmpresa = $("#OTC_Empresa").val();
    const idCliente = $("#OTC_Cliente").val();
    const idUnidad = $("#OTC_Unidad").val();
    const idEstado = $("#OTC_Estado").val();
    const FInicio = $("#OTC_FInicio").val();
    const FFin = $("#OTC_FFin").val();

    fetch(route,{
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            HashEmpresa: idEmpresa,
            HashUnidad: idUnidad,
            HashCliente: idCliente,
            HashEstado: idEstado,
            FInicio: FInicio,
            FFin: FFin,
            type
        })
    })
    .then(resp => resp.blob())
    .then(blob => {
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Listo de OTs';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alertify.notify('Archivo Descargado satisfactoriamente', 'success', 5, function () {
            console.log('dismissed');
        });
    })
    .catch(() => alert('oh no!'));

}

function generarReporteOTPDF() {
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'e300a06f5eb910c7b77eff69eff05869',
        data:{
            idEmpresa:$("#OTC_Empresa").val(),
            nameEmpresa:$('select[name="OTC_Empresa"] option:selected').text(),
            idCliente:$("#OTC_Cliente").val(),
            nameCliente:$('select[name="OTC_Cliente"] option:selected').text(),
            idUnidad:$("#OTC_Unidad").val(),
            nameUnidad:$('select[name="OTC_Unidad"] option:selected').text(),
            idEstado:$("#OTC_Estado").val(),
            nameEstado:$('select[name="OTC_Estado"] option:selected').text(),
            FInicio:$("#OTC_FInicio").val(),
            FFin:$("#OTC_FFin").val(),
            type:'pdf',
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.success == true ){
                window.open(UrlGeneral+'4d6dafef10c87be0c321ef1cb0f257ac', '_blank');
            }
        }
    })
}

function generarReporteOTExcel() {
    var route = UrlGeneral + '3af81c5b2b88a0232e0552447e4ecb4e'
    generarReporteOT(route, 'excel')
}


//----------------------------------------------------------------------------------------------//
//------------------------------------ Tarea clientes -----------------------------------------//
//--------------------------------------------------------------------------------------------//

const Tarea = {
    id: null,
    codigo: null,
    enviar: function (e) {
        const ExtraData = {parAdjuntos : this.files}
        sendForm(e, () => {
            BuscarTablaTarea()
            notificacionesGenerales()
        },
        ExtraData)
    },
    listFiltros: function () {
        printDataAjax('2ab09a7a592d3cda9eadb46cbcf7dca6', {}, data => {
            console.log(data);
            html = '<option value="" selected>Seleccione</option>'
            data.departamentos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTT_Departamento').html(html)
            html = '<option value="" selected>Seleccione</option>'
            data.tipoTarea.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTT_TipoTarea').html(html)
            html = '<option value="" selected>Seleccione</option>'
            data.estados.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTT_Estado').html(html)
        })
    }
}

function initTarea(id, codigo) {
    Tarea.id = id
    Tarea.codigo = codigo
    $('#TareaOT').addClass('animate__backInDown')
    $('#TitleTareaOT').text('Tareas OT: '+codigo)
    $('#TareaOT').removeClass('d-none')
    BuscarTablaTarea()
}



function BuscarTablaTarea() {
    $DataTable_TareaOTProyectos.destroy();
    $DataTable_TareaOTProyectos.draw();
    tablaTarea();
}

function tablaTarea() {
    $DataTable_TareaOTProyectos = $('#TablaTraClienteOTTaeras').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4c66056c168a71bd8abdd171c7c10e17',
            'data':function (d) {
                d.search['HashDepartamento'] = $("#OTT_Departamento").val();
                d.search['HashTipoTarea'] = $("#OTT_TipoTarea").val();
                d.search['HashEstado'] = $("#OTT_Estado").val();
                d.search['proyecto'] = Tarea.id;
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'" >' + data + '</span></center>';
                }
           },
           {
               data: 'Codigo',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Referencia',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Director',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTD_'+full.Hash+'">' + data + '</span>';
                    }

                },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                        return '<span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span>';
                    }

            },
            {
            data: 'Cliente',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTC_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
            data: 'Unidad',
            "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTU_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Estadoproyecto',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
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
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTR_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center> ';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center> ';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTareaProyectoOT').css({'width':'100%'})
}

function generarReporteTareaPDF() {
    var route = UrlGeneral + '6962eb20c048cf606d512d717748c268';
    generarReporteTarea(route, 'pdf')
}

function generarReporteTareaExcel() {
    var route = UrlGeneral + '6962eb20c048cf606d512d717748c268';
    generarReporteTarea(route, 'excel')
}

function generarReporteTarea(route, type) {
    const idEmpresa = $("#OTC_Empresa").val();
    const idCliente = $("#OTC_Cliente").val();
    const idUnidad = $("#OTC_Unidad").val();
    const idEstado = $("#OTC_Estado").val();
    const FInicio = $("#OTC_FInicio").val();
    const FFin = $("#OTC_FFin").val();

    fetch(route,{
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            HashEmpresa: idEmpresa,
            HashUnidad: idUnidad,
            HashCliente: idCliente,
            HashEstado: idEstado,
            FInicio: FInicio,
            FFin: FFin,
            type
        })
    })
    .then(resp => resp.blob())
    .then(blob => {
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Listado de Tareas';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alertify.notify('Archivo Descargado satisfactoriamente', 'success', 5, function () {
            console.log('dismissed');
        });
    })
    .catch(() => alert('oh no!'));

}

function TRA_ViewListarProyectos(){
    var html = ""
        
        TituloVentana = "Reportes de Ots"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
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
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Estado'>Estado:</label>";
                    html += "<select class ='form-control' name = 'OTC_Estado' id = 'OTC_Estado'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Desde:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FInicio'/>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Hasta:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FFin'/>"
                html += "</div>";
                
                html += "<div class='col col-sm-3 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaOTProyecto()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            html += "<div class = 'form-row BotonesExport' style = 'display:none;'>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BExcel.png' class = 'OptionIcon'onclick = 'generarReporteOTExcel()'/>";
                    html += "<span class = 'FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteOTExcel()'>Generar Reporte Excel</span>";
                html += "</div>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BPdf.png' class = 'OptionIcon'onclick = 'generarReporteOTPDF()'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteOTPDF()'>Generar Reporte PDF</span>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'ContenedorTablaReporte'></div>"
            
        html += "</div>";
        /*html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";*/

    $(".content_modal").html(html);
    OTCliente.listaInit()
    TablaOTTraCliente
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}


function TRA_ViewListarTareasProyectos(){
    var html = ""
        TituloVentana = "Reportes de Tareas"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
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
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Estado'>Estado:</label>";
                    html += "<select class ='form-control' name = 'OTC_Estado' id = 'OTC_Estado'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Desde:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FInicio'/>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Hasta:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FFin'/>"
                html += "</div>";
                
                html += "<div class='col col-sm-3 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaOTProyectoTareas()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            html += "<div class = 'form-row BotonesExport' style = 'display:none;'>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BExcel.png' class = 'OptionIcon'onclick = 'generarReporteOTExcel()'/>";
                    html += "<span class = 'FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteTareaExcel()'>Generar Reporte Excel</span>";
                html += "</div>";
                /*html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BPdf.png' class = 'OptionIcon'onclick = 'generarReporteOTPDF()'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteTareaPDF()'>Generar Reporte PDF</span>";
                html += "</div>";*/
            html += "</div>";
            html += "<div class = 'ContenedorTablaReporte'></div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaInit()
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}


function TRA_ViewCargaLaboral(){
    var html = ""
        

        TituloVentana = "Reportes De Entregables Pendientes"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Departamento:</label>";
                    html += "<select class ='form-control' name = 'Report_Departamento' id = 'Report_Departamento' >";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Empresa:</label>";
                    html += "<select class ='form-control' name = 'OTC_Empresa' id = 'OTC_Empresa' onchange='OTCliente.listasWithEmpresa(event)'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Unidad'>Unidad de Negocio:</label>";
                    html += "<select class ='form-control' name = 'OTC_Unidad' id = 'OTC_Unidad'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Cliente'>Cliente:</label>";
                    html += "<select class ='form-control' name = 'OTC_Cliente' id = 'OTC_Cliente'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarReporteCalendarioEntregas()'/>";
                html += "</div>";
                /*html += "<div class='col col-sm-3 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarReporteCargaLaboral()'/>";
                html += "</div>";*/
            html += "</div>";
            html += "<hr>"
            /*html += "<div class = 'form-row BotonesExport' style = 'display:none;'>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BExcel.png' class = 'OptionIcon'onclick = 'generarReporteOTExcel()'/>";
                    html += "<span class = 'FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteTareaExcel()'>Generar Reporte Excel</span>";
                html += "</div>";
            html += "</div>";*/
            html += "<div class = 'ContenedorTablaReporte' style = 'width:100%;overflow:scroll;max-height:500px;'></div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    CargaLaboral.listDepartamentos()
    OTCliente.listaInit()
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}

function BuscarReporteCalendarioEntregas(){
    if( 1 == 1
        /*$("#Report_Departamento").val() != '' &&
        $("#OTC_Empresa").val() != '' &&
        $("#OTC_Unidad").val() != '' &&
        $("#OTC_Cliente").val() != '' */
        ){
            $.ajax({
                type:'POST',
                url:UrlGeneral + 'ee8b8c2715871eeaff09a3e205bfb633',
                data:{
                    Report_Departamento:$("#Report_Departamento").val(),
                    OTC_Empresa:$("#OTC_Empresa").val(),
                    OTC_Unidad:$("#OTC_Unidad").val(),
                    OTC_Cliente:$("#OTC_Cliente").val(),
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    var html = "";
                    var TotalGeneralPiezas = 0;
                    for(var y = 0; y < data.Piezas.length; y++){
                        TotalGeneralPiezas += parseInt(data.Piezas[y]);
                    }
                    
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th class = 'subtitulos_principales  CenterText border_top' style = 'border:0px;' colspan = '"+((data.Fechas.length*3)+3)+"'>Calendario de Entregas Desde: "+data.MinDate+" Hasta: "+data.MaxDate+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<td class = 'cabecera_th_dark CenterText' colspan = '"+((data.Fechas.length*3)+3)+"'>Total Entregables Pendientes: "+formatNumber.new(TotalGeneralPiezas)+"</td>"
                        html += "</tr>"
                        
                        html += "<tr><td><br><br></td></tr>"
                        var TotalPiezas = [];
                        html += "<tr>"
                            html += "<td colspan = '2' class = 'subtitulos_mes CenterText '>Usuario</td>"
                            html += "<td class = 'BorderCero'></td>"
                            for(var i = 0; i < data.Fechas.length;i++){
                                html += "<td colspan = '2' class = 'subtitulos_mes CenterText'>"+data.Fechas[i]+"</td>"
                                if( i < (data.Fechas.length-1) ){
                                    html += "<td class = 'BorderCero' style = 'width:30px'></td>"
                                }
                            }
                        html += "</tr>"
                        for(var i = 0; i < data.Calendario.length;i++){
                            html += "<tr>"
                                html += "<td  class = 'td_cuerpo_table' colspan = '2' style = 'text-align:center;min-width:120px;'>"
                                    html += "<img onerror = this.src='images/foto.png' src = '"+UrlUniversal+"../storage/app/Usuarios/"+data.Calendario[i]['User'][0]['ImgUsuario']+"' class = 'rounded-circle' style = 'height:70px;width:70px;border-radius:35px;'/>"
                                    html += "<p>"+data.Calendario[i]['User'][0]['NombreUsuario']+"</p>"
                                html += "</td>"
                                html += "<td class = 'BorderCero' style = 'width:30px'></td>"
                                var Piezas = 0;
                                for(var y = 0; y < data.Calendario[i]['Data'].length; y++){
                                    var CantidadPiezas = 0;
                                    var Ots = "";
                                    
                                    for(var u = 0; u < data.Calendario[i]['Data'][y].length;u++){
                                        CantidadPiezas += parseInt( data.Calendario[i]['Data'][y][u]['Piezas'] )
                                        Ots += "<div style = 'border:1px solid #0684a5;border-radius:0.3em;overflow-x:scroll;padding:15px;width:100%;margin:0 auto;'>"
                                            Ots += "<table width = '100%'>"
                                                Ots += "<tr>"
                                                    Ots += "<td>"
                                                        Ots += "<p style = 'background-color:#0684a5;color:white;padding:10px;border:1px solid white;border:0.3em;'>"+data.Calendario[i]['Data'][y][u]['Codigo']+" | "+data.Calendario[i]['Data'][y][u]['Referencia']+"</p>"
                                                    Ots += "</td>"
                                                Ots += "</tr>"
                                            Ots += "</table>"
                                            
                                            Ots += "<p>"+data.Calendario[i]['Data'][y][u]['Asunto']+"</p>"
                                            Ots += "<p><span style = 'color:red;font-weight:bold;'>"+data.Calendario[i]['Data'][y][u]['Piezas']+" Entregable(s)</span></p>"
                                            //Ots += "<p><span style = 'font-weigth:bold;'>"+data.Fechas[i]+"</span></p>"
                                        Ots += "</div>"
                                        Ots += "<br>"
                                    }
                                    html += "<td  nowrap class = 'td_cuerpo_table' style = 'vertical-align:top;background-color:white;border-radius:0.3em;'><div style = 'height:230px;min-width:300px;overflow:scroll;'>"+Ots+"</div></td>"
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;width:40px;"+data.Calendario[i]['Color'][y]+"'>"+formatNumber.new(CantidadPiezas)+"</td>"
                                    
                                    
                                    if( y < (data.Calendario[i]['Data'].length-1) ){
                                        html += "<td class = 'BorderCero'></td>"
                                    }
                                    //Piezas += CantidadPiezas;
                                }
                                //TotalPiezas.push(Piezas)
                            html += "</tr>"
                        }
                        html += "<tr>"
                            html += "<td colspan = '3'></td>"
                        for(var y = 0; y < data.Piezas.length; y++){
                            html += "<td class = 'subtitulos_mes CenterText'>Total</td>"
                            html += "<td class = 'subtitulos_mes CenterText'>"+formatNumber.new(data.Piezas[y])+"</td>"
                            if( y < (data.Piezas.length-1) ){
                                html += "<td class = 'BorderCero'></td>"
                            }
                        }
                        html += "</tr>"
                        
                    html += "</table>"
                    $(".ContenedorTablaReporte").html(html);
                }
            })
        }else{
            alert("No se han seleccionado todos los campos");
        }
}

function BuscarReporteCargaLaboral(){
    if( $("#Report_Departamento").val() != "" ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '7901af9df2cf70be0ee8311e77e91860',
            data:{
                HashDepto:$("#Report_Departamento").val(),
                //FInicio:$("#OTC_FInicio").val(),
                //FFin:$("#OTC_FFin").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                html += "<div class = 'flex-center'>"
                    html += "<table >"
                        html += "<tr>"
                            html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Tareas/Nro. Entregables</td>"
                            html += "<td class = 'BorderCero'></td>"
                            html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Tareas/Nro. Entregables</td>"
                            html += "<td class = 'BorderCero'></td>"
                            html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Tareas/Nro. Entregables</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"
                html += "<br>"
                html += "<table class = 'tableNew'>"
                    html += "<tr>"
                        html += "<th></th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th ></th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'BorderCero'></th>"
                    for(var i = 0; i < data.Clientes.length; i++){
                        html += "<td class = 'CenterText Subtitulos' colspan = '8' style = 'background-color:#797870;color:white;'>"+data.Clientes[i]['Cliente']+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                    }
                    html += "</tr>"
                    
                    html += "<tr>"
                        html += "<th></th>"
                        html += "<th class = 'BorderCero'></th>"
                    for(var i = 0; i < data.Clientes.length; i++){
                        /*html += "<td class = 'CenterText SubtitulosChild' nowrap colspan = '6' style = 'background-color:#94938d;color:white;'>Responsable/Líder</td>"
                        html += "<th class = 'BorderCero'></th>"*/
                        html += "<td class = 'CenterText SubtitulosChild' nowrap colspan = '8' style = 'background-color:#94938d;color:white;'>Asignado/Ejecutor</td>"
                        html += "<th class = 'BorderCero'></th>"
                    }
                    html += "</tr>"
                    
                    html += "<tr>"
                        html += "<th>Usuarios</th>"
                        html += "<th class = 'BorderCero'></th>"
                    for(var i = 0; i < data.Clientes.length; i++){
                        /*html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Atrasado</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        //html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Hoy</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        //html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>A Futuro</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        html += "<th class = 'BorderCero'></th>"
                        */
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Atrasado</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Hoy</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>A Futuro</td>"
                        html += "<td class = 'CenterText SubtitulosChild' nowrap style = 'width:80px;'>Nro. Entregables</td>"
                        html += "<th class = 'BorderCero'></th>"
                    }
                    html += "</tr>"
                    
                    for(var i = 0; i < data.Usuarios.length; i++){
                        html += "<tr>"
                            html += "<td>"
                                html += "<table class = 'TableInterno'>"
                                    html += "<tr>"
                                        html += "<td class = 'CenterText' >"
                                            html += "<img class ='rounded-circle PUser' src = 'images/foto.png'  height='50px' />"
                                        html += "</td>"
                                        html += "<td>"+data.Usuarios[i]['NombreUsuario']+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                            html += "<th></th>"
                            for(var x = 0; x < data.Usuarios[i]['Clientes'].length; x++){
                                var Alert = "";
                                var AlertCss = "";
                                /*
                                //-------------------------Atrasado-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Resp_Ant'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Resp_Ant'] > 0 && data.Usuarios[i]['Clientes'][x]['Resp_Ant'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Resp_Ant']+"</td>"
                                
                                if( data.Usuarios[i]['Clientes'][x]['RespEnt_Ant'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['RespEnt_Ant'] > 0 && data.Usuarios[i]['Clientes'][x]['RespEnt_Ant'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['RespEnt_Ant']+"</td>"
                                
                                //-------------------------Atrasado-------------------------
                                
                                //html += "<th class = 'BorderCero'></th>"
                                
                                //-------------------------Hoy-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Resp_Hoy'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Resp_Hoy'] > 0 && data.Usuarios[i]['Clientes'][x]['Resp_Hoy'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Resp_Hoy']+"</td>"
                                
                                if( data.Usuarios[i]['Clientes'][x]['RespEnt_Hoy'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['RespEnt_Hoy'] > 0 && data.Usuarios[i]['Clientes'][x]['RespEnt_Hoy'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['RespEnt_Hoy']+"</td>"
                                
                                //-------------------------Hoy-------------------------
                                
                                //html += "<th class = 'BorderCero'></th>"
                                
                                //-------------------------A Futuro-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Resp_Fut'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Resp_Fut'] > 0 && data.Usuarios[i]['Clientes'][x]['Resp_Fut'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Resp_Fut']+"</td>"
                                
                                if( data.Usuarios[i]['Clientes'][x]['RespEnt_Fut'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['RespEnt_Fut'] > 0 && data.Usuarios[i]['Clientes'][x]['RespEnt_Fut'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:red;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['RespEnt_Fut']+"</td>"
                                
                                //-------------------------A Futuro-------------------------
                                
                                html += "<th class = 'BorderCero'></th>"
                                
                                */
                                //-------------------------Atrasado-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Asig_Ant'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Asig_Ant'] > 0 && data.Usuarios[i]['Clientes'][x]['Asig_Ant'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                if( data.Usuarios[i]['Clientes'][x]['Asig_Ant'] != 0 ){
                                    html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"
                                        html += "<span class = 'Cursor' onclick = 'ReportVisualizarPendientes("+data.Usuarios[i]['IdUsuario']+","+data.Usuarios[i]['Clientes'][x]['Hash']+",0)'>"+data.Usuarios[i]['Clientes'][x]['Asig_Ant']+"</span>"
                                    html += "</td>"
                                }else{
                                    
                                    html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Asig_Ant']+"</td>"
                                }
                                
                                
                                if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Ant'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Ant'] > 0 && data.Usuarios[i]['Clientes'][x]['AsigEnt_Ant'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['AsigEnt_Ant']+"</td>"
                                
                                //-------------------------Atrasado-------------------------
                                
                                html += "<th class = 'BorderCero'></th>"
                                
                                //-------------------------Hoy-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Asig_Hoy'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Asig_Hoy'] > 0 && data.Usuarios[i]['Clientes'][x]['Asig_Hoy'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Asig_Hoy']+"</td>"
                                
                                if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Hoy'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Hoy'] > 0 && data.Usuarios[i]['Clientes'][x]['AsigEnt_Hoy'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['AsigEnt_Hoy']+"</td>"
                                
                                //-------------------------Hoy-------------------------
                                
                                html += "<th class = 'BorderCero'></th>"
                                
                                //-------------------------A Futuro-------------------------
                                if( data.Usuarios[i]['Clientes'][x]['Asig_Fut'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['Asig_Fut'] > 0 && data.Usuarios[i]['Clientes'][x]['Asig_Fut'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['Asig_Fut']+"</td>"
                                
                                if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Fut'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.Usuarios[i]['Clientes'][x]['AsigEnt_Fut'] > 0 && data.Usuarios[i]['Clientes'][x]['AsigEnt_Fut'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText "+Alert+"' style = '"+AlertCss+"'>"+data.Usuarios[i]['Clientes'][x]['AsigEnt_Fut']+"</td>"
                                
                                //-------------------------A Futuro-------------------------
                                
                                html += "<th class = 'BorderCero'></th>"
                            }
                            
                        html += "</tr>"
                    }
                html += "</table>"
                $(".ContenedorTablaReporte").html(html);
            }
        })
    }else{
        alert("Debe seleccionar un departamento.");
    }
}


function ReportVisualizarPendientes(Hu,Hc,Fc){
    $DataTable_TarePendientes = [];
    printDataAjax('0e1b513d8892d021763a850783e14916x', {HashUser:Hu,HashCliente:Hc, Factor:Fc}, data => {
        var html = "";
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Tareas Pendientes</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
        html += "<div class='modal-body'>";
            data.clientes.forEach(e => {
                $DataTable_TarePendientes[e.Hash] = null;
                html += "<div class='ContenedorMenu'>"
                    html += "<div class='panel-heading alert-primary BorderTop'>"
                        html += "<table class = 'table'>"
                            html += "<tr>"
                                html += "<td width = '90%' class = 'BlackFont'>"
                                    html += e.NombreComercial
                                html += "</td>"
                                html += "<td class = 'text-left' >"
                                    html += "<a href='#' class = 'PAR_ContentTRAPENDIENTETAREAS"+e.Hash+"' onclick = \"ContentList('TRAPENDIENTETAREAS"+e.Hash+"')\">"
                                        html += "<i  class='Cursor fas fa-angle-double-down'></i>"
                                    html += "</a>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"

                    html += "<div class = 'ContenedorOptionDiv PARDIV_ContentTRAPENDIENTETAREAS"+e.Hash+"' style ='display:none;' >"
                        html += "<div class = 'BarraIconos'>"
                        html += "</div>"
                        html += "<div class = 'form-row'>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<label for='OTC_TextBusqueda'>Buscar:</label>"
                                html += "<input type = 'text' autocomplete = 'off' class = 'form-control' id = 'OTTPendientes_TextBusqueda"+e.Hash+"' name = 'OTTPendientes_TextBusqueda"+e.Hash+"' />"
                            html += "</div>"
                            html += "<div class='col col-sm-3 my-2'>"
                                html += "<p></p>"
                                html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = \"buscarTablaNotificacionesPendientes("+e.Hash+","+Hu+","+Fc+")\"/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div style='overflow: auto; white-space: nowrap;'>"
                            html += "<table class='dataTable tableNew' id = 'TablaTraPendientes"+e.Hash+"'>"
                                html += "<thead>"
                                    html += "<tr>"
                                        html += "<th>Tarea</th>"
                                        html += "<th>Asunto</th>"
                                        html += "<th>OT</th>"
                                        html += "<th>Departamento</th>"
                                        html += "<th>Fecha Creacion</th>"
                                        html += "<th>Hora Creacion</th>"
                                        html += "<th>Creador</th>"
                                        html += "<th>Tipo Tarea</th>"
                                        html += "<th>No Adjuntos</th>"
                                        html += "<th>Fecha Entrega</th>"
                                        html += "<th>Hora Entrega</th>"
                                        html += "<th>Fecha Respuesta</th>"
                                        html += "<th>Hora Respuesta</th>"
                                        html += "<th>Estado</th>"
                                    html += "</tr>"
                                html += "</thead>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<br>"
            });
        html += "</div>";
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
        html += "</div>";

        $(".content_modal3").html(html);
        $("#ModalContentForm3").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm3").addClass('modal-dialog-scrollable');
        data.clientes.forEach(e => {
            tablaNotificacionesPendientes(e.Hash,Hu,Fc)
            ContentList('TRAPENDIENTETAREAS'+e.Hash)
        });
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        ModalEdit(0)
        myModal(1)
        
    })
}

function buscarTablaNotificacionesPendientes(idCliente,idUsuario,Factor) {
    $DataTable_TarePendientes[idCliente].destroy();
    //$DataTable_TarePendientes.draw();
    tablaNotificacionesPendientes(idCliente,idUsuario,Factor);
}

function tablaNotificacionesPendientes(idCliente,idUsuario,Factor) {
    $DataTable_TarePendientes[idCliente] = $('#TablaTraPendientes'+idCliente).DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'54351b7558b6f67f068ccd2205ac32f0x',
            'data':function (d) {
                d.search['parCliente'] = idCliente;
                d.search['parUsuario'] = idUsuario;
                d.search['parFactor'] = Factor;
                d.search['value'] = $("#OTTPendientes_TextBusqueda"+idCliente).val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            }
        },
        'columns': [
            {
                data: 'Numeracion',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    if (!full.IdTareaPadre) {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    } else {
                        return '<center> <span class = "_ContentOTR_'+full.Hash+' Cursor Hover" onclick="modalSubTareaOT(\''+full.Hash+'\', \''+full.Proyecto+'\', \''+full.CodigoProyecto+'\')">' + data + '</span></center>';
                    }
                }

           },
           {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'CodigoProyecto',
                "render": function (data, type, full, meta) {
                     return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                 }

            },
           {
               data: 'Departamento',
               "render": function (data, type, full, meta) {
                    return '<span> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </span>';
                }

            },
            {
                data: 'FechaCreacion',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTR_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraCreacion',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTD_'+full.Hash+'">' + data + '</span> </center>';
                    }

                },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'TipoTarea',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTE_'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Adjuntos',
                "render": function (data, type, full, meta) {
                        return '<center> <span class = "_ContentOTEM_'+full.Hash+'">' + data + '</span> </center>';
                    }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTC_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'HoraEntrega',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + data + '</span> </center>';
                }

            },
            {
                data: 'FechaRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'HoraRespuesta',
                "render": function (data, type, full, meta) {
                    return '<center> <span class = "_ContentOTU_'+full.Hash+'">' + ((data===null) ? '---' : data) + '</span> </center>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    return '<span class = "_ContentOTES_'+full.Hash+'">' + data + '</span>';
                }

            },
        ],
        "order": [[0, "asc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaTraPendientes'+idCliente).css({'width':'100%'})
}


function TRA_ViewInformeGeneralCuenta(){
    var html = ""

        TituloVentana = "Informe General Cuenta"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Empresa:</label>";
                    html += "<select class ='form-control' name = 'OTC_Empresa' id = 'OTC_Empresa' onchange='OTCliente.listasWithEmpresa(event)'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Cliente'>Cliente:</label>";
                    html += "<select class ='form-control' name = 'OTC_Cliente' id = 'OTC_Cliente'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Year'>Desde:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FInicio'/>"
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Year'>Hasta:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FFin'/>"
                html += "</div>";
                
                html += "<div class='col col-sm-2 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'GenerarInformeCuenta()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            html += "<div class = 'form-row BotonesExport' style = 'display:none;'>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BExcel.png' class = 'OptionIcon'onclick = 'generarReporteOTExcel()'/>";
                    html += "<span class = 'FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteOTExcel()'>Generar Reporte Excel</span>";
                html += "</div>";
                html += "<div class = 'BarraIconos col col-sm-4'>";
                    html += "<img src ='images/BPdf.png' class = 'OptionIcon'onclick = 'generarReporteOTPDF()'/>";
                    html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'generarReporteOTPDF()'>Generar Reporte PDF</span>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'ContenedorTablaReporte'></div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaInit()
    TablaOTTraCliente
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}

function GenerarInformeCuenta(){
    if( $("#OTC_Empresa").val() != '' ){
        if( $("#OTC_Cliente").val() != '' ){
            if( $("#OTC_FInicio").val() != '' ){
                if( $("#OTC_FFin").val() != '' ){
                    $.ajax({
                        type:'POST',
                        url:UrlGeneral + 'b5ee5d9f4234c819caeb03df9d3114cc',
                        data:{
                            idEmpresa:$("#OTC_Empresa").val(),
                            nameEmpresa:$('select[name="OTC_Empresa"] option:selected').text(),
                            idCliente:$("#OTC_Cliente").val(),
                            nameCliente:$('select[name="OTC_Cliente"] option:selected').text(),
                            FInicio:$("#OTC_FInicio").val(),
                            FFin:$("#OTC_FFin").val(),
                            _token:document.getElementsByName('_token')[0].value},
                        success:function(data){
                            if( data.success == true ){
                                var html = "";
                                var TotalProyectoMeses = [0,0,0,0,0,0,0,0,0,0,0,0];
                                var TotalTareasMeses = [0,0,0,0,0,0,0,0,0,0,0,0];
                                html += "<table width = '100%'>";
                                    html += "<tr>"
                                        html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '17'>PROYECTOS / OTS</th>"
                                    html += "</tr>"
                                    html += "<tr>"
                                        html += "<th class = 'CenterText cabecera_th_dark ' >Año</th>"
                                        html += "<th class = 'BorderCero'></th>"
                                        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                                    html += "</tr>"
                                    
                                    
                                    for(var i = 0; i < data.Proyectos.length; i++){
                                        html += "<tr>"
                                            html += "<th class = 'subtitulos_principales CenterText' >"+data.Proyectos[i]['Anio']+"</th>"
                                            html += "<th class = 'BorderCero'></th>"
                                            var yi = 0;
                                            for(var x = 0; x < data.Meses.length;x++){
                                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+data.Meses[x]+"</th>"
                                                if( yi == 2 ){
                                                    html += "<th class = 'BorderCero'></th>"
                                                    yi = 0;
                                                }else{
                                                        yi++;
                                                    }
                                            }
                                        html += "</tr>"
                                        
                                        for(var y = 0; y < data.Proyectos[i]['Productos'].length;y++){
                                            html += "<tr>"
                                                html += "<td class = 'td_cuerpo_table'>"+data.Proyectos[i]['Productos'][y]['NombreProducto']+"</td>"
                                                html += "<th class = 'BorderCero'></th>"
                                                yi = 0;
                                                for(var t = 0; t < data.Proyectos[i]['Productos'][y]['Meses'].length;t++){
                                                    html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+data.Proyectos[i]['Productos'][y]['Meses'][t].length+"</td>"
                                                    
                                                    TotalProyectoMeses[t] += parseInt(data.Proyectos[i]['Productos'][y]['Meses'][t].length);
                                                    if( yi == 2 ){
                                                        html += "<th class = 'BorderCero'></th>"
                                                        yi = 0;
                                                    }else{
                                                        yi++;
                                                    }
                                                    
                                                }
                                            html += "</tr>"
                                        }
                                        
                                        html += "<tr>"
                                            html += "<th class = 'cabecera_th_dark CenterText border_bottom_left border_bottom_right' >Total</th>"
                                            html += "<th class = 'BorderCero'></th>"
                                            yi = 0;
                                            for(var t = 0; t < 12;t++){
                                                html += "<th class = 'CenterText cabecera_th_dark border_bottom_left border_bottom_right' >"+TotalProyectoMeses[t]+"</th>"
                                                if( yi == 2 ){
                                                    html += "<th class = 'BorderCero'></th>"
                                                    yi = 0;
                                                }else{
                                                        yi++;
                                                    }
                                            }
                                        html += "</tr>"
                                    }
                                    
                                html += "</table>"
                                
                                html += "<br>"
                                
                                
                                //Tareas
                                html += "<table width = '100%'>";
                                    html += "<tr>"
                                        html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '17'>TAREAS</th>"
                                    html += "</tr>"
                                    html += "<tr>"
                                        html += "<th class = 'CenterText cabecera_th_dark ' >Año</th>"
                                        html += "<th class = 'BorderCero'></th>"
                                        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                                    html += "</tr>"
                                    
                                    
                                    for(var i = 0; i < data.Tareas.length; i++){
                                        html += "<tr>"
                                            html += "<th class = 'subtitulos_principales CenterText' >"+data.Tareas[i]['Anio']+"</th>"
                                            html += "<th class = 'BorderCero'></th>"
                                            var yi = 0;
                                            for(var x = 0; x < data.Meses.length;x++){
                                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+data.Meses[x]+"</th>"
                                                if( yi == 2 ){
                                                    html += "<th class = 'BorderCero'></th>"
                                                    yi = 0;
                                                }else{
                                                        yi++;
                                                    }
                                            }
                                        html += "</tr>"
                                        
                                        for(var y = 0; y < data.Tareas[i]['Productos'].length;y++){
                                            html += "<tr>"
                                                html += "<td class = 'td_cuerpo_table'>"+data.Tareas[i]['Productos'][y]['TipoTarea']+"</td>"
                                                html += "<th class = 'BorderCero'></th>"
                                                yi = 0;
                                                for(var t = 0; t < data.Tareas[i]['Productos'][y]['Meses'].length;t++){
                                                    html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+data.Tareas[i]['Productos'][y]['Meses'][t].length+"</td>"
                                                    
                                                    TotalTareasMeses[t] += parseInt(data.Tareas[i]['Productos'][y]['Meses'][t].length);
                                                    if( yi == 2 ){
                                                        html += "<th class = 'BorderCero'></th>"
                                                        yi = 0;
                                                    }else{
                                                        yi++;
                                                    }
                                                    
                                                }
                                            html += "</tr>"
                                        }
                                        
                                        html += "<tr>"
                                            html += "<th class = 'cabecera_th_dark CenterText border_bottom_left border_bottom_right' >Total</th>"
                                            html += "<th class = 'BorderCero'></th>"
                                            yi = 0;
                                            for(var t = 0; t < 12;t++){
                                                html += "<th class = 'CenterText cabecera_th_dark border_bottom_left border_bottom_right' >"+TotalTareasMeses[t]+"</th>"
                                                if( yi == 2 ){
                                                    html += "<th class = 'BorderCero'></th>"
                                                    yi = 0;
                                                }else{
                                                        yi++;
                                                    }
                                            }
                                        html += "</tr>"
                                    }
                                    
                                html += "</table>"
                                
                                $(".ContenedorTablaReporte").html(html)
                            }else{
                                AlertaMensajes("No se logró consultar los datos","error",3);
                            }
                        }
                    })
                }else{
                    alert("Debe ingresar una Fecha Válida.");
                }
            }else{
                alert("Debe ingresar una Fecha Válida.");
            }
        }else{
            alert("Debe seleccionar el Cliente.");
        }
    }else{
        alert("Debe seleccionar la Empresa.");
    }
}


function TRA_ViewMiInformeGeneral(){
    var html = ""
        
        TituloVentana = "Informe Cuenta"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
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
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'InformeCuentaData()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>Total Proyectos/OTs</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOtsGeneral'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = ' Global_OTs_Total'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                //html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>Proyectos/OTs Por Estado</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div class = 'Global_OTs_Total'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td ></td>"
                                html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                //html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Activas'>"
                                html += "<td class = 'Report_N2_Tittle'>OTs Abiertas</td>"
                                html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                            html += "</tr>"
                            html += "<tr class = 'Global_OTs_Cerradas '>"
                                html += "<td class = 'Report_N3_Tittle'>OTs Cerradas</td>"
                                html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                //html += "<td class = 'Report_N3_Tittle'><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-row'>";    
                //Totl por Producto.
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>Por País Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Pais'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Productos'>"
                        
                    html += "</div>"
                html += "</div>"
                
                //Total por Profesional.
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>Por Profesional Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Profesional'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Profesional'>"
                        
                    html += "</div>"
                html += "</div>"
                //Total por Departamento
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>Por Departamento Activas</th>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts_Departamento'></div>"
                    html += "</div>"
                    
                    html += "<hr>"
                    html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Departamento'>"
                        
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<hr>"
            html += "<div class = 'DetalleGraficas' id = 'DetalleGraficas' style = 'width:100%;'>"
            html += "</div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    //CargaLaboral.listUsuarios()
    //OTCliente.listaInit()
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    //$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    
}

function InformeCuentaData(){
    var html = "";
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'e2b67f3d0b438458c0c729db6f878e39',
        
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            Morris.Donut({
                element: 'Graph_TotalOtsGeneral',
                data: [

                  {label: "Total Ots", value: parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas),color:'#B9DED0'}
                ]
            });
            Morris.Donut({
                element: 'Graph_TotalOts',
                data: [

                  {label: "Cerradas", value: parseInt(data.OTs_Cerradas),color:'#FEDAA6'},
                  {label: "Activas", value: parseInt(data.OTs_Activas),color:'#B9DED0'}
                ]
            });
            $(".Global_OTs_Total .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)+parseInt(data.OTs_Activas)) )
            $(".Global_OTs_Cerradas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Cerradas)) )
            $(".Global_OTs_Activas .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.OTs_Activas)) )
            
            var Productos = [];
            var htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Producto'>"
                htmlProductos += "<table width = '100%'>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>% Piezas</td>"
                    htmlProductos += "</tr>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por País</td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalProductos)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalPiezasProductos)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                    htmlProductos += "</tr>"
                //htmlProductos += "</table>"
            //htmlProductos += "</div>"

            var i = data.Colors.length-1;
            data.OtsProductos.forEach(obj => {
                //htmlProductos += "<div class = 'Report_N2_Tittle Global_OTs_Producto' style = 'background-color:"+data.Colors[i]['NumColor']+"'>"
                    //htmlProductos += "<table>"
                    var PorcentajeOts = (100*parseInt(obj['Cantidad']))/(data.TotalProductos);
                    var PorcentajePiezas = (100*parseInt(obj['Piezas']))/(data.TotalPiezasProductos);
                        htmlProductos += "<tr>"
                            htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle Cursor NameDimensionProducto"+obj['Hash']+"' onclick = '_VisualDataOtsGeneral(2,"+obj['Hash']+")'>"+obj['Producto']+"</td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal' >"+formatNumber.new(parseInt(obj['Cantidad']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeOts.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Piezas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajePiezas.toFixed(1) )+" %</div></td>"
                        htmlProductos += "</tr>"
                    //htmlProductos += "</table>"
                //htmlProductos += "</div>"
                Productos.push({label:obj['Producto'],value:parseInt(obj['Cantidad']),color:data.Colors[i]['NumColor'], Piezas:parseInt(obj['Piezas']), Porcentaje_Ots: PorcentajeOts, Porcentaje_Piezas: PorcentajePiezas })
                i--;
            })
            htmlProductos += "</table>"
            htmlProductos += "</div>"
            $(".ReportData_Productos").html(htmlProductos);

            var Productos = Morris.Donut({
                element: 'Graph_TotalOts_Pais',
                data: Productos
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                displayData(i, row);
            });


            var Profesional = [];
            var i = data.Colors.length-1;
            htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Profesional'>"
                htmlProductos += "<table width = '100%'>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >% OTs</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;'>% Piezas</td>"
                    htmlProductos += "</tr>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por Profesional</td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalProfesional)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.TotalPiezasProfesional)+"</div></td>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>100 %</div></td>"
                    htmlProductos += "</tr>"
                //htmlProductos += "</table>"
            //htmlProductos += "</div>"
            data.OtsProfesional.forEach(obj => {
                //htmlProductos += "<div class = 'Report_N2_Tittle Global_OTs_Profesional' style = 'background-color:"+data.Colors[i]['NumColor']+"'>"
                    //htmlProductos += "<table>"
                    var PorcentajeOts = (100*parseInt(obj['Cantidad']))/(data.OTs_Activas);
                    var PorcentajePiezas = (100*parseInt(obj['Piezas']))/(data.TotalPiezasProfesional);
                        htmlProductos += "<tr>"
                            htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle Cursor NameDimensionProfesional"+obj['Hash']+"'onclick = '_VisualDataOtsGeneral(3,"+obj['Hash']+")'>"+obj['Profesional']+"</td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Cantidad']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajeOts.toFixed(1) )+" %</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(obj['Piezas']))+"</div></td>"
                            htmlProductos += "<td nowrap style = 'color:white;background-color:"+data.Colors[i]['NumColor']+"' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new( PorcentajePiezas.toFixed(1) )+" %</div></td>"
                        htmlProductos += "</tr>"
                    //htmlProductos += "</table>"
                //htmlProductos += "</div>"
                Profesional.push({label:obj['Profesional'],value:parseInt(obj['Cantidad']),color:data.Colors[i]['NumColor'], Piezas:parseInt(obj['Piezas']), Porcentaje_Ots: PorcentajeOts, Porcentaje_Piezas: PorcentajePiezas })
                i--;
            })
            htmlProductos += "</table>"
            htmlProductos += "</div>"
            $(".ReportData_Profesional").html(htmlProductos);
            Morris.Donut({
                element: 'Graph_TotalOts_Profesional',
                data: Profesional
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                console.log(row)
                displayData(i, row);
            });

            var Profesional = [];
            var i = data.Colors.length-1;
            htmlProductos = "";
            htmlProductos += "<div class = 'Global_OTs_Total_Profesional'>"
                htmlProductos += "<table width = '100%'>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td ></td>"
                        htmlProductos += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                        //htmlProductos += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                    htmlProductos += "</tr>"
                    htmlProductos += "<tr>"
                        htmlProductos += "<td class = 'Report_Firt_Tittle'>Total Por Departamento</td>"

                        htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(0)+"</div></td>"
                        //htmlProductos += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(0) + parseInt(data.Ots_Creativos[0]['Ots']) + parseInt(data.Ots_Ejecutivos[0]['Ots']) + data.Ots_PteCliente.length )+"</div></td>"
                        //htmlProductos += "<td><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(data.TotalPiezasProfesional)+"</span></td>"
                    htmlProductos += "</tr>"

                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle'>Creativos</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(0)+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
                    if( data.Ots_Creativos.length > 0 ){
                        Profesional.push({label:'Creativos',value:parseInt(data.Ots_Creativos[0]['Ots']),color:data.Colors[0]['NumColor']})
                    }
            

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'>Digital</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(0))+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
                    Profesional.push({label:'Digital',value:parseInt(0),color:data.Colors[1]['NumColor']}) 
            

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[2]['NumColor']+"' class = 'Report_N2_Tittle'>Ejecutivos</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[2]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(0)+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
                    if( data.Ots_Ejecutivos.length > 0 ){
                        Profesional.push({label:'Ejecutivos',value:parseInt(data.Ots_Ejecutivos[0]['Ots']),color:data.Colors[2]['NumColor']})
                    }
            

            
                    htmlProductos += "<tr>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle'>Pte Cliente</td>"
                        htmlProductos += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(data.Ots_PteCliente.length)+"</div></td>"
                        //htmlProductos += "<td nowrap><span class = 'Tittle_ReportTotal'>Piezas: "+formatNumber.new(parseInt(obj['Piezas']))+"</span></td>"
                    htmlProductos += "</tr>"
                htmlProductos += "</table>"
            htmlProductos += "</div>"
            Profesional.push({label:'Pte Cliente',value:parseInt(data.Ots_PteCliente.length),color:data.Colors[3]['NumColor']})


            $(".ReportData_Departamento").html(htmlProductos);
            Morris.Donut({
                element: 'Graph_TotalOts_Departamento',
                data: Profesional
            }).on('click', function (i, row) {  
                // Do your actions
                // Example:
                console.log(row)
                displayData(i, row);
            });
            html += "</table>"
            $('.FilterReport_YearOT_Data').html(html)
        }
    })
}

function TRA_ViewInformeUsuariosYara(){
    var html = ""
        

        TituloVentana = "Informe Usuarios"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                //Total Activas y Cerradas
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'>CAPACITACIONES - PROCESS</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    
                html += "</div>"
                html += "<hr>"
                //Total Activas y Cerradas
                html += "<div class='col col-sm-12 my-2 DataX'>";
                    
                html += "</div>"
            html += "</div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    //CargaLaboral.listUsuarios()
    //OTCliente.listaInit()
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    //$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'e2b67f3d0b438458c0c729db6f878e39x',
        
        data:{
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<table width = '100%'>"
                for( var i = 0; i < data.Productos.length;i++ ){
                    html += "<tr>"
                        html += "<th colspan = '3' class = 'TituloTablasResumen'>"+data.Productos[i]['Nombre']+"</th>"
                        html += "<td class = ''></td>"
                        html += "<th colspan = '2' class = 'TituloTablasResumen'>CAPACITACIÓN</th>"
                        html += "<td class = ''></td>"
                        html += "<th colspan = '4' class = 'TituloTablasResumen'>OTS</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>Nombre</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>Correo</th>"
                        html += "<td class = ''></td>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>¿Si/No?</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha</th>"
                        html += "<td class = ''></td>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>Activas</th>"
                        //html += "<th class = 'TablaReportes_TituloPrincipal'>Piezas</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal'>Pte Cliente</th>"
                        //html += "<th class = 'TablaReportes_TituloPrincipal'>Piezas</th>"
                    html += "</tr>"
                    for(var x = 0; x < data.Productos[i]['Usuarios'].length;x++){
                        html += "<tr>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(x+1)+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.Productos[i]['Usuarios'][x]['NombreUsuario']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.Productos[i]['Usuarios'][x]['Correo']+"</td>"
                            html += "<td class = ''></td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['Capacitacion']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.Productos[i]['Usuarios'][x]['FechaCap']+"</td>"
                            html += "<td class = ''></td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['OtsActivas']+"</td>"
                            //html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['OtsActivas']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['OtsPte']+"</td>"
                            //html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Productos[i]['Usuarios'][x]['OtsPte']+"</td>"
                        html += "</tr>"
                    }
                    html += "<tr><td><br></td><tr>"
                }
            html += "</table>"
            
            $('.DataX').html(html)
        }
    })
}


function displayData(i, row) {
    //$('#Graph_TotalOts_Pais svg text:first-child').html('<tspan dy="6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">'+row.label+'</tspan>');
    //$('#Graph_TotalOts_Pais svg text:last-child').html('<tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);font-size:14px;" dy="5">OTs: ' + row.value+' - Piezas: '+row.Piezas+'</tspan>');
}

function _VisualDataOtsGeneral(Tipo,Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'f309d8563d70b278a105255f8552d371',
        data:{
            Tipo:Tipo,
            Hash:Hash,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Titulo = "";
            var Namex = "";
            if( Tipo == 2 ){
                Titulo = "País "+$(".NameDimensionProducto"+Hash).text()
                Namex = $(".NameDimensionProducto"+Hash).text()
            }
            if( Tipo == 3 ){
                Titulo = "Profesional " + $(".NameDimensionProfesional"+Hash).text()
                Namex = $(".NameDimensionProfesional"+Hash).text()
                console.log($(".Profesionales"+Hash).text())
            }
            
            var Eje = data.ProyectosActivos.length - (data.PTE_Proyectos + data.Creativos_Proyectos);
            if( Eje < 0 ){
                Eje = (-1)*Eje;
            }
            var html = "";
                html += "<div class = 'MainGraf' style = 'width:100%;border:0px;'>"
                    html += "<div class = 'form-row'>";    
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<div class = 'MainGraf' style = 'width:100%;'>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<th class = 'Report_Firt_Tittle'>Total Departamento Activas "+Titulo+"</th>"
                                    html += "</tr>"
                                html += "</table>"
                                html += "<div class = 'ContentReportGraph' id = 'EstadosOTsClientesDistribucionTotal'></div>"
                            html += "</div>"

                            html += "<hr>"
                            html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Profesional'>"
                                html += "<div class = ' Global_OTs_Total_Profesional'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td ></td>"
                                            html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                            html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td class = 'Report_Firt_Tittle'>Total Por Departamento</td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas) + parseInt(data.Ejecutivos_Piezas) + parseInt(data.PTE_Piezas) )+"</div></td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<div class = 'MainGraf' style = 'width:100%;'>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<th class = 'Report_Firt_Tittle'>Departamento Activas "+Titulo+"</th>"
                                    html += "</tr>"
                                html += "</table>"
                                html += "<div class = 'ContentReportGraph' id = 'EstadosOTsClientesDistribucion'></div>"
                            html += "</div>"

                            html += "<hr>"
                            html += "<div style = 'height:200px;overflow-y:scroll;width:100%;' class = 'ReportData_Profesional'>"
                                var Summary = [];
                                Summary.push({label:"Creativos",value:parseInt(data.Creativos_Proyectos),color:data.Colors[0]['NumColor']})
                                //Summary.push({label:"Digital",value:parseInt(data.Digital_Proyectos),color:data.Colors[2]['NumColor']})
                                Summary.push({label:"Pendientes de Revisión Cliente",value:parseInt(data.PTE_Proyectos),color:data.Colors[3]['NumColor']})

                                
                                Summary.push({value:Eje,label:'Ejecutivos',color:data.Colors[1]['NumColor']});
                                Summary.push({value:data.TotalR1,label:'Solicitudes/R1',color:data.Colors[5]['NumColor']});

                                html += "<div class = 'Global_OTs_Total_Profesional'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td ></td>"
                                            html += "<td style = 'text-align:center;width:15%;' >OTs</td>"
                                            html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td class = 'Report_Firt_Tittle' >Total Proyectos/Ots Por Departamento</td>"
                                            html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td class = 'Report_Firt_Tittle'><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas) + parseInt(data.Ejecutivos_Piezas) + parseInt(data.PTE_Piezas) )+"</div></td>"
                                        html += "</tr>"
                                var TotalPiezas = 0;
                                        html += "<tr>"
                                            if( Tipo == 2 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",2)'>Solicitudes/R1</td>"
                                            }
                                            if( Tipo == 3 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",3)'>Solicitudes/R1</td>"
                                            }
                                            
                                            html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.TotalR1))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[5]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.TotalR1_Piezas))+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
											if( Tipo == 2 ){
												html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+"2)'>Creativos</td>"
											}
											if( Tipo == 3 ) {
												html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_ListarRequerimientos("+Hash+",3)'>Creativos</td>"
											}
											html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Proyectos))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[0]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.Creativos_Piezas))+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle'>Ejecutivos</td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle' nowrap ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(Eje)+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[1]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(Eje)+"</div></td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            if( Tipo == 2 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_GenerarListaOtsEntregables(2,256,4,0,"+Hash+")' >Pendiente Cliente</td>"
                                            }
                                            if( Tipo == 3 ){
                                                html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle Cursor' onclick = '_GenerarListaOtsEntregables(2,256,4,"+Hash+",0)'>Pendiente Cliente</td>"
                                            }

                                            html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.PTE_Proyectos))+"</div></td>"
                                            html += "<td style = 'color:white;background-color:"+data.Colors[3]['NumColor']+"' class = 'Report_N2_Tittle' nowrap><div class = 'Tittle_ReportTotal'>"+formatNumber.new(parseInt(data.PTE_Piezas))+"</div></td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                            html += "</div>"
                        html += "</div>"
                    html += "</div>"
                    
                html += "</div>"

                html += "<hr>"
                
                html += "<div style = 'width:100%;overflow-x:scroll;' class = 'DetalleOtsCliente'></div>"
                    
                $(".DetalleGraficas").html(html);
                
                Morris.Donut({
                    element: 'EstadosOTsClientesDistribucionTotal',
                    data: [{label:Namex,value:parseInt(Eje) + parseInt(data.Creativos_Proyectos) + parseInt(data.PTE_Proyectos),color:data.Colors[0]['NumColor']}]
                }).on('click', function (i, row) {  
                    // Do your actions
                    // Example:
                    displayData(i, row);
                });
                Morris.Donut({
                    element: 'EstadosOTsClientesDistribucion',
                    data: Summary
                }).on('click', function (i, row) {  
                    // Do your actions
                    // Example:
                    displayData(i, row);
                });

                window.location.hash = '#DetalleGraficas'
        }
    })
}

function _ListarRequerimientos(Hash,Tipo){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf862req',
        data:{
            Hash:Hash,
            Tipo:Tipo,
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var TotalPiezas = 0;
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th colspan = '12' class = 'Report_Firt_Tittle'>Requerimientos Pendientes de Gestión</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th nowrap>No</th>"
                    html += "<th nowrap># Requerimiento</th>"
                    html += "<th nowrap>Código OT</th>"
                    
                    html += "<th nowrap>Asunto</th>"
                    html += "<th nowrap>Nro. Piezas</th>"
                    html += "<th nowrap>Fecha Creación</th>"
                    html += "<th nowrap>Hora Creación</th>"
                    html += "<th nowrap>País / Producto</th>"
                    html += "<th nowrap>Profesional</th>"
                    html += "<th nowrap>Estado Actual</th>"
                    html += "<th nowrap>Fecha de Entrega</th>"
                    html += "<th nowrap>Ultimo Estatus</th>"
                    
                html += "</tr>"
                for( var i = 0; i < data.Info.length; i++ ){
                    var Options = "";
                        var Style = '';
                        if( data.Info[i]['IdEstado'] == 1 ){
                            Style = 'background-color:#ADEDAE;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'PTN_OT'>Pendiente de Cliente</option>"
                                Options += "<option value = 'DTN_OT'>Detener</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 2 ){
                            Style = 'background-color:#a03c3c;color:white;'
                            var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 3 ){
                            Style = 'background-color:#ff9e0d;'
                            Options = "<select class = 'form-control' style = 'width:200px;'  id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 4 ){
                            Style = 'background-color:#EABF5E;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        html += "<td nowrap class = 'CenterText '>"+data.Info[i]['NumRequerimiento']+"</td>"
                        html += "<td nowrap class = 'CenterText >"+data.Info[i]['NumOt']+"</td>"
                        html += "<td nowrap class = 'CenterText >"+data.Info[i]['NumOt']+"</td>"
                        
                        html += "<td nowrap >"+data.Info[i]['Asunto']+"</td>"
                        html += "<td nowrap class = 'CenterText'>"+data.Info[i]['NroPiezas']+"</td>"
                        html += "<td nowrap>"+data.Info[i]['FechaC']+"</td>"
                        html += "<td nowrap class = 'CenterText'>"+data.Info[i]['HoraC']+"</td>"
                        
                        html += "<td nowrap style = '"+Style+"' >"+data.Info[i]['Producto']+"</td>"
                        
                        
                        html += "<td nowrap >"+data.Info[i]['Creador']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['NEstado']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['FechaEntrega']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['Estatus']+"</td>"
                        //html += "<td class = 'CenterText'>"+formatNumber.new(Piezas)+"</td>"
                        
                    html += "</tr>"
                }
            html += "</table><br>"
            $(".DetalleOtsCliente").html(html);
        }
    });
}

function _GenerarListaOtsEntregables(OTC_Empresa,OTC_Cliente,parEstadoRep,ParProfesionales,ParProductosCliente){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf862',
        data:{
            OTC_Empresa:OTC_Empresa,
            OTC_Cliente:OTC_Cliente,
            parEstadoRep:parEstadoRep,
            ParProfesionales:ParProfesionales,
            ParProductosCliente:ParProductosCliente,
            OTC_TextBusqueda:'',
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var TotalPiezas = 0;
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th colspan = '12' class = 'Report_Firt_Tittle'>Pendiente de Cliente</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th nowrap>No</th>"
                    html += "<th nowrap>Código</th>"
                    html += "<th nowrap># Requerimiento</th>"
                    html += "<th nowrap>Fecha OT</th>"
                    html += "<th nowrap>Referencia</th>"
                    html += "<th nowrap>Acciones</th>"
                    html += "<th nowrap>País / Producto</th>"
                    html += "<th nowrap>Profesional</th>"
                    html += "<th nowrap>Estado Actual</th>"
                    html += "<th nowrap>Ubicada En</th>"
                    html += "<th nowrap>Fecha Ingreso</th>"
                    html += "<th nowrap>Fecha Entrega</th>"
                    //html += "<th nowrap>Nro. Entregables</th>"
                    
                html += "</tr>"
                for( var i = 0; i < data.Info.length; i++ ){
                    var Options = "";
                        var Style = '';
                        if( data.Info[i]['IdEstado'] == 1 ){
                            Style = 'background-color:#ADEDAE;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'PTN_OT'>Pendiente de Cliente</option>"
                                Options += "<option value = 'DTN_OT'>Detener</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 2 ){
                            Style = 'background-color:#a03c3c;color:white;'
                            var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 3 ){
                            Style = 'background-color:#ff9e0d;'
                            Options = "<select class = 'form-control' style = 'width:200px;'  id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 4 ){
                            Style = 'background-color:#EABF5E;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        html += "<td nowrap class = 'CenterText HashOt"+data.Info[i]['Hash']+"'>"+data.Info[i]['Codigo']+"</td>"
                        html += "<td nowrap class = 'CenterText '>"+data.Info[i]['Req']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['Fecha']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['Referencia_Proyecto']+"</td>"
                        html += "<td class = 'OptionsHashOt"+data.Info[i]['Hash']+"'>"+Options+"</td>"
                        html += "<td nowrap>"+data.Info[i]['Producto']+"</td>"
                        html += "<td nowrap>"+data.Info[i]['Profesional']+"</td>"
                        
                        html += "<td nowrap style = '"+Style+"' class = 'EstHashOt"+data.Info[i]['Hash']+"'>"+data.Info[i]['Estado_OT']+"</td>"
                        
                        var Deptos = "<ul>"
                        var Piezas = 0;
                        var FechaCreacion = "";
                        var FechaEntrega = "";
                        for(var t = 0; t < data.Info[i]['Ubicacion'].length; t++ ){
                            Piezas += parseInt(data.Info[i]['Ubicacion'][t]['Piezas']);
                            TotalPiezas += parseInt(data.Info[i]['Ubicacion'][t]['Piezas']);
                            Deptos += "<li>"+data.Info[i]['Ubicacion'][t]['Departamento']+"</li>"
                            
                            FechaCreacion = "<li>"+data.Info[i]['Ubicacion'][t]['FechaCreacion']+"</li>"
                            FechaEntrega = "<li>"+data.Info[i]['Ubicacion'][t]['FechaEntrega']+"</li>"
                        }
                        for(var t = 0; t < data.Info[i]['UbicacionFechas'].length; t++ ){
                            FechaCreacion = ""+data.Info[i]['UbicacionFechas'][t]['FechaCreacion']+""
                            FechaEntrega = ""+data.Info[i]['UbicacionFechas'][t]['FechaEntrega']+""
                        }
                        Deptos += "</ul>"
                        //FechaEntrega += "</ul>"
                        //Deptos += "</ul>"
                        html += "<td nowrap >"+Deptos+"</td>"
                        html += "<td nowrap >"+FechaCreacion+"</td>"
                        html += "<td nowrap >"+FechaEntrega+"</td>"
                        //html += "<td class = 'CenterText'>"+formatNumber.new(Piezas)+"</td>"
                        
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th class = '_EmpClie'></th>"
                    html += "<th class = '_EmpClie'></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    //html += "<th >"+TotalPiezas+"</th>"
                    html += "<th ></th>"
                html += "</tr>"
            html += "</table>"
            $(".DetalleOtsCliente").html(html);
        }
    });
}

function ViewCalendarioEntregasInforme(Tipo,Hash){
    if( $("#OTC_Empresa").val() != '' && $("#OTC_Cliente").val() != ''){
        $.ajax({
            type:'POST',
            url:UrlGeneral + 'bbffe93eaa6aad67ce339893233243a8',
            data:{
                OTC_Empresa:$("#OTC_Empresa").val(),
                OTC_Unidad:$("#OTC_Unidad").val(),
                OTC_Cliente:$("#OTC_Cliente").val(),
                Tipo:Tipo,
                Hash:Hash,
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Calendario de Entregas </span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    var TotalGeneralPiezas = 0;
                    for(var y = 0; y < data.Piezas.length; y++){
                        TotalGeneralPiezas += parseInt(data.Piezas[y]);
                    }

                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '"+((data.Fechas.length*3)+3)+"'>Calendario de Entregas Desde: "+data.MinDate+" Hasta: "+data.MaxDate+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<td class = 'cabecera_th_dark CenterText' colspan = '"+((data.Fechas.length*3)+3)+"'>Total Entregables Pendientes: "+formatNumber.new(TotalGeneralPiezas)+"</td>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<td colspan = '2' class = 'CenterText subtitulos_principales'>Usuario</td>"
                            html += "<td class = 'BorderCero'></td>"
                            for(var i = 0; i < data.Fechas.length;i++){
                                html += "<td colspan = '2' class = 'CenterText subtitulos_principales'>"+data.Fechas[i]+"</td>"
                                if( i < (data.Fechas.length-1) ){
                                    html += "<td class = 'BorderCero'></td>"
                                }
                            }
                        html += "</tr>"
                        var TotalPiezas = [];
                        for(var i = 0; i < data.Calendario.length;i++){
                            html += "<tr>"
                                html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;'>"
                                    //html += "<img onerror = this.src='images/foto.png' src = '"+UrlUniversal+"../storage/app/Usuarios/"+data.Calendario[i]['User'][0]['ImgUsuario']+"' class = 'rounded-circle' style = 'height:35px;'/>"
                                html += "</td>"
                                html += "<td  class = 'td_cuerpo_table' nowrap>"+data.Calendario[i]['User'][0]['NombreUsuario']+"</td>"
                                html += "<td class = 'BorderCero'></td>"
                                var Piezas = 0;
                                for(var y = 0; y < data.Calendario[i]['Data'].length; y++){
                                    var CantidadPiezas = 0;
                                    var Ots = "<ul style = 'width:150px;'>";

                                    for(var u = 0; u < data.Calendario[i]['Data'][y].length;u++){
                                        CantidadPiezas += parseInt( data.Calendario[i]['Data'][y][u]['Piezas'] )
                                        Ots += "<li style = 'width:100%;'>"+data.Calendario[i]['Data'][y][u]['Codigo']+"</li>";
                                    }

                                    Ots += "</ul>"
                                    html += "<td  nowrap class = 'td_cuerpo_table' style = 'vertical-align:middle;width:150px;'>"+Ots+"</td>"
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;width:40px;"+data.Calendario[i]['Color'][y]+"'>"+formatNumber.new(CantidadPiezas)+"</td>"


                                    if( y < (data.Calendario[i]['Data'].length-1) ){
                                        html += "<td class = 'BorderCero'></td>"
                                    }
                                    //Piezas += CantidadPiezas;
                                }
                                //TotalPiezas.push(Piezas)
                            html += "</tr>"
                        }
                        html += "<tr>"
                            html += "<td colspan = '3'></td>"
                        for(var y = 0; y < data.Piezas.length; y++){
                            html += "<td class = 'subtitulos_mes CenterText'>Total</td>"
                            html += "<td class = 'subtitulos_mes CenterText'>"+formatNumber.new(data.Piezas[y])+"</td>"
                            if( y < (data.Piezas.length-1) ){
                                html += "<td class = 'BorderCero'></td>"
                            }
                        }
                        html += "</tr>"

                    html += "</table>"
                
                html += "</div>";
                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit(0);
                ModalEdit2(1)
            }
        })
    }
}

function GenerarReportUser_Final(){
    if( $("#OTC_Empresa").val() != '' && $("#OTC_Cliente").val() != ''){
        //alert("Tenga en Cuenta que al momento de Generar este reporte se evaluará todo el proceso que ha realizado el usuario hasta la Fecha, por lo cual, puede demorarse en cargar.");
        $.ajax({
            type:'POST',
            url:UrlGeneral + '506d158fe0f6ca51eed93d801e4534e5C',
            data:{
                OTC_Empresa:$("#OTC_Empresa").val(),
                OTC_Unidad:$("#OTC_Unidad").val(),
                OTC_Cliente:$("#OTC_Cliente").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                
                var Text = "Producto";
                if( $("#OTC_Cliente").val() == 31590400 ){
                    Text = "País"
                }
                
                var html = "";
                html += "<div class = 'MainGraf' style = 'width:100%;'>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th class = 'TituloGraficasP'>Proyectos/OTs Cliente</th>"
                        html += "</tr>"
                    html += "</table>"
                    html += "<div style = 'height:350px;width:100%;' class = 'EstadosOTsClientes' id = 'EstadosOTsClientes'></div>"
                html += "</div>"
                
                html += "<br>"
                
                html += "<table width = '100%'>";
                    html += "<tr>"
                        html += "<th class = 'TituloTablasResumen' colspan = '9'>RESUMEN GENERAL</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th colspan = '2' class = 'CenterText TablaReportes_TituloPrincipal '>Concepto</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = ' TablaReportes_TituloPrincipal '>Valores</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '3' class = 'CenterText TablaReportes_TituloPrincipal '>Opciones</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>No.</th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Estado</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Cantidad</th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Calendario Por "+Text+"</th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Calendario Por Profesional</th>"
                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios '>Detalle Ots</th>"
                    html += "</tr>"
                    
                    var Porcen = 0;
                    html += "<tr>"
                        html += "<td class = 'CenterText TablaReportes_Cuerpo_Center' style = 'text-align:center;'>1</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Activas</td>"

                        html += "<th class = 'BorderCero'></th>"

                        html += "<td class = 'TablaReportes_Cuerpo_Center' >"
                            html += "<span class = 'Cursor'>"+formatNumber.new(data.ProyectosActivos)+"</span>" 
                        html += "</td>"
                        if( data.ProyectosActivos == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos/data.TotalOts)*100;
                        }
                        html += "<td class = 'TablaReportes_Cuerpo_Center' ><span>"+(Porcen.toFixed(2))+" %</span></td>"

                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(1,1)' />" 
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(2,1)' />" 
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsGeneral(1,0)' />" 
                        html += "</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center' style = 'text-align:center;'>2</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Cerradas</td>"

                        html += "<th class = 'BorderCero'></th>"

                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<span class = 'Cursor'>"+formatNumber.new(data.ProyectosCerrados)+"</span>" 
                        html += "</td>"
                        if( data.ProyectosActivos == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosCerrados/data.TotalOts)*100;
                        }
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(Porcen.toFixed(2))+" %</td>"

                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(1,0)' />" 
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(2,0)' />" 
                        html += "</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                            html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsGeneral(0,0)' />" 
                        html += "</td>"
                    html += "</tr>"
                    
                    html += "<tr>"
                        html += "<th class = 'TablaReportes_Total_Center' colspan = '2'>Total</th>"
                        html += "<th></th>"
                        html += "<th class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.TotalOts)+"</th>"
                        html += "<th class = 'TablaReportes_Total_Center'>100 %</th>"
                    html += "</tr>"
                html += "</table>"
                html += "<hr>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<div class = 'MainGraf' style = 'width:100%;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<th class = 'TituloGraficasS'>Ots vs Piezas Por "+Text+" Activo</th>"
                                html += "</tr>"
                            html += "</table>"
                            html += "<div style = 'height:650px;width:100%;' class = 'MainGraf EstadosOTsClientes_Producto' id = 'EstadosOTsClientes_Producto'></div>"
                        html += "</div>"
                        
                        html += "<br>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen' colspan = '20'>RESUMEN GENERAL</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<th colspan = '2' class = 'TablaReportes_TituloPrincipal '>Concepto</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '2'>Ots</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '2'>Piezas</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th colspan = '2' class = 'TablaReportes_TituloPrincipal '  colspan = '2'>Opciones</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>No.</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>"+Text+"</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Cantidad</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Porcentaje</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Cantidad</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Porcentaje</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Calendario Entregas</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Detalle Ots</th>"
                            html += "</tr>"
                            for(var i = 0; i < data.OtsProductos.length;i++){
                                var Porcen = 0;
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo Producto"+data.OtsProductos[i]['Hash']+"'>"+data.OtsProductos[i]['Producto']+"</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center '>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td ></td>"
                                                html += "<td >"+formatNumber.new(parseInt(data.OtsProductos[i]['Cantidad']))+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                        //html += "<span >"+formatNumber.new(parseInt(data.OtsProductos[i]['Cantidad']))+"</span>" 
                                    html += "</td>"
                                    if( data.ProyectosActivos == 0 ){
                                        Porcen =  0;
                                    }else{
                                        Porcen =  (parseInt(data.OtsProductos[i]['Cantidad'])/data.ProyectosActivos)*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(Porcen.toFixed(2))+" %</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                        html += "<span >"+formatNumber.new(parseInt(data.OtsProductos[i]['Piezas']))+"</span>" 
                                    html += "</td>"
                                    if( data.ProyectosActivos == 0 ){
                                        Porcen =  0;
                                    }else{
                                        Porcen =  (parseInt(data.OtsProductos[i]['Piezas'])/data.TotalPiezasProductos)*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(Porcen.toFixed(2))+" %</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                        html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(3,"+data.OtsProductos[i]['Hash']+")' />" 
                                    html += "</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center's>"
                                        html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsGeneral(2,"+data.OtsProductos[i]['Hash']+")' />" 
                                    html += "</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_Total_Center' colspan = '2'>Total</th>"
                                html += "<th></th>"
                                html += "<th class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.ProyectosActivos)+"</th>"
                                html += "<th class = 'TablaReportes_Total_Center'>100 %</th>"
                                html += "<th></th>"
                                html += "<th class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.TotalPiezasProductos)+"</th>"
                                html += "<th class = 'TablaReportes_Total_Center'>100 %</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<div class = 'MainGraf' style = 'width:100%;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<th class = 'TituloGraficasS'>Ots vs Piezas Por Profesional Activo</th>"
                                html += "</tr>"
                            html += "</table>"
                            html += "<div style = 'height:650px;width:100%;' class = 'MainGraf EstadosOTsClientes_Profesional' id = 'EstadosOTsClientes_Profesional'></div>"
                        html += "</div>"
                        html += "<br>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'TituloTablasResumen' colspan = '20'>RESUMEN GENERAL</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<th colspan = '2' class = 'TablaReportes_TituloPrincipal '>Concepto</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '2'>Ots</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '2'>Piezas</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th colspan = '2' class = 'TablaReportes_TituloPrincipal '  colspan = '2'>Opciones</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>No.</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Profesional</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Cantidad</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Porcentaje</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Cantidad</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Porcentaje</th>"
                                html += "<th class = 'BorderCero'></th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Calendario Entregas</th>"
                                html += "<th class = 'TablaReportes_TituloSecundarios '>Detalle Ots</th>"
                            html += "</tr>"
                            for(var i = 0; i < data.OtsProfesional.length;i++){
                                var Porcen = 0;
                                html += "<tr>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"+(i+1)+"</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo Profesionales"+data.OtsProfesional[i]['Hash']+"'>"+data.OtsProfesional[i]['Profesional']+"</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"
                                        html += "<span >"+formatNumber.new(parseInt(data.OtsProfesional[i]['Cantidad']))+"</span>" 
                                    html += "</td>"
                                    if( data.ProyectosActivos == 0 ){
                                        Porcen =  0;
                                    }else{
                                        Porcen =  (parseInt(data.OtsProfesional[i]['Cantidad'])/data.ProyectosActivos)*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"+(Porcen.toFixed(2))+" %</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"
                                        html += "<span >"+formatNumber.new(parseInt(data.OtsProfesional[i]['Piezas']))+"</span>" 
                                    html += "</td>"
                                    if( data.ProyectosActivos == 0 ){
                                        Porcen =  0;
                                    }else{
                                        Porcen =  (parseInt(data.OtsProfesional[i]['Piezas'])/data.TotalPiezasProductos)*100;
                                    }
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"+(Porcen.toFixed(2))+" %</td>"

                                    html += "<th class = 'BorderCero'></th>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"
                                        html += "<img src = 'images/Calendario.png' class = 'OptionIcon' onclick = 'ViewCalendarioEntregasInforme(4,"+data.OtsProfesional[i]['Hash']+")' />" 
                                    html += "</td>"
                                    html += "<td class = 'TablaReportes_Cuerpo_Center' >"
                                        html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsGeneral(3,"+data.OtsProfesional[i]['Hash']+")' />" 
                                    html += "</td>"
                                html += "</tr>"
                            }
                            html += "<tr>"
                                html += "<th class = 'TablaReportes_Total_Center' colspan = '2'>Total</th>"
                                html += "<th></th>"
                                html += "<th class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.ProyectosActivos)+"</th>"
                                html += "<th class = 'TablaReportes_Total_Center'>100 %</th>"
                                html += "<th></th>"
                                html += "<th class = 'TablaReportes_Total_Center'>"+formatNumber.new(data.TotalPiezasProductos)+"</th>"
                                html += "<th class = 'TablaReportes_Total_Center'>100 %</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row ContenedorDetalleProyectosReport'>";
                html += "</div>"
                
                $(".ContenedorTablaReporte").html(html);
                
                var Summary = [];
                Summary.push({ y: data.ProyectosCerrados, label:'Cerradas'}); 
                Summary.push({ y: data.ProyectosActivos, label:'Activas'}); 
                
                var Summary_Productos = [];
                var Summary_Productos_Piezas = [];
                for(var i = 0; i < data.OtsProductos.length;i++){
                    Summary_Productos.push({ y: parseInt(data.OtsProductos[i]['Cantidad']), label:data.OtsProductos[i]['Producto']}); 
                    Summary_Productos_Piezas.push({ y: data.OtsProductos[i]['Piezas'], label:data.OtsProductos[i]['Producto']}); 
                }
                
                var Summary_Profesionales = [];
                var Summary_Profesionales_Piezas = [];
                for(var i = 0; i < data.OtsProfesional.length;i++){
                    Summary_Profesionales.push({ y: parseInt(data.OtsProfesional[i]['Cantidad']), label:data.OtsProfesional[i]['Profesional']}); 
                    Summary_Profesionales_Piezas.push({ y: data.OtsProfesional[i]['Piezas'], label:data.OtsProfesional[i]['Profesional']}); 
                }
                
                var chart = new CanvasJS.Chart("EstadosOTsClientes", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "",
                        backgroundColor:"black",
                        fontColor:"white",
                        padding:5,
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 14,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            valueFormatString: "#,##",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });

                //Porcentaje:
                var dataPoint = chart.options.data[0].dataPoints;
                var total = data.TotalOts;
                for(var i = 0; i < dataPoint.length; i++) {
                    chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }
                chart.render();

                var chartPiezasx = new CanvasJS.Chart("EstadosOTsClientes_Producto", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "",
                        backgroundColor:"black",
                        fontColor:"white",
                        padding:5,
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 550,
			itemWidth: 120,
                        fontSize: 14,
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            indexLabelFontSize: 14,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            valueFormatString: "#,##",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary_Productos
                    }]
                });
                chartPiezasx.render();
                
                var chartProfesionales = new CanvasJS.Chart("EstadosOTsClientes_Profesional", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                    },
                    legend: {
			maxWidth: 550,
			itemWidth: 120,
                        fontSize: 14,
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            indexLabelFontSize: 14,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            valueFormatString: "#,##",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary_Profesionales
                    }]
                });
                /*
                var dataPoint = chart.options.data[0].dataPoints;
                var total = data.TotalProfesional;
                for(var i = 0; i < dataPoint.length; i++) {
                    chartProfesionales.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }*/
                chartProfesionales.render();
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            }
        });
    }else{
        alert("Debe seleccionar los campos Obligatorios");
    }
    
}

function GenerarReportUser(){
    if( $("#OTC_Empresa").val() != '' && $("#OTC_Cliente").val() != ''){
        alert("Tenga en Cuenta que al momento de Generar este reporte se evaluará todo el proceso que ha realizado el usuario hasta la Fecha, por lo cual, puede demorarse en cargar.");
        $.ajax({
            type:'POST',
            url:UrlGeneral + '506d158fe0f6ca51eed93d801e4534e5',
            data:{
                OTC_Empresa:$("#OTC_Empresa").val(),
                OTC_Unidad:$("#OTC_Unidad").val(),
                OTC_Cliente:$("#OTC_Cliente").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                
                var Text = "Producto";
                if( $("#OTC_Cliente").val() == 31590400 ){
                    Text = "País"
                }
                
                var html = "";
                html += "<div class = 'form-row FormsGeneral'>";
                    html += "<div class='col col-sm-12 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'>"
                            html += "<h5 >Total Proyectos / Ots</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.Proyectos)+"</div>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row FormsGeneral'>";    
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#ADEDAE;color:black;'>"
                            html += "<h5 >Activos</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosActivos)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#EABF5E;color:black;'>"
                            html += "<h5 >Pendiente Revisión Cliente</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosEnCliente)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#ff9e0d;'>"
                            html += "<h5 >Stand By / Detenido</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosDetenidos)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#a03c3c;'>"
                            html += "<h5 >Cerrados</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosCerrados)+"</div>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>";
                
                html += "<hr>"
                
                html += "<div class = 'form-row FormsGeneral'>";
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'> "
                            html += "<h5 >Abiertos en el Mes</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosMes)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'>"
                            html += "<h5 >Abiertos en la Semana</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosSemana)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'>"
                            html += "<h5 >Abiertos en la Semana Anterior</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.ProyectosAnterior)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'>"
                            html += "<h5 >Solicitudes Cliente</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.SolicitudesCliente)+"</div>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='col col-sm-3 my-1'>"
                        html += "<div class = 'CardReport' style = 'background-color:#696969;'>"
                            html += "<h5 >Ajustes/Reprocesos Cliente</h5>"
                            html += "<div class = 'container'>"+formatNumber.new(data.AjsRep)+"</div>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>";
                html += "<hr>"
                html += "<br>"
                html += "<br>"
                html += "<div style = 'height:350px;width:100%;' class = 'GrafSummaryClient' id = 'GrafSummaryClient'></div>"
                html += "<br>"
                html += "<table width = '100%'>";
                    html += "<tr>"
                        html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '20'>RESUMEN GENERAL</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Ejecutivos</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Activas</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Pendiente Revisión Cliente</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Stand By / Detenido</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Cerrados</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Tareas Pendientes</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Opciones</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Ejecutivo</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>"+Text+"</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Profesional</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.OtsClientes.length;i++){
                        var Porcen = 0;
                        html += "<tr>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                            html += "<td class = 'td_cuerpo_table'>"+data.OtsClientes[i]['NombreUsuario']+"</td>"
                            
                            html += "<th class = 'BorderCero'></th>"
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"
                                html += "<span class = 'Cursor'>"+formatNumber.new(data.OtsClientes[i]['Activos'])+"</span>" 
                            html += "</td>"
                            if( data.ProyectosActivos == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen =  (data.OtsClientes[i]['Activos']/data.ProyectosActivos)*100;
                            }
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                                
                            html += "<th class = 'BorderCero'></th>"
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+formatNumber.new(data.OtsClientes[i]['PteCliente'])+"</td>"
                            if( data.ProyectosEnCliente == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.OtsClientes[i]['PteCliente']/data.ProyectosEnCliente)*100;
                            }
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                            
                            html += "<th class = 'BorderCero'></th>"
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+formatNumber.new(data.OtsClientes[i]['Detenidos'])+"</td>"
                            if( data.ProyectosDetenidos == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.OtsClientes[i]['Detenidos']/data.ProyectosDetenidos)*100;
                            }
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                            
                            html += "<th class = 'BorderCero'></th>"
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+formatNumber.new(data.OtsClientes[i]['Cerrados'])+"</td>"
                            if( data.ProyectosCerrados == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.OtsClientes[i]['Cerrados']/data.ProyectosCerrados)*100;
                            }
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                            
                            html += "<th class = 'BorderCero'></th>"
                            
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"
                                html += "<span class = 'Cursor' onclick = 'VisualDataTareasPendientesCuenta("+$("#OTC_Cliente").val()+","+data.OtsClientes[i]['IdUsuario']+")'>"+data.OtsClientes[i]['TareasPendientes']+"</span>" 
                            html += "</td>"
                            if( data.TareasP == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.OtsClientes[i]['TareasPendientes']/data.TareasP)*100;
                            }
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                            
                            html += "<th class = 'BorderCero'></th>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"
                                html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsActivasCuentaEje("+$("#OTC_Cliente").val()+","+data.OtsClientes[i]['IdUsuario']+")' />" 
                            html += "</td>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"
                                html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'VisualDataOtsProfesionalActivasCuentaEje("+$("#OTC_Cliente").val()+","+data.OtsClientes[i]['IdUsuario']+")' />" 
                            html += "</td>"
                        html += "</tr>"
                    }
                    html += "<tr>"
                        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>"+data.ProyectosActivos+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                        html += "<th></th>"

                        html += "<th class = 'CenterText cabecera_th_dark '>"+data.ProyectosEnCliente+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>"+data.ProyectosDetenidos+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                        
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark ''>"+data.ProyectosCerrados+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                        
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark ''>"+data.TareasP+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<hr>"
                
                $(".ContenedorTablaReporte").html(html);
                
                var Summary = [];
                for(var i = 0; i < data.OtsClientes.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.OtsClientes[i]['Cantidad'], label:data.OtsClientes[i]['NombreUsuario']}); 
                }
                var chart = new CanvasJS.Chart("GrafSummaryClient", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Proyectos Activos Clientes",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 14,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });

                //Porcentaje:
                var dataPoint = chart.options.data[0].dataPoints;
                var total = data.ProyectosActivos;
                for(var i = 0; i < dataPoint.length; i++) {
                    chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }
                chart.render();

                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
                
                $(".h5, h5").css({'font-size': '1rem'})
            }
        });
    }else{
        alert("Debe seleccionar un Usuario");
    }
    
}

function VisualDataTareasPendientesCuenta(HashCliente,HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '86d820e566a342e7e37f7ec31dfbf78b',
        data:{
            HashCliente:HashCliente,
            HashUsuario:HashUsuario,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td style = 'text-align:right;'>"
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose Cursor' onclick = 'TRA_Report_RegresarInfoCuenta(1)'/>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            html += "<br>"
            html += "<div style = 'height:400px;width:100%;' class = 'GrafSummaryDepartament' id = 'GrafSummaryDepartament'></div>"
            html += "<br>"
            html += "<div class = 'flex-center'>"
                html += "<table >"
                    html += "<tr>"
                        html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Pendientes</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            html += "<br>"
            html += "<table width = '100%'>";
                html += "<tr>"
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '5'>RESUMEN TAREAS POR DEPARTAMENTO</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Departamento</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Pendientes</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales '>Departamento</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                html += "</tr>"
                
                var Summary = [];
                
                for(var i = 0; i < data.DepartamentosPendientes.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.DepartamentosPendientes[i]['Cantidad'], label:data.DepartamentosPendientes[i]['Nombre']}); 
                    var Porcen = 0;
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<td class = 'td_cuerpo_table'>"+data.DepartamentosPendientes[i]['Nombre']+"</td>"

                        html += "<th class = 'BorderCero'></th>"
                        var Alert = "";
                        var AlertCss = "";
                        
                        if( data.DepartamentosPendientes[i]['Cantidad'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.DepartamentosPendientes[i]['Cantidad'] > 0 && data.DepartamentosPendientes[i]['Cantidad'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span class = 'Cursor' onclick = 'VisualDataDetalleTareasPendientesDepto("+data.DepartamentosPendientes[i]['Id']+","+HashUsuario+")'>"+data.DepartamentosPendientes[i]['Cantidad']+"</span>" 
                        html += "</td>"
                        if( data.Total == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.DepartamentosPendientes[i]['Cantidad']/data.Total)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+data.Total+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                html += "</tr>"
            html += "</table>";
            html += "<div class = 'ContentInfoDivs DetalleDeptos'></div>"
            $(".ContenedorDetalleTablaReporte").html( html );
            
            var chartDeptos = new CanvasJS.Chart("GrafSummaryDepartament", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Tareas Pendientes Por Departamento",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 14,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });
            
            //Porcentaje:
            var dataPoint = chartDeptos.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartDeptos.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chartDeptos.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
                
            $(".ContenedorTablaReporte").hide("slow");
        }
    })
}

function VisualDataOtsActivasCuentaEje(HashCliente,HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '94ef88591e234a55d51120a2a0418284',
        data:{
            HashCliente:HashCliente,
            HashUsuario:HashUsuario,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td style = 'text-align:right;'>"
                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose Cursor' onclick = 'TRA_Report_RegresarInfoCuenta(1)'/>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            html += "<br>"
            html += "<div style = 'height:450px;width:100%;' class = 'GrafSummaryDepartament' id = 'GrafSummaryDepartament'></div>"
            html += "<br>"
            html += "<div class = 'flex-center'>"
                html += "<table >"
                    html += "<tr>"
                        html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Pendientes</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            html += "<br>"
            html += "<table width = '100%'>";
                html += "<tr>"
                    var Text = "Por Producto";
                    var Text2 = "Producto";
                    if( HashCliente == 31590400 ){
                        Text = " Por País";
                        Text2 = "País";
                    }
                    
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '20'>Resumen Proyectos / Ots Activas "+Text+"</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>"+Text2+"</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Ots Activas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Tareas Pendientes</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Solicitudes Nuevas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Ajustes/Reprocesos</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Otros</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Piezas</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>"+Text2+"</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                html += "</tr>"
                
                var Summary = [];
                var TotalSol = 0,TotalPorSol = 0;
                var TotalAjus = 0,TotalPorAjus = 0;
                var TotalOtros = 0,TotalPorOtros = 0;
                for(var i = 0; i < data.ProyectosActivos.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.ProyectosActivos[i]['Cantidad'], label:data.ProyectosActivos[i]['Nombre']}); 
                    var Porcen = 0;
                    var Alert = "";
                    var AlertCss = "";
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<td class = 'td_cuerpo_table NameProducto"+data.ProyectosActivos[i]['Id']+"'>"+data.ProyectosActivos[i]['Nombre']+"</td>"

                        html += "<th class = 'BorderCero'></th>"
                        
                        if( data.ProyectosActivos[i]['Cantidad'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Cantidad'] > 0 && data.ProyectosActivos[i]['Cantidad'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span class = 'Cursor' onclick = 'ViewOtsActivasProductoProfesional("+data.ProyectosActivos[i]['Id']+","+HashUsuario+")'>"+data.ProyectosActivos[i]['Cantidad']+"</span>" 
                        html += "</td>"
                        if( data.Total == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Cantidad']/data.Total)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        
                        html += "<th class = 'BorderCero'></th>"
                        
                        if( data.ProyectosActivos[i]['Pendientes'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Pendientes'] > 0 && data.ProyectosActivos[i]['Pendientes'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span class = 'Cursor' onclick = 'VisualDataDetalleTareasPendientesDepto("+data.ProyectosActivos[i]['Id']+","+HashUsuario+")'>"+data.ProyectosActivos[i]['Pendientes']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Pendientes']/data.TotalPendientes)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        
                        //sol
                        TotalSol += parseInt(data.ProyectosActivos[i]['SolicitudesCliente']);
                        if( data.ProyectosActivos[i]['SolicitudesCliente'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['SolicitudesCliente'] > 0 && data.ProyectosActivos[i]['SolicitudesCliente'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['SolicitudesCliente']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['SolicitudesCliente']/data.TotalPendientes)*100;
                        }
                        TotalPorSol += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        //Ajustes
                        TotalAjus += parseInt(data.ProyectosActivos[i]['AjsRep']);
                        if( data.ProyectosActivos[i]['AjsRep'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['AjsRep'] > 0 && data.ProyectosActivos[i]['AjsRep'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['AjsRep']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['AjsRep']/data.TotalPendientes)*100;
                        }
                        TotalPorAjus += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        //Otros
                        TotalOtros += parseInt(data.ProyectosActivos[i]['Otros']);
                        if( data.ProyectosActivos[i]['Otros'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Otros'] > 0 && data.ProyectosActivos[i]['AjsRep'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['Otros']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Otros']/data.TotalPendientes)*100;
                        }
                        TotalPorOtros += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        
                        if( data.ProyectosActivos[i]['Piezas'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Piezas'] > 0 && data.ProyectosActivos[i]['Piezas'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span class = 'Cursor' onclick = 'VisualDataDetalleTareasPendientesDepto("+data.ProyectosActivos[i]['Id']+","+HashUsuario+")'>"+data.ProyectosActivos[i]['Piezas']+"</span>" 
                        html += "</td>"
                        if( data.TotalPiezas == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Piezas']/data.TotalPiezas)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.Total)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalPendientes)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalSol)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorSol.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalAjus)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorAjus.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalOtros)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorOtros.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalPiezas)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                html += "</tr>"
            html += "</table>";
            html += "<div class = 'ContentInfoDivs DetalleDeptos' id = 'DetalleDeptos'></div>"
            $(".ContenedorDetalleTablaReporte").html( html );
            
            var chartDeptos = new CanvasJS.Chart("GrafSummaryDepartament", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Proyectos / OTs Activas "+Text,
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 14,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });
            
            //Porcentaje:
            var dataPoint = chartDeptos.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartDeptos.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chartDeptos.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
                
            $(".ContenedorTablaReporte").hide("slow");
        }
    })
}

function VisualDataOtsProfesionalActivasCuentaEje(HashCliente,HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '94ef88591e234a55d51120a2a0418284P',
        data:{
            HashCliente:HashCliente,
            HashUsuario:HashUsuario,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<br>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td style = 'width:50%;'>"
                        html += "<div style = 'height:600px;width:100%;' class = 'GrafSummaryDepartament' id = 'GrafSummaryDepartament'></div>"
                        html += "<br>"
                    html += "</td>"
                    html += "<td style = 'width:50%;'>"
                        html += "<div style = 'height:600px;width:100%;' class = 'GrafSummaryDepartament' id = 'GrafSummaryDepartamentPiezas'></div>"
                    html += "</td>"
                html += "</tr>"
                html += "<tr>"
                    html += "<td colspan = '2'><div style = 'height:600px;width:100%;' class = 'TotalGrafSummaryDepartament' id = 'TotalGrafSummaryDepartament'></div></td>"
                html += "</tr>"
            html += "</table>"
            
            
            html += "<div class = 'flex-center'>"
                html += "<table >"
                    html += "<tr>"
                        html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Pendientes</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            html += "<br>"
            html += "<div style = 'width:100%;overflow-x:scroll;'>"
            html += "<table width = '100%'>";
                html += "<tr>"
                    var Text = "Por Producto";
                    var Text2 = "Producto";
                    if( HashCliente == 31590400 ){
                        Text = " Por País";
                        Text2 = "País";
                    }
                    
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '30'>Resumen Proyectos / Ots Activos - Pendientes Aprobación Cliente</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Profesionales</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Proyectos/Ots</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Piezas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Activo</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Pendiente de Cliente</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '1' class = 'CenterText cabecera_th_dark '>Opciones</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Profesinoal</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No. Proyectos/Ots</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No. Piezas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No. Proyectos/Ots</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No. Piezas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Detalle</th>"
                html += "</tr>"
                
                var Summary = [];
                var SummaryPiezas = [];
                var _Summary = [];
                var _SummaryPiezas = [];
                var TotalSol = 0,TotalPorSol = 0;
                var TotalAjus = 0,TotalPorAjus = 0;
                var TotalOtros = 0,TotalPorOtros = 0;
                for(var i = 0; i < data.ProyectosActivos.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.ProyectosActivos[i]['Activos'], label:data.ProyectosActivos[i]['Nombre']}); 
                    SummaryPiezas.push({ color: data.Colors[i]['NumColor'] ,y: data.ProyectosActivos[i]['Activos_Piezas'], label:data.ProyectosActivos[i]['Nombre']}); 
                    _Summary.push({ y: data.ProyectosActivos[i]['Activos'], label:data.ProyectosActivos[i]['Nombre']}); 
                    _SummaryPiezas.push({ y: data.ProyectosActivos[i]['Activos_Piezas'], label:data.ProyectosActivos[i]['Nombre']}); 
                    var Porcen = 0;
                    var Alert = "";
                    var AlertCss = "";
                    
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<td nowrap class = 'td_cuerpo_table NameProducto"+data.ProyectosActivos[i]['Id']+"'>"+data.ProyectosActivos[i]['Nombre']+"</td>"

                        html += "<th class = 'BorderCero'></th>"
                        
                        if( data.ProyectosActivos[i]['Activos'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Activos'] > 0 && data.ProyectosActivos[i]['Activos'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['Activos']+"</span>" 
                        html += "</td>"
                        if( data.Total == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Activos']/data.Total)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        
                        
                        //Activo - Piezas
                        html += "<th class = 'BorderCero'></th>"
                        if( data.ProyectosActivos[i]['Activos_Piezas'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Activos_Piezas'] > 0 && data.ProyectosActivos[i]['Activos_Piezas'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['Activos_Piezas']+"</span>" 
                        html += "</td>"
                        if( data.Activo_TotalPiezas == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Activos_Piezas']/data.Activo_TotalPiezas)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        
                        //Activo - Piezas
                        html += "<th class = 'BorderCero'></th>"
                        if( data.ProyectosActivos[i]['Act'].length > 0 ){
                            if( data.ProyectosActivos[i]['Act'][0]['Cantidad'] == 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }else if( data.ProyectosActivos[i]['Act'][0]['Cantidad'] > 0 && data.ProyectosActivos[i]['Act'][0]['Cantidad'] <= 10 ){
                                Alert = "AlertMed";
                                AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                            }else{
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                                html += "<span >"+data.ProyectosActivos[i]['Act'][0]['Cantidad']+"</span>" 
                            html += "</td>"
                            if( data.ProyectosActivos[i]['Act'][0]['Piezas'].length > 0){
                                if( data.ProyectosActivos[i]['Act'][0]['Piezas'][0]['Piezas'] == 0 ){
                                    Alert = "AlertPost";
                                    AlertCss = "background-color:green;color:white;font-weight:bold;";
                                }else if( data.ProyectosActivos[i]['Act'][0]['Piezas'][0]['Piezas'] > 0 && data.ProyectosActivos[i]['Act'][0]['Piezas'][0]['Piezas'] <= 10 ){
                                    Alert = "AlertMed";
                                    AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                                }else{
                                    Alert = "AlertNeg";
                                    AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                                }
                                html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                                    var Piezas_Temp = 0;
                                    for(var yo = 0; yo < data.ProyectosActivos[i]['Act'][0]['Piezas'].length; yo++){
                                        Piezas_Temp += parseInt(data.ProyectosActivos[i]['Act'][0]['Piezas'][yo]['Piezas'])
                                    }
                                    html += "<span >"+Piezas_Temp+"</span>" 
                                html += "</td>"
                            }else{
                                html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>0</td>"
                            }
                            
                            
                        }else{
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>0</td>"
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>0.00 %</td>"
                        }
                        
                        html += "<th class = 'BorderCero'></th>"
                        if( data.ProyectosActivos[i]['Pte'].length > 0 ){
                            if( data.ProyectosActivos[i]['Pte'][0]['Cantidad'] == 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }else if( data.ProyectosActivos[i]['Pte'][0]['Cantidad'] > 0 && data.ProyectosActivos[i]['Pte'][0]['Cantidad'] <= 10 ){
                                Alert = "AlertMed";
                                AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                            }else{
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                                html += "<span >"+data.ProyectosActivos[i]['Pte'][0]['Cantidad']+"</span>" 
                            html += "</td>"
                            
                            if( data.ProyectosActivos[i]['Pte'][0]['Piezas'][0]['Piezas'] == 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }else if( data.ProyectosActivos[i]['Pte'][0]['Piezas'][0]['Piezas'] > 0 && data.ProyectosActivos[i]['Pte'][0]['Piezas'][0]['Piezas'] <= 10 ){
                                Alert = "AlertMed";
                                AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                            }else{
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                                var Piezas_Temp = 0;
                                for(var yo = 0; yo < data.ProyectosActivos[i]['Pte'][0]['Piezas'].length; yo++){
                                    Piezas_Temp += parseInt(data.ProyectosActivos[i]['Pte'][0]['Piezas'][yo]['Piezas'])
                                }
                                html += "<span >"+Piezas_Temp+"</span>" 
                            html += "</td>"
                            
                        }else{
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>0</td>"
                            html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>0.00 %</td>"
                        }
                        
                        //Activo - Ajustes
                        html += "<th class = 'BorderCero'></th>"
                        
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"
                            html += "<img src = 'images/detalle.png' class = 'OptionIcon' onclick = 'ViewOtsActivasProducto("+data.ProyectosActivos[i]['Id']+",0,"+HashUsuario+")' />" 
                        html += "</td>"
                        
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.Total)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalPiezas)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalActivo)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.PiezasActivo)+"</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalPte)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.PiezasPte)+"</th>"
                html += "</tr>"
            html += "</table>";
            html += "</div>";
           html += "<div class = 'ContentInfoDivs DetalleOtsProf'></div>"
            $(".ContenedorDetalleTablaReporte").html( html );
            
            
            var chartDeptos = new CanvasJS.Chart("GrafSummaryDepartament", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Proyectos/Ots por Profesional",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    axisY:{
                        labelFontSize: 12,
                    },
                    axisX:{
                        interval: 1,
                        labelFontSize: 12,
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 12,
                        showInLegend:false,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "bar",
                            indexLabelFontSize:12,
                            showInLegend: false,
                            yValueFormatString: "##0",
                            legendText: "{y}",
                            indexLabel: "{y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });
            
            //Porcentaje:
            /*
            var dataPoint = chartDeptos.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartDeptos.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }*/
            chartDeptos.render();
            
            var chartPiezas = new CanvasJS.Chart("GrafSummaryDepartamentPiezas", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Piezas Por Profesional",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    axisY:{
                        labelFontSize: 12,
                    },
                    axisX:{
                        interval: 1,
                        labelFontSize: 12,
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 12,
                        showInLegend:false,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "bar",
                            indexLabelFontSize:12,
                            showInLegend: false,
                            yValueFormatString: "##0",
                            legendText: "{y}",
                            indexLabel: "{y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  SummaryPiezas
                    }]
                });
            
            //Porcentaje:
            /*var dataPoint = chartDeptos.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartPiezas.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }*/
            chartPiezas.render();
            
            
            
            var chartPiezasx = new CanvasJS.Chart("TotalGrafSummaryDepartament", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Piezas Por Profesional",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    axisY:{
                        labelFontSize: 12,
                    },
                    axisX:{
                        interval: 1,
                        labelFontSize: 12,
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        fontSize: 12,
                        showInLegend:false,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [
                        {
                            type: "bar",
                            indexLabelFontSize:12,
                            showInLegend: false,
                            name:"Piezas",
                            yValueFormatString: "##0",
                            legendText: "{y}",
                            indexLabel: "{y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  _SummaryPiezas,
                            Color:"red"
                        },
                        {
                            type: "bar",
                            indexLabelFontSize:12,
                            name:"Ots",
                            showInLegend: false,
                            yValueFormatString: "##0",
                            legendText: "{y}",
                            indexLabel: "{y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  _Summary,
                            Color:"blue"
                        }
                ]
                });
                chartPiezasx.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
                
            //$(".ContenedorTablaReporte").hide("slow");
        }
    })
}

function VisualDataDetalleTareasPendientesDepto(HashDepto, HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '7ed64370201d459f4e2ca918d26f2ffd',
        data:{
            HashDepto:HashDepto,
            HashUsuario:HashUsuario,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<br><hr>";
            html += "<div style = 'height:400px;width:100%;' class = 'GrafSummaryDepartamentUser' id = 'GrafSummaryDepartamentUser'></div>"
            html += "<br>"
            html += "<div class = 'flex-center'>"
                html += "<table >"
                    html += "<tr>"
                        html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Pendientes</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            html += "<br>"
            html += "<table width = '100%'>";
                html += "<tr>"
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '8'>Resumen Tareas Usuarios</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Usuario</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Pendientes</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Piezas</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Usuario</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                html += "</tr>"
                
                var Summary = [];
                
                for(var i = 0; i < data.DetalleDepartamento.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.DetalleDepartamento[i]['Cantidad'], label:data.DetalleDepartamento[i]['NombreUsuario']}); 
                    var Porcen = 0;
                    var Alert = "";
                    var AlertCss = "";
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<td class = 'td_cuerpo_table'>"+data.DetalleDepartamento[i]['NombreUsuario']+"</td>"

                        html += "<th class = 'BorderCero'></th>"
                        if( data.DetalleDepartamento[i]['Cantidad'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.DetalleDepartamento[i]['Cantidad'] > 0 && data.DetalleDepartamento[i]['Cantidad'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.DetalleDepartamento[i]['Cantidad']+"</span>" 
                        html += "</td>"
                        if( data.Total == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.DetalleDepartamento[i]['Cantidad']/data.Total)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        //-----
                        html += "<th class = 'BorderCero'></th>"
                        if( data.DetalleDepartamento[i]['Piezas'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.DetalleDepartamento[i]['Piezas'] > 0 && data.DetalleDepartamento[i]['Piezas'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.DetalleDepartamento[i]['Piezas']+"</span>" 
                        html += "</td>"
                        if( data.TotalPiezas == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.DetalleDepartamento[i]['Piezas']/data.TotalPiezas)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+data.Total+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+data.TotalPiezas+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                html += "</tr>"
            html += "</table>";
            html += "<div class = 'ContentInfoDivs DetalleDeptosSemaforo'></div>"
            $(".DetalleDeptos").html( html );
            
            var chartDeptosUser = new CanvasJS.Chart("GrafSummaryDepartamentUser", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Tareas Pendientes Por Usuario",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });
            
            //Porcentaje:
            var dataPoint = chartDeptosUser.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartDeptosUser.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chartDeptosUser.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
                
            $(".ContenedorTablaReporte").hide("slow");
        }
    })
}

function TRA_Report_RegresarInfoCuenta(val){
    if( val == 1 ){
        $(".ContenedorTablaReporte").show("slow");
    }
}

function ViewOtsActivasProductoProfesional(HashProducto,HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '94ef88591e234a55d51120a2a0418284E',
        data:{
            HashProducto:HashProducto,
            HashUsuario:HashUsuario,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<br><hr>";
            html += "<div style = 'height:400px;width:100%;' class = 'GrafSummaryDepartamentUserProf' id = 'GrafSummaryDepartamentUserProf'></div>"
            html += "<br>"
            /*
            html += "<div style ='width:100%;overflow-x:scroll;'>"
                html +="<table style = 'width:"+((220*data.Date.length)+300)+"px'>"
                    html += "<tr>"
                        html += "<td class= ''></td>"
                        html += "<td class = 'BorderCero'></td>"
                        for(var t = 0; t < data.Date.length;t++){
                            html += "<td  class = 'CenterText subtitulos_principales border_top' colspan = '2' style = 'width:210px;font-weight:bold;'>"+data.Date[t]['NameDate']+"</td>"
                            if( t < (data.Date.length-1) ){
                                html += "<td class = 'BorderCero'></td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'CenterText cabecera_th_dark' >Profesional</td>"
                        html += "<td class = 'BorderCero'></td>"
                        for(var t = 0; t < data.Date.length;t++){
                            html += "<td  class = 'CenterText cabecera_th_dark ' style = 'width:150px' style = 'background-color:#d0d0d0;'>Proyecto / Ots</td>"
                            html += "<td  class = 'CenterText cabecera_th_dark ' style = 'width:50px' style = 'background-color:#d0d0d0;'>Nro. Piezas</td>"
                            if( t < (data.Date.length-1) ){
                                html += "<td class = 'BorderCero'></td>"
                            }
                        }
                    html += "</tr>"
                    html += "<tr><td></td></tr>"
                    var Totales = [];
                    for(var t = 0; t < data.ProyectosActivos.length;t++){
                        html += "<tr>"
                            html += "<td  class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[t]['Profesional']+"</td>"
                            html += "<td class = 'BorderCero'></td>"
                            
                            for(var xx = 0; xx < data.Date.length;xx++){
                                if( data.ProyectosActivos[t]['Info'][xx].length == 0 ){
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;'></td>"
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;'>0</td>"
                                    if( xx < (data.Date.length-1) ){
                                    html += "<td class = 'BorderCero'></td>"
                                }
                                }else{
                                    var Ots = "<ul>";
                                    var Piezas = 0;
                                    for(var p = 0; p < data.ProyectosActivos[t]['Info'][xx].length;p++){
                                        Piezas += parseInt(data.ProyectosActivos[t]['Info'][xx][p]['Piezas']);
                                        Totales[xx] = parseInt(Totales[xx]) + parseInt(data.ProyectosActivos[t]['Info'][xx][p]['Piezas']);
                                        Ots += "<li >"+data.ProyectosActivos[t]['Info'][xx][p]['Codigo']+"</li>"
                                    }
                                    Ots += "</ul>"
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;vertical-align:middle;"+data.Date[xx]['Color']+"' nowrap>"+Ots+"</td>"
                                    html += "<td  class = 'td_cuerpo_table' style = 'text-align:center;"+data.Date[xx]['Color']+"'>"+formatNumber.new(Piezas)+"</td>"
                                    if( xx < (data.Date.length-1) ){
                                        html += "<td class = 'BorderCero'></td>"
                                    }
                                }
                            }
                        html += "</tr>"
                    }
                    //Total
                    html += "<tr>"
                        html += "<td  class = 'cabecera_th_dark' nowrap>Total</td>"
                        html += "<td class = 'BorderCero'></td>"

                        for(var xx = 0; xx < data.Date.length;xx++){
                            html += "<td  ></td>"
                            html += "<td  class = 'cabecera_th_dark' style = 'text-align:center;'>"+formatNumber.new(data.Date[xx]['TotalDia'])+"</td>"
                            if( xx < (data.Date.length-1) ){
                                html += "<td class = 'BorderCero'></td>"
                            }

                        }
                    html += "</tr>"
                html +="</table>"
            html +="</div>"*/
            html += "<br>"
            html += "<div class = 'flex-center'>"
                html += "<table >"
                    html += "<tr>"
                        html += "<td style = 'width:200px;' class = 'AlertPost TablePaddingGeneral CenterText' >0 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertMed TablePaddingGeneral CenterText' >De 1 a 10 Pendientes</td>"
                        html += "<td class = 'BorderCero'></td>"
                        html += "<td style = 'width:200px;' class = 'AlertNeg TablePaddingGeneral CenterText' >Más de 10 Pendientes</td>"
                    html += "</tr>"
                html += "</table>"
            html += "</div>"
            html += "<br>"
            html += "<table width = '100%'>";
                html += "<tr>"
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '17'>Resumen Proyectos/Ots Profesionales Cliente "+$(".NameProducto"+HashProducto).text()+"</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Profesional</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Proyectos / Ots</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Solicitudes Nuevas</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Ajustes/Reprocesos</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Otros</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Piezas</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>No.</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Profesional</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Cantidad</th>"
                    html += "<th class = 'CenterText subtitulos_principales ' style = 'background-color:#d0d0d0;'>Porcentaje</th>"
                html += "</tr>"
                
                var Summary = [];
                var TotalSol = 0,TotalPorSol = 0;
                var TotalAjus = 0,TotalPorAjus = 0;
                var TotalOtros = 0,TotalPorOtros = 0;
                for(var i = 0; i < data.ProyectosActivos.length;i++){
                    Summary.push({ color: data.Colors[i]['NumColor'],y: data.ProyectosActivos[i]['Cantidad'], label:data.ProyectosActivos[i]['Profesional']}); 
                    var Porcen = 0;
                    var Alert = "";
                    var AlertCss = "";
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<td class = 'td_cuerpo_table'>"+data.ProyectosActivos[i]['Profesional']+"</td>"

                        html += "<th class = 'BorderCero'></th>"
                        if( data.ProyectosActivos[i]['Cantidad'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Cantidad'] > 0 && data.ProyectosActivos[i]['Cantidad'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span onclick = 'ViewOtsActivasProducto("+data.ProyectosActivos[i]['Id']+","+HashProducto+","+HashUsuario+")'>"+data.ProyectosActivos[i]['Cantidad']+"</span>" 
                        html += "</td>"
                        if( data.Total == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Cantidad']/data.Total)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        //-----
                        html += "<th class = 'BorderCero'></th>"
                        
                        //sol
                        TotalSol += parseInt(data.ProyectosActivos[i]['SolicitudesCliente']);
                        if( data.ProyectosActivos[i]['SolicitudesCliente'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['SolicitudesCliente'] > 0 && data.ProyectosActivos[i]['SolicitudesCliente'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['SolicitudesCliente']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['SolicitudesCliente']/data.TotalPendientes)*100;
                        }
                        TotalPorSol += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        //Ajustes
                        TotalAjus += parseInt(data.ProyectosActivos[i]['AjsRep']);
                        if( data.ProyectosActivos[i]['AjsRep'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['AjsRep'] > 0 && data.ProyectosActivos[i]['AjsRep'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['AjsRep']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['AjsRep']/data.TotalPendientes)*100;
                        }
                        TotalPorAjus += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                        
                        //Otros
                        TotalOtros += parseInt(data.ProyectosActivos[i]['Otros']);
                        if( data.ProyectosActivos[i]['Otros'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Otros'] > 0 && data.ProyectosActivos[i]['AjsRep'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['Otros']+"</span>" 
                        html += "</td>"
                        if( data.TotalPendientes == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Otros']/data.TotalPendientes)*100;
                        }
                        TotalPorOtros += Porcen;
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "<th class = 'BorderCero'></th>"
                
                        if( data.ProyectosActivos[i]['Piezas'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Piezas'] > 0 && data.ProyectosActivos[i]['Piezas'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"
                            html += "<span >"+data.ProyectosActivos[i]['Piezas']+"</span>" 
                        html += "</td>"
                        if( data.TotalPiezas == 0 ){
                            Porcen =  0;
                        }else{
                            Porcen =  (data.ProyectosActivos[i]['Piezas']/data.TotalPiezas)*100;
                        }
                        html += "<td class = 'CenterText td_cuerpo_table "+Alert+"' style = 'text-align:center;"+AlertCss+"'>"+(Porcen.toFixed(2))+" %</td>"
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.Total)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalSol)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorSol.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalAjus)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorAjus.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(TotalOtros)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+TotalPorOtros.toFixed(2)+" %</th>"
                    html += "<th></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(data.TotalPiezas)+"</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                html += "</tr>"
            html += "</table>";
            html += "<div class = 'ContentInfoDivs DetalleOtsProf'></div>"
            $(".DetalleDeptos").html( html );
            
            var chartDeptosUser = new CanvasJS.Chart("GrafSummaryDepartamentUserProf", {
                animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Proyectos / Ots Por Profesionales Cliente "+$(".NameProducto"+HashProducto).text()+"",
                        fontFamily: "Century Gothic",
                        fontSize: 16
                    },
                    legend: {
			maxWidth: 350,
			itemWidth: 250,
                        horizontalAlign: "left", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontFamily: "Century Gothic",
                    },
                    data: [{
                            type: "pie",
                            startAngle: 240,
                            showInLegend: true,
                            yValueFormatString: "##0",
                            legendText: "{label}: {y}",
                            indexLabel: "{label}: {y}",
                            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });
            
            //Porcentaje:
            var dataPoint = chartDeptosUser.options.data[0].dataPoints;
            var total = data.Total;
            for(var i = 0; i < dataPoint.length; i++) {
                chartDeptosUser.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chartDeptosUser.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
                
            $(".ContenedorTablaReporte").hide("slow");
            location.href = "#GrafSummaryDepartamentUserProf";
        }
    })
}

function VisualDataOtsGeneral(Tipo,Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'f309d8563d70b278a105255f8552d371',
        data:{
            Tipo:Tipo,
            Hash:Hash,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Titulo = "";
            if( Tipo == 2 ){
                Titulo = "País "+$(".Producto"+Hash).text()
            }
            if( Tipo == 3 ){
                Titulo = "Profesional " + $(".Profesionales"+Hash).text()
                console.log($(".Profesionales"+Hash).text())
            }
            var html = "";
                html += "<table width = '100%' style = 'background: linear-gradient(45deg, #00A352, #18A792);padding:5px;'>"
                    html += "<tr>"
                        html += "<td nowrap style = 'vertical-align:middle;width:90%;padding-left:2px;'>"
                            html += "<span class = 'TituloBuscador22'>Detalle de Ots Por "+Titulo+"</span>";
                        html += "</td>"
                        html += "<td style = 'padding-right:5px;text-align:right;'>"
                            html += "<img src = '"+UrlUniversal+"images/cerrar_blanco.png' class = 'IconClose'  data-dismiss='modal' aria-label='Close' onclick = 'ModalEdit2(0);ModalEdit(1)'/>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<div class = 'MainGraf' style = 'width:100%;'>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th class = 'TituloGraficasS'>Distribución de Ots Por "+Titulo+"</th>"
                        html += "</tr>"
                    html += "</table>"
                    html += "<div style = 'height:350px;width:100%;' class = 'MainGraf EstadosOTsClientesDistribucion' id = 'EstadosOTsClientesDistribucion'></div>"
                html += "</div>"
                var Summary = [];
                Summary.push({y:data.Creativos_Proyectos,'label':'Creativos'})
                Summary.push({y:data.Digital_Proyectos,'label':'Digital'})
                Summary.push({y:data.PTE_Proyectos,'label':'Pendientes de Revisión Cliente'})
                var Eje = data.ProyectosActivos.length - (data.PTE_Proyectos + data.Creativos_Proyectos);
                if( Eje < 0 ){
                    Eje = (-1)*Eje;
                }
                Summary.push({y:Eje,'label':'Ejecutivos'});
                var TotalPiezas = 0;
                html += "<table width = '100%' id = 'TablaResumenOTs'>";
                    html += "<tr>"
                        var Text = " POR PRODUCTO";
                        var Text2 = "Producto";
                        if( $("#OTC_Cliente").val() == 31590400 ){
                            Text = " POR PAÍS";
                            Text2 = "País";
                        }

                        html += "<th class = 'TituloTablasResumen' colspan = '26'>RESUMEN OTS ACTIVAS  "+Text+"</th>"
                    html += "</tr>"
                        
                    html += "<tr>"
                        html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '2'>Solicitudes</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '5'>Creativos</th>"
                        html += "<th class = 'BorderCero'></th>"
                        /*html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '5'>Digital</th>"
                        html += "<th class = 'BorderCero'></th>"*/
                        html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '5'>Ejecutivos</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal ' colspan = '5'>Cliente</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Pendiente</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>0</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Ots</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.Creativos_Proyectos)+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Piezas</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.Creativos_Piezas)+"</td>"
                        /*
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Ots</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.Digital_Proyectos)+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Piezas</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.Digital_Piezas)+"</td>"
                        */
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Ots</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(Eje)+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Piezas</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.Ejecutivos_Piezas)+"</td>"
                        
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Ots</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.PTE_Proyectos)+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'TablaReportes_Cuerpo'>Piezas</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+formatNumber.new(data.PTE_Piezas)+"</td>"
                    html += "</tr>"
                    html += "</table>"
                    /*html += "<br>"
                    html += "<table style = 'width:100%;'>"
                    html += "<tr>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Número</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Código</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Referencia</th>"
                        //html += "<th class = 'CenterText cabecera_th_dark '>Empresa</th>"
                        //html += "<th class = 'CenterText cabecera_th_dark '>Cliente</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Producto</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Profesional Cliente</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Ejecutivo</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Estado</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Fecha Creación</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Nro. Requerimiento</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Fecha Prometida Entrega</th>"
                        html += "<th class = 'TablaReportes_TituloPrincipal '>Nro. Piezas</th>"
                    html += "</tr>"
                    for( var i = 0; i < data.ProyectosActivos.length; i++ ){
                        html += "<tr>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                            html += "<th class = 'BorderCero'></th>"
                            html += "<td class = 'TablaReportes_Cuerpo' nowrap>"+data.ProyectosActivos[i]['Codigo']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo' >"+data.ProyectosActivos[i]['Referencia']+"</td>"
                            //html += "<td class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[i]['Empresa']+"</td>"
                            //html += "<td class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[i]['Cliente']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo' >"+data.ProyectosActivos[i]['Producto']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo' >"+data.ProyectosActivos[i]['Profesional']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo' >"+data.ProyectosActivos[i]['Ejecutivo']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo' >"+data.ProyectosActivos[i]['Estado']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+data.ProyectosActivos[i]['Fecha']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+data.ProyectosActivos[i]['Requerimiento']+"</td>"
                            html += "<td class = 'TablaReportes_Cuerpo_Center' >"+data.ProyectosActivos[i]['FechaEntrega']+"</td>"

                            var Alert = "",AlertCss = "";

                            if( data.ProyectosActivos[i]['Piezas'] == 0 ){
                                Alert = "AlertPost";
                                AlertCss = "background-color:green;color:white;font-weight:bold;";
                            }else if( data.ProyectosActivos[i]['Piezas'] > 0 && data.ProyectosActivos[i]['Piezas'] <= 10 ){
                                Alert = "AlertMed";
                                AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                            }else{
                                Alert = "AlertNeg";
                                AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                            }
                            html += "<td class = 'td_cuerpo_table "+Alert+"' nowrap style = 'text-align:center;"+AlertCss+"'>"+data.ProyectosActivos[i]['Piezas']+"</td>"
                            TotalPiezas += data.ProyectosActivos[i]['Piezas'];
                        html += "</tr>"
                    }
                    html += "<tr>"
                        html += "<td colspan = '2'>"
                        html += "<td class = 'TablaReportes_Total_Center' colspan = '9'>Total</td>"
                        html += "<td class = 'TablaReportes_Total_Center' >"+formatNumber.new(TotalPiezas)+"</td>"
                    html += "</tr>"
                    html += "</table>";*/
                $(".ContenedorDetalleProyectosReport").html(html);
                
                
                var chart = new CanvasJS.Chart("EstadosOTsClientesDistribucion", {
                        animationEnabled: true,
                        exportEnabled: true,
                        backgroundColor:"transparent",
                        title:{
                            text: "",
                            backgroundColor:"black",
                            fontColor:"white",
                            padding:5,
                            fontFamily: "Century Gothic",
                            fontSize: 16
                        },
                        legend: {
                            maxWidth: 350,
                            itemWidth: 250,
                            fontSize: 14,
                            horizontalAlign: "left", // "center" , "right"
                            verticalAlign: "center",  // "top" , "bottom"
                            fontFamily: "Century Gothic",
                        },
                        data: [{
                                type: "pie",
                                startAngle: 240,
                                showInLegend: true,
                                yValueFormatString: "##0",
                                legendText: "{label}: {y}",
                                indexLabel: "{label}: {y}",
                                valueFormatString: "#,##",
                                toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                                valueRepresents: "area",
                                dataPoints:  Summary
                        }]
                    });

                    //Porcentaje:
                    var dataPoint = chart.options.data[0].dataPoints;
                    var total = data.ProyectosActivos.length;
                    for(var i = 0; i < dataPoint.length; i++) {
                        chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                    }
                    chart.render()
                    
                    
        }
    })
}

function ViewOtsActivasProducto(HashProf,HashProducto,HashUsuario){
    $.ajax({
        type:'POST',
        url:UrlGeneral + 'fe315ee7ebc305e58214dadb0f84c15c',
        data:{
            HashProducto:HashProducto,
            HashUsuario:HashUsuario,
            HashProf:HashProf,
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            OTC_Unidad:$("#OTC_Unidad").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "<br>";
            var TotalPiezas = 0;
            html += "<table width = '100%' id = 'TablaResumenOTs'>";
                html += "<tr>"
                    var Text = " POR PRODUCTO";
                    var Text2 = "Producto";
                    if( $("#OTC_Cliente").val() == 31590400 ){
                        Text = " POR PAÍS";
                        Text2 = "País";
                    }
                    
                    html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '11'>LISTADO OTS ACTIVAS "+Text+"</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Número</th>"
                    html += "<th class = 'BorderCero'></th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Código</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Referencia</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Empresa</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Cliente</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Producto</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Profesional Cliente</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Ejecutivo</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Fecha Creación</th>"
                    html += "<th class = 'CenterText cabecera_th_dark '>Nro. Piezas</th>"
                html += "</tr>"
                for( var i = 0; i < data.ProyectosActivos.length; i++ ){
                    html += "<tr>"
                        html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<td class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[i]['Codigo']+"</td>"
                        html += "<td class = 'td_cuerpo_table' >"+data.ProyectosActivos[i]['Referencia']+"</td>"
                        html += "<td class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[i]['Empresa']+"</td>"
                        html += "<td class = 'td_cuerpo_table' nowrap>"+data.ProyectosActivos[i]['Cliente']+"</td>"
                        html += "<td class = 'td_cuerpo_table' >"+data.ProyectosActivos[i]['Producto']+"</td>"
                        html += "<td class = 'td_cuerpo_table' >"+data.ProyectosActivos[i]['Profesional']+"</td>"
                        html += "<td class = 'td_cuerpo_table' >"+data.ProyectosActivos[i]['Ejecutivo']+"</td>"
                        html += "<td class = 'td_cuerpo_table' nowrap style = 'text-align:center;'>"+data.ProyectosActivos[i]['Fecha']+"</td>"
                    
                        var Alert = "",AlertCss = "";
                        
                        if( data.ProyectosActivos[i]['Piezas'] == 0 ){
                            Alert = "AlertPost";
                            AlertCss = "background-color:green;color:white;font-weight:bold;";
                        }else if( data.ProyectosActivos[i]['Piezas'] > 0 && data.ProyectosActivos[i]['Piezas'] <= 10 ){
                            Alert = "AlertMed";
                            AlertCss = "background-color:#ff9e0d;color:white;font-weight:bold;";
                        }else{
                            Alert = "AlertNeg";
                            AlertCss = "background-color:#d43b3b;color:white;font-weight:bold;";
                        }
                        html += "<td class = 'td_cuerpo_table "+Alert+"' nowrap style = 'text-align:center;"+AlertCss+"'>"+data.ProyectosActivos[i]['Piezas']+"</td>"
                        TotalPiezas += data.ProyectosActivos[i]['Piezas'];
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<td colspan = '2'>"
                    html += "<td class = 'CenterText cabecera_th_dark' colspan = '8'>Total</td>"
                    html += "<td class = 'CenterText cabecera_th_dark' >"+formatNumber.new(TotalPiezas)+"</td>"
                html += "</tr>"
                html += "</table>";
                $(".DetalleOtsProf").html(html);
                location.href = "#TablaResumenOTs";
        }
    })
}

function TRA_ViewListadoOtsIntregables(){
    var html = ""
        

        TituloVentana = "Ots y Entregables"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Empresa'>Empresa:</label>";
                    html += "<select class ='form-control' name = 'OTC_Empresa' id = 'OTC_Empresa' onchange='OTCliente.listasWithEmpresa(event)'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Cliente'>Cliente:</label>";
                    html += "<select class ='form-control' name = 'OTC_Cliente' id = 'OTC_Cliente' onchange = 'TRA_Report_ListarProfesionalesCliente();TRA_Report_ListarProductosCliente()'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Profesional:</label>";
                    html += "<select class = 'form-control' name = 'ParProfesionales' id = 'ParProfesionales'>"
                        
                    html += "</select>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>País/Producto:</label>";
                    html += "<select class = 'form-control' name = 'ParProductosCliente' id = 'ParProductosCliente'>"
                    html += "</select>"
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Visualizar:</label>";
                    html += "<select class = 'form-control' name = 'ParTipView' id = 'ParTipView'>"
                        html += "<option value = '1' selected >Completo</option>"
                        html += "<option value = '2'>Sin Empresa y Cliente</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Estado:</label>";
                    html += "<select class = 'form-control' name = 'parEstadoRep' id = 'parEstadoRep'>"
                        html += "<option value = '0' selected >Todos</option>"
                        html += "<option value = '1'>Activos</option>"
                        html += "<option value = '2'>Cerrados</option>"
                        html += "<option value = '3'>Detenidos</option>"
                        html += "<option value = '4'>Pendiente Aprobación Cliente</option>"
                    html += "</select>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Texto:</label>";
                    html += "<input type = 'text' class = 'form-control' id = 'OTC_TextBusquedaReport'/>"
                html += "</div>";
                
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Desde:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FechaDesde'/>"
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Hasta:</label>";
                    html += "<input type = 'date' class = 'form-control' id = 'OTC_FechaHasta'/>"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'GenerarListaOtsEntregables()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            
            html += "<div class = 'ContenedorTablaReporte' style = 'width:100%;overflow-x:scroll;'></div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaInit()
    TablaOTTraCliente
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}

function TRA_ViewReprocesos(){
    var html = ""
        

        TituloVentana = "Reprocesos Yara"
        ImgVentana = "images/detalles.png"
        FuncionesHeader = ""
        FuncionesRegresar = "ModalEdit(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";

        html += "<div class='modal-body'>";
            
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Desde:</label>";
                    html += "<input type = 'date' name = 'FechaInicio' id = 'FechaInicio' class = 'form-control' />"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Year'>Hasta:</label>";
                    html += "<input type = 'date' name = 'FechaFin' id = 'FechaFin' class = 'form-control' />"
                html += "</div>";
                
                html += "<div class='col col-sm-3 my-2 CenterText'>";
                    html += "<p></p>";
                    html += "<img src ='images/35_Buscar.png' class = 'OptionIcon' onclick = 'GenerarReporteReprocesos()'/>";
                html += "</div>";
            html += "</div>";
            html += "<hr>"
            
            html += "<div class = 'ContenedorTablaReporte' style = 'width:100%;overflow-x:scroll;'></div>"
            
        html += "</div>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
}

function TRA_Report_ListarProfesionalesCliente(){
    if( $("#OTC_Cliente").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf86CLP',
            data:{
                OTC_Cliente:$("#OTC_Cliente").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                html += "<option  value = '' selected>Seleccione</option>"
                for(var i = 0; i < data.Prof.length;i++){
                    html += "<option value = '"+data.Prof[i]['Hash']+"'>"+data.Prof[i]['Nombre']+"</option>"
                }
                $("#ParProfesionales").html(html);
            }
        })
    }
}

function GenerarReporteReprocesos(){
    if( $("#FechaFin").val() != ''  && $("#FechaInicio").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + 'bc8bb43747f8396dbe7a4f797d76d3c42',
            data:{
                FF:$("#FechaFin").val(),
                FI:$("#FechaInicio").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                var Datos = [];
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<div class = 'MainGraf' style = 'width:100%;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<th class = 'Report_Firt_Tittle' style = 'color:black;'>Total Reprocesos</th>"
                                html += "</tr>"
                            html += "</table>"
                            html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOtsGeneral'></div>"
                        html += "</div>"

                        html += "<hr>"
                        html += "<div class = ' Global_OTs_Total'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td ></td>"
                                    html += "<td style = 'text-align:center;width:15%;'>#</td>"
                                    html += "<td style = 'text-align:center;width:15%;' >%</td>"
                                html += "</tr>"
                                html += "<tr>"
                                    html += "<td class = 'Report_Firt_Tittle' style = 'color:black;'>Total Reprocesos</td>"
                                    html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>"+data.Reprocesos.length+"</div></td>"
                                    html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_%0ts'>100 %</div></td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"

                    //Total Activas y Cerradas
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<div class = 'MainGraf' style = 'width:100%;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<th class = 'Report_Firt_Tittle'  style = 'color:black;'>Distribución Reprocesos</th>"
                                html += "</tr>"
                            html += "</table>"
                            html += "<div class = 'ContentReportGraph' id = 'Graph_TotalOts'></div>"
                        html += "</div>"

                        html += "<hr>"
                        
                        var Total = parseFloat(data.Cliente[0]['Reprocesos']) + parseFloat(data.Agencia[0]['Reprocesos']) + parseFloat( data.Mixto[0]['Reprocesos'] )
                        
                        html += "<div class = 'Global_OTs_Total'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td ></td>"
                                    html += "<td style = 'text-align:center;width:15%;'>#</td>"
                                    html += "<td style = 'text-align:center;width:15%;'>%</td>"
                                html += "</tr>"
                                html += "<tr>"
                                    html += "<td class = 'Report_Firt_Tittle'  style = 'color:black;'>Total Reprocesos</td>"
                                    html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>"+data.Reprocesos.length+"</div></td>"
                                    html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>100%</div></td>"
                                html += "</tr>"
                                html += "<tr class = 'Global_OTs_Cerradas'>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[0]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle Cursor' >Clientes</td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[0]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+data.Cliente[0]['Reprocesos']+"</div></td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[0]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+Math.round(( parseFloat(data.Cliente[0]['Reprocesos'])/ Total)*100)+"</div></td>"
                                html += "</tr>"
                                html += "<tr class = 'Global_OTs_Cerradas'>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[1]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle Cursor' >Agencia</td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[1]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+data.Agencia[0]['Reprocesos']+"</div></td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[1]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+Math.round(( parseFloat(data.Agencia[0]['Reprocesos'])/ Total)*100)+"</div></td>"
                                html += "</tr>"
                                html += "<tr class = 'Global_OTs_Cerradas'>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[2]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle Cursor' >Mixto</td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[2]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+data.Mixto[0]['Reprocesos']+"</div></td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+data.Colors[2]['NumColor']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+Math.round(( parseFloat(data.Mixto[0]['Reprocesos'])/ Total)*100)+"</div></td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<table class = 'tableNew'>"
                            html += "<tr>"
                                html += "<th>No.</th>"
                                html += "<th>Requerimiento</th>"
                                html += "<th>Asunto</th>"
                                html += "<th>Piezas</th>"
                                html += "<th>Reprocesos</th>"
                            html += "</tr>"
                            for(var i = 0; i < data.Rq.length; i++){
                                html += "<tr>"
                                    html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                    html += "<td class = 'CenterText'>"+data.Rq[i]['Id']+"</td>"
                                    html += "<td class = ''>"+data.Rq[i]['Asunto']+"</td>"
                                    html += "<td class = 'CenterText'>"+data.Rq[i]['CantidadPiezas']+"</td>"
                                    html += "<td class = 'CenterText' onclick = 'EventRequerimientoReportes("+data.Rq[i]['Hash']+", "+data.Rq[i]['Id']+")'>"+data.Rq[i]['Reprocesos']+"</td>"
                                html += "</tr>"
                            }
                    html += "</div>"
                html += "</div>"
                $(".ContenedorTablaReporte").html(html)                
                Morris.Donut({
                    element: 'Graph_TotalOtsGeneral',
                    data: [

                      {label: "Total Reprocesos", value: parseInt(data.Reprocesos.length),color:data.Colors[0]['NumColor']}
                    ]
                });

                Morris.Donut({
                    element: 'Graph_TotalOts',
                    data: [
                        {label: "Cliente", value: parseInt(data.Cliente[0]['Reprocesos']),color:data.Colors[0]['NumColor']},
                        {label: "Agencia", value: parseInt(data.Agencia[0]['Reprocesos']),color:data.Colors[1]['NumColor']},
                        {label: "Mixto", value: parseInt(data.Mixto[0]['Reprocesos']),color:data.Colors[2]['NumColor']}
                    ]
                });
                
                
            }
        })
    }else{
        alert("Debe diligenciar los campos Obligatorios");
    }
}

function EventRequerimientoReportes(Hash,Req){
    var Sol = 0;
    
    if( Sol == 0 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'c50cb56aed832b28522210592567bdd3',
            success:function(data){
                FilesRQ = [];
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Histórico Estatus Requerimiento # "+Req+"</span>";
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
                    html += "<table class = 'tableNew'>"
                        html += "<thead>"
                            html += "<tr>"
                                html += "<th >No.</th>"
                                html += "<th>Fecha</th>"
                                html += "<th>Hora</th>"
                                html += "<th>Generado Por</th>"
                                html += "<th>Estatus</th>"
                                if( data.CLIENTES_MARCAR_REPROCESOS == 1 ){
                                    html += "<th>Definir Responsabilidad</th>"
                                }
                            html += "</tr>"
                        html += "</thead>"
                        for( var i = 0; i < data.Info.length; i++ ){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td class = 'CenterText'>"+data.Info[i]['FechaC']+"</td>"
                                html += "<td class = 'CenterText'>"+data.Info[i]['HoraC']+"</td>"
                                html += "<td style = 'text-align:justify;'>"+data.Info[i]['Creador']+"</td>"
                                html += "<td style = 'text-align:justify;'>"
                                    html += data.Info[i]['Status']
                                    if( data.Info[i]['Adjuntos'].length > 0 ){
                                        html += "<hr>"
                                        html += "<table style = 'width:100%;'>"
                                            html += "<tr>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>No.</th>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Nombre</th>"
                                                html += "<th class = 'PptoTituloInterno' style = 'color:white;'>Descargar</th>"
                                            html += "</tr>"
                                            for(var x = 0; x < data.Info[i]['Adjuntos'].length; x++){
                                                html += "<tr>"
                                                    html += "<td class = 'subtitulos_principales CenterText'>"+(x+1)+"</td>"
                                                    html += "<td class = 'subtitulos_principales'>"+data.Info[i]['Adjuntos'][x]['Archivo']+"</td>"
                                                    html += "<td class = 'subtitulos_principales'>"
                                                    if(data.Info[i]['Adjuntos'][x]['Tipo'] == 'Old'){
                                                        html += '<center><span onclick = "Tarea.downloadFile(\''+data.Info[i]['Adjuntos'][x]['Hash']+'\')">'
                                                            html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                                        html += '</span></center>'
                                                    }else{
                                                        html += '<center><span onclick = "RequerimientoCliente.Cliente_downloadFile(\''+Hash+'X'+data.Info[i]['Adjuntos'][x]['Hash']+'X2\')">'
                                                            html += '<img src ="images/descarga.png" class = "OptionIcon" />';
                                                        html += '</span></center>'
                                                    }
                                                        
                                                    html += "</td>"
                                                html += "</tr>"
                                            }
                                        html += "</table>"
                                    }
                                    
                                html += "</td>"
                                if( data.CLIENTES_MARCAR_REPROCESOS == 1 ){
                                    html += "<td>"
                                        if( data.Info[i]['Eval'] == 1 ){
                                            if( data.Info[i]['Evaluacion'].length > 0 ){
                                                html += "<div class = 'form-row'>";
                                                    html += "<div class='col col-sm-12 my-2'>"
                                                    if( data.Info[i]['Evaluacion'][0]['Tipo'] == 'CLIENTE' ){
                                                        html += "<label for='IdTipoDoc' col-form-label'>La Responsabilidad es del CLIENTE debido a: "+data.Info[i]['Evaluacion'][0]['Justificacion']+"</label>"
                                                    }
                                                    if( data.Info[i]['Evaluacion'][0]['Tipo'] == 'INTERNO' ){
                                                        html += "<label for='IdTipoDoc' col-form-label'>La Responsabilidad es de la AGENCIA debido a: "+data.Info[i]['Evaluacion'][0]['Justificacion']+"</label>"
                                                    }
                                                    if( data.Info[i]['Evaluacion'][0]['Tipo'] == 'MIXTO' ){
                                                        html += "<label for='IdTipoDoc' col-form-label'>La Responsabilidad es COMPARTIDA debido a: "+data.Info[i]['Evaluacion'][0]['Justificacion']+"</label>"
                                                    }
                                                    html += "</div>"
                                                html += "</div>"
                                            }
                                        }else{
                                            
                                        }
                                    html += "</td>"
                                }
                            html += "</tr>"
                        }
                    html += "</table>"
                html += "</div>";
                $(".content_modal").html(html);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm").addClass('modal-dialog-scrollable');
                ModalEdit(1)
                ResizeModal(1)
            }
        })
    }
}
function TRA_Report_ListarProductosCliente(){
    if( $("#OTC_Cliente").val() != '' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf86PRD',
            data:{
                OTC_Cliente:$("#OTC_Cliente").val(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = "";
                html += "<option  value = '' selected>Seleccione</option>"
                for(var i = 0; i < data.Prod.length;i++){
                    html += "<option value = '"+data.Prod[i]['Hash']+"'>"+data.Prod[i]['Nombre']+"</option>"
                }
                $("#ParProductosCliente").html(html);
            }
        })
    }
}

function GenerarListaOtsEntregables(){
    $.ajax({
        type:'POST',
        url:UrlGeneral + '4e071d19daaf214bb0ef5340baf2bf86',
        data:{
            OTC_Empresa:$("#OTC_Empresa").val(),
            OTC_Cliente:$("#OTC_Cliente").val(),
            parEstadoRep:$("#parEstadoRep").val(),
            ParProfesionales:$("#ParProfesionales").val(),
            ParProductosCliente:$("#ParProductosCliente").val(),
            OTC_FechaDesde:$("#OTC_FechaDesde").val(),
            OTC_FechaHasta:$("#OTC_FechaHasta").val(),
            OTC_TextBusqueda:$("#OTC_TextBusquedaReport").val(),
            _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var TotalPiezas = 0;
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th nowrap>No</th>"
                    html += "<th nowrap>Código</th>"
                    html += "<th nowrap># Requerimiento</th>"
                    html += "<th nowrap>Fecha OT</th>"
                    html += "<th nowrap>Referencia</th>"
                    html += "<th nowrap>Acciones</th>"
                    html += "<th nowrap class = '_EmpClie'>Empresa</th>"
                    html += "<th nowrap class = '_EmpClie'>Cliente</th>"
                    html += "<th nowrap>País / Producto</th>"
                    html += "<th nowrap>Profesional</th>"
                    html += "<th nowrap>Estado Actual</th>"
                    html += "<th nowrap>Ubicada En</th>"
                    html += "<th nowrap>Fecha Ingreso</th>"
                    html += "<th nowrap>Fecha Entrega</th>"
                    html += "<th nowrap>Nro. Entregables</th>"
                    
                html += "</tr>"
                for( var i = 0; i < data.Info.length; i++ ){
                    var Options = "";
                        var Style = '';
                        if( data.Info[i]['IdEstado'] == 1 ){
                            Style = 'background-color:#ADEDAE;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'PTN_OT'>Pendiente de Cliente</option>"
                                Options += "<option value = 'DTN_OT'>Detener</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 2 ){
                            Style = 'background-color:#a03c3c;color:white;'
                            var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 3 ){
                            Style = 'background-color:#ff9e0d;'
                            Options = "<select class = 'form-control' style = 'width:200px;'  id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                            Options += "</select>"
                        }else if( data.Info[i]['IdEstado'] == 4 ){
                            Style = 'background-color:#EABF5E;'
                            Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+data.Info[i]['Hash']+"' onchange = 'ActionsOtsProyect("+data.Info[i]['Hash']+")'>"
                                Options += "<option value = ''>Seleccione</option>"
                                Options += "<option value = 'RACT_OT'>Reactivar</option>"
                                Options += "<option value = 'CRT_OT'>Cerrar</option>"
                            Options += "</select>"
                        }
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        html += "<td nowrap class = 'CenterText HashOt"+data.Info[i]['Hash']+"'>"+data.Info[i]['Codigo']+"</td>"
                        html += "<td nowrap class = 'CenterText '>"+data.Info[i]['Req']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['Fecha']+"</td>"
                        html += "<td nowrap >"+data.Info[i]['Referencia_Proyecto']+"</td>"
                        html += "<td class = 'OptionsHashOt"+data.Info[i]['Hash']+"'>"+Options+"</td>"
                        html += "<td nowrap class = '_EmpClie'>"+data.Info[i]['Cliente']+"</td>"
                        html += "<td nowrap class = '_EmpClie'>"+data.Info[i]['Cliente']+"</td>"
                        html += "<td nowrap>"+data.Info[i]['Producto']+"</td>"
                        html += "<td nowrap>"+data.Info[i]['Profesional']+"</td>"
                        
                        html += "<td nowrap style = '"+Style+"' class = 'EstHashOt"+data.Info[i]['Hash']+"'>"+data.Info[i]['Estado_OT']+"</td>"
                        
                        var Deptos = "<ul>"
                        var Piezas = 0;
                        var FechaCreacion = "";
                        var FechaEntrega = "";
                        for(var t = 0; t < data.Info[i]['Ubicacion'].length; t++ ){
                            Piezas += parseInt(data.Info[i]['Ubicacion'][t]['Piezas']);
                            TotalPiezas += parseInt(data.Info[i]['Ubicacion'][t]['Piezas']);
                            Deptos += "<li>"+data.Info[i]['Ubicacion'][t]['Departamento']+"</li>"
                            
                            FechaCreacion = "<li>"+data.Info[i]['Ubicacion'][t]['FechaCreacion']+"</li>"
                            FechaEntrega = "<li>"+data.Info[i]['Ubicacion'][t]['FechaEntrega']+"</li>"
                        }
                        for(var t = 0; t < data.Info[i]['UbicacionFechas'].length; t++ ){
                            FechaCreacion = ""+data.Info[i]['UbicacionFechas'][t]['FechaCreacion']+""
                            FechaEntrega = ""+data.Info[i]['UbicacionFechas'][t]['FechaEntrega']+""
                        }
                        Deptos += "</ul>"
                        //FechaEntrega += "</ul>"
                        //Deptos += "</ul>"
                        html += "<td nowrap >"+Deptos+"</td>"
                        html += "<td nowrap >"+FechaCreacion+"</td>"
                        html += "<td nowrap >"+FechaEntrega+"</td>"
                        html += "<td class = 'CenterText'>"+formatNumber.new(Piezas)+"</td>"
                        
                    html += "</tr>"
                }
                html += "<tr>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th class = '_EmpClie'></th>"
                    html += "<th class = '_EmpClie'></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th ></th>"
                    html += "<th >"+TotalPiezas+"</th>"
                    html += "<th ></th>"
                html += "</tr>"
            html += "</table>"
            $(".ContenedorTablaReporte").html(html);
            if( $("#ParTipView").val() == 2 ){
                $("._EmpClie").hide();
            }
        }
    });
}

function ActionsOtsProyect(Hash){
    if( $("#OptionsOt_"+Hash).val() == 'CRT_OT' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '6131fd7628f87eadf4e4b9f42b8442c2',
            data:{
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table class = 'CabeceraVentanas' width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2 TituloBuscador'>Cerrar Proyecto/Ot: "+$(".HashOt"+Hash).text()+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html +=  "<img src = '"+UrlUniversal+"images/cerrar_white.png' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Jutificación:</label>";
                            html += "<select class ='form-control' name = 'JustificacionOt' id = 'JustificacionOt' >";
                                html += "<option value='' selected>Seleccione</option>";
                                for(var i = 0; i < data.Info.length; i++){
                                    html += "<option value = '"+data.Info[i]['Hash']+"'>"+data.Info[i]['Nombre']+"</option>"
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-6 my-2'>";
                            html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Fecha:</label>";
                            html += "<input type = 'date' value = '"+data.Fecha+"' id = 'FechaCierre' class = 'form-control'/>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'FormSendSaveAction_OT("+Hash+")'>Guardar</button>";
                html += "</div>";

                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit2(1)
                ModalEdit(0)
            }
        })
        
    }else if( $("#OptionsOt_"+Hash).val() == 'PTN_OT' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '6131fd7628f87eadf4e4b9f42b8442c2',
            data:{
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table class = 'CabeceraVentanas' width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2 TituloBuscador'>Pendiente de Cliente - Proyecto/Ot: "+$(".HashOt"+Hash).text()+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Fecha:</label>";
                            html += "<input type = 'date' value = '"+data.Fecha+"' id = 'FechaCierre' class = 'form-control'/>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'FormSendSaveAction_OT("+Hash+")'>Guardar</button>";
                html += "</div>";

                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit2(1)
                ModalEdit(0)
            }
        })
    }else if( $("#OptionsOt_"+Hash).val() == 'DTN_OT' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '6131fd7628f87eadf4e4b9f42b8442c2',
            data:{
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table class = 'CabeceraVentanas' width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2 TituloBuscador'>Detener Proyecto/Ot: "+$(".HashOt"+Hash).text()+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Fecha:</label>";
                            html += "<input type = 'date' value = '"+data.Fecha+"' id = 'FechaCierre' class = 'form-control'/>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Justificacion:</label>";
                            html += "<textarea class = 'form-control' Id = 'JustificacionOt' name = 'JustificacionOt'></textarea>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'FormSendSaveAction_OT("+Hash+")'>Guardar</button>";
                html += "</div>";

                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit2(1)
                ModalEdit(0)
            }
        })
    }else if( $("#OptionsOt_"+Hash).val() == 'RACT_OT' ){
        $.ajax({
            type:'POST',
            url:UrlGeneral + '6131fd7628f87eadf4e4b9f42b8442c2',
            data:{
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table class = 'CabeceraVentanas'width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2 TituloBuscador'>Reactivar Proyecto/Ot: "+$(".HashOt"+Hash).text()+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' onclick = 'ModalEdit2(0);ModalEdit(1)'>";
                                html +=  "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconoCerrar' />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Cliente'><span class = 'Obligatorio'>(*)</span>    Fecha:</label>";
                            html += "<input type = 'date' value = '"+data.Fecha+"' id = 'FechaCierre' class = 'form-control'/>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'FormSendSaveAction_OT("+Hash+")'>Guardar</button>";
                html += "</div>";

                $(".content_modal2").html(html);
                $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-lg');
                $("#ModalContentForm2").addClass('modal-dialog-scrollable');
                ModalEdit2(1)
                ModalEdit(0)
            }
        })
    }
}

function FormSendSaveAction_OT(Hash){
    if( $("#OptionsOt_"+Hash).val() == 'CRT_OT' ){
        if( $("#JustificacionOt").val() != '' && $("#FechaCierre").val() != '' ){
            $.ajax({
                type:'POST',
                url:UrlGeneral + '43c2fd452552bfb5fe8e5e310b58412c',
                data:{
                    JustificacionOt: $("#JustificacionOt").val(),
                    FechaCierre: $("#FechaCierre").val(),
                    Tip: $("#OptionsOt_"+Hash).val(),
                    Hash: Hash,
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    ModalEdit2(0)
                    ModalEdit(1)
                    $(".EstHashOt"+Hash).css({'background-color':'#a03c3c','color':'white'});
                    $(".EstHashOt"+Hash).html("Cerrado");
                    $(".OptionsHashOt"+Hash).html("");
                }
            })
        }else{
            alert("Debe ingresar los campos Obligatorios.");
        }
    }else if( $("#OptionsOt_"+Hash).val() == 'PTN_OT' ){
        if( $("#FechaCierre").val() != '' ){
            $.ajax({
                type:'POST',
                url:UrlGeneral + '43c2fd452552bfb5fe8e5e310b58412c',
                data:{
                    JustificacionOt: 0,
                    FechaCierre: $("#FechaCierre").val(),
                    Tip: $("#OptionsOt_"+Hash).val(),
                    Hash: Hash,
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    ModalEdit2(0)
                    ModalEdit(1)
                    var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+Hash+"' onchange = 'ActionsOtsProyect("+Hash+")'>"
                        Options += "<option value = ''>Seleccione</option>"
                        Options += "<option value = 'RACT_OT'>Reactivar</option>"
                        Options += "<option value = 'CRT_OT'>Cerrar</option>"
                    Options += "</select>"
                    $(".EstHashOt"+Hash).css({'background-color':'#EABF5E','color':'black'});
                    $(".EstHashOt"+Hash).html("Pendiente Revisión Cliente");
                    $(".OptionsHashOt"+Hash).html(Options);
                }
            })
        }else{
            alert("Debe ingresar los campos Obligatorios.");
        }
    }else if( $("#OptionsOt_"+Hash).val() == 'DTN_OT' ){
        if( $("#FechaCierre").val() != '' && $("#JustificacionOt").val() != '' ){
            $.ajax({
                type:'POST',
                url:UrlGeneral + '43c2fd452552bfb5fe8e5e310b58412c',
                data:{
                    JustificacionOt: $("#JustificacionOt").val(),
                    FechaCierre: $("#FechaCierre").val(),
                    Tip: $("#OptionsOt_"+Hash).val(),
                    Hash: Hash,
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    ModalEdit2(0)
                    ModalEdit(1)
                    var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+Hash+"' onchange = 'ActionsOtsProyect("+Hash+")'>"
                        Options += "<option value = ''>Seleccione</option>"
                        Options += "<option value = 'RACT_OT'>Reactivar</option>"
                        Options += "<option value = 'CRT_OT'>Cerrar</option>"
                    Options += "</select>"
                    $(".EstHashOt"+Hash).css({'background-color':'#EABF5E','color':'black'});
                    $(".EstHashOt"+Hash).html("Pendiente Revisión Cliente");
                    $(".OptionsHashOt"+Hash).html(Options);
                }
            })
        }else{
            alert("Debe ingresar los campos Obligatorios.");
        }
    }else if( $("#OptionsOt_"+Hash).val() == 'RACT_OT' ){
        if( $("#FechaCierre").val() != '' ){
            $.ajax({
                type:'POST',
                url:UrlGeneral + '43c2fd452552bfb5fe8e5e310b58412c',
                data:{
                    JustificacionOt: 0,
                    FechaCierre: $("#FechaCierre").val(),
                    Tip: $("#OptionsOt_"+Hash).val(),
                    Hash: Hash,
                    _token:document.getElementsByName('_token')[0].value},
                success:function(data){
                    ModalEdit2(0)
                    ModalEdit(1)
                    var Options = "<select class = 'form-control' style = 'width:200px;' id = 'OptionsOt_"+Hash+"' onchange = 'ActionsOtsProyect("+Hash+")'>"
                        Options += "<option value = ''>Seleccione</option>"
                        Options += "<option value = 'PTN_OT'>Pendiente de Cliente</option>"
                        Options += "<option value = 'DTN_OT'>Detener</option>"
                        Options += "<option value = 'CRT_OT'>Cerrar</option>"
                    Options += "</select>"
                    $(".EstHashOt"+Hash).css({'background-color':'#ADEDAE','color':'black'});
                    $(".EstHashOt"+Hash).html("Activo");
                    $(".OptionsHashOt"+Hash).html(Options);
                }
            })
        }else{
            alert("Debe ingresar los campos Obligatorios.");
        }
    }
}

//

function toolTipFormatter(e) {
	var str = "";
	var total = 0 ;
	var str3;
	var str2 ;
	for (var i = 0; i < e.entries.length; i++){
		var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
	//str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
	return (str2.concat(str));
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}