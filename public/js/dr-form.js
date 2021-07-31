$(document).ready(function () {
	let dateIssued = $('#date-issued');
    let companyName = $('#lastname');
	let clientName = $('#lastname');
	let	pickSite = $('#lastname');
	let	dropSite = $('#lastname');
	let shipMode = $("input[name=shipment]:checked");
	let quantity = $('#quantity');
	let commodityDesc = $('#description');
	let truckPlateNo = $('#plate-number');
	let driverName = $('#driver');
	let helperName = $('#helper');
	let pArrivalDate = $('#p-arrival-date');
	let pArrivalTime = $('#p-arrival-time');
	let pDepartureDate = $('#p-departure-date');
	let pDepartureTime = $('#p-departure-time');
	let dArrivalDate = $('#d-arrival-date');
	let dArrivalTime = $('#d-arrival-time');
	let dStartLoadDate = $('#start-load-date');
	let dStartLoadTime = $('#start-load-time');
	let dFinishLoadDate = $('#finish-load-date');
	let dFinishLoadTime = $('#finish-load-time');
	let dDepartureDate = $('#d-departure-date');
	let dDepartureTime = $('#d-departure-time');
	let remarks = $("input[name=acknowledgement]:checked");
	let ackDate = $("ack-date");
	let ackTime = $("ack-time");
	let docs = [];
    $.each($("input[name=document]:checked"), function(){
		docs.push($(this).val());
	});

	//add to database
	$.post('/postForm', 
	{
		// firstname: firstname.val(), 
		// lastname: lastname.val(), 
		// email: email.val(),
		// password: password.val(),
	}, function(result){});
   
})






