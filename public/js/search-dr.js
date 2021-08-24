$(document).ready(function() {
    $('#filter-year-btn').prop('disabled', true);

    $('#filter-year-btn').click(function(){
        let companyName = $('#company-name-title').attr('data-id');
        let year = $('#search-year-input').val();
        
        window.location = `/viewreceipts/${companyName}/${year}`;
    });

    $('#search-year-input').keyup(function(){
        let year = $(this).val();
        let date = new Date()
    
        if(!(year < 1000 || year > date.getFullYear()))
            $('#filter-year-btn').prop('disabled', false);
        else 
            $('#filter-year-btn').prop('disabled', true);
    })
})