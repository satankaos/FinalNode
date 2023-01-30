const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordenSchema = new Schema({
    IDusuario:String,
    IDproducto:String,
    Fecha:Date,
    Estadopago:Boolean,
    Dirección:String,
    Nombre:String,
    Descripción:String,
})

//Creamos el modelo
const Orden = mongoose.model('dborden', ordenSchema, "orden");

module.exports = Orden;
