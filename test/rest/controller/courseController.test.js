const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/app');

describe('Course Controller', () => {
    describe('GET, /api/courses/enroll', () => {

        tokenCapturado = null;
        credenciaisLogin = require('../fixtures/credenciaisLoginUser.json');

        before(async () => {
            const respostaLogin = await request(app)
                .post('/api/auth/login')
                .send(credenciaisLogin);
            tokenCapturado = respostaLogin.body.token;
            //console.log(tokenCapturado);
        });

        it('Um usuário pode ser matriculado corretamente em um curso e retorno será 200', async () => {
            credenciaisInscricao = require('../fixtures/credenciaisInscricao.json');
            const resposta = await request(app)
                .post('/api/courses/enroll')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send(credenciaisInscricao);
            expect(resposta.status).to.equal(200);
            expect(resposta.body.curso).to.equal('Javascript Básico');
        });

        it('Um usuário não pode ser matriculado em mais de um curso e retorno será 400', async () => {
            credenciaisInscricao = require('../fixtures/credenciaisInscricao.json');
            credenciaisInscricao.courseId = 2;
            const resposta = await request(app)
                .post('/api/courses/enroll')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send(credenciaisInscricao);
            //console.log(resposta.body);
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário já está inscrito em um curso');
        });
    });
});