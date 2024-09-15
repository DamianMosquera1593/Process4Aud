<?php

namespace App\Exports\trafico;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ClientesTarea implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithEvents
{
    use Exportable;

    public function __construct($idEmpresa, $idUnidad, $idCliente, $FInicio,$FFin, $idEstado) {
        $this->idEmpresa = $idEmpresa;
        $this->idUnidad = $idUnidad;
        $this->idCliente = $idCliente;
        $this->FFin = $FFin;
        $this->FInicio = $FInicio;
        $this->idEstado = $idEstado;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $sqlAdicional = "where 1 = 1 ";
        if (!is_null($this->idEmpresa)) {
            $sqlAdicional .= " AND p.IdEmpresa  = ".$this->idEmpresa;
        }
        if (!is_null($this->idUnidad)) {
            $sqlAdicional .= " AND p.IdUnidad  = ".$this->idUnidad;
        }
        if (!is_null($this->idCliente)) {
            $sqlAdicional .= " AND p.IdCliente  = ".$this->idCliente;
        }
        
        if (!is_null($this->idEstado)) {
            $sqlAdicional .= " AND p.IdEstado  = ".$this->idEstado;
        }
        if (!is_null($this->FFin) && !is_null($this->FInicio) ) {
            $sqlAdicional .= " AND (FechaHoraCreacion BETWEEN  '".$this->FInicio." 00:00:00' AND '".$this->FFin." 23:59:59' )";
        }

        $sql = "select "
                ." p.Id as IdProyecto, p.Codigo, p.Referencia, e.NombreComercial AS Empresa, un.Nombre AS Unidad, c.NombreComercial AS Cliente,  ejc.NombreUsuario AS Ejecutivo, dir.NombreUsuario AS Director, "
                . "pep.Estado as Estadoproyecto,"
                . "a.Id, a.Asunto, a.Descripcion, DATE(a.FechaHoraCreacion) AS FechaCreacion, "
        ."TIME(a.FechaHoraCreacion) AS HoraCreacion, "
        ."DATE(a.FechaEntrega) AS FechaEntrega, "
        ."TIME(a.FechaEntrega) AS HoraEntrega, "
        ."DATE(a.FechaHoraRespuesta) AS FechaRespuesta, "
        ."TIME(a.FechaHoraRespuesta) AS HoraRespuesta, "
        ."pdt.Nombre AS Departamento, xx.NombreUsuario AS Creador, "
        ."ptt.Nombre AS TipoTarea, se.Nombre AS Estado, p.Id AS Proyecto, p.Codigo AS CodigoProyecto, "
        ."a.Numeracion, "
        ."a.IdTareaPadre, a.NroEntregables, "
        ."(CASE WHEN a.IdTareaPadre IS NULL THEN (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.Tareas_Id = a.Id) ELSE (SELECT COUNT(*) FROM adjuntostareas AS adt WHERE adt.IdSubtarea = a.Id) END) AS Adjuntos"
        ." FROM ( "
        ."SELECT t.Id, t.Asunto, t.Descripcion, t.FechaEntrega, t.NroEntregables, t.IdProyecto, t.IdEstado, t.IdTipoTarea, t.IdUsuario, "
                . "t.IdDepartamento, t.FechaHoraCreacion, t.FechaHoraRespuesta, t.IdUsuarioRespuesta, CONVERT(t.Numeracion, CHAR) AS Numeracion, "
                . "NULL AS IdTareaPadre "
                . "FROM tareas t "
                . "INNER JOIN Proyectos p on t.IdProyecto = p.Id ".$sqlAdicional." "
            ."UNION ALL "
            ."SELECT s.Id, s.Asunto, s.Descripcion, s.FechaEntrega, s.NroEntregables, s.IdProyecto, s.IdEstado, s.IdTipoTarea, s.IdUsuario, s.IdDepartamento, "
                . "s.FechaHoraCreacion, s.FechaHoraRespuesta, s.IdUsuarioRespuesta, CONVERT(s.Numeracion, CHAR)AS Numeracion, s.IdTareaPadre "
                . "FROM subtareas s "
                . "INNER JOIN Proyectos p on s.IdProyecto = p.Id ".$sqlAdicional." ) AS a "
        ."JOIN proyectos AS p ON a.IdProyecto = p.Id "
        ."JOIN scrum_estados AS se ON a.IdEstado = se.Id "
        ."JOIN partipotarea AS ptt ON a.IdTipoTarea = ptt.Id "
        ."JOIN usuario AS xx ON a.IdUsuario = xx.IdUsuario "
        ."JOIN par_departamento_trafico AS pdt ON a.IdDepartamento = pdt.Id "
        ."JOIN empresa AS e ON p.IdEmpresa = e.IdEmpresa "
        ."JOIN unidad_negocio AS un ON p.IdUnidad = un.IdUnidad "
        ."JOIN cliente AS c ON p.IdCliente = c.IdCliente "
        ."JOIN usuario AS ejc ON p.IdEjecutivo = ejc.IdUsuario "
        ."JOIN usuario AS dir ON p.IdDirector = dir.IdUsuario "
        ."JOIN par_estado_proyecto AS pep ON p.IdEstado = pep.Id "
        
        .$sqlAdicional
        ." order by Numeracion";

        $tareas = DB::select($sql);

        foreach ($tareas as $tarea) {
            $tarea->responsables = '';
            $responsables = DB::table('EquipoTarea AS et')
                ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
                ->select('u.NombreUsuario')
                ->where('Tipo','RESP')
                ->where((is_null($tarea->IdTareaPadre) ? 'Tareas_Id': 'IdSubtarea'), $tarea->Id)
                ->get();
            foreach ($responsables as $responsable) {
                $tarea->responsables .= $responsable->NombreUsuario.', ';
            }
            $tarea->asignados = '';
            $asignados = DB::table('EquipoTarea AS et')
            ->join('usuario AS u', 'et.IdUsuario', '=', 'u.IdUsuario')
            ->select('u.NombreUsuario')
            ->where('Tipo','ASIG')
            ->where((is_null($tarea->IdTareaPadre) ? 'Tareas_Id': 'IdSubtarea'), $tarea->Id)
            ->get();
            foreach ($asignados as $asignado) {
                $tarea->asignados .= $asignado->NombreUsuario.', ';
            }
        }
        return collect($tareas);
    }

    public function map($tareas): array
    {
        return [
            $tareas->Codigo,
            $tareas->Referencia,
            $tareas->Descripcion,
            $tareas->Empresa,
            $tareas->Unidad,
            $tareas->Cliente,
            $tareas->Director,
            $tareas->Ejecutivo,
            $tareas->FechaCreacion,
            $tareas->HoraCreacion,
            $tareas->Estadoproyecto,
            $tareas->Numeracion,
            $tareas->CodigoProyecto,
            $tareas->Asunto,
            $tareas->Descripcion,
            $tareas->Departamento,
            $tareas->responsables,
            $tareas->asignados,
            $tareas->TipoTarea,
            $tareas->Adjuntos,
            $tareas->NroEntregables,
            $tareas->Creador,
            $tareas->FechaCreacion,
            $tareas->HoraCreacion,
            $tareas->FechaEntrega,
            $tareas->HoraEntrega,
            $tareas->FechaRespuesta,
            $tareas->HoraRespuesta,
            $tareas->Estado
        ];
    }

    public function headings(): array
    {
        return [
            'Codigo OT',
            'Referencia',
            'Descripcion',
            'Empresa',
            'Unidad de Negocio',
            'Cliente',
            
            'Director',
            'Ejecutivo',
            'Fecha de Creacion',
            'Hora de Creacion',
            'Estado',
            '# Tarea',
            'Codigo Proyecto OT',
            'Asunto',
            'Descripcion',
            'Departamento',
            'Responsables',
            'Asignados',
            'Tipo de Tarea',
            'No de Adjuntos',
            'No de Entregables',
            'Creador',
            'Fecha de Creacion',
            'Hora de Creacion',
            'Fecha de Entrega',
            'Hora de Entrega',
            'Fecha de Respuesta',
            'Hora de Respuesta',
            'Estado'
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
                //->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A0)
                        ;
            }
        ];
    }
}
