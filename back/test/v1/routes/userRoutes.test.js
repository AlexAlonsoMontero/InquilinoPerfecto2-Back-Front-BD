const { assert } = require('chai');
const request = require('supertest');
const { deleteAllItems } = require('../../../db/generalRepository');
const expect = require("chai").expect;
const { getAllUsers } = require('../../../services/userServices');
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




})