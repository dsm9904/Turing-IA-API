var lenguajeControlador = require('../controlador/lenguajeControlador');
var multipart = require('connect-multiparty');
//var dir_fotos = multipart({ uploadDir: './cargas/menu' });
var router = require('../middleware/middleware');



router.post('/registroLenguaje', lenguajeControlador.registrarLenguaje);
router.get('/getImagen/:imageFile', lenguajeControlador.getImagen);
router.get('/getLenguajesC/:categoria', lenguajeControlador.getLenguajesC);
router.get('/getLenguajes/', lenguajeControlador.getLenguajes);
router.delete('/eliminarLenguaje/:id', lenguajeControlador.eliminarLenguaje);
router.put('/actualizarLenguaje/:id', lenguajeControlador.actualizarLenguaje);

module.exports = router;