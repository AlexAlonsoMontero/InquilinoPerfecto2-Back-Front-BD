const express = require('express');
const { check, oneOf } = require('express-validator');
const validateUser = require('../../middlewares/validarTypeUser');
const { validateToken } = require('../../middlewares/validateToken');

const inmuebleController = require('../../controllers/inmuebleControllers');

const router = express.Router();

router
    .post('/:id_usuario',
        validateToken,
        validateUser.validateCasero,
        inmuebleController.createNewInmueble

        );

module.exports = router

