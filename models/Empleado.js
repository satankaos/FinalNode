const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const ordenSchema = new Schema({
   Nombre_empleado:String,
    Telefono:Number,
    CorreoCorporativo:String,
    Residencia:String,
   

    
})

//Creamos el modelo
const Empleado = mongoose.model('dbempleado', ordenSchema, "empleado");

module.exports = Empleado;
