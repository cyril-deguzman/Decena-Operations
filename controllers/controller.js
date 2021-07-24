const {render} = require('../routes/routes.js');

const controller = {

    /**
     * getIndex.
     * 
     * renders the homepage.
     * @param {*} req 
     * @param {*} res 
     */
    getIndex: function(req, res) {
        res.render('index', {});
    },

    /**
     * getFavicon
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getFavicon: function (req, res) {
        res.status(204);
    },

}

module.exports = controller;