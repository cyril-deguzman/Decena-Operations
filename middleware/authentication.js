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
    },

    isLoggedIn: function(req, res, next) {
        const role = req.session.role;
        
        console.log(role);

        if(typeof role == 'undefined')
            next();
        else if(role == 'ACCOUNTANT')
            res.redirect(`/accounting`);
        else if(role == 'ENCODER')
            res.redirect(`/search`);
        else
            res.render('error', {});
    }
}

module.exports = authMiddleware;