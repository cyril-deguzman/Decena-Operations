$(document).ready(function () {
    // popovers Initialization
    $('[data-toggle="popover"]').popover()

    var url = window.location.href;
    var searchValue = url.split('=')[1];
    let maxPageCount = Math.ceil($('#page-count').val() / 10);

    /* On load changes */
    $("#previous").addClass("disable-click"); 
    $('#companyListContainer div.resultsFoundCard:last').css("margin-bottom","20px");

    if(maxPageCount <= 3)
        $("#next").addClass("disable-click"); 
    
    /* This checks if the search is able to return a company, if succcessful the card will 
       display the number of companies matching the search query. */
    if ($(".resultsFoundCard")[0]) {
        let companyCount = $('#page-count').val();
        let searchQuery = $('#search-query').val();

        if(searchQuery == ""){
            $("#resultsCountCard").text("Showing all " + "(" + companyCount + ") " +  "companies");
        }

        else{
            $("#resultsCountCard").text("There are ("+ companyCount +")" + " results found for: " + searchQuery);
        }
        
    } 
    else {
        let companyCount = $('#page-count').val();
        let searchQuery = $('#search-query').val();
        
        $("#resultsCountCard").hide();
        $(".paginationContainer").hide();
        
        console.log(companyCount);
        if (companyCount == 0 && searchQuery != "") {
            $("#noResultsFoundCard").text("There are (0) results found for: " + searchQuery);
            $("#noResultsParentCard").css("background-color","#b22222");
            $('#noResultsFoundCard').css('color','white');
        }   
        else {
            $("#noResultsParentCard").hide();
        }        
    }

    $(".page-nav").each(function(index) {
        let currNum = parseInt($(this).text());
        
        if(currNum > maxPageCount)
            $(this).parent().toggle();
    });

    $(".companyName").each(function(){
        console.log($(this).text().length);
        if($(this).text().length >= 82 && $(this).text().length <= 139){
            $(this).parent().parent().css("height","90px");
            $(this).parent().parent().children(".card-header").children(".cardIcon").css("margin-top","14px");
        }
        else if($(this).text().length >= 140){
            $(this).parent().parent().css("height","100px");
            $(this).parent().parent().children(".card-header").children(".cardIcon").css("margin-top","14px");
        }
    });
})

