$(document).ready(function () {
    
    // This function just toggles the gray background color for the card
    $(".resultsFoundCard").hover(function(){
        $(this).children().css("background-color","#dbdbdb");
      },
      function(){
        $(this).children().css("background-color","#FFFFFF");
      });


      /*
      This checks if the search is able to return a company, if succcessful the card will 
      display the number of companies matching the search query.*/
      
      var url = window.location.href;
      var searchValue = url.split('=')[1];

      if ($(".resultsFoundCard")[0]){
        var numberOfCompaniesSearch = $(".resultsFoundCard").length; //returns number of companies
        numberOfCompaniesSearch = numberOfCompaniesSearch.toString();

        $("#resultsCountCard").text("There are ("+ numberOfCompaniesSearch +")" + " results found for: " + searchValue);
        

    } else {

        $("#resultsCountCard").hide();
        $(".paginationContainer").hide();
        
        if (window.location.href.indexOf("?") != -1){
            $("#noResultsFoundCard").text("There are (0) results found for: " +searchValue);
            $("#noResultsParentCard").css("background-color","#299b04");
            $('#noResultsFoundCard').css('color','white');
            $('#noResultsFoundCard').css('padding','15px');
        }   
        else{
            $("#noResultsFoundCard").text("No search has been made yet.");
        }        
    }

    $('#companyListContainer div.resultsFoundCard:last').css("margin-bottom","20px");
})