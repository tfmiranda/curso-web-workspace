// Route file model for future routes

const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioController.js');
const { isLogado } = require('../controladores/authController');

// Definição de rotas
router.get('/', usuarioController.listarUsuarios);
router.get('/cadastro/:id', usuarioController.isMesmoUsuario, usuarioController.editandoUsuario);
router.get('/cadastro', (req, res) => res.render('usuarios/cadastro'));
router.post('/cadastro', usuarioController.cadastrarUsuario);
router.post('/cadastro/:id', usuarioController.editarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;