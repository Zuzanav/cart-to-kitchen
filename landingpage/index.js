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

    //====================================================================================================================

    //Zuzana's Addition

    $(".recipeDisplay").empty();

    var queryURL = "https://api.spoonacular.com/recipes/random?number=10&apiKey=444bf8ec1b304306aa66db58304dd302"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);

        var results = response.recipes;

        for (i = 0; i < results.length; i++) {

            var queryURL = "https://api.spoonacular.com/recipes/" + results[i].id + "/summary?apiKey=444bf8ec1b304306aa66db58304dd302"

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

                var a = $("<a>");
                a.attr("href", "recipepage/recipe.html");
                var h5 = $("<h5>");
                h5.addClass("card-title");
                h5.text(title);
                a.append(h5);

                var p = $("<p>");
                p.addClass("card-text");
                p.html(summary);

                bodyDiv.append(a).append(p);
                contentCol.append(bodyDiv);
                imgCol.append(img);
                row.append(imgCol).append(contentCol);
                cardDiv.append(row);
                $(".recipeDisplay").append(cardDiv);

            })

        }
    })

    $("#search-button").on("click", function () {
        var recipeSearch = $("#search-term").val();
        console.log(recipeSearch);

        $(".recipeDisplay").empty();

        var queryURL = "https://api.spoonacular.com/recipes/search?query=" + recipeSearch + "&number=10&apiKey=444bf8ec1b304306aa66db58304dd302"

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log(response);

            var results = response.results;

            for (i = 0; i < results.length; i++) {

                var queryURL = "https://api.spoonacular.com/recipes/" + results[i].id + "/summary?apiKey=444bf8ec1b304306aa66db58304dd302"

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

                    var a = $("<a>");
                    a.attr("href", "recipepage/recipe.html");
                    var h5 = $("<h5>");
                    h5.addClass("card-title");
                    h5.text(title);
                    a.append(h5);

                    var p = $("<p>");
                    p.addClass("card-text");
                    p.html(summary);

                    bodyDiv.append(a).append(p);
                    contentCol.append(bodyDiv);
                    imgCol.append(img);
                    row.append(imgCol).append(contentCol);
                    cardDiv.append(row);
                    $(".recipeDisplay").append(cardDiv);


                })

            }
        })

    });
    $(document).on("click", ".recipe-card", function () {

        var recipeID = ($(this).attr("data-recipeId"));

        localStorage.setItem("recipeId", recipeID);

    });

})