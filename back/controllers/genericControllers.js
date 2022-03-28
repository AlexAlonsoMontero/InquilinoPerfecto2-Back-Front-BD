const { getAllItems, findItems, addItem, delteItem } = require('../infraestructure/repository/generalRepository')
const { ErrorNotFoundDB } = require ('../customErrors/dbErrors')
const bcrypt  = require('bcrypt')

let finalResponse ={isStatus:"",sendMessage:""}


/**
 * 
 * @param {string} table 
 * @return {{info:string, data:object | string}} object
 * @description Conecta con respositorio getAllitems, y devuelve todos los campos de una tabla
 */
const getAll = async (table) =>{
    try{
        const items = await getAllItems(table)
        if(items.length===0){
            throw new ErrorNotFoundDB(table)
        }else{
            finalResponse.isStatus = 200
            finalResponse.sendMessage = items
        }
        

    }catch(error){
        console.error(error.message)
        finalResponse.isStatus= (error.code ? error.code: 500)
        finalResponse.sendMessage = (error.message ? error.message: "Internal server error")
    }
    finally{
        return finalResponse
    }
}

/**
 * 
 * @param {string} table 
 * @param {{object}} params 
 * @returns {[{info:string, data:object | string}]} object
 * @description Conecta con el respositorio genérico de base de datos y devuelve todos los elementos dela tabla correspondiente con el parametro table que cumplan las condiciones
 */
const find = async (table,params)=>{
    try{
        const items = await findItems(table,params)
        if(items.length===0){
            throw new ErrorNotFoundDB(table)
        }else{
            finalResponse.isStatus = 200
            finalResponse.sendMessage =items 
        }
        
        
    }catch(error){
        console.error(error.message)
        finalResponse.isStatus= (error.code ? error.code: 500)
        finalResponse.sendMessage = (error.message ? error.message: "Internal server error")
    }finally{
        return finalResponse
    }
    
}

/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} devuelve response.status
 * @description Método para dar de alta usuario en base de datos
 */
const add = async(table,params)=>{
    try{
        const result = await addItem(table, params)
        finalResponse.isStatus = 201
        finalResponse.sendMessage ="Usuario creado correctamente"

    }catch(error){
        console.warn(error.message)
        finalResponse.isStatus=500
        finalResponse.sendMessage ="Internal server error"
    }finally{
        return finalResponse
    }
}
/**
 * 
 * @param {stirg} table 
 * @param {object} param 
 * @returns {object} devuelve response.status().send()
 * @description Llama a delete item para borrar un usuario
 */
const drop = async(table,params) =>{
    try{
        const result = await delteItem(table, params)
        if (result){
            finalResponse.isStatus = 200
            finalResponse.sendMessage = "Usuario borrado correctamente de base de datos"
        }else{
            throw new ErrorNotFoundDB( table )
        }
    }catch(error){
        if(error instanceof ErrorNotFoundDB){
            finalResponse.isStatus=error.code
            finalResponse.sendMessage = error.userMessage
        }else{
            finalResponse.isStatus = 500
            finalResponse.sendMessage ="Error en el borrado de usuario"
        }
    }finally{
        return finalResponse
    }
    
    
    
    
}







module.exports =  { 
    getAll, 
    find,
    add,
    drop
}