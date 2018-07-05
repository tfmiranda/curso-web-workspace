const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
    failuteRedirect: '/login',
    failureFlash: 'Erro ao tentar entrar no sistema',
    successRedirect: '/',
    successFlash: 'Você entrou no sistema com sucesso!'
  })
);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Até a próxima! 👋');
    res.redirect('/');
});

module.exports = router;