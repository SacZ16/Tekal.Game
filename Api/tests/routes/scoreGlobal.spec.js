const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)
const jwt = require ('jsonwebtoken')

//Se usara Email y el modo de juego
let objtest = {
    score: 40,
    type: 'video'
}

xdescribe('POST /globalScore', () => {
    it('responds with "number"', () => 
        agent.post('/globalScore')
            .send(objtest)
            .then((res) => {
                expect(res.body.betterThan).to.be.an('number')
            })
    )
});