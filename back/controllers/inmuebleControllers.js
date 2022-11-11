const { response } = require('express');

const inmuebleService = require('../services/inmuebleServices');

const createNewInmueble = async (request, response) => {
    try {
        const inmueble  = request.body;
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

const getAllInmuebles = async( request, response )=>{
    try{
        const inmuebles  = await inmuebleService.getAllInmuebles()
        response
        .status(200)
        .send({
            status: "OK",
            info: "Inmuebles almacenados",
            total: inmuebles.length,
            inmuebles,

        })
    }catch(error){
        response
        .status (error?.status || 500)
        .send ({
            status: "FAILED",
            message: error.message
        })
    }

}

const getOneInmueble = async( request, response )=>{
    try {
        const inmueble = await inmuebleService.getOneInmueble(request.params);
        response
            .status(200)
            .send({
                status: "OK",
                info:"Inmueble",
                inmueble
            })
    } catch (error) {
        response
        .status (error?.status || 500)
        .send ({
            status: "FAILED",
            message: error.message
        })
    }

}

const deleteInmueble = async( request, response )=>{
    try {
        await inmuebleService.deleteInmueble(request.params);
        response
            .status(200)
            .send({
                status: "OK",
                info:"Inmueble borrado con éxito"
            })
    } catch (error) {
        response
        .status (error?.status || 500)
        .send ({
            status: "FAILED",
            message: error.message
        })
    }

}

const updateInmueble = async( request, response)=>{
    try {
        const { body: updateiInmuebleParams } = request;
        const  id_inmueble = {id_inmueble: request.params.id_inmueble};
        await inmuebleService.updateInmueble(id_inmueble, updateiInmuebleParams);
        response
            .status(200)
            .send({
                status: "OK",
                info: "Inmueble actualizado"
            })
    } catch (error) {
        response
        .status (error?.status || 500)
        .send ({
            status: "FAILED",
            message: error.message
        })
    }

}

const getInmueblesByUser = async ( request, response ) =>{
    try {
        const inmuebles = await inmuebleService.getInmuebleByUser(request.params)
        response
        .status(200)
        .send({
            status: 'OK',
            info: "Inmuebles por usuario",
            total: inmuebles.length,
            inmuebles
        })
    } catch (error) {
        response
        .status (error?.status || 500)
        .send ({
            status: "FAILED",
            message: error.message
        })
    }
}

module.exports = {
    createNewInmueble,
    getAllInmuebles,
    getOneInmueble,
    deleteInmueble,
    updateInmueble,
    getInmueblesByUser,

}