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


class InventarioController extends Controller{
    //put your code here

    public function par_data_Inventario_Marca(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Marca_Inventario Where "
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
        
        $PAR_INVENTARIO_SISTEMAS_MARCA_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO')");
        $PAR_INVENTARIO_SISTEMAS_MARCA_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_SISTEMAS_MARCA_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_INVENTARIO_SISTEMAS_MARCA_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_INVENTARIO_SISTEMAS_MARCA_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_INVENTARIO_SISTEMAS_MARCA_ESTADO"=>$permiso_estado,
              "PAR_INVENTARIO_SISTEMAS_MARCA_EDITAR"=>$permiso_editar,
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
    
    public function par_data_Inventario_Oficina(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  p.Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  p.Estado = 1 ";
        }else{
            $sqlAdicional = "  p.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Propietario_Inventario_Oficina p "
                . "inner join unidad_negocio un on p.IdUnidad = un.IdUnidad "
                . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                . "Where "
                .$sqlAdicional;
        
        $sqlCampos = "DISTINCT p.Id, p.Nombre, p.Estado, un.Nombre as Unidad ";
        
        ## Search 
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) ";
        }
        
        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        $PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO')");
        $PAR_INVENTARIO_OFICINA_PROPIETARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_OFICINA_PROPIETARIO_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_INVENTARIO_OFICINA_PROPIETARIO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Unidad"=>$row->Unidad,
              "PAR_INVENTARIO_OFICINA_PROPIETARIO_ESTADO"=>$permiso_estado,
              "PAR_INVENTARIO_OFICINA_PROPIETARIO_EDITAR"=>$permiso_editar,
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
    
    public function par_data_Inventario_PropietarioS(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Propietario_Inventario Where "
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
        
        $PAR_INVENTARIO_PROPIETARIO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_PROPIETARIO_ESTADO')");
        $PAR_INVENTARIO_PROPIETARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_PROPIETARIO_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_INVENTARIO_PROPIETARIO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_INVENTARIO_PROPIETARIO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_INVENTARIO_PROPIETARIO_ESTADO"=>$permiso_estado,
              "PAR_INVENTARIO_PROPIETARIO_EDITAR"=>$permiso_editar,
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
    
    public function par_data_Inventario_TipoSistemas(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Tipo_InventarioSistemas Where "
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
        
        $PAR_INVENTARIO_TIPO_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_TIPO_ESTADO')");
        $PAR_INVENTARIO_TIPO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_INVENTARIO_TIPO_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_INVENTARIO_TIPO_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_INVENTARIO_TIPO_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_INVENTARIO_TIPO_ESTADO"=>$permiso_estado,
              "PAR_INVENTARIO_TIPO_EDITAR"=>$permiso_editar,
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
            return view('process.parametrizacion.inventario');
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }
    
    public function UnidadesInventarioGeneral(){
        $Unidades = DB::SELECT("SELECT un.IdUnidad, un.Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' order by un.IdUnidad"
                );
        foreach($Unidades as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdUnidad);
        }
        return response()->json([
            "Unidad"=>$Unidades,
        ]);
    }

    public function par_OficinaPropietario(){
        $Credentials = $this->validate(request(),[
           'ParOficinaPropietario' => 'required|string',
           'unidadnegocio' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Propietario_Inventario_Oficina (Nombre,Estado,IdUsuario,Fecha,IdUnidad)"
                . "values ('".addslashes($Credentials['ParOficinaPropietario'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."',".(new Controller)->CodeDescrypt($Credentials['unidadnegocio']).");")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Propietario_Inventario_Oficina (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParOficinaPropietario'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_OFICINAPROPIETARIO_INVENTARIO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('6749704d28d45a5dfe071898f72a32d4');
        }
    }

    public function par_OficinaPropietarioEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Propietario_Inventario_Oficina WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Propietario_Inventario_Oficina set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Propietario_Inventario_Oficina set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_OFICINAPROPIETARIO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_PropietarioOficinaEdit(){
        $Credentials = $this->validate(request(),[
           'ParOficinaPropietario' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Propietario_Inventario_Oficina set Nombre = '".addslashes($Credentials['ParOficinaPropietario'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Propietario_Inventario_Oficina set Nombre = '".addslashes($Credentials['ParOficinaPropietario'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_OFICINAPROPIETARIO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('6749704d28d45a5dfe071898f72a32d4');

    }

    public function par_Propietario(){
        $Credentials = $this->validate(request(),[
           'ParPropietario' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Propietario_Inventario (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPropietario'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Propietario_Inventario (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParPropietario'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_SISTEMASPROPIETARIO_INVENTARIO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('6749704d28d45a5dfe071898f72a32d4');
        }
    }

    public function par_PropietarioEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Propietario_Inventario WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Propietario_Inventario set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Propietario_Inventario set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_SISTEMASPROPIETARIO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_PropietarioEdit(){
        $Credentials = $this->validate(request(),[
           'ParPropietario' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Propietario_Inventario set Nombre = '".addslashes($Credentials['ParPropietario'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Propietario_Inventario set Nombre = '".addslashes($Credentials['ParPropietario'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_SISTEMASPROPIETARIO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('6749704d28d45a5dfe071898f72a32d4');

    }

    public function par_Tipo(){
        $Credentials = $this->validate(request(),[
           'ParTipo' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Tipo_InventarioSistemas (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipo'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Propietario_Inventario (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipo'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_SISTEMASTIPO_INVENTARIO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('6749704d28d45a5dfe071898f72a32d4');
        }
    }

    public function par_TipoEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Tipo_InventarioSistemas WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Tipo_InventarioSistemas set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Tipo_InventarioSistemas set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_SISTEMASTIPO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_TipoEdit(){
        $Credentials = $this->validate(request(),[
           'ParTipo' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Tipo_InventarioSistemas set Nombre = '".addslashes($Credentials['ParTipo'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Tipo_InventarioSistemas set Nombre = '".addslashes($Credentials['ParTipo'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_SISTEMASTIPO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('6749704d28d45a5dfe071898f72a32d4');

    }

    public function par_Marca(){
        $Credentials = $this->validate(request(),[
           'ParMarca' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Marca_Inventario (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParMarca'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Marca_Inventario (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParMarca'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_SISTEMASMARCA_INVENTARIO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('6749704d28d45a5dfe071898f72a32d4');
        }
    }

    public function par_MarcaEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Marca_Inventario WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Marca_Inventario set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Marca_Inventario set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_ESTADO_SISTEMASTIPO_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_MarcaEdit(){
        $Credentials = $this->validate(request(),[
           'ParMarca' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Marca_Inventario set Nombre = '".addslashes($Credentials['ParMarca'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Marca_Inventario set Nombre = '".addslashes($Credentials['ParMarca'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_SISTEMASMARCA_INVENTARIO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('6749704d28d45a5dfe071898f72a32d4');

    }

}
