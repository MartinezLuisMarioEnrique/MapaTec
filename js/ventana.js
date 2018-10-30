function mostrar() {
    document.getElementById("sidebar").style.width = "500px";
    document.getElementById("contenido").style.marginLeft = "500px";
}

function ocultar() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("contenido").style.marginLeft = "0px";
}

function mostrarEmbebed() {
    document.getElementById("mapsEmbebed").style.width = "500px";
    document.getElementById("contenido").style.marginLeft = "500px";
}

function ocultarEmbebed() {
    document.getElementById("mapsEmbebed").style.width = "0";
    document.getElementById("contenido").style.marginLeft = "0px";
}