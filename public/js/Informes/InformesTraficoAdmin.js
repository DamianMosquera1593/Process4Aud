/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(".TituloPantalla").html("Informes - Tráfico Administrativo");

    $(".alert-primary").css({
        'background-color':'#1B4075',
    })
    $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
        'color':'white'
    })
    
    InformesData.listDataTraficoUsuarios();
    
    
    $(".PARDIV_ContentTRACLIENTEOT").show();
    $(".PAR_ContentTRACLIENTEOT").html('<i class=" Cursor fas fa-angle-double-up"></i>');
    
    if( $(".XCs").text() != '' ){
        MostrarTabsMenu(4)
    }else{
        MostrarTabsMenu(1)
    }
});

var DataEmpresas = [];
var DataClientes = [];
var DataProveedores = [];
var DataBancos = [];

const InformesData = {
    listEmpresasGeneral: function(){
      printDataAjax('bc8bb43747f8396dbe7a4f797d76d3c4', {HashEmpresa:null}, data => {
            let html = '<option value="" selected>Seleccione</option>'
            data.empresas.forEach(obj => {
                html += "<option value = '"+obj['Hash']+"'>"+obj['Nombre']+"</option>"
            });
            $('#OTC_Empresa').html(html)
        })  
    },
    listDataTraficoUsuarios: function () {
        printDataAjax('7b0e28f8f4a68ad35ed13a77ef4fcf1a', {}, data => {
            var html = ''
            data.Usuarios.forEach(obj =>{
                html += '<div id = "ContentTA'+obj['Hash']+'" class="Cursor col text-center" >'
                    html += '<img src = "'+UrlGeneral+'../storage/app/Usuarios/'+obj['ImgUsuario']+'" onerror=this.src="'+UrlGeneral+'/images/foto.png" style ="height:150px;" class = "Cursor rounded-circle PUser NotSelectId" data-toggle="modal" data-target="#ModalEdit"  onclick = "Informes_TraficoAdminUser('+obj['Hash']+')"/>'
                    html += '<table style = "width:100%;" >'
                        html += '<tr>'
                            html += '<td nowrap>'
                                html += '<h5 class="FirstText ContentTA'+obj['Hash']+'" style="font-size:16px;color:#1B4075;font-weight: bold;" data-toggle="modal" data-target="#ModalEdit" onclick = "Informes_TraficoAdminUser('+obj['Hash']+')">'+obj['NombreUsuario']+'</h5>'
                            html += '</td>'
                        html += '</tr>'
                    html += '</table>'
                html += '</div>'
            });
            $(".ContentTraficosUser").html(html)
        })  
    },
} 


function Informes_TraficoAdminUser(Hash){
    //8395dce43d2702a2f124117ce95e5351
    printDataAjax('8395dce43d2702a2f124117ce95e5351', {Hash:Hash}, data => {
        var html = ""
        

        TituloVentana = "Tráfico Administrativo "+$(".ContentTA"+Hash).text()
        ImgVentana = "images/AGREGAR_ICONO.png"
        FuncionesHeader = ""
        FuncionesRegresar = "myModal(0)"
        html += "<div class='modal-header'>";
            html += GeneradorHeadersVentanas()
        html += "</div>";
        html += "<div class='modal-body'>";
            /*html += "<div class = 'form-row'>";
                html += "<div class='col col-sm-12 my-2'>";
                    html += "<label>A continuación se listas los tráficos administrativos del Usuario.</label>"
                html += "</div>";
            html += "</div>";*/
            html += "<div class = 'form-row'>";
                html += "<div class = 'ContenedorOptionDiv PARDIV_Content1' >"
                    html += "<div class = 'form-row FormsGeneral'>";
                    for(var i = 0; i < data.Trafico.length; i++){
                        html += "<div class='col col-sm-3 my-1'>"
                            html += "<div class = 'CardReport Cursor ContenedorCanalesTA' onclick = 'Informes_ListarGruposCanal_View("+data.Trafico[i]['Hash']+")'>"
                                html += "<table style = 'width:100%;'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:100%;' nowrap>"
                                            html += "<h5 class = 'ChanelTA_"+data.Trafico[i]['Hash']+"'>"+data.Trafico[i]['Canal']+"</h5>"
                                        html += "</td>"
                                    html += "</tr>"
                                html += "</table>"                                
                            html += "</div>"
                        html += "</div>"
                    } 
                    html += "</div>"
                html += "</div>";
                html += "<div class = 'DetalleCanal' style = 'width:100%;'></div>"
                html += "<br>"
            html += "</div>";
        html += "</div>";

        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        $("#ModalContentForm").addClass('modal-dialog-scrollable');
        $(".CardReport h5").css({
            'font-size':'14px'
        })
    })  
}

var DatosGrupo = [];

function ConsultarDetalleGrupo(i){
    
    var html = "";
    html += "<br><hr>"
    html += "<table class = 'tableNew' width = '100%'>"
        for(var x = 0; x < DatosGrupo[i]['Detalle'].length; x++){
            html += "<tr>"
                html += "<th colspan = '8' class = 'TablaReportes_TituloPrincipal '>"+DatosGrupo[i]['Detalle'][x]['Nombre']+"</th>"
            html += "</tr>"
            html += "<tr>"
                html += "<th class = 'TitulosTA' style = 'width:50px;'>No.</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;'>Nombre</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;'>Status</th>"
                html += "<th class = 'TitulosTA' style = 'width:350px;' nowrap>Actividad</th>"
                html += "<th class = 'TitulosTA' >Responsable</th>"
                html += "<th class = 'TitulosTA' >Contactos</th>"
                html += "<th class = 'TitulosTA' style = 'width:150px;'>Fecha Creación</th>"
                html += "<th class = 'TitulosTA' >Fecha Entrega</th>"
            html += "</tr>"
            var OrdenItems = 1;
            for(var act = 0; act < DatosGrupo[i]['Detalle'][x]['Data'].length; act++){
                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Id_Estado'] == 2 ){
                    html += "<tr class = 'Cursor_AS'>";
                        html += "<td class = 'ItemsOrdenList TablaReportes_Cuerpo_Center ItemsOrdenList"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"+OrdenItems+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control NActTA"+DatosGrupo[i]['Detalle'][x]['Data']['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['NombreTarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control StatusTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Status']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control ActTA"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Tarea']+"</textarea></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center TR"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' nowrap>"
                            html += "<table  >"
                                html += "<tr>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'></th>"
                                html += "<tr>"
                                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length == 0 ){
                                    html += "<tr class = 'LResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '3'>No se han registrado Responsables.</td>"
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
                        html += "<td class = 'TablaReportes_Cuerpo'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['NombreTarea']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Status']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Tarea']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center TR"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"' nowrap>"
                            html += "<table width = '100%' >"
                                html += "<tr>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                    html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                html += "<tr>"
                                if( DatosGrupo[i]['Detalle'][x]['Data'][act]['Responsables'].length == 0 ){
                                    html += "<tr class = 'LResponsablesTarea"+DatosGrupo[i]['Detalle'][x]['Data'][act]['Hash']+"'>"
                                        html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '3'>No se han registrado Responsables.</td>"
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

                        html += "</td>";
                        html += "<td class = 'TablaReportes_Cuerpo'></td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaHora']+"</td>";
                        html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+DatosGrupo[i]['Detalle'][x]['Data'][act]['FechaEntregaLarga']+"</td>";

                    html += "</tr>";
                }
                OrdenItems++
            }
        }
    html += "</table>"
    $(".InfoGrupos").html(html)
}

function Informes_ListarGruposCanal_View(Hash){
    var OrdenItems = 1;
    DatosGrupo = [];
    printDataAjax('16a8299025b2c27a2ab19a96f320b9b3', {HashCP:Hash}, (data)=>{
        var html = "<hr>";
        html += "<div class='ContenedorMenu' style = 'width:100%;border-top-left-radius:0.3em;border-top-right-radius:0.3em;'>";
            html += "<div class='ContenedorCanalesTA' style = 'padding:0px;border:0px;'>";
                html += "<table width = '100%'>";
                    html += "<tr>";
                        html += "<td width = '95%' class = 'CenterText WhiteFont' style = 'vertical-align:middle;font-size:15px;'>";
                            html += $(".ChanelTA_"+Hash).text()
                        html += "</td>";
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
                                                html += "<div class = 'CardReport Cursor ContenedorCanalesTAGrupos' onclick = 'ConsultarDetalleGrupo("+i+")'>"
                                                    html += "<h5 class = 'ChanelTAG_"+data.grupos[i]['Hash']+"'>"+data.grupos[i]['Nombre']+"</h5>"                              
                                                html += "</div>"
                                            html += "</td>"
                                            DatosGrupo.push({
                                                'Detalle':data.grupos[i]['Subgrupos']
                                            })
                                            console.log(data.grupos[i]['Subgrupos'])
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
                
                
                /*
                html += "<table width = '100%'>"
                    html += "<tbody >";
                    for(var i = 0; i < data.grupos.length; i++){
                        html += "<tr>"
                            html += "<td >"
                                html += "<div class = 'TablaReportes_TituloSecundarios' style = 'width:100%;'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText HidenInformation GroupTA_Orden' >"
                                                html += data.grupos[i]['Hash']
                                            html += "</td>"
                                            html += "<td style = 'width:95%;' class = 'Cursor_AS GroupTA_"+data.grupos[i]['Hash']+"'>"+data.grupos[i]['Nombre']+"</td>"
                                            
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</div>"
                                html += "<div class = 'CenterText' style = 'width:100%;'>"
                                    html += "<table width = '100%'>"
                                        html += "<tbody >"
                                        
                                        for(var subg = 0; subg < data.grupos[i]['Subgrupos'].length; subg++){
                                            html += "<tr>"
                                                html += "<td style = 'width:95%;'>"
                                                    html += "<div class = 'TablaReportes_TituloPrincipal ' style = 'width:100%;'>"
                                                        html += "<table width = '100%'>"
                                                            html += "<tr>"
                                                                html += "<td style = 'width:95%;' class = 'Cursor_AS '><span class = 'SubGroupTA_"+data.grupos[i]['Subgrupos'][subg]['Hash']+"'>"+data.grupos[i]['Subgrupos'][subg]['Nombre']+"</span><span class = 'HidenInformation DescSub"+data.grupos[i]['Subgrupos'][subg]['Hash']+"'>"+data.grupos[i]['Subgrupos'][subg]['Descripcion']+"</span></td>"
                                                            html += "</tr>"
                                                        html += "</table>"
                                                    html += "</div>"
                                                    html += "<div class = '' style = 'width:100%;'>"
                                                    if(data.grupos[i]['Subgrupos'][subg]['Data'].length > 0){
                                                        html += "<table class = 'tableNew'  width = '100%'>"
                                                            html += "<thead>";
                                                                html += "<tr>"
                                                                    html += "<th style = 'width:50px;'>No.</th>"
                                                                    html += "<th style = 'width:350px;'>Nombre</th>"
                                                                    html += "<th style = 'width:350px;'>Status</th>"
                                                                    html += "<th style = 'width:350px;'>Actividad</th>"
                                                                    html += "<th >Responsable</th>"
                                                                    html += "<th >Contactos</th>"
                                                                    html += "<th style = 'width:150px;'>Fecha Creación</th>"
                                                                    html += "<th >Fecha Entrega</th>"
                                                                html += "</tr>"
                                                            html += "</thead>";
                                                            html += "<tbody >"
                                                                for(var act = 0; act < data.grupos[i]['Subgrupos'][subg]['Data'].length; act++){
                                                                    if( data.grupos[i]['Subgrupos'][subg]['Data'][act]['Id_Estado'] == 2 ){
                                                                        html += "<tr class = 'Cursor_AS'>";
                                                                            html += "<td class = 'ItemsOrdenList TablaReportes_Cuerpo_Center ItemsOrdenList"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'>"+OrdenItems+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control NActTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['NombreTarea']+"</textarea></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control StatusTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Status']+"</textarea></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'><textarea readonly class = 'form-control ActTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"' style = 'text-align:justify;width:350px;height:60px;'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Tarea']+"</textarea></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center TR"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"' nowrap>"
                                                                                html += "<table width = '100%' >"
                                                                                    html += "<tr>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'></th>"
                                                                                    html += "<tr>"
                                                                                    if( data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'].length == 0 ){
                                                                                        html += "<tr class = 'LResponsablesTarea"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '3'>No se han registrado Responsables.</td>"
                                                                                        html += "</tr>"
                                                                                    }
                                                                                    for(var rs = 0; rs < data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'].length; rs++){
                                                                                        html += "<tr class = 'ResponsablesTarea"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+" ResponsableTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Id']+"'>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(rs+1)+"</td>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+(data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Nombre'])+"</td>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+(data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Email'])+"</td>"
                                                                                            
                                                                                        html += "</tr>"
                                                                                    }
                                                                                html += "</table>"
                                                                                html += "<hr>"

                                                                            html += "</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['FechaHora']+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'><input readonly class = 'form-control FechaEntregaTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'type = 'date' value = '"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['FechaEntrega']+"'/></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"
                                                                                html += "<span class = 'HidenInformation HashItemsTRA'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"</span>"
                                                                                html += "<span class = 'HidenInformation Subgrupo"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'>"+data.grupos[i]['Subgrupos'][subg]['Hash']+"</span>"
                                                                            html += "</td>";
                                                                        html += "</tr>";
                                                                    }else{
                                                                        html += "<tr >";
                                                                            html += "<td class = 'ItemsOrdenList TablaReportes_Cuerpo_Center ItemsOrdenList"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'>"+OrdenItems+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['NombreTarea']+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Status']+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Tarea']+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center TR"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"' nowrap>"
                                                                                html += "<table width = '100%' >"
                                                                                    html += "<tr>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>No.</th>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Nombre</th>"
                                                                                        html += "<th class = 'CenterText TablaReportes_TituloSecundarios'>Correo</th>"
                                                                                    html += "<tr>"
                                                                                    if( data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'].length == 0 ){
                                                                                        html += "<tr class = 'LResponsablesTarea"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+"'>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center' colspan = '3'>No se han registrado Responsables.</td>"
                                                                                        html += "</tr>"
                                                                                    }
                                                                                    for(var rs = 0; rs < data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'].length; rs++){
                                                                                        html += "<tr class = 'ResponsablesTarea"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Hash']+" ResponsableTA"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Id']+"'>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center'>"+(rs+1)+"</td>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+(data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Nombre'])+"</td>"
                                                                                            html += "<td class = 'TablaReportes_Cuerpo'>"+(data.grupos[i]['Subgrupos'][subg]['Data'][act]['Responsables'][rs]['Email'])+"</td>"
                                                                                            
                                                                                        html += "</tr>"
                                                                                    }
                                                                                html += "</table>"

                                                                            html += "</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo'></td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['FechaHora']+"</td>";
                                                                            html += "<td class = 'TablaReportes_Cuerpo_Center' nowrap>"+data.grupos[i]['Subgrupos'][subg]['Data'][act]['FechaEntregaLarga']+"</td>";
                                                                            
                                                                        html += "</tr>";
                                                                    }
                                                                    
                                                                    OrdenItems++
                                                                }
                                                            html += "</tbody>"
                                                        html += "</table>"
                                                    }
                                                    html += "</div>"
                                                    html += "<hr>"
                                                html += "</td>"
                                            html += "</tr>"
                                        }
                                        html += "</tbody>"
                                    html += "</table>"
                                html += "</div>"
                                html += "<br>"
                            html += "</td>"
                        html += "</tr>"
                    }
                    
                    html += "</tbody>"
                html += "</table>"*/
                html += "<div class = 'ContentPanelActiv' style = 'width:100%;'>";
                    
                html += "</div>"
            html += "</div>";
        html += "</div>";
        
        $(".DetalleCanal").html(html)
        
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
            }
        });
        $(".TRA_Items").sortable({
            stop: function( event, ui ) {
                var temp = "";
                $(".TRA_Items .ItemsOrdenList").each(function(index){
                    $(this).html(index+1);
                });
            }
        });
        
        
        $(".GroupTA").css({
            'font-weight':'normal'
        })
        $(".OptionIcon").css({'height':'25px'})
        $(".CardReport h5").css({
            'font-size':'14px'
        })
        $(".ContenedorOptionDiv").css({'scroll-behavior': 'smooth'})
    })
}

function MovLeftDiv(){
    $(".ContenidoScroller").scrollLeft( $(".ContenidoScroller").scrollLeft() - 15)
}
function MovRightDiv(){
    $(".ContenidoScroller").scrollLeft( $(".ContenidoScroller").scrollLeft() + 15 )
}