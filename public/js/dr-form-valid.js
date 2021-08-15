$(document).ready(function () {
    console.log("Hakdog");
    function setInvalid(field, errormsg, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#submit').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field = "#" + field;
        $(field).css('background-color', '#FFFFFF');
        errorfield.text('');
        errorfield.css('background-color', '#FFFFFF');
        $('#submit').attr("disabled", false);
    }

    function validAlpha (name, errorfield, id) {
        if (validator.isEmpty(name))
            setInvalid(id, "Invalid input. Field should not be empty.", errorfield);
        else if (!validator.isAlpha(name))
            setInvalid(id, "Invalid input. Use Alpha characters (A-Z, a-z) only.", errorfield);
        else if (!validator.isLength(name, {min: 2, max: 50}))
            setInvalid(id, "Invalid input. Minimum of 1 character and maximum of 50 characters.", errorfield);
        else
            setValid(id, errorfield);
    }

    // function validCheckBox (name)

    // function validAlphanumeric (input, errorfield, id) {
    //     if (!validator.isAlphanumeric(input))
    //         setInvalid(id, 'Invalid input. Use Alphanumeric characters (A-Z, a-z, 0-9), dash (-), and period (.) only.', errorfield);
    //     else
    //         setValid(id, errorfield);
    // }

    // Length check
    function validLenCompanyName (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 150})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 150 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    function validLenSite (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 100})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 100 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    function validLenPlateNum (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 8})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 8 characters.', errorfield);
        else
            setValid(id, errorfield);
    }

    function validLenDescription (input, errorfield, id) {
        if (!validator.isLength(input, {min: 1, max: 200})) 
            setInvalid(id, 'Invalid input. Minimum of 1 character and maximum of 200 characters.', errorfield);
        else
            setValid(id, errorfield);
    }


    // Alpha
    $('#client-name').keyup(function () {
        var alpha = validator.trim($('#client-name').val());
        validAlpha(alpha, $('#p1Error'), $('#client-name').attr('id'));
    });

    $('#driver').keyup(function () {
        var alpha = validator.trim($('#driver').val());
        validAlpha(alpha, $('#p4Error'), $('#driver').attr('id'));
    });

    $('#helper').keyup(function () {
        var alpha = validator.trim($('#helper').val());
        validAlpha(alpha, $('#p4Error'), $('#helper').attr('id'));
    });

    $('#processor').keyup(function () {
        var alpha = validator.trim($('#processor').val());
        validAlpha(alpha, $('#p2Error'), $('#processor').attr('id'));
    });

    // Alphanumeric
    $('#company-name').keyup(function () {
        var alphaNum = validator.trim($('#company-name').val());
        // validAlphanumeric(alphaNum, $('#p1Error'), $('#company-name').attr('id'));
        validLenCompanyName(alphaNum, $('#p1Error'), $('#company-name').attr('id'));
    });

    $('#pickup-site').keyup(function () {
        var alphaNum = validator.trim($('#pickup-site').val());
        // validAlphanumeric(alphaNum, $('#p1Error'), $('#pickup-site').attr('id'));
        validLenSite(alphaNum, $('#p1Error'), $('#pickup-site').attr('id'));
    });

    $('#delivery-site').keyup(function () {
        var alphaNum = validator.trim($('#delivery-site').val());
        // validAlphanumeric(alphaNum, $('#p1Error'), $('#delivery-site').attr('id'));
        validLenSite(alphaNum, $('#p1Error'), $('#delivery-site').attr('id'));
    });

    $('#plate-number').keyup(function () {
        var alphaNum = $('#plate-number').val();
        // validAlphanumeric(alphaNum, $('#p4Error'), $('#plate-number').attr('id'));
        validLenPlateNum(alphaNum, $('#p4Error'), $('#plate-number').attr('id'));
    });

    $('#description').keyup(function () {
        var alphaNum = validator.trim($('#description').val());
        // validAlphanumeric(alphaNum, $('#p2Error'), $('#description').attr('id'));
        validLenDescription(alphaNum, $('#p2Error'), $('#description').attr('id'));
    });

    // Numeric


    // Dates


    // Time


    // Others
});

/* This comment will be removed after completing the validation
Alpha
    #client-name        50      P1
    #driver             50      P4
    #helper             50      P4
    #processor          50      P2

Alphanumeric
    #company-name       150     P1
    #pickup-site        100     P1
    #delivery-site      100     P1
    #plate-number       8       P4
    #description        200     P2

Dates                   At most today   P3
    date-issued
    #p-arrival-date
    #p-departure-date
    #d-arrival-date
    #start-load-date
    #finish-load-date
    #d-departure-date
    #ack-date                           P4

Time                    At most now
    #p-arrival-time
    #p-departure-time
    #start-load-time
    #finish-load-time
    #d-departure-time
    #ack-time                           P4

Numeric
    #quantity           100     P2

Special (Allows alphanumeric, symbols, etc.)


Others na di ko pa alam gagawin wofubweofub
    let shipMode = $("input[name=shipment]:checked");
    let remarks = $("input[name=acknowledgement]:checked");
    - Driver and truck plate number matches

Current issues
- No default value for radio button
- Invalid values are allowed in dates, time, and quantity
- At least one value in list of documents
*/