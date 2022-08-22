const validateUserTipo = (value) => {
    console.log("entra");
    console.log(value);
    return (value === 'INQUILINO' ||
        value === 'CASERO' ||
        value === 'INQUILINO/CASERO' ||
        value === 'ADMINISTRADOR')
        ? true
        : false
    
}

const validarUsernameOrMail = (value) =>{
    console.log('====================================');
    console.log('elvalor');
    console.log(value);
    console.log('====================================');
    return false
}
module.exports = {
    validateUserTipo,
    validarUsernameOrMail
}