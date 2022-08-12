const dbRepository = require('../db/generalRepository');

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

    }
}

module.exports = {
    getAllUsers,
    getOneUser,
}