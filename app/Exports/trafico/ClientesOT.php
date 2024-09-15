<?php

namespace App\Exports\trafico;

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

class ClientesOT implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithProperties, WithEvents
{
    use Exportable;

    private $i = 1;

    public function __construct($idEmpresa, $idUnidad, $idCliente, $FInicio,$FFin, $idEstado)
    {
        $this->idEmpresa = $idEmpresa;
        $this->idUnidad = $idUnidad;
        $this->idCliente = $idCliente;
        $this->FFin = $FFin;
        $this->FInicio = $FInicio;
        $this->idEstado = $idEstado;
    }

    public function DataReportOT(){
        $proyectos = DB::table('proyectos', 'p')
        ->join('empresa AS e', 'p.IdEmpresa', '=', 'e.IdEmpresa')
        ->join('unidad_negocio AS un', 'p.IdUnidad', '=', 'un.IdUnidad')
        ->join('cliente AS c', 'p.IdCliente', '=', 'c.IdCliente')
        ->join('productocliente AS pc', 'p.IdProducto', '=', 'pc.Id')
        ->leftJoin('subproducto_cliente AS spc', 'p.IdSubproducto', '=', 'spc.Id')
        ->join('usuario AS ejc', 'p.IdEjecutivo', '=', 'ejc.IdUsuario')
        ->join('usuario AS dir', 'p.IdDirector', '=', 'dir.IdUsuario')
        ->leftJoin('profesionales_cliente AS fc', 'p.IdProfesional', '=', 'fc.IdProfesionalesCliente')
        ->join('par_estado_proyecto AS pep', 'p.IdEstado', '=', 'pep.Id')
        ->select('p.Id', 'p.Codigo', 'p.Referencia',
            'e.NombreComercial AS Empresa', 'un.Nombre AS Unidad',
            'c.NombreComercial AS Cliente', 'pc.Nombre AS Producto',
            'spc.Nombre AS Subproducto', 'ejc.NombreUsuario AS Ejecutivo',
            'dir.NombreUsuario AS Director', 'fc.Nombre AS Profesional',
            'pep.Estado', 'p.Descripcion',
            DB::raw('DATE(p.Fecha) AS FechaCreacion'), DB::raw("TIME_FORMAT(p.Fecha, '%H:%i') AS HoraCreacion"))
        ->orderBy('p.Fecha');

        if (!is_null($this->idEmpresa)) {
            $proyectos->where('p.IdEmpresa', $this->idEmpresa);
        }
        if (!is_null($this->idUnidad)) {
            $proyectos->where('p.IdUnidad', $this->idUnidad);
        }
        if (!is_null($this->idCliente)) {
            $proyectos->where('p.IdCliente', $this->idCliente);
        }
        
        if (!is_null($this->idEstado)) {
            $proyectos->where('p.IdEstado', $this->idEstado);
        }
        if (!is_null($this->FFin) && !is_null($this->FInicio) ) {
            $proyectos->whereBetween("p.Fecha", [$this->FInicio." 00:00:00",$this->FFin." 23:59:59"]);
        }
        return $proyectos;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->DataReportOT()->get();
    }

    public function map($proyectos): array
    {
        return [
            $this->i++,
            $proyectos->Codigo,
            $proyectos->Referencia,
            $proyectos->Descripcion,
            $proyectos->Empresa,
            $proyectos->Unidad,
            $proyectos->Cliente,
            $proyectos->Producto,
            $proyectos->Subproducto,
            $proyectos->Profesional,
            $proyectos->Director,
            $proyectos->Ejecutivo,
            $proyectos->FechaCreacion,
            $proyectos->HoraCreacion,
            $proyectos->Estado
        ];
    }

    public function headings(): array
    {
        return [
            '#',
            'Codigo OT',
            'Referencia',
            'Descripcion',
            'Empresa',
            'Unidad de Negocio',
            'Cliente',
            'Producto',
            'Sub-Producto',
            'Profesional',
            'Director',
            'Ejecutivo',
            'Fecha de Creacion',
            'Hora de Creacion',
            'Estado'
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => 'Process Plus SA',
            'title' => 'Reporte Lista de Proyectos OT'
        ];
    }

    public function styles(Worksheet $sheet)
    {
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
            }
        ];
    }
    
    
}
