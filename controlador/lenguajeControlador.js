var lenguajesModelo = require('../modelo/lenguajes');
const subirImagen = require('../helpers/subirImagen');
const eliminarImagen = require('../helpers/eliminarImg');
var fs = require('fs');
var path = require('path');

let registrarLenguaje = async(req, res) => {
    var lenguajes = new lenguajesModelo();
    lenguajes.nombre = req.body.nombre;
    lenguajes.anocreacion = req.body.anocreacion;
    lenguajes.descripcion = req.body.descripcion;
    lenguajes.categoria = req.body.categoria;
    const imagenBase64 = req.body.imagen ? req.body.imagen : '';
    if (imagenBase64.length) {
        lenguajes.imagen = subirImagen(imagenBase64, 'lenguaje');
        console.log(lenguajes.imagen);
    } else { lenguajes.imagen = "null"; }
    if (lenguajes.nombre != null && lenguajes.anocreacion != null && lenguajes.descripcion != null && lenguajes.categoria != null && lenguajes.imagen != null) {
        lenguajes.save().
        then(respuesta =>
            res.status(200).send({ nombre: respuesta.nombre, ano: respuesta.anocreacion, descripcion: respuesta.descripcion, imagen: respuesta.imagen }),
            error => res.status(500).send({ mesagge: 'Error al guardar los datos' }));

    } else {
        res.status(200).send({ mesagge: 'Introduce todos los campos' });
    }
}

let getImagen = (req, res) => {
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/lenguajes/' + imageFile;
    console.log(imageFile);
    fs.exists(rutaFoto, (existe) => {
        if (existe) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Content-Type', 'image/gif');
            res.sendFile(path.resolve(rutaFoto));
        } else {
            res.status(404).send({ mesagge: 'No has cargado una imagen con ese nombre' });
        }
    })

}
let getLenguajesC = async(req, res) => {
    var categoriaLenguajes = req.params.categoria;
    if (categoriaLenguajes != null) {
        let lenguajes = await lenguajesModelo.find({ categoria: categoriaLenguajes }).exec();
        if (lenguajes.length) {
            console.log(lenguajes)
            res.status(200).send(lenguajes)
        } else {
            res.status(404).send({ mesagge: 'No existe la categoria' })
        }
    } else {
        res.status(200).send('No envio la categoria');
    }
}
let getLenguajes = async(req, res) => {
    let lenguajes = await lenguajesModelo.find().exec();
    if (lenguajes.length) {
        res.status(200).send(lenguajes)
    } else {
        res.status(404).send({ mesagge: 'No existe la categoria' })
    }
}

let eliminarLenguaje = async(req, res) => {
    var id = req.params.id;
    if (id != null) {
        const lenguajeEliminado = await lenguajesModelo.findByIdAndRemove(id);
        if (!lenguajeEliminado) {
            res.status(404).send({ mesagge: 'Error en la peticion' });
        } else {
            res.status(200).send({ mesagge: 'Lenguaje Eliminado' })
        }
    } else {
        res.status(200).send({ mesagge: 'No envio el id' })
    }
}

let actualizarLenguaje = async(req, res) => {
    var id = req.params.id; //GET
    var update = req.body //POST
    var lenguaje = await lenguajesModelo.findById(id);
    if (update.nombre != null && update.anocreacion != null && update.descripcion != null && update.categoria != null && update.imagen != null) {
        eliminarImagen(lenguaje.imagen, "lenguajes");
        const imagenBase64 = req.body.imagen ? req.body.imagen : '';
        if (imagenBase64.length) {
            update.imagen = subirImagen(imagenBase64, 'lenguaje');
            console.log(update.imagen);
        } else { update.imagen = "null"; }

        var actualizado = await lenguajesModelo.findByIdAndUpdate(id, update);
        if (actualizado) {
            res.status(200).send(actualizado);
        } else {
            res.status(404).send({ message: 'Error al actualizar el usuario en el servidor' });
        }
    } else {
        res.status(200).send({ mesagge: 'Envie todos los campos' });
    }

}

module.exports = {
    registrarLenguaje,
    getImagen,
    getLenguajesC,
    getLenguajes,
    eliminarLenguaje,
    actualizarLenguaje
};