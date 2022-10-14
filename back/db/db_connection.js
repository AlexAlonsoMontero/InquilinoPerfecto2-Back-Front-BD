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
        throw{
            status: "FAILED",
            message: "Error conexión base de datos"
        }
    }
    
    
}



module.exports = { getConnection }
