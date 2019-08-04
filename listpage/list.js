// Global variables
var map;


// AJAX
// Spoonacular API key = 4cf59167281f45719631aca9dd2155f2
// GooglePlaces API key = AIzaSyCnlCoa9k1kYFhjXO9rKOlsUkQXG0YP_J0
                            



// Functions
// alert("linked JS!");
function createMap() {
    var options = {
        center: {lat: 32.8819067, lng: -117.2457332},
        zoom: 15
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}



// Run


