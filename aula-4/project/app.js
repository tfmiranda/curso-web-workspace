const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/api', (req, res) => {
	//TODO Return a HTML guide page of API
	res.send('GET /api response');
});

app.get('/api/somar', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	res.json(a+b);
});

app.post('/api/somar', (req, res) => {
	let values = req.body.values;
	values = JSON.parse(values);
	let total = 0;
	values.forEach(element => {
		total = total + element;
	});
	res.json(total);
});

app.get('/api/subtrair', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	res.json(a-b);
});

app.post('/api/subtrair', (req, res) => {
	let values = req.body.values;
	values = JSON.parse(values);
	let total = 0;
	values.forEach(element => {
		total = total - element;
	});
	res.json(total);
});

app.get('/api/multiplicar', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	res.json(a*b);
});

app.get('/api/dividir', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	if(b==0) {
		res.json({resultado: null, erro: `Divisão por zero`});
	}else{
		res.json(a/b);
	}	
});

//TODO Move calc functions to aula-3 project
//TODO api/trig, api/random, api/latex

app.listen(3000, () => console.log('Servidor escutando na porta 3000!'));