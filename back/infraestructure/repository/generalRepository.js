const { getConnection } = require('../db_connection')

const conection = getConnection()

/**
 * 
 * @param {string} table 
 * @returns {object}
 * @description Devuelve todos los datos que existan en la tabla pasada 
 * como parametro table
 */
const getAllItems = async (table) =>{
    const question = await conection.query(`SELECT * FROM ${table}`)
    return question[0]

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
const findItems = async (table,param) =>{
    const sqlConditionOperator = 'AND'
    const condition = `SELECT * FROM ${table} WHERE  ` + whereConstructor(param,sqlConditionOperator)
    const question = await conection.query(condition, Object.values(param))
    return question[0]
}

/**
 * 
 * @param {[object]} param Objeto con las claves y los valoes correspondeintes id=2 por ejemplo
 * @param  {string}  sqlConditionOperator Cadena de texto con el operador del where Ejmplo: AND, OR 
 * @returns {string}
 * @description Creamos una condición con la siguiente formula de ejemplo
 *  object.key = object.value
 */
const whereConstructor = (param, sqlConditionOperator) =>{
    let condition = ""
    let key = ""
    operator = "="

    for (let i = 0; i < Object.keys(param).length; i++){
        keyOperator = getKeyOperator(Object.keys(param)[i])
        key = keyOperator.key
        operator = keyOperator.operator
        condition += (i===0?`${key} ${operator} ? `: ` ${sqlConditionOperator} ${key} ${operator} ? `)
    }
    return condition
}

/**
 * 
 * @param {string} key Contiene la clae y las cadenas para obetener 
 * el operador from  >= // until <=
 * @returns {[{key:string, operator:string}]} Objeto con la clave de búsqueda y el string
*  @description recibe un estring con la clave y el operador de búsqueda ylos separa
*/
const getKeyOperator = (key) => {
    const separator ="$"
    let keyOperator = {key:"",operator:"="}
    if (key.split(separator).length>1){
        switch (key.split(separator)[0]){
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
    }else{
        keyOperator.key = key.split(separator)[0]
    }
    return keyOperator

}
/**
 * 
 * @param {*} table 
 * @param {*} object Objeto con los campos y os datos que se añadiran a la tabla
 * @returns {[object]} Devuelve  un array con lso datos encontrados
 */
const addItem = async (table,object)=>{
    const values = Object.values(object).map(val=>(typeof(val)==='string'?val=`'${val}'`:val))
    const sentence = `INSERT INTO ${table} (${Object.keys(object)}) VALUES (${values})`
    const result = await conection.query(sentence)
    return result[0]
}


module.exports = { getAllItems, findItems, addItem }



