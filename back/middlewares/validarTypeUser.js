const { unauthorisedUserError, onHandleErrors } = require("../customErrors/typeOfUserErrors");

const validateInquilino = (request, response, next) => {
    const typeOfUser = request.body.user.tipo;;
    if (typeOfUser === "INQUILINO" || typeOfUser === "INQUILINO/CASERO" || typeOfUser === "ADMINISTRADOR") {
        next()
    } else {
        onHandleErrors(response, typeOfUser)
    }
}

const validateCasero = (request, response, next) => {
    console.log(request.body.user.tipo)
    const typeOfUser = request.body.user.tipo;;
    if (typeOfUser === "CASERO" || typeOfUser === "INQUILINO/CASERO" || typeOfUser === "ADMINISTRADOR") {
        next()
    } else {
        onHandleErrors(response, typeOfUser)
        
    }
}

const validateAdministrador = (request, response, next) => {
    const typeOfUser = request.body.user.tipo;
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