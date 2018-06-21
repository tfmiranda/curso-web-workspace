const mongoose = require('mongoose');
const validator = require('validator');
const md5 = require('md5');
const passportLocalMongoose = require('passport-local-mongoose');

const usuarioSchema = mongoose.Schema({
	nome: {
		type: String,
		required:  [true,  'É necessário informar um nome']
	},
	sobrenome:  String,
	email:  {
		type:  String,
		required:  [true,  'É necessário informar um email'],
		validate:  [validator.isEmail,  'Email inválido']
	}
});

// Campo que não será armazenado no banco mas estará disponível
// para uso em `usuario.gravatar`
usuarioSchema.virtual('gravatar').get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
});

usuarioSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	passwordField: 'senha',
	errorMessages: {
		UserExistsError: 'Já existe um usuário cadastrado com esse email'
	}
});

module.exports = usuarioSchema;