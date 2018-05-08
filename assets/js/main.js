console.log("Hello");
var characters = ["Harry Potter", "Ron Weasley", "Hermione Granger"];
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < characters.length; i++) {
    var a = $("<button>");
    // Adds a class of character to our button
    a.addClass("character");
    // Added a data-attribute
    a.attr("data-name", characters[i]);
    // Provided the initial button text
    a.text(characters[i]);
    // Added the button to the buttons-view div
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
      personImage.attr("src", results[i].images.fixed_height.url);

      // gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#characters-view").prepend(gifDiv);
    }
  });

}
$(document).on("click", ".character", displaycharacterInfo);

renderButtons();

