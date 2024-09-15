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


class ProveedorController extends Controller{
    //put your code here
    
    public function par_data_Proveedor_DL(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Documento_Legal_Proveedor Where "
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
        
        $PAR_PROVEEDORES_DOCUMENTOS_LEGALES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PROVEEDORES_DOCUMENTOS_LEGALES_ESTADO')");
        $PAR_PROVEEDORES_DOCUMENTOS_LEGALES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_PROVEEDORES_DOCUMENTOS_LEGALES_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_PROVEEDORES_DOCUMENTOS_LEGALES_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_PROVEEDORES_DOCUMENTOS_LEGALES_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_PROVEEDORES_DOCUMENTOS_LEGALES_ESTADO"=>$permiso_estado,
              "PAR_PROVEEDORES_DOCUMENTOS_LEGALES_EDITAR"=>$permiso_editar,
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
            return view('process.parametrizacion.proveedor');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_DocLegal(){
        $Credentials = $this->validate(request(),[
           'ParDocLegal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Documento_Legal_Proveedor (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Documento_Legal_Proveedor (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_DOCLEGAL_PROVEEDOR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('af65b15ddf7d8c9a42016f3917171b7d');
        }
    }

    public function par_DocLegalEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Documento_Legal_Proveedor WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Documento_Legal_Proveedor set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Documento_Legal_Proveedor set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_DOCLEGAL_PROVEEDOR','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

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
        DB::UPDATE("UPDATE Par_Documento_Legal_Proveedor set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Documento_Legal_Cliente set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_DOCLEGAL_PROVEEDOR','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('af65b15ddf7d8c9a42016f3917171b7d');

    }

    public function par_InfoTributaria(){
        $Credentials = $this->validate(request(),[
           'ParInfoTributaria' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_InformacionTributaria (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParInfoTributaria'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_InformacionTributaria (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParInfoTributaria'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_INFOTRIBUTARIA_CLIENTE','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('705e21f70252bdd71cc4bd7477556173');
        }
    }

    public function par_InfoTributariaEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_InformacionTributaria WHERE Id = '".addslashes($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_InformacionTributaria set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = addslashes($Credentials['Hash']);
                $Query = "UPDATE Par_InformacionTributaria set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_INFOTRIBUTARIA_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_InfoTributariaEdit(){
        $Credentials = $this->validate(request(),[
           'ParInfoTributaria' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_InformacionTributaria set Nombre = '".addslashes($Credentials['ParInfoTributaria'])."' "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = addslashes($Credentials['Hash']);
            $Query = "UPDATE Par_InformacionTributaria set Nombre = '".addslashes($Credentials['ParInfoTributaria'])."' "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_INFOTRIBUTARIA_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('705e21f70252bdd71cc4bd7477556173');

    }

    public function par_Pago(){
        $Credentials = $this->validate(request(),[
           'ParPago' => 'required|string',
           'ParPagoDias' => 'required|int'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_PagoCliente (Nombre,Dias,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPago'])."',".addslashes($Credentials['ParPagoDias']).", 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_PagoCliente (Nombre,Dias,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPago'])."',".addslashes($Credentials['ParPagoDias']).", 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_PAGOS_CLIENTE','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('705e21f70252bdd71cc4bd7477556173');
        }
    }

    public function par_PagosEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_PagoCliente WHERE Id = '".addslashes($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_PagoCliente set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = addslashes($Credentials['Hash']);
                $Query = "UPDATE Par_PagoCliente set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_PAGOS_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_PagosEdit(){
        $Credentials = $this->validate(request(),[
           'ParPagos' => 'required|string',
           'ParPagoDiasT' => 'required|int',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_PagoCliente set Nombre = '".addslashes($Credentials['ParPagos'])."', Dias = ".($Credentials['ParPagoDiasT'])." "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = addslashes($Credentials['Hash']);
            $Query = "UPDATE Par_PagoCliente set Nombre = '".addslashes($Credentials['ParPagos'])."', Dias = ".($Credentials['ParPagoDiasT'])." "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_PAGOS_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('705e21f70252bdd71cc4bd7477556173');

    }

    public function par_TipoContrato(){
        $Credentials = $this->validate(request(),[
           'ParTipoContrato' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_TipoContratoCliente (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoContrato'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_TipoContratoCliente (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoContrato'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPOCONTRATO_CLIENTE','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('705e21f70252bdd71cc4bd7477556173');
        }
    }

    public function par_TipoContratoEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_TipoContratoCliente WHERE Id = '".addslashes($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_TipoContratoCliente set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = addslashes($Credentials['Hash']);
                $Query = "UPDATE Par_TipoContratoCliente set Estado = '$n' WHERE Id = '".addslashes($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPOCONTRATO_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_TipoContratoEdit(){
        $Credentials = $this->validate(request(),[
           'ParTipoContrato' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_TipoContratoCliente set Nombre = '".addslashes($Credentials['ParTipoContrato'])."' "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = addslashes($Credentials['Hash']);
            $Query = "UPDATE Par_TipoContratoCliente set Nombre = '".addslashes($Credentials['ParTipoContrato'])."' "
                . " WHERE Id = '".addslashes($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPOCONTRATO_CLIENTE','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('705e21f70252bdd71cc4bd7477556173');

    }



}
