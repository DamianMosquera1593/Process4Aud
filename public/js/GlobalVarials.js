/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var UrlGeneral = 'http://localhost/ProcessPlusErp/_multierp/public/';
var UrlGeneral = 'http://process.grupotesta.com.co:8989/PProcess3/public/';
var UrlUniversal = 'http://process.grupotesta.com.co:8989/PProcess3/public/';
var VisualPpto = 0;
var $DataTable = null;
var SearchTable = "";
var PptoGeneral_MesActivo = 0;
//PAR - General
var $DataTable_Pais = null;
var $DataTable_DepartamentosPais = null;
var $DataTable_Ciudad = null;
var $FormValidate = null;

//PAR - Empresa
var $DataTable_TipoDocumentos = null;
var $DataTable_TarifasImpuestos = null;
var $DataTable_TipoMaterial = null;
var $DataTable_TipoMaterialDetalle = null;

//PAR - Personal
var $DataTable_TiposDoc = null;
var $DataTable_Eps = null;
var $DataTable_Arl = null;
var $DataTable_FC = null;
var $DataTable_FP = null;
var $DataTable_CC = null;
var $DataTable_DL = null;
var $DataTable_TR = null;


//PAR - Ppto General
var $DataTable_Ppto_Periodicidad = null;

//PAR - Inventario
var $DataTable_Inventario_Propietario = null;
var $DataTable_Inventario_PropietarioS = null;
var $DataTable_Inventario_TipoSistemas = null;
var $DataTable_Inventario_Marca = null;

//PAR - Clientes
var $DataTable_Cliente_DC = null;
var $DataTable_Cliente_Contratos = null;
var $DataTable_Cliente_IT = null;
var $DataTable_Cliente_MP = null;
var $DataTable_Cliente_TC = null;
var $DataTable_Cliente_UC = null;
var $DataTable_Cliente_RPT = null;

//PAR - Proveedores
var $DataTable_Proveedor_DL = null;

//PAR - Bancos
var $DataTable_Banco_DL = null;
var $DataTable_Banco_TM = null;
var $DataTable_Banco_TP = null;

//Horas Hombre
var $DataTable_HH_Actividades = null;
var $DataTable_HH_ActividadesDeptos = null;

//PAR - Sistemas
var $DataTable_Sistemas = null;

//PAR - Tráfico
var $DataTable_Trafico_TB = null;
var $DataTable_Trafico_TT = null;

//Datos -
$DataTable_TI_Empresa = null;
var SearchTable_TI = "";

//Datos - Empresa
$DataTable_Empresa_UND = null;
$DataTable_Empresa_Area = null;
$DataTable_Empresa_Cargos = null;


//
$DataTable_Empresa_Personal_DA = null;
$DataTable_Empresa_Personal = null;
$DataTable_Empresa_Personal_CE = null;
$DataTable_Empresa_Personal_DL = null;


$DataTable_Inventario_General = null;
var TotalInventarioGeneral = 0;
$DataTable_Inventario_Sistemas = null;
var TotalInventarioSistemas = 0;

$DataTable_BibliotecaAccesos = null;
$DataTable_Cliente_DocumentosLegales = null;
$DataTable_Cliente_Negociaciones = null;

$DataTable_Proveedores = null;
$DataTable_Proveedores_DL = null;

$DataTable_TarePendientes = [];
$DataTable_UnidadPlanNegocio = null;
$DataTable_Proveedores_DLA = null;
$DataTable_UnidadPlanNegocio = null;
$DataTable_InformesProyectos = null;
$DataTable_Pptos = null;


//Tra Administrativo
$DataTable_CanalesPrincipales = null;
$DataTable_Responsables = null;
$DataTable_Actividades = null;
$DataTable_Contactos = null;
$DataTable_Grupos = null;


const uploadImage = (e) => {
    let imageFile = e.files[0]
    let imgLabel = $('#LParLogo').text(imageFile.name)
    loadImage(imageFile).then(img => {

    })
}
$IdProyecto = null;
$CodigoProyecto = null;

//Tráfico
var Inf_AsisAgencia = [];
var Inf_CopAgencia = [];
var Inf_AsisCliente = [];
var Inf_CopGeneral = [];
var Inf_Objetivos = [];
var Inf_Desarrollo = [];
var Inf_ComAgencia = [];
var Inf_CompromisosAgencia = [];
var Inf_CompromisosCliente = [];

var Temp_Inf_AsisAgencia = [];
var Temp_Inf_CopAgencia = [];
var Temp_Inf_AsisCliente = [];
var Temp_Inf_CopGeneral = [];

var Temp_Inf_ComAgencia = [];

$DataTable_PersonalPermiso = null;
$DataTable_MisNotificaciones = null;
$DataTable_OtrosNotificaciones = null;


$DataTable_DashboardClientes = null;
$DataTable_DashboardProveedores = null;

//Directorio
$DataTable_DirectorioEmpleado = null;
$DataTable_DirectorioClientes = null;
$DataTable_DirectorioBancos = null;
$DataTable_DirectorioProveedor = null;
$DataTable_TareaOTProyectos = null;