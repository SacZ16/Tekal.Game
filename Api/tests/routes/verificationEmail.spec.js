const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server);

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com')
var emailTest = 'prueba@live.com';
var emailErrorTest = 'esteEmailNoExiste.com';


xdescribe('POST /verification', () => {
    it('responds with email already verified', () =>
        agent.post('/verification')
            .send({email: emailTest})
            .then((res) => {
                expect(res.body).to.be.equal('Email already verified');
        })
    );
    it('responds with "this email is not registered"', () =>
    agent.post('/verification')
        .send({email: emailErrorTest})
        .then((res) => {
            expect(res.body).to.be.equal('This email is not registered');
    })
);
})