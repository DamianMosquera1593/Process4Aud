<?php

namespace App\Http\Controllers\Process\Cliente;

use App\Http\Controllers\Controller;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\MailController;


class ClienteController extends Controller
{
    //08e205ac22a40354eabb20f5b2818fea
    public function index()
    {
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('process.clientes.gestion');
        } else {
            return view('auth.login')->with('Error','Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    //c8ae7480ffcec046eff032acc95a16a42
    public function Cliente_CamposAdicionales(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|int',
        ]);
        $Data = DB::SELECT(""
                    . "SELECT "
                    . "Id as Hash, Nombre "
                    . "FROM parcliente_tipodesarrollo_camposadicionales "
                    . "WHERE Estado = 1 AND IdTipoDesarrollo = ".parent::CodeDescrypt( $credentials['Hash'] ));
        return response()->json([
            "Info"=>$Data,
            'success' => true
        ]);
    }
    
    //c8ae7480ffcec046eff032acc95a16a4
    public function ClienteListarData(Request $request){
        $credentials = $this->validate($request, [
            'Hash' => 'required|int',
        ]);
        $Data = "";
        if( $credentials['Hash'] == 1 ){
            $Data = DB::SELECT(""
                    . "SELECT "
                    . "Id as Hash, Nombre, Descripcion "
                    . "FROM parcliente_tiposolicitud "
                    . "WHERE Estado = 1");
        }
        if( $credentials['Hash'] == 2 ){
            $Data = DB::SELECT(""
                    . "SELECT "
                    . "Id as Hash, Nombre, Descripcion "
                    . "FROM parcliente_tipodesarrollo "
                    . "WHERE Estado = 1");
        }
        if( $credentials['Hash'] == 3 ){
            $Data = DB::SELECT(""
                    . "SELECT "
                    . "Id as Hash, Nombre as Sector "
                    . "FROM parcliente_sectores "
                    . "WHERE Estado = 1");
            foreach($Data as $d){
                $Detalle = DB::SELECT("SELECT Id as Hash, Nombre as Detalle "
                        . "FROM parcliente_detallesector "
                        . "where IdSector = ".$d->Hash." "
                        . "AND Estado = 1 "
                        . "ORDER BY Nombre");
                foreach( $Detalle as $dd ){
                    $dd->Hash = parent::CodeEncrypt($dd->Hash);
                }
                $d->DSector = $Detalle;
            }
        }
        if( $credentials['Hash'] == 4 ){
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $Data = DB::SELECT("SELECT pc.Id as Hash, pc.Nombre as Producto "
                    . ""
                    . "FROM par_usuariocliente pu "
                    . "INNER JOIN productocliente pc on pc.Id = pu.IdProducto and pc.IdCliente = pu.IdCliente "
                    . "WHERE pu.IdUsuario = ".$Usuario->IdUsuario
                    . " ORDER BY pc.Nombre "
                    . "");
        }
        if( $credentials['Hash'] == 5 ){
            $Data = DB::SELECT(""
                    . "SELECT "
                    . "Id as Hash, Nombre as Material "
                    . "FROM parcliente_tipomaterial "
                    . "WHERE Estado = 1");
            foreach($Data as $d){
                $Detalle = DB::SELECT("SELECT Id as Hash, Nombre as Detalle "
                        . "FROM parcliente_medio "
                        . "where IdTipoMaterial = ".$d->Hash." "
                        . "AND Estado = 1 "
                        . "ORDER BY Nombre");
                foreach( $Detalle as $dd ){
                    $dd->Hash = parent::CodeEncrypt($dd->Hash);
                }
                $d->Medio = $Detalle;
            }
        }
        
        foreach($Data as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        
        return response()->json([
            "Info"=>$Data,
            'success' => true
        ]);
    }
    
    //c569fc8266c92dbd65aac696064785ee
    public function SaveRequerimientoCliente(Request $request){

        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Empresa = DB::SELECT("SELECT IdEmpresa from par_usuarioempresa where IdUsuario = '" . $sqlUser[0]->IdUsuario . "'");
            $Unidad = DB::SELECT("SELECT IdUnidad from par_usuariounidad where IdUsuario = '" . $sqlUser[0]->IdUsuario . "'");
            $Cliente = DB::SELECT("SELECT IdCliente FROM ProductoCliente WHERE Id = ".parent::CodeDescrypt($request->input('Producto')));
            $id = Array();
            
            $SqlLider = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE IdSubordinado = ".$sqlUser[0]->IdUsuario);
            $Estado = 1;
            if( count($SqlLider) != 0 ){
                $Estado = 10;
            }
            
            //
            $Query = 'INSERT INTO Cliente_Requerimientos '
                    . '('
                    . 'IdProducto,'
                    . 'ObjetivosComunicacion,'
                    . 'Dirigido,'
                    . 'DescRequerimiento,'
                    . 'Mandatorios,'
                    . 'FechaSalida,'
                    . 'IdSolicitante,'
                    . 'IdTipoSolicitud,'
                    . 'IdTipoDesarrollo,'
                    . 'Estado,'
                    . 'Fecha,'
                    . 'Asunto,'
                    . 'IdCliente,'
                    . 'IdEmpresa,'
                    . 'IdUnidad'
                    . ') values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                parent::CodeDescrypt($request->input('Producto')),
                $request->input('ObjetivosComunicacion'),
                $request->input('DirigidoA'),
                $request->input('DescRequerimiento'),
                $request->input('Mandatorios'),
                $request->input('FechaSalida'),
                $sqlUser[0]->IdUsuario,
                parent::CodeDescrypt($request->input('TipoSolicitud')),
                parent::CodeDescrypt($request->input('TipoDesarrollo')),
                $Estado,
                date("Y-m-d H:i:s"),
                $request->input('AsuntoRefRequerimiento'),
                $Cliente[0]->IdCliente,
                $Empresa[0]->IdEmpresa,
                $Unidad[0]->IdUnidad,
            ];
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //Cliente_Requerimiento_Sector
            $Sectores = \GuzzleHttp\json_decode($request->input('Sectores'));
            if( count($Sectores) > 0 ){
                for($i = 0; $i < count($Sectores);$i++){
                    $Sectores[$i] = (array) $Sectores[$i];
                    $Sector = DB::SELECT("SELECT s.Id "
                            . "FROM parCliente_Sectores s "
                            . "INNER JOIN parCliente_DetalleSector d on s.Id = d.IdSector "
                            . "WHERE "
                            . "d.Id = ".parent::CodeDescrypt($Sectores[$i]['Id']));
                    $idx = DB::table('Cliente_Requerimiento_Sector')
                    ->insertGetId([
                        'Fecha' => date("Y-m-d H:i:s"),
                        'IdUsuario' => $sqlUser[0]->IdUsuario,
                        'IdDetalle' => parent::CodeDescrypt($Sectores[$i]['Id']),
                        'IdSector' => $Sector[0]->Id,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            //Cliente_Requerimiento_Piezas
            $Materiales = \GuzzleHttp\json_decode($request->input('Materiales'));
            if( count($Materiales) > 0 ){
                for($i = 0; $i < count($Materiales);$i++){
                    $Materiales[$i] = (array) $Materiales[$i];
                    $Mat = DB::SELECT("SELECT s.Id "
                            . "FROM parCliente_TipoMaterial s "
                            . "INNER JOIN parCliente_Medio d on s.Id = d.IdTipoMaterial "
                            . "WHERE "
                            . "d.Id = ".parent::CodeDescrypt($Materiales[$i]['Hash']));
                    $idx = DB::table('Cliente_Requerimiento_Piezas')
                    ->insertGetId([
                        'Fecha' => date("Y-m-d H:i:s"),
                        'IdUsuario' => $sqlUser[0]->IdUsuario,
                        'IdMedio' => parent::CodeDescrypt($Materiales[$i]['Hash']),
                        'Cantidad' => ($Materiales[$i]['Num']),
                        'IdTipoMaterial' => $Mat[0]->Id,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $Carpeta = date("Y")."".date("m")."".date("d");
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            
            DB::commit();
            
            $Info['Asunto'] = "Requerimiento No. ".$IdRequerimiento." Creado";
            $Info['Descripcion'] = "Se ha generado el Requerimiento No. $IdRequerimiento por ".$sqlUser[0]->NombreUsuario."<br><strong>Referencia</strong>:".$request->input('AsuntoRefRequerimiento');
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            if( count($SqlLider) != 0 ){
                $Info['Correos'] = $SqlLider[0]->Correo;
                $Info['UsuariosN'] = $SqlLider[0]->NombreUsuario;
            }else{
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            }
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1,
                'Msj' => $Mensaje
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    
    //f45b0d4eb8c9dfe3a63f35c9ec7b9f05
    public function Cliente_EscalarReqAgencia(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                parent::CodeDescrypt($request->input('Hash')),
                "Requerimiento enviado para revisión Agencia.",
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            
            
            DB::INSERT($Query,$Data);
            array_push($id, $IdRequerimiento );
            
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                1,
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            
            
            DB::INSERT($Query,$Data);
            array_push($id, $IdRequerimiento );
            DB::commit();
            
            
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            
            $SqlLider = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE IdSubordinado = ".$sqlUser[0]->IdUsuario);
            $Info['Asunto'] = "Nuevo Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha enviado a la Agencia el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: Revisar y Tramitar.";
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //
    public function Cliente_ListarRequerimientosVigentes(Request $request){
        
        $draw = $request['draw'];
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $id = $sqlUser[0]->IdUsuario;

        $sqlAdicional = "";

        $CompartidosConmigo = DB::SELECT("SELECT IdUsuarioLider "
                . "FROM Cliente_Requerimiento_Compartidos "
                . "WHERE IdUsuarioComparte = $id");
        $sIn = "( ".$id;
        if( count($CompartidosConmigo) == 0 ){
            $sIn .= ")";
        }else{
            $tt = count($CompartidosConmigo);
            $yo = 1;
            foreach($CompartidosConmigo as $op){
                $sIn .= ", ".$op->IdUsuarioLider;
                $yo++;
            }
            $sIn .= ")";
        }
        $sqlFrom = "FROM "
                . "cliente_requerimientos cr "
                . "INNER JOIN usuario u on cr.IdSolicitante = u.idusuario "
                . "INNER JOIN parCliente_TipoSolicitud tp on cr.IdTipoSolicitud = tp.Id "
                . "INNER JOIN parCliente_TipoDesarrollo td on cr.IdTipoDesarrollo = td.Id "
                . "INNER JOIN productocliente pr on cr.IdProducto = pr.Id "
                //. "INNER JOIN par_usuariocliente pus on pus.IdCliente = cr.IdCliente AND pus.IdProducto = cr.IdProducto AND pus.IdUsuario = ".$id." "
                . "where cr.IdSolicitante in $sIn "
                . "AND cr.Estado in (1,2,3,4,5,6,9,10) ";

        $sqlCampos = " DISTINCT "
                . "cr.Id as NumRequerimiento, ".$sqlUser[0]->IdUsuario." as UsuarioR, "
                . "cr.Id as Hash, case when isnull(cr.FechaEntrega) then '' else cr.FechaEntrega end as FechaEntrega,"
                . "cr.Asunto,"
                . "DATE_FORMAT(cr.Fecha,'%Y-%m-%d') as FechaC,"
                . "DATE_FORMAT(cr.Fecha,'%T') as HoraC,"
                . "tp.Nombre as TipoSolicitud,"
                . "td.Nombre as TipoDesarrollo,"
                . "pr.Nombre as Producto,"
                . "u.NombreUsuario as Creador,"
                . "CASE "
                    . "WHEN cr.Estado = 1 THEN 'En Revisión Agencia' "
                    . "WHEN cr.Estado = 2 THEN 'Asignada en Proceso' "
                    . "WHEN cr.Estado = 3 THEN 'Devuelvo a Cliente' "
                    . "WHEN cr.Estado = 4 THEN 'En Aprobación Cliente' "
                    . "WHEN cr.Estado = 5 THEN 'En Ajuste' "
                    . "WHEN cr.Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                    . "WHEN cr.Estado = 9 THEN 'Suspendido Temporalmente' "
                    . "WHEN cr.Estado = 10 THEN 'Pendiente de Trámite' "
                . "END as NEstado,"
                . "cr.Estado "
                ;

        $ResumenRequerimientos = DB::SELECT("SELECT "
                . "CASE "
                    . "WHEN cr.Estado = 1 THEN 'En Revisión Agencia' "
                    . "WHEN cr.Estado = 2 THEN 'Asignada en Proceso' "
                    . "WHEN cr.Estado = 3 THEN 'Devuelvo a Cliente' "
                    . "WHEN cr.Estado = 4 THEN 'En Aprobación Cliente' "
                    . "WHEN cr.Estado = 5 THEN 'En Ajuste' "
                    . "WHEN cr.Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                    . "WHEN cr.Estado = 9 THEN 'Suspendido Temporalmente' "
                    . "WHEN cr.Estado = 10 THEN 'Pendiente de Trámite' "
                . "END as NEstado, COUNT(DISTINCT cr.Id) AS NUM_REQUERIMIENTOS "
                . $sqlFrom
                . " GROUP BY cr.Estado ");
        
        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                    . "cr.Id like '%".$searchValue."%' or "
                    . "cr.Asunto like '%".$searchValue."%' or "
                    . "cr.ObjetivosComunicacion like '%".$searchValue."%' or "
                    . "cr.Dirigido like '%".$searchValue."%' or "
                    . "cr.DescRequerimiento like '%".$searchValue."%' or "
                    . "cr.Mandatorios like '%".$searchValue."%' or "
                    . "cr.Fecha like '%".$searchValue."%' or "
                    . "tp.Nombre like '%".$searchValue."%' or "
                    . "td.Nombre like '%".$searchValue."%' or "
                    . "pr.Nombre like '%".$searchValue."%' or "
                    . "u.NombreUsuario like '%".$searchValue."%' "
                   . ") ";
        }
        $searchEstado = $request['search']['estado'];
        if($searchEstado != ''){
            if( $searchEstado != 0 ){
                $searchQuery .= " and cr.Estado = ".$searchEstado." ";
            }
           
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        foreach($empRecords['empRecords'] as $row){
            
            //$row->FechaSalidaN = $row->FechaSalida;
            
            //$Temp = explode("-",$row->FechaSalida);
            //$row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaC);
            $row->FechaC = parent::NombreDia($row->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $row->FechaEntregaN = $row->FechaEntrega;
            if( !empty($row->FechaEntrega) ){
                $Temp = explode("-",$row->FechaEntrega);
                $row->FechaEntrega = parent::NombreDia($row->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }else{
                $row->FechaEntrega = "";
            }
            $Status = DB::SELECT("SELECT CASE WHEN ISNULL(sx.Status) THEN '' ELSE sx.Status END as Status  "
                    . "From Cliente_Requerimiento_Status sx "
                    . "WHERE sx.Id = ("
                    . "SELECT MAX(s.Id) as Hash "
                    . "From Cliente_Requerimiento_Status s "
                    . "WHERE s.IdRequerimiento = ".$row->Hash 
                    . " )");
            $Estatus = "";
            if( count($Status) != 0 ){
                $Estatus = nl2br($Status[0]->Status);
            }
            
            $NumPiezas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad from Cliente_Requerimiento_Piezas where idrequerimiento = ".$row->Hash." group by idrequerimiento");
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "NumRequerimiento"=>($row->NumRequerimiento),
                "FechaC"=>($row->FechaC),
                "UsuarioR"=>($row->UsuarioR),
                "FechaEntrega"=>($row->FechaEntrega),
                "HoraC"=>$row->HoraC,
                "NroPiezas"=>$NumPiezas[0]->Cantidad,
                "Status"=> $Estatus,
                "Asunto"=> $row->Asunto,
                "TipoSolicitud"=>$row->TipoSolicitud,
                "TipoDesarrollo"=>$row->TipoDesarrollo,
                "Producto"=>$row->Producto,
                "Creador"=>$row->Creador,
                "NEstado"=>$row->NEstado,
                "Estado"=>$row->Estado,
                "ResumenRequerimientos"=>$ResumenRequerimientos,
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
    
    //017de185ebf69d481ab27df257bfee87EF
    public function Cliente_StatusRequerimientoEF(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                $request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            
            
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$IdRequerimiento);
                $Carpeta = $sq[0]->Fecha;
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                $Fecha = date("Y-m-d");
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $Fecha."-".$request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'FechaEntrega = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                $request->input('NFechaEntrega'),
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            DB::UPDATE($Query,$Data);
            array_push($id, $IdRequerimiento );
            
            DB::commit();
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            $SqlLider = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE p.IdLider = ".$sqlUser[0]->IdUsuario." and p.IdSubordinado = ".$sqlS[0]->IdSolicitante);
            $SqlLider2 = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE p.IdSubordinado = ".$sqlUser[0]->IdUsuario." and p.IdLider = ".$sqlS[0]->IdSolicitante);
            $Estado = 1;
            if( count($SqlLider) != 0 ){
                $Info['Asunto'] = "Modificación de Fecha Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            }else if( count($SqlLider2) != 0 ){
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                
                $Info['Correos'] = $SqlLider2[0]->Correo;
                $Info['UsuariosN'] = $SqlLider2[0]->NombreUsuario;
            }else if($sqlS[0]->IdSolicitante == $sqlUser[0]->IdUsuario && count($SqlLider2) == 0){
                $Info['Asunto'] = "Modificación de Fecha Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            }else{
                $Info['Asunto'] = "Modificación de Fecha Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = "Cindy Romero";
                
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            }
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    
    //017de185ebf69d481ab27df257bfee87
    public function Cliente_StatusRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                $request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$IdRequerimiento);
                $Carpeta = $sq[0]->Fecha;
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                $Fecha = date("Y-m-d");
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $Fecha."-".$request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            
            DB::commit();
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            $SqlLider = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE p.IdLider = ".$sqlUser[0]->IdUsuario." and p.IdSubordinado = ".$sqlS[0]->IdSolicitante);
            $SqlLider2 = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE p.IdSubordinado = ".$sqlUser[0]->IdUsuario." and p.IdLider = ".$sqlS[0]->IdSolicitante);
            $Estado = 1;
            if( count($SqlLider) != 0 ){
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            }else if( count($SqlLider2) != 0 ){
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                
                $Info['Correos'] = $SqlLider2[0]->Correo;
                $Info['UsuariosN'] = $SqlLider2[0]->NombreUsuario;
            }else if($sqlS[0]->IdSolicitante == $sqlUser[0]->IdUsuario && count($SqlLider2) == 0){
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            }else{
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = "Cindy Romero";
                
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            }
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //017de185ebf69d481ab27df257bfee87
    public function Cliente_EnviarAgenciaRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                "SE ENVÍA REQUERIMIENTO A LA AGENCIA PARA REVISIÓN",
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$IdRequerimiento);
                $Carpeta = $sq[0]->Fecha;
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                $Fecha = date("Y-m-d");
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $Fecha."-".$request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            
            DB::commit();
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            if($sqlS[0]->IdSolicitante == $sqlUser[0]->IdUsuario){
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            }else{
                $Info['Asunto'] = "Nuevo Status Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))."";
                $Info['Descripcion'] = "Se ha generado un Nuevo Status sobre el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = "Cindy Romero";
                
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            }
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //017de185ebf69d481ab27df257bfee872
    public function Cliente_ResponsabilidadStatus(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO cliente_requerimientos_evaluacion_reprocesos '
                    . '('
                    . 'IdRequerimiento,'
                    . 'IdStatus,'
                    . 'Tipo,'
                    . 'Justificacion,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                parent::CodeDescrypt($request->input('Hash2')),
                $request->input('Responsabilidad'),
                $request->input('JUSTResponsabilidad'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            
            DB::commit();
            
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //c50cb56aed832b28522210592567bdd3
    public function Cliente_HistoricoRequerimiento(Request $request){
        $sql = DB::SELECT("SELECT "
                . "s.Status, s.Id as Hash, "
                . "u.NombreUsuario as Creador, "
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as FechaC,"
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as Rut,"
                . "DATE_FORMAT(s.Fecha, '%T') as HoraC "
                . "FROM Cliente_Requerimiento_Status s "
                . "INNER JOIN Usuario u on s.IdUsuario = u.IdUsuario "
                . "WHERE s.IdRequerimiento = ".parent::CodeDescrypt($request->input("Hash"))." "
                . "ORDER BY s.Fecha DESC");
        foreach( $sql as $d ){
            $Reproceso = strrpos($d->Status,"REQUERIMIENTO NO APROBADO POR CLIENTE");
            if ($Reproceso === false){
                $d->Eval = 0;
            }else{
                
                $Evaluacion = DB::SELECT("SELECT "
                    . "c.Id,c.IdRequerimiento, c.Tipo, c.Justificacion "
                    . "FROM cliente_requerimientos_evaluacion_reprocesos c "
                    . "INNER JOIN Usuario u on c.IdUsuario = u.IdUsuario "
                    . "WHERE IdStatus = ".$d->Hash);
                foreach( $Evaluacion as $ev ){
                    $ev->Justificacion = nl2br($ev->Justificacion);
                }
                $d->Eval = 1;
                $d->Evaluacion = $Evaluacion;
            }
            $d->Reproceso = $Reproceso;
            $d->Status = nl2br($d->Status);
            
            //$row->FechaSalidaN = $row->FechaSalida;
            
            //$Temp = explode("-",$row->FechaSalida);
            //$row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$d->FechaC);
            $d->FechaC = parent::NombreDia($d->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Adjuntos = DB::SELECT("SELECT DISTINCT cee.Id,"
                    . "cee.Archivo, cee.Ruta as Carpeta, 'Old' AS Tipo "
                    . "FROM adjuntostareas cee "
                    . "INNER JOIN Subtareas t on cee.IdSubtarea = t.Id "
                    . "INNER JOIN cliente_requerimientos_entregables ceee on t.Id = ceee.IdSubtarea "
                    . "WHERE ceee.IdStatus = ".$d->Hash." "
                    . "UNION ALL "
                    . "SELECT t.Id, t.Nombre as Archivo,".$d->Rut." as Carpeta, 'New' as Tipo "
                    . "FROM Cliente_Requerimientos_Adjuntos t "
                    . "INNER JOIN cliente_requerimientos c on t.IdRequerimiento = c.Id "
                    . "AND t.IdRequerimiento = ".parent::CodeDescrypt($request->input("Hash"))." AND "
                    . "t.Nombre Like '".$d->Rut."%'"
                    );
            foreach( $Adjuntos as $ad ){
                $ad->Hash = parent::CodeEncrypt($ad->Id);
            }
            $d->Adjuntos = $Adjuntos;
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        return response()->json([
            "Info"=>$sql,
            
            'CLIENTES_MARCAR_REPROCESOS' => (new Controller)->ValidarPermisoUsuario("CLIENTES_MARCAR_REPROCESOS",session('keyUser'),0),
            'success' => true
        ]);
    }
    
    //017de185ebf69d481ab27df257bfee87
    public function Cliente_CancelacionRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                "SE CANCELA EL REQUERIMIENTO.\n".$request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'CancelacionText = ? ,'
                    . 'FechaCancelacion = ?,'
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                $request->input('Status'),
                date("Y-m-d H:i:s"),
                8,
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            DB::UPDATE($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            DB::commit();
            
            $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." se ha Cancelado.";
            $Info['Descripcion'] = "Se ha cancelado el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
            $Info['UsuariosN'] = "Cindy Romero";
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //b7b5d800ff7fbdb762dd32a6ab788aa4
    public function Cliente_ListarHistoricoRequerimientosVigentes(Request $request){
        
        $draw = $request['draw'];
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $id = $sqlUser[0]->IdUsuario;

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "cliente_requerimientos cr "
                . "INNER JOIN usuario u on cr.IdSolicitante = u.idusuario "
                . "INNER JOIN parCliente_TipoSolicitud tp on cr.IdTipoSolicitud = tp.Id "
                . "INNER JOIN parCliente_TipoDesarrollo td on cr.IdTipoDesarrollo = td.Id "
                . "INNER JOIN productocliente pr on cr.IdProducto = pr.Id "
                . "where cr.IdSolicitante = $id "
                . "AND cr.Estado in (7,8) ";

        $sqlCampos = " "
                . "cr.Id as NumRequerimiento,"
                . "cr.Id as Hash,"
                . "cr.Asunto,"
                . "DATE_FORMAT(cr.Fecha,'%Y-%m-%d') as FechaC, case when isnull(cr.FechaEntrega) then '' else cr.FechaEntrega end as FechaEntrega,"
                . "DATE_FORMAT(cr.Fecha,'%T') as HoraC,"
                . "tp.Nombre as TipoSolicitud,"
                . "td.Nombre as TipoDesarrollo,"
                . "pr.Nombre as Producto,"
                . "u.NombreUsuario as Creador,"
                . "CASE "
                    . "WHEN cr.Estado = 8 THEN 'Cancelada' "
                    . "WHEN cr.Estado = 7 THEN 'Cerrada / Finalizada' " 
                . "END as NEstado,"
                . "cr.Estado "
                ;

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                    . "cr.Id like '%".$searchValue."%' or "
                    . "cr.Asunto like '%".$searchValue."%' or "
                    . "cr.ObjetivosComunicacion like '%".$searchValue."%' or "
                    . "cr.Dirigido like '%".$searchValue."%' or "
                    . "cr.DescRequerimiento like '%".$searchValue."%' or "
                    . "cr.Mandatorios like '%".$searchValue."%' or "
                    . "cr.Fecha like '%".$searchValue."%' or "
                    . "tp.Nombre like '%".$searchValue."%' or "
                    . "td.Nombre like '%".$searchValue."%' or "
                    . "pr.Nombre like '%".$searchValue."%' or "
                    . "u.NombreUsuario like '%".$searchValue."%' "
                   . ") ";
        }
        $searchEstado = $request['search']['estado'];
        if($searchEstado != ''){
            if( $searchEstado != 0 ){
                $searchQuery .= " and cr.Estado = ".$searchEstado." ";
            }
           
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        foreach($empRecords['empRecords'] as $row){
            //$row->FechaSalidaN = $row->FechaSalida;
            
            //$Temp = explode("-",$row->FechaSalida);
            //$row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaC);
            $row->FechaC = parent::NombreDia($row->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $row->FechaEntregaN = $row->FechaEntrega;
            if( !empty($row->FechaEntrega) ){
                $Temp = explode("-",$row->FechaEntrega);
                $row->FechaEntrega = parent::NombreDia($row->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }else{
                $row->FechaEntrega = "";
            }
            $Status = DB::SELECT("SELECT CASE WHEN ISNULL(sx.Status) THEN '' ELSE sx.Status END as Status  "
                    . "From Cliente_Requerimiento_Status sx "
                    . "WHERE sx.Id = ("
                    . "SELECT MAX(s.Id) as Hash "
                    . "From Cliente_Requerimiento_Status s "
                    . "WHERE s.IdRequerimiento = ".$row->Hash 
                    . " )");
            $Estatus = "";
            if( count($Status) != 0 ){
                $Estatus = nl2br($Status[0]->Status);
            }
            $NumPiezas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad from Cliente_Requerimiento_Piezas where idrequerimiento = ".$row->Hash." group by idrequerimiento");
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "NumRequerimiento"=>($row->NumRequerimiento),
                "FechaC"=>($row->FechaC),
                "Asunto"=>($row->Asunto),
                "HoraC"=>$row->HoraC,
                "NroPiezas"=>$NumPiezas[0]->Cantidad,
                "FechaEntrega"=>$row->FechaEntrega,
                "Status"=> $Estatus,
                "TipoSolicitud"=>$row->TipoSolicitud,
                "TipoDesarrollo"=>$row->TipoDesarrollo,
                "Producto"=>$row->Producto,
                "Creador"=>$row->Creador,
                "NEstado"=>$row->NEstado,
                "Estado"=>$row->Estado,
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
    public function Cliente_ListarRequerimientosVigentesRevisor(Request $request){
        
        $draw = $request['draw'];
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $id = $sqlUser[0]->IdUsuario;

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "cliente_requerimientos cr "
                . "INNER JOIN usuario u on cr.IdSolicitante = u.idusuario "
                . "INNER JOIN parCliente_TipoSolicitud tp on cr.IdTipoSolicitud = tp.Id "
                . "INNER JOIN parCliente_TipoDesarrollo td on cr.IdTipoDesarrollo = td.Id "
                . "INNER JOIN productocliente pr on cr.IdProducto = pr.Id "
                . "INNER JOIN Par_UsuarioCliente pcc on cr.IdProducto = pcc.IdProducto "
                . ""
                . "where pcc.IdUsuario = $id "
                . " ";

        $sqlCampos = " "
                . "DISTINCT cr.Id as NumRequerimiento,"
                . "cr.Id as Hash,"
                . "cr.Asunto,"
                . "DATE_FORMAT(cr.Fecha,'%Y-%m-%d') as FechaC, case when isnull(cr.FechaEntrega) then '' else cr.FechaEntrega end as FechaEntrega,"
                . "DATE_FORMAT(cr.Fecha,'%T') as HoraC,"
                . "tp.Nombre as TipoSolicitud,"
                . "td.Nombre as TipoDesarrollo,"
                . "pr.Nombre as Producto, cr.FechaSalida,"
                . "u.NombreUsuario as Creador,"
                . "CASE "
                    . "WHEN cr.Estado = 1 THEN 'En Revisión Agencia' "
                    . "WHEN cr.Estado = 2 THEN 'Asignada en Proceso' "
                    . "WHEN cr.Estado = 3 THEN 'Devuelvo a Cliente' "
                    . "WHEN cr.Estado = 4 THEN 'En Aprobación Cliente' "
                    . "WHEN cr.Estado = 5 THEN 'En Ajuste' "
                    . "WHEN cr.Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                    . "WHEN cr.Estado = 8 THEN 'Cancelada' "
                    . "WHEN cr.Estado = 7 THEN 'Cerrada / Finalizada' " 
                    . "WHEN cr.Estado = 9 THEN 'Suspendido Temporalmente' "
                . "END as NEstado,"
                . "cr.Estado "
                ;
        $ResumenRequerimientos = DB::SELECT("SELECT "
                . "CASE "
                    . "WHEN cr.Estado = 1 THEN 'En Revisión Agencia' "
                    . "WHEN cr.Estado = 2 THEN 'Asignada en Proceso' "
                    . "WHEN cr.Estado = 3 THEN 'Devuelvo a Cliente' "
                    . "WHEN cr.Estado = 4 THEN 'En Aprobación Cliente' "
                    . "WHEN cr.Estado = 5 THEN 'En Ajuste' "
                    . "WHEN cr.Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                    . "WHEN cr.Estado = 8 THEN 'Cancelada' "
                    . "WHEN cr.Estado = 7 THEN 'Cerrada / Finalizada' " 
                    . "WHEN cr.Estado = 9 THEN 'Suspendido Temporalmente' "
                . "END as NEstado, COUNT(DISTINCT cr.Id) AS NUM_REQUERIMIENTOS "
                . $sqlFrom
                . " GROUP BY cr.Estado ");
        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                    . "cr.Id like '%".$searchValue."%' or "
                    . "cr.Asunto like '%".$searchValue."%' or "
                    . "cr.FechaSalida like '%".$searchValue."%' or "
                    . "cr.ObjetivosComunicacion like '%".$searchValue."%' or "
                    . "cr.Dirigido like '%".$searchValue."%' or "
                    . "cr.DescRequerimiento like '%".$searchValue."%' or "
                    . "cr.Mandatorios like '%".$searchValue."%' or "
                    . "cr.Fecha like '%".$searchValue."%' or "
                    . "tp.Nombre like '%".$searchValue."%' or "
                    . "td.Nombre like '%".$searchValue."%' or "
                    . "pr.Nombre like '%".$searchValue."%' or "
                    . "u.NombreUsuario like '%".$searchValue."%' "
                   . ") ";
        }
        $searchEstado = $request['search']['estado'];
        if($searchEstado != ''){
            if( $searchEstado != 0 ){
                $searchQuery .= " and cr.Estado = ".$searchEstado." ";
            }
           
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;

        foreach($empRecords['empRecords'] as $row){
            $Ot = DB::SELECT("SELECT p.Codigo "
                    . "FROM Proyectos p "
                    . "INNER JOIN proyecto_requerimientocliente pr ON pr.IdRequerimiento =".$row->Hash." AND p.Id = pr.IdProyecto "
                    . "");
            $NumOt = "";
            if( !empty($Ot) ){
                $NumOt = $Ot[0]->Codigo;
            }
            $Status = DB::SELECT("SELECT CASE WHEN ISNULL(sx.Status) THEN '' ELSE sx.Status END as Status  "
                    . "From Cliente_Requerimiento_Status sx "
                    . "WHERE sx.Id = ("
                    . "SELECT MAX(s.Id) as Hash "
                    . "From Cliente_Requerimiento_Status s "
                    . "WHERE s.IdRequerimiento = ".$row->Hash 
                    . " )");
            $Estatus = "";
            if( count($Status) != 0 ){
                $Estatus = nl2br($Status[0]->Status);
            }
            $row->FechaSalidaN = $row->FechaSalida;
            
            $Temp = explode("-",$row->FechaSalida);
            $row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaC);
            $row->FechaC = parent::NombreDia($row->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $row->FechaEntregaN = $row->FechaEntrega;
            if( !empty($row->FechaEntrega) ){
                $Temp = explode("-",$row->FechaEntrega);
                $row->FechaEntrega = parent::NombreDia($row->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            
            $FechaActual = date("Y-m-d");
            
            $NumPiezas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad from Cliente_Requerimiento_Piezas where idrequerimiento = ".$row->Hash." group by idrequerimiento");
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Hash),
                "NumRequerimiento"=>($row->NumRequerimiento),
                "FechaC"=>($row->FechaC),
                "NumOt"=>$NumOt,
                "FechaActual"=>$FechaActual,
                "Asunto"=>($row->Asunto),
                "FechaEntregaN"=>($row->FechaEntregaN),
                "FechaSalida"=>($row->FechaSalida),
                "FechaSalidaN"=>($row->FechaSalidaN),
                "HoraC"=>$row->HoraC,
                "FechaEntrega"=>$row->FechaEntrega,
                "NroPiezas"=>$NumPiezas[0]->Cantidad,
                "Status"=> $Estatus,
                "TipoSolicitud"=>$row->TipoSolicitud,
                "TipoDesarrollo"=>$row->TipoDesarrollo,
                "Producto"=>$row->Producto,
                "Creador"=>$row->Creador,
                "NEstado"=>$row->NEstado,
                "Estado"=>$row->Estado,
                "ResumenRequerimientos" => $ResumenRequerimientos,
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
    
    //f76cd2629e05e2fe6c0ec7d722398617
    public function Cliente_SuspenderRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                "SE SUSPENDETE EL REQUERIMIENTO.\n".$request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                9,
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            DB::UPDATE($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            DB::commit();
            
            $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." se ha Suspendido.";
            $Info['Descripcion'] = "Se ha suspendido el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
            $Info['UsuariosN'] = "Cindy Romero";
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //89c9d855228d861476db396134e45239
    public function Cliente_ReactivarRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                "SE REACTIVA EL REQUERIMIENTO.\n".$request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                1,
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            DB::UPDATE($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            DB::commit();
            
            $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." se ha Reactivado.";
            $Info['Descripcion'] = "Se ha reactivado el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
            $Info['UsuariosN'] = "Cindy Romero";
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //a693dac80ae4ca3a932b4ce06cd688a2
    public function Cliente_BloquearRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Hash = parent::CodeDescrypt( $request->input('Hash') );
            $ConBloqueo = DB::SELECT("SELECT Bloqueo FROM cliente_requerimientos "
                    . "WHERE Id = ".$Hash);
            if( $ConBloqueo[0]->Bloqueo == 0 ){
                //
                $Query = 'UPDATE cliente_requerimientos SET '
                        . 'Bloqueo = ?, FechaBloqueo = ?, IdUsuarioBloqueo = ? '
                        . 'WHERE Id = ?'
                        . '';
                $Data = [
                    1,
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario,
                    0//$Hash
                ];

                DB::UPDATE($Query,$Data);
                array_push( $id, 0 );
                //array_push( $id, $Hash );
                
                $sql = DB::SELECT("SELECT "
                . "s.Status, s.Id as Hash, "
                . "u.NombreUsuario as Creador, "
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as FechaC,"
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as Rut,"
                . "DATE_FORMAT(s.Fecha, '%T') as HoraC "
                . "FROM Cliente_Requerimiento_Status s "
                . "INNER JOIN Usuario u on s.IdUsuario = u.IdUsuario "
                . "WHERE s.IdRequerimiento = ".parent::CodeDescrypt($request->input("Hash"))." "
                . "ORDER BY s.Fecha DESC");
                foreach( $sql as $d ){
                    $d->Status = nl2br($d->Status);

                    //$row->FechaSalidaN = $row->FechaSalida;

                    //$Temp = explode("-",$row->FechaSalida);
                    //$row->FechaSalida = parent::NombreDia($row->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

                    $Temp = explode("-",$d->FechaC);
                    $d->FechaC = parent::NombreDia($d->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

                    $Adjuntos = DB::SELECT("SELECT DISTINCT cee.Id,"
                            . "cee.Archivo, cee.Ruta as Carpeta, 'Old' AS Tipo "
                            . "FROM adjuntostareas cee "
                            . "INNER JOIN Subtareas t on cee.IdSubtarea = t.Id "
                            . "INNER JOIN cliente_requerimientos_entregables ceee on t.Id = ceee.IdSubtarea "
                            . "WHERE ceee.IdStatus = ".$d->Hash." "
                            . "UNION ALL "
                            . "SELECT t.Id, t.Nombre as Archivo,".$d->Rut." as Carpeta, 'New' as Tipo "
                            . "FROM Cliente_Requerimientos_Adjuntos t "
                            . "INNER JOIN cliente_requerimientos c on t.IdRequerimiento = c.Id "
                            . "AND t.IdRequerimiento = ".parent::CodeDescrypt($request->input("Hash"))." AND "
                            . "t.Nombre Like '".$d->Rut."%'"
                            );
                    foreach( $Adjuntos as $ad ){
                        $ad->Hash = parent::CodeEncrypt($ad->Id);
                    }
                    $d->Adjuntos = $Adjuntos;
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                $parcliente_tiposolicitud = DB::SELECT(""
                            . "SELECT "
                            . "Id as Hash, Nombre, Descripcion "
                            . "FROM parcliente_tiposolicitud "
                            . "WHERE Estado = 1");
                foreach($parcliente_tiposolicitud as $d){
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                $parcliente_tipodesarrollo = DB::SELECT(""
                            . "SELECT "
                            . "Id as Hash, Nombre, Descripcion "
                            . "FROM parcliente_tipodesarrollo "
                            . "WHERE Estado = 1");
                foreach($parcliente_tipodesarrollo as $d){
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                $parcliente_sectores = DB::SELECT(""
                            . "SELECT "
                            . "Id as Hash, Nombre as Sector "
                            . "FROM parcliente_sectores "
                            . "WHERE Estado = 1");
                foreach($parcliente_sectores as $d){
                    $Detalle = DB::SELECT("SELECT Id as Hash, Nombre as Detalle "
                            . "FROM parcliente_detallesector "
                            . "where IdSector = ".$d->Hash." "
                            . "AND Estado = 1 "
                            . "ORDER BY Nombre");
                    foreach( $Detalle as $dd ){
                        $dd->Hash = parent::CodeEncrypt($dd->Hash);
                    }
                    $d->DSector = $Detalle;
                }
                foreach($parcliente_sectores as $d){
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                $productocliente = DB::SELECT("SELECT pc.Id as Hash, pc.Nombre as Producto "
                        . ""
                        . "FROM par_usuariocliente pu "
                        . "INNER JOIN productocliente pc on pc.Id = pu.IdProducto and pc.IdCliente = pu.IdCliente "
                        . "WHERE pu.IdUsuario = ".$Usuario->IdUsuario
                        . " ORDER BY pc.Nombre "
                        . "");
                foreach($productocliente as $d){
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                $parcliente_tipomaterial = DB::SELECT(""
                            . "SELECT "
                            . "Id as Hash, Nombre as Material "
                            . "FROM parcliente_tipomaterial "
                            . "WHERE Estado = 1");
                foreach($parcliente_tipomaterial as $d){
                    $Detalle = DB::SELECT("SELECT Id as Hash, Nombre as Detalle "
                            . "FROM parcliente_medio "
                            . "where IdTipoMaterial = ".$d->Hash." "
                            . "AND Estado = 1 "
                            . "ORDER BY Nombre");
                    foreach( $Detalle as $dd ){
                        $dd->Hash = parent::CodeEncrypt($dd->Hash);
                    }
                    $d->Medio = $Detalle;
                }

                foreach($parcliente_tipomaterial as $d){
                    $d->Hash = parent::CodeEncrypt($d->Hash);
                }
                
                //--------------------------------------------------------------
                $InfoRe = DB::SELECT("SELECT "
                        . "*, ".$sqlUser[0]->IdUsuario." as UserConsult "
                        . "FROM cliente_requerimientos "
                        . "WHERE Id = $Hash");
                foreach($InfoRe as $d ){
                    $d->IdTipoSolicitud = parent::CodeEncrypt($d->IdTipoSolicitud);
                    $d->IdTipoDesarrollo = parent::CodeEncrypt($d->IdTipoDesarrollo);
                    $d->IdProducto = parent::CodeEncrypt($d->IdProducto);
                    
                    $Sector = DB::SELECT("SELECT "
                            . "* "
                            . "FROM Cliente_Requerimiento_Sector "
                            . "WHERE IdRequerimiento = $Hash");
                    foreach($Sector as $s ){
                        $s->IdSector = parent::CodeEncrypt($s->IdSector);
                        $s->IdDetalle = parent::CodeEncrypt($s->IdDetalle);
                    }
                    $d->Sector = $Sector;
                    
                    $Piezas = DB::SELECT("SELECT "
                            . "* "
                            . "FROM Cliente_Requerimiento_Piezas "
                            . "WHERE IdRequerimiento = $Hash");
                    $d->Piezas = $Piezas;
                    foreach($Piezas as $s ){
                        $s->IdMedio = parent::CodeEncrypt($s->IdMedio);
                        $s->IdTipoMaterial = parent::CodeEncrypt($s->IdTipoMaterial);
                    }
                    
                    $Adjuntos = DB::SELECT("SELECT "
                            . "* "
                            . "FROM Cliente_Requerimientos_Adjuntos "
                            . "WHERE IdRequerimiento = $Hash");
                    $d->Adjuntos = $Adjuntos;
                    foreach($Adjuntos as $s ){
                        $s->Id = parent::CodeEncrypt($s->Id);
                    }
                }
                DB::commit();
                return response()->json([
                    'Info'=>$InfoRe,
                    'Hash'=>$Hash,
                    'parcliente_tipomaterial'=>$parcliente_tipomaterial,
                    'parcliente_tiposolicitud'=>$parcliente_tiposolicitud,
                    'parcliente_tipodesarrollo'=>$parcliente_tipodesarrollo,
                    'parcliente_sectores'=>$parcliente_sectores,
                    'productocliente'=>$productocliente,
                    'Historico'=>$sql,
                    'CLIENTES_EVALUACION_SOLICITUD' => (new Controller)->ValidarPermisoUsuario("CLIENTES_EVALUACION_SOLICITUD",session('keyUser'),0),
                    'Info'=>$InfoRe,
                    'Bloq' => 0,
                    'User' => $sqlUser[0]->IdUsuario,
                    'Success' => 1
                ]);
                
            }else{
                DB::commit();
                return response()->json([
                    'Bloq' => 1,
                    'Success' => 1
                ]);
                
            }
            
            

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //a693dac80ae4ca3a932b4ce06cd688a2D
    public function Cliente_DesBloquearRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Hash = parent::CodeDescrypt( $request->input('Hash') );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Bloqueo = ?, FechaBloqueo = ?, IdUsuarioBloqueo = ? '
                    . 'WHERE Id = ?'
                    . '';
            $Data = [
                0,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $Hash
            ];

            DB::UPDATE($Query,$Data);
            array_push( $id, $Hash );
            
            DB::commit();
            return response()->json([
                'Bloq' => 0,
                'Success' => 1
            ]);
            
        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //c569fc8266c92dbd65aac696064785eeEd
    public function SaveEdRequerimientoCliente(Request $request){

        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            //
            $Query = 'UPDATE Cliente_Requerimientos SET '
                    . ''
                    . 'IdProducto = ?,'
                    . 'ObjetivosComunicacion = ?,'
                    . 'Dirigido = ?,'
                    . 'DescRequerimiento = ?,'
                    . 'Mandatorios = ?,'
                    . 'FechaSalida = ?,'
                    . 'IdSolicitante = ?,'
                    . 'IdTipoSolicitud = ?,'
                    . 'IdTipoDesarrollo = ?,'
                    . 'Asunto  = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                parent::CodeDescrypt($request->input('Producto')),
                $request->input('ObjetivosComunicacion'),
                $request->input('DirigidoA'),
                $request->input('DescRequerimiento'),
                $request->input('Mandatorios'),
                $request->input('FechaSalida'),
                $sqlUser[0]->IdUsuario,
                parent::CodeDescrypt($request->input('TipoSolicitud')),
                parent::CodeDescrypt($request->input('TipoDesarrollo')),
                $request->input('AsuntoRefRequerimiento'),
                parent::CodeDescrypt($request->input('Hash')),
            ];
            
            DB::UPDATE($Query,$Data);
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            array_push($id, $IdRequerimiento );
            
            //Cliente_Requerimiento_Sector
            $Sectores = \GuzzleHttp\json_decode($request->input('Sectores'));
            if( count($Sectores) > 0 ){
                DB::DELETE("DELETE FROM Cliente_Requerimiento_Sector WHERE IdRequerimiento = $IdRequerimiento");
                for($i = 0; $i < count($Sectores);$i++){
                    $Sectores[$i] = (array) $Sectores[$i];
                    $Sector = DB::SELECT("SELECT s.Id "
                            . "FROM parCliente_Sectores s "
                            . "INNER JOIN parCliente_DetalleSector d on s.Id = d.IdSector "
                            . "WHERE "
                            . "d.Id = ".parent::CodeDescrypt($Sectores[$i]['Id']));
                    $idx = DB::table('Cliente_Requerimiento_Sector')
                    ->insertGetId([
                        'Fecha' => date("Y-m-d H:i:s"),
                        'IdUsuario' => $sqlUser[0]->IdUsuario,
                        'IdDetalle' => parent::CodeDescrypt($Sectores[$i]['Id']),
                        'IdSector' => $Sector[0]->Id,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            //Cliente_Requerimiento_Piezas
            $NumPiezasAntiguas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad FROM Cliente_Requerimiento_Piezas WHERE IdRequerimiento = $IdRequerimiento GROUP BY IdRequerimiento");
            $NumPiezasNuevas = 0;
            $Materiales = \GuzzleHttp\json_decode($request->input('Materiales'));
            if( count($Materiales) > 0 ){
                DB::DELETE("DELETE FROM Cliente_Requerimiento_Piezas WHERE IdRequerimiento = $IdRequerimiento");
                for($i = 0; $i < count($Materiales);$i++){
                    $Materiales[$i] = (array) $Materiales[$i];
                    $Mat = DB::SELECT("SELECT s.Id "
                            . "FROM parCliente_TipoMaterial s "
                            . "INNER JOIN parCliente_Medio d on s.Id = d.IdTipoMaterial "
                            . "WHERE "
                            . "d.Id = ".parent::CodeDescrypt($Materiales[$i]['Hash']));
                    $NumPiezasNuevas += $Materiales[$i]['Num'];
                    $idx = DB::table('Cliente_Requerimiento_Piezas')
                    ->insertGetId([
                        'Fecha' => date("Y-m-d H:i:s"),
                        'IdUsuario' => $sqlUser[0]->IdUsuario,
                        'IdMedio' => parent::CodeDescrypt($Materiales[$i]['Hash']),
                        'Cantidad' => ($Materiales[$i]['Num']),
                        'IdTipoMaterial' => $Mat[0]->Id,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $Carpeta = date("Y")."".date("m")."".date("d");
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $request->file('Archivos')->getClientOriginalName();
                    $request->file('Archivos')->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            //Liberaación de Bloqueo
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Bloqueo = ?, FechaBloqueo = ?, IdUsuarioBloqueo = ? '
                    . 'WHERE Id = ?'
                    . '';
            $Data = [
                0,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario,
                $IdRequerimiento
            ];

            DB::UPDATE($Query,$Data);
            array_push( $id, $IdRequerimiento );
            
            //Indicador de Actualización
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                $request->input('JustMod')."\nCantididad de Piezas Anteriores: ".$NumPiezasAntiguas[0]->Cantidad." - Cantidad de Piezas Nuevas: ".$NumPiezasNuevas,
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            array_push($id, $IdRequerimiento );
            
            $Req = DB::SELECT("SELECT Estado FROM Cliente_Requerimientos WHERE Id = $IdRequerimiento");
            
            
            
            
            if( $Req[0]->Estado == 3 ){
                //Si el requerimiento está "Devuelvo a Cliente" vuelve a estar para revisión del Cliente.
                $Query = 'UPDATE cliente_requerimientos SET '
                        . 'Estado = ? '
                        . 'WHERE Id = ?'
                        . '';
                
                $SqlLider = DB::SELECT("SELECT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE IdSubordinado = ".$sqlUser[0]->IdUsuario);
                
                $Estado = 1;
                if( count($SqlLider) != 0 ){
                    $Estado = 10;
                }
                
                $Data = [
                    $Estado,
                    $IdRequerimiento
                ];

                DB::UPDATE($Query,$Data);
                array_push( $id, $IdRequerimiento );
            }
            DB::commit();
            
            
            $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." se ha Modificado.";
            $Info['Descripcion'] = "Se ha modificado el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('JustMod'));
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            
            if( count($SqlLider) != 0 ){
                $Info['Correos'] = $SqlLider[0]->Correo;
                $Info['UsuariosN'] = $SqlLider[0]->NombreUsuario;
            }else{
                $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
                $Info['UsuariosN'] = "Cindy Romero";
            }
                        
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //017de185ebf69d481ab27df257bfee87
    public function Cliente_DevStatusRequerimiento(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $sqlRq = DB::SELECT("SELECT Estado FROM cliente_requerimientos WHERE Id = ".parent::CodeDescrypt($request->input('Hash')));
            $id = Array();
            
            
            //Stataus
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                $request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            //Actualización de Estado
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'CancelacionText = ? ,'
                    . 'FechaCancelacion = ?,'
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                $request->input('Status'),
                date("Y-m-d H:i:s"),
                3,
                parent::CodeDescrypt($request->input('Hash'))
                
            ];
            
            DB::UPDATE($Query,$Data);
            $IdRequerimiento = DB::getPdo()->lastInsertId();
            array_push($id, $IdRequerimiento );
            
            DB::commit();
            
            //Notificar Correo Devolución
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            $Info['Asunto'] = "Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." Devuelto";
                $Info['Descripcion'] = "Se ha Devuelto el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
                
                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            return response()->json([
                'Info'=>$IdRequerimiento,
                'Est'=>$sqlRq,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //70387f8087a0fc297af72111d10f50d3x
    public function ClienteGetFileDownload($HashFile)
    {
        try {
            if ( session('Time') > date("Y-m-d H:i:s") ){
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                if ($Usuario) {
                    $Carpeta = "";
                    $Req = explode("X",$HashFile);
                    $idFile = parent::CodeDescrypt($Req[1]);
                    $idR = parent::CodeDescrypt($Req[0]);
                    $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$idR);
                    $File = DB::SELECT("SELECT Nombre FROM cliente_requerimientos_adjuntos WHERE "
                            . "Id = ".$idFile);
                    $nameFile = $File[0]->Nombre;
                    $file =  storage_path('app/Clientes/'.$sq[0]->Fecha."/".$nameFile);
                    $headers = ['Content-Type: application/pdf'];
                    return response()->download($file,$nameFile,$headers);
                } else {
                    return response()->json(['success' => false, 'mensaje' => 'No Usuario'], 200);
                }
            } else {
                return response()->json(['success' => false, 'mensaje' => 'Sesion terminada'], 200);
            }
        } catch (\Throwable $th) {
            $e = parent::normalExeption($th);
            return response()->json($e, 200);
        }
    }
    
    function agregar_zip($dir, $zip) {
 
        if (is_dir($dir)) {

          if ($da = opendir($dir)) {

            while (($archivo = readdir($da)) !== false) {

              if (is_dir($dir . $archivo) && $archivo != "." && $archivo != "..") {
                echo "<strong>Creando directorio: $dir$archivo</strong><br/>";
                agregar_zip($dir . $archivo . "/", $zip);

              } elseif (is_file($dir . $archivo) && $archivo != "." && $archivo != "..") {
                echo "Agregando archivo: $dir$archivo <br/>";
                $zip->addFile($dir . $archivo, $dir . $archivo);
              }
            }

            closedir($da);
          }
        }
    }
    
    //70387f8087a0fc297af72111d10f50d3xA
    public function ClienteGetFileDownloadZip($HashFile)
    {
        try {
            if ( session('Time') > date("Y-m-d H:i:s") ){
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                if ($Usuario) {
                    $Carpeta = "";
                    $Req = explode("X",$HashFile);
                    $idFile = parent::CodeDescrypt($Req[1]);
                    $idR = parent::CodeDescrypt($Req[0]);
                    $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$idR);
                    $File = DB::SELECT("SELECT Nombre FROM cliente_requerimientos_adjuntos WHERE "
                            . "IdRequerimiento = ".$idR);
                    $FilesArray = [];
                    $tt = 0;
                    //$zip = Zip::create('app/Clientes/'.$sq[0]->Fecha.'/file.zip');
                     
$zip = new ZipArchive();

$dir = '../../storage/app/Clientes/20210810/';

$rutaFinal = "../../storage/app/Clientes/20210810/Subidas";
 
mkdir($rutaFinal, 0777, true);


$archivoZip = "prueba.zip";
 
if ($zip->open($archivoZip, ZIPARCHIVE::CREATE) === true) {
    $zip->addFile($dir.'fertirriego (2).jpg', 'fertirriego (2).jpg');
    //agregar_zip($dir, $zip);
    $zip->close();

  rename($archivoZip, "$rutaFinal/$archivoZip");
  echo "Proceso Finalizado!! <br/><br/>Descargar: <a href='$rutaFinal/$archivoZip'>$archivoZip</a>";
  
}
                    /*foreach( $File as $f ){
                        $zip->add('app/Clientes/'.$sq[0]->Fecha."/".$f->Nombre);
                        $tt++;
                    }
                    $nameFile = $File[0]->Nombre;
                    $zip->close();
                    //$file =  storage_path('app/Clientes/'.$sq[0]->Fecha."/".$nameFile);
                    
                    

                    
                    return response()->download('app/Clientes/'.$sq[0]->Fecha."/file.zip", "file.zip");*/
                    /*
                    $zip = new ZipArchive();
                    // Creamos y abrimos un archivo zip temporal
                     $zip->open("miarchivo.zip",ZipArchive::CREATE);
                     // Añadimos un directorio
                     $dir = 'miDirectorio';
                     $zip->addEmptyDir($dir);
                     // Añadimos un archivo en la raid del zip.
                     $zip->addFile($nameFile,$nameFile);
                     //Añadimos un archivo dentro del directorio que hemos creado
                     $zip->addFile("imagen2.jpg",$dir."/mi_imagen2.jpg");
                     // Una vez añadido los archivos deseados cerramos el zip.
                     $zip->close();
                     // Creamos las cabezeras que forzaran la descarga del archivo como archivo zip.
                     header("Content-type: application/octet-stream");
                     header("Content-disposition: attachment; filename=miarchivo.zip");
                     // leemos el archivo creado
                     readfile('miarchivo.zip');
                     // Por último eliminamos el archivo temporal creado
                     unlink('miarchivo.zip');//Destruye el archivo temporal*/
                    //return response()->download($file, $nameFile);
                } else {
                    return response()->json(['success' => false, 'mensaje' => 'No Usuario'], 200);
                }
            } else {
                return response()->json(['success' => false, 'mensaje' => 'Sesion terminada'], 200);
            }
        } catch (\Throwable $th) {
            $e = parent::normalExeption($th);
            return response()->json($e, 200);
        }
    }
    
    //f060b228c3ba346cc82f7277e5457436
    public function Cliente_ListarProyectos(Request $request){
        $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
        $Cliente = DB::SELECT("SELECT IdCliente FROM Cliente_Requerimientos WHERE Id = $IdRequerimiento");
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $Proyectos = DB::SELECT("SELECT "
                . "p.Id as Hash, "
                . "p.Codigo as CodigoOT, "
                . "p.Referencia as ReferenciaOT "
                . "FROM Proyectos p "
                //. "INNER JOIN Cliente_Requerimientos cr ON p.IdCliente = cr.IdCliente AND cr.Id = $IdRequerimiento "
                //. "INNER JOIN par_usuariocliente pc on p.IdCliente = pc.IdCliente AND p.IdProducto = pc.IdProducto AND pc.IdUnidadNegocio = p.IdUnidad "
                . "WHERE /*pc.IdUsuario = ".$Usuario->IdUsuario." "
                . "AND*/ p.IdEstado in (1,4) and p.idcliente = 256 "
                . "ORDER BY p.Fecha DESC "
                . "");
        foreach($Proyectos as $p ){
            $p->Hash = parent::CodeEncrypt($p->Hash);
        }
        return response()->json([
            "Info"=>$Proyectos,
            'success' => true
        ]);
    }
    
    //
    
    //3119e621db348aad4c460acf0602cbb3
    public function Cliente_GenerarProyecto(Request $request){
        try {
            
            DB::beginTransaction();
            
            $Usuario = DB::table('usuario')->select('IdUsuario','NombreUsuario','Correo')->where('Token', session('keyUser'))->first();
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            $InfoR = DB::table('cliente_requerimientos')->select('Fecha')->where('Id', $IdRequerimiento)->first();
            $temp = explode("-",$InfoR->Fecha);
            $tempe = explode(" ",$temp[2]);
            $RutaCarpetaOrigen = $temp[0]."".$temp[1]."".$tempe[0];
            $IdProyecto = 0;
            $codigo = "";
            
            $InfoReq = DB::SELECT("SELECT "
                    . "Asunto,"
                    . "IdEmpresa,"
                    . "IdCliente,"
                    . "IdUnidad,"
                    . "IdProducto,"
                    . "DescRequerimiento,Dirigido,"
                    . "ObjetivosComunicacion, Mandatorios "
                    . "FROM Cliente_Requerimientos "
                    . "WHERE Id = ".$IdRequerimiento);
            
                $idEmpresa = $InfoReq[0]->IdEmpresa;
                $idUnidad = $InfoReq[0]->IdUnidad;
                $idCliente = $InfoReq[0]->IdCliente;
                $idProducto = $InfoReq[0]->IdProducto;
                $idSubProducto = 0;
                
            if( $request->input('Tipo') == 'AP' ){
                
                $Ot = DB::table('proyectos')->select('Codigo')->where('Id', parent::CodeDescrypt($request->input('ProyectReq')))->first();
                $codigo = $Ot->Codigo;
                $IdProyecto = parent::CodeDescrypt($request->input('ProyectReq'));
                
                $idx = DB::table('proyecto_requerimientocliente')
                ->insertGetId([
                    'IdProyecto'=> parent::CodeDescrypt($request->input('ProyectReq')),
                    'IdRequerimiento'=>$IdRequerimiento,
                    'Fecha'=> date('Y-m-d H:i:s'),
                    'IdUsuario'=> $Usuario->IdUsuario,
                    
                ]);

                //Stataus
                $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                        . '('
                        . 'IdRequerimiento,'
                        . 'Status,'
                        . 'Fecha,'
                        . 'IdUsuario'
                        . ') values (?,?,?,?)';
                $Data = [

                    parent::CodeDescrypt($request->input('Hash')),
                    'Se Asigna el Requerimiento al Proyecto: '.$codigo,
                    date("Y-m-d H:i:s"),
                    $Usuario->IdUsuario,

                ];

                DB::INSERT($Query,$Data);

                //Actualización de Estado
                $Query = 'UPDATE cliente_requerimientos SET '
                        . 'Estado = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    2,
                    parent::CodeDescrypt($request->input('Hash'))
                ];
                DB::UPDATE($Query,$Data);
                
                

            }else if( $request->input('Tipo') == 'GP' ){
                
                //Info Profesional.
                $Prof = DB::SELECT("SELECT "
                        . "u.IdPersona "
                        . "FROM Usuario u "
                        . "INNER JOIN Cliente_Requerimientos c on u.IdUsuario = c.IdSolicitante "
                        . "WHERE Id = $IdRequerimiento");
                $idProfesional = $Prof[0]->IdPersona;
                $idDirector = parent::CodeDescrypt(intval($request->input('Dir')));
                $idEjecutivo = $Usuario->IdUsuario;
                $referencia = $InfoReq[0]->Asunto;
                $descripcion = $InfoReq[0]->DescRequerimiento;

                $asocEmpresaCliente = DB::table('asoc_empresa_cliente')
                ->where(['IdEmpresa'=>$idEmpresa, 'IdCliente'=>$idCliente])
                ->first();
                $consecutivoOT = DB::table('proyectos')
                ->select(DB::raw('count(*) AS contadorOTS'))
                ->where(['IdEmpresa'=>$idEmpresa, 'IdCliente'=>$idCliente])
                ->first();
                
                $year = date('Y');
                $contador = str_repeat('0',4-strlen(strval($consecutivoOT->contadorOTS))).strval($consecutivoOT->contadorOTS+1);
                $codigo = $asocEmpresaCliente->Indice.$contador.'-'.$year;

                $IdProyecto = DB::table('proyectos')
                ->insertGetId([
                    'IdEmpresa'=>$idEmpresa,
                    'IdUnidad'=>$idUnidad,
                    'IdCliente'=>$idCliente,
                    'IdProducto'=>$idProducto,
                    'IdSubProducto' => $idSubProducto,
                    'IdProfesional' => $idProfesional,
                    'IdEjecutivo' => $idEjecutivo,
                    'IdDirector' => $idDirector,
                    'Referencia' => $referencia,
                    'Codigo' => $codigo,
                    'Descripcion' => $descripcion,
                    'Fecha' => date('Y-m-d H:i:s'),
                    'IdEstado' => 1
                ]);
               
                
                $id = DB::table('proyecto_requerimientocliente')
                ->insertGetId([
                    'IdProyecto'=> $IdProyecto,
                    'IdRequerimiento'=>$IdRequerimiento,
                    'Fecha'=> date('Y-m-d H:i:s'),
                    'IdUsuario'=> $Usuario->IdUsuario,
                    
                ]);

                
                //Stataus
                $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                        . '('
                        . 'IdRequerimiento,'
                        . 'Status,'
                        . 'Fecha,'
                        . 'IdUsuario'
                        . ') values (?,?,?,?)';
                $Data = [

                    parent::CodeDescrypt($request->input('Hash')),
                    'Se Asigna el Requerimiento al Proyecto: '.$codigo,
                    date("Y-m-d H:i:s"),
                    $Usuario->IdUsuario,

                ];

                DB::INSERT($Query,$Data);

                //Actualización de Estado
                $Query = 'UPDATE cliente_requerimientos SET '
                        . 'Estado = ?, FechaEntrega = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    2,
                    $request->input('FechaEntrega'),
                    parent::CodeDescrypt($request->input('Hash'))
                ];
                DB::UPDATE($Query,$Data);
                
            }
            
            //Asignar Tarea:
            $idDepto = parent::CodeDescrypt($request->input('parDepartamento'));
            $idTipoTarea = parent::CodeDescrypt($request->input('parTipoTarea'));
            $idTipoActividad = parent::CodeDescrypt($request->input('parTipoSolicitud'));
            $fechaEntrega = $request->input('parFecha') .' '. $request->input('parHora');
            $numeracion = DB::table('Tareas')
                ->selectRaw('count(*) AS Consecutivo')
                ->where('IdProyecto', $IdProyecto)->first();
            $Entregables = DB::SELECT("SELECT SUM(Cantidad) as NumPiezas FROM "
                    . "cliente_requerimiento_piezas WHERE "
                    . "IdRequerimiento = ".$IdRequerimiento." "
                    . "GROUP BY IdRequerimiento");
            
            $idsx = [];
            /*. "DescRequerimiento,"
                    . "ObjetivosComunicacion, Mandatorios "*/
            $idTarea = DB::table('tareas')
            ->insertGetId([
                'Asunto' => $request->input('parAsunto'),
                'Descripcion' => $request->input('parDescripcion')."\nObjetivos: ".$InfoReq[0]->ObjetivosComunicacion."\nRequerimiento: ".$InfoReq[0]->DescRequerimiento."\nMandatorios: ".$InfoReq[0]->Mandatorios."\nDirigido A: ".$InfoReq[0]->Dirigido,
                'FechaEntrega' => $fechaEntrega,
                'NroEntregables' => $Entregables[0]->NumPiezas,
                'IdProyecto' => $IdProyecto,
                'IdEstado' => 1,
                'IdTipoTarea' => $idTipoTarea,
                'IdTipoActividad' => $idTipoActividad,
                'IdUsuario' => $Usuario->IdUsuario,
                'IdDepartamento' => $idDepto,
                'FechaHoraCreacion' => date('Y-m-d H:i:s'),
                'IdRequerimientoCliente' => $IdRequerimiento,
                'Numeracion' => $numeracion->Consecutivo + 1
            ]);
            array_push($idsx, $idTarea);
            
            //RESPONSABLES
            $Responsables = \GuzzleHttp\json_decode($request->input('Responsables'));
            if( count($Responsables) > 0 ){
                for($i = 0; $i < count($Responsables);$i++){
                    //$Responsables[$i] = (array) $Responsables[$i];
                    $idEquipo = DB::table('equipotarea')
                        ->insertGetId([
                            'Tipo' => 'RESP',
                            'IdUsuario' => parent::CodeDescrypt($Responsables[$i]),
                            'Tareas_Id' => $idTarea
                        ]);
                        array_push($idsx, $idEquipo);
                }
            }
            
            //ASIGNADOS
            $Asignados = \GuzzleHttp\json_decode($request->input('Asignados'));
            if( count($Asignados) > 0 ){
                for($i = 0; $i < count($Asignados);$i++){
                    //$Asignados[$i] = (array) $Asignados[$i];
                    $idEquipo = DB::table('equipotarea')
                        ->insertGetId([
                            'Tipo' => 'ASIG',
                            'IdUsuario' => parent::CodeDescrypt($Asignados[$i]),
                            'Tareas_Id' => $idTarea
                        ]);
                        array_push($idsx, $idEquipo);
                }
            }
            
            $Adjuntos = DB::SELECT("SELECT Id, Nombre "
                    . "FROM cliente_requerimientos_adjuntos "
                    . "WHERE IdRequerimiento = $IdRequerimiento");
            
            if( count($Adjuntos) > 0 ){
                $Carpeta = date("Y")."".date("m")."".date("d");
                foreach ($Adjuntos as $file) {
                    $fichero = "Clientes/$RutaCarpetaOrigen/".$file->Nombre;
                    $nuevo_fichero = "trafico/Tareas/$Carpeta/".time()."CLI-$file->Nombre";
                    $nombre_archivo = time()."CLI-".$file->Nombre;

                    $Carpeta = date("Y")."".date("m")."".date("d");
                    if(!Storage::exists('trafico/Tareas/'.$Carpeta)){
                        Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                    }
                    
                    Storage::copy($fichero, $nuevo_fichero);
                    
                    $IdAdjunto = DB::table('adjuntostareas')
                    ->insertGetId([
                        'Archivo' => $nombre_archivo,
                        'Ruta' => $Carpeta,
                        'Tareas_Id' => $idTarea
                    ]);
                    array_push($idsx, $IdAdjunto);
                }
            }
            
            DB::commit();
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
                $Info['Asunto'] = "Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." Se ha Asigado.";
                $Info['Descripcion'] = "Se ha Asignado el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$Usuario->NombreUsuario."<br><strong>Códito OT</strong>: ".$codigo."<br><strong>Fecha Estimada de Entrega</strong>: ".$request->input('FechaEntrega');
                $Info['RegistradoPor'] = "Cindy Romero";

                $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                $Info['Correos'] = $InfoSol[0]->Correo;
                $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;

                $Mensaje = 0;
                if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    $Mensaje = 1;
                }else{
                $Mensaje = 1;
            }
            $data = [
                'Info' => $codigo,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            DB::rollback();
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            DB::rollback();
            $data = parent::validateException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            $data = parent::validateException($th);
            dd($data);
        }
    }
    
    //07be3299140f82ab94b6e2fa17033f63
    public function Cliente_EnviarAprobacionRequerimiento(Request $request){
        try {
            
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $IdRequerimiento = parent::CodeDescrypt($request->input("Hash"));
            
            $TareaPadre = DB::table('tareas')
                ->select('Id AS Hash')
                ->where('IdRequerimientoCliente', $IdRequerimiento)->latest('Hash')->first();
            

            $numeracion = DB::table('subtareas')
                ->select('Numeracion AS Consecutivo','Id','IdProyecto')
                ->where('IdTareaPadre', $TareaPadre->Hash)->latest('Id')->first();
            
            
            
            $InfoAdjuntos = DB::SELECT("SELECT "
                . "att.Id, att.Archivo, att.IdSubtarea, att.Ruta "
                . "FROM adjuntostareas att "
                . "INNER JOIN Subtareas st on att.IdSubtarea = st.Id "
                . "INNER JOIN Tareas t on st.IdTareaPadre = t.Id "
                . "WHERE t.IdRequerimientoCliente = $IdRequerimiento "
                . "AND st.Id = ".$numeracion->Id);
            
            if( count( $InfoAdjuntos ) > 0 ){
                
                
                $id = Array();
                //
                $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                        . '('
                        . 'IdRequerimiento,'
                        . 'Status,'
                        . 'Fecha,'
                        . 'IdUsuario'
                        . ') values (?,?,?,?)';
                $Data = [

                    parent::CodeDescrypt($request->input('Hash')),
                    "SE ENVÍA A APROBACIÓN DE CLIENTE.\n".$request->input('Status'),
                    date("Y-m-d H:i:s"),
                    $sqlUser[0]->IdUsuario

                ];

                DB::INSERT($Query,$Data);
                $IdStatus = DB::getPdo()->lastInsertId();
                array_push($id, $IdStatus );

                //
                $Query = 'UPDATE Proyectos SET '
                        . 'IdEstado = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    4,
                    $numeracion->IdProyecto
                ];
                
                

                DB::UPDATE($Query,$Data);
                array_push($id, $IdRequerimiento );
                
                //
                $Query = 'UPDATE cliente_requerimientos SET '
                        . 'Estado = ? '
                        . 'WHERE Id = ? ';
                $Data = [
                    4,
                    parent::CodeDescrypt($request->input('Hash'))

                ];
                
                

                DB::UPDATE($Query,$Data);
                array_push($id, $IdRequerimiento );
                
                foreach( $InfoAdjuntos as $d ){
                    $IdAdjunto = DB::table('Cliente_requerimientos_Entregables')
                    ->insertGetId([
                        'IdStatus' => $IdStatus,
                        'Archivo' => $d->Archivo,
                        'IdSubtarea' => $d->IdSubtarea
                    ]);
                    array_push($id, $IdAdjunto);
                    
                }

                DB::commit();
                $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
                $SqlLider = DB::SELECT("SELECT DISTINCT p.IdLider, u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdLider "
                    . "WHERE p.IdSubordinado = ".$sqlS[0]->IdSolicitante);
                
                $Estado = 1;
                if( count($SqlLider) != 0 ){
                    $Info['Asunto'] = "Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." Enviado a Aprobación";
                    $Info['Descripcion'] = "Se ha enviado ha Aprobación el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                    $Info['RegistradoPor'] = "Cindy Romero";

                    $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                    $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                    $Info['Correos'] = $SqlLider[0]->Correo;
                    $Info['UsuariosN'] = $SqlLider[0]->NombreUsuario;

                    $Mensaje = 0;
                    if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                        $Mensaje = 1;
                    }else{
                        $Mensaje = 1;
                    }
                }else{
                    $Info['Asunto'] = "Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." Enviado a Aprobación";
                    $Info['Descripcion'] = "Se ha enviado ha Aprobación el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                    $Info['RegistradoPor'] = "Cindy Romero";

                    $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
                    $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
                    $Info['Correos'] = $InfoSol[0]->Correo;
                    $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;

                    $Mensaje = 0;
                    if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                        $Mensaje = 1;
                    }else{
                        $Mensaje = 1;
                    }
                }
                
                
                return response()->json([
                    'Info'=>1,
                    'Req' => $IdRequerimiento,
                    'Success' => 1
                ]);
            }else{
                DB::rollBack();
                return response()->json([
                    'Info'=>2,
                    'Success' => 1
                ]);
                
            }
        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //8e93e5b81343b8ec1b4f11c96f9a92b3
    public function Cliente_ListarDocumentosUltimaTarea(Request $request){
    
        $IdRequerimiento = parent::CodeDescrypt($request->input("Hash"));
        $TareaPadre = DB::table('tareas')
                ->select('Id AS Hash')
                ->where('IdRequerimientoCliente', $IdRequerimiento)->latest('Hash')->first();

        $numeracion = DB::table('subtareas')
            ->select('Numeracion AS Consecutivo','Id')
            ->where('IdTareaPadre', $TareaPadre->Hash)
                ->orderByDesc('Id')->first();
        $InfoAdjuntos = 0;
        if( !empty( $numeracion ) ){
            $InfoAdjuntos = DB::SELECT("SELECT "
                . "att.Id, att.Archivo, att.IdSubtarea, att.Ruta "
                . "FROM adjuntostareas att "
                . "INNER JOIN Subtareas st on att.IdSubtarea = st.Id "
                . "INNER JOIN Tareas t on st.IdTareaPadre = t.Id "
                . "WHERE t.IdRequerimientoCliente = $IdRequerimiento "
                . "AND st.Id = ".$numeracion->Id);
            foreach( $InfoAdjuntos as $d ){
                $d->Id = parent::CodeEncrypt($d->Id);
            }
        }
        
        return response()->json([
            "Info"=>$InfoAdjuntos,
            "numeracion"=>$numeracion,
            'success' => true
        ]);
    }
    
    //v70387f8087a0fc297af72111d10f50d3x
    public function ClienteGetFileView($HashFile)
    {
        try {
            if ( session('Time') > date("Y-m-d H:i:s") ){
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                if ($Usuario) {
                    $Carpeta = "";
                    $idR = parent::CodeDescrypt($HashFile);
                        $File = DB::SELECT("SELECT Archivo,Ruta FROM adjuntostareas WHERE "
                                . "Id = ".$idR);
                    $nameFile = $File[0]->Archivo;
                    $file =  storage_path('app/trafico/Tareas/'.$File[0]->Ruta."/".$nameFile);
                    return response()->download(storage_path('app/trafico/Tareas/'.$File[0]->Ruta."/".$nameFile, $nameFile),$nameFile);
                } else {
                    return response()->json(['success' => false, 'mensaje' => 'No Usuario'], 200);
                }
            } else {
                return response()->json(['success' => false, 'mensaje' => 'Sesion terminada'], 200);
            }
        } catch (\Throwable $th) {
            $e = parent::normalExeption($th);
            return response()->json($e, 200);
        }
    }
    
    //4040470b58442c9c5f79e731347c11ba
    public function Cliente_DataEvalSolicitud(Request $request){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $SqlLider = DB::SELECT("SELECT u.IdUsuario,u.Correo,u.NombreUsuario "
                    . "FROM profesional_cliente_lider p "
                    . "INNER JOIN Usuario u on u.IdUsuario = p.IdSubordinado "
                    . "WHERE IdLider = ".$sqlUser[0]->IdUsuario." ORDER BY u.NombreUsuario");
        
        $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
        $Status = DB::table('cliente_requerimiento_status')
                ->select('Id','Status','Fecha')
                ->where('IdRequerimiento', $IdRequerimiento)->latest('Id')->first();
        $Adjuntos = DB::SELECT("SELECT DISTINCT cee.Id,cee.IdSubtarea, "
                    . "cee.Archivo, cee.Ruta as Carpeta "
                    . "FROM adjuntostareas cee "
                    . "INNER JOIN Subtareas t on cee.IdSubtarea = t.Id "
                    . "INNER JOIN cliente_requerimientos_entregables ceee on t.Id = ceee.IdSubtarea "
                    . "WHERE ceee.IdStatus = ".$Status->Id);
        foreach( $Adjuntos as $d ){
            $d->Id = parent::CodeEncrypt($d->Id);
        }
        $parcliente_tipomaterial = DB::SELECT(""
                            . "SELECT "
                            . "Id as Hash, Nombre as Material "
                            . "FROM parcliente_tipomaterial "
                            . "WHERE Estado = 1");
        foreach($parcliente_tipomaterial as $d){
            $Detalle = DB::SELECT("SELECT Id as Hash, Nombre as Detalle "
                    . "FROM parcliente_medio "
                    . "where IdTipoMaterial = ".$d->Hash." "
                    . "AND Estado = 1 "
                    . "ORDER BY Nombre");
            foreach( $Detalle as $dd ){
                $dd->Hash = parent::CodeEncrypt($dd->Hash);
            }
            $d->Medio = $Detalle;
        }
        
        $Piezas = DB::SELECT("SELECT "
                . "* "
                . "FROM Cliente_Requerimiento_Piezas "
                . "WHERE IdRequerimiento = $IdRequerimiento");
        $d->Piezas = $Piezas;
        foreach($Piezas as $s ){
            $s->IdMedio = parent::CodeEncrypt($s->IdMedio);
            $s->IdTipoMaterial = parent::CodeEncrypt($s->IdTipoMaterial);
        }
        return response()->json([
            "Status"=>$Status,
            'Piezas'=>$Piezas,
            'Users'=>$SqlLider,
            'parcliente_tipomaterial'=>$parcliente_tipomaterial,
            "Adjuntos"=>$Adjuntos,
            'success' => true
        ]);
    }
    
    //6fd9fadcfba08ccf1ee0edfe29506329
    public function Cliente_EvalSolicitud(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            
            //Cliente_Requerimientos_Adjuntos
            $NumArchivos = ($request->input('NumArchivos'));
            if( ($NumArchivos) > 0 ){
                $sq = DB::SELECT("SELECT DATE_FORMAT(Fecha,'%Y%m%d') as Fecha FROM cliente_requerimientos WHERE "
                            . "Id = ".$IdRequerimiento);
                $Carpeta = $sq[0]->Fecha;
                if(!Storage::exists('Clientes/'.$Carpeta)){
                    Storage::makeDirectory('Clientes/'.$Carpeta, 0775, true);
                }
                $Fecha = date("Y-m-d");
                for($i = 0; $i < ($NumArchivos);$i++){
                    $pathLogo = $Fecha."-".$request->file('Archivos'.$i)->getClientOriginalName();
                    $request->file('Archivos'.$i)->storeAs('Clientes/'.$Carpeta.'/', $pathLogo);
                    $idx = DB::table('Cliente_Requerimientos_Adjuntos')
                    ->insertGetId([
                        'Nombre' => $pathLogo,
                        'IdRequerimiento' => $IdRequerimiento,
                    ]);
                }
            }
            
            $Tipo = parent::CodeDescrypt($request->input('Tipo'));
            $NumPiezasNuevas = 0;
            $NumPiezasAntiguas = "";
            
            $TipoText = '';
            if( $Tipo == 1 ){
                $TipoText = 'REQUERIMIENTO APROBADO Y FINALIZADO POR CLIENTE.';
            }else if( $Tipo == 2 ){
                
                //Cliente_Requerimiento_Piezas
                $NumPiezasAntiguas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad FROM Cliente_Requerimiento_Piezas WHERE IdRequerimiento = $IdRequerimiento GROUP BY IdRequerimiento");
                $Materiales = \GuzzleHttp\json_decode($request->input('Materiales'));
                if( count($Materiales) > 0 ){
                    DB::DELETE("DELETE FROM Cliente_Requerimiento_Piezas WHERE IdRequerimiento = $IdRequerimiento");
                    for($i = 0; $i < count($Materiales);$i++){
                        $Materiales[$i] = (array) $Materiales[$i];
                        $Mat = DB::SELECT("SELECT s.Id "
                                . "FROM parCliente_TipoMaterial s "
                                . "INNER JOIN parCliente_Medio d on s.Id = d.IdTipoMaterial "
                                . "WHERE "
                                . "d.Id = ".parent::CodeDescrypt($Materiales[$i]['Hash']));
                        $NumPiezasNuevas += $Materiales[$i]['Num'];
                        $idx = DB::table('Cliente_Requerimiento_Piezas')
                        ->insertGetId([
                            'Fecha' => date("Y-m-d H:i:s"),
                            'IdUsuario' => $sqlUser[0]->IdUsuario,
                            'IdMedio' => parent::CodeDescrypt($Materiales[$i]['Hash']),
                            'Cantidad' => ($Materiales[$i]['Num']),
                            'IdTipoMaterial' => $Mat[0]->Id,
                            'IdRequerimiento' => $IdRequerimiento,
                        ]);
                    }
                }
                $TipoText = 'REQUERIMIENTO APROBADO POR CLIENTE CON PIEZAS ADICIONALES, AHORA LOS ENTREGABLES SON '.$NumPiezasNuevas.".";
            }else if( $Tipo == 3 ){
                $TipoText = 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES.';
            }else if( $Tipo == 4 ){
                $TipoText = 'REQUERIMIENTO EN REVISIÓN INTERNA CLIENTE.';
                $sqlUserx = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where IdUsuario = '" . $request->input('RITipoAccionCliente') . "'");
                $TipoText = 'REQUERIMIENTO EN REVISIÓN INTERNA CLIENTE, SE COMPARTE CON: '-$sqlUserx[0]->NombreUsuario;
                $idxX = DB::table('cliente_requerimiento_compartido')
                        ->insertGetId([
                            'IdComparte' => $sqlUser[0]->IdUsuario,
                            'IdComparteCon' => $sqlUserx[0]->IdUsuario,
                            'IdRq' => $IdRequerimiento,
                        ]);
            }
            
            
            $id = Array();
            //
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [
                
                parent::CodeDescrypt($request->input('Hash')),
                "$TipoText.\n".$request->input('Status'),
                date("Y-m-d H:i:s"),
                $sqlUser[0]->IdUsuario
                
            ];
            
            DB::INSERT($Query,$Data);
            array_push($id, $IdRequerimiento );
            
            //
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Estado = ? '
                    . 'WHERE Id = ? ';
            $Data = [];
            if( $Tipo == 1 ){
                $Data = [
                    7,
                    parent::CodeDescrypt($request->input('Hash'))
                ];
            }else if( $Tipo == 2 ){
                $Data = [
                    6,
                    parent::CodeDescrypt($request->input('Hash'))
                ];
            }else if( $Tipo == 3 ){
                $Data = [
                    5,
                    parent::CodeDescrypt($request->input('Hash'))
                ];
            }
            
            DB::UPDATE($Query,$Data);
            array_push($id, $IdRequerimiento );
            
            if( $Tipo == 1 ){
                $Proyecto = DB::table('Tareas')
                ->select('IdProyecto')
                ->where('IdRequerimientoCliente', $IdRequerimiento)->first();
                $EstadosReq = DB::SELECT("SELECT DISTINCT "
                        . "cr.Id "
                        . "FROM Proyecto_RequerimientoCliente prq "
                        . "INNER JOIN Proyectos p on prq.IdProyecto = p.Id "
                        . "INNER JOIN Tareas t on p.Id = t.IdProyecto "
                        . "INNER JOIN cliente_requerimientos cr on t.IdRequerimientoCliente = cr.Id "
                        . "WHERE t.IdProyecto = ".$Proyecto->IdProyecto." "
                        . "AND cr.Estado not in (7,8)");
                if( count( $EstadosReq ) == 0 ){
                    $Query = 'INSERT INTO Proyecto_Movimiento '
                            . '('
                            . 'Comentario,'
                            . 'IdProyecto,'
                            . 'IdEstado,'
                            . 'Fecha,'
                            . 'IdUsuario'
                            . ') values (?,?,?,?,?)';
                    $Data = [];
                    $Data = [
                        'Comentario Sistema: Se cierra el Proyecto, ya que los Requerimiento ligados ya se encuentran Cerrados.\nComentarios Cliente:'.$request->input('Status'),
                        $Proyecto->IdProyecto,
                        2,
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, $Proyecto->IdProyecto );
                    
                    $Query = 'UPDATE Proyectos '
                            . 'SET IdEstado = ? '
                            . 'WHERE Id = ?';
                    $Data = [];
                    $Data = [
                        2,
                        $Proyecto->IdProyecto,
                    ];
                    DB::UPDATE($Query,$Data);
                    array_push($id, $Proyecto->IdProyecto );
                }
            }
            
            DB::commit();
            
            $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." $TipoText.";
            $Info['Descripcion'] = "Se ha $TipoText el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
            $Info['RegistradoPor'] = $sqlUser[0]->NombreUsuario;
            $Info['RegistradoPorCorreo'] = $sqlUser[0]->Correo;
            $Info['Correos'] = "ejecutivosyara@grupolaestacion.com";
            $Info['UsuariosN'] = "Cindy Romero";
            
            $Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }else{
                $Mensaje = 1;
            }
            
            if( $Tipo == 4 ){
                $TipoText = 'REQUERIMIENTO EN REVISIÓN INTERNA CLIENTE.';
                $sqlUserx = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where IdUsuario = '" . $request->input('RITipoAccionCliente') . "'");
                
                $Info['Asunto'] = "El Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." Se Enviado para Revisión.";
                $Info['Descripcion'] = "Se ha Enviado para Revisión el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
                $Info['RegistradoPor'] = $sqlUserx[0]->NombreUsuario;
                $Info['RegistradoPorCorreo'] = $sqlUserx[0]->Correo;
                $Info['Correos'] = $sqlUser[0]->Correo;
                $Info['UsuariosN'] = $sqlUser[0]->NombreUsuario;

                $Mensaje = 0;
                if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    $Mensaje = 1;
                }else{
                    $Mensaje = 1;
                }
            }
            return response()->json([
                'Info'=>1,
                'Req' =>$IdRequerimiento,
                'Success' => 1
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'X'=>$ex
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'X'=>$qe
            ]);
        }
    }
    
    //06ae214f4708713efca1c9c7ad1ca588
    public function Cliente_ListarUltimoStatus(Request $request){
        $IdRequerimiento = parent::CodeDescrypt($request->input("Hash"));
        
        $Req = DB::table('cliente_requerimientos')
                ->select('FechaEntrega','Asunto')
                ->where('id', $IdRequerimiento)->first();
        
        $Status = DB::table('cliente_requerimiento_status')
                ->select('Status','Id')
                ->where('IdRequerimiento', $IdRequerimiento)->latest('Id')->first();
        
        return response()->json([
            "Info"=>$Status->Status,
            "Req"=>$Req,
            'success' => true
        ]);
    }
    
    //a15d0c7c156ad5a16df4125c0778bfab
    public function Cliente_ReasignarRequerimientoCliente(Request $request){
        try {
            
            DB::beginTransaction();
            
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            $IdRequerimiento = parent::CodeDescrypt($request->input('Hash'));
            
            $InfoR = DB::table('cliente_requerimientos')->select('Fecha')->where('Id', $IdRequerimiento)->first();
            $temp = explode("-",$InfoR->Fecha);
            $tempe = explode(" ",$temp[2]);
            $RutaCarpetaOrigen = $temp[0]."".$temp[1]."".$tempe[0];
            $IdProyecto = 0;
            $codigo = "";
            
            //Stataus
            $Query = 'INSERT INTO Cliente_Requerimiento_Status '
                    . '('
                    . 'IdRequerimiento,'
                    . 'Status,'
                    . 'Fecha,'
                    . 'IdUsuario'
                    . ') values (?,?,?,?)';
            $Data = [

                parent::CodeDescrypt($request->input('Hash')),
                'Se Asigna el Requerimiento al Tráfico Interno Nuevamente',
                date("Y-m-d H:i:s"),
                $Usuario->IdUsuario,

            ];

            DB::INSERT($Query,$Data);

            //Actualización de Estado
            $Query = 'UPDATE cliente_requerimientos SET '
                    . 'Estado = ?, FechaEntrega = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                2,
                $request->input('parFechaEntregaC'),
                parent::CodeDescrypt($request->input('Hash'))
            ];
            DB::UPDATE($Query,$Data);  
            
            $TareaPadre = DB::table('Tareas')
                ->select('Id','IdProyecto')
                ->where('IdRequerimientoCliente', $IdRequerimiento)->first();
            $idTareaPadre = $TareaPadre->Id;
            $IdProyecto = $TareaPadre->IdProyecto;
            //Asignar Tarea:
            $idDepto = parent::CodeDescrypt($request->input('parDepartamento'));
            $idTipoTarea = parent::CodeDescrypt($request->input('parTipoTarea'));
            $idTipoActividad = parent::CodeDescrypt($request->input('parTipoSolicitud'));
            $fechaEntrega = $request->input('parFecha') .' '. $request->input('parHora');
            $numeracion = DB::table('subtareas')
                ->select('Numeracion AS Consecutivo','Id')
                ->where('IdTareaPadre', $idTareaPadre)->latest('Numeracion')->first();
            
            //Actualización de Respuesta Tarea
            $Query = 'UPDATE subtareas SET '
                    . 'IdEstado = ?,'
                    . 'FechaHoraRespuesta = ?,'
                    . 'IdUsuarioRespuesta = ? '
                    . 'WHERE Id = ? ';
            $Data = [
                7,
                date("Y-m-d H:i:s"),
                $Usuario->IdUsuario,
                $numeracion->Id
            ];
            DB::UPDATE($Query,$Data); 
            
            
            if ($numeracion) {
                $numeracion = floatval($numeracion->Consecutivo) + 0.1;
            } else {
                $consecutivo = DB::table('tareas')->where('Id', $idTareaPadre)->select('Numeracion')->first();
                $numeracion = $consecutivo->Numeracion + 0.1;
            }
            
            
            
            $Entregables = DB::SELECT("SELECT SUM(Cantidad) as NumPiezas FROM "
                    . "cliente_requerimiento_piezas WHERE "
                    . "IdRequerimiento = ".$IdRequerimiento." "
                    . "GROUP BY IdRequerimiento");
            
            $idsx = [];

            $idTarea = DB::table('subtareas')
            ->insertGetId([
                'Asunto' => $request->input('parAsunto'),
                'Descripcion' => $request->input('parDescripcion'),
                'FechaEntrega' => $fechaEntrega,
                'NroEntregables' => $Entregables[0]->NumPiezas,
                'IdProyecto' => $IdProyecto,
                'IdEstado' => 1,
                'IdTipoTarea' => $idTipoTarea,
                'IdTipoActividad' => $idTipoActividad,
                'IdUsuario' => $Usuario->IdUsuario,
                'IdDepartamento' => $idDepto,
                'FechaHoraCreacion' => date('Y-m-d H:i:s'),
                //'IdRequerimientoCliente' => $IdRequerimiento,
                'Numeracion' => $numeracion,
                'IdTareaPadre' => $idTareaPadre
            ]);
            array_push($idsx, $idTarea);
            
            //RESPONSABLES
            $Responsables = \GuzzleHttp\json_decode($request->input('Responsables'));
            if( count($Responsables) > 0 ){
                for($i = 0; $i < count($Responsables);$i++){
                    //$Responsables[$i] = (array) $Responsables[$i];
                    $idEquipo = DB::table('equipotarea')
                        ->insertGetId([
                            'Tipo' => 'RESP',
                            'IdUsuario' => parent::CodeDescrypt($Responsables[$i]),
                            'IdSubtarea' => $idTarea
                        ]);
                        array_push($idsx, $idEquipo);
                }
            }
            
            //ASIGNADOS
            $Asignados = \GuzzleHttp\json_decode($request->input('Asignados'));
            if( count($Asignados) > 0 ){
                for($i = 0; $i < count($Asignados);$i++){
                    //$Asignados[$i] = (array) $Asignados[$i];
                    $idEquipo = DB::table('equipotarea')
                        ->insertGetId([
                            'Tipo' => 'ASIG',
                            'IdUsuario' => parent::CodeDescrypt($Asignados[$i]),
                            'IdSubtarea' => $idTarea
                        ]);
                        array_push($idsx, $idEquipo);
                }
            }
            /*
            $Adjuntos = DB::SELECT("SELECT Id, Nombre "
                    . "FROM cliente_requerimientos_adjuntos "
                    . "WHERE IdRequerimiento = $IdRequerimiento");
            
            if( count($Adjuntos) > 0 ){
                $Carpeta = date("Y")."".date("m")."".date("d");
                foreach ($Adjuntos as $file) {
                    $fichero = "Clientes/$RutaCarpetaOrigen/".$file->Nombre;
                    $nuevo_fichero = "trafico/Tareas/$Carpeta/CLI-$file->Nombre";
                    $nombre_archivo = "CLI-".$file->Nombre;

                    $Carpeta = date("Y")."".date("m")."".date("d");
                    if(!Storage::exists('trafico/Tareas/'.$Carpeta)){
                        Storage::makeDirectory('trafico/Tareas/'.$Carpeta, 0775, true);
                    }
                    
                    Storage::copy($fichero, $nuevo_fichero);
                    
                    $IdAdjunto = DB::table('adjuntostareas')
                    ->insertGetId([
                        'Archivo' => $nombre_archivo,
                        'Ruta' => $Carpeta,
                        'Tareas_Id' => $idTarea
                    ]);
                    array_push($idsx, $IdAdjunto);
                }
            }
            */
            
            DB::commit();
            /*
            $sqlS = DB::SELECT("SELECT IdSolicitante FROM cliente_requerimientos WHERE ID = ".parent::CodeDescrypt($request->input('Hash')));
            $Info['Asunto'] = "Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." ";
            $Info['Descripcion'] = "Se ha Devuelto el Requerimiento No. ".parent::CodeDescrypt($request->input('Hash'))." por ".$sqlUser[0]->NombreUsuario."<br><strong>Comentario</strong>: ". nl2br($request->input('Status'));
            $Info['RegistradoPor'] = "Cindy Romero";

            $InfoSol = DB::sELECT("SELECT NombreUsuario,Correo from Usuario where IdUsuario = ".$sqlS[0]->IdSolicitante);
            $Info['RegistradoPorCorreo'] = "ejecutivosyara@grupolaestacion.com";
            $Info['Correos'] = $InfoSol[0]->Correo;
            $Info['UsuariosN'] = $InfoSol[0]->NombreUsuario;*/
            /*$Mensaje = 0;
            if( (new MailController)->Mail_NotificacionesClienteReq($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                $Mensaje = 1;
            }*/
            
            $data = [
                'Info' => 1,
                'success' => true
            ];
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            DB::rollback();
            $data = parent::validateException($ex);
            return response()->json($data, 200);
        } catch (QueryException $qe) {
            DB::rollback();
            $data = parent::validateException($qe);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            DB::rollback();
            $data = parent::validateException($th);
            dd($data);
        }
    }
    
    //0936e46c43fb2e07bf283d16df261d76
    public function Cliente_ResumenProfCliente(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $TotalGeneral = DB::table('Cliente_Requerimientos')->select('Id')->where('IdSolicitante', $Usuario->IdUsuario)->get()->count();
        
        $TotalPiezas = DB::SELECT("SELECT c.IdSolicitante, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." "
                . "GROUP BY c.IdSolicitante");
        if( !empty($TotalPiezas) ){
            $TotalPiezas = $TotalPiezas[0]->CantidadPiezas;
        }else{
            $TotalPiezas = 0;
        }
        
        $TotalRA = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (1,5,6) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalRA as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (1,5,6) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $TotalPC = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (4,3) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalPC as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (4,3) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $TotalCreativos = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (2) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalCreativos as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (2) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $TotalCerrados = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (7) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalCerrados as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (7) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $TotalSuspendidos = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (9) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalSuspendidos as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (9) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $TotalCancelados = DB::SELECT("SELECT c.IdSolicitante,COUNT(DISTINCT c.Id) as CantidadRq, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (8) "
                . "GROUP BY c.IdSolicitante");
        foreach( $TotalCancelados as $dx ){
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (8) "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $dx->TotalReProcesos = $TotalReProcesos;
            $dx->Reprocesos = $SqlReprocesos;
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
                ->where('Estado', 1)
                //->orderByDesc('Id')
                ->get();
        /*$Summary = [];
        $TotalMes = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->whereMonth('Fecha', intval(date("m")))
                ->get()->count();
        
        
        $TotalSemana = DB::SELECT("SELECT COUNT(1) AS Cantidad "
                . "FROM Cliente_Requerimientos "
                . "WHERE "
                . "IdSolicitante = ".$Usuario->IdUsuario." "
                . "AND WEEK(Fecha) = ".intval(date("W")));
        $TotalRA = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 1)
                ->get()->count();
        array_push($Summary, [ 'y' => $TotalRA,'label' => 'En Revisión Agencia']);
        
        $TotalPA = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 4)
                ->get()->count();
        array_push($Summary, ['y' => $TotalPA,'label' => 'Pendiente Aprobación Cliente']);
        
        $TotalAjuste = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 5)
                ->get()->count();
        array_push($Summary, ['y' => $TotalAjuste,'label' => 'En Ajuste']);
        
        $TotalDev = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 3)
                ->get()->count();
        array_push($Summary, ['y' => $TotalDev,'label' => 'Devuelvo a Cliente']);
        
        $TotalCerrados = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 7)
                ->get()->count();
        array_push($Summary, ['y' => $TotalCerrados,'label' => 'Cerrados']);
        
        $TotalSuspendidos = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 9)
                ->get()->count();
        array_push($Summary, ['y' => $TotalSuspendidos,'label' => 'Suspendidos']);
        
        $TotalCancelados = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 8)
                ->get()->count();
        array_push($Summary, ['y' => $TotalCancelados,'label' => 'Cancelados']);
        
        $TotalPro = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 2)
                ->get()->count();
        array_push($Summary, ['y' => $TotalPro,'label' => 'En Proceso Agencia']);
        
        $TotalAprobadoConAjuste = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->where('Estado', 6)
                ->get()->count();
        array_push($Summary, [ 'y' => $TotalAprobadoConAjuste,'label' => 'Aprobado con Piezas Adicionales']);
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
                ->where('Estado', 1)
                ->orderByDesc('Id')
                ->get();
        
        $Requerimientos_YearAnt = [];
        $Requerimientos_YearAct = [];
        $Year = [];
        array_push($Year,date("Y")-1);
        array_push($Year,date("Y"));
        
        for($t = 0; $t < count($Year);$t++){
            for($i = 1; $i < 13; $i++){
                //REQUERIMIENTOS
                $TotalReq = DB::table('Cliente_Requerimientos')->select('Id')
                ->where('IdSolicitante', $Usuario->IdUsuario)
                ->whereMonth('Fecha', $i)
                ->whereYear('Fecha', $Year[$t] )
                ->get()->count();

                //PIEZAS
                $Piezas = DB::SELECT("SELECT SUM(c.Cantidad) as Cantidad "
                        . "FROM cliente_requerimiento_piezas c "
                        . "INNER JOIN Cliente_Requerimientos cr on cr.Id = c.IdRequerimiento "
                        . "WHERE "
                        . "Month(cr.Fecha) = ".$i." "
                        . "AND cr.IdSolicitante = ".$Usuario->IdUsuario." "
                        . "AND YEAR(cr.Fecha) = ".$Year[$t]." "
                        . "GROUP BY Month(cr.Fecha)");
                if( count($Piezas) == 0 ){
                    $Piezas = 0;//rand(0, 500);
                }else{
                    $Piezas = $Piezas[0]->Cantidad;
                }

                //PROYECTOS
                $Proyectos_Act = DB::SELECT("SELECT SUM(1) as Cantidad "
                        . "FROM proyecto_requerimientocliente c "
                        . "INNER JOIN Cliente_Requerimientos cr on cr.Id = c.IdRequerimiento "
                        . "INNER JOIN Proyectos p on c.IdProyecto = p.Id "
                        . "WHERE "
                        . "Month(p.Fecha) = ".$i." "
                        . "AND cr.IdSolicitante = ".$Usuario->IdUsuario." "
                        . "AND YEAR(p.Fecha) = ".$Year[$t]." "
                        . "AND p.IdEstado = 1 "
                        . "GROUP BY Month(p.Fecha)");
                if( count($Proyectos_Act) == 0 ){
                    $Proyectos_Act = 0;//rand(0, 500);
                }else{
                    $Proyectos_Act = $Proyectos_Act[0]->Cantidad;
                }

                $Proyectos_Ant = DB::SELECT("SELECT SUM(1) as Cantidad "
                        . "FROM proyecto_requerimientocliente c "
                        . "INNER JOIN Cliente_Requerimientos cr on cr.Id = c.IdRequerimiento "
                        . "INNER JOIN Proyectos p on c.IdProyecto = p.Id "
                        . "WHERE "
                        . "Month(p.Fecha) = ".$i." "
                        . "AND cr.IdSolicitante = ".$Usuario->IdUsuario." "
                        . "AND YEAR(p.Fecha) = ".$Year[$t]." "
                        . "AND p.IdEstado = 2 "
                        . "GROUP BY Month(p.Fecha)");
                if( count($Proyectos_Ant) == 0 ){
                    $Proyectos_Ant = 0;//rand(0, 500);
                }else{
                    $Proyectos_Ant = $Proyectos_Ant[0]->Cantidad;
                }

                //TAREAS
                $Tareas = DB::SELECT("SELECT SUM(1) as Cantidad "
                        . "FROM Tareas t "
                        . "INNER JOIN Cliente_Requerimientos cr on cr.Id = t.IdRequerimientoCliente "
                        . "WHERE "
                        . "Month(t.FechaHoraCreacion) = ".$i." "
                        . "AND cr.IdSolicitante = ".$Usuario->IdUsuario." "
                        . "AND YEAR(t.FechaHoraCreacion) = ".$Year[$t]." "
                        . "GROUP BY Month(t.FechaHoraCreacion)");
                if( count($Tareas) == 0 ){
                    $Tareas = 0;//rand(0, 500);
                }else{
                    $Tareas = $Tareas[0]->Cantidad;
                }
                
                
                $ReprocesosCliente = 0;
                
                //REPROCESOS CLIENTE
                $ReprocesosCliente = DB::SELECT("SELECT SUM(1) as Cantidad "
                        . "FROM Subtareas sb "
                        . "INNER JOIN Tareas t on sb.IdTareaPadre = t.Id "
                        . "INNER JOIN Cliente_Requerimientos cr on cr.Id = t.IdRequerimientoCliente "
                        . "INNER JOIN TraTipoProceso ttp on sb.IdTipoActividad = ttp.Id "
                        . "WHERE "
                        . "Month(t.FechaHoraCreacion) = ".$i." "
                        . "AND cr.IdSolicitante = ".$Usuario->IdUsuario." "
                        . "AND YEAR(sb.FechaHoraCreacion) = ".$Year[$t]." "
                        . "AND ttp.Nombre = 'Reproceso Cliente' "
                        . "GROUP BY Month(sb.FechaHoraCreacion)");
                if( count($ReprocesosCliente) == 0 ){
                    $ReprocesosCliente = 0;//rand(0, 500);
                }else{
                    $ReprocesosCliente = $ReprocesosCliente[0]->Cantidad;
                }

                //CONSOLIDADO
                if( $t == 0 ){
                    array_push($Requerimientos_YearAnt, [ 'NumMes' => $i,'NombreMes' => parent::NombreMeses($i),'Req' => $TotalReq, 'Piezas' => $Piezas, 'PAct' => $Proyectos_Act, 'PInact' => $Proyectos_Ant , 'Tareas'=>$Tareas , 'ReprocesosCliente' => $ReprocesosCliente]);
                }else{
                    array_push($Requerimientos_YearAct, [ 'NumMes' => $i,'NombreMes' => parent::NombreMeses($i),'Req' => $TotalReq, 'Piezas' => $Piezas, 'PAct' => $Proyectos_Act, 'PInact' => $Proyectos_Ant , 'Tareas'=>$Tareas , 'ReprocesosCliente' => $ReprocesosCliente]);
                }
            }
        }
        
        return response()->json([
            'TotalGeneral'=>$TotalGeneral,
            'TotalMes'=>$TotalMes,
            'TotalSemana'=>$TotalSemana[0]->Cantidad,
            'TotalRA'=>$TotalRA,
            'TotalPA'=>$TotalPA,
            'TotalAjuste'=>$TotalAjuste,
            'TotalDev'=>$TotalDev,
            'TotalCerrados'=>$TotalCerrados,
            'TotalSuspendidos'=>$TotalSuspendidos,
            'TotalCancelados'=>$TotalCancelados,
            'TotalPro'=>$TotalPro,
            'Summary'=>$Summary,
            'TotalAprobadoConAjuste'=>$TotalAprobadoConAjuste,
            'Colors'=>$Colors,
            'Requerimientos_YearAct'=>$Requerimientos_YearAct,
            'Requerimientos_YearAnt'=>$Requerimientos_YearAnt,
            'Years'=>$Year,
            'Success' => 1
        ]);
         * 
         */
        
        $SemanasDias = DB::SELECT("SELECT DISTINCT Semana,DATE_FORMAT(WeekStart,'%Y-%m-%d') as WeekStart,DATE_FORMAT(WeekEnd,'%Y-%m-%d') as WeekEnd FROM ("
                . "SELECT WEEK(t.FechaEntrega) as Semana, adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY) WeekStart, "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) WeekEnd, "
                . " sum(DISTINCT t.Id) as Cantidad,sum(cp.Cantidad) as Piezas "
                . " from Cliente_Requerimientos t "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = t.Id "
                . " where t.Estado IN (2,5) AND t.IdSolicitante = ".$Usuario->IdUsuario." "
                . ""
                . "group by WEEK(t.FechaEntrega) , adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY), "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) "
                . " ) as Semanas "
                . "ORDER BY Semana ASC "
                . "");
        foreach($SemanasDias as $Semanas){
            $DiasSemana = [];
            $DiasSemana[0]['Dia'] = $Semanas->WeekStart;
            $DiasSemana[1]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 1 days"));
            $DiasSemana[2]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 2 days"));
            $DiasSemana[3]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 3 days"));
            $DiasSemana[4]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 4 days"));
            $DiasSemana[5]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 5 days"));
            $DiasSemana[6]['Dia'] = date("Y-m-d",strtotime($Semanas->WeekStart."+ 6 days"));
            for($Sem = 0; $Sem < count($DiasSemana);$Sem++){
                $Entregables = DB::SELECT("SELECT c.IdSolicitante,c.Id as Req,c.Asunto, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (2,5) and c.FechaEntrega = '".$DiasSemana[$Sem]['Dia']."'"
                . "GROUP BY c.IdSolicitante,c.Id,c.Asunto ");
                foreach($Entregables as $ttt){
                    $ttt->Reqhash = parent::CodeEncrypt($ttt->Req);
                }
                $DiasSemana[$Sem]['Entregables'] = $Entregables;
                $Temp = explode("-",$DiasSemana[$Sem]['Dia']);
                $DiasSemana[$Sem]['Dia'] = parent::NombreDia($DiasSemana[$Sem]['Dia']).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                
            }
            $Semanas->Detalle =  $DiasSemana;
        }
        return response()->json([
            'TotalPiezas'=>$TotalPiezas,
            'TotalGeneral'=>$TotalGeneral,
            'TotalRA'=>$TotalRA,
            'TotalPC'=>$TotalPC,
            'TotalCreativos'=>$TotalCreativos,
            'TotalCerrados'=>$TotalCerrados,
            'TotalSuspendidos'=>$TotalSuspendidos,
            'TotalCancelados'=>$TotalCancelados,
            'Colors'=>$Colors,
            'DataSemanas'=>$SemanasDias,
            'Success' => 1
        ]);
    }
    
    //0936e46c43fb2e07bf283d16df261d76x
    public function ClienteR_Detalle_Report(Request $request){
        $Data = "";
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        if( $request->input("Hash") == 1 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (1,5,6) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d')");
        }else if( $request->input("Hash") == 2 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (4,3) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') ");
        }else if( $request->input("Hash") == 3 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (2) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d')");
        }else if( $request->input("Hash") == 4 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (7) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') ");
        }else if( $request->input("Hash") == 5 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (9) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') ");
        }else if( $request->input("Hash") == 6 ){
            $Data = DB::SELECT("SELECT c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha, SUM(cp.Cantidad) as CantidadPiezas "
                . "FROM Cliente_Requerimientos c "
                . "INNER JOIN Cliente_Requerimiento_Piezas cp on cp.IdRequerimiento = c.Id "
                . "WHERE c.IdSolicitante = ".$Usuario->IdUsuario." AND c.Estado in (8) "
                . "GROUP BY c.Id,c.Asunto,c.FechaSalida,c.FechaEntrega,DATE_FORMAT(c.Fecha,'%Y-%m-%d') ");
        }
        foreach($Data as $d){
            $d->FechaSalidaN = $d->FechaSalida;
            
            $Temp = explode("-",$d->FechaSalida);
            $d->FechaSalida = parent::NombreDia($d->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $d->FechaEntregaN = $d->FechaEntrega;
            if( !empty($d->FechaEntrega) ){
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }else{
                $d->FechaEntrega = "";
            }
            
            $SqlReprocesos = DB::SELECT("SELECT "
                    . "s.IdRequerimiento, SUM(1) AS Cantidad "
                    . "FROM Cliente_Requerimiento_Status s "
                    . "INNER JOIN Cliente_Requerimientos c ON s.IdRequerimiento = c.Id "
                    . "WHERE c.Id = ".$d->Id." "
                    . "AND s.Status like 'REQUERIMIENTO NO APROBADO POR CLIENTE, SE NECESITAN AJUSTES..%' "
                    . "GROUP BY s.IdRequerimiento") ;
            $TotalReProcesos = 0;
            foreach ($SqlReprocesos as $t ){
                $TotalReProcesos += $t->Cantidad;
            }
            $d->TotalReProcesos = $TotalReProcesos;
            $d->IdHash = parent::CodeEncrypt($d->Id);
        }
        return response()->json([
            'Info'=>$Data,
            'Success' => 1
        ]);
    }
}
