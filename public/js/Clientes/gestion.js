$(document).ready(function () {
    $(".TituloPantalla").html("Requerimientos Clientes");

    $(".alert-primary").css({
        'background-color':'#1B4075',
    })
    $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
        'color':'white'
    })
    
    TablaRequiermientosCliente();
    TablaHistoricoRequiermientosCliente();
    TablaEvalRequiermientosCliente();
    
    
    
    $(".PARDIV_ContentTRACLIENTEOT").show();
    $(".PAR_ContentTRACLIENTEOT").html('<i class=" Cursor fas fa-angle-double-up"></i>');
    
    if( $(".XCs").text() != '' ){
        MostrarTabsMenu(4)
    }else{
        MostrarTabsMenu(3)
        
    }
    ResumenCliente();
});
var chart = null;
var OC_Volumen = 0;
var OC_ValorDoc = 0;
var OC_Impuestos = 0;
var OC_Total = 0;
var $tableFilesRQ  = null;
var FilesRQ = [];

function Cliente_ConsultarCamposAdicionales(Hash){
    printDataAjax('c8ae7480ffcec046eff032acc95a16a42', {Hash:Hash}, data => {
            var Seg = (1/data.Info.length);
            var html = "";
                data.Info.forEach(obj => {
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>"+obj['Nombre']+":</label>";
                            html += "<textarea class = 'form-control'  rows = '3'></textarea>"
                        html += "</div>";
                    html += "</div>";
                });
            
            $('.CamposAdicionales').html(html)
            //$('.CamposAdicionales').css({''})
        })
}
const RequerimientoCliente = {
    enviar: function (e) {
        sendForm(e, () => {
            $('#ModalEdit').modal('hide')
            BuscarTablaOTProyecto()
            notificacionesGenerales()
        })
    },
    loadFilesRQ: function(e) {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            FilesRQ.push(files[i]);
        }
        e.target.value = ''
        $tableFilesRQ.destroy()
        $tableFilesRQ.draw();
        this.listarFilesRQ();
    },
    listarFilesRQ: function () {
        let dataRows = []
        for (let i = 0; i < FilesRQ.length; i++) {
            let fileRow = {
                Num: i+1,
                Nombre: FilesRQ[i].name
            }
            dataRows.push(fileRow);
        }
        $tableFilesRQ = $('#listaAdjuntosTareaOT').DataTable({
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
                        hx = '<center><span onclick = "RequerimientoCliente.deleteFilesRQ(\''+data+'\')">'
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
    deleteFilesRQ: function (id) {
        FilesRQ.splice(parseInt(id)-1, 1)
        $tableFilesRQ.destroy();
        $tableFilesRQ.draw();
        this.listarFilesRQ();
    },
    Cliente_listarTiposolicitud: function() {
        printDataAjax('c8ae7480ffcec046eff032acc95a16a4', {Hash:1}, data => {
            var Seg = (1/data.Info.length);
            html = "<table class = 'tableNew'>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                        html += "<table width = '100%' >"
                            html += "<tr>"
                                html += "<th><input type = 'radio' class = 'TipoSolicitud TipoSolicitud"+obj['Hash']+"' name = 'TipoSolicitud' value = '"+obj['Hash']+"'/></th>"
                                html += "<th>"+obj['Nombre']+"</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</th>"
                });
                html += "</tr>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<td>"+obj['Descripcion']+"</td>"
                });
                html += "</tr>"
            html += "</table>"
            
            $('.TipoSolicitud').html(html)
        })
    },
    Cliente_listarTipodesarrollo: function() {
        
        printDataAjax('c8ae7480ffcec046eff032acc95a16a4', {Hash: 2}, data => {
            var Seg = (1/data.Info.length);
            html = "<table class = 'tableNew'>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                        html += "<table width = '100%' >"
                            html += "<tr>"
                                html += "<th><input type = 'radio' class = 'TipoDesarrollo' name = 'TipoDesarrollo' onclick = 'Cliente_ConsultarCamposAdicionales("+obj['Hash']+")' value = '"+obj['Hash']+"'/></th>"
                                html += "<th>"+obj['Nombre']+"</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</th>"
                });
                html += "</tr>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<td>"+obj['Descripcion']+"</td>"
                });
                html += "</tr>"
            html += "</table>"
            
            $('.TipoDesarrollo').html(html)
        })
    },
    Cliente_listarSector: function() {
        
        printDataAjax('c8ae7480ffcec046eff032acc95a16a4', {Hash: 3}, data => {
            var Seg = (1/data.Info.length);
            html = "<table class = 'tableNew'>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                        html += "<table width = '100%' >"
                            html += "<tr>"
                                html += "<th><input onclick = 'SectorAll("+obj['Hash']+")' type = 'checkbox' class = 'Sector"+obj['Hash']+"' name = 'Sector' value = '"+obj['Hash']+"'/></th>"
                                html += "<th>"+obj['Sector']+"</th>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</th>"
                });
                html += "</tr>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'vertical-align:top;'>"
                        html += "<table class = 'tableNew '>"
                        obj['DSector'].forEach(obd =>{
                            html += "<tr>"
                                html += "<td class = 'CenterText ListaOpcionesSector"+obj['Hash']+"'><input type = 'checkbox' class = 'Sectorx' name = 'SectorD[]' value = '"+obd['Hash']+"'/></td>"
                                html += "<td style = 'text-align:justify;'>"+obd['Detalle']+"</td>"
                            html += "</tr>"
                        })
                        html += "</table>"
                    html += "</th>"
                });
                html += "</tr>"
            html += "</table>"
            
            $('.Sector').html(html)
        })
    },
    Cliente_ListarProductosUsuarios: function(){
        printDataAjax('c8ae7480ffcec046eff032acc95a16a4', {Hash: 4}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.Info.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Producto']+"</option>"
            });
            $('#Producto').html(html)
        })
    },
    Cliente_ListarMateriales: function(){
        printDataAjax('c8ae7480ffcec046eff032acc95a16a4', {Hash: 5}, data => {
            var Seg = (1/data.Info.length);
            html = "<table class = 'tableNew'>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'width:"+Seg+"%;'>"+obj['Material']+"</th>"
                });
                html += "</tr>"
                html += "<tr>"
                data.Info.forEach(obj => {
                    html += "<th style = 'vertical-align:top;'>"
                        html += "<table class = 'tableNew '>"
                        obj['Medio'].forEach(obd =>{
                            html += "<tr class = 'PiezasRq'>"
                                html += "<td style = 'text-align:justify;width:70%;'>"+obd['Detalle']+"</td>"
                                html += "<td class = 'MaterialesSolicitados'><span class = 'HashMedios HidenInformation'>"+obd['Hash']+"</span><input class = 'form-control NumPiezas' oninput = 'TotalPiezasRC()' onkeyup = 'TotalPiezasRC()' type = 'number' min = '0'  name = 'CantidadMaterial[]' value = '0' /></td>"
                            html += "</tr>"
                        })
                        html += "</table>"
                    html += "</th>"
                });
                html += "</tr>"
            html += "</table>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td class = 'CenterText'>"
                        html += "<strong>TOTAL PIEZAS<p></p>"
                        html += "<span class = 'TotalPiezas'>0</span></strong>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            $('.MaterialesSol').html(html)
        })
    },
    Cliente_downloadFile: function (id) {
        window.open((UrlUniversal+'70387f8087a0fc297af72111d10f50d3x/'+id), '_blank')
    },
    Cliente_ListProyectosCliente:function(Hash){
        if( $("#OptionSelProyecto").val() == 'AP' ){
            $("#OptionSelDirector").each(function(){
                $(this).attr('disabled', true)
                $(this).attr('readonly', true)
            })
            printDataAjax('f060b228c3ba346cc82f7277e5457436', {Hash: Hash}, data => {
                html = "<table class = 'tableNew'>"
                    html += "<thead>"
                        html += "<tr>"
                            html += "<th></th>"
                            html += "<th>Código</th>"
                            html += "<th>Referencia</th>"
                        html += "</tr>"
                    html += "</thead>"
                data.Info.forEach(obj => {
                    html += "<tr>"
                        html += "<td class = 'CenterText'><input type = 'radio' name = 'ProyectReq' value = '"+obj['Hash']+"'/></td>"
                        html += "<td>"+obj['CodigoOT']+"</td>"
                        html += "<td>"+obj['ReferenciaOT']+"</td>"
                    html += "</tr>"
                });
                html += "</table>"
                $(".ContenedorOts").show("slow")
                $('.ListProyectos').html(html)
            })
            $(".ContenedorOpcionesCliente").css({
                'width':'100%',
                'heigth':'200px'
            })
        }else{
            $("#OptionSelDirector").each(function(){
                $(this).attr('disabled', false)
                $(this).attr('readonly', false)
            })
            $(".ContenedorOts").hide("slow")
        }
        
    },
    Cliente_ListarDirectorProyectos: function(){
        printDataAjax('2032e89f5721d0663d5649d85504934a', {Hash:1}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.directores.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#OptionSelDirector').html(html)
        })
    },
    Cliente_viewFile: function (id) {
        window.open((UrlUniversal+'v70387f8087a0fc297af72111d10f50d3x/'+id), '_blank')
    }
}

function TotalPiezasRC(){
    var Total = 0;
    $(".NumPiezas").each(function(){
        console.log($(this).val())
        if( $(this).val().length > 0 ){
            Total += parseInt( $(this).val() );
        }else{
            Total += 0;
        }
        
    })
    $(".TotalPiezas").text(Total);
}

function SectorAll(Hash){
    if( $(".Sector"+Hash).prop("checked") ){
        $(".ListaOpcionesSector"+Hash+" > input[type=checkbox]").each(function(){
            $(this).prop("checked",true)
        })
    }else{
        $(".ListaOpcionesSector"+Hash+" > input[type=checkbox]").each(function(){
            $(this).prop("checked",false)
        })
    }
}

function CrearRequerimientoCliente(){
    var html = ""
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Nuevo Requerimiento</span>";
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
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Asunto / Referencia:</label>";
                    html += "<input type = 'text' autocomplete = 'off' class = 'form-control' name = 'AsuntoRefRequerimiento' id = 'AsuntoRefRequerimiento' />";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                    html += "<div class = 'TipoSolicitud ContenedorOpcionesCliente'></div>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Desarrollo:</label>";
                    html += "<div class = 'TipoDesarrollo ContenedorOpcionesCliente'></div>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Sector o Unidad de Negocio:</label>";
                    html += "<div class = 'Sector ContenedorOpcionesCliente'></div>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Objetivos de Comunicación:</label>";
                    html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'ObjetivosComunicacion' rows = '3'></textarea>"
                html += "</div>";
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> ¿A quién va dirigido?:</label>";
                    html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'DirigidoA' rows = '3'></textarea>"
                html += "</div>";
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Descripción del requerimiento:</label>";
                    html += "<textarea class = 'form-control' name = 'DescRequerimiento' id = 'DescRequerimiento' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Materiales Solicitados:</label>";
                    html += "<div class = 'MaterialesSol ContenedorOpcionesCliente'></div>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Mandatorios:</label>";
                    html += "<textarea class = 'form-control' name = 'Mandatorios' id = 'Mandatorios' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'CamposAdicionales HidenInformation'></div>"
            html += "<br>"
            
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> País:</label>";
                    html += "<select class = 'form-control' name = 'Producto' id = 'Producto' ></select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Fecha de Salida:</label>";
                    html += "<input type = 'date' class = 'form-control' name = 'FechaSalida' id = 'FechaSalida' />";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                    html += "<div class='custom-file'>"
                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='RequerimientoCliente.loadFilesRQ(event)' multiple  >"
                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-12 my-2 lista' id=''>"
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
        html += "<div class = 'modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendRequestClient()'>Generar Requerimiento</button>";
        html += "</div>";
    $(".content_modal").html(html);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
       dd = '0' + dd;
    }

    if (mm < 10) {
       mm = '0' + mm;
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#FechaSalida").attr("min", today);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    $(".ContenedorOpcionesCliente").css({
        'width':'100%',
        'heigth':'200px'
    })
    FilesRQ = [];
    RequerimientoCliente.listarFilesRQ();
    RequerimientoCliente.Cliente_listarTiposolicitud()
    RequerimientoCliente.Cliente_listarTipodesarrollo()
    RequerimientoCliente.Cliente_listarSector()
    RequerimientoCliente.Cliente_ListarProductosUsuarios()
    RequerimientoCliente.Cliente_ListarMateriales()
    ResizeModal(1)
}

function SendRequestClient(){
    var Sectores = [];
    $(".Sectorx").each(function(){
        if( $(this).prop("checked") ){
            Sectores.push({'Id':$(this).val()})
        }
    })
    
    var Materiales = [];
    $(".MaterialesSolicitados").each(function(){
        if( $(this).find("input").val() != 0 ){
            Materiales.push({
                'Hash':$(this).find("span").text(),
                'Num': $(this).find("input").val()
            })
            
        }
    })
    if( $("input[name='TipoSolicitud']:checked").val().length > 0  
            && $("input[name='TipoDesarrollo']:checked").val().length > 0 
            && Sectores.length > 0 
            && Materiales.length > 0 
            && $("#ObjetivosComunicacion").val().length > 3 
            && $("#AsuntoRefRequerimiento").val().length > 5 
            && $("#DirigidoA").val().length > 3 
            && $("#Mandatorios").val().length > 3 
            && $("#Producto").val() != ''  
            && $("#FechaSalida").val() != ''  
        ){
            var formData = new FormData();
            formData.append("Sectores", JSON.stringify(Sectores));
            formData.append("Materiales", JSON.stringify(Materiales));
            formData.append("TipoSolicitud", $("input[name='TipoSolicitud']:checked").val());
            formData.append("TipoDesarrollo", $("input[name='TipoDesarrollo']:checked").val());
            formData.append("ObjetivosComunicacion", $("#ObjetivosComunicacion").val() );
            formData.append("DescRequerimiento", $("#DescRequerimiento").val() );
            formData.append("DirigidoA", $("#DirigidoA").val() );
            formData.append("Mandatorios", $("#Mandatorios").val() );
            formData.append("AsuntoRefRequerimiento", $("#AsuntoRefRequerimiento").val() );
            formData.append("Producto", $("#Producto").val() );
            formData.append("FechaSalida", $("#FechaSalida").val() );
            
            //var archivos = document.getElementById("ParLogo");
            formData.append("NumArchivos", FilesRQ.length );
            for (var i = 0; i < FilesRQ.length; i++) {
                formData.append("Archivos"+i, FilesRQ[i]);
            }
            
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'c569fc8266c92dbd65aac696064785ee',
                success:function(data){
                    alert("Se ha generado el requerimientio No. "+data.Info);
                    ModalEdit(0);
                    BuscarRequerimientosCliente()
                    FilesRQ = [];
                }
            })
        }else{
            alert("Debe diligenciar todos los campos marcados con (*)")
        }
}

function BuscarRequerimientosCliente(){
    $DataTable_TarePendientes.destroy();
    TablaRequiermientosCliente();
}

function TablaRequiermientosCliente() {
    $DataTable_TarePendientes = $('#TablaRequerimientosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'f3a2cbc8e35f9b30c128b3d91e9babbf',
            'data':function (d) {
                d.search['value'] = $("#OTCC_TextBusqueda").val();
                d.search['estado'] = $("#OTCC_Estado").val();
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
                    return '<Center>' + data + '</Center>';
                }

           },
           {
                data: 'NumRequerimiento',
                "render": function (data, type, full, meta) {
                    return '<Center><span style = "text-decoration:underline;" onclick = "ConsultarRequerimientoCliente('+full.Hash+')"  class = "Cursor NR'+full.Hash+'">' + data + '</span></Center>';
                }
            },
            {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span class = "NameR'+full.Hash+'">' + data + '</span>';
                 }

            },
           /*{
               data: 'TipoDesarrollo',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },*/
            {
                data: 'Producto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaC',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                    }

                },
            {
                data: 'HoraC',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            /*{
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },*/
            {
                data: 'NEstado',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'NroPiezas',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'Status',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            /*{
                data: 'NEstado',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },*/
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    
                    var ht = "<select class = 'form-control' id = 'AccionRequerimiento"+full.Hash+"' onchange = 'EventRequerimiento("+full.Hash+")'>";
                    ht += "<option value = '' selected>Seleccione</option>"
                    
                    ht += "<option value = '0'>Histórico Estatus</option>"
                    if( data == 1 || data == 2 ){
                        ht += "<option value = '1'>Nuevo Estatus</option>"
                    }
                    if( data == 3 ){
                        ht += "<option value = '11'>Aclarar Dudas</option>"
                    }
                    if( data == 4 ){
                        if( full.UsuarioR == 100185 || full.UsuarioR == 100187){
                            
                        }else{
                            ht += "<option value = '4'>Evaluar Solicitud</option>"
                        }
                        
                    }
                    if( data == 6 ){
                        ht += "<option value = '6'>Cerrar Solicitud</option>"
                        ht += "<option value = '1'>Nuevo Estatus</option>"
                    }
                    if( data == 9 ){
                        ht += "<option value = '10'>Reactivar Solicitud</option>"
                    }
                    if( data == 10 ){
                        ht += "<option value = '1'>Nuevo Estatus</option>"
                        ht += "<option value = '3'>Devolver a Cliente Interno</option>"
                    }
                    if( data > 0 && data < 9 ){
                        ht += "<option value = '2'>Cancelar Solicitud</option>"
                        ht += "<option value = '1'>Nuevo Estatus</option>"
                        ht += "<option value = '9'>Suspender Temporalmente</option>"
                    }
                    
                    ht += "</select>"
                    
                    var html = "";
                    html = "<table class = 'tableNew' >";
                    html += "<tr>"
                        html += "<th colspan = '2'>RESUMEN DE REQUERIMIENTOS</th>"
                    html += "</tr>"
                    for(var t = 0; t < full.ResumenRequerimientos.length; t++){
                        html += "<tr>"
                            html += "<td>"+full.ResumenRequerimientos[t]['NEstado']+"</td>"
                            html += "<td class = 'CenterText'>"+full.ResumenRequerimientos[t]['NUM_REQUERIMIENTOS']+"</td>"
                        html += "</tr>"
                    }
                    html += "</table>"
                    $(".ResumenRequerimientosCliente").html( html )
                    return '<span >' + ht + '</span>';
                }

            },
        ],
        "order": [[1, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaRequerimientosCliente').css({'width':'100%'})
}

function EventRequerimiento(Hash){
    var Sol = $("#AccionRequerimiento"+Hash).val();
    if( Sol == 120 ){
        FilesRQ = [];
        var html = ""
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Modificar Fecha de Entrega Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Nuevo Estatus:</label>";
                    html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-4 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Fecha de Entrega:</label>";
                    html += "<input type = 'date' class = 'form-control' name = 'NFechaEntrega' id = 'NFechaEntrega'>"
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                    html += "<div class='custom-file'>"
                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='RequerimientoCliente.loadFilesRQ(event)' multiple  >"
                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2 lista' id=''>"
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
        html += "</div>";
        html += "<div class = 'modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendStatusClienteFEntrega("+Hash+")'>Enviar Estatus</button>";
        html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        RequerimientoCliente.listarFilesRQ()
        ModalEdit(1)
        ResizeModal(1)
    }
    if( Sol == 1 ){
        FilesRQ = [];
        var html = ""
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Nuevo Estatus Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Nuevo Estatus:</label>";
                    html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                    html += "<div class='custom-file'>"
                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='RequerimientoCliente.loadFilesRQ(event)' multiple  >"
                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2 lista' id=''>"
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
        html += "</div>";
        html += "<div class = 'modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendStatusCliente("+Hash+")'>Enviar Estatus</button>";
        html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        RequerimientoCliente.listarFilesRQ()
        ModalEdit(1)
        ResizeModal(1)
    }
    
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
                $("#AccionRequerimiento"+Hash).val("")
                BuscarRequerimientosCliente()
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Histórico Estatus Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
                                            }else{
                                                html += "<div class = 'form-row'>";
                                                    html += "<div class='col col-sm-12 my-2'>"
                                                        html += "<label for='IdTipoDoc' col-form-label'>La Responsabilidad es de:</label>"
                                                        html += "<select class = 'form-control' name = 'Responsabilidad"+data.Info[i]['Hash']+"' id = 'Responsabilidad"+data.Info[i]['Hash']+"' >"
                                                            html += "<option value = '' selected>Seleccione</option>"
                                                            html += "<option value = 'INTERNO'>Interna</option>"
                                                            html += "<option value = 'CLIENTE'>Cliente</option>"
                                                            html += "<option value = 'MIXTO'>Mixto</option>"
                                                        html += "</select>"
                                                    html += "</div>"
                                                html += "</div>"
                                                html += "<div class = 'form-row'>";
                                                    html += "<div class='col col-sm-12 my-2'>"
                                                        html += "<label for='IdTipoDoc' col-form-label'>Justificación:</label>"
                                                        html += "<textarea class = 'form-control' name = 'JUSTResponsabilidad"+data.Info[i]['Hash']+"' id = 'JUSTResponsabilidad"+data.Info[i]['Hash']+"'></textarea>"
                                                    html += "</div>"
                                                html += "</div>"
                                                html += "<div class = 'form-row'>";
                                                    html += "<div class='col col-sm-12 my-2 CenterText'>"
                                                        html += "<button type='button' onclick = 'GuardarResponsabilidadREQ("+Hash+","+data.Info[i]['Hash']+")' class='btn btn-primary' >Guardar</button>"
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
    
    if( Sol == 2 ){
        if( confirm("¿Está seguro(a) de Cancelar el Requerimiento # "+$(".NR"+Hash).text()+"?") ){
            var html = ""
            FilesRQ = [];
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Nuevo Estatus Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Motivo Cancelación:</label>";
                        html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'SendStatusCancelacionCliente("+Hash+")'>Enviar Estatus</button>";
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            ModalEdit(1)
            ResizeModal(0.5)
        }
    }
    
    if( Sol == 9 ){
        var html = ""
        FilesRQ = [];
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Suspender Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Justificación:</label>";
                    html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class = 'modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendSuspenderRequerimientoCliente("+Hash+")'>Enviar Estatus</button>";
        html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        ModalEdit(1)
        ResizeModal(0.5)
    }
    
    if( Sol == 10 ){
        var html = ""
        FilesRQ = [];
        html += "<div class='modal-header panel-heading'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<span class = 'TituloBuscador2'>Reactivar Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Justificación:</label>";
                    html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<div class = 'modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendReactivarRequerimientoCliente("+Hash+")'>Enviar Estatus</button>";
        html += "</div>";
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        ModalEdit(1)
        ResizeModal(0.5)
    }
    
    if( Sol == 3 ){
        if( confirm("¿Está seguro(a) de Devolver el Requerimiento # "+$(".NR"+Hash).text()+"?") ){
            var html = ""
            FilesRQ = [];
            html += "<div class='modal-header panel-heading'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<span class = 'TituloBuscador2'>Devolver Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Motivo:</label>";
                        html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class = 'modal-footer'>";
                html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                html += "<button type='button' class='btn btn-primary' onclick = 'SendStatusDevCliente("+Hash+")'>Enviar Estatus</button>";
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm").addClass('modal-dialog-scrollable');
            ModalEdit(1)
            ResizeModal(0.5)
        }
    }
    
    if( Sol == 11 ){
        BuscarRequerimientosCliente()
        ConsultarRequerimientoCliente(Hash)
    }
    
    if( Sol == 12 ){
        if( confirm("¿Está seguro(a) de Enviar el Requerimiento # "+$(".NR"+Hash).text()+" a Cliente para Aprobación?") ){
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
                url: UrlGeneral+'8e93e5b81343b8ec1b4f11c96f9a92b3',
                success:function(data){
                    if( data.Info == 0 ){
                        alert("Aun no se han cargado al sistemas las piezas entregables referente a esta tarea.");
                        BuscarEvalRequerimientosCliente()
                    }else{
                        var html = ""
                        html += "<div class='modal-header panel-heading'>";
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td nowrap>"
                                        html += "<span class = 'TituloBuscador2'>Enviar Requerimiento # "+$(".NR"+Hash).text()+" a Cliente</span>";
                                    html += "</td>"
                                    html += "<td>"
                                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick = 'BuscarEvalRequerimientosCliente()'>";
                                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose' />";
                                    html += "</button>";
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>";
                        html += "<div class='modal-body'>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Observaciones:</label>";
                                    html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '3'></textarea>"
                                html += "</div>";
                            html += "</div>";
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*) NOTA:</span>:<strong>EL SISTEMA AUTOMÁTICAMENTE RELACIONARÁ LOS ADJUNTOS DE LA ÚLTIMA TAREA QUE SE TENGA SOBRE ESTE REQUERIMIENTO, SI EN DADO CASO NO SE TIENEN ARCHIVOS SOBRE LA ÚLTIMA TAREA, ESTE NO SE ENVIARÁ A CLIENTE.</strong></label>";
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                            html += "<th>No.</th>"
                                            html += "<th>Archivo</th>"
                                            html += "<th></th>"
                                        html += "</tr>"
                                        for(var i = 0; i < data.Info.length; i++){
                                            html += "<tr>"
                                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                                html += "<td>"+data.Info[i]['Archivo']+"</td>"
                                                html += "<td class = 'CenterText'>"
                                                    html += "<span onclick = 'RequerimientoCliente.Cliente_viewFile("+data.Info[i]['Id']+")'><img src = 'images/descarga.png' class = 'OptionIcon' /></span>"
                                                html +="</td>"
                                            html += "</tr>"
                                        }
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'modal-footer'>";
                            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal();BuscarEvalRequerimientosCliente()'>Cerrar</button>";
                            html += "<button type='button' class='btn btn-primary' onclick = 'SendAprobCliente("+Hash+")'>Enviar A Cliente</button>";
                        html += "</div>";
                        $(".content_modal").html(html);
                        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                        $("#ModalContentForm").addClass('modal-dialog-scrollable');
                        ModalEdit(1)
                        ResizeModal(1)
                    }
                    
                }
            })
            
        }
    }
    
    if( Sol == 4 ){
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
            url: UrlGeneral+'4040470b58442c9c5f79e731347c11ba',
            success:function(data){
                FilesRQ = [];
                var html = ""
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Evaluar Requerimiento # "+$(".NR"+Hash).text()+"</span>";
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
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Comentarios Agencia:</label>";
                            html += "<textarea class = 'form-control' rows = '6' readonly disabled>"+data.Status['Status']+"</textarea>"
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Observaciones/Comentarios:</label>";
                            html += "<textarea class = 'form-control' name = 'Estatus' id = 'Estatus' rows = '6'></textarea>"
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Acción a Realizar:</label>";
                            html += "<select class = 'form-control' name = 'TipoAccionCliente' id = 'TipoAccionCliente' onchange = 'ViewPiezasReq()'>"
                                html += "<option value = '' selected >Seleccione</option>"
                                html += "<option value = '123400'  >Aprobar y Cerrar</option>"
                                html += "<option value = '493600'  >En Revisión Interna Cliente</option>"
                                html += "<option value = '246800'  >Aprobar y Adicionar Piezas</option>"
                                html += "<option value = '370200'  >Ajustar</option>"
                            html += "</select>"
                        html += "</div>";/*
                        html += "<div class='col col-sm-4 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Compartir Con:</label>";
                            html += "<select class = 'form-control' name = 'RITipoAccionCliente' id = 'RITipoAccionCliente' >"
                                html += "<option value = '' selected >Seleccione</option>"
                                data.Users.forEach(obj => {
                                    html += "<option value = '"+obj['IdUsuario']+"'  >"+obj['NombreUsuario']+"</option>"
                                });
                            html += "</select>"
                        html += "</div>";*/
                    html += "</div>";
                    html += "<br>"
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Seleccione los Adjuntos si aplica:</label>";
                            html += "<div class='custom-file'>"
                                html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='RequerimientoCliente.loadFilesRQ(event)' multiple  >"
                                html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2 lista' id=''>"
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
                    html += "<div class = 'form-row MaterialesSol'>";
                        
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Materiales Solicitados:</label>";
                            html += "<div class = 'ContenedorOpcionesCliente'>"
                                var Seg = (1/data.parcliente_tipomaterial.length);
                                html += "<table class = 'tableNew'>"
                                    html += "<tr>"
                                    data.parcliente_tipomaterial.forEach(obj => {
                                        html += "<th style = 'width:"+Seg+"%;'>"+obj['Material']+"</th>"
                                    });
                                    html += "</tr>"
                                    html += "<tr>"
                                    data.parcliente_tipomaterial.forEach(obj => {
                                        html += "<th style = 'vertical-align:top;'>"
                                            html += "<table class = 'tableNew '>"
                                            obj['Medio'].forEach(obd =>{
                                                html += "<tr class = 'PiezasRq'>"
                                                    html += "<td style = 'text-align:justify;width:70%;'>"+obd['Detalle']+"</td>"
                                                    html += "<td class = 'MaterialesSolicitados'><span class = 'HashMedios HidenInformation'>"+obd['Hash']+"</span><input class = 'form-control NumPiezas NumPiezas"+obd['Hash']+"' oninput = 'TotalPiezasRC()' onkeyup = 'TotalPiezasRC()' type = 'number' min = '0'  name = 'CantidadMaterial[]' value = '0' /></td>"
                                                html += "</tr>"
                                            })
                                            html += "</table>"
                                        html += "</th>"
                                    });
                                    html += "</tr>"
                                html += "</table>"
                                html += "<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<td class = 'CenterText'>"
                                            html += "<strong>TOTAL PIEZAS<p></p>"
                                            html += "<span class = 'TotalPiezas'>0</span></strong>"
                                        html += "</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</div>";
                        html += "</div>";
                        
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*) NOTA:</span>:<strong>A continuación se relacionan los Documentos Adjuntos entregados.</strong></label>";
                            html += "<table class = 'tableNew'>"
                                html += "<tr>"
                                    html += "<th>No.</th>"
                                    html += "<th>Archivo</th>"
                                    html += "<th></th>"
                                html += "</tr>"
                                var TempIdSubtarea = "";
                                for(var i = 0; i < data.Adjuntos.length; i++){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                        html += "<td>"+data.Adjuntos[i]['Archivo']+"</td>"
                                        html += "<td class = 'CenterText'>"
                                            html += "<span onclick = 'RequerimientoCliente.Cliente_viewFile("+data.Adjuntos[i]['Id']+")'><img src = 'images/descarga.png' class = 'OptionIcon' /></span>"
                                        html +="</td>"
                                        TempIdSubtarea = data.Adjuntos[i]['IdSubtarea']
                                    html += "</tr>"
                                }
                            html += "</table>"
                            html += "<br><a href = '"+UrlUniversal+"Zipper/ZipRQ.php?Tipo=S&&Hash="+TempIdSubtarea+"&Req="+$(".NR"+Hash).text()+"'>Descargar Adjuntos en Zip</a>"
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'EventosCierreModal()'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-success' onclick = 'SendEvalCliente("+Hash+")'>Guardar</button>";
                    /*html += "<button type='button' class='btn btn-warning' onclick = 'SendEvalCliente("+Hash+",246800)'>¿Aprobar y Agregar Piezas?</button>";
                    html += "<button type='button' class='btn btn-danger' onclick = 'SendEvalCliente("+Hash+",370200)'>¿Feedback/Retroalimentación?</button>";*/
                html += "</div>";
                $(".content_modal").html(html);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm").addClass('modal-dialog-scrollable');
                RequerimientoCliente.listarFilesRQ();
                ModalEdit(1)
                ResizeModal(1)
                data.Piezas.forEach( obj => {
                    $(".NumPiezas"+obj['IdMedio']).val(obj['Cantidad'])
                })
                TotalPiezasRC()
                $(".MaterialesSol").hide("slow")
            }
        })
    }
    
    if( Sol == 5 ){
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
            url: UrlGeneral+'06ae214f4708713efca1c9c7ad1ca588',
            success:function(data){
                var html = ""
                FilesRQ = [];
                html += "<div class='modal-header panel-heading'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<span class = 'TituloBuscador2'>Enviar Requerimiento # "+$(".NR"+Hash).text()+" a Tráfico Nuevamente</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose OptionIcon' onclick = 'ModalEdit(0);BuscarEvalRequerimientosCliente()'/>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<div class='form-row'>"
                        html += "<div class='form-group col-md-3'>";
                            html += "<label for='parFecha' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha Entrega Cliente:</label>";
                            html += "<input type='date' name='parFechaEntregaC' id='parFechaEntregaC'  class='form-control' placeholder='Proyecto XYZ'>"
                        html += "</div>";
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Enviar a:</label>";
                        html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                        html += "<label for='parDepartamento' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Deartamento:</label>";
                        html += "<select name = 'parDepartamento' id='parDepartamento' onchange='Tarea.listaResponsables();Tarea.listaAsignados();Tarea.listaTipoTarea();Tarea.listTiposActividadRespuesta()' class='form-control' required>";
                            html += "<option selected>Seleccione</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='form-row flex'>"
                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsables:</label>";
                            html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:8em'>";

                            html += "</div>";
                        html += "</div>";

                        html += "<div class='form-group col-md-6'>";
                            html += "<label for='parAsignados' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
                            html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:8em'>";

                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                    html += "<hr>"
                    //listTiposActividad
                    html += "<div class='form-row'>"
                        html += "<div class='form-group col-md-3'>";
                            html += "<label for='parFecha' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha:</label>";
                            html += "<input type='date' name='parFecha' id='parFecha' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ'>"
                        html += "</div>";
                        html += "<div class='form-group col-md-3'>";
                            html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora:</label>";
                            html += "<input type='time' name='parHora' id='parHora' class='form-control'>"
                        html += "</div>";
                        html += "<div class='form-group col-md-3'>";
                            html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                            html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' required>";
                                html += "<option selected>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='form-group col-md-3'>";
                            html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Tarea:</label>";
                            html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' required>";
                                html += "<option selected>Seleccione</option>";
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                        html += "<label for='parAsunto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
                        html += "<input type='text' name='parAsunto' id='parAsunto' autocomplete = 'off' class='form-control' value = 'Ajuste "+data.Req['Asunto']+"' />"
                    html += "</div>";


                    html += "<div class='form-group'>";
                        html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
                        html += "<textarea class='form-control' id='parDescripcion' rows='3'>\n\n\n_____________________________________________________________________________\n"+data.Info+"</textarea>"
                    html += "</div>";
                    /*html += "<div class='form-group'>";
                        html += "<label><span class = 'Obligatorio'>Adjuntos</span>: Todos los documentos relacionados con este requerimiento serán adjuntados de manera automática.</label>";
                        html += ""
                    html += "</div>";*/
                html += "</div>";

                html += "<div class = 'modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' onclick = 'ModalEdit(0);BuscarEvalRequerimientosCliente()'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'SendModfTrafic("+Hash+")'>Generar</button>";
                html += "</div>";
                $(".content_modal").html(html);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm").addClass('modal-dialog-scrollable');
                ModalEdit(1)
                RequerimientoCliente.Cliente_ListarDirectorProyectos()
                Tarea.listaDepartamentos()
                $("#parFechaEntregaC").val( data.Req['FechaEntrega'] )

                ResizeModal(1)
            }
        });
        
    }
}

function GuardarResponsabilidadREQ(Hash,Hash2){
    if( $("#Responsabilidad"+Hash2).val() != '' && $("#JUSTResponsabilidad"+Hash2).val().length > 4 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Hash2", Hash2);
        formData.append("Responsabilidad", $("#Responsabilidad"+Hash2).val());
        formData.append("JUSTResponsabilidad", $("#JUSTResponsabilidad"+Hash2).val());
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'017de185ebf69d481ab27df257bfee872',
            success:function(data){
                $("#AccionRequerimiento"+Hash).val("0");
                EventRequerimiento(Hash)
            }
        })
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
                BuscarRequerimientosCliente()
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
function SendStatusCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );
        formData.append("NumArchivos", FilesRQ.length );
        for (var i = 0; i < FilesRQ.length; i++) {
            formData.append("Archivos"+i, FilesRQ[i]);
        }
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'017de185ebf69d481ab27df257bfee87',
            success:function(data){
                alert("Se ha enviado el Estatus Indicado");
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarRequerimientosCliente()
            }
        })
    }
}
function SendStatusClienteFEntrega(Hash){
    if( $("#Estatus").val().length > 3 && $("#Estatus").val() != '' ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("NFechaEntrega", $("#NFechaEntrega").val() );
        formData.append("Status", $("#Estatus").val() );
        formData.append("NumArchivos", FilesRQ.length );
        for (var i = 0; i < FilesRQ.length; i++) {
            formData.append("Archivos"+i, FilesRQ[i]);
        }
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'017de185ebf69d481ab27df257bfee87EF',
            success:function(data){
                alert("Se ha enviado el Estatus Indicado");
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarRequerimientosCliente()
            }
        })
    }
}

function SendSuspenderRequerimientoCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'f76cd2629e05e2fe6c0ec7d722398617',
            success:function(data){
                alert("Se ha Suspendido el Requerimiento # "+$(".NR"+Hash).text());
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarRequerimientosCliente()
            }
        })
    }
}

function SendReactivarRequerimientoCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'89c9d855228d861476db396134e45239',
            success:function(data){
                alert("Se ha Reactivado el Requerimiento # "+$(".NR"+Hash).text());
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarRequerimientosCliente()
            }
        })
    }
}

function SendStatusCancelacionCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'47e55a0f3de332ca32c12612678d3753',
            success:function(data){
                alert("Se ha Cancelado el Requerimiento Indicado "+$(".NR"+Hash).text());
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarRequerimientosCliente()
            }
        })
    }
}

function BuscarHistoricoRequerimientosCliente(){
    $DataTable_Banco_DL.destroy()
    TablaHistoricoRequiermientosCliente();
}

function TablaHistoricoRequiermientosCliente() {
    $DataTable_Banco_DL = $('#TablaHistoricoRequerimientosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'scrollX':        true,
        'scrollCollapse': true,
        'fixedColumns':   {
            leftColumns: 0,
     rightColumns: 0,
        },
        'ajax': {
            'url':'b7b5d800ff7fbdb762dd32a6ab788aa4',
            'data':function (d) {
                d.search['value'] = $("#OTCH_TextBusqueda").val();
                d.search['estado'] = $("#OTCH_Estado").val();
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
                    return '<Center>' + data + '</Center>';
                }

           },
           {
                data: 'NumRequerimiento',
                "render": function (data, type, full, meta) {
                    return '<Center><span style = "text-decoration:underline;" onclick = "ConsultarRequerimientoCliente('+full.Hash+')"  class = "Cursor NR'+full.Hash+'">' + data + '</span></Center>';
                }
            },
            {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                 }

            },
           /*{
               data: 'TipoDesarrollo',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },*/
            {
                data: 'Producto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaC',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                    }

                },
            {
                data: 'HoraC',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'NEstado',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'NroPiezas',
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'Status',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    
                    var ht = "<select class = 'form-control' id = 'AccionRequerimiento"+full.Hash+"' onchange = 'EventRequerimiento("+full.Hash+")'>";
                    ht += "<option value = '' selected>Seleccione</option>"
                    ht += "<option value = '0'>Histórico Estatus</option>"
                    ht += "<option value = '10'>Reactivar Solicitud</option>"
                    
                    ht += "</select>"
                    return '<span >' + ht + '</span>';
                }

            },
        ],
        "order": [[1, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaHistoricoRequerimientosCliente').css({'width':'100%'})
}

function BuscarEvalRequerimientosCliente(){
    $DataTable_CC.destroy()
    TablaEvalRequiermientosCliente();
}

function TablaEvalRequiermientosCliente() {
    
    $DataTable_CC = $('#TablaEvalRequerimientosCliente').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':'4efec69574ec7dfdcb6ff5b25b55012f',
            'data':function (d) {
                d.search['value'] = $("#OTCHE_TextBusqueda").val();
                d.search['estado'] = $("#OTCHE_Estado").val();
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
                    return '<Center>' + data + '</Center>';
                }

           },
            
           {
                data: 'NumRequerimiento',
                "render": function (data, type, full, meta) {
                    return '<Center><span style = "text-decoration:underline;" onclick = "ConsultarRequerimientoCliente('+full.Hash+')" class = "Cursor NR'+full.Hash+'">' + data + '</span></Center>';
                }
            },
            {
                data: 'NumOt',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, full, meta) {
                    return '' + data + '';
                }

           },
            {
                data: 'Asunto',
                "render": function (data, type, full, meta) {
                    return '<span class = "NameR'+full.Hash+'">' + data + '</span>';
                 }

            },
            {
                data: 'FechaSalida',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                 }

            },
           /*{
               data: 'TipoDesarrollo',
               "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },*/
            {
                data: 'Producto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Creador',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaC',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                    }

                },
            {
                data: 'HoraC',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'NEstado',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                }

            },
            {
                data: 'FechaEntrega',
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'NroPiezas',
                "render": function (data, type, full, meta) {
                        return '<center >' + data + '</center>';
                }

            },
            {
                data: 'Status',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                    
                    var ht = "<select class = 'form-control' id = 'AccionRequerimiento"+full.Hash+"' onchange = 'EventRequerimiento("+full.Hash+")'>";
                    ht += "<option value = '' selected>Seleccione</option>"
                    
                    ht += "<option value = '0'>Histórico Estatus</option>"
                    
                    if( data != 9 && data != 8 && data != 7 ){
                        ht += "<option value = '1'>Nuevo Estatus</option>"
                    }
                    if( data == 1 ){
                        ht += "<option value = '3'>Devolver a Cliente</option>"
                    }
                    if( data == 2 ){
                        ht += "<option value = '12'>Enviar a Aprobación de Cliente</option>"
                    }
                    if( data == 5 || data == 6 ){
                        ht += "<option value = '5'>Enviar a Tráfico Interno</option>"
                        ht += "<option value = '12'>Enviar a Aprobación de Cliente</option>"
                    }
                    if( data > 1 ){
                        ht += "<option value = '120'>Cambiar Fecha de Entrega</option>"
                    }
                    ht += "</select>"
                    
                    var html = "";
                    html = "<table class = 'tableNew' >";
                    html += "<tr>"
                        html += "<th colspan = '2'>RESUMEN DE REQUERIMIENTOS</th>"
                    html += "</tr>"
                    for(var t = 0; t < full.ResumenRequerimientos.length; t++){
                        html += "<tr>"
                            html += "<td>"+full.ResumenRequerimientos[t]['NEstado']+"</td>"
                            html += "<td class = 'CenterText'>"+full.ResumenRequerimientos[t]['NUM_REQUERIMIENTOS']+"</td>"
                        html += "</tr>"
                    }
                    html += "</table>"
                    $(".ResumenRequerimientosInternos").html( html )
                    return '<span >' + ht + '</span>';
                }

            },
        ],
        rowCallback:function(row,data)
        {
          
          if(data['FechaEntregaN'] == data['FechaActual'] && (data['Estado'] == 1 || data['Estado'] == 2 ) )
          {
            $($(row).find("td")).css("background-color","#F9A047");
            $($(row).find("td")).css("color","white");
          }else if(data['FechaEntregaN'] != '' && data['FechaEntregaN'] < data['FechaActual'] && (data['Estado'] == 1 || data['Estado'] == 2 ) )
          {
            $($(row).find("td")).css("background-color","black");
            $($(row).find("td")).css("color","white");
          }

        },
        "order": [[1, "desc"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    })
    $('#TablaEvalRequerimientosCliente').css({'width':'100%'})
}

function DesqRequerimiento(Hash){
    $.ajax({
        type:'POST',
        url:'a693dac80ae4ca3a932b4ce06cd688a2D',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            
        }
    })
}

function ConsultarRequerimientoCliente(Hash){
    $.ajax({
        type:'POST',
        url:'a693dac80ae4ca3a932b4ce06cd688a2',
        data:{Hash:Hash,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.Bloq == 1 ){
                alert("Actualmente el Requerimiento está siendo validado, por lo cual, no podrá ser modificado hasta que sea liberado.");
            }else{
                var Seg = 0;
                var html = ""
                    html += "<div class='modal-header panel-heading'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<span class = 'TituloBuscador2'>Requerimiento # "+data.Info[0]['Id']+"</span>";
                                html += "</td>"
                                html += "<td style = 'text-align:right;'>"
                                    if( data.Info[0]['IdSolicitante'] == data.Info[0]['UserConsult'] || data.Info[0]['UserConsult'] == 100180){
                                        html += "<img src = '"+UrlUniversal+"images/editar.png' class = 'OptionIcon' style = 'padding-right:30px;' onclick = 'EdRequerimiento("+Hash+")'/>";
                                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'OptionIcon IconClose' onclick = 'ModalEdit(0);DesqRequerimiento("+Hash+")'/>";
                                    }else{
                                        html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'OptionIcon IconClose' onclick = 'ModalEdit(0);DesqRequerimiento("+Hash+")'/>";
                                    }    
                                    
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>";
                    html += "<div class='modal-body'>";
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Asunto / Referencia:</label>";
                                html += "<input type = 'text' class = 'form-control' autocomplete = 'off' name = 'AsuntoRefRequerimiento' id = 'AsuntoRefRequerimiento' value = '"+data.Info[0]['Asunto']+"' />";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                                html += "<div class = 'TipoSolicitud ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tiposolicitud.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tiposolicitud.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input type = 'radio' class = 'TipoSolicitud TipoSolicitud"+obj['Hash']+"' name = 'TipoSolicitud' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Nombre']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tiposolicitud.forEach(obj => {
                                            html += "<td>"+obj['Descripcion']+"</td>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Tipo de Desarrollo:</label>";
                                html += "<div class = 'TipoDesarrollo ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tipodesarrollo.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tipodesarrollo.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input type = 'radio' class = 'TipoDesarrollo TipoDesarrollo"+obj['Hash']+"' name = 'TipoDesarrollo' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Nombre']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tipodesarrollo.forEach(obj => {
                                            html += "<td>"+obj['Descripcion']+"</td>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Sector o Unidad de Negocio:</label>";
                                html += "<div class = 'Sector ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_sectores.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_sectores.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;border-left:1px solid #e6e4e4;'>"
                                                html += "<table width = '100%' >"
                                                    html += "<tr>"
                                                        html += "<th><input onclick = 'SectorAll("+obj['Hash']+")' type = 'checkbox' class = 'Sector"+obj['Hash']+"' name = 'Sector' value = '"+obj['Hash']+"'/></th>"
                                                        html += "<th>"+obj['Sector']+"</th>"
                                                    html += "</tr>"
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_sectores.forEach(obj => {
                                            html += "<th style = 'vertical-align:top;'>"
                                                html += "<table class = 'tableNew '>"
                                                obj['DSector'].forEach(obd =>{
                                                    html += "<tr>"
                                                        html += "<td class = 'CenterText ListaOpcionesSector"+obj['Hash']+"'><input type = 'checkbox' class = 'Sectorx' name = 'SectorD[]' value = '"+obd['Hash']+"'/></td>"
                                                        html += "<td style = 'text-align:justify;'>"+obd['Detalle']+"</td>"
                                                    html += "</tr>"
                                                })
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Objetivos de Comunicación:</label>";
                                html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'ObjetivosComunicacion' rows = '3' disabled>"+data.Info[0]['ObjetivosComunicacion']+"</textarea>"
                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> ¿A quién va dirigido?:</label>";
                                html += "<textarea class = 'form-control' name = 'ObjetivosComunicacion' id = 'DirigidoA' rows = '3' disabled>"+data.Info[0]['Dirigido']+"</textarea>"
                            html += "</div>";
                            html += "<div class='col col-sm-4 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Descripción del requerimiento:</label>";
                                html += "<textarea class = 'form-control' name = 'DescRequerimiento' id = 'DescRequerimiento' rows = '3' disabled>"+data.Info[0]['DescRequerimiento']+"</textarea>"
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Materiales Solicitados:</label>";
                                html += "<div class = 'MaterialesSol ContenedorOpcionesCliente'>"
                                    Seg = (1/data.parcliente_tipomaterial.length);
                                    html += "<table class = 'tableNew'>"
                                        html += "<tr>"
                                        data.parcliente_tipomaterial.forEach(obj => {
                                            html += "<th style = 'width:"+Seg+"%;'>"+obj['Material']+"</th>"
                                        });
                                        html += "</tr>"
                                        html += "<tr>"
                                        data.parcliente_tipomaterial.forEach(obj => {
                                            html += "<th style = 'vertical-align:top;'>"
                                                html += "<table class = 'tableNew '>"
                                                obj['Medio'].forEach(obd =>{
                                                    html += "<tr class = 'PiezasRq'>"
                                                        html += "<td style = 'text-align:justify;width:70%;'>"+obd['Detalle']+"</td>"
                                                        html += "<td class = 'MaterialesSolicitados'><span class = 'HashMedios HidenInformation'>"+obd['Hash']+"</span><input class = 'form-control NumPiezas NumPiezas"+obd['Hash']+"' oninput = 'TotalPiezasRC()' onkeyup = 'TotalPiezasRC()' type = 'number' min = '0'  name = 'CantidadMaterial[]' value = '0' /></td>"
                                                    html += "</tr>"
                                                })
                                                html += "</table>"
                                            html += "</th>"
                                        });
                                        html += "</tr>"
                                    html += "</table>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<strong>TOTAL PIEZAS<p></p>"
                                                html += "<span class = 'TotalPiezas'>0</span></strong>"
                                            html += "</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Mandatorios:</label>";
                                html += "<textarea class = 'form-control' name = 'Mandatorios' id = 'Mandatorios' rows = '3' disabled>"+data.Info[0]['Mandatorios']+"</textarea>"
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> País:</label>";
                                html += "<select class = 'form-control' name = 'Producto' id = 'Producto' >"
                                    //html += "<option value='' selected>Seleccione</option>"
                                    data.productocliente.forEach(obj => {
                                        if( obj['Hash'] == data.Info[0]['IdProducto'] ){
                                            html += "<option value = '"+obj['Hash']+"' selected >"+obj['Producto']+"</option>"
                                        }else{
                                            html += "<option value = '"+obj['Hash']+"'>"+obj['Producto']+"</option>"
                                        }

                                    });
                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Fecha de Salida:</label>";
                                html += "<input type = 'date' class = 'form-control' name = 'FechaSalida' id = 'FechaSalida' value = '"+data.Info[0]['FechaSalida']+"' />";
                            html += "</div>";
                        html += "</div>";
                        html += "<br>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                                html += "<div class='custom-file'>"
                                    html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='RequerimientoCliente.loadFilesRQ(event)' multiple  >"
                                    html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        if( data.Info[0]['Adjuntos'].length > 0 ){
                            html += "<div class = 'form-row'>";
                                html += "<table class = 'tableNew'>"
                                    html += "<tr>"
                                        html += "<th>No.</th>"
                                        html += "<th>Archivo</th>"
                                        html += "<th></th>"
                                    html += "</tr>"
                                    data.Info[0]['Adjuntos'].forEach(obj => {
                                        html += "<tr>"
                                            html += "<td class = 'CenterText NumArc'></td>"
                                            html += "<td >"+obj['Nombre']+"</td>"
                                            html += "<td class = 'CenterText'>"
                                                html += "<span onclick = 'RequerimientoCliente.Cliente_downloadFile(\""+Hash+"X"+obj['Id']+"X2\")'><img src = 'images/descarga.png' class = 'OptionIcon' /></span>"
                                            html += "</td>"
                                        html += "</tr>"
                                    });
                                html += "</table>"
                                html += "<br><a target = '_blank'href = '"+UrlUniversal+"Zipper/ZipRQ.php?Tipo=R&&Hash=1&Req="+$(".NR"+Hash).text()+"'>Descargar Adjuntos en Zip</a>"
                            html += "</div>";
                        }
                        if( data.Info[0]['IdSolicitante'] == data.Info[0]['UserConsult'] ){
                            html += "<div class = 'form-row'>";
                                html += "<div class='col col-sm-12 my-2'>";
                                    html += "<label for='OTC_Empresa'>Adjuntos:</label>";
                                    html += "<div class='custom-file'>"
                                        html += "<input required type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png,.pdf' >"
                                        html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione el Archivo...</label>"
                                    html += "</div>";
                                html += "</div>";
                            html += "</div>";
                        }
                        
                        html += "<br>"
                        html += "<div class = 'form-row HidenInformation SubmitReq'>";
                            html += "<div class='col col-sm-12 my-2'>";
                                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Justifique su Modificación:</label>";
                                html += "<textarea class = 'form-control' name = 'JustMod' id = 'JustMod' rows = '3' disabled></textarea>"
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                    
                    if( data.CLIENTES_EVALUACION_SOLICITUD == 1 && data.Info[0]['Estado'] == 1 ){
                        html += "<div class = 'modal-footer CenterText SubmitReqEval'>";
                            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0);DesqRequerimiento("+Hash+")'>Cerrar</button>";
                            html += "<button type='button' class='btn btn-primary' onclick = 'SendGenProyecto("+Hash+")'>¿Convertir o Asociar a Proyecto?</button>";
                        html += "</div>";
                    }
                    if( data.Info[0]['Estado'] == 10 && data.Info[0]['UserConsult'] == 100180 ){
                        html += "<div class = 'modal-footer CenterText SubmitReqEval'>";
                            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0);DesqRequerimiento("+Hash+")'>Cerrar</button>";
                            html += "<button type='button' class='btn btn-primary' onclick = 'SendAgenciaGenProyecto("+Hash+")'>Enviar a la Agencia</button>";
                        html += "</div>";
                    }
                    
                    html += "<div class = 'modal-footer CenterText HidenInformation SubmitReq'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick = 'ModalEdit(0);DesqRequerimiento("+Hash+")'>Cerrar</button>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'SendEdRequerimientoCliente("+Hash+")'>Actualizar Requerimiento</button>";
                        
                    html += "</div>";
                $(".content_modal").html(html);
                
                $(".TipoSolicitud"+data.Info[0]['IdTipoSolicitud']).attr('checked', 'checked')
                $(".TipoDesarrollo"+data.Info[0]['IdTipoDesarrollo']).attr('checked', 'checked')

                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $("#ModalContentForm").addClass('modal-dialog-scrollable');
                $(".ContenedorOpcionesCliente").css({
                    'width':'100%',
                    'heigth':'200px'
                })
                $(".Sectorx").each(function(){
                    data.Info[0]['Sector'].forEach( obj => {
                        if( $(this).val() == obj['IdDetalle'] ){
                            $(this).attr('checked', 'checked')
                        }
                        $(this).attr('disabled', true)
                    })
                })
                $("#ModalEdit input[type = 'radio'],#ModalEdit input[type = 'checkbox'],#ModalEdit input[type = 'number'],#ModalEdit input[type = 'text'],#ModalEdit select ,#ModalEdit input[type = 'date'],#ModalEdit input[type = 'file'],#ModalEdit textarea").each(function(){
                    $(this).attr('disabled', true)
                    $(this).attr('readonly', true)
                })

                data.Info[0]['Piezas'].forEach( obj => {
                    $(".NumPiezas"+obj['IdMedio']).val(obj['Cantidad'])
                })
                var In = 1;
                $(".NumArc").each(function(){
                    $(this).text(In);
                    In++;
                })
                TotalPiezasRC()

                ModalEdit(1)
                ResizeModal(1)
            } 
        },
        
    })
}

function EdRequerimiento(Hash){
    $("#ModalEdit input[type = 'radio'],#ModalEdit input[type = 'checkbox'],#ModalEdit input[type = 'number'],#ModalEdit input[type = 'text'],#ModalEdit select ,#ModalEdit input[type = 'date'],#ModalEdit input[type = 'file'],#ModalEdit textarea").each(function(){
        $(this).attr('disabled', false)
        $(this).attr('readonly', false)
    })
    $(".SubmitReq").show("slow");
}

function SendEdRequerimientoCliente(Hash){
    var Sectores = [];
    $(".Sectorx").each(function(){
        if( $(this).prop("checked") ){
            Sectores.push({'Id':$(this).val()})
        }
    })
    
    var Materiales = [];
    $(".MaterialesSolicitados").each(function(){
        if( $(this).find("input").val() != 0 ){
            Materiales.push({
                'Hash':$(this).find("span").text(),
                'Num': $(this).find("input").val()
            })
            
        }
    })
    if( $("input[name='TipoSolicitud']:checked").val().length > 0  
            && $("input[name='TipoDesarrollo']:checked").val().length > 0 
            && Sectores.length > 0 
            && Materiales.length > 0 
            && $("#ObjetivosComunicacion").val().length > 3 
            && $("#AsuntoRefRequerimiento").val().length > 5 
            && $("#JustMod").val().length > 5 
            && $("#DirigidoA").val().length > 3 
            && $("#Mandatorios").val().length > 3 
            && $("#Producto").val() != ''  
            && $("#FechaSalida").val() != ''  
        ){
            var formData = new FormData();
            formData.append("Sectores", JSON.stringify(Sectores));
            formData.append("Materiales", JSON.stringify(Materiales));
            formData.append("TipoSolicitud", $("input[name='TipoSolicitud']:checked").val());
            formData.append("TipoDesarrollo", $("input[name='TipoDesarrollo']:checked").val());
            formData.append("ObjetivosComunicacion", $("#ObjetivosComunicacion").val() );
            formData.append("DescRequerimiento", $("#DescRequerimiento").val() );
            formData.append("DirigidoA", $("#DirigidoA").val() );
            formData.append("Mandatorios", $("#Mandatorios").val() );
            formData.append("AsuntoRefRequerimiento", $("#AsuntoRefRequerimiento").val() );
            formData.append("Producto", $("#Producto").val() );
            formData.append("FechaSalida", $("#FechaSalida").val() );
            formData.append("JustMod", $("#JustMod").val() );
            formData.append("Hash", Hash );
            
            var archivos = document.getElementById("ParLogo");
            formData.append("NumArchivos", archivos.files.length );
            for (var i = 0; i < archivos.files.length; i++) {
                formData.append("Archivos", archivos.files[i]);
            }
            
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'c569fc8266c92dbd65aac696064785eeEd',
                success:function(data){
                    alert("Se ha Actualizado el requerimientio No. "+data.Info);
                    ModalEdit(0);
                    BuscarRequerimientosCliente()
                    ConsultarRequerimientoCliente(Hash)
                }
            })
        }else{
            alert("Debe diligenciar todos los campos marcados con (*)")
        }
}

function SendStatusDevCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'c8e66d2eaea6c726081c63fa4f78ba3e',
            success:function(data){
                alert("Se ha regresado a Cliente el requerimiento");
                $(".content_modal").html("");
                ModalEdit(0);
                if( data.Est[0]['Estado'] != 10 ){
                    BuscarEvalRequerimientosCliente()
                }else{
                    BuscarRequerimientosCliente()
                }
                
            }
        })
    }
}

function SendGenProyecto(Hash){
    ModalEdit(0)
    DesqRequerimiento(Hash);
    var html = ""
    html += "<div class='modal-header panel-heading'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<span class = 'TituloBuscador2'>Convertir / Asociar Requerimiento # "+$(".NR"+Hash).text()+" a Proyecto</span>";
                html += "</td>"
                html += "<td>"
                    html += "<img src = '"+UrlUniversal+"images/cerrar_blank.png' class = 'IconClose OptionIcon' onclick = 'ModalEdit2(0);ConsultarRequerimientoCliente("+Hash+")'/>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Necesita:</label>";
                html += "<select class = 'form-control' name = 'OptionSelProyecto' id = 'OptionSelProyecto' onchange = 'RequerimientoCliente.Cliente_ListProyectosCliente("+Hash+")'>"
                    html += "<option value = ''>Seleccione</option>"
                    html += "<option value = 'AP'>Asociar a Proyecto</option>"
                    html += "<option value = 'GP'>Generar nuevo Proyecto</option>"
                html += "</select>"
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Director:</label>";
                html += "<select class = 'form-control' name = 'OptionSelDirector' id = 'OptionSelDirector' >"
                    html += "<option value = ''>Seleccione</option>"
                html += "</select>"
            html += "</div>";
            html += "<div class='col col-sm-4 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Fecha Estimada de Entrega:</label>";
                html += "<input type = 'date' class = 'form-control' name = 'FechaEntrega' id = 'FechaEntrega' requered>"
            html += "</div>";
        html += "</div>";
        html += "<div class = 'form-row HidenInformation ContenedorOts'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span> Seleccione la OT:</label>";
                html += "<div class = 'ContenedorOpcionesCliente ListProyectos'></div>"
            html += "</div>";
        html += "</div>";
        html += "<hr>"
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='OTC_Empresa'>Enviar a:</label>";
            html += "</div>";
        html += "</div>";
        html += "<div class='form-group'>";
            html += "<label for='parDepartamento' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Deartamento:</label>";
            html += "<select name = 'parDepartamento' id='parDepartamento' onchange='Tarea.listaResponsables(); Tarea.listaAsignados();Tarea.listaTipoTarea();' class='form-control' required>";
                html += "<option selected>Seleccione</option>";
            html += "</select>";
        html += "</div>";
        html += "<div class='form-row flex'>"
            html += "<div class='form-group col-md-6'>";
                html += "<label for='parResponsables' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Responsables:</label>";
                html += "<div id='parResponsables' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-right' style='height:15em'>";
                   
                html += "</div>";
            html += "</div>";

            html += "<div class='form-group col-md-6'>";
                html += "<label for='parAsignados' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asignados:</label>";
                html += "<div id='parAsignados' class='overflow-auto shadow p-3 mb-5 bg-white rounded border-left' style='height:15em'>";
                    
                html += "</div>";
            html += "</div>";
        html += "</div>";
        html += "<hr>"
        //listTiposActividad
        html += "<div class='form-row'>"
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parFecha' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Fecha:</label>";
                html += "<input type='date' name='parFecha' id='parFecha' min='"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"' class='form-control' placeholder='Proyecto XYZ'>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Hora:</label>";
                html += "<input type='time' name='parHora' id='parHora' class='form-control'>"
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Solicitud:</label>";
                html += "<select name = 'parTipoSolicitud' id='parTipoSolicitud' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";
                html += "</select>";
            html += "</div>";
            html += "<div class='form-group col-md-3'>";
                html += "<label for='parHora' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Tipo de Tarea:</label>";
                html += "<select name = 'parTipoTarea' id='parTipoTarea' onchange='' class='form-control' required>";
                    html += "<option selected>Seleccione</option>";
                html += "</select>";
            html += "</div>";
        html += "</div>";

        html += "<div class='form-group'>";
            html += "<label for='parAsunto' class='col-form-label'><span class = 'Obligatorio'>(*)</span> Asunto:</label>";
            html += "<input type='text' name='parAsunto' id='parAsunto' value = '"+$(".NameR"+Hash).text()+"'autocomplete = 'off' class='form-control' />"
        html += "</div>";


        html += "<div class='form-group'>";
            html += "<label for='parDescripcion'><span class = 'Obligatorio'>(*)</span> Descripción:</label>";
            html += "<textarea class='form-control' id='parDescripcion' rows='3'></textarea>"
        html += "</div>";
        html += "<div class='form-group'>";
            html += "<label><span class = 'Obligatorio'>Adjuntos</span>: Todos los documentos relacionados con este requerimiento serán adjuntados de manera automática.</label>";
            html += ""
        html += "</div>";
    html += "</div>";
    
    html += "<div class = 'modal-footer'>";
        html += "<button type='button' class='btn btn-secondary' onclick = 'ModalEdit2(0);ConsultarRequerimientoCliente("+Hash+")'>Cerrar</button>";
        html += "<button type='button' class='btn btn-primary' onclick = 'SendGenNProyect("+Hash+")'>Generar</button>";
    html += "</div>";
    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm2").addClass('modal-dialog-scrollable');
    ModalEdit2(1)
    RequerimientoCliente.Cliente_ListarDirectorProyectos()
    Tarea.listaDepartamentos()
    Tarea.listTiposActividad()
    $("#OptionSelDirector").each(function(){
        $(this).attr('disabled', true)
        $(this).attr('readonly', true)
    })
    ResizeModal(1)
}

function SendAgenciaGenProyecto(Hash){
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
        url: UrlGeneral+'f45b0d4eb8c9dfe3a63f35c9ec7b9f05',
        success:function(data){
            alert("Se ha enviado el proyecto a la Agencia ");
            ModalEdit(0);
            BuscarRequerimientosCliente()
        }
    })
}

function SendGenNProyect(Hash){
    var Responsables = [];
    $(".tarea-responsables").each(function(){
        if( $(this).prop("checked") ){
            Responsables.push($(this).val())
        }
    })
    
    var Asignados = [];
    $(".tarea-asignados").each(function(){
        if( $(this).prop("checked") ){
            Asignados.push($(this).val())
        }
    })
    
    if( $("#OptionSelProyecto").val() != '' 
            
            && Responsables.length > 0 
            && Asignados.length > 0 
            && $("#parFecha").val() != '' 
            && $("#parHora").val() != '' 
            && $("#parTipoSolicitud").val() != '' 
            && $("#parDepartamento").val() != '' 
            && $("#FechaEntrega").val() != '' 
            && $("#parTipoTarea").val() != '' 
            && $("#parAsunto").val().length > 5  
            && $("#parDescripcion").val().length > 5  
            ){
            var formData = new FormData();
            formData.append("Tipo", $("#OptionSelProyecto").val());
            formData.append("Dir", $("#OptionSelDirector").val());
            formData.append("FechaEntrega", $("#FechaEntrega").val());
            formData.append("Hash", Hash);
            formData.append("Asignados", JSON.stringify(Asignados));
            formData.append("Responsables", JSON.stringify(Responsables));
            formData.append("parDescripcion", $("#parDescripcion").val());
            formData.append("parAsunto", $("#parAsunto").val());
            formData.append("parTipoTarea", $("#parTipoTarea").val());
            formData.append("parTipoSolicitud", $("#parTipoSolicitud").val());
            formData.append("parFecha", $("#parFecha").val());
            formData.append("parDepartamento", $("#parDepartamento").val());
            formData.append("parHora", $("#parHora").val());
            formData.append("ProyectReq", $("input[name='ProyectReq']:checked").val());
        if( $("#OptionSelProyecto").val() == 'GP' && $("#OptionSelDirector").val () != '' ){
            
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'3119e621db348aad4c460acf0602cbb3',
                success:function(data){
                    alert("Se ha generado el Proyecto "+data.Info);
                    ModalEdit2(0);
                    BuscarEvalRequerimientosCliente()
                }
            })
        }else if( $("#OptionSelProyecto").val() == 'AP' && $("input[name='ProyectReq']:checked").val().length > 0  ){
            
            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url: UrlGeneral+'3119e621db348aad4c460acf0602cbb3',
                success:function(data){
                    alert("Se ha generado el Proyecto "+data.Info);
                    ModalEdit2(0);
                    BuscarEvalRequerimientosCliente()
                }
            })
        }else{
            alert("Debe seleccionar los campos Obligatorios");
        }
        
    }else{
        alert("Debe seleccionar los campos Obligatorios");
    }
}

function SendAprobCliente(Hash){
    if( $("#Estatus").val().length > 3 ){
        var formData = new FormData();
        formData.append("Hash", Hash);
        formData.append("Status", $("#Estatus").val() );

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'07be3299140f82ab94b6e2fa17033f63',
            success:function(data){
                if( data.Info == 1 ){
                    alert("Se ha enviado a Aprobación de Cliente el Requerimiento # "+data.Req);
                }else if( data.Info == 2 ){
                    alert("No se encontraron Archivos para ser enviados a Aprobación de Cliente.\nPor favor realice la validación correspondiente de las Tareas.");
                }
                
                $(".content_modal").html("");
                ModalEdit(0);
                BuscarEvalRequerimientosCliente()
            }
        })
    }
}

function SendEvalCliente(Hash,Tipo){
    if( confirm("¿Está seguro(a) de Ejecutar esta acción?\nTenga en cuenta que al hacerlo, ya no se permitirán realizar modificaciones hasta que sea nuevamente enviado a Aprobación.") ){
        if( $("#Estatus").val().length > 3 && $("#TipoAccionCliente").val() != '' ){
            var formData = new FormData();
            var Tipo = $("#TipoAccionCliente").val();
            formData.append("Hash", Hash);
            formData.append("Status", $("#Estatus").val() );
            formData.append("RITipoAccionCliente", $("#RITipoAccionCliente").val() );
            formData.append("Tipo", Tipo );
            formData.append("NumArchivos", FilesRQ.length );
            for (var i = 0; i < FilesRQ.length; i++) {
                formData.append("Archivos"+i, FilesRQ[i]);
            }
            
            if( Tipo != 246800 ){
                $.ajax({
                    headers:{
                        'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: "post",
                    url: UrlGeneral+'6fd9fadcfba08ccf1ee0edfe29506329',
                    success:function(data){
                        if( data.Info == 1 ){
                            if( Tipo == 123400 ){
                                alert("Se ha Aprobado y Cerrado el Requerimiento # "+data.Req);
                            }else if( Tipo == 246800 ){
                                alert("Se ha Aprobado y se han Solicitado las Piezas Adicionales al Requerimiento # "+data.Req);
                            }else if( Tipo == 370200 ){
                                alert("Se ha enviado el Requerimiento # "+data.Req+" a Ajustar de acuerdo a sus comentarios.");
                            }else if( Tipo == 493600 ){
                                alert("Se ha enviado el Requerimiento # "+data.Req+" a revisión Interna por Parte del Cliente.");
                            }

                        }else if( data.Info == 0 ){
                            alert("No se pudo guardar su Comentario, por favof intentelo de nuevo.");
                        }
                        $(".content_modal").html("");
                        ModalEdit(0);
                        BuscarRequerimientosCliente()
                    }
                })
            }else{
                var Materiales = [];
                $(".MaterialesSolicitados").each(function(){
                    if( $(this).find("input").val() != 0 ){
                        Materiales.push({
                            'Hash':$(this).find("span").text(),
                            'Num': $(this).find("input").val()
                        })

                    }
                })
                if( Materiales.length > 0 ){
                    formData.append("Materiales", JSON.stringify(Materiales));
                    $.ajax({
                        headers:{
                            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                        },
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: "post",
                        url: UrlGeneral+'6fd9fadcfba08ccf1ee0edfe29506329',
                        success:function(data){
                            if( data.Info == 1 ){
                                if( Tipo == 123400 ){
                                    alert("Se ha Aprobado y Cerrado el Requerimiento # "+data.Req);
                                }else if( Tipo == 246800 ){
                                    alert("Se ha Aprobado y se han Solicitado las Piezas Adicionales al Requerimiento # "+data.Req);
                                }else if( Tipo == 370200 ){
                                    alert("Se ha enviado el Requerimiento # "+data.Req+" a Ajustar de acuerdo a sus comentarios.");
                                }

                            }else if( data.Info == 0 ){
                                alert("No se pudo guardar su Comentario, por favof intentelo de nuevo.");
                            }
                            $(".content_modal").html("");
                            ModalEdit(0);
                            BuscarRequerimientosCliente()
                        }
                    })
                }else{
                    alert("El Requerimiento debe tener Materiales para ser enviado a Revisión");
                }
            }
            
        }else{
            alert("Debe complementar los campos Oblogatorios");
        }
    }
}

function SendModfTrafic(Hash){
    var Responsables = [];
    $(".tarea-responsables").each(function(){
        if( $(this).prop("checked") ){
            Responsables.push($(this).val())
        }
    })
    
    var Asignados = [];
    $(".tarea-asignados").each(function(){
        if( $(this).prop("checked") ){
            Asignados.push($(this).val())
        }
    })
    
    if( Responsables.length > 0 
            && Asignados.length > 0 
            && $("#parFechaEntregaC").val() != '' 
            && $("#parFecha").val() != '' 
            && $("#parHora").val() != '' 
            && $("#parTipoSolicitud").val() != '' 
            && $("#parDepartamento").val() != '' 
            && $("#parTipoTarea").val() != '' 
            && $("#parAsunto").val().length > 5  
            && $("#parDescripcion").val().length > 5  
            ){
                var formData = new FormData();
                formData.append("Tipo", $("#OptionSelProyecto").val());
                formData.append("Dir", $("#OptionSelDirector").val());
                formData.append("Hash", Hash);
                formData.append("Asignados", JSON.stringify(Asignados));
                formData.append("Responsables", JSON.stringify(Responsables));
                formData.append("parDescripcion", $("#parDescripcion").val());
                formData.append("parAsunto", $("#parAsunto").val());
                formData.append("parTipoTarea", $("#parTipoTarea").val());
                formData.append("parFechaEntregaC", $("#parFechaEntregaC").val());
                formData.append("parTipoSolicitud", $("#parTipoSolicitud").val());
                formData.append("parFecha", $("#parFecha").val());
                formData.append("parDepartamento", $("#parDepartamento").val());
                formData.append("parHora", $("#parHora").val());
                formData.append("ProyectReq", $("input[name='ProyectReq']:checked").val());
                $.ajax({
                        headers:{
                            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                        },
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: "post",
                        url: UrlGeneral+'a15d0c7c156ad5a16df4125c0778bfab',
                        success:function(data){
                            if( data.Info == 1 ){
                                alert("Se ha reasignado el Requerimiento al Tráfico Interno");
                                ModalEdit(0);
                                BuscarEvalRequerimientosCliente()
                            }else{
                                alert("No hemos logrado guardar la solicitud, intenta nuevamente.");
                            }
                            
                        }
                    })
        
    }else{
        alert("Debe seleccionar los campos Obligatorios");
    }
}

function ViewPiezasReq(){
    if( $("#TipoAccionCliente").val() == '246800' ){
        $(".MaterialesSol").show("slow")
    }else{
        $(".MaterialesSol").hide("slow")
    }
    
}

function ResumenCliente(){
    var formData = new FormData();
    formData.append("Hash", 1);

    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'0936e46c43fb2e07bf283d16df261d76',
        success:function(data){
            var Datos = [];
            var TotalReprocesos = 0;
            
            for(var i = 0; i < data.TotalRA.length; i++){
                for(var p = 0; p < data.TotalRA[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalRA[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            if( data.TotalRA.length > 0 ){
                Datos.push({Reprocesos:parseInt(data.TotalRA[0]['TotalReProcesos']), label:"En Ejecutivos", value: parseInt(data.TotalRA[0]['CantidadRq']), Piezas: parseInt(data.TotalRA[0]['CantidadPiezas']), color:data.Colors[0]['NumColor'] , Option:1})
            }else{
                Datos.push({Reprocesos:0, label:"En Ejecutivos", value: 0, Piezas: 0, Option:1 })
            }
            
            
            if( data.TotalPC.length > 0 ){
                Datos.push({label:"En Cliente", Reprocesos:parseInt(data.TotalPC[0]['TotalReProcesos']), value: parseInt(data.TotalPC[0]['CantidadRq']), Piezas: parseInt(data.TotalPC[0]['CantidadPiezas']), color:data.Colors[1]['NumColor'] , Option:2 })
            }else{
                Datos.push({label:"En Cliente", Reprocesos:0, value: 0, Piezas: 0 , Option:2})
            }
            for(var i = 0; i < data.TotalPC.length; i++){
                for(var p = 0; p < data.TotalPC[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalPC[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            if( data.TotalCreativos.length > 0 ){
                Datos.push({label:"En Creativos", Reprocesos:parseInt(data.TotalCreativos[0]['TotalReProcesos']), value: parseInt(data.TotalCreativos[0]['CantidadRq']), Piezas: parseInt(data.TotalCreativos[0]['CantidadPiezas']), color:data.Colors[2]['NumColor'] , Option:3 })
            }else{
                Datos.push({label:"En Creativos", Reprocesos:0, value: 0, Piezas: 0 , Option:3})
            }
            for(var i = 0; i < data.TotalCreativos.length; i++){
                for(var p = 0; p < data.TotalCreativos[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalCreativos[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            if( data.TotalCerrados.length > 0 ){
                Datos.push({label:"Cerrados", Reprocesos:parseInt(data.TotalCerrados[0]['TotalReProcesos']), value: parseInt(data.TotalCerrados[0]['CantidadRq']), Piezas: parseInt(data.TotalCerrados[0]['CantidadPiezas']), color:data.Colors[3]['NumColor'] , Option:4 })
            }else{
                Datos.push({label:"Cerrados", Reprocesos:0, value: 0, Piezas: 0, Option:4 })
            }
            for(var i = 0; i < data.TotalCerrados.length; i++){
                for(var p = 0; p < data.TotalCerrados[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalCerrados[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            if( data.TotalSuspendidos.length > 0 ){
                Datos.push({label:"Supendidos", Reprocesos:parseInt(data.TotalSuspendidos[0]['TotalReProcesos']), value: parseInt(data.TotalSuspendidos[0]['CantidadRq']), Piezas: parseInt(data.TotalSuspendidos[0]['CantidadPiezas']), color:data.Colors[4]['NumColor'], Option:5  })
            }else{
                Datos.push({label:"Suspendidos", Reprocesos:0, value: 0, Piezas: 0, Option:5 })
            }
            for(var i = 0; i < data.TotalSuspendidos.length; i++){
                for(var p = 0; p < data.TotalSuspendidos[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalSuspendidos[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            
            if( data.TotalCancelados.length > 0 ){
                Datos.push({label:"Cancelados", Reprocesos:parseInt(data.TotalCancelados[0]['TotalReProcesos']), value: parseInt(data.TotalCancelados[0]['CantidadRq']), Piezas: parseInt(data.TotalCancelados[0]['CantidadPiezas']), color:data.Colors[5]['NumColor'], Option:6  })
            }else{
                Datos.push({label:"Cancelados", Reprocesos:0, value: 0, Piezas: 0, Option:6 })
            }
            for(var i = 0; i < data.TotalCancelados.length; i++){
                for(var p = 0; p < data.TotalCancelados[i]['Reprocesos'].length; p++){
                    TotalReprocesos += parseInt(data.TotalCancelados[i]['Reprocesos'][p]['Cantidad'])
                }
            }
            
            var html = "";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle' style = 'color:black;'>Total Requerimientos</th>"
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
                                html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                html += "<td style = 'text-align:center;width:15%;' >% OTs</td>"
                                html += "<td style = 'text-align:center;width:15%;' >Reprocesos</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle' style = 'color:black;'>Total Requerimientos</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_%0ts'>100 %</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(TotalReprocesos)+"</div></td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
                
                //Total Activas y Cerradas
                html += "<div class='col col-sm-6 my-2'>";
                    html += "<div class = 'MainGraf' style = 'width:100%;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<th class = 'Report_Firt_Tittle'  style = 'color:black;'>Distribución Requerimientos</th>"
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
                                html += "<td style = 'text-align:center;width:15%;'>Piezas</td>"
                                html += "<td style = 'text-align:center;width:15%;'>Reprocesos</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td class = 'Report_Firt_Tittle'  style = 'color:black;'>Total Proyectos/Ots</td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Ots'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal Tittle_ReportTotal_Piezas'>0</div></td>"
                                html += "<td class = 'Report_Firt_Tittle' ><div class = 'Tittle_ReportTotal'>"+formatNumber.new(TotalReprocesos)+"</div></td>"
                            html += "</tr>"
                            for(var i = 0; i < Datos.length; i++){
                                html += "<tr class = 'Global_OTs_Cerradas'>"
                                    html += "<td nowrap style = 'color:white;background-color:"+Datos[i]['color']+";font-weight:bold;' class = 'Report_N2_Tittle Cursor' onclick = 'DetalleReqReport("+Datos[i]['Option']+") ' >"+Datos[i]['label']+"</td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+Datos[i]['color']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+Datos[i]['value']+"</div></td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+Datos[i]['color']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+Datos[i]['Piezas']+"</div></td>"
                                    html += "<td nowrap style = 'color:white;background-color:"+Datos[i]['color']+";font-weight:bold;' class = 'Report_N2_Tittle ' ><div class = 'Tittle_ReportTotal '>"+formatNumber.new(Datos[i]['Reprocesos'])+"</div></td>"
                                html += "</tr>"
                            }
                        html += "</table>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            html += "<hr>"
            if( data.DataSemanas.length > 0 ){
                html += "<div class = 'MainGraf' style = 'width:100%;'>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th class = 'Report_Firt_Tittle' style = 'color:black;'>CALENDARIO DE ENTREGAS</th>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"
            }
            for(var tp = 0; tp < data.DataSemanas.length;tp++){
                    html += "<div class = 'form-row' style = 'overflow-x:scroll;'>"
                        html += "<div class='form-group col-md-12'>";
                            html += "<table style = 'width:100%;'>"
                                html += "<tr>"
                                    html += "<th colspan = '21' class = 'TituloTablasResumen'>ENTREGABLES PENDIENTES SEMANA "+data.DataSemanas[tp]['Semana']+"</th>"
                                html += "</tr>"
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas[tp]['Detalle'].length;y++){
                                        html += "<th class = 'TablaReportes_TituloPrincipal' colspan = '2' style = 'width:14.28%;'>"+data.DataSemanas[tp]['Detalle'][y]['Dia']+"</th>"
                                        html += "<th></th>"
                                    }
                                html += "</tr>"
                                html += "<tr>"
                                    for(var y = 0; y < data.DataSemanas[tp]['Detalle'].length;y++){
                                        if( data.DataSemanas[tp]['Detalle'][y]['Entregables'].length > 0 ){
                                            html += "<th class = 'TablaReportes_Cuerpo_Center Cursor' onclick = 'ConsultarRequerimientoCliente("+data.DataSemanas[tp]['Detalle'][y]['Entregables'][0]['Reqhash']+")'>"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][0]['Req']+"</th>"
                                            //html += "<th class = 'TablaReportes_Cuerpo' nowrap>"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][0]['Asunto']+"</th>"
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'>"+data.DataSemanas[tp]['Detalle'][y]['Entregables'][0]['CantidadPiezas']+"</th>"
                                            html += "<th></th>"
                                        }else{
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'></th>"
                                            //html += "<th class = 'TablaReportes_Cuerpo_Center'></th>"
                                            html += "<th class = 'TablaReportes_Cuerpo_Center'>0</th>"
                                            html += "<th></th>"
                                        }
                                    }
                                html += "</tr>"
                                
                            html += "</table>"
                        html += "</div>"
                    html += "</div>"
                    
                }
                html += "<hr>"
                html += "<div class = 'form-row DetalleEstados'></div>"
                if( $(".JobKeyUser").text() == 100157 ){
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<span class = 'TituloBuscador'>Ots y Entregables</span>";
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                        html += "<div class = 'form-row'>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Empresa'>Empresa:</label>";
                                html += "<select class ='form-control' name = 'OTC_Empresa' id = 'OTC_Empresa' onchange='OTCliente.listasWithEmpresa(event)'>";
                                    html += "<option value='246800' selected>La Estación</option>";
                                html += "</select>";
                            html += "</div>";
                            html += "<div class='col col-sm-3 my-2'>";
                                html += "<label for='OTC_Cliente'>Cliente:</label>";
                                html += "<select class ='form-control' name = 'OTC_Cliente' id = 'OTC_Cliente' onchange = 'TRA_Report_ListarProfesionalesCliente();TRA_Report_ListarProductosCliente()'>";
                                    html += "<option value='31590400' selected>Yara Colombia S.A.</option>";
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
                }
                html += "<hr>"
                html += "<div class = 'ResumenGeneralOts'></div>"
            $(".SummaryInfo").html(html)
            TRA_Report_ListarProfesionalesCliente();
            TRA_Report_ListarProductosCliente()
            Morris.Donut({
                element: 'Graph_TotalOtsGeneral',
                data: [

                  {label: "Total Requerimientos", value: parseInt(data.TotalGeneral),color:Datos[0]['color'],Piezas:parseInt(data.TotalPiezas)}
                ]
            });
            
            Morris.Donut({
                element: 'Graph_TotalOts',
                data: Datos
            });
            $(".Global_OTs_Total .Tittle_ReportTotal_Ots").html(formatNumber.new(parseInt(data.TotalGeneral)) )
            $(".Global_OTs_Total .Tittle_ReportTotal_Piezas").html(formatNumber.new(parseInt(data.TotalPiezas)) )
        }
    })
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
            OTC_TextBusqueda:$("#OTC_TextBusquedaReport").val(),
            OTC_FechaDesde:$("#OTC_FechaDesde").val(),
            OTC_FechaHasta:$("#OTC_FechaHasta").val(),
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
                    html += "<th ></th>"
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
/*
 * 
 * @param {type} e
 * @return {undefined}
function ResumenCliente(){
    var formData = new FormData();
    formData.append("Hash", 1);

    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'0936e46c43fb2e07bf283d16df261d76',
        success:function(data){
            
            var html = "";
            var Color = "";
            //html += "<p style = 'font-size:14px;'>A continuación se relaciono la información referente a los Requerimientos que se han generado con este usuario:</p>"
            html += "<br>"
            html += "<div style = 'height:350px;width:100%;' class = 'GrafSummaryClient' id = 'GrafSummaryClient'></div>"
            html += "<br>"
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Concepto</th>"
                    html += "<th>Cantidad</th>"
                    html += "<th>Porcentaje</th>"
                html += "</tr>"
                for(var i = 0; i < data.Summary.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                        html += "<td>"+data.Summary[i]['label']+"</td>"
                        html += "<td class = 'CenterText'>"+data.Summary[i]['y']+"</td>"
                        var Porcen = (data.Summary[i]['y']/data.TotalGeneral)*100;
                        html += "<td class = 'CenterText'>"+(Porcen.toFixed(2))+" %</td>"
                    html += "</tr>"
                }
                html += "<tr>"
                        html += "<th class = 'CenterText' colspan = '2'>Total</th>"
                        html += "<th class = 'CenterText'>"+data.TotalGeneral+"</th>"
                        html += "<th class = 'CenterText'>100 %</th>"
                    html += "</tr>"
            html += "</table>"
            html += "<br>"
            html += "<hr>"
            
            var TotalProyectoMeses = [];
            html += "<div class = 'form-row FormsGeneral'>";
            for(var p = 0; p < data.Years.length; p++){
                
                html += "<div class='col col-sm-3 my-3' onclick = 'ViewReportCliente("+data.Years[p]+")'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 class = 'Cursor'>"+data.Years[p]+"</h5>"
                    html += "</div>"
                html += "</div>"
                
            }
            html += "</div>"
            for(var p = 0; p < data.Years.length; p++){
                var DatosReport = [];
                if( p == 0 ){
                    DatosReport = data.Requerimientos_YearAnt;
                }
                if( p == 1 ){
                    DatosReport = data.Requerimientos_YearAct;
                }
                
                html += "<div class = 'HidenInformation ContentYear ContentYear"+data.Years[p]+"' style = 'width:100%;'>"
                    html += "<div style = 'width:100%;' class = 'CenterText'>"
                        html += "<p></p><span class = 'TituloPantalla' style='color:#1B4177;font-weight:bold;'><center>COMPORTAMIENTO "+data.Years[p]+"</center></span><p></p>"
                        html += "<div >"
                            html += "<canvas id='myChart"+data.Years[p]+"' class = 'ContentGrf'></canvas>"
                        html += "</div>"
                    html += "</div>"
                    html += "<br>"
                    
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>REQUERIMIENTOS "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['Req']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Req']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"
                    html += "<br>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>PIEZAS SOLICITADAS "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['Piezas']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Piezas']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"
                    html += "<br>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>PROYECTOS / OTS ACTIVOS "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['PAct']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Piezas']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"
                    html += "<br>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>PROYECTOS / OTS CERRADOS "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['PInact']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Piezas']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"

                    html += "<br>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>TAREAS "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['Tareas']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Piezas']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"
                    
                    html += "<br>"
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<th colspan = '15' class = 'subtitulos_mes CenterText border_top'>REPROCESOS CLIENTE "+data.Years[p]+"</th>"
                        html += "</tr>"
                        html += "<tr>"
                            html += "<th class = 'CenterText cabecera_th_dark ' colspan = '15'>Meses</th>"
                        html += "</tr>"
                        html += "<tr>"
                            var yi = 0;
                            for(var x = 0; x < DatosReport.length;x++){
                                html += "<th class = 'subtitulos_principales CenterText' style = 'width:120px;'>"+DatosReport[x]['NombreMes']+"</th>"
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                        yi++;
                                    }
                            }
                        html += "</tr>"
                        html += "<tr>"
                        yi = 0;
                            for(var y = 0; y < DatosReport.length;y++){

                                html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+DatosReport[y]['ReprocesosCliente']+"</td>"
                                //TotalProyectoMeses[y] += parseInt(data.Requerimientos_YearAct[y]['Piezas']);
                                if( yi == 2 ){
                                    html += "<th class = 'BorderCero'></th>"
                                    yi = 0;
                                }else{
                                    yi++;
                                }
                            }
                        html += "</tr>"
                    html += "</table>"
                html += "</div>"
            }
            
            
            html += "<br>"
            html += "<hr>"
            /*
            html += "<div class = 'form-row FormsGeneral'>";
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Total A la Fecha</h5>"
                        html += "<div class = 'container'>"+data.TotalGeneral+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Total Mes Actual</h5>"
                        html += "<div class = 'container'>"+data.TotalMes+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Total Semana Actual</h5>"
                        html += "<div class = 'container'>"+data.TotalSemana+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>En Revisión Agencia</h5>"
                        html += "<div class = 'container'>"+data.TotalRA+"</div>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            
            html += "<div class = 'form-row FormsGeneral'>";
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Asignados En Proceso</h5>"
                        if( data.TotalPro > 0 ){
                            html += "<div class = 'container' style = 'color:#11d811;font-weight:bold;'>"+data.TotalPro+"</div>"
                        }else{
                            html += "<div class = 'container'>"+data.TotalPro+"</div>"
                        }
                    html += "</div>"
                html += "</div>"
                
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Pendientes de Aprobación</h5>"
                        if( data.TotalPA > 0 ){
                            html += "<div class = 'container' style = 'color:#red;font-weight:bold;'>"+data.TotalPA+"</div>"
                        }else{
                            html += "<div class = 'container'>"+data.TotalPA+"</div>"
                        }
                    html += "</div>"
                html += "</div>"
                
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Devueltos</h5>"
                        if( data.TotalDev > 0 ){
                            html += "<div class = 'container' style = 'color:#red;font-weight:bold;'>"+data.TotalDev+"</div>"
                        }else{
                            html += "<div class = 'container'>"+data.TotalDev+"</div>"
                        }
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Aprobado con Piezas Adicionales</h5>"
                        html += "<div class = 'container'>"+data.TotalAprobadoConAjuste+"</div>"
                    html += "</div>"
                html += "</div>"
                
            html += "</div>"
            html += "<div class = 'form-row FormsGeneral'>";
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>En Ajuste</h5>"
                        html += "<div class = 'container'>"+data.TotalAjuste+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5>Cerrados / Finalizados</h5>"
                        html += "<div class = 'container'>"+data.TotalCerrados+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Suspendidos</h5>"
                        html += "<div class = 'container'>"+data.TotalSuspendidos+"</div>"
                    html += "</div>"
                html += "</div>"
                html += "<div class='col col-sm-3 my-3'>"
                    html += "<div class = 'CardReport'>"
                        html += "<h5 >Cancelados</h5>"
                        html += "<div class = 'container'>"+data.TotalCancelados+"</div>"
                    html += "</div>"
                html += "</div>"
            html += "</div>"
            
            $(".SummaryInfo").html(html).css({
                'padding':'5px'
            });
            $(".container").css({
                'font-size':'18px'
            })
            $(".CardReport h5").css({
                'font-size':'14px'
            })
            
            var Meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            var Colors = [];
            for(var p = 0; p < data.Colors.length; p++){
                Colors.push( data.Colors[p]['NumColor'] );
            }
                
            for(var p = 0; p < data.Years.length; p++){
                var DatosReport = [];
                if( p == 0 ){
                    DatosReport = data.Requerimientos_YearAnt;
                }
                if( p == 1 ){
                    DatosReport = data.Requerimientos_YearAct;
                }
                var TRequerimientos = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //TRequerimientos.push({ label:DatosReport[t]['NombreMes'] , y: DatosReport[t]['Req']})
                    TRequerimientos.push( DatosReport[t]['Req'])
                }
                var Tpiezas = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //Tpiezas.push({ label: DatosReport[t]['NombreMes'] , y: DatosReport[t]['Piezas'] })
                    Tpiezas.push( DatosReport[t]['Piezas'] )
                }
                var TProyectosAct = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //TProyectosAct.push({ label: DatosReport[t]['NombreMes'] ,y: DatosReport[t]['PAct'] })
                    TProyectosAct.push( DatosReport[t]['PAct'] )
                }
                var TProyectosCer = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //TProyectosCer.push({ label: DatosReport[t]['NombreMes'] , y: DatosReport[t]['PInact'] })
                    TProyectosCer.push(DatosReport[t]['PInact'])
                }
                var TTareas = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //TTareas.push({  label: DatosReport[t]['NombreMes'] , y: DatosReport[t]['Tareas'] })
                    TTareas.push(DatosReport[t]['Tareas'])
                }
                var TRCliente = [];
                for( var t = 0; t < DatosReport.length; t++ ){
                    //TTareas.push({  label: DatosReport[t]['NombreMes'] , y: DatosReport[t]['Tareas'] })
                    TRCliente.push(DatosReport[t]['ReprocesosCliente'])
                }
                

                var Tctx = $("#myChart"+data.Years[p]);
                Tctx.height = 200;
                var myChart = new Chart(Tctx, {
                    type: 'line',
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Comportamiento Requerimientos '+data.Years[p],
                                font: {
                                    size: 20,
                                },
                                Color: '#1B4177'
                            },
                            legend:{
                                display:false
                            }
                        },
                        scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Month'
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Value'
                          },
                          min: 0,
                          max: 100,
                          ticks: {
                            // forces step size to be 50 units
                            stepSize: 50
                          }
                        }
                      }
                    },
                    data: {
                        datasets: [
                            {
                                type: 'line',
                                label: 'Requerimientos',
                                data: TRequerimientos,
                                borderColor: '#454545',
                                tension: 0.1,
                                backgroundColor: 'rgba(250, 128, 114,0.2)',
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            }, 
                            {
                                type: 'line',
                                label: 'Piezas',
                                data: Tpiezas,
                                borderColor: data.Colors[1]['NumColor'],
                                tension: 0.1,
                                backgroundColor: 'rgba(75, 192, 192,0.2)',
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            },
                            {
                                type: 'line',
                                label: 'Proyectos Activos',
                                data: TProyectosAct,
                                borderColor: data.Colors[3]['NumColor'],
                                tension: 0.1,
                                backgroundColor: 'rgba(128, 128, 128,0.2)',
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            },
                            {
                                type: 'line',
                                label: 'Proyectos Cerrados',
                                data: TProyectosCer,
                                borderColor: data.Colors[8]['NumColor'] ,
                                tension: 0.1,
                                backgroundColor: 'rgba(255, 0, 255,0.2)',
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            },
                            {
                                type: 'line',
                                label: 'Tareas',
                                data: TTareas,
                                borderColor:data.Colors[6]['NumColor'],
                                tension: 0.1,
                                backgroundColor: 'rgba(248, 196, 113,0.2)' ,
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            },
                            {
                                type: 'line',
                                label: 'Reprocesos Cliente',
                                data: TRCliente,
                                borderColor:data.Colors[6]['NumColor'],
                                tension: 0.1,
                                backgroundColor: 'rgba(59, 209, 143,0.2)' ,
                                borderWidth: 2,
                                fill: false,
                                datalabels: {
                                    weight:'bold',
                                    backgroundColor: function(context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    size:16,
                                    align: 'end',
                                    anchor: 'start',
                                    borderRadius: 4,
                                    color: 'black',
                                    formatter: Math.round,
                                    padding: 6
                                }
                            },
                        ],
                        labels: Meses,
                    },
                    plugins: [ChartDataLabels],
                        options: {

                        }
                });
            
            }

            var Summary = [];
            var SummaryText = [];
            var SummaryColors = [];
            for(var i = 0; i < data.Summary.length;i++){
                Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.Summary[i]['y'], label:data.Summary[i]['label']}); 
                //Summary.push(data.Summary[i]['y']); 
                SummaryText.push(data.Summary[i]['label']); 
                SummaryColors.push(data.Colors[ data.Summary.length - i]['NumColor']); 
            }
          
            var chart = new CanvasJS.Chart("GrafSummaryClient", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Estado Actual Requerimientos",
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
            var dataPoint = chart.options.data[0].dataPoints;
            var total = data.TotalGeneral;
            for(var i = 0; i < dataPoint.length; i++) {
                chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
            }
            chart.render();
            
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()

        }
    })
}
*/

function DetalleReqReport(Option){
    var formData = new FormData();
    formData.append("Hash", Option);    
    $.ajax({
        headers:{
            'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "post",
        url: UrlGeneral+'0936e46c43fb2e07bf283d16df261d76x',
        success:function(data){
            var html = "";
            html += "<table style='width:100%;'>";
                html += "<tr>"
                    html += "<th colspan = '8' class = 'TituloTablasResumen'>DETALLE DISTRIBUCIÓN REQUERIMIENTOS</th>"
                html += "</tr>"
                html += "<tr>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>No.</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>No. Requerimiento</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Asunto</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Ingreso</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Necesidad</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>Fecha Promedita de Entrega</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'># Reprocesos</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'># Piezas</th>"
					//html += "<th class = 'TablaReportes_TituloPrincipal'>Acciones</th>"
                html += "</tr>"
                var Total = 0
                var Total2 = 0
                for(var i = 0; i < data.Info.length;i++){
                    html += "<tr>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(i+1)+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Info[i]['Id']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>"+data.Info[i]['Asunto']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>"+data.Info[i]['Fecha']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>"+data.Info[i]['FechaSalida']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo'>"+data.Info[i]['FechaEntrega']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center Cursor' onclick = 'EventRequerimientoReportes("+data.Info[i]['IdHash']+", "+data.Info[i]['Id']+")'>"+data.Info[i]['TotalReProcesos']+"</td>"
                        html += "<td class = 'TablaReportes_Cuerpo_Center'>"+data.Info[i]['CantidadPiezas']+"</td>"
                    html += "</tr>"
                    
                    Total += parseInt(data.Info[i]['CantidadPiezas'])
                    Total2 += parseInt(data.Info[i]['TotalReProcesos'])
                }
                html += "<tr>"
                    html += "<th class = 'TablaReportes_TituloPrincipal' colspan = '6'>TOTAL</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>"+formatNumber.new(Total2)+"</th>"
                    html += "<th class = 'TablaReportes_TituloPrincipal'>"+formatNumber.new(Total)+"</th>"
                html += "</tr>"
            html += "</table>"
            $(".DetalleEstados").html(html)
        }
    });
}

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

function ViewReportCliente(Y) {
    $(".ContentYear").hide("slow");
    $(".ContentYear"+Y).show("slow");
    
}