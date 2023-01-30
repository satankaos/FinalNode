const express = require('express');
const router = express.Router();
const Entrenador = require('../models/entrenador');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayEntrenadorDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayEntrenador que tenemos EN LA VISTA
        const arrayEntrenadorDB = await Entrenador.find();
        
        res.render("entrenador", { 
            arrayEntrenador: arrayEntrenadorDB
        })
    } catch (error) {
        console.err(error)
    }
})
router.get('/crearEntrenador', (req, res) => {
    res.render('crearEnrenador'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    
    try {
        const entrenadorDB = new Entrenador(body) //Creamos un nuevo Entrenador, gracias al modelo
        await entrenadorDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/entrenador') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "entrenador.ejs" le pusimos
    //a este campo entrenador.id, por eso lo llamados con params.id
    try {
        const entrenadorDB = await Entrenador.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Entrenador” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
       
        res.render('detalleEntrenador', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            entrenador: entrenadorDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalleEntrenador', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Entrenador no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.err('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const entrenadorDB = await Entrenador.findByIdAndDelete({ _id: id });
       
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/entrenador') //Esto daría un error, tal y como podemos ver arriba
        if (!entrenadorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Entrenador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Entrenador eliminado.'
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
        const entrenadorDB = await Entrenador.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        
        res.json({
            estado: true,
            mensaje: 'Entrenador editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Entrenador'
        })
    }
})
module.exports = router;
