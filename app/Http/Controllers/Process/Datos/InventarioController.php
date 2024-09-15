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

namespace App\Http\Controllers\Process\Datos;

use App\Http\Controllers\Controller;
use App\Exports\datos\InventarioGeneral;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;


class InventarioController extends Controller
{
    public function ListarPropietariosInventarioGeneral(){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM par_propietario_inventario_oficina "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $INFORMACION_INVENTARIO_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_INVENTARIO_CREAR')");
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "INFORMACION_INVENTARIO_CREAR"=>$INFORMACION_INVENTARIO_CREAR
        ]);
    }
    
    public function ListarDatosInventarioGeneral(Request $request){
        
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Propietario'] == 0 ){
            $sqlAdicional .= " ";
        }else{
            $sqlAdicional .= " and i.IdPropietario = ".(new Controller)->CodeDescrypt($request['search']['Propietario'])." ";
        }
        
        $sqlFrom = "FROM "
                . "inventario_oficina i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN par_propietario_inventario_oficina c on i.IdPropietario = c.Id "
                . "WHERE i.estado = ".$request['search']['Estado'];

        $sqlCampos = " i.id, i.Nombre, i.Descripcion, i.Ubicacion, i.Cantidad, i.Foto, i.CostoUnitario, "
                . "(i.CostoUnitario * i.Cantidad) as Total, i.CodigoReferencia, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as Propietario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "i.Descripcion like '%".$searchValue."%' or "
                   . "i.Ubicacion like '%".$searchValue."%' or "
                   . "i.Cantidad like '%".$searchValue."%' or "
                   . "i.CostoUnitario like '%".$searchValue."%' or "
                   . "i.CodigoReferencia like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }else{
            $searchQuery = $sqlAdicional;
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_INVENTARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_INVENTARIO_EDITAR')");
        
        
        $TotalInventarioFiltro = DB::SELECT("SELECT SUM(i.CostoUnitario * i.Cantidad) as Total "
                . " ".$sqlFrom.$searchQuery."");
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Nombre"=>($row->Nombre),
                "Descripcion"=>($row->Descripcion),
                "Ubicacion"=>$row->Ubicacion,
                "Cantidad"=>$row->Cantidad,
                "Foto"=>$row->Foto,
                "CostoUnitario"=>$row->CostoUnitario,
                "Total"=>$row->Total,
                "CodigoReferencia"=>$row->CodigoReferencia,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "Propietario"=>$row->Propietario,
                "INFORMACION_INVENTARIO_EDITAR"=>$INFORMACION_INVENTARIO_EDITAR
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "ValorTotal"=>$TotalInventarioFiltro,
            "Sql"=>"SELECT SUM(i.CostoUnitario * i.Cantidad) as Total "
                . " ".$sqlFrom.$searchQuery."",
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function DataInventarioGeneral($Propietario,$Estado,$Valor){
        

        $sqlAdicional = "";
        if( $Propietario == 0 ){
            $sqlAdicional .= " ";
        }else{
            $sqlAdicional .= " and i.IdPropietario = ".$Propietario." ";
        }
        
        $sqlCampos = "SELECT i.id, i.Nombre, i.Descripcion, i.Ubicacion, i.Cantidad, i.Foto, i.CostoUnitario, CASE WHEN i.Estado =  1 THEN 'Activo' else 'Inactivo' END as Estado, "
                . "(i.CostoUnitario * i.Cantidad) as Total, i.CodigoReferencia, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as Propietario ";
        
        $sqlFrom = "FROM "
                . "inventario_oficina i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN par_propietario_inventario_oficina c on i.IdPropietario = c.Id "
                . "WHERE i.estado = ".$Estado;

       

        ## Search
        $searchQuery = " ";
        $searchValue = $Valor;
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "i.Descripcion like '%".$searchValue."%' or "
                   . "i.Ubicacion like '%".$searchValue."%' or "
                   . "i.Cantidad like '%".$searchValue."%' or "
                   . "i.CostoUnitario like '%".$searchValue."%' or "
                   . "i.CodigoReferencia like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }else{
            $searchQuery = $sqlAdicional;
        }
        $data = array();
        //$empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $Datos = DB::SELECT( $sqlCampos.$sqlFrom.$searchQuery );
        foreach( $Datos as $d ){
            $temp = explode(" ",$d->Foto);
            $tx = "";
            for($t = 0; $t < count($temp);$t++){
                if( $t < (count($temp)-1) ){
                    $tx .= $temp[$t]."%20";
                }else{
                    $tx .= $temp[$t];
                }
            }
            //$d->Foto = $tx;
        }
        return $Datos;
    }
    
    public function DataInventarioGeneralR(Request $request){
        
        try {
            $credentials = $this->validate($request, [
                'Propietario' => 'required|int',
                'Estado' => 'required|int',
                'Valor' => 'nullable|string',
                'type' => 'required|string'
            ]);

            $idEmpresa = null;
            $idUnidad = null;
            $idCliente = null;
            $idEstado = null;
            $type = $credentials['type'];

            $Propietario = $credentials['Propietario'];
            $Estado = $credentials['Estado'];
            $Valor = $credentials['Valor'];
            $sqlAdicional = "";
            if( $Propietario == 0 ){
                $sqlAdicional .= " ";
            }else{
                $sqlAdicional .= " and i.IdPropietario = ".$Propietario." ";
            }

            switch ($type) {
                case 'excel':
                    return (new InventarioGeneral($Propietario, $Estado, $Valor))->download('Inventario General '.date("Y-m-d H:i:s").'.xlsx');
                    break;
                case 'pdf':
                    return (new InventarioGeneral($Propietario, $Estado, $Valor))->download('Inventario General '.date("Y-m-d H:i:s").'.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
                    break;
                default:
                    return (new InventarioGeneral($Propietario, $Estado, $Valor))->download('Inventario General '.date("Y-m-d H:i:s").'.xlsx');
                    break;
            }
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 500);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 500);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            dd($data);
            return response()->json($data, 500);
        }
    }
    
    public function GuardarInventarioGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();
            $CostoUnitario = ($request->input('CostoUnitario') == '') ? '0': $request->input('CostoUnitario');
            
            $Query = 'INSERT INTO inventario_oficina ('
                    . 'Nombre,'
                    . 'Descripcion,'
                    . 'Ubicacion,'
                    . 'Cantidad,'
                    . 'Foto,'
                    . 'CostoUnitario,'
                    . 'CodigoReferencia,'
                    . 'IdPropietario,'
                    . 'Estado,'
                    . 'IdUsuario,'
                    . 'Fecha) values (?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                $request->input('NombreItem'),
                $request->input('descripcion_item'),
                $request->input('UbicacionItem'),
                $request->input('CantidadItem'),
                $pathLogo,
                $CostoUnitario,
                $request->input('Codificacion'),
                (new Controller)->CodeDescrypt($request->input('Propietario')),
                1,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            $IdEmpleado = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_INVENTARIO_CREAR');

            DB::commit();
            $request->file('ParLogo')->storeAs('datos/InventarioGeneral/', $IdEmpleado."_".$pathLogo);
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
    
    public function ConsultarInformacionItemInventarioGeneral(Request $request){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM par_propietario_inventario_oficina "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        
        $InfoItem = DB::SELECT("SELECT * "
                . "FROM inventario_oficina "
                . "WHERE id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        foreach($InfoItem as $d){
            $d->IdPropietario = (new Controller)->CodeEncrypt($d->IdPropietario);
        }
        
        $INFORMACION_INVENTARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_INVENTARIO_EDITAR')");
        
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "InfoItem"=>$InfoItem,
            "INFORMACION_INVENTARIO_EDITAR"=>$INFORMACION_INVENTARIO_EDITAR
        ]);
    }
    
    public function GuardarEditarInventarioGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $CostoUnitario = ($request->input('CostoUnitario') == '') ? '0': $request->input('CostoUnitario');
            
            if( $request->input('Archivo') == 1 ){
                $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                $Query = 'Update inventario_oficina SET '
                    . 'Nombre = ?,'
                    . 'Descripcion = ?,'
                    . 'Ubicacion = ?,'
                    . 'Cantidad = ?,'
                    . 'Foto = ?,'
                    . 'CostoUnitario = ?,'
                    . 'CodigoReferencia = ?,'
                    . 'IdPropietario = ?,'
                    . 'Estado = ?,'
                    . 'IdUsuario = ?,'
                    . 'Fecha = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    $request->input('NombreItem'),
                    $request->input('descripcion_item'),
                    $request->input('UbicacionItem'),
                    $request->input('CantidadItem'),
                    $pathLogo,
                    $CostoUnitario,
                    $request->input('Codificacion'),
                    (new Controller)->CodeDescrypt($request->input('Propietario')),
                    $request->input('EstadoItem'),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    (new Controller)->CodeDescrypt($request->input('Hash')),
                ];
                $request->file('ParLogo')->storeAs('datos/InventarioGeneral/', (new Controller)->CodeDescrypt($request->input('Hash'))."_".$pathLogo);
            }else{
                $Query = 'Update inventario_oficina SET '
                    . 'Nombre = ?,'
                    . 'Descripcion = ?,'
                    . 'Ubicacion = ?,'
                    . 'Cantidad = ?,'
                    . 'CostoUnitario = ?,'
                    . 'CodigoReferencia = ?,'
                    . 'IdPropietario = ?,'
                    . 'Estado = ?,'
                    . 'IdUsuario = ?,'
                    . 'Fecha = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    $request->input('NombreItem'),
                    $request->input('descripcion_item'),
                    $request->input('UbicacionItem'),
                    $request->input('CantidadItem'),
                    $CostoUnitario,
                    $request->input('Codificacion'),
                    (new Controller)->CodeDescrypt($request->input('Propietario')),
                    $request->input('EstadoItem'),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    (new Controller)->CodeDescrypt($request->input('Hash')),
                ];
            }
            
            DB::UPDATE($Query,$Data);
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_INVENTARIO_EDITAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
    
    public function ListarDatosInventarioSistemas(){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Propietario_Inventario "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $sqlMarcas = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Marca_Inventario "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlMarcas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $sqlTipo = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Tipo_InventarioSistemas "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlTipo as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "Marcas"=>$sqlMarcas,
            "Tipo"=>$sqlTipo,
        ]);
    }
    
    public function GuardarInventarioGeneralSistemas(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();
            $CostoUnitario = ($request->input('CostoUnitarioSis') == '') ? '0': $request->input('CostoUnitarioSis');
            $Serial = ($request->input('Serial') == '') ? '': $request->input('Serial');
            
            $Query = 'INSERT INTO inventario_sistemas ('
                    . 'Descripcion,'
                    . 'Modelo,'
                    . 'Serial,'
                    . 'Codigo,'
                    . 'IdTipo,'
                    . 'IdMarca,'
                    . 'IdPropietario,'
                    . 'IdUsuario,'
                    . 'Fecha,'
                    . 'Cantidad,'
                    . 'CostoUnitario,'
                    . 'Estado,'
                    . 'Foto) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                $request->input('descripcion_itemSistemas'),
                $request->input('Modelo'),
                $Serial,
                $request->input('Codificacion'),
                (new Controller)->CodeDescrypt($request->input('Tipo')),
                (new Controller)->CodeDescrypt($request->input('Marcas')),
                (new Controller)->CodeDescrypt($request->input('Propietario')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $request->input('CantidadItemSistemas'),
                $CostoUnitario,
                1,
                $pathLogo
            ];
            DB::INSERT($Query,$Data);
            $IdEmpleado = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_INVENTARIO_SISTEMAS_CREAR');

            DB::commit();
            $request->file('ParLogo')->storeAs('datos/InventarioSistemas/', $IdEmpleado."_".$pathLogo);
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
    
    public function ListarItemsInventarioSistemas(Request $request){
        
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Propietario'] == 0 ){
            $sqlAdicional .= " and i.IdPropietario = i.IdPropietario ";
        }else{
            $sqlAdicional .= " and i.IdPropietario = ".(new Controller)->CodeDescrypt($request['search']['Propietario'])." ";
        }
        
        if( $request['search']['Marca'] == 0 ){
            $sqlAdicional .= " and i.IdMarca = i.IdMarca ";
        }else{
            $sqlAdicional .= " and i.IdMarca = ".(new Controller)->CodeDescrypt($request['search']['Marca'])." ";
        }
        
        if( $request['search']['Tipo'] == 0 ){
            $sqlAdicional .= " and i.IdTipo = i.IdTipo ";
        }else{
            $sqlAdicional .= " and i.IdTipo = ".(new Controller)->CodeDescrypt($request['search']['Tipo'])." ";
        }
        
        $sqlFrom = "FROM "
                . "inventario_sistemas i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Marca_Inventario m on i.IdMarca = m.Id "
                . "INNER JOIN Par_Propietario_Inventario c on i.IdPropietario = c.Id "
                . "INNER JOIN Par_Tipo_InventarioSistemas t on i.IdTipo = t.Id "
                . "WHERE i.Estado = ".$request['search']['Estado'];

        $sqlCampos = " i.id, i.Modelo, i.Descripcion, i.Serial, i.Cantidad, i.Foto, i.CostoUnitario, "
                . "(i.CostoUnitario * i.Cantidad) as Total, i.Codigo as CodigoReferencia, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as Propietario , "
                . "m.Nombre as Marca, t.Nombre as Tipo ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Modelo like '%".$searchValue."%' or "
                   . "i.Descripcion like '%".$searchValue."%' or "
                   . "i.Serial like '%".$searchValue."%' or "
                   . "i.Cantidad like '%".$searchValue."%' or "
                   . "i.CostoUnitario like '%".$searchValue."%' or "
                   . "i.Codigo like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "t.Nombre like '%".$searchValue."%' or "
                   . "m.Nombre like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }else{
            $searchQuery = $sqlAdicional;
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_INVENTARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_INVENTARIO_EDITAR')");
        
        
        $TotalInventarioFiltro = DB::SELECT("SELECT SUM(i.CostoUnitario * i.Cantidad) as Total "
                . " ".$sqlFrom.$searchQuery."");
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Modelo"=>($row->Modelo),
                "Descripcion"=>($row->Descripcion),
                "Serial"=>$row->Serial,
                "Cantidad"=>$row->Cantidad,
                "Foto"=>$row->Foto,
                "CostoUnitario"=>$row->CostoUnitario,
                "Total"=>$row->Total,
                "CodigoReferencia"=>$row->CodigoReferencia,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "Propietario"=>$row->Propietario,
                "Marca"=>$row->Marca,
                "Tipo"=>$row->Tipo,
                "INFORMACION_INVENTARIO_EDITAR"=>$INFORMACION_INVENTARIO_EDITAR
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "ValorTotal"=>$TotalInventarioFiltro,
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function ConsultarInformacionItemInventarioSistemas(Request $request){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Propietario_Inventario "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $sqlMarcas = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Marca_Inventario "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlMarcas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $sqlTipo = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Tipo_InventarioSistemas "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlTipo as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $InfoItem = DB::SELECT("SELECT * "
                . "FROM inventario_sistemas "
                . "WHERE id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        foreach($InfoItem as $d){
            $d->IdPropietario = (new Controller)->CodeEncrypt($d->IdPropietario);
            $d->IdMarca = (new Controller)->CodeEncrypt($d->IdMarca);
            $d->IdTipo = (new Controller)->CodeEncrypt($d->IdTipo);
        }
        
        $INFORMACION_INVENTARIO_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_INVENTARIO_EDITAR')");
        
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "Marcas"=>$sqlMarcas,
            "Tipo"=>$sqlTipo,
            "InfoItem"=>$InfoItem,
            "INFORMACION_INVENTARIO_EDITAR"=>$INFORMACION_INVENTARIO_EDITAR,
        ]);
    }
    
    public function GuardarEditarInventarioGeneralSistemas(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            $CostoUnitario = ($request->input('CostoUnitarioSis') == '') ? '0': $request->input('CostoUnitarioSis');
            $Serial = ($request->input('Serial') == '') ? '': $request->input('Serial');
            
            if( $request->input('Archivo') == 1 ){
                $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                $Query = 'UPDATE inventario_sistemas SET '
                    . 'Descripcion = ? ,'
                    . 'Modelo = ? ,'
                    . 'Serial = ? ,'
                    . 'Codigo = ? ,'
                    . 'IdTipo = ? ,'
                    . 'IdMarca = ? ,'
                    . 'IdPropietario = ? ,'
                    . 'IdUsuario = ? ,'
                    . 'Fecha = ? ,'
                    . 'Cantidad = ? ,'
                    . 'CostoUnitario = ? ,'
                    . 'Estado = ? ,'
                    . 'Foto = ?  '
                    . 'WHERE Id = ? ';
                $Data = [
                    $request->input('descripcion_itemSistemas'),
                    $request->input('Modelo'),
                    $Serial,
                    $request->input('Codificacion'),
                    (new Controller)->CodeDescrypt($request->input('Tipo')),
                    (new Controller)->CodeDescrypt($request->input('Marcas')),
                    (new Controller)->CodeDescrypt($request->input('Propietario')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $request->input('CantidadItemSistemas'),
                    $CostoUnitario,
                    $request->input('EstadoItem'),
                    $pathLogo,
                    (new Controller)->CodeDescrypt($request->input('Hash'))
                ];
                $request->file('ParLogo')->storeAs('datos/InventarioSistemas/', (new Controller)->CodeDescrypt($request->input('Hash'))."_".$pathLogo);
            }else{
                $Query = 'UPDATE inventario_sistemas SET '
                    . 'Descripcion = ? ,'
                    . 'Modelo = ? ,'
                    . 'Serial = ? ,'
                    . 'Codigo = ? ,'
                    . 'IdTipo = ? ,'
                    . 'IdMarca = ? ,'
                    . 'IdPropietario = ? ,'
                    . 'IdUsuario = ? ,'
                    . 'Fecha = ? ,'
                    . 'Cantidad = ? ,'
                    . 'CostoUnitario = ? ,'
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
                $Data = [
                    $request->input('descripcion_itemSistemas'),
                    $request->input('Modelo'),
                    $Serial,
                    $request->input('Codificacion'),
                    (new Controller)->CodeDescrypt($request->input('Tipo')),
                    (new Controller)->CodeDescrypt($request->input('Marcas')),
                    (new Controller)->CodeDescrypt($request->input('Propietario')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $request->input('CantidadItemSistemas'),
                    $CostoUnitario,
                    $request->input('EstadoItem'),
                    (new Controller)->CodeDescrypt($request->input('Hash'))
                ];
            }
            
            DB::UPDATE($Query,$Data);
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_INVENTARIO_SISTEMAS_EDITAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>''
            ]);
        }
    }
}

