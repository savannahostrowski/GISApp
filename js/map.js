L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map', 'mapbox.outdoors', {
  maxZoom: 19,
  minZoom: 11
});

function setup (geoJson) {
  var myLayer = L.mapbox.featureLayer().addTo(map);
  myLayer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;
  });
  myLayer.setGeoJSON(geoJson);

  var objectsPane = map.getPanes().objectsPane;

  function clip() {
    var nw = map.containerPointToLayerPoint([0, 0]),
        se = map.containerPointToLayerPoint(map.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;

    objectsPane.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }

  var range = document.getElementById('range');
  range['oninput' in range ? 'oninput' : 'onchange'] = clip;
  map.on('move', clip);
  map.setView([43.4643, -80.5], 11);

  clip();
}

$.getJSON('1996final.geojson', function (data) {
  var geoJson = [data];
  // Add features to the map
  setup(geoJson);
});
