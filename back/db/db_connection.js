const mysql = require('mysql2/promise');
require('dotenv').config();
const poolData = {
    connectionLimit: 10,
    host: (process.env.NODE_ENV === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST),
    database: (process.env.NODE_ENV === 'test' ? process.env.DB_DATABASENAME_TEST : process.env.DB_DATABASENAME ),
    user: ( process.env.NODE_ENV === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER),
    password: ( process.env.NODE_ENV === 'test' ? process.env.DB_PASS_TEST :process.env.DB_PASS )
}

const getConnection = () => {
    try {
        let pool
        if (!pool) {
            pool = mysql.createPool(poolData)
        }
        return pool
    } catch (error) {
        throw {
            status: "FAILED",
            message: "Error conexión base de datos"
        }
    }


}



module.exports = { getConnection }
