const userService = require('../services/userServices');


const jwt = require('jsonwebtoken')
const table = "usuarios"

// /**
//  * 
//  * @param {object} request 
//  * @param {object} response 
//  * @returns { object } response.status informando de estado de la operacion
//  */
const getAllUsers = async (request, response) => {
    try {
        const users = await userService.getAllUsers();
        response
            .status(200)
            .send({
                status: "OK",
                users
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: ({ error: error?.message || 'Error al localizar los usuario' })
            })
    }

}

// /**
//  * 
//  * @param {object} request 
//  * @param {object} response 
//  * @returns { object } response.status informando de estado de la operacion
//  */
const getOneUser = async (request, response) => {
    try {
        const user = await userService.getOneUser(request.query);
        response
            .status(200)
            .send({
                status: "OK",
                user
            })



    } catch (error) {
        response
            .status(error?.status)
            .send({ status: "FAILED", message: { error: error?.message || 'No se han localizado el usario' } })
    }
}

// /**
//  * 
//  * @param {object} request 
//  * @param {object} response 
//  * @returns { object } response.status informando de estado de la operacion
//  */
const createNewUser = async (request, response) => {
    try {
        const newUser = await userService.createNewUser(request.body);
        response
            .status(200)
            .send({
                status: "OK",
                newUser
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: { error: error?.message || 'Error al crear usuario.' },
                code: error?.status || 500
            })
    }

}

// /**
//  * 
//  * @param {object} request 
//  * @param {object} response 
//  * @returns { object } response.status informando de estado de la operacion
//  */
const login = async (request, response) => {

    try {
        const user = (request.body.username ? { 'username': request.body.username } : { 'email': request.body.email });
        user.password = request.body.password;
        const { token, user: loggedUser } = await userService.login(user);


        response.header('auth-token', token).json({
            status: 200,
            data: {
                username: loggedUser.username,
                id_usuario: loggedUser.id_usuario,
                token
            }


        })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: { error: error?.message || 'Error en el login.' },
                code: error?.status || 500
            })
    }



}
// /**
//  *
//  * @param {*} request
//  * @param {*} response
//  * @description Borrado de usuario
//  */
const deleteUser = async (request, response) => {
    try {
        const {
            params: id_usuario
        } = request
        await userService.deleteUser(id_usuario)
        response
            .status(200)
            .send({
                status: "OK",
                info: "delete user"
            })
    } catch (error) {
        response
            .status(error?.status)
            .send({
                status: "FAILED",
                message: { error: error?.message || 'No se ha podido borrar el usuario' },
                code: error?.status || 500
            })
    }
}


const updateUser = async (request, response) => {
    try {
        const {
            params: id_usuario,
            body: updateUserParams
        } = request
        await userService.updateUser(id_usuario, updateUserParams)
        response
            .status(200)
            .send({
                status: "OK",
                info: "Usuario actualizado"
            })
    } catch (error) {

        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                info: { error: error?.message || 'No se ha podido actualizar el usuario' },
                code: error?.status || 500
            })
    }
}


module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    login,
    deleteUser,
    updateUser
}