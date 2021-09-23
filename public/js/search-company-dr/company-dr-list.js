$(document).ready(function() {
    $('#set-year-btn').prop('disabled', true);

    $('#set-year-btn').click(function(){
        let companyName = $('#company-name-header').attr('data-id');
        let year = $('#set-year-input').val();
        
        window.location = `/viewreceipts/${companyName}/${year}`;
    });

    $('#set-year-input').keyup(function(){
        let year = $(this).val();
        let date = new Date()
    
        if(!(year < 1000 || year > date.getFullYear()))
            $('#set-year-btn').prop('disabled', false);
        else 
            $('#set-year-btn').prop('disabled', true);
    })

    $('.editBtn').click(function(){
        let id = $(this).attr('data-id');
        window.location = `/editreceipt/${id}`;
    })
})