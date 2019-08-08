// AJAX
// Spoonacular API key = 4cf59167281f45719631aca9dd2155f2
// GooglePlaces API key = AIzaSyCnlCoa9k1kYFhjXO9rKOlsUkQXG0YP_J0

$(document).ready(function () {

    var ingredientArr = [];

    var firebaseConfig = {
        apiKey: "AIzaSyCcqYafYLVS5QvocHANk0illfsIYUqH3I4",
        authDomain: "cart-to-kitchen-4c135.firebaseapp.com",
        databaseURL: "https://cart-to-kitchen-4c135.firebaseio.com",
        projectId: "cart-to-kitchen-4c135",
        storageBucket: "cart-to-kitchen-4c135.appspot.com",
        messagingSenderId: "421625026826",
        appId: "1:421625026826:web:988bc65eda645a60"
    };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    database.ref().on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val().ingredient_name);
        var list = childSnapshot.val().ingredient_name;
        ingredientArr.push(list);
        console.log(ingredientArr);

    }, function (errorObject) {

        console.log("The read failed: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function () {
        for (let i = 0; i < ingredientArr.length; i++) {
            $("#groceryList").append("<li>" + ingredientArr[i] + "</li>");

        };
    });





});

// Functions for Map
//   function initPlaces() {
//     var places = new google.maps.places.PlacesService(map),
//         populateMapWithMyLocation = [//array with geolocation lat & lng];

//     populateMapWithMyLocations.forEach(function(result){
//         places.getDetails(result, function(response){                            
//             console.log(response)
//         })
//     }) 
//   }

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: 32.8819067,
            lng: -117.2457332
        }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
}


function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// map = new google.maps.Map(document.getElementById('map'), options);
var input = document.getElementById("store");
var searchbox = new google.maps.places.Searchbox(input);

map.addListener('bounds_changed', function () {
    searchbox.setBounds(map.getBounds());
});

var markers = [];

searchbox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length === 0)
        return;

    markers.forEach(function (m) {
        m.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();

    places.forEach(function (p) {
        if (!p.geometry)
            return;
        markers.push(new google.maps.Marker({
            map: map,
            title: p.name,
            position: p.geometry.location
        }));

        if (p.geometry.viewport)
            bounds.union(p.geometry.viewport);
        else
            bounds.extend(p.geometry.location);
    });
    map.fitBounds(bounds);
});

// $("#place").on("click", function() {
//     // var storeTerm = "vons";

//     // var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + storeTerm + "&inputtype=textquery&fields=openin_hours&key=AIzaSyCnlCoa9k1kYFhjXO9rKOlsUkQXG0YP_J0";
//     var queryURL = "http://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyCnlCoa9k1kYFhjXO9rKOlsUkQXG0YP_J0"

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//     .then(function(response) {
//         console.log(response);
//     },
//     function (err) {
//         console.log('ERR', err);
//     })
// });