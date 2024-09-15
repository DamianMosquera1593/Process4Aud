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

class PresupuestoController extends Controller
{
    public function index_presupuestos(){
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
            "PRODUCCION_PPTOS_CREAR"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_PPTOS_CREAR",session('keyUser'),0),
            "PRODUCCION_PPTOS_CONSULTAR"=>(new Controller)->ValidarPermisoUsuario("PRODUCCION_PPTOS_CONSULTAR",session('keyUser'),0),
            "Estados"=>$Estados,
            "Empresas"=>$Empresas
        ];
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.produccion.pro_prespuestos')->with('datos',$datos);
        }else{
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
        
    }
    
    public function Presupuesto_ListasCreacionPpto(){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $Empresas = DB::SELECT("SELECT "
                . "e.IdEmpresa as Hash, e.NombreComercial "
                . "FROM Empresa e "
                . "INNER JOIN Par_UsuarioEmpresa p on p.IdEmpresa = e.IdEmpresa "
                . "WHERE p.IdUsuario = ".$sqlUser[0]->IdUsuario);
        foreach($Empresas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $data = [
                'Clasificacion'=>(new Controller)->ListarDatosHash("par_clasificacion_ppto","Id","Nombre"),
                'Tipo'=>(new Controller)->ListarDatosHash("par_tipoppto","Id","Nombre"),
                'centro_costo'=>(new Controller)->ListarDatosHash("centro_costo","Id","Nombre"),
                'Empresa' => $Empresas
            ];

        return response()->json($data, 200);
    }
    
    public function Presupuesto_ListasPptoEditar(Request $request){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $Ppto = DB::SELECT ("SELECT * "
                . "From Presupuesto WHERE Id = ".parent::CodeDescrypt($request->input("Hash")));
        foreach($Ppto as $p){
            $p->IdEmpresa = parent::CodeEncrypt($p->IdEmpresa);
            $p->IdCliente = parent::CodeEncrypt($p->IdCliente);
            $p->IdProyecto = parent::CodeEncrypt($p->IdProyecto);
            $p->IdUnidad = parent::CodeEncrypt($p->IdUnidad);
            $p->IdTipoPpto = parent::CodeEncrypt($p->IdTipoPpto);
            $p->TipoComision = parent::CodeEncrypt($p->TipoComision);
            $p->IdClasificacion = parent::CodeEncrypt($p->IdClasificacion);
        }
        $Empresas = DB::SELECT("SELECT DISTINCT "
                . "e.IdEmpresa as Hash, e.NombreComercial "
                . "FROM Empresa e "
                //. "INNER JOIN Par_UsuarioEmpresa p on p.IdEmpresa = e.IdEmpresa "
                
                . "WHERE e.Estado = 1 ORDER BY e.NombreComercial");
        
        foreach($Empresas as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $data = [
                'Clasificacion'=>(new Controller)->ListarDatosHash("par_clasificacion_ppto","Id","Nombre"),
                'Tipo'=>(new Controller)->ListarDatosHash("par_tipoppto","Id","Nombre"),
                'centro_costo'=>(new Controller)->ListarDatosHash("centro_costo","Id","Nombre"),
                'Empresa' => $Empresas,
                'Ppto' => $Ppto,
            ];

        return response()->json($data, 200);
    }
    
    public function Presupuesto_ListarDatosComision(Request $request){
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $IdEmpresa = (new Controller)->CodeDescrypt($request->input("Hash1"));
        $IdUnidad = (new Controller)->CodeDescrypt($request->input("Hash2"));
        $IdCliente = (new Controller)->CodeDescrypt($request->input("Hash3"));
                
        $TiposComision = DB::SELECT("SELECT n.Id as Hash, "
                . "n.Porcentaje, tc.Nombre as TipoComision, "
                . "pp.Nombre as Dias "
                . "FROM Negociaciones n "
                . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
                . "INNER JOIN par_pagocliente pp on pp.Id = n.IdCondicionPago "
                . "WHERE "
                . "n.IdEmpresa = $IdEmpresa AND "
                . "n.IdUnidad = $IdUnidad AND "
                . "n.IdCliente = $IdCliente AND "
                . "n.Estado = 1 ");
        foreach($TiposComision as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        
        $Proyectos = DB::SELECT("SELECT DISTINCT "
                . "p.Id as Hash, p.Codigo, p.Referencia "
                . "FROM Proyectos p "
                . "INNER JOIN par_usuariocliente pu on "
                    . "p.IdEmpresa = pu.IdEmpresa AND "
                    . "p.IdUnidad = pu.IdUnidadNegocio AND "
                    . "p.IdCliente = pu.IdCliente AND "
                    . "p.IdProducto = pu.IdProducto AND "
                    . "pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "WHERE "
                . "p.IdEstado = 1 AND "
                . "p.IdEmpresa = $IdEmpresa AND "
                . "p.IdUnidad = $IdUnidad AND "
                . "p.IdCliente = $IdCliente "
                . "Order by p.Codigo Desc");
        foreach($Proyectos as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        
        $data = [
                'Comisiones' => $TiposComision,
                'Proyectos' => $Proyectos,
                'sql' =>"SELECT n.Id as Hash, "
                . "n.Porcentaje, tc.Nombre as TipoComision, "
                . "pp.Nombre as Dias "
                . "FROM Negociaciones n "
                . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
                . "INNER JOIN par_pagocliente pp on pp.Id = n.IdCondicionPago "
                . "WHERE "
                . "n.IdEmpresa = $IdEmpresa AND "
                . "n.IdUnidad = $IdUnidad AND "
                . "n.IdCliente = $IdCliente AND "
                . "n.Estado = 1 "
            ];

        return response()->json($data, 200);
    }
    
    public function Presupuesto_ListaDatosEmpresa(Request $request){
        $Nota = DB::SELECT("SELECT n.Texto as Nota "
                . "FROM Nota n "
                . "INNER JOIN par_tipo_nota_legal p on n.IdTipoNota = p.IdTipoNota and p.Codificacion = 'NOTA_PPTO' "
                . "Where n.IdEmpresa = ".(new Controller)->CodeDescrypt($request->input("Hash")));
        
        $idEmpresa = (new Controller)->CodeDescrypt($request->input("Hash"));
                
        $Unidades = DB::SELECT("SELECT DISTINCT un.nombre as Nombre, un.IdUnidad as Hash "
                            . "FROM unidad_negocio un "
                            . "inner join empresa e on un.IdEmpresa = e.IdEmpresa "
                            . "inner join par_usuariounidad pun on un.IdUnidad = pun.IdUnidad "
                            . "inner join usuario u on u.IdUsuario = pun.IdUsuario "
                            . "where u.Token = '".session('keyUser')."' and un.IdEmpresa = ".$idEmpresa." "
                . "order by un.Nombre");
        foreach($Unidades as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $data = [
                'Nota'=>$Nota,
                'Unidades' => $Unidades
            ];

        return response()->json($data, 200); 
    }
    
    public function Presupuesto_ListarClienteUsuarioEmpresaUnidad(Request $request){
        $IdEmpresa = (new Controller)->CodeDescrypt($request->input("Hash"));
        $IdUnidad = (new Controller)->CodeDescrypt($request->input("Hash2"));
                
        $Unidades = DB::SELECT("SELECT DISTINCT "
                . "c.IdCliente as Hash, c.NombreComercial "
                . "FROM Cliente c "
                . "INNER JOIN par_usuariocliente p on p.IdCliente = c.IdCliente "
                . "WHERE p.IdEmpresa = $IdEmpresa AND p.IdUnidadNegocio = $IdUnidad "
                . "Order by c.NombreComercial asc ");
        foreach($Unidades as $d){
            $d->Hash = (new Controller)->CodeEncrypt($d->Hash);
        }
        $data = [
                'Cliente'=>$Unidades
            ];

        return response()->json($data, 200); 
    }
    
    public function Produccion_GuardarPresupuesto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $AprobacionCliente = ($request->input('AprobacionCliente') == '') ? '': $request->input('AprobacionCliente');
            $DirigidoAPpto = ($request->input('DirigidoAPpto') == '') ? '': $request->input('DirigidoAPpto');
            $NotaAdicionalPpto = ($request->input('NotaAdicionalPpto') == '') ? '': $request->input('NotaAdicionalPpto');
            
            $Nestle = ((new Controller)->CodeDescrypt($request->input('IdCliente')) == 19) ? '2.5':0;
            
            
            $Query = 'INSERT INTO Presupuesto ('
                    . 'Referencia,'
                    . 'IdEmpresa,'
                    . 'IdUnidad,'
                    . 'IdCliente,'
                    . 'IdProyecto,'
                    . 'VigenciaInicial,'
                    . 'VigenciaFinal,'
                    . 'Aprobacion_Cliente,'
                    . 'Lugar,'
                    . 'NotaLegal,'
                    . 'Dirigido,'
                    . 'TipoComision,'
                    . 'IdClasificacion,'
                    . 'VersionInterna,'
                    . 'VersionCliente,'
                    . 'EstadoVersion,'
                    . 'IdTipoPpto,'
                    . 'IdUsuario,'
                    . 'Fecha,'
                    . 'NotaAdicional,'
                    . 'Factoring'
                    . ') values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                $request->input('ReferenciaPpto'),
                (new Controller)->CodeDescrypt($request->input('IdEmpresa')),
                (new Controller)->CodeDescrypt($request->input('IdUnidad')),
                (new Controller)->CodeDescrypt($request->input('IdCliente')),
                (new Controller)->CodeDescrypt($request->input('IdProyecto')),
                $request->input('VigenciaInicial'),
                $request->input('VigenciaFinal'),
                $AprobacionCliente,
                $request->input('LugarPpto'),
                $request->input('NotaLegalEmpresaPpto'),
                $DirigidoAPpto,
                (new Controller)->CodeDescrypt($request->input('IdComision')),
                (new Controller)->CodeDescrypt($request->input('IdClasificacion')),
                1,
                1,
                1,
                (new Controller)->CodeDescrypt($request->input('IdTipoPpto')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $NotaAdicionalPpto,
                $Nestle
            ];
            DB::INSERT($Query,$Data);
            $IdPpto = DB::getPdo()->lastInsertId();
            array_push($id, $IdPpto);
            
            $Query = 'INSERT INTO pptoversiones ('
                    . 'IdPpto,'
                    . 'Fecha,'
                    . 'IdUsuario,'
                    . 'VersionInterna,'
                    . 'VersionCliente ) '
                    . 'values(?,?,?,?,?)';
            $Data = [
                $IdPpto,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                1,
                1
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $IdPpto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_CREAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>'',
                'Ppto'=>($IdPpto)
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
    
    public function Produccion_GuardarEditarPresupuesto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $AprobacionCliente = ($request->input('AprobacionCliente') == '') ? '': $request->input('AprobacionCliente');
            $DirigidoAPpto = ($request->input('DirigidoAPpto') == '') ? '': $request->input('DirigidoAPpto');
            $NotaAdicionalPpto = ($request->input('NotaAdicionalPpto') == '') ? '': $request->input('NotaAdicionalPpto');
            
            $Query = 'UPDATE Presupuesto SET '
                    . 'Referencia = ?,'
                    . 'IdEmpresa = ?,'
                    . 'IdUnidad = ?,'
                    . 'IdCliente = ?,'
                    . 'IdProyecto = ?,'
                    . 'VigenciaInicial = ?,'
                    . 'VigenciaFinal = ?,'
                    . 'Aprobacion_Cliente = ?,'
                    . 'Lugar = ?,'
                    . 'NotaLegal = ?,'
                    . 'Dirigido = ?,'
                    . 'TipoComision = ?,'
                    . 'IdClasificacion = ?,'
                    . 'VersionInterna = ?,'
                    . 'VersionCliente = ?,'
                    . 'IdTipoPpto = ?,'
                    . 'IdUsuario = ?,'
                    . 'Fecha = ?,'
                    . 'NotaAdicional = ? '
                    . 'WHERE Id = ?';
            $Data = [
                $request->input('ReferenciaPpto'),
                (new Controller)->CodeDescrypt($request->input('IdEmpresa')),
                (new Controller)->CodeDescrypt($request->input('IdUnidad')),
                (new Controller)->CodeDescrypt($request->input('IdCliente')),
                (new Controller)->CodeDescrypt($request->input('IdProyecto')),
                $request->input('VigenciaInicial'),
                $request->input('VigenciaFinal'),
                $AprobacionCliente,
                $request->input('LugarPpto'),
                $request->input('NotaLegalEmpresaPpto'),
                $DirigidoAPpto,
                (new Controller)->CodeDescrypt($request->input('IdComision')),
                (new Controller)->CodeDescrypt($request->input('IdClasificacion')),
                1,
                1,
                (new Controller)->CodeDescrypt($request->input('IdTipoPpto')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $NotaAdicionalPpto,
                parent::CodeDescrypt($request->input('Hash'))
            ];
            DB::INSERT($Query,$Data);
            $IdPpto = parent::CodeDescrypt($request->input('Hash'));
            array_push($id, $IdPpto);
            
            
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $IdPpto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_CREAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>'',
                'Ppto'=>($IdPpto)
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
    
    public function Presupuestos_ListarPresupuestos(Request $request){
        
        $draw = $request['draw'];
        
        $Comp_Empresa = "";
        if( $request['search']['Empresa'] != 0 ){
            $Comp_Empresa = " and p.IdEmpresa = ".(new Controller)->CodeDescrypt( $request['search']['Empresa'] );
        }
        
        $Comp_Unidad = "";
        if( $request['search']['Unidad'] != 0 ){
            $Comp_Unidad = " and p.IdUnidad = ".(new Controller)->CodeDescrypt( $request['search']['Unidad'] );
        }
        
        $Comp_Cliente = "";
        if( $request['search']['Cliente'] != 0 ){
            $Comp_Cliente = " and p.IdCliente = ".parent::CodeDescrypt( $request['search']['Cliente'] );
        }
        
        $Comp_Proyecto = "";
        if( $request['search']['Proyecto'] != 0 ){
            $Comp_Proyecto = " and p.IdProyecto = ".(new Controller)->CodeDescrypt( $request['search']['Proyecto'] );
        }
        
        $Comp_Estado = "p.EstadoVersion = p.EstadoVersion ";
        if( $request['search']['Estado'] != 0 ){
            $Comp_Estado = " and p.EstadoVersion = ".(new Controller)->CodeDescrypt( $request['search']['Estado'] );
        }
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "Presupuesto p "
                . "INNER JOIN usuario u on p.IdUsuario = u.idusuario "
                . "INNER JOIN Proyectos ps on ps.Id = p.IdProyecto "
                . "INNER JOIN Empresa e on p.IdEmpresa = e.IdEmpresa "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "INNER JOIN Unidad_negocio un on p.IdUnidad = un.IdUnidad "
                . "INNER JOIN productocliente pc on ps.IdProducto = pc.Id "
                . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
                . "INNER JOIN par_usuariocliente pu on "
                    . "ps.IdEmpresa = pu.IdEmpresa AND "
                    . "ps.IdUnidad = pu.IdUnidadNegocio AND "
                    . "ps.IdCliente = pu.IdCliente AND "
                    . "ps.IdProducto = pu.IdProducto AND "
                    . "pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "WHERE ".$Comp_Estado.$Comp_Empresa.$Comp_Unidad.$Comp_Cliente.$Comp_Proyecto;

        $sqlCampos = "DISTINCT p.Id as Hash, e.NombreComercial as Empresa, "
                . "c.NombreComercial as Cliente, "
                . "un.Nombre as Unidad, "
                . "pc.Nombre as Producto, "
                . "ps.Codigo, ps.Referencia as Referencia_Proyecto,"
                . "p.Referencia as Referencia_Ppto , "
                . "estp.Nombre as EstadoPpto, "
                . "date_format(p.fecha,'%Y-%m-%d') as fechahora , u.nombreusuario ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "p.Id like '%".$searchValue."%' or "
                   . "e.NombreComercial like '%".$searchValue."%' or "
                   . "c.NombreComercial like '%".$searchValue."%' or "
                   . "un.Nombre like '%".$searchValue."%' or "
                   . "pc.Nombre like '%".$searchValue."%' or "
                   . "ps.Codigo like '%".$searchValue."%' or "
                   . "ps.Referencia like '%".$searchValue."%' or "
                   . "p.Referencia like '%".$searchValue."%' or "
                   . "u.nombreusuario like '%".$searchValue."%' or "
                   . "date_format(p.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>($row->Hash),
                "Hash2"=>parent::CodeEncrypt($row->Hash),
                "Empresa"=>$row->Empresa,
                "Cliente"=>$row->Cliente,
                "Unidad"=>$row->Unidad,
                "Producto"=>$row->Producto,
                "Codigo"=>$row->Codigo,
                "Referencia_Proyecto"=>$row->Referencia_Proyecto,
                "Referencia_Ppto"=>$row->Referencia_Ppto,
                "EstadoPpto"=>$row->EstadoPpto,
                "fechahora"=>$row->fechahora,
                "nombreusuario"=>$row->nombreusuario
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => $empRecords['totalRecords'],
            "iTotalDisplayRecords" => $empRecords['totalRecordwithFilter'],
            "aaData" => $data,
            "SQL"=>$sqlCampos.$sqlFrom
        );

        return json_encode($response);
    }
    
    public function Presupuesto_Detallex(Request $request){
        $InformacionPpto = DB::SELECT("SELECT "
                . "p.Id, p.Referencia,"
                . "p.VigenciaInicial,p.VigenciaFinal,"
                . "p.VersionInterna,"
                . "p.VersionCliente,p.IdMoneda,"
                . "estp.Nombre as Estado_Presupuesto, "
                . "FROM Presupuesto p "
                . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
                . "WHERE "
                . "p.Id = ".$request->input("Hash"));
        $data = [
                'InformacionPpto'=>$InformacionPpto
            ];

        return response()->json($data, 200); 
    }
    
    public function Presupuesto_Detalle($Id)
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            
            $InformacionPpto = DB::SELECT("SELECT "
                . "p.Id, p.Referencia,p.IdEmpresa, "
                . "p.VigenciaInicial,p.VigenciaFinal,"
                . "p.VersionInterna,"
                . "p.VersionCliente,"
                . "p.Imprevistos,"
                    . "p.GastosAdministrativos, "
                    . "p.Factoring,"
                    . "p.IntBancarios,"
                    . "p.IntTerceros,"
                    . "p.VersionCerrada,p.IdMoneda,p.IdUsuario,"
                . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
                    . "n.Porcentaje, tc.Nombre as TipoRentabilidad "
                . "FROM Presupuesto p "
                . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
                . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
                    . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
                . "WHERE "
                . "p.Id = ".parent::CodeDescrypt($Id));
            
            foreach ($InformacionPpto as $Ppto) {
                
                $Proveedores = DB::SELECT("SELECT "
                        . "p.IdProveedor as Hash, p.NombreComercial "
                        . "FROM Proveedor p "
                        . "INNER JOIN asoc_empresa_proveedor acc on p.IdProveedor = acc.IdProveedor "
                        . "WHERE acc.IdEmpresa = ".$Ppto->IdEmpresa." "
                        . "ORDER BY p.NombreComercial ASC");
                foreach( $Proveedores as $px ){
                    $px->Hash = parent::CodeEncrypt($px->Hash);
                }
                
                $Ppto->Proveedores = $Proveedores;
                
                $Ppto->url = parent::CodeEncrypt($Ppto->Id);
                $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
                $Ppto->PRODUCCION_PPTOS_GRUPO_CREAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_CREAR",session('keyUser'),0);
                $Ppto->PRODUCCION_PPTOS_RESUMEN = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_RESUMEN",session('keyUser'),0 );
                $Ppto->PRODUCCION_PPTOS_GRUPO_ELIMINAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_GRUPO_ELIMINAR",session('keyUser'),0);
                
                $sqlImpuestosInternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IOR') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                foreach($sqlImpuestosInternos as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosInterno = $sqlImpuestosInternos;
                
                $sqlImpuestosExternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosExternos as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosExterno = $sqlImpuestosExternos;
                
                //Aplicables en el resumen de Impuestos
                $sqlImpuestosComision = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('ICP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosComision as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosComision = $sqlImpuestosComision;
                
                //Impuestos Resumen Presupuestos
                $sqlImpuestosResumen = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosResumen as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosResumen = $sqlImpuestosResumen;
                
                $CountProveedores = 0;
                
                $GruposPpto = DB::SELECT("SELECT "
                        . "Nombre as Grupo, Id as Hash "
                        . "FROM grupo_presup "
                        . "WHERE IdPpto = ".$Ppto->Id." AND "
                        . "VersionInterna = ".$Ppto->VersionInterna." AND "
                        . "VersionExterna = ".$Ppto->VersionCliente." "
                        . "ORDER BY Orden ASC");
                foreach($GruposPpto as $gx){
                    $ItemsGrupos = DB::SELECT("SELECT "
                            . "* FROM "
                            . "item_grupos "
                            . "WHERE IdGrupo = ".$gx->Hash
                            . "");
                    foreach($ItemsGrupos as $Items){
                        
                        
                        //Asociados
                        $Asociados = DB::SELECT("SELECT * FROM asociados_item "
                                . "WHERE IdItem = ".$Items->Id);
                        foreach( $Asociados as $rtt ){
                            $rtt->Hash = parent::CodeEncrypt($rtt->Id);
                        }
                        $Items->Asociados = count($Asociados);
                        $Items->ItemsAsociados = $Asociados;
                        //Anticipos
                        $Ant = DB::SELECT("SELECT IdItemPpto, AnticipoPpto_Id as Anticipo "
                                . "FROM detalleanticipo "
                                . "WHERE IdItemPpto = ".$Items->Id);
                        foreach( $Ant as $rtt ){
                            $rtt->Hash = parent::CodeEncrypt($rtt->Anticipo);
                        }
                        if( Count($Ant) == 0 ){
                            $Items->Anticipo = 0;
                        }else{
                            $Items->Anticipo = 1;
                        }
                        $Items->DataAnticipos = $Ant;
                        $Items->Hash = parent::CodeEncrypt($Items->Id); 
                        $Items->HashOp = parent::CodeEncrypt($Items->IdOp); 
                        $Items->HashOc = parent::CodeEncrypt($Items->IdOc); 
                        $Items->IdImpuestoExterno = parent::CodeEncrypt($Items->IdImpuestoExterno); 
                        $Items->IdImpuesto = parent::CodeEncrypt($Items->IdImpuesto); 
                        $Items->IdProveedor = parent::CodeEncrypt($Items->IdProveedor); 
                        $CountProveedores++;
                    }
                    $gx->ItemsGrupo = $ItemsGrupos;
                    $gx->Hash = parent::CodeEncrypt($gx->Hash);
                }
                $Ppto->NumProveedores = $CountProveedores;
                $Ppto->Grupos = $GruposPpto;
            }

            return view('process.produccion.pro_prespuestos_detalle')->with('Datos',$InformacionPpto);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    public function Presupuesto_DetalleAjustes($Id)
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
            
            $InformacionPpto = DB::SELECT("SELECT "
                . "p.Id, p.Referencia,p.IdEmpresa, "
                . "p.VigenciaInicial,p.VigenciaFinal,"
                . "p.VersionInterna,"
                . "p.VersionCliente,"
                . "p.Imprevistos,"
                    . "p.GastosAdministrativos, "
                    . "p.Factoring,"
                    . "p.IntBancarios,"
                    . "p.IntTerceros,"
                    . "p.VersionCerrada,p.IdMoneda,"
                . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
                    . "n.Porcentaje, tc.Nombre as TipoRentabilidad "
                . "FROM Presupuesto p "
                . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
                . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
                    . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
                . "WHERE "
                . "p.Id = ".parent::CodeDescrypt($Id));
            
            foreach ($InformacionPpto as $Ppto) {
                
                $Proveedores = DB::SELECT("SELECT "
                        . "p.IdProveedor as Hash, p.NombreComercial "
                        . "FROM Proveedor p "
                        . "INNER JOIN asoc_empresa_proveedor acc on p.IdProveedor = acc.IdProveedor "
                        . "WHERE acc.IdEmpresa = ".$Ppto->IdEmpresa." "
                        . "ORDER BY p.NombreComercial ASC");
                foreach( $Proveedores as $px ){
                    $px->Hash = parent::CodeEncrypt($px->Hash);
                }
                
                $Ppto->Proveedores = $Proveedores;
                
                $Ppto->url = parent::CodeEncrypt($Ppto->Id);
                $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
                $Ppto->PRODUCCION_PPTOS_GRUPO_CREAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_CREAR",session('keyUser'),0);
                $Ppto->PRODUCCION_PPTOS_RESUMEN = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_RESUMEN",session('keyUser'),0 );
                $Ppto->PRODUCCION_PPTOS_GRUPO_ELIMINAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_GRUPO_ELIMINAR",session('keyUser'),0);
                
                $sqlImpuestosInternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IOR') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                foreach($sqlImpuestosInternos as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosInterno = $sqlImpuestosInternos;
                
                $sqlImpuestosExternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosExternos as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosExterno = $sqlImpuestosExternos;
                
                //Aplicables en el resumen de Impuestos
                $sqlImpuestosComision = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('ICP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosComision as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosComision = $sqlImpuestosComision;
                
                //Impuestos Resumen Presupuestos
                $sqlImpuestosResumen = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                
                foreach($sqlImpuestosResumen as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Ppto->ImpuestosResumen = $sqlImpuestosResumen;
                
                $CountProveedores = 0;
                
                $GruposPpto = DB::SELECT("SELECT "
                        . "Nombre as Grupo, Id as Hash "
                        . "FROM grupo_presup "
                        . "WHERE IdPpto = ".$Ppto->Id." AND "
                        . "VersionInterna = ".$Ppto->VersionInterna." AND "
                        . "VersionExterna = ".$Ppto->VersionCliente." "
                        . "ORDER BY Orden ASC");
                foreach($GruposPpto as $gx){
                    $ItemsGrupos = DB::SELECT("SELECT "
                            . "* FROM "
                            . "item_grupos "
                            . "WHERE IdGrupo = ".$gx->Hash
                            . "");
                    foreach($ItemsGrupos as $Items){
                        
                        //Anticipos
                        $Ant = DB::SELECT("SELECT IdItemPpto, AnticipoPpto_Id as Anticipo "
                                . "FROM detalleanticipo "
                                . "WHERE IdItemPpto = ".$Items->Id);
                        foreach( $Ant as $rtt ){
                            $rtt->Hash = parent::CodeEncrypt($rtt->Anticipo);
                        }
                        if( Count($Ant) == 0 ){
                            $Items->Anticipo = 0;
                        }else{
                            $Items->Anticipo = 1;
                        }
                        $Items->DataAnticipos = $Ant;
                        $Items->Hash = parent::CodeEncrypt($Items->Id); 
                        $Items->HashOp = parent::CodeEncrypt($Items->IdOp); 
                        $Items->HashOc = parent::CodeEncrypt($Items->IdOc); 
                        $Items->IdImpuestoExterno = parent::CodeEncrypt($Items->IdImpuestoExterno); 
                        $Items->IdImpuesto = parent::CodeEncrypt($Items->IdImpuesto); 
                        $Items->IdProveedor = parent::CodeEncrypt($Items->IdProveedor); 
                        $CountProveedores++;
                    }
                    $gx->ItemsGrupo = $ItemsGrupos;
                    $gx->Hash = parent::CodeEncrypt($gx->Hash);
                }
                $Ppto->NumProveedores = $CountProveedores;
                $Ppto->Grupos = $GruposPpto;
            }

            return view('process.produccion.pro_prespuestos_detalle2')->with('Datos',$InformacionPpto);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    public function Presupuesto_VersionPpto($Ppto){
        $Data = DB::SELECT("SELECT "
                . "VersionInterna, VersionCliente "
                . "FROM Presupuesto "
                . "WHERE Id = $Ppto");
        return $Data;
    }
    
    public function Presupuesto_GuardarGrupo(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            $Versiones = $this->Presupuesto_VersionPpto($Ppto);
            
            $Query = 'INSERT INTO grupo_presup ('
                    . 'Orden,'
                    . 'Nombre,'
                    . 'VersionInterna,'
                    . 'VersionExterna,'
                    . 'IdPpto,'
                    . 'Fecha,'
                    . 'IdUsuario) '
                    . 'values(?,?,?,?,?,?,?)';
            $Data = [
                0,
                $request->input('GrupoName'),
                $Versiones[0]->VersionInterna,
                $Versiones[0]->VersionCliente,
                $Ppto,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            DB::INSERT($Query,$Data);
            $IdGrupoPpto = DB::getPdo()->lastInsertId();
            array_push($id, $IdGrupoPpto );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_GRUPO_CREAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>'',
                'Grupo'=>parent::CodeEncrypt($IdGrupoPpto)
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
    
    public function Presupuesto_EditarGrupo(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            $Versiones = $this->Presupuesto_VersionPpto($Ppto);
            
            $Query = 'UPDATE grupo_presup SET '
                    . 'Nombre = ?,'
                    . 'Fecha = ?,'
                    . 'IdUsuario = ? '
                    . 'Where Id = ?';
            $Data = [
                $request->input('GrupoName'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                parent::CodeDescrypt($request->input('Hash2'))
            ];
            
            DB::UPDATE($Query,$Data);
            $IdGrupoPpto = parent::CodeDescrypt($request->input('Hash2'));
            array_push($id, $IdGrupoPpto );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_GRUPO_EDITAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>'',
                'Grupo'=>parent::CodeEncrypt($IdGrupoPpto)
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
    
    public function Presupuesto_EliminarGrupo(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            $Versiones = $this->Presupuesto_VersionPpto($Ppto);
            
            $Query = 'DELETE FROM grupo_presup Where Id = ?';
            $Data = [
                parent::CodeDescrypt($request->input('Hash2'))
            ];
            
            DB::DELETE($Query,$Data);
            $IdGrupoPpto = parent::CodeDescrypt($request->input('Hash2'));
            array_push($id, $IdGrupoPpto );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_GRUPO_ELIMINAR');

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
    
    public function Presupuesto_ListarGruposPpto(Request $request){
        $Grupos = DB::SELECT("SELECT "
                . "g.Id as Hash, g.Orden, "
                . "g.Nombre as Grupo "
                . "FROM grupo_presup g "
                . "INNER JOIN Presupuesto p on g.IdPpto = p.Id AND "
                . "g.VersionInterna = p.VersionInterna AND g.VersionExterna = p.VersionCliente "
                . "WHERE p.Id = ".parent::CodeDescrypt($request->input('Hash'))." Order by g.Orden ASC");
        foreach($Grupos as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
        }
        $data = [
                'Grupos'=>$Grupos
            ];

        return response()->json($data, 200);
    }
    
    public function Presupuesto_GuardarOrdenGruposPresupuesto(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'orden' => 'required|string'
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            
            $temp = explode("|",$Credentials['orden']);
            $tt = "";
            $x = 0;
            for($i = 0; $i < count($temp)-1;$i++,$x++){
                $t = explode("-",$temp[$i]);
                $Query = 'UPDATE grupo_presup SET Orden = ? WHERE Id = ? ';
                $Data = [
                    ($x+1),
                    (new Controller)->CodeDescrypt($t[0])

                ];
                DB::UPDATE($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
            }
            
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_GRUPO_EDITAR');

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
    
    public function Presupuesto_CrearItem(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            $IdGrupoPpto = parent::CodeDescrypt($request->input('Hash2'));
            $Versiones = $this->Presupuesto_VersionPpto($Ppto);
            
            $Query = 'INSERT INTO item_grupos ('
                    . 'Orden,'
                    . 'Item,'
                    . 'Descripcion_Interna,'
                    . 'IdProveedor,'
                    . 'Dias,'
                    . 'Unidad,'
                    . 'ValorUnitario,'
                    . 'Volumen,'
                    . 'IdImpuesto,'
                    . 'Descripcion_Externa,'
                    . 'ValorUnitarioCliente,'
                    . 'Bloqueo,'
                    . 'VNC,'
                    . 'IdGrupo,'
                    . 'VC,'
                    . 'PorcentajeComision,'
                    . 'IdImpuestoExterno,'
                    . 'IdUsuario,'
                    . 'Fecha'
                    . ') '
                    . 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                0,
                '',
                '',
                0,
                0,
                0,
                0,
                0,
                0,
                '',
                0,
                0,
                0,
                $IdGrupoPpto,
                1,
                0,
                0,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            $IdItemPpto = DB::getPdo()->lastInsertId();
            array_push($id, $IdItemPpto );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_ITEM_CREAR');

            DB::commit();
            
            $sqlPpto = DB::SELECT("SELECT Idempresa from presupuesto where id = $Ppto");
            $sqlImpuestosInternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IOR') and t.IdEmpresa = ".$sqlPpto[0]->Idempresa);
            foreach($sqlImpuestosInternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            

            $sqlImpuestosExternos = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IP','DCP') and t.IdEmpresa = ".$sqlPpto[0]->Idempresa);

            foreach($sqlImpuestosExternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            
            $Proveedores = DB::SELECT("SELECT "
                    . "p.IdProveedor as Hash, p.NombreComercial "
                    . "FROM Proveedor p "
                    . "INNER JOIN asoc_empresa_proveedor acc on p.IdProveedor = acc.IdProveedor "
                    . "WHERE acc.IdEmpresa = ".$sqlPpto[0]->Idempresa." "
                    . "ORDER BY p.NombreComercial ASC");
            foreach( $Proveedores as $px ){
                $px->Hash = parent::CodeEncrypt($px->Hash);
            }
            
            return response()->json([
                'Info'=>1,
                'X'=>'',
                'Item'=>parent::CodeEncrypt($IdItemPpto),
                'IInternos'=>$sqlImpuestosInternos,
                'Proveedores'=>$Proveedores,
                'IExterno'=>$sqlImpuestosExternos,
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
    
    public function Presupuesto_EliminarItem(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            
            $Query = 'DELETE FROM item_grupos Where Id = ?';
            $Data = [
                parent::CodeDescrypt($request->input('Hash2'))
            ];
            
            DB::DELETE($Query,$Data);
            $IdItem = parent::CodeDescrypt($request->input('Hash2'));
            array_push($id, $IdItem );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_ITEM_ELIMINAR');

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
    
    public function Presupuesto_EditarItemsPpto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i][0];
                    $Items[$i]['Dias'] = ($Items[$i]['Dias'] == '') ? '0': $Items[$i]['Dias'];
                    $Items[$i]['Cantidad'] = ($Items[$i]['Cantidad'] == '') ? '0': $Items[$i]['Cantidad'];
                    $Items[$i]['ValorUnitarioInterno'] = ($Items[$i]['ValorUnitarioInterno'] == '') ? '0': $Items[$i]['ValorUnitarioInterno'];
                    $Items[$i]['Volumen'] = ($Items[$i]['Volumen'] == '') ? '0': $Items[$i]['Volumen'];
                    $Items[$i]['ValorUnitarioExterno'] = ($Items[$i]['ValorUnitarioExterno'] == '') ? '0': $Items[$i]['ValorUnitarioExterno'];
                    $Items[$i]['ComisionItem'] = ($Items[$i]['ComisionItem'] == '') ? '0': $Items[$i]['ComisionItem'];
                    $Items[$i]['ItemOrden'] = ($Items[$i]['ItemOrden'] == '') ? '0': $Items[$i]['ItemOrden'];
                    
                    $ImpuestoInterno = explode('-', $Items[$i]['ImpuestoInterno'])[0];
                    $ImpuestoExterno = explode('-', $Items[$i]['ImpuestoExterno'])[0];
                    
                    $Query = 'UPDATE item_grupos SET '
                            . 'Orden = ?,'
                            . 'Item = ?,'
                            . 'Descripcion_Interna = ?,'
                            . 'IdProveedor = ?,'
                            . 'Dias = ?,'
                            . 'Unidad = ?,'
                            . 'ValorUnitario = ?,'
                            . 'Volumen = ?,'
                            . 'IdImpuesto = ?,'
                            . 'Descripcion_Externa = ?,'
                            . 'ValorUnitarioCliente = ?,'
                            . 'PorcentajeComision = ?,'
                            . 'IdImpuestoExterno = ?,'
                            . 'Fecha = ?,'
                            . 'IdUsuario = ? '
                            . 'Where Id = ?';
                    $Data = [
                        $Items[$i]['ItemOrden'],
                        $Items[$i]['Item'],
                        $Items[$i]['DescripcionInterna'],
                        parent::CodeDescrypt($Items[$i]['Proveedor']),
                        $Items[$i]['Dias'],
                        $Items[$i]['Cantidad'],
                        $Items[$i]['ValorUnitarioInterno'],
                        $Items[$i]['Volumen'],
                        parent::CodeDescrypt($ImpuestoInterno),
                        $Items[$i]['DescripcionExterna'],
                        $Items[$i]['ValorUnitarioExterno'],
                        $Items[$i]['ComisionItem'],
                        parent::CodeDescrypt($ImpuestoExterno),
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario,
                        parent::CodeDescrypt($Items[$i]['Id'])
                    ];

                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Items[$i]['Id']) );
                    
                    
                }
            }
            //asociados
            $Items = \GuzzleHttp\json_decode($request->input('Asociados'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i][0];
                    $Items[$i]['Dias'] = ($Items[$i]['Dias'] == '') ? '0': $Items[$i]['Dias'];
                    $Items[$i]['Cantidad'] = ($Items[$i]['Cantidad'] == '') ? '0': $Items[$i]['Cantidad'];
                    $Items[$i]['ValorUnitarioInterno'] = ($Items[$i]['ValorUnitarioInterno'] == '') ? '0': $Items[$i]['ValorUnitarioInterno'];
                    $Items[$i]['Volumen'] = ($Items[$i]['Volumen'] == '') ? '0': $Items[$i]['Volumen'];
                    
                    
                    $ImpuestoInterno = explode('-', $Items[$i]['ImpuestoInterno'])[0];
                    
                    $Query = 'UPDATE asociados_item SET '
                            . 'Item = ?,'
                            . 'Descripcion = ?,'
                            . 'IdProveedor = ?,'
                            . 'Dias = ?,'
                            . 'Cantidad = ?,'
                            . 'ValorUnitario = ?,'
                            . 'Volumen = ?,'
                            . 'IdImpuesto = ? '
                            . 'Where Id = ?';
                    $Data = [
                        $Items[$i]['Item'],
                        $Items[$i]['DescripcionInterna'],
                        parent::CodeDescrypt($Items[$i]['Proveedor']),
                        $Items[$i]['Dias'],
                        $Items[$i]['Cantidad'],
                        $Items[$i]['ValorUnitarioInterno'],
                        $Items[$i]['Volumen'],
                        parent::CodeDescrypt($ImpuestoInterno),
                       
                        parent::CodeDescrypt($Items[$i]['Id'])
                    ];

                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Items[$i]['Id']) );
                    
                    
                }
            }
            
            $Ppto = parent::CodeDescrypt($request->input('Hash'));
            
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Ppto,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            $VersionPpto = DB::SELECT("SELECT VersionInterna, VersionCliente "
                    . "FROM Presupuesto "
                    . "WHERE Id = $Ppto");
            $Query = 'UPDATE pptoversiones SET '
                    . 'FechaMod = ?,'
                    . 'IdUsuarioMod = ?,'
                    . 'ValoresComisionables = ?,'
                    . 'ValoresNoComisionables = ?,'
                    . 'ExcendeteAsociados = ?,'
                    . 'TotalEjecucion = ?,'
                    . 'Imprevistos = ?,'
                    . 'GastosAdmin = ?,'
                    . 'ComisionAgencia = ?,'
                    . 'TotalActividad = ?,'
                    . 'TotalComisionesPorDescuentos = ?,'
                    . 'UtilidadaComercial = ?,'
                    . 'Volumen = ?,'
                    . 'UtilidadMarginal = ?,'
                    . 'Factoring = ?,'
                    . 'InteresesBancarios = ?,'
                    . 'InteresesTerceros = ?,'
                    . 'ImpuestosPpto = ?,'
                    . 'UtilidadFinal = ?,'
                    . 'PorcentajeRentabilidad = ? '
                    . 'WHERE '
                    . 'IdPpto = ? '
                    . 'AND VersionInterna = ? '
                    . 'AND VersionCliente = ? '
                    . '';
            $PorcentajeUtilidadFinal = ($request->input('PorcentajeUtilidadFinal') == '-Infinity') ? '0': $request->input('PorcentajeUtilidadFinal');
            $PorcentajeVolumenTotal = ($request->input('PorcentajeVolumenTotal') == '-Infinity') ? '0': $request->input('PorcentajeVolumenTotal');
            $Data = [
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $request->input('Total_ValorComisional'),
                $request->input('Total_ValorNoComisional'),
                $request->input('Total_ExcedenteAsociados'),
                $request->input('Total_CostosEjecucion'),
                $request->input('TotalImprevistos'),
                $request->input('TotalGastosAdministrativos'),
                $request->input('Total_ComisionAgencia'),
                $request->input('Total_Actividad'),
                $request->input('Total_ComsionPorDescuentos'),
                $request->input('Total_UtilidadComercial'),
                $PorcentajeVolumenTotal,
                $request->input('TotalUtilidadMarginal'),
                $request->input('TotalFactoring'),
                $request->input('TotalInteresesBancarios'),
                $request->input('TotalInterecesTerceros'),
                $request->input('TotalImpuestosParam'),
                $request->input('UtilidadFinal'),
                $PorcentajeUtilidadFinal,
                $Ppto,
                $VersionPpto[0]->VersionInterna,
                $VersionPpto[0]->VersionCliente
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, $Ppto);
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_ITEM_EDITAR');

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
    
    public function Presupuesto_ComisionableItemPpto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdItem = parent::CodeDescrypt($request->input('Hash'));
            $sqlEstadoComision = DB::SELECT("SELECT VC From item_grupos WHERE Id = ".$IdItem);
            
            $Estado = 1;
            if( $sqlEstadoComision[0]->VC == 1){
                $Estado = 0;
            }
            
            $Query = 'UPDATE item_grupos SET Vc = ? Where Id = ?';
            $Data = [
                $Estado,
                $IdItem
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, $IdItem );
            
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                parent::CodeDescrypt($request->input('Hash2')),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'PRODUCCION_PPTOS_ITEM_EDITAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'X'=>$sqlEstadoComision[0]->VC,
                'Estado'=>$Estado
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
    
    //
    public function ConsultarVersionesPresupuesto(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
        ]);
        $Versiones = DB::SELECT("SELECT v.Id as Hash, "
                . "v.VersionInterna, v.VersionCliente, "
                . "DATE_FORMAT(v.Fecha,'%Y-%m-%d') as FechaCreacion, "
                . "DATE_FORMAT(v.Fecha,'%T') as HoraCreacion, "
                . "CASE WHEN isnull(v.FechaMod) then '' else DATE_FORMAT(v.FechaMod,'%Y-%m-%d') end as FechaUltimaModificacion, "
                . "CASE WHEN isnull(v.FechaMod) then '' else DATE_FORMAT(v.FechaMod,'%T') end as HoraMod, "
                . "u.NombreUsuario as Creador,"
                . "CASE WHEN ISNULL(u2.NombreUsuario) THEN '' ELSE u2.NombreUsuario END  as Modificador "
                . ""
                . "FROM pptoversiones v "
                . ""
                . "INNER JOIN Usuario u on u.IdUsuario = v.IdUsuario "
                . "LEFT JOIN Usuario u2 on u2.IdUsuario = v.IdUsuarioMod "
                . "WHERE v.IdPpto = ".($Credentials['Hash']));
        foreach( $Versiones as $v ){
            $v->Hash = parent::CodeEncrypt($v->Hash);
        }
        
        $VersionPpto = DB::SELECT("SELECT VersionInterna, VersionCliente, VersionCerrada "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".($Credentials['Hash']));
        return response()->json([
            'Versiones'=>$Versiones,
            'VersionPpto' =>$VersionPpto
        ]);
    }
    
    //
    public function PresupuestoGenerarNuevaVersionInterna(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
        ]);
        
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $VersionInternaMax = DB::SELECT("SELECT MAX(VersionInterna) as VersionInterna "
                . "FROM pptoversiones "
                . "WHERE IdPpto = ".($Credentials['Hash']));
            $VersionClienteMax = DB::SELECT("SELECT MAX(VersionCliente) as VersionCliente "
                    . "FROM pptoversiones "
                    . "WHERE IdPpto = ".($Credentials['Hash']));

            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            //Creo la Nueva versión Interna del Ppto
            $Query = 'INSERT INTO pptoversiones ('
                        . 'IdPpto,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                    . 'VersionInterna,'
                    . 'VersionCliente) '
                        . 'values(?,?,?,?,?)';
            $Data = [
                $Credentials['Hash'],
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                ($VersionInternaMax[0]->VersionInterna+1),
                $VersionClienteMax[0]->VersionCliente
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            $PptoVersionActual = DB::SELECT("SELECT VersionInterna, VersionCliente "
                    . "From Presupuesto Where Id = ".$Credentials['Hash']);
            
            //Actualizo Ppto con Nueva Version Ppto
            $Query = 'UPDATE Presupuesto SET VersionInterna = ?, VersionCliente = ? Where Id = ?';
            $Data = [
                ($VersionInternaMax[0]->VersionInterna+1),
                $VersionClienteMax[0]->VersionCliente,
                $Credentials['Hash']
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, $Credentials['Hash'] );
            
            
            //Grupos Versión Anterior
            $Grupos = DB::SELECT("SELECT g.Id,"
                    . "g.Orden, g.Nombre "
                    . "FROM grupo_presup g "
                    . "WHERE g.IdPpto = ".$Credentials['Hash']." "
                    . "AND g.VersionInterna = ".$PptoVersionActual[0]->VersionInterna." "
                    . "AND g.VersionExterna = ".$PptoVersionActual[0]->VersionCliente);
            foreach( $Grupos as $g ){
                //Inserto los Grupos en la Nueva Version
                $Query = 'INSERT INTO grupo_presup ('
                    . 'Orden,'
                    . 'Nombre,'
                    . 'IdPpto,'
                    . 'VersionInterna,'
                        . 'VersionExterna,'
                        . 'Fecha,'
                        . 'IdUsuario'
                    . ') '
                    . 'values(?,?,?,?,?,?,?)';
                $Data = [
                    $g->Orden,
                    $g->Nombre,
                    $Credentials['Hash'],
                    ($VersionInternaMax[0]->VersionInterna+1),
                    $VersionClienteMax[0]->VersionCliente,
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario
                    
                ];
                DB::INSERT($Query,$Data);
                $IdGrupoNuevo = DB::getPdo()->lastInsertId();
                array_push($id, $IdGrupoNuevo);
                
                $InsertItems = "INSERT INTO item_grupos ("
                    . "Orden,"
                    . "Item,"
                    . "Descripcion_Interna,"
                    . "IdProveedor,"
                    . "Dias,"
                    . "Unidad,"
                    . "ValorUnitario,"
                    . "Volumen,"
                    . "IdImpuesto,"
                    . "Descripcion_Externa,"
                    . "ValorUnitarioCliente,"
                    . "Bloqueo,"
                    . "VNC,"
                    . "IdGrupo,"
                    . "VC,"
                    . "PorcentajeComision,"
                    . "IdImpuestoExterno,"
                    . "IdUsuario,"
                    . "Fecha"
                    . ") "
                    . ""
                        . "SELECT "
                        . "Orden,"
                        . "Item,"
                        . "Descripcion_Interna,"
                        . "IdProveedor,"
                        . "Dias,"
                        . "Unidad,"
                        . "ValorUnitario,"
                        . "Volumen,"
                        . "IdImpuesto,"
                        . "Descripcion_Externa,"
                        . "ValorUnitarioCliente,"
                        . "Bloqueo,"
                        . "VNC,"
                        . $IdGrupoNuevo.","
                        . "VC,"
                        . "PorcentajeComision,"
                        . "IdImpuestoExterno,"
                        . $sqlUser[0]->IdUsuario.", '".date("Y-m-d H:i:s")."' "
                        . "FROM item_grupos "
                        . "WHERE "
                        . "IdGrupo = ".$g->Id;
                
                    DB::INSERT($InsertItems,$Data);
                    array_push($id, DB::getPdo()->lastInsertId());
            }
            
            //Actores Ppto
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Credentials['Hash'],
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'VersionN' => $VersionInternaMax[0]->VersionInterna+1
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
    
    //
    public function PresupuestoCambiarVersionPpto(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
        ]);
        
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            $PptoVersionActual = DB::SELECT("SELECT VersionInterna, VersionCliente, IdPpto "
                    . "From pptoversiones Where Id = ".parent::CodeDescrypt($Credentials['Hash']));
            
            //Actualizo Ppto con Nueva Version Ppto
            $Query = 'UPDATE Presupuesto SET VersionInterna = ?, VersionCliente = ? Where Id = ?';
            $Data = [
                $PptoVersionActual[0]->VersionInterna,
                $PptoVersionActual[0]->VersionCliente,
                $PptoVersionActual[0]->IdPpto
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, $Credentials['Hash'] );
            
            
            //Actores Ppto
            $Query = 'INSERT INTO pptoactores ('
                    . 'IdPpto,'
                    . 'IdUsuario,'
                    . 'Fecha) '
                    . 'values(?,?,?)';
            $Data = [
                $Credentials['Hash'],
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s")
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());
            
            DB::commit();
            
            return response()->json([
                'Info'=>1
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
    
    //
    public function ModoAprobacionPptos(){
        //Par_TipoRentabilidad
        $TipoRentabilidad = DB::SELECT("SELECT "
                . "Codigo "
                . "FROM Par_TipoRentabilidad "
                . "WHERE Estado = 1");
        return $TipoRentabilidad[0]->Codigo;
    }
    
    //
    public function PresupuestoGuardarSolAprobacion(Request $request){
        
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
           'Observ' => 'nullable|string',
        ]);
        $Info = array();
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $CaminoAprobacion = $this->ModoAprobacionPptos();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            
            $InformacionPpto = DB::SELECT("SELECT "
                    . "IdEmpresa, IdUnidad,"
                    . "IdCliente, "
                    . "VersionInterna,"
                    . "VersionCliente "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".parent::CodeDescrypt($Credentials['Hash']));
            $PorcentajeRentabilidadPpto = DB::SELECT("SELECT "
                    . "PorcentajeRentabilidad as Porcentaje "
                    . "FROM pptoversiones "
                    . "WHERE "
                    . "IdPpto = ".parent::CodeDescrypt($Credentials['Hash'])." "
                    . "AND VersionInterna = ".$InformacionPpto[0]->VersionInterna." "
                    . "AND VersionCliente = ".$InformacionPpto[0]->VersionCliente);
            
            
            $EstructuraSQLAprbacion = "";
            $TopBottomAprobacion = "";
            $CamArribaAbajo = 0;
            $Porcentaje = 0;
            $Existe = 0;
            
            if( $CaminoAprobacion == 'EMP' ){
                
                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = 0 ");
                
                
                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;
                    
                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }
                    
                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, u.Correo, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                            . "INNER JOIN Usuario u on ue.IdAprobador = u.IdUsuario "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = 1 "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = 0 "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'UND' ){
                $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InformacionPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = ".$InformacionPpto[0]->IdUnidad. " ");
                
                
                if( count($TopBottomAprobacion) == 1 ){
                    $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;
                    
                    if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                        $CamArribaAbajo = 2;
                    }else{
                        $CamArribaAbajo = 1;
                    }
                    
                    $EstructuraSQLAprbacion = DB::SELECT("SELECT "
                        . "e.Id, e.Nombre as Estructura, u.Correo, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                            . "INNER JOIN Usuario u on ue.IdAprobador = u.IdUsuario "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = 1 "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = ".$InformacionPpto[0]->IdUnidad. " "
                        . "AND ue.Estado = 1 "
                        . "");
                    if( count($EstructuraSQLAprbacion) > 0 ){
                        $Existe = 1;
                    }
                }
            }

            if( $CaminoAprobacion == 'EMP_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'EMP_UND_CLI' ){
                $EstructuraSQLAprbacion = "";
            }

            if( $CaminoAprobacion == 'CLI' ){
                $EstructuraSQLAprbacion = "";
            }
            
            if( $Existe == 0 ){
                return response()->json([
                    'Info'=>1,
                    'OK' => 0,
                    'sql'=>"SELECT "
                        . "e.Id, e.Nombre as Estructura, u.Correo, "
                            . "ue.IdAprobador "
                        . "FROM estructuraaprobacion_ppto e "
                            . "INNER JOIN usuariosaprobacionesppto ue on e.Id = ue.IdEstructuraPpto "
                            . "INNER JOIN Usuario u on ue.IdAprobador = u.IdUsuario "
                        . "WHERE "
                        . "e.Estado = 1 "
                        . "AND e.Orden = 1 "
                        . "AND e.TopBottom = $CamArribaAbajo "
                        . "AND e.IdEmpresa = ".$InformacionPpto[0]->IdEmpresa. " "
                        . "AND e.IdCliente = 0 "
                        . "AND e.IdUnidad = ".$InformacionPpto[0]->IdUnidad. " "
                        . "AND ue.Estado = 1 "
                        . ""
                ]);
            }else{
                $id = Array();
                //Actores Ppto
                $Query = 'INSERT INTO pptoactores ('
                        . 'IdPpto,'
                        . 'IdUsuario,'
                        . 'Fecha) '
                        . 'values(?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                array_push($id, DB::getPdo()->lastInsertId());
                
                //Guardar Datos de Envío a aprobación
                $Query = 'INSERT INTO SolicitudAprobacionPpto ('
                        . 'IdPpto,'
                        . 'VersionInterna,'
                        . 'VersionCliente,'
                        . 'IdUsuario,'
                        . 'Fecha,'
                        . 'Observaciones,'
                        . 'EstadoAprobacion'
                        . ') values (?,?,?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $InformacionPpto[0]->VersionInterna,
                    $InformacionPpto[0]->VersionCliente,
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    $Credentials['Observ'],
                    1
                ];
                DB::INSERT($Query,$Data);
                $IdSolicitudAprobacion = DB::getPdo()->lastInsertId();
                array_push($id, $IdSolicitudAprobacion );
                
                
                //Bloqueo de Ppto y Cambio de Estado
                $Query = 'UPDATE Presupuesto SET VersionCerrada = ?, EstadoVersion = ? Where Id = ?';
                $Data = [
                    1,
                    3, //En Aprobación Interna
                    parent::CodeDescrypt($Credentials['Hash'])
                ];

                DB::UPDATE($Query,$Data);
                array_push($id, parent::CodeDescrypt($Credentials['Hash']) );
                
                //Ingresar el cambio de Estado en el Historial
                
                $Query = 'INSERT INTO HistorialEstadosPpto ('
                        . 'IdPpto,'
                        . 'IdEstado,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                        . 'Observacion'
                        . ') '
                        . 'values(?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    3, //En Aprobación Interna
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    'Se envía el Presupuesto a Aprobación Interna.'
                ];

                DB::INSERT($Query,$Data);
                array_push($id, parent::CodeDescrypt($Credentials['Hash']) );
                
                //Ingreso de Nivel de Aprobacion
                $Query = 'INSERT INTO NivelAprobacionPpto ('
                        . 'IdPpto,'
                        . 'VersionInterna,'
                        . 'VersionCliente,'
                        . 'Fecha,'
                        . 'IdEstructura,'
                        . 'IdSolAprobacion'
                        . ') '
                        . 'values(?,?,?,?,?,?)';
                $Data = [
                    parent::CodeDescrypt($Credentials['Hash']),
                    $InformacionPpto[0]->VersionInterna,
                    $InformacionPpto[0]->VersionCliente,
                    date("Y-m-d H:i:s"),
                    $EstructuraSQLAprbacion[0]->Id,
                    $IdSolicitudAprobacion
                ];

                DB::INSERT($Query,$Data);
                $IdNivelAprobacion = DB::getPdo()->lastInsertId();
                array_push($id, $IdNivelAprobacion );
                
                
                //Notificados Estructura
                $tp = 0;
                foreach( $EstructuraSQLAprbacion as $e ){
                    $Query = 'INSERT INTO NotificadosNivelAprobacionPpto ('
                        . 'Fecha,'
                        . 'IdUsuarioNot,'
                        . 'NivelAprobacionPpto_Id'
                        . ') '
                        . 'values(?,?,?)';
                    $Data = [
                        date("Y-m-d H:i:s"),
                        $e->IdAprobador,
                        $IdNivelAprobacion
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId() );
                    $Info['Correos'][$tp] = "gerencia@processpluserp.com";//$e->Correo;
                    $tp++;
                }
                DB::commit();
                

                $Info['Asunto'] = "Revisión Presupuesto # ".parent::CodeDescrypt($Credentials['Hash']);
                $Info['RegistradoPor'] = "Process";
                $Info['NumPpto'] = parent::CodeDescrypt($Credentials['Hash']);
                $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
                
                if( (new MailController)->Mail_NotificacionAprobacionPpto($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    
                }
                
                return response()->json([
                    'Info'=>1,
                    'OK' => 1,
                    'Existe' =>$Existe
                ]);
            }
            
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
    
    //
    public function PresupuestoConsultarStatusAprobacion(){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
        ]);
        $InfoPpto = DB::SELECT("SELECT IdEmpresa, "
                . "Id, VersionInterna, VersionCliente "
                . "FROM Presupuesto "
                . "Where Id = ".parent::CodeDescrypt($Credentials['Hash']));
        
        $SolicitudAprobacion = DB::SELECT("SELECT s.Id,"
                . "s.IdPpto, s.VersionInterna, s.VersionCliente,"
                . "s.Observaciones,"
                . "Case "
                    . "WHEN s.EstadoAprobacion = 1 THEN 'En Aprobación' "
                    . "WHEN s.EstadoAprobacion = 2 THEN 'Aprobado' "
                    . "WHEN s.EstadoAprobacion = 3 THEN 'Rechazado' END "
                . "AS EstadoSolicitud,"
                . "u.NombreUsuario, "
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as Fecha,"
                . "DATE_FORMAT(s.Fecha, '%T') as Hora "
                . "FROM solicitudaprobacionppto s "
                . "INNER JOIN usuario u on s.IdUsuario = u.IdUsuario "
                . "WHERE "
                . "s.IdPpto = ".$InfoPpto[0]->Id." "
                . "AND s.VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                . "AND s.VersionCliente = ".$InfoPpto[0]->VersionCliente);
        foreach( $SolicitudAprobacion as $s ){
            $s->Observaciones = nl2br($s->Observaciones);
            
            $PorcentajeRentabilidadPpto = DB::SELECT("SELECT "
                    . "PorcentajeRentabilidad as Porcentaje "
                    . "FROM pptoversiones "
                    . "WHERE "
                    . "IdPpto = ".$InfoPpto[0]->Id." "
                    . "AND VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                    . "AND VersionCliente = ".$InfoPpto[0]->VersionCliente);
            $CamArribaAbajo = 0;
            
            $TopBottomAprobacion = DB::SELECT("SELECT "
                        . "Porcentaje "
                        . "FROM par_minrentabilidad "
                        . "WHERE "
                        . "Estado = 1 "
                        . "AND IdEmpresa = ".$InfoPpto[0]->IdEmpresa." "
                        . "AND IdCliente = 0 "
                        . "AND IdUnidad = 0 ");
            
            $Porcentaje = $TopBottomAprobacion[0]->Porcentaje;
                    
            if( $PorcentajeRentabilidadPpto[0]->Porcentaje < $Porcentaje ){
                $CamArribaAbajo = 2;
            }else{
                $CamArribaAbajo = 1;
            }
                    
            $EstructuraAprobacionPpto = DB::SELECT("SELECT "
                    . "Id,Nombre as Estructura, Orden "
                    . "from estructuraaprobacion_ppto "
                    . "WHERE IdEmpresa = ".$InfoPpto[0]->IdEmpresa." AND IdCliente = 0 AND IdUnidad = 0 AND Estado = 1 AND TopBottom = $CamArribaAbajo Order By Orden ASC ");
            foreach( $EstructuraAprobacionPpto as $e ){
                
                $UsuariosEst = DB::SELECT("SELECT "
                        . "p.IdAprobador, u.NombreUsuario "
                        . "FROM usuariosaprobacionesppto p "
                        
                        . "LEFT JOIN Usuario u on u.IdUsuario = p.IdAprobador "
                        . "WHERE "
                        . "p.Estado = 1 "
                        . "AND p.IdEstructuraPpto = ".$e->Id);
                $e->Usuarios = $UsuariosEst;
                
                foreach($UsuariosEst as $r){
                    $Aprob = DB::SELECT("SELECT "
                                . "DATE_FORMAT(FechaAprobacion,'%Y-%m-%d') as Fecha, "
                                . "DATE_FORMAT(FechaAprobacion,'%T') as Hora, "
                                . "observaciones, "
                                . "CASE "
                                . "WHEN Estado = 1 THEN 'Aprobado' "
                                . "WHEN Estado = 0 THEN 'No Aprobado' END "
                                . "As EstadoAprobacion "
                                . "FROM historicoaprobacionppto "
                                . "WHERE "
                                . "IdPpto = ".$InfoPpto[0]->Id." "
                                . "AND IdAprobador = ".$r->IdAprobador." "
                                . "AND VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                                . "AND VersionCliente = ".$InfoPpto[0]->VersionCliente);
                    foreach($Aprob as $tt){
                        $Temp = explode("-",$tt->Fecha);
                        $x = parent::NombreDia($tt->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        $tt->Fecha = $x;
                    }
                    $r->Info = $Aprob;
                }
            }
            $s->Estructura = $EstructuraAprobacionPpto;
        }
        return response()->json([
            'InfoAprobacion'=> $SolicitudAprobacion
        ]);
        
    }
    
    //
    public function DataPresupuestosinProveedorPDF($IdPpto){
        $InformacionPpto = DB::SELECT("SELECT n.Id as Negociacion,"
            . "p.Id, p.Referencia,p.IdEmpresa, "
            . "p.VigenciaInicial,p.VigenciaFinal,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,p.NotaLegal, emp.Nit as NitEmpresa,"
            . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
            . "n.Porcentaje, tc.Nombre as TipoRentabilidad,"
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "emp.NombreLegal as Empresa,"
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa "
            . "FROM Presupuesto p "
            . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
            . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
            . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "WHERE "
            . "p.Id = ".$IdPpto);

        foreach ($InformacionPpto as $Ppto) {
            $Ppto->url = parent::CodeEncrypt($Ppto->Id);
            $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
            $TotalPptoAntesComision = 0;
            $NoComisionable = 0;
            $TotalImpuestos = 0;
            $TotalImpuestosComision = 0;
            
            $sqlImpuestosExternos = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosExternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosExterno = $sqlImpuestosExternos;


            //Impuestos Resumen Presupuestos
            $sqlImpuestosResumen = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosResumen as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosResumen = $sqlImpuestosResumen;

            $CountProveedores = 0;

            $GruposPpto = DB::SELECT("SELECT "
                    . "Nombre as Grupo, Id as Hash "
                    . "FROM grupo_presup "
                    . "WHERE IdPpto = ".$Ppto->Id." AND "
                    . "VersionInterna = ".$Ppto->VersionInterna." AND "
                    . "VersionExterna = ".$Ppto->VersionCliente." "
                    . "ORDER BY Orden ASC");
            foreach($GruposPpto as $gx){
                $TotalGrupo = 0;
                $SubTotalGrupo = 0;
                $ItemsGrupos = DB::SELECT("SELECT "
                        . "i.VNC, i.Id,i.Item, i.Dias,i.Unidad,i.ValorUnitarioCliente as ValorUnitario,i.IdImpuesto,i.IdImpuestoExterno,"
                        . "i.Descripcion_Externa,i.Descripcion_Interna,"
                        . "pi.Nombre as Impuesto,"
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "left join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "left join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE IdGrupo = ".$gx->Hash
                        . "");
                foreach($ItemsGrupos as $Items){
                    $Items->Hash = parent::CodeEncrypt($Items->Id); 
                    $CountProveedores++;
                    if( $Items->VNC == 1 ){
                        $NoComisionable = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    }
                    $ValorUnitario = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    $TotalPptoAntesComision += $ValorUnitario;
                    
                    $SubTotalGrupo += $ValorUnitario;
                    $Items->SubtotalUnitario = $ValorUnitario;
                    
                    if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                       $Items->TotalUnitario = ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                       $TotalGrupo += ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                    }else{
                       $Items->TotalUnitario = 0;
                       $TotalGrupo += 0;
                    }
                   
                }
                $gx->Total = $TotalGrupo;
                $gx->SubTotal = $SubTotalGrupo;
                
                $gx->ItemsGrupo = $ItemsGrupos;
                $gx->Hash = parent::CodeEncrypt($gx->Hash);
            }
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Unidad*i.ValorUnitarioCliente) as Valor "
                        . "FROM item_grupos i "
                        . "INNER JOIN grupo_presup g on g.Id = i.IdGrupo "
                        . "WHERE i.IdImpuestoExterno = ".$t->Id." AND g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente." "
                        . "GROUP BY g.IdPpto ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Ppto->ImpuestosItems = $ImpuestosPptoItems;
            $Ppto->NumProveedores = $CountProveedores;
            $Ppto->Grupos = $GruposPpto;
            
            //Comision
            $Comision = 0;
            if( $Ppto->TipoRentabilidad == 'Multiplicada' ){
                $Comision = ($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100);
            }else if( $Ppto->TipoRentabilidad == 'Dividida' ){
                $Comision = (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) + (( (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) )*($Ppto->Porcentaje/100));
            }
            $Ppto->TotalPptoAntesComision = $TotalPptoAntesComision;
            $Ppto->Comision = $Comision;
            $Ppto->NoComisionable = $NoComisionable;
            $Ppto->TotalImpuestos = $TotalImpuestos;
            
            //Aplicables en el resumen de Impuestos
            $sqlImpuestosComision = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, pp.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa pp on t.IdTarifa = pp.Id "
                    . "INNER JOIN impuestosnegociacion inn on inn.IdImpuesto = t.Id "
                    . "INNER JOIN negociaciones p on inn.IdNegociacion = p.Id "
                    . "WHERE t.Ppto = 'IP' and t.Estado = 1 AND p.Id = ".$Ppto->Negociacion);

            foreach($sqlImpuestosComision as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
                if( $Int->Tipo = 'PORCENTAJE' || $Int->Tipo = 'SIN VALOR' ){
                    $Int->Total = $Comision*($Int->Valor/100);
                    $TotalImpuestosComision += $Comision*($Int->Valor/100);
                }else{
                    $Int->Total = 0;
                }
            }
            $Ppto->ImpuestosComision = $sqlImpuestosComision;
            $Ppto->TotalImpuestosComision = $TotalImpuestosComision;
        }
        return $InformacionPpto;
    }
    //
    public function DataPresupuestosinProveedorComisionManualPDF($IdPpto){
        $InformacionPpto = DB::SELECT("SELECT n.Id as Negociacion,"
            . "p.Id, p.Referencia,p.IdEmpresa, "
            . "p.VigenciaInicial,p.VigenciaFinal,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,p.NotaLegal, emp.Nit as NitEmpresa,"
            . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
            . "n.Porcentaje, tc.Nombre as TipoRentabilidad,"
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "emp.NombreLegal as Empresa,"
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa "
            . "FROM Presupuesto p "
            . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
            . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
            . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "WHERE "
            . "p.Id = ".$IdPpto);

        foreach ($InformacionPpto as $Ppto) {
            $Ppto->url = parent::CodeEncrypt($Ppto->Id);
            $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
            $TotalPptoAntesComision = 0;
            $NoComisionable = 0;
            $TotalImpuestos = 0;
            $TotalImpuestosComision = 0;
            
            $sqlImpuestosExternos = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosExternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosExterno = $sqlImpuestosExternos;


            //Impuestos Resumen Presupuestos
            $sqlImpuestosResumen = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosResumen as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosResumen = $sqlImpuestosResumen;

            $CountProveedores = 0;

            $GruposPpto = DB::SELECT("SELECT "
                    . "Nombre as Grupo, Id as Hash "
                    . "FROM grupo_presup "
                    . "WHERE IdPpto = ".$Ppto->Id." AND "
                    . "VersionInterna = ".$Ppto->VersionInterna." AND "
                    . "VersionExterna = ".$Ppto->VersionCliente." "
                    . "ORDER BY Orden ASC");
            $TotalComisionesManuales = 0;
            $Comisiones = DB::SELECT("SELECT "
                    . "i.PorcentajeComision, SUM( (i.Dias*i.Unidad*i.ValorUnitarioCliente)*(i.PorcentajeComision/100) ) as ValorComisionManual  "
                    . " FROM "
                    . "item_grupos i "
                    . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                    . "WHERE g.IdPpto = ".$Ppto->Id." AND "
                    . "g.VersionInterna = ".$Ppto->VersionInterna." AND "
                    . "g.VersionExterna = ".$Ppto->VersionCliente." and i.PorcentajeComision != 0 "
                    . "group by i.PorcentajeComision "
                    . "");
            foreach($Comisiones as $ttx){
                $TotalComisionesManuales += $ttx->ValorComisionManual;
            }
            $Ppto->Comisiones = $Comisiones;
                
            foreach($GruposPpto as $gx){
                $TotalGrupo = 0;
                $SubTotalGrupo = 0;
                
                $ItemsGrupos = DB::SELECT("SELECT "
                        . "i.VNC, i.Id,i.Item, i.Dias,i.Unidad,i.ValorUnitarioCliente as ValorUnitario,i.IdImpuesto,i.IdImpuestoExterno,"
                        . "i.Descripcion_Externa,i.Descripcion_Interna,"
                        . "pi.Nombre as Impuesto, i.PorcentajeComision, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "left join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "left join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE IdGrupo = ".$gx->Hash
                        . "");
                foreach($ItemsGrupos as $Items){
                    $Items->Hash = parent::CodeEncrypt($Items->Id); 
                    $CountProveedores++;
                    if( $Items->VNC == 1 ){
                        $NoComisionable = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    }
                    $ValorUnitario = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    $TotalPptoAntesComision += $ValorUnitario;
                    
                    $SubTotalGrupo += $ValorUnitario;
                    $Items->SubtotalUnitario = $ValorUnitario;
                    
                    if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                       $Items->TotalUnitario = ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                       $TotalGrupo += ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                    }else{
                       $Items->TotalUnitario = 0;
                       $TotalGrupo += 0;
                    }
                   
                }
                $gx->Total = $TotalGrupo;
                $gx->SubTotal = $SubTotalGrupo;
                
                $gx->ItemsGrupo = $ItemsGrupos;
                $gx->Hash = parent::CodeEncrypt($gx->Hash);
            }
            
            $ImpuestoIva = 0.19;
            $TotalImpuestoComManual = $TotalComisionesManuales * $ImpuestoIva;
            
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Unidad*i.ValorUnitarioCliente) as Valor "
                        . " "
                        . "FROM item_grupos i "
                        . "INNER JOIN grupo_presup g on g.Id = i.IdGrupo "
                        . "WHERE i.IdImpuestoExterno = ".$t->Id." AND g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente." "
                        . "GROUP BY g.IdPpto ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Ppto->ImpuestosItems = $ImpuestosPptoItems;
            $Ppto->NumProveedores = $CountProveedores;
            $Ppto->Grupos = $GruposPpto;
            
            //Comision
            $Comision = 0;
            if( $Ppto->TipoRentabilidad == 'Multiplicada' ){
                $Comision = ($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100);
            }else if( $Ppto->TipoRentabilidad == 'Dividida' ){
                $Comision = (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) + (( (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) )*($Ppto->Porcentaje/100));
            }
            $Ppto->TotalPptoAntesComision = $TotalPptoAntesComision;
            $Ppto->Comision = $Comision;
            $Ppto->NoComisionable = $NoComisionable;
            $Ppto->TotalImpuestos = $TotalImpuestos;
            
            //Aplicables en el resumen de Impuestos
            $sqlImpuestosComision = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, pp.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa pp on t.IdTarifa = pp.Id "
                    . "INNER JOIN impuestosnegociacion inn on inn.IdImpuesto = t.Id "
                    . "INNER JOIN negociaciones p on inn.IdNegociacion = p.Id "
                    . "WHERE t.Ppto = 'IP' and t.Estado = 1 AND p.Id = ".$Ppto->Negociacion);

            foreach($sqlImpuestosComision as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
                if( $Int->Tipo = 'PORCENTAJE' || $Int->Tipo = 'SIN VALOR' ){
                    $Int->Total = $Comision*($Int->Valor/100);
                    $TotalImpuestosComision += $Comision*($Int->Valor/100);
                }else{
                    $Int->Total = 0;
                }
            }
            $Ppto->ImpuestosComision = $sqlImpuestosComision;
            $Ppto->TotalImpuestosComision = $TotalImpuestosComision;
            
            $Ppto->ImpuestoIva = $ImpuestoIva;
            $Ppto->TotalImpuestoComManual = $TotalImpuestoComManual;
            $Ppto->TotalComisionesManuales = $TotalComisionesManuales;
        }
        return $InformacionPpto;
    }
    
    //
    public function DataPresupuestoconProveedorPDF($IdPpto){
        $InformacionPpto = DB::SELECT("SELECT n.Id as Negociacion,"
            . "p.Id, p.Referencia,p.IdEmpresa, "
            . "p.VigenciaInicial,p.VigenciaFinal,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,p.NotaLegal, emp.Nit as NitEmpresa,"
            . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
            . "n.Porcentaje, tc.Nombre as TipoRentabilidad,"
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "emp.NombreLegal as Empresa,"
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa "
            . "FROM Presupuesto p "
            . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
            . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
            . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "WHERE "
            . "p.Id = ".$IdPpto);

        foreach ($InformacionPpto as $Ppto) {
            $Ppto->url = parent::CodeEncrypt($Ppto->Id);
            $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
            $TotalPptoAntesComision = 0;
            $NoComisionable = 0;
            $TotalImpuestos = 0;
            $TotalImpuestosComision = 0;
            
            $sqlImpuestosExternos = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosExternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosExterno = $sqlImpuestosExternos;


            //Impuestos Resumen Presupuestos
            $sqlImpuestosResumen = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosResumen as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosResumen = $sqlImpuestosResumen;

            $CountProveedores = 0;

            $GruposPpto = DB::SELECT("SELECT "
                    . "Nombre as Grupo, Id as Hash "
                    . "FROM grupo_presup "
                    . "WHERE IdPpto = ".$Ppto->Id." AND "
                    . "VersionInterna = ".$Ppto->VersionInterna." AND "
                    . "VersionExterna = ".$Ppto->VersionCliente." "
                    . "ORDER BY Orden ASC");
            foreach($GruposPpto as $gx){
                $TotalGrupo = 0;
                $SubTotalGrupo = 0;
                $ItemsGrupos = DB::SELECT("SELECT "
                        . "i.VNC, i.Id,i.Item, i.Dias,i.Unidad,i.ValorUnitarioCliente as ValorUnitario,i.IdImpuesto,i.IdImpuestoExterno,"
                        . "i.Descripcion_Externa,i.Descripcion_Interna,"
                        . "pi.Nombre as Impuesto,"
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor, px.NombreLegal as Proveedor "
                        . " FROM "
                        . "item_grupos i "
                        . "INNER JOIN Proveedor px on i.IdProveedor = px.IdProveedor "
                        . "left join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "left join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE IdGrupo = ".$gx->Hash
                        . "");
                foreach($ItemsGrupos as $Items){
                    $Items->Hash = parent::CodeEncrypt($Items->Id); 
                    $CountProveedores++;
                    if( $Items->VNC == 1 ){
                        $NoComisionable = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    }
                    $ValorUnitario = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    $TotalPptoAntesComision += $ValorUnitario;
                    
                    $SubTotalGrupo += $ValorUnitario;
                    $Items->SubtotalUnitario = $ValorUnitario;
                    
                    if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                       $Items->TotalUnitario = ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                       $TotalGrupo += ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                    }else{
                       $Items->TotalUnitario = 0;
                       $TotalGrupo += 0;
                    }
                   
                }
                $gx->Total = $TotalGrupo;
                $gx->SubTotal = $SubTotalGrupo;
                
                $gx->ItemsGrupo = $ItemsGrupos;
                $gx->Hash = parent::CodeEncrypt($gx->Hash);
            }
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Unidad*i.ValorUnitarioCliente) as Valor "
                        . "FROM item_grupos i "
                        . "INNER JOIN grupo_presup g on g.Id = i.IdGrupo "
                        . "WHERE i.IdImpuestoExterno = ".$t->Id." AND g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente." "
                        . "GROUP BY g.IdPpto ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Ppto->ImpuestosItems = $ImpuestosPptoItems;
            $Ppto->NumProveedores = $CountProveedores;
            $Ppto->Grupos = $GruposPpto;
            
            //Comision
            $Comision = 0;
            if( $Ppto->TipoRentabilidad == 'Multiplicada' ){
                $Comision = ($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100);
            }else if( $Ppto->TipoRentabilidad == 'Dividida' ){
                $Comision = (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) + (( (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) )*($Ppto->Porcentaje/100));
            }
            $Ppto->TotalPptoAntesComision = $TotalPptoAntesComision;
            $Ppto->Comision = $Comision;
            $Ppto->NoComisionable = $NoComisionable;
            $Ppto->TotalImpuestos = $TotalImpuestos;
            
            //Aplicables en el resumen de Impuestos
            $sqlImpuestosComision = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, pp.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa pp on t.IdTarifa = pp.Id "
                    . "INNER JOIN impuestosnegociacion inn on inn.IdImpuesto = t.Id "
                    . "INNER JOIN negociaciones p on inn.IdNegociacion = p.Id "
                    . "WHERE t.Ppto = 'IP' and t.Estado = 1 AND p.Id = ".$Ppto->Negociacion);

            foreach($sqlImpuestosComision as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
                if( $Int->Tipo = 'PORCENTAJE' || $Int->Tipo = 'SIN VALOR' ){
                    $Int->Total = $Comision*($Int->Valor/100);
                    $TotalImpuestosComision += $Comision*($Int->Valor/100);
                }else{
                    $Int->Total = 0;
                }
            }
            $Ppto->ImpuestosComision = $sqlImpuestosComision;
            $Ppto->TotalImpuestosComision = $TotalImpuestosComision;
        }
        return $InformacionPpto;
    }
    
    
    //PDF INTERNO
    public function DataPresupuestoconProveedorPDFinterno($IdPpto){
        $Volumenes = 0;
        $InformacionPpto = DB::SELECT("SELECT n.Id as Negociacion,"
            . "p.Id, p.Referencia,p.IdEmpresa, "
            . "p.VigenciaInicial,p.VigenciaFinal,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,p.NotaLegal, emp.Nit as NitEmpresa,"
            . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
            . "n.Porcentaje, tc.Nombre as TipoRentabilidad,"
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "emp.NombreLegal as Empresa,"
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa "
            . "FROM Presupuesto p "
            . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
            . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
            . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "WHERE "
            . "p.Id = ".$IdPpto);

        foreach ($InformacionPpto as $Ppto) {
            $Ppto->url = parent::CodeEncrypt($Ppto->Id);
            $Ppto->Hash = parent::CodeEncrypt($Ppto->Id);
            $TotalPptoAntesComision = 0;
            $NoComisionable = 0;
            $TotalImpuestos = 0;
            $TotalImpuestosComision = 0;
            
            $sqlImpuestosExternos = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosExternos as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosExterno = $sqlImpuestosExternos;


            //Impuestos Resumen Presupuestos
            $sqlImpuestosResumen = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                    . "WHERE t.Estado = 1 and t.Ppto in ('IRP') and t.IdEmpresa = ".$Ppto->IdEmpresa);

            foreach($sqlImpuestosResumen as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
            }
            $Ppto->ImpuestosResumen = $sqlImpuestosResumen;

            $CountProveedores = 0;

            $GruposPpto = DB::SELECT("SELECT "
                    . "Nombre as Grupo, Id as Hash "
                    . "FROM grupo_presup "
                    . "WHERE IdPpto = ".$Ppto->Id." AND "
                    . "VersionInterna = ".$Ppto->VersionInterna." AND "
                    . "VersionExterna = ".$Ppto->VersionCliente." "
                    . "ORDER BY Orden ASC");
            foreach($GruposPpto as $gx){
                $TotalGrupo = 0;
                $TotalGrupoInterno = 0;
                $SubTotalGrupo = 0;
                $SubtotalGrupoInterno = 0;
                $ItemsGrupos = DB::SELECT("SELECT "
                        . "i.VNC, i.Id,i.Item, i.Volumen,i.ValorUnitario as ValorUnitarioInterno,i.Dias,i.Unidad,i.ValorUnitarioCliente as ValorUnitario,i.IdImpuesto,i.IdImpuestoExterno,"
                        . "i.Descripcion_Externa,i.Descripcion_Interna,"
                        . "pi.Nombre as Impuesto,"
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor, px.NombreLegal as Proveedor "
                        . " FROM "
                        . "item_grupos i "
                        . "LEFT JOIN Proveedor px on i.IdProveedor = px.IdProveedor "
                        . "left join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "left join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE IdGrupo = ".$gx->Hash
                        . "");
                foreach($ItemsGrupos as $Items){
                    $Items->Hash = parent::CodeEncrypt($Items->Id); 
                    $CountProveedores++;
                    if( $Items->VNC == 1 ){
                        $NoComisionable = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    }
                    $ValorUnitario = $Items->Dias*$Items->Unidad*$Items->ValorUnitario;
                    $ValorUnitarioInterno = $Items->Dias*$Items->Unidad*$Items->ValorUnitarioInterno;
                    $TotalPptoAntesComision += $ValorUnitario;
                    
                    $SubTotalGrupo += $ValorUnitario;
                    $SubtotalGrupoInterno += $ValorUnitarioInterno;
                    $Items->SubtotalUnitario = $ValorUnitario;
                    $Items->SubtotalUnitarioInterno = $ValorUnitarioInterno;
                    
                    if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                       $Items->TotalUnitario = ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                       $TotalGrupo += ($ValorUnitario * ($Items->Valor/100))+$ValorUnitario;
                    }else{
                       $Items->TotalUnitario = 0;
                       $TotalGrupo += 0;
                    }
                    
                    if( $Items->Volumen != 0 ){
                       $Items->TotalUnitarioInterno = $ValorUnitarioInterno - ($ValorUnitarioInterno * ($Items->Volumen/100));
                       $TotalGrupo += ($ValorUnitarioInterno * ($Items->Volumen/100))+$ValorUnitarioInterno;
                       $Volumenes += $ValorUnitarioInterno - ($ValorUnitarioInterno * ($Items->Volumen/100));
                    }else{
                       $Items->TotalUnitarioInterno = $ValorUnitarioInterno;
                       $TotalGrupoInterno += $ValorUnitarioInterno;
                       $Volumenes += $ValorUnitarioInterno;
                    }
                    
                    $PorParcial = 0;
                    if( $ValorUnitarioInterno == 0 ){
                        $PorParcial = 100;
                    }else if( $ValorUnitarioInterno == 0 && $ValorUnitario == 0 ){
                        $PorParcial = 0;
                    }else{
                        $PorParcial = 100-($ValorUnitario/$ValorUnitarioInterno);
                    }
                    
                    $ValParcial = $ValorUnitario - $ValorUnitarioInterno;
                    
                    $Items->PorParcial = $PorParcial;
                    $Items->ValParcial = $ValParcial;
                }
                $gx->Total = $TotalGrupo;
                $gx->TotalInterno = $TotalGrupoInterno;
                $gx->SubTotal = $SubTotalGrupo;
                $gx->SubTotalInterno = $SubtotalGrupoInterno;
                
                $gx->ItemsGrupo = $ItemsGrupos;
                $gx->Hash = parent::CodeEncrypt($gx->Hash);
            }
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "item_grupos i "
                        . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuestoExterno = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Unidad*i.ValorUnitarioCliente) as Valor "
                        . "FROM item_grupos i "
                        . "INNER JOIN grupo_presup g on g.Id = i.IdGrupo "
                        . "WHERE i.IdImpuestoExterno = ".$t->Id." AND g.IdPpto = ".$Ppto->Id." "
                        . "AND g.VersionInterna = ".$Ppto->VersionInterna." "
                        . "AND g.VersionExterna = ".$Ppto->VersionCliente." "
                        . "GROUP BY g.IdPpto ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Ppto->ImpuestosItems = $ImpuestosPptoItems;
            $Ppto->NumProveedores = $CountProveedores;
            $Ppto->Grupos = $GruposPpto;
            
            //Comision
            $Comision = 0;
            if( $Ppto->TipoRentabilidad == 'Multiplicada' ){
                $Comision = ($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100);
            }else if( $Ppto->TipoRentabilidad == 'Dividida' ){
                $Comision = (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) + (( (($TotalPptoAntesComision-$NoComisionable) * ($Ppto->Porcentaje/100)) )*($Ppto->Porcentaje/100));
            }
            $Ppto->TotalPptoAntesComision = $TotalPptoAntesComision;
            $Ppto->Comision = $Comision;
            $Ppto->NoComisionable = $NoComisionable;
            $Ppto->TotalCostoEjecucion = $NoComisionable + $TotalPptoAntesComision;
            $Ppto->TotalImpuestos = $TotalImpuestos;
            $Ppto->TotalActividad = $Comision + $TotalPptoAntesComision + $NoComisionable;
            $Ppto->TotalComisionesporDescuentos = $Ppto->TotalCostoEjecucion - $Volumenes;
            $Ppto->UtilidadComercial = $Ppto->TotalActividad - $Volumenes;
            $Ppto->VolumenGlobal = 100- (($Volumenes/$Ppto->TotalCostoEjecucion) * 100);
            $Ppto->UtilidadMarginal = 0;
            $Ppto->UtilidadFinal = $Ppto->TotalActividad - 0 - $Volumenes;
            
            //Aplicables en el resumen de Impuestos
            $sqlImpuestosComision = DB::SELECT("SELECT "
                    . "t.Valor, t.IdTarifa as Hash, pp.Nombre as Tarifa,t.Ppto, t.Tipo "
                    . "FROM tarifa_legal_empresa t "
                    . "INNER JOIN par_tipo_tarifa_legal_empresa pp on t.IdTarifa = pp.Id "
                    . "INNER JOIN impuestosnegociacion inn on inn.IdImpuesto = t.Id "
                    . "INNER JOIN negociaciones p on inn.IdNegociacion = p.Id "
                    . "WHERE t.Ppto = 'IP' and t.Estado = 1 AND p.Id = ".$Ppto->Negociacion);

            foreach($sqlImpuestosComision as $Int){
                $Int->Hash = parent::CodeEncrypt($Int->Hash);
                if( $Int->Tipo = 'PORCENTAJE' || $Int->Tipo = 'SIN VALOR' ){
                    $Int->Total = $Comision*($Int->Valor/100);
                    $TotalImpuestosComision += $Comision*($Int->Valor/100);
                }else{
                    $Int->Total = 0;
                }
            }
            $Ppto->ImpuestosComision = $sqlImpuestosComision;
            $Ppto->TotalImpuestosComision = $TotalImpuestosComision;
        }
        return $InformacionPpto;
    }
    
    public function PresupuestoAprobacionCliente(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash' => 'required|int',
            'ObservacionesPpto' => 'nullable|string',
            'ParLogo' => 'required|file',
        ]);
        
        $sqlUser = DB::SELECT("SELECT IdUsuario from Usuario where Token = '" . session('keyUser') . "'");
        
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
                if (!empty($request->file('ParLogo'))) {
                    $id = Array();
                    
                    $pathLogo = $request->file('ParLogo')->getClientOriginalName();
                    $Ppto = $Credentials['Hash'];
                    $InfoPpto = DB::SELECT("SELECT "
                            . "Id, VersionInterna,VersionCliente "
                            . "FROM Presupuesto "
                            . "WHERE Id = ".$Ppto);
                    
                    Storage::disk('local')->makeDirectory('Presupuestos/'.$Ppto);
                    $request->file('ParLogo')->storeAs('Presupuestos/'.$Ppto.'/', $pathLogo);
                    
                    $Query = 'INSERT INTO presupuestoaprobacionescliente ('
                            . 'IdPpto,'
                            . 'VersionInterna,'
                            . 'VersionCliente,'
                            . 'Fecha,'
                            . 'IdUsuario,'
                            . 'Observaciones,'
                            . 'Archivo'
                            . ') values (?, ?, ?, ?, ?, ?,?)';
                    $Data = [
                        $InfoPpto[0]->Id,
                        $InfoPpto[0]->VersionInterna,
                        $InfoPpto[0]->VersionCliente,
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario,
                        $Credentials['ObservacionesPpto'],
                        $pathLogo
                    ];
                    DB::INSERT($Query,$Data);
                    $idR = DB::getPdo()->lastInsertId();
                    array_push($id, $idR);
                    
                    $Query = 'INSERT INTO HistorialEstadosPpto ('
                        . 'IdPpto,'
                        . 'IdEstado,'
                        . 'Fecha,'
                        . 'IdUsuario,'
                        . 'Observacion'
                        . ') '
                        . 'values(?,?,?,?,?)';
                    $Data = [
                        $Ppto,
                        5, //Sin Facturar en Ordenación
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario,
                        'Se carga la aprobación del Cliente.'
                    ];

                    DB::INSERT($Query,$Data);
                    array_push($id, $Ppto );
                    
                    $Query = 'UPDATE Presupuesto SET VersionCerrada = ?, EstadoVersion = ? Where Id = ?';
                    $Data = [
                        0,
                        5, //Sin Facturar en Ordenación
                        $Ppto
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, $Ppto);
                    
                    
                    $PptoVersionActual = DB::SELECT("SELECT VersionInterna, VersionCliente "
                    . "From Presupuesto Where Id = ".$Ppto);
                    
                    //Grupos Versión Anterior
                    $Grupos = DB::SELECT("SELECT g.Id,"
                            . "g.Orden, g.Nombre "
                            . "FROM grupo_presup g "
                            . "WHERE g.IdPpto = ".$Ppto." "
                            . "AND g.VersionInterna = ".$PptoVersionActual[0]->VersionInterna." "
                            . "AND g.VersionExterna = ".$PptoVersionActual[0]->VersionCliente);
                    foreach( $Grupos as $g ){
                        //Inserto los Grupos en la Nueva Version
                        $Query = 'INSERT INTO Grupo_Presup_Aprobado ('
                            . 'Orden,'
                            . 'Nombre,'
                            . 'IdPpto,'
                            . 'VersionInterna,'
                                . 'VersionExterna,'
                                . 'Fecha,'
                                . 'IdUsuario'
                            . ') '
                            . 'values(?,?,?,?,?,?,?)';
                        $Data = [
                            $g->Orden,
                                $g->Nombre,
                            $Ppto,
                            $PptoVersionActual[0]->VersionInterna,
                            $PptoVersionActual[0]->VersionCliente,
                            date("Y-m-d H:i:s"),
                            $sqlUser[0]->IdUsuario

                        ];
                        DB::INSERT($Query,$Data);
                        $IdGrupoNuevo = DB::getPdo()->lastInsertId();
                        array_push($id, $IdGrupoNuevo);

                        $InsertItems = "INSERT INTO Item_Grupos_Aprobado ("
                            . "Orden,"
                            . "Item,"
                            . "Descripcion_Interna,"
                            . "IdProveedor,"
                            . "Dias,"
                            . "Unidad,"
                            . "ValorUnitario,"
                            . "Volumen,"
                            . "IdImpuesto,"
                            . "Descripcion_Externa,"
                            . "ValorUnitarioCliente,"
                            . "Bloqueo,"
                            . "VNC,"
                            . "IdGrupo,"
                            . "VC,"
                            . "PorcentajeComision,"
                            . "IdImpuestoExterno,"
                            . "IdUsuario,"
                            . "Fecha"
                            . ") "
                            . ""
                                . "SELECT "
                                . "Orden,"
                                . "Item,"
                                . "Descripcion_Interna,"
                                . "IdProveedor,"
                                . "Dias,"
                                . "Unidad,"
                                . "ValorUnitario,"
                                . "Volumen,"
                                . "IdImpuesto,"
                                . "Descripcion_Externa,"
                                . "ValorUnitarioCliente,"
                                . "Bloqueo,"
                                . "VNC,"
                                . $IdGrupoNuevo.","
                                . "VC,"
                                . "PorcentajeComision,"
                                . "IdImpuestoExterno,"
                                . $sqlUser[0]->IdUsuario.", '".date("Y-m-d H:i:s")."' "
                                . "FROM item_grupos "
                                . "WHERE "
                                . "IdGrupo = ".$g->Id;

                            DB::INSERT($InsertItems,$Data);
                            array_push($id, DB::getPdo()->lastInsertId());
                            
                            
                    }
                    
                    DB::commit();

                    $this->Presupuesto_Detalle($Ppto);
                }else{
                    DB::rollBack();
                    return response()->json([
                        'Info'=>2
                    ]);
                }

        } catch (\Exception $ex) {
            DB::rollBack();
            dd($ex);
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
    
    //
    public function DataOrdenProduccionPDF($IdOrden){
        $InformacionOrden = DB::SELECT("SELECT "
            . "p.Id as IdPpto, op.Id , p.Referencia,p.IdEmpresa, "
            . "op.VigenciaInicial,op.VigenciaFinal, op.FechaEntrega,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,op.NotaLegal, emp.Nit as NitEmpresa,"
            . "pt.Codigo as CodigoOT,"
            . "pt.Referencia as ReferenciaOT,"
            . "emp.NombreLegal as Empresa,"
            . "c.NombreLegal as Cliente, "
            . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa,"
            . "prv.NombreLegal as Proveedor, prv.Nit as NitProveedor, u2.NombreUsuario as ElaboradoPor, fp.Nombre as FormaPago,"
                . "op.MotivoCancelacion, DATE_FORMAT(op.FechaCancelacion,'%Y-%m-%d') as FechaCan, DATE_FORMAT(op.FechaCancelacion, '%T') as HoraCan,"
                . "u3.NombreUsuario as Cancelador, op.UsuarioCancelacion, op.Observaciones "
            . "FROM ordenproduccion op "
                . "INNER JOIN Proveedor prv on op.IdProveedor = prv.IdProveedor "
            . "INNER JOIN Presupuesto p on op.IdPpto = p.Id AND op.IdProyecto = p.IdProyecto "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
            . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
            . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
            . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "INNER JOIN Usuario u2 on op.IdUsuario = u2.IdUsuario "
            . "INNER JOIN par_formapago fp on op.IdFormaPago = fp.Id "
                . "LEFT JOIN Usuario u3 on op.UsuarioCancelacion = u3.IdUsuario "
            . "WHERE "
            . "op.Id = ".$IdOrden);

        foreach ($InformacionOrden as $Orden) {
            $Orden->url = parent::CodeEncrypt($Orden->Id);
            $Orden->Hash = parent::CodeEncrypt($Orden->Id);
            $Subtotal = 0;
            $Vol = 0;
            $Total = 0;
            $TotalImpuestos = 0;
            

            $CountProveedores = 0;

            $ItemsOP = DB::SELECT("SELECT "
                    . "op.Id as Hash, op.Dias, op.Cantidad,op.ValorUnitario, op.Volumen, op.IdImpuesto, op.Item,"
                    . "op.Descripcion, (op.Dias*op.Cantidad*op.ValorUnitario) as Subtotal,  "
                    . " (op.Dias*op.Cantidad*op.ValorUnitario)*(op.Volumen/100) as TotalVolumen,"
                    . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                    . "FROM op_detalle op "
                    . "LEFT join par_tipo_tarifa_legal_empresa pi on op.IdImpuesto = pi.id "
                    . "LEFT join tarifa_legal_empresa ti on ti.Id = pi.Id "
                    . "WHERE op.OrdenProduccion_id = ".$IdOrden
                    . "");
            foreach($ItemsOP as $Items){
                $Items->Hash = parent::CodeEncrypt($Items->Hash); 
                $Subtotal += $Items->Subtotal;
                $Vol += $Items->TotalVolumen;
                $TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Items->TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Total += $Items->Subtotal - $Items->TotalVolumen;


                if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                   $Items->TotalUnitario = ($TotalItem * ($Items->Valor/100))+$TotalItem;
                }else{
                   $Items->TotalUnitario = 0;
                }

            }
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "op_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenProduccion_id = ".$IdOrden
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Cantidad*i.ValorUnitario) as Valor "
                        . "FROM op_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenProduccion_id = ".$IdOrden
                        . " GROUP BY i.OrdenProduccion_id ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            
            $Orden->ImpuestosItems = $ImpuestosPptoItems;
            $Orden->ItemsOP = $ItemsOP;
            $Orden->Subtotal = $Subtotal;
            $Orden->Total = $Total;
            $Orden->Vol = $Vol;
            $Orden->TotalImpuestos = $TotalImpuestos;
            
        }
        return $InformacionOrden;
    }
    
    //
    public function DataOrdenCompraPDF($IdOrden){
        $InformacionOrden = DB::SELECT("SELECT "
            . "p.Id as IdPpto, op.Id , p.Referencia,p.IdEmpresa, "
            . "op.VigenciaInicial,op.VigenciaFinal, op.FechaEntrega,op.FechaRadicacion,"
            . "p.VersionInterna,"
            . "p.VersionCliente,"
            . "p.VersionCerrada,"
                . "p.Dirigido, p.Lugar,"
                . "p.NotaAdicional,op.NotaLegal, emp.Nit as NitEmpresa,"
            . "pt.Codigo as CodigoOT,"
            . "pt.Referencia as ReferenciaOT,"
            . "emp.NombreLegal as Empresa,"
            . "c.NombreLegal as Cliente, "
            . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, pmm.Nombre as TipoMoneda, pmm.Simbolo as SimbolMoneda,P.Tasa,"
            . "prv.NombreLegal as Proveedor, prv.Nit as NitProveedor, u2.NombreUsuario as ElaboradoPor, fp.Nombre as FormaPago,"
                . "op.MotivoCancelacion, DATE_FORMAT(op.FechaCancelacion,'%Y-%m-%d') as FechaCan, DATE_FORMAT(op.FechaCancelacion, '%T') as HoraCan,"
                . "u3.NombreUsuario as Cancelador, op.UsuarioCancelacion, op.Observacion AS Observaciones "
            . "FROM ordencompra op "
                . "INNER JOIN Proveedor prv on op.IdProveedor = prv.IdProveedor "
            . "INNER JOIN Presupuesto p on op.IdPpto = p.Id AND op.IdProyecto = p.IdProyecto "
            . "INNER JOIN parmoneda pmm on p.IdMoneda = pmm.Id "
            . "INNER JOIN Proyectos pt on pt.Id = p.IdProyecto "
            . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
            . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
            . "INNER JOIN Usuario u on pt.IdEjecutivo = u.IdUsuario "
            . "INNER JOIN Usuario u2 on op.IdUsuario = u2.IdUsuario "
            . "INNER JOIN par_formapago fp on op.IdFormaPago = fp.Id "
                . "LEFT JOIN Usuario u3 on op.UsuarioCancelacion = u3.IdUsuario "
            . "WHERE "
            . "op.Id = ".$IdOrden);

        foreach ($InformacionOrden as $Orden) {
            $Orden->url = parent::CodeEncrypt($Orden->Id);
            $Orden->Hash = parent::CodeEncrypt($Orden->Id);
            $Subtotal = 0;
            $Vol = 0;
            $Total = 0;
            $TotalImpuestos = 0;
            

            $CountProveedores = 0;

            $ItemsOP = DB::SELECT("SELECT "
                    . "op.Id as Hash, op.Dias, op.Cantidad,op.ValorUnitario, op.Volumen, op.IdImpuesto, op.Item,"
                    . "op.Descripcion, (op.Dias*op.Cantidad*op.ValorUnitario) as Subtotal,  "
                    . " (op.Dias*op.Cantidad*op.ValorUnitario)*(op.Volumen/100) as TotalVolumen,"
                    . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                    . "FROM oc_detalle op "
                    . "LEFT join par_tipo_tarifa_legal_empresa pi on op.IdImpuesto = pi.id "
                    . "LEFT join tarifa_legal_empresa ti on ti.Id = pi.Id "
                    . "WHERE op.OrdenCompra_Id = ".$IdOrden
                    . "");
            foreach($ItemsOP as $Items){
                $Items->Hash = parent::CodeEncrypt($Items->Hash); 
                $Subtotal += $Items->Subtotal;
                $Vol += $Items->TotalVolumen;
                $TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Items->TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Total += $Items->Subtotal - $Items->TotalVolumen;


                if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                   $Items->TotalUnitario = ($TotalItem * ($Items->Valor/100))+$TotalItem;
                }else{
                   $Items->TotalUnitario = 0;
                }

            }
            $ImpuestosPptoItems = DB::SELECT("SELECT DISTINCT "
                        . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                        . " FROM "
                        . "oc_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenCompra_Id = ".$IdOrden
                        . "");
            foreach( $ImpuestosPptoItems as $t ){
                $Items = DB::SELECT("SELECT SUM(i.Dias*i.Cantidad*i.ValorUnitario) as Valor "
                        . "FROM oc_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenCompra_Id = ".$IdOrden
                        . " GROUP BY i.OrdenCompra_Id ");
                if( count($Items )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Items[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Items[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            
            $OpsRe = DB::SELECT("SELECT DISTINCT "
                    . "i.IdOp "
                    . "FROM item_grupos i "
                    . "INNER JOIN oc_detalle oc on oc.IdItem = i.Id "
                    . "WHERE oc.OrdenCompra_Id = ".$IdOrden);
            
            $Orden->ImpuestosItems = $ImpuestosPptoItems;
            $Orden->ItemsOP = $ItemsOP;
            $Orden->Subtotal = $Subtotal;
            $Orden->Total = $Total;
            $Orden->Vol = $Vol;
            $Orden->OpsRe = $OpsRe;
            $Orden->TotalImpuestos = $TotalImpuestos;
            
        }
        return $InformacionOrden;
    }
    
    //
    public function DataAnticipoPDF($IdAnticipo){
        $Anticipos = DB::SELECT("SELECT "
                . "Ant.Id, pp.Id as IdPpto,Ant.Id as Hash, DATE_FORMAT(Ant.Fecha,'%Y-%m-%d') as FechaCreacion, DATE_FORMAT(Ant.Fecha,'%T') as HoraCreacion, "
                . "Ant.FechaNecesidad, Ant.FechaLegalizacion, Ant.Justificacion,"
                . "Est.Nombre as NEstado, Ant.Estado, TAnt.Nombre as TipoAnticipo,"
                . "Pf.Nombre as FormaPago, Ant.TotalAnticipo, u.NombreUsuario as SolicitadoPor, p.NombreComercial as Proveedor,p.Nit as NitProveedor, "
                . "pp.VersionInterna,pp.VersionCliente as VersionExterna, Ant.IdUsuarioCancelacion, "
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "emp.NombreLegal as Empresa, emp.Nit as NitEmpresa, "
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, n.Texto as NotaLegal "
                . "FROM Anticipoppto ant "
                . "INNER JOIN Presupuesto pp on ant.IdPpto = pp.Id "
                . "INNER JOIN Proyectos pt on pt.Id = pp.IdProyecto "
                . "INNER JOIN Empresa emp on pp.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on pp.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u2 on pt.IdEjecutivo = u2.IdUsuario "
                . "INNER JOIN par_estados_anticipo Est on Ant.Estado = Est.Id "
                . "INNER JOIN ParTipoAnticipo TAnt on TAnt.Id = Ant.ParTipoAnticipo_Id "
                . "INNER JOIN ParFormaPagoAnticipo Pf on Pf.Id = Ant.ParFormaPagoAnticipo_Id "
                . "INNER JOIN Usuario u on Ant.IdUsuario = u.IdUsuario "
                . "INNER JOIN nota n on n.IdEmpresa = pp.IdEmpresa AND n.IdTipoNota = 2 "
                . "LEFT JOIN Proveedor p on Ant.IdProveedor = p.IdProveedor "
                . ""
                . "WHERE "
                . "Ant.Id = ".($IdAnticipo)
                . " ");
        foreach($Anticipos as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
            $Temp = explode("-",$g->FechaCreacion);
            $g->FechaCreacion = parent::NombreDia($g->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaNecesidad);
            $g->FechaNecesidad = parent::NombreDia($g->FechaNecesidad).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaLegalizacion);
            $g->FechaLegalizacion = parent::NombreDia($g->FechaLegalizacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $GrupoItems = DB::SELECT("SELECT GrupoItem,"
                        . "NombreItem, DescripcionItem, Dias, Cantidad, ValorUnitario, (Dias*Cantidad*ValorUnitario) as Subtotal,ValorSolicitado,"
                        . "((Dias*Cantidad*ValorUnitario)* (Volumen/100)) as DescVolumen, (Dias*Cantidad*ValorUnitario) - ((Dias*Cantidad*ValorUnitario)* (Volumen/100)) as Total,"
                        . "ValorSolicitado "
                        . "FROM DetalleAnticipo "
                        . "WHERE "
                        . "AnticipoPpto_Id = ".($IdAnticipo));
            $TotalSolicitado = 0;
            foreach( $GrupoItems as $gg ){
                $TotalSolicitado += $gg->ValorSolicitado;
            }
            $g->Grupos = $GrupoItems;
            $g->ValorSolicitado = $TotalSolicitado;
            
        }
        return $Anticipos;
    }
    
    //6d23f08934bde355af6b8995b4c92e88p0o
    public function AsociadosItems(Request $request){
        $InformacionPpto = DB::SELECT("SELECT "
                . "p.Id, p.Referencia,p.IdEmpresa, "
                . "p.VigenciaInicial,p.VigenciaFinal,"
                . "p.VersionInterna,"
                . "p.VersionCliente,"
                . "p.Imprevistos,"
                    . "p.GastosAdministrativos, "
                    . "p.Factoring,"
                    . "p.IntBancarios,"
                    . "p.IntTerceros,"
                    . "p.VersionCerrada,p.IdMoneda,"
                . "estp.Nombre as Estado_Presupuesto, n.ImpuestoAdicional,"
                    . "n.Porcentaje, tc.Nombre as TipoRentabilidad "
                . "FROM Presupuesto p "
                . "INNER JOIN par_estadopresupuesto estp on p.EstadoVersion = estp.Id "
                . "INNER JOIN negociaciones n on p.TipoComision = n.Id "
                    . "INNER JOIN tiposcomision tc on n.TipoRentabilidad = tc.Id "
                . "WHERE "
                . "p.Id = ".$request->input("IdPpto"));
            
            foreach ($InformacionPpto as $Ppto) {
                $sqlImpuestosInternos = DB::SELECT("SELECT "
                        . "t.Valor, t.IdTarifa as Hash, p.Nombre as Tarifa "
                        . "FROM tarifa_legal_empresa t "
                        . "INNER JOIN par_tipo_tarifa_legal_empresa p on t.IdTarifa = p.Id "
                        . "WHERE t.Estado = 1 and t.Ppto in ('IOR') and t.IdEmpresa = ".$Ppto->IdEmpresa);
                foreach($sqlImpuestosInternos as $Int){
                    $Int->Hash = parent::CodeEncrypt($Int->Hash);
                }
                $Proveedores = DB::SELECT("SELECT "
                        . "p.IdProveedor as Hash, p.NombreComercial "
                        . "FROM Proveedor p "
                        . "INNER JOIN asoc_empresa_proveedor acc on p.IdProveedor = acc.IdProveedor "
                        . "WHERE acc.IdEmpresa = ".$Ppto->IdEmpresa." "
                        . "ORDER BY p.NombreComercial ASC");
                foreach( $Proveedores as $px ){
                    $px->Hash = parent::CodeEncrypt($px->Hash);
                }
            }
            $Asociados = DB::SELECT("SELECT "
                    . "Id, IdImpuesto,IdItem,Bloqueado,ValorUnitario,Volumen,Cantidad,Dias,IdProveedor,"
                    . "CASE WHEN ISNULL(Item) THEN '' ELSE Item END AS Item, "
                    . "CASE WHEN ISNULL(Descripcion) THEN '' ELSE Descripcion END AS Descripcion, "
                    . "CASE WHEN ISNULL(IdOp) THEN 0 ELSE IdOp END AS IdOp , "
                    . "CASE WHEN ISNULL(IdOc) THEN 0 ELSE IdOc END AS IdOc "
                    . " FROM asociados_item WHERE IdItem = ".parent::CodeDescrypt($request->input("Hash")));
            foreach ($Asociados as $ar){
                $ar->Hash = parent::CodeEncrypt($ar->Id);
                $ar->HashIdOp = ($ar->IdOp == 0) ? 0 : parent::CodeEncrypt($ar->IdOp);
                $ar->HashIdOc = ($ar->IdOc == 0) ? 0 : parent::CodeEncrypt($ar->IdOc);
                $ar->IdProveedor = parent::CodeEncrypt($ar->IdProveedor);
            }
            return response()->json([
                'Asociados'=> $Asociados,
                'Proveedores'=> $Proveedores,
                'ImpuestosInternos'=> $sqlImpuestosInternos,
        ]);
    }
    
    //6d23f08934bde355af6b8995b4c92e88
    public function PresupuestoAnticipos(Request $request){
        $Anticipos = DB::SELECT("SELECT "
                . "Ant.Id, Ant.Id as Hash, DATE_FORMAT(Ant.Fecha,'%Y-%m-%d') as FechaCreacion, DATE_FORMAT(Ant.Fecha,'%T') as HoraCreacion, "
                . "Ant.FechaNecesidad, Ant.FechaLegalizacion, Ant.Justificacion,"
                . "Est.Nombre as NEstado, Ant.Estado, TAnt.Nombre as TipoAnticipo,"
                . "Pf.Nombre as FormaPago, Ant.TotalAnticipo, u.NombreUsuario as SolicitadoPor "
                . "FROM Anticipoppto ant "
                . "INNER JOIN par_estados_anticipo Est on Ant.Estado = Est.Id "
                . "INNER JOIN ParTipoAnticipo TAnt on TAnt.Id = Ant.ParTipoAnticipo_Id "
                . "INNER JOIN ParFormaPagoAnticipo Pf on Pf.Id = Ant.ParFormaPagoAnticipo_Id "
                . "INNER JOIN Usuario u on Ant.IdUsuario = u.IdUsuario "
                . ""
                . "WHERE "
                . "Ant.IdPpto = ".parent::CodeDescrypt($request->input("Hash"))
                . " Order by Ant.Id DESC");
        foreach($Anticipos as $g){
            $g->Hash = parent::CodeEncrypt($g->Hash);
            $Temp = explode("-",$g->FechaCreacion);
            $g->FechaCreacion = parent::NombreDia($g->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaNecesidad);
            $g->FechaNecesidad = parent::NombreDia($g->FechaNecesidad).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaLegalizacion);
            $g->FechaLegalizacion = parent::NombreDia($g->FechaLegalizacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        $PRODUCCION_PPTOS_ANTICIPOS_CREAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_ANTICIPOS_CREAR",session('keyUser'),0);
        $PRODUCCION_PPTOS_ANTICIPOS_CANCELAR = parent::ValidarPermisoUsuario("PRODUCCION_PPTOS_ANTICIPOS_CANCELAR",session('keyUser'),0);
        return response()->json([
            'PRODUCCION_PPTOS_ANTICIPOS_CREAR'=> $PRODUCCION_PPTOS_ANTICIPOS_CREAR,
            'PRODUCCION_PPTOS_ANTICIPOS_CANCELAR'=> $PRODUCCION_PPTOS_ANTICIPOS_CANCELAR,
            'key'=> session('keyUser'),
            'Anticipos'=> $Anticipos,
        ]);
    }
    
    //6d23f08934bde355af6b8995b4c92e88x
    public function DataPresupuestoAnticipos(Request $request){
        $ParTipoAnticipo = DB::SELECT("SELECT * FROM ParTipoAnticipo WHERE Estado = 1");
        foreach( $ParTipoAnticipo as $t ){
            $t->Id = parent::CodeEncrypt($t->Id);
        }
        
        $ParFormaPagoAnticipo = DB::SELECT("SELECT * FROM ParFormaPagoAnticipo WHERE Estado = 1");
        foreach( $ParFormaPagoAnticipo as $t ){
            $t->Id = parent::CodeEncrypt($t->Id);
        }
        
        $Proveedores = DB::SELECT("SELECT DISTINCT "
                . "p.IdProveedor, p.NombreComercial, p.NombreLegal "
                . "FROM Proveedor p "
                . ""
                . "INNER JOIN item_grupos i on p.IdProveedor = i.IdProveedor "
                . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                . "INNER JOIN Presupuesto pp on g.IdPpto = pp.Id AND g.VersionInterna = pp.VersionInterna "
                . "AND g.VersionExterna = pp.VersionCliente AND pp.Id = ".parent::CodeDescrypt($request->input("Hash"))." "
                . "ORDER BY p.NombreComercial");
        $Items = DB::SELECT("SELECT "
                . "i.Id, i.Item, i.Descripcion_Interna, i.Dias, i.Unidad as Cantidad, i.ValorUnitario, g.Nombre as Grupo,"
                . "(i.Dias * i.Unidad* i.ValorUnitario) as ValorAntesImpuestos, (i.Dias*i.Unidad*i.ValorUnitario)*(i.Volumen/100) as TotalVolumen,"
                . "pi.Nombre as Impuesto,pi.Id, "
                        . "CASE WHEN isnull(ti.Tipo) THEN 'SIN VALOR' ELSE ti.Tipo END as Tipo ,"
                        . "CASE WHEN isnull(ti.Valor) THEN 0 ELSE ti.Valor END as Valor "
                . ""
                . "FROM item_grupos i "
                . "LEFT join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                . "LEFT join tarifa_legal_empresa ti on ti.Id = pi.Id "
                . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                . "INNER JOIN Presupuesto pp on g.IdPpto = pp.Id AND g.VersionInterna = pp.VersionInterna "
                . "AND g.VersionExterna = pp.VersionCliente AND pp.Id = ".parent::CodeDescrypt($request->input("Hash"))." "
                . "WHERE ISNULL(IDOP) AND ISNULL(IDOC) "
                . "ORDER BY g.orden, i.orden asc ");
        foreach ( $Items as $it ){
            $TotalItem = $it->ValorAntesImpuestos - $it->TotalVolumen;
            if( $it->Tipo == 'PORCENTAJE' || $it->Tipo == 'SIN VALOR' ){
               $it->TotalUnitario = ($TotalItem * ($it->Valor/100))+$TotalItem;
            }else{
               $it->TotalUnitario = 0;
            }
        }
        return response()->json([
            'ParTipoAnticipo'=> $ParTipoAnticipo,
            'ParFormaPagoAnticipo'=> $ParFormaPagoAnticipo,
            'Proveedores'=> $Proveedores,
            'Items'=> $Items,
            'key'=> session('keyUser'),
        ]);
    }
    
    public function AgregarAsociado(Request $request){
        $id = Array();
        try {
            DB::enableQueryLog();
            DB::beginTransaction();

            $Query = 'INSERT INTO asociados_item ('
                    . 'IdItem'
                    . ') values (?)';
            $Data = [
                parent::CodeDescrypt($request->input("Hash"))
            ];
            DB::INSERT($Query,$Data);
            $IdItem = DB::getPdo()->lastInsertId();
            array_push($id, $IdItem);

            DB::commit();

        } catch (\Exception $ex) {
            DB::rollBack();
            dd($ex);
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
    
    //6d23f08934bde355af6b8995b4c92e88e
    public function PresupuestoLegalizacionAnticipos(Request $request){
        $Anticipos = DB::SELECT("SELECT "
                . "ld.Id, ld.IdLegalizacion, ld.IdVersion, ld.Reintegro, ld.NumeroFactura, ld.Concepto, ld.Valor, ld.Impuestos, 
                    ld.TotalLegalizado, ld.FechaFactura, ld.Nit, ld.beneficiario, ld.direccion, ld.telefono, 
                    ld.ciudad, ld.adjunto,ld.retencion, ld.IdUsuario, ld.fecha "
                . " from anticipoppto_legalizacion ant "
                . "INNER JOIN legalizacion_versiones lv on ant.Id = lv.IdLegalizacion and ant.IdVersionActual = lv.Id "
                . "INNER JOIN legalizacion_detalle ld on lv.Id = ld.IdVersion "
                . "WHERE "
                . "Ant.IdAnticipo = ".parent::CodeDescrypt($request->input("Hash"))
                . " Order by ld.Fecha asc ");
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $Legal = DB::SELECT("SELECT Id,IdVersionActual from anticipoppto_legalizacion WHERE idAnticipo = ".parent::CodeDescrypt($request->input("Hash")));
        if( count( $Legal ) == 1 ){
            if( count($Anticipos) == 0 ){
                $id = Array();
                try {
                    DB::enableQueryLog();
                    DB::beginTransaction();
                    
                    $Query = 'INSERT INTO legalizacion_detalle ('
                            . 'IdLegalizacion,'
                            . 'IdVersion,'
                            . 'Fecha,'
                            . 'IdUsuario'
                            . ') values (?, ?, ?, ?)';
                    $Data = [
                        $Legal[0]->Id,
                        $Legal[0]->IdVersionActual,
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario
                    ];
                    DB::INSERT($Query,$Data);
                    $IdItem = DB::getPdo()->lastInsertId();
                    array_push($id, $IdItem);

                    DB::commit();

                } catch (\Exception $ex) {
                    DB::rollBack();
                    dd($ex);
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
        }else{
            $id = Array();
            try {
                DB::enableQueryLog();
                DB::beginTransaction();
                $Query = 'INSERT INTO anticipoppto_legalizacion ('
                        . 'Idusuario,'
                        . 'IdAnticipo,'
                        . 'IdEstadoLegalizacion,'
                        . 'ValorTotal,'
                        . 'TotalImpuestos,'
                        . 'TotalGeneral,'
                        . 'Reintegro,'
                        . 'Retencion,'
                        . 'IdVersionActual,'
                        . 'Fecha'
                        . ') values (?, ?, ?, ?, ?, ?,?,?,?,?)';
                $Data = [
                    $sqlUser[0]->IdUsuario,
                    parent::CodeDescrypt($request->input("Hash")),
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                $idLegalizacion = DB::getPdo()->lastInsertId();
                array_push($id, $idLegalizacion);


                $Query = 'INSERT INTO legalizacion_versiones ('
                        . 'Version,'
                        . 'IdLegalizacion,'
                        . 'IdUsuario,'
                        . 'TotalValor,'
                        . 'TotalImpuestos,'
                        . 'Total,'
                        . 'Reintegro,'
                        . 'Retencion,'
                        . 'Fecha'
                        . ') values (?, ?, ?, ?, ?, ?,?,?,?)';
                $Data = [
                    1,
                    $idLegalizacion,
                    $sqlUser[0]->IdUsuario,
                    0,
                    0,
                    0,
                    0,
                    0,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                $IdVersion = DB::getPdo()->lastInsertId();
                array_push($id, $IdVersion);


                $Query = 'UPDATE anticipoppto_legalizacion SET '
                    . 'IdVersionActual = ? '
                    . 'WHERE Id = ?';
                $Data = [
                    $IdVersion,
                    $idLegalizacion
                ];
                DB::INSERT($Query,$Data);
                array_push($id, $idLegalizacion);

                $Query = 'INSERT INTO legalizacion_detalle ('
                        . 'IdLegalizacion,'
                        . 'IdVersion,'
                        . 'Fecha,'
                        . 'IdUsuario'
                        . ') values (?, ?, ?, ?)';
                $Data = [
                    $idLegalizacion,
                    $IdVersion,
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario
                ];
                DB::INSERT($Query,$Data);
                $IdItem = DB::getPdo()->lastInsertId();
                array_push($id, $IdItem);

                DB::commit();



            } catch (\Exception $ex) {
                DB::rollBack();
                dd($ex);
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
        $Anticipos = DB::SELECT("SELECT "
                . "ant.IdAnticipo,ld.Id, ld.IdLegalizacion, ld.IdVersion, case when isnull(ld.Reintegro) then 0 else ld.Reintegro end as Reintegro, 
                    case when isnull(ld.NumeroFactura) then '' else ld.NumeroFactura end as NumeroFactura,
                    Case WHEN ISNULL(ld.Concepto) THEN '' ELSE ld.Concepto END AS Concepto, CASE WHEN ISNULL(ld.Valor) THEN 0 ELSE ld.Valor END AS Valor, 
                    CASE WHEN ISNULL(ld.Impuestos) THEN 0 ELSE ld.Impuestos END AS Impuestos, 
                    ld.TotalLegalizado, ld.FechaFactura, case when isnull(ld.Nit) then '' else ld.Nit end as Nit, case when isnull(ld.beneficiario) then '' else ld.beneficiario end as beneficiario, 
                    case when isnull(ld.direccion) then '' else ld.direccion end as direccion, case when isnull(ld.telefono) then '' else ld.telefono end as telefono, 
                    case when isnull(ld.ciudad) then '' else ld.ciudad end as ciudad, ld.adjunto,case when isnull(ld.retencion) then 0 else ld.retencion end as retencion, ld.IdUsuario, ld.fecha "
                . " from anticipoppto_legalizacion ant "
                . "INNER JOIN legalizacion_versiones lv on ant.Id = lv.IdLegalizacion and ant.IdVersionActual = lv.Id "
                . "INNER JOIN legalizacion_detalle ld on lv.Id = ld.IdVersion "
                . "WHERE "
                . "Ant.IdAnticipo = ".parent::CodeDescrypt($request->input("Hash"))
                . " Order by ld.Fecha asc ");
        foreach($Anticipos as $g){
            $g->Hash = parent::CodeEncrypt($g->Id);
            /*$Temp = explode("-",$g->fecha);
            $g->fecha = parent::NombreDia($g->fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaFactura);
            $g->FechaFactura = parent::NombreDia($g->FechaFactura).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];*/
        }
        return response()->json([
            'key'=> session('keyUser'),
            'Leg'=> $Anticipos[0]->IdLegalizacion,
            'Ver'=> $Anticipos[0]->IdVersion,
            'Legalizaciones'=> $Anticipos,
        ]);
    }
    //6d23f08934bde355af6b8995b4c92e88ex
    public function PresupuestoNuevaLegalizacionAnticipos(Request $request){
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $Legal = DB::SELECT("SELECT Id,IdVersionActual from anticipoppto_legalizacion WHERE idAnticipo = ".parent::CodeDescrypt($request->input("Hash")));
        if( count( $Legal ) == 1 ){
            $id = Array();
            try {
                DB::enableQueryLog();
                DB::beginTransaction();

                $Query = 'INSERT INTO legalizacion_detalle ('
                        . 'IdLegalizacion,'
                        . 'IdVersion,'
                        . 'Fecha,'
                        . 'IdUsuario'
                        . ') values (?, ?, ?, ?)';
                $Data = [
                    $Legal[0]->Id,
                    $Legal[0]->IdVersionActual,
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario
                ];
                DB::INSERT($Query,$Data);
                $IdItem = DB::getPdo()->lastInsertId();
                array_push($id, $IdItem);

                DB::commit();

            } catch (\Exception $ex) {
                DB::rollBack();
                dd($ex);
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
        return response()->json([
            'key'=> session('keyUser'),
        ]);
    }
    
    //6d23f08934bde355af6b8995b4c92e88eg
    public function GuardarDatosLegalizacion(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Items = \GuzzleHttp\json_decode($request->input('Legalizaciones'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array)$Items[$i];
                    $Items[$i]['NumFactura'] = ($Items[$i]['NumFactura'] == '') ? '': $Items[$i]['NumFactura'];
                    $Items[$i]['Concepto'] = ($Items[$i]['Concepto'] == '') ? '': $Items[$i]['Concepto'];
                    $Items[$i]['Valor'] = ($Items[$i]['Valor'] == '') ? '0': $Items[$i]['Valor'];
                    $Items[$i]['Impuestos'] = ($Items[$i]['Impuestos'] == '') ? '0': $Items[$i]['Impuestos'];
                    $Items[$i]['Retencion'] = ($Items[$i]['Retencion'] == '') ? '0': $Items[$i]['Retencion'];
                    $Items[$i]['FechaFactura'] = ($Items[$i]['FechaFactura'] == '') ? NULL: $Items[$i]['FechaFactura'];
                    $Items[$i]['Nit'] = ($Items[$i]['Nit'] == '') ? '': $Items[$i]['Nit'];
                    $Items[$i]['beneficiario'] = ($Items[$i]['beneficiario'] == '') ? '': $Items[$i]['beneficiario'];
                    $Items[$i]['direccion'] = ($Items[$i]['direccion'] == '') ? '': $Items[$i]['direccion'];
                    $Items[$i]['telefono'] = ($Items[$i]['telefono'] == '') ? '': $Items[$i]['telefono'];
                    $Items[$i]['ciudad'] = ($Items[$i]['ciudad'] == '') ? '': $Items[$i]['ciudad'];
                                        
                    $Query = 'UPDATE legalizacion_detalle SET '
                            //.'Reintegro= ?, '
                            .'NumeroFactura= ?, '
                            .'Concepto= ?, '
                            .'Valor= ?, '
                            .'Impuestos= ?, '
                            .'TotalLegalizado= ?, '
                            .'FechaFactura= ?, '
                            .'Nit= ?, '
                            .'beneficiario= ?, '
                            .'direccion= ?,' 
                            .'telefono= ?,' 
                            .'ciudad= ?, '
                            //.'adjunto= ?,'
                            .'retencion= ?, '
                            .'IdUsuario= ?, '
                            .'fecha = ? '
                            . 'Where Id = ?';
                    $Data = [
                        $Items[$i]['NumFactura'],
                        $Items[$i]['Concepto'],
                        $Items[$i]['Valor'],
                        $Items[$i]['Impuestos'],
                        0,
                        $Items[$i]['FechaFactura'],
                        $Items[$i]['Nit'],
                        $Items[$i]['beneficiario'],
                        $Items[$i]['direccion'],
                        $Items[$i]['telefono'],
                        $Items[$i]['ciudad'],
                        $Items[$i]['Retencion'],
                        $sqlUser[0]->IdUsuario,
                        date("Y-m-d H:i:s"),
                        parent::CodeDescrypt($Items[$i]['Id'])
                    ];

                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Items[$i]['Id']) );
                    
                    
                }
            }
            
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
    
    //6d23f08934bde355af6b8995b4c92e88el
    public function DelItemLegalizacion(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM legalizacion_detalle '
                    . 'Where Id = ?';
            $Data = [
                parent::CodeDescrypt($request->input("Hash"))
            ];

            DB::DELETE($Query,$Data);
            array_push($id, parent::CodeDescrypt( $request->input("Hash") ) );
            
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
    
    //6d23f08934bde355af6b8995b4c92e88el
    public function DelItemAsociado(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Query = 'DELETE FROM asociados_item '
                    . 'Where Id = ?';
            $Data = [
                parent::CodeDescrypt($request->input("Hash"))
            ];

            DB::DELETE($Query,$Data);
            array_push($id, parent::CodeDescrypt( $request->input("Hash") ) );
            
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
    
    //
    public function DataLegalizacionPDF($IdLegalizacion){
        $Anticipos = DB::SELECT("SELECT "
                . "Ant.Id as NumLegalizacion, ant.IdAnticipo, ant.IdEstadoLegalizacion,"
                . "DATE_FORMAT(ant.Fecha,'%Y-%m-%d') as Fecha, ant.IdUsuario, ux.NombreUsuario, ant.IdVersionActual, "
                . "antx.Id, pp.Id as IdPpto,DATE_FORMAT(antx.Fecha,'%Y-%m-%d') as FechaCreacion, DATE_FORMAT(antx.Fecha,'%T') as HoraCreacion, "
                . "antx.FechaNecesidad, antx.FechaLegalizacion, antx.Justificacion,"
                . "Est.Nombre as NEstado, antx.Estado, TAnt.Nombre as TipoAnticipo,"
                . "Pf.Nombre as FormaPago, antx.TotalAnticipo, u.NombreUsuario as SolicitadoPor, p.NombreComercial as Proveedor,p.Nit as NitProveedor, "
                . "pp.VersionInterna,pp.VersionCliente as VersionExterna, antx.IdUsuarioCancelacion, "
                . "pt.Codigo as CodigoOT,"
                . "pt.Referencia as ReferenciaOT,"
                . "c.NombreLegal as Cliente, "
                . "pc.Nombre as Producto, u.NombreUsuario as Ejecutivo, n.Texto as NotaLegal, "
                . "emp.NombreLegal as Empresa, emp.Nit as NitEmpresa, antx.TotalAnticipo "
                . "FROM anticipoppto_legalizacion ant "
                . "INNER JOIN legalizacion_versiones lv on ant.IdVersionActual = lv.id and ant.Id = lv.IdLegalizacion "
                . "INNER JOIN Usuario ux on ant.IdUsuario = ux.IdUsuario "
                . "INNER JOIN Anticipoppto antx on ant.IdAnticipo = antx.Id "
                . "INNER JOIN Presupuesto pp on antx.IdPpto = pp.Id "
                . "INNER JOIN Proyectos pt on pt.Id = pp.IdProyecto "
                . "INNER JOIN Empresa emp on pp.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Cliente c on pp.IdCliente = c.IdCliente "
                . "INNER JOIN productocliente pc on pt.IdProducto = pc.Id "
                . "INNER JOIN Usuario u2 on pt.IdEjecutivo = u2.IdUsuario "
                . "INNER JOIN par_estados_anticipo Est on antx.Estado = Est.Id "
                . "INNER JOIN ParTipoAnticipo TAnt on TAnt.Id = antx.ParTipoAnticipo_Id "
                . "INNER JOIN ParFormaPagoAnticipo Pf on Pf.Id = antx.ParFormaPagoAnticipo_Id "
                . "INNER JOIN Usuario u on antx.IdUsuario = u.IdUsuario "
                . "INNER JOIN nota n on n.IdEmpresa = pp.IdEmpresa AND n.IdTipoNota = 2 "
                . "LEFT JOIN Proveedor p on antx.IdProveedor = p.IdProveedor "
                . ""
                . "WHERE "
                . "Ant.Id = ".($IdLegalizacion)
                . " ");
        foreach($Anticipos as $g){
            $g->Hash = parent::CodeEncrypt($g->NumLegalizacion);
            $g->TotalAnticipoF = number_format($g->TotalAnticipo);
            $Temp = explode("-",$g->Fecha);
            $g->Fecha = parent::NombreDia($g->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaCreacion);
            $g->FechaCreacion = parent::NombreDia($g->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaNecesidad);
            $g->FechaNecesidad = parent::NombreDia($g->FechaNecesidad).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$g->FechaLegalizacion);
            $g->FechaLegalizacion = parent::NombreDia($g->FechaLegalizacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            
            $ItemsLeg = DB::SELECT("SELECT "
                . "ant.IdAnticipo,ld.Id, ld.IdLegalizacion, ld.IdVersion, case when isnull(ld.Reintegro) then 0 else ld.Reintegro end as Reintegro, 
                    case when isnull(ld.NumeroFactura) then '' else ld.NumeroFactura end as NumeroFactura,
                    Case WHEN ISNULL(ld.Concepto) THEN '' ELSE ld.Concepto END AS Concepto, CASE WHEN ISNULL(ld.Valor) THEN 0 ELSE ld.Valor END AS Valor, 
                    CASE WHEN ISNULL(ld.Impuestos) THEN 0 ELSE ld.Impuestos END AS Impuestos, 
                    ld.TotalLegalizado, ld.FechaFactura, case when isnull(ld.Nit) then '' else ld.Nit end as Nit, case when isnull(ld.beneficiario) then '' else ld.beneficiario end as beneficiario, 
                    case when isnull(ld.direccion) then '' else ld.direccion end as direccion, case when isnull(ld.telefono) then '' else ld.telefono end as telefono, 
                    case when isnull(ld.ciudad) then '' else ld.ciudad end as ciudad, ld.adjunto,case when isnull(ld.retencion) then 0 else ld.retencion end as retencion, ld.IdUsuario, ld.fecha "
                . " from anticipoppto_legalizacion ant "
                . "INNER JOIN legalizacion_versiones lv on ant.Id = lv.IdLegalizacion and ant.IdVersionActual = lv.Id "
                . "INNER JOIN legalizacion_detalle ld on lv.Id = ld.IdVersion "
                . "WHERE "
                . "Ant.Id = ".$IdLegalizacion
                . " Order by ld.Fecha asc ");
            $TotalLegalizado = 0;
            $y = 1;
            $totalImpuestos = 0;
            $totalRetencion = 0;
            foreach( $ItemsLeg as $gg ){
                $TotalLegalizado += $gg->Valor;
                $totalImpuestos += $gg->Impuestos;
                $totalRetencion += $gg->retencion;
                $Temp = explode("-",$gg->FechaFactura);
                $gg->FechaFactura = parent::NombreDia($gg->FechaFactura).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
                $gg->Num = $y;
                $y++;
            }
            $g->Grupos = $ItemsLeg;
            $g->ValorLegalizado = $totalRetencion + $totalImpuestos + $TotalLegalizado;
            $g->ValorLegalizadoF = number_format($totalRetencion + $totalImpuestos + $TotalLegalizado);
            $g->Impuestos = number_format($totalImpuestos);
            $g->Retencion = number_format($totalRetencion);
            $g->TotalF = number_format($TotalLegalizado);
            $g->Total = number_format($totalRetencion + $totalImpuestos + $TotalLegalizado);
            $g->Dif = number_format(($g->TotalAnticipo - ($TotalLegalizado + $totalRetencion + $totalImpuestos )) > 0 ? ($g->TotalAnticipo - ($TotalLegalizado + $totalRetencion + $totalImpuestos )) : ((-1)*($g->TotalAnticipo - ($TotalLegalizado + $totalRetencion + $totalImpuestos ))) );
            //$g->DifX = number_format((-1)*($g->TotalAnticipo - ($TotalLegalizado + $totalRetencion + $totalImpuestos )) > 0 ? ($g->TotalAnticipo - $TotalLegalizado) : ((-1)*($g->TotalAnticipo - $TotalLegalizado)) );
        }
        return $Anticipos;
    }
    
}

