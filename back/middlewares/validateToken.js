const { ErrorInvalidToken } = require('../customErrors/tokenErrors')
const jwt = require('jsonwebtoken')

let isStatus, sendMessage

/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @description Midleware que verifica que el token es correcto 
 */
const validateToken = (request, response, next) => {
    try {
        
        const idUsuario = request.params.id_usuario || request.query.id_usuario;
        const { authorization } = request.headers
 
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new ErrorInvalidToken()
        }
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
        if (idUsuario != decodedToken.id_usuario) {
            throw new ErrorInvalidToken('No coincide elusuario y el token')
        }
        
        request.auth = {
            user: {
                username: decodedToken.username,
                id_usuario: decodedToken.id_usuario,
                tipo: decodedToken.tipo,
                token
            }
        }
        
        
        next()
    } catch (error) {
        if (error instanceof ErrorInvalidToken) {
            isStatus = error.code
            sendMessage = error.userMessage

        } else {
            isStatus = 403
            sendMessage = error?.message || "Error al validar token de usuario"
        }
        response.status(403).send({
            status: "FAILED",
            info: "Token inválido o inexistente",
            message: sendMessage,
        })
    }



}

module.exports = { validateToken }