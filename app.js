const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('dotenv').config()
const port = process.env.PORT || 3005

//motor plantillas

app.set('view engine','ejs' )
app.set('views',__dirname+'/views')

//Conexión a base de datos
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const user = 'admin';
const password = 'lBCYcteKVyrbolEN';
const dbname = 'dbtienda';
/*se ha de crear un archivo env para cojer los datos 
process.env.BD_USER
process.env.BD_PASSWORD
process.env.BD_NAME
*/


const uri = `mongodb+srv://${user}:${password}@cluster0.fpooui4.mongodb.net/${dbname}?retryWrites=true&w=majority`;

; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


//ruta middel 
app.use(express.static(__dirname+'/public'));


   // llamadas a las rutas 
   app.use('/',require('./router/rutas'))
   app.use('/usuario',require('./router/usuario'))
   app.use('/producto',require('./router/producto'))
//entrenador en ruta
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
