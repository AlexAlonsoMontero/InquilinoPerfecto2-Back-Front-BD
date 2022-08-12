const express = require('express');
const morgan = require ('morgan');
const userRouterV1 = require('./v1/routes/userRoutes');

const { validateToken } = require('./middlewares/validateToken')

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

//Routes
app.use('/api/v1/users', userRouterV1);


//PRUEBAS
// const endpointPrueba  = '/prueba'
// app.post(endpointPrueba,validateToken,getAllUsers)



//ENDPOINT USERS
const endpointUsers = '/api/users'
const endpointgetOneUser = '/api/users/find'
const endpointLogin = '/api/users/login'
const endpointUserProfile = '/api/users/:id_usuario'



let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
});
