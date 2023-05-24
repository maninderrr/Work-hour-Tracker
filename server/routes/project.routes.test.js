var Test = require('./test/testApp.js')
var request = require('supertest')

describe("POST /register", () => {

    describe("given no data", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/register').send()
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no email", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/register').send({
                "empName": Test.empName,
                "password": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no password", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/register').send({
                "empName": Test.empName,
                "email": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no empName", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/register').send({
                "password": Test.password,
                "email": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no DOJ", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/register').send({
                "password": Test.password,
                "email": Test.email,
                "empName": Test.empName
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given all information", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(Test.app).post('/register').send({
                "password": Test.password,
                "email": Test.email,
                "empName": Test.empName,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(200)
        })
    })
})