const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

var email = 'prueba@live.com'
//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com') y con su contraseña passwordTest('Prueba*123')
var passwordTest = 'Prueba*123'
var emailErrorTest = 'esteEmailNoExiste.com'
var errorpasswordTest = 'EstaContraseñaEstaMal*404'
var InvalidEmail = ''

xdescribe('POST /login', () => {
    it('responds with an array', () =>
        agent.post('/login')
            .send({email: email, password: passwordTest})
            .then((res) => {
                expect(res.body.length).to.be.equal(1);
                expect(res.body[0]).to.be.an('object');
        })
    );
    it('responds with not an array', () =>
    agent.post('/login')
        .send({email: InvalidEmail, password: passwordTest})
        .then((res) => {
            expect(res.body.status).to.be.equal('400');
    })
);
    it('responds with Email no register', () =>
        agent.post('/login')
            .send({email: emailErrorTest, password: passwordTest})
            .then((res) => {
                expect(res.body.error).to.be.equal('Email no register');
        })
    ); 
    it('responds with error', () =>
    agent.post('/login')
        .send({email: email, password: errorpasswordTest})
        .then((res) => {
            expect(res.body.error).to.be.equal('error');
        })
    );  
});
