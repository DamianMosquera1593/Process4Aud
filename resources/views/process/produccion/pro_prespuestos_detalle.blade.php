
@extends('layouts.inicio_process')

@section('content')
<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>

<span class = 'HidenInformation HashP'>{{$Datos[0]->Id}}</span>

<div class="HidenInformation m-b-md flex-center BlackFont" style = 'margin-bottom: 12px;' >
    <span class = 'CenterText HashRP'>{{$Datos[0]->Referencia}}</span>
</div>
<div>
    <div class = 'form-row'>
        <div class = 'col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>Estado</label>
            @if( $Datos[0]->Estado_Presupuesto == 'En Construcción' || $Datos[0]->Estado_Presupuesto == 'Pendiente Aprobación Cliente' || $Datos[0]->Estado_Presupuesto == 'Sin Facturar en Ordenación')
                <div class='ContenidoCampo'>{{$Datos[0]->Estado_Presupuesto}}</div>
                
            @elseif( $Datos[0]->Estado_Presupuesto == 'En Aprobación Interna' )
                <div onclick = 'ViewStatusAprobacion()'class='ContenidoCampo Cursor' style = 'background-color:rgb(96 195 96);color:white;font-weight: bold;'>
                    <span >{{$Datos[0]->Estado_Presupuesto}}</span>
                </div>
            @endif
            
        </div>
        <div class='col-sm-3 my-2'>
            <label class = 'ContenidoItems col-form-label ' >% Rentabilidad</label>
            <div class = 'ContenidoCampo Por_RentabilidadTotal CenterText'></div>
        </div>
        @if( $Datos[0]->PRODUCCION_PPTOS_RESUMEN === 1 )
            <div class='col-sm-3 my-2'>
                <label class = 'ContenidoItems col-form-label ' >Resumen Presupuesto</label>
                <div class = 'ContenidoCampo'>
                    <span class = 'button-blue Cursor' onclick="ViewResumenPresupuesto()" data-toggle="modal" data-target="#ModalEdit">Consultar</span>
                </div>
            </div>
        @endif
        
        <div class='col-sm-3 my-2'>
            <label class = 'ContenidoItems col-form-label ' >Cabecera Presupuesto</label>
            <div class = 'ContenidoCampo'>
                <span class = 'button-blue Cursor' onclick = "ViewCabeceraPpto({{$Datos[0]->url}})">Consultar</span>
            </div>
        </div>
    </div>
    
<hr>
    <div class = 'table'>
        {{ csrf_field() }}
        @if( $Datos[0]->PRODUCCION_PPTOS_GRUPO_CREAR == 1 && $Datos[0]->Estado_Presupuesto == 'En Construcción')
            <img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"> Crear Grupo </span>
        @endif
        @if( $Datos[0]->IdUsuario == 13 )
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8MDA/{{$Datos[0]->Hash}}" target = '_blank'>
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Interno </span>
            </a>
        @endif
        
        @if( $Datos[0]->Estado_Presupuesto == 'En Construcción' )
            <img src ='../images/datos_reordenar.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "ReorganizarGruposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "ReorganizarGruposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"> Organizar Grupos </span>

            <img src ='../images/guardar.png' class = 'OptionIcon' style ="padding-left:10px;"onclick = "GuardarDatos({{$Datos[0]->url}})" />
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "GuardarDatos({{$Datos[0]->url}})" > Guardar</span>

            <img src ='../images/departamentos.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "VersionesPresupuesto()" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "VersionesPresupuesto()" data-toggle="modal" data-target="#ModalEdit" > Versiones</span>
            
            <img src ='../images/Anticipos.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "AnticiposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "AnticiposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit" > Anticipos</span>

            <img src ='../images/trafico_enviar.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "EnviarPptoAprobacion()" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "EnviarPptoAprobacion()" data-toggle="modal" data-target="#ModalEdit" > Enviar a Aprobación</span>
        @endif
        
        @if( $Datos[0]->Estado_Presupuesto == 'Pendiente Aprobación Cliente' )
            
            
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8/{{$Datos[0]->Hash}}" target = '_blank'>
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente sin Proveedores </span>
            </a>
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8x/{{$Datos[0]->Hash}}" target = '_blank' >
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente sin Proveedores Comisión Manual </span>
            </a>
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8as/{{$Datos[0]->Hash}}" target = '_blank' >
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente con Proveedores </span>
            </a>
            
            <img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "SendProbCliente()" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "SendProbCliente()" data-toggle="modal" data-target="#ModalEdit" > Cargar Aprobación Cliente</span>
        @endif
        
        @if( $Datos[0]->Estado_Presupuesto == 'Sin Facturar en Ordenación' )
            <img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"> Crear Grupo </span>
            
            <img src ='../images/guardar.png' class = 'OptionIcon' style ="padding-left:10px;"onclick = "GuardarDatos({{$Datos[0]->url}})" />
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "GuardarDatos({{$Datos[0]->url}})" > Guardar</span>
            
            <img src ='../images/Anticipos.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "AnticiposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "AnticiposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit" > Anticipos</span>
            
            @if( $Datos[0]->IdMoneda == 2 )
                <a href="../6f4926481edc1ae3b08f31d5b2689ef8MD/{{$Datos[0]->Hash}}" target = '_blank'>
                    <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                    <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente Dólares </span>
                </a>
            @endif
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8/{{$Datos[0]->Hash}}" target = '_blank'>
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente sin Proveedores </span>
            </a>
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8x/{{$Datos[0]->Hash}}" target = '_blank' >
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente sin Proveedores Comisión Manual </span>
            </a>
            <a href="../6f4926481edc1ae3b08f31d5b2689ef8as/{{$Datos[0]->Hash}}" target = '_blank' >
                <img src ='../images/BPdf.png' class = 'OptionIcon' style ="padding-left:10px;"/>
                <span class="FirstText Cursor" style="color:#1B4075;" > PDF Presupuesto Cliente con Proveedores </span>
            </a>
            
            <img src ='../images/datos_negociaciones.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "FormOP()" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "FormOP()" data-toggle="modal" data-target="#ModalEdit" > Órdenes de Producción</span>
            
            <img src ='../images/datos_negociaciones.png' class = 'OptionIcon' style ="padding-left:10px;" onclick = "FormOC()" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "FormOC()" data-toggle="modal" data-target="#ModalEdit" > Órdenes de Compra</span>
        @else
            <img src ='../images/guardar.png' class = 'OptionIcon' style ="padding-left:10px;"onclick = "GuardarDatos({{$Datos[0]->url}})" />
            <span class="FirstText Cursor" style="color:#1B4075;" onclick = "GuardarDatos({{$Datos[0]->url}})" > Guardar</span>
        @endif
    </div>
    <hr>
    <div class="ContenedorMenu" style = 'border:0px;overflo:scroll;'>
        <div class = 'ContenedorOptionDiv' >
            <div class = 'ContenedorDataPpto' style = 'width:100%;'>
                @if( $Datos[0]->VersionCerrada == 0 )
                    @foreach($Datos[0]->Grupos as $g)
                    <table class = 'tableNew Grupo{{$g->Hash}}' style = 'width:100%;'>
                        <tr>
                            <td colspan = '33' style = 'vertical-position:middle;border:0px;'>
                                <div class = 'TituloTablasResumen  BorderTop'>
                                    <span class = 'HidenInformation GruposIds'>{{$g->Hash}}</span>
                                    <table class = '' width = '100%'>
                                        <tr>
                                            @if( $Datos[0]->Estado_Presupuesto == 'En Construcción' )
                                                <td class='BlackFont subtitulos_principales'   nowrap style = 'color:white;border:0px;background-color: #0684A5;'>
                                                    <img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' title="Eliminar"/> 
                                                </td>
                                            @endif
                                            
                                            <td  class='BlackFont CenterText subtitulos_principales' style = 'color:white;border:0px;background-color: #0684A5;'nowrap>
                                                <img src ='../images/editar.png' class = 'OptionIcon' onclick = 'EditarGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' title="Editar" data-toggle='modal' data-target='#ModalEdit'/> 
                                            </td>
                                            <td  class='BlackFont CenterText subtitulos_principales' style = 'color:white;border:0px;background-color: #0684A5;'nowrap>
                                                <img src ='../images/AGREGAR_ICONO.png' class = 'OptionIcon' onclick = 'CrearItemGrupo({{$Datos[0]->Hash}},{{$g->Hash}})' title="Agregar Item"/> 
                                            </td>
                                            <td  class='BlackFont CenterText subtitulos_principales' style = 'color:white;border:0px;background-color: #0684A5;'nowrap>
                                                <img src ='../images/datos_reordenar.png' class = 'OptionIcon' onclick = "ReorganizarItemsGruposPpto({{$Datos[0]->url}})" title="Reorganizar Items"data-toggle="modal" data-target="#ModalEdit"/> 
                                            </td>
                                            

                                            <td width='95%' class='CenterText subtitulos_principales NameGrup{{$g->Hash}}' style ='border:0px;background-color: #0684A5;vertical-align:middle;font-size:15px;color:white;text-align:left;' nowrap >{{$g->Grupo}}</td>
                                            
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th colspan = '21' class = 'PptoTituloInterno'>INTERNO</th>
                            <td></td>
                            <th colspan = '5' class = 'PptoTituloExterno'>EXTERNO</th>
                            <td></td>
                            <th colspan = '2' class = 'PptoTituloInterno'>COMISIÓN</th>
                            <td></td>
                            <th colspan = '2' class = 'PptoTituloInterno'>RENTABILIDAD PARCIAL</th>
                        </tr>
                        <tr>
                            <td class = 'PptoSubTituloInterno' nowrap>No.</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Eliminar</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Sel.</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Anticipo</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Comisión Cliente</td>
                            <td class = 'PptoSubTituloInterno' nowrap>No Comisional</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OP</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OC</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Asociados</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:200px;'>Item</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Descripción</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Proveedor</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Días</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Cantidad</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:200px;'>Valor Unitario</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>SubTotal</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Asociados</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Anticipo</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Impuesto</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Volumen</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total Interno</td>
                            <td></td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Descripción</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Valor Unitario</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>SubTotal</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Impuesto</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Total Externo</td>
                            <td></td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Comisión Item</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Comisión</td>
                            <td></td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Porcentaje</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total</td>
                        </tr>
                        <div class = 'ContenedorCamposReOrg ' style = 'width:100%;'>
                            <tbody class = 'TBody ContenidoGrupo{{$g->Hash}}'>
                                @foreach( $g->ItemsGrupo as $Item )
                                    <tr class = 'Items ItemGrupo{{$g->Hash}} ItemI{{$Item->Hash}} Cursor_AS '>
                                        
                                            <td class = 'TablaReportes_Cuerpo_Center Presupuesto_Cuerpo ContadorItems CenterText OrdenItemGrupoPpto{{$g->Hash}} ItemOrden{{$Item->Hash}} '>1</td>
                                            <td class = 'Presupuesto_Cuerpo CenterText'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1 )
                                                    
                                                @else
                                                    <img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemGrupoPpto({{$Datos[0]->Hash}},{{$Item->Hash}})' />
                                                @endif
                                                
                                            </td>
                                            <td class = 'OrdenItemGrupoPptoId IdsItesm{{$g->Hash}}' style = 'display:none;'>{{$Item->Hash}}</td>
                                            <td class = 'TablaReportes_Cuerpo Presupuesto_Cuerpo'></td>
                                            <td class = 'TablaReportes_Cuerpo Presupuesto_Cuerpo'>
                                                @if( $Item->Anticipo == 1 )
                                                <table width ='100%'>
                                                    @foreach( $Item->DataAnticipos as $xt )
                                                    <tr>
                                                        <td class ='CenterText'><a target="_blank" href="../288ffad72e6d2756a80a65fa98f3b4b5/{{$xt->Hash}}">{{ $xt->Anticipo }}</a></td>
                                                    </tr>
                                                    @endforeach
                                                </table>
                                                @endif
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo CenterText ComisionCliente{{$Item->Hash}}'>
                                                <span class = 'HidenInformation ComisionableClienteItem{{$Item->Hash}}'>{{$Item->VC}}</span>
                                                
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    @if( $Item->VC == 1 )
                                                        <img src = '../images/activo.png' class = 'OptionIcon' />
                                                    @else
                                                        <img src = '../images/inactivo.png' class = 'OptionIcon'  />
                                                    @endif
                                                @else
                                                    @if( $Item->VC == 1 )
                                                        <img src = '../images/activo.png' onclick = 'InhabilitarComisionClienteItem({{$Item->Hash}})'class = 'OptionIcon' />
                                                    @else
                                                        <img src = '../images/inactivo.png' onclick = 'InhabilitarComisionClienteItem({{$Item->Hash}})'class = 'OptionIcon' />
                                                    @endif
                                                @endif
                                                <span class = 'HidenInformation VC VC{{$Item->Hash}}'>{{$Item->VC}}</span>
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo CenterText'>
                                                <img src = '../images/inactivo.png' class = 'OptionIcon' />
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo' nowrap>
                                                @if($Item->IdOp != '')
                                                    <a target="_blank" href="../13889e416790c50f0410449d8b5eaf3c/{{$Item->HashOp}}">OP # {{$Item->IdOp}}</a>
                                                @endif
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo CenterText' nowrap>
                                                @if($Item->IdOc != '')
                                                    <a target="_blank" href="../13889e416790c50f0410449d8b5eaf3c43/{{$Item->HashOc}}">OC # {{$Item->IdOc}}</a>
                                                @endif
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo CenterText'><span class = 'Cursor NumAsociados{{$Item->Hash}}' onclick = 'AsociadosItem({{$Item->Hash}})'>{{$Item->Asociados}}</span></td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'text' disabled class = 'form-control PptoCampos' id = 'NombreItem{{$Item->Hash}}' name = 'NombreItem{{$Item->Hash}}[]' value = '{{$Item->Item}}'/>
                                                @else
                                                    <input autocomplete = 'off' type = 'text' class = 'form-control PptoCampos' id = 'NombreItem{{$Item->Hash}}' name = 'NombreItem{{$Item->Hash}}[]' value = '{{$Item->Item}}'/>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <textarea disabled class = 'form-control PptoCampos' id = 'DescripcionItem{{$Item->Hash}}' name = 'DescripcionItem{{$Item->Hash}}[]' style = 'width:300px;'>{{$Item->Descripcion_Interna}}</textarea>
                                                @else
                                                    <textarea class = 'form-control PptoCampos' id = 'DescripcionItem{{$Item->Hash}}' name = 'DescripcionItem{{$Item->Hash}}[]' style = 'width:300px;'>{{$Item->Descripcion_Interna}}</textarea>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <select class = 'form-control PptoCampos' disabled id = 'ProveedorItem{{$Item->Hash}}' name = 'ProveedorItem{{$Item->Hash}}[]' >
                                                        <option VALUE = "0" selected>Seleccione</option>
                                                        @foreach( $Datos[0]->Proveedores as $pp )
                                                            @if( $pp->Hash == $Item->IdProveedor )
                                                                <option value = "{{$pp->Hash}}" selected>{{$pp->NombreComercial}}</option>
                                                            @else
                                                                <option value = "{{$pp->Hash}}" >{{$pp->NombreComercial}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @else
                                                    <select class = 'form-control PptoCampos' id = 'ProveedorItem{{$Item->Hash}}' name = 'ProveedorItem{{$Item->Hash}}[]' >
                                                        <option VALUE = "0" selected>Seleccione</option>
                                                        @foreach( $Datos[0]->Proveedores as $pp )
                                                            @if( $pp->Hash == $Item->IdProveedor )
                                                                <option value = "{{$pp->Hash}}" selected>{{$pp->NombreComercial}}</option>
                                                            @else
                                                                <option value = "{{$pp->Hash}}" >{{$pp->NombreComercial}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo TablaReportes_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'number' disabled onkeyup = 'CalcularAllPpto({{$Datos[0]->Id}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control PptoCamposSmall' step='0.1' id = 'DiasItem{{$Item->Hash}}' value = '{{$Item->Dias}}' name = 'DiasItem{{$Item->Hash}}[]' />
                                                @else
                                                    <input autocomplete = 'off' type = 'number' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control PptoCamposSmall' step='0.1' id = 'DiasItem{{$Item->Hash}}' value = '{{$Item->Dias}}' name = 'DiasItem{{$Item->Hash}}[]' />
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularAllPpto({{$Datos[0]->Id}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control PptoCamposSmall' disabled step='0.1' id = 'CantidadItem{{$Item->Hash}}' value = '{{$Item->Unidad}}' name = 'CantidadItem{{$Item->Hash}}[]' />
                                                @else
                                                    <input autocomplete = 'off' type = 'number'  oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control PptoCamposSmall' step='0.1' id = 'CantidadItem{{$Item->Hash}}' value = '{{$Item->Unidad}}' name = 'CantidadItem{{$Item->Hash}}[]' />
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo '>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'text' disabled name = 'ValorUnitarioInterno{{$Item->Hash}}[]' id = 'ValorUnitarioInterno{{$Item->Hash}}' value = '{{$Item->ValorUnitario}}'onkeyup = "FormatCampoNum('ValorUnitarioInterno{{$Item->Hash}}','ValorUnitarioInterno{{$Item->Hash}}_real');CalcularAllPpto({{$Datos[0]->Id}});" class = 'PptoCamposSmall ValorUnitarioInterno{{$Item->Hash}} form-control' required />
                                                @else
                                                    <input autocomplete = 'off' type = 'text' name = 'ValorUnitarioInterno{{$Item->Hash}}[]' id = 'ValorUnitarioInterno{{$Item->Hash}}' value = '{{$Item->ValorUnitario}}'onkeyup = "FormatCampoNum('ValorUnitarioInterno{{$Item->Hash}}','ValorUnitarioInterno{{$Item->Hash}}_real');CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})" class = 'PptoCamposSmall ValorUnitarioInterno{{$Item->Hash}} form-control' required />
                                                @endif
                                                
                                                <span style = 'display:none;' class = 'ValorUnitarioInterno{{$Item->Hash}}_real' id = 'ValorUnitarioInterno{{$Item->Hash}}_real'>{{$Item->ValorUnitario}}</span>
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo ValorUnitarioItemInterno{{$Item->Hash}}' style = 'width:200px'>
                                                $ 0
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo ValorAsociados{{$Item->Hash}}' style = 'width:200px'>
                                                $ 0
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo ValorAnticipos{{$Item->Hash}}' style = 'width:200px'>
                                                $ 0
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <select class = 'form-control PptoCampos' disabled id = 'ImpuestoItem{{$Item->Hash}}' name = 'ImpuestoItem{{$Item->Hash}}[]' value = '{{$Item->IdImpuesto}}' >
                                                        <option value = '0-0' selected >Sin Impuesto</option>
                                                        @foreach( $Datos[0]->ImpuestosInterno as $Impuesto )
                                                            @if( $Item->IdImpuesto == $Impuesto->Hash )
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}' selected >{{$Impuesto->Tarifa}}</option>
                                                            @else
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}'  >{{$Impuesto->Tarifa}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @else
                                                    <select class = 'form-control PptoCampos' id = 'ImpuestoItem{{$Item->Hash}}' name = 'ImpuestoItem{{$Item->Hash}}[]' value = '{{$Item->IdImpuesto}}' >
                                                        <option value = '0-0' selected >Sin Impuesto</option>
                                                        @foreach( $Datos[0]->ImpuestosInterno as $Impuesto )
                                                            @if( $Item->IdImpuesto == $Impuesto->Hash )
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}' selected >{{$Impuesto->Tarifa}}</option>
                                                            @else
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}'  >{{$Impuesto->Tarifa}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'  class = 'form-control PptoCamposSmall' step='0.1' id = 'VolumenItem{{$Item->Hash}}' disabled value = '{{$Item->Volumen}}' name = 'VolumenItem{{$Item->Hash}}[]' />
                                                @else
                                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'  class = 'form-control PptoCamposSmall' step='0.1' id = 'VolumenItem{{$Item->Hash}}' value = '{{$Item->Volumen}}' name = 'VolumenItem{{$Item->Hash}}[]' />
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo TotalInternoItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                            <td></td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <textarea class = 'form-control PptoCampos' id = 'DescripcionItemExterno{{$Item->Hash}}' name = 'DescripcionItemExterno{{$Item->Hash}}[]' style = 'width:300px;' disabled >{{$Item->Descripcion_Externa}}</textarea>
                                                @else
                                                    <textarea class = 'form-control PptoCampos' id = 'DescripcionItemExterno{{$Item->Hash}}' name = 'DescripcionItemExterno{{$Item->Hash}}[]' style = 'width:300px;'>{{$Item->Descripcion_Externa}}</textarea>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo '>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' type = 'text' name = 'ValorUnitarioExterno{{$Item->Hash}}[]' id = 'ValorUnitarioExterno{{$Item->Hash}}' value = '{{$Item->ValorUnitarioCliente}}' onkeyup = "FormatCampoNum('ValorUnitarioExterno{{$Item->Hash}}','ValorUnitarioExterno{{$Item->Hash}}_real');CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}}),CalcularAllPpto({{$Datos[0]->Id}});" disabled class = 'PptoCamposSmall ValorUnitarioExterno{{$Item->Hash}} form-control' required />
                                                @else
                                                    <input autocomplete = 'off' type = 'text' name = 'ValorUnitarioExterno{{$Item->Hash}}[]' id = 'ValorUnitarioExterno{{$Item->Hash}}' value = '{{$Item->ValorUnitarioCliente}}' onkeyup = "FormatCampoNum('ValorUnitarioExterno{{$Item->Hash}}','ValorUnitarioExterno{{$Item->Hash}}_real');CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}});CalcularAllPpto({{$Datos[0]->Id}});" class = 'PptoCamposSmall ValorUnitarioExterno{{$Item->Hash}} form-control' required />
                                                @endif
                                                
                                                <span style = 'display:none;' class = 'ValorUnitarioExterno{{$Item->Hash}}_real' id = 'ValorUnitarioExterno{{$Item->Hash}}_real'>{{$Item->ValorUnitarioCliente}}</span>
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo SubTotalExternoItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <select disabled class = 'form-control PptoCampos' id = 'ImpuestoExternoItem{{$Item->Hash}}' name = 'ImpuestoExternoItem{{$Item->Hash}}[]' onchange ='CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'>
                                                        <option value = '0-0' selected >Sin Impuesto</option>
                                                        @foreach( $Datos[0]->ImpuestosExterno as $Impuesto )
                                                            @if( $Item->IdImpuestoExterno == $Impuesto->Hash )
                                                            <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}' selected >{{$Impuesto->Tarifa}}</option>
                                                            @else
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}'  >{{$Impuesto->Tarifa}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @else
                                                    <select class = 'form-control PptoCampos' id = 'ImpuestoExternoItem{{$Item->Hash}}' name = 'ImpuestoExternoItem{{$Item->Hash}}[]' onchange ='CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'>
                                                        <option value = '0-0' selected >Sin Impuesto</option>
                                                        @foreach( $Datos[0]->ImpuestosExterno as $Impuesto )
                                                            @if( $Item->IdImpuestoExterno == $Impuesto->Hash )
                                                            <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}' selected >{{$Impuesto->Tarifa}}</option>
                                                            @else
                                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}'  >{{$Impuesto->Tarifa}}</option>
                                                            @endif
                                                        @endforeach
                                                    </select>
                                                @endif
                                                
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo TotalExternoItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                            <td></td>
                                            <td class = 'Presupuesto_Cuerpo'>
                                                <span class = 'HidenInformation HashIdComision'>{{$Item->Hash}}</span>
                                                @if( $Item->IdOp != '' || $Item->IdOc != '' || $Item->Anticipo == 1)
                                                    <input autocomplete = 'off' disabled type = 'number' class = 'ComisionManual form-control PptoCamposSmall' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'   step='0.1' id = 'ComisionItem{{$Item->Hash}}' value= '{{$Item->PorcentajeComision}}'name = 'ComisionItem{{$Item->Hash}}[]' />
                                                @else
                                                    <input autocomplete = 'off' type = 'number' class = 'ComisionManual form-control PptoCamposSmall' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'   step='0.1' id = 'ComisionItem{{$Item->Hash}}' value= '{{$Item->PorcentajeComision}}'name = 'ComisionItem{{$Item->Hash}}[]' />
                                                @endif
                                                
                                            </td>
                                            <td class = 'ValorComisionManual Presupuesto_Cuerpo ValorComisionItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                            <td></td>
                                            <td class = 'Presupuesto_Cuerpo PorcentajeRentabilidadItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                            <td class = 'Presupuesto_Cuerpo RentabilidadItem{{$Item->Hash}}'>
                                                $ 0
                                            </td>
                                        
                                    
                                </tr>
                                <tr class = 'HidenInformation AsociadosItem AsociadosItem{{$Item->Hash}}'></tr>
                                @endforeach
                            </tbody>
                        </div>
                        <tr>
                            <th colspan = '15' class = 'PptoTituloInterno_Bottom'>Total</th>
                            <th class = 'PptoSubTituloInterno SubtotalGrupo{{$g->Hash}}' nowrap></th>
                            <th class = 'PptoSubTituloInterno TotalAsociadosGrupo{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th nowrap></th>
                            <th class = 'PptoSubTituloInterno TotalInterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th  nowrap></th>
                            <th class = 'PptoSubTituloExterno SubTotalExterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <th class = 'PptoSubTituloExterno TotalExterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th class = 'PptoSubTituloInterno ValorComisionesTotal{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th class = 'PptoSubTituloInterno RentabilidadParcialTotal{{$g->Hash}}' nowrap></th>
                        </tr>

                    </table>
                    <br>

                    @endforeach
                @elseif( $Datos[0]->VersionCerrada == 1 )
                    @foreach($Datos[0]->Grupos as $g)
                    <table class = 'Ppto_TablaContenidoGrupo Grupo{{$g->Hash}}' style = 'width:100%;'>
                        <tr>
                            <td colspan = '33'>
                                <div class = 'cabecera_th_dark  BorderTop'>
                                    <span class = 'HidenInformation GruposIds'>{{$g->Hash}}</span>
                                    <table class='table' width = '100%'>
                                        <tr>
                                            <td width='90%' class='BlackFont CenterText NameGrup{{$g->Hash}}' style ='vertical-align:middle;font-size:15px;' nowrap >{{$g->Grupo}}</td>
                                            <td class='text-left' nowrap>
                                                <a href='#' class='PAR_ContentTRACLIENTEOT' onclick='ContentList("Grupo{{$g->Hash}}")'><i class=' Cursor fas fa-angle-double-up'></i></a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th colspan = '21' class = 'PptoTituloInterno'>INTERNO</th>
                            <td></td>
                            <th colspan = '5' class = 'PptoTituloExterno'>EXTERNO</th>
                            <td></td>
                            <th colspan = '2' class = 'PptoTituloInterno'>COMISIÓN</th>
                            <td></td>
                            <th colspan = '2' class = 'PptoTituloInterno'>RENTABILIDAD PARCIAL</th>
                        </tr>
                        <tr>
                            <td class = 'PptoSubTituloInterno' nowrap>No.</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Eliminar</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Sel.</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Anticipo</td>
                            <td class = 'PptoSubTituloInterno' nowrap>Comisión Cliente</td>
                            <td class = 'PptoSubTituloInterno' nowrap>No Comisional</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OP</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>OC</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Asociados</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:200px;'>Item</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Descripción</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Proveedor</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Días</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Cantidad</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:200px;'>Valor Unitario</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>SubTotal</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Asociados</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Anticipo</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:300px;'>Impuesto</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Volumen</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total Interno</td>
                            <td></td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Descripción</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Valor Unitario</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>SubTotal</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:300px;'>Impuesto</td>
                            <td class = 'PptoSubTituloExterno' nowrap style = 'width:150px;'>Total Externo</td>
                            <td></td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Comisión Item</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Comisión</td>
                            <td></td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:100px;'>Porcentaje</td>
                            <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Total</td>
                        </tr>
                        <div class = 'ContenedorCamposReOrg ' style = 'width:100%;'>
                            <tbody class = 'TBody ContenidoGrupo{{$g->Hash}}'>
                                @foreach( $g->ItemsGrupo as $Item )
                                    <tr class = 'Items ItemGrupo{{$g->Hash}} ItemI{{$Item->Hash}} Cursor_AS '>
                                    <td class = 'Presupuesto_Cuerpo CenterText OrdenItemGrupoPpto{{$g->Hash}} ItemOrden{{$Item->Hash}}'>1</td>
                                    <td class = 'Presupuesto_Cuerpo CenterText'>
                                        
                                    </td>
                                    <td class = 'OrdenItemGrupoPptoId IdsItesm{{$g->Hash}}' style = 'display:none;'>{{$Item->Hash}}</td>
                                    <td class = 'Presupuesto_Cuerpo'></td>
                                    <td class = 'Presupuesto_Cuerpo'></td>
                                    <td class = 'Presupuesto_Cuerpo CenterText ComisionCliente{{$Item->Hash}}'>
                                        <span class = 'HidenInformation ComisionableClienteItem{{$Item->Hash}}'>{{$Item->VC}}</span>
                                        @if( $Item->VC == 1 )
                                            <img src = '../images/activo.png' class = 'OptionIcon' />
                                        @else
                                            <img src = '../images/inactivo.png' class = 'OptionIcon' />
                                        @endif
                                        <span class = 'HidenInformation VC VC{{$Item->Hash}}'>{{$Item->VC}}</span>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo CenterText'>
                                        <img src = '../images/inactivo.png' class = 'OptionIcon' />
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'></td>
                                    <td class = 'Presupuesto_Cuerpo'>OC</td>
                                    <td class = 'Presupuesto_Cuerpo'>ASOC</td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <input autocomplete = 'off' type = 'text' class = 'form-control PptoCampos' disabled = "disabled" id = 'NombreItem{{$Item->Hash}}' name = 'NombreItem{{$Item->Hash}}[]' value = '{{$Item->Item}}'/>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <textarea disabled = "disabled"  class = 'form-control PptoCampos' id = 'DescripcionItem{{$Item->Hash}}' name = 'DescripcionItem{{$Item->Hash}}[]' style = 'width:300px;'>{{$Item->Descripcion_Interna}}</textarea>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <select disabled = "disabled"  class = 'form-control PptoCampos' id = 'ProveedorItem{{$Item->Hash}}' name = 'ProveedorItem{{$Item->Hash}}[]' >
                                            <option VALUE = "0" selected>Seleccione</option>
                                            @foreach( $Datos[0]->Proveedores as $pp )
                                                @if( $pp->Hash == $Item->IdProveedor )
                                                    <option value = "{{$pp->Hash}}" selected>{{$pp->NombreComercial}}</option>
                                                @else
                                                    <option value = "{{$pp->Hash}}" >{{$pp->NombreComercial}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <input disabled = "disabled"  autocomplete = 'off' type = 'number' class = 'form-control PptoCamposSmall' step='0.1' id = 'DiasItem{{$Item->Hash}}' value = '{{$Item->Dias}}' name = 'DiasItem{{$Item->Hash}}[]' />
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <input disabled = "disabled" autocomplete = 'off' type = 'number' class = 'form-control PptoCamposSmall' step='0.1' id = 'CantidadItem{{$Item->Hash}}' value = '{{$Item->Unidad}}' name = 'CantidadItem{{$Item->Hash}}[]' />
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo '>
                                        <input disabled = "disabled"  autocomplete = 'off' type = 'text' name = 'ValorUnitarioInterno{{$Item->Hash}}[]' id = 'ValorUnitarioInterno{{$Item->Hash}}' value = '{{$Item->ValorUnitario}}' class = 'PptoCamposSmall ValorUnitarioInterno{{$Item->Hash}} form-control' required />
                                        <span style = 'display:none;' class = 'ValorUnitarioInterno{{$Item->Hash}}_real' id = 'ValorUnitarioInterno{{$Item->Hash}}_real'>{{$Item->ValorUnitario}}</span>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo ValorUnitarioItemInterno{{$Item->Hash}}' style = 'width:200px'>
                                        $ 0
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo ValorAsociados{{$Item->Hash}}' style = 'width:200px'>
                                        $ 0
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo ValorAnticipos{{$Item->Hash}}' style = 'width:200px'>
                                        $ 0
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <select disabled = "disabled"  class = 'form-control PptoCampos' id = 'ImpuestoItem{{$Item->Hash}}' name = 'ImpuestoItem{{$Item->Hash}}[]' value = '{{$Item->IdImpuesto}}' >
                                            <option value = '0-0' selected >Sin Impuesto</option>
                                            @foreach( $Datos[0]->ImpuestosInterno as $Impuesto )
                                                @if( $Item->IdImpuesto == $Impuesto->Hash )
                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}' selected >{{$Impuesto->Tarifa}}</option>
                                                @else
                                                    <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}'  >{{$Impuesto->Tarifa}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <input disabled = "disabled" autocomplete = 'off' type = 'number'  class = 'form-control PptoCamposSmall' step='0.1' id = 'VolumenItem{{$Item->Hash}}' value = '{{$Item->Volumen}}' name = 'VolumenItem{{$Item->Hash}}[]' />
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo TotalInternoItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                    <td></td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <textarea disabled = "disabled" class = 'form-control PptoCampos' id = 'DescripcionItemExterno{{$Item->Hash}}' name = 'DescripcionItemExterno{{$Item->Hash}}[]' style = 'width:300px;'>{{$Item->Descripcion_Externa}}</textarea>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo '>
                                        <input disabled = "disabled"  autocomplete = 'off' type = 'text' name = 'ValorUnitarioExterno{{$Item->Hash}}[]' id = 'ValorUnitarioExterno{{$Item->Hash}}' value = '{{$Item->ValorUnitarioCliente}}' class = 'PptoCamposSmall ValorUnitarioExterno{{$Item->Hash}} form-control' required />
                                        <span style = 'display:none;' class = 'ValorUnitarioExterno{{$Item->Hash}}_real' id = 'ValorUnitarioExterno{{$Item->Hash}}_real'>{{$Item->ValorUnitarioCliente}}</span>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo SubTotalExternoItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <select disabled = "disabled"  class = 'form-control PptoCampos' id = 'ImpuestoExternoItem{{$Item->Hash}}' name = 'ImpuestoExternoItem{{$Item->Hash}}[]' >
                                            <option value = '0-0' selected >Sin Impuesto</option>
                                            @foreach( $Datos[0]->ImpuestosExterno as $Impuesto )
                                                @if( $Item->IdImpuestoExterno == $Impuesto->Hash )
                                                <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}' selected >{{$Impuesto->Tarifa}}</option>
                                                @else
                                                    <option value = '{{$Impuesto->Hash}}-{{$Impuesto->Valor}}-{{$Impuesto->Ppto}}'  >{{$Impuesto->Tarifa}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo TotalExternoItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                    <td></td>
                                    <td class = 'Presupuesto_Cuerpo'>
                                        <span class = 'HidenInformation HashIdComision'>{{$Item->Hash}}</span>
                                        <input disabled = "disabled"  autocomplete = 'off' type = 'number' class = 'ComisionManual form-control PptoCamposSmall'    step='0.1' id = 'ComisionItem{{$Item->Hash}}' value= '{{$Item->PorcentajeComision}}'name = 'ComisionItem{{$Item->Hash}}[]' />
                                    </td>
                                    <td class = 'ValorComisionManual Presupuesto_Cuerpo ValorComisionItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                    <td></td>
                                    <td class = 'Presupuesto_Cuerpo PorcentajeRentabilidadItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                    <td class = 'Presupuesto_Cuerpo RentabilidadItem{{$Item->Hash}}'>
                                        $ 0
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </div>
                        <tr>
                            <th colspan = '15' class = 'PptoTituloInterno_Bottom'>Total</th>
                            <th class = 'PptoSubTituloInterno SubtotalGrupo{{$g->Hash}}' nowrap></th>
                            <th class = 'PptoSubTituloInterno TotalAsociadosGrupo{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th nowrap></th>
                            <th class = 'PptoSubTituloInterno TotalInterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th  nowrap></th>
                            <th class = 'PptoSubTituloExterno SubTotalExterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <th class = 'PptoSubTituloExterno TotalExterno{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th class = 'PptoSubTituloInterno ValorComisionesTotal{{$g->Hash}}' nowrap></th>
                            <td></td>
                            <td></td>
                            <th class = 'PptoSubTituloInterno RentabilidadParcialTotal{{$g->Hash}}' nowrap></th>
                        </tr>

                    </table>
                    <br>

                    @endforeach
                @endif
            </div>
        </div>
    </div>
<hr>

</div>


<span class = 'HidenInformation ComSon'>{{$Datos[0]->Porcentaje}}</span>
<span class = 'HidenInformation TComSon'>{{$Datos[0]->TipoRentabilidad}}</span>

<span class = 'HidenInformation Imprevistos'>{{$Datos[0]->Imprevistos}}</span>
<span class = 'HidenInformation GastosAdministrativos'>{{$Datos[0]->GastosAdministrativos}}</span>
<span class = 'HidenInformation VersionInterna'>{{$Datos[0]->VersionInterna}}</span>
<span class = 'HidenInformation VersionCliente'>{{$Datos[0]->VersionCliente}}</span>

<div class = 'HidenInformation DivImpuestosComision'>
    @foreach( $Datos[0]->ImpuestosComision as $Impuestos)
    <span class = 'ImpuestosComision'>
        <span >{{$Impuestos->Tarifa}}</span>
        <span >{{$Impuestos->Valor}}</span>
        <span >{{$Impuestos->Tipo}}</span>
    </span>
    @endforeach
</div>
<div class = 'HidenInformation DivImpuestosResumen'>
    @foreach( $Datos[0]->ImpuestosResumen as $Impuestos)
    <span class = 'ImpuestosResumen'>
        <span >{{$Impuestos->Tarifa}}</span>
        <span >{{$Impuestos->Valor}}</span>
        <span >{{$Impuestos->Tipo}}</span>
    </span>
    @endforeach
</div>

<span class = 'HidenInformation ImpuestosAdicionales'>{{$Datos[0]->ImpuestoAdicional}}</span>
<span class = 'HidenInformation Factoring'>{{$Datos[0]->Factoring}}</span>
<span class = 'HidenInformation IntBancarios'>{{$Datos[0]->IntBancarios}}</span>
<span class = 'HidenInformation IntTerceros'>{{$Datos[0]->IntTerceros}}</span>
<span class = 'HidenInformation Cprov'>{{$Datos[0]->NumProveedores}}</span>
<span class = 'HidenInformation HasingPpto'>{{$Datos[0]->Hash}}</span>

</DIV>
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Produccion/PptoDetalle.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<script>
    $(document).ready(function () {
        $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
       $(".FormatNumbers").each(function(){
           $(this).text( formatNumber.new( $(this).text() ));
       })

       $(".TModuloReversa").text("PRESUPUESTOS")
       $(".TSubmodulo").text(" PRESUSUPUESTOS # " + $(".HashP").text())
       $(".TiHeader").hide()
       $(".TiHeader_Internos").show("fadeIn")
       $(".RutaInterna").attr("href",UrlUniversal+"1c605c008b2322ae851b4a02dfcf38b6")
    });
</script> 
@endsection
