<?php
 
 
$user = 'root';
$password = 'oracle_4U'; //To be completed if you have set a password to root
$database = 'process'; //To be completed to connect to a database. The database must exist.
$port = NULL; //Default must be NULL to use default port
$mysqli = new mysqli('127.0.0.1', $user, $password, $database, $port);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}
/*echo '<p>Connection OK '. $mysqli->host_info.'</p>';
echo '<p>Server '.$mysqli->server_info.'</p>';
echo '<p>Initial charset: '.$mysqli->character_set_name().'</p>';
*/

$sql = "select * from process.ges_proveedor_documentos_legales WHERE ParTipoDocLegalId = 6 limit 5 ";
$result = $mysqli->query($sql);

if( $result->num_rows > 0 ){
	while($row = $result->fetch_assoc()){
		$url = 'http://process.grupotesta.com.co/Gestion/ProveedorDocumentoLegal/DownloadFile?id='.$row['Id'];
 
		// Use basename() function to return the base name of file
		$file_name = basename($url);
		  
		// Use file_get_contents() function to get the file
		// from url and use file_put_contents() function to
		// save the file by using base name
		if(file_put_contents( $row['NombreDocumento'],file_get_contents($url))) {
			echo "File downloaded successfully";
		}
		else {
			echo "File downloading failed.";
		}
	}
}
$mysqli->close();
/*

$url = 'http://process.grupotesta.com.co/Gestion/ProveedorDocumentoLegal/DownloadFile?id=1001';
 
// Use basename() function to return the base name of file
$file_name = basename($url);
  
// Use file_get_contents() function to get the file
// from url and use file_put_contents() function to
// save the file by using base name
if(file_put_contents( "asdasd",file_get_contents($url))) {
    echo "File downloaded successfully";
}
else {
    echo "File downloading failed.";
}
*/
?>