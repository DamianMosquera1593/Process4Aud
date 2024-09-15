<table>
    <tr>
        @if( count( $datos['PEdicion'] ) > 0  )
            <td>
                <div class ='ContentSubMolButton'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='../images/editar.png' class = 'IconMenuP Cursor' data-state='0'  id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalEmpresaEdicion({{$datos["Hash"]}},0)' />
                            </td>
                            <td >
                                <span class="Cursor" data-toggle="modal" data-target="#ModalEdit" onclick="__EditarInformacionEmpresa({{$datos['Hash']}})">Editar Información</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        @endif
        <td>
                <div class ='ContentSubMolButton'>
                    <table width ='100%' class = 'ContenedorLink'>
                        <tr>
                            <td class = 'CenterText'>
                                <img src ='../images/editar.png' class = 'IconMenuP Cursor' data-state='0'  id='OptionIconEdit' class='OptionIcon' onclick = 'InformacionLegalEmpresaEdicion({{$datos["Hash"]}},0)' />
                            </td>
                            <td >
                                <span class="Cursor" data-toggle="modal" data-target="#ModalEdit" onclick="__EditarInformacionEmpresa({{$datos['Hash']}})">Editar Información</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
    </tr>
</table>
<br>
<div class = 'ContenedorSeccionesForm'>
    <p class = 'TitulosSecciones'>GENERAL</p>
    <div class = 'form-row my-3'>
        <div class='col-sm-3'>
            <label for='ParNit'>Nit:</label>
            <input type='text' id = 'ParNit' name = 'ParNit' class='form-control'autocomplete = 'off' value = '{{$datos["Empresa"][0]->Nit}}'required readonly>
        </div>
        <div class='col col-sm-3'>
            <label for='ParNit'>Nombre Comercial:</label>
            <input type='text' class='form-control' id='ParNombreComercial' name='ParNombreComercial'  value = '{{$datos["Empresa"][0]->NombreComercial}}' autocomplete = 'off' required readonly/>
        </div>
        <div class='col-sm-6'>
            <label for='ParNombreLegal'>Nombre Legal:</label>
            <input type='text' class='form-control' id='ParNombreLegal' name='ParNombreLegal' value = '{{$datos["Empresa"][0]->NombreLegal}}' autocomplete = 'off' required readonly/>
        </div>
    </div>
    <div class = 'form-row my-3'>
        <div class='col col-sm-2'>
            <label for='ParNit' ><span class = 'Obligatorio'>(*)</span> País:</label>
            <select name = 'ParGeneralPais' id='ParGeneralPais'  class='form-control' required disabled required>
                
                @foreach( $datos['Paises'] as $d)
                    @if( $d->IdPais == $datos["Empresa"][0]->IdPais )
                        <option value = ''>{{$d->Nombre}}</option>
                    @else
                    @endif
                @endforeach
            </select>
        </div>
        <div class='col col-sm-2'>
            <label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Departamento:</label>
            <select name = 'ParGeneralDepartamento' id='ParGeneralDepartamento'  class='form-control' required disabled required>
                @foreach( $datos['Departamento'] as $d)
                    @if( $d->IdDepartamento == $datos["Empresa"][0]->IdDepartamento )
                        <option value = ''>{{$d->Nombre}}</option>
                    @else
                    @endif
                @endforeach
            </select>
        </div>
        <div class='col col-sm-2'>
            <label for='ParNit' ><span class = 'Obligatorio'>(*)</span> Ciudad:</label>
            <select name = 'ParGeneralCiudad' id='ParGeneralCiudad' class='form-control' required disabled required>
                @foreach( $datos['Ciudad'] as $d)
                    @if( $d->IdCiudad == $datos["Empresa"][0]->IdCiudad )
                        <option value = ''>{{$d->Nombre}}</option>
                    @else
                    @endif
                @endforeach
            </select>
        </div>
        <div class='col col-sm-4'>
            <label for='ParDireccion' >Dirección:</label>
            <input type='text' class='form-control' id='ParDireccion' value = '{{$datos["Empresa"][0]->Direccion}}' name='ParDireccion' placeholder='Dirección' autocomplete = 'off' readonly/>
        </div>
        <div class='col col-sm-2'>
            <label for='ParFechaConstitucion' >Fecha Constitución:</label>
            <input type='text' class='DatePicker form-control' value = '{{$datos["Empresa"][0]->FConst}}' id='ParFechaConstitucion' name='ParFechaConstitucion'  readonly/>
        </div>
    </div>
    <div class = 'form-row my-3'>
        <div class='col-sm-4'>
            <label for='ParCorreoContacto'>Correo Contacto:</label>
            <input type='text' id = 'ParCorreoContacto' value = '{{$datos["Empresa"][0]->CorreoContacto}}' name = 'ParCorreoContacto' class='form-control' placeholder='Correo Contacto' autocomplete = 'off' readonly>
        </div>
        <div class='col-sm-2'>
            <label for='ParTipoEmpresa'>Tipo Empresa:</label>
            <select name = 'ParTipoEmpresa' id='ParTipoEmpresa' class='form-control' required disabled required>
                @foreach( $datos['par_tipoempresa'] as $d)
                    @if( $d->Id == $datos["Empresa"][0]->IdTipoEmpresa )
                        <option value = ''>{{$d->TipoDocumento}}</option>
                    @else
                    @endif
                @endforeach
            </select>
        </div>

    </div>
</div>
<br>

<div class = 'ContenedorSeccionesForm'>
    <p class = 'TitulosSecciones'>Información Representante Legal</p>

    <div class='form-row my-3'>
        @if ( COUNT($datos['RL']) == 0 )
        <div class='ol col-sm-12 my-2 representante-l'>
            <p>No se ha registrado Información:</p>
        </div>
        @else
            <div class='col col-sm-12 my-2 CenterText'>
                <table width = '100%'>
                    <tr>
                        <td rowspan = '2'class = 'CenterText' width = '200px'>
                            @if( $datos["RL"][0]->Foto != '' )
                                <?php echo '<img src ="'.url("/").'/images/foto.png" height = "100px"/>' ?>
                            @else
                                <?php echo '<img src ="'.url("/").'/images/foto.png" height = "100px"/>' ?>
                            @endif
                        </td>
                        <td nowrap >
                            <label for='ParNombreRL' class='col-form-label'>Nombre:</label>
                            <p>{{ $datos["RL"][0]->Nombre }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Tipo Documento:</label>
                            <p>{{ $datos["RL"][0]->TipoDocumento }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Nro. Documento:</label>
                            <p>{{ $datos["RL"][0]->NroDocumento }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Celular:</label>
                            <p>{{ $datos["RL"][0]->Celular }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Correo:</label>
                            <p>{{ $datos["RL"][0]->Correo }}</p>
                        </td>
                    </tr>
                </table>
            </div>
        @endif
    </div>
    <br>
    <hr>
    <p class = 'TitulosSecciones'>Información Suplente Representante Legal</p>
    <div class='form-row my-3'>
        @if ( COUNT($datos['RS']) == 0 )
        <div class='ol col-sm-12 my-2 representante-l'>
            <p>No se ha registrado Información:</p>
        </div>
        @else
            <div class='col col-sm-12 my-2 CenterText'>
                <table width = '100%'>
                    <tr>
                        <td rowspan = '2'class = 'CenterText' width = '200px'>
                            @if( $datos["RS"][0]->Foto != '' )
                                <?php echo '<img src ="'.url("/").'/images/foto.png" height = "100px"/>' ?>
                            @else
                                <?php echo '<img src ="'.url("/").'/images/foto.png" height = "100px"/>' ?>
                            @endif
                        </td>
                        <td nowrap >
                            <label for='ParNombreRL' class='col-form-label'>Nombre:</label>
                            <p>{{ $datos["RS"][0]->Nombre }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Tipo Documento:</label>
                            <p>{{ $datos["RS"][0]->TipoDocumento }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Nro. Documento:</label>
                            <p>{{ $datos["RS"][0]->NroDocumento }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Celular:</label>
                            <p>{{ $datos["RS"][0]->Celular }}</p>
                        </td>
                        <td>
                            <label for='ParNombreRL' class='col-form-label'>Correo:</label>
                            <p>{{ $datos["RS"][0]->Correo }}</p>
                        </td>
                    </tr>
                </table>
            </div>
        @endif
    </div>
</div>
<br>
<div class = 'ContenedorSeccionesForm'>
    <p class = 'TitulosSecciones'>Redes Sociales</p>
    <table width='100%'>
        <tr>
            @foreach( $datos["Social"] as $d )
                @if( $d->Link != '' )
                    
                @else
                @endif
                <td class='CenterText'>
                        <a target='_blank' href='{{$d->Link}}'>
                            <i class='IconSize-xl Cursor {{$d->Icono}}'></i>
                        </a>
                    </td>
            @endforeach
        </tr>
    </table>
</div>

<br>
<div class = 'ContenedorSeccionesForm'>
    <p class = 'TitulosSecciones'>Institucional</p>
    <div class='form-row my-3'>
        <label for='ParMision' class='col-form-label'>Misión:</label>
        <textarea class='form-control' id='ParMision' name='ParMision' placeholder='Misión' readonly></textarea>
    </div>
    <div class='form-row my-3'>
        <label for='ParVision' class='col-form-label'>Visión:</label>
        <textarea class='form-control' id='ParVision' name='ParVision' placeholder='Visión' readonly></textarea>
    </div>
    <div class='form-row my-3'>
        <label for='ParObjetivos' class='col-form-label'>Objetivos:</label>
        <textarea class='form-control' id='ParObjetivos' name='ParObjetivos' placeholder='Objetivos' readonly></textarea>
    </div>
</div>
