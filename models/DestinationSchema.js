let mongoose = require("mongoose");

/**
 * DestinationSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property arrivalDate: Date of arrival
 * @property arrivalTime: Time of arrival
 * @property unloadingStartDate: Date of the unloading started
 * @property unloadingStartTime: Start time of unloading
 * @property unloadingFinishedDate: Date the unloading finished
 * @property unloadingFinishedTime: Finished time of unloading
 * @property departureDate: Date of departure
 * @property departureTime: Time of departure
 */
 let DestinationSchema = new mongoose.Schema ({
 	arrivalDate: {type: Date, required: true},
 	arrivalTime: {type: String, required: true},
   unloadingStartDate: {type: Date, required: true},
   unloadingStartTime: {type: String, required: true},
   unloadingFinishedDate: {type: Date, required: true},
   unloadingFinishedTime: {type: String, required: true},
 	departureDate: {type: Date, required: true},
 	departureTime: {type: String, required: true}
 })

 module.exports = mongoose.model ("Destination", DestinationSchema);