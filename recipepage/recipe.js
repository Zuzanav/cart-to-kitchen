
//retrieve user selected recipe ID from local storage ----------------------------
//var userSelectedID = localStorage.getItem("recipe_id");
// console.log(userSelectedID);

// this user selected ID is temporarily assigned a random recipe for the purpose of building and testing this page 
var userSelectedID = 	1003464

//=====================================================================================================================================

// API URL ------------------------------------------------------------------------------------------------

//variable for query URL that pulls all recipe information from Spoonacular API
var queryURL = "https://api.spoonacular.com/recipes/informationBulk?ids=" + userSelectedID + "&apiKey=e2fdf8caf9fc4fd185d2672794a3994c"

//=====================================================================================================================================

// RECIPE DATA ------------------------------------------------------------------------------------------------
$.ajax({
  url: queryURL,
  method: "GET"

//run function response to retrieve data from the queryURL
}).then(function(response) {

    // access the first index of the reponse 
    var actual_data = response[0];

    // RECIPE TITLE - add to div ----------------------------------------
    $("#recipeTitle").text(actual_data.title);

    // IMAGE -------------------------------------------------------------
    $("#recipeImg").attr("src", actual_data.image);

    // INGREDIENTS -------------------------------------------------------
    for (i = 0; i < actual_data.extendedIngredients.length; i++) {

      var current_ingredient_name = actual_data.extendedIngredients[i].name;
      var current_ingredient_amount = actual_data.extendedIngredients[i].amount;
      var current_ingredient_unit = actual_data.extendedIngredients[i].unit;

      $("#recipeIngredients").append(`<div class="recipes" data-type=${current_ingredient_name}> ${current_ingredient_amount} ${current_ingredient_unit}  ${current_ingredient_name} </div>`);
      
      console.log(actual_data.extendedIngredients[i].name);
      console.log(actual_data.extendedIngredients[i].amount);
      console.log(actual_data.extendedIngredients[i].unit);
      }
    
    // INSTRUCTIONS -----------------------------------------------------
    $("#recipeInstructions").html(actual_data.instructions);


}); // END OF FUNCTION RESPONSE 
