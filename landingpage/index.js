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

    var queryURL = "https://api.spoonacular.com/recipes/random?number=10&apiKey=4cf59167281f45719631aca9dd2155f2"

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);

        var results = response.recipes;

        for (i = 0; i <results.length; i++) {

            var queryURL = "https://api.spoonacular.com/recipes/" + results[i].id + "/summary?apiKey=4cf59167281f45719631aca9dd2155f2"
        
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
                $(".recipeDisplay").append(cardDiv);

                })
    
        }
    })

    $("#search-button").on("click", function () {
        var recipeSearch = $("#search-term").val();
        console.log(recipeSearch);

        var queryURL = "https://api.spoonacular.com/recipes/search?query=" + recipeSearch + "&number=10&apiKey=4cf59167281f45719631aca9dd2155f2";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {


            var recipe = response.results;
            for (i = 0; i < recipe.length; i++) {

                var recipeID = recipe.id;

              
                console.log(response);


                var recipeBlurb = response.summary;

                var row = $("<div>"); row.addClass("row");
                var col1 = $("<div>");
                var col2 = $("<div>"); 
                col1.addClass("col-sm-6"); 
                col2.addClass("col-sm-6");
                //var img = $("<img>"); img.attr("src", response.baseUri+response.results[i].image);
                var ImagePlaceholder = $("#imagePlaceholder"); 
                ImagePlaceholder.attr("src", response.baseUri+response.results[0].image);
                //ImagePlaceholder.attr(response.baseUri+response.results[0].image);

                // var title = $("#title"); title.text(response.results[i].title);
                // var id = $("#id"); id.text(response.results[i].id);
                // var desc = $("#desc"); desc.text(response.results[0].desc);
                // var title = $("#title"); title.addClass("recipeTitles").text(recipe.title);
                var txt = $("<span>"); txt.text(recipeBlurb);
                $(".recipeDisplay").append(row);
                row.append(col1).append(col2);
                col1.append(img);
                col2.append(title).append(txt);


                

            }
            });
        });

    })
