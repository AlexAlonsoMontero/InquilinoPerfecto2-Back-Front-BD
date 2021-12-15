const mysql = require('mysql2/promise');
require('dotenv').config();

const getConnection = () => {
    try{
        let pool
        if (!pool){
            pool = mysql.createPool({
                connectionLimit:10,
                host:process.env.DB_HOST,
                database:process.env.DB_DATABASENAME,
                user:process.env.DB_USER,
                password:process.env.DB_PASS
            })
        }
        return pool
    }catch(error){
        console.log(error)
    }
    
    
}

const pruebaBd = async (request, response) =>{
    const conection = getConnection()
    const consulta = await conection.query("SELECT * FROM usuarios")
    console.log(consulta[0])
    
    request.body= consulta[0]
    response.send({info:"usuarios",data:consulta[0]})
}


module.exports = { getConnection, pruebaBd }
