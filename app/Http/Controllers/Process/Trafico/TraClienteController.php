<?php

namespace App\Http\Controllers\Process\Trafico;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\MailController;

class TraClienteController extends Controller
{
    //08e205ac22a40354eabb20f5b2818fea
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.trafico.tra_cliente');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //06c193b023831dc894e4e14c418120b4
    public function indexDatosOT(Request $request)
    {
        $draw = $request['draw'];
        $EmpresaText = "";
        $EstadoText = "";
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        if( $request['search']['HashE'] != -1 ){
            $EmpresaText = " AND e.IdEmpresa = ".parent::CodeDescrypt($request['search']['HashE'])." ";
        }
        
        if( $request['search']['HashEst'] != -1 ){
            $EstadoText = " AND p.IdEstado = ".parent::CodeDescrypt($request['search']['HashEst'])." ";
        }
        
        $sqlFrom = "FROM `proyectos` AS P "
        ."JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa "
        ."LEFT JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad "
        ."JOIN cliente AS c ON p.IdCliente = c.IdCliente "
        ."JOIN productocliente AS pc ON p.IdProducto = pc.Id "
        ."LEFT JOIN subproducto_cliente AS spc ON p.IdSubproducto = spc.Id "
        ."JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario "
        ."JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario "
        ."LEFT JOIN profesionales_cliente AS fc ON p.IdProfesional = fc.IdProfesionalesCliente "
        . "INNER JOIN par_usuariocliente pus on pus.IdCliente = p.IdCliente AND pus.IdProducto = p.IdProducto AND p.IdUnidad = pus.IdUnidadNegocio AND pus.IdUsuario = ".$Usuario->IdUsuario." "
        ."JOIN par_estado_proyecto AS pep ON p.IdEstado = pep.Id "
        . "WHERE 1 = 1 ".$EmpresaText.$EstadoText;
            // .$sqlAdicional;

        $sqlCampos = " DISTINCT p.Id, p.Codigo, p.Referencia, e.NombreComercial AS Empresa, "
                . "CASE WHEN ISNULL(un.Nombre) THEN '' ELSE un.Nombre END AS Unidad, "
                . "c.NombreComercial AS Cliente, pc.Nombre AS Producto, spc.Nombre AS Subproducto, "
                . "ejc.NombreUsuario AS Ejecutivo, dir.NombreUsuario AS Director, CASE WHEN ISNULL(fc.Nombre) THEN '' ELSE fc.Nombre END  AS Profesional, "
                . "pep.Estado, DATE_FORMAT(p.Fecha,'%Y-%m-%d') as Fecha ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (c.NombreComercial like '%".$searchValue."%' "
                . "or e.NombreComercial like '%".$searchValue."%' "
                . "or p.Codigo like '%".$searchValue."%' "
                . "or p.Referencia like '%".$searchValue."%' "
                . "or ejc.NombreUsuario like '%".$searchValue."%' "
                . "or dir.NombreUsuario like '%".$searchValue."%' "
                . "or fc.Nombre like '%".$searchValue."%' "
                . "or pc.Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Codigo"=>$row->Codigo,
            "Referencia"=>$row->Referencia,
            "Empresa"=>$row->Empresa,
            "Unidad"=>$row->Unidad,
            "Cliente"=>$row->Cliente,
            "Producto"=>$row->Producto,
            "SubProducto"=>$row->Subproducto,
            "Ejecutivo"=>$row->Ejecutivo,
            "Fecha"=>$row->Fecha,
            "Director"=>$row->Director,
            "Profesional"=>$row->Profesional,
            // "PAR_USUARIO_ESTADO"=>$permiso_estado,
            // "PAR_USUARIO_EDITAR"=>$permiso_editar,
            // "PAR_USUARIO_EDITAR_PASSWORD"=>$permiso_editar_password,
            "Estado"=>$row->Estado
            );
        $i++;
        }

        $response = array(
            "draw" => intval($Records['draw']),
            "x"=>$sqlCampos.$sqlFrom.$searchQuery,
            "iTotalRecords" => $Records['totalRecords'],
            "iTotalDisplayRecords" => $Records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }

    //9fcadcb59200a17e0176fa5a0990f835
    public function traSegmentacionTareas()
    {
        try {

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $resp = DB::SELECT("SELECT et.Id,et.Tareas_Id "
                    . "FROM equipotarea et "
                    . "INNER JOIN Tareas t on et.Tareas_Id = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE et.Tipo = 'RESP' AND et.IdUsuario = ".$Usuario->IdUsuario." "
                    . "UNION ALL "
                    . "SELECT et.Id,et.Tareas_Id "
                    . "FROM equipotarea et "
                    . "INNER JOIN Subtareas t on et.IdSubtarea = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE et.Tipo = 'RESP' AND et.IdUsuario = ".$Usuario->IdUsuario.""
                    );
            
            
            $asig = DB::SELECT("SELECT et.Id,et.Tareas_Id "
                    . "FROM equipotarea et "
                    . "INNER JOIN Tareas t on et.Tareas_Id = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE et.Tipo = 'ASIG' AND et.IdUsuario = ".$Usuario->IdUsuario." "
                    . "UNION ALL "
                    . "SELECT et.Id,et.Tareas_Id "
                    . "FROM equipotarea et "
                    . "INNER JOIN Subtareas t on et.IdSubtarea = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE et.Tipo = 'ASIG' AND et.IdUsuario = ".$Usuario->IdUsuario.""
                    );
            
            $contestadas = DB::SELECT("SELECT 1 AS Muestra "
                    . "FROM subtareas s "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE s.IdUsuarioRespuesta = ".$Usuario->IdUsuario." "
                    . "UNION ALL "
                    . "SELECT 1 AS Muestra "
                    . "FROM tareas t  "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 
                    INNER JOIN Empresa e ON p.IdEmpresa = e.IdEmpresa AND e.Estado = 1 "
                    . "WHERE t.IdUsuarioRespuesta= ".$Usuario->IdUsuario." ");
            
            $gestionDia = DB::SELECT("SELECT 1 AS Muestra "
                    . "FROM tareas t "
                    . "WHERE t.IdUsuario = ".$Usuario->IdUsuario." AND DATE_FORMAT(t.FechaHoraCreacion,'%Y-%m-%d') = '".date("Y-m-d")."' "
                    . "UNION ALL "
                    . "SELECT 1 as Muestra "
                    . "FROM Subtareas s "
                    . "WHERE s.IdUsuario = ".$Usuario->IdUsuario." AND DATE_FORMAT(s.FechaHoraCreacion,'%Y-%m-%d') = '".date("Y-m-d")."'");
            
            $data = ['success'=>true, 'asignados'=>0, 'seguimiento'=>0,'contestado'=>0,'gestionDia'=>0];
            /*foreach($notificaciones as $not) {
                if ($not->Tipo == 'ASIG') {
                    $data['asignados'] = $not->muestra;
                }
                if ($not->Tipo == 'RESP') {
                    $data['asignados'] = $not->muestra;
                }
            }*/
            $Cont = 0;
            foreach($contestadas as $not) {
                $Cont++;
            }
            $data['seguimiento'] = count($resp);
            $data['asignados'] = count($asig);
            $data['contestado'] = $Cont;
            $data['gestionDia'] = count($gestionDia);

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

    //0e1b513d8892d021763a850783e14916
    public function traClientesFromProyectos()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $clientes = DB::SELECT("SELECT DISTINCT "
                    . "c.IdCliente as Hash, c.NombreComercial "
                    . "FROM Cliente c "
                    . "WHERE c.Estado = 1 AND c.IdCliente in (SELECT "
                    . " p.IdCliente "
                    . "FROM "
                    . "tareas t "
                    . "INNER JOIN equipotarea et on et.Tareas_Id = t.Id  "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "WHERE et.IdUsuario = ".$Usuario->IdUsuario." "
                    . "UNION ALL "
                    . "SELECT  p.IdCliente "
                    . "FROM subtareas s  "
                     . "INNER JOIN equipotarea et on et.IdSubtarea = s.Id  "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "WHERE et.IdUsuario = ".$Usuario->IdUsuario." "
                    . ")"
                    . "ORDER BY c.NombreComercial Asc"
                    );
            /*
            $clientes = DB::table('proyectos AS p')
            ->join('cliente AS c', 'p.IdCliente', '=', 'c.IdCliente')
            ->select('c.IdCliente AS Hash', 'c.NombreComercial')
            ->distinct()
            ->get();
            */
            foreach($clientes as $c) {
                $c->Hash = parent::CodeEncrypt($c->Hash);
            }

            $data = [
                'clientes' => $clientes,
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
    
    //a57a0c9b002d64a7f2fda48c266858f6
    public function traClientesFromProyectosDia()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $clientes = DB::SELECT(
                    "SELECT DISTINCT "
                    . "c.IdCliente as Hash, c.NombreComercial "
                    . "FROM Cliente c "
                    . "WHERE c.Estado = 1 AND c.IdCliente in (SELECT "
                    . " p.IdCliente "
                    . "FROM "
                    . "tareas t "
                    //. "INNER JOIN equipotarea et on et.Tareas_Id = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id  "
                    . "WHERE t.IdUsuario = ".$Usuario->IdUsuario." AND DATE_FORMAT(t.FechaHoraCreacion,'%Y-%m-%d') = '".date("Y-m-d")."' "
                    . "UNION ALL "
                    . "SELECT  p.IdCliente "
                    . "FROM subtareas s  "
                    // . "INNER JOIN equipotarea et on et.IdSubtarea = s.Id AND s.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id  "
                    . "WHERE s.IdUsuario = ".$Usuario->IdUsuario." AND DATE_FORMAT(s.FechaHoraCreacion,'%Y-%m-%d') = '".date("Y-m-d")."' "
                    . ")"
                    . "ORDER BY c.NombreComercial Asc"
                    );
            
            foreach($clientes as $c) {
                $c->Hash = parent::CodeEncrypt($c->Hash);
            }

            $data = [
                'clientes' => $clientes,
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

    public function traClientesFromProyectosResp()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $clientes = DB::SELECT("SELECT DISTINCT "
                    . "c.IdCliente as Hash, c.NombreComercial "
                    . "FROM Cliente c "
                    . "INNER JOIN proyectos p on p.IdCliente = c.IdCliente and p.IdEstado = 1 "
                    . "WHERE c.estado = 1 and p.Id in (SELECT "
                    . " t.IdProyecto "
                    . "FROM "
                    . "equipotarea et "
                   
                    . "INNER JOIN tareas t on et.Tareas_Id = t.Id AND t.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "WHERE et.IdUsuario = ".$Usuario->IdUsuario." "
                    . "AND (t.IdEstado = 1) and et.Tipo = 'RESP' "
                    . "UNION ALL "
                    . "SELECT  s.IdProyecto "
                    . "FROM equipotarea et "
                    . "INNER JOIN subtareas s on et.IdSubtarea = s.Id AND s.IdEstado = 1 "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado IN (1,4) "
                    . "WHERE et.IdUsuario = ".$Usuario->IdUsuario." "
                    . "AND (s.IdEstado = 1)  and et.Tipo = 'RESP')"
                    );
            /*
            $clientes = DB::table('proyectos AS p')
            ->join('cliente AS c', 'p.IdCliente', '=', 'c.IdCliente')
            ->select('c.IdCliente AS Hash', 'c.NombreComercial')
            ->distinct()
            ->get();
            */
            foreach($clientes as $c) {
                $c->Hash = parent::CodeEncrypt($c->Hash);
            }

            $data = [
                'clientes' => $clientes,
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
    
    //54351b7558b6f67f068ccd2205ac32f0
    public function traSegmentacionPendientes(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.parCliente' => 'required|string',
                'search.value' => 'nullable|string'
            ]);
            
            $sqlAdicional = '';
            if( !empty($credentials['search']['value']) ){
                $sqlAdicional = 'AND ('
                        . 'a.FechaEntrega like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'pdt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'ptt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'p.Codigo like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.Asunto like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.FechaHoraCreacion like "%'.$credentials['search']['value'].'%" '
                        . ')';
            }
            
            $idCliente = parent::CodeDescrypt(intval($credentials['search']['parCliente']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $sql = 'SELECT DISTINCT
            a.Id AS Hash, a.IdTarea AS HashTarea, a.IdSubTarea AS HashSubTarea, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion,
            TIME(a.FechaHoraCreacion) AS HoraCreacion,
            DATE(a.FechaEntrega) AS FechaEntrega,
            TIME(a.FechaEntrega) AS HoraEntrega,
            DATE(a.FechaHoraRespuesta) AS FechaRespuesta,
            TIME(a.FechaHoraRespuesta) AS HoraRespuesta,
            pdt.Nombre AS Departamento, c.NombreUsuario AS Creador,
            ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo As CodigoProyecto,
            a.Numeracion,
            a.IdTareaPadre,
            ets.FechaVisualizacion as FechaVSubTarea, et.FechaVisualizacion as FechaVTarea,
            (CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos
            FROM (
                SELECT t.Id, t.Id AS IdTarea, NULL AS IdSubTarea, t.Asunto, t.Descripcion, t.FechaEntrega, 
                t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, t.IdDepartamento, 
                t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, 
                CONVERT(t.Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre 
                FROM tareas t 
                INNER JOIN PROYECTOS p on t.IdProyecto = p.Id AND p.IdEstado  IN (1,4)  and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
                    UNION ALL
                SELECT s.Id, Null AS IdTarea, s.Id AS IdSubTarea, s.Asunto, s.Descripcion, s.FechaEntrega, 
                s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, 
                s.IdUsuario, s.IdDepartamento, s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, 
                CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre 
                FROM subtareas s
                INNER JOIN PROYECTOS p on s.IdProyecto = p.Id AND p.IdEstado  IN (1,4)  and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
            ) AS a
            JOIN proyectos AS p ON a.IdProyecto = p.Id
            JOIN scrum_estados AS se ON a.IdEstado = se.Id
            JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id
            JOIN usuario AS c ON a.IdUsuario = c.IdUsuario
            JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id
            LEFT JOIN equipotarea AS et ON et.Tareas_Id = a.IdTarea
            LEFT JOIN equipotarea AS ets ON ets.IdSubtarea = a.IdSubTarea
            WHERE (et.Tipo = "ASIG" OR ets.Tipo = "ASIG") AND p.IdCliente = ? AND se.Id = 1 AND (et.IdUsuario = ? OR ets.IdUsuario = ?) '.$sqlAdicional.'
            ORDER BY DATE(a.FechaEntrega) desc ';

            $tareas = DB::select($sql, [$idCliente, $Usuario->IdUsuario, $Usuario->IdUsuario]);

            foreach($tareas as $t) {
                $t->Hash = parent::CodeEncrypt($t->Hash);
                $t->HashTarea = parent::CodeEncrypt($t->HashTarea);
                $t->HashSubTarea = parent::CodeEncrypt($t->HashSubTarea);
                $t->Proyecto = parent::CodeEncrypt($t->Proyecto);
            }

            $response = array(
                "draw" => intval($request['draw']),
                "iTotalRecords" => count($tareas),
                "iTotalDisplayRecords" => count($tareas),
                "aaData" => $tareas
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
    
    
    //cb82e5cf764b95117ae459bd5eee515a
    public function traSegmentacionGestionDia(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.parCliente' => 'required|string',
                'search.value' => 'nullable|string'
            ]);
            
            $sqlAdicional = '';
            if( !empty($credentials['search']['value']) ){
                $sqlAdicional = 'AND ('
                        . 'a.FechaEntrega like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'pdt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'ptt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'p.Codigo like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.Asunto like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.FechaHoraCreacion like "%'.$credentials['search']['value'].'%" '
                        . ')';
            }
            
            $idCliente = parent::CodeDescrypt(intval($credentials['search']['parCliente']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $sql = 'SELECT DISTINCT
            a.Id AS Hash, a.IdTarea AS HashTarea, a.IdSubTarea AS HashSubTarea, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion,
            TIME(a.FechaHoraCreacion) AS HoraCreacion,
            DATE(a.FechaEntrega) AS FechaEntrega,
            TIME(a.FechaEntrega) AS HoraEntrega,
            DATE(a.FechaHoraRespuesta) AS FechaRespuesta,
            TIME(a.FechaHoraRespuesta) AS HoraRespuesta,
            pdt.Nombre AS Departamento, c.NombreUsuario AS Creador,
            ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo As CodigoProyecto,
            a.Numeracion,
            a.IdTareaPadre,
            (CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos
            FROM (
                SELECT t.Id, t.Id AS IdTarea, NULL AS IdSubTarea, t.Asunto, t.Descripcion, t.FechaEntrega, 
                t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, t.IdDepartamento, 
                t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, 
                CONVERT(t.Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre 
                FROM tareas t 
                INNER JOIN PROYECTOS p on t.IdProyecto = p.Id AND p.IdEstado  IN (1,4) and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
                    UNION ALL
                SELECT s.Id, Null AS IdTarea, s.Id AS IdSubTarea, s.Asunto, s.Descripcion, s.FechaEntrega, 
                s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, 
                s.IdUsuario, s.IdDepartamento, s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, 
                CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre 
                FROM subtareas s
                INNER JOIN PROYECTOS p on s.IdProyecto = p.Id AND p.IdEstado  IN (1,4)  and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
            ) AS a
            JOIN proyectos AS p ON a.IdProyecto = p.Id
            JOIN scrum_estados AS se ON a.IdEstado = se.Id
            JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id
            JOIN usuario AS c ON a.IdUsuario = c.IdUsuario
            JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id
            LEFT JOIN equipotarea AS et ON et.Tareas_Id = a.IdTarea
            LEFT JOIN equipotarea AS ets ON ets.IdSubtarea = a.IdSubTarea
            WHERE p.IdCliente = ? AND (a.IdUsuario = ?) AND DATE_FORMAT(a.FechaHoraCreacion,"%Y-%m-%d") = "'.date("Y-m-d").'" '.$sqlAdicional.'
             ';

            $tareas = DB::select($sql, [$idCliente, $Usuario->IdUsuario]);

            foreach($tareas as $t) {
                $t->Hash = parent::CodeEncrypt($t->Hash);
                $t->HashTarea = parent::CodeEncrypt($t->HashTarea);
                $t->HashSubTarea = parent::CodeEncrypt($t->HashSubTarea);
                $t->Proyecto = parent::CodeEncrypt($t->Proyecto);
            }

            $response = array(
                "draw" => intval($request['draw']),
                "iTotalRecords" => count($tareas),
                "iTotalDisplayRecords" => count($tareas),
                "aaData" => $tareas
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

    //04366d8fc25921d42719dc943800832b
    public function traSegmentacionSeguimiento(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.parCliente' => 'required|string',
                'search.value' => 'nullable|string'
            ]);
            
            $sqlAdicional = '';
            if( !empty($credentials['search']['value']) ){
                $sqlAdicional = 'AND ('
                        . 'a.FechaEntrega like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'pdt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'ptt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'p.Codigo like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.Asunto like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.FechaHoraCreacion like "%'.$credentials['search']['value'].'%" '
                        . ')';
            }

            $idCliente = parent::CodeDescrypt(intval($credentials['search']['parCliente']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $sql = 'SELECT DISTINCT
            a.Id AS Hash, a.IdTarea AS HashTarea, a.IdSubTarea AS HashSubTarea, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion,
            TIME(a.FechaHoraCreacion) AS HoraCreacion,
            DATE(a.FechaEntrega) AS FechaEntrega,
            TIME(a.FechaEntrega) AS HoraEntrega,
            DATE(a.FechaHoraRespuesta) AS FechaRespuesta,
            TIME(a.FechaHoraRespuesta) AS HoraRespuesta,
            pdt.Nombre AS Departamento, c.NombreUsuario AS Creador,
            ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo As CodigoProyecto,
            a.Numeracion,
            a.IdTareaPadre,
            (CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos
            FROM (
                SELECT t.Id, t.Id AS IdTarea, NULL AS IdSubTarea, t.Asunto, t.Descripcion, t.FechaEntrega, 
                t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, t.IdDepartamento, 
                t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, 
                CONVERT(t.Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre 
                FROM tareas t 
                INNER JOIN PROYECTOS p on t.IdProyecto = p.Id AND p.IdEstado IN (1,4) and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
                    UNION ALL
                SELECT s.Id, Null AS IdTarea, s.Id AS IdSubTarea, s.Asunto, s.Descripcion, s.FechaEntrega, 
                s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, 
                s.IdUsuario, s.IdDepartamento, s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, 
                CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre 
                FROM subtareas s
                INNER JOIN PROYECTOS p on s.IdProyecto = p.Id AND p.IdEstado  IN (1,4) and p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente and c.Estado = 1
            ) AS a
            JOIN proyectos AS p ON a.IdProyecto = p.Id
            JOIN scrum_estados AS se ON a.IdEstado = se.Id
            JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id
            JOIN usuario AS c ON a.IdUsuario = c.IdUsuario
            JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id
            LEFT JOIN equipotarea AS et ON et.Tareas_Id = a.IdTarea
            LEFT JOIN equipotarea AS ets ON ets.IdSubtarea = a.IdSubTarea
            WHERE (et.Tipo = "RESP" OR ets.Tipo = "RESP") AND p.IdCliente = ? AND se.Id = 1 AND (et.IdUsuario = ? OR ets.IdUsuario = ?)  '.$sqlAdicional.' 
            ORDER BY DATE(a.FechaEntrega) desc ';

            $tareas = DB::select($sql, [$idCliente, $Usuario->IdUsuario, $Usuario->IdUsuario]);
            
            foreach($tareas as $t) {
                $t->Hash = parent::CodeEncrypt($t->Hash);
                $t->HashTarea = parent::CodeEncrypt($t->HashTarea);
                $t->HashSubTarea = parent::CodeEncrypt($t->HashSubTarea);
                $t->Proyecto = parent::CodeEncrypt($t->Proyecto);
            }

            $response = array(
                "draw" => intval($request['draw']),
                "iTotalRecords" => count($tareas),
                "iTotalDisplayRecords" => count($tareas),
                "sql" => $tareas,
                "aaData" => $tareas
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
    
    public function traListarInformeReunionProyecto(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "informe_reunion e "
                . "INNER JOIN usuario u on e.IdUsuario = u.idusuario "
                . "INNER JOIN proyectos p on e.IdProyecto = p.Id "
                . "INNER JOIN "
                . "where p.Id = $id ";

        $sqlCampos = " e. "
                . "date_format(e.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "c.nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(e.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL')");
        $INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ESTADO')");

        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "IdEmpleado"=>($row->IdEmpleado),
                "nombrearchivo"=>($row->nombrearchivo),
                "TipoDocumento"=>$row->TipoDocumento,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL,
                "INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL
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

    //45a6a3d2e81997dab555dd16793d7480
    public function ListarPermisosOTS(Request $request){
        $TRA_CLIENTES_TAREAOT_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('TRA_CLIENTES_TAREAOT_CREAR')");
        $TRA_CLIENTES_OT_INFENT_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('TRA_CLIENTES_OT_INFENT_CREAR')");
        
        $data = [
                'TRA_CLIENTES_TAREAOT_CREAR' => $TRA_CLIENTES_TAREAOT_CREAR,
                'TRA_CLIENTES_OT_INFENT_CREAR' => $TRA_CLIENTES_OT_INFENT_CREAR,
                'TRA_CLIENTES_OTROS_DOCUMENTOS_CREAR' => (new Controller)->ValidarPermisoUsuario("TRA_CLIENTES_OTROS_DOCUMENTOS_CREAR",session('keyUser'),0),
                'TRA_CLIENTES_OTROS_DOCUMENTOS_ELIMINAR' => (new Controller)->ValidarPermisoUsuario("TRA_CLIENTES_OTROS_DOCUMENTOS_ELIMINAR",session('keyUser'),0),
                'success' => true
            ];
            return response()->json($data, 200);
    }
    
    //ab9bcd4753799e763414e55d167995af2
    function ElimiarDocumentoProyecto(Request $request){
        $sql = DB::DELETE("DELETE FROM documentos_proyectos WHERE id = ".(new Controller)->CodeDescrypt( $request->input('Hash')));
        return response()->json([
            'info'=>1
        ]);
    }
    
    //ab9bcd4753799e763414e55d167995af
    public function TraDocumentosProyecto(Request $request){
        
        $draw = $request['draw'];

        
        $sqlFrom = "FROM "
                . "documentos_proyectos d "
                . "INNER JOIN Proyectos p ON d.IdProyecto = p.Id "
                . "INNER JOIN usuario u on d.IdUsuario = u.idusuario "
                . "WHERE p.Id = ".(new Controller)->CodeDescrypt( $request->input('Hash'))." ";

        $sqlCampos = " d.Id as Hash, d.Nombre, d.Archivo,u.NombreUsuario, d.IdProyecto, "
                . "date_format(d.fecha,'%Y-%m-%d') as fechahora ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "d.Nombre like '%".$searchValue."%' or "
                   . "d.Archivo like '%".$searchValue."%' or "
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "date_format(d.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        $EliminarDocs = (new Controller)->ValidarPermisoUsuario("TRA_CLIENTES_OTROS_DOCUMENTOS_ELIMINAR",session('keyUser'),0);
        foreach($empRecords['empRecords'] as $row){
            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "Nombre"=>$row->Nombre,
                "IdProyecto"=>$row->IdProyecto,
                "Archivo"=>$row->Archivo,
                "NombreUsuario"=>$row->NombreUsuario,
                "EliminarDocs"=>$EliminarDocs,
                "fechahora"=>($row->fechahora)
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
    
    //a4111dd1f9753b2ed9cde93556621765
    function SaveDocumentoProyecto(Request $request){
        $Archivo = "";
        $Hash = (new Controller)->CodeDescrypt( $request->input('Hash') );
        $Carpeta = $Hash;
        if(!Storage::exists('Trafico/Proyectos/'.$Carpeta)){
            Storage::makeDirectory('Trafico/Proyectos/'.$Carpeta, 0775, true);
        }
        
        for($i = 0; $i < ($request->input('archivos')); $i++){
            $Archivo = $request->file('foto'.$i)->getClientOriginalName();
            $request->file('foto'.$i)->storeAs('Trafico/Proyectos/'.$Carpeta.'/',$Archivo);
            DB::beginTransaction();
            try {
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                DB::table('documentos_proyectos')
                ->insert([
                        'IdProyecto' => $Hash,
                        'Nombre' => $request->input('Nombre'),
                        'Archivo' => $Archivo,
                        'fecha' => date("Y-m-d"),
                        'IdUsuario' => $Usuario->IdUsuario,
                ]);

                DB::commit();

            } catch (\PDOException $exception) {
                error_log("Documento proyecto: " . $exception->getMessage());
                throw new \PDOException("Documento proyecto: " . $exception->getMessage());
                DB::rollBack();
            }
        }
        return response()->json([
            'info'=>1
        ]);
		
    }

    public function __AddNuevaTreaOt(Request $request){
        $Archivo = "";
        $Hash = (new Controller)->CodeDescrypt( $request->input('Hash') );
        $Carpeta = $Hash;
        if(!Storage::exists('Trafico/Proyectos/'.$Carpeta)){
            Storage::makeDirectory('Trafico/Proyectos/'.$Carpeta, 0775, true);
        }
        
        for($i = 0; $i < ($request->input('archivos')); $i++){
            $Archivo = $request->file('foto'.$i)->getClientOriginalName();
            $request->file('foto'.$i)->storeAs('Trafico/Proyectos/'.$Carpeta.'/',$Archivo);
            DB::beginTransaction();
            try {
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                DB::table('documentos_proyectos')
                ->insert([
                        'IdProyecto' => $Hash,
                        'Nombre' => $request->input('Nombre'),
                        'Archivo' => $Archivo,
                        'fecha' => date("Y-m-d"),
                        'IdUsuario' => $Usuario->IdUsuario,
                ]);

                DB::commit();

            } catch (\PDOException $exception) {
                error_log("Documento proyecto: " . $exception->getMessage());
                throw new \PDOException("Documento proyecto: " . $exception->getMessage());
                DB::rollBack();
            }
        }
        return response()->json([
            'info'=>1
        ]);
    }
    
    //c7b83d2a2a133b066d15131f0f1956ba
    public function ListarDatosInformeEntrevista(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|int'
        ]);
        $TipoReunion = DB::SELECT("SELECT Id,Nombre "
            . "FROM TipoReunion "
            . "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        foreach($TipoReunion as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        
        $TipoInforme = DB::SELECT("SELECT Id,Nombre "
            . "FROM TipoInforme "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        foreach($TipoInforme as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        
        //Camino Copiados Por Defecto
        $Camino = DB::SELECT("SELECT Tipo "
                . "FROM par_copia_informe_reunion "
                . "WHERE Estado = 1");
        $DatosProyecto = DB::SELECT("SELECT "
                . "IdEmpresa, IdUnidad, IdCliente "
                . "FROM proyectos "
                . "WHERE Id = ".parent::CodeDescrypt($credentials['Hash']));
        
        $Copiados = "";
        if( $Camino[0]->Tipo == 'EMP' ){
            $Copiados = DB::SELECT("SELECT u.IdUsuario as Id,u.NombreUsuario "
                    . "FROM Usuario u "
                    . "INNER JOIN par_copiados_unidad_negocio pc on pc.IdUsuario = u.IdUsuario "
                    . "WHERE pc.IdEmpresa = ".$DatosProyecto[0]->IdEmpresa." Order By u.NombreUsuario ");
            
        }else if( $Camino[0]->Tipo == 'UND' ){
            $Copiados = DB::SELECT("SELECT u.IdUsuario as Id,u.NombreUsuario "
                    . "FROM Usuario u "
                    . "INNER JOIN par_copiados_unidad_negocio pc on pc.IdUsuario = u.IdUsuario "
                    . "WHERE pc.IdUnidad = ".$DatosProyecto[0]->IdUnidad." Order By u.NombreUsuario ");
            
        }else if( $Camino[0]->Tipo == 'CLI' ){
            $Copiados = DB::SELECT("SELECT u.IdUsuario as Id,u.NombreUsuario "
                    . "FROM Usuario u "
                    . "INNER JOIN par_copiados_unidad_negocio pc on pc.IdUsuario = u.IdUsuario "
                    . "WHERE pc.IdCliente = ".$DatosProyecto[0]->IdCliente." Order By u.NombreUsuario ");
            
        }else if( $Camino[0]->Tipo == 'UND_CLI' ){
            $Copiados = DB::SELECT("SELECT u.IdUsuario as Id,u.NombreUsuario "
                    . "FROM Usuario u "
                    . "INNER JOIN par_copiados_unidad_negocio pc on pc.IdUsuario = u.IdUsuario "
                    . "WHERE pc.IdCliente = ".$DatosProyecto[0]->IdCliente." AND pc.IdUnidad = ".$DatosProyecto[0]->IdUnidad." Order By u.NombreUsuario ");
            
        }
        foreach($Copiados as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        
        $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario')->where('Token', session('keyUser'))->first();
        
        
        return response()->json([
            "TipoReunion"=>$TipoReunion,
            "TipoInforme"=>$TipoInforme,
            "Copiados"=>$Copiados,
            "HashU" => (new Controller)->CodeEncrypt($Usuario->IdUsuario),
            "HashN" => $Usuario->NombreUsuario,
        ]);
    }
    
    //e4b972ac758b27ee606c929f0066213a
    public function traSegmentacionContestadas(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.parCliente' => 'required|string',
                'search.value' => 'nullable|string'
            ]);
            
            $sqlAdicional = '';
            if( !empty($credentials['search']['value']) ){
                $sqlAdicional = 'AND ('
                        . 'a.FechaEntrega like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'pdt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'ptt.Nombre like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'p.Codigo like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.Asunto like "%'.$credentials['search']['value'].'%" '
                        . 'OR '
                        . 'a.FechaHoraCreacion like "%'.$credentials['search']['value'].'%" '
                        . ')';
            }

            $idCliente = parent::CodeDescrypt(intval($credentials['search']['parCliente']));
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $sql = 'SELECT DISTINCT
            a.Id AS Hash, a.IdTarea AS HashTarea, a.IdSubTarea AS HashSubTarea, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion,
            TIME(a.FechaHoraCreacion) AS HoraCreacion,
            DATE(a.FechaEntrega) AS FechaEntrega,
            TIME(a.FechaEntrega) AS HoraEntrega,
            DATE(a.FechaHoraRespuesta) AS FechaRespuesta,
            TIME(a.FechaHoraRespuesta) AS HoraRespuesta,
            pdt.Nombre AS Departamento, c.NombreUsuario AS Creador,
            ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo As CodigoProyecto,
            a.Numeracion,
            a.IdTareaPadre,
            (CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos
            FROM (
                SELECT t.Id, t.Id AS IdTarea, NULL AS IdSubTarea, t.Asunto, t.Descripcion, t.FechaEntrega, 
                t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, t.IdDepartamento, 
                t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, 
                CONVERT(t.Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre 
                FROM tareas t 
                INNER JOIN PROYECTOS p on t.IdProyecto = p.Id AND p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente 
                WHERE t.IdEstado in (5,7) 
                    UNION ALL
                SELECT s.Id, Null AS IdTarea, s.Id AS IdSubTarea, s.Asunto, s.Descripcion, s.FechaEntrega, 
                s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, 
                s.IdUsuario, s.IdDepartamento, s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, 
                CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre 
                FROM subtareas s
                INNER JOIN PROYECTOS p on s.IdProyecto = p.Id AND   p.IdCliente = '.$idCliente.' 
                INNER JOIN Cliente c on p.IdCliente = c.IdCliente 
                WHERE s.IdEstado in (5,7) 
            ) AS a
            JOIN proyectos AS p ON a.IdProyecto = p.Id
            JOIN scrum_estados AS se ON a.IdEstado = se.Id
            JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id
            JOIN usuario AS c ON a.IdUsuario = c.IdUsuario
            JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id
            LEFT JOIN equipotarea AS et ON et.Tareas_Id = a.IdTarea
            LEFT JOIN equipotarea AS ets ON ets.IdSubtarea = a.IdSubTarea
            WHERE p.IdCliente = ? AND (a.IdUsuarioRespuesta = ?) '.$sqlAdicional.'
            ORDER BY DATE(a.FechaHoraCreacion) desc ';

            $tareas = DB::select($sql, [$idCliente, $Usuario->IdUsuario]);

            foreach($tareas as $t) {
                $t->Hash = parent::CodeEncrypt($t->Hash);
                $t->HashTarea = parent::CodeEncrypt($t->HashTarea);
                $t->HashSubTarea = parent::CodeEncrypt($t->HashSubTarea);
                $t->Proyecto = parent::CodeEncrypt($t->Proyecto);
            }

            $response = array(
                "draw" => intval($request['draw']),
                "iTotalRecords" => count($tareas),
                "iTotalDisplayRecords" => count($tareas),
                "aaData" => $tareas
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

    //dc47e12ac4a1068c236507bd36359ebb
    public function TraDatosEmpresas()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $empresas = DB::table('empresa as e')
            ->select(DB::raw('concat(e.NombreLegal, " - ", e.Nit) as Nombre'), 'e.IdEmpresa', 'e.Nit', 'e.NombreLegal', 'e.NombreComercial')
            ->join('par_usuarioempresa as pue', 'e.IdEmpresa', '=', 'pue.IdEmpresa')
            ->join('usuario as u', 'pue.IdUsuario', '=', 'u.IdUsuario')
            ->where(['e.Estado'=>1, 'u.IdUsuario'=>$Usuario->IdUsuario])
            ->orderBy('e.NombreComercial','asc')
            ->distinct()
            ->get();
            foreach ($empresas as $empresa) {
                //$empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
                $empresa->Hash = parent::CodeEncrypt($empresa->IdEmpresa);
            }

            $data = [
                'empresas' => $empresas,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //bde5b488693c2d2c22757174de731d4f
    public function TraDatosUnidadNegocio(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'required|string',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idEmpresa = parent::CodeDescrypt($credentials['HashEmpresa']);

            $unidadesUsuario = DB::table('unidad_negocio AS un')
            ->join('par_usuariounidad AS pun', 'un.IdUnidad', '=', 'pun.IdUnidad')
            ->where(['un.IdEmpresa'=>$idEmpresa, 'pun.IdUsuario'=>$Usuario->IdUsuario, 'un.Estado'=>1])
            ->select('un.IdUnidad','un.Nombre')
            ->orderBy('un.Nombre','asc')
            ->distinct()
            ->get();


            foreach ($unidadesUsuario as $unidad) {
                $unidad->IdUnidad = parent::CodeEncrypt($unidad->IdUnidad);
                $unidad->Hash = $unidad->IdUnidad;
            }

            $data = [
                'unidades' => $unidadesUsuario,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //5ad0b953c7738fc7c077747ee8da3cb5
    public function TraDatosClientes(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'required|string',
            ]);

            $idEmpresa = parent::CodeDescrypt($credentials['HashEmpresa']);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $clientes = DB::table('cliente AS c')
                ->join('asoc_empresa_cliente AS aec', 'c.IdCliente', '=', 'aec.IdCliente')
                ->join('par_usuariocliente AS par', 'c.IdCliente', '=', 'par.IdCliente')
                ->where('aec.IdEmpresa', $idEmpresa)
                ->where('c.Estado', 1)
                ->where('par.IdUsuario', $Usuario->IdUsuario)
                ->select('c.IdCliente', 'c.NombreComercial', 'c.Nit')
                    ->orderBy('c.NombreComercial','asc')
                    ->distinct()
                ->get();

            foreach ($clientes as $cliente) {
                $cliente->IdCliente = parent::CodeEncrypt($cliente->IdCliente);
                $cliente->Hash = $cliente->IdCliente;
            }

            $data = [
                'clientes' => $clientes,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //8a03824e9ff6949d861b44a40aed14e9
    public function TraDatosProductos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashCliente' => 'required|string',
            ]);

            $idCliente = parent::CodeDescrypt($credentials['HashCliente']);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $productos = DB::table('productocliente AS pc')
            ->join('par_usuariocliente AS puc', 'pc.IdCliente', '=', 'puc.IdCliente')
            ->where(['puc.IdUsuario'=>$Usuario->IdUsuario, 'puc.IdCliente'=>$idCliente,'pc.Estado'=>1])
            ->select('pc.Id', 'pc.Nombre')
            ->distinct()->get();

            foreach ($productos as $producto) {
                $producto->Id = parent::CodeEncrypt($producto->Id);
                $producto->Hash = $producto->Id;
            }

            $data = [
                'productos' => $productos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //49d382bc75c15245ebb9c4a2d4cd896e
    public function TraDatosSubProductos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashProducto' => 'required|string',
            ]);

            $idProducto = parent::CodeDescrypt($credentials['HashProducto']);

            $subproductos = DB::table('subproducto_cliente AS spc')
            ->where('IdProducto', $idProducto)
            ->get();

            foreach ($subproductos as $subproducto) {
                $subproducto->Id = parent::CodeEncrypt($subproducto->Id);
                $subproducto->Hash = $subproducto->Id;
            }

            $data = [
                'subproductos' => $subproductos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //9b909eb70578db07c1f5aee7553a59d6
    public function TraDatosProfesionales(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashCliente' => 'required|string',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idCliente = parent::CodeDescrypt($credentials['HashCliente']);

            $profesionales = DB::table('profesionales_cliente AS pc')
            ->join('par_usuario_profcliente AS pup', 'pc.IdProfesionalesCliente', '=', 'pup.IdProfCliente')
            ->where(['pup.IdCliente'=>$idCliente, 'pup.IdUsuario'=>$Usuario->IdUsuario])
            ->select('pc.IdProfesionalesCliente AS Id', 'pc.Nombre')
            ->get();

            foreach ($profesionales as $profesional) {
                $profesional->Id = parent::CodeEncrypt($profesional->Id);
                $profesional->Hash = $profesional->Id;
            }

            $data = [
                'profesionales' => $profesionales,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //2032e89f5721d0663d5649d85504934a
    public function TraDatosDirector()
    {
        try {

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $directores = DB::table('usuario AS u')
            ->join('par_usuariodirector AS pud', 'u.IdUsuario', '=', 'pud.IdUsuarioDirector')
            ->where('pud.IdUsuario',$Usuario->IdUsuario)
            ->select('u.IdUsuario', 'u.NombreUsuario AS Usuario', 'u.Token')
            ->distinct()
            ->get();

            foreach ($directores as $director) {
                $director->IdUsuario = parent::CodeEncrypt($director->IdUsuario);
                $director->Hash = $director->IdUsuario;
            }

            $data = [
                'directores' => $directores,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //a752ef4487f59afe53e6cd67be658a5d
    public function TraDatosEjecutivo()
    {
        try {

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $ejecutivos = DB::table('usuario AS u')
            ->where('u.IdUsuario',$Usuario->IdUsuario)
            ->select('u.IdUsuario', 'u.NombreUsuario AS Usuario', 'u.Token')
            ->get();

            foreach ($ejecutivos as $ejecutivo) {
                $ejecutivo->IdUsuario = parent::CodeEncrypt($ejecutivo->IdUsuario);
                $ejecutivo->Hash = $ejecutivo->IdUsuario;
            }

            $data = [
                'ejecutivos' => $ejecutivos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //f2fea7c587a30651fa3e1f5df8a6ac10
    public function traCrearOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parEmpresa' => 'required|string',
                'parUnidadNegocio' => 'required|string',
                'parCliente' => 'required|string',
                'parProducto' => 'required|string',
                'parSubProducto' => 'nullable|string',
                'parProfesional' => 'required|string',
                'parDirector' => 'required|string',
                'parEjecutivo' => 'required|string',
                'parReferencia' => 'required|string',
                'parDescripcion' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idEmpresa = parent::CodeDescrypt(intval($credentials['parEmpresa']));
            $idUnidad = parent::CodeDescrypt(intval($credentials['parUnidadNegocio']));
            $idCliente = parent::CodeDescrypt(intval($credentials['parCliente']));
            $idProducto = parent::CodeDescrypt(intval($credentials['parProducto']));
            $idSubProducto = parent::CodeDescrypt(intval($credentials['parSubProducto']));
            $idProfesional = parent::CodeDescrypt(intval($credentials['parProfesional']));
            $idDirector = parent::CodeDescrypt(intval($credentials['parDirector']));
            $idEjecutivo = parent::CodeDescrypt(intval($credentials['parEjecutivo']));
            $referencia = $credentials['parReferencia'];
            $descripcion = $credentials['parDescripcion'];

            $asocEmpresaCliente = DB::table('asoc_empresa_cliente')
            ->where(['IdEmpresa'=>$idEmpresa, 'IdCliente'=>$idCliente])
            ->first();
            $consecutivoOT = DB::table('proyectos')
            ->select(DB::raw('count(*) AS contadorOTS'))
            ->where(['IdEmpresa'=>$idEmpresa, 'IdCliente'=>$idCliente])
            ->first();
            $year = date('Y');

            $contador = str_repeat('0',4-strlen(strval($consecutivoOT->contadorOTS))).strval($consecutivoOT->contadorOTS+1);
            $codigo = $asocEmpresaCliente->Indice.$contador.'-'.$year;

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('proyectos')
            ->insertGetId([
                'IdEmpresa'=>$idEmpresa,
                'IdUnidad'=>$idUnidad,
                'IdCliente'=>$idCliente,
                'IdProducto'=>$idProducto,
                'IdSubProducto' => $idSubProducto,
                'IdProfesional' => $idProfesional,
                'IdEjecutivo' => $idEjecutivo,
                'IdDirector' => $idDirector,
                'Referencia' => $referencia,
                'Codigo' => $codigo,
                'Descripcion' => $descripcion,
                'Fecha' => date('Y-m-d H:i:s'),
                'IdEstado' => 1
            ]);

            parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'TRA_CLIENTES_OT_CREAR');

            DB::commit();
            DB::disableQueryLog();
            $data = [
                'mensaje' => 'El Proyecto/OT: '.$codigo.' Ha sido generado exitosamente',
                'OT'=> $codigo,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::validateException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::validateException($th);
            return response()->json($data, 200);
        }
    }

    //c6fb996ec00b8e78fd3c7324300c96fe
    public function FinalizarTareaProyecto(Request $request){
        $proyecto = "";
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $credentials = $this->validate($request, [
            'IdTarea' => 'required|string',
            'Tipo' => 'required|string',
        ]);

        if( $credentials['Tipo'] == 'PADRE'){
            $idProyecto = parent::CodeDescrypt($credentials['IdTarea']);
            DB::UPDATE("UPDATE Tareas SET IdEstado = 5 WHERE Id = $idProyecto");
            $proyecto = "UPDATE Tareas SET IdEstado = 5 WHERE Id = $idProyecto";
        }else if( $credentials['Tipo'] == 'HIJO' ){
            $idProyecto = parent::CodeDescrypt($credentials['IdTarea']);
            DB::UPDATE("UPDATE SubTareas SET IdEstado = 5 WHERE Id = $idProyecto");
            $proyecto = "UPDATE SubTareas SET IdEstado = 5 WHERE Id = $idProyecto";
        }


        parent::queryLogAuditoria([$idProyecto], $Usuario->IdUsuario, 'TRA_CLIENTES_OT_TAREA_FINALIZAR');

        $data = [
            'proyecto' => $proyecto,
            'Estado' => 1
        ];
        return response()->json($data, 200);
    }
    
    //92b730dbd58aa180c6847a57af103225
    public function traDatosProyectoOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idProyecto = parent::CodeDescrypt($credentials['Hash']);

            $proyecto = DB::table('proyectos AS P')
            ->join('empresa AS e','p.IdEmpresa','=','e.IdEmpresa')
            ->join('unidad_negocio AS un','p.IdUnidad','=','un.IdUnidad')
            ->join('cliente AS c','p.IdCliente','=','c.IdCliente')
            ->join('productocliente AS pc','p.IdProducto','=','pc.Id')
            ->leftJoin('subproducto_cliente AS spc','p.IdSubproducto','=','spc.Id')
            ->join('usuario AS ejc','p.IdEjecutivo','=','ejc.IdUsuario')
            ->join('usuario AS dir','p.IdDirector','=','dir.IdUsuario')
            ->join('profesionales_cliente AS fc','p.IdProfesional','=','fc.IdProfesionalesCliente')
            ->join('par_estado_proyecto AS pep','p.IdEstado','=','pep.Id')
            ->where('p.Id', $idProyecto)
            ->select('p.Id', 'p.Codigo', 'p.Referencia', 'p.Descripcion', DB::raw('DATE(p.Fecha) AS Fecha'),
                'e.NombreComercial AS Empresa', 'p.IdEmpresa',
                'un.Nombre AS Unidad', 'p.IdUnidad',
                'c.NombreComercial AS Cliente', 'p.IdCliente',
                'pc.Nombre AS Producto', 'p.IdProducto',
                'spc.Nombre AS Subproducto', 'p.IdSubproducto',
                'ejc.Usuario AS Ejecutivo', 'p.IdEjecutivo',
                'dir.Usuario AS Director', 'p.IdDirector',
                'fc.Nombre AS Profesional', 'p.IdProfesional',
                'pep.Estado', 'p.IdEstado')
            ->first();

            $TRA_CLIENTES_OT_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('TRA_CLIENTES_OT_EDITAR')");

            $permiso_editar = 0;
            if( count($TRA_CLIENTES_OT_EDITAR) == 1 ){
                $permiso_editar = 1;
            }

            $proyecto->HashId = parent::CodeEncrypt($proyecto->Id);
            unset($proyecto->Id);
            $proyecto->HashEmpresa = parent::CodeEncrypt($proyecto->IdEmpresa);
            unset($proyecto->IdEmpresa);
            $proyecto->HashUnidad = parent::CodeEncrypt($proyecto->IdUnidad);
            unset($proyecto->IdUnidad);
            $proyecto->HashCliente = parent::CodeEncrypt($proyecto->IdCliente);
            unset($proyecto->IdCliente);
            $proyecto->HashProducto = parent::CodeEncrypt($proyecto->IdProducto);
            unset($proyecto->IdProducto);
            $proyecto->HashSubProducto = parent::CodeEncrypt($proyecto->IdSubproducto);
            unset($proyecto->IdSubproducto);
            $proyecto->HashEjecutivo = parent::CodeEncrypt($proyecto->IdEjecutivo);
            unset($proyecto->IdEjecutivo);
            $proyecto->HashDirector = parent::CodeEncrypt($proyecto->IdDirector);
            unset($proyecto->IdDirector);
            $proyecto->HashProfesional = parent::CodeEncrypt($proyecto->IdProfesional);
            unset($proyecto->IdProfesional);
            $proyecto->HashEstado = parent::CodeEncrypt($proyecto->IdEstado);
            unset($proyecto->IdEstado);

            $data = [
                'proyecto' => $proyecto,
                'TRA_CLIENTES_OT_EDITAR' => $permiso_editar
            ];
            return response()->json($data, 200);

        } catch (ValidationException $ex) {
            DB::rollback();
            DB::disableQueryLog();
            dd($ex->validator->errors(),$ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::rollback();
            DB::disableQueryLog();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::rollback();
            DB::disableQueryLog();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //4e22d0b98860bfea9378036286efdb10
    public function traEditarOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parProfesional' => 'required|string',
                'parDirector' => 'required|string',
                'parReferencia' => 'required|string',
                'parDescripcion' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $idOTProyecto = parent::CodeDescrypt($credentials['Hash']);
            // dd($idOTProyecto, $credentials['parReferencia'], $credentials['parDescripcion']);
            $idProfesional = parent::CodeDescrypt(intval($credentials['parProfesional']));
            $idDirector = parent::CodeDescrypt(intval($credentials['parDirector']));
            $referencia = $credentials['parReferencia'];
            $descripcion = $credentials['parDescripcion'];

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('proyectos')
            ->where('Id', $idOTProyecto)
            ->update([
                'IdProfesional' => $idProfesional,
                'IdDirector' => $idDirector,
                'Referencia' => $referencia,
                'Descripcion' => $descripcion,
                'IdEstado' => 1
            ]);

            parent::queryLogAuditoria([$idOTProyecto], $Usuario->IdUsuario, 'TRA_CLIENTES_OT_EDITAR');

            DB::commit();
            DB::disableQueryLog();

            return response()->json([
                'success' => true,
                'mensaje' => 'El Proyecto OT fue Editado exitosamente'
            ], 200);

        } catch (ValidationException $ex) {
            DB::rollback();
            DB::disableQueryLog();
            return response()->json([
                'mensaje' => $ex->getMessage(),
                'validators' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 500);
        } catch (QueryException $qe) {
            DB::rollback();
            DB::disableQueryLog();
            return response()->json([
                'mensaje' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 500);
        } catch (\Throwable $th) {
            DB::rollback();
            DB::disableQueryLog();
            return response()->json([
                'mensaje' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
        }
    }

    //d5ecd015c996aed826d6396648dc692e
    public function traDatosClientesOT()
    {
        try {
            $proyectos = DB::table('cliente')
            ->select('Codigo', 'Id')
            ->get();

            foreach($proyectos as $pro) {
                $pro->Hash = parent::CodeEncrypt($pro->Id);
                unset($pro->Id);
            }

            $data = [
                'proyectos' => $proyectos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 200);
        }
    }

    //f07ce113ce58c015a410434637b977b0
    public function traDatosEstadosOT()
    {
        try {
            $estados = DB::table('par_estado_proyecto')->get();

            foreach($estados as $pro) {
                $pro->Hash = parent::CodeEncrypt($pro->Id);
                unset($pro->Id);
            }

            $data = [
                'estados' => $estados,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 200);
        }
    }

//-------------------------------------------------------------//
//----------------- TAREAS PROYECTOS OT ----------------------//
//-----------------------------------------------------------//

    //3ba46c5c0d8db73c37ab9e4b1386c58d
    public function indexDatosTareasOT(Request $request)
    {
        $draw = $request['draw'];

        $idProyecto = parent::CodeDescrypt($request['search']['proyecto']);
        // $sqlAdicional = "";
        // if( $request['search']['Estadox'] == 0 ){
        //     $sqlAdicional = "  u.Estado = 0 ";
        // }else if( $request['search']['Estadox'] == 1 ){
        //     $sqlAdicional = "  u.Estado = 1 ";
        // }else{
        //     $sqlAdicional = "  u.Estado  in  (1,0) ";
        // }
        $sqlFrom = "FROM ( "
            ."SELECT Id, Asunto, Descripcion,IdTipoActividad, FechaEntrega, NroEntregables, IdProyecto, IdEstado, IdTipoTarea, IdUsuario, IdDepartamento, FechaHoraCreacion, FechaHoraRespuesta, IdUsuarioRespuesta, CONVERT(Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre FROM tareas "
                . "WHERE IdProyecto = ".$idProyecto." "
            ."UNION ALL "
            ."SELECT Id, Asunto, Descripcion, IdTipoActividad, FechaEntrega, NroEntregables, IdProyecto, IdEstado, IdTipoTarea, IdUsuario, IdDepartamento, FechaHoraCreacion, FechaHoraRespuesta, IdUsuarioRespuesta, CONVERT(Numeracion, CHAR)AS Numeracion, IdTareaPadre FROM subtareas "
                . " WHERE IdProyecto = ".$idProyecto." ) AS a "
            ."JOIN proyectos AS p ON a.IdProyecto = p.Id "
            . "JOIN TraTipoProceso tp on a.IdTipoActividad = tp.Id "
            ."JOIN scrum_estados AS se ON a.IdEstado = se.Id "
            ."JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id "
            ."JOIN usuario AS c ON a.IdUsuario = c.IdUsuario "
            ."JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id "
            ."WHERE p.Id = ".$idProyecto." ";

        $sqlCampos = " a.Id, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion, "
        ."TIME(a.FechaHoraCreacion) AS HoraCreacion, "
        ."DATE(a.FechaEntrega) AS FechaEntrega, "
        ."TIME(a.FechaEntrega) AS HoraEntrega, "
        ."DATE(a.FechaHoraRespuesta) AS FechaRespuesta, "
        ."TIME(a.FechaHoraRespuesta) AS HoraRespuesta, "
        ."pdt.Nombre AS Departamento, c.NombreUsuario AS Creador, "
        ."ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, "
        ."a.Numeracion, "
        ."a.IdTareaPadre, a.IdProyecto, p.Codigo, "
        . "tp.Nombre as TipoActividad,"
        ."(CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (DATE(a.FechaHoraCreacion) like '%".$searchValue."%' "
                . "or a.Numeracion like '%".$searchValue."%' "
                . "or tp.Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom, $sqlCampos ,$searchQuery,$searchValue);

        // $Numeracion = 1;
        $data = array();
        foreach($Records['empRecords'] as $row){

            $Temp = explode("-",$row->FechaCreacion);
            $row->FechaCreacion = parent::NombreDia($row->FechaCreacion).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
           
            $Temp = explode("-",$row->FechaEntrega);
            $row->FechaEntrega = parent::NombreDia($row->FechaEntrega).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
           

            $data[] = array(
            "Numeracion"=>$row->Numeracion,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Asunto"=>$row->Asunto,
            "FechaCreacion"=>$row->FechaCreacion,
            "HoraCreacion"=>$row->HoraCreacion,
            "TipoActividad"=>$row->TipoActividad,
            "FechaEntrega"=>$row->FechaEntrega,
            "HoraEntrega"=>$row->HoraEntrega,
            "FechaRespuesta"=>$row->FechaRespuesta,
            "HoraRespuesta"=>$row->HoraRespuesta,
            "Departamento"=>$row->Departamento,
            "IdProyecto"=>$row->IdProyecto,
            "Codigo"=>$row->Codigo,
            "Creador"=>$row->Creador,
            "Adjuntos"=>$row->Adjuntos,
            "TipoTarea"=>$row->TipoTarea,
            "IdTareaPadre" => $row->IdTareaPadre,
            "Estado"=>$row->Estado
            );
            // $Numeracion++;
        }

        $response = array(
            "draw" => intval($Records['draw']),
            "iTotalRecords" => $Records['totalRecords'],
            "iTotalDisplayRecords" => $Records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }

    //7a5382310484d6637d921d2580e2ed7b
    public function traDatosTareaDepartamentos()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $departamentos = DB::sELECT("SELECT Distinct  "
                    . "pdt.Id,pdt.Nombre "
                    . "FROM par_departamento_trafico pdt "
                    . "INNER JOIN par_usuario_asignados aud on pdt.Id = aud.IdDepto "
                    . "WHERE aud.IdUsuarioP = ".$Usuario->IdUsuario." "
                    . "ORDER BY pdt.Nombre asc");
            /*$departamentos = DB::table('par_departamento_trafico AS pdt')
            ->join('par_usuario_asignados as aud', 'pdt.Id', '=', 'aud.IdDepto')
            ->where(['aud.IdUsuario'=>$Usuario->IdUsuario, 'pdt.Estado' => 1])
            ->select('pdt.Id', 'pdt.Nombre')
            ->get();*/

            foreach ($departamentos as $depto) {
                $depto->Id = parent::CodeEncrypt($depto->Id);
                $depto->Hash = $depto->Id;
            }

            $data = [
                'departamentos' => $departamentos,
                'success' => true,
                'User' => $Usuario->IdUsuario,
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            return response()->json([
                'mensaje' => $ex->getMessage(),
                'success' => false,
                'error' => $ex,
                'mensajeExtendido' => $ex->validator->errors()
            ], 200);
        } catch (QueryException $qe) {
            return response()->json([
                'mensaje' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'mensaje' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ]);
        }
    }

    //1c0f6ac4c54b666640b9ec6cd7b09374
    public function traDatosTareaResponsables(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashDepartamento' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idDepto = parent::CodeDescrypt(intval($credentials['HashDepartamento']));

            $responsables = DB::table('par_responsable_depto AS prd')
            ->join('usuario AS u', 'prd.IdUsuario', '=', 'u.IdUsuario')
            ->where(['prd.IdDepto' => $idDepto, 'u.Estado' => 1])
            ->select('u.IdUsuario', 'u.Usuario', 'u.NombreUsuario')
                    ->orderBy('u.NombreUsuario', 'asc')
            ->get();

            foreach ($responsables as $responsable) {
                /*
                $HoyR = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario ) as Pend "
                        . "GROUP BY IdUsuario");
                $HoyRGeneral = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario) as Pend "
                        . "GROUP BY IdUsuario");
                if( count($HoyR) == 0 ){
                    $responsable->PendientesRHoy = 0;
                }else{
                    $responsable->PendientesRHoy = $HoyR[0]->Pendientes;
                }
                
                if( count($HoyRGeneral) == 0 ){
                    $responsable->PendientesRGeneral = 0;
                }else{
                    $responsable->PendientesRGeneral = $HoyRGeneral[0]->Pendientes;
                }
                
                */
                /*
                $HoyR = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario ) as Pend "
                        . "GROUP BY IdUsuario");
                $HoyRGeneral = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$responsable->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario) as Pend "
                        . "GROUP BY IdUsuario");
                
                if( count($HoyR) == 0 ){
                    $responsable->PendientesAHoy = 0;
                }else{
                    $responsable->PendientesAHoy = $HoyR[0]->Pendientes;
                }
                
                if( count($HoyRGeneral) == 0 ){
                    $responsable->PendientesAGeneral = 0;
                }else{
                    $responsable->PendientesAGeneral = $HoyRGeneral[0]->Pendientes;
                }
                */
                $responsable->PendientesAHoy = 0;
                $responsable->PendientesAGeneral = 0;
                $responsable->IdUsuario = parent::CodeEncrypt($responsable->IdUsuario);
                $responsable->Hash = $responsable->IdUsuario;
            }

            $data = [
                'responsables' => $responsables,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            return response()->json([
                'mensaje' => $ex->getMessage(),
                'success' => false,
                'error' => $ex,
                'mensajeExtendido' => $ex->validator->errors()
            ], 200);
        } catch (QueryException $qe) {
            return response()->json([
                'mensaje' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'mensaje' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ]);
        }
    }

    //452f332f565173807af7bc1dac1dc9c8
    public function traDatosTareaAsignados(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashDepartamento' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idDepto = parent::CodeDescrypt(intval($credentials['HashDepartamento']));

            $asignados = DB::table('par_usuario_asignados AS pua')
            ->join('usuario AS u', 'pua.IdAsignado', '=', 'u.IdUsuario')
            ->where(['pua.IdDepto' => $idDepto, 'pua.IdUsuarioP'=>$Usuario->IdUsuario, 'u.Estado'=>1])
            ->select('u.IdUsuario', 'u.Usuario', 'u.NombreUsuario')
                    ->orderBy('u.NombreUsuario', 'asc')
            ->get();

            foreach ($asignados as $element) {
                /*
                $HoyR = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario ) as Pend "
                        . "GROUP BY IdUsuario");
                $HoyRGeneral = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'RESP' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario) as Pend "
                        . "GROUP BY IdUsuario");
                if( count($HoyR) == 0 ){
                    $element->PendientesRHoy = 0;
                }else{
                    $element->PendientesRHoy = $HoyR[0]->Pendientes;
                }
                
                if( count($HoyRGeneral) == 0 ){
                    $element->PendientesRGeneral = 0;
                }else{
                    $element->PendientesRGeneral = $HoyRGeneral[0]->Pendientes;
                }
                */
                /*
                $HoyR = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario ) as Pend "
                        . "GROUP BY IdUsuario");
                $HoyRGeneral = DB::SELECT("SELECT IdUsuario, SUM(Pendientes) AS Pendientes "
                        . "FROM "
                        . "(SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Tareas t on d.Tareas_Id = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario "
                        . "UNION ALL "
                        . "SELECT d.IdUsuario, SUM(1) AS Pendientes "
                        . "FROM EquipoTarea d "
                        . "INNER JOIN Subtareas t on d.IdSubtarea = t.Id "
                        . "INNER JOIN PROYECTOS p on p.Id = t.IdProyecto AND p.IdEstado = 1 "
                        . "WHERE d.IdUsuario = ".$element->IdUsuario." "
                        . "AND d.Tipo = 'ASIG' "
                        . "AND t.IdEstado = 1 "
                        . "AND date_format(t.FechaEntrega,'%Y-%m-%d') != '".date("Y-m-d")."' "
                        . "GROUP BY d.IdUsuario) as Pend "
                        . "GROUP BY IdUsuario");
                
                if( count($HoyR) == 0 ){
                    $element->PendientesAHoy = 0;
                }else{
                    $element->PendientesAHoy = $HoyR[0]->Pendientes;
                }
                
                if( count($HoyRGeneral) == 0 ){
                    $element->PendientesAGeneral = 0;
                }else{
                    $element->PendientesAGeneral = $HoyRGeneral[0]->Pendientes;
                }*/
                
                $element->PendientesAGeneral = 0;
                $element->PendientesAHoy = 0;
                $element->IdUsuario = parent::CodeEncrypt($element->IdUsuario);
                $element->Hash = $element->IdUsuario;
            }

            $data = [
                'asignados' => $asignados,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            return response()->json([
                'mensaje' => $ex->getMessage(),
                'success' => false,
                'error' => $ex,
                'mensajeExtendido' => $ex->validator->errors()
            ], 200);
        } catch (QueryException $qe) {
            return response()->json([
                'mensaje' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'mensaje' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ]);
        }
    }

    //b78d35629037f2d88d1acf26c48d60df
    public function traDatosTareaTipo(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashDepartamento' => 'required|int',
            ]);
            $idDepto = parent::CodeDescrypt(intval($credentials['HashDepartamento']));
            $tipoTarea = DB::SELECT("SELECT "
                    . "ppt.Id, ppt.Nombre "
                    . "FROM partipotarea AS ppt "
                    . "INNER JOIN TraDeptosTipoTarea t on t.IdTipoTarea = ppt.Id and ppt.Estado = 1 "
                    . "WHERE t.IdDepto = $idDepto ORDER BY ppt.Nombre ASC");
            //TraDeptosTipoTarea

            foreach ($tipoTarea as $element) {
                $element->Id = parent::CodeEncrypt($element->Id);
                $element->Hash = $element->Id;
            }

            $data = [
                'tipoTarea' => $tipoTarea,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            return response()->json([
                'mensaje' => $ex->getMessage(),
                'success' => false,
                'error' => $ex,
                'mensajeExtendido' => $ex->validator->errors()
            ], 200);
        } catch (QueryException $qe) {
            return response()->json([
                'mensaje' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'mensaje' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ]);
        }
    }

    //e437a8b417bfa5ddd160338adfad4bae
    public function traDatosEstadoTarea()
    {
        try {
            $estados = DB::table('scrum_estados')
            ->where('Estado', 1)
            ->get();

            foreach ($estados as $estado) {
                $estado->Hash = parent::CodeEncrypt($estado->Id);
                unset($estado->Id);
            }

            $data = [
                'estados' => $estados,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 500);
        }
    }

    //75d327fc20cecb6c090edca0846575ac
    public function traCrearTareaOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parProyecto' => 'required|string',
                'parDepartamento' => 'required|string',
                'parResponsables' => 'required|array',
                'parResponsables.*' => 'required|string',
                'parAsignados' => 'required|array',
                'parAsignados.*' => 'required|string',
                'parHora' => 'required|date_format:H:i',
                'parFecha' => 'required|date',
                'parTipoSolicitud' => 'required|int',
                'parTipoTarea' => 'required|string',
                'parAsunto' => 'required|string',
                'parDescripcion' => 'required|string',
                'parAdjuntos' => 'nullable',
                'parAdjuntos.*' => 'file',
                'parNroEntregables' => 'required|integer|min:1'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $UsuarioNot = "";
            $idDepto = parent::CodeDescrypt($credentials['parDepartamento']);
            $idProyecto = parent::CodeDescrypt($credentials['parProyecto']);
            
            DB::UPDATE("UPDATE Proyectos set IdEstado = 1 WHERE Id = ".$idProyecto);
            
            $Proyecto = DB::table('proyectos')->select('Codigo')->where('Id', $idProyecto)->first();
            
            $idTipoTarea = parent::CodeDescrypt($credentials['parTipoTarea']);
            $idTipoActividad = parent::CodeDescrypt($credentials['parTipoSolicitud']);
            $idResponsables = [];
            $idAsignados = [];
            $fechaEntrega = $credentials['parFecha'] .' '. $credentials['parHora'];
            $numeracion = DB::table('Tareas')
                ->selectRaw('count(*) AS Consecutivo')
                ->where('IdProyecto', $idProyecto)->first();

            foreach ($credentials['parResponsables'] as $item) {
                array_push($idResponsables, parent::CodeDescrypt($item));
            }
            foreach ($credentials['parAsignados'] as $item) {
                array_push($idAsignados, parent::CodeDescrypt($item));
            }

            DB::beginTransaction();
            DB::enableQueryLog();
            $ids = [];
            
            $idTarea = DB::table('tareas')
            ->insertGetId([
                'Asunto' => $credentials['parAsunto'],
                'Descripcion' => $credentials['parDescripcion'],
                'FechaEntrega' => $fechaEntrega,
                'NroEntregables' => $credentials['parNroEntregables'],
                'IdProyecto' => $idProyecto,
                'IdEstado' => 1,
                'IdTipoTarea' => $idTipoTarea,
                'IdTipoActividad' => $idTipoActividad,
                'IdUsuario' => $Usuario->IdUsuario,
                'IdDepartamento' => $idDepto,
                'FechaHoraCreacion' => date('Y-m-d H:i:s'),
                'Numeracion' => $numeracion->Consecutivo + 1
            ]);
            array_push($ids, $idTarea);

            foreach ($idResponsables as $id) {
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'RESP',
                    'IdUsuario' => $id,
                    'Tareas_Id' => $idTarea
                ]);
                array_push($ids, $idEquipo);
            }
            $Correos = [];
            $NameCorreos = [];
            $tt = 0;
            foreach ($idAsignados as $id) {
                $InfoUserCorreo = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$id);
                $Correos[$tt]= $InfoUserCorreo[0]->Correo;
                $NameCorreos[$tt]= $InfoUserCorreo[0]->NombreUsuario;
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'ASIG',
                    'IdUsuario' => $id,
                    'Tareas_Id' => $idTarea
                ]);
                array_push($ids, $idEquipo);
                $tt++;
            }

            if(!empty($credentials['parAdjuntos'])){
                foreach ($credentials['parAdjuntos'] as $file) {
                    $nameFile = time().'-'.$file->getClientOriginalName();
                    $Carpeta = date("Y")."".date("m")."".date("d");
                    if(!Storage::exists('trafico/'.$Carpeta)){
                        Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                    }
                    $file->storeAs('trafico/Tareas/'.$Carpeta, $nameFile);
                    $IdAdjunto = DB::table('adjuntostareas')
                    ->insertGetId([
                        'Archivo' => $nameFile,
                        'Ruta' => $Carpeta,
                        'Tareas_Id' => $idTarea
                    ]);
                    array_push($ids, $IdAdjunto);
                }
            }

            parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'TRA_CLIENTES_TAREAOT_CREAR');

            DB::commit();
            DB::disableQueryLog();
            
            //$sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
                $Info['Asunto'] = "Nueva Tarea No. ".($numeracion->Consecutivo + 1)." - OT: ".$Proyecto->Codigo;
                $Info['Descripcion'] = nl2br($credentials['parDescripcion']);
                $Info['RegistradoPor'] = $Usuario->NombreUsuario;

                //$InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = $Usuario->Correo;
                $Info['Correos'] = $Correos;
                $Info['UsuariosN'] = $NameCorreos;

                $htmlContent = view('mailing.cliente.MensajeGeneral', ['Descripcion'=>$Info['Descripcion'],'Asunto'=>$Info['Asunto']])->render();
                for( $i = 0; $i < count($Correos); $i++ ){
                    (new MailController)->___SendEmailMailJet($htmlContent,$Correos[$i],"",$Info['Asunto']);
                }
                
            $data = [
                'success' => true,
                'mensaje' => 'La tarea ha sido generada de manera correcta'
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

    //692b650e2551e2c4d0b8c379178d7b25
    public function traDatosTareaOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parTarea' => 'required|string'
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $idTarea = parent::CodeDescrypt(intval($credentials['parTarea']));
            $sql = DB::SELECT("SELECT IdUsuario FROM Equipotarea WHERE Tareas_Id = $idTarea AND IdUsuario = ".$Usuario->IdUsuario." AND ISNULL(FechaVisualizacion)");
            if( count($sql) > 0 ){
                DB::UPDATE("UPDATE Equipotarea SET FechaVisualizacion = '".date("Y-m-d H:i:s")."' WHERE Tareas_Id = $idTarea AND IdUsuario = ".$Usuario->IdUsuario."");
            }
            
            $Tarea = DB::table('tareas AS t')
            ->join('proyectos AS p', 't.IdProyecto', '=', 'p.Id')
            ->join('scrum_estados AS se', 't.IdEstado', '=', 'se.Id')
            ->join('partipotarea AS ptt', 't.IdTipoTarea', '=', 'ptt.Id')
            ->join('usuario AS c', 't.IdUsuario', '=', 'c.IdUsuario')
            ->join('par_departamento_trafico AS pdt', 't.IdDepartamento' ,'=', 'pdt.Id')
            ->join('TraTipoProceso AS ppp', 't.IdTipoActividad' ,'=', 'ppp.Id')
            ->leftJoin('usuario AS r', 't.IdUsuarioRespuesta', '=', 'r.IdUsuario')
            ->select(
                't.Id',
                't.Id as Hasing',
                't.Asunto',
                't.IdDepartamento',
                't.Descripcion',
                't.IdrequerimientoCliente',
                DB::raw('DATE(t.FechaEntrega) As FechaEntrega'),
                DB::raw('TIME(t.FechaEntrega) As HoraEntrega'),
                't.NroEntregables',
                'p.Referencia AS Proyecto',
                't.IdProyecto',
                't.IdUsuario',
                'se.Nombre AS Estado',
                'ptt.Nombre AS TipoTarea',
                'ptt.Id AS IdTipoTarea',
                'c.NombreUsuario AS Creador',
                'ppp.Nombre AS TipoActividad',
                't.IdTipoActividad',
                'pdt.Nombre AS Departamento',
                DB::raw('DATE(t.FechaHoraCreacion) AS FechaCreacion'),
                DB::raw('TIME(t.FechaHoraCreacion) AS HoraCreacion'),
                DB::raw('DATE(t.FechaHoraRespuesta) AS FechaRespuesta'),
                DB::raw('TIME(t.FechaHoraRespuesta) AS HoraRespuesta'),
                'r.NombreUsuario AS UsuarioRespuesta',
                't.Numeracion'
            )
            ->where('t.Id',$idTarea)
            ->first();

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $TRA_CLIENTE_TAREA_EDITAR = $Tarea->IdUsuario == $Usuario->IdUsuario ? true : false;
            $Contestar = 0;
            

            $Tarea->Id = parent::CodeEncrypt($Tarea->Id);
            //$Tarea->IdrequerimientoCliente = parent::CodeEncrypt($Tarea->IdrequerimientoCliente);
            $Tarea->HashRq = parent::CodeEncrypt($Tarea->IdrequerimientoCliente);
            $Tarea->IdProyecto = parent::CodeEncrypt($Tarea->IdProyecto);
            
            $Tarea->IdTipoTarea = parent::CodeEncrypt($Tarea->IdTipoTarea);
            $Tarea->IdTipoActividad = parent::CodeEncrypt($Tarea->IdTipoActividad);
            $TRA_CLIENTE_ENVIAR_CLIENTE = (new Controller)->ValidarPermisoUsuario("TRA_CLIENTES_OT_ENVIAR_CLIENTE",session('keyUser'),0);

            $Tarea->responsables = DB::table('EquipoTarea AS et')
            ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
            ->select('et.IdUsuario', 'u.NombreUsuario','et.FechaVisualizacion')
            ->where(['Tipo' => 'RESP', 'Tareas_Id' => $idTarea])
            ->get();
            foreach ($Tarea->responsables as $responsable) {
                if( $Usuario->IdUsuario == $responsable->IdUsuario ){
                    $Contestar = 1;
                }
                $responsable->IdUsuario = parent::CodeEncrypt($responsable->IdUsuario);
            }

            $Tarea->asignados = DB::table('EquipoTarea AS et')
            ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
            ->select('et.IdUsuario', 'u.NombreUsuario','et.FechaVisualizacion')
            ->where(['Tipo' => 'ASIG', 'Tareas_Id' => $idTarea])
            ->get();
            foreach ($Tarea->asignados as $asignado) {
                if( $Usuario->IdUsuario == $asignado->IdUsuario ){
                    $Contestar = 1;
                }
                $asignado->IdUsuario = parent::CodeEncrypt($asignado->IdUsuario);
            }

            $Tarea->archivos = DB::table('adjuntostareas')
            ->where('Tareas_Id', $idTarea)
            ->select('Id', 'Archivo')
            ->get();
            foreach ($Tarea->archivos as $archivo) {
                $archivo->Id = parent::CodeEncrypt($archivo->Id);
                $Nombre = explode('-',$archivo->Archivo);
                unset($Nombre[0]);
                unset($archivo->Archivo);
                $archivo->Nombre = implode('-',$Nombre);
            }
            $TraTipoProceso = DB::SELECT("SELECT Id, Nombre "
                    . "FROM TraTipoProceso "
                    . "WHERE Estado = 1 AND Tipo = 'Nuevo' "
                    . "ORDER BY Nombre ASC");
            foreach($TraTipoProceso as $tp){
                $tp->Id = (new Controller)->CodeEncrypt($tp->Id);
            }
            
            
            $tipoTarea = DB::SELECT("SELECT "
                    . "ppt.Id, ppt.Nombre "
                    . "FROM partipotarea AS ppt "
                    . "INNER JOIN TraDeptosTipoTarea t on t.IdTipoTarea = ppt.Id "
                    . "WHERE t.IdDepto = ".$Tarea->IdDepartamento." ORDER BY ppt.Nombre ASC");
            //TraDeptosTipoTarea
            $Tarea->IdDepartamento = parent::CodeEncrypt($Tarea->IdDepartamento);
            
            foreach ($tipoTarea as $element) {
                $element->Hash = parent::CodeEncrypt($element->Id);
            }
            
            $TRA_CLIENTE_TAREA_CONTESTADA = false;
            if ( ($Tarea->Estado=='PENDIENTE' || $Tarea->Estado=='EN PROCESO') && $Contestar == 1) {
                $TRA_CLIENTE_TAREA_CONTESTADA = true;
            }
            
            $data = [
                'tarea' => $Tarea,
                'TraTipoProceso' => $TraTipoProceso,
                'TipoTarea' => $tipoTarea,
                'TRA_CLIENTE_TAREA_EDITAR' => $TRA_CLIENTE_TAREA_EDITAR,
                'TRA_CLIENTE_TAREA_CONTESTADA' => $TRA_CLIENTE_TAREA_CONTESTADA,
                'TRA_CLIENTE_ENVIAR_CLIENTE' => $TRA_CLIENTE_ENVIAR_CLIENTE,
                'success' => true,
                'mensaje' => 'Consulta obtenida exitosamente'
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

    //70387f8087a0fc297af72111d10f50d3
    public function traGetFileDownload($hashFile)
    {
        try {
            if ( session('Time') > date("Y-m-d H:i:s") ){
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                if ($Usuario) {
                    $idFile = $hashFile;//parent::CodeDescrypt(intval($hashFile));
                    $File = DB::table('adjuntostareas')
                    ->where('Id', $idFile)->first();
                    $nameFile = $File->Archivo;
                    $file =  storage_path('app/trafico/Tareas/'.$File->Ruta.'/'.$nameFile);
                    //return response()->file($file, $File->Archivo);
                    return response()->file($file);
                } else {
                    return response()->json(['success' => false, 'mensaje' => 'No Usuario'], 200);
                }
            } else {
                return response()->json(['success' => false, 'mensaje' => 'Sesion terminada'], 200);
            }
        } catch (\Throwable $th) {
            $e = parent::normalExeption($th);
            return response()->json($e, 200);
        }
    }

    //2196b8ef1d725788a4f617a978bc2648
    public function traModificarTarea(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parFechaEntrega' => 'required|date',
                'parHoraEntrega' => 'nullable',
                'parJustificacion' => 'required|string',
                'parTarea' => 'nullable|string',
                'parSubtarea' => 'nullable|string',
                'parTipoTarea' => 'nullable|string',
                'parTipoSolicitud' => 'nullable|int',
                'parAsunto' => 'required|string',
                'parDescripcion' => 'required|string',
                'parNroEntregables' => 'required|string'
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idTipoTarea = parent::CodeDescrypt(intval($credentials['parTipoTarea']));
            $idTipoSolicitud = parent::CodeDescrypt(intval($credentials['parTipoSolicitud']));
            $idTarea = null;
            $idSubTarea = null;

            if (is_null($credentials['parTarea'])) {
                $idSubTarea = parent::CodeDescrypt(intval($credentials['parSubtarea']));
            } else {
                $idTarea = parent::CodeDescrypt(intval($credentials['parTarea']));
            }
            $fechaNueva = $credentials['parFechaEntrega'].' '.$credentials['parHoraEntrega'];
            $fechaAnterior = '';
            $tarea = null;
            if (is_null($idTarea)) {
                $fechaAnterior = DB::table('subtareas')->select('FechaEntrega')->where('Id', $idSubTarea)->first();
                $tarea = DB::table('subtareas');
            } else {
                $fechaAnterior = DB::table('tareas')->select('FechaEntrega')->where('Id', $idTarea)->first();
                $tarea = DB::table('tareas');
            }
            DB::beginTransaction();
            DB::enableQueryLog();

            $tarea->where('Id', $idTarea)
            ->update([
                'FechaEntrega' => $fechaNueva,
                'IdTipoTarea' => $idTipoTarea,
                'IdTipoActividad' => $idTipoSolicitud,
                'Asunto' => $credentials['parAsunto'],
                'Descripcion' => $credentials['parDescripcion'],
                'NroEntregables' => $credentials['parNroEntregables']
            ]);

            $id = DB::table('justificacion_tarea')
            ->insertGetId([
                'IdUsuario' => $Usuario->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s'),
                'Fecha_Anterior' => $fechaAnterior->FechaEntrega,
                'Fecha_Nueva' => $fechaNueva,
                'Justificacion' => $credentials['parJustificacion'],
                'IdTarea' => $idTarea,
                'IdSubTarea' => $idSubTarea
            ]);


            parent::queryLogAuditoria([$idTarea, $id], $Usuario->IdUsuario, 'TRA_EDITAR_TAREA_OT');

            DB::commit();
            DB::disableQueryLog();
            $data = [
                'success' => true,
                'mensaje' => 'Se ha modificado la tarea exitosamente'
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

    //900b044d402dc2259e19dd66c475f2fa
    public function traHistorialModificacionesTarea(Request $request) {
        try {
            $credentials = $this->validate($request, [
                'parTarea' => 'nullable|string',
                'parSubtarea' => 'nullable|string'
            ]);

            $justificaciones = DB::table('justificacion_tarea AS j')
            ->distinct()
            ->select('j.Id AS Hash', DB::raw('DATE(j.FechaHora) AS FechaModificacion'), DB::raw('TIME(j.FechaHora) AS HoraModificacion'), 'j.Justificacion', 'u.NombreUsuario')
            ->join('usuario AS u', 'j.IdUsuario', '=', 'u.IdUsuario')
            ->orderBy('FechaHora', 'desc');

            if (is_null($credentials['parSubtarea'])) {
                $id = parent::CodeDescrypt(intval($credentials['parTarea']));
                $justificaciones = $justificaciones->where('IdTarea', $id)->get();
            } else {
                $id = parent::CodeDescrypt(intval($credentials['parSubtarea']));
                $justificaciones = $justificaciones->where('IdSubTarea', $id)->get();
            }

            $i = 1;
            foreach($justificaciones as $jus) {
                $jus->Num = $i++;
            }

            $data = [
                'justificaciones' => $justificaciones,
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
//-------------------------------------------------------------//
//-----------------SubTareas (Tareas Hijo) -------------------//
//-----------------------------------------------------------//

    //cbe2e4f260ef5bbfe58c112825b3b494
    public function traCrearSubtarea(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parProyecto' => 'required|string',
                'parDepartamento' => 'required|string',
                'parResponsables' => 'required|array',
                'parResponsables.*' => 'required|string',
                'parAsignados' => 'required|array',
                'parAsignados.*' => 'required|string',
                'parHora' => 'required|date_format:H:i',
                'parFecha' => 'required|date',
                'parTipoTarea' => 'required|string',
                'parAsunto' => 'required|string',
                'parDescripcion' => 'required|string',
                'parAdjuntos' => 'nullable',
                'parAdjuntos.*' => 'file',
                'parNroEntregables' => 'required|integer|min:1',
                'parTareaPadre' => 'required|string',
                'parFuenteTarea' => 'required|string',
                'parTarea' => 'required|string',
                'parTipoSolicitud' => 'required|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $fuenteTarea = $credentials['parFuenteTarea']; //PADRE | HIJO
            $idTareaOriginal = parent::CodeDescrypt($credentials['parTarea']);

            $idDepto = parent::CodeDescrypt($credentials['parDepartamento']);
            $idProyecto = parent::CodeDescrypt($credentials['parProyecto']);
            $Proyecto = DB::table('proyectos')->select('Codigo')->where('Id', $idProyecto)->first();
            
            DB::UPDATE("UPDATE Proyectos set IdEstado = 1 WHERE Id = ".$idProyecto);
            
            $idTipoTarea = parent::CodeDescrypt($credentials['parTipoTarea']);
            $idTareaPadre = parent::CodeDescrypt($credentials['parTareaPadre']);
            $parTipoSolicitud = parent::CodeDescrypt($credentials['parTipoSolicitud']);
            
            $idResponsables = [];
            $idAsignados = [];
            $fechaEntrega = $credentials['parFecha'] .' '. $credentials['parHora'];
            $numeracion = DB::table('subtareas')
                ->select('Numeracion AS Consecutivo')
                ->where('IdTareaPadre', $idTareaPadre)->latest('Numeracion')->first();

            if ($numeracion) {
                $numeracion = floatval($numeracion->Consecutivo) + 0.1;
            } else {
                $consecutivo = DB::table('tareas')->where('Id', $idTareaPadre)->select('Numeracion')->first();
                $numeracion = $consecutivo->Numeracion + 0.1;
            }
            // dd($numeracion);
            foreach ($credentials['parResponsables'] as $item) {
                array_push($idResponsables, parent::CodeDescrypt($item));
            }
            foreach ($credentials['parAsignados'] as $item) {
                array_push($idAsignados, parent::CodeDescrypt($item));
            }

            DB::beginTransaction();
            DB::enableQueryLog();
            $ids = [];

            $idTarea = DB::table('subtareas')
            ->insertGetId([
                'Asunto' => $credentials['parAsunto'],
                'Descripcion' => $credentials['parDescripcion'],
                'FechaEntrega' => $fechaEntrega,
                'NroEntregables' => $credentials['parNroEntregables'],
                'IdProyecto' => $idProyecto,
                'IdTipoActividad' => $parTipoSolicitud,
                'IdEstado' => 1,
                'IdTipoTarea' => $idTipoTarea,
                'IdUsuario' => $Usuario->IdUsuario,
                'IdDepartamento' => $idDepto,
                'FechaHoraCreacion' => date('Y-m-d H:i:s'),
                'Numeracion' => $numeracion,
                'IdTareaPadre' => $idTareaPadre
            ]);
            array_push($ids, $idTarea);

            foreach ($idResponsables as $id) {
                
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'RESP',
                    'IdUsuario' => $id,
                    'IdSubtarea' => $idTarea
                ]);
                array_push($ids, $idEquipo);
            }
            
            $Correos = [];
            $NameCorreos = [];
            $tt = 0;
            foreach ($idAsignados as $id) {
                $InfoUserCorreo = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$id);
                $Correos[$tt]= $InfoUserCorreo[0]->Correo;
                $NameCorreos[$tt]= $InfoUserCorreo[0]->NombreUsuario;
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'ASIG',
                    'IdUsuario' => $id,
                    'IdSubtarea' => $idTarea
                ]);
                array_push($ids, $idEquipo);
                $tt++;
            }

            if(!empty($credentials['parAdjuntos'])){
                foreach ($credentials['parAdjuntos'] as $file) {
                    $nameFile = time().'-'.$file->getClientOriginalName();
                    $Carpeta = date("Y")."".date("m")."".date("d");
                    if(!Storage::exists('trafico/'.$Carpeta)){
                        Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                    }
                    $file->storeAs('trafico/Tareas/'.$Carpeta, $nameFile);
                    $IdAdjunto = DB::table('adjuntostareas')
                    ->insertGetId([
                        'Archivo' => $nameFile,
                        'Ruta' => $Carpeta,
                        'IdSubtarea' => $idTarea
                    ]);
                    array_push($ids, $IdAdjunto);
                }
            }

            $updateTareaOriginal = null;
            if ($fuenteTarea == 'PADRE') {
                $updateTareaOriginal = DB::table('tareas');
            } else {
                $updateTareaOriginal = DB::table('subtareas');
            }
            $updateTareaOriginal->where('Id', $idTareaOriginal)
            ->update([
                'IdEstado' => 7,
                'FechaHoraRespuesta' => date('Y-m-d H:i:s'),
                'IdUsuarioRespuesta' => $Usuario->IdUsuario
            ]);
            array_push($ids, $idTareaOriginal);

            parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'TRA_CLIENTES_TAREAOT_CREAR');

            DB::commit();
            DB::disableQueryLog();
            
            $Info['Asunto'] = "Nueva Tarea No. ".($numeracion)." - OT: ".$Proyecto->Codigo;
            $Info['Descripcion'] = nl2br($credentials['parDescripcion']);
            $Info['RegistradoPor'] = $Usuario->NombreUsuario;

            //$InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
            $Info['RegistradoPorCorreo'] = $Usuario->Correo;
            $Info['Correos'] = $Correos;
            $Info['UsuariosN'] = $NameCorreos;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            $data = [
                'success' => true,
                'mensaje' => 'La subtarea ha sido generada exitosamente'
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

    //88ebb343f380470982d18584639651bc
    public function traDatosSubTareaOT(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parSubTarea' => 'required|string'
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $idSubTarea = parent::CodeDescrypt(intval($credentials['parSubTarea']));
            $sql = DB::SELECT("SELECT IdUsuario FROM Equipotarea WHERE IdSubtarea = $idSubTarea AND IdUsuario = ".$Usuario->IdUsuario." AND ISNULL(FechaVisualizacion)");
            if( count($sql) > 0 ){
                DB::UPDATE("UPDATE Equipotarea SET FechaVisualizacion = '".date("Y-m-d H:i:s")."' WHERE IdSubtarea = $idSubTarea AND IdUsuario = ".$Usuario->IdUsuario."");
            }
            $Tarea = DB::table('subtareas AS t')
            ->join('proyectos AS p', 't.IdProyecto', '=', 'p.Id')
            ->join('scrum_estados AS se', 't.IdEstado', '=', 'se.Id')
            ->join('partipotarea AS ptt', 't.IdTipoTarea', '=', 'ptt.Id')
            ->join('usuario AS c', 't.IdUsuario', '=', 'c.IdUsuario')
            ->join('par_departamento_trafico AS pdt', 't.IdDepartamento' ,'=', 'pdt.Id')
            ->join('TraTipoProceso AS ppp', 't.IdTipoActividad' ,'=', 'ppp.Id')
            ->leftJoin('usuario AS r', 't.IdUsuarioRespuesta', '=', 'r.IdUsuario')
            ->select(
                't.Id',
                't.Id AS Hasing',
                't.Asunto',
                't.Descripcion',
                DB::raw('DATE(t.FechaEntrega) As FechaEntrega'),
                DB::raw('TIME(t.FechaEntrega) As HoraEntrega'),
                't.NroEntregables',
                'p.Referencia AS Proyecto',
                't.IdProyecto',
                't.IdDepartamento',
                't.IdUsuario',
                'se.Nombre AS Estado',
                'ptt.Nombre AS TipoTarea',
                'ptt.Id AS IdTipoTarea',
                'c.NombreUsuario AS Creador',
                'ppp.Nombre AS TipoActividad',
                't.IdTipoActividad',
                'pdt.Nombre AS Departamento',
                DB::raw('DATE(t.FechaHoraCreacion) AS FechaCreacion'),
                DB::raw('TIME(t.FechaHoraCreacion) AS HoraCreacion'),
                DB::raw('DATE(t.FechaHoraRespuesta) AS FechaRespuesta'),
                DB::raw('TIME(t.FechaHoraRespuesta) AS HoraRespuesta'),
                'r.NombreUsuario AS UsuarioRespuesta',
                't.Numeracion',
                't.IdTareaPadre'
            )
            ->where('t.Id',$idSubTarea)
            ->first();

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $TRA_CLIENTE_TAREA_EDITAR = $Tarea->IdUsuario == $Usuario->IdUsuario ? true : false;
            $TRA_CLIENTE_ENVIAR_CLIENTE = (new Controller)->ValidarPermisoUsuario("TRA_CLIENTES_OT_ENVIAR_CLIENTE",session('keyUser'),0);

            $Contestar = 0;
            $Req = DB::SELECT("SELECT idrequerimientocliente FROM Tareas WHERE Id = ".$Tarea->IdTareaPadre);
            if( $Req[0]->idrequerimientocliente == NULL ){
                $Tarea->Req = 0;
            }else{
                $Tarea->Req = $Req[0]->idrequerimientocliente;
                $Tarea->HashRq = parent::CodeEncrypt($Req[0]->idrequerimientocliente);
            }
            $Tarea->Id = parent::CodeEncrypt($Tarea->Id);
            $Tarea->IdProyecto = parent::CodeEncrypt($Tarea->IdProyecto);
            $Tarea->IdTipoTarea = parent::CodeEncrypt($Tarea->IdTipoTarea);
            $Tarea->IdTareaPadre = parent::CodeEncrypt($Tarea->IdTareaPadre);
            $Tarea->IdTipoActividad = parent::CodeEncrypt($Tarea->IdTipoActividad);

            $Tarea->responsables = DB::table('EquipoTarea AS et')
            ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
            ->select('et.IdUsuario', 'u.NombreUsuario','et.FechaVisualizacion')
            ->where(['Tipo' => 'RESP', 'IdSubtarea' => $idSubTarea])
            ->get();
            foreach ($Tarea->responsables as $responsable) {
                if( $Usuario->IdUsuario == $responsable->IdUsuario ){
                    $Contestar = 1;
                }
                $responsable->IdUsuario = parent::CodeEncrypt($responsable->IdUsuario);
            }

            $Tarea->asignados = DB::table('EquipoTarea AS et')
            ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
            ->select('et.IdUsuario', 'u.NombreUsuario','et.FechaVisualizacion')
            ->where(['Tipo' => 'ASIG', 'IdSubtarea' => $idSubTarea])
            ->get();
            foreach ($Tarea->asignados as $asignado) {
                if( $Usuario->IdUsuario == $asignado->IdUsuario ){
                    $Contestar = 1;
                }
                $asignado->IdUsuario = parent::CodeEncrypt($asignado->IdUsuario);
            }

            $Tarea->archivos = DB::table('adjuntostareas')
            ->where('IdSubtarea', $idSubTarea)
            ->select('Id', 'Archivo')
            ->get();
            foreach ($Tarea->archivos as $archivo) {
                $archivo->Id = parent::CodeEncrypt($archivo->Id);
                $Nombre = explode('-',$archivo->Archivo);
                unset($Nombre[0]);
                unset($archivo->Archivo);
                $archivo->Nombre = implode('-',$Nombre);
            }
            
            $TraTipoProceso = DB::SELECT("SELECT Id, Nombre "
                    . "FROM TraTipoProceso "
                    . "WHERE Estado = 1  "
                    . "ORDER BY Nombre ASC");
            foreach($TraTipoProceso as $tp){
                $tp->Id = (new Controller)->CodeEncrypt($tp->Id);
            }
            
            
            $tipoTarea = DB::SELECT("SELECT "
                    . "ppt.Id, ppt.Nombre "
                    . "FROM partipotarea AS ppt "
                    . "INNER JOIN TraDeptosTipoTarea t on t.IdTipoTarea = ppt.Id "
                    . "WHERE t.IdDepto = ".$Tarea->IdDepartamento." ORDER BY ppt.Nombre ASC");
            //TraDeptosTipoTarea
            $Tarea->IdDepartamento = parent::CodeEncrypt($Tarea->IdDepartamento);
            
            foreach ($tipoTarea as $element) {
                $element->Hash = parent::CodeEncrypt($element->Id);
            }

            $TRA_CLIENTE_TAREA_CONTESTADA = false;
            if ( ($Tarea->Estado=='PENDIENTE' || $Tarea->Estado=='EN PROCESO') && $Contestar == 1) {
                $TRA_CLIENTE_TAREA_CONTESTADA = true;
            }
            
            $data = [
                'tarea' => $Tarea,
                'TipoTarea' => $tipoTarea,
                'TraTipoProceso' => $TraTipoProceso,
                'TRA_CLIENTE_TAREA_EDITAR' => $TRA_CLIENTE_TAREA_EDITAR,
                'TRA_CLIENTE_TAREA_CONTESTADA' => $TRA_CLIENTE_TAREA_CONTESTADA,
                'TRA_CLIENTE_ENVIAR_CLIENTE' => $TRA_CLIENTE_ENVIAR_CLIENTE,
                'success' => true,
                'mensaje' => 'Consulta obtenida exitosamente'
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

    //b28d52b730cc411f2e1870be7380f015
    public function traFinalizarTarea(Request $request) {
        try {
            $credentials = $this->validate($request, [
                'parProyecto' => 'required|string',
                'parDepartamento' => 'required|string',
                'parResponsables' => 'required|array',
                'parResponsables.*' => 'required|string',
                'parAsignados' => 'required|array',
                'parAsignados.*' => 'required|string',
                'parHora' => 'required|date_format:H:i',
                'parFecha' => 'required|date',
                'parTipoTarea' => 'required|string',
                'parTipoSolicitud' => 'required|string',
                'parAsunto' => 'required|string',
                'parDescripcion' => 'required|string',
                'parAdjuntos' => 'nullable',
                'parAdjuntos.*' => 'file',
                'parNroEntregables' => 'required|integer|min:1',
                'parTareaPadre' => 'required|string',
                'parTarea' => 'required|string'
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idTareaOriginal = parent::CodeDescrypt($credentials['parTarea']);

            $idDepto = parent::CodeDescrypt($credentials['parDepartamento']);
            $idProyecto = parent::CodeDescrypt($credentials['parProyecto']);
            $idTipoTarea = parent::CodeDescrypt($credentials['parTipoTarea']);
            $parTipoSolicitud = parent::CodeDescrypt($credentials['parTipoSolicitud']);
            $idTareaPadre = parent::CodeDescrypt($credentials['parTareaPadre']);
            $idResponsables = [];
            $idAsignados = [];
            $fechaEntrega = $credentials['parFecha'] .' '. $credentials['parHora'];
            $numeracion = DB::table('subtareas')
                ->select('Numeracion AS Consecutivo', 'Id')
                ->where('IdTareaPadre', $idTareaPadre)->latest('Numeracion')->first();

            if ($numeracion && $numeracion->Id == $idTareaOriginal) {
                $numeracion = floatval($numeracion->Consecutivo) + 0.1;
            } else {
                return response()->json(['success'=>false, 'mensaje'=>'No esta permitida la finalizacion de la tarea'], 500);
            }
            // dd($numeracion);
            foreach ($credentials['parResponsables'] as $item) {
                array_push($idResponsables, parent::CodeDescrypt($item));
            }
            foreach ($credentials['parAsignados'] as $item) {
                array_push($idAsignados, parent::CodeDescrypt($item));
            }

            DB::beginTransaction();
            DB::enableQueryLog();
            $ids = [];

            $idTarea = DB::table('subtareas')
            ->insertGetId([
                'Asunto' => $credentials['parAsunto'],
                'Descripcion' => $credentials['parDescripcion'],
                'FechaEntrega' => $fechaEntrega,
                'NroEntregables' => $credentials['parNroEntregables'],
                'IdProyecto' => $idProyecto,
                'IdEstado' => 5,
                'IdTipoTarea' => $idTipoTarea,
                'IdTipoActividad' => $parTipoSolicitud,
                'IdUsuario' => $Usuario->IdUsuario,
                'IdDepartamento' => $idDepto,
                'FechaHoraCreacion' => date('Y-m-d H:i:s'),
                'Numeracion' => $numeracion,
                'IdTareaPadre' => $idTareaPadre
            ]);
            array_push($ids, $idTarea);

            foreach ($idResponsables as $id) {
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'RESP',
                    'IdUsuario' => $id,
                    'IdSubtarea' => $idTarea
                ]);
                array_push($ids, $idEquipo);
            }

            foreach ($idAsignados as $id) {
                $idEquipo = DB::table('equipotarea')
                ->insertGetId([
                    'Tipo' => 'ASIG',
                    'IdUsuario' => $id,
                    'IdSubtarea' => $idTarea
                ]);
                array_push($ids, $idEquipo);
            }

            if(!empty($credentials['parAdjuntos'])){
                foreach ($credentials['parAdjuntos'] as $file) {
                    $nameFile = time().'-'.$file->getClientOriginalName();
                    $Carpeta = date("Y")."".date("m")."".date("d");
                    if(!Storage::exists('trafico/'.$Carpeta)){
                        Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                    }
                    $file->storeAs('trafico/Tareas/'.$Carpeta, $nameFile);
                    $IdAdjunto = DB::table('adjuntostareas')
                    ->insertGetId([
                        'Archivo' => $nameFile,
                        'Ruta' => $Carpeta,
                        'IdSubtarea' => $idTarea
                    ]);
                    array_push($ids, $IdAdjunto);
                }
            }

            DB::table('subtareas')
            ->where('Id', $idTareaOriginal)
            ->update([
                'IdEstado' => 7,
                'FechaHoraRespuesta' => date('Y-m-d H:i:s'),
                'IdUsuarioRespuesta' => $Usuario->IdUsuario
            ]);
            array_push($ids, $idTareaOriginal);

            parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'TRA_CLIENTES_TAREAOT_CREAR');

            DB::commit();
            DB::disableQueryLog();
            $data = [
                'success' => true,
                'mensaje' => 'La subtarea ha sido generada exitosamente'
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
    
    
    //3115db3fb13ad9db964287eed6b9cd37
    public function ListarPersonalAgencia(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|string'
        ]);
        /*
        $Data = DB::SELECT("SELECT DISTINCT "
                . "IdUsuario, NombreUsuario, Tipo, Correo "
                . "FROM "
                . "(SELECT u.IdUsuario, u.NombreUsuario, 'Usuario' as Tipo, CASE WHEN ISNULL(u.Correo) THEN '' ELSE u.Correo END AS Correo "
                . "FROM Usuario u "
                . "WHERE u.NombreUsuario like '%".$credentials['Hash']."%' and u.Estado = 1 "
                . "UNION ALL "
                . "SELECT p.IdEmpleado AS IdUsuario, CONCAT(p.Nombre1,' ', p.Nombre2,' ', p.Apellido1,' ',p.Apellido2) as NombreUsuario, "
                . "'Empleado' as Tipo, CASE WHEN ISNULL(p.CorreoEmpresa) THEN '' ELSE p.CorreoEmpresa END as Correo "
                . "FROM Empleado p "
                . "WHERE p.Estado = 1 AND "
                . "(p.Nombre1 like '%".$credentials['Hash']."%' OR "
                . "p.Nombre2 like '%".$credentials['Hash']."%' OR "
                . "p.Apellido1 like '%".$credentials['Hash']."%' OR "
                . "p.Apellido2 like '%".$credentials['Hash']."%' )"
                . ") AS Personas");*/
        $Data = DB::SELECT("SELECT DISTINCT "
                . "IdUsuario, NombreUsuario, Tipo, Correo "
                . "FROM "
                . "(SELECT u.IdUsuario, u.NombreUsuario, 'Usuario' as Tipo, CASE WHEN ISNULL(u.Correo) THEN '' ELSE u.Correo END AS Correo "
                . "FROM Usuario u "
                . "WHERE u.NombreUsuario like '%".$credentials['Hash']."%' and u.Estado = 1 "
                . " "
                . ") AS Personas");
        
        foreach($Data as $tp){
            $tp->IdUsuario = (new Controller)->CodeEncrypt($tp->IdUsuario);
        }
        
        return response()->json([
            "Personas"=>$Data,
        ]);
    }
    //3115db3fb13ad9db964287eed6b9cd37
    public function ListarPersonalAgenciaEmp(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|string'
        ]);
        $Data = DB::SELECT("SELECT DISTINCT "
                . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) as NombreUsuario,e.IdEmpleado as IdUsuario "
                . "FROM empleado e "
                . "where e.Estado = 1 AND "
                . " ("
                . "e.Nombre1 like '%".$credentials['Hash']."%' OR "
                . "e.Nombre2 like '%".$credentials['Hash']."%' OR "
                . "e.Apellido1 like '%".$credentials['Hash']."%' OR "
                . "e.Apellido2 like '%".$credentials['Hash']."%'  "
                . ") "
                . " "
                . "");
        
        foreach($Data as $tp){
            $tp->IdUsuario = (new Controller)->CodeEncrypt($tp->IdUsuario);
        }
        
        return response()->json([
            "Personas"=>$Data,
        ]);
    }
    
    //26f6f79e7ea824292f003d2b04defa52
    public function ListarPersonalCliente(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|string',
            'Hash2' => 'required|int',
        ]);
        //IR_Cliente
        
        $DatosProyecto = DB::SELECT("SELECT "
                . "IdEmpresa, IdUnidad, IdCliente "
                . "FROM proyectos "
                . "WHERE Id = ".parent::CodeDescrypt($credentials['Hash2']));
        
        $Data = DB::SELECT("SELECT DISTINCT "
                . "Id, Nombre, Correo "
                . "FROM "
                . "(SELECT c.Id, c.Nombre, c.Correo "
                . "FROM IR_Cliente c "
                . "INNER JOIN informe_reunion irr on c.IdInformeR = irr.id "
                . "INNER JOIN proyectos py on irr.IdProyecto = py.Id AND py.idcliente = ".$DatosProyecto[0]->IdCliente." "
                . "WHERE (c.Nombre like '%".$credentials['Hash']."%' OR c.Correo like '%".$credentials['Hash']."%') "
                . "UNION ALL "
                . "SELECT p.Id, p.Nombre, p.Correo "
                . "FROM contactos_cliente p "
                . "WHERE "
                . "(p.Nombre like '%".$credentials['Hash']."%' OR "
                . "p.Correo like '%".$credentials['Hash']."%' OR "
                . "p.Cargo like '%".$credentials['Hash']."%' ) AND p.estado = 1 AND p.idcliente = ".$DatosProyecto[0]->IdCliente." "
                . "UNION ALL "
                . "SELECT t.IdProfesionalesCliente as Id, t.Nombre, t.Correo "
                . "FROM profesionales_cliente t "
                . "WHERE "
                . "(t.Nombre like '%".$credentials['Hash']."%' OR "
                . "t.Correo like '%".$credentials['Hash']."%' ) AND t.estado = 1 "
                . ") AS Personas");
        
        foreach($Data as $tp){
            $tp->Id = (new Controller)->CodeEncrypt($tp->Id);
        }
        
        return response()->json([
            "Personas"=>$Data,
        ]);
    }
    
    //c5bf651acc16c564c0aea75ade0da094
    public function TraListarTiposMovimiento(){
        $Data = DB::SELECT("SELECT Id, Nombre "
                . "FROM TraTipoProceso "
                . "WHERE Estado = 1 AND Tipo = 'Nuevo' "
                . "ORDER BY Nombre ASC");
        foreach($Data as $tp){
            $tp->Id = (new Controller)->CodeEncrypt($tp->Id);
        }
        $data = [
                'Tipos' => $Data,
                'success' => true
            ];
        return response()->json($data, 200);
    }
    //c5bf651acc16c564c0aea75ade0da094x
    public function TraListarTiposMovimientoRespuesta(){
        $Data = DB::SELECT("SELECT Id, Nombre "
                . "FROM TraTipoProceso "
                . "WHERE Estado = 1 AND Tipo = 'Movimiento' "
                . "ORDER BY Nombre ASC");
        foreach($Data as $tp){
            $tp->Id = (new Controller)->CodeEncrypt($tp->Id);
        }
        $data = [
                'Tipos' => $Data,
                'success' => true
            ];
        return response()->json($data, 200);
    }
    
    //00320d5c5bc62ada8b51221d5a784f52
    public function TraGuardarInformeEntrevista(Request $request){
        
        try {
            $Credentials = $this->validate($request, [
                'Hash' => 'required|int',
                'Asunto' => 'required|string',
                'IdTipoInforme' => 'required|int',
                'IdTipoReunion' => 'required|int',
                'Fecha' => 'required|date',
                'HInicio' => 'required|string',
                'HFin' => 'required|string',
                //'InformacionGeneral' => 'required|string',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $IdProyecto = parent::CodeDescrypt(intval($Credentials['Hash']));
            $IdTipoInforme = parent::CodeDescrypt(intval($Credentials['IdTipoInforme']));
            $IdTipoReunion = parent::CodeDescrypt(intval($Credentials['IdTipoReunion']));
            
            $InformacionReunion = "";
            $InformacionReunion .= "<p style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;'>Objetivos de la Reunión</p>";
            
            $Inf_Objetivos = \GuzzleHttp\json_decode($request->input('Inf_Objetivos'));
            if( count($Inf_Objetivos) > 0 ){
                for($i = 0; $i < count($Inf_Objetivos);$i++){
                    $Inf_Objetivos[$i] = (array) $Inf_Objetivos[$i];
                    $InformacionReunion .= "<p style = 'padding-left:10px;text-align:justify;'>".($i+1)."). ".$Inf_Objetivos[$i]['Objetivo']."</p>";
                }
            }
            
            $InformacionReunion .= "<br>";
            $InformacionReunion .= "<br>";
            
            $InformacionReunion .= "<p style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;'>Desarrollo de la Reunión</p>";
            $InformacionReunion .= "<table width = '100%'>";
            $Inf_Desarrollo = \GuzzleHttp\json_decode($request->input('Inf_Desarrollo'));
            if( count($Inf_Desarrollo) > 0 ){
                for($i = 0; $i < count($Inf_Desarrollo);$i++){
                    $Inf_Desarrollo[$i] = (array) $Inf_Desarrollo[$i];
                    $InformacionReunion .= "<tr>";
                    $InformacionReunion .= "<td style = 'padding-left:10px;text-align:justify;'>".($i+1)."). <strong>".$Inf_Desarrollo[$i]['Objetivo']."</strong>: ". nl2br($Inf_Desarrollo[$i]['Desarrollo'])."</td>";
                    $InformacionReunion .= "</tr>";
                }
            }
            $InformacionReunion .= "</table>";
            $InformacionReunion .= "<br>";
            $InformacionReunion .= "<br>";
            
            $InformacionReunion .= "<table width = '100%'>";
            $InformacionReunion .= "<tr>";
                $InformacionReunion .= "<th colspan = '4' style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;'>COMPROMISOS AGENCIA</th>";
            $InformacionReunion .= "</tr>";
            $Inf_CompromisosAgencia = \GuzzleHttp\json_decode($request->input('Inf_CompromisosAgencia'));
            if( count($Inf_CompromisosAgencia) > 0 ){
                for($i = 0; $i < count($Inf_CompromisosAgencia);$i++){
                    $Inf_CompromisosAgencia[$i] = (array) $Inf_CompromisosAgencia[$i];
                    $InformacionReunion .= "<tr>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;text-align:center;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:5%;'>".($i+1)."</td>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:20%;'>";
                        $Inf_CompromisosAgencia[$i]['Responsable'] = (array) $Inf_CompromisosAgencia[$i]['Responsable'];
                        for($x = 0; $x < count($Inf_CompromisosAgencia[$i]['Responsable']);$x++){
                            $Inf_CompromisosAgencia[$i]['Responsable'][$x] = (array)  $Inf_CompromisosAgencia[$i]['Responsable'][$x];
                            $InformacionReunion .= "<p>".$Inf_CompromisosAgencia[$i]['Responsable'][$x]['Nombre']."</p>";
                        }
                        $InformacionReunion .= "</td>";
                        
                        $Temp = explode("-",$Inf_CompromisosAgencia[$i]['Fecha']);
                        $FechaLarga = parent::NombreDia($Inf_CompromisosAgencia[$i]['Fecha']).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:20%;'>".$FechaLarga."</td>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:55%;'>".nl2br($Inf_CompromisosAgencia[$i]['Compromiso'])."</td>";
                        
                    $InformacionReunion .= "</tr>";
                    
                }
            }else{
                $InformacionReunion .= "<tr>";
                    $InformacionReunion .= "<td colspan = '4' style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;text-align:center;' >No se establecieron compromisos.</td>";
                $InformacionReunion .= "</tr>";
            }
            $InformacionReunion .= "</table>";
            
            
            $InformacionReunion .= "<br>";
            $InformacionReunion .= "<br>";
            
            $InformacionReunion .= "<table width = '100%'>";
            $InformacionReunion .= "<tr>";
                $InformacionReunion .= "<th colspan = '4' style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;'>COMPROMISOS CLIENTE</th>";
            $InformacionReunion .= "</tr>";
            $Inf_CompromisosCliente = \GuzzleHttp\json_decode($request->input('Inf_CompromisosCliente'));
            if( count($Inf_CompromisosCliente) > 0 ){
                for($i = 0; $i < count($Inf_CompromisosCliente);$i++){
                    $Inf_CompromisosCliente[$i] = (array) $Inf_CompromisosCliente[$i];
                    $InformacionReunion .= "<tr>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;text-align:center;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:5%;'>".($i+1)."</td>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:20%;'>";
                            $InformacionReunion .= "<p>".$Inf_CompromisosCliente[$i]['Responsable']."</p>";
                        $InformacionReunion .= "</td>";
                        
                        $Temp = explode("-",$Inf_CompromisosCliente[$i]['Fecha']);
                        $FechaLarga = parent::NombreDia($Inf_CompromisosCliente[$i]['Fecha']).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:20%;'>".$FechaLarga."</td>";
                        $InformacionReunion .= "<td style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:55%;'>".nl2br($Inf_CompromisosCliente[$i]['Compromiso'])."</td>";
                        
                    $InformacionReunion .= "</tr>";
                    
                }
            }else{
                $InformacionReunion .= "<tr>";
                    $InformacionReunion .= "<td colspan = '4' style = 'background-color:#f8f8f8;font-weight: bold;padding:5px;border: 1px solid #d0d0d0;width:100%;text-align:center;' >No se establecieron compromisos.</td>";
                $InformacionReunion .= "</tr>";
            }
            $InformacionReunion .= "</table>";
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('Informe_Reunion')
            ->insertGetId([
                'IdProyecto'=>$IdProyecto,
                'Fecha'=>$Credentials['Fecha'],
                'Hora_Inicio'=>$Credentials['HInicio'],
                'Hora_Fin'=>$Credentials['HFin'],
                'Lugar' => '',
                'Referencia' => $Credentials['Asunto'],
                'IdTipoReunion' => $IdTipoReunion,
                'TipoInforme' => $IdTipoInforme,
                'IdUsuario' => $Usuario->IdUsuario,
                'InformacionGeneral' => $InformacionReunion,
                'Fechahora' => date('Y-m-d H:i:s'),
                'IdEstado' => 1
            ]);
            
            //parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'TRA_CLIENTES_OT_INFENT_CREAR');
            
            //Asistentes Agencia
            $AsistentesAgencia = \GuzzleHttp\json_decode($request->input('AsistentesAgencia'));
            if( count($AsistentesAgencia) > 0 ){
                for($i = 0; $i < count($AsistentesAgencia);$i++){
                    $AsistentesAgencia[$i] = (array) $AsistentesAgencia[$i];
                    $idx = DB::table('IR_Agencia')
                    ->insertGetId([
                        'IdUsuario' =>parent::CodeDescrypt($AsistentesAgencia[$i]['IdU']),
                        'Tipo' => 'Asistente-'.$AsistentesAgencia[$i]['Tipo'],
                        'IdInformeR' => $id
                    ]);
                }
            }
            
            //Copiados Agencia
            $CopiadosAgencia = \GuzzleHttp\json_decode($request->input('CopiadosAgencia'));
            if( count($CopiadosAgencia) > 0 ){
                for($i = 0; $i < count($CopiadosAgencia);$i++){
                    $CopiadosAgencia[$i] = (array) $CopiadosAgencia[$i];
                    $idx = DB::table('IR_Agencia')
                    ->insertGetId([
                        'IdUsuario' =>parent::CodeDescrypt($CopiadosAgencia[$i]['IdU']),
                        'Tipo' => 'Copia-'.$CopiadosAgencia[$i]['Tipo'],
                        'IdInformeR' => $id
                    ]);
                }
            }
            
            //Asistentes Clientes
            $AsistentesClientes = \GuzzleHttp\json_decode($request->input('AsistentesCliente'));
            if( count($AsistentesClientes) > 0 ){
                for($i = 0; $i < count($AsistentesClientes);$i++){
                    $AsistentesClientes[$i] = (array) $AsistentesClientes[$i];

                    $idx = DB::table('IR_Cliente')
                    ->insertGetId([
                        'Nombre' =>$AsistentesClientes[$i]['Nombre'],
                        'Correo' =>$AsistentesClientes[$i]['Correo'],
                        'Tipo' => 'Asistente',
                        'IdInformeR' => $id
                    ]);
                }
            }
            
            //Copiados Generales
            $CopiadosGenerales = \GuzzleHttp\json_decode($request->input('CopiadosGeneral'));
            if( count($CopiadosGenerales) > 0 ){
                for($i = 0; $i < count($CopiadosGenerales);$i++){
                    $CopiadosGenerales[$i] = (array) $CopiadosGenerales[$i];
                    $idx = DB::table('IR_Cliente')
                    ->insertGetId([
                        'Nombre' =>$CopiadosGenerales[$i]['Nombre'],
                        'Correo' =>$CopiadosGenerales[$i]['Correo'],
                        'Tipo' => 'Copia',
                        'IdInformeR' => $id
                    ]);
                }
            }
            
            /*
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $Carpeta = date("Y")."".date("m")."".date("d");
                if(!Storage::exists('InformesEntrevista/'.$Carpeta)){
                    Storage::makeDirectory('InformesEntrevista/'.$Carpeta, 0775, true);
                }
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }*/
            
            DB::commit();
            DB::disableQueryLog();
            
            $Info = $this->TraDatosInformeEntrevista($id);
            if( count($Info) > 0 ){
                if( (new MailController)->Mail_EnviarInformeEntrevista($Info,$Info['RegistradoPorCorreo'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    DB::table('Informe_Reunion')
                    ->where('Id', $id)
                    ->update([
                        'IdEstado' => 2,
                    ]);
                    
                    $data = [
                        'mensaje' => 'Informe Creado y Enviado.',
                        'success' => true
                    ];
                    
                }else{
                    $data = [
                        'mensaje' => 'Se ha creado el Informe de Manera correcta.\nNo Enviado se logró el envío, por favor reenvíelo.',
                        'success' => true
                    ];
                }
            }else{
                $data = [
                        'mensaje' => 'Se ha creado el Informe de Manera correcta.\nNo se logró el envío, por favor reenvíelo.',
                        'success' => true
                    ];
            }
            
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
        } catch (QueryException $qe) {
            dd($qe);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    
    //
    public function TraDatosInformeEntrevista($HashInforme){
        $DataInforme = DB::SELECT("SELECT "
                . "ie.IdProyecto,ie.Fecha, ie.Hora_Inicio, ie.Hora_Fin, "
                . "ie.Lugar, ie.Referencia as Asunto, ie.IdTipoReunion, "
                . "ie.FechaHora, ie.InformacionGeneral, u.NombreUsuario,"
                . "tp.Nombre as TipoReunion, ti.Nombre as TipoInforme,"
                . "p.Codigo as NumOt, p.Referencia, p.Descripcion, "
                . "e.NombreComercial as Empresa, c.NombreComercial as Cliente,"
                . ""
                . "u.Correo "
                . "FROM  informe_reunion ie "
                . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                . "INNER JOIN tiporeunion tp on ie.IdTipoReunion = tp.Id "
                . "INNER JOIN tipoinforme ti on ie.TipoInforme = ti.Id "
                . "INNER JOIN Proyectos p on ie.IdProyecto = p.Id "
                . "INNER JOIN Empresa e on p.IdEmpresa = e.IdEmpresa "
                . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente "
                . "WHERE ie.Id = $HashInforme");
        
        $Info = [];
        
        if( count($DataInforme) > 0 ){
            $Info['Asunto'] = $DataInforme[0]->Asunto;
            $Info['RegistradoPor'] = $DataInforme[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $DataInforme[0]->Correo;
            $Info['Por'] = $DataInforme[0]->NombreUsuario;
            
            $Info['IdProyecto'] = $DataInforme[0]->IdProyecto;
            $Info['Fecha'] = $DataInforme[0]->Fecha;
            $Info['Hora_Inicio'] = $DataInforme[0]->Hora_Inicio;
            $Info['Hora_Fin'] = $DataInforme[0]->Hora_Fin;
            $Info['Lugar'] = $DataInforme[0]->Lugar;
            $Info['Asunto'] = $DataInforme[0]->Asunto;
            $Info['IdTipoReunion'] = $DataInforme[0]->IdTipoReunion;
            $Info['FechaHora'] = $DataInforme[0]->FechaHora;
            $Info['InformacionGeneral'] = $DataInforme[0]->InformacionGeneral;
            $Info['NombreUsuario'] = $DataInforme[0]->NombreUsuario;
            $Info['TipoReunion'] = $DataInforme[0]->TipoReunion;
            $Info['TipoInforme'] = $DataInforme[0]->TipoInforme;
            $Info['NombreUsuario'] = $DataInforme[0]->NombreUsuario;
            $Info['NumOt'] = $DataInforme[0]->NumOt;
            $Info['Referencia'] = $DataInforme[0]->Referencia;
            $Info['Descripcion'] = $DataInforme[0]->Descripcion;
            $Info['Empresa'] = $DataInforme[0]->Empresa;
            $Info['Cliente'] = $DataInforme[0]->Cliente;
            
            $DataUsers = DB::SELECT("SELECT DISTINCT "
                    . "NombreUsuario, Correo "
                    . "FROM "
                    . "(SELECT "
                    . "u.NombreUsuario, u.Correo "
                    . "FROM ir_agencia ie "
                    . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                    . "WHERE ie.Tipo = 'Asistente-Usuario' AND ie.IdInformeR = $HashInforme "
                    . "UNION ALL "
                    . "SELECT "
                    . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) as NombreUsuario, u.Correo "
                    . "FROM ir_agencia ie "
                    . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                    . "INNER JOIN Empleado e on u.IdPersona = e.IdEmpleado "
                    . "WHERE ie.Tipo = 'Asistente-Empleado' AND ie.IdInformeR = $HashInforme ) as Asistentes "
                    . "ORDER BY NombreUsuario");
            $Info['AsistentesAgencia'] = $DataUsers;
            $temp = array();
            $t = 0;
            foreach($DataUsers as $r){
                $temp['Correo'][$t] = $r->Correo;
                $temp['Nombre'][$t] = $r->NombreUsuario;
                $t++;
            }
            $Info['AsistentesAgencia_mail'] = $temp;
            
            $DataUsers = DB::SELECT("SELECT DISTINCT "
                    . "NombreUsuario, Correo "
                    . "FROM "
                    . "(SELECT "
                    . "u.NombreUsuario, u.Correo "
                    . "FROM ir_agencia ie "
                    . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                    . "WHERE ie.Tipo in ('Copia-DEF','Copia-Usuario')  AND ie.IdInformeR = $HashInforme "
                    . "UNION ALL "
                    . "SELECT "
                    . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) as NombreUsuario, u.Correo "
                    . "FROM ir_agencia ie "
                    . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                    . "INNER JOIN Empleado e on u.IdPersona = e.IdEmpleado "
                    . "WHERE ie.Tipo = 'Copia-Empleado' AND ie.IdInformeR = $HashInforme ) as Asistentes "
                    . "ORDER BY NombreUsuario");
            $Info['CopiadosAgencia'] = $DataUsers;
            $temp = array();
            $t = 0;
            if( count($DataUsers) > 0 ){
                foreach($DataUsers as $r){
                    $temp['Correo'][$t] = $r->Correo;
                    $temp['Nombre'][$t] = $r->NombreUsuario;
                    $t++;
                }
            }
            $Info['CopiadosAgencia_mail'] = $temp;
            
            $DataUsers = DB::SELECT("SELECT "
                    . ""
                    . "ie.Nombre,ie.Correo "
                    . "FROM ir_cliente ie "
                    . "WHERE ie.Tipo = 'Asistente' AND ie.IdInformeR = $HashInforme  "
                    . "ORDER BY Nombre");
            $temp = array();
            $t = 0;
            if( count($DataUsers) > 0 ){
                foreach($DataUsers as $r){
                    $temp['Correo'][$t] = $r->Correo;
                    $temp['Nombre'][$t] = $r->Nombre;
                    $t++;
                }
            }
            $Info['AsistentesCliente'] = $DataUsers;
            $Info['AsistentesCliente_mail'] = $temp;
            
            $DataUsers = DB::SELECT("SELECT "
                    . ""
                    . "ie.Nombre,ie.Correo "
                    . "FROM ir_cliente ie "
                    . "WHERE ie.Tipo = 'Copia' AND ie.IdInformeR = $HashInforme  "
                    . "ORDER BY Nombre");
            $Info['CopiadosGeneral'] = $DataUsers;
            $temp = array();
            $t = 0;
            if( count($DataUsers) > 0 ){
                foreach($DataUsers as $r){
                    $temp['Correo'][$t] = $r->Correo;
                    $temp['Nombre'][$t] = $r->Nombre;
                    $t++;
                }
            }
            $Info['CopiadosGeneral_mail'] = $temp;
            
            $Docs = DB::SELECT("SELECT "
                    . ""
                    . "ie.Nombre,ie.Correo "
                    . "FROM ir_cliente ie "
                    . "WHERE ie.Tipo = 'Copia' AND ie.IdInformeR = $HashInforme  "
                    . "ORDER BY Nombre");
            $Info['Documentos'] = [];
        }
        
        return $Info;
    }
    
    //5e3750b3f123e3b8bdccd914b725ef75
    public function traInformesEntrevistaProyecto(Request $request){
        $draw = $request['draw'];

        $idProyecto = parent::CodeDescrypt($request['search']['Hash']);
        
        $sqlFrom = "FROM "
            ."informe_reunion ie "
            . "INNER JOIN par_estadoinformeentrevista e on ie.IdEstado = e.Id "
                . "INNER JOIN Usuario u on ie.IdUsuario = u.IdUsuario "
                . "INNER JOIN tipoinforme ti on ie.TipoInforme = ti.Id "
            ."WHERE ie.IdProyecto = ".$idProyecto." ";

        $sqlCampos = " ie.Id, ie.Referencia, ie.Fecha as FechaInforme, DATE_FORMAT(ie.FechaHora,'%Y-%m-%d') as FechaCreacion,"
                . ""
                . "DATE_FORMAT(ie.FechaHora,'%T') as HoraCreacion, u.NombreUsuario as Creador, ti.Nombre as TipoInforme, "
                . "e.Nombre as EstadoInforme "
                . " ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (ie.Referencia like '%".$searchValue."%' or ie.FechaHora like '%".$searchValue."%' ) ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom, $sqlCampos ,$searchQuery,$searchValue);

         $Numeracion = 1;
        $data = array();
        foreach($Records['empRecords'] as $row){
            $data[] = array(
            "Referencia"=>$row->Referencia,
            "Numeracion"=>$Numeracion,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "FechaInforme"=>$row->FechaInforme,
            "FechaCreacion"=>$row->FechaCreacion,
            "HoraCreacion"=>$row->HoraCreacion,
            "TipoInforme"=>$row->TipoInforme,
            "Creador"=>$row->Creador,
            "EstadoInforme"=>$row->EstadoInforme,
            "TipoInforme"=>$row->TipoInforme,
            );
            $Numeracion++;
        }

        $response = array(
            "draw" => intval($Records['draw']),
            "iTotalRecords" => $Records['totalRecords'],
            "iTotalDisplayRecords" => $Records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    //0dfed6315e7cd3cf6c204ea06a20f407
    public function TraReenviarInformeEntrevista(Request $request){
        $Credentials = $this->validate($request, [
            'Hash' => 'required|int',
        ]);
        $IdInforme = parent::CodeDescrypt(intval($Credentials['Hash']));
        $Info = $this->TraDatosInformeEntrevista($IdInforme);
        
        if( (new MailController)->Mail_EnviarInformeEntrevista($Info,$Info['RegistradoPorCorreo'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
            DB::table('Informe_Reunion')
            ->where('Id', $IdInforme)
            ->update([
                'IdEstado' => 2,
            ]);

            $data = [
                'mensaje' => 'Informe Enviado.',
                'success' => true
            ];

        }else{
            $data = [
                'mensaje' => "Informe No Enviado.",
                'success' => false
            ];
        }
        
        return response()->json($data, 200);
    }

    //------------------------------------------------------------------------------

    public function __DataClientesList(){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $Clientes = DB::SELECT("SELECT DISTINCT  
        c.NombreComercial, c.IdCliente 
        FROM Cliente c 
        INNER JOIN par_usuariocliente PC ON c.IdCliente = pc.IdCliente 
        AND pc.IdUsuario = ".$Usuario->IdUsuario." AND c.Estado = 1  
        ORDER BY c.NombreComercial ASC");

        $data = [
            'Clientes' => $Clientes,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    public function __DataClientes(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $_IdCliente = ( empty($request['IdCliente']) ) ? '' : 'AND pc.IdCliente = '.$request['IdCliente'];
        $_Text = ( empty($request['OTC_TextBusqueda']) ) ? '' : 'AND (p.Referencia like "%'.$request['OTC_TextBusqueda'].'%" 
        OR e.NombreComercial like "%'.$request['OTC_TextBusqueda'].'%" 
        OR p.Codigo like "%'.$request['OTC_TextBusqueda'].'%" 
        OR ejc.NombreUsuario like "%'.$request['OTC_TextBusqueda'].'%"
        OR dir.NombreUsuario like "%'.$request['OTC_TextBusqueda'].'%" )';

        $Clientes = DB::SELECT("SELECT DISTINCT  
        c.NombreComercial, c.IdCliente 
        FROM Cliente c 
        INNER JOIN par_usuariocliente PC ON c.IdCliente = pc.IdCliente  $_IdCliente 
        INNER JOIN proyectos p ON p.IdCliente = c.IdCliente
        INNER JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa 
        LEFT JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad 
        INNER JOIN productocliente AS pcx ON p.IdProducto = pcx.Id 
        LEFT JOIN subproducto_cliente AS spc ON p.IdSubproducto = spc.Id 
        INNER JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario 
        INNER JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario 
        LEFT JOIN profesionales_cliente AS fc ON p.IdProfesional = fc.IdProfesionalesCliente 
        INNER JOIN par_usuariocliente pus on pus.IdCliente = p.IdCliente AND pus.IdProducto = p.IdProducto 
        AND pc.IdUsuario = ".$Usuario->IdUsuario." AND c.Estado = 1  
        WHERE 1 = 1 $_Text 
        ORDER BY c.NombreComercial ASC");


        foreach( $Clientes as $c ){
            $Productos = DB::SELECT("SELECT DISTINCT 
            pa.Id as IdProducto, pa.Nombre as Producto
            FROM productocliente pa 
            INNER JOIN par_usuariocliente pc ON pa.IdCliente = pa.IdCliente AND pa.Estado = 1 
            AND pc.IdCliente = ".$c->IdCliente." AND pc.IdUsuario = ".$Usuario->IdUsuario." 
            AND pc.IdProducto = pa.Id

            INNER JOIN proyectos p ON p.IdProducto = pa.Id
            INNER JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa 
            LEFT JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad 
            INNER JOIN Cliente AS pcx ON p.IdCliente = pcx.IdCliente 
            LEFT JOIN subproducto_cliente AS spc ON p.IdSubproducto = spc.Id 
            INNER JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario 
            INNER JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario 
            LEFT JOIN profesionales_cliente AS fc ON p.IdProfesional = fc.IdProfesionalesCliente 
            INNER JOIN par_usuariocliente pus on pus.IdCliente = p.IdCliente AND pus.IdProducto = p.IdProducto 

            WHERE 1 = 1 $_Text 
            ORDER BY pa.Nombre asc 
            ");
            
            foreach( $Productos as $p ){
                $Proyectos = DB::SELECT("SELECT DISTINCT p.Id, p.Codigo, p.Referencia, e.NombreComercial AS Empresa, "
                . "CASE WHEN ISNULL(un.Nombre) THEN '' ELSE un.Nombre END AS Unidad, "
                . "c.NombreComercial AS Cliente, pc.Nombre AS Producto, spc.Nombre AS Subproducto, "
                . "ejc.NombreUsuario AS Ejecutivo, dir.NombreUsuario AS Director, CASE WHEN ISNULL(fc.Nombre) THEN '' ELSE fc.Nombre END  AS Profesional, "
                . "pep.Estado, DATE_FORMAT(p.Fecha,'%Y-%m-%d') as Fecha, p.IdEjecutivo, p.IdEstado "
                . "FROM `proyectos` AS P "
                ."JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa "
                ."LEFT JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad "
                ."JOIN cliente AS c ON p.IdCliente = c.IdCliente  "
                ."JOIN productocliente AS pc ON p.IdProducto = pc.Id AND p.IdProducto = ".$p->IdProducto." "
                ."LEFT JOIN subproducto_cliente AS spc ON p.IdSubproducto = spc.Id "
                ."JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario "
                ."JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario "
                ."LEFT JOIN profesionales_cliente AS fc ON p.IdProfesional = fc.IdProfesionalesCliente "
                . "INNER JOIN par_usuariocliente pus on pus.IdCliente = p.IdCliente AND pus.IdProducto = p.IdProducto 
                AND pus.IdUsuario = ".$Usuario->IdUsuario." "
                ."JOIN par_estado_proyecto AS pep ON p.IdEstado = pep.Id "
                . "WHERE 1 = 1 $_Text");

                foreach( $Proyectos as $pp ){
                    $pp->CodigoHash = parent::CodeEncrypt( $pp->Id );
                    $pp->UsuarioConsulta = $Usuario->IdUsuario;
                }
                
                $p->Proyectos = $Proyectos;
            }
            $c->Productos = $Productos;
        }
        $data = [
            'Clientes' => $Clientes,
            'success' => true
        ];

        return response()->json($data, 200);
    }

    public function __DetalleOtsTrafico(Request $request){
        $Tareas = DB::SELECT(" 
        SELECT t.Id, t.Id AS IdTarea, t.Numeracion, NULL AS IdSubTarea, 
        CASE WHEN ISNULL(t.Asunto) THEN '' ELSE t.Asunto END AS Asunto, 
        CASE WHEN ISNULL(t.Descripcion) THEN '' ELSE t.Descripcion END AS Descripcion, 
        CASE WHEN ISNULL(t.FechaEntrega) THEN '' ELSE t.FechaEntrega END AS FechaEntrega, 
        CASE WHEN ISNULL(t.NroEntregables) THEN 0 ELSE t.NroEntregables END AS NroEntregables, 
        DATE_FORMAT(t.FechaEntrega, '%Y-%m-%d') as _FechaEntrega,
        t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, t.IdDepartamento, 
        DATE_FORMAT(t.FechaHoraCreacion,'%Y-%m-%d') as FechaCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, 
        CONVERT(t.Numeracion, CHAR) AS Numeracion, NULL AS IdTareaPadre , tp.Nombre as TipoTarea, u.ImgUsuario,
        (SELECT COUNT(1) FROM adjuntostareas WHERE Tareas_Id = t.Id) as NumAdjuntos, se.Nombre as EstadoTarea
        FROM tareas t 
        INNER JOIN PROYECTOS p on t.IdProyecto = p.Id AND  t.IdProyecto = ".$request['Hash']." 
        INNER JOIN partipotarea TP ON tp.Id = t.IdTipoTarea 
        INNER JOIN Usuario u ON t.IdUsuario = u.IdUsuario 
        INNER JOIN scrum_estados se ON t.IdEstado = se.Id
        ORDER BY t.Numeracion
        ");
        foreach( $Tareas as $td ){
            
            $Temp = explode("-",$td->FechaCreacion);
            $td->_FechaCreacion = $td->FechaCreacion;
            $td->FechaCreacion = parent::NombreDia($td->FechaCreacion).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            $Temp = explode("-",$td->FechaEntrega);
            //$td->_FechaEntrega = $td->FechaEntrega;
            if( !empty($td->FechaEntrega) ){
                $td->FechaEntrega = parent::NombreDia($td->FechaEntrega).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            }else{
                $td->FechaEntrega = "Sin Definir";
            }
                        
            $Asignados = DB::SELECT("SELECT 
            u.NombreUsuario, u.ImgUsuario, att.Id 
            FROM equipotarea att 
            INNER JOIN Usuario u ON att.IdUsuario = u.IdUsuario AND att.Tipo = 'ASIG' AND att.Tareas_Id = ".$td->Id);

            $Status = DB::SELECT("
            SELECT StatusTarea, DATE_FORMAT(Fecha,'%Y-%m-%d') as FechaR 
            FROM status_tareas WHERE Id = (
            SELECT MAX(Id) as Id
            FROM status_tareas 
            WHERE IdTarea = ".$td->Id." 
            GROUP BY IdTarea)");
            $st = "";
            $fr = "";
            $NumRecibidos = 0;
            foreach( $Status as $y ){
                $st = $y->StatusTarea;

                $Temp = explode("-",$y->FechaR);
                $y->FechaR = parent::NombreDia($y->FechaR).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
                //$NumRecibidos = $y->NumRecibidos;
                $fr = $y->FechaR;
            }
            $td->Status = ( count($Status) == 0) ? '' : $st;
            $td->FechaR = ( count($Status) == 0) ? '' : $fr;
            $td->NumRecibidos = $NumRecibidos;
            $td->Asignados = $Asignados;
        }
        return response()->json([
            'info'=>1,
            'Tareas' => $Tareas
        ]);
    }

    public function __RetirarAsignadoTarea_(Request $request){
        $sql = DB::DELETE("DELETE FROM equipotarea WHERE id = ". $request->input('R'));
        return response()->json([
            'info'=>1
        ]);
    }

    public function __AccionTareaOt_(Request $request){
        DB::beginTransaction();
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            DB::table('Tareas')
            ->where('Id', $request->input('Hash'))
            ->update([
                'IdEstado' => ( $request->input('Acts')  == 'CER' ) ? 5 : 6,
            ]);

            DB::commit();
            return response()->json([
                'info'=>1,
            ]);

        } catch (\PDOException $exception) {
            error_log("Documento proyecto: " . $exception->getMessage());
            throw new \PDOException("Documento proyecto: " . $exception->getMessage());
            DB::rollBack();
            return response()->json([
                'info'=>0
            ]);
        }
    }

    public function __VerAdjuntosTareas(Request $request){
        $Adj = DB::SELECT("SELECT 
        Id, Archivo, Ruta 
        FROM adjuntostareas 
        WHERE Tareas_Id = ".$request->input('Hash'));
        return response()->json([
            'info'=>1,
            'Adj' => $Adj
        ]);
    }

    public function __AddNuevaTreaOt_(Request $request){

        $NumTarea = DB::SELECT("SELECT count(1) as Num 
        FROM Tareas WHERE IdProyecto = ".$request->input('Ot'));

        $Num = 0;
        foreach( $NumTarea as $n ){
            $Num = $n->Num;
        }

        DB::beginTransaction();
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $IdTarea = DB::table('tareas')
            ->insertGetId([
                    'IdProyecto' => $request->input('Ot'),
                    'IdEstado' => 1,
                    'IdTipoTarea' => 1000005,
                    'FechaHoraCreacion' => date("Y-m-d h:i:s"),
                    'Numeracion' => ($Num + 1),
                    'IdUsuario' => $Usuario->IdUsuario,
            ]);

            DB::commit();
            return response()->json([
                'info'=>1,
                'IdTarea' => $IdTarea
            ]);

        } catch (\PDOException $exception) {
            error_log("Documento proyecto: " . $exception->getMessage());
            throw new \PDOException("Documento proyecto: " . $exception->getMessage());
            DB::rollBack();
            return response()->json([
                'info'=>0
            ]);
        }
        
    }

    public function __SaveTareaOtProyecto_(Request $request){

        DB::beginTransaction();
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            for( $t = 1; $t <= $request->input('NumTareas'); $t++ ){
                DB::table('Tareas')
                ->where('Id', $request->input('IdTarea'.$t))
                ->update([
                    'Asunto' => $request->input('Asunto'.$t),
                    'Descripcion' => $request->input('Descrip'.$t),
                    'FechaEntrega' => $request->input('FEntrega'.$t),
                    'NroEntregables' => $request->input('NumEntregables'.$t),
                ]);

                if( ! empty( $request->input('Status'.$t) ) ){
                    $IdTarea = DB::table('status_tareas')
                    ->insertGetId([
                            'IdTarea' => $request->input('IdTarea'.$t),
                            'Fecha' => date("Y-m-d h:i:s"),
                            'StatusTarea' => $request->input('Status'.$t),
                            'IdUsuario' => $Usuario->IdUsuario,
                            'NroEntregables' => $request->input('NumEntregables'.$t)
                    ]);
                }
            }
            

            DB::commit();
            return response()->json([
                'info'=>1,
            ]);

        } catch (\PDOException $exception) {
            error_log("Documento proyecto: " . $exception->getMessage());
            throw new \PDOException("Documento proyecto: " . $exception->getMessage());
            DB::rollBack();
            return response()->json([
                'info'=>0
            ]);
        }
    }


    public function __GuardarAdjuntosTareas(Request $request){
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|int',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            $CData = \GuzzleHttp\json_decode($request->input('Cdata'));
            if( count($CData) > 0 ){
                DB::beginTransaction();
                
                if(!empty($credentials['parAdjuntos'])){
                    foreach ($credentials['parAdjuntos'] as $file) {
                        $nameFile = time().'-'.$file->getClientOriginalName();
                        $Carpeta = date("Y")."".date("m")."".date("d");
                        if(!Storage::exists('trafico/'.$Carpeta)){
                            Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                        }
                        $file->storeAs('trafico/Tareas/'.$Carpeta, $nameFile);
                        $IdAdjunto = DB::table('adjuntostareas')
                        ->insertGetId([
                            'Archivo' => $nameFile,
                            'Ruta' => $Carpeta,
                            'Tareas_Id' => $idTarea
                        ]);
                        array_push($ids, $IdAdjunto);
                    }
                }
                
                DB::commit();
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
    
    public function __GuardarStatusTareaLast(Request $request){
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|int',
                'Status' => 'nullable|string',
            ]);
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Mensaje = 0;
            
                DB::beginTransaction();
                
                $IdAdjunto = DB::table('status_tareas')
                ->insertGetId([
                    'StatusTarea' => $request['Status'],
                    'NroEntregables' => $request['NroEntregables'],
                    'IdTarea' => $request['Hash'],
                    'IdUsuario' => $Usuario->IdUsuario
                ]);

                $CData = \GuzzleHttp\json_decode($request->input('Cdata'));
                if( count($CData) > 0 ){
                    if(!empty($credentials['parAdjuntos'])){
                        foreach ($credentials['parAdjuntos'] as $file) {
                            $nameFile = time().'-'.$file->getClientOriginalName();
                            $Carpeta = date("Y")."".date("m")."".date("d");
                            if(!Storage::exists('trafico/'.$Carpeta)){
                                Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                            }
                            $file->storeAs('trafico/Tareas/'.$Carpeta, $nameFile);
                            $IdAdjunto = DB::table('adjuntostareas')
                            ->insertGetId([
                                'Archivo' => $nameFile,
                                'Ruta' => $Carpeta,
                                'Tareas_Id' => $idTarea
                            ]);
                            array_push($ids, $IdAdjunto);
                        }
                    }
                }
                
                DB::commit();
            
            $data = [
                'mensaje' => 'El status se ha guardado correctamente',
                //'Mail' => $Mensaje,
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

    public function __AsignadosTareasTraficos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
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
                    $id = DB::table('equipotarea')
                    ->insertGetId([
                        'IdUsuario' => parent::CodeDescrypt($CData[$i]['IdU']),
                        'Tipo' =>'ASIG',
                        'Tareas_Id' => $credentials['Hash'],
                    ]);
                    /*$InfoTarea = DB::SELECT("SELECT at.NombreTarea,at.Tarea, at.IdUsuario, u.NombreUsuario, u.Correo "
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
                        if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                                $Mensaje = 1;
                            }else{
                                $Mensaje = 0;
                            }
                        $data = [
                            'success' => true,
                            'mensaje' => 'La tarea ha sido generada de manera correcta'
                        ];
                    }*/
                    
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

    public function __StatusTareaLast(Request $request){
        $Status = DB::SELECT("
            SELECT StatusTarea, NroEntregables, DATE_FORMAT(Fecha,'%Y-%m-%d') as FechaR 
            FROM status_tareas WHERE Id = (
            SELECT MAX(Id) as Id
            FROM status_tareas 
            WHERE IdTarea = ".$request['Hash']." 
            GROUP BY IdTarea)");
        return response()->json([
            'info'=>1,
            'Status'=> $Status
        ]);
    }
}
