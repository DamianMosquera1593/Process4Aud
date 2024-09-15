<?php

namespace App\Http\Controllers\Process\Administracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\DateTime;
use App\Http\Controllers\MailController;

class ContabilidadController extends Controller
{
    //0e0973bff4eb188c176093009025eb79
    public function index()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");

            $empresasUsuario = DB::table('par_usuarioEmpresa as pue')
            ->join('usuario as u',  'pue.IdUsuario', '=', 'u.IdUsuario')
            ->join('empresa as e', 'pue.IdEmpresa', '=', 'e.IdEmpresa')
            ->where('pue.IdUsuario', $usuario[0]->IdUsuario )
            ->select('e.IdEmpresa', 'e.Nit', 'e.NombreLegal', 'e.NombreComercial', 'e.Logo', 'u.IdUsuario', 'Usuario')
            ->distinct()
            ->get();

            $fecha = intval(date('Y'))+intval(date('m'))+intval(date('d'));
            $fechaEnc = parent::CodeEncrypt($fecha);
            foreach ($empresasUsuario as $empresa) {
                $empresa->IdEmpresa = parent::CodeEncrypt($empresa->IdEmpresa);
                $empresa->IdUsuario = parent::CodeEncrypt($empresa->IdUsuario);
                $empresa->url = intval($empresa->IdEmpresa) + intval($fechaEnc);
            }

            return view('process.administracion.contabilidad')->with('empresas', $empresasUsuario);
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //e0cca638ccf1be637638963314e49beb
    public function Admin_Cont_ListarImpuestosIP_Empresa(Request $request){
        $Data = DB::SELECT(""
                . "SELECT "
                . "te.Id,te.Valor,p.Nombre as TipoImpuesto "
                . "FROM Tarifa_Legal_Empresa te "
                . "INNER JOIN Par_Tipo_Tarifa_Legal_Empresa p on te.IdTarifa = p.Id "
                . "WHERE te.Ppto = 'IP' AND te.Estado = 1 "
                . "AND te.IdEmpresa = ".parent::CodeDescrypt($request->input("Hash"))." "
                . "ORDER BY p.Nombre ASC "
                . "");
        $data = [
            'Impuestos' => $Data,
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //5c57ac949372a7549ccd4068c6b779ab
    public function Admin_Cont_GuardarFacturaPresupuesto(Request $request){
        $Credentials = $this->validate(request(),[
            'parEmpresa'  => 'required|int',
            'NumpPpto'  => 'required|int',
            'FechaFact'  => 'required|date',
            'NumFact'  => 'required|string',
            'CostoUnitario_real'  => 'required|string',
            'ValorTotal_real'  => 'required|string',
            'ValorImpuestos_real'  => 'required|string',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            //Registrar Documento OC
            $Query = 'INSERT INTO FacturasPresupuestos ('
                    . 'IdEmpresa,IdPpto,ValorFactura,ValorImpuestos,Estado,IdUsuario,Fecha,FechaFactura,Factura'
                    . ') '
                    . 'values(?,?,?,?,?,?,?,?,?)';
            $Data = [
                parent::CodeDescrypt($Credentials['parEmpresa']),
                $Credentials['NumpPpto'],
                $Credentials['CostoUnitario_real'],
                $Credentials['ValorImpuestos_real'],
                1,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $Credentials['FechaFact'],
                $Credentials['NumFact']
            ];
            DB::INSERT($Query,$Data);
            $IdFactura = DB::getPdo()->lastInsertId();
            array_push($id, $IdFactura );

            
            $Impuestos = \GuzzleHttp\json_decode($request->input('Impuestos'));
            if( count($Impuestos) > 0 ){
                for($i = 0; $i < count($Impuestos);$i++){
                    $Impuestos[$i] = (array) $Impuestos[$i];
                    $Porcent = DB::SELECT("SELECT Valor FROM Tarifa_Legal_Empresa WHERE Id = ".$Impuestos[$i]['Id']);
                    
                    $Query = 'INSERT INTO ImpuestosFactura (IdImpuesto,Porcentaje,Valor,FacturasPresupuestos_Id) values (?, ?, ?, ?)';
                    $Data = [
                        $Impuestos[$i]['Id'],
                        $Porcent[0]->Valor,
                        $Credentials['CostoUnitario_real']*($Porcent[0]->Valor/100),
                        $IdFactura,
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId());
                }
            }
            
            $Query = 'UPDATE Presupuesto SET EstadoVersion = ? Where Id = ?';
            $Data = [
                6,
                $Credentials['NumpPpto'],
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $Credentials['NumpPpto']);
            
            DB::commit();
            
            return response()->json([
                'Info'=>$IdFactura
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
    public function DataOrdenCompra(Request $request){
        $IdOrden = $request->input('Hash2');
        $InformacionOrden = DB::SELECT("SELECT "
            . "p.Id as IdPpto, op.Id , p.Referencia,p.IdEmpresa, op.Estado,"
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
            . "op.Id = ".$IdOrden." "
            . "AND p.IdEmpresa = ".parent::CodeDescrypt($request->input('Hash')));

        foreach ($InformacionOrden as $Orden) {
            $Orden->MotivoCancelacion = nl2br($Orden->MotivoCancelacion);
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
        return response()->json([
            'InfoOC'=>$InformacionOrden
        ]);
    }
    
    public function DataProgPagos(){
        $Bancos = DB::SELECT("SELECT "
                . "Id as Hash, NombreComercial "
                . "FROM BANCO "
                . "WHERE Estado = 1 "
                . "ORDER BY NombreComercial ASC");
        foreach($Bancos as $b){
            $b->Hash = parent::CodeEncrypt($b->Hash);
        }
        return response()->json([
            'Bancos'=>$Bancos,
        ]);
    }
    public function dataProveedores(Request $request){
        $Proveedores = DB::SELECT("SELECT DISTINCT "
                . "p.IdProveedor as Hash, p.NombreComercial as Proveedor "
                . "FROM Proveedor p "
                . "INNER JOIN asoc_empresa_proveedor mp on p.IdProveedor = mp.IdProveedor AND mp.IdEmpresa = ".parent::CodeDescrypt($request->input('Hash'))." "
                . "WHERE p.Estado = 1 "
                . "ORDER BY NombreComercial ASC");
        foreach($Proveedores as $b){
            $b->Hash = parent::CodeEncrypt($b->Hash);
        }
        return response()->json([
            'Proveedores'=>$Proveedores,
            'success' => true
        ]);
    }
    
    
    public function RegistrarProgPago(Request $request){
        $Credentials = $this->validate(request(),[
            'NumOC'  => 'required|int',
            'FechaProPago'  => 'required|date',
            'parBanco'  => 'required|int',
            'Hashf'  => 'required|int',
            'ValorPago'  => 'required',
            'ObservacionesPago'  => 'nullable',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $Banco = parent::CodeDescrypt($Credentials['parBanco']);
            $Hashf = parent::CodeDescrypt($Credentials['Hashf']);
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $ValFecha = DB::SELECT("SELECT Id "
                    . "FROM programacionpagos "
                    . "WHERE FechaPago = '".$Credentials['FechaProPago']."'");
            
            $IdPago = 0;
            if( count($ValFecha) == 0 ){
                //Registrar Pago
                $Query = 'INSERT INTO programacionpagos ('
                        . 'FechaPago,'
                        . 'IdUsuario,'
                        . 'FechaCreacion,'
                        . 'Estado,'
                        . 'IdBanco'
                        . ') '
                        . 'values(?,?,?,?,?)';
                $Data = [
                    $Credentials['FechaProPago'],
                    $sqlUser[0]->IdUsuario,
                    date("Y-m-d H:i:s"),
                    1,
                    $Banco
                ];
                DB::INSERT($Query,$Data);
                $IdPago = DB::getPdo()->lastInsertId();
                array_push($id, $IdPago );
                
                $ValPago = DB::SELECT("SELECT Id "
                        . "FROM detalleprogpagos "
                        . "WHERE IdFactura = ".$Hashf);
                if( count($ValPago) == 0 ){
                    $Observaciones = (empty($Credentials['ObservacionesPago'])) ? '':$Credentials['ObservacionesPago'];
                    $Query = 'INSERT INTO detalleprogpagos ('
                            . 'IdFactura,'
                            . 'IdProgPago,'
                            . 'Estado,'
                            . 'Fecha,'
                            . 'Valor,'
                            . 'Observaciones'
                            . ') '
                            . 'values(?,?,?,?,?,?)';
                    $Data = [
                        $Hashf,
                        $IdPago,
                        1,
                        date("Y-m-d H:i:s"),
                        $Credentials['ValorPago'],
                        $Observaciones
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId() );
                    
                    DB::commit();
                
                    return response()->json([
                        'Info'=>1,
                        'Count' => count($ValFecha)
                    ]);
                }else{
                    DB::commit();
                
                    return response()->json([
                        'Info'=>3,
                        'Count' => count($ValFecha)
                    ]);
                }
                
                
            }else{
                $IdPago = $ValFecha[0]->Id;
                $Observaciones = (empty($Credentials['ObservacionesPago'])) ? '':$Credentials['ObservacionesPago'];
                
                $ValPago = DB::SELECT("SELECT Id "
                        . "FROM detalleprogpagos "
                        . "WHERE IdFactura = ".$Hashf);
                if( count($ValPago) == 0 ){
                    $Observaciones = (empty($Credentials['ObservacionesPago'])) ? '':$Credentials['ObservacionesPago'];
                    $Query = 'INSERT INTO detalleprogpagos ('
                            . 'IdFactura,'
                            . 'IdProgPago,'
                            . 'Estado,'
                            . 'Fecha,'
                            . 'Observaciones'
                            . ') '
                            . 'values(?,?,?,?,?)';
                    $Data = [
                        $Hashf,
                        $IdPago,
                        1,
                        date("Y-m-d H:i:s"),
                        $Observaciones
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId() );
                    
                    DB::commit();
                
                    return response()->json([
                        'Info'=>2,
                        'Count' => count($ValFecha)
                    ]);
                }else{
                
                    return response()->json([
                        'Info'=>3,
                        'Count' => count($ValFecha)
                    ]);
                }
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
    public function DataFacturaOc(Request $request){
        $Tarifa = DB::SELECT("SELECT "
                . "p.Id as Hash, p.Nombre as Tarifa "
                . "FROM tarifa_legal_empresa te "
                . "INNER JOIN par_tipo_tarifa_legal_empresa p on p.Id = te.IdTarifa "
                . "WHERE te.Estado = 1 "
                . "AND te.Ppto = 'IPFP' AND te.IdEmpresa = ".parent::CodeDescrypt($request->input('Hash')));
        foreach( $Tarifa as $f ){
            $f->Hash = parent::CodeEncrypt( $f->Hash );
        }
        $TiposDocumentos = DB::SELECT("SELECT "
                . "Id as Hash, Nombre "
                . "FROM partipodocumentoproveedor "
                . "WHERE Estado = 1 "
                . "ORDER BY Nombre ASC");
        foreach( $TiposDocumentos as $f ){
            $f->Hash = parent::CodeEncrypt( $f->Hash );
        }
        return response()->json([
            'TiposDocumentos'=>$TiposDocumentos,
            'Tarifa' => $Tarifa
        ]);
    }
    
    
    public function FacturasProveedorProximasVencimiento(){
        $DataFuturos = DB::SELECT("SELECT "
                . "f.FechaVencimientoDocumento, f.NumDoc, f.ValorDocumento, f.Impuestos, f.Volumen, f.Total, f.Observaciones, f.IdOc,"
                . "pf.Nombre as FormaPago, p.NombreComercial as Proveedor, TIMESTAMPDIFF(DAY,now(),DATE_FORMAT(f.FechaVencimientoDocumento,'%Y-%m-%d')) as Dif "
                . "FROM facturaroc f "
                . "INNER JOIN ordencompra oc ON f.IdOc = oc.Id "
                . "INNER JOIN Proveedor p ON oc.IdProveedor = p.IdProveedor "
                . "INNER JOIN par_formapago pf on oc.IdFormaPago = pf.Id "
                . "WHERE f.Estado IN (1,2) "
                . "AND TIMESTAMPDIFF(DAY,now(),DATE_FORMAT(f.FechaVencimientoDocumento,'%Y-%m-%d')) BETWEEN 0 AND 10 ");
        $Total = 0;
        $Impuestos = 0;
        $Volumen = 0;
        $ValorDocumento = 0;
        $i = 1;
        $Temp = "";
        
        foreach($DataFuturos as $row){
            $Temp = explode("-",$row->FechaVencimientoDocumento);
            $row->FechaVencimientoDocumento = parent::NombreDia($row->FechaVencimientoDocumento).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $Total += $row->Total;
            $Impuestos += $row->Impuestos;
            $Volumen  += $row->Volumen;
            $ValorDocumento += $row->ValorDocumento;
            $row->Num = $i;
            $row->Hash = parent::CodeEncrypt($row->IdOc);
            $i++;
        }
        if( count($DataFuturos) > 0 ){
            $Temp = explode("-",date("Y-m-d"));
            $FechaAct = parent::NombreDia(date("Y-m-d")).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            $Info['Asunto'] = "Facturas Sin Pagar Próximas a Vencerse, ".$FechaAct;
            $Info['RegistradoPor'] = "Process";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";

            $Info['NumFacturas'] = count($DataFuturos);
            $Info['Data'] = $DataFuturos;
            $Info['Subtotal'] = $ValorDocumento;
            $Info['TotalImpuestosG'] = $Impuestos;
            $Info['Total'] = $Total;
            $Mensaje = "";           

            $Info['Correos'] = "gerencia@processpluserp.com";
            if( (new MailController)->Mail_NotificacionFacturasProxVencimiento($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                echo "Mensaje enviado a ".$Info['Correos']."<br>";
            }else{
                echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
            }
        }else{
            echo "No hay facturas cercanas a vencerse.";
        }
        
        /*
        $Info['Correos'] = "administrativo@pianoproducciones.com";
        if( (new MailController)->Mail_NotificacionFacturasProxVencimiento($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
            echo "Mensaje enviado a ".$Info['Correos']."<br>";
        }else{
            echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
        }
        $Info['Correos'] = "cuentas@pianoproducciones.com";
        if( (new MailController)->Mail_NotificacionFacturasProxVencimiento($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
            echo "Mensaje enviado a ".$Info['Correos']."<br>";
        }else{
            echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
        }*/
    }
    
    //
    public function RegistrarDocumentoProveedor(Request $request){
        $Credentials = $this->validate(request(),[
            'NumOC'  => 'required|int',
            'VolumenDoc'  => 'required',
            'ImpuestosDoc'  => 'required',
            'ValorDoc'  => 'required',
            'NumDocumento'  => 'required|string',
            'FechaVencimiento'  => 'required|date',
            'FechaDocumento'  => 'required|date',
            'TipoDocumento' => 'required|int',
            'Observaciones' => 'nullable|string',
            'ParLogo' => 'nullable|file',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $TipoDocumento = parent::CodeDescrypt($Credentials['TipoDocumento']);
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $pathLogo = "";
            if (!empty($Credentials['ParLogo'])) {
                $pathLogo = $Credentials['ParLogo']->getClientOriginalName();
                $Carpeta = date("Y")."".date("m")."".date("d");
                if(!Storage::exists('Presupuestos/FacturaProveedor/'.$Carpeta)) {
                    Storage::makeDirectory('Presupuestos/FacturaProveedor/'.$Carpeta, 0775, true);
                }
                $Credentials['ParLogo']->storeAs('Presupuestos/FacturaProveedor/'.$Carpeta.'/', $pathLogo);
            }
            
            //Registrar Documento OC
            $Query = 'INSERT INTO facturaroc ('
                    . 'IdUsuario,'
                    . 'FechaR,'
                    . 'IdTipoDocumento,'
                    . 'NumDoc,'
                    . 'FechaDocumento,'
                    . 'FechaVencimientoDocumento,'
                    . 'ValorDocumento,'
                    . 'Impuestos,'
                    . 'Volumen,'
                    . 'Total,'
                    . 'Observaciones,'
                    . 'IdOC,'
                    . '	Adjuntos,'
                    . 'Estado'
                    . ') '
                    . 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            $Data = [
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $TipoDocumento,
                $Credentials['NumDocumento'],
                $Credentials['FechaDocumento'],
                $Credentials['FechaVencimiento'],
                $Credentials['ValorDoc'],
                $Credentials['ImpuestosDoc'],
                $Credentials['VolumenDoc'],
                $Credentials['ImpuestosDoc']+$Credentials['ValorDoc'],
                $Credentials['Observaciones'],
                $Credentials['NumOC'],
                $pathLogo,
                1
            ];
            DB::INSERT($Query,$Data);
            $IdFactura = DB::getPdo()->lastInsertId();
            array_push($id, $IdFactura );

            $Query = 'UPDATE ordencompra SET Estado = ? Where Id = ?';
            $Data = [
                2,
                $Credentials['NumOC']
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $Credentials['NumOC']);
            
            DB::commit();
            
            return response()->json([
                'Info'=>$IdFactura
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
    public function ListarFacturasProveedores(Request $request){
        $draw = $request['draw'];
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "ordencompra oc "
                . "INNER JOIN Usuario u on u.IdUsuario = oc.IdUsuario "
                . "INNER JOIN facturaroc fc on oc.Id = fc.IdOc "
                . "INNER JOIN Proveedor p on p.IdProveedor = oc.IdProveedor "
                . "INNER JOIN par_formapago pf on oc.IdFormaPago = pf.Id "
                . "INNER JOIN partipodocumentoproveedor cpp on fc.IdTipoDocumento = cpp.Id "
                . "LEFT JOIN Usuario u2 on fc.IdUserCancelacion = u2.IdUsuario "
                . " "
                . " ";

        $sqlCampos = "oc.Id as Hash, oc.Id, fc.Id as HashF,fc.Id as Idf,p.NombreLegal, p.NombreComercial,oc.IdPpto, cpp.Nombre as TipoDocumento,"
                . "u.NombreUsuario as Creador, pf.Nombre as FormaPago, "
                . "CASE WHEN fc.Estado = 1 THEN 'Registrada' WHEN fc.Estado = 2 THEN 'En Revisión' WHEN fc.Estado = 3 THEN 'Cancelada' ELSE 'Pagada' END Estado,"
                . "fc.FechaDocumento, fc.FechaVencimientoDocumento as FechaVencimiento, fc.ValorDocumento, fc.Impuestos, fc.Volumen, fc.Total, "
                . "fc.NumDoc,"
                . "REPLACE(DATE_FORMAT(fc.Fechar, '%Y-%m-%d'),'-', '') as Carp,"
                . "DATE_FORMAT(fc.Fechar, '%Y-%m-%d') as FechaCrea, "
                . "DATE_FORMAT(fc.Fechar, '%T') as HoraCrea, "
                . "CASE WHEN ISNULL(fc.Adjuntos) THEN '' ELSE fc.Adjuntos END AS Adjuntos,"
                . "CASE WHEN ISNULL(fc.ObserCancelacion) THEN '' ELSE fc.ObserCancelacion END AS MotivoCancelacion, "
                . "CASE WHEN ISNULL(u2.NombreUsuario) THEN '' ELSE u2.NombreUsuario END AS UsuarioCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(fc.FechaCancelacion, '%Y-%m-%d')) THEN '' ELSE DATE_FORMAT(fc.FechaCancelacion, '%Y-%m-%d') END AS FechaCan, "
                . "CASE WHEN ISNULL(DATE_FORMAT(fc.FechaCancelacion, '%T')) THEN '' ELSE DATE_FORMAT(fc.FechaCancelacion, '%T') END AS HoraCan "
                . " ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['TextBusqueHistorico'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." WHERE ("
                   . "oc.Id like '%".$searchValue."%' or "
                   . "oc.IdPpto like '%".$searchValue."%' or "
                   . "cpp.Nombre like '%".$searchValue."%' or "
                   . "u.NombreUsuario like '%".$searchValue."%' or "
                   . "fc.NumDoc like '%".$searchValue."%' or "
                   . "fc.Fechar like '%".$searchValue."%' or "
                   . "u2.NombreUsuario like '%".$searchValue."%' or "
                   . "DATE_FORMAT(fc.Fechar, '%Y-%m-%d') like '%".$searchValue."%' or "
                   . "p.NombreLegal  like '%".$searchValue."%' or "
                   . "pf.Nombre  like '%".$searchValue."%' or "
                   . "p.NombreComercial like '%".$searchValue."%' "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){
            $Pago = DB::SELECT("SELECT p.FechaPago "
                    . "FROM programacionpagos p "
                    . "INNER JOIN detalleprogpagos d ON p.Id = d.IdProgPago "
                    . "WHERE d.IdFactura = ".$row->HashF);
            $FechaProgPago = "";
            if( count($Pago) != 0 ){
                $Temp = explode("-",$Pago[0]->FechaPago);
                $FechaProgPago = parent::NombreDia($Pago[0]->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }

            $Temp = explode("-",$row->FechaCrea);
            $row->FechaCrea = parent::NombreDia($row->FechaCrea).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            if( ($row->FechaCan) != "" ){
                $Temp = explode("-",$row->FechaCan);
                $row->FechaCan = parent::NombreDia($row->FechaCan).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            }
            $data[] = array(
                "Num"=>$i,
                "HashF"=>parent::CodeEncrypt($row->HashF),
                "Hash"=>parent::CodeEncrypt($row->Hash),
                "Id"=>$row->Id,
                "FechaProgPago"=>$FechaProgPago,
                "Carp"=>$row->Carp,
                "Adjuntos"=>$row->Adjuntos,
                "NombreLegal"=>($row->NombreLegal),
                "NombreComercial"=>$row->NombreComercial,
                "Creador"=>$row->Creador,
                "FechaCrea"=>$row->FechaCrea,
                "HoraCrea"=>$row->HoraCrea,
                "IdPpto"=>$row->IdPpto,
                "TipoDocumento"=>$row->TipoDocumento,
                "Idf"=>$row->Idf,
                
                "FechaDocumento"=>$row->FechaDocumento,
                "FechaVencimiento"=>$row->FechaVencimiento,
                "ValorDocumento"=>$row->ValorDocumento,
                "Volumen"=>$row->Volumen,
                "Total"=>$row->Total,
                "Impuestos"=>$row->Impuestos,
                "NumDoc"=>$row->NumDoc,
                
                "MotivoCancelacion"=> nl2br($row->MotivoCancelacion),
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
    public function CancelarFacturaOC(Request $request){
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            $IdFact = parent::CodeDescrypt($request->input('Hash'));
            
            
            $Query = 'UPDATE facturaroc SET Estado = ? , IdUserCancelacion = ?, FechaCancelacion = ?, ObserCancelacion = ? Where Id = ?';
            $Data = [
                3,
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $request->input('ObservacionesPpto'),
                $IdFact
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $IdFact);
            
            $Occ = DB::SELECT("Select IdOc FROM facturaroc WHERE Id = ".$IdFact);
            
            $Query = 'UPDATE ordencompra SET Estado = ? Where Id = ?';
            $Data = [
                1,
                $Occ[0]->IdOc
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $Occ[0]->IdOc);
            
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
    
    
    public function DataFactPendientesProveedores(){
        $sqlFrom = DB::SELECT( "SELECT "
                . "pt.Codigo as CodigoOT, pp.Id as NumPpto, pp.Referencia as ReferenciaPpto, "
                . "un.Nombre as Unidad, c.NombreComercial as Cliente, op.Id as NumOc, "
                . "pf.Nombre as FormaPago, "
                . "CASE WHEN op.Estado = 1 THEN 'Generada y Enviada' WHEN op.Estado = 2 THEN 'Facturada' WHEN op.Estado = 3 THEN 'Pagada' WHEN op.Estado = 0 THEN 'Cancelada' ELSE '' END Estado,"
                . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') as FechaCrea, TIMESTAMPDIFF(DAY, DATE_FORMAT(op.FechaRadicacion,'%Y-%m-%d'),now()) as Dif, op.FechaRadicacion,"
                . "DATE_FORMAT(op.Fecha, '%T') as HoraCrea,"
                . "u.NombreUsuario as CreadorOC, ue.NombreUsuario as Ejecutivo " 
                . "FROM "
                . "ordencompra op "
                . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
                . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
                . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
                . "INNER JOIN Presupuesto pp on op.IdPpto = pp.Id "
                . "INNER JOIN Cliente c on c.IdCliente = pp.IdCliente AND c.Estado = 1 "
                . "INNER JOIN unidad_negocio un on pp.IdUnidad = un.IdUnidad AND u.Estado = 1 "
                . "INNER JOIN proyectos pt on pt.Id = pp.IdProyecto AND pt.IdEstado != 2 "
                . "INNER JOIN Usuario ue on pt.IdEjecutivo = ue.IdUsuario "
                . "WHERE op.Estado = 1 and isnull(op.usuariocancelacion) "
                . "ORDER BY TIMESTAMPDIFF(DAY, DATE_FORMAT(op.FechaRadicacion,'%Y-%m-%d'),now()) DESC");
        $data = array();
        $i = 1;
        $SubtotalG = 0;
        $VolG = 0;
        $TotalG = 0;
        $TotalImpuestosG = 0;
        foreach($sqlFrom as $row){

            //--------------------------------
            $IdOrden = $row->NumOc;
            $Subtotal = 0;
            $Vol = 0;
            $Total = 0;
            $TotalImpuestos = 0;
            
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
                $Subtotal = $Items->Subtotal;
                
                $Vol += $Items->TotalVolumen;
                
                
                $TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Items->TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                
                
                $Total += $Items->Subtotal - $Items->TotalVolumen;
                $TotalG += $Items->Subtotal - $Items->TotalVolumen;


                if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                   $Items->TotalUnitario = ($TotalItem * ($Items->Valor/100))+$TotalItem;
                   $TotalImpuestos += ($Items->Valor/100);
                }else{
                   $Items->TotalUnitario = 0;
                }
            }
            $SubtotalG += $Subtotal ;
            $VolG += $Vol;
            $TotalG += $Total;
            $TotalImpuestosG += $TotalImpuestos;
            
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
                $Itemsx = DB::SELECT("SELECT SUM(i.Dias*i.Cantidad*i.ValorUnitario) as Valor "
                        . "FROM oc_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenCompra_Id = ".$IdOrden
                        . " GROUP BY i.OrdenCompra_Id ");
                if( count($Itemsx )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestosG += $Itemsx[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Temp = explode("-",$row->FechaCrea);
            $row->FechaCrea = parent::NombreDia($row->FechaCrea).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $Temp = explode("-",$row->FechaRadicacion);
            $row->FechaRadicacion = parent::NombreDia($row->FechaRadicacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            //--------------------------------
            $row->Num = $i;
            $row->Hash = parent::CodeEncrypt($row->NumOc);
           $i++;
        }
        if( count($sqlFrom)  > 0 ){
            $Temp = explode("-",date("Y-m-d"));
            
            $FechaAct = parent::NombreDia(date("Y-m-d")).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];

            $Info['Asunto'] = "Facturas Pendientes por Llegar, ".$FechaAct;
            $Info['RegistradoPor'] = "Process";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";

            $Info['NumFacturas'] = count($sqlFrom);
            $Info['Data'] = $sqlFrom;
            $Info['Subtotal'] = $SubtotalG;
            $Info['TotalImpuestosG'] = $TotalImpuestosG;
            $Info['Total'] = $TotalG;
            $Mensaje = "";           

            $Info['Correos'] = "gerencia@processpluserp.com";
            if( (new MailController)->Mail_NotificacionFacturasPendientesPorLlegar($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                echo "Mensaje enviado a ".$Info['Correos']."<br>";
            }else{
                echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
            }
            $Info['Correos'] = "administrativo@pianoproducciones.com";
            if( (new MailController)->Mail_NotificacionFacturasPendientesPorLlegar($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                echo "Mensaje enviado a ".$Info['Correos']."<br>";
            }else{
                echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
            }
            $Info['Correos'] = "cuentas@pianoproducciones.com";
            if( (new MailController)->Mail_NotificacionFacturasPendientesPorLlegar($Info,$Info['Correos'],$Info['RegistradoPor']) == 'Mensaje Enviado'){
                echo "Mensaje enviado a ".$Info['Correos']."<br>";
            }else{
                echo "No se logró enviar el mensaje a ".$Info['Correos']."<br>";
            }

        }else{
            echo "No hay facturas pendientes por llegar para reportar.";
        }
        
    }
    
    //
    public function DataFacturasPendientesProveedores(Request $request){
        
        $Empresa = " pp.IdEmpresa ";
        
        if( !empty($request['search']['HashE']) ){
            $Empresa = parent::CodeDescrypt($request['search']['HashE']);
        }
        
        $sqlFrom = "FROM "
                . "ordencompra op "
                . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
                . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
                . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
                . "INNER JOIN Presupuesto pp on op.IdPpto = pp.Id "
                . "INNER JOIN Cliente c on c.IdCliente = pp.IdCliente AND c.Estado = 1 "
                . "INNER JOIN unidad_negocio un on pp.IdUnidad = un.IdUnidad AND u.Estado = 1 "
                . "INNER JOIN proyectos pt on pt.Id = pp.IdProyecto AND pt.IdEstado != 2 "
                . "INNER JOIN Usuario ue on pt.IdEjecutivo = ue.IdUsuario "
                . "WHERE pp.IdEmpresa = ".$Empresa." "
                . "AND op.Estado = 1 and isnull(op.usuariocancelacion) ";
        if( !empty($request['search']['HashC']) ){
            $sqlFrom .= " AND pp.IdCliente = ".parent::CodeDescrypt($request['search']['HashC']);
        }
        
        if( !empty($request['search']['HashU']) ){
            $sqlFrom .= " AND pp.IdUnidad = ".parent::CodeDescrypt($request['search']['HashU']);
        }
        if( !empty($request['search']['HashP']) ){
            $sqlFrom .= " AND p.IdProveedor = ".parent::CodeDescrypt($request['search']['HashP']);
        }
        
        
        
        
        
        $draw = $request['draw'];
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlCampos = "pt.Codigo as CodigoOT, pp.Id as NumPpto, pp.Referencia as ReferenciaPpto, "
                . "un.Nombre as Unidad, c.NombreComercial as Cliente, op.Id as NumOc, "
                . "pf.Nombre as FormaPago, "
                . "CASE WHEN op.Estado = 1 THEN 'Generada y Enviada' WHEN op.Estado = 2 THEN 'Facturada' WHEN op.Estado = 3 THEN 'Pagada' WHEN op.Estado = 0 THEN 'Cancelada' ELSE '' END Estado,"
                . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') as FechaCrea, TIMESTAMPDIFF(DAY, DATE_FORMAT(op.FechaRadicacion,'%Y-%m-%d'),now()) as Dif, op.FechaRadicacion,"
                . "DATE_FORMAT(op.Fecha, '%T') as HoraCrea,"
                . "u.NombreUsuario as CreadorOC, ue.NombreUsuario as Ejecutivo "
                . ""
                . "";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue =""; /*$request['search']['TextBusquedaFPL'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." AND ("
                   . "pt.Codigo like '%".$searchValue."%' or "
                   . "pp.Id like '%".$searchValue."%' or "
                   . "pp.Referencia like '%".$searchValue."%' or "
                   . "un.Nombre like '%".$searchValue."%' or "
                   . "c.NombreComercial like '%".$searchValue."%' or "
                   . "op.Id like '%".$searchValue."%' or "
                   . "pf.Nombre like '%".$searchValue."%' or "
                   . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }*/
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        $SubtotalG = 0;
        $VolG = 0;
        $TotalG = 0;
        $TotalImpuestosG = 0;
        foreach($empRecords['empRecords'] as $row){

            //--------------------------------
            $IdOrden = $row->NumOc;
            $Subtotal = 0;
            $Vol = 0;
            $Total = 0;
            $TotalImpuestos = 0;
            
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
                $Subtotal = $Items->Subtotal;
                
                $Vol += $Items->TotalVolumen;
                
                
                $TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Items->TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                
                
                $Total += $Items->Subtotal - $Items->TotalVolumen;
                $TotalG += $Items->Subtotal - $Items->TotalVolumen;


                if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                   $Items->TotalUnitario = ($TotalItem * ($Items->Valor/100))+$TotalItem;
                   $TotalImpuestos += ($Items->Valor/100);
                }else{
                   $Items->TotalUnitario = 0;
                }
            }
            $SubtotalG += $Subtotal ;
            $VolG += $Vol;
            $TotalG += $Total;
            $TotalImpuestosG += $TotalImpuestos;
            
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
                $Itemsx = DB::SELECT("SELECT SUM(i.Dias*i.Cantidad*i.ValorUnitario) as Valor "
                        . "FROM oc_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenCompra_Id = ".$IdOrden
                        . " GROUP BY i.OrdenCompra_Id ");
                if( count($Itemsx )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestosG += $Itemsx[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            $Temp = explode("-",$row->FechaCrea);
            $row->FechaCrea = parent::NombreDia($row->FechaCrea).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $Temp = explode("-",$row->FechaRadicacion);
            $row->FechaRadicacion = parent::NombreDia($row->FechaRadicacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            //--------------------------------
            $data[] = array(
                "Num"=>$i,
                "ImpuestosItems"=>$ImpuestosPptoItems,
                "ItemsOP"=>$ItemsOP,
                "Subtotal"=>$Subtotal,
                "Total"=>$Total,
                "Vol"=>$Vol,
                "TotalImpuestos"=>$TotalImpuestos,
                
                "CodigoOT"=>($row->CodigoOT),
                "Dif"=>($row->Dif),
                "NumPpto"=>($row->NumPpto),
                "ReferenciaPpto"=>$row->ReferenciaPpto,
                "FechaRadicacion"=>$row->FechaRadicacion,
                "Unidad"=>$row->Unidad,
                "Cliente"=>$row->Cliente,
                "NumOc"=>($row->NumOc),
                "FormaPago"=>$row->FormaPago,
                "Estado"=>$row->Estado,
                "FechaCrea"=>$row->FechaCrea,
                "HoraCrea"=>$row->HoraCrea,
                "CreadorOC"=>$row->CreadorOC,
                "Ejecutivo"=>$row->Ejecutivo,
                "Total" => $Total,
                "Subtotal" => $Subtotal,
                "TotalImpuestos" => $TotalImpuestos,
                "Vol" => $VolG,
                "Hash"=>parent::CodeEncrypt($row->NumOc),
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "Total" => $TotalG,
            "Subtotal" => $SubtotalG,
            "TotalImpuestos" => $TotalImpuestosG,
            "Vol" => $VolG,
            "aaData" => $data,
        );

        return json_encode($response);
    }
    
    //e6249046a837237a71785f6bd77446b5
    public function DataFacturasPendientesPagoProveedores(Request $request){
        
        $Empresa = " pp.IdEmpresa ";
        
        if( !empty($request['search']['HashE']) ){
            $Empresa = parent::CodeDescrypt($request['search']['HashE']);
        }
        
        $sqlFrom = "FROM "
                . "ordencompra op "
                . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
                . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
                . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
                . "INNER JOIN Presupuesto pp on op.IdPpto = pp.Id "
                . "INNER JOIN Cliente c on c.IdCliente = pp.IdCliente  "
                . "INNER JOIN unidad_negocio un on pp.IdUnidad = un.IdUnidad "
                . "INNER JOIN proyectos pt on pt.Id = pp.IdProyecto "
                . "INNER JOIN Usuario ue on pt.IdEjecutivo = ue.IdUsuario "
                . "INNER JOIN facturaroc ff on ff.IdOc = op.Id "
                . "WHERE pp.IdEmpresa = ".$Empresa." "
                . "AND op.Estado = 2 ";
        if( !empty($request['search']['HashC']) ){
            $sqlFrom .= " AND pp.IdCliente = ".parent::CodeDescrypt($request['search']['HashC']);
        }
        
        if( !empty($request['search']['HashU']) ){
            $sqlFrom .= " AND pp.IdUnidad = ".parent::CodeDescrypt($request['search']['HashU']);
        }
        if( !empty($request['search']['HashP']) ){
            $sqlFrom .= " AND p.IdProveedor = ".parent::CodeDescrypt($request['search']['HashP']);
        }
        
        $draw = $request['draw'];
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlCampos = "pt.Codigo as CodigoOT, pp.Id as NumPpto, pp.Referencia as ReferenciaPpto, "
                . "un.Nombre as Unidad, c.NombreComercial as Cliente, op.Id as NumOc, "
                . "pf.Nombre as FormaPago, "
                . "CASE WHEN op.Estado = 1 THEN 'Generada y Enviada' WHEN op.Estado = 2 THEN 'Facturada' WHEN op.Estado = 3 THEN 'Pagada' WHEN op.Estado = 0 THEN 'Cancelada' ELSE '' END Estado,"
                . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') as FechaCrea, "
                . "DATE_FORMAT(op.Fecha, '%T') as HoraCrea,"
                . "u.NombreUsuario as CreadorOC, ue.NombreUsuario as Ejecutivo "
                . ""
                . "";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue =""; /*$request['search']['TextBusquedaFPL'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." AND ("
                   . "pt.Codigo like '%".$searchValue."%' or "
                   . "pp.Id like '%".$searchValue."%' or "
                   . "pp.Referencia like '%".$searchValue."%' or "
                   . "un.Nombre like '%".$searchValue."%' or "
                   . "c.NombreComercial like '%".$searchValue."%' or "
                   . "op.Id like '%".$searchValue."%' or "
                   . "pf.Nombre like '%".$searchValue."%' or "
                   . "DATE_FORMAT(op.Fecha, '%Y-%m-%d') like '%".$searchValue."%' "
                   . ") ";
        }*/
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        $SubtotalG = 0;
        $VolG = 0;
        $TotalG = 0;
        $TotalImpuestosG = 0;
        foreach($empRecords['empRecords'] as $row){

            $Temp = explode("-",$row->FechaCrea);
            $row->FechaCrea = parent::NombreDia($row->FechaCrea).", ".intval($Temp[2])." de ".parent::NombreMesesLargo($Temp[1])." de ".$Temp[0];
            
            //--------------------------------
            $IdOrden = $row->NumOc;
            $Subtotal = 0;
            $Vol = 0;
            $Total = 0;
            $TotalImpuestos = 0;
            
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
                $Subtotal = $Items->Subtotal;
                
                $Vol += $Items->TotalVolumen;
                
                
                $TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                $Items->TotalItem = $Items->Subtotal - $Items->TotalVolumen;
                
                
                $Total += $Items->Subtotal - $Items->TotalVolumen;
                $TotalG += $Items->Subtotal - $Items->TotalVolumen;


                if( $Items->Tipo == 'PORCENTAJE' || $Items->Tipo == 'SIN VALOR' ){
                   $Items->TotalUnitario = ($TotalItem * ($Items->Valor/100))+$TotalItem;
                   $TotalImpuestos += ($Items->Valor/100);
                }else{
                   $Items->TotalUnitario = 0;
                }
            }
            $SubtotalG += $Subtotal ;
            $VolG += $Vol;
            $TotalG += $Total;
            $TotalImpuestosG += $TotalImpuestos;
            
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
                $Itemsx = DB::SELECT("SELECT SUM(i.Dias*i.Cantidad*i.ValorUnitario) as Valor "
                        . "FROM oc_detalle i "
                        . "INNER join par_tipo_tarifa_legal_empresa pi on i.IdImpuesto = pi.id "
                        . "INNER join tarifa_legal_empresa ti on ti.Id = pi.Id "
                        . "WHERE  i.OrdenCompra_Id = ".$IdOrden
                        . " GROUP BY i.OrdenCompra_Id ");
                if( count($Itemsx )== 0 ){
                    $t->Total = 0;
                }else{
                    if( $t->Tipo = 'PORCENTAJE' || $t->Tipo = 'SIN VALOR' ){
                        $t->Total = $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestos += $Itemsx[0]->Valor*($t->Valor/100);
                        $TotalImpuestosG += $Itemsx[0]->Valor*($t->Valor/100);
                    }else{
                        $t->Total = 0;
                    }
                }
            }
            
            //--------------------------------
            $data[] = array(
                "Num"=>$i,
                "ImpuestosItems"=>$ImpuestosPptoItems,
                "ItemsOP"=>$ItemsOP,
                "Subtotal"=>$Subtotal,
                "Total"=>$Total,
                "Vol"=>$Vol,
                "TotalImpuestos"=>$TotalImpuestos,
                
                "CodigoOT"=>($row->CodigoOT),
                "NumPpto"=>($row->NumPpto),
                "ReferenciaPpto"=>$row->ReferenciaPpto,
                "Unidad"=>$row->Unidad,
                "Cliente"=>$row->Cliente,
                "NumOc"=>($row->NumOc),
                "FormaPago"=>$row->FormaPago,
                "Estado"=>$row->Estado,
                "FechaCrea"=>$row->FechaCrea,
                "HoraCrea"=>$row->HoraCrea,
                "CreadorOC"=>$row->CreadorOC,
                "Ejecutivo"=>$row->Ejecutivo,
                "Total" => $Total,
                "Subtotal" => $Subtotal,
                "TotalImpuestos" => $TotalImpuestos,
                "Vol" => $VolG,
                "Hash"=>parent::CodeEncrypt($row->NumOc),
            );
           $i++;
        }

        $response = array(
            "draw" => intval($empRecords['draw']),
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "Total" => $TotalG,
            "Subtotal" => $SubtotalG,
            "TotalImpuestos" => $TotalImpuestosG,
            "Vol" => $VolG,
            "aaData" => $data,
        );

        return json_encode($response);
    }
    
    //
    public function Admin_Contabilidad_DataFacturaPpto(Request $request){
        $Credentials = $this->validate(request(),[
            'parEmpresa'  => 'required|int',
            'NumpPpto'  => 'required|int',
            'NumFact'  => 'required|string',
        ]);
        $Info = DB::SELECT("SELECT "
                . "Id, Factura, ValorFactura,ValorImpuestos "
                . "FROM FacturasPresupuestos "
                . "WHERE IdEmpresa = ".parent::CodeDescrypt($Credentials['parEmpresa'])." "
                . "AND IdPpto = ".$Credentials['NumpPpto']." "
                . "AND Factura = '".$Credentials['NumFact']."'");
        if( count($Info) == 0 ){
            return response()->json([
                'Info'=>0
            ]); 
        }else{
            foreach( $Info as $d ){
                $d->Id = parent::CodeEncrypt($d->Id);
            }
            
            $Descuentos = DB::SELECT("SELECT Id,Nombre "
                    . "FROM Par_Descuentos_Pagos "
                    . "WHERE Estado = 1 "
                    . "Order by Nombre Asc");
            foreach( $Descuentos as $d ){
                $d->Id = parent::CodeEncrypt($d->Id);
            }
            
            $TipoPagos = DB::SELECT("SELECT Id,Nombre "
                    . "FROM Par_Tipo_Pago_Cliente "
                    . "WHERE Estado = 1 "
                    . "Order by Nombre Asc");
            foreach( $TipoPagos as $d ){
                $d->Id = parent::CodeEncrypt($d->Id);
            }
            
            return response()->json([
                'Info'=>1,
                'Fact'=>$Info,
                'Descuentos'=>$Descuentos,
                'TipoPagos'=>$TipoPagos,
                'X'=>''
            ]);
        }
        
    }
    
    //
    public function Admin_Contabilidad_SavePagoCliente(Request $request){
        $Credentials = $this->validate(request(),[
            'HashFactCliente'  => 'required|int',
            'TipoPagos'  => 'required|int',
            'FechaPago'  => 'required|date',
            'ValorTotal_real'  => 'required',
        ]);
        
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            //Registrar Documento OC
            $Query = 'INSERT INTO PagosFacturas ('
                    . 'Valor,FechaPago,IdUsuario,Fecha,FacturasPresupuestos_Id,IdTipoPago'
                    . ') '
                    . 'values(?,?,?,?,?,?)';
            $Data = [
                $Credentials['ValorTotal_real'],
                $Credentials['FechaPago'],
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                parent::CodeDescrypt($Credentials['HashFactCliente']),
                parent::CodeDescrypt($Credentials['TipoPagos'])
            ];
            DB::INSERT($Query,$Data);
            $IdPago = DB::getPdo()->lastInsertId();
            array_push($id, $IdPago );

            
            $Descuentos = \GuzzleHttp\json_decode($request->input('Descuentos'));
            if( count($Descuentos) > 0 ){
                for($i = 0; $i < count($Descuentos);$i++){
                    $Descuentos[$i] = (array) $Descuentos[$i];
                    
                    $Query = 'INSERT INTO DescuentosPagosCliente (IdConcepto,Valor,IdPago) values (?, ?, ?)';
                    $Data = [
                        parent::CodeDescrypt($Descuentos[$i]['Id']),
                        $Descuentos[$i]['Valor'],
                        $IdPago,
                    ];
                    DB::INSERT($Query,$Data);
                    array_push($id, DB::getPdo()->lastInsertId());
                }
            }
            if( parent::CodeDescrypt($Credentials['TipoPagos']) == 1 ){
                $Ppto = DB::SELECT("SELECT IdPpto FROM FacturasPresupuestos WHERE Id = ".parent::CodeDescrypt($Credentials['HashFactCliente']));
                $Query = 'UPDATE Presupuesto SET EstadoVersion = ? Where Id = ?';
                $Data = [
                    7,
                    $Ppto[0]->IdPpto
                ];
                DB::UPDATE($Query,$Data);
                array_push($id, $Ppto[0]->IdPpto);
            }
            if( parent::CodeDescrypt($Credentials['TipoPagos']) == 2 ){
                $Ppto = DB::SELECT("SELECT IdPpto FROM FacturasPresupuestos WHERE Id = ".parent::CodeDescrypt($Credentials['HashFactCliente']));
                $Query = 'UPDATE Presupuesto SET EstadoVersion = ? Where Id = ?';
                $Data = [
                    8,
                    $Ppto[0]->IdPpto
                ];
                DB::UPDATE($Query,$Data);
                array_push($id, $Ppto[0]->IdPpto);
            }
            
            DB::commit();
            
            return response()->json([
                'Info'=>$IdPago
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
    public function Admin_Contabilidad_DataFacturasPendientesCliente(Request $request){
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = p.IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
        $Cliente = ($request->input('OTC_Cliente') == '') ? " AND p.IdCliente = p.IdCliente ": "AND p.IdCliente = ".parent::CodeDescrypt($request->input('OTC_Cliente'))." ";
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $TotalUnidad = 0;
        $CantidadUnidad = 0;
        $DataEmpresa = DB::SELECT("SELECT "
                . "un.IdUnidad, un.Nombre as Unidad,"
                . "SUM(fp.ValorFactura) as Cartera,Sum(1) as Cantidad  "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 AND fp.Estado = 1 "
                . "WHERE p.IdEmpresa = $Empresa "
                . $Unidad
                . $Cliente
                . "GROUP BY un.IdUnidad, un.Nombre  "
                . "ORDER BY un.Nombre ASC");
        foreach( $DataEmpresa as $d ){
            $TotalUnidad += $d->Cartera;
            $CantidadUnidad += $d->Cantidad;
            $DataCliente = DB::SELECT("SELECT "
                . "cl.IdCliente, cl.NombreComercial as Cliente,"
                . "SUM(fp.ValorFactura) as Cartera,Sum(1) as Cantidad "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1  "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND fp.Estado = 1 "
                . "WHERE p.IdEmpresa = $Empresa AND emp.Estado = 1  AND p.IdUnidad = ".$d->IdUnidad." "
                . $Unidad
                . $Cliente
                . "GROUP BY cl.IdCliente, cl.NombreComercial  "
                . "ORDER BY cl.NombreComercial ASC");
            
            foreach( $DataCliente as $c ){
                
                $DataClienteDetalle = DB::SELECT("SELECT "
                . "cl.IdCliente, cl.NombreComercial as Cliente,ppc.Dias, "
                . "fp.FechaFactura,fp.Factura,p.Referencia, px.Codigo, p.Id as Ppto,fp.ValorFactura, fp.ValorImpuestos "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Negociaciones nn on p.TipoComision = nn.Id "
                . "INNER JOIN Par_PagoCliente ppc on nn.IdCondicionPago = ppc.Id "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND fp.Estado = 1 "
                . "INNER JOIN Proyectos px on p.IdProyecto = px.Id "
                . "WHERE p.IdEmpresa = $Empresa AND emp.Estado = 1  AND p.IdUnidad = ".$d->IdUnidad." AND p.IdCliente = ".$c->IdCliente." "
                . $Unidad
                . $Cliente
                . "ORDER BY fp.FechaFactura ASC");
                foreach( $DataClienteDetalle as $cc ){
                    $Temp = explode("-",$cc->FechaFactura);
                    $cc->Fecha = parent::NombreDia($cc->FechaFactura).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    
                    $Tempx = date("Y-m-d",strtotime('+'.$cc->Dias.' day', strtotime($cc->FechaFactura)));
                    $Temp = explode("-",$Tempx);
                    $cc->FechaVencimiento = parent::NombreDia($Tempx).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    
                    $date1 = new \DateTime(date("Y-m-d"));
                    $date2 = new \DateTime($Tempx);
                    $diff = $date1->diff($date2);
                    // will output 2 days
                    if( $Tempx > date("Y-m-d") ){
                        $cc->DiasMora = (-1)*$diff->days;
                        $cc->Estado = 'No Vencido';
                    }else{
                        $cc->DiasMora = $diff->days;
                        $cc->Estado = 'Vencido';
                        
                    }
                    
                }
                $c->Detalle = $DataClienteDetalle;
                $c->IdCliente = parent::CodeEncrypt($c->IdCliente);
            }
            $d->Clientes = $DataCliente;
            $d->IdUnidad = parent::CodeEncrypt($d->IdUnidad);
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        
        return response()->json([
            'Report'=>$DataEmpresa,
            'TotalUnidad'=>$TotalUnidad,
            'CantidadUnidad'=>$CantidadUnidad,
            'Colors' => $Colors,
        ]);
    }
    
    public function Admin_Contabilidad_DataFacturasPendientesClienteVencido(Request $request){
        $Empresa = parent::CodeDescrypt($request->input('OTC_Empresa'));
        $Unidad = ($request->input('OTC_Unidad') == '') ? " AND p.IdUnidad = p.IdUnidad ": "AND p.IdUnidad = ".parent::CodeDescrypt($request->input('OTC_Unidad'))." ";
        $Cliente = ($request->input('OTC_Cliente') == '') ? " AND p.IdCliente = p.IdCliente ": "AND p.IdCliente = ".parent::CodeDescrypt($request->input('OTC_Cliente'))." ";
        
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $TotalUnidad = 0;
        $CantidadUnidad = 0;
        $DataEmpresa = DB::SELECT("SELECT "
                . "un.IdUnidad, un.Nombre as Unidad,"
                . "SUM(fp.ValorFactura) as Cartera,Sum(1) as Cantidad  "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Negociaciones nn on p.TipoComision = nn.Id "
                . "INNER JOIN Par_PagoCliente ppc on nn.IdCondicionPago = ppc.Id "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND fp.Estado = 1 "
                . "INNER JOIN Proyectos px on p.IdProyecto = px.Id "
                . "WHERE p.IdEmpresa = $Empresa AND emp.Estado = 1 AND DATE_ADD(fp.FechaFactura,INTERVAL ppc.Dias DAY) < Now() "
                . $Unidad
                . $Cliente
                . "GROUP BY un.IdUnidad, un.Nombre  "
                . "ORDER BY un.Nombre ASC");
        foreach( $DataEmpresa as $d ){
            $TotalUnidad += $d->Cartera;
            $CantidadUnidad += $d->Cantidad;
            $DataCliente = DB::SELECT("SELECT "
                . "cl.IdCliente, cl.NombreComercial as Cliente,"
                . "SUM(fp.ValorFactura) as Cartera,Sum(1) as Cantidad "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Negociaciones nn on p.TipoComision = nn.Id "
                . "INNER JOIN Par_PagoCliente ppc on nn.IdCondicionPago = ppc.Id "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND fp.Estado = 1 "
                . "INNER JOIN Proyectos px on p.IdProyecto = px.Id "
                . "WHERE p.IdEmpresa = $Empresa AND emp.Estado = 1 AND p.IdUnidad = ".$d->IdUnidad." AND DATE_ADD(fp.FechaFactura,INTERVAL ppc.Dias DAY)< Now() "
                . $Unidad
                . $Cliente
                . "GROUP BY cl.IdCliente, cl.NombreComercial  "
                . "ORDER BY cl.NombreComercial ASC");
            
            foreach( $DataCliente as $c ){
                
                $DataClienteDetalle = DB::SELECT("SELECT "
                . "cl.IdCliente, cl.NombreComercial as Cliente,ppc.Dias, "
                . "fp.FechaFactura,fp.Factura,p.Referencia, px.Codigo, p.Id as Ppto,fp.ValorFactura, fp.ValorImpuestos "
                . "FROM FacturasPresupuestos fp "
                . "INNER JOIN Presupuesto p on fp.IdPpto = p.Id AND fp.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Negociaciones nn on p.TipoComision = nn.Id "
                . "INNER JOIN Par_PagoCliente ppc on nn.IdCondicionPago = ppc.Id "
                . "INNER JOIN Par_UsuarioUnidad pu on p.IdUnidad = pu.IdUnidad AND pu.IdUsuario = ".$sqlUser[0]->IdUsuario." "
                . "INNER JOIN unidad_negocio un on pu.IdUnidad = un.IdUnidad AND un.IdUnidad = p.IdUnidad and un.IdEmpresa = p.IdEmpresa "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND fp.Estado = 1 "
                . "INNER JOIN Proyectos px on p.IdProyecto = px.Id "
                . "WHERE p.IdEmpresa = $Empresa AND emp.Estado = 1 AND p.IdUnidad = ".$d->IdUnidad." AND p.IdCliente = ".$c->IdCliente." AND DATE_ADD(fp.FechaFactura,INTERVAL ppc.Dias DAY)< Now() "
                . $Unidad
                . $Cliente
                . "ORDER BY fp.FechaFactura ASC");
                foreach( $DataClienteDetalle as $cc ){
                    $Temp = explode("-",$cc->FechaFactura);
                    $cc->Fecha = parent::NombreDia($cc->FechaFactura).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    
                    $Tempx = date("Y-m-d",strtotime('+'.$cc->Dias.' day', strtotime($cc->FechaFactura)));
                    $Temp = explode("-",$Tempx);
                    $cc->FechaVencimiento = parent::NombreDia($Tempx).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    
                    $date1 = new \DateTime(date("Y-m-d"));
                    $date2 = new \DateTime($Tempx);
                    $diff = $date1->diff($date2);
                    // will output 2 days
                    if( $Tempx > date("Y-m-d") ){
                        $cc->DiasMora = (-1)*$diff->days;
                        $cc->Estado = 'No Vencido';
                    }else{
                        $cc->DiasMora = $diff->days;
                        $cc->Estado = 'Vencido';
                        
                    }
                    
                }
                $c->Detalle = $DataClienteDetalle;
                $c->IdCliente = parent::CodeEncrypt($c->IdCliente);
            }
            $d->Clientes = $DataCliente;
            $d->IdUnidad = parent::CodeEncrypt($d->IdUnidad);
        }
        
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
        ->where('Estado', 1)
        ->orderByDesc('Id')
        ->get();
        
        return response()->json([
            'Report'=>$DataEmpresa,
            'TotalUnidad'=>$TotalUnidad,
            'CantidadUnidad'=>$CantidadUnidad,
            'Colors' => $Colors,
        ]);
    }
    
    public function ListarProgmPagos(Request $request){
        $draw = $request['draw'];
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "programacionpagos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.IdEmpresa =  ".parent::CodeDescrypt($request['search']['HashE'])." "
                . "INNER JOIN Banco b on p.IdBanco = b.Id "
                . "INNER JOIN Usuario u on u.IdUsuario = p.IdUsuario "
                . "INNER JOIN par_estados_pagos_bancos epr on p.Estado = epr.Id ";

        $sqlCampos = "emp.NombreComercial as Empresa, b.NombreComercial as Banco,p.Tipo, u.NombreUsuario,p.Id, p.FechaPago, DATE_FORMAT(p.FechaCreacion,'%Y-%m-%d') as FechaCreacion, epr.Nombre as Estado "
                . " ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['TextBusqueHistorico'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." WHERE ("
                   . "p.FechaPago like '%".$searchValue."%' or "
                   . "p.FechaCreacion like '%".$searchValue."%' or "
                   . "b.NombreComercial like '%".$searchValue."%' or "
                   . "epr.Nombre like '%".$searchValue."%'  "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){
            $Valor = DB::SELECT("SELECT d.IdProgPago, SUM(Valor) as Valor "
                    . "FROM detalleprogpagos d  "
                    . "WHERE d.IdProgPago = ".$row->Id." "
                    . "group by d.IdProgPago");
            $Valor2 = DB::SELECT("SELECT d.IdProgPago, SUM(Valor) as Valor "
                    . "FROM detallepagos_manuales d  "
                    . "WHERE d.IdProgPago = ".$row->Id." "
                    . "group by d.IdProgPago");
            
            $Temp = explode("-",$row->FechaPago);
            $FechaProgPago = parent::NombreDia($row->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaCreacion);
            $FechaCreacion = parent::NombreDia($row->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Val = 0;
            if( count($Valor) != 0 ){
                $Val = $Valor[0]->Valor;
            }
            if( count($Valor2) != 0 ){
                $Val += $Valor2[0]->Valor;
            }
            
            //Pendiente Apro.
            $Pe = DB::SELECT(""
                    . "SELECT u.NombreUsuario,n.Nivel,"
                    . "CASE WHEN ISNULL(n.Estado) THEN 'Sin Revisar'"
                    . "WHEN n.Estado = 1 THEN 'Aprobado' "
                    . "WHEN n.Estado = 0 THEN 'No Aprobador' END as Estado "
                    . "FROM Usuario u "
                    . "INNER JOIN nivelpagos np on u.IdUsuario = np.IdUsuario "
                    . "INNER JOIN nivelaprobacionespago n on np.Nivel = n.Nivel "
                    . "WHERE np.Tipo = '".$row->Tipo."' AND n.IdProgAprobacion = ".$row->Id);
            //Faltantes
            $Fal = "";
            if( count($Pe) == 0 ){
                $Fal = DB::SELECT("SELECT "
                        . "u.NombreUsuario, n.Nivel "
                        . "FROM Usuario u "
                        . "INNER JOIN nivelpagos n on u.IdUsuario = n.IdUsuario AND n.Tipo = '".$row->Tipo."' "
                        . "ORDER BY n.Nivel ASC");
            }else{
                $Fal = DB::SELECT("SELECT "
                        . "u.NombreUsuario, n.Nivel "
                        . "FROM Usuario u "
                        . "INNER JOIN nivelpagos n on u.IdUsuario = n.IdUsuario "
                        . "WHERE n.Tipo = '".$row->Tipo."' AND n.Nivel > ".$Pe[count($Pe)-1]->Nivel." "
                        . "ORDER BY n.Nivel ASC");
            }
            $data[] = array(
                "Num"=>$i,
                "Hash"=>parent::CodeEncrypt($row->Id),
                "Id"=>$row->Id,
                "Pendientes"=>$Pe,
                "Faltantes"=>$Fal,
                "FechaPago"=>$FechaProgPago,
                "FechaCreacion"=>$FechaCreacion,
                "Banco"=>($row->Banco),
                "Empresa"=>($row->Empresa),
                "Estado"=>($row->Estado),
                "NombreUsuario"=>($row->NombreUsuario),
                "Valor"=>$Val
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
    
    public function __GuardarPagosManuales(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash'  => 'required|int',
            'FechaPago'  => 'required|date',
            'parBancos'  => 'required|int',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $Hash = parent::CodeDescrypt($Credentials['Hash']);
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO programacionpagos ('
                    . 'IdUsuario,FechaCreacion,'
                    . 'FechaPago,'
                    . 'Estado,'
                    . 'IdBanco, Tipo,IdEmpresa'
                    . ') '
                    . 'values(?,?,?,?,?,?,?)';
            $Data = [
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $Credentials['FechaPago'],
                1,
                parent::CodeDescrypt($Credentials['parBancos']),
                'ADMINISTRATIVO',
                parent::CodeDescrypt($Credentials['Hash']),
            ];
            DB::INSERT($Query,$Data);
            $IdAprobacion = DB::getPdo()->lastInsertId();
            array_push($id, $IdAprobacion );

            $CData = \GuzzleHttp\json_decode($request->input('Pagos'));
            for($i = 0; $i < count($CData);$i++){
                $CData[$i] = (array) $CData[$i];

                $Query_ = 'INSERT INTO detallepagos_manuales (Nombre,Proveedor,Cliente,Presupuesto,Valor,IdProgPago) VALUES(?,?,?,?,?,?)';
                $Data_ = [
                    $CData[$i]['Nombre'],
                    $CData[$i]['Proveedor'],
                    $CData[$i]['Cliente'],
                    'ADMINISTRATIVO',
                    $CData[$i]['Valor'],
                    $IdAprobacion
                ];
                DB::INSERT($Query_,$Data_);
                //array_push($id, $Hash);
            }
                        
            DB::commit();
            
            
            
            return response()->json([
                'Info'=>1,
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

    public function ListarProgmPagosAprob(Request $request){
        $draw = $request['draw'];
        
       
        $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
        
        $sqlFrom = "FROM "
                . "programacionpagos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa "
                . "INNER JOIN Banco b on p.IdBanco = b.Id "
                . "INNER JOIN Usuario u on u.IdUsuario = p.IdUsuario "
                . "INNER JOIN par_estados_pagos_bancos epr on p.Estado = epr.Id "
                . "INNER JOIN AprobacionesPagos ap on p.Id = ap.IdProgPago "
                . "INNER JOIN nivelaprobacionespago np on p.Id = np.IdProgAprobacion "
                . "INNER JOIN nivelpagos nn on np.Nivel = nn.Nivel "
                . "WHERE nn.IdUsuario = ".$sqlUser[0]->IdUsuario." AND ISNULL(np.Estado) ";

        $sqlCampos = "emp.NombreComercial as Empresa, np.Estado as EstadoAprob,ap.Observaciones, b.NombreComercial as Banco,u.NombreUsuario,p.Id, p.FechaPago, DATE_FORMAT(p.FechaCreacion,'%Y-%m-%d') as FechaCreacion, epr.Nombre as Estado "
                . " ";

        ## Search
        $searchQuery = " ";
        $sqlAdicional = "";
        $searchValue = $request['search']['TextBusqueHistorico'];
        if($searchValue != ''){
            
            $searchQuery = $sqlAdicional." AND ("
                   . "p.FechaPago like '%".$searchValue."%' or "
                   . "p.FechaCreacion like '%".$searchValue."%' or "
                   . "b.NombreComercial like '%".$searchValue."%' or "
                   . "epr.Nombre like '%".$searchValue."%'  "
                   . ") ";
        }
        $data = array();
        $empRecords =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);
        $i = 1;
        
        foreach($empRecords['empRecords'] as $row){
            $Valor = DB::SELECT("SELECT d.IdProgPago, SUM(Valor) as Valor "
                    . "FROM detalleprogpagos d  "
                    . "WHERE d.IdProgPago = ".$row->Id." "
                    . "group by d.IdProgPago");
            $Valor2 = DB::SELECT("SELECT d.IdProgPago, SUM(Valor) as Valor "
                    . "FROM detallepagos_manuales d  "
                    . "WHERE d.IdProgPago = ".$row->Id." "
                    . "group by d.IdProgPago");
            
            $Temp = explode("-",$row->FechaPago);
            $FechaProgPago = parent::NombreDia($row->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",$row->FechaCreacion);
            $FechaCreacion = parent::NombreDia($row->FechaCreacion).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Val = 0;
            if( count($Valor) != 0 ){
                $Val = $Valor[0]->Valor;
            }
            if( count($Valor2) != 0 ){
                $Val += $Valor2[0]->Valor;
            }
            
            $data[] = array(
                "Num"=>$i,
                "Hash"=>parent::CodeEncrypt($row->Id),
                "Id"=>$row->Id,
                "FechaPago"=>$FechaProgPago,
                "FechaCreacion"=>$FechaCreacion,
                "Banco"=>($row->Banco),
                "Estado"=>($row->Estado),
                "Empresa"=>($row->Empresa),
                "EstadoAprob"=>($row->EstadoAprob),
                "Observaciones"=>($row->Observaciones),
                "NombreUsuario"=>($row->NombreUsuario),
                "Valor"=>$Val
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
    
    public function EnviarAprobacionPago(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash'  => 'required|int',
            'ObservacionesPago'  => 'required|string',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            $Hash = parent::CodeDescrypt($Credentials['Hash']);
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");
            $TipoPago = DB::SELECT("SELECT Tipo,FechaPago from programacionpagos where Id = $Hash");

            $id = Array();
            
            
            //
            $Query = 'INSERT INTO AprobacionesPagos ('
                    . 'IdUsuario,'
                    . 'Fecha,'
                    . 'IdProgPago,'
                    . 'Estado, Observaciones'
                    . ') '
                    . 'values(?,?,?,?,?)';
            $Data = [
                $sqlUser[0]->IdUsuario,
                date("Y-m-d H:i:s"),
                $Hash,
                1,
                $Credentials['ObservacionesPago']
            ];
            DB::INSERT($Query,$Data);
            $IdAprobacion = DB::getPdo()->lastInsertId();
            array_push($id, $IdAprobacion );

            $Query = 'UPDATE programacionpagos SET Estado = ? Where Id = ?';
            $Data = [
                2,
                $Hash
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $Hash);
            
            $Nivel1 = DB::SELECT("SELECT n.IdUsuario, u.Correo,u.NombreUsuario "
                    . "FROM nivelpagos n "
                    . "INNER JOIN USUARIO u on n.IdUsuario = u.IdUsuario "
                    . "WHERE n.Nivel = 1 AND n.Tipo = '".$TipoPago[0]->Tipo."'");
            $Query = 'INSERT INTO nivelaprobacionespago ('
                    . 'IdAprobacion,'
                    . 'IdProgAprobacion,'
                    . 'Nivel,'
                    . 'Fecha'
                    . ') '
                    . 'values(?,?,?,?)';
            $Data = [
                $IdAprobacion,
                $Hash,
                1,
                date("Y-m-d H:i:s"),
                $Hash
            ];
            DB::INSERT($Query,$Data);
            
            array_push($id, DB::getPdo()->lastInsertId() );
            
            DB::commit();
            
            $Temp = explode("-",$TipoPago[0]->FechaPago);
            $FechaC = parent::NombreDia($TipoPago[0]->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $Info['Asunto'] = "Solicitud Revisión de Pagos, $FechaC";
            $Info['Descripcion'] = "Se solicita su aprobación para los Pagos ".$TipoPago[0]->Tipo." que se realizarán el día $FechaC ";
            $Info['RegistradoPor'] = "Process Plus";
            $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";
            
            $Info['Correos'] = $Nivel1[0]->Correo;
            $Info['UsuariosN'] = $Nivel1[0]->NombreUsuario;
            
            $Mensaje = 0;

            $htmlContent = view('mailing.pagos.MensajeGeneral', ['Descripcion'=>$Info['Descripcion'],'Asunto'=>$Info['Asunto']])->render();
            (new MailController)->___SendEmailMailJet($htmlContent,$Nivel1[0]->Correo,$Nivel1[0]->NombreUsuario,$Info['Asunto']);

            $Mensaje = 1;

            
            
            return response()->json([
                'Info'=>1,
                'Mensaje'=>$Mensaje,
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
    
    public function NextAprobacionPago(Request $request){
        $Credentials = $this->validate(request(),[
            'Hash'  => 'required|int',
            'ObservacionesPago'  => 'required|string',
            'Estado'  => 'required|int',
        ]);
        try {
            DB::enableQueryLog();
            DB::beginTransaction();
            
            
            $sqlUser = DB::SELECT("SELECT IdUsuario,NombreUsuario,Correo from Usuario where Token = '" . session('keyUser') . "'");

            $id = Array();
            
            $Hash = parent::CodeDescrypt($Credentials['Hash']);
            $Nivel1 = DB::SELECT("SELECT IdUsuario,Nivel FROM nivelpagos WHERE IdUsuario = ". $sqlUser[0]->IdUsuario );
            $Query = 'UPDATE nivelaprobacionespago SET Estado = ?, Observaciones = ? , Fecha = ? Where IdProgAprobacion = ?';
            $Data = [
                $Credentials['Estado'],
                $Credentials['ObservacionesPago'],
                date("Y-m-d H:i:s"),
                $Hash
            ];
            DB::UPDATE($Query,$Data);
            array_push($id, $Hash);
            
            $NivelActual = DB::SELECT("SELECT Nivel,IdAprobacion from nivelaprobacionespago WHERE IdProgAprobacion = $Hash ORDER BY Nivel DESC");
            $TipoPago = DB::SELECT("SELECT Tipo,FechaPago from programacionpagos where Id = $Hash");
            
            $Nivelx = DB::SELECT("SELECT n.IdUsuario, u.Correo,u.NombreUsuario "
                    . "FROM nivelpagos n "
                    . "INNER JOIN USUARIO u on n.IdUsuario = u.IdUsuario "
                    . "WHERE n.Nivel > ".$NivelActual[0]->Nivel." AND n.Tipo = '".$TipoPago[0]->Tipo."'"
                    );
            
            if( count($Nivelx) > 0 ){
                $Query = 'INSERT INTO nivelaprobacionespago ('
                    . 'IdAprobacion,'
                    . 'IdProgAprobacion,'
                    . 'Nivel,'
                    . 'Fecha'
                    . ') '
                    . 'values(?,?,?,?)';
                $Data = [
                    $NivelActual[0]->IdAprobacion,
                    $Hash,
                    $NivelActual[0]->Nivel+1,
                    date("Y-m-d H:i:s")
                ];
                DB::INSERT($Query,$Data);
                
                $Temp = explode("-",$TipoPago[0]->FechaPago);
                $FechaC = parent::NombreDia($TipoPago[0]->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                $Info['Asunto'] = "Solicitud Revisión de Pagos, $FechaC";
                $Info['Descripcion'] = "Se solicita su aprobación para los Pagos ".$TipoPago[0]->Tipo." que se realizarán el día $FechaC ";
                $Info['RegistradoPor'] = "Process Plus";
                $Info['RegistradoPorCorreo'] = "soporte@processpluserp.com";

                $Info['Correos'] = $Nivelx[0]->Correo;
                $Info['UsuariosN'] = $Nivelx[0]->NombreUsuario;

                $Mensaje = 0;
                

                $htmlContent = view('mailing.pagos.MensajeGeneral', ['Descripcion'=>$Info['Descripcion'],'Asunto'=>$Info['Asunto']])->render();
                (new MailController)->___SendEmailMailJet($htmlContent,$Nivelx[0]->Correo,$Nivelx[0]->NombreUsuario,$Info['Asunto']);

                $Mensaje = 1;
                array_push($id, DB::getPdo()->lastInsertId() );
            }else{
                $Query = 'UPDATE AprobacionesPagos SET Estado = ? Where Id = ?';
                $Data = [
                    2,
                    $Hash
                ];
                DB::UPDATE($Query,$Data);
                array_push($id, $Hash);
            }
            
            
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
    
    public function DetalleProgPagos(Request $request){
        $DetalleProg = DB::SELECT("SELECT "
                . "b.NombreComercial as Banco,"
                . "p.FechaPago, "
                . "u.NombreUsuario "
                . "FROM programacionpagos p "
                . "INNER JOIN Banco b ON p.IdBanco = b.Id "
                . "INNER JOIN Usuario u on p.IdUsuario = u.IdUsuario "
                . "WHERE p.Id = ".parent::CodeDescrypt($request->input("Hash")));
        foreach($DetalleProg as $d){
            $Temp = explode("-",$d->FechaPago);
            $d->FechaPago = parent::NombreDia($d->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        $PagosManuales = DB::SELECT(
                "SELECT "
                . "Nombre, Proveedor, Cliente, Presupuesto, Valor "
                . ""
                . "FROM detallepagos_manuales "
                . "WHERE IdProgPago = ".parent::CodeDescrypt($request->input("Hash")));
        $Ocs = DB::SELECT("SELECT "
                . "d.Valor, f.IdOc as OC, p.Id as Ppto, "
                . "pp.NombreComercial as Proveedor, c.NombreComercial as Cliente "
                . ""
                . ""
                . ""
                . "FROM detalleprogpagos d "
                . "INNER JOIN facturaroc f on d.IdFactura = f.Id "
                . "INNER JOIN ordencompra cc on f.IdOc = cc.Id "
                . "INNER JOIN Presupuesto p on cc.IdPpto = p.Id "
                . "INNER JOIN Proveedor pp ON cc.IdProveedor = pp.IdProveedor "
                . "INNER JOIN Cliente c ON p.IdCliente = c.IdCliente "
                . "WHERE d.IdProgPago = ".parent::CodeDescrypt($request->input("Hash"))
                . "");
        return response()->json([
            'DetalleProg'=>$DetalleProg,
            'PagosManuales'=>$PagosManuales,
            'Ocs'=>$Ocs,
        ]);
    }
}
