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
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;
use Illuminate\Support\Facades\Crypt;

class SSAccesosController extends Controller
{
    public function ListarDatosGeneralesAccesos(){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Tipo_Sistemas "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $INFORMACION_SISTEMAS_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_SISTEMAS_CREAR')");
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "INFORMACION_SISTEMAS_CREAR"=>$INFORMACION_SISTEMAS_CREAR
        ]);
    }
    
    public function ListarDatosBibliotecaAccesos(Request $request){
        
        $draw = $request['draw'];

        $sqlAdicional = "";
        if( $request['search']['Propietario'] == 0 ){
            $sqlAdicional .= " ";
        }else{
            $sqlAdicional .= " and i.IdTipoSistemas = ".(new Controller)->CodeDescrypt($request['search']['Propietario'])." ";
        }
        
        $sqlFrom = "FROM "
                . "sistemas i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Tipo_Sistemas c on i.IdTipoSistemas  = c.Id "
                . "WHERE i.estado = ".$request['search']['Estado'];

        $sqlCampos = " i.id, i.Direccion as Url, i.App, i.Marca as Referencia,  "
                . "date_format(i.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as Tipo ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Direccion like '%".$searchValue."%' or "
                   . "i.App like '%".$searchValue."%' or "
                   . "i.Marca like '%".$searchValue."%' or "
                   . "c.Nombre  like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fechahora,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }else{
            $searchQuery = $sqlAdicional;
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_SISTEMAS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_SISTEMAS_EDITAR')");
        $INFORMACION_SISTEMAS_ELIMINAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_SISTEMAS_ELIMINAR')");
        $INFORMACION_SISTEMAS_PWD = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_SISTEMAS_PWD')");
        
        
        
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Url"=>$row->Url,
                "App"=>($row->App),
                "Referencia"=>($row->Referencia),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "Tipo"=>$row->Tipo,
                "INFORMACION_SISTEMAS_EDITAR"=>$INFORMACION_SISTEMAS_EDITAR,
                "INFORMACION_SISTEMAS_ELIMINAR"=>$INFORMACION_SISTEMAS_ELIMINAR,
                "INFORMACION_SISTEMAS_PWD"=>$INFORMACION_SISTEMAS_PWD,
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data
        );

        return json_encode($response);
    }
    
    public function GuardarAcceso(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $Url = ($request->input('NewUrl') == '') ? '': $request->input('NewUrl');
            
            $Query = 'INSERT INTO sistemas ('
                    . 'Direccion,'
                    . 'Usuario,'
                    . 'Clave,'
                    . 'App,'
                    . 'Marca,'
                    . 'IdUsuario,'
                    . 'Estado,'
                    . 'IdTipoSistemas,'
                    . 'Fechahora'
                    . ') values (?,?,?,?,?,?,?,?,?)';
            $Data = [
                //Crypt::encryptString('Aquí una cadena de texto');
                $Url,
                Crypt::encryptString("{*!*}".$request->input('NewUsuario')."{*!*}"),
                Crypt::encryptString("{*!*}".$request->input('NewPass')."{*!*}"),
                $request->input('Newapp'),
                $request->input('NewReferencia'),
                $sqlUser[0]->IdUsuario,
                1,
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            $IdEmpleado = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_SISTEMAS_CREAR');

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
    
    public function EliminarAccesoBiblioteca(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM sistemas WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);


            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_SISTEMAS_ELIMINAR');

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
    
    public function ConsultarInformacionItemAcceso(Request $request){
        $sqlPropietarios = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM Par_Tipo_Sistemas "
                . "WHERE Estado = 1 order by Nombre asc");
        foreach($sqlPropietarios as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $sqlInformacion = DB::SELECT("SELECT * "
                . "from Sistemas "
                . "WHERE id = ".(new Controller)->CodeDescrypt($request->input("Hash")));
        foreach($sqlInformacion as $d){
            $d->Id = (new Controller)->CodeEncrypt($d->Id);
            $d->IdTipoSistemas = (new Controller)->CodeEncrypt($d->IdTipoSistemas);
            $temp = Crypt::decryptString($d->Usuario);
            $temp = explode("{*!*}", $temp);
            $d->Usuario = ($temp[1]);
            
            $temp = Crypt::decryptString($d->Clave);
            $temp = explode("{*!*}", $temp);
            $d->Clave = ($temp[1]);
            //d->IdTipoSistemas = (new Controller)->CodeEncrypt($d->IdTipoSistemas);
        }
        return response()->json([
            "Propietarios"=>$sqlPropietarios,
            "InfoItem"=>$sqlInformacion
        ]);
    }
    
    public function GuardarEditarAcceso(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $Url = ($request->input('NewUrl') == '') ? '': $request->input('NewUrl');
            
            $Query = 'UPDATE sistemas SET '
                    . 'Direccion = ?,'
                    . 'Usuario = ?,'
                    . 'Clave = ?,'
                    . 'App = ?,'
                    . 'Marca = ?,'
                    . 'IdUsuario = ?,'
                    . 'Estado = ?,'
                    . 'IdTipoSistemas = ?,'
                    . 'Fechahora = ?'
                    . ' WHERE Id = ?';
            $Data = [
                //Crypt::encryptString('Aquí una cadena de texto');
                $Url,
                Crypt::encryptString("{*!*}".$request->input('NewUsuario')."{*!*}"),
                Crypt::encryptString("{*!*}".$request->input('NewPass')."{*!*}"),
                $request->input('Newapp'),
                $request->input('NewReferencia'),
                $sqlUser[0]->IdUsuario,
                $request->input('EstadoAcceso'),
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                date("Y-m-d H:i:s"),
                (new Controller)->CodeDescrypt($request->input("Hash"))
            ];
            DB::UPDATE($Query,$Data);
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input("Hash"));
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_SISTEMAS_EDITAR');

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
    
    public function b01174c89fa348ffb1c3956fa2efb32c(Request $request){
        
        $sqlInformacion = DB::SELECT("SELECT Clave,Usuario, App "
                . "from Sistemas "
                . "WHERE id = ".(new Controller)->CodeDescrypt($request->input("Hash")));
        foreach($sqlInformacion as $d){
            $temp = Crypt::decryptString($d->Usuario);
            $temp = explode("{*!*}", $temp);
            $d->Usuario = ($temp[1]);
            
            $temp = Crypt::decryptString($d->Clave);
            $temp = explode("{*!*}", $temp);
            $d->Clave = ($temp[1]);
            //d->IdTipoSistemas = (new Controller)->CodeEncrypt($d->IdTipoSistemas);
        }
        return response()->json([
            "InfoItem"=>$sqlInformacion
        ]);
    }
}

