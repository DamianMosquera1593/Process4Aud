@extends('layouts.inicio_process')

@section('content')
<?php echo '<script type="text/javascript" src="'.url("/").'/js/Produccion/PptoDetalle.js?v='.date("Y-m-d H:i:s").'"></script>';?>

<div class="m-b-md flex-center BlackFont TitleSection" style = 'margin-bottom: 15px;'>PRESUPUESTO # {{$Datos[0]->Id}}</div>

<span class = 'HidenInformation HashP'>{{$Datos[0]->Id}}</span>

<div class="m-b-md flex-center BlackFont" style = 'margin-bottom: 12px;' >
    <span class = 'CenterText'>{{$Datos[0]->Referencia}}</span>
</div>
<div class = 'ContentPanel'>
    <div class = 'form-row'>
        <div class = 'col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>Estado:</label>
            <div class='ContenidoCampo'>{{$Datos[0]->Estado_Presupuesto}}</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class = 'ContenidoItems col-form-label ' >$ Rent. Bruta</label>
            <div class = 'ContenidoCampo Val_RentabilidadBrutaGeneral'>$   0</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class = 'ContenidoItems col-form-label ' >% Rent. Bruta</label>
            <div class = 'ContenidoCampo Por_RentabilidadBrutaGeneral CenterText'>0   %</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class = 'ContenidoItems col-form-label ' >$ Rent. Bruta con Comisión</label>
            <div class = 'ContenidoCampo Val_RentabilidadBrutaGeneralCom'>$    0</div>
        </div>
    </div>
    <div class = 'form-row '>
        <div class='col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>% Rent. Bruta con Comisión</label>
            <div class = 'ContenidoCampo Por_RentabilidadBrutaGeneralCom CenterText'>0    %</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>$ Rent. Neta</label>
            <div class = 'ContenidoCampo RentabilidadBrutaGeneral'>0</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>% Rent. Neta</label>
            <div class = 'ContenidoCampo RentabilidadBrutaGeneral'>0</div>
        </div>
        <div class='col-sm-3 my-2'>
            <label class='ContenidoItems col-form-label '>% Comisión</label>
            <div class = 'ContenidoCampo RentabilidadBrutaGeneral'>0</div>
        </div>
    </div>
<hr>
    <div class = 'table'>
        {{ csrf_field() }}
        @if( $Datos[0]->PRODUCCION_PPTOS_GRUPO_CREAR == 1 )
            <img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
            <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearGrupoPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"> Crear Grupo </span>
        @endif

        <img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = "ReorganizarGruposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"/>
        <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "ReorganizarGruposPpto({{$Datos[0]->url}})" data-toggle="modal" data-target="#ModalEdit"> Organizar Grupos </span>

        <img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = "GuardarDatos({{$Datos[0]->url}})" />
        <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "GuardarDatos({{$Datos[0]->url}})" > Guardar</span>
    </div>
    <div class="ContenedorMenu" style = 'border:0px;overflo:scroll;'>
        <div class = 'ContenedorOptionDiv' >
            
            <div class = 'ContenedorDataPpto' style = 'width:100%;'>
                @foreach($Datos[0]->Grupos as $g)
                <table class = 'Ppto_TablaContenidoGrupo Grupo{{$g->Hash}}' >
                    <tr>
                        <td colspan = '33'>
                            <div class = 'panel-heading alert-primary BorderTop'>
                                <span class = 'HidenInformation GruposIds'>{{$g->Hash}}</span>
                                <table class='table' width = '100%'>
                                    <tr>
                                        <td width='2%' class='BlackFont CenterText'>
                                            <img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' /> Eliminar
                                        </td>
                                        <td width='2%' class='BlackFont CenterText'>
                                            <img src ='../images/editar.png' class = 'OptionIcon' onclick = 'EditarGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'  data-toggle='modal' data-target='#ModalEdit'/> Editar
                                        </td>
                                        <td width='2%' class='BlackFont CenterText'>
                                            <img src ='../images/datos_additem.png' class = 'OptionIcon' onclick = 'CrearItemGrupo({{$Datos[0]->Hash}},{{$g->Hash}})' /> Agregar Item
                                        </td>
                                        <td width='90%' class='BlackFont CenterText NameGrup{{$g->Hash}}' style ='vertical-align:middle;font-size:15px;' >{{$g->Grupo}}</td>
                                        <td class='text-left'>
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
                        <td class = 'PptoSubTituloInterno' nowrap style = 'width:150px;'>Valor Unitario</td>
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
                                    <img src ='../images/datos_eliminar.png' class = 'OptionIcon' onclick = 'EliminarItemGrupoPpto({{$Datos[0]->Hash}},{{$Item->Hash}})' />
                                </td>
                                <td class = 'OrdenItemGrupoPptoId IdsItesm{{$g->Hash}}' style = 'display:none;'>{{$Item->Hash}}</td>
                                <td class = 'Presupuesto_Cuerpo'></td>
                                <td class = 'Presupuesto_Cuerpo'></td>
                                <td class = 'Presupuesto_Cuerpo CenterText ComisionCliente{{$Item->Hash}}'>
                                    <span class = 'HidenInformation ComisionableClienteItem{{$Item->Hash}}'>{{$Item->VC}}</span>
                                    @if( $Item->VC == 1 )
                                        <img src = '../images/activo.png' onclick = 'InhabilitarComisionClienteItem({{$Item->Hash}})'class = 'OptionIcon' />
                                    @else
                                        <img src = '../images/inactivo.png' onclick = 'InhabilitarComisionClienteItem({{$Item->Hash}})'class = 'OptionIcon' />
                                    @endif
                                    
                                </td>
                                <td class = 'Presupuesto_Cuerpo CenterText'>
                                    <img src = '../images/inactivo.png' class = 'OptionIcon' />
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>OP</td>
                                <td class = 'Presupuesto_Cuerpo'>OC</td>
                                <td class = 'Presupuesto_Cuerpo'>ASOC</td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <input autocomplete = 'off' type = 'text' class = 'form-control PptoCampos' id = 'NombreItem{{$Item->Hash}}' name = 'NombreItem{{$Item->Hash}}[]' value = '{{$Item->Item}}'/>
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <textarea class = 'form-control PptoCampos' id = 'DescripcionItem{{$Item->Hash}}' name = 'DescripcionItem{{$Item->Hash}}[]' style = 'width:100%;'>{{$Item->Descripcion_Interna}}</textarea>
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <select class = 'form-control' id = 'ProveedorItem{{$Item->Hash}}' name = 'ProveedorItem{{$Item->Hash}}[]' ></select>
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularAllPpto({{$Datos[0]->Id}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control' step='0.1' id = 'DiasItem{{$Item->Hash}}' value = '{{$Item->Dias}}' name = 'DiasItem{{$Item->Hash}}[]' />
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularAllPpto({{$Datos[0]->Id}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' class = 'form-control' step='0.1' id = 'CantidadItem{{$Item->Hash}}' value = '{{$Item->Unidad}}' name = 'CantidadItem{{$Item->Hash}}[]' />
                                </td>
                                <td class = 'Presupuesto_Cuerpo '>
                                    <input autocomplete = 'off' type = 'text' name = 'ValorUnitarioInterno{{$Item->Hash}}[]' id = 'ValorUnitarioInterno{{$Item->Hash}}' value = '{{$Item->ValorUnitario}}'onkeyup = "FormatCampoNum('ValorUnitarioInterno{{$Item->Hash}}','ValorUnitarioInterno{{$Item->Hash}}_real');CalcularAllPpto({{$Datos[0]->Id}});" class = 'ValorUnitarioInterno{{$Item->Hash}} form-control' required />
                                    <span style = 'display:none;' class = 'ValorUnitarioInterno{{$Item->Hash}}_real' id = 'ValorUnitarioInterno{{$Item->Hash}}_real'>{{$Item->ValorUnitario}}</span>
                                </td>
                                <td class = 'Presupuesto_Cuerpo ValorUnitarioItemInterno{{$Item->Hash}}'>
                                    $ 0
                                </td>
                                <td class = 'Presupuesto_Cuerpo ValorAsociados{{$Item->Hash}}'>
                                    $ 0
                                </td>
                                <td class = 'Presupuesto_Cuerpo ValorAnticipos{{$Item->Hash}}'>
                                    $ 0
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <select class = 'form-control' id = 'ImpuestoItem{{$Item->Hash}}' name = 'ImpuestoItem{{$Item->Hash}}[]' value = '{{$Item->IdImpuesto}}' >
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
                                    <input autocomplete = 'off' type = 'number' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'  class = 'form-control' step='0.1' id = 'VolumenItem{{$Item->Hash}}' value = '{{$Item->Volumen}}' name = 'VolumenItem{{$Item->Hash}}[]' />
                                </td>
                                <td class = 'Presupuesto_Cuerpo TotalInternoItem{{$Item->Hash}}'>
                                    $ 0
                                </td>
                                <td></td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <textarea class = 'form-control' id = 'DescripcionItemExterno{{$Item->Hash}}' name = 'DescripcionItemExterno{{$Item->Hash}}[]' >{{$Item->Descripcion_Externa}}</textarea>
                                </td>
                                <td class = 'Presupuesto_Cuerpo '>
                                    <input autocomplete = 'off' type = 'text' name = 'ValorUnitarioExterno{{$Item->Hash}}[]' id = 'ValorUnitarioExterno{{$Item->Hash}}' value = '{{$Item->ValorUnitarioCliente}}' onkeyup = "FormatCampoNum('ValorUnitarioExterno{{$Item->Hash}}','ValorUnitarioExterno{{$Item->Hash}}_real');CalcularAllPpto({{$Datos[0]->Id}});" class = 'ValorUnitarioExterno{{$Item->Hash}} form-control' required />
                                    <span style = 'display:none;' class = 'ValorUnitarioExterno{{$Item->Hash}}_real' id = 'ValorUnitarioExterno{{$Item->Hash}}_real'>{{$Item->ValorUnitarioCliente}}</span>
                                </td>
                                <td class = 'Presupuesto_Cuerpo SubTotalExternoItem{{$Item->Hash}}'>
                                    $ 0
                                </td>
                                <td class = 'Presupuesto_Cuerpo'>
                                    <select class = 'form-control' id = 'ImpuestoExternoItem{{$Item->Hash}}' name = 'ImpuestoExternoItem{{$Item->Hash}}[]' onchange ='CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'>
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
                                    <input autocomplete = 'off' type = 'number' class = 'form-control' onkeyup = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})' oninput = 'CalcularCostoGrupoPpto({{$Datos[0]->Hash}},{{$g->Hash}})'   step='0.1' id = 'ComisionItem{{$Item->Hash}}' value= '{{$Item->PorcentajeComision}}'name = 'ComisionItem{{$Item->Hash}}[]' />
                                </td>
                                <td class = 'Presupuesto_Cuerpo ValorComisionItem{{$Item->Hash}}'>
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
            </div>
        </div>
    </div>
<hr>
<div class = 'form-row'>
    
    <div class='col-sm-3 my-2'>
        <label class='ContenidoItems col-form-label '>% Rent. Bruta con Comisión</label>
        <div class = 'ContenidoCampo Por_RentabilidadBrutaGeneralCom CenterText'>0    %</div>
    </div>
</div>
</div>

<span class = 'HidenInformation ComSon'>{{$Datos[0]->Porcentaje}}</span>
<span class = 'HidenInformation TComSon'>{{$Datos[0]->TipoRentabilidad}}</span>
<script>
    $(document).ready(function () {
        //$(".ContentPanel").css({'overflow-y':'hidden'})
        var Alto = $( window ).height();
        var t = Alto*0.40;
        if( Alto > 630 ){
            $(".ContenedorOptionDiv").css({'height':t,'min-height':'180px','overflow':'scroll'})
        }else{
            $(".ContenedorOptionDiv").css({'height':'180px','min-height':'180px','overflow':'scroll'})
        }
        $(".FirstText ").css({'font-size':'13px'})
        $(".TituloPantalla").html("Presupuesto # "+ $(".HashP").text()+"<p></p>"+);
    });
</script>
@endsection
