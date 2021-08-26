const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)

//Se usara Email y el modo de juego
let objtest = {
    email: 'payerasangel@gmail.com',
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