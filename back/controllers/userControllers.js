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
                data: users
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                data: ({ error: error?.message || error })
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
                data: user 
            })



    } catch (error) {
        response
            .status(error?.status)
            .send({ status: "FAILED", data: { error: error?.message || error } })
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
                data: newUser
            })
    } catch (error) {
        response
            .status(error?.status)
            .send({
                status: "FAILED",
                data: { error: error?.message || error },
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
            status: "OK",
            data: {
                username: loggedUser.username,
                id_usuario: loggedUser.id_usuario,
                token
            }
        })
    } catch (error) {
        response
            .status(error?.status)
            .send({
                status: "FAILED",
                data: { error: error?.message || error },
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
                    data: "delete user"
                })
    } catch (error) {
        response
            .status(error?.status)
            .send({
                status: "FAILED",
                data: { error: error?.message || error },
                code: error?.status || 500
            })
            
            
    }


    //     finalResponse = await drop(table, request.params)
    //     response
    //         .status(finalResponse.isStatus)
    //         .send(finalResponse.sendMessage)
}
// //TODO: Revisar errores y funcionamiento de final response. no me convence estructura

const updateUser = async (request, response) => {
    try {
        await userService.updateUser()
    } catch ( error) {
        
    }
    //     finalResponse = await update(table,request.params, request.body);
    //     response
    //         .status(200)
    //         .send(finalResponse.sendMessage)
}


// /**
//  * 
//  * @param {strintg} id_usuario 
//  * @param {string} username 
//  * @param {string} tipo 
//  * @returns {string} Devuelve el token generado
//  */
const generateToken = (id_usuario, username, email, tipo) => {
    //     const tokenPayLoad ={
    //         id_usuario : id_usuario,
    //         username : username,
    //         email : email,
    //         tipo : tipo
    //     }
    //     const token = jwt.sign(
    //         tokenPayLoad,
    //         process.env.TOKEN_SECRET,
    //         { expiresIn : '30d' }
    //     )
    //     return token
}



module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    login,
    deleteUser,
    updateUser
}