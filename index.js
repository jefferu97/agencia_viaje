
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//conectar db 
db.authenticate()
.then(() => {
 console.info('INFO - Database connected.')
})
.catch(err => {
 console.error('ERROR - Unable to connect to the database:', err)
})

//habilitar pug
app.set('view engine', 'pug');

//obtener a;o actual
app.use((req, resp, next) =>{
    const year = new Date();
    resp.locals.CurrentYear = year.getFullYear(); 
    resp.locals.nombreSitio = 'Agencia de viajes';
    next();

});

//agregar body parser para leer datos del form 
app.use(express.urlencoded({extended: true}));

//definir public folder 
app.use(express.static('public'));

//agregar router 
app.use('/', router);

//puerto y host para app 

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;
app.listen(port, host, () =>{
    console.log('server is working');
})