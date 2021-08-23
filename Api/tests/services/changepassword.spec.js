const { expect } = require('chai');
const changePassword = require('../../src/services/changePassword.service')
//Antes de testear, registrar un email de prueba igual a emailTest('prueba@live.com')
var emailTest = 'prueba@live.com'
var passwordTest = 'Prueba*1538'
var emailErrorTest = 'esteEmailNoExiste.com'


xdescribe('changePassword service', () => {
    it('Respondes with object', async () => {
        const response = await  changePassword (emailTest, passwordTest)
        expect(response).to.be.a('object')})
    it('Not respondes with Email not found', async () => {
        var respons = await  changePassword (emailErrorTest, passwordTest)
        expect(respons).to.equal('Email not found')})
})