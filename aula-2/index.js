
$(function() {
	// Selecionar todos os elementos li da página e converter para array
	let lista = [];
	$("li").each(function() {
		lista.push({
			"tempo":$(this).attr("data-time"),
			"texto":$(this).text()
		});
	})	
	console.log('lista inicial gerada:');
	console.log(lista);

	// Filtrar apenas os elementos que contém a palavra Javascript
	let listaFiltrada = lista.filter(item => item.texto.includes('Javascript'));
	// console.log('lista filtrada com "Javascript"');
	// console.log(listaFiltrada);

	// Mapear para uma lista de tempos
	let listaTempos = listaFiltrada.map(function(item) {
		return item.tempo;
	});
	// console.log(listaTempos);

	// Mapear para um array de segundos
	let listaTemposSegundos = listaTempos.map(function(item) {
		let splitted = item.split(":");
		let seg = parseInt(splitted[0]) * 60;
		seg = seg + parseInt(splitted[1]);
		return seg;
	});
	// console.log(listaTemposSegundos);	

	// Reduzir para pegar o total
	let total = listaTemposSegundos.reduce((prevValue, value) => prevValue + value);
	console.log('total: ' + total);

	// 🔥 Dá pra fazer tudo em apenas um .reduce() mas estamos praticando arrow functions, então podemos usar encadeamento!
	let novoTotal = lista.reduce(function(prevValue, value){
		let retorno = 0;
		if(value.texto.includes('Javascript')) {
			let splitted = value.tempo.split(":");
			let tempo = (parseInt(splitted[0]) * 60) + parseInt(splitted[1]);
			retorno = tempo;
		}
		return prevValue + retorno;
	},0);
	console.log('total reduce: ' + novoTotal);
});