const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://10.6.9.54:27017/tiago');
mongoose.connection.on('open', function() {
    console.log('Conectou com sucesso ao banco mongodb!');
});

mongoose.connection.on('error', function(err) {
    console.log('Algum falha ocorreu com a conexao ao banco mongodb');
    console.log(`Motivo da falha: ${err.message}`);
});

require('./modelos/usuario');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve arquivos estáticos na pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Transforma as requisições do tipo raw em propriedades do request em req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));

app.use('/usuarios', require('./rotas/usuarios'));

app.listen(3000, () => console.log('Tudo ok na porta 3000!'));