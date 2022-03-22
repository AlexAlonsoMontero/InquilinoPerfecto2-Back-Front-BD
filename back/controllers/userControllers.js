const { get } = require('express/lib/response')
const { getAll, find, add, login, drop } = require('./genericControllers')

const table = "usuarios"

const getAllUsers = async(request,response) =>{
    const finalResponse = await getAll(table)
    response.status(finalResponse.isStatus).send({
        info: "Búsqueda de todos los usuarios",
        data: finalResponse.sendMessage
    })
}

const findUsers = async(request , response) =>{
    const finalResponse = await find(table,request.query)
    response
        .status(finalResponse.isStatus)
        .send({
            info: "Busqueda de usuario con parametros",
            data: finalResponse.sendMessage
        })
}

const addUser = async(request, response) => {
    const finalResponse = await add(table,request.body)
    response
        .status(finalResponse.isStatus)
        .send({
            info: "Añadir usuario",
            message: finalResponse.sendMessage
        })
}

module.exports = {
    getAllUsers,
    findUsers,
    addUser
}