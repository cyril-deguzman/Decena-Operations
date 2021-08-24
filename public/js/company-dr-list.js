$(document).ready(function() {

    var title;

    // Setup - add a text input to each footer cell
    $('.drDataTable tfoot th.filterCol').each( function () {
        title = $(this).text();
        $(this).html( '<input type="text" placeholder="'+ " " + title +'" class ="searchField" />' );
    } );
 
    // DataTable
    var table = $('.drDataTable').DataTable({  bAutoWidth: false,
        columnDefs: [
            { orderable: false, targets: -1 }
         ],
        aoColumns : [
          { sWidth: '140px' },
          { sWidth: '150px' },
          { sWidth: '100px' },
          { sWidth: '150px' },
          { sWidth: '150px' },
          { sWidth: '90px' },
          { sWidth: '100px' }
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
    /*
        This function gets all of the search input fields and adjusts the width of each.
    */
     var searchFields = $(".searchField");
        for(var i=0; i<searchFields.length; i++){
            var instanceOfSearchField= searchFields.eq(i);
            
            switch(i)
            {
                // case 0:
                   
                case 1:
                    instanceOfSearchField.css("width","160px");
                    break;
                case 2:
                    instanceOfSearchField.css("width","170px");
                    break;
                case 3:
                    instanceOfSearchField.css("width","120px");
                    break;
                case 4:
                    instanceOfSearchField.css("width","170px");
                    break;
                case 5:
                    instanceOfSearchField.css("width","170px");
                    break;
                case 6:
                    instanceOfSearchField.css("width","115px");
                    break;
            }
        }

        //This just removes the text for the Edit DR column
        $('th').eq(13).text("");
        
        //Adds an ID "searchDrForm" to the search input to resize it
        $("label").eq(1).attr('id','searchDrForm');
        $("input[type='search']").css("width","200px");
        $("label").eq(2).css('position','relative');
        $("label").eq(2).css('bottom','20px');
        $("label").eq(2).css('right','10px');

        /* Filter Year */
        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {
                var year = $('#search-year-input').val();
                var date = ( data[0] ) || 0; // use data for the age column
        
                if ( date.includes(year))
                    return true;
        
                return false;
            }
        );
    
        $(document).ready(function() {
            var table = $('#dr-datatable').DataTable();
            
            // Event listener filtering inputs to redraw on input
            $('#search-year-input').keyup( function() {
                table.draw();
            });
        });

        /*
            Change style of div based on payment status
        */
        
        var paymentStatus = $(".paymentStatus");
        var paid = "paid";
        var pending = "pending";
        
        paymentStatus.each(function(){
            if($(this).text().toUpperCase() == paid.toUpperCase()){
                $(this).css("background-color","#299B04");
            }
            else if($(this).text().toUpperCase() == pending.toUpperCase()){
                $(this).css("background-color","#cc3333");
            }
        });

        
        
        
} );