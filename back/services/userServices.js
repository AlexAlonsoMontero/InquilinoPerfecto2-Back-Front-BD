const dbRepository = require('../db/generalRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
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
        const codePassword = await bcrypt.hash(newUserData.password, 10)
        const newUser = {
            ...newUserData,
            password: codePassword
        }
        await dbRepository.addItem(table, newUser);
        return newUser;
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
        await dbRepository.updateItem(table,id_usuario,updateUserParams)
        
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
    updateUser
}