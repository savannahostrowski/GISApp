var map = L.map('map', {
  renderer: L.svg()
}).setView([43.399657, -80.442887], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'sostrows.7faa2b2a',
    accessToken: 'pk.eyJ1Ijoic29zdHJvd3MiLCJhIjoiYzQzZmM5N2E4MmZiMDFjMWU1ZmE3N2M0M2E2NTllOWUifQ.14jVMAgcp0EglUIjzdyA8w'
}).addTo(map);

function featureColour (feature) {
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
  L.marker([43.478916, -80.517904]).bindPopup('Conestoga College').addTo(map);

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




function getColor(d) {
  if (d === 1) {
    return'#00FF00';
  }
  if (d === 2) {
    return '#55FF00';
  }
  if (d === 3) {
    return '#88FF00';
  }
  if (d === 4) {
    return '#BBFF00';
  }
  if (d === 5) {
    return '#FFFF00'; 
  }
  if (d === 6) {
    return '#FFDD00';
  }
  if (d === 7) {
    return '#FFCC00';
  }
  if (d === 8) {
    return '#FF8800';
  }
  if (d === 9) {
    return '#FF4400';
  }
  if (d === 10) {
    return '#FF0000';
  }
};

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5,6,7,8,9,10],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i] ? '<br>' : ' ');
    }

    return div;
};

legend.addTo(map);