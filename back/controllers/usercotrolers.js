const { request, response } = require('express')
const bcrypt  = require('bcrypt')
const {getAllItems, findItems, addItem} = require('../infraestructure/repository/generalRepository')
const { ErrorNotFoundDB } = require ('../customErrors/dbErrors')

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
        response.status(200).send({ 'info':'Todos los usuarios',data:users })

    }catch(error){
        console.warn(error.message)
        response.status(500).send("Internal server error")
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
        response.status(200).send({'info': "Usuarios según condiciones de búsqueda", data:users})
    }catch(error){
        console.warn(error.message)
        response.status(500).send("Internal server error")
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
        response.status(201).send("Usuario creado correctamente")

    }catch(error){
        console.warn(error.message)
        response.status(500).send("Internal server error")
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
                finalResponse = {isStatus:200, sendMessage:"Usuario Logado"}
            }else{
                throw new ErrorNotFoundDB('password')
            }
        }else{
            throw new ErrorNotFoundDB('usuario')
        }
        
    }catch(error){
        console.warn(`${error.message}`)
        finalResponse = {isStatus:error.code,sendMessage:error.userMessage}
    }
    finally{
        response.status(finalResponse.isStatus).send(finalResponse.sendMessage)
    }
}



module.exports =  { getAllUsers, findUsers, addUser, login}