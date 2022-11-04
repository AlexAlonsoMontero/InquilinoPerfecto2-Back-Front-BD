const anuncioService = require ( '../services/anuncioServices');
const createAnuncio = async ( request, response ) => {
    try {
        const params = {
            id_inmueble: request.query.id_inmueble,
            precio: request.body.precio
        }
        await anuncioService.createAnuncio( params );
        response
            .status(200)
            .send({
                status: 'OK',
                info: 'Anuncio añadido con exito'
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                info: { error: error?.message || 'No se ha podido crear el anuncio' },
                code: error?.status || 500
            })
    }
}



module.exports = {
    createAnuncio
}