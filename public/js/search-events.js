$(document).ready(function () {
    let maxPageCount = Math.ceil($('#page-count').val() / 10);
    let currentCompany;
    /* Event Handlers */
   
    onClickAndHoverEvents();

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
                            <p class="card-text companyNumberOfDR">Delivery Receipts: 
                                <strong class="companyNumberOfDRValue">${company.activeReceipts}</strong>
                            </p>
                        </div>
                        <button type="button" class="close deleteDRButton" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
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

            /**
             *  Adds a delete button to each card that has 0 DR forms associated with the company
             */

           onClickAndHoverEvents();

        
        });
    })
    
    function onClickAndHoverEvents(){
        $(".resultsFoundCard").hover(function(){
            $(this).css("background-color","#dbdbdb");
            
        }, function(){
            $(this).css("background-color","#FFFFFF");
        });
    
        $(".companyNumberOfDRValue").each(function(){
            if($(this).text() == 0){
                $(this).parent().parent().parent().children(".deleteDRButton").css("display","inline");
            }
        });
    
        $(".deleteDRButton").on("click",function(e){
            e.stopPropagation();
            currentCompany = $(this).parent();
            $("#deleteCompanyModal").modal('toggle');
            var companyName = $(this).siblings('.card-body').children('.companyName').text();
            $(".confirmDeleteModalText").text("Are you sure you want to delete '"
                                                 + companyName + "' ?");                            
        });


        $('#deleteCompanyButton').on("click",function(){
            /* Delete company here */
            let cName = currentCompany.attr('data-name');
            
            $.post('/deletecompany', {companyName: cName}, function(data, status){
                if(data == 'success'); {
                    currentCompany.toggle();
                    $("#deleteCompanyModal").modal('hide'); 
                }
            });
        });
    }

    $('.resultsFoundCard').click(function() {
        let companyName = $(this).attr('data-id');
        
        window.location = `/viewreceipts/${companyName}`;
    })
})