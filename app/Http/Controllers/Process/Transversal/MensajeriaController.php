<?php

namespace App\Http\Controllers\Process\Transversal;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\MailController;
use PhpParser\Node\Stmt\Continue_;



class MensajeriaController extends Controller
{
    //d6e0840c386bc44bcb119cd77dd31ff4
    public function IndexHH()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("layouts.HorasHombre");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //
    public function Mensajeria_SaveMsj(Request $request){
        $credentials = $this->validate($request, [
            'Asunto' => 'required|string',
            'Mensaje' => 'required|string',
        ]);
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            
            
            DB::beginTransaction();
            DB::enableQueryLog();

            $id = DB::table('Mensajes')
            ->insertGetId([
                'Asunto'=>$credentials['Asunto'],
                'Descripcion'=>$credentials['Mensaje'],
                'Fecha' => date('Y-m-d H:i:s'),
                'IdUsuario' => $Usuario->IdUsuario,
                'Estado' => 1
            ]);
            
            parent::queryLogAuditoria([$id], $Usuario->IdUsuario, 'NOTIFICACION_ENVIAR_MENSAJE');
            
            //Asistentes Agencia
            
            $Notificados = \GuzzleHttp\json_decode($request->input('NotificadosMensajes'));
            if( count($Notificados) > 0 ){
                for($i = 0; $i < count($Notificados);$i++){
                    $Notificados[$i] = (array) $Notificados[$i];
                    $idx = DB::table('NotificadosMensaje')
                    ->insertGetId([
                        'IdNotificado' =>parent::CodeDescrypt($Notificados[$i]['IdU']),
                        'Tipo' => $Notificados[$i]['Tipo'],
                        'Mensajes_Id' => $id
                    ]);
                }
            }

            DB::commit();
            DB::disableQueryLog();
            
            $Info = $this->DataMensaje($id);
            if( count($Info) > 0 ){
                if( (new MailController)->Mail_EnviarMensajeGeneral($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    DB::table('Mensajes')
                    ->where('Id', $id)
                    ->update([
                        'Estado' => 2,
                    ]);
                    
                    $data = [
                        'Info' => 1,
                        'success' => true
                    ];
                    
                }else{
                    $data = [
                        'Info' => 0
                    ];
                }
            }else{
                $data = [
                        'Info' => 0
                    ];
            }
            
            return response()->json($data, 200);
        } catch (ValidationException $ex) {
            dd($ex);
        } catch (QueryException $qe) {
            dd($qe);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    
    
    public function DataMensaje($Id){
        $Info = [];
        
        $Data = DB::SELECT("SELECT "
                . "e.Asunto, e.Descripcion, DATE_FORMAT(e.Fecha,'%Y-%m-%d') as Fecha, DATE_FORMAT(e.Fecha,'%T') as Hora,"
                . "u.NombreUsuario as Creador, u.Correo "
                . "FROM Mensajes e "
                . "INNER JOIN Usuario u on e.IdUsuario = u.IdUsuario "
                . "WHERE Id = ".$Id);
        foreach( $Data as $d ){
            $Info['Asunto'] = $d->Asunto;
            $Info['Descripcion'] = ($d->Descripcion);
            $Info['RegistradoPor'] = $d->Creador;
            $Info['RegistradoPorCorreo'] = $d->Correo;
            
            //Usuarios
            $Dat = DB::SELECT("SELECT u.NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN Usuario u on n.IdNotificado = u.IdUsuario "
                    . "WHERE n.Tipo = 'Usuario' AND n.Mensajes_Id = $Id "
                    . "UNION ALL "
                    . "SELECT CONCAT(u.Nombre1,' ',u.Apellido1) as NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN empleado u on n.IdNotificado = u.IdEmpleado "
                    . "WHERE n.Tipo != 'Usuario' AND n.Mensajes_Id = $Id ");
            
            $Info['Usuarios'] = $Dat;
            $i = 0;
            foreach( $Dat as $d ){
                $Info['UsuariosN'][$i] = $d->NombreUsuario;
                $i++;
            }
            $Dat = DB::SELECT("SELECT u.Correo "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN Usuario u on n.IdNotificado = u.IdUsuario "
                    . "WHERE n.Tipo = 'Usuario' AND n.Mensajes_Id = $Id "
                    . "UNION ALL "
                    . "SELECT u.CorreoEmpresa as Correo "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN empleado u on n.IdNotificado = u.IdEmpleado "
                    . "WHERE n.Tipo != 'Usuario' AND n.Mensajes_Id = $Id ");
            //$Info['Correos'] = $Dat;
            $i = 0;
            foreach( $Dat as $d ){
                $Info['Correos'][$i] = $d->Correo;
                $i++;
            }
        }
        return $Info;
    }
    
    //
    public function Mensajeria_DataMisNotificaciones(Request $request){
        
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $sqlAdicional = "";


        $sqlFrom = "FROM "
                . "Mensajes m "
                . ""
                . "WHERE m.IdUsuario =  ".$Usuario->IdUsuario." ";

        $sqlCampos = " m.Id, m.Asunto, DATE_FORMAT(m.Fecha,'%Y-%m-%d') as Fecha, DATE_FORMAT(m.Fecha,'%T') as Hora,"
                . "CASE WHEN m.Estado = 1 THEN 'Guardado Sin Enviar' WHEN m.Estado = 2 THEN 'Guardado y Enviado' END as Estado, m.Descripcion ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "m.Asunto like '%".$searchValue."%' or "
                   . "m.Descripcion like '%".$searchValue."%' or "
                   . "date_format(m.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){
            $Id = $row->Id;
            $Copiados = DB::SELECT("SELECT u.NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN Usuario u on n.IdNotificado = u.IdUsuario "
                    . "WHERE n.Tipo = 'Usuario' AND n.Mensajes_Id = $Id "
                    . "UNION ALL "
                    . "SELECT CONCAT(u.Nombre1,' ',u.Apellido1) as NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN empleado u on n.IdNotificado = u.IdEmpleado "
                    . "WHERE n.Tipo != 'Usuario' AND n.Mensajes_Id = $Id ");
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Id),
                "Asunto"=>($row->Asunto),
                "Fecha"=>($row->Fecha),
                "Hora"=>$row->Hora,
                "Estado"=>$row->Estado,
                "Descripcion"=>$row->Descripcion,
                "Copiados"=>$Copiados,
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
    public function Mensajeria_DataOtrosNotificaciones(Request $request){
        
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

        $sqlAdicional = "";

        $sqlFrom = "FROM "
                . "Mensajes m "
                . "INNER JOIN NotificadosMensaje nm on m.Id = nm.Mensajes_Id "
                . "INNER JOIN Usuario u on m.IdUsuario = u.IdUsuario "
                . ""
                . "WHERE m.IdUsuario !=  ".$Usuario->IdUsuario." "
                . "AND nm.IdNotificado = ".$Usuario->IdUsuario." ";
        

        $sqlCampos = " u.NombreUsuario as GeneradoPor, m.Id, m.Asunto, DATE_FORMAT(m.Fecha,'%Y-%m-%d') as Fecha, DATE_FORMAT(m.Fecha,'%T') as Hora,"
                . "CASE WHEN m.Estado = 1 THEN 'Guardado Sin Enviar' WHEN m.Estado = 2 THEN 'Guardado y Enviado' END as Estado, m.Descripcion ";

        ## Search
        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
           $searchQuery = " and ("
                   . "m.Asunto like '%".$searchValue."%' or "
                   . "m.Descripcion like '%".$searchValue."%' or "
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "date_format(m.fecha,'%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        foreach($empRecords['empRecords'] as $row){
            $Id = $row->Id;
            $Copiados = DB::SELECT("SELECT u.NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN Usuario u on n.IdNotificado = u.IdUsuario "
                    . "WHERE n.Tipo = 'Usuario' AND n.Mensajes_Id = $Id "
                    . "UNION ALL "
                    . "SELECT CONCAT(u.Nombre1,' ',u.Apellido1) as NombreUsuario "
                    . "FROM NotificadosMensaje n "
                    . "INNER JOIN empleado u on n.IdNotificado = u.IdEmpleado "
                    . "WHERE n.Tipo != 'Usuario' AND n.Mensajes_Id = $Id ");
            $data[] = array(
                "Num"=>$i,
                "Hash"=>(new Controller)->CodeEncrypt($row->Id),
                "Asunto"=>($row->Asunto),
                "GeneradoPor"=>($row->GeneradoPor),
                "Fecha"=>($row->Fecha),
                "Hora"=>$row->Hora,
                "Estado"=>$row->Estado,
                "Descripcion"=>$row->Descripcion,
                "Copiados"=>$Copiados,
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
    
    /*//45a6a3d2e81997dab555dd16793d7480
    public function ListarPermisosOTS(Request $request){
        $TRA_CLIENTES_TAREAOT_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('TRA_CLIENTES_TAREAOT_CREAR')");
        $TRA_CLIENTES_OT_INFENT_CREAR = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '".session('keyUser')."' and p.nombre in ('TRA_CLIENTES_OT_INFENT_CREAR')");
        
        $data = [
                'TRA_CLIENTES_TAREAOT_CREAR' => $TRA_CLIENTES_TAREAOT_CREAR,
                'TRA_CLIENTES_OT_INFENT_CREAR' => $TRA_CLIENTES_OT_INFENT_CREAR,
                'success' => true
            ];
            return response()->json($data, 200);
    }*/
    
    //5087ba60b38c411d7e278b921ced2452
    public function SendNotificacionBirthday(){
        $Felicitados = DB::SELECT("SELECT "
                . "e.Nombre1, e.Nombre2, e.Apellido1, e.Apellido2,"
                . "e.Foto, c.Nombre as Cargo, e.IdEmpleado as Id "
                . ""
                . "FROM Empleado e "
                . "INNER JOIN Cargo c ON e.IdCargo = c.IdCargo "
                . "WHERE e.Estado = 1 "
                . "AND Month(e.FechaNacimiento) = ".date("m")." "
                . "and Day(e.FechaNacimiento) = 25 "
                //. "and Day(e.FechaNacimiento) = ".date("d")." "
                . "ORDER BY e.Apellido1 ASC");
        $Notificados = DB::SELECT("SELECT "
                . "u.NombreUsuario,'damian.mosquera93@gmail.com' as Correo "
                //. "u.NombreUsuario,'damian.mosquera93@gmail.com' as u.Correo "
                . "FROM Usuario u "
                . "WHERE u.Estado = 1 AND u.IdTipoUsuario in (1,2,4) limit 2"
                . "");
        foreach($Felicitados as $f){
            $Info = array();
            
            $Info['Asunto'] = "Feliz Cumpleaños ".$f->Nombre1." ".$f->Apellido1;
            $Info['RegistradoPor'] = "Process";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
            $Info['NombreCumple'] = $f->Cargo;
            $Info['Cargo'] = "soporte@processpluserp.com";
            $Info['Foto'] = $f->Foto;
            $Info['Hash'] = $f->Id;
            
            $i = 0;
            foreach($Notificados as $n){
                $Info['Correos'][$i] = $n->Correo;
                $i++;
            }
            if( (new MailController)->Mail_NotificacionBirthday($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                return  [
                    'Info' => 1,
                    'Contenido' => $Info,
                    'success' => true
                ];
            }else{
                return [
                    'Info' => 0,
                    'Contenido' => $Info
                ];
            }
        }
    }
    
    
    
    //c0c8fc625c8dad63478fe36d1e23d15a
    public function SendNotificacionPagosPptoGeneral(){
        $Datos = DB::SELECT("SELECT 
            dp.FechaPago, dp.Mes, dp.Id,
            it.Nombre as NombreItem, it.Entidad, p.Nombre as Periodicidad,
            emp.NombreComercial as Empresa, und.Nombre as Unidad
            FROM detalle_ppto_agencia dp
            INNER JOIN Empresa emp on dp.IdEmpresa = emp.IdEmpresa
            INNER JOIN unidad_negocio und on dp.IdUnidad = und.IdUnidad 
            INNER JOIN item_ppto_agencia it on dp.IdItem = it.Id
            INNER JOIN par_periodicidad_ppto_agencia p on it.IdPeriodicidad = p.Id
            WHERE dp.FechaPago IS NOT NULL AND dp.ValorPagado = 0 and  TIMESTAMPDIFF(DAY,date_format(sysdate(),'%Y-%m-%d'),dp.FechaPago ) < 5 "
                
            );
        
        foreach($Datos as $f){
            $Temp = explode("-",$f->FechaPago);
            $f->FechaLarga = parent::NombreDia($f->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        $Notificados = DB::SELECT("SELECT "
                . "u.NombreUsuario, u.Correo "
                . "FROM Usuario u "
                . "INNER JOIN notificados_generales ng on ng.IdUsuario = u.IdUsuario "
                . "WHERE u.Estado = 1 AND u.IdTipoUsuario in (1,2,4) "
                . "");
        $Temp = explode("-",date("Y-m-d"));
        $FechaLarga = parent::NombreDia(date("Y-m-d"))." ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

        $Info = array();

        $Info['Datos'] = $Datos;
        $Info['Asunto'] = "Pagos Próximos a Vencerse, $FechaLarga";
        $Info['RegistradoPor'] = "Process";
        $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
        
        
        $i = 0;
        foreach($Notificados as $n){
            $Info['Correos'][$i] = $n->Correo;
            $i++;
        }
        if( count($Datos) > 0 ){
            if( (new MailController)->Mail_NotificacionPagosPptoGeneral($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                return  [
                    'Info' => 1,
                    'Contenido' => $Info,
                    'success' => true
                ];
            }else{
                return [
                    'Info' => 0,
                    'Contenido' => $Info
                ];
            }
        }
    }
    
    
    //5ea78e3911acbcb1b3249efcfa46045f
    public function SendNotificacionVencimientoDocumentos(){
        $Datos = DB::SELECT("SELECT dl.Id,
            pt.Nombre as TipoDocumento, emp.NombreComercial as Empresa, dl.FechaVencimiento
            FROM Documento_Legal_Empresa dl 
            INNER JOIN Par_Tipo_Documento_Legal_Empresa pt on dl.IdTipoDocLegal = pt.Id AND pt.Estado = 1 
            INNER JOIN Empresa emp on dl.IdEmpresa = emp.IdEmpresa 
            WHERE TIMESTAMPDIFF(DAY,date_format(sysdate(),'%Y-%m-%d'),dl.FechaVencimiento ) < 7 ");
        $i = 0;
        foreach($Datos as $f){
            $Temp = explode("-",$f->FechaVencimiento);
            $f->FechaLarga = parent::NombreDia($f->FechaVencimiento).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Info = array(); 
            
            $Notificados = DB::SELECT("select u.NombreUsuario, u.Correo
                FROM Documento_Notificacion dn 
                INNER JOIN Usuario u on dn.IdUsuario = u.IdUsuario
                WHERE Tipo = 'INTERNO' AND dn.IdDocLegal = ".$f->Id." 
                UNION ALL
                SELECT
                dn.NombreExterno as NombreUsuario, dn.CorreoExterno as Correo
                FROM Documento_Notificacion dn 
                where dn.CorreoExterno != '' AND dn.IdDocLegal = ".$f->Id." ");
            foreach($Notificados as $n){
                $Info['Correos'][$i] = $n->Correo;
                $i++;
            }
            //$Info['Correos'][$i] = "gerencia@processpluserp.com";
            
            $Temp = explode("-",date("Y-m-d"));
            $FechaLarga = parent::NombreDia(date("Y-m-d"))." ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            

            $Info['Datos'] = $Datos;
            $Info['Asunto'] = "Documentos Legales Próximos a Vencerse de ".$f->Empresa.", $FechaLarga";
            $Info['RegistradoPor'] = "Process";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";

            if( count($Datos) > 0 ){
                if( (new MailController)->Mail_NotificacionDocumentosAVencerse($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    echo "Documentos Legales Próximos a Vencerse de ".$f->Empresa.", $FechaLarga -> Enviado.";
                    /*return  [
                        'Info' => 1,
                        'Contenido' => $Info,
                        'success' => true
                    ];*/
                }else{
                    echo "Documentos Legales Próximos a Vencerse de ".$f->Empresa.", $FechaLarga -> No Enviado.";
                    /*return [
                        'Info' => 0,
                        'Contenido' => $Info
                    ];*/
                }
            }
        }
        
    }
    
    //0082fe1a8b4e028141a0c60008fe5525
    public function SendNotificacionVencimientoTarifas(){
        $Datos = DB::SELECT("SELECT dl.Id,
            pt.Nombre as TipoDocumento, emp.NombreComercial as Empresa, dl.FechaVencimiento
            FROM tarifa_legal_empresa dl 
            INNER JOIN par_tipo_tarifa_legal_empresa pt on dl.IdTarifa = pt.Id AND pt.Estado = 1 
            INNER JOIN Empresa emp on dl.IdEmpresa = emp.IdEmpresa 
            WHERE TIMESTAMPDIFF(DAY,date_format(sysdate(),'%Y-%m-%d'),dl.FechaVencimiento ) < 7 ");
        $i = 0;
        foreach($Datos as $f){
            $Temp = explode("-",$f->FechaVencimiento);
            $f->FechaLarga = parent::NombreDia($f->FechaVencimiento).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Info = array(); 
            
            $Notificados = DB::SELECT("select u.NombreUsuario, u.Correo
                FROM tarifa_notificacion dn 
                INNER JOIN Usuario u on dn.IdUsuario = u.IdUsuario
                WHERE Tipo = 'INTERNO' AND dn.Tarifa_Legal_Empresa_Id = ".$f->Id." 
                UNION ALL
                SELECT
                dn.NombreExterno as NombreUsuario, dn.CorreoExterno as Correo
                FROM tarifa_notificacion dn 
                where dn.CorreoExterno != '' AND dn.Tarifa_Legal_Empresa_Id = ".$f->Id." ");
            foreach($Notificados as $n){
                $Info['Correos'][$i] = $n->Correo;
                $i++;
            }
            //$Info['Correos'][$i] = "gerencia@processpluserp.com";
            
            $Temp = explode("-",date("Y-m-d"));
            $FechaLarga = parent::NombreDia(date("Y-m-d"))." ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            

            $Info['Datos'] = $Datos;
            $Info['Asunto'] = "Tarifas Legales Próximas a Vencerse de ".$f->Empresa.", $FechaLarga";
            $Info['RegistradoPor'] = "Process";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";

            if( count($Datos) > 0 ){
                if( (new MailController)->Mail_NotificacionDocumentosAVencerse($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                    echo "Tarifas Legales Próximas a Vencerse de ".$f->Empresa.", $FechaLarga -> Enviado.";
                    /*return  [
                        'Info' => 1,
                        'Contenido' => $Info,
                        'success' => true
                    ];*/
                }else{
                    echo "Tarifas Legales Próximas a Vencerse de ".$f->Empresa.", $FechaLarga -> No Enviado.";
                    /*return [
                        'Info' => 0,
                        'Contenido' => $Info
                    ];*/
                }
            }
        }
        
    }
    
    function NuevoPublicosCom(Request $request){
        DB::beginTransaction();
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            DB::table('comunicaciones_tipo')
            ->insert([
                    'publico' => request()->get('nombre'),
                    'tipodocumento' => '',//request()->get('nombretiposdoc'),
                    'fecha' => date("Y-m-d H:i:s"),
                    'iduser' => $Usuario->IdUsuario,
            ]);
            DB::commit();
            return redirect()->route('4a5a7170621126bd5f4a58badcf8e1cf');
        } catch (\PDOException $exception) {
            error_log("Formato de Personal: " . $exception->getMessage());
            throw new \PDOException("Formato Comunicaciones: " . $exception->getMessage());
            DB::rollBack();
            return redirect()->route('4a5a7170621126bd5f4a58badcf8e1cf');
        }
    }

    function EliminarArchivoBiblioteca(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        if( $Usuario->IdUsuario == 1 || $Usuario->IdUsuario == 42 || $Usuario->IdUsuario == 43){
            $sql = DB::DELETE("DELETE FROM biblioteca WHERE id = ".$request->input('id'));
            return response()->json([
                'info'=>1
            ]);
        }else{
            return response()->json([
                'info'=>0
            ]);
        }
    }

    function EliminarArchivoCom(Request $request){
        $sql = DB::DELETE("DELETE FROM comunicaciones_detalle WHERE id = ".$request->input('id'));
        return response()->json([
            'info'=>1
        ]);
    }

    function EliminarCategoriaCom(Request $request){
        $sql = DB::DELETE("DELETE FROM comunicaciones_detalle WHERE idp = ".$request->input('id'));
        $sql = DB::DELETE("DELETE FROM comunicaciones_tipo WHERE id = ".$request->input('id'));
        return response()->json([
            'info'=>1
        ]);
    }

    function DocumentoCompartidoCon(Request $request){
        $sql = "";
        if($request->input('Tipo') == 1){
            $sql = DB::SELECT("SELECT "
                    . "u.NombreUsuario, c.Id, DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha "
                    . "FROM comuniciones_compartidos c "
                    . "INNER JOIN Usuario u on c.IdUsuarioCompartido = u.IdUsuario "
                    . "WHERE c.IdCarpeta = ".$request->input('Hash') );
        }else{
            $sql = DB::SELECT("SELECT "
                    . "u.NombreUsuario, c.Id, DATE_FORMAT(c.Fecha,'%Y-%m-%d') as Fecha "
                    . "FROM comuniciones_compartidos c "
                    . "INNER JOIN Usuario u on c.IdUsuarioCompartido = u.IdUsuario "
                    . "WHERE c.IdDetalle = ".$request->input('Hash') );
        }
        foreach ($sql as $d){
            $Temp = explode("-",$d->Fecha);
            $d->FechaLarga = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        return response()->json([
            'Compartidos'=>$sql,
        ]);
    }
    
    function CarpetasComunicacionesContenido(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $sql = DB::SELECT("SELECT 
            Id,publico,tipodocumento,fecha,iduser,idcarpetaP,visibilidad,
            Usuario, Tipo 
            FROM 
            (SELECT f.*, u.NombreUsuario as Usuario, 'PROPIA' AS Tipo, 1 as Tipo2
                from comunicaciones_tipo f
                inner join usuario u on f.iduser = u.IdUsuario 
                where f.idcarpetaP = ".$request->input('id')." AND 
                f.IdUser = ".$Usuario->IdUsuario." 
                UNION ALL 
                SELECT f.*, u.NombreUsuario as Usuario, 'COMPARTIDA' AS Tipo, 0 as Tipo2
                from comunicaciones_tipo f
                inner join usuario u on f.iduser = u.IdUsuario 
                inner join comuniciones_compartidos c on f.Id = c.IdCarpeta AND c.IdUsuarioCompartido = ".$Usuario->IdUsuario."  
                where f.idcarpetaP = ".$request->input('id')." 
                ) as Datos
            Order by publico,tipodocumento
        ");
        /*
        $sql = DB::SELECT("SELECT f.*, u.NombreUsuario as Usuario
        from comunicaciones_tipo f
        inner join usuario u on f.iduser = u.IdUsuario where f.idcarpetaP = ".$request->input('id')."
        order by f.publico,f.tipodocumento ");*/
        $i = 1;
        foreach($sql as $d){
            $d->nux = date("d")+date("H")+date("i")+date("s");
            $d->Num = $i;
            $i++;
        }

        $sqld = DB::SELECT("SELECT f.id,f.idp,f.categoria,f.archivo,f.iduser,f.fecha, 'PROPIA' AS Tipo, 1 as Tipo2 FROM comunicaciones_detalle f
        inner join usuario u on f.iduser = u.IdUsuario
        where f.IdUser = ".$Usuario->IdUsuario."  AND f.idp = ".$request->input('id')." "
        . "UNION ALL "
        . "SELECT f.id,f.idp,f.categoria,f.archivo,f.iduser,f.fecha, 'COMPARTIDA' AS Tipo, 0 as Tipo2 FROM comunicaciones_detalle f
        inner join usuario u on f.iduser = u.IdUsuario 
        inner join comuniciones_compartidos c on f.Id = c.IdDetalle AND c.IdUsuarioCompartido = ".$Usuario->IdUsuario."   
        where f.idp = ".$request->input('id')." "
                . "" );
        $x = 1;
        foreach($sqld as $g){
                $g->Num = $x;
                $g->nux = date("d")+date("H")+date("i")+date("s");
                $x++;
        }
        return response()->json([
            'sql'=>$sql,
            'sqld'=>$sqld,
            'Clase'=> date("d")+date("H")+date("i")+date("s")
        ]);
    }
    
    public function SaveCompartidosDocumentos(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO comuniciones_compartidos ('
                            . 'IdCarpeta,'
                            . 'IdUsuarioCompartido,'
                            . 'Fecha,'
                            . 'IdUsuario) '
                            . 'values(?,?,?,?)';
                    $Data = [
                        $request->input('Hash'),
                        parent::CodeDescrypt($Items[$i]['IdU']),
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario
                    ];
                    
                    DB::INSERT($Query,$Data);
                    array_push($id,  $request->input('Hash') );
                }
            }
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'COMPARTIR_DOCUMENTOS_COMUNICACIONES');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'mensaje'=>'Documento Compartido de Manera Correcta.'
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        }
    }
    
    public function SaveCompartidosDocumentosArc(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO comuniciones_compartidos ('
                            . 'IdDetalle,'
                            . 'IdUsuarioCompartido,'
                            . 'Fecha,'
                            . 'IdUsuario) '
                            . 'values(?,?,?,?)';
                    $Data = [
                        $request->input('Hash'),
                        parent::CodeDescrypt($Items[$i]['IdU']),
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario
                    ];
                    
                    DB::INSERT($Query,$Data);
                    array_push($id,  $request->input('Hash') );
                }
            }
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'COMPARTIR_DOCUMENTOS_COMUNICACIONES');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'mensaje'=>'Documento Compartido de Manera Correcta.'
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        }
    }
    
    public function CarpetasComunicaciones(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        $sqlPublico = DB::SELECT("SELECT 
            Id,publico,tipodocumento,fecha,iduser,idcarpetaP,visibilidad,
            Usuario, Tipo 
            FROM 
            (SELECT f.*, u.NombreUsuario as Usuario, 'PROPIA' AS Tipo, 1 as Tipo2
                from comunicaciones_tipo f
                inner join usuario u on f.iduser = u.IdUsuario 
                where isnull(f.idcarpetaP) and visibilidad = 1 AND 
                f.IdUser = ".$Usuario->IdUsuario." 
                UNION ALL 
                SELECT f.*, u.NombreUsuario as Usuario, 'COMPARTIDA' AS Tipo, 0 as Tipo2
                from comunicaciones_tipo f
                inner join usuario u on f.iduser = u.IdUsuario 
                inner join comuniciones_compartidos c on f.Id = c.IdCarpeta AND c.IdUsuarioCompartido = ".$Usuario->IdUsuario."  
                where isnull(f.idcarpetaP) and visibilidad = 1
                ) as Datos
            Order by publico,tipodocumento
        ");
        $i = 1;
        foreach($sqlPublico as $d){
            $d->Num = $i;
                        $d->nux = date("d")+date("H")+date("i")+date("s");
                        $sqld = DB::SELECT("SELECT f.* FROM comunicaciones_detalle f
                        inner join usuario u on f.iduser = u.IdUsuario
                        where f.idp = ".$d->Id." order by f.categoria,f.archivo" );
                        $x = 1;
                        foreach($sqld as $g){
                                $g->Num = $x;
                                $g->nux = date("d")+date("H")+date("i")+date("s");
                                $x++;
                        }
                        $d->detalle = $sqld;
            $i++;
        }
        $sql = $sqlPublico;
        if($Usuario->IdUsuario == 43 || $Usuario->IdUsuario == 1 || $Usuario->IdUsuario == 25) {
                $sqlPrivado = DB::SELECT("SELECT f.*, u.NombreUsuario as Usuario
                from comunicaciones_tipo f
                inner join usuario u on f.iduser = u.IdUsuario
                where visibilidad = 0 
                order by f.publico,f.tipodocumento ");
                $i = 1;
                foreach($sqlPrivado as $d){
                        $d->Num = $i;
                        $sqld = DB::SELECT("SELECT f.* FROM comunicaciones_detalle f
                        inner join usuario u on f.iduser = u.IdUsuario
                        where f.idp = ".$d->Id." order by f.categoria,f.archivo" );
                        $x = 1;
                        foreach($sqld as $g){
                                $g->Num = $x;
                                $g->nux = date("d")+date("H")+date("i")+date("s");
                                $x++;
                        }
                        $d->detalle = $sqld;
                        $i++;
                }
                $sql = array_merge($sqlPublico, $sqlPrivado);
        }
        return response()->json([
            'sql'=>$sql,
            'Clase'=> date("d")+date("H")+date("i")+date("s")
        ]);
    }

    public function Comunicaciones(){
            return view('process.datos.Comunicaciones');
    }

    function NuevoDocCom(Request $request){
        $Archivo = "";
        for($i = 0; $i < ($request->input('archivos')); $i++){
            $Archivo = date("Y-m-d")."_".$request->file('foto'.$i)->getClientOriginalName();
            $request->file('foto'.$i)->storeAs('Comunicaciones/',$Archivo);
            DB::beginTransaction();
            try {
                $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
                DB::table('comunicaciones_detalle')
                ->insert([
                        'categoria' => $Archivo,
                        'idp' => request()->get('id'),
                        'archivo' => $Archivo,
                        'fecha' => date("Y-m-d"),
                        'iduser' => $Usuario->IdUsuario,
                ]);

                DB::commit();

            } catch (\PDOException $exception) {
                error_log("Formato de Personal: " . $exception->getMessage());
                throw new \PDOException("Formato Bioblioteca: " . $exception->getMessage());
                DB::rollBack();
            }
        }
        return response()->json([
            'info'=>1
        ]);
		
    }

    function NewSubCarpeta(Request $request){
        DB::beginTransaction();
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
            DB::table('comunicaciones_tipo')
                    ->insert([
                            'publico' => request()->get('nombre'),
                            'idcarpetaP' => request()->get('id'),
                            'tipodocumento' => '',//request()->get('nombretiposdoc'),
                            'fecha' => date("Y-m-d H:i:s"),
                            'iduser' => $Usuario->IdUsuario,
                    ]);

            DB::commit();
            return response()->json([
                'info'=>1
            ]);
        } catch (\PDOException $exception) {
            error_log("Formato de Personal: " . $exception->getMessage());
            throw new \PDOException("Formato Comunicaciones: " . $exception->getMessage());
            DB::rollBack();
            return response()->json([
                'info'=>0
            ]);
        }
    }
    
    public function Directorio(Request $request){
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $Agencia = parent::ValidarPermisoUsuario('DIRECTOR_AGENCIA',$Usuario->IdUsuario,1);
        $Clientes = parent::ValidarPermisoUsuario('DIRECTORIO_CLIENTES',$Usuario->IdUsuario,1);
        $Proveedores = parent::ValidarPermisoUsuario('DIRECTORIO_PROVEEDORES',$Usuario->IdUsuario,1);
        $Bancos = parent::ValidarPermisoUsuario('DIRECTORIO_BANCOS',$Usuario->IdUsuario,1);
        
        
        
        $SqlClientes = "";
        if( $Clientes == 1 ){
            $SqlClientes = DB::SELECT("SELECT DISTINCT "
                    . "c.IdCliente, c.NombreComercial as Cliente "
                    . "FROM Cliente c "
                    . "INNER JOIN par_usuariocliente p on c.IdCliente = p.IdCliente "
                    . "WHERE c.Estado = 1 "
                    . "AND p.IdUsuario = ".$Usuario->IdUsuario." "
                    . "ORDER BY c.NombreComercial");

            foreach ($SqlClientes as $cliente) {
                $cliente->IdCliente = parent::CodeEncrypt($cliente->IdCliente);
            }
        }
        
        $SqlProveedores = "";
        if( $Proveedores == 1 ){
            $SqlProveedores = DB::SELECT("
                SELECT 
                p.IdProveedor, p.NombreComercial as Proveedor, CASE WHEN ISNULL(p.Actividad) THEN '' ELSE p.Actividad END as Actividad 
                FROM Proveedor p 
                WHERE p.Estado = 1 
                ORDER BY p.NombreComercial asc");
            foreach ($SqlProveedores as $proveedor) {
                $proveedor->IdProveedor = parent::CodeEncrypt($proveedor->IdProveedor);
            }
            
        }
        
        $SqlBancos = "";
        if( $Bancos == 1 ){
            $SqlBancos = DB::SELECT("
                SELECT b.Id, b.NombreComercial as Banco 
                FROM Banco b 
                WHERE b.Estado = 1 
                ORDER BY b.NombreComercial ASC");
        }
        
        return response()->json([
            'DIRECTOR_AGENCIA'=>$Agencia,
            'DIRECTORIO_CLIENTES'=>$Clientes,
            'DIRECTORIO_PROVEEDORES'=>$Proveedores,
            'DIRECTORIO_BANCOS'=>$Bancos,
            
            'SqlClientes'=>$SqlClientes,
            'SqlProveedores'=>$SqlProveedores,
            'SqlBancos'=>$SqlBancos,
        ]);
    }
    
    public function DirectorioAgencia_Data(Request $request){
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        
        $sqlFrom = "FROM empleado e "
        ."JOIN Cargo c ON e.IdCargo = c.IdCargo "
        . "LEFT JOIN Usuario u on e.IdEmpleado = u.IdPersona "
        
        . "WHERE e.Estado = 1 ";

        $sqlCampos = " e.IdEmpleado, e.Foto, e.Nombre1, e.Nombre2, e.Apellido1, e.Apellido2, e.Direccion, e.CorreoPersonal, e.Celular, 
                Date_format(e.FechaNacimiento,'%M-%d') AS  Cumpleanios, c.Nombre as Cargo, u.Correo ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and ("
                . " e.Nombre1 like '%".$searchValue."%' "
                . "or e.Nombre2 like '%".$searchValue."%' "
                . "or e.Apellido1 like '%".$searchValue."%' "
                . "or e.Apellido2 like '%".$searchValue."%' "
                . "or c.Nombre like '%".$searchValue."%' "
                . "or e.Direccion like '%".$searchValue."%' "
                . "or e.CorreoPersonal like '%".$searchValue."%' "
                . "or e.FechaNacimiento like '%".$searchValue."%' "
                . "or e.Celular like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->IdEmpleado),
            "IdEmpleado" => ($row->IdEmpleado),
            "Foto"=>$row->Foto,
            "Nombre1"=>$row->Nombre1,
            "Correo"=>$row->Correo,
            "Nombre2"=>$row->Nombre2,
            "Apellido1"=>$row->Apellido1,
            "Apellido2"=>$row->Apellido2,
            "Direccion"=>$row->Direccion,
            "CorreoPersonal"=>$row->CorreoPersonal,
            "Celular"=>$row->Celular,
            "Cumpleanios"=>$row->Cumpleanios,
            "Cargo"=>$row->Cargo
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
    
    public function DirectorioClientes_Data(Request $request){
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $IdCliente = "";
        if( $request['search']['IdCliente'] != 0 ){
            $IdCliente = " AND c.IdCliente = ".parent::CodeDescrypt($request['search']['IdCliente'])." ";
        }
        $sqlFrom = "FROM contactos_cliente cc "
        ."INNER JOIN Cliente c on cc.IdCliente = c.IdCliente $IdCliente "
        
        . "WHERE c.Estado = 1 ";

        $sqlCampos = " cc.Nombre,
            (CASE  WHEN cc.Cargo = 'null' THEN '' WHEN ISNULL(cc.Cargo) THEN '' ELSE cc.Cargo END ) AS Cargo, 
            (CASE  WHEN cc.Celular = 'null' THEN '' WHEN ISNULL(cc.Celular) THEN '' ELSE cc.Celular END ) AS Celular, 
            (CASE  WHEN cc.Telefono = 'null' THEN '' WHEN ISNULL(cc.Telefono) THEN '' ELSE cc.Telefono END ) AS Telefono, 
            cc.Correo, 
            (CASE  WHEN cc.Mes = 'null' THEN '' WHEN ISNULL(cc.Mes) THEN '' ELSE cc.Mes END ) AS Mes_cumple, 
            (CASE  WHEN cc.Dia = 'null' THEN '' WHEN ISNULL(cc.Dia) THEN '' ELSE cc.Dia END ) AS dia_cumple,
            c.NombreComercial as Cliente 
            ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and ("
                . " cc.Nombre like '%".$searchValue."%' "
                . "or cc.Cargo like '%".$searchValue."%' "
                . "or cc.Celular like '%".$searchValue."%' "
                . "or cc.Telefono like '%".$searchValue."%' "
                . "or c.NombreComercial like '%".$searchValue."%' "
                . ") ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $data[] = array(
            "Num"=>$i,
            "Nombre" => ($row->Nombre),
            "Cargo" => ($row->Cargo),
            "Cliente" => ($row->Cliente),
            "Celular"=>$row->Celular,
            "Telefono"=>$row->Telefono,
            "Correo"=>$row->Correo,
            "Mes_cumple"=>$row->Mes_cumple,
            "dia_cumple"=>$row->dia_cumple
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
    
    public function DirectorioProveedores_Data(Request $request){
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $IdProveedor = "";
        if( $request['search']['IdProveedor'] != 0 ){
            $IdCliente = " AND c.IdProveedor = ".parent::CodeDescrypt($request['search']['IdProveedor'])." ";
        }
        $sqlFrom = "FROM contactos_proveedor cc "
        ."INNER JOIN Proveedor c on cc.IdProveedor = c.IdProveedor $IdProveedor "
        
        . "WHERE c.Estado = 1 ";

        $sqlCampos = " cc.Nombre,
            (CASE  WHEN cc.Cargo = 'null' THEN '' WHEN ISNULL(cc.Cargo) THEN '' ELSE cc.Cargo END ) AS Cargo, 
            (CASE  WHEN cc.Celular = 'null' THEN '' WHEN ISNULL(cc.Celular) THEN '' ELSE cc.Celular END ) AS Celular, 
            (CASE  WHEN cc.Telefono = 'null' THEN '' WHEN ISNULL(cc.Telefono) THEN '' ELSE cc.Telefono END ) AS Telefono, 
            cc.Correo,
            c.NombreComercial as Proveedor 
            ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and ("
                . " cc.Nombre like '%".$searchValue."%' "
                . "or cc.Cargo like '%".$searchValue."%' "
                . "or cc.Celular like '%".$searchValue."%' "
                . "or cc.Telefono like '%".$searchValue."%' "
                . "or c.NombreComercial like '%".$searchValue."%' "
                . ") ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $data[] = array(
            "Num"=>$i,
            "Nombre" => ($row->Nombre),
            "Cargo" => ($row->Cargo),
            "Proveedor" => ($row->Proveedor),
            "Celular"=>$row->Celular,
            "Telefono"=>$row->Telefono,
            "Correo"=>$row->Correo
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
    
    public function DirectorioBanco_Data(Request $request){
        $draw = $request['draw'];
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $IdBanco = "";
        if( $request['search']['IdBanco'] != 0 ){
            $IdCliente = " AND c.IdBanco = ".parent::CodeDescrypt($request['search']['IdBanco'])." ";
        }
        $sqlFrom = "FROM contactos_banco cc "
        ."INNER JOIN Banco c on cc.IdBanco = c.Id $IdBanco "
        
        . "WHERE c.Estado = 1 ";

        $sqlCampos = " cc.Nombre,
            (CASE  WHEN cc.Cargo = 'null' THEN '' WHEN ISNULL(cc.Cargo) THEN '' ELSE cc.Cargo END ) AS Cargo, 
            (CASE  WHEN cc.Celular = 'null' THEN '' WHEN ISNULL(cc.Celular) THEN '' ELSE cc.Celular END ) AS Celular, 
            (CASE  WHEN cc.Telefono = 'null' THEN '' WHEN ISNULL(cc.Telefono) THEN '' ELSE cc.Telefono END ) AS Telefono, 
            cc.Correo,
            c.NombreComercial as Banco 
            ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
        $searchQuery = " and ("
                . " cc.Nombre like '%".$searchValue."%' "
                . "or cc.Cargo like '%".$searchValue."%' "
                . "or cc.Celular like '%".$searchValue."%' "
                . "or cc.Telefono like '%".$searchValue."%' "
                . "or c.NombreComercial like '%".$searchValue."%' "
                . ") ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            $permiso_estado = 0;
            $permiso_editar = 0;
            $data[] = array(
            "Num"=>$i,
            "Nombre" => ($row->Nombre),
            "Cargo" => ($row->Cargo),
            "Banco" => ($row->Banco),
            "Celular"=>$row->Celular,
            "Telefono"=>$row->Telefono,
            "Correo"=>$row->Correo
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
    
    //--Encuesta
    public function EncuestaCliente_Form(){
        
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $Cliente = DB::SELECT("SELECT DISTINCT p.IdCliente "
                . "FROM par_usuariocliente p "
                . "WHERE p.IdUsuario = ".$Usuario->IdUsuario);
        
        $Encuesta = DB::SELECT("SELECT "
                . "e.Nombre AS Encuesta, e.Id "
                . "FROM Encuesta e "
                . "WHERE e.Tipo = 'EXTERNO' AND e.Estado = 1 AND e.IdCliente = ".$Cliente[0]->IdCliente);
        foreach( $Encuesta as $en ){
            $EncuestaSemana = DB::SELECT("SELECT "
                . "Id "
                . "FROM respuestas_encuestas_cliente "
                . "WHERE Semana = WEEKOFYEAR(NOW()) "
                . "AND IdEncuesta = ".$en->Id." ");
            $en->R = $EncuestaSemana;
            
            $Secciones = DB::SELECT("SELECT "
                    . "s.Nombre as Seccion, s.Id "
                    . "FROM Seccion_Encuesta s "
                    . "WHERE s.Estado = 1 AND s.IdEncuesta = ".$en->Id." "
                    . "ORDER BY s.Id ASC");
            foreach( $Secciones as $sec ){
                $Preguntas = DB::SELECT("SELECT "
                        . "p.Pregunta, p.Id "
                        . "FROM preguntas_secciones p "
                        . "WHERE p.Estado = 1 "
                        . "AND p.IdSeccion = ".$sec->Id." "
                        . "ORDER BY p.Orden ASC");
                foreach ($Preguntas as $pre){
                    $Opciones = DB::SELECT("SELECT "
                            . "pe.Id, pe.Nombre, pe.Codigo "
                            . "FROM opciones_preguntas_encuesta pe "
                            . "WHERE pe.Estado = 1 AND pe.IdPregunta = ".$pre->Id." "
                            . "ORDER BY pe.Orden ASC");
                    foreach ($Opciones as $pp){
                        $pp->Id = parent::CodeEncrypt($pp->Id);
                    }
                    $pre->Opciones = $Opciones;
                }
                $sec->Id = parent::CodeEncrypt($sec->Id);
                $sec->Preguntas = $Preguntas;
            }
            $en->Id = parent::CodeEncrypt($en->Id);
            $en->Secciones = $Secciones;
        }
        
        return response()->json([
            'Cliente'=>$Cliente,
            'Encuesta'=>$Encuesta,
        ]);
    }
    
    public function EncuestaSave(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Semana = DB::SELECT("SELECT WEEKOFYEAR(NOW()) AS SEMANA");
            $id = Array();
            
            $idr = DB::table('respuestas_encuestas_cliente')
            ->insertGetId([
                'Semana'=>$Semana[0]->SEMANA,
                'Profesional'=>$sqlUser[0]->IdUsuario,
                'Fecha'=>date("Y-m-d H:i:s"),
                'IdEncuesta'=>parent::CodeDescrypt($request->input('Hash'))
            ]);
            array_push($id,  $idr );
            
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO respuestas_encuestas ('
                            . 'IdPregunta,'
                            . 'IdRespuesta,'
                            . 'Fecha,'
                            . 'IdUser,'
                            . 'IdRegistroRC,'
                            . 'Comentarios) '
                            . 'values(?,?,?,?,?,?)';
                    $Data = [
                        $Items[$i]['Id'],
                        parent::CodeDescrypt($Items[$i]['Valor']),
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario,
                        $idr,
                        $Items[$i]['Comentario']
                    ];
                    
                    DB::INSERT($Query,$Data);
                    array_push($id, $idr );
                }
            }
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'ENCUESTA_CLIENTE_DILIGENCIAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'mensaje'=>'Gracias por Diligenciar nuestra encuesta.'
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        }
    }
    
    public function EncuestaEjecutivo_Form(){
        
        $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();
        
        $Cliente = DB::SELECT("SELECT DISTINCT p.IdCliente "
                . "FROM par_usuariocliente p "
                . "WHERE p.IdUsuario = ".$Usuario->IdUsuario);
        
        $Encuesta = DB::SELECT("SELECT "
                . "e.Nombre AS Encuesta, e.Id "
                . "FROM Encuesta e "
                . "WHERE e.Tipo = 'INTERNO' AND e.Estado = 1 AND e.IdCliente = ".$Cliente[0]->IdCliente);
        foreach( $Encuesta as $en ){
            $Productos = DB::SELECT("SELECT "
                    . "p.Id, p.Nombre as Producto, c.NombreComercial as Cliente "
                    . "FROM productocliente p "
                    . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente "
                    . "INNER JOIN encuesta_clientes_profesionales pp on p.Id = pp.IdProducto AND pp.Estado = 1 "
                    . "ORDER BY p.Nombre asc ");
            foreach( $Productos as $Pro ){
                $EncuestaSemana = DB::SELECT("SELECT "
                . "r.Id "
                . "FROM respuestas_encuestas_ejecutivo r  "
                . "WHERE r.Semana = WEEKOFYEAR(NOW()) "
                . "AND r.IdEncuesta = ".$en->Id." AND r.IdProducto = ".$Pro->Id);
                $Pro->R = $EncuestaSemana;

                $Secciones = DB::SELECT("SELECT "
                        . "s.Nombre as Seccion, s.Id "
                        . "FROM Seccion_Encuesta s "
                        . "WHERE s.Estado = 1 AND s.IdEncuesta = ".$en->Id." "
                        . "ORDER BY s.Id ASC");
                foreach( $Secciones as $sec ){
                    $Preguntas = DB::SELECT("SELECT "
                            . "p.Pregunta, p.Id "
                            . "FROM preguntas_secciones p "
                            . "WHERE p.Estado = 1 "
                            . "AND p.IdSeccion = ".$sec->Id." "
                            . "ORDER BY p.Orden ASC");
                    foreach ($Preguntas as $pre){
                        $Opciones = DB::SELECT("SELECT "
                                . "pe.Id, pe.Nombre, pe.Codigo "
                                . "FROM opciones_preguntas_encuesta pe "
                                . "WHERE pe.Estado = 1 AND pe.IdPregunta = ".$pre->Id." "
                                . "ORDER BY pe.Orden ASC");
                        foreach ($Opciones as $pp){
                            $pp->Id = parent::CodeEncrypt($pp->Id);
                        }
                        $pre->Opciones = $Opciones;
                    }
                    $sec->Id = parent::CodeEncrypt($sec->Id);
                    $sec->Preguntas = $Preguntas;
                }
                $Pro->Id = parent::CodeEncrypt($en->Id);
                $Pro->Secciones = $Secciones;
            }
            $en->Producto = $Productos;
        }
        
        return response()->json([
            'Cliente'=>$Cliente,
            'Encuesta'=>$Encuesta,
        ]);
    }
    
    public function EncuestaSaveCliente(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $Semana = DB::SELECT("SELECT WEEKOFYEAR(NOW()) AS SEMANA");
            $id = Array();
            
            $idr = DB::table('respuestas_encuestas_ejecutivo')
            ->insertGetId([
                'Semana'=>$Semana[0]->SEMANA,
                'IdProducto'=>parent::CodeDescrypt($request->input('IdProducto')),
                'Fecha'=>date("Y-m-d H:i:s"),
                'IdEncuesta'=>parent::CodeDescrypt($request->input('Hash'))
            ]);
            array_push($id,  $idr );
            
            $Items = \GuzzleHttp\json_decode($request->input('Items'));
            if( count($Items) > 0 ){
                for($i = 0; $i < count($Items);$i++){
                    $Items[$i] = (array) $Items[$i];
                    $Query = 'INSERT INTO respuestas_encuestas_agencia ('
                            . 'IdPregunta,'
                            . 'IdRespuesta,'
                            . 'Fecha,'
                            . 'IdUser,'
                            . 'IdRegistroRC,'
                            . 'Comentarios) '
                            . 'values(?,?,?,?,?,?)';
                    $Data = [
                        $Items[$i]['Id'],
                        parent::CodeDescrypt($Items[$i]['Valor']),
                        date("Y-m-d H:i:s"),
                        $sqlUser[0]->IdUsuario,
                        $idr,
                        $Items[$i]['Comentario']
                    ];
                    
                    DB::INSERT($Query,$Data);
                    array_push($id, $idr );
                }
            }
            (new Controller)->queryLogAuditoria($id,$sqlUser[0]->IdUsuario,'ENCUESTA_AGENCIA_DILIGENCIAR');

            DB::commit();
            
            return response()->json([
                'Info'=>1,
                'mensaje'=>'Gracias por Diligenciar nuestra encuesta.'
            ]);

        }catch (\Exception $ex) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($ex);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        } catch (QueryException $qe) {
            DB::disableQueryLog();
            DB::rollBack();
            dd($qe);
            return response()->json([
                'Info'=>0,
                'mensaje'=>'No se logró guardar esta información, intente de nuevo.'
            ]);
        }
    }
    
    //4b3f9951234aa8beea58166ffc7d226d
    public function InformacionPendientesUsuario(){
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        $PendientesTareasOT = [];
        $x = 0;
        
        //Tareas Pendientes
        $Tipo = "ASIG";
        //--------------------Atrasado----------------------------------
        $Fecha = date("Y-m-d");
        
        $PendientesTareasOT_Anterior = DB::SELECT("SELECT Cliente, NroEntregables, Asunto, FechaEntrega, HoraEntrega, Id "
            . "FROM (SELECT "
            . " c.NombreComercial as Cliente, t.NroEntregables, t.Asunto, DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(t.FechaEntrega,'%T') as HoraEntrega, t.Id "
            . "FROM "
            . "equipotarea et "
            . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
            . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario." "
            . "AND  p.IdEstado = 1 "
            . "AND (t.IdEstado = 1) "
            . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  < '$Fecha' "
            . "and et.Tipo = '$Tipo' "

            . "UNION ALL "
            . "SELECT c.NombreComercial as Cliente,s.NroEntregables, s.Asunto, DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(s.FechaEntrega,'%T') as HoraEntrega, s.Id  "
            . "FROM equipotarea et "
            . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
            . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario."  "
            . "AND p.IdEstado = 1 "
            . "AND (s.IdEstado = 1) "
            . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  < '$Fecha' "
            . "and et.Tipo = '$Tipo' "
            . ") as TempEntragables "
                . "ORDER BY FechaEntrega ASC "
            );
            foreach( $PendientesTareasOT_Anterior as $d ){
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            //--------------------Atrasado----------------------------------
            
            //-------------------entregas del día------------------------------
            $PendientesTareasOT_Hoy = DB::SELECT("SELECT Cliente, NroEntregables, Asunto, FechaEntrega, HoraEntrega, Id "
            . "FROM (SELECT "
            . " c.NombreComercial as Cliente, t.NroEntregables, t.Asunto, DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(t.FechaEntrega,'%T') as HoraEntrega, t.Id "
            . "FROM "
            . "equipotarea et "
            . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
            . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario." "
            . "AND  p.IdEstado = 1 "
            . "AND (t.IdEstado = 1) "
            . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  = '$Fecha' "
            . "and et.Tipo = '$Tipo' "

            . "UNION ALL "
            . "SELECT c.NombreComercial as Cliente,s.NroEntregables, s.Asunto, DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(s.FechaEntrega,'%T') as HoraEntrega, s.Id  "
            . "FROM equipotarea et "
            . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
            . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario."  "
            . "AND p.IdEstado = 1 "
            . "AND (s.IdEstado = 1) "
            . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d')  = '$Fecha' "
            . "and et.Tipo = '$Tipo' "
            . ") as TempEntragables "
                . "ORDER BY FechaEntrega ASC "
            );
            foreach( $PendientesTareasOT_Hoy as $d ){
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            //-------------------entregas del día------------------------------
            
            //-------------------entregas del día------------------------------
            $PendientesTareasOT_Futuro = DB::SELECT("SELECT Cliente, NroEntregables, Asunto, FechaEntrega, HoraEntrega, Id "
            . "FROM (SELECT "
            . " c.NombreComercial as Cliente, t.NroEntregables, t.Asunto, DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(t.FechaEntrega,'%T') as HoraEntrega, t.Id "
            . "FROM "
            . "equipotarea et "
            . "LEFT JOIN tareas t on et.Tareas_Id = t.Id "
            . "INNER JOIN Proyectos p on t.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario." "
            . "AND  p.IdEstado = 1 "
            . "AND (t.IdEstado = 1) "
            . "AND DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d')  > '$Fecha' "
            . "and et.Tipo = '$Tipo' "

            . "UNION ALL "
            . "SELECT c.NombreComercial as Cliente,s.NroEntregables, s.Asunto, DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') as FechaEntrega, DATE_FORMAT(s.FechaEntrega,'%T') as HoraEntrega, s.Id  "
            . "FROM equipotarea et "
            . "LEFT JOIN subtareas s on et.IdSubtarea = s.Id "
            . "INNER JOIN Proyectos p on s.IdProyecto = p.Id "
            . "INNER JOIN Cliente c on p.IdCliente = c.IdCliente AND c.Estado = 1 "
            . "WHERE et.IdUsuario = ".$sqlUser[0]->IdUsuario."  "
            . "AND p.IdEstado = 1 "
            . "AND (s.IdEstado = 1) "
            . "AND DATE_FORMAT(s.FechaEntrega,'%Y-%m-%d') > '$Fecha' "
            . "and et.Tipo = '$Tipo' "
            . ") as TempEntragables "
                . "ORDER BY FechaEntrega ASC "
            );
            foreach( $PendientesTareasOT_Futuro as $d ){
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            //-------------------entregas del día------------------------------
          
            //------PENDIENTES ADMINISTRATIVOS---------------------------------
            $Administrativo_Vencido = DB::SELECT("SELECT "
                    . "c.Nombre as Canal, g.Nombre as Grupo, sg.Nombre as SubGrupo, DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') as FechaEntrega, act.Tarea "
                    . "FROM canales_principales c "
                    . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                    . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                    . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                    . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad AND r.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                    . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') < '$Fecha' "
                    . "ORDER BY act.FechaEntrega ASC");
            foreach( $Administrativo_Vencido as $d ){
                $d->Tarea = nl2br($d->Tarea);
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            $Administrativo_Hoy = DB::SELECT("SELECT "
                    . "c.Nombre as Canal, g.Nombre as Grupo, sg.Nombre as SubGrupo, DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') as FechaEntrega, act.Tarea "
                    . "FROM canales_principales c "
                    . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                    . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                    . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                    . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad AND r.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                    . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') = '$Fecha' "
                    . "ORDER BY act.FechaEntrega ASC");
            foreach( $Administrativo_Hoy as $d ){
                $d->Tarea = nl2br($d->Tarea);
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            $Administrativo_Futuro = DB::SELECT("SELECT "
                    . "c.Nombre as Canal, g.Nombre as Grupo, sg.Nombre as SubGrupo, DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') as FechaEntrega, act.Tarea "
                    . "FROM canales_principales c "
                    . "INNER JOIN Grupos g on c.Id_CP = g.Id_CP "
                    . "INNER JOIN Subgrupo SG on sg.IdCanal = c.Id_CP "
                    . "INNER JOIN Actividades act ON act.Id_Grupo = g.Id_Grupo AND act.IdSubGrupo = sg.Id AND act.Id_Estado = 1 "
                    . "INNER JOIN Responsables r ON r.IdActividad = act.Id_Actividad AND r.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                    . "WHERE DATE_FORMAT(act.FechaEntrega,'%Y-%m-%d') > '$Fecha' "
                    . "ORDER BY act.FechaEntrega ASC");
            foreach( $Administrativo_Futuro as $d ){
                $d->Tarea = nl2br($d->Tarea);
                $Temp = explode("-",$d->FechaEntrega);
                $d->FechaEntrega = parent::NombreDia($d->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            //------PENDIENTES ADMINISTRATIVOS---------------------------------
            
            
        return response()->json([
            'PendientesTareasOT_Anterior'=>$PendientesTareasOT_Anterior,
            'PendientesTareasOT_Futuro'=>$PendientesTareasOT_Futuro,
            'PendientesTareasOT_Hoy'=>$PendientesTareasOT_Hoy,
            'Administrativo_Vencido'=>$Administrativo_Vencido,
            'Administrativo_Hoy'=>$Administrativo_Hoy,
            'Administrativo_Futuro'=>$Administrativo_Futuro,
        ]);
    }

    
}

