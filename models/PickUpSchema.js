let mongoose = require("mongoose");

/**
 * PickUpSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property arrivalDate: Date of arrival
 * @property arrivalTime: Time of arrival
 * @property departureDate: Date of departure
 * @property departureTime: Time of departure
 */
 let PickUp = new mongoose.Schema ({
 	arrivalDate: {type: Date, required: true},
 	arrivalTime: {type: String, required: true},
 	departureDate: {type: Date, required: true},
 	departureTime: {type: String, required: true}
 })

 module.exports = mongoose.model ("PickUp", PickUp);