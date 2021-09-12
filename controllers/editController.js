const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');
const Company = require('../models/CompanyModel.js')
const auxiliaryController = require(`./auxiliaryController.js`);

const editController = {

    /**
     * getEdit.
     * 
     * renders the edit delivery receipt page.
     * @param {*} req 
     * @param {*} res 
     */
     getEdit: function(req, res) {
        let id = req.params.id;
        DeliveryReceipt.findById(id).lean().exec(function (err, dr) {
            if(err)
                console.log(err);
            else {
                dr.dIssued = auxiliaryController.convertDate(dr.dateIssued);
                dr.dParr = auxiliaryController.convertDate(dr.pickUpDates.arrivalDate);
                dr.dPdep = auxiliaryController.convertDate(dr.pickUpDates.arrivalDate);
                dr.dDarr = auxiliaryController.convertDate(dr.destinationDates.arrivalDate);
                dr.dUnStart = auxiliaryController.convertDate(dr.destinationDates.unloadingStartDate);
                dr.dUnFin = auxiliaryController.convertDate(dr.destinationDates.unloadingFinishedDate);
                dr.dDdep = auxiliaryController.convertDate(dr.destinationDates.departureDate);
                dr.dAck = auxiliaryController.convertDate(dr.acknowledgement.dateAck);
                res.render('edit-form', {dr: dr, id: id});
            }
                
        });
    },

    /**
     * postEditForm.
     * 
     * Saves the editted delivery receipt to the database.
     * @param {*} req 
     * @param {*} res 
     */
    postEditForm: function(req, res) {
        let dr_id = req.body.dr_id;
        let oldCompanyName = req.body.oldCompanyName;
        let dateIssued = req.body.dateIssued;
        let companyName = req.body.companyName.trim();
        let clientName = req.body.clientName.trim();
        let	pickSite = req.body.pickSite.trim();
        let	dropSite = req.body.dropSite.trim();
        let shipMode = req.body.shipMode.trim();
        let quantity = req.body.quantity;
        let commodityDesc = req.body.commodityDesc.trim();
        let truckPlateNo = req.body.truckPlateNo.trim();
        let driverName = req.body.driverName.trim();
        let helperName = req.body.helperName.trim();
        let pArrivalDate = req.body.pArrivalDate;
        let pArrivalTime = req.body.pArrivalTime;
        let pDepartureDate = req.body.pDepartureDate;
        let pDepartureTime = req.body.pDepartureTime;
        let dArrivalDate = req.body.dArrivalDate;
        let dArrivalTime = req.body.dArrivalTime;
        let dStartLoadDate = req.body.dStartLoadDate;
        let dStartLoadTime = req.body.dStartLoadTime;
        let dFinishLoadDate = req.body.dFinishLoadDate;
        let dFinishLoadTime = req.body.dFinishLoadTime;
        let dDepartureDate = req.body.dDepartureDate;
        let dDepartureTime = req.body.dDepartureTime;
        let processor = req.body.processor.trim();
        let remarks = req.body.remarks;
        let dateAck = req.body.dateAck;
        let timeAck = req.body.timeAck;
        let docsBody = req.body.docs;
        let docs = docsBody.split('-');
        docs.pop();

        /* Fleet Details*/
        let fleetDetails = new Fleet ({
            truckPlateNo: truckPlateNo,
            driverName: driverName,
            helperName: helperName
        });

        /* Pick-up Dates */
        let pickUpDates = new PickUp ({
            arrivalDate: pArrivalDate,
            arrivalTime: pArrivalTime,
            departureDate: pDepartureDate,
            departureTime: pDepartureTime
        });

        /* Destination Dates */
        let destinationDates = new Destination ({
            arrivalDate: dArrivalDate,
            arrivalTime: dArrivalTime,
            unloadingStartDate: dStartLoadDate,
            unloadingStartTime: dStartLoadTime,
            unloadingFinishedDate: dFinishLoadDate,
            unloadingFinishedTime: dFinishLoadTime,
            departureDate: dDepartureDate,
            departureTime: dDepartureTime
        });        

        /* Document List */
        let documentList = new DocumentList ({
            documents: docs,
            processor: processor
        });

        /* Acknowledgement */
        let acknowledgement = new Acknowledgement ({
            dateAck: dateAck,
            timeAck: timeAck,
            remarks: remarks,
        });

        /* Update Delivery Receipt */
        DeliveryReceipt.findByIdAndUpdate(dr_id, { 
            dateIssued: dateIssued,
            companyName: companyName,
            lowCompanyName: companyName.toLowerCase(),
            clientName: clientName,
            pickSite: pickSite,
            dropSite: dropSite,
            shipMode: shipMode,
            quantity: quantity,
            commodityDesc: commodityDesc,
            fleetDetails: fleetDetails,
            pickUpDates: pickUpDates,
            destinationDates: destinationDates,
            documentList: documentList,
            acknowledgement: acknowledgement
        },
            function (err, docs) {
            if (err)
                console.log(err)
            else 
            {
                if(companyName != oldCompanyName) 
                    Company.findOne({lowercaseName: companyName.toLowerCase()}, function (err, result) 
                    {
                        if (err) 
                            console.log(err)

                        else if (!result) 
                        {
                            Company.findOneAndUpdate({lowercaseName: oldCompanyName.toLowerCase()}, {$inc: {activeReceipts: -1}}, function(err, succ){
                                if (err)
                                    console.log(err);
                                else {

                                    Company.findOneAndUpdate({lowercaseName: companyName.toLowerCase()}, {$inc: {activeReceipts: 1}}, function(err, succ){
                                        if (err)
                                            console.log(err);
                                        else if(!succ) {
                                            let company = new Company ({
                                                name: companyName,
                                                lowercaseName: companyName.toLowerCase()
                                            })
                                            company.save();
                                            res.send(succ);
                                        }
                                    });
                                    
                                }
                            });
                        }

                        else 
                        {
                            Company.findOneAndUpdate({lowercaseName: oldCompanyName.toLowerCase()}, {$inc: {activeReceipts: -1}}, function(err, succ){
                                if (err)
                                    console.log(err);
                                else
                                    Company.findOneAndUpdate({lowercaseName: companyName.toLowerCase()}, {$inc: {activeReceipts: 1}}, function(err, succ){
                                        if (err)
                                            console.log(err);
                                        res.send(succ);
                                    });
                            });
                            
                        }
                    });
            }
                
            
        });
          
    },

}

module.exports = editController;