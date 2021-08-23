$(document).ready(function() {
    $('#filter-year-btn').prop('disabled', true);

    $('#filter-year-btn').click(function(){
        let companyName = $('#company-name-title').attr('data-id');
        let year = $('#search-year-input').val();
        
        window.location = `/viewreceipts/${companyName}/${year}`;
    });

    $('#search-year-input').keyup(function(){
        let year = $(this).val();

        if(!(year < 1000 || year > 9999))
            $('#filter-year-btn').prop('disabled', false);
        else 
            $('#filter-year-btn').prop('disabled', true);
    })
})