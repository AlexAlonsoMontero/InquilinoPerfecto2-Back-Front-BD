const express = require('express');
const { getAllUsers, getOneUser, addUser, login, deleteUser, updateUser } = require('../../controllers/userControllers');

const router = express.Router();

router
    .get('/', getAllUsers)
    .get('/:id_usuario', getOneUser)
    .post('/', addUser)
    .post('/login', login)
    .put('/:id_usuario', updateUser)
    .delete('/:id_usuario', deleteUser)

    // .get('/find', getOneUser)


module.exports = router
