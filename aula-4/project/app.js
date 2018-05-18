const path = require('path');
const express = require('express');
const app = express();

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