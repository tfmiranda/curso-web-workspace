const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = Schema({
  texto: String,
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: [String],
    default: []
  },
  removido: {
    type: Boolean,
    default: false
  }  
});

module.exports = comentarioSchema;
