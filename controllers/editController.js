const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');
const Company = require('../models/CompanyModel.js')

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
                dr.dIssued = editController.convertDate(dr.dateIssued);
                dr.dParr = editController.convertDate(dr.pickUpDates.arrivalDate);
                dr.dPdep = editController.convertDate(dr.pickUpDates.arrivalDate);
                dr.dDarr = editController.convertDate(dr.destinationDates.arrivalDate);
                dr.dUnStart = editController.convertDate(dr.destinationDates.unloadingStartDate);
                dr.dUnFin = editController.convertDate(dr.destinationDates.unloadingFinishedDate);
                dr.dDdep = editController.convertDate(dr.destinationDates.departureDate);
                dr.dAck = editController.convertDate(dr.acknowledgement.dateAck);
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
        let companyName = req.body.companyName;
        let clientName = req.body.clientName;
        let	pickSite = req.body.pickSite;
        let	dropSite = req.body.dropSite;
        let shipMode = req.body.shipMode;
        let quantity = req.body.quantity;
        let commodityDesc = req.body.commodityDesc;
        let truckPlateNo = req.body.truckPlateNo;
        let driverName = req.body.driverName;
        let helperName = req.body.helperName;
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
        let processor = req.body.processor;
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
                    Company.findOne({name: companyName}, function (err, result) 
                    {
                        if (err) 
                            console.log(err)

                        else if (!result) 
                        {
                            Company.findOneAndUpdate({name: oldCompanyName}, {$inc: {activeReceipts: -1}}, function(err, succ){
                                if (err)
                                    console.log(err);
                                else {
                                    let company = new Company ({
                                        name: companyName
                                    })
                                    company.save();
                                    res.send(succ);
                                }
                            });
                        }

                        else 
                        {
                            Company.findOneAndUpdate({name: companyName}, {$inc: {activeReceipts: 1}}, function(err, succ){
                                if (err)
                                    console.log(err);
                                res.send(succ);
                            });
                        }
                    });
            }
                
            
        });
          
    },

    convertDate: function(d) {

        var dd = d.getDate();
        var mm = d.getMonth()+1;
        var yyyy = d.getFullYear();

        if(dd < 10)
            dd='0'+dd;
        if(mm < 10)
            mm='0'+mm; 
        date = yyyy+'-'+mm+'-'+dd;
        
        return date
    },
}

module.exports = editController;