$(document).ready(function(){
    function getGifs(getVal){
      var queryURLSearch = "https://api.giphy.com/v1/gifs/search?q=" + getVal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
      console.log(queryURLSearch);
      $.ajax({
        url: queryURLSearch,
        method: "GET"
      }).then(function(response){
        var results = response.data;
        console.log(results);
        for(var x = 0; x < results.length; x++){
//Display each gif
          var actualGif = results[x].images.original.url;
          var imageGif = results[x].images.fixed_height_still.url;
          var actualGifDisplay = $("<img>", {src: actualGif, "data-still": imageGif, "data-animate": actualGif, "data-state": "animate"}).addClass("gif");
          $("#gifDisplay").append(actualGifDisplay);
        }
      });
    };
    $("button").on('click', function(event){
      var eventId = event.currentTarget.id;
      if (eventId === 'searchBtn'){
          event.preventDefault();
          var getVal = $("#searchBar").val();
          $("#gifDisplay").empty();
          getGifs(getVal);
      }
    });
    });
    //When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
