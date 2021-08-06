/**
 * Printing Data Inputted by the user in the Modal
 */
$("#submit").click(function () {
	// Part 1
	var dataP1 = [];
	var fieldsP1 = [];

	fieldsP1.push("Date Issued ")
	fieldsP1.push("Forwarding/Broker's Company ");
	fieldsP1.push("Client ");
	fieldsP1.push("Pick-Up Site ");
	fieldsP1.push("Delivery Site ");
	dataP1.push($("#date-issued").val());
	dataP1.push($("#company-name").val());
	dataP1.push($("#client-name").val());
	dataP1.push($("#pickup-site").val());
	dataP1.push($("#delivery-site").val());
	
    var strDataUpper1P1 = dataP1.slice(0,2).join("<br>");
    var strFieldUpper1P1 = fieldsP1.slice(0,2).join("<br>");
	
	// Part 2
	var dataP2 = [];
	var fieldsP2 = [];
	var docs = [];
	$.each($("input[name=document]:checked"), function(){
		docs.push($(this).val());
	});
	fieldsP2.push("Mode of Shipment ");
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
    var strFieldLowerP2 = fieldsP2.slice(3,5).join("<br>");
    var strDataUpperP2 = dataP2.slice(0,2).join("<br>");
    var strDataLowerP2 = dataP2.slice(3,5).join("<br>");
	
	// Part 3
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
	
	// Part 4
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
	
    var strFieldUpper1P4 = fieldsP4.slice(0,2).join("<br>");
    var strFieldLower2P4 = fieldsP4.slice(4,6).join("<br>");
    var strDataUpper1P4 = dataP4.slice(0,2).join("<br>");
    var strDataLower2P4 = dataP4.slice(4,6).join("<br>");
	
	// Displaying all contents of field[] and data[];
    $("#upper1-left-p1").html(strFieldUpper1P1);
    $("#upper2-left-p1").html(fieldsP1[2]); 
    $("#lower1-left-p1").html(fieldsP1[3]);
    $("#lower2-left-p1").html(fieldsP1[4]);
	$("#upper1-right-p1").html(strDataUpper1P1);
	$("#upper2-right-p1").html(dataP1[2]);
	$("#lower1-right-p1").html(dataP1[3]);
    $("#lower2-right-p1").html(dataP1[4]);
	
    $("#upper-left-p2").html(strFieldUpperP2);
    $("#upper-right-p2").html(strDataUpperP2);
    $("#middle-left-p2").html(fieldsP2[2]);
    $("#middle-right-p2").html(dataP2[2]);
    $("#lower-left-p2").html(strFieldLowerP2);
    $("#lower-right-p2").html(strDataLowerP2);
	
    $("#a-left-left-p3").html(fieldsP3[0] + "<br>" + fieldsP3[4]);
    $("#a-left-right-p3").html(dataP3.slice(0,2).join("<br>"));
    $("#d-left-left-p3").html(fieldsP3[3] + "<br>" + fieldsP3[4]);
    $("#d-left-right-p3").html(dataP3.slice(2,4).join("<br>"));                
    $("#a-right-left-p3").html(fieldsP3[0] + "<br>" + fieldsP3[4]);
    $("#a-right-right-p3").html(dataP3.slice(4,6).join("<br>"));
    $("#sl-right-left-p3").html(fieldsP3[1] + "<br>" + fieldsP3[4]);
    $("#sl-right-right-p3").html(dataP3.slice(6,8).join("<br>"));
    $("#fl-right-left-p3").html(fieldsP3[2] + "<br>" + fieldsP3[4]);
    $("#fl-right-right-p3").html(dataP3.slice(8,10).join("<br>"));
    $("#d-right-left-p3").html(fieldsP3[3] + "<br>" + fieldsP3[4]);
    $("#d-right-right-p3").html(dataP3.slice(10,12).join("<br>"));
	
    $("#upper1-left-p4").html(strFieldUpper1P4);
    $("#upper1-right-p4").html(strDataUpper1P4);
    $("#upper2-left-p4").html(fieldsP4[2]);
    $("#upper2-right-p4").html(dataP4[2]);
    $("#lower1-left-p4").html(fieldsP4[3]);
    $("#lower1-right-p4").html(dataP4[3]);                
    $("#lower2-left-p4").html(strFieldLower2P4);
    $("#lower2-right-p4").html(strDataLower2P4);
});

/**
 * Setting the DEFAULT & MAX DATE to today (for all date fields)
 */
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

/**
 * Displaying number of characters left in Description of Commodity
 */
var div1 = document.createElement("div");
var commodityDesc = document.getElementById("description");
var div2 = document.createElement("div");
var counter = document.createElement("span");

div1.style.position = "relative";
div2.style.position = "absolute";
div2.style.bottom = "8px";
div2.style.color = "#ccc";
div2.style.left = "71%";
commodityDesc.parentNode.appendChild(div1);
div1.appendChild(commodityDesc);
div2.appendChild(counter);
div1.appendChild(div2);

function charLeft() {
	counter.innerHTML = (200 - this.value.length);
}

commodityDesc.addEventListener("input", charLeft);
charLeft.call(commodityDesc);	

