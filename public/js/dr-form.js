<!-- JavaScript/JQuery -->
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

// Setting the DEFAULT & MAX DATE to today (for all date fields)
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd < 10)
	dd='0'+dd;
if(mm < 10)
    mm='0'+mm; 
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date-issued").setAttribute("value", today);
document.getElementById("date-issued").setAttribute("max", today);	
document.getElementById("p-arrival-date").setAttribute("value", today);
document.getElementById("p-arrival-date").setAttribute("max", today);	
document.getElementById("p-departure-date").setAttribute("value", today);
document.getElementById("p-departure-date").setAttribute("max", today);
document.getElementById("d-arrival-date").setAttribute("value", today);
document.getElementById("d-arrival-date").setAttribute("max", today);	
document.getElementById("d-departure-date").setAttribute("value", today);
document.getElementById("d-departure-date").setAttribute("max", today);	
document.getElementById("start-load-date").setAttribute("value", today);
document.getElementById("start-load-date").setAttribute("max", today);	
document.getElementById("finish-load-date").setAttribute("value", today);
document.getElementById("finish-load-date").setAttribute("max", today);	
document.getElementById("ack-date").setAttribute("value", today);
document.getElementById("ack-date").setAttribute("max", today);