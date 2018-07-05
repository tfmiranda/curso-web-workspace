const mongoose = require('mongoose');
const Comentario = mongoose.model('Comentario');

exports.carregarPaginaComentarios = function(req, res) {
  Comentario.find({ removido: false })
    .populate('autor')
    .exec(function(err, comentarios) {
      if (!err) {
        console.log(comentarios);
        res.render('comentarios', { comentarios });
      } else {
        console.log(err);
        res.flash('warning', 'Erro ao buscar comentarios');
        res.redirect('back');
      }
    });
};

exports.salvarNovoComentario = function(req, res) {
  const comentario = new Comentario(req.body);
  console.log(comentario);
  comentario.save(function(err) {
    if (!err) {
      req.flash('success', 'Comentário adicionado com sucesso');
      res.redirect('/comentarios');
    } else {
      console.log(err);
      req.flash('warning', 'Erro ao adicionar comentário');
      req.redirect('back');
    }
  });
};
