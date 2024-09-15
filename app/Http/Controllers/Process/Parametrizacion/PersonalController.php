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
use Illuminate\Http\Request;

Use Illuminate\Database\Seeder;
Use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
Use Illuminate\Database\QueryException;


class PersonalController extends Controller{
    //put your code here

    public function par_data_TipoDocumento(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Persona_Tipo_Documento Where "
                .$sqlAdicional;

        $sqlCampos = "IdTipoDocumento as Id, Nombre, Estado, Siglas ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' or Siglas like '%".$searchValue."%' ) ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_TIPOS_DOCUMENTOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_TIPOS_DOCUMENTOS_ESTADO')");
        $PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_TIPOS_DOCUMENTOS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Siglas"=>$row->Siglas,
              "PAR_PERSONAL_TIPOS_DOCUMENTOS_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR"=>$permiso_editar,
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

    public function par_data_Eps(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Eps Where "
                .$sqlAdicional;

        $sqlCampos = "IdEps as Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_EPS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_EPS_ESTADO')");
        $PAR_PERSONAL_EPS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_EPS_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_EPS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_EPS_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_EPS_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_EPS_EDITAR"=>$permiso_editar,
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

    public function par_data_Arl(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_ARL Where "
                .$sqlAdicional;

        $sqlCampos = "IdArl as Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_ARL_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_ARL_ESTADO')");
        $PAR_PERSONAL_ARL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_ARL_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_ARL_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_ARL_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_ARL_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_ARL_EDITAR"=>$permiso_editar,
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

    public function par_data_FC(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Fondo_Cesantias Where "
                .$sqlAdicional;

        $sqlCampos = "IdFC as Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_FONDO_CESANTIAS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_FONDO_CESANTIAS_ESTADO')");
        $PAR_PERSONAL_FONDO_CESANTIAS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_FONDO_CESANTIAS_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_FONDO_CESANTIAS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_FONDO_CESANTIAS_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_FONDO_CESANTIAS_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_FONDO_CESANTIAS_EDITAR"=>$permiso_editar,
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

    public function par_data_FP(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Fondo_Pensiones Where "
                .$sqlAdicional;

        $sqlCampos = "IdFP as Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_FONDO_PENSIONES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_FONDO_PENSIONES_ESTADO')");
        $PAR_PERSONAL_FONDO_PENSIONES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_FONDO_PENSIONES_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_FONDO_PENSIONES_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_FONDO_PENSIONES_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_FONDO_PENSIONES_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_FONDO_PENSIONES_EDITAR"=>$permiso_editar,
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

    public function par_data_CC(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Caja_Compensacion Where "
                .$sqlAdicional;

        $sqlCampos = "IdCC as Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_CAJA_COMPENSACION_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_CAJA_COMPENSACION_ESTADO')");
        $PAR_PERSONAL_CAJA_COMPENSACION_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_CAJA_COMPENSACION_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_CAJA_COMPENSACION_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_CAJA_COMPENSACION_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_CAJA_COMPENSACION_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_CAJA_COMPENSACION_EDITAR"=>$permiso_editar,
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

    public function par_data_DL(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Documentos_Legales_Empleado Where "
                .$sqlAdicional;

        $sqlCampos = "Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_DOCUMENTOS_LEGALES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_DOCUMENTOS_LEGALES_ESTADO')");
        $PAR_PERSONAL_DOCUMENTOS_LEGALES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_DOCUMENTOS_LEGALES_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_DOCUMENTOS_LEGALES_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_DOCUMENTOS_LEGALES_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_DOCUMENTOS_LEGALES_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_DOCUMENTOS_LEGALES_EDITAR"=>$permiso_editar,
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

    public function par_data_TR(Request $request){
        $draw = $request['draw'];


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Tipo_Retiro Where "
                .$sqlAdicional;

        $sqlCampos = "Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_PERSONAL_TIPOS_RETIRO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_TIPOS_RETIRO_ESTADO')");
        $PAR_PERSONAL_TIPOS_RETIRO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_TIPOS_RETIRO_EDITAR')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_PERSONAL_TIPOS_RETIRO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PERSONAL_TIPOS_RETIRO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PERSONAL_TIPOS_RETIRO_ESTADO"=>$permiso_estado,
              "PAR_PERSONAL_TIPOS_RETIRO_EDITAR"=>$permiso_editar,
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

            $FPensiones = DB::SELECT("SELECT IdFP as Id, Nombre, Estado "
                . "FROM Par_Fondo_Pensiones "
                . "ORDER BY Estado Asc");


            $Cc = DB::SELECT("SELECT IdCC as Id, Nombre, Estado "
                . "FROM Par_Caja_Compensacion "
                . "ORDER BY Estado Asc");

            $Doc = DB::SELECT("SELECT IdTipoDocumento as Id, Nombre, Estado, Siglas "
                . "FROM Par_Persona_Tipo_Documento "
                . "ORDER BY Estado Asc");
            $Impuestos = DB::SELECT("SELECT Id, Nombre, Estado "
                    . "FROM Par_Tipo_Tarifa_Legal_Empresa "
                    . "ORDER BY Estado Asc");
            $DL = DB::SELECT("SELECT Id, Nombre, Estado "
                    . "FROM Par_Documentos_Legales_Empleado "
                    . "ORDER BY Estado Asc");
            $TR = DB::SELECT("SELECT Id, Nombre, Estado "
                    . "FROM Par_Tipo_Retiro "
                    . "ORDER BY Estado Asc");
            $datos = [
                        'Doc'=>$Doc,
                        'Cc'=>$Cc,
                        'FPensiones'=>$FPensiones,
                        'DL'=>$DL,
                        'TR'=>$TR,
                        'Impuesto'=>$Impuestos
                    ];
            return view('process.parametrizacion.personal')->with('datos',$datos);
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_TipoDocumentoPersona(){
        $Credentials = $this->validate(request(),[
           'ParTipoDocumento' => 'required|string',
           'ParSiglasDoc' => 'required|string:5'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Persona_Tipo_Documento (Nombre,Siglas,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoDocumento'])."', '".addslashes($Credentials['ParSiglasDoc'])."',1,".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Persona_Tipo_Documento (Nombre,Siglas,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoDocumento'])."', '".addslashes($Credentials['ParSiglasDoc'])."',1,".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPODOCUMENTO_PERSONA','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function Par_TipoDocumento_Edit(){
        $Credentials = $this->validate(request(),[
           'ParTipoDocumento' => 'required|string',
           'ParSiglasDoc' => 'required|string:5',
            'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Persona_Tipo_Documento set Nombre = '".addslashes($Credentials['ParTipoDocumento'])."', Siglas = '".addslashes($Credentials['ParSiglasDoc'])."' "
                . " WHERE IdTipoDocumento = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Persona_Tipo_Documento set Nombre = '".addslashes($Credentials['ParTipoDocumento'])."', Siglas = '".addslashes($Credentials['ParSiglasDoc'])."' "
                . " WHERE IdTipoDocumento = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPODOCUMENTO_PERSONA','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_EstadoTipoDocumento(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Persona_Tipo_Documento WHERE IdTipoDocumento = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Persona_Tipo_Documento set Estado = '$n' WHERE IdTipoDocumento = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Persona_Tipo_Documento set Estado = '$n' WHERE IdTipoDocumento = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPODOCUMENTO_PERSONA','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_EpsPersonal(){
        $Credentials = $this->validate(request(),[
           'ParEpsPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_eps (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParEpsPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_eps (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParEpsPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_EPS_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_EpsEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM par_eps WHERE IdEps = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_eps set Estado = '$n' WHERE IdEps = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_eps set Estado = '$n' WHERE IdEps = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_EPS_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_EpsEdit(){
        $Credentials = $this->validate(request(),[
           'ParEpsPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_eps set Nombre = '".addslashes($Credentials['ParEpsPersonal'])."' "
                . " WHERE IdEps = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_eps set Nombre = '".addslashes($Credentials['ParEpsPersonal'])."' "
                . " WHERE IdEps = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_EPS_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }


    public function par_ArlPersonal(){
        $Credentials = $this->validate(request(),[
           'ParArlPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_arl (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParArlPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_eps (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParArlPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_ARL_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_ArlEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM par_Arl WHERE IdArl = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_Arl set Estado = '$n' WHERE IdArl = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_Arl set Estado = '$n' WHERE IdArl = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_ARL_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_ARLEdit(){
        $Credentials = $this->validate(request(),[
           'ParArlPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_arl set Nombre = '".addslashes($Credentials['ParArlPersonal'])."' "
                . " WHERE IdArl = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_arl set Nombre = '".addslashes($Credentials['ParArlPersonal'])."' "
                . " WHERE IdArl = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_ARL_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_FCPersonal(){
        $Credentials = $this->validate(request(),[
           'ParFCPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_fondo_cesantias (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParFCPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_fondo_cesantias (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParFCPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_FCENSANTIAS_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_FCEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Fondo_Cesantias WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_fondo_cesantias set Estado = '$n' WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_fondo_cesantias set Estado = '$n' WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_FCENSANTIAS_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_FCEdit(){
        $Credentials = $this->validate(request(),[
           'ParFCPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_fondo_cesantias set Nombre = '".addslashes($Credentials['ParFCPersonal'])."' "
                . " WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_fondo_cesantias set Nombre = '".addslashes($Credentials['ParFCPersonal'])."' "
                . " WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_FCENSANTIAS_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_FPPersonal(){
        $Credentials = $this->validate(request(),[
           'ParFPPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_fondo_pensiones (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParFPPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_fondo_pensiones (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParFPPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_FPENSIONES_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_FPEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Fondo_Pensiones WHERE IdFP = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_fondo_pensiones set Estado = '$n' WHERE IdFP = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_fondo_pensiones set Estado = '$n' WHERE IdFP = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_FPENSIONES_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_FPEdit(){
        $Credentials = $this->validate(request(),[
           'ParFPPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_fondo_pensiones set Nombre = '".addslashes($Credentials['ParFPPersonal'])."' "
                . " WHERE IdFP = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_fondo_pensiones set Nombre = '".addslashes($Credentials['ParFPPersonal'])."' "
                . " WHERE IdFC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_FPENSIONES_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_CCPersonal(){
        $Credentials = $this->validate(request(),[
           'ParCCPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_caja_compensacion (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParCCPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_caja_compensacion (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParCCPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_CCOMPESANCION_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_CCEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Caja_Compensacion WHERE IdCC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_caja_compensacion set Estado = '$n' WHERE IdCC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_caja_compensacion set Estado = '$n' WHERE IdCC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_CCOMPESANCION_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_CCEdit(){
        $Credentials = $this->validate(request(),[
           'ParCCPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_caja_compensacion set Nombre = '".addslashes($Credentials['ParCCPersonal'])."' "
                . " WHERE IdCC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_caja_compensacion set Nombre = '".addslashes($Credentials['ParCCPersonal'])."' "
                . " WHERE IdCC = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_CCOMPENSACION_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_DLPersonal(){
        $Credentials = $this->validate(request(),[
           'ParDLPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_documentos_legales_empleado (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDLPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_documentos_legales_empleado (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDLPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_DOCUMENTOLEGAL_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_DLEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Documentos_Legales_Empleado WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_documentos_legales_empleado set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_documentos_legales_empleado set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_DOCLEGAL_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_DLEdit(){
        $Credentials = $this->validate(request(),[
           'ParDLPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_documentos_legales_empleado set Nombre = '".addslashes($Credentials['ParDLPersonal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_documentos_legales_empleado set Nombre = '".addslashes($Credentials['ParDLPersonal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_DOCLEGAL_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }

    public function par_TRPersonal(){
        $Credentials = $this->validate(request(),[
           'ParTRPersonal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into par_tipo_retiro (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTRPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into par_tipo_retiro (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTRPersonal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPORETIRO_PERSONAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('66b7ab64d20f5e0f2635036e99352173');
        }
    }

    public function par_TREstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Tipo_Retiro WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE par_tipo_retiro set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE par_tipo_retiro set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPORETIRO_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_TREdit(){
        $Credentials = $this->validate(request(),[
           'ParTRPersonal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE par_tipo_retiro set Nombre = '".addslashes($Credentials['ParTRPersonal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE par_tipo_retiro set Nombre = '".addslashes($Credentials['ParTRPersonal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPORETIRO_PERSONAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('66b7ab64d20f5e0f2635036e99352173');

    }
}
