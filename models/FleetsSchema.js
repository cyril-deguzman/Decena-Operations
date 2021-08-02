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
	truckPlateNo: {type: String, required: true},
	driverName: {type: String, required: true},
	helperName: {type: String, required: true}
});

module.exports = mongoose.model ("Fleet", FleetDetailsSchema);