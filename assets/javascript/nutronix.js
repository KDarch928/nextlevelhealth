var caloriesVal = 0;
var sodiumVal = 0;
var sugarsVal = 0;
var proteinVal = 0;
    function displayFoodItem (event){
        event.preventDefault();
        var foodItem = $("#food-name-input").val().trim();
        console.log(foodItem);
        var postURL = "https://api.nutritionix.com/v1_1/search";
        $.ajax({
              url: postURL,
              method: "POST",
              dataType: "json",
              data: {
              "appId":"e9a7abab",
              "appKey":"d76830f8477da39c6c738320d221e4d1",
              "query": foodItem,
              "contentType":"application/json",
              "filters":{
                "not":{
                 "item_type":2
                }
              }
            }
          
        }).then(function(response) {
            console.log(response);
            var foodItemId = response.hits[0]._id;
            console.log(foodItemId);
            var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";
        $.ajax({
              url: getURL,
              method: "GET"
        }).then(function(item){
            console.log(item);
        function calories(){
            for(var i = 0; i < item.label.nutrients.length; i++){
                if(item.label.nutrients[i].unit === "kcal"){
                    caloriesVal += item.label.nutrients[i].value;
                    console.log(caloriesVal);
                    $("#calories-div").empty()
                    $("#calories-div").append("Calories: " + caloriesVal);
                }
            }
        };
        function sodium(){
            for(var i = 0; i < item.label.nutrients.length; i++){
                if(item.label.nutrients[i].name === "Sodium" || item.label.nutrients[i].name === "Sodium, Na"){
                    sodiumVal += item.label.nutrients[i].value;
                    $("#sodium-div").empty()
                    $("#sodium-div").append("Sodium: " + sodiumVal + "g");
                    
                }
            }
        }
        function sugars(){
            for(var i = 0; i < item.label.nutrients.length; i++){
                if(item.label.nutrients[i].name === "Sugars" || item.label.nutrients[i].name === "Sugars, total"){
                    sugarsVal += item.label.nutrients[i].value;
                    $("#sugars-div").empty()
                    $("#sugars-div").append("Sugars: "+ sugarsVal + "g");
                }
            }
        }
        function protein(){
            for(var i = 0; i < item.label.nutrients.length; i++){
                if(item.label.nutrients[i].name === "Protein"){
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
          // Creating a div to hold the movie
          
        });
    }

    $(document).on("click", "#addItem", displayFoodItem);