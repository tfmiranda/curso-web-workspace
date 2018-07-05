// Simula uma chamada assíncrona utilizando um callback
function fakeAjax(url, cb) {
    var respostas = {
	arquivo1: 'O primeiro texto.',
	arquivo2: 'O texto do meio.',
	arquivo3: 'O último texto.',
    };

    var randomDelay = Math.round(Math.random() * 1e4) % 8000 + 1000;
    
    console.log('Requisitando:', url, 'delay:', (randomDelay/1000) + 's');

    setTimeout(function() {
	cb(respostas[url]);
    }, randomDelay);
}


// **************************************
// Solução com callbacks

function requisitarArquivo(arquivo) {
    fakeAjax(arquivo, function(conteudo) {
	controlarResposta(arquivo, conteudo);
    });
}

function controlarResposta(nomeArquivo, conteudo) {
    // Escrever o controle de fluxo para os arquivos. Dica: Utilizando callbacks, 
    // é necessário definir variáveis globais para lidar com o problema
    if (debug) console.log(`[${nomeArquivo}] Controle de fluxo ${nomeArquivo}`);
    if (debug) console.log(`[${nomeArquivo}] Valor contador: ${arquivoAtualCount}`);
    if(arquivos.indexOf(nomeArquivo) == arquivoAtualCount ) {
        console.log(conteudo);
        if(arquivos.indexOf(nomeArquivo) == (arquivos.length-1)) console.log('Finalizado!');
        if (debug) console.log(`EXIBICAO ARQUIVO: ${nomeArquivo}`);        
        arquivoAtualCount++;
        if (debug) console.log(`[${nomeArquivo}] Contador apos incremento: ${arquivoAtualCount}`);
    } else {
        if (debug) console.log(`[${nomeArquivo}] Condicao negada, nova iteracao em ${timeout} ms`);  
        setTimeout(function() {
            controlarResposta(nomeArquivo, conteudo);
        }, timeout);
    }
    
    if (debug) console.log(`[${nomeArquivo}] Saindo do controle de fluxo`);   

}

const debug = false;
const timeout = 0;
var arquivoAtualCount = 0;

// Requisita todos os arquivos de uma vez, em "paralelo"
arquivos = ['arquivo1', 'arquivo2', 'arquivo3'];
for (i=0; i < arquivos.length; i++) {
    requisitarArquivo(arquivos[i]);
}
