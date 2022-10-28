const { deleteAllItems } = require("../../db/generalRepository");

const deleteTables = async()=>{
    try{
        await deleteAllItems('inmuebles');
        await deleteAllItems('usuarios');

    }catch{
        throw{
            status: 500,
            meessage: "No se ha podido borrar alguna de las tablas"
        }
    }
}

module.exports = deleteTables