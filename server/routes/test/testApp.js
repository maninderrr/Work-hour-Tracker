const makeApp = require("../../make_app")
const dbMock = require("./dbMock")

const testApp = makeApp.init(dbMock)

module.exports = {
    app: testApp,
    email: "dummy@gummy.com",
    password: "Secret@123",
    empName: "Dummy Gummy",
    DOJ: "01-01-1999",
    manager: "Gummy Dummy"
}