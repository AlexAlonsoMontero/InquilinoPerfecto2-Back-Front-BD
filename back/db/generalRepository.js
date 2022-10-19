const {
    getConnection
} = require('./db_connection')

const connection = getConnection()

/**
 *
 * @param {string} table
 * @returns {object}
 * @description Devuelve todos los datos que existan en la tabla pasada
 * como parametro table
 */
const getAllItems = async (table, deleted= false) => {
    try {
        const question = await connection.query(`SELECT * FROM ${table} WHERE deleted = ${deleted}`)
        return question[0]
    } catch (error) {
        throw { status: 500, message: error };
    }


}

/**
 *
 * @param {string} table
 * @param {object} param
 * @returns {object}
 * @description Devuelve todos los datos que existan en la tabla pasada
 * como parametro table, y que concuerden con el objeto paado enel parametro param
 */
const getOneItem = async (table, param, deleted=false) => {
    try {
        const condition = `SELECT * FROM ${table} WHERE ${Object.keys(param)[0]} = ? AND deleted=${deleted}`;
        const result = await connection.query(condition, Object.values(param)[0]);
        if (!result[0][0]) {
            throw {
                status: 400,
                data: `No se ha localizado ningún dato en ${table}`
            }
        }
        return result[0][0]


    } catch (error) {
        throw {
            status: error?.status || 500,
            data: error?.data || error
        }
    }
}

/**
 *
 * @param {string} table
 * @param {object} param Objetos de request.query donde quey es
 * la clave de búsqueda y los values el valor que buscamos
 * @returns {[object]} Devuelve un objeto con los valores localizdos dela base de datos
 * @description Construye con ayudas de otros métodos una consulta
 *  con condiciones que nos vale para cualquier tabla y cualquier condicion simple
 */
const findItems = async (table, params, deleted=false) => {

    const condition = `SELECT * FROM ${table} WHERE  ${whereConstructor(params)} AND deleted =${deleted}`   
    const question = await connection.query(condition, Object.values(params))
    return question[0]
}



/**
 *
 * @param {string} table
 * @param {{object}} object Objeto con los campos y os datos que se añadiran a la tabla
 * @returns {[object]} Devuelve  un array con lso datos encontrados
 */
const addItem = async (table, object) => {
    try {
        const values = Object.values(object).map(val => (typeof (val) === 'string' ? val = `'${val}'` : val))
        const sentence = `INSERT INTO ${table} (${Object.keys(object)}) VALUES (${values})`
        await connection.query(sentence)
    } catch (error) {

        throw {
            status: 500,
            message: error?.message || error
        }
    }

}


/**
 * 
 * @param {string} table 
 * @param {object} conditionParams 
 * @param {object} updateParams 
 * @returns {object}
 */
const updateItem = async (table, conditionParams, updateParams) => {
    console.log(table, conditionParams, updateParams)
    let sentence = `UPDATE  ${table} SET `
    const numParams = Object.keys(updateParams).length
    for (let i = 0; i < numParams; i++) {
        sentence += `${Object.keys(updateParams)[i]} = ?`
        sentence += i < numParams - 1 ? ", " : " "
    }
    sentence += `WHERE ${whereConstructor(conditionParams)}`;
    const result = await connection.query(sentence, [...Object.values(updateParams), ...Object.values(conditionParams)])
    if(result[0].affectedRows === 0){
        throw {
            status: 400,
            data: `No se ha podido actualizar en ${table}, no se ha localizado el registro`
        }
    }
    return (result[0])

}


/**
 *
 * @param {string} table
 * @param {object} object
 * @description borra un registro de la base de datos
 */
const deleteItem = async (table, object) => {
    try {
        const sentence = `DELETE FROM ${table} WHERE ${Object.keys(object)[0]} = ?`
        const result = await connection.query(sentence, Object.values(object))
        if(result[0].affectedRows ===0){
            throw {
                status: 400,
                data: `No se ha podido actualizar en ${table}, no se ha localizado el registro`
            }
        };
    } catch (error) {
        
        throw {
            status: 500,
            message: error?.data || error.message || 'Error en la conexion con la base de datos'
        }
    }




}

/**
 *
 * @param {[object]} param Objeto con las claves y los valoes correspondeintes id=2 por ejemplo
 * @param  {string}  sqlConditionOperator Cadena de texto con el operador del where Ejmplo: AND, OR (por defecto AND)
 * @param {string} operator Por defecto =
 * @returns {string}
 * @description Creamos una condición con la siguiente formula de ejemplo
 *  object.key = object.value
 */
const whereConstructor = (param, sqlConditionOperator = "AND", operator = "=") => {
    let condition = ""
    let key = ""
    for (let i = 0; i < Object.keys(param).length; i++) {
        keyOperator = getKeyOperator(Object.keys(param)[i])
        key = keyOperator.key
        operator = keyOperator.operator
        condition += (i === 0 ? `${key} ${operator} ? ` : ` ${sqlConditionOperator} ${key} ${operator} ? `)
    }
    return condition
}

/**
 *
 * @param {string} key Contiene la clae y las cadenas para obetener 
 * el operador from  >= // until <=
 * @returns {[{key:string, operator:string}]} Objeto con la clave de búsqueda y el string
 *  @description recibe un estring con la clave y el operador de búsqueda y los separa
 */
const getKeyOperator = (key) => {
    const separator = "$"
    let keyOperator = {
        key: "",
        operator: "="
    }
    if (key.split(separator).length > 1) {
        switch (key.split(separator)[0]) {
            case 'from':
                keyOperator.operator = '>='
                break
            case 'until':
                keyOperator.operator = '<='
                break
            default:
                keyOperator.operator = '='
        }
        keyOperator.key = key.split(separator)[1]
    } else {
        keyOperator.key = key.split(separator)[0]
    }
    return keyOperator

}




module.exports = {
    getAllItems,
    getOneItem,
    findItems,
    addItem,
    deleteItem,
    updateItem,
}