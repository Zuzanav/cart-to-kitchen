$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCcqYafYLVS5QvocHANk0illfsIYUqH3I4",
        authDomain: "cart-to-kitchen-4c135.firebaseapp.com",
        databaseURL: "https://cart-to-kitchen-4c135.firebaseio.com",
        projectId: "cart-to-kitchen-4c135",
        storageBucket: "cart-to-kitchen-4c135.appspot.com",
        messagingSenderId: "421625026826",
        appId: "1:421625026826:web:988bc65eda645a60"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Variable to reference the database
    var database = firebase.database();

    // // Example array that will eventually be pulled from firebase
    // var favoritesArray = [537450, 474410, 509462, 64969, 446200, 383743, 552292, 468890, 185026, 388958];

    // Favorites button functionality
    var favoritesArray;

    function snapshotToArray(snapshot) {
        favoritesArray = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            favoritesArray.push(item);
        });

        return favoritesArray;
    };

    firebase.database().ref('/favorites/favoritesArray').on('value', function (snapshot) {
        snapshotToArray(snapshot);
        console.log(favoritesArray);

        $("#fav-container").empty();

        printCards();

    });

    $(document).on("click", ".remove-fav", function() {
        var recipeId = $(this).attr("data-recipeId");
        console.log("recipeId: " + recipeId);

        favoritesArray = _.without(favoritesArray, recipeId)

        console.log(favoritesArray);

        database.ref("/favorites").set({
            favoritesArray: favoritesArray,
          })

    })

    $(document).on("click", ".recipe-card", function () {

        var recipeID = ($(this).attr("data-recipeId"));

        localStorage.setItem("recipeId", recipeID);

    });

    function printCards() {
        for (i = 0; i < favoritesArray.length; i++) {

            var queryURL = "https://api.spoonacular.com/recipes/" + favoritesArray[i] + "/summary?apiKey=c0dd1224e5f348c785c7651d307e1e88"
            console.log(queryURL);

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
                cardDiv.attr("data-recipeId", response.id);

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

                // <span class='float-right'><i class='far fa-times-circle remove-fav'></i></span>

                var span = $("<span>");
                span.addClass("float-right");
                var icon = $("<i>");
                icon.addClass("far").addClass("fa-times-circle").addClass("remove-fav");
                icon.attr("data-recipeId", response.id);
                span.append(icon);

                var a = $("<a>");
                a.attr("href", "../recipepage/recipe.html");
                var h5 = $("<h5>");
                h5.addClass("card-title");
                h5.text(title);
                a.append(h5);

                var p = $("<p>");
                p.addClass("card-text");
                p.html(summary);

                bodyDiv.append(span).append(a).append(p);
                contentCol.append(bodyDiv);
                imgCol.append(img);
                row.append(imgCol).append(contentCol);
                cardDiv.append(row);
                $("#fav-container").append(cardDiv);


            })

        }
    }

})