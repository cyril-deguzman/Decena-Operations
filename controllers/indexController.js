const ENCODER = 'ENCODER';
const ACCOUNTANT = 'ACCOUNTANT';
const ENCODERPASS = 'enc';
const ACCOUNTANTPASS = 'acc';

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
        res.render('login', {});
    },
    
    /**
     * postLogin.
     * 
     * logs in the user.
     * @param {*} req 
     * @param {*} res 
     */
    postLogin: function(req, res) {
        const pass = req.body.pass;
        let sess = req.session;

        switch(pass) {
            case ENCODERPASS: 
                sess.role = ENCODER;
                res.send('enc');
                break; 
            case ACCOUNTANTPASS:
                sess.role = ACCOUNTANT;
                res.send('acc');
                break;
            default:
                res.send('invalid');
        }
    }
}

module.exports = indexController;