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
namespace App\Http\Controllers\Process\Parametrizacion;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

Use Illuminate\Database\Seeder;
Use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class GeneralesController extends Controller{
    //put your code here

    public function par_data_pais(Request $request){

        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  estado = 1 ";
        }else{
            $sqlAdicional = "  estado in  (1,0) ";
        }
        $sqlFrom = "FROM "
                . "Par_Pais dle  where "
                .$sqlAdicional;

        $sqlCampos = "IdPais, Nombre, Moneda, SiglasPais, SiglasMoneda, Hash, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (nombre like '%".$searchValue."%' or
                moneda like '%".$searchValue."%' or
                SiglasPais like '%".$searchValue."%' or
                SiglasMoneda like'%".$searchValue."%' ) ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_PAIS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_PAIS_ESTADO')");
        $PAR_GENERALES_PAIS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_PAIS_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_PAIS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_PAIS_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "IdPais"=>($row->IdPais),
              "Nombre"=>$row->Nombre,
              "Moneda"=>$row->Moneda,
              "SiglasPais"=>$row->SiglasPais,
              "SiglasMoneda"=>$row->SiglasMoneda,
              "Hash"=>$row->Hash,
              "PAR_GENERALES_PAIS_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_PAIS_EDITAR"=>$permiso_editar,
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

    public function par_data_departamentos(Request $request){

        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  d.estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  d.estado = 1 ";
        }else{
            $sqlAdicional = "  d.estado in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Departamento d "
                    . "INNER JOIN Par_Pais p on p.IdPais = d.IdPais where "
                .$sqlAdicional;

        $sqlCampos = "d.Hash , d.Nombre as Depto, p.nombre as Pais, d.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (d.Nombre like '%".$searchValue."%' or
                p.nombre like '%".$searchValue."%'  ) ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_DEPARTAMENTOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_DEPARTAMENTOS_ESTADO')");
        $PAR_GENERALES_DEPARTAMENTOS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_DEPARTAMENTOS_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_DEPARTAMENTOS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_DEPARTAMENTOS_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>($row->Hash),
              "Depto"=>$row->Depto,
              "Pais"=>$row->Pais,
              "PAR_GENERALES_DEPARTAMENTOS_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_DEPARTAMENTOS_EDITAR"=>$permiso_editar,
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

    public function par_data_ciudades(Request $request){

        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  c.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  c.Estado = 1 ";
        }else{
            $sqlAdicional = "  c.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Ciudad c "
                    . "INNER JOIN Par_Departamento d on c.IdDepto = d.IdDepartamento "
                    . "INNER JOIN Par_Pais p on d.IdPais = p.IdPais Where "
                .$sqlAdicional;

        $sqlCampos = "c.nombre as Ciudad, c.Hash, d.Nombre as Departamento, p.nombre as Pais, c.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (c.Nombre like '%".$searchValue."%' or
                d.nombre like '%".$searchValue."%' or  p.nombre like '%".$searchValue."%' ) ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENEARLES_CIUDADES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENEARLES_CIUDADES_ESTADO')");
        $PAR_GENERALES_CIUDADES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_CIUDADES_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENEARLES_CIUDADES_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_CIUDADES_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>($row->Hash),
              "Departamento"=>$row->Departamento,
              "Ciudad"=>$row->Ciudad,
              "Pais"=>$row->Pais,
              "PAR_GENEARLES_CIUDADES_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_CIUDADES_EDITAR"=>$permiso_editar,
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

    public function index(){
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.parametrizacion.generales');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }
    
    
    public function indexParam(){
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.parametrizacion.parametrizacion');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_pais_new(){
        $Credentials = $this->validate(request(),[
           'ParPaisNombre' => 'required|string',
           'ParPaisSiglasPais' => 'required|string',
           'ParPaisMoneda' => 'required|string',
           'ParPaisSiglasMoneda' => 'required|string'
        ]);
        if( DB::INSERT("INSERT into par_pais (Nombre,Moneda,Siglaspais,siglasmoneda,Estado)"
                . "values ('".addslashes($Credentials['ParPaisNombre'])."', '".addslashes($Credentials['ParPaisMoneda'])."',"
                . "'".addslashes($Credentials['ParPaisSiglasPais'])."', '".addslashes($Credentials['ParPaisSiglasMoneda'])."', 1);")){

            $id = DB::getPdo()->lastInsertId();
            $Hash = Hash::make($id);
            $Hash = str_replace("$", "", $Hash);
            $Hash = str_replace(".", "", $Hash);
            $Hash = str_replace("/", "", $Hash);
            DB::UPDATE("UPDATE par_pais set hash = '$Hash' where IdPais = $id");

            return redirect()->route('7a55d71f10b208cb395561ea28779875');
        }
    }

    public function par_pais_edit(){
        $Credentials = $this->validate(request(),[
           'ParPaisNombre' => 'required|string',
           'ParPaisSiglasPais' => 'required|string',
           'ParPaisMoneda' => 'required|string',
           'ParPaisSiglasMoneda' => 'required|string',
           'Hash' => 'required|string'
        ]);

        DB::UPDATE("UPDATE par_pais set Nombre = '".addslashes($Credentials['ParPaisNombre'])."',"
                . "Moneda = '". addslashes($Credentials['ParPaisMoneda'])."', SiglasPais = '".addslashes($Credentials['ParPaisSiglasPais'])."',"
                . "SiglasMoneda = '".addslashes($Credentials['ParPaisSiglasMoneda'])."', estado = 1 WHERE Hash = '".escapeshellcmd($Credentials['Hash'])."' ;");
        return redirect()->route('7a55d71f10b208cb395561ea28779875');

    }

    public function par_estado_pais(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Estado = DB::SELECT("SELECT Estado FROM Par_Pais WHERE Hash = '".$Credentials['Hash']."';");
        if( count($Estado) != 0 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            DB::UPDATE("UPDATE par_pais set Estado = $n WHERE Hash = '".addslashes($Credentials['Hash'])."'");
            return response()->json(['success'=>'1']);
        }
        return response()->json(['success'=>'0']);
    }

    public function par_ListarPais(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
                . "FROM Par_Pais "
                . "WHERE Estado = 1 "
                . "ORDER BY Estado Asc");
        $TipoEmpresa = DB::SELECT("SELECT Id,Nombre "
                . "FROM par_tipoempresa "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre ASC");
        
        
        if( $Paises ){
            return response()->json(['Paises'=>$Paises,'TipoEmpresa'=>$TipoEmpresa]);
        }
        return response()->json(['Error'=>'1']);
    }

    public function par_depto_new(){
        $Credentials = $this->validate(request(),[
           'ParPaisDepto' => 'required|string',
           'ParNombreDepto' => 'required|string'
        ]);
        if( DB::INSERT("INSERT into par_departamento (Nombre,IdPais) "
            . "SELECT '".addslashes($Credentials['ParNombreDepto'])."' as Depto, IdPais "
                . "FROM Par_Pais "
                . "WHERE Hash = '".addslashes($Credentials['ParPaisDepto'])."';")){

            $id = DB::getPdo()->lastInsertId();
            $Hash = Hash::make("Departamento".$id);
            $Hash = str_replace("$", "", $Hash);
            $Hash = str_replace(".", "", $Hash);
            $Hash = str_replace("/", "", $Hash);
            DB::UPDATE("UPDATE par_departamento set hash = '$Hash' where IdDepartamento = $id");

            return redirect()->route('7a55d71f10b208cb395561ea28779875');
        }
    }

    public function par_depto_edit(){
        $Credentials = $this->validate(request(),[
           'ParPais' => 'required|string',
           'ParNombreDepto' => 'required|string',
           'Hash' => 'required|string'
        ]);

        if(DB::UPDATE("UPDATE par_departamento set Nombre = '".addslashes($Credentials['ParNombreDepto'])."' "
                . "WHERE Hash = '".addslashes($Credentials['Hash'])."' ;")){
            return redirect()->route('7a55d71f10b208cb395561ea28779875');
        }
    }

    public function par_estado_depto(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Estado = DB::SELECT("SELECT Estado FROM Par_Departamento WHERE Hash = '".$Credentials['Hash']."';");
        if( count($Estado) != 0 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            DB::UPDATE("UPDATE par_departamento set Estado = $n WHERE Hash = '".addslashes($Credentials['Hash'])."'");
            return response()->json(['success'=>'1']);
        }
        return response()->json(['success'=>'0']);
    }

    public function par_ListarDepto(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Deptos = DB::SELECT("SELECT d.Hash, d.IdDepartamento, d.Nombre "
                . "FROM Par_Departamento d "
                . "INNER JOIN Par_Pais p on d.IdPais = p.IdPais "
                . "WHERE p.Hash = '".addslashes($Credentials['Hash'])."' and d.estado = 1 "
                . "ORDER BY d.Nombre Asc");
        if( $Deptos ){
            return response()->json(['Deptos'=>$Deptos]);
        }
        return response()->json(['Error'=> '1']);
    }

    public function par_GneralListarDepto(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Deptos = DB::SELECT("SELECT d.Hash, d.IdDepartamento, d.Nombre "
                . "FROM Par_Departamento d "
                . "INNER JOIN Par_Pais p on d.IdPais = p.IdPais "
                . "WHERE p.IdPais = '".addslashes($Credentials['Hash'])."' and d.estado = 1 "
                . "ORDER BY d.Nombre Asc");
        if( $Deptos ){
            return response()->json(['Deptos'=>$Deptos]);
        }
        return response()->json(['Error'=> '1']);
    }

    public function par_ListarCiudad(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Deptos = DB::SELECT("SELECT d.IdCiudad, d.Nombre "
                . "FROM Par_Ciudad d "
                . "WHERE IdDepto = '".addslashes($Credentials['Hash'])."'"
                . "ORDER BY d.Nombre Asc");
        if( $Deptos ){
            return response()->json(['Deptos'=>$Deptos]);
        }
        return response()->json(['Error'=> '1']);
    }

    public function par_ciudad_new(){
        $Credentials = $this->validate(request(),[
           'ParPaisList' => 'required|string',
           'ParDeptoList' => 'required|string',
           'ParNombreCiudad' => 'required|string'
        ]);
        if( DB::INSERT("INSERT into par_ciudad (Nombre,IdDepto) "
            . "SELECT '".addslashes($Credentials['ParNombreCiudad'])."' as Ciudad, d.IdDepartamento "
                . "FROM Par_Departamento d "
                . "WHERE d.Hash = '".addslashes($Credentials['ParDeptoList'])."';")){

            $id = DB::getPdo()->lastInsertId();
            $Hash = Hash::make("Ciudad".$id);
            $Hash = str_replace("$", "", $Hash);
            $Hash = str_replace(".", "", $Hash);
            $Hash = str_replace("/", "", $Hash);
            DB::UPDATE("UPDATE par_ciudad set hash = '$Hash' where IdCiudad = $id");

            return redirect()->route('7a55d71f10b208cb395561ea28779875');
        }
    }

    public function par_estado_ciudad(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Estado = DB::SELECT("SELECT Estado FROM Par_Ciudad WHERE Hash = '".$Credentials['Hash']."';");
        if( count($Estado) != 0 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            DB::UPDATE("UPDATE par_ciudad set Estado = $n WHERE Hash = '".addslashes($Credentials['Hash'])."'");
            return response()->json(['success'=>'1']);
        }
        return response()->json(['success'=>'0']);
    }
    public function par_ciudad_edit(){
        $Credentials = $this->validate(request(),[
           'ParPais' => 'required|string',
           'ParDepartamento' => 'required|string',
           'ParNombreCiudad' => 'required|string',
           'Hash' => 'required|string'
        ]);

        if(DB::UPDATE("UPDATE par_ciudad set Nombre = '".addslashes($Credentials['ParNombreCiudad'])."' "
                . "WHERE Hash = '".addslashes($Credentials['Hash'])."' ;")){
            return redirect()->route('7a55d71f10b208cb395561ea28779875');
        }
    }

    //----------------------------------------------------------------//
    //----------------------- Nomina --------------------------------//
    //--------------------------------------------------------------//

    //--------------------- Salario Minimo ------------------------//
    //24bbd7ab604456ba2fd41896cd08544d
    public function par_data_salario_minimo(Request $request){

        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = " smlv.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = " smlv.Estado = 1 ";
        }else{
            $sqlAdicional = " smlv.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_salario_minimo smlv where"
                .$sqlAdicional;

        $sqlCampos = "smlv.IdSalarioMinimo as Id, smlv.Year, smlv.Salario, smlv.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (smlv.Year like '%".$searchValue."%' or
                smlv.Salario like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_SALARIO_MINIMO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_SALARIO_MINIMO_ESTADO')");
        $PAR_GENERALES_SALARIO_MINIMO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_SALARIO_MINIMO_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_SALARIO_MINIMO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_SALARIO_MINIMO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>(parent::CodeEncrypt($row->Id)),
              "Year"=>$row->Year,
              "Salario"=>$row->Salario,
              "PAR_GENERALES_SALARIO_MINIMO_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_SALARIO_MINIMO_EDITAR"=>$permiso_editar,
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

    //64c545d346f6e3d192cd2516f9b92491
    public function par_salario_minimo_new(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parSalario' => 'required|numeric',
                'parYear' => 'required|integer'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::enableQueryLog();
            DB::beginTransaction();

            $lastId = DB::table('par_salario_minimo')
                ->insertGetId([
                    'Year' => $credentials['parYear'],
                    'Salario' => $credentials['parSalario'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$lastId], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_SALARIO_MINIMO_CREAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Nuevo Salario Agregado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //7219544f290202465b7b46ba7859c395
    public function par_salario_minimo_edit(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parSalario' => 'required|numeric',
                'parYear' => 'required|integer',
                'Hash' => 'required|string'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idSalarioMinimo = parent::CodeDescrypt($credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('par_salario_minimo')
                ->where('IdSalarioMinimo', $idSalarioMinimo)
                ->update([
                    'Year' => $credentials['parYear'],
                    'Salario' => $credentials['parSalario'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$idSalarioMinimo], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_SALARIO_MINIMO_EDITAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Nuevo Salario Agregado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //cc48ef2bf47a8f91c6b6c0dac1c59f79
    public function par_estado_salario_minimo(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);

        $idSalarioMinimo = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $Estado = DB::SELECT("SELECT Estado FROM par_salario_minimo WHERE IdSalarioMinimo = '".$idSalarioMinimo."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_salario_minimo set Estado = '$n' WHERE IdSalarioMinimo = '".$idSalarioMinimo."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE par_salario_minimo set Estado = '$n' WHERE IdSalarioMinimo = '".$idSalarioMinimo."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idSalarioMinimo.",'PAR_GENERALES_SALARIO_MINIMO_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    //--------------------- Salario Integral ------------------------//
    //969d78052d4d99fc2f006b7cc839cb7c
    public function par_data_salario_integral(Request $request){

        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = " si.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = " si.Estado = 1 ";
        }else{
            $sqlAdicional = " si.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_salario_integral si where"
                .$sqlAdicional;

        $sqlCampos = "si.IdSalarioIntegral as Id, si.Year, si.Salario, si.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (si.Year like '%".$searchValue."%' or
                si.Salario like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_SALARIO_INTEGRAL_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_SALARIO_INTEGRAL_ESTADO')");
        $PAR_GENERALES_SALARIO_INTEGRAL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_SALARIO_INTEGRAL_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_SALARIO_INTEGRAL_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_SALARIO_INTEGRAL_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>(parent::CodeEncrypt($row->Id)),
              "Year"=>$row->Year,
              "Salario"=>$row->Salario,
              "PAR_GENERALES_SALARIO_INTEGRAL_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_SALARIO_INTEGRAL_EDITAR"=>$permiso_editar,
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

    //57b1c23d597b1de55f85b10833b2d45a
    public function par_salario_integral_new(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parSalario' => 'required|numeric',
                'parYear' => 'required|integer'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::enableQueryLog();
            DB::beginTransaction();

            $lastId = DB::table('par_salario_integral')
                ->insertGetId([
                    'Year' => $credentials['parYear'],
                    'Salario' => $credentials['parSalario'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$lastId], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_SALARIO_INTEGRAL_CREAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Nuevo Salario Integral Agregado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //a2451a043a60906ecc5585d12e9e9417
    public function par_salario_integral_edit(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parSalario' => 'required|numeric',
                'parYear' => 'required|integer',
                'Hash' => 'required|string'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idSalarioIntegral = parent::CodeDescrypt($credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('par_salario_integral')
                ->where('IdSalarioIntegral', $idSalarioIntegral)
                ->update([
                    'Year' => $credentials['parYear'],
                    'Salario' => $credentials['parSalario'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$idSalarioIntegral], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_SALARIO_INTEGRAL_EDITAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Salario Modificado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //a1c0fd0f034c1da754d0df260f6ec314
    public function par_estado_salario_integral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
         ]);

         $idSalarioIntegral = (new Controller)->CodeDescrypt($Credentials['Hash']);

         $Estado = DB::SELECT("SELECT Estado FROM par_salario_integral WHERE IdSalarioIntegral = '".$idSalarioIntegral."'");
         $Query = "";
         if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
             $n = 0;
             if( $Estado[0]->Estado == 0 ){
                 $n = 1;
             }
             if(DB::UPDATE("UPDATE par_salario_integral set Estado = '$n' WHERE IdSalarioIntegral = '".$idSalarioIntegral."';")){

                 $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                 $Query = "UPDATE par_salario_integral set Estado = '$n' WHERE IdSalarioIntegral = '".$idSalarioIntegral."';";

                 DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                         . "".$idSalarioIntegral.",'PAR_GENERALES_SALARIO_INTEGRAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                 return response()->json(['success'=>'1']);

             }
         }
         return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    //--------------------- Monetizacion Sena ------------------------//
    //e98252ea82fdf222ccbdc0b2c437a7f6
    public function par_data_monetizacion_sena(Request $request){

        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = " ms.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = " ms.Estado = 1 ";
        }else{
            $sqlAdicional = " ms.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_monetizacion_sena ms where"
                .$sqlAdicional;

        $sqlCampos = "ms.IdMonetizacionSena as Id, ms.Year, ms.Monetizacion, ms.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (ms.Year like '%".$searchValue."%' or
                ms.Monetizacion like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_MONETIZACION_SENA_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_MONETIZACION_SENA_ESTADO')");
        $PAR_GENERALES_MONETIZACION_SENA_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_MONETIZACION_SENA_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_MONETIZACION_SENA_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_MONETIZACION_SENA_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>(parent::CodeEncrypt($row->Id)),
              "Year"=>$row->Year,
              "Monetizacion"=>$row->Monetizacion,
              "PAR_GENERALES_MONETIZACION_SENA_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_MONETIZACION_SENA_EDITAR"=>$permiso_editar,
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

    //77c2c6bcf33ba19d76cfa09d019410a8
    public function par_monetizacion_sena_new(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parMonetizacion' => 'required|numeric',
                'parYear' => 'required|integer'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::enableQueryLog();
            DB::beginTransaction();

            $lastId = DB::table('par_monetizacion_sena')
                ->insertGetId([
                    'Year' => $credentials['parYear'],
                    'Monetizacion' => $credentials['parMonetizacion'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$lastId], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_MONETIZACION_SENA_CREAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Nueva Monetizacion SENA Agregada Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //61da78447074452908c95a840cea17a0
    public function par_monetizacion_sena_edit(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parMonetizacion' => 'required|numeric',
                'parYear' => 'required|integer',
                'Hash' => 'required|string'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idMonetizacion = parent::CodeDescrypt($credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('par_monetizacion_sena')
                ->where('IdMonetizacionSena', $idMonetizacion)
                ->update([
                    'Year' => $credentials['parYear'],
                    'Monetizacion' => $credentials['parMonetizacion'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$idMonetizacion], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_MONETIZACION_SENA_EDITAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Salario Modificado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //096e23fbd6989da0bcb89b90c0ea4523
    public function par_estado_monetizacion_sena(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
        ]);

        $idMonetizacion = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $Estado = DB::SELECT("SELECT Estado FROM par_monetizacion_sena WHERE IdMonetizacionSena = '".$idMonetizacion."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_monetizacion_sena set Estado = '$n' WHERE IdMonetizacionSena = '".$idMonetizacion."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE par_monetizacion_sena set Estado = '$n' WHERE IdMonetizacionSena = '".$idMonetizacion."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idMonetizacion.",'PAR_GENERALES_MONETIZACION_SENA_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }


    //--------------------- Auxilio de transporte ------------------------//
    //e9fc13910b60f7b0c225e8f1c0e8a4b3
    public function par_data_auxilio_transporte(Request $request){

        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = " at.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = " at.Estado = 1 ";
        }else{
            $sqlAdicional = " at.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_auxilio_transporte at where"
                .$sqlAdicional;

        $sqlCampos = "at.IdAuxilioTransporte as Id, at.Year, at.Auxilio, at.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (at.Year like '%".$searchValue."%' or
                at.Auxilio like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO')");
        $PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=>(parent::CodeEncrypt($row->Id)),
              "Year"=>$row->Year,
              "Auxilio"=>$row->Auxilio,
              "PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO"=>$permiso_estado,
              "PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR"=>$permiso_editar,
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

    //05fe21ed95c999846f15f957d54c8f70
    public function par_auxilio_transporte_new(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parAuxilio' => 'required|numeric',
                'parYear' => 'required|integer'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::enableQueryLog();
            DB::beginTransaction();

            $lastId = DB::table('par_auxilio_transporte')
                ->insertGetId([
                    'Year' => $credentials['parYear'],
                    'Auxilio' => $credentials['parAuxilio'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$lastId], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_AUXILIO_TRANSPORTE_CREAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Nuevo Auxilio de Transporte Agregada Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //f79fec29b03ac6dd82b3b127d0fefe7b
    public function par_auxilio_transporte_edit(Request $request){
        try {
            $credentials = $this->validate($request, [
                'parAuxilio' => 'required|numeric',
                'parYear' => 'required|integer',
                'Hash' => 'required|string'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idAuxilio = parent::CodeDescrypt($credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('par_auxilio_transporte')
                ->where('IdAuxilioTransporte', $idAuxilio)
                ->update([
                    'Year' => $credentials['parYear'],
                    'Auxilio' => $credentials['parAuxilio'],
                    'IdUsuario' => $IdUsuario[0]->IdUsuario,
                    'FechaHora' => date("Y-m-d H:i:s")
                ]);

            parent::queryLogAuditoria([$idAuxilio], $IdUsuario[0]->IdUsuario, 'PAR_GENERALES_AUXILIO_TRANSPORTE_EDITAR');
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'message' => 'Auxilio Modificado Exitosamente',
                'success' => true,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 200);
            // return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //0fcded35fd585d648c34cb2dfebd1816
    public function par_estado_auxilio_transporte(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
        ]);

        $idAuxilio = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $Estado = DB::SELECT("SELECT Estado FROM par_auxilio_transporte WHERE IdAuxilioTransporte = '".$idAuxilio."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_auxilio_transporte set Estado = '$n' WHERE IdAuxilioTransporte = '".$idAuxilio."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE par_auxilio_transporte set Estado = '$n' WHERE IdAuxilioTransporte = '".$idAuxilio."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idAuxilio.",'PAR_GENERALES_AUXILIO_TRANSPORTE_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    //----------------- assets -------------------- //
    //e0bdc3b8a5d5b551919c2667263d6989
    public function par_list_year(){
        try {
            $Inicio = 2019;
            $year = Array();
            for($i = $Inicio; $i <= (date("Y")+1);$i++){
                array_push($year,$i);
            }
            $data = [
                'years' => $year,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'error' => $th,
                'success' => false
            ], 500);
        }
    }
}
