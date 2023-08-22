const route = require('express').Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const {
  login, signup, logout
} = require('../controllers/authController')

route.route('/login').post(login)
route.route('/signup').post(signup)

route.route('/logout').post(authenticateToken, logout)
module.exports = route