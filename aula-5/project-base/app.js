const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve arquivos estáticos na pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        idadeUsuario: 17,
        nomes: ['nome1', 'nome2', 'nome3']
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/mixins', (req, res) => {
    res.render('exemplo-mixins');
});

app.use('/', require('./rotas/executar-codigo'));

app.listen(3000, () => console.log('Tudo ok na porta 3000!'));