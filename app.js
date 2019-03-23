//...create a topics array........................................................
var topics = ["cats", "pandas", "pugs", "monkeys", "ligers"];

//...making new buttons from array.........................................................................
function renderButtons() {
    $("#buttonRow").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("animal");
      a.attr("data-name",topics[i]);
      a.text(topics[i]);
      $("#buttonRow").append(a);
    }
  }

  //...this handles the click to add a button......................................................
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    newTopic = $("#animalSearch").val().trim();
    topics.push(newTopic);
    console.log(topics);
    renderButtons();
  });

  renderButtons();

//...use the buttons to search GIPHY API.......................................................

$(".animal").on("click", function() {
    $("#imageDisplay").empty();
    var animal = $(this).attr("data-name");
    console.log(this);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=TIYiADDeCV4ZlO6n3oUTGqMbl0VvM7xC&limit=10&fixed_height_small_still";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {;
        console.log(response);
        var results = response.data;
//...make a for loop to append the animal images to the DOM.......................................
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#imageDisplay").prepend(animalDiv);
        }
      });
  });

