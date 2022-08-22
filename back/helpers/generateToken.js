const jwt = require('jsonwebtoken')


const generateToken = (user) =>{
    
    const tokenPauyload = {
        username: user.username,
        id_usuario: user.id_usuario,
        email: user.email,
        tipo: user.tipo

    }

    return jwt.sign(tokenPauyload, process.env.TOKEN_SECRET,{ expiresIn: '3h'})

}

module.exports = {
    generateToken
}