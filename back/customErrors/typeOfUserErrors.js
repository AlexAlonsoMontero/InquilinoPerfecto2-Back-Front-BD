class unauthorisedUserError extends Error {
    constructor(tipeOfUser){
        super()
        this.name = "unauthorisedUser"
        this.userMessage = `El usuario tipo  ${tipeOfUser}, no está autorizado para esta operación.`
        this.code = 401
        this.message = `El usuario tipo  ${tipeOfUser}, no está autorizado para esta operación.`
    }
    
}

const onHandleErrors = (response, typeOfUser)=>{
    const error = new unauthorisedUserError(typeOfUser);
        response
            .status(error.code)
            .send({
                status: "FAILED",
                message: error.message,
            })
}



module.exports = {
    unauthorisedUserError,
    onHandleErrors
}