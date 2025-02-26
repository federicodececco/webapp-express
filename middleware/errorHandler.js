const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    error: 'internal server error',
    message: err.message,
  })
}
module.exports = errorHandler
