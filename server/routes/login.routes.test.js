var Test = require('./test/testApp.js')
var request = require('supertest')

describe("POST /login", () => {

    describe("given no email and password", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/login').send()
            expect(response.statusCode).toBe(400)
        })

    })

    describe("given no email", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/login').send({
                "password": Test.email
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no password", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/login').send({
                "email": Test.password
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given wrong password", () => {
        test("should respond with a 401 status code", async () => {
            const response = await request(Test.app).post('/login').send({
                "email": Test.email,
                "password": Test.password
            })
            expect(response.statusCode).toBe(401)
        })
    })
})