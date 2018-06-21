const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

/**
 * Mapeia os erros de validação do mongoose e adiciona mensagens de flash
 * para cada erro existente
 */
function tratarErrosValidacao(err, req) {
    if (err.errors) {
        const tiposErro = Object.keys(err.errors);
        tiposErro.forEach(tipo => {
            const mensagem = err.errors[tipo].message;
            req.flash('warning', mensagem);
        });
    }
}

exports.cadastrarUsuario = function(req, res) {
    const novoUsuario = new Usuario(req.body);
    novoUsuario.save(function(err, usuario) {
        if (err) {
            tratarErrosValidacao(err, req);
            res.redirect('back');
        }
        else {
            req.flash('success', 'Sucesso ao cadastrar usuário');
            res.redirect('/usuarios');
        }
    });
};

exports.listarUsuarios = function(req, res) {
    const usuarios = Usuario.find({}, function(err, usuarios) {
        if (err) {
            req.flash('Erro ao buscar usuários: ', err.message)
            res.redirect('back');
        }
        else {
            res.render('usuarios/listagem', { usuarios });
        }
    });
};

exports.editandoUsuario = function(req, res) {
    const { id } = req.params;
    Usuario.findById(id, function(err, usuario) {
        if (err) {
            req.flash('danger', 'Erro ao buscar usuário para edição');
            res.redirect('back');
        }
        else {
            res.render('usuarios/cadastro', { usuario });
        }
    });
};

exports.editarUsuario = function(req, res) {
    const usuario = req.body;
    console.log('Editando usuário com id:', usuario._id);

    // Caso não venha id do formulário, tentamos obter a partir da URL
    const id = usuario._id || req.params.id;

    // Precisamos verificar se temos realmente um id para evitar usuários maliciosos
    if (!id) {
        req.flash('danger', 'Erro ao tentar editar usuário');
        res.redirect('back')
    }
    else {
        // Opções que vamos passar para as função de update do mongoose
        const opcoes = {
            runValidators: true,
            new: true
        };

        Usuario.findOneAndUpdate({ _id: usuario._id }, usuario, opcoes, 
            function(err, novoUsuario) {
                if (err) {
                    console.log('Ocorreu um erro ao editar o usuário com id:', usuario.id);
                    tratarErrosValidacao(err, req)
                    res.redirect('back');
                }
                else {
                    req.flash('success', 'Sucesso ao atualizar usuário');
                    res.redirect('/usuarios');
                }
            });
    }
};

// Não podemos utilizar mensagens de flash pois o delete é feito por uma requisição ajax
// Temos que tratar no front-end
exports.deletarUsuario = function(req, res) {
    const { id } = req.params;
    Usuario.findOneAndRemove({ _id: id }, function(err, usuario) {
        if (err) {
            res.status(403).json({ mensagem: 'Erro ao deletar usuário' });
        }
        else {
            res.json({ mensagem: 'Usuário deletado com sucesso' });
        }
    });
};