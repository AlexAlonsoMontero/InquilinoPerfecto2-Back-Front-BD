const express = require('express');
const { validarCampos, } = require('../../middlewares/validarCampos');
const { check, body, oneOf } = require('express-validator')
const customValidations = require('../../helpers/customValidatons')
const userController = require('../../controllers/userControllers');

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
    .put('/:id_usuario', userController.updateUser)
    .delete('/:id_usuario', userController.deleteUser)

// .get('/find', getOneUser)


module.exports = router
