const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)
//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com')
var emailTest = 'prueba@live.com'
var passwordTest = 'Prueba*123'
var emailErrorTest = 'esteEmailNoExistex.com'

xdescribe('POST /changepassword', () => {
    let obj = {
        email: emailTest,
        password: passwordTest,
    }
    let errorObj = {
        email: emailErrorTest,
        password: passwordTest,
    } 
    it('responds with 200', () =>
        agent.post('/changepassword')
            .send(obj)
            .then((res) => {
                expect(res.status).to.be.equal(200);
        })
    );
    it('responds with 404', () =>
        agent.post('/changepassword')
            .send(errorObj)
            .then((res) => {
                expect(res.status).to.be.equal(404);
        })
    );  
});