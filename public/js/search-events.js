$(document).ready(function () {
    let maxPageCount = Math.ceil($('#page-count').val() / 10);

    /* Event Handlers */
    $(".resultsFoundCard").hover(function(){
        $(this).children().not('deleteDRButton').css("background-color","#dbdbdb");
        
    }, function(){
        $(this).children().not('deleteDRButton').css("background-color","#FFFFFF");
    });

    



    $('#next').click(function (e) {
        e.preventDefault();

        $(".page-nav").each(function(index) {
            let currNum = parseInt($(this).text()) + 1;

            if(currNum == maxPageCount)
                $('#next').addClass("disable-click");

            $(this).html(currNum);
        });

        if(parseInt($("#first-page").text()) > 1) 
            $("#previous").removeClass("disable-click"); 
    })

    $('#previous').click(function (e) {
        e.preventDefault();

        $(".page-nav").each(function(index) {
            let currNum = parseInt($(this).text()) - 1;
            
            if(currNum <= maxPageCount) 
                $('#next').removeClass("disable-click"); 
                
            $(this).html(currNum);
        });

        if(parseInt($("#first-page").text()) <= 1) 
            $("#previous").addClass("disable-click"); 
    })

    $('.page-nav').click(function(e){
        e.preventDefault();
        let page = parseInt($(this).text());
        let searchQuery = $('#search-query').val();

        $.post(`/paginatecompany`, {page: page, filter: searchQuery},function(data, status) {
            let node = $('#company-cards');
            let textContent = '';
            
            data.results.forEach(company => {
                let temp = 
                    `<div data-id="${company.dataName}" class="card col-lg-6 mx-auto resultsFoundCard flex-row flex-rap">
                        <div class="card-header border-0">
                            <i class="material-icons-outlined cardIcon md-36">business</i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title companyName">${company.name}</h5>
                            <p class="card-text companyNumberOfDR">Delivery Receipts: <strong>${company.activeReceipts}</strong></p>
                        </div>
                    </div>`;
                    
                textContent = textContent.concat(temp);
            });
            
            let temp = 
                `<p id="bottomOfPageSpace">.</p>`
            textContent = textContent.concat(temp);
            node.html(textContent);

            $('.resultsFoundCard').click(function() {
                let companyName = $(this).attr('data-id');
                
                window.location = `/viewreceipts/${companyName}`;
            })
            
            $('#companyListContainer div.resultsFoundCard:last').css("margin-bottom","20px");

                     
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
        });
    })

    $('.resultsFoundCard').click(function() {
        let companyName = $(this).attr('data-id');
        
        window.location = `/viewreceipts/${companyName}`;
    })
})