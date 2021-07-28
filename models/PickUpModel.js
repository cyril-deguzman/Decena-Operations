var mongoose = require("mongoose");

/**
 * PickUpSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property truckPlantNo: The truck's plate number.
 * @property driverName: The driver's name
 * @property helperName: The helper's name
 */

 var PickUp = new mongoose.Schema ({
 	arrivalDate = {type: Date, required: true},
 	arrivalTime = {type: String, required: true},
 	departureDate = {type: Date, required: true},
 	departureTime = {type: String, required: true}
 })

 module.exports = mongoose.model ("PickUp", PickUp);