<table>
    <tr>
        @if( count( $datos['PEdicion'] ) > 0  )
            <!--<td>
                <div class ='ContentSubMolButton'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='../images/editar.png' class = 'IconMenuP Cursor' data-toggle="modal" data-target="#ModalEdit" onclick ="__EditarInformacionEmpresa({{$datos['Hash']}})" />
                            </td>
                            <td >
                                <span class="Cursor" data-toggle="modal" data-target="#ModalEdit" onclick="__EditarInformacionEmpresa({{$datos['Hash']}})">Editar Información</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>-->
        @endif
    </tr>
</table>
<br>
<div class = 'ContenedorSeccionesForm _STeSTRU'>
    <p class = 'TitulosSecciones'>Información Estructura Empresa</p>
    <div id = 'pest' class=''>
        <ul >
                <li><a href="#pest-1">Unidades de Negocio</a></li>
                <li><a href="#pest-2" >Áreas</a></li>
                <li><a href="#pest-3">Cargos</a></li>
        </ul>
        <div id="pest-1">
            <div class = 'form-row'>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc' class = 'col-form-label'>Estado:</label>
                    <select class = 'form-control' name = 'UND_Estado' id = 'UND_Estado' >
                        <option value = '-1' >Todos</option>
                        <option value = '1' selected>Activas</option>
                        <option value = '0' >Inactivas</option>
                    </select>
                </div>
                <div class='col col-sm-3 my-2'>
                    <label for='IdTipoDoc'>Texto:</label>
                    <input autocomplete = 'off' type = 'text' class = 'form-control' id = 'Und_TextBusqueda' name = 'Und_TextBusqueda' />
                </div>
                <div class='col col-sm-3 my-2'>
                    <p></p>
                    <img src ='../images/35_Buscar.png' class = 'OptionIcon' onclick = 'BuscarTablaEmpresaUnidadesNegocio({{$datos["Hash"]}},0)'/>
                </div>
            </div><br>
            <div class = 'ContenedorDataTable'><table class='tableNew dataTable UnidadesNegocio"+Hash+"' id = 'UnidadesNegocio"+Hash+"'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Mínimo Rentabilidad</th>
                        <th>Descripción</th>
                        <th>Plan de Negocios</th>
                        <th>Cargado Por</th>
                        <th>Cargado El</th>
                        <th>Estado</th>
                        <th>Editar</th>
                    </tr>
                </thead>
            </table></div>
        </div>
        <div id="pest-2">
            @include('process.datos.empresa_detalle_general')
        </div>
        <div id="pest-3">
            @include('process.datos.empresa_detalle_general')
        </div>
    </div>
</div>
<br>

