const express = require('express');
const router = express.Router();
const Medallas = require('../models/medallas');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayMedallasDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayMedallas que tenemos EN LA VISTA
        const arrayMedallasDB = await Medallas.find();
       
        res.render("medallas", { 
            arrayMedallas: arrayMedallasDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearMedallas', (req, res) => {
    res.render('crearMedallas'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    
    try {
        const medallasDB = new Medallas(body) //Creamos un nuevo Medallas, gracias al modelo
        await medallasDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/medallas') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "medallas.ejs" le pusimos
    //a este campo medallas.id, por eso lo llamados con params.id
    try {
        const medallasDB = await Medallas.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Medallas” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
      
        res.render('detalleMedallas', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            medallas: medallasDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalleMedallas', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Medallas no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const medallasDB = await Medallas.findByIdAndDelete({ _id: id });
     
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/medallas') //Esto daría un error, tal y como podemos ver arriba
        if (!medallasDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Medallas.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Medallas eliminado.'
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
        const medallasDB = await Medallas.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        
        res.json({
            estado: true,
            mensaje: 'Medallas editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Medallas'
        })
    }
})
module.exports = router;
