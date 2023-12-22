const sql = require('mssql');

var config = {  
    server: 'localhost',
    user: 'sa',
    password: 'D04v03tD',
    database: 'TestDB',
    trustServerCertificate: true
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


module.exports = {
  sql, poolPromise
}

//export const poolPromise = _poolPromise;
//export const mssql = sql;
//module.exports e = _poolPromise;
