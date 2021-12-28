const { request, response } = require('express')
const bcrypt  = require('bcrypt')
const {getAllItems, findItems, addItem} = require('../infraestructure/repository/generalRepository')
const table = 'usuarios'
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
 * @param {*} request 
 * @param {*} response 
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

const login = async(request, response)=>{
    try{

    }catch(error){
        console.warn(error.message)
        
    }
}

module.exports =  { getAllUsers, findUsers, addUser}