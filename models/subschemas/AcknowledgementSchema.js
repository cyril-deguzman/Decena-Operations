let mongoose = require ("mongoose");

/**
 * AcknowledgementSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property dateAck: date the DR was acknowledged.
 * @property timeAck: time the DR was acknowledged.
 * @property remarks: client's remarks on the service.
 */
let AcknowledgementSchema = new mongoose.Schema ({
	dateAck: {type: Date, required: true},
    timeAck: {type: String, required: true},
    remarks: {type: String, required: true}
});

module.exports = mongoose.model ("Acknowledgement", AcknowledgementSchema);