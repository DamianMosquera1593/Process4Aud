@extends('layouts.inicio_process')

@section('content')

{{ csrf_field() }}
<div class="ContentPanel ">
    <br>
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            TIPOS DE SOLICITUDES
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentDocLegales' onclick = 'ContentList("DocLegales")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentDocLegales' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPOSOLICITUD_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearTipoSolicitud()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoSolicitud()" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Solicitud</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TipoDoc_Estado' id = 'TipoDoc_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TipoDoc_TextBusqueda' name = 'TipoDoc_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTipoDocumentoEmpresa()'/>
                    </div>
                </div>
                <table id = "TableDocLegales" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>
    @endif
    
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            TIPOS DE DESARROLLO
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentTarifasImpuestos' onclick = 'ContentList("TarifasImpuestos")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentTarifasImpuestos' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearTipoDesarrollo()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoDesarrollo()" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Desarrollo</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TI_Estado' id = 'TI_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TI_TextBusqueda' name = 'TI_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTarifasImpuestosEmpresa()'/>
                    </div>
                </div>
                <table id = "TablaTarifasImpuestos" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>   
    @endif
    
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            TIPOS DE MATERIAL
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentTarifasImpuestos' onclick = 'ContentList("TarifasImpuestos")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentTarifasImpuestos' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearTipoMaterial()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearTipoMaterial()" data-toggle="modal" data-target="#ModalEdit">Nuevo Tipo de Material</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TM_Estado' id = 'TM_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TM_TextBusqueda' name = 'TM_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarTipoMaterial()'/>
                    </div>
                </div>
                <table id = "TablaTipoMaterial" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>   
    @endif
    
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            MEDIOS TIPO DE MATERIAL
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentTarifasImpuestos' onclick = 'ContentList("TarifasImpuestos")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentTarifasImpuestos' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearMTipoMaterial()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearMTipoMaterial()" data-toggle="modal" data-target="#ModalEdit">Nuevo Medio Tipo de Material</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TMM_Estado' id = 'TMM_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TMM_TextBusqueda' name = 'TMM_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarMTipoMaterial()'/>
                    </div>
                </div>
                <table id = "TablaMedioTipoMaterial" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Tipo Material</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>   
    @endif
    
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            SECTOR / UNIDAD
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentTarifasImpuestos' onclick = 'ContentList("TarifasImpuestos")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentTarifasImpuestos' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearSectorUnidad()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSectorUnidad()" data-toggle="modal" data-target="#ModalEdit">Nuevo Sector / Unidad</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TSU_Estado' id = 'TSU_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TSU_TextBusqueda' name = 'TSU_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarSectores()'/>
                    </div>
                </div>
                <table id = "TablaSectores" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>   
    @endif
    
    @if( session("PAR_REQUERIMIENTO_CLIENTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class="panel-heading alert-primary BorderTop">
                <table class = 'table'>
                    <tr>
                        <td width = '90%' class = 'BlackFont'>
                            DETALLE SECTOR / UNIDAD
                        </td>
                        <td class = 'text-left' >
                            <a href='#' class = 'PAR_ContentTarifasImpuestos' onclick = 'ContentList("TarifasImpuestos")'>
                                <i  class="Cursor fas fa-angle-double-down"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'ContenedorOptionDiv PARDIV_ContentTarifasImpuestos' style ='display:none;'>
                @if( session("PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/datos_additem.png' class = 'OptionIcon'onclick = "CrearDSectorUnidad()" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDSectorUnidad()" data-toggle="modal" data-target="#ModalEdit">Nuevo Detalle Sector / Unidad</span>
                </div>
                @endif

                <div class = 'form-row'>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Estado:</label>
                        <select class ='form-control' name = 'TSUD_Estado' id = 'TSUD_Estado'>
                            <option value = '-1' >Todos</option>
                            <option value = '1' selected >Activo</option>
                            <option value = '0'>Inactivo</option>
                        </select>
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <label for='IdTipoDoc'>Buscar:</label>
                        <input type = 'text' class = 'form-control' id = 'TSUD_TextBusqueda' name = 'TSUD_TextBusqueda' />
                    </div>
                    <div class='col col-sm-3 my-2'>
                        <p></p>
                        <img src ='images/datos_buscar.png' class = 'OptionIcon' onclick = 'BuscarDSectores()'/>
                    </div>
                </div>
                <table id = "TablaSectoresDetalle" class="tableNew dataTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Sector</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <br>   
    @endif
</div>

<?php echo '<script type="text/javascript" src = "js/Parametrizacion/requerimientosCliente.js?v='.date("Y-m-d H:i:s").'"></script>';?>
<script>
    $(document).ready(function () {
        $(".TituloPantalla").html("Datos - Parametrización - Requerimientos Clientes");
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".ContentPanel").css({
            'height':$("body").height()-100
        })
    });
</script>
@endsection