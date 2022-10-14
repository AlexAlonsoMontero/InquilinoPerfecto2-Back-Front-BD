const dbRepository = require('../db/generalRepository');
const table = "inmuebles";
const moment = require('moment-timezone');
const createNewInmueble = async (inmueble, id_usuario) => {
    try {
        inmueble.fk_usuario = id_usuario;
        let now = moment().format('LLLL');
        inmueble.fecha_alta = moment().tz('Europe/Spain').format('YYYY-MM-DD HH:mm');
        console.log(inmueble.fecha_alta)

        await dbRepository.addItem(table, inmueble);
    } catch (error) {
        throw {
            message: error.message
        }
    }

}

module.exports = {
    createNewInmueble
}