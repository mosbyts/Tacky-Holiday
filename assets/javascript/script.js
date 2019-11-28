$(document).ready(function(){
//<!--GIPHY AJAX CALL START--!>//
  function getGifs(getVal){
    var queryURLSearch = "https://api.giphy.com/v1/gifs/search?q=" + getVal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=3";
    $.ajax({
      url: queryURLSearch,
      method: "GET"
    }).then(function(response){
      var results = response.data;
      for(var x = 0; x < results.length; x++){
//Display each gif
        var animatedGif = results[x].images.original.url;
        var stillGif = results[x].images.fixed_height_still.url;
        var actualGifDisplay = $("<img>", {src: animatedGif, "data-still": stillGif, "data-animate": animatedGif, "data-state": "animate"}).addClass("gif");
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
  //When the user clicks a still GIPHY image, the gif should animate. If the user clicks an animated gif, the gif should stop playing.
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
//<!--GIPHY AJAX CALL END--!>//
