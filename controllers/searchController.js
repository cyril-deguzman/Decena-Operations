const Company = require('../models/CompanyModel.js');
const DeliveryReceiptModel = require('../models/DeliveryReceiptModel.js');
const auxiliaryController = require(`./auxiliaryController.js`);

const searchController = {

    /**
     * getSearch.
     * 
     * renders the delivery receipt form.
     * @param {*} req 
     * @param {*} res 
     */
    getSearch: function(req, res) {
        res.render('search-company', {});
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
        let trimmedQuery = searchQuery.trim();
        
        /* Escape regex to avoid DDOS attacks. */
        const regex = new RegExp(auxiliaryController.escapeRegex(trimmedQuery), 'gi');
        
        /* Get all companies from DB */ 
        let foundCompanies = await auxiliaryController.paginatedResults(Company, {name: regex}, 1, 10, 'name');

        foundCompanies.results.forEach((c, i, arr) => {
            let temp = c.name;
            c.dataName = temp.replace(/\s/g, '%20');
        });

        if(foundCompanies.results.length < 1) 
            noMatch = "No companies match that query, please try again.";
                
        await Company.countDocuments({name: regex}, function(err, companyCount) {
            pageCount = companyCount
            res.render("search-company", {companyList:foundCompanies.results, noMatch: noMatch, pageCount: pageCount, searchQuery: trimmedQuery});
        });
    },
    
    /**
     * getViewDRs
     * 
     * renders the delivery receipts of a specified company
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
            lowCompanyName: { $eq: companyName.toLowerCase() }
        }).lean().exec(function (err, results) { 

            results.forEach((dr, i, arr) => {
                let dateIss = arr[i].dateIssued

                arr[i].status = arr[i].status ? 'paid' : 'pending'

                /* Date Issued Reformat */
                arr[i].dateIssued = auxiliaryController.convertDate2(dateIss);

                /* Date Issued Sort Reformat */
                year = dateIss.getFullYear() 
                month = dateIss.getMonth() + 1 >= 10 ? dateIss.getMonth() + 1 : '0' + (dateIss.getMonth() + 1)
                day = dateIss.getDate() >= 10 ? dateIss.getDate() : '0' + dateIss.getDate()
                arr[i].dateIssuedInteger = '' + year  + month + day;
            });

            res.render("view-company-dr", {dr: results, name: companyName, year: today, dataName: dataName})
        })

    },

    /**
     * postPaginateCompanies.
     * 
     * returns a paginated collection of delivery receipts of a certain company
     * @param {*} req 
     * @param {*} res 
     */
    postPaginateCompanies: async function(req, res) {
        let page = req.body.page
        let filter = req.body.filter

        const regex = new RegExp(auxiliaryController.escapeRegex(filter), 'gi');
        let foundCompanies = await auxiliaryController.paginatedResults(Company, {name: regex}, page, 10, 'name');
        
        foundCompanies.results.forEach((c, i, arr) => {
            let temp = c.name;
            c.dataName = temp.replace(/\s/g, '%20');
        });

        res.send(foundCompanies);
    },

    /**
     * postDeleteCompany.
     * 
     * deletes a Company from the database.
     * @param {*} req 
     * @param {*} res 
     */
    postDeleteCompany: function(req, res) {
        let companyName = req.body.companyName;

        Company.findOneAndDelete({name: {$eq: companyName} }, function (err, docs) {
            if (err)
                console.log(err)
            else 
                res.send('success');
        });
    },

}

module.exports = searchController;