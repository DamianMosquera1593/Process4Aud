<?php

namespace App\Http\Controllers\Process\Administracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

class EmpresaController extends Controller
{
   //d93b739c5a3b35e8f62570f0bad59cc3
    public function index(Request $request)
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $empresasUsuario = DB::table('par_usuarioEmpresa as pue')
            ->join('usuario as u',  'pue.IdUsuario', '=', 'u.IdUsuario')
            ->join('empresa as e', 'pue.IdEmpresa', '=', 'e.IdEmpresa')
            ->where('pue.IdUsuario', $usuario[0]->IdUsuario )
            ->select('e.IdEmpresa', 'e.Nit', 'e.NombreLegal', 'e.NombreComercial', 'e.Logo', 'u.IdUsuario', 'Usuario')
            ->distinct()
            ->get();

            $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
            $fechaEnc = parent::CodeEncrypt($fecha);
            foreach ($empresasUsuario as $empresa) {
                $empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
                $empresa->IdUsuario = parent::CodeEncrypt($empresa->IdUsuario);
                $empresa->url = intval($empresa->IdEmpresa) + intval($fechaEnc);
            }

            return view('process.administracion.empresas')->with('empresas', $empresasUsuario);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //39474d007f559fae2618c8b421ce2f54
    public function AdministraciónEmpresa($Id)
    {
        $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Id - $fechaEnc);
        $permisoEmpresa = DB::table('par_usuarioempresa')
        ->where(['IdEmpresa'=>$idEmpresa, 'IdUsuario'=>$usuario[0]->IdUsuario])
        ->get();

        if ($permisoEmpresa) {
            $empresa = DB::table('empresa')
            ->where('IdEmpresa', $idEmpresa)
            ->select('NombreLegal', 'NombreComercial','IdEmpresa')->first();
            $empresa->Hash = $Id;
            $empresa->HashE = parent::CodeEncrypt($empresa->IdEmpresa);
            return view("process.administracion.info_empresa")->with('empresa', $empresa);
        }
        return view("process.administracion.info_empresa")->with('empresa', ['error'=>true]);
    }

    //befd9feb01c8dd7733bbb50450e4a144
    public function indexAdministracionLegal(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);


            $idEmpresa = $this->desencryptHashURL($credentials['Hash']);

            $empresa = DB::table('empresa')
            ->where('IdEmpresa', $idEmpresa)
            ->select('Nit', 'NombreLegal', 'NombreComercial', 'Logo')
            ->first();
            $empresa->Hash = parent::CodeEncrypt($idEmpresa);
            $ADMINISTRACION_EMPRESAS_LEGAL_INFORMACION = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_LEGAL_INFORMACION')");
            $ADMINISTRACION_EMPRESAS_LEGAL_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_LEGAL_DOCUMENTOS')");
            $ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS')");

            $permiso_informacion = false;
            $permiso_documentos = false;
            $permiso_tarifas = false;
            if( count($ADMINISTRACION_EMPRESAS_LEGAL_INFORMACION) == 1 ){
                $permiso_informacion = true;
            }
            if( count($ADMINISTRACION_EMPRESAS_LEGAL_DOCUMENTOS) == 1 ){
                $permiso_documentos = true;
            }
            if( count($ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS) == 1 ){
                $permiso_tarifas = true;
            }

            $data = [
                'ADMINISTRACION_EMPRESAS_LEGAL_INFORMACION' => $permiso_informacion,
                'ADMINISTRACION_EMPRESAS_LEGAL_DOCUMENTOS' => $permiso_documentos,
                'ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS' => $permiso_tarifas,
                'Empresa' => $empresa
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    //3441d5e80a28e31e28e05d5dbbaf9fea
    public function datosLegalEmpresa(Request $request)
    {
        $credentials = $this->validate($request, [
            'Hash' => 'required|string'
        ]);

        if (session('Time') > date("Y-m-d H:i:s")) {

            $idEmpresa = parent::CodeDescrypt($credentials['Hash']);

            $Empresa = DB::SELECT("SELECT "
                . "Nit, IdEmpresa, NombreLegal, "
                . "NombreComercial, IF(ISNULL(Direccion),'',Direccion) AS Direccion, "
                . "Logo, Estado, IF(ISNULL(Mision),'',Mision) AS Mision, IF(ISNULL(Vision),'',Vision) AS Vision, "
                . "IF(ISNULL(Objetivos),'',Objetivos) AS Objetivos, IdCiudad, IdDepartamento, "
                . "IdPais, IF(ISNULL(FechaConstitucion),'',FechaConstitucion) AS FechaConstitucion, IF(ISNULL(CorreoContacto),'',CorreoContacto) AS CorreoContacto "
                . "FROM Empresa "
                . "WHERE IdEmpresa = " . $idEmpresa);
            $Empresa[0]->Hash = parent::CodeEncrypt($Empresa[0]->IdEmpresa);

            $pais = DB::table('par_pais')
            ->where('IdPais', $Empresa[0]->IdPais)
            ->first();

            $departamento = DB::table('par_departamento')
            ->where('IdDepartamento', $Empresa[0]->IdDepartamento)
            ->first();

            $ciudad = DB::table('par_ciudad')
            ->where('IdCiudad', $Empresa[0]->IdCiudad)
            ->first();

            $Empresa[0]->Pais = $pais->Nombre;
            $Empresa[0]->Departamento = $departamento->Nombre;
            $Empresa[0]->Ciudad = $ciudad->Nombre;

            $RL = DB::SELECT("SELECT "
                . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
                . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
                . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
                . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
                . "pt.IdTipoDocumento,"
                . "pt.Nombre as TipoDocumento "
                . "FROM Informacion_RLegal RL "
                . "INNER JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
                . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Representante' "
                . "WHERE RL.IdEmpresa = " . $idEmpresa);
            $RS = DB::SELECT("SELECT "
                . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
                . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
                . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
                . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
                . "pt.IdTipoDocumento,"
                . "pt.Nombre as TipoDocumento "
                . "FROM Informacion_RLegal RL "
                . "INNER JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
                . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Suplente' "
                . "WHERE RL.IdEmpresa = " . $idEmpresa);

            $TipoDocumento = DB::SELECT("SELECT "
                . "IdTipoDocumento as Id, "
                . "Nombre as TipoDocumento "
                . "FROM Par_Persona_Tipo_Documento "
                . "WHERE Estado = 1");

            $Social = DB::SELECT("SELECT s.IdSocial,"
                . "s.Link,"
                . "r.Icono, "
                . "r.Nombre "
                . "FROM Social s "
                . "INNER JOIN Par_Redes_Sociales r on s.IdRS = r.IdRS "
                . "WHERE s.IdEmpresa = " . $idEmpresa);

            $NotaPpto = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_PPTO'");

            $NotaAnticipo = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_ANTICIPO'");

            $NotaLegalizacion = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_LEGALIZACION'");

            $NotaOP = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_OP'");

            $NotaOC = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_OC'");

            $NotaIR = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN Empresa e on n.IdEmpresa = '".$idEmpresa."'"
                . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
                . "WHERE tn.codificacion = 'NOTA_INFORME_REUNION'");

            if ($Empresa) {
                return response()->json([
                    'Empresa' => $Empresa[0],
                    'RL' => $RL,
                    'RS' => $RS,
                    'NotaIR' => $NotaIR,
                    'NotaPpto' => $NotaPpto,
                    'NotaAnticipo' => $NotaAnticipo,
                    'NotaLegalizacion' => $NotaLegalizacion,
                    'NotaOP' => $NotaOP,
                    'NotaOC' => $NotaOC,
                    'Social' => $Social,
                    'TipoDocumento' => $TipoDocumento
                ]);
            }
            return response()->json(['Error' => '1']);
        }

    }

    public function indexAdministracionUnidadesNegocio(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);


            $idEmpresa = $this->desencryptHashURL($credentials['Hash']);

            $empresa = DB::table('empresa')
            ->where('IdEmpresa', $idEmpresa)
            ->select('Nit', 'NombreLegal', 'NombreComercial', 'Logo')
            ->first();
            $empresa->Hash = parent::CodeEncrypt($idEmpresa);

            $Unidades = DB::SELECT("SELECT un.nombre as Nombre, un.Descripcion "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$idEmpresa." order by un.IdUnidad");

            $ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO')");
            $ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEOGOCIO')");
            $ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS')");

            $permiso_informacion = false;
            $permiso_documentos = false;
            $permiso_tarifas = false;
            if( count($ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO) == 1 ){
                $permiso_informacion = true;
            }
            if( count($ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO) == 1 ){
                $permiso_documentos = true;
            }
            if( count($ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS) == 1 ){
                $permiso_tarifas = true;
            }

            $data = [
                'ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO' => $permiso_informacion,
                'ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO' => $permiso_documentos,
                'ADMINISTRACION_EMPRESAS_LEGAL_TARIFAS' => $permiso_tarifas,
                'Empresa' => $empresa
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    

    public function indexAdministracionProveedores(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
            $idEmpresa = $this->desencryptHashURL($credentials['Hash']);

            $empresa = DB::table('empresa')
            ->where('IdEmpresa', $idEmpresa)
            ->select('Nit', 'NombreLegal', 'NombreComercial', 'Logo')
            ->first();
            $empresa->Hash = parent::CodeEncrypt($idEmpresa);
            
            $ADMINISTRACION_EMPRESAS_PROVEEDORES_LEGAL = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_PROVEEDORES_LEGAL",session('keyUser'),0);
            $ADMINISTRACION_EMPRESAS_PROVEEDORES_DOCUMENTOS = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_PROVEEDORES_DOCUMENTOS",session('keyUser'),0);
            $ADMINISTRACION_EMPRESAS_PROVEEDORES_CONTACTOS = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_PROVEEDORES_CONTACTOS",session('keyUser'),0);
            

            $permiso_legal = false;
            $permiso_documentos = false;
            $permiso_contactos = false;
            
            if( $ADMINISTRACION_EMPRESAS_PROVEEDORES_LEGAL == 1 ){
                $permiso_legal = true;
            }
            if( $ADMINISTRACION_EMPRESAS_PROVEEDORES_DOCUMENTOS == 1 ){
                $permiso_documentos = true;
            }
            if( $ADMINISTRACION_EMPRESAS_PROVEEDORES_CONTACTOS == 1 ){
                $permiso_contactos = true;
            }
            
            $data = [
                'ADMINISTRACION_EMPRESAS_PROVEEDORES_LEGAL' => $permiso_legal,
                'ADMINISTRACION_EMPRESAS_PROVEEDORES_DOCUMENTOS' => $permiso_documentos,
                'ADMINISTRACION_EMPRESAS_PROVEEDORES_CONTACTOS' => $permiso_contactos,
                'Empresa' => $empresa
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
        }
    }

    private function desencryptHashURL($Hash)
    {
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);

        $idEmpresa = (new Controller)->CodeDescrypt(intval($Hash)-intval($fechaEnc));
        return $idEmpresa;
    }

    public function ListarClientesEmpresa(Request $request){

        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);

            $Empresas = DB::SELECT("SELECT Nit,NombreComercial,NombreLegal, Logo from Empresa where IdEmpresa = $idEmpresa");
        $Clientes = DB::SELECT("SELECT "
                . "c.IdCliente as Hash, c.NombreComercial "
                . "from Cliente c "
                . "INNER JOIN Asoc_Empresa_Cliente ac on c.IdCliente = ac.IdCliente AND ac.IdEmpresa = ".$idEmpresa
                . "");
        foreach($Clientes as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        //$empresa->Hash = parent::CodeEncrypt($idEmpresa);
        $ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='". session('keyUser')."' and p.Nombre in ('ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEOGOCIO')");
        $data = [
                'Clientes' => $Clientes,
                'Empresa' => $Empresas,
                'ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO_CREAR'=>$ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEGOCIO_CREAR
            ];

            return response()->json($data, 200);
    }
    
    public function PlanNegociosEmpresa(Request $request){
        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
        
        $IdEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);
        
        $sqlUnidades = DB::SELECT("SELECT un.IdUnidad as Hash, un.nombre as Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$IdEmpresa." order by un.IdUnidad");
        
        
        foreach($sqlUnidades as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            'Unidad'=>$sqlUnidades
        ]);
    }
    
    public function Administracion_ListarClientesUnidad(Request $request){
        
        $credentials = $this->validate($request, [
                'Hash' => 'required|string',
            ]);

        $IdUnidad =(new Controller)->CodeDescrypt($credentials['Hash']);

        
        $Clientes = DB::SELECT("SELECT "
                . "c.IdCliente as Hash, c.NombreComercial "
                . "from Cliente c "
                . "WHERE c.IdCliente in (SELECT p.IdCliente FROM plannegocio p where p.IdUnidad = ".$IdUnidad.")"
                . "");
        foreach($Clientes as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        
        $data = [
                'Cliente' => $Clientes
            ];

        return response()->json($data, 200);
    }
    
    public function Administracion_ListarDatosPlanNegocioUnidad(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);

        $draw = $request['draw'];
        $SqlWhereAdd = "";
        $id = "";
        if( $Credentials['Hash'] == '0' ){
            $SqlWhereAdd = "p.IdUnidad = p.IdUnidad ";
        }else{
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $SqlWhereAdd = "p.IdUnidad = $id ";
        }

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and p.estado = 1 ";
        }else if( $request['search']['Estado'] == 0 ){
            $sqlAdicional = " and p.estado = 0 ";
        }
        if( $request['search']['Cliente'] > 0 ){
            $sqlAdicional .= " and p.IdCliente =  ".(new Controller)->CodeDescrypt($request['search']['Cliente'])." ";
        }else if( $request['search']['Cliente'] == 0 ){
            $sqlAdicional .= " and p.IdCliente = p.IdCliente ";
        }
        
        $sqlFrom = "FROM "
                . "plannegocio p "
                . "INNER JOIN usuario u on p.idusuario = u.idusuario "
                . "INNER JOIN Cliente c on p.Idcliente = c.IdCliente "
                . "WHERE ".$SqlWhereAdd.$sqlAdicional;

        $sqlCampos = "p.id, p.Anio, c.NombreComercial, date_format(p.fecha,'%Y-%m-%d') as fechahora,"
                . "p.estado , "
                . "u.nombreusuario "
                ;
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (p.Anio like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                c.NombreComercial like '%".$searchValue."%'  ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $Total = DB::SELECT("SELECT SUM(d.Pptado) as Total "
                . "FROM plannegocio_mes d "
                . "INNER JOIN plannegocio p on p.id = d.idpn "
                . "INNER JOIN usuario u on p.idusuario = u.idusuario "
                . "INNER JOIN Cliente c on p.Idcliente = c.IdCliente "
                . "WHERE "
                .$SqlWhereAdd
                . " and d.idpn = p.id ".$searchQuery." ".$sqlAdicional.$searchValue);
        $ValorTotal = 0;
        if( count($Total) > 0 ){
            $ValorTotal = $Total[0]->Total;
        }
        
        foreach($empRecords['empRecords'] as $row){
            $TotalPlan = DB::SELECT("SELECT sum(Pptado) as Total from plannegocio_mes where idpn = ".$row->id);
            $Valor = 0;
            if( count($TotalPlan) > 0 ){
                $Valor = $TotalPlan[0]->Total;
            }

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];


            $data[] = array(
              "Num"=>$i,
              "Valor"=>$Valor,
              "Hash"=>(new Controller)->CodeEncrypt($row->id),
              "Anio"=>$row->Anio,
              "estado"=>$row->estado,
              "NombreComercial"=>$row->NombreComercial,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              
            );
           $i++;
        }

        $response = array(
          "draw" => intval($empRecords['draw']),
          "iTotalRecords" => count($data),
          "iTotalDisplayRecords" => count($data),
            "Total"=>$ValorTotal,
          "aaData" => $data
        );

        return json_encode($response);

    }
    
    public function indexAdministracionClientes(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);


            $idEmpresa = $this->desencryptHashURL($credentials['Hash']);

            $empresa = DB::table('empresa')
            ->where('IdEmpresa', $idEmpresa)
            ->select('Nit', 'NombreLegal', 'NombreComercial', 'Logo')
            ->first();
            $empresa->Hash = parent::CodeEncrypt($idEmpresa);
            
            $ADMINISTRACION_EMPRESAS_CLIENTES_LEGAL = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_CLIENTES_LEGAL",session('keyUser'),0);
            $ADMINISTRACION_EMPRESAS_CLIENTES_DOCUMENTOS = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_CLIENTES_DOCUMENTOS",session('keyUser'),0);
            $ADMINISTRACION_EMPRESAS_CLIENTES_CONTACTOS = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_CLIENTES_CONTACTOS",session('keyUser'),0);
            $ADMINISTRACION_EMPRESAS_CLIENTES_NEGOCIACIONES = (new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_CLIENTES_NEGOCIACIONES",session('keyUser'),0);
            

            $permiso_legal = false;
            $permiso_documentos = false;
            $permiso_contactos = false;
            $permiso_negociaciones = false;
            
            if( $ADMINISTRACION_EMPRESAS_CLIENTES_LEGAL == 1 ){
                $permiso_legal = true;
            }
            if( $ADMINISTRACION_EMPRESAS_CLIENTES_DOCUMENTOS == 1 ){
                $permiso_documentos = true;
            }
            if( $ADMINISTRACION_EMPRESAS_CLIENTES_CONTACTOS == 1 ){
                $permiso_contactos = true;
            }
            if( $ADMINISTRACION_EMPRESAS_CLIENTES_NEGOCIACIONES == 1 ){
                $permiso_negociaciones = true;
            }

            $data = [
                'ADMINISTRACION_EMPRESAS_CLIENTES_LEGAL' => $permiso_legal,
                'ADMINISTRACION_EMPRESAS_CLIENTES_DOCUMENTOS' => $permiso_documentos,
                'ADMINISTRACION_EMPRESAS_CLIENTES_CONTACTOS' => $permiso_contactos,
                'ADMINISTRACION_EMPRESAS_CLIENTES_NEGOCIACIONES' => $permiso_negociaciones,
                'Empresa' => $empresa
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
    
    public function Administracion_DatosDocumentosLegalesClientes(Request $request){
        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
        
        $IdEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);
        
        $sqlUnidades = DB::SELECT("SELECT un.IdUnidad as Hash, un.nombre as Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$IdEmpresa." order by un.IdUnidad");
        
        
        foreach($sqlUnidades as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            'Unidad'=>$sqlUnidades,
            'TipoDocumento'=>(new Controller)->ListarDatosHash("par_documento_legal_cliente","Id","Nombre"),
            "TiposContrato"=>(new Controller)->ListarDatosHash("par_tipocontratocliente","Id","Nombre")
        ]);
    }
    
    public function Administracion_ListarClientesUnidadNegocio(Request $request){
        $Sql = DB::SELECT("SELECT DISTINCT "
                . "c.IdCliente as Hash, c.NombreComercial as Nombre "
                . "FROM Cliente c "
                . "INNER JOIN par_usuariocliente p on p.IdCliente = c.IdCliente "
                . "WHERE p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." "
                . "and p.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request->input('Hash2'))." "
                . "AND c.Estado = 1 "
                . "ORDER BY c.NombreComercial asc");
        foreach($Sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt( $d->Hash);
        }
        return response()->json([
            'Cliente'=>$Sql
        ]);
    }
    
    public function Administracion_ClientesGeneral(Request $request){
        
        $draw = $request['draw'];
        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] );
        }
        $sqlFrom = "FROM "
                . "Cliente i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN par_usuariocliente p on i.IdCliente = p.IdCliente "
                . "WHERE i.Estado = ".$request['search']['Estado']." and p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash')).$Comp_Unidad;

        $sqlCampos = " DISTINCT i.IdCliente as id, i.NombreComercial, i.NombreLegal, i.Nit, i.Estado, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.NombreComercial like '%".$searchValue."%' or "
                   . "i.NombreLegal like '%".$searchValue."%' or "
                   . "i.Nit like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "NombreComercial"=>$row->NombreComercial,
                "Nit"=>$row->Nit,
                "Estado"=>$row->Estado,
                "NombreLegal"=>($row->NombreLegal),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_DocumentosLegalesCliente(Request $request){
        
        $draw = $request['draw'];

        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] );
        }
        
        $Comp_TP = "";
        if( $request['search']['TipoDocumento'] != 0 ){
            $Comp_TP = " and  i.IdTipoDocumento = ".(new Controller)->CodeDescrypt( $request['search']['TipoDocumento'] );
        }
        $Comp_Clie = "";
        if( $request['search']['Cliente'] != 0 ){
            $Comp_Clie = " and  i.IdCliente = ".(new Controller)->CodeDescrypt( $request['search']['Cliente'] );
        }
        
        $sqlFrom = "FROM "
                . "documento_legal_cliente i "
                . "INNER JOIN Cliente cx on cx.IdCliente = i.IdCliente "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Documento_Legal_Cliente c on i.IdTipoDocumento = c.Id "
                . "INNER JOIN par_usuariocliente p on i.IdCliente = p.IdCliente  "
                . "WHERE p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." ".$Comp_Unidad.$Comp_TP.$Comp_Clie;

        $sqlCampos = " DISTINCT i.id, cx.Nit, cx.NombreComercial, i.Archivo, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "cx.Nit like '%".$searchValue."%' or "
                   . "cx.NombreComercial like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "NombreComercial"=>$row->NombreComercial,
                "Nit"=>$row->Nit,
                "TipoDocumento"=>($row->TipoDocumento),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_Datos_ContratosCliente(Request $request){
        
        $draw = $request['draw'];
        
        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] );
        }
        
        $Comp_TP = "";
        if( $request['search']['TipoDocumento'] != 0 ){
            $Comp_TP = " and  i.IdTipoContrato = ".(new Controller)->CodeDescrypt( $request['search']['TipoDocumento'] );
        }
        
        $Comp_Clie = "";
        if( $request['search']['Cliente'] != 0 ){
            $Comp_Clie = " and  i.IdCliente = ".(new Controller)->CodeDescrypt( $request['search']['Cliente'] );
        }
        
        $sqlFrom = "FROM "
                . "contrato_cliente i "
                . "INNER JOIN Cliente cx on i.IdCliente  = cx.IdCliente "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN par_tipocontratocliente c on i.IdTipoContrato = c.Id "
                . "INNER JOIN par_usuariocliente p on i.IdCliente = p.IdCliente  "
                . "WHERE p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." ".$Comp_Unidad.$Comp_TP.$Comp_Clie;

        $sqlCampos = " DISTINCT i.id, cx.Nit, cx.NombreComercial, i.Nombre, i.FechaFirma, i.FechaVencimiento,i.Valor, i.Archivo, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoContrato ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "cx.Nit like '%".$searchValue."%' or "
                   . "cx.NombreComercial like '%".$searchValue."%' or "
                   . "i.FechaFirma like '%".$searchValue."%' or "
                   . "i.FechaVencimiento like '%".$searchValue."%' or "
                   . "i.Valor like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Nit"=>$row->Nit,
                "NombreComercial"=>$row->NombreComercial,
                "Nombre"=>($row->Nombre),
                "FechaFirma"=>($row->FechaFirma),
                "FechaVencimiento"=>($row->FechaVencimiento),
                "Valor"=>($row->Valor),
                "TipoContrato"=>($row->TipoContrato),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR"=>(new Controller)->ValidarPermisoUsuario("INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR",session('keyUser'),0)
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_ListarDatosContactoCliente(Request $request) {
        $Credentials = $this->validate($request, [
            'Hash' => 'required|string',
        ]);
        
        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] )." ";
        }
        
        $Comp_Clie = "";
        if( $request['search']['Cliente'] != 0 ){
            $Comp_Clie = " and  c.IdCliente = ".(new Controller)->CodeDescrypt( $request['search']['Cliente'] )." ";
        }
        
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $sqlFrom = " FROM "
        . "contactos_cliente cc "
                . "INNER JOIN Cliente c on cc.IdCliente = c.IdCliente "
                . "INNER JOIN par_usuariocliente p on cc.IdCliente = p.IdCliente $Comp_Unidad $Comp_Clie "
                . "WHERE c.Estado = 1 AND p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash') )." ".$Comp_Unidad.$Comp_Clie
        ;
        
        $sqlCampos = " DISTINCT cc.Id, c.NombreComercial, c.Nit, cc.Nombre, cc.Cargo, date_format(cc.fechahora,'%Y-%m-%d') as fechahora, "
                . "case when cc.Estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, cc.Estado , "
                . "cc.Cargo, cc.Celular, cc.Telefono, cc.Correo, cc.Horario, cc.IdCliente, cc.Dia, cc.Mes, cc.Fecha, cc.Estado";
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (cc.Mes like '%".$searchValue."%' or
                cc.Nombre like '%".$searchValue."%' or
                c.NombreComercial like '%".$searchValue."%' or
                c.Nit like '%".$searchValue."%' or
                cc.cargo like '%".$searchValue."%' or cc.correo like '%".$searchValue."%') ";
        }

        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach ($empRecords['empRecords'] as $row) {
            $data[] = array(
                "Num"=>$i,
                "id"=>(new Controller)->CodeEncrypt($row->Id),
                "Nombre"=>$row->Nombre,
                "Nit"=>$row->Nit,
                "NombreComercial"=>$row->NombreComercial,
                "Cargo"=>$row->Cargo,
                "Celular"=>$row->Celular,
                "Telefono"=>$row->Telefono,
                "Correo"=>$row->Correo,
                "Horario"=>$row->Horario,
                "Dia"=>$row->Dia,
                "Mes"=>$row->Mes,
                "fechahora"=>$row->fechahora,
                "Estado"=>$row->Estado,
                "NombreEstado"=>$row->NombreEstado
              );
             $i++;
        }
        ## Response
        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),//$empRecords['totalRecords'],
            "iTotalDisplayRecords" => count($data),//$empRecords['totalRecordwithFilter'],
            "aaData" => $data,
            "SQL" => $sqlCampos.$sqlFrom
        );

        return json_encode($response);
    }
    
    public function Administracion_DatosNegociacionesClientes(Request $request){
        $draw = $request['draw'];
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and px.IdUnidadNegocio = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] );
        }
        
        $Comp_Clie = "";
        if( $request['search']['Cliente'] != 0 ){
            $Comp_Clie = " and  n.IdCliente = ".(new Controller)->CodeDescrypt( $request['search']['Cliente'] );
        }
        
        $sqlFrom = "FROM "
                . "negociaciones n "
                . "INNER JOIN Par_PagoCliente p on n.IdCondicionPago  = p.Id "
                . "INNER JOIN Par_InformacionTributaria it on n.IdRegimen  = it.Id "
                . "INNER JOIN TiposComision t on n.TipoRentabilidad  = t.Id "
                . "INNER JOIN Empresa e on n.IdEmpresa  = e.IdEmpresa and e.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." "
                . "INNER JOIN Par_UsuarioEmpresa pe on e.IdEmpresa = pe.IdEmpresa and pe.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN Unidad_negocio un on n.IdUnidad  = un.IdUnidad  "
                . "INNER JOIN Par_UsuarioUnidad pu on un.IdUnidad = pu.IdUnidad and pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN usuario u on n.IdUsuario = u.idusuario "
                . "INNER JOIN par_usuariocliente px on n.IdCliente = px.IdCliente  "
                . "INNER JOIN Cliente c on n.IdCliente = c.IdCliente "
                . "WHERE px.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." ".$Comp_Unidad.$Comp_Clie;

        $sqlCampos = " DISTINCT n.id, c.Nit, c.NombreComercial as Cliente, n.Estado, n.Porcentaje, e.NombreComercial as Empresa,un.nombre as Unidad, p.Nombre as Dias, it.Nombre as Regimen, t.Nombre as Comision, n.Autoretenedor,  "
                . "date_format(n.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "n.Porcentaje like '%".$searchValue."%' or "
                   . "e.NombreComercial like '%".$searchValue."%' or "
                   . "c.NombreComercial like '%".$searchValue."%' or "
                   . "c.Nit like '%".$searchValue."%' or "
                   . "un.nombre like '%".$searchValue."%' or "
                   . "p.Nombre like '%".$searchValue."%' or "
                   . "it.Nombre like '%".$searchValue."%' or "
                   . "t.Nombre like '%".$searchValue."%' or "
                   . "date_format(n.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR')");
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Porcentaje"=>($row->Porcentaje),
                "Empresa"=>($row->Empresa),
                "Unidad"=>($row->Unidad),
                "Cliente"=>($row->Cliente),
                "Nit"=>($row->Nit),
                "Dias"=>($row->Dias),
                "Estado"=>($row->Estado),
                "Regimen"=>($row->Regimen),
                "Comision"=>($row->Comision),
                "Autoretenedor"=>($row->Autoretenedor),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR"=>$INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_ListarProveedores(Request $request){
        $draw = $request['draw'];
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        
        $sqlFrom = "FROM "
                . "Proveedor i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_UsuarioEmpresa pe on u.IdUsuario = pe.IdUsuario and pe.idUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN Asoc_Empresa_Proveedor af on pe.IdEmpresa = af.IdEmpresa and af.IdProveedor = i.IdProveedor "
                . "and af.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash') )." "
                . "WHERE i.Estado = ".$request['search']['Estadox'];

        $sqlCampos = "DISTINCT CASE WHEN ISNULL(i.Actividad) THEN '' ELSE i.Actividad END AS Actividad,i.IdProveedor as Hash, i.Nit, i.NombreComercial, i.NombreLegal, i.Telefono, i.Direccion, i.Estado, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "i.Nit like '%".$searchValue."%' or "
                   . "i.NombreComercial like '%".$searchValue."%' or "
                   . "i.NombreLegal like '%".$searchValue."%' or "
                   . "i.Telefono like '%".$searchValue."%' or "
                   . "i.Direccion like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "Nit"=>($row->Nit),
                "NombreComercial"=>($row->NombreComercial),
                "Estado"=>($row->Estado),
                "NombreLegal"=>($row->NombreLegal),
                "Telefono"=>($row->Telefono),
                "Direccion"=>($row->Direccion),
                "Actividad"=>($row->Actividad),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_DatosDocumentosProveedores(Request $request){
        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
        
        $IdEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);
        $sqlProveedor = DB::SELECT("SELECT "
                . "p.IdProveedor as Hash, p.NombreComercial "
                . "FROM Proveedor p "
                . "INNER JOIN Asoc_Empresa_Proveedor ap on p.IdProveedor = ap.IdProveedor and ap.IdEmpresa = $IdEmpresa order by p.NombreComercial");
        foreach($sqlProveedor as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            'Proveedor'=>$sqlProveedor,
            'TipoDocumento'=>(new Controller)->ListarDatosHash("par_documento_legal_proveedor","Id","Nombre"),
        ]);
    }
    
    public function Administracion_DocumentosLegalesProveedor(Request $request){
        
        $draw = $request['draw'];
        
        $CompProv = " i.IdProveedor = i.IdProveedor ";
        if( $searchValue = $request['search']['Proveedor'] != 0 ){
            $CompProv = " i.IdProveedor = ".(new Controller)->CodeDescrypt( $searchValue = $request['search']['Proveedor'] );
        }
        
        $CompTP = " and i.IdDocumentoLegal = i.IdDocumentoLegal ";
        if( $searchValue = $request['search']['TipoDocumento'] != 0 ){
            $CompTP = " and i.IdDocumentoLegal = ".(new Controller)->CodeDescrypt( $searchValue = $request['search']['TipoDocumento'] );
        }
        $sqlFrom = "FROM "
                . "Documento_Legal_Proveedor i "
                . "INNER JOIN Proveedor p on i.IdProveedor = p.IdProveedor "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Documento_Legal_Proveedor c on i.IdDocumentoLegal = c.Id "
                . "INNER JOIN Asoc_Empresa_Proveedor af on af.IdProveedor = i.IdProveedor "
                . "and af.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash') )." "
                . "WHERE ".$CompProv.$CompTP;

        $sqlCampos = " i.id, i.Archivo, p.Nit, p.NombreComercial, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "p.Nit like '%".$searchValue."%' or "
                   . "p.NombreComercial like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_PROVEEDOR_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDOR_DOCUMENTOS')");
        
        
        
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
			
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "NombreComercial"=>$row->NombreComercial,
                "Nit"=>$row->Nit,
                "TipoDocumento"=>($row->TipoDocumento),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_PROVEEDOR_DOCUMENTOS"=>$INFORMACION_PROVEEDOR_DOCUMENTOS
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_DocumentosLegalesProveedorA(Request $request){
        
        $draw = $request['draw'];
        
        
        $CompProv = " i.IdProveedor = i.IdProveedor ";
        if( $searchValue = $request['search']['Proveedor'] != 0 ){
            $CompProv = " i.IdProveedor = ".(new Controller)->CodeDescrypt( $searchValue = $request['search']['Proveedor'] );
        }
        
        $sqlFrom = "FROM "
                . "documentosadicionalesproveedor i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Proveedor pp on i.IdProveedor = pp.IdProveedor "
                . "INNER JOIN Asoc_Empresa_Proveedor af on af.IdProveedor = i.IdProveedor "
                . "and af.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash') )." "
                . "WHERE ".$CompProv;

        $sqlCampos = " i.id, i.Archivo, i.Nombre, pp.Nit, pp.NombreComercial, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "pp.Nit like '%".$searchValue."%' or "
                   . "pp.NombreComercial like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_PROVEEDOR_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDOR_DOCUMENTOS')");
        
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Nit"=>$row->Nit,
                "NombreComercial"=>$row->NombreComercial,
                "Nombre"=>($row->Nombre),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_PROVEEDOR_DOCUMENTOS"=>$INFORMACION_PROVEEDOR_DOCUMENTOS
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function Administracion_ListarDatosContactoProveedor(Request $request)
    {
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        // dd($request['columns']);
        $draw = $request['draw'];
        
        $CompProv = " cp.IdProveedor = cp.IdProveedor ";
        if( $searchValue = $request['search']['Proveedor'] != 0 ){
            $CompProv = " cp.IdProveedor = ".(new Controller)->CodeDescrypt( $searchValue = $request['search']['Proveedor'] );
        }
        
        $sqlAdicional = "";

        $sqlFrom = "FROM "
                . "contactos_proveedor cp "
                . "INNER JOIN usuario u on cp.idusuario = u.idusuario "
                . "INNER JOIN Proveedor pp on cp.IdProveedor = pp.IdProveedor "
                . "INNER JOIN Asoc_Empresa_Proveedor af on af.IdProveedor = cp.IdProveedor "
                . "and af.IdEmpresa = ".(new Controller)->CodeDescrypt( $request->input('Hash') )." "
                . "where ".$CompProv.$sqlAdicional;

        $sqlCampos = "cp.Id, pp.Nit,pp.NombreComercial,cp.Nombre, cp.Cargo, cp.Telefono, cp.Celular, cp.Correo, cp.Horario, date_format(cp.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when cp.Estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, cp.Estado , "
                . "u.nombreusuario ";

        ## Search
        $searchQuery = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (cp.Nombre like '%".$searchValue."%' or
                cp.Cargo like '%".$searchValue."%' or
                pp.Nit like '%".$searchValue."%' or
                pp.NombreComercial like '%".$searchValue."%' or
                cp.Correo like'%".$searchValue."%' or
                cp.Horario like'%".$searchValue."%') ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){
            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Nit"=>$row->Nit,
              "NombreComercial"=>$row->NombreComercial,
              "Cargo"=>$row->Cargo,
              "Telefono"=>$row->Telefono,
              "fechahora"=>$row->fechahora,
              "Celular"=>$row->Celular,
              "Estado"=>$row->Estado,
              "NombreEstado"=>$row->NombreEstado,
                
              "Correo"=>$row->Correo,
              "Horario"=>$row->Horario
            );
           $i++;
        }

        ## Response
        $response = array(
          "draw" => intval($empRecords['draw']),
          "iTotalRecords" => count($data),
          "iTotalDisplayRecords" => count($data),
          "aaData" => $data
        );

        return json_encode($response);
    }
}
