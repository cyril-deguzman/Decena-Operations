$(document).ready(function () {

	// Printing Data Inputted by the user in the Modal
	$("#submit").click(function () {
        //Part 1
        var dataP1 = [];
        var fieldsP1 = [];
    
        fieldsP1.push("Date Issued ")
        fieldsP1.push("Forwarding/Broker's Company ");
        fieldsP1.push("Client ");
        fieldsP1.push("Pick-Up Site <br>");
        fieldsP1.push("Delivery Site ");
        dataP1.push($("#date-issued").val());
        dataP1.push($("#company-name").val());
        dataP1.push($("#client-name").val());
        dataP1.push($("#pickup-site").val() + "<br>");
        dataP1.push($("#delivery-site").val());
        
        var strDataP1 = dataP1.join("<br>");
        var strFieldP1 = fieldsP1.join("<br>");
        
        //Part 2
		var dataP2 = [];
        var fieldsP2 = [];
        var docs = [];
        $.each($("input[name=document]:checked"), function(){
           docs.push($(this).val());
        });
        fieldsP2.push("Mode of Shipment ")
        fieldsP2.push("List of Documents ");
        fieldsP2.push("Processor ");
        fieldsP2.push("Quantity ");
        fieldsP2.push("Description of Commodity ");
        dataP2.push($("input[name=shipment]:checked").val());
        dataP2.push(docs.join("<br>"));
        dataP2.push($("#processor").val());
        dataP2.push($("#quantity").val());
        dataP2.push($("#description").val());
        
        var strFieldUpperP2 = fieldsP2.slice(0,2).join("<br>");
        var strFieldLowerP2 = fieldsP2.slice(2,5).join("<br>");
        var strDataUpperP2 = dataP2.slice(0,2).join("<br>");
        var strDataLowerP2 = dataP2.slice(2,5).join("<br>");
      
        //Part 3
        var dataP3 = [];
        var fieldsP3 = [];
        
        fieldsP3.push("Arrival Date ");
        fieldsP3.push("Date Started Loading/Unloading ");
        fieldsP3.push("Date Finished Loading/Unloading ");
        fieldsP3.push("Departure Date ");
        fieldsP3.push("Time ");
        
        dataP3.push($("#p-arrival-date").val());
        dataP3.push($("#p-arrival-time").val());
        dataP3.push($("#p-departure-date").val());
        dataP3.push($("#p-departure-time").val());
        dataP3.push($("#d-arrival-date").val());
        dataP3.push($("#d-arrival-time").val());
        dataP3.push($("#start-load-date").val());
        dataP3.push($("#start-load-time").val());
        dataP3.push($("#finish-load-date").val());
        dataP3.push($("#finish-load-time").val());
        dataP3.push($("#d-departure-date").val());
        dataP3.push($("#d-departure-time").val());
        
        var strFieldLeftP3 = fieldsP3[0] + "<br>" + fieldsP3[4]
                             +  "<br><br>" +
                             fieldsP3[3] + "<br>" + fieldsP3[4];
        var strFieldRightP3 = fieldsP3[0] + "<br>" + fieldsP3[4]
                              + "<br><br>" +
                              fieldsP3[1] + "<br>" + fieldsP3[4]
                              + "<br><br>" +
                              fieldsP3[2] + "<br>" + fieldsP3[4]
                              + "<br><br>" +
                              fieldsP3[3] + "<br>" + fieldsP3[4];
        var strDataLeftP3 = dataP3.slice(0,2).join("<br>")
                            + "<br><br>" +
                            dataP3.slice(2,4).join("<br>");
        var strDataRightP3 = dataP3.slice(4,6).join("<br>")
                             + "<br><br>" +
                             dataP3.slice(6,8).join("<br><br>")
                             + "<br><br>" +
                             dataP3.slice(8,10).join("<br><br>")
                             + "<br><br>" +
                             dataP3.slice(10,12).join("<br>");
        
        //Part 4
        var dataP4 = [];
        var fieldsP4 = [];
        
        fieldsP4.push("Truck Plate Number ");
        fieldsP4.push("Driver ");
        fieldsP4.push("Helper ");
        fieldsP4.push("Acknowledgement ");
        fieldsP4.push("Date ");
        fieldsP4.push("Time ");
    
        dataP4.push($("#plate-number").val());
        dataP4.push($("#driver").val());
        dataP4.push($("#helper").val());
        dataP4.push($("input[name=acknowledgement]:checked").val());
        dataP4.push($("#ack-date").val());
        dataP4.push($("#ack-time").val());
        
        var strFieldUpperP4 = fieldsP4.slice(0,3).join("<br>");
        var strFieldLowerP4 = fieldsP4.slice(3,6).join("<br>");
        var strDataUpperP4 = dataP4.slice(0,3).join("<br>");
        var strDataLowerP4 = dataP4.slice(3,6).join("<br>");
        
        //Displaying all contents of field[] and data[];
        $("#left-p1").html(strFieldP1);
		$("#right-p1").html(strDataP1);
        
        $("#upper-left-p2").html(strFieldUpperP2);
        $("#upper-right-p2").html(strDataUpperP2);
        $("#lower-left-p2").html(strFieldLowerP2);
        $("#lower-right-p2").html(strDataLowerP2);
        
        $("#left-left-p3").html(strFieldLeftP3);
        $("#left-right-p3").html(strDataLeftP3);
        $("#right-left-p3").html(strFieldRightP3);
        $("#right-right-p3").html(strDataRightP3);
        
        $("#upper-left-p4").html(strFieldUpperP4);
        $("#upper-right-p4").html(strDataUpperP4);
        $("#lower-left-p4").html(strFieldLowerP4);
        $("#lower-right-p4").html(strDataLowerP4);
	});
	// // Printing Data Inputted by the user in the Modal
	// $("#submit").click(function () {
	// 	var	company = $("#company-name").val();
	// 	var client = $("#client-name").val();
	// 	var date = $("#date-issued").val();
	// 	var ack = $("#acknowledgement").val();
	// 	var fname = "Forwarding/Broker's Company Name: " + company; 
	// 	var cname = "Client's Name: " + client;
	// 	var datee = "Date Issued: " + date;
	// 	var ackk = "Acknowledgement: " + ack;
	// 	var str = fname + "<br>"+ cname + "<br>" + datee + "<br>" + ackk;	
	// 	$("#modal_body").html(str);
	// });

})


