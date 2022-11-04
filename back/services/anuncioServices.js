const dbRespository = require ( '../db/generalRepository' );
const table = 'anuncios';
const errorsDB = require('../customErrors/dbErrors')

const createAnuncio = async( {id_inmueble, precio} ) =>{
    try {
        const params ={
            fk_inmueble : id_inmueble,
            precio: precio
        }
        const anunciosBD = await dbRespository.findItems( table, { fk_inmueble: params.fk_inmueble },  false )
        if ( anunciosBD.length > 0) {
            throw  new errorsDB.ErrorDuplicateEntry('anuncio')
        }
        await dbRespository.addItem( table, params )
        
    } catch (error) {
        throw {
            status: error?.status || error?.code ||500,
            message: error?.message || error.data
        }
    }
}



module.exports = {
    createAnuncio,
    
}