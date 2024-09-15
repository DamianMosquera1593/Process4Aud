<?php

namespace App\Http\Controllers\Process\Parametrizacion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\QueryException;

class UsuarioController extends Controller
{
    //99f46807f0cf3f07a5ad65d5333bb2bf
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.parametrizacion.usuario');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //5b8644fe47a908cc9e1a51208435b712
    public function datosUsuarios(Request $request)
    {
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  u.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  u.Estado = 1 ";
        }else{
            $sqlAdicional = "  u.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM usuario AS u "
            ."JOIN par_perfil AS pp ON u.IdPerfil = pp.IdPerfil "
            ."JOIN par_tipo_usuario AS ptu ON u.IdTipoUsuario = ptu.Id WHERE"
                .$sqlAdicional;

        $sqlCampos = "DISTINCT u.IdUsuario, u.Usuario, u.Estado, u.IdPerfil, u.IdTipoUsuario, u.IdPersona, "
        ."u.NombreUsuario, u.Correo, u.Token, pp.Nombre as perfil, ptu.Nombre as tipoUsuario ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and (NombreUsuario like '%".$searchValue."%' or Correo like '%".$searchValue."%' or Usuario like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_ESTADO')");
        $PAR_USUARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_EDITAR')");
        $PAR_USUARIO_EDITAR_PASSWORD = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
        . "FROM Usuario u "
        . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
        . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
        . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_EDITAR_PASSWORD')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_USUARIO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_USUARIO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            if( count($PAR_USUARIO_EDITAR_PASSWORD) == 1 ){
                $permiso_editar_password = 1;
            }
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->IdUsuario),
            "IdPerfil" => (new Controller)->CodeEncrypt($row->IdPerfil),
            "IdTipoUsuario" => (new Controller)->CodeEncrypt($row->IdTipoUsuario),
            "IdPersona" => (new Controller)->CodeEncrypt($row->IdPersona),
            "Usuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "Correo"=>$row->Correo,
            "Token"=>$row->Token,
            "perfil"=>$row->perfil,
            "tipoUsuario"=>$row->tipoUsuario,
            "PAR_USUARIO_ESTADO"=>$permiso_estado,
            "PAR_USUARIO_EDITAR"=>$permiso_editar,
            "PAR_USUARIO_EDITAR_PASSWORD"=>$permiso_editar_password,
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

    //22e05679cdd86fb8a40ad7bd39a5aafc
    public function parDatosCrearUsuario(Request $request)
    {
        $perfiles = DB::table('par_perfil')->where('Estado', 1)->get();
        $tiposUsuario = DB::table('par_tipo_usuario')->where('Estado', 1)->get();

        foreach ($perfiles as $perfil) {
            $perfil->IdPerfil = parent::CodeEncrypt($perfil->IdPerfil);
        }

        foreach ($tiposUsuario as $tipo) {
            $tipo->Id = parent::CodeEncrypt($tipo->Id);
        }

        $data = [
            'perfiles' => $perfiles,
            'tipoUsuario' => $tiposUsuario,
            'success' => true
        ];

        return response()->json($data, 200);
    }

    //1555f8ab3aad644b70b52c9fe8149a11
    public function parCrearUsuario(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parUsuario' => 'required|string|unique:usuario,Usuario',
                'parClave' => 'required|string|min:5', //min 5 caracters, almenos 1 mayuscula, no puede ser igual al usuario
                'parPerfil' => 'required|int',
                'parTipoUsuario' => 'required|int',
                'parNombre' => 'required|string',
                'parCorreo' => 'required|email',
                'ParEmpleado' => 'nullable|int',
                
            ]);

            if (preg_match('/[A-Z]/',$credentials['parClave']) == 0 || $credentials['parUsuario']==$credentials['parClave']) {
                return response()->json(['success'=>false, 'mensaje'=>'Requerimientos en la contraseña invalidos'], 200);
            }

            $idUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $token = Str::random(60).$credentials['parUsuario'];

            DB::beginTransaction();
            DB::enableQueryLog();
            if( empty( $credentials['ParEmpleado'] ) ){
                $id = DB::table('usuario')->insertGetId([
                    'Usuario' => $credentials['parUsuario'],
                    'Clave' => hash('sha256', $credentials['parClave']),
                    'IdPerfil' => parent::CodeDescrypt($credentials['parPerfil']),
                    'IdTipoUsuario' => parent::CodeDescrypt($credentials['parTipoUsuario']),
                    // 'IdPersona' => $credentials['parUsuario'],
                    'Token' => hash('sha256', $token),
                    'NombreUsuario' => $credentials['parNombre'],
                    'Correo' => $credentials['parCorreo']
                ]);
            }else{
                $id = DB::table('usuario')->insertGetId([
                    'Usuario' => $credentials['parUsuario'],
                    'Clave' => Hash::make($credentials['parClave']),
                    'IdPerfil' => parent::CodeDescrypt($credentials['parPerfil']),
                    'IdTipoUsuario' => parent::CodeDescrypt($credentials['parTipoUsuario']),
                    'IdPersona' => parent::CodeDescrypt($credentials['ParEmpleado']),
                    'Token' => hash('sha256', $token),
                    'NombreUsuario' => $credentials['parNombre'],
                    'Correo' => $credentials['parCorreo']
                ]);
            }
            

            parent::queryLogAuditoria([$id], $idUsuario[0]->IdUsuario, 'PAR_USUARIO_CREAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensaje'=>'Usuario creado exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //f9ec83ca71cfa45f0fc580e6cb0b49bd
    public function parDatosEditarUsuario(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['Hash']);

            $usuario = DB::table('usuario')->where('IdUsuario', $idUsuario)->first();
            // dd($credentials['Hash'], $idUsuario, $usuario);
            $perfiles = DB::table('par_perfil')->where('Estado', 1)->get();
            $tiposUsuario = DB::table('par_tipo_usuario')->where('Estado', 1)->get();
            // dd($usuario->IdUsuario);
            $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            $usuario->IdPerfil = parent::CodeEncrypt($usuario->IdPerfil);
            $usuario->IdTipoUsuario = parent::CodeEncrypt($usuario->IdTipoUsuario);
            // $usuario->IdPersona = parent::CodeEncrypt($usuario->IdPersona);

            foreach ($perfiles as $perfil) {
                $perfil->IdPerfil = parent::CodeEncrypt($perfil->IdPerfil);
            }

            foreach ($tiposUsuario as $tipo) {
                $tipo->Id = parent::CodeEncrypt($tipo->Id);
            }

            $data = [
                'usuario' => $usuario,
                'perfiles' => $perfiles,
                'tiposUsuario' => $tiposUsuario,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //fdd2189c990da29d1d8a6094632b3061
    public function parEditarUsuario(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parUsuario' => 'required|string',
                'parPerfil' => 'required|int',
                'parTipoUsuario' => 'required|int',
                'parNombre' => 'required|string',
                'parCorreo' => 'required|email',
                'parClave' => 'required|string',
                'ParLogo' => 'nullable|file'
            ]);

            $idUsuarioH = parent::CodeDescrypt($credentials['Hash']);
            $idUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $token = Str::random(60).$credentials['parUsuario'];
            
            $pathLogo = "";
            $Carpeta = "";
            if (!empty($credentials['ParLogo'])) {
                $pathLogo = $credentials['ParLogo']->getClientOriginalName();
                $Carpeta = date("Y")."".date("m")."".date("d");
                if(!Storage::exists('Usuarios/'.$Carpeta)) {
                    Storage::makeDirectory('Usuarios/'.$Carpeta, 0775, true);
                }
                $credentials['ParLogo']->storeAs('Usuarios/'.$Carpeta.'/', $pathLogo);
                $Carpeta = $Carpeta.'/'.$pathLogo;
            }
            
            DB::beginTransaction();
            DB::enableQueryLog();
            if (!empty($credentials['ParLogo'])){
                DB::table('usuario')
                    ->where('IdUsuario', $idUsuarioH)
                    ->update([
                        'Usuario' => $credentials['parUsuario'],
                        'Clave' => hash('sha256', $credentials['parClave']),
                        'IdPerfil' => parent::CodeDescrypt($credentials['parPerfil']),
                        'IdTipoUsuario' => parent::CodeDescrypt($credentials['parTipoUsuario']),
                        'Token' => hash('sha256', $token),
                        'NombreUsuario' => $credentials['parNombre'],
                        'Correo' => $credentials['parCorreo'],
                        'ImgUsuario' =>$Carpeta
                    ]);
            }else{
                DB::table('usuario')
                    ->where('IdUsuario', $idUsuarioH)
                    ->update([
                        'Usuario' => $credentials['parUsuario'],
                        'Clave' => hash('sha256', $credentials['parClave']),
                        'IdPerfil' => parent::CodeDescrypt($credentials['parPerfil']),
                        'IdTipoUsuario' => parent::CodeDescrypt($credentials['parTipoUsuario']),
                        'Token' => hash('sha256', $token),
                        'NombreUsuario' => $credentials['parNombre'],
                        'Correo' => $credentials['parCorreo']
                    ]);
            }
            

            parent::queryLogAuditoria([$idUsuarioH], $idUsuario[0]->IdUsuario, 'PAR_USUARIO_EDITAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensaje'=>'Usuario creado exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //d93c8a1882c2ccf56811ea1b1c213cbd
    public function parEditarUsuarioPassword(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parClave' => 'required|string|min:5', //min 5 caracters, almenos 1 mayuscula, no puede ser igual al usuario
            ]);

            $idUsuarioH = parent::CodeDescrypt($credentials['Hash']);
            $idUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $usuario = DB::table('usuario')
            ->where('IdUsuario',$idUsuarioH)->first();

            if (preg_match('/[A-Z]/',$credentials['parClave']) == 0 || $usuario->Usuario==$credentials['parClave']) {
                return response()->json(['success'=>false, 'mensaje'=>'Requerimientos en la contraseña invalidos'], 200);
            }

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('usuario')
            ->where('IdUsuario', $idUsuarioH)
            ->update([
                'Clave' => Hash::make($credentials['parClave'])
            ]);

            parent::queryLogAuditoria([$idUsuarioH], $idUsuario[0]->IdUsuario, 'PAR_USUARIO_EDITAR_PASSWORD');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensaje'=>'Contraseña ha sido actualizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //c3e3296d0160a193322bc1c8f36826f3
    public function parEstadoUsuario(Request $request)
    {
        $Credentials = $this->validate($request,[
            'Hash' => 'required|string'
        ]);

        $idUsuario = parent::CodeDescrypt($Credentials['Hash']);

        $Estado = DB::SELECT("SELECT Estado FROM usuario WHERE IdUsuario = '".$idUsuario."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE usuario set Estado = '$n' WHERE IdUsuario = '".$idUsuario."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = addslashes($idUsuario);
                $Query = "UPDATE usuario set Estado = '$n' WHERE IdUsuario = '".$idUsuario."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_USUARIO_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    //--------------- Usuario Empresa -------------------//

    //dbbe809db10de4c7a4739b09f1a8be02
    public function datosUsuariosEmpresa(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuarioempresa AS ue "
            ."JOIN usuario AS u ON ue.IdUsuario = u.IdUsuario "
            ."JOIN empresa AS e ON ue.IdEmpresa = e.IdEmpresa ";

        $sqlCampos = "DISTINCT ue.Id, u.IdUsuario, u.Usuario, "
        ."u.NombreUsuario, e.NombreComercial, e.Nit";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (NombreUsuario like '%".$searchValue."%' or Correo like '%".$searchValue."%' or Usuario like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_EMPRESA_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_EMPRESA_REMOVER')");
        $PAR_USUARIO_EMPRESA_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_EMPRESA_EDITAR')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;
            $permiso_editar = 0;

            if( count($PAR_USUARIO_EMPRESA_REMOVER) == 1 ){
                $permiso_remover = 1;
            }
            if( count($PAR_USUARIO_EMPRESA_EDITAR) == 1 ){
                $permiso_editar = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Usuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "NombreComercial"=>$row->NombreComercial,
            "Nit"=>$row->Nit,
            "PAR_USUARIO_EMPRESA_REMOVER"=>$permiso_remover,
            "PAR_USUARIO_EMPRESA_EDITAR"=>$permiso_editar,
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

    //419a6811a79ff03f81d37fda779d5910
    public function parDatosCrearUsuarioEmpresa()
    {
        try {
            $empresas = DB::table('empresa')
            ->select(DB::raw('concat(NombreLegal, " - ", Nit) as Nombre'), 'IdEmpresa', 'Nit', 'NombreLegal', 'NombreComercial')
            ->where('Estado',1)
            ->get();

            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
            ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($empresas as $empresa) {
                $empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
            }

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'empresas' => $empresas,
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //b29bbd657072b7a07579a31401d563f3
    public function parCrearUsuarioEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parEmpresa' => 'required|string',
                'parUsuario' => 'required|string'
            ]);

            $idEmpresa = parent::CodeDescrypt($credentials['parEmpresa']);
            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            // dd($idEmpresa, $idUsuario);
            $idUE = DB::table('par_usuarioempresa')
            ->insertGetId([
                'IdUsuario'=>$idUsuario,
                'IdEmpresa'=>$idEmpresa,
                'Fecha'=> date('Y-m-d h:i:s')
            ]);

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_USUARIO_EMPRESA_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //cfca4f55bf0c2d5b2a5bf441517b699b
    public function parRemoverUsuarioEmpresa(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUE = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuarioempresa')
            ->where('Id', $idUE)
            ->delete();

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_USUARIO_EMPRESA_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //--------------- Usuario Director -------------------//

    //78c261fecfd1cd1204708f77d555920d
    public function datosUsuariosDirectores(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuariodirector AS ud "
            ."JOIN usuario AS u ON ud.IdUsuario = u.IdUsuario ";

        $sqlCampos = "DISTINCT u.IdUsuario, u.NombreUsuario AS Usuario, "
        ."u.NombreUsuario";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (NombreUsuario like '%".$searchValue."%' or Usuario like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_DIRECTORES_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_DIRECTORES_REMOVER')");
        $PAR_USUARIO_DIRECTORES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_DIRECTORES_EDITAR')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;
            $permiso_editar = 0;

            if( count($PAR_USUARIO_DIRECTORES_REMOVER) == 1 ){
                $permiso_remover = 1;
            }
            if( count($PAR_USUARIO_DIRECTORES_EDITAR) == 1 ){
                $permiso_editar = 1;
            }

            $data[] = array(
            "Num"=>$i,
            // "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "HashUsuario"=> (new Controller)->CodeEncrypt($row->IdUsuario),
            "Usuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "PAR_USUARIO_DIRECTORES_REMOVER"=>$permiso_remover,
            "PAR_USUARIO_DIRECTORES_EDITAR"=>$permiso_editar,
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

    //5a16d51a93e9675d61821e71562e973d
    public function datosDirectoresUsuario(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuariodirector AS ud "
            ."JOIN usuario AS u ON ud.IdUsuarioDirector = u.IdUsuario ";

        $sqlCampos = "DISTINCT ud.Id, u.Usuario AS Director, "
        ."u.NombreUsuario";

        $idDirector = parent::CodeDescrypt($request['search']['Hash']);
        $sqlAdicional = "ud.IdUsuario = ".$idDirector;
        $searchQuery = " WHERE ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery .= " (NombreUsuario like '%".$searchValue."%' or Usuario like '%".$searchValue."%') and ";
        }
        $searchQuery .= $sqlAdicional;

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_DIRECTORES_REMOVER_DIRECTOR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_EMPRESA_REMOVER')");
        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_DIRECTORES_REMOVER_DIRECTOR) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Director"=>$row->Director,
            "NombreUsuario"=>$row->NombreUsuario,
            "PAR_USUARIO_DIRECTORES_REMOVER_DIRECTOR"=>$permiso_remover,
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

    //09a97e24ea74f24922da91242e16ad47
    public function parDatosCrearUsuarioDirectores()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
            ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //3f5fcbcac6d595b05d78b288469e3f61
    public function parDatosCrearUsuarioDirector(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['Hash']);
            $usuarios = DB::select('SELECT IdUsuario, NombreUsuario AS Usuario FROM usuario WHERE IdUsuario
                NOT IN (SELECT IdUsuarioDirector FROM par_usarioDirector WHERE IdUsuario = ?)',[]);

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //aaa61db16c05337904a5d0a88e0da428
    public function parCrearUsuarioDirectores(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parUsuario' => 'required|string',
                'parUsuarioDirector' => 'required|array|min:1',
                'parUsuarioDirector.*' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $idUsuarioDirector = [];
            foreach ($credentials['parUsuarioDirector'] as $parUsuarioD) {
                array_push($idUsuarioDirector, parent::CodeDescrypt($parUsuarioD));
            }
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            // dd($idEmpresa, $idUsuario);
            $id = [];
            foreach ($idUsuarioDirector as $idUD) {
                $idUE = DB::table('par_usuariodirector')
                    ->insertGetId([
                        'IdUsuario'=>$idUsuario,
                        'IdUsuarioDirector'=>$idUD,
                        'IdUsuarioAsignador'=>$usuario[0]->IdUsuario,
                        'Fecha'=> date('Y-m-d h:i:s')
                    ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_DIRECTORES_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //5f600fc1a96767fef66e47102f899277
    public function parRemoverUsuarioDirector(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuariodirector')
            ->where('Id', $id)
            ->delete();

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'PAR_USUARIO_EMPRESA_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //0bc28c27b9facdee1a9db209d52deb7f
    public function parRemoverUsuarioDirectores(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUE = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuariodirector')
            ->where('IdUsuario', $idUE)
            ->delete();

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_USUARIO_EMPRESA_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //--------------- Usuario Unidad de Negocio -------------------//

    //f79b89f1915396f6512fa79e03461041
    public function datosUsuariosUnidadNegocio(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuariounidad AS uu "
            ."JOIN usuario AS u ON uu.IdUsuario = u.IdUsuario "
            ."JOIN unidad_negocio AS un ON uu.IdUnidad = un.IdUnidad "
            ."JOIN empresa AS e ON un.IdEmpresa = e.IdEmpresa";

        $sqlCampos = "DISTINCT uu.Id, u.IdUsuario, u.Usuario, "
        ."u.NombreUsuario, e.NombreComercial, e.Nit, un.Nombre, DATE(uu.Fecha) as Fecha";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (u.NombreUsuario like '%".$searchValue."%' or NombreComercial like '%".$searchValue."%' or NombreUsuario like '%".$searchValue."%' or Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER')");
        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "NickUsuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "NombreUnidadNegocio"=>$row->Nombre,
            "NombreComercial"=>$row->NombreComercial,
            "FechaAsignacion" => $row->Fecha,
            "Nit"=>$row->Nit,
            "PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER"=>$permiso_remover,
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

    //4116ccdccad0e1daf09b692acdaa4e5b
    public function parDatosUnidadNegocioByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
            ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //1b0d400350384cc620ad56ba285c1fe6
    public function parDatosUnidadNegocioByEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUsuario' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);
            $empresas = DB::table('empresa as e')
            ->select(DB::raw('concat(e.NombreLegal, " - ", e.Nit) as Nombre'), 'e.IdEmpresa', 'e.Nit', 'e.NombreLegal', 'e.NombreComercial')
            ->join('par_usuarioempresa as pue', 'e.IdEmpresa', '=', 'pue.IdEmpresa')
            ->join('usuario as u', 'pue.IdUsuario', '=', 'u.IdUsuario')
            ->where(['e.Estado'=>1, 'u.IdUsuario'=>$idUsuario])
            ->get();
            foreach ($empresas as $empresa) {
                $empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
                $empresa->Hash = $empresa->IdEmpresa;
            }

            $data = [
                'empresas' => $empresas,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //d253fac6d4551a09c7c8e032ef8f10e3
    public function parDatosUnidadNegocioByUN(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'required|string',
                'HashUsuario' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);
            $idEmpresa = parent::CodeDescrypt($credentials['HashEmpresa']);

            $unidadesUsuario = DB::select('SELECT un.IdUnidad, un.Nombre FROM `unidad_negocio` AS un
            JOIN empresa AS e ON un.IdEmpresa = e.IdEmpresa
            WHERE un.IdUnidad NOT IN (SELECT puu.IdUnidad FROM par_usuariounidad AS puu
                                    WHERE IdUsuario = ?)AND un.IdEmpresa = ?', [$idUsuario, $idEmpresa]);

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
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //e088eff01dc9d12cdc31a19f23860dde
    public function parCrearUsuarioUnidadNegocio(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parUnidadNegocio' => 'required|string',
                'parUsuario' => 'required|string'
            ]);

            $idUnidad = parent::CodeDescrypt($credentials['parUnidadNegocio']);
            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            // dd($idEmpresa, $idUsuario);
            $idUE = DB::table('par_usuariounidad')
            ->insertGetId([
                'IdUsuario'=>$idUsuario,
                'IdUnidad'=>$idUnidad,
                'Fecha'=> date('Y-m-d h:i:s')
            ]);

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_USUARIO_UNIDAD_NEGOCIO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //61e758abff4661243040c45d90715136
    public function parRemoverUsuarioUnidadNegocio(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUE = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuariounidad')
            ->where('Id', $idUE)
            ->delete();

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_USUARIO_UNIDAD_NEGOCIO_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario - unidad de negocio removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }




    //--------------- Usuario Cliente Producto -------------------//

    //8705a86e2948a84ca649525e9bade3ec
    public function datosUsuariosClienteProducto(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuariocliente AS uu "
            ."JOIN usuario AS u ON uu.IdUsuario = u.IdUsuario "
            ."JOIN unidad_negocio AS un ON uu.IdUnidadNegocio = un.IdUnidad "
            ."JOIN empresa AS e ON un.IdEmpresa = e.IdEmpresa "
            ."JOIN cliente AS c ON uu.IdCliente = c.IdCliente "
            ."JOIN ProductoCliente AS pc ON uu.IdProducto = pc.Id ";

        $sqlCampos = "DISTINCT uu.Id, u.IdUsuario, u.Usuario, "
        //."u.NombreUsuario, e.NombreComercial, e.Nit, un.Nombre, c.NombreComercial, pc.Nombre, DATE(uu.Fecha) AS Fecha";
        ."u.NombreUsuario, e.NombreComercial AS NombreEmpresa, e.Nit, un.Nombre AS Unidad, c.NombreComercial AS Cliente, pc.Nombre AS Producto, DATE(uu.Fecha) AS Fecha";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            //$searchQuery = " WHERE (u.NombreUsuario like '%".serchValue."%' or NombreEmpresa like '%".serchValue."%' or Unidad like '%".serchValue."%' or Cliente like '%".serchValue."%' or Producto like '%".serchValue."%')";
            $searchQuery = " WHERE (u.NombreUsuario like '%".$searchValue."%' or e.NombreComercial like '%".$searchValue."%' or un.Nombre like '%".$searchValue."%' or c.NombreComercial like '%".$searchValue."%' or pc.Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER')");
        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "NickUsuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "NombreUnidadNegocio"=>$row->Unidad,
            "NombreEmpresa"=>$row->NombreEmpresa,
            "NombreCliente"=>$row->Cliente,
            "NombreProducto"=>$row->Producto,
            "FechaAsignacion" => $row->Fecha,
            "PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER"=>$permiso_remover,
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

    //eed6ecfa687e785a71a3b1c415731854
    public function parDatosCProductoByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
                    ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //2f69625ad17040ab364db7083f95cf90
    public function parDatosCProductoByEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUsuario' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);
            $empresas = DB::table('empresa as e')
            ->select(DB::raw('concat(e.NombreLegal, " - ", e.Nit) as Nombre'), 'e.IdEmpresa', 'e.Nit', 'e.NombreLegal', 'e.NombreComercial')
            ->join('par_usuarioempresa as pue', 'e.IdEmpresa', '=', 'pue.IdEmpresa')
            ->join('usuario as u', 'pue.IdUsuario', '=', 'u.IdUsuario')
            ->where(['e.Estado'=>1, 'u.IdUsuario'=>$idUsuario])
            ->get();
            foreach ($empresas as $empresa) {
                $empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
                $empresa->Hash = $empresa->IdEmpresa;
            }

            $data = [
                'empresas' => $empresas,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //90a2a6e4e383bb99f296617e293068cf
    public function parDatosCProductoByClientes(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'required|string',
            ]);

            $idEmpresa = parent::CodeDescrypt($credentials['HashEmpresa']);

            $clientes = DB::table('asoc_empresa_cliente AS aec')
                ->join('cliente AS c', 'aec.IdCliente', '=', 'c.IdCliente')
                ->where(['aec.IdEmpresa'=> $idEmpresa,'c.estado'=>1])
                ->select('aec.Id', 'aec.IdCliente', 'aec.IdEmpresa', 'c.NombreComercial', 'c.Nit')
                ->get();

            foreach ($clientes as $cliente) {
                $cliente->Id = parent::CodeEncrypt($cliente->Id);
                $cliente->IdCliente = parent::CodeEncrypt($cliente->IdCliente);
                $cliente->IdEmpresa = parent::CodeEncrypt($cliente->IdEmpresa);
                $cliente->Hash = $cliente->Id;
            }

            $data = [
                'clientes' => $clientes,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //06b02d2daa85b17173b582087f46d61d
    public function parDatosCProductoByprodcutos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUsuario' => 'required|string',
                'HashCliente' => 'required|string',
                'HashEmpresa' => 'required|string',
                'HashUnidad' => 'required|string',
            ]);

            $idCliente = parent::CodeDescrypt($credentials['HashCliente']);
            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);
            $idUnidad = parent::CodeDescrypt($credentials['HashEmpresa']);
            $idEmpresa = parent::CodeDescrypt($credentials['HashUnidad']);

            $productos = DB::select('SELECT * FROM `productocliente` AS pc
            WHERE pc.IdCliente = ? and pc.Estado = 1 and  pc.Id NOT IN (SELECT puc.IdProducto FROM `par_usuariocliente` AS puc
                                WHERE puc.IdUsuario = ? AND puc.IdEmpresa = ? AND puc.IdUnidadNegocio = ?)
            ', [$idCliente,$idUsuario, $idEmpresa,$idUnidad]);

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
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //108c16a6c63ca721181a6919e62b360d
    public function parDatosCProductoByUN(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashEmpresa' => 'required|string',
                'HashUsuario' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);
            $idEmpresa = parent::CodeDescrypt($credentials['HashEmpresa']);

            $unidadesUsuario = DB::select('SELECT un.IdUnidad, un.Nombre FROM `unidad_negocio` AS un
            JOIN empresa AS e ON un.IdEmpresa = e.IdEmpresa
            WHERE un.IdUnidad IN (SELECT puu.IdUnidad FROM par_usuariounidad AS puu
                                    WHERE IdUsuario = ?)AND un.IdEmpresa = ?', [$idUsuario, $idEmpresa]);

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
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //f7395d218880036529243dde732f771e
    public function parCrearUsuarioClienteProducto(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parEmpresa' => 'required|string',
                'parUnidadNegocio' => 'required|string',
                'parProductos' => 'required|array|min:1',
                'parProductos.*' => 'required|string|distinct',
                'parUsuario' => 'required|string',
                'parCliente' => 'required|string'
            ]);


            $idUnidad = parent::CodeDescrypt($credentials['parUnidadNegocio']);
            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $idEmpresa = parent::CodeDescrypt($credentials['parEmpresa']);
            $idCliente = parent::CodeDescrypt($credentials['parCliente']);
            $idProductos = [];
            foreach ($credentials['parProductos'] as $parProducto) {
                $idProducto = parent::CodeDescrypt($parProducto);
                array_push($idProductos, $idProducto);
            }

            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();
            $id=[];
            // dd($idEmpresa, $idUsuario);
            foreach ($idProductos as $idProducto) {
                $idUE = DB::table('par_usuariocliente')
                ->insertGetId([
                    'IdUsuario'=>$idUsuario,
                    'IdCliente'=>$idCliente,
                    'IdProducto'=>$idProducto,
                    'IdEmpresa'=>$idEmpresa,
                    'IdUnidadNegocio'=>$idUnidad,
                    'Fecha'=> date('Y-m-d h:i:s')
                ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_CLIENTE_PRODUCTO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario Cliente Producto realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //9b917e093ababee9f2d598dd4735da62
    public function parRemoverUsuarioClieteProducto(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUC = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuariocliente')
            ->where('Id', $idUC)
            ->delete();

            parent::queryLogAuditoria([$idUC], $usuario[0]->IdUsuario, 'PAR_USUARIO_CLIENTE_PRODUCTO_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario - unidad de negocio removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }


        //--------------- Usuario Cliente Profesional -------------------//

    //33dece9eeabe8e98872355516ac8d891
    public function datosUsuariosProfesionalCliente(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_usuario_profcliente AS upc "
            ."JOIN usuario AS u ON upc.IdUsuario = u.IdUsuario "
            ."JOIN cliente AS c ON upc.IdCliente = c.IdCliente "
            ."JOIN profesionales_cliente AS pc ON upc.IdProfCliente = pc.IdProfesionalesCliente ";

        $sqlCampos = "DISTINCT upc.Id, u.IdUsuario, u.Usuario, "
        ."u.NombreUsuario, c.NombreComercial AS Cliente, pc.Nombre AS Profesional, DATE(upc.Fecha) as Fecha";
        //."u.NombreUsuario, c.NombreComercial, pc.Nombre, DATE(upc.Fecha) as Fecha";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (u.NombreUsuario like '%".$searchValue."%' or NombreComercial like '%".$searchValue."%' or NombreComercial like '%".$searchValue."%' or NombreUsuario like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER')");
        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "NickUsuario"=>$row->Usuario,
            "NombreUsuario"=>$row->NombreUsuario,
            "Cliente"=>$row->Cliente,
            "Profesional"=>$row->Profesional,
            "FechaAsignacion" => $row->Fecha,
            "PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER"=>$permiso_remover,
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

    //459247889a7f2365b3348ff85895edba
    public function parDatosCProfesionalByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
                    ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //3deef6085db1a0b1abd40c6e92b19c7e
    public function parDatosCProfesionalByClientes(Request $request)
    {
        try {

            $clientes = DB::table('cliente AS c')
                ->select('c.IdCliente', 'c.NombreComercial', 'c.Nit')
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
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //acc6168636942bb045e10ab7f335e1cf
    public function parDatosCProfesionalByprofesionales(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUsuario' => 'required|string',
                'HashCliente' => 'required|string',
            ]);

            $idCliente = parent::CodeDescrypt($credentials['HashCliente']);
            $idUsuario = parent::CodeDescrypt($credentials['HashUsuario']);

            $profesionales = DB::select('SELECT * FROM `profesionales_cliente` AS pc
            WHERE pc.IdProfesionalesCliente NOT IN (SELECT puc.IdProfCliente FROM `par_usuario_profcliente` AS puc
                                WHERE puc.IdUsuario = ?)
            AND pc.IdCliente = ? ', [$idUsuario, $idCliente]);

            foreach ($profesionales as $profesional) {
                $profesional->IdProfesionalesCliente = parent::CodeEncrypt($profesional->IdProfesionalesCliente);
                $profesional->Hash = $profesional->IdProfesionalesCliente;
            }

            $data = [
                'profesionales' => $profesionales,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }

    }

    //dff83a8057100dbf8936c472f2903633
    public function parCrearUsuarioProfesionalCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parProfesionales' => 'required|array|min:1',
                'parProfesionales.*' => 'required|string|distinct',
                'parUsuario' => 'required|string',
                'parCliente' => 'required|string'
            ]);


            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $idCliente = parent::CodeDescrypt($credentials['parCliente']);
            $idProfesionales = [];
            foreach ($credentials['parProfesionales'] as $parProfesional) {
                $idProfesional = parent::CodeDescrypt($parProfesional);
                array_push($idProfesionales, $idProfesional);
            }

            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();
            $id=[];
            // dd($idEmpresa, $idUsuario);
            foreach ($idProfesionales as $idProfesional) {
                $idUE = DB::table('par_usuario_profcliente')
                ->insertGetId([
                    'IdUsuario'=>$idUsuario,
                    'IdCliente'=>$idCliente,
                    'IdProfCliente'=>$idProfesional,
                    'Fecha'=> date('Y-m-d h:i:s')
                ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_PROFESIONAL_CLIENTE_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario Cliente Producto realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //7e41145aa48edb3bb1438119f6a04e39
    public function parRemoverUsuarioProfesionalCliente(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuario_profcliente')
            ->where('Id', $id)
            ->delete();

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'PAR_USUARIO_PROFESIONAL_CLIENTE_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario - profesional cliente removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //--------------- Departamentos -------------------//
    //7493e1510790698a5bd63db664a457bb
    public function datosDepartamentos(Request $request)
    {
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  pdt.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  pdt.Estado = 1 ";
        }else{
            $sqlAdicional = "  pdt.Estado  in  (1,0) ";
        }

        $sqlFrom = "FROM par_departamento_trafico AS pdt WHERE"
        .$sqlAdicional;

        $sqlCampos = "DISTINCT pdt.Id, pdt.Nombre, pdt.Estado";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " AND (pdt.Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_DEPARTAMENTOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                . "FROM Usuario u "
                . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_DEPARTAMENTOS_ESTADO')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;

            if( count($PAR_DEPARTAMENTOS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Nombre"=>$row->Nombre,
            "Estado"=>$row->Estado,
            "PAR_DEPARTAMENTOS_ESTADO"=>$permiso_estado,
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

    //651b61798ae6ff5c2fd88b38bb6c2d30
    public function parCrearDepartamentos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parDepartamento' => 'required|string'
            ]);

            $departamento = $credentials['parDepartamento'];
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            // dd($idEmpresa, $idUsuario);
            $idUE = DB::table('par_departamento_trafico')
            ->insertGetId([
                'Nombre'=>$departamento,
                'Fecha'=>date('Y-m-d h:i:s'),
                'IdUsuario'=> $usuario[0]->IdUsuario
            ]);

            parent::queryLogAuditoria([$idUE], $usuario[0]->IdUsuario, 'PAR_DEPARTAMENTOS_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //ba35413d13397aba30871a0dc89ffe28
    public function parEstadoDepartamentos(Request $request)
    {
        try {
            $Credentials = $this->validate($request,[
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($Credentials['Hash']);

            $Estado = DB::SELECT("SELECT Estado FROM par_departamento_trafico WHERE Id = '".$id."';");
            $Query = "";
            if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
                $n = 0;
                if( $Estado[0]->Estado == 0 ){
                    $n = 1;
                }
                if(DB::UPDATE("UPDATE par_departamento_trafico set Estado = '$n' WHERE Id = '".$id."';")){

                    $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                    $id = addslashes($id);
                    $Query = "UPDATE par_departamento_trafico set Estado = '$n' WHERE IdUsuario = '".$id."';";
                    $Query = str_replace("'","~",$Query);
                    DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'PAR_DEPARTAMENTOS_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                    return response()->json(['success'=>'1', 'mensaje'=>'Estado del departamento cambiado Exitosamente']);

                }
            }
            return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'mensaje'=>'Error al cambiar de estado del departamento','Query'=>$Query]);

        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }



    //--------------- Usuarios Departamentos -------------------//
    //7405ff14fbe27bf97752c2af45cfc1ba
    public function datosUsuariosDepartamentos(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM asoc_usuario_departamento AS aud "
            ."JOIN usuario AS u ON aud.IdUsuario = u.IdUsuario "
            ."JOIN par_departamento_trafico AS pdt ON aud.IdDepto = pdt.Id ";

        $sqlCampos = "DISTINCT aud.Id, u.NombreUsuario As Usuario, pdt.Nombre AS Departamento ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (NombreUsuario like '%".$searchValue."%' or Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_DEPARTAMENTO_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_DEPARTAMENTO_REMOVER')");
        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;;

            if( count($PAR_USUARIO_DEPARTAMENTO_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Usuario"=>$row->Usuario,
            "Departamento"=>$row->Departamento,
            "PAR_USUARIO_DEPARTAMENTO_REMOVER"=>$permiso_remover,
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

    //8ad9e7d699f4369c0e743cb6ca35cc10
    public function parDatosDepartamentosByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
                    ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //7c065bd4443f2b9a655456db15e5936a
    public function parDatosDepartamentosByDepartamentos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt(intval($credentials['Hash']));

            $departamentos = DB::select('SELECT p.Id, p.Nombre From par_departamento_trafico AS p
                WHERE p.Id NOT IN (SELECT a.IdDepto FROM asoc_usuario_departamento AS a WHERE a.IdUsuario = ?) AND p.Estado = 1',
                [$idUsuario]);

            foreach ($departamentos as $departamento) {
                $departamento->Id = parent::CodeEncrypt($departamento->Id);
            }

            $data = [
                'departamentos' => $departamentos,
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

    //a58dc5fdab060121ae174bf4c621a4ad
    public function parCrearUsuariosDepartamentos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parDepartamentos' => 'required|array|min:1',
                'parDepartamentos.*' => 'required|string',
                'parUsuario' => 'required|string'
            ]);

            $idDepartamentos = [];

            foreach ($credentials['parDepartamentos'] as $departamento) {
                $idDepartamento = parent::CodeDescrypt(intval($departamento));
                array_push($idDepartamentos, $idDepartamento);
            }
            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = [];
            // dd($idEmpresa, $idUsuario);a
            foreach ($idDepartamentos as $idDepto) {
                $idUE = DB::table('asoc_usuario_departamento')
                ->insertGetId([
                    'IdUsuario'=> $idUsuario,
                    'idDepto' => $idDepto,
                    'Fecha'=>date('Y-m-d h:i:s'),
                ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_DEPARTAMENTO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //679f578d6540402c72d6e52c7209790b
    public function parRemoverUsuarioDepartamento(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('asoc_usuario_departamento')
            ->where('Id', $id)
            ->delete();

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'PAR_USUARIO_EMPRESA_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //--------------- Usuarios Responsables Departamento -------------------//
    //be932aeddc38361177e8ffb8158bf429
    public function datosResponsablesDepartamentos(Request $request)
    {
        $draw = $request['draw'];

        $sqlFrom = "FROM par_responsable_depto AS prd "
            ."JOIN usuario AS u ON prd.IdUsuario = u.IdUsuario "
            ."JOIN par_departamento_trafico AS pdt ON prd.IdDepto = pdt.Id ";

        $sqlCampos = "DISTINCT prd.Id, u.NombreUsuario AS Responsable, pdt.Nombre AS Departamento";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " WHERE (u.NombreUsuario like '%".$searchValue."%' or pdt.Nombre like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "Responsable"=>$row->Responsable,
            "Departamento"=>$row->Departamento,
            "PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER"=>$permiso_remover,
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

    //f287b15940c57cc2e92756185a857780
    public function parDatosResponsablesDepartamentosByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
                    ->orderBy('NombreUsuario','ASC')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //24c37faf929cd7cdb65a654597f1239a
    public function parDatosResponsablesDepartamentosByDepartamentos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt(intval($credentials['Hash']));

            $departamentos = DB::select('SELECT p.Id, p.Nombre From par_departamento_trafico AS p
                WHERE p.Id NOT IN (SELECT a.IdDepto FROM par_responsable_depto AS a WHERE a.IdUsuario = ?) AND p.Estado = 1',
                [$idUsuario]);

            foreach ($departamentos as $departamento) {
                $departamento->Id = parent::CodeEncrypt($departamento->Id);
            }

            $data = [
                'departamentos' => $departamentos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //43750f687cbee2131256ccf02480f265
    public function parCrearResponsablesDepartamentos(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parDepartamentos' => 'required|array|min:1',
                'parDepartamentos.*' => 'required|string',
                'parUsuario' => 'required|string'
            ]);

            $idDepartamentos = [];

            foreach ($credentials['parDepartamentos'] as $departamento) {
                $idDepartamento = parent::CodeDescrypt(intval($departamento));
                array_push($idDepartamentos, $idDepartamento);
            }

            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = [];
            // dd($idEmpresa, $idUsuario);a
            foreach ($idDepartamentos as $idDepto) {
                $idUE = DB::table('par_responsable_depto')
                ->insertGetId([
                    'IdUsuario'=> $idUsuario,
                    'idDepto' => $idDepto,
                    'Fecha'=>date('Y-m-d h:i:s'),
                ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //cc01d0a70f71f7c03516569e87b2313b
    public function parRemoverResponsableDepartamento(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_responsable_depto')
            ->where('Id', $id)
            ->delete();

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'PAR_USUARIO_RESPONSABLE_DEPARTAMENTO_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }


    //--------------- Usuarios Asignados -------------------//
    //14c8fccec3f602542538211b8f3d2af9
    public function datosAsignadosUsuario(Request $request)
    {
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( intval($request['search']['usuario']) != -1 ){
            $idUsuarioP = parent::CodeDescrypt($request['search']['usuario']);
            $sqlAdicional = "  pua.IdUsuarioP = ".$idUsuarioP;
        }

        $sqlFrom = "FROM par_usuario_asignados AS pua "
            ."JOIN usuario AS u ON pua.IdUsuarioP = u.IdUsuario "
            ."JOIN par_departamento_trafico AS pdt ON pua.IdDepto = pdt.Id "
            ."JOIN usuario AS ua ON pua.IdAsignado = ua.IdUsuario "
                . "WHERE 1 = 1 ";

        $sqlCampos = "DISTINCT pua.Id, u.NombreUsuario AS UsuarioP, ua.NombreUsuario AS Asignado, pdt.Nombre AS Departamento";
        //$sqlCampos = "DISTINCT pua.Id, u.IdUsuario, u.Usuario, "
        //."u.NombreUsuario, ua.Nombre AS Departamento, DATE(pua.Fecha) as Fecha";

        $searchQuery = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = "AND (ua.NombreUsuario like '%".$searchValue."%' or u.NombreUsuario like '%".$searchValue."%' or pdt.Nombre like '%".$searchValue."%')";
            //$searchQuery = "WHERE (UsuarioP like '%".$searchValue."%' or Asignado like '%".$searchValue."%' or Departamento like '%".$searchValue."%') ";
        }

        if ($sqlAdicional != "") {
            $sqlFrom = $sqlFrom.'  '.$sqlAdicional;
            if ($searchQuery != "") {
                $sqlFrom = $sqlFrom.' AND '.$searchQuery;
            }
        } else {
            if ($searchQuery != "") {
                $sqlFrom = $sqlFrom.'  '.$searchQuery;
            }
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $PAR_USUARIO_ASIGNADO_REMOVER = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_USUARIO_ASIGNADO_REMOVER')");

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_remover = 0;

            if( count($PAR_USUARIO_ASIGNADO_REMOVER) == 1 ){
                $permiso_remover = 1;
            }

            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->Id),
            "UsuarioP"=>$row->UsuarioP,
            "Asignado"=>$row->Asignado,
            "Departamento"=>$row->Departamento,
            "PAR_USUARIO_ASIGNADO_REMOVER"=>$permiso_remover,
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

    //b826ea5a05c8f6324c8b89604f3b6781
    public function parDatosAsignadosByUsuario()
    {
        try {
            $usuarios = DB::table('usuario')
            ->select('IdUsuario', 'NombreUsuario AS Usuario', 'Token')
            ->where('Estado',1)
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //477ed388160b9a6d8a018362e2103ca0
    public function parDatosAsignadosByDepartamentos()
    {
        try {
            $departamentos = DB::table('par_departamento_trafico')
            ->where('Estado', 1)
            ->get();

            foreach ($departamentos as $departamento) {
                $departamento->Id = parent::CodeEncrypt($departamento->Id);
            }

            $data = [
                'departamentos' => $departamentos,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //5637d9d72a015ed42079e7b74e736ade
    public function parDatosUsuariosPadre()
    {
        try {
            $usuarios = DB::table('usuario AS u')
            ->join('par_usuario_asignados AS pua', 'u.IdUsuario', '=', 'pua.IdUsuarioP')
            ->where('u.Estado', 1)
            ->select('u.IdUsuario', 'u.Usuario', 'u.NombreUsuario')
            ->distinct()
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->IdUsuario = parent::CodeEncrypt($usuario->IdUsuario);
            }

            $data = [
                'usuarios' => $usuarios,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //78b74c2a9598df315ab342b16df29c29
    public function parDatosAsignadosByAsignados(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'HashUsuario' => 'required|string',
                'HashDepartamento' => 'required|string'
            ]);

            $idUsuario = parent::CodeDescrypt(intval($credentials['HashUsuario']));
            $idDepartamento = parent::CodeDescrypt(intval($credentials['HashDepartamento']));

            $usuariosA = DB::select('SELECT u.IdUsuario, u.NombreUsuario AS Usuario FROM usuario AS u WHERE u.IdUsuario IN (
                SELECT aud.IdUsuario FROM asoc_usuario_departamento AS aud
                    WHERE aud.IdUsuario NOT IN (
                        SELECT pua.IdAsignado FROM par_usuario_asignados AS pua
                        WHERE pua.IdUsuarioP = ? AND pua.IdDepto = ?
                    ) AND aud.IdDepto = ?
                ) AND u.Estado = ?',
                [$idUsuario, $idDepartamento, $idDepartamento, 1]);

            foreach ($usuariosA as $asignado) {
                $asignado->IdUsuario = parent::CodeEncrypt($asignado->IdUsuario);
            }

            $data = [
                'Asignados' => $usuariosA,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //3d17460ae6e4b551ed208da3f9388655
    public function parCrearAsignadosUsuario(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'parUsuario' => 'required|string',
                'parDepartamento' => 'required|string',
                'parAsignados' => 'required|array|min:1',
                'parAsignados.*' => 'required|string'
            ]);

            $idAsignados = [];

            foreach ($credentials['parAsignados'] as $asignado) {
                $idAsignado = parent::CodeDescrypt(intval($asignado));
                array_push($idAsignados, $idAsignado);
            }

            $idUsuario = parent::CodeDescrypt($credentials['parUsuario']);
            $idDepartamento = parent::CodeDescrypt($credentials['parDepartamento']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            $id = [];
            // dd($idEmpresa, $idUsuario);a
            foreach ($idAsignados as $idAsignado) {
                $idUE = DB::table('par_usuario_asignados')
                ->insertGetId([
                    'IdUsuarioP'=> $idUsuario,
                    'idDepto' => $idDepartamento,
                    'idAsignado' => $idAsignado,
                    'FechaHora'=>date('Y-m-d h:i:s'),
                    'IdUser'=>$usuario[0]->IdUsuario,
                ]);
                array_push($id, $idUE);
            }

            parent::queryLogAuditoria($id, $usuario[0]->IdUsuario, 'PAR_USUARIO_ASIGNADO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'Nuevo asigancion Usuario empresa realizada exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }

    //1618155af321a3be34f87347457fc773
    public function parRemoverAsignadoUsuario(Request $request)
    {
        try {
            // dd($request['Hash']);
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('par_usuario_asignados')
            ->where('Id', $id)
            ->delete();

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'PAR_USUARIO_ASIGNADO_REMOVER');

            DB::commit();
            DB::disableQueryLog();

            return response()->json(['success'=>true, 'mensaje'=>'relacion usuario empresa removido exitosamente'], 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }
    
    //e22307191e73517599afb28028eccae3
    public function parListarEmpleados(Request $request)
    {
        try {

            $Data = DB::select('SELECT p.IdEmpleado as Id,
                CONCAT(p.Nombre1, " ", p.Nombre2, " ", p.Apellido1, " ", p.Apellido2 ) as NombreCompleto 
                FROM Empleado p 
                WHERE p.estado = 1 AND 
                p.IdEmpleado not in (
                SELECT u.IdPersona 
                FROM Usuario u WHERE u.IdTipoUsuario = "1" )');

            foreach ($Data as $asignado) {
                $asignado->Id = parent::CodeEncrypt($asignado->Id);
            }

            $data = [
                'Empleados' => $Data,
                'success' => true
            ];

            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalException($th);
            return response()->json($data, 200);
        }
    }
}
