const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com')
var emailTest = 'prueba@live.com'
var emailErrorTest = 'esteEmailNoExiste.com'

describe('POST /info', () => {
    xit('responds with 200', () =>
        agent.post('/info')
            .send({email: emailTest})
            .then((res) => {
                expect(res.status).to.be.equal(200);
        })
    );
    xit('responds with 404', () =>
        agent.post('/info')
            .send({email: emailErrorTest})
            .then((res) => {
                expect(res.status).to.be.equal(404);
        })
    );  
});