const mySql = require('mysql2')// Set up database connection pool

const pool = new mySql.createPool({
    database: "music_empire",
    host: "localhost",
    user: "root",
    password: "admin",
    connectionLimit: 10,
    enableKeepAlive: true,
  })

  module.exports = pool