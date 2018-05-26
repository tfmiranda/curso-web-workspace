const express = require('express');
const router = express.Router();

router.get('/executar-codigo', (req, res) => {
    res.render('codigo/executar-codigo');
});

module.exports = router;