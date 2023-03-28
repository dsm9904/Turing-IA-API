const fs = require('fs').promises;

const eliminarImg = (nombreImg, tipo) => {
    const rutaEliminar = `./cargas/${tipo}/${nombreImg}`;
    // Eliminar imagen
    fs.unlink(rutaEliminar)
        .then(() => console.log('Imagen eliminada'))
        .catch(err => console.log(`Error: ${err}`))

}

module.exports = eliminarImg;