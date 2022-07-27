const {
    getAllItems,
    findItems,
    addItem,
    deleteItem,
    alterItem,
    updateItem
} = require('../infraestructure/repository/generalRepository')
const {
    ErrorNotFoundDB, ErrorDuplicateEntry, ErrorGeneryc
} = require('../customErrors/dbErrors')
const bcrypt = require('bcrypt')
const finalResponse = require('../helpers/finalResponse')
const {
    param
} = require('express/lib/request')
const { response } = require('express')



/**
 * 
 * @param {string} table 
 * @return {{info:string, data:object | string}} object
 * @description Conecta con respositorio getAllitems, y devuelve todos los campos de una tabla
 */
const getAll = async (table) => {
    try {
        const items = await getAllItems(table)
        if (items.length === 0) {
            throw new ErrorNotFoundDB(table)
        } else {
            finalResponse.isStatus = 200
            finalResponse.sendMessage = items
        }


    } catch (error) {
        console.error(error.message)
        finalResponse.isStatus = (error.code ? error.code : 500)
        finalResponse.sendMessage = (error.message ? error.message : "Internal server error")
    } finally {
        return finalResponse
    }
}

/**
 * 
 * @param {string} table 
 * @param {{object}} params 
 * @returns {[{info:string, data:object | string}]} object
 * @description Conecta con el respositorio genérico de base de datos y devuelve todos los elementos dela tabla correspondiente con el parametro table que cumplan las condiciones
 */
const find = async (table, params) => {
    try {
        const items = await findItems(table, params)
        if (items.length === 0) {
            throw new ErrorNotFoundDB(table)
        } else {
            finalResponse.isStatus = 200
            finalResponse.sendMessage = items
        }

    } catch (error) {
        console.error(error.message)
        finalResponse.isStatus = (error.code ? error.code : 500)
        finalResponse.sendMessage = (error.message ? error.message : "Internal server error")
    } finally {
        return finalResponse
    }

}

/**
 * 
 * @param {object} request
 * @param {object} response
 * @returns {object} devuelve response.status
 * @description Método para dar de alta usuario en base de datos
 */
const add = async (table, params) => {
    try {
        const result = await addItem(table, params)
        finalResponse.isStatus = 201
        finalResponse.sendMessage = "Usuario creado correctamente"

    } catch (error) {
        console.warn(error.message)
        finalResponse.isStatus = 500
        finalResponse.sendMessage = "Internal server error"
    } finally {
        return finalResponse
    }
}
/**
 * 
 * @param {string} table
 * @param {object} param
 * @returns {object} devuelve response.status().send()
 * @description Llama a delete item para borrar un usuario
 */
const drop = async (table, params) => {
    try {
        const result = await deleteItem(table, params)
        console.log(result)
        if (result) {
            finalResponse.isStatus = 200
            finalResponse.sendMessage = "Usuario borrado correctamente de base de datos"
        } else {
            throw new ErrorNotFoundDB(table)
        }
    } catch (error) {
        if (error instanceof ErrorNotFoundDB) {
            finalResponse.isStatus = error.code
            finalResponse.sendMessage = error.userMessage
            return finalResponse
        } else {
            finalResponse.isStatus = 500
            finalResponse.sendMessage = "Error en el borrado de usuario"
        }
    } finally {
        return finalResponse
    }

}

const update = async (table, id_item, params) => {
    try {
        const result = await updateItem(table, id_item, params);
        if (result) {
            finalResponse.isStatus = 200
            finalResponse.sendMessage = 'Usuario modificado correctamente'
            return finalResponse
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            error = new ErrorDuplicateEntry(error.sqlMessage)
        }else{
            error  = new ErrorGeneryc(500, 'No se ha podido registrar la modificación')
        }
        finalResponse.isStatus = error.code
        finalResponse.sendMessage = error.message
        return finalResponse
    }
}






module.exports = {
    getAll,
    find,
    add,
    drop,
    update
}