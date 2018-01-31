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
            calories();
            sodium();
            sugars();
            protein();

        })

    });
}

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

$(".btn").on("click",function (event) {
    event.preventDefault();

    btnType = $(this).val();

    if (btnType === "addItem"){
        displayFoodItem();
    } else if (btnType === "search-cal") {
        displayFoodSearchItem();
    } else if (btnType === "nutriSearch"){
        displayNutritionalResults();
    }
})

