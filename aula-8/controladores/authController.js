exports.isLogado = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('warning', 'Oops, você tem que estar logado para ver essa página 😁');
    res.redirect(307, 'back');
  }
};

exports.mesmoUsuarioAutenticado = function(req, res, next) {
  if (req.user.admin || req.user.id === req.params.id) {
    next();
  } else {
    req.flash('warning', 'Oops, você não tem permissão para visualizar essa página');
    res.redirect(307, 'back');
  }
};
