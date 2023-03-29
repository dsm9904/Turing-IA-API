const mongoose = require('mongoose');
var app = require('./app');
var port = 3001; //Puerto del Servidor

//Cadena de conexion a mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/turing').
then(res => app.listen(port, () => { console.log("Conexion Lista"); }),
    error => console.log(error));