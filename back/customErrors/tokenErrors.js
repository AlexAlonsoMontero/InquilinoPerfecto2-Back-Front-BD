class ErrorInvalidToken  extends Error {
    constructor(){
        this.name = 'invalidToken'
        this.userMessage = "No se ha podido validar la sesión"
        this.code = 403
        this.message = "Error en la validación del token"
    }
}

module.exports = {
    ErrorInvalidToken
}