<?php
$username = "root";
$password= "darkus";
$database= "bdescuela2";

$connection=mysqli_connect ('localhost', $username, $password, $database);
if (!$connection) {  die('Not connected : ' . mysql_error());}

?>