var searchTerms = "";
var numResults = 0;
var startYear = "";
var endYear = "";
var apiKey = "05f7127720fe4860ae0de8bea8301d88";

var pullResults = function(){
	searchTerms = $("#terms").val();
	numResults = $("#num-results").val();
	startYear = $("#start").val();
	endYear = $("#end").val();

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
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

	console.log(queryURL);
	$.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {

	      	console.log(response);
	      	for (i in numResults){
	      		console.log(response.docs[i].web_url)
	      	}
	})
}




$(document).on("ready", function(){
$("#search").on("click", function(){
	console.log("click");
	pullResults();

})

$("#clear").on("click", function(){
	clearResults();


})
})