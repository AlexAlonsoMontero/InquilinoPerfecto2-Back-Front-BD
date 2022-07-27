const express = require('express');
const morgan = require ('morgan')

const { getAllUsers, findUsers, addUser,login, deleteUser, updateUser } = require('./controllers/userControllers.js')
const { validateToken } = require('./middlewares/validateToken')

const app = express();

require('dotenv').config();

app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan
app.use(express.json())


//PRUEBAS
const endpointPrueba  = '/prueba'
app.post(endpointPrueba,validateToken,getAllUsers)

//ENDPOINT USERS
const endpointUsers = '/api/users'
const endpointFindUsers = '/api/users/find'
const endpointLogin = '/api/users/login'
const endpointUserProfile = '/api/users/:id_usuario'

//USER
app.get(endpointUsers,getAllUsers)
app.get(endpointFindUsers,findUsers)
app.post(endpointUsers, addUser)
app.post(endpointLogin,login)
app.delete(endpointUserProfile, deleteUser)
app.put(endpointUserProfile, updateUser)

let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
});
