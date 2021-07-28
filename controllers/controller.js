const {render} = require('../routes/routes.js');
const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js')

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
     * getTest.
     * 
     * Database test function.
     * @param {*} req 
     * @param {*} res 
     */
    getTest: function(req, res) {
        
        let defaultOpt = "jusq";
        
        console.log('start');

        // fleet
        let fleetDetails = new Fleet ({
            truckPlateNo: 'ABC123',
            driverName: 'nathan',
            helperName: 'panchonk'
        });

        console.log('1');

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