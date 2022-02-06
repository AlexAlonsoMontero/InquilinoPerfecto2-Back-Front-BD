const express = require('express');
const morgan = require ('morgan')

const { getAllUsers, findUsers } = require('./controllers/userControllers.js')
const { validateToken } = require('./middlewares/validateToken')

const app = express();

require('dotenv').config();

app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan
app.use(express.json())


//PRUEBAS
const endpointPrueba  = '/prueba'
app.post(endpointPrueba,validateToken,getAllUsers)

//ENDPOINT USERS
const endpointGetUsers = '/api/users'
const endpointFindUsers = '/api/users/find'
const endpointAddUser = '/api/users/'
const endpointLogin = '/api/users/login'
const endopintDelteUser = '/api/users/del'

//USER
app.get(endpointGetUsers,getAllUsers)
app.get(endpointFindUsers,findUsers)
// app.post(endpointAddUser, addUser)
// app.post(endpointLogin,login)
// app.post(endopintDelteUser, deleteUser)

let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
}); 
