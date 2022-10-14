const inmuebleService = require('../services/inmuebleServices');

const createNewInmueble = async (request, response) => {
    try {
        const { inmueble } = request.body;
        const id_usuario = request.params.id_usuario;
        await inmuebleService.createNewInmueble(inmueble, id_usuario)
        response
            .status(200)
            .send({
                status: "OK",
                info: "Inmueble agregado con éxito",
                inmueble
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                message: error.message
            })
    }
}

module.exports = {
    createNewInmueble
}