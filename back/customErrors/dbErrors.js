class ErrorNotFoundDB extends Error {
    constructor(dataType){
        super()
        this.name = "nofFoundUser"
        this.userMessage = `No existe ningun/a ${dataType}, que coincida con el introducido.`
        this.code = 404
        this.message = `No se han localizado ${dataType} en base de datos.`
    }
}

module.exports = {
    ErrorNotFoundDB
}