const request = require('supertest');
const expect = require('chai').expect;

const { deleteAllItems } = require('../../../db/generalRepository');
const { createNewUser, getOneUser, login } = require('../../../services/userServices');

const table = 'inmuebles'
const users = require('../../data/users.json');
const inmuebles = require('../../data/inmuebles.json');
const deleteTables = require('../../helpers/deleteTables');
const { getAllInmuebles } = require('../../../services/inmuebleServices');

const { app } = require('../../../index');

/*  En el archivo inmuebles.json carepta data tenemos un listado de inmuebles de ejemplo
    La clave de usuario es 0
    Al ejecutar el test siempre seguiran los siguientes pasos
    1- Borrado de tablas que nos afectan para lsos test
    2- Añadir usuario tipo Casero a la base de datos( el primer usuario es casero)
    3- Logamos al usuario para tener el token
    A partir de aquí realizaremos los test

*/
describe('Testing rutas de Inmueblees', () => {
    const baseUrl = `http://${process.env.WEB_HOST}:${process.env.PORT}/api/v1/inmuebles`;
    let dbUser = {};
    let token = '';
    before(async () => {
        //Borrado de datos en base de datos
        await deleteTables()
        //Creamos usuario con el que  trabajar en el testing
        const user = await createNewUser(users[0]);
        dbUser = user.dbUser
        token = await login({
            username: users[0].username,
            password: users[0].password
        })
    })
    //Añadimos todos los inmuebles del json a la base de datos
    for (let cont = 0; cont < inmuebles.length; cont++) {

        it(`Inmueble ${cont + 1}  Debe devolver info, y status 200 `, async () => {
            const res = await request(baseUrl)
                .post(`/${dbUser.id_usuario}`)
                .send(inmuebles[cont])
                .auth(token.token, { type: 'bearer' });
            expect(res.status).to.equal(200);
            expect(res.body.info).to.equal('Inmueble agregado con éxito')
        })
    }

    it('GET / -> debe devovler status 200 total=numero inmuebles e info = Inmuebles almacenados', async () => {
        const res = await request(baseUrl).get('');
        expect(res.status).to.equal(200);
        expect(res.body.total).to.equal(inmuebles.length);
        expect(res.body.info).to.equal('Inmuebles almacenados');

    })

    it('Info de un inmueble -- GET /:id_inmueble -->debe devovler status 200  e info = Inmueble', async () => {
        //recogemos inmuebles de la base de datos
        const dbInmuebles = await getAllInmuebles();
        const res = await request(baseUrl).get(`/${dbInmuebles[0].id_inmueble}`);
        expect(res.status).to.equal(200);
        expect(res.body.info).to.equal('Inmueble');
        expect(res.body.inmueble.id_inmueble).to.equal(dbInmuebles[0].id_inmueble);
    })

    it('Info de inmuebles por usuario GET /user/:id_usuario -->debe devolver status 200, info Inmuebles por usuario y total= inmuebles.length', async () => {
        const res = await request(baseUrl).get(`/user/${dbUser.id_usuario}`);
        expect(res.status).to.equal(200);
        expect(res.body.total).to.equal(inmuebles.length);
        expect(res.body.info).to.equal('Inmuebles por usuario');
    })


    it('Actualizar inmueble PUT /:id_inmueble devuelve status 200, info = Inmueble actualizado', async () => {
        const dbInmuebles = await getAllInmuebles()
        const res = await request(baseUrl)
            .put(`/${dbInmuebles[0].id_inmueble}`)
            .auth(token.token, { type: 'bearer' })
            .send({
                calle: 'Calle de prueba',
                metros_2: 10,
                piscina: true
            })
    })
})