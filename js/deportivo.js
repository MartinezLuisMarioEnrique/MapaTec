var unidad_deportiva = (function () {

    var marcar_zona = function (_map) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8083/mapaTec/php/xml_unidad_deportiva.php";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "text/xml");
        xhr.send(null);

        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                var xml = xhr.responseXML;

                var markers = xml.documentElement.getElementsByTagName('UnidadDeportiva');

                Array.prototype.forEach.call(markers, function (markerElem) {
                    var nombre_zona = markerElem.getAttribute('nombre_zona');
                    var ruta = markerElem.getAttribute('ruta_imagen360');
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

                    var infowincontent = document.createElement('div');
                    var atributo = document.createAttribute("id");
                    atributo.value = "info";
                    infowincontent.setAttributeNode(atributo);

                    if (ruta != "SIN ESPECIFICAR") {
                        var buttonStreetView1 = document.createElement('button');
                        buttonStreetView1.textContent = "ver " + nombre_zona;
                        var idBoton1 = document.createAttribute("id");
                        idBoton1.value = "botonStreetView1";
                        buttonStreetView1.setAttributeNode(idBoton1);
                        infowincontent.appendChild(buttonStreetView1);

                        buttonStreetView1.onclick = function () {
                            if (ruta.includes("img360/")) {
                                initPano(ruta.trim());
                                mostrar();
                            } else {
                                window_open(ruta);
                            }

                        };

                    }else{
                        var text01 = document.createElement('text');
                        text01.textContent = "Vista no disponible";
                        infowincontent.appendChild(text01);
                    }

                    function window_open(url_imagen) {
                        var ventanaStreetView = window.open(url_imagen, "StreetView ITO", "width=380,height=500, top=85,left=50");
                    }

                    var marker = new google.maps.Marker({
                        map: _map,
                        position: point
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: "<div style='float:left'><img width = 100px height = 80px src='" + ruta_imagen + "'></div><div style='float:right; padding: 8px;'><b>" + nombre_zona + "</b></div>"
                    });

                    var infowindowPoligono = new google.maps.InfoWindow;

                    marker.addListener('mouseover', function () {
                        infowindow.open(_map, marker);
                    });

                    marker.addListener('mouseout', function () {
                        infowindow.close();
                    });

                    area.addListener('click', function () {
                        infowindowPoligono.setContent(infowincontent);
                        infowindowPoligono.open(_map, marker);
                    });

                    // Agregamos el area al mapa
                    area.setMap(_map);

                });


            } else {
                console.log("FRACASO");
            }
        };
    };
    return {
        "marcar_zona": marcar_zona
    };
})();