const indexController = {

    /**
     * getFavicon.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getFavicon: function (req, res) {
        res.status(204);
    },

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
    
}

module.exports = indexController;