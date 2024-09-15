var OC_Volumen = 0;
var OC_ValorDoc = 0;
var OC_Impuestos = 0;
var OC_Total = 0;
var HashFactCliente = 0;
var CarteraPendienteCliente = [];
var CarteraPendienteClienteDetalle = [];
var ColorsGrhp = [];

var PagosAdmin = [];

const OTCliente = {
    listasWithEmpresa: function(e) {
        const datax = e.target.value
        if (!datax) {
            return
        }
        printDataAjax('../bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa: datax}, data => {
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
    },listaInit: function() {
        printDataAjax('../bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa:null}, data => {
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
    enviar: function (e) {
        sendForm(e, () => {
            $('#ModalEdit').modal('hide')
            BuscarTablaOTProyecto()
            notificacionesGenerales()
        })
    },
    listaEmpresas: function() {
        printDataAjax('../dc47e12ac4a1068c236507bd36359ebb', {}, data => {
            
            html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                if( $(".NEmpx").text() == obj['Hash'] ){
                    html += "<option selected value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
                }
                
            });
            $('#parEmpresa').html(html)
            OTCliente.listaUnidadesNegocio();OTCliente.listaProveedores()  
        })
    },
    listaBancos: function() {
        printDataAjax('../6856c4172a3242a89f38672dda25b95c', {}, data => {
            
            html = '<option value="" selected>Seleccione</option>'
            data.Bancos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parBancos').html(html)
        })
    },
    listaProveedores: function() {
        printDataAjax('../83efb8f47c4a745907aeed34c800e926', {Hash: $('#parEmpresa').val()}, data => {
            
            html = '<option value="" selected>Seleccione</option>'
            data.Proveedores.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Proveedor']+"</option>"
            });
            
            $('#parProveedor').html(html)
        })
    },
    listaUnidadesNegocio: function() {
        const datax = $('#parEmpresa').val()
        if (!datax) {
            return
        }
        printDataAjax('../bde5b488693c2d2c22757174de731d4f', {HashEmpresa: datax}, data => {
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
        printDataAjax('../5ad0b953c7738fc7c077747ee8da3cb5', {HashEmpresa: data}, data => {
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
        printDataAjax('../8a03824e9ff6949d861b44a40aed14e9', {HashCliente: data}, data => {
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
        printDataAjax('../49d382bc75c15245ebb9c4a2d4cd896e',  {HashProducto:data}, data => {
            html = '<option selected>Seleccione</option>'
            data.subproductos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parSubProducto').html(html)
        })
    },
    listaEjecutivo: function() {
        printDataAjax('../a752ef4487f59afe53e6cd67be658a5d', {}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.ejecutivos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Usuario']+"</option>"
            });
            $('#parEjecutivo').html(html)
        })
    },
    listaDirectores: function() {
        printDataAjax('../2032e89f5721d0663d5649d85504934a', {}, data => {
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
        printDataAjax('../9b909eb70578db07c1f5aee7553a59d6', {HashCliente: data}, data => {
            html = '<option value="" selected>Seleccione</option>'
            data.profesionales.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#parProfesional').html(html)
        })
    },
    listSearchEmpresas: function () {
        printDataAjax('../dc47e12ac4a1068c236507bd36359ebb', {}, data => {
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
                html += "<option value = '"+obj['Hash']+"'>"+obj['Estado']+"</option>"
            });
            $('#OTC_Estado').html(html)
        })
    },
    listarImpuestos: function () {
        printDataAjax('../e0cca638ccf1be637638963314e49beb', {Hash:$("#parEmpresa").val()}, data => {
            html = "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>Sel.</th>"
                    html += "<th>Impuesto</th>"
                    html += "<th>Porcentaje</th>"
                html += "</tr>"
                data.Impuestos.forEach(obj => {
                    html += "<tr>" 
                        html += "<td class = 'CenterText'><input type = 'checkbox' name = 'ImpuestosFacturaPpto' class = 'SValorImpuestoFC' value = '"+obj['Id']+"' onclick = 'CalcularImpuestosFactura()'/></td>"
                        html += "<td>"+ obj['TipoImpuesto'] +"</td>"
                        html += "<td class = 'CenterText ValorImpuestoFC"+obj['Id']+"'>"+ obj['Valor'] +" %</td>"
                    html += "</tr>" 
                });
            html += "</table>"
            $('.ContentImpuestos').html(html)
        })
    },
}

function CalcularImpuestosFactura(){
    var ValorFactura = $("#CostoUnitario_real").text();
    
    var ValorTotal = 0;
    var ValorTotalG = 0;
    $(".SValorImpuestoFC").each(function(){
        if( $(this).prop("checked")  ){
            var temp = $(this).val();
            var temp2 = $(".ValorImpuestoFC"+temp).text();
            console.log($(".ValorImpuestoFC"+temp).text())
            var v = temp2.split(' ');
            ValorTotal += ValorFactura*(v[0]/100);
        }
    })
    ValorTotalG = parseFloat(ValorFactura) + parseFloat(ValorTotal);
    
    $(".ValorImpuestos").val(formatNumber.new(ValorTotal));
    $(".ValorImpuestos_real").text(ValorTotal);
    FormatCampoNum("ValorImpuestos","ValorImpuestos_real")
    
    $(".ValorTotal").val(formatNumber.new(ValorTotalG));
    $(".ValorTotal_real").text(ValorTotalG);
    FormatCampoNum("ValorTotal","ValorTotal_real")
}
function formatValorCompra(){
    var tval = $(".valortasa").val();
    if(tval != ""){
        var valx = tval.split("$ ");
        if( valx.length > 1 ){
            var val = valx[1];
            var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < valor.length; i++){
                    val_final += ""+valor[i];
            }
        }else{
            var val = tval.split("");
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        $(".valortasa").val("$ "+formatNumber.new(val_final));
        $(".valortasadonacion").val(val_final);
        
    }
}

function CrearPagoAdministrativo(){
    PagosAdmin = [];
    ModalEdit(1)
    var html = ""
    TituloVentana = "Crear Pago Administrativo"
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
        html += "<div class='modal-body'>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Empresa'>Empresa:</label>";
                    html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Empresa'>Bancos:</label>";
                    html += "<select class ='form-control' name = 'parBancos' id = 'parBancos'>";
                        html += "<option value='' selected>Todos</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label for='OTC_Unidad'>Fecha de Pago:</label>";
                    html += "<input type = 'date' id = 'FechaPago' class = 'form-control' />";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label for='OTC_Empresa'>A continuación Ingrese la información detallada de los Pagos:</label>";
                html += "</div>";
            html += "</div>";

            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label>Nombre:</label>"
                    html += "<input type = 'text' class = 'form-control _Nombre' value = '' />"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label>Proveedor:</label>"
                    html += "<input type = 'text' class = 'form-control _Proveedor' value = '' />"
                html += "</div>";
                html += "<div class='col col-sm-3 my-2'>";
                    html += "<label>Cliente:</label>"
                    html += "<input type = 'text' class = 'form-control _Cliente' value = '' />"
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label>Valor:</label>"
                    html += "<input autocomplete='off' id = 'valortasa' onkeyup = 'formatValorCompra()' type='text' class = 'form-control valortasa' value = '$ ' required/>";
                    html += "<input type='hidden' class ='form-control valortasadonacion valorcompra' name = 'valortasa' value = '0' />";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<p></p>"
                    html += "<div class = 'BarraIconos' onclick = 'AdicionarItemPagosAdmin()'>";
                        html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' />";
                        html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' >Agregar</span>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";

            html += "<hr>"
            html += "<div id = 'ListDetallePagos'style = 'width:100%;height:350px;overflow-y:scroll;'>"
                
            html += "</div>"; 
            
        html += "</div>";
        html += "<div class = 'modal-footer CenterText'>"  
            html += "<span class = 'btn btn-primary' onclick = '__GuardarPagoManual()'>Guardar</span>"
        html += "</div>"

    $(".content_modal").html(html);
    OTCliente.listaEmpresas()
    $.ajax({
        type:'POST',
        url:UrlGeneral+'6856c4172a3242a89f38672dda25b95c',
        data:{
            _token:document.getElementsByName('_token')[0].value
        },
        success:function(data){
            html = '<option value="" selected>Seleccione</option>'
            data.Bancos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parBancos').html(html)
        }
    })
    
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ResizeModal(1)
}

function __GuardarPagoManual(){
    if( $("#parEmpresa").val() != "" && $("#parBancos").val() != "" && $("#FechaPago").val() != "" && PagosAdmin.length > 0){
        var formData = new FormData();
        formData.append("Hash",$(".NEmpx").text());
        formData.append("parEmpresa",$("#parEmpresa").val());
        formData.append("parBancos",$("#parBancos").val());
        formData.append("FechaPago",$("#FechaPago").val());
        formData.append("Pagos", JSON.stringify(PagosAdmin));
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url: UrlGeneral+'__GuardarPagosManuales',
            success:function(data){
                ModalEdit(0)
            }
        })
    }else{
        alert("No ha Completado todos los campos !!!")
    }
}

function AdicionarItemPagosAdmin(){
    PagosAdmin.push({
        'Nombre':$("._Nombre").val(),
        'Proveedor':$("._Proveedor").val(),
        'Cliente':$("._Cliente").val(),
        'Presupuesto':'ADMINISTRATIVO',
        'Valor':$(".valortasadonacion").val()
    })
    $("._Nombre").val("")
    $("._Proveedor").val("")
    $("._Cliente").val("")
    $(".valortasadonacion").text("0")
    $(".valortasa").val("$ ")
    _TBL_ListPagosAdminManual()
}

function _TBL_ListPagosAdminManual(){
    var html = "<table class = 'tableNew'>"
    html += "<tr>"
        html += "<th>No.</th>"
        html += "<th>Nombre</th>"
        html += "<th>Proveedor</th>"
        html += "<th>Cliente</th>"
        html += "<th>Valor</th>"
        html += "<th>¿Eliminar?</th>"
    html += "</tr>"
    var Total = 0;
    for( var i = 0; i < PagosAdmin.length;i++ ){
        Total += parseFloat(PagosAdmin[i]['Valor'])
        html += "<tr>"
            html += "<td Class = 'CenterText'>"+(i+1)+"</td>"
            html += "<td >"+ PagosAdmin[i]['Nombre'] +"</td>"
            html += "<td >"+ PagosAdmin[i]['Proveedor'] +"</td>"
            html += "<td >"+ PagosAdmin[i]['Cliente'] +"</td>"
            html += "<td >"+ HtmlValores_Doble(PagosAdmin[i]['Valor']) +"</td>"
            html += "<td Class = 'CenterText'><img src = '../images/eliminar.png' class = 'OptionIcon' onclick = '_TBL_SplicePagosManual("+i+")'/></td>"
        html += "</tr>"
    }
    html += "<tr><td style = 'border:0px;'><br></td></tr>"
    html += "<tr>"
        html += "<th colspan = '4'>TOTAL</th>"
        html += "<th >"+HtmlValores_Doble(Total)+"</th>"
    html += "</tr>"
    html += "</table>"
    $("#ListDetallePagos").html ( html )
}

function _TBL_SplicePagosManual(i){
    PagosAdmin.splice(i)
    _TBL_ListPagosAdminManual()
}

function Admin_FormAdminPagos(HashE){
    var html = ""

    TituloVentana = "Detalle Pagos"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "" 
        html += "<div >";
            
            html += "<div >";
                html += "<table>";
                    html += "<tr>"
                        html += "<td class = 'BotonesSuperiores'>"
                            html += "<div class = 'BarraIconos'>";
                                html += "<img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = 'CrearPagoAdministrativo()' />";
                                html += "<span class='FirstText Cursor' style='color:#1B4075;font-weight: bold;' onclick = 'CrearPagoAdministrativo()' >Crear Pago Administrativo</span>";
                            html += "</div>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'>Bancos:</label>";
                        html += "<select class ='form-control' name = 'parBancos' id = 'parBancos'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'>Fecha de Pago:</label>";
                        html += "<input type = 'date' id = 'FechaPago' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarProgPago()'/>";
                    html += "</div>";
                html += "</div>";
                
                html += "<br>"
                
                html += "<div style = 'width:100%;overflow-x:scroll;'>"
                    html += "<table class = 'tableNew' id = 'ListFacturasProveedor'>"
                        html += "<thead>"
                            html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Fecha Pago</th>"
                            html += "<th>Empresa</th>"
                            html += "<th>Banco</th>"
                            html += "<th>Estado</th>"
                            html += "<th>Generado Por</th>"
                            html += "<th>Valor</th>"
                            html += "<th>¿Enviar a Aprobación?</th>"
                            html += "<th>Estatus Aprobación</th>"
                            html += "<th>¿Pago Realizado?</th>"
                        html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>";   
            html += "</div>";
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    $.ajax({
        type:'POST',
        url:UrlGeneral+'6856c4172a3242a89f38672dda25b95c',
        data:{
            _token:document.getElementsByName('_token')[0].value
        },
        success:function(data){
            html = '<option value="" selected>Seleccione</option>'
            data.Bancos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parBancos').html(html)
        }
    })
    TablaListadoPromPagos();
}

function Admin_FormAdminPagosAprob(){
    var html = ""
    TituloVentana = "Revisión Pagos"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = "" 
        html += "<div >";
            html += "<div >";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'>Bancos:</label>";
                        html += "<select class ='form-control' name = 'parBancos' id = 'parBancos'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'>Fecha de Pago:</label>";
                        html += "<input type = 'date' id = 'FechaPago' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarProgPagoAprob()'/>";
                    html += "</div>";
                html += "</div>";
                
                html += "<br>"
                
                html += "<div style = 'width:100%;overflow-x:scroll;'>"
                    html += "<table class = 'tableNew' id = 'ListFacturasProveedor'>"
                        html += "<thead>"
                            html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Fecha Pago</th>"
                            html += "<th>Empresa</th>"
                            html += "<th>Banco</th>"
                            html += "<th>Estado</th>"
                            html += "<th>Generado Por</th>"
                            html += "<th>Valor</th>"
                            html += "<th>Detalle</th>"
                            html += "<th>Observaciones</th>"
                            html += "<th>¿Aprobar?</th>"
                            html += "<th>¿Rechazar?</th>"
                        html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>";   
            html += "</div>";
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    $.ajax({
        type:'POST',
        url:UrlGeneral+'6856c4172a3242a89f38672dda25b95c',
        data:{
            _token:document.getElementsByName('_token')[0].value
        },
        success:function(data){
            html = '<option value="" selected>Seleccione</option>'
            data.Bancos.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['NombreComercial']+"</option>"
            });
            $('#parBancos').html(html)
        }
    })
    TablaListadoPromPagosAprob();
}


function Admin_FormFacturaProveedor(HashEmpresa){
    var html  = "";
    TituloVentana = "Histórico Factura Proveedor"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""
    $(".SubMenu").html("")
        /*html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Registrar Facturas Proveedor</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";*/
        html += "<div class=''>";
            html += "<div id = 'pestx'>"
                html += "<ul >";
                    
                    html += "<li  >"
                        html += "<a href='#pestx-1'><span>Histórico</span></a>"
                    html +="</li>";
                    
                html += "</ul>"
            html += "</div>"
            html += "<div id = 'pestx-1'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Cliente'></label>";
                        html += "<input type = 'text' class = 'form-control' id = 'TextBusqueHistorico' name = 'TextBusqueHistorico'>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarHistoricoDocumentosProveedor()'/>";
                    html += "</div>";
                html += "</div>";
                html += "<br>"
                html += "<div style = 'width:100%;overflow-x:scroll;height:420px;' class = 'ContTHist'>"
                    html += "<table class = 'tableNew' id = 'ListFacturasProveedor'>"
                        html += "<thead>"
                            html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Proveedor</th>"
                            html += "<th>OC</th>"
                            html += "<th>Tipo Documento</th>"
                            html += "<th>No. Documento</th>"
                            html += "<th>Número Radicado</th>"
                            html += "<th>Documento</th>"
                            html += "<th>Estado</th>"
                            html += "<th>Registrado Por</th>"
                            html += "<th>Fecha Registro</th>"
                            html += "<th>Hora Registro</th>"
                            html += "<th>Cancelada Por</th>"
                            html += "<th>Fecha Cancelación</th>"
                            html += "<th>Hora Cancelación</th>"
                            html += "<th>Motivo Cancelación</th>"
                            html += "<th>¿Cancelar?</th>"
                            html += "<th>¿Enviar a Pago?</th>"
                            html += "<th>Fecha Programa de Pago</th>"
                        html += "</tr>"
                        html += "</thead>"
                    html += "</table>"
                html += "</div>";
            html += "</div>";
            
        html += "</div>";


    $(".ContentSubMenuAdmin").html(html);
    $("#pestx").tabs()
    var l = $(".ContentSubMenuAdmin").width();
    $(".ContTHist").css({
        'width': l*(90/100)
    })
    $(".SubMenu").css({'padding':'0px'})
    OTCliente.listaEmpresas()
    TablaListadoFacturasProveedores();
}

function Admin_FormFacturaProveedorReg(HashEmpresa){
    var html = "";
    TituloVentana = "Registrar Factura Proveedor"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""
    $(".SubMenu").html("")
    html = ""
        html += "<div class=''>";
            html += "<div id = 'pestxy'>"
                html += "<ul >";
                    
                    html += "<li  >"
                        html += "<a href='#pestxy-1'><span>Registrar Factura Proveedor</span></a>"
                    html +="</li>";
                    
                html += "</ul>"
            html += "</div>"
            
            html += "<div id = 'pestxy-1' >";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'>Empresa:</label>";
                        html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'>Número de OC:</label>";
                        html += "<input type = 'number' id = 'NumOC' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionOC()'/>";
                    html += "</div>";
                html += "</div>";
                
                html += "<br>"
                
                html += "<div class = 'ContenidoOC' style = 'width:100%;'></div>"
                html += "<div class = 'OptionButtonFact' style = 'width:100%;'></div>"
                
            html += "</div>";
        html += "</div>";


    $(".ContentSubMenuAdmin").html(html);
    $("#pestxy").tabs()
    $(".SubMenu").css({'padding':'0px'})
    OTCliente.listaEmpresas()
    TablaListadoFacturasProveedores();
}

function Admin_FormFacturaCliente(HashE){
    var html = ""
    TituloVentana = "Histórico Factura De Cliente"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""    
        html += "<div class=''>";
            html += "<div class = ''>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Cliente'></label>";
                        html += "<input type = 'text' class = 'form-control' id = 'TextBusqueHistorico' name = 'TextBusqueHistorico'>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarHistoricoDocumentosProveedor()'/>";
                    html += "</div>";
                html += "</div>";
                html += "<br>"
                html += "<table class = 'tableNew' id = 'ListFacturasProveedor'>"
                    html += "<thead>"
                        html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Cliente</th>"
                        html += "<th>Unidad de Negocio</th>"
                        html += "<th>Proyecto</th>"
                        html += "<th>No. Ppto</th>"
                        html += "<th>Valor</th>"
                        html += "<th>Documento</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Registrado Por</th>"
                        html += "<th>Fecha Registro</th>"
                        html += "<th>Hora Registro</th>"
                        html += "<th>Cancelada Por</th>"
                        html += "<th>Fecha Cancelación</th>"
                        html += "<th>Hora Cancelación</th>"
                        html += "<th>Motivo Cancelación</th>"
                        html += "<th>¿Cancelar?</th>"
                    html += "</tr>"
                    html += "</thead>"
                html += "</table>"
            html += "</div>";
            
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaEmpresas()
    //TablaListadoFacturasProveedores();
    MostrarTabsMenu(2)
}

function Admin_FormFacturaClienteReg(HashE){
    var html = ""
    TituloVentana = "Registrar Factura De Cliente"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""    
        html += "<div class=''>";
            html += "<div class = ''>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>";
                        html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa' onchange = 'OTCliente.listarImpuestos()'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Número de Presupuesto:</label>";
                        html += "<input type = 'number' id = 'NumpPpto' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Fecha Factura:</label>";
                        html += "<input type = 'date' id = 'FechaFact' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Número Factura:</label>";
                        html += "<input type = 'text' id = 'NumFact' class = 'form-control' />";
                    html += "</div>";
                html += "</div>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Valor Factura:</label>";
                        html += "<input  autocomplete = 'off' type = 'text' name = 'CostoUnitario' id = 'CostoUnitario' onkeyup = 'FormatCampoNum(\"CostoUnitario\",\"CostoUnitario_real\");CalcularImpuestosFactura()' value = '' class = 'CostoUnitario form-control' />"
                        html += "<span style = 'display:none;' class = 'CostoUnitario_real' id = 'CostoUnitario_real'></span>"
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Unidad'>Impuesto:</label>";
                        html += "<div class = 'ContentImpuestos' style = 'width:100%;'></div>";
                    html += "</div>";
                html += "</div>";
                 html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'>Valor Impuesto:</label>";
                        html += "<input  autocomplete = 'off' readonly disabled type = 'text' name = 'ValorImpuestos' id = 'ValorImpuestos' onkeyup = 'FormatCampoNum(\"ValorImpuestos\",\"ValorImpuestos_real\")' value = '' class = 'ValorImpuestos form-control' />"
                        html += "<span style = 'display:none;' class = 'ValorImpuestos_real' id = 'ValorImpuestos_real'>0</span>"
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Valor Total Factura:</label>";
                        html += "<input  autocomplete = 'off' readonly disabled type = 'text' name = 'ValorTotal' id = 'ValorTotal' onkeyup = 'FormatCampoNum(\"ValorTotal\",\"ValorTotal_real\")' value = '' class = 'ValorTotal form-control' />"
                        html += "<span style = 'display:none;' class = 'ValorTotal_real' id = 'ValorTotal_real'>0</span>"
                    html += "</div>";
                html += "</div>";
                html += "<hr>"
                html += "<div class = 'CenterText' id='FooterInfoOTProyecto'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarFacturaCliente()'>Guardar</button>";
                html += "</div>";
            html += "</div>";
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaEmpresas()
    OTCliente.listarImpuestos()
}

function AdminFactPendientesCobro(HashE){
    var html = ""
    TituloVentana = "Facturas Pendientes de Cobro"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""    
        html += "<div class=''>";
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
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'GenerarFactClientesPendientes()'/>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'ContenedorReportCC' style = 'width:100%;'></div>"
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaInit()
    OTCliente.listaEmpresas()
    //TablaListadoFacturasProveedores();
    
}

function Admin_FormPagosFacturaCliente(){
    var html = ""
        html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<p></p><img src = '"+UrlUniversal+"images/trafico_reportes_ListOt.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Registrar Pagos de Facturas Cliente</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                        html += "<p></p><img src = '"+UrlUniversal+"images/cerrar.png' class = 'IconClose' />";
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
                        html += "<span>Registrar Pagos</span>"
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
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>";
                        html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa' onchange = 'OTCliente.listarImpuestos()'>";
                            html += "<option value='' selected>Todos</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Número de Presupuesto:</label>";
                        html += "<input type = 'number' autocomplete = 'off' id = 'NumpPpto' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Número Factura:</label>";
                        html += "<input type = 'text' autocomplete = 'off' id = 'NumFact' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionFacturaPpto()'/>";
                    html += "</div>";
                html += "</div>";
                
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2 HidenInformation HabPagos'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Valor Factura:</label>";
                        html += "<input  autocomplete = 'off' type = 'text' name = 'CostoUnitario' readonly disabled id = 'CostoUnitario' value = '' class = 'CostoUnitario form-control' />"
                        html += "<span style = 'display:none;' class = 'CostoUnitario_real' id = 'CostoUnitario_real'></span>"
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 HidenInformation HabPagos'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Valor Impuestos:</label>";
                        html += "<input  autocomplete = 'off' type = 'text' name = 'ImpuestoCostoUnitario' readonly disabled id = 'ImpuestoCostoUnitario' value = '' class = 'ImpuestoCostoUnitario form-control' />"
                        html += "<span style = 'display:none;' class = 'ImpuestoCostoUnitario_real' id = 'ImpuestoCostoUnitario_real'></span>"
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 HidenInformation HabPagos'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Fecha Pago:</label>";
                        html += "<input type = 'date' id = 'FechaFact' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 HidenInformation HabPagos'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>  Tipo Pago:</label>";
                        html += "<select class = 'form-control TipoPagos'></select>";
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'form-row HidenInformation HabPagos'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Valor Pago:</label>";
                        html += "<input  autocomplete = 'off' type = 'text' name = 'ValorPagado' id = 'ValorPagado' onkeyup = 'FormatCampoNum(\"ValorPagado\",\"ValorPagado_real\");CalcularImpuestosFactura()' value = '' class = 'ValorPagado form-control' />"
                        html += "<span style = 'display:none;' class = 'ValorPagado_real' id = 'ValorPagado_real'></span>"
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'form-row HidenInformation HabPagos'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Unidad'>Descuentos:</label>";
                        html += "<div class = 'ContentDescuentos' style = 'width:100%;'></div>";
                    html += "</div>";
                html += "</div>";
                html += "<hr>"
                html += "<div class = 'CenterText HidenInformation HabPagos' id='FooterInfoOTProyecto'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'GuardarPagoFacturaCliente()'>Guardar</button>";
                html += "</div>";
            html += "</div>";
            
            html += "<div id = 'pest-2' >";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Cliente'></label>";
                        html += "<input type = 'text' class = 'form-control' id = 'TextBusqueHistorico' name = 'TextBusqueHistorico'>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2 CenterText'>";
                        html += "<p></p>";
                        html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarHistoricoDocumentosProveedor()'/>";
                    html += "</div>";
                html += "</div>";
                html += "<br>"
                html += "<div width = '100%' style = 'ovwerflow-x:scroll'>"
                html += "<table class = 'tableNew' id = 'ListFacturasProveedor'>"
                    html += "<thead>"
                        html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Proveedor</th>"
                        html += "<th>OC</th>"
                        html += "<th>Tipo Documento</th>"
                        html += "<th>No. Documento</th>"
                        html += "<th>Número Radicado</th>"
                        html += "<th>Documento</th>"
                        html += "<th>Estado</th>"
                        html += "<th>Registrado Por</th>"
                        html += "<th>Fecha Registro</th>"
                        html += "<th>Hora Registro</th>"
                        html += "<th>Cancelada Por</th>"
                        html += "<th>Fecha Cancelación</th>"
                        html += "<th>Hora Cancelación</th>"
                        html += "<th>Motivo Cancelación</th>"
                        html += "<th>¿Cancelar?</th>"
                    html += "</tr>"
                    html += "</thead>"
                html += "</table>"
                html += "</div>"
            html += "</div>";
            
        html += "</div>";

    $(".content_modal").html(html);
    OTCliente.listaEmpresas()
    //TablaListadoFacturasProveedores();
    MostrarTabsMenu(1)
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm").addClass('modal-dialog-scrollable');
    ResizeModal(1)
}


function TablaListadoFacturasProveedores(Hash) {
    $DataTable_OTProyectos = $('#ListFacturasProveedor').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'f61b2a6411fb313183803940ca71fa90',
            'data':function (d) {
                d.search['TextBusqueHistorico'] = $("#TextBusqueHistorico").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value,
                    'Hash':Hash
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
                data: 'NombreComercial',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Id',
                "render": function (data, type, full, meta) {
                        return '<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+full.Hash+' target = "_blank">'+full.Id+'</a></center>';
                    }

            },
            {
                data: 'TipoDocumento',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'NumDoc',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

            },
            {
                data: 'Idf',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }
           },
            {
                data: 'Id',
                "render": function (data, type, full, meta) {
                    var ht = '';
                    if( full.Adjuntos != '' ){
                        ht = '<center><a href="../../storage/app/Presupuestos/FacturaProveedor/'+full.Carp+'/'+encodeURIComponent(full.Adjuntos)+'" target = "_blank"><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                    }
                    return ht;
                }

            },
            {
            data: 'Estado',
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
                data: 'FechaCrea',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCrea',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'UsuarioCan',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'FechaCan',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'HoraCan',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'MotivoCancelacion',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'HoraCan',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.Estado == 'Registrada' && full.FechaProgPago == '' ){
                        ht = "<center><img src = '../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'FormCancelarDocProveedor("+full.HashF+","+full.Id+")' /></center>"
                    }
                    return ht;
                }

            },
            {
                data: 'FechaProgPago',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.FechaProgPago == '' ){
                        ht = "<center><img src = '../images/trafico_enviar.png' class = 'OptionIcon' onclick = 'FormEnviarFacturaProgPago("+full.HashF+","+full.Id+")' /></center>"
                    }
                    return ht;
                }

            },
            {
                data: 'FechaProgPago',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    
                    return data;
                }

            },
        ],
        "order": [[8, "DESC"]],
        "language": {
            "url":UrlGeneral+ "js/dataTable/Spanish.lang"
        },
    });
    $('#ListFacturasProveedor').css({'width':'100%'})
}

function BuscarHistoricoDocumentosProveedor(){
    $DataTable_OTProyectos.destroy()
    TablaListadoFacturasProveedores();
}


function TablaListadoPromPagos() {
    $DataTable_OTProyectos = $('#ListFacturasProveedor').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'a1680e8ac51ee8c651f48c486198ce9f',
            'data':function (d) {
                d.search['TextBusqueHistorico'] = $("#FechaPago").val();
                d.search['HashE'] = $(".NEmpx").text();
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
                data: 'FechaPago',
                "render": function (data, type, full, meta) {
                    return '<span style = "text-decoration:underline;" onclick = "FormDetalleProgPago('+full.Hash+')" class = "Cursor FePago'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Banco',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
           },
            {
                data: 'Valor',
                "render": function (data, type, full, meta) {
                    
                    return HtmlValores_Simple(Math.round(parseFloat(data)));
                }

            },
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.Estado == 'En Construcción' ){
                        ht = "<center><img src = '../images/ENVIAR_ICONO.png' class = 'OptionIcon' onclick = 'FormEnviarAprobacionPago("+full.Hash+")' /></center>"
                    }
                    return ht;
                    
                }

            },
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                var ht = '<table >'
                    ht += '<tr>'
                        ht += '<th>No.</th>'
                        ht += '<th>Nivel</th>'
                        ht += '<th>Nombre</th>'
                        ht += '<th>Estado</th>'
                    ht += '</tr>'
                    var io = 1;
                    
                    for(var tt = 0; tt < full.Pendientes.length; tt++){
                        ht += '<tr>'
                            ht += '<td class = "CenterText">'+io+'</td>'
                            ht += '<td class = "CenterText">'+full.Pendientes[tt]['Nivel']+'</td>'
                            ht += '<td >'+full.Pendientes[tt]['NombreUsuario']+'</td>'
                            ht += '<td >'+full.Pendientes[tt]['Estado']+'</td>'
                        ht += '</tr>'
                        io++;
                    }
                    for(var tt = 0; tt < full.Faltantes.length; tt++){
                        ht += '<tr>'
                            ht += '<td class = "CenterText">'+io+'</td>'
                            ht += '<td class = "CenterText">'+full.Faltantes[tt]['Nivel']+'</td>'
                            ht += '<td >'+full.Faltantes[tt]['NombreUsuario']+'</td>'
                            ht += '<td >Pendiente</td>'
                        ht += '</tr>'
                        io++;
                    }
                    ht += '</table>'
                    return ht;
                }

            },
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            
        ],
        "order": [[1, "DESC"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#ListFacturasProveedor').css({'width':'100%'})
}

function TablaListadoPromPagosAprob() {
    $DataTable_OTProyectos = $('#ListFacturasProveedor').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url':UrlGeneral+'a1680e8ac51ee8c651f48c486198ce9f2',
            'data':function (d) {
                d.search['TextBusqueHistorico'] = $("#FechaPago").val();
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
                data: 'FechaPago',
                "render": function (data, type, full, meta) {
                    return '<span class = "FePago'+full.Hash+'">' + data + '</span>';
                }

            },
            {
                data: 'Empresa',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Banco',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Estado',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

            },
            {
                data: 'NombreUsuario',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
           },
            {
                data: 'Valor',
                "render": function (data, type, full, meta) {
                    
                    return HtmlValores_Simple(Math.round(parseFloat(data)));
                }

            },
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                    ht = "<center><img src = '../images/VER1_ICONO.png' class = 'OptionIcon' onclick = 'FormDetalleProgPago("+full.Hash+")' /></center>"
                    return ht;
                    
                }

            },
            {
            data: 'Observaciones',
            "render": function (data, type, full, meta) {
                
                    return data;
                }

            },
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.EstadoAprob == null ){
                        ht = "<center><img src = '../images/aprobar.png' class = 'OptionIcon' onclick = 'FormAprobacionPago("+full.Hash+",1)' /></center>"
                    }
                    return ht;
                    
                }

            },
            
            {
            data: 'Estado',
            "render": function (data, type, full, meta) {
                    var ht = "";
                    if( full.EstadoAprob == null ){
                        ht = "<center><img src = '../images/rechazar.png' class = 'OptionIcon' onclick = 'FormAprobacionPago("+full.Hash+",0)' /></center>"
                    }
                    return ht;
                }

            },
            
        ],
        "order": [[1, "DESC"]],
        "language": {
            "url": "js/dataTable/Spanish.lang"
        },
    });
    $('#ListFacturasProveedor').css({'width':'100%'})
}

function FormEnviarAprobacionPago(Hash){
    
    var html = ""
    

    TituloVentana = "Solicitar Aprobación Pago "+$(".FePago"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Observaciones:</label>";
                html += "<textarea class = 'form-control' name = 'ObservacionesPago' id = 'ObservacionesPago'></textarea>"
            html += "</div>";
        html += "</div>";

    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<div class='col col-sm-12 my-2 CenterText'>";
            html += "<button type='button' class='btn btn-primary' onclick = 'SendAprobacionProgPago("+Hash+")'>Guardar</button>";
        html += "</div>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm2").addClass('modal-dialog-scrollable');
    ModalEdit2(1)
    ResizeModal(0.4)
}

function FormAprobacionPago(Hash,Estado){
    var Tx = "";
    if(Estado == 1){
        Tx = "Aprobar"
    }else{
        Tx = "Rechazar"
    }
    var html = ""
    TituloVentana = ""+Tx+" Programación de Pago de "+$(".FePago"+Hash).text()
    ImgVentana = "images/AGREGAR_ICONO.png"
    FuncionesHeader = ""
    FuncionesRegresar = "ModalEdit2(0)"
    html += "<div class='modal-header'>";
        html += GeneradorHeadersVentanas()
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<div class = 'form-row'>";
            html += "<div class='col col-sm-12 my-2'>";
                html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Observaciones:</label>";
                html += "<textarea class = 'form-control' name = 'ObservacionesPago' id = 'ObservacionesPago'></textarea>"
            html += "</div>";
        html += "</div>";

    html += "</div>";
    html += "<div class='modal-footer'>";
        html += "<div class='col col-sm-12 my-2 CenterText'>";
            html += "<button type='button' class='btn btn-primary'data-dismiss='modal' aria-label='Close'  onclick = 'SendRPagoProg("+Hash+","+Estado+")'>Guardar</button>";
        html += "</div>";
    html += "</div>";

    $(".content_modal2").html(html);
    $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
    $("#ModalContentForm2").addClass('modal-dialog-scrollable');
    ModalEdit2(1)
    ResizeModal(0.4)
}


function SendAprobacionProgPago(Hash){
    if( confirm("¿Está Seguro(a) de Enviar a Aprobación este Pago?") ){
        var formData = new FormData();
        formData.append("Hash", Hash );
        formData.append("ObservacionesPago", $("#ObservacionesPago").val() );
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral + '76009189e19cfcd492469a2bef795175',
            success:function(data){
                ModalEdit2(0)
                alert("Se ha Enviado a Aprobación la Programación del Pago.")
                if( data.Info == 1 ){
                    alert("Se ha Enviado a Aprobación la Programación del Pago.")
                }else{
                    alert("No se ha logrado guardar los datos, inténtelo de nuevo");
                }
                Admin_FormAdminPagos()
            }
        })
    }
}

function SendRPagoProg(Hash,Estado){
    if( confirm("¿Está Seguro(a) de Ejecutar esta Acción?") ){
        var formData = new FormData();
        formData.append("Hash", Hash );
        formData.append("Estado", Estado );
        formData.append("ObservacionesPago", $("#ObservacionesPago").val() );
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral + '76009189e19cfcd492469a2bef7951752',
            success:function(data){
                ModalEdit2(0)
                if( data.Info == 1 ){
                    alert("Se ha Enviado a Aprobación la Programación del Pago.")
                }else{
                    alert("No se ha logrado guardar los datos, inténtelo de nuevo");
                }
                Admin_FormAdminPagosAprob()
            }
        })
    }
}

function BuscarProgPago(){
    $DataTable_OTProyectos.destroy()
    TablaListadoPromPagos();
}
function BuscarProgPagoAprob(){
    $DataTable_OTProyectos.destroy()
    TablaListadoPromPagosAprob();
}

function FormEnviarFacturaProgPago(HashF,Id){
    if(confirm("¿Está Seguro(a) de Enviar esta Factura a Programación de Pago?")){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'6856c4172a3242a89f38672dda25b95c',
            data:{
                _token:document.getElementsByName('_token')[0].value,  
                Hash: $("#parEmpresa").val()
            },
            success:function(data){
                var html = ""

                TituloVentana = "Programar Pago OC # "+Id
                ImgVentana = "images/AGREGAR_ICONO.png"
                FuncionesHeader = ""
                FuncionesRegresar = "ModalEdit2(0)"
                html += "<div class='modal-header'>";
                    html += GeneradorHeadersVentanas()
                html += "</div>";

                html += "<div class='modal-body'>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Banco:</label>";
                            html += "<select class ='form-control' required name = 'parBanco' id = 'parBanco'>";
                                html += "<option value='' selected>Seleccione</option>";
                                for( var i = 0; i < data.Bancos.length; i++){
                                    html += "<option value='"+data.Bancos[i]['Hash']+"' >"+data.Bancos[i]['NombreComercial']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Fecha de Pago:</label>";
                            html += "<input class = 'form-control' type = 'date' name = 'FechaProPago' id = 'FechaProPago' />";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>    Número de OC:</label>";
                            html += "<input type = 'text' name = 'NumOcPago' required id = 'NumOcPago' value = '"+Id+"'disabled class = 'form-control' />";
                        html += "</div>";
                        html += "<div class='col col-sm-3 my-2'>";
                            html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Valor Final a Pagar:</label>"
                            html += "<input autocomplete = 'off' type = 'text' name = 'pptadomensual' id = 'pptadomensual' onkeyup = 'FormatCampoNum(\"pptadomensual\",\"pptadomensual_real\")' class = 'pptadomensual form-control' required />"
                            html += "<span style = 'display:none;' class = 'pptadomensual_real' id = 'pptadomensual_real'>0</span>"
                        html += "</div>"
                    html += "</div>";
                    html += "<div class = 'form-row'>";
                        html += "<div class='col col-sm-12 my-2'>";
                            html += "<label for='OTC_Empresa'>Observaciones:</label>";
                            html += "<textarea class = 'form-control' name = 'ObservacionesPago' id = 'ObservacionesPago'></textarea>"
                        html += "</div>";
                    html += "</div>";
                    
                html += "</div>";
                html += "<div class='modal-footer'>";
                    html += "<div class='col col-sm-12 my-2 CenterText'>";
                        html += "<button type='button' class='btn btn-primary' onclick = 'SendProgPago("+HashF+","+Id+")'>Guardar</button>";
                    html += "</div>";
                html += "</div>";

            $(".content_modal2").html(html);
            //OTCliente.listaEmpresas()
            //MostrarTabsMenu(1)
            $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
            $("#ModalContentForm2").addClass('modal-dialog-scrollable');            
            ModalEdit2(1)
            
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
            $("#FechaProPago").attr("min", today);
            ResizeModal(1)
            }
        })
    }
}

function FormDetalleProgPago(Hash){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'6e17a3619bc7654ecd579b15d1eb64b5',
        data:{
            _token:document.getElementsByName('_token')[0].value,  
            Hash: Hash
        },
        success:function(data){
            var html = ""
            TituloVentana = "Detalle Pagos  "+$(".FePago"+Hash).text()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Banco:</label>";
                        html += "<select class ='form-control' required name = 'parBanco' id = 'parBanco' disabled>";
                            html += "<option value='0' >"+data.DetalleProg[0]['Banco']+"</option>";
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-6 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Fecha de Pago:</label>";
                        html += "<input class = 'form-control' type = 'text' value = '"+data.DetalleProg[0]['FechaPago']+"' disabled name = 'FechaProPago' id = 'FechaProPago' />";
                    html += "</div>";
                    
                html += "</div>";
                html += "<div class = 'form-row'>";
                    html += "<table class = 'tableNew'>"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Detalle</th>"
                            html += "<th>Proveedor</th>"
                            html += "<th>Cliente</th>"
                            html += "<th>Presupuesto</th>"
                            html += "<th>OC</th>"
                            html += "<th>Valor</th>"
                        html += "</tr>"
                        var Total = 0;
                        var Contador = 0;
                        for(var i = 0; i < data.PagosManuales.length; i++){
                            Contador += 1;
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td>"+data.PagosManuales[i]['Nombre']+"</td>"
                                html += "<td>"+data.PagosManuales[i]['Proveedor']+"</td>"
                                html += "<td>"+data.PagosManuales[i]['Cliente']+"</td>"
                                html += "<td>"+data.PagosManuales[i]['Presupuesto']+"</td>"
                                html += "<td></td>"
                                html += "<td>"+ HtmlValores_Doble(Math.round(parseFloat(data.PagosManuales[i]['Valor'])))+"</td>"
                            html += "</tr>"
                            Total += Math.round(parseFloat(data.PagosManuales[i]['Valor']));
                        }
                        for(var i = 0; i < data.Ocs.length; i++,Contador++){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(Contador)+"</td>"
                                html += "<td>Pago</td>"
                                html += "<td>"+data.Ocs[i]['Proveedor']+"</td>"
                                html += "<td>"+data.Ocs[i]['Cliente']+"</td>"
                                html += "<td class = 'CenterText'>"+data.Ocs[i]['Ppto']+"</td>"
                                html += "<td class = 'CenterText'>"+data.Ocs[i]['OC']+"</td>"
                                html += "<td>"+ HtmlValores_Doble(Math.round(parseFloat(data.Ocs[i]['Valor'])))+"</td>"
                            html += "</tr>"
                            Total += Math.round(parseFloat(data.Ocs[i]['Valor']));
                        }
                        html += "<tr>"
                            html += "<th colspan = '6'>TOTAL</th>"
                            html += "<th >"+HtmlValores_DobleTH(Total)+"</th>"
                        html += "</tr>"
                    html += "</table>"
                html += "</div>";

            html += "</div>";

        $(".content_modal2").html(html);
        //OTCliente.listaEmpresas()
        //MostrarTabsMenu(1)
        $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm2").addClass('modal-dialog-scrollable');            
        ModalEdit2(1)

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
        $("#FechaProPago").attr("min", today);
        ResizeModal(1)
        }
    })
}

function SendProgPago(Hashf,Id){
    if( $("#parBanco").val() != '' && $("#FechaProPago").val() != '' && $("#NumOcPago").val() != '' && $(".pptadomensual_real").text() != 0 ){
        var formData = new FormData();
        
        
        formData.append("NumOC", Id );
        formData.append("Hashf", Hashf );
        formData.append("FechaProPago", $("#FechaProPago").val());
        formData.append("parBanco", $("#parBanco").val());
        formData.append("ObservacionesPago", $("#ObservacionesPago").val());
        formData.append("ValorPago", $(".pptadomensual_real").text());
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'ea4ff1197d80916350450c6f456f7340',
            success:function(data){
                ModalEdit2(0)
                if( data.Info == 1 ){
                    alert("Se ha Creado la Programación de Pago de manera Correcta.")
                }else if( data.Info == 2 ){
                    alert("Se ha agregado la Orden de Compra a la programación de Pago de manera Correcta.");
                }else if( data.Info == 3 ){
                    alert("Esta Factura ya se encuentra Programada.");
                }else{
                    alert("No se ha logrado guardar los datos, inténtelo de nuevo");
                }
                BuscarHistoricoDocumentosProveedor()
            }
        })
    }else{
        alert("Debe diligenciar los datos Obligatorios");
    }
}

function BuscarInformacionOC(){
    if( $("#parEmpresa").val() != '' && $("#NumOC").val().length ){
        $.ajax({
            type:'POST',
            url:UrlGeneral+'60e438530e1bd40994845db435ac2769',
            data:{Hash:$("#parEmpresa").val(), Hash2:$("#NumOC").val(), 
                _token:document.getElementsByName('_token')[0].value
            },
            success:function(data){
                var html = "";
                html += "<table width ='100%'>";
                    html += "<tr>";
                        html += "<td class = 'CenterText' style = 'width:15%'>";
                            html += data.InfoOC[0]['Empresa']+"<p></p>"+data.InfoOC[0]['NitEmpresa'];
                        html += "</td>";
                        html += "<td class = 'CenterText'>";
                            html += "<span style = 'font-weight: bold; font-size:20px;'>ORDEN DE COMPRA # "+data.InfoOC[0]['Id']+"</span><p></p>";
                            html += "Presupuesto No. "+data.InfoOC[0]['IdPpto']+"<p></p>Version Interna: "+data.InfoOC[0]['VersionInterna']+" - Version Cliente: "+data.InfoOC[0]['VersionCliente']
                        html += "</td>";
                    html += "</tr>";
                html += "</table>";
                html += "<BR>"
                html += "<table class = 'Cabecera'>"
                    html += "<tr>"
                        html += "<td class = 'Concepto'>PROVEEDOR</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['Proveedor']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>NIT</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['NitProveedor']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>OT/PROYECTO</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['CodigoOT']+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'Concepto'>EJECUTIVO</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['Ejecutivo']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>REFERENCIA</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['Referencia']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>ELABORADO POR</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['ElaboradoPor']+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'Concepto'>ESTADO</td>"
                        if( data.InfoOC[0]['Estado'] == 0 ){
                            html += "<td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>CANCELADA</td>"
                        }
                        if( data.InfoOC[0]['Estado'] == 1 ){
                            
                            html += "<td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>GENEREADA Y ENVIADA</td>"
                        }
                        if( data.InfoOC[0]['Estado'] == 2 ){
                            
                            html += "<td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>FACTURADA</td>"
                        }
                        if( data.InfoOC[0]['Estado'] == 3 ){
                            
                            html += "<td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>PAGADA</td>"
                        }
                    html += "</tr>";
                html += "</table>";
                html += "<br>"
                html += "<table class = 'Cabecera'>"
                    html += "<tr>"
                        html += "<td class = 'Concepto'>FORMA DE PAGO</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['FormaPago']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>FECHA DE ENTREGA</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['FechaEntrega']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>LUGAR</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['Lugar']+"</td>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<td class = 'Concepto'>VIGENCIA INICIAL</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['VigenciaInicial']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>VIGENCIA FINAL</td>"
                        html += "<td class = 'DetalleConcepto'>"+data.InfoOC[0]['VigenciaFinal']+"</td>"
                        html += "<td class = 'Separador'></td>"
                        html += "<td class = 'Concepto'>FECHA RADICACIÓN</td>"
                        html += "<td class = 'DetalleConcepto' style = 'color:red;font-weight: bold;'>"+data.InfoOC[0]['FechaRadicacion']+"</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<br>"
                html += "<table class ='DetallePpto'>";
                    html += "<tr>";
                        html += "<th class = 'ThSub'>ITEM</th>";
                        html += "<th class = 'ThSub'>DÍAS</th>";
                        html += "<th class = 'ThSub'>CANTIDAD</td>";
                        html += "<th class = 'ThSub' style = 'width:30%;'>DESCRIPCIÓN</th>";
                        html += "<th class = 'ThSub' style = 'width:15%;'>VALOR UNITARIO</th>";
                        html += "<th class = 'ThSub' style = 'width:15%;'>SUBTOTAL</th>";
                        html += "<th class = 'ThSub' style = 'width:15%;'>VOLUMEN</th>";
                        html += "<th class = 'ThSub' style = 'width:15%;'>TOTAL</th>";
                    html += "</tr>";
                    
                    OC_Volumen = 0;
                    OC_ValorDoc = 0;
                    OC_Impuestos = 0;
                    OC_Total = 0;
                    
                    for( var i = 0; i < data.InfoOC[0]['ItemsOP'].length; i++ ){
                        
                        html += "<tr>";
                            html += "<td class = 'TdItems' style = 'width:15%;'>"+data.InfoOC[0]['ItemsOP'][i]['Item']+"</td>";
                            html += "<td class = 'TdItems CenterText' style = 'width:5%;'>"+data.InfoOC[0]['ItemsOP'][i]['Dias']+"</td>";
                            html += "<td class = 'TdItems CenterText' style = 'width:5%;'>"+data.InfoOC[0]['ItemsOP'][i]['Cantidad']+"</td>";
                            html += "<td class = 'TdItems' style = 'width:30%;text-align:justify;'>";
                                html += data.InfoOC[0]['ItemsOP'][i]['Descripcion']
                            html += "</td>";
                            html += "<td class = 'TdItems' style = 'width:15%;'>";
                                html += HtmlValores_Doble(data.InfoOC[0]['ItemsOP'][i]['ValorUnitario'])
                            html += "</td>";
                            html += "<td class = 'TdItems' style = 'width:15%;' nowrap>"
                                html += HtmlValores_Doble(data.InfoOC[0]['ItemsOP'][i]['Subtotal'])
                            html += "</td>"
                            html += "<td class = 'TdItems' style = 'width:15%;'>"
                                html += HtmlValores_Doble(data.InfoOC[0]['ItemsOP'][i]['TotalVolumen'])
                            html += "</td>";
                            html += "<td class = 'TdItems' style = 'width:15%;'>";
                                html += HtmlValores_Doble(data.InfoOC[0]['ItemsOP'][i]['TotalItem'])
                            html += "</td>";
                        html += "</tr>";
                    }
                    
                    OC_Volumen += data.InfoOC[0]['Vol'];
                    
                    html += "<tr>";
                        html += "<td colspan = '5'></td>";
                        html += "<th style = 'width:15%;border:1px solid white;'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['Subtotal'])
                        html += "</th>";
                        html += "<th  style = 'width:15%;border:1px solid white;'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['Vol'])
                        html += "</th>";
                        html += "<th  style = 'width:15%;border:1px solid white;'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['Total'])
                        html += "</th>";
                    html += "</tr>";
                    html += "<tr><td><br></td></tr>";
                    if( data.InfoOC[0]['UsuarioCancelacion'] != null ){
                        html += "<tr>";
                            html += "<td colspan = '8' class = 'TdItems' style = 'padding:5px;'>";
                                html += "<span style = 'color:red;font-weight: bold;'>ESTA ORDEN DE PRODUCCIÓN SE CANCELÓ POR:</span>";
                                html += data.InfoOC[0]['MotivoCancelacion'];
                                html += "<p></p>";
                                html += "<span style='font-weight: bold;'>Fecha Cancelacion: </span>"+data.InfoOC[0]['FechaCan']+"<p></p>";
                                html += "<span style='font-weight: bold;'>Cancelada Por: </span>"+data.InfoOC[0]['Cancelador']+"<p></p>";
                            html += "</td>";
                        html += "</tr>";
                    }
                    html += "<tr>";
                        html += "<td colspan = '6'></td>";
                        html += "<td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>SUBTOTAL</td>";
                        html += "<td class = 'TdItems' style = 'width:15%;'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['Subtotal'])
                        html += "</td>";
                    html += "</tr>";
                    for(  var i=0; i < data.InfoOC[0]['ImpuestosItems'].length; i++){
                        html += "<tr>";
                            html += "<td colspan = '6'></td>";
                            html += "<td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>"+data.InfoOC[0]['ImpuestosItems'][i]['Impuesto']+"</td>";
                            html += "<td class = 'TdItems' style = 'width:15%;'>";
                                html += HtmlValores_Doble(data.InfoOC[0]['ImpuestosItems'][i]['Total'])
                            html += "</td>";
                        html += "</tr>";
                        OC_Impuestos += data.InfoOC[0]['ImpuestosItems'][i]['Total'];
                    }
                    html += "<tr>";
                        html += "<td colspan = '6'></td>";
                        html += "<td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>TOTAL IMPUESTOS</td>";
                        html += "<td class = 'TdItems'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['TotalImpuestos'])
                        html += "</td>";
                    html += "</tr>";
                    html += "<tr>";
                        html += "<td colspan = '6'></td>";
                        html += "<td class = 'ThSub' style = 'text-align:left;padding-left:5px;'>TOTAL</td>";
                        html += "<td class = 'TdItems' style = 'width:15%;'>";
                            html += HtmlValores_Doble(data.InfoOC[0]['TotalImpuestos'] + data.InfoOC[0]['Total'])
                            OC_ValorDoc = data.InfoOC[0]['Total'];
                        html += "</td>";
                    html += "</tr>"
                html += "</table>"
                $(".ContenidoOC").html(html).css({'height':'300px','overflow-y':'scroll','font-size':'12px'})
                //OptionButtonFact
                html = "";
                if( data.InfoOC[0]['UsuarioCancelacion'] == null && data.InfoOC[0]['Estado'] == 1 ){
                    html += "<br><button class = 'btn btn-primary' onclick = 'FormRegistrarFacturaProveedor()'>Registrar Facturar</button>"
                    $(".OptionButtonFact").html(html).css({'text-align':'center','font-size':'12px'});
                }
            }
        })
    }else{
        alert("No se han ingresado los Datos.");
    }
}

function DesImpuestoOC(Hash){
    console.log(Hash)
    if ($('.ValorImpuesto' + Hash).is('[readonly]')) {
        $('.ValorImpuesto' + Hash).prop('readonly', false);
    }
    else {
        $('.ValorImpuesto' + Hash).prop('readonly', true);
    }
}

function FormCancelarDocProveedor(Hash,OC){
    if( confirm("¿Está seguro(a) de Cancelar este Documento de la Orden de Compra # "+OC+"?") ){
        var html = "";
        html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<p></p><img src = 'images/editar.png' class = 'IconVentana' /> <span class = 'TituloBuscador'>Cancelar Documento OC # "+OC+"</span>";
                    html += "</td>"
                    html += "<td>"
                        html += "<button type='button' data-dismiss='modal' class='close' onclick = 'ModalEdit(0);ModalEdit2(1)'>";
                        html += "<p></p><img src = 'images/cerrar.png' class = 'IconClose' />";
                    html += "</button>";
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
        html += "</div>";
            html += "<input type = 'hidden' name = '_token' id = '_token' value = '"+document.getElementsByName('_token')[0].value+"' />"
            
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='ParLogo'><span class = 'Obligatorio'>(*)</span>  Observaciones:</label>"
                        html += "<textarea class = 'form-control' name = 'ObservacionesPpto' rows = '3' id = 'ObservacionesPpto' required ></textarea>"
                    html += "</div>"
                html += "</div>"
            html += "</div>";

        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary'  onclick = 'ModalEdit(1);ModalEdit2(0)'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary' onclick = 'SendFormCancelarDOCProv("+Hash+")'>Cancelar Documento</button>";
        html += "</div>";
        html += "</form>"
        $(".content_modal2").html(html);
        ModalEdit2(1)
        ModalEdit(0);
        ResizeModal2(2,0.45)
        $("#ModalContentForm2").removeClass('modal-xl').addClass('modal-lg'); 
    }
}

function FormRegistrarFacturaProveedor(){
    $.ajax({
        type:'POST',
        url:UrlGeneral+'5980d8d66a94da7e461486b5b827327c',
        data:{
            _token:document.getElementsByName('_token')[0].value,  
            Hash: $("#parEmpresa").val()
        },
        success:function(data){
            var html = ""
            

            TituloVentana = "Registrar Documento OC # "+$("#NumOC").val()
            ImgVentana = "images/AGREGAR_ICONO.png"
            FuncionesHeader = ""
            FuncionesRegresar = "ModalEdit2(0)"
            html += "<div class='modal-header'>";
                html += GeneradorHeadersVentanas()
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Tipo de Documento:</label>";
                        html += "<select class ='form-control' required name = 'parTipoDocumento' id = 'parTipoDocumento'>";
                            html += "<option value='' selected>Seleccione</option>";
                            for( var i = 0; i < data.TiposDocumentos.length; i++){
                                html += "<option value='"+data.TiposDocumentos[i]['Hash']+"' >"+data.TiposDocumentos[i]['Nombre']+"</option>";
                            }
                        html += "</select>";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>    Número de Documento:</label>";
                        html += "<input type = 'text' name = 'NumDocumento' required id = 'NumDocumento' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>    Fecha de Documento:</label>";
                        html += "<input type = 'date' name = 'FechaDocumento' required id = 'FechaDocumento' class = 'form-control' />";
                    html += "</div>";
                    html += "<div class='col col-sm-3 my-2'>";
                        html += "<label for='OTC_Unidad'><span class = 'Obligatorio'>(*)</span>    Fecha Vencimiento:</label>";
                        html += "<input type = 'date' name = 'FechaVencimiento' required id = 'FechaVencimiento' class = 'form-control' />";
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Información de Costo Orden de Compra:</label>";
                        html += "<table class = 'tableNew'>"
                            html += "<tr>"
                                html += "<th>Valor Documento</th>"
                                html += "<th>Impuesto Documento</th>"
                                html += "<th>Volumen</th>"
                                html += "<th>Total</th>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td style = 'width:25%'>"+HtmlValores_Doble(OC_ValorDoc)+"</td>"
                                html += "<td style = 'width:25%'>"+HtmlValores_Doble(OC_Impuestos)+"</td>"
                                html += "<td style = 'width:25%'>"+HtmlValores_Doble(OC_Volumen)+"</td>"
                                html += "<td style = 'width:25%'>"+HtmlValores_Doble(OC_ValorDoc+OC_Impuestos)+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>";
                html += "</div>";
                /*html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-3'>";
                        html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>    Descuentos:</label>";
                        html += "<table class = 'tableNew'>"
                            html += "<tr>"
                                html += "<th>Impuesto</th>"
                                html += "<th>Valor</th>"
                            html += "</tr>"
                            for( var i = 0; i < data.Tarifa.length; i++){
                                html += "<tr>"
                                    html += "<td style = 'width:50%'>"+data.Tarifa[i]['Tarifa']+"</td>"
                                    html += "<td style = 'width:50%'>"
                                        html += "<input class = 'form-control ValorImpuesto"+data.Tarifa[i]['Hash']+"' type = 'text' id = 'ImpuestoOC' onkeyup = 'FormatCampoNum(\"ValorImpuesto"+data.Tarifa[i]['Hash']+"\",\"RValorImpuesto"+data.Tarifa[i]['Hash']+"\")' value = '0'/>";
                                        html += "<span class = 'ImpuestoOC HidenInformation'>"
                                            html += "<span class = 'HashImpuesto"+data.Tarifa[i]['Hash']+"'>"+data.Tarifa[i]['Hash']+"</span>"
                                            html += "<span class = 'RValorImpuesto"+data.Tarifa[i]['Hash']+"'>0</span>"
                                        html += "</span>"
                                    html += "</td>"
                                html += "</tr>"
                            }
                            
                        html += "</table>"
                    html += "</div>";
                html += "</div>";*/
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Empresa'>Foto de Documento:</label>";
                        html += "<div class='custom-file'>"
                            html += "<input type='file' class='custom-file-input' id='ParLogo' name='ParLogo' value='' onchange='uploadImage(this)' accept='image/jpeg, image/jpg, image/png, image/pdf', required />"
                            html += "<label class='custom-file-label' id='LParLogo' for='ParLogo'>Seleccione Foto</label>"
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                html += "<div class = 'form-row'>";
                    html += "<div class='col col-sm-12 my-2'>";
                        html += "<label for='OTC_Empresa'>Observaciones:</label>";
                        html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>"
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            html += "<div class='modal-footer'>";
                html += "<div class='col col-sm-12 my-2 CenterText'>";
                    html += "<button type='button' class='btn btn-primary' onclick = 'SendDocOC()'>Guardar</button>";
                html += "</div>";
            html += "</div>";

        $(".content_modal2").html(html);
        //OTCliente.listaEmpresas()
        $("#ModalContentForm2").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm2").addClass('modal-dialog-scrollable');
        ModalEdit2(1)
        ResizeModal(1)
        }
    })
}

function SendDocOC(){
    if( $("#parTipoDocumento").val() != '' && $("#NumDocumento").val() != ''
        && $("#FechaDocumento").val() != '' && $("#FechaVencimiento").val() != ''
            ){
        var formData = new FormData();
        /*var Descuentos = [];
        $(".ImpuestoOC").each(function(){
            Descuentos.push({
                'Hash':$(this).children("span:nth(0)").text(),
                'Valor':$(this).children("span:nth(1)").text(),
            })
        })*/
        
        var archivos = document.getElementById("ParLogo");
        for (var i = 0; i < archivos.files.length; i++) {
            formData.append("ParLogo", archivos.files[i]);
        }
        
        formData.append("NumOC", $("#NumOC").val());
        formData.append("TipoDocumento", $("#parTipoDocumento").val());
        formData.append("NumDocumento", $("#NumDocumento").val());
        formData.append("FechaVencimiento", $("#FechaVencimiento").val());
        formData.append("FechaDocumento", $("#FechaDocumento").val());
        formData.append("Observaciones", $("#Observaciones").val());
        formData.append("ValorDoc", OC_ValorDoc);
        formData.append("ImpuestosDoc", OC_Impuestos);
        formData.append("VolumenDoc", OC_Volumen);
        //formData.append("Descuentos", JSON.stringify(Descuentos));
        
        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:'fb6e00d39df651fda458b7ac6a38cd27',
            success:function(data){
                ModalEdit2(0)
                BuscarInformacionOC()
                alert("Se ha generado el Número de Radicado # "+data.Info);
            }
        })
        
    }else{
        alert("No se han ingresado los datos Obligatorios");
    }
}

function SendFormCancelarDOCProv(Hash){
    if( $("#ObservacionesPpto").val().length > 0 ){
        $.ajax({
            type:'POST',
            url:'4a396eaeadcd7ba2f3b346c120c29a58',
            data:{
                _token:document.getElementsByName('_token')[0].value,
                Hash:Hash,
                ObservacionesPpto:$("#ObservacionesPpto").val(),
            },
            success:function(data){
                alert("Se ha realizado la cancelación de manera Correcta.");
                ModalEdit2(0)
                ModalEdit(1)
                BuscarHistoricoDocumentosProveedor()
            }
        });
    }else{
        alert("Debe ingresar la justificación de la cancelación.");
    }
}

function Admin_FacturasPendientesProveedor(HashE){
    var html = ""
    TituloVentana = "Facturas Pendientes Por Llegar"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""
    $(".SubMenu").html("")
        html += "<div class=''>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>";
                    html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa' onchange = 'OTCliente.listaUnidadesNegocio();OTCliente.listaProveedores()'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Unidad:</label>";
                    html += "<select class ='form-control' name = 'parUnidadNegocio' id = 'parUnidadNegocio' onchange = 'OTCliente.listaClientes()'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Cliente:</label>";
                    html += "<select class ='form-control' name = 'parCliente' id = 'parCliente'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Proveedor:</label>";
                    html += "<select class ='form-control' name = 'parProveedor' id = 'parProveedor'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                        /*html += "<p></p>";
                           html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionFPL()'/>";*/
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarFacturasPtesProveedor()'/>";
                html += "</div>";
            html += "</div>";
            html += "<br>";
            html += "<div class = 'form-row FormsGeneral IndicadorPTE'>";
                
            html += "</div>"
            html += "<br>"
            html += "<div id = 'ContenedorFpl' >"
            //html += "<div id = 'ContenedorFpl' style = 'width:100%;height:300px;overflow:scroll;'>"
                
            html += "</div>"
        html += "</div>";
    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaEmpresas()
    ResizeModal(1)
}

function Admin_FacturasPendientesPagoProveedor(HashE){
    var html = ""
    TituloVentana = "Cartera Pendiente Proveedores"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""    
        html += "<div class=''>";
            html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'><span class = 'Obligatorio'>(*)</span>  Empresa:</label>";
                    html += "<select class ='form-control' name = 'parEmpresa' id = 'parEmpresa' onchange = 'OTCliente.listaUnidadesNegocio();OTCliente.listaProveedores()'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Unidad:</label>";
                    html += "<select class ='form-control' name = 'parUnidadNegocio' id = 'parUnidadNegocio' onchange = 'OTCliente.listaClientes()'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Cliente:</label>";
                    html += "<select class ='form-control' name = 'parCliente' id = 'parCliente'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                    html += "<label for='OTC_Empresa'>Proveedor:</label>";
                    html += "<select class ='form-control' name = 'parProveedor' id = 'parProveedor'>";
                        html += "<option value='' selected>Seleccione</option>";
                    html += "</select>";
                html += "</div>";
                html += "<div class='col col-sm-2 my-2'>";
                        /*html += "<p></p>";
                           html += "<img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarInformacionFPL()'/>";*/
                        html += "<p></p>";
                        html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'BuscarFacturasPtesPagoProveedor()'/>";
                html += "</div>";
            html += "</div>";
            html += "<br>";
            html += "<div class = 'form-row FormsGeneral IndicadorPTE'>";
                
            html += "</div>"
            html += "<br>"
            html += "<div id = 'ContenedorFpl' >"
            //html += "<div id = 'ContenedorFpl' style = 'width:100%;height:300px;overflow:scroll;'>"
                
            html += "</div>"
        html += "</div>";
    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaEmpresas()
}//e6249046a837237a71785f6bd77446b5

function BuscarFacturasPtesPagoProveedor(){
    var html = "";
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >No. Facturas Pendientes</h5>"
                html += "<div class = 'container TotalFacturas'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Subtotal</h5>"
                html += "<div class = 'container Subtotales'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Impuestos</h5>"
                html += "<div class = 'container Impuestos'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Total</h5>"
                html += "<div class = 'container Total'></div>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    html += "<br>"
    html += "<table class = 'tableNew' id = 'TablaOrdenes'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Código OT</th>"
                        html += "<th>Presupuesto</th>"
                        html += "<th>Referencia Presupuesto</th>"
                        html += "<th>Unidad</th>"
                        html += "<th>Cliente</th>"
                        html += "<th>Ejecutivo</th>"
                        html += "<th>Número de OC</th>"
                        html += "<th>Forma de Pago</th>"
                        html += "<th>Fecha Generación</th>"
                        html += "<th>Hora Generación</th>"
                        html += "<th>Generado Por</th>"
                        html += "<th>Descargar</th>"
                        html += "<th>Estado</th>"
                    html += "</tr>"
                html += "</thead>"
            html += "</table>"
    $("#ContenedorFpl").html(html)
    var TotalFacturasPendientes = 0;
    var TotalSubtotal = 0;
    var TotalImpuestos = 0;
    var TotalGeneral = 0;
    $DataTable_OTProyectos = $('#TablaOrdenes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'scrollY':"auto",
        'scrollX':true,
        'scrollCollapse':true,
        'ajax': {
            'url':UrlGeneral+'e6249046a837237a71785f6bd77446b5',
            'data':function (d) {
                d.search['HashE'] = $("#parEmpresa").val();
                d.search['HashP'] = $("#parProveedor").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            },
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
                data: 'CodigoOT',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'NumPpto',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                }

            },
            {
                data: 'ReferenciaPpto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Unidad',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

            },
            {
                data: 'Cliente',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'NumOc',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
            data: 'FormaPago',
            "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
            data: 'FechaCrea',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
                data: 'HoraCrea',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
                data: 'CreadorOC',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

            {
                data: 'Ejecutivo',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+full.Hash+' target = "_blank"><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                }
            },
            {
                data: 'Estado',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return data;//'<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+full.Hash+' target = "_blank"><img src = "images/descarga.png" class = "OptionIcon" /></a></center>';
                }
            },
        ],
        "order": [[9, "DESC"]],
        rowCallback:function(row,data)
        {
            TotalFacturasPendientes++;
            TotalSubtotal += parseInt(data.Subtotal);
            TotalImpuestos += parseInt(data.TotalImpuestos);
            TotalGeneral += parseInt(data.Total);
            //console.log("Subtotal "+ data['NumOc'] +":"+ data.Subtotal)
          
          
            $(".TotalFacturas").html(formatNumber.new(TotalFacturasPendientes))
            $(".Subtotales").html(HtmlValores_Doble(TotalSubtotal))
            $(".Impuestos").html(HtmlValores_Doble(TotalImpuestos))
            $(".Total").html(HtmlValores_Doble(TotalGeneral))
        },
        "language": {
            "url": UrlGeneral+ "js/dataTable/Spanish.lang"
        }
    })
    $(".CardReport h5").css({'font-size':'15px'})
}

function BuscarFacturasPtesProveedor(){
    var html = "";
    html += "<div class = 'form-row'>";
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >No. Facturas Pendientes</h5>"
                html += "<div class = 'container TotalFacturas'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Subtotal</h5>"
                html += "<div class = 'container Subtotales'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Impuestos</h5>"
                html += "<div class = 'container Impuestos'></div>"
            html += "</div>"
        html += "</div>"
        html += "<div class='col col-sm-3 my-3'>"
            html += "<div class = 'CardReport'>"
                html += "<h5 >Total</h5>"
                html += "<div class = 'container Total'></div>"
            html += "</div>"
        html += "</div>"
    html += "</div>"
    html += "<br>"
    html += "<table class = 'tableNew' id = 'TablaOrdenes'>"
                html += "<thead>"
                    html += "<tr>"
                        html += "<th>No.</th>"
                        html += "<th>Código OT</th>"
                        html += "<th>Presupuesto</th>"
                        html += "<th>Referencia Presupuesto</th>"
                        html += "<th>Unidad</th>"
                        html += "<th>Cliente</th>"
                        html += "<th>Ejecutivo</th>"
                        html += "<th>Número de OC</th>"
                        html += "<th>Forma de Pago</th>"
                        html += "<th>Fecha Generación</th>"
                        html += "<th>Fecha Radicación</th>"
                        html += "<th>Generado Por</th>"
                        html += "<th>Días Ptes. Radicación</th>"
                        html += "<th>Descargar</th>"
                        
                    html += "</tr>"
                html += "</thead>"
            html += "</table>"
    $("#ContenedorFpl").html(html)
    $(".SubMenu").css({'padding':'0px'})
    var TotalFacturasPendientes = 0;
    var TotalSubtotal = 0;
    var TotalImpuestos = 0;
    var TotalGeneral = 0;
    $DataTable_OTProyectos = $('#TablaOrdenes').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'scrollY':"auto",
        'scrollX':true,
        'scrollCollapse':true,
        'ajax': {
            'url':UrlGeneral + '7bc28d1674d47ec7b0e9e4dde3c0ed3f',
            'data':function (d) {
                d.search['HashE'] = $("#parEmpresa").val();
                d.search['HashC'] = $("#parCliente").val();
                d.search['HashU'] = $("#parUnidadNegocio").val();
                d.search['HashP'] = $("#parProveedor").val();
                return $.extend({}, d, {
                    '_token':document.getElementsByName('_token')[0].value
                });
            },
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
                data: 'CodigoOT',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'NumPpto',
                "render": function (data, type, full, meta) {
                        return '<center>' + data + '</center>';
                }

            },
            {
                data: 'ReferenciaPpto',
                "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
                data: 'Unidad',
                "render": function (data, type, full, meta) {
                        return '<span >' + data + '</span>';
                    }

            },
            {
                data: 'Cliente',
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                data: 'Ejecutivo',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'NumOc',
                "render": function (data, type, full, meta) {
                    return '<center>' + data + '</center>';
                }

            },
            {
            data: 'FormaPago',
            "render": function (data, type, full, meta) {
                    return '<span >' + data + '</span>';
                }

            },
            {
            data: 'FechaCrea',
            "render": function (data, type, full, meta) {
                    return '<center >' + data + '</center>';
                }

            },
            {
                data: 'FechaRadicacion',
                "render": function (data, type, full, meta) {
                    return data;
                }

            },
            {
                data: 'CreadorOC',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<span>' + data + '</span>';
                }

            },

            
            {
                data: 'Dif',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    if( data >= 0 ){
                        return '<center style = "color:red;font-weigth:bold;">'+data+'</center>';
                    }else{
                        return '<center style = "color:green;font-weigth:bold;">'+data+'</center>';
                    }
                    
                }
            },
            {
                data: 'Ejecutivo',
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return '<center><a href = '+UrlGeneral+'13889e416790c50f0410449d8b5eaf3c43/'+full.Hash+' target = "_blank"><img src = "../images/descarga.png" class = "OptionIcon" /></a></center>';
                }
            },
        ],
        "order": [[9, "DESC"]],
        rowCallback:function(row,data)
        {
            TotalFacturasPendientes++;
            TotalSubtotal += parseInt(data.Subtotal);
            TotalImpuestos += parseInt(data.TotalImpuestos);
            TotalGeneral += parseInt(data.Total);
            //console.log("Subtotal "+ data['NumOc'] +":"+ data.Subtotal)
          
          
            $(".TotalFacturas").html(formatNumber.new(TotalFacturasPendientes))
            $(".Subtotales").html(HtmlValores_Doble(TotalSubtotal))
            $(".Impuestos").html(HtmlValores_Doble(TotalImpuestos))
            $(".Total").html(HtmlValores_Doble(TotalGeneral))
        },
        "language": {
            "url": UrlGeneral + "js/dataTable/Spanish.lang"
        }
    })
    $(".CardReport h5").css({'font-size':'15px'})
}

function GuardarFacturaCliente(){
    if( $("#parEmpresa").val() != '' && 
        $("#NumpPpto").val() != '' && 
        $("#FechaFact").val() != '' && 
        $("#NumFact").val() != '' && 
        $("#CostoUnitario_real").text() != '' && 
        $("#ValorTotal_real").text() != '' 
        ){
            var Impuestos = [];
            $(".SValorImpuestoFC").each(function(){
                if( $(this).prop("checked") ){
                    Impuestos.push({'Id':$(this).val()})
                }
            })
            
            var formData = new FormData();
            formData.append("parEmpresa", $("#parEmpresa").val());
            formData.append("NumpPpto", $("#NumpPpto").val());
            formData.append("FechaFact", $("#FechaFact").val());
            formData.append("NumFact", $("#NumFact").val());
            formData.append("CostoUnitario_real", $("#CostoUnitario_real").text());
            formData.append("ValorTotal_real", $("#ValorTotal_real").text());
            formData.append("ValorImpuestos_real", $("#ValorTotal_real").text());
            formData.append("Impuestos", JSON.stringify(Impuestos));

            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url:UrlGeneral+'5c57ac949372a7549ccd4068c6b779ab',
                success:function(data){
                    alert("Se ha Guardado la Factura de Manera Correcta ");
                }
            })
            
        }else{
            alert("Debe ingresar los campos Obligatorios");
        }
}

function BuscarInformacionFacturaPpto(){
    if( $("#parEmpresa").val() != '' && $("#NumpPpto").val() != '' && $("#NumFact").val()!= '' ){
        var formData = new FormData();
        formData.append("parEmpresa", $("#parEmpresa").val());
        formData.append("NumpPpto", $("#NumpPpto").val());
        formData.append("NumFact", $("#NumFact").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:'0ba0f80dd8251abef50dc05cfcc0b2dc',
            success:function(data){
                if( data.Info == 1 ){
                    $(".HabPagos").show("slow")
                    var html = "";
                    
                    //Tipo de Pagos
                    html = "<option value = '' selected >Seleccione</option>"
                    data.TipoPagos.forEach(obj => {
                        html += "<option value = '"+obj['Id']+"'>"+obj['Nombre']+"</option>"
                    });
                    $(".TipoPagos").html(html);
                    
                    //Descuentos
                    html = "<table class = 'tableNew'"
                        html += "<tr>"
                            html += "<th>No.</th>"
                            html += "<th>Nombre</th>"
                            html += "<th>Valor</th>"
                        html += "</tr>"
                        var i = 1;
                        data.Descuentos.forEach(obj => {
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i)+"</td>"
                                html += "<td><span class = 'HidenInformation HashDes"+(i)+"'>"+obj['Id']+"</span>"+obj['Nombre']+"</td>"
                                html += "<td>"
                                    html += "<input  autocomplete = 'off' type = 'text' name = 'Descuento"+obj['Id']+"' id = 'Descuento"+obj['Id']+"' onkeyup = 'FormatCampoNum(\"Descuento"+obj['Id']+"\",\"Descuento"+obj['Id']+"_real\");CalcularTotalFacturaPago()' value = '0' class = 'Descuento Descuento"+obj['Id']+" form-control' />"
                                    html += "<span style = 'display:none;' class = 'Descuento_real Descuento"+obj['Id']+"_real' id = 'Descuento"+obj['Id']+"_real'>0</span>"
                                html += "</td>"
                            html += "</tr>"
                            i++;
                        });
                        html += "<tr>"
                            html += "<th colspan = '2'>Total Descuentos</th>"
                            html += "<th class = 'TotalDescuento'>0</th>"
                        html += "</tr>"
                    $(".ContentDescuentos").html(html);
                    
                    HashFactCliente = data.Fact[0]['Id'];
                    $("#CostoUnitario").val(data.Fact[0]['ValorFactura']);
                    $("#CostoUnitario_real").text(data.Fact[0]['ValorFactura']);
                    FormatCampoNum("CostoUnitario","CostoUnitario_real");
                    
                    $("#ImpuestoCostoUnitario").val(data.Fact[0]['ValorImpuestos']);
                    $("#ImpuestoCostoUnitario_real").text(data.Fact[0]['ValorImpuestos']);
                    FormatCampoNum("ImpuestoCostoUnitario","ImpuestoCostoUnitario_real");
                }else{
                    $(".HabPagos").hide("slow")
                    alert("No se han encontrado Facturas de acuerdo a la información Ingresada.");
                }
                
            }
        })
    }else{
        alert("Debe ingresar los campos Obligatorios.");
    }
}

function CalcularTotalFacturaPago(){
    var TotalDescuento = 0;
    $(".Descuento_real").each(function(){
        if( isNaN(parseFloat($(this).text())) ){
            TotalDescuento += 0;
        }else{
            TotalDescuento += parseFloat($(this).text());
        }
    });
    $(".TotalDescuento").html( HtmlValores_Doble(TotalDescuento) );
}

function GuardarPagoFacturaCliente(){
    if( $("#parEmpresa").val() != '' && $("#NumpPpto").val() != '' && $("#NumFact").val()!= '' &&
            $("#FechaFact").val() != '' && $(".TipoPagos").val() != '' && $(".ValorPagado_real").text() != ''
            ){
            var Descuentos = [];
            var i = 1;
            $(".Descuento_real").each(function(){
                if( isNaN(parseFloat($(this).text())) ){
                    Descuentos.push({'Valor':0,'Id':$(".HashDes"+i).text()});
                }else{
                    Descuentos.push({'Valor':0,'Id':$(".HashDes"+i).text()});
                }
            });
            
            var formData = new FormData();
            formData.append("HashFactCliente", HashFactCliente );
            formData.append("TipoPagos", $(".TipoPagos").val());
            formData.append("FechaPago", $("#FechaFact").val());
            formData.append("ValorTotal_real", $(".ValorPagado_real").text());
            formData.append("Descuentos", JSON.stringify(Descuentos));

            $.ajax({
                headers:{
                    'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: "post",
                url:'5bd7e47e2fd8dadeccd8bc3b11fccee6',
                success:function(data){
                    if( data.Info == 0 ){
                        alert("Por favor intentelo de nuevo.");
                    }else{
                        ModalEdit(0)
                        alert("Se ha Guardado el Pago de la Factura de Manera Correcta ");
                    }
                    
                }
            })
    }else{
        alert("Debe ingresar los campos Obligatorios");
    }
}

function GenerarFactClientesPendientes(){
    //f1e63502fc482f546b4a5146deca4eae
    if( $("#OTC_Empresa").val() != ''){

        var formData = new FormData();
        formData.append("OTC_Empresa", $("#OTC_Empresa").val());
        formData.append("OTC_Unidad", $("#OTC_Unidad").val());
        formData.append("OTC_Cliente", $("#OTC_Cliente").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'f1e63502fc482f546b4a5146deca4eae',
            success:function(data){
                CarteraPendienteCliente = [];
                CarteraPendienteClienteDetalle = [];
                var html = "";
                html += "<div style = 'height:350px;width:100%;' class = 'GrafSummaryClient' id = 'GrafSummaryClient'></div>"
                html += "<br>"
                html += "<table width = '100%'>";
                    html += "<tr>"
                        html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '6'>Resumen General Facturas Pendientes Por Cobrar Por Unidad</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Unidad</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '3' class = 'CenterText cabecera_th_dark '>Cartera Pendiente</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Unidad</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Valor</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                    html += "</tr>"
                    var Summary = [];
                    ColorsGrhp = data.Colors;
                    for(var i = 0; i < data.Report.length;i++){
                        Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.Report[i]['Cantidad'], label:data.Report[i]['Unidad']}); 
                        
                        CarteraPendienteCliente.push(data.Report[i]['Clientes'])
                        var Porcen = 0;
                        html += "<tr>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                            
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<span class = 'Cursor NameUnidad"+i+"' onclick = 'VisualClientesFPC("+i+","+$("#OTC_Empresa").val()+")'>"
                                    html += data.Report[i]['Unidad']
                                html += "</span>"
                            html +="</td>"
                            html += "<th class = 'BorderCero'></th>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+data.Report[i]['Cantidad']+"</td>"
                            html += "<td class = 'CenterText td_cuerpo_table' >"
                                html += HtmlValores_Doble(data.Report[i]['Cartera'])
                            html += "</td>"
                            if( data.CantidadUnidad == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.Report[i]['Cantidad']/data.CantidadUnidad)*100;
                            }
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "</tr>"
                    }
                    
                    html += "<tr>"
                        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>"+data.CantidadUnidad+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark ''><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(data.TotalUnidad)+"</td></tr></table></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "</tr>"
                    
                html += "</table>"
                html += "<br>"
                html += "<div style = 'width:100%;' class = 'NexLevelCliente'></div>"
                
                
                $(".ContenedorReportCC").html(html);
                
                var chart = new CanvasJS.Chart("GrafSummaryClient", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Facturas Pendientes Por Cobrar",
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
                            toolTipContent: "<b>{label}</b>: <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });

                //Porcentaje:
                var dataPoint = chart.options.data[0].dataPoints;
                var total = data.CantidadUnidad;
                for(var i = 0; i < dataPoint.length; i++) {
                    chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }
                chart.render();
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            }
        })
    }else{
        alert("Debe ingresar los campos Obligatorios");
    }
}

function VisualClientesFPC(x,HashEmpresa){
    //$(".NexLevelCliente").show("slow")
    //DetalleCliente
    var SummaryClient = [];
    var Cliente = CarteraPendienteCliente[x];
    
    var html = "";
    
    html += "<div class = 'GrahpClientesUnidad' id = 'GrahpClientesUnidad' style = 'height:450px;width:100%;'></div>"
    html += "<br>"
    html += "<table width = '100%'>";
        html += "<tr>"
            html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '6'>Resumen General Facturas Pendientes Por Cobrar "+$(".NameUnidad"+x).text()+"</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Cliente</th>"
            html += "<th class = 'BorderCero'></th>"
            html += "<th colspan = '3' class = 'CenterText cabecera_th_dark '>Cartera Pendiente</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Cliente</th>"
            html += "<th class = 'BorderCero'></th>"
            html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
        html += "</tr>"
    var CantidadCartera = 0;
    var CantidadFact = 0;
    for(var i = 0; i < Cliente.length;i++){
        CarteraPendienteClienteDetalle.push(Cliente[i]['Detalle']);
        CantidadCartera += parseFloat(Cliente[i]['Cartera']);
        CantidadFact += parseFloat(Cliente[i]['Cantidad'] )
    }
   
    for(var i = 0; i < Cliente.length;i++){
        SummaryClient.push({ color: ColorsGrhp[i]['NumColor'] ,y: parseFloat(Cliente[i]['Cantidad']), label:Cliente[i]['Cliente']}); 
        var Porcen = 0;
        html += "<tr>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"

            html += "<td class = 'td_cuerpo_table'>"
                html += "<span class = 'Cursor NameCliente"+i+"' onclick = 'VisualClientesFPCDetalle("+i+","+$("#OTC_Empresa").val()+")'>"
                    html += Cliente[i]['Cliente']
                html += "</span>"
            html +="</td>"
            html += "<th class = 'BorderCero'></th>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Cantidad']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['Cartera'])
            html += "</td>"
            if( CantidadCartera == 0 ){
                Porcen =  0;
            }else{
                Porcen = (Cliente[i]['Cartera']/CantidadCartera)*100;
            }
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
        html += "</tr>"
    }
    html += "<tr>"
        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
        html += "<th></th>"
        html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(CantidadFact)+"</th>"
        html += "<th class = 'cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(CantidadCartera)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
    html += "</tr>"
    html += "</table>"
    html += "<br>"
    html += "<div style = 'width:100%' class = 'DetalleFacturas'></div>"

    $(".NexLevelCliente").html(html);
    var chart = new CanvasJS.Chart("GrahpClientesUnidad", {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor:"transparent",
        title:{
            text: "Facturas Pendientes Por Cobrar Clientes",
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
                toolTipContent: "<b>{label}</b>: <b>({percentage}%)</b>",
                valueRepresents: "area",
                dataPoints:  SummaryClient
        }]
    });

    //Porcentaje:
    /*var dataPoint = chart.options.data[0].dataPoints;
    var total = CantidadFact;
    for(var i = 0; i < dataPoint.length; i++) {
        chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
    }*/
    chart.render();
    $(".canvasjs-chart-credit").remove()
    $(".canvasjs-chart-toolbar").remove()
}

function VisualClientesFPCDetalle(x,HashEmpresa){
    var Cliente = CarteraPendienteClienteDetalle[x];
    var html = "";
    
    html += "<br>"
    html += "<table width = '100%'>";
        html += "<tr>"
            html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '13'>Detalle Facturas Pendientes Por Cobrar "+$(".NameCliente"+x).text()+"</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Fecha Factura</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Días</th>"
            html += "<th class = 'CenterText subtitulos_principales '>No. Factura</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Fecha Vencimiento</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Detalle</th>"
            html += "<th class = 'CenterText subtitulos_principales '>OT</th>"
            html += "<th class = 'CenterText subtitulos_principales '>PPTO</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Estado</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Días Mora</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor a Pagar</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor Impuestos</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Total</th>"
        html += "</tr>"
    var ValorFact = 0;
    var ValorImp = 0;
    for(var i = 0; i < Cliente.length;i++){
        ValorFact += parseFloat(Cliente[i]['ValorFactura']);
        ValorImp += parseFloat(Cliente[i]['ValorImpuestos'] )
    }
   
    for(var i = 0; i < Cliente.length;i++){
        var color = "color:green;font-weight:bold;"
        if( Cliente[i]['DiasMora'] > 0 ){
            color = "color:red;font-weight:bold;"
        }
        html += "<tr>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
            
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['Fecha']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Dias']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Factura']+"</td>"
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['FechaVencimiento']+"</td>"
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['Referencia']+"</td>"
            html += "<td class = 'td_cuerpo_table' nowrap>"+Cliente[i]['Codigo']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Ppto']+"</td>"
            html += "<td class = 'td_cuerpo_table' >"+Cliente[i]['Estado']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;"+color+"' >"+Cliente[i]['DiasMora']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorFactura'])
            html += "</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorImpuestos'])
            html += "</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorImpuestos'] + Cliente[i]['ValorFactura'])
            html += "</td>"
        html += "</tr>"
    }
    html += "<tr>"
        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '10'>Total</th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorFact)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorImp)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorFact + ValorImp)+"</td></tr></table></th>"
    html += "</tr>"
    html += "</table>"

    $(".DetalleFacturas").html(html);
}

function AdminFactPendientesCobroVencido(){
    var html = ""

    TituloVentana = "Cartera Vencida Clientes"
    ImgVentana = "images/FINANCIERA_ADMINISTRACIÓN_ICONO.png"
    html += GeneradorHeadersVentanasMenu()
    $("._TituloMenu").html( html )
    html = ""    
        html += "<div >";
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
                    html += "<img src ='../images/lupa.png' class = 'OptionIcon' onclick = 'GenerarFactClientesVencidas()'/>";
                html += "</div>";
            html += "</div>";
            html += "<br>"
            html += "<div class = 'ContenedorReportCC' style = 'width:100%;'></div>"
        html += "</div>";

    $(".ContentSubMenuAdmin").html(html);
    OTCliente.listaInit()
    //TablaListadoFacturasProveedores();
}

function GenerarFactClientesVencidas(){
    if( $("#OTC_Empresa").val() != ''){

        var formData = new FormData();
        formData.append("OTC_Empresa", $("#OTC_Empresa").val());
        formData.append("OTC_Unidad", $("#OTC_Unidad").val());
        formData.append("OTC_Cliente", $("#OTC_Cliente").val());

        $.ajax({
            headers:{
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            url:UrlGeneral+'fd55c65ccd470fed298a15466c8c93f0',
            success:function(data){
                CarteraPendienteCliente = [];
                CarteraPendienteClienteDetalle = [];
                var html = "";
                html += "<div style = 'height:350px;width:100%;' class = 'GrafSummaryClient' id = 'GrafSummaryClient'></div>"
                html += "<br>"
                html += "<table width = '100%'>";
                    html += "<tr>"
                        html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '6'>Resumen General Cartera Vencida Por Unidad</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Unidad</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th colspan = '3' class = 'CenterText cabecera_th_dark '>Cartera Pendiente</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Unidad</th>"
                        html += "<th class = 'BorderCero'></th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Valor</th>"
                        html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
                    html += "</tr>"
                    var Summary = [];
                    ColorsGrhp = data.Colors;
                    for(var i = 0; i < data.Report.length;i++){
                        Summary.push({ color: data.Colors[i]['NumColor'] ,y: data.Report[i]['Cantidad'], label:data.Report[i]['Unidad']}); 
                        
                        CarteraPendienteCliente.push(data.Report[i]['Clientes'])
                        var Porcen = 0;
                        html += "<tr>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
                            
                            html += "<td class = 'td_cuerpo_table'>"
                                html += "<span class = 'Cursor NameUnidad"+i+"' onclick = 'VisualClientesFPCVencido("+i+","+$("#OTC_Empresa").val()+")'>"
                                    html += data.Report[i]['Unidad']
                                html += "</span>"
                            html +="</td>"
                            html += "<th class = 'BorderCero'></th>"
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+data.Report[i]['Cantidad']+"</td>"
                            html += "<td class = 'CenterText td_cuerpo_table' >"
                                html += HtmlValores_Doble(data.Report[i]['Cartera'])
                            html += "</td>"
                            if( data.CantidadUnidad == 0 ){
                                Porcen =  0;
                            }else{
                                Porcen = (data.Report[i]['Cantidad']/data.CantidadUnidad)*100;
                            }
                            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
                        html += "</tr>"
                    }
                    
                    html += "<tr>"
                        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
                        html += "<th></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>"+data.CantidadUnidad+"</th>"
                        html += "<th class = 'CenterText cabecera_th_dark ''><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(data.TotalUnidad)+"</td></tr></table></th>"
                        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
                    html += "</tr>"
                    
                html += "</table>"
                html += "<br>"
                html += "<div style = 'width:100%;' class = 'NexLevelCliente'></div>"
                
                
                $(".ContenedorReportCC").html(html);
                
                var chart = new CanvasJS.Chart("GrafSummaryClient", {
                    animationEnabled: true,
                    exportEnabled: true,
                    backgroundColor:"transparent",
                    title:{
                        text: "Facturas Pendientes Por Cobrar",
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
                            toolTipContent: "<b>{label}</b>: <b>({percentage}%)</b>",
                            valueRepresents: "area",
                            dataPoints:  Summary
                    }]
                });

                //Porcentaje:
                var dataPoint = chart.options.data[0].dataPoints;
                var total = data.CantidadUnidad;
                for(var i = 0; i < dataPoint.length; i++) {
                    chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }
                chart.render();
                $(".canvasjs-chart-credit").remove()
                $(".canvasjs-chart-toolbar").remove()
            }
        })
    }else{
        alert("Debe ingresar los campos Obligatorios");
    }
}

function VisualClientesFPCVencido(x,HashEmpresa){
    //$(".NexLevelCliente").show("slow")
    //DetalleCliente
    var SummaryClient = [];
    var Cliente = CarteraPendienteCliente[x];
    
    var html = "";
    
    html += "<div class = 'GrahpClientesUnidad' id = 'GrahpClientesUnidad' style = 'height:450px;width:100%;'></div>"
    html += "<br>"
    html += "<table width = '100%'>";
        html += "<tr>"
            html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '6'>Resumen General Facturas Vencidas Por Cobrar "+$(".NameUnidad"+x).text()+"</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th colspan = '2' class = 'CenterText cabecera_th_dark '>Cliente</th>"
            html += "<th class = 'BorderCero'></th>"
            html += "<th colspan = '3' class = 'CenterText cabecera_th_dark '>Cartera Pendiente</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Cliente</th>"
            html += "<th class = 'BorderCero'></th>"
            html += "<th class = 'CenterText subtitulos_principales '>Cantidad</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Porcentaje</th>"
        html += "</tr>"
    var CantidadCartera = 0;
    var CantidadFact = 0;
    for(var i = 0; i < Cliente.length;i++){
        CarteraPendienteClienteDetalle.push(Cliente[i]['Detalle']);
        CantidadCartera += parseFloat(Cliente[i]['Cartera']);
        CantidadFact += parseFloat(Cliente[i]['Cantidad'] )
    }
   
    for(var i = 0; i < Cliente.length;i++){
        SummaryClient.push({ color: ColorsGrhp[i]['NumColor'] ,y: parseFloat(Cliente[i]['Cantidad']), label:Cliente[i]['Cliente']}); 
        var Porcen = 0;
        html += "<tr>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"

            html += "<td class = 'td_cuerpo_table'>"
                html += "<span class = 'Cursor NameCliente"+i+"' onclick = 'VisualClientesFPCVencidoDetalle("+i+","+$("#OTC_Empresa").val()+")'>"
                    html += Cliente[i]['Cliente']
                html += "</span>"
            html +="</td>"
            html += "<th class = 'BorderCero'></th>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Cantidad']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['Cartera'])
            html += "</td>"
            if( CantidadCartera == 0 ){
                Porcen =  0;
            }else{
                Porcen = (Cliente[i]['Cartera']/CantidadCartera)*100;
            }
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(Porcen.toFixed(2))+" %</td>"
        html += "</tr>"
    }
    html += "<tr>"
        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '2'>Total</th>"
        html += "<th></th>"
        html += "<th class = 'CenterText cabecera_th_dark '>"+formatNumber.new(CantidadFact)+"</th>"
        html += "<th class = 'cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(CantidadCartera)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '>100 %</th>"
    html += "</tr>"
    html += "</table>"
    html += "<br>"
    html += "<div style = 'width:100%' class = 'DetalleFacturas'></div>"

    $(".NexLevelCliente").html(html);
    var chart = new CanvasJS.Chart("GrahpClientesUnidad", {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor:"transparent",
        title:{
            text: "Facturas Pendientes Por Cobrar Clientes",
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
                toolTipContent: "<b>{label}</b>: <b>({percentage}%)</b>",
                valueRepresents: "area",
                dataPoints:  SummaryClient
        }]
    });

    //Porcentaje:
    /*var dataPoint = chart.options.data[0].dataPoints;
    var total = CantidadFact;
    for(var i = 0; i < dataPoint.length; i++) {
        chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
    }*/
    chart.render();
    $(".canvasjs-chart-credit").remove()
    $(".canvasjs-chart-toolbar").remove()
}

function VisualClientesFPCVencidoDetalle(x,HashEmpresa){
    var Cliente = CarteraPendienteClienteDetalle[x];
    var html = "";
    
    html += "<br>"
    html += "<table width = '100%'>";
        html += "<tr>"
            html += "<th class = 'subtitulos_mes CenterText border_top' colspan = '13'>Detalle Facturas Vencidas Por Cobrar "+$(".NameCliente"+x).text()+"</th>"
        html += "</tr>"
        html += "<tr>"
            html += "<th class = 'CenterText subtitulos_principales '>No.</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Fecha Factura</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Días</th>"
            html += "<th class = 'CenterText subtitulos_principales '>No. Factura</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Fecha Vencimiento</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Detalle</th>"
            html += "<th class = 'CenterText subtitulos_principales '>OT</th>"
            html += "<th class = 'CenterText subtitulos_principales '>PPTO</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Estado</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Días Mora</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor a Pagar</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Valor Impuestos</th>"
            html += "<th class = 'CenterText subtitulos_principales '>Total</th>"
        html += "</tr>"
    var ValorFact = 0;
    var ValorImp = 0;
    for(var i = 0; i < Cliente.length;i++){
        ValorFact += parseFloat(Cliente[i]['ValorFactura']);
        ValorImp += parseFloat(Cliente[i]['ValorImpuestos'] )
    }
   
    for(var i = 0; i < Cliente.length;i++){
        var color = "color:green;font-weight:bold;"
        if( Cliente[i]['DiasMora'] > 0 ){
            color = "color:red;font-weight:bold;"
        }
        html += "<tr>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+(i+1)+"</td>"
            
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['Fecha']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Dias']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Factura']+"</td>"
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['FechaVencimiento']+"</td>"
            html += "<td class = 'td_cuerpo_table'>"+Cliente[i]['Referencia']+"</td>"
            html += "<td class = 'td_cuerpo_table' nowrap>"+Cliente[i]['Codigo']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;'>"+Cliente[i]['Ppto']+"</td>"
            html += "<td class = 'td_cuerpo_table' >"+Cliente[i]['Estado']+"</td>"
            html += "<td class = 'td_cuerpo_table' style = 'text-align:center;"+color+"' >"+Cliente[i]['DiasMora']+"</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorFactura'])
            html += "</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorImpuestos'])
            html += "</td>"
            html += "<td class = 'CenterText td_cuerpo_table' >"
                html += HtmlValores_Doble(Cliente[i]['ValorImpuestos'] + Cliente[i]['ValorFactura'])
            html += "</td>"
        html += "</tr>"
    }
    html += "<tr>"
        html += "<th class = 'CenterText cabecera_th_dark ' colspan = '10'>Total</th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorFact)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorImp)+"</td></tr></table></th>"
        html += "<th class = 'CenterText cabecera_th_dark '><table width = '100%'><tr><td style = 'width:20%;text-align:right;border:0px;'>$</td><td style = 'border:0px;text-align:right;'>"+formatNumber.new(ValorFact + ValorImp)+"</td></tr></table></th>"
    html += "</tr>"
    html += "</table>"

    $(".DetalleFacturas").html(html);
}