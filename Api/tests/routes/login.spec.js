const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com') y con su contraseña passwordTest('Prueba*1538')
var emailTest = 'prueba@live.com'
var passwordTest = 'Prueba*1538'
var emailErrorTest = 'esteEmailNoExiste.com'
var errorpasswordTest = 'EstaContraseñaEstaMal*404'
var InvalidEmail = ''

describe('POST /login', () => {
    xit('responds with an array', () =>
        agent.post('/login')
            .send({email: emailTest, password: passwordTest})
            .then((res) => {
                expect(res.body.length).to.be.equal(1);
                expect(res.body[0]).to.be.an('object');
        })
    );
    xit('responds with not an array', () =>
    agent.post('/login')
        .send({email: InvalidEmail, password: passwordTest})
        .then((res) => {
            expect(res.body).not.to.be.an('array');
    })
);
    xit('responds with Email no register', () =>
        agent.post('/login')
            .send({email: emailErrorTest, password: passwordTest})
            .then((res) => {
                expect(res.body.error).to.be.equal('Email no register');
        })
    ); 
    xit('responds with error', () =>
    agent.post('/login')
        .send({email: emailTest, password: errorpasswordTest})
        .then((res) => {
            expect(res.body.error).to.be.equal('error');
        })
    );  
});



