L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map');
//add 2011 data
L.mapbox.tileLayer('mapbox.outdoors').addTo(map);

//add 1996 data
var overlay = L.mapbox.tileLayer('mapbox.comic').addTo(map);

var range = document.getElementById('range');
//to add environment,economic and societal layers
// var layers = {
//   Satellite: L.mapbox.tileLayer('mapbox.satellite'),
//   Streets: L.mapbox.tileLayer('mapbox.streets'),
//   Outdoors:L.mapbox.tileLayer('mapbox.outdoors')
// };


function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;

  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map.on('move', clip);
map.setView([43.4643, -80.5], 12);
// layers.Streets.addTo(map);
// L.control.layers(layers).addTo(map);

clip();
