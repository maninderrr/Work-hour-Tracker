var Test = require('./test/testApp.js')
var request = require('supertest')

describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(Test.app).get('/').send()
        expect(response.statusCode).toBe(200)
    })
})
