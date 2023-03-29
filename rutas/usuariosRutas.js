var usuariosControlador = require('../controlador/usuariosControlador');
//var multipart = require('connect-multiparty');
//var dir_fotos = multipart({ uploadDir: './cargas/usuarios' });
var router = require('../middleware/middleware');;


router.get('/loginUsuario', usuariosControlador.accesoUsuario);
router.get('/getDatosUsuario/:email', usuariosControlador.datosUsuario);
router.delete('/eliminarUsuario/:id', usuariosControlador.eliminarUsuario);
router.post('/registroUsuario', usuariosControlador.registrarUsuario);
router.put('/actualizarUsuario/:email', usuariosControlador.actualizarUsuario);
module.exports = router;