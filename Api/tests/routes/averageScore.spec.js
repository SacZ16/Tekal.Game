const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Se debera tener un usuario registrado y se espera que tenga partidas jugadas.

let emailTest = 'payerasangel@gmail.com'
let emailErrorTest = 'ESTONOEXISTE@GMAIL.COM'

xdescribe('POST /averageScore', () => {
    xit('responds with "200"', () => 
        agent.post('/averageScore')
            .send({email: emailTest})
            .then((res) => {
                expect(res.status).to.equal(200)
            })
    )
    xit('responds with "400"', () => 
    agent.post('/averageScore')
        .send({email: emailErrorTest})
        .then((res) => {
            expect(res.status).to.equal(400)
        })
    )
})