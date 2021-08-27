const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server);

//Antes de testear, registrar o tener registrado un email de prueba igual a emailTest('prueba@live.com')
var emailTest = 'prueba@live.com';
var emailErrorTest = 'esteEmailNoExiste.com';

xdescribe('POST /verificationchangepassword', () => {
    it('responds with "Ok" ', () =>
    agent.post('/verificationchangepassword')
        .send({email: emailTest})
        .then((res) => {
            console.log(res.body)
            expect(res.body).to.be.equal('Ok');
        })
    );
    it('responds with "Email not registered" ', () =>
        agent.post('/verificationchangepassword')
            .send({email: emailErrorTest})
            .then((res) => {
                console.log(res.body)
                expect(res.body).to.be.equal('Email not registered');
        })
    );
})