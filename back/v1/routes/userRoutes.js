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
    .get('/:id_usuario', userController.getOneUser)
    .post('/',
        [
            check('username', 'El nombre de usuario es obligatorio').notEmpty(),
            check('email').isEmail(),
            check('tipo').custom(customValidations.validateUserTipo),
            check('avatar').notEmpty(),
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
                    .isLength({ min: 3 })
                    .withMessage('Invalid username')
                    .bail()
                ,
                check('email', 'Please enter a valid e-mail!')
                    .isEmail().notEmpty().bail()
            ], 'Nombre de usuario o email incorrectos')
            , validarCampos
        ]
        , userController.login)
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
    .get('activate_user/:activate_code')


module.exports = router
