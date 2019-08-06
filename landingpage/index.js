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
                        var col2 = $("<div>"); col1.addClass("col-sm-6"); col2.addClass("col-sm-6");
                        var img = $("<img>"); img.attr("src", response.baseUri+response.results[i].image);
                        
                        
                        var title = $("<h2>"); title.addClass("recipeTitles").text(recipe.title);
                        var txt = $("<span>"); txt.text(recipeBlurb);
                        $(".recipeDisplay").append(row);
                        row.append(col1).append(col2);
                        col1.append(img);
                        col2.append(title).append(txt);


                        

                    }
                    });
                });

            })
