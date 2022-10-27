const dbRepository = require('../db/generalRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const generateRandomString = require('../helpers/generateRandomCode');
const { sendRegisterMail, sendChangePasswordAlert } = require('../utils/smtp');
const moment = require('moment-timezone');
const { verificatePassword } = require('../helpers/verificatePassword');

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
        const result = await dbRepository.getOneItemNoFilterDelete(table, searchParams);
        return result
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}
// Creamos usuario nuevo, en caso de que exista y este dado de baja enviamos mail de reactivación.
const createNewUser = async (newUserData) => {
    try {
        const codePassword = await bcrypt.hash(newUserData.password, parseInt(process.env.BCRYPT_CODIFICATION));
        const activated_code = generateRandomString(9)
        const newUser = {
            ...newUserData,
            activated_code: activated_code,
            password: codePassword
        }
        await dbRepository.addItem(table, newUser);
        const dbUser = await getOneUser({ username: newUser.username })

        const info = { info: 'Usuario dado de alta con exito' }
        if(process.env.NODE_ENV != 'test') sendRegisterMail(dbUser)
        return { dbUser, info };


    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }


}

const login = async (user) => {
    try {
        const dbUser = await dbRepository.getOneItemNoFilterDelete(table, user);
        if (dbUser.activated_at === null) {
            await sendRegisterMail(dbUser);
            throw new Error('Usuario no activado, reenviado mail de activación');
        }
        
        await verificatePassword(dbUser.password, user.password)
        //Una vez verificado password, si el usuario ha sido dado de baja, enviamos mail
        if (dbUser.deleted) {
            await sendRegisterMail(dbUser)
            throw new Error('Usuario dado de baja')
        }
        const token = generateToken(dbUser)
        return {
            token,
            user: dbUser
        }


    } catch (error) {
        throw {
            status: error.status,
            message: error?.message || 'Error en la validación del password al hacer login'
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

const updateUser = async (id_usuario, updateUserParams) => {
    try {
        await dbRepository.updateItem(table, id_usuario, updateUserParams)

    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}

const activatedUser = async (id_usuario, activated_code) => {
    try {
        const userParams = {
            id_usuario: id_usuario,
            activated_code: activated_code
        }
        const user = await getOneUser(userParams);
        const updatedUser = await updateUser({ id_usuario: userParams.id_usuario }, { activated_at: moment().tz('Europe/Spain').format('YYYY-MM-DD HH:mm'), deleted: false });
    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}

const changePassword = async (id_usuario, passwords) => {
    try {
        const { password, newPassword } = passwords
        const newCryptPassword = await bcrypt.hash(passwords.newPassword, parseInt(process.env.BCRYPT_CODIFICATION))
        const dbUser = await dbRepository.getOneItem(table, id_usuario)
        await verificatePassword(dbUser.password, password);
        await dbRepository.updateItem(table, id_usuario, { password: newCryptPassword })
        if (process.env.NODE_ENV !== test ) await sendChangePasswordAlert(dbUser)
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
    const tokenPayLoad = { id_usuario, username, email, tipo } = dbUser
    const token = jwt.sign(
        { ...tokenPayLoad },
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
    activatedUser,
    changePassword
}