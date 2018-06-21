exports.isLogado = function(req, res, next) {    
    if (req.isAuthenticated()) {
        next();                
    } else {
        req.flash('warning', 'Oops, você tem que estar logado para ver essa página 😁');
        res.redirect(307, 'back');
    }    
};