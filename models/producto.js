const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    Nombre:String,
    Descripcion:String,
    Precio:String,
    Categoria:String,

    
})

//Creamos el modelo
const Producto = mongoose.model('dbproducto', productoSchema, "producto");

module.exports = Producto;
