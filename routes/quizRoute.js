const route = require('express').Router()
const { allQuiz, quiz } = require('../controllers/quizController')

route.route('/').get(allQuiz)
route.route('/:quiz').get(quiz)

module.exports = route