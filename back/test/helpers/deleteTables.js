const { deleteAllItems } = require("../../db/generalRepository");

const deleteTables = async()=>{
    try{
        await deleteAllItems('inmuebles');
        await deleteAllItems('usuarios');

    }catch(error){
        throw{
            status: 500,
            meessage: error
        }
    }
}

module.exports = deleteTables