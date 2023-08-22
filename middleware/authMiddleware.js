const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')

const getToken = (req, next) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    next(new AppError(`Authorization Required`, 401))

  return token
}

module.exports.authenticateToken = (req, res, next) => {

  // if (!req.cookies?.isLogin)
  //   next(new AppError(`Authorization Required`, 401))

  const token = getToken(req, next)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    if (err)
      next(new AppError(`You don't have authorization to view this page`, 403))

    req.user = user
    next()
  })
}

