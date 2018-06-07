const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exercicios', function(err) {
    if (err) {
        throw Error('Falha ao se conectar com o mongodb');
    }

    console.log('Conectou ao mongodb com sucesso');

    const dogSchema = mongoose.Schema({
        nome: String,
    });

    const Dog = mongoose.model('Dog', dogSchema);
    const marley = new Dog({ nome: 'Marley' });
    marley.save().then(function() {
        console.log('Marley foi salvo com sucesso');
        mongoose.disconnect();
    });
});