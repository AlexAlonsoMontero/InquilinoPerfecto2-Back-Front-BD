const userService = require('../services/userServices');


const getAllUsers = async (request, response) => {
    try {
        const users = await userService.getAllUsers();
        response
            .status(200)
            .send({
                status: "OK",
                total: users.length,
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


const createNewUser = async (request, response) => {
    try {
        const { dbUser, info } = await userService.createNewUser(request.body);

        response
            .status(200)
            .send({
                status: "OK",
                info,
                user: dbUser
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
                message: error?.message || 'Error en el login.' ,
                code: error?.status || 500
            })
    }



}

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

const activateUser = async (request, response) => {
    try {
        const { id_usuario, activated_code } = request.params
        await userService.activatedUser(id_usuario, activated_code);
        response
            .status(200)
            .send({
                status: "OK",
                info: "Usuario activado"
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

const changePassword = async (request, response)=>{
    try {
        await userService.changePassword(request.params, request.body),
        response
            .status(200)
            .send({
                status: "OK",
                info: "password actualizado"
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

const deactivateUser = async (request, response) =>{
    try {
        
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
    updateUser,
    activateUser,
    changePassword
}