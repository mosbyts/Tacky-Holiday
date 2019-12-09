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

//<!--JOKE GENERATOR START--!>//
  $("#jokeDisplay").hide();

  var jokes = ["What do Santa's elves learn in school? The Elfabet!", "What is Frosty the Snowman's favorite cereal? Snowflakes!", "What type of cars do elves drive? Toy-otas!", "What is a parent's favorite Christmas carol? Silent Night!", "What kind of music do elves like? 'Wrap' Music!", "What do you call a snowman with a six-pack? An abdominal snowman!", "What does the Gingerbread Man use to make his bed? Cookie sheets!"]

  function generateJoke(){
    for(var i = 0; i < jokes.length; i++){
      var randomNum = Math.floor(Math.random() * i);
      console.log(randomNum)
      var newJoke = jokes[randomNum];
      console.log(newJoke);
    };
    $("#jokeDisplay").append(newJoke)
  };

  $("#jokeBtn").on("click", function(event){
    event.preventDefault();
    $("#jokeDisplay").empty();
    $("#jokeDisplay").show();
    generateJoke();
  });
//<!--JOKE GENERATOR END--!>//
