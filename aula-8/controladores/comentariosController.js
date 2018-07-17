const mongoose = require('mongoose');
const Comentario = mongoose.model('Comentario');

exports.carregarPaginaComentarios = function (req, res) {
  Comentario.find({ removido: false })
    .populate('autor')
    .exec(function (err, comentarios) {
      if (!err) {
        // console.log(comentarios);
        res.render('comentarios', { comentarios });
      } else {
        // console.log(err);
        res.flash('warning', 'Erro ao buscar comentarios');
        res.redirect('back');
      }
    });
};

exports.salvarNovoComentario = function (req, res) {
  const comentario = new Comentario(req.body);
  console.log(comentario);
  comentario.save(function (err) {
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

exports.curtirComentario = function (req, res) {
  console.log(`Tentativa de incrementar contador do comentario ${req.params.id} para o usuario ${req.user.id}`);
  Comentario.findById(req.params.id, function (err, comentario) {    
    if (err) {
      req.frash('warning', 'Não foi possível curtir o comentário');
      res.redirect('back');
    } else {
      console.log(`Comentario localizado, atualizando array de curtidas: ${comentario}`);
      res.redirect('/comentarios');
    }
  });  
}