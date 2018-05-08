console.log("Hello");
var characters = ["Harry Potter", "Ron Weasley", "Hermione Granger"];
function renderButtons() {
  console.log("render buttons called");
  $("#buttons-view").empty();
  for (var i = 0; i < characters.length; i++) {
    var a = $("<button>");
    a.addClass("character");
    a.attr("data-name", characters[i]);
    a.text(characters[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-character").on("click", function (event) {
  event.preventDefault();
  var characterAdded = $("#character-input").val();
  console.log(characterAdded);
  characters.push(characterAdded);
  console.log(characters);
  this.form.reset();
  renderButtons();
  console.log("characterAdded:", characterAdded);



});

function displaycharacterInfo() {
  console.log("display character info called");
  var character = $(this).attr("data-name");
  console.log(character);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    character + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#characters-view").empty();
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");

      var personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height_still.url);
      personImage.attr("data-still", results[i].images.fixed_height_still.url);
      personImage.attr("data-animate", results[i].images.fixed_height.url);
      personImage.attr("data-state", "still");
      personImage.attr("class", "gif");
      gifDiv.prepend(personImage);

      $("#characters-view").prepend(gifDiv);
    }
    $(".gif").on("click", function () {
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

}
$(document).on("click", ".character", displaycharacterInfo);

renderButtons();



