function searchRecipes() {
    var queryURL = "https://api.edamam.com/search"

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
        data: {
            "app_id": "ba334122",
            "app_key": "559625546067efe571c6b8650185cc3d",
            "q": "chicken",
            "contentType": "application/json",
        }

    }).done(function (response) {
        console.log(response);
    });
}



// $("#new-usr").on("click", function (event) {
//     event.preventDefault();
//     $("#name-check").addClass("invisible");
//     $("#new-user").removeClass("invisible");

// });

// $("#join-btn").on("click", function (event) {
//     event.preventDefault();
//     $("#new-user").addClass("invisible");
//     $("#user-display").removeClass("invisible");
//     $("#user-food-display").removeClass("invisible");
// });

// $("#log-out").on("click", function (event) {
//     event.preventDefault();
//     $("#name-check").removeClass("invisible");
//     $("#user-display").addClass("invisible");
//     $("#user-food-display").addClass("invisible");
// });

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
    }
})
