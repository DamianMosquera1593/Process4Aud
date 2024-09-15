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


class TraficoController extends Controller{
    //put your code here

    public function par_data_Trafico_TB(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM Par_Tipo_Brief Where "
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
        
        $PAR_TRAFICO_TIPOS_BRIEF_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_TRAFICO_TIPOS_BRIEF_ESTADO')");
        $PAR_TRAFICO_TIPOS_BRIEF_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_TRAFICO_TIPOS_BRIEF_ESTADO')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_TRAFICO_TIPOS_BRIEF_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_TRAFICO_TIPOS_BRIEF_ESTADO) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_TRAFICO_TIPOS_BRIEF_ESTADO"=>$permiso_estado,
              "PAR_TRAFICO_TIPOS_BRIEF_ESTADO"=>$permiso_editar,
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
    
    public function par_data_Trafico_TT(Request $request){
        $draw = $request['draw'];
        
        
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM ParTipoTarea Where "
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
        
        $PAR_TRAFICO_TIPOS_TAREA_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_TRAFICO_TIPOS_TAREA_ESTADO')");
        $PAR_TRAFICO_TIPOS_TAREA_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_TRAFICO_TIPOS_TAREA_EDITAR')");
        
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            
            if( count($PAR_TRAFICO_TIPOS_TAREA_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_TRAFICO_TIPOS_TAREA_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array( 
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_TRAFICO_TIPOS_TAREA_ESTADO"=>$permiso_estado,
              "PAR_TRAFICO_TIPOS_TAREA_EDITAR"=>$permiso_editar,
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
            $CamposBrief = DB::SELECT("SELECT fb.*,  p.descripcion as TipoCampo , tb.Nombre as TipoBrief, p.Lugar "
                . "FROM Par_Formato_Brief  fb "
                    . "INNER JOIN Par_Tipo_Elemento p on fb.IdTipoElemento = p.Id "
                    . "INNER JOIN Par_Tipo_Brief tb on fb.IdTipoBrief = tb.Id "
                    . "WHERE fb.estado = 1 "
                . "ORDER BY tb.Nombre,fb.orden Asc");


            $datos = [
                
                        'CamposBrief'=>$CamposBrief
                    ];
            return view('process.parametrizacion.trafico')->with('datos',$datos);
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }

    }

    public function par_TraficoTipoBrief(){
        $Credentials = $this->validate(request(),[
           'ParTipoBrief' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Tipo_Brief (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoBrief'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Tipo_Brief (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoBrief'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPOBRIEF_TRAFICO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');
        }
    }

    public function par_TraficoTipoBriefEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Tipo_Brief WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Tipo_Brief set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Tipo_Brief set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPOBRIEF_TRAFICO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_TraficoTipoBriefEdit(){
        $Credentials = $this->validate(request(),[
           'ParTipoBrief' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Tipo_Brief set Nombre = '".addslashes($Credentials['ParTipoBrief'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Tipo_Brief set Nombre = '".addslashes($Credentials['ParTipoBrief'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPOBRIEF_TRAFICO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');

    }

    public function par_TraficoDataNuevoCampoBrief(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);
        $TipoBrief = DB::SELECT("SELECT Id, Nombre "
                . "FROM Par_Tipo_Brief "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre Asc");
        
        if( $TipoBrief ){
            return response()->json(['TipoBrief'=>$TipoBrief]);
        }
        return response()->json(['Error'=>'1']);
    }

    public function par_TraficoDataCamposBrief(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string',
           'Etiqueta' => 'required|string'
        ]);
        $TipoBrief = DB::SELECT("SELECT * "
                . "FROM Par_Tipo_Elemento "
                . "WHERE Estado = 1 and Lugar = '".$Credentials['Etiqueta']."'"
                . "ORDER BY Lugar Asc");
        // $TipoBrief = DB::SELECT("SELECT Id, Nombre "
        // . "FROM Par_Tipo_Brief "
        // . "WHERE Estado = 1 "
        // . "ORDER BY Nombre Asc");
        if( $TipoBrief ){
            return response()->json(['Campos' => $TipoBrief]);
        } else {
            return response()->json(['Error'=>'1']);
        }
    }

    public function par_TraficoListarCamposBrief(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string',
           'ParBrief' => 'required|int'
        ]);
        $TipoBrief = DB::SELECT("SELECT * "
                . "FROM Par_Formato_Brief "
                . "WHERE Estado = 1 and IdTipoBrief = '".$Credentials['ParBrief']."'"
                . "ORDER BY Orden Asc");
        if( $TipoBrief ){
            return response()->json(['Campos'=>$TipoBrief]);
        }
        return response()->json(['Error'=>'1']);
    }

    public function par_ReorganizarCamposBrief(){
        $Credentials = $this->validate(request(),[
           'ParTipoBrief' => 'required|int',
           'orden' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $temp = explode("|",$Credentials['orden']);
        $tt = "";
        for($i = 0; $i < count($temp);$i++){
            if( ($i+1) < (count($temp)/2) ){
                $t = explode("-",$temp[$i]);
                $Query = "UPDATE Par_Formato_Brief SET Orden = $t[1] WHERE Id = $t[0]";
                DB::INSERT( $Query );
                $id = $t[0];

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'PAR_UPDATE_ORDEN_CAMPOFORMATOBRIEF_TRAFICO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            }

        }
        return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');

    }

    public function par_TraficoGuardarCampoTipoBrief(){
        $Credentials = $this->validate(request(),[
           'ParTipoBrief' => 'required|int',
           'ParNombreTecnico' => 'required|string',
           'ParLabel' => 'required|string',
           'ParDescripcion' => 'required|string',
           'ParPosicionBrief' => 'required|string',
           'ParObligatorio' => 'required|int',
           'ParTipoCampo' => 'required|int'
        ]);

        try {
            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

            $Orden = DB::SELECT("SELECT COUNT(1) AS ORDEN FROM Par_Formato_Brief "
                    . "WHERE IdTipoBrief = '".addslashes($Credentials['ParTipoBrief'])."' ");

            $Query = "INSERT into Par_Formato_Brief (IdTipoBrief,Nombre_Tecnico,Label,Descripcion,Obligatorio,Estado,IdTipoElemento,Orden,IdUsuario,Fecha) "
                    . "values ('".addslashes($Credentials['ParTipoBrief'])."','".addslashes($Credentials['ParNombreTecnico'])."', '".addslashes($Credentials['ParLabel'])."'"
                    . ",'".addslashes($Credentials['ParDescripcion'])."',".addslashes($Credentials['ParObligatorio']).",1,".addslashes($Credentials['ParTipoCampo']).",".($Orden[0]->ORDEN+1).",".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            if( DB::INSERT( $Query )){

                $id = DB::getPdo()->lastInsertId();

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_CREACION_CAMPOFORMATOBRIEF_TRAFICO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            dd($ex->getMessage());
        } catch (\Exception $ex) {
            dd($ex->getMessage());
        }

    }

    public function EliminarRegistroFormatoBrief(){
        $Credentials = $this->validate(request(),[
           'ParIdFormatoBrief' => 'required|int',
           'Hash' => 'required|string'
        ]);
        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $Query = "DELETE FROM Par_Formato_Brief "
                . "WHERE Id =".addslashes($Credentials['ParIdFormatoBrief']).";";

        $id = $Credentials['ParIdFormatoBrief'];

        if( DB::DELETE($Query) ){
            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_ELIMINACION_CAMPOFORMATOBRIEF_TRAFICO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');
        }

    }

    public function par_TraficoTipoTarea(){
        $Credentials = $this->validate(request(),[
           'ParTipoTarea' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into ParTipoTarea (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoTarea'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into ParTipoTarea (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParTipoTarea'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_CREACION_TIPOTAREA_TRAFICO','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');
        }
    }

    public function par_TraficoTipoTareaEstado(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM ParTipoTarea WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE ParTipoTarea set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE ParTipoTarea set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_EDICION_ESTADO_TIPOTAREA_TRAFICO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function par_TraficoTipoTareaEdit(){
        $Credentials = $this->validate(request(),[
           'ParTipoTarea' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE ParTipoTarea set Nombre = '".addslashes($Credentials['ParTipoTarea'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE ParTipoTarea set Nombre = '".addslashes($Credentials['ParTipoTarea'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_EDICION_TIPOTAREA_TRAFICO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('0c6dbf3f81b907922d3a1f693f24ad0a');

    }
    
    //62148b2640276b99ee31dae2c89a85f9
    public function par_SaveTipoTraficoAdmin(Request $request){
        try {
            DB::beginTransaction();
            DB::enableQueryLog();
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $ids = [];
            
            $IdTipo = DB::table('TA_Tipos')
            ->insertGetId([
                'Nombre' => $request->input('Tipo'),
                'IdUsuario' => $Usuario->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);
            array_push($ids, $IdTipo);
            
            $CData = \GuzzleHttp\json_decode($request->input('Grupos'));
            if( count($CData) > 0 ){
                
                for($i = 0; $i < count($CData);$i++){
                    $CData[$i] = (array) $CData[$i];
                    $idz = DB::table('TA_Grupos')
                        ->insertGetId([
                            'Nombre' => $CData[$i]['Grupo'],
                            'TA_Tipos_Id' => $IdTipo,
                        ]);
                    array_push($ids, $idz);
                }
                
                parent::queryLogAuditoria($ids, $Usuario->IdUsuario, 'Par_Grupos_TraficoAdministrativo');

                
            }
            
            DB::commit();
            DB::disableQueryLog();

            $data = [
                'mensaje' => 'Data Guardada',
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

}
