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

namespace App\Http\Controllers\Process\HorasHombre;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;

class HHController extends Controller
{
    //d6e0840c386bc44bcb119cd77dd31ff4
    public function IndexHH()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("layouts.HorasHombre");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    
    //c92932129875b71e745711629c7165f4
    public function ParHHIndex(){
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("process.parametrizacion.horashombre");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //a80cd987d797e2e17ea5fbea10dbf6c8
    public function ParRegistrarActividad(){
        $Credentials = $this->validate(request(),[
           'ParDocLegal' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::INSERT("INSERT into Par_Tipo_Actividad_HH (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');")){

            $id = DB::getPdo()->lastInsertId();
            $Query = "INSERT into Par_Tipo_Actividad_HH (Nombre,Estado,IdUsuario,Fecha)"
                . "values ('".addslashes($Credentials['ParDocLegal'])."', 1, ".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_HORAS_HOMBRE_CREAR_ACTIVIDAD','".addslashes($Query)."','INSERT',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return redirect()->route('c92932129875b71e745711629c7165f4');
        }
    }
    
    
    //946c04a7e848f1ab3da0b79625ee4fe4
    public function ParDataActividadesHH(Request $request){
        $draw = $request['draw'];
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_tipo_actividad_hh Where "
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

        $PAR_HORAS_HOMBRE_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_HORAS_HOMBRE')");
        $PAR_HORAS_HOMBRE_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_HORAS_HOMBRE')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_HORAS_HOMBRE_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($PAR_HORAS_HOMBRE_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "PAR_HORAS_HOMBRE_ESTADO"=>$permiso_estado,
              "PAR_HORAS_HOMBRE_EDITAR"=>$permiso_editar,
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
    
    //19cb4180f1590bbe72232c7a6b841fb3
    public function ParHHEstadoActividades(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|string'
        ]);

        $Estado = DB::SELECT("SELECT Estado FROM Par_Tipo_Actividad_HH WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Par_Tipo_Actividad_HH set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
                $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
                $Query = "UPDATE Par_Tipo_Actividad_HH set Estado = '$n' WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";
                $Query = str_replace("'","~",$Query);
                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'PAR_HORAS_HOMBRE_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    
    
    //08af4d36106549eab16908a28c194239
    public function ParHHNameActividades(){
        $Credentials = $this->validate(request(),[
           'ParDocLegal' => 'required|string',
           'Hash' => 'required|int'
        ]);
        DB::UPDATE("UPDATE Par_Tipo_Actividad_HH set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';");

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");
            $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $Query = "UPDATE Par_Tipo_Actividad_HH set Nombre = '".addslashes($Credentials['ParDocLegal'])."' "
                . " WHERE Id = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."';";

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".$id.",'PAR_HORAS_HOMBRE_EDITAR','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

        return redirect()->route('c92932129875b71e745711629c7165f4');
    }
    
    //d9eedd6ead8e6896532d8097738bb170
    public function ParHHListarTiposActividades(){
        
        $List = DB::SELECT("SELECT Id, Nombre "
                . "FROM par_departamento_trafico "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre ASC");
        foreach($List as $d){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        return response()->json([
            'TiposActividad' => $List,
        ]);
    }
    
    //4ad89138ada39730a8674575021fe8c6
    public function ParHHListarDeptosTrafico(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        
        $Deptos = DB::SELECT("SELECT "
                . "p.Id, p.Nombre "
                . "FROM Par_Tipo_Actividad_HH p "
                . "WHERE p.Estado = 1 AND "
                . "p.Id NOT IN (SELECT d.IdActividad  "
                . "FROM hh_actividadesdepartamentos d "
                . "WHERE d.IdDepartamento = ".parent::CodeDescrypt($Credentials['Hash']).")");
        foreach($Deptos as $d){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        return response()->json([
            'Deptos' => $Deptos,
        ]);
    }
    
    
    //fe5e053c865cfe1756856993fe509e04
    public function ParHHAsociarActividadDepto(){
        
        try {
            $Credentials = $this->validate(request(),[
                'TipoActividad' => 'required|int',
                'ActividadesHH' => 'required|array',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            DB::beginTransaction();
            DB::enableQueryLog();
            for($i = 0; $i < count($Credentials['ActividadesHH']); $i++){
                $id = DB::table('hh_actividadesdepartamentos')
                ->insertGetId([
                    'IdDepartamento' => parent::CodeDescrypt($Credentials['TipoActividad']),
                    'IdActividad' => parent::CodeDescrypt($Credentials['ActividadesHH'][$i]),
                    'IdUser' => $Usuario->IdUsuario,
                    'Fecha' => date('Y-m-d H:i:s')
                ]);
                
                //parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'hh_actividadesdepartamentos');
            }
                        
            DB::commit();
            DB::disableQueryLog();
            return redirect()->route('c92932129875b71e745711629c7165f4');

        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            dd($ex);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            dd($qe);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            dd($th);
        }
        
    }
    
    //0da24ffb030873fb234f983666b27969
    public function ParDataActividadesDeptosHH(Request $request){
        $draw = $request['draw'];
        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  h.Estado = 1 ";
        }else{
            $sqlAdicional = "  h.Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM par_tipo_actividad_hh h "
                . "INNER JOIN hh_actividadesdepartamentos hd on hd.IdActividad = h.Id "
                . "INNER JOIN par_departamento_trafico d on hd.IdDepartamento = d.Id "
                . "Where "
                .$sqlAdicional;

        $sqlCampos = "hd.Id, d.Nombre as Departamento, h.Nombre as Actividad ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (d.Nombre like '%".$searchValue."%' OR  h.Nombre like '%".$searchValue."%' ) ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $PAR_HORAS_HOMBRE_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('PAR_HORAS_HOMBRE')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($PAR_HORAS_HOMBRE_EDITAR) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Actividad"=>$row->Actividad,
              "Departamento"=>$row->Departamento,
              "PAR_HORAS_HOMBRE_EDITAR"=>$permiso_editar,
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
    
    
    //890644cb5ca32311046e500caa1075da
    public function ParEliminarAsocActDeptHH(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        if( DB::DELETE("DELETE FROM  hh_actividadesdepartamentos WHERE Id = ".parent::CodeDescrypt($Credentials['Hash']))){

            $Query = "DELETE FROM  hh_actividadesdepartamentos WHERE Id = ".parent::CodeDescrypt($Credentials['Hash']);

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                    . "".parent::CodeDescrypt($Credentials['Hash']).",'PAR_HORAS_HOMBRE','".addslashes($Query)."','DELETE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            return response()->json(['success'=>'1']);
        }ELSE{
            return response()->json(['success'=>'0']);
        }
    }
    
    //80d0ea32d6299b1eb289757e5ff4bf05
    public function HHListarDeptoTraficoUser(){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $Data = DB::SELECT("SELECT "
                . "d.Id, d.Nombre as Departamento "
                . "FROM asoc_usuario_departamento asd "
                . "INNER JOIN par_departamento_trafico d on asd.IdDepto = d.Id "
                . "WHERE asd.IdUsuario = ".$Usuario->IdUsuario." ORDER BY d.Nombre ASC");
        foreach($Data as $d){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        $PermisosEmpresa = DB::SELECT("SELECT DISTINCT "
                . "d.IdEmpresa as Id, d.NombreComercial "
                . "FROM par_usuarioempresa asd "
                . "INNER JOIN Empresa d on asd.IdEmpresa = d.IdEmpresa "
                . "WHERE d.estado = 1 AND asd.IdUsuario = ".$Usuario->IdUsuario." ORDER BY d.NombreComercial ASC");
        foreach($PermisosEmpresa as $d){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        //$ActividadesRealizadas
        
        return response()->json([
            'ListDeptos' => $Data,
            'PermisosEmpresa' => $PermisosEmpresa,
        ]);
    }
    
    //feb23628f90bdd23513b1eb6e7324f24
    public function HHListarActividadesDepartamento(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $Data = DB::SELECT("SELECT "
                . "h.Id, h.Nombre "
                . "FROM par_tipo_actividad_hh h "
                . "INNER JOIN hh_actividadesdepartamentos hh on "
                . "hh.IdActividad = h.Id "
                . "WHERE hh.IdDepartamento = ".parent::CodeDescrypt($Credentials['Hash'])." "
                . "ORDER BY h.Nombre ASC");
        foreach($Data as $d){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        return response()->json([
            'ListActividades' => $Data,
        ]);
    }
    
    //0276ae4bc2484a62f2b3115ac09f2ca7
    public function HHGuardarActividades(Request $request){
        
        if( $request->input('TipoRegistroHH') == 'PERSONAL'){
            DB::beginTransaction();
            DB::enableQueryLog();
            try {
                $Credentials = $this->validate($request, [
                    'ParDesde' => 'required|date',
                    'HoraDesde' => 'required|string',
                    'ParFin' => 'required|date',
                    'HoraHasta' => 'required|string',
                    'DepartamentosHH' => 'required|int',
                    'ActividadHH' => 'required|int',
                    'ObservacionHH' => 'required|string',
                ]);
                
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                $id = DB::table('hh_actividades_usuario')
                ->insertGetId([
                    'FechaInicio' => $Credentials['ParDesde']." ".$Credentials['HoraDesde'],
                    'FechaFin' => $Credentials['ParFin']." ".$Credentials['HoraHasta'],
                    'Descripcion' => $Credentials['ObservacionHH'],
                    'TipoRegistro' => "Personal",
                    'IdTipoActividad' => parent::CodeDescrypt($Credentials['ActividadHH']),
                    'IdUsuario' => $Usuario->IdUsuario,
                    'IdDepartamento' => parent::CodeDescrypt($Credentials['DepartamentosHH']),
                    'Fecha' => date('Y-m-d H:i:s')
                ]);
                DB::commit();
                DB::disableQueryLog();
                $data = [
                    'success' => true
                ];

                return response()->json($data, 200);
            }catch (ValidationException $ex) {
                $data = parent::validateException($ex);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (QueryException $qe) {
                $data = parent::queryException($qe);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (\Throwable $th) {
                $data = parent::normalExeption($th);
                DB::rollBack();
                return response()->json($data, 500);
            }
        }else if($request->input('TipoRegistroHH') == 'EMPRESA'){
            DB::beginTransaction();
            DB::enableQueryLog();
            try {
                $Credentials = $this->validate($request, [
                    'ParDesde' => 'required|date',
                    'HoraDesde' => 'required|string',
                    'ParFin' => 'required|date',
                    'HoraHasta' => 'required|string',
                    'DepartamentosHH' => 'required|int',
                    'ActividadHH' => 'required|int',
                    'EmpresaHH' => 'required|int',
                ]);
                
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                
                $id = DB::table('hh_actividades_usuario')
                ->insertGetId([
                    'FechaInicio' => $Credentials['ParDesde']." ".$Credentials['HoraDesde'],
                    'FechaFin' => $Credentials['ParFin']." ".$Credentials['HoraHasta'],
                    'Descripcion' => '',
                    'TipoRegistro' => "Empresa",
                    'IdTipoActividad' => parent::CodeDescrypt($Credentials['ActividadHH']),
                    'IdUsuario' => $Usuario->IdUsuario,
                    'IdDepartamento' => parent::CodeDescrypt($Credentials['DepartamentosHH']),
                    'IdEmpresa' => parent::CodeDescrypt($Credentials['EmpresaHH']),
                    'Fecha' => date('Y-m-d H:i:s')
                ]);
                DB::commit();
                DB::disableQueryLog();
                $data = [
                    'success' => true
                ];

                return response()->json($data, 200);
            }catch (ValidationException $ex) {
                $data = parent::validateException($ex);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (QueryException $qe) {
                $data = parent::queryException($qe);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (\Throwable $th) {
                $data = parent::normalExeption($th);
                DB::rollBack();
                return response()->json($data, 500);
            }
        }else if($request->input('TipoRegistroHH') == 'CLIENTE'){
            DB::beginTransaction();
            DB::enableQueryLog();
            try {
                $Credentials = $this->validate($request, [
                    'ParDesde' => 'required|date',
                    'HoraDesde' => 'required|string',
                    'ParFin' => 'required|date',
                    'HoraHasta' => 'required|string',
                    'DepartamentosHH' => 'required|int',
                    'ActividadHH' => 'required|int',
                    'EmpresaHH' => 'required|int',
                    'UnidadHH' => 'required|int',
                    'ClienteHH' => 'required|int',
                ]);
                
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                
                $id = DB::table('hh_actividades_usuario')
                ->insertGetId([
                    'FechaInicio' => $Credentials['ParDesde']." ".$Credentials['HoraDesde'],
                    'FechaFin' => $Credentials['ParFin']." ".$Credentials['HoraHasta'],
                    'Descripcion' => '',
                    'TipoRegistro' => "Cliente",
                    'IdTipoActividad' => parent::CodeDescrypt($Credentials['ActividadHH']),
                    'IdUsuario' => $Usuario->IdUsuario,
                    'IdDepartamento' => parent::CodeDescrypt($Credentials['DepartamentosHH']),
                    'IdEmpresa' => parent::CodeDescrypt($Credentials['EmpresaHH']),
                    'IdUnidad' => parent::CodeDescrypt($Credentials['UnidadHH']),
                    'IdCliente' => parent::CodeDescrypt($Credentials['ClienteHH']),
                    'Fecha' => date('Y-m-d H:i:s')
                ]);
                //$request->input('TipoRegistroHH')
                
                $Proyectos = \GuzzleHttp\json_decode($request->input('Proyectos'));
                if( count($Proyectos) > 0 ){
                    for($i = 0; $i < count($Proyectos);$i++){
                        $Proyectos[$i] = (array) $Proyectos[$i];
                        
                        $idx = DB::table('hhproyectosusuario')
                        ->insertGetId([
                            'IdProyecto' =>parent::CodeDescrypt($Proyectos[$i]['Id']),
                            'IdHH' => $id
                        ]);
                    }
                }
                DB::commit();
                DB::disableQueryLog();
                $data = [
                    'success' => true
                ];

                return response()->json($data, 200);
            }catch (ValidationException $ex) {
                $data = parent::validateException($ex);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (QueryException $qe) {
                $data = parent::queryException($qe);
                DB::rollBack();
                return response()->json($data, 500);
            } catch (\Throwable $th) {
                $data = parent::normalExeption($th);
                DB::rollBack();
                return response()->json($data, 500);
            }
        }
    }
    
    //92dca4ce7ddc273b062bc25d1c3c137a
    public function HHListarActividadesRealizadas(){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $FechaI = date("Y-m-d",strtotime('-30 day', strtotime(date("Y-m-d"))));
        $FechaF = date("Y-m-d",strtotime('+30 day', strtotime(date("Y-m-d"))));
        
        $Data = DB::SELECT("SELECT DISTINCT "
                . "hh.Id, CASE WHEN hh.FechaInicio > hh.FechaFin THEN hh.FechaFin ELSE hh.FechaInicio  END AS FechaInicio, "
                . "CASE WHEN hh.FechaInicio > hh.FechaFin THEN hh.FechaInicio ELSE hh.FechaFin  END AS FechaFin,"
                . "date_format(hh.FechaInicio,'Y%-%m-%d') as xx, "
                . "hh.Descripcion, hh.TipoRegistro, ha.Nombre as TipoActividad, "
                . "d.Nombre as Departamento,"
                . "case when isnull(e.NombreComercial) then '' else e.NombreComercial end as Empresa,"
                . "case when isnull(u.Nombre) then '' else u.Nombre end as Unidad, "
                . "case when isnull(c.NombreComercial) then '' else c.NombreComercial end  as Cliente "
                . ""
                . "FROM hh_actividades_usuario hh "
                . "INNER JOIN par_tipo_actividad_hh ha on hh.IdTipoActividad = ha.Id "
                . "INNER JOIN par_departamento_trafico d on d.id = hh.IdDepartamento "
                . "LEFT JOIN Empresa e on hh.IdEmpresa = e.IdEmpresa "
                . "LEFT JOIN unidad_negocio u on hh.IdUnidad = u.IdUnidad "
                . "LEFT JOIN cliente c on hh.IdCliente = c.IdCliente "
                . "WHERE hh.IdUsuario = ".$Usuario->IdUsuario." "
                . "AND date_format(hh.FechaInicio,'%Y-%m-%d') BETWEEN '$FechaI' AND '$FechaF'"
                );
        
        foreach($Data as $d){
            
            
            $Proyectos = DB::SELECT("SELECT t.Referencia, t.Codigo "
                    . "FROM Proyectos t "
                    . "INNER JOIN hhproyectosusuario h "
                    . "on t.Id = h.IdProyecto "
                    . "WHERE h.Idhh = ".$d->Id);
            $d->Proyectos = $Proyectos;
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        
        return response()->json([
            'Actividades' => $Data
        ]);
    }
    
    //92dca4ce7ddc273b062bc25d1c3c137a
    public function HHBorrarActividad(){
        
        try {
            $Credentials = $this->validate(request(),[
                'Hash' => 'required|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            DB::beginTransaction();
            DB::enableQueryLog();
            $Query = 'DELETE FROM hh_actividades_usuario WHERE Id = (?)';
            $Data = [
                parent::CodeDescrypt($Credentials['Hash']),
            ];
            DB::DELETE($Query,$Data);
            
            $Query = 'DELETE FROM hhproyectosusuario WHERE IdHH = (?)';
            $Data = [
                parent::CodeDescrypt($Credentials['Hash']),
            ];
            DB::DELETE($Query,$Data);
                        
            DB::commit();
            DB::disableQueryLog();
            return redirect()->route('c92932129875b71e745711629c7165f4');

        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            dd($ex);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            dd($qe);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            dd($th);
        }
    }
    
    
    //da8152fcb80e8a23b27b161b520ebca1
    public function HHListarUnidadesEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
            ]);

            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $idEmpresa = parent::CodeDescrypt($credentials['Hash']);

            $unidadesUsuario = DB::table('unidad_negocio AS un')
            ->join('par_usuariounidad AS pun', 'un.IdUnidad', '=', 'pun.IdUnidad')
            ->where(['un.IdEmpresa'=>$idEmpresa, 'pun.IdUsuario'=>$Usuario->IdUsuario, 'un.Estado'=>1])
            ->select('un.IdUnidad','un.Nombre')
            ->distinct()
            ->get();


            foreach ($unidadesUsuario as $unidad) {
                $unidad->IdUnidad = parent::CodeEncrypt($unidad->IdUnidad);
                $unidad->Hash = $unidad->IdUnidad;
            }

            return response()->json([
                'Unidades' => $unidadesUsuario,
            ]);
        } catch (ValidationException $ex) {
            dd($ex);
        } catch (QueryException $qe) {
            dd($qe);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    
    
    //3dd6bfd429a265b50c2ef1672e4977c7
    public function HHListarClientesEmpresa(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|int',
            ]);

            $idEmpresa = parent::CodeDescrypt($credentials['Hash']);

            $clientes = DB::table('cliente AS c')
                ->join('asoc_empresa_cliente AS aec', 'c.IdCliente', '=', 'aec.IdCliente')
                ->where('aec.IdEmpresa', $idEmpresa)
                ->where('c.Estado', 1)
                ->select('c.IdCliente', 'c.NombreComercial', 'c.Nit')
                ->distinct()
                ->orderBy('c.NombreComercial','ASC')
                ->get();

            foreach ($clientes as $cliente) {
                $cliente->IdCliente = parent::CodeEncrypt($cliente->IdCliente);
            }

            return response()->json([
                'Clientes' => $clientes,
            ]);
        } catch (ValidationException $ex) {
            dd($ex);
        } catch (QueryException $qe) {
            dd($qe);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    
    //1aeacb24e888f1d03f93c026b1440ff9
    public function HHListarProyectos(Request $request)
    {
        $Credentials = $this->validate($request, [
            'Hash' => 'required|int',
            'Hash2' => 'required|int',
            'Hash3' => 'required|int',
            'YearOT' => 'required|int',
            'TextBusqueda' => 'nullable|string',
        ]);
        $draw = $request['draw'];
        
        $sqlAdicional = " "
                . "IdEmpresa = ".parent::CodeDescrypt($Credentials['Hash'])." AND "
                . "IdUnidad = ".parent::CodeDescrypt($Credentials['Hash2'])." AND "
                . "IdCliente = ".parent::CodeDescrypt($Credentials['Hash3'])." AND "
                . "YEAR(Fecha) = ".($Credentials['YearOT'])." AND "
                . "(Codigo like '%".($Credentials['TextBusqueda'])."%' or Referencia like '%".($Credentials['TextBusqueda'])."%' OR Descripcion like '%".($Credentials['TextBusqueda'])."%' ) "
                ;
        $sqlFrom = "FROM proyectos Where "
                .$sqlAdicional;
        $sqlCampos = "Id, Codigo, Referencia, Descripcion, date_format(Fecha,'%Y-%m-%d') as Fecha ";

        $Records = DB::SELECT("SELECT ".$sqlCampos.$sqlFrom);
        
        foreach($Records as $row){
            $row->Id = (new Controller)->CodeEncrypt($row->Id);
        }

        $data = [
            'Proyectos' => $Records
        ];

        return response()->json($data, 200);
    }
}

