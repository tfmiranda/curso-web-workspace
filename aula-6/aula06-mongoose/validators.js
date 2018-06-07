const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exercicios', function(err) {
    if (err) {
        throw Error('Falha ao se conectar com o mongodb');
    }

    console.log('Conectou ao mongodb com sucesso');

    const dogSchema = mongoose.Schema({
        nome: String,
        idade: {
            type: Number,
            min: [1, 'Idade inválida'],
            max: [12, 'Idade inválida'],
            required: [true, 'É necessário informar uma idade para o cachorro']
        }
    });

    const Dog = mongoose.model('Dog', dogSchema);

    console.log('Tentando salvar um cachorro sem idade');

    tentarSalvarSemIdade();
    tentarSalvarComIdadeInvalida();
    salvarCorretamente();

    function tentarSalvarSemIdade() {
        const marley = new Dog({ nome: 'Marley' });
        marley.save().then(function() {
            console.log('Marley foi salvo com sucesso');
        }).catch(function(err) {
            console.log(err.message);
        });
    }

    function tentarSalvarComIdadeInvalida() {
        const marley = new Dog({ nome: 'Marley', idade: 15 });
        marley.save().then(function() {
            console.log('Marley foi salvo com sucesso');
        }).catch(function(err) {
            console.log(err.message);
        });
    }

    function salvarCorretamente() {
        const marley = new Dog({ nome: 'Marley', idade: 5 });
        marley.save().then(function() {
            console.log('Marley foi salvo com sucesso');
        }).catch(function(err) {
            console.log(err.message);
        });
    }
});