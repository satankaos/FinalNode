const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    Nombre:String,
    Descripción:String,
    Precio:String,
    Categoría:String,
    Stock:Boolean,
    
})

//Creamos el modelo
const Producto = mongoose.model('dbproducto', productoSchema, "producto");

module.exports = Producto;
