const { getAll, find, add, drop } = require('./genericControllers')
const { ErrorNotFoundDB } = require ('../customErrors/dbErrors')
const { findItems } = require('../infraestructure/repository/generalRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { status } = require('express/lib/response')
const table = "usuarios"

const getAllUsers = async(request,response) =>{
    const finalResponse = await getAll(table)
    response.status(finalResponse.isStatus).send({
        info: "Búsqueda de todos los usuarios",
        data: finalResponse.sendMessage
    })
}

const findUsers = async(request , response) =>{
    const finalResponse = await find(table,request.query)
    response
        .status(finalResponse.isStatus)
        .send({
            info: "Busqueda de usuario con parametros",
            data: finalResponse.sendMessage
        })
}

const addUser = async(request, response) => {
    request.body.password = await bcrypt.hash(request.body.password,10)
    const finalResponse = await add(table,request.body)
    response
        .status(finalResponse.isStatus)
        .send({
            info: "Añadir usuario",
            message: finalResponse.sendMessage
        })
}

/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns { object } response.status informando de estado de la operacion
 */
 const login = async(request, response)=>{
    try{
        const user = (request.body.username?{'username':request.body.username}:{'email':request.body.email})
        let loginUser  = await findItems(table, user)
        if(loginUser!=0){
            const resultlogin = await bcrypt.compare(request.body.password, loginUser[0].password)
            if (resultlogin){
                const token = generateToken(loginUser[0].id_usuario, loginUser[0].username,loginUser[0].email, loginUser[0].tipo)
                response.header('authorization',token).json({
                    message: 'Usuario autenticado',
                    username: loginUser[0].username,
                    token:token
                })
            }else{
                throw new ErrorNotFoundDB('password')
            }
        }else{
            throw new ErrorNotFoundDB('usuario')
        }
        
    }catch(error){
        console.warn(error.message)
        if(error instanceof ErrorNotFoundDB){
            response.status(error.code).send(error.userMessage)
        }else{
            response.status(500).send("Servicio no disponible")
        }
    }

}

const deleteUser = async(request, response) => {
    const finalResponse = await drop(table, request.body)
    response
        .status(finalResponse.isStatus)
        .send(finalResponse.sendMessage)
}


/**
 * 
 * @param {strintg} id_usuario 
 * @param {string} username 
 * @param {string} tipo 
 * @returns {string} Devuelve el token generado
 */
const generateToken = (id_usuario,username,email,tipo) =>{
    const tokenPayLoad ={
        id_usuario : id_usuario,
        username : username,
        email : email,
        tipo : tipo
    }
    const token = jwt.sign(
        tokenPayLoad,
        process.env.TOKEN_SECRET,
        { expiresIn : '30d' }
    )
    return token
}

module.exports = {
    getAllUsers,
    findUsers,
    addUser,
    login,
    deleteUser
}