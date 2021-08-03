let mongoose = require ("mongoose");

/**
 * FleetDetailsSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property truckPlateNo: The truck's plate number.
 * @property driverName: The driver's name
 * @property helperName: The helper's name
 */
let FleetDetailsSchema = new mongoose.Schema ({
	truckPlateNo: {type: String, required: true, maxLength: 8},
	driverName: {type: String, required: true, maxLength: 50},
	helperName: {type: String, required: true, maxLength: 50},
});

module.exports = mongoose.model ("Fleet", FleetDetailsSchema);