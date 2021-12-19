const {getAllItems} = require('../infraestructure/repository/generalRepository')

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @return {*} response.status
 * @description Conecta con respositorio getAllitems, y devuelve todos los usuarios de la tabla usuarios
 */
const getAllUsers = async (request,response) =>{
    try{
        const users = await getAllItems('usuarios')
        response.status(200).send({ 'info':'Todos los usuarios',data:users })

    }catch(error){
        console.warn(error.message)
        response.status(500).send("Internal server error")
    }
}

module.exports =  { getAllUsers }