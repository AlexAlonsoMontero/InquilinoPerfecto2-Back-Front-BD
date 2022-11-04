class ErrorInvalidToken  extends Error {
    constructor(personMessage = 'No se ha podido validar la sesión'){
        super();
        this.name = 'invalidToken'
        this.userMessage = personMessage
        this.code = 403
        this.message = "Error en la validación del token"
    }
}

module.exports = {
    ErrorInvalidToken
}