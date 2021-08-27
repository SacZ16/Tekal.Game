const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com'), el emailErrorTest no debe estar registrado para el test!!
var emailTest = 'prueba@live.com'
//El email de error solo funcionara una vez, dado que logearse con face o google te registra y luego te logea, por ende si le pasamos un email lo va a registrar(ir cambiando la variable de error) cada vez se va agregar un user a la DB
var emailErrorTest = 'esteEmailxNoExistexx.com'

const user = {
    email: emailTest,
    name: 'Testeando'
}

const user1 = {
    email: emailErrorTest,
    name: 'Testeando error'
}

xdescribe('POST /logingoogle', () => {
    it('responds with false', () => 
        agent.post('/logingoogle')
            .send(user)
            .then((res) => {
                expect(res.body.check).to.equal(false)
            })
    )
    it('responds with true', () => 
        agent.post('/logingoogle')
            .send(user1)
            .then((res) => {
                expect(res.body.check).to.equal(true)
            })
    )
});