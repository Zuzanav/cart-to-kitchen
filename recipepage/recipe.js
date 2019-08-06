
var recipe = $(this).attr("data-name");
var queryURL = "https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=4cf59167281f45719631aca9dd2155f2";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    var recipeTitle = results.title;

    for (i = 0; i < results.title.length; i++) {
        recipeTitle += results.title[i] + "<br>";
      }


});



