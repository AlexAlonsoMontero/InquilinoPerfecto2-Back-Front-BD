const express = require( 'express' );
const { check } = require( 'express-validator');
const anuncioController = require('../../controllers/anuncioController')

const validateUser = require( '../../middlewares/validarTypeUser' );
const { validateToken }  = require ( '../../middlewares/validateToken' );
const { validarCampos } = require( '../../middlewares/validarCampos')

const router = express.Router();

router
    .post('/inmuebles',
    [
        check('precio', 'El campo precio es obligatorio y nopuede estar vacío').notEmpty().isNumeric(),
        validarCampos
    ],
    validateToken,
    validateUser.validateCasero,
    anuncioController.createAnuncio
    )

module.exports = router