const Fleet = require('../models/FleetsSchema.js');
const PickUp = require('../models/PickUpSchema.js');
const Destination = require('../models/DestinationSchema.js');
const DocumentList = require('../models/DocumentListSchema.js');
const DeliveryReceipt = require('../models/DeliveryReceiptModel.js');
const Acknowledgement = require('../models/AcknowledgementSchema.js');
const Company = require('../models/CompanyModel.js')

const searchController = {

    /**
     * getSearch.
     * 
     * renders the delivery receipt form.
     * @param {*} req 
     * @param {*} res 
     */
    getSearch: function(req, res) {
        res.render('search', {});
    },

    /**
     * getCompanies.
     * 
     * returns a list of companies that match the criteria.
     * @param {*} req 
     * @param {*} res 
     */
    getCompanies: function(req,res) {
        let noMatch = null;
        if(req.query.search) {
            /* Escape regex to avoid DDOS attacks. */
            const regex = new RegExp(searchController.escapeRegex(req.query.search), 'gi');

            /* Get all companies from DB */ 
            Company.find({name: regex}, function(err, foundCompanies){
                if(err)
                    console.log(err);
                else {
                    if(foundCompanies.length < 1) 
                        noMatch = "No companies match that query, please try again.";
                    
                    res.render("search", {companyList:foundCompanies, noMatch: noMatch});
                }
            });
        } 
        
        else {

            /* Get all companies from DB */ 
            Company.find({}, function(err, allCompanies){
                if(err)
                    console.log(err);
                else
                    res.render("search", {companyList:allCompanies, noMatch: noMatch});
            });
        }
    },
    
    /**
     * escapeRegex
     * 
     * A small security measure to avoid common DDOS attacks that can potentially
     * overload and crash the database.
     * @param {*} text search query of the user to apply the function to.
     * @returns 
     */
    escapeRegex: function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
}

module.exports = searchController;