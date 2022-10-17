const { unauthorisedUserError, onHandleErrors } = require("../customErrors/typeOfUserErrors");
const jwt = require('jsonwebtoken')
const validateInquilino = (request, response, next) => {
    const typeOfUser = request.auth.user.tipo;;
    if (typeOfUser === "INQUILINO" || typeOfUser === "INQUILINO/CASERO" || typeOfUser === "ADMINISTRADOR") {
        next()
    } else {
        onHandleErrors(response, typeOfUser)
    }
}

const validateCasero = (request, response, next) => {
    const typeOfUser = request.auth.user.tipo;
    if (typeOfUser === "CASERO" || typeOfUser === "INQUILINO/CASERO" || typeOfUser === "ADMINISTRADOR") {
        next()
    } else {
        onHandleErrors(response, typeOfUser)
        
    }
}

const validateAdministrador = (request, response, next) => {
    const typeOfUser = request.auth.user.tipo;
    if (typeOfUser === "ADMINISTRADOR") {
        next()
    } else {
        onHandleErrors(response, typeOfUser)
    }

}


module.exports = {
    validateInquilino,
    validateCasero,
    validateAdministrador
}