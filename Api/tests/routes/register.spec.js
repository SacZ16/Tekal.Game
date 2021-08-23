const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const { getallUsers } = require('../../src/Controllers/dbFunctions.js');
const agent = session(server)

//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com') y con su contraseña passwordTest('Prueba*1538')
const user = {
    email: 'prueba@live.com',
    password: 'Prueba*1538',
    test: 'prueba@live.com',
    name: 'señor',
    lastname:'prueba',
    country:'Argentina',
    age:'20-03-2001',
    city: 'Cordoba',
    gender: 'Male',
    ethnicity:'',
}

// Este user en primer instancia se debería agregar, se debera eliminar luego para que el test no de error.
const user1 = {
    email: 'pruebassb23560a@live.com',
    password: 'Prueba*1538',
    test: 'pruebassb23560a@live.com',
    name: 'señor',
    lastname:'prueba',
    country:'Argentina',
    age:'20-03-2001',
    city: 'Cordoba',
    gender: 'Male',
    ethnicity:'',
}

describe('POST /register', () => {
    it('responds with false', () =>
        agent.post('/register')
            .send(user)
            .then((res) => {
                expect(res.body.status).to.be.equal(false);
        })
    );
//     it('responds with true', () =>
//     agent.post('/register')
//         .send(user1)
//         .then((res) => {
//             console.log(res)
//             expect(res.body.status).to.be.equal(true);
//     })
// );
})