var usuariosControlador = require('../controlador/usuariosControlador');
//var multipart = require('connect-multiparty');
//var dir_fotos = multipart({ uploadDir: './cargas/usuarios' });
var router = require('../middleware/middleware');;



router.post('/registroUsuario', usuariosControlador.registrarUsuario);
router.get('/loginUsuario', usuariosControlador.accesoUsuario);
router.delete('/eliminarUsuario/:id', usuariosControlador.eliminarUsuario);
router.put('/actualizarUsuario/:email', usuariosControlador.actualizarUsuario);
router.get('/getDatosUsuario/:email', usuariosControlador.datosUsuario);
module.exports = router;