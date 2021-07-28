const {render} = require('../routes/routes.js');

const controller = {

    /**
     * getFavicon
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

    /**
     * getTest.
     * 
     * Database test function.
     * @param {*} req 
     * @param {*} res 
     */
    getTest: function(req, res) {
        console.log(here);
        // var str = "" + count;
        // var pad = "00000000";
        // var okamid = pad.substring(0, pad.length - str.length) + str;

        // var profile = new Profile({
        //     about: '',
        //     bio: 'has not set',
        //     followers: 0
        // });

        // var okami = new Okami({
        //     okamid: okamid,
        //     fullname: firstname + ' ' + lastname,
        //     name: {
        //         first: firstname,
        //         last: lastname
        //     },
        //     email: email,
        //     password: hash,
        //     profile: profile
        // });

        // okami.save();
    },
}

module.exports = controller;