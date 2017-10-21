var searchTerms = "";
var numResults = 0;
var startYear = "";
var endYear = "";
var apiKey = "05f7127720fe4860ae0de8bea8301d88";

var pullResults = function(){
	searchTerms = $("#terms").val();
	numResults = $("#num-results").val();
	startYear = $("#start-year").val();
	endYear = $("#end-year").val();

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	queryURL += "&q=" + searchTerms + "&page=1";
	if (startYear !== ""){
		startYear += "0101";
		queryURL += "&begin_date=" + startYear;
	}
	if (endYear !== ""){
		endYear += "1231";
		queryURL += "&end_date=" + endYear;
	}
	queryURL += "&api-key=05f7127720fe4860ae0de8bea8301d88";


	$.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {

	      	console.log(response);


	});

};



$("#search").on("click", function(){
	pullResults();

});

$("#clear").on("click", function(){
	clearResults();


});