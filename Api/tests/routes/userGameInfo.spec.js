const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/app.js');
const agent = session(server)



let testeo = ['payerasangel@gmail.com', 40, {
    answer: 1,
    category: "VIG",
    date: "2021-08-24T22:11:16-03:00",
    id: 41,
    mood: "fine",
    seconds: 0.902264,
    type: "video",
    url: "https://tekal-dashboard-asset-input.s3.amazonaws.com/memory-game-active/video/dataset-memento/videos/climbing_flickr-5-6-4-1-2-5-2-6-3756412526_31.mp4?AWSAccessKeyId=ASIA27M5RUA5OSLJYJF2&Signature=xGplASwgChkRi90WeplYvbE83yw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEAIaCXVzLWVhc3QtMSJHMEUCIGHbbsnOzOk1YS86QuGOFOJcwN6tmSZC5ipg%2FIULu8vhAiEAt45ubZUZiCYGQ9kN%2ByjR4FGyyNAo4zP5fDgQrjQQZr0qnQIIOhABGgw3NTQ2MzQwMzkzNTQiDMs%2FcP89k8SqpNLrqSr6AX1i1ym90lrncDFXubeWMxu8%2BhV4jDxxtjeUOQ5izDqd8GESWba9jkX%2FS0%2Ba9e4WdHAJIubvRwANkVRaMYwT3MG98PJ1aon%2BWyAUsL%2BmroMWxdKMqg9TdXtyk3oAzTrPhXOglmiN%2FqTVdrYaD4lEklOHCBKPahg4de%2FvQSrwEtdrLDiDYuDWbquE0S%2B%2BHCHaxfW%2FI3g1lKglZP5EJl7PwICFk6KDiq5B8YYUNlK08XAqjRy5mSZzQXpR5CoumfVAlt5kqzwvBBwUY6ykLFMjHEuGnFWv5JGnZ8pSyW5zIEBPk%2FGiJ3zXhXvav5Fx3Ze2G%2FUGdgcc1CxdanswkrGWiQY6mgHJA1hcIauVvu3nGYVRFMMx1lti8UigVMQBXg6hnbOG7c0l4SE3jCYL4DVBN5qk2GXqNtxjXTEMHDNj0D%2FEUfZ0tukPMWWDIlxHmEwHuzuif3u2437iizyWM0smfpOpIm4ycNKtDcqpHlGyfnYI%2B5r%2B5KefbRs7acBkOqCWoCKdmFxa9%2BfKxfE7UfgSgyqxMR%2BghhHDLFVfTTQ%2F&Expires=1629857467"
}]


let errortest = []







xdescribe('POST gameInfo', () => {
    xit('responds with 200', () => 
        agent.post('/gameInfo')
            .send(testeo)
            .then((res) => {
                expect(res.status).to.equal(200)
            })
    )
    it('responds with 400', () => 
        agent.post('/videoInfo')
            .send(errortest)
            .then((res) => {
                expect(res.status).to.equal(400)
            })
    )
});