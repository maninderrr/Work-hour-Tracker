var Test = require('./test/testApp.js')
var request = require('supertest')

describe("POST /employee create", () => {

    describe("given no data", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/employee').send()
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no email", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/employee').send({
                "empName": Test.empName,
                "password": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no manager", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/employee').send({
                "empName": Test.empName,
                "email": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no empName", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/employee').send({
                "manager": Test.manager,
                "email": Test.email,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given no DOJ", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(Test.app).post('/employee').send({
                "manager": Test.manager,
                "email": Test.email,
                "empName": Test.empName
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("given all information", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(Test.app).post('/employee').send({
                "manager": Test.manager,
                "email": Test.email,
                "empName": Test.empName,
                "DOJ": Test.DOJ
            })
            expect(response.statusCode).toBe(200)
        })
    })
})



// describe("GET /employee findOne", () => {

//     describe("given ID", () => {
//         test("should respond with a 200 status code", async () => {
//             //TODO: Add ID in testApp
//             const response = await request(Test.app).get('/employee?id=123').send()
//             expect(response.statusCode).toBe(200)
//         })
//     })

// })