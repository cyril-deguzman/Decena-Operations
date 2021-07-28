var mongoose = require('mongoose');

var defaultOpt = {type: String, required: true};

/**
 * DeliveryReceiptSchema.
 * 
 * A sub schema for Howl Schema. A schema for a comment object.
 *
 * @property companyName: 
 * @property clientname: 
 * @property pickSite: 
 * @property dropSite: 
 * @property shipMode:
 * @property quantity: 
 * @property commodityDesc:
 * @property acknowledgement:
 */
var DeliveryReceiptSchema = new mongoose.Schema({
    companyName: defaultOpt,
    clientName: defaultOpt,
    pickSite: defaultOpt,
    dropSite: defaultOpt,
    shipMode: defaultOpt,
    quantity: {type: Number, required: true},
    commodityDesc: defaultOpt,
    // input sub schemas here
    acknowledgement: defaultOpt.required
})

module.exports = mongoose.model('DeliveryReceipt', DeliveryReceiptSchema);