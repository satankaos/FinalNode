const express = require('express');
const router = express.Router();
const Empleado = require('../models/empleado');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayEmpleadoDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayEmpleado que tenemos EN LA VISTA
        const arrayEmpleadoDB = await Empleado.find();
        res.render("empleado", { 
            arrayEmpleado: arrayEmpleadoDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearEmpleado', (req, res) => {
    res.render('crearEmpleado'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
   
    try {
        const empleadoDB = new Empleado(body) //Creamos un nuevo Empleado, gracias al modelo
        await empleadoDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/empleado') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "empleado.ejs" le pusimos
    //a este campo empleado.id, por eso lo llamados con params.id
    try {
        const empleadoDB = await Empleado.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Empleado” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
       
        res.render('detalleEmpleado', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            empleado: empleadoDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalleEmpleado', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Empleado no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const empleadoDB = await Empleado.findByIdAndDelete({ _id: id });
    
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/empleado') //Esto daría un error, tal y como podemos ver arriba
        if (!empleadoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Empleado.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Empleado eliminado.'
            })
        } 
    } catch (error) {
        console.err(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    
    try {
        const empleadoDB = await Empleado.findByIdAndUpdate(id, body, { useFindAndModify: false })
      console.log(empleadoDB)
        res.json({
            estado: true,
            mensaje: 'Empleado editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Empleado'
        })
    }
})
module.exports = router;
