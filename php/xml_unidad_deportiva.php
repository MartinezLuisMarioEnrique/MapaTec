<?php
require("conexion.php");
// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("Inmuebles");
$parnode = $dom->appendChild($node);

$consulta_mysql="SELECT * FROM coordenadas_deportivo";
$result = $connection->query($consulta_mysql);

if (!$result) {
  die('Invalid query: ' . $connection->connect_error);
}

header("Content-type: text/xml");

while ($row = $result->fetch_assoc()){
    // Add to XML document node
    $node = $dom->createElement("UnidadDeportiva");
    $newnode = $parnode->appendChild($node);
    $newnode->setAttribute("nombre_zona",$row['nombre_zona']);
    $newnode->setAttribute("esquina1_latitud",$row['esquina1_latitud']);
    $newnode->setAttribute("esquina1_longitud", $row['esquina1_longitud']);
    $newnode->setAttribute("esquina2_latitud", $row['esquina2_latitud']);
    $newnode->setAttribute("esquina2_longitud", $row['esquina2_longitud']);
    $newnode->setAttribute("esquina3_latitud", $row['esquina3_latitud']);
    $newnode->setAttribute("esquina3_longitud", $row['esquina3_longitud']);
    $newnode->setAttribute("esquina4_latitud", $row['esquina4_latitud']);  
    $newnode->setAttribute("esquina4_longitud", $row['esquina4_longitud']);
    $newnode->setAttribute("punto_central_latitud", $row['punto_central_latitud']);
    $newnode->setAttribute("punto_central_longitud", $row['punto_central_longitud']);
    $newnode->setAttribute("ruta_imagen", $row['ruta_imagen']);
    $newnode->setAttribute("ruta_imagen360", $row['ruta_imagen360']);
  }
  
  echo $dom->saveXML();
?>