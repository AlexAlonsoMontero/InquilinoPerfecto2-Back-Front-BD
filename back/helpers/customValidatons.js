const validateUserTipo = (value) => {

    return (value === 'INQUILINO' ||
        value === 'CASERO' ||
        value === 'INQUILINO/CASERO' ||
        value === 'ADMINISTRADOR')
        ? true
        : false
    
}


module.exports = {
    validateUserTipo,
    
}