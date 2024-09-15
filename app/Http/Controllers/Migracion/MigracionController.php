<?php

namespace App\Http\Controllers\Migracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MigracionController extends Controller
{
    //
    //
    public function Repc(){
        $sql = DB::SELECT("Select IdConcepto,query from auditoria where month(fecha) = 8 and tipo like 'TRA_CLIENTES_OT_CREAR%' ");
        foreach($sql as $d){
            $temp = explode(",",$d->query);
            $tt = explode("(",$temp[12]);
            
            $final = count($temp)-3;
            $dif = $final-21;
            
            $Desc = "";
            //$Codigo = $temp[];
            for($i = 21; $i <= $final; $i++){
                $Desc .= $temp[$i].",";
            }
            
            
           
            
            //echo $temp[20]."_[]!".$temp[21]."<br>";
            //DB::INSERT($d->query);
            echo $temp[17]."-".$d->IdConcepto."<br>";
            /*echo "INSERT INTO Proyectos (Id,IdEmpresa,IdUnidad,IdCliente,Idproducto,IdSubProducto,IdProfesional,IdEjecutivo,IdDirector,Referencia,Codigo,Descripcion,Fecha,"
                    . "IdEstado) values (".$d->IdConcepto.",".$tt[1].",".$temp[13].",".$temp[14].",".$temp[15].",".$temp[16].","
                    .$temp[17].",".$temp[18].",".$temp[19].",'".$temp[20]."','".$temp[21]."','".$Desc."','".$temp[count($temp)-2]."',1);<br>";*/
            /*
            $Data = [$d->IdConcepto,$tt[1],$temp[13],$temp[14],$temp[15],$temp[16],$temp[17],$temp[18],$temp[19],$temp[20],$temp[21],$Desc,$temp[count($temp)-2],1];
            DB::INSERT("INSERT INTO Proyectos (Id,IdEmpresa,IdUnidad,IdCliente,Idproducto,IdSubProducto,IdProfesional,IdEjecutivo,IdDirector,Referencia,Codigo,Descripcion,Fecha,"
                    . "IdEstado) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",$Data);*/
            /*
            $id = DB::table('proyectos')
            ->insert([
                'Id' => $d->IdConcepto,
                'IdEmpresa'=>$tt[1],
                'IdUnidad'=>$temp[13],
                'IdCliente'=>$temp[14],
                'IdProducto'=>$temp[15],
                'IdSubProducto' => $temp[16],
                'IdProfesional' => $temp[17],
                'IdEjecutivo' => $temp[18],
                'IdDirector' => $temp[19],
                'Referencia' => $temp[20],
                'Codigo' => $temp[21],
                'Descripcion' => $Desc,
                'Fecha' => $temp[count($temp)-2],
                'IdEstado' => 1
            ]);*/
            /*
            $temp = explode(",",$d->query);
            
            $final = count($temp)-12;
            $dif = $final-13;
            
            $Desc = "";
            //$Codigo = $temp[];
            for($i = 13; $i <= $final; $i++){
                $Desc .= $temp[$i].",";
            }
            //echo $temp[11]."<br>";
            $tt = explode("(",$temp[12]);
            /*echo "insert into `subtareas` (`Id`,`Asunto`, `Descripcion`, `FechaEntrega`, `NroEntregables`, `IdProyecto`, `IdEstado`, `IdTipoTarea`, `IdTipoActividad`, "
            . "`IdUsuario`, `IdDepartamento`, `FechaHoraCreacion`, `Numeracion`, `IdTareaPadre`) "
            . " values ("
                    . "".$d->IdConcepto.","
                    . "'".$tt[1]."',"
                    . "'".$Desc."',"
                    . "'".$temp[count($temp)-11]."',"
                    . "".$temp[count($temp)-10].","
                    . "".$temp[count($temp)-9].","
                    . "".$temp[count($temp)-8].","
                    . "".$temp[count($temp)-7].","
                    . "".$temp[count($temp)-6].","
                    . "".$temp[count($temp)-5].","
                    . "".$temp[count($temp)-4].","
                    . "'".$temp[count($temp)-3]."',"
                    . "'".$temp[count($temp)-2]."',"
                    . "".$temp[count($temp)-1].";<br>";*/
            //echo "update subtareas set IdTipoActividad = ".$temp[count($temp)-8].", IdTipoTarea = ".$temp[count($temp)-6]."  where id = ".$d->IdConcepto."<br>";
            
            //echo $d->query."<br>";
        }
    }
    
    
    //1fcb80a3322ce8dd5da52ae730e4753e
    public function index()
    {
        DB::table('proyectos')->truncate();
        DB::table('tareas')->truncate();
        DB::table('subtareas')->truncate();
        DB::table('equipotarea')->truncate();
        
        //OTS
        DB::INSERT("INSERT INTO process_v3.proyectos
                (
                Id,Codigo,IdEmpresa,IdUnidad,IdCliente,IdProducto,IdSubproducto,IdProfesional,IdEjecutivo,IdDirector,Referencia,Descripcion,Fecha,IdEstado
                )
                select 
                Id,Codigo,GesEmpresaId,Case When isnull(GesUnidadNegocioId) then 0 else GesUnidadNegocioId end ,
                GesClienteId,GesClienteProductoId,GesSubProductoId,GesEmpresaClienteContactoId,GesUsuarioEjecutivoId,GesUsuarioDirectorId,Referencia,Descripcion,FechaHora,GenEstadoOrdenTrabajoId
                from process.tra_ordenes_trabajo;
                ");
        DB::UPDATE("update proyectos set idejecutivo = 100140 where idejecutivo in (216,252,235,100027,100084,100149) and idcliente = 256;");
        
        
        //TAREAS
        DB::INSERT("insert into process_v3.tareas
                (
                Id,Asunto,Descripcion,FechaEntrega,NroEntregables,IdProyecto,IdEstado,IdTipoTarea,IdUsuario,IdDepartamento,FechaHoraCreacion,Numeracion,IdTipoActividad
                )

                select 
                Id,Titulo,Descripcion,concat(case when FechaEntrega like '%0000-00-00%' then date_format(FechaHoraCreacion,'%Y-%m-%d') else FechaEntrega end,' ',HoraEntrega) as Fechax,0,TraOrdenTrabajoId,GenTareaEstadoId,ParTipoTareaId,GesUsuarioId,GesDeptoTraficoId,FechaHoraCreacion,Numero,
                1
                FROM process.tra_tareas
                where isnull(TraTareaPadreId) and Numero not like '%.%';");
        
        //SUBTAREAS
        DB::INSERT("insert into process_v3.Subtareas
                (
                Id,Asunto,Descripcion,FechaEntrega,NroEntregables,IdProyecto,IdEstado,IdTipoTarea,IdUsuario,IdDepartamento,FechaHoraCreacion,Numeracion,IdTipoActividad,IdTareaPadre
                )

                select 
                Id,Titulo,Descripcion,concat(case when FechaEntrega like '%0000-00-00%' then date_format(FechaHoraCreacion,'%Y-%m-%d') else FechaEntrega end,' ',HoraEntrega) as Fechax,0,TraOrdenTrabajoId,GenTareaEstadoId,ParTipoTareaId,GesUsuarioId,GesDeptoTraficoId,FechaHoraCreacion,Numero,
                1,TraTareaPadreId
                FROM process.tra_tareas
                where  (TraTareaPadreId is not null )
                and length(numero) < 5;
                ");
        
        //EQUIPO TAREA
        DB::INSERT("insert into equipotarea
                (
                Tipo,IdUsuario,FechaVisualizacion,Tareas_Id
                )
                SELECT case when t.genTareaTipoAsignacionId = 1 then 'RESP' ELSE 'ASIG' END ,
                t.GesUsuarioId, NULL,t.TraTareaId
                FROM process.tra_tareas_usuarios t 
                where t.TraTareaId in (select tC.Id from process_v3.tareas tC);");
        DB::INSERT("insert into equipotarea
                (
                Tipo,IdUsuario,FechaVisualizacion,IdSubtarea
                )
                SELECT case when t.genTareaTipoAsignacionId = 1 then 'RESP' ELSE 'ASIG' END ,
                t.GesUsuarioId, NULL,t.TraTareaId
                FROM process.tra_tareas_usuarios t 
                where t.TraTareaId in (select tC.Id from process_v3.subtareas tC);");
        
        //AJUSTES ESTADOS TAREAS
        DB::UPDATE("update process_v3.tareas set IdEstado = 7 where IdEstado = 2 AND id = id;");
        DB::UPDATE("update process_v3.tareas set IdEstado = 6 where IdEstado = 4 AND id = id;");
        DB::UPDATE("update process_v3.tareas set IdEstado = 5 where IdEstado = 3 AND id = id;");
        DB::UPDATE("update process_v3.subtareas set IdEstado = 7 where IdEstado = 2 AND id = id;");
        DB::UPDATE("update process_v3.subtareas set IdEstado = 6 where IdEstado = 4 AND id = id;");
        DB::UPDATE("update process_v3.subtareas set IdEstado = 5 where IdEstado = 3 AND id = id;");
        /*
        DB::table('negociaciones')->truncate();
        //ComisionClientes:
        DB::INSERT("INSERT INTO process_v3.negociaciones 
        (Id,Porcentaje,IdCliente,IdCondicionPago,TipoRentabilidad,IdUsuario,Fecha,IdEmpresa,IdUnidad,IdRegimen,Autoretenedor,Estado,ImpuestoAdicional)
        select Id,ValorComision,GesClienteId, case 
        when diasplazo = 30 then 1 when diasplazo = 45 then 2 when diasplazo = 60 then 3 when diasplazo = 90 then 4
        when diasplazo = 0 then 5 when diasplazo = 15 then 6 when diasplazo = 17 then 7 when diasplazo = 20 then 8
        when diasplazo = 24 then 9 when diasplazo = 47 then 10 when diasplazo = 120 then 11 when diasplazo = 25 then 12  end,
        GenTipoComisionId,1,FechaHora,GesEmpresaId,1,GenTipoRegimenId,Autoretenedor,Estado,0
        from process.ges_empresas_clientes_negociaciones");
        
        DB::table('centro_costo')->truncate();
        DB::INSERT("insert into process_v3.centro_costo
        (Id,Nombre,IdEmpresa,Estado,IdUsuario,Fecha)
        select Id,Nombre,GesEmpresaId,Estado,1,FechaHora
        from process.ges_empresas_centros_costo;");
        
        DB::table('presupuesto')->truncate();
        DB::INSERT("INSERT INTO process_v3.presupuesto (
        Id, Referencia,IdEmpresa,IdUnidad,IdCliente,IdProyecto,VigenciaInicial, VigenciaFinal,Lugar,NotaLegal,Dirigido,TipoComision,VersionInterna,
        VersionCliente,EstadoVersion,IdTipoPpto,IdUsuario,Fecha,NotaAdicional,IdClasificacion,
        Imprevistos,GastosAdministrativos,Factoring,IntBancarios, IntTerceros,VersionCerrada,Tasa,IdMoneda
        )
        select p.Id,p.Referencia,p.GesEmpresaId, case when isnull(ot.GesUnidadNegocioId) then 1 else ot.GesUnidadNegocioId end ,p.GesClienteId,ot.Id,
        p.FechaVigenciaInicial,p.FechaVigenciaFinal,p.LugarEjecucion,p.NotaLegal,p.DirigidoA,
        p.GesEmpresaClienteNegociacionId,pp.VersionInterna,pp.VersionExterna,
        1,p.GenPresupuestoTipoId, case when isnull(p.GesUsuarioId) then 1 else p.GesUsuarioId end , p.FechaHora,p.NotaAdicional, p.GenPresupuestoClasificacionId,0,0,0,0,0,0,0,1
        from process.pro_presupuestos p 
        inner join process.tra_ordenes_trabajo ot on p.TraOrdenTrabajoId = ot.Id
        INNER JOIN process.pro_presupuestos_versiones pp on p.Id = pp.ProPresupuestoId and p.ProPresupuestoVersionId = pp.Id
        ;");
        
        DB::UPDATE("UPDATE PRESUPUESTO SET LUGAR = 'Bogotá' where lugar  = '14';");
        
        DB::table('FacturasPresupuestos')->truncate();
        DB::INSERT("INSERT INTO process_v3.FacturasPresupuestos
        (Id,IdEmpresa,IdPpto,ValorFactura,ValorImpuestos,Estado,IdUsuario,Fecha,FechaFactura,Factura)
        select
        Id,GesEmpresaId,ProPresupuestoId,ValorFacturaSinIva,ValorIvaFactura,GenFacturaClienteEstadoId,GesUsuarioId,FechaHora,date_format(FECHAFACTURA,'%Y-%m-%d'),NumeroFactura
        from process.pro_facturas_clientes;");*/
        /*
        INSERT INTO process_v3.pptoversiones
(
IdPpto,
Fecha,
IdUsuario,
VersionInterna,
VersionCliente)
select  ProPresupuestoId,FechaHoraCreacion,GesUsuarioId,VersionInterna,VersionExterna
 FROM process.pro_presupuestos_versiones;
        
         * 
         
         INSERT INTO process_v3.grupo_presup
(Orden,Nombre,VersionInterna,VersionExterna,IdPpto,Fecha,IdUsuario)
SELECT distinct 
1,i.Grupo, v.VersionInterna,v.VersionExterna, i.ProPresupuestoId,sysdate(),i.GesUsuarioId FROM process.pro_presupuestos_items i 
INNER JOIN process.pro_presupuestos_versiones v on i.ProPresupuestoId = v.ProPresupuestoId and i.ProPresupuestoVersionId = v.Id;
         
        INSERT INTO process_v3.item_grupos
(Orden,Item,Descripcion_Interna,IdProveedor,Dias,Unidad,ValorUnitario,Volumen,IdImpuesto,Descripcion_Externa,ValorUnitarioCliente,Bloqueo,VNC,IdGrupo,VC,PorcentajeComision,IdImpuestoExterno,IdUsuario,Fecha,IdOp,IdOc)
SELECT  
i.Orden,i.Nombre, i.DescripcionInterna, 
CASE WHEN isnull(i.GesProveedorId) then 0 else i.GesProveedorId end,
i.Dias,i.Cantidad,i.ValorUnitarioInterno,i.Volumen,1, i.DescripcionExterna,i.ValorUnitarioExterno,
case when i.ProPresupuestoOrdenCompraId != NULL THEN 1 WHEN i.ProPresupuestoOrdenProduccionId != NULL THEN 1 WHEN i.PorcentajeAnticipo != 0 then 1 else 0 end,
case when i.Comisionable = 1 then 0 else 1 end, 
g.Id,
0,0,
1,
i.GesUsuarioId,i.FechaHora,i.ProPresupuestoOrdenProduccionId,i.ProPresupuestoOrdenCompraId
FROM process.pro_presupuestos_items i 
INNER JOIN process.pro_presupuestos_versiones v on i.ProPresupuestoId = v.ProPresupuestoId and i.ProPresupuestoVersionId = v.Id
INNER JOIN Process_v3.grupo_presup g on v.ProPresupuestoId = g.IdPpto and v.VersionExterna = g.VersionExterna and v.VersionInterna = g.VersionInterna
WHERE i.Grupo = g.Nombre;
         * 
         * 
         * UPDATE `process_v3`.`par_formapago` SET `Nombre` = '60 Días', `Dias` = '60' WHERE (`Id` = '2');
UPDATE `process_v3`.`par_formapago` SET `Nombre` = '90 Días', `Dias` = '90' WHERE (`Id` = '3');
UPDATE `process_v3`.`par_formapago` SET `Nombre` = '180 Días', `Dias` = '180' WHERE (`Id` = '4');
UPDATE `process_v3`.`par_formapago` SET `Nombre` = '50% Anticipado y Saldo a 30 Días', `Dias` = '30' WHERE (`Id` = '5');
UPDATE `process_v3`.`par_formapago` SET `Nombre` = 'Pago Contado' WHERE (`Id` = '6');
INSERT INTO `process_v3`.`par_formapago` (`Nombre`, `Dias`, `Estado`, `IdUsuario`) VALUES ('45 Días', '45', '1', '1');
INSERT INTO `process_v3`.`par_formapago` (`Nombre`, `Dias`, `Estado`, `IdUsuario`) VALUES ('Pago Tarjeta De Crédito', '0', '1', '1');

INSERT INTO process_v3.ordenproduccion
(Id,Fecha,IdUsuario,IdPpto,IdProyecto,IdProveedor,Observaciones,VigenciaInicial,VigenciaFinal,FechaEntrega,NotaLegal,
MotivoCancelacion,UsuarioCancelacion,Lugar,Estado,FechaCancelacion,IdFormaPago,Notificacion)

select 
p.Id,p.FechaHoraCreacion,p.GesUsuarioId,p.ProPresupuestoId,t.Id,p.GesProveedorId,p.Observacion,date_format(p.FechaVigenciaInicial,'%Y-%m-%d'),
date_format(p.FechaVigenciaFinal,'%Y-%m-%d'),
date_format(p.FechaEntrega,'%Y-%m-%d'),
p.NotaLegal,
p.ObservacionesCancelacion,
P.GesUsuarioCancelacionId,
p.LugarEntrega,
case when p.GenPresupuestoOrdenProduccionEstadoId = 1 then 2 when p.GenPresupuestoOrdenProduccionEstadoId = 2 then 2 else 0 end,
p.FechaHoraCancelacion,
p.GenOrdenFormaPagoId,0
FROM
process.pro_presupuestos_ordenes_produccion p 
inner join process.pro_presupuestos pp on p.ProPresupuestoId = pp.Id 
INNER JOIN process.tra_ordenes_trabajo t on pp.TraOrdenTrabajoId = t.Id;
         * 
        select distinct idempresa from process_v3.FacturasPresupuestos where valorimpuestos != 0;
        select * from process_v3.Tarifa_Legal_Empresa where IdEmpresa in (2,8,1,15,17,19,12,24) and valor = 19;
        select * from process_v3.ImpuestosFactura;

        INSERT INTO ImpuestosFactura
        (IdImpuesto,Porcentaje,Valor,FacturasPresupuestos_Id)
        SELECT 11,19, ValorImpuestos*0.19,Id
        From FacturasPresupuestos 
        WHERE ValorImpuestos != 0 AND IdEmpresa = 15;
        
        INSERT INTO PROCESS_V3.PagosFacturas
(Valor,FechaPago,IdUsuario,Fecha,FacturasPresupuestos_Id,IdTipoPago)
select 
ValorPagado,DATE_FORMAT(FechaPago,'%Y-%m-%d'),GesUsuarioId,FechaHora,ProFacturaClienteId,GenFacturaPagoClienteTipoId
FROM process.pro_facturas_pagos_clientes where GenFacturaPagoClienteEstadoId = 1 
        
        INSERT INTO process_v3.Par_Tipo_Tarifa_Legal_Empresa 
        (Id,Nombre,Estado,IdUsuario,FechaCreacion)
        select Id,Nombre,Estado,1,FechaHora
        from 
        process.par_impuestos;    
         * 
         * 
        INSERT INTO process_v3.Tarifa_Legal_Empresa
        (FechaVencimiento,Valor,Tipo,IdTarifa,IdEmpresa,Ppto,IdUsuario,FechaHora,Estado)
        select 
        '2022-01-01',Porcentaje,'PORCENTAJE',ParImpuestoId,GesEmpresaId,'IP',1,FechaHora,Estado
        from process.ges_empresas_impuestos;
        */
        return "Migracion Generada con Éxito";
    }
    
    public function CorreccionesCaracteres(){
        /*$Clientes = DB::SELECT("SELECT "
                . "NombreComercial, NombreLegal, IdCliente, Fecha "
                . "FROM Cliente ");
        foreach($Clientes as $c){
            $temp = explode(" ",$c->NombreComercial);
            $NombreComercial = "";
            for($t = 0; $t < count($temp); $t++){
                
                if( $temp[ count($temp)-1 ] == 'sa'){
                    $temp[ count($temp)-1 ] = 'SA';
                }else if( $temp[ count($temp)-1 ] == 's.a'){
                    $temp[ count($temp)-1 ] = 'S.A';
                }else if( $temp[ count($temp)-1 ] == 's.a.'){
                    $temp[ count($temp)-1 ] = 'S.A.';
                }else if( $temp[ count($temp)-1 ] == 's.a.s'){
                    $temp[ count($temp)-1 ] = 'S.A.S';
                }else if( $temp[ count($temp)-1 ] == 'sas'){
                    $temp[ count($temp)-1 ] = 'SAS';
                }else if( $temp[ count($temp)-1 ] == 's.a.s.'){
                    $temp[ count($temp)-1 ] = 'S.A.S.';
                }
                
                if( $t < count($temp)-1 ){
                    for($i = 0; $i < strlen($temp[$t]);$i++){
                        if( $i == 0 ){
                            $temp[$t][$i] = strtoupper($temp[$t][$i]);
                        }else{
                            $temp[$t][$i] = strtolower($temp[$t][$i]);
                        }
                    }
                }
                if( $t == (count($temp)-1) ){
                    $NombreComercial .= $temp[$t]."";
                }else{
                    $NombreComercial .= $temp[$t]." ";
                }
                
            }
            $NombreLegal = "";
            for($t = 0; $t < count($temp); $t++){
                if( $temp[ count($temp)-1 ] == 'sa'){
                    $temp[ count($temp)-1 ] = 'SA';
                }else if( $temp[ count($temp)-1 ] == 's.a'){
                    $temp[ count($temp)-1 ] = 'S.A';
                }else if( $temp[ count($temp)-1 ] == 's.a.'){
                    $temp[ count($temp)-1 ] = 'S.A.';
                }else if( $temp[ count($temp)-1 ] == 's.a.s'){
                    $temp[ count($temp)-1 ] = 'S.A.S';
                }else if( $temp[ count($temp)-1 ] == 'sas'){
                    $temp[ count($temp)-1 ] = 'SAS';
                }else if( $temp[ count($temp)-1 ] == 's.a.s.'){
                    $temp[ count($temp)-1 ] = 'S.A.S.';
                }
                
                if( $t < count($temp)-1 ){
                    for($i = 0; $i < strlen($temp[$t]);$i++){
                        if( $i == 0 ){
                            $temp[$t][$i] = strtoupper($temp[$t][$i]);
                        }else{
                            $temp[$t][$i] = strtolower($temp[$t][$i]);
                        }
                    }
                }
                if( $t == (count($temp)-1) ){
                    $NombreLegal .= $temp[$t]."";
                }else{
                    $NombreLegal .= $temp[$t]." ";
                }
            }
            $Cliente = DB::table('Cliente');
            $Cliente->where('IdCliente', $c->IdCliente)
            ->update([
                'NombreComercial' => $NombreComercial,
                'NombreLegal' => $NombreLegal,
            ]);
            //DB::UPDATE("UPDATE Cliente set NombreComercial = '$NombreComercial' , NombreLegal = '$NombreLegal'  where idcliente = ".$c->IdCliente."; ");
            //echo "UPDATE Cliente set NombreComercial = '$NombreComercial' , NombreLegal = '$NombreLegal'  where idcliente = ".$c->IdCliente."; ";
        }*/
        
        $Usuarios = DB::SELECT("SELECT "
                . "IdUsuario, NombreUsuario "
                . "FROM Usuario ");
        foreach($Usuarios as $c){
            $temp = explode(" ",$c->NombreUsuario);
            $NombreUsuario = "";
            for($t = 0; $t < count($temp); $t++){
                
                for($i = 0; $i < strlen($temp[$t]);$i++){
                        if( $i == 0 ){
                            $temp[$t][$i] = strtoupper($temp[$t][$i]);
                        }else{
                            $temp[$t][$i] = strtolower($temp[$t][$i]);
                        }
                    }
                if( $t == (count($temp)-1) ){
                    $NombreUsuario .= $temp[$t]."";
                }else{
                    $NombreUsuario .= $temp[$t]." ";
                }
                DB::UPDATE("UPDATE Usuario set NombreUsuario = '$NombreUsuario' where IdUsuario = ".$c->IdUsuario."; ");
            }
        }
        
        
        /*$Productos = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "FROM productocliente ");
        foreach($Productos as $c){
            $temp = explode(" ",$c->Nombre);
            $Nombre = "";
            $temp2 = $c->Nombre;
            echo count($temp)."<br>";
            if( count($temp) == 1 ){
                for($i = 0; $i < strlen($temp2);$i++){
                    if( $i == 0 ){
                        $temp2[$i] = strtoupper($temp2[$i]);
                    }else{
                        $temp2[$i] = strtolower($temp2[$i]);
                    }
                }
                $Nombre .= $temp2;
                if( $c->Id  != 587 ){
                        DB::UPDATE("UPDATE productocliente set Nombre = '$Nombre' where Id = ".$c->Id."; ");
                    }
            }else{
                for($t = 0; $t < count($temp); $t++){

                    if( $t < count($temp)-1 ){
                        for($i = 0; $i < strlen($temp[$t]);$i++){
                            if( $i == 0 ){
                                $temp[$t][$i] = strtoupper($temp[$t][$i]);
                            }else{
                                $temp[$t][$i] = strtolower($temp[$t][$i]);
                            }
                        }
                    }
                    if( $t == (count($temp)-1) ){
                        $Nombre .= $temp[$t]."";
                    }else{
                        $Nombre .= $temp[$t]." ";
                    }
                    if( $c->Id  != 587 ){
                        DB::UPDATE("UPDATE productocliente set Nombre = '$Nombre' where Id = ".$c->Id."; ");
                    }
                }
            }
            
        }*/
        /*
        $Productos = DB::SELECT("SELECT "
                . "IdProfesionalesCliente as Id, Nombre "
                . "FROM profesionales_cliente ");
        foreach($Productos as $c){
            $temp = explode(" ",$c->Nombre);
            $Nombre = "";
            $temp2 = $c->Nombre;
            echo count($temp)."<br>";
            for($t = 0; $t < count($temp); $t++){

                for($i = 0; $i < strlen($temp[$t]);$i++){
                        if( $i == 0 ){
                            $temp[$t][$i] = strtoupper($temp[$t][$i]);
                        }else{
                            $temp[$t][$i] = strtolower($temp[$t][$i]);
                        }
                    }
                if( $t == (count($temp)-1) ){
                    $Nombre .= $temp[$t]."";
                }else{
                    $Nombre .= $temp[$t]." ";
                }
                DB::UPDATE("UPDATE profesionales_cliente set Nombre = '$Nombre' where IdProfesionalesCliente = ".$c->Id."; ");
            }
        }*/
        /*
        $Productos = DB::SELECT("SELECT "
                . "Id, Nombre "
                . "FROM par_departamento_trafico ");
        foreach($Productos as $c){
            $temp = explode(" ",$c->Nombre);
            $Nombre = "";
            $temp2 = $c->Nombre;
            echo count($temp)."<br>";
            for($t = 0; $t < count($temp); $t++){

                for($i = 0; $i < strlen($temp[$t]);$i++){
                        if( $i == 0 ){
                            $temp[$t][$i] = strtoupper($temp[$t][$i]);
                        }else{
                            $temp[$t][$i] = strtolower($temp[$t][$i]);
                        }
                    }
                if( $t == (count($temp)-1) ){
                    $Nombre .= $temp[$t]."";
                }else{
                    $Nombre .= $temp[$t]." ";
                }
                DB::UPDATE("UPDATE par_departamento_trafico set Nombre = '$Nombre' where Id = ".$c->Id."; ");
            }
        }*/
    }
}
