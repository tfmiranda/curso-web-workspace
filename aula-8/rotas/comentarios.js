const express = require('express');
const router = express.Router();
const comentariosController = require('../controladores/comentariosController');

// Definição de rotas
router.get('/', comentariosController.carregarPaginaComentarios);
router.get('/curtir/:id', comentariosController.curtirComentario);
router.post('/', comentariosController.salvarNovoComentario);

module.exports = router;
