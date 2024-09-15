<?php

namespace App\Http\Controllers;


use App\Http\Controllers;
use Illuminate\Http\Request;

Use Illuminate\Database\Seeder;
Use Illuminate\Support\Facades\DB;
Use Illuminate\Database\QueryException;
use FilesystemIterator;
Use Illuminate\Support\Facades\Response;
use Barryvdh\DomPDF\Facade as PDFx;
use App\Http\Controllers\Process\Trafico\TraClienteController;
use App\Http\Controllers\Process\Produccion\PresupuestoController;
use App\Http\Controllers\Process\Datos\InventarioController;
use App\Exports\trafico\ClientesOT;
use Illuminate\Support\Collection;


class PDFController extends Controller{

    
    //b4ac42fb5d888c8a2fbcf7e5d8415bec
    public function PDF_TRA_InformeEntrevista($Hash){
        session()->forget('DataInformeEntrevista');
        session()->forget('DataPDF');
        
        $IdInforme = parent::CodeDescrypt($Hash);
        $Data = (new TraClienteController)->TraDatosInformeEntrevista($IdInforme);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Informe Entrevista OT '.$Data['NumOt'].' - '.$Data['Asunto'];
        
        session(['DataInformeEntrevista' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.TRA_InformeEntrevista')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true);
        return $pdf->stream('Informe Entrevista OT '.$Data['NumOt'].' - '.$Data['Asunto'].'.pdf');
    }
    
    //
    public function PDF_TRA_ReporteListadoOts(){
        $Data = (new ClientesOT(
                session('TRA_ReportParam_ListOT')['idEmpresa'], 
                session('TRA_ReportParam_ListOT')['idUnidad'], 
                session('TRA_ReportParam_ListOT')['idCliente'], 
                session('TRA_ReportParam_ListOT')['FInicio'], 
                session('TRA_ReportParam_ListOT')['FFin'], 
                session('TRA_ReportParam_ListOT')['idEstado'])
                )->DataReportOT();
        
        $Data = $Data->get()->toArray();
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = "Reporte de Ots - ".date("Y-m-d H:i:s");
        
        session()->forget('Data_TRA_Report_ListOT');
        session()->forget('DataPDF');
        
        session(['Data_TRA_Report_ListOT' => $Data  ]);
        session(['DataPDF' =>  $Temp ]);
        
        
        $pdf = PDFx::loadView('process.PDF.TRA_Report_ListadoOTs')->setPaper('Letter', 'landscape');
        $pdf->getDomPDF()->set_option("enable_php", true);
        return $pdf->stream('Reporte Ots '.date("Y-m-d H:i:s").'.pdf');
    }

    //
    public function PDF_PRO_PptoSinProveedor($Hash){
        session()->forget('DataPpto');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataPresupuestosinProveedorPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Presupuesto Cliente '.$IdPpto;
        
        session(['DataPpto' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_PresupuestoClienteSP')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Presupuesto Cliente '.$Data[0]->Id.'.pdf');
    }
    
    public function PDF_PRO_PptoSinProveedorComisionManual($Hash){
        session()->forget('DataPpto');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataPresupuestosinProveedorComisionManualPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Presupuesto Cliente '.$IdPpto;
        
        session(['DataPpto' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_PresupuestoClienteSPManual')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Presupuesto Cliente '.$Data[0]->Id.'.pdf');
    }
    
    public function PDF_PRO_PptoSinProveedorMonedaDif($Hash){
        session()->forget('DataPpto');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataPresupuestosinProveedorPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Presupuesto Cliente '.$IdPpto;
        
        session(['DataPpto' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_PresupuestoClienteSPMD')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Presupuesto Cliente '.$Data[0]->Id.'.pdf');
    }
    
    //
    public function PDF_PRO_PptoConProveedor($Hash){
        session()->forget('DataPpto');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataPresupuestoconProveedorPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Presupuesto Cliente '.$IdPpto;
        
        session(['DataPpto' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_PresupuestoClienteCP')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Presupuesto Cliente '.$Data[0]->Id.'.pdf');
    }
    
    
    public function PDF_PRO_PptoConProveedorInterno($Hash){
        session()->forget('DataPpto');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataPresupuestoconProveedorPDFinterno($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Presupuesto Cliente '.$IdPpto;
        
        session(['DataPpto' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_PresupuestoInternoCP')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Presupuesto Interno '.$Data[0]->Id.'.pdf');
    }
    
    //
    public function PDF_PRO_OrdenProduccion($Hash){
        session()->forget('DataOrden');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataOrdenProduccionPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Orden de Producción '.$IdPpto;
        
        session(['DataOrden' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_OrdenProduccion')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Orden de Producción No. '.$Data[0]->Id.'.pdf');
    }
    
    //
    public function PDF_PRO_OrdenCompra($Hash){
        session()->forget('DataOrden');
        session()->forget('DataPDF');
        
        $IdPpto = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataOrdenCompraPDF($IdPpto);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Orden de Compra '.$IdPpto;
        
        session(['DataOrden' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_OrdenCompra')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Orden de Compra No. '.$Data[0]->Id.'.pdf');
    }
    
    //
    public function PDF_PRO_Anticipo($Hash){
        session()->forget('DataAnticipo');
        session()->forget('DataPDF');
        
        $IdAnticipo = parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataAnticipoPDF($IdAnticipo);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Anticipo # '.$IdAnticipo;
        
        session(['DataAnticipo' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_Anticipo')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Anticipo No. '.$Data[0]->Id.'.pdf');
    }
    
    //
    public function PDF_PRO_Legalizacion($Hash){
        session()->forget('DataAnticipo');
        session()->forget('DataPDF');
        
        $IdAnticipo = $Hash;//parent::CodeDescrypt($Hash);
        $Data = (new PresupuestoController)->DataLegalizacionPDF($IdAnticipo);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Legalización # '.$IdAnticipo;
        
        session(['DataAnticipo' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        $pdf = PDFx::loadView('process.PDF.PRO_Legalizacion')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Legalizacion No. '.$Data[0]->NumLegalizacion.'.pdf');
    }
    
    //
    public function PDF_Inventario($Info){
        session()->forget('DataInventario');
        session()->forget('DataPDF');
        
        
        $Temp = explode("-",$Info);
        $Propietario = ($Temp[0] == 0) ? 0 : parent::CodeDescrypt($Temp[0]);
        $Data = (new InventarioController)->DataInventarioGeneral($Propietario,$Temp[1],$Temp[2]);
        $Temp['FechaImpresion'] = date("Y-m-d H:i:s");
        $Temp['Titulo'] = 'Inventario';
        
        session(['DataInventario' =>  $Data ]);
        session(['DataPDF' =>  $Temp ]);
        
        
        $pdf = PDFx::loadView('process.PDF.Datos_Inventario')->setPaper('Letter');
        $pdf->getDomPDF()->set_option("enable_php", true)->setPaper('a4', 'landscape');
        return $pdf->stream('Inventario General.pdf');
    }
	
}
