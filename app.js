// SETUP VARIABLES
// ======================================
var authKey = "e083b39755224a519981ab9182a837ef";

// Search Terms
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to Track number of articles
var articleCouner = 0;

// FUNCTIONS
// ======================================
function runQuery(numArticles, queryURL) {

  // AJAX function
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(NYTData) {
      // Logging to Console
      console.log("--------------");
      console.log(queryURL);
      console.log("--------------");
      console.log(NYTData);
      console.log(numArticles);

      // Clear the wells from the previous run
      $("#wellSection").empty();
      for (var i = 0; i < numArticles; i++) {
        console.log(NYTData.response.docs[i].headline.main);
        console.log(NYTData.response.docs[i].section_name);
        console.log(NYTData.response.docs[i].pub_date);
        console.log(NYTData.response.docs[i].byline.orginal);
        console.log(NYTData.response.docs[i].web_url);

        // Start Dumping to HTML Here
        var wellSection = $("<div>");
        wellSection.addClass("well");
        wellSection.attr("id", "articleWell" + i);
        $("#wellSection").append(wellSection);

        // Check if things exist
        if(NYTData.response.docs[i].headline != "null") {
          console.log(NYTData.response.docs[i].headline.main);
          $("#articleWell" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
        }

        // Check if the byline exist
        if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
          console.log(NYTData.response.docs[i].byline.original);
          $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
        }

        // Attch the content to the appropriate well
        $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
        $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
        $("#articleWell" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

        console.log(NYTData.response.docs[i].section_name);
        console.log(NYTData.response.docs[i].pub_date);
        console.log(NYTData.response.docs[i].web_url);

      }
    });
}

// MAIN PROCESSES
// ======================================

$("#searchBtn").on("click", function() {
  // Get search term
  queryTerm = $("#search").val().trim();

  // Add in the Search Term
  var newURL = queryURLBase + "&q=" + queryTerm;

  // Get the number of records
  numResults = $("#numRecords").val();

  // get the start year and end year
  startYear = $("#startYear").val().trim();
  endYear = $("#endYear").val().trim();

  if (parseInt(startYear)) {

    // Add the necessary fields
    startYear = startYear + "0101";
    // Add the date information to the URL
    newURL = newURL + "&begin_date=" + startYear;
  }

  if (parseInt(endYear)) {

    // Add the necessary fields
    endYear = endYear + "0101";
    // Add the date information to the URL
    newURL = newURL + "&end_date=" + endYear;
  }

  // Send the AJAX Call the newly assembled URL
  runQuery(numResults, newURL);
  return false;
});

// 1. Retrieve user inputs and convert to variables
// 2. Use those variables to run on AJAX call to the New York Times.
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content
// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.
