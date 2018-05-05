console.log("Hello");
var movies = ["Minions", "Kungfu Panda", "Avengers", "The Lion King"];
function renderButtons() {
    $("#movies-view").empty();
    for (var i = 0; i < movies.length; i++) {
        $('#movies-view').append('<button type="button" class="btn btn-dark">' + movies[i] + '</button>&nbsp;&nbsp;').trigger('create');
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    var movieAdded = $("#movie-input").val();
    console.log(movieAdded);
    movies.push(movieAdded);
    console.log(movies);
    this.form.reset();
    renderButtons();
});
renderButtons();