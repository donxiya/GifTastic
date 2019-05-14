
var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newSUB + "&api_key=dc6zaTOxFJmzC&limit=10";

var newBTN = function () {
    event.preventDefault();
    var newSUB = $("#input").val();
    var newBTN = $("<div>");
    newBTN.attr("id", newSUB);
    newBTN.addClass("button");
    newBTN.text(newSUB);
    $("#buttonList").append(newBTN);
}

var searchGIF = function () {
    var id = $(this).attr("id");
    var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + id + "&api_key=" + key;
    $.ajax({
        method: "GET",
        url: queryURL,
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifBody = $("<img>");
            gifBody.attr("src", results[i].images.fixed_height_still.url);
            gifBody.attr("data-state", "still");
            gifBody.attr("data-still", results[i].images.fixed_height_still.url);          
            gifBody.attr("data-animate", results[i].images.fixed_height.url);
            gifBody.addClass("imgClick");
            $("#imagesList").append(gifBody);
        }
    });
}




$(".imgClick").click(function () {



})



    .attr("data-state", still);

.attr("data-still", still);

.attr("data-animate", still);

 

 

 

})