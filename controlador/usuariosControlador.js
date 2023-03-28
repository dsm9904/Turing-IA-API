const bcrypt = require('bcrypt');
var usuariosModelo = require('../modelo/usuarios');

let registrarUsuario = async(req, res) => { //Para registrar el usuario
    var usuario = new usuariosModelo(); //Se instancia el modelo de usuarios
    //Se reciben los datos a guardar
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.rol = req.body.rol;
    let existencia = await usuariosModelo.find({ email: usuario.email }).exec();
    if (existencia.length) {
        res.status(500).send({ mesagge: 'Ya existe un usuario registrado con ese email' });
    } else {
        if (req.body.password) { //Si recibe el campo pasword
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                usuario.password = hash;
                if (usuario.nombre != null && usuario.email != null && usuario.rol != null) {
                    //guardar el usuario en BD
                    usuario.save().
                    then(respuesta =>
                        res.status(200).send({ id: respuesta._id, nombre: respuesta.nombre, email: respuesta.email }),
                        error => res.status(404).send({ mesagge: 'No se ha registrado el usuario' }));
                } else {
                    res.status(200).send({ mesagge: 'Introduce todos los campos' });
                }
            });
        } else {
            res.status(500).send({ mesagge: 'Introduce la contraseña' });
        }
    }
}

let accesoUsuario = async(req, res) => { //metodo de acceso al usuario
    var email = req.body.email; //Recibe los datos de email y password por body
    var password = req.body.password;

    let usuario = await usuariosModelo.findOne({ email: email }).exec();
    if (!usuario) {
        res.status(404).send({ mesagge: 'No se encontro el usuario' });
    } else {
        bcrypt.compare(password, usuario.password, (err, check) => { //Comparara el password con el password en la BD
            if (check) {
                //devolver los datos del ususario logeado
                console.log('coincide el password')
                res.status(200).send({ id: usuario._id, nombre: usuario.nombre, email: usuario.email });
            } else {
                res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
            }
        });
    }
}

let datosUsuario = async(req, res) => {
    var email = req.params.email;
    let usuario = await usuariosModelo.findOne({ email: email }).exec();
    if (!usuario) {
        res.status(404).send({ mesagge: 'No se encontro el usuario' });
    } else {
        res.status(200).send({ id: usuario._id, nombre: usuario.nombre, email: usuario.email });
    }

}


let eliminarUsuario = async(req, res) => {
    var id = req.params.id;
    let eliminado = await usuariosModelo.findByIdAndRemove(id);
    if (!eliminado) {
        res.status(404).send({ mesagge: 'No se pudo borrar al usuario' });
    } else {
        res.status(200).send({ message: 'Usuario eliminado' });
    }
}
let actualizarUsuario = async(req, res) => {
    var email = req.params.email;
    var update = req.body;
    let usuario = await usuariosModelo.findOne({ email: email }).exec();
    if (!usuario) {
        res.status(404).send({ mesagge: 'No se encontro al Usuario' });
    } else {
        var actualizado = await usuariosModelo.findOneAndUpdate({ email: email }, update);
        if (!actualizado) {
            res.status(500).send({ mesagge: 'No se actualizo al usuario' });
        } else {
            res.status(500).send({ mesagge: 'Se actualizo al usuario' });
        }
    }
}

module.exports = {
    registrarUsuario,
    accesoUsuario,
    eliminarUsuario,
    actualizarUsuario,
    datosUsuario
};