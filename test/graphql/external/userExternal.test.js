const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('User External - GraphQL', () => {

    tokenCapturado = null;
    credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');
    buscarUsers = require('../fixtures/buscarUsers.json');
    buscarCursos = require('../fixtures/buscarCursos.json');
    retornoCursos = require('../fixtures/retornoCursos.json');

    before(async () => {
        const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .send(credenciaisLogin);
        tokenCapturado = respostaLogin.body.data.login.token;
        //console.log(tokenCapturado);
    });

    it('Quando busco por usuários, o retorno será 200', async () => {
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(buscarUsers);
        expect(resposta.status).to.equal(200);
    });

    it('Quando busco por cursos, o retorno será com os nomes dos cursos', async () => {
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(buscarCursos);
        //console.log(resposta.body.data);
        expect(resposta.status).to.equal(200);
        expect(resposta.body.data).to.deep.equal(retornoCursos.data);
    });
    
});