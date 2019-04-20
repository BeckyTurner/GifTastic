$(document).ready(function () {

    var tvShows = ["The Big Bang Theory", "Empire", "Friends", "That 70s Show",
        "Breaking Bad", "Game of Thrones", "The Walking Dead", "Grey's Anatomy",
        "House of Cards", "The Simpsons", "Orange is the New Black", "The Office",
        "Grace and Frankie", "American Horror Story", "Arrested Development"];
    console.log(tvShows);

    //function to render the buttons
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

            // loop over query results
            for (var i = 0; i < results.length; i++) {
                //storing the rating in a var
                var rating = response.data[i].rating
                //making divs for the gifs and rating
                var newDiv = $("<div class='gifs'>");
                var imageDiv = $("<img>").addClass("images");
                var ratingP = $('<p class="rating">Rating: ' + rating + '</p>')
                console.log(rating);

                //appending the gif and the rating
                newDiv.append(imageDiv, ratingP)
                imageDiv.attr("src", results[i].images.fixed_height_still.url)
                    //giving attr's to the still/animated gifs
                    .attr("still", response.data[i].images.fixed_height_still.url)
                    .attr("animate", response.data[i].images.fixed_height.url)
                $("#gifs-go-here").append(newDiv);

            }
        });
    });

    // function to switch between still and animated gifs

    function animate() {
        var img = $(this).attr("src");
        switch (img) {
            case $(this).attr("still"):
                $(this).attr("src", $(this).attr("animate"))
                break;
            case $(this).attr("animate"):
                $(this).attr("src", $(this).attr("still"))
                break;
            default:
                break;
        }
    };
    //calling the animate function when images are clicked on 
    $(document).on("click", ".images", animate);
});