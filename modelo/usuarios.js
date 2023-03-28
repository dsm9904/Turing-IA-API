var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaUsuarios = Schema({
    nombre: String,
    rol: String,
    email: String,
    password: String
});

module.exports = mongoose.model('usuarios', EsquemaUsuarios);