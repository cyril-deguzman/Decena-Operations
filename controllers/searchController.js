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
    getCompanies: async function(req,res) {
        let noMatch = null;
        let pageCount = 0;
        let searchQuery = req.query.search;

        /* Escape regex to avoid DDOS attacks. */
        const regex = new RegExp(searchController.escapeRegex(searchQuery), 'gi');

        /* Get all companies from DB */ 
        let foundCompanies = await searchController.paginatedResults(Company, {name: regex}, 1, 10);
        if(foundCompanies.results.length < 1) 
            noMatch = "No companies match that query, please try again.";
                
        await Company.countDocuments({}, function(err, companyCount) {
            pageCount = companyCount
        });

        res.render("search", {companyList:foundCompanies.results, noMatch: noMatch, pageCount: pageCount, searchQuery: searchQuery});  
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
            results.results = await model.find(filter).limit(limit).skip(startIndex).exec()
            return results;
        } catch (e) {
            console.log(e.message);
        }
    },
}

module.exports = searchController;