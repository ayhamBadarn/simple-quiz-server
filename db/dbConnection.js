const mysql = require('mysql')
const AppError = require('../utils/appError')

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
})

db.getConnection((err) => new AppError(err))

module.exports = db