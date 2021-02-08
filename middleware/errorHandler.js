const errorHandler = (err, req, res, next) => {
  // console.log(err.stack.cyan.underline);
  const error = { ...err };

  error.message = err.message;

  console.log(error.message.red.underline);

  res.status(error.statusCode || 500).json({
    success: false,
    error,
  });
};

module.exports = errorHandler;
