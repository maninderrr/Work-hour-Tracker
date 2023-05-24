module.exports = {
    HOST: process.env.SQL_HOST,
    PORT: process.env.SQL_PORT,
    USER: process.env.SQL_USER,
    PASSWORD: process.env.SQL_PASSWORD,
    DB: process.env.SQL_DB,
    dialect: process.env.SQL_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
authentication: {
    type: 'default'
},
options: {
    database: 'master',
    validateBulkLoadParameters:false,
    encrypt: false,
}
  };
  