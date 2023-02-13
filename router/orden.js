const express = require('express');
const router = express.Router();
const Orden = require('../models/orden');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayOrdenDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayOrden que tenemos EN LA VISTA
        const arrayOrdenDB = await Orden.find();
        res.render("orden", { 
            arrayOrden: arrayOrdenDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearOrden', (req, res) => {
    res.render('crearOrden'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
   
    try {
        const ordenDB = new Orden(body) //Creamos un nuevo Orden, gracias al modelo
        await ordenDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/orden') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "orden.ejs" le pusimos
    //a este campo orden.id, por eso lo llamados con params.id
    try {
        const ordenDB = await Orden.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Orden” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
       
        res.render('detalleOrden', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            orden: ordenDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalleOrden', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Orden no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const ordenDB = await Orden.findByIdAndDelete({ _id: id });
    
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/orden') //Esto daría un error, tal y como podemos ver arriba
        if (!ordenDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Orden.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Orden eliminado.'
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
        const ordenDB = await Orden.findByIdAndUpdate(id, body, { useFindAndModify: false })
      console.log(ordenDB)
        res.json({
            estado: true,
            mensaje: 'Orden editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Orden'
        })
    }
})
module.exports = router;
