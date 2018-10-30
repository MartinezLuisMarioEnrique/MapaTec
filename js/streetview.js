        var ruta_imagen='';
        function initPano(url) {
            // Set up Street View and initially set it visible. Register the
            // custom panorama provider function. Set the StreetView to display
            // the custom panorama 'reception' which we check for below.
            ruta_imagen = url;
            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('panorama'), {
                    pano: 'reception',
                    visible: true
                });
            panorama.registerPanoProvider(getCustomPanorama);
        }

        // Return a pano image given the panoID.
        function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
            return ruta_imagen;
        }

        // Construct the appropriate StreetViewPanoramaData given
        // the passed pano IDs.
        function getCustomPanorama(pano) {
            if (pano === 'reception') {
                return {
                    location: {
                        pano: 'reception',
                        description: 'ITO'
                    },
                    links: [],
                    // The text for the copyright control.
                    copyright: 'Imagery (c) 2018 Instituto Tecnológico de Oaxaca',
                    // The definition of the tiles for this panorama.
                    tiles: {
                        tileSize: new google.maps.Size(1024, 512),
                        worldSize: new google.maps.Size(1024, 512),
                        // The heading in degrees at the origin of the panorama
                        // tile set.
                        centerHeading: 505,
                        getTileUrl: getCustomPanoramaTileUrl
                    }
                };
            }
        }