const dbRepository = require('../db/generalRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const generateRandomString = require('../helpers/generateRandomCode');
const { sendRegisterMail } = require('../utils/smtp');
const moment = require('moment-timezone');

const table = 'usuarios';

const getAllUsers = async () => {
    try {
        return await dbRepository.getAllItems(table)
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const getOneUser = async (searchParams) => {
    try {
        const result = await dbRepository.getOneItem(table, searchParams)
        return result
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const createNewUser = async (newUserData) => {
    try {
        const codePassword = await bcrypt.hash(newUserData.password, 10);
        const activated_code = generateRandomString(9)
        const newUser = {
            ...newUserData,
            activated_code: activated_code,
            password: codePassword
        }

        await dbRepository.addItem(table, newUser);
        const dbUser = await getOneUser({username: newUser.username})
        console.log(dbUser)
        sendRegisterMail(dbUser)
        return dbUser;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }


}

const login = async (user) => {
    try {
        const dbUser = await dbRepository.getOneItem(table, user);
        if (dbUser.activated_at === null ){
            await sendRegisterMail(dbUser);
            throw new Error ('Usuario no activado, reenviado mail de activación');
        }
        if (dbUser.deleted){
            throw new Error ('Usuario dado de baja')
        }
        const result = await bcrypt.compare(user.password, dbUser.password)
        if (!result) {
            throw {
                status: 401,
                message: 'El password no coincide'
            }
        }
        const token = generateToken(dbUser)
        return {
            token,
            user:dbUser
        }


    } catch (error) {

        throw {
            status: error.status,
            message: error?.message || error
        }
    }

}

const deleteUser = async (id_usuario) => {
    try {
        await dbRepository.deleteItem(table, id_usuario)

    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}

const updateUser = async(id_usuario, updateUserParams) =>{
    try {
        console.log(id_usuario)
        await dbRepository.updateItem(table,id_usuario,updateUserParams)
        
    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}

const activatedUser = async( id_usuario, activated_code) =>{
    try {
        const userParams = {
            id_usuario: id_usuario,
            activated_code: activated_code
        }
        const user  = await getOneUser(userParams);
        const updatedUser = await updateUser({id_usuario: userParams.id_usuario}, {activated_at: moment().tz('Europe/Spain').format('YYYY-MM-DD HH:mm')});
        
    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}


// /**
//  * 
//  * @param {strintg} id_usuario 
//  * @param {string} username 
//  * @param {string} tipo 
//  * @returns {string} Devuelve el token generado
//  */
const generateToken = (dbUser) => {
    const tokenPayLoad = { id_usuario ,username, email, tipo } = dbUser
    const token = jwt.sign(
        {...tokenPayLoad},
        process.env.TOKEN_SECRET,
        { expiresIn: '30d' }
    )
    return token
}




module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    login,
    deleteUser,
    updateUser,
    activatedUser
}