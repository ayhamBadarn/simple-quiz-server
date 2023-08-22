const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorPro = (err, res) => {
  console.log(err)
  //
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
    });
  }
  // Programming or other unknown error 
  else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// send invalid value to db 
const handleCastError = (err) => new AppError(`Invalid ${err.path} : ${err.value}.`, 400);

// send duplicate value to db
const handleDuplicateFieldsDB = (err) => {
  const value = err.sqlMessage.match(/(["'])(\\?.)*?\1/)[0]
  console.log(value)
  return new AppError(`Duplicate field value: ${value}. Please use another value!`, 400)
};

// send wrong value 
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message)

  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400)
};

module.exports = (err, req, res, next) => {

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 'ER_DUP_ENTRY') error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);

    if (error)
      sendErrorPro(error, res);
    sendErrorPro(err, res);
  }
};