const express = require('express');
const { check } = require('express-validator');
const validateUser = require('../../middlewares/validarTypeUser');
const { validateToken } = require('../../middlewares/validateToken');

const inmuebleController = require('../../controllers/inmuebleControllers');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = express.Router();

//DATOS PARA VALIDACIÓN
const notNullAtributes = [
    'tipo_via', 'tipo_inmueble', 'calle', 'numero', 'ciudad', 'provincia',
    'comunidad', 'pais', 'cp'
]
const numAtributes = ['lng', 'lat', 'banos', 'metros_2', 'habitaciones'];
const booleanAtributes = [
    'amueblado', 'calefaccion', 'aire_acondicionado', 'jardin', 'terraza',
    'ascensor', 'piscina', 'wifi',
]


router
    .post('/:id_usuario',
        [
            check(notNullAtributes).notEmpty().isString(),
            check(numAtributes).isFloat(),
            check(booleanAtributes).isBoolean(),
            validarCampos
        ],
        validateToken,
        validateUser.validateCasero,
        inmuebleController.createNewInmueble

    )
    .get('/', inmuebleController.getAllInmuebles)
    .get('/:id_inmueble', inmuebleController.getOneInmueble)
    .get('/user/:id_usuario', inmuebleController.getInmueblesByUser)
    .delete('/user/:id_usuario/:id_inmueble',
        validateToken,
        validateUser.validateAdministrador,
        inmuebleController.deleteInmueble
    )
    .put('/:id_inmueble/user/:id_usuario',
        // [
        //     check(notNullAtributes).notEmpty().isString(),
        //     check(numAtributes).isFloat(),
        //     check(booleanAtributes).isBoolean(),
        //     validarCampos
        // ],
        validateToken,
        validateUser.validateCasero,
        inmuebleController.updateInmueble
    )

module.exports = router

