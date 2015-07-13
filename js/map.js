L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map', 'mapbox.outdoors', {
  maxZoom: 19,
  minZoom: 11
});

function setup (geoJ) {
  L.geoJson(geoJ, {
    style: function (feature) {
      switch (feature.properties.final_ra_1) {
        case 1: return {
          color: '#336600',
          fill: '#336600',
          fillOpacity: 1.0,
        };
        break;
        case 2: return {
          color: '#007d06',
          fill: '#007d06',
          fillOpacity: 1.0
        };
        break;
        case 3: return {
          color: '#005b04',
          fill: '#005b04',
          fillOpacity: 1.0
        };
        break;
        case 4: return {
          color: '#d2fa1a',
          fill: '#d2fa1a',
          fillOpacity: 1.0
        };
        break;
        case 5: return {
          color: '#f8e614',
          fill: '#f8e614',
          fillOpacity: 1.0
        };
        break;
        case 6: return {
          color: '#FFA500',
          fill: '#FFA500',
          fillOpacity: 1.0
        };
        break;
        case 7: return {
          color: '#FF8C00',
          fill: '#FF8C00',
          fillOpacity: 1.0
        };
        break;
        case 8: return {
          color: '#FF0000',
          fill: '#FF0000',
          fillOpacity: 1.0
        };
        break;
        case 9: return {
          color: '#C00000',
          fill: '#C00000',
          fillOpacity: 1.0
        };
        break;
        case 10: return {
          color: '#780000',
          fill: '#780000',
          fillOpacity: 1.0
        };
        break;
      }
    }
  }).addTo(map);

  var overlayPane = map.getPanes().overlayPane;
  var overlay = L.mapbox.tileLayer('mapbox.comic').addTo(map);

  function clip() {
    var nw = map.containerPointToLayerPoint([0, 0]),
        se = map.containerPointToLayerPoint(map.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;


    overlayPane.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
    overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }

  var range = document.getElementById('range');
  range['oninput' in range ? 'oninput' : 'onchange'] = clip;
  map.on('move', clip);
  map.setView([43.4643, -80.5], 11);

  clip();
}

$.getJSON('1996final_1.geojson', function (data) {
  var geoJson1996 = [data];
  // Add features to the map
  setup(geoJson1996);
});
