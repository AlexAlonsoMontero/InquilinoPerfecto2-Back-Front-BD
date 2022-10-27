const { assert } = require('chai');
const request = require('supertest');
const { deleteAllItems } = require('../../../db/generalRepository');
const expect = require("chai").expect;
const { getAllUsers, getOneUser } = require('../../../services/userServices');
const { app } = require('../../../index')

describe("Tests para las rutas de user", () => {
    const table = 'usuarios';
    const users = require('../../data/users.json')
    const baseUrl = `http://${process.env.WEB_HOST}:${process.env.PORT}/api/v1/users`;

    // borramos datos en tabla de testing

    describe('Añadimos distintos usuarios desde un JSON a bd', () => {
        before(async () => {
            await deleteAllItems(table);
        })

        for (const user of users) {
            it(`POST ${baseUrl} --> Usuario ${user.username}, ${user.tipo} devuelve status OK info y user`, async () => {
                const res = await request(baseUrl).post('').send(user);
                expect(res.status).to.equal(200);
                expect(res.body.info).to.equal('Usuario dado de alta con exito')
                expect(res.body.user.username).to.equal(user.username);
            })
        }
    });
    describe('Obtener todos los usuario', () => {
        it('GET users deveuelve todos los usuarios, status ok', async () => {
            const res = await request(baseUrl).get('');
            expect(res.status).to.equal(200)
        })
    })

    describe('GET /:id_usuario/activate-user/:activated_code => Activación de usuarios', () => {
        it('Todos los usuarios deben devolver --> status 200, y objeto info', async () => {
            const dbUsers = await getAllUsers();
            for (const user of dbUsers) {
                const res = await request(baseUrl).get(`/${user.id_usuario}/activate-user/${user.activated_code}`);
                expect(res.status).to.equal(200)
                expect(res.body.info).to.equal('Usuario activado')

            }
        })
    })

    describe('GET /find buscar un usuario --> Find one user', () => {
        it(' debe devolver status 200, info:Obtenido usuario con éxito y user = a user pedido ', async () => {
            const res = await request(baseUrl).get(`/find/?username=${users[0].username}&tipo=${users[0].tipo}`);
            expect(res.status).to.equal(200);
            expect(res.body.info).to.equal('Obtenido usuario con éxito');
            expect(res.body.user.username).to.equal(users[0].username)
        })
    });
    describe('LOGIN Y GET /:id_usuario/change-password --> Cambiar el password', () => {
        let token = '';
        it('login devolver status 200 verificamos username ', async () => {
            const res = await request(baseUrl).post('/login')
                .send({
                    username: users[0].username,
                    password: users[0].password
                });

            expect(res.status).to.equal(200);
            expect(res.body.username).to.equal(users[0].username);
            token = res.body.token



        })
        it('deve devolver status 200 info = password actualizado', async () => {
            const dbUser = await getOneUser({ username: users[0].username });
            const res = await request(baseUrl)
                .put(`/${dbUser.id_usuario}/change-password`).send({
                    password: users[0].password,
                    newPassword: users[0].password + '1'
                })
                .auth(token, { type: 'bearer' })
            expect( res.status ).to.equal( 200 );
            expect( res.body.info ).to.equal( 'password actualizado' );
        })
    })




})