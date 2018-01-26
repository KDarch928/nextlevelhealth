$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    var address = $("#addressInput").val().trim();

    var newAddress = address.replace(/\s/g, "+");
    console.log(newAddress);

    // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.eatstreet.com/publicapi/v1/restaurant/search?method=delivery&street-address=316+W.+Washington+Ave.+Madison,+WI";

    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.eatstreet.com/publicapi/v1/restaurant/search?method=delivery&street-address=" + newAddress;

    $.ajax({
        url: queryURL,
        headers: {
            "X-Access-Token": "0d745da6277ee594"
        },
        method: 'GET'
    }).done(function(response) {
        console.log(response);
    });
});
