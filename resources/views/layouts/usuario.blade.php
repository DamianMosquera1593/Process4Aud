<table width='auto' class = 'ContenidorInfoUsuario'>
    <tr>
        <td style = 'width:90%'>
            <div class = 'TiHeader TiHeader_Generales'>
                <table style ='width:100%;' >
                    <tr>
                        <td>
                            <span class = 'TModulo'></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class = 'TSubmodulo'></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class = 'CompTSubmodulo'></span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class = 'TiHeader TiHeader_Internos'>
                <table style ='width:100%;' >
                    <tr>
                        <td style = 'vertical-align:middle;'>
                            <a class = 'RutaInterna'>
                                <?php echo '<img style = "height:35px;" src="'.url("/").'/images/NDis/Login/atras.png" />' ?>
                                <span class = 'TModuloReversa'></span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class = 'TSubmodulo' ></span>
                        </td>
                    </tr>
                </table>
            </div>
        </td>
        <td>
            <table width ="100%">
                <tr>
                    <td nowrap>
                        <?php echo '<img class = "AlertaG" src="'.url("/").'/images/NDis/Login/campana.png" />' ?>
                    </td>
                    <td nowrap>
                        <table class = 'ContentInfoUser'>
                            <tr>
                                <td rowspan = '2'>
                                    <div class = 'DivCircularInterno'>
                                        @if( session('Img') == '' )
                                            <img onerror="this.src='{{URL::asset('/image/foto.png')}}'}}';" src ="{{URL::asset('images/foto.png')}}" class = 'BordeFoto' height="60px" width = "60px" style = 'border-radius:12em;'/>
                                        @elseif( session('Img') != '')
                                            <img onerror="this.src='{{URL::asset('/image/foto.png')}}'}}';" src ='http://process.grupotesta.com.co:8989/PProcess3/storage/app/Usuarios/{{ session('Img') }}' class = 'BordeFoto' width = "60px" height="60px" style = 'border-radius:12em;'/>
                                        @else
                                            <img src ="{{URL::asset('images/foto.png')}}" onerror="this.src='{{URL::asset('/images/foto.png')}}'}}';" class = 'BordeFoto' height="60px" width = "60px"style = 'border-radius:12em;'/>
                                        @endif
                                    </div>
                                </td>
                                <td nowrap >
                                    <div class ='ContentInfoUserTd'>
                                        <span class = 'Bienvenida'>{{ session("NameUser") }}</span>
                                        <br>
                                        <?php echo '<img class = "AlertaG2" src="'.url("/").'/images/NDis/Login/CerrarSesion.png" />' ?><a class = 'CerrarSesion' href = '{{ route('CerrarSesion') }}' >Cerrar Sesión</a>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>