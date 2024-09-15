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

class BancoController extends Controller
{
    //724af7e43d52c6048fe2c27011a6bd60
    public function indexDatosBanco()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $Bancos = DB::SELECT("SELECT b.Id, b.Nit, b.NombreLegal, b.NombreComercial, b.Estado "
                . "FROM Banco b "
                . " ORDER BY b.NombreComercial Asc");
            foreach($Bancos as $b){
                $b->Hash = (new Controller)->CodeEncrypt($b->Id);
            }
            $Permisos = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                . "FROM Usuario u "
                . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                . "WHERE p.Pantalla = 'DATOS_BANCOS' and u.IdUsuario = " . $IdUsuario[0]->IdUsuario);

            foreach ($Permisos as $Permiso) {
                session([$Permiso->Nombre => $IdUsuario[0]->Token]);
            }
            $datos = [
                'Bancos' => $Bancos
            ];
            return view('process.datos.bancos')->with('datos', $datos);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    //867c2ca63281b99c41e464387364a423
    public function DatosCrearBanco()
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

    //85eb0e846da426a471ef8d459055eeb4
    public function CrearBanco(Request $request)
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
                'ParEmpresas' => 'required|array|min:1',
                'ParEmpresas.*' => 'required|int|distinct'
            ]);

            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            DB::beginTransaction();
            DB::enableQueryLog();
            $id = [];

            $idBanco = DB::table('Banco')->insertGetId([
                'NombreComercial' => $Credentials['ParNombreComercial'],
                'NombreLegal' => $Credentials['ParNombreLegal'],
                'Nit' => $Credentials['ParNit'],
                'Direccion' => $Credentials['ParDireccion'],
                'Telefono' => $Credentials['ParTelefono'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d H:i:s')
            ]);

            array_push($id, $idBanco);
            DB::table('Asoc_Empresa_banco')->where('Id', '=', $idBanco)->delete();
            array_push($id, $idBanco);
            for ($i=0; $i < count($Credentials['ParEmpresas']); $i++) {
                $idEmpresa = (new Controller)->CodeDescrypt($Credentials['ParEmpresas'][$i]);
                $idAsocBanco = DB::table('Asoc_Empresa_banco')->insertGetId([
                    'IdEmpresa' => $idEmpresa,
                    'Id' => $idBanco,
                    'Fecha' => date('Y-m-d h:i:s')
                ]);
                array_push($id, $idAsocBanco);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_BANCOS_CREAR');

            DB::disableQueryLog();
            DB::commit();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (ValidationException $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (QueryException $qe) {
            dd($qe);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }catch (\Throwable $th) {
            dd($th);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (\Exception $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        }
    }

    //5496ed1991b2fec4c36adb3ef9108229
    public function PAR_EstadoBanco(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $idBanco = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $Estado = DB::SELECT("SELECT Estado FROM Banco WHERE Id = '".$idBanco."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Banco set Estado = '$n' WHERE Id = '".$idBanco."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE Banco set Estado = '$n' WHERE Id = '".$idBanco."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idBanco.",'INFORMACION_BANCOS_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    //a0422a096a5a6ae243bee945ea959be6
    public function par_DatoInformacionLegalBanco()
    {
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);
        $idBanco = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $banco = DB::table('Banco')->where('Id',$idBanco)->get();
        $banco[0]->Hash = (new Controller)->CodeEncrypt($banco[0]->Id);
        $banco[0]->Id = null;

        $paises = DB::table('Par_Pais')->orderBy('Nombre','asc')->get();
        $departamento = DB::table('Par_Departamento')->orderBy('Nombre','asc')->get();
        $ciudad = DB::table('Par_Ciudad')->orderBy('Nombre','asc')->get();

        //Permisos

        $INFORMACION_BANCOS_LEGAL_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', $Credentials['Hash2']],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_BANCOS_LEGAL_EDITAR']
        ])->get();

        $Empresas = DB::table('Empresa')->select('IdEmpresa', 'NombreLegal', 'NombreComercial')
        ->where('Estado',1)->get();
        foreach ($Empresas as $e) {
            $e->HashEmpresa = (new Controller)->CodeEncrypt($e->IdEmpresa);
            $e->IdEmpresa = null;
        }
        $EmpresasAsoc = DB::table('Banco')
        ->select('Banco.Id', 'Empresa.IdEmpresa', 'Empresa.NombreLegal', 'Empresa.NombreComercial')
        ->join('asoc_empresa_banco', 'Banco.Id', '=', 'asoc_empresa_banco.Id')
        ->join('Empresa', 'asoc_empresa_banco.IdEmpresa', '=', 'Empresa.IdEmpresa')
        ->where('asoc_empresa_banco.Id', $idBanco)->get();

        foreach ($EmpresasAsoc as $asoc) {
            $asoc->HashBanco = (new Controller)->CodeEncrypt($asoc->Id);
            $asoc->HashEmpresa = (new Controller)->CodeEncrypt($asoc->IdEmpresa);
            $asoc->Id = null;
            $asoc->IdEmpresa = null;
        }


        if ($banco) {
            return response()->json([
                'Banco' => $banco,
                'Paises' => $paises,
                'Empresas' => $Empresas,
                'PerLegalEdicion' => $INFORMACION_BANCOS_LEGAL_EDITAR,
                'Departamento' => $departamento,
                'Ciudad' => $ciudad,
                'EmpresasAsoc' => $EmpresasAsoc
            ]);
        }
        return response()->json(['Error' => '1']);
    }

    //84fc61f0d881e36d1a1eabd5ec1a54e7
    public function par_DatoInformacionLegalBancoEdit()
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
            $idBanco = (new Controller)->CodeDescrypt($Credentials['Hash']);

            DB::enableQueryLog();
            DB::beginTransaction();

            DB::table('Banco')->where('Id', $idBanco)->update([
                'NombreComercial'=>$Credentials['ParNombreComercial'],
                'NombreLegal'=>$Credentials['ParNombreLegal'],
                'Nit'=>$Credentials['ParNit'],
                'Direccion'=>$Credentials['ParDireccion'],
                'IdCiudad' => $Credentials['ParGeneralCiudad'],
                'IdDepto' => $Credentials['ParGeneralDepartamento'],
                'IdPais' => $Credentials['ParGeneralPais'],
                'Telefono' => $Credentials['ParTelefono']
            ]);
            array_push($id, $idBanco);

            DB::table('Asoc_Empresa_Banco')->where('Id', '=', $idBanco)->delete();
            array_push($id, $idBanco);
            for ($i=0; $i < count($Credentials['ParEmpresas']); $i++) {
                $idEmpresa = (new Controller)->CodeDescrypt($Credentials['ParEmpresas'][$i]);
                DB::table('Asoc_Empresa_Banco')->updateOrInsert(
                    ['Id' => $idBanco, 'IdEmpresa' => $idEmpresa],
                    [
                        'Id' => $idBanco,
                        'IdEmpresa' => $idEmpresa,
                        'Fecha' => date('Y-m-d h:i:s')
                    ]
                );
                array_push($id, $idBanco);
            }

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_BANCOS_LEGAL_EDITAR');

            DB::disableQueryLog();
            DB::commit();

            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
        } catch (ValidationException $ex) {
            dd($ex);
            DB::disableQueryLog();
            DB::rollBack();
            return redirect()->route('724af7e43d52c6048fe2c27011a6bd60');
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
    public function DatosCrearContactoBanco()
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
            $idBanco = (new Controller)->CodeDescrypt($Credentials['Hash']);

            $id = [];

            DB::beginTransaction();
            DB::enableQueryLog();

            $idContacto = DB::table('contactos_banco')->insertGetId([
                'Nombre' => $Credentials['ParNombre'],
                'Cargo' => $Credentials['ParCargo'],
                'Celular' => $Credentials['ParCelular'],
                'Telefono' => $Credentials['ParTelefono'],
                'Correo' => $Credentials['ParCorreo'],
                'Horario' => $Credentials['ParHorario'],
                'IdBanco' => $idBanco,
                'IdUsuario' => $IdUsuario[0]->IdUsuario,
                'Fecha' => date('Y-m-d h:i:s')
            ]);

            array_push($id, $idContacto);

            (new Controller)->queryLogAuditoria($id, $IdUsuario[0]->IdUsuario, 'INFORMACION_BANCOS_CONTACTOS_CREAR');

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
    public function DatosContactoBancoPermisos()
    {
        $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);


        $INFORMACION_BANCOS_CONTACTOS_EDITAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=',session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_BANCOS_CONTACTOS_EDITAR']
        ])->get();

        $INFORMACION_BANCOS_CONTACTOS_CREAR = DB::table('Usuario')
        ->select('Par_Permiso.Nombre', 'Par_Permiso.Descripcion', 'Par_Permiso.Pantalla')
        ->join('Par_Perfi_Permiso', 'Usuario.IdPerfil' ,'=','Par_Perfi_Permiso.IdPerfil')
        ->join('Par_Permiso', 'Par_Perfi_Permiso.IdPermiso' ,'=','Par_Permiso.Id')
        ->where([
            ['Usuario.Token', '=', session('keyUser')],
            ['Par_Permiso.Nombre', '=', 'INFORMACION_BANCOS_CONTACTOS_CREAR']
        ])->get();

        return response()->json([
            'INFORMACION_BANCOS_CONTACTOS_EDITAR' => $INFORMACION_BANCOS_CONTACTOS_EDITAR,
            'INFORMACION_BANCOS_CONTACTOS_CREAR' => $INFORMACION_BANCOS_CONTACTOS_CREAR,
        ], 200);

    }

    // c368fa1c46b272b71940f37a56afe6ea
    public function ListarDatosContactoBanco(Request $request)
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
                . "contactos_banco cb "
                . "INNER JOIN usuario u on cb.idusuario = u.idusuario "
                . "where cb.Id = $id ".$sqlAdicional;

        $sqlCampos = "cb.Id, cb.Nombre, cb.Cargo, cb.Telefono, cb.Celular, cb.Correo, cb.Horario, date_format(cb.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when cb.Estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, cb.Estado , "
                . "u.nombreusuario ";

        ## Search
        $searchQuery = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (cb.Nombre like '%".$searchValue."%' or
                cb.Cargo like '%".$searchValue."%' or
                cb.Correo like'%".$searchValue."%' or
                cb.Horario like'%".$searchValue."%') ";
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
}

