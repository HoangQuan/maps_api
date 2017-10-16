$(document).on('ready', function(){
  var lat_field, lon_field, markersArray, placeMarkerAndPanTo, updateFields, bounds, markers_hash;
  markersArray = [];
  markers_hash = {};

  var map;
  // renderMap = function(){
    function initMap() {
      if ($('#map1').size() > 0) {
        var center = {lat: $("#map1").data('lat'), lng: $("#map1").data('lon')}
        map = new google.maps.Map(document.getElementById('map1'), {
          center: center,
          mapTypeId: 'satellite',
          zoom: 16
        });

        bounds = map.getBounds();

        // click on map to make marker
        // map.addListener('click', function(e) {
        //   placeMarkerAndPanTo(e.latLng, map);
        //   return updateFields(e.latLng);
        // });

        $(document).on('click', '.create_marker', function(e) {
          e.preventDefault();
          var marker_name = $(this).data('markerName')
          var marker_id = $(this).data('id');

          var lat_field = '.latitude_' + marker_id;
          var lon_field = '.longitude_' + marker_id;
          if ($(lat_field).val() != '' && $(lon_field).val() != '') {
            var LatLngBounds_test = {
              lat: parseFloat($(lat_field).val()),
              lng: parseFloat($(lon_field).val())
            }
          } else {
            var random_marker = getRandom_marker(map.getBounds());
            var LatLngBounds_test = {
              lat: random_marker.lat,
              lng: random_marker.lng
            }
          }

          handUpdateFields(lat_field, lon_field, LatLngBounds_test.lat, LatLngBounds_test.lng);
          return placeMarkerAndPanTo(LatLngBounds_test, marker_name, marker_id, map);
        });

        $(".create_marker").each(function() {
          if (parseFloat($(this).data('lat')) > 0 && parseFloat($(this).data('lon')) > 0) {
            var marker_lat = parseFloat($(this).data('lat'));
            var marker_lon = parseFloat($(this).data('lon'));
            var marker_name = $(this).data('markerName');
            var marker_id = $(this).data('id');

            var position = { lat: marker_lat, lng: marker_lon };
            createMarker(position, marker_name, marker_id, map);
          }
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('map_address');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              // icon: icon,
              title: place.name,
              position: place.geometry.location,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
    };

    google.maps.event.addDomListener(window, 'load', initMap);
  // };
  placeMarkerAndPanTo = function(latLng, name, id, map) {
    createMarker(latLng, name, id, map);

    map.panTo(latLng);
    // return markersArray.push(marker);
  };

  function getRandom_marker(bounds) {
    var lat_min = bounds.getSouthWest().lat(),
        lat_range = bounds.getNorthEast().lat() - lat_min,
        lng_min = bounds.getSouthWest().lng(),
        lng_range = bounds.getNorthEast().lng() - lng_min;

    return { lat: lat_min + (Math.random() * lat_range), lng: lng_min + (Math.random() * lng_range) };
  }
  // google.maps.event.addListener(Marker, "dragend", function(event) { 
  //   var lat = event.latLng.lat(); 
  //   var lng = event.latLng.lng(); 
  // });


  updateFields = function(lat_field, lon_field, latLng) {
    $(lat_field).val(latLng.lat());
    return $(lon_field).val(latLng.lng());
  };

  handUpdateFields = function(lat_field, lon_field, lat, lng) {
    $(lat_field).val(lat);
    return $(lon_field).val(lng);
  };

  createMarker = function(position, name, id, map) {
    if (markers_hash[id]) {
      return markers_hash[id];
    }

    var lat_field = '.latitude_' + id;
    var lon_field = '.longitude_' + id;

    var icon;
    if (id.indexOf('tee')) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    } else {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }
    var marker = new google.maps.Marker({ // create a marker and set id
      id: id,
      position: position,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: name,
      icon: icon
    });

    marker.addListener('drag', function(e){
      return updateFields(lat_field, lon_field, e.latLng);
    });
    markers_hash[id] = marker; // cache created marker to markers object with id as its key
    return marker;
  };

  var removeMarker = function(markerId) {
      markers_hash[markerId].setMap(null); // set markers setMap to null to remove it from map
      delete markers_hash[markerId]; // delete marker instance from markers object
  };

  // renderMap();
  // Add field

  $("form").on("click", ".remove_fields", function(event) {
    $(this).closest("fieldset").find("input[type=hidden]").val("1");
    $(this).closest("fieldset").hide();

    var rm_marker_id = $(this).data('id');
    removeMarker(rm_marker_id)
    return event.preventDefault();
  });

  $("form").on("click", ".add_fields", function(event) {
    var regexp, time;
    regexp = void 0;
    time = void 0;
    time = new Date().getTime();
    regexp = new RegExp($(this).data("id"), "g");
    $(this).before($(this).data("fields").replace(regexp, time));
    return event.preventDefault();
  });

});