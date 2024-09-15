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
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\MailController;

class EmpresaController extends Controller
{

    public function __DatosEmpresas(Request $request){

        $Estado = ( request()->get('Estado') == '1') ? 'AND e.Estado = 1 ':'AND e.Estado = 0 ';
        $Text = ( request()->get('OTC_TextBusqueda') != '') ? 'AND (
            e.NombreLegal like "%'.request()->get('OTC_TextBusqueda').'%" OR 
            e.NombreComercial like "%'.request()->get('OTC_TextBusqueda').'%" OR 
            e.Nit like "%'.request()->get('OTC_TextBusqueda').'%" 
            )':'';

        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $Empresas = DB::SELECT("SELECT DISTINCT e.IdEmpresa, e.Nit, e.NombreLegal, e.NombreComercial, e.Estado, pe.Nombre as TipoEmpresa "
                . "FROM Empresa e "
                . "INNER JOIN Par_UsuarioEmpresa p on e.IdEmpresa = p.IdEmpresa and p.IdUsuario = " . $IdUsuario[0]->IdUsuario
                . " INNER JOIN par_tipoempresa pe ON e.IdTipoEmpresa = pe.Id  
                WHERE 1 = 1 $Estado $Text "
                . " ORDER BY e.NombreComercial Asc"
                );
        foreach($Empresas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->IdEmpresa);
        }

        return response()->json([
            'Empresas'=>$Empresas,
            'query' =>"SELECT DISTINCT e.IdEmpresa, e.Nit, e.NombreLegal, e.NombreComercial, e.Estado, pe.Nombre as TipoEmpresa "
            . "FROM Empresa e "
            . "INNER JOIN Par_UsuarioEmpresa p on e.IdEmpresa = p.IdEmpresa and p.IdUsuario = " . $IdUsuario[0]->IdUsuario
            . " INNER JOIN par_tipoempresa pe ON e.IdTipoEmpresa = pe.Id  
            WHERE 1 = 1 $Estado $Text "
            . " ORDER BY e.NombreComercial Asc"
        ]);
    }

    public function __DetalleEmpresa($Hash){

        $IdEmp = (new Controller)->CodeDescrypt($Hash);

        $Empresa = DB::SELECT("SELECT "
            . "Nit, IdEmpresa, NombreLegal, "
            . "NombreComercial, IF(ISNULL(Direccion),'',Direccion) AS Direccion, "
            . "Logo, Estado, IF(ISNULL(Mision),'',Mision) AS Mision, IF(ISNULL(Vision),'',Vision) AS Vision, "
            . "IF(ISNULL(Objetivos),'',Objetivos) AS Objetivos, IdCiudad, IdDepartamento, "
            . "IdPais, IF(ISNULL(FechaConstitucion),'',FechaConstitucion) AS FechaConstitucion, IF(ISNULL(CorreoContacto),'',CorreoContacto) AS CorreoContacto, IdTipoEmpresa "
            . "FROM Empresa "
            . "WHERE IdEmpresa = " . $IdEmp);
        foreach( $Empresa as $d ){
            if( $d->FechaConstitucion != '' ){
                $Temp = explode("-",$d->FechaConstitucion);
                $d->FConst = parent::NombreDia($d->FechaConstitucion).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            }else{
                $d->FConst = "Sin especificar";
            }
        }

        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
            . "FROM Par_Pais "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        $TipoEmpresa = DB::SELECT("SELECT Id, Nombre "
            . "FROM par_tipoempresa "
            . "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");

        $Departamento = DB::SELECT("SELECT IdDepartamento,Hash, Nombre, IdPais "
            . "FROM Par_Departamento "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");

        $Ciudad = DB::SELECT("SELECT IdCiudad,Hash, Nombre, IdDepto "
            . "FROM Par_Ciudad "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $RL = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "INNER JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Representante' "
            . "WHERE RL.IdEmpresa = " . $IdEmp);
        $RS = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "LEFT JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Suplente' "
            . "WHERE RL.IdEmpresa = " . $IdEmp);

        $INFORMACION_EMPRESA_LEGAL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='".session('keyUser')."' and p.Nombre in ('INFORMACION_EMPRESA_LEGAL_EDITAR')");

        $TipoDocumento = DB::SELECT("SELECT "
            . "IdTipoDocumento as Id, "
            . "Nombre as TipoDocumento "
            . "FROM Par_Persona_Tipo_Documento "
            . "WHERE Estado = 1");

        $par_tipoempresa = DB::SELECT("SELECT "
            . "Id , "
            . "Nombre as TipoDocumento "
            . "FROM par_tipoempresa "
            . "WHERE Estado = 1");

        $Social = DB::SELECT("SELECT s.IdSocial,"
            . "s.Link,"
            . "r.Icono, "
            . "r.Nombre "
            . "FROM Social s "
            . "INNER JOIN Par_Redes_Sociales r on s.IdRS = r.IdRS "
            . "WHERE s.IdEmpresa = " . $IdEmp);

        $NotaPpto = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_PPTO'");

        $NotaAnticipo = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_ANTICIPO'");

        $NotaLegalizacion = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_LEGALIZACION'");

        $NotaOP = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OP'");

        $NotaOC = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OC'");

        $NotaIR = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$IdEmp."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_INFORME_REUNION'");

        
        $datos = [
            'Hash' => $Hash,
            'Empresa' => $Empresa,
            'TipoEmpresa' => $TipoEmpresa,
            'RL' => $RL,
            'RS' => $RS,
            'NotaIR' => $NotaIR,
            'NotaPpto' => $NotaPpto,
            'NotaAnticipo' => $NotaAnticipo,
            'NotaLegalizacion' => $NotaLegalizacion,
            'NotaOP' => $NotaOP,
            'NotaOC' => $NotaOC,
            'Social' => $Social,
            'TipoDocumento' => $TipoDocumento,
            'Paises' => $Paises,
            'Departamento' => $Departamento,
            'Ciudad' => $Ciudad,
            'par_tipoempresa' => $par_tipoempresa,
            'PEdicion' => $INFORMACION_EMPRESA_LEGAL_EDITAR
        ];
        return view('process.datos.empresa_detalle')->with('datos', $datos);
    }


    public function index()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {

            $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            
            $Permisos = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                . "FROM Usuario u "
                . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                . "WHERE p.Pantalla = 'DATOS_EMPRESA' and u.IdUsuario = " . $IdUsuario[0]->IdUsuario);

            foreach ($Permisos as $Permiso) {
                session([$Permiso->Nombre => $IdUsuario[0]->Token]);
            }
            $datos = [
                'Permisos' => $Permisos,
            ];
            return view('process.datos.empresa')->with('datos', $datos);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }

    public function CrearEmpresa()
    {
        $Credentials = $this->validate(request(), [
            'ParNit' => 'required|string',
            'ParNombreComercial' => 'required|string',
            'ParNombreLegal' => 'required|string',
            'ParGeneralPais' => 'required|int',
            'ParGeneralDepartamento' => 'required|int',
            'ParGeneralCiudad' => 'required|int',
            'ParTipoEmpresa' => 'required|int',
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $Query = "INSERT into Empresa (Nit,NombreComercial,NombreLegal,IdPais,IdDepartamento,IdCiudad,Estado,IdUsuario,Fecha,IdTipoEmpresa)"
            . "values ('" . addslashes($Credentials['ParNit']) . "', '" . addslashes($Credentials['ParNombreComercial']) . "', '" . addslashes($Credentials['ParNombreLegal']) . "',"
            . "" . addslashes($Credentials['ParGeneralPais']) . "," . addslashes($Credentials['ParGeneralDepartamento']) . "," . addslashes($Credentials['ParGeneralCiudad']) . ","
            . "1, " . $IdUsuario[0]->IdUsuario . ",'" . date("Y-m-d H:i:s") . "'," . addslashes($Credentials['ParTipoEmpresa']) . ");";
        if (DB::INSERT($Query)) {

            $id = DB::getPdo()->lastInsertId();


            DB::INSERT("INSERT INTO Par_UsuarioEmpresa (IdUsuario,IdEmpresa,Fecha) values ("
                . "" . $IdUsuario[0]->IdUsuario . "," . $id . ",'" . date("Y-m-d H:i:s") . "');");

            $Notas = DB::SELECT("SELECT IdTipoNota FROM Par_Tipo_Nota_Legal ");
            foreach($Notas as $n){
                DB::INSERT("INSERT INTO Notas (IdTipoNota,IdEmpresa,Fecha) values ("
                . "" . $n->IdTipoNota . "," . $id. ");");
            }

            DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                . "" . $id . ",'DATO_CREACION_INICIAL_EMPRESA','" . addslashes($Query) . "','INSERT'," . $IdUsuario[0]->IdUsuario . ",'" . date("Y-m-d H:i:s") . "');");

            return redirect()->route('f9e892e9ea8f026ac7a9487452d012fd');
        }
    }

    public function _ParamListEmpresa(){
        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
            . "FROM Par_Pais "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        
        $TipoEmpresa = DB::SELECT("SELECT Id, Nombre "
            . "FROM par_tipoempresa "
            . "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        $Departamento = DB::SELECT("SELECT IdDepartamento,Hash, Nombre, IdPais "
            . "FROM Par_Departamento "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");

        $Ciudad = DB::SELECT("SELECT IdCiudad,Hash, Nombre, IdDepto "
            . "FROM Par_Ciudad "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        return [
                'Paises' => $Paises,
                'TipoEmpresa' => $TipoEmpresa,
                'Ciudad' => $Ciudad,
                'Departamento' => $Departamento
            ];
    }

    public function __DataEdicionEmpresa(){
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
        ]);
        $Credentials['Hash'] = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $Empresa = DB::SELECT("SELECT "
            . "Nit, IdEmpresa, NombreLegal, "
            . "NombreComercial, IF(ISNULL(Direccion),'',Direccion) AS Direccion, "
            . "Logo, Estado, IF(ISNULL(Mision),'',Mision) AS Mision, IF(ISNULL(Vision),'',Vision) AS Vision, "
            . "IF(ISNULL(Objetivos),'',Objetivos) AS Objetivos, IdCiudad, IdDepartamento, "
            . "IdPais, IF(ISNULL(FechaConstitucion),'',FechaConstitucion) AS FechaConstitucion, IF(ISNULL(CorreoContacto),'',CorreoContacto) AS CorreoContacto, IdTipoEmpresa "
            . "FROM Empresa "
            . "WHERE IdEmpresa = " . $Credentials['Hash']);
        $RL = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "INNER JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Representante' "
            . "WHERE RL.IdEmpresa = " . $Credentials['Hash']);
        $RS = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "LEFT JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Suplente' "
            . "WHERE RL.IdEmpresa = " . $Credentials['Hash']);
        
        $Social = DB::SELECT("SELECT s.IdSocial,"
            . "s.Link,"
            . "r.Icono, "
            . "r.Nombre "
            . "FROM Social s "
            . "INNER JOIN Par_Redes_Sociales r on s.IdRS = r.IdRS "
            . "WHERE s.IdEmpresa = " . $Credentials['Hash']);
        
        return response()->json([
                'Empresa' => $Empresa,
                $this->_ParamListEmpresa(),
                'RL' => $RL,
                'RS' => $RS,
                'Social' => $Social
            ]);
    }

    public function par_DatoInformacionLegalEmpresa()
    {
        $Credentials = $this->validate(request(), [
            'Hash' => 'required|string',
            'Hash2' => 'required|string'
        ]);
        $Credentials['Hash'] = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $Empresa = DB::SELECT("SELECT "
            . "Nit, IdEmpresa, NombreLegal, "
            . "NombreComercial, IF(ISNULL(Direccion),'',Direccion) AS Direccion, "
            . "Logo, Estado, IF(ISNULL(Mision),'',Mision) AS Mision, IF(ISNULL(Vision),'',Vision) AS Vision, "
            . "IF(ISNULL(Objetivos),'',Objetivos) AS Objetivos, IdCiudad, IdDepartamento, "
            . "IdPais, IF(ISNULL(FechaConstitucion),'',FechaConstitucion) AS FechaConstitucion, IF(ISNULL(CorreoContacto),'',CorreoContacto) AS CorreoContacto, IdTipoEmpresa "
            . "FROM Empresa "
            . "WHERE IdEmpresa = " . $Credentials['Hash']);

        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
            . "FROM Par_Pais "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        $TipoEmpresa = DB::SELECT("SELECT Id, Nombre "
            . "FROM par_tipoempresa "
            . "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");

        $Departamento = DB::SELECT("SELECT IdDepartamento,Hash, Nombre, IdPais "
            . "FROM Par_Departamento "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");

        $Ciudad = DB::SELECT("SELECT IdCiudad,Hash, Nombre, IdDepto "
            . "FROM Par_Ciudad "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        $IdUsuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

        $RL = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "INNER JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Representante' "
            . "WHERE RL.IdEmpresa = " . $Credentials['Hash']);
        $RS = DB::SELECT("SELECT "
            . "IF(ISNULL(RL.NOMBRE),'', RL.NOMBRE) AS Nombre,"
            . "IF(ISNULL(RL.CELULAR),'',RL.CELULAR) AS Celular,"
            . "IF(ISNULL(RL.NRODOCUMENTO),'',RL.NRODOCUMENTO) AS NroDocumento,"
            . "IF(ISNULL(RL.CORREO),'',RL.CORREO) AS Correo,"
            . "pt.IdTipoDocumento,"
            . "pt.Nombre as TipoDocumento, RL.Foto "
            . "FROM Informacion_RLegal RL "
            . "LEFT JOIN Par_Persona_Tipo_Documento pt on RL.IdTipoDocumento = pt.IdTipoDocumento "
            . "INNER JOIN Par_Tipo_Representante_Legal trl on RL.IdTipoRL = trl.IdTipo and trl.Nombre = 'Suplente' "
            . "WHERE RL.IdEmpresa = " . $Credentials['Hash']);

        $INFORMACION_EMPRESA_LEGAL_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
            . "FROM Usuario u "
            . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
            . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
            . "WHERE u.Token ='".$Credentials['Hash2']."' and p.Nombre in ('INFORMACION_EMPRESA_LEGAL_EDITAR')");

        $TipoDocumento = DB::SELECT("SELECT "
            . "IdTipoDocumento as Id, "
            . "Nombre as TipoDocumento "
            . "FROM Par_Persona_Tipo_Documento "
            . "WHERE Estado = 1");

        $Social = DB::SELECT("SELECT s.IdSocial,"
            . "s.Link,"
            . "r.Icono, "
            . "r.Nombre "
            . "FROM Social s "
            . "INNER JOIN Par_Redes_Sociales r on s.IdRS = r.IdRS "
            . "WHERE s.IdEmpresa = " . $Credentials['Hash']);

        $NotaPpto = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_PPTO'");

        $NotaAnticipo = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_ANTICIPO'");

        $NotaLegalizacion = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_LEGALIZACION'");

        $NotaOP = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OP'");

        $NotaOC = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OC'");

        $NotaIR = DB::SELECT("SELECT n.Texto as Nota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".$Credentials['Hash']."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_INFORME_REUNION'");

        if ($Empresa) {
            return response()->json([
                'Empresa' => $Empresa,
                'TipoEmpresa' => $TipoEmpresa,
                'RL' => $RL,
                'RS' => $RS,
                'NotaIR' => $NotaIR,
                'NotaPpto' => $NotaPpto,
                'NotaAnticipo' => $NotaAnticipo,
                'NotaLegalizacion' => $NotaLegalizacion,
                'NotaOP' => $NotaOP,
                'NotaOC' => $NotaOC,
                'Social' => $Social,
                'TipoDocumento' => $TipoDocumento,
                'Paises' => $Paises,
                'Departamento' => $Departamento,
                'Ciudad' => $Ciudad,
                'PEdicion' => $INFORMACION_EMPRESA_LEGAL_EDITAR
            ]);
        }
        return response()->json(['Error' => '1']);
    }

    //56c9a8a7a10234fd2a81ec0de57b1aed
    public function par_DatoInformacionLegalEmpresaEdit()
    {
        $Credentials = $this->validate(request(), [
            'IdEmpresa' => 'required|int',
            'ParTipoEmpresa' => 'required|int',
            'ParNit' => 'required|string',
            'ParNombreComercial' => 'required|string',
            'ParNombreLegal' => 'required|string',
            'ParGeneralPais' => 'required|int',
            'ParGeneralDepartamento' => 'required|int',
            'ParGeneralCiudad' => 'required|int',
            'ParDireccion' => 'nullable|string',
            'ParFechaConstitucion' => 'nullable|string',
            'ParCorreoContacto' => 'nullable|email',
            'ParNombreRS' => 'nullable|string',
            'ParTipoDocumentoRS' => 'nullable|int',
            'ParNroDocumentoRS' => 'nullable|int',
            'ParCelularRS' => 'nullable|string',
            'ParCorreoRS' => 'nullable|email',
            'ParNombreRL' => 'nullable|string',
            'ParTipoDocumentoRL' => 'nullable|int',
            'ParNroDocumentoRL' => 'nullable|int',
            'ParCelularRL' => 'nullable|string',
            'ParCorreoRL' => 'nullable|email',
            'ParPaginaWeb' => 'nullable|string',
            'ParFacebook' => 'nullable|string',
            'ParTwitter' => 'nullable|string',
            'ParInstagram' => 'nullable|string',
            /*'ParNotaIR' => 'nullable|string',
            'ParNotaPpto' => 'nullable|string',
            'ParNotaAnticipo' => 'nullable|string',
            'ParNotaLegalizacion' => 'nullable|string',
            'ParNotaOP' => 'nullable|string',
            'ParNotaOC' => 'nullable|string',*/
            'ParMision' => 'nullable|string',
            'ParVision' => 'nullable|string',
            'ParObjetivos' => 'nullable|string',
            'ParLogo' => 'nullable|image|mimes:jpeg,png,jpg',
            'FotoSuplente' => 'nullable|image|mimes:jpeg,png,jpg',
            'FotoRepresentante' => 'nullable|image|mimes:jpeg,png,jpg'
        ]);
        try {
            if (session("INFORMACION_EMPRESA_PERSONAL") !== session("keyUser")) {
                return response()->json(['succes' => false, 'mensage' => "No tiene permiso para editar"], 200);
            }
            DB::enableQueryLog();
            DB::beginTransaction();
            $Hash = $Credentials['IdEmpresa'];
            $Credentials['IdEmpresa'] = (new Controller)->CodeDescrypt($Credentials['IdEmpresa']);
            $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            $id = [];
            array_push($id, DB::getPdo()->lastInsertId());
            $Credentials['ParDireccion'] = addslashes($Credentials['ParDireccion']) ? addslashes($Credentials['ParDireccion']): null;

            $Query = 'UPDATE Empresa SET Nit= ? ,' .
            ' NombreLegal= ? ,' .
            ' NombreComercial=? ,' .
            ' Direccion=? ,' .
            ' IdCiudad=? ,' .
            ' IdDepartamento=? ,' .
            ' IdPais=? ,'.
            ' IdUsuario=?,' .
            ' IdTipoEmpresa=?,' .
            ' FechaConstitucion = ?,'.
            ' Fecha= ?,'.
            ' CorreoContacto = ?,'.
            ' Mision = ?,'.
            ' Vision = ?,'.
            ' Objetivos = ?';
            $bindings = [
                $Credentials['ParNit'],
                $Credentials['ParNombreLegal'],
                $Credentials['ParNombreComercial'],
                $Credentials['ParDireccion'],
                $Credentials['ParGeneralCiudad'],
                $Credentials['ParGeneralDepartamento'],
                $Credentials['ParGeneralPais'],
                $IdUsuario[0]->IdUsuario,
                $Credentials['ParTipoEmpresa'],
                $Credentials['ParFechaConstitucion'],
                date("Y-m-d H:i:s"),
                $Credentials['ParCorreoContacto'],
                $Credentials['ParMision'],
                $Credentials['ParVision'],
                $Credentials['ParObjetivos'],
            ];

            if (!empty($Credentials['ParLogo'])) {
                $pathLogo = $Credentials['ParLogo']->getClientOriginalName();
                Storage::disk('local')->makeDirectory('datos/empresas/'.$Hash);
                $Credentials['ParLogo']->storeAs('datos/empresas/'.$Hash.'/', $pathLogo);
                $Query .= ', Logo = ?';
                array_push($bindings, $pathLogo);
            }

            $Query .= ' WHERE IdEmpresa = ?';
            array_push($bindings, $Credentials['IdEmpresa']);
            $sql = DB::update($Query, $bindings);
            array_push($id, $Credentials['IdEmpresa']);

            //update redes sociales
            DB::delete('DELETE FROM Social WHERE IdEmpresa ='.$Credentials['IdEmpresa']);
            array_push($id, $Credentials['IdEmpresa']);
            DB::insert(
                'INSERT INTO Social (Link, IdEmpresa, IdRS) values (?, ?, ?)',
                [addslashes($Credentials['ParPaginaWeb']), addslashes($Credentials['IdEmpresa']), 1]
            );
            array_push($id, DB::getPdo()->lastInsertId());
            DB::insert(
                'INSERT INTO Social (Link, IdEmpresa, IdRS) values (?, ?, ?)',
                [addslashes($Credentials['ParFacebook']), addslashes($Credentials['IdEmpresa']), 2]
            );
            array_push($id, DB::getPdo()->lastInsertId());
            DB::insert(
                'INSERT INTO Social (Link, IdEmpresa, IdRS) values (?, ?, ?)',
                [addslashes($Credentials['ParTwitter']), addslashes($Credentials['IdEmpresa']), 3]
            );
            array_push($id, DB::getPdo()->lastInsertId());
            DB::insert(
                'INSERT INTO Social (Link, IdEmpresa, IdRS) values (?, ?, ?)',
                [addslashes($Credentials['ParInstagram']), addslashes($Credentials['IdEmpresa']), 4]
            );
            array_push($id, DB::getPdo()->lastInsertId());

            $SelRL = DB::SELECT("SELECT Foto from Informacion_RLegal WHERE IdTipoRL = 1 AND IdEmpresa = ".$Credentials['IdEmpresa']);
            array_push($id, $Credentials['IdEmpresa']);
            $SelSL = DB::SELECT("SELECT Foto from Informacion_RLegal WHERE IdTipoRL = 2 AND IdEmpresa = ".$Credentials['IdEmpresa']);
            array_push($id, $Credentials['IdEmpresa']);

            DB::delete('DELETE FROM Informacion_RLegal WHERE IdEmpresa ='.$Credentials['IdEmpresa']);
            array_push($id, $Credentials['IdEmpresa']);
            //Representantes Legales
            if (!is_null($Credentials['ParNombreRL']) && !empty($Credentials['FotoRepresentante'])  ) {

                $pathFOTORL = $Credentials['FotoRepresentante']->getClientOriginalName();
                Storage::disk('local')->makeDirectory('datos/empresas/'.$Hash);
                $Credentials['FotoRepresentante']->storeAs('datos/empresas/'.$Hash.'/', $pathFOTORL);
                

                DB::insert('INSERT INTO Informacion_RLegal (Nombre, Celular, NroDocumento, Correo, IdEmpresa, IdTipoDocumento, IdTipoRL, Foto) values (?, ?, ?, ?, ?, ?, ?,?)',
                    [
                        $Credentials['ParNombreRL'],
                        $Credentials['ParCelularRL'],
                        $Credentials['ParNroDocumentoRL'],
                        $Credentials['ParCorreoRL'],
                        $Credentials['IdEmpresa'],
                        $Credentials['ParTipoDocumentoRL'],
                        1,
                        $pathFOTORL
                    ]
                );

               array_push($id, DB::getPdo()->lastInsertId());
            }else if( !is_null($Credentials['ParNombreRL']) && empty($Credentials['FotoRepresentante'])  ){
                
                DB::insert('INSERT INTO Informacion_RLegal (Nombre, Celular, NroDocumento, Correo, IdEmpresa, IdTipoDocumento, IdTipoRL, Foto) values (?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        $Credentials['ParNombreRL'],
                        $Credentials['ParCelularRL'],
                        $Credentials['ParNroDocumentoRL'],
                        $Credentials['ParCorreoRL'],
                        $Credentials['IdEmpresa'],
                        $Credentials['ParTipoDocumentoRL'],
                        1,
                        ""
                    ]
                );
            }

            //Representante Legal Suplente
            if (!is_null($Credentials['ParNombreRS']) && !empty($Credentials['FotoSuplente'])  ) {
                
                $pathFOTORS = $Credentials['FotoSuplente']->getClientOriginalName();
                Storage::disk('local')->makeDirectory('datos/empresas/'.$Hash);
                $Credentials['FotoSuplente']->storeAs('datos/empresas/'.$Hash.'/', $pathFOTORS);

                DB::insert('INSERT INTO Informacion_RLegal (Nombre, Celular, NroDocumento, Correo, IdEmpresa, IdTipoDocumento, IdTipoRL, Foto) values (?, ?, ?, ?, ?, ?, ?,?)',
                    [
                        $Credentials['ParNombreRS'],
                        $Credentials['ParCelularRS'],
                        $Credentials['ParNroDocumentoRS'],
                        $Credentials['ParCorreoRS'],
                        $Credentials['IdEmpresa'],
                        $Credentials['ParTipoDocumentoRS'],
                        2,
                        $pathFOTORS
                    ]
                );
                array_push($id, DB::getPdo()->lastInsertId());
            }else if( !is_null($Credentials['ParNombreRS']) && empty($Credentials['FotoSuplente'])  ){
                $Sel = DB::SELECT("SELECT Foto from Informacion_RLegal WHERE IdTipoRL = 2 AND IdEmpresa = ".$Credentials['IdEmpresa']);
                DB::insert('INSERT INTO Informacion_RLegal (Nombre, Celular, NroDocumento, Correo, IdEmpresa, IdTipoDocumento, IdTipoRL) values (?, ?, ?, ?, ?, ?, ?)',
                    [
                        $Credentials['ParNombreRS'],
                        $Credentials['ParCelularRS'],
                        $Credentials['ParNroDocumentoRS'],
                        $Credentials['ParCorreoRS'],
                        $Credentials['IdEmpresa'],
                        $Credentials['ParTipoDocumentoRS'],
                        2,
                        ""
                    ]
                );
            }
            /*
            //nota PPTO
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 6 and IdEmpresa = ?',[
                is_null($Credentials['ParNotaIR']) ? '': $Credentials['ParNotaIR'],
                $Credentials['IdEmpresa']
                ]);
            array_push($id, $Credentials['IdEmpresa']);
            //nota Anticipo
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 1 and IdEmpresa = ?', [
                is_null($Credentials['ParNotaPpto']) ? '':$Credentials['ParNotaPpto'],
                $Credentials['IdEmpresa']
                ]);
            array_push($id, $Credentials['IdEmpresa']);
            //nota Legalizacion
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 2 and IdEmpresa = ?', [
                is_null($Credentials['ParNotaAnticipo']) ? '':$Credentials['ParNotaAnticipo'],
                $Credentials['IdEmpresa']
                ]);
            array_push($id, $Credentials['IdEmpresa']);
            //nota OP
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 3 and IdEmpresa = ?' , [
                is_null($Credentials['ParNotaLegalizacion']) ? '': $Credentials['ParNotaLegalizacion'],
                $Credentials['IdEmpresa']
                ]);
            array_push($id, $Credentials['IdEmpresa']);
            //nota OC
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 4 and IdEmpresa = ?', [
                is_null($Credentials['ParNotaOP']) ? '': $Credentials['ParNotaOP'],
                $Credentials['IdEmpresa']
                ]);
            array_push($id, $Credentials['IdEmpresa']);
            //nota Informe Reunion
            DB::update('UPDATE Nota SET Texto = ? where IdTipoNota = 5 and IdEmpresa = ?' , [
                is_null($Credentials['ParNotaOC']) ? '':$Credentials['ParNotaOC'],
                $Credentials['IdEmpresa']
                ]);
            */
            array_push($id, $Credentials['IdEmpresa']);
            // Auditoria queries
            $sql = [];
            foreach (DB::getQueryLog() as $query) {
                array_push($sql, Str::replaceArray('?', $query['bindings'], $query['query']));
            }

            for ($i=0; $i < count($sql); $i++) {
                DB::insert('INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values (?, ?, ?, ?, ?, ?)',
                    [
                        $id[$i],
                        'DATO_ACTUALIZACION_EMPRESA',
                        $sql[$i],
                        explode(' ', $sql[$i])[0],
                        $IdUsuario[0]->IdUsuario,
                        date("Y-m-d H:i:s"),
                    ]);
            }

            DB::disableQueryLog();
            DB::commit();
            return redirect()->route('f9e892e9ea8f026ac7a9487452d012fd');
        } catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarDocumentosLegales($id){

        $sqlDocumentos = DB::SELECT("SELECT "
                . "dle.id, dle.fechavencimiento, dle.nombrearchivo, "
                . "case dle.estado when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario, pttle.Nombre as TipoDocumento "
                . "FROM "
                . "Documento_Legal_Empresa dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN par_tipo_documento_legal_empresa pttle on dle.IdTipoDocLegal = pttle.id "
                . "where dle.idempresa = $id"
                );
        $i = 1;
        foreach($sqlDocumentos as $d){
            $d->Num = $i;
            $i++;
        }
        return $sqlDocumentos;
    }

    public function ListarTarifasLegales($id){

        $sqlDocumentos = DB::SELECT("SELECT "
                . "dle.id, dle.fechavencimiento, dle.nombrearchivo, "
                . "case dle.estado when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario, pttle.Nombre as TipoDocumento "
                . "FROM "
                . "Tarifa_Legal_Empresa dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN Par_Tipo_Tarifa_Legal_Empresa pttle on dle.IdTipoDocLegal = pttle.id "
                . "where dle.idempresa = $id "
                );
        $i = 1;
        foreach($sqlDocumentos as $d){
            $d->Num = $i;
            $i++;
        }
        return $sqlDocumentos;
    }

    public function InformacionTributariaEmpresaPermisos(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'Hash2' => 'required|string',
        ]);
        $INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES')");

        $INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR')");
        $INFORMACION_EMPRESA_TRIBUTARIA_ENVIAR_DOCLEGALES = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_ENVIAR_DOCLEGALES')");
        $INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA')");
        $INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA')");
        $INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR')");
        $INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR')");
        $sqlLista = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "from Par_Tipo_Documento_Legal_Empresa "
                . "where estado = 1 "
                . "order by nombre asc ");
        $sqlLista2 = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "from Par_Tipo_Tarifa_Legal_Empresa "
                . "where estado = 1 "
                . "order by nombre asc ");
        foreach($sqlLista as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }
        foreach($sqlLista2 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }

        $Empresa = DB::SELECT("SELECT Logo from Empresa where IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Hash']));

        $NotaPpto = DB::SELECT("SELECT n.Texto as Nota, n.IdNota, n.IdEmpresa "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_PPTO'");

        $NotaAnticipo = DB::SELECT("SELECT n.Texto as Nota, n.IdNota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_ANTICIPO'");

        $NotaLegalizacion = DB::SELECT("SELECT n.Texto as Nota, n.IdNota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_LEGALIZACION'");

        $NotaOP = DB::SELECT("SELECT n.Texto as Nota, n.IdNota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OP'");

        $NotaOC = DB::SELECT("SELECT n.Texto as Nota, n.IdNota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_OC'");

        $NotaIR = DB::SELECT("SELECT n.Texto as Nota, n.IdNota "
            . "FROM Nota n "
            . "INNER JOIN Empresa e on n.IdEmpresa = '".(new Controller)->CodeDescrypt($Credentials['Hash'])."'"
            . "INNER JOIN Par_Tipo_Nota_Legal tn on n.IdTipoNota = tn.IdTipoNota "
            . "WHERE tn.codificacion = 'NOTA_INFORME_REUNION'");

        return response()->json([
                'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES'=>$INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES,
                'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR'=>$INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR,
                'INFORMACION_EMPRESA_TRIBUTARIA_ENVIAR_DOCLEGALES'=>$INFORMACION_EMPRESA_TRIBUTARIA_ENVIAR_DOCLEGALES,
                'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA'=>$INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CONSULTA,
                'INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA'=>$INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CONSULTA,
                'INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR'=>$INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR,
                'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR'=>$INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR,
                'Lista'=> $sqlLista,
                'Lista2'=> $sqlLista2,
                'Empresa'=> $Empresa,
                'NotaPpto'=>$NotaPpto,
                'NotaAnticipo'=>$NotaAnticipo,
                'NotaLegalizacion'=>$NotaLegalizacion,
                'NotaOP'=>$NotaOP,
                'NotaOC'=>$NotaOC,
                'NotaOC'=>$NotaOC,
                'NotaIR'=>$NotaIR,
            ]);
    }

    public function PAR_ListaDocumentosLegales(){
        $Credentials = $this->validate(request(),[
            'Hash2' => 'required|string',
        ]);

        $sqlLista = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "from Par_Tipo_Documento_Legal_Empresa "
                . "where estado = 1 "
                . "order by nombre asc ");
        foreach($sqlLista as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }

        $sqlUser = DB::SELECT("SELECT idusuario,Usuario,NombreUsuario,IdTipoUsuario "
                . "from Usuario "
                . "where estado = 1 "
                . "order by NombreUsuario asc ");
        foreach($sqlUser as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idusuario);
        }
        return response()->json([
                'Lista'=>$sqlLista,
                'User'=>$sqlUser,
            ]);
    }

    public function PAR_ListaTI(){
        $Credentials = $this->validate(request(),[
            'Hash2' => 'required|string',
        ]);

        $sqlLista = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "from Par_Tipo_Tarifa_Legal_Empresa "
                . "where estado = 1 "
                . "order by nombre asc ");
        foreach($sqlLista as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }

        $sqlUser = DB::SELECT("SELECT idusuario,Usuario,NombreUsuario,IdTipoUsuario "
                . "from Usuario "
                . "where estado = 1 "
                . "order by NombreUsuario asc ");
        foreach($sqlUser as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idusuario);
        }
        return response()->json([
                'Lista'=>$sqlLista,
                'User'=>$sqlUser,
            ]);
    }
    
    public function Datos_GuardarInformacionNotasLegales(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash2' => 'required|string',
            'ParNotaOC' => 'nullable|string',
            'ParNotaOP' => 'nullable|string',
            'ParNotaLegalizacion' => 'nullable|string',
            'ParNotaAnticipo' => 'nullable|string',
            'ParNotaPpto' => 'nullable|string',
            'ParNotaIR' => 'nullable|string',
        ]);
        
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaOC']."' where IdTipoNota = 5 AND IdEmpresa = ".($Credentials['Hash2']));
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaOP']."' where IdTipoNota = 4 AND IdEmpresa = ".($Credentials['Hash2']));
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaLegalizacion']."' where IdTipoNota = 3 AND IdEmpresa = ".($Credentials['Hash2']));
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaAnticipo']."' where IdTipoNota = 2 AND IdEmpresa = ".($Credentials['Hash2']));
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaPpto']."' where IdTipoNota = 1 AND IdEmpresa = ".($Credentials['Hash2']));
        DB::UPDATE("Update nota set Texto = '".$Credentials['ParNotaIR']."' where IdTipoNota = 6 AND IdEmpresa = " .($Credentials['Hash2']));
    }

    public function Datos_GuardarDocumentoLegalEmpresa(Request $request){

        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'Hash2' => 'required|string',
            'IdTipoDocumento' => 'required|int',
            'ParLogo' => 'required|file',
            'FechaVencimiento' => 'required|date',
        ]);
        $sqlUser = DB::SELECT("SELECT IdUsuario from Usuario where Token = '" . session('keyUser') . "'");
        $IdEmpresa = (new Controller)->CodeDescrypt($Credentials['Hash']);
        if( count($sqlUser) == 1 ){
            DB::UPDATE('Update Documento_Legal_Empresa set estado = 0 where IdTipoDocLegal = '.(new Controller)->CodeDescrypt($Credentials['IdTipoDocumento']));
            try {

                DB::enableQueryLog();
                DB::beginTransaction();
                    if (!empty($request->file('ParLogo'))) {
                        $id = Array();
                        $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                        Storage::disk('local')->makeDirectory('datos/empresas/'.$IdEmpresa.'/DocumentosLegales');
                        $request->file('ParLogo')->storeAs('datos/empresas/'.$IdEmpresa.'/DocumentosLegales', $pathLogo);



                        $Query = 'INSERT INTO Documento_Legal_Empresa (FechaVencimiento,NombreArchivo,Estado,IdTipoDocLegal,IdEmpresa,IdUsuario,FechaHora) values (?, ?, ?, ?, ?, ?,?)';
                        $Data = [
                            $Credentials['FechaVencimiento'],
                            $pathLogo,
                            1,
                            (new Controller)->CodeDescrypt($Credentials['IdTipoDocumento']),
                            $IdEmpresa,
                            $sqlUser[0]->IdUsuario,
                            date("Y-m-d H:i:s")
                        ];
                        DB::INSERT($Query,$Data);
                        $idR = DB::getPdo()->lastInsertId();
                        array_push($id, $idR);
                        $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosDocumentosLegales'));
                        if( count($Notificados) > 0 ){
                            for($i = 0; $i < count($Notificados);$i++){
                                $Notificados[$i] = (array) $Notificados[$i];
                                if( $Notificados[$i]['Correo'] == '' ){
                                    $Query = 'INSERT INTO Documento_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,IdDocLegal) values (?, ?, ?, ?, ?)';
                                    $Data = [
                                        'INTERNO',
                                        (new Controller)->CodeDescrypt($Notificados[$i]['Id']),
                                        '',
                                        '',
                                        $idR,
                                    ];
                                    DB::INSERT($Query,$Data);
                                    array_push($id, DB::getPdo()->lastInsertId());
                                }else{
                                   $Query = 'INSERT INTO Documento_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,IdDocLegal) values (?, ?, ?, ?, ?)';
                                    $Data = [
                                        'EXTERNO',
                                        0,
                                        $Notificados[$i]['Nombre'],
                                        $Notificados[$i]['Correo'],
                                        $idR,
                                    ];
                                    DB::INSERT($Query,$Data);
                                    array_push($id, DB::getPdo()->lastInsertId());
                                }
                            }
                        }

                        $sql = [];
                        foreach (DB::getQueryLog() as $query) {
                            array_push($sql, Str::replaceArray('?', $query['bindings'], $query['query']));
                        }

                        for ($i=0; $i < count($sql); $i++) {
                            DB::insert('INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values (?, ?, ?, ?, ?, ?)',
                                [
                                    $id[$i],
                                    'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_CREAR',
                                    $sql[$i],
                                    explode(' ', $sql[$i])[0],
                                    $sqlUser[0]->IdUsuario,
                                    date("Y-m-d H:i:s"),
                                ]);
                        }
                        DB::commit();

                        return response()->json([
                            'Info'=>1,
                            'X'=>'Update Documento_Legal_Empresa set estado = 0 where IdTipoDocLegal = '.(new Controller)->CodeDescrypt($Credentials['IdTipoDocumento'])
                        ]);
                    }else{
                        DB::rollBack();
                        return response()->json([
                            'Info'=>2
                        ]);
                    }


            } catch (\Exception $ex) {
                DB::rollBack();
                return response()->json([
                    'Info'=>-1,
                    'MessageEX'=>$ex->getMessage()
                ]);
            } catch (QueryException $qe) {
                DB::rollBack();
                return response()->json([
                    'Info'=>0,
                    'MessageQE'=>$qe->getMessage()
                ]);
            }
        }
    }


    public function Datos_GuardarTIEmpresa(Request $request){

        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'Hash2' => 'required|string',
            'IdTipoDocumentox' => 'required|int',
            'TipoValor' => 'required|string',
            'ValorX' => 'required|string',
            'Appto' => 'required|string',
            /*'Aop' => 'required|int',
            'Aoc' => 'required|int',*/
            'FechaVencimiento' => 'required|date',
        ]);
        $sqlUser = DB::SELECT("SELECT IdUsuario from Usuario where Token = '" . session('keyUser') . "'");
        $IdEmpresa = (new Controller)->CodeDescrypt($Credentials['Hash']);
        if( count($sqlUser) == 1 ){
            //DB::UPDATE('Update Documento_Legal_Empresa set estado = 0 where IdTipoDocLegal = '.(new Controller)->CodeDescrypt($Credentials['IdTipoDocumento']));
            try {

                DB::enableQueryLog();
                DB::beginTransaction();
                $id = Array();
                $Query = 'INSERT INTO Tarifa_Legal_Empresa (FechaVencimiento,valor,Estado,Tipo,IdTarifa,IdEmpresa,Ppto,Oc,Op,Anticipo,Legalizacion,IdUsuario,FechaHora) values (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)';
                $Data = [
                    $Credentials['FechaVencimiento'],
                    $Credentials['ValorX'],
                    1,
                    $Credentials['TipoValor'],
                    (new Controller)->CodeDescrypt($Credentials['IdTipoDocumentox']),
                    $IdEmpresa,
                    $Credentials['Appto'],
                    0,//$Credentials['Aoc'],
                    0,//$Credentials['Aop'],
                    0,
                    0,
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                $idR = DB::getPdo()->lastInsertId();
                array_push($id, $idR);
                $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosDocumentosLegales'));
                if( count($Notificados) > 0 ){
                    for($i = 0; $i < count($Notificados);$i++){
                        $Notificados[$i] = (array) $Notificados[$i];
                        if( $Notificados[$i]['Correo'] == '' ){
                            $Query = 'INSERT INTO Tarifa_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,Tarifa_Legal_Empresa_Id) values (?, ?, ?, ?, ?)';
                            $Data = [
                                'INTERNO',
                                (new Controller)->CodeDescrypt($Notificados[$i]['Id']),
                                '',
                                '',
                                $idR,
                            ];
                            DB::INSERT($Query,$Data);
                            array_push($id, DB::getPdo()->lastInsertId());
                        }else{
                           $Query = 'INSERT INTO Documento_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,IdDocLegal) values (?, ?, ?, ?, ?)';
                            $Data = [
                                'EXTERNO',
                                0,
                                $Notificados[$i]['Nombre'],
                                $Notificados[$i]['Correo'],
                                $idR,
                            ];
                            DB::INSERT($Query,$Data);
                            array_push($id, DB::getPdo()->lastInsertId());
                        }
                    }
                }

                $sql = [];
                foreach (DB::getQueryLog() as $query) {
                    array_push($sql, Str::replaceArray('?', $query['bindings'], $query['query']));
                }

                for ($i=0; $i < count($sql); $i++) {
                    DB::insert('INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values (?, ?, ?, ?, ?, ?)',
                        [
                            $id[$i],
                            'INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_CREAR',
                            $sql[$i],
                            explode(' ', $sql[$i])[0],
                            $sqlUser[0]->IdUsuario,
                            date("Y-m-d H:i:s"),
                        ]);
                }
                DB::commit();

                return response()->json([
                    'Info'=>1,
                    'X'=>''
                ]);


            } catch (\Exception $ex) {
                DB::rollBack();
                return response()->json([
                    'Info'=>-1,
                    'MessageEX'=>$ex->getMessage()
                ]);
            } catch (QueryException $qe) {
                DB::rollBack();
                return response()->json([
                    'Info'=>0,
                    'MessageQE'=>$qe->getMessage()
                ]);
            }
        }
    }


    public function PAR_EstadoEmpresa(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $idEmpresa = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $Estado = DB::SELECT("SELECT Estado FROM Empresa WHERE IdEmpresa = '".$idEmpresa."'");
        $Query = "";
        if( $Estado[0]->Estado == 0 || $Estado[0]->Estado == 1 ){
            $n = 0;
            if( $Estado[0]->Estado == 0 ){
                $n = 1;
            }
            if(DB::UPDATE("UPDATE Empresa set Estado = '$n' WHERE IdEmpresa = '".$idEmpresa."';")){

                $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

                $Query = "UPDATE Empresa set Estado = '$n' WHERE IdEmpresa = '".$idEmpresa."';";

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                        . "".$idEmpresa.",'INFORMACION_EMPRESA_ESTADO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

                return response()->json(['success'=>'1']);

            }
        }
        return response()->json(['success'=>'0','Estado'=>$Estado[0]->Estado,'Query'=>$Query]);
    }

    public function ListarDatosDocumentosLegalesEmpresa(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['TipoDocumento'] == 0 ){
            $sqlAdicional = " and dle.estado = 1 ";
        }else{
            $sqlAdicional = " and pttle.id = ".(new Controller)->CodeDescrypt($request['search']['TipoDocumento'])." ";
        }
        $sqlFrom = "FROM "
                . "Documento_Legal_Empresa dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN par_tipo_documento_legal_empresa pttle on dle.IdTipoDocLegal = pttle.id "
                . "where dle.idempresa = $id ".$sqlAdicional;

        $sqlCampos = "dle.id, dle.fechavencimiento, dle.nombrearchivo, date_format(dle.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario, pttle.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (dle.fechavencimiento like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                pttle.nombre like'%".$searchValue."%' ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){
            $sqlNtf = DB::SELECT("SELECT "
                    . "d.Tipo, case when d.Tipo = 'INTERNO' then 'Interno' else 'Externo' end as TipoText,"
                    . "d.IdUsuario, d.NombreExterno, d.CorreoExterno,u.NombreUsuario,u.Correo "
                    . "from Documento_Notificacion d "
                    . "LEFT JOIN usuario u on d.IdUsuario = u.IdUsuario "
                    . "where d.IdDocLegal = ".$row->id);

            $Temp = explode("-",$row->fechavencimiento);
            $row->fechavencimiento = parent::NombreDia($row->fechavencimiento).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
    
                    
            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->id),
              "TipoDocumento"=>$row->TipoDocumento,
              "fechavencimiento"=>$row->fechavencimiento,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              "nombrearchivo"=>$row->nombrearchivo,
              "estado"=>$row->estado,
              "Hash"=>$id,
                "sql"=>"SELECT "
                    . "d.Tipo, case when d.Tipo = 'INTERNO' then 'Interno' else 'Externo' end as TipoText,d.IdUsuario, d.NombreExterno, d.CorreoExterno,u.NombreUsuario,u.Correo "
                    . "from Documento_Notificacion d "
                    . "LEFT JOIN usuario u on d.IdUsuario = u.IdUsuario "
                    . "where d.IdDocLegal = ".$row->id,
              "Notificados"=>$sqlNtf,
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

    public function ListarDatosTIEmpresa(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['TipoDocumento'] == 0 ){
            $sqlAdicional = " and dle.estado = 1 ";
        }else{
            $sqlAdicional = " and pttle.id = ".(new Controller)->CodeDescrypt($request['search']['TipoDocumento'])." ";
        }
        $sqlFrom = "FROM "
                . "Tarifa_Legal_Empresa dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN Par_Tipo_Tarifa_Legal_Empresa pttle on dle.IdTarifa = pttle.id "
                . "where dle.idempresa = $id ".$sqlAdicional;

        $sqlCampos = "dle.id, dle.fechavencimiento, dle.Tipo,dle.valor,dle.ppto,dle.oc,dle.op, date_format(dle.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario, pttle.Nombre as TipoDocumento ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (dle.fechavencimiento like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                dle.valor like '%".$searchValue."%' or
                dle.Tipo like '%".$searchValue."%' or
                pttle.nombre like'%".$searchValue."%' ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechavencimiento);
            $row->fechavencimiento = parent::NombreDia($row->fechavencimiento).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->id),
              "TipoDocumento"=>$row->TipoDocumento,
              "Tipo"=>$row->Tipo,
              "fechavencimiento"=>$row->fechavencimiento,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              "valor"=>$row->valor,
              "op"=>$row->op,
              "oc"=>$row->oc,
              "ppto"=>$row->ppto,
              "estado"=>$row->estado,
              "Hash"=>(new Controller)->CodeEncrypt($row->id),
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

    function Datos_enviar_documentos_legales_empresa(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'Hash2' => 'required|string',
            'AsuntoCorreoDLE' => 'required|string',
            'CuerpoCorreoDLE' => 'required|string',
            'UrlUniversal' => 'required|string',
        ]);
        $arrayx = Array();
        $IdEmpresa = (new Controller)->CodeDescrypt($Credentials['Hash']);
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

        if( count($sqlUser) == 1 ){
            try {

                DB::enableQueryLog();
                DB::beginTransaction();

                $id = Array();

                $NotificadosList = "";
                $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosDocumentosLegales'));

                for($i = 0; $i < count($Notificados);$i++){
                    $Notificados[$i] = (array) $Notificados[$i];
                    if( $Notificados[$i]['Correo'] == '' ){
                        $NotificadosList .= "[INTERNO|".$Notificados[$i]['Id']."||]";

                    }else{
                        $NotificadosList .= "[EXTERNO|0|".$Notificados[$i]['Nombre']."|".$Notificados[$i]['Correo']."]";

                    }
                }

                $DocumentosList = "";
                $Documentos = \GuzzleHttp\json_decode($request->input('DocumentosLegales'));
                for($i = 0; $i < count($Documentos);$i++){
                    $Documentos[$i] = (array) $Documentos[$i];

                    $DocumentosList .= $Documentos[$i]['id']."|";
                }

                $Query = 'INSERT INTO notificaciones_documentos_legales (fecha,asunto,cuerpo,notificados,documentos,idusuario) values (?, ?, ?, ?, ?,?)';
                $Data = [
                    date("Y-m-d H:i:s"),
                    $Credentials['AsuntoCorreoDLE'],
                    $Credentials['CuerpoCorreoDLE'],
                    $NotificadosList,
                    $DocumentosList,
                    $sqlUser[0]->IdUsuario
                ];
                DB::INSERT($Query,$Data);
                $idR = DB::getPdo()->lastInsertId();
                array_push($id, $idR);
                $sql = [];
                        foreach (DB::getQueryLog() as $query) {
                            array_push($sql, Str::replaceArray('?', $query['bindings'], $query['query']));
                        }

                        for ($i=0; $i < count($sql); $i++) {
                            DB::insert('INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values (?, ?, ?, ?, ?, ?)',
                                [
                                    $id[$i],
                                    'INFORMACION_EMPRESA_TRIBUTARIA_DOCLEGALES_ENVIAR',
                                    $sql[$i],
                                    explode(' ', $sql[$i])[0],
                                    $sqlUser[0]->IdUsuario,
                                    date("Y-m-d H:i:s"),
                                ]);
                        }
                        DB::commit();
                for($i = 0; $i < count($Documentos);$i++){
                    $Documentos[$i] = (array) $Documentos[$i];
                    $Ar = DB::SELECT("SELECT NombreArchivo from documento_legal_empresa where id = ".(new Controller)->CodeDescrypt($Documentos[$i]['id']));
                    $Documentos[$i]['Name'] = $Ar[0]->NombreArchivo;
                }
                for($i = 0; $i < count($Notificados);$i++){
                    $Notificados[$i] = (array) $Notificados[$i];

                    $Info = [
                        'Asunto'=>$Credentials['AsuntoCorreoDLE'],
                        'Cuerpo'=> htmlspecialchars($Credentials['CuerpoCorreoDLE']),
                        'RegistradoPor'=>$sqlUser[0]->NombreUsuario,
                        'RegistradoPorCorreo'=>"gerencia@processpluserp.com",//$sqlUser[0]->Correo,
                        'IdEmpresa'=>$IdEmpresa,
                        'UrlUniversal'=>$Credentials['UrlUniversal'],
                        'Documentos'=>$Documentos
                    ];

                    
                    if( $Notificados[$i]['Correo'] == '' ){
                        $User = DB::SELECT("SELECT correo from usuario where idusuario = ".(new Controller)->CodeDescrypt($Notificados[$i]['Id']));
                        //$htmlContent = view('mailing.datos.DocumentosLegalesEmpresa', $Info,$User[0]->correo,$sqlUser[0]->NombreUsuario)->render();
                        //(new MailController)->___SendEmailMailJet($htmlContent,$User[0]->correo,$sqlUser[0]->NombreUsuario,$Credentials['AsuntoCorreoDLE']);
                        $htmlContent = view('mailing.datos.DocumentosLegalesEmpresa', ['Hash'=>$IdEmpresa,'Docs'=>$Documentos,'Asunto'=>$Credentials['AsuntoCorreoDLE'],'Cuerpo'=>htmlspecialchars($Credentials['CuerpoCorreoDLE'])])->render();
                        (new MailController)->___SendEmailMailJet($htmlContent,$User[0]->correo,$sqlUser[0]->NombreUsuario,$Credentials['AsuntoCorreoDLE']);
                    }else{
                        
                        $htmlContent = view('mailing.datos.DocumentosLegalesEmpresa', ['Hash'=>$IdEmpresa,'Docs'=>$Documentos,'Asunto'=>$Credentials['AsuntoCorreoDLE'],'Cuerpo'=>htmlspecialchars($Credentials['CuerpoCorreoDLE'])])->render();
                        (new MailController)->___SendEmailMailJet($htmlContent,$Notificados[$i]['Correo'],$Notificados[$i]['Nombre'],$Credentials['AsuntoCorreoDLE']);
                    }
                }

                return response()->json([
                    'Info'=>1,
                    'd'=>$Documentos,
                    'X'=>$arrayx
                ]);

            }catch (\Exception $ex) {
                DB::rollBack();
                return response()->json([
                    'Info'=>-1,
                    'd'=>$Documentos,
                    'MessageEX'=>"Linea: ".$ex->getLine()."\nError".$ex->getMessage()
                ]);
            } catch (QueryException $qe) {
                DB::rollBack();
                return response()->json([
                    'Info'=>0,
                    'MessageQE'=>$qe->getMessage()
                ]);
            }
        }
    }

    public function ConsultarNotificadosDocumento(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
        ]);
        $sql = DB::SELECT("SELECT d.Id,d.Tipo,d.IdUsuario,d.NombreExterno, d.CorreoExterno, u.NombreUsuario, case when isnull(u.Correo) then 'Sin Registrar' else u.Correo end as Correo "
                . "FROM documento_notificacion d "
                . "LEFT JOIN usuario u on u.idusuario = d.IdUsuario "
                . "where d.IdDocLegal = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        $i = 1;
        foreach($sql as $d){
            $d->Num = $i;
            $i++;
        }
        return response()->json([
                'Lista'=>$sql
            ]);
    }

    public function ConsultarNotificadosTI(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int'
        ]);
        $sql = DB::SELECT("SELECT d.Id,d.Tipo,d.IdUsuario,d.NombreExterno, d.CorreoExterno, u.NombreUsuario, case when isnull(u.Correo) then 'Sin Registrar' else u.Correo end as Correo "
                . "FROM Tarifa_Notificacion d "
                . "LEFT JOIN usuario u on u.idusuario = d.IdUsuario "
                . "where d.Tarifa_Legal_Empresa_Id = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        $i = 1;
        foreach($sql as $d){
            $d->Num = $i;
            $i++;
        }
        return response()->json([
                'Lista'=>$sql
            ]);
    }

    function GuardarNuevosNoticiados(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosDocumentosLegales'));
            $id = Array();
            if( count($Notificados) > 0 ){
                for($i = 0; $i < count($Notificados);$i++){
                    $Notificados[$i] = (array) $Notificados[$i];
                    if( $Notificados[$i]['Correo'] == '' ){
                        $Query = 'INSERT INTO Documento_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,IdDocLegal) values (?, ?, ?, ?, ?)';
                        $Data = [
                            'INTERNO',
                            (new Controller)->CodeDescrypt($Notificados[$i]['Id']),
                            '',
                            '',
                            (new Controller)->CodeDescrypt($request->input('IdDoc')),
                        ];
                        DB::INSERT($Query,$Data);
                        array_push($id, DB::getPdo()->lastInsertId());
                    }else{
                       $Query = 'INSERT INTO Documento_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,IdDocLegal) values (?, ?, ?, ?, ?)';
                        $Data = [
                            'EXTERNO',
                            0,
                            $Notificados[$i]['Nombre'],
                            $Notificados[$i]['Correo'],
                           (new Controller)->CodeDescrypt($request->input('IdDoc')),
                        ];
                        DB::INSERT($Query,$Data);
                        array_push($id, DB::getPdo()->lastInsertId());
                    }
                }

                (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_NUEVO_NOTIFICADO');
                DB::commit();
                return response()->json([
                    'Info'=>1,
                    'X'=>''
                ]);
            }

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    function GuardarNuevosNoticiadosTI(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosDocumentosLegales'));
            $id = Array();
            if( count($Notificados) > 0 ){
                for($i = 0; $i < count($Notificados);$i++){
                    $Notificados[$i] = (array) $Notificados[$i];
                    if( $Notificados[$i]['Correo'] == '' ){
                        $Query = 'INSERT INTO Tarifa_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,Tarifa_Legal_Empresa_Id) values (?, ?, ?, ?, ?)';
                        $Data = [
                            'INTERNO',
                            (new Controller)->CodeDescrypt($Notificados[$i]['Id']),
                            '',
                            '',
                            (new Controller)->CodeDescrypt($request->input('IdDoc')),
                        ];
                        DB::INSERT($Query,$Data);
                        array_push($id, DB::getPdo()->lastInsertId());
                    }else{
                       $Query = 'INSERT INTO Tarifa_Notificacion (Tipo,IdUsuario,NombreExterno,CorreoExterno,Tarifa_Legal_Empresa_Id) values (?, ?, ?, ?, ?)';
                        $Data = [
                            'EXTERNO',
                            0,
                            $Notificados[$i]['Nombre'],
                            $Notificados[$i]['Correo'],
                            (new Controller)->CodeDescrypt($request->input('IdDoc')),
                        ];
                        DB::INSERT($Query,$Data);
                        array_push($id, DB::getPdo()->lastInsertId());
                    }
                }

                (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_NUEVO_NOTIFICADO');
                DB::commit();
                return response()->json([
                    'Info'=>1,
                    'X'=>''
                ]);
            }

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EliminarNotificadoDocumento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $id = Array();

            $Query = 'DELETE FROM Documento_Notificacion WHERE Id = (?)';
            $Data = [
                $request->input('Hash'),
            ];
            DB::DELETE($Query,$Data);
            array_push($id, $request->input('Hash'));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_ELIMINAR_NOTIFICADO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EliminarNotificadoTI(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $id = Array();

            $Query = 'DELETE FROM tarifa_notificacion WHERE Id = (?)';
            $Data = [
                $request->input('Hash'),
            ];
            DB::DELETE($Query,$Data);
            array_push($id, $request->input('Hash'));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_ELIMINAR_NOTIFICADO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EstadoImpuestoEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $id = Array();

            $Query = 'UPDATE tarifa_legal_empresa SET Estado = ? WHERE Id = ?';
            $Data = [
                $request->input('estado'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_TRIBUTARIA_TARIFA_ESTADO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function InformacionUnidadesNegocioEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);
        $INFORMACION_EMPRESA_UND = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_UND')");

        $INFORMACION_EMPRESA_UND_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_UND_CREAR')");

        $INFORMACION_EMPRESA_UND_CONSULTAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_UND_CONSULTAR')");

        $INFORMACION_EMPRESA_AREAS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS')");
        $INFORMACION_EMPRESA_CARGOS_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_CARGOS_CREAR')");
        $INFORMACION_EMPRESA_CARGOS_CONSULTAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_CARGOS_CONSULTAR')");

        $INFORMACION_EMPRESA_CARGOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_CARGOS')");
        $INFORMACION_EMPRESA_AREAS_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS_CREAR')");
        $INFORMACION_EMPRESA_AREAS_CONSULTAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS_CONSULTAR')");
        $INFORMACION_EMPRESA_AREAS_REORGANIZAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS_REORGANIZAR')");
                    

        $Empresa = DB::SELECT("SELECT Logo from Empresa where IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Hash']));

        return response()->json([
                'INFORMACION_EMPRESA_UND'=>$INFORMACION_EMPRESA_UND,
                'INFORMACION_EMPRESA_UND_CREAR'=>$INFORMACION_EMPRESA_UND_CREAR,
                'INFORMACION_EMPRESA_UND_CONSULTAR'=>$INFORMACION_EMPRESA_UND_CONSULTAR,
                'INFORMACION_EMPRESA_CARGOS'=>$INFORMACION_EMPRESA_CARGOS,
                'INFORMACION_EMPRESA_CARGOS_CREAR'=>$INFORMACION_EMPRESA_CARGOS_CREAR,
                'INFORMACION_EMPRESA_CARGOS_CONSULTAR'=>$INFORMACION_EMPRESA_CARGOS_CONSULTAR,
                'INFORMACION_EMPRESA_AREAS'=>$INFORMACION_EMPRESA_AREAS,
                'INFORMACION_EMPRESA_AREAS_CREAR'=>$INFORMACION_EMPRESA_AREAS_CREAR,
                'INFORMACION_EMPRESA_AREAS_CONSULTAR'=>$INFORMACION_EMPRESA_AREAS_CONSULTAR,
                'INFORMACION_EMPRESA_AREAS_REORGANIZAR'=>$INFORMACION_EMPRESA_AREAS_REORGANIZAR,
                'Empresa'=> $Empresa,
                //'NotaOP'=>$NotaOP,
            ]);
    }

    public function ListarDatosEmpresa_Und(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and dle.estado = 1 ";
        }else if( $request['search']['Estado'] == 0 ){
            $sqlAdicional = " and dle.estado = 0 ";
        }else{
            $sqlAdicional = " and dle.estado in (1,0) ";
        }
        $sqlFrom = "FROM "
                . "Unidad_Negocio dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "LEFT JOIN Empleado e on dle.IdEmpleadoJefe = e.idempleado "
                . "where dle.idempresa = $id ".$sqlAdicional;

        $sqlCampos = "dle.IdEmpresa,dle.idunidad as id, dle.nombre,dle.nroempleados,dle.descripcion, date_format(dle.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario, "
                . "case when isnull(e.nombre1) then '' else e.nombre1 end as nombre1,"
                . "case when isnull(e.nombre2) then '' else e.nombre1 end as nombre2,"
                . "case when isnull(e.apellido1) then '' else e.apellido1 end as apellido1,"
                . "case when isnull(e.apellido2) then '' else e.apellido1 end as apellido2 "
                ;
        
        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (dle.nombre like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                dle.nroempleados like '%".$searchValue."%' or
                dle.descripcion like '%".$searchValue."%' or
                e.nombre1 like '%".$searchValue."%' or
                e.nombre2 like '%".$searchValue."%' or
                e.apellido1 like '%".$searchValue."%' or
                e.apellido2 like '%".$searchValue."%' or
                dle.fechahora like'%".$searchValue."%' ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_UND_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_UND_ESTADO')");
        $INFORMACION_EMPRESA_UND_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_UND_EDITAR')");
        foreach($empRecords['empRecords'] as $row){
            $Rentabilidad = DB::SELECT("SELECT Porcentaje from par_minrentabilidad where idunidad = ".$row->id." and idempresa = ".$row->IdEmpresa);
            $ValorRentabilidad = 0;
            if( count($Rentabilidad) > 0 ){
                $ValorRentabilidad = $Rentabilidad[0]->Porcentaje;
            }

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
                        
            $data[] = array(
              "Num"=>$i,
              "Porcentaje"=>$ValorRentabilidad,
              "id"=>(new Controller)->CodeEncrypt($row->id),
              "nombre"=>$row->nombre,
              "nroempleados"=>$row->nroempleados,
              "descripcion"=>$row->descripcion,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              "nombre1"=>$row->nombre1,
              "nombre2"=>$row->nombre2,
              "apellido1"=>$row->apellido1,
              "apellido2"=>$row->apellido2,
              "NombreEstado"=>$row->NombreEstado,
              "estado"=>$row->estado,
              "INFORMACION_EMPRESA_UND_ESTADO"=>$INFORMACION_EMPRESA_UND_ESTADO,
              "INFORMACION_EMPRESA_UND_EDITAR"=>$INFORMACION_EMPRESA_UND_EDITAR,
              "ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEOGOCIO"=>(new Controller)->ValidarPermisoUsuario("ADMINISTRACION_EMPRESAS_UNIDADES_NEGOCIO_PLANNEOGOCIO",session('keyUser'),0),
              "Hash"=>(new Controller)->CodeEncrypt($row->id)
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

    public function Datos_ListarClientesEmpresa(Request $request){

        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

        $idEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);

        $Empresas = DB::SELECT("SELECT Nit,NombreComercial,NombreLegal, Logo from Empresa where IdEmpresa = $idEmpresa");



        $data = [
                'Empresa' => $Empresas,
                'Years' => (new Controller)->ListarYears()
            ];

        return response()->json($data, 200);
    }

    public function Datos_ListarClientesEmpresa_FillYear(Request $request){

        $credentials = $this->validate($request, [
                'Hash' => 'required|string',
                'YearId' => 'required|int'
            ]);

        $idEmpresa =(new Controller)->CodeDescrypt($credentials['Hash']);

        $Empresas = DB::SELECT("SELECT Nit,NombreComercial,NombreLegal, Logo from Empresa where IdEmpresa = $idEmpresa");

        $Clientes = DB::SELECT("SELECT "
                . "c.IdCliente as Hash, c.NombreComercial "
                . "from Cliente c "
                . "INNER JOIN Asoc_Empresa_Cliente ac on c.IdCliente = ac.IdCliente AND ac.IdEmpresa = ".$idEmpresa." "
                . "WHERE c.IdCliente not in (SELECT p.IdCliente FROM plannegocio p where p.anio = ".$credentials['YearId'].")"
                . "");
        foreach($Clientes as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }

        $data = [
                'Clientes' => $Clientes,
                'Empresa' => $Empresas
            ];

        return response()->json($data, 200);
    }

    public function DetallePlanNegocioUnidad(Request $request){
        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);
        $id = (new Controller)->CodeDescrypt($credentials['Hash']);
        $Datos = DB::SELECT("SELECT "
                . "p.id as Hash, "
                . "c.NombreComercial,"
                . "p.Anio,"
                . "p.Estado "
                . "FROM plannegocio p "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "WHERE p.Id = $id");
        foreach($Datos as $d){

            $Mes = DB::SELECT("SELECT Pptado,Mes "
                    . "FROM plannegocio_mes "
                    . "WHERE IdPN = ".$id." order by Mes");
            $d->Mes = $Mes;
            $d->Hash = (new Controller)->CodeDescrypt($d->Hash);
        }
        $data = [
                'Datos' => $Datos,
                'INFORMACION_EMPRESA_UND_PLANNEGOCIO_EDITAR'=>(new Controller)->ValidarPermisoUsuario("INFORMACION_EMPRESA_UND_PLANNEGOCIO_EDITAR",session('keyUser'),0)
            ];

        return response()->json($data, 200);
    }

    public function ListarDatosPlanNegocioUnidad(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and p.estado = 1 ";
        }else if( $request['search']['Estado'] == 0 ){
            $sqlAdicional = " and p.estado = 0 ";
        }
        if( $request['search']['Cliente'] > 0 ){
            $sqlAdicional .= " and p.IdCliente =  ".(new Controller)->CodeDescrypt($request['search']['Cliente'])." ";
        }else if( $request['search']['Cliente'] == 0 ){
            $sqlAdicional .= " and p.IdCliente = p.IdCliente ";
        }

        $sqlFrom = "FROM "
                . "plannegocio p "
                . "INNER JOIN usuario u on p.idusuario = u.idusuario "
                . "INNER JOIN Cliente c on p.Idcliente = c.IdCliente "
                . "WHERE p.IdUnidad = $id ".$sqlAdicional;

        $sqlCampos = "p.id, p.Anio, c.NombreComercial, date_format(p.fecha,'%Y-%m-%d') as fechahora,"
                . "p.estado , "
                . "u.nombreusuario "
                ;
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (p.Anio like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                c.NombreComercial like '%".$searchValue."%'  ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        foreach($empRecords['empRecords'] as $row){
            $TotalPlan = DB::SELECT("SELECT sum(Pptado) as Total from plannegocio_mes where idpn = ".$row->id);
            $Valor = 0;
            if( count($TotalPlan) > 0 ){
                $Valor = $TotalPlan[0]->Total;
            }
            $data[] = array(
              "Num"=>$i,
              "Valor"=>$Valor,
              "Hash"=>(new Controller)->CodeEncrypt($row->id),
              "Anio"=>$row->Anio,
              "estado"=>$row->estado,
              "NombreComercial"=>$row->NombreComercial,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,

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

    public function PlanNegociosUnidad(Request $request){
        $credentials = $this->validate($request, [
                'Hash' => 'required|string'
            ]);

        $IdUnidad =(new Controller)->CodeDescrypt($credentials['Hash']);

        $Clientes = DB::SELECT("SELECT "
                . "c.IdCliente as Hash, c.NombreComercial "
                . "from Cliente c "

                . "WHERE c.IdCliente in (SELECT p.IdCliente FROM plannegocio p where p.IdUnidad = ".$IdUnidad.")"
                . "");
        foreach($Clientes as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            'Clientes'=>$Clientes,
            'INFORMACION_EMPRESA_UND_PLANNEGOCIO_CREAR'=> (new Controller)->ValidarPermisoUsuario("INFORMACION_EMPRESA_UND_PLANNEGOCIO_CREAR",session('keyUser'),0),
        ]);
    }

    public function GuardarPlanNegocios(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO plannegocio (Anio,IdEmpresa,IdUnidad,IdCliente,Estado,Fecha,IdUsuario) values (?,?, ?, ?, ?, ?,?)';
            $Data = [
                $request->input('YearId'),
                (new Controller)->CodeDescrypt($request->input('HashEmpresa')),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                (new Controller)->CodeDescrypt($request->input('ClienteId')),
                1,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
            ];
            DB::INSERT($Query,$Data);
            $IdNewR = DB::getPdo()->lastInsertId();
            array_push($id, $IdNewR);

            for($i = 1; $i<13; $i++){
                $Query = 'INSERT INTO plannegocio_mes (Mes,Pptado,IdPN,IdUsuario,Fecha) values (?,?,?,?,?)';
                $Data = [
                    $i,
                    $request->input('ValorMes'.$i),
                    $IdNewR,
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                ];
                DB::INSERT($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
            }

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_UND_PLANNEGOCIO_CREAR');
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

    public function GuardarEditarPlanNegocios(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'UPDATE plannegocio SET Estado = ?, Fecha = ?, IdUsuario = ? where Id = ?';
            $Data = [
                $request->input('EstadoPN'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')) );

            for($i = 1; $i<13; $i++){
                $Query = 'UPDATE plannegocio_mes SET Pptado = ? ,IdUsuario = ? ,Fecha = ? WHERE IdPN = ? AND Mes = ?';
                $Data = [
                    $request->input('ValorMes'.$i),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    (new Controller)->CodeDescrypt($request->input('Hash')),
                    $i,

                ];
                DB::UPDATE($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
            }

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_UND_PLANNEGOCIO_EDITAR');
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

    public function LogoEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $Empresa = DB::SELECT("SELECT Logo from Empresa where IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Hash']));

        return response()->json([
                'Empresa'=> $Empresa
            ]);
    }

    public function GuardarUnidadNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO unidad_negocio (IdEmpleadoJefe,nombre,estado,NroEmpleados,IdEmpresa,descripcion,fechahora,idusuario) values (?,?, ?, ?, ?, ?,?,?)';
            $Data = [
                0,
                $request->input('nombreunidad'),
                1,
                0,
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $request->input('descripcionunidad'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
            ];
            DB::INSERT($Query,$Data);
            $IdNewUnidad = DB::getPdo()->lastInsertId();
            array_push($id, $IdNewUnidad);

            $Query = 'INSERT INTO par_usuariounidad (IdUsuario,IdUnidad,Fecha) values (?,?,?)';
            $Data = [
                $sqlUser[0]->IdUsuario,
                DB::getPdo()->lastInsertId(),
                date("Y-m-d H:i:s"),
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'INSERT INTO par_minrentabilidad (porcentaje,IdEmpresa,IdUnidad,IdCliente) values (?,?,?,?)';
            $Data = [
                $request->input('porcentajerentabilidad'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $IdNewUnidad,
                0
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_UND_CREAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EstadoUnidadesNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $id = Array();

            $Query = 'UPDATE unidad_negocio SET Estado = ? WHERE IdUnidad = ?';
            $Data = [
                $request->input('estado'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_UND_ESTADO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Datos_UnidadNegocioEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT idunidad,nombre,descripcion from unidad_negocio where idunidad = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        foreach ($sql as $d){
            $d->Hash = (new Controller)->CodeDescrypt($Credentials['Hash']);
        }
        return response()->json([
            'Info'=>$sql
        ]);
    }

    public function DatosEditar_UnidadNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'update unidad_negocio set nombre = ?, descripcion = ?, fechahora = ?, idusuario = ? where idunidad = ? ';
            $Data = [
                $request->input('nombreunidad'),
                $request->input('descripcionunidad'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_UND_EDITAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Datos_ListarUnidadesNegocio(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT idunidad,nombre from unidad_negocio "
                . "where estado = 1 and idempresa = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by nombre");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idunidad);
        }
        return response()->json([
                'ListaUnd'=>$sql,
            ]);
    }

    public function GuardarAreaUnidadNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO Area (nombre,estado,Nivel,IdUnidad,NroEmpleados,IdEmpleadoJefe,descripcion,fechahora,idusuario) values (?, ?, ?, ?, ?,?,?,?,?)';
            $Data = [
                $request->input('nombrearea'),
                1,
                0,
                (new Controller)->CodeDescrypt($request->input('idunidad')),
                0,
                0,
                $request->input('descripcionarea'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_AREA_CREAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarDatosEmpresa_Areas(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and dle.estado = 1 ";
        }else if( $request['search']['Estado'] == 0 ){
            $sqlAdicional = " and dle.estado = 0 ";
        }else{
            $sqlAdicional = " and dle.estado in (1,0) ";
        }

        if( $request['search']['Unidad'] == 0 ){
            $sqlAdicional .= "  ";
        }else{
            $sqlAdicional .= " and dle.idunidad = ".(new Controller)->CodeDescrypt($request['search']['Unidad']);
        }

        $sqlFrom = "FROM "
                . "area dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN unidad_negocio un on dle.idunidad = un.idunidad "
                . "LEFT JOIN Empleado e on dle.IdEmpleadoJefe = e.idempleado "
                . "where un.idempresa = $id ".$sqlAdicional;

        $sqlCampos = "dle.idarea as id, dle.nombre,dle.nroempleados,dle.descripcion, date_format(dle.fechahora,'%Y-%m-%d') as fechahora,"
                . "case when dle.estado = 1 then 'Activo' else 'Inactivo' end as NombreEstado, dle.estado , "
                . "u.nombreusuario ,"
                . "case when isnull(e.nombre1) then '' else e.nombre1 end as nombre1,"
                . "case when isnull(e.nombre2) then '' else e.nombre1 end as nombre2,"
                . "case when isnull(e.apellido1) then '' else e.apellido1 end as apellido1,"
                . "case when isnull(e.apellido2) then '' else e.apellido1 end as apellido2 ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (dle.nombre like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                dle.nroempleados like '%".$searchValue."%' or
                dle.descripcion like '%".$searchValue."%' or
                e.nombre1 like '%".$searchValue."%' or
                e.nombre2 like '%".$searchValue."%' or
                e.apellido1 like '%".$searchValue."%' or
                e.apellido2 like '%".$searchValue."%' or
                dle.fechahora like'%".$searchValue."%' ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_AREAS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS_ESTADO')");
        $INFORMACION_EMPRESA_AREAS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_AREAS_EDITAR')");
        
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            

            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->id),
              "nombre"=>$row->nombre,
              "nroempleados"=>$row->nroempleados,
              "descripcion"=>$row->descripcion,
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              "NombreEstado"=>$row->NombreEstado,
              "nombre1"=>$row->nombre1,
              "nombre2"=>$row->nombre2,
              "apellido1"=>$row->apellido1,
              "apellido2"=>$row->apellido2,
              "estado"=>$row->estado,
              "INFORMACION_EMPRESA_AREAS_ESTADO"=>$INFORMACION_EMPRESA_AREAS_ESTADO,
              "INFORMACION_EMPRESA_AREAS_EDITAR"=>$INFORMACION_EMPRESA_AREAS_EDITAR,
              "Hash"=>(new Controller)->CodeEncrypt($row->id)
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

    public function EstadoAreaUnidadesNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $id = Array();

            $Query = 'UPDATE area SET Estado = ? WHERE idarea = ?';
            $Data = [
                $request->input('estado'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_AREAS_ESTADO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Datos_AreaUnidadNegocioEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT idarea as idunidad,nombre,descripcion from area where estado = 1 and IdUnidad = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        foreach ($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idunidad);
        }
        return response()->json([
            'Info'=>$sql
        ]);
    }
    public function Datos_CargosAreasUnidadNegocioEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT idcargo as idunidad,nombre from cargo where idarea = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        foreach ($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idunidad);
        }
        return response()->json([
            'Info'=>$sql
        ]);
    }

    public function DatosEditar_AreaUnidadNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'update area set nombre = ?, descripcion = ?, fechahora = ?, idusuario = ? where idarea = ? ';
            $Data = [
                $request->input('nombreunidad'),
                $request->input('descripcionunidad'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_AREA_EDITAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Datos_ListarAreaUnidadesNegocio(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT nivel,idarea,nombre from area "
                . "where estado = 1 and idunidad = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by nivel");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idarea);
        }
        return response()->json([
                'ListaUnd'=>$sql,
            ]);
    }

    public function Datos_ReorganizarAreas(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'orden' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $temp = explode("|",$Credentials['orden']);
        $tt = "";
        $x = 0;
        for($i = 0; $i < count($temp)-1;$i++,$x++){
            $t = explode("-",$temp[$i]);
                $Query = "UPDATE area SET Nivel = ".($x+1)." WHERE idarea = ".(new Controller)->CodeDescrypt($t[0]);
                DB::INSERT( $Query );
                $id = $t[0];

                /*DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'INFORMACION_EMPRESA_AREAS_REORGANIZAR','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");
                */
            if( ($i+1) < (count($temp)/2) ){

            }

        }
        return response()->json([
            'Info'=>count($temp),
        ]);
    }

    public function GuardarCargoEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO cargo (nombre,funciones,nivel,idarea,nroempleados,fechahora,idusuario) values (?, ?, ?, ?, ?,?,?)';
            $Data = [
                $request->input('nombrecargo'),
                $request->input('descripcioncargo'),
                0,
                (new Controller)->CodeDescrypt($request->input('idarea')),
                0,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_CARGOS_CREAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarDatosEmpresa_Cargos(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            //'Hash2' => 'required|string',
        ]);

        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";


        if( $request['search']['Unidad'] == '0' ){
            $sqlAdicional .= "  ";
        }else{
            $sqlAdicional .= " and un.idunidad = ".(new Controller)->CodeDescrypt($request['search']['Unidad']);
        }
        if( $request['search']['Area'] == '0' ){
            $sqlAdicional .= "  ";
        }else{
            $sqlAdicional .= " and a.idarea = ".(new Controller)->CodeDescrypt($request['search']['Area']);
        }

        $sqlFrom = "FROM "
                . "cargo dle "
                . "INNER JOIN usuario u on dle.idusuario = u.idusuario "
                . "INNER JOIN area a on dle.idarea = a.idarea "
                . "INNER JOIN unidad_negocio un on a.idunidad = un.idunidad "
                . "where un.idempresa = $id ".$sqlAdicional;

        $sqlCampos = "dle.idcargo as id, un.nombre as Unidad, a.nombre as Area, dle.nombre,dle.funciones , dle.nroempleados, date_format(dle.fechahora,'%Y-%m-%d') as fechahora,"
                . " "
                . "u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and (dle.nombre like '%".$searchValue."%' or
                u.nombreusuario like '%".$searchValue."%' or
                dle.nroempleados like '%".$searchValue."%' or
                dle.funciones like '%".$searchValue."%' or
                a.nombre like '%".$searchValue."%' or
                un.nombre like '%".$searchValue."%' or
                dle.fechahora like'%".$searchValue."%' ) ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_CARGOS_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_CARGOS_ESTADO')");
        $INFORMACION_EMPRESA_CARGOS_EDITAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_CARGOS_EDITAR')");
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $data[] = array(
              "Num"=>$i,
              "id"=>(new Controller)->CodeEncrypt($row->id),
              "nombre"=>$row->nombre,
              "Unidad"=>$row->Unidad,
              "Area"=>$row->Area,
              "nroempleados"=>$row->nroempleados,
              "funciones"=> nl2br($row->funciones),
              "nombreusuario"=>$row->nombreusuario,
              "fechahora"=>$row->fechahora,
              "INFORMACION_EMPRESA_CARGOS_ESTADO"=>$INFORMACION_EMPRESA_CARGOS_ESTADO,
              "INFORMACION_EMPRESA_CARGOS_EDITAR"=>$INFORMACION_EMPRESA_CARGOS_EDITAR,
              "Hash"=>(new Controller)->CodeEncrypt($row->id)
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

    public function Datos_CargosAreaUnidadNegocioEmpresa(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
        ]);
        $sql = DB::SELECT("SELECT idcargo as idunidad,nombre,funciones as descripcion from cargo where idcargo = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        foreach ($sql as $d){
            $d->Hash = (new Controller)->CodeDescrypt($Credentials['Hash']);
        }
        return response()->json([
            'Info'=>$sql,
            'SQL' => "SELECT idcargo as idunidad,nombre,funciones as descripcion from cargo where idcargo = ".(new Controller)->CodeDescrypt($Credentials['Hash'])
        ]);
    }

    public function DatosEditar_CargoAreaUnidadNegocioEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'update cargo set nombre = ?, funciones = ?, fechahora = ?, idusuario = ? where idcargo = ? ';
            $Data = [
                $request->input('nombreunidad'),
                $request->input('descripcionunidad'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_CARGO_EDITAR');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarPptoGeneral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ADD = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADD')");

        $sql = DB::SELECT("SELECT p.*, u.nombreusuario, date_format(p.fechahora,'%Y-%m-%d') as fechahora  "
                . "FROM ppto_general p "
                . "inner join usuario u on p.idusuario = u.idusuario");
        $i = 1;
        foreach($sql as $d){
            $Temp = explode("-",$d->fechahora);
            $d->fechahora = parent::NombreDia($d->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $d->Num = $i;
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $i++;
        }
        return response()->json([
            'Info'=>$sql,
            'INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA'=>$INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA,
            'INFORMACION_EMPRESA_PPTOGENERAL_ADD'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADD
        ]);
    }

    public function ListarPptoPersonal(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ADD = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADD')");

        $sql = DB::SELECT("SELECT p.*, u.nombreusuario, date_format(p.fecha,'%Y-%m-%d') as fechahora  "
                . "FROM ppto_personal_general p "
                . "inner join usuario u on p.idusuario = u.idusuario");
        $i = 1;
        foreach($sql as $d){
            $Temp = explode("-",$d->fechahora);
            $d->fechahora = parent::NombreDia($d->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $d->Num = $i;
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $i++;
        }
        return response()->json([
            'Info'=>$sql,
            'INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA'=>$INFORMACION_EMPRESA_PPTOGENERAL_CONSULTA,
            'INFORMACION_EMPRESA_PPTOGENERAL_ADD'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADD
        ]);
    }

    public function ListarGruposJuntaDirectiva(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);

        $sql = DB::SELECT("SELECT p.*, u.nombreusuario, date_format(p.fecha,'%Y-%m-%d') as fechahora  "
                . "FROM grupos_junta_directiva p "
                . "inner join usuario u on p.idusuario = u.idusuario "
                . "WHERE p.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        $sqlAsignados = DB::SELECT("SELECT p.Grupo, jd.*, u.nombreusuario "
                . "FROM grupos_junta_directiva p "
                . "INNER JOIN usuarios_junta_directiva jd on p.Id = jd.IdGrupo "
                . "inner join usuario u on p.idusuario = u.idusuario "
                . "WHERE p.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        $i = 1;
        foreach($sql as $d){
            $d->Num = $i;
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $i++;
        }
        $i = 1;
        foreach($sqlAsignados as $d){
            $d->Num = $i;
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $i++;
        }
        return response()->json([
            'Info'=>$sql,
            'InfoAsig'=>$sqlAsignados
        ]);
    }

    public function ListarYearPptoGeneralNew(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $Inicio = date("Y")-2;
        $Data = Array();
        $x = 0;
        for($i = $Inicio; $i <= (date("Y")+1);$i++){
            //$sql = DB::SELECT("SELECT Year from ppto_personal_general where Year = $i");
            $Data[$x] = $i;
                $x++;
        }

        $INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser') ."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser') ."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser') ."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser') ."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM')");
        $Meses = [];
        for($i = 1; $i <= 12; $i++){
            $Meses[$i-1] = [$i,parent::NombreMesesLargo($i)];
        }
        return response()->json([
            'Info'=>$Data,
            'Meses'=>$Meses,
            'MesActual' => intval(date("m")),
            'INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO,
            'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM,
            'INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM'=>$INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEM,
            'INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO'=>$INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO
        ]);
    }

    public function OpcionesPptoGeneral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO')");
        $INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".$Credentials['Hash']."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM')");
        return response()->json([
            'INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO,
            'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM'=>$INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM
        ]);
    }

    public function GuardarGrupoPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO grupo_ppto_agencia (nombre,fecha,idppto,idusuario,fechahora,tipo,orden) values (?, ?, ?, ?, ?,?,?)';
            $Data = [
                $request->input('nombregrupo'),
                date("Y-m-d"),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $request->input('tipocosto'),
                0

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarGrupoPptoPersonal(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_personal_grupos (nombre,idpptopersonal,idusuario,orden) values (?, ?, ?, ?)';
            $Data = [
                $request->input('nombregrupo'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $sqlUser[0]->IdUsuario,
                0

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarIngresoPptoPersonal(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_personal_ingresos (nombre,valormensual,idpptopersonal,idusuario) values (?, ?, ?, ?)';
            $Data = [
                $request->input('nombregrupo'),
                $request->input('valor'),
                (new Controller)->CodeDescrypt($request->input('Hash')),
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDGRUPO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    public function ListarGruposPptoGeneral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $sql = DB::SELECT("SELECT orden, "
                . " id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by Tipo,Orden asc");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        $sql2 = DB::SELECT("SELECT id, nombre from par_periodicidad_ppto_agencia "
                . " where estado = 1");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        foreach($sql2 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            'Info'=>$sql,
            'Info2'=>$sql2,
        ]);
    }

    public function ListarGruposPersonal(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $sql = DB::SELECT("SELECT orden, "
                . " id, nombre from ppto_personal_grupos where idpptopersonal = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by Orden asc");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        $sql2 = DB::SELECT("SELECT id, nombre from par_periodicidad_ppto_agencia "
                . " where estado = 1");
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        foreach($sql2 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            'Info'=>$sql,
            'Info2'=>$sql2,
        ]);
    }

    public function GuardarItemGrupoPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO item_ppto_agencia (nombre,entidad,contacto,telefono,numobligacion,pptado_mes,idgrupo,idperiodicidad,idusuario,fechahora,orden) '
                    . 'values (?, ?, ?, ?, ?,?,?,?,?,?,?)';
            $Data = [
                $request->input('nombreitem'),
                $request->input('entidad'),
                $request->input('contacto'),
                $request->input('telefono'),
                $request->input('obligacion'),
                $request->input('pptadomensual'),
                (new Controller)->CodeDescrypt($request->input('IdGrupo')),
                (new Controller)->CodeDescrypt($request->input('IdPeriodicidad')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                0

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarItemGrupoPptoPersonal(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_personal_items (nombre,ValorMensual,idgrupo,idusuario) '
                    . 'values (?, ?, ?, ?)';
            $Data = [
                $request->input('nombreitem'),
                
                $request->input('pptadomensual'),
                (new Controller)->CodeDescrypt($request->input('IdGrupo')),
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarItemGrupoPptoPersonalMes(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_personal_item_mensual (IdIngreso,IdItem,Mes,idusuario,ValorPagado) '
                    . 'values (?, ?, ?, ?,?)';
            $Data = [
                $request->input('IdIng'),
                $request->input('IdItem'),
                $request->input('MesesPptoGeneral'),
                $sqlUser[0]->IdUsuario,
                $request->input('valortasadonacion')               

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarItemGrupoPptoPersonalMesC(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            DB::UPDATE("UPDATE ppto_personal_item_mensual SET "
            . "valorpagado = ".$request->input('valortasadonacion')." "
            . "WHERE Id =".$request->input('Id')." ");
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>"UPDATE ppto_personal_item_mensual SET "
                . "valorpagado = ".$request->input('valortasadonacion')." "
                . "WHERE Id =".$request->input('Id')." "
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarItemGrupoPptoPersonalMesCE(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            DB::DELETE("delete FROM ppto_personal_item_mensual  "
            . "WHERE IdItem =".$request->input('Id')." ");

            DB::DELETE("delete FROM ppto_personal_items  "
            . "WHERE Id =".$request->input('Id')." ");
            DB::commit();
            return response()->json([
                'Info'=>1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarUnidadesUsuario(Request $request){
        $sqlUnidades = DB::SELECT("SELECT un.IdUnidad as Hash, un.nombre as Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash'))." order by un.IdUnidad");
        foreach($sqlUnidades as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        return response()->json([
            'Info'=>$sqlUnidades,
        ]);
    }

    public function InformacionPptoGeneral_Meses(){

        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
            'MesesPptoGeneral'=>'required|int',
            'Emp'=>'required|int'
        ]);

        $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
            . "e.IdEmpresa, e.NombreComercial "
            . "FROM par_usuarioempresa p "
            . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
            . "inner join usuario u on u.IdUsuario = p.IdUsuario "
            . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
            foreach($sqlEmpresas as $e){
                $e->Hash = (new Controller)->CodeEncrypt($e->IdEmpresa);
                $e->NombreComercial = strtoupper($e->NombreComercial);
                $sqlUnidades = DB::SELECT("SELECT DISTINCT un.IdUnidad, un.nombre "
                        . "FROM unidad_negocio un "
                        . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                        . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                        . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                        . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
                $e->Unidades = $sqlUnidades;
            }
        $sqlInformacionFijos = DB::SELECT("SELECT Id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and Tipo = 'FIJO' order by orden asc");
        foreach($sqlInformacionFijos as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $Items = DB::SELECT("SELECT i.*, p.nombre as Periodicidad "
                    . "from item_ppto_agencia i "
                    . "INNER JOIN par_periodicidad_ppto_agencia p on i.IdPeriodicidad = p.id "
                    . "where idgrupo = ".$d->Id." order by i.orden");

            foreach($Items as $t){
                if( $t->Contacto == null ){
                    $t->Contacto = '';
                }
                if( $t->Telefono == null ){
                    $t->Telefono = '';
                }
                $t->Hash = (new Controller)->CodeEncrypt($t->Id);
                $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa, e.NombreComercial "
                . "FROM par_usuarioempresa p "
                . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
                . "inner join usuario u on u.IdUsuario = p.IdUsuario "
                . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
                foreach($sqlEmpresas as $e){
                    $e->Hash = (new Controller)->CodeEncrypt($e->IdEmpresa);
                    $e->NombreComercial = strtoupper($e->NombreComercial);
                    $sqlUnidades = DB::SELECT("SELECT DISTINCT un.IdUnidad, un.nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");


                    foreach($sqlUnidades as $u){
                        $u->Hash = (new Controller)->CodeEncrypt($u->IdUnidad);
                        $ItemsUnidades = DB::SELECT("SELECT "
                                
                                . "d.*, case when isnull(format((d.valorpagado/d.valor)*100,0)) then 0 else format((d.valorpagado/d.valor)*100,0) end as PorcentajePagado , case when isnull((d.valor-d.valorpagado)) then 0 else (d.valor-d.valorpagado) end  as Dif, 
                                case when isnull(format(100-((d.valorpagado/d.valor)*100),0)) then 0 else format(100-((d.valorpagado/d.valor)*100),0) end  as PorDif,"
                                . "day(d.FechaPago) as DiaPago, month(d.FechaPago) as Mes, year(d.FechaPago) as Year_Pago "
                                . "FROM detalle_ppto_agencia d "
                                . "where d.IdUnidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.iditem = ".$t->Id);
                        foreach($ItemsUnidades as $p){
                            if( $p->FechaPago == null ){
                                $p->FechaDePago = 'Pendiente';
                            }else{
                                $p->FechaDePago = (new Controller)->NombreDia($p->FechaPago)." ".$p->DiaPago." de ".(new Controller)->NombreMeses($p->Mes)." de ".$p->Year_Pago;
                            }
                            
                            
                        }
                        $u->Items = $ItemsUnidades;
                    }
                    $e->Unidades = $sqlUnidades;
                }
                $t->Detalle = $sqlEmpresas;
            }
            $d->Items = $Items;
        }
        $TotalGruposFijos = DB::SELECT("SELECT Id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and Tipo = 'FIJO' order by orden asc");
        foreach($TotalGruposFijos as $T){

            $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa, e.NombreComercial "
                . "FROM par_usuarioempresa p "
                . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
                . "inner join usuario u on u.IdUsuario = p.IdUsuario "
                . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
            foreach($sqlEmpresas as $e){
                $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
                foreach($sqlUnidades as $u){
                    $TotalFijoUnidad = DB::SELECT("SELECT un.IdUnidad, un.nombre,g.Id, SUM(i.Pptado_Mes) as Pptado_Mes , SUM(d.valorpagado) as ValorPagado, sum(d.valor) as ValorEstimado "
                            . "FROM unidad_negocio un "
                            . "LEFT join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "LEFT join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "LEFT join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "LEFT join detalle_ppto_agencia d on un.idunidad = d.idunidad "
                            . "LEFT join item_ppto_agencia i on d.iditem = i.id "
                            . "LEFT join grupo_ppto_agencia g on i.idgrupo = g.id "
                            . "where e.estado = 1 and un.estado = 1 and  un.idunidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and u.Token = '".session('keyUser')."' and g.id =  ".$T->Id." and un.idempresa = ".$e->IdEmpresa." "
                            . "Group by un.IdUnidad,un.nombre,g.id order by un.IdEmpresa,un.IdUnidad");
                    if( count($TotalFijoUnidad) == 0 ){
                        $u->Pptado_Mes = 0;
                        $u->ValorPagado = 0;
                        $u->ValorEstimado = 0;
                        $u->PorcentajeBase = 0;
                    }else{
                        foreach($TotalFijoUnidad as $xo){
                            $u->Pptado_Mes = $xo->Pptado_Mes;
                            $u->ValorPagado = $xo->ValorPagado;
                            $u->ValorEstimado = $xo->ValorEstimado;
                            $u->PorcentajeBase = 100;
                        }
                    }

                }

                $e->Unidades = $sqlUnidades;
            }
            $T->Empresas = $sqlEmpresas;


        }

        $GranTotalFijos = DB::SELECT("SELECT DISTINCT "
            . "e.IdEmpresa, e.NombreComercial "
            . "FROM par_usuarioempresa p "
            . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
            . "inner join usuario u on u.IdUsuario = p.IdUsuario "
            . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
        foreach($GranTotalFijos as $e){
            $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                        . "FROM unidad_negocio un "
                        . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                        . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                        . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                        . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
            foreach($sqlUnidades as $u){
                $TotalFijoUnidad = DB::SELECT("SELECT d.idunidad,SUM(i.Pptado_Mes) as Pptado_Mes , SUM(d.valorpagado) as ValorPagado, sum(d.valor) as ValorEstimado "
                        . "FROM detalle_ppto_agencia d "
                        . "INNER join item_ppto_agencia i on d.iditem = i.id "
                        . "INNER join grupo_ppto_agencia g on i.idgrupo = g.id and d.mes = ".$Credentials['MesesPptoGeneral']." and g.idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and g.Tipo = 'FIJO' "
                        . "where d.idunidad = ".$u->IdUnidad." and d.idempresa = ".$e->IdEmpresa." "
                        . "Group by d.idunidad order by d.IdUnidad");
                if( count($TotalFijoUnidad) == 0 ){
                    $u->Pptado_Mes = 0;
                    $u->ValorPagado = 0;
                    $u->ValorEstimado = 0;
                    $u->PorcentajeBase = 0;
                }else{
                    foreach($TotalFijoUnidad as $xo){
                        $u->Pptado_Mes = $xo->Pptado_Mes;
                        $u->ValorPagado = $xo->ValorPagado;
                        $u->ValorEstimado = $xo->ValorEstimado;
                        $u->PorcentajeBase = 100;
                    }
                }
            }

            $e->Unidades = $sqlUnidades;
        }

        //VARIABLES
        $sqlInformacionVariables = DB::SELECT("SELECT Id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and Tipo = 'VARIABLE'");

        foreach($sqlInformacionVariables as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $Items = DB::SELECT("SELECT i.*, p.nombre as Periodicidad "
                    . "from item_ppto_agencia i "
                    . "INNER JOIN par_periodicidad_ppto_agencia p on i.IdPeriodicidad = p.id "
                    . "where idgrupo = ".$d->Id." order by i.orden");

            foreach($Items as $t){
                if( $t->Contacto == null ){
                    $t->Contacto = '';
                }
                if( $t->Telefono == null ){
                    $t->Telefono = '';
                }
                $t->Hash = (new Controller)->CodeEncrypt($t->Id);
                $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa, e.NombreComercial "
                . "FROM par_usuarioempresa p "
                . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
                . "inner join usuario u on u.IdUsuario = p.IdUsuario "
                . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
                foreach($sqlEmpresas as $e){
                    $e->Hash = (new Controller)->CodeEncrypt($e->IdEmpresa);
                    $e->NombreComercial = strtoupper($e->NombreComercial);
                    $sqlUnidades = DB::SELECT("SELECT DISTINCT un.IdUnidad, un.nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");


                    foreach($sqlUnidades as $u){
                        $u->Hash = (new Controller)->CodeEncrypt($u->IdUnidad);
                        $ItemsUnidades = DB::SELECT("SELECT "
                                
                                . "d.*, format((d.valorpagado/d.valor)*100,0) as PorcentajePagado , (d.valor-d.valorpagado) as Dif, format(100-((d.valorpagado/d.valor)*100),0) as PorDif,"
                                . "day(d.FechaPago) as DiaPago, month(d.FechaPago) as Mes, year(d.FechaPago) as Year_Pago "
                                . "FROM detalle_ppto_agencia d "
                                . "where d.IdUnidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.iditem = ".$t->Id);
                        foreach($ItemsUnidades as $p){
                            if( $p->FechaPago == null ){
                                $p->FechaDePago = 'Pendiente';
                            }else{
                                $p->FechaDePago = (new Controller)->NombreDia($p->FechaPago)." ".$p->DiaPago." de ".(new Controller)->NombreMeses($p->Mes)." de ".$p->Year_Pago;
                            }
                            
                            
                        }
                        $u->Items = $ItemsUnidades;
                    }
                    $e->Unidades = $sqlUnidades;
                }
                $t->Detalle = $sqlEmpresas;
            }
            $d->Items = $Items;
        }
        $TotalGruposVariables = DB::SELECT("SELECT Id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and Tipo = 'VARIABLE' order by orden asc");
        foreach($TotalGruposVariables as $T){

            $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa, e.NombreComercial "
                . "FROM par_usuarioempresa p "
                . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
                . "inner join usuario u on u.IdUsuario = p.IdUsuario "
                . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
            foreach($sqlEmpresas as $e){
                $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
                foreach($sqlUnidades as $u){
                    $TotalFijoUnidad = DB::SELECT("SELECT un.IdUnidad, un.nombre,g.Id, SUM(i.Pptado_Mes) as Pptado_Mes , SUM(d.valorpagado) as ValorPagado, sum(d.valor) as ValorEstimado "
                            . "FROM unidad_negocio un "
                            . "LEFT join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "LEFT join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "LEFT join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "LEFT join detalle_ppto_agencia d on un.idunidad = d.idunidad "
                            . "LEFT join item_ppto_agencia i on d.iditem = i.id "
                            . "LEFT join grupo_ppto_agencia g on i.idgrupo = g.id "
                            . "where e.estado = 1 and un.estado = 1 and  un.idunidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and u.Token = '".session('keyUser')."' and g.id =  ".$T->Id." and un.idempresa = ".$e->IdEmpresa." "
                            . "Group by un.IdUnidad,un.nombre,g.id order by un.IdEmpresa,un.IdUnidad");
                    if( count($TotalFijoUnidad) == 0 ){
                        $u->Pptado_Mes = 0;
                        $u->ValorPagado = 0;
                        $u->ValorEstimado = 0;
                        $u->PorcentajeBase = 0;
                    }else{
                        foreach($TotalFijoUnidad as $xo){
                            $u->Pptado_Mes = $xo->Pptado_Mes;
                            $u->ValorPagado = $xo->ValorPagado;
                            $u->ValorEstimado = $xo->ValorEstimado;
                            $u->PorcentajeBase = 100;
                        }
                    }

                }

                $e->Unidades = $sqlUnidades;
            }
            $T->Empresas = $sqlEmpresas;


        }

        $GranTotalVariable = DB::SELECT("SELECT DISTINCT "
            . "e.IdEmpresa, e.NombreComercial "
            . "FROM par_usuarioempresa p "
            . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
            . "inner join usuario u on u.IdUsuario = p.IdUsuario "
            . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
        foreach($GranTotalVariable as $e){
            $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                        . "FROM unidad_negocio un "
                        . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                        . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                        . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                        . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
            foreach($sqlUnidades as $u){
                $TotalFijoUnidad = DB::SELECT("SELECT d.idunidad,SUM(i.Pptado_Mes) as Pptado_Mes , SUM(d.valorpagado) as ValorPagado, sum(d.valor) as ValorEstimado "
                        . "FROM detalle_ppto_agencia d "
                        . "INNER join item_ppto_agencia i on d.iditem = i.id "
                        . "INNER join grupo_ppto_agencia g on i.idgrupo = g.id and g.idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." and g.Tipo = 'VARIABLE' "
                        . "where d.idunidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.idempresa = ".$e->IdEmpresa." "
                        . "Group by d.idunidad order by d.IdUnidad");
                if( count($TotalFijoUnidad) == 0 ){
                    $u->Pptado_Mes = 0;
                    $u->ValorPagado = 0;
                    $u->ValorEstimado = 0;
                    $u->PorcentajeBase = 0;
                }else{
                    foreach($TotalFijoUnidad as $xo){
                        $u->Pptado_Mes = $xo->Pptado_Mes;
                        $u->ValorPagado = $xo->ValorPagado;
                        $u->ValorEstimado = $xo->ValorEstimado;
                        $u->PorcentajeBase = 100;
                    }
                }
            }

            $e->Unidades = $sqlUnidades;
        }

        $GranTotal = DB::SELECT("SELECT DISTINCT "
            . "e.IdEmpresa, e.NombreComercial "
            . "FROM par_usuarioempresa p "
            . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
            . "inner join usuario u on u.IdUsuario = p.IdUsuario "
            . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
        foreach($GranTotal as $e){
            $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                        . "FROM unidad_negocio un "
                        . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                        . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                        . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                        . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
            foreach($sqlUnidades as $u){
                $TotalFijoUnidad = DB::SELECT("SELECT d.idunidad,SUM(i.Pptado_Mes) as Pptado_Mes , SUM(d.valorpagado) as ValorPagado, sum(d.valor) as ValorEstimado "
                        . "FROM detalle_ppto_agencia d "
                        . "INNER join item_ppto_agencia i on d.iditem = i.id "
                        . "INNER join grupo_ppto_agencia g on i.idgrupo = g.id and g.idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." "
                        . "where d.idunidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.idempresa = ".$e->IdEmpresa." "
                        . "Group by d.idunidad order by d.IdUnidad");
                if( count($TotalFijoUnidad) == 0 ){
                    $u->Pptado_Mes = 0;
                    $u->ValorPagado = 0;
                    $u->ValorEstimado = 0;
                    $u->PorcentajeBase = 0;
                }else{
                    foreach($TotalFijoUnidad as $xo){
                        $u->Pptado_Mes = $xo->Pptado_Mes;
                        $u->ValorPagado = $xo->ValorPagado;
                        $u->ValorEstimado = $xo->ValorEstimado;
                        $u->PorcentajeBase = 100;
                    }
                }
            }

            $e->Unidades = $sqlUnidades;
        }
        //-----
        $sqlEmpleados = DB::SELECT("SELECT 0 as Id, 'Nómina' as nombre");
        foreach($sqlEmpleados as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
            $Empleadosx = DB::SELECT("SELECT DISTINCT "
                        . "e.IdEmpleado as Id, e.Celular, e.Foto, 0 as Pptado_Mes, 0 as ValorPagado, 0 as ValorEstimado, e.FechaIngreso,tpxs.Nombre as ModalidadSalario, "
                        . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) as NombreCompleto,e.Celular as Telefono, c.Nombre as Cargo, aa.Nombre as Area "
                        . "FROM Empleado e "
                        . "INNER JOIN detalle_ppto_agencia_nomina dd on e.IdEmpleado = dd.IdEmpleado AND dd.mes = ".$Credentials['MesesPptoGeneral']." AND dd.IdPpto = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." "
                        . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                        . "INNER JOIN Area aa on c.IdArea = aa.IdArea "
                        . "INNER JOIN tipo_salario tpxs on tpxs.Id = e.IdModalidadContrato "
                        . "INNER JOIN unidad_negocio un on aa.IdUnidad = un.IdUnidad "
                        . "");

            foreach($Empleadosx as $t){
                $sqlSalario = DB::SELECT("SELECT Prestacional,NoPrestacional,Bono,Otros FROM empleado_salario "
                        . "where idempleado = ".$t->Id." AND IdSalario = (SELECT MAX(IdSalario) from empleado_salario where idempleado = ".$t->Id.")");
                $PptadoEmpleado = 0;
                if( count($sqlSalario) > 0 ){
                    foreach ($sqlSalario as $trrr){
                        $PptadoEmpleado = (new Controller)->CalcularCostoEmpleadoMes('NORMAL',$trrr->Prestacional,$trrr->NoPrestacional,$trrr->Otros,$trrr->Bono,$t->FechaIngreso,date("Y"),$t->ModalidadSalario); 
                    }
                   
                }else{
                    $PptadoEmpleado = 0;
                }
                $t->PptadoEmpleado = $PptadoEmpleado;
                
                $t->Hash = (new Controller)->CodeEncrypt($t->Id);
                $sqlEmpresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa, e.NombreComercial "
                . "FROM par_usuarioempresa p "
                . "inner join empresa e on e.IdEmpresa = p.IdEmpresa AND e.IdEmpresa = ".(new Controller)->CodeDescrypt($Credentials['Emp'])." "
                . "inner join usuario u on u.IdUsuario = p.IdUsuario "
                . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
                foreach($sqlEmpresas as $e){
                    $e->Hash = (new Controller)->CodeEncrypt($e->IdEmpresa);
                    $e->NombreComercial = strtoupper($e->NombreComercial);
                    $sqlUnidades = DB::SELECT("SELECT DISTINCT un.IdUnidad, un.nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");

                    foreach($sqlUnidades as $u){
                        $u->Hash = (new Controller)->CodeEncrypt($u->IdUnidad);
                        $ItemsUnidades = DB::SELECT("SELECT "
                                . "d.*, format((d.valorpagado/d.valor)*100,0) as PorcentajePagado , (d.valor-d.valorpagado) as Dif, format(100-((d.valorpagado/d.valor)*100),0) as PorDif,"
                                . "day(d.FechaPago) as DiaPago, month(d.FechaPago) as Mes, year(d.FechaPago) as Year_Pago "
                                . "FROM detalle_ppto_agencia_nomina d "
                                . "where d.IdUnidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.idEmpleado = ".$t->Id);
                        $u->SQL = "SELECT "
                                . "d.*, format((d.valorpagado/d.valor)*100,0) as PorcentajePagado , (d.valor-d.valorpagado) as Dif, format(100-((d.valorpagado/d.valor)*100),0) as PorDif,"
                                . "day(d.FechaPago) as DiaPago, month(d.FechaPago) as Mes, year(d.FechaPago) as Year_Pago "
                                . "FROM detalle_ppto_agencia_nomina d "
                                . "where d.IdUnidad = ".$u->IdUnidad." and d.mes = ".$Credentials['MesesPptoGeneral']." and d.idEmpleado = ".$t->Id;
                        foreach($ItemsUnidades as $p){
                            if( $p->FechaPago == null ){
                                $p->FechaDePago = 'Pendiente';
                            }else{
                                $p->FechaDePago = (new Controller)->NombreDia($p->FechaPago)." ".$p->DiaPago." de ".(new Controller)->NombreMeses($p->Mes)." de ".$p->Year_Pago;
                            }
                            
                        }
                        $u->Items = $ItemsUnidades;
                    }
                    $e->Unidades = $sqlUnidades;
                }
                $t->Detalle = $sqlEmpresas;
            }
            $d->Items = $Empleadosx;
        }
        
        
        /*
        $Empleados = DB::SELECT("SELECT DISTINCT "
            . "e.IdEmpresa, e.NombreComercial "
            . "FROM par_usuarioempresa p "
            . "inner join empresa e on e.IdEmpresa = p.IdEmpresa "
            . "inner join usuario u on u.IdUsuario = p.IdUsuario "
            . "where e.estado = 1 and u.Token = '".session('keyUser')."' order by e.IdEmpresa");
        foreach($Empleados as $e){
            $sqlUnidades = DB::SELECT("SELECT un.IdUnidad, un.nombre "
                        . "FROM unidad_negocio un "
                        . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                        . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                        . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                        . "where e.estado = 1 and un.estado = 1 and u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$e->IdEmpresa." order by un.IdUnidad");
            foreach($sqlUnidades as $u){
                $Empleadosx = DB::SELECT("SELECT "
                        . "e.IdEmpleado, e.Celular, e.Foto, 0 as Pptado_Mes, 0 as ValorPagado, 0 as ValorEstimado, "
                        . "CONCAT(e.Nombre1,' ',e.Nombre2,' ',e.Apellido1,' ',e.Apellido2) as NombreCompleto "
                        . "FROM Empleado e "
                        . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                        . "INNER JOIN Area aa on c.IdArea = aa.IdArea "
                        . "INNER JOIN unidad_negocio un on aa.IdUnidad = un.IdUnidad and un.IdUnidad = ".$u->IdUnidad." "
                        . "WHERE e.estado = e.estado ");
                
                if( count($Empleadosx) == 0 ){
                    $u->Pptado_Mes = 0;
                    $u->ValorPagado = 0;
                    $u->ValorEstimado = 0;
                    $u->PorcentajeBase = 0;
                }else{
                    foreach($Empleadosx as $xo){
                        $u->Pptado_Mes = $xo->Pptado_Mes;
                        $u->ValorPagado = $xo->ValorPagado;
                        $u->ValorEstimado = $xo->ValorEstimado;
                        $u->PorcentajeBase = 100;
                    }
                }
                $u->Empleados = $Empleadosx;
            }

            $e->Unidades = $sqlUnidades;
        }*/

        $INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM')");

        $INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO')");

        return response()->json([
            'Fijos'=>$sqlInformacionFijos,
            'Variables'=>$sqlInformacionVariables,
            'Empresas'=>$sqlEmpresas,
            'TotalFijoUnidad'=>$TotalGruposFijos,
            'TotalVariableUnidad'=>$TotalGruposVariables,
            'GranTotalFijos'=>$GranTotalFijos,
            'GranTotalVariable'=>$GranTotalVariable,
            'GranTotal'=>$GranTotal,
            'Empleado'=>$sqlEmpleados,
            'INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM'=>$INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM,
            'INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO'=>$INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO,
            'Mes'=>strtoupper((new Controller)->NombreMeses($Credentials['MesesPptoGeneral']))
        ]);
    }

    public function InformacionPptoPersonal_Meses(){

        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
            'MesesPptoGeneral'=>'required|int',
            'Emp'=>'required|int'
        ]);

        $Ingresos = DB::SELECT("SELECT * FROM ppto_personal_ingresos WHERE IdPptoPersonal = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by Id");
        $Dolar = DB::SELECT("SELECT * FROM valores_fijos WHERE concepto = 'DOLAR'");
        
        $Grupos = DB::SELECT("SELECT * FROM ppto_personal_grupos WHERE IdPptoPersonal = ".(new Controller)->CodeDescrypt($Credentials['Hash']));

        foreach( $Grupos as $g ){
            $Items = DB::SELECT("SELECT Nombre, ValorMensual, Id  FROM ppto_personal_items WHERE IdGrupo = ".$g->Id);

            foreach( $Items as $tt ){
                $Ingresosx = DB::SELECT("SELECT Id FROM ppto_personal_ingresos WHERE IdPptoPersonal = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by Id");
                foreach( $Ingresosx as $ing ){
                    $ppto_personal_item_mensual = DB::SELECT(" SELECT Id,ValorPagado FROM ppto_personal_item_mensual
                    WHERE Mes = ".$Credentials['MesesPptoGeneral']." AND IdIngreso = ".$ing->Id." AND IdItem = ".$tt->Id." ");
                    $ing->Movimiento = $ppto_personal_item_mensual;
                }
                $tt->Ingresos = $Ingresosx;                
            }

            $g->Items = $Items;
        }
        return response()->json([
            /*'Fijos'=>$sqlInformacionFijos,
            'Variables'=>$sqlInformacionVariables,
            'Empresas'=>$sqlEmpresas,
            'TotalFijoUnidad'=>$TotalGruposFijos,
            'TotalVariableUnidad'=>$TotalGruposVariables,
            'GranTotalFijos'=>$GranTotalFijos,
            'GranTotalVariable'=>$GranTotalVariable,*/
            'Ingresos'=>$Ingresos,
            'Dolar'=>$Dolar,
            'Grupos' => $Grupos,
            //'INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM'=>$INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM,
            //'INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO'=>$INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO,
            'Mes'=>strtoupper((new Controller)->NombreMeses($Credentials['MesesPptoGeneral']))
        ]);
    }
    
    public function DatosEmpleadoPptoGeneral(Request $request){
        $sql = DB::SELECT("SELECT * FROM detalle_ppto_agencia_nomina WHERE IdEmpleado =".(new Controller)->CodeDescrypt($request->input('HashEmpleado'))." and IdUnidad = ".(new Controller)->CodeDescrypt($request->input('HasUnd')));
        return response()->json([
            'Info'=>$sql,
        ]);
    }
    
    public function UpdateDatosPptoGeneralEmpleado(Request $request){
        $sql = DB::UPDATE("UPDATE detalle_ppto_agencia_nomina SET "
                . "Porcentaje = ".$request->input('porcentajeEmp').", "
                . "valorpagado = ".$request->input('pptadomensual_real')." "
                . "WHERE IdEmpleado =".(new Controller)->CodeDescrypt($request->input('HashEmpleado'))." and IdUnidad = ".(new Controller)->CodeDescrypt($request->input('HasUnd')));
    }
    //f773ebc56040ee627e91e6dee2aec0b9
    public function GuardarEmpleadoPptoGeneral(Request $request){
        //detalle_ppto_agencia_nomina
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $Empleados = \GuzzleHttp\json_decode($request->input('Empleados'));
            if( count($Empleados) > 0 ){
                for($i = 0; $i < count($Empleados);$i++){
                    $Empleados[$i] = (array) $Empleados[$i];
                    $Unidades = DB::SELECT("SELECT IdUnidad,IdEmpresa FROM unidad_negocio");
                    foreach($Unidades as $u){
                        $Query = 'INSERT INTO detalle_ppto_agencia_nomina (IdEmpleado,IdPpto,IdUsuario,FechaHora,mes,IdEmpresa,IdUnidad) '
                            . 'values (?, ?, ?, ?, ?,?,?)';
                        $Data = [
                            (new Controller)->CodeDescrypt($Empleados[$i]['IdU']),
                            (new Controller)->CodeDescrypt($request->input('Hash')),
                            $sqlUser[0]->IdUsuario,
                            date("Y-m-d H:i:s"),
                            $request->input('Mes'),
                            $u->IdEmpresa,
                            $u->IdUnidad

                        ];
                        DB::INSERT($Query,$Data);
                        array_push($id, DB::getPdo()->lastInsertId());
                    }
                    
                }
            }
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADDITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    public function ConsultarItemPptoGeneral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
            'Hash2' => 'required|string',
        ]);
        $sql2 = DB::SELECT("SELECT id, nombre from par_periodicidad_ppto_agencia "
                . " where estado = 1");
        foreach($sql2 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        $sql = DB::SELECT("SELECT i.Id,"
                . "i.Nombre, i.Entidad,i.IdGrupo, "
                . "CASE WHEN ISNULL(i.Contacto) then '' else i.Contacto END as Contacto,"
                . "CASE WHEN ISNULL(i.Telefono) then '' else i.Contacto END as Telefono,"
                . "i.NumObligacion,i.Pptado_Mes, g.nombre as Grupo, g.Id as idGrupo,i.IdPeriodicidad "
                . "from item_ppto_agencia i "
                . "INNER JOIN grupo_ppto_agencia g on i.IdGrupo = g.id "
                . "where i.id = ".($Credentials['Hash']));
        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Id);
        }
        $sql3 = DB::SELECT("SELECT case when tipo = 'FIJO' then 'Fijo' when tipo = 'VARIABLE' then 'Variable' else 'Nómina' end as Tipo,"
                . " id, nombre from grupo_ppto_agencia where idppto = ".(new Controller)->CodeDescrypt($Credentials['Hash2'])." order by Tipo asc");
        foreach($sql3 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            'Info'=>$sql,
            'Info2'=>$sql2,
            'Info3'=>$sql3,
        ]);
    }

    public function EditarItemPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'UPDATE item_ppto_agencia SET nombre = ?, entidad = ? , '
                    . 'contacto = ? , telefono = ? , numobligacion = ? ,pptado_mes = ? ,idgrupo = ? , '
                    . 'idperiodicidad = ? , '
                    . 'idusuario = ? , '
                    . 'fechahora = ?, '
                    . 'orden = ? '
                    . 'Where Id = ? ';
            $Data = [
                $request->input('nombreitem'),
                $request->input('entidad'),
                $request->input('contacto'),
                $request->input('telefono'),
                $request->input('obligacion'),
                $request->input('pptadomensual'),
                (new Controller)->CodeDescrypt($request->input('IdGrupo')),
                (new Controller)->CodeDescrypt($request->input('IdPeriodicidad')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                0,
                (new Controller)->CodeDescrypt($request->input('HashItem'))

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ConsultarInformacionGrupoPptoGeneral(){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|string',
        ]);
        $sql3 = DB::SELECT("SELECT case when tipo = 'FIJO' then 'Fijo' when tipo = 'VARIABLE' then 'Variable' else 'Nómina' end as Tipo,"
                . " id, nombre from grupo_ppto_agencia where id = ".(new Controller)->CodeDescrypt($Credentials['Hash']));
        foreach($sql3 as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            'Info'=>$sql3,
        ]);
    }

    public function GuardarEditarGrupoPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'UPDATE grupo_ppto_agencia set nombre = ?, fecha = ?, idusuario = ?, fechahora = ?, Tipo = ? '
                    . 'Where Id = ? ';
            $Data = [
                $request->input('nombregrupo'),
                date("Y-m-d"),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $request->input('tipocosto'),
                (new Controller)->CodeDescrypt($request->input('HashGrupo')),

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function InformacionItemUnidadMes(Request $request){

        $Unidad = DB::SELECT("SELECT nombre from unidad_negocio where IdUnidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad')));
        $Item = DB::SELECT("SELECT nombre,pptado_mes from item_ppto_agencia where Id = ".(new Controller)->CodeDescrypt($request->input('HashItem')));

        $sql = DB::SELECT("SELECT * "
                . "from detalle_ppto_agencia "
                . "where idunidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad'))." "
                . "and iditem = ".(new Controller)->CodeDescrypt($request->input('HashItem')). " and "
                . "mes = ".$request->input('MesActivo'));
        if( count( $sql ) == 0 ){
            $sql2 = DB::SELECT("SELECT 1 AS UNIDAD");
            foreach($sql2 as $d){
                $d->NombreMes = (new Controller)->NombreMeses($request->input('MesActivo'));
                $d->NombreUnidad = $Unidad[0]->nombre;
                $d->NombreItem = $Item[0]->nombre;
                $d->Pptado_Mes = $Item[0]->pptado_mes;
                $d->Hash = 0;
                $d->Porcentaje = 0;
                $d->ValorPorcentaje = 0;
                $d->ValorPagado = 0;
                $d->FechaPago = '';
            }
            return response()->json([
                'Info'=>$sql2
            ]);
        }else{
            foreach($sql as $d){
                $d->NombreMes = (new Controller)->NombreMeses($request->input('MesActivo'));
                $d->NombreUnidad = $Unidad[0]->nombre;
                $d->NombreItem = $Item[0]->nombre;
                $d->Pptado_Mes = $Item[0]->pptado_mes;
                $d->Hash = (new Controller)->CodeEncrypt($d->Id);
                $d->Porcentaje = $d->Porcentaje;
                $d->ValorPorcentaje = $d->Valor;
                $d->ValorPagado = $d->valorpagado;
                $d->FechaPago = $d->FechaPago;
            }
            return response()->json([
                'Info'=>$sql,
                'SQL'=>"SELECT * "
                . "from detalle_ppto_agencia "
                . "where idunidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad'))." "
                . "and iditem = ".(new Controller)->CodeDescrypt($request->input('HashItem')). " and "
                . "mes = ".$request->input('MesActivo')
            ]);
        }
    }
    
    public function InformacionItemUnidadMesNom(Request $request){

        $Unidad = DB::SELECT("SELECT nombre from unidad_negocio where IdUnidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad')));
        $Item = DB::SELECT("SELECT nombre,pptado_mes from item_ppto_agencia where Id = ".(new Controller)->CodeDescrypt($request->input('HashItem')));

        $sql = DB::SELECT("SELECT * "
                . "from detalle_ppto_agencia "
                . "where idunidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad'))." "
                . "and iditem = ".(new Controller)->CodeDescrypt($request->input('HashItem')). " and "
                . "mes = ".$request->input('MesActivo'));
        if( count( $sql ) == 0 ){
            $sql2 = DB::SELECT("SELECT 1 AS UNIDAD");
            foreach($sql2 as $d){
                $d->NombreMes = (new Controller)->NombreMeses($request->input('MesActivo'));
                $d->NombreUnidad = $Unidad[0]->nombre;
                $d->NombreItem = $Item[0]->nombre;
                $d->Pptado_Mes = $Item[0]->pptado_mes;
                $d->Hash = 0;
                $d->Porcentaje = 0;
                $d->ValorPorcentaje = 0;
                $d->ValorPagado = 0;
                $d->FechaPago = '';
            }
            return response()->json([
                'Info'=>$sql2
            ]);
        }else{
            foreach($sql as $d){
                $d->NombreMes = (new Controller)->NombreMeses($request->input('MesActivo'));
                $d->NombreUnidad = $Unidad[0]->nombre;
                $d->NombreItem = $Item[0]->nombre;
                $d->Pptado_Mes = $Item[0]->pptado_mes;
                $d->Hash = (new Controller)->CodeEncrypt($d->Id);
                $d->Porcentaje = $d->Porcentaje;
                $d->ValorPorcentaje = $d->Valor;
                $d->ValorPagado = $d->valorpagado;
                $d->FechaPago = $d->FechaPago;
            }
            return response()->json([
                'Info'=>$sql,
                'SQL'=>"SELECT * "
                . "from detalle_ppto_agencia "
                . "where idunidad = ".(new Controller)->CodeDescrypt($request->input('HashUnidad'))." "
                . "and iditem = ".(new Controller)->CodeDescrypt($request->input('HashItem')). " and "
                . "mes = ".$request->input('MesActivo')
            ]);
        }
    }

    public function ItemPptoGeneral_UnidadMes(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Empresa = DB::SELECT("SELECT IdEmpresa from Unidad_negocio where idunidad = '" . (new Controller)->CodeDescrypt($request->input('HashUnidad')) . "'");

            $id = Array();
            $Query = 'DELETE FROM detalle_ppto_agencia where iditem = ? and idunidad = ? and mes = ? ';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('HashItem')),
                (new Controller)->CodeDescrypt($request->input('HashUnidad')),
                $request->input('MesActivo')
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'insert into detalle_ppto_agencia (valor,iditem,idempresa,idunidad,idusuario,fechahora,fechapago,porcentaje,mes,valorpagado) '
                    . 'values(?,?,?,?,?,?,?,?,?,?)';
            if( ($request->input('fechapago')) == '' ){
               $Data = [
                    $request->input('valor_pagar_real'),
                    (new Controller)->CodeDescrypt($request->input('HashItem')),
                    $Empresa[0]->IdEmpresa,
                    (new Controller)->CodeDescrypt($request->input('HashUnidad')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    null,
                    $request->input('porcentaje_real'),
                    $request->input('MesActivo'),
                    0

                ];
            }else{
                $Data = [
                    $request->input('valor_pagar_real'),
                    (new Controller)->CodeDescrypt($request->input('HashItem')),
                    $Empresa[0]->IdEmpresa,
                    (new Controller)->CodeDescrypt($request->input('HashUnidad')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $request->input('fechapago'),
                    $request->input('porcentaje_real'),
                    $request->input('MesActivo'),
                    $request->input('valorpagado_real')

                ];
            }

            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EliminarItemPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Empresa = DB::SELECT("SELECT IdEmpresa from Unidad_negocio where idunidad = '" . (new Controller)->CodeDescrypt($request->input('HashUnidad')) . "'");

            $id = Array();
            $Query = 'DELETE FROM detalle_ppto_agencia where iditem = ?';
            $Data = [
                $request->input('Hash')
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'DELETE FROM item_ppto_agencia where id = ?';
            $Data = [
                $request->input('Hash')
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_EDITARITEM');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EliminarGrupoPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Empresa = DB::SELECT("SELECT IdEmpresa from Unidad_negocio where idunidad = '" . (new Controller)->CodeDescrypt($request->input('HashUnidad')) . "'");

            $id = Array();
            $Query = 'DELETE d FROM detalle_ppto_agencia d '
                    . 'inner join item_ppto_agencia i on d.iditem = i.id '
                    . 'where i.idgrupo = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'DELETE FROM item_ppto_agencia where idgrupo = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'DELETE FROM grupo_ppto_agencia where id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))
            ];
            DB::DELETE($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_EDITARGRUPO');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Datos_ReorganizarGruposPptoGeneral(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'orden' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $temp = explode("|",$Credentials['orden']);
        $tt = "";
        $x = 0;
        for($i = 0; $i < count($temp)-1;$i++,$x++){
            $t = explode("-",$temp[$i]);
                $Query = "UPDATE grupo_ppto_agencia SET orden = ".($x+1)." WHERE id = ".(new Controller)->CodeDescrypt($t[0]);
                DB::INSERT( $Query );
                $id = $t[0];

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            if( ($i+1) < (count($temp)/2) ){

            }

        }
        return response()->json([
            'Info'=>count($temp),
        ]);
    }

    
    public function Datos_ReorganizarGruposPptoPersonal(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'orden' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $temp = explode("|",$Credentials['orden']);
        $tt = "";
        $x = 0;
        for($i = 0; $i < count($temp)-1;$i++,$x++){
            $t = explode("-",$temp[$i]);
                $Query = "UPDATE ppto_personal_grupos SET orden = ".($x+1)." WHERE id = ".(new Controller)->CodeDescrypt($t[0]);
                DB::INSERT( $Query );
                $id = $t[0];

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'INFORMACION_EMPRESA_PPTOGENERAL_ORDENGRUPO','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            if( ($i+1) < (count($temp)/2) ){

            }

        }
        return response()->json([
            'Info'=>count($temp),
        ]);
    }

    public function ListarItesmPptoGeneral(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $sql = DB::SELECT("SELECT id, nombre, orden from item_ppto_agencia where idgrupo = ".(new Controller)->CodeDescrypt($Credentials['Hash'])." order by orden asc");

        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }

        return response()->json([
            'Info'=>$sql,
        ]);
    }

    public function Datos_ReorganizarItemsGruposPptoGeneral(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'orden' => 'required|string'
        ]);

        $IdUsuario = DB::SELECT("SELECT IdUsuario FROM Usuario WHERE Token = '".session('keyUser')."'");

        $temp = explode("|",$Credentials['orden']);
        $tt = "";
        $x = 0;
        for($i = 0; $i < count($temp)-1;$i++,$x++){
            $t = explode("-",$temp[$i]);
                $Query = "UPDATE item_ppto_agencia SET orden = ".($x+1)." WHERE id = ".(new Controller)->CodeDescrypt($t[0]);
                DB::INSERT( $Query );
                $id = $t[0];

                DB::INSERT("INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values ("
                            . "".$id.",'INFORMACION_EMPRESA_PPTOGENERAL_ORDENITEMS','".addslashes($Query)."','UPDATE',".$IdUsuario[0]->IdUsuario.",'".date("Y-m-d H:i:s")."');");

            if( ($i+1) < (count($temp)/2) ){

            }

        }
        return response()->json([
            'Info'=>count($temp),
        ]);
    }

    public function GuardarPptoGeneral(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_general (fecha,year,estado,idusuario,fechahora) values (?, ?, ?, ?, ?)';
            $Data = [
                date("Y-m-d H:i:s"),
                $request->input('yearpptogeneral'),
                1,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADD');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarPptoPersonal(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO ppto_personal_general (anio,idusuario) values (?, ?)';
            $Data = [
                $request->input('yearpptogeneral'),
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADD');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarJuntaDirectiva(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $Query = 'INSERT INTO grupos_junta_directiva (fecha,Grupo,IdUsuario,IdEmpresa) values (?, ?, ?, ?)';
            $Data = [
                date("Y-m-d H:i:s"),
                $request->input('GrupoJuntaDirectiva'),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt( $request->input('Hash'))
               

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADD');
            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function OrganizarGruposJuntaDirectiva(){
        try {
            $Credentials = $this->validate(request(),[
                'orden' => 'required|string'
            ]);
            $temp = explode("|",$Credentials['orden']);
            $tt = "";
            $x = 0;
            for($i = 0; $i < count($temp)-1;$i++,$x++){
                $t = explode("-",$temp[$i]);
                    $Query = "UPDATE grupos_junta_directiva SET orden = ".($x+1)." WHERE Id = ".(new Controller)->CodeDescrypt($t[0]);
                    DB::INSERT( $Query );
                    $id = $t[0];
                if( ($i+1) < (count($temp)/2) ){

                }
            }
            $data = [
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
    
    public function InformacionPersonal(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);

        $INFORMACION_EMPRESA_PERSONAL_CONSULTAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_CONSULTAR')");
        $INFORMACION_EMPRESA_PERSONAL_AGREGAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_AGREGAR')");

        $INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_ELIMINAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_ELIMINAR')");
        $INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_CREAR')");
        $INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS')");


        return response()->json([
            "INFORMACION_EMPRESA_PERSONAL_CONSULTAR"=>$INFORMACION_EMPRESA_PERSONAL_CONSULTAR,
            "INFORMACION_EMPRESA_PERSONAL_AGREGAR"=>$INFORMACION_EMPRESA_PERSONAL_AGREGAR,

            "INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_ELIMINAR"=>$INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_ELIMINAR,
            "INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_CREAR"=>$INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS_CREAR,
            "INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS"=>$INFORMACION_EMPRESA_PERSONAL_DOCUMENTOS
        ]);

    }

    public function ListarInformacionPersonal(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";
        if( $request['search']['Estado'] == 0 || $request['search']['Estado'] == 1 ){
            $sqlAdicional = " and e.estado = ".$request['search']['Estado']." ";
        }else{
            $sqlAdicional = " and e.estado in ( 1,0 ) ";
        }
        $sqlFrom = "FROM "
                . "Empleado e "
                . "INNER JOIN usuario u on e.idusuario = u.idusuario "
                . "INNER JOIN Cargo c on e.IdCargo = c.IdCargo "
                . "INNER JOIN Area ar on c.IdArea = ar.IdArea "
                . "INNER JOIN Unidad_Negocio un on ar.IdUnidad = un.IdUnidad "
                . "INNER JOIN Par_Persona_Tipo_Documento tp on tp.IdTipoDocumento = e.IdTipoDocPersona "
                . "where un.IdEmpresa = $id ".$sqlAdicional;

        $sqlCampos = " e.IdEmpleado, "
                . "e.Nombre1,e.Nombre2,e.Apellido1,e.Apellido2,e.Identificacion,e.FechaNacimiento, e.FechaIngreso, e.CorreoEmpresa,"
                . "e.estado, tp.Nombre as TipoDocumento, c.nombre as Cargo, e.IdCargo, e.foto,date_format(e.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "e.Nombre1 like '%".$searchValue."%' or "
                   . "e.Nombre2 like '%".$searchValue."%' or "
                   . "e.Apellido1 like '%".$searchValue."%' or "
                   . "e.Apellido2 like '%".$searchValue."%' or "
                   . "e.Identificacion like '%".$searchValue."%' or "
                   . "e.FechaNacimiento like '%".$searchValue."%' or "
                   . "e.FechaIngreso like '%".$searchValue."%' or "
                   . "e.CorreoEmpresa like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_PERSONAL_CONSULTAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_CONSULTAR')");
        $INFORMACION_EMPRESA_PERSONAL_ESTADO = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ESTADO')");

        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->FechaIngreso);
            $row->FechaIngreso = parent::NombreDia($row->FechaIngreso).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->IdEmpleado),
                "HashCargo"=>(new Controller)->CodeEncrypt($row->IdCargo),
                "IdEmpleado"=>($row->IdEmpleado),
                "Nombre1"=>$row->Nombre1,
                "foto"=>$row->foto,
                "Nombre2"=>$row->Nombre2,
                "Apellido1"=>$row->Apellido1,
                "Apellido2"=>$row->Apellido2,
                "Cargo"=>$row->Cargo,
                "Identificacion"=>$row->Identificacion,
                "FechaNacimiento"=>$row->FechaNacimiento,
                "CorreoEmpresa"=>$row->CorreoEmpresa,
                "FechaIngreso"=>$row->FechaIngreso,
                "fechahora"=>$row->fechahora,
                "estado"=>$row->estado,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_EMPRESA_PERSONAL_CONSULTAR"=>$INFORMACION_EMPRESA_PERSONAL_CONSULTAR,
                "INFORMACION_EMPRESA_PERSONAL_ESTADO"=>$INFORMACION_EMPRESA_PERSONAL_ESTADO
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "sql"=> $sqlCampos.$sqlFrom.$searchQuery,
            "aaData" => $data
        );

        return json_encode($response);
    }

    public function ListarDatosNuevoPersonal(Request $request){

        $Unidades = DB::SELECT("SELECT un.IdUnidad, un.Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash'))." order by un.IdUnidad"
                );
        foreach($Unidades as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdUnidad);
        }

        $TipoDocumentos = DB::SELECT("SELECT "
                . "IdTipoDocumento , Nombre "
                . "FROM Par_Persona_Tipo_Documento "
                . "WHERE Estado = 1");
        foreach($TipoDocumentos as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdTipoDocumento);
        }

        $Eps = DB::SELECT("SELECT "
                . "IdEps , Nombre "
                . "FROM Par_Eps "
                . "WHERE Estado = 1");
        foreach($Eps as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdEps);
        }

        $Rh = DB::SELECT("SELECT "
                . "IdRh , Nombre "
                . "FROM Par_Tipo_Sangre ");
        foreach($Rh as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdRh);
        }

        $Arl = DB::SELECT("SELECT "
                . "IdArl , Nombre "
                . "FROM Par_ARL "
                . "where estado = 1");
        foreach($Arl as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdArl);
        }

        $Genero = DB::SELECT("SELECT "
                . "IdSexo , Nombre "
                . "FROM Par_Genero ");
        foreach($Genero as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdSexo);
        }

        $FC = DB::SELECT("SELECT "
                . "IdFC , Nombre "
                . "FROM Par_Fondo_Cesantias "
                . "WHERE estado = 1");
        foreach($FC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFC);
        }

        $FP = DB::SELECT("SELECT "
                . "IdFP , Nombre "
                . "FROM Par_Fondo_Pensiones "
                . "WHERE estado = 1");
        foreach($FP as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFP);
        }

        $CC = DB::SELECT("SELECT "
                . "IdCC , Nombre "
                . "FROM Par_Caja_Compensacion "
                . "WHERE estado = 1");
        foreach($CC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdCC);
        }
        $TipoContrato = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Contrato_Personal "
                . "WHERE estado = 1 order by Nombre");
        foreach($TipoContrato as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        $Tipo_Salario = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Salario "
                . "WHERE estado = 1 order by Nombre");
        foreach($Tipo_Salario as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }

        $Paises = DB::SELECT("SELECT IdPais,Hash, Nombre "
            . "FROM Par_Pais "
            //. "WHERE Estado = 1 "
            . "ORDER BY Nombre Asc");
        foreach($Paises as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdPais);
        }
        return response()->json([
            "TipoDocumento"=>$TipoDocumentos,
            "Eps"=>$Eps,
            "Rh"=>$Rh,
            "Arl"=>$Arl,
            "FC"=>$FC ,
            "Genero"=>$Genero,
            "FP"=>$FP,
            "CC"=>$CC,
            "Unidad"=>$Unidades,
            "Paises"=>$Paises,
            "TipoContrato"=>$TipoContrato,
            "Tipo_Salario"=>$Tipo_Salario,
        ]);
    }
    
    public function ListarMotivosRetiroEmpleado(Request $request){

        
        $TipoRetiros = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM par_tipo_retiro "
                . "WHERE Estado = 1 "
                . "Order By Nombre asc");
        foreach($TipoRetiros as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }

        return response()->json([
            "TipoRetiros"=>$TipoRetiros,
        ]);
    }
    
    public function GuardarDatosRetiroEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $Query = 'UPDATE empleado_ingresos SET '
                    . 'FechaRetiro = ?, MotivoRetiro = ? , IdTipoRetiro = ? '
                    . 'WHERE IdEmpleado = ?';
            $Data = [
                $request->input('NFechaRetiro'),
                $request->input('Observaciones'),
                $request->input('MotivoRetiro'),
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            
            $Query = 'UPDATE EMPLEADO SET '
                    . 'Estado = ? '
                    . 'WHERE IdEmpleado = ?';
            $Data = [
                0,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ESTADO');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function GuardarDatosBasicosPersonal(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();

            $segundonombre = ($request->input('segundonombre') == '') ? '': $request->input('segundonombre');
            $segundoapellido = ($request->input('segundoapellido') == '') ? '': $request->input('segundoapellido');
            $correopersonal = ($request->input('correopersonal') == '') ? '': $request->input('correopersonal');
            $tiempocontrato = ($request->input('tiempocontrato') == '') ? '0': $request->input('tiempocontrato');

            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO empleado ('
                    . 'Nombre1,Nombre2,Apellido1,Apellido2,Identificacion,FechaNacimiento,Direccion,CorreoPersonal,Celular,'
                    . 'Telefono_Casa,'
                    . 'IdCargo ,'
                    . 'IdTipoDocPersona ,'
                    . 'IdGenero ,'
                    . 'IdRH ,'
                    . 'IdEps ,'
                    . 'IdArl ,'
                    . 'IdFC ,'
                    . 'IdFP ,'
                    . 'IdCC ,'
                    . 'IdUsuario,'
                    . 'FechaHora,'
                    . 'FechaIngreso,'
                    . 'Estado,'
                    . 'IdTipoContrato,IdModalidadContrato,foto,TiempoContrato,IdPais,IdDepartamento,IdCiudad) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                $request->input('primernombre'),
                $segundonombre,
                $request->input('primerapellido'),
                $segundoapellido,
                $request->input('numerodocumento'),
                $request->input('fechanacimiento'),
                $request->input('Direccion'),
                $correopersonal,
                $request->input('celular'),
                $request->input('telefonocasa'),
                (new Controller)->CodeDescrypt($request->input('cargo')),
                (new Controller)->CodeDescrypt($request->input('TipoDocumento')),
                (new Controller)->CodeDescrypt($request->input('Sexo')),
                (new Controller)->CodeDescrypt($request->input('rh')),
                1,
                1,
                1,
                1,
                1,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $request->input('fechaingreso'),
                1,
                (new Controller)->CodeDescrypt($request->input('TipoContrato')),
                (new Controller)->CodeDescrypt($request->input('Tipo_Salario')),
                $pathLogo,
                $tiempocontrato,
                (new Controller)->CodeDescrypt($request->input('ParGeneralPais')),
                (new Controller)->CodeDescrypt($request->input('ParGeneralDepartamento')),
                (new Controller)->CodeDescrypt($request->input('ParGeneralCiudad'))

            ];
            DB::INSERT($Query,$Data);
            $IdEmpleado = DB::getPdo()->lastInsertId();

            Storage::disk('local')->makeDirectory('datos/Empleados/'.$IdEmpleado.'');
            Storage::disk('local')->makeDirectory('datos/Empleados/'.$IdEmpleado.'/DocumentosLegales');
            $request->file('ParLogo')->storeAs('datos/Empleados/'.$IdEmpleado.'', $pathLogo);

            array_push($id, $IdEmpleado);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PPTOGENERAL_ADD');

            $Query = 'INSERT INTO Empleado_Salario (Prestacional,NoPrestacional,Bono,Otros,Fecha,Motivo,IdEmpleado) values (?,?,?,?,?,?,?)';
            $Data = [
                $request->input('Prestacional'),
                $request->input('NPrestacional'),
                $request->input('Bonos'),
                $request->input('Otros'),
                date("Y-m-d H:i:s"),
                'CONTRATO DE INGRESO EMPLEADO',
                $IdEmpleado

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            $Query = 'INSERT INTO empleado_ingresos (FechaIngreso,IdEmpleado) values (?,?)';
            $Data = [
                $request->input('fechaingreso'),
                $IdEmpleado

            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());


            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Empleado_InformacionBasica(Request $request){
        $sql = DB::SELECT("SELECT "
                . "e.IdEmpleado, "
                . "e.Nombre1, "
                . "e.Nombre2,"
                . "e.Apellido1, "
                . "e.Apellido2,"
                . "e.Identificacion,"
                . "e.FechaNacimiento,"
                . "fc.Nombre as Fondo_Cesantias,"
                . "fp.Nombre as Fondo_Pensiones,"
                . "e.Direccion,"
                . "e.CorreoPersonal,"
                . "e.Celular,"
                . "e.Foto,"
                . "e.Telefono_Casa,"
                . "e.Vacaciones,"
                . "tp.Nombre as TipoDocumento,"
                . "g.Nombre as Sexo,"
                . "rh.Nombre as RH, e.estado, "
                . "eps.Nombre as Eps "
                . "FROM empleado e "
                . "INNER JOIN Par_Tipo_Sangre rh on e.IdRh = rh.IdRh "
                . "INNER JOIN Par_Persona_Tipo_Documento tp on e.IdTipoDocPersona = tp.IdTipoDocumento "
                . "INNER JOIN Par_Genero g on e.IdGenero = g.IdSexo "
                . "INNER JOIN Par_Eps eps on e.IdEps = eps.IdEps "
                . "INNER JOIN Par_Fondo_Cesantias fc on e.IdFC = fc.IdFC "
                . "INNER JOIN Par_Fondo_Pensiones fp on e.IdFP = fp.IdFP "
                . "WHERE e.IdEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash')));

        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->IdEmpleado);
            $d->NombreCompleto = $d->Nombre1." ".$d->Nombre2." ".$d->Apellido1." ".$d->Apellido2;
        }

        return response()->json([
            "InformacionBasica"=>$sql,
        ]);
    }

    public function Editar_Empleado_InformacionBasica(Request $request){
        $sql = DB::SELECT("SELECT "
                . "e.IdEmpleado, "
                . "e.Nombre1, "
                . "e.Nombre2,"
                . "e.Apellido1, "
                . "e.Apellido2,"
                . "fc.Nombre as Fondo_Cesantias,"
                . "fp.Nombre as Fondo_Pensiones, e.IdFC, e.IdFP,"
                . "e.Identificacion,"
                . "e.FechaNacimiento,"
                . "e.Direccion,"
                . "e.CorreoPersonal,"
                . "e.Celular,"
                . "e.Foto,"
                . "e.Telefono_Casa,"
                . "e.Vacaciones,"
                . "tp.Nombre as TipoDocumento,"
                . "g.Nombre as Sexo,"
                . "rh.Nombre as RH,"
                . "e.IdRh,"
                . "e.IdTipoDocPersona,"
                . "e.IdGenero, "
                . "e.IdEps "
                . "FROM empleado e "
                . "INNER JOIN Par_Tipo_Sangre rh on e.IdRh = rh.IdRh "
                . "INNER JOIN Par_Persona_Tipo_Documento tp on e.IdTipoDocPersona = tp.IdTipoDocumento "
                . "INNER JOIN Par_Genero g on e.IdGenero = g.IdSexo "
                . "INNER JOIN Par_Fondo_Cesantias fc on e.IdFC = fc.IdFC "
                . "INNER JOIN Par_Fondo_Pensiones fp on e.IdFP = fp.IdFP "
                . "WHERE e.IdEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash')));

        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->IdEmpleado);
            $d->IdRh = (new Controller)->CodeEncrypt($d->IdRh);
            $d->IdTipoDocPersona = (new Controller)->CodeEncrypt($d->IdTipoDocPersona);
            $d->IdGenero = (new Controller)->CodeEncrypt($d->IdGenero);
            $d->IdFC = (new Controller)->CodeEncrypt($d->IdFC);
            $d->IdFP = (new Controller)->CodeEncrypt($d->IdFP);
            $d->IdEps = (new Controller)->CodeEncrypt($d->IdEps);
            $d->NombreCompleto = $d->Nombre1." ".$d->Nombre2." ".$d->Apellido1." ".$d->Apellido2;
        }

        $TipoDocumentos = DB::SELECT("SELECT "
                . "IdTipoDocumento , Nombre "
                . "FROM Par_Persona_Tipo_Documento "
                . "WHERE Estado = 1");
        foreach($TipoDocumentos as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdTipoDocumento);
        }

        $Eps = DB::SELECT("SELECT "
                . "IdEps , Nombre "
                . "FROM Par_Eps "
                . "WHERE Estado = 1");
        foreach($Eps as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdEps);
        }


        $Rh = DB::SELECT("SELECT "
                . "IdRh , Nombre "
                . "FROM Par_Tipo_Sangre ");
        foreach($Rh as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdRh);
        }

        $Arl = DB::SELECT("SELECT "
                . "IdArl , Nombre "
                . "FROM Par_ARL "
                . "where estado = 1");
        foreach($Arl as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdArl);
        }

        $Genero = DB::SELECT("SELECT "
                . "IdSexo , Nombre "
                . "FROM Par_Genero ");
        foreach($Genero as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdSexo);
        }

        $FC = DB::SELECT("SELECT "
                . "IdFC , Nombre "
                . "FROM Par_Fondo_Cesantias "
                . "WHERE estado = 1");
        foreach($FC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFC);
        }

        $FP = DB::SELECT("SELECT "
                . "IdFP , Nombre "
                . "FROM Par_Fondo_Pensiones "
                . "WHERE estado = 1");
        foreach($FP as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFP);
        }

        $CC = DB::SELECT("SELECT "
                . "IdCC , Nombre "
                . "FROM Par_Caja_Compensacion "
                . "WHERE estado = 1");
        foreach($CC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdCC);
        }
        $TipoContrato = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Contrato_Personal "
                . "WHERE estado = 1 order by Nombre");
        foreach($TipoContrato as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        $Tipo_Salario = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Salario "
                . "WHERE estado = 1 order by Nombre");
        foreach($TipoContrato as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }

        return response()->json([
            "InformacionBasica"=>$sql,
            "TipoDocumento"=>$TipoDocumentos,
            "Eps"=>$Eps,
            "Rh"=>$Rh,
            "Arl"=>$Arl,
            "FC"=>$FC ,
            "Genero"=>$Genero,
            "FP"=>$FP,
            "CC"=>$CC,
            "TipoContrato"=>$TipoContrato,
            "Tipo_Salario"=>$Tipo_Salario,
        ]);
    }

    public function GuardarAsignadoJD(Request $request){
        try {

            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $pathLogo = "";

            if( $request->input('NumFoto') == 1 ){
                $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                $request->file('ParLogo')->storeAs('datos/Empleados/', $pathLogo);

                $Query = 'INSERT INTO usuarios_junta_directiva (Fecha,IdUsuario,IdGrupo,Nombre,Cargo,Correo,Telefono,Foto) '
                        . 'values(?,?,?,?,?,?,?,?)';
                $Data = [
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    (new Controller)->CodeDescrypt($request->input('IdGrupo')),
                    $request->input('traNombre'),
                    $request->input('Cargo'),
                    $request->input('Correo'),
                    $request->input('Celular'),
                    $pathLogo
                ];
            }else{
                
            }


            DB::INSERT($Query,$Data);

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function GuardarDatosBasicosPersonalEditar(Request $request){
        try {

            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $segundonombre = ($request->input('segundonombre') == '') ? '': $request->input('segundonombre');
            $segundoapellido = ($request->input('segundoapellido') == '') ? '': $request->input('segundoapellido');
            $correopersonal = ($request->input('correopersonal') == '') ? '': $request->input('correopersonal');
            $pathLogo = "";

            if( $request->input('NumFoto') == 1 ){
                $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                $request->file('ParLogo')->storeAs('datos/Empleados/'.$IdEmpleado.'', $pathLogo);

                $Query = 'UPDATE empleado SET '
                    . 'Nombre1 = ? ,Nombre2 = ? ,Apellido1 = ? ,Apellido2 = ? ,Identificacion = ? ,FechaNacimiento = ? ,Direccion = ? ,CorreoPersonal = ? '
                    . ', Celular = ? ,'
                    . 'Telefono_Casa = ? ,'
                    . 'IdTipoDocPersona = ?  ,'
                    . 'IdGenero = ? ,'
                    . 'IdRH = ? ,'
                    . 'IdEps = ? ,'
                    . 'IdUsuario = ? ,'
                    . 'FechaHora = ? ,'
                    . 'foto = ?, IdFC = ? , IdFP = ? '
                    . 'WHERE IdEmpleado = ? ';
                $Data = [
                    $request->input('primernombre'),
                    $segundonombre,
                    $request->input('primerapellido'),
                    $segundoapellido,
                    $request->input('numerodocumento'),
                    $request->input('fechanacimiento'),
                    $request->input('Direccion'),
                    $correopersonal,
                    $request->input('celular'),
                    $request->input('telefonocasa'),
                    (new Controller)->CodeDescrypt($request->input('TipoDocumento')),
                    (new Controller)->CodeDescrypt($request->input('Sexo')),
                    (new Controller)->CodeDescrypt($request->input('rh')),
                    (new Controller)->CodeDescrypt($request->input('eps')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $pathLogo,
                    (new Controller)->CodeDescrypt($request->input('fc')),
                    (new Controller)->CodeDescrypt($request->input('fp')),
                    $IdEmpleado

                ];
            }else{
                $Query = 'UPDATE empleado SET '
                    . 'Nombre1 = ? ,Nombre2 = ? ,Apellido1 = ? ,Apellido2 = ? ,Identificacion = ? ,FechaNacimiento = ? ,Direccion = ? ,CorreoPersonal = ? '
                    . ', Celular = ? ,'
                    . 'Telefono_Casa = ? ,'
                    . 'IdTipoDocPersona = ?  ,'
                    . 'IdGenero = ? ,'
                    . 'IdRH = ? ,'
                    . 'IdEps = ? ,'
                    . 'IdUsuario = ? ,'
                    . 'FechaHora = ? '
                    . 'WHERE IdEmpleado = ? ';
                $Data = [
                    $request->input('primernombre'),
                    $segundonombre,
                    $request->input('primerapellido'),
                    $segundoapellido,
                    $request->input('numerodocumento'),
                    $request->input('fechanacimiento'),
                    $request->input('Direccion'),
                    $correopersonal,
                    $request->input('celular'),
                    $request->input('telefonocasa'),
                    (new Controller)->CodeDescrypt($request->input('TipoDocumento')),
                    (new Controller)->CodeDescrypt($request->input('Sexo')),
                    (new Controller)->CodeDescrypt($request->input('rh')),
                    (new Controller)->CodeDescrypt($request->input('eps')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $IdEmpleado

                ];
            }


            DB::UPDATE($Query,$Data);

            array_push($id, $IdEmpleado);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_EDITAR_INFOBASICA');


            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarContactosPersonal(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);


        $sqlFrom = "FROM "
                . "empleado_contactos e "
                . "INNER JOIN usuario u on e.idusuario = u.idusuario "
                . "where e.idempleado = $id ";

        $sqlCampos = " e.id, e.relacion,e.nombre, e.telefono1, e.telefono2,"
                . "date_format(e.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "e.nombre like '%".$searchValue."%' or "
                   . "e.relacion like '%".$searchValue."%' or "
                   . "e.telefono1 like '%".$searchValue."%' or "
                   . "e.telefono2 like '%".$searchValue."%' or "
                   . "e.fechahora like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA')");

        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "nombre"=>($row->nombre),
                "telefono1"=>$row->telefono1,
                "relacion"=>$row->relacion,
                "telefono2"=>$row->telefono2,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA"=>$INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA,
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

    public function GuardarNuevoContactoEmergenciaEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $telefonos = ($request->input('telefonos') == '') ? '': $request->input('telefonos');
            $Query = 'INSERT INTO empleado_contactos ('
                    . 'Nombre,Relacion,Telefono1,Telefono2,FechaHora,IdUsuario,IdEmpleado) values (?,?,?,?,?,?,?)';
            $Data = [
                $request->input('NombreCE'),
                $request->input('Rela'),
                $request->input('telefonop'),
                $telefonos,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::INSERT($Query,$Data);
            $IdEmpleado = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleado);
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ADD_CONTACTOEMERGENCIA');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function InformacionContactoEmergenciaEmpleado(Request $request){
        $sql = DB::SELECT("SELECT "
                . "id, nombre, relacion, telefono1, telefono2 "
                . "from empleado_contactos "
                . "where id = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        foreach($sql as $d){
            $d->id = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            "Info"=>$sql
        ]);
    }

    public function GuardarEditarContactoEmergenciaEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $telefonos = ($request->input('telefonos') == '') ? '': $request->input('telefonos');
            $Query = 'UPDATE empleado_contactos SET '
                    . 'Nombre = ?,Relacion = ?,Telefono1 = ?,Telefono2 = ?,FechaHora = ?, IdUsuario = ? '
                    . ' WHERE Id = ?';
            $Data = [
                $request->input('NombreCE'),
                $request->input('Rela'),
                $request->input('telefonop'),
                $telefonos,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function EliminarAsignadoJD(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM usuarios_junta_directiva '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'delete usuarios_junta_directiva');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function EliminarGrupoJD(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM grupos_junta_directiva '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'delete grupos_junta_directiva');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function EliminarContactoEmergenciaEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $telefonos = ($request->input('telefonos') == '') ? '': $request->input('telefonos');
            $Query = 'DELETE FROM empleado_contactos '
                    . ' WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::UPDATE($Query,$Data);
            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_EDITAR_CONTACTOEMERGENCIA');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function Empleado_InformacionEmpresarial(Request $request){
        $sql = DB::SELECT("SELECT "
                . "e.IdEmpleado, "
                . "e.IdArl, "
                . "arl.Nombre as Arl,"
                . "fc.Nombre as Fondo_Cesantias,"
                . "fp.Nombre as Fondo_Pensiones,"
                . "cc.Nombre as CajaCompensacion,"
                . "c.Nombre as Cargo,"
                . "ar.Nombre as Area,"
                . "e.FechaIngreso,"
                . "e.TiempoContrato,"
                . "e.Vacaciones,"
                . "tp.Nombre as TipoContrato,"
                . "tx.Nombre as TipoSalario,"
                . "un.Nombre as Unidad, e.estado "
                . ""
                . "FROM empleado e "
                . "INNER JOIN Par_ARL arl on e.IdArl = arl.IdArl "
                . "INNER JOIN Par_Fondo_Cesantias fc on e.IdFC = fc.IdFC "
                . "INNER JOIN Par_Fondo_Pensiones fp on e.IdFP = fp.IdFP "
                . "INNER JOIN Par_Caja_Compensacion cc on e.IdCC = cc.IdCC "
                . "INNER JOIN cargo c on e.IdCargo = c.IdCargo "
                . "INNER JOIN Area ar on c.IdArea = ar.IdArea "
                . "INNER JOIN Unidad_negocio un on ar.IdUnidad = un.IdUnidad "
                . "INNER JOIN Tipo_Contrato_Personal tp on e.IdTipoContrato = tp.Id "
                . "INNER JOIN Tipo_Salario tx on e.IdModalidadContrato = tx.Id "
                . "WHERE e.IdEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash')));

        foreach($sql as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->IdEmpleado);
            $sqlSalario = DB::SELECT("SELECT "
                    . "x.prestacional, x.noprestacional, x.bono, x.otros "
                    . "from empleado_salario x "
                    . "where x.idempleado = ".(new Controller)->CodeDescrypt($request->input('Hash')). " and "
                    . "x.fecha = ( select max(c.fecha) from empleado_salario c  where c.idEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash'))." )");
            $d->Salario = $sqlSalario;

            $sqlRetiro = DB::SELECT("SELECT r.nombre as TipoRetiro, e.MotivoRetiro, e.FechaRetiro "
                    . "FROM par_tipo_retiro r "
                    . "inner join empleado_ingresos e on e.IdEmpleado = ".$d->IdEmpleado." and e.IdTipoRetiro = r.id ");
            $d->Retiro = $sqlRetiro;
        }

        return response()->json([
            "Info"=>$sql,
        ]);
    }

    public function Editar_Empleado_InformacionEmpresarial(Request $request){
        $sql = DB::SELECT("SELECT "
                . "e.IdEmpleado, "
                . "e.Nombre1, "
                . "e.Nombre2,"
                . "e.Apellido1, "
                . "e.Apellido2,"
                . "e.IdArl,"
                . "e.IdFC,"
                . "e.IdFP,"
                . "e.IdCC,"
                . "c.IdCargo,"
                . "e.Vacaciones,"
                . "ar.IdArea,"
                . "ar.IdUnidad,"
                . "e.IdTipoContrato,"
                . "e.IdModalidadContrato, "
                . "e.TiempoContrato, e.FechaIngreso, "
                . "e.IdEps ,"
                . "e.estado "
                . "FROM empleado e "
                . "INNER JOIN Par_ARL arl on e.IdArl = arl.IdArl "
                . "INNER JOIN Par_Fondo_Cesantias fc on e.IdFC = fc.IdFC "
                . "INNER JOIN Par_Fondo_Pensiones fp on e.IdFP = fp.IdFP "
                . "INNER JOIN Par_Caja_Compensacion cc on e.IdCC = cc.IdCC "
                . "INNER JOIN cargo c on e.IdCargo = c.IdCargo "
                . "INNER JOIN Area ar on c.IdArea = ar.IdArea "
                . "INNER JOIN Unidad_negocio un on ar.IdUnidad = un.IdUnidad "
                . "INNER JOIN Tipo_Contrato_Personal tp on e.IdTipoContrato = tp.Id "
                . "INNER JOIN Tipo_Salario tx on e.IdModalidadContrato = tx.Id "
                . "WHERE e.IdEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        $IdUnidad = "";
        $IdArea = "";
        foreach($sql as $d){
            $IdUnidad = $d->IdUnidad;
            $IdArea = $d->IdArea;
            $d->IdUnidad = (new Controller)->CodeEncrypt($d->IdUnidad);
            $d->IdArea = (new Controller)->CodeEncrypt($d->IdArea);
            $d->IdCargo = (new Controller)->CodeEncrypt($d->IdCargo);
            $d->Hash = (new Controller)->CodeEncrypt($d->IdEmpleado);
            $d->IdTipoContrato = (new Controller)->CodeEncrypt($d->IdTipoContrato);
            $d->IdModalidadContrato = (new Controller)->CodeEncrypt($d->IdModalidadContrato);
            $d->NombreCompleto = $d->Nombre1." ".$d->Nombre2." ".$d->Apellido1." ".$d->Apellido2;
            $sqlSalario = DB::SELECT("SELECT "
                    . "x.prestacional, x.noprestacional, x.bono, x.otros "
                    . "from empleado_salario x "
                    . "where x.idempleado = ".(new Controller)->CodeDescrypt($request->input('Hash')). " and "
                    . "x.fecha = ( select max(c.fecha) from empleado_salario c  where c.idEmpleado = ".(new Controller)->CodeDescrypt($request->input('Hash'))." )");
            $d->Salario = $sqlSalario;
        }



        $Arl = DB::SELECT("SELECT "
                . "IdArl , Nombre "
                . "FROM Par_ARL "
                . "where estado = 1");
        foreach($Arl as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdArl);
        }


        $FC = DB::SELECT("SELECT "
                . "IdFC , Nombre "
                . "FROM Par_Fondo_Cesantias "
                . "WHERE estado = 1");
        foreach($FC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFC);
        }

        $FP = DB::SELECT("SELECT "
                . "IdFP , Nombre "
                . "FROM Par_Fondo_Pensiones "
                . "WHERE estado = 1");
        foreach($FP as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdFP);
        }

        $CC = DB::SELECT("SELECT "
                . "IdCC , Nombre "
                . "FROM Par_Caja_Compensacion "
                . "WHERE estado = 1");
        foreach($CC as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdCC);
        }
        $TipoContrato = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Contrato_Personal "
                . "WHERE estado = 1 order by Nombre");
        foreach($TipoContrato as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        $Tipo_Salario = DB::SELECT("SELECT "
                . "Id , Nombre "
                . "FROM Tipo_Salario "
                . "WHERE estado = 1 order by Nombre");
        foreach($Tipo_Salario as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->Id);
        }
        $Unidades = DB::SELECT("SELECT un.IdUnidad, un.Nombre "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash2'))." order by un.IdUnidad"
                );
        foreach($Unidades as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->IdUnidad);
        }

        $Areas = DB::SELECT("SELECT idarea as idunidad,nombre,descripcion from area where idunidad = ".$IdUnidad);
        foreach ($Areas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idunidad);
        }

        $Cargos = DB::SELECT("SELECT idcargo as idunidad,nombre from cargo where idarea = ".$IdArea);
        foreach ($Cargos as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->idunidad);
        }
        $TiposRetiro = DB::SELECT("SELECT id,nombre from par_tipo_retiro where estado = 1");
        foreach ($TiposRetiro as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->id);
        }
        return response()->json([
            "Info"=>$sql,
            "Arl"=>$Arl,
            "FC"=>$FC ,
            "Unidad"=>$Unidades ,
            "FP"=>$FP,
            "CC"=>$CC,
            "Cargos"=>$Cargos,
            "Areas"=>$Areas,
            "TipoContrato"=>$TipoContrato,
            "Tipo_Salario"=>$Tipo_Salario,
            "TiposRetiro"=>$TiposRetiro,
        ]);
    }

    public function GuardarDatosEmpresarialesPersonalEditar(Request $request){
        try {

            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $segundonombre = ($request->input('segundonombre') == '') ? '': $request->input('segundonombre');

            $Query = 'UPDATE empleado SET '
                    . 'IdCargo = ? ,FechaIngreso = ? ,IdTipoContrato = ? ,TiempoContrato = ? ,IdModalidadContrato = ? ,IdArl  = ? '
                    . ', IdCC  = ? ,'
                    . 'IdUsuario = ? ,'
                    . 'FechaHora = ?  '
                    . 'WHERE IdEmpleado = ? ';
                $Data = [
                    (new Controller)->CodeDescrypt($request->input('cargo')),
                    $request->input('fechaingreso'),
                    (new Controller)->CodeDescrypt($request->input('TipoContrato')),
                    $request->input('tiempocontrato'),
                    (new Controller)->CodeDescrypt($request->input('Tipo_Salario')),
                    (new Controller)->CodeDescrypt($request->input('Arl')),
                    (new Controller)->CodeDescrypt($request->input('CC')),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $IdEmpleado
                ];


            DB::UPDATE($Query,$Data);

            array_push($id, $IdEmpleado);

            $sqlInformacionSalarial = DB::SELECT("SELECT s.Prestacional,s.NoPrestacional, s.Bono, s.Otros "
                    . "FROM empleado_salario s "
                    . "where s.idempleado = $IdEmpleado and s.IDSALARIO = (SELECT MAX(x.IDSALARIO) "
                    . "FROM empleado_salario x WHERE x.IdEmpleado = $IdEmpleado)");
            foreach($sqlInformacionSalarial as $d){
                if( $d->Prestacional != $request->input('Prestacional') || $d->NoPrestacional != $request->input('NPrestacional')
                        || $d->Bono != $request->input('Bono') || $d->Otros != $request->input('Otros') ){
                            $Query = 'INSERT INTO Empleado_Salario (Prestacional,NoPrestacional,Bono,Otros,Fecha,Motivo,IdEmpleado) values (?,?,?,?,?,?,?)';
                            $Data = [
                                $request->input('Prestacional'),
                                $request->input('NPrestacional'),
                                $request->input('Bonos'),
                                $request->input('Otros'),
                                date("Y-m-d H:i:s"),
                                'MODIFICACIÓN DE SUELDO DEL EMPLEADO POR '.$sqlUser[0]->NombreUsuario,
                                $IdEmpleado

                            ];
                            DB::INSERT($Query,$Data);
                            array_push($id, DB::getPdo()->lastInsertId());
                        }
            }

            if( $request->input('Retiro') == "OK" ){
                $Query = 'UPDATE empleado_ingresos SET '
                    . 'FechaRetiro = ? ,MotivoRetiro = ? ,IdTipoRetiro = ? '
                    . 'WHERE IdEmpleado = ? ';
                $Data = [
                    $request->input('fecharetiro'),
                    $request->input('motivoretiroempleado'),
                    (new Controller)->CodeDescrypt($request->input('TipoRetivo')),
                    $IdEmpleado
                ];
                DB::INSERT($Query,$Data);
                array_push($id, $IdEmpleado);

                $Query = 'UPDATE empleado SET '
                    . 'estado = 0 '
                    . 'WHERE IdEmpleado = ? ';
                $Data = [
                    $IdEmpleado
                ];
                DB::INSERT($Query,$Data);
                array_push($id, $IdEmpleado);
            }
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_EDITAR_INFOBASICA');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function ListarDocumentosLegalesEmpleado(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "empleado_documento_legal e "
                . "INNER JOIN usuario u on e.iduser = u.idusuario "
                . "INNER JOIN Par_Documentos_Legales_Empleado c on e.idDocumento = c.Id "
                . "where e.idempleado = $id ";

        $sqlCampos = " e.id,e.IdEmpleado,e.nombrearchivo, "
                . "c.nombre as TipoDocumento, "
                . "date_format(e.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "c.nombre like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(e.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL')");
        $INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ESTADO')");

        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->fechahora);
            $row->fechahora = parent::NombreDia($row->fechahora).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "IdEmpleado"=>($row->IdEmpleado),
                "nombrearchivo"=>($row->nombrearchivo),
                "TipoDocumento"=>$row->TipoDocumento,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL,
                "INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL
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

    public function ListarTiposDocumentoEmpleado(Request $request){
        $id = (new Controller)->CodeDescrypt($request->input('Hash'));
        $sql = DB::SELECT("SELECT p.id, p.Nombre as TipoDocumento "
                . "from Par_Documentos_Legales_Empleado p "
                . "where id not in (SELECT e.iddocumento from empleado_documento_legal e where e.idempleado = $id)");
        foreach($sql as $tp){
            $tp->Hash = (new Controller)->CodeEncrypt($tp->id);
        }
        return response()->json([
            "TipoDocumento"=>$sql,
        ]);
    }

    public function GuardarDocumentoLegalEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO empleado_documento_legal ('
                    . 'NombreArchivo, Fecha,IdDocumento,IdEmpleado,IdUser) values (?,?,?,?,?)';
            $Data = [
                $pathLogo,
                date("Y-m-d H:i:s"),
                (new Controller)->CodeDescrypt($request->input('TipoDocumento')),
                $IdEmpleado,
                $sqlUser[0]->IdUsuario

            ];
            DB::INSERT($Query,$Data);


            $request->file('ParLogo')->storeAs('datos/Empleados/'.$IdEmpleado.'/DocumentosLegales/', $pathLogo);
            $IdEmpleadoz = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleadoz);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }

    public function EliminarDocumentoLegalEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM empleado_documento_legal WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);


            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL');

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

    public function ListarDocumentosAdicionalesEmpleado(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int'
        ]);
        $draw = $request['draw'];
        $id = (new Controller)->CodeDescrypt($Credentials['Hash']);

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "documentos_adicionales_empleado e "
                . "INNER JOIN usuario u on e.idusuario = u.idusuario "
                . "where e.idempleado = $id ";

        $sqlCampos = " e.id,e.IdEmpleado,e.Archivo as nombrearchivo, "
                . "e.nombredoc as TipoDocumento, "
                . "date_format(e.fechahora,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "e.nombredoc like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(e.fechahora,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        $INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL')");
        $INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('INFORMACION_EMPRESA_PERSONAL_ESTADO')");

        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->id),
                "IdEmpleado"=>($row->IdEmpleado),
                "nombrearchivo"=>($row->nombrearchivo),
                "TipoDocumento"=>$row->TipoDocumento,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario,
                "INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL,
                "INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL"=>$INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL
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

    public function GuardarDocumentoAdicionalEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdEmpleado = (new Controller)->CodeDescrypt($request->input('Hash'));
            $pathLogo = $request->file('ParLogo')->getClientOriginalName();


            $Query = 'INSERT INTO documentos_adicionales_empleado ('
                    . 'nombredoc, archivo,idusuario,fechahora,idempleado) values (?,?,?,?,?)';
            $Data = [
                $request->input('nombredocumento'),
                $pathLogo,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $IdEmpleado,
            ];
            DB::INSERT($Query,$Data);


            $request->file('ParLogo')->storeAs('datos/Empleados/'.$IdEmpleado.'/DocumentosLegales/', $pathLogo);
            $IdEmpleadox = DB::getPdo()->lastInsertId();
            array_push($id, $IdEmpleadox);

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ADD_DOCLEGAL');

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

    public function EliminarDocumentoAdicionalEmpleado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM documentos_adicionales_empleado WHERE Id = ?';
            $Data = [
                (new Controller)->CodeDescrypt($request->input('Hash'))

            ];
            DB::DELETE($Query,$Data);


            array_push($id, (new Controller)->CodeDescrypt($request->input('Hash')));

            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_EMPRESA_PERSONAL_ELIMINAR_DOCLEGAL');

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
    
    public function _ListarRiesgosLaborales(){
        $db = DB::SELECT("SELECT * FROM par_riesgos_laborales WHERE Estado = 1 "
                . "ORDER BY Id");
        $response = array(
            "Info" => $db,
        );
        return ($response);
    }
    
    function GuardarRiesgosEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Notificados = \GuzzleHttp\json_decode($request->input('Riesgos'));
            $id = Array();
            if( count($Notificados) > 0 ){
                for($i = 0; $i < count($Notificados);$i++){
                    //$Notificados[$i] = (array) $Notificados[$i];
                    $Query = 'INSERT INTO empresa_riesgos_laborales (IdEmpresa,IdRiesgo,IdUsuario,Fecha) values (?, ?, ?, ?)';
                    $Data = [
                        (new Controller)->CodeDescrypt($request->input('Hash')),
                        $Notificados[$i],
                        $sqlUser[0]->IdUsuario,
                        date("Y-m-d h:i:s")
                        
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId());
                }

                (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'INFORMACION_RIESGO_LABORAL');
                DB::commit();
                return response()->json([
                    'Info'=>1,
                    'X'=>''
                ]);
            }

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
    
    public function EmpresaRiesgoLaboral(Request $request){
        
        $Db =  DB::SELECT("SELECT e.Id,p.Nombre, p.Descripcion "
                . "FROM empresa_riesgos_laborales e "
                . "INNER JOIN par_riesgos_laborales p ON e.IdRiesgo = p.Id "
                . "WHERE e.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash')));
        
        $response = array(
            "Info" => $Db,
            'Sql' => "SELECT p.Id,p.Nombre, p.Descripcion "
                . "FROM empresa_riesgos_laborales e "
                . "INNER JOIN par_riesgos_laborales p ON e.IdRiesgo = p.Id "
                . "WHERE e.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input('Hash'))
        );
        return ($response);
    }
    
    
    public function EliminarRiesgoLaboralEmpresa(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM empresa_riesgos_laborales '
                    . ' WHERE Id = ?';
            $Data = [
                $request->input('Hash')

            ];
            DB::DELETE($Query,$Data);
            array_push($id, $request->input('Hash'));
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'delete empresa_riesgos_laborales');

            DB::commit();
            return response()->json([
                'Info'=>1,
                'X'=>''
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
        }
    }
}


