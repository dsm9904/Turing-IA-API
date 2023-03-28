var express = require('express');
var usuariosControlador = require('../controlador/usuariosControlador');

var multipart = require('connect-multiparty');
//var dir_fotos = multipart({ uploadDir: './cargas/menu' });
var router = express.Router();

router.post('/registro', usuariosControlador.registrarUsuario);
router.get('/login', usuariosControlador.accesoUsuario);
router.delete('/eliminarUsuario/:id', usuariosControlador.eliminarUsuario);
router.put('/actualizarUsuario/:email', usuariosControlador.actualizarUsuario);
router.get('/getDatos/:email', usuariosControlador.datosUsuario);
module.exports = router;