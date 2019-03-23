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
    // Grabbing and storing the data-animal property value from the button
    $("#imageDisplay").empty();
    var animal = $(this).attr("data-name");
    console.log(this);

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=TIYiADDeCV4ZlO6n3oUTGqMbl0VvM7xC&limit=10&fixed_height_small_still";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        // console.log(queryURL);
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#imageDisplay").prepend(animalDiv);
        }
      });
  });

