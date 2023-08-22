const express = require('express');
//const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js')
const authRoute = require('./routes/authRoute')
const quizRoute = require('./routes/quizRoute')
const userRoute = require('./routes/userRoute')

const app = express();

// Middleware
//if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Route
app.use('/api/auth', authRoute)
app.use('/api/quizzes', quizRoute)
app.use('/api/user', userRoute)

// 404 Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// error middleware
app.use(globalErrorHandler);

module.exports = app;
