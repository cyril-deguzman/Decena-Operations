let mongoose = require ("mongoose");

/**
 * CompanySchema.
 * 
 * A schema for the Company model.
 * 
 * @property name: name of the client's company.
 * @property activeReceipts: currently active receipts of the company.
 * @property validatedReceipts: signed out receipts by the accounting department.
 */
let CompanySchema = new mongoose.Schema ({
	name: {type: String, required: true, maxLength: 150},
	activeReceipts: {type: Number, default: 1},
	validatedReceipts: {type: Number, default: 0}
});

module.exports = mongoose.model ("Company", CompanySchema);