const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    usuario: String,
    contraseña: String,
    Dirección_de_envío:String
})

//Creamos el modelo
const Usuario = mongoose.model('dbusuario', usuarioSchema, "usuario");

module.exports = Usuario;
