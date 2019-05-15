var newBTN = function () {
    event.preventDefault();
    var newSUB = $("#input").val();
    var newBTN = $("<button>");
    newBTN.attr("id", newSUB);
    newBTN.attr("data-state", "default");
    newBTN.addClass("button");
    newBTN.text(newSUB);

    $("#buttonList").append(newBTN);
    $("#input").val("");
};

var searchGIF = function (term) {
    

    var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=" + key;

    $.ajax({
        method: "GET",
        url: queryURL,
    }).then(function (response) {
        if(response.data != null){
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifBody = $("<img>");
            var gifDiv = $("<div>");
            var p = $("<div>");
            gifBody.attr("src", results[i].images.original_still.url);
            gifBody.attr("data-state", "still");
            gifBody.attr("data-still", results[i].images.original_still.url);
            gifBody.attr("data-animate", results[i].images.original.url);
            gifBody.addClass("imgClick");
            gifDiv.addClass("imgContainer");
            p.addClass("text");
            p.text("Rating: "+response.data[i].rating);
            gifDiv.append(p);
            gifDiv.append(gifBody);
            $("#imagesList").append(gifDiv);
            // $(".imgClick").click(function () {
            //     var state = $(this).attr("data-state");
            //     if (state === "still") {
            //         console.log("animate");
            //         $(this).attr("src", $(this).attr("data-animate"));
            //         $(this).attr("data-state", "animate");
            //     } else {
            //         $(this).attr("src", $(this).attr("data-still"));
            //         $(this).attr("data-state", "still");
            //     }
            // });
        }};
        $(".imgClick").click(function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
};


// $(document).on('click', '.imgClick', function () {
//     var state = $(this).attr("data-state");
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });
$("#submit").on("click", function () {
    if ($("#input").val() != "") {
        newBTN();
    };
});
$(document).on('click', ".button, .buttonClicked", function () {
    $("#imagesList").empty();
    $(".buttonClicked").removeClass("buttonClicked").addClass("button");
    $(this).addClass("buttonClicked");
    $(this).removeClass("button");
    $(this).attr("data-state", "clicked");
    var id = $(this).attr("id");
    searchGIF(id);
});
// $(".button").on("click",function () {
//     console.log("clicked");
//     searchGIF();
// });
