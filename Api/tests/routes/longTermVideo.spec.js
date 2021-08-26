const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)
const jwt = require ('jsonwebtoken')

let email = 'prueba@live.com'
var tokensendEmail = jwt.sign({ email: email, iat:25  }, 'prueba');
//Se usara Email y el modo de juego
let objtest = {
    email: tokensendEmail,
    mode: 'video'
}
// En caso de que no mandemos un obj con email y mode devuelve un array vacio
let ObjErrotest = {
    mode: 'video'
}





xdescribe('POST /longTerm', () => {
    it('responds with length 3', () => 
        agent.post('/longTerm')
            .send(objtest)
            .then((res) => {
                console.log(res.body, 'AAAAAAAAAAAAAAAAAAAAAAAAA')
                expect(res.body.length).to.equal(3)
            })
    )
    it('responds with length 0', () => 
        agent.post('/longTerm')
            .send(ObjErrotest)
            .then((res) => {
                expect(res.body.length).to.equal(0)
            })
    )
});