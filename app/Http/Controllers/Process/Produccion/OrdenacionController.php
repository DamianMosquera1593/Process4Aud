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
use Illuminate\Validation\ValidationException;
use Exception;
use PhpParser\Node\Stmt\Continue_;
use App\Http\Controllers\MailController;

class OrdenacionController extends Controller
{
    //
    public function DatosOrdenes(Request $request){
        $Credentials = $this->validate(request(),[
           'Hash' => 'required|int',
        ]);
        $FormaPago = DB::SELECT("SELECT "
                . "Id as Hash,Nombre as FormaPago "
                . "FROM par_formapago "
                . "WHERE Estado = 1 ");
        foreach( $FormaPago as $f ){
            $f->Hash = parent::CodeEncrypt( $f->Hash );
        }
        
        $Ppto = ($Credentials['Hash']);
        $InfoPpto = DB::SELECT("SELECT "
                . "VersionInterna,VersionCliente "
                . "FROM Presupuesto "
                . "WHERE Id = ".$Ppto);
        $Proveedores = DB::SELECT("SELECT Hash,Proveedor  FROM (SELECT DISTINCT "
                . "p.IdProveedor as Hash, p.NombreComercial as Proveedor "
                . ""
                . "FROM grupo_presup g "
                . "INNER JOIN item_grupos i on i.IdGrupo = g.Id "
                . "INNER JOIN Proveedor p on i.IdProveedor = p.IdProveedor "
                . "WHERE g.IdPpto = ".$Ppto." "
                . "AND g.VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                . "AND g.VersionExterna = ".$InfoPpto[0]->VersionCliente." "
                . "UNION ALL "
                . "SELECT DISTINCT p.IdProveedor as Hash, p.NombreComercial as Proveedor "
                . ""
                . "FROM grupo_presup g "
                . "INNER JOIN item_grupos i on i.IdGrupo = g.Id "
                . "INNER JOIN asociados_item att on i.Id = att.IdItem "
                . "INNER JOIN Proveedor p on att.IdProveedor = p.IdProveedor "
                . "WHERE g.IdPpto = ".$Ppto." "
                . "AND g.VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                . "AND g.VersionExterna = ".$InfoPpto[0]->VersionCliente." ) AXT "
                . ""
                . "ORDER BY Proveedor ASC");
        foreach( $Proveedores as $p ){
            $p->Hash = parent::CodeEncrypt($p->Hash);
        }
        
        return response()->json([
            'Proveedores'=>$Proveedores,
            'FormaPago' => $FormaPago,
        ]);
    }
    
    //
    public function ListarItemsProveedorPpto(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash'  => 'required|int',
            'HashP' => 'required|int',
        ]);
        $Ppto = ($Credentials['Hash']);
        $Proveedor = parent::CodeDescrypt($Credentials['HashP']);
        $InfoPpto = DB::SELECT("SELECT "
                . "VersionInterna,VersionCliente "
                . "FROM Presupuesto "
                . "WHERE Id = ".$Ppto);
        $Items = DB::SELECT("SELECT "
                . "g.Nombre as Grupo,"
                . "i.Id as Hash,"
                . "i.Item,"
                . "i.Dias,"
                . "i.Unidad,"
                . "i.ValorUnitario,"
                . "i.Volumen "
                . " "
                . ""
                . "FROM grupo_presup g "
                . "INNER JOIN item_grupos i on i.IdGrupo = g.Id "
                . ""
                . "WHERE g.IdPpto = ".$Ppto." "
                . "AND g.VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                . "AND g.VersionExterna = ".$InfoPpto[0]->VersionCliente." "
                . "AND i.IdProveedor = ".$Proveedor." "
                . "AND ( (i.IdOp = 0 OR  ISNULL(i.IdOp)) OR (i.IdOc = 0 OR  ISNULL(i.IdOc)))"
                . "ORDER BY i.Orden ASC");
        foreach( $Items as $p ){
            $p->Subtotal = $p->Dias*$p->Unidad*$p->ValorUnitario;
            $p->Vol = ($p->Dias*$p->Unidad*$p->ValorUnitario)*($p->Volumen/100);
            $p->Total = $p->Subtotal - $p->Vol;
            $p->Hash = parent::CodeEncrypt($p->Hash);
        }
        $Asoc = DB::SELECT("SELECT "
                . "ai.Id as Hash,"
                . "i.Item as ItemP,"
                . "ai.Item,"
                . "ai.Dias,"
                . "ai.Cantidad,"
                . "ai.ValorUnitario, "
                . "ai.Volumen "
                . ""
                . "FROM Asociados_Item ai "
                . "INNER JOIN item_grupos i on ai.IdItem = i.Id "
                . "INNER JOIN grupo_presup g on i.IdGrupo = g.Id "
                . ""
                . "WHERE g.IdPpto = ".$Ppto." "
                . "AND g.VersionInterna = ".$InfoPpto[0]->VersionInterna." "
                . "AND g.VersionExterna = ".$InfoPpto[0]->VersionCliente." "
                . "AND ai.IdProveedor = ".$Proveedor." "
                . "ORDER BY i.Orden ASC");
        foreach( $Asoc as $p ){
            $p->Subtotal = $p->Dias*$p->Cantidad*$p->ValorUnitario;
            $p->Vol = ($p->Dias*$p->Cantidad*$p->ValorUnitario)*($p->Volumen/100);
            $p->Total = $p->Subtotal - $p->Vol;
            $p->Hash = parent::CodeEncrypt($p->Hash);
        }
        return response()->json([
            'Asoc'=>$Asoc,
            'Items' => $Items,
        ]);
    }
    
    //
    public function GenerarOP(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $InfoPpto = DB::SELECT("SELECT VersionCliente, VersionInterna, IdProyecto, IdEmpresa "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".$request->input('Hash'));
            
            $Nota = DB::SELECT("SELECT "
                    . "n.Texto "
                    . "FROM nota n "
                    . "INNER JOIN par_tipo_nota_legal p on n.IdTipoNota = p.IdTipoNota "
                    . "WHERE n.IdEmpresa = ".$InfoPpto[0]->IdEmpresa." "
                    . "AND p.Codificacion = 'NOTA_OP' ");
            
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
                $request->input('Hash'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $InfoPpto[0]->VersionInterna,
                $InfoPpto[0]->VersionCliente
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            
            //Inserto los Grupos en la Nueva Version
            $Query = 'INSERT INTO ordenproduccion ('
                . 'Fecha,'
                    . 'IdUsuario,'
                    . 'IdPpto,'
                    . 'IdProyecto,'
                    . 'IdProveedor,'
                    . 'Observaciones,'
                    . 'VigenciaInicial,'
                    . 'VigenciaFinal,'
                    . 'FechaEntrega,'
                    . 'NotaLegal,'
                    . 'Lugar,'
                    . 'Estado,'
                    . 'IdFormaPago,'
                    . 'Notificacion'
                . ') '
                . 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $request->input('Hash'),
                $InfoPpto[0]->IdProyecto,
                parent::CodeDescrypt($request->input('Proveedor')),
                $request->input('Observaciones'),
                $request->input('VigenciaInicial'),
                $request->input('VigenciaFinal'),
                $request->input('FechaEntrega'),
                $Nota[0]->Texto,
                $request->input('Lugar'),
                1,
                parent::CodeDescrypt($request->input('FormaPago')),
                $request->input('Correo'),
            ];
            DB::INSERT($Query,$Data);
            $IdOp = DB::getPdo()->lastInsertId();
            array_push($id, $IdOp);
            
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO op_detalle ('
                            . 'Dias,'
                            . 'IdItem,'
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . 'OrdenProduccion_Id'
                            . ') '
                            . 'SELECT '
                            . 'Dias,'
                            . ''.parent::CodeDescrypt($Items[$i]['Id']).','
                            . 'Unidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion_Interna,'
                            . ''.$IdOp.' '
                            . 'FROM item_grupos '
                            . ''
                            . 'WHERE Id = '.parent::CodeDescrypt($Items[$i]['Id']);
                    
                    DB::INSERT($Query);
                    array_push($id, DB::getPdo()->lastInsertId());
                    
                    $Query = 'UPDATE item_grupos SET Bloqueo = ?, IdOp = ? Where Id = ?';
                    $Data = [
                        1,
                        $IdOp,
                        parent::CodeDescrypt($Items[$i]['Id'])
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Items[$i]['Id']));
                }
            }
            
            $Asoc = \GuzzleHttp\json_decode($request->input('Asoc'));
            if( count($Asoc) > 0 ){
                for($i = 0; $i < count($Asoc);$i++){
                    $Asoc[$i] = (array) $Asoc[$i];
                    $Query = 'INSERT INTO op_detalle ('
                            . 'Dias,'
                            . 'IdItem,'
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . 'OrdenProduccion_Id'
                            . ') '
                            . 'SELECT '
                            . 'Dias,'
                            . ''.parent::CodeDescrypt($Asoc[$i]['Id']).','
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . ''.$IdOp.' '
                            . 'FROM Asociados_Item '
                            . ''
                            . 'WHERE Id = '.parent::CodeDescrypt($Asoc[$i]['Id']);
                    DB::INSERT($Query);
                    array_push($id, DB::getPdo()->lastInsertId());
                    
                    $Query = 'UPDATE Asociados_Item SET Bloqueado = ?,IdOp = ? Where Id = ?';
                    $Data = [
                        1,
                        $IdOp,
                        parent::CodeDescrypt($Asoc[$i]['Id'])
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Asoc[$i]['Id']));
                    
                    
                }
            }
            DB::commit();
            
            $Provee = DB::SELECT("SELECT NombreComercial FROM Proveedor WHERE IdProveedor = ".parent::CodeDescrypt($request->input('Proveedor')));
            
            $Info['Asunto'] = "Orden de Producción # ".$IdOp;
            $Info['RegistradoPor'] = "Process";
            $Info['TipoEnvio'] = "INFORMACIÓN SOBRE ORDEN DE PRODUCCIÓN";
            $Info['Descripcion'] = "<p>Estimado Proveedor ".$Provee[0]->NombreComercial.", se ha emitido la Orden de Producción No. ".$IdOp."</p>";
            $Info['Link'] = "http://process.grupotesta.com.co:8989/PProcess3/public/13889e416790c50f0410449d8b5eaf3c/".parent::CodeEncrypt($IdOp)."";
            $Info['Correos'] = $request->input('Correo');
            $Mensaje = "";           
            
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
            

            if( (new MailController)->Mail_NotificacionOrdenes($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje  = "Se ha notificado al Proveedor.";
            }else{
                $Mensaje = "No se logró notificar al Proveedor.";
            }
            
            return response()->json([
                'Info'=>parent::CodeEncrypt($IdOp),
                'MensajeCorreo'=>$Mensaje
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
    public function ListarOrdenesOPPpto(Request $request){
        $draw = $request['draw'];
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "ordenproduccion op "
                . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
                . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
                . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
                . "LEFT JOIN Usuario u2 on op.UsuarioCancelacion = u2.IdUsuario "
                . "WHERE "
                . "op.IdPpto = ".$request['search']['Ppto']." ";

        $sqlCampos = "op.Id as Hash, op.Id, p.NombreLegal, p.NombreComercial, "
                . "u.NombreUsuario as Creador, pf.Nombre as FormaPago, "
                . "CASE WHEN op.Estado = 1 THEN 'Generada' WHEN op.Estado = 2 THEN 'Generada y Enviada' WHEN op.Estado = 0 THEN 'Cancelada' ELSE '' END Estado,"
                . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') as FechaCrea, "
                . "DATE_FORMAT(op.Fecha, '%T') as HoraCrea, "
                . "CASE WHEN ISNULL(op.MotivoCancelacion) THEN '' ELSE op.MotivoCancelacion END AS MotivoCancelacion, "
                . "CASE WHEN ISNULL(u2.NombreUsuario) THEN '' ELSE u2.NombreUsuario END AS UsuarioCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(op.FechaCancelacion, '%Y-%m-%d')) THEN '' ELSE DATE_FORMAT(op.FechaCancelacion, '%Y-%m-%d') END AS FechaCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(op.FechaCancelacion, '%T')) THEN '' ELSE DATE_FORMAT(op.FechaCancelacion, '%T') END AS HoraCan "
                . " ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['TextBusqueda'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "op.Id like '%".$searchValue."%' or "
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "u2.NombreUsuario like '%".$searchValue."%' or "
                   . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') like '%".$searchValue."%' or "
                   . "p.NombreLegal  like '%".$searchValue."%' or "
                   . "pf.Nombre  like '%".$searchValue."%' or "
                   . "p.NombreComercial like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>parent::CodeEncrypt($row->Hash),
                "Id"=>$row->Id,
                "NombreLegal"=>($row->NombreLegal),
                "NombreComercial"=>$row->NombreComercial,
                "Creador"=>$row->Creador,
                "FechaCrea"=>$row->FechaCrea,
                "HoraCrea"=>$row->HoraCrea,
                "MotivoCancelacion"=>$row->MotivoCancelacion,
                "UsuarioCan"=>$row->UsuarioCan,
                "FechaCan"=>$row->FechaCan,
                "FormaPago"=>$row->FormaPago,
                "Estado"=>$row->Estado,
                "HoraCan"=>$row->HoraCan
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
    
    //
    public function CancelarOPPpto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdOp = parent::CodeDescrypt($request->input('Hash'));
            $Query = 'UPDATE item_grupos SET Bloqueo = ?, IdOp = ? Where IdOp = ?';
            $Data = [
                0,
                NULL,
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            
            array_push($id, $IdOp);
            $Query = 'UPDATE Asociados_Item SET Bloqueado = ?,IdOp = ? Where IdOp = ?';
            $Data = [
                0,
                NULL,
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $IdOp);
            
            $Query = 'UPDATE ordenproduccion SET MotivoCancelacion = ?,UsuarioCancelacion = ?, FechaCancelacion = ? Where Id = ?';
            $Data = [
                $request->input('ObservacionesPpto'),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $IdOp);
            
            DB::commit();
            
            return response()->json([
                'Info'=>parent::CodeEncrypt($IdOp)
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
    public function ListarOrdenesOCPpto(Request $request){
        $draw = $request['draw'];
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "ordencompra op "
                . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
                . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
                . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
                . "LEFT JOIN Usuario u2 on op.UsuarioCancelacion = u2.IdUsuario "
                . "WHERE "
                . "op.IdPpto = ".$request['search']['Ppto']." ";

        $sqlCampos = "op.Id as Hash, op.Id, p.NombreLegal, p.NombreComercial, "
                . "u.NombreUsuario as Creador, pf.Nombre as FormaPago, "
                . "CASE WHEN op.Estado = 1 THEN 'Generada y Enviada' WHEN op.Estado = 2 THEN 'Facturada' WHEN op.Estado = 3 THEN 'Pagada' WHEN op.Estado = 0 THEN 'Cancelada' ELSE '' END Estado,"
                . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') as FechaCrea, "
                . "DATE_FORMAT(op.Fecha, '%T') as HoraCrea, "
                . "CASE WHEN ISNULL(op.MotivoCancelacion) THEN '' ELSE op.MotivoCancelacion END AS MotivoCancelacion, "
                . "CASE WHEN ISNULL(u2.NombreUsuario) THEN '' ELSE u2.NombreUsuario END AS UsuarioCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(op.FechaCancelacion, '%Y-%m-%d')) THEN '' ELSE DATE_FORMAT(op.Fecha, '%Y-%m-%d') END AS FechaCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(op.FechaCancelacion, '%T')) THEN '' ELSE DATE_FORMAT(op.Fecha, '%T') END AS HoraCan "
                . " ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['TextBusqueda'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." and ("
                   . "op.Id like '%".$searchValue."%' or "
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "u2.NombreUsuario like '%".$searchValue."%' or "
                   . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') like '%".$searchValue."%' or "
                   . "p.NombreLegal  like '%".$searchValue."%' or "
                   . "pf.Nombre  like '%".$searchValue."%' or "
                   . "p.NombreComercial like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){

            $data[] = array(
                "Num"=>$i,
                "Hash"=>parent::CodeEncrypt($row->Hash),
                "Id"=>$row->Id,
                "NombreLegal"=>($row->NombreLegal),
                "NombreComercial"=>$row->NombreComercial,
                "Creador"=>$row->Creador,
                "FechaCrea"=>$row->FechaCrea,
                "HoraCrea"=>$row->HoraCrea,
                "MotivoCancelacion"=>$row->MotivoCancelacion,
                "UsuarioCan"=>$row->UsuarioCan,
                "FechaCan"=>$row->FechaCan,
                "FormaPago"=>$row->FormaPago,
                "Estado"=>$row->Estado,
                "HoraCan"=>$row->HoraCan
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
    
    //
    public function GenerarOC(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $InfoPpto = DB::SELECT("SELECT VersionCliente, VersionInterna, IdProyecto, IdEmpresa "
                    . "FROM Presupuesto "
                    . "WHERE Id = ".$request->input('Hash'));
            
            $Nota = DB::SELECT("SELECT "
                    . "n.Texto "
                    . "FROM nota n "
                    . "INNER JOIN par_tipo_nota_legal p on n.IdTipoNota = p.IdTipoNota "
                    . "WHERE n.IdEmpresa = ".$InfoPpto[0]->IdEmpresa." "
                    . "AND p.Codificacion = 'NOTA_OC' ");
            
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
                $request->input('Hash'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $InfoPpto[0]->VersionInterna,
                $InfoPpto[0]->VersionCliente
            ];
            DB::INSERT($Query,$Data);
            array_push($id, DB::getPdo()->lastInsertId());

            
            //Inserto los Grupos en la Nueva Version
            $Query = 'INSERT INTO ordencompra ('
                . 'Fecha,'
                    . 'IdUsuario,'
                    . 'IdPpto,'
                    . 'IdProyecto,'
                    . 'IdProveedor,'
                    . 'Observacion,'
                    . 'VigenciaInicial,'
                    . 'VigenciaFinal,'
                    . 'FechaEntrega,'
                    . 'FechaRadicacion,'
                    . 'NotaLegal,'
                    . 'Lugar,'
                    . 'Estado,'
                    . 'IdFormaPago,'
                    . 'Notificacion'
                . ') '
                . 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $request->input('Hash'),
                $InfoPpto[0]->IdProyecto,
                parent::CodeDescrypt($request->input('Proveedor')),
                $request->input('Observaciones'),
                $request->input('VigenciaInicial'),
                $request->input('VigenciaFinal'),
                $request->input('FechaEntrega'),
                $request->input('FechaRadicacion'),
                $Nota[0]->Texto,
                $request->input('Lugar'),
                1,
                parent::CodeDescrypt($request->input('FormaPago')),
                $request->input('Correo'),
            ];
            DB::INSERT($Query,$Data);
            $IdOp = DB::getPdo()->lastInsertId();
            array_push($id, $IdOp);
            
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO oc_detalle ('
                            . 'Dias,'
                            . 'IdItem,'
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . 'OrdenCompra_Id'
                            . ') '
                            . 'SELECT '
                            . 'Dias,'
                            . ''.parent::CodeDescrypt($Items[$i]['Id']).','
                            . 'Unidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion_Interna,'
                            . ''.$IdOp.' '
                            . 'FROM item_grupos '
                            . ''
                            . 'WHERE Id = '.parent::CodeDescrypt($Items[$i]['Id']);
                    
                    DB::INSERT($Query);
                    array_push($id, DB::getPdo()->lastInsertId());
                    
                    $Query = 'UPDATE item_grupos SET Bloqueo = ?, IdOc = ? Where Id = ?';
                    $Data = [
                        1,
                        $IdOp,
                        parent::CodeDescrypt($Items[$i]['Id'])
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Items[$i]['Id']));
                }
            }
            
            $Asoc = \GuzzleHttp\json_decode($request->input('Asoc'));
            if( count($Asoc) > 0 ){
                for($i = 0; $i < count($Asoc);$i++){
                    $Asoc[$i] = (array) $Asoc[$i];
                    $Query = 'INSERT INTO oc_detalle ('
                            . 'Dias,'
                            . 'IdItem,'
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . 'OrdenCompra_Id'
                            . ') '
                            . 'SELECT '
                            . 'Dias,'
                            . ''.parent::CodeDescrypt($Asoc[$i]['Id']).','
                            . 'Cantidad,'
                            . 'ValorUnitario,'
                            . 'Volumen,'
                            . 'IdImpuesto,'
                            . 'Item,'
                            . 'Descripcion,'
                            . ''.$IdOp.' '
                            . 'FROM Asociados_Item '
                            . ''
                            . 'WHERE Id = '.parent::CodeDescrypt($Asoc[$i]['Id']);
                    DB::INSERT($Query);
                    array_push($id, DB::getPdo()->lastInsertId());
                    
                    $Query = 'UPDATE Asociados_Item SET Bloqueado = ?,IdOc = ? Where Id = ?';
                    $Data = [
                        1,
                        $IdOp,
                        parent::CodeDescrypt($Asoc[$i]['Id'])
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, parent::CodeDescrypt($Asoc[$i]['Id']));
                }
            }
            DB::commit();
            
            $Provee = DB::SELECT("SELECT NombreComercial FROM Proveedor WHERE IdProveedor = ".parent::CodeDescrypt($request->input('Proveedor')));
            
            $Info['Asunto'] = "Orden de Compra # ".$IdOp;
            $Info['RegistradoPor'] = "Process";
            $Info['TipoEnvio'] = "INFORMACIÓN SOBRE ORDEN DE COMPRA";
            $Info['Descripcion'] = "<p>Estimado Proveedor ".$Provee[0]->NombreComercial.", se ha emitido la Orden de Compra No. ".$IdOp."</p>";
            $Info['Link'] = "http://process.grupotesta.com.co:8989/PProcess3/public/13889e416790c50f0410449d8b5eaf3c43/".parent::CodeEncrypt($IdOp)."";
            $Info['Correos'] = $request->input('Correo');
            $Mensaje = "";           
            
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
            

            if( (new MailController)->Mail_NotificacionOrdenes($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje  = "Se ha notificado al Proveedor.";
            }else{
                $Mensaje = "No se logró notificar al Proveedor.";
            }
            
            return response()->json([
                'Info'=>parent::CodeEncrypt($IdOp),
                'Mensaje'=>$Mensaje
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
    public function CancelarOCPpto(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdOp = parent::CodeDescrypt($request->input('Hash'));
            $Query = 'UPDATE item_grupos SET Bloqueo = ?, IdOc = ? Where IdOc = ?';
            $Data = [
                0,
                NULL,
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            
            array_push($id, $IdOp);
            $Query = 'UPDATE Asociados_Item SET Bloqueado = ?,IdOc = ? Where IdOc = ?';
            $Data = [
                0,
                NULL,
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $IdOp);
            
            $Query = 'UPDATE ordencompra SET MotivoCancelacion = ?,UsuarioCancelacion = ?, FechaCancelacion = ? Where Id = ?';
            $Data = [
                $request->input('ObservacionesPpto'),
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $IdOp
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $IdOp);
            
            DB::commit();
            
            return response()->json([
                'Info'=>parent::CodeEncrypt($IdOp)
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



