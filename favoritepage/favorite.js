$(document).ready(function () {

    // // Your web app's Firebase configuration
    // var firebaseConfig = {
    //     apiKey: "AIzaSyCcqYafYLVS5QvocHANk0illfsIYUqH3I4",
    //     authDomain: "cart-to-kitchen-4c135.firebaseapp.com",
    //     databaseURL: "https://cart-to-kitchen-4c135.firebaseio.com",
    //     projectId: "cart-to-kitchen-4c135",
    //     storageBucket: "cart-to-kitchen-4c135.appspot.com",
    //     messagingSenderId: "421625026826",
    //     appId: "1:421625026826:web:988bc65eda645a60"
    // };

    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

        // Example array that will eventually be pulled from firebase
        var favoritesArray = [537450, 474410, 509462, 64969, 446200, 383743, 552292, 468890, 185026, 388958];
    
        for (i = 0; i <favoritesArray.length; i++) {

            var queryURL = "https://api.spoonacular.com/recipes/" + favoritesArray[i] + "/summary?apiKey=3bcac49f5a044aedacf4b3fb25eb9f89"
        
             $.ajax({
                 url: queryURL,
                 method: "GET"
        
             }).then(function (response) {
    
                console.log(response);
                var title = response.title;
                var summary = response.summary;
                var imageURL = "https://spoonacular.com/recipeImages/" + response.id + "-312x231.jpg"

                // Print favorites
                var cardDiv = $("<div>");
                cardDiv.addClass("card mb-3").addClass("recipe-card");

                var row = $("<div>");
                row.addClass("row").addClass("no-gutters");

                var imgCol = $("<div>");
                imgCol.addClass("col-md-4");

                var img = $("<img>");
                img.addClass("card-img");
                img.attr("src", imageURL);

                var contentCol = $("<div>");
                contentCol.addClass("col-md-8");

                var bodyDiv = $("<div>");
                bodyDiv.addClass("card-body");

                var h5 = $("<h5>");
                h5.addClass("card-title");
                h5.text(title);

                var p = $("<p>");
                p.addClass("card-text");
                p.html(summary);

                bodyDiv.append(h5).append(p);
                contentCol.append(bodyDiv);
                imgCol.append(img);
                row.append(imgCol).append(contentCol);
                cardDiv.append(row);
                $("#fav-container").append(cardDiv);

                })
    
        }


})