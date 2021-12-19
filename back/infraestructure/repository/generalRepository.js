const { getConnection } = require('../db_connection')

const conection = getConnection()

/**
 * 
 * @param {string} table 
 * @returns {object}
 * @description Devuelve todos los datos que existan en la tabla pasada como parametro table
 */
const getAllItems = async (table) =>{
    const question = await conection.query(`SELECT * FROM ${table}`)
    return question[0]

}

const findItem = async (table,param) =>{
    const question = (`SELECT * FROM ${table} WHERE `)
    const condition = whereConstructor(param)
}

/**
 * 
 * @param {[object]} param 
 * @returns {string}
 * @description Creamos una condición con la siguiente formual object.key = object.value
 */
const whereConstructor = (param) =>{
    let condition = ""
    for (p of params){
        condition += `${Object.keys(p)[0]}=${Object.values(p)[0]}`
    }
    return condition
}


module.exports = { getAllItems }



