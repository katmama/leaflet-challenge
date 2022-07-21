
// Store our API endpoints.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(queryUrl)

var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
console.log(platesUrl)

function markerSize(magnitude) {
  return magnitude * 4;
};

var earthquakes = new L.LayerGroup();

// Perform a GET request to the earthquake URL

d3.json(queryUrl,function (data) {
  L.geoJSON(data, {
    pointToLayer: function (data, latling) {
      return L.circleMarker(latling, {radius: markerSize(data.properties.mag) });
    },
    style: function (data) {
      return {
        fillColor: Color(data.geometry.coordinates[2]),
        fillOpacity: .7,
        weight: .1,
        color: "black"
      }
    },


    onEachFeature: function (feature, layer) {
    layer.bindPopup(
      "Magnitude: "
        + feature.properties.mag
        + "<br>Depth: "
        + feature.geometry.coordinates[2]
        + "<br>Location: "
        + feature.properties.place
    );
  }
  }).addTo(earthquakes);



  
   
createMap(earthquakes);

});


var plateBoundary = new L.LayerGroup();

d3.json(platesUrl, function (geoJson) {
  L.geoJSON(geoJson.features, {
      style: function (geoJsonFeature) {
          return {
              weight: 2,
              color: 'magenta'
          }
      },
  }).addTo(plateBoundary);
})


function Color(depth) {
  if (depth > 90) {
      return 'red'
  } else if (depth > 70) {
      return 'darkorange'
  } else if (depth > 50) {
      return 'tan'
  } else if (depth > 30) {
      return 'yellow'
  } else if (depth > 10) {
      return 'darkgreen'
  } else {
      return 'lightgreen'
  }
};

    
function createMap(earthquakes) {


  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": plateBoundary
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map-id", {
    center: [37.09, -95.71],
    
    zoom: 5,
    layers: [street, earthquakes, plateBoundary]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
  }).addTo(myMap);

  
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          depth = [-10, 10, 30, 50, 70, 90],
          colors = ['lightgreen', 'darkgreen', 'yellow', 'tan', 'darkorange', 'red'];

      div.innerHTML += "<h4 style='margin:4px'>Depth</h4>"

      for (var i = 0; i < depth.length; i++) {
          div.innerHTML +=
              '<i style="background:' + Color(depth[i] + 1) + '"></i> ' +
              depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }

        return div;
    };
  legend.addTo(myMap);




  

}
