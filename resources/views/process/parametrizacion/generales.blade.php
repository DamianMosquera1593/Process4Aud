@extends('layouts.inicio_process')

@section('content')

<div class ='DetalleOpcionesModulo' >
    @include('layouts.usuario')
    <hr>
    
    <br>
    @if( session("PAR_GENERALES_PAIS") === session("keyUser") )
        <div class ="ContenedorMenu">
            
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Países</p>
                {{ csrf_field() }}
                @if( session("PAR_GENERALES_PAIS_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearPais('{{route('661083fa443019e8c4b4f124efd030d6')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearPais('{{route('661083fa443019e8c4b4f124efd030d6')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo País</span>
                </div>
                @endif

                @if( session("PAR_GENERALES_PAIS_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Estado:</label>
                            <select class ='form-control' name = 'Pais_Estado' id = 'Pais_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Pais_TextBusqueda' name = 'Pais_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataPais()'/>
                        </div>
                    </div>
                    <div class = 'ContenedorDataTable'>
                        <table id = "TablePaises" class="tableNew dataTable">
                            <thead>
                                <tr>
                                    <th width = '20px'>No.</th>
                                    <th>Nombre</th>
                                    <th>Siglas Pais</th>
                                    <th>Moneda</th>
                                    <th>Siglas Moneda</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                @endif
            </div>
        </div>
        <br>
    @endif


    @if( session("PAR_GENERALES_DEPARTAMENTOS") === session("keyUser") )
        <div class ="ContenedorMenu">
            
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Departamentos</p>
                @if( session("PAR_GENERALES_DEPARTAMENTOS_CREAR") === session("keyUser") )
                    <div class = 'BarraIconos'>
                        <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearDepartamento('{{route('0541853095b833f105b84fabd75e744c')}}','{{route('82985c51efa493c23f929d6366c08cf8')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                        <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearDepartamento('{{route('0541853095b833f105b84fabd75e744c')}}','{{route('82985c51efa493c23f929d6366c08cf8')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Departamento</span>
                    </div>
                @endif

                @if( session("PAR_GENERALES_DEPARTAMENTOS_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Estado:</label>
                            <select class ='form-control' name = 'Depto_Estado' id = 'Depto_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Depto_TextBusqueda' name = 'Depto_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataDepartamentoPais()'/>
                        </div>
                    </div>
                    <table id = "TableDapartamentosPaises" class="tableNew dataTable">
                        <thead>
                            <tr>
                                <th width = '20px'>No.</th>
                                <th>País</th>
                                <th>Departamento</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>

                    </table>
                @endif
            </div>
        </div>
        <br>
    @endif

    @if( session("PAR_GENERALES_CIUDADES") === session("keyUser") )
        <div class ="ContenedorMenu">
            
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Ciudades</p>
                @if( session("PAR_GENERALES_CIUDADES_CREAR") === session("keyUser") )
                    <div class = 'BarraIconos'>
                        <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearCiudad('{{route('24f11382ba4e22b4a94bc1ac12c8acb4')}}','{{route('82985c51efa493c23f929d6366c08cf8')}}','{{route('42012568a3796a877ee1fdeb6406e0af')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                        <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearCiudad('{{route('24f11382ba4e22b4a94bc1ac12c8acb4')}}','{{route('82985c51efa493c23f929d6366c08cf8')}}','{{route('42012568a3796a877ee1fdeb6406e0af')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Ciudad</span>
                    </div>
                @endif
                @if( session("PAR_GENERALES_CIUDADES_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Estado:</label>
                            <select class ='form-control' name = 'Ciudad_Estado' id = 'Ciudad_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='IdTipoDoc'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Ciudad_TextBusqueda' name = 'Ciudad_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataCiudadDepartamentoPais()'/>
                        </div>
                    </div>
                    <table id = "TableCiudades" class="tableNew dataTable">
                        <thead>
                            <tr>
                                <th width = '20px'>No.</th>
                                <th>País</th>
                                <th>Departamento</th>
                                <th>Ciudad</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>

                    </table>
                @endif
            </div>
        </div>
        <br>
    @endif

    @if( session("PAR_GENERALES_SALARIO_MINIMO") === session("keyUser") )
        <div class ="ContenedorMenu">
            

            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Salario Mínimo</p>
                {{ csrf_field() }}
                @if( session("PAR_GENERALES_SALARIO_MINIMO_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearSalarioMinimo('{{route('64c545d346f6e3d192cd2516f9b92491')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSalarioMinimo('{{route('64c545d346f6e3d192cd2516f9b92491')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Salario Minimo</span>
                </div>
                @endif

                @if( session("PAR_GENERALES_SALARIO_MINIMO_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='Salario_Minimo_Estado'>Estado:</label>
                            <select class ='form-control' name = 'Pais_Estado' id = 'Salario_Minimo_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='Salario_Minimo_TextBusqueda'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Salario_Minimo_TextBusqueda' name = 'Salario_Minimo_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataSalarioMinimo()'/>
                        </div>
                    </div>
                    <div class = 'ContenedorDataTable'>
                        <table id = "TableSalarioMinimo" class="tableNew dataTable">
                            <thead>
                                <tr>
                                    <th width = '20px'>No.</th>
                                    <th>Año</th>
                                    <th>Salario</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                @endif
            </div>
        </div>
        <br>
    @endif

    @if( session("PAR_GENERALES_SALARIO_INTEGRAL") === session("keyUser") )
        <div class ="ContenedorMenu">
            

            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Salario Integral</p>
                {{ csrf_field() }}
                @if( session("PAR_GENERALES_SALARIO_INTEGRAL_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearSalarioIntegral('{{route('57b1c23d597b1de55f85b10833b2d45a')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearSalarioIntegral('{{route('57b1c23d597b1de55f85b10833b2d45a')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Salario Integral</span>
                </div>
                @endif

                @if( session("PAR_GENERALES_SALARIO_INTEGRAL_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='Salario_Integral_Estado'>Estado:</label>
                            <select class ='form-control' name = 'Pais_Estado' id = 'Salario_Integral_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='Salario_Integral_TextBusqueda'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Salario_Integral_TextBusqueda' name = 'Salario_Integral_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataSalarioIntegral()'/>
                        </div>
                    </div>
                    <div class = 'ContenedorDataTable'>
                        <table id = "TableSalarioIntegral" class="tableNew dataTable">
                            <thead>
                                <tr>
                                    <th width = '20px'>No.</th>
                                    <th>Año</th>
                                    <th>Salario</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                @endif
            </div>
        </div>
        <br>
    @endif

    @if( session("PAR_GENERALES_MONETIZACION_SENA") === session("keyUser") )
        <div class ="ContenedorMenu">
            

            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Monetización Sena</p>
                {{ csrf_field() }}
                @if( session("PAR_GENERALES_MONETIZACION_SENA_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearMonetizacionSena('{{route('77c2c6bcf33ba19d76cfa09d019410a8')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearMonetizacionSena('{{route('77c2c6bcf33ba19d76cfa09d019410a8')}}')" data-toggle="modal" data-target="#ModalEdit">Nueva Monetización Sena</span>
                </div>
                @endif

                @if( session("PAR_GENERALES_MONETIZACION_SENA_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='Monetizacion_Sena_Estado'>Estado:</label>
                            <select class ='form-control' name = 'Monetizacion_Sena_Estado' id = 'Monetizacion_Sena_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='Monetizacion_Sena_TextBusqueda'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Monetizacion_Sena_TextBusqueda' name = 'Monetizacion_Sena_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataMonetizacionSena()'/>
                        </div>
                    </div>
                    <div class = 'ContenedorDataTable'>
                        <table id = "TableMonetizacionSena" class="tableNew dataTable">
                            <thead>
                                <tr>
                                    <th width = '20px'>No.</th>
                                    <th>Año</th>
                                    <th>Monetización</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                @endif
            </div>
        </div>
        <br>
    @endif

    @if( session("PAR_GENERALES_AUXILIO_TRANSPORTE") === session("keyUser") )
        <div class ="ContenedorMenu">
            <div class = 'ContenedorSeccionesForm ' >
                <p class="TitulosSecciones">Auxilio de Transporte</p>
                {{ csrf_field() }}
                @if( session("PAR_GENERALES_AUXILIO_TRANSPORTE_CREAR") === session("keyUser") )
                <div class = 'BarraIconos'>
                    <img src ='images/AGREGAR_ICONO.png' class = 'OptionIcon'onclick = "CrearAuxilioTransporte('{{route('05fe21ed95c999846f15f957d54c8f70')}}')" data-toggle="modal" data-target="#ModalEdit"/>
                    <span class="FirstText Cursor" style="color:#1B4075;font-weight: bold;" onclick = "CrearAuxilioTransporte('{{route('05fe21ed95c999846f15f957d54c8f70')}}')" data-toggle="modal" data-target="#ModalEdit">Nuevo Auxilio de Transporte</span>
                </div>
                @endif

                @if( session("PAR_GENERALES_AUXILIO_TRANSPORTE_CONSULTAR") === session("keyUser") )
                    <div class = 'form-row'>
                        <div class='col col-sm-3 my-2'>
                            <label for='Auxilio_Transporte_Estado'>Estado:</label>
                            <select class ='form-control' name = 'Auxilio_Transporte_Estado' id = 'Auxilio_Transporte_Estado'>
                                <option value = '-1' >Todos</option>
                                <option value = '1' selected >Activo</option>
                                <option value = '0'>Inactivo</option>
                            </select>
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <label for='Auxilio_Transporte_TextBusqueda'>Buscar:</label>
                            <input type = 'text' class = 'form-control' id = 'Auxilio_Transporte_TextBusqueda' name = 'Auxilio_Transporte_TextBusqueda' />
                        </div>
                        <div class='col col-sm-3 my-2'>
                            <p></p>
                            <img src ='images/lupa.png' class = 'OptionIcon' onclick = 'BuscarDataAuxilioTransporte()'/>
                        </div>
                    </div>
                    <div class = 'ContenedorDataTable'>
                        <table id = "TableAuxilioTransporte" class="tableNew dataTable">
                            <thead>
                                <tr>
                                    <th width = '20px'>No.</th>
                                    <th>Año</th>
                                    <th>Auxilio</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                @endif
            </div>
        </div>
        <br>
    @endif
</div>
 
  
<script>
    $(document).ready(function () {
        
        $(".alert-primary").css({
            'background-color':'#1B4075',
        })
        $(".alert-primary .BlackFont,.fa-angle-double-down,.fa-angle-double-up").css({
            'color':'white'
        })
        
        $(".ContentPanel").css({
            'height':$("body").height()-100
        })

        $(".TModuloReversa").text("PARAMETRIZACIÓN")
        $(".TSubmodulo").text("GENERALES")
        $(".TiHeader").hide()
        $(".TiHeader_Internos").show("fadeIn")
        $(".RutaInterna").attr("href",UrlUniversal+"a1d6bbbd044643ffd9578365cf563a10")

       
    });
</script>
@endsection
