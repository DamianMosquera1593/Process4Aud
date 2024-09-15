<?php

namespace App\Exports\datos;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class InventarioGeneral implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithProperties, WithEvents, WithDrawings
{
    use Exportable;

    private $i = 1;
    private $File = "";

    public function __construct($Propietario,$Estado,$Valor)
    {
        $this->Propietario = $Propietario;
        $this->Estado = $Estado;
        $this->Valor = $Valor;
    }

    public function DataReportInventario(){
        $proyectos = DB::table('inventario_oficina', 'i')
        ->join('usuario AS u', 'i.IdUsuario', '=', 'u.idusuario')
        ->join('par_propietario_inventario_oficina AS c', 'i.IdPropietario', '=', 'c.Id')
        
        ->select('i.id', 'i.Nombre', 'i.Descripcion',
            'i.Ubicacion', 'i.Cantidad',
            'i.Foto', 'i.CostoUnitario',
             'i.CodigoReferencia',
            'u.nombreusuario', 'c.Nombre as Propietario',
            DB::raw('(i.Cantidad * i.CostoUnitario) as Total'),
            DB::raw('date_format(i.fecha,"%Y-%m-%d") as fechahora')
                )
        //->orderBy('p.Fecha');
        ;

        return $proyectos;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->DataReportInventario()->get();
    }
    
    public function drawings()
    {
        $drawing = new Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('images/additem.png'));
        $drawing->setHeight(50);
        $drawing->setCoordinates('B'.$this->i);

        return [$drawing];
    }
    
    public function map($proyectos): array
    {
        $drawing = new Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('images/additem.png'));
        $drawing->setHeight(50);
        $drawing->setCoordinates('B'.$this->i);
        return [
            $this->i++,
            $proyectos->Nombre,
            $proyectos->Descripcion,
            $proyectos->Ubicacion,
            $proyectos->Propietario,
            $proyectos->Cantidad,
            $proyectos->CostoUnitario,
            $proyectos->Total
        ];
    }

    public function headings(): array
    {
        return [
            '#',
            'Item',
            'Descripción',
            'Ubicación',
            'Propietario',
            'Cantidad',
            'Costo Unitario',
            'Costo Total'
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => 'Process Plus SA',
            'title' => 'Reporte Inventario General'
        ];
    }

    public function styles(Worksheet $sheet)
    {
        //$sheet->getStyle('B')->setHeight(50);
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->getDelegate()->getPageSetup()
                ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE)
                //->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A2);
                        ;
            },
            AfterSheet::class    => function(AfterSheet $event) {
   
                //$event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(40);
                //$event->sheet->getDelegate()->getColumnDimension('A')->setWidth(50);
     
            },        
        ];
    }
    
    
}
