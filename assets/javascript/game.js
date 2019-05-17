$(document).ready(function () {
    var resultList = [];
    var favList = [];
    var currentSelect = null;
    var newBTN = function () {
        event.preventDefault();
        var newSUB = $("#input").val().trim();
        var newBTN = $("<button>");
        newBTN.attr("id", newSUB);
        newBTN.attr("data-state", "default");
        newBTN.addClass("button");
        newBTN.text(newSUB);
        resultList.push(newSUB);
        console.log(resultList);
        localStorage.clear();
        localStorage.setItem("searchlist", JSON.stringify(resultList));
        renderPage();
        $("#input").val("");
    };
    var renderPage = function () {
        $("#buttonList").empty();
        for (var i = 0; i < resultList.length; i++) {
            var newSUB = resultList[i];
            var newBTN = $("<button>");
            newBTN.attr("id", newSUB);
            newBTN.attr("data-state", "default");
            newBTN.addClass("button");
            newBTN.text(newSUB);
            $("#buttonList").append(newBTN);
        }
    }
    var readStorage = function () {
        if (typeof localStorage.getItem("searchlist") !== typeof null) {
            resultList = JSON.parse(localStorage.getItem("searchlist"));
        }
        renderPage();
    }
    var searchGIF = function (term) {


        var key = "c3jwjWyqTWqKljMuLXLRmxYXuZfrT7iD";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=" + key;

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (response) {
            if (response.data != null) {
                var results = response.data;
                for (var i = 0; i < 10; i++) {
                    var gifBody = $("<img>");
                    var gifDiv = $("<div>");
                    var t = $("<div>");
                    var d = $("<div>");
                    gifBody.attr("src", results[i].images.original_still.url);
                    gifBody.attr("data-state", "still");
                    gifBody.attr("data-still", results[i].images.original_still.url);
                    gifBody.attr("data-animate", results[i].images.original.url);
                    gifBody.attr("id", term + i);
                    gifBody.addClass("imgClick");
                    gifDiv.addClass("imgContainer");
                    t.addClass("text");
                    t.text("Rating: " + response.data[i].rating);
                    d.addClass("download");
                    d.text("Download");
                    d.attr("data-id", term + i);
                    d.attr("taget", "_blank");
                    d.attr("download","download");
                    //d.attr("download", "newFile.gif");
                    gifDiv.append(t);
                    gifDiv.append(gifBody);
                    gifDiv.append(d);
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
                }
            };
            $(".download").click(function () {
                var id = $(this).attr("data-id")
                var myImage = document.getElementById(id);
                //var myImage = myDiv.children[0];
                console.log(id);
                console.log(myImage);
                // this.href = myImage.src;
                window.location.href = myImage.src;
                //$.fileDownload(myImage.src);

            });
            // $(".text").click(function () {
            //     var href = $('.downloadLink').attr('data-href');
            //     window.location.href = href;
            // });
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
    var multi = false;
    $("#multi").on("click", function () {
        if (multi === true) {
            multi = false;
        } else {
            multi = true;
        }
    });
    $("#submit").on("click", function () {
        if ($("#input").val() != "") {
            newBTN();
        };
    });
    $("#clear").on("click", function () {
        localStorage.clear();
        $("#imagesList").empty();
        $("#buttonList").empty();
        $("#buttonListFav").empty();
    });
    $("#submit").on("click", function () {
        if ($("#input").val() != "") {
            newBTN();
        };
    });



    var renderFav = function () {
        $("#buttonListFav").empty();
        for (var i = 0; i < favList.length; i++) {
            var newSUB = favList[i];
            var newBTN = $("<button>");
            newBTN.attr("id", newSUB);
            newBTN.attr("data-state", "default");
            newBTN.addClass("button");
            newBTN.text(newSUB);
            $("#buttonListFav").append(newBTN);
        }
    }

    var readFavorite = function () {
        if (typeof localStorage.getItem("favorite") !== typeof null) {
            favList = JSON.parse(localStorage.getItem("favorite"));
        }
        renderFav();
    }


    readStorage();
    readFavorite();
    $(document).on('click', ".button, .buttonClicked", function () {
        currentSelect = $(this).attr("id");
        if (multi === false) { $("#imagesList").empty(); };
        $(".buttonClicked").removeClass("buttonClicked").addClass("button");
        $(this).addClass("buttonClicked");
        $(this).removeClass("button");
        $(this).attr("data-state", "clicked");
        var id = $(this).attr("id");
        searchGIF(id);
    });
    $("#addFav").on("click", function () {
        console.log(currentSelect);
        favList.push(currentSelect);
        localStorage.setItem("favorite", JSON.stringify(favList));
        renderFav();
    });
    // $(".button").on("click",function () {
    //     console.log("clicked");
    //     searchGIF();
    // });

})
