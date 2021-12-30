const { getAllItems, findItems, addItem } = require('../infraestructure/repository/generalRepository')
const { ErrorNotFoundDB } = require ('../customErrors/dbErrors')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
const table = 'usuarios'

let finalResponse ={isStatus:"",sendMessage:""}


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @return {*} response.status
 * @description Conecta con respositorio getAllitems, y devuelve todos los usuarios de la tabla usuarios
 */
const getAllUsers = async (request,response) =>{
    try{
        const users = await getAllItems(table)
        finalResponse.isStatus = 200
        finalResponse.sendMessage = { 'info':'Todos los usuarios',data:users }

    }catch(error){
        console.warn(error.message)
        finalResponse.isStatus = 500
        finalResponse.sendMessage = "Internal sercver error"
    }
    finally{
        response.status(finalResponse.isStatus).send(finalResponse.sendMessage)
    }
}

/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {[object]} response.status
 * @description Conecta con el respositorio genérico de base de datos y devuelve todos los elementos dela tabla usuarios que cumplan las condiciones
 */
const findUsers = async (request,response)=>{
    try{
        const users = await findItems(table,request.query)
        finalResponse.isStatus = 200
        finalResponse.sendMessage ={'info': "Usuarios según condiciones de búsqueda", data:users} 
        
    }catch(error){
        console.warn(error.message)
        finalResponse.isStatus=500
        finalResponse.sendMessage = "Internal server error"
    }finally{
        response.status(finalResponse.isStatus).send(finalResponse.sendMessage)
    }
    
}

/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} devuelve response.status
 * @description Método para dar de alta usuario en base de datos
 */
const addUser = async(request,response)=>{
    try{
        request.body.password= await bcrypt.hash(request.body.password,10)
        const result = await addItem(table, request.body)
        finalResponse.isStatus = 201
        finalResponse.sendMessage ="Usuario creado correctamente"

    }catch(error){
        console.warn(error.message)
        finalResponse.isStatus=500
        finalResponse.sendMessage ="Internal server error"
    }finally{
        response.status(finalResponse.isStatus).send(finalResponse.sendMessage)
    }
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
        const loginUser  = await findItems(table, user)
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

module.exports =  { getAllUsers, findUsers, addUser, login}