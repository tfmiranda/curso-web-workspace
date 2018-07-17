const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioController.js');
const { mesmoUsuarioAutenticado } = require('../controladores/authController');

// Definição de rotas
router.get('/', usuarioController.listarUsuarios);
// router.get('/:id', mesmoUsuarioAutenticado, usuarioController.visualizarUsuario);
router.get('/cadastro', (req, res) => res.render('usuarios/cadastro'));
router.get('/cadastro/:id', mesmoUsuarioAutenticado, usuarioController.editandoUsuario);
router.post('/cadastro', usuarioController.cadastrarUsuario);
router.post('/cadastro/:id', usuarioController.editarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
