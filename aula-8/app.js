const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Bibliotecas de sessão
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const { isLogado } = require('./controladores/authController');
const helpers = require('./helpers');

const app = express();

// As variáveis do arquivo variables.env ficam disponíveis em `process.env.VARIAVEL`
require('dotenv').config({ path: 'variables.env' });

// Conexão com o banco de dados
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('open', () => {
  console.log('Conexão com o MongoDB realizada com sucesso');
});
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 → ${err.message}`);
});

// Registramos nossos schemas do mongoose como models
// para que possamos utilizar em qualquer lugar da aplicação
mongoose.model('Usuario', require('./modelos/Usuario'));
mongoose.model('Comentario', require('./modelos/Comentario'));

// Informa ao express que estamos utilizando pug como template engine e onde estão os arquivos
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve arquivos estáticos (HTML, CSS, Javascript, imagens, etc) a partir da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Transforma as requisições do tipo raw em propriedades do request em req.body
// Para mais informações ver a documentação das bibliotecas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Sessões permitem que as informações dos visitantes sejam guardadas em cada request
 * Utilizado para manter os usuários logados e possibilitar o uso de mensagens de flash
 */
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false, // Salva a sessão apenas se algo for modificado
    unset: 'destroy', // Destrói a sessão caso a mesma for deletada pelo servidor
    saveUninitialized: false, // Não cria a sessão até algo ser salvo
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Após a configuração de sessão, configuramos o passport
const Usuario = mongoose.model('Usuario');

// Configura estratégia de autenticação local com passport.js
passport.use(Usuario.createStrategy());
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

/**
 * Permite que sejam enviadas mensagens de 'flash' para o próximo request.
 * Ex.: req.flash('error', 'Ops, algo deu errado!') -> Envia um objeto que
 * fica para a próxima rota req.flash()
 */
app.use(flash());

/**
 * Podemos acessar em nossos templates todas as propriedades disponíveis em res.locals
 * Abaixo adicionamos uma configuração para recuperar as
 * mensagens de flash em todas as requisições
 * através da variável notificacoes
 */
app.use((req, res, next) => {
  res.locals.notificacoes = req.flash();
  res.locals.user = req.user;
  res.locals.h = helpers;
  next();
});

// Rotas inicias
app.get('/', (req, res) => res.render('index'));

// Cria nossas rotas
app.use('/usuarios', isLogado, require('./rotas/usuarios'));
app.use('/', require('./rotas/auth'));
app.use('/comentarios', isLogado, require('./rotas/comentarios'));

// Inicia o servidor web escutando na porta definida
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escutando na porta: ${process.env.PORT || 3000}`);
});
