const catchAsync = require("../utils/catchAsync")
const { findAll, find } = require('../models/quizModel')

module.exports.allQuiz = catchAsync(async (req, res) => {

  const quizzes = await findAll()

  res.status(200).json({
    status: 'success',
    count: quizzes.length,
    data: quizzes
  })
})

module.exports.quiz = catchAsync(async (req, res) => {

  const quiz = await find(req.params.quiz)
  res.status(200).json({
    status: 'success',
    data: quiz
  })
})