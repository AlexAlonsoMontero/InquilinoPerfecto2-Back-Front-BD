const express = require('express');
const morgan = require ('morgan')

const { pruebaBd } = require('./infraestructure/db_connection')

const app = express();

require('dotenv').config();

app.use(morgan('combinee')); //formato: combined... ver doc https://www.npmjs.com/package/morgan
app.use(express.json())


//ENDPOINT USERS
const endpointGetUsers = '/users'

app.get(endpointGetUsers,pruebaBd)

let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
}); 
