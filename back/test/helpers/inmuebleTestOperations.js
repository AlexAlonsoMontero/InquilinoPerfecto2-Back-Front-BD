const inmuebleService = require ( '../../services/inmuebleServices');

const createTestInmueble = async ( inmueble, id_usuario ) => {
    try {
        return  await inmuebleService.createNewInmueble(inmueble, id_usuario)
    } catch (error) {
        throw{
            status: 401,
            message: error?.message || 'Error al crear el inmueble en la base de datos de test'
        }
    }
}

const getInmuebleByUser = async( id_usuario ) =>{
    try {
        const dbInmueble = await inmuebleService.getInmuebleByUser({id_usuario: id_usuario})
        return dbInmueble
    } catch (error) {
        throw{
            status: 401,
            message: error?.message || 'Error al localizrar el inmueble en la base de datos de test'
        }
    }
}
module.exports = {
    createTestInmueble,
    getInmuebleByUser
}