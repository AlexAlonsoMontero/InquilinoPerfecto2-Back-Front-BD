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

module.exports = {
    ErrorNotFoundDB,
    ErrorNoParams
}