<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function CodeEncrypt($id) {
            // $k = intval(env('KEY_ENCRYPT'));
            // $c = '';
            // $y = $k;
            // $x = intval($id);
            // if($x !== -1){
            //     $c = $x + $y;
            // }
            return ($id*100)*1234;
    }

    public function CodeDescrypt($idCryptogram) {
        // $y = intval(env('KEY_ENCRYPT'));
        // $c = intval($idCryptogram);

        // $x = $c - $y;
        return ($idCryptogram/1234)/100;
    }

    public function queryLogAuditoria(array $id, int $IdUsuario, string $Tipo)
    {
        $sql = [];

        foreach (DB::getQueryLog() as $query) {
            $query = Str::replaceArray('?', $query['bindings'], $query['query']);
            if (explode(' ', $query)[0] != 'select' && explode(' ', $query)[0] != 'SELECT') {
                array_push($sql, $query);
            }
        }
        for ($i=0; $i < count($sql); $i++) {
            DB::insert('INSERT INTO Auditoria (IdConcepto,Tipo,Query,Accion,IdUsuario,Fecha) values (?, ?, ?, ?, ?, ?)',
                [
                    $id[$i],
                    $Tipo,
                    $sql[$i],
                    explode(' ', $sql[$i])[0],
                    $IdUsuario,
                    date("Y-m-d H:i:s"),
                ]);
        }
    }

    public function Paginacion($request,$sqlFrom,$sqlCampos,$searchQuery,$searchValue){

        $sqlBase = "SELECT "
                .$sqlCampos.$sqlFrom;

        ## Read value
        $draw = $request['draw'];
        $row = $request['start'];
        $rowperpage = $request['length']; // Rows display per page
        $columnIndex = $request['order'][0]['column']; // Column index
        $columnName = $request['columns'][$columnIndex]['data']; // Column name
        $columnSortOrder = $request['order'][0]['dir']; // asc or desc
        //$searchValue =  // Search value

        $sel = DB::SELECT("select count(*) as allcount ".$sqlFrom.$searchQuery);
        $records = ($sel);
        $totalRecords = $records[0]->allcount;

        ## Total number of record with filtering
        $sel = DB::SELECT("select count(*) as allcount ".$sqlFrom.$searchQuery);
        $records = ($sel);
        $totalRecordwithFilter = $records[0]->allcount;

        ## Fetch records
        $empQuery = "select $sqlCampos $sqlFrom ".$searchQuery." order by ".$columnName." ".$columnSortOrder." limit ".$row.",".$rowperpage;
        // dd($empQuery);
        $empRecords = DB::SELECT( $empQuery);
        $datos = [
            'empRecords'=>$empRecords,
            'draw'=>$draw,
            'totalRecords'=>$totalRecords,
            'totalRecordwithFilter'=>$totalRecordwithFilter,
            ];
        return $datos;
    }

    public function DatosCorreo(){
        $Usuario = DB::SELECT("SELECT valor from config where nombre = 'CORREO_USER'");
        $Pwd = DB::SELECT("SELECT valor from config where nombre = 'CORREO_PSW'");
        $datos = [
            'Usuario'=>$Usuario[0]->valor,
            'Pwd'=>$Pwd[0]->valor
        ];
        return $datos;
    }
    
    public function ListarDatosHash($tabla,$Id,$Nombre){
        $sqlDB = DB::SELECT("SELECT $Id as Hash, $Nombre "
                . "FROM $tabla "
                . "WHERE Estado = 1");
        foreach($sqlDB as $d){
            $d->Hash = $this->CodeEncrypt($d->Hash);
        }
        return $sqlDB;
    }
    
    public function ValidarPermisoUsuario($NombrePermiso,$user,$tipo){
        if( $tipo == 1 ){
            $Permiso = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.idusuario = '$user' and p.nombre in ('$NombrePermiso')");
        }else{
            $Permiso = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.Token = '$user' and p.nombre in ('$NombrePermiso')");
        }
        
        if( count($Permiso) > 0 ){
            return 1;
        }else{
            return 0;
        }
    }

    public function NombreMeses($id){
        $text = "";
        if( $id == 1 ){
            $text = "Enero";
        }
        if( $id == 2 ){
            $text = "Febrero";
        }
        if( $id == 3 ){
            $text = "Marzo";
        }
        if( $id == 4 ){
            $text = "Abril";
        }
        if( $id == 5 ){
            $text = "Mayo";
        }
        if( $id == 6 ){
            $text = "Junio";
        }
        if( $id == 7 ){
            $text = "Julio";
        }
        if( $id == 8 ){
            $text = "Agosto";
        }
        if( $id == 9 ){
            $text = "Septiembre";
        }
        if( $id == 10 ){
            $text = "Octubre";
        }
        if( $id == 11 ){
            $text = "Noviembre";
        }
        if( $id == 12 ){
            $text = "Diciembre";
        }
        return $text;
    }

    public function NombreDia($fecha){
        $fechats = strtotime($fecha);
        switch (date('w', $fechats)){
            case 0: return "Domingo"; break;
            case 1: return "Lunes"; break;
            case 2: return "Martes"; break;
            case 3: return "Miercoles"; break;
            case 4: return "Jueves"; break;
            case 5: return "Viernes"; break;
            case 6: return "Sabado"; break;
        }
    }

    public function NombreMesesLargo($id){
        $text = "";
        if( $id == 1 ){
            $text = "Enero";
        }
        if( $id == 2 ){
            $text = "Febrero";
        }
        if( $id == 3 ){
            $text = "Marzo";
        }
        if( $id == 4 ){
            $text = "Abril";
        }
        if( $id == 5 ){
            $text = "Mayo";
        }
        if( $id == 6 ){
            $text = "Junio";
        }
        if( $id == 7 ){
            $text = "Julio";
        }
        if( $id == 8 ){
            $text = "Agosto";
        }
        if( $id == 9 ){
            $text = "Septiembre";
        }
        if( $id == 10 ){
            $text = "Octubre";
        }
        if( $id == 11 ){
            $text = "Noviembre";
        }
        if( $id == 12 ){
            $text = "Diciembre";
        }
        return $text;
    }
    public function validateException($error)
    {
        DB::disableQueryLog();
        DB::rollBack();
        return [
            'success'=>false,
            'mensaje'=>$error->getMessage(),
            'validate'=>$error->getMessage(),
            'error' => $error
        ];
    }

    public function queryException($error)
    {
        DB::disableQueryLog();
        DB::rollBack();
        return [
            'success'=>false,
            'mensaje'=>$error->getMessage(),
            'error'=>$error
        ];
    }

    public function normalExeption($error)
    {
        DB::disableQueryLog();
        DB::rollBack();
        return [
            'success'=>false,
            'mensaje'=>$error->getMessage(),
            'error'=>$error
        ];
    }
    
    public function ListarYears(){
        $dl = 2014;
        $Years = Array();
        for($i = $dl,$p = 0; $i <= date("Y");$i++,$p++){
            $Years[$p] = $i;
        }
        return $Years;
    }
    
    //Porcentajes Nomina Empleados
    public function GenPorcentajesNomina($Year,$Concepto){
        $Data = DB::SELECT("SELECT Valor as Porcentaje "
                . "FROM configuracion_salarial "
                . "WHERE Year = $Year AND Concepto = '$Concepto'");
        if( count($Data) == 0 ){
            return 0;
        }else{
            return $Data[0]->Porcentaje;
        }
        
    }
    
    
    //Salario Mínimo Año
    public function GenSalarioMinimo($Year){
        $Datos = DB::SELECT("SELECT Salario "
                . "FROM par_salario_minimo "
                . "WHERE Year = $Year "
                . "AND Estado = 1");
        $val = 0;
        if( count($Datos) == 1 ){
            $val = $Datos[0]->Salario;
        }
        return $val;
    }
    
    //Auxilio de Transporte Año
    public function GenAuxilioTransporte($Year){
        $Datos = DB::SELECT("SELECT Auxilio "
                . "FROM par_auxilio_transporte "
                . "WHERE Year = $Year "
                . "AND Estado = 1");
        $val = 0;
        if( count($Datos) == 1 ){
            $val = $Datos[0]->Auxilio;
        }
        return $val;
    }
    
    //Salario Integral Año
    public function GenSalarioIntegral($Year){
        $Datos = DB::SELECT("SELECT Salario "
                . "FROM par_salario_integral "
                . "WHERE Year = $Year "
                . "AND Estado = 1");
        $val = 0;
        if( count($Datos) == 1 ){
            $val = $Datos[0]->Salario;
        }
        return $val;
    }
    
    //Aportes de Salud
    public function GenAportesSalud($Tipo,$SBase,$Year){
        //Porcentaje:
        $Porcentaje = 0;
        if( $Tipo == 'NORMAL' ){
            $Porcentaje = $this->GenPorcentajesNomina($Year,"SALUD");
        }else if( $Tipo == 'SIMULADOR' ){
            $Porcentaje = $this->GenPorcentajesNomina($Year,"SALUD");
        }
        
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        //Calculo Aporte Salud
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $Porcentaje;
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return (($SBase * 70) / 100) * $Porcentaje;
        }
    }
    
    //Aportes de Pensión
    public function GenAportesPension($Tipo,$SBase,$Year){
        //Porcentaje:
        $Porcentaje = 0;
        if( $Tipo == 'NORMAL' ){
            $Porcentaje = $this->GenPorcentajesNomina($Year,"PENSION");
        }else if( $Tipo == 'SIMULADOR' ){
            $Porcentaje = $this->GenPorcentajesNomina($Year,"PENSION");
        }
        
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        //Calculo Aporte Pensión
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $Porcentaje;
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return (($SBase * 70) / 100) * $Porcentaje;
        }
    }
    
    //Aportes de Pensión
    public function GenFondoSolidaridad($Tipo,$SBase,$Year){
                
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        //Calculo Aporte Salud
        if( $Tipo == 'NORMAL' ){
            if( $SBase <  $PAR_SalarioIntegral){
                return 0;
            }else if( $SBase >=  $PAR_SalarioIntegral ){
                return (($SBase * 70) / 100) * $this->GenPorcentajesNomina($Year,"FONDO_SOLIDARIDAD");
            }
        }else if( $Tipo == 'SIMULADOR' ){
            if( $SBase <  $PAR_SalarioIntegral){
                return 0;
            }else if( $SBase >=  $PAR_SalarioIntegral ){
                return 0;
            }
        }
        
    }
    
    //Cesantias Empleado
    public function GenCesantiasEmpleado($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        //Calculo Aporte Pensión
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $this->GenPorcentajesNomina($Year,"CESANTIAS");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return 0;
        }
    }
    
    //Intereses Cesantias Empleado
    public function GenInteresesCesantiasEmpleado($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        //Calculo Aporte Pensión
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $this->GenPorcentajesNomina($Year,"INTERESES_CESANTIAS");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return 0;
        }
    }
    
    //Vacaciones Empleado
    public function GenVacacionesEmpleado($SBase,$Year){
        return $SBase * $this->GenPorcentajesNomina($Year,"VACACIONES");
    }
    
    //Prima Empleado
    public function GenPrimasEmpleado($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        //Calculo
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $this->GenPorcentajesNomina($Year,"PRIMAS");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return 0;
        }
    }
    
    //Arl
    public function GenCalculoArl($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase <  $PAR_SalarioIntegral){
            return $SBase * $this->GenPorcentajesNomina($Year,"ARL");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"ARL");
        }
    }
    
    //Salud
    public function GenCalculoSalud($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        $PAR_SalarioMinimo = $this->GenSalarioMinimo($Year);
        
        if( $SBase < ($PAR_SalarioMinimo*10) ){
            return 0;
        }else if( $SBase >=  ($PAR_SalarioMinimo*10) ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"APORTE_SALUD");
        }
    }
    //Salud
    public function GenCalculoSaludEmpleado($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        $PAR_SalarioMinimo = $this->GenSalarioMinimo($Year);
        
        if( $SBase < ($PAR_SalarioMinimo*10) ){
            return $SBase * $this->GenPorcentajesNomina($Year,"PENSION");
        }else if( $SBase >=  ($PAR_SalarioMinimo*10) ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"SALUD");
        }
    }
    
    //Pension
    public function GenCalculoPension($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase < $PAR_SalarioIntegral ){
            return $SBase * $this->GenPorcentajesNomina($Year,"APORTE_PENSION");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"APORTE_PENSION");
        }
    }
    //Pension
    public function GenCalculoPensionEmpleado($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase < $PAR_SalarioIntegral ){
            return $SBase * $this->GenPorcentajesNomina($Year,"PENSION");
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"PENSION");
        }
    }
    
    //Caja Compensacion
    public function GenCalculoCajaCompensacion($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase < $PAR_SalarioIntegral ){
            return $SBase * $this->GenPorcentajesNomina($Year,"CAJA_COMPENSACION");;
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"CAJA_COMPENSACION");
        }
    }
    
    //ICBF
    public function GenCalculoICBF($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase < $PAR_SalarioIntegral ){
            return 0;
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"ICBF");
        }
    }
    
    //Sena
    public function GenCalculoSena($SBase,$Year){
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        
        if( $SBase < $PAR_SalarioIntegral ){
            return 0;
        }else if( $SBase >=  $PAR_SalarioIntegral ){
            return ($SBase*0.70) * $this->GenPorcentajesNomina($Year,"SENA");
        }
    }
    
    //Parametro Indemnizaciones
    public function BaseIndemnizacionesProvisiones($Tipo,$SBase,$Year,$FechaIngreso,$YearIngreso){
        $NuevaFecha = strtotime('+365 day', strtotime($FechaIngreso));
        //Consulta Salario Integral
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        if( $Tipo == 1 ){
            if( $SBase < $PAR_SalarioIntegral ){
                if( $NuevaFecha > date("Y-m-d") ){
                    return $SBase / 12;
                }else if( $YearIngreso > 1991 && $YearIngreso <= (date("Y")-1) ){
                    return (($SBase/30) * 20) / 12;
                }else if( $YearIngreso >= 1980 && $YearIngreso < 1990 ){
                    return ($SBase/30)*40;
                }else if( $YearIngreso < 1980 ){
                    return $SBase;
                }
            }else{
                return ($SBase/30) * 15;
            }
        }else{
            if( $SBase < $PAR_SalarioIntegral ){
                if( $YearIngreso > 1991 && $YearIngreso <= (date("Y")-1) ){
                    return (($SBase/30) * 20) / 12;
                }else if( $YearIngreso >= 1980 && $YearIngreso < 1990 ){
                    return ($SBase/30)*40;
                }else if( $YearIngreso < 1980 ){
                    return $SBase;
                }
            }else{
                return ($SBase/30) * 15;
            }
        }
    }
    
    public function CalcularCostoEmpleadoMes($Tipo,$SBase,$SNBase,$Otros,$Bonos,$FechaIngreso,$Year,$Modalidad){
        $PAR_SalarioMinimo = $this->GenSalarioMinimo($Year);
        $PAR_AuxilioTransporte = $this->GenAuxilioTransporte($Year);
        $PAR_SalarioIntegral = $this->GenSalarioIntegral($Year);
        $PAR_MonetizacionSena = 0;
        
        $TotalDeduccionesTrabajador = 0;
        
        $SalarioBase1 = $SBase + $SNBase+ $Bonos;
        $TotalSalario_Aux = $SBase+$PAR_AuxilioTransporte;
        
        $TotalAportesSalud = $this->GenAportesSalud(1,$SBase,$Year);
        $TotalAportesPension = $this->GenAportesSalud(1,$SBase,$Year);
        $TotalAportesFondoSolidaridad = $this->GenFondoSolidaridad($Tipo,$SBase,$Year);
        
        //OTROS
        $TotalRte = 0;
        $TotalAfc = 0;
        
        //Total Aportes Empleado:
        $TotalAportesEmpleado = $TotalAportesSalud + $TotalAportesPension + $TotalAportesFondoSolidaridad + $TotalAfc + $TotalRte;
        
        //Totales
        $TotalPagoEmpleado = $SalarioBase1 + $PAR_AuxilioTransporte;
        $TotalNetoEmpleado = $SBase + $PAR_AuxilioTransporte - $TotalAportesEmpleado;
        
        //Bonos
        $TotalBonos = $Otros + $Bonos;
        
        //Prestaciones Sociales
        $CensatiasEmpleado = $this->GenCesantiasEmpleado($SalarioBase1,$Year);
        $InteresesCensatiasEmpleado = $this->GenInteresesCesantiasEmpleado($SalarioBase1,$Year);
        $VacacionesEmpleado = $this->GenVacacionesEmpleado($SBase,$Year);
        $PrimasEmpleado = $this->GenPrimasEmpleado($SalarioBase1,$Year);
        $SubTotalPrestacionesSociales = $CensatiasEmpleado + $InteresesCensatiasEmpleado + $VacacionesEmpleado + $PrimasEmpleado;
        
        //Seguridad Social
        $Arl = $this->GenCalculoArl($SBase,$Year);
        $Salud = $this->GenCalculoSalud($SBase,$Year);
        $Pension = $this->GenCalculoPension($SBase,$Year);
        $SubTotalSeguridadSocial = $Arl+$Salud+$Pension;
        
        //Aportes Parafiscales
        $CajaCompensacion = $this->GenCalculoCajaCompensacion($SBase,$Year);
        $Icbf = $this->GenCalculoICBF($SBase,$Year);
        $Sena = $this->GenCalculoSena($SBase,$Year);
        $SubTotalAportesParafiscales = $CajaCompensacion + $Icbf + $Sena;
        
        $TotalGeneral = $SubTotalPrestacionesSociales + $TotalSalario_Aux + $SubTotalSeguridadSocial + $SubTotalAportesParafiscales;
        $D_Salud = $this->GenCalculoSaludEmpleado($SBase,$Year);
        $D_Pension = $this->GenCalculoPensionEmpleado($SBase,$Year);
        
        $TotalAportesEmpleado = $D_Salud + $D_Pension + $TotalAportesFondoSolidaridad;
        
        $Y = explode($FechaIngreso,"-");
        $TotalGlobal = $this->BaseIndemnizacionesProvisiones(1,$SBase,$Year,$FechaIngreso,$Y[0]) + $TotalGeneral;
        
        
        $Total = [
            'SalarioBase'=>$SBase,
            'NoPrestacional'=>$SNBase,
            'Otros'=>$Otros,
            'Bonos'=>$Bonos,
            'AuxTransporte'=>$PAR_AuxilioTransporte,
            'D_Salud'=>$D_Salud,
            'D_Pension'=>$D_Pension,
            'AportesEmpleado' => $TotalAportesEmpleado,
            'TotalSalario' => ($SBase+$SNBase+$Otros+$Bonos),
            'TotalSalario_Aux' => ($SBase+$SNBase+$Otros+$Bonos)+$PAR_AuxilioTransporte,
            'TotalRecibidoEmpleado' => (($SBase+$SNBase+$Otros+$Bonos)+$PAR_AuxilioTransporte) - $TotalAportesEmpleado ,
            'SalarioBase1'=>$SalarioBase1,
            'TotalSalario_Aux'=>$TotalSalario_Aux,
            'TotalAportesSalud'=>$TotalAportesSalud,
            'TotalAportesPension'=>$TotalAportesPension,
            'TotalAportesFondoSolidaridad'=>$TotalAportesFondoSolidaridad,
            'TotalPagoEmpleado'=>$TotalPagoEmpleado,
            'TotalNetoEmpleado'=>$TotalNetoEmpleado,
            'TotalBonos'=>$TotalBonos,
            'CensatiasEmpleado'=>$CensatiasEmpleado,
            'InteresesCensatiasEmpleado'=>$InteresesCensatiasEmpleado,
            'PrimasEmpleado'=>$PrimasEmpleado,
            'VacacionesEmpleado'=>$VacacionesEmpleado,
            'SubTotalPrestacionesSociales'=>$SubTotalPrestacionesSociales,
            'Arl'=>$Arl,
            'Salud'=>$Salud,
            'Pension'=>$Pension,
            'SubTotalSeguridadSocial'=>$SubTotalSeguridadSocial,
            'CajaCompensacion'=>$CajaCompensacion,
            'Icbf'=>$Icbf,
            'Sena'=>$Sena,
            'SubTotalAportesParafiscales'=>$SubTotalAportesParafiscales,
            'TotalGeneral'=>$TotalGeneral,
            'TotalGlobal'=>$TotalGlobal,
            'Indemnizaciones'=>$this->BaseIndemnizacionesProvisiones(1,$SBase,$Year,$FechaIngreso,$Y[0]),
            
            'Por_Salud'=>(100*$this->GenPorcentajesNomina($Year,"SALUD")),
            'Por_Pension'=>(100*$this->GenPorcentajesNomina($Year,"PENSION")),
            'Por_FDS'=>(100*$this->GenPorcentajesNomina($Year,"FONDO_SOLIDARIDAD")),
            'Por_Cesantias'=>(100*$this->GenPorcentajesNomina($Year,"CESANTIAS")),
            'Por_IntCesantias'=>(100*$this->GenPorcentajesNomina($Year,"INTERESES_CESANTIAS")),
            'Por_Primas'=>(100*$this->GenPorcentajesNomina($Year,"PRIMAS")),
            'Por_Vacaciones'=>(100*$this->GenPorcentajesNomina($Year,"VACACIONES")),
            'Por_SaludEmpresa'=>(100*$this->GenPorcentajesNomina($Year,"APORTE_SALUD")),
            'Por_PensionEmpresa'=>(100*$this->GenPorcentajesNomina($Year,"APORTE_PENSION")),
            'Por_ArlEmpresa'=>(100*$this->GenPorcentajesNomina($Year,"ARL")),
            'Por_CC'=>(100*$this->GenPorcentajesNomina($Year,"CAJA_COMPENSACION")),
            'Por_ICBF'=>(100*$this->GenPorcentajesNomina($Year,"ICBF")),
            'Por_SENA'=>(100*$this->GenPorcentajesNomina($Year,"SENA")),
        ];
        
        /*
        if( $Modalidad == 'Aprendizaje' ){
            return $this->GenCalculoArl($SBase,$Year);
        }*/
        
        return $Total;
    }
    
    
    
    public function NombreNumeros($num){
        //$formatterES = new NumberFormatter("es", NumberFormatter::SPELLOUT);
        $NumText = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince',
            'diesiséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidos','veintitres','veinticuatro','veinticinco','veintiseis',
            'veintisiete','veintiocho','veintinueve','treinta','trintaiuno'];
        return $NumText[$num];
    }
    
    public function NombreAnios($num){
        $NumText = "";
        if( $num == 2020 ){
            $NumText = "dos mil veinte";
        }else if( $num == 2019 ){
            $NumText = "dos mil diecinueve";
        }else if( $num == 2021 ){
            $NumText = "dos mil veintiuno";
        }else if( $num == 2022 ){
            $NumText = "dos mil veintidos";
        }else if( $num == 2023 ){
            $NumText = "dos mil veintitres";
        }else if( $num == 2024 ){
            $NumText = "dos mil veinticuatro";
        }else if( $num == 2025 ){
            $NumText = "dos mil veinticinco";
        }
        return $NumText;
    }
    
    public function Meses($num){
        $mes = "";
        if( $num == 1 ){
            $mes = "enero";
        }
        if( $num == 2 ){
            $mes = "febrero";
        }
        if( $num == 3 ){
            $mes = "marzo";
        }
        if( $num == 4 ){
            $mes = "abril";
        }
        if( $num == 5 ){
            $mes = "mayo";
        }
        if( $num == 6 ){
            $mes = "junio";
        }
        if( $num == 7 ){
            $mes = "julio";
        }
        if( $num == 8 ){
            $mes = "agosto";
        }
        if( $num == 9 ){
            $mes = "septiembre";
        }if( $num == 10 ){
            $mes = "octubre";
        }
        if( $num == 11 ){
            $mes = "noviembre";
        }
        if( $num == 12 ){
            $mes = "diciembre";
        }
        return $mes;
    }
    
    public function _IngresoDatos(){
        if (session('Time') > date("Y-m-d H:i:s")) {          
            return view('process.datos.Datos');
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    public function _IngresoAdministracion(){
        if (session('Time') > date("Y-m-d H:i:s")) {          
            return view('process.administracion.Administracion');
        } else {
            return view('auth.login')->with('Error', 'Su sesión a terminado y sus cambios han sido guardados.');
        }
    }
    
}
