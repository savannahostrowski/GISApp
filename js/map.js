L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map');

//add 2011 data
L.mapbox.tileLayer('mapbox.outdoors').addTo(map);

//add 1996 data
var overlay = L.mapbox.tileLayer('mapbox.comic').addTo(map);

var range = document.getElementById('range');

//to add environment,economic and societal layers
var layers = document.getElementById('menu-ui');
addLayer(L.mapbox.tilelayer('mapbox.streets'), 'Base Map', 1);
addLayer(L.mapbox.tilelayer('mapbox.comic'), 'Environment', 2);
addLayer(L.mapbox.tilelayer('mapbox.satellite'), 'Economy', 3);
addLayer(L.mapbox.tilelayer('mapbox.outdoors'), 'Society', 4);
addLayer(L.mapbox.tilelayer('mapbox.streets'), 'Total', 5);


function addLayer (layer, name, zIndex) {
  layer
      .setZIndex(zIndex)
      .addTo(map);

  var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';
      link.innerHTML = name;

  link.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();

    if(map.hasLayer(layer)) {
      map.removeLayer(layer);
      this.className = '';
    }
  };
  layer.appendChild(link);
}

function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;

  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map.on('move', clip);
map.setView([43.4643, -80.5], 12);


clip();
