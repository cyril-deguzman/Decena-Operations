$(document).ready(function () {
    let pageCount = $('#page-count').val() / 10;
    alert(pageCount);

    /* Event Handlers */
    $(".resultsFoundCard").hover(function(){
        $(this).children().css("background-color","#dbdbdb");
    }, function(){
        $(this).children().css("background-color","#FFFFFF");
    });

    $('#next').click(function (e) {
        e.preventDefault();

        $(".page-nav").each(function(index) {
            let currNum = parseInt($(this).text()) + 1;
            $(this).html(currNum);
        });

        if(parseInt($("#first-page").text()) > 1) 
            $("#previous").removeClass("disable-click"); 
    })

    $('#previous').click(function (e) {
        e.preventDefault();

        $(".page-nav").each(function(index) {
            let currNum = parseInt($(this).text()) - 1;
            $(this).html(currNum);
        });

        if(parseInt($("#first-page").text()) <= 1) 
            $("#previous").addClass("disable-click"); 
    })

})