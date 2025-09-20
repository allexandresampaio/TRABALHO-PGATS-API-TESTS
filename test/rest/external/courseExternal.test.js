const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Course External', () => {
    describe('GET, /api/courses/enroll', () => {

        tokenCapturado = null;
        credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');

        before(async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/api/auth/login')
                .send(credenciaisLogin);
            tokenCapturado = respostaLogin.body.token;
            //console.log(tokenCapturado);
        });

        it('Um usuário pode ser matriculado corretamente em um curso e retorno será 200', async () => {
            credenciaisInscricao = require('../fixtures/credenciaisInscricaoOK.json');
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/courses/enroll')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send(credenciaisInscricao);
            expect(resposta.status).to.equal(200);
            expect(resposta.body.curso).to.equal('Javascript Básico');
        });

        it('Um usuário não pode ser matriculado em mais de um curso e retorno será 400', async () => {
            credenciaisInscricaoFalha = require('../fixtures/credenciaisInscricaoFalha.json');

            await request(process.env.BASE_URL_REST)
                .post('/api/courses/enroll')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send(credenciaisInscricaoFalha);

            credenciaisInscricaoFalha.courseId = 2;
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/courses/enroll')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send(credenciaisInscricaoFalha);
            //console.log(resposta.body);
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário já está inscrito em um curso');
        });
    });
});