<?php
require("conexion.php");
// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("Inmuebles");
$parnode = $dom->appendChild($node);

$consulta_mysql="SELECT * FROM zonas";
$result = $connection->query($consulta_mysql);

if (!$result) {
  die('Invalid query: ' . $connection->connect_error);
}

header("Content-type: text/xml");

while ($row = $result->fetch_assoc()){
    // Add to XML document node
    $node = $dom->createElement("informacion");
    $newnode = $parnode->appendChild($node);
    $newnode->setAttribute("nombre_zona",$row['nombre_zona']);
    $newnode->setAttribute("jefe_zona_departamento",$row['jefe_zona_departamento']);
    $newnode->setAttribute("horario", $row['horario']);
    $newnode->setAttribute("numero_pisos", $row['numero_pisos']);
    $newnode->setAttribute("numero_aulas", $row['numero_aulas']);
    $newnode->setAttribute("numero_cubiculos", $row['numero_cubiculos']);
    $newnode->setAttribute("numero_policias", $row['numero_policias']);
    $newnode->setAttribute("dias_habiles", $row['dias_habiles']);  
    $newnode->setAttribute("ruta_img_1er_piso", $row['ruta_img_1er_piso']);
    $newnode->setAttribute("ruta_img_2do_piso", $row['ruta_img_2do_piso']);
    $newnode->setAttribute("info_extra", $row['info_extra']);
  }
  
  echo $dom->saveXML();
?>