<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LoginController
 *
 * @author Damian Mosquera
 */
namespace App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

Use Illuminate\Database\Seeder;
Use Illuminate\Support\Facades\DB;
Use \Mailjet\Resources;
  

class LoginController extends Controller{
    //put your code here
    
    public function PruebaMailJet(){
        $mj = new \Mailjet\Client('97841a93672bcb871d504325f7e6f6e5','94a3e9c8360cd248bd9fdf2a3b53d777',true,['version' => 'v3.1']);
        $db = DB::SELECT("SELECT Correo FROM base_correos WHERE TIPO = 'GENERAL'");
        
        $body = [
        'Messages' => [
          [
            'From' => [
              'Email' => "comercial@pianoproducciones.com",
              'Name' => "Comercial Piano"
            ],
            'To' => [
              [
                'Email' => "asilva@pianoproducciones.com",
                'Name' => ""
              ]
            ],
            'Subject' => "Verónica Orozco - Al Ritmo de la Noche",
            'TextPart' => "",
            'HTMLPart' => "<div style = 'padding:20px;background-color:black;'><center><img src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/VO_LAYAOUT.png' /><br>"
              . "<table width = '100%'><tr>"
              . "<td >"
              . "<center><a target = '_blank' href = 'http://pianoproducciones.com:8989/VO/public/VideoPromo/PromoVO.mp4'>"
              . "<img height = '50px' src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/VERVIDEO.png' /></a></center></td>"
              . "<td><center>"
              . "<a target = '_blank' href = 'http://pianoproducciones.com:8989/VO/public/VeronicaOrozco'>"
              . "<img height = '50px' src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/FORMULARIO.png' /></a></center></td>"
              . "</tr></table></center></div>",
            'CustomID' => "AppGettingStartedTest"
          ]
        ]
      ];
      $response = $mj->post(Resources::$Email, ['body' => $body]);
      $response->success() && var_dump($response->getData());
        /*foreach($db as $d){
            echo $d->Correo."<br>";
            $body = [
            'Messages' => [
              [
                'From' => [
                  'Email' => "comercial@pianoproducciones.com",
                  'Name' => "Comercial Piano"
                ],
                'To' => [
                  [
                    'Email' => $d->Correo,
                    'Name' => ""
                  ]
                ],
                'Subject' => "Verónica Orozco - Al Ritmo de la Noche",
                'TextPart' => "",
                'HTMLPart' => "<div style = 'padding:20px;background-color:black;'><center><img src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/VO_LAYAOUT.png' /><br>"
                  . "<table width = '100%'><tr>"
                  . "<td >"
                  . "<center><a target = '_blank' href = 'http://pianoproducciones.com:8989/VO/public/VideoPromo/PromoVO.mp4'>"
                  . "<img height = '50px' src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/VERVIDEO.png' /></a></center></td>"
                  . "<td><center>"
                  . "<a target = '_blank' href = 'http://pianoproducciones.com:8989/VO/public/VeronicaOrozco'>"
                  . "<img height = '50px' src = 'http://process.grupotesta.com.co:8989/PProcess3/public/images/FORMULARIO.png' /></a></center></td>"
                  . "</tr></table></center></div>",
                'CustomID' => "AppGettingStartedTest"
              ]
            ]
          ];
          $response = $mj->post(Resources::$Email, ['body' => $body]);
          $response->success() && var_dump($response->getData());
        }*/
        
    }
    public function login(){
        $Credentials = $this->validate(request(),[
           'User' => 'required|string',
           'inputPassword' => 'required|string'
        ]);

        $UserValidate = DB::SELECT("SELECT IdUsuario,Usuario,clave,Token,NombreUsuario,ImgUsuario, Cargo from Usuario where Usuario = '". addslashes($Credentials['User'])."'"
                . " and Clave = '".hash('sha256', ($Credentials['inputPassword']))."' AND Estado = 1 "
                . "  AND Estado = 1;"
                );
        if( count($UserValidate) != 0 ){

            session()->flush();
            $Config = DB::SELECT("SELECT valor FROM Config WHERE nombre = 'TIME_SESSION'");
            $Date = date("Y-m-d H:i:s");
            $Date1 = strtotime('+'.$Config[0]->valor.' second',strtotime($Date));
            $Date1 = date("Y-m-d H:i:s",$Date1);
            session(['keyUser' => $UserValidate[0]->Token]);
            session(['JobUserKey' => $UserValidate[0]->IdUsuario]);
            session(['NameUser' => $UserValidate[0]->NombreUsuario]);
            session(['JobUser' => $UserValidate[0]->Cargo]);
            session(['Time' => $Date1]);
            session(['Img' => $UserValidate[0]->ImgUsuario]);
            if( !empty($UserValidate[0]->ImgUsuario)){
                //session(['ImgUsuario' => 'storage/app/Usuarios/'.$UserValidate[0]->ImgUsuario]);
            }else{
                //session(['ImgUsuario' => 'images/foto.png']);
            }
            

            $Permisos = DB::SELECT("SELECT p.Nombre, p.Descripcion, p.Pantalla "
                    . "FROM Usuario u "
                    . "INNER JOIN Par_Perfi_Permiso pp on u.IdPerfil = pp.IdPerfil "
                    . "INNER JOIN Par_Permiso p on pp.IdPermiso = p.Id "
                    . "WHERE u.IdUsuario = ".$UserValidate[0]->IdUsuario);

            foreach ($Permisos as $Permiso)
            {
                session([$Permiso->Nombre => $UserValidate[0]->Token]);
            }
            $idUE = DB::table('Ingresos')
            ->insertGetId([
                'IdUsuario'=> $UserValidate[0]->IdUsuario,
                'Fecha'=>date('Y-m-d H:i:s'),
            ]);
            if( $UserValidate[0]->IdUsuario == 2 ){
                return redirect()->route('68d494a0120d4445b3ece16814a0aed1');
            }else{
                return redirect()->route('bienvenida');
            }
            
        }
        return back()->withErrors(['User'=>'Los datos ingresados no coinciden con el sistema']);
        //echo Hash::make("Da1019078426###");
    }

    public function LoginPlataforma(){
        return view('auth.login');
    }

    public function CerrarSesion(){
        session()->forget('Time');
        session()->flush();
        return redirect()->route('IniciarSesion');
    }
}
