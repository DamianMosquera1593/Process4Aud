<?php

namespace App\Http\Controllers\Process\Parametrizacion;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RolesController extends Controller
{
    //35e80067234c997c538f25902a9ddef4
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.parametrizacion.roles');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //922d8ae0f0c0d839c35e457bdc44e25e
    public function datosPerfil(Request $request)
    {
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Perfil Where "
                .$sqlAdicional;

        $sqlCampos = "* ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_ROLES_PERFIL_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_ROLES_PERFIL_ESTADO')");
        $PAR_ROLES_PERFIL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_ROLES_PERFIL_EDITAR')");
        $PAR_ROLES_PERFIL_GESTION_PERMISOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_ROLES_PERFIL_EDITAR')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_ROLES_PERFIL_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_ROLES_PERFIL_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            if( count($PAR_ROLES_PERFIL_GESTION_PERMISOS) == 1 ){
                $permiso_permisosPerfil = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->IdPerfil),
              "Nombre"=>$row->Nombre,
              "PAR_ROLES_PERFIL_ESTADO"=>$permiso_estado,
              "PAR_ROLES_PERFIL_EDITAR"=>$permiso_editar,
              "PAR_ROLES_PERFIL_GESTION_PERMISOS"=>$permiso_permisosPerfil,
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

    //83e30c6212f44880e12457d3215f1de3
    public function parDatosCrearPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|string'
            ]);

            if (!is_null($credentials['Hash'])) {
                $idPerfil = parent::CodeDescrypt($credentials['Hash']);
                $perfilPermisos = DB::table('par_perfi_permiso as ppp')
                    ->join('par_permiso as pp', 'ppp.IdPermiso', '=', 'pp.Id')
                    ->join('par_perfil as pf', 'ppp.IdPerfil', '=', 'pf.IdPerfil')
                    ->where('IdPerfil', $idPerfil)
                    ->select('pp.Id', 'pp.Nombre', 'pp.Descripcion', 'pp.Pantalla')
                    ->get();
            }
            $listaPermisos = DB::table('par_permiso')->get();

            $i=1;
            foreach ($listaPermisos as $permiso) {
                $permiso->Num = $i++;
                $permiso->Id = parent::CodeEncrypt($permiso->Id);
            }
            if (!is_null($credentials['Hash'])) {
                $i=1;
                foreach ($perfilPermisos as $permiso) {
                    $permiso->Num = $i++;
                    $permiso->Id = parent::CodeEncrypt($permiso->Id);
                }
            }

            $datosPermisosPerfil = [
                'lista' => $listaPermisos
            ];

            if (!is_null($credentials['Hash'])) {
                array_push($datosPermisosPerfil, ['perfilPermisos' => $perfilPermisos]);
            } else {
                array_push($datosPermisosPerfil, ['perfilPermisos' => []]);
            }

            return response()->json($datosPermisosPerfil, 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //654c74fda3156c389869f782d354f085
    public function parCrearPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parNombrePerfil' => 'required|string',
                'parPermisos' => 'required|array|min:1',
                'parPermisos.*' => 'required|string',
            ]);

            $idUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            db::enableQueryLog();
            $id = [];

            $idPerfil = DB::table('par_perfil')->insertGetId([
                'Nombre' => $credentials['parNombrePerfil']
            ]);

            array_push($id, $idPerfil);

            foreach ($credentials['parPermisos'] as $permiso) {
                $idPermiso = parent::CodeDescrypt($permiso);
                $idpp = DB::table('par_perfi_permiso')->insertGetId([
                    'IdPermiso' => $idPermiso,
                    'IdPerfil' => $idPerfil
                ]);
                array_push($id, $idpp);
            }

            parent::queryLogAuditoria($id, $idUsuario[0]->IdUsuario, 'PAR_ROLES_PERFIL_CREAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'Mensage'=>'Perfil Creado exitosamente'], 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }

    }

    //b5106cf796741beaa7c81ac7a67e3d68
    public function parDatosPermisosPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|string'
            ]);

            $idPerfil = parent::CodeDescrypt($credentials['Hash']);

            $perfil = DB::table('par_perfil')->where('IdPerfil', $idPerfil)->first();
            $perfil->IdPerfil = parent::CodeEncrypt($perfil->IdPerfil);

            $perfilPermisos = DB::table('par_perfi_permiso as ppp')
            ->join('par_permiso as pp', 'ppp.IdPermiso', '=', 'pp.Id')
            ->join('par_perfil as pf', 'ppp.IdPerfil', '=', 'pf.IdPerfil')
            ->where('pf.IdPerfil', $idPerfil)
            ->select('pp.Id', 'pp.Nombre', 'pp.Descripcion', 'pp.Pantalla')
            ->get();

            $listaPermisos = DB::table('par_permiso as pp')
            ->join('par_perfi_permiso as ppp', 'pp.Id', '<>', 'ppp.IdPermiso')
            ->join('par_perfil as pf', 'ppp.IdPerfil', '<>', 'pf.IdPerfil')
            ->where('ppp.IdPerfil', $idPerfil)
            ->select('pp.Id', 'pp.Nombre', 'pp.Descripcion', 'pp.Pantalla')
            ->distinct()
            ->get();
            
            $listaPermisos = DB::SELECT("SELECT DISTINCT pp.Id,pp.Nombre,pp.Descripcion, pp.Pantalla "
                    . "FROM par_permiso pp "
                    . "WHERE pp.Id NOT IN (SELECT ppp.IdPermiso FROM par_perfi_permiso ppp WHERE ppp.IdPerfil = $idPerfil )"
                    . "");

            $i=1;
            foreach ($listaPermisos as $permiso) {
                $permiso->Num = $i++;
                $permiso->Id = parent::CodeEncrypt($permiso->Id);
            }
            $i=1;
            foreach ($perfilPermisos as $permiso) {
                $permiso->Num = $i++;
                $permiso->Id = parent::CodeEncrypt($permiso->Id);
            }

            $datosPermisosPerfil = [
                'lista' => $listaPermisos,
                'perfilPermisos' => $perfilPermisos,
                'perfil' => $perfil
            ];

            return response()->json($datosPermisosPerfil, 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //4eb7fef9bbd33196bf48b57f434df859
    public function parPermisosPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'nullable|string'
            ]);

            $idPerfil = parent::CodeDescrypt($credentials['Hash']);

            $perfilPermisos = DB::table('par_perfi_permiso as ppp')
            ->join('par_permiso as pp', 'ppp.IdPermiso', '=', 'pp.Id')
            ->join('par_perfil as pf', 'ppp.IdPerfil', '=', 'pf.IdPerfil')
            ->where('pf.IdPerfil', $idPerfil)
            ->select('pp.Id', 'pp.Nombre', 'pp.Descripcion', 'pp.Pantalla')
            ->get();

            $i=1;
            foreach ($perfilPermisos as $permiso) {
                $permiso->Num = $i++;
                $permiso->Id = parent::CodeEncrypt($permiso->Id);
            }
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'data'=>$perfilPermisos], 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //424d85d88ff22c6b0cd0ba5bb78130ef
    public function parDatosEditarPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' =>'required|string'
            ]);

            $idPerfil = parent::CodeDescrypt($credentials['Hash']);

            $perfil = DB::table('par_perfil')->where('IdPerfil', $idPerfil)->first();
            $perfil->IdPerfil = parent::CodeEncrypt($perfil->$idPerfil);

            return response()->json(['success'=>true, 'perfil'=>$perfil], 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //4615a88b890a421446169a9ce758d933
    public function parEditarPerfil(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parPermisos' => 'required|array|min:1',
                'parPermisos.*' => 'required|string',
                'parNombrePerfil' => 'required|string'
            ]);

            $idUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = [];

            $idPerfil = parent::CodeDescrypt($credentials['Hash']);

            DB::table('par_perfil')
            ->where('IdPerfil', $idPerfil)
            ->update([
                'Nombre' => $credentials['parNombrePerfil']
            ]);
            array_push($id, $idPerfil);

            DB::table('par_perfi_permiso')->where('IdPerfil',$idPerfil)->delete();
            array_push($id, $idPerfil);
            foreach ($credentials['parPermisos'] as $permiso) {
                $idPermiso = parent::CodeDescrypt($permiso);
                $idpp = DB::table('par_perfi_permiso')->insertGetId([
                    'IdPermiso' => $idPermiso,
                    'IdPerfil' => $idPerfil
                ]);
                array_push($id, $idpp);
            }

            parent::queryLogAuditoria($id, $idUsuario[0]->IdUsuario, 'PAR_ROLES_PERFIL_EDITAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensaje'=>'Los datos han sido actualizado correctamente'], 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
            return redirect()->route('35e80067234c997c538f25902a9ddef4');
        }
    }

    //0cc1ebeb3ff8e84588df5a140afbe345
    public function parEstadoPerfil(Request $request)
    {
        $Credentials = $this->validate($request,[
            'Hash' => 'required|string'
        ]);

        $idPerfil = parent::CodeDescrypt($Credentials['Hash']);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Perfil WHERE IdPerfil = '".$idPerfil."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Perfil set Estado = '$n' WHERE IdPerfil = '".$idPerfil."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = addslashes($idPerfil);
                $Query = "UPDATE Par_Perfil set Estado = '$n' WHERE IdPerfil = '".$idPerfil."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_ROLES_PERFIL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

}
