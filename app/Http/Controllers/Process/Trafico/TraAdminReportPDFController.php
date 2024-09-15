<?php

namespace App\Http\Controllers\Process\Trafico;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TraAdminReportPDFController extends Controller
{

    //50dd18656800255e4cf3d6e1c70e7704
    public function getPDFReport($idChannel)
    {

        $idChannel = parent::CodeDescrypt(intval($idChannel));

        if (intval($idChannel) == 0) {
            return;
        } else {
            Carbon::setLocale(config('app.locale'));
            setlocale(LC_ALL, "es_ES", 'es', 'ES');

            $nameChannel = $this->getChannel($idChannel);
            $date = Carbon::now();
            $Temp = explode("-",date("Y-m-d"));
            $date = parent::NombreDia(date("Y-m-d")).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            
            $Temp = explode("-",explode(' ',date("Y-m-d H:i:s"))[0]);
            $FechaImp = parent::NombreDia(date("Y-m-d")).", ".$Temp[2]." de ".parent::NombreMeses($Temp[1])." de ".$Temp[0];
            $groups = $this->getGroups($idChannel);
            $actividadesByGroup = [];
            $SubGroupByGroup = [];
            foreach ($groups as $group) {
                $Subgrupos = DB::SELECT("select DISTINCT Id, Hash,Nombre, Descripcion from (SELECT  "
                        . "s.Id as Hash,Id, s.Nombre, case when isnull(s.Descripcion) then '' else Descripcion end as Descripcion "
                        . "FROM Subgrupo s "
                        . "INNER JOIN actividades aa on s.Id = aa.IdSubGrupo and aa.IdCanal = ".$idChannel." and aa.Id_Grupo = ".$group->Id_Grupo." "
                        . "WHERE s.Estado = 1 "
                        . "ORDER BY s.Orden ASC) as sub ");
                foreach($Subgrupos as $sg){
                    $actividades = $this->getActivities($group->Id_Grupo,$sg->Id);
                    $sg->Actividades = $actividades;
                    $sg->NumA = count($actividades);
                }
                
                //array_push($actividadesByGroup, $actividades);
                //array_push($SubGroupByGroup, $actividades);
                $group->Subgrupos = $Subgrupos;
            }
            $image = base64_encode(file_get_contents(public_path('images/process.png')));
            $Usuario = DB::table('usuario')->select('NombreUsuario')->where('Token', session('keyUser'))->first();

            $pdf = APP::make('dompdf.wrapper');
            $pdf->setOptions(['defaultFont' => 'Arial', "isPhpEnabled" => true, 'isRemoteEnabled' => false]);
            $pdf
                ->loadView('process.trafico.tra_adm_reportPDF', compact('groups', 'image', 'date', 'nameChannel','FechaImp', 'Usuario'))
                ->setPaper('letter','landscape');
            return $pdf->stream('report.pdf');
        }
    }

    private function getGroups($idChannel)
    {
        try {
            // $groups = DB::table('grupos')->where('id_canal_principal', $idChannel)->get();
            
            $groups = DB::table('grupos')->select(['Id_Grupo','Nombre'])->where('Id_CP', $idChannel)->orderBy('Orden', 'asc')->get();
            return $groups;
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json($ex, 500);
        } catch (\Exception $e) {
            return response()->json($e, 200);
        }
    }

    private function getActivities($idGroup,$idSubg)
    {
        try {
            $Usuario = DB::table('usuario')->select('IdUsuario')->where('Token', session('keyUser'))->first();

            $actividades = DB::select('select *,DATEDIFF(now(), FechaEntrega) as Dif '
                    . 'from actividades where Id_Estado = 1 AND Id_Grupo = ? and IdSubgrupo = ? and not ISNULL(Tarea) order by consecutivo ', [$idGroup, $idSubg]);
            foreach ($actividades as $actividad) {
                $lastStatus = $this->getLastStatusByActivity($actividad->Id_Actividad);
                $actividad->Status = $lastStatus;
                $query = "SELECT "
                                . "Id, Nombre, Email "
                                . "FROM ( SELECT "
                                . "Id_Responsable as Id, Nombre, Email "
                                . "FROM Responsables "
                                . "WHERE IdActividad = ".$actividad->Id_Actividad." AND IdUsuario = 0 "
                                . "UNION ALL "
                                . "SELECT "
                                . "r.Id_Responsable, u.NombreUsuario as Nombre, u.Correo as Email "
                                . "FROM Responsables r "
                                . "INNER JOIN Usuario u on r.IdUsuario = u.IdUsuario "
                                . "WHERE r.IdActividad = ".$actividad->Id_Actividad." AND ISNULL(Nombre)) as Resp "
                                . "Order by Nombre ASC ";
                $responsables = DB::select($query);
                //$responsables = $this->getAssignedByActivity($actividad->Id_Actividad, 'R');
                $actividad->responsables = $responsables;
                $encargados = $responsables;//$this->getAssignedByActivity($actividad->Id_Actividad, 'E');
                $actividad->encargados = $encargados;
                $fechaSolicitud = $actividad->FechaHora;
                $fechaEntrega = $actividad->FechaEntrega;
                
                $Temp = explode("-",explode(' ',$fechaSolicitud)[0]);
                $actividad->fecha_solicitud = parent::NombreDia($fechaSolicitud).",";//.$Temp[2]." de ".parent::NombreMeses($Temp[1]);//." de ".$Temp[0];
                $actividad->fecha_solicitud2 = $Temp[2]." de ".parent::NombreMeses($Temp[1]);//." de ".$Temp[0];
                //$actividad->fecha_solicitud = explode(' ', $fechaSolicitud)[0];
                $actividad->hora_solicitud = explode(' ', $fechaSolicitud)[1];
                //$actividad->fecha_entrega = explode(' ', $fechaEntrega)[0];
                if(  !empty($fechaEntrega) ){
                    $Temp = explode("-",explode(' ',$fechaEntrega)[0]);
                    $actividad->fecha_entrega = parent::NombreDia($fechaEntrega).", ";//.$Temp[2]." de ".parent::NombreMeses($Temp[1]);//." de ".$Temp[0];
                    $actividad->fecha_entrega2 = $Temp[2]." de ".parent::NombreMeses($Temp[1]);//." de ".$Temp[0];
                    $actividad->hora_entrega = explode(' ', $fechaEntrega)[1];
                }else{
                    $actividad->fecha_entrega2 = "";
                    $actividad->hora_entrega =  "";
                    $actividad->fecha_entrega =  "";
                }
                
                
                
            }
            return $actividades;
        } catch (\Exception $th) {
            return response()->json($th, 500);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json($ex, 500);
        }
    }

    private function getLastStatusByActivity($idActivity)
    {
        try {
            $status = DB::select('select distinct s.Status, vs.FechaHora
            from versionamiento_status AS vs
            join actividades on vs.Id_Actividad = ?
            join status AS s on vs.Id_Status = s.Id_Status
            order by vs.FechaHora desc
            limit 1', [$idActivity]);
            return $status[0]->Status;
        } catch (\Exception $th) {
            return response()->json($th, 500);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json($ex, 500);
        }
    }

    private function getAssignedByActivity($idActivity, $tipo='')
    {
        try {
            $query = 'select distinct r.Nombre, r.Email
            from responsables as r 
            where r.IdActividad = ? ';
            $assigned = DB::select($query, [$idActivity]);
            $names = [];
            if (count($assigned) == 0) {
                array_push($names, "Sin responsables generados");
            } else {
                foreach ($assigned as $a) {
                    array_push($names, $a->Nombre);
                }
            }
            return $names;
        } catch (\Exception $th) {
            return response()->json($th, 500);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json($ex, 500);
        }
    }

    private function getChannel($id)
    {
        try {
            $cp = DB::table('canales_principales')
                    ->where('Id_CP',$id)
                    ->first();
            // dd(empty($cp));
            if (empty($cp)) {
                return 'desconocido';
            } else{
                return $cp->Nombre;
            }
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json($ex, 500);
        }
    }

}
