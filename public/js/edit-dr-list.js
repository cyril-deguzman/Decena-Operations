$(document).ready(function() {
    $('#set-year-btn').prop('disabled', true);

    $('#set-year-btn').click(function(){
        let companyName = $('#company-name-title').attr('data-id');
        let year = $('#set-year-input').val();
        
        window.location = `/viewallreceipts/${year}`;
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


     /*
        Change style of div based on payment status
    */


        var paymentStatus = $(".paymentStatus");
        var paid = "paid";
        var pending = "pending";
        
        paymentStatus.each(function(){
            if($(this).text().toUpperCase() == paid.toUpperCase()){
                $(this).css("background-color","#299B04");
                $(this).text("Paid");
            }
            else if($(this).text().toUpperCase() == pending.toUpperCase()){
                $(this).css("background-color","#cc3333");
                $(this).text("Pending");
            }
        });
    
        
        var title;
    
        // Setup - add a text input to each footer cell
        $('.drDataTable tfoot th.filterCol').each( function () {
            title = $(this).text();
            $(this).html( '<input type="text" placeholder="'+ " " + title +'" class ="searchField" />' );
        } );
     
        //Set Placeholder for Payment Status Column and Truck Plate No. Column
        $('.searchField').eq(4).attr("placeholder"," Status");
        $('.searchField').eq(7).attr("placeholder"," Plate No.");
        
        // DataTable
        var table = $('.drDataTable').DataTable({  bAutoWidth: false,
            columnDefs: [
                { orderable: false, targets: -1 }
             ],
            aoColumns : [
              { sWidth: '100px' },
              { sWidth: '130px' },
              { sWidth: '130px' },
              { sWidth: '70px' },
              { sWidth: '130px' },
              { sWidth: '130px' },
              { sWidth: '70px' },
              { sWidth: '50px' }
            ],
            initComplete: function () {
                // Apply the search
                this.api().columns().every( function () {
                    var that = this;
     
                    $( 'input', this.footer() ).on( 'keyup change clear', function () {
                        if ( that.search() !== this.value ) {
                            that
                                .search( this.value )
                                .draw();
                        }
                    } );
                } );
            }
        });

         /*
            This is used to append the search fields to the header since it's originally
            placed in the footer.
        */

        $('.drDataTable tfoot tr').appendTo('.drDataTable thead');
        $('.dataTables_filter input[type="search"]').css(
            {'width':'50px','display':'inline-block'}
        );

        $('#myInputTextField').keyup(function(){
            table.search($(this).val()).draw();
        })

        //This just removes the text for the Edit DR column
        $('th').eq(15).text("");
        
        //Adds an ID "searchDrForm" to the search input to resize it
        $("label").eq(1).attr('id','searchDrForm');
        $("input[type='search']").css("width","200px");
        $("label").eq(2).css('position','relative');
        $("label").eq(2).css('bottom','20px');
        $("label").eq(2).css('right','10px');
})