const path = require('path');
const express = require('express');
const bodyParser = require("body-parser"); // need for POST requests

const sum = require('./sum');

const app = express();

// Configure express to use JSON parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', (req, res) => {
	//TODO Return a HTML guide page of API
	res.send('GET /api response');
});

app.get('/api/somar', (req, res) => {
	res.json(sum.sumFromGetRequest(req));
});

app.post('/api/somar', (req, res) => {
	res.json(sum.sumFromPostRequest(req));
});

app.get('/api/subtrair', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	res.json(a - b);
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
	res.json(a * b);
});

app.get('/api/dividir', (req, res) => {
	let a = parseInt(req.query.a);
	let b = parseInt(req.query.b);
	if (b == 0) {
		res.json({ resultado: null, erro: `Divisão por zero` });
	} else {
		res.json(a / b);
	}
});

//TODO api/trig, api/random, api/latex

app.listen(3000, () => console.log('Servidor escutando na porta 3000!'));