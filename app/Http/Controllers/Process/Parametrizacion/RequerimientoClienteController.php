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


class RequerimientoClienteController extends Controller{
    //put your code here

    public function par_data_rc_tiposolicitud(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_tiposolicitud Where "
                .$sqlAdicional;
        
        $sqlCampos = "Id, Nombre, Estado, Descripcion ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_EMPRESA_TARIFAS_IMPUESTOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_EMPRESA_TARIFAS_IMPUESTOS_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Descripcion"=> nl2br($row->Descripcion),
              "PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO"=>$permiso_estado,
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
    
    public function par_data_rc_tipodesarrollo(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_tipodesarrollo Where "
                .$sqlAdicional;
        
        $sqlCampos = "Id, Nombre, Estado, Descripcion ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Descripcion"=> nl2br($row->Descripcion),
              "PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO"=>$permiso_estado,
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
    
    public function IndexRequerimientosClientes(){
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.parametrizacion.requerimientoclientes');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }
    
    public function parRCTipoSolicitudCrear(){
        $Credentials = $this->validate(request(),[
           'ParNomDocLegal' => 'required|string',
           'Descripcion' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_tiposolicitud (Nombre,Descripcion,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['ParNomDocLegal'])."','".($Credentials['Descripcion'])."' ,1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_tiposolicitud (Nombre,Descripcion,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['ParNomDocLegal'])."','".($Credentials['Descripcion'])."' 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOSOLICITUD_CREAR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }

    public function parRCTipoSolicitudE(Request $request){
        $Credentials = $this->validate(request(),[
           'ParNomDocLegal' => 'required|string',
           'Descripcion' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_tiposolicitud set Nombre = '".($Credentials['ParNomDocLegal'])."',Descripcion = '".($Credentials['Descripcion'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = ($Credentials['Hash']);
            $Query = "UPDATE parcliente_tiposolicitud set Nombre = '".($Credentials['ParNomDocLegal'])."',Descripcion = '".($Credentials['Descripcion'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            
        return response()->json(['success'=>$Query]);

    }

    public function parRCTipoSolicitudEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $Estado = DB::SELECT("SELECT Estado FROM parcliente_tiposolicitud WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_tiposolicitud set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_tiposolicitud set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOSOLICITUD_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }else{
            return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
        }

    }

    public function par_Impuesto_empresa(){
        $Credentials = $this->validate(request(),[
           'ParImpuestoEmpresa' => 'required|string',
           'Descripcion' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_tipodesarrollo (Nombre,Descripcion,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['ParImpuestoEmpresa'])."', '".($Credentials['Descripcion'])."',1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_tipodesarrollo (Nombre,Descripcion,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['ParImpuestoEmpresa'])."',  '".($Credentials['Descripcion'])."',1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_IMPUESTO_EMPRESA','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }

    public function par_TarifaEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM parcliente_tipodesarrollo WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_tipodesarrollo set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){
                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_tipodesarrollo set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_IMPUESTO_LEGAL_EMPRESA','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_Impuesto_Edit(){
        $Credentials = $this->validate(request(),[
           'ParImpuestoEmpresa' => 'required|string',
           'Descripcion' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_tipodesarrollo set Nombre = '".($Credentials['ParImpuestoEmpresa'])."', Descripcion = '".($Credentials['Descripcion'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE parcliente_tipodesarrollo set Nombre = '".($Credentials['ParImpuestoEmpresa'])."', Descripcion = '".($Credentials['Descripcion'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_IMPUESTO_EMPRESA','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');

    }
    
    public function par_RCTipoMaterial(){
        $Credentials = $this->validate(request(),[
           'TipoMaterial' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_tipomaterial (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['TipoMaterial'])."',1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_tipomaterial (Nombre,Descripcion,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['TipoMaterial'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }
    
    public function par_data_rc_tipomaterial(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_tipomaterial Where "
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
        
        $PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO"=>$permiso_estado,
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
    
    public function par_EstadoTipoMaterial(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM parcliente_tipomaterial WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_tipomaterial set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){
                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_tipomaterial set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    
    public function par_TipoMaterial_Edit(){
        $Credentials = $this->validate(request(),[
           'TipoMaterial' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_tipomaterial set Nombre = '".($Credentials['TipoMaterial'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE parcliente_tipomaterial set Nombre = '".($Credentials['TipoMaterial'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
    }
    
    public function RC_ListarMateriales(){
        $data = DB::SELECT("SELECT "
                . "Id as Hash, Nombre as Material "
                . "FROM parcliente_tipomaterial "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre asc");
        foreach( $data as $d ){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        return response()->json([
            "Info"=>$data,
            'success' => true
        ]);
    }
    
    public function par_RCMTipoMaterial(){
        $Credentials = $this->validate(request(),[
           'TipoMaterial' => 'required|int',
           'Medio' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_medio (Nombre,IdTipoMaterial,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['Medio'])."',".parent::CodeDescrypt($Credentials['TipoMaterial']).",1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_medio (Nombre,IdTipoMaterial,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['Medio'])."',".parent::CodeDescrypt($Credentials['TipoMaterial']).",1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }
    
    public function par_data_rc_mediostipomaterial(Request $request){
        $draw = $request['draw'];
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  m.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  m.Estado = 1 ";
        }else{
            $sqlAdicional = "  m.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_medio m "
                . "inner join parcliente_tipomaterial t on m.IdTipoMaterial = t.Id "
                . "Where "
                .$sqlAdicional;
        
        $sqlCampos = "m.Id, m.Nombre as Medio, m.Estado, t.Nombre as Material ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (m.Nombre like '%".$searchValue."%' or t.Nombre like '%".$searchValue."%') ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Medio"=>$row->Medio,
              "Material"=>$row->Material,
              "PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO"=>$permiso_estado,
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
    
    public function par_EstadoMTipoMaterial(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM parcliente_medio WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_medio set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){
                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_medio set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    
    public function par_MTipoMaterial_Edit(){
        $Credentials = $this->validate(request(),[
           'Medio' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_medio set Nombre = '".($Credentials['Medio'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE parcliente_medio set Nombre = '".($Credentials['Medio'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
    }
    
    public function par_RCSectorUnidad(){
        $Credentials = $this->validate(request(),[
           'SectorUnidad' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_sectores (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['SectorUnidad'])."',1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_sectores (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['SectorUnidad'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }
    
    public function par_data_rc_sectorunidad(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_sectores Where "
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
        
        $PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO"=>$permiso_estado,
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
    
    public function par_EstadoSU(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM parcliente_sectores WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_sectores set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){
                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_sectores set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    
    public function par_SU_Edit(){
        $Credentials = $this->validate(request(),[
           'Sector' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_sectores set Nombre = '".($Credentials['Sector'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE parcliente_sectores set Nombre = '".($Credentials['Sector'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
    }
    
    public function RC_ListarSectores(){
        $data = DB::SELECT("SELECT "
                . "Id as Hash, Nombre as Sector "
                . "FROM parcliente_sectores "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre asc");
        foreach( $data as $d ){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        return response()->json([
            "Info"=>$data,
            'success' => true
        ]);
    }
    
    public function par_RCDetalleSector(){
        $Credentials = $this->validate(request(),[
           'Sector' => 'required|int',
           'Detalle' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into parcliente_detallesector (Nombre,IdSector,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['Detalle'])."',".parent::CodeDescrypt($Credentials['Sector']).",1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into parcliente_detallesector (Nombre,IdSector,Estado,IdUsuario,Fecha)"
                . "values ('".($Credentials['Detalle'])."',".parent::CodeDescrypt($Credentials['Sector']).",1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_CREAR','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
        }
    }
    
    public function par_data_rc_detalleSector(Request $request){
        $draw = $request['draw'];
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  m.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  m.Estado = 1 ";
        }else{
            $sqlAdicional = "  m.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM parcliente_detallesector m "
                . "inner join parcliente_sectores t on m.IdSector = t.Id "
                . "Where "
                .$sqlAdicional;
        
        $sqlCampos = "m.Id, m.Nombre as Detalle, m.Estado, t.Nombre as Sector ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (m.Nombre like '%".$searchValue."%' or t.Nombre like '%".$searchValue."%') ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            
            if( count($PAR_REQUERIMIENTO_CLIENTE_TIPODESARROLLO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Detalle"=>$row->Detalle,
              "Sector"=>$row->Sector,
              "PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO"=>$permiso_estado,
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
    
    public function par_EstadoSUD(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM parcliente_detallesector WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE parcliente_detallesector set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){
                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE parcliente_detallesector set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    
    public function par_SUD_Edit(){
        $Credentials = $this->validate(request(),[
           'Sector' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE parcliente_detallesector set Nombre = '".($Credentials['Sector'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE parcliente_detallesector set Nombre = '".($Credentials['Sector'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_REQUERIMIENTO_CLIENTE_TIPOMATERIAL_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('e2a13dbb9efa27ff4d29436bbf963284');
    }
}
