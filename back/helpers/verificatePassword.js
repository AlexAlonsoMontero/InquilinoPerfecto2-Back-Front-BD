const bcrypt = require('bcrypt');

const verificatePassword = async(dbPassword, password) =>{
    try{
        const result = await bcrypt.compare(password, dbPassword)
        if (!result) {
            throw {
                status: 401,
                message: 'El password no coincide'
            }
        }
        
    }catch(error){
        throw {
            status: error?.status || 500,
            message: error.message
        }
    }
}

module.exports = {
    verificatePassword
}