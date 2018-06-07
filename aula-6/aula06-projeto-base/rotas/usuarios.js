const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioController.js');

// Definição de rotas
router.get('/', (req, res) => res.render('usuarios/listagem'));
router.get('/cadastro', (req, res) => res.render('usuarios/cadastro'));
router.post('/cadastro', usuarioController.cadastrarUsuario);

module.exports = router;