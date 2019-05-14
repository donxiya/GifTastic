var newBTN = function () {
    event.preventDefault();
    var newSUB = $("#input").val();
    var newBTN = $("<div>");
    newBTN.attr("id", newSUB);
    newBTN.addClass("button");
    newBTN.text(newSUB);
    $("#buttonList").append(newBTN);
};

var searchGIF = function (term) {
    console.log("clicked");
    var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=" + key;
    console.log(queryURL);
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
};
// $(".imgClick").click(function () {
//     console.log("clicked img");
//     var state = $(this).attr("data-state");
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });
$(document).on('click', '.imgClick', function () {
    console.log("clicked img");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
$("#submit").on("click", function () {
    newBTN();
});
$(document).on('click', '.button', function () {
    $("#imagesList").empty();
    console.log("clicked");
    var id = $(this).attr("id");
    searchGIF(id);
});
// $(".button").on("click",function () {
//     console.log("clicked");
//     searchGIF();
// });