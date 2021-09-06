const DeliveryReceiptModel = require('../models/DeliveryReceiptModel.js');

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
                arr[i].dateIssued = accountingController.changeDateFormat(dateIss);

                /* Pick up Dates Reformat */
                arr[i].pickUpDates.arrivalDate = accountingController.changeDateFormat(datePick.arrivalDate);
                arr[i].pickUpDates.departureDate =  accountingController.changeDateFormat(datePick.departureDate);

                /* Destination Dates Reformat */
                arr[i].destinationDates.arrivalDate = accountingController.changeDateFormat(dateDest.arrivalDate);
                arr[i].destinationDates.departureDate = accountingController.changeDateFormat(dateDest.departureDate);
                arr[i].destinationDates.unloadingStartDate = accountingController.changeDateFormat(dateDest.unloadingStartDate);
                arr[i].destinationDates.unloadingFinishedDate = accountingController.changeDateFormat(dateDest.unloadingFinishedDate);

                /* Acknowledgement Date Reformat */
                arr[i].acknowledgement.dateAck = accountingController.changeDateFormat(dateAck.dateAck);
            });
            
            res.render("accounting-dr-list", {dr: results, year: today})
        })

    },

    postUpdateStatus: function(req, res) {
        let id = req.body.id;

        DeliveryReceiptModel.findByIdAndUpdate(id, { status: true }, function (err, docs) {
            if (err)
                console.log(err)
            else
                res.send('success');
        });
    },

    /**
     * paginatedResults
     * 
     * paginates a collection.
     * @param {*} model the Model to be paginated
     * @param {*} filter the filter for finding the model
     * @param {*} page the page to access
     * @param {*} limit the number of results to return per page.
     * @returns 
     */
    paginatedResults: async function(model, filter, page, limit) {
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
      
        let results = {}
      
        if (endIndex < await model.countDocuments(filter).exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find(filter).lean().limit(limit).skip(startIndex).exec()
            return results;
        } catch (e) {
            console.log(e.message);
        }
    },

     /**
     * escapeRegex
     * 
     * A small security measure to avoid common DDOS attacks that can potentially
     * overload and crash the database.
     * @param {*} text search query of the user to apply the function to.
     * @returns 
     */
    escapeRegex: function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    changeDateFormat: function(date) {
        const months = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];

        date =  months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        
        return date;
    }
}

module.exports = accountingController;