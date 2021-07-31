const {render} = require('../routes/routes.js');
const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');
const controller = {

    /**
     * getFavicon
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
     * Database test function.
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
        let remarks = req.body.remarks;
        let ackDate = req.body.ackDate;
        let ackTime = req.body.ackTime;
        let docs = req.body.docs;

        // fleet
        let fleetDetails = new Fleet ({
            truckPlateNo: 'ABC123',
            driverName: 'nathan',
            helperName: 'panchonk'
        });

        // pickup dates
        let pickUpDates = new PickUp ({
            arrivalDate: Date.now(),
            arrivalTime: '23:59',
            departureDate: Date.now(),
            departureTime: '23:59'
        });

        // dest dates
        let destinationDates = new Destination ({
            arrivalDate: Date.now(),
            arrivalTime: '23:59',
            unloadingStartDate: Date.now(),
            unloadingStartTime: '23:59',
            unloadingFinishedDate: Date.now(),
            unloadingFinishedTime: '23:59',
            departureDate: Date.now(),
            departureTime: '23:59'
        });        

        // doclist
        let documentList = new DocumentList ({
            documents: [true, false, false],
            processor: 'Jordan'
        });

        let acknowledgement = new Acknowledgement ({
            dateAck: ackDate,
            timeAck: ackTime,
            remarks: remarks,
        });

        // delrec
        let deliveryReceipt = new DeliveryReceipt({
            companyName: defaultOpt,
            clientName: defaultOpt,
            pickSite: defaultOpt,
            dropSite: defaultOpt,
            shipMode: defaultOpt,
            quantity: 1,
            commodityDesc: defaultOpt,
            fleetDetails: fleetDetails,
            pickUpDates: pickUpDates,
            destinationDates: destinationDates,
            documentList: documentList,
            acknowledgement: defaultOpt
        });

        deliveryReceipt.save();
    },
}

module.exports = controller;