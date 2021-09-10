const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');
const Company = require('../models/CompanyModel.js')
const auxiliaryController = require(`./auxiliaryController.js`);

const formController = {

    /**
     * getForm.
     * 
     * renders the delivery receipt form page.
     * @param {*} req 
     * @param {*} res 
     */
    getForm: function(req, res) {
        res.render('dr-form', {});
    },

    /**
     * getViewAllDRs
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

        DeliveryReceipt.find({ 
            dateIssued: { 
                            $gte: new Date(today, 0, 1), 
                            $lt: new Date(today, 11, 31)
                        },
        }).lean().exec(function (err, results) { 

            results.forEach((dr, i, arr) => {
                let dateIss = arr[i].dateIssued
                
                arr[i].status = arr[i].status ? 'paid' : 'pending'
                
                /* Date Issued Reformat */
                arr[i].dateIssued = auxiliaryController.convertDate2(dateIss);

                /* Date Issued Sort Reformat */
                year = dateIss.getFullYear() 
                month = dateIss.getMonth() + 1 >= 10 ? dateIss.getMonth() + 1 : '0' + dateIss.getMonth()
                day = dateIss.getDate() >= 10 ? dateIss.getDate() : '0' + dateIss.getDate()
                arr[i].dateIssuedInteger = '' + year  + month + day;

            });
            
            res.render("edit-dr-list", {dr: results, year: today})
        })

    },

    /**
     * postForm.
     * 
     * Saves the delivery receipt to the database.
     * @param {*} req 
     * @param {*} res 
     */
    postForm: function(req, res) {
        let dateIssued = req.body.dateIssued;
        let companyName = req.body.companyName.trim();
        let clientName = req.body.clientName.trim();
        let	pickSite = req.body.pickSite.trim();
        let	dropSite = req.body.dropSite.trim();
        let shipMode = req.body.shipMode.trim();
        let quantity = req.body.quantity;
        let commodityDesc = req.body.commodityDesc.trim();
        let truckPlateNo = req.body.truckPlateNo.trim();
        let driverName = req.body.driverName.trim();
        let helperName = req.body.helperName.trim();
        let pArrivalDate = req.body.pArrivalDate;
        let pArrivalTime = req.body.pArrivalTime;
        let pDepartureDate = req.body.pDepartureDate;
        let pDepartureTime = req.body.pDepartureTime;
        let dArrivalDate = req.body.dArrivalDate;
        let dArrivalTime = req.body.dArrivalTime;
        let dStartLoadDate = req.body.dStartLoadDate;
        let dStartLoadTime = req.body.dStartLoadTime;
        let dFinishLoadDate = req.body.dFinishLoadDate;
        let dFinishLoadTime = req.body.dFinishLoadTime;
        let dDepartureDate = req.body.dDepartureDate;
        let dDepartureTime = req.body.dDepartureTime;
        let processor = req.body.processor.trim();
        let remarks = req.body.remarks;
        let dateAck = req.body.dateAck;
        let timeAck = req.body.timeAck;
        let docsBody = req.body.docs;
        let docs = docsBody.split('-');
        docs.pop();

        /* Fleet Details*/
        let fleetDetails = new Fleet ({
            truckPlateNo: truckPlateNo,
            driverName: driverName,
            helperName: helperName
        });

        /* Pick-up Dates */
        let pickUpDates = new PickUp ({
            arrivalDate: pArrivalDate,
            arrivalTime: pArrivalTime,
            departureDate: pDepartureDate,
            departureTime: pDepartureTime
        });

        /* Destination Dates */
        let destinationDates = new Destination ({
            arrivalDate: dArrivalDate,
            arrivalTime: dArrivalTime,
            unloadingStartDate: dStartLoadDate,
            unloadingStartTime: dStartLoadTime,
            unloadingFinishedDate: dFinishLoadDate,
            unloadingFinishedTime: dFinishLoadTime,
            departureDate: dDepartureDate,
            departureTime: dDepartureTime
        });        

        /* Document List */
        let documentList = new DocumentList ({
            documents: docs,
            processor: processor
        });

        /* Acknowledgement */
        let acknowledgement = new Acknowledgement ({
            dateAck: dateAck,
            timeAck: timeAck,
            remarks: remarks,
        });

        /* Delivery Receipt */
        let deliveryReceipt = new DeliveryReceipt({
            dateIssued: dateIssued,
            companyName: companyName,
            clientName: clientName,
            pickSite: pickSite,
            dropSite: dropSite,
            shipMode: shipMode,
            quantity: quantity,
            commodityDesc: commodityDesc,
            fleetDetails: fleetDetails,
            pickUpDates: pickUpDates,
            destinationDates: destinationDates,
            documentList: documentList,
            acknowledgement: acknowledgement
        });
        
        deliveryReceipt.save();

        Company.findOne({name: companyName}, function (err, result) {
            if (err) 
                console.log(err)
            else if (!result) {
                let company = new Company ({
                    name: companyName
                })

                company.save();
            }
            else {
                Company.findOneAndUpdate({name: companyName}, {$inc: {activeReceipts: 1}},
                    function(err, succ){
                    if (err)
                        console.log(err);
                });
            }
        });

        
    },

}

module.exports = formController;