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
const getAllItems = async (table) => {
    try{
        const question = await connection.query(`SELECT * FROM ${table}`)
        return question[0]
    }catch(error){
        throw {status: 500, message: error};
    }
    

}

const getOneItem = async (table, param) =>{
    try{
        const condition = `SELECT * FROM ${table} WHERE ${Object.keys(param)[0]} = ? `;
        const result = await connection.query(condition, Object.values(param)[0])
        return result[0][0]

    }catch(error){

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
const findItems = async (table, params) => {
    
    const condition = `SELECT * FROM ${table} WHERE  ` + whereConstructor(params)
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
    const values = Object.values(object).map(val => (typeof (val) === 'string' ? val = `'${val}'` : val))
    const sentence = `INSERT INTO ${table} (${Object.keys(object)}) VALUES (${values})`
    const result = await connection.query(sentence)
    return result[0]
}


/**
 * 
 * @param {string} table 
 * @param {object} conditionParams 
 * @param {object} updateParams 
 * @returns {object}
 */
const updateItem = async (table,conditionParams, updateParams) =>{
    let sentence =  `UPDATE  ${table} SET `
    const numParams = Object.keys(updateParams).length
    for (let  i =0; i<numParams; i++){
        sentence += `${Object.keys(updateParams)[i]} = ?`
        sentence += i<numParams-1 ? ", ": " "
    }
    sentence += `WHERE ${whereConstructor(conditionParams)}`;
    const result = await connection.query(sentence,[...Object.values(updateParams), ...Object.values(conditionParams)])
    return(result[0])

}


/**
 *
 * @param {string} table
 * @param {object} object
 * @returns True si el borrado es ok. False si no se puede borrar
 * @description borra un registro de la base de datos
 */
const deleteItem = async (table, object) => {
    console.log('====================================');
    console.log(object);
    console.log('====================================');
    const sentence = `DELETE FROM ${table} WHERE ${Object.keys(object)[0]} = ?`
    console.log(parseInt(Object.values(object)[0]))

    const result = await connection.query(sentence, Object.values(object))
    console.log((result[0].affectedRows > 0 ? true : false))
    return (result[0].affectedRows > 0 ? true : false)

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
const whereConstructor = (param, sqlConditionOperator = "AND",operator = "=") => {
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