const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Course enroll External - GraphQL', () => {

    tokenCapturado = null;
    credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');

    before(async () => {
        const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .send(credenciaisLogin);
        tokenCapturado = respostaLogin.body.data.login.token;
        //console.log(tokenCapturado);
    });

    it('Um usuário pode ser matriculado corretamente em um curso e retorno será 200', async () => {
        credenciaisInscricao = require('../fixtures/credenciaisInscricaoOK.json');
        retornoInscricao = require('../fixtures/retornoInscricao.json');
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(credenciaisInscricao);
        //console.log(resposta.body);
        expect(resposta.status).to.equal(200);
        expect(resposta.body.data).to.deep.equal(retornoInscricao.data);
    });

    it('Um usuário não pode ser matriculado em mais de um curso e retorno será 200', async () => {
        credenciaisInscricaoFalha = require('../fixtures/credenciaisInscricaoFalha.json');

        await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(credenciaisInscricaoFalha);

        credenciaisInscricaoFalha.courseId = 2;
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(credenciaisInscricaoFalha);
        //console.log(resposta.body.errors[0].message);
        expect(resposta.status).to.equal(200);
        expect(resposta.body.errors[0].message).to.equal('Usuário já está inscrito em um curso');
    });

});