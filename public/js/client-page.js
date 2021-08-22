$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('.drDataTable tfoot th.filterCol').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" class ="searchField" />' );
    } );
 
    // DataTable
    var table = $('.drDataTable').DataTable({  bAutoWidth: false, 
        aoColumns : [
          { sWidth: '160px' },
          { sWidth: '160px' },
          { sWidth: '160px' },
          { sWidth: '160px' },
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


    /*
        This function gets all of the search input fields and adjusts the width of each.
    */
     var searchFields = $(".searchField");
        for(var i=0; i<searchFields.length; i++){
            var instanceOfSearchField= searchFields.eq(i);
            
            switch(i)
            {
                case 0:
                    instanceOfSearchField.css("width","160px");
                    break;
                case 1:
                    instanceOfSearchField.css("width","160px");
                    break;
                case 2:
                    instanceOfSearchField.css("width","160px");
                    break;
                case 3:
                    instanceOfSearchField.css("width","160px");
                    break;
            }
        }

        //Adds an ID "searchDrForm" to the search input to resize it
        $("label").eq(1).attr('id','searchDrForm');
        $("input[type='search']").css("width","200px");
} );