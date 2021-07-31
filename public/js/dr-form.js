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
	let processor = $("processor");
	let docs = [];
    $.each($("input[name=document]:checked"), function(){
		docs.push($(this).val());
	});

	//add to database
	$.post('/postForm', 
	{
		// Main
		dateIssued: dateIssued.val(),
		companyName: companyName.val(),
		clientName: clientName.val(),
		pickSite: pickSite.val(),
		dropSite: dropSite.val(),
		shipMode: shipMode.val(),
		quantity: quantity.val(),
		commodityDesc: commodityDesc.val(),
		// Fleet Deets
		truckPlateNo: truckPlateNo.val(),
		driverName: driverName.val(),
		helperName: helperName.val(),
		// Pick up
		pArrivalDate: pArrivalDate.val(),
		pArrivalTime: pArrivalTime.val(),
		pDepartureDate: pDepartureDate.val(),
		pDepartureTime: pDepartureTime.val(),
		// Destination
		dArrivalDate: dArrivalDate.val(),
		dArrivalTime: dArrivalTime.val(),
		dStartLoadDate: dStartLoadDate.val(),
		dStartLoadTime: dStartLoadTime.val(),
		dFinishLoadDate: dFinishLoadDate.val(),
		dFinishLoadTime: dFinishLoadTime.val(),
		dDepartureDate: dDepartureDate.val(),
		dDepartureTime: dDepartureTime.val(),
		// Acknowledgement
		dateAck: remarks.val(),
		timeAck: ackDate.val(),
		remarks: ackTime.val(),
		processor: processor.val(),
		docs: docs,
	}, function(result){});
   
})






