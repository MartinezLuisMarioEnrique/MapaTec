function initMap() {
    var _url = "http://localhost:8083/mapaTec/php/xml.php";
    // Creamos el mapa
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: new google.maps.LatLng(17.077906, -96.744121), // Centramos el mapa al area
        mapTypeId: 'satellite'
    });

    downloadUrl(_url, function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('Edificio');

        Array.prototype.forEach.call(markers, function (markerElem) {
            var nombre_edificio = markerElem.getAttribute('nombre_edificio');
            var coords = [{
                    lat: parseFloat(markerElem.getAttribute('esquina1_latitud')),
                    lng: parseFloat(markerElem.getAttribute('esquina1_longitud'))
                },
                {
                    lat: parseFloat(markerElem.getAttribute('esquina2_latitud')),
                    lng: parseFloat(markerElem.getAttribute('esquina2_longitud'))
                },
                {
                    lat: parseFloat(markerElem.getAttribute('esquina3_latitud')),
                    lng: parseFloat(markerElem.getAttribute('esquina3_longitud'))
                },
                {
                    lat: parseFloat(markerElem.getAttribute('esquina4_latitud')),
                    lng: parseFloat(markerElem.getAttribute('esquina4_longitud'))
                }
            ];

            // Extraemos las coordenadas  
            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('punto_central_latitud')),
                parseFloat(markerElem.getAttribute('punto_central_longitud')));
            var ruta_imagen = markerElem.getAttribute('ruta_imagen');
            // Creamos el poligono
            var area = new google.maps.Polygon({
                paths: coords,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });

            var marker = new google.maps.Marker({
                map: map,
                position: point
            });

            var infowindow = new google.maps.InfoWindow({
                content: "<div style='float:left'><img width = 100px height = 80px src='" + ruta_imagen + "'></div><div style='float:right; padding: 8px;'><b>" + nombre_edificio + "</b></div>"
            });

            marker.addListener('mouseover', function () {
                infowindow.open(map, marker);
            });

            marker.addListener('mouseout', function () {
                infowindow.close();
            });

            infowindowXML.agregar_informacion(nombre_edificio, area, map, marker);

            // Agregamos el area al mapa
            area.setMap(map);

        });
    });

    unidad_deportiva.marcar_zona(map);
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}