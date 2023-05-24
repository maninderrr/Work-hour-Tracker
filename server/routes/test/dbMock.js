// Add all the mock functions for DB here
const db_sequelize_sync = () => {};
const db_sequelize_Op_like = () => {};

const db_register_findAll = ( arg => {
    return new Promise((resolve, d) => {
        return resolve(new Array({password: "WrongPassword"}))
    })
})

const db_register_create = ( arg => {
    return new Promise((resolve, d) => {
        return resolve({})
    })
})

const db_employe_create = ( arg => {
    return new Promise((resolve, d) => {
        return resolve({})
    })
})

const db_employe_findByPk = ( arg => {
    return new Promise((resolve, d) => {
        return resolve({})
    })
})

var database_mock = {
    sequelize: {
        sync: db_sequelize_sync,
    },
    Sequelize: {
        Op: {
            db_sequelize_Op_like
        }
    },
    register: {
        findAll: db_register_findAll,
        create: db_register_create
    },
    employee: {
        create: db_employe_create,
        findByPk: db_employe_findByPk
    }
}

module.exports = database_mock;