const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exercicios', function(err) {
    if (err) {
        throw Error('Falha ao se conectar com o mongodb');
    }

    console.log('Conectou ao mongodb com sucesso');

    const dogSchema = mongoose.Schema({
        nome: String,
    });

    const Dog = mongoose.model('Dog', dogSchema);
    Dog.find({}, function(err, dogs) {
        console.log('Encontrou os seguintes cachorros:');
        console.log(dogs);
        mongoose.disconnect();
    });
});