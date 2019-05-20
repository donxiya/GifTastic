$(document).ready(function () {
    var resultList = [];
    var favList = [];
    var currentSelect = null;
    var newBTN = function () {
        event.preventDefault();
        var newSUB = $("#input").val().trim();
        
            console.log("new");
            var newBTN = $("<button>");
            newBTN.attr("id", newSUB);
            newBTN.attr("data-state", "default");
            newBTN.addClass("button");
            newBTN.text(newSUB);
            resultList.push(newSUB);
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
                    d.attr("download", "download");
                    gifDiv.append(t);
                    gifDiv.append(gifBody);
                    gifDiv.append(d);
                    $("#imagesList").append(gifDiv);

                }
            };
            var forceDownload = function (blob, filename) {
                var a = document.createElement('a');
                a.download = filename;
                a.href = blob;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
            $(".download").click(function () {
                var id = $(this).attr("data-id")
                var myImage = document.getElementById(id);
                var filename = id;
                var url = $(myImage).attr("data-animate");
                fetch(url, {
                    headers: new Headers({
                        'Origin': location.origin
                    }),
                    mode: 'cors'
                })
                    .then(
                        function (response) { return response.blob() })
                    .then(
                        function (blob) {
                            var blobUrl = window.URL.createObjectURL(blob);
                            forceDownload(blobUrl, filename);
                        })
            });
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

    var multi = false;
    $("#multi").on("click", function () {
        if (multi === true) {
            multi = false;
            $(this).addClass("buttonToggle");
            $(this).removeClass("buttonToggleClicked");
            $(this).text("Multiple Tags Off");

        } else {
            multi = true;
            $(this).addClass("buttonToggleClicked");
            $(this).removeClass("buttonToggle");
            $(this).text("Multiple Tags On");

        }
    });

    $("#clear").on("click", function () {
        $("#imagesList").empty();
        $("#buttonList").empty();
        $("#buttonListFav").empty();
        resultList = [];
        favList = [];
        localStorage.clear();
    });
    $("#submit").on("click", function () {
        if ($("#input").val() != "") {
            var listCheck = $("#input").val();
            if (resultList.includes(listCheck)===false) {
            newBTN();}
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
        if (currentSelect != null) {
            if (favList.includes(currentSelect)===false) {
        favList.push(currentSelect);
        localStorage.setItem("favorite", JSON.stringify(favList));
        renderFav();}}
    });
})
