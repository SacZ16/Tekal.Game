const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)
const jwt = require ('jsonwebtoken')

let email = 'prueba@live.com'
var tokensendEmail = jwt.sign({ email: email, iat:25  }, 'prueba');
//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com')

var emailErrorTest = 'eesteEmailNoExiste.com'

xdescribe('POST /info', () => {
    it('responds with 200', () =>
        agent.post('/info')
            .send({email: tokensendEmail})
            .then((res) => {
                expect(res.status).to.be.equal(200);
        })
    );
    it('responds with 404', () =>
        agent.post('/info')
            .send({email: emailErrorTest})
            .then((res) => {
                expect(res.status).to.be.equal(404);
        })
    );  
});