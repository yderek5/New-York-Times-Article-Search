// SETUP VARIABLES
// ======================================
var authKey = "e083b39755224a519981ab9182a837ef";

// Search Terms
var queryTerm =   "";
var numResults =  0;
var startYear =   0;
var endYear =     0;

// URL Base
var querryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to Track number of articles
var articleCouner = 0;

// FUNCTIONS
// ======================================
function runQuery(numArticles, queryURL) {

  // AJAX function
  $.ajax({url: queryURL, method: "GET"})
  .done(function(NYTData) {
    console.log(NYTData);
  });
}

// MAIN PROCESSES
// ======================================

$("#searchButton").on("click", function() {
  runQuery();
  return false;
});

// 1. Retrieve user inputs and convert to variables
// 2. Use those variables to run on AJAX call to the New York Times.
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content

// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.
