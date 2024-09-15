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

class ClienteController extends Controller
{
    //2723bb03bb81e89502512a756b9207c2
    public function indexDatosCliente()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $Cliente = DB::SELECT("SELECT c.IdCliente, c.Nit, c.NombreLegal, c.NombreComercial, c.Estado "
                . "FROM Cliente c "
                . "INNER JOIN Par_UsuarioCliente p on c.IdCliente = p.IdCliente and p.IdUsuario = " . $IdUsuario[0]->IdUsuario
                . " ORDER BY c.NombreComercial Asc");
            foreach($Cliente as $c){
                $c->Hash = (new Controller)->CodeEncrypt($c->IdCliente);
            }
            $Permisos = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                . "FROM Usuario u "
                . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                . "WHERE p.Pantalla = 'DATOS_CLIENTES' and u.IdUsuario = " . $IdUsuario[0]->IdUsuario);

            foreach ($Permisos as $Permiso) {
                session([$Permiso->Nombre => $IdUsuario[0]->Token]);
            }
            $datos = [
                'Clientes' => $Cliente
            ];
            return view('process.datos.clientes')->with('datos', $datos);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //da67a555d46ab2c036f6e3748baf3b59
    public function data_index_clientes(Request $request){
        $draw = $request['draw'];
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");


        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = " Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = " Estado = 1 ";
        }else{
            $sqlAdicional = " Estado  in  (1,0) ";
        }
        $sqlFrom = "FROM cliente AS c "
        . "INNER JOIN asoc_empresa_cliente AS p ON c.IdCliente = p.IdCliente WHERE "
        .$sqlAdicional;
        // . " ORDER BY c.NombreComercial Asc ";

        $sqlCampos = " DISTINCT c.IdCliente, c.Nit, c.NombreLegal, c.NombreComercial, c.Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (c.NombreComercial like '%".$searchValue."%' or c.NombreLegal like '%".$searchValue."%') ";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_LEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_LEGAL')");
        $INFORMACION_CLIENTE_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTE_DOCUMENTOS')");
        $INFORMACION_CLIENTES_CONTACTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_CONTACTOS')");
        $INFORMACION_CLIENTES_NEGOCIACIONES = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_NEGOCIACIONES')");
        $INFORMACION_CLIENTES_PRODUCTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_PRODUCTOS')");
        $INFORMACION_CLIENTES_PROFESIONALES = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_PROFESIONALES')");
        $INFORMACION_CLIENTES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_ESTADO')");

        foreach($Records['empRecords'] as $row){
            $permiso_legal = 0;
            $permiso_contactos = 0;
            $permiso_negociaciones = 0;
            $permiso_prodcutos = 0;
            $permiso_estado = 0;
            $permiso_profesionales = 0;
            $permiso_documentos = 0;

            if( count($INFORMACION_CLIENTES_LEGAL) == 1 ){
                $permiso_legal = 1;
            }
            if( count($INFORMACION_CLIENTES_CONTACTOS) == 1 ){
                $permiso_contactos = 1;
            }
            if( count($INFORMACION_CLIENTES_NEGOCIACIONES) == 1 ){
                $permiso_negociaciones = 1;
            }
            if( count($INFORMACION_CLIENTES_PRODUCTOS) == 1 ){
                $permiso_prodcutos = 1;
            }
            if( count($INFORMACION_CLIENTES_PROFESIONALES) == 1 ){
                $permiso_profesionales = 1;
            }
            if( count($INFORMACION_CLIENTES_ESTADO) == 1 ){
                $permiso_estado = 1;
            }
            if( count($INFORMACION_CLIENTE_DOCUMENTOS) == 1 ){
                $permiso_documentos = 1;
            }

            $data[] = array(
                "Num"=>$i,
                "Hash"=> (new Controller)->CodeEncrypt($row->IdCliente),
                "Hash2" => session('keyUser'),
                "Nit" => $row->Nit,
                "NombreLegal" => $row->NombreLegal,
                "NombreComercial" => $row->NombreComercial,
                "Estado" => $row->Estado,
                "INFORMACION_CLIENTES_LEGAL"=>$permiso_legal,
                "INFORMACION_CLIENTES_CONTACTOS"=>$permiso_contactos,
                "INFORMACION_CLIENTES_NEGOCIACIONES"=>$permiso_negociaciones,
                "INFORMACION_CLIENTES_PRODUCTOS"=>$permiso_prodcutos,
                "INFORMACION_CLIENTES_PROFESIONALES"=>$permiso_profesionales,
                "INFORMACION_CLIENTES_ESTADO"=>$permiso_estado,
                "INFORMACION_CLIENTE_DOCUMENTOS"=>$permiso_documentos,
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

    public function DatosCrearCliente()
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

    public function CrearCliente(Request $request)
    {
        try {
            $Credentials = $this->validate($request, [
                'ParNit' => 'required|string',
                'ParNombreComercial' => 'required|string',
                'ParNombreLegal' => 'required|string',
                'ParGeneralPais' => 'required|int',
                'ParGeneralDepartamento' => 'required|int',
                'ParGeneralCiudad' => 'required|int',
                'ParTelefono' => 'required|int',
                'ParDireccion' => 'required|string',
                'ParFechaCierreFacturacion' => 'nullable|int|digits_between:1,31',
                'ParCorreoFact'=> 'nullable|string',
                'ParEmpresas' => 'nullable|array|min:1',
                'ParEmpresas.*' => 'nullable|int|distinct',
                'ParEmpresasIniciales' => 'nullable|array|min:1',
                'ParEmpresasIniciales.*' => 'nullable|string|distinct|min:3|max:5'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();
            $id = [];

            $idCliente = DB::table('Cliente')->insertGetId([
                'NombreComercial' => $Credentials['ParNombreComercial'],
                'NombreLegal' => $Credentials['ParNombreLegal'],
                'Nit' => $Credentials['ParNit'],
                'FechaCierreFacturacion' => $Credentials['ParFechaCierreFacturacion'],
                'Direccion' => $Credentials['ParDireccion'],
                'Telefono' => $Credentials['ParTelefono'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'CorreoFacturacionElectronica'=> $Credentials['ParCorreoFact'],
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            array_push($id, $idCliente);

            //Validar los indices empresas
            $Credentials['ParEmpresasIniciales'] = $this->validarIndice($Credentials['ParEmpresas'], $Credentials['ParEmpresasIniciales']);

            foreach ($Credentials['ParEmpresas'] as $empresa) {
                $idEmpresa = (new Controller)->CodeDescrypt($empresa);
                $idAsocCliente = DB::table('Asoc_Empresa_Cliente')->insertGetId([
                    'IdEmpresa' => $idEmpresa,
                    'IdCliente' => $idCliente,
                    'Indice' => $Credentials['ParEmpresasIniciales'][$empresa],
                    'Fecha' => date('Y-m-d h:i:s')
                ]);
                array_push($id, $idAsocCliente);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_CLIENTES_CREAR');

            DB::disableQueryLog();
            DB::commit();
            $data = [
                'mensaje' => 'Se ha creado Exitosamente el nuevo cliente',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        }catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 200);
        } catch (\Exception $ex) {
            $data = parent::normalExeption($ex);
            return response()->json($data, 200);
        }
    }

    //9e97ceed51da97c6cf1577d3036ddb21
    public function PAR_EstadoCliente(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $idCliente = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $Estado = DB::SELECT("SELECT Estado FROM Cliente WHERE IdCliente = '".$idCliente."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Cliente set Estado = '$n' WHERE IdCliente = '".$idCliente."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE Cliente set Estado = '$n' WHERE IdCliente = '".$idCliente."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idCliente.",'INFORMACION_CLIENTES_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'mensaje'=>'Estado Cambiado Exitosamente','Query'=>$Query]);
    }

    //ee74fed5f15671ca6a4e0e8483829abd
    public function par_DatoInformacionLegalCliente()
    {
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);
        $idCliente = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $cliente = DB::table('Cliente')->where('IdCliente',$idCliente)->get();
        $cliente[0]->Hash = (new Controller)->CodeEncrypt($cliente[0]->IdCliente);
        $cliente[0]->IdCliente = null;

        $paises = DB::table('Par_Pais')->orderBy('Nombre','asc')->get();
        $departamento = DB::table('Par_Departamento')->orderBy('Nombre','asc')->get();
        $ciudad = DB::table('Par_Ciudad')->orderBy('Nombre','asc')->get();

        //Permisos

        $INFORMACION_CLIENTES_LEGAL_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', $Credentials['Hash2']],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_CLIENTES_LEGAL_EDITAR']
        ])->get();

        $Empresas = DB::table('Empresa')->select('IdEmpresa', 'NombreLegal', 'NombreComercial')
        ->where('Estado',1)->get();
        foreach ($Empresas as $e) {
            $e->HashEmpresa = (new Controller)->CodeEncrypt($e->IdEmpresa);
            $e->IdEmpresa = null;
        }
        $EmpresasAsoc = DB::table('Cliente')
        ->select('Cliente.IdCliente', 'Empresa.IdEmpresa', 'Empresa.NombreLegal', 'Empresa.NombreComercial', 'asoc_empresa_cliente.Indice')
        ->join('asoc_empresa_cliente', 'Cliente.IdCliente', '=', 'asoc_empresa_cliente.IdCliente')
        ->join('Empresa', 'asoc_empresa_cliente.IdEmpresa', '=', 'Empresa.IdEmpresa')
        ->where('asoc_empresa_cliente.IdCliente', $idCliente)->get();

        foreach ($EmpresasAsoc as $asoc) {
            $asoc->HashCliente = (new Controller)->CodeEncrypt($asoc->IdCliente);
            $asoc->HashEmpresa = (new Controller)->CodeEncrypt($asoc->IdEmpresa);
            $asoc->IdCliente = null;
            $asoc->IdEmpresa = null;
        }


        if ($cliente) {
            return response()->json([
                'Cliente' => $cliente,
                'Paises' => $paises,
                'Empresas' => $Empresas,
                'PerLegalEdicion' => $INFORMACION_CLIENTES_LEGAL_EDITAR,
                'Departamento' => $departamento,
                'Ciudad' => $ciudad,
                'EmpresasAsoc' => $EmpresasAsoc
            ]);
        }
        return response()->json(['Error' => '1']);
    }

    //eb6c344f43227116eb925eb701ea5ebe
    public function par_DatoInformacionLegalClienteEdit()
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
                'ParFechaCierreFacturacion' => 'nullable|int|digits_between:1,31',
                'ParEmpresas' => 'required|array|min:1',
                'ParEmpresas.*' => 'required|int|distinct',
                'ParEmpresasIniciales' => 'required|array|min:1',
                'ParEmpresasIniciales.*' => 'nullable|string|distinct|min:3|max:5',
                'Hash' => 'required|int'
            ]);

            $id = [];

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idCliente = (new Controller)->CodeDescrypt($Credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('Cliente')->where('IdCliente', $idCliente)->update([
                'NombreComercial'=>$Credentials['ParNombreComercial'],
                'NombreLegal'=>$Credentials['ParNombreLegal'],
                'Nit'=>$Credentials['ParNit'],
                'Direccion'=>$Credentials['ParDireccion'],
                'FechaCierreFacturacion'=>$Credentials['ParFechaCierreFacturacion'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'Telefono' => $Credentials['ParTelefono']
            ]);
            array_push($id, $idCliente);

            $Credentials['ParEmpresasIniciales'] = $this->validarIndice($Credentials['ParEmpresas'], $Credentials['ParEmpresasIniciales']);
            DB::table('Asoc_Empresa_Cliente')->where('IdCliente', '=', $idCliente)->delete();
            array_push($id, $idCliente);
            foreach ($Credentials['ParEmpresas'] as $empresa) {
                $idEmpresa = (new Controller)->CodeDescrypt($empresa);
                $idAsocCliente = DB::table('Asoc_Empresa_Cliente')->insertGetId([
                    'IdEmpresa' => $idEmpresa,
                    'IdCliente' => $idCliente,
                    'Indice' => $Credentials['ParEmpresasIniciales'][$empresa],
                    'Fecha' => date('Y-m-d h:i:s')
                ]);
                array_push($id, $idAsocCliente);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_CLIENTES_LEGAL_EDITAR');

            DB::disableQueryLog();
            DB::commit();
            $data = [
                'mensaje' => 'Información Legal De Cliente Actualizada Exitosamente',
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        }catch (QueryException $qe) {
            $data = parent::queryException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $data = parent::normalExeption($th);
            return response()->json($data, 200);
        }

    }
    //06cc90a8658b1b940ff15441d7ec7693
    public function DatosCrearContactoCliente()
    {
        try {
            $Credentials = $this->validate(request(), [
                'ParNombre' => 'required|string',
                'ParCargo' => 'nullable|string',
                'ParCelular' => 'nullable|string',
                'ParTelefono' => 'nullable|string',
                'ParCorreo' => 'required|email',
                'ParHorario' => 'nullable|string',
                'ParDia' => 'nullable|int|min:1|digits_between:1,31',
                'ParMes' => 'nullable|int|min:1|digits_between:1,12',
                'Hash' => 'required|int'
            ]);


            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $idCliente = (new Controller)->CodeDescrypt($Credentials['Hash']);
            $id = [];

            DB::beginTransaction();
            DB::enableQueryLog();

            $idContacto = DB::table('contactos_cliente')->insertGetId([
                'Nombre' => $Credentials['ParNombre'],
                'Cargo' => $Credentials['ParCargo'],
                'Celular' => $Credentials['ParCelular'],
                'Telefono' => $Credentials['ParTelefono'],
                'Correo' => $Credentials['ParCorreo'],
                'Horario' => $Credentials['ParHorario'],
                'Dia' => $Credentials['ParDia'],
                'Mes' => $Credentials['ParMes'],
                'IdCliente' => $idCliente,
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d h:i:s')
            ]);

            array_push($id, $idContacto);

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_CLIENTES_CONTACTOS_CREAR');

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

    //6cfa4f5bbba93bbca82cb11a70f4fa17
    public function DatosContactoClientePermisos()
    {
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);
        $idCliente = (new Controller)->CodeDescrypt($Credentials['Hash']);
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $INFORMACION_CLIENTES_CONTACTOS_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=',session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_CLIENTES_CONTACTOS_EDITAR']
        ])->get();

        $INFORMACION_CLIENTES_CONTACTOS_CREAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_CLIENTES_CONTACTOS_CREAR']
        ])->get();

        return response()->json([
            'INFORMACION_CLIENTES_CONTACTOS_EDITAR' => $INFORMACION_CLIENTES_CONTACTOS_EDITAR,
            'INFORMACION_CLIENTES_CONTACTOS_CREAR' => $INFORMACION_CLIENTES_CONTACTOS_CREAR,
        ], 200);

    }

    //c7c953f8534fcaa0192f241bc39632eb
    public function ListarDatosContactoCliente(Request $request) {
        $Credentials = $this->validate($request, [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $sqlFrom = "FROM "
        . "contactos_cliente cc "
        . "where IdCliente = $id and IdUsuario = ".$IdUsuario[0]->IdUsuario;
        $sqlCampos = "cc.Id, cc.Nombre, cc.Cargo, date_format(cc.fechahora,'%Y-%m-%d') as fechahora, "
                . "case when cc.Estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, cc.Estado , "
                . "cc.Cargo, cc.Celular, cc.Telefono, cc.Correo, cc.Horario, cc.IdCliente, cc.Dia, cc.Mes, cc.Fecha, cc.Estado";
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (cc.Mes like '%".$searchValue."%' or
                cc.Nombre like '%".$searchValue."%' or
                cc.cargo like '%".$searchValue."%' or cc.correo like '%".$searchValue."%') ";
        }

        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach ($empRecords['empRecords'] as $row) {
            $data[] = array(
                "Num"=>$i,
                "id"=>(new Controller)->CodeEncrypt($row->Id),
                "Nombre"=>$row->Nombre,
                "Cargo"=>$row->Cargo,
                "Celular"=>$row->Celular,
                "Telefono"=>$row->Telefono,
                "Correo"=>$row->Correo,
                "Horario"=>$row->Horario,
                "Hash"=>$id,
                "IdCliente"=>$id,
                "Dia"=>$row->Dia,
                "Mes"=>$row->Mes,
                "fechahora"=>$row->fechahora,
                "Estado"=>$row->Estado,
                "NombreEstado"=>$row->NombreEstado
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

    public function CambiarEstadoContactoCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Estado = 0;
            $sqlEstado = DB::SELECT("SELECT Estado FROM contactos_cliente WHERE Id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
            if( $sqlEstado[0]->Estado == 0 ){
                $Estado = 1;
            }


            $Query = 'UPDATE contactos_cliente SET '
                    . 'Estado = ? , Fecha = ? , IdUsuario = ? '
                    . ' WHERE Id = ?';
            $Data = [
                $Estado,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTES_CONTACTOS_EDITAR');

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
    
    public function Datos_ListarDatosContrato(){
        return response()->json([
            "TiposContrato"=>(new Controller)->ListarDatosHash("par_tipocontratocliente","Id","Nombre")
        ]);
    }
    

    private function validarIndice($empresas, $iniciales)
    {
        foreach ($empresas as $empresa) {
            $iniciales[$empresa] = strtoupper($iniciales[$empresa]);
            if (preg_match('/[^A-Z]/', $iniciales[$empresa]) == 1) {
                throw new Exception("Los Indices Contienen Caracteres no Aceptados");
            }
        }
        return $iniciales;
    }

    public function EliminarDocumentoLegalCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();



            $Query = 'DELETE FROM  documento_legal_cliente '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR');

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

    public function EliminarDocumentoLegalClienteC(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();



            $Query = 'DELETE FROM  contrato_cliente '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR');

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

    public function ListarDatosNegociaciones(){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

        $sqlEmpresas = DB::SELECT("SELECT e.IdEmpresa as Hash, e.NombreComercial as Nombre "
                . "FROM Empresa e "
                . "INNER JOIN Par_UsuarioEmpresa pe on e.IdEmpresa = pe.IdEmpresa "
                . "WHERE pe.IdUsuario = ".$sqlUser[0]->IdUsuario);
        foreach($sqlEmpresas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }



        return response()->json([
            "Dias"=>(new Controller)->ListarDatosHash("Par_PagoCliente","Id","Nombre"),
            "Tributaria"=>(new Controller)->ListarDatosHash("Par_InformacionTributaria","Id","Nombre"),
            "Comision"=>(new Controller)->ListarDatosHash("TiposComision","Id","Nombre"),
            "Empresas"=>$sqlEmpresas
        ]);
    }

    public function CambiarEstadoNegociacionCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Estado = 0;
            $sqlEstado = DB::SELECT("SELECT Estado FROM negociaciones WHERE Id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
            if( $sqlEstado[0]->Estado == 0 ){
                $Estado = 1;
            }


            $Query = 'UPDATE negociaciones SET '
                    . 'Estado = ? , Fecha = ? , IdUsuario = ? '
                    . ' WHERE Id = ?';
            $Data = [
                $Estado,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR');

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

    public function ImpuestoEmpresa(Request $request){
        $Impuestos = DB::SELECT("SELECT p.Id as Hash, p.Nombre, t.Ppto "
                . "FROM Par_Tipo_Tarifa_Legal_Empresa p "
                . "INNER JOIN Tarifa_Legal_Empresa t on t.IdTarifa = p.Id "
                . "WHERE "
                //. "t.Ppto in ('ICP','') AND "
                . "t.estado = 1 AND t.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash'))." "
                . "ORDER BY t.Ppto");
        foreach($Impuestos as $d){
            if( $d->Ppto == 'IP' ){
                $d->Tipo = 'Impuesto a Cliente sobre Presupuesto (Externo)';
            }
            if( $d->Ppto == 'ICP' ){
                $d->Tipo = 'Impuesto Comisión Presupuesto (Interno)';
            }
            if( $d->Ppto == 'IOR' ){
                $d->Tipo = 'Impuesto para Ordenación (Interno)';
            }
            if( $d->Ppto == 'DCR' ){
                $d->Tipo = 'Descuento a Cliente sobre Presupuesto (Interno / Externo)';
            }
            if( $d->Ppto == 'IRP' ){
                $d->Tipo = 'Impuesto Resumen Presupuesto (Interno)';
            }
        }
        return response()->json([
            "Impuestos"=>$Impuestos
        ]);
    }

    public function GuardarNegociacionCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO Negociaciones ('
                    . 'Porcentaje,'
                    . 'IdCliente,'
                    . 'IdCondicionPago,'
                    . 'TipoRentabilidad,'
                    . 'IdUsuario,'
                    . 'Fecha,'
                    . 'IdEmpresa,'
                    . 'IdUnidad,'
                    . 'IdRegimen,'
                    . 'Autoretenedor,'
                    . 'ImpuestoAdicional,Estado) '
                    . 'values (?,?,?,?,?,?,?,?,?,?,?,?)'
                    . ' ';
            $Data = [
                $request->input('ValorComision'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                (new Controller)->CodeDescrypt($request->input('Pago')),
                (new Controller)->CodeDescrypt($request->input('Comision')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                (new Controller)->CodeDescrypt($request->input('Empresa')),
                (new Controller)->CodeDescrypt($request->input('Unidad')),
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                (new Controller)->CodeDescrypt($request->input('Autoretenedor')),
                $request->input('ImpuestoAdicional'),
                1

            ];
            DB::INSERT($Query,$Data);
            $IdNegociacion = DB::getPdo()->lastInsertId();
            array_push($id, $IdNegociacion);

            $Impuestos = \GuzzleHttp\json_decode($request->input('Impuestos'));

            for($i = 0; $i < count($Impuestos);$i++){
                $Query = 'INSERT INTO ImpuestosNegociacion ('
                    . 'IdNegociacion,'
                    . 'IdImpuesto) '
                    . 'values (?,?)'
                    . ' ';
                $Data = [
                    $IdNegociacion,
                    ($Impuestos[$i])

                ];
                DB::INSERT($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
            }

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTES_NEGOCIACIONES_CREAR');

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


    public function DatosNegociacionesClientes(Request $request){
        $draw = $request['draw'];
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $sqlFrom = "FROM "
                . "negociaciones n "
                . "INNER JOIN Par_PagoCliente p on n.IdCondicionPago  = p.Id "
                . "INNER JOIN Par_InformacionTributaria it on n.IdRegimen  = it.Id "
                . "INNER JOIN TiposComision t on n.TipoRentabilidad  = t.Id "
                . "INNER JOIN Empresa e on n.IdEmpresa  = e.IdEmpresa "
                . "INNER JOIN Par_UsuarioEmpresa pe on e.IdEmpresa = pe.IdEmpresa and pe.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN Unidad_negocio un on n.IdUnidad  = un.IdUnidad  "
                . "INNER JOIN Par_UsuarioUnidad pu on un.IdUnidad = pu.IdUnidad and pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN usuario u on n.IdUsuario = u.idusuario "
                . " WHERE n.IdCliente = ".(new Controller)->CodeDescrypt( $request->input('Hash') );

        $sqlCampos = "n.id, n.Estado, n.Porcentaje, e.NombreComercial as Empresa,un.nombre as Unidad, p.Nombre as Dias, it.Nombre as Regimen, t.Nombre as Comision, n.Autoretenedor,  "
                . "date_format(n.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){

            $searchQuery = " and ("
                   . "n.Porcentaje like '%".$searchValue."%' or "
                   . "e.NombreComercial like '%".$searchValue."%' or "
                   . "un.nombre like '%".$searchValue."%' or "
                   . "p.Nombre like '%".$searchValue."%' or "
                   . "it.Nombre like '%".$searchValue."%' or "
                   . "t.Nombre like '%".$searchValue."%' or "
                   . "date_format(n.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR')");

        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
       
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Porcentaje"=>($row->Porcentaje),
                "Empresa"=>($row->Empresa),
                "Unidad"=>($row->Unidad),
                "Dias"=>($row->Dias),
                "Estado"=>($row->Estado),
                "Regimen"=>($row->Regimen),
                "Comision"=>($row->Comision),
                "Autoretenedor"=>($row->Autoretenedor),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR"=>$INFORMACION_CLIENTES_NEGOCIACIONES_EDITAR
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "sql" =>"SELECT ".$sqlCampos.$sqlFrom,
            "aaData" => $data
        );

        return json_encode($response);
    }

    public function DatosContactoCliente(Request $request){
        $sqlContactos = DB::SELECT("SELECT "
                . "Id, Nombre,"
                . "Case when Cargo is null then '' else Cargo end as Cargo, "
                . "Case when Celular is null then '' else Celular end as Celular, "
                . "Case when Telefono is null then '' else Telefono end as Telefono, "
                . "Case when Correo is null then '' else Correo end as Correo, "
                . "Case when Dia is null then '0' else Dia end as Dia, "
                . "Case when Mes is null then '0' else Mes end as Mes,"
                . "Case when Horario is null then '' else Horario end as Horario "
                . " "
                . "FROM contactos_cliente WHERE Id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        foreach($sqlContactos as $d){
            /*$d->Cargo == null ? '': $d->Cargo;
            is_null($d->Celular) ? $d->Celular : '';
            $d->Telefono == null ? '': $d->Telefono;
            $d->Correo == null ? '': $d->Correo;
            $d->Dia == null ? '0': $d->Dia;
            $d->Mes == null ? '0': $d->Mes;*/
        }
        return response()->json([
            "Contactos"=>$sqlContactos,
        ]);
    }

    public function EditarDatosContactoCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'UPDATE contactos_cliente SET '
                    . 'Nombre = ? , '
                    . 'Cargo = ? , '
                    . 'Celular = ? , '
                    . 'Telefono = ? , '
                    . 'Correo = ? , '
                    . 'Horario = ? , '
                    . 'Dia = ? , '
                    . 'Mes = ? , '
                    . 'Fecha = ? , IdUsuario = ? '
                    . ' WHERE Id = ?';
            $Data = [
                $request->input('ParNombre'),
                $request->input('ParCargo'),
                $request->input('ParCelular'),
                $request->input('ParTelefono'),
                $request->input('ParCorreo'),
                $request->input('ParHorario'),
                $request->input('ParDia'),
                $request->input('ParMes'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTES_CONTACTOS_EDITAR');

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

    public function DocumentosLegalesCliente(Request $request){

        $draw = $request['draw'];



        $sqlFrom = "FROM "
                . "documento_legal_cliente i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN Par_Documento_Legal_Cliente c on i.IdTipoDocumento = c.Id "
                . "WHERE i.IdCliente = ".(new Controller)->CodeDescrypt( $request->input('Hash'));

        $sqlCampos = " i.id, i.Archivo, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){

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

        $INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR')");




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
                "INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR"=>$INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR
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
    
    public function Datos_ContratosCliente(Request $request){
        
        $draw = $request['draw'];
        $sqlFrom = "FROM "
                . "contrato_cliente i "
                . "INNER JOIN usuario u on i.IdUsuario = u.idusuario "
                . "INNER JOIN par_tipocontratocliente c on i.IdTipoContrato = c.Id "
                . "WHERE i.IdCliente = ".(new Controller)->CodeDescrypt( $request->input('Hash'));

        $sqlCampos = " i.id, i.Nombre, i.FechaFirma, i.FechaVencimiento,i.Valor, i.Archivo, "
                . "date_format(i.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario, c.Nombre as TipoContrato ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "i.Archivo like '%".$searchValue."%' or "
                   . "i.Nombre like '%".$searchValue."%' or "
                   . "i.FechaFirma like '%".$searchValue."%' or "
                   . "i.FechaVencimiento like '%".$searchValue."%' or "
                   . "i.Valor like '%".$searchValue."%' or "
                   . "c.Nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(i.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            $Temp = explode("-",$row->FechaFirma);
            $row->FechaFirma = parent::NombreDia($row->FechaFirma).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            $Temp = explode("-",$row->FechaVencimiento);
            $row->FechaVencimiento = parent::NombreDia($row->FechaVencimiento).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "Hash2"=>$row->id,
                "Nombre"=>($row->Nombre),
                "FechaFirma"=>($row->FechaFirma),
                "FechaVencimiento"=>($row->FechaVencimiento),
                "Valor"=>($row->Valor),
                "TipoContrato"=>($row->TipoContrato),
                "Archivo"=>($row->Archivo),
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR"=>(new Controller)->ValidarPermisoUsuario("INFORMACION_CLIENTE_DOCUMENTOS_ELIMINAR",session('keyUser'),0)
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
    

    public function ListarTiposDocumentosLegalesCliente(){
        $sql = DB::SELECT("SELECT Id, Nombre "
                . "FROM Par_Documento_Legal_Cliente "
                . "WHERE Estado = 1");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }
        return response()->json([
            "Info"=>$sql,
        ]);
    }

    public function OpcionesDocumentosLegalesCliente(){
        $INFORMACION_CLIENTE_DOCUMENTOS_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTE_DOCUMENTOS_CREAR')");
        return response()->json([
            "INFORMACION_CLIENTE_DOCUMENTOS_CREAR"=>$INFORMACION_CLIENTE_DOCUMENTOS_CREAR,
        ]);
    }

    public function GuardarDocumentoLegalClientes(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO documento_legal_cliente ('
                    . 'Archivo, Fecha,IdTipoDocumento,IdCliente,IdUsuario) values (?,?,?,?,?)';
            $Data = [
                $pathLogo,
                date("Y-m-d H:i:s"),
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                $IdEmpleado,
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);

            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            $request->file('ParLogo')->storeAs('datos/Clientes/', $IdEmpleadoz."_".$pathLogo);

            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTE_DOCUMENTOS_CREAR');

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
    
    public function GuardarContratoClientes(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO contrato_cliente ('
                    . 'Nombre,FechaFirma,FechaVencimiento,Valor,IdCliente,Archivo,IdTipoContrato,IdUsuario,Fecha) values (?,?,?,?,?,?,?,?,?)';
            $Data = [
                $request->input('NombreContrato'),
                $request->input('FechaFirmaContrato'),
                $request->input('FechaVencimientoContrato'),
                $request->input('ValorContrato'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $pathLogo,
                (new Controller)->CodeDescrypt($request->input('NewTipo')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")

            ];
            DB::INSERT($Query,$Data);
            
            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            $request->file('ParLogo')->storeAs('datos/Clientes/', "CONTRATO_".$IdEmpleadoz."_".$pathLogo);
            
            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_CLIENTE_DOCUMENTOS_CREAR');

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
    

    /*
    ------------------------------------------------------------//
    -----------------Productos cliente-------------------------//
    ----------------------------------------------------------//
    */

    //8434c3b95f8cc57d90e742ad271cc9ef
    public function parDatosProductosCliente(Request $request)
    {
        $draw = $request['draw'];
        $idCliente = parent::CodeDescrypt($request['search']['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }

        $sqlAdicional .= " and IdCliente = ".$idCliente;
        $sqlFrom = "FROM productocliente Where "
                .$sqlAdicional;

        $sqlCampos = "Id, Nombre, FEE, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) or (FEE like '%".$searchValue."%' )";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_FEE_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_FEE_EDITAR')");
        $INFORMACION_CLIENTES_FEE_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_FEE_ESTADO')");
        $INFORMACION_CLIENTES_SUBPRODUCTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_FEE_ESTADO')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $permiso_subproducto = 0;

            if( count($INFORMACION_CLIENTES_FEE_EDITAR) == 1 ){
                $permiso_estado = 1;
            }
            if( count($INFORMACION_CLIENTES_FEE_ESTADO) == 1 ){
                $permiso_editar = 1;
            }
            if( count($INFORMACION_CLIENTES_SUBPRODUCTOS) == 1 ){
                $permiso_subproducto = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "FEE"=>$row->FEE,
              "INFORMACION_CLIENTES_FEE_EDITAR"=>$permiso_estado,
              "INFORMACION_CLIENTES_FEE_ESTADO"=>$permiso_editar,
              "INFORMACION_CLIENTES_SUBPRODUCTOS"=>$permiso_subproducto,
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

    // 5153d30bddab9cf4c18403f55e69523e
    public function parCrearProducto(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
                'parFEE' => 'required|numeric'
            ]);

            $idCliente = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('productocliente')
            ->insertGetId([
                'Nombre' => $credentials['parNombre'],
                'FEE' => $credentials['parFEE'],
                'IdCliente' => $idCliente,
                'IdUsuario' => $usuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_CLIENTES_PRODUCTOS');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'IdCliente'=>$idCliente,'mensage'=>'Prodcuto Guardado exitosamente'], 200);

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

    //014ea1ebce55e2dd20322a03bdeea0ea
    public function infoProductoCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);

            $producto = DB::table('productocliente')
            ->where('Id', $id)
            ->first();

            $data = [
                'producto' => $producto,
                'success' => true
            ];
            return response()->json($data, 200);
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

    // 7f45ee2ba9d178bb9b41195db5652feb
    public function parEditarProductoCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
                'parFEE' => 'required|numeric'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('productocliente')
            ->where('Id', $id)
            ->update([
                'Nombre' => $credentials['parNombre'],
                'FEE' => $credentials['parFEE'],
                'IdUsuario' => $usuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_CLIENTES_EDITAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensage'=>'Prodcuto Guardado exitosamente'], 200);

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

    //718ef33e5372c7ffc103e5d88b397440f
    public function parEstadoProductoCliente(Request $request)
    {
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
         ]);
         $id = (new Controller)->CodeDescrypt($Credentials['Hash']);


         $Estado = DB::SELECT("SELECT Estado FROM productocliente WHERE Id = '".$id."'");
         $Query = "";
         if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
             $n = 0;
             if( $Estado[0]->Estado == 0 ){
                 $n = 1;
             }
             if(DB::UPDATE("UPDATE productocliente set Estado = '$n' WHERE Id = '".$id."';")){

                 $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                 $Query = "UPDATE productocliente set Estado = '$n' WHERE Id = '".$id."';";

                 DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                         . "".$id.",'INFORMACION_CLIENTES_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                 return response()->json(['success'=>'1']);

             }
         }
         return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
    /*
    ------------------------------------------------------------//
    -----------------SubProductos cliente-------------------------//
    ----------------------------------------------------------//
    */

    //c13a5535e89649c821fa13bef6a02276
    public function parDatosSubProductosCliente(Request $request)
    {
        $draw = $request['draw'];
        $idProducto = parent::CodeDescrypt($request['search']['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }

        $sqlAdicional .= " and IdProducto = ".$idProducto;
        $sqlFrom = "FROM subproducto_cliente Where "
                .$sqlAdicional;

        $sqlCampos = "Id, Nombre, Estado ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) or (FEE like '%".$searchValue."%' )";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_SUBPRODUCTOS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_SUBPRODUCTOS_EDITAR')");
        $INFORMACION_CLIENTES_SUBPRODUCTOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_SUBPRODUCTOS_ESTADO')");
        $INFORMACION_CLIENTES_SUBPRODUCTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_FEE_ESTADO')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $permiso_subproducto = 0;

            if( count($INFORMACION_CLIENTES_SUBPRODUCTOS_EDITAR) == 1 ){
                $permiso_estado = 1;
            }
            if( count($INFORMACION_CLIENTES_SUBPRODUCTOS_ESTADO) == 1 ){
                $permiso_editar = 1;
            }
            if( count($INFORMACION_CLIENTES_SUBPRODUCTOS) == 1 ){
                $permiso_subproducto = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "INFORMACION_CLIENTES_SUBPRODUCTOS_EDITAR"=>$permiso_estado,
              "INFORMACION_CLIENTES_SUBPRODUCTOS_ESTADO"=>$permiso_editar,
              "INFORMACION_CLIENTES_SUBPRODUCTOS"=>$permiso_subproducto,
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

    // efd516cc2e14b4887768abfd16fa0009
    public function parCrearSubProducto(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
            ]);

            $idProducto = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('subproducto_cliente')
            ->insertGetId([
                'Nombre' => $credentials['parNombre'],
                'IdProducto' => $idProducto,
                'IdUsuario' => $usuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_CLIENTES_SUBPRODUCTOS_CREAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensage'=>'Prodcuto Guardado exitosamente'], 200);

        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 500);
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 500);
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 500);
        }
    }

    //b3cbd3977a8b4cfc3748f5e7ba562212
    public function infoSubProductoCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);

            $producto = DB::table('subproducto_cliente')
            ->where('Id', $id)
            ->first();

            $data = [
                'producto' => $producto,
                'success' => true
            ];
            return response()->json($data, 200);
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

    // 060066e8fdcb112a4cda83b5d1a54464
    public function parEditarSubProductoCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('subproducto_cliente')
            ->where('Id', $id)
            ->update([
                'Nombre' => $credentials['parNombre'],
                'IdUsuario' => $usuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_CLIENTES_SUBPRODUCTO_EDITAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensage'=>'Prodcuto Guardado exitosamente'], 200);

        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 500);
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 500);
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 500);
        }
    }

    //efba9be4d1cf70c2fed732333df940a7
    public function parEstadoSubProductoCliente(Request $request)
    {
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
        ]);
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $Estado = DB::SELECT("SELECT Estado FROM subproducto_cliente WHERE Id = '".$id."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE subproducto_cliente set Estado = '$n' WHERE Id = '".$id."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE subproducto_cliente set Estado = '$n' WHERE Id = '".$id."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$id.",'INFORMACION_CLIENTES_SUBPRODUCTO_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);
            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

/*
    ------------------------------------------------------------//
    -----------------Profesionales cliente---------------------//
    ----------------------------------------------------------//
    */

    //16b026bebaf650b170971f6a70a344df
    public function parDatosProfesionalesCliente(Request $request)
    {
        $draw = $request['draw'];
        $idCliente = parent::CodeDescrypt($request['search']['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estadox'] == 0 ){
            $sqlAdicional = "  Estado = 0 ";
        }else if( $request['search']['Estadox'] == 1 ){
            $sqlAdicional = "  Estado = 1 ";
        }else{
            $sqlAdicional = "  Estado  in  (1,0) ";
        }

        $sqlAdicional .= " and IdCliente = ".$idCliente;
        $sqlFrom = "FROM profesionales_cliente Where "
                .$sqlAdicional;

        $sqlCampos = "IdProfesionalesCliente AS Id, Nombre, Correo, Telefono, Descripcion, Estado";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (Nombre like '%".$searchValue."%' ) or (Correo like '%".$searchValue."%' )";
        }

        $data = array();
        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_CLIENTES_PROFESIONALES_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_PROFESIONALES_EDITAR')");
        $INFORMACION_CLIENTES_PROFESIONALES_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '". session('keyUser')."' and p.nombre in ('INFORMACION_CLIENTES_PROFESIONALES_ESTADO')");

        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;

            if( count($INFORMACION_CLIENTES_PROFESIONALES_EDITAR) == 1 ){
                $permiso_estado = 1;
            }
            if( count($INFORMACION_CLIENTES_PROFESIONALES_ESTADO) == 1 ){
                $permiso_editar = 1;
            }
            $data[] = array(
              "Num"=>$i,
              "Hash"=> (new Controller)->CodeEncrypt($row->Id),
              "Nombre"=>$row->Nombre,
              "Correo"=>$row->Correo,
              "Telefono"=>$row->Telefono,
              "Descripcion"=>$row->Descripcion,
              "INFORMACION_CLIENTES_PROFESIONALES_EDITAR"=>$permiso_estado,
              "INFORMACION_CLIENTES_PROFESIONALES_ESTADO"=>$permiso_editar,
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

    // 103c2d9b95b5e96548b8799a739c0ab3
    public function parCrearProfesionales(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
                'parDescripcion' => 'nullable|string|max:100',
                'parCorreo' => 'nullable|email',
                'parTelefono' => 'nullable|numeric'
            ]);

            $idCliente = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('profesionales_cliente')
            ->insertGetId([
                'Nombre' => $credentials['parNombre'],
                'Correo' => $credentials['parCorreo'],
                'Telefono' => $credentials['parTelefono'],
                'Descripcion' => $credentials['parDescripcion'],
                'IdCliente' => $idCliente,
                'IdUsuario' => $usuario[0]->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_CLIENTES_PROFESIONALES_CLIENTE');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensage'=>'Prodcuto Guardado exitosamente'], 200);

        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 500);
            dd($ex);
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 500);
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 500);
            dd($th);
        }
    }

    //0352c62cbc500b1510275903ae80cafc
    public function infoProfesionalesCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);

            $producto = DB::table('productocliente')
            ->where('Id', $id)
            ->first();

            $data = [
                'producto' => $producto,
                'success' => true
            ];
            return response()->json($data, 200);
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

    // 43be2eee0cc0a43dfe151d924e8c2eb8
    public function parEditarProfesionalesCliente(Request $request)
    {
        try {
            $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'parNombre' => 'required|string',
                'parDescripcion' => 'nullable|string|max:100',
                'parCorreo' => 'nullable|email',
                'parTelefono' => 'nullable|numeric'
            ]);

            $id = parent::CodeDescrypt($credentials['Hash']);
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            DB::beginTransaction();
            DB::enableQueryLog();

            DB::table('profesionales_cliente')
            ->where('IdProfesionalesCliente', $id)
            ->update([
                'Nombre' => $credentials['parNombre'],
                'Correo' => $credentials['parCorreo'],
                'Telefono' => $credentials['parTelefono'],
                'Descripcion' => $credentials['parDescripcion'],
                'IdUsuario' => $usuario[0]->IdUsuario,
                'FechaHora' => date('Y-m-d H:i:s')
            ]);

            parent::queryLogAuditoria([$id], $usuario[0]->IdUsuario, 'INFORMACION_PROFESIONALES_CLIENTES_EDITAR');
            DB::commit();
            DB::disableQueryLog();
            return response()->json(['success'=>true, 'mensage'=>'Informacion de Profesional Actializada exitosamente'], 200);

        } catch (ValidationException $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $ex->validator->errors(),
                'success' => false,
                'error' => $ex
            ], 500);
            dd($ex);
        }catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $qe->getMessage(),
                'success' => false,
                'error' => $qe
            ], 500);
            dd($qe);
        } catch (\Throwable $th) {
            DB::disableQueryLog();
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'success' => false,
                'error' => $th
            ], 500);
            dd($th);
        }
    }

    //eee6c4c4d13da7b944aa2368a8ca8568
    public function parEstadoProfesionalesCliente(Request $request)
    {
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
         ]);
         $id = (new Controller)->CodeDescrypt($Credentials['Hash']);


         $Estado = DB::SELECT("SELECT Estado FROM profesionales_cliente WHERE IdProfesionalesCliente = '".$id."'");
         $Query = "";
         if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
             $n = 0;
             if( $Estado[0]->Estado == 0 ){
                 $n = 1;
             }
             if(DB::UPDATE("UPDATE profesionales_cliente set Estado = '$n' WHERE IdProfesionalesCliente = '".$id."';")){

                 $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                 $Query = "UPDATE profesionales_cliente set Estado = '$n' WHERE IdProfesionalesCliente = '".$id."';";

                 DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                         . "".$id.",'INFORMACION_PROFESIONALES_CLIENTES_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                 return response()->json(['success'=>'1']);

             }
         }
         return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }
}

