$(document).ready(function() {

//array of animals
var animals = ["cat", "dog", "squirrel", "horse", "bear"];


//buttons
function displayButtons(){
        $("#keywords").empty();

                for (var i = 0; i < animals.length; i++){
                    var gifButton = $("<button>");
                    gifButton.addClass("animal")
                    gifButton.addClass("btn btn-dark");
                    gifButton.attr("data-name", animals[i]);
                    gifButton.text(animals[i]);
                    $("#keywords").append(gifButton);
                }
};

displayButtons();

//add new button
function addNewButton(){
        $("#submitAnimal").on("click", function(){
                event.preventDefault();
                var userEntry = $("#input").val().trim();
                animals.push(userEntry);
                
                if (userEntry === ""){
                    return false;
                }
                displayButtons();                
        });
};

addNewButton();

function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9sbMWFRFOmEk0mCgcWFRTCeswi10K9f6&q=" + action + "&limit=10";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    
    .then(function(response) {
        console.log(response);
        $("#gifs").empty();
        var results = response.data;
        
                for (var i = 0; i < results.length; i++){
                   var newDiv = $("<div>");
                   newDiv.addClass("animalGifs")

                   var rating = $("<p>").text("Rating: " + results[i].rating);
                   newDiv.append(rating);
                    console.log(rating);
                   var gifImage = $("<img>");

                   gifImage.attr("src");
                   gifImage.attr("data-still");
                   gifImage.attr("data-animate");
                   gifImage.attr("data-state", "still");

                   gifImage.addClass("image");

                   newDiv.append(gifImage);

                   $("#gifs").prepend(newDiv);


                }
        
        });
    
    };

$(document).on("click", ".animal", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }
    else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});
});