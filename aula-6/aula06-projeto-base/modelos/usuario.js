const mongoose = require('mongoose');
const validator = require('validator');
const md5 = require('md5');

const usuarioSchema = mongoose.Schema({
	nome: {
		type: String,
		required:  [true,  'É necessário informar um nome']
	},
	sobrenome:  String,
	email: {
		type:  String,
		required:  [true,  'É necessário informar um email'],
		validate:  [validator.isEmail,  'Email inválido']
	},
	senha:  {
		type:  String,
		require:  [true,  'É necessário informar uma senha'],
		min:  [6,  'A senha deve ter no mínimo 6 caracteres']
	}
});

// Campo que não será armazenado no banco mas estará disponível
// para uso em `usuario.gravatar`
usuarioSchema.virtual('gravatar').get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
});

// Chamado antes de salvar um usuário
usuarioSchema.pre('save',  function(next)  {
	this.senha = md5(this.senha);
	next();
});

module.exports = mongoose.model('Usuario',  usuarioSchema);