const DeliveryReceiptModel = require('../models/DeliveryReceiptModel.js');
const auxiliaryController = require(`./auxiliaryController.js`);

const accountingController = {
    
    /**
     * getViewDRs
     * 
     * @param {*} req 
     * @param {*} res 
     */    
    getViewAllDRs: async function(req, res) {
        let year = req.params.year;
        let date = new Date();
        let today = date.getFullYear();

        if(year)
            today = year;

        DeliveryReceiptModel.find({ 
            dateIssued: { 
                            $gte: new Date(today, 0, 1), 
                            $lt: new Date(today, 11, 31)
                        },
        }).lean().exec(function (err, results) { 

            results.forEach((dr, i, arr) => {
                let dateIss = arr[i].dateIssued
                let datePick = arr[i].pickUpDates;
                let dateDest= arr[i].destinationDates;
                let dateAck = arr[i].acknowledgement;

                arr[i].status = arr[i].status ? 'paid' : 'pending'
                
                /* Date Issued Reformat */
                arr[i].dateIssued = auxiliaryController.convertDate2(dateIss);
                arr[i].dateIssued2 = auxiliaryController.convertDate(dateIss)

                /* Date Issued Sort Reformat */
                year = dateIss.getFullYear() 
                month = dateIss.getMonth() + 1 >= 10 ? dateIss.getMonth() + 1 : '0' + dateIss.getMonth()
                day = dateIss.getDate() >= 10 ? dateIss.getDate() : '0' + dateIss.getDate()
                arr[i].dateIssuedInteger = '' + year  + month + day;

                /* Pick up Dates Reformat */
                arr[i].pickUpDates.arrivalDate = auxiliaryController.convertDate(datePick.arrivalDate);
                arr[i].pickUpDates.departureDate =  auxiliaryController.convertDate(datePick.departureDate);

                /* Destination Dates Reformat */
                arr[i].destinationDates.arrivalDate = auxiliaryController.convertDate(dateDest.arrivalDate);
                arr[i].destinationDates.departureDate = auxiliaryController.convertDate(dateDest.departureDate);
                arr[i].destinationDates.unloadingStartDate = auxiliaryController.convertDate(dateDest.unloadingStartDate);
                arr[i].destinationDates.unloadingFinishedDate = auxiliaryController.convertDate(dateDest.unloadingFinishedDate);

                /* Acknowledgement Date Reformat */
                arr[i].acknowledgement.dateAck = auxiliaryController.convertDate(dateAck.dateAck);
            });
            
            res.render("accounting-dr-list", {dr: results, year: today})
        })

    },
    
    /**
     * 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postUpdateStatus: function(req, res) {
        let id = req.body.id;

        DeliveryReceiptModel.findByIdAndUpdate(id, { status: true }, function (err, docs) {
            if (err)
                console.log(err)
            else
                res.send('success');
        });
    },

}

module.exports = accountingController;