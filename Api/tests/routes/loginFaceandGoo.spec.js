const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com'), el emailErrorTest no debe estar registrado para el test!!
var emailTest = 'prueba@live.com'
var emailErrorTest = 'esteEmailxNoExistex.com'

const user = {
    email: emailTest,
    name: 'Testeando'
}

const user1 = {
    email: emailErrorTest,
    name: 'Testeando error'
}

xdescribe('POST /logingoogle', () => {
    xit('responds with false', () => 
        agent.post('/logingoogle')
            .send(user)
            .then((res) => {
                expect(res.body.check).to.equal(false)
            })
    )
    xit('responds with true', () => 
        agent.post('/logingoogle')
            .send(user1)
            .then((res) => {
                expect(res.body.check).to.equal(true)
            })
    )
});