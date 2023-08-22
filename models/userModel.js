const db = require("../db/dbConnection")
const bcrypt = require('bcryptjs')
const AppError = require("../utils/appError")
const { checkIfEmail, checkIfEmpty } = require('../utils/validateMethods')

module.exports.userCreate = (data) => new Promise(async (res, rej) => {

  const dataKeys = Object.keys(data)
  const requiredError = dataKeys.filter(key => checkIfEmpty(data[key]))

  if (requiredError.length > 0)
    throw new AppError(`${requiredError.join(' ,')} are Required `, 400)

  if (!checkIfEmail(data.email))
    throw new AppError("Email is not Correct", 400)

  const queryString = `INSERT INTO User (name,email,password) VALUES(?,?,?);`
  const cryptPassword = await bcrypt.hash(data.password, 12)
  const values = [data.fullName, data.email, cryptPassword]

  const query = db.query(queryString, values)

  query.on('error', (err) => rej(err))
  query.on('result', (row) => res(row.insertId))

})

module.exports.userExist = (email) => new Promise((res, rej) => {

  if (checkIfEmpty(email))
    throw new AppError(`Email is Required `, 400)

  if (!checkIfEmail(email))
    throw new AppError("Email is not Correct", 400)


  const queryString = `SELECT *, COUNT(*) as count FROM User WHERE email=?`
  const values = [email]

  const query = db.query(queryString, values)

  query.on('error', (err) => {
    rej(err)
  })

  query.on('result', (row) => res(row))

})


module.exports.userDetails = (id) => new Promise((res, rej) => {

  const queryString = `SELECT id,email,name FROM User WHERE id=?`
  const values = [id]

  const query = db.query(queryString, values)

  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row))

})