const route = require('express').Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const { quizzes, createQuiz, quizById, deleteQuiz, updateQuiz, questions, createQuestion, questionById, updateQuestion, deleteQuestion } = require('../controllers/userQuizController')

route.use(authenticateToken)

route.route('/quiz')
  .get(quizzes)
  .post(createQuiz)

route.route('/quiz/:id')
  .get(quizById)
  .put(updateQuiz)
  .delete(deleteQuiz)

route.route('/quiz/:quiz/question')
  .get(questions)
  .post(createQuestion)

route.route('/quiz/:quiz/question/:id')
  .get(questionById)
  .put(updateQuestion)
  .delete(deleteQuestion)



module.exports = route