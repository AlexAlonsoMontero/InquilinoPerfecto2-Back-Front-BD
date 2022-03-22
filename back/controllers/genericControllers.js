const { getAllItems, findItems, addItem, delteItem } = require('../infraestructure/repository/generalRepository')
const { ErrorNotFoundDB } = require ('../customErrors/dbErrors')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
const table = 'usuarios'

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
        params.password= await bcrypt.hash(params.password,10)
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
 * @param {object} request 
 * @param {object} response 
 * @returns {object} devuelve response.status().send()
 * @description Llama a delte item para borrar un usuario
 */
const drop = async(request,response) =>{
    try{
        const result = await delteItem('usuarios', request.body)
        if (result){
            finalResponse.isStatus = 200
            finalResponse.sendMessage = "Usuario borrado correctamente de base de datos"
        }else{
            throw new ErrorNotFoundDB('usuario')
        }
    }catch(error){
        console.log(error.message)
        if(error instanceof ErrorNotFoundDB){
            finalResponse.isStatus=error.code
            finalResponse.sendMessage = error.userMessage
        }else{
            finalResponse.isStatus = 500
            finalResponse.sendMessage ="Error en el borrado de usuario"
        }
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



module.exports =  { 
    getAll, 
    find,
    add,
    login,
    drop
}