const fs = require('fs');

const subirImagen = (imagenBase64, tipo) => {
    var path;
    try {
        let nombreImg;
        let carpeta;
        if (tipo == 'usuario') {
            nombreImg = `usuario_${ Date.now() }.jpg`;
            carpeta = 'usuarios';
            path = `./cargas/${carpeta}/${nombreImg}`;
        } else if (tipo == 'lenguaje') {
            nombreImg = `lenguaje_${ Date.now() }.jpg`;
            carpeta = 'lenguajes';
            path = `./cargas/${carpeta}/${nombreImg}`;
        }
        const base64Data = imagenBase64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        // Subir la imagen
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        return nombreImg;
    } catch (e) {
        return false;
    }
}
module.exports = subirImagen;