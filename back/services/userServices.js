const dbRepository = require('../db/generalRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
    try {
        return await dbRepository.getAllItems('usuarios')

    } catch (error) {
        throw error;

    }

}

const getOneUser = async (searchParams) => {
    try {
        const result = await dbRepository.getOneItem('usuarios', searchParams)

        return result
    } catch (error) {
        throw {
            status: error.status,
            data: error.data
        }
    }
}


const createNewUser = async (newUserData) => {
    try {
        console.log('llega')
        const codePassword = await bcrypt.hash(newUserData.password, 10)
        const newUser = {
            ...newUserData,
            password: codePassword
        }
        await dbRepository.addItem('usuarios', newUser);
        return newUser;
    } catch (error) {

        throw {
            status: error.status,
            message: error?.message || error
        }
    }


}

const login = async (user) => {
    try {
        const dbUser = await dbRepository.getOneItem('usuarios', user);
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
        await dbRepository.deleteItem('usuarios', id_usuario)

    } catch (error) {
        throw {
            status: error.status,
            message: error?.data || error
        }
    }
}

const updateUser = async(id_usuario, updateUserParams) =>{
    try {
        await dbRepository.updateItem('usuarios',id_usuario,updateUserParams)
        
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
const generateToken = (id_usuario, username, email, tipo) => {
    const tokenPayLoad = {
        id_usuario: id_usuario,
        username: username,
        email: email,
        tipo: tipo
    }
    const token = jwt.sign(
        tokenPayLoad,
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