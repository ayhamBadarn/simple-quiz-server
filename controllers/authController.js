const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { userCreate, userDetails, userExist } = require('../models/userModel')
const catchAsync = require("../utils/catchAsync")
const AppError = require('../utils/appError')

// const setCookie = (res, { key, value }, expiresDay = 1) => {
//   const date = new Date();
//   date.setDate(date.getDate() + expiresDay);

//   res.cookie(key, value, {
//     secure: true,
//     httpOnly: true,
//     expires: date
//   })
// }


const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '3d'
  })
}

// const generateRefreshToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_REFRESH, {
//     expiresIn: '15d'
//   })
// }


module.exports.login = catchAsync(async (req, res, next) => {

  const userInfo = await userExist(req.body.email)
  if (userInfo.count === 0) {
    return next(new AppError(`This ${req.body.email} is not exist`, 400))
  }
  if (!bcrypt.compareSync(req.body.password, userInfo.password))
    return next(new AppError(`The Password is not correct!`, 400))

  const token = generateAccessToken(userInfo.id)
  // const refreshToken = generateRefreshToken(userInfo.id)

  // setCookie(res, { key: 'isLogin', value: true }, 15)
  // setCookie(res, { key: 'refresh', value: refreshToken }, 15)

  delete userInfo.count
  delete userInfo.password

  res.status(201).json({
    status: 'success',
    data: {
      user: userInfo,
      token,
    }
  })
})

module.exports.signup = catchAsync(async (req, res) => {

  const userId = await userCreate(req.body)
  const user = await userDetails(userId)

  const accessToken = generateAccessToken(user.id)
  // const refreshToken = generateRefreshToken(user.id)

  // setCookie(res, { key: 'isLogin', value: true }, 15)
  // setCookie(res, { key: 'refresh', value: refreshToken }, 15)

  res.status(201).json({
    status: 'success',
    result: 'created',
    data: {
      user,
      token: accessToken,
    }
  })

})

module.exports.logout = catchAsync(async (req, res) => {

  res.clearCookie('isLogin')
  res.clearCookie('refresh')
  res.status(200).json({
    status: 'success',
    result: 'log outed ',
  })
})

// module.exports.refresh = catchAsync(async (req, res, next) => {

//   if (!req.cookies?.isLogin)
//     next(new AppError(`Authorization Required`, 401))

//   if (!req.cookies?.refresh)
//     return next(new AppError(`Authorization Required`, 401))

//   jwt.verify(req.cookies.refresh, process.env.TOKEN_REFRESH, (err, user) => {

//     if (err)
//       return next(new AppError(`Authorization Required`, 401))
//     const accessToken = generateAccessToken(user.id)

//     return res.status(201).json({
//       status: 'success',
//       data: {
//         token: accessToken
//       }
//     })
//   })
// })