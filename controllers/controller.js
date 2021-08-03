const {render} = require('../routes/routes.js');
const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');

const controller = {

    /**
     * getFavicon.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getFavicon: function (req, res) {
        res.status(204);
    },

    /**
     * getIndex.
     * 
     * renders the homepage.
     * @param {*} req 
     * @param {*} res 
     */
    getIndex: function(req, res) {
        res.render('index', {});
    },

    /**
     * getForm.
     * 
     * renders the delivery receipt form.
     * @param {*} req 
     * @param {*} res 
     */
     getForm: function(req, res) {
        res.render('dr-form', {});
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
        let companyName = req.body.companyName;
        let clientName = req.body.clientName;
        let	pickSite = req.body.pickSite;
        let	dropSite = req.body.dropSite;
        let shipMode = req.body.shipMode;
        let quantity = req.body.quantity;
        let commodityDesc = req.body.commodityDesc;
        let truckPlateNo = req.body.truckPlateNo;
        let driverName = req.body.driverName;
        let helperName = req.body.helperName;
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
        let processor = req.body.processor;
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
    },
}

module.exports = controller;