<?php

namespace App\Http\Controllers\Process\Informes;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\MailController;

class InformesController extends Controller
{
    //d6e0840c386bc44bcb119cd77dd31ff4
    public function Informes_Index_Datos()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("process.informes.datos");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    public function Informes_Index_TraficoAdministrativo()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("process.informes.trafico_administrativo");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    public function Informes_Index_HorasHombre()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("process.informes.horashombre");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //
    public function Informes_DataEmpresas(Request $request){
        
        $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        
        $Empresas = DB::SELECT("SELECT "
                . "e.IdEmpresa, e.NombreComercial, e.NombreLegal,e.Nit,"
                . "e.Logo,e.FechaConstitucion, e.CorreoContacto "
                . "FROM Empresa e "
                . "WHERE "
                . "e.Estado = 1 "
                . "ORDER BY e.NombreComercial ASC");
        foreach( $Empresas as $e ){
            $RepLegal = DB::SELECT("SELECT "
                    . "rl.Nombre, rl.Celular, rl.NroDocumento,"
                    . "rl.Correo, rl.Foto "
                    . "FROM Informacion_RLegal rl "
                    . "INNER JOIN Par_Persona_Tipo_Documento tc on tc.IdTipoDocumento = rl.IdTipoDocumento "
                    . "WHERE rl.IdEmpresa = ".$e->IdEmpresa);
            $e->RepLegal = $RepLegal;
            
            //RedesSociales.
            $Redes = DB::SELECT("SELECT "
                    . "s.Link,p.Nombre as Red "
                    . "FROM Social s "
                    . "INNER JOIN Par_Redes_Sociales p on s.IdRS = p.IdRS "
                    . "WHERE s.IdEmpresa = ".$e->IdEmpresa);
            $e->Redes = $Redes;
            
            //Documentos Legales.
            $DocsCargados = 0;
            $Docs = DB::SELECT("SELECT "
                    . "Id, Nombre "
                    . "FROM Par_Tipo_Documento_Legal_Empresa "
                    . "WHERE Estado = 1 "
                    . "ORDER BY Nombre");
            foreach( $Docs as $d ){
                $Dat = DB::SELECT("SELECT "
                        . "Id,FechaVencimiento,NombreArchivo "
                        . "FROM Documento_Legal_Empresa "
                        . "WHERE Estado = 1 "
                        . "AND IdTipoDocLegal = ".$d->Id." "
                        . "AND IdEmpresa = ".$e->IdEmpresa);
                $DocsCargados += count($Dat);
                $d->Documento = $Dat;
            }
            $e->DocsCargados = $DocsCargados;
            $e->Docs = $Docs;
            //Tarifas e Impuestos
            //NotasLegales
            $NotasCargadas = 0;
            $Notas = DB::SELECT("SELECT "
                    . "IdTipoNota, Nombre "
                    . "FROM Par_Tipo_Nota_Legal "
                    . "Order by Nombre");
            foreach( $Notas as $d ){
                $Dat = DB::SELECT("SELECT "
                        . "IdNota,Texto "
                        . "FROM Nota "
                        . "WHERE IdTipoNota = ".$d->IdTipoNota." "
                        . "AND IdEmpresa = ".$e->IdEmpresa);
                $NotasCargadas += count($Dat);
                $d->Nota = $Dat;
            }
            $e->Notas = $Notas;
            $e->NotasCargadas = $NotasCargadas;
            
            //Unidades
            $Unidad = DB::SELECT("SELECT "
                    . "u.IdUnidad, u.Nombre "
                    . "FROM Unidad_Negocio u "
                    . "WHERE u.Estado = 1 AND u.IdEmpresa = ".$e->IdEmpresa);
            $e->Unidad = $Unidad;

        }
        $data = [
            'Empresas' => $Empresas,
            
            'success' => true
        ];

        return response()->json($data, 200);
    }
    
    //
    public function Informes_DataClientes(Request $request){
        
        $credentials = $this->validate($request, [
            'search.HashEmpresa' => 'nullable|int',
        ]);
        
        
        $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        
        $Empresa = $credentials['search']['HashEmpresa'];;
        $Empresa = parent::CodeDescrypt($Empresa);
        
        $sqlFrom = " FROM Cliente c "
                . "INNER JOIN asoc_empresa_cliente aec on aec.IdCliente = c.IdCliente AND aec.IdEmpresa = $Empresa "
                . "WHERE c.Estado = 1 ";

        $sqlCampos = " DISTINCT c.IdCliente, c.NombreComercial, c.NombreLegal, c.Nit,c.FechaCierreFacturacion, "
                . "case when isnull(c.CorreoFacturacionElectronica) then '' else c.CorreoFacturacionElectronica end as CorreoFacturacionElectronica, c.Telefono ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " and (c.NombreComercial like '%".$searchValue."%' or c.NombreLegal like '%".$searchValue."%' or c.Nit like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            //Documentos Generales
            $Docs = DB::SELECT("SELECT "
                    . "Id,Nombre "
                    . "FROM par_documento_legal_cliente "
                    . "WHERE Estado = 1 "
                    . "ORDER BY Nombre");
            $DocsCargados = 0;
            foreach( $Docs as $d ){
                $Clie = DB::SELECT("SELECT "
                        . "Id,Archivo "
                        . "FROM documento_legal_cliente "
                        . "WHERE Estado = 1 AND IdCliente = ".$row->IdCliente." AND IdTipoDocumento = ".$d->Id);
                $DocsCargados += count($Clie);
                $d->Doc = $Clie;
            }
            $row->Docs = $Docs;
            $row->DocsCargados = $DocsCargados;
            
            //Contratos
            $Contratos = DB::SELECT("SELECT "
                    . "Id,Nombre,Archivo "
                    . "FROM contrato_cliente "
                    . "WHERE IdCliente = ".$row->IdCliente);
            $row->Contratos = $Contratos;
            
            //Contactos
            $Contactos = DB::SELECT("SELECT "
                    . "Id,Nombre,Cargo, Celular, Correo, Telefono "
                    . "FROM contactos_cliente "
                    . "Where Estado = 1 AND IdCliente = ".$row->IdCliente." "
                    . "ORDER BY Nombre ASC ");
            $row->Contactos = $Contactos;
            
            //Profesionales
            $Profesionales = DB::SELECT("SELECT "
                    . "Nombre, Correo, Telefono "
                    . "FROM profesionales_cliente "
                    . "Where Estado = 1 AND IdCliente = ".$row->IdCliente." "
                    . "ORDER BY Nombre ASC ");
            $row->Profesionales = $Profesionales;
            
            //Productos
            $Productos = DB::SELECT("SELECT "
                    . "Nombre "
                    . "FROM productocliente "
                    . "Where Estado = 1 AND IdCliente = ".$row->IdCliente." "
                    . "ORDER BY Nombre ASC ");
            $row->Productos = $Productos;
            
            //Negociaciones
            $Negociaciones = DB::SELECT("SELECT "
                    . "Porcentaje "
                    . "FROM negociaciones "
                    . "Where Estado = 1 AND IdCliente = ".$row->IdCliente." "
                    . "");
            $row->Negociaciones = $Negociaciones;
            
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->IdCliente),
            "NombreComercial"=>$row->NombreComercial,
            "NombreLegal"=>$row->NombreLegal,
            "Nit"=>$row->Nit,
            "FechaCierreFacturacion"=>$row->FechaCierreFacturacion,
            "CorreoFacturacionElectronica"=>$row->CorreoFacturacionElectronica,
            "Telefono"=>$row->Telefono,
            "Docs"=>$row->Docs,
            "DocsCargados"=>$row->DocsCargados,
            "Contratos"=>$row->Contratos,
            "Contactos"=>$row->Contactos,
            "Profesionales"=>$row->Profesionales,
            "Productos"=>$row->Productos,
            "Negociaciones"=>$row->Negociaciones,
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
    
    public function Informes_DataProveedores(Request $request){
        
        $credentials = $this->validate($request, [
            'search.HashEmpresa' => 'nullable|int',
        ]);
        
        
        $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        
        $Empresa = $credentials['search']['HashEmpresa'];;
        $Empresa = parent::CodeDescrypt($Empresa);
        
        $sqlFrom = " FROM Proveedor p "
                . "INNER JOIN asoc_empresa_proveedor aep on aep.IdProveedor = p.IdProveedor AND aep.IdEmpresa = $Empresa "
                . "WHERE p.Estado = 1 ";

        $sqlCampos = " p.IdProveedor, p.Nit, p.NombreComercial, p.NombreLegal, p.Telefono "
                . " ";

        $searchQuery = " ";
        $searchValue = $request['search']['value'];
        if($searchValue != ''){
            $searchQuery = " and (p.NombreComercial like '%".$searchValue."%' or p.NombreLegal like '%".$searchValue."%' or p.Nit like '%".$searchValue."%') ";
        }

        $Records =(new Controller)->Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue);

        $data = array();
        $i = 1;
        foreach($Records['empRecords'] as $row){
            //Documentos Generales
            $Docs = DB::SELECT("SELECT "
                    . "Id,Nombre "
                    . "FROM par_documento_legal_proveedor "
                    . "WHERE Estado = 1 "
                    . "ORDER BY Nombre");
            $DocsCargados = 0;
            foreach( $Docs as $d ){
                $Prov = DB::SELECT("SELECT "
                        . "Id,Archivo "
                        . "FROM documento_legal_proveedor "
                        . "WHERE Estado = 1 AND IdProveedor = ".$row->IdProveedor." AND IdDocumentoLegal = ".$d->Id);
                $DocsCargados += count($Prov);
                $d->Doc = $Prov;
            }
            $row->Docs = $Docs;
            $row->DocsCargados = $DocsCargados;
           
            //Contactos
            $Contactos = DB::SELECT("SELECT "
                    . "Id,Nombre,Cargo, Celular, Correo, Telefono "
                    . "FROM contactos_proveedor "
                    . "Where Estado = 1 AND IdProveedor = ".$row->IdProveedor." "
                    . "ORDER BY Nombre ASC ");
            $row->Contactos = $Contactos;
            
            
            
            $data[] = array(
            "Num"=>$i,
            "Hash" => (new Controller)->CodeEncrypt($row->IdProveedor),
            "NombreComercial"=>$row->NombreComercial,
            "NombreLegal"=>$row->NombreLegal,
            "Nit"=>$row->Nit,
            "Telefono"=>$row->Telefono,
            "Docs"=>$row->Docs,
            "DocsCargados"=>$row->DocsCargados,
            "Contactos"=>$row->Contactos,
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
    
    public function Informes_TraficoAdministrativoUsers(){
        $usuario = DB::SELECT("SELECT IdUsuario,Token FROM Usuario WHERE Token = '" . session('keyUser') . "'");
        
        $Data = DB::SELECT("SELECT "
                . "u.NombreUsuario, u.IdUsuario as Hash, u.ImgUsuario "
                . "FROM Usuario u "
                . "INNER JOIN trafic_administrativo_consulta t on u.IdUsuario = t.IdUsuario and u.Estado = 1 "
                . "WHERE t.IdVeedor = ".$usuario[0]->IdUsuario." "
                . "ORDER BY u.NombreUsuario");
        foreach($Data as $d){
            $d->Hash = parent::CodeEncrypt($d->Hash);
        }
        $data = [
            'success' => true,
            'Usuarios' => $Data
        ];

        return response()->json($data, 200);
        
    }
    
    public function Informes_TraficoAdministrativoUserData(Request $request){
        $User = parent::CodeDescrypt($request->input('Hash'));
        
        $Data = DB::SELECT("SELECT "
                . "c.Id_CP as IdCanal, c.Nombre as Canal "
                . ""
                . "FROM canales_principales c "
                . "WHERE c.Estado = 1 AND c.IdUsuario = $User "
                . "ORDER BY Nombre asc");
        foreach( $Data as $d ){
            $d->Hash = parent::CodeEncrypt($d->IdCanal);
        }
        $data = [
            'success' => true,
            'Trafico' => $Data
        ];

        return response()->json($data, 200);
    }
    
    public function FullData(){
        $PendientesAdministrativos = DB::SELECT("SELECT 
        dp.FechaPago, dp.Mes, dp.Id,
        it.Nombre as NombreItem, it.Entidad, p.Nombre as Periodicidad,
        emp.NombreComercial as Empresa, und.Nombre as Unidad
        FROM detalle_ppto_agencia dp
        INNER JOIN Empresa emp on dp.IdEmpresa = emp.IdEmpresa
        INNER JOIN unidad_negocio und on dp.IdUnidad = und.IdUnidad 
        INNER JOIN item_ppto_agencia it on dp.IdItem = it.Id
        INNER JOIN par_periodicidad_ppto_agencia p on it.IdPeriodicidad = p.Id
        WHERE emp.Estado = 1 AND dp.FechaPago IS NOT NULL AND dp.ValorPagado = 0 and  TIMESTAMPDIFF(DAY,date_format(sysdate(),'%Y-%m-%d'),dp.FechaPago ) < 5 "
        );
    
        foreach($PendientesAdministrativos as $f){
            $Temp = explode("-",$f->FechaPago);
            $f->FechaLarga = parent::NombreDia($f->FechaPago).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }

        $DocLegales = DB::SELECT("SELECT dl.Id,
            pt.Nombre as TipoDocumento, emp.NombreComercial as Empresa, dl.FechaVencimiento
            FROM Documento_Legal_Empresa dl 
            INNER JOIN Par_Tipo_Documento_Legal_Empresa pt on dl.IdTipoDocLegal = pt.Id AND pt.Estado = 1 
            INNER JOIN Empresa emp on dl.IdEmpresa = emp.IdEmpresa 
            WHERE emp.Estado = 1 AND TIMESTAMPDIFF(DAY,date_format(sysdate(),'%Y-%m-%d'),dl.FechaVencimiento ) < 7 ");
        $i = 0;
        foreach($DocLegales as $f){
            $Temp = explode("-",$f->FechaVencimiento);
            $f->FechaLarga = parent::NombreDia($f->FechaVencimiento).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }

        $FacturasPtesXLlegar = DB::SELECT( "SELECT count(DISTINCT op.Id) AS Num FROM "
        . "ordencompra op "
        . "INNER JOIN Usuario u on u.IdUsuario = op.IdUsuario "
        . "INNER JOIN Proveedor p on p.IdProveedor = op.IdProveedor "
        . "INNER JOIN par_formapago pf on op.IdFormaPago = pf.Id "
        . "INNER JOIN Presupuesto pp on op.IdPpto = pp.Id "
        . "INNER JOIN Cliente c on c.IdCliente = pp.IdCliente   "
        . "INNER JOIN unidad_negocio un on pp.IdUnidad = un.IdUnidad AND u.Estado = 1 "
        . "INNER JOIN proyectos pt on pt.Id = pp.IdProyecto AND pt.IdEstado != 2 "
        . "INNER JOIN Usuario ue on pt.IdEjecutivo = ue.IdUsuario 
        INNER JOIN Empresa emp ON pt.IdEmpresa = emp.IdEmpresa  AND emp.Estado = 1 "
        . "WHERE 1 = 1 "
        . "AND op.Estado = 1 and isnull(op.usuariocancelacion) ");

        $data = [
            'success' => true,
            'PendientesAdministrativos' => $PendientesAdministrativos,
            'FacturasPtesXLlegar' => $FacturasPtesXLlegar,
            'DocLegales' => $DocLegales,
        ];

        return response()->json($data, 200);
    }

    //d6e0840c386bc44bcb119cd77dd31ff4
    public function Informes_Index_TraficoClientes()
    {
        if (session('Time') > date("Y-m-d H:i:s")) {
            return view("process.informes.trafico_cliente");
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
    //1a1007a957343c23e0bf7f697221ea472
    public function Informes_Trafico_Cliente_OtsGeneral2(Request $request){
        try {
            $IdEmpresa = 2;
            $IdCliente = 256;
            $Solicitudes = DB::SELECT("SELECT "
                . " c.IdTipoSolicitud, CASE WHEN c.IdTipoSolicitud = '1' then 'Nuevo' else 'Ajuste' END As TipoSolicitud, SUM(p.Cantidad) as Piezas, count(DISTINCT c.Id) AS Cantidad "
                . "FROM cliente_Requerimientos c "
                . "INNER JOIN cliente_requerimiento_piezas p on c.Id = p.IdRequerimiento "
                . "WHERE Estado IN (1,5) "
                . "GROUP BY c.IdTipoSolicitud "
                );
            
            $Activas = DB::SELECT("SELECT p.IdCliente,SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (1,4) "
                    . "GROUP BY p.IdCliente "
                    );
            if( empty($Activas) ){
                $Activas = 0;
            }else{
                $Activas = $Activas[0]->Cantidad;
            }
            
            $Cerradas = DB::SELECT("SELECT p.IdCliente,SUM(1) AS Cantidad "
                    . "FROM Proyectos p "
                    . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                    . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                    . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                    . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                    . "LEFT JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional "
                    . "WHERE p.IdEstado in (2,3) "
                    . "GROUP BY p.IdCliente "
                    );
            if( empty($Cerradas) ){
                $Cerradas = 0;
            }else{
                $Cerradas = $Cerradas[0]->Cantidad;
            }
            
            
            $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
                ->where('Estado', 1)
                ->orderByDesc('Id')
                ->get();
            
            $SemanasDias = DB::SELECT("SELECT DISTINCT Semana,DATE_FORMAT(WeekStart,'%Y-%m-%d') as WeekStart,DATE_FORMAT(WeekEnd,'%Y-%m-%d') as WeekEnd FROM ("
                    . "SELECT WEEK(t.FechaEntrega) as Semana, adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY) WeekStart, "
                    . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) WeekEnd "
                    . "from cliente_requerimientos t "
                    . "WHERE t.Estado in (2) and not isnull(t.fechaentrega) "
                    . ") as Semanas "
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
                    $EntregablesDia = DB::SELECT("SELECT t.Id,u.NombreUsuario,TIMESTAMPDIFF(DAY, DATE_FORMAT(t.Fecha,'%Y-%m-%d'), t.FechaSalida) as Diferencia_Sol_Necesidad,"
                            . "sum(cp.Cantidad) as Piezas "
                    . "from cliente_requerimientos t "
                            . "INNER JOIN Cliente_Requerimiento_Piezas cp on t.Id = cp.IdRequerimiento "
                            . "INNER JOIN Usuario u on t.idsolicitante = u.IdUsuario "
                    . "WHERE t.Estado in (2) AND t.FechaEntrega = '".$DiasSemana[$Sem]['Dia']."' "
                            . "Group by t.Id,u.NombreUsuario,TIMESTAMPDIFF(DAY, DATE_FORMAT(t.Fecha,'%Y-%m-%d'), t.FechaSalida) "
                    . "");
                    
                    $Temp = explode("-",$DiasSemana[$Sem]['Dia']);
                    $DiasSemana[$Sem]['Dia'] = parent::NombreDia($DiasSemana[$Sem]['Dia']).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    $DiasSemana[$Sem]['Entregables'] = $EntregablesDia;
                }

                $Semanas->Detalle =  $DiasSemana;
            }
            
            $Productos = DB::SELECT("SELECT DISTINCT "
                    . "pc.Nombre, pc.Id "
                    . "FROM Usuario u "
                    . "INNER JOIN par_usuariocliente pcp on pcp.IdUsuario = u.IdUsuario AND pcp.IdCliente = $IdCliente "
                    . "INNER JOIN Productocliente pc on pcp.IdProducto = pc.Id AND pc.Estado = 1 "
                    . "WHERE u.idtipousuario = 3 ");
            foreach( $Productos as $p ){
                
                //Ots por Producto
                $OtsActivas = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.Idproducto = ".$p->Id." "
                        . "WHERE p.IdEstado = 1 ");
                if( count($OtsActivas) == 0 ){
                    $OtsActivas = 0;
                }else{
                    $OtsActivas = count($OtsActivas);
                }
                $p->OtsActivas = $OtsActivas;
                
                $Pte = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.Idproducto = ".$p->Id." "
                        . "WHERE p.IdEstado = 4 ");
                if( count($Pte) == 0 ){
                    $Pte = 0;
                }else{
                    $Pte = count($Pte);
                }
                $p->Pte = $Pte;
                
                
                $UsuariosProducto = DB::SELECT("SELECT DISTINCT "
                    . "u.IdUsuario,u.NombreUsuario, u.FechaCap, u.Capacitacion, u.Correo, pf.IdProfesionalesCliente as Hash "
                    . "FROM Usuario u "
                    . "INNER JOIN par_usuariocliente pcp on pcp.IdUsuario = u.IdUsuario AND pcp.IdCliente = $IdCliente "
                    . "INNER JOIN Productocliente pc on pcp.IdProducto = pc.Id AND pc.Estado = 1 "
                        . "INNER JOIN profesionales_cliente pf on u.IdPersona = pf.IdProfesionalesCliente "
                    . "WHERE u.idtipousuario = 3 and pc.Id = ".$p->Id);
                foreach($UsuariosProducto as $u){
                    if( ($u->FechaCap) == NULL ){
                        $u->FechaCap = "";
                    }else{
                        $Temp = explode("-",$u->FechaCap);
                        $u->FechaCap = parent::NombreDia($u->FechaCap).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                    }
                    
                    if( $u->Capacitacion == 0 ){
                        $u->Capacitacion = "No";
                    }else{
                        $u->Capacitacion = "Si";
                    }
                    $OtsActivas = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdProfesional = ".$u->Hash." "
                        . "WHERE p.IdEstado = 1 ");
                    if( count($OtsActivas) == 0 ){
                        $OtsActivas = 0;
                    }else{
                        $OtsActivas = count($OtsActivas);
                    }
                    $u->OtsActivas = $OtsActivas;
                    
                    $OtsPte = DB::SELECT("SELECT p.Id "
                        . "FROM Proyectos p "
                        . "INNER JOIN productocliente pp on p.Idproducto = pp.Id  "
                        . "INNER JOIN Cliente c on c.IdCliente = p.IdCliente AND p.IdCliente = $IdCliente "
                        . "INNER JOIN Empresa e on e.IdEmpresa = p.IdEmpresa AND p.IdEmpresa = $IdEmpresa "
                        . "INNER JOIN Usuario u on p.IdEjecutivo = u.IdUsuario "
                        . "INNER JOIN profesionales_cliente pc on pc.IdProfesionalesCliente = p.IdProfesional AND p.IdProfesional = ".$u->Hash." "
                        . "WHERE p.IdEstado = 4 ");
                    if( count($OtsPte) == 0 ){
                        $OtsPte = 0;
                    }else{
                        $OtsPte = count($OtsPte);
                    }
                    $u->OtsPte = $OtsPte;
                    
                    //Requerimientos Ptes Gestiión
                    $reqPte = DB::SELECT("SELECT Id, Asunto,DATE_FORMAT(Fecha,'%Y-%m-%d') as FechaC,FechaSalida,FechaEntrega, DATE_FORMAT(Fecha,'%T') as HoraC,"
                            . "TIMESTAMPDIFF(DAY, DATE_FORMAT(Fecha,'%Y-%m-%d'), FechaSalida) as Diferencia_Sol_Necesidad,"
                            . "TIMESTAMPDIFF(DAY, DATE_FORMAT(Fecha,'%Y-%m-%d'), FechaEntrega) as Diferencia_Sol_Entrega, "
                            . "CASE "
                                . "WHEN Estado = 1 THEN 'En Revisión Agencia' "
                                . "WHEN Estado = 2 THEN 'Asignada en Proceso' "
                                . "WHEN Estado = 3 THEN 'Devuelvo a Cliente' "
                                . "WHEN Estado = 4 THEN 'En Aprobación Cliente' "
                                . "WHEN Estado = 5 THEN 'En Ajuste' "
                                . "WHEN Estado = 6 THEN 'Aprobado con Piezas Adicionales' "
                                . "WHEN Estado = 9 THEN 'Suspendido Temporalmente' "
                                . "WHEN Estado = 10 THEN 'Pendiente de Trámite' "
                                . "WHEN Estado = 8 THEN 'Cancelada' "
                                . "WHEN Estado = 7 THEN 'Cerrada / Finalizada' " 
                            . "END as NEstado "
                            . "FROM Cliente_requerimientos "
                            . "WHERE IdSolicitante = ".$u->IdUsuario." "
                            . "ORDER BY Id DESC");
                    foreach($reqPte as $ux){
                        $ux->Piezas = DB::SELECT("SELECT SUM(Cantidad) as Cantidad from Cliente_Requerimiento_Piezas where idrequerimiento = ".$ux->Id." group by idrequerimiento");
                        if( ($ux->FechaC) == NULL ){
                            $ux->FechaC = "";
                        }else{
                            $Temp = explode("-",$ux->FechaC);
                            $ux->FechaC = parent::NombreDia($ux->FechaC).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        }
                        
                        if( ($ux->FechaSalida) == NULL ){
                            $ux->FechaSalida = "";
                        }else{
                            $Temp = explode("-",$ux->FechaSalida);
                            $ux->FechaSalida = parent::NombreDia($ux->FechaSalida).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        }
                        if( ($ux->FechaEntrega) == NULL ){
                            $ux->FechaEntrega = "";
                        }else{
                            $Temp = explode("-",$ux->FechaEntrega);
                            $ux->FechaEntrega = parent::NombreDia($ux->FechaEntrega).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
                        }
                        if( ($ux->Diferencia_Sol_Entrega) == NULL ){
                            $ux->Diferencia_Sol_Entrega = "";
                        }
                    }
                    $u->Req = $reqPte;
                }
                $p->Usuarios = $UsuariosProducto;
                
            }
            $data = [
                'success' => true,
                'OTs_Activas'=>$Activas,
                'Solicitudes'=>$Solicitudes,
                'OTs_Cerradas'=>$Cerradas,
                'Productos'=>$Productos,
                'Colors'=>$Colors,
                'DataSemanas'=>$SemanasDias,
            ];

            return response()->json($data, 200);
        }catch (ValidationException $ex) {
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
    
    //c50cb56aed832b28522210592567bdd3x
    public function Cliente_HistoricoRequerimiento(Request $request){
        $sql = DB::SELECT("SELECT "
                . "s.Status, s.Id as Hash, "
                . "u.NombreUsuario as Creador, "
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as FechaC,"
                . "DATE_FORMAT(s.Fecha, '%Y-%m-%d') as Rut,"
                . "DATE_FORMAT(s.Fecha, '%T') as HoraC "
                . "FROM Cliente_Requerimiento_Status s "
                . "INNER JOIN Usuario u on s.IdUsuario = u.IdUsuario "
                . "WHERE s.IdRequerimiento = ".($request->input("Hash"))." "
                . "ORDER BY s.Fecha DESC");
        foreach( $sql as $d ){
            $d->Status = nl2br($d->Status);
            
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
                    . "AND t.IdRequerimiento = ".($request->input("Hash"))." AND "
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
            'success' => true
        ]);
    }
    
    //1a1007a957343c23e0bf7f697221ea47
    public function Informes_Trafico_Cliente_OtsGeneral(Request $request){
        $Data = DB::SELECT("SELECT "
                . "pest.Estado, pest.Id as HashEstado, SUM(1) as Cantidad "
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa AND emp.Estado = 1 "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND cl.Estado = 1 "
                . "INNER JOIN par_estado_proyecto pest on p.IdEstado = pest.Id "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . " "
                . "GROUP BY pest.Estado, pest.Id "
                . "Order by pest.Estado ASC");
        $Colors = DB::table('colorgrafic')->select('NumColor','rgb')
                ->where('Estado', 1)
                //->orderByDesc('Id')
                ->get();
        $TotalOts = 0;
        foreach( $Data as $d ){
            $TotalOts += $d->Cantidad;
        }
        $data = [
            'success' => true,
            'Colors'=>$Colors,
            'TotalOts'=>$TotalOts,
            'DataSemanas'=>$this->Informes_Trafico_GestionSemanal($request),
            'Semana'=>date("W"),
            'TraficoEstados' => $Data
        ];

        return response()->json($data, 200);
    }
    
    //
    public function Informes_Trafico_GestionSemanal(Request $request){
        $IdCliente = 256;
        $NumSemana = date("W");
        $Mes = date("m");
        $Year = date("Y");
        
        $InformacionSemanas = [];
        $InformacionSemanas[0]['Semana'] = $NumSemana;
        $InformacionSemanas[1]['Semana'] = $NumSemana+1;
        for($p = 0; $p < count($InformacionSemanas); $p++){
            //$week_start = date('m-d-Y', strtotime('-'.$day.' days'));
            //$week_end = date('m-d-Y', strtotime('+'.(6-$day).' days'));
        }
        
        $Solicitudes = DB::SELECT("SELECT "
                . " c.IdTipoSolicitud, CASE WHEN c.IdTipoSolicitud = '1' then 'Nuevo' else 'Ajuste' END As TipoSolicitud, SUM(p.Cantidad) as Piezas, count(DISTINCT c.Id) AS Cantidad "
                . "FROM cliente_Requerimientos c "
                . "INNER JOIN cliente_requerimiento_piezas p on c.Id = p.IdRequerimiento "
                . "WHERE Estado IN (1,5) "
                . "GROUP BY c.IdTipoSolicitud "
                );
        
        $Data_Ots_Activas = DB::SELECT("SELECT "
            . " Year(Fecha) AS Anio, Month(Fecha) as Mes, SUM(1) as Numero "
            . " from proyectos "
            . " where idcliente = $IdCliente and idestado = 1 "
            //. " AND YEAR(Fecha) = $Year "
            . " "
            . "group by Year(Fecha) , Month(Fecha);");
        foreach($Data_Ots_Activas as $d){
            $d->NomMes = parent::Meses($d->Mes);
        }
        
        $TotalOts = 0;
        $Data_Ots_Semana = DB::SELECT("SELECT "
            . " WEEK(Fecha) AS Fecha, SUM(1) as Numero "
            . " from proyectos "
            . " where idcliente = $IdCliente  and  month(fecha) = $Mes  "
            . " AND YEAR(Fecha) = $Year "
            . " "
            . "group by WEEK(Fecha);");
        foreach($Data_Ots_Semana as $d){
            $TotalOts += $d->Numero;
            //$Temp = explode("-",$d->Fecha);
            //$d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        
        $TotalNuevasCreativos = [
            'Tareas' => 0,
            'Piezas' => 0
        ];
        
        $Ots_Creativos_Nuevas = [];
        $Tareas_Nuevas = DB::SELECT("SELECT "
            . "WEEK(t.FechaEntrega) as Semana, date_format(t.FechaEntrega,'%Y-%m-%d') as Fecha, p.Codigo,t.Numeracion,tp.Nombre as TipoProceso, "
            . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
            . " from tareas t "
            . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
            . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
            . " where "
            . ""
            . "t.IdEstado = 1 AND "
            . "t.iddepartamento in (4,56)  "
            //. "AND YEAR(FechaHoraCreacion) = $Year "
            . "group by WEEK(t.FechaEntrega),date_format(t.FechaEntrega,'%Y-%m-%d'), p.Codigo,t.Numeracion,tp.Nombre "
            . "ORDER BY WEEK(t.FechaEntrega) ASC ");
        $t = 0;
        foreach($Tareas_Nuevas as $d){
            $TotalNuevasCreativos['Tareas'] += $d->Cantidad;
            $Ots_Creativos_Nuevas[$t] = $d->Codigo;
            $TotalNuevasCreativos['Piezas'] += $d->Piezas;
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $t++;
        }
        $Ots_Creativos_Nuevas = array_unique($Ots_Creativos_Nuevas);
        
        
        $TotalAjustesCreativos = [
            'Tareas' => 0,
            'Piezas' => 0
        ];
        $Ots_Creativos_Ajuste = [];
        $Tareas_Ajustes = DB::SELECT("SELECT tp.Nombre as TipoProceso, count(p.Codigo) as Ots, "
            . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
            . " from subtareas t "
            . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
            . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
            . " where "
            . ""
            . "t.IdEstado = 1 AND "
            . "t.iddepartamento in (4,56)  "
            //. "AND YEAR(FechaHoraCreacion) = $Year "
            . "group by tp.Nombre "
                . "ORDER BY  tp.Nombre");
        $t = 0;
        foreach($Tareas_Ajustes as $d){
            $TotalAjustesCreativos['Tareas'] += $d->Cantidad;
            $TotalAjustesCreativos['Piezas'] += $d->Piezas;
            //$Ots_Creativos_Ajuste[$t] = $d->Codigo;
            //$Temp = explode("-",$d->Fecha);
            //$d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $t++;
        }
        $Ots_Creativos_Ajuste = count(array_unique($Ots_Creativos_Ajuste));
        
        $Tareas_Nuevas_Ejecutivos = DB::SELECT("SELECT date_format(t.FechaEntrega,'%Y-%m-%d') as Fecha,  p.Codigo,t.Numeracion,tp.Nombre as TipoProceso, "
            . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
            . " from tareas t "
            . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
            . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
            . " where "
            . ""
            . "t.IdEstado = 1 AND "
            . "t.iddepartamento in (1)  "
            //. "AND YEAR(FechaHoraCreacion) = $Year "
            . "group by date_format(t.FechaEntrega,'%Y-%m-%d'), p.Codigo,t.Numeracion,tp.Nombre;");
        foreach($Tareas_Nuevas_Ejecutivos as $d){
            //$TotalEjecutivos['Tareas'] += $d->Cantidad;
            //$TotalEjecutivos['Piezas'] += $d->Piezas;
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        
        $TotalEjecutivos = [
            'Tareas' => 0,
            'Piezas' => 0
        ];
        $Ots_PendientesACliente = [];
        $Tareas_Ajustes_Ejecutivos = DB::SELECT("SELECT date_format(t.FechaEntrega,'%Y-%m-%d') as Fecha,  p.Codigo,t.Numeracion,tp.Nombre as TipoProceso, "
            . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
            . " from subtareas t "
            . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
            . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
            . " where "
            . ""
            . "t.IdEstado = 1 AND "
            . "t.iddepartamento in (1)  "
            //. "AND YEAR(FechaHoraCreacion) = $Year "
            . "group by date_format(t.FechaEntrega,'%Y-%m-%d'), p.Codigo,t.Numeracion,tp.Nombre;");
        $t = 0;
        foreach($Tareas_Ajustes_Ejecutivos as $d){
            $Ots_PendientesACliente[$t] = $d->Codigo;
            $TotalEjecutivos['Tareas'] += $d->Cantidad;
            $TotalEjecutivos['Piezas'] += $d->Piezas;
            $Temp = explode("-",$d->Fecha);
            $d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $t++;
        }
        $Ots_PendientesACliente = count( array_unique($Ots_PendientesACliente) );
        $TotalCliente = [
            'Tareas' => 0,
            'Piezas' => 0
        ];
        /*
        $EnviadoCliente = DB::SELECT("SELECT p.Codigo, "
            . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
            . " from subtareas t "
            //. " INNER JOIN proyecto_movimiento pm on t.IdProyecto = pm.IdProyecto "
            . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente and p.idestado = 4 "
            . " where "
            . " t.iddepartamento = 1 "
            . " group by p.Codigo;");
        */
        $EnviadoCliente = DB::SELECT("SELECT "
                . "p.Id AS Hash, p.Codigo, p.Referencia as Referencia_Proyecto, "
                . "DATE_FORMAT(p.Fecha, '%Y-%m-%d') as Fecha, "
                . "emp.NombreComercial as Empresa, cl.NombreComercial as Cliente,"
                . "pc.Nombre as Producto, p.IdEstado, est.Estado as Estado_OT, "
                . "Case WHEN isnull(pfc.Nombre) then 'Sin Asignar' else pfc.Nombre END as Profesional,p.IdProfesional "
                . ""
                . "FROM Proyectos p "
                . "INNER JOIN Empresa emp on p.IdEmpresa = emp.IdEmpresa  "
                . "INNER JOIN Cliente cl on p.IdCliente = cl.IdCliente AND p.IdCliente = $IdCliente "
                . "INNER JOIN productocliente pc on p.IdProducto = pc.Id  "
                . "INNER JOIN Par_Estado_Proyecto est on p.IdEstado = est.Id "
                . "LEFT JOIN profesionales_cliente pfc on pfc.IdProfesionalesCliente = p.IdProfesional "
                . "WHERE 1 = 1 AND p.IdEstado = 4 "
                . "ORDER BY p.Fecha DESC"
                );
        $Ots_Cliente = [];
        $t = 0;
        foreach($EnviadoCliente as $d){
            $Ots_Cliente[$t] = $d->Codigo;
            
            $Data_Depto = DB::SELECT("SELECT  "
                . "Departamento, SUM(NroEntregables) as Piezas "
                . "FROM (SELECT DISTINCT "
                . "d.Nombre as Departamento, t.NroEntregables "
                . "FROM Tareas t "
                . "INNER JOIN par_departamento_trafico d ON t.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE t.IdEstado = 1 AND t.IdProyecto = ".$d->Hash." "
                . "UNION ALL "
                . "SELECT DISTINCT "
                . "d.Nombre as Departamento,s.NroEntregables   "
                . "FROM Subtareas s  "
                . "INNER JOIN par_departamento_trafico d ON s.IdDepartamento = d.Id AND d.Estado = 1 "            
                . "WHERE s.IdEstado = 1 AND s.IdProyecto = ".$d->Hash." "
                . ") as TempDeptos "
                . "GROUP BY Departamento "
                . "Order by Departamento Asc");
            
            foreach($Data_Depto as $dx){
                $TotalCliente['Piezas'] += $dx->Piezas;
            }
            $TotalCliente['Tareas'] += 0;
            
            $t++;
            //$Temp = explode("-",$d->Fecha);
            //$d->Fecha = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
        }
        $Ots_Cliente = count( array_unique($Ots_Cliente) );
        
        //-----------------------
        
        $IdEmpresa = 2;
        
        $SemanasDias = DB::SELECT("SELECT DISTINCT Semana,DATE_FORMAT(WeekStart,'%Y-%m-%d') as WeekStart,DATE_FORMAT(WeekEnd,'%Y-%m-%d') as WeekEnd FROM ("
                . "SELECT WEEK(t.FechaEntrega) as Semana, adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY) WeekStart, "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) WeekEnd, "
                . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
                . " from tareas t "
                . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                . " where "
                . ""
                . "t.IdEstado = 1 AND "
                . "t.iddepartamento in (4,56)  "
                . "group by WEEK(t.FechaEntrega) , adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY), "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) "
                . "UNION ALL "
                . "SELECT WEEK(t.FechaEntrega) as Semana, adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY) WeekStart, "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY) WeekEnd, "
                . " sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
                . " from subtareas t "
                . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                . " where "
                . ""
                . "t.IdEstado = 1 AND "
                . "t.iddepartamento in (4,56)  "
                . "group by WEEK(t.FechaEntrega) , adddate(t.FechaEntrega,INTERVAL 1-DAYOFWEEK(t.FechaEntrega) DAY), "
                . "adddate(t.FechaEntrega, INTERVAL 7-DAYOFWEEK(t.FechaEntrega) DAY)) as Semanas "
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
                
                
                $EntregablesDia = DB::SELECT("SELECT Dia,SUM(Cantidad) as Cantidad, SUM(Piezas) as Piezas FROM ("
                . "SELECT DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as Dia, sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
                . " from tareas t "
                . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                . " where "
                . " DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$DiasSemana[$Sem]['Dia']."' AND "
                . "t.IdEstado = 1 AND "
                . "t.iddepartamento in (4,56)  "
                . "group by DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') "
                . "UNION ALL "
                . "SELECT DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') as Dia, sum(1) as Cantidad,sum(t.NroEntregables) as Piezas "
                . " from subtareas t "
                . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                . " where "
                . " DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$DiasSemana[$Sem]['Dia']."' AND "
                . "t.IdEstado = 1 AND "
                . "t.iddepartamento in (4,56)  "
                . "group by DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') ) as Semanas "
                . "GROUP BY Dia "
                . "ORDER BY Dia ASC "
                . "");
                foreach($EntregablesDia as $ent){
                    $Users = DB::SELECT("SELECT DISTINCT NombreUsuario, ImgUsuario FROM ("
                    . "SELECT u.NombreUsuario,u.ImgUsuario "
                    . " from tareas t "
                    . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                    . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                    . "INNER JOIN Equipotarea ett on t.Id = ett.Tareas_Id AND ett.Tipo = 'ASIG' "
                    . "INNER JOIN Usuario u on ett.IdUsuario = u.IdUsuario and u.estado = 1 "
                    . " where "
                    . " DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$DiasSemana[$Sem]['Dia']."' AND "
                    . "t.IdEstado = 1 AND "
                    . "t.iddepartamento in (4,56)  "
                    . " "
                    . "UNION ALL "
                    . "SELECT u.NombreUsuario,u.ImgUsuario  "
                    . " from subtareas t "
                    . " INNER JOIN TraTipoProceso tp on t.idtipoactividad = tp.id "
                    . " inner join proyectos p on p.id = t.idproyecto and p.idcliente = $IdCliente AND p.IdEstado in (1) "
                    . "INNER JOIN Equipotarea ett on t.Id = ett.IdSubtarea AND ett.Tipo = 'ASIG' "
                    . "INNER JOIN Usuario u on ett.IdUsuario = u.IdUsuario and u.Estado = 1 "
                    . " where "
                    . " DATE_FORMAT(t.FechaEntrega,'%Y-%m-%d') = '".$DiasSemana[$Sem]['Dia']."' AND "
                    . "t.IdEstado = 1 AND "
                    . "t.iddepartamento in (4,56)  "
                    . ") as Semanas "
                    . " "
                    . "ORDER BY NombreUsuario ASC "
                    . "");
                    if( count($Users) > 0 ){
                        $ent->User = $Users;
                    }else{
                        $ent->User = [];
                    }
                    
                }
                $DiasSemana[$Sem]['Entregables'] = $EntregablesDia;
                $Temp = explode("-",$DiasSemana[$Sem]['Dia']);
                $DiasSemana[$Sem]['Dia'] = parent::NombreDia($DiasSemana[$Sem]['Dia']).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            }
            
            $Semanas->Detalle =  $DiasSemana;
        }
        //-----------------------
        $Info = [
            'Ots' => $Data_Ots_Semana,
            'TotalOts' => $TotalOts,
            'SemanasDias' => $SemanasDias,
            'Ots_Creativos_Nuevas' => $Ots_Creativos_Nuevas,
            'Ots_Creativos_Ajuste' => $Ots_Creativos_Ajuste,
            'Ots_PendientesACliente' => $Ots_PendientesACliente,
            'Ots_Cliente' => $Ots_Cliente,
            'Ots_Activas' => $Data_Ots_Activas,
            'Solicitudes' => $Solicitudes,
            'TotalNuevasCreativos' => $TotalNuevasCreativos,
            'TotalAjustesCreativos' => $TotalAjustesCreativos,
            'TotalEjecutivos' => $TotalEjecutivos,
            'TareasNuevas_Creativos' => $Tareas_Nuevas,
            'TareasAjustes_Creativos' => $Tareas_Ajustes,
            'TareasNuevas_Ejecutivos' => $Tareas_Nuevas_Ejecutivos,
            'TareasAjustes_Ejecutivos' => $Tareas_Ajustes_Ejecutivos,
            'EnviadoCliente' => $EnviadoCliente,
            'TotalCliente' => $TotalCliente,
            /*'MinDate' => $MinDate,
            
            'Calendario' => $Info,
            'MinDate' =>$MinDate[0]->FechaEntrega,
            'MaxDate' =>$MaxFecha,
            'Fechas' =>$Fechas,
            'Piezas' =>$P,
            'Entregado' => $Entregado*/
        ];
        return $Info;
    }
    
    
    //a9f4808f18f8fb5e6573daffda30f4a4
    public function Informes_HorasHombre(Request $request){
        $Credentials = $this->validate(request(),[
           'TipoInforme' => 'required|int',
           'FechaDesde' => 'required|date',
           'ConceptoFiltro' => 'required|int',
           'FechaHasta' => 'required|date',
        ]);
        
        if( $Credentials['TipoInforme'] == 1 ){
            $Datos = DB::SELECT("SELECT DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$Credentials['FechaDesde']."' AND '".$Credentials['FechaHasta']."') "
                . "GROUP BY DATE_FORMAT(h.FechaInicio,'%Y-%m-%d')");
            $Usuarios = DB::SELECT("SELECT  u.ImgUsuario,u.IdUsuario,u.NombreUsuario,"
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$Credentials['FechaDesde']."' AND '".$Credentials['FechaHasta']."') "
                . "GROUP BY u.ImgUsuario,u.IdUsuario,u.NombreUsuario");
            foreach ( $Datos as $d ){
                $DatosX = DB::SELECT("SELECT DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, h.TipoRegistro, "
                . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                . "FROM hh_actividades_usuario h "
                . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                . "WHERE (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$d->Fecha."' AND '".$d->Fecha."') "
                . "GROUP BY DATE_FORMAT(h.FechaInicio,'%Y-%m-%d'),h.TipoRegistro");
                $d->Detalle = $DatosX;
                
                $InfoUsuario = array();
                
                foreach($Usuarios as $u){
                    
                    
                    $DatosU = DB::SELECT("SELECT  u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, 'Empresa' as TipoRegistro, "
                    . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                    . "FROM hh_actividades_usuario h "
                    . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                    . "WHERE u.IdUsuario = ".$u->IdUsuario." AND (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$d->Fecha."' AND '".$d->Fecha."') AND h.TipoRegistro = 'Empresa' "
                    . "GROUP BY u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d'),h.TipoRegistro");
                    if( count($DatosU) == 0 ){
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Empresa','Tiempo'=>0]);
                    }else{
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Empresa','Tiempo'=>$DatosU[0]->Tiempo]);
                    }
                    
                    $DatosU = DB::SELECT("SELECT  u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, 'Cliente' as TipoRegistro, "
                    . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                    . "FROM hh_actividades_usuario h "
                    . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                    . "WHERE u.IdUsuario = ".$u->IdUsuario." AND (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$d->Fecha."' AND '".$d->Fecha."') AND h.TipoRegistro = 'Cliente' "
                    . "GROUP BY u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d'),h.TipoRegistro");
                    if( count($DatosU) == 0 ){
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Cliente','Tiempo'=>0]);
                    }else{
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Cliente','Tiempo'=>$DatosU[0]->Tiempo]);
                    }
                    
                    $DatosU = DB::SELECT("SELECT  u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') as Fecha, 'Personal' as TipoRegistro, "
                    . "SUM( CASE WHEN TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) < 0 THEN ( (-1)*TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin)) ELSE TIMESTAMPDIFF(MINUTE,h.FechaInicio,h.FechaFin) END )/60 as Tiempo "
                    . "FROM hh_actividades_usuario h "
                    . "INNER JOIN Usuario u on h.IdUsuario = u.IdUsuario "
                    . "WHERE u.IdUsuario = ".$u->IdUsuario." AND (DATE_FORMAT(h.FechaInicio,'%Y-%m-%d') BETWEEN '".$d->Fecha."' AND '".$d->Fecha."') AND h.TipoRegistro = 'Personal' "
                    . "GROUP BY u.ImgUsuario,u.IdUsuario,u.NombreUsuario,DATE_FORMAT(h.FechaInicio,'%Y-%m-%d'),h.TipoRegistro");
                    if( count($DatosU) == 0 ){
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Personal','Tiempo'=>0]);
                    }else{
                        array_push($InfoUsuario, ['ImgUsuario'=>$u->ImgUsuario,'IdUsuario'=>$u->IdUsuario,'NombreUsuario'=>$u->NombreUsuario,$d->Fecha=>$d->Fecha,'TipoRegistro'=> 'Personal','Tiempo'=>$DatosU[0]->Tiempo]);
                    }
                    
                }
               
                $d->DetalleUsuarios = $InfoUsuario;
                
                $Temp = explode("-",$d->Fecha);
                $d->FechaLarga = parent::NombreDia($d->Fecha).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];  
            }
            
            
        }
        return response()->json([
            'DataReport' => $Datos,
            'Usuarios' => $Usuarios,
        ]);
    }
}

