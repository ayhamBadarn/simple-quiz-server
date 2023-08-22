const catchAsync = require('../utils/catchAsync')
const { findAllQuiz,
  create,
  findQuiz,
  deleteById,
  updateById,
  findAllQuestion,
  findQuestion,
  questionCreate,
  updateQuestionById,
  deleteQuestionById
} = require('../models/userQuizModel')

module.exports.quizzes = catchAsync(async (req, res) => {

  const quizzes = await findAllQuiz(req.user.id)

  res.status(200).json({
    status: 'success',
    count: quizzes.length,
    data: quizzes
  })
})

module.exports.quizById = catchAsync(async (req, res) => {
  const quiz = await findQuiz(req.params.id)

  res.status(200).json({
    status: 'success',
    data: quiz
  })
})

module.exports.createQuiz = catchAsync(async (req, res) => {

  const quiz = await create(req.body, req.user.id)

  res.status(201).json({
    status: 'success',
    data: quiz
  })
})

module.exports.updateQuiz = catchAsync(async (req, res) => {

  const updateRows = await updateById(req.body, req.params.id)

  res.status(200).json({
    status: 'success',
    message: `${updateRows} Quiz was Updated`
  })
})

module.exports.deleteQuiz = catchAsync(async (req, res) => {

  const deletedRows = await deleteById(req.params.id)

  res.status(200).json({
    status: 'success',
    message: `${deletedRows} Quiz was Deleted`
  })
})





module.exports.questions = catchAsync(async (req, res) => {

  const question = await findAllQuestion(req.params.quiz)

  res.status(200).json({
    status: 'success',
    count: question.length,
    data: question
  })

})



module.exports.createQuestion = catchAsync(async (req, res) => {
  const question = await questionCreate(req.body, req.params.quiz)

  res.status(201).json({
    status: 'success',
    data: question[0]
  })
})



module.exports.questionById = catchAsync(async (req, res) => {

  const question = await findQuestion(req.params.id)

  res.status(200).json({
    status: 'success',
    data: question
  })
})


module.exports.updateQuestion = catchAsync(async (req, res) => {

  const deletedRows = await updateQuestionById(req.body, req.params.id)

  res.status(200).json({
    status: 'success',
    message: `${deletedRows} Question was Updated`
  })
})



module.exports.deleteQuestion = catchAsync(async (req, res) => {

  const deletedRows = await deleteQuestionById(req.params.id)

  res.status(200).json({
    status: 'success',
    message: `${deletedRows} Question was Deleted`
  })
})
