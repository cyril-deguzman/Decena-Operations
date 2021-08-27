const Company = require('../models/CompanyModel.js');
const DeliveryReceiptModel = require('../models/DeliveryReceiptModel.js');

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
    getCompanies: async function(req,res) {
        let noMatch = null;
        let pageCount = 0;
        let searchQuery = req.query.search;

        /* Escape regex to avoid DDOS attacks. */
        const regex = new RegExp(searchController.escapeRegex(searchQuery.trim()), 'gi');
        
        /* Get all companies from DB */ 
        let foundCompanies = await searchController.paginatedResults(Company, {name: regex}, 1, 10);

        foundCompanies.results.forEach((c, i, arr) => {
            let temp = c.name;
            c.dataName = temp.replace(/\s/g, '%20');
        });

        if(foundCompanies.results.length < 1) 
            noMatch = "No companies match that query, please try again.";
                
        await Company.countDocuments({name: regex}, function(err, companyCount) {
            pageCount = companyCount
            res.render("search", {companyList:foundCompanies.results, noMatch: noMatch, pageCount: pageCount, searchQuery: searchQuery});
        });
    },
    
    /**
     * getViewDRs
     * 
     * @param {*} req 
     * @param {*} res 
     */    
    getViewDRs: async function(req, res) {
        let companyName = req.params.id;
        let year = req.params.year;
        let date = new Date();
        let today = date.getFullYear();
        let dataName = companyName.replace(/\s/g, '%20');

        if(year)
            today = year;

        DeliveryReceiptModel.find({ 
            dateIssued: { 
                            $gte: new Date(today, 0, 1), 
                            $lt: new Date(today, 11, 31)
                        },
            companyName: { $eq: companyName }
        }).lean().exec(function (err, results) { 
            const months = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];

            results.forEach((dr, i, arr) => {
                let d = arr[i].dateIssued
                arr[i].status = arr[i].status ? 'paid' : 'pending'
                arr[i].dateIssued = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            });

            res.render("search-dr", {dr: results, name: companyName, year: today, dataName: dataName})
        })

    },

    /**
     * postPaginateCompanies.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postPaginateCompanies: async function(req, res) {
        let page = req.body.page
        let filter = req.body.filter

        const regex = new RegExp(searchController.escapeRegex(filter), 'gi');
        let foundCompanies = await searchController.paginatedResults(Company, {name: regex}, page, 10);
        
        foundCompanies.results.forEach((c, i, arr) => {
            let temp = c.name;
            c.dataName = temp.replace(/\s/g, '%20');
        });

        res.send(foundCompanies);
    },

    /**
     * paginatedResults
     * 
     * paginates a collection.
     * @param {*} model the Model to be paginated
     * @param {*} filter the filter for finding the model
     * @param {*} page the page to access
     * @param {*} limit the number of results to return per page.
     * @returns 
     */
    paginatedResults: async function(model, filter, page, limit) {
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
      
        let results = {}
      
        if (endIndex < await model.countDocuments(filter).exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find(filter).lean().limit(limit).skip(startIndex).exec()
            return results;
        } catch (e) {
            console.log(e.message);
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