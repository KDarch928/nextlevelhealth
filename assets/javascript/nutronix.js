var caloriesVal = 0;
var sodiumVal = 0;
var sugarsVal = 0;
var proteinVal = 0;

function displayFoodItem() {
    var foodItem = $("#food-name-input").val().trim();
    console.log(foodItem);
    var postURL = "https://api.nutritionix.com/v1_1/search";
    $.ajax({
        url: postURL,
        method: "POST",
        dataType: "json",
        data: {
            "appId": "e9a7abab",
            "appKey": "d76830f8477da39c6c738320d221e4d1",
            "query": foodItem,
            "contentType": "application/json",
            "filters": {
                "not": {
                    "item_type": 2
                }
            }
        }

    }).then(function(response) {
        console.log(response);
        var foodItemId = response.hits[0]._id;
// <<<<<<< HEAD
        var foodItemName = response.hits[0].fields.item_name;
        console.log(foodItemName);
        console.log(foodItemId);

        var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";
        $.ajax({
            url: getURL,
            method: "GET"
        }).then(function(item) {
            function calories() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].unit === "kcal") {
                        caloriesVal += item.label.nutrients[i].value;
                        console.log(caloriesVal);
                        $("#calories-div").empty()
                        $("#calories-div").append("Calories: " + caloriesVal);
                    }
                }
            };

            function sodium() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Sodium" || item.label.nutrients[i].name === "Sodium, Na") {
                        sodiumVal += item.label.nutrients[i].value;
                        $("#sodium-div").empty()
                        $("#sodium-div").append("Sodium: " + sodiumVal + "g");

                    }
                }
            }

            function sugars() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Sugars" || item.label.nutrients[i].name === "Sugars, total") {
                        sugarsVal += item.label.nutrients[i].value;
                        $("#sugars-div").empty()
                        $("#sugars-div").append("Sugars: " + sugarsVal + "g");
                    }
                }
            }

            function protein() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Protein") {
                        proteinVal += item.label.nutrients[i].value;
                        $("#protein-div").empty()
                        $("#protein-div").append("Protein: " + proteinVal + "g");
                    }
                }
            }
            var date = moment().format("MMM Do YY");
            $("#date-div").empty();
            $("#date-div").append(date);
            calories();
            sodium();
            sugars();
            protein();

        })

    });
};

function displayNutritionalResults() {
    var foodItem = $("#food-item-input").val().trim();
    console.log(foodItem);
    var postURL = "https://api.nutritionix.com/v1_1/search";
    $.ajax({
        url: postURL,
        method: "POST",
        dataType: "json",
        data: {
            "appId": "e9a7abab",
            "appKey": "d76830f8477da39c6c738320d221e4d1",
            "query": foodItem,
            "contentType": "application/json",
            "filters": {
                "not": {
                    "item_type": 2
                }
            }
        }

    }).then(function (response) {
        var foodItemArray = response.hits.length;

        for (var i = 0; i < foodItemArray; i++) {
            var foodItemId = response.hits[i]._id;
            var foodItemName = response.hits[i].fields.item_name;
            console.log("Food Item Id: " + foodItemId);
            console.log("Food Item Id: " + foodItemName);

            var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";
            $.ajax({
                url: getURL,
                method: "GET"
            }).then(function (item) {
                console.log(item);

                function calories() {
                    for (var i = 0; i < item.label.nutrients.length; i++) {
                        if (item.label.nutrients[i].unit === "kcal") {
                            var caloriesValSearch = item.label.nutrients[i].value;
                            console.log(caloriesVal);
                            return caloriesValSearch
                        }
                    }
                };

                function sodium() {
                    for (var i = 0; i < item.label.nutrients.length; i++) {
                        if (item.label.nutrients[i].name === "Sodium" || item.label.nutrients[i].name === "Sodium, Na") {
                            var sodiumValSearch = item.label.nutrients[i].value;
                            return sodiumValSearch;

                        }
                    }
                }

                function sugars() {
                    for (var i = 0; i < item.label.nutrients.length; i++) {
                        if (item.label.nutrients[i].name === "Sugars" || item.label.nutrients[i].name === "Sugars, total") {
                            var sugarsValSearch = item.label.nutrients[i].value;
                            return sugarsValSearch;
                        }
                    }
                }

                function protein() {
                    for (var i = 0; i < item.label.nutrients.length; i++) {
                        if (item.label.nutrients[i].name === "Protein") {
                            var proteinValSearch = item.label.nutrients[i].value;
                            return proteinValSearch
                        }
                    }
                }
                var foodDiv = $("<div class='item' style='margin-top: 2%;'>");
                var cal = calories();
                var sod = sodium();
                var sug = sugars();
                var prot = protein();

                var h5 = $("<h5>").text(item.name);

                var p = $("<p>").text("Calories: " + cal + " | Protein: " + prot + "g | Sugar: " + sug + "g | Sodium: " + sod + "g");

                foodDiv.append(h5);
                foodDiv.append(p);

                $("#food-search-display").append(foodDiv);

            });

        }
        $("food-item-input").val("");

    });
}


function displayFoodSearchItem() {
    // event.preventDefault();
    var foodItem = $("#food-name-input").val().trim();
    console.log(foodItem);
    var postURL = "https://api.nutritionix.com/v1_1/search";
    $.ajax({
        url: postURL,
        method: "POST",
        dataType: "json",
        data: {
            "appId": "e9a7abab",
            "appKey": "d76830f8477da39c6c738320d221e4d1",
            "query": foodItem,
            "contentType": "application/json",
            "filters": {
                "not": {
                    "item_type": 2
                }
            }
        }

    }).then(function(response) {
        console.log(response);
        var foodItemId = response.hits[0]._id;
        var foodItemName = response.hits[0].fields.item_name;

        console.log(foodItemName);
        console.log(foodItemId);
        var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";
        $.ajax({
            url: getURL,
            method: "GET"
        }).then(function(item) {

            function calories() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].unit === "kcal") {
                        var caloriesValSearch = item.label.nutrients[i].value;
                        console.log(caloriesVal);
                        $("#calories-dis").empty()
                        $("#calories-dis").append(caloriesValSearch);
                    }
                }
            };

            function sodium() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Sodium" || item.label.nutrients[i].name === "Sodium, Na") {
                        var sodiumValSearch = item.label.nutrients[i].value;
                        $("#sodium-dis").empty()
                        $("#sodium-dis").append(sodiumValSearch + "g");

                    }
                }
            }

            function sugars() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Sugars" || item.label.nutrients[i].name === "Sugars, total") {
                        var sugarsValSearch = item.label.nutrients[i].value;
                        $("#sugars-dis").empty()
                        $("#sugars-dis").append(sugarsValSearch + "g");
                    }
                }
            }

            function protein() {
                for (var i = 0; i < item.label.nutrients.length; i++) {
                    if (item.label.nutrients[i].name === "Protein") {
                        var proteinValSearch = item.label.nutrients[i].value;
                        $("#protein-dis").empty()
                        $("#protein-dis").append(proteinValSearch + "g");
                    }
                }
            }
            $("#food-display").removeClass("invisible");
            $("#food-type").empty();
            $("#food-type").attr("value", foodItemName);
            $("#food-type").append(foodItemName);
            calories();
            sodium();
            sugars();
            protein();
            $("#add-btn").empty();
            $("#add-btn").append("<button type='button' class='btn btn-link' id='add-food' value='addItem'>ADD</button>")
            $("food-name-input").val("");

        })


    });
}


  var config = {
    apiKey: "AIzaSyA4mt7TWZsmk0r1nApx-22HwGk-tLHUPSM",
    authDomain: "next-level-health-ce659.firebaseapp.com",
    databaseURL: "https://next-level-health-ce659.firebaseio.com",
    projectId: "next-level-health-ce659",
    storageBucket: "",
    messagingSenderId: "992118837999"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#new-usr").on("click", function (event) {
    event.preventDefault();
    $("#name-check").addClass("invisible");
    $("#new-user").removeClass("invisible");

});

$("#join-btn").on("click", function (event) {
    event.preventDefault();
    $("#new-user").addClass("invisible");
    $("#user-display").removeClass("invisible");
    $("#user-food-display").removeClass("invisible");

    var userName = $("#join-name-input").val().trim();
    var target = $("#goal-input").val().trim();
    var startDate = $("#start-input").val().trim();

    console.log(userName);
    console.log(target);
    console.log(startDate);
    database.ref().update({
        name: userName + "-" + target + "-" + startDate
    })
});

$("#log-out").on("click", function (event) {
    event.preventDefault();
    $("#name-check").removeClass("invisible");
    $("#user-display").addClass("invisible");
    $("#user-food-display").addClass("invisible");
});


$("#saveDate").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    var date = moment().format("MMM Do YY");
    $("#date-div").empty();
    $("#date-div").append(date);
    // grabbing user inputs
    // var sugarsDayVal = $("#sugars-div").val().trim();
    // var proteinDayVal = $("#protein-div").val().trim();
    // var caloriesDayVal = $("#calories-div").val().trim();
    // var sodiumDayVal = $("#sodium-div").val().trim();

    console.log(sugarsVal);
    console.log(proteinVal);
    console.log(caloriesVal);
    console.log(sodiumVal);
    // push user inputs to database
    database.ref().push({
        date: date,
        sugars: sugarsVal,
        protein: proteinVal,
        calories: caloriesVal,
        sodium: sodiumVal
        
    }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    };
});
// $(document).on("click", "#addItem", displayFoodItem);

$(document).on("click", ".btn", function (event) {
    event.preventDefault();

    btnType = $(this).val();
    console.log(btnType);
    if (btnType === "addItem"){
        displayFoodItem();
    } else if (btnType === "search-cal") {
        displayFoodSearchItem();
    } else if (btnType === "nutriSearch"){
        displayNutritionalResults();
    }
})


