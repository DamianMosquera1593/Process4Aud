<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BienvenidaController
 *
 * @author Damian Mosquera
 */

namespace App\Http\Controllers\Process\Produccion;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;

class AprobacionesController extends Controller
{
    public function index_aprobaciones(){
        
        $datos = [
            "PRODUCCION_APROBACIONES_PPTO"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_APROBACIONES_PPTO",session('keyUser'),0),
            "PRODUCCION_APROBACIONES_ANTICIPOS"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_APROBACIONES_ANTICIPOS",session('keyUser'),0),
            "PRODUCCION_APROBACIONES_LEGALIZACIONES"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_APROBACIONES_LEGALIZACIONES",session('keyUser'),0),
            "PRODUCCION_APROBACIONES_CIERREPPTO"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_APROBACIONES_CIERREPPTO",session('keyUser'),0),
        ];
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.produccion.pro_aprobaciones')->with('datos',$datos);
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //
    public function ListarPptoPendientes(Request $request){
        $draw = $request['draw'];
        
        $Comp_Empresa = "";
        if( $request['search']['HashEmpresa'] != 0 ){
            $Comp_Unidad = " and p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request['search']['HashEmpresa'] );
        }
        
        $Comp_Unidad = "";
        if( $request['search']['HashUnidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidad = ".(new Controller)->CodeDescrypt( $request['search']['HashUnidad'] );
        }
        
        $Comp_Cliente = "";
        if( $request['search']['HashCliente'] != 0 ){
            $Comp_Cliente = " and p.IdCliente = ".(new Controller)->CodeDescrypt( $request['search']['HashCliente'] );
        }
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "solicitudaprobacionppto s "
                . "INNER JOIN Presupuesto p on s.IdPpto = p.Id "
                . "INNER JOIN Proyectos ot on p.IdProyecto = ot.Id "
                . "INNER JOIN Usuario u on u.IdUsuario = s.IdUsuario "
                . "INNER JOIN nivelaprobacionppto n on "
                    . "s.IdPpto = n.IdPpto "
                    . "AND s.VersionInterna = n.VersionInterna "
                    . "AND s.VersionCliente = n.VersionCliente "
                    . "AND ISNULL(n.Estado) "
                . "INNER JOIN notificadosnivelaprobacionppto nn on nn.NivelAprobacionPpto_Id = n.Id "
               
                . "WHERE "
                . "s.EstadoAprobacion = 1 "
                . "AND nn.IdUsuarioNot = ".$sqlUser[0]->IdUsuario." "
                . "".$Comp_Empresa.$Comp_Unidad.$Comp_Cliente;

        $sqlCampos = "n.IdSolAprobacion as HashSolAprobacion, "
                . "n.IdPpto, n.VersionInterna, n.VersionCliente, "
                . "u.NombreUsuario as Solicitador, "
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as FechaSol, "
                . "DATE_FORMAT(s.Fecha, '%T') as HoraSol, "
                . "p.Referencia as RefPpto,"
                . "ot.Referencia as RefProyecto, ot.codigo as CodigoOt ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "n.IdPpto like '%".$searchValue."%' or "
                   . "n.VersionInterna like '%".$searchValue."%' or "
                   . "n.VersionCliente like '%".$searchValue."%' or "
                   . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') like '%".$searchValue."%' or "
                   . "p.Referencia  like '%".$searchValue."%' or "
                   . "ot.Referencia like '%".$searchValue."%' or "
                   . "ot.codigo like '%".$searchValue."%' or "
                   . "p.Referencia like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%'  "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "HashSolAprobacion"=>parent::CodeEncrypt($row->HashSolAprobacion),
                "IdPpto"=>$row->IdPpto,
                "Hashp"=>parent::CodeEncrypt($row->IdPpto),
                "VersionInterna"=>$row->VersionInterna,
                "VersionCliente"=>$row->VersionCliente,
                "Solicitador"=>$row->Solicitador,
                "FechaSol"=>$row->FechaSol,
                "HoraSol"=>$row->HoraSol,
                "RefPpto"=>$row->RefPpto,
                "RefProyecto"=>$row->RefProyecto,
                "CodigoOt"=>$row->CodigoOt
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
    
    
    //
    public function DataPresupuestoAprobacion(Request $request){
        $Credentials = $this->validate(request(),[
           'HashP' => 'required|int',
           'HashSol' => 'required|int'
        ]);
        $Ppto = DB::SELECT("SELECT "
                . "Referencia, Id, VersionInterna, VersionCliente "
                . "FROM Presupuesto "
                . "WHERE Id = ".parent::CodeDescrypt($Credentials['HashP']));
        
        return response()->json([
            'Presupuesto'=>$Ppto
        ]);
    }
    
    
    //
    public function ModoAprobacionPptos(){
        //Par_TipoRentabilidad
        $TipoRentabilidad = DB::SELECT("SELECT "
                . "Codigo "
                . "FROM Par_TipoRentabilidad "
                . "WHERE Estado = 1");
        return $TipoRentabilidad[0]->Codigo;
    }
    
    //
    public function PresupuestoGuardarSolAprobacion(Request $request){
        
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'Observ' => 'nullable|string',
        ]);
        
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $CaminoAprobacion = $this->ModoAprobacionPptos();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            
            $InformacionPpto = DB::SELECT("SELECT "
                    . "IdEmpresa, IdUnidad,"
                    . "IdCliente, "
                    . "VersionInterna,"
                    . "VersionCliente "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".parent::CodeDescrypt($Credentials['Hash']));
            $PorcentajeRentabilidadPpto = DB::SELECT("SELECT "
                    . "PorcentajeRentabilidad as Porcentaje "
                    . "FROM pptoversiones "
                    . "WHERE "
                    . "IdPpto = ".parent::CodeDescrypt($Credentials['Hash'])." "
                    . "AND VersionInterna = ".$InformacionPpto[0]->VersionInterna." "
                    . "AND VersionCliente = ".$InformacionPpto[0]->VersionCliente);
            
            
            $EstructuraSQLAprbacion = "";
            $TopBottomAprobacion = "";
            $CamArribaAbajo = 0;
            $Porcentaje = 0;
            $Existe = 0;
            
            if( $CaminoAprobacion == 'EMP' ){
                
                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = 0 ");
                
                
                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;
                    
                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }
                    
                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = 1 "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = 0 "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'UND' ){
                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = ".$InformacionPpto[0]->IdUnidad. " ");
                
                
                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;
                    
                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }
                    
                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = 1 "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = ".$InformacionPpto[0]->IdUnidad. " "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'EMP_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'EMP_UND_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'CLI' ){
                $EstructuraSQLAprbacion = "";
            }
            
            if( $Existe == 0 ){
                return response()->json([
                    'Info'=>1,
                    'OK' => $CaminoAprobacion,
                    'sql'=>$EstructuraSQLAprbacion
                ]);
            }else{
                $id = Array();
                //Actores Ppto
                $Query = 'INSERT INTO pptoactores ('
                        . 'IdPpto,'
                        . 'IdUsuario,'
                        . 'Fecha) '
                        . 'values(?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
                
                //Guardar Datos de Envío a aprobación
                $Query = 'INSERT INTO SolicitudAprobacionPpto ('
                        . 'IdPpto,'
                        . 'VersionInterna,'
                        . 'VersionCliente,'
                        . 'IdUsuario,'
                        . 'Fecha,'
                        . 'Observaciones,'
                        . 'EstadoAprobacion'
                        . ') values (?,?,?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $InformacionPpto[0]->VersionInterna,
                    $InformacionPpto[0]->VersionCliente,
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $Credentials['Observ'],
                    1
                ];
                DB::INSERT($Query,$Data);
                $IdSolicitudAprobacion = DB::getPdo()->lastInsertId();
                array_push($id, $IdSolicitudAprobacion );
                
                
                //Bloqueo de Ppto y Cambio de Estado
                $Query = 'UPDATE Presupuesto SET VersionCerrada = ?, EstadoVersion = ? Where Id = ?';
                $Data = [
                    1,
                    3, //En Aprobación Interna
                    parent::CodeDescrypt($Credentials['Hash'])
                ];

                DB::UPDATE($Query,$Data);
                array_push($id, parent::CodeDescrypt($Credentials['Hash']) );
                
                //Ingresar el cambio de Estado en el Historial
                
                $Query = 'INSERT INTO HistorialEstadosPpto ('
                        . 'IdPpto,'
                        . 'IdEstado,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                        . 'Observacion'
                        . ') '
                        . 'values(?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    3, //En Aprobación Interna
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    'Se envía el Presupuesto a Aprobación Interna.'
                ];

                DB::INSERT($Query,$Data);
                array_push($id, parent::CodeDescrypt($Credentials['Hash']) );
                
                //Ingreso de Nivel de Aprobacion
                $Query = 'INSERT INTO NivelAprobacionPpto ('
                        . 'IdPpto,'
                        . 'VersionInterna,'
                        . 'VersionCliente,'
                        . 'Fecha,'
                        . 'IdEstructura,'
                        . 'IdSolAprobacion'
                        . ') '
                        . 'values(?,?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $InformacionPpto[0]->VersionInterna,
                    $InformacionPpto[0]->VersionCliente,
                    date("Y-m-d H:i:s"),
                    $EstructuraSQLAprbacion[0]->Id,
                    $IdSolicitudAprobacion
                ];

                DB::INSERT($Query,$Data);
                $IdNivelAprobacion = DB::getPdo()->lastInsertId();
                array_push($id, $IdNivelAprobacion );
                
                
                //Notificados Estructura
                foreach( $EstructuraSQLAprbacion as $e ){
                    $Query = 'INSERT INTO NotificadosNivelAprobacionPpto ('
                        . 'Fecha,'
                        . 'IdUsuarioNot,'
                        . 'NivelAprobacionPpto_Id'
                        . ') '
                        . 'values(?,?,?)';
                    $Data = [
                        date("Y-m-d H:i:s"),
                        $e->IdAprobador,
                        $IdNivelAprobacion
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId() );
                    
                }
                DB::commit();
                
                return response()->json([
                    'Info'=>1,
                    'OK' => 1,
                    'Existe' =>$Existe
                ]);
            }
            
        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
    
    //
    public function PresupuestoNextAprobacion($IdPpto,$Nivel,$IdSolicitudAprobacion){
        try{
            
        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
    
    //
    public function EvalAprobacionPresupuesto(Request $request){
        $Credentials = $this->validate(request(),[
           'HashP' => 'required|int',
           'HashSol' => 'required|int',
           'Tip' => 'required|int',
           'Obser' => 'required|string',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('HashP'));
            $Solicitud = parent::CodeDescrypt($request->input('HashSol'));
            
            $DataSolicitud = DB::SELECT("SELECT "
                    . "IdPpto, VersionInterna, VersionCliente,Nivel "
                    . "FROM solicitudaprobacionppto "
                    . "WHERE Id = $Solicitud");
            
            $Query = 'UPDATE solicitudaprobacionppto SET Nivel = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                $DataSolicitud[0]->Nivel+1,
                $Solicitud
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            $Query = 'UPDATE nivelaprobacionppto SET Estado = ? '
                    . 'WHERE IdPpto = ? '
                    . 'AND VersionInterna = ? '
                    . 'AND VersionCliente = ? '
                    . 'AND ISNULL(Estado) ';
            $Data = [
                $Credentials['Tip'],
                $Ppto,
                $DataSolicitud[0]->VersionInterna,
                $DataSolicitud[0]->VersionCliente
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            //historicoaprobacionppto
            $Query = 'INSERT INTO historicoaprobacionppto ('
                    . 'IdAprobador,'
                    . 'FechaAprobacion,'
                    . 'Observaciones,'
                    . 'Estado,'
                    . 'IdPpto,'
                    . 'VersionInterna,'
                    . 'VersionCliente'
                    . ') VALUES (?,?,?,?,?,?,?)';
            
            $Data = [
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $Credentials['Obser'],
                $Credentials['Tip'],
                $Ppto,
                $DataSolicitud[0]->VersionInterna,
                $DataSolicitud[0]->VersionCliente
            ];
            
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            
            //Actores
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            

            //Siguiente Paso
            $NextStep = $DataSolicitud[0]->Nivel + 1;
            //$this->PresupuestoNextAprobacion($Ppto, $NextStep, $Solicitud);
            
            //------------------------------------------------------------------
            $CaminoAprobacion = $this->ModoAprobacionPptos();
            $InformacionPpto = DB::SELECT("SELECT "
                    . "IdEmpresa, IdUnidad,"
                    . "IdCliente, "
                    . "VersionInterna,"
                    . "VersionCliente "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".$Ppto);

            $PorcentajeRentabilidadPpto = DB::SELECT("SELECT "
                    . "PorcentajeRentabilidad as Porcentaje "
                    . "FROM pptoversiones "
                    . "WHERE "
                    . "IdPpto = ".$Ppto." "
                    . "AND VersionInterna = ".$InformacionPpto[0]->VersionInterna." "
                    . "AND VersionCliente = ".$InformacionPpto[0]->VersionCliente);


            $EstructuraSQLAprbacion = "";
            $TopBottomAprobacion = "";
            $CamArribaAbajo = 0;
            $Porcentaje = 0;
            $Existe = 0;
            
            if( $CaminoAprobacion == 'EMP' ){

                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = 0 ");


                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;

                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }

                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = $NextStep "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = 0 "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'UND' ){
                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = ".$InformacionPpto[0]->IdUnidad. " ");


                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;

                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }

                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = $NextStep "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = ".$InformacionPpto[0]->IdUnidad." "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'EMP_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'EMP_UND_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $Existe == 0 ){
                //Bloqueo de Ppto y Cambio de Estado
                $Query = 'UPDATE Presupuesto SET VersionCerrada = ?, EstadoVersion = ? Where Id = ?';
                $Data = [
                    1,
                    4, //Pendiente Aprobación Cliente
                    $Ppto
                ];
                DB::UPDATE($Query,$Data);
                array_push($id, $Ppto);
                $Query = 'INSERT INTO HistorialEstadosPpto ('
                        . 'IdPpto,'
                        . 'IdEstado,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                        . 'Observacion'
                        . ') '
                        . 'values(?,?,?,?,?)';
                $Data = [
                    $Ppto,
                    4, //Pendiente Aprobación Cliente
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    'Se finalizan las aprobaciones.'
                ];

                DB::INSERT($Query,$Data);
                array_push($id, $Ppto );

                //Notificación por correo.

            }else{
                $Query = 'INSERT INTO HistorialEstadosPpto ('
                        . 'IdPpto,'
                        . 'IdEstado,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                        . 'Observacion'
                        . ') '
                        . 'values(?,?,?,?,?)';
                $Data = [
                    $Ppto,
                    3, //En Aprobación Interna
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    'Se  envía el Presupuesto a Aprobación Interna del nivel '.$NextStep
                ];

                DB::INSERT($Query,$Data);
                array_push($id, $Ppto );

                //Ingreso de Nivel de Aprobacion
                $Query = 'INSERT INTO NivelAprobacionPpto ('
                        . 'IdPpto,'
                        . 'VersionInterna,'
                        . 'VersionCliente,'
                        . 'Fecha,'
                        . 'IdEstructura,'
                        . 'IdSolAprobacion'
                        . ') '
                        . 'values(?,?,?,?,?,?)';
                $Data = [
                    $Ppto,
                    $InformacionPpto[0]->VersionInterna,
                    $InformacionPpto[0]->VersionCliente,
                    date("Y-m-d H:i:s"),
                    $EstructuraSQLAprbacion[0]->Id,
                    $Solicitud
                ];

                DB::INSERT($Query,$Data);
                $IdNivelAprobacion = DB::getPdo()->lastInsertId();
                array_push($id, $IdNivelAprobacion );


                //Notificados Estructura
                foreach( $EstructuraSQLAprbacion as $e ){
                    $Query = 'INSERT INTO NotificadosNivelAprobacionPpto ('
                        . 'Fecha,'
                        . 'IdUsuarioNot,'
                        . 'NivelAprobacionPpto_Id'
                        . ') '
                        . 'values(?,?,?)';
                    $Data = [
                        date("Y-m-d H:i:s"),
                        $e->IdAprobador,
                        $IdNivelAprobacion
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId() );

                }
            }
            //------------------------------------------------------------------
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_APROBACIONES_PPTO');
            
            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'Siguiente'=>$Existe
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
}



