const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('User External', () => {
    describe('GET, /api/users', () => {

        tokenCapturado = null;
        credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');

        before(async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/api/auth/login')
                .send(credenciaisLogin);
            tokenCapturado = respostaLogin.body.token;
            //console.log(tokenCapturado);
        });

        it('Quando busco por usuários, o retorno será 200', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .get('/api/users')
                .set('Authorization', `Bearer ${tokenCapturado}`);
            expect(resposta.status).to.equal(200);
        });
    });
});