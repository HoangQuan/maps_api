// var lat_field, lng_field, markersArray, placeMarkerAndPanTo, updateFields;
// markersArray = [];
// lat_field = $('#place_latitude');
// lng_field = $('#place_longitude');
// function initMap() {
//   var map;
//   if ($('#map').size() > 0) {
//     alert('hert');
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: {
//         lat: -34.397,
//         lng: 150.644
//       },
//       zoom: 8
//     });
//     map.addListener('click', function(e) {
//       placeMarkerAndPanTo(e.latLng, map);
//       return updateFields(e.latLng);
//     });
//     return $('#find-on-map').click(function(e) {
//       e.preventDefault();
//       return placeMarkerAndPanTo({
//         lat: parseInt(lat_field.val(), 10),
//         lng: parseInt(lng_field.val(), 10)
//       }, map);
//     });
//   }
// };
// placeMarkerAndPanTo = function(latLng, map) {
//   var marker;
//   while (markersArray.length) {
//     markersArray.pop().setMap(null);
//   }
//   marker = new google.maps.Marker({
//     position: latLng,
//     map: map
//   });
//   map.panTo(latLng);
//   return markersArray.push(marker);
// };

// updateFields = function(latLng) {
//   lat_field.val(latLng.lat());
//   return lng_field.val(latLng.lng());
// };

// google.maps.event.addDomListener(window, 'load', initMap);