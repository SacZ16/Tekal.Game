const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)
const jwt = require ('jsonwebtoken')

let email = 'prueba@live.com'
var tokensendEmail = jwt.sign({ email: email, iat:25  }, 'prueba');
//Se debera tener un usuario registrado y se espera que tenga partidas jugadas.
console.log(tokensendEmail)
let contraseña = 'Prueba*123'
let emailErrorTest = 'ESTONOEssXISTE@GMAIL.COM'



describe('POST /averageScore', () => {
    it('responds with "200"', () => 
        agent.post('/averageScore')
            .send({email: tokensendEmail})
            .then((res) => {
                console.log(res.body)
                // expect(res.body.averageScore).not.to.equal(0)
            })
    )
    it('responds with "400"', () => 
    agent.post('/averageScore')
        .send({email: emailErrorTest})
        .then((res) => {
            expect(res.body.averageScore).to.equal(0)
        })
    )
})