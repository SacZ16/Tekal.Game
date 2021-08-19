const { expect } = require('chai');
const changePassword = require('../../src/services/changePassword.service')

var emailTest = 'alanjoel09@live.com'
var passwordTest = 'Alan*1538'
var emailErrorTest = 'alanjoel09'


xdescribe('aaaaa', () => {
    it('Respondes with object', async () => {
        const response = await  changePassword (emailTest, passwordTest)
        expect(response).to.be.a('object')})
    it('Not respondes with Email not found', async () => {
        var respons = await  changePassword (emailErrorTest, passwordTest)
        expect(respons).to.equal('Email not found')})
})