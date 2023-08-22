const db = require('../db/dbConnection')
const AppError = require('../utils/appError')
const slugify = require('slugify')
const { checkIfEmpty, checkIfAlphanumeric } = require('../utils/validateMethods')

/**
 * get all quiz for user by user id 
 *  
 * @param {*} user_id 
 * @returns 
 */
module.exports.findAllQuiz = (user_id) => new Promise((res, rej) => {
  const queryString = `SELECT Quiz.*, User.name as userName FROM Quiz INNER JOIN User ON Quiz.user_id=User.id WHERE Quiz.user_id=?;`
  db.query(queryString, [user_id], (err, result) => {
    if (err)
      rej(err)

    res(result)
  })
})

/**
 * find quiz item using id 
 * 
 * @param {*} id 
 * @returns 
 */
module.exports.findQuiz = (id) => new Promise((res, rej) => {

  const queryString = `SELECT * FROM Quiz WHERE id=?;`

  const query = db.query(queryString, [id])


  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row))

  query.on('end', () => rej(new AppError(`Quiz Not Found`, 404)))
})

/**
 *  create new quiz 
 * 
 * @param {object} data 
 * @param {*} id 
 * @returns 
 */

module.exports.create = (data, id) => new Promise((res, rej) => {

  const dataKeys = Object.keys(data)
  const requiredField = ['title', 'description', 'difficulty']

  if (dataKeys.length !== requiredField.length)
    rej(new AppError(`${requiredField.join(' ,')} are Required `, 400))

  const requiredError = dataKeys.filter(key => (key in requiredField) || checkIfEmpty(data[key]))

  if (requiredError.length > 0)
    rej(new AppError(`${requiredError.join(' ,')} are Required `, 400))

  if (checkIfAlphanumeric(data.title))
    rej(new AppError(`title should be not contain any special char  `, 400))

  const queryString = `INSERT INTO Quiz (title,description,difficulty,slug,user_id) VALUES (?,?,?,?,?);`

  const slug = slugify(data.title, {
    lower: true,
  })

  const query = db.query(queryString, [data.title, data.description, data.difficulty, slug, id])

  query.on('error', (err) => rej(err))

  query.on('result', (row) => {
    const id = row.insertId

    db.query(`SELECT * FROM Quiz WHERE id=?`, [id], (err, row) => {
      if (err)
        rej(err)

      res(row[0])
    })
  })

})


/**
 * delete quiz item using id 
 * 
 * @param {*} id 
 * @returns 
 */
module.exports.deleteById = (id) => new Promise((res, rej) => {

  const queryString = `DELETE FROM Questions WHERE quiz_id=?`
  db.query(queryString, [id], (err, result) => {

    if (err)
      rej(err)

    const queryString = `DELETE FROM Quiz WHERE id=?;`

    const query = db.query(queryString, [id])

    query.on('error', (err) => rej(err))
    query.on('result', (row) => res(row.affectedRows))

  })
})



/**
 * update quiz item using id 
 * 
 * @param {*} id 
 * @param {Object} data
 * @returns 
 */
module.exports.updateById = (data, id) => new Promise((res, rej) => {

  const dataKeys = Object.keys(data)
  const requiredField = ['title', 'description', 'difficulty']

  if (dataKeys.length !== requiredField.length)
    rej(new AppError(`${requiredField.join(' ,')} are Required `, 400))

  const requiredError = dataKeys.filter(key => (key in requiredField) || checkIfEmpty(data[key]))

  if (requiredError.length > 0)
    rej(new AppError(`${requiredError.join(' ,')} are Required `, 400))

  if (checkIfAlphanumeric(data.title))
    rej(new AppError(`title should be not contain any special char  `, 400))

  const slug = slugify(data.title, {
    lower: true,
  })

  const queryString = `UPDATE Quiz SET title=?, description=? ,difficulty=?,slug=? WHERE id=?;`

  const query = db.query(queryString, [data.title, data.description, data.difficulty, slug, id])


  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row.affectedRows))

})


/**
 * get all question for user by and quiz id  
 *  
 * @param {*} quiz_id 
 * @returns 
 */
module.exports.findAllQuestion = (id) => new Promise((res, rej) => {
  const queryString = `SELECT * FROM Questions WHERE quiz_id=?;`

  db.query(queryString, [id], (err, result) => {
    if (err)
      rej(err)

    res(result)
  })
})



/**
 * find question item using id 
 * 
 * @param {*} id 
 * @returns 
 */
module.exports.findQuestion = (id) => new Promise((res, rej) => {

  const queryString = `SELECT * FROM Questions WHERE id=?;`

  const query = db.query(queryString, [id])


  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row))

  query.on('end', () => rej(new AppError(`Quiz Not Found`, 404)))
})



/**
 *  create new question 
 * 
 * @param {object} data 
 * @param {*} id 
 * @returns 
 */

module.exports.questionCreate = (data, id) => new Promise((res, rej) => {

  const dataKeys = Object.keys(data)
  const requiredField = ['question', 'answers', 'correct']

  if (dataKeys.length !== requiredField.length)
    rej(new AppError(`${requiredField.join(' ,')} are Required `, 400))

  const requiredError = dataKeys.filter(key => (key in requiredField) || checkIfEmpty(data[key]))

  if (requiredError.length > 0)
    rej(new AppError(`${requiredError.join(' ,')} are Required `, 400))

  const queryString = `INSERT INTO Questions (question,answers,correct,quiz_id) VALUES (?,?,?,?);`

  const query = db.query(queryString, [data.question, data.answers, data.correct, id])

  query.on('error', (err) => rej(err))

  query.on('result', (row) => {
    const id = row.insertId

    db.query(`SELECT * FROM Questions WHERE id=?`, [id], (err, row) => {
      if (err)
        rej(err)

      res(row)
    })
  })

})




/**
 * delete question item using id 
 * 
 * @param {*} id 
 * @returns 
 */
module.exports.deleteQuestionById = (id) => new Promise((res, rej) => {

  const queryString = `DELETE FROM Questions WHERE id=?;`

  const query = db.query(queryString, [id])


  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row.affectedRows))

})



/**
 * update question item using id 
 * 
 * @param {*} id 
 * @param {Object} data
 * @returns 
 */
module.exports.updateQuestionById = (data, id) => new Promise((res, rej) => {

  const dataKeys = Object.keys(data)
  const requiredField = ['question', 'answers', 'correct']

  if (dataKeys.length !== requiredField.length)
    rej(new AppError(`${requiredField.join(' ,')} are Required `, 400))

  const requiredError = dataKeys.filter(key => (key in requiredField) || checkIfEmpty(data[key]))

  if (requiredError.length > 0)
    rej(new AppError(`${requiredError.join(' ,')} are Required `, 400))

  const queryString = `UPDATE Questions SET question=?, answers=? ,correct=? WHERE id=?;`

  const query = db.query(queryString, [data.question, data.answers, data.correct, id])


  query.on('error', (err) => rej(err))

  query.on('result', (row) => res(row.affectedRows))

})
