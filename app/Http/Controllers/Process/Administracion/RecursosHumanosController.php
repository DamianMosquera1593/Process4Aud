<?php

namespace App\Http\Controllers\Process\Administracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class RecursosHumanosController extends Controller
{
    //2b0f099be8b183340e16eb5370c91799
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

            return view('process.administracion.recursos_humanos')->with('empresas', $empresasUsuario);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //c23e633345eb31645d0d182842db79bd
    public function AdministraciónEmpresaRH($Id)
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
            ->select('NombreLegal', 'NombreComercial')->first();
            $empresa->Hash = $Id;
            
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_EMPCOST",$usuario[0]->IdUsuario,1);
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_PERMISOS = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_PERMISOS",$usuario[0]->IdUsuario,1);
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_HHEMP = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_HHEMP",$usuario[0]->IdUsuario,1);
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_SIMULADOR = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_SIMULADOR",$usuario[0]->IdUsuario,1);
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_ORGANIGRAMA = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_ORGANIGRAMA",$usuario[0]->IdUsuario,1);
            $empresa->ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO = parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO",$usuario[0]->IdUsuario,1);
            
            
            return view("process.administracion.info_empresa_rh")->with('empresa', $empresa);
        }
        return view("process.administracion.info_empresa")->with('empresa', ['error'=>true]);
    }
    
    //604ffcff0d11d12b46e75082cf91d96f
    public function AdministracionSimuladorCostoCargo(Request $request){
        $Salario = ($request->input('SalarioBase') == '') ? 0 : $request->input('SalarioBase');
        $Np = ($request->input('NoPrestacional') == '') ? 0 : $request->input('NoPrestacional');
        $Bonos = ($request->input('Bonos') == '') ? 0 : $request->input('Bonos');
        $Otros = ($request->input('Otros') == '') ? 0 : $request->input('Otros');
        $Tempx = (new Controller)->CalcularCostoEmpleadoMes('SIMULADOR',$Salario,$Np,$Otros,$Bonos,date("Y-m-d"),date("Y"),'');
        $data = [
                'Costos' => $Tempx
            ];

        return response()->json($data, 200);
    }
    
    //afe9f067ad208254a9863edde79d3546
    public function AdministracionListarInformacionPersonalCosto(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        
        $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
        
        $draw = $request['draw'];
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        $id = $idEmpresa;

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 0 || $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and e.estado = ".$request['search']['Estado']." ";
        }else{
            $sqlAdicional = " and e.estado in ( 1,0 ) ";
        }
        $sqlFrom = "FROM "
                . "Empleado e "
                . "INNER JOIN usuario u on e.idusuario = u.idusuario "
                . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                . "INNER JOIN Area ar on c.IdArea = ar.IdArea "
                . "INNER JOIN Unidad_Negocio un on ar.IdUnidad = un.IdUnidad "
                . "INNER JOIN Par_Persona_Tipo_Documento tp on tp.IdTipoDocumento = e.IdTipoDocPersona "
                . "INNER JOIN tipo_contrato_personal tpx on tpx.Id = e.IdTipoContrato "
                . "INNER JOIN tipo_salario tpxs on tpxs.Id = e.IdModalidadContrato "
                . "where un.IdEmpresa = $id ".$sqlAdicional;

        $sqlCampos = " un.IdEmpresa,e.IdEmpleado,tpx.Nombre as TipoContrato, tpxs.Nombre as ModalidadSalario,tpxs.PorcentajeBase,tpxs.PorcentajeNR, "
                . "e.Nombre1,e.Nombre2,e.Apellido1,e.Apellido2,e.Identificacion,e.FechaNacimiento, e.FechaIngreso, e.CorreoEmpresa,"
                . "e.estado, tp.Nombre as TipoDocumento, c.nombre as Cargo, e.foto,date_format(e.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "e.Nombre1 like '%".$searchValue."%' or "
                   . "e.Nombre2 like '%".$searchValue."%' or "
                   . "e.Apellido1 like '%".$searchValue."%' or "
                   . "e.Apellido2 like '%".$searchValue."%' or "
                   . "e.Identificacion like '%".$searchValue."%' or "
                   . "e.FechaNacimiento like '%".$searchValue."%' or "
                   . "e.FechaIngreso like '%".$searchValue."%' or "
                   . "tpx.Nombre like '%".$searchValue."%' or "
                   . "e.CorreoEmpresa like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $ValorTotalEquipo = 0;
        /*foreach($empRecords['empRecords'] as $row){
            $DatosSalariales = DB::SELECT("SELECT "
                    . "Prestacional, NoPrestacional, Bono, Otros "
                    . "FROM empleado_salario "
                    . "WHERE IdEmpleado = ".$row->IdEmpleado." "
                    . "order by IdSalario desc limit 1");
            foreach($DatosSalariales as $ds){
                $ValorTotalEquipo += (new Controller)->CalcularCostoEmpleadoMes($ds->Prestacional,$ds->NoPrestacional,$ds->Otros,$ds->Bono,$row->FechaIngreso,date("Y"),$row->ModalidadSalario)['TotalGlobal'];
            }
            
        }*/

        foreach($empRecords['empRecords'] as $row){
            $DatosSalariales = DB::SELECT("SELECT "
                    . "Prestacional, NoPrestacional, Bono, Otros "
                    . "FROM empleado_salario "
                    . "WHERE IdEmpleado = ".$row->IdEmpleado." "
                    . "order by IdSalario desc limit 1");
            $Tempx = 0;
            foreach($DatosSalariales as $ds){
                $Tempx = (new Controller)->CalcularCostoEmpleadoMes('NORMAL',$ds->Prestacional,$ds->NoPrestacional,$ds->Otros,$ds->Bono,$row->FechaIngreso,date("Y"),$row->ModalidadSalario);
                $ValorTotalEquipo += $Tempx['TotalGlobal'];
            }
            
            
            $Temp = explode("-",$row->FechaIngreso);
            $row->FechaIngreso = parent::NombreDia($row->FechaIngreso).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->IdEmpleado),
                "IdEmpleado"=>($row->IdEmpleado),
                "Nombre1"=>$row->Nombre1,
                "foto"=>$row->foto,
                "Hash2"=>(new Controller)->CodeEncrypt($row->IdEmpresa),
                "TipoContrato"=>$row->TipoContrato,
                "ModalidadSalario"=>$row->ModalidadSalario,
                "Nombre2"=>$row->Nombre2,
                "Apellido1"=>$row->Apellido1,
                "Apellido2"=>$row->Apellido2,
                "Cargo"=>$row->Cargo,
                "Identificacion"=>$row->Identificacion,
                "FechaNacimiento"=>$row->FechaNacimiento,
                "CorreoEmpresa"=>$row->CorreoEmpresa,
                "FechaIngreso"=>$row->FechaIngreso,
                "fechahora"=>$row->fechahora,
                "estado"=>$row->estado,
                "CostoEmpleado"=>$Tempx,
                "nombreusuario"=>$row->nombreusuario,
                "ValorTotalEquipo"=>$ValorTotalEquipo,
                "ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO"=>parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO",$usuario[0]->IdUsuario,1)
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    //afe9f067ad208254a9863edde79d3546x
    public function AdministracionListarInformacionPersonalCostoVacaciones(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        
        $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
        
        $draw = $request['draw'];
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        $id = $idEmpresa;

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 0 || $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and e.estado = ".$request['search']['Estado']." ";
        }else{
            $sqlAdicional = " and e.estado in ( 1,0 ) ";
        }
        $sqlFrom = "FROM "
                . "Empleado e "
                . "INNER JOIN usuario u on e.idusuario = u.idusuario "
                . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                . "INNER JOIN Area ar on c.IdArea = ar.IdArea "
                . "INNER JOIN Unidad_Negocio un on ar.IdUnidad = un.IdUnidad "
                . "INNER JOIN Par_Persona_Tipo_Documento tp on tp.IdTipoDocumento = e.IdTipoDocPersona "
                . "INNER JOIN tipo_contrato_personal tpx on tpx.Id = e.IdTipoContrato "
                . "INNER JOIN tipo_salario tpxs on tpxs.Id = e.IdModalidadContrato "
                . "where un.IdEmpresa = $id ".$sqlAdicional;

        $sqlCampos = " un.IdEmpresa,e.IdEmpleado,tpx.Nombre as TipoContrato, tpxs.Nombre as ModalidadSalario,tpxs.PorcentajeBase,tpxs.PorcentajeNR, "
                . "e.Nombre1,e.Nombre2,e.Apellido1,e.Apellido2,e.Identificacion,e.FechaNacimiento, e.FechaIngreso, e.CorreoEmpresa,"
                . "e.estado, tp.Nombre as TipoDocumento,e.Vacaciones, c.nombre as Cargo, e.foto,date_format(e.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "e.Nombre1 like '%".$searchValue."%' or "
                   . "e.Nombre2 like '%".$searchValue."%' or "
                   . "e.Apellido1 like '%".$searchValue."%' or "
                   . "e.Apellido2 like '%".$searchValue."%' or "
                   . "e.Identificacion like '%".$searchValue."%' or "
                   . "e.FechaNacimiento like '%".$searchValue."%' or "
                   . "e.FechaIngreso like '%".$searchValue."%' or "
                   . "tpx.Nombre like '%".$searchValue."%' or "
                   . "e.CorreoEmpresa like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $ValorTotalEquipo = 0;

        foreach($empRecords['empRecords'] as $row){
            $DatosSalariales = DB::SELECT("SELECT "
                    . "Prestacional, NoPrestacional, Bono, Otros "
                    . "FROM empleado_salario "
                    . "WHERE IdEmpleado = ".$row->IdEmpleado." "
                    . "order by IdSalario desc limit 1");
            $Tempx = 0;
            foreach($DatosSalariales as $ds){
                $t =($ds->Prestacional / 30)*$row->Vacaciones;
                $Tempx = $t; //(new Controller)->CalcularCostoEmpleadoMes('NORMAL',$ds->Prestacional,$ds->NoPrestacional,$ds->Otros,$ds->Bono,$row->FechaIngreso,date("Y"),$row->ModalidadSalario);
                $ValorTotalEquipo += $t;//$Tempx['TotalGlobal'];
            }
            
            
            $Temp = explode("-",$row->FechaIngreso);
            $row->FechaIngreso = parent::NombreDia($row->FechaIngreso).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->IdEmpleado),
                "IdEmpleado"=>($row->IdEmpleado),
                "Nombre1"=>$row->Nombre1,
                "foto"=>$row->foto,
                "Hash2"=>(new Controller)->CodeEncrypt($row->IdEmpresa),
                "TipoContrato"=>$row->TipoContrato,
                "ModalidadSalario"=>$row->ModalidadSalario,
                "Nombre2"=>$row->Nombre2,
                "Apellido1"=>$row->Apellido1,
                "Apellido2"=>$row->Apellido2,
                "Cargo"=>$row->Cargo,
                "Vacaciones"=>$row->Vacaciones,
                "Identificacion"=>$row->Identificacion,
                "FechaNacimiento"=>$row->FechaNacimiento,
                "CorreoEmpresa"=>$row->CorreoEmpresa,
                "FechaIngreso"=>$row->FechaIngreso,
                "fechahora"=>$row->fechahora,
                "estado"=>$row->estado,
                "CostoEmpleado"=>$Tempx,
                "nombreusuario"=>$row->nombreusuario,
                "ValorTotalEquipo"=>$ValorTotalEquipo,
                "ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO"=>parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO",$usuario[0]->IdUsuario,1)
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    //e4d03442bf58c59f6505d2b8f14fe406
    public function AdministracionCalendarioGeneral(){
        
        return view("layouts.Calendario");
    }
    //e4d03442bf58c59f6505d2b8f14fe406D
    public function DataCalendario(){
        $BirthDayPersonal = DB::SELECT("SELECT e.IdEmpleado as Id,"
                . "month(e.Fechanacimiento) as Mes, day(e.Fechanacimiento) as Dia, "
                . "CONCAT(".date("Y").",'-',month(e.Fechanacimiento),'-',day(e.Fechanacimiento) ) as Cumple, "
                . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) AS NombreCompleto, "
                . " c.nombre as Cargo, e.foto "
                . "FROM Empleado e "
                . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                . "WHERE e.estado = 1 "
                . "");
        foreach($BirthDayPersonal as $b){
            if( $b->Mes < 10 ){
                $b->Mes = "0".$b->Mes;
                $b->Cumple = date("Y")."-".$b->Mes."-".$b->Dia;
            }
        }
        $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
        $MisPermisos = DB::SELECT("SELECT "
                . "FechaInicioPermiso, FechaFinPermiso, Justificacion "
                . "FROM Empleado_Permisos "
                . "WHERE Estado in (1,2) AND "
                . "IdUsuario = ".$usuario[0]->IdUsuario);
        $data = [
                'BirthDayPersonal' => $BirthDayPersonal,
                'MisPermisos' => $MisPermisos
            ];

        return response()->json($data, 200);
    }
    
    //5368c3e4f671ab58136634a696c80597
    public function AdministracionGuardarPermisoEmpleado(Request $request){
        $Credentials = $this->validate(request(),[
           'ParDesde' => 'required|date',
           'ParFin' => 'required|date',
           'JustificacionPermiso' => 'required|string',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Query = '';
            $Data = [];
            $id = [];
            if( !empty( $request->file('ParLogo') ) ){
                $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                $Query = 'INSERT INTO empleado_permisos ('
                    . 'IdUsuario,FechaInicioPermiso,FechaFinPermiso,Justificacion,Estado,Adjunto,FechaSolicitud) values (?,?,?,?,?,?,?)';
                $Data = [
                    $sqlUser[0]->IdUsuario,
                    $Credentials['ParDesde'],
                    $Credentials['ParFin'],
                    $Credentials['JustificacionPermiso'],
                    1,
                    $pathLogo,
                    date("Y-m-d H:i:s")
                ];
                
                $request->file('ParLogo')->storeAs('General/Permisos/', $pathLogo);
            }else{
                $Query = 'INSERT INTO empleado_permisos ('
                    . 'IdUsuario,FechaInicioPermiso,FechaFinPermiso,Justificacion,Estado,FechaSolicitud) values (?,?,?,?,?,?)';
                $Data = [
                    $sqlUser[0]->IdUsuario,
                    $Credentials['ParDesde'],
                    $Credentials['ParFin'],
                    $Credentials['JustificacionPermiso'],
                    1,
                    date("Y-m-d H:i:s")

                ];
            }
            
            DB::INSERT($Query,$Data);

            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'ADMINISTRACION_RECURSOS_HUMANOS_PERMISOS');

            DB::commit();
            return redirect()->route('e4d03442bf58c59f6505d2b8f14fe406');

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        }
    }
    
    
    //62fa420c30efd64028c637389a30a366
    public function AdministracionListarInformacionPersonalPermiso(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        
        $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
        
        $draw = $request['draw'];
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        $id = $idEmpresa;

        $sqlAdicional = "  ep.estado = ".$request['search']['Estado']." ";
        $sqlFrom = "FROM "
                . "Usuario u "
                . "INNER JOIN empleado_permisos ep on u.IdUsuario = ep.IdUsuario "
                . "LEFT JOIN Usuario ue on ep.IdAprobador = ue.IdUsuario "
                . "LEFT JOIN par_estadospermisoempleado est on ep.Estado = est.Id "
                . "where ".$sqlAdicional;

        $sqlCampos = " est.Nombre as Estado, u.IdUsuario, ep.Id as IdPermiso, date_format(ep.FechaInicioPermiso,'%Y-%m-%d') as FInicio,"
                . " date_format(ep.FechaFinPermiso,'%Y-%m-%d') as FFin, ep.Justificacion, ep.adjunto, "
                . "case when isnull(ep.observacionesAprobacion) then '' else ep.observacionesAprobacion end as observacionesAprobacion,"
                . "case when isnull(ep.FechaAprobacion) then '' else date_format(ep.FechaAprobacion,'%Y-%m-%d') end  as FechaAprobacion,"
                . "u.NombreUsuario,"
                . "case when isnull(ue.nombreusuario) then '' else ue.nombreusuario end  as Aprador, "
                . "case when isnull(ep.FechaSolicitud) then '' else date_format(ep.FechaSolicitud,'%Y-%m-%d') end as FechaSolicitud ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "ep.FechaSolicitud like '%".$searchValue."%' or "
                   . "ep.Justificacion like '%".$searchValue."%' or "
                   . "est.Nombre like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->IdPermiso),
                "Estado"=>($row->Estado),
                "FInicio"=>$row->FInicio,
                "FFin"=>$row->FFin,
                "Justificacion"=> nl2br($row->Justificacion),
                "adjunto"=>$row->adjunto,
                "Aprador"=>$row->Aprador,
                "observacionesAprobacion"=>nl2br($row->observacionesAprobacion),
                "FechaAprobacion"=>$row->FechaAprobacion,
                "NombreUsuario"=>$row->NombreUsuario,
                "FechaSolicitud"=>$row->FechaSolicitud,
                "ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO"=>parent::ValidarPermisoUsuario("ADMINISTRACION_RECURSOS_HUMANOS_EMPLEADO_VERCOSTO",$usuario[0]->IdUsuario,1)
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    
    //ee91f33ffe93c54671f739b6c6eae9a0
    public function AdministracionGuardarAprobacionPermiso(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'HashOK' => 'required|int',
           'JustificacionPermiso' => 'nullable|string',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Query = '';
            $Data = [];
            $id = [];
            $Query = 'UPDATE empleado_permisos SET '
                    . 'Estado = ? , IdAprobador = ? ,FechaAprobacion = ?, ObservacionesAprobacion = ? '
                    . 'WHERE id = ? ';
            $Data = [
                $Credentials['HashOK'],
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $Credentials['JustificacionPermiso'],
                parent::CodeDescrypt( $Credentials['Hash'] )
            ];
            
            DB::INSERT($Query,$Data);

            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'ADMINISTRACION_RECURSOS_HUMANOS_PERMISOS');

            DB::commit();
            return redirect()->route('e4d03442bf58c59f6505d2b8f14fe406');

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        }
    }
    
    //ea0b52025b37b06640ad20c9d08a986b
    public function AdministracionRHListarUnidadesEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
            $fechaEnc = parent::CodeEncrypt($fecha);
            $idEmpresa = parent::CodeDescrypt($credentials['Hash'] - $fechaEnc);

            $User = DB::SELECT("SELECT IdUsuario, NombreUsuario "
                    . "FROM Usuario "
                    . "WHERE Estado = 1 "
                    . "ORDER BY NombreUsuario asc");


            foreach ($User as $unidad) {
                $unidad->IdUsuario = parent::CodeEncrypt($unidad->IdUsuario);
            }

            return response()->json([
                'Unidades' => $User,
            ]);
        } catch (ValidationException $ex) {
            dd($ex);
        } catch (QueryException $qe) {
            dd($qe);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    
    
    //37898c4006f219c1888f1df8d14c80e0
    public function AdministracionListarDepartamentosUnidad(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'Hash2' => 'required|int',
        ]);
        
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        $IdUnidad = parent::CodeDescrypt($Credentials['Hash2']);

        $unidadesUsuario = DB::table('area AS un')
        ->where(['un.IdUnidad'=>$IdUnidad, 'un.Estado'=>1])
        ->select('un.IdArea','un.Nombre')
        ->distinct()
        ->get();


        foreach ($unidadesUsuario as $unidad) {
            $unidad->IdArea = parent::CodeEncrypt($unidad->IdArea);
        }

        return response()->json([
            'Area' => $unidadesUsuario,
        ]);
    }
    
    //5bbfbb5727e2837eefef6b1b3f338b48
    public function ListarEmpleadosDepartamentos(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'Hash2' => 'required|int',
        ]);
        
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        
        $Where = "WHERE ";
        $Deptos = \GuzzleHttp\json_decode($request->input('Proyectos'));
        if( count($Deptos) == 1 ){
            $Proyectos[0] = parent::CodeDescrypt($Deptos[0]);
            $Where .= " c.IdArea = ".$Proyectos[0];
        }else if( count($Deptos) == 2 ){
            $Proyectos[0] = $Deptos[0];
            $Proyectos[1] = $Deptos[1];
            $Where .= " c.IdArea in (".parent::CodeDescrypt($Proyectos[0]).",".parent::CodeDescrypt($Proyectos[1])." )";
        }else{
            $Where .= " c.IdArea in (";
            for($i = 0; $i < count($Deptos); $i++){
                $Proyectos[$i] = parent::CodeDescrypt($Deptos[$i]);
                if( $i == 0 && count($Deptos) == 0 ){
                    $Where .= $Proyectos[$i]."";
                }else if( $i == 0 && count($Deptos) > 0 ){
                    $Where .= $Proyectos[$i].",";
                }else{
                    $Where .= $Proyectos[$i].",";
                }
            }
            $Where .= ")";
        }
        
        $Data = DB::SELECT("SELECT "
                . "e.IdEmpleado, "
                . "CONCAT(e.Nombre1, ' ', e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) AS NombreCompleto "
                . "FROM Empleado e "
                . "INNER JOIN cargo c on e.IdCargo = c.IdCargo ".$Where);
        
        foreach ($Data as $unidad) {
            $unidad->IdEmpleado = parent::CodeEncrypt($unidad->IdEmpleado);
        }

        return response()->json([
            'Empleados' => $Data,
        ]);
    }
    
    //a9f4808f18f8fb5e6573daffda30f4a4
    public function AdministrativoHorasEmpleadosDeptosEmpresa(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'FechaDesde' => 'required|date',
           'AdminUnidad' => 'required|int',
           'FechaHasta' => 'required|date',
        ]);
        
        $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
        $fechaEnc = parent::CodeEncrypt($fecha);
        $idEmpresa = parent::CodeDescrypt($Credentials['Hash'] - $fechaEnc);
        $idusuario = parent::CodeDescrypt($Credentials['AdminUnidad']);
        
        $Where = " u.IdUsuario = $idusuario ";
        
        $Datos = DB::SELECT("SELECT u.NombreUsuario,h.IdUsuario, "
                . "DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END ) as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE ".$Where." AND (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$Credentials['FechaDesde']."' AND '".$Credentials['FechaHasta']."') "
                . "GROUP BY u.NombreUsuario,h.IdUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d')");
        foreach( $Datos as $d ){
            $Empresa = DB::SELECT("SELECT distinct u.NombreUsuario,h.IdUsuario,h.IdEmpresa, "
                . "DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE h.TipoRegistro = 'Empresa' AND h.IdEmpresa = $idEmpresa AND h.IdUsuario = ".$d->IdUsuario." AND DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') = '".$d->Fecha."' "
                . "GROUP BY u.NombreUsuario,h.IdUsuario,h.IdEmpresa,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d')");
            $d->HorasEmpresa = $Empresa;
            
            $Clientes = DB::SELECT("SELECT distinct u.NombreUsuario,h.IdUsuario,h.IdCliente, c.NombreComercial as Cliente, "
                . "DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "INNER JOIN Cliente c on h.IdCliente = c.IdCliente "
                . "WHERE h.TipoRegistro = 'Cliente' AND h.IdEmpresa = $idEmpresa AND h.IdUsuario = ".$d->IdUsuario." AND DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') = '".$d->Fecha."' "
                . "GROUP BY u.NombreUsuario,h.IdUsuario,h.IdCliente, c.NombreComercial,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d')");
            
            $d->HorasClientes = $Clientes;
            
            $Personal = DB::SELECT("SELECT distinct u.NombreUsuario,h.IdUsuario, "
                . "DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE h.TipoRegistro = 'Personal' AND  h.IdUsuario = ".$d->IdUsuario." AND DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') = '".$d->Fecha."' "
                . "GROUP BY u.NombreUsuario,h.IdUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d')");
            
            $d->HorasPersonal = $Personal;
            
            $d->Horas = $d->Tiempo/60;
            $ActividadesDia = DB::SELECT("SELECT distinct "
                . "hh.Id, CASE WHEN hh.FechaInicio > hh.FechaFin THEN hh.FechaFin ELSE hh.FechaInicio  END AS FechaInicio, "
                    . " CASE WHEN hh.FechaInicio > hh.FechaFin THEN hh.FechaInicio ELSE hh.FechaFin  END AS FechaFin,"
                    . "date_format(hh.FechaInicio,'Y%-%m-%d') as xx, "
                . "CASE WHEN hh.FechaInicio > hh.FechaFin THEN TIMESTAMPDIFF(MINUTE,hh.FechaFin ,hh.FechaInicio)  ELSE TIMESTAMPDIFF(MINUTE,hh.FechaInicio,hh.FechaFin) END as Tiempo, "
                . "hh.Descripcion, hh.TipoRegistro, ha.Nombre as TipoActividad, "
                . "d.Nombre as Departamento,"
                . "case when isnull(e.NombreComercial) then '' else e.NombreComercial end as Empresa,"
                . "case when isnull(u.Nombre) then '' else u.Nombre end as Unidad, "
                . "case when isnull(c.NombreComercial) then '' else c.NombreComercial end  as Cliente "
                . ""
                . "FROM hh_actividades_usuario hh "
                . "INNER JOIN par_tipo_actividad_hh ha on hh.IdTipoActividad = ha.Id "
                . "INNER JOIN par_departamento_trafico d on hh.IdDepartamento = d.Id "
                . "LEFT JOIN Empresa e on hh.IdEmpresa = e.IdEmpresa "
                . "LEFT JOIN unidad_negocio u on hh.IdUnidad = u.IdUnidad "
                . "LEFT JOIN cliente c on hh.IdCliente = c.IdCliente "
                . "WHERE hh.IdUsuario = ".$d->IdUsuario." "
                . "AND date_format(hh.FechaInicio,'%Y-%m-%d')  = '".$d->Fecha."' "
                );
            $d->DetalleDia = $ActividadesDia;
        }
        return response()->json([
            'DataReport' => $Datos,
        ]);
    }
}

