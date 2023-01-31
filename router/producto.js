const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayProductoDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayProducto que tenemos EN LA VISTA
        const arrayProductoDB = await Producto.find();
        res.render("producto", { 
            arrayProducto: arrayProductoDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crearProducto', (req, res) => {
    res.render('crearProducto'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
   
    try {
        const productoDB = new Producto(body) //Creamos un nuevo Producto, gracias al modelo
        await productoDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/producto') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "producto.ejs" le pusimos
    //a este campo producto.id, por eso lo llamados con params.id
    try {
        const productoDB = await Producto.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Producto” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
       
        res.render('detalleProducto', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            producto: productoDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalleProducto', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Producto no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const productoDB = await Producto.findByIdAndDelete({ _id: id });
    
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/producto') //Esto daría un error, tal y como podemos ver arriba
        if (!productoDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Producto.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Producto eliminado.'
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
        const productoDB = await Producto.findByIdAndUpdate(id, body, { useFindAndModify: false })
      console.log(productoDB)
        res.json({
            estado: true,
            mensaje: 'Producto editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Producto'
        })
    }
})
module.exports = router;
