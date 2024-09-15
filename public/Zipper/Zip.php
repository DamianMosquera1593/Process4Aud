<?php
$Conexion = new mysqli("127.0.0.1:3306","Process","Process2021**", "Process_v3");

$Tipo = $_GET['Tipo'];
$Hash = $_GET['Hash'];
$Data = "";
if( $Tipo == 'T' ){
    $Data = ("select Archivo,Ruta from adjuntostareas where Tareas_Id = $Hash");
}else if( $Tipo == 'S' ){
    $Data = ("select Archivo,Ruta from adjuntostareas where IdSubtarea = $Hash");
}

if( $resultado = $Conexion->query($Data)  ){
    $Ruta = '';
    $Files = [];
    $t = 0;
    while($row = $resultado->fetch_row()){
        $Ruta = $row[1];
        $Files[$t] = $row[0];
        $t++;
    }
    $zip = new ZipArchive();
    $dir = '../../storage/app/Trafico/Tareas/'.$Ruta.'/';

    $rutaFinal = "../../storage/app/Trafico/Tareas/".$Ruta."/Zip";
    if(!file_exists($rutaFinal)){
        mkdir($rutaFinal, 0777, true);
    }
    
    $archivoZip = "$Hash.zip";

    if ($zip->open($archivoZip, ZIPARCHIVE::CREATE) === true) {
        for($i = 0; $i < count($Files);$i++){
            $zip->addFile($dir.$Files[$i], $Files[$i]);
            
        }
        //$resultado->close();
        $zip->close();

      rename($archivoZip, "$rutaFinal/$archivoZip");
      
      header("Location: $rutaFinal/$archivoZip");

    }
}else{
    echo "No se encontraron Adjuntos para comprimir.";
}


?>