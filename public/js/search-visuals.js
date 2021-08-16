$(document).ready(function () {
    var url = window.location.href;
    var searchValue = url.split('=')[1];
    
    /* On load changes */
    $("#previous").addClass("disable-click"); 
    $('#companyListContainer div.resultsFoundCard:last').css("margin-bottom","20px");
    
    /* This checks if the search is able to return a company, if succcessful the card will 
       display the number of companies matching the search query. */
    if ($(".resultsFoundCard")[0]) {
        var numberOfCompaniesSearch = $(".resultsFoundCard").length;
        numberOfCompaniesSearch = numberOfCompaniesSearch.toString();
    
        $("#resultsCountCard").text("There are ("+ numberOfCompaniesSearch +")" + " results found for: " + searchValue);
    } 
    else {
    
        $("#resultsCountCard").hide();
        $(".paginationContainer").hide();
        
        if (window.location.href.indexOf("?") != -1) {
            $("#noResultsFoundCard").text("There are (0) results found for: " +searchValue);
            $("#noResultsParentCard").css("background-color","#299b04");
            $('#noResultsFoundCard').css('color','white');
            $('#noResultsFoundCard').css('padding','15px');
        }   
        else {
            $("#noResultsFoundCard").text("No search has been made yet.");
        }        
    }
})

