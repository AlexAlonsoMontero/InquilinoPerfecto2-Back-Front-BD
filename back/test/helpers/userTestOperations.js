const userServices = require('../../services/userServices')

const createTestUser = async( user ) => {
    try{
        return await userServices.createNewUser(user);
        
    }catch(error){
        throw{
            status: 401,
            message: error?.message || 'No se ha podido crear usuario de test'
        }
    }
}


const loginTestUser = async(loginParams) =>{
    try{
        return await userServices.login(loginParams)
    }catch(error){
        throw{
            status: 401,
            message: error?.message || 'No se ha podido crear usuario de test'
        }
    }
}


module.exports = {
    createTestUser,
    loginTestUser
}