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

class ProveedorController extends Controller
{
    //7ded3b7e08c99b3c9634ef4b194d4c3c
    public function indexDatosProveedor()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $Permisos = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                . "FROM Usuario u "
                . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                . "WHERE p.Pantalla = 'DATOS_PROVEEDORES' and u.IdUsuario = " . $IdUsuario[0]->IdUsuario);

            foreach ($Permisos as $Permiso) {
                session([$Permiso->Nombre => $IdUsuario[0]->Token]);
            }
            return view('process.datos.proveedores');
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    public function DatosCrearProveedor()
    {

        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
            . "FROM Par_Pais "
            . "WHERE Estado = 1 "
            . "ORDER BY Estado Asc");
        $Empresas = DB::select('select IdEmpresa, NombreLegal, NombreComercial from Empresa where Estado = ?', [1]);
        foreach ($Empresas as $e) {
            $e->hash = (new Controller)->CodeEncrypt($e->IdEmpresa);
        }
        $data = [
            'Paises' => $Paises,
            'Empresas' => $Empresas
        ];
        return response()->json($data, 200);

    }

    public function CrearProveedor(Request $request)
    {
        try {
            $Credentials = $this->validate($request, [
                'ParNit' => 'required|string',
                'ParNombreComercial' => 'required|string',
                'ParNombreLegal' => 'required|string',
                'ParGeneralPais' => 'required|int',
                'ParGeneralDepartamento' => 'required|int',
                'ParGeneralCiudad' => 'required|int',
                'ParDireccion' => 'required|string',
                'ParTelefono' => 'required|string',
                'parActividad' => 'required|string',
                'ParEmpresas' => 'required|array|min:1',
                'ParEmpresas.*' => 'required|int|distinct'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();
            $id = [];

            $idProveedor = DB::table('Proveedor')->insertGetId([
                'NombreComercial' => $Credentials['ParNombreComercial'],
                'NombreLegal' => $Credentials['ParNombreLegal'],
                'Nit' => $Credentials['ParNit'],
                'Direccion' => $Credentials['ParDireccion'],
                'Telefono' => $Credentials['ParTelefono'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'Actividad' => $Credentials['parActividad'],
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            array_push($id, $idProveedor);
            DB::table('Asoc_Empresa_proveedor')->where('IdProveedor', '=', $idProveedor)->delete();
            array_push($id, $idProveedor);
            for ($i=0; $i < count($Credentials['ParEmpresas']); $i++) {
                $idEmpresa = (new Controller)->CodeDescrypt($Credentials['ParEmpresas'][$i]);
                $idAsocProveedor = DB::table('Asoc_Empresa_proveedor')->insertGetId([
                    'IdEmpresa' => $idEmpresa,
                    'IdProveedor' => $idProveedor,
                    'Fecha' => date('Y-m-d h:i:s')
                ]);
                array_push($id, $idAsocProveedor);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_PROVEEDORES_CREAR');

            DB::disableQueryLog();
            DB::commit();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        } catch (ValidationException $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        } catch (QueryException $qe) {
            dd($qe);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        }catch (\Throwable $th) {
            dd($th);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        } catch (\Exception $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        }
    }

    //9e97ceed51da97c6cf1577d3036ddb21
    public function PAR_EstadoProveedor(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $idProveedor = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $Estado = DB::SELECT("SELECT Estado FROM Proveedor WHERE IdProveedor = '".$idProveedor."'");
        $Query = "";
        $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Proveedor set Estado = '$n' WHERE IdProveedor = '".$idProveedor."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE Proveedor set Estado = '$n' WHERE IdProveedor = '".$idProveedor."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idProveedor.",'INFORMACION_PROVEEDORES_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>"UPDATE Proveedor set Estado = '$n' WHERE IdProveedor = '".$idProveedor."';"]);

            }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    //a0422a096a5a6ae243bee945ea959be6
    public function par_DatoInformacionLegalProveedor()
    {
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
            //'Hash2' => 'required|string'
        ]);
        $idProveedor = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $proveedor = DB::table('Proveedor')->where('IdProveedor',$idProveedor)->get();
        $proveedor[0]->Hash = (new Controller)->CodeEncrypt($proveedor[0]->IdProveedor);
        $proveedor[0]->IdProveedor = null;

        $paises = DB::table('Par_Pais')->orderBy('Nombre','asc')->get();
        $departamento = DB::table('Par_Departamento')->orderBy('Nombre','asc')->get();
        $ciudad = DB::table('Par_Ciudad')->orderBy('Nombre','asc')->get();

        //Permisos

        $INFORMACION_PROVEEDORES_LEGAL_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_PROVEEDORES_LEGAL_EDITAR']
        ])->get();

        $Empresas = DB::table('Empresa')->select('IdEmpresa', 'NombreLegal', 'NombreComercial')
        ->where('Estado',1)->get();
        foreach ($Empresas as $e) {
            $e->HashEmpresa = (new Controller)->CodeEncrypt($e->IdEmpresa);
            $e->IdEmpresa = null;
        }
        $EmpresasAsoc = DB::table('Proveedor')
        ->select('Proveedor.IdProveedor', 'Empresa.IdEmpresa', 'Empresa.NombreLegal', 'Empresa.NombreComercial')
        ->join('asoc_empresa_proveedor', 'Proveedor.IdProveedor', '=', 'asoc_empresa_proveedor.IdProveedor')
        ->join('Empresa', 'asoc_empresa_proveedor.IdEmpresa', '=', 'Empresa.IdEmpresa')
        ->where('asoc_empresa_proveedor.IdProveedor', $idProveedor)->get();

        foreach ($EmpresasAsoc as $asoc) {
            $asoc->HashProveedor = (new Controller)->CodeEncrypt($asoc->IdProveedor);
            $asoc->HashEmpresa = (new Controller)->CodeEncrypt($asoc->IdEmpresa);
            $asoc->IdProveedor = null;
            $asoc->IdEmpresa = null;
        }


        if ($proveedor) {
            return response()->json([
                'Proveedor' => $proveedor,
                'Paises' => $paises,
                'Empresas' => $Empresas,
                'PerLegalEdicion' => $INFORMACION_PROVEEDORES_LEGAL_EDITAR,
                'Departamento' => $departamento,
                'Ciudad' => $ciudad,
                'EmpresasAsoc' => $EmpresasAsoc
            ]);
        }
        return response()->json(['Error' => '1']);
    }

    //84fc61f0d881e36d1a1eabd5ec1a54e7
    public function par_DatoInformacionLegalProveedorEdit()
    {
        try {
            $Credentials = $this->validate(request(), [
                'ParNit' => 'required|string',
                'ParNombreComercial' => 'required|string',
                'ParNombreLegal' => 'required|string',
                'ParGeneralPais' => 'required|int',
                'ParGeneralDepartamento' => 'required|int',
                'ParGeneralCiudad' => 'required|int',
                'ParTelefono' => 'required|int',
                'ParDireccion' => 'required|string',
                'ParEmpresas' => 'required|array|min:1',
                'ParEmpresas.*' => 'required|int|distinct',
                'Hash' => 'required|int'
            ]);

            $id = [];

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idProveedor = (new Controller)->CodeDescrypt($Credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('Proveedor')->where('IdProveedor', $idProveedor)->update([
                'NombreComercial'=>$Credentials['ParNombreComercial'],
                'NombreLegal'=>$Credentials['ParNombreLegal'],
                'Nit'=>$Credentials['ParNit'],
                'Direccion'=>$Credentials['ParDireccion'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'Telefono' => $Credentials['ParTelefono']
            ]);
            array_push($id, $idProveedor);

            DB::table('Asoc_Empresa_Proveedor')->where('IdProveedor', '=', $idProveedor)->delete();
            array_push($id, $idProveedor);
            for ($i=0; $i < count($Credentials['ParEmpresas']); $i++) {
                $idEmpresa = (new Controller)->CodeDescrypt($Credentials['ParEmpresas'][$i]);
                DB::table('Asoc_Empresa_Proveedor')->updateOrInsert(
                    ['IdProveedor' => $idProveedor, 'IdEmpresa' => $idEmpresa],
                    [
                        'IdProveedor' => $idProveedor,
                        'IdEmpresa' => $idEmpresa,
                        'Fecha' => date('Y-m-d h:i:s')
                    ]
                );
                array_push($id, $idProveedor);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_PROVEEDORES_LEGAL_EDITAR');

            DB::disableQueryLog();
            DB::commit();

            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        } catch (ValidationException $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('7ded3b7e08c99b3c9634ef4b194d4c3c');
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($th);
        }

    }
    //5d82139bfcf53f9b4ef15c2f48e0557e
    public function DatosCrearContactoProveedor()
    {
        try {
            $Credentials = $this->validate(request(), [
                'ParNombre' => 'required|string',
                'ParCargo' => 'nullable|string',
                'ParCelular' => 'nullable|string',
                'ParTelefono' => 'nullable|string',
                'ParCorreo' => 'required|email',
                'ParHorario' => 'nullable|string',
                'Hash' => 'required|int'
            ]);


            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idProveedor = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $id = [];

            DB::beginTransaction();
            DB::enableQueryLog();

            $idContacto = DB::table('contactos_proveedor')->insertGetId([
                'Nombre' => $Credentials['ParNombre'],
                'Cargo' => $Credentials['ParCargo'],
                'Celular' => $Credentials['ParCelular'],
                'Telefono' => $Credentials['ParTelefono'],
                'Correo' => $Credentials['ParCorreo'],
                'Horario' => $Credentials['ParHorario'],
                'IdProveedor' => $idProveedor,
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d h:i:s')
            ]);

            array_push($id, $idContacto);

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_PROVEEDORES_CONTACTOS_CREAR');

            DB::disableQueryLog();
            DB::commit();
            return response()->json(['mensaje'=>'Contacto agregado correctamente', 'success'=>true], 200);
        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'mensaje'=>'Error en la validacion de los datos',
                'error' => $ex->errors(),
                'success' => false
            ], 422);
            dd($ex);
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'mensaje'=>'Error en la validacion de los datos',
                'error' => $qe,
                'success' => false
            ], 422);
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'mensaje'=>'Error en la validacion de los datos',
                'error' => $th->getMessage(),
                'success' => false
            ], 422);
            dd($th);
        }
    }

    //da680e9164960293d98c57b21961dcd9
    public function DatosContactoProveedorPermisos()
    {
        $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);


        $INFORMACION_PROVEEDORES_CONTACTOS_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=',session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_PROVEEDORES_CONTACTOS_EDITAR']
        ])->get();

        $INFORMACION_PROVEEDORES_CONTACTOS_CREAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_PROVEEDORES_CONTACTOS_CREAR']
        ])->get();

        return response()->json([
            'INFORMACION_PROVEEDORES_CONTACTOS_EDITAR' => $INFORMACION_PROVEEDORES_CONTACTOS_EDITAR,
            'INFORMACION_PROVEEDORES_CONTACTOS_CREAR' => $INFORMACION_PROVEEDORES_CONTACTOS_CREAR,
        ], 200);

    }


    public function ListarProveedores(Request $request){
        $draw = $request['draw'];

        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");


        $sqlFrom = "FROM "
                . "Proveedor i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                //. "INNER JOIN Par_UsuarioEmpresa pe on u.IdUsuario = pe.IdUsuario and pe.idUsuario = ".$sqlUser[0]->IdUsuario." "
                //. "INNER JOIN Asoc_Empresa_Proveedor af on pe.IdEmpresa = af.IdEmpresa and af.IdProveedor = i.IdProveedor "
                . "WHERE i.Estado = ".$request['search']['Estadox'];

        $sqlCampos = "DISTINCT i.IdProveedor as Hash, i.Nit, i.NombreComercial, i.NombreLegal, i.Telefono, i.Direccion, i.Estado, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){

            $searchQuery = " and ("
                   . "i.Nit like '%".$searchValue."%' or "
                   . "i.NombreComercial like '%".$searchValue."%' or "
                   . "i.NombreLegal like '%".$searchValue."%' or "
                   . "i.Telefono like '%".$searchValue."%' or "
                   . "i.Direccion like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_PROVEEDORES_LEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDORES_LEGAL')");
        $INFORMACION_PROVEEDORES_CONTACTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDORES_CONTACTOS')");
        $INFORMACION_PROVEEDORES_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDORES_DOCUMENTOS')");
        $INFORMACION_PROVEEDORES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDORES_ESTADO')");


        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "Hashx"=>($row->Hash),
                "Nit"=>($row->Nit),
                "NombreComercial"=>($row->NombreComercial),
                "Estado"=>($row->Estado),
                "NombreLegal"=>($row->NombreLegal),
                "Telefono"=>($row->Telefono),
                "Direccion"=>($row->Direccion),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_PROVEEDORES_LEGAL"=>$INFORMACION_PROVEEDORES_LEGAL,
                "INFORMACION_PROVEEDORES_CONTACTOS"=>$INFORMACION_PROVEEDORES_CONTACTOS,
                "INFORMACION_PROVEEDORES_DOCUMENTOS"=>$INFORMACION_PROVEEDORES_DOCUMENTOS,
                "INFORMACION_PROVEEDORES_ESTADO"=>$INFORMACION_PROVEEDORES_ESTADO,
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

    // c368fa1c46b272b71940f37a56afe6ea
    public function ListarDatosContactoProveedor(Request $request)
    {
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'Hash2' => 'required|string',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        // dd($request['columns']);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";

        $sqlFrom = "FROM "
                . "contactos_proveedor cp "
                . "INNER JOIN usuario u on cp.idusuario = u.idusuario "
                . "where cp.IdProveedor = $id ".$sqlAdicional;

        $sqlCampos = "cp.Id, cp.Nombre, cp.Cargo, cp.Telefono, cp.Celular, cp.Correo, cp.Horario, date_format(cp.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when cp.Estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, cp.Estado , "
                . "u.nombreusuario ";

        ## Search
        $searchQuery = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (cp.Nombre like '%".$searchValue."%' or
                cp.Cargo like '%".$searchValue."%' or
                cp.Correo like'%".$searchValue."%' or
                cp.Horario like'%".$searchValue."%') ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){
            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Cargo"=>$row->Cargo,
              "Telefono"=>$row->Telefono,
              "fechahora"=>$row->fechahora,
              "Celular"=>$row->Celular,
              "Estado"=>$row->Estado,
              "Hash"=>$id,
              "Correo"=>$row->Correo,
              "Horario"=>$row->Horario
            );
           $i++;
        }

        ## Response
        $response = array(
          "draw" => intval($empRecords['draw']),
          "iTotalRecords" => $empRecords['totalRecords'],
          "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
          "aaData" => $data
        );

        return json_encode($response);
    }

    public function PermisosDocumentoLegalesProveedores(){
        $INFORMACION_PROVEEDORES_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDORES_DOCUMENTOS')");
        return response()->json([
            'INFORMACION_PROVEEDORES_DOCUMENTOS'=>$INFORMACION_PROVEEDORES_DOCUMENTOS
        ]);
    }

    public function ListasDocumentosLegalesProveedor(){
        return response()->json([
            "Info"=>(new Controller)->ListarDatosHash("Par_Documento_Legal_Proveedor","Id","Nombre"),
        ]);
    }

    public function EliminarDocumentoLegalProveedor(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();



            $Query = 'DELETE FROM  Documento_Legal_Proveedor '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_PROVEEDOR_DOCUMENTOS_ELIMINAR');

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

    public function DocumentosLegalesProveedor(Request $request){

        $draw = $request['draw'];

        $sqlFrom = "FROM "
                . "Documento_Legal_Proveedor i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Documento_Legal_Proveedor c on i.IdDocumentoLegal = c.Id "
                . "WHERE i.IdProveedor = ".(new Controller)->CodeDescrypt( $request->input('Hash'));

        $sqlCampos = " i.id, i.Archivo, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $sqlAdicional = '';
            $searchQuery = $sqlAdicional." and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "i.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_PROVEEDOR_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDOR_DOCUMENTOS')");


        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
       

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "TipoDocumento"=>($row->TipoDocumento),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_PROVEEDOR_DOCUMENTOS"=>$INFORMACION_PROVEEDOR_DOCUMENTOS
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data,
        );

        return json_encode($response);
    }
    
    public function DocumentosLegalesProveedorA(Request $request){
        
        $draw = $request['draw'];

        
        $sqlFrom = "FROM "
                . "documentosadicionalesproveedor i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "WHERE i.IdProveedor = ".(new Controller)->CodeDescrypt( $request->input('Hash'));

        $sqlCampos = " i.id, i.Archivo, i.Nombre, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = " and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_PROVEEDOR_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_PROVEEDOR_DOCUMENTOS')");
        
        
        
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
       
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Nombre"=>($row->Nombre),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_PROVEEDOR_DOCUMENTOS"=>$INFORMACION_PROVEEDOR_DOCUMENTOS
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
    

    public function GuardarDocumentoLegalProveedores(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO Documento_Legal_Proveedor ('
                    . 'Archivo, Fecha,IdDocumentoLegal,IdProveedor,IdUsuario) values (?,?,?,?,?)';
            $Data = [
                $pathLogo,
                date("Y-m-d H:i:s"),
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                $IdEmpleado,
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);

            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            $request->file('ParLogo')->storeAs('datos/Proveedores/', $IdEmpleadoz."_".$pathLogo);

            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_PROVEEDOR_DOCUMENTOS_CREAR');

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
    
    public function GuardarDocumentoLegalProveedoresA(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO documentosadicionalesproveedor ('
                    . 'Nombre,Archivo,Fecha,IdUsuario,IdProveedor) values (?,?,?,?,?)';
            $Data = [
                $request->input('NombreArchivo'),
                $pathLogo,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $IdEmpleado

            ];
            DB::INSERT($Query,$Data);
            
            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            $request->file('ParLogo')->storeAs('datos/Proveedores/ARC_', $IdEmpleadoz."_".$pathLogo);
            
            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_PROVEEDOR_DOCUMENTOS_CREAR');

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
    
    public function EliminarDocumentoLegalProveedorA(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            
            $Query = 'DELETE FROM  documentosadicionalesproveedor '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_PROVEEDOR_DOCUMENTOS_ELIMINAR');

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

