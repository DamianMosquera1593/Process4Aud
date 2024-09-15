<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/clear-cachex', function() {
    $exitCode = Artisan::call('cache:clear');
    $exitCode = Artisan::call('config:cache');
    return 'DONE'; //Return anything
});
Route::get('/', function () {
    return redirect()->route('IniciarSesion');
});

    Route::post('login','Auth\LoginController@login')->name('login');
    Route::get('CerrarSesion','Auth\LoginController@CerrarSesion')->name('CerrarSesion');
    
    Route::get('PruebaMailJet','Auth\LoginController@PruebaMailJet')->name('PruebaMailJet');
    
    Route::get('IniciarSesion','Auth\LoginController@LoginPlataforma')->name('IniciarSesion');
    Route::get('f712f056a60e6ea60b9195f04d3c4d74','Controller@_IngresoDatos')->name('f712f056a60e6ea60b9195f04d3c4d74');
    Route::get('3581a6c88481b357c6588d62815880d4','Controller@_IngresoAdministracion')->name('3581a6c88481b357c6588d62815880d4');

/*INICIO*/
    Route::get('bienvenida','Process\BienvenidaController@index')->name('bienvenida');

    Route::get('menu','Process\BienvenidaController@menu')->name('menu');

/*DATOS*/
    Route::get('f9e892e9ea8f026ac7a9487452d012fd','Process\Datos\EmpresaController@index')->name('f9e892e9ea8f026ac7a9487452d012fd');
    Route::post('__DatosEmpresas','Process\Datos\EmpresaController@__DatosEmpresas')->name('__DatosEmpresas');
    Route::get('__DetalleEmpresa/{Hash}','Process\Datos\EmpresaController@__DetalleEmpresa')->name('__DetalleEmpresa');
    
    Route::get('2723bb03bb81e89502512a756b9207c2','Process\Datos\ClienteController@indexDatosCliente')->name('2723bb03bb81e89502512a756b9207c2');
    Route::get('7ded3b7e08c99b3c9634ef4b194d4c3c','Process\Datos\ProveedorController@indexDatosProveedor')->name('7ded3b7e08c99b3c9634ef4b194d4c3c');
    Route::get('724af7e43d52c6048fe2c27011a6bd60','Process\Datos\BancoController@indexDatosBanco')->name('724af7e43d52c6048fe2c27011a6bd60');

    /*PARAMETRIZACIÓN*/
    Route::get('7a55d71f10b208cb395561ea28779875','Process\Parametrizacion\GeneralesController@index')->name('7a55d71f10b208cb395561ea28779875');

    /*PARAMETRIZACION PAISES*/
    Route::post('661083fa443019e8c4b4f124efd030d6','Process\Parametrizacion\GeneralesController@par_pais_new')->name('661083fa443019e8c4b4f124efd030d6');
    Route::post('915589cb0175c8abc0b8bb95e28bf372','Process\Parametrizacion\GeneralesController@par_pais_edit')->name('915589cb0175c8abc0b8bb95e28bf372');
    Route::post('ec502564b750c3cc7e093813d9b95c91','Process\Parametrizacion\GeneralesController@par_estado_pais')->name('ec502564b750c3cc7e093813d9b95c91');
    Route::get('a1d6bbbd044643ffd9578365cf563a10','Process\Parametrizacion\GeneralesController@indexParam')->name('a1d6bbbd044643ffd9578365cf563a10');

    /*PARAMETRIZACION DEPARTAMENTOS*/
    //LISTAR PAISES

    Route::post('82985c51efa493c23f929d6366c08cf8','Process\Parametrizacion\GeneralesController@par_ListarPais')->name('82985c51efa493c23f929d6366c08cf8');
    Route::post('0541853095b833f105b84fabd75e744c','Process\Parametrizacion\GeneralesController@par_depto_new')->name('0541853095b833f105b84fabd75e744c');
    Route::post('0666a2a5d5e27300da3a057c9b154bf7','Process\Parametrizacion\GeneralesController@par_depto_edit')->name('0666a2a5d5e27300da3a057c9b154bf7');
    Route::post('42012568a3796a877ee1fdeb6406e0af','Process\Parametrizacion\GeneralesController@par_ListarDepto')->name('42012568a3796a877ee1fdeb6406e0af');
    Route::post('835c1dd219cebc70d4be8bed4b8d3cfc','Process\Parametrizacion\GeneralesController@par_estado_depto')->name('835c1dd219cebc70d4be8bed4b8d3cfc');
    Route::post('8ee56fa44e8b3aebbbcf72fa7b916694','Process\Parametrizacion\GeneralesController@par_ListarCiudad')->name('8ee56fa44e8b3aebbbcf72fa7b916694');
    Route::post('659de63cb45c46ba1886852e7675145e','Process\Parametrizacion\GeneralesController@par_GneralListarDepto')->name('659de63cb45c46ba1886852e7675145e');
    Route::post('24f11382ba4e22b4a94bc1ac12c8acb4','Process\Parametrizacion\GeneralesController@par_ciudad_new')->name('24f11382ba4e22b4a94bc1ac12c8acb4');
    Route::post('9232139a32dd6871470905c4bf2c060a','Process\Parametrizacion\GeneralesController@par_estado_ciudad')->name('9232139a32dd6871470905c4bf2c060a');
    Route::post('a09d07bd250700960d35ab80aafff7c3','Process\Parametrizacion\GeneralesController@par_ciudad_edit')->name('a09d07bd250700960d35ab80aafff7c3');

    /*PARAMETRIZACION NOMINA*/
    //Salario Minimo
    Route::post('24bbd7ab604456ba2fd41896cd08544d','Process\Parametrizacion\GeneralesController@par_data_salario_minimo')->name('24bbd7ab604456ba2fd41896cd08544d');
    Route::post('64c545d346f6e3d192cd2516f9b92491','Process\Parametrizacion\GeneralesController@par_salario_minimo_new')->name('64c545d346f6e3d192cd2516f9b92491');
    Route::post('7219544f290202465b7b46ba7859c395','Process\Parametrizacion\GeneralesController@par_salario_minimo_edit')->name('7219544f290202465b7b46ba7859c395');
    Route::post('cc48ef2bf47a8f91c6b6c0dac1c59f79','Process\Parametrizacion\GeneralesController@par_estado_salario_minimo')->name('cc48ef2bf47a8f91c6b6c0dac1c59f79');

    //Salario Integral
    Route::post('969d78052d4d99fc2f006b7cc839cb7c','Process\Parametrizacion\GeneralesController@par_data_salario_integral')->name('969d78052d4d99fc2f006b7cc839cb7c');
    Route::post('57b1c23d597b1de55f85b10833b2d45a','Process\Parametrizacion\GeneralesController@par_salario_integral_new')->name('57b1c23d597b1de55f85b10833b2d45a');
    Route::post('a2451a043a60906ecc5585d12e9e9417','Process\Parametrizacion\GeneralesController@par_salario_integral_edit')->name('a2451a043a60906ecc5585d12e9e9417');
    Route::post('a1c0fd0f034c1da754d0df260f6ec314','Process\Parametrizacion\GeneralesController@par_estado_salario_integral')->name('a1c0fd0f034c1da754d0df260f6ec314');

    //Monetizacion Sena
    Route::post('e98252ea82fdf222ccbdc0b2c437a7f6','Process\Parametrizacion\GeneralesController@par_data_monetizacion_sena')->name('e98252ea82fdf222ccbdc0b2c437a7f6');
    Route::post('77c2c6bcf33ba19d76cfa09d019410a8','Process\Parametrizacion\GeneralesController@par_monetizacion_sena_new')->name('77c2c6bcf33ba19d76cfa09d019410a8');
    Route::post('61da78447074452908c95a840cea17a0','Process\Parametrizacion\GeneralesController@par_monetizacion_sena_edit')->name('61da78447074452908c95a840cea17a0');
    Route::post('096e23fbd6989da0bcb89b90c0ea4523','Process\Parametrizacion\GeneralesController@par_estado_monetizacion_sena')->name('096e23fbd6989da0bcb89b90c0ea4523');

    //Auxilio De Transporte
    Route::post('e9fc13910b60f7b0c225e8f1c0e8a4b3','Process\Parametrizacion\GeneralesController@par_data_auxilio_transporte')->name('e9fc13910b60f7b0c225e8f1c0e8a4b3');
    Route::post('05fe21ed95c999846f15f957d54c8f70','Process\Parametrizacion\GeneralesController@par_auxilio_transporte_new')->name('05fe21ed95c999846f15f957d54c8f70');
    Route::post('f79fec29b03ac6dd82b3b127d0fefe7b','Process\Parametrizacion\GeneralesController@par_auxilio_transporte_edit')->name('f79fec29b03ac6dd82b3b127d0fefe7b');
    Route::post('0fcded35fd585d648c34cb2dfebd1816','Process\Parametrizacion\GeneralesController@par_estado_auxilio_transporte')->name('0fcded35fd585d648c34cb2dfebd1816');

    Route::post('e0bdc3b8a5d5b551919c2667263d6989','Process\Parametrizacion\GeneralesController@par_list_year')->name('e0bdc3b8a5d5b551919c2667263d6989');


    /*PARAMETRIZACION EMPRESA - DOCUMENTO LEGAL*/
    Route::get('8736e6f497a5e7b0e123ab42fc0258dc','Process\Parametrizacion\EmpresaController@index')->name('8736e6f497a5e7b0e123ab42fc0258dc');
    Route::post('372a9fb35805ac143ddaa06fb3a8e54a','Process\Parametrizacion\EmpresaController@par_doc_legal_empresa')->name('372a9fb35805ac143ddaa06fb3a8e54a');
    Route::post('d2baccb130a2cd2577184780b83b4187','Process\Parametrizacion\EmpresaController@par_DocLegalEstado')->name('d2baccb130a2cd2577184780b83b4187');
    Route::post('a75b11eba7e34ef0d6d78c99ac4402ba','Process\Parametrizacion\EmpresaController@par_DocLegal_Edit')->name('a75b11eba7e34ef0d6d78c99ac4402ba');

    /*PARAMETRIZACION EMPRESA - IMPUESTOS */
    Route::post('8d64539e242c9f227474c8b1623dcc27','Process\Parametrizacion\EmpresaController@par_Impuesto_empresa')->name('8d64539e242c9f227474c8b1623dcc27');
    Route::post('d57cb0c05170dc402817dbb6917d3bd1','Process\Parametrizacion\EmpresaController@par_TarifaEstado')->name('d57cb0c05170dc402817dbb6917d3bd1');
    Route::post('7d78abe7c625bc7754f9801c85e0619b','Process\Parametrizacion\EmpresaController@par_Impuesto_Edit')->name('7d78abe7c625bc7754f9801c85e0619b');

    /*PARAMETRIZACIÓN PERSONAL*/
    Route::get('66b7ab64d20f5e0f2635036e99352173','Process\Parametrizacion\PersonalController@index')->name('66b7ab64d20f5e0f2635036e99352173');
    Route::post('ac44f9496a1c29129fd7c59279c61dee','Process\Parametrizacion\PersonalController@par_TipoDocumentoPersona')->name('ac44f9496a1c29129fd7c59279c61dee');
    Route::post('fbc2c89efd232118c7e578c3d8c579a6','Process\Parametrizacion\PersonalController@par_EstadoTipoDocumento')->name('fbc2c89efd232118c7e578c3d8c579a6');
    Route::post('535d32192e24a684d729bc8fc8f797e4','Process\Parametrizacion\PersonalController@Par_TipoDocumento_Edit')->name('535d32192e24a684d729bc8fc8f797e4');
    Route::post('0b189c754f77a0cb7d2b5b69f7ddce5a','Process\Parametrizacion\PersonalController@par_EpsPersonal')->name('0b189c754f77a0cb7d2b5b69f7ddce5a');
    Route::post('a0c4ff9b7a3d6412c916f9de819470f1','Process\Parametrizacion\PersonalController@par_EpsEstado')->name('a0c4ff9b7a3d6412c916f9de819470f1');
    Route::post('df5b7a480a6311d8e8e5655dc2c2e0fc','Process\Parametrizacion\PersonalController@par_EpsEdit')->name('df5b7a480a6311d8e8e5655dc2c2e0fc');
    Route::post('7e6f2c6bf4f1cf7a7c177962e126c398','Process\Parametrizacion\PersonalController@par_ArlPersonal')->name('7e6f2c6bf4f1cf7a7c177962e126c398');
    Route::post('e00144035e3cc3e3c1c78305557c178e','Process\Parametrizacion\PersonalController@par_ARLEdit')->name('e00144035e3cc3e3c1c78305557c178e');
    Route::post('5fd80a88f5ab827497337c55282713df','Process\Parametrizacion\PersonalController@par_ArlEstado')->name('5fd80a88f5ab827497337c55282713df');
    Route::post('ae54a5bbbda596afc7fd49f705b21c70','Process\Parametrizacion\PersonalController@par_FCPersonal')->name('ae54a5bbbda596afc7fd49f705b21c70');
    Route::post('ae54a5bbbda596afc7fd49f705b21c70','Process\Parametrizacion\PersonalController@par_FCPersonal')->name('ae54a5bbbda596afc7fd49f705b21c70');
    Route::post('ecb88e5e63baf8d10c3e4b943cbeaf07','Process\Parametrizacion\PersonalController@par_FCEdit')->name('ecb88e5e63baf8d10c3e4b943cbeaf07');
    Route::post('a97e143649de981448dfa56bb04d41c7','Process\Parametrizacion\PersonalController@par_FCEstado')->name('a97e143649de981448dfa56bb04d41c7');
    Route::post('d060be146d1b798ff6f50c50cc60c8c8','Process\Parametrizacion\PersonalController@par_FPPersonal')->name('d060be146d1b798ff6f50c50cc60c8c8');
    Route::post('01aa32e2435ae54db53ff1b66be244b6','Process\Parametrizacion\PersonalController@par_FPEstado')->name('01aa32e2435ae54db53ff1b66be244b6');
    Route::post('627415ff93045c4b1c0b5e1e038a1b12','Process\Parametrizacion\PersonalController@par_FPEdit')->name('627415ff93045c4b1c0b5e1e038a1b12');
    Route::post('606cd90de76323762036c970e10e98a6','Process\Parametrizacion\PersonalController@par_CCPersonal')->name('606cd90de76323762036c970e10e98a6');
    Route::post('fa1299c56df822894bce2f11c8be4b2f','Process\Parametrizacion\PersonalController@par_CCEstado')->name('fa1299c56df822894bce2f11c8be4b2f');
    Route::post('2f3fd7201b5630e9e6a136285325b75e','Process\Parametrizacion\PersonalController@par_CCEdit')->name('2f3fd7201b5630e9e6a136285325b75e');
    Route::post('19150bbc9931e7954c8f28ca9ab45dfc','Process\Parametrizacion\PersonalController@par_DLPersonal')->name('19150bbc9931e7954c8f28ca9ab45dfc');
    Route::post('6b3db3f2961ddc12887a3e0280546226','Process\Parametrizacion\PersonalController@par_DLEstado')->name('6b3db3f2961ddc12887a3e0280546226');
    Route::post('4b63a460bcf21a6aaac1df2adeb2996b','Process\Parametrizacion\PersonalController@par_DLEdit')->name('4b63a460bcf21a6aaac1df2adeb2996b');
    Route::post('17bc272ee4c101a3144ee91211db00f3','Process\Parametrizacion\PersonalController@par_TRPersonal')->name('17bc272ee4c101a3144ee91211db00f3');
    Route::post('cf35acb23dec2f20017db10399fb54ff','Process\Parametrizacion\PersonalController@par_TREstado')->name('cf35acb23dec2f20017db10399fb54ff');
    Route::post('1b2ae842bd512c60d7b37b358ccf322e','Process\Parametrizacion\PersonalController@par_TREdit')->name('1b2ae842bd512c60d7b37b358ccf322e');

    /*PARAMETRIZACIÓN PPTO GENERAL*/
    Route::get('3b62057ed4a6053f36077f3a0ee3d1ae','Process\Parametrizacion\PptoGeneralController@index')->name('3b62057ed4a6053f36077f3a0ee3d1ae');
    Route::post('52bce3f27f57ac94d528ecb89efb6d01','Process\Parametrizacion\PptoGeneralController@par_PeriodicidadPptoGeneral')->name('52bce3f27f57ac94d528ecb89efb6d01');
    Route::post('a01e79a2e8871131b5539a3da2843e78','Process\Parametrizacion\PptoGeneralController@par_PeriodicidadEstado')->name('a01e79a2e8871131b5539a3da2843e78');
    Route::post('482b0a84fc37dacba64681f311a2ef4d','Process\Parametrizacion\PptoGeneralController@par_PeriodicidadEdit')->name('482b0a84fc37dacba64681f311a2ef4d');

    /*PARAMETRIZACIÓN INVENTARIO*/
    Route::get('6749704d28d45a5dfe071898f72a32d4','Process\Parametrizacion\InventarioController@index')->name('6749704d28d45a5dfe071898f72a32d4');
    Route::post('711127833da5006e59022d2f15108564','Process\Parametrizacion\InventarioController@par_OficinaPropietario')->name('711127833da5006e59022d2f15108564');
    Route::post('3bce8214662cb627542e03ae8b13d7a4','Process\Parametrizacion\InventarioController@par_OficinaPropietarioEstado')->name('3bce8214662cb627542e03ae8b13d7a4');
    Route::post('8b47cb0aaa0e8ea4cf71c5a493af914a','Process\Parametrizacion\InventarioController@par_PropietarioOficinaEdit')->name('8b47cb0aaa0e8ea4cf71c5a493af914a');
    Route::post('a7b498c0b69caf18c0e8c0864ed8391c','Process\Parametrizacion\InventarioController@UnidadesInventarioGeneral')->name('a7b498c0b69caf18c0e8c0864ed8391c');

    Route::post('b5b6037f6bf35a935246d78534677a91','Process\Parametrizacion\InventarioController@par_Propietario')->name('b5b6037f6bf35a935246d78534677a91');
    Route::post('5e069393e734171f77cf0897df0f7d53','Process\Parametrizacion\InventarioController@par_PropietarioEstado')->name('5e069393e734171f77cf0897df0f7d53');
    Route::post('74348763c2057594dd749d3d920aeb99','Process\Parametrizacion\InventarioController@par_PropietarioEdit')->name('74348763c2057594dd749d3d920aeb99');

    Route::post('48309bd6ea8751e94589096a264dd219','Process\Parametrizacion\InventarioController@par_Tipo')->name('48309bd6ea8751e94589096a264dd219');
    Route::post('a07318fd75b88155b5c1f0e6eae6e639','Process\Parametrizacion\InventarioController@par_TipoEstado')->name('a07318fd75b88155b5c1f0e6eae6e639');
    Route::post('ca8da7c143d05c913b1be8290955acb7','Process\Parametrizacion\InventarioController@par_TipoEdit')->name('ca8da7c143d05c913b1be8290955acb7');

    Route::post('c35923a0ba8ff88f55d4926bb7cdd90c','Process\Parametrizacion\InventarioController@par_Marca')->name('c35923a0ba8ff88f55d4926bb7cdd90c');
    Route::post('a57231665fab19726259eadab9247651','Process\Parametrizacion\InventarioController@par_MarcaEstado')->name('a57231665fab19726259eadab9247651');
    Route::post('2d7538be851f890da65539274d71f355','Process\Parametrizacion\InventarioController@par_MarcaEdit')->name('2d7538be851f890da65539274d71f355');

    /*PARAMETRIZACIÓN CLIENTE*/
    Route::get('705e21f70252bdd71cc4bd7477556173','Process\Parametrizacion\ClienteController@index')->name('705e21f70252bdd71cc4bd7477556173');
    Route::post('61545d2b19509500ecbf29396f9246c2','Process\Parametrizacion\ClienteController@par_DocLegal')->name('61545d2b19509500ecbf29396f9246c2');
    Route::post('3ce2a91a30d0d4c909bcacab39928936','Process\Parametrizacion\ClienteController@par_DocLegalEstado')->name('3ce2a91a30d0d4c909bcacab39928936');
    Route::post('c775752219f9b2128f70b3376e209e5c','Process\Parametrizacion\ClienteController@par_DocLegalEdit')->name('c775752219f9b2128f70b3376e209e5c');
    Route::post('9d35372dbcc1116b5442bf20053f3f81','Process\Parametrizacion\ClienteController@par_InfoTributaria')->name('9d35372dbcc1116b5442bf20053f3f81');
    Route::post('f0b29a92eeed4cb55239806b6f8e9f88','Process\Parametrizacion\ClienteController@par_InfoTributariaEstado')->name('f0b29a92eeed4cb55239806b6f8e9f88');
    Route::post('76108987cc272847418116eec71b4079','Process\Parametrizacion\ClienteController@par_InfoTributariaEdit')->name('76108987cc272847418116eec71b4079');
    Route::post('19e6298d7e9ad21056072a6906b20cfe','Process\Parametrizacion\ClienteController@par_Pago')->name('19e6298d7e9ad21056072a6906b20cfe');
    Route::post('663e18a6180d112c61f1832a1207558e','Process\Parametrizacion\ClienteController@par_PagosEstado')->name('663e18a6180d112c61f1832a1207558e');
    Route::post('f3ec4736675e011c964587cbbe76b3f9','Process\Parametrizacion\ClienteController@par_PagosEdit')->name('f3ec4736675e011c964587cbbe76b3f9');
    Route::post('37ad4c21f3ebb7a11a82e8bbc988d26c','Process\Parametrizacion\ClienteController@par_TipoContrato')->name('37ad4c21f3ebb7a11a82e8bbc988d26c');
    Route::post('b2835f9c5e5d7f43ed9f022cc2276748','Process\Parametrizacion\ClienteController@par_TipoContratoEstado')->name('b2835f9c5e5d7f43ed9f022cc2276748');
    Route::post('c6f70778fcd8d26a0118953a4daf853b','Process\Parametrizacion\ClienteController@par_TipoContratoEdit')->name('c6f70778fcd8d26a0118953a4daf853b');

    /*PARAMETRIZACIÓN ROVEEDOR*/
    Route::get('af65b15ddf7d8c9a42016f3917171b7d','Process\Parametrizacion\ProveedorController@index')->name('af65b15ddf7d8c9a42016f3917171b7d');
    Route::post('d9a3fce60e951e4044c90cffcc84bff8','Process\Parametrizacion\ProveedorController@par_DocLegal')->name('d9a3fce60e951e4044c90cffcc84bff8');
    Route::post('4db6279e8797a15d736d9a8dc9a76fed','Process\Parametrizacion\ProveedorController@par_DocLegalEstado')->name('4db6279e8797a15d736d9a8dc9a76fed');
    Route::post('e5a5ab7858e42b873dd68ab838d82514','Process\Parametrizacion\ProveedorController@par_DocLegalEdit')->name('e5a5ab7858e42b873dd68ab838d82514');

    /*PARAMETRIZACIÓN BANCO*/
    Route::get('e038b329d2bfdefdcabb151e839b2b1d','Process\Parametrizacion\BancoController@index')->name('e038b329d2bfdefdcabb151e839b2b1d');
    Route::post('780e6b1c18a37dab1a188631a98c214e','Process\Parametrizacion\BancoController@par_DocLegal')->name('780e6b1c18a37dab1a188631a98c214e');
    Route::post('65992a272dc76638b416caa0590d4695','Process\Parametrizacion\BancoController@par_DocLegalEstado')->name('65992a272dc76638b416caa0590d4695');
    Route::post('d380580a6a3d61235fb5caf50cbb6747','Process\Parametrizacion\BancoController@par_DocLegalEdit')->name('d380580a6a3d61235fb5caf50cbb6747');
    Route::post('3d75102de30445944e88329404262053','Process\Parametrizacion\BancoController@par_TipoProducto')->name('3d75102de30445944e88329404262053');
    Route::post('cfdb4a9a1139cfaf64269f013bb111d7','Process\Parametrizacion\BancoController@par_TipoProductoEstado')->name('cfdb4a9a1139cfaf64269f013bb111d7');
    Route::post('679d01a06d704b2a5af354fb537f8cb9','Process\Parametrizacion\BancoController@par_TipoProductoEdit')->name('679d01a06d704b2a5af354fb537f8cb9');
    Route::post('5ee378d7683d3cf60fc91433c812fa07','Process\Parametrizacion\BancoController@par_TipoMovimiento')->name('5ee378d7683d3cf60fc91433c812fa07');
    Route::post('b529d9c38d60d645a5a7b28d459d9994','Process\Parametrizacion\BancoController@par_TipoMovimientoEstado')->name('b529d9c38d60d645a5a7b28d459d9994');
    Route::post('225fa3101b4369e6966980b141becdcf','Process\Parametrizacion\BancoController@par_TipoMovimientoEdit')->name('225fa3101b4369e6966980b141becdcf');

    /*PARAMETRIZACIÓN SISTEMAS*/
    Route::get('856c55ae087e200b65b9a1bdaf897f01','Process\Parametrizacion\SistemasController@index')->name('856c55ae087e200b65b9a1bdaf897f01');
    Route::post('a4ae710014c4088165816391b79f89c3','Process\Parametrizacion\SistemasController@par_DocLegal')->name('a4ae710014c4088165816391b79f89c3');
    Route::post('7f124baed5228ba4e4076e53f3340d76','Process\Parametrizacion\SistemasController@par_DocLegalEstado')->name('7f124baed5228ba4e4076e53f3340d76');
    Route::post('1a3f6c82400c73e86034864eaab3b8c9','Process\Parametrizacion\SistemasController@par_DocLegalEdit')->name('1a3f6c82400c73e86034864eaab3b8c9');
    
    /*PARAMETRIZACIÓN REQUERIMIENTOS CLIENTES*/
    Route::get('e2a13dbb9efa27ff4d29436bbf963284','Process\Parametrizacion\RequerimientoClienteController@IndexRequerimientosClientes')->name('e2a13dbb9efa27ff4d29436bbf963284');
    Route::post('6295e14e366b0503b236e70afd09490a','Process\Parametrizacion\RequerimientoClienteController@parRCTipoSolicitudCrear')->name('6295e14e366b0503b236e70afd09490a');
    Route::post('0853f95f5a6301051018a0cbbe7984b3','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_tiposolicitud')->name('0853f95f5a6301051018a0cbbe7984b3');
    Route::post('ex0853f95f5a6301051018a0cbbe7984b3','Process\Parametrizacion\RequerimientoClienteController@parRCTipoSolicitudE')->name('ex0853f95f5a6301051018a0cbbe7984b3');
    Route::post('exd0853f95f5a6301051018a0cbbe7984b3','Process\Parametrizacion\RequerimientoClienteController@parRCTipoSolicitudEstado')->name('exd0853f95f5a6301051018a0cbbe7984b3');
    Route::post('c0cd287362f97d507825cc67751f5b9f','Process\Parametrizacion\RequerimientoClienteController@par_Impuesto_empresa')->name('c0cd287362f97d507825cc67751f5b9f');
    Route::post('8c4441bfb7d623e09efda5e0610d323f','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_tipodesarrollo')->name('8c4441bfb7d623e09efda5e0610d323f');
    Route::post('ed8c4441bfb7d623e09efda5e0610d323f','Process\Parametrizacion\RequerimientoClienteController@par_Impuesto_Edit')->name('ed8c4441bfb7d623e09efda5e0610d323f');
    Route::post('est8c4441bfb7d623e09efda5e0610d323f','Process\Parametrizacion\RequerimientoClienteController@par_TarifaEstado')->name('est8c4441bfb7d623e09efda5e0610d323f');
    Route::post('e228c9f5c2647b90785f6e65017d9f53','Process\Parametrizacion\RequerimientoClienteController@par_RCTipoMaterial')->name('e228c9f5c2647b90785f6e65017d9f53');
    Route::post('c8ebeaf169b2579d57bc6107f0ce6193','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_tipomaterial')->name('c8ebeaf169b2579d57bc6107f0ce6193');
    Route::post('estc8ebeaf169b2579d57bc6107f0ce6193','Process\Parametrizacion\RequerimientoClienteController@par_EstadoTipoMaterial')->name('estc8ebeaf169b2579d57bc6107f0ce6193');
    Route::post('edc8ebeaf169b2579d57bc6107f0ce6193','Process\Parametrizacion\RequerimientoClienteController@par_TipoMaterial_Edit')->name('edc8ebeaf169b2579d57bc6107f0ce6193');
    Route::post('2dcfa09040494aa2287ff6753add61d8','Process\Parametrizacion\RequerimientoClienteController@RC_ListarMateriales')->name('2dcfa09040494aa2287ff6753add61d8');
    Route::post('c5b07387f9fb7f044cfe15c41df8bece','Process\Parametrizacion\RequerimientoClienteController@par_RCMTipoMaterial')->name('c5b07387f9fb7f044cfe15c41df8bece');
    Route::post('2e7986fed275ace00443a9e61969d6c9','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_mediostipomaterial')->name('2e7986fed275ace00443a9e61969d6c9');
    Route::post('est2e7986fed275ace00443a9e61969d6c9','Process\Parametrizacion\RequerimientoClienteController@par_EstadoMTipoMaterial')->name('est2e7986fed275ace00443a9e61969d6c9');
    Route::post('ed2e7986fed275ace00443a9e61969d6c9','Process\Parametrizacion\RequerimientoClienteController@par_MTipoMaterial_Edit')->name('ed2e7986fed275ace00443a9e61969d6c9');
    Route::post('83a4b54c52444273df77d93bd74b8e32','Process\Parametrizacion\RequerimientoClienteController@par_RCSectorUnidad')->name('83a4b54c52444273df77d93bd74b8e32');
    Route::post('c5937d84ef10c47b8339d56695396f91','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_sectorunidad')->name('c5937d84ef10c47b8339d56695396f91');
    Route::post('estc5937d84ef10c47b8339d56695396f91','Process\Parametrizacion\RequerimientoClienteController@par_EstadoSU')->name('estc5937d84ef10c47b8339d56695396f91');
    Route::post('edc5937d84ef10c47b8339d56695396f91','Process\Parametrizacion\RequerimientoClienteController@par_SU_Edit')->name('edc5937d84ef10c47b8339d56695396f91');
    Route::post('d76aded1131930b5504d6421565183b0','Process\Parametrizacion\RequerimientoClienteController@RC_ListarSectores')->name('d76aded1131930b5504d6421565183b0');
    Route::post('4a112f2e99d415aba2c326869187b531','Process\Parametrizacion\RequerimientoClienteController@par_RCDetalleSector')->name('4a112f2e99d415aba2c326869187b531');
    Route::post('8218de5f69aac313a7761cd88cf4e839','Process\Parametrizacion\RequerimientoClienteController@par_data_rc_detalleSector')->name('8218de5f69aac313a7761cd88cf4e839');
    Route::post('est8218de5f69aac313a7761cd88cf4e839','Process\Parametrizacion\RequerimientoClienteController@par_EstadoSUD')->name('est8218de5f69aac313a7761cd88cf4e839');
    Route::post('ed8218de5f69aac313a7761cd88cf4e839','Process\Parametrizacion\RequerimientoClienteController@par_SUD_Edit')->name('ed8218de5f69aac313a7761cd88cf4e839');
    

    /*PARAMETRIZACIÓN TRÁFICO*/
    Route::get('0c6dbf3f81b907922d3a1f693f24ad0a','Process\Parametrizacion\TraficoController@index')->name('0c6dbf3f81b907922d3a1f693f24ad0a');
    Route::post('7923210f87763748a338bfde09d274c7','Process\Parametrizacion\TraficoController@par_TraficoTipoBrief')->name('7923210f87763748a338bfde09d274c7');
    Route::post('72b9c3f36fb72ecc941ab8cc89b54141','Process\Parametrizacion\TraficoController@par_TraficoTipoBriefEstado')->name('72b9c3f36fb72ecc941ab8cc89b54141');
    Route::post('b1ec1a55533ae1046c731375c0c683dc','Process\Parametrizacion\TraficoController@par_TraficoTipoBriefEdit')->name('b1ec1a55533ae1046c731375c0c683dc');
    Route::post('a9e48180ffc0c36062e6f88c8c7aa255','Process\Parametrizacion\TraficoController@par_TraficoDataNuevoCampoBrief')->name('a9e48180ffc0c36062e6f88c8c7aa255');
    Route::post('2f643f836b707206753d7e3244508a04','Process\Parametrizacion\TraficoController@par_TraficoDataCamposBrief')->name('2f643f836b707206753d7e3244508a04');
    Route::post('b0280405c81f4e4992113f92d89814ad','Process\Parametrizacion\TraficoController@par_TraficoGuardarCampoTipoBrief')->name('b0280405c81f4e4992113f92d89814ad');
    Route::post('6012b46480b4ba8b7188ed301606df71','Process\Parametrizacion\TraficoController@par_TraficoListarCamposBrief')->name('6012b46480b4ba8b7188ed301606df71');
    Route::post('6a0a0b12eb2cbfda1d08716b383f7fac','Process\Parametrizacion\TraficoController@par_ReorganizarCamposBrief')->name('6a0a0b12eb2cbfda1d08716b383f7fac');
    Route::post('2955fe92607b78615c3b43c1154b9e1a','Process\Parametrizacion\TraficoController@EliminarRegistroFormatoBrief')->name('2955fe92607b78615c3b43c1154b9e1a');
    Route::post('5d7442a9091056cde4eb3948de693268','Process\Parametrizacion\TraficoController@par_TraficoTipoTarea')->name('5d7442a9091056cde4eb3948de693268');
    Route::post('608bf201fb4402cf75ea0f699aef12f2','Process\Parametrizacion\TraficoController@par_TraficoTipoTareaEstado')->name('608bf201fb4402cf75ea0f699aef12f2');
    Route::post('cf068407da50ee1b683ff9e4ac8b3fdf','Process\Parametrizacion\TraficoController@par_TraficoTipoTareaEdit')->name('cf068407da50ee1b683ff9e4ac8b3fdf');
    Route::post('62148b2640276b99ee31dae2c89a85f9','Process\Parametrizacion\TraficoController@par_SaveTipoTraficoAdmin')->name('62148b2640276b99ee31dae2c89a85f9');
    

    /*PARAMETRIZACIÓN ROLES*/
    Route::get('35e80067234c997c538f25902a9ddef4','Process\Parametrizacion\RolesController@index')->name('35e80067234c997c538f25902a9ddef4');
    Route::post('922d8ae0f0c0d839c35e457bdc44e25e','Process\Parametrizacion\RolesController@datosPerfil')->name('922d8ae0f0c0d839c35e457bdc44e25e');
    Route::post('b5106cf796741beaa7c81ac7a67e3d68','Process\Parametrizacion\RolesController@parDatosPermisosPerfil')->name('b5106cf796741beaa7c81ac7a67e3d68');
    Route::post('4eb7fef9bbd33196bf48b57f434df859','Process\Parametrizacion\RolesController@parPermisosPerfil')->name('4eb7fef9bbd33196bf48b57f434df859');
    Route::post('83e30c6212f44880e12457d3215f1de3','Process\Parametrizacion\RolesController@parDatosCrearPerfil')->name('83e30c6212f44880e12457d3215f1de3');
    Route::post('654c74fda3156c389869f782d354f085','Process\Parametrizacion\RolesController@parCrearPerfil')->name('654c74fda3156c389869f782d354f085');
    Route::post('424d85d88ff22c6b0cd0ba5bb78130ef','Process\Parametrizacion\RolesController@parDatosEditarPerfil')->name('424d85d88ff22c6b0cd0ba5bb78130ef');
    Route::post('4615a88b890a421446169a9ce758d933','Process\Parametrizacion\RolesController@parEditarPerfil')->name('4615a88b890a421446169a9ce758d933');
    Route::post('0cc1ebeb3ff8e84588df5a140afbe345','Process\Parametrizacion\RolesController@parEstadoPerfil')->name('0cc1ebeb3ff8e84588df5a140afbe345');

    /*PARAMETRIZACIÓN USUARIOS*/
    Route::get('99f46807f0cf3f07a5ad65d5333bb2bf','Process\Parametrizacion\UsuarioController@index')->name('99f46807f0cf3f07a5ad65d5333bb2bf');
    Route::post('5b8644fe47a908cc9e1a51208435b712','Process\Parametrizacion\UsuarioController@datosUsuarios')->name('5b8644fe47a908cc9e1a51208435b712');
    Route::post('22e05679cdd86fb8a40ad7bd39a5aafc','Process\Parametrizacion\UsuarioController@parDatosCrearUsuario')->name('22e05679cdd86fb8a40ad7bd39a5aafc');
    Route::post('1555f8ab3aad644b70b52c9fe8149a11','Process\Parametrizacion\UsuarioController@parCrearUsuario')->name('1555f8ab3aad644b70b52c9fe8149a11');
    Route::post('f9ec83ca71cfa45f0fc580e6cb0b49bd','Process\Parametrizacion\UsuarioController@parDatosEditarUsuario')->name('f9ec83ca71cfa45f0fc580e6cb0b49bd');
    Route::post('fdd2189c990da29d1d8a6094632b3061','Process\Parametrizacion\UsuarioController@parEditarUsuario')->name('fdd2189c990da29d1d8a6094632b3061');
    Route::post('d93c8a1882c2ccf56811ea1b1c213cbd','Process\Parametrizacion\UsuarioController@parEditarUsuarioPassword')->name('d93c8a1882c2ccf56811ea1b1c213cbd');
    Route::post('c3e3296d0160a193322bc1c8f36826f3','Process\Parametrizacion\UsuarioController@parEstadoUsuario')->name('c3e3296d0160a193322bc1c8f36826f3');
    Route::post('e22307191e73517599afb28028eccae3','Process\Parametrizacion\UsuarioController@parListarEmpleados')->name('e22307191e73517599afb28028eccae3');

    Route::post('78c261fecfd1cd1204708f77d555920d','Process\Parametrizacion\UsuarioController@datosUsuariosDirectores')->name('78c261fecfd1cd1204708f77d555920d');
    Route::post('5a16d51a93e9675d61821e71562e973d','Process\Parametrizacion\UsuarioController@datosDirectoresUsuario')->name('5a16d51a93e9675d61821e71562e973d');
    Route::post('09a97e24ea74f24922da91242e16ad47','Process\Parametrizacion\UsuarioController@parDatosCrearUsuarioDirectores')->name('09a97e24ea74f24922da91242e16ad47');
    Route::post('3f5fcbcac6d595b05d78b288469e3f61','Process\Parametrizacion\UsuarioController@parDatosCrearUsuarioDirector')->name('3f5fcbcac6d595b05d78b288469e3f61');
    Route::post('aaa61db16c05337904a5d0a88e0da428','Process\Parametrizacion\UsuarioController@parCrearUsuarioDirectores')->name('aaa61db16c05337904a5d0a88e0da428');
    Route::post('5f600fc1a96767fef66e47102f899277','Process\Parametrizacion\UsuarioController@parRemoverUsuarioDirector')->name('5f600fc1a96767fef66e47102f899277');
    Route::post('0bc28c27b9facdee1a9db209d52deb7f','Process\Parametrizacion\UsuarioController@parRemoverUsuarioDirectores')->name('0bc28c27b9facdee1a9db209d52deb7f');

    Route::post('419a6811a79ff03f81d37fda779d5910','Process\Parametrizacion\UsuarioController@parDatosCrearUsuarioEmpresa')->name('419a6811a79ff03f81d37fda779d5910');
    Route::post('b29bbd657072b7a07579a31401d563f3','Process\Parametrizacion\UsuarioController@parCrearUsuarioEmpresa')->name('b29bbd657072b7a07579a31401d563f3');
    Route::post('dbbe809db10de4c7a4739b09f1a8be02','Process\Parametrizacion\UsuarioController@datosUsuariosEmpresa')->name('dbbe809db10de4c7a4739b09f1a8be02');
    Route::post('cfca4f55bf0c2d5b2a5bf441517b699b','Process\Parametrizacion\UsuarioController@parRemoverUsuarioEmpresa')->name('cfca4f55bf0c2d5b2a5bf441517b699b');

    Route::post('f79b89f1915396f6512fa79e03461041','Process\Parametrizacion\UsuarioController@datosUsuariosUnidadNegocio')->name('f79b89f1915396f6512fa79e03461041');
    Route::post('4116ccdccad0e1daf09b692acdaa4e5b','Process\Parametrizacion\UsuarioController@parDatosUnidadNegocioByUsuario')->name('4116ccdccad0e1daf09b692acdaa4e5b');
    Route::post('1b0d400350384cc620ad56ba285c1fe6','Process\Parametrizacion\UsuarioController@parDatosUnidadNegocioByEmpresa')->name('1b0d400350384cc620ad56ba285c1fe6');
    Route::post('d253fac6d4551a09c7c8e032ef8f10e3','Process\Parametrizacion\UsuarioController@parDatosUnidadNegocioByUN')->name('d253fac6d4551a09c7c8e032ef8f10e3');
    Route::post('e088eff01dc9d12cdc31a19f23860dde','Process\Parametrizacion\UsuarioController@parCrearUsuarioUnidadNegocio')->name('e088eff01dc9d12cdc31a19f23860dde');
    Route::post('61e758abff4661243040c45d90715136','Process\Parametrizacion\UsuarioController@parRemoverUsuarioUnidadNegocio')->name('61e758abff4661243040c45d90715136');

    Route::post('8705a86e2948a84ca649525e9bade3ec','Process\Parametrizacion\UsuarioController@datosUsuariosClienteProducto')->name('8705a86e2948a84ca649525e9bade3ec');
    Route::post('eed6ecfa687e785a71a3b1c415731854','Process\Parametrizacion\UsuarioController@parDatosCProductoByUsuario')->name('eed6ecfa687e785a71a3b1c415731854');
    Route::post('2f69625ad17040ab364db7083f95cf90','Process\Parametrizacion\UsuarioController@parDatosCProductoByEmpresa')->name('2f69625ad17040ab364db7083f95cf90');
    Route::post('90a2a6e4e383bb99f296617e293068cf','Process\Parametrizacion\UsuarioController@parDatosCProductoByClientes')->name('90a2a6e4e383bb99f296617e293068cf');
    Route::post('06b02d2daa85b17173b582087f46d61d','Process\Parametrizacion\UsuarioController@parDatosCProductoByprodcutos')->name('06b02d2daa85b17173b582087f46d61d');
    Route::post('108c16a6c63ca721181a6919e62b360d','Process\Parametrizacion\UsuarioController@parDatosCProductoByUN')->name('108c16a6c63ca721181a6919e62b360d');
    Route::post('f7395d218880036529243dde732f771e','Process\Parametrizacion\UsuarioController@parCrearUsuarioClienteProducto')->name('f7395d218880036529243dde732f771e');
    Route::post('9b917e093ababee9f2d598dd4735da62','Process\Parametrizacion\UsuarioController@parRemoverUsuarioClieteProducto')->name('9b917e093ababee9f2d598dd4735da62');

    Route::post('33dece9eeabe8e98872355516ac8d891','Process\Parametrizacion\UsuarioController@datosUsuariosProfesionalCliente')->name('33dece9eeabe8e98872355516ac8d891');
    Route::post('459247889a7f2365b3348ff85895edba','Process\Parametrizacion\UsuarioController@parDatosCProfesionalByUsuario')->name('459247889a7f2365b3348ff85895edba');
    Route::post('3deef6085db1a0b1abd40c6e92b19c7e','Process\Parametrizacion\UsuarioController@parDatosCProfesionalByClientes')->name('3deef6085db1a0b1abd40c6e92b19c7e');
    Route::post('acc6168636942bb045e10ab7f335e1cf','Process\Parametrizacion\UsuarioController@parDatosCProfesionalByprofesionales')->name('acc6168636942bb045e10ab7f335e1cf');
    Route::post('dff83a8057100dbf8936c472f2903633','Process\Parametrizacion\UsuarioController@parCrearUsuarioProfesionalCliente')->name('dff83a8057100dbf8936c472f2903633');
    Route::post('7e41145aa48edb3bb1438119f6a04e39','Process\Parametrizacion\UsuarioController@parRemoverUsuarioProfesionalCliente')->name('7e41145aa48edb3bb1438119f6a04e39');

    Route::post('7493e1510790698a5bd63db664a457bb','Process\Parametrizacion\UsuarioController@datosDepartamentos')->name('7493e1510790698a5bd63db664a457bb');
    Route::post('651b61798ae6ff5c2fd88b38bb6c2d30','Process\Parametrizacion\UsuarioController@parCrearDepartamentos')->name('651b61798ae6ff5c2fd88b38bb6c2d30');
    Route::post('ba35413d13397aba30871a0dc89ffe28','Process\Parametrizacion\UsuarioController@parEstadoDepartamentos')->name('ba35413d13397aba30871a0dc89ffe28');
    Route::post('7405ff14fbe27bf97752c2af45cfc1ba','Process\Parametrizacion\UsuarioController@datosUsuariosDepartamentos')->name('7405ff14fbe27bf97752c2af45cfc1ba');
    Route::post('8ad9e7d699f4369c0e743cb6ca35cc10','Process\Parametrizacion\UsuarioController@parDatosDepartamentosByUsuario')->name('8ad9e7d699f4369c0e743cb6ca35cc10');
    Route::post('7c065bd4443f2b9a655456db15e5936a','Process\Parametrizacion\UsuarioController@parDatosDepartamentosByDepartamentos')->name('7c065bd4443f2b9a655456db15e5936a');
    Route::post('a58dc5fdab060121ae174bf4c621a4ad','Process\Parametrizacion\UsuarioController@parCrearUsuariosDepartamentos')->name('a58dc5fdab060121ae174bf4c621a4ad');
    Route::post('679f578d6540402c72d6e52c7209790b','Process\Parametrizacion\UsuarioController@parRemoverUsuarioDepartamento')->name('679f578d6540402c72d6e52c7209790b');
    Route::post('be932aeddc38361177e8ffb8158bf429','Process\Parametrizacion\UsuarioController@datosResponsablesDepartamentos')->name('be932aeddc38361177e8ffb8158bf429');
    Route::post('f287b15940c57cc2e92756185a857780','Process\Parametrizacion\UsuarioController@parDatosResponsablesDepartamentosByUsuario')->name('f287b15940c57cc2e92756185a857780');
    Route::post('24c37faf929cd7cdb65a654597f1239a','Process\Parametrizacion\UsuarioController@parDatosResponsablesDepartamentosByDepartamentos')->name('24c37faf929cd7cdb65a654597f1239a');
    Route::post('43750f687cbee2131256ccf02480f265','Process\Parametrizacion\UsuarioController@parCrearResponsablesDepartamentos')->name('43750f687cbee2131256ccf02480f265');
    Route::post('cc01d0a70f71f7c03516569e87b2313b','Process\Parametrizacion\UsuarioController@parRemoverResponsableDepartamento')->name('cc01d0a70f71f7c03516569e87b2313b');

    Route::post('14c8fccec3f602542538211b8f3d2af9','Process\Parametrizacion\UsuarioController@datosAsignadosUsuario')->name('14c8fccec3f602542538211b8f3d2af9');
    Route::post('b826ea5a05c8f6324c8b89604f3b6781','Process\Parametrizacion\UsuarioController@parDatosAsignadosByUsuario')->name('b826ea5a05c8f6324c8b89604f3b6781');
    Route::post('477ed388160b9a6d8a018362e2103ca0','Process\Parametrizacion\UsuarioController@parDatosAsignadosByDepartamentos')->name('477ed388160b9a6d8a018362e2103ca0');
    Route::post('78b74c2a9598df315ab342b16df29c29','Process\Parametrizacion\UsuarioController@parDatosAsignadosByAsignados')->name('78b74c2a9598df315ab342b16df29c29');
    Route::post('3d17460ae6e4b551ed208da3f9388655','Process\Parametrizacion\UsuarioController@parCrearAsignadosUsuario')->name('3d17460ae6e4b551ed208da3f9388655');
    Route::post('1618155af321a3be34f87347457fc773','Process\Parametrizacion\UsuarioController@parRemoverAsignadoUsuario')->name('1618155af321a3be34f87347457fc773');
    Route::post('5637d9d72a015ed42079e7b74e736ade','Process\Parametrizacion\UsuarioController@parDatosUsuariosPadre')->name('5637d9d72a015ed42079e7b74e736ade');

    /*PAR - PRODUCCIÓN*/
    Route::get('aebce02d1d97f53d149ce1951211196c','Process\Parametrizacion\ProduccionController@index')->name('aebce02d1d97f53d149ce1951211196c');
    Route::post('98fc6506a4b25ca7b7c585d7397362d6','Process\Parametrizacion\ProduccionController@par_centrocosto_DL')->name('98fc6506a4b25ca7b7c585d7397362d6');
    Route::post('e1859a438f848fc210633e981c0447f9','Process\Parametrizacion\ProduccionController@parCentroCosto')->name('e1859a438f848fc210633e981c0447f9');
    Route::post('04058d863ddcf2b4a4411118efaaa5d3','Process\Parametrizacion\ProduccionController@par_CecoEstado')->name('04058d863ddcf2b4a4411118efaaa5d3');
    Route::post('1028caee104e1f9409c3ec261b1535e8','Process\Parametrizacion\ProduccionController@par_CecoEdit')->name('1028caee104e1f9409c3ec261b1535e8');
    
    
    /*EMPRESA*/
    Route::post('b1e2cfd036f53feffcd197b03ef6f60e','Process\Datos\EmpresaController@CrearEmpresa')->name('b1e2cfd036f53feffcd197b03ef6f60e');
    Route::post('d3bc4b716d024731ecb9ac27cd776ead','Process\Datos\EmpresaController@par_DatoInformacionLegalEmpresa')->name('d3bc4b716d024731ecb9ac27cd776ead');

    /*Datos - Empresa*/
    Route::post('2cea7c9610a2d44beed0d03e71247db9','Process\Datos\EmpresaController@InformacionTributariaEmpresaPermisos')->name('2cea7c9610a2d44beed0d03e71247db9');
    Route::post('56c9a8a7a10234fd2a81ec0de57b1aed','Process\Datos\EmpresaController@par_DatoInformacionLegalEmpresaEdit')->name('56c9a8a7a10234fd2a81ec0de57b1aed');
    Route::post('56c9a8a7a10234fd2a81ec0de57b1aedx','Process\Datos\EmpresaController@__DataEdicionEmpresa')->name('56c9a8a7a10234fd2a81ec0de57b1aedx');
    
    Route::post('fb848a64d0d1ee482fae422d4cee28f5','Process\Datos\EmpresaController@PAR_ListaDocumentosLegales')->name('fb848a64d0d1ee482fae422d4cee28f5');
    Route::post('fb848a64d0d1ee482fae422d4cee28f5x','Process\Datos\EmpresaController@Datos_GuardarInformacionNotasLegales')->name('fb848a64d0d1ee482fae422d4cee28f5x');
    Route::post('17677da95906ad32509407e2fc215d40','Process\Datos\EmpresaController@Datos_GuardarDocumentoLegalEmpresa')->name('17677da95906ad32509407e2fc215d40');

    Route::post('58541d56e8b2ee13c6c89e549431495d','Process\Datos\EmpresaController@PAR_EstadoEmpresa')->name('58541d56e8b2ee13c6c89e549431495d');
    Route::post('1f5df208a260e3a371f121915a958498','Process\Datos\EmpresaController@ListarDatosDocumentosLegalesEmpresa')->name('1f5df208a260e3a371f121915a958498');
    Route::post('ed138b092896ce0ac89db66f784eb8a5','Process\Datos\EmpresaController@Datos_enviar_documentos_legales_empresa')->name('ed138b092896ce0ac89db66f784eb8a5');

    /*Datos - Cliente*/
    Route::post('ec02ee86950011f017a0633fa4226fb8', 'Process\Datos\ClienteController@CrearCliente')->name('ec02ee86950011f017a0633fa4226fb8');
    Route::post('51f696886be0f1405d8b037a411ecc2f', 'Process\Datos\ClienteController@DatosCrearCliente')->name('51f696886be0f1405d8b037a411ecc2f');
    Route::post('da67a555d46ab2c036f6e3748baf3b59', 'Process\Datos\ClienteController@data_index_clientes')->name('da67a555d46ab2c036f6e3748baf3b59');
    Route::post('9e97ceed51da97c6cf1577d3036ddb21', 'Process\Datos\ClienteController@PAR_EstadoCliente')->name('9e97ceed51da97c6cf1577d3036ddb21');
    Route::post('ee74fed5f15671ca6a4e0e8483829abd', 'Process\Datos\ClienteController@par_DatoInformacionLegalCliente')->name('ee74fed5f15671ca6a4e0e8483829abd');
    Route::post('eb6c344f43227116eb925eb701ea5ebe', 'Process\Datos\ClienteController@par_DatoInformacionLegalClienteEdit')->name('eb6c344f43227116eb925eb701ea5ebe');
    Route::post('06cc90a8658b1b940ff15441d7ec7693', 'Process\Datos\ClienteController@DatosCrearContactoCliente')->name('06cc90a8658b1b940ff15441d7ec7693');
    Route::post('6cfa4f5bbba93bbca82cb11a70f4fa17', 'Process\Datos\ClienteController@DatosContactoClientePermisos')->name('6cfa4f5bbba93bbca82cb11a70f4fa17');
    Route::post('c7c953f8534fcaa0192f241bc39632eb', 'Process\Datos\ClienteController@ListarDatosContactoCliente')->name('c7c953f8534fcaa0192f241bc39632eb');
    Route::post('f1ed543bffea7b7c4693c5bfa13352bd', 'Process\Datos\ClienteController@CambiarEstadoContactoCliente')->name('f1ed543bffea7b7c4693c5bfa13352bd');
    Route::post('048f809eb38ef3804f84816721dc342b', 'Process\Datos\ClienteController@DatosContactoCliente')->name('048f809eb38ef3804f84816721dc342b');
    Route::post('e72747d786421729f6af0a13eb24254b', 'Process\Datos\ClienteController@EditarDatosContactoCliente')->name('e72747d786421729f6af0a13eb24254b');
    Route::post('76a9105e3c897358d4792237514bed12', 'Process\Datos\ClienteController@DocumentosLegalesCliente')->name('76a9105e3c897358d4792237514bed12');
    Route::post('1f21787583cd0eb5e1b9f0d4e0ba2ab3', 'Process\Datos\ClienteController@OpcionesDocumentosLegalesCliente')->name('1f21787583cd0eb5e1b9f0d4e0ba2ab3');
    Route::post('55fdabfe49c62e712a3940b37bfc7c5a', 'Process\Datos\ClienteController@ListarTiposDocumentosLegalesCliente')->name('55fdabfe49c62e712a3940b37bfc7c5a');
    Route::post('3fc9fee8139688ef57656399bb56bfeb', 'Process\Datos\ClienteController@GuardarDocumentoLegalClientes')->name('3fc9fee8139688ef57656399bb56bfeb');
    Route::post('4a1881be96401cbddfc6cf9e45e345a7', 'Process\Datos\ClienteController@EliminarDocumentoLegalCliente')->name('4a1881be96401cbddfc6cf9e45e345a7');
    Route::post('4a1881be96401cbddfc6cf9e45e345a7x', 'Process\Datos\ClienteController@EliminarDocumentoLegalClienteC')->name('4a1881be96401cbddfc6cf9e45e345a7x');
    Route::post('130ae586d0a98e2acf85df26a8989a1f', 'Process\Datos\ClienteController@GuardarContratoClientes')->name('130ae586d0a98e2acf85df26a8989a1f');
    Route::post('61aeda188f3b7fd07989e6a2929cc707', 'Process\Datos\ClienteController@Datos_ContratosCliente')->name('61aeda188f3b7fd07989e6a2929cc707');

    Route::post('8434c3b95f8cc57d90e742ad271cc9ef', 'Process\Datos\ClienteController@parDatosProductosCliente')->name('8434c3b95f8cc57d90e742ad271cc9ef');
    Route::post('5153d30bddab9cf4c18403f55e69523e', 'Process\Datos\ClienteController@parCrearProducto')->name('5153d30bddab9cf4c18403f55e69523e');
    Route::post('7f45ee2ba9d178bb9b41195db5652feb', 'Process\Datos\ClienteController@parEditarProductoCliente')->name('7f45ee2ba9d178bb9b41195db5652feb');
    Route::post('718ef33e5372c7ffc103e5d88b397440f', 'Process\Datos\ClienteController@parEstadoProductoCliente')->name('718ef33e5372c7ffc103e5d88b397440f');
    Route::post('014ea1ebce55e2dd20322a03bdeea0ea', 'Process\Datos\ClienteController@infoProductoCliente')->name('014ea1ebce55e2dd20322a03bdeea0ea');

    Route::post('c13a5535e89649c821fa13bef6a02276', 'Process\Datos\ClienteController@parDatosSubProductosCliente')->name('c13a5535e89649c821fa13bef6a02276');
    Route::post('efd516cc2e14b4887768abfd16fa0009', 'Process\Datos\ClienteController@parCrearSubProducto')->name('efd516cc2e14b4887768abfd16fa0009');
    Route::post('b3cbd3977a8b4cfc3748f5e7ba562212', 'Process\Datos\ClienteController@infoSubProductoCliente')->name('b3cbd3977a8b4cfc3748f5e7ba562212');
    Route::post('060066e8fdcb112a4cda83b5d1a54464', 'Process\Datos\ClienteController@parEditarSubProductoCliente')->name('060066e8fdcb112a4cda83b5d1a54464');
    Route::post('efba9be4d1cf70c2fed732333df940a7', 'Process\Datos\ClienteController@parEstadoSubProductoCliente')->name('efba9be4d1cf70c2fed732333df940a7');

    Route::post('16b026bebaf650b170971f6a70a344df', 'Process\Datos\ClienteController@parDatosProfesionalesCliente')->name('16b026bebaf650b170971f6a70a344df');
    Route::post('103c2d9b95b5e96548b8799a739c0ab3', 'Process\Datos\ClienteController@parCrearProfesionales')->name('103c2d9b95b5e96548b8799a739c0ab3');
    Route::post('0352c62cbc500b1510275903ae80cafc', 'Process\Datos\ClienteController@infoProfesionalesCliente')->name('0352c62cbc500b1510275903ae80cafc');
    Route::post('43be2eee0cc0a43dfe151d924e8c2eb8', 'Process\Datos\ClienteController@parEditarProfesionalesCliente')->name('43be2eee0cc0a43dfe151d924e8c2eb8');
    Route::post('eee6c4c4d13da7b944aa2368a8ca8568', 'Process\Datos\ClienteController@parEstadoProfesionalesCliente')->name('eee6c4c4d13da7b944aa2368a8ca8568');
    Route::post('f99f7095d5594e740dd7f30ff54bd889', 'Process\Datos\ClienteController@ListarDatosNegociaciones')->name('f99f7095d5594e740dd7f30ff54bd889');

    /*Datos - Proveedores*/
    Route::post('725547f90cf73ae242d8a6e824a8cdf2', 'Process\Datos\ProveedorController@CrearProveedor')->name('725547f90cf73ae242d8a6e824a8cdf2');
    Route::post('343c3316762934b7e54605cb120e3e80', 'Process\Datos\ProveedorController@DatosCrearProveedor')->name('343c3316762934b7e54605cb120e3e80');
    Route::post('3a0f33489251c72624ff00c1f711019d', 'Process\Datos\ProveedorController@PAR_EstadoProveedor')->name('3a0f33489251c72624ff00c1f711019d');
    Route::post('a0422a096a5a6ae243bee945ea959be6', 'Process\Datos\ProveedorController@par_DatoInformacionLegalProveedor')->name('a0422a096a5a6ae243bee945ea959be6');
    Route::post('84fc61f0d881e36d1a1eabd5ec1a54e7', 'Process\Datos\ProveedorController@par_DatoInformacionLegalProveedorEdit')->name('84fc61f0d881e36d1a1eabd5ec1a54e7');
    Route::post('5d82139bfcf53f9b4ef15c2f48e0557e', 'Process\Datos\ProveedorController@DatosCrearContactoProveedor')->name('5d82139bfcf53f9b4ef15c2f48e0557e');
    Route::post('da680e9164960293d98c57b21961dcd9', 'Process\Datos\ProveedorController@DatosContactoProveedorPermisos')->name('da680e9164960293d98c57b21961dcd9');
    Route::post('c368fa1c46b272b71940f37a56afe6ea', 'Process\Datos\ProveedorController@ListarDatosContactoProveedor')->name('c368fa1c46b272b71940f37a56afe6ea');
    Route::post('4cc8be199fdafa450a01bfdaca4dc2cc', 'Process\Datos\ProveedorController@ListarProveedores')->name('4cc8be199fdafa450a01bfdaca4dc2cc');
    Route::post('15494df889c0708fac74b4f44a14539a', 'Process\Datos\ProveedorController@PermisosDocumentoLegalesProveedores')->name('15494df889c0708fac74b4f44a14539a');
    Route::post('1d80a13f629a30163186913d4c3367f2', 'Process\Datos\ProveedorController@ListasDocumentosLegalesProveedor')->name('1d80a13f629a30163186913d4c3367f2');
    Route::post('a0c619f1a5f0f0ff82a2fc84b8015667', 'Process\Datos\ProveedorController@GuardarDocumentoLegalProveedores')->name('a0c619f1a5f0f0ff82a2fc84b8015667');
    Route::post('b31b3f4221ba18269ce95c7cdfe3e9da', 'Process\Datos\ProveedorController@DocumentosLegalesProveedor')->name('b31b3f4221ba18269ce95c7cdfe3e9da');
    Route::post('5837516f78bf56108199fbd2587ca566', 'Process\Datos\ProveedorController@EliminarDocumentoLegalProveedor')->name('5837516f78bf56108199fbd2587ca566');
    Route::post('57ae55442e0ee1d28719c7a183e99faa', 'Process\Datos\ProveedorController@GuardarDocumentoLegalProveedoresA')->name('57ae55442e0ee1d28719c7a183e99faa');
    Route::post('b43e5b2ae12f8b4ad0a490bd8b75ad9e', 'Process\Datos\ProveedorController@EliminarDocumentoLegalProveedorA')->name('b43e5b2ae12f8b4ad0a490bd8b75ad9e');
    Route::post('816b3b01f77ecc3b84ed1d6a53c0e562', 'Process\Datos\ProveedorController@DocumentosLegalesProveedorA')->name('816b3b01f77ecc3b84ed1d6a53c0e562');

    /*Datos - Bancos*/
    Route::post('85eb0e846da426a471ef8d459055eeb4', 'Process\Datos\BancoController@CrearBanco')->name('85eb0e846da426a471ef8d459055eeb4');
    Route::post('867c2ca63281b99c41e464387364a423', 'Process\Datos\BancoController@DatosCrearBanco')->name('867c2ca63281b99c41e464387364a423');
    Route::post('5496ed1991b2fec4c36adb3ef9108229', 'Process\Datos\BancoController@PAR_EstadoBanco')->name('5496ed1991b2fec4c36adb3ef9108229');
    Route::post('b091e3abd79ae2fafae652eabd8132af', 'Process\Datos\BancoController@par_DatoInformacionLegalBanco')->name('b091e3abd79ae2fafae652eabd8132af');
    Route::post('dc8e734b81e0b7f8d61b9efcfa121c98', 'Process\Datos\BancoController@par_DatoInformacionLegalBancoEdit')->name('dc8e734b81e0b7f8d61b9efcfa121c98');
    Route::post('819103a492160c879b310f7b4322f546', 'Process\Datos\BancoController@DatosCrearContactoBanco')->name('819103a492160c879b310f7b4322f546');
    Route::post('179a3aa54798ab4f8cdb08baed1b5e31', 'Process\Datos\BancoController@DatosContactoBancoPermisos')->name('179a3aa54798ab4f8cdb08baed1b5e31');
    Route::post('16d02d0282bf554c1953a31a7b147eaf', 'Process\Datos\BancoController@ListarDatosContactoBanco')->name('16d02d0282bf554c1953a31a7b147eaf');
    Route::post('c29550a8dfd7026da32057aa05daf1a2', 'Process\Datos\ProveedorController@DatosContactoProveedor')->name('c29550a8dfd7026da32057aa05daf1a2');


    /*Paginacion*/

    Route::post('1a07091c8bd4788c05a5669c9620656a', 'Process\Parametrizacion\GeneralesController@par_data_pais')->name('1a07091c8bd4788c05a5669c9620656a');
    Route::post('8542a01c936e4f6eb3d4632863eadf29', 'Process\Parametrizacion\GeneralesController@par_data_departamentos')->name('8542a01c936e4f6eb3d4632863eadf29');
    Route::post('edc5c8c69d37f53edb02b34a9879f8cc', 'Process\Parametrizacion\GeneralesController@par_data_ciudades')->name('edc5c8c69d37f53edb02b34a9879f8cc');
    Route::post('e4dfbcc3745e6366d0b8c7be35ad740f', 'Process\Parametrizacion\EmpresaController@par_data_tipodoclegales_empresa')->name('e4dfbcc3745e6366d0b8c7be35ad740f');
    Route::post('61a59bd1e7d3b713bbbce51ecd0305eb', 'Process\Parametrizacion\EmpresaController@par_data_tarifasimpuestos_empresa')->name('61a59bd1e7d3b713bbbce51ecd0305eb');
    Route::post('e7bf06d89ffbdb903846363dfd6d12bf', 'Process\Parametrizacion\PersonalController@par_data_TipoDocumento')->name('e7bf06d89ffbdb903846363dfd6d12bf');
    Route::post('b3b3ccad98d77bf5eae4db19237dd04d', 'Process\Parametrizacion\PersonalController@par_data_Eps')->name('b3b3ccad98d77bf5eae4db19237dd04d');
    Route::post('18831aff2cd46bd4ab6adb7b540f4aad', 'Process\Parametrizacion\PersonalController@par_data_Arl')->name('18831aff2cd46bd4ab6adb7b540f4aad');
    Route::post('1a2555fa12b94ce9db2dcf1ea1d2db1f', 'Process\Parametrizacion\PersonalController@par_data_FC')->name('1a2555fa12b94ce9db2dcf1ea1d2db1f');
    Route::post('ff638f7f3e06a9af155a71fbfe23055f', 'Process\Parametrizacion\PersonalController@par_data_FP')->name('ff638f7f3e06a9af155a71fbfe23055f');
    Route::post('7523ffd3246fe0ecf581bf6d3e6db8a0', 'Process\Parametrizacion\PersonalController@par_data_CC')->name('7523ffd3246fe0ecf581bf6d3e6db8a0');
    Route::post('b34638866bb8a3415d2aebd8c3d15096', 'Process\Parametrizacion\PersonalController@par_data_DL')->name('b34638866bb8a3415d2aebd8c3d15096');
    Route::post('c057421cf521e9751027594e78c2386e', 'Process\Parametrizacion\PersonalController@par_data_TR')->name('c057421cf521e9751027594e78c2386e');
    Route::post('4c07f4a7ef8e14a05118de07ec29d067', 'Process\Parametrizacion\PptoGeneralController@par_data_Ppto_Periodicidad')->name('4c07f4a7ef8e14a05118de07ec29d067');
    Route::post('34c3de05c3123e7ab1897674bca35682', 'Process\Parametrizacion\InventarioController@par_data_Inventario_Oficina')->name('34c3de05c3123e7ab1897674bca35682');
    Route::post('19793ee153c6b2600e70d0f1a8fc9908', 'Process\Parametrizacion\InventarioController@par_data_Inventario_PropietarioS')->name('19793ee153c6b2600e70d0f1a8fc9908');
    Route::post('c6f514d14a5f00b907d9a9c4694d80b0', 'Process\Parametrizacion\InventarioController@par_data_Inventario_TipoSistemas')->name('c6f514d14a5f00b907d9a9c4694d80b0');
    Route::post('25872ac4129ba6f8854799597227fa15', 'Process\Parametrizacion\InventarioController@par_data_Inventario_Marca')->name('25872ac4129ba6f8854799597227fa15');
    Route::post('67e3673ee6ba150294aa70331af758e5', 'Process\Parametrizacion\ClienteController@par_data_Cliente_DC')->name('67e3673ee6ba150294aa70331af758e5');
    Route::post('7b5bfb014d7a6d3b45363ed7103c6f93', 'Process\Parametrizacion\ClienteController@par_data_Cliente_IT')->name('7b5bfb014d7a6d3b45363ed7103c6f93');
    Route::post('2e2a27a21a9af78e28f0fec88e363e68', 'Process\Parametrizacion\ClienteController@par_data_Cliente_MP')->name('2e2a27a21a9af78e28f0fec88e363e68');
    Route::post('8233f3ec8452440a7812ee364a50a265', 'Process\Parametrizacion\ClienteController@par_data_Cliente_TC')->name('8233f3ec8452440a7812ee364a50a265');
    Route::post('4c65909d0ac551f510cdb87f6c3be9a9', 'Process\Parametrizacion\ProveedorController@par_data_Proveedor_DL')->name('4c65909d0ac551f510cdb87f6c3be9a9');
    Route::post('1b1dc1615c3e5d558ada4bd141ba4d14', 'Process\Parametrizacion\BancoController@par_data_Banco_DL')->name('1b1dc1615c3e5d558ada4bd141ba4d14');
    Route::post('b35cb79f28bbf77c50770e10c72b5bb1', 'Process\Parametrizacion\BancoController@par_data_Banco_TP')->name('b35cb79f28bbf77c50770e10c72b5bb1');
    Route::post('b5a618ec999c760f01da31e4c14e5cd6', 'Process\Parametrizacion\BancoController@par_data_Banco_TM')->name('b5a618ec999c760f01da31e4c14e5cd6');
    Route::post('1db01ea34106a6e260e2c85798d181aa', 'Process\Parametrizacion\SistemasController@par_data_Sistemas')->name('1db01ea34106a6e260e2c85798d181aa');
    Route::post('3e544397b71650bda6c0a0e08536bb98', 'Process\Parametrizacion\TraficoController@par_data_Trafico_TB')->name('3e544397b71650bda6c0a0e08536bb98');
    Route::post('dd0dc8bb54f8aacad59082dbe7d31936', 'Process\Parametrizacion\TraficoController@par_data_Trafico_TT')->name('dd0dc8bb54f8aacad59082dbe7d31936');

    Route::post('69eb1f4a446576ab13051b377ba246ca', 'Process\Datos\EmpresaController@ConsultarNotificadosDocumento')->name('69eb1f4a446576ab13051b377ba246ca');
    Route::post('fd625194724a0f13f6605de2581df425', 'Process\Datos\EmpresaController@ConsultarNotificadosTI')->name('fd625194724a0f13f6605de2581df425');
    Route::post('9b01053b60f0fc25e8bb97759f46db6d', 'Process\Datos\EmpresaController@GuardarNuevosNoticiados')->name('9b01053b60f0fc25e8bb97759f46db6d');
    Route::post('e8c9605df39f6efdc3615a9c3adaf4d7', 'Process\Datos\EmpresaController@GuardarNuevosNoticiadosTI')->name('e8c9605df39f6efdc3615a9c3adaf4d7');
    Route::post('f1327f6684072f7775b0d0507f5b9b83', 'Process\Datos\EmpresaController@EliminarNotificadoDocumento')->name('f1327f6684072f7775b0d0507f5b9b83');
    Route::post('5f91146476f213d88853a6d9accadafc', 'Process\Datos\EmpresaController@EliminarNotificadoTI')->name('5f91146476f213d88853a6d9accadafc');
    Route::post('ac7beee27293ee4f34cd88cff8f7232e', 'Process\Datos\EmpresaController@PAR_ListaTI')->name('ac7beee27293ee4f34cd88cff8f7232e');
    Route::post('2081d6c7c206dc988fefb95620debe4d', 'Process\Datos\EmpresaController@Datos_GuardarTIEmpresa')->name('2081d6c7c206dc988fefb95620debe4d');
    Route::post('0593d1d809053eac602093d18fe0abe6', 'Process\Datos\EmpresaController@ListarDatosTIEmpresa')->name('0593d1d809053eac602093d18fe0abe6');
    Route::post('3bd98678754093f3968e2893922db5d6', 'Process\Datos\EmpresaController@ListarUnidadesUsuario')->name('3bd98678754093f3968e2893922db5d6');
    Route::post('0be4b15c2e512dc6a54f4d229c2ea802', 'Process\Datos\ClienteController@ImpuestoEmpresa')->name('0be4b15c2e512dc6a54f4d229c2ea802');
    Route::post('22d1051eb149a7fac2fd13e5ce33086e', 'Process\Datos\ClienteController@GuardarNegociacionCliente')->name('22d1051eb149a7fac2fd13e5ce33086e');
    Route::post('255513e4741b758f6f3865b351b701e6', 'Process\Datos\ClienteController@DatosNegociacionesClientes')->name('255513e4741b758f6f3865b351b701e6');
    Route::post('a4d1e79bb9478ac3218579478499dba6', 'Process\Datos\ClienteController@CambiarEstadoNegociacionCliente')->name('a4d1e79bb9478ac3218579478499dba6');
    Route::post('dd29e0bc46d368699976f1c71e14da27', 'Process\Datos\ClienteController@Datos_ListarDatosContrato')->name('dd29e0bc46d368699976f1c71e14da27');

    Route::post('85b6302504999f93be1aa8cb3c414e12', 'Process\Datos\EmpresaController@EstadoImpuestoEmpresa')->name('85b6302504999f93be1aa8cb3c414e12');

    Route::post('56d1bf7e94fe8a2f989557644aa30ab9', 'Process\Datos\EmpresaController@InformacionUnidadesNegocioEmpresa')->name('56d1bf7e94fe8a2f989557644aa30ab9');
    Route::post('b42147e1fa637c7e83a5dc9e152d7795', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Und')->name('b42147e1fa637c7e83a5dc9e152d7795');
    Route::post('c7ffbb5103c450d30b3ebb2cd7ab9135', 'Process\Datos\EmpresaController@LogoEmpresa')->name('c7ffbb5103c450d30b3ebb2cd7ab9135');
    Route::post('21d0b65606feec125c928029698dfdc9', 'Process\Datos\EmpresaController@GuardarUnidadNegocioEmpresa')->name('21d0b65606feec125c928029698dfdc9');
    Route::post('6bb0db1452c00a0d3115426920682110', 'Process\Datos\EmpresaController@EstadoUnidadesNegocioEmpresa')->name('6bb0db1452c00a0d3115426920682110');
    Route::post('57b91d5dae28457fcbfdd435ff1e3168', 'Process\Datos\EmpresaController@DatosEditar_UnidadNegocioEmpresa')->name('57b91d5dae28457fcbfdd435ff1e3168');
    Route::post('5fcaf6a6bb4536fa609afed85965f19b', 'Process\Datos\EmpresaController@Datos_UnidadNegocioEmpresa')->name('5fcaf6a6bb4536fa609afed85965f19b');
    Route::post('0273c8d691adf8d426f672e7ccbda192', 'Process\Datos\EmpresaController@Datos_ListarUnidadesNegocio')->name('0273c8d691adf8d426f672e7ccbda192');
    Route::post('f3e3c0ebfad643927c8abc475cbaef5d', 'Process\Datos\EmpresaController@GuardarAreaUnidadNegocioEmpresa')->name('f3e3c0ebfad643927c8abc475cbaef5d');
    Route::post('36fa0e91aa7c1c3fb0233bb5e60c1541', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Areas')->name('36fa0e91aa7c1c3fb0233bb5e60c1541');
    Route::post('35c9b77cbd2dab86d9f8c7a470087b65', 'Process\Datos\EmpresaController@EstadoAreaUnidadesNegocioEmpresa')->name('35c9b77cbd2dab86d9f8c7a470087b65');
    Route::post('78e504495738bba859363168e08d853a', 'Process\Datos\EmpresaController@Datos_AreaUnidadNegocioEmpresa')->name('78e504495738bba859363168e08d853a');
    Route::post('c4a60a45727a2fc5564bb809e88e1b43', 'Process\Datos\EmpresaController@DatosEditar_AreaUnidadNegocioEmpresa')->name('c4a60a45727a2fc5564bb809e88e1b43');
    Route::post('e6dec7b49bfaca5df94bc6ca05d523b4', 'Process\Datos\EmpresaController@Datos_ListarAreaUnidadesNegocio')->name('e6dec7b49bfaca5df94bc6ca05d523b4');
    Route::post('3702c3861db3bf32a4b63181ab147218', 'Process\Datos\EmpresaController@Datos_ReorganizarAreas')->name('3702c3861db3bf32a4b63181ab147218');
    Route::post('9735e9fbf66f3e9cc83018b42cdad60c', 'Process\Datos\EmpresaController@GuardarCargoEmpresa')->name('9735e9fbf66f3e9cc83018b42cdad60c');
    Route::post('3feb8e00afde0455802dc1385f14723e', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Cargos')->name('3feb8e00afde0455802dc1385f14723e');
    Route::post('e60a96bed74b2e45e85d82d423e7e645', 'Process\Datos\EmpresaController@Datos_CargosAreaUnidadNegocioEmpresa')->name('e60a96bed74b2e45e85d82d423e7e645');
    Route::post('bca4b313fa63c36b97ace30b9c13127b', 'Process\Datos\EmpresaController@DatosEditar_CargoAreaUnidadNegocioEmpresa')->name('bca4b313fa63c36b97ace30b9c13127b');
    Route::post('75945dcf9e7cc447f3c6c5bac0a4de03', 'Process\Datos\EmpresaController@ListarPptoGeneral')->name('75945dcf9e7cc447f3c6c5bac0a4de03');
    Route::post('75945dcf9e7cc447f3c6c5bac0a4de03x', 'Process\Datos\EmpresaController@ListarPptoPersonal')->name('75945dcf9e7cc447f3c6c5bac0a4de03x');
    Route::post('13abf4228e744df3ab18132f7f8b1ea0', 'Process\Datos\EmpresaController@ListarGruposJuntaDirectiva')->name('13abf4228e744df3ab18132f7f8b1ea0');
    Route::post('e0e22216fa537babb697f9af6aadccee', 'Process\Datos\EmpresaController@ListarYearPptoGeneralNew')->name('e0e22216fa537babb697f9af6aadccee');
    Route::post('1a901d41fc1764f344620488904fc4d9', 'Process\Datos\EmpresaController@ListarYearPptoGeneralNew')->name('1a901d41fc1764f344620488904fc4d9');
    Route::post('1a901d41fc1764f344620488904fc4d9X', 'Process\Datos\EmpresaController@ListarYearPptoGeneralNew')->name('1a901d41fc1764f344620488904fc4d9X');
    Route::post('efde6af2f51148a5f72b5cdf935a5155', 'Process\Datos\EmpresaController@GuardarGrupoPptoGeneral')->name('efde6af2f51148a5f72b5cdf935a5155');
    Route::post('efde6af2f51148a5f72b5cdf935a5155x', 'Process\Datos\EmpresaController@GuardarGrupoPptoPersonal')->name('efde6af2f51148a5f72b5cdf935a5155x');
    Route::post('efde6af2f51148a5f72b5cdf935a5155xx', 'Process\Datos\EmpresaController@GuardarIngresoPptoPersonal')->name('efde6af2f51148a5f72b5cdf935a5155xx');
    Route::post('a185344624d211a147742da2f0d6f056', 'Process\Datos\EmpresaController@ListarGruposPptoGeneral')->name('a185344624d211a147742da2f0d6f056');
    Route::post('a185344624d211a147742da2f0d6f056x', 'Process\Datos\EmpresaController@ListarGruposPersonal')->name('a185344624d211a147742da2f0d6f056x');
    Route::post('7a75df48c21b103b6be60ca0d7ce8aa8', 'Process\Datos\EmpresaController@GuardarItemGrupoPptoGeneral')->name('7a75df48c21b103b6be60ca0d7ce8aa8');
    Route::post('7a75df48c21b103b6be60ca0d7ce8aa8x', 'Process\Datos\EmpresaController@GuardarItemGrupoPptoPersonal')->name('7a75df48c21b103b6be60ca0d7ce8aa8x');
    Route::post('6c5bba3f8a4b1d4160613130a0320ad4', 'Process\Datos\EmpresaController@InformacionPptoGeneral_Meses')->name('6c5bba3f8a4b1d4160613130a0320ad4');
    Route::post('6c5bba3f8a4b1d4160613130a0320ad4x', 'Process\Datos\EmpresaController@InformacionPptoPersonal_Meses')->name('6c5bba3f8a4b1d4160613130a0320ad4x');
    Route::post('6c5bba3f8a4b1d4160613130a0320ad4xx', 'Process\Datos\EmpresaController@GuardarItemGrupoPptoPersonalMes')->name('6c5bba3f8a4b1d4160613130a0320ad4xx');
    Route::post('6c5bba3f8a4b1d4160613130a0320ad4xxx', 'Process\Datos\EmpresaController@GuardarItemGrupoPptoPersonalMesC')->name('6c5bba3f8a4b1d4160613130a0320ad4xxx');
    Route::post('6c5bba3f8a4b1d4160613130a0320ad4xxxx', 'Process\Datos\EmpresaController@GuardarItemGrupoPptoPersonalMesCE')->name('6c5bba3f8a4b1d4160613130a0320ad4xxxx');
    Route::post('f773ebc56040ee627e91e6dee2aec0b9', 'Process\Datos\EmpresaController@GuardarEmpleadoPptoGeneral')->name('f773ebc56040ee627e91e6dee2aec0b9');
    Route::post('4eaa751d46f85b35becdcc15f38e351e', 'Process\Datos\EmpresaController@ConsultarItemPptoGeneral')->name('4eaa751d46f85b35becdcc15f38e351e');
    Route::post('30ad113a60b60e4d84733bcc6a1a2d5d', 'Process\Datos\EmpresaController@EditarItemPptoGeneral')->name('30ad113a60b60e4d84733bcc6a1a2d5d');
    Route::post('bdbdc17ecfdadbb74e64db591f20ae7a', 'Process\Datos\EmpresaController@ConsultarInformacionGrupoPptoGeneral')->name('bdbdc17ecfdadbb74e64db591f20ae7a');
    Route::post('8a0a013f55c26a869f0647029dc92a39', 'Process\Datos\EmpresaController@GuardarEditarGrupoPptoGeneral')->name('8a0a013f55c26a869f0647029dc92a39');
    Route::post('0ae83b997ca82b0b86f4260cdc1735ae', 'Process\Datos\EmpresaController@InformacionItemUnidadMes')->name('0ae83b997ca82b0b86f4260cdc1735ae');
    Route::post('0ae83b997ca82b0b86f4260cdc1735aeNom', 'Process\Datos\EmpresaController@InformacionItemUnidadMesNom')->name('0ae83b997ca82b0b86f4260cdc1735aeNom');
    Route::post('126649b2063cc283960c69c0fd21bfc1', 'Process\Datos\EmpresaController@ItemPptoGeneral_UnidadMes')->name('126649b2063cc283960c69c0fd21bfc1');
    Route::post('63e8883db56366fddc4eaab23774439e', 'Process\Datos\EmpresaController@EliminarItemPptoGeneral')->name('63e8883db56366fddc4eaab23774439e');
    Route::post('782415f10af42fdf521a28d6fc461ada', 'Process\Datos\EmpresaController@EliminarGrupoPptoGeneral')->name('782415f10af42fdf521a28d6fc461ada');
    Route::post('ec16dab1fa1802e48843298b7946d7b4', 'Process\Datos\EmpresaController@Datos_ReorganizarGruposPptoGeneral')->name('ec16dab1fa1802e48843298b7946d7b4');
    Route::post('ec16dab1fa1802e48843298b7946d7b4x', 'Process\Datos\EmpresaController@Datos_ReorganizarGruposPptoGeneral')->name('ec16dab1fa1802e48843298b7946d7b4x');
    Route::post('28b01a9e6699b2512a06b166274f9ddb', 'Process\Datos\EmpresaController@ListarItesmPptoGeneral')->name('28b01a9e6699b2512a06b166274f9ddb');
    Route::post('5d78f94710898c5881b2ce0d1653e738', 'Process\Datos\EmpresaController@Datos_ReorganizarItemsGruposPptoGeneral')->name('5d78f94710898c5881b2ce0d1653e738');
    Route::post('23588c91b1befe32c7b2a2d0c03e9fc3', 'Process\Datos\EmpresaController@GuardarPptoGeneral')->name('23588c91b1befe32c7b2a2d0c03e9fc3');
    Route::post('23588c91b1befe32c7b2a2d0c03e9fc3x', 'Process\Datos\EmpresaController@GuardarPptoPersonal')->name('23588c91b1befe32c7b2a2d0c03e9fc3x');
    Route::post('1d4b2b4c964a407040db298b66704f15', 'Process\Datos\EmpresaController@GuardarJuntaDirectiva')->name('1d4b2b4c964a407040db298b66704f15');
    Route::post('00f5954b08365611173d9d497df768c7', 'Process\Datos\EmpresaController@OrganizarGruposJuntaDirectiva')->name('00f5954b08365611173d9d497df768c7');
    Route::post('5e3f4c1ae5fb38e867802d4698e1dd07', 'Process\Datos\EmpresaController@InformacionPersonal')->name('5e3f4c1ae5fb38e867802d4698e1dd07');
    Route::post('fe917cc67051ef277e0537cbbb2dfd42', 'Process\Datos\EmpresaController@ListarInformacionPersonal')->name('fe917cc67051ef277e0537cbbb2dfd42');
    Route::post('7c96975ed0f163ba43912ed1ac1a4a7d', 'Process\Datos\EmpresaController@ListarDatosNuevoPersonal')->name('7c96975ed0f163ba43912ed1ac1a4a7d');
    Route::post('7c96975ed0f163ba43912ed1ac1a4a7dx', 'Process\Datos\EmpresaController@ListarMotivosRetiroEmpleado')->name('7c96975ed0f163ba43912ed1ac1a4a7dx');
    Route::post('c20858eb92db585c9f8b4ba1c0873dd6', 'Process\Datos\EmpresaController@GuardarDatosRetiroEmpleado')->name('c20858eb92db585c9f8b4ba1c0873dd6');
    Route::post('ad61ab06409beca7e98598b52ecff7e7', 'Process\Datos\EmpresaController@Datos_CargosAreasUnidadNegocioEmpresa')->name('ad61ab06409beca7e98598b52ecff7e7');
    Route::post('9e97c272e3180e9b5aca0d47aaa5e8a8', 'Process\Datos\EmpresaController@GuardarDatosBasicosPersonal')->name('9e97c272e3180e9b5aca0d47aaa5e8a8');
    Route::post('add4466ad7992d3438200847948b078f', 'Process\Datos\EmpresaController@Empleado_InformacionBasica')->name('add4466ad7992d3438200847948b078f');
    Route::post('68b27749a69090c4bceba332784adbdd', 'Process\Datos\EmpresaController@Editar_Empleado_InformacionBasica')->name('68b27749a69090c4bceba332784adbdd');
    Route::post('063db1b7ccf54795e45622a907632c25', 'Process\Datos\EmpresaController@GuardarAsignadoJD')->name('063db1b7ccf54795e45622a907632c25');
    Route::post('61d6673ab6f1cd642dfd10fc32716068', 'Process\Datos\EmpresaController@EliminarAsignadoJD')->name('61d6673ab6f1cd642dfd10fc32716068');
    Route::post('61d6673ab6f1cd642dfd10fc32716068x', 'Process\Datos\EmpresaController@EliminarGrupoJD')->name('61d6673ab6f1cd642dfd10fc32716068x');
    Route::post('7e0ac254a1eb7b8287cddc56abc4c926', 'Process\Datos\EmpresaController@GuardarDatosBasicosPersonalEditar')->name('7e0ac254a1eb7b8287cddc56abc4c926');
    Route::post('859d9b4bdf095b491b2e94021de50eee', 'Process\Datos\EmpresaController@ListarContactosPersonal')->name('859d9b4bdf095b491b2e94021de50eee');
    Route::post('1c2ca72333b2274a96618718f9fdd25d', 'Process\Datos\EmpresaController@GuardarNuevoContactoEmergenciaEmpleado')->name('1c2ca72333b2274a96618718f9fdd25d');
    Route::post('0c03981098644b245e377dade5d3f5de', 'Process\Datos\EmpresaController@InformacionContactoEmergenciaEmpleado')->name('0c03981098644b245e377dade5d3f5de');
    Route::post('9dda97055298f49eeee474ed68de8bde', 'Process\Datos\EmpresaController@GuardarEditarContactoEmergenciaEmpleado')->name('9dda97055298f49eeee474ed68de8bde');
    Route::post('1e89e2039039c9c368e6b0d08b2c20f7', 'Process\Datos\EmpresaController@EliminarContactoEmergenciaEmpleado')->name('1e89e2039039c9c368e6b0d08b2c20f7');
    Route::post('0502c1a98931b0d2c56bb0135356199d', 'Process\Datos\EmpresaController@Empleado_InformacionEmpresarial')->name('0502c1a98931b0d2c56bb0135356199d');
    Route::post('b21e150bbfbd5bead19162afd4d29b7d', 'Process\Datos\EmpresaController@Editar_Empleado_InformacionEmpresarial')->name('b21e150bbfbd5bead19162afd4d29b7d');
    Route::post('4eaa751d46f85b35becdcc15f38e351exx', 'Process\Datos\EmpresaController@DatosEmpleadoPptoGeneral')->name('4eaa751d46f85b35becdcc15f38e351exx');
    Route::post('4eaa751d46f85b35becdcc15f38e351exxa', 'Process\Datos\EmpresaController@UpdateDatosPptoGeneralEmpleado')->name('4eaa751d46f85b35becdcc15f38e351exxa');
    Route::post('c565d91da767ff2669b7a0391b4c499c', 'Process\Datos\EmpresaController@_ListarRiesgosLaborales')->name('c565d91da767ff2669b7a0391b4c499c');
    Route::post('82298b4c96cbd0e5a7ceb3f73d2427a6', 'Process\Datos\EmpresaController@GuardarRiesgosEmpresa')->name('82298b4c96cbd0e5a7ceb3f73d2427a6');
    Route::post('c898743432a05062f5c16fca15b3cc6a', 'Process\Datos\EmpresaController@EmpresaRiesgoLaboral')->name('c898743432a05062f5c16fca15b3cc6a');
    Route::post('33be5ce5ea5c05081bab897d1f146f9b', 'Process\Datos\EmpresaController@EliminarRiesgoLaboralEmpresa')->name('33be5ce5ea5c05081bab897d1f146f9b');

    Route::post('56d1bf7e94fe8a2f989557644aa30ab9', 'Process\Datos\EmpresaController@InformacionUnidadesNegocioEmpresa')->name('56d1bf7e94fe8a2f989557644aa30ab9');
    //Route::post('b42147e1fa637c7e83a5dc9e152d7795', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Und')->name('b42147e1fa637c7e83a5dc9e152d7795');
    Route::post('c7ffbb5103c450d30b3ebb2cd7ab9135', 'Process\Datos\EmpresaController@LogoEmpresa')->name('c7ffbb5103c450d30b3ebb2cd7ab9135');
    Route::post('1965d305dda1555551d46f6c51070e55', 'Process\Datos\EmpresaController@PlanNegociosUnidad')->name('1965d305dda1555551d46f6c51070e55');
    Route::post('a73c2b2af2ae8854397ce6c6b610f3e9', 'Process\Datos\EmpresaController@Datos_ListarClientesEmpresa')->name('a73c2b2af2ae8854397ce6c6b610f3e9');
    Route::post('42bc9fb450f0d97a1e29239320775a3f', 'Process\Datos\EmpresaController@GuardarPlanNegocios')->name('42bc9fb450f0d97a1e29239320775a3f');
    Route::post('927b21b9d7ee4fd8c73810cf199e0013', 'Process\Datos\EmpresaController@Datos_ListarClientesEmpresa_FillYear')->name('927b21b9d7ee4fd8c73810cf199e0013');
    Route::post('9d0ebe9778ee8a638a126ce099c73463', 'Process\Datos\EmpresaController@ListarDatosPlanNegocioUnidad')->name('9d0ebe9778ee8a638a126ce099c73463');
    Route::post('cb33fe7061135946bcd302775fd26d17', 'Process\Datos\EmpresaController@DetallePlanNegocioUnidad')->name('cb33fe7061135946bcd302775fd26d17');
    Route::post('c221b1d93e2f65079c9b355a43e25752', 'Process\Datos\EmpresaController@GuardarEditarPlanNegocios')->name('c221b1d93e2f65079c9b355a43e25752');


    Route::post('21d0b65606feec125c928029698dfdc9', 'Process\Datos\EmpresaController@GuardarUnidadNegocioEmpresa')->name('21d0b65606feec125c928029698dfdc9');
    Route::post('6bb0db1452c00a0d3115426920682110', 'Process\Datos\EmpresaController@EstadoUnidadesNegocioEmpresa')->name('6bb0db1452c00a0d3115426920682110');
    Route::post('57b91d5dae28457fcbfdd435ff1e3168', 'Process\Datos\EmpresaController@DatosEditar_UnidadNegocioEmpresa')->name('57b91d5dae28457fcbfdd435ff1e3168');
    Route::post('5fcaf6a6bb4536fa609afed85965f19b', 'Process\Datos\EmpresaController@Datos_UnidadNegocioEmpresa')->name('5fcaf6a6bb4536fa609afed85965f19b');
    Route::post('0273c8d691adf8d426f672e7ccbda192', 'Process\Datos\EmpresaController@Datos_ListarUnidadesNegocio')->name('0273c8d691adf8d426f672e7ccbda192');
    Route::post('f3e3c0ebfad643927c8abc475cbaef5d', 'Process\Datos\EmpresaController@GuardarAreaUnidadNegocioEmpresa')->name('f3e3c0ebfad643927c8abc475cbaef5d');
    Route::post('36fa0e91aa7c1c3fb0233bb5e60c1541', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Areas')->name('36fa0e91aa7c1c3fb0233bb5e60c1541');
    Route::post('35c9b77cbd2dab86d9f8c7a470087b65', 'Process\Datos\EmpresaController@EstadoAreaUnidadesNegocioEmpresa')->name('35c9b77cbd2dab86d9f8c7a470087b65');
    Route::post('78e504495738bba859363168e08d853a', 'Process\Datos\EmpresaController@Datos_AreaUnidadNegocioEmpresa')->name('78e504495738bba859363168e08d853a');
    Route::post('c4a60a45727a2fc5564bb809e88e1b43', 'Process\Datos\EmpresaController@DatosEditar_AreaUnidadNegocioEmpresa')->name('c4a60a45727a2fc5564bb809e88e1b43');
    Route::post('e6dec7b49bfaca5df94bc6ca05d523b4', 'Process\Datos\EmpresaController@Datos_ListarAreaUnidadesNegocio')->name('e6dec7b49bfaca5df94bc6ca05d523b4');
    Route::post('3702c3861db3bf32a4b63181ab147218', 'Process\Datos\EmpresaController@Datos_ReorganizarAreas')->name('3702c3861db3bf32a4b63181ab147218');
    Route::post('9735e9fbf66f3e9cc83018b42cdad60c', 'Process\Datos\EmpresaController@GuardarCargoEmpresa')->name('9735e9fbf66f3e9cc83018b42cdad60c');
    Route::post('3feb8e00afde0455802dc1385f14723e', 'Process\Datos\EmpresaController@ListarDatosEmpresa_Cargos')->name('3feb8e00afde0455802dc1385f14723e');
    Route::post('e60a96bed74b2e45e85d82d423e7e645', 'Process\Datos\EmpresaController@Datos_CargosAreaUnidadNegocioEmpresa')->name('e60a96bed74b2e45e85d82d423e7e645');
    Route::post('5ab3cc79d2f6f51f12fcb2a8351530d1', 'Process\Datos\EmpresaController@GuardarDatosEmpresarialesPersonalEditar')->name('5ab3cc79d2f6f51f12fcb2a8351530d1');
    Route::post('c96ff5dbc642930b5598db41d663ed68', 'Process\Datos\EmpresaController@ListarDocumentosLegalesEmpleado')->name('c96ff5dbc642930b5598db41d663ed68');
    Route::post('9a06cc6bbf157dd0307346968b474bfa', 'Process\Datos\EmpresaController@ListarTiposDocumentoEmpleado')->name('9a06cc6bbf157dd0307346968b474bfa');
    Route::post('9f835a38b25d067bd057e42ec75b4cb4', 'Process\Datos\EmpresaController@GuardarDocumentoLegalEmpleado')->name('9f835a38b25d067bd057e42ec75b4cb4');
    Route::post('47024a85e0fe10c7fd13a333798d8bc9', 'Process\Datos\EmpresaController@EliminarDocumentoLegalEmpleado')->name('47024a85e0fe10c7fd13a333798d8bc9');
    Route::post('0d9d918c942f005e110e3ce4bdae535b', 'Process\Datos\EmpresaController@ListarDocumentosAdicionalesEmpleado')->name('0d9d918c942f005e110e3ce4bdae535b');
    Route::post('2f3e999c7940bb57aa988ea9a37cfbfe', 'Process\Datos\EmpresaController@GuardarDocumentoAdicionalEmpleado')->name('2f3e999c7940bb57aa988ea9a37cfbfe');
    Route::post('6591741b5ebede404e22bdcd3447b3d6', 'Process\Datos\EmpresaController@EliminarDocumentoAdicionalEmpleado')->name('6591741b5ebede404e22bdcd3447b3d6');
    Route::post('029d87650698f1196ace43b95a583b28', 'Process\Datos\InventarioController@ListarPropietariosInventarioGeneral')->name('029d87650698f1196ace43b95a583b28');
    Route::post('a4c94342420f9866f555f621dfc9f324', 'Process\Datos\InventarioController@ListarDatosInventarioGeneral')->name('a4c94342420f9866f555f621dfc9f324');
    Route::post('38196be4415c0ad5887a69f1ec0b80b3', 'Process\Datos\InventarioController@GuardarInventarioGeneral')->name('38196be4415c0ad5887a69f1ec0b80b3');
    Route::post('9c80da500c15fcd45c6362d68846f6c2', 'Process\Datos\InventarioController@ConsultarInformacionItemInventarioGeneral')->name('9c80da500c15fcd45c6362d68846f6c2');
    Route::post('e745798faca6ce561697ef372bda66a4', 'Process\Datos\InventarioController@GuardarEditarInventarioGeneral')->name('e745798faca6ce561697ef372bda66a4');
    Route::post('fd06e12130f8239160bb06f590fb7ea7', 'Process\Datos\InventarioController@ListarDatosInventarioSistemas')->name('fd06e12130f8239160bb06f590fb7ea7');
    Route::post('b4f099666efd7f25099c59ac581d7b6b', 'Process\Datos\InventarioController@GuardarInventarioGeneralSistemas')->name('b4f099666efd7f25099c59ac581d7b6b');
    Route::post('3906c5426d8ccc71220cf93921c73cd4', 'Process\Datos\InventarioController@ListarItemsInventarioSistemas')->name('3906c5426d8ccc71220cf93921c73cd4');
    Route::post('73fb18fc88dbc317a0273cb63e04d2d3', 'Process\Datos\InventarioController@ConsultarInformacionItemInventarioSistemas')->name('73fb18fc88dbc317a0273cb63e04d2d3');
    Route::post('b427e88da313d45d175b759d3030f2b7', 'Process\Datos\InventarioController@GuardarEditarInventarioGeneralSistemas')->name('b427e88da313d45d175b759d3030f2b7');
    
    Route::post('fd4d81172fccc2d8afba81789cb98b8c','Process\Datos\InventarioController@DataInventarioGeneralR')->name('fd4d81172fccc2d8afba81789cb98b8c');
    
    Route::post('dde290d5c19f91265f46e3f3eff5c537', 'Process\Datos\SSAccesosController@ListarDatosGeneralesAccesos')->name('dde290d5c19f91265f46e3f3eff5c537');
    Route::post('a585105918f6ada2e7879276a1d9b224', 'Process\Datos\SSAccesosController@GuardarAcceso')->name('a585105918f6ada2e7879276a1d9b224');
    Route::post('2623fbd0eb664d8e3834b1f60b9ea2f3', 'Process\Datos\SSAccesosController@ListarDatosBibliotecaAccesos')->name('2623fbd0eb664d8e3834b1f60b9ea2f3');
    Route::post('195a6f0a30d91f0a8ef30d8d96db766e', 'Process\Datos\SSAccesosController@EliminarAccesoBiblioteca')->name('195a6f0a30d91f0a8ef30d8d96db766e');
    Route::post('0d2716b2bf957ed02b129d27da9c93a7', 'Process\Datos\SSAccesosController@ConsultarInformacionItemAcceso')->name('0d2716b2bf957ed02b129d27da9c93a7');
    Route::post('d2a4bc1d3ca66c2db5b6c6d0229485be', 'Process\Datos\SSAccesosController@GuardarEditarAcceso')->name('d2a4bc1d3ca66c2db5b6c6d0229485be');
    Route::post('b01174c89fa348ffb1c3956fa2efb32c', 'Process\Datos\SSAccesosController@b01174c89fa348ffb1c3956fa2efb32c')->name('b01174c89fa348ffb1c3956fa2efb32c');



/*********************************************
************** ADMINISTRACION ****************
*********************************************/

    /* LEGAL */
    Route::get('d93b739c5a3b35e8f62570f0bad59cc3','Process\Administracion\EmpresaController@index')->name('d93b739c5a3b35e8f62570f0bad59cc3');
    Route::get('39474d007f559fae2618c8b421ce2f54/{id}','Process\Administracion\EmpresaController@AdministraciónEmpresa')->name('39474d007f559fae2618c8b421ce2f54');
    Route::post('befd9feb01c8dd7733bbb50450e4a144','Process\Administracion\EmpresaController@indexAdministracionLegal')->name('befd9feb01c8dd7733bbb50450e4a144');
    Route::post('3441d5e80a28e31e28e05d5dbbaf9fea','Process\Administracion\EmpresaController@datosLegalEmpresa')->name('3441d5e80a28e31e28e05d5dbbaf9fea');
    Route::post('bd538bd8f381d024c4c9ad76acd24002','Process\Administracion\EmpresaController@indexAdministracionUnidadesNegocio')->name('bd538bd8f381d024c4c9ad76acd24002');
    Route::post('50da6dc12efa69e2f79b5340c40b72af','Process\Administracion\EmpresaController@ListarClientesEmpresa')->name('50da6dc12efa69e2f79b5340c40b72af');
    Route::post('eb1fe1549c1280a128be51d45b20f7bc','Process\Administracion\EmpresaController@PlanNegociosEmpresa')->name('eb1fe1549c1280a128be51d45b20f7bc');
    Route::post('9a105ef457238a72377bebe110004082','Process\Administracion\EmpresaController@Administracion_ListarClientesUnidad')->name('9a105ef457238a72377bebe110004082');
    Route::post('189b9126f1be9a4d44de477d06dd3adf','Process\Administracion\EmpresaController@Administracion_ListarDatosPlanNegocioUnidad')->name('189b9126f1be9a4d44de477d06dd3adf');
    Route::post('9d2691da3b2061acff08a851d30d32a4','Process\Administracion\EmpresaController@indexAdministracionClientes')->name('9d2691da3b2061acff08a851d30d32a4');
    Route::post('0dede4f86fda346ea24df290c5c2231d','Process\Administracion\EmpresaController@Administracion_ClientesGeneral')->name('0dede4f86fda346ea24df290c5c2231d');
    Route::post('4172138ad41ab08d69ed4e7a4308d670','Process\Administracion\EmpresaController@Administracion_DatosDocumentosLegalesClientes')->name('4172138ad41ab08d69ed4e7a4308d670');
    Route::post('786e0b8dbfd6d4384502a3f03b017a77','Process\Administracion\EmpresaController@Administracion_ListarClientesUnidadNegocio')->name('786e0b8dbfd6d4384502a3f03b017a77');
    Route::post('6248598e4416d3cf26af83c9e57226a1','Process\Administracion\EmpresaController@Administracion_DocumentosLegalesCliente')->name('6248598e4416d3cf26af83c9e57226a1');
    Route::post('19c1201e33144097f0c49ac02e809358','Process\Administracion\EmpresaController@Administracion_Datos_ContratosCliente')->name('19c1201e33144097f0c49ac02e809358');
    Route::post('d17d33cb38dbdddf8d1672bcfc6c816a','Process\Administracion\EmpresaController@Administracion_ListarDatosContactoCliente')->name('d17d33cb38dbdddf8d1672bcfc6c816a');
    Route::post('feeccf469cb92abd3ab470e35365d75c','Process\Administracion\EmpresaController@Administracion_DatosNegociacionesClientes')->name('feeccf469cb92abd3ab470e35365d75c');
    Route::post('53312c8a2ba4174f697f050078e1fac0','Process\Administracion\EmpresaController@indexAdministracionProveedores')->name('53312c8a2ba4174f697f050078e1fac0');
    Route::post('8e351738adac64135f2102e43cb467d4','Process\Administracion\EmpresaController@Administracion_ListarProveedores')->name('8e351738adac64135f2102e43cb467d4');
    Route::post('e66f1ba59bb6a7d482dfa01a8faa2099','Process\Administracion\EmpresaController@Administracion_DatosDocumentosProveedores')->name('e66f1ba59bb6a7d482dfa01a8faa2099');
    Route::post('7c3e92ff602fdd62a039c250cec2ec56','Process\Administracion\EmpresaController@Administracion_DocumentosLegalesProveedor')->name('7c3e92ff602fdd62a039c250cec2ec56');
    Route::post('ea538ac0ca12ce557019e0d38aa3b92e','Process\Administracion\EmpresaController@Administracion_DocumentosLegalesProveedorA')->name('ea538ac0ca12ce557019e0d38aa3b92e');
    Route::post('021341d214adda31ad246d6af0ecd3b1','Process\Administracion\EmpresaController@Administracion_ListarDatosContactoProveedor')->name('021341d214adda31ad246d6af0ecd3b1');

    /* CONTABILIDAD */
    Route::get('0e0973bff4eb188c176093009025eb79','Process\Administracion\ContabilidadController@index')->name('0e0973bff4eb188c176093009025eb79');

    /* FINANCIERA */
    Route::get('f6ff70ca67c797a58f3acaf06e552835','Process\Administracion\FinancieraController@index')->name('f6ff70ca67c797a58f3acaf06e552835');

    /* RECURSOS HUMANOS */
    Route::get('2b0f099be8b183340e16eb5370c91799','Process\Administracion\RecursosHumanosController@index')->name('2b0f099be8b183340e16eb5370c91799');
    Route::get('c23e633345eb31645d0d182842db79bd/{id}','Process\Administracion\RecursosHumanosController@AdministraciónEmpresaRH')->name('c23e633345eb31645d0d182842db79bd');
    Route::post('afe9f067ad208254a9863edde79d3546','Process\Administracion\RecursosHumanosController@AdministracionListarInformacionPersonalCosto')->name('afe9f067ad208254a9863edde79d3546');
    Route::post('afe9f067ad208254a9863edde79d3546x','Process\Administracion\RecursosHumanosController@AdministracionListarInformacionPersonalCostoVacaciones')->name('afe9f067ad208254a9863edde79d3546x');
    Route::get('e4d03442bf58c59f6505d2b8f14fe406','Process\Administracion\RecursosHumanosController@AdministracionCalendarioGeneral')->name('e4d03442bf58c59f6505d2b8f14fe406');
    Route::post('e4d03442bf58c59f6505d2b8f14fe406D','Process\Administracion\RecursosHumanosController@DataCalendario')->name('e4d03442bf58c59f6505d2b8f14fe406D');
    Route::post('5368c3e4f671ab58136634a696c80597','Process\Administracion\RecursosHumanosController@AdministracionGuardarPermisoEmpleado')->name('5368c3e4f671ab58136634a696c80597');
    Route::post('62fa420c30efd64028c637389a30a366','Process\Administracion\RecursosHumanosController@AdministracionListarInformacionPersonalPermiso')->name('62fa420c30efd64028c637389a30a366');
    Route::post('ee91f33ffe93c54671f739b6c6eae9a0','Process\Administracion\RecursosHumanosController@AdministracionGuardarAprobacionPermiso')->name('ee91f33ffe93c54671f739b6c6eae9a0');
    Route::post('ea0b52025b37b06640ad20c9d08a986b','Process\Administracion\RecursosHumanosController@AdministracionRHListarUnidadesEmpresa')->name('ea0b52025b37b06640ad20c9d08a986b');
    Route::post('37898c4006f219c1888f1df8d14c80e0','Process\Administracion\RecursosHumanosController@AdministracionListarDepartamentosUnidad')->name('37898c4006f219c1888f1df8d14c80e0');
    Route::post('5bbfbb5727e2837eefef6b1b3f338b48','Process\Administracion\RecursosHumanosController@ListarEmpleadosDepartamentos')->name('5bbfbb5727e2837eefef6b1b3f338b48');
    Route::post('a9f4808f18f8fb5e6573daffda30f4a4','Process\Administracion\RecursosHumanosController@AdministrativoHorasEmpleadosDeptosEmpresa')->name('a9f4808f18f8fb5e6573daffda30f4a4');
    Route::post('604ffcff0d11d12b46e75082cf91d96f','Process\Administracion\RecursosHumanosController@AdministracionSimuladorCostoCargo')->name('604ffcff0d11d12b46e75082cf91d96f');

    /*HORAS HOMBRE*/
    Route::get('d6e0840c386bc44bcb119cd77dd31ff4','Process\HorasHombre\HHController@IndexHH')->name('d6e0840c386bc44bcb119cd77dd31ff4');
    Route::get('c92932129875b71e745711629c7165f4','Process\HorasHombre\HHController@ParHHIndex')->name('c92932129875b71e745711629c7165f4');
    Route::post('a80cd987d797e2e17ea5fbea10dbf6c8','Process\HorasHombre\HHController@ParRegistrarActividad')->name('a80cd987d797e2e17ea5fbea10dbf6c8');
    Route::post('946c04a7e848f1ab3da0b79625ee4fe4','Process\HorasHombre\HHController@ParDataActividadesHH')->name('946c04a7e848f1ab3da0b79625ee4fe4');
    Route::post('19cb4180f1590bbe72232c7a6b841fb3','Process\HorasHombre\HHController@ParHHEstadoActividades')->name('19cb4180f1590bbe72232c7a6b841fb3');
    Route::post('08af4d36106549eab16908a28c194239','Process\HorasHombre\HHController@ParHHNameActividades')->name('08af4d36106549eab16908a28c194239');
    Route::post('d9eedd6ead8e6896532d8097738bb170','Process\HorasHombre\HHController@ParHHListarTiposActividades')->name('d9eedd6ead8e6896532d8097738bb170');
    Route::post('4ad89138ada39730a8674575021fe8c6','Process\HorasHombre\HHController@ParHHListarDeptosTrafico')->name('4ad89138ada39730a8674575021fe8c6');
    Route::post('fe5e053c865cfe1756856993fe509e04','Process\HorasHombre\HHController@ParHHAsociarActividadDepto')->name('fe5e053c865cfe1756856993fe509e04');
    Route::post('0da24ffb030873fb234f983666b27969','Process\HorasHombre\HHController@ParDataActividadesDeptosHH')->name('0da24ffb030873fb234f983666b27969');
    Route::post('890644cb5ca32311046e500caa1075da','Process\HorasHombre\HHController@ParEliminarAsocActDeptHH')->name('890644cb5ca32311046e500caa1075da');
    Route::post('80d0ea32d6299b1eb289757e5ff4bf05','Process\HorasHombre\HHController@HHListarDeptoTraficoUser')->name('80d0ea32d6299b1eb289757e5ff4bf05');
    Route::post('feb23628f90bdd23513b1eb6e7324f24','Process\HorasHombre\HHController@HHListarActividadesDepartamento')->name('feb23628f90bdd23513b1eb6e7324f24');
    Route::post('0276ae4bc2484a62f2b3115ac09f2ca7','Process\HorasHombre\HHController@HHGuardarActividades')->name('0276ae4bc2484a62f2b3115ac09f2ca7');
    Route::post('92dca4ce7ddc273b062bc25d1c3c137a','Process\HorasHombre\HHController@HHListarActividadesRealizadas')->name('92dca4ce7ddc273b062bc25d1c3c137a');
    Route::post('5526cd993f75a5fd6a775ba08f867241','Process\HorasHombre\HHController@HHBorrarActividad')->name('5526cd993f75a5fd6a775ba08f867241');
    Route::post('da8152fcb80e8a23b27b161b520ebca1','Process\HorasHombre\HHController@HHListarUnidadesEmpresa')->name('da8152fcb80e8a23b27b161b520ebca1');
    Route::post('3dd6bfd429a265b50c2ef1672e4977c7','Process\HorasHombre\HHController@HHListarClientesEmpresa')->name('3dd6bfd429a265b50c2ef1672e4977c7');
    Route::post('1aeacb24e888f1d03f93c026b1440ff9','Process\HorasHombre\HHController@HHListarProyectos')->name('1aeacb24e888f1d03f93c026b1440ff9');
    
    
    
/*********************************************
********************** TRAFICO ***************
*********************************************/

    /* CLIENTE */
    Route::get('08e205ac22a40354eabb20f5b2818fea','Process\Trafico\TraClienteController@index')->name('08e205ac22a40354eabb20f5b2818fea');
    Route::post('dc47e12ac4a1068c236507bd36359ebb','Process\Trafico\TraClienteController@traDatosEmpresas')->name('dc47e12ac4a1068c236507bd36359ebb');
    Route::post('bde5b488693c2d2c22757174de731d4f','Process\Trafico\TraClienteController@traDatosUnidadNegocio')->name('bde5b488693c2d2c22757174de731d4f');
    Route::post('5ad0b953c7738fc7c077747ee8da3cb5','Process\Trafico\TraClienteController@traDatosClientes')->name('5ad0b953c7738fc7c077747ee8da3cb5');
    Route::post('8a03824e9ff6949d861b44a40aed14e9','Process\Trafico\TraClienteController@traDatosProductos')->name('8a03824e9ff6949d861b44a40aed14e9');
    Route::post('49d382bc75c15245ebb9c4a2d4cd896e','Process\Trafico\TraClienteController@traDatosSubProductos')->name('49d382bc75c15245ebb9c4a2d4cd896e');
    Route::post('9b909eb70578db07c1f5aee7553a59d6','Process\Trafico\TraClienteController@traDatosProfesionales')->name('9b909eb70578db07c1f5aee7553a59d6');
    Route::post('2032e89f5721d0663d5649d85504934a','Process\Trafico\TraClienteController@traDatosDirector')->name('2032e89f5721d0663d5649d85504934a');
    Route::post('a752ef4487f59afe53e6cd67be658a5d','Process\Trafico\TraClienteController@traDatosEjecutivo')->name('a752ef4487f59afe53e6cd67be658a5d');
    Route::post('f2fea7c587a30651fa3e1f5df8a6ac10','Process\Trafico\TraClienteController@traCrearOT')->name('f2fea7c587a30651fa3e1f5df8a6ac10');
    Route::post('06c193b023831dc894e4e14c418120b4','Process\Trafico\TraClienteController@indexDatosOT')->name('06c193b023831dc894e4e14c418120b4');
    Route::post('92b730dbd58aa180c6847a57af103225','Process\Trafico\TraClienteController@traDatosProyectoOT')->name('92b730dbd58aa180c6847a57af103225');
    Route::post('4e22d0b98860bfea9378036286efdb10','Process\Trafico\TraClienteController@traEditarOT')->name('4e22d0b98860bfea9378036286efdb10');
    Route::post('d5ecd015c996aed826d6396648dc692e','Process\Trafico\TraClienteController@traDatosProyectosOT')->name('d5ecd015c996aed826d6396648dc692e');
    Route::post('f07ce113ce58c015a410434637b977b0','Process\Trafico\TraClienteController@traDatosEstadosOT')->name('f07ce113ce58c015a410434637b977b0');
    Route::post('c5bf651acc16c564c0aea75ade0da094','Process\Trafico\TraClienteController@TraListarTiposMovimiento')->name('c5bf651acc16c564c0aea75ade0da094');
    Route::post('c5bf651acc16c564c0aea75ade0da094x','Process\Trafico\TraClienteController@TraListarTiposMovimientoRespuesta')->name('c5bf651acc16c564c0aea75ade0da094x');
    Route::post('00320d5c5bc62ada8b51221d5a784f52','Process\Trafico\TraClienteController@TraGuardarInformeEntrevista')->name('00320d5c5bc62ada8b51221d5a784f52');
    Route::post('5e3750b3f123e3b8bdccd914b725ef75','Process\Trafico\TraClienteController@traInformesEntrevistaProyecto')->name('5e3750b3f123e3b8bdccd914b725ef75');
    Route::post('0dfed6315e7cd3cf6c204ea06a20f407','Process\Trafico\TraClienteController@TraReenviarInformeEntrevista')->name('0dfed6315e7cd3cf6c204ea06a20f407');
    Route::post('a57a0c9b002d64a7f2fda48c266858f6','Process\Trafico\TraClienteController@traClientesFromProyectosDia')->name('a57a0c9b002d64a7f2fda48c266858f6');
    Route::post('cb82e5cf764b95117ae459bd5eee515a','Process\Trafico\TraClienteController@traSegmentacionGestionDia')->name('cb82e5cf764b95117ae459bd5eee515a');
    Route::post('c6fb996ec00b8e78fd3c7324300c96fe','Process\Trafico\TraClienteController@FinalizarTareaProyecto')->name('c6fb996ec00b8e78fd3c7324300c96fe');
    Route::post('ab9bcd4753799e763414e55d167995af','Process\Trafico\TraClienteController@TraDocumentosProyecto')->name('ab9bcd4753799e763414e55d167995af');
    Route::post('a4111dd1f9753b2ed9cde93556621765','Process\Trafico\TraClienteController@SaveDocumentoProyecto')->name('a4111dd1f9753b2ed9cde93556621765');
    Route::post('ab9bcd4753799e763414e55d167995af2','Process\Trafico\TraClienteController@ElimiarDocumentoProyecto')->name('ab9bcd4753799e763414e55d167995af2');
    

    Route::post('__DataClientes','Process\Trafico\TraClienteController@__DataClientes')->name('__DataClientes');
    Route::post('__DataClientesList','Process\Trafico\TraClienteController@__DataClientesList')->name('__DataClientesList');
    Route::post('__AddNuevaTreaOt_','Process\Trafico\TraClienteController@__AddNuevaTreaOt_')->name('__AddNuevaTreaOt_');
    Route::post('__SaveTareaOtProyecto_','Process\Trafico\TraClienteController@__SaveTareaOtProyecto_')->name('__SaveTareaOtProyecto_');
    Route::post('__AsignadosTareasTraficos','Process\Trafico\TraClienteController@__AsignadosTareasTraficos')->name('__AsignadosTareasTraficos');
    Route::post('__RetirarAsignadoTarea_','Process\Trafico\TraClienteController@__RetirarAsignadoTarea_')->name('__RetirarAsignadoTarea_');
    Route::post('__AccionTareaOt_','Process\Trafico\TraClienteController@__AccionTareaOt_')->name('__AccionTareaOt_');
    Route::post('__VerAdjuntosTareas','Process\Trafico\TraClienteController@__VerAdjuntosTareas')->name('__VerAdjuntosTareas');
    Route::post('__DetalleOtsTrafico','Process\Trafico\TraClienteController@__DetalleOtsTrafico')->name('__DetalleOtsTrafico');
    Route::post('__StatusTareaLast','Process\Trafico\TraClienteController@__StatusTareaLast')->name('__StatusTareaLast');
    Route::post('__GuardarStatusTareaLast','Process\Trafico\TraClienteController@__GuardarStatusTareaLast')->name('__GuardarStatusTareaLast');
    Route::post('__GuardarAdjuntosTareas','Process\Trafico\TraClienteController@__GuardarAdjuntosTareas')->name('__GuardarAdjuntosTareas');
    
    
    

    Route::post('9fcadcb59200a17e0176fa5a0990f835','Process\Trafico\TraClienteController@traSegmentacionTareas')->name('9fcadcb59200a17e0176fa5a0990f835');
    Route::post('0e1b513d8892d021763a850783e14916','Process\Trafico\TraClienteController@traClientesFromProyectos')->name('0e1b513d8892d021763a850783e14916');
    Route::post('4b46e38f507fb23f7a649e06b54bfc14','Process\Trafico\TraClienteController@traClientesFromProyectosResp')->name('4b46e38f507fb23f7a649e06b54bfc14');
    Route::post('54351b7558b6f67f068ccd2205ac32f0','Process\Trafico\TraClienteController@traSegmentacionPendientes')->name('54351b7558b6f67f068ccd2205ac32f0');
    Route::post('04366d8fc25921d42719dc943800832b','Process\Trafico\TraClienteController@traSegmentacionSeguimiento')->name('04366d8fc25921d42719dc943800832b');
    Route::post('e4b972ac758b27ee606c929f0066213a','Process\Trafico\TraClienteController@traSegmentacionContestadas')->name('e4b972ac758b27ee606c929f0066213a');

    Route::post('3ba46c5c0d8db73c37ab9e4b1386c58d','Process\Trafico\TraClienteController@indexDatosTareasOT')->name('3ba46c5c0d8db73c37ab9e4b1386c58d');
    Route::post('7a5382310484d6637d921d2580e2ed7b','Process\Trafico\TraClienteController@traDatosTareaDepartamentos')->name('7a5382310484d6637d921d2580e2ed7b');
    Route::post('1c0f6ac4c54b666640b9ec6cd7b09374','Process\Trafico\TraClienteController@traDatosTareaResponsables')->name('1c0f6ac4c54b666640b9ec6cd7b09374');
    Route::post('452f332f565173807af7bc1dac1dc9c8','Process\Trafico\TraClienteController@traDatosTareaAsignados')->name('452f332f565173807af7bc1dac1dc9c8');
    Route::post('b78d35629037f2d88d1acf26c48d60df','Process\Trafico\TraClienteController@traDatosTareaTipo')->name('b78d35629037f2d88d1acf26c48d60df');
    Route::post('75d327fc20cecb6c090edca0846575ac','Process\Trafico\TraClienteController@traCrearTareaOT')->name('75d327fc20cecb6c090edca0846575ac');
    Route::post('e437a8b417bfa5ddd160338adfad4bae','Process\Trafico\TraClienteController@traDatosEstadoTarea')->name('e437a8b417bfa5ddd160338adfad4bae');
    Route::post('692b650e2551e2c4d0b8c379178d7b25','Process\Trafico\TraClienteController@traDatosTareaOT')->name('692b650e2551e2c4d0b8c379178d7b25');
    Route::post('2196b8ef1d725788a4f617a978bc2648','Process\Trafico\TraClienteController@traModificarTarea')->name('2196b8ef1d725788a4f617a978bc2648');
    Route::post('900b044d402dc2259e19dd66c475f2fa','Process\Trafico\TraClienteController@traHistorialModificacionesTarea')->name('900b044d402dc2259e19dd66c475f2fa');
    Route::get('70387f8087a0fc297af72111d10f50d3/{parFile}','Process\Trafico\TraClienteController@traGetFileDownload')->name('70387f8087a0fc297af72111d10f50d3');

    Route::post('cbe2e4f260ef5bbfe58c112825b3b494','Process\Trafico\TraClienteController@traCrearSubtarea')->name('cbe2e4f260ef5bbfe58c112825b3b494');
    Route::post('88ebb343f380470982d18584639651bc','Process\Trafico\TraClienteController@traDatosSubTareaOT')->name('88ebb343f380470982d18584639651bc');
    Route::post('b28d52b730cc411f2e1870be7380f015','Process\Trafico\TraClienteController@traFinalizarTarea')->name('b28d52b730cc411f2e1870be7380f015');
    Route::post('45a6a3d2e81997dab555dd16793d7480','Process\Trafico\TraClienteController@ListarPermisosOTS')->name('45a6a3d2e81997dab555dd16793d7480');
    Route::post('c7b83d2a2a133b066d15131f0f1956ba','Process\Trafico\TraClienteController@ListarDatosInformeEntrevista')->name('c7b83d2a2a133b066d15131f0f1956ba');
    Route::post('3115db3fb13ad9db964287eed6b9cd37','Process\Trafico\TraClienteController@ListarPersonalAgencia')->name('3115db3fb13ad9db964287eed6b9cd37');
    Route::post('3115db3fb13ad9db964287eed6b9cd37x','Process\Trafico\TraClienteController@ListarPersonalAgenciaEmp')->name('3115db3fb13ad9db964287eed6b9cd37x');
    Route::post('26f6f79e7ea824292f003d2b04defa52','Process\Trafico\TraClienteController@ListarPersonalCliente')->name('26f6f79e7ea824292f003d2b04defa52');

    /* ADMINISTRATIVO */
    Route::get('0e304c495ec61f6403b7a4a6bb310dc1','Process\Trafico\TraAdministrativoController@index')->name('0e304c495ec61f6403b7a4a6bb310dc1');
    Route::get('0e304c495ec61f6403b7a4a6bb310dc2','Process\Trafico\TraAdministrativoController@indexNew')->name('0e304c495ec61f6403b7a4a6bb310dc2');
    Route::post('d4f014e4d8352329412acef13ccebe1c','Process\Trafico\TraAdministrativoController@canalesPrincipalesIndex')->name('d4f014e4d8352329412acef13ccebe1c');
    Route::post('d4f014e4d8352329412acef13ccebe1cg','Process\Trafico\TraAdministrativoController@canalesPrincipalesIndexG')->name('d4f014e4d8352329412acef13ccebe1cg');
    Route::post('707808edf4091a3834dad468cb0ad699','Process\Trafico\TraAdministrativoController@crearCanalPrincipal')->name('707808edf4091a3834dad468cb0ad699');
    Route::post('4857d2d55d0323c2dfc5c0f57a6ac236','Process\Trafico\TraAdministrativoController@estadoCanalPrincipal')->name('4857d2d55d0323c2dfc5c0f57a6ac236');
    Route::post('5db15db172ea2573c2f1b4aa82eec547','Process\Trafico\TraAdministrativoController@gruposIndex')->name('5db15db172ea2573c2f1b4aa82eec547');
    Route::post('f209192077b7a958de0e8dd5641956e5','Process\Trafico\TraAdministrativoController@crearGrupo')->name('f209192077b7a958de0e8dd5641956e5');
    
    Route::post('16a8299025b2c27a2ab19a96f320b9b3','Process\Trafico\TraAdministrativoController@listaGrupos')->name('16a8299025b2c27a2ab19a96f320b9b3');
    Route::post('16a8299025b2c27a2ab19a96f320b9bx','Process\Trafico\TraAdministrativoController@listarTraficoAdministrativo')->name('16a8299025b2c27a2ab19a96f320b9bx');
    Route::post('16a8299025b2c27a2ab19a96f320b9bxx','Process\Trafico\TraAdministrativoController@listarTraficoAdministrativo_otros')->name('16a8299025b2c27a2ab19a96f320b9bxx');
    Route::post('16a8299025b2c27a2ab19a96f320b9555','Process\Trafico\TraAdministrativoController@GuardarExternos')->name('16a8299025b2c27a2ab19a96f320b9555');
    Route::post('16a8299025b2c27a2ab19a96f320b955x','Process\Trafico\TraAdministrativoController@EditarExternos')->name('16a8299025b2c27a2ab19a96f320b955x');
    Route::post('16a8299025b2c27a2ab19a96f320b955xx','Process\Trafico\TraAdministrativoController@EliminarExternos')->name('16a8299025b2c27a2ab19a96f320b955xx');
    Route::post('16a8299025b2c27a2ab19a96f320b9bxyy','Process\Trafico\TraAdministrativoController@listarTraficoAdministrativoCerrado')->name('16a8299025b2c27a2ab19a96f320b9bxyy');
    Route::post('b168ba6541e9731b395a1448ea4b68c7X','Process\Trafico\TraAdministrativoController@ReactivarActividad')->name('b168ba6541e9731b395a1448ea4b68c7X');
    Route::get('16a8299025b2c27a2ab19a96f320b97xx','Process\Trafico\TraAdministrativoController@traadmin_DataNotificaciones')->name('16a8299025b2c27a2ab19a96f320b97xx');
    
    Route::post('83ae822d145224e43c0f63e502adfb52','Process\Trafico\TraAdministrativoController@estadoGrupo')->name('83ae822d145224e43c0f63e502adfb52');
    Route::post('56779eaa2b25de80204534dc936146f0','Process\Trafico\TraAdministrativoController@responsablesInfo')->name('56779eaa2b25de80204534dc936146f0');
    Route::post('d5d93e4b128d6a167cdf5f4109233d3f','Process\Trafico\TraAdministrativoController@responsablesIndex')->name('d5d93e4b128d6a167cdf5f4109233d3f');
    Route::post('f2e6d334358565f4232da5462b9f9c2b','Process\Trafico\TraAdministrativoController@crearResponsables')->name('f2e6d334358565f4232da5462b9f9c2b');
    Route::post('f2e6d334358565f4232da5462b9f9c2bDE','Process\Trafico\TraAdministrativoController@EliminarResponsableTA')->name('f2e6d334358565f4232da5462b9f9c2bDE');
    Route::post('5a327927a985a2307f931ba8f685e88a','Process\Trafico\TraAdministrativoController@TRA_listarResponsables')->name('5a327927a985a2307f931ba8f685e88a');
    Route::post('97a7626758832c60fd7897801ebb9743','Process\Trafico\TraAdministrativoController@estadoResponsable')->name('97a7626758832c60fd7897801ebb9743');
    Route::post('87e0029edddca207e3700c06d270f701','Process\Trafico\TraAdministrativoController@listaResponsables')->name('87e0029edddca207e3700c06d270f701');
    Route::post('d87987d135b74fd157c51d6b7c35cb10','Process\Trafico\TraAdministrativoController@actividadesIndex')->name('d87987d135b74fd157c51d6b7c35cb10');
    Route::post('f1d396554e80d9189c1fc3f764dab7d6','Process\Trafico\TraAdministrativoController@crearActividad')->name('f1d396554e80d9189c1fc3f764dab7d6');
    Route::post('40ed0a3640b0890533a14eb215c93c3c','Process\Trafico\TraAdministrativoController@crearActividadAsignada')->name('40ed0a3640b0890533a14eb215c93c3c');
    Route::post('eb366d8773473552996a90494502c216','Process\Trafico\TraAdministrativoController@datosActividad')->name('eb366d8773473552996a90494502c216');
    Route::post('a9c3a24dfcf3ed2e234ef63de5aadd76','Process\Trafico\TraAdministrativoController@datosStatusActividad')->name('a9c3a24dfcf3ed2e234ef63de5aadd76');
    Route::post('4f6625579552fdae8d4a085f4bcf42b0','Process\Trafico\TraAdministrativoController@editarActividad')->name('4f6625579552fdae8d4a085f4bcf42b0');
    Route::post('b168ba6541e9731b395a1448ea4b68c7','Process\Trafico\TraAdministrativoController@terminarActividad')->name('b168ba6541e9731b395a1448ea4b68c7');
    Route::post('0f721ff9ffe55717d945ead5fc6490b7','Process\Trafico\TraAdministrativoController@contactosActividadIndex')->name('0f721ff9ffe55717d945ead5fc6490b7');
    Route::post('26a84e78af9544ead650cf8a8391a8f9','Process\Trafico\TraAdministrativoController@crearContactoActividad')->name('26a84e78af9544ead650cf8a8391a8f9');
    Route::post('36c258bdba246ca1281d9e1ebe8d27d4','Process\Trafico\TraAdministrativoController@datosContactoActividad')->name('36c258bdba246ca1281d9e1ebe8d27d4');
    Route::post('cb767b07d6d6f1e73045314535175f40','Process\Trafico\TraAdministrativoController@editarContactoActividad')->name('cb767b07d6d6f1e73045314535175f40');
    Route::post('2ab8fbdd4580dd2a1370c8b3e5f06875','Process\Trafico\TraAdministrativoController@eliminarContactoActividad')->name('2ab8fbdd4580dd2a1370c8b3e5f06875');
    Route::post('fea7340349ee95e27531ac0dbd13c2be','Process\Trafico\TraAdministrativoController@TRA_ReorganizarCanales')->name('fea7340349ee95e27531ac0dbd13c2be');
    Route::post('f3377de55d049a5c8ff40bd099e304d4','Process\Trafico\TraAdministrativoController@TRA_ReorganizarGrupos')->name('f3377de55d049a5c8ff40bd099e304d4');
    Route::post('968178d58ab4cf07013fb70c7737f0e1','Process\Trafico\TraAdministrativoController@ListarActividadesGrupo')->name('968178d58ab4cf07013fb70c7737f0e1');
    Route::post('da9792cd3fe48035429d94b5c948d2f9','Process\Trafico\TraAdministrativoController@ListarSubgruposTA')->name('da9792cd3fe48035429d94b5c948d2f9');
    Route::post('86ea815a9b9280fa024da2108f53380a','Process\Trafico\TraAdministrativoController@crearSubGrupoTA')->name('86ea815a9b9280fa024da2108f53380a');
    Route::post('cb3c45c8f6e50a168409008ce54b486c','Process\Trafico\TraAdministrativoController@EstadoSubGrupoTA')->name('cb3c45c8f6e50a168409008ce54b486c');
    Route::post('24ef250f391728bc75ed9f7bf52070e5','Process\Trafico\TraAdministrativoController@TA_AddItemGroup')->name('24ef250f391728bc75ed9f7bf52070e5');
    Route::post('4857d2d55d0323c2dfc5c0f57a6ac236E','Process\Trafico\TraAdministrativoController@EditCanalPrincipal')->name('4857d2d55d0323c2dfc5c0f57a6ac236E');
    Route::post('4857d2d55d0323c2dfc5c0f57a6ac236D','Process\Trafico\TraAdministrativoController@DelCanalPrincipal')->name('4857d2d55d0323c2dfc5c0f57a6ac236DS');
    Route::post('83ae822d145224e43c0f63e502adfb52E','Process\Trafico\TraAdministrativoController@NombreEditGrupo')->name('83ae822d145224e43c0f63e502adfb52E');
    Route::post('83ae822d145224e43c0f63e502adfb52DS','Process\Trafico\TraAdministrativoController@DelEditGrupo')->name('83ae822d145224e43c0f63e502adfb52DS');
    Route::post('e7c5b877bc4968b9ef234f1fdf6d2c75','Process\Trafico\TraAdministrativoController@eliminarRegistroActividad')->name('e7c5b877bc4968b9ef234f1fdf6d2c75');
    Route::post('17dc42c0c118288d7d2bd21617efa530','Process\Trafico\TraAdministrativoController@SaveDataOrdenSubGrupos')->name('17dc42c0c118288d7d2bd21617efa530');
    Route::post('ca3a575bf7f8530345c7ada09511f69d','Process\Trafico\TraAdministrativoController@SaveDataTRAGroupChanelAdmin')->name('ca3a575bf7f8530345c7ada09511f69d');
    Route::post('83ae822d145224e43c0f63e502adfb52SE','Process\Trafico\TraAdministrativoController@NombreEditSubGrupo')->name('83ae822d145224e43c0f63e502adfb52SE');
    Route::post('83ae822d145224e43c0f63e502adfb52DSG','Process\Trafico\TraAdministrativoController@DelEditSubGrupo')->name('83ae822d145224e43c0f63e502adfb52DSG');
    Route::post('83ae822d145224e43c0f63e502adfb52DSG','Process\Trafico\TraAdministrativoController@DelEditSubGrupo')->name('83ae822d145224e43c0f63e502adfb52DSG');
    Route::post('1a4bf05385443ac88d525d98b0bd59a6','Process\Trafico\TraAdministrativoController@traadmin_ListarOpciones')->name('1a4bf05385443ac88d525d98b0bd59a6');
    
    Route::get('50dd18656800255e4cf3d6e1c70e7704/{idCanal}','Process\Trafico\TraAdminReportPDFController@getPDFReport')->name('50dd18656800255e4cf3d6e1c70e7704');

    /*ADMINISTRATIVO - CONTABILIDAD*/
    Route::post('60e438530e1bd40994845db435ac2769','Process\Administracion\ContabilidadController@DataOrdenCompra')->name('60e438530e1bd40994845db435ac2769');
    Route::get('fde606aefe460532971e0b67ee9456ef','Process\Administracion\ContabilidadController@DataFactPendientesProveedores')->name('fde606aefe460532971e0b67ee9456ef');
    Route::get('6d5f4b887f5fbff3dd0790d9596ccda9','Process\Administracion\ContabilidadController@FacturasProveedorProximasVencimiento')->name('6d5f4b887f5fbff3dd0790d9596ccda9');
    Route::post('5980d8d66a94da7e461486b5b827327c','Process\Administracion\ContabilidadController@DataFacturaOc')->name('5980d8d66a94da7e461486b5b827327c');
    Route::post('6856c4172a3242a89f38672dda25b95c','Process\Administracion\ContabilidadController@DataProgPagos')->name('6856c4172a3242a89f38672dda25b95c');
    Route::post('83efb8f47c4a745907aeed34c800e926','Process\Administracion\ContabilidadController@dataProveedores')->name('83efb8f47c4a745907aeed34c800e926');
    Route::post('6e17a3619bc7654ecd579b15d1eb64b5','Process\Administracion\ContabilidadController@DetalleProgPagos')->name('6e17a3619bc7654ecd579b15d1eb64b5');
    Route::post('a1680e8ac51ee8c651f48c486198ce9f','Process\Administracion\ContabilidadController@ListarProgmPagos')->name('a1680e8ac51ee8c651f48c486198ce9f');
    Route::post('__GuardarPagosManuales','Process\Administracion\ContabilidadController@__GuardarPagosManuales')->name('__GuardarPagosManuales');
    
    Route::post('a1680e8ac51ee8c651f48c486198ce9f2','Process\Administracion\ContabilidadController@ListarProgmPagosAprob')->name('a1680e8ac51ee8c651f48c486198ce9f2');
    Route::post('ea4ff1197d80916350450c6f456f7340','Process\Administracion\ContabilidadController@RegistrarProgPago')->name('ea4ff1197d80916350450c6f456f7340');
    Route::post('76009189e19cfcd492469a2bef795175','Process\Administracion\ContabilidadController@EnviarAprobacionPago')->name('76009189e19cfcd492469a2bef795175');
    Route::post('76009189e19cfcd492469a2bef7951752','Process\Administracion\ContabilidadController@NextAprobacionPago')->name('76009189e19cfcd492469a2bef7951752');
    Route::post('fb6e00d39df651fda458b7ac6a38cd27','Process\Administracion\ContabilidadController@RegistrarDocumentoProveedor')->name('fb6e00d39df651fda458b7ac6a38cd27');
    Route::post('f61b2a6411fb313183803940ca71fa90','Process\Administracion\ContabilidadController@ListarFacturasProveedores')->name('f61b2a6411fb313183803940ca71fa90');
    Route::post('4a396eaeadcd7ba2f3b346c120c29a58','Process\Administracion\ContabilidadController@CancelarFacturaOC')->name('4a396eaeadcd7ba2f3b346c120c29a58');
    Route::post('7bc28d1674d47ec7b0e9e4dde3c0ed3f','Process\Administracion\ContabilidadController@DataFacturasPendientesProveedores')->name('7bc28d1674d47ec7b0e9e4dde3c0ed3f');
    Route::post('e6249046a837237a71785f6bd77446b5','Process\Administracion\ContabilidadController@DataFacturasPendientesPagoProveedores')->name('e6249046a837237a71785f6bd77446b5');
    Route::post('e0cca638ccf1be637638963314e49beb','Process\Administracion\ContabilidadController@Admin_Cont_ListarImpuestosIP_Empresa')->name('e0cca638ccf1be637638963314e49beb');
    Route::post('5c57ac949372a7549ccd4068c6b779ab','Process\Administracion\ContabilidadController@Admin_Cont_GuardarFacturaPresupuesto')->name('5c57ac949372a7549ccd4068c6b779ab');
    Route::post('0ba0f80dd8251abef50dc05cfcc0b2dc','Process\Administracion\ContabilidadController@Admin_Contabilidad_DataFacturaPpto')->name('0ba0f80dd8251abef50dc05cfcc0b2dc');
    Route::post('5bd7e47e2fd8dadeccd8bc3b11fccee6','Process\Administracion\ContabilidadController@Admin_Contabilidad_SavePagoCliente')->name('5bd7e47e2fd8dadeccd8bc3b11fccee6');
    Route::post('f1e63502fc482f546b4a5146deca4eae','Process\Administracion\ContabilidadController@Admin_Contabilidad_DataFacturasPendientesCliente')->name('f1e63502fc482f546b4a5146deca4eae');
    Route::post('fd55c65ccd470fed298a15466c8c93f0','Process\Administracion\ContabilidadController@Admin_Contabilidad_DataFacturasPendientesClienteVencido')->name('fd55c65ccd470fed298a15466c8c93f0');
    
    /* CALENDARIO */
    Route::get('33ae9aefcee34af505947a77a8914010','Process\Trafico\TraCalendarioController@index')->name('33ae9aefcee34af505947a77a8914010');
    
    /* REPORTES */
    Route::get('4828a527766d17057834147156e99fd7','Process\Trafico\TraReportesController@index')->name('4828a527766d17057834147156e99fd7');
    Route::post('bc8bb43747f8396dbe7a4f797d76d3c4','Process\Trafico\TraReportesController@filtrosProyecto')->name('bc8bb43747f8396dbe7a4f797d76d3c4');
    Route::post('bc8bb43747f8396dbe7a4f797d76d3c42','Process\Trafico\TraReportesController@TRA_reportReprocesos')->name('bc8bb43747f8396dbe7a4f797d76d3c42');
    Route::post('2ab09a7a592d3cda9eadb46cbcf7dca6','Process\Trafico\TraReportesController@filtrosTarea')->name('2ab09a7a592d3cda9eadb46cbcf7dca6');
    Route::post('88459cc62d1e889962f9dd4e4e6e3b67','Process\Trafico\TraReportesController@listaProyectosOT')->name('88459cc62d1e889962f9dd4e4e6e3b67');
    Route::post('4c66056c168a71bd8abdd171c7c10e17','Process\Trafico\TraReportesController@listaTareas')->name('4c66056c168a71bd8abdd171c7c10e17');
    Route::post('3af81c5b2b88a0232e0552447e4ecb4e','Process\Trafico\TraReportesController@reporteOTs')->name('3af81c5b2b88a0232e0552447e4ecb4e');
    Route::post('6962eb20c048cf606d512d717748c268','Process\Trafico\TraReportesController@reporteTareas')->name('6962eb20c048cf606d512d717748c268');
    Route::post('e300a06f5eb910c7b77eff69eff05869','Process\Trafico\TraReportesController@TRA_ReporteParam_ListOTS')->name('e300a06f5eb910c7b77eff69eff05869');
    Route::post('43c18fe6637765803dd40298d7bf50e4','Process\Trafico\TraReportesController@ListarDepartamentosCargaLaboral')->name('43c18fe6637765803dd40298d7bf50e4');
    Route::post('7901af9df2cf70be0ee8311e77e91860','Process\Trafico\TraReportesController@DataCargaLaboralDepartamento')->name('7901af9df2cf70be0ee8311e77e91860');
    Route::post('0e1b513d8892d021763a850783e14916x','Process\Trafico\TraReportesController@traReportesClientesFromProyectos')->name('0e1b513d8892d021763a850783e14916x');
    Route::post('54351b7558b6f67f068ccd2205ac32f0x','Process\Trafico\TraReportesController@traSegmentacionPendientes')->name('54351b7558b6f67f068ccd2205ac32f0x');
    Route::post('b5ee5d9f4234c819caeb03df9d3114cc','Process\Trafico\TraReportesController@TraReportDataInformeCuenta')->name('b5ee5d9f4234c819caeb03df9d3114cc');
    Route::post('b39e5b91733b7aaeef24379d85cc7840','Process\Trafico\TraReportesController@TRA_REPORT_DataUsers')->name('b39e5b91733b7aaeef24379d85cc7840');
    Route::post('506d158fe0f6ca51eed93d801e4534e5','Process\Trafico\TraReportesController@TRA_Report_DataConsolidadoUsuario')->name('506d158fe0f6ca51eed93d801e4534e5');
    Route::post('506d158fe0f6ca51eed93d801e4534e5C','Process\Trafico\TraReportesController@TRA_Report_DataConsolidadoCliente')->name('506d158fe0f6ca51eed93d801e4534e5C');
    Route::post('86d820e566a342e7e37f7ec31dfbf78b','Process\Trafico\TraReportesController@TRA_Report_DataTareasConsolidado')->name('86d820e566a342e7e37f7ec31dfbf78b');
    Route::post('7ed64370201d459f4e2ca918d26f2ffd','Process\Trafico\TraReportesController@TRA_Report_DataTareasDepartamento')->name('7ed64370201d459f4e2ca918d26f2ffd');
    Route::post('94ef88591e234a55d51120a2a0418284','Process\Trafico\TraReportesController@TRA_Report_DataOTsActivasPorEjecutivo')->name('94ef88591e234a55d51120a2a0418284');
    Route::post('94ef88591e234a55d51120a2a0418284P','Process\Trafico\TraReportesController@TRA_Report_DataOTsActivasPorEjecutivoP')->name('94ef88591e234a55d51120a2a0418284P');
    Route::post('94ef88591e234a55d51120a2a0418284E','Process\Trafico\TraReportesController@TRA_Report_DataOTsActivasPorEjecutivoProductoProfesional')->name('94ef88591e234a55d51120a2a0418284E');
    Route::post('fe315ee7ebc305e58214dadb0f84c15c','Process\Trafico\TraReportesController@TRA_Report_DataOTsActivasPorEjecutivoProducto')->name('fe315ee7ebc305e58214dadb0f84c15c');
    Route::post('ee8b8c2715871eeaff09a3e205bfb633','Process\Trafico\TraReportesController@CalendarioEntregasProyectos')->name('ee8b8c2715871eeaff09a3e205bfb633');
    Route::post('4e071d19daaf214bb0ef5340baf2bf86','Process\Trafico\TraReportesController@TRA_Report_DataOtsEntregables')->name('4e071d19daaf214bb0ef5340baf2bf86');
    Route::post('4e071d19daaf214bb0ef5340baf2bf862','Process\Trafico\TraReportesController@TRA_Report_DataOtsEntregables2')->name('4e071d19daaf214bb0ef5340baf2bf862');
    Route::post('4e071d19daaf214bb0ef5340baf2bf862req','Process\Trafico\TraReportesController@TRA_Report_Req')->name('4e071d19daaf214bb0ef5340baf2bf862req');
    Route::post('4e071d19daaf214bb0ef5340baf2bf86CLP','Process\Trafico\TraReportesController@TRA_Report_ListarProfCliente')->name('4e071d19daaf214bb0ef5340baf2bf86CLP');
    Route::post('4e071d19daaf214bb0ef5340baf2bf86PRD','Process\Trafico\TraReportesController@TRA_Report_ListarProductosCliente')->name('4e071d19daaf214bb0ef5340baf2bf86PRD');
    Route::post('6131fd7628f87eadf4e4b9f42b8442c2','Process\Trafico\TraReportesController@Tra_Report_MotivosCierres')->name('6131fd7628f87eadf4e4b9f42b8442c2');
    Route::post('bbffe93eaa6aad67ce339893233243a8','Process\Trafico\TraReportesController@TRA_Report_DataCalendarioEntregas')->name('bbffe93eaa6aad67ce339893233243a8');
    Route::post('f309d8563d70b278a105255f8552d371','Process\Trafico\TraReportesController@TRA_Report_DataOTsGeneral')->name('f309d8563d70b278a105255f8552d371');
    Route::post('43c2fd452552bfb5fe8e5e310b58412c','Process\Trafico\TraReportesController@Tra_Report_CierreOT')->name('43c2fd452552bfb5fe8e5e310b58412c');
    
    Route::post('e2b67f3d0b438458c0c729db6f878e39','Process\Trafico\TraReportesController@TRA_Reportes_InformeCuentaNew')->name('e2b67f3d0b438458c0c729db6f878e39');
    Route::post('e2b67f3d0b438458c0c729db6f878e39x','Process\Trafico\TraReportesController@TRA_Reportes_Capacitaciones')->name('e2b67f3d0b438458c0c729db6f878e39x');

    /*PRODUCCION*/

    Route::get('1c605c008b2322ae851b4a02dfcf38b6','Process\Produccion\PresupuestoController@index_presupuestos')->name('1c605c008b2322ae851b4a02dfcf38b6');
    Route::get('e4d786cf849dddcbc98a326f38d80aeb','Process\Produccion\ReportesController@index_reportesProduccion')->name('e4d786cf849dddcbc98a326f38d80aeb');
    Route::post('dcf59e06d5eee130c21d79c6b56aefb0','Process\Produccion\PresupuestoController@Presupuesto_ListasCreacionPpto')->name('dcf59e06d5eee130c21d79c6b56aefb0');
    Route::post('dcf59e06d5eee130c21d79c6b56aefb0Ex','Process\Produccion\PresupuestoController@Presupuesto_ListasPptoEditar')->name('dcf59e06d5eee130c21d79c6b56aefb0Ex');
    Route::post('ac415e10c7fa3362840003282e795f6c','Process\Produccion\PresupuestoController@Presupuesto_ListaDatosEmpresa')->name('ac415e10c7fa3362840003282e795f6c');
    Route::post('d1278c64e4e3181e82c88a0357893d7c','Process\Produccion\PresupuestoController@Presupuesto_ListarDatosComision')->name('d1278c64e4e3181e82c88a0357893d7c');
    Route::post('1808d87b2dce352e689b9fec41ae53c9','Process\Produccion\PresupuestoController@Presupuesto_ListarClienteUsuarioEmpresaUnidad')->name('1808d87b2dce352e689b9fec41ae53c9');
    Route::post('4e9cd5ee73665675d448c7c9507b535e','Process\Produccion\PresupuestoController@Produccion_GuardarPresupuesto')->name('4e9cd5ee73665675d448c7c9507b535e');
    Route::post('4e9cd5ee73665675d448c7c9507b535ed','Process\Produccion\PresupuestoController@Produccion_GuardarEditarPresupuesto')->name('4e9cd5ee73665675d448c7c9507b535ed');
    Route::post('af602a9cee189bd6f128b1c78448423c','Process\Produccion\PresupuestoController@Presupuestos_ListarPresupuestos')->name('af602a9cee189bd6f128b1c78448423c');
    Route::post('e7874c017f474dd662900458fdca81c5','Process\Produccion\PresupuestoController@Presupuesto_Contenido')->name('e7874c017f474dd662900458fdca81c5');
    Route::post('54bd9000448553de750c34d7cdbce9c9','Process\Produccion\PresupuestoController@Presupuesto_GuardarGrupo')->name('54bd9000448553de750c34d7cdbce9c9');
    Route::post('b503952430db439e20115b1d7cfafb3d','Process\Produccion\PresupuestoController@Presupuesto_EditarGrupo')->name('b503952430db439e20115b1d7cfafb3d');
    Route::post('dec2e62f2038716413a6ed243ca2bd19','Process\Produccion\PresupuestoController@Presupuesto_EliminarGrupo')->name('dec2e62f2038716413a6ed243ca2bd19');
    Route::post('199dfc061cb6ca90a98f4eb7afc25fd5','Process\Produccion\PresupuestoController@Presupuesto_ListarGruposPpto')->name('199dfc061cb6ca90a98f4eb7afc25fd5');
    Route::post('8873f9251a499c2f93501e765b17955d','Process\Produccion\PresupuestoController@Presupuesto_GuardarOrdenGruposPresupuesto')->name('8873f9251a499c2f93501e765b17955d');
    Route::post('d14e27d36b63a679d1a770ebe4f92953','Process\Produccion\PresupuestoController@Presupuesto_CrearItem')->name('d14e27d36b63a679d1a770ebe4f92953');
    Route::post('6c1ac7baaeb177097d996643f0740817','Process\Produccion\PresupuestoController@Presupuesto_EliminarItem')->name('6c1ac7baaeb177097d996643f0740817');
    Route::post('c6b9c1c7596272805ce1e37fbac04fc4','Process\Produccion\PresupuestoController@Presupuesto_EditarItemsPpto')->name('c6b9c1c7596272805ce1e37fbac04fc4');
    Route::post('6b8e7415ee2aa47f1141522279248806','Process\Produccion\PresupuestoController@Presupuesto_ComisionableItemPpto')->name('6b8e7415ee2aa47f1141522279248806');
    Route::post('73d03829a0a8af2a6357b596fb8a6d84','Process\Produccion\PresupuestoController@ConsultarVersionesPresupuesto')->name('73d03829a0a8af2a6357b596fb8a6d84');
    Route::post('30a71ff4adc89a8d5cad05dcf90c0ec0','Process\Produccion\PresupuestoController@PresupuestoGenerarNuevaVersionInterna')->name('30a71ff4adc89a8d5cad05dcf90c0ec0');
    Route::post('30a71ff4adc89a8d5cad05dcf90c0ec0x','Process\Produccion\PresupuestoController@PresupuestoCambiarVersionPpto')->name('30a71ff4adc89a8d5cad05dcf90c0ec0x');
    Route::post('30a71ff4adc89a8d5cad05dcf90346566','Process\Produccion\PresupuestoController@PresupuestoGuardarSolAprobacion')->name('30a71ff4adc89a8d5cad05dcf90346566');
    Route::post('559d02a2cf849b5d35301ea6ee380049','Process\Produccion\PresupuestoController@PresupuestoConsultarStatusAprobacion')->name('559d02a2cf849b5d35301ea6ee380049');
    Route::post('4ecce3ff63d6349161d2360628fab155','Process\Produccion\PresupuestoController@PresupuestoAprobacionCliente')->name('4ecce3ff63d6349161d2360628fab155');
    Route::post('6d23f08934bde355af6b8995b4c92e88','Process\Produccion\PresupuestoController@PresupuestoAnticipos')->name('6d23f08934bde355af6b8995b4c92e88');
    Route::post('6d23f08934bde355af6b8995b4c92e88x','Process\Produccion\PresupuestoController@DataPresupuestoAnticipos')->name('6d23f08934bde355af6b8995b4c92e88');
    Route::post('6d23f08934bde355af6b8995b4c92e88e','Process\Produccion\PresupuestoController@PresupuestoLegalizacionAnticipos')->name('6d23f08934bde355af6b8995b4c92e88e');
    Route::post('6d23f08934bde355af6b8995b4c92e88ex','Process\Produccion\PresupuestoController@PresupuestoNuevaLegalizacionAnticipos')->name('6d23f08934bde355af6b8995b4c92e88ex');
    Route::post('6d23f08934bde355af6b8995b4c92e88eg','Process\Produccion\PresupuestoController@GuardarDatosLegalizacion')->name('6d23f08934bde355af6b8995b4c92e88eg');
    Route::post('6d23f08934bde355af6b8995b4c92e88el','Process\Produccion\PresupuestoController@DelItemLegalizacion')->name('6d23f08934bde355af6b8995b4c92e88el');
    Route::post('6d23f08934bde355af6b8995b4c92e88p0o','Process\Produccion\PresupuestoController@AsociadosItems')->name('6d23f08934bde355af6b8995b4c92e88p0o');
    Route::post('6d23f08934bde355af6b8995b4c92e88p0ox','Process\Produccion\PresupuestoController@AgregarAsociado')->name('6d23f08934bde355af6b8995b4c92e88p0ox');
    Route::post('6d23f08934bde355af6b8995b4c92e88p0oa','Process\Produccion\PresupuestoController@DelItemAsociado')->name('6d23f08934bde355af6b8995b4c92e88p0oa');
    
    
    Route::post('39686313c015a9d69133ce8d405d8e31','Process\Produccion\ReportesController@Reportes_PRD_DataAnticiposReporte')->name('39686313c015a9d69133ce8d405d8e31');

    Route::get('01f34a2740cbabf722b2255aa878959f/{id}','Process\Produccion\PresupuestoController@Presupuesto_Detalle')->name('01f34a2740cbabf722b2255aa878959f');
    Route::get('01f34a2740cbabf722b2255aa878959f2/{id}','Process\Produccion\PresupuestoController@Presupuesto_DetalleAjustes')->name('01f34a2740cbabf722b2255aa878959f2');
    
    /*APROBACIONES*/
    Route::get('698fccc49d554db04ba50cd5aab3da06','Process\Produccion\AprobacionesController@index_aprobaciones')->name('698fccc49d554db04ba50cd5aab3da06');
    Route::post('6ee3a3dac295a641d457974b6035b290','Process\Produccion\AprobacionesController@ListarPptoPendientes')->name('6ee3a3dac295a641d457974b6035b290');
    Route::post('d891f4f1b8e788bcc7b1eba3dae2e904','Process\Produccion\AprobacionesController@DataPresupuestoAprobacion')->name('d891f4f1b8e788bcc7b1eba3dae2e904');
    Route::post('e0cb0f04c7aa10c9a6558e51de57299e','Process\Produccion\AprobacionesController@EvalAprobacionPresupuesto')->name('e0cb0f04c7aa10c9a6558e51de57299e');
    
    /*ORDENES*/
    Route::post('8e9f895ab4197fbe9e05b8854b7b8a1a','Process\Produccion\OrdenacionController@DatosOrdenes')->name('8e9f895ab4197fbe9e05b8854b7b8a1a');
    Route::post('613b5a1ac42a21867cc555a4fc469039','Process\Produccion\OrdenacionController@ListarItemsProveedorPpto')->name('613b5a1ac42a21867cc555a4fc469039');
    Route::post('04f8a0f2ac55c072ab3f4834dcb6a404','Process\Produccion\OrdenacionController@GenerarOP')->name('04f8a0f2ac55c072ab3f4834dcb6a404');
    Route::post('7774d6be72b3d7ff8985739097d8ae8c','Process\Produccion\OrdenacionController@GenerarOC')->name('7774d6be72b3d7ff8985739097d8ae8c');
    Route::post('d85127fca3656efa5a78ba07a4ecb4cf','Process\Produccion\OrdenacionController@ListarOrdenesOPPpto')->name('d85127fca3656efa5a78ba07a4ecb4cf');
    Route::post('251952c58289ecc4faab514593992ffd','Process\Produccion\OrdenacionController@CancelarOPPpto')->name('251952c58289ecc4faab514593992ffd');
    Route::post('3a8c1b2f41cf2e02672a0aefab299054','Process\Produccion\OrdenacionController@ListarOrdenesOCPpto')->name('3a8c1b2f41cf2e02672a0aefab299054');
    Route::post('792a92e2eaf8f57f990ed34ef9087e57','Process\Produccion\OrdenacionController@CancelarOCPpto')->name('792a92e2eaf8f57f990ed34ef9087e57');
    
    /*CLIENTES*/
    Route::get('e200749db9d6cb79b9b9ee109f56c4d0', 'Process\Cliente\ClienteController@index')->name('e200749db9d6cb79b9b9ee109f56c4d0');
    Route::post('c8ae7480ffcec046eff032acc95a16a4', 'Process\Cliente\ClienteController@ClienteListarData')->name('c8ae7480ffcec046eff032acc95a16a4');
    Route::post('c8ae7480ffcec046eff032acc95a16a42', 'Process\Cliente\ClienteController@Cliente_CamposAdicionales')->name('c8ae7480ffcec046eff032acc95a16a42');
    Route::post('c569fc8266c92dbd65aac696064785ee', 'Process\Cliente\ClienteController@SaveRequerimientoCliente')->name('c569fc8266c92dbd65aac696064785ee');
    Route::post('f3a2cbc8e35f9b30c128b3d91e9babbf', 'Process\Cliente\ClienteController@Cliente_ListarRequerimientosVigentes')->name('f3a2cbc8e35f9b30c128b3d91e9babbf');
    Route::post('017de185ebf69d481ab27df257bfee87', 'Process\Cliente\ClienteController@Cliente_StatusRequerimiento')->name('017de185ebf69d481ab27df257bfee87');
    Route::post('017de185ebf69d481ab27df257bfee87EF', 'Process\Cliente\ClienteController@Cliente_StatusRequerimientoEF')->name('017de185ebf69d481ab27df257bfee87EF');
    Route::post('c50cb56aed832b28522210592567bdd3', 'Process\Cliente\ClienteController@Cliente_HistoricoRequerimiento')->name('c50cb56aed832b28522210592567bdd3');
    Route::post('017de185ebf69d481ab27df257bfee872', 'Process\Cliente\ClienteController@Cliente_ResponsabilidadStatus')->name('017de185ebf69d481ab27df257bfee872');
    Route::post('47e55a0f3de332ca32c12612678d3753', 'Process\Cliente\ClienteController@Cliente_CancelacionRequerimiento')->name('47e55a0f3de332ca32c12612678d3753');
    Route::post('b7b5d800ff7fbdb762dd32a6ab788aa4', 'Process\Cliente\ClienteController@Cliente_ListarHistoricoRequerimientosVigentes')->name('b7b5d800ff7fbdb762dd32a6ab788aa4');
    Route::post('4efec69574ec7dfdcb6ff5b25b55012f', 'Process\Cliente\ClienteController@Cliente_ListarRequerimientosVigentesRevisor')->name('4efec69574ec7dfdcb6ff5b25b55012f');
    Route::post('f76cd2629e05e2fe6c0ec7d722398617', 'Process\Cliente\ClienteController@Cliente_SuspenderRequerimiento')->name('f76cd2629e05e2fe6c0ec7d722398617');
    Route::post('89c9d855228d861476db396134e45239', 'Process\Cliente\ClienteController@Cliente_ReactivarRequerimiento')->name('89c9d855228d861476db396134e45239');
    Route::post('a693dac80ae4ca3a932b4ce06cd688a2', 'Process\Cliente\ClienteController@Cliente_BloquearRequerimiento')->name('a693dac80ae4ca3a932b4ce06cd688a2');
    Route::post('a693dac80ae4ca3a932b4ce06cd688a2D', 'Process\Cliente\ClienteController@Cliente_DesBloquearRequerimiento')->name('a693dac80ae4ca3a932b4ce06cd688a2D');
    Route::post('c569fc8266c92dbd65aac696064785eeEd', 'Process\Cliente\ClienteController@SaveEdRequerimientoCliente')->name('c569fc8266c92dbd65aac696064785eeEd');
    Route::post('c8e66d2eaea6c726081c63fa4f78ba3e', 'Process\Cliente\ClienteController@Cliente_DevStatusRequerimiento')->name('c8e66d2eaea6c726081c63fa4f78ba3e');
    Route::post('f060b228c3ba346cc82f7277e5457436', 'Process\Cliente\ClienteController@Cliente_ListarProyectos')->name('f060b228c3ba346cc82f7277e5457436');
    Route::post('3119e621db348aad4c460acf0602cbb3', 'Process\Cliente\ClienteController@Cliente_GenerarProyecto')->name('3119e621db348aad4c460acf0602cbb3');
    Route::post('f45b0d4eb8c9dfe3a63f35c9ec7b9f05', 'Process\Cliente\ClienteController@Cliente_EscalarReqAgencia')->name('f45b0d4eb8c9dfe3a63f35c9ec7b9f05');
    Route::post('07be3299140f82ab94b6e2fa17033f63', 'Process\Cliente\ClienteController@Cliente_EnviarAprobacionRequerimiento')->name('07be3299140f82ab94b6e2fa17033f63');
    Route::post('8e93e5b81343b8ec1b4f11c96f9a92b3', 'Process\Cliente\ClienteController@Cliente_ListarDocumentosUltimaTarea')->name('8e93e5b81343b8ec1b4f11c96f9a92b3');
    Route::post('4040470b58442c9c5f79e731347c11ba', 'Process\Cliente\ClienteController@Cliente_DataEvalSolicitud')->name('4040470b58442c9c5f79e731347c11ba');
    Route::post('6fd9fadcfba08ccf1ee0edfe29506329', 'Process\Cliente\ClienteController@Cliente_EvalSolicitud')->name('6fd9fadcfba08ccf1ee0edfe29506329');
    Route::post('06ae214f4708713efca1c9c7ad1ca588', 'Process\Cliente\ClienteController@Cliente_ListarUltimoStatus')->name('06ae214f4708713efca1c9c7ad1ca588');
    Route::post('a15d0c7c156ad5a16df4125c0778bfab', 'Process\Cliente\ClienteController@Cliente_ReasignarRequerimientoCliente')->name('a15d0c7c156ad5a16df4125c0778bfab');
    Route::post('0936e46c43fb2e07bf283d16df261d76', 'Process\Cliente\ClienteController@Cliente_ResumenProfCliente')->name('0936e46c43fb2e07bf283d16df261d76');
    Route::post('0936e46c43fb2e07bf283d16df261d76x', 'Process\Cliente\ClienteController@ClienteR_Detalle_Report')->name('0936e46c43fb2e07bf283d16df261d76x');
    Route::get('v70387f8087a0fc297af72111d10f50d3x/{parFile}', 'Process\Cliente\ClienteController@ClienteGetFileView')->name('v70387f8087a0fc297af72111d10f50d3x');
    
    Route::get('70387f8087a0fc297af72111d10f50d3x/{parFile}','Process\Cliente\ClienteController@ClienteGetFileDownload')->name('70387f8087a0fc297af72111d10f50d3x');
    Route::get('70387f8087a0fc297af72111d10f50d3xA/{parFile}','Process\Cliente\ClienteController@ClienteGetFileDownloadZip')->name('70387f8087a0fc297af72111d10f50d3xA');
    
    /*PDFS*/
    Route::get('/b4ac42fb5d888c8a2fbcf7e5d8415bec/{Hash}', 'PDFController@PDF_TRA_InformeEntrevista')->name('b4ac42fb5d888c8a2fbcf7e5d8415bec');
    Route::get('/4d6dafef10c87be0c321ef1cb0f257ac', 'PDFController@PDF_TRA_ReporteListadoOts')->name('4d6dafef10c87be0c321ef1cb0f257ac');
    Route::get('/6f4926481edc1ae3b08f31d5b2689ef8/{Hash}', 'PDFController@PDF_PRO_PptoSinProveedor')->name('6f4926481edc1ae3b08f31d5b2689ef8');
    Route::get('/6f4926481edc1ae3b08f31d5b2689ef8x/{Hash}', 'PDFController@PDF_PRO_PptoSinProveedorComisionManual')->name('6f4926481edc1ae3b08f31d5b2689ef8x');
    Route::get('/6f4926481edc1ae3b08f31d5b2689ef8MD/{Hash}', 'PDFController@PDF_PRO_PptoSinProveedorMonedaDif')->name('6f4926481edc1ae3b08f31d5b2689ef8MD');
    Route::get('/6f4926481edc1ae3b08f31d5b2689ef8as/{Hash}', 'PDFController@PDF_PRO_PptoConProveedor')->name('6f4926481edc1ae3b08f31d5b2689ef8as');
    Route::get('/13889e416790c50f0410449d8b5eaf3c/{Hash}', 'PDFController@PDF_PRO_OrdenProduccion')->name('13889e416790c50f0410449d8b5eaf3c');
    Route::get('/13889e416790c50f0410449d8b5eaf3c43/{Hash}', 'PDFController@PDF_PRO_OrdenCompra')->name('13889e416790c50f0410449d8b5eaf3c43');
    Route::get('/288ffad72e6d2756a80a65fa98f3b4b5/{Hash}', 'PDFController@PDF_PRO_Anticipo')->name('288ffad72e6d2756a80a65fa98f3b4b5');
    Route::get('/2998ffad72e6d2756a80a65fa98f3b4b5/{Hash}', 'PDFController@PDF_PRO_Legalizacion')->name('2998ffad72e6d2756a80a65fa98f3b4b5');
    Route::get('/6f4926481edc1ae3b08f31d5b2689ef8MDA/{Hash}', 'PDFController@PDF_PRO_PptoConProveedorInterno')->name('6f4926481edc1ae3b08f31d5b2689ef8MDA');
    
    Route::get('/b8ddcead884b54def5ef4d1a635bfbe4/{Info}', 'PDFController@PDF_Inventario')->name('b8ddcead884b54def5ef4d1a635bfbe4');
    
    Route::post('0b920f3657da85034c8bd5e7596bb322', 'Process\Transversal\MensajeriaController@Mensajeria_SaveMsj')->name('0b920f3657da85034c8bd5e7596bb322');
    Route::post('81af62f0c3c489338a4e1e7c0b990d16', 'Process\Transversal\MensajeriaController@Mensajeria_DataMisNotificaciones')->name('81af62f0c3c489338a4e1e7c0b990d16');
    Route::post('913cf59b328d6e11cc853411dc4a01f0', 'Process\Transversal\MensajeriaController@Mensajeria_DataOtrosNotificaciones')->name('913cf59b328d6e11cc853411dc4a01f0');
    Route::get('5087ba60b38c411d7e278b921ced2452', 'Process\Transversal\MensajeriaController@SendNotificacionBirthday')->name('5087ba60b38c411d7e278b921ced2452');
    Route::get('c0c8fc625c8dad63478fe36d1e23d15a', 'Process\Transversal\MensajeriaController@SendNotificacionPagosPptoGeneral')->name('c0c8fc625c8dad63478fe36d1e23d15a');
    Route::get('0082fe1a8b4e028141a0c60008fe5525', 'Process\Transversal\MensajeriaController@SendNotificacionVencimientoTarifas')->name('0082fe1a8b4e028141a0c60008fe5525');
    Route::get('5ea78e3911acbcb1b3249efcfa46045f', 'Process\Transversal\MensajeriaController@SendNotificacionVencimientoDocumentos')->name('5ea78e3911acbcb1b3249efcfa46045f');
    
    Route::post('df7b928b6f6c8b551947f6883e895f7b', 'Process\Transversal\MensajeriaController@Directorio')->name('df7b928b6f6c8b551947f6883e895f7b');
    Route::post('16f090739fd3c2dc8c110eac1dd7234b', 'Process\Transversal\MensajeriaController@DirectorioAgencia_Data')->name('16f090739fd3c2dc8c110eac1dd7234b');
    Route::post('8cc63bb4f1889e574705e6ff66d01e8f', 'Process\Transversal\MensajeriaController@DirectorioClientes_Data')->name('8cc63bb4f1889e574705e6ff66d01e8f');
    Route::post('96c83cb30020818880ffa5f0bef2c2da', 'Process\Transversal\MensajeriaController@DirectorioProveedores_Data')->name('96c83cb30020818880ffa5f0bef2c2da');
    Route::post('51b6c3e7773f275492265598598c09a6', 'Process\Transversal\MensajeriaController@DirectorioBanco_Data')->name('51b6c3e7773f275492265598598c09a6');
    
    /*ENCUESTA*/
    Route::post('5610f6801cd58b6e6fd07175bec520e3', 'Process\Transversal\MensajeriaController@EncuestaCliente_Form')->name('5610f6801cd58b6e6fd07175bec520e3');
    Route::post('33a11cc7a8c91d6935dd9119ff9129e5', 'Process\Transversal\MensajeriaController@EncuestaSave')->name('33a11cc7a8c91d6935dd9119ff9129e5');
    Route::post('33a11cc7a8c91d6935dd9119ff9129e1', 'Process\Transversal\MensajeriaController@EncuestaSaveCliente')->name('33a11cc7a8c91d6935dd9119ff9129e1');
    Route::post('5610f6801cd58b6e6fd07175bec520e2', 'Process\Transversal\MensajeriaController@EncuestaEjecutivo_Form')->name('5610f6801cd58b6e6fd07175bec520e2');
    
    Route::post('4b3f9951234aa8beea58166ffc7d226d', 'Process\Transversal\MensajeriaController@InformacionPendientesUsuario')->name('4b3f9951234aa8beea58166ffc7d226d');
    
	/*
    Route::get('1fcb80a3322ce8dd5da52ae730e4753e', 'Migracion\MigracionController@index')->name('1fcb80a3322ce8dd5da52ae730e4753e');
    Route::get('b50067d573e5f44a90bf4f0d2403d314', 'Migracion\MigracionController@CorreccionesCaracteres')->name('b50067d573e5f44a90bf4f0d2403d314');
    
    
    */
    Route::get('xxxxxxxxxxxxxxxx', 'Migracion\MigracionController@Repc')->name('xxxxxxxxxxxxxxxx');
    
    /*Informes*/
    Route::get('794f24c22fbc45ef5645f7af8aa5bbee', 'Process\Informes\InformesController@Informes_Index_Datos')->name('794f24c22fbc45ef5645f7af8aa5bbee');
    Route::get('9108fac393d670d65ea728bffec75e0d', 'Process\Informes\InformesController@Informes_Index_TraficoAdministrativo')->name('9108fac393d670d65ea728bffec75e0d');
    Route::get('4b9d7de34432762c2027f4a9095a5e7d', 'Process\Informes\InformesController@Informes_Index_HorasHombre')->name('4b9d7de34432762c2027f4a9095a5e7d');
    Route::post('a8ca9e5da9cb7960d1a5c32ba8594a88', 'Process\Informes\InformesController@Informes_DataEmpresas')->name('a8ca9e5da9cb7960d1a5c32ba8594a88');
    Route::post('6d591ec66ecb6055fa75556670259a18', 'Process\Informes\InformesController@Informes_DataClientes')->name('6d591ec66ecb6055fa75556670259a18');
    Route::post('bdb43afd435b7a757301eced09df532d', 'Process\Informes\InformesController@Informes_DataProveedores')->name('bdb43afd435b7a757301eced09df532d');
    Route::post('7b0e28f8f4a68ad35ed13a77ef4fcf1a', 'Process\Informes\InformesController@Informes_TraficoAdministrativoUsers')->name('7b0e28f8f4a68ad35ed13a77ef4fcf1a');
    Route::post('8395dce43d2702a2f124117ce95e5351', 'Process\Informes\InformesController@Informes_TraficoAdministrativoUserData')->name('8395dce43d2702a2f124117ce95e5351');
    
    Route::post('1a1007a957343c23e0bf7f697221ea47', 'Process\Informes\InformesController@Informes_Trafico_Cliente_OtsGeneral2')->name('1a1007a957343c23e0bf7f697221ea47');
    Route::post('1a1007a957343c23e0bf7f697221ea472', 'Process\Informes\InformesController@Informes_Trafico_Cliente_OtsGeneral')->name('1a1007a957343c23e0bf7f697221ea472');
    Route::post('c50cb56aed832b28522210592567bdd3x', 'Process\Informes\InformesController@Cliente_HistoricoRequerimiento')->name('c50cb56aed832b28522210592567bdd3x');
    Route::post('c50cb56aed832b28522210592567bdd3xs', 'Process\Informes\InformesController@FullData')->name('c50cb56aed832b28522210592567bdd3xs');
    Route::get('68d494a0120d4445b3ece16814a0aed1', 'Process\Informes\InformesController@Informes_Index_TraficoClientes')->name('68d494a0120d4445b3ece16814a0aed1');
    
    Route::post('7c98588fb0b50446b5cfd4fb06d5a918','Process\Informes\InformesController@Informes_HorasHombre')->name('7c98588fb0b50446b5cfd4fb06d5a918');
    
    /*COMUNICACIONES*/
    Route::post('be06ee888cd88d09611201ac7ec57fdd', 'Process\Transversal\MensajeriaController@NuevoPublicosCom')->name('be06ee888cd88d09611201ac7ec57fdd');
    Route::post('e933a0638c2e9ebff1f0824eedc49a74', 'Process\Transversal\MensajeriaController@CarpetasComunicaciones')->name('e933a0638c2e9ebff1f0824eedc49a74');
    Route::post('3a84b34e24319bbe0f9061acd52b925f', 'Process\Transversal\MensajeriaController@CarpetasComunicacionesContenido')->name('3a84b34e24319bbe0f9061acd52b925f');
    Route::post('61cc506f543faabec1a64ac3377feca3', 'Process\Transversal\MensajeriaController@NewSubCarpeta')->name('61cc506f543faabec1a64ac3377feca3');
    Route::post('bd552a112ae9e1017bc48ec39602e0ef', 'Process\Transversal\MensajeriaController@EliminarCategoriaCom')->name('bd552a112ae9e1017bc48ec39602e0ef');
    Route::post('7a9a4608c53fa92da75e20f53aa44428', 'Process\Transversal\MensajeriaController@NuevoDocCom')->name('7a9a4608c53fa92da75e20f53aa44428');
    Route::post('a2e73445db104112742cfb1973362cd0', 'Process\Transversal\MensajeriaController@EliminarArchivoCom')->name('a2e73445db104112742cfb1973362cd0');
    Route::post('f8a13f67666707ad3422e06256ee864d', 'Process\Transversal\MensajeriaController@SaveCompartidosDocumentos')->name('f8a13f67666707ad3422e06256ee864d');
    Route::post('f8a13f67666707ad3422e06256ee8642', 'Process\Transversal\MensajeriaController@SaveCompartidosDocumentosArc')->name('f8a13f67666707ad3422e06256ee8642');
    Route::post('ee36d61b5b6a29aac64800b1aea3c356', 'Process\Transversal\MensajeriaController@DocumentoCompartidoCon')->name('ee36d61b5b6a29aac64800b1aea3c356');
    Route::get('4a5a7170621126bd5f4a58badcf8e1cf', 'Process\Transversal\MensajeriaController@Comunicaciones')->name('4a5a7170621126bd5f4a58badcf8e1cf');