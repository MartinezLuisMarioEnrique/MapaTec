var infowindowXML = (function () {
    var agregar_informacion = function (nombre_edificio, area, map, marker) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8083/mapaTec/php/informacion_xml.php";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "text/xml");
        xhr.send(null);

        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                var xml = xhr.responseXML;

                var markers = xml.documentElement.getElementsByTagName('informacion');

                Array.prototype.forEach.call(markers, function (markerElem) {
                    var nombre_zona = markerElem.getAttribute('nombre_zona');
                    var ruta1 = markerElem.getAttribute('ruta_img_1er_piso');
                    var ruta2 = markerElem.getAttribute('ruta_img_2do_piso');
                    if (nombre_edificio == nombre_zona) {
                        var infowincontent = document.createElement('div');
                        var atributo = document.createAttribute("id");
                        atributo.value = "info";
                        infowincontent.setAttributeNode(atributo);

                        var text01 = document.createElement('text');
                        text01.textContent = nombre_zona;
                        infowincontent.appendChild(text01);
                        infowincontent.appendChild(document.createElement('br'));

                        var text02 = document.createElement('text');
                        text02.textContent = "Jefe de departamento: " + markerElem.getAttribute('jefe_zona_departamento');
                        infowincontent.appendChild(text02);
                        infowincontent.appendChild(document.createElement('br'));

                        var text03 = document.createElement('text');
                        text03.textContent = "Horario: " + markerElem.getAttribute('horario');
                        infowincontent.appendChild(text03);
                        infowincontent.appendChild(document.createElement('br'));

                        var text04 = document.createElement('text');
                        text04.textContent = "Cantidad de pisos: " + markerElem.getAttribute('numero_pisos');
                        infowincontent.appendChild(text04);
                        infowincontent.appendChild(document.createElement('br'));

                        var text05 = document.createElement('text');
                        text05.textContent = "Cantidad de aulas: " + markerElem.getAttribute('numero_aulas');
                        infowincontent.appendChild(text05);
                        infowincontent.appendChild(document.createElement('br'));

                        var text06 = document.createElement('text');
                        text06.textContent = "Cantidad de cubiculos: " + markerElem.getAttribute('numero_cubiculos');
                        infowincontent.appendChild(text06);
                        infowincontent.appendChild(document.createElement('br'));

                        var text07 = document.createElement('text');
                        text07.textContent = "Número de policias: " + markerElem.getAttribute('numero_policias');
                        infowincontent.appendChild(text07);
                        infowincontent.appendChild(document.createElement('br'));

                        var text08 = document.createElement('text');
                        text08.textContent = "Dias habiles: " + markerElem.getAttribute('dias_habiles');
                        infowincontent.appendChild(text08);
                        infowincontent.appendChild(document.createElement('br'));

                        var text11 = document.createElement('text');
                        text11.textContent = "Información extra: " + markerElem.getAttribute('info_extra');
                        infowincontent.appendChild(text11);
                        infowincontent.appendChild(document.createElement('br'));

                        if (ruta1 != "SIN ESPECIFICAR") {
                            var buttonStreetView1 = document.createElement('button');
                            buttonStreetView1.textContent = "ver piso 1";
                            var idBoton1 = document.createAttribute("id");
                            idBoton1.value = "botonStreetView1";
                            buttonStreetView1.setAttributeNode(idBoton1);
                            infowincontent.appendChild(buttonStreetView1);

                            buttonStreetView1.onclick = function () {
                                if (ruta1.includes("img/360")) {
                                    initPano(ruta1.trim());
                                    mostrar();
                                } else {
                                    window_open(ruta1);
                                }

                            };

                        }

                        if (ruta2 != "SIN ESPECIFICAR") {
                            var buttonStreetView2 = document.createElement('button');
                            buttonStreetView2.textContent = "ver piso 2";
                            var idBoton2 = document.createAttribute("id");
                            idBoton2.value = "botonStreetView2";
                            buttonStreetView2.setAttributeNode(idBoton2);
                            infowincontent.appendChild(buttonStreetView2);

                            buttonStreetView2.onclick = function () {
                                if (ruta2.includes("img/360")) {
                                    initPano(ruta2.trim());
                                    mostrar();
                                } else {
                                    window_open(ruta2);
                                }

                            };
                        }

                        function window_open(url_imagen) {                           
                            
                            //document.getElementById('ventanaEmergente').src=url_imagen;
                            var ventanaStreetView = window.open(url_imagen, "StreetView ITO", "width=380,height=500, top=85,left=50");
                        }

                        var infowindowPoligono = new google.maps.InfoWindow;

                        area.addListener('click', function () {
                            infowindowPoligono.setContent(infowincontent);
                            infowindowPoligono.open(map, marker);
                        });
                    }
                });


            } else {
                console.log("FRACASO");
            }
        };
    };
    return {
        "agregar_informacion": agregar_informacion
    };
})();