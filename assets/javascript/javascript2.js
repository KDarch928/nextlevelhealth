// TO-DO: CALCULATE MONTHS

// ------------------------------------ initializing firebase
var config = {
    var config = {
    apiKey: "AIzaSyDfINRoIbVddXr_n7YhTGznzAodTqaNdfg",
    authDomain: "employeeddatamanagement.firebaseapp.com",
    databaseURL: "https://employeeddatamanagement.firebaseio.com",
    projectId: "employeeddatamanagement",
    storageBucket: "employeeddatamanagement.appspot.com",
    messagingSenderId: "113748641322"
    }
};

firebase.initializeApp(config);
var database = firebase.database();

var date = 0;

$("#saveDate").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();
    date++;
    $("#date-div").append(date);
    // grabbing user inputs
    var sugars = $("#sugars-div").val().trim();
    var protein = $("#protein-div").val().trim();
    var calories = $("#calories-div").val().trim();
    var sodium = $("#sodium-div").val().trim();

    // push user inputs to database
    database.ref().push({
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

    // creating a new table row and its cells
    // var tr = $("<tr>");
    // var nametd = $("<td>");
    // var roletd = $("<td>");
    // var starttd = $("<td>");
    // var monthtd = $("<td>");
    // var ratetd = $("<td>");
    // var billtd = $("<td>");

    // calculating number of months worked
    // var month = moment(childSnapshot.val().start).diff(moment(), "months", true);
    // var month = 12;

    // // multiply number of months times monthly rate
    // var bill = month * parseInt(childSnapshot.val().rate);

    // // adding database values to table
    // nametd.text(childSnapshot.val().name);
    // roletd.text(childSnapshot.val().role);
    // starttd.text(childSnapshot.val().start);
    // monthtd.text(month);
    // ratetd.text(childSnapshot.val().rate);
    // billtd.text(bill);

    // // assembling new table row and adding it to existing table
    // tr.append(nametd).append(roletd).append(starttd).append(monthtd).append(ratetd).append(billtd);
    // $("table").append(tr);
});
// var date = 0;
// function save(event) {
//     event.preventDefault();
//     date++; 


// }

// $(document).on("click", "#saveDate", save);