const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    usuario: String,
    contraseña: String,
    Direccion_de_envio:String
})

//Creamos el modelo
const Usuario = mongoose.model('dbtienda', usuarioSchema, "usuario");

module.exports = Usuario;
