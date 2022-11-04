const request = require('supertest');
const expect = require('chai').expect;
const userTestOperations = require('../../helpers/userTestOperations');
const inmuebleTestOperation = require('../../helpers/inmuebleTestOperations');
const deleteTables = require('../../helpers/deleteTables');
const users = require('../../data/users.json');
const inmuebles = require('../../data/inmuebles.json');

const { app } = require('../../../index');

describe('Testgin rutas de anuncios', () => {
    const baseUrl = `http://${process.env.WEB_HOST}:${process.env.PORT}/api/v1/anuncios`;
    let dbUser = {}
    let token = '';
    before(async () => {
        //Borramos todos los datos de la base de datos de test
        await deleteTables();

        //creamos un usario casero
        const user = await userTestOperations.createTestUser(users[0]);
        dbUser = user.dbUser;

        //logueamos usuario y obtenemos toquen
        token = await userTestOperations.loginTestUser({
            username: users[0].username,
            password: users[0].password
        })

        //creamos inmueble en la base de datos de test
        await inmuebleTestOperation.createTestInmueble(inmuebles[0], dbUser.id_usuario);

    })
    it('POST /inmuebles -> Añadir anuncio debe de bolber status 200 e info', async () => {
        //All cogemos la id del inmueble de la bd
        const dbInmueble = await inmuebleTestOperation.getInmuebleByUser(dbUser.id_usuario);
        const res = await request(baseUrl)
            .post(`/inmuebles/?id_inmueble=${dbInmueble[0].id_inmueble}&id_usuario=${dbInmueble[0].fk_usuario}`)
            .auth(token.token, { type: 'bearer' })
            .send({ precio: 125 })
        expect(res.status).to.equal(200);
        expect(res.body.info).to.equal('Anuncio añadido con exito')
    })
});