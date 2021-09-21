const DeliveryReceiptModel = require('../models/DeliveryReceiptModel.js');
const Company = require('../models/CompanyModel.js')

const authMiddleware = {

    /**
     * isAccountant
     * 
     * checks if the current session is an accountant.
     * proceeds to call next() if valid, else renders the access-restricted page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isAccountant: function(req, res, next) {
        const role = req.session.role;

        if(role == 'ACCOUNTANT')
            next();
        else 
            res.render('access-restricted', {});
    },

     /**
     * isEncoder
     * 
     * checks if the current session is an encoder.
     * proceeds to call next() if valid, else renders the access-restricted page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isEncoder: function(req, res, next) {
        const role = req.session.role;

        if(role == 'ENCODER')
            next();
        else 
            res.render('access-restricted', {});
    },


    /**
     * isLoggedIn
     * 
     * checks if there is an existing session.
     * if there is, it renders the corresponding session's default page\
     * else it will render the login page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isLoggedIn: function(req, res, next) {
        const role = req.session.role;

        if(typeof role == 'undefined')
            next();
        else if(role == 'ACCOUNTANT')
            res.redirect(`/accounting`);
        else if(role == 'ENCODER')
            res.redirect(`/search`);
        else
            res.render('error', {});
    },
    
    /**
     * isValidYear
     * 
     * checks if the inputted year is valid.
     * proceed to call next() if valid, else it will render the error page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isValidYear: function(req, res, next) {
        let year = req.params.year 

        if(isNaN(year))
            res.render('error', {});
        else if(year > 9999 || year < 1000)
            res.render('error', {});
        else
            next()
    },

    /**
     * isValidCompany
     * 
     * checks if the inputted company exists
     * proceed to call next() if valid, else it will render the error page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isValidCompany: function(req, res, next) {
        let companyName = req.params.id

        Company.exists({lowercaseName: { $eq: companyName.toLowerCase() }}, function(err, result) {
            if (err) 
                res.send(err);
            else 
                if(result)
                    next();
                else
                    res.render('error', {});
        });
    },

    /**
     * isValidReceipt
     * 
     * checks if the inputted receipt id is valid.
     * proceed to call next() if valid, else it will render the error page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isValidReceipt: function(req, res, next) {
        let id = req.params.id

        DeliveryReceiptModel.findById(id, function(err, result) {
            if (err) 
                res.render('error', {});
            else 
                next();
                
        });
    }
}

module.exports = authMiddleware;