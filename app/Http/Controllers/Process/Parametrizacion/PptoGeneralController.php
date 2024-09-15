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


class PptoGeneralController extends Controller{
    //put your code here

    public function par_data_Ppto_Periodicidad(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Periodicidad_Ppto_Agencia Where "
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
        
        $PAR_PPTO_GENERAL_PERIODICIDAD_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PPTO_GENERAL_PERIODICIDAD_ESTADO')");
        $PAR_PPTO_GENERAL_PERIODICIDAD_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PERSONAL_TIPOS_DOCUMENTOS_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_PPTO_GENERAL_PERIODICIDAD_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PPTO_GENERAL_PERIODICIDAD_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PPTO_GENERAL_PERIODICIDAD_ESTADO"=>$permiso_estado,
              "PAR_PPTO_GENERAL_PERIODICIDAD_EDITAR"=>$permiso_editar,
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
            return view('process.parametrizacion.pptogeneral');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_PeriodicidadPptoGeneral(){
        $Credentials = $this->validate(request(),[
           'ParPeriodicidad' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Periodicidad_Ppto_Agencia (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPeriodicidad'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Periodicidad_Ppto_Agencia (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPeriodicidad'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_PERIODICIDAD_PPTOGENERAL','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('3b62057ed4a6053f36077f3a0ee3d1ae');
        }
    }

    public function par_PeriodicidadEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Periodicidad_Ppto_Agencia WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Periodicidad_Ppto_Agencia set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Periodicidad_Ppto_Agencia set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_PERIODICIDAD_PPTOGENERAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_PeriodicidadEdit(){
        $Credentials = $this->validate(request(),[
           'ParPeriodicidad' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Periodicidad_Ppto_Agencia set Nombre = '".addslashes($Credentials['ParPeriodicidad'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Periodicidad_Ppto_Agencia set Nombre = '".addslashes($Credentials['ParPeriodicidad'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_PERIODICIDAD_PPTOGENERAL','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('3b62057ed4a6053f36077f3a0ee3d1ae');

    }


}
