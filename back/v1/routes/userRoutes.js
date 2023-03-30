const express = require('express');
const { validarCampos, } = require('../../middlewares/validarCampos');
const { check, oneOf } = require('express-validator');
const customValidations = require('../../helpers/customValidatons')
const userController = require('../../controllers/userControllers');
const { validateToken } = require('../../middlewares/validateToken');
const validateUser = require('../../middlewares/validarTypeUser');


const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .post('/',
        [
            check('username', 'El nombre de usuario es obligatorio y la longitud mínima es de 6 caracteres').isLength({ min: 6 }).notEmpty(),
            check('password', 'Longitud mínima del password 6').isLength({ min: 6 }).notEmpty(),
            check('email').isEmail(),
            check('tipo').custom(customValidations.validateUserTipo),
            check('avatar').optional().notEmpty(),
            check('nombre').notEmpty(),
            check('apellidos').notEmpty(),
            validarCampos
        ]
        , userController.createNewUser)
    .post('/login',
        [
            oneOf([
                check('username')
                    .isString().notEmpty()
                    .isLength({ min: 6 })
                    .withMessage('Invalid El nombre de usuario es obligatorio y la longitud mínima es de 6 caracteres')
                    .bail()
                ,
                check('email', 'Please enter a valid e-mail!')
                    .isEmail().notEmpty().bail()
            ], 'Nombre de usuario o email incorrectos')
            , check('password', 'Longitud mínima del password 6').isLength({ min: 6 }).notEmpty()

            , validarCampos
        ],

        userController.login)
    .put('/:id_usuario',
        validateToken,
        userController.updateUser
    )
    .delete('/:id_usuario',
        validateToken,
        validateUser.validateAdministrador,
        userController.deleteUser
    )
    .get('/find', userController.getOneUser)
    .get('/:id_usuario/activate-user/:activated_code', userController.activateUser)
    .put('/:id_usuario/change-password',
        validateToken,
        userController.changePassword
    )


module.exports = router
//TODO  sistema de recuperar contraseña