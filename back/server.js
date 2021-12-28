const express = require('express');
const morgan = require ('morgan')

const { getAllUsers,findUsers } = require('./controllers/usercotrolers')

const app = express();

require('dotenv').config();

app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan
app.use(express.json())


//ENDPOINT USERS
const endpointGetUsers = '/api/users'
const endpointFindUsers = '/api/users/find'

app.get(endpointGetUsers,getAllUsers)
app.get(endpointFindUsers,findUsers)

let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
}); 
