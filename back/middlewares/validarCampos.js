const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (request, response, next) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response
            .status(400)
            .send({
                status: "FAILED",
                data: errors.mapped()
            });
    }
    next();
}






module.exports = {
    validarCampos,
}