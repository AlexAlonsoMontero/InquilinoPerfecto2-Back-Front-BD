const dbRepository = require('../db/generalRepository');
const { generateToken } = require('../helpers/generateToken');

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
        // console.log(error.status);
        // throw { status: error?.status || 500, messa, message: error?.message || error}
        console.log(error);
        throw {
            status: error.status,
            data: error.data
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

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    login
}