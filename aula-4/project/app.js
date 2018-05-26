const path = require('path');
const express = require('express');
const bodyParser = require("body-parser"); // need for POST requests

const app = express();

// Configure express to use JSON parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the views folder and the view engine for express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index', {
		titulo: 'Pug teste',
		mensagem: 'Olá!'
	});	
}); 

app.get('/login', (req, res) => {
	res.render('login');	
});

app.get('/select', (req, res) => {
	res.render('layout');	
});  

app.listen(3000, () => console.log('Servidor escutando na porta 3000!'));