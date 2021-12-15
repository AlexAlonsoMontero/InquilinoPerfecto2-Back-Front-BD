const {getConnection} = require('../db_connection')
const connection = getConnection()

const getUsers = async () =>{
    try{
        console.log(connection)
    }catch(error){
        console.warn(error)
    }
}

getUsers()