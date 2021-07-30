$(document).ready(function () {

	// Printing Data Inputted by the user in the Modal
	$("#submit").click(function () {
		var	company = $("#company-name").val();
		var client = $("#client-name").val();
		var date = $("#date-issued").val();
		var ack = $("#acknowledgement").val();
		var fname = "Forwarding/Broker's Company Name: " + company; 
		var cname = "Client's Name: " + client;
		var datee = "Date Issued: " + date;
		var ackk = "Acknowledgement: " + ack;
		var str = fname + "<br>"+ cname + "<br>" + datee + "<br>" + ackk;	
		$("#modal_body").html(str);
	});

})


