<?php

namespace App\Http\Controllers;


use App\Http\Controllers;
use Illuminate\Http\Request;

Use Illuminate\Database\Seeder;
Use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
Use Illuminate\Database\QueryException;
use FilesystemIterator;
Use Illuminate\Support\Facades\File;
Use Illuminate\Support\Facades\Storage;
Use Illuminate\Support\Facades\Response;
Use Illuminate\Http\UploadedFile;
use Mail;
use Illuminate\Support\Facades\Config;

Use \Mailjet\Resources;

class MailController extends Controller{
    
    public function ___SendEmailMailJet($texto,$email,$nombre,$Asunto){
        $mj = new \Mailjet\Client('97841a93672bcb871d504325f7e6f6e5','8831724a4346531ecd25159192033824',true,['version' => 'v3.1']);

       
        
        $body = [
            'Messages' => [
              [
                'From' => [
                  'Email' => "gerencia@processpluserp.com",
                  'Name' => "Process Plus"
                ],
                'To' => [
                  [
                    'Email' => $email,
                    'Name' => $nombre,
                  ]
                ],
                'Subject' => $Asunto,
                'TextPart' => "",
                'HTMLPart' => $texto,
                'CustomID' => "AppGettingStartedTest"
              ]
            ]
          ];
          $response = $mj->post(Resources::$Email, ['body' => $body]);
          //$response->success();
          echo $response->success();
    }
    
    public function Mail_EnviarDocumentosLegalesEmpresa($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $IdEmpresa = $Info['IdEmpresa']; 
        $Documentos = $Info['Documentos']; 
        $UrlUniversal = $Info['UrlUniversal']; 
        $i = 0;
        try {
            
            Mail::send('mailing.datos.DocumentosLegalesEmpresa',$Info, function($msj) use($Asunto,$for,$Por,$EnviadoPorCorreo,$EnviadoPor,$IdEmpresa,$Documentos,$UrlUniversal){
                $msj->from(env('MAIL_USERNAME'),$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for);
                for($i = 0; $i < count($Documentos);$i++){
                    $Documentos[$i] = (array) $Documentos[$i];
                    $msj->attach("../storage/app/datos/empresas/".$IdEmpresa."/DocumentosLegales/".$Documentos[$i]['Name']);
                }
                
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail EnvioDocumentosLegales: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
        
    }
    
    public function Mail_EnviarInformeEntrevista($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos = $Info['Documentos']; 
        $Correos = [];
        $Names = [];
        
        /*$Correos[0] = $Info['RegistradoPorCorreo']; 
        $Names[0] = $Info['RegistradoPor']; */
        $tt = 0;
        for($i = 0; $i < count($Info['AsistentesAgencia']);$i++){
            $Correos[$tt] = $Info['AsistentesAgencia_mail']['Correo'][$i];
            $Names[$tt] = $Info['AsistentesAgencia_mail']['Nombre'][$i];
            $tt++;
        }
        for($i = 0; $i < count($Info['CopiadosAgencia']);$i++){
            $Correos[$tt] = $Info['CopiadosAgencia_mail']['Correo'][$i];
            $Names[$tt] = $Info['CopiadosAgencia_mail']['Nombre'][$i];
            $tt++;
        }
        for($i = 0; $i < count($Info['AsistentesCliente']);$i++){
            $Correos[$tt] = $Info['AsistentesCliente_mail']['Correo'][$i];
            $Names[$tt] = $Info['AsistentesCliente_mail']['Nombre'][$i];
            $tt++;
        }
        for($i = 0; $i < count($Info['CopiadosGeneral']);$i++){
            $Correos[$tt] = $Info['CopiadosGeneral_mail']['Correo'][$i];
            $Names[$tt] = $Info['CopiadosGeneral_mail']['Nombre'][$i];
            $tt++;
        }
        $i = 0;
        try {
            
            Mail::send('mailing.trafico.TraClienteInformeEntrevista',$Info, function($msj) use($Asunto,$for,$Por,$EnviadoPorCorreo,$EnviadoPor,$Documentos,$Correos,$Names){
                $msj->from($EnviadoPorCorreo,$EnviadoPor);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                //$msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($Correos,$Names);
                
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail EnvioDocumentosLegales: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    public function Mail_Cliente_NotiticarDevolucion($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos = $Info['Documentos']; 
        
        $i = 0;
        try {
            
            Mail::send('mailing.trafico.TraClienteInformeEntrevista',$Info, function($msj) use($Asunto,$for,$Por,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from(env('MAIL_USERNAME'),$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for);
                /*for($i = 0; $i < count($Documentos);$i++){
                    $Documentos[$i] = (array) $Documentos[$i];
                    
                    $msj->attach("../storage/app/datos/empresas/".$IdEmpresa."/DocumentosLegales/".$Documentos[$i]['Name']);
                }*/
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail EnvioDocumentosLegales: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    
    
    public function Mail_EnviarMensajeGeneral($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['UsuariosN'];
        
        $i = 0;
        try {
            
            Mail::send('mailing.transversal.MensajeGeneral',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                //$msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
                //$msj->to("damian.mosquera93@gmail.com");
                
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail EnvioDocumentosLegales: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    
    public function Mail_NotificacionesClienteReq($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['UsuariosN'];
        
        $i = 0;
        try {
            
            Mail::send('mailing.cliente.MensajeGeneral',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                //$msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
                
                
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    
    public function Mail_NotificacionesTA($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['UsuariosN'];
        
        $i = 0;
        try {
            
            Mail::send('mailing.trafico.TA_Status',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                //$msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    
    public function Mail_NotificacionesAprobacionPagos($Info,$for,$Por){
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['UsuariosN'];
        
        $i = 0;
        try {
            
            Mail::send('mailing.pagos.MensajeGeneral',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                //$msj->bcc($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
                
                
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }
    }
    
    
    public function Mail_NotificacionBirthday($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.transversal.BirthdayEmpleado',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
    public function Mail_NotificacionPagosPptoGeneral($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.transversal.VencimientoPagos',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
    public function Mail_NotificacionDocumentosAVencerse($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.transversal.VencimientoDocumentos',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
    public function Mail_NotificacionPendientesAdministrativos($Info,$for,$Por){
        
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = "Process Plus"; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.trafico.TA_NotificacionPendientes',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
    
    public function Mail_NotificacionAprobacionPpto($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.transversal.AprobacionesPpto',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
    public function Mail_NotificacionOrdenes($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.produccion.PRO_Ordenes',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    public function Mail_NotificacionFacturasPendientesPorLlegar($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.produccion.FacturasPendientesPorLlegar',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    public function Mail_NotificacionFacturasProxVencimiento($Info,$for,$Por){
       
        $MailInfo = (new Controller)->DatosCorreo();
        $Asunto = $Info['Asunto'];
        $EnviadoPor = $Info['RegistradoPor']; 
        $EnviadoPorCorreo = $Info['RegistradoPorCorreo']; 
        $Documentos =""; 
        $Para = $Info['Correos'];

        $i = 0;
        try {

            Mail::send('mailing.produccion.FacturasProxVencimiento',$Info, function($msj) use($Asunto,$for,$Por,$Para,$EnviadoPorCorreo,$EnviadoPor,$Documentos){
                $msj->from($EnviadoPorCorreo,$Por);
                $msj->replyTo($EnviadoPorCorreo,$EnviadoPor);
                $msj->subject($Asunto);
                $msj->to($for,$Para);
            }); 
            return "Mensaje Enviado";
        } catch (\PDOException $exception) {
            error_log('Error Envío Mail Cliente: ' . $exception->getMessage());
            //throw new \PDOException('Error - EnvioDocumentosLegales: ' . $exception->getMessage());
            return $exception->getMessage();
        }        
    }
    
}
