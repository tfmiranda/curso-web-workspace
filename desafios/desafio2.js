/**
 * Instruções
 * 
 * 1. Para esse exercício, devemos escrever código de controle de fluxo assíncrono, utilizando o conceito de thunks.
 * 2. Espera-se que:
 *  - Sejam requisitados 3 arquivos ao mesmo tempo (em "paralelo").
 *  - Exibir as respostas assim que cada uma estiver disponível (não apenas esperar que todos finalizem).
 *  - Entretanto, exibir apenas na ordem correta: "arquivo1", "arquivo2", "arquivo3".
 *  - Exibir a mensagem "Finalizado!" depois que todas as 3 requisições estejam prontas.
 */

// Simula uma chamada assíncrona utilizando um callback
function fakeAjax(url, cb) {
    var respostas = {
	arquivo1: 'O primeiro texto.',
	arquivo2: 'O texto do meio.',
	arquivo3: 'O último texto.',
    };

    var randomDelay = Math.round(Math.random() * 1e4) % 8000 + 1000;

    console.log('Requisitando:', url, 'delay:', randomDelay);

    setTimeout(function() {
	cb(respostas[url]);
    }, randomDelay);
}


// **************************************
// Solução com Thunks

function requisitarArquivo(arquivo) {
  // A função requisitarArquivo é o nosso construtor de thunks
  // Devemos fazer a chamada ajax e guardar o estado dela dentro do thunk
  // Como fazer isso?
  fakeAjax(arquivo)
}

// Aqui devemos pré-criar nossos thunks com os nomes dos arquivos que queremos
const getArquivo1 = requisitarArquivo('arquivo1');
const getArquivo2 = requisitarArquivo('arquivo2');
const getArquivo3 = requisitarArquivo('arquivo3');

/**
 * Dica: Começar por aqui!
 * Como requisitar todos os arquivos ao mesmo tempo (em paralelo) utilizando thunks?
 * Lembre-se que thunks são funções que não precisam de parâmetros, 
 * apenas precisam de um callback que será chamado com a resposta
 */

