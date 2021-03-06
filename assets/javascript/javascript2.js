// TO-DO: CALCULATE MONTHS

// ------------------------------------ initializing firebase


  // Initialize Firebase
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



$("#saveDate").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    var date = moment().format("MMM Do YY");
    console.log(date);
    $("#date-div").empty();
    $("#date-div").append(date);
    // grabbing user inputs
    var sugars = $("#sugars-div").val().trim();
    var protein = $("#protein-div").val().trim();
    var calories = $("#calories-div").val().trim();
    var sodium = $("#sodium-div").val().trim();

    console.log(sugars);
    console.log(protein);
    console.log(calories);
    console.log(sodium);
    // push user inputs to database
    database.ref().push({
        date: date,
        sugars: sugars,
        protein: protein,
        calories: calories,
        sodium: sodium

    }), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    };
});

// pulling information from database
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    $("#calories-div").empty();
    $("#sodium-div").empty();
    $("#protein-div").empty();
    $("#sugars-div").empty();


});
