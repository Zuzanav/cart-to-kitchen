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



function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {
            lat: 32.8819067,
            lng: -117.2457332
        },
        zoom: 13
    });

    new AutocompleteDirectionsHandler(map);
}

/**
 * @constructor
 */
function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originInput = document.getElementById('starting-place');
    var destinationInput = document.getElementById('search-places');
    var modeSelector = document.getElementById('mode-selector');

    var originAutocomplete = new google.maps.places.Autocomplete(originInput);

    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete =
        new google.maps.places.Autocomplete(destinationInput);

    destinationAutocomplete.setFields(['place_id']);

    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

}

AutocompleteDirectionsHandler.prototype.setupClickListener = function (
    id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;

    radioButton.addEventListener('click', function () {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            window.alert('Please select an option from the dropdown list.');
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route({
            origin: {
                'placeId': this.originPlaceId
            },
            destination: {
                'placeId': this.destinationPlaceId
            },
            travelMode: this.travelMode
        },
        function (response, status) {
            if (status === 'OK') {
                me.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
};


















// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: {
//             lat: 32.8819067,
//             lng: -117.2457332
//         }
//     });
//     var geocoder = new google.maps.Geocoder();

//     document.getElementById('submit').addEventListener('click', function () {
//         geocodeAddress(geocoder, map);

//     var places = new google.maps.
//     });
// }


// function geocodeAddress(geocoder, resultsMap) {
//     var address = document.getElementById('address').value;
//     geocoder.geocode({
//         'address': address
//     }, function (results, status) {
//         if (status === 'OK') {
//             resultsMap.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//                 map: resultsMap,
//                 position: results[0].geometry.location
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }