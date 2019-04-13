$(document).ready(function () {

    var tvShows = ["The Big Bang Theory", "Empire", "Friends", "That 70s Show",
        "Breaking Bad", "Game of Thrones", "The Walking Dead", "Grey's Anatomy",
        "House of Cards", "The Simpsons", "Orange is the New Black", "The Office",
        "Grace and Frankie", "American Horror Story", "Arrested Development"];
    console.log(tvShows);

    function renderButtons() {
        $("#view-buttons").empty();

        for (var i = 0; i < tvShows.length; i++) {

            var newButton = $("<button class='btn btn-primary btn-lg active'>");
            newButton.attr("data-show", tvShows[i]);
            newButton.text(tvShows[i]);

            $("#view-buttons").append(newButton);
        }
    }
    renderButtons();


    // renders buttons to DOM
    $("#add-tvShow").on("click", function (event) {
        event.preventDefault();
        var show = $("#tvShow-input").val().trim();

        if (!show == " ") {
            tvShows.push(show);
            renderButtons();
            console.log(tvShows);
            show = $("#tvShow-input").val(" ");
        }
    });


    $("#view-buttons").on("click", ".btn-primary", function () {
        $("#gifs-go-here").empty();
        var tv = $(this).attr("data-show");
        // replaces the spaces in a string with a dash for the search
        tv = tv.replace(/ /g, '-');
        console.log(tv);

        // api key info
        var apiKey = "Gl4tw6G44aDvgYw6Mq7z1z8WaNgIZwZC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tv + "&api_key=" + apiKey + "&limit=10";

        //testing the query
        console.log(queryURL);

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var rating = response.data[i].rating 
                var newDiv = $("<div class='gifs'>");
                var imageDiv = $("<img>").addClass("images");
                var ratingP = $('<p class="rating">Rating: ' + rating + '</p>')
                console.log(rating);
                
                newGIFS.attr("src", results[i].images.fixed_height_still.url);
                newGIFS.attr("alt", "missing gif");
                newGIFS.attr("id", "new-gif" + i);
                newGIFS.append(ratingP);

                $("#gifs-go-here").append(newGIFS);
            }
        });
    });
});