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
    return d === 1 ? '#00FF00' :
           d === 2 ? '#55FF00' :
           d === 3 ? '#88FF00' :
           d === 4 ? '#BBFF00' :
           d === 5 ? '#FFFF00' :
           d === 6 ? '#FFDD00' :
           d === 7 ? '#FFCC00' :
           d === 8 ? '#FF8800' :

           d === 9 ? '#FF0000' :
           d === 10 ?'#FFEDA0' :
           ''
}

     // <span style='background:#00FF00;'></span>
     //      <span style='background:#55FF00;'></span>
     //      <span style='background:#88FF00;'></span>
     //      <span style='background:#BBFF00;'></span>
     //      <span style='background:#FFFF00;'></span>
     //      <label>1</label>
     //      <label>2</label>
     //      <label>3</label>
     //      <label>4</label>
     //      <label>5</label>
     //      <span style='background:#FFDD00;'></span>
     //      <span style='background:#FFCC00;'></span>
     //      <span style='background:#FF8800;'></span>
     //      <span style='background:#FF4400;'></span>
     //      <span style='background:#FF0000;'></span>

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5,6,7,8,9,10],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '<br>' : ' ');
    }

    return div;
};

// legend.addTo(map);