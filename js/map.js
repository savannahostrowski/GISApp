L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map', 'mapbox.outdoors', {
  maxZoom: 19,
  minZoom: 11
});

function setup (geoJ) {
  map.legendControl.addLegend(document.getElementById('legend').innerHTML);
  L.geoJson(geoJ, {
    style: function (feature) {
      switch (feature.properties.FINAL_RANK) {
        case 1: return {
          color: '#00FF00',
          fill: '#00FF00',
          fillOpacity: 1.0,
        };
        case 2: return {
          color: '#55FF00',
          fill: '#55FF00',
          fillOpacity: 1.0
        };
        case 3: return {
          color: '#88FF00',
          fill: '#88FF00',
          fillOpacity: 1.0
        };
        case 4: return {
          color: '#BBFF00',
          fill: '#BBFF00',
          fillOpacity: 1.0
        };
        case 5: return {
          color: '#FFFF00',
          fill: '#FFFF00',
          fillOpacity: 1.0
        };
        case 6: return {
          color: '#FFDD00',
          fill: '#FFDD00',
          fillOpacity: 1.0
        };
        case 7: return {
          color: '#FFCC00',
          fill: '#FFCC00',
          fillOpacity: 1.0
        };
        case 8: return {
          color: '#FF8800',
          fill: '#FF8800',
          fillOpacity: 1.0
        };
        case 9: return {
          color: '#FF4400',
          fill: '#FF4400',
          fillOpacity: 1.0
        };
        case 10: return {
          color: '#FF0000',
          fill: '#FF0000',
          fillOpacity: 1.0
        };
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
  map.setView([43.399657, -80.442887], 11);

  //schools
  L.marker([43.47221825, -80.54241289]).bindLabel('University of Waterloo').addTo(map);
  L.marker([43.473664, -80.528207]).bindLabel('Wilfrid Laurier University').addTo(map);
  L.marker([43.478916, -80.517904]).bindLabel('Conestoga College').addTo(map);

  clip();
}

$.getJSON('1996final.geojson', function (data) {
  var geoJson1996 = [data];
  // Add features to the map
  setup(geoJson1996);
});
