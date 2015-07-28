var map = L.map('map', {
  renderer: L.svg()
}).setView([43.439059, -80.419618], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'sostrows.7faa2b2a',
    accessToken: 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w'
}).addTo(map);

var colours = { 
  1: '#00FF00',
  2: '#55FF00',
  3: '#88FF00',
  4: '#BBFF00',
  5: '#FFFF00',
  6: '#FFDD00', 
  7: '#FFCC00',
  8: '#FF8800',
  9: '#FF4400',
  10: '#FF0000'};



function featureColour (feature) {
  var rank = feature.properties.FINAL_RANK;
  return {
    color: colours[rank],
    fill: colours[rank],
    fillOpacity: 1.0
  };
}


function setup (geoJ, paneName) {
  L.geoJson(geoJ, {
    pane: paneName,
    style: featureColour
  }).addTo(map);

  var overlayPane = map.getPanes().overlayPane;

  function clip() {
    var nw = map.containerPointToLayerPoint([0, 0]),
        se = map.containerPointToLayerPoint(map.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;

    overlayPane.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }

  var range = document.getElementById('range');
  range['oninput' in range ? 'oninput' : 'onchange'] = clip;
  map.on('move', clip);

  //schools
  L.marker([43.47221825, -80.54241289]).bindPopup('University of Waterloo').addTo(map);
  L.marker([43.473664, -80.528207]).bindPopup('Wilfrid Laurier University').addTo(map);
  L.marker([43.478916, -80.517904]).bindPopup('Conestoga College - Waterloo Campus').addTo(map);
  L.marker([43.3906678, -80.4027819]).bindPopup('Conestoga College - Main Campus').addTo(map);
  L.marker([43.3582922, -80.3167776]).bindPopup('University of Waterloo School of Architecture').addTo(map);
  L.marker([43.3868299, -80.3982499]).bindPopup('Conestoga College - Cambridge Campus').addTo(map);
  L.marker([43.4528117, -80.4990819]).bindPopup('University of Waterloo School of Pharmacy').addTo(map);
  clip();
}

$.getJSON('1996final.geojson', function (data) {
  var geoJson1996 = [data];
  setup(geoJson1996);
});

var pane2011 = map.createPane('pane2011');
$.getJSON('2011final.geojson', function (data) {
  var geoJson2011 = [data];
  // Add features to the map
  setup(geoJson2011, 'pane2011');
});



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5,6,7,8,9,10],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        if (grades[i] === 1) {
          div.innerHTML +=
          '<i style="background:' + colours[grades[i]] + '"></i> ' +
            grades[i] + ' - low student impact' + (grades[i] ? '<br>' : ' ');
        } else if (grades[i] === 10) {
          div.innerHTML +=
            '<i style="background:' + colours[grades[i]] + '"></i> ' +
            grades[i] + ' - high student impact' + (grades[i] ? '<br>' : ' ');
          } else {
          div.innerHTML +=
            '<i style="background:' + colours[grades[i]] + '"></i> ' +
            grades[i] + (grades[i] ? '<br>' : ' ');
          }
        }
        return div;
      };

legend.addTo(map);

function style(feature) {
    return {
        fillColor: 'grey',
        weight: 2,
        opacity: 1,
        color: 'grey',
        fillOpacity: 0.1
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        stroke: 'grey'
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    hover.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    hover.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var hover = L.control();

hover.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'hover'); // create a div with a class "hover"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
hover.update = function (props) {
    this._div.innerHTML = '<h5>You are currently looking at:</h5>' +  (props ?
        '<b>' + props.PlaceName : 'Nothing! Hover over a municipality');
};

hover.addTo(map);

var boundaries = map.createPane('boundaries');
$.getJSON('boundaries.geojson', function (data) {
  var boundariesdata = [data];
  // Add features to the map
  geojson = L.geoJson(boundariesdata, {
    onEachFeature: onEachFeature,
    style: style,
    pane: boundaries
  }).addTo(map);
});
