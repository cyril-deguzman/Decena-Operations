let mongoose = require('mongoose');
const Fleet = require('./FleetsSchema.js');
const PickUp = require('./PickUpSchema.js');
const Destination = require('./DestinationSchema.js');
const DocumentList = require('./DocumentListSchema.js');

let defaultOpt = {type: String, required: true};

/**
 * DeliveryReceiptSchema.
 * 
 * A sub schema for Howl Schema. A schema for a comment object.
 *
 * @property companyName: Name of the client's company.
 * @property clientname: Name of the client.
 * @property pickSite: Location of the goods to pick up.
 * @property dropSite: Location to deliver picked up goods.
 * @property shipMode: Mode of shipment.
 * @property quantity: Quantity to deliver.
 * @property commodityDesc: Description of the goods.
 * @property fleetDetails: Details of the fleet.
 * @property pickUpDates: Time and dates during picking up of goods.
 * @property destinationDates: Time and dates during delivery of picked up goods.
 * @property documentList: List of documents processed and the processor.
 * @property acknowledgement: Acknowledgement of the receipt.
 */
let DeliveryReceiptSchema = new mongoose.Schema({
    companyName: defaultOpt,
    clientName: defaultOpt,
    pickSite: defaultOpt,
    dropSite: defaultOpt,
    shipMode: defaultOpt,
    quantity: {type: Number, required: true},
    commodityDesc: defaultOpt,
    fleetDetails: {type: Fleet.schema, required: true},
    pickUpDates: {type: PickUp.schema, required: true},
    destinationDates: {type: Destination.schema, required: true},
    documentList: {type: DocumentList.schema, required: true},
    acknowledgement: defaultOpt
})

module.exports = mongoose.model('DeliveryReceipt', DeliveryReceiptSchema);