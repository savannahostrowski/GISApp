L.mapbox.accessToken = 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w';
var map = L.mapbox.map('map');
//add 2011 data
L.mapbox.tileLayer('mapbox.outdoors').addTo(map);

//add 1996 data
var overlay = L.mapbox.tileLayer('mapbox.comic').addTo(map);

var range = document.getElementById('range');

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

var myLayer = L.mapbox.featureLayer().addTo(map);
var geoJson = [{
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-77.03, 38.90]},
    "properties": {
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Cherry_Blossoms_and_Washington_Monument.jpg/320px-Cherry_Blossoms_and_Washington_Monument.jpg",
        "url": "https://en.wikipedia.org/wiki/Washington,_D.C.",
        "marker-symbol": "star",
        "marker-color": "#ff8888",
        "marker-size": "large",
        "city": "Washington, D.C."
    }
}, {
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-87.63, 41.88]},
    "properties": {
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Chicago_sunrise_1.jpg/640px-Chicago_sunrise_1.jpg",
        "url": "https://en.wikipedia.org/wiki/Chicago",
        "marker-color": "#ff8888",
        "city": "Chicago"
    }
}, {
    type: 'Feature',
    "geometry": { "type": "Point", "coordinates": [-74.00, 40.71]},
    "properties": {
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/NYC_Top_of_the_Rock_Pano.jpg/640px-NYC_Top_of_the_Rock_Pano.jpg",
        "url": "https://en.wikipedia.org/wiki/New_York_City",
        "marker-color": "#ff8888",
        "city": "New York City"
    }
}];

// Add custom popups to each using our custom feature properties
myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
                            '<img src="' + feature.properties.image + '" />' +
                            feature.properties.city +
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
    });
});

// Add features to the map
myLayer.setGeoJSON(geoJson);
