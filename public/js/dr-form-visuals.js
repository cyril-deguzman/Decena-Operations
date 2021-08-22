$(document).ready(function () {
    /**
     * Prints the data inputted by the user in the Modal if there are no errors.
     * Otherwise, it scrolls up to first occurrence of the error.
     */
    $("#submit").click(function () {
        getValidation();
        getConditions();
    });

    /**
     * Runs the validation for the whole form
    */
    function getValidation() {
        // Alpha
        var alphaClientName = validator.trim($("#client-name").val());
        validAlpha(alphaClientName, $("#p1Error2"), $("#client-name").attr("id"));

        var alphaDriver = validator.trim($("#driver").val());
        validAlpha(alphaDriver, $("#p4Error2"), $("#driver").attr("id"));

        var alphaHelper = validator.trim($("#helper").val());
        validAlpha(alphaHelper, $("#p4Error3"), $("#helper").attr("id"));

        var alphaProcessor = validator.trim($("#processor").val());
        validAlpha(alphaProcessor, $("#p2Error3"), $("#processor").attr("id"));

        // Alphanumeric
        var alphaCompanyName = validator.trim($('#company-name').val());
        validFilled(alphaCompanyName, $('#p1Error1'), $('#company-name').attr('id'));
        validLenCompanyName(alphaCompanyName, $('#p1Error1'), $('#company-name').attr('id'));

        var alphaPickSite = validator.trim($('#pickup-site').val());
        validFilled(alphaPickSite, $('#p1Error3'), $('#pickup-site').attr('id'));
        validLenSite(alphaPickSite, $('#p1Error3'), $('#pickup-site').attr('id'));

        var alphaDelSite = validator.trim($('#delivery-site').val());
        validFilled(alphaDelSite, $('#p1Error4'), $('#delivery-site').attr('id'));
        validLenSite(alphaDelSite, $('#p1Error4'), $('#delivery-site').attr('id'));

        var alphaPlateNum = validator.trim($('#plate-number').val());
        validFilled(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'));
        validLenPlateNum(alphaPlateNum, $('#p4Error1'), $('#plate-number').attr('id'));

        var alphaDescription = validator.trim($('#description').val());
        validFilled(alphaDescription, $('#p2Error4'), $('#description').attr('id'));
        validLenDescription(alphaDescription, $('#p2Error4'), $('#description').attr('id'));

        // Checkbox
        validCheckbox($("#docs-options").attr('id'), $("#p2Error2"));

        // Numeric
        var quantityNum = document.getElementById("quantity").value;
        validAmount(quantityNum, $("#p2Error1"), $("#quantity").attr("id"));

        // Dates
        var dateIssued = document.getElementById("date-issued").value;
        validDate(dateIssued, $("#p1Error5"), $("#date-issued").attr("id"));

        var datePArrive = document.getElementById("p-arrival-date").value;
        var flagPArrive = validDate(datePArrive, $("#p3Error1"), $("#p-arrival-date").attr("id"));

        var datePDepart = document.getElementById("p-departure-date").value;
        var flagPDepart = validDate(datePDepart, $("#p3Error2"), $("#p-departure-date").attr("id"));

        var dateDArrive = document.getElementById("d-arrival-date").value;
        var flagDArrive = validDate(dateDArrive, $("#p3Error5"), $("#d-arrival-date").attr("id"));

        var dateDDepart = document.getElementById("d-departure-date").value;
        var flagDDepart = validDate(dateDDepart, $("#p3Error8"), $("#d-departure-date").attr("id"));

        var dateDStartLoad = document.getElementById("start-load-date").value;
        var flagDStartLoad = validDate(dateDStartLoad, $("#p3Error6"), $("#start-load-date").attr("id"));

        var dateDEndLoad = document.getElementById("finish-load-date").value;
        var flagDEndLoad = validDate(dateDEndLoad, $("#p3Error7"), $("#finish-load-date").attr("id"));

        var ackDate = document.getElementById("ack-date").value;
        validDate(ackDate, $("#p4Error4"), $("#ack-date").attr("id"));

        // Dates (Start & End)
        var pArriveDepart = validStartEndDate(flagPArrive, flagPDepart, datePArrive, datePDepart, 
            $("#p3Error1"), $("#p3Error2"), $("#p-arrival-date").attr("id"), $("#p-departure-date").attr("id"));

        var dArriveDepart = validStartEndDate(flagDArrive, flagDDepart, dateDArrive, dateDDepart, 
            $("#p3Error5"), $("#p3Error8"), $("#d-arrival-date").attr("id"), $("#d-departure-date").attr("id"));

        var dStartEnd = validStartEndDate(flagDStartLoad, flagDEndLoad, dateDStartLoad, dateDEndLoad, 
            $("#p3Error6"), $("#p3Error7"), $("#start-load-date").attr("id"), $("#finish-load-date").attr("id"));

        // Time (Start & End)
        var timePArrive = document.getElementById("p-arrival-time").value;
        var timePDepart = document.getElementById("p-departure-time").value;
        validStartEndTime($("#p3Error1"), $("#p3Error2"), pArriveDepart, timePArrive, timePDepart, $("#p3Error3"), 
            $("#p3Error4"), $("#p-arrival-time").attr("id"), $("#p-departure-time").attr("id"));

        var timeDArrive = document.getElementById("d-arrival-time").value;
        var timeDDepart = document.getElementById("d-departure-time").value;
        validStartEndTime($("#p3Error5"), $("#p3Error8"), dArriveDepart, timeDArrive, timeDDepart, $("#p3Error9"), 
            $("#p3Error12"), $("#d-arrival-time").attr("id"), $("#d-departure-time").attr("id"));

        var timeDStartLoad = document.getElementById("start-load-time").value;
        var timeDEndLoad = document.getElementById("finish-load-time").value;
        validStartEndTime($("#p3Error6"), $("#p3Error7"), dStartEnd, timeDStartLoad, timeDEndLoad, $("#p3Error10"), 
            $("#p3Error11"), $("#start-load-time").attr("id"), $("#finish-load-time").attr("id"));
    }

    /**
     * Sets the error fields appearance for invalid inputs
    */
    function setInvalid(field, errormsg, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
    }

    /**
     * Sets the error fields appearance for valid inputs
    */
    function setValid(field, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFFFFF');
        errorfield.text('');
        errorfield.css('background-color', '#FFFFFF');
    }

    /**
     * Checks all fields if empty
    */
    function validFilled (input, errorfield, id) {
        if (validator.isEmpty(input))
            setInvalid(id, "Invalid input. Field must not be empty.", errorfield);
        else
            setValid(id, errorfield);
    }

    /*
     * Checks name fields for invalid inputs
    */
    function validAlpha (input, errorfield, id) {
        const blacklist = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
                        "_", "=", "+", "{", "}", "[", "]", "|", "\\", ";", ":", "\'",
                        "\"", ",", "<", ">", "/", "?", "1", "2", "3", "4", "5", "6", 
                        "7", "8", "9", "0"];
        var flag = false;

        for (const item of blacklist) {
            if (input.indexOf(item) != -1)
                flag = true;
        }

        if (validator.isEmpty(input))
            setInvalid(id, "Invalid input. Field must not be empty.", errorfield);
        else if (flag)
            setInvalid(id, "Invalid input. Use Alpha characters (A-Z, a-z), period (.), and hyphens (-) only.", errorfield);
        else if (!validator.isLength(input, {min: 1, max: 50}))
            setInvalid(id, "Invalid input. Minimum of 1 character and maximum of 50 characters.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks date fields if they are not set at most today (YYYY-MM-DD)
    */
    function validDate (input, errorfield, id) {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        
        var dd = parseInt(input.slice(8, 10));
        var mm = parseInt(input.slice(5, 7));
        var yyyy = parseInt(input.slice(0, 4));

        var dateToday = new Date(year, month, day);
        var dateInput = new Date(yyyy, mm, dd);
        console.log("FIELD: " + id);
        console.log("TODAY: " + year + "-" + month + "-" + day);
        console.log("INPUT: " + yyyy + "-" + mm + "-" + dd);
        

        if ((year >= yyyy) && (month >= mm) && (day >= dd)) {
            console.log("VALID");
            setValid(id, errorfield);
            return false;
        }
        else {
            console.log("INVALID");
            setInvalid(id, "Invalid input. Date must be at most today.", errorfield);
            return true;
        }
        console.log("\n");
    }

    /**
     * Checks start and end date fields if end date does not precede start date
    */
    function validStartEndDate (dateFlag1, dateFlag2, startInput, endInput, errorfield1, errorfield2, startId, endId) {
        var startDD = parseInt(startInput.slice(5, 6));
        var startMM = parseInt(startInput.slice(8, 10));
        var startYYYY = parseInt(startInput.slice(0, 4));

        var endDD = parseInt(endInput.slice(5, 6));
        var endMM = parseInt(endInput.slice(8, 10));
        var endYYYY = parseInt(endInput.slice(0, 4));

        var dateStart = new Date(startYYYY, startMM, startDD);
        var dateEnd = new Date(endYYYY, endMM, endDD);
        // If either of the start or end date has an error, it should not check
        // for start and end date validation if one of them is wrong anyway
        if (!(dateFlag1 || dateFlag2)) {
            if ((endYYYY >= startYYYY) && (endMM >= startMM) && (endDD >= startDD)) {
                setValid(startId, errorfield1);
                setValid(endId, errorfield2);
            }
            else {
                setInvalid(startId, "Invalid Input. Start date must be before end date.", errorfield1);
                setInvalid(endId, "Invalid Input. Start date must be before end date.", errorfield2);
            }
        }
        
        if ((endYYYY == startYYYY) && (endMM == startMM) && (endDD == startDD))
            return true;
        else
            return false;
    }

    /**
     * Checks start and end time fields if end time does not precede start time
    */
    function validStartEndTime (dateError1, dateError2, dateFlag, startInput, endInput, errorfield1, errorfield2, startId, endId) {
        var startHH = parseInt(startInput.slice(0, 2));
        var startMM = parseInt(startInput.slice(3, 5));

        var endHH = parseInt(endInput.slice(0, 2));
        var endMM = parseInt(endInput.slice(3, 5));

        // Assuming that start and end date is within the SAME day
        // Remove 2nd operand of || if error for invalid date is not needed
        if (dateFlag || (dateError1.html() != "" && dateError2.html() != "")) {
            if (endInput.localeCompare(startInput) == 0) {
                setInvalid(startId, "Invalid Input. Start and end time must be different.", errorfield1);
                setInvalid(endId, "Invalid Input. Start and end time must be different.", errorfield2);
            }
            else if ((endHH >= startHH) && (endMM >= startMM)) {
                setValid(startId, errorfield1);
                setValid(endId, errorfield2);
            }
            else {
                setInvalid(startId, "Invalid Input. Start time must be before end time.", errorfield1);
                setInvalid(endId, "Invalid Input. Start time must be before end time.", errorfield2);
            }
        }
        // Use inner HTML to check for errors
        // else if (/*May error yung StartEndDate: Nauna si End date kay Start date*/)
        // Bawal mauna yung end time kay start time
        // e.g. Start date: 08-22-2021; End date: 08-21-2021
        // Start time: 04:00; End time: 03:00 <--- Should not be allowed?

        // 1. Date input is after today == Error in DATE is detected
        //  - Time has no error even if end time came first than start time
        // 2. Make date same day; retain time == Error in TIME is detected
        // 3. Make date after today == Error is detected on BOTH
        //  - wtf
    }

    /**
     * Checks if quantity stays in the range 0 - 100
    */
    function validAmount (input, errorfield, id) {
        if (!(input > 0 && input <= 100))
            setInvalid(id, "Invalid input. Minimum of 1 and maximum of 100.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if at least one checkbox is checked
    */
    function validCheckbox (id, errorfield) {
        checked = $("input[type=checkbox]:checked").length;
        if (checked <= 0)
            setInvalid(id, "Invalid input. At least one box must be checked.", errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if the length of 'Company Name' is within range
    */
    function validLenCompanyName (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 150})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 150 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if the length of 'Pick-up' the sight are is
     * Checks if the length of 'Pick-up' and 'Destination' sites are within range
    */
    function validLenSite (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 100})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 100 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if the length of 'Plate Number' is within range
    */
    function validLenPlateNum (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 8})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 8 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks if the length of 'Description' is within range
    */
    function validLenDescription (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 200})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 200 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    /**
     * Checks the form for any errors. Prompts the modal if there is none.
     * Otherwise, it scrolls to the top showing all errors
    */
    function getConditions() {
        if (($("#p1Error1").html() == "") && ($("#p1Error2").html() == "") &&( $("#p1Error3").html() == "") &&
            ($("#p1Error4").html() == "") && ($("#p1Error5").html() == "") && ($("#p2Error1").html() == "") && 
            ($("#p2Error2").html() == "") && ($("#p2Error3").html() == "") && ($("#p2Error4").html() == "") && 
            ($("#p3Error1").html() == "") && ($("#p3Error2").html() == "") && ($("#p3Error3").html() == "") && 
            ($("#p3Error4").html() == "") && ($("#p3Error5").html() == "") && ($("#p3Error6").html() == "") && 
            ($("#p3Error7").html() == "") && ($("#p3Error8").html() == "") && ($("#p3Error9").html() == "") && 
            ($("#p3Error10").html() == "") && ($("#p3Error11").html() == "") && ($("#p3Error12").html() == "") && 
            ($("#p4Error1").html() == "") && ($("#p4Error2").html() == "") && ($("#p4Error3").html() == "") && 
            ($("#p4Error4").html() == "") && ($("#p4Error5").html() == "") && ($("#p4Error1").html() == "") ) {
            $("#submit").attr("data-toggle", "modal");
            getModal();
        }   

        else {
            $("#submit").removeAttr("data-toggle");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Gets and displays the modal form
    */
    function getModal () {
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
    }

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

    /**
     * Adding a default value for the radio buttons
     */
    radBtnShip = document.getElementById("shipment1");
    radBtnShip.checked = true;

    radBtnAck = document.getElementById("acknowledgement1");
    radBtnAck.checked = true;
});