const db = require('../db/dbConnection')
const AppError = require('../utils/appError')

module.exports.findAll = () => new Promise((res, rej) => {
  const queryString = `SELECT Quiz.*, User.name as userName, COUNT(Questions.id) as questions FROM ((Quiz 
    INNER JOIN User ON Quiz.user_id=User.id)
    INNER JOIN Questions ON Questions.quiz_id=Quiz.id) GROUP BY Questions.quiz_id;`

  db.query(queryString, (err, result) => {
    if (err)
      rej(err)

    res(result)
  })


})

module.exports.find = (slug) => new Promise((res, rej) => {

  const queryString = `SELECT id,title,slug FROM Quiz WHERE slug=?;`

  const query = db.query(queryString, [slug], (err, row) => {
    if (err) rej(err)

    if (row.length < 1)
      return rej(new AppError(`Quiz ${slug} Not Found`, 404))

    const { id } = row[0]

    const queryString = `SELECT * FROM Questions WHERE quiz_id=?`
    db.query(queryString, [id], (error, rows) => {
      if (error) rej(error)

      res({ ...row[0], questions: rows })
    })
  })



  // query.on('end', () => rej(new AppError(`Quiz ${slug} Not Found`, 404)))

})