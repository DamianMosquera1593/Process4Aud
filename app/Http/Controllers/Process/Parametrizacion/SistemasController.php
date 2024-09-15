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


class SistemasController extends Controller{
    //put your code here

    
    public function par_data_Sistemas(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Tipo_Sistemas Where "
                .$sqlAdicional;
        
        $sqlCampos = "Id, Nombre, Estado ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_ESTADO')");
        $PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_ESTADO"=>$permiso_estado,
              "PAR_SEGURIDAD_SISTEMAS_TIPO_DOCUMENTO_LEGAL_EDITAR"=>$permiso_editar,
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

            
            return view('process.parametrizacion.sistemas');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_DocLegal(){
        $Credentials = $this->validate(request(),[
           'ParDocLegal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Tipo_Sistemas (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Tipo_Sistemas (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPO_SISTEMAS','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('856c55ae087e200b65b9a1bdaf897f01');
        }
    }

    public function par_DocLegalEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Tipo_Sistemas WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Tipo_Sistemas set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Tipo_Sistemas set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPO_SISTEMAS','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_DocLegalEdit(){
        $Credentials = $this->validate(request(),[
           'ParDocLegal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Tipo_Sistemas set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Tipo_Sistemas set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPO_SISTEMAS','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('856c55ae087e200b65b9a1bdaf897f01');

    }



}
