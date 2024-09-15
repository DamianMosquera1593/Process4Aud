<?php

namespace App\Http\Controllers\Process\Trafico;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\MailController;

class TraAdministrativoController extends Controller
{
    //0e304c495ec61f6403b7a4a6bb310dc1
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.trafico.tra_administrativo');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    public function indexNew()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.trafico.tra_administrativo_operativo');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //d4f014e4d8352329412acef13ccebe1c
    public function canalesPrincipalesIndex(Request $request)
    {
        $sqlAdicional = '';
        switch ($request['search']['Estado']) {
            case 0:
                $sqlAdicional = ' Estado = 0 ';
                break;

            case 1:
                $sqlAdicional = ' Estado = 1 ';
                break;

            default:
                $sqlAdicional = ' Estado in (1,0)';
                break;
        }
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $sqlFrom = 'FROM `canales_principales` WHERE (IdUsuario = '.$Usuario->IdUsuario.' OR IdUsuario IS NULL) AND'.$sqlAdicional;
        $sqlCampos = 'Id_CP AS Hash, Nombre, Estado';

        $searchQuery = '';
        $searchValue = $request['search']['value'];
        if ($searchValue != '') {
            $searchQuery = ' AND Nombre LIKE %'.$searchValue.'% ';
        }

        $records = parent::Paginacion($request, $sqlFrom, $sqlCampos, $searchQuery, $searchValue);

        $data = array();
        $i=1;
        foreach ($records['empRecords'] as $row) {
            $grupos = DB::table('grupos')
            ->where('Id_CP', $row->Hash)
            ->where('Estado', 1)
            ->select('Id_Grupo AS Hash', 'Nombre')
            ->get();

            foreach ($grupos as $g) {
                $g->Hash = parent::CodeEncrypt($g->Hash);
            }

            $data[] = array(
                'Num' => $i,
                'Hash' => parent::CodeEncrypt($row->Hash),
                'Nombre' => $row->Nombre,
                'Estado' => $row->Estado,
                'Grupos' => $grupos,
                'TRA_CANAL_DEFAULT' => ($row->Hash == 1 ? true : false)
            );
            $i++;
        }
        $response = array(
            "draw" => intval($records['draw']),
            "iTotalRecords" => $records['totalRecords'],
            "iTotalDisplayRecords" => $records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return response()->json($response, 200);
    }
    
    //d4f014e4d8352329412acef13ccebe1cg
    public function canalesPrincipalesIndexG(Request $request)
    {
        
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $Activos = DB::SELECT("SELECT * FROM (SELECT "
                . "Id_CP AS Hash, Nombre, Estado,Orden, 'PROPIO' as Tipo "
                . "FROM canales_principales "
                . "WHERE (IdUsuario = ".$Usuario->IdUsuario.") AND Estado = 1 "
                . "ORDER BY orden asc) AS B "
                . ""
                );
        $Inactivos = DB::SELECT("SELECT "
                . "Id_CP AS Hash, Nombre, Estado,Orden "
                . "FROM canales_principales "
                . "WHERE (IdUsuario = ".$Usuario->IdUsuario.") AND Estado = 0 "
                . "ORDER BY Orden ASC");
        $Otros = DB::SELECT("SELECT "
                . "distinct cp.Id_CP AS Hash, cp.Nombre, cp.Estado,cp.Orden, 'OTROS' as Tipo "
                . "FROM canales_principales cp "
                . "INNER JOIN actividades ac ON cp.Id_CP = ac.IdCanal and cp.IdUsuario != ".$Usuario->IdUsuario." "
                . "INNER JOIN Responsables r ON ac.Id_Actividad = r.IdActividad AND r.IdUsuario = ".$Usuario->IdUsuario." "
                . "WHERE cp.Estado = 1 ");
        foreach($Otros as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        foreach($Activos as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        foreach($Inactivos as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        $data = [
            'Activos'=>$Activos,
            'Inactivos'=>$Inactivos,
            'Otros'=>$Otros,
            'success' => true
        ];

        return response()->json($data, 200);
    }

    //707808edf4091a3834dad468cb0ad699
    public function crearCanalPrincipal(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'traNombre' => 'required|string',
                'Tipo' => 'nullable|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Reg = [];
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('canales_principales')
            ->insertGetId([
                'Nombre' => $credentials['traNombre'],
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);
            array_push($Reg, $id);
            
            
            if( $credentials['Tipo'] != 0 ){
                $Grupos = DB::SELECT("SELECT "
                        . "Id,Nombre "
                        . "FROM TA_Grupos "
                        . "WHERE TA_Tipos_Id = ".parent::CodeDescrypt($credentials['Tipo'])." "
                        . "Order by Id ASC");
                $t = 1;
                foreach($Grupos as $g){
                    $idx = DB::table('Grupos')
                    ->insertGetId([
                        'Nombre' => $g->Nombre,
                        'IdUsuario' => $Usuario->IdUsuario,
                        'Estado' => 1,
                        'Id_CP' => $id,
                        'Orden'=> $t,
                        'FechaHora' => date('Y-m-d H:i:s')
                    ]);
                    $t++;
                    array_push($Reg, $idx);
                }
            }
            parent::queryLogAuditoria($Reg, $Usuario->IdUsuario, 'CrearCanalPrincipal');

            
            DB::commit();
            DB::disableQueryLog();
            $data = [
                'mensaje' => 'Se ha creado exitosamente el nuevo canal',
                'success' => true
            ];
            return response()->json($data, 200);

        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //4857d2d55d0323c2dfc5c0f57a6ac236
    public function estadoCanalPrincipal(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['Hash']));
            $cp = DB::table('canales_principales')->where('Id_CP', $idCP)->first();

            $estado = $cp->Estado == 1 ? 0 : 1;

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('canales_principales')
            ->where('Id_CP', $idCP)
            ->update(['Estado'=>$estado]);

            parent::queryLogAuditoria([$idCP], $Usuario->IdUsuario, 'EstadoCanalPrincipal');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Estado del canal cambiado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //4857d2d55d0323c2dfc5c0f57a6ac236E
    public function EditCanalPrincipal(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                'traNombre' => 'required|string',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['Hash']));
            $cp = DB::table('canales_principales')->where('Id_CP', $idCP)->first();

            

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('canales_principales')
            ->where('Id_CP', $idCP)
            ->update(['Nombre'=>$credentials['traNombre']]);

            parent::queryLogAuditoria([$idCP], $Usuario->IdUsuario, 'EditarCanalPrincipal');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Nombre del canal cambiado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //4857d2d55d0323c2dfc5c0f57a6ac236D
    public function DelCanalPrincipal(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['Hash']));
            $cp = DB::table('canales_principales')->where('Id_CP', $idCP)->first();

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('canales_principales')
            ->where('Id_CP', $idCP)
            ->delete();

            parent::queryLogAuditoria([$idCP], $Usuario->IdUsuario, 'EliminarCanalPrincipal');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Canal Borrado',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //5db15db172ea2573c2f1b4aa82eec547
    public function gruposIndex(Request $request)
    {
        try {
            $idCP = parent::CodeDescrypt(intval($request['search']['HashCP']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $sqlAdicional = '';
            if ($request['search']['Estado'] != -1) {
                $sqlAdicional = ' Estado = '.$request['search']['Estado'].' ';
            } else {
                $sqlAdicional = ' Estado <> -1 ';
            }

            $sqlFrom = 'FROM `grupos` WHERE Id_CP = '.$idCP.($sqlAdicional =! '' ? ' AND '.$sqlAdicional : ''). 'AND (IdUsuario = '.$Usuario->IdUsuario.' OR IdUsuario IS NULL)';
            $sqlCampos = 'Id_Grupo AS Hash, Nombre, Id_CP AS HashCP, FechaHora, Estado';

            $searchQuery = " ";
            $searchValue = $request['search']['value'];
            if($searchValue != ''){
                $searchQuery = " AND Nombre like '%".$searchValue."%'";
            }

            $records = parent::Paginacion($request, $sqlFrom, $sqlCampos, $searchQuery, $searchValue);

            $data = array();
            $i = 1;

            foreach ($records['empRecords'] as $row) {
                $data[] = array(
                    'Num' => $i,
                    'Hash' => parent::CodeEncrypt($row->Hash),
                    'Nombre' => $row->Nombre,
                    'HashCP' => $row->HashCP,
                    'Estado' => $row->Estado,
                    'TRA_GRUPO_DEFAULT' => ($row->Hash == 1 ? true : false)
                );
                $i++;
            }

            $response = array(
                "draw" => intval($records['draw']),
                "iTotalRecords" => $records['totalRecords'],
                "iTotalDisplayRecords" => $records['totalRecordwithFilter'],
                "aaData" => $data
            );

            return response()->json($response, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //f209192077b7a958de0e8dd5641956e5
    public function crearGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashCP' => 'required|string',
                'traNombre' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['HashCP']));

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('grupos')
            ->insertGetId([
                'Nombre' => $credentials['traNombre'],
                'Id_CP' => $idCP,
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s'),
            ]);

            parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'CrearGrupo');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El grupo ha sido creado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        }  catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //16a8299025b2c27a2ab19a96f320b9bxx
    public function listarTraficoAdministrativo_otros(Request $request){
        try{
            $credentials = $this->validate($request, [
                'HashCP' => 'required|string'
            ]);
            $idCP = parent::CodeDescrypt(intval($credentials['HashCP']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            $TraficoAdministrativo = DB::SELECT(""
                    . "SELECT IdCanal,IdGrupo, NombreGrupo, Hash , IdSubgrupo, NombreTarea, Id_Estado, "
                    . "Tarea, Consecutivo, Id_Grupo, FechaEntrega, FechaHora , SubGrupo, HashSubGrupo "
                    . "FROM (SELECT "
                    . "g.Id_CP as IdCanal,g.Id_Grupo AS IdGrupo, g.Nombre as NombreGrupo, "
                    . "at.Id_Actividad as Hash,sg.Id as IdSubgrupo, "
                    . "CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea, at.Id_Estado, "
                    . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                    . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                    . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                    . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                    . "at.IdSubGrupo as HashSubGrupo "
                    . "FROM Actividades at "
                    . "INNER JOIN Responsables r ON at.Id_Actividad = r.IdActividad AND r.IdUsuario = ".$Usuario->IdUsuario." "
                    . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                    . "LEFT JOIN grupos g  ON at.Id_Grupo = g.Id_Grupo "
                    . "WHERE "
                    . "at.Id_Estado = 1 "
                    . "AND (( at.IdUsuario != ".$Usuario->IdUsuario." and g.Id_CP = $idCP ) or (at.Id_Grupo = 0))"
                    . "AND g.Estado = 1  ) as Datos "
                    . "ORDER BY Consecutivo ASC "
                    . " "
                    //. "ORDER BY g.orden, at.Consecutivo ASC "
                    );
            $Grupos = DB::SELECT("SELECT Id_Grupo as Id, Nombre, Id_Grupo as Hash "
                    . "FROM Grupos "
                    . "WHERE Id_CP = $idCP");
            $SubGrupos = DB::SELECT("SELECT s.Id as Id, s.Nombre, s.Id as Hash "
                    . "FROM Subgrupo s where s.idcanal = $idCP "
                    . "Order by s.Nombre");
            
            foreach($TraficoAdministrativo as $d){
                    $status = DB::table('versionamiento_status', 'vs')
                    ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                    ->where('Id_Actividad', $d->Hash)
                    ->select('s.status')
                    ->latest('vs.FechaHora')->first();
                    $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";

                    
                    $Temp = explode("-",$d->FechaHora);
                    $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $d->FechaHora = $x;
                    if( $d->FechaEntrega != NULL ){
                        $Temp = explode("-",$d->FechaEntrega);
                        $x = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $d->FechaEntrega = $x;
                    }else{
                        $d->FechaEntrega = "Por definir";
                    }
                    
                    
                    $Responsables = DB::SELECT("SELECT "
                            . "Id, Nombre, Email, ImgUsuario "
                            . "FROM ( "
                            . "SELECT "
                            . "r.Id_Responsable as Id, u.NombreUsuario as Nombre, u.Correo as Email, u.ImgUsuario "
                            . "FROM Responsables r "
                            . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                            . "WHERE r.IdActividad = ".$d->Hash." AND ISNULL(Nombre)) as Resp "
                            . "Order by Nombre ASC ");
                    $d->Responsables = $Responsables;
                    
                    $d->Hash =  parent::CodeEncrypt($d->Hash);
            }
            
            foreach($Grupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            foreach($SubGrupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            
            $data = [
                'Actividades' => $TraficoAdministrativo,
                'Grupos' => $Grupos,
                'SubGrupos' => $SubGrupos,
                'success' => true
            ];
            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //16a8299025b2c27a2ab19a96f320b9bx
    public function listarTraficoAdministrativo(Request $request){
        try{
            $credentials = $this->validate($request, [
                'HashCP' => 'required|string'
            ]);
            $idCP = parent::CodeDescrypt(intval($credentials['HashCP']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            $TraficoAdministrativo = DB::SELECT(""
                    . "SELECT IdCanal,IdGrupo, NombreGrupo, Hash , IdSubgrupo, NombreTarea, Id_Estado, "
                    . "Tarea, Consecutivo, Id_Grupo, FechaEntrega, FechaHora , SubGrupo, HashSubGrupo "
                    . "FROM (SELECT "
                    . "g.Id_CP as IdCanal,g.Id_Grupo AS IdGrupo, g.Nombre as NombreGrupo, "
                    . "at.Id_Actividad as Hash,sg.Id as IdSubgrupo, "
                    . "CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea, at.Id_Estado, "
                    . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                    . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                    . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                    . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                    . "at.IdSubGrupo as HashSubGrupo "
                    . "FROM Actividades at "
                    . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                    . "LEFT JOIN grupos g  ON at.Id_Grupo = g.Id_Grupo "
                    . "WHERE "
                    . "at.Id_Estado = 1 "
                    . "AND (( at.IdUsuario = ".$Usuario->IdUsuario." and g.Id_CP = $idCP ) or (at.Id_Grupo = 0))"
                    . "AND g.Estado = 1 "
                   // . "ORDER BY g.orden, at.Consecutivo ASC "
                    . "UNION ALL "
                    . "SELECT "
                    . "g.Id_CP as IdCanal,g.Id_Grupo AS IdGrupo, g.Nombre as NombreGrupo, "
                    . "at.Id_Actividad as Hash,sg.Id as IdSubgrupo, "
                    . "CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea, at.Id_Estado, "
                    . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                    . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                    . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                    . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                    . "at.IdSubGrupo as HashSubGrupo "
                    . "FROM Actividades at "
                    . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                    . "LEFT JOIN grupos g  ON at.Id_Grupo = g.Id_Grupo "
                    . "WHERE "
                    . "at.Id_Estado = 1 "
                    . "AND at.IdUsuario = ".$Usuario->IdUsuario." and at.Id_Grupo = 0 ) as Datos "
                    . "ORDER BY Consecutivo ASC "
                    . " "
                    //. "ORDER BY g.orden, at.Consecutivo ASC "
                    );
            $Grupos = DB::SELECT("SELECT Id_Grupo as Id, Nombre, Id_Grupo as Hash "
                    . "FROM Grupos "
                    . "WHERE Id_CP = $idCP");
            $SubGrupos = DB::SELECT("SELECT s.Id as Id, s.Nombre, s.Id as Hash "
                    . "FROM Subgrupo s where s.idcanal = $idCP "
                    . "Order by s.Nombre");
            
            foreach($TraficoAdministrativo as $d){
                    $status = DB::table('versionamiento_status', 'vs')
                    ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                    ->where('Id_Actividad', $d->Hash)
                    ->select('s.status')
                    ->latest('vs.FechaHora')->first();
                    $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";

                    
                    
                    $Temp = explode("-",$d->FechaHora);
                    $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $d->FechaHora = $x;
                    
                    $Responsables = DB::SELECT("SELECT "
                            . "Id, Nombre, Email, ImgUsuario "
                            . "FROM ( "
                            . "SELECT "
                            . "r.Id_Responsable as Id, u.NombreUsuario as Nombre, u.Correo as Email, u.ImgUsuario "
                            . "FROM Responsables r "
                            . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                            . "WHERE r.IdActividad = ".$d->Hash." AND ISNULL(Nombre)) as Resp "
                            . "Order by Nombre ASC ");
                    $d->Responsables = $Responsables;
                    
                    $RExternos = DB::SELECT(""
                                . "SELECT Id,Nombre, case when isnull(Correo) then '' else Correo end as Correo, case when isnull(Telefono) then '' else Telefono end as Telefono, funcion "
                                . "FROM traadmin_rexternos "
                                . "WHERE IdActividad = ".$d->Hash);
                        
                        $d->Externos = $RExternos;
                    
                    $d->Hash =  parent::CodeEncrypt($d->Hash);
            }
            
            foreach($Grupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            foreach($SubGrupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            
            
            $data = [
                'Actividades' => $TraficoAdministrativo,
                'Grupos' => $Grupos,
                'SubGrupos' => $SubGrupos,
                'success' => true
            ];
            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //16a8299025b2c27a2ab19a96f320b9bxyy
    public function listarTraficoAdministrativoCerrado(Request $request){
        try{
            $credentials = $this->validate($request, [
                'HashCP' => 'required|string'
            ]);
            $idCP = parent::CodeDescrypt(intval($credentials['HashCP']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            $TraficoAdministrativo = DB::SELECT(""
                    . "SELECT IdCanal,IdGrupo, NombreGrupo, Hash , IdSubgrupo, NombreTarea, Id_Estado, "
                    . "Tarea, Consecutivo, Id_Grupo, FechaEntrega, FechaHora , SubGrupo, HashSubGrupo "
                    . "FROM (SELECT "
                    . "g.Id_CP as IdCanal,g.Id_Grupo AS IdGrupo, g.Nombre as NombreGrupo, "
                    . "at.Id_Actividad as Hash,sg.Id as IdSubgrupo, "
                    . "CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea, at.Id_Estado, "
                    . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                    . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                    . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                    . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                    . "at.IdSubGrupo as HashSubGrupo "
                    . "FROM Actividades at "
                    . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                    . "LEFT JOIN grupos g  ON at.Id_Grupo = g.Id_Grupo "
                    . "WHERE "
                    . "at.Id_Estado = 2 "
                    . "AND (( at.IdUsuario = ".$Usuario->IdUsuario." and g.Id_CP = $idCP ) or (at.Id_Grupo = 0))"
                    . "AND g.Estado = 1 ) as Datos "
                    . "ORDER BY Consecutivo ASC "
                    . " "
                    //. "ORDER BY g.orden, at.Consecutivo ASC "
                    );
            $Grupos = DB::SELECT("SELECT Id_Grupo as Id, Nombre, Id_Grupo as Hash "
                    . "FROM Grupos "
                    . "WHERE Id_CP = $idCP");
            $SubGrupos = DB::SELECT("SELECT s.Id as Id, s.Nombre, s.Id as Hash "
                    . "FROM Subgrupo s where s.idcanal = $idCP "
                    . "Order by s.Nombre");
            
            foreach($TraficoAdministrativo as $d){
                    $status = DB::table('versionamiento_status', 'vs')
                    ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                    ->where('Id_Actividad', $d->Hash)
                    ->select('s.status')
                    ->latest('vs.FechaHora')->first();
                    $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";

                    
                    
                    $Temp = explode("-",$d->FechaHora);
                    $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $d->FechaHora = $x;
                    
                    $Responsables = DB::SELECT("SELECT "
                            . "Id, Nombre, Email, ImgUsuario "
                            . "FROM ( "
                            . "SELECT "
                            . "r.Id_Responsable as Id, u.NombreUsuario as Nombre, u.Correo as Email, u.ImgUsuario "
                            . "FROM Responsables r "
                            . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                            . "WHERE r.IdActividad = ".$d->Hash." AND ISNULL(Nombre)) as Resp "
                            . "Order by Nombre ASC ");
                    $d->Responsables = $Responsables;
                    
                    $RExternos = DB::SELECT(""
                                . "SELECT Id,Nombre, case when isnull(Correo) then '' else Correo end as Correo, case when isnull(Telefono) then '' else Telefono end as Telefono, funcion "
                                . "FROM traadmin_rexternos "
                                . "WHERE IdActividad = ".$d->Hash);
                        
                        $d->Externos = $RExternos;
                    
                    $d->Hash =  parent::CodeEncrypt($d->Hash);
            }
            
            foreach($Grupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            foreach($SubGrupos as $g){
                $g->Hash =  parent::CodeEncrypt($g->Hash);
            }
            
            
            $data = [
                'Actividades' => $TraficoAdministrativo,
                'Grupos' => $Grupos,
                'SubGrupos' => $SubGrupos,
                'success' => true
            ];
            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    
    //16a8299025b2c27a2ab19a96f320b9b3
    public function listaGrupos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashCP' => 'required|string'
            ]);
            $idCP = parent::CodeDescrypt(intval($credentials['HashCP']));
            $grupos = DB::table('grupos')
            ->where('Id_CP', $idCP)
            ->where('Estado', 1)
            ->select('Id_Grupo AS Hash', 'Nombre','Orden','Id_CP')
            ->OrderBy('Orden','asc')
            ->get();

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            
            
            foreach ($grupos as $row) {
                $row->HashCP = parent::CodeEncrypt($row->Id_CP);
                //Sin Asignación:
                $Actividades = DB::SELECT("SELECT "
                        . "at.Id_Actividad as Hash, "
                        . "CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea,"
                        . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                        . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                        . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                        . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                        . "at.IdSubGrupo as HashSubGrupo "
                        . "FROM Actividades at "
                        . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                        . "WHERE "
                        . "at.Id_Estado = 1 "
                        . "AND at.Id_Grupo = ".$row->Hash." "
                        //. "AND at.IdUsuario = ".$Usuario->IdUsuario." "
                        . "AND (isnull(at.IdSubgrupo) or at.IdSubgrupo = 0) "
                        . "ORDER BY at.Consecutivo ASC "
                        . "");

                foreach($Actividades as $d){
                    $status = DB::table('versionamiento_status', 'vs')
                    ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                    ->where('Id_Actividad', $d->Hash)
                    ->select('s.status')
                    ->latest('vs.FechaHora')->first();
                    $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";

                    $d->Hash =  parent::CodeEncrypt($d->Hash);
                    $d->HashSubGrupo =  parent::CodeEncrypt($d->HashSubGrupo);

                    $Temp = explode("-",$d->FechaHora);
                    $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $d->FechaHora = $x;
                }
                $row->SinAsignacion = $Actividades;
                
                $Subgrupos = DB::SELECT("SELECT "
                        . "Id as Hash,Id, Nombre, case when isnull(Descripcion) then '' else Descripcion end as Descripcion "
                        . "FROM Subgrupo "
                        . "WHERE IdGrupo = ".$row->Hash." "
                        . "AND Estado = 1 "
                        . "ORDER BY Orden ASC");
                foreach($Subgrupos as $g){
                    //Subgrupo asignado:
                    $Actividades = DB::SELECT("SELECT "
                            . "at.Id_Actividad as Hash, CASE WHEN ISNULL(at.NombreTarea) THEN '' ELSE at.NombreTarea END AS NombreTarea,"
                            . "CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                            . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                            . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                            . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                            . "at.IdSubGrupo as HashSubGrupo, at.Id_Estado "
                            . "FROM Actividades at "
                            . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                            . "WHERE "
                            . "at.Id_Estado IN (1,2) "
                            . "AND at.Id_Grupo = ".$row->Hash." "
                            //. "AND at.IdUsuario = ".$Usuario->IdUsuario." "
                            . "AND at.IdSubgrupo = ".$g->Hash." "
                            . "ORDER BY at.Consecutivo ASC "
                            . "");

                    foreach($Actividades as $d){
                        $status = DB::table('versionamiento_status', 'vs')
                        ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                        ->where('Id_Actividad', $d->Hash)
                        ->select('s.status')
                        ->latest('vs.FechaHora')->first();
                        $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";
                        
                        
                        
                        $Responsables = DB::SELECT("SELECT "
                                . "Id, Nombre, Email "
                                . "FROM ( SELECT "
                                . "Id_Responsable as Id, Nombre, Email "
                                . "FROM Responsables "
                                . "WHERE IdActividad = ".$d->Hash." AND IdUsuario = 0 "
                                . "UNION ALL "
                                . "SELECT "
                                . "r.Id_Responsable, u.NombreUsuario as Nombre, u.Correo as Email "
                                . "FROM Responsables r "
                                . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                                . "WHERE r.IdActividad = ".$d->Hash." AND ISNULL(Nombre)) as Resp "
                                . "Order by Nombre ASC ");
                        $d->Responsables = $Responsables;
                        
                        $d->Hash =  parent::CodeEncrypt($d->Hash);
                        $d->HashSubGrupo =  parent::CodeEncrypt($d->HashSubGrupo);

                        $Temp = explode("-",$d->FechaHora);
                        $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $d->FechaHora = $x;
                        
                        $Temp = explode("-",$d->FechaEntrega);
                        $x = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $d->FechaEntregaLarga = $x;
                        
                        
                    }
                    $g->Data = $Actividades;
                    
                    $g->Hash = parent::CodeEncrypt($g->Hash);
                }
                $row->Subgrupos = $Subgrupos;
                
                $row->Hash = parent::CodeEncrypt($row->Hash);
            }

            $data = [
                'grupos' => $grupos,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //
    public function TRA_listarResponsables(Request $request){
        $Responsables = DB::SELECT(
                 "SELECT "
                . "r.Id_Responsable, u.NombreUsuario as Nombre, u.Correo as Email, u.ImgUsuario "
                . "FROM Responsables r "
                . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                . "WHERE r.IdActividad = ".parent::CodeDescrypt($request->input('Hash'))." AND ISNULL(Nombre)"
                . " ");
        $data = [
                'Responsables' => $Responsables,
                'success' => true
            ];
            return response()->json($data, 200);
    }
    
    //fea7340349ee95e27531ac0dbd13c2be
    public function TRA_ReorganizarCanales(){
        try {
            $Credentials = $this->validate(request(),[
                'orden' => 'required|string'
            ]);
            $temp = explode("|",$Credentials['orden']);
            $tt = "";
            $x = 0;
            for($i = 0; $i < count($temp)-1;$i++,$x++){
                $t = explode("-",$temp[$i]);
                    $Query = "UPDATE canales_principales SET orden = ".($x+1)." WHERE id_CP = ".(new Controller)->CodeDescrypt($t[0]);
                    DB::INSERT( $Query );
                    $id = $t[0];
                if( ($i+1) < (count($temp)/2) ){

                }
            }
            $data = [
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //f3377de55d049a5c8ff40bd099e304d4
    public function TRA_ReorganizarGrupos(){
        try {
            $Credentials = $this->validate(request(),[
                'orden' => 'required|string'
            ]);
            $temp = explode("|",$Credentials['orden']);
            $tt = "";
            $x = 0;
            for($i = 0; $i < count($temp)-1;$i++,$x++){
                $t = explode("-",$temp[$i]);
                    $Query = "UPDATE grupos SET orden = ".($x+1)." WHERE id_grupo = ".(new Controller)->CodeDescrypt($t[0]);
                    DB::INSERT( $Query );
                    $id = $t[0];
                if( ($i+1) < (count($temp)/2) ){

                }
            }
            $data = [
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //83ae822d145224e43c0f63e502adfb52
    public function estadoGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idG = parent::CodeDescrypt(intval($credentials['Hash']));
            $cp = DB::table('grupos')->where('Id_Grupo', $idG)->first();

            $estado = $cp->Estado == 1 ? 0 : 1;

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('grupos')
            ->where('Id_Grupo', $idG)
            ->update(['Estado'=>$estado]);

            parent::queryLogAuditoria([$idG], $Usuario->IdUsuario, 'EstadoGrupo');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Estado del Grupo ha cambiado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    //83ae822d145224e43c0f63e502adfb52E
    public function NombreEditGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                'traNombre' => 'required|string',
                
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idG = parent::CodeDescrypt(intval($credentials['Hash']));


            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('grupos')
            ->where('Id_Grupo', $idG)
            ->update(['Nombre'=>$credentials['traNombre']]);

            parent::queryLogAuditoria([$idG], $Usuario->IdUsuario, 'EstadoGrupo');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Estado del Grupo ha cambiado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //83ae822d145224e43c0f63e502adfb52SE
    public function NombreEditSubGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                'traNombre' => 'required|string'
                
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idG = parent::CodeDescrypt(intval($credentials['Hash']));


            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('Subgrupo')
            ->where('Id', $idG)
            ->update(['Nombre'=>$credentials['traNombre'],'Descripcion'=>""]);

            parent::queryLogAuditoria([$idG], $Usuario->IdUsuario, 'NombreSubgrupo');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Nombre de Subgrupo Modificado',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //83ae822d145224e43c0f63e502adfb52DS
    public function DelEditGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idG = parent::CodeDescrypt(intval($credentials['Hash']));


            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('grupos')
            ->where('Id_Grupo', $idG)
            ->delete();
            parent::queryLogAuditoria([$idG], $Usuario->IdUsuario, 'EliminarGrupo');
            DB::table('Subgrupo')
            ->where('IdGrupo', $idG)
            ->delete();
            DB::table('Actividades')
            ->where('Id_Grupo', $idG)
            ->delete();

            

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Grupo Borrador',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    //83ae822d145224e43c0f63e502adfb52DSG
    public function DelEditSubGrupo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idG = parent::CodeDescrypt(intval($credentials['Hash']));


            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('Subgrupo')
            ->where('Id', $idG)
            ->delete();

            parent::queryLogAuditoria([$idG], $Usuario->IdUsuario, 'EliminarSubGrupo');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'SubGrupo Borrador',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //56779eaa2b25de80204534dc936146f0
    public function responsablesInfo(Request $request)
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $info = DB::table('responsables')
            ->selectRaw('COUNT(*) AS NumRecords')
            ->where('IdUsuario', $Usuario->IdUsuario)
            ->first();

            $data = [
                'recordsResponsables' => $info->NumRecords,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //d5d93e4b128d6a167cdf5f4109233d3f
    public function responsablesIndex(Request $request)
    {
        $sqlAdicional = '';
        switch ($request['search']['Estado']) {
            case 0:
                $sqlAdicional = ' Estado = 0 ';
                break;

            case 1:
                $sqlAdicional = ' Estado = 1 ';
                break;

            default:
                $sqlAdicional = ' Estado in (1,0)';
                break;
        }
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $sqlFrom = 'FROM `responsables` WHERE IdUsuario = '.$Usuario->IdUsuario.' AND '.$sqlAdicional;
        $sqlCampos = 'Id_Responsable AS Hash, Nombre, Email, Estado';

        $searchQuery = '';
        $searchValue = $request['search']['value'];
        if ($searchValue != '') {
            $searchQuery = ' AND (Nombre LIKE %'.$searchValue.'% OR Email = %'.$searchValue.'%)';
        }

        $records = parent::Paginacion($request, $sqlFrom, $sqlCampos, $searchQuery, $searchValue);
        $data = array();
        $i=1;
        foreach ($records['empRecords'] as $row) {
            $data[] = array(
                'Num' => $i,
                'Hash' => parent::CodeEncrypt($row->Hash),
                'Nombre' => $row->Nombre,
                'Email' => $row->Email,
                'Estado' => $row->Estado
            );
            $i++;
        }
        $response = array(
            "draw" => intval($records['draw']),
            "iTotalRecords" => $records['totalRecords'],
            "iTotalDisplayRecords" => $records['totalRecordwithFilter'],
            "aaData" => $data
        );
        return response()->json($response, 200);
    }

    public function GuardarExternos(Request $request){
        try {
            $credentials = $this->validate($request, [
                'Tel' => 'nullable|string',
                'Nombre' => 'nullable|string',
                'Correo' => 'nullable|email',
                'Hash' => 'nullable|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            DB::beginTransaction();
            DB::enableQueryLog();
            
            $id = DB::table('traadmin_rexternos')
            ->insertGetId([
                'IdUser' => $Usuario->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s'),
                'nombre' => $credentials['Nombre'],
                'correo' => $credentials['Correo'],
                'telefono' => $credentials['Tel'],
                'IdActividad' => parent::CodeDescrypt($credentials['Hash']),
                'funcion' => "",
            ]);

            DB::commit();
            DB::disableQueryLog();
            
            $RExternos = DB::SELECT(""
                . "SELECT Id,Nombre, Correo, Telefono, funcion "
                . "FROM traadmin_rexternos "
                . "WHERE IdActividad = ".parent::CodeDescrypt($credentials['Hash']));
            $data = [
                'Datos'=>$RExternos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    public function EliminarExternos(Request $request){
        
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|int',
                'Hash2' => 'nullable|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            DB::beginTransaction();
            DB::enableQueryLog();
            
            DB::table('traadmin_rexternos')
            ->where('Id', ($credentials['Hash2']))
            ->delete();

            DB::commit();
            DB::disableQueryLog();
            
            $RExternos = DB::SELECT(""
                . "SELECT Id,Nombre, Correo, Telefono, funcion "
                . "FROM traadmin_rexternos "
                . "WHERE IdActividad = ".parent::CodeDescrypt($credentials['Hash']));
            $data = [
                'Datos'=>$RExternos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    public function EditarExternos(Request $request){
        try {
            $credentials = $this->validate($request, [
                'Tel' => 'nullable|string',
                'Nombre' => 'nullable|string',
                'Correo' => 'nullable|email',
                'Hash' => 'nullable|int',
                'Hash2' => 'nullable|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            DB::beginTransaction();
            DB::enableQueryLog();
            
            DB::table('traadmin_rexternos')
            ->where('Id',($credentials['Hash2']))
            ->update(['nombre'=>$credentials['Nombre'],'correo'=>$credentials['Correo'],'telefono'=>$credentials['Tel']]);
            

            DB::commit();
            DB::disableQueryLog();
            
            $RExternos = DB::SELECT(""
                . "SELECT Id,Nombre, Correo, Telefono, funcion "
                . "FROM traadmin_rexternos "
                . "WHERE IdActividad = ".parent::CodeDescrypt($credentials['Hash']));
            $data = [
                'Datos'=>$RExternos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    //f2e6d334358565f4232da5462b9f9c2b
    public function crearResponsables(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'traNombre' => 'nullable|string',
                'traEmail' => 'nullable|email',
                'Hash' => 'nullable|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            $CData = \GuzzleHttp\json_decode($request->input('Cdata'));
            if( count($CData) > 0 ){
                DB::beginTransaction();
                DB::enableQueryLog();
                for($i = 0; $i < count($CData);$i++){
                    $CData[$i] = (array) $CData[$i];
                    $id = DB::table('responsables')
                    ->insertGetId([
                        'IdUsuario' => parent::CodeDescrypt($CData[$i]['IdU']),
                        'FechaHora' => date('Y-m-d H:i:s'),
                        'IdActividad' => parent::CodeDescrypt($credentials['Hash']),
                    ]);
                    $InfoTarea = DB::SELECT("SELECT at.NombreTarea,at.Tarea, at.IdUsuario, u.NombreUsuario, u.Correo "
                            . "FROM actividades at "
                            . "INNER JOIN Usuario u ON u.IdUsuario = at.IdUsuario "
                            . "WHERE at.Id_Actividad = ". parent::CodeDescrypt($credentials['Hash']));
                    if( $InfoTarea[0]->IdUsuario != parent::CodeDescrypt($CData[$i]['IdU']) ){
                        $DatosUsuario = DB::SELECT("SELECT Correo, NombreUsuario FROM Usuario WHERE idUsuario = ".parent::CodeDescrypt($CData[$i]['IdU']));
                        $Info['Asunto'] = "Nueva Actividad Administrativa Asignada - ".$InfoTarea[0]->NombreTarea;
                        $Info['Descripcion'] = nl2br($InfoTarea[0]->Tarea);
                        $Info['RegistradoPor'] = $InfoTarea[0]->NombreUsuario;

                        //$InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                        $Info['RegistradoPorCorreo'] = [$InfoTarea[0]->Correo];
                        $Info['Correos'] = [$DatosUsuario[0]->Correo] ;
                        $Info['UsuariosN'] = [$DatosUsuario[0]->NombreUsuario];
                        /*if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                                $Mensaje = 1;
                            }else{
                                $Mensaje = 0;
                            }*/
                        $data = [
                            'success' => true,
                            'mensaje' => 'La tarea ha sido generada de manera correcta'
                        ];
                    }
                    
                }
                
                DB::commit();
                DB::disableQueryLog();
            }else{
                DB::beginTransaction();
                DB::enableQueryLog();

                $id = DB::table('responsables')
                ->insertGetId([
                    'Nombre' => $credentials['traNombre'],
                    'Email' => $credentials['traEmail'],
                    'IdUsuario' => 0,
                    'FechaHora' => date('Y-m-d H:i:s'),
                    'IdActividad' => parent::CodeDescrypt($credentials['Hash']),
                ]);

                //parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'CrearResponsable');
                DB::commit();
                DB::disableQueryLog();
            }
            
            $data = [
                'mensaje' => 'El responsable ha sido creado exitosamente',
                'Mail' => $Mensaje,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //f2e6d334358565f4232da5462b9f9c2bDE
    public function EliminarResponsableTA(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('responsables')
            ->where('Id_Responsable', ($credentials['Hash']))
            ->delete();

            parent::queryLogAuditoria([$credentials['Hash']], $Usuario->IdUsuario, 'RemoverContacto');
            
            DB::commit();
            DB::disableQueryLog();
            $data = [
                'mensaje' => 'El responsable ha sido borrado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //97a7626758832c60fd7897801ebb9743
    public function estadoResponsable(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idR = parent::CodeDescrypt(intval($credentials['Hash']));
            $cp = DB::table('responsables')->where('Id_Responsable', $idR)->first();

            $estado = $cp->Estado == 1 ? 0 : 1;

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('responsables')
            ->where('Id_Responsable', $idR)
            ->update(['Estado'=>$estado]);

            parent::queryLogAuditoria([$idR], $Usuario->IdUsuario, 'EstadoResponsable');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Estado de responsable cambiado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //87e0029edddca207e3700c06d270f701
    public function listaResponsables(Request $request)
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $responsables = DB::table('responsables')
            ->where('IdUsuario', $Usuario->IdUsuario)
            ->where('Estado', 1)
            ->select('Id_Responsable AS Hash', 'Nombre')
            ->get();

            foreach ($responsables as $row) {
                $row->Hash = parent::CodeEncrypt($row->Hash);
            }

            $data = [
                'responsables' => $responsables,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //968178d58ab4cf07013fb70c7737f0e1
    public function ListarActividadesGrupo(Request $request){
        $idG = parent::CodeDescrypt(intval($request['HashG']));
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $Actividades = DB::SELECT("SELECT "
                . "at.Id_Actividad as Hash, CASE WHEN ISNULL(at.Tarea) THEN '' ELSE at.Tarea END AS Tarea, at.Consecutivo, at.Id_Grupo, "
                . "DATE_FORMAT(at.FechaEntrega,'%Y-%m-%d') as FechaEntrega, "
                . "DATE_FORMAT(at.FechaHora,'%Y-%m-%d') as FechaHora, "
                . "CASE WHEN isnull(sg.Nombre) THEN 'Sin Asignar' ELSE sg.Nombre END AS SubGrupo, "
                . "at.IdSubGrupo as HashSubGrupo "
                . "FROM Actividades at "
                . "LEFT JOIN Subgrupo sg on at.IdSubGrupo = sg.Id "
                . "WHERE "
                . "at.Id_Estado = 1 "
                . "AND at.Id_Grupo = $idG "
                . "AND at.IdUsuario = ".$Usuario->IdUsuario." "
                . "ORDER BY at.Consecutivo ASC "
                . "");
        
        foreach($Actividades as $d){
            $status = DB::table('versionamiento_status', 'vs')
            ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
            ->where('Id_Actividad', $d->Hash)
            ->select('s.status')
            ->latest('vs.FechaHora')->first();
            $d->Status = ( !empty($status) ) ? ( ($status->status == null) ? '' : $status->status ) : "";
            
            $d->Hash =  parent::CodeEncrypt($d->Hash);
            $d->HashSubGrupo =  parent::CodeEncrypt($d->HashSubGrupo);
            
            $Temp = explode("-",$d->FechaHora);
            $x = parent::NombreDia($d->FechaHora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $d->FechaHora = $x;
        }
        
        
        $Subgrupos = DB::SELECT("SELECT "
                . "Id as Hash,Id, Nombre "
                . "FROM Subgrupo "
                . "WHERE IdGrupo = $idG "
                . "AND Estado = 1 "
                . "ORDER BY Orden ASC");
        foreach($Subgrupos as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
        }
        
        $data = [
            'success' => true,
            'Actividades' => $Actividades,
            'Subgrupos' => $Subgrupos
        ];
        return response()->json($data, 200);
    }
    
    
    //f209192077b7a958de0e8dd5641956e5
    public function crearSubGrupoTA(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
                'traNombre' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('subgrupo')
            ->insertGetId([
                'Nombre' => $credentials['traNombre'],
                'Descripcion' => "",
                'IdCanal' => $idCP,
                'IdUsuario' => $Usuario->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s'),
            ]);

            parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'CrearSubgrupo');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El Subgrupo ha sido creado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        }  catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //cb3c45c8f6e50a168409008ce54b486c
    public function EstadoSubGrupoTA(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();
            $sql = DB::SELECT("SELECT Estado FROM Subgrupo WHERE Id = $idCP");
            $Estado = 0;
            if( $sql[0]->Estado == 0 ){
                $Estado = 1;
            }
            $db = DB::UPDATE("UPDATE subgrupo SET Estado = $Estado  WHERE Id = $idCP");
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El grupo ha sido creado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        }  catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //24ef250f391728bc75ed9f7bf52070e5
    public function TA_AddItemGroup(Request $request){
        try {

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCP = parent::CodeDescrypt(intval($request->input('HashCanal')));

            DB::beginTransaction();
            DB::enableQueryLog();
            
            
            $idA = DB::table('actividades')
                ->insertGetId([
                    'Consecutivo' => 99999,
                    'Id_Grupo' => 0,
                    'IdCanal' => $idCP,
                    'Id_Estado' => 1,
                    'FechaHora' => date('Y-m-d H:i:s'),
                    'IdSubgrupo' => 0,
                    'IdUsuario' => $Usuario->IdUsuario
            ]);
            
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El Item ha sido creado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        }  catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //
    public function ListarSubgruposTA(Request $request){
        $Subg = DB::SELECT("SELECT "
                . "Id as Hash, "
                . "Nombre, "
                . "Estado, "
                . "Orden "
                . "FROM Subgrupo "
                . "WHERE Estado = ".$request->input('Estado')." "
                . "AND IdCanal = ".parent::CodeDescrypt($request->input('HashG'))." "
                . "ORDER by Orden ");
        foreach($Subg as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
        }
        
        $data = [
            'success' => true,
            'Subgrupos' => $Subg
        ];
        return response()->json($data, 200);
    }
    
    //d87987d135b74fd157c51d6b7c35cb10
    public function actividadesIndex(Request $request)
    {
        $idG = parent::CodeDescrypt(intval($request['search']['HashG']));
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $sqlAdicional = '';
        if ($request['search']['Estado'] != -1) {
            $sqlAdicional = ' e.Id_Estado = '.$request['search']['Estado'].' ';
        } else {
            $sqlAdicional = ' e.Id_Estado <> -1 ';
        }

        $sqlFrom = 'FROM `actividades` AS a '
            .'JOIN estados AS e ON a.Id_Estado = e.Id_Estado '
            .'JOIN usuario AS u ON a.IdUsuario = u.IdUsuario '
            .'WHERE a.Id_Grupo = '.$idG.' AND a.IdUsuario = '.$Usuario->IdUsuario.' AND '.$sqlAdicional;
        $sqlCampos = 'distinct a.Id_Actividad As Hash, a.Tarea, a.Consecutivo AS Num, '
            .'DATE(a.FechaHora) AS FechaCreacion, TIME(a.FechaHora) AS HoraCreacion, '
            .'DATE(a.FechaEntrega) AS FechaEntrega, TIME(a.FechaEntrega) AS HoraEntrega, '
            .'e.Nombre AS Estado, u.NombreUsuario AS Creador, '
            .'(SELECT COUNT(*) FROM asignaciones WHERE Id_Actividad = a.Id_Actividad AND Id_Tipo = 1) AS NoResponsables, '
            .'(SELECT COUNT(*) FROM asignaciones WHERE Id_Actividad = a.Id_Actividad AND Id_Tipo = 2) AS NoPara, '
            .'(SELECT COUNT(*) FROM tra_adm_contactos WHERE Id_Actividad = a.Id_Actividad) AS NoContactos';

        $searchQuery = '';
        $searchValue = $request['search']['value'];
        if ($searchValue != '') {
            $searchQuery = ' AND (a.Tarea LIKE %'.$searchValue.'% OR a.Consecutivo LIKE %'.$searchValue.'% )';
        }

        $records = parent::Paginacion($request, $sqlFrom, $sqlCampos, $searchQuery, $searchValue);

        $data = array();
        foreach ($records['empRecords'] as $row) {
            $data[] = array(
                'Num' => $row->Num,
                'Hash' => parent::CodeEncrypt($row->Hash),
                'Tarea' => $row->Tarea,
                'Estado' => $row->Estado,
                'FechaCreacion' => $row->FechaCreacion,
                'HoraCreacion' => $row->HoraCreacion,
                'FechaEntrega' => $row->FechaEntrega,
                'HoraEntrega' => $row->HoraEntrega,
                'NoResponsables' => $row->NoResponsables,
                'NoPara' => $row->NoPara,
                'NoContactos' => $row->NoContactos,
                'Creador' => $row->Creador
            );
        }

        $response = array(
            "draw" => intval($records['draw']),
            "iTotalRecords" => $records['totalRecords'],
            "iTotalDisplayRecords" => $records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return response()->json($response, 200);
    }

    //f1d396554e80d9189c1fc3f764dab7d6
    public function crearActividad(Request $request)
    {
        try {
            DB::beginTransaction();
            DB::enableQueryLog();
            $ids = [];
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            //tarea
            $credentials = $this->validate($request, [
                'traTarea' => 'required|string',
                'traStatus' => 'required|string',
                'traHashGrupo' => 'required|string',
                'traFechaEntrega' => 'required|date',
                'traHoraEntrega' => 'required|date_format:H:i',
            ]);

            $idG = parent::CodeDescrypt(intval($credentials['traHashGrupo']));
            $consecutivoActividad = DB::table('actividades')
            ->where('Id_Grupo', $idG)
            ->selectRaw('(COUNT(*)+1) AS Num')
            ->first();
            $fechaEntrega = $credentials['traFechaEntrega'].' '.$credentials['traHoraEntrega'];
            $idA = DB::table('actividades')
            ->insertGetId([
                'Tarea' => $credentials['traTarea'],
                'Consecutivo' => $consecutivoActividad->Num,
                'Id_Grupo' => $idG,
                'Id_Estado' => 1,
                'FechaHora' => date('Y-m-d H:i:s'),
                'FechaEntrega' => $fechaEntrega,
                'IdUsuario' => $Usuario->IdUsuario
            ]);
            array_push($ids, $idA);

            //status
            $idS = DB::table('status')
            ->insertGetId([
                'Status' => $credentials['traStatus'],
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);
            array_push($ids, $idS);

            $id = DB::table('versionamiento_status')
            ->insertGetId([
                'Id_Status' => $idS,
                'Id_Actividad' => $idA,
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);
            array_push($ids, $id);

            //Personal (Responsable, Asignados)
            $credentials = $this->validate($request, [
                'traHashResp' => 'required|array|min:1',
                'traHashResp.*' => 'required|string',
                'traHashPara' => 'required|array|min:1',
                'traHashPara.*' => 'required|string'
            ]);

            foreach($credentials['traHashResp'] as $p) {
                $id = DB::table('asignaciones')
                ->insertGetId([
                    'Id_Actividad' => $idA,
                    'Id_Responsable' => parent::CodeDescrypt(intval($p)),
                    'Id_Tipo' => 1,
                    'IdUsuario' => $Usuario->IdUsuario,
                    'FechaHora' => date('Y-m-d H:i:s')
                ]);
                array_push($ids, $id);
            }

            foreach($credentials['traHashPara'] as $p) {
                $id = DB::table('asignaciones')
                ->insertGetId([
                    'Id_Actividad' => $idA,
                    'Id_Responsable' => parent::CodeDescrypt(intval($p)),
                    'Id_Tipo' => 2,
                    'IdUsuario' => $Usuario->IdUsuario,
                    'FechaHora' => date('Y-m-d H:i:s')
                ]);
                array_push($ids, $id);
            }

            //Contactos
            $credentials = $this->validate($request, [
                'traContactos' => 'required|json'
            ]);

            $contactos = json_decode($credentials['traContactos']);
            $i = 0;
            foreach ($contactos as $c) {
                if( $i > 0 ){
                    $id = DB::table('tra_adm_contactos')
                    ->insertGetId([
                        'Nombre' => $c->nombre,
                        'Email' => $c->email,
                        'Cargo' => $c->cargo,
                        'Telefono' => $c->telefono,
                        'Celular' => $c->celular,
                        'Id_Actividad' => $idA,
                        'IdUsuario' => $Usuario->IdUsuario,
                        'FechaHora' => date('Y-m-d H:i:s')
                    ]);
                    array_push($ids, $id);
                }
                $i++;
            }

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'La actividad se ha guardado exitosamente',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //40ed0a3640b0890533a14eb215c93c3c
    public function crearActividadAsignada(Request $request)
    {

    }

    //eb366d8773473552996a90494502c216
    public function datosActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idA = parent::CodeDescrypt(intval($credentials['Hash']));

            $actividad = DB::table('actividades', 'a')
            ->join('grupos AS g', 'a.Id_Grupo', '=', 'g.Id_Grupo')
            ->join('estados AS e', 'a.Id_Estado', '=', 'e.Id_Estado')
            ->where('Id_Actividad', $idA)
            ->select('a.Id_Actividad AS Hash',
                'e.Nombre', 'e.Id_Estado',
                'a.Tarea',
                'a.Consecutivo',
                'g.Nombre',
                DB::raw('DATE(a.FechaHora) AS FechaCreacion'),
                DB::raw('TIME(a.FechaHora) AS HoraCreacion'),
                DB::raw('DATE(a.FechaEntrega) AS FechaEntrega'),
                DB::raw('TIME(a.FechaEntrega) AS HoraEntrega')
            )
            ->first();

            $status = DB::table('versionamiento_status', 'vs')
            ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
            ->where('Id_Actividad', $idA)
            ->select('s.status')
            ->latest('vs.FechaHora')->first();

            $responsables = DB::table('asignaciones', 'a')
            ->join('responsables AS r', 'a.Id_Responsable', '=', 'r.Id_Responsable')
            ->where('a.Id_Actividad', $idA)
            ->where('Id_Tipo', 1)
            ->selectRaw('CONCAT(r.Nombre, " - ", r.Email) AS Responsable')
            ->get();

            $entregaPara = DB::table('asignaciones', 'a')
            ->join('responsables AS r', 'a.Id_Responsable', '=', 'r.Id_Responsable')
            ->where('a.Id_Actividad', $idA)
            ->where('Id_Tipo', 2)
            ->selectRaw('CONCAT(r.Nombre, " - ", r.Email) AS Para')
            ->get();

            $actividad->Hash = parent::CodeEncrypt($actividad->Hash);
            $actividad->Status = $status->status;
            $actividad->Responsables = $responsables;
            $actividad->EntregaPara = $entregaPara;
            $actividad->TRA_ACTIVIDAD_PENDIENTE = ($actividad->Id_Estado == 1 ? true : false);

            $data = [
                'actividad' => $actividad,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //a9c3a24dfcf3ed2e234ef63de5aadd76
    public function datosStatusActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
            $idA = parent::CodeDescrypt(intval($credentials['Hash']));

            $status = DB::table('versionamiento_status', 'vs')
            ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
            ->where('Id_Actividad', $idA)
            ->select('s.Id_Status AS Hash', 's.Status', 'vs.FechaHora')
            ->orderBy('vs.FechaHora', 'desc')
            ->distinct()->get();

            foreach ($status as $e) {
                $e->Hash = parent::CodeEncrypt($e->Hash);
            }

            $data = [
                'Status' => $status,
                'success' => true
            ];
            return response()->json($data, 200);

        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //4f6625579552fdae8d4a085f4bcf42b0
    public function editarActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'traStatus' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idA = parent::CodeDescrypt(intval($credentials['Hash']));
            // $fecha = $credentials['FechaEntrega'].' '.$credentials['HoraEntrega'];

            DB::beginTransaction();
            DB::enableQueryLog();

            $ids = DB::table('status')
            ->insertGetId([
                'Status' => $credentials['traStatus'],
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);

            $idvs = DB::table('versionamiento_status')
            ->insertGetId([
                'id_Status' => $ids,
                'Id_Actividad' => $idA,
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);



            parent::queryLogAuditoria([$ids, $idvs], $Usuario->IdUsuario, 'EditarStatusActividad');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El status ha sido actualizado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //b168ba6541e9731b395a1448ea4b68c7
    public function terminarActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash'=>'required|int'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idA = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('actividades')
            ->where('Id_Actividad', $idA)
            ->update([
                'Id_Estado' => 2
            ]);

            parent::queryLogAuditoria([$idA], $Usuario->IdUsuario, 'TERMINAR_ACTIVIDAD');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Actividad terminada',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    public function ReactivarActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash'=>'required|int'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idA = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('actividades')
            ->where('Id_Actividad', $idA)
            ->update([
                'Id_Estado' => 1
            ]);

            parent::queryLogAuditoria([$idA], $Usuario->IdUsuario, 'REACTIVAR_ACTIVIDAD');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Actividad terminada',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    //0f721ff9ffe55717d945ead5fc6490b7
    public function contactosActividadIndex(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.HashA' => 'required|string'
            ]);

            $idA = parent::CodeDescrypt(intval($credentials['search']['HashA']));

            $sqlFrom = 'FROM `tra_adm_contactos` WHERE Id_Actividad = '.$idA;
            $sqlCampos = '*';

            $searchQuery = '';
            $searchValue = $request['search']['value'];
            if ($searchValue != '') {
                $searchQuery = ' AND (Nombre LIKE %'.$searchValue.'% OR Email LIKE %'.$searchValue.'%  OR Cargo LIKE %'.$searchValue.'%)';
            }

            $records = parent::Paginacion($request, $sqlFrom, $sqlCampos, $searchQuery, $searchValue);

            $data = array();
            $i = 1;

            foreach ($records['empRecords'] as $row) {
                $data[] = array(
                    'Num' => $i,
                    'Hash'=> parent::CodeEncrypt($row->Id_Contacto),
                    'Nombre' => $row->Nombre,
                    'Email' => $row->Email,
                    'Cargo' => $row->Cargo,
                    'Telefono' => $row->Telefono,
                    'Celular' => $row->Celular
                );
                $i++;
            }

            $response = array(
                "draw" => intval($records['draw']),
                "iTotalRecords" => $records['totalRecords'],
                "iTotalDisplayRecords" => $records['totalRecordwithFilter'],
                "aaData" => $data
            );

            return response()->json($response, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //26a84e78af9544ead650cf8a8391a8f9
    public function crearContactoActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'traHashActividad' => 'required|string',
                'traNombre' => 'required|string',
                'traEmail' => 'required|email',
                'traCargo' => 'nullable|string',
                'traTelefono' => 'nullable|string',
                'traCelular' => 'nullable|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idA = parent::CodeDescrypt(intval($credentials['traHashActividad']));

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('tra_adm_contactos')
            ->insertGetId([
                'Nombre' => $credentials['traNombre'],
                'Email' => $credentials['traEmail'],
                'Id_Actividad' => $idA,
                'Cargo' => $credentials['traCargo'],
                'Telefono' => $credentials['traTelefono'],
                'Celular' => $credentials['traCelular'],
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'CrearContactoTraAdm');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El contacto ha sido agregado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //36c258bdba246ca1281d9e1ebe8d27d4
    public function datosContactoActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [

            ]);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //cb767b07d6d6f1e73045314535175f40
    public function editarContactoActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [

            ]);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //2ab8fbdd4580dd2a1370c8b3e5f06875
    public function eliminarContactoActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idC = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('tra_adm_contactos')
            ->where('Id_Contacto', $idC)
            ->delete();

            parent::queryLogAuditoria([$idC], $Usuario->IdUsuario, 'RemoverContacto');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'El contacto fue eliminado exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //ca3a575bf7f8530345c7ada09511f69d
    public function SaveDataTRAGroupChanelAdmin(Request $request)
    {
        try {
            
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $ids = [];
            $CData = \GuzzleHttp\json_decode($request->input('Cdata'));
            if( count($CData) > 0 ){
                DB::beginTransaction();
                DB::enableQueryLog();
                for($i = 0; $i < count($CData);$i++){
                    $CData[$i] = (array) $CData[$i];
                    $Id = parent::CodeDescrypt($CData[$i]['Hash']);
                    
                    $InfoTarea = DB::SELECT("SELECT at.NombreTarea,at.IdUsuario, u.NombreUsuario, u.Correo "
                            . "FROM actividades at "
                            . "INNER JOIN Usuario u ON u.IdUsuario = at.IdUsuario "
                            . "WHERE at.Id_Actividad = $Id ");
                    
                    DB::table('actividades')
                        ->where('Id_Actividad', $Id)
                        ->update([
                            'Tarea' => $CData[$i]['Actividad'],
                            'NombreTarea' => $CData[$i]['NombreActividad'],
                            'Consecutivo' => $CData[$i]['Orden'],
                            'FechaEntrega' => (empty($CData[$i]['FechaEntrega'])) ? NULL: $CData[$i]['FechaEntrega'],
                            'IdSubgrupo' => ($CData[$i]['Subgrupo'] == 0) ? 0 : parent::CodeDescrypt($CData[$i]['Subgrupo']),
                            'Id_Grupo' => ($CData[$i]['Grupo'] == 0) ? 0 : parent::CodeDescrypt($CData[$i]['Grupo']),
                        ]);
                    
                    array_push($ids, $Id);
                    
                    
                    $status = DB::table('versionamiento_status', 'vs')
                    ->join('status AS s', 'vs.Id_Status', '=', 's.Id_Status')
                    ->where('Id_Actividad', $Id)
                    ->select('s.status')
                    ->latest('vs.FechaHora')->first();
                    $idz = DB::table('status')
                        ->insertGetId([
                            'Status' => $CData[$i]['Status'],
                            'IdUsuario' => $Usuario->IdUsuario,
                            'FechaHora' => date('Y-m-d H:i:s')
                        ]);
                        array_push($ids, $idz);

                        $idx = DB::table('versionamiento_status')
                        ->insertGetId([
                            'Id_Status' => $idz,
                            'Id_Actividad' => $Id,
                            'IdUsuario' => $Usuario->IdUsuario,
                            'FechaHora' => date('Y-m-d H:i:s')
                        ]);
                        array_push($ids, $idx);
                    
                    if( $InfoTarea[0]->IdUsuario !=  $Usuario->IdUsuario ){
                        
                        $Info['Asunto'] = $InfoTarea[0]->NombreTarea." - Status Nuevo";
                        $Info['Descripcion'] = nl2br($CData[$i]['Status']);
                        $Info['RegistradoPor'] = $InfoTarea[0]->NombreUsuario;

                        //$InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                        $Info['RegistradoPorCorreo'] = [$InfoTarea[0]->Correo];
                        $Info['Correos'] = [$InfoTarea[0]->Correo] ;
                        $Info['UsuariosN'] = [$InfoTarea[0]->NombreUsuario];
                        if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                                $Mensaje = 1;
                            }else{
                                $Mensaje = 1;
                            }
                        $data = [
                            'success' => true,
                            'mensaje' => 'La tarea ha sido generada de manera correcta'
                        ];
                    }
                    
                }
                
                parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'GuardarDatosTA');

                DB::commit();
                DB::disableQueryLog();
            }
            
            

            $data = [
                'mensaje' => 'Data Guardada',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //e7c5b877bc4968b9ef234f1fdf6d2c75
    public function eliminarRegistroActividad(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idC = parent::CodeDescrypt(intval($credentials['Hash']));

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('actividades')
            ->where('Id_Actividad', $idC)
            ->delete();

            parent::queryLogAuditoria([$idC], $Usuario->IdUsuario, 'RemoverActividadTRA_ADMIN');

            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Actividad Borrada Correctamente.',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //17dc42c0c118288d7d2bd21617efa530
    public function SaveDataOrdenSubGrupos(Request $request)
    {
        try {

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $CData = \GuzzleHttp\json_decode($request->input('Cdata'));
            if( count($CData) > 0 ){
                DB::beginTransaction();
                DB::enableQueryLog();
                for($i = 0; $i < count($CData);$i++){
                    $CData[$i] = (array) $CData[$i];
                    $Id = parent::CodeDescrypt($CData[$i]['Hash']);
                    DB::table('subgrupo')
                    ->where('Id', $Id)
                    ->update([
                        'Orden' => $CData[$i]['Orden']
                    ]);
                    //array_push($ids, $Id);
                    
                }
                
                //parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'GuardarOrdenSubtrupos');

                DB::commit();
                DB::disableQueryLog();
            }
           

            $data = [
                'mensaje' => 'Orden de Subgrupos Guardado',
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }
    
    //1a4bf05385443ac88d525d98b0bd59a6
    public function traadmin_ListarOpciones(Request $request){
        $Tipos = DB::SELECT("SELECT "
                . "Id as Hash, "
                . "Nombre "
                . "FROM TA_Tipos "
                . "WHERE Estado = 1 "
                . " "
                . "ORDER by Nombre ");
        foreach($Tipos as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
        }
        
        $data = [
            'success' => true,
            'Tipo' => $Tipos
        ];
        return response()->json($data, 200);
    }
    
    public function traadmin_DataNotificaciones(){
        $Users = DB::SELECT("SELECT DISTINCT "
                    . "u.IdUsuario, u.NombreUsuario, u.Correo "
                    . "FROM canales_principales c "
                    . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                    . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                    . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                    . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad "
                    . "INNER JOIN Usuario u ON r.IdUsuario = u.IdUsuario AND u.Estado = 1 "
                    . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') <= '".date("Y-m-d",strtotime(date("Y-m-d")."+ 1 days"))."' "
                    . "");
        foreach($Users as $s){
            $Administrativo_Vencido = DB::SELECT("SELECT "
                    . "c.Nombre as Canal, g.Nombre as Grupo, sg.Nombre as SubGrupo, DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') as FechaEntrega, act.Tarea, act.NombreTarea "
                    . "FROM canales_principales c "
                    . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                    . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                    . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                    . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad AND r.IdUsuario = ".$s->IdUsuario." "
                    . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') <= '".date("Y-m-d",strtotime(date("Y-m-d")."+ 1 days"))."' "
                    . "ORDER BY act.FechaEntrega DESC");
            $i = 1;

            if( count($Administrativo_Vencido) > 0 ){
                foreach( $Administrativo_Vencido as $d ){
                    $d->Tarea = nl2br($d->Tarea);
                    $d->No = $i;
                    $Temp = explode("-",$d->FechaEntrega);
                    $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $i++;
                }
                $Temp = explode("-",date("Y-m-d"));
                $Info['Datos'] = $Administrativo_Vencido;
                $Info['Asunto'] = $s->NombreUsuario." - Pendientes Admininistrativos que debes gestionar hoy ".parent::NombreDia(date("Y-m-d")).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                $Info['RegistradoPorCorreo'] = ["info@processpluserp.com"];
                $Info['RegistradoPor'] = ["Process"];
                $Info['Correos'] = ["gerencia@processpluserp.com"] ;
                $Info['UsuariosN'] = [$s->NombreUsuario];
                if( (new MailController)->Mail_NotificacionPendientesAdministrativos($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                        echo "Mensaje Enviado a ".$s->NombreUsuario." al correo ".$s->Correo.", con ".count($Administrativo_Vencido)." Pendientes.<br> ";
                    }else{
                        $Mensaje = 0;
                    }
            }
        }
        
        
        
    }
}
