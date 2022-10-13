
const userRouterV1 = require('./v1/routes/userRoutes');

const express = require('express');
const morgan = require ('morgan');


const app = express();

require('dotenv').config();

app.use(express.json());
app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

//Routes
app.use('/api/v1/users', userRouterV1);


//PRUEBAS
// const endpointPrueba  = '/prueba'
// app.post(endpointPrueba,validateToken,getAllUsers)



const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server runing at port ${port}`)
});
