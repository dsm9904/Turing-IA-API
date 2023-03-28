var express = require('express'); //importa express
var bodyParser = require('body-parser');

var app = express(); //Instancia express
//app.use('/static', express.static(`${__dirname}/uploads`));
app.use(express.json({ limit: '20mb' })); //se aumenta el limite del tamaño recibido
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

//importa las rutas de el controlador
var rutasLenguaje = require('./rutas/lenguajesRutas');
var usuariosRuta = require('./rutas/usuariosRutas');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

// rutas base
app.use('/lenguajes', rutasLenguaje);
app.use('/usuarios', usuariosRuta);

module.exports = app;