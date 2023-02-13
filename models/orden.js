const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordenSchema = new Schema({
    IdUsuario:String,
    nombresProductos:String,
    Precio_Total:String,
   

    
})

//Creamos el modelo
const Orden = mongoose.model('dborden', ordenSchema, "orden");

module.exports = Orden;
