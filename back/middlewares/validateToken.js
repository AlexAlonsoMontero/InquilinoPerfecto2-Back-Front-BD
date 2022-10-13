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
        
        const { authorization } = request.headers
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new ErrorInvalidToken()
        }

        const token = authorization.split(' ')[1]
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        
        
        next()
    } catch (error) {
        if (error instanceof ErrorInvalidToken) {
            isStatus = error.code
            sendMessage = error.userMessage

        } else {
            isStatus = 403
            sendMessage = "Error de interno"
        }
        response.status(403).send(sendMessage)
    }



}

module.exports = { validateToken }