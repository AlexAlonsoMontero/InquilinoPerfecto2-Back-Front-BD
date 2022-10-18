const dbRepository = require('../db/generalRepository');
const table = "inmuebles";
const moment = require('moment-timezone');
const { ErrorNotFoundDB } = require('../customErrors/dbErrors');


const createNewInmueble = async (inmueble, id_usuario) => {
    try {
        inmueble.fk_usuario = id_usuario;
        inmueble.fecha_alta = moment().tz('Europe/Spain').format('YYYY-MM-DD HH:mm');
        await dbRepository.addItem(table, inmueble);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const getAllInmuebles = async () => {
    try {
        const inmuebles = await dbRepository.getAllItems(table);
        if (inmuebles.length === 0) throw new ErrorNotFoundDB(table)
        return inmuebles
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const getOneInmueble = async( params )=>{
    try {
        const inmueble = await dbRepository.getOneItem(table, params);
        return inmueble
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const deleteInmueble = async ( params ) =>{
    try {
        await dbRepository.deleteItem(table, params);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const updateInmueble = async(id_inmueble, inmuebleUpdateParams ) => {
    try{
        await dbRepository.updateItem(table, id_inmueble, inmuebleUpdateParams )
    }catch(error){
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

const getInmuebleByUser = async(params) =>{
    try {
        const fk_usuario = {fk_usuario: params.id_usuario};
        const inmuebles = await dbRepository.findItems(table, fk_usuario)
        return inmuebles
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error.data
        }
    }
}

module.exports = {
    createNewInmueble,
    getAllInmuebles,
    getOneInmueble,
    deleteInmueble,
    updateInmueble,
    getInmuebleByUser
}