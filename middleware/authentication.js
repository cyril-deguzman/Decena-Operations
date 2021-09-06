const authMiddleware = {

    isAccountant: function(req, res, next) {
        const role = req.session.role;

        if(role == 'ACCOUNTANT')
            next();
        else 
            res.render('access-restricted', {});
    },

    isEncoder: function(req, res, next) {
        const role = req.session.role;

        if(role == 'ENCODER')
            next();
        else 
            res.render('access-restricted', {});
    }
}

module.exports = authMiddleware;