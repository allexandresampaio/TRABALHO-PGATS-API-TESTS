const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/app');

describe('User Controller', () => {
    describe('GET, /api/users', () => {

        tokenCapturado = null;
        credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');

        before(async () => {
            const respostaLogin = await request(app)
                .post('/api/auth/login')
                .send(credenciaisLogin);
            tokenCapturado = respostaLogin.body.token;
            //console.log(tokenCapturado);
        });

        it('Quando busco por usuários, o retorno será 200', async () => {
            const resposta = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${tokenCapturado}`);
            expect(resposta.status).to.equal(200);
        });
    });
});