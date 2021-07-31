let mongoose = require("mongoose");

/**
 * DocumentListSchema.
 * 
 * A sub schema for DeliveryReceipt Schema.
 * 
 * @property documents: documents received.
 * @property processor: name of the processor of said documents.
 */
 let DocumentListSchema = new mongoose.Schema ({
      documents: {type: [String], required: true},
      processor: {type: String, required: true}
 })

 module.exports = mongoose.model ("DocumentList", DocumentListSchema);