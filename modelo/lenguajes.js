var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaLenguajes = Schema({
    nombre: String,
    anocreacion: String,
    descripcion: String,
    imagen: String,
    categoria: String
});

module.exports = mongoose.model('lenguajes', EsquemaLenguajes);