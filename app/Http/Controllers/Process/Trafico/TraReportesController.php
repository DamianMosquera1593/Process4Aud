<?php

namespace App\Http\Controllers\Process\Trafico;

use App\Http\Controllers\Controller;
use App\Exports\trafico\ClientesOT;
use App\Exports\trafico\ClientesTarea;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TraReportesController extends Controller
{
    //4828a527766d17057834147156e99fd7
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ) {
            return view('process.trafico.tra_reportes');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //bc8bb43747f8396dbe7a4f797d76d3c4
    public function filtrosProyecto(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'nullable|string'
            ]);

            $data = null;

            if (is_null($credentials['HashEmpresa'])) {
                $data = $this->filtrosInicialesOT();
            } else {
                $idEmpresa = parent::CodeDescrypt(intval($credentials['HashEmpresa']));
                $data = [
                    'Unidades' => $this->filtrosUnidadNegocioOT($idEmpresa),
                    'Clientes' => $this->filtrosClienteOT($idEmpresa),
                    'success' => true
                ];
            }

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

    private function filtrosInicialesOT()
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $empresas = DB::SELECT("SELECT concat(e.NombreComercial) as Nombre,e.IdEmpresa AS Hash,e.Nit,e.NombreLegal,e.NombreComercial 
            FROM EMPRESA e 
            INNER JOIN par_usuarioempresa pue ON e.IdEmpresa = pue.IdEmpresa AND e.Estado = 1 and pue.IdUsuario = ".$Usuario->IdUsuario);
            foreach ($empresas as $empresa) {
                $empresa->Hash = parent::CodeEncrypt($empresa->Hash);
            }

            $estados = DB::table('par_estado_proyecto')->select('Id AS Hash', 'Estado')->get();
            foreach ($estados as $e) {
                $e->Hash = parent::CodeEncrypt($e->Hash);
            }

            $years = DB::table('proyectos')->selectRaw('YEAR(Fecha) AS Fecha')->distinct()->get();

            $data = [
                'empresas' => $empresas,
                'estados' => $estados,
                'years' => $years,
                'success' => true
            ];

            return $data;

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

    private function filtrosUnidadNegocioOT(int $idEmpresa)
    {
        try {

            $unidadesUsuario = DB::table('unidad_negocio AS un')
            ->join('par_usuariounidad AS pun', 'un.IdUnidad', '=', 'pun.IdUnidad')
            ->where(['un.IdEmpresa'=>$idEmpresa, 'un.Estado'=>1])
            ->select('un.IdUnidad','un.Nombre')
            ->orderBy('un.Nombre','asc')
            ->distinct()
            ->get();


            foreach ($unidadesUsuario as $unidad) {
                $unidad->IdUnidad = parent::CodeEncrypt($unidad->IdUnidad);
                $unidad->Hash = $unidad->IdUnidad;
            }

            return $unidadesUsuario;

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

    private function filtrosClienteOT(int $idEmpresa)
    {

        try {
            $clientes = DB::table('cliente AS c')
                ->join('asoc_empresa_cliente AS aec', 'c.IdCliente', '=', 'aec.IdCliente')
                ->where('aec.IdEmpresa', $idEmpresa)
                ->where('c.Estado', 1)
                ->select('c.IdCliente', 'c.NombreComercial', 'c.Nit')
                    ->orderBy('c.NombreComercial','asc')
                    ->distinct()
                ->get();

            foreach ($clientes as $cliente) {
                $cliente->IdCliente = parent::CodeEncrypt($cliente->IdCliente);
                $cliente->Hash = $cliente->IdCliente;
            }

            return $clientes;
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

    //2ab09a7a592d3cda9eadb46cbcf7dca6
    public function filtrosTarea(Request $request)
    {
        try {
            $departamentos = DB::table('par_departamento_trafico AS pdt')
            ->join('asoc_usuario_departamento as aud', 'pdt.Id', '=', 'aud.IdDepto')
            ->where('pdt.Estado', 1)
            ->select('pdt.Id AS Hash', 'pdt.Nombre')
                    ->orderBy('pdt.Nombre','asc')
            ->distinct()
            ->get();

            foreach ($departamentos as $e) {
                $e->Hash = parent::CodeEncrypt($e->Hash);
            }

            $tipoTarea = DB::table('partipotarea AS ptt')
            ->where('ptt.Estado', 1)
            ->select('ptt.Id AS Hash', 'ptt.Nombre')
            ->get();

            foreach ($tipoTarea as $e) {
                $e->Hash = parent::CodeEncrypt($e->Hash);
            }

            $estados = DB::table('scrum_estados')
            ->where('Estado', 1)
            ->select('Id AS Hash', 'Nombre')
            ->get();

            foreach ($estados as $e) {
                $e->Hash = parent::CodeEncrypt($e->Hash);
            }

            $data = [
                'departamentos' => $departamentos,
                'tipoTarea' => $tipoTarea,
                'estados' => $estados,
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

    //88459cc62d1e889962f9dd4e4e6e3b67
    public function listaProyectosOT(Request $request)
    {

        $credentials = $this->validate($request, [
            'search.HashEmpresa' => 'nullable|int',
            'search.HashUnidad' => 'nullable|int',
            'search.HashCliente' => 'nullable|int',
            'search.HashEstado' => 'nullable|int',
            'search.FInicio' => 'nullable|date',
            'search.FFin' => 'nullable|date',
            
        ]);
        $filtroEmpresa = $credentials['search']['HashEmpresa'];
        $filtroUnidad = $credentials['search']['HashUnidad'];
        $filtroCliente = $credentials['search']['HashCliente'];
        $filtroEstado = $credentials['search']['HashEstado'];
        $filtroFInicio = $credentials['search']['FInicio'];
        $filtroFFin = $credentials['search']['FFin'];
        $filtroAND = false;

        $sqlAdicional = '';
        if (!is_null($filtroEmpresa) || !is_null($filtroYear) || !is_null($filtroEstado)) {
            $sqlAdicional = ' WHERE ';
            if (!is_null($filtroEmpresa)) {
                $sqlAdicional .= ' p.IdEmpresa = '.parent::CodeDescrypt(intval($filtroEmpresa)).' ';
                $filtroAND = true;
                if (!is_null($filtroUnidad)) {
                    $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdUnidad = '.parent::CodeDescrypt(intval($filtroUnidad)).' ';
                    $filtroAND = true;
                }
                if (!is_null($filtroCliente)) {
                    $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdCliente = '.parent::CodeDescrypt(intval($filtroCliente)).' ';
                    $filtroAND = true;
                }
            }
            if (!is_null($filtroEstado)) {
                $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdEstado = '.parent::CodeDescrypt(intval($filtroEstado)).' ';
                $filtroAND = true;
            }
            if (!is_null($filtroFFin) && !is_null($filtroFInicio) ) {
                $sqlAdicional .= ($filtroAND ? "AND":"")." DATE_FORMAT(p.Fecha,'%Y-%m-%d') BETWEEN '".$filtroFInicio."' AND '".$filtroFFin."' ";
            }
        }

        $sqlFrom = "FROM `proyectos` AS P "
        ."JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa "
        ."JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad "
        ."JOIN cliente AS c ON p.IdCliente = c.IdCliente "
        ."JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario "
        ."JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario "
        ."JOIN par_estado_proyecto AS pep ON p.IdEstado = pep.Id "
        .$sqlAdicional;

        $sqlCampos = " p.Id, p.Codigo, p.Referencia, e.NombreComercial AS Empresa, un.Nombre AS Unidad, c.NombreComercial AS Cliente,  ejc.NombreUsuario AS Ejecutivo, dir.NombreUsuario AS Director, pep.Estado ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (Empresa like '%".$searchValue."%' or Cliente like '%".$searchValue."%' or Producto like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Codigo"=>$row->Codigo,
            "Referencia"=>$row->Referencia,
            "Empresa"=>$row->Empresa,
            "Unidad"=>$row->Unidad,
            "Cliente"=>$row->Cliente,
            "Ejecutivo"=>$row->Ejecutivo,
            "Director"=>$row->Director,
            "Estado"=>$row->Estado
            );
            $i++;
        }

        $response = array(
            "draw" => intval($Records['draw']),
            "iTotalRecords" => $Records['totalRecords'],
            "iTotalDisplayRecords" => $Records['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }

    //4c66056c168a71bd8abdd171c7c10e17
    public function listaTareas(Request $request)
    {

        $credentials = $this->validate($request, [
            'search.HashEmpresa' => 'nullable|int',
            'search.HashUnidad' => 'nullable|int',
            'search.HashCliente' => 'nullable|int',
            'search.HashEstado' => 'nullable|int',
            'search.FInicio' => 'nullable|date',
            'search.FFin' => 'nullable|date',
            
        ]);
        $filtroEmpresa = $credentials['search']['HashEmpresa'];
        $filtroUnidad = $credentials['search']['HashUnidad'];
        $filtroCliente = $credentials['search']['HashCliente'];
        $filtroEstado = $credentials['search']['HashEstado'];
        $filtroFInicio = $credentials['search']['FInicio'];
        $filtroFFin = $credentials['search']['FFin'];
        $filtroAND = false;

        $sqlAdicional = '';
        if (!is_null($filtroEmpresa) || !is_null($filtroYear) || !is_null($filtroEstado)) {
            $sqlAdicional = ' WHERE ';
            if (!is_null($filtroEmpresa)) {
                $sqlAdicional .= ' p.IdEmpresa = '.parent::CodeDescrypt(intval($filtroEmpresa)).' ';
                $filtroAND = true;
                if (!is_null($filtroUnidad)) {
                    $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdUnidad = '.parent::CodeDescrypt(intval($filtroUnidad)).' ';
                    $filtroAND = true;
                }
                if (!is_null($filtroCliente)) {
                    $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdCliente = '.parent::CodeDescrypt(intval($filtroCliente)).' ';
                    $filtroAND = true;
                }
            }
            if (!is_null($filtroEstado)) {
                $sqlAdicional .= ($filtroAND ? 'AND':'').' p.IdEstado = '.parent::CodeDescrypt(intval($filtroEstado)).' ';
                $filtroAND = true;
            }
            if (!is_null($filtroFFin) && !is_null($filtroFInicio) ) {
                $sqlAdicional .= ($filtroAND ? "AND":"")." DATE_FORMAT(FechaHoraCreacion,'%Y-%m-%d') BETWEEN '".$filtroFInicio."' AND '".$filtroFFin."' ";
            }
        }
        $sqlFrom = "FROM ( "
            ."SELECT t.Id, t.Asunto, t.Descripcion, t.FechaEntrega, t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, "
                . "t.IdDepartamento, t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, CONVERT(t.Numeracion, CHAR) AS Numeracion, "
                . "NULL AS IdTareaPadre "
                . "FROM tareas t "
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id ".$sqlAdicional." "
            ."UNION ALL "
            ."SELECT s.Id, s.Asunto, s.Descripcion, s.FechaEntrega, s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, s.IdUsuario, s.IdDepartamento, "
                . "s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre "
                . "FROM subtareas s "
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id ".$sqlAdicional." "
                . ") AS a "
            //."JOIN proyectos AS p ON a.IdProyecto = p.Id "
            ."JOIN scrum_estados AS se ON a.IdEstado = se.Id "
            ."JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id "
            ."JOIN usuario AS xx ON a.IdUsuario = xx.IdUsuario "
            ."JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id "
            ."JOIN `proyectos` AS P on a.IdProyecto = p.Id "
            ."JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa "
            ."JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad "
            ."JOIN cliente AS c ON p.IdCliente = c.IdCliente "
            ."JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario "
            ."JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario "
            ."JOIN par_estado_proyecto AS pep ON p.IdEstado = pep.Id "
            .$sqlAdicional;

        $sqlCampos = " p.Id as IdProyecto, p.Codigo, p.Referencia, e.NombreComercial AS Empresa, un.Nombre AS Unidad, c.NombreComercial AS Cliente,  ejc.NombreUsuario AS Ejecutivo, dir.NombreUsuario AS Director, "
                . "pep.Estado as Estadoproyecto,"
        . "a.Id, a.Asunto, DATE(a.FechaHoraCreacion) AS FechaCreacion, "
        ."TIME(a.FechaHoraCreacion) AS HoraCreacion, "
        ."DATE(a.FechaEntrega) AS FechaEntrega, "
        ."TIME(a.FechaEntrega) AS HoraEntrega, a.NroEntregables, "
        ."DATE(a.FechaHoraRespuesta) AS FechaRespuesta, "
        ."TIME(a.FechaHoraRespuesta) AS HoraRespuesta, "
        ."pdt.Nombre AS Departamento, xx.NombreUsuario AS Creador, "
        ."ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo AS CodigoProyecto, "
        ."a.Numeracion, "
        ."a.IdTareaPadre, "
        ."(CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (Empresa like '%".$searchValue."%' or Cliente like '%".$searchValue."%' or Producto like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom, $sqlCampos ,$searchQuery,$searchValue);

        // $Numeracion = 1;
        $data = array();
        foreach($Records['empRecords'] as $row){
            $data[] = array(
            "Numeracion"=>$row->Numeracion,
            //"Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Codigo"=>$row->Codigo,
            "Referencia"=>$row->Referencia,
            "Empresa"=>$row->Empresa,
            "Unidad"=>$row->Unidad,
            "Cliente"=>$row->Cliente,
            "Ejecutivo"=>$row->Ejecutivo,
            "Director"=>$row->Director,
            "Estadoproyecto"=>$row->Estadoproyecto,
            'CodigoProyecto' => $row->CodigoProyecto,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Asunto"=>$row->Asunto,
            "FechaCreacion"=>$row->FechaCreacion,
            "NroEntregables"=>$row->NroEntregables,
            "HoraCreacion"=>$row->HoraCreacion,
            "FechaEntrega"=>$row->FechaEntrega,
            "HoraEntrega"=>$row->HoraEntrega,
            "FechaRespuesta"=>$row->FechaRespuesta,
            "HoraRespuesta"=>$row->HoraRespuesta,
            "Departamento"=>$row->Departamento,
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

    //3af81c5b2b88a0232e0552447e4ecb4e
    public function reporteOTs(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'nullable|string',
                'HashUnidad' => 'nullable|string',
                'HashCliente' => 'nullable|string',
                'HashEstado' => 'nullable|string',
                'FFin' => 'nullable|date',
                'FInicio' => 'nullable|date',
                'type' => 'required|string'
            ]);

            $idEmpresa = null;
            $idUnidad = null;
            $idCliente = null;
            $idEstado = null;
            $type = $credentials['type'];

            if (!is_null($credentials['HashEmpresa'])) {
                $idEmpresa = parent::CodeDescrypt(intval($credentials['HashEmpresa']));
            }
            if (!is_null($credentials['HashUnidad'])) {
                $idUnidad = parent::CodeDescrypt(intval($credentials['HashUnidad']));
            }
            if (!is_null($credentials['HashCliente'])) {
                $idCliente = parent::CodeDescrypt(intval($credentials['HashCliente']));
            }
            if (!is_null($credentials['HashEstado'])) {
                $idEstado = parent::CodeDescrypt(intval($credentials['HashEstado']));
            }

            switch ($type) {
                case 'excel':
                    return (new ClientesOT($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Reporte Ots '.date("Y-m-d H:i:s").'.xlsx');
                    break;
                case 'pdf':
                    return (new ClientesOT($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Reporte Ots '.date("Y-m-d H:i:s").'.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
                    break;
                default:
                    return (new ClientesOT($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Reporte Ots '.date("Y-m-d H:i:s").'.xlsx');
                    break;
            }
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            dd($data);
            return response()->json($data, 500);
        }

    }

    //6962eb20c048cf606d512d717748c268
    public function reporteTareas(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'nullable|string',
                'HashUnidad' => 'nullable|string',
                'HashCliente' => 'nullable|string',
                'HashEstado' => 'nullable|string',
                'FFin' => 'nullable|date',
                'FInicio' => 'nullable|date',
                'type' => 'required|string'
            ]);

            $idEmpresa = null;
            $idUnidad = null;
            $idCliente = null;
            $idEstado = null;
            $type = $credentials['type'];

            if (!is_null($credentials['HashEmpresa'])) {
                $idEmpresa = parent::CodeDescrypt(intval($credentials['HashEmpresa']));
            }
            if (!is_null($credentials['HashUnidad'])) {
                $idUnidad = parent::CodeDescrypt(intval($credentials['HashUnidad']));
            }
            if (!is_null($credentials['HashCliente'])) {
                $idCliente = parent::CodeDescrypt(intval($credentials['HashCliente']));
            }
            if (!is_null($credentials['HashEstado'])) {
                $idEstado = parent::CodeDescrypt(intval($credentials['HashEstado']));
            }

            switch ($type) {
                case 'excel':
                    return (new ClientesTarea($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Listado Tareas.xlsx');
                    break;
                case 'pdf':
                    return (new ClientesTarea($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Listado Tareas.xlsx', \Maatwebsite\Excel\Excel::DOMPDF);
                    break;
                default:
                    return (new ClientesTarea($idEmpresa, $idUnidad, $idCliente, $credentials['FInicio'],$credentials['FFin'], $idEstado))->download('Listado Tareas.xlsx');
                    break;
            }
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            dd($data);
            return response()->json($data, 500);
        }
    }
    
    //e300a06f5eb910c7b77eff69eff05869
    public function TRA_ReporteParam_ListOTS(Request $request){
        $credentials = $this->validate($request, [
            'idEmpresa' => 'nullable|string',
            'idUnidad' => 'nullable|string',
            'idCliente' => 'nullable|string',
            'idEstado' => 'nullable|string',
            'nameEmpresa' => 'required|string',
            'nameUnidad' => 'required|string',
            'nameCliente' => 'required|string',
            'nameEstado' => 'required|string',
            'FInicio' => 'nullable|date',
            'FFin' => 'nullable|date',
            'type' => 'required|string'
        ]);
        
        $idEmpresa = null;
        $idUnidad = null;
        $idCliente = null;
        $idEstado = null;
        $type = $credentials['type'];

        if (!is_null($credentials['idEmpresa'])) {
            $idEmpresa = parent::CodeDescrypt(intval($credentials['idEmpresa']));
        }
        if (!is_null($credentials['idUnidad'])) {
            $idUnidad = parent::CodeDescrypt(intval($credentials['idUnidad']));
        }
        if (!is_null($credentials['idCliente'])) {
            $idCliente = parent::CodeDescrypt(intval($credentials['idCliente']));
        }
        if (!is_null($credentials['idEstado'])) {
            $idEstado = parent::CodeDescrypt(intval($credentials['idEstado']));
        }
        session()->forget('TRA_ReportParam_ListOT');
        session(['TRA_ReportParam_ListOT' =>  [
            'idEmpresa' => $idEmpresa,
            'idUnidad' => $idUnidad,
            'idCliente' => $idCliente,
            'idEstado' => $idEstado,
            'nameEmpresa' => $credentials['nameEmpresa'],
            'nameUnidad' => $credentials['nameUnidad'],
            'nameCliente' => $credentials['nameCliente'],
            'nameEstado' => $credentials['nameEstado'],
            'FInicio' => $credentials['FInicio'],
            'FFin' => $credentials['FFin'],
            'type' => $credentials['type'],
        ] ]);
        
        $data = [
            'success' => true
        ];

        return response()->json($data, 200);
        
    }
    
    //43c18fe6637765803dd40298d7bf50e4
    public function ListarDepartamentosCargaLaboral(){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $Data = DB::SELECT("SELECT "
                . "d.Id as Hash, "
                . "d.Nombre as Departamento "
                . "FROM par_departamento_trafico d "
                . "INNER JOIN par_deptocargalaboral pd ON d.Id = pd.IdDepartamento AND d.Estado = 1 "
                . "WHERE pd.IdUsuario = ".$Usuario->IdUsuario." order by d.Nombre asc");
        
        foreach($Data as $c) {
            $c->Hash = parent::CodeEncrypt($c->Hash);
        }
        
        $data = [
            'success' => true,
            'Departamentos' => $Data
        ];

        return response()->json($data, 200);
    }
    
    
    //7901af9df2cf70be0ee8311e77e91860
    public function DataCargaLaboralDepartamento(Request $request){
        $credentials = $this->validate($request, [
            'HashDepto' => 'required|int',
        ]);
        
        $IdDepartamento = parent::CodeDescrypt($credentials['HashDepto']);
        
        $Data = DB::SELECT("SELECT DISTINCT "
                . "c.IdCliente as HashCliente,"
                . "c.NombreComercial as Cliente "
                . "FROM Cliente c "
                . "INNER JOIN Proyectos p on p.IdCliente = c.IdCliente AND p.IdEstado = 1 "
                . "INNER JOIN "
                . "(SELECT IdProyecto FROM Tareas "
                . "WHERE IdEstado = 1 AND IdDepartamento = $IdDepartamento  "
                //. " and (FechaHoraCreacion BETWEEN '".$credentials['FInicio']." 00:00:00' AND '".$credentials['FFin']." 23:59:59' )"
                . "UNION ALL "
                . "SELECT IdProyecto FROM Subtareas "
                . "WHERE IdEstado = 1 AND IdDepartamento = $IdDepartamento  "
                //. " and (FechaHoraCreacion BETWEEN '".$credentials['FInicio']." 00:00:00' AND '".$credentials['FFin']." 23:59:59') "
                . ") as Ta on p.Id = Ta.IdProyecto ");
        
        $UsuariosDepartamento = DB::SELECT("SELECT DISTINCT "
                . "IdUsuario, NombreUsuario FROM (SELECT "
                . "u.IdUsuario, u.NombreUsuario "
                . "FROM asoc_usuario_departamento Ax "
                . "INNER JOIN usuario u on Ax.IdUsuario = u.IdUsuario and u.Estado = 1 "
                . "WHERE Ax.IdDepto = $IdDepartamento "
                /*. "UNION ALL "
                . "SELECT u.IdUsuario, u.NombreUsuario "
                . "FROM par_responsable_depto p "
                . "INNER JOIN Usuario u on p.IdUsUario = u.IdUsuario "
                . "AND p.IdDepto = $IdDepartamento "*/
                . ") as TempUsers Order by NombreUsuario");
        
        foreach($UsuariosDepartamento as $c) {
            $ClientesData = [];
            $x = 0;
            foreach($Data as $cc) {
                $ClientesData[$x]['Hash'] = parent::CodeEncrypt($cc->HashCliente);
                
                $Tipo = "ASIG";
                //--------------------Atrasado----------------------------------
                $Fecha = date("Y-m-d");
                $clientes = DB::SELECT("SELECT "
                    . " t.IdProyecto "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') < '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . "UNION ALL "
                    . "SELECT  s.IdProyecto "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  < '$Fecha' "
                    . "and et.Tipo = '$Tipo'  "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    );
                $Entragables = DB::SELECT("SELECT SUM(NroEntregables) AS Num "
                    . "FROM (SELECT "
                    . " t.NroEntregables "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  < '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    
                    . "UNION ALL "
                    . "SELECT s.NroEntregables "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  < '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . ") as TempEntragables "
                    );
                if( count( $clientes ) == 0 ){
                   $ClientesData[$x]['Asig_Ant'] = 0;
                }else{
                    $ClientesData[$x]['Asig_Ant'] = COUNT($clientes);
                    
                }
                if( count( $Entragables ) == 0 || $Entragables[0]->Num == null){
                   $ClientesData[$x]['AsigEnt_Ant'] = 0;
                }else{
                    $ClientesData[$x]['AsigEnt_Ant'] = $Entragables[0]->Num;
                }
                //--------------------Atrasado----------------------------------
                
                
                //----------------------Hoy-------------------------------------
                $Fecha = date("Y-m-d");
                $clientes = DB::SELECT("SELECT "
                    . " t.IdProyecto "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . "UNION ALL "
                    . "SELECT  s.IdProyecto "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  = '$Fecha' "
                    . "and et.Tipo = '$Tipo'  "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    );
                $Entragables = DB::SELECT("SELECT SUM(NroEntregables) AS Num "
                    . "FROM (SELECT "
                    . " t.NroEntregables "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  = '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    
                    . "UNION ALL "
                    . "SELECT s.NroEntregables "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  = '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . ") as TempEntragables "
                    );
                if( count( $clientes ) == 0 ){
                   $ClientesData[$x]['Asig_Hoy'] = 0;
                }else{
                    $ClientesData[$x]['Asig_Hoy'] = count($clientes);
                }
                if( count( $Entragables ) == 0 || $Entragables[0]->Num == null){
                   $ClientesData[$x]['AsigEnt_Hoy'] = 0;
                }else{
                    $ClientesData[$x]['AsigEnt_Hoy'] = $Entragables[0]->Num;
                }
                
                //----------------------Hoy-------------------------------------
                
                //--------------------A Futuro----------------------------------
                $Fecha = date("Y-m-d");
                $clientes = DB::SELECT("SELECT "
                    . " t.IdProyecto "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') > '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . "UNION ALL "
                    . "SELECT  s.IdProyecto "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') > '$Fecha' "
                    . "and et.Tipo = '$Tipo'  "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    );
                $Entragables = DB::SELECT("SELECT SUM(NroEntregables) AS Num "
                    . "FROM (SELECT "
                    . " t.NroEntregables "
                    . "FROM "
                    . "equipotarea et "
                    . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (t.IdEstado = 1) "
                    . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  > '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    
                    . "UNION ALL "
                    . "SELECT s.NroEntregables "
                    . "FROM equipotarea et "
                    . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "WHERE et.IdUsuario = ".$c->IdUsuario." "
                    . "AND p.IdCliente = ".$cc->HashCliente." AND p.IdEstado = 1 "
                    . "AND (s.IdEstado = 1) "
                    . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  > '$Fecha' "
                    . "and et.Tipo = '$Tipo' "
                    . ") as TempEntragables "
                    );
                if( count( $clientes ) == 0 ){
                   $ClientesData[$x]['Asig_Fut'] = 0;
                }else{
                    $ClientesData[$x]['Asig_Fut'] = count($clientes);
                }
                if( count( $Entragables ) == 0 || $Entragables[0]->Num == null){
                   $ClientesData[$x]['AsigEnt_Fut'] = 0;
                }else{
                    $ClientesData[$x]['AsigEnt_Fut'] = $Entragables[0]->Num;
                }
                //--------------------A Futuro----------------------------------
                
                
                $x++;
            }
            $c->Clientes = $ClientesData;
            //$c->HashCliente = parent::CodeEncrypt($c->HashCliente);
        }
        
        foreach($UsuariosDepartamento as $c) {
            $c->IdUsuario = parent::CodeEncrypt($c->IdUsuario);
        }
        foreach($Data as $c) {
            $c->HashCliente = parent::CodeEncrypt($c->HashCliente);
        }
        
        $data = [
            'success' => true,
            'Clientes' => $Data,
            'Usuarios' => $UsuariosDepartamento,
            'Fecha' => date("Y-m-d")
        ];

        return response()->json($data, 200);
        
    }
    
    //0e1b513d8892d021763a850783e14916x
    public function traReportesClientesFromProyectos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUser' => 'required|int',
                'HashCliente' => 'required|int',
                'Factor' => 'required|int',
            ]);
            $sqlFechaT = "";
            $sqlFechaS = "";
            if( $credentials['Factor'] == 0 ){
                $sqlFechaT = "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') < '".date("Y-m-d")."' ";
                $sqlFechaS = "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') < '".date("Y-m-d")."' ";
            }else if( $credentials['Factor'] == 1 ){
                $sqlFechaT = "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' ";
                $sqlFechaS = "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' ";
            }else if( $credentials['Factor'] == 2 ){
                $sqlFechaT = "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') > '".date("Y-m-d")."' ";
                $sqlFechaS = "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') > '".date("Y-m-d")."' ";
            }
            $Usuario = parent::CodeDescrypt($credentials['HashUser']);
            
            $IdCliente = parent::CodeDescrypt($credentials['HashCliente']);
            
            $clientes = DB::SELECT("SELECT DISTINCT "
                    . "c.IdCliente as Hash, c.NombreComercial "
                    . "FROM Cliente c "
                    . "INNER JOIN proyectos p on p.IdCliente = c.IdCliente "
                    . "WHERE p.IdCliente = $IdCliente AND "
                    . " p.Id in (SELECT "
                    . " t.IdProyecto "
                    . "FROM "
                    . "tareas t "
                    . "WHERE t.IdUsuario = ".$Usuario." "
                    .$sqlFechaT
                    . "UNION ALL "
                    . "SELECT  s.IdProyecto "
                    . "FROM subtareas s  "
                    . "WHERE s.IdUsuario = ".$Usuario." "
                    .$sqlFechaS
                    . ") "
                    . " ORDER BY c.NombreComercial Asc"
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
    
    //54351b7558b6f67f068ccd2205ac32f0x
    public function traSegmentacionPendientes(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'search.parCliente' => 'required|string',
                'search.parUsuario' => 'required|int',
                'search.parFactor' => 'required|int',
                'search.value' => 'nullable|string'
            ]);
            
            $sqlFechaT = "";
            $sqlFechaS = "";
            if( $credentials['search']['parFactor'] == 0 ){
                $sqlFechaT = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') < '".date("Y-m-d")."' ";
                $sqlFechaS = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') < '".date("Y-m-d")."' ";
            }else if( $credentials['search']['parFactor'] == 1 ){
                $sqlFechaT = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' ";
                $sqlFechaS = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') = '".date("Y-m-d")."' ";
            }else if( $credentials['search']['parFactor'] == 2 ){
                $sqlFechaT = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') > '".date("Y-m-d")."' ";
                $sqlFechaS = " DATE_FORMAT(FechaEntrega,'%Y-%m-%d') > '".date("Y-m-d")."' ";
            }
            
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
            $Usuario = parent::CodeDescrypt($credentials['search']['parUsuario']);

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
                SELECT Id, Id AS IdTarea, NULL AS IdSubTarea, Asunto, Descripcion, FechaEntrega, NroEntregables, IdProyecto, 
                IdEstado, IdTipoTarea, IdUsuario, IdDepartamento, FechaHoraCreacion, FechaHoraRespuesta, IdUsuarioRespuesta, CONVERT(Numeracion, CHAR) AS Numeracion, 
                NULL AS IdTareaPadre FROM tareas WHERE '.$sqlFechaT.' 
                    UNION ALL
                SELECT Id, Null AS IdTarea, Id AS IdSubTarea, Asunto, Descripcion, FechaEntrega, NroEntregables, IdProyecto, 
                IdEstado, IdTipoTarea, IdUsuario, IdDepartamento, FechaHoraCreacion, FechaHoraRespuesta, IdUsuarioRespuesta, CONVERT(Numeracion, CHAR)AS Numeracion, 
                IdTareaPadre FROM subtareas WHERE '.$sqlFechaS.' 
            ) AS a
            JOIN proyectos AS p ON a.IdProyecto = p.Id
            JOIN scrum_estados AS se ON a.IdEstado = se.Id
            JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id
            JOIN usuario AS c ON a.IdUsuario = c.IdUsuario
            JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id
            LEFT JOIN equipotarea AS et ON et.Tareas_Id = a.IdTarea
            LEFT JOIN equipotarea AS ets ON ets.IdSubtarea = a.IdSubTarea
            WHERE (et.Tipo = "ASIG" OR ets.Tipo = "ASIG") AND p.IdCliente = ? AND se.Id = 1 AND (et.IdUsuario = ? OR ets.IdUsuario = ?) '.$sqlAdicional.'
            ORDER BY DATE(a.FechaEntrega) asc ';

            $tareas = DB::select($sql, [$idCliente, $Usuario, $Usuario]);

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
    
    //b5ee5d9f4234c819caeb03df9d3114cc
    public function TraReportDataInformeCuenta(Request $request){
        try {
            $credentials = $this->validate($request, [
                'idEmpresa' => 'required|int',
                'nameEmpresa' => 'required|string',
                'idCliente' => 'required|int',
                'nameCliente' => 'required|string',
                'FInicio' => 'required|date',
                'FFin' => 'required|date',
            ]);
            
            $DateI = explode("-",$credentials['FInicio']);
            $DateF = explode("-",$credentials['FFin']);
            
            $NMeses = [];
            for($i = 1; $i < 13; $i++){
                $NMeses[$i-1] = parent::NombreMeses($i);
            }
                    
            $sqlProyectos = DB::SELECT("SELECT DISTINCT "
                    . "Year(Fecha) as Anio "
                    . "FROM proyectos "
                    . "WHERE "
                    . "IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                    . "IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])." AND "
                    . "DATE_FORMAT(Fecha,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' "
                    . "ORDER BY Year(Fecha) Desc "
                    . "");
            
            foreach( $sqlProyectos as $Pro ){
                $DataProductos = DB::SELECT("SELECT DISTINCT "
                        . "p.IdProducto, pp.Nombre as NombreProducto "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on pp.Id = p.IdProducto "
                        . "WHERE "
                        . "p.IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                        . "p.IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])." Order by pp.Nombre "
                        //. "YEAR(p.Fecha) =  ".$Pro->Anio." "
                        );
                foreach( $DataProductos as $Productos ){
                    $Meses = [];
                    for($i = 1; $i < 13; $i++){
                        $DataProductosDetalle = DB::SELECT("SELECT p.Id, '".parent::NombreMeses($i)."' as NombreMes "
                        . " "
                        . "FROM Proyectos p "
                        . "WHERE "
                        . "p.IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                        . "p.IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])." AND "
                        . "YEAR(p.Fecha) =  ".$Pro->Anio." AND "
                        . "p.IdProducto = ".$Productos->IdProducto." AND "
                        . "MONTH(p.Fecha) = ".$i
                        );
                        $Meses[$i-1] = $DataProductosDetalle;
                    }
                    $Productos->Meses = $Meses;
                }
                $Pro->Productos = $DataProductos;
            }
            
            $sqlTareas = DB::SELECT("SELECT DISTINCT "
                    . "Year(FechaHoraCreacion) as Anio "
                    . "FROM "
                    . "("
                        . "SELECT t.IdProyecto, t.FechaHoraCreacion "
                        . "FROM Tareas t "
                        . "WHERE "
                        . "t.IdProyecto In ("
                            . "SELECT p.Id "
                            . "FROM Proyectos p "
                            . "WHERE "
                            . "p.IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                            . "p.IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])."  "
                            //. "AND DATE_FORMAT(p.Fecha,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' "
                        . ") AND "
                        . "DATE_FORMAT(t.FechaHoraCreacion,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' "
                    . ") as DataTareas "
                    . "ORDER BY Year(FechaHoraCreacion) Desc "
                    . "");
            foreach($sqlTareas as $Tarea){
                $DataTipoTarea = DB::SELECT("SELECT DISTINCT "
                        . "t.IdTipoTarea, pt.Nombre as TipoTarea "
                        . "FROM Tareas t "
                        . "INNER JOIN partipotarea pt on t.IdTipoTarea = pt.Id "
                        . "WHERE "
                        . "t.IdProyecto In ("
                            . "SELECT p.Id "
                            . "FROM Proyectos p "
                            . "WHERE "
                            . "p.IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                            . "p.IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])." "
                            //. " AND DATE_FORMAT(p.Fecha,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' "
                        . ") AND "
                        . "DATE_FORMAT(t.FechaHoraCreacion,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' ");
                
                foreach( $DataTipoTarea as $Tt ){
                    $Meses = [];
                    for($i = 1; $i < 13; $i++){
                        $DataTiposDetalle = DB::SELECT("SELECT t.Id, '".parent::NombreMeses($i)."' as NombreMes "
                        . " "
                        . "FROM Tareas t "
                        . "INNER JOIN partipotarea pt on t.IdTipoTarea = pt.Id "
                        . "WHERE pt.Id = ".$Tt->IdTipoTarea. " AND "
                        . "t.IdProyecto In ("
                            . "SELECT p.Id "
                            . "FROM Proyectos p "
                            . "WHERE "
                            . "p.IdEmpresa = ".parent::CodeDescrypt($credentials['idEmpresa'])." AND "
                            . "p.IdCliente = ".parent::CodeDescrypt($credentials['idCliente'])."  "
                            //. "AND DATE_FORMAT(p.Fecha,'%Y-%m-%d') BETWEEN '".$credentials['FInicio']."' AND '".$credentials['FFin']."' "
                        . ") AND "
                        . "Year(t.FechaHoraCreacion) = ".$Tarea->Anio." "
                        . "AND MONTH(t.FechaHoraCreacion) = ".$i);
                        $Meses[$i-1] = $DataTiposDetalle;
                    }
                    $Tt->Meses = $Meses;
                }
                $Tarea->Productos = $DataTipoTarea;
            }
            
            $response = array(
                "success" => true,
                "Proyectos" => $sqlProyectos,
                "Meses" => $NMeses,
                "Tareas" => $sqlTareas
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
    
    //b39e5b91733b7aaeef24379d85cc7840
    public function TRA_REPORT_DataUsers(Request $request){
        $Users = DB::SELECT("SELECT "
                . "IdUsuario, NombreUsuario "
                . "FROM usuario "
                . "WHERE Estado = ".$request->input("Hash")." "
                . "Order by NombreUsuario ASC");
        
        foreach($Users as $d){
            $d->IdUsuario =  parent::CodeEncrypt($d->IdUsuario);
        }
        
        $data = [
                'Users' => $Users,
                'success' => true
            ];

        return response()->json($data, 200);
    }
    
    
    //506d158fe0f6ca51eed93d801e4534e5
    public function TRA_Report_DataConsolidadoUsuario(Request $request){
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? "AND IdUnidad = IdUnidad ": "AND IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
        $Cliente = parent::CodeDescrypt($request->input('OTC_Cliente'));
        
        $ProyectosActivos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 1 "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosActivos ) == 0 ){
            $ProyectosActivos = 0;
        }else{
            $ProyectosActivos = count($ProyectosActivos );
        }
        $ProyectosCerrados = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 2 "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosCerrados ) == 0 ){
            $ProyectosCerrados = 0;
        }else{
            $ProyectosCerrados = count($ProyectosCerrados );
        }
        $ProyectosDetenidos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 3 "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosDetenidos ) == 0 ){
            $ProyectosDetenidos = 0;
        }else{
            $ProyectosDetenidos = count($ProyectosDetenidos );
        }
        
        $ProyectosEnCliente = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 4 "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosEnCliente ) == 0 ){
            $ProyectosEnCliente = 0;
        }else{
            $ProyectosEnCliente = count($ProyectosEnCliente );
        }
        
        $Proyectosx = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE "
                . "IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad);
        if( count($Proyectosx ) == 0 ){
            $Proyectosx = 0;
        }else{
            $Proyectosx = count($Proyectosx );
        }
         
        $ProyectosMes = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE "
                . "IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad." AND "
                . "MONTH(Fecha) = ".intval(date("m"))." AND "
                . "YEAR(Fecha) = ".date("Y")." "
                );
        if( count($ProyectosMes ) == 0 ){
            $ProyectosMes = 0;
        }else{
            $ProyectosMes = count($ProyectosMes );
        }
        
        $ProyectosSemana = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE "
                . "WEEK(Fecha) = ".intval(date("W"))." AND "
                . "YEAR(Fecha) = ".date("Y")." AND "
                . "IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad);
        if( count($ProyectosSemana ) == 0 ){
            $ProyectosSemana = 0;
        }else{
            $ProyectosSemana = count($ProyectosSemana );
        }
        
        $ProyectosAnterior = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE "
                . "WEEK(Fecha) = ".(intval(date("W"))-1)." AND "
                . "YEAR(Fecha) = ".date("Y")." AND "
                . "IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad);
        if( count($ProyectosAnterior ) == 0 ){
            $ProyectosAnterior = 0;
        }else{
            $ProyectosAnterior = count($ProyectosAnterior );
        }
        
        
        //TAREAS
        $TareasP = DB::SELECT("SELECT "
                . "t.Id "
                    . "FROM Tareas T "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                    . "WHERE t.IdEstado = 1 AND d.Estado = 1 "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                    . "UNION ALL "
                    . "SELECT s.Id "
                    . "FROM subtareas s "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                    . "WHERE s.IdEstado = 1 AND d.Estado = 1 "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                . "");
        if( count($TareasP ) == 0 ){
            $TareasP = 0;
        }else{
            $TareasP = count($TareasP );
        }
        
        //Solicitudes Cliente
        $SolicitudesCliente = DB::SELECT("SELECT "
                . "t.Id "
                    . "FROM Tareas T "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                    . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad = 2 "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                    . "UNION ALL "
                    . "SELECT s.Id "
                    . "FROM subtareas s "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                    . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad = 2 "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                . "");
        if( count($SolicitudesCliente ) == 0 ){
            $SolicitudesCliente = 0;
        }else{
            $SolicitudesCliente = count($SolicitudesCliente );
        }
        
        
        //Ajustes o Reprocesos
        $AjsRep = DB::SELECT("SELECT "
                . "t.Id "
                    . "FROM Tareas T "
                    . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                    . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad in (3,6) "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                    . "UNION ALL "
                    . "SELECT s.Id "
                    . "FROM subtareas s "
                    . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                    . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad in (3,6) "
                    . "AND p.IdEstado = 1 "
                    . "AND p.IdEmpresa = $Empresa "
                    . "AND p.IdCliente = $Cliente "
                    . $Unidad
                . "");
        if( count($AjsRep ) == 0 ){
            $AjsRep = 0;
        }else{
            $AjsRep = count($AjsRep );
        }
        
        
        
        //OTs por Clientes
        $OtsPorEjecutivo = DB::SELECT("SELECT "
                . "Distinct u.IdUsuario,u.NombreUsuario "
                . "FROM Proyectos p "
                . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                . "WHERE "
                . "IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . ""
                . " "
                . "ORDER BY u.NombreUsuario");
        
        foreach($OtsPorEjecutivo as $d){
            $Cantidad = 0;
            
            
            $ProyectosDetenidos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 3 AND IdEjecutivo = ".$d->IdUsuario." "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
            if( count($ProyectosDetenidos ) == 0 ){
                $ProyectosDetenidos = 0;
            }else{
                $ProyectosDetenidos = count($ProyectosDetenidos );
                //$Cantidad += ($ProyectosDetenidos );
            }
            
            $d->Detenidos = $ProyectosDetenidos;
            
            //Activos
            $Proyectos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 1 AND IdEjecutivo = ".$d->IdUsuario." "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
            if( count($Proyectos ) == 0 ){
                $Proyectos = 0;
            }else{
                $Proyectos = count($Proyectos );
                $Cantidad += ($Proyectos );
            }
            
            $d->Activos = $Proyectos;
            
            //Cerrados
            $Proyectos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 2 AND IdEjecutivo = ".$d->IdUsuario." "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
            if( count($Proyectos ) == 0 ){
                $Proyectos = 0;
            }else{
                $Proyectos = count($Proyectos );
                //$Cantidad += ($Proyectos );
            }
            
            $d->Cerrados = $Proyectos;
            
            //Pte Cliente
            $Proyectos = DB::SELECT("SELECT "
                . "Id "
                . "FROM Proyectos "
                . "WHERE IdEstado = 4 AND IdEjecutivo = ".$d->IdUsuario." "
                . "AND IdEmpresa = $Empresa "
                . "AND IdCliente = $Cliente "
                .$Unidad
                . "");
            if( count($Proyectos ) == 0 ){
                $Proyectos = 0;
            }else{
                $Proyectos = count($Proyectos );
                //$Cantidad += ($Proyectos );
            }
            
            $d->PteCliente = $Proyectos;
            $d->Cantidad = $Cantidad;
            
            //TAREAS
            $TareasP = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEjecutivo = ".$d->IdUsuario." "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 "
                        . "AND p.IdEstado = 1 "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente "
                        . $Unidad
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEjecutivo = ".$d->IdUsuario." "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 "
                        . "AND p.IdEstado = 1 "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente "
                        . $Unidad
                    . "");
            if( count($TareasP ) == 0 ){
                $TareasP = 0;
            }else{
                $TareasP = count($TareasP );
            }
            $d->TareasPendientes = $TareasP;
        }
        
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'ProyectosDetenidos' => $ProyectosDetenidos,
            'ProyectosEnCliente' => $ProyectosEnCliente,
            'ProyectosAnterior' => $ProyectosAnterior,
            'Colors' => $Colors,
            'Proyectos' => $Proyectosx,
            'ProyectosMes' => $ProyectosMes,
            'ProyectosSemana' => $ProyectosSemana,
            'OtsClientes' => $OtsPorEjecutivo,
            'SolicitudesCliente' => $SolicitudesCliente,
            'AjsRep' => $AjsRep,
            'TareasP' => $TareasP,
            'ProyectosCerrados' => $ProyectosCerrados,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //bbffe93eaa6aad67ce339893233243a8
    public function TRA_Report_DataCalendarioEntregas(Request $request){
        $credentials = $this->validate($request, [
            'OTC_Empresa' => 'nullable',
            'OTC_Unidad' => 'nullable',
            'OTC_Cliente' => 'nullable',
            'Tipo' => 'required|int',
            'Hash' => 'required|int',
        ]);
        $IdEmpresa = ( !empty($credentials['OTC_Empresa']) ) ? parent::CodeDescrypt($credentials['OTC_Empresa']) : " p.IdEmpresa ";
        $IdUnidad = ( !empty($credentials['OTC_Unidad']) ) ? parent::CodeDescrypt($credentials['OTC_Unidad']) : " p.IdUnidad ";
        $IdCliente = ( !empty($credentials['OTC_Cliente']) ) ? parent::CodeDescrypt($credentials['OTC_Cliente']) : " p.IdCliente ";
        $Info = [];
        
        $sqlAd = "";
        $Usuarios = "";
        
        if( $credentials['Tipo'] == 1 ){
            $sqlAd = " AND p.IdEstado in (1,4) ";
            $Usuarios = DB::SELECT("SELECT DISTINCT "
                    . "pc.Id as Hash, pc.Nombre as NombreUsuario "
                    . "FROM productocliente pc "
                    . "INNER JOIN Proyectos p on pc.Id = p.IdProducto AND p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                    . "ORDER BY pc.Nombre asc"
            );
        }else if( $credentials['Tipo'] == 2 ){
            $sqlAd = " AND p.IdEstado in (3,2) ";
            $Usuarios = DB::SELECT("SELECT DISTINCT "
                    . "pc.IdProfesionalesCliente as Hash, pc.Nombre as NombreUsuario "
                    . "FROM proyectos p "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                    . "ORDER BY pc.Nombre asc"
            );
        }else if( $credentials['Tipo'] == 3 ){
            $sqlAd = " AND p.IdEstado in (1,4) AND p.IdProducto = ".$credentials['Hash'];
            $Usuarios = DB::SELECT("SELECT DISTINCT "
                    . "pc.Id as Hash, pc.Nombre as NombreUsuario "
                    . "FROM productocliente pc "
                    . "INNER JOIN Proyectos p on pc.Id = p.IdProducto AND p.IdProducto = ".$credentials['Hash']." AND p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                    . "ORDER BY pc.Nombre asc"
            );
        }else if( $credentials['Tipo'] == 4 ){
            $sqlAd = " AND p.IdEstado in (1,4) AND p.IdProfesional = ".$credentials['Hash'];
            $Usuarios = DB::SELECT("SELECT DISTINCT "
                    . "pc.IdProfesionalesCliente as Hash, pc.Nombre as NombreUsuario "
                    . "FROM proyectos p "
                    . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdProfesional = ".$credentials['Hash']." AND p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                    . "ORDER BY pc.Nombre asc"
            );
        }
        
        $MinDate = DB::SELECT("SELECT DISTINCT(FechaEntrega) as FechaEntrega FROM ("
                . "SELECT "
                . "DISTINCT(DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')) AS FechaEntrega "
                . "FROM Tareas t "
                . "INNER JOIN Equipotarea eqt on t.Id = eqt.Tareas_Id AND eqt.Tipo = 'ASIG' AND t.IdEstado = 1  "
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id $sqlAd "
                . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                . "AND p.IdCliente = $IdCliente "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
                . "UNION ALL "
                . "SELECT "
                . "DISTINCT(DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')) AS FechaEntrega "
                . "FROM Subtareas s "
                . "INNER JOIN Equipotarea eqt on s.Id = eqt.IdSubtarea AND eqt.Tipo = 'ASIG' AND s.IdEstado = 1  "
                . "INNER JOIN Usuario u on eqt.IdUsuario = u.IdUsuario and u.Estado = 1 "
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id $sqlAd "
                . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                . "AND p.IdCliente = $IdCliente "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 ) AS Fec Order by FechaEntrega"
                );
        $t = 0;
        
        $Fechas = [];
        $P = [];
        $tp = 0;
        
        foreach($MinDate as $d){
            
            $Data = DB::SELECT("SELECT "
                . "Codigo, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "p.Codigo, t.NroEntregables "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG'  "
                . "INNER JOIN Tareas t ON e.Tareas_Id = t.Id "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1  "            
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id $sqlAd "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.IdSubtarea)  "
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT "
                . "p.Codigo,s.NroEntregables   "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG' "
                . "INNER JOIN Subtareas s ON e.IdSubtarea = s.Id "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1  "            
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id $sqlAd "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.Tareas_id) "
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
            $Piezas = 0;
            foreach( $Data as $xx ){
                $Piezas += $xx->Piezas;
            }
            $Temp = explode("-",$d->FechaEntrega);
            $x = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $Fechas[$tp] = $x;
            $P[$tp] = $Piezas;
            $tp++;
        }
        $MaxFecha = "";
        foreach($Usuarios as $u){
            $temp = [];
            $x = 0;
            $sqlAdN = "";
            if( $credentials['Tipo'] == 1 ||  $credentials['Tipo'] == 3 ){
                $sqlAdN = " p.IdProducto = ".$u->Hash;
            }else if( $credentials['Tipo'] == 2 ||  $credentials['Tipo'] == 4){
                $sqlAdN = " p.IdProfesional = ".$u->Hash;
                //$sqlAdN = ($u->Hash == null) ? " p.IdProfesional = null ": " p.IdProfesional = ".$u->Hash;
            }
            
            foreach($MinDate as $d){
                $Data = DB::SELECT("SELECT "
                . "Codigo, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "p.Codigo, t.NroEntregables "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG'  "
                . "INNER JOIN Tareas t ON e.Tareas_Id = t.Id "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id $sqlAd AND $sqlAdN "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                    . "u.Estado = 1 AND isnull(e.IdSubtarea)  "
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT "
                . "p.Codigo,s.NroEntregables   "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG' "
                . "INNER JOIN Subtareas s ON e.IdSubtarea = s.Id "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1  "            
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id $sqlAd AND $sqlAdN "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.Tareas_id)  "
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
                
                $temp['Data'][$x] = $Data;
                $temp['User'][$x] = $u;
                
                $Alert = "";
                
                $date1 = new \DateTime(date("Y-m-d"));
                $date2 = new \DateTime($d->FechaEntrega);
                $diff = $date1->diff($date2);
                
                        
                if($d->FechaEntrega < date("Y-m-d")){
                    $Alert = 'text-align:center;background-color:black;color:white;font-weight:bold;';
                }else if( $d->FechaEntrega == date("Y-m-d") ){
                    $Alert = 'text-align:center;background-color:#d43b3b;color:white;font-weight:bold;';
                }else if( $diff->days == 1 ){
                    $Alert = 'text-align:center;background-color:#ff9e0d;color:white;font-weight:bold;';
                }else{
                    $Alert = 'text-align:center;background-color:green;color:white;font-weight:bold;';
                }
                $temp['Color'][$x] = $Alert;  
                $x++;
            }
            $Info[$t] = $temp;
            $t++;
            $MaxFecha = $d->FechaEntrega;
        }
        $Temp = explode("-",$MinDate[0]->FechaEntrega);
        $MinDate[0]->FechaEntrega = parent::NombreDia($MinDate[0]->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        $Temp = explode("-",$MaxFecha);
        $MaxFecha = parent::NombreDia($MaxFecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        $data = [
            'Calendario' => $Info,
            'MinDate' =>$MinDate[0]->FechaEntrega,
            'MaxDate' =>$MaxFecha,
            'Fechas' =>$Fechas,
            'Piezas' =>$P,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //506d158fe0f6ca51eed93d801e4534e5C
    public function TRA_Report_DataConsolidadoCliente(Request $request){
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? "": "AND IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
        $Cliente = parent::CodeDescrypt($request->input('OTC_Cliente'));
        
        $TotalOts = 0;
        $TotalPiezasProductos = 0;
        $TotalProyectosProductos = 0;
        $TotalPiezasProfesional = 0;
        $TotalProyectosProfesional = 0;
        
        $ProyectosActivos = DB::SELECT("SELECT "
                . "p.Id "
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE IdEstado in (1,4) "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosActivos ) == 0 ){
            $ProyectosActivos = 0;
        }else{
            $ProyectosActivos = count($ProyectosActivos );
            $TotalOts += $ProyectosActivos;
        }
        $ProyectosCerrados = DB::SELECT("SELECT "
                . "p.Id "
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE IdEstado in (2,3) "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdCliente = $Cliente "
                .$Unidad
                . "");
        if( count($ProyectosCerrados ) == 0 ){
            $ProyectosCerrados = 0;
        }else{
            $ProyectosCerrados = count($ProyectosCerrados );
            $TotalOts += $ProyectosCerrados;
        }
        
        $OtsProductos = DB::SELECT("SELECT "
                . "pc.Id as Hash, pc.Nombre as Producto, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE IdEstado in (1,4) "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdCliente = $Cliente "
                .$Unidad
                . "GROUP BY pc.Id, pc.Nombre "
                . "Order by pc.Nombre ASC ");
        $TotalProductos = 0;
        foreach($OtsProductos as $d){
            $TotalProductos += $d->Cantidad;
            $Ids = $d->Hash;
            //Nro. Entregables
            $TotalPiezas = 0;
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.IdProducto = ".$Ids.") "
                . " "
                . "AND t.IdEstado = 1 "
                . "  "
                . "UNION ALL "
                . "SELECT "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.IdProducto = ".$Ids.") "
                . " "
                . "AND s.IdEstado = 1 "
                . "  "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            $Temp = 0;
            $TempP = 0;
            foreach( $DepartamentosPendientes as $t ){
                $TotalPiezasProductos += $t->Piezas;
                $TotalPiezas += $t->Piezas;
                $TotalProyectosProductos += $t->Cantidad;
            }
            $d->DetalleEntregables = $DepartamentosPendientes;
            $d->Piezas = $TotalPiezas;
        }
        
        $OtsProfesional = DB::SELECT("SELECT "
                . "pfc.IdProfesionalesCliente as Hash, pfc.Nombre as Profesional, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE IdEstado in (1,4) "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdCliente = $Cliente "
                .$Unidad
                . "GROUP BY pfc.IdProfesionalesCliente , pfc.Nombre "
                . "Order by pfc.Nombre ASC ");
        $TotalProfesional = 0;
        foreach($OtsProfesional as $d){
            $Ids = ($d->Hash == null) ? "null":$d->Hash;
            $TotalProfesional += $d->Cantidad;
            //Nro. Entregables
            $TotalPiezas = 0;
            //Cantidad Por Usuario
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.IdProfesional = ".$Ids.") "
                . " "
                . "AND t.IdEstado = 1 "
                . "  "
                . "UNION ALL "
                . "SELECT "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.IdProfesional = ".$Ids.") "
                . " "
                . "AND s.IdEstado = 1 "
                . "  "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            
            $Temp = 0;
            $TempP = 0;
            foreach( $DepartamentosPendientes as $t ){
                $TotalPiezasProfesional += $t->Piezas;
                $TotalPiezas += $t->Piezas;
                $TotalProyectosProfesional += $t->Cantidad;
            }
            $d->DetalleEntregables = $DepartamentosPendientes;
            $d->Piezas = $TotalPiezas;
        }
        
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'ProyectosCerrados' => $ProyectosCerrados,
            'TotalProductos' => $TotalProductos,
            'OtsProductos' => $OtsProductos,
            'TotalProfesional' => $TotalProfesional,
            'OtsProfesional' => $OtsProfesional,
            'TotalOts' => $TotalOts,
            'TotalProyectosProfesional' => $TotalProyectosProfesional,
            'TotalPiezasProfesional' => $TotalPiezasProfesional,
            'TotalPiezasProductos' => $TotalPiezasProductos,
            'TotalProyectosProductos' => $TotalProyectosProductos,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //86d820e566a342e7e37f7ec31dfbf78b
    public function TRA_Report_DataTareasConsolidado(Request $request){
        
        $Cliente = parent::CodeDescrypt($request->input('HashCliente'));
        $Ejecutivo = $request->input('HashUsuario');
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? "AND p.IdUnidad = p.IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
        
        //PRODUCTOS:
        
        $DepartamentosPendientes = DB::SELECT("SELECT "
                . "Id,Nombre, SUM(1) AS Cantidad "
                . "FROM (SELECT "
                . "d.Id, d.Nombre "
                . "FROM par_departamento_trafico d "
                . "INNER JOIN Tareas t ON d.Id = t.IdDepartamento "
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                . "WHERE t.IdEstado = 1 AND d.Estado = 1 "
                . "AND p.IdEstado = 1 "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo "
                . "AND p.IdCliente = $Cliente "
                .$Unidad." "
                . "UNION ALL "
                . "SELECT "
                . "d.Id, d.Nombre "
                . "FROM par_departamento_trafico d "
                . "INNER JOIN Subtareas s ON d.Id = s.IdDepartamento "
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                . "WHERE s.IdEstado = 1 AND d.Estado = 1 "
                . "AND p.IdEstado = 1 "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo "
                . "AND p.IdCliente = $Cliente "
                .$Unidad." ) as TempDeptos "
                . "GROUP BY Id,Nombre "
                . "Order by Nombre Asc"
                );
        $Total = 0;
        foreach($DepartamentosPendientes as $d){
            $Total += $d->Cantidad;
            
            //
        }
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'DepartamentosPendientes' => $DepartamentosPendientes,
            'Total' => $Total,
            'Colors' => $Colors,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //7ed64370201d459f4e2ca918d26f2ffd
    public function TRA_Report_DataTareasDepartamento(Request $request){
        
        $Ejecutivo = $request->input('HashUsuario');
        $Departamento = $request->input('HashDepto');
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Cliente = parent::CodeDescrypt($request->input('OTC_Cliente'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
       
        
        //Cantidad Por Usuario
        $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdUsuario,NombreUsuario, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "u.IdUsuario , u.NombreUsuario, t.NroEntregables "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario "
                . "INNER JOIN Tareas t ON e.Tareas_Id = t.Id "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "
                
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado = 1 AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente $Unidad) "
                . "AND u.Estado = 1 AND isnull(e.IdSubtarea) AND e.Tipo = 'ASIG' "
                . "AND t.IdEstado = 1 "
                . "AND t.IdDepartamento = $Departamento "
                . "UNION ALL "
                . "SELECT "
                . "u.IdUsuario , u.NombreUsuario,s.NroEntregables   "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario "
                . "INNER JOIN Subtareas s ON e.IdSubtarea = s.Id "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado = 1 AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente $Unidad) "
                . "AND u.Estado = 1 AND isnull(e.Tareas_id) AND e.Tipo = 'ASIG' "
                . "AND s.IdEstado = 1 "
                . "AND s.IdDepartamento = $Departamento "
                . ") as TempDeptos "
                . "GROUP BY IdUsuario,NombreUsuario "
                . "Order by NombreUsuario Asc"
                );
        $Total = 0;
        $TotalPiezas = 0;
        foreach($DepartamentosPendientes as $d){
            $Total += $d->Cantidad;
            $TotalPiezas += $d->Piezas;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'DetalleDepartamento' => $DepartamentosPendientes,
            'Total' => $Total,
            'TotalPiezas' => $TotalPiezas,
            'Colors' => $Colors,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //94ef88591e234a55d51120a2a0418284
    public function TRA_Report_DataOTsActivasPorEjecutivo(Request $request){
        $Ejecutivo = $request->input('HashUsuario');
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Cliente = parent::CodeDescrypt($request->input('HashCliente'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
       
        $ProyectosActivos = DB::SELECT("SELECT "
                . "pp.Id, pp.Nombre, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN productocliente pp on p.IdProducto = pp.Id AND p.IdEstado in (1,4) "
                . "WHERE "
                . "p.IdCliente = $Cliente "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo "
                .$Unidad
                . " GROUP BY pp.Id,pp.Nombre "
                . "ORDER BY pp.Nombre");
        $Total = 0;
        $TotalPendientes = 0;
        $TotalPiezas = 0;
        foreach( $ProyectosActivos as $d ){
            $Total += $d->Cantidad;
            
            //Solicitudes Cliente
            $SolicitudesCliente = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad = 2 "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad = 2 "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                    . "");
            if( count($SolicitudesCliente ) == 0 ){
                $SolicitudesCliente = 0;
            }else{
                $SolicitudesCliente = count($SolicitudesCliente );
            }
            $d->SolicitudesCliente = $SolicitudesCliente;


            //Ajustes o Reprocesos
            $AjsRep = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad in (3,6) "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad in (3,6) "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                    . "");
            if( count($AjsRep ) == 0 ){
                $AjsRep = 0;
            }else{
                $AjsRep = count($AjsRep );
            }
            
            $d->AjsRep = $AjsRep;
            
            //Otros
            $Otros = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad not in (2,3,6) "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad not in (2,3,6) "
                        . "AND  p.IdEstado in (1,4) "
                        . "AND p.IdEmpresa = $Empresa "
                        . "AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." "
                        . $Unidad
                    . "");
            if( count($Otros ) == 0 ){
                $Otros = 0;
            }else{
                $Otros = count($Otros );
            }
            $d->Otros = $Otros;
            
            //Cantidad Por Usuario
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id." $Unidad) "
                . ""
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$d->Id."  $Unidad) "
                . ""
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            $Temp = 0;
            $TempP = 0;
            foreach( $DepartamentosPendientes as $t ){
                $Temp += $t->Cantidad;
                $TempP += $t->Piezas;
            }
            $TotalPendientes += $Temp;
            $d->Pendientes = $Temp;
            $d->Piezas = $TempP;
            $TotalPiezas += $TempP;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'Total' => $Total,
            'TotalPiezas' => $TotalPiezas,
            'TotalPendientes' => $TotalPendientes,
            'Colors' => $Colors,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //94ef88591e234a55d51120a2a0418284P
    public function TRA_Report_DataOTsActivasPorEjecutivoP(Request $request){
        $Ejecutivo = $request->input('HashUsuario');
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Cliente = parent::CodeDescrypt($request->input('HashCliente'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
       
        $ProyectosActivos = DB::SELECT("SELECT DISTINCT "
                . "pp.IdProfesionalesCliente as Id, CASE WHEN ISNULL(pp.Nombre) THEN 'Sin Asignar' else pp.Nombre end as Nombre "
                . "FROM Proyectos p "
                . "LEFT JOIN profesionales_cliente pp on p.IdProfesional = pp.IdProfesionalesCliente "
                . "WHERE p.IdEstado in (1,4) AND "
                . "p.IdCliente = $Cliente "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo "
                .$Unidad
                . "  "
                );
        $Total = 0;
        $TotalActivo = 0;
        $TotalPte = 0;
        $PiezasActivo = 0;
        $PiezasPte = 0;
        $TotalPendientes = 0;
        
        $Activo_TotalPiezas = 0;
        $PteCl_TotalPiezas = 0;
        $TotalPiezas = 0;
        
        foreach( $ProyectosActivos as $d ){
            //
            //ots
            $Id = "";
            if( $d->Id == NULL ){
                $Id = "NULL";
            }else{
                $Id = $d->Id;
            }
            $Proyectos = DB::SELECT("SELECT "
                . "p.IdProfesional as Id, pp.Nombre, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN profesionales_cliente pp on p.IdProfesional = pp.IdProfesionalesCliente  "
                . "WHERE p.IdEstado in (1,4) AND "
                . "p.IdCliente = $Cliente "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo AND p.IdProfesional = ".$Id." "
                .$Unidad
                . " GROUP BY p.IdProfesional,pp.Nombre "
                . "");
            
            $TempP = 0;
            foreach( $Proyectos as $t ){
                $TempP += $t->Cantidad;
                $Total += $t->Cantidad;
            }
            $d->Activos = $TempP;
            
            //Piezas Ptes Activo
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT  "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id." $Unidad) "
                . ""
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT  "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id."  $Unidad) "
                . ""
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            $TempP = 0;
            foreach( $DepartamentosPendientes as $t ){
                $TempP += $t->Piezas;
                $Activo_TotalPiezas += $t->Piezas;
                $TotalPiezas += $t->Piezas;
            }
            $d->Activos_Piezas = $TempP;
            
            //Activos:
            $ProyectosA = DB::SELECT("SELECT "
                . "p.IdProfesional as Id, pp.Nombre, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN profesionales_cliente pp on p.IdProfesional = pp.IdProfesionalesCliente  "
                . "WHERE p.IdEstado in (1) AND "
                . "p.IdCliente = $Cliente "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo AND p.IdProfesional = ".$Id." "
                .$Unidad
                . " GROUP BY p.IdProfesional,pp.Nombre "
                . "");
            foreach( $ProyectosA as $tx ){
                $TotalActivo += $tx->Cantidad;
                //Piezas Ptes Activo
                $DepartamentosPendientesA = DB::SELECT("SELECT "
                    . "IdProyecto, SUM(NroEntregables) as Piezas "
                    . "FROM (SELECT  "
                    . "t.IdProyecto, t.NroEntregables "
                    . "FROM Tareas t "
                    . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE "
                    . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id." $Unidad) "
                    . ""
                    . "AND t.IdEstado = 1 "
                    . "UNION ALL "
                    . "SELECT  "
                    . "s.IdProyecto,s.NroEntregables   "
                    . "FROM Subtareas s "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                    . "WHERE "
                    . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id."  $Unidad) "
                    . ""
                    . "AND s.IdEstado = 1 "
                    . ") as TempDeptos "
                    . "GROUP BY IdProyecto "
                    . "Order by IdProyecto Asc"
                    );
                $TempP = 0;
                foreach( $DepartamentosPendientesA as $ta ){
                    $PiezasActivo += $ta->Piezas;
                    
                }
                $tx->Piezas = $DepartamentosPendientesA;
            }
            $d->Act = $ProyectosA;
            
            
            //Pte:
            $ProyectosA = DB::SELECT("SELECT "
                . "p.IdProfesional as Id, pp.Nombre, SUM(1) AS Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN profesionales_cliente pp on p.IdProfesional = pp.IdProfesionalesCliente  "
                . "WHERE p.IdEstado in (4) AND "
                . "p.IdCliente = $Cliente "
                . "AND p.IdEmpresa = $Empresa "
                . "AND p.IdEjecutivo = $Ejecutivo AND p.IdProfesional = ".$Id." "
                .$Unidad
                . " GROUP BY p.IdProfesional,pp.Nombre "
                . "");
            foreach( $ProyectosA as $tx ){
                $TotalPendientes += $tx->Cantidad;
                //Piezas Ptes Activo
                $DepartamentosPendientesA = DB::SELECT("SELECT "
                    . "IdProyecto, SUM(NroEntregables) as Piezas "
                    . "FROM (SELECT  "
                    . "t.IdProyecto, t.NroEntregables "
                    . "FROM Tareas t "
                    . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE "
                    . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id." $Unidad) "
                    . ""
                    . "AND t.IdEstado = 1 "
                    . "UNION ALL "
                    . "SELECT  "
                    . "s.IdProyecto,s.NroEntregables   "
                    . "FROM Subtareas s "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                    . "WHERE "
                    . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProfesional = ".$Id."  $Unidad) "
                    . ""
                    . "AND s.IdEstado = 1 "
                    . ") as TempDeptos "
                    . "GROUP BY IdProyecto "
                    . "Order by IdProyecto Asc"
                    );
                $TempP = 0;
                foreach( $DepartamentosPendientesA as $ta ){
                    $PiezasPte += $ta->Piezas;
                }
                $tx->Piezas = $DepartamentosPendientesA;
            }
            $d->Pte = $ProyectosA;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'Total' => $Total,
            'TotalPiezas' => $TotalPiezas,
            'TotalActivo' => $TotalActivo,
            'TotalPte' => $TotalPendientes,
            'PiezasActivo' => $PiezasActivo,
            'PiezasPte' => $PiezasPte,
            'Activo_TotalPiezas' => $Activo_TotalPiezas,
            'PteCl_TotalPiezas' => $PteCl_TotalPiezas,
            'TotalPendientes' => $TotalPendientes,
            'Colors' => $Colors,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //94ef88591e234a55d51120a2a0418284
    public function TRA_Report_DataOTsActivasPorEjecutivoProducto(Request $request){
        $Ejecutivo = $request->input('HashUsuario');
        $Producto = (($request->input('HashProducto') == 0 )? "p.IdProducto":"".$request->input('HashProducto')); 
        $Prof = (empty($request->input('HashProf'))? "isnull(p.IdProfesional)":"p.IdProfesional = ".$request->input('HashProf'));
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Cliente = parent::CodeDescrypt($request->input('OTC_Cliente'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = p.IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
       
        $ProyectosActivos = DB::SELECT("SELECT "
                . "p.Id,p.Codigo,p.Referencia,e.NombreComercial as Empresa, c.NombreComercial as Cliente,"
                . "pp.Nombre as Producto, u.NombreUsuario as Ejecutivo, DATE_FORMAT(p.Fecha,'%Y-%m-%d') as Fecha,"
                . "CASE WHEN ISNULL(pc.Nombre) then '' ELSE pc.Nombre end as Profesional "
                . "FROM Proyectos p "
                . "INNER JOIN productocliente pp on p.Idproducto = pp.Id AND p.IdProducto = $Producto "
                . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $Cliente "
                . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $Empresa "
                . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario AND p.IdEjecutivo = $Ejecutivo "
                . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional   "
                . $Unidad
                . "WHERE  $Prof AND p.IdEstado in (1,4) "
                . "ORDER BY p.Fecha DESC "
                . "");
        $Total = 0;
        $TotalPendientes = 0;
        $TotalPiezas = 0;
        foreach( $ProyectosActivos as $d ){
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            //Cantidad Por Usuario
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo "
                    . "AND p.IdCliente = $Cliente AND p.IdProducto = $Producto  $Unidad AND $Prof AND p.Id = ".$d->Id.") "
                . " "
                . "AND t.IdEstado = 1 "
                . "  "
                . "UNION ALL "
                . "SELECT "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo "
                    . "AND p.IdCliente = $Cliente AND p.IdProducto = $Producto  $Unidad AND $Prof AND p.Id = ".$d->Id.") "
                . " "
                . "AND s.IdEstado = 1 "
                . "  "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            $Temp = 0;
            $TempP = 0;
            foreach( $DepartamentosPendientes as $t ){
                $Temp += $t->Cantidad;
                $TempP += $t->Piezas;
            }
            $TotalPendientes += $Temp;
            $d->Pendientes = $Temp;
            $d->Piezas = $TempP;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            //'Calendario' => $Info,
            //'MinDate' =>$MinDate,
            //'MaxDate' =>$MaxDate,
            //'Fechas' =>$Fechas,
            //'Piezas' =>$P,
            'Colors' => $Colors,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
      
    //94ef88591e234a55d51120a2a0418284E
    public function TRA_Report_DataOTsActivasPorEjecutivoProductoProfesional(Request $request){
        $Ejecutivo = $request->input('HashUsuario');
        $Producto = $request->input('HashProducto');
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Cliente = parent::CodeDescrypt($request->input('OTC_Cliente'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
       
        $ProyectosActivos = DB::SELECT("SELECT "
                . "p.IdProfesional as Id, CASE WHEN ISNULL(pc.Nombre) then 'Sin Asignar' ELSE pc.Nombre end as Profesional ,"
                . "sum(1) as Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN productocliente pp on p.Idproducto = pp.Id AND p.IdProducto = $Producto "
                . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $Cliente "
                . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $Empresa "
                . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario AND p.IdEjecutivo = $Ejecutivo "
                . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                . $Unidad
                . "WHERE p.IdEstado in (1,4) "
                . "GROUP BY p.IdProfesional,pc.Nombre order by pc.Nombre ASC "
                . "");
        $Total = 0;
        $TotalPendientes = 0;
        $TotalPiezas = 0;
        foreach( $ProyectosActivos as $d ){
            $Total += $d->Cantidad;
        }
        
        $Date = DB::SELECT("SELECT "
                . "DISTINCT (FechaEntrega) AS FechaEntrega "
                . "FROM (SELECT DISTINCT "
                . "DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega "
                . "FROM Tareas t "          
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "   
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "   
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos  ORDER BY FechaEntrega ASC "
                . ""
                . "");
        
        foreach($Date as $d){
            
            $Alert = "";
                
            $date1 = new \DateTime(date("Y-m-d"));
            $date2 = new \DateTime($d->FechaEntrega);
            $diff = $date1->diff($date2);


            if($d->FechaEntrega < date("Y-m-d")){
                $Alert = 'text-align:center;background-color:black;color:white;font-weight:bold;';
            }else if( $d->FechaEntrega == date("Y-m-d") ){
                $Alert = 'text-align:center;background-color:#d43b3b;color:white;font-weight:bold;';
            }else if( $diff->days == 1 ){
                $Alert = 'text-align:center;background-color:#ff9e0d;color:white;font-weight:bold;';
            }else{
                $Alert = 'text-align:center;background-color:green;color:white;font-weight:bold;';
            }
            $d->Color = $Alert; 
            
            $Temp = explode("-",$d->FechaEntrega);
            $x = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $d->NameDate = $x;
            
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "Codigo , SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "DISTINCT p.Codigo, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id  "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . ""
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "p.Codigo,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "INNER JOIN Proyectos p ON s.IdProyecto = p.Id  "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . " "
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
            $Piezas = 0;
            foreach($DepartamentosPendientes as $x){
                $Piezas += $x->Piezas;
            }
            $d->TotalDia = $Piezas;
        }
        
        foreach( $ProyectosActivos as $d ){
            $Prfo = ( empty($d->Id) ? "NULL":$d->Id );
            $Info = [];
            $pp = 0;
            foreach($Date as $p){
                
                $DepartamentosPendientes = DB::SELECT("SELECT "
                . "Codigo , SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "p.Codigo, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id  "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$p->FechaEntrega."' AND "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . ""
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT "
                . "p.Codigo,s.NroEntregables   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "INNER JOIN Proyectos p ON s.IdProyecto = p.Id  "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$p->FechaEntrega."' AND "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . ""
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
                //$Ots = DB::SELECT("SELECT Codigo FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado = 1 AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad ");
                //$Temp = count($Ots);
                $TempP = 0;
                foreach( $DepartamentosPendientes as $x ){
                    $TempP += $x->Piezas;
                }
                $Info[$pp] = $DepartamentosPendientes;
                $p->Info = $DepartamentosPendientes;
                $p->TotalPiezas = $TempP;
                $pp++;
            }
            $d->Info = $Info;
            $d->Data = $Date;
        }
        
        foreach( $ProyectosActivos as $d ){
            $Prfo = ( empty($d->Id) ? "NULL":$d->Id );
            
            //Solicitudes Cliente
            $SolicitudesCliente = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad = 2 "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad "
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad = 2 "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad"
                    . "");
            if( count($SolicitudesCliente ) == 0 ){
                $SolicitudesCliente = 0;
            }else{
                $SolicitudesCliente = count($SolicitudesCliente );
            }
            $d->SolicitudesCliente = $SolicitudesCliente;


            //Ajustes o Reprocesos
            $AjsRep = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad in (3,6) "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad "
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad in (3,6) "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad"
                    . "");
            if( count($AjsRep ) == 0 ){
                $AjsRep = 0;
            }else{
                $AjsRep = count($AjsRep );
            }
            
            $d->AjsRep = $AjsRep;
            
            //Otros
            $Otros = DB::SELECT("SELECT "
                    . "t.Id "
                        . "FROM Tareas T "
                        . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON T.IdDepartamento = d.Id "
                        . "WHERE t.IdEstado = 1 AND d.Estado = 1 AND t.IdTipoActividad not in (2,3,6) "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad "
                        
                        . "UNION ALL "
                        . "SELECT s.Id "
                        . "FROM subtareas s "
                        . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
                        . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id "
                        . "WHERE s.IdEstado = 1 AND d.Estado = 1 AND s.IdTipoActividad not in (2,3,6) "
                        . "AND P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad "
                        
                    . "");
            if( count($Otros ) == 0 ){
                $Otros = 0;
            }else{
                $Otros = count($Otros );
            }
            $d->Otros = $Otros;
            
            //Cantidad Por Usuario
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "t.IdProyecto, t.NroEntregables "
                . "FROM Tareas t  "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . " "
                . "AND t.IdEstado = 1 "
                . "UNION ALL "
                . "SELECT "
                . "s.IdProyecto,s.NroEntregables   "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad) "
                . " "
                . "AND s.IdEstado = 1 "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto "
                . "Order by IdProyecto Asc"
                );
            
            $Ots = DB::SELECT("SELECT Id FROM Proyectos p WHERE P.IdProfesional = ".$Prfo." and p.IdEstado in (1,4) AND p.IdEmpresa = $Empresa AND p.IdEjecutivo = $Ejecutivo AND p.IdCliente = $Cliente AND p.IdProducto = ".$Producto." $Unidad ");
            $Temp = count($Ots);
            $TempP = 0;
            foreach( $DepartamentosPendientes as $x ){
                $TempP += $x->Piezas;
            }
            $TotalPendientes += $Temp;
            $d->Pendientes = $Temp;
            $d->Piezas = $TempP;
            $TotalPiezas += $TempP;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'Colors' => $Colors,
            'Total' => $Total,
            //'Info' => $Info,
            'TotalPendientes' => $TotalPendientes,
            'TotalPiezas' => $TotalPiezas,
            'Date' => $Date,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //ee8b8c2715871eeaff09a3e205bfb633
    public function CalendarioEntregasProyectos(Request $request){
        $credentials = $this->validate($request, [
            'Report_Departamento' => 'required|int',
            'OTC_Empresa' => 'nullable',
            'OTC_Unidad' => 'nullable',
            'OTC_Cliente' => 'nullable'
        ]);
        $IdEmpresa = ( !empty($credentials['OTC_Empresa']) ) ? parent::CodeDescrypt($credentials['OTC_Empresa']) : " p.IdEmpresa ";
        $IdUnidad = ( !empty($credentials['OTC_Unidad']) ) ? parent::CodeDescrypt($credentials['OTC_Unidad']) : " p.IdUnidad ";
        $IdCliente = ( !empty($credentials['OTC_Cliente']) ) ? parent::CodeDescrypt($credentials['OTC_Cliente']) : " p.IdCliente ";
        
                
        $Info = [];
        $MinDate = DB::SELECT("SELECT DISTINCT(FechaEntrega) as FechaEntrega FROM ("
                . "SELECT "
                . "DISTINCT(DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')) AS FechaEntrega "
                . "FROM Tareas t "
                . "INNER JOIN Equipotarea eqt on t.Id = eqt.Tareas_Id AND eqt.Tipo = 'ASIG' AND t.IdEstado in (1) AND t.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado in (1,4) 
                INNER JOIN Empresa emp ON p.IdEmpresa =  emp.IdEMpresa AND emp.Estado = 1 "
                . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                . "AND p.IdCliente = $IdCliente "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
                
                . "UNION ALL "
                . "SELECT "
                . "DISTINCT(DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')) AS FechaEntrega "
                . "FROM Subtareas s "
                . "INNER JOIN Equipotarea eqt on s.Id = eqt.IdSubtarea AND eqt.Tipo = 'ASIG' AND s.IdEstado in (1) AND s.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "
                . "INNER JOIN Usuario u on eqt.IdUsuario = u.IdUsuario and u.Estado = 1 "
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado in (1,4) 
                INNER JOIN Empresa emp ON p.IdEmpresa =  emp.IdEMpresa AND emp.Estado = 1 "
                . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                . "AND p.IdCliente = $IdCliente "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1  "
                
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d')  as FechaEntrega "
                . "FROM canales_principales c "
                . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad "
                . "AND r.IdUsuario in (SELECT u.IdUsuario FROM Usuario u INNER JOIN asoc_usuario_departamento p ON u.Estado = 1 AND p.IdUsuario = u.IdUsuario AND p.IdDepto = ".parent::CodeDescrypt($credentials['Report_Departamento'])." ) "
                . ""
                
                . " ) AS Fec Order by FechaEntrega "
                . " "
                
                );
        
        $t = 0;
        
        $Usuarios = DB::SELECT("SELECT "
                . "u.IdUsuario, u.NombreUsuario, u.ImgUsuario "
                . "FROM Usuario u "
                . "INNER JOIN asoc_usuario_departamento asco on u.IdUsuario = asco.IdUsuario AND asco.IdDepto = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "
                . "WHERE u.Estado = 1 "
                . "ORDER BY u.NombreUsuario ASC "
                );
        $Fechas = [];
        $P = [];
        $tp = 0;
        
        foreach($MinDate as $d){
            
            $Data = DB::SELECT("SELECT "
                . "Codigo, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "p.Codigo, t.NroEntregables "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG'  "
                . "INNER JOIN Tareas t ON e.Tareas_Id = t.Id "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 AND t.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "            
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.IdSubtarea)  "
                . "AND t.IdEstado in (1) "
                . "UNION ALL "
                . "SELECT "
                . "p.Codigo,s.NroEntregables   "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG' "
                . "INNER JOIN Subtareas s ON e.IdSubtarea = s.Id "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 AND s.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "            
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.Tareas_id) "
                . "AND s.IdEstado in (1) "
                
                . "UNION ALL "
                . "select Codigo, Entregables from (SELECT distinct act.id_actividad,'' AS Codigo, 1 as Entregables "
                . "FROM canales_principales c "
                . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad "
                . "AND r.IdUsuario in (SELECT u.IdUsuario FROM Usuario u INNER JOIN asoc_usuario_departamento p ON u.Estado = 1 AND p.IdUsuario = u.IdUsuario AND p.IdDepto = ".parent::CodeDescrypt($credentials['Report_Departamento'])." )"
                . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."') as bs "
                . ") as TempDeptos "
                . "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
            $Piezas = 0;
            foreach( $Data as $xx ){
                $Piezas += $xx->Piezas;
            }
            $Temp = explode("-",$d->FechaEntrega);
            $d->XFechaEntrega = parent::NombreDia($d->FechaEntrega).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
			
            $Fechas[$tp] = $d->XFechaEntrega;
            $P[$tp] = $Piezas;
            $tp++;
        }
        $MaxFecha = "";
        foreach($Usuarios as $u){
            $temp = [];
            $x = 0;
            foreach($MinDate as $d){
                $Data = DB::SELECT("SELECT "
                . "Codigo, (1) AS Cantidad, (NroEntregables) as Piezas, Asunto, Referencia "
                . "FROM (SELECT "
                . "p.Codigo, t.NroEntregables, t.Asunto, p.Referencia "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG' AND e.IdUsuario = ".$u->IdUsuario." "
                . "INNER JOIN Tareas t ON e.Tareas_Id = t.Id "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 AND t.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "            
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id AND p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                    . "u.Estado = 1 AND isnull(e.IdSubtarea)  "
                . "AND t.IdEstado in (1) "
                . "UNION ALL "
                . "SELECT "
                . "p.Codigo,s.NroEntregables, s.Asunto, p.Referencia   "
                . "FROM Usuario u "
                . "INNER JOIN equipotarea e ON u.IdUsuario = e.IdUsuario AND e.Tipo = 'ASIG' AND e.IdUsuario = ".$u->IdUsuario." "
                . "INNER JOIN Subtareas s ON e.IdSubtarea = s.Id "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 AND s.IdDepartamento = ".parent::CodeDescrypt($credentials['Report_Departamento'])." "            
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id AND p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa AND p.IdUnidad = $IdUnidad "
                    . "AND p.IdCliente = $IdCliente "
                . "WHERE DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' AND "
                
                    . "u.Estado = 1 AND isnull(e.Tareas_id)  "
                . "AND s.IdEstado in (1) "
                . "UNION ALL "
                . "SELECT '' AS Codigo, 1 as NroEntregables, "
                . "CASE WHEN LENGTH(act.NombreTarea) > 30 THEN concat('',left(act.NombreTarea,30),'...') ELSE CONCAT('',act.NombreTarea)END as Referencia, "
                . "CASE WHEN LENGTH(act.Tarea) > 30 THEN concat('ADMINISTRATIVO - ',left(act.Tarea,30),'...') ELSE CONCAT('ADMINISTRATIVO - ',act.Tarea) END as Asunto "
                . "FROM canales_principales c "
                . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad and r.IdUsuario = ".$u->IdUsuario." "
                
                . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') = '".$d->FechaEntrega."' "
                        
                . ") as TempDeptos "
                //. "GROUP BY Codigo "
                . "Order by Codigo Asc"
                );
                
                $temp['Data'][$x] = $Data;
                $temp['User'][$x] = $u;
                
                $Alert = "";
                
                $date1 = new \DateTime(date("Y-m-d"));
                $date2 = new \DateTime($d->FechaEntrega);
                $diff = $date1->diff($date2);
                
                        
                if($d->FechaEntrega < date("Y-m-d")){
                    $Alert = 'text-align:center;background-color:black;color:white;font-weight:bold;';
                }else if( $d->FechaEntrega == date("Y-m-d") ){
                    $Alert = 'text-align:center;background-color:#d43b3b;color:white;font-weight:bold;';
                }else if( $diff->days == 1 ){
                    $Alert = 'text-align:center;background-color:#ff9e0d;color:white;font-weight:bold;';
                }else{
                    $Alert = 'text-align:center;background-color:green;color:white;font-weight:bold;';
                }
                $temp['Color'][$x] = $Alert;  
                $x++;
            }
            $Info[$t] = $temp;
            $t++;
            $MaxFecha = date("Y-m-d");
        }
        $Temp = explode("-",$MinDate[0]->FechaEntrega);
        $MinDate[0]->FechaEntrega = parent::NombreDia($MinDate[0]->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        $Temp = explode("-",$MaxFecha);
        $MaxFecha = parent::NombreDia($MaxFecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        $data = [
            'Calendario' => $Info,
            'MinDate' =>$MinDate[0]->FechaEntrega,
            'MaxDate' =>$MaxFecha,
            'Fechas' =>$Fechas,
            'Piezas' =>$P,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //4e071d19daaf214bb0ef5340baf2bf86CLP
    public function TRA_Report_ListarProfCliente(Request $request){
        $Data = DB::SELECT("SELECT "
                . "IdProfesionalesCliente as Hash, Nombre "
                . "FROM profesionales_cliente "
                . "WHERE IdCliente = ".parent::CodeDescrypt($request->input('OTC_Cliente'))." AND Estado = 1 "
                . "ORDER BY Nombre Asc");
        foreach($Data as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }   
        $data = [
            'Prof' => $Data,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //4e071d19daaf214bb0ef5340baf2bf86PRD
    public function TRA_Report_ListarProductosCliente(Request $request){
        $Data = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM productocliente "
                . "WHERE IdCliente = ".parent::CodeDescrypt($request->input('OTC_Cliente'))." AND Estado = 1 "
                . "ORDER BY Nombre Asc");
        foreach($Data as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }   
        $data = [
            'Prod' => $Data,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //4e071d19daaf214bb0ef5340baf2bf86
    public function TRA_Report_DataOtsEntregables(Request $request){
        $credentials = $this->validate($request, [
            'OTC_Empresa' => 'required|int',
            'OTC_Cliente' => 'required|int',
            'ParProfesionales' => 'nullable',
            'ParProductosCliente' => 'nullable',
            'parEstadoRep' => 'nullable|int',
            'OTC_TextBusqueda' => 'nullable',
            'OTC_FechaDesde' => 'nullable',
            'OTC_FechaHasta' => 'nullable',
        ]);
        $IdEmpresa = ( !empty($credentials['OTC_Empresa']) ) ? parent::CodeDescrypt($credentials['OTC_Empresa']) : " p.IdEmpresa ";
        $IdCliente = ( !empty($credentials['OTC_Cliente']) ) ? parent::CodeDescrypt($credentials['OTC_Cliente']) : " p.IdCliente ";
        $ParProfesionales = ( !empty($credentials['ParProfesionales']) ) ? " AND p.IdProfesional = ".parent::CodeDescrypt($credentials['ParProfesionales']) : " ";
        $ParProductosCliente = ( !empty($credentials['ParProductosCliente']) ) ? " AND p.IdProducto = ".parent::CodeDescrypt($credentials['ParProductosCliente']) : " ";
        $Text = ( !empty($credentials['OTC_TextBusqueda']) ) ? " AND (p.Codigo like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "p.Referencia like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "pfc.Nombre like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "pc.Nombre like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "p.Fecha like '%".$credentials['OTC_TextBusqueda']."%'  "
                . ") " : " ";
        $Estado = ($credentials['parEstadoRep'] != 0) ? " AND p.IdEstado = ".$credentials['parEstadoRep']." ":" ";
        
        $Fechas = "";
        if( !empty($credentials['OTC_FechaDesde']) && !empty($credentials['OTC_FechaHasta']) ){
            $Fechas = " AND (DATE_FORMAT(p.Fecha, '%Y-%m-%d') BETWEEN '".$credentials['OTC_FechaDesde']."' AND '".$credentials['OTC_FechaHasta']."' ) ";
        }
        
        $DataOtsT = DB::SELECT("SELECT "
                . "p.Id AS Hash, p.Codigo, p.Referencia as Referencia_Proyecto, "
                . "DATE_FORMAT(p.Fecha, '%Y-%m-%d') as Fecha, "
                . "emp.NombreComercial as Empresa, cl.NombreComercial as Cliente,"
                . "pc.Nombre as Producto, p.IdEstado, est.Estado as Estado_OT, "
                . "Case WHEN isnull(pfc.Nombre) then 'Sin Asignar' else pfc.Nombre END as Profesional,p.IdProfesional "
                . ""
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND p.IdCliente = $IdCliente "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "INNER JOIN Par_Estado_Proyecto est on p.IdEstado = est.Id "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE 1 = 1 $ParProfesionales $ParProductosCliente $Fechas "
                . $Text." ".$Estado
                . "ORDER BY p.Fecha DESC"
                );
        $Profxxxx = "";
        foreach( $DataOtsT as $Ots ){
            $req = DB::sELECT("SELECT IdRequerimiento "
                    . "FROM proyecto_requerimientocliente "
                    . "WHERE IdProyecto =  ".$Ots->Hash);
            if( count($req) == 0 ){
                $Ots->Req = "";
            }else{
                $Ots->Req = $req[0]->IdRequerimiento;
            }
            $Temp = explode("-",$Ots->Fecha);
            $Ots->Fecha = parent::NombreDia($Ots->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            if( $Ots->IdProfesional != '' ){
                $Profe = DB::SELECT("SELECT Nombre FROM profesionales_cliente WHERE IdProfesionalesCliente = ".$Ots->IdProfesional);
                $Ots->Profesional = $Profe[0]->Nombre;
            }else{
                $Ots->Profesional = "";
            }
            
            $Data_Depto = DB::SELECT("SELECT  "
                . "Departamento, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "d.Nombre as Departamento, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$Ots->Hash." "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "d.Nombre as Departamento,s.NroEntregables   "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$Ots->Hash." "
                . ") as TempDeptos "
                . "GROUP BY Departamento "
                . "Order by Departamento Asc");
            $Ots->Ubicacion = $Data_Depto;
            
            $Data_Fechas = DB::SELECT("SELECT "
                . "FechaCreacion,FechaEntrega, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "d.Nombre as Departamento, t.NroEntregables, DATE_FORMAT(t.FechaHoraCreacion, '%Y-%m-%d') as FechaCreacion, DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$Ots->Hash." "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "d.Nombre as Departamento,s.NroEntregables, DATE_FORMAT(s.FechaHoraCreacion, '%Y-%m-%d') as FechaCreacion, DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega    "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$Ots->Hash." "
                . ") as TempDeptos "
                . "GROUP BY FechaCreacion,FechaEntrega "
                . "Order by FechaCreacion,FechaEntrega Asc");
            foreach( $Data_Fechas as $tt ){
                $Temp = explode("-",$tt->FechaCreacion);
                $tt->FechaCreacion = parent::NombreDia($tt->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                
                $Temp = explode("-",$tt->FechaEntrega);
                $tt->FechaEntrega = parent::NombreDia($tt->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            $Ots->Ubicacion = $Data_Depto;
            $Ots->UbicacionFechas = $Data_Fechas;
            $Ots->Hash = parent::CodeEncrypt($Ots->Hash);
        }
        $data = [
            'Info' => $DataOtsT,
            'sql' => "SELECT "
                . "p.Id AS Hash, p.Codigo, p.Referencia as Referencia_Proyecto, "
                . "DATE_FORMAT(p.Fecha, '%Y-%m-%d') as Fecha, "
                . "emp.NombreComercial as Empresa, cl.NombreComercial as Cliente,"
                . "pc.Nombre as Producto, p.IdEstado, est.Estado as Estado_OT, "
                . "Case WHEN isnull(pfc.Nombre) then 'Sin Asignar' else pfc.Nombre END as Profesional,p.IdProfesional "
                . ""
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND p.IdCliente = $IdCliente "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "INNER JOIN Par_Estado_Proyecto est on p.IdEstado = est.Id "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE 1 = 1 $ParProfesionales $ParProductosCliente  "
                . $Text." ".$Estado
                . "ORDER BY p.Fecha DESC",
            'success' => true
        ];

        return response()->json($data, 200);
    }

 //4e071d19daaf214bb0ef5340baf2bf862req
    public function TRA_Report_Req(Request $request){
        $id = "";
        if( $request->input('Tipo') == 2 ){
            $id = " cr.IdProducto = ".$request->input('Hash');
        }elseif( $request->input('Tipo') == 3 ){
            $id = " u.IdPersona = ".$request->input('Hash');
        }

        $sqlCampos = DB::SELECT(" SELECT "
                . "DISTINCT cr.Id as NumRequerimiento,"
                . "cr.Id as Hash,"
                . "cr.Asunto,"
                . "DATE_FORMAT(cr.Fecha,'%Y-%m-%d') as FechaC, case when isnull(cr.FechaEntrega) then '' else cr.FechaEntrega end as FechaEntrega,"
                . "DATE_FORMAT(cr.Fecha,'%T') as HoraC,"
                . "tp.Nombre as TipoSolicitud,"
                . "td.Nombre as TipoDesarrollo,"
                . "pr.Nombre as Producto, cr.FechaSalida,"
                . "u.NombreUsuario as Creador,"
                . "CASE "
                    . "WHEN cr.Estado = 1 THEN 'En Revisión Agencia' "
                    . "WHEN cr.Estado = 2 THEN 'Asignada en Proceso' "
                    . "WHEN cr.Estado = 3 THEN 'Devuelvo a Cliente' "
                    . "WHEN cr.Estado = 4 THEN 'En Aprobación Cliente' "
                    . "WHEN cr.Estado = 5 THEN 'En Ajuste' "
                    . "WHEN cr.Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                    . "WHEN cr.Estado = 8 THEN 'Cancelada' "
                    . "WHEN cr.Estado = 7 THEN 'Cerrada / Finalizada' " 
                    . "WHEN cr.Estado = 9 THEN 'Suspendido Temporalmente' "
                . "END as NEstado,"
                . "cr.Estado "
                . "FROM "
                . "cliente_requerimientos cr "
                . "INNER JOIN usuario u on cr.IdSolicitante = u.idusuario "
                . "INNER JOIN parCliente_TipoSolicitud tp on cr.IdTipoSolicitud = tp.Id "
                . "INNER JOIN parCliente_TipoDesarrollo td on cr.IdTipoDesarrollo = td.Id "
                . "INNER JOIN productocliente pr on cr.IdProducto = pr.Id "
                . "INNER JOIN Par_UsuarioCliente pcc on cr.IdProducto = pcc.IdProducto "
                . ""
                . "where $id AND cr.Estado in (1,5)"
                . " ")
                ;

        ## Search
        
        foreach($sqlCampos as $row){
            $Ot = DB::SELECT("SELECT p.Codigo "
                    . "FROM Proyectos p "
                    . "INNER JOIN proyecto_requerimientocliente pr ON pr.IdRequerimiento =".$row->Hash." AND p.Id = pr.IdProyecto "
                    . "");
            $NumOt = "";
            if( !empty($Ot) ){
                $NumOt = $Ot[0]->Codigo;
            }
            $Status = DB::SELECT("SELECT CASE WHEN ISNULL(sx.Status) THEN '' ELSE sx.Status END as Status, sx.Fecha  "
                    . "From Cliente_Requerimiento_Status sx "
                    . "WHERE sx.Id = ("
                    . "SELECT MAX(s.Id) as Hash "
                    . "From Cliente_Requerimiento_Status s "
                    . "WHERE s.IdRequerimiento = ".$row->Hash 
                    . " )");
            $Estatus = "";
            if( count($Status) != 0 ){
                $Temp = explode("-",$Status[0]->Fecha);
                $Status[0]->Fecha = parent::NombreDia($Status[0]->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                $Estatus = "".$Status[0]->Fecha."<br>".nl2br($Status[0]->Status);
            }
            $row->Estatus = $Estatus;
            $row->FechaSalidaN = $row->FechaSalida;
            
            $Temp = explode("-",$row->FechaSalida);
            $row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaC);
            $row->FechaC = parent::NombreDia($row->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $row->FechaEntregaN = $row->FechaEntrega;
            if( !empty($row->FechaEntrega) ){
                $Temp = explode("-",$row->FechaEntrega);
                $row->FechaEntrega = parent::NombreDia($row->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            $NumPiezas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad from Cliente_Requerimiento_Piezas where idrequerimiento = ".$row->Hash." group by idrequerimiento");
            $row->FechaActual = $FechaActual = date("Y-m-d");
            $row->NroPiezas = $NumPiezas[0]->Cantidad;
            $row->NumOt = $NumOt;
            
        }

        $data = [
            'Info' => $sqlCampos,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //4e071d19daaf214bb0ef5340baf2bf862
    public function TRA_Report_DataOtsEntregables2(Request $request){
        $credentials = $this->validate($request, [
            'OTC_Empresa' => 'required|int',
            'OTC_Cliente' => 'required|int',
            'ParProfesionales' => 'nullable',
            'ParProductosCliente' => 'nullable',
            'parEstadoRep' => 'nullable|int',
            'OTC_TextBusqueda' => 'nullable',
        ]);
        $IdEmpresa = ( !empty($credentials['OTC_Empresa']) ) ? ($credentials['OTC_Empresa']) : " p.IdEmpresa ";
        $IdCliente = ( !empty($credentials['OTC_Cliente']) ) ? ($credentials['OTC_Cliente']) : " p.IdCliente ";
        $ParProfesionales = ( !empty($credentials['ParProfesionales']) ) ? " AND p.IdProfesional = ".($credentials['ParProfesionales']) : " ";
        $ParProductosCliente = ( !empty($credentials['ParProductosCliente']) ) ? " AND p.IdProducto = ".($credentials['ParProductosCliente']) : " ";
        $Text = ( !empty($credentials['OTC_TextBusqueda']) ) ? " AND (p.Codigo like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "p.Referencia like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "pfc.Nombre like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "pc.Nombre like '%".$credentials['OTC_TextBusqueda']."%' OR "
                . "p.Fecha like '%".$credentials['OTC_TextBusqueda']."%'  "
                . ") " : " ";
        $Estado = ($credentials['parEstadoRep'] != 0) ? " AND p.IdEstado = ".$credentials['parEstadoRep']." ":" ";
        
        $DataOtsT = DB::SELECT("SELECT "
                . "p.Id AS Hash, p.Codigo, p.Referencia as Referencia_Proyecto, "
                . "DATE_FORMAT(p.Fecha, '%Y-%m-%d') as Fecha, "
                . "emp.NombreComercial as Empresa, cl.NombreComercial as Cliente,"
                . "pc.Nombre as Producto, p.IdEstado, est.Estado as Estado_OT, "
                . "Case WHEN isnull(pfc.Nombre) then 'Sin Asignar' else pfc.Nombre END as Profesional,p.IdProfesional "
                . ""
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND p.IdCliente = $IdCliente "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "INNER JOIN Par_Estado_Proyecto est on p.IdEstado = est.Id "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE 1 = 1 $ParProfesionales $ParProductosCliente  "
                . $Text." ".$Estado
                . "ORDER BY p.Fecha DESC"
                );
        $Profxxxx = "";
        foreach( $DataOtsT as $Ots ){
            $req = DB::sELECT("SELECT IdRequerimiento "
                    . "FROM proyecto_requerimientocliente "
                    . "WHERE IdProyecto =  ".$Ots->Hash);
            if( count($req) == 0 ){
                $Ots->Req = "";
            }else{
                $Ots->Req = $req[0]->IdRequerimiento;
            }
            $Temp = explode("-",$Ots->Fecha);
            $Ots->Fecha = parent::NombreDia($Ots->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            if( $Ots->IdProfesional != '' ){
                $Profe = DB::SELECT("SELECT Nombre FROM profesionales_cliente WHERE IdProfesionalesCliente = ".$Ots->IdProfesional);
                $Ots->Profesional = $Profe[0]->Nombre;
            }else{
                $Ots->Profesional = "";
            }
            
            $Data_Depto = DB::SELECT("SELECT  "
                . "Departamento, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "d.Nombre as Departamento, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$Ots->Hash." "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "d.Nombre as Departamento,s.NroEntregables   "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$Ots->Hash." "
                . ") as TempDeptos "
                . "GROUP BY Departamento "
                . "Order by Departamento Asc");
            $Ots->Ubicacion = $Data_Depto;
            
            $Data_Fechas = DB::SELECT("SELECT "
                . "FechaCreacion,FechaEntrega, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "d.Nombre as Departamento, t.NroEntregables, DATE_FORMAT(t.FechaHoraCreacion, '%Y-%m-%d') as FechaCreacion, DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$Ots->Hash." "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "d.Nombre as Departamento,s.NroEntregables, DATE_FORMAT(s.FechaHoraCreacion, '%Y-%m-%d') as FechaCreacion, DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega    "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$Ots->Hash." "
                . ") as TempDeptos "
                . "GROUP BY FechaCreacion,FechaEntrega "
                . "Order by FechaCreacion,FechaEntrega Asc");
            foreach( $Data_Fechas as $tt ){
                $Temp = explode("-",$tt->FechaCreacion);
                $tt->FechaCreacion = parent::NombreDia($tt->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                
                $Temp = explode("-",$tt->FechaEntrega);
                $tt->FechaEntrega = parent::NombreDia($tt->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            $Ots->Ubicacion = $Data_Depto;
            $Ots->UbicacionFechas = $Data_Fechas;
            $Ots->Hash = parent::CodeEncrypt($Ots->Hash);
        }
        $data = [
            'Info' => $DataOtsT,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //6131fd7628f87eadf4e4b9f42b8442c2
    public function Tra_Report_MotivosCierres(){
        $Data = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM par_motivos_cierre_proyectos "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre Asc");
        foreach( $Data as $d ){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        $data = [
            'Info' => $Data,
            'Fecha' => date("Y-m-d"),
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //43c2fd452552bfb5fe8e5e310b58412c
    public function Tra_Report_CierreOT(Request $request){
        try {
            $credentials = $this->validate($request, [
                'JustificacionOt' => 'nullable',
                'FechaCierre' => 'required|date',
                'Tip' => 'required|string',
                'Hash' => 'required|int',
            ]);
            
            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            if( $credentials['Tip'] == 'CRT_OT' ){
                $Just = parent::CodeDescrypt($credentials['JustificacionOt']);
                $Justificacion = DB::table('par_motivos_cierre_proyectos')->select('Nombre')->where('Id', $Just)->first();
            
                $idTarea = DB::table('Proyecto_Movimiento')
                ->insertGetId([
                    'Comentario' => $Justificacion->Nombre,
                    'IdProyecto' => parent::CodeDescrypt($credentials['Hash']),
                    'IdEstado' => 2,
                    'Fecha' => date('Y-m-d H:i:s'),
                    'IdUsuario' => $Usuario->IdUsuario
                ]);
                DB::table('proyectos')->where('Id', parent::CodeDescrypt($credentials['Hash']) )
                ->update([
                    'IdEstado' => 2
                ]);
            }else if( $credentials['Tip'] == 'PTN_OT' ){
                $idTarea = DB::table('Proyecto_Movimiento')
                ->insertGetId([
                    'Comentario' => "Pendiente de Revisión Cliente",
                    'IdProyecto' => parent::CodeDescrypt($credentials['Hash']),
                    'IdEstado' => 4,
                    'Fecha' => date('Y-m-d H:i:s'),
                    'IdUsuario' => $Usuario->IdUsuario
                ]);
                DB::table('proyectos')->where('Id', parent::CodeDescrypt($credentials['Hash']) )
                ->update([
                    'IdEstado' => 4
                ]);
            }else if( $credentials['Tip'] == 'DTN_OT' ){
                $idTarea = DB::table('Proyecto_Movimiento')
                ->insertGetId([
                    'Comentario' => $credentials['JustificacionOt'],
                    'IdProyecto' => parent::CodeDescrypt($credentials['Hash']),
                    'IdEstado' => 3,
                    'Fecha' => date('Y-m-d H:i:s'),
                    'IdUsuario' => $Usuario->IdUsuario
                ]);
                DB::table('proyectos')->where('Id', parent::CodeDescrypt($credentials['Hash']) )
                ->update([
                    'IdEstado' => 3
                ]);
            }else if( $credentials['Tip'] == 'RACT_OT' ){
                $idTarea = DB::table('Proyecto_Movimiento')
                ->insertGetId([
                    'Comentario' => "Se reactiva Proyecto",
                    'IdProyecto' => parent::CodeDescrypt($credentials['Hash']),
                    'IdEstado' => 1,
                    'Fecha' => date('Y-m-d H:i:s'),
                    'IdUsuario' => $Usuario->IdUsuario
                ]);
                DB::table('proyectos')->where('Id', parent::CodeDescrypt($credentials['Hash']) )
                ->update([
                    'IdEstado' => 1
                ]);
            }
            
            $data = [
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
    
    //e2b67f3d0b438458c0c729db6f878e39x
    public function TRA_Reportes_Capacitaciones(Request $request){
        try {
            $IdEmpresa = 2;
            $IdCliente = 256;
            
            $Productos = DB::SELECT("SELECT DISTINCT "
                    . "pc.Nombre, pc.Id "
                    . "FROM Usuario u "
                    . "INNER JOIN par_usuariocliente pcp on pcp.IdUsuario = u.IdUsuario AND pcp.IdCliente = $IdCliente "
                    . "INNER JOIN Productocliente pc on pcp.IdProducto = pc.Id AND pc.Estado = 1 "
                    . "WHERE u.idtipousuario = 3 ");
            foreach( $Productos as $p ){
                $UsuariosProducto = DB::SELECT("SELECT DISTINCT "
                    . "u.IdUsuario,u.NombreUsuario, u.FechaCap, u.Capacitacion, u.Correo, pf.IdProfesionalesCliente as Hash "
                    . "FROM Usuario u "
                    . "INNER JOIN par_usuariocliente pcp on pcp.IdUsuario = u.IdUsuario AND pcp.IdCliente = $IdCliente "
                    . "INNER JOIN Productocliente pc on pcp.IdProducto = pc.Id AND pc.Estado = 1 "
                        . "INNER JOIN profesionales_cliente pf on u.IdPersona = pf.IdProfesionalesCliente "
                    . "WHERE u.idtipousuario = 3 and pc.Id = ".$p->Id);
                foreach($UsuariosProducto as $u){
                    if( ($u->FechaCap) == NULL ){
                        $u->FechaCap = "";
                    }else{
                        $Temp = explode("-",$u->FechaCap);
                        $u->FechaCap = parent::NombreDia($u->FechaCap).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    }
                    
                    if( $u->Capacitacion == 0 ){
                        $u->Capacitacion = "No";
                    }else{
                        $u->Capacitacion = "Si";
                    }
                    $OtsActivas = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdProfesional = ".$u->Hash." "
                        . "WHERE p.IdEstado = 1 ");
                    if( count($OtsActivas) == 0 ){
                        $OtsActivas = 0;
                    }else{
                        $OtsActivas = count($OtsActivas);
                    }
                    $u->OtsActivas = $OtsActivas;
                    
                    $OtsPte = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdProfesional = ".$u->Hash." "
                        . "WHERE p.IdEstado = 4 ");
                    if( count($OtsPte) == 0 ){
                        $OtsPte = 0;
                    }else{
                        $OtsPte = count($OtsPte);
                    }
                    $u->OtsPte = $OtsPte;
                }
                $p->Usuarios = $UsuariosProducto;
            }
            $data = [
                'success' => true,
                'Productos'=>$Productos,
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
    
    //e2b67f3d0b438458c0c729db6f878e39
    public function TRA_Reportes_InformeCuentaNew(Request $request){
        try {
            $IdEmpresa = 2;
            $IdCliente = 256;
            
            $Years = DB::SELECT("SELECT "
                    . "YEAR(p.Fecha) AS Anio, SUM(1) as Ots "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "GROUP BY YEAR(p.Fecha) "
                    . "ORDER BY YEAR(p.Fecha) DESC");
            /*foreach($Years as $y){
                $Meses = [];
                for($i = 1; $i <= 12; $i++){
                    $Meses[$i-1]['Mes'] = $y->NombreMes = parent::NombreMeses($i);
                    $Yearsx = DB::SELECT("SELECT  "
                    . "YEAR(p.Fecha) as Year,MONTH(p.Fecha) as Mes, SUM(1) as Ots "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE YEAR(p.Fecha) =".$y->Anio. " AND MONTH(p.Fecha) = $i "
                    . "GROUP BY YEAR(p.Fecha),MONTH(p.Fecha) "
                    . "ORDER BY YEAR(p.Fecha),MONTH(p.Fecha)  DESC");
                    $Meses[$i-1]['Data'] = $Yearsx;
                }
                $y->Meses = $Meses;
            }*/
            
            $Activas = DB::SELECT("SELECT p.IdCliente,SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) "
                    . "GROUP BY p.IdCliente "
                    );
            $TotalTareas = DB::SELECT("SELECT "
                    . "t.Id, t.NroEntregables, '' as IdTareaPadre "
                    . "FROM Tareas t "
                    . "INNER JOIN Proyectos p ON p.Id = t.IdProyecto "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) "
                    
                    . "");
            
            if( empty($Activas) ){
                $Activas = 0;
            }else{
                $Activas = $Activas[0]->Cantidad;
            }
            
            $TotalTareasActivas = 0;
            $TotalPiezasTareasActivas = 0;
            if( empty($TotalTareas) ){
                $TotalTareasActivas = 0;
            }else{
                $TotalTareasActivas = count($TotalTareas);
                $TempId = 0;
                $TempPiezas = 0;
                foreach($TotalTareas as $t){
                    $Hijos = DB::SELECT("SELECT "
                    . "t.Id, t.NroEntregables, t.IdTareaPadre "
                    . "FROM SubTareas t "
                    . "INNER JOIN Proyectos p ON p.Id = t.IdProyecto "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) AND t.IdTareaPadre = ".$t->Id);
                    $TempPiezas = $t->NroEntregables;
                    foreach($Hijos as $s){
                        if( $TempPiezas < $s->NroEntregables ){
                            $TempPiezas = $s->NroEntregables;
                        }
                    }
                    if( $TempPiezas == 0 ){
                        $TotalPiezasTareasActivas += 1;
                    }else{
                        $TotalPiezasTareasActivas += $TempPiezas;
                    }
                }
            }
            
            $Cerradas = DB::SELECT("SELECT p.IdCliente,SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (2,3) "
                    . "GROUP BY p.IdCliente "
                    );
            $TotalTareasx = DB::SELECT("SELECT "
                    . "t.Id, t.NroEntregables "
                    . "FROM Tareas t "
                    . "INNER JOIN Proyectos p ON p.Id = t.IdProyecto "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (2,3)  "
                    . "");
            $TotalTareasCerradas = 0;
            $TotalPiezasTareasCerradas = 0;
            if( empty($TotalTareasx) ){
                $TotalTareasCerradas = 0;
            }else{
                $TotalTareasCerradas = count($TotalTareasx);
                $TempId = 0;
                $TempPiezas = 0;
                foreach($TotalTareasx as $t){
                    $Hijos = DB::SELECT("SELECT "
                    . "t.Id, t.NroEntregables, t.IdTareaPadre "
                    . "FROM SubTareas t "
                    . "INNER JOIN Proyectos p ON p.Id = t.IdProyecto "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (2,3) AND t.IdTareaPadre = ".$t->Id);
                    $TempPiezas = $t->NroEntregables;
                    foreach($Hijos as $s){
                        if( $TempPiezas < $s->NroEntregables ){
                            $TempPiezas = $s->NroEntregables;
                        }
                    }
                    if( $TempPiezas == 0 ){
                        $TotalPiezasTareasCerradas += 1;
                    }else{
                        $TotalPiezasTareasCerradas += $TempPiezas;
                    }
                }
            }
            
            if( empty($Cerradas) ){
                $Cerradas = 0;
            }else{
                $Cerradas = $Cerradas[0]->Cantidad;
            }

            $TotalPiezasProfesional = 0;
            $TotalProyectosProfesional = 0;
            $TotalTareasProyectosProfesional = 0;
            $TotalPiezasProductos = 0;
            $TotalProyectosProductos = 0;
            $TotalTareasProyectosProductos = 0;
            
            $OtsProductos = DB::SELECT("SELECT "
                    . "pc.Id as Hash, pc.Nombre as Producto, SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY pc.Id, pc.Nombre "
                    . "Order by pc.Nombre ASC ");
            $TotalProductos = 0;
            foreach($OtsProductos as $d){
                $TotalProductos += $d->Cantidad;
                $Ids = $d->Hash;
                //Nro. Entregables
                $TotalPiezas = 0;
                $TotalTareas = 0;
                $DepartamentosPendientes = DB::SELECT("SELECT "
                    . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas, COUNT(DISTINCT Id) as Tareas "
                    . "FROM (SELECT "
                    . "t.IdProyecto, t.NroEntregables, t.Id "
                    . "FROM Tareas t "
                    . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE "
                    . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa  "
                        . "AND p.IdCliente = $IdCliente AND p.IdProducto = ".$Ids.") "
                    . " "
                    . "AND t.IdEstado = 1 "
                    . "  "
                    . "UNION ALL "
                    . "SELECT "
                    . "s.IdProyecto,s.NroEntregables, s.Id  "
                    . "FROM Subtareas s "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                    . "WHERE "
                    . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa  "
                        . "AND p.IdCliente = $IdCliente AND p.IdProducto = ".$Ids.") "
                    . " "
                    . "AND s.IdEstado = 1 "
                    . "  "
                    . ") as TempDeptos "
                    . "GROUP BY IdProyecto "
                    . "Order by IdProyecto Asc"
                    );
                $Temp = 0;
                $TempP = 0;
                foreach( $DepartamentosPendientes as $t ){
                    $TotalPiezasProductos += $t->Piezas;
                    $TotalPiezas += $t->Piezas;
                    $TotalTareasProyectosProductos += $t->Tareas;
                    $TotalTareas += $t->Tareas;
                    $TotalProyectosProductos += $t->Cantidad;
                }
                $d->DetalleEntregables = $DepartamentosPendientes;
                $d->Piezas = $TotalPiezas;
                $d->Tareas = $TotalTareas;
            }

            $OtsProfesional = DB::SELECT("SELECT "
                    . "pfc.IdProfesionalesCliente as Hash, pfc.Nombre as Profesional, SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY pfc.IdProfesionalesCliente , pfc.Nombre "
                    . "Order by pfc.Nombre ASC ");
            $TotalProfesional = 0;
            foreach($OtsProfesional as $d){
                $Ids = ($d->Hash == null) ? "null":$d->Hash;
                $TotalProfesional += $d->Cantidad;
                //Nro. Entregables
                $TotalPiezas = 0;
                $TotalTareas = 0;
                //Cantidad Por Usuario
                $DepartamentosPendientes = DB::SELECT("SELECT "
                    . "IdProyecto, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas, COUNT(DISTINCT Id) as Tareas "
                    . "FROM (SELECT "
                    . "t.IdProyecto, t.NroEntregables, t.Id "
                    . "FROM Tareas t "
                    . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE "
                    . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa  "
                        . "AND p.IdCliente = $IdCliente AND p.IdProfesional = ".$Ids.") "
                    . " "
                    . "AND t.IdEstado = 1 "
                    . "  "
                    . "UNION ALL "
                    . "SELECT "
                    . "s.IdProyecto,s.NroEntregables, s.Id "
                    . "FROM Subtareas s "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                    . "WHERE "
                    . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE p.IdEstado in (1,4) AND p.IdEmpresa = $IdEmpresa  "
                        . "AND p.IdCliente = $IdCliente AND p.IdProfesional = ".$Ids.") "
                    . " "
                    . "AND s.IdEstado = 1 "
                    . "  "
                    . ") as TempDeptos "
                    . "GROUP BY IdProyecto "
                    . "Order by IdProyecto Asc"
                    );

                $Temp = 0;
                $TempP = 0;
                foreach( $DepartamentosPendientes as $t ){
                    $TotalPiezasProfesional += $t->Piezas;
                    $TotalPiezas += $t->Piezas;
                    $TotalProyectosProfesional += $t->Cantidad;
                    $TotalTareasProyectosProfesional += $t->Tareas;
                    $TotalTareas += $t->Tareas;
                }
                $d->DetalleEntregables = $DepartamentosPendientes;
                $d->Piezas = $TotalPiezas;
                $d->Tareas = $TotalTareas;
            }
            
            $Ots_Creativos = DB::SELECT("SELECT IdCliente, SUM(OTs) as Ots, SUM(Piezas) as Piezas FROM ("
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM tareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (4,56)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente "
                    . "UNION ALL "
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM subtareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (4,56)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente) AS TempPiezas "
                    . "GROUP BY IdCliente"
                    );
            $Ots_Ejecutivos = DB::SELECT("SELECT IdCliente, SUM(OTs) as Ots, SUM(Piezas) as Piezas FROM ("
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM tareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (1)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente "
                    . "UNION ALL "
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM subtareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (1)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente) AS TempPiezas "
                    . "GROUP BY IdCliente"
                    );
            $Ots_Digital = DB::SELECT("SELECT IdCliente, SUM(OTs) as Ots, SUM(Piezas) as Piezas FROM ("
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM tareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (52)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente "
                    . "UNION ALL "
                    . "SELECT p.IdCliente, COUNT(DISTINCT t.IdProyecto) as OTs, SUM(t.NroEntregables) AS Piezas "
                    . "FROM subtareas t "
                    . "INNER JOIN Proyectos p ON t.IdProyecto = p.Id AND t.IdEstado = 1 AND t.IdDepartamento IN (52)"
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                    . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1) "
                    . "AND p.IdEmpresa = $IdEmpresa "
                    . "AND p.IdCliente = $IdCliente "
                    . "GROUP BY p.IdCliente) AS TempPiezas "
                    . "GROUP BY IdCliente"
                    );
            $Ots_PteCliente = DB::SELECT("SELECT "
                    . "p.Id AS Hash, p.Codigo "
                    . "FROM Proyectos p "
                    . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                    . "INNER JOIN Par_Estado_Proyecto est on p.IdEstado = est.Id "
                    . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE  p.IdEstado = 4 "
                    . "ORDER BY p.Fecha DESC"
                    );
            $TotalPiezasPte = 0;
            foreach( $Ots_PteCliente as $Ots ){

                $Data_Depto = DB::SELECT("SELECT  "
                    . "Departamento, SUM(NroEntregables) as Piezas "
                    . "FROM (SELECT DISTINCT "
                    . "d.Nombre as Departamento, t.NroEntregables "
                    . "FROM Tareas t "
                    . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$Ots->Hash." "
                    . "UNION ALL "
                    . "SELECT DISTINCT "
                    . "d.Nombre as Departamento,s.NroEntregables   "
                    . "FROM Subtareas s  "
                    . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                    . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$Ots->Hash." "
                    . ") as TempDeptos "
                    . "GROUP BY Departamento "
                    . "Order by Departamento Asc");
                $PiezasOt = 0;
                foreach($Data_Depto as $d){
                    $PiezasOt += $d->Piezas;
                    $TotalPiezasPte += $d->Piezas;
                }
                $Ots->Piezas = $PiezasOt;
            }
            $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
                ->where('Estado', 1)
                ->orderByDesc('Id')
                ->get();
            $data = [
                'success' => true,
                'Anios'=>$Years,
                'OTs_Activas'=>$Activas,
                'OTs_Cerradas'=>$Cerradas,
                'Colors'=>$Colors,
                'TotalProductos' => $TotalProductos,
                'OtsProductos' => $OtsProductos,
                'TotalProfesional' => $TotalProfesional,
                'OtsProfesional' => $OtsProfesional,
                'TotalProyectosProfesional' => $TotalProyectosProfesional,
                'TotalPiezasProfesional' => $TotalPiezasProfesional,
                'TotalPiezasProductos' => $TotalPiezasProductos,
                'TotalProyectosProductos' => $TotalProyectosProductos,
                'TotalTareasProyectosProfesional' => $TotalTareasProyectosProfesional,
                'TotalTareasProyectosProductos' => $TotalTareasProyectosProductos,
                'Ots_Creativos' => $Ots_Creativos,
                'Ots_Digital' => $Ots_Digital,
                'Ots_PteCliente' => $Ots_PteCliente,
                'TotalPiezasPte' => $TotalPiezasPte,
                'Ots_Ejecutivos' => $Ots_Ejecutivos,
                
                'TotalTareas' => $TotalTareas,
                
                'TotalTareasActivas' => $TotalTareasActivas,
                'TotalPiezasTareasActivas' => $TotalPiezasTareasActivas,
                
                'TotalTareasCerradas' => $TotalTareasCerradas,
                'TotalPiezasTareasCerradas' => $TotalPiezasTareasCerradas,
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
    
    //f309d8563d70b278a105255f8552d371
    public function TRA_Report_DataOTsGeneral(Request $request){
        $sqlAd = "";
        $sqlA = "";
        $Req = "";
        if( $request->input('Tipo') == 1 && $request->input('Hash') == 0 ){
            $sqlAd = "  p.IdEstado in (1,4) ";
            $sqlA = "  p.IdEstado in (1,4) ";
        }else if( $request->input('Tipo') == 0 && $request->input('Hash') == 0 ){
            $sqlAd = "  p.IdEstado in (3,2) ";
            $sqlA = "  p.IdEstado in (3,2) ";
        }else if( $request->input('Tipo') == 2 ){
            $sqlAd = "  p.IdProducto in (".$request->input('Hash').") AND p.IdEstado in (1,4) ";
            $sqlA = "  p.IdProducto in (".$request->input('Hash').") ";
            $Req = " c.IdProducto = ".$request->input('Hash')." ";
        }else if( $request->input('Tipo') == 3 ){
            $sqlA = "";
            $Req = " u.IdPersona = ".$request->input('Hash')." ";
            if( empty($request->input('Hash'))  ){
                $sqlAd =  "ISNULL(p.IdProfesional) "." AND p.IdEstado in (1,4) ";
                $sqlA =  "ISNULL(p.IdProfesional) "." ";
            }else{
                $sqlAd =  "  p.IdProfesional = ".$request->input('Hash')." AND p.IdEstado in (1,4) ";
                $sqlA =  "  p.IdProfesional = ".$request->input('Hash')."  ";
            }
        }
        //$Producto = (($request->input('HashProducto') == 0 )? "p.IdProducto":"".$request->input('HashProducto')); 
        //$Prof = (empty($request->input('HashProf'))? "isnull(p.IdProfesional)":"p.IdProfesional = ".$request->input('HashProf'));
        $Empresa = 2;
        $Cliente = 256;
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = p.IdUnidad ": "AND p.IdUnidad = ".($request->input('OTC_Unidad'))." ";
        
        $Requerimientos = DB::SELECT("SELECT "
                . " c.IdTipoSolicitud, CASE WHEN c.IdTipoSolicitud = '1' then 'Nuevo' else 'Ajuste' END As TipoSolicitud, SUM(p.Cantidad) as Piezas, count(DISTINCT c.Id) AS Cantidad "
                . "FROM cliente_Requerimientos c "
                . "INNER JOIN cliente_requerimiento_piezas p on c.Id = p.IdRequerimiento "
                . "INNER JOIN Usuario u on c.IdSolicitante = u.IdUsuario "
                . "WHERE $Req AND c.Estado IN (1,5) "
                . "GROUP BY c.IdTipoSolicitud ");
        $TotalR1 = 0;
        $TotalR1_Total = 0;
        foreach($Requerimientos as $r){
            $TotalR1 += $r->Cantidad;
            $TotalR1_Total += $r->Piezas;
        }
        $PTE_Proyectos = 0;
        $PTE_Piezas = 0;
        $Creativos_Proyectos = 0;
        $Creativos_Piezas = 0;
        $Digital_Proyectos = 0;
        $Digital_Piezas = 0;
        $Ejecutivos_Proyectos = 1;
        $Ejecutivos_Piezas = 0;
        
        $ProyectosActivos = DB::SELECT("SELECT "
                . "p.Id,p.Codigo,p.Referencia,e.NombreComercial as Empresa, c.NombreComercial as Cliente,"
                . "pp.Nombre as Producto, u.NombreUsuario as Ejecutivo, DATE_FORMAT(p.Fecha,'%Y-%m-%d') as Fecha,"
                . "CASE WHEN ISNULL(pc.Nombre) then '' ELSE pc.Nombre end as Profesional, p.IdEstado, est.Estado "
                . "FROM Proyectos p "
                . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $Cliente "
                . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $Empresa "
                . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                . "LEFT JOIN par_estado_proyecto est on p.IdEstado = est.Id "
                . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional   "
                . $Unidad
                . "WHERE $sqlAd "
                . "ORDER BY p.Fecha DESC "
                . "");
        $Total = 0;
        $TotalPendientes = 0;
        $TotalPiezas = 0;
        
        $Ots = [];
        $op = 0;
        foreach( $ProyectosActivos as $t ){
            $Ots[$op] = $t->Id;
            $op++;
        }
        $Ots = array_unique($Ots);
        
        
        foreach( $ProyectosActivos as $d ){
            
            $Req = DB::SELECT("SELECT "
                    . "pc.IdRequerimiento, c.FechaEntrega FROM "
                    . "proyecto_requerimientocliente pc "
                    . "INNER JOIN cliente_requerimientos c on pc.IdRequerimiento = c.Id "
                    . "WHERE IdProyecto = ".$d->Id);
            $Requerimientos = "";
            $FechaEntrega = "";
            foreach($Req as $r){
                $Requerimientos .= $r->IdRequerimiento." ";
                
                //$Temp = explode("-",$r->FechaEntrega);
                //$FechaEntrega = parent::NombreDia($r->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                
            }
            $d->Requerimiento = $Requerimientos;
            $d->FechaEntrega = $FechaEntrega;
            
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            //Cantidad Por Usuario
            $DepartamentosPendientes = DB::SELECT("SELECT "
                . "IdProyecto, IdDepartamento, SUM(1) AS Cantidad, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT "
                . "t.IdProyecto, t.NroEntregables,t.IdDepartamento "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE "
                . "t.IdProyecto in (SELECT Id FROM Proyectos p WHERE $sqlAd AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.Id = ".$d->Id.") "
                . " "
                . "AND t.IdEstado = 1 "
                . "  "
                . "UNION ALL "
                . "SELECT "
                . "s.IdProyecto,s.NroEntregables, s.IdDepartamento   "
                . "FROM Subtareas s "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "
                . "WHERE "
                . "s.IdProyecto in (SELECT Id FROM Proyectos p WHERE $sqlAd AND p.IdEmpresa = $Empresa  "
                    . "AND p.IdCliente = $Cliente $Unidad AND p.Id = ".$d->Id.") "
                . " "
                . "AND s.IdEstado = 1 "
                . "  "
                . ") as TempDeptos "
                . "GROUP BY IdProyecto,IdDepartamento "
                . "Order by IdProyecto Asc"
                );
            $Temp = 0;
            $TempP = 0;
            
            foreach( $DepartamentosPendientes as $t ){
                $Temp += $t->Cantidad;
                $TempP += $t->Piezas;
                
                for($l = 0; $l < count($Ots);$l++){
                    if( $Ots[$l] == $t->IdProyecto ){
                        if( $d->IdEstado == 4 ){
                            $PTE_Proyectos += 1;
                            $PTE_Piezas += $t->Piezas;
                        }
                        if( $d->IdEstado != 4 && ($t->IdDepartamento == 4 || $t->IdDepartamento == 56 )){
                            $Creativos_Proyectos += 1;
                            $Creativos_Piezas += $t->Piezas;
                        }
                        if( $d->IdEstado != 4 && $t->IdDepartamento == 52  ){
                            $Digital_Proyectos += 1;
                            $Digital_Piezas += $t->Piezas;
                        }
                        if( $d->IdEstado != 4 && $t->IdDepartamento == 1 ){
                            $Ejecutivos_Proyectos += 1;
                            $Ejecutivos_Piezas += $t->Piezas;
                        }
                    }
                }
                
                
            }
            $TotalPendientes += $Temp;
            $d->Pendientes = $Temp;
            $d->Piezas = $TempP;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        $data = [
            'ProyectosActivos' => $ProyectosActivos,
            'Colors' => $Colors,
            
            'Ots' => $Ots,
            'Ejecutivos_Piezas' => $Ejecutivos_Piezas,
            'Ejecutivos_Proyectos' => $Ejecutivos_Proyectos,
            'Creativos_Piezas' => $Creativos_Piezas,
            'Creativos_Proyectos' => $Creativos_Proyectos,
            'Digital_Proyectos' => $Digital_Proyectos,
            'Digital_Piezas' => $Digital_Piezas,
            'PTE_Piezas' => $PTE_Piezas,
            'TotalR1' => $TotalR1,
            'TotalR1_Piezas' => $TotalR1_Total,
            'PTE_Proyectos' => $PTE_Proyectos,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    public function TRA_reportReprocesos(Request $request){
        $Cliente = 256;
        
        $sqlReprocesos = DB::SELECT("SELECT "
                . "IdRequerimiento,Id "
                . "FROM cliente_requerimiento_status "
                . "WHERE status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."'");
        $Reqs = DB::SELECT("SELECT "
                . "c.Id, c.Asunto, SUM(p.Cantidad) as CantidadPiezas  "
                . "FROM cliente_requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas p on p.IdRequerimiento = c.Id "
                . "WHERE c.Id IN ( SELECT "
                . "IdRequerimiento "
                . "FROM cliente_requerimiento_status  "
                . "WHERE status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."' ) "
                . "GROUP BY c.Id,c.Asunto");
        foreach( $Reqs as $r ){
            $sqlReprocesosx = DB::SELECT("SELECT "
                . "IdRequerimiento,Id "
                . "FROM cliente_requerimiento_status "
                . "WHERE IdRequerimiento = '".$r->Id."' AND status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."'");
            $r->Reprocesos = count($sqlReprocesosx);
            $r->Hash = parent::CodeEncrypt($r->Id);
        }
        
        $Cliente = DB::SELECT("SELECT Tipo, SUM(1) as Reprocesos "
                . "FROM cliente_requerimientos_evaluacion_reprocesos "
                . "WHERE IdRequerimiento IN ( SELECT "
                . "IdRequerimiento "
                . "FROM cliente_requerimiento_status  "
                . "WHERE status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."' ) AND "
                . " Tipo = 'CLIENTE' GROUP BY Tipo");
        $Agencia = DB::SELECT("SELECT Tipo, SUM(1) as Reprocesos "
                . "FROM cliente_requerimientos_evaluacion_reprocesos "
                . "WHERE IdRequerimiento IN ( SELECT "
                . "IdRequerimiento "
                . "FROM cliente_requerimiento_status  "
                . "WHERE status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."' ) AND "
                . " Tipo = 'INTERNO' GROUP BY Tipo");
        $Mixto = DB::SELECT("SELECT Tipo, SUM(1) as Reprocesos "
                . "FROM cliente_requerimientos_evaluacion_reprocesos "
                . "WHERE IdRequerimiento IN ( SELECT "
                . "IdRequerimiento "
                . "FROM cliente_requerimiento_status  "
                . "WHERE status like '%REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES%' "
                . "AND date_Format(fecha,'%Y-%m-%d') between '".$request->input('FI')."' and '".$request->input('FF')."' ) AND "
                . " Tipo = 'MIXTO' GROUP BY Tipo");
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        
        $data = [
            'Reprocesos' => $sqlReprocesos,
            'Cliente' => $Cliente,
            'Agencia' => $Agencia,
            'Mixto' => $Mixto,
            'Rq' => $Reqs,
            'Colors' => $Colors,
            
            'success' => true
        ];

        return response()->json($data, 200);
        
    }
}
