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
        const user = await userService.getOneUser(request.params);
        response
            .status(200)
            .send({ data: user })



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
        
        const {token, user: loggedUser} = await userService.login(user);
        response.header('auth-token',token).json({
            data:{
                username:loggedUser.username,
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

    //         let loginUser  = await findItems(table, user)
    //         if(loginUser!=0){
    //             const resultlogin = await bcrypt.compare(request.body.password, loginUser[0].password)
    //             if (resultlogin){
                    // const token = generateToken(loginUser[0].id_usuario, loginUser[0].username,loginUser[0].email, loginUser[0].tipo)
    //                 response.header('authorization',token).json({
    //                     message: 'Usuario autenticado',
    //                     username: loginUser[0].username,
    //                     token:token
    //                 })
    //             }else{
    //                 throw new ErrorNotFoundDB('password')
    //             }
    //         }else{
    //             throw new ErrorNotFoundDB('usuario')
    //         }

    //     }catch(error){
    //         console.warn(error.message)
    //         if(error instanceof ErrorNotFoundDB){
    //             response.status(error.code).send(error.userMessage)
    //         }else{
    //             response.status(500).send("Servicio no disponible")
    //         }
    //     }

}
// /**
//  *
//  * @param {*} request
//  * @param {*} response
//  * @description Borrado de usuario
//  */
const deleteUser = async (request, response) => {
    //     finalResponse = await drop(table, request.params)
    //     response
    //         .status(finalResponse.isStatus)
    //         .send(finalResponse.sendMessage)
}
// //TODO: Revisar errores y funcionamiento de final response. no me convence estructura

const updateUser = async (request, response) => {
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