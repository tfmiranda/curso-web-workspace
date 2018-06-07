const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.cadastrarUsuario = function(req, res) {    
    console.log(req.body);
    const user = new Usuario(req.body);
    if (req.body.senha != req.body.senha2) {
        console.log('Senha diferente, cancelando operacao');
        res.status(403).send('Senhas nao sao iguais');
    } else {
        user.save()
        .then(() => {
            console.log('Usuario salvo com sucesso');
            res.redirect('/usuarios');
        })
        .catch((err) => {
            console.log('Falha ao salvar usuario');
            res.status(403).send(`Erro ao salvar usuario, motivo: ${err.message}`);
        });    
    }
    
};