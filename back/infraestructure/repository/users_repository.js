const {getConnection} = require('../db_connection')
const conection = getConnection()

const getUsers = async (request, response) =>{
    try{
        const consulta = await conection.query("SELECT * FROM usuarios")
        response.send({"info": "usuarios", data:consulta[0] })
    }catch(error){
        console.warn(error)
    }
}

module.exports = { getUsers }