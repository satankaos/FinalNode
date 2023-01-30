const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayPokemonDB = await Pokemon.find();
        res.render("pokemon", { 
            arrayPokemon: arrayPokemonDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/crear', (req, res) => {
    res.render('crear'); //nueva vista que llamaremos Crear
 })
 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
   
    try {
        const pokemonDB = new Pokemon(body) //Creamos un nuevo Pokemon, gracias al modelo
        await pokemonDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/pokemon') //Volvemos al listado
    } catch (error) {
        console.err('error', error)
    }
})
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const pokemonDB = await Pokemon.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
       
        res.render('detalle', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            pokemon: pokemonDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.err('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Pokemon no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
   
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const pokemonDB = await Pokemon.findByIdAndDelete({ _id: id });
    
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!pokemonDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Pokémon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Pokémon eliminado.'
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
        const pokemonDB = await Pokemon.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
      
        res.json({
            estado: true,
            mensaje: 'Pokémon editado'
        })
    } catch (error) {
        console.err(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
        })
    }
})
module.exports = router;
