
function searchRecipesQuery(search, diet) {

    $("#recipe-search-display").empty();
    var queryURL = "https://api.edamam.com/search"


    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
        data: {
            "app_id": "ba334122",
            "app_key": "559625546067efe571c6b8650185cc3d",
            "q": search,
            "diet": diet,
            "contentType": "application/json",
        }

    }).done(function (response) {


        for (var i = 0; i < response.hits.length; i++) {

            var recDiv = $("<div class='card hover-card' style='margin-top: 2%;'>");

            var imgTag = $("<img>");
            imgTag.addClass("card-img-top img-responsive");
            imgTag.attr("src",response.hits[i].recipe.image);
            imgTag.attr("alt", response.hits[i].recipe.label);


            var h5 = $("<a href=" + response.hits[i].recipe.url + " target='_blank' class='top' <h3>" + response.hits[i].recipe.label + "</3><br><p>Calories: " + response.hits[i].recipe.calories + "<br>Protein: " + response.hits[i].recipe.digest[2].total + "g<br>Carbs: " + response.hits[i].recipe.digest[1].total + "g<br>Sodium: " + response.hits[i].recipe.digest[4].total  + "g</p></a>");

            recDiv.append(imgTag);
            recDiv.append(h5);

            $("#recipe-search-display").append(recDiv);
            $("#recipe-input").val("");

        }

    });
}

function userProfilePage() {
    $("#new-user").addClass("invisible");
    $("#name-check").addClass("invisible");
    $("#user-display").removeClass("invisible");
    $("#user-food-display").removeClass("invisible");
}

function newUserPage() {
    $("#name-check").addClass("invisible");
    $("#new-user").removeClass("invisible");
}

function homePageDisplay() {
    $("#name-check").removeClass("invisible");
    $("#user-display").addClass("invisible");
    $("#user-food-display").addClass("invisible");
    $("#nutrition").addClass("invisible");
    $("#recipeSearch").addClass("invisible");
}

function searchNutritionalFacts() {
    $("#name-check").addClass("invisible");
    $("#nutrition").removeClass("invisible");
}

function searchRecipes() {
    $("#name-check").addClass("invisible");
    $("#recipeSearch").removeClass("invisible");
}


$(".btn").on("click",function (event) {
    event.preventDefault();

    var btnType = $(this).val();
    console.log(btnType);
    if(btnType === "newUser") {
        newUserPage();
    } else if (btnType === "join" || btnType === "nameCheck"){
        userProfilePage();
    } else if (btnType === "logOut"){
        homePageDisplay();
    } else if (btnType === "recipe") {
        searchRecipes();
    } else if (btnType === "calSearch"){
        searchNutritionalFacts();
    } else if (btnType === "home"){
        homePageDisplay();
    } else if (btnType === "reciSearch"){
        var search = $("#recipe-input").val().trim();
        var diet = $("#dietSelectPref").val();
        // var health = $("#healthSelectPref").val();
        searchRecipes();
        searchRecipesQuery(search, diet);

    }

});
