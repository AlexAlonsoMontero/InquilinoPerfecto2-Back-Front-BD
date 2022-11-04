class ErrorNotFoundDB extends Error {
    constructor(dataType){
        super()
        this.name = "noFoundItem"
        this.userMessage = `No existe ningun/a ${dataType}, que coincida con el introducido.`
        this.code = 404
        this.message = `No se han localizado ${dataType} en base de datos.`
    }
}

class ErrorNoParams extends Error {
    constructor(paramExpected){
        super()
        this.code = 404
        this.message =`Se esperaba un parametro ${paramExpected}`

    }
}
class ErrorDuplicateEntry extends Error {
    constructor(param){
        super()
        this.code = 401
        this.message =`Entrada ${param} duplicado en base de datos.`;

    }
}

class ErrorGeneryc  extends Error {
    constructor(code, message){
        super()
        this.code = code;
        this.message = message
    }
}

module.exports = {
    ErrorNotFoundDB,
    ErrorNoParams,
    ErrorDuplicateEntry,
    ErrorGeneryc
}