const jwt = require('jsonwebtoken')


const generateToken = (user) =>{
    
    const tokenPayload = {
        username: user.username,
        id_usuario: user.id_usuario,
        email: user.email,
        tipo: user.tipo

    }

    return jwt.sign(tokenPayload, process.env.TOKEN_SECRET,{ expiresIn: '3h'})

}

module.exports = {
    generateToken
}