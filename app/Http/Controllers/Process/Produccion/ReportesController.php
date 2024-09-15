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

namespace App\Http\Controllers\Process\Produccion;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;
use App\Http\Controllers\MailController;

class ReportesController extends Controller
{
    public function index_reportesProduccion(){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $Empresas = DB::SELECT("SELECT "
                . "e.IdEmpresa as Hash, e.NombreComercial "
                . "FROM Empresa e "
                . "INNER JOIN Par_UsuarioEmpresa p on p.IdEmpresa = e.IdEmpresa "
                
                . "WHERE p.IdUsuario = ".$sqlUser[0]->IdUsuario);
        foreach($Empresas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        
        $Estados = DB::SELECT("SELECT Id as Hash, Nombre "
                . "FROM par_estadopresupuesto");
        foreach($Estados as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $datos = [
            "Estados"=>$Estados,
            "Empresas"=>$Empresas
        ];
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.produccion.pro_reportes')->with('datos',$datos);
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
        
    }
    
    public function Reportes_PRD_DataAnticiposReporte(Request $request){
        $IdEmpresa = " AND p.IdEmpresa = ". (new Controller)->CodeDescrypt($request->input("HashEmpresa"))." ";
        $IdUnidad = " AND p.IdUnidad = ". (new Controller)->CodeDescrypt($request->input("HashUnidad"));
        
        $IdCliente = "";
        if( !empty($request->input("HashCliente")) ){
            $IdCliente = " AND p.IdCliente = ". (new Controller)->CodeDescrypt($request->input("HashCliente"));
        }
        
        $IdProyecto = "";
        if( !empty($request->input("HashProyecto")) ){
            $IdCliente = " AND p.IdProyecto = ". (new Controller)->CodeDescrypt($request->input("HashProyecto"));
        }
        $Referencia = "";
        if( !empty($request->input("Referencia")) ){
            $IdCliente = " AND ( "
                    . "p.Referencia like '%".$request->input("Referencia")."%' OR "
                    . "emp.NombreComercial like '%".$request->input("Referencia")."%' OR "
                    . "cli.NombreComercial like '%".$request->input("Referencia")."%' OR "
                    . "und.Nombre like '%".$request->input("Referencia")."%' OR "
                    . "u.NombreUsuario like '%".$request->input("Referencia")."%' OR "
                    . "pp.Referencia like '%".$request->input("Referencia")."%' "
                    . ") ";
        }
        
        $Data = DB::SELECT("SELECT "
                . "ant.Id, DATE_FORMAT(ant.Fecha,'%Y-%m-%d') as FechaCreacion, ant.Justificacion, ant.Estado, ant.TotalAnticipo, "
                . "pant.Nombre as TipoAnticipo,fant.Nombre as FormaPagoAnticipo, "
                . "pp.Referencia as ReferenciaPpto, emp.NombreComercial as Empresa,"
                . "cli.NombreComercial as Cliente, und.Nombre as Unidad, p.Codigo as Codigo_Ot, p.Referencia as ReferenciaProyecto,"
                . "u.NombreUsuario as SolicitadoPor, pp.Id as NumPpto, pe.Nombre as EstadoAnticipo "
                . "FROM anticipoppto ant "
                . "INNER JOIN partipoanticipo pant ON ant.ParTipoAnticipo_Id = pant.Id "
                . "INNER JOIN parformapagoanticipo fant ON ant.ParFormaPagoAnticipo_Id = fant.Id "
                . "INNER JOIN Presupuesto pp ON ant.IdPpto = pp.Id "
                . "INNER JOIN Empresa emp ON pp.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente cli ON pp.IdCliente  = cli.IdCliente "
                . "INNER JOIN unidad_negocio und ON pp.IdUnidad = und.IdUnidad "
                . "INNER JOIN proyectos p ON pp.IdProyecto = p.Id "
                . "INNER JOIN Usuario u ON ant.IdUsuario = u.IdUsuario "
                . "INNER JOIN par_estados_anticipo pe ON ant.Estado = pe.Id "
                . "WHERE 1 = 1 "
                . "$IdEmpresa $IdUnidad $IdCliente $IdProyecto $Referencia "
                . "ORDER BY ant.Fecha DESC");
        foreach($Data as $d){
            $d->Hash = parent::CodeEncrypt($d->NumPpto);
            $d->HashAnticipo = parent::CodeEncrypt($d->Id);
            
            $Legalizacion = DB::SELECT("SELECT "
                    . "Id, IdVersionActual "
                    . "FROM anticipoppto_legalizacion "
                    . "WHERE IdAnticipo = ".$d->Id);
            foreach($Legalizacion as $l){
                $t = DB::SELECT("SELECT "
                        . "IdLegalizacion, IdVersion, SUM(Valor) as Valor "
                        . "FROM legalizacion_detalle "
                        . "WHERE IdLegalizacion = ".$l->Id." AND IdVersion = ".$l->IdVersionActual." "
                        . "GROUP BY IdLegalizacion, IdVersion");
                if( count( $t ) > 0 ){
                    $l->Total = $t[0]->Valor;
                }else{
                    $l->Total = 0;
                }
                
            }
            $d->Legalizacion = $Legalizacion;
        }
        $data = [
                'Info' => $Data
            ];
        return response()->json($data, 200);
    }
    
    
        
}

